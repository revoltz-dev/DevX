(function () {
  let config = {};
  const unprotectState = {
    rightclick: false,
    select: false,
    copy: false,
  };

  const stopImmediate = (event) => event.stopImmediatePropagation();

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    if (document._revoltzEditActive) {
      document.querySelectorAll("[data-revoltz-editable]").forEach(el => {
        el.removeAttribute("contenteditable"); delete el.dataset.revoltzEditable; el.style.outline = "";
      });
      clearTimeout(document._revoltzSaveTimer);
      if (document._revoltzEditInputHandler) { document.removeEventListener("input", document._revoltzEditInputHandler, true); delete document._revoltzEditInputHandler; }
      if (document._revoltzEditNavGuard) {
        document.removeEventListener("click",       document._revoltzEditNavGuard, true);
        document.removeEventListener("mousedown",   document._revoltzEditNavGuard, true);
        document.removeEventListener("pointerdown", document._revoltzEditNavGuard, true);
        delete document._revoltzEditNavGuard;
      }
      if (document._revoltzEditKeyGuard) { document.removeEventListener("keydown", document._revoltzEditKeyGuard, true); delete document._revoltzEditKeyGuard; }
      if (document._revoltzEditSubmitGuard) { document.removeEventListener("submit", document._revoltzEditSubmitGuard, true); delete document._revoltzEditSubmitGuard; }
      delete document._revoltzEditPersist; delete document._revoltzEditActive;
    }

    if (colorPickerActive) deactivateColorPicker();
    if (whatFontActive) deactivateWhatFont();
    if (imageSaverActive) deactivateImageSaver();
    if (document.getElementById("revoltz-save-dialog")) closeImageSaveDialog();
    if (mobileViewFrame) deactivateMobileView();
    if (rulerActive) deactivateRuler();
    if (deleteElemActive) deactivateDeleteElem();
    if (captureElemActive) deactivateCaptureElem();
    if (boxModelActive) deactivateBoxModel();
    if (zIndexMapActive) deactivateZIndexMap();
  });

  if (new URL(window.location.href).searchParams.get("check") === "0") {
    unprotect("all");
  }

  chrome.storage.sync.get("revoltzConfig", (data) => {
    config = data.revoltzConfig || {};
    initIframeDetector();
  });

  chrome.storage.onChanged.addListener((changes) => {
    if (changes.revoltzConfig) {
      config = changes.revoltzConfig.newValue || {};
    }
  });

  function getIframeUrls() {
    const iframes = document.querySelectorAll("iframe");
    const urls = [];
    iframes.forEach((iframe) => {
      const src = iframe.src || iframe.getAttribute("src");
      if (src && src.trim() !== "" && !src.startsWith("about:") && !src.startsWith("javascript:")) {
        urls.push(src);
      }
    });
    return [...new Set(urls)];
  }

  function initIframeDetector() {
    function scan() {
      const urls = getIframeUrls();
      chrome.runtime.sendMessage({ type: "IFRAMES_UPDATED", urls });
    }
    scan();

    const observer = new MutationObserver((mutations) => {
      let shouldScan = false;
      for (const m of mutations) {
        if (m.type === "childList") {
          for (const n of m.addedNodes) {
            if (n.nodeType === 1 && (n.tagName === "IFRAME" || n.querySelector?.("iframe"))) { shouldScan = true; break; }
          }
          for (const n of m.removedNodes) {
            if (n.nodeType === 1 && (n.tagName === "IFRAME" || n.querySelector?.("iframe"))) { shouldScan = true; break; }
          }
        }
        if (m.type === "attributes" && m.target.tagName === "IFRAME") shouldScan = true;
        if (shouldScan) break;
      }
      if (shouldScan) scan();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["src"],
    });
  }

  let colorPickerActive = false;

  function activateColorPicker() {
    if (colorPickerActive) return;
    colorPickerActive = true;

    const canvas = document.createElement("canvas");
    canvas.id = "revoltz-colorpicker-canvas";
    canvas.style.cssText = "position:fixed;inset:0;z-index:2147483646;cursor:crosshair;opacity:0.01;";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    const tooltip = document.createElement("div");
    tooltip.id = "revoltz-color-tooltip";
    tooltip.style.cssText = "position:fixed;padding:8px 12px;background:#000;color:#fff;font-family:monospace;font-size:12px;border:1px solid #333;border-radius:6px;z-index:2147483647;pointer-events:none;display:none;display:flex;align-items:center;gap:8px;";
    document.body.appendChild(tooltip);

    chrome.runtime.sendMessage({ type: "CAPTURE_TAB" }, (response) => {
      if (!response?.dataUrl) {
        deactivateColorPicker();
        showToast("Erro ao capturar tela");
        return;
      }

      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        canvas.style.opacity = "0.01";
        ctx.drawImage(img, 0, 0);

        canvas.addEventListener("mousemove", (e) => {
          const scaleX = img.width / window.innerWidth;
          const scaleY = img.height / window.innerHeight;
          const px = Math.round(e.clientX * scaleX);
          const py = Math.round(e.clientY * scaleY);
          const pixel = ctx.getImageData(px, py, 1, 1).data;
          const hex = "#" + [pixel[0], pixel[1], pixel[2]].map((c) => c.toString(16).padStart(2, "0")).join("");
          const rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;

          tooltip.innerHTML = `<div style="width:18px;height:18px;border-radius:4px;background:${hex};border:1px solid #444;"></div><div>${hex}<br><span style='color:#666;font-size:10px;'>${rgb}</span></div>`;
          tooltip.style.display = "flex";
          tooltip.style.left = Math.min(e.clientX + 18, window.innerWidth - 200) + "px";
          tooltip.style.top = Math.min(e.clientY + 18, window.innerHeight - 60) + "px";
        });

        canvas.addEventListener("click", (e) => {
          const scaleX = img.width / window.innerWidth;
          const scaleY = img.height / window.innerHeight;
          const px = Math.round(e.clientX * scaleX);
          const py = Math.round(e.clientY * scaleY);
          const pixel = ctx.getImageData(px, py, 1, 1).data;
          const hex = "#" + [pixel[0], pixel[1], pixel[2]].map((c) => c.toString(16).padStart(2, "0")).join("");
          navigator.clipboard.writeText(hex);
          showToast(`Cor copiada: ${hex}`);
          deactivateColorPicker();
        });
      };
      img.src = response.dataUrl;
    });

    canvas.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      deactivateColorPicker();
    });
  }

  function deactivateColorPicker() {
    colorPickerActive = false;
    document.getElementById("revoltz-colorpicker-canvas")?.remove();
    document.getElementById("revoltz-color-tooltip")?.remove();
  }

  let whatFontActive = false;
  let whatFontOverlay = null;
  let whatFontTooltip = null;
  let whatFontHighlight = null;

  function activateWhatFont() {
    if (whatFontActive) return;
    whatFontActive = true;

    whatFontTooltip = document.createElement("div");
    whatFontTooltip.id = "revoltz-font-tooltip";
    whatFontTooltip.style.cssText = "position:fixed;padding:8px 12px;background:#000;color:#fff;font-family:monospace;font-size:11px;border:1px solid #333;border-radius:6px;z-index:2147483647;pointer-events:none;display:none;max-width:300px;line-height:1.6;";
    document.body.appendChild(whatFontTooltip);

    whatFontHighlight = document.createElement("div");
    whatFontHighlight.id = "revoltz-font-highlight";
    whatFontHighlight.style.cssText = "position:fixed;border:2px solid rgba(255,255,255,0.4);border-radius:3px;z-index:2147483645;pointer-events:none;display:none;transition:top 0.05s,left 0.05s,width 0.05s,height 0.05s;";
    document.body.appendChild(whatFontHighlight);

    document.addEventListener("mousemove", whatFontMouseMove, true);
    document.addEventListener("click", whatFontClick, true);
    document.addEventListener("contextmenu", whatFontRightClick, true);
  }

  function whatFontMouseMove(e) {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (!el || el === whatFontTooltip || el === whatFontHighlight || el.id?.startsWith("revoltz-")) return;

    const style = getComputedStyle(el);
    whatFontTooltip.innerHTML = `Font: ${style.fontFamily}<br>Size: ${style.fontSize}<br>Weight: ${style.fontWeight}<br>Style: ${style.fontStyle}<br>Color: ${style.color}`;
    whatFontTooltip.style.display = "block";
    whatFontTooltip.style.left = Math.min(e.clientX + 16, window.innerWidth - 320) + "px";
    whatFontTooltip.style.top = Math.min(e.clientY + 16, window.innerHeight - 100) + "px";

    const rect = el.getBoundingClientRect();
    whatFontHighlight.style.display = "block";
    whatFontHighlight.style.left = rect.left + "px";
    whatFontHighlight.style.top = rect.top + "px";
    whatFontHighlight.style.width = rect.width + "px";
    whatFontHighlight.style.height = rect.height + "px";
  }

  function whatFontClick(e) {
    if (!whatFontActive) return;
    e.preventDefault();
    e.stopPropagation();

    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (el && !el.id?.startsWith("revoltz-")) {
      const style = getComputedStyle(el);
      const fontInfo = `${style.fontFamily} / ${style.fontSize} / ${style.fontWeight}`;
      navigator.clipboard.writeText(fontInfo);
      showToast(`Fonte copiada: ${fontInfo}`);
    }
    deactivateWhatFont();
  }

  function whatFontRightClick(e) {
    if (!whatFontActive) return;
    e.preventDefault();
    deactivateWhatFont();
  }

  function deactivateWhatFont() {
    whatFontActive = false;
    document.removeEventListener("mousemove", whatFontMouseMove, true);
    document.removeEventListener("click", whatFontClick, true);
    document.removeEventListener("contextmenu", whatFontRightClick, true);
    document.getElementById("revoltz-font-tooltip")?.remove();
    document.getElementById("revoltz-font-highlight")?.remove();
    whatFontTooltip = null;
    whatFontHighlight = null;
  }

  function changeFont(fontName) {
    applyFontToDocument(document, fontName);

    document.querySelectorAll("iframe").forEach((iframe) => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) applyFontToDocument(iframeDoc, fontName);
      } catch (e) {}
    });
  }

  function applyFontToDocument(doc, fontName) {
    let link = doc.getElementById("revoltz-google-font");
    if (!link) {
      link = doc.createElement("link");
      link.id = "revoltz-google-font";
      link.rel = "stylesheet";
      (doc.head || doc.documentElement).appendChild(link);
    }
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:wght@100;200;300;400;500;600;700;800;900&display=swap`;

    let style = doc.getElementById("revoltz-font-override");
    if (!style) {
      style = doc.createElement("style");
      style.id = "revoltz-font-override";
      (doc.head || doc.documentElement).appendChild(style);
    }
    style.textContent = `*:not(svg):not(svg *):not(i):not(.fa):not([class*="icon"]) { font-family: "${fontName}", sans-serif !important; }`;
  }

  function resetFont() {
    document.getElementById("revoltz-google-font")?.remove();
    document.getElementById("revoltz-font-override")?.remove();

    document.querySelectorAll("iframe").forEach((iframe) => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
          iframeDoc.getElementById("revoltz-google-font")?.remove();
          iframeDoc.getElementById("revoltz-font-override")?.remove();
        }
      } catch (e) {}
    });
  }

  function unprotect(mode) {
    const parent = document.documentElement || document.head;
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("inject.js");
    script.dataset.mode = mode;
    script.onload = () => script.remove();
    script.onerror = () => script.remove();
    parent?.appendChild(script);

    if (mode === "all" || mode === "rightclick") {
      if (!unprotectState.rightclick) {
        document.addEventListener("contextmenu", stopImmediate, true);
        unprotectState.rightclick = true;
      }
    }
    if (mode === "all" || mode === "select") {
      document.querySelectorAll("*").forEach((el) => {
        el.style.userSelect = "auto";
        el.style.webkitUserSelect = "auto";
      });

      let style = document.getElementById("revoltz-unprotect-style");
      if (!style) {
        style = document.createElement("style");
        style.id = "revoltz-unprotect-style";
        (document.head || document.documentElement).appendChild(style);
      }
      style.textContent = "* { user-select: auto !important; -webkit-user-select: auto !important; }";
      unprotectState.select = true;
    }
    if (mode === "all" || mode === "copy") {
      if (!unprotectState.copy) {
        document.addEventListener("copy", stopImmediate, true);
        document.addEventListener("cut", stopImmediate, true);
        document.addEventListener("paste", stopImmediate, true);
        unprotectState.copy = true;
      }
    }
  }

  let imageSaverActive = false;

  function activateImageSaver() {
    if (imageSaverActive) return;
    imageSaverActive = true;

    const overlay = document.createElement("div");
    overlay.id = "revoltz-imgsaver-overlay";
    overlay.style.cssText = "position:fixed;inset:0;z-index:2147483646;cursor:crosshair;";
    document.body.appendChild(overlay);

    const tooltip = document.createElement("div");
    tooltip.id = "revoltz-img-tooltip";
    tooltip.style.cssText = "position:fixed;padding:6px 10px;background:#000;color:#fff;font-family:monospace;font-size:11px;border:1px solid #333;border-radius:6px;z-index:2147483647;pointer-events:none;display:none;";
    tooltip.textContent = "Clique esquerdo na imagem";
    document.body.appendChild(tooltip);

    overlay.addEventListener("mousemove", (e) => {
      tooltip.style.display = "block";
      tooltip.style.left = e.clientX + 16 + "px";
      tooltip.style.top = e.clientY + 16 + "px";

      const imgUrl = getImageUrlFromPoint(overlay, e.clientX, e.clientY);

      if (imgUrl) {
        tooltip.textContent = "Clique para salvar";
        tooltip.style.borderColor = "#fff";
      } else {
        tooltip.textContent = "Selecione uma imagem";
        tooltip.style.borderColor = "#333";
      }
    });

    overlay.addEventListener("click", (e) => {
      const imgUrl = getImageUrlFromPoint(overlay, e.clientX, e.clientY);

      if (imgUrl) {
        showImageSaveDialog(imgUrl);
        deactivateImageSaver();
      } else {
        showToast("Nenhuma imagem encontrada nesse ponto");
      }
    });

    overlay.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      deactivateImageSaver();
    });
  }

  function deactivateImageSaver() {
    imageSaverActive = false;
    document.getElementById("revoltz-imgsaver-overlay")?.remove();
    document.getElementById("revoltz-img-tooltip")?.remove();
  }

  function getImageUrlFromPoint(overlay, x, y) {
    overlay.style.pointerEvents = "none";
    const el = document.elementFromPoint(x, y);
    overlay.style.pointerEvents = "auto";
    return getImageUrlFromElement(el);
  }

  function getImageUrlFromElement(element) {
    let current = element;

    while (current && current !== document.documentElement) {
      const tagName = current.tagName;

      if (tagName === "IMG") {
        return current.currentSrc || current.src || null;
      }

      if (tagName === "INPUT" && current.type === "image") {
        return current.currentSrc || current.src || null;
      }

      if (tagName === "PICTURE") {
        const img = current.querySelector("img");
        if (img?.currentSrc || img?.src) {
          return img.currentSrc || img.src;
        }

        const source = current.querySelector("source[srcset]");
        if (source?.srcset) {
          return source.srcset.split(",")[0].trim().split(" ")[0] || null;
        }
      }

      if (tagName === "CANVAS") {
        try {
          return current.toDataURL("image/png");
        } catch (error) {
          return null;
        }
      }

      if (tagName === "SVG") {
        return svgToDataUrl(current);
      }

      if (tagName === "IMAGE" && current.href?.baseVal) {
        return current.href.baseVal;
      }

      const backgroundImage = getComputedStyle(current).backgroundImage;
      const bgMatch = backgroundImage.match(/url\(["']?(.+?)["']?\)/);
      if (bgMatch?.[1]) {
        return bgMatch[1];
      }

      current = current.parentElement;
    }

    return null;
  }

  function svgToDataUrl(svgElement) {
    try {
      const serialized = new XMLSerializer().serializeToString(svgElement);
      return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(serialized)}`;
    } catch (error) {
      return null;
    }
  }

  function showImageSaveDialog(imgUrl) {
    const existing = document.getElementById("revoltz-save-dialog");
    if (existing) closeImageSaveDialog();

    const dialog = document.createElement("div");
    dialog.id = "revoltz-save-dialog";
    dialog.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#000;border:1px solid #333;border-radius:12px;padding:20px;z-index:2147483647;font-family:sans-serif;color:#fff;min-width:280px;text-align:center;";

    const title = document.createElement("div");
    title.textContent = "Salvar Imagem";
    title.style.cssText = "font-size:14px;font-weight:700;margin-bottom:12px;";
    dialog.appendChild(title);

    const preview = document.createElement("img");
    preview.src = imgUrl;
    preview.style.cssText = "max-width:200px;max-height:120px;border-radius:6px;margin-bottom:12px;border:1px solid #222;";
    dialog.appendChild(preview);

    const actionsRow = document.createElement("div");
    actionsRow.style.cssText = "display:flex;gap:6px;justify-content:center;margin-bottom:12px;";

    const editorBtn = document.createElement("button");
    editorBtn.textContent = "🖼️ Editor";
    editorBtn.style.cssText = "background:#111;border:1px solid #4ade80;color:#4ade80;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:11px;font-weight:700;flex:1;";
    editorBtn.addEventListener("mouseenter", () => { editorBtn.style.background = "#0a1a0a"; });
    editorBtn.addEventListener("mouseleave", () => { editorBtn.style.background = "#111"; });
    editorBtn.addEventListener("click", () => {
      closeImageSaveDialog();
      function sendToEditor(dataUrl) {
        chrome.storage.local.set({ revoltz_editor_image: dataUrl }, () => {
          chrome.runtime.sendMessage({ type: "OPEN_EDITOR" });
        });
      }
      if (imgUrl.startsWith("data:")) {
        sendToEditor(imgUrl);
      } else {
        chrome.runtime.sendMessage({ type: "FETCH_IMAGE_AS_DATAURI", url: imgUrl }, (resp) => {
          if (resp?.dataUri) sendToEditor(resp.dataUri);
          else showToast("Erro ao carregar imagem");
        });
      }
    });
    actionsRow.appendChild(editorBtn);

    const copyBtn = document.createElement("button");
    copyBtn.textContent = "📋 Copiar";
    copyBtn.style.cssText = "background:#111;border:1px solid #60a5fa;color:#60a5fa;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:11px;font-weight:700;flex:1;";
    copyBtn.addEventListener("mouseenter", () => { copyBtn.style.background = "#0a0a1a"; });
    copyBtn.addEventListener("mouseleave", () => { copyBtn.style.background = "#111"; });
    copyBtn.addEventListener("click", () => {
      function copyDataUrl(dataUrl) {
        try {
          const b64 = dataUrl.split(",")[1];
          const bin = atob(b64);
          const arr = new Uint8Array(bin.length);
          for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
          const blob = new Blob([arr], { type: "image/png" });
          navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
            .then(() => { showToast("Copiado ✓"); closeImageSaveDialog(); })
            .catch(() => {
              chrome.runtime.sendMessage({ type: "COPY_IMAGE_TO_CLIPBOARD", dataUrl }, (resp) => {
                showToast(resp?.ok ? "Copiado ✓" : "Erro ao copiar");
                if (resp?.ok) closeImageSaveDialog();
              });
            });
        } catch {
          chrome.runtime.sendMessage({ type: "COPY_IMAGE_TO_CLIPBOARD", dataUrl }, (resp) => {
            showToast(resp?.ok ? "Copiado ✓" : "Erro ao copiar");
            if (resp?.ok) closeImageSaveDialog();
          });
        }
      }
      if (imgUrl.startsWith("data:")) {
        copyDataUrl(imgUrl);
      } else {
        chrome.runtime.sendMessage({ type: "FETCH_IMAGE_AS_DATAURI", url: imgUrl }, (resp) => {
          if (resp?.dataUri) copyDataUrl(resp.dataUri);
          else showToast("Erro ao carregar imagem");
        });
      }
    });
    actionsRow.appendChild(copyBtn);
    dialog.appendChild(actionsRow);

    const dlLabel = document.createElement("div");
    dlLabel.textContent = "📥 Baixar como";
    dlLabel.style.cssText = "font-size:10px;color:#666;font-weight:600;margin-bottom:6px;";
    dialog.appendChild(dlLabel);

    const formats = ["png", "jpg", "webp", "avif", "bmp", "ico", "gif", "original"];
    const btnsContainer = document.createElement("div");
    btnsContainer.style.cssText = "display:flex;gap:6px;justify-content:center;flex-wrap:wrap;max-width:260px;margin:0 auto;";

    formats.forEach((fmt) => {
      const btn = document.createElement("button");
      btn.textContent = fmt.toUpperCase();
      btn.style.cssText = "background:#111;border:1px solid #333;color:#fff;padding:6px 14px;border-radius:6px;cursor:pointer;font-size:11px;font-weight:600;";
      btn.addEventListener("mouseenter", () => { btn.style.borderColor = "#fff"; });
      btn.addEventListener("mouseleave", () => { btn.style.borderColor = "#333"; });
      btn.addEventListener("click", () => downloadImage(imgUrl, fmt));
      btnsContainer.appendChild(btn);
    });

    dialog.appendChild(btnsContainer);

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Fechar";
    closeBtn.style.cssText = "background:none;border:none;color:#555;cursor:pointer;font-size:11px;margin-top:12px;";
    closeBtn.addEventListener("click", closeImageSaveDialog);
    dialog.appendChild(closeBtn);

    const backdrop = document.createElement("div");
    backdrop.id = "revoltz-save-backdrop";
    backdrop.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:2147483646;";
    backdrop.addEventListener("click", closeImageSaveDialog);

    document.body.appendChild(backdrop);
    document.body.appendChild(dialog);
  }

  function closeImageSaveDialog() {
    document.getElementById("revoltz-save-backdrop")?.remove();
    document.getElementById("revoltz-save-dialog")?.remove();
  }

  function getFilenameFromUrl(url, format) {
    try {
      const urlObj = new URL(url);
      let name = urlObj.pathname.split("/").pop() || "";
      name = name.split("?")[0].split("#")[0];
      name = name.replace(/\.[^.]+$/, "");
      name = name.replace(/[^a-zA-Z0-9_-]/g, "_");
      if (name.length > 32) name = name.substring(0, 32);
      if (!name) name = "image";
      return `${name}.${format}`;
    } catch {
      return `image-${Date.now()}.${format}`;
    }
  }

  function getOriginalExtension(url) {
    try {
      const pathname = new URL(url).pathname;
      const match = pathname.match(/\.([a-zA-Z0-9]+)$/);
      return match ? match[1].toLowerCase() : "png";
    } catch {
      return "png";
    }
  }

  function downloadDirect(url, filename) {
    chrome.runtime.sendMessage({ type: "FETCH_IMAGE_AS_DATAURI", url: url }, (resp) => {
      if (resp?.dataUri) {
        outputImage(resp.dataUri, filename);
      } else {
        chrome.runtime.sendMessage({
          type: "DOWNLOAD_IMAGE_DIRECT",
          url: url,
          filename: filename,
        });
      }
    });
  }

  function downloadImage(url, format) {
    closeImageSaveDialog();

    // "original" — download as-is, no conversion
    if (format === "original") {
      const ext = getOriginalExtension(url);
      const filename = getFilenameFromUrl(url, ext);
      downloadDirect(url, filename);
      return;
    }

    // "gif" — canvas can't export GIF, download original
    if (format === "gif") {
      const filename = getFilenameFromUrl(url, "gif");
      downloadDirect(url, filename);
      return;
    }

    // ICO — convert via canvas to PNG then rename to .ico (valid ICO viewers accept PNG-in-ICO)
    // BMP — canvas.toBlob doesn't support BMP natively, so we manually build BMP
    if (format === "ico" || format === "bmp") {
      const filename = getFilenameFromUrl(url, format);
      convertWithCanvas(url, filename, format);
      return;
    }

    // Standard canvas formats: png, jpg, webp, avif
    const mimeTypes = { png: "image/png", jpg: "image/jpeg", webp: "image/webp", avif: "image/avif" };
    const mimeType = mimeTypes[format] || "image/png";
    const filename = getFilenameFromUrl(url, format);

    function convertAndDownload(imgSrc, isRetry) {
      const canvas = document.createElement("canvas");
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        canvas.getContext("2d").drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob && blob.type === mimeType) {
            saveBlobAs(blob, filename);
          } else if (blob) {
            // Browser didn't support the requested mime, fallback to PNG
            saveBlobAs(blob, getFilenameFromUrl(url, "png"));
            showToast(`Formato ${format.toUpperCase()} não suportado, salvo como PNG`);
          }
        }, mimeType, 0.95);
      };
      img.onerror = () => {
        if (!isRetry) {
          chrome.runtime.sendMessage({ type: "FETCH_IMAGE_AS_DATAURI", url: url }, (resp) => {
            if (resp?.dataUri) {
              convertAndDownload(resp.dataUri, true);
            } else {
              chrome.runtime.sendMessage({
                type: "DOWNLOAD_IMAGE_DIRECT",
                url: url,
                filename: filename,
              });
            }
          });
        } else {
          chrome.runtime.sendMessage({
            type: "DOWNLOAD_IMAGE_DIRECT",
            url: url,
            filename: filename,
          });
        }
      };
      img.src = imgSrc;
    }

    convertAndDownload(url, false);
  }

  function saveBlobAs(blob, filename) {
    if (config.imageOutputMode !== "download") {
      const reader = new FileReader();
      reader.onload = () => outputImage(reader.result, filename);
      reader.readAsDataURL(blob);
      return;
    }
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
  }

  function outputImage(dataUrl, filename) {
    const mode = config.imageOutputMode || "editor";
    if (mode === "download") {
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = filename || `devx-${Date.now()}.png`;
      a.click();
      return;
    }
    chrome.storage.local.set({ revoltz_editor_image: dataUrl }, () => {
      chrome.runtime.sendMessage({ type: "OPEN_EDITOR" });
    });
  }

  function convertWithCanvas(url, filename, format) {
    function doConvert(imgSrc, isRetry) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const w = format === "ico" ? Math.min(img.naturalWidth, 256) : img.naturalWidth;
        const h = format === "ico" ? Math.min(img.naturalHeight, 256) : img.naturalHeight;
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);

        if (format === "bmp") {
          const imageData = ctx.getImageData(0, 0, w, h);
          const bmpBlob = createBMP(imageData, w, h);
          saveBlobAs(bmpBlob, filename);
        } else {
          // ICO: wrap a PNG inside an ICO container
          canvas.toBlob((pngBlob) => {
            if (!pngBlob) return;
            pngBlob.arrayBuffer().then((pngBuf) => {
              const icoBlob = createICO(new Uint8Array(pngBuf), w, h);
              saveBlobAs(icoBlob, filename);
            });
          }, "image/png");
        }
      };
      img.onerror = () => {
        if (!isRetry) {
          chrome.runtime.sendMessage({ type: "FETCH_IMAGE_AS_DATAURI", url: url }, (resp) => {
            if (resp?.dataUri) doConvert(resp.dataUri, true);
            else downloadDirect(url, filename);
          });
        } else {
          downloadDirect(url, filename);
        }
      };
      img.src = imgSrc;
    }
    doConvert(url, false);
  }

  function createBMP(imageData, w, h) {
    const rowSize = Math.ceil((w * 3) / 4) * 4;
    const pixelDataSize = rowSize * h;
    const headerSize = 54;
    const fileSize = headerSize + pixelDataSize;
    const buf = new ArrayBuffer(fileSize);
    const view = new DataView(buf);

    // BMP Header
    view.setUint8(0, 0x42); view.setUint8(1, 0x4D); // "BM"
    view.setUint32(2, fileSize, true);
    view.setUint32(10, headerSize, true);
    // DIB Header
    view.setUint32(14, 40, true);
    view.setInt32(18, w, true);
    view.setInt32(22, h, true);
    view.setUint16(26, 1, true); // planes
    view.setUint16(28, 24, true); // bpp
    view.setUint32(34, pixelDataSize, true);

    const pixels = imageData.data;
    let offset = headerSize;
    for (let y = h - 1; y >= 0; y--) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        view.setUint8(offset++, pixels[i + 2]); // B
        view.setUint8(offset++, pixels[i + 1]); // G
        view.setUint8(offset++, pixels[i]);     // R
      }
      // Row padding
      while (offset % 4 !== headerSize % 4) {
        if ((offset - headerSize) % rowSize !== 0 || offset === headerSize) { view.setUint8(offset++, 0); }
        else break;
      }
      offset = headerSize + rowSize * (h - y);
    }

    return new Blob([buf], { type: "image/bmp" });
  }

  function createICO(pngData, w, h) {
    const iconDir = 6; // ICONDIR size
    const iconEntry = 16; // ICONDIRENTRY size
    const totalSize = iconDir + iconEntry + pngData.length;
    const buf = new ArrayBuffer(totalSize);
    const view = new DataView(buf);

    // ICONDIR
    view.setUint16(0, 0, true);     // reserved
    view.setUint16(2, 1, true);     // type: 1 = ICO
    view.setUint16(4, 1, true);     // count: 1 image

    // ICONDIRENTRY
    view.setUint8(6, w >= 256 ? 0 : w);  // width (0 = 256)
    view.setUint8(7, h >= 256 ? 0 : h);  // height (0 = 256)
    view.setUint8(8, 0);            // color palette
    view.setUint8(9, 0);            // reserved
    view.setUint16(10, 1, true);    // color planes
    view.setUint16(12, 32, true);   // bits per pixel
    view.setUint32(14, pngData.length, true);  // image size
    view.setUint32(18, iconDir + iconEntry, true); // offset

    // PNG data
    const uint8 = new Uint8Array(buf);
    uint8.set(pngData, iconDir + iconEntry);

    return new Blob([buf], { type: "image/x-icon" });
  }

  let mobileViewFrame = null;

  // ─── Ruler ──────────────────────────────────────────────────────────────────
  let rulerActive = false;
  let rulerPoints = [];

  function activateRuler() {
    if (rulerActive) return;
    rulerActive = true;
    rulerPoints = [];

    const canvas = document.createElement("canvas");
    canvas.id = "revoltz-ruler-canvas";
    canvas.style.cssText = "position:fixed;inset:0;z-index:2147483645;pointer-events:none;";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const overlay = document.createElement("div");
    overlay.id = "revoltz-ruler-overlay";
    overlay.style.cssText = "position:fixed;inset:0;z-index:2147483646;cursor:crosshair;";

    const tooltip = document.createElement("div");
    tooltip.id = "revoltz-ruler-tooltip";
    tooltip.style.cssText = "position:fixed;padding:5px 10px;background:#000;color:#fff;font-family:monospace;font-size:11px;border:1px solid #333;border-radius:6px;z-index:2147483647;pointer-events:none;display:none;";

    document.body.appendChild(canvas);
    document.body.appendChild(overlay);
    document.body.appendChild(tooltip);

    const ctx = canvas.getContext("2d");

    function drawLine(x2, y2) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!rulerPoints.length) return;
      const [x1, y1] = rulerPoints[0];
      ctx.beginPath();
      ctx.strokeStyle = "#f87171";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x1, y1, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#f87171";
      ctx.setLineDash([]);
      ctx.fill();
      const dist = Math.round(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2));
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      ctx.font = "bold 11px monospace";
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#000";
      ctx.strokeText(`${dist}px`, mx + 6, my - 6);
      ctx.fillStyle = "#fff";
      ctx.fillText(`${dist}px`, mx + 6, my - 6);
    }

    overlay.addEventListener("mousemove", (e) => {
      if (rulerPoints.length === 1) {
        drawLine(e.clientX, e.clientY);
        const [x1, y1] = rulerPoints[0];
        const dist = Math.round(Math.sqrt((e.clientX - x1) ** 2 + (e.clientY - y1) ** 2));
        tooltip.textContent = `${dist}px`;
        tooltip.style.display = "block";
        tooltip.style.left = Math.min(e.clientX + 16, window.innerWidth - 100) + "px";
        tooltip.style.top = Math.min(e.clientY + 16, window.innerHeight - 40) + "px";
      }
    });

    overlay.addEventListener("click", (e) => {
      if (rulerPoints.length === 0) {
        rulerPoints.push([e.clientX, e.clientY]);
        drawLine(e.clientX, e.clientY);
      } else {
        const [x1, y1] = rulerPoints[0];
        const dist = Math.round(Math.sqrt((e.clientX - x1) ** 2 + (e.clientY - y1) ** 2));
        const dx = Math.abs(e.clientX - x1), dy = Math.abs(e.clientY - y1);
        showToast(`${dist}px (Δx: ${dx} / Δy: ${dy})`);
        deactivateRuler();
      }
    });

    overlay.addEventListener("contextmenu", (e) => { e.preventDefault(); deactivateRuler(); });
  }

  function deactivateRuler() {
    rulerActive = false;
    rulerPoints = [];
    document.getElementById("revoltz-ruler-canvas")?.remove();
    document.getElementById("revoltz-ruler-overlay")?.remove();
    document.getElementById("revoltz-ruler-tooltip")?.remove();
  }

  // ─── Delete Element ──────────────────────────────────────────────────────────
  let deleteElemActive = false;
  let boxModelActive = false;
  let zIndexMapActive = false;

  function activateDeleteElem() {
    if (deleteElemActive) return;
    deleteElemActive = true;

    const highlight = document.createElement("div");
    highlight.id = "revoltz-delete-highlight";
    highlight.style.cssText = "position:fixed;border:2px solid #f87171;border-radius:3px;z-index:2147483645;pointer-events:none;display:none;background:rgba(248,113,113,0.08);transition:all 0.05s;";
    document.body.appendChild(highlight);

    showToast("Clique para remover um elemento · ESC para sair");

    function onMove(e) {
      const el = e.target;
      if (!el || el.id?.startsWith("revoltz-")) return;
      const rect = el.getBoundingClientRect();
      highlight.style.display = "block";
      highlight.style.left = rect.left + "px";
      highlight.style.top = rect.top + "px";
      highlight.style.width = rect.width + "px";
      highlight.style.height = rect.height + "px";
    }
    function onClick(e) {
      if (!deleteElemActive) return;
      e.preventDefault();
      e.stopPropagation();
      const el = e.target;
      if (el && !el.id?.startsWith("revoltz-")) { el.remove(); showToast("Elemento removido · clique para continuar removendo"); }
      // Mantém ativo — só ESC ou botão de desativar encerra
    }
    function onRightClick(e) { e.preventDefault(); deactivateDeleteElem(); }

    document.addEventListener("mousemove", onMove, true);
    document.addEventListener("click", onClick, true);
    document.addEventListener("contextmenu", onRightClick, true);

    highlight._cleanup = () => {
      document.removeEventListener("mousemove", onMove, true);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("contextmenu", onRightClick, true);
    };
  }

  function deactivateDeleteElem() {
    deleteElemActive = false;
    const h = document.getElementById("revoltz-delete-highlight");
    if (h) { h._cleanup?.(); h.remove(); }
  }

  // ─── Box Model Inspector ─────────────────────────────────────────────────────
  function activateBoxModel() {
    if (boxModelActive) return;
    boxModelActive = true;
    const overlay = document.createElement("div");
    overlay.id = "revoltz-boxmodel-overlay";
    overlay.style.cssText = "position:fixed;inset:0;z-index:2147483645;pointer-events:none;";
    document.body.appendChild(overlay);
    function onMove(e) {
      const el = e.target;
      if (!el || el.id?.startsWith("revoltz-")) return;
      const r = el.getBoundingClientRect();
      const cs = window.getComputedStyle(el);
      const mt = parseFloat(cs.marginTop)|0, mr = parseFloat(cs.marginRight)|0, mb = parseFloat(cs.marginBottom)|0, ml = parseFloat(cs.marginLeft)|0;
      const pt = parseFloat(cs.paddingTop)|0, pr = parseFloat(cs.paddingRight)|0, pb = parseFloat(cs.paddingBottom)|0, pl = parseFloat(cs.paddingLeft)|0;
      const bt = parseFloat(cs.borderTopWidth)|0, br2 = parseFloat(cs.borderRightWidth)|0, bb = parseFloat(cs.borderBottomWidth)|0, bl = parseFloat(cs.borderLeftWidth)|0;
      const tipLeft = Math.min(r.left, window.innerWidth - 180);
      const tipTop = r.top > 90 ? r.top - 84 : r.bottom + 4;
      overlay.innerHTML = `
        <div style="position:fixed;left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;outline:2px solid #60a5fa;background:rgba(96,165,250,0.07);box-sizing:border-box;"></div>
        <div style="position:fixed;left:${tipLeft}px;top:${tipTop}px;background:#000;border:1px solid #333;border-radius:6px;padding:7px 10px;font-size:10px;font-family:monospace;color:#fff;line-height:1.9;z-index:2147483646;min-width:160px;">
          <span style="color:#f87171;">margin</span> ${mt} ${mr} ${mb} ${ml}<br>
          <span style="color:#4ade80;">padding</span> ${pt} ${pr} ${pb} ${pl}<br>
          <span style="color:#facc15;">border</span> ${bt} ${br2} ${bb} ${bl}<br>
          <span style="color:#888;">${Math.round(r.width)}×${Math.round(r.height)}</span>
        </div>`;
    }
    document.addEventListener("mousemove", onMove, true);
    overlay._cleanup = () => document.removeEventListener("mousemove", onMove, true);
    showToast("Box Model ativo · ESC para sair");
  }
  function deactivateBoxModel() {
    boxModelActive = false;
    const o = document.getElementById("revoltz-boxmodel-overlay");
    if (o) { o._cleanup?.(); o.remove(); }
  }

  // ─── Z-index Map ───────────────────────────────────────────────────────────────────
  function activateZIndexMap() {
    zIndexMapActive = true;
    const wrap = document.createElement("div");
    wrap.id = "revoltz-zindex-wrap";
    wrap.style.cssText = "position:fixed;inset:0;z-index:2147483640;pointer-events:none;overflow:hidden;";
    const elements = [...document.querySelectorAll("*")].filter(el => {
      const z = window.getComputedStyle(el).zIndex;
      return z !== "auto" && !isNaN(parseInt(z)) && parseInt(z) !== 0;
    });
    elements.forEach(el => {
      const z = parseInt(window.getComputedStyle(el).zIndex);
      const rect = el.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      const hue = ((Math.abs(z) % 12) * 30);
      const div = document.createElement("div");
      div.style.cssText = `position:fixed;left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;height:${rect.height}px;outline:2px solid hsl(${hue},80%,60%);background:hsla(${hue},80%,60%,0.07);box-sizing:border-box;`;
      const label = document.createElement("div");
      label.style.cssText = `position:absolute;top:0;left:0;background:hsl(${hue},80%,35%);color:#fff;font-size:9px;font-family:monospace;padding:1px 4px;border-radius:0 0 3px 0;`;
      label.textContent = `z:${z}`;
      div.appendChild(label);
      wrap.appendChild(div);
    });
    document.body.appendChild(wrap);
    showToast(`Z-index map: ${elements.length} elementos · ESC para sair`);
  }
  function deactivateZIndexMap() {
    zIndexMapActive = false;
    document.getElementById("revoltz-zindex-wrap")?.remove();
  }

  // ─── Capture Element ─────────────────────────────────────────────────────────
  let captureElemActive = false;

  function _deepElementFromPoint(x, y) {
    let el = document.elementFromPoint(x, y);
    if (!el) return null;
    while (el.shadowRoot) {
      const inner = el.shadowRoot.elementFromPoint(x, y);
      if (!inner || inner === el) break;
      el = inner;
    }
    return el;
  }

  function _getBestCaptureTarget(el) {
    if (!el) return el;
    const isGeneric = (node) => {
      if (!node || !(node instanceof HTMLElement)) return false;
      const tag = node.tagName.toLowerCase();
      if (["div", "span", "section", "article", "main", "aside"].includes(tag)) {
        const rect = node.getBoundingClientRect();
        return rect.width < 5 || rect.height < 5;
      }
      return false;
    };
    if (isGeneric(el) && el.parentElement) return el.parentElement;
    return el;
  }

  function activateCaptureElem() {
    if (captureElemActive) return;
    captureElemActive = true;

    const highlight = document.createElement("div");
    highlight.id = "revoltz-capelem-highlight";
    highlight.style.cssText = "position:fixed;border:2px solid #4ade80;border-radius:3px;z-index:2147483645;pointer-events:none;display:none;background:rgba(74,222,128,0.05);transition:all 0.05s;";
    document.body.appendChild(highlight);

    const label = document.createElement("div");
    label.id = "revoltz-capelem-label";
    label.style.cssText = "position:fixed;background:#000;color:#4ade80;font-size:10px;font-family:monospace;padding:2px 6px;border-radius:3px;z-index:2147483646;pointer-events:none;display:none;white-space:nowrap;";
    document.body.appendChild(label);

    showToast("Clique para capturar um elemento · ESC para sair");

    let hoveredEl = null;

    function onMove(e) {
      let el = _deepElementFromPoint(e.clientX, e.clientY);
      if (!el || el.id?.startsWith("revoltz-")) { highlight.style.display = "none"; label.style.display = "none"; return; }
      el = _getBestCaptureTarget(el);
      hoveredEl = el;
      const rect = el.getBoundingClientRect();
      highlight.style.display = "block";
      highlight.style.left = rect.left + "px";
      highlight.style.top = rect.top + "px";
      highlight.style.width = rect.width + "px";
      highlight.style.height = rect.height + "px";
      const tag = el.tagName.toLowerCase();
      const id = el.id ? `#${el.id}` : "";
      const cls = el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".") : "";
      label.textContent = `${tag}${id}${cls} (${Math.round(rect.width)}×${Math.round(rect.height)})`;
      label.style.display = "block";
      label.style.left = Math.min(rect.left, window.innerWidth - 200) + "px";
      label.style.top = Math.max(rect.top - 20, 0) + "px";
    }

    function onClick(e) {
      if (!captureElemActive) return;
      e.preventDefault();
      e.stopPropagation();
      const el = hoveredEl || _deepElementFromPoint(e.clientX, e.clientY);
      if (!el || el.id?.startsWith("revoltz-")) { deactivateCaptureElem(); return; }
      highlight.style.display = "none";
      label.style.display = "none";
      deactivateCaptureElem();

      const rect = el.getBoundingClientRect();
      const needsScroll = rect.top < 0 || rect.bottom > window.innerHeight;
      if (needsScroll) {
        el.scrollIntoView({ block: "center", behavior: "instant" });
      }

      setTimeout(() => {
        const finalRect = el.getBoundingClientRect();
        if (finalRect.width < 1 || finalRect.height < 1) {
          showToast("Elemento muito pequeno para capturar");
          return;
        }

        const pad = 2;
        const captureRect = {
          left: Math.max(0, finalRect.left - pad),
          top: Math.max(0, finalRect.top - pad),
          width: Math.min(finalRect.width + pad * 2, window.innerWidth - Math.max(0, finalRect.left - pad)),
          height: Math.min(finalRect.height + pad * 2, window.innerHeight - Math.max(0, finalRect.top - pad))
        };

        chrome.runtime.sendMessage({ type: "CAPTURE_TAB" }, (response) => {
          if (!response?.dataUrl) { showToast("Erro ao capturar"); return; }
          const img = new Image();
          img.onload = () => {
            const dpr = img.width / window.innerWidth;
            const cv = document.createElement("canvas");
            cv.width = Math.round(captureRect.width * dpr);
            cv.height = Math.round(captureRect.height * dpr);
            cv.getContext("2d").drawImage(img,
              Math.round(captureRect.left * dpr), Math.round(captureRect.top * dpr),
              cv.width, cv.height, 0, 0, cv.width, cv.height);
            outputImage(cv.toDataURL("image/png"), `elemento-${Date.now()}.png`);
            showToast("Elemento capturado ✓");
          };
          img.src = response.dataUrl;
        });
      }, needsScroll ? 300 : 80);
    }

    function onRightClick(e) { e.preventDefault(); deactivateCaptureElem(); }

    document.addEventListener("mousemove", onMove, true);
    document.addEventListener("click", onClick, true);
    document.addEventListener("contextmenu", onRightClick, true);

    highlight._cleanup = () => {
      document.removeEventListener("mousemove", onMove, true);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("contextmenu", onRightClick, true);
    };
  }

  function deactivateCaptureElem() {
    captureElemActive = false;
    const h = document.getElementById("revoltz-capelem-highlight");
    if (h) { h._cleanup?.(); h.remove(); }
    document.getElementById("revoltz-capelem-label")?.remove();
  }

  // ─── Full Page Capture ───────────────────────────────────────────────────────
  const _fp = {
    delay(ms) { return new Promise(r => setTimeout(r, ms)); },

    injectStyle(css) {
      const s = document.createElement("style");
      s.className = "revoltz-fp-style";
      s.textContent = css;
      (document.head || document.documentElement).appendChild(s);
      return s;
    },

    getFixedStickyEls() {
      const fixed = [];
      const sticky = [];
      const walk = (node) => {
        if (!(node instanceof HTMLElement)) return;
        if (node.id?.startsWith("revoltz-")) return;
        try {
          const cs = window.getComputedStyle(node);
          if (cs.display === "none" || cs.visibility === "hidden") return;
          if (cs.position === "fixed") {
            const rect = node.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) fixed.push(node);
          }
          if (cs.position === "sticky") sticky.push(node);
        } catch {}
        for (const child of node.children) walk(child);
      };
      if (document.body) walk(document.body);
      return { fixed, sticky };
    },

    getPageDimensions() {
      const b = document.body;
      const d = document.documentElement;
      return {
        width: Math.max(b?.scrollWidth || 0, b?.offsetWidth || 0, d.scrollWidth, d.offsetWidth, d.clientWidth),
        height: Math.max(b?.scrollHeight || 0, b?.offsetHeight || 0, d.scrollHeight, d.offsetHeight, d.clientHeight),
        viewW: window.innerWidth,
        viewH: window.innerHeight
      };
    },

    captureTab() {
      return new Promise((resolve) => {
        let attempts = 0;
        const tryCapture = () => {
          chrome.runtime.sendMessage({ type: "CAPTURE_TAB" }, (r) => {
            if (chrome.runtime.lastError || !r?.dataUrl) {
              attempts++;
              if (attempts < 15) { setTimeout(tryCapture, 80); return; }
              resolve(null);
              return;
            }
            resolve(r.dataUrl);
          });
        };
        tryCapture();
      });
    },

    loadImg(src) {
      return new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = src;
      });
    },

    sendProgress(step, total) {
      try { chrome.runtime.sendMessage({ type: "FP_PROGRESS", step, total }); } catch {}
    }
  };

  async function captureFullPage() {
    const origX = window.scrollX;
    const origY = window.scrollY;
    const savedStyles = [];
    const injectedStyles = [];

    try {
      injectedStyles.push(_fp.injectStyle(`
        html, html * { scroll-behavior: auto !important; }
        *, *::before, *::after {
          transition: none !important;
          transition-delay: 0s !important;
          transition-duration: 0s !important;
          animation: none !important;
          animation-duration: 0s !important;
          animation-delay: 0s !important;
        }
        html::-webkit-scrollbar, body::-webkit-scrollbar { width: 0 !important; height: 0 !important; display: none !important; }
        html, body { scrollbar-width: none !important; }
      `));

      if (document.body) {
        const bodyCs = window.getComputedStyle(document.body);
        if (bodyCs.overflowY === "scroll" || bodyCs.overflowY === "hidden") {
          savedStyles.push({ el: document.body, prop: "overflowY", val: document.body.style.overflowY });
          document.body.style.overflowY = "visible";
        }
        if (bodyCs.overflowX === "hidden") {
          savedStyles.push({ el: document.body, prop: "overflowX", val: document.body.style.overflowX });
          document.body.style.overflowX = "visible";
        }
      }

      const { fixed: fixedEls, sticky: stickyEls } = _fp.getFixedStickyEls();

      const stickyBackup = stickyEls.map(el => ({ el, css: el.style.cssText }));
      stickyEls.forEach(el => {
        el.style.cssText += "; position: relative !important; top: auto !important; bottom: auto !important; left: auto !important; right: auto !important;";
      });

      const fixedBackup = fixedEls.map(el => ({ el, css: el.style.cssText }));
      const fixedHeaders = [];
      const fixedOther = [];
      fixedEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < 50 && rect.height < window.innerHeight * 0.3) {
          fixedHeaders.push(el);
        } else if (rect.bottom > window.innerHeight - 50 && rect.height < window.innerHeight * 0.2) {
          fixedOther.push(el);
        } else if (rect.height < window.innerHeight * 0.8) {
          fixedOther.push(el);
        }
      });

      fixedOther.forEach(el => {
        el.style.cssText += "; display: none !important;";
      });

      window.scrollTo(0, 0);
      await _fp.delay(50);

      let dims = _fp.getPageDimensions();
      window.scrollTo(0, dims.height);
      await _fp.delay(500);

      let maxAttempts = 5;
      let prevH = dims.height;
      while (maxAttempts-- > 0) {
        dims = _fp.getPageDimensions();
        if (dims.height <= prevH) break;
        prevH = dims.height;
        window.scrollTo(0, dims.height);
        await _fp.delay(300);
      }

      window.scrollTo(0, 0);
      await _fp.delay(200);

      dims = _fp.getPageDimensions();
      const { viewW, viewH } = dims;
      const totalH = dims.height;
      const totalW = dims.width;

      if (totalH <= viewH) {
        const dataUrl = await _fp.captureTab();
        return dataUrl || null;
      }

      const captures = [];
      const positions = [];
      const step = viewH - Math.ceil(window.devicePixelRatio);
      let y = 0;
      while (y < totalH) {
        positions.push(y);
        if (y + viewH >= totalH) break;
        y += step;
      }
      if (positions[positions.length - 1] + viewH < totalH) {
        positions.push(totalH - viewH);
      }

      const totalSteps = positions.length;
      _fp.sendProgress(0, totalSteps);

      for (let i = 0; i < positions.length; i++) {
        const scrollY = positions[i];
        const isFirst = i === 0;

        window.scrollTo(0, scrollY);
        await _fp.delay(30);

        if (!isFirst) {
          fixedHeaders.forEach(el => el.style.setProperty("visibility", "hidden", "important"));
        }

        await _fp.delay(isFirst ? 100 : 150);

        const actualY = Math.round(window.scrollY);

        const dataUrl = await _fp.captureTab();

        if (!isFirst) {
          fixedHeaders.forEach(el => el.style.removeProperty("visibility"));
        }

        if (!dataUrl) continue;

        captures.push({ dataUrl, scrollY: actualY, index: i });
        _fp.sendProgress(i + 1, totalSteps);
      }

      fixedBackup.forEach(s => { s.el.style.cssText = s.css; });
      stickyBackup.forEach(s => { s.el.style.cssText = s.css; });

      if (!captures.length) return null;

      const firstImg = await _fp.loadImg(captures[0].dataUrl);
      if (!firstImg) return null;

      const dpr = firstImg.width / viewW;
      const canvasH = Math.min(Math.round(totalH * dpr), 65535);
      const canvasW = Math.round(viewW * dpr);

      const canvas = document.createElement("canvas");
      canvas.width = canvasW;
      canvas.height = canvasH;
      const ctx = canvas.getContext("2d");

      for (let i = 0; i < captures.length; i++) {
        const cap = captures[i];
        const img = (i === 0) ? firstImg : await _fp.loadImg(cap.dataUrl);
        if (!img) continue;

        const isLast = (cap.scrollY + viewH >= totalH);
        const destY = Math.round(cap.scrollY * dpr);

        if (i === 0) {
          ctx.drawImage(img, 0, 0);
        } else if (isLast) {
          const bottomDestY = canvasH - img.height;
          if (bottomDestY >= 0) {
            ctx.drawImage(img, 0, bottomDestY);
          } else {
            ctx.drawImage(img, 0, 0);
          }
        } else {
          const prevCap = captures[i - 1];
          const prevBottom = Math.round((prevCap.scrollY + viewH) * dpr);
          const clipTop = Math.max(0, prevBottom - destY);

          if (clipTop < img.height) {
            ctx.drawImage(
              img,
              0, clipTop, img.width, img.height - clipTop,
              0, destY + clipTop, img.width, img.height - clipTop
            );
          }
        }
      }

      return canvas.toDataURL("image/png");
    } finally {
      injectedStyles.forEach(s => s.remove());
      savedStyles.forEach(s => { s.el.style[s.prop] = s.val; });
      window.scrollTo(origX, origY);
    }
  }

  function activateMobileView(width, height) {
    deactivateMobileView();

    const wrapper = document.createElement("div");
    wrapper.id = "revoltz-mobile-wrapper";
    wrapper.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:2147483645;display:flex;align-items:center;justify-content:center;flex-direction:column;`;

    const maxAvailableH = window.innerHeight - 80;
    const maxAvailableW = window.innerWidth - 40;
    let scale = 1;
    if (height > maxAvailableH || width > maxAvailableW) {
      scale = Math.min(maxAvailableW / width, maxAvailableH / height);
    }

    const container = document.createElement("div");
    container.id = "revoltz-mobile-container";
    container.style.cssText = `width:${width}px;height:${height}px;border:2px solid #333;border-radius:12px;overflow:hidden;background:#000;position:relative;transform:scale(${scale});transform-origin:center center;`;

    const label = document.createElement("div");
    label.style.cssText = "text-align:center;color:#666;font-size:11px;font-family:monospace;margin-bottom:8px;flex-shrink:0;";
    label.textContent = `${width} × ${height}${scale < 1 ? ` (${Math.round(scale * 100)}%)` : ""}`;

    const frame = document.createElement("iframe");
    frame.src = window.location.href;
    frame.style.cssText = `width:${width}px;height:${height}px;border:none;`;
    container.appendChild(frame);

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "✕ Fechar";
    closeBtn.style.cssText = "background:#000;border:1px solid #333;color:#fff;padding:6px 14px;border-radius:6px;cursor:pointer;font-size:11px;margin-top:12px;flex-shrink:0;";
    closeBtn.addEventListener("click", deactivateMobileView);

    wrapper.appendChild(label);
    wrapper.appendChild(container);
    wrapper.appendChild(closeBtn);

    document.body.appendChild(wrapper);
    mobileViewFrame = wrapper;
  }

  function deactivateMobileView() {
    document.getElementById("revoltz-mobile-wrapper")?.remove();
    mobileViewFrame = null;
  }

  function showToast(text) {
    const existing = document.getElementById("revoltz-toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.id = "revoltz-toast";
    toast.textContent = text;
    toast.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#000;color:#fff;padding:10px 20px;border:1px solid #333;border-radius:8px;font-family:monospace;font-size:12px;z-index:2147483647;transition:opacity 0.3s;";
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "GET_IFRAMES") {
      sendResponse({ urls: getIframeUrls() });
    }

    if (message.type === "CONFIG_UPDATED") {
      config = message.config;
    }

    if (message.type === "ACTIVATE_COLOR_PICKER") {
      activateColorPicker();
    }

    if (message.type === "ACTIVATE_WHATFONT") {
      activateWhatFont();
    }

    if (message.type === "CHANGE_FONT") {
      changeFont(message.font);
    }

    if (message.type === "RESET_FONT") {
      resetFont();
    }

    if (message.type === "UNPROTECT") {
      unprotect(message.mode);
    }

    if (message.type === "ADD_CHECK_PARAM") {
      const url = new URL(window.location.href);
      url.searchParams.set("check", "0");
      window.location.href = url.toString();
    }

    if (message.type === "ACTIVATE_IMAGE_SAVER") {
      activateImageSaver();
    }

    if (message.type === "SAVE_IMAGE_AS") {
      downloadImage(message.url, message.format);
    }

    if (message.type === "FETCH_AND_OPEN_EDITOR") {
      chrome.runtime.sendMessage({ type: "FETCH_IMAGE_AS_DATAURI", url: message.url }, (resp) => {
        if (resp?.dataUri) {
          chrome.storage.local.set({ revoltz_editor_image: resp.dataUri }, () => {
            chrome.runtime.sendMessage({ type: "OPEN_EDITOR" });
          });
        } else {
          showToast("Erro ao carregar imagem");
        }
      });
    }

    if (message.type === "ENABLE_FULL_UNPROTECT") {
      const url = new URL(window.location.href);
      const alreadyEnabled = url.searchParams.get("check") === "0";

      if (!alreadyEnabled) {
        sendResponse({ success: true, reloading: true });
        url.searchParams.set("check", "0");
        setTimeout(() => {
          window.location.href = url.toString();
        }, 0);
        return true;
      } else {
        unprotect("all");
        showToast("Anti-proteções aplicadas");
        sendResponse({ success: true, reloading: false });
      }
      return true;
    }

    if (message.type === "MOBILE_VIEW") {
      activateMobileView(message.width, message.height);
    }

    if (message.type === "RESET_MOBILE_VIEW") {
      deactivateMobileView();
    }

    if (message.type === "DOWNLOAD_SCREENSHOT") {
      outputImage(message.dataUrl, `screenshot-${Date.now()}.png`);
    }

    // ─── New tools ─────────────────────────────────────────────────────────────

    if (message.type === "TOGGLE_OUTLINE") {
      let style = document.getElementById("revoltz-outline-style");
      if (message.on) {
        if (!style) {
          style = document.createElement("style");
          style.id = "revoltz-outline-style";
          (document.head || document.documentElement).appendChild(style);
        }
        style.textContent = `
          div,section,article,aside { outline: 1px solid rgba(99,102,241,0.55) !important; }
          p,span,li,td,th,dt,dd { outline: 1px solid rgba(250,204,21,0.55) !important; }
          img,video,canvas,svg,picture { outline: 1px solid rgba(251,146,60,0.55) !important; }
          header,footer,nav,main,figure,blockquote { outline: 1px solid rgba(74,222,128,0.55) !important; }
          a { outline: 1px solid rgba(248,113,113,0.55) !important; }
          button,input,select,textarea,label,form { outline: 1px solid rgba(192,132,252,0.55) !important; }
          h1,h2,h3,h4,h5,h6 { outline: 1px solid rgba(56,189,248,0.55) !important; }
        `;
      } else {
        style?.remove();
      }
    }

    if (message.type === "TOGGLE_GRID") {
      document.getElementById("revoltz-grid-overlay")?.remove();
      if (message.on) {
        const cols = Math.max(1, message.cols || 12);
        const color = (message.color || "#6366f1").replace(/[^#a-fA-F0-9]/g, "");
        const overlay = document.createElement("div");
        overlay.id = "revoltz-grid-overlay";
        overlay.style.cssText = "position:fixed;inset:0;z-index:2147483644;pointer-events:none;display:flex;";
        for (let i = 0; i < cols; i++) {
          const col = document.createElement("div");
          col.style.cssText = `flex:1;height:100%;background:${color};opacity:0.12;`;
          if (i > 0) col.style.marginLeft = "0";
          overlay.appendChild(col);
        }
        document.body.appendChild(overlay);
      }
    }

    if (message.type === "ACTIVATE_RULER") { activateRuler(); }
    if (message.type === "DEACTIVATE_RULER") { deactivateRuler(); }

    if (message.type === "ACTIVATE_DELETE_ELEM") { activateDeleteElem(); }
    if (message.type === "DEACTIVATE_DELETE_ELEM") { deactivateDeleteElem(); }

    if (message.type === "ACTIVATE_BOX_MODEL") { activateBoxModel(); }
    if (message.type === "DEACTIVATE_BOX_MODEL") { deactivateBoxModel(); }

    if (message.type === "TOGGLE_DARK_MODE") {
      let s = document.getElementById("revoltz-darkmode-style");
      if (message.on) {
        if (!s) { s = document.createElement("style"); s.id = "revoltz-darkmode-style"; (document.head || document.documentElement).appendChild(s); }
        s.textContent = `html { filter: invert(1) hue-rotate(180deg) !important; } img,video,iframe,canvas,svg { filter: invert(1) hue-rotate(180deg) !important; }`;
      } else { s?.remove(); }
    }

    if (message.type === "TOGGLE_ZINDEX_MAP") {
      if (message.on) activateZIndexMap(); else deactivateZIndexMap();
    }

    if (message.type === "GET_STORAGE") {
      function storageToArray(st) {
        const arr = [];
        try { for (let i = 0; i < st.length; i++) { const k = st.key(i); arr.push({ key: k, value: String(st.getItem(k)) }); } } catch {}
        return arr;
      }
      sendResponse({ local: storageToArray(localStorage), session: storageToArray(sessionStorage) });
    }

    if (message.type === "DELETE_STORAGE_KEY") {
      try {
        if (message.storageType === "local") localStorage.removeItem(message.key);
        else sessionStorage.removeItem(message.key);
      } catch {}
      sendResponse({ ok: true });
    }

    if (message.type === "GET_CSS_VARS") {
      const vars = new Map();
      try {
        [...document.styleSheets].forEach(sheet => {
          try {
            [...sheet.cssRules].forEach(rule => {
              if (rule.style) {
                [...rule.style].forEach(prop => {
                  if (prop.startsWith("--")) vars.set(prop, rule.style.getPropertyValue(prop).trim());
                });
              }
            });
          } catch {}
        });
        const cs = window.getComputedStyle(document.documentElement);
        [...cs].filter(p => p.startsWith("--")).forEach(p => { if (!vars.has(p)) vars.set(p, cs.getPropertyValue(p).trim()); });
      } catch {}
      sendResponse({ vars: [...vars.entries()].map(([name, value]) => ({ name, value })) });
    }

    if (message.type === "GET_ROBOTS_TXT") {
      const base = window.location.origin;
      fetch(base + "/robots.txt").then(r => r.ok ? r.text() : null).then(content => sendResponse({ content })).catch(() => sendResponse({ content: null }));
      return true;
    }

    if (message.type === "GET_SITEMAP") {
      const base = window.location.origin;
      const candidates = ["/sitemap.xml", "/sitemap_index.xml", "/sitemap/sitemap.xml"];
      async function tryFetch() {
        for (const path of candidates) {
          try {
            const r = await fetch(base + path);
            if (!r.ok) continue;
            const text = await r.text();
            const matches = [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
            if (matches.length) return matches;
          } catch {}
        }
        return null;
      }
      tryFetch().then(urls => sendResponse({ urls })).catch(() => sendResponse({ urls: null }));
      return true;
    }

    if (message.type === "GET_WORD_COUNT") {
      const text = (document.body?.innerText || "").replace(/\s+/g, " ").trim();
      const words = text ? text.split(" ").filter(Boolean).length : 0;
      const sentences = (text.match(/[.!?]+/g) || []).length;
      const paragraphs = document.querySelectorAll("p").length;
      sendResponse({
        words,
        chars: text.length,
        charsNoSpace: text.replace(/ /g, "").length,
        sentences,
        paragraphs,
        readTime: Math.max(1, Math.round(words / 200)),
      });
    }

    if (message.type === "TOGGLE_EDIT_TEXT") {
      if (message.on) {
        const SKIP_TAGS = new Set(["SCRIPT","STYLE","NOSCRIPT","IFRAME","VIDEO","AUDIO","INPUT","TEXTAREA","SELECT","OPTION"]);
        function isEditSkipped(el) {
          if (!el || el === document.body) return true;
          if (SKIP_TAGS.has(el.tagName)) return true;
          if (el.getAttribute("aria-hidden") === "true") return true;
          // skip if inside svg
          if (el.closest("svg")) return true;
          return false;
        }

        const seen = new Set();
        const editableEls = [];
        const walker = document.createTreeWalker(
          document.body, NodeFilter.SHOW_TEXT,
          { acceptNode: n => n.textContent.trim().length >= 2 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP }
        );
        while (walker.nextNode()) {
          const parent = walker.currentNode.parentElement;
          if (!parent || seen.has(parent) || isEditSkipped(parent)) continue;
          seen.add(parent);
          parent.setAttribute("contenteditable", "true");
          parent.dataset.revoltzEditable = "1";
          parent.style.outline = "1px dashed rgba(99,102,241,0.4)";
          editableEls.push(parent);
        }

        // Restore saved edits (tag + tagIndex approach)
        if (message.restore && Array.isArray(message.restore)) {
          message.restore.forEach(({ tag, tagIndex, html }) => {
            try {
              const el = document.querySelectorAll(tag)[tagIndex];
              if (el) el.innerHTML = html;
            } catch {}
          });
        }

        // Auto-save helper
        function revoltzDoSave() {
          const edits = [];
          document.querySelectorAll("[data-revoltz-editable]").forEach(el => {
            const tag = el.tagName.toLowerCase();
            const tagIndex = [...document.querySelectorAll(tag)].indexOf(el);
            if (tagIndex !== -1) edits.push({ tag, tagIndex, html: el.innerHTML });
          });
          chrome.storage.local.set({ revoltz_edittext_edits: edits });
        }

        // Auto-save on input (debounced)
        document._revoltzEditPersist = !!message.persist;
        function revoltzInputHandler(e) {
          if (!e.target.dataset || !e.target.dataset.revoltzEditable) return;
          if (!document._revoltzEditPersist) return;
          clearTimeout(document._revoltzSaveTimer);
          document._revoltzSaveTimer = setTimeout(revoltzDoSave, 600);
        }
        document.addEventListener("input", revoltzInputHandler, true);
        document._revoltzEditInputHandler = revoltzInputHandler;

        // Block ALL navigation while editing (click, mousedown, pointerdown, keydown, submit)
        function editTextNavGuard(e) {
          const anchor = e.target.closest("a[href], [role='link']");
          if (!anchor) return;
          // Allow if the click target is directly inside a contenteditable
          if (e.target.isContentEditable || e.target.closest("[contenteditable]")) return;
          e.preventDefault();
          e.stopImmediatePropagation();
        }
        function editTextKeyGuard(e) {
          if (e.key !== "Enter") return;
          const anchor = document.activeElement && document.activeElement.closest("a[href], [role='link']");
          if (!anchor) return;
          if (document.activeElement.isContentEditable || document.activeElement.closest("[contenteditable]")) return;
          e.preventDefault();
          e.stopImmediatePropagation();
        }
        function editTextSubmitGuard(e) { e.preventDefault(); e.stopImmediatePropagation(); }
        document.addEventListener("click",      editTextNavGuard,    true);
        document.addEventListener("mousedown",  editTextNavGuard,    true);
        document.addEventListener("pointerdown",editTextNavGuard,    true);
        document.addEventListener("keydown",    editTextKeyGuard,    true);
        document.addEventListener("submit",     editTextSubmitGuard, true);
        document._revoltzEditNavGuard    = editTextNavGuard;
        document._revoltzEditKeyGuard    = editTextKeyGuard;
        document._revoltzEditSubmitGuard = editTextSubmitGuard;

        document._revoltzEditActive = true;
        showToast("✏️ Modo edição ativo · clique nos textos para editar · ESC para sair");
      } else {
        document.querySelectorAll("[data-revoltz-editable]").forEach(el => {
          el.removeAttribute("contenteditable");
          delete el.dataset.revoltzEditable;
          el.style.outline = "";
        });
        clearTimeout(document._revoltzSaveTimer);
        if (document._revoltzEditInputHandler) {
          document.removeEventListener("input", document._revoltzEditInputHandler, true);
          delete document._revoltzEditInputHandler;
        }
        if (document._revoltzEditNavGuard) {
          document.removeEventListener("click",       document._revoltzEditNavGuard, true);
          document.removeEventListener("mousedown",   document._revoltzEditNavGuard, true);
          document.removeEventListener("pointerdown", document._revoltzEditNavGuard, true);
          delete document._revoltzEditNavGuard;
        }
        if (document._revoltzEditKeyGuard) {
          document.removeEventListener("keydown", document._revoltzEditKeyGuard, true);
          delete document._revoltzEditKeyGuard;
        }
        if (document._revoltzEditSubmitGuard) {
          document.removeEventListener("submit", document._revoltzEditSubmitGuard, true);
          delete document._revoltzEditSubmitGuard;
        }
        delete document._revoltzEditPersist;
        delete document._revoltzEditActive;
      }
    }

    if (message.type === "EDITTEXT_SET_PERSIST") {
      document._revoltzEditPersist = !!message.persist;
    }

    if (message.type === "GET_META_TAGS") {
      const tags = [...document.querySelectorAll("meta")]
        .map(m => ({
          name: m.name || null,
          property: m.getAttribute("property") || null,
          httpEquiv: m.httpEquiv || null,
          content: m.content || null,
        }))
        .filter(t => t.name || t.property || t.httpEquiv);
      sendResponse({ tags });
    }

    if (message.type === "GET_EXT_LINKS") {
      const host = window.location.hostname;
      const links = [...new Set(
        [...document.querySelectorAll("a[href]")]
          .map(a => a.href)
          .filter(href => {
            try {
              const u = new URL(href);
              return u.hostname && u.hostname !== host && u.protocol.startsWith("http");
            } catch { return false; }
          })
      )];
      sendResponse({ links });
    }

    if (message.type === "GET_NO_ALT_IMGS") {
      const count = document.querySelectorAll("img:not([alt]), img[alt='']").length;
      sendResponse({ count });
    }

    if (message.type === "GET_PAGE_IMAGES") {
      const seen = new Set();
      const imgs = [];
      // <img> tags
      document.querySelectorAll("img").forEach(el => {
        const src = el.currentSrc || el.src;
        if (src && !src.startsWith("data:") && !seen.has(src)) { seen.add(src); imgs.push(src); }
      });
      // srcset sources
      document.querySelectorAll("source[srcset]").forEach(el => {
        el.srcset.split(",").forEach(part => {
          const url = part.trim().split(" ")[0];
          if (url && !url.startsWith("data:") && !seen.has(url)) { seen.add(url); imgs.push(url); }
        });
      });
      // CSS background-image on visible elements
      document.querySelectorAll("*").forEach(el => {
        try {
          const bg = getComputedStyle(el).backgroundImage;
          const m = bg.match(/url\(["']?(.+?)["']?\)/);
          if (m && m[1] && !m[1].startsWith("data:") && !seen.has(m[1])) { seen.add(m[1]); imgs.push(m[1]); }
        } catch {}
      });
      sendResponse({ images: imgs });
    }

    if (message.type === "GET_REQUESTS") {
      const entries = performance.getEntriesByType("resource").map(e => ({
        name: e.name,
        type: e.initiatorType,
        duration: Math.round(e.duration),
        size: Math.round(e.transferSize || 0),
      }));
      sendResponse({ entries });
    }

    if (message.type === "GET_PAGE_SPEED") {
      const t = performance.timing;
      const nav = performance.getEntriesByType("navigation")[0];
      sendResponse({
        ttfb: Math.round(t.responseStart - t.navigationStart),
        domReady: Math.round(t.domContentLoadedEventEnd - t.navigationStart),
        loadTime: Math.round(t.loadEventEnd - t.navigationStart),
        resources: performance.getEntriesByType("resource").length,
        transferSize: nav ? Math.round(nav.transferSize / 1024) : null,
      });
    }

    if (message.type === "GET_ELEM_COUNT") {
      const tags = ["div","span","p","a","img","button","input","form","table","ul","ol","li",
                    "h1","h2","h3","h4","h5","h6","section","article","header","footer","nav",
                    "script","link","style"];
      const counts = {};
      tags.forEach(tag => {
        const c = document.getElementsByTagName(tag).length;
        if (c > 0) counts[tag] = c;
      });
      counts["_total"] = document.querySelectorAll("*").length;
      sendResponse({ counts });
    }

    if (message.type === "GET_HEADINGS") {
      const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map(el => ({
        level: parseInt(el.tagName[1]),
        text: el.textContent.trim().slice(0, 100),
      }));
      sendResponse({ headings });
    }

    if (message.type === "TOGGLE_NO_ALT") {
      let style = document.getElementById("revoltz-noalt-style");
      if (message.on) {
        if (!style) {
          style = document.createElement("style");
          style.id = "revoltz-noalt-style";
          (document.head || document.documentElement).appendChild(style);
        }
        style.textContent = `img:not([alt]), img[alt=''] { outline: 3px solid #f87171 !important; outline-offset: 2px; }`;
      } else {
        style?.remove();
      }
    }

    if (message.type === "CLEAR_STORAGE") {
      const t = message.target;
      if (t === "local" || t === "all") { try { localStorage.clear(); } catch (e) {} }
      if (t === "session" || t === "all") { try { sessionStorage.clear(); } catch (e) {} }
      if (t === "cookies" || t === "all") {
        document.cookie.split(";").forEach(c => {
          const name = c.split("=")[0].trim();
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
        });
      }
      showToast("Storage limpo ✓");
      sendResponse({ ok: true });
    }

    if (message.type === "ACTIVATE_CAPTURE_ELEM") {
      activateCaptureElem();
    }

    if (message.type === "CAPTURE_FULL_PAGE") {
      captureFullPage().then(dataUrl => {
        sendResponse({ dataUrl: dataUrl || null });
      });
      return true;
    }

    // ─── JSON Formatter: detect JSON in page ──────────────────────────────────
    if (message.type === "GET_PAGE_JSON") {
      let json = null;
      try {
        const text = document.body?.innerText || "";
        JSON.parse(text);
        json = text;
      } catch {
        // Try finding a <pre> tag with JSON
        const pre = document.querySelector("pre");
        if (pre) {
          try { JSON.parse(pre.textContent); json = pre.textContent; } catch {}
        }
      }
      sendResponse({ json });
    }

    // ─── Disable JS ───────────────────────────────────────────────────────────
    if (message.type === "DISABLE_JS") {
      // Remove all script elements and prevent new ones
      document.querySelectorAll("script").forEach(s => s.remove());
      const observer = new MutationObserver(muts => {
        muts.forEach(m => {
          m.addedNodes.forEach(n => {
            if (n.nodeType === 1 && n.tagName === "SCRIPT") n.remove();
          });
        });
      });
      observer.observe(document.documentElement, { childList: true, subtree: true });
      showToast("JavaScript desativado ✓");
      sendResponse({ ok: true });
    }

    // ─── Disable/Toggle CSS ───────────────────────────────────────────────────
    if (message.type === "TOGGLE_CSS") {
      const enable = message.on;
      document.querySelectorAll('link[rel="stylesheet"], style').forEach(el => {
        if (el.id?.startsWith("revoltz-")) return; // don't touch our own styles
        if (!enable) {
          el.dataset.revoltzDisabled = "1";
          el.disabled = true;
          if (el.tagName === "STYLE") { el.dataset.revoltzContent = el.textContent; el.textContent = ""; }
        } else {
          if (el.dataset.revoltzDisabled) {
            el.disabled = false;
            delete el.dataset.revoltzDisabled;
            if (el.tagName === "STYLE" && el.dataset.revoltzContent) { el.textContent = el.dataset.revoltzContent; delete el.dataset.revoltzContent; }
          }
        }
      });
      // Also handle inline styles by toggling a master override
      if (!enable) {
        showToast("CSS desativado ✓");
      } else {
        showToast("CSS reativado ✓");
      }
    }

    // ─── Console Logger ───────────────────────────────────────────────────────
    if (message.type === "START_CONSOLE_CAPTURE") {
      if (!window._revoltzConsoleLogs) {
        window._revoltzConsoleLogs = [];
        window._revoltzOrigConsole = {
          log: console.log, warn: console.warn, error: console.error, info: console.info
        };
        ["log", "warn", "error", "info"].forEach(level => {
          console[level] = function(...args) {
            window._revoltzConsoleLogs.push({
              level,
              text: args.map(a => {
                try { return typeof a === "object" ? JSON.stringify(a) : String(a); }
                catch { return String(a); }
              }).join(" "),
              time: Date.now()
            });
            if (window._revoltzConsoleLogs.length > 500) window._revoltzConsoleLogs.shift();
            window._revoltzOrigConsole[level].apply(console, args);
          };
        });
        // Also capture uncaught errors
        window._revoltzErrorHandler = (e) => {
          window._revoltzConsoleLogs.push({ level: "error", text: `Uncaught: ${e.message} (${e.filename}:${e.lineno})`, time: Date.now() });
        };
        window.addEventListener("error", window._revoltzErrorHandler);
      }
    }
    if (message.type === "GET_CONSOLE_LOGS") {
      sendResponse({ logs: window._revoltzConsoleLogs || [] });
    }
    if (message.type === "CLEAR_CONSOLE_LOGS") {
      window._revoltzConsoleLogs = [];
    }
    if (message.type === "STOP_CONSOLE_CAPTURE") {
      if (window._revoltzOrigConsole) {
        ["log", "warn", "error", "info"].forEach(level => {
          console[level] = window._revoltzOrigConsole[level];
        });
        delete window._revoltzOrigConsole;
      }
      if (window._revoltzErrorHandler) {
        window.removeEventListener("error", window._revoltzErrorHandler);
        delete window._revoltzErrorHandler;
      }
    }

    // ─── Lorem Ipsum Inject ───────────────────────────────────────────────────
    if (message.type === "INJECT_LOREM") {
      showToast("Clique em um elemento para injetar o texto · ESC para sair");
      const overlay = document.createElement("div");
      overlay.id = "revoltz-lorem-overlay";
      overlay.style.cssText = "position:fixed;inset:0;z-index:2147483646;cursor:crosshair;";
      document.body.appendChild(overlay);
      overlay.addEventListener("click", (e) => {
        overlay.style.pointerEvents = "none";
        const el = document.elementFromPoint(e.clientX, e.clientY);
        overlay.remove();
        if (el && !el.id?.startsWith("revoltz-")) {
          el.textContent = message.text;
          showToast("Texto injetado ✓");
        }
      });
      overlay.addEventListener("contextmenu", (e) => { e.preventDefault(); overlay.remove(); });
    }

    // ─── Open Graph Data ──────────────────────────────────────────────────────
    if (message.type === "GET_OG_DATA") {
      function getMeta(names) {
        for (const name of names) {
          const el = document.querySelector(`meta[property="${name}"], meta[name="${name}"]`);
          if (el?.content) return el.content;
        }
        return "";
      }
      sendResponse({
        title: getMeta(["og:title", "twitter:title"]) || document.title || "",
        description: getMeta(["og:description", "twitter:description", "description"]) || "",
        image: getMeta(["og:image", "twitter:image"]) || "",
        type: getMeta(["og:type"]) || "",
        url: getMeta(["og:url"]) || window.location.href,
        siteName: getMeta(["og:site_name"]) || "",
        twitterCard: getMeta(["twitter:card"]) || "",
        host: window.location.hostname,
      });
    }

    // ─── Lazy Load Checker ────────────────────────────────────────────────────
    if (message.type === "GET_LAZY_CHECK") {
      const imgs = document.querySelectorAll("img");
      let withLazy = 0, withoutLazy = 0;
      imgs.forEach(img => {
        if (img.loading === "lazy" || img.getAttribute("loading") === "lazy") withLazy++;
        else withoutLazy++;
      });
      sendResponse({ total: imgs.length, withLazy, withoutLazy });
    }

    if (message.type === "TOGGLE_NOLAZY_HIGHLIGHT") {
      let style = document.getElementById("revoltz-nolazy-style");
      if (message.on) {
        if (!style) { style = document.createElement("style"); style.id = "revoltz-nolazy-style"; (document.head || document.documentElement).appendChild(style); }
        style.textContent = `img:not([loading="lazy"]) { outline: 3px solid #facc15 !important; outline-offset: 2px; }`;
      } else {
        style?.remove();
      }
    }

    // ─── Tech Stack Detector ──────────────────────────────────────────────────
    if (message.type === "DETECT_TECH_STACK") {
      const techs = [];
      const html = document.documentElement.outerHTML;
      const scripts = [...document.querySelectorAll("script[src]")].map(s => s.src).join(" ");
      const metas = [...document.querySelectorAll("meta")].map(m => `${m.name} ${m.content} ${m.getAttribute("property")}`).join(" ");
      const allText = html + " " + scripts + " " + metas;

      // React
      if (document.querySelector("[data-reactroot], [data-reactid]") || window.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== undefined || allText.includes("react")) {
        techs.push({ name: "React", icon: "\u269b\ufe0f" });
      }
      // Vue
      if (document.querySelector("[data-v-], [data-vue-]") || window.__VUE__ !== undefined || allText.includes("vue.js") || allText.includes("vue.min.js")) {
        techs.push({ name: "Vue.js", icon: "\ud83d\udfe9" });
      }
      // Angular
      if (document.querySelector("[ng-version], [_nghost], [_ngcontent]") || allText.includes("angular")) {
        techs.push({ name: "Angular", icon: "\ud83d\udfe5" });
      }
      // Svelte
      if (document.querySelector("[class*='svelte-']") || allText.includes("svelte")) {
        techs.push({ name: "Svelte", icon: "\ud83d\udd36" });
      }
      // Next.js
      if (document.querySelector("#__next") || document.querySelector('script[src*="_next"]') || allText.includes("__NEXT_DATA__")) {
        techs.push({ name: "Next.js", icon: "▲" });
      }
      // Nuxt
      if (document.querySelector("#__nuxt, #__layout") || allText.includes("_nuxt")) {
        techs.push({ name: "Nuxt", icon: "\ud83d\udfe2" });
      }
      // jQuery
      if (window.jQuery || window.$ && window.$.fn?.jquery || allText.includes("jquery")) {
        const ver = window.jQuery?.fn?.jquery || window.$?.fn?.jquery || "";
        techs.push({ name: "jQuery", icon: "\ud83d\udcb2", version: ver });
      }
      // WordPress
      if (allText.includes("wp-content") || allText.includes("wp-includes") || document.querySelector('meta[name="generator"][content*="WordPress"]')) {
        const genMeta = document.querySelector('meta[name="generator"][content*="WordPress"]');
        techs.push({ name: "WordPress", icon: "\ud83d\udcdd", version: genMeta?.content?.replace("WordPress ", "") || "" });
      }
      // Tailwind CSS
      if (document.querySelector('[class*="flex "], [class*="bg-"], [class*="text-"], [class*="px-"], [class*="py-"]') && document.querySelector('[class*="hover:"], [class*="md:"], [class*="lg:"]')) {
        techs.push({ name: "Tailwind CSS", icon: "\ud83c\udfa8" });
      }
      // Bootstrap
      if (document.querySelector('[class*="container"], [class*="row"]') && (allText.includes("bootstrap") || document.querySelector('[class*="col-md-"], [class*="col-lg-"]'))) {
        techs.push({ name: "Bootstrap", icon: "\ud83d\udee1\ufe0f" });
      }
      // Google Analytics
      if (allText.includes("google-analytics") || allText.includes("gtag") || allText.includes("googletagmanager")) {
        techs.push({ name: "Google Analytics", icon: "\ud83d\udcca" });
      }
      // Google Tag Manager
      if (allText.includes("googletagmanager.com/gtm")) {
        techs.push({ name: "GTM", icon: "\ud83c\udff7\ufe0f" });
      }
      // Font Awesome
      if (allText.includes("font-awesome") || allText.includes("fontawesome") || document.querySelector('link[href*="fontawesome"], i.fa, i.fas, i.fab')) {
        techs.push({ name: "Font Awesome", icon: "\ud83c\udfa8" });
      }
      // TypeScript (compiled output markers)
      if (allText.includes("__decorate") || allText.includes("tslib")) {
        techs.push({ name: "TypeScript", icon: "\ud83d\udcd8" });
      }
      // Webpack
      if (allText.includes("webpackJsonp") || allText.includes("__webpack_require__")) {
        techs.push({ name: "Webpack", icon: "\ud83d\udce6" });
      }
      // Vite
      if (document.querySelector('script[type="module"][src*="/@vite"], script[src*="vite"]')) {
        techs.push({ name: "Vite", icon: "⚡" });
      }
      // PHP
      if (allText.includes(".php")) {
        techs.push({ name: "PHP", icon: "\ud83d\udc18" });
      }
      // Cloudflare
      if (document.querySelector('script[src*="cloudflare"]') || allText.includes("cf-ray")) {
        techs.push({ name: "Cloudflare", icon: "\u2601\ufe0f" });
      }
      // Shopify
      if (allText.includes("shopify") || allText.includes("Shopify.theme")) {
        techs.push({ name: "Shopify", icon: "\ud83d\uded2" });
      }
      // Vercel
      if (document.querySelector('meta[name="x-vercel"]') || allText.includes("vercel")) {
        techs.push({ name: "Vercel", icon: "▲" });
      }

      sendResponse({ techs });
    }

    // ─── Shortcuts: keyboard listener ─────────────────────────────────────────
    if (message.type === "UPDATE_SHORTCUTS") {
      window._revoltzShortcuts = message.shortcuts || [];
    }
  });

  // ─── Keyboard shortcuts listener ─────────────────────────────────────────────
  chrome.storage.local.get("revoltz_shortcuts", (data) => {
    window._revoltzShortcuts = data.revoltz_shortcuts || [];
  });

  document.addEventListener("keydown", (e) => {
    if (!window._revoltzShortcuts?.length) return;
    const parts = [];
    if (e.ctrlKey) parts.push("Ctrl");
    if (e.altKey) parts.push("Alt");
    if (e.shiftKey) parts.push("Shift");
    if (e.key && !["Control", "Alt", "Shift", "Meta"].includes(e.key)) {
      parts.push(e.key.length === 1 ? e.key.toUpperCase() : e.key);
    }
    const pressed = parts.join("+");
    const match = window._revoltzShortcuts.find(s => s.keys === pressed);
    if (match) {
      e.preventDefault();
      e.stopPropagation();
      // Trigger the feature via background
      chrome.runtime.sendMessage({ type: "SHORTCUT_TRIGGER", featureId: match.featureId });
    }
  }, true);

  // Auto-restore edited text after page reload (when persist is enabled)
  function revoltzAutoRestoreEdits() {
    chrome.storage.local.get(["revoltz_edittext_persist", "revoltz_edittext_edits"], data => {
      if (!data.revoltz_edittext_persist || !data.revoltz_edittext_edits?.length) return;
      setTimeout(() => {
        data.revoltz_edittext_edits.forEach(({ tag, tagIndex, html }) => {
          try {
            const el = document.querySelectorAll(tag)[tagIndex];
            if (el) el.innerHTML = html;
          } catch {}
        });
      }, 200);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", revoltzAutoRestoreEdits);
  } else {
    revoltzAutoRestoreEdits();
  }

})();
