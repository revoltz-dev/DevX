const iframeData = {};
let menuUpdateTimer = null;

let srState = { recording: false, isPaused: false, startTime: 0, done: false };
let srBadgeInterval = null;
let srBadgeVisible = true;
let srRecorderWindowId = null;

// ─── Interceptor state ────────────────────────────────────────────────────────
let interceptorActiveTabs = new Set();
let interceptorCaptures = {};
let interceptorPorts = [];

async function injectInterceptorInFrame(tabId, frameId) {
  try {
    await chrome.scripting.executeScript({
      target: { tabId, frameIds: [frameId] },
      world: 'ISOLATED',
      func: () => {
        if (window.__devxInterceptBridge) return;
        window.__devxInterceptBridge = true;
        window.addEventListener('message', (event) => {
          if (event.source !== window) return;
          if (event.data && event.data.type === '__DEVX_INTERCEPT__') {
            chrome.runtime.sendMessage({ type: 'INTERCEPTOR_CAPTURE', entry: event.data.entry });
          }
        });
      }
    });
    await chrome.scripting.executeScript({
      target: { tabId, frameIds: [frameId] },
      world: 'MAIN',
      files: ['interceptor-inject.js']
    });
  } catch (_) { /* frame may have navigated away or be restricted */ }
}

async function injectInterceptorAllFrames(tabId) {
  try {
    await chrome.scripting.executeScript({
      target: { tabId, allFrames: true },
      world: 'ISOLATED',
      func: () => {
        if (window.__devxInterceptBridge) return;
        window.__devxInterceptBridge = true;
        window.addEventListener('message', (event) => {
          if (event.source !== window) return;
          if (event.data && event.data.type === '__DEVX_INTERCEPT__') {
            chrome.runtime.sendMessage({ type: 'INTERCEPTOR_CAPTURE', entry: event.data.entry });
          }
        });
      }
    });
    await chrome.scripting.executeScript({
      target: { tabId, allFrames: true },
      world: 'MAIN',
      files: ['interceptor-inject.js']
    });
  } catch (_) {}
}

function startRecBadge() {
  clearInterval(srBadgeInterval);
  srBadgeVisible = true;
  chrome.action.setBadgeText({ text: "●" });
  chrome.action.setBadgeBackgroundColor({ color: "#00000000" });
  chrome.action.setBadgeTextColor({ color: "#ff5f57" });
  srBadgeInterval = setInterval(() => {
    srBadgeVisible = !srBadgeVisible;
    chrome.action.setBadgeText({ text: srBadgeVisible ? "●" : "" });
  }, 1000);
}

function stopRecBadge() {
  clearInterval(srBadgeInterval);
  srBadgeInterval = null;
  chrome.action.setBadgeText({ text: "" });
}

function setPausedBadge() {
  clearInterval(srBadgeInterval);
  chrome.action.setBadgeText({ text: "●" });
  chrome.action.setBadgeBackgroundColor({ color: "#00000000" });
  chrome.action.setBadgeTextColor({ color: "#febc2e" });
}

chrome.windows.onRemoved.addListener((windowId) => {
  if (windowId === srRecorderWindowId) {
    srRecorderWindowId = null;
    if (srState.recording) {
      srState = { recording: false, isPaused: false, startTime: 0, done: false };
      stopRecBadge();
    }
  }
});

// ─── Interceptor port connections ─────────────────────────────────────────────
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'interceptor') {
    interceptorPorts.push(port);
    port.onDisconnect.addListener(() => {
      interceptorPorts = interceptorPorts.filter(p => p !== port);
    });
  }
});

function updateIframeMenu(tabId) {
  clearTimeout(menuUpdateTimer);
  menuUpdateTimer = setTimeout(() => {
    const urls = iframeData[tabId] || [];

    chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "revoltz-parent",
      title: "DevX",
      contexts: ["page", "image"],
    });

    chrome.contextMenus.create({
      id: "revoltz-iframes-header",
      parentId: "revoltz-parent",
      title: `📦 Iframes (${urls.length})`,
      contexts: ["page"],
      enabled: urls.length > 0,
    });

    urls.forEach((url, i) => {
      const label = url.length > 60 ? url.substring(0, 60) + "…" : url;
      chrome.contextMenus.create({
        id: `revoltz-iframe-copy-${i}`,
        parentId: "revoltz-parent",
        title: `  Copiar: ${label}`,
        contexts: ["page"],
      });
    });

    chrome.contextMenus.create({ id: "sep-img", parentId: "revoltz-parent", type: "separator", contexts: ["image"] });
    chrome.contextMenus.create({ id: "revoltz-img-editor", parentId: "revoltz-parent", title: "🖼️ Abrir no Editor", contexts: ["image"] });
    chrome.contextMenus.create({ id: "revoltz-img-copy", parentId: "revoltz-parent", title: "📋 Copiar Imagem", contexts: ["image"] });
    chrome.contextMenus.create({ id: "sep-img-dl", parentId: "revoltz-parent", type: "separator", contexts: ["image"] });
    chrome.contextMenus.create({ id: "revoltz-save-png", parentId: "revoltz-parent", title: "📥 Salvar como PNG", contexts: ["image"] });
    chrome.contextMenus.create({ id: "revoltz-save-jpg", parentId: "revoltz-parent", title: "📥 Salvar como JPG", contexts: ["image"] });
    chrome.contextMenus.create({ id: "revoltz-save-webp", parentId: "revoltz-parent", title: "📥 Salvar como WebP", contexts: ["image"] });
    chrome.contextMenus.create({ id: "revoltz-save-avif", parentId: "revoltz-parent", title: "📥 Salvar como AVIF", contexts: ["image"] });
    chrome.contextMenus.create({ id: "revoltz-save-bmp", parentId: "revoltz-parent", title: "📥 Salvar como BMP", contexts: ["image"] });
    chrome.contextMenus.create({ id: "revoltz-save-ico", parentId: "revoltz-parent", title: "📥 Salvar como ICO", contexts: ["image"] });
    chrome.contextMenus.create({ id: "revoltz-save-gif", parentId: "revoltz-parent", title: "📥 Salvar como GIF", contexts: ["image"] });
    chrome.contextMenus.create({ id: "revoltz-save-original", parentId: "revoltz-parent", title: "📥 Salvar Original", contexts: ["image"] });
    });
  }, 150);
}

function updateBadge(tabId, count) {
  if (count > 0) {
    chrome.action.setBadgeText({ text: String(count), tabId });
    chrome.action.setBadgeBackgroundColor({ color: "#ffffff", tabId });
    chrome.action.setBadgeTextColor({ color: "#000000", tabId });
  } else {
    chrome.action.setBadgeText({ text: "", tabId });
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.type === "OPEN_EDITOR") {
    chrome.tabs.create({ url: chrome.runtime.getURL("editor.html") });
    return;
  }

  if (message.type === "COPY_IMAGE_TO_CLIPBOARD") {
    (async () => {
      try {
        const tabId = sender.tab?.id;
        if (!tabId) { sendResponse({ ok: false }); return; }
        await chrome.tabs.update(tabId, { active: true });
        await new Promise(r => setTimeout(r, 150));
        const results = await chrome.scripting.executeScript({
          target: { tabId },
          func: async (dataUrl) => {
            try {
              const b64 = dataUrl.split(",")[1];
              const bin = atob(b64);
              const arr = new Uint8Array(bin.length);
              for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
              const blob = new Blob([arr], { type: "image/png" });
              await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
              return true;
            } catch { return false; }
          },
          args: [message.dataUrl]
        });
        sendResponse({ ok: results?.[0]?.result === true });
      } catch {
        sendResponse({ ok: false });
      }
    })();
    return true;
  }

  if (message.type === "SR_OPEN_RECORDER") {
    (async () => {
      try {
        if (srRecorderWindowId != null) {
          try {
            await chrome.windows.update(srRecorderWindowId, { focused: true });
          } catch (e) {
            srRecorderWindowId = null;
            const win = await chrome.windows.create({
              url: chrome.runtime.getURL("recorder.html"),
              type: "popup", width: 420, height: 540, focused: true
            });
            srRecorderWindowId = win.id;
          }
        } else {
          const win = await chrome.windows.create({
            url: chrome.runtime.getURL("recorder.html"),
            type: "popup", width: 420, height: 540, focused: true
          });
          srRecorderWindowId = win.id;
        }
        sendResponse({ ok: true });
      } catch (e) {
        sendResponse({ error: e.message });
      }
    })();
    return true;
  }

  if (message.type === "SR_RECORDING_STARTED") {
    srState = { recording: true, isPaused: false, startTime: message.startTime, done: false };
    startRecBadge();
    return;
  }

  if (message.type === "SR_PAUSED") {
    srState = { ...srState, isPaused: true };
    setPausedBadge();
    return;
  }

  if (message.type === "SR_RESUMED") {
    srState = { ...srState, isPaused: false };
    startRecBadge();
    return;
  }

  if (message.type === "SR_STOPPED") {
    srState = { recording: false, isPaused: false, startTime: 0, done: true };
    stopRecBadge();
    return;
  }

  if (message.type === "SR_GET_STATE") {
    sendResponse({ ...srState, hasWindow: srRecorderWindowId != null });
    return;
  }

  if (message.type === "SR_NEW") {
    srState = { recording: false, isPaused: false, startTime: 0, done: false };
    return;
  }

  if (message.type === "SR_HEARTBEAT") {
    return;
  }

  if (message.type === "IFRAMES_UPDATED" && sender.tab) {
    const tabId = sender.tab.id;
    iframeData[tabId] = message.urls;
    updateBadge(tabId, message.urls.length);
    updateIframeMenu(tabId);
  }

  if (message.type === "CAPTURE_TAB" && sender.tab) {
    let attempt = 0;
    const tryCapture = () => {
      chrome.tabs.captureVisibleTab(sender.tab.windowId, { format: "png" }, (dataUrl) => {
        if (chrome.runtime.lastError) {
          attempt++;
          const delay = attempt < 5 ? 50 : 150;
          if (attempt < 20) {
            setTimeout(tryCapture, delay);
            return;
          }
          sendResponse({ dataUrl: null });
          return;
        }
        sendResponse({ dataUrl: dataUrl || null });
      });
    };
    tryCapture();
    return true;
  }

  if (message.type === "FP_PROGRESS") {
    return;
  }

  if (message.type === "DOWNLOAD_IMAGE_DIRECT") {
    chrome.downloads.download({
      url: message.url,
      filename: `revoltz/${message.filename}`,
      saveAs: false,
    });
  }

  if (message.type === "FETCH_IMAGE_AS_DATAURI") {
    fetch(message.url)
      .then((r) => r.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = () => sendResponse({ dataUri: reader.result });
        reader.readAsDataURL(blob);
      })
      .catch(() => sendResponse({ error: true }));
    return true;
  }

  // ─── Security Headers Check ─────────────────────────────────────────────────
  if (message.type === "CHECK_SEC_HEADERS") {
    const tabId = message.tabId;
    chrome.tabs.get(tabId, (tab) => {
      if (chrome.runtime.lastError || !tab?.url) {
        sendResponse({ headers: null });
        return;
      }
      fetch(tab.url, { method: "HEAD", mode: "no-cors" })
        .then(r => {
          const headers = {};
          r.headers.forEach((value, key) => { headers[key.toLowerCase()] = value; });
          sendResponse({ headers });
        })
        .catch(() => {
          // Fallback: try GET
          fetch(tab.url)
            .then(r => {
              const headers = {};
              r.headers.forEach((value, key) => { headers[key.toLowerCase()] = value; });
              sendResponse({ headers });
            })
            .catch(() => sendResponse({ headers: null }));
        });
    });
    return true;
  }

  // ─── Shortcut Trigger ───────────────────────────────────────────────────────
  if (message.type === "SHORTCUT_TRIGGER") {
    const featureId = message.featureId;
    // Map features to their content script action messages
    const actionMap = {
      colorpicker: "ACTIVATE_COLOR_PICKER",
      whatfont: "ACTIVATE_WHATFONT",
      unprotect: "ENABLE_FULL_UNPROTECT",
      saveimage: "ACTIVATE_IMAGE_SAVER",
      ruler: "ACTIVATE_RULER",
      deleteelem: "ACTIVATE_DELETE_ELEM",
      boxmodel: "ACTIVATE_BOX_MODEL",
      edittext: "TOGGLE_EDIT_TEXT",
      consolelog: "START_CONSOLE_CAPTURE",
    };
    // For toggle-based tools
    const toggleMap = {
      outline: "TOGGLE_OUTLINE",
      grid: "TOGGLE_GRID",
      darkmode: "TOGGLE_DARK_MODE",
      zindexmap: "TOGGLE_ZINDEX_MAP",
      disablejs: "DISABLE_JS",
      disablecss: "TOGGLE_CSS",
    };
    if (sender.tab) {
      const tabId = sender.tab.id;
      if (actionMap[featureId]) {
        const msg = { type: actionMap[featureId] };
        if (featureId === "edittext") { msg.on = true; msg.persist = false; }
        chrome.tabs.sendMessage(tabId, msg);
      } else if (toggleMap[featureId]) {
        // Toggle state tracked per tab
        if (!iframeData._toggles) iframeData._toggles = {};
        if (!iframeData._toggles[tabId]) iframeData._toggles[tabId] = {};
        const current = !!iframeData._toggles[tabId][featureId];
        iframeData._toggles[tabId][featureId] = !current;
        const msg = { type: toggleMap[featureId], on: !current };
        if (featureId === "grid") { msg.cols = 12; msg.color = "#6366f1"; }
        if (featureId === "disablecss") { msg.on = current; } // inverted: on=true means CSS enabled
        chrome.tabs.sendMessage(tabId, msg);
      } else {
        // For features that need popup open, use action popup
        chrome.action.openPopup?.();
      }
    }
  }

  // ─── Interceptor handlers ────────────────────────────────────────────────────
  if (message.type === "INTERCEPTOR_CAPTURE" && sender.tab) {
    const tabId = sender.tab.id;
    if (interceptorActiveTabs.has(tabId)) {
      if (!interceptorCaptures[tabId]) interceptorCaptures[tabId] = [];
      interceptorCaptures[tabId].push(message.entry);
      interceptorPorts.forEach(p => {
        try { p.postMessage({ type: 'capture', entry: message.entry, tabId }); } catch (_) {}
      });
    }
  }

  if (message.type === "INTERCEPTOR_OPEN") {
    chrome.windows.create({
      url: chrome.runtime.getURL('interceptor.html') + '?tabId=' + message.tabId,
      type: 'popup', width: 780, height: 620, focused: true
    });
  }

  if (message.type === "INTERCEPTOR_START") {
    const tabId = message.tabId;
    interceptorActiveTabs.add(tabId);
    if (!interceptorCaptures[tabId]) interceptorCaptures[tabId] = [];
    (async () => {
      try {
        await injectInterceptorAllFrames(tabId);
        sendResponse({ ok: true });
      } catch (err) {
        sendResponse({ ok: false, error: err.message });
      }
    })();
    return true;
  }

  if (message.type === "INTERCEPTOR_STOP") {
    const tabId = message.tabId;
    interceptorActiveTabs.delete(tabId);
    (async () => {
      try {
        await chrome.scripting.executeScript({
          target: { tabId, allFrames: true },
          world: 'MAIN',
          func: () => { window.__devxInterceptorActive = false; }
        });
      } catch (_) {}
      sendResponse({ ok: true });
    })();
    return true;
  }

  if (message.type === "INTERCEPTOR_GET_STATE") {
    const tabId = message.tabId;
    sendResponse({
      capturing: interceptorActiveTabs.has(tabId),
      captures: interceptorCaptures[tabId] || []
    });
  }

  if (message.type === "INTERCEPTOR_CLEAR") {
    interceptorCaptures[message.tabId] = [];
    sendResponse({ ok: true });
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "revoltz-img-editor" && info.srcUrl && tab) {
    (async () => {
      try {
        const response = await fetch(info.srcUrl);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onload = () => {
          chrome.storage.local.set({ revoltz_editor_image: reader.result }, () => {
            chrome.tabs.create({ url: chrome.runtime.getURL("editor.html") });
          });
        };
        reader.readAsDataURL(blob);
      } catch {
        chrome.tabs.sendMessage(tab.id, { type: "FETCH_AND_OPEN_EDITOR", url: info.srcUrl });
      }
    })();
    return;
  }

  if (info.menuItemId === "revoltz-img-copy" && info.srcUrl && tab) {
    (async () => {
      try {
        const response = await fetch(info.srcUrl);
        const blob = await response.blob();
        const imgBitmap = await createImageBitmap(blob);
        const cv = new OffscreenCanvas(imgBitmap.width, imgBitmap.height);
        cv.getContext("2d").drawImage(imgBitmap, 0, 0);
        const pngBlob = await cv.convertToBlob({ type: "image/png" });
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result;
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: async (du) => {
              try {
                const b = atob(du.split(",")[1]);
                const a = new Uint8Array(b.length);
                for (let i = 0; i < b.length; i++) a[i] = b.charCodeAt(i);
                await navigator.clipboard.write([new ClipboardItem({ "image/png": new Blob([a], { type: "image/png" }) })]);
              } catch {}
            },
            args: [dataUrl]
          });
        };
        reader.readAsDataURL(pngBlob);
      } catch {}
    })();
    return;
  }

  if (info.menuItemId.startsWith("revoltz-iframe-copy-")) {
    const index = parseInt(info.menuItemId.replace("revoltz-iframe-copy-", ""), 10);
    const urls = iframeData[tab.id] || [];
    if (urls[index]) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (text) => navigator.clipboard.writeText(text),
        args: [urls[index]],
      });
    }
  }

  if (info.menuItemId.startsWith("revoltz-save-")) {
    const format = info.menuItemId.replace("revoltz-save-", "");
    const srcUrl = info.srcUrl;
    if (srcUrl && tab) {
      chrome.tabs.sendMessage(tab.id, {
        type: "SAVE_IMAGE_AS",
        url: srcUrl,
        format: format,
      });
    }
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  delete iframeData[tabId];
  interceptorActiveTabs.delete(tabId);
  delete interceptorCaptures[tabId];
});

chrome.tabs.onActivated.addListener(({ tabId }) => {
  updateIframeMenu(tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === "loading") {
    iframeData[tabId] = [];
    updateBadge(tabId, 0);
    updateIframeMenu(tabId);
  }
  // Re-inject interceptor when a captured tab finishes loading (page reload/navigation)
  if (changeInfo.status === "complete" && interceptorActiveTabs.has(tabId)) {
    injectInterceptorAllFrames(tabId);
  }
});

// ─── Re-inject interceptor into new frames (iframes loaded after start) ───────
chrome.webNavigation.onDOMContentLoaded.addListener((details) => {
  const { tabId, frameId } = details;
  if (frameId === 0) return; // main frame handled by tabs.onUpdated
  if (!interceptorActiveTabs.has(tabId)) return;
  injectInterceptorInFrame(tabId, frameId);
});
