// ===========================================================================
//  DevX Interceptor — interceptor.js
//  Lógica do painel interceptor: conecta ao background, renderiza capturas,
//  gerencia filtros, detail panel, start/stop, download, clear.
// ===========================================================================
(function () {
  const params = new URLSearchParams(location.search);
  const targetTabId = parseInt(params.get('tabId'), 10) || null;

  let captures = [];
  let isCapturing = false;
  let selectedEntry = null;

  // DOM refs
  const statusDot = document.getElementById('statusDot');
  const countEl = document.getElementById('count');
  const btnToggle = document.getElementById('btnToggle');
  const btnDownload = document.getElementById('btnDownload');
  const btnClear = document.getElementById('btnClear');
  const tabInfoEl = document.getElementById('tabInfo');
  const filterSearch = document.getElementById('filterSearch');
  const filterIframes = document.getElementById('filterIframes');
  const listWrap = document.getElementById('listWrap');
  const emptyMsg = document.getElementById('emptyMsg');
  const detailPanel = document.getElementById('detailPanel');
  const detailTabs = document.getElementById('detailTabs');
  const detailBody = document.getElementById('detailBody');

  // ─── Port connection for real-time captures ─────────────────────────────────
  const port = chrome.runtime.connect({ name: 'interceptor' });
  port.onMessage.addListener(function (msg) {
    if (msg.type === 'capture' && msg.tabId === targetTabId) {
      captures.push(msg.entry);
      appendEntryToList(msg.entry);
      updateCount();
    }
  });

  // ─── Tab info ───────────────────────────────────────────────────────────────
  if (targetTabId) {
    chrome.tabs.get(targetTabId, function (tab) {
      if (chrome.runtime.lastError || !tab) {
        tabInfoEl.innerHTML = '<span style="color:#e74c3c;">Aba não encontrada</span>';
        return;
      }
      var html = '';
      if (tab.favIconUrl) html += '<img src="' + escapeHtml(tab.favIconUrl) + '">';
      html += '<span style="overflow:hidden;text-overflow:ellipsis;">' + escapeHtml(tab.title || tab.url || '') + '</span>';
      tabInfoEl.innerHTML = html;
    });
  }

  // ─── Helpers ────────────────────────────────────────────────────────────────
  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function shortUrl(url, pageUrl) {
    try {
      var u = new URL(url, pageUrl || location.href);
      return u.pathname + u.search;
    } catch (_) {
      return url || '';
    }
  }

  function formatSize(n) {
    if (typeof n !== 'number' || n === 0) return '';
    if (n < 1024) return n + 'b';
    if (n < 1048576) return (n / 1024).toFixed(1) + 'kb';
    return (n / 1048576).toFixed(1) + 'mb';
  }

  function updateCount() {
    countEl.textContent = captures.length;
  }

  // ─── Filters ────────────────────────────────────────────────────────────────
  function getActiveTypes() {
    var types = new Set();
    document.querySelectorAll('.filter-types input[data-type]').forEach(function (cb) {
      if (cb.checked) types.add(cb.dataset.type);
    });
    return types;
  }

  function matchesFilter(entry) {
    var types = getActiveTypes();
    if (!types.has(entry.transport)) return false;
    if (!filterIframes.checked && entry.isIframe) return false;
    var q = filterSearch.value.toLowerCase().trim();
    if (q && !(entry.url || '').toLowerCase().includes(q)) return false;
    return true;
  }

  function getFilteredCaptures() {
    return captures.filter(matchesFilter);
  }

  // ─── Row creation ───────────────────────────────────────────────────────────
  function createRow(entry) {
    var row = document.createElement('div');
    row.className = 'req-item' + (entry.error ? ' has-error' : '');
    row.dataset.id = entry.id;

    var methodText, methodClass;
    if (entry.transport === 'websocket') {
      if (entry.wsEvent === 'message') {
        methodText = entry.direction === 'send' ? '↑ SEND' : '↓ RECV';
      } else {
        methodText = (entry.wsEvent || 'WS').toUpperCase();
      }
      methodClass = 'method-WS';
    } else if (entry.transport === 'sse') {
      methodText = (entry.sseEvent || 'SSE').toUpperCase();
      methodClass = 'method-SSE';
    } else if (entry.transport === 'beacon') {
      methodText = 'BEACON';
      methodClass = 'method-BEACON';
    } else {
      methodText = entry.method || 'GET';
      methodClass = 'method-' + methodText;
    }

    var statusVal = entry.status != null ? String(entry.status) : '—';
    var statusClass = '';
    if (entry.status >= 200 && entry.status < 300) statusClass = 's2';
    else if (entry.status >= 300 && entry.status < 400) statusClass = 's3';
    else if (entry.status >= 400) statusClass = 's4';

    var size = entry.responseSize || (entry.responseBase64 ? Math.round(entry.responseBase64.length * 3 / 4) : 0);
    var metaParts = [];
    if (entry.duration != null) metaParts.push(entry.duration + 'ms');
    if (size) metaParts.push(formatSize(size));
    var time = '';
    try { time = new Date(entry.timestamp).toLocaleTimeString(); } catch (_) {}

    row.innerHTML =
      '<span class="method-badge ' + methodClass + '">' + methodText + '</span>' +
      '<span class="transport-badge">' + entry.transport + '</span>' +
      '<span class="req-url" title="' + escapeHtml(entry.url || '') + '">' + escapeHtml(shortUrl(entry.url, entry.pageUrl)) + '</span>' +
      '<span class="req-status ' + statusClass + '">' + statusVal + '</span>' +
      '<span class="req-meta">' + metaParts.join(' · ') +
        (entry.isIframe ? ' <span class="iframe-badge" title="iframe">⧉</span>' : '') +
        (time ? '<br>' + time : '') +
      '</span>';

    row.addEventListener('click', function () { selectEntry(entry, row); });
    return row;
  }

  // ─── Selection ──────────────────────────────────────────────────────────────
  function selectEntry(entry, row) {
    if (selectedEntry && selectedEntry.id === entry.id) {
      selectedEntry = null;
      row.classList.remove('selected');
      detailPanel.classList.remove('open');
      return;
    }
    listWrap.querySelectorAll('.req-item.selected').forEach(function (el) { el.classList.remove('selected'); });
    selectedEntry = entry;
    row.classList.add('selected');
    showDetail(entry);
  }

  // ─── Render list ────────────────────────────────────────────────────────────
  function renderList() {
    var filtered = getFilteredCaptures();
    listWrap.innerHTML = '';
    selectedEntry = null;
    detailPanel.classList.remove('open');

    if (filtered.length === 0) {
      emptyMsg.textContent = captures.length === 0
        ? (isCapturing ? 'Aguardando requisições…' : 'Clique em "Iniciar" para capturar')
        : 'Nenhuma requisição corresponde ao filtro';
      emptyMsg.style.display = 'block';
      listWrap.appendChild(emptyMsg);
      updateCount();
      return;
    }

    emptyMsg.style.display = 'none';
    var frag = document.createDocumentFragment();
    var reversed = filtered.slice().reverse();
    reversed.forEach(function (entry, idx) {
      var row = createRow(entry);
      if (idx === 0) row.classList.add('req-latest');
      frag.appendChild(row);
    });
    listWrap.appendChild(frag);
    updateCount();
  }

  function appendEntryToList(entry) {
    if (!matchesFilter(entry)) return;
    if (emptyMsg.style.display !== 'none') {
      emptyMsg.style.display = 'none';
      if (emptyMsg.parentNode === listWrap) listWrap.removeChild(emptyMsg);
    }
    // Remove latest highlight from previous top
    var prevLatest = listWrap.querySelector('.req-latest');
    if (prevLatest) prevLatest.classList.remove('req-latest');
    // Insert new entry at top
    var row = createRow(entry);
    row.classList.add('req-latest');
    listWrap.insertBefore(row, listWrap.firstChild);
  }

  // ─── Detail panel ───────────────────────────────────────────────────────────
  function showDetail(entry) {
    detailPanel.classList.add('open');

    var tabs = [{ id: 'general', label: 'Geral' }];
    if (entry.requestHeaders && Object.keys(entry.requestHeaders).length) tabs.push({ id: 'reqH', label: 'Req Headers' });
    if (entry.requestJson != null || entry.requestText || entry.requestBase64) tabs.push({ id: 'reqB', label: 'Req Body' });
    if (entry.responseHeaders && Object.keys(entry.responseHeaders).length) tabs.push({ id: 'resH', label: 'Res Headers' });
    if (entry.responseJson != null || entry.responseText || entry.responseBase64) tabs.push({ id: 'resB', label: 'Response' });

    var activeTab = tabs[0].id;

    function render() {
      detailTabs.innerHTML = tabs.map(function (t) {
        return '<div class="detail-tab' + (t.id === activeTab ? ' active' : '') + '" data-tab="' + t.id + '">' + t.label + '</div>';
      }).join('');
      detailTabs.querySelectorAll('.detail-tab').forEach(function (el) {
        el.addEventListener('click', function () { activeTab = el.dataset.tab; render(); });
      });

      var html = '';
      switch (activeTab) {
        case 'general':
          var rows = [
            ['URL', entry.url || '—'],
            ['Método', entry.method || entry.transport],
            ['Transporte', entry.transport],
            ['Status', entry.status != null ? String(entry.status) : '—'],
            ['Duração', entry.duration != null ? entry.duration + 'ms' : '—'],
            ['Timestamp', entry.timestamp || '—'],
            ['Iframe', entry.isIframe ? 'Sim' : 'Não'],
            ['Página', entry.pageUrl || '—']
          ];
          if (entry.wsEvent) rows.splice(3, 0, ['WS Event', entry.wsEvent]);
          if (entry.direction) rows.splice(3, 0, ['Direção', entry.direction]);
          if (entry.sseEvent) rows.splice(3, 0, ['SSE Event', entry.sseEvent]);
          if (entry.error) rows.push(['Erro', entry.error]);
          if (entry.captureError) rows.push(['Erro Captura', entry.captureError]);
          html = '<table style="width:100%;border-collapse:collapse;">' + rows.map(function (r) {
            return '<tr style="border-bottom:1px solid #0e0e0e;"><td style="padding:4px 8px 4px 0;color:#555;font-size:10px;white-space:nowrap;vertical-align:top;">' +
              escapeHtml(r[0]) + '</td><td style="padding:4px 0;color:#ccc;font-size:11px;word-break:break-all;font-family:monospace;">' +
              escapeHtml(r[1]) + '</td></tr>';
          }).join('') + '</table>';
          break;
        case 'reqH':
          html = formatHeaders(entry.requestHeaders);
          break;
        case 'reqB':
          html = formatBody(entry.requestJson, entry.requestText, entry.requestBase64);
          break;
        case 'resH':
          html = formatHeaders(entry.responseHeaders);
          break;
        case 'resB':
          html = formatBody(entry.responseJson, entry.responseText, entry.responseBase64);
          break;
      }
      detailBody.innerHTML = html;
    }
    render();
  }

  function formatHeaders(headers) {
    if (!headers || !Object.keys(headers).length) return '<span style="color:#555;">Sem headers</span>';
    return '<pre>' + Object.entries(headers).map(function (kv) {
      return '<span class="json-key">' + escapeHtml(kv[0]) + '</span>: ' + escapeHtml(kv[1]);
    }).join('\n') + '</pre>';
  }

  function formatBody(json, text, base64) {
    if (json != null) return '<pre>' + syntaxHighlight(JSON.stringify(json, null, 2)) + '</pre>';
    if (text) {
      try {
        var parsed = JSON.parse(text);
        return '<pre>' + syntaxHighlight(JSON.stringify(parsed, null, 2)) + '</pre>';
      } catch (_) {
        return '<pre>' + escapeHtml(text) + '</pre>';
      }
    }
    if (base64) {
      var sz = Math.round(base64.length * 3 / 4);
      return '<span style="color:#555;">Dados binários (' + formatSize(sz) + ')</span>';
    }
    return '<span style="color:#555;">Sem conteúdo</span>';
  }

  function syntaxHighlight(json) {
    return escapeHtml(json).replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      function (match) {
        var cls = 'json-num';
        if (/^"/.test(match)) cls = /:$/.test(match) ? 'json-key' : 'json-str';
        else if (/true|false/.test(match)) cls = 'json-bool';
        else if (/null/.test(match)) cls = 'json-null';
        return '<span class="' + cls + '">' + match + '</span>';
      }
    );
  }

  // ─── Events ─────────────────────────────────────────────────────────────────
  btnToggle.addEventListener('click', function () {
    isCapturing ? stopCapture() : startCapture();
  });

  btnClear.addEventListener('click', function () {
    captures = [];
    selectedEntry = null;
    detailPanel.classList.remove('open');
    chrome.runtime.sendMessage({ type: 'INTERCEPTOR_CLEAR', tabId: targetTabId });
    renderList();
  });

  btnDownload.addEventListener('click', function () {
    var data = getFilteredCaptures();
    if (!data.length) return;
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'devx-intercept_' + new Date().toISOString().replace(/[:.]/g, '-') + '.json';
    a.click();
    URL.revokeObjectURL(url);
  });

  filterSearch.addEventListener('input', renderList);
  document.querySelectorAll('.filter-types input').forEach(function (cb) {
    cb.addEventListener('change', renderList);
  });

  // ─── Start / Stop ───────────────────────────────────────────────────────────
  function startCapture() {
    if (!targetTabId) return;
    btnToggle.disabled = true;
    chrome.runtime.sendMessage({ type: 'INTERCEPTOR_START', tabId: targetTabId }, function (resp) {
      btnToggle.disabled = false;
      if (chrome.runtime.lastError || !resp || !resp.ok) {
        var errMsg = (resp && resp.error) || 'Erro ao iniciar captura';
        emptyMsg.textContent = errMsg;
        emptyMsg.style.display = 'block';
        return;
      }
      isCapturing = true;
      updateUI();
    });
  }

  function stopCapture() {
    chrome.runtime.sendMessage({ type: 'INTERCEPTOR_STOP', tabId: targetTabId }, function () {
      isCapturing = false;
      updateUI();
    });
  }

  function updateUI() {
    statusDot.className = 'status-dot ' + (isCapturing ? 'active' : 'inactive');
    btnToggle.innerHTML = isCapturing ? '⏹ Parar' : '▶ Iniciar';
    btnToggle.className = 'hbtn ' + (isCapturing ? 'danger' : 'primary');
    // Update empty message text if list is empty
    if (captures.length === 0 && listWrap.querySelector('.empty-msg')) {
      emptyMsg.textContent = isCapturing ? 'Aguardando requisições…' : 'Clique em "Iniciar" para capturar';
    }
  }

  // ─── Init — load state from background ──────────────────────────────────────
  chrome.runtime.sendMessage({ type: 'INTERCEPTOR_GET_STATE', tabId: targetTabId }, function (resp) {
    if (chrome.runtime.lastError) return;
    if (resp) {
      isCapturing = resp.capturing;
      captures = resp.captures || [];
    }
    updateUI();
    renderList();
  });
})();
