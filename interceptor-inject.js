// ===========================================================================
//  DevX Interceptor — interceptor-inject.js
//  Roda no contexto da página (world: MAIN).
//  Monkey-patches XMLHttpRequest, fetch, WebSocket, EventSource, sendBeacon
//  para capturar todo tráfego de rede (request + response).
// ===========================================================================
(function () {
  'use strict';

  if (window.__devxInterceptorInstalled) {
    window.__devxInterceptorActive = true;
    return;
  }
  window.__devxInterceptorInstalled = true;
  window.__devxInterceptorActive = true;

  var captureId = 0;
  var MAX_BODY = 102400; // 100KB

  function nextId() { return ++captureId; }

  function emit(entry) {
    if (!window.__devxInterceptorActive) return;
    try {
      entry.pageUrl = location.href;
      entry.isIframe = window.self !== window.top;
      window.postMessage(
        { type: '__DEVX_INTERCEPT__', entry: JSON.parse(JSON.stringify(entry)) },
        '*'
      );
    } catch (e) { /* silent */ }
  }

  function toBase64(buf) {
    var bytes = new Uint8Array(buf instanceof ArrayBuffer ? buf : buf.buffer || buf);
    var chunks = [];
    var CHUNK = 0x8000;
    for (var i = 0; i < bytes.length; i += CHUNK) {
      chunks.push(String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK)));
    }
    return btoa(chunks.join(''));
  }

  function captureBody(body) {
    if (body == null) return {};
    if (body instanceof ArrayBuffer || ArrayBuffer.isView(body)) {
      return { requestBase64: toBase64(body), requestSize: body.byteLength || body.length };
    }
    if (typeof body === 'string') {
      try { return { requestJson: JSON.parse(body), requestSize: body.length }; }
      catch (_) { return { requestText: body.substring(0, MAX_BODY), requestSize: body.length }; }
    }
    if (typeof FormData !== 'undefined' && body instanceof FormData) {
      var obj = {};
      body.forEach(function (v, k) { obj[k] = v instanceof File ? '[File: ' + v.name + ']' : String(v); });
      var s = JSON.stringify(obj);
      return { requestText: s.substring(0, MAX_BODY), requestSize: s.length };
    }
    if (typeof URLSearchParams !== 'undefined' && body instanceof URLSearchParams) {
      var str = body.toString();
      return { requestText: str.substring(0, MAX_BODY), requestSize: str.length };
    }
    if (body instanceof Blob) {
      return { requestText: '[Blob: ' + body.size + ' bytes]', requestSize: body.size };
    }
    return {};
  }

  function parseResponseHeaders(raw) {
    var headers = {};
    (raw || '').trim().split(/\r?\n/).forEach(function (line) {
      var idx = line.indexOf(': ');
      if (idx > 0) headers[line.substring(0, idx).toLowerCase()] = line.substring(idx + 2);
    });
    return headers;
  }

  // --- XMLHttpRequest ----------------------------------------------------
  var XHR = XMLHttpRequest.prototype;
  var _open = XHR.open;
  var _send = XHR.send;
  var _setHeader = XHR.setRequestHeader;

  XHR.open = function (method, url) {
    this.__devx = { method: String(method), url: String(url), headers: {} };
    return _open.apply(this, arguments);
  };

  XHR.setRequestHeader = function (name, value) {
    if (this.__devx) this.__devx.headers[String(name)] = String(value);
    return _setHeader.apply(this, arguments);
  };

  XHR.send = function (body) {
    if (this.__devx && window.__devxInterceptorActive) {
      var info = this.__devx;
      var entry = {
        id: nextId(),
        transport: 'xhr',
        method: (info.method || 'GET').toUpperCase(),
        url: info.url,
        requestHeaders: info.headers,
        timestamp: new Date().toISOString(),
        _start: performance.now()
      };
      Object.assign(entry, captureBody(body));

      var xhr = this;
      this.addEventListener('loadend', function () {
        try {
          entry.status = xhr.status;
          entry.duration = Math.round(performance.now() - entry._start);
          delete entry._start;
          entry.responseHeaders = parseResponseHeaders(xhr.getAllResponseHeaders());

          var resp = xhr.response;
          if (resp instanceof ArrayBuffer) {
            entry.responseSize = resp.byteLength;
            if (resp.byteLength <= MAX_BODY) entry.responseBase64 = toBase64(resp);
          } else if (typeof resp === 'string') {
            entry.responseSize = resp.length;
            try { entry.responseJson = JSON.parse(resp); }
            catch (_) { entry.responseText = resp.substring(0, MAX_BODY); }
          } else if (resp && typeof resp === 'object') {
            try {
              var s = JSON.stringify(resp);
              entry.responseJson = JSON.parse(s);
              entry.responseSize = s.length;
            } catch (_) {}
          }
        } catch (e) {
          entry.captureError = String(e);
        }
        emit(entry);
      });
    }
    return _send.apply(this, arguments);
  };

  // --- fetch -------------------------------------------------------------
  if (typeof window.fetch === 'function') {
    var _fetch = window.fetch;
    window.fetch = function (input, init) {
      if (!window.__devxInterceptorActive) return _fetch.apply(this, arguments);

      var url = typeof input === 'string' ? input : (input && input.url ? input.url : String(input));
      var entry = {
        id: nextId(),
        transport: 'fetch',
        method: ((init && init.method) || (input && input.method) || 'GET').toUpperCase(),
        url: url,
        requestHeaders: {},
        timestamp: new Date().toISOString(),
        _start: performance.now()
      };

      var h = (init && init.headers) || (input && input.headers);
      if (h) {
        if (h instanceof Headers) {
          h.forEach(function (v, k) { entry.requestHeaders[k] = v; });
        } else if (typeof h === 'object') {
          for (var k in h) {
            if (Object.prototype.hasOwnProperty.call(h, k)) entry.requestHeaders[k] = h[k];
          }
        }
      }
      Object.assign(entry, captureBody(init && init.body));

      return _fetch.apply(this, arguments).then(function (response) {
        var clone = response.clone();
        entry.status = response.status;
        entry.duration = Math.round(performance.now() - entry._start);
        delete entry._start;
        entry.responseHeaders = {};
        response.headers.forEach(function (v, k) { entry.responseHeaders[k] = v; });

        clone.arrayBuffer().then(function (buf) {
          entry.responseSize = buf.byteLength;
          var ct = (entry.responseHeaders['content-type'] || '');
          if (ct.indexOf('json') >= 0 || ct.indexOf('text') >= 0 || ct.indexOf('javascript') >= 0 || ct.indexOf('xml') >= 0 || ct.indexOf('html') >= 0) {
            var text = new TextDecoder().decode(buf);
            try { entry.responseJson = JSON.parse(text); }
            catch (_) { entry.responseText = text.substring(0, MAX_BODY); }
          } else if (buf.byteLength <= MAX_BODY) {
            entry.responseBase64 = toBase64(buf);
          }
          emit(entry);
        }).catch(function (e) {
          entry.captureError = String(e);
          emit(entry);
        });

        return response;
      }).catch(function (err) {
        entry.error = String(err);
        entry.duration = Math.round(performance.now() - entry._start);
        delete entry._start;
        emit(entry);
        throw err;
      });
    };
  }

  // --- WebSocket ---------------------------------------------------------
  if (typeof window.WebSocket === 'function') {
    var _WS = window.WebSocket;
    var NewWS = function WebSocket(url, protocols) {
      var ws = arguments.length > 1 ? new _WS(url, protocols) : new _WS(url);
      if (!window.__devxInterceptorActive) return ws;

      var wsUrl = String(url);
      var connId = nextId();

      ws.addEventListener('open', function () {
        emit({ id: connId, transport: 'websocket', wsEvent: 'open', url: wsUrl, timestamp: new Date().toISOString() });
      });

      ws.addEventListener('message', function (ev) {
        var e = { id: nextId(), transport: 'websocket', wsEvent: 'message', direction: 'receive', url: wsUrl, wsConnId: connId, timestamp: new Date().toISOString() };
        if (typeof ev.data === 'string') {
          e.responseSize = ev.data.length;
          try { e.responseJson = JSON.parse(ev.data); }
          catch (_) { e.responseText = ev.data.substring(0, MAX_BODY); }
        } else if (ev.data instanceof ArrayBuffer) {
          e.responseSize = ev.data.byteLength;
          if (ev.data.byteLength <= MAX_BODY) e.responseBase64 = toBase64(ev.data);
        } else if (ev.data instanceof Blob) {
          e.responseSize = ev.data.size;
          e.responseText = '[Blob: ' + ev.data.size + ' bytes]';
        }
        emit(e);
      });

      ws.addEventListener('close', function (ev) {
        emit({ id: nextId(), transport: 'websocket', wsEvent: 'close', url: wsUrl, wsConnId: connId, status: ev.code, responseText: ev.reason || '', timestamp: new Date().toISOString() });
      });

      ws.addEventListener('error', function () {
        emit({ id: nextId(), transport: 'websocket', wsEvent: 'error', url: wsUrl, wsConnId: connId, timestamp: new Date().toISOString() });
      });

      var _wsSend = ws.send.bind(ws);
      ws.send = function (data) {
        if (window.__devxInterceptorActive) {
          var e = { id: nextId(), transport: 'websocket', wsEvent: 'message', direction: 'send', url: wsUrl, wsConnId: connId, timestamp: new Date().toISOString() };
          if (typeof data === 'string') {
            e.requestSize = data.length;
            try { e.requestJson = JSON.parse(data); }
            catch (_) { e.requestText = data.substring(0, MAX_BODY); }
          } else if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
            e.requestSize = data.byteLength || data.length;
            if (e.requestSize <= MAX_BODY) e.requestBase64 = toBase64(data);
          } else if (data instanceof Blob) {
            e.requestSize = data.size;
            e.requestText = '[Blob: ' + data.size + ' bytes]';
          }
          emit(e);
        }
        return _wsSend(data);
      };

      return ws;
    };
    NewWS.CONNECTING = _WS.CONNECTING;
    NewWS.OPEN = _WS.OPEN;
    NewWS.CLOSING = _WS.CLOSING;
    NewWS.CLOSED = _WS.CLOSED;
    NewWS.prototype = _WS.prototype;
    window.WebSocket = NewWS;
  }

  // --- EventSource (SSE) -------------------------------------------------
  if (typeof window.EventSource === 'function') {
    var _ES = window.EventSource;
    var NewES = function EventSource(url, cfg) {
      var es = cfg ? new _ES(url, cfg) : new _ES(url);
      if (!window.__devxInterceptorActive) return es;

      var esUrl = String(url);
      var connId = nextId();

      es.addEventListener('open', function () {
        emit({ id: connId, transport: 'sse', sseEvent: 'open', method: 'GET', url: esUrl, timestamp: new Date().toISOString() });
      });

      es.addEventListener('message', function (ev) {
        var e = { id: nextId(), transport: 'sse', sseEvent: 'message', url: esUrl, sseConnId: connId, timestamp: new Date().toISOString() };
        e.responseSize = (ev.data || '').length;
        try { e.responseJson = JSON.parse(ev.data); }
        catch (_) { e.responseText = (ev.data || '').substring(0, MAX_BODY); }
        emit(e);
      });

      es.addEventListener('error', function () {
        emit({ id: nextId(), transport: 'sse', sseEvent: 'error', url: esUrl, sseConnId: connId, timestamp: new Date().toISOString() });
      });

      return es;
    };
    NewES.prototype = _ES.prototype;
    NewES.CONNECTING = _ES.CONNECTING;
    NewES.OPEN = _ES.OPEN;
    NewES.CLOSED = _ES.CLOSED;
    window.EventSource = NewES;
  }

  // --- navigator.sendBeacon ----------------------------------------------
  if (navigator.sendBeacon) {
    var _beacon = navigator.sendBeacon.bind(navigator);
    navigator.sendBeacon = function (url, data) {
      if (window.__devxInterceptorActive) {
        var e = { id: nextId(), transport: 'beacon', method: 'POST', url: String(url), timestamp: new Date().toISOString() };
        Object.assign(e, captureBody(data));
        emit(e);
      }
      return _beacon(url, data);
    };
  }

  console.log(
    '%c[DevX Interceptor]%c Captura ativa — XHR, Fetch, WebSocket, SSE, Beacon',
    'color:#2ecc71;font-weight:bold', 'color:inherit'
  );
})();
