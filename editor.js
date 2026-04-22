(() => {
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const mainCanvas = $("#main-canvas");
  const mainCtx = mainCanvas.getContext("2d");
  const annCanvas = $("#ann-canvas");
  const annCtx = annCanvas.getContext("2d");
  const canvasWrap = $("#canvas-wrap");
  const canvasArea = $("#canvas-area");
  const cropOverlay = $("#crop-overlay");
  const cropBox = $("#crop-box");

  let originalImg = null;
  let currentImg = null;
  let zoom = 1;
  let tool = null;
  let annColor = "#ff3b3b";
  let annStroke = 3;
  let annotations = [];
  let undoStack = [];
  let redoStack = [];
  let cropActive = false;
  let cropRect = { x: 0, y: 0, w: 0, h: 0 };
  let drawingState = null;

  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove("show"), 2000);
  }

  function updateInfo() {
    if (!currentImg) return;
    $("#img-dimensions").textContent = `${currentImg.width} × ${currentImg.height}`;
    const bytes = Math.round(mainCanvas.toDataURL("image/png").length * 0.75);
    if (bytes > 1024 * 1024) {
      $("#img-size").textContent = `~${(bytes / 1024 / 1024).toFixed(1)} MB`;
    } else {
      $("#img-size").textContent = `~${Math.round(bytes / 1024)} KB`;
    }
  }

  function pushUndo() {
    undoStack.push({
      imgData: mainCanvas.toDataURL("image/png"),
      annotations: JSON.parse(JSON.stringify(annotations))
    });
    redoStack = [];
    if (undoStack.length > 40) undoStack.shift();
    updateUndoButtons();
  }

  function updateUndoButtons() {
    $("#tb-undo").disabled = undoStack.length === 0;
    $("#tb-redo").disabled = redoStack.length === 0;
  }

  function undo() {
    if (!undoStack.length) return;
    redoStack.push({
      imgData: mainCanvas.toDataURL("image/png"),
      annotations: JSON.parse(JSON.stringify(annotations))
    });
    const state = undoStack.pop();
    restoreState(state);
    updateUndoButtons();
  }

  function redo() {
    if (!redoStack.length) return;
    undoStack.push({
      imgData: mainCanvas.toDataURL("image/png"),
      annotations: JSON.parse(JSON.stringify(annotations))
    });
    const state = redoStack.pop();
    restoreState(state);
    updateUndoButtons();
  }

  function restoreState(state) {
    const img = new Image();
    img.onload = () => {
      currentImg = img;
      mainCanvas.width = img.width;
      mainCanvas.height = img.height;
      mainCtx.drawImage(img, 0, 0);
      annotations = state.annotations;
      renderAnnotations();
      applyZoom();
      updateInfo();
    };
    img.src = state.imgData;
  }

  function loadImage(dataUrl) {
    const img = new Image();
    img.onload = () => {
      originalImg = img;
      currentImg = img;
      mainCanvas.width = img.width;
      mainCanvas.height = img.height;
      mainCtx.drawImage(img, 0, 0);
      annCanvas.width = img.width;
      annCanvas.height = img.height;
      annotations = [];
      undoStack = [];
      redoStack = [];
      updateUndoButtons();
      zoomFit();
      updateInfo();
      $("#status-text").textContent = "";
    };
    img.onerror = () => {
      $("#status-text").textContent = "Erro ao carregar imagem";
    };
    img.src = dataUrl;
  }

  function zoomFit() {
    if (!currentImg) return;
    const areaW = canvasArea.clientWidth - 40;
    const areaH = canvasArea.clientHeight - 40;
    zoom = Math.min(areaW / currentImg.width, areaH / currentImg.height, 1);
    zoom = Math.max(zoom, 0.05);
    applyZoom();
  }

  function applyZoom() {
    canvasWrap.style.transform = `scale(${zoom})`;
    canvasWrap.style.transformOrigin = "center center";
    $("#zoom-label").textContent = Math.round(zoom * 100) + "%";
  }

  function setZoom(z) {
    zoom = Math.max(0.05, Math.min(z, 8));
    applyZoom();
  }

  function renderAnnotations() {
    annCtx.clearRect(0, 0, annCanvas.width, annCanvas.height);
    annotations.forEach(ann => drawAnnotation(annCtx, ann));
  }

  function drawAnnotation(ctx, ann) {
    ctx.save();
    ctx.strokeStyle = ann.color;
    ctx.fillStyle = ann.color;
    ctx.lineWidth = ann.stroke;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (ann.type === "rect") {
      ctx.strokeRect(ann.x, ann.y, ann.w, ann.h);
    } else if (ann.type === "arrow") {
      drawArrow(ctx, ann.x1, ann.y1, ann.x2, ann.y2, ann.stroke);
    } else if (ann.type === "text") {
      ctx.font = `bold ${ann.fontSize || 24}px "Anybody", system-ui, sans-serif`;
      ctx.fillText(ann.text, ann.x, ann.y);
    } else if (ann.type === "blur") {
      applyBlurRegion(ctx, ann.x, ann.y, ann.w, ann.h);
    } else if (ann.type === "pen") {
      if (ann.points && ann.points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(ann.points[0].x, ann.points[0].y);
        for (let i = 1; i < ann.points.length; i++) {
          ctx.lineTo(ann.points[i].x, ann.points[i].y);
        }
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  function drawArrow(ctx, x1, y1, x2, y2, sw) {
    const headLen = Math.max(sw * 4, 12);
    const angle = Math.atan2(y2 - y1, x2 - x1);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - headLen * Math.cos(angle - Math.PI / 6), y2 - headLen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(x2 - headLen * Math.cos(angle + Math.PI / 6), y2 - headLen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
  }

  function applyBlurRegion(ctx, x, y, w, h) {
    if (w <= 0 || h <= 0) return;
    const px = Math.max(1, Math.round(Math.min(w, h) / 8));
    const imgData = mainCtx.getImageData(
      Math.max(0, Math.round(x)),
      Math.max(0, Math.round(y)),
      Math.min(Math.round(w), mainCanvas.width - Math.round(x)),
      Math.min(Math.round(h), mainCanvas.height - Math.round(y))
    );
    const tmpCanvas = document.createElement("canvas");
    tmpCanvas.width = imgData.width;
    tmpCanvas.height = imgData.height;
    const tmpCtx = tmpCanvas.getContext("2d");
    tmpCtx.putImageData(imgData, 0, 0);

    const small = document.createElement("canvas");
    const sw = Math.max(1, Math.round(imgData.width / px));
    const sh = Math.max(1, Math.round(imgData.height / px));
    small.width = sw;
    small.height = sh;
    const sc = small.getContext("2d");
    sc.imageSmoothingEnabled = true;
    sc.drawImage(tmpCanvas, 0, 0, sw, sh);

    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(small, 0, 0, sw, sh, Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  }

  function canvasCoords(e) {
    const rect = mainCanvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / zoom,
      y: (e.clientY - rect.top) / zoom
    };
  }

  function flatten() {
    const tmpCanvas = document.createElement("canvas");
    tmpCanvas.width = mainCanvas.width;
    tmpCanvas.height = mainCanvas.height;
    const tmpCtx = tmpCanvas.getContext("2d");
    tmpCtx.drawImage(mainCanvas, 0, 0);
    tmpCtx.drawImage(annCanvas, 0, 0);
    return tmpCanvas;
  }

  function createBMP(imageData, w, h) {
    const rowSize = Math.ceil((w * 3) / 4) * 4;
    const pixelDataSize = rowSize * h;
    const headerSize = 54;
    const fileSize = headerSize + pixelDataSize;
    const buf = new ArrayBuffer(fileSize);
    const view = new DataView(buf);
    view.setUint8(0, 0x42); view.setUint8(1, 0x4D);
    view.setUint32(2, fileSize, true);
    view.setUint32(10, headerSize, true);
    view.setUint32(14, 40, true);
    view.setInt32(18, w, true);
    view.setInt32(22, h, true);
    view.setUint16(26, 1, true);
    view.setUint16(28, 24, true);
    view.setUint32(34, pixelDataSize, true);
    const pixels = imageData.data;
    for (let y = h - 1; y >= 0; y--) {
      let offset = headerSize + rowSize * (h - 1 - y);
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        view.setUint8(offset++, pixels[i + 2]);
        view.setUint8(offset++, pixels[i + 1]);
        view.setUint8(offset++, pixels[i]);
      }
    }
    return new Blob([buf], { type: "image/bmp" });
  }

  function createICO(pngData, w, h) {
    const iconDir = 6;
    const iconEntry = 16;
    const totalSize = iconDir + iconEntry + pngData.length;
    const buf = new ArrayBuffer(totalSize);
    const view = new DataView(buf);
    view.setUint16(0, 0, true);
    view.setUint16(2, 1, true);
    view.setUint16(4, 1, true);
    view.setUint8(6, w >= 256 ? 0 : w);
    view.setUint8(7, h >= 256 ? 0 : h);
    view.setUint8(8, 0);
    view.setUint8(9, 0);
    view.setUint16(10, 1, true);
    view.setUint16(12, 32, true);
    view.setUint32(14, pngData.length, true);
    view.setUint32(18, iconDir + iconEntry, true);
    new Uint8Array(buf).set(pngData, iconDir + iconEntry);
    return new Blob([buf], { type: "image/x-icon" });
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }

  function exportImage(format) {
    const out = flatten();
    const ctx = out.getContext("2d");
    const w = out.width;
    const h = out.height;
    const fname = `devx-${Date.now()}.${format}`;

    if (format === "clipboard") {
      out.toBlob(blob => {
        if (!blob) { toast("Erro ao copiar"); return; }
        navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]).then(() => {
          toast("Copiado para o clipboard ✓");
        }).catch(() => toast("Erro ao copiar"));
      }, "image/png");
      return;
    }

    if (format === "bmp") {
      const imageData = ctx.getImageData(0, 0, w, h);
      downloadBlob(createBMP(imageData, w, h), fname);
      toast("Salvo como BMP ✓");
      return;
    }

    if (format === "ico") {
      const icoW = Math.min(w, 256);
      const icoH = Math.min(h, 256);
      const tmp = document.createElement("canvas");
      tmp.width = icoW;
      tmp.height = icoH;
      tmp.getContext("2d").drawImage(out, 0, 0, icoW, icoH);
      tmp.toBlob(pngBlob => {
        if (!pngBlob) { toast("Erro ao gerar ICO"); return; }
        pngBlob.arrayBuffer().then(buf => {
          downloadBlob(createICO(new Uint8Array(buf), icoW, icoH), fname);
          toast("Salvo como ICO ✓");
        });
      }, "image/png");
      return;
    }

    if (format === "gif") {
      out.toBlob(blob => {
        if (!blob) { toast("Erro ao gerar"); return; }
        downloadBlob(blob, fname);
        toast("Salvo como GIF ✓");
      }, "image/png");
      return;
    }

    const mimeMap = { png: "image/png", jpg: "image/jpeg", webp: "image/webp", avif: "image/avif" };
    const mime = mimeMap[format] || "image/png";
    const quality = (format === "jpg") ? 0.92 : undefined;

    out.toBlob(blob => {
      if (!blob) { toast("Erro ao salvar"); return; }
      if (blob.type !== mime && format !== "png") {
        out.toBlob(fb => {
          if (fb) { downloadBlob(fb, `devx-${Date.now()}.png`); toast(`${format.toUpperCase()} não suportado, salvo como PNG`); }
        }, "image/png");
        return;
      }
      downloadBlob(blob, fname);
      toast(`Salvo como ${format.toUpperCase()} ✓`);
    }, mime, quality);
  }

  function applyCrop() {
    if (cropRect.w < 2 || cropRect.h < 2) { toast("Seleção muito pequena"); return; }
    pushUndo();

    const flat = flatten();
    const cx = Math.max(0, Math.round(cropRect.x));
    const cy = Math.max(0, Math.round(cropRect.y));
    const cw = Math.min(Math.round(cropRect.w), flat.width - cx);
    const ch = Math.min(Math.round(cropRect.h), flat.height - cy);

    const cropped = document.createElement("canvas");
    cropped.width = cw;
    cropped.height = ch;
    cropped.getContext("2d").drawImage(flat, cx, cy, cw, ch, 0, 0, cw, ch);

    const img = new Image();
    img.onload = () => {
      currentImg = img;
      mainCanvas.width = cw;
      mainCanvas.height = ch;
      annCanvas.width = cw;
      annCanvas.height = ch;
      mainCtx.drawImage(img, 0, 0);
      annotations = [];
      annCtx.clearRect(0, 0, cw, ch);
      exitCrop();
      zoomFit();
      updateInfo();
      toast("Recortado ✓");
    };
    img.src = cropped.toDataURL("image/png");
  }

  function enterCrop() {
    cropActive = true;
    tool = "crop";
    setToolActive("tb-crop");
    const pad = 0.1;
    cropRect = {
      x: mainCanvas.width * pad,
      y: mainCanvas.height * pad,
      w: mainCanvas.width * (1 - pad * 2),
      h: mainCanvas.height * (1 - pad * 2)
    };
    cropOverlay.classList.add("active");
    updateCropUI();
  }

  function exitCrop() {
    cropActive = false;
    if (tool === "crop") tool = null;
    cropOverlay.classList.remove("active");
    $$(".tb").forEach(b => b.classList.remove("active"));
  }

  function updateCropUI() {
    const cw = mainCanvas.width;
    const ch = mainCanvas.height;
    const r = cropRect;

    $("#crop-dim-top").style.cssText = `top:0;left:0;width:100%;height:${r.y}px;`;
    $("#crop-dim-bottom").style.cssText = `top:${r.y + r.h}px;left:0;width:100%;height:${ch - r.y - r.h}px;`;
    $("#crop-dim-left").style.cssText = `top:${r.y}px;left:0;width:${r.x}px;height:${r.h}px;`;
    $("#crop-dim-right").style.cssText = `top:${r.y}px;left:${r.x + r.w}px;width:${cw - r.x - r.w}px;height:${r.h}px;`;

    cropBox.style.left = r.x + "px";
    cropBox.style.top = r.y + "px";
    cropBox.style.width = r.w + "px";
    cropBox.style.height = r.h + "px";
  }

  function rotateCanvas(deg) {
    pushUndo();
    const flat = flatten();
    const is90 = deg === 90 || deg === -90;
    const nw = is90 ? flat.height : flat.width;
    const nh = is90 ? flat.width : flat.height;

    const tmp = document.createElement("canvas");
    tmp.width = nw;
    tmp.height = nh;
    const tCtx = tmp.getContext("2d");
    tCtx.translate(nw / 2, nh / 2);
    tCtx.rotate((deg * Math.PI) / 180);
    tCtx.drawImage(flat, -flat.width / 2, -flat.height / 2);

    const img = new Image();
    img.onload = () => {
      currentImg = img;
      mainCanvas.width = nw;
      mainCanvas.height = nh;
      annCanvas.width = nw;
      annCanvas.height = nh;
      mainCtx.drawImage(img, 0, 0);
      annotations = [];
      annCtx.clearRect(0, 0, nw, nh);
      zoomFit();
      updateInfo();
    };
    img.src = tmp.toDataURL("image/png");
  }

  function flipCanvas(axis) {
    pushUndo();
    const flat = flatten();
    const tmp = document.createElement("canvas");
    tmp.width = flat.width;
    tmp.height = flat.height;
    const tCtx = tmp.getContext("2d");
    if (axis === "h") {
      tCtx.translate(flat.width, 0);
      tCtx.scale(-1, 1);
    } else {
      tCtx.translate(0, flat.height);
      tCtx.scale(1, -1);
    }
    tCtx.drawImage(flat, 0, 0);

    const img = new Image();
    img.onload = () => {
      currentImg = img;
      mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
      mainCtx.drawImage(img, 0, 0);
      annotations = [];
      annCtx.clearRect(0, 0, annCanvas.width, annCanvas.height);
      updateInfo();
    };
    img.src = tmp.toDataURL("image/png");
  }

  function setToolActive(id) {
    $$(".tb").forEach(b => b.classList.remove("active"));
    if (id) $(("#" + id))?.classList.add("active");
    annCanvas.classList.toggle("drawing", !!tool && tool !== "crop");
  }

  function selectTool(t, btnId) {
    if (cropActive && t !== "crop") exitCrop();
    if (tool === t) {
      tool = null;
      setToolActive(null);
      return;
    }
    tool = t;
    setToolActive(btnId);
  }

  // ─── Crop drag ──────────────────────────────────────────────────────────
  let cropDrag = null;

  cropOverlay.addEventListener("mousedown", (e) => {
    if (!cropActive) return;
    const target = e.target;
    const dir = target.dataset?.dir;
    const coords = canvasCoords(e);

    if (dir) {
      cropDrag = { mode: "resize", dir, startX: coords.x, startY: coords.y, startRect: { ...cropRect } };
    } else if (target === cropBox) {
      cropDrag = { mode: "move", startX: coords.x, startY: coords.y, startRect: { ...cropRect } };
    }
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (!cropDrag) return;
    const coords = canvasCoords(e);
    const dx = coords.x - cropDrag.startX;
    const dy = coords.y - cropDrag.startY;
    const sr = cropDrag.startRect;
    const cw = mainCanvas.width;
    const ch = mainCanvas.height;

    if (cropDrag.mode === "move") {
      cropRect.x = Math.max(0, Math.min(sr.x + dx, cw - sr.w));
      cropRect.y = Math.max(0, Math.min(sr.y + dy, ch - sr.h));
    } else {
      const d = cropDrag.dir;
      let nx = sr.x, ny = sr.y, nw = sr.w, nh = sr.h;
      if (d.includes("w")) { nx = sr.x + dx; nw = sr.w - dx; }
      if (d.includes("e")) { nw = sr.w + dx; }
      if (d.includes("n")) { ny = sr.y + dy; nh = sr.h - dy; }
      if (d.includes("s")) { nh = sr.h + dy; }
      if (nw < 10) nw = 10;
      if (nh < 10) nh = 10;
      cropRect = {
        x: Math.max(0, Math.min(nx, cw - 10)),
        y: Math.max(0, Math.min(ny, ch - 10)),
        w: Math.min(nw, cw),
        h: Math.min(nh, ch)
      };
    }
    updateCropUI();
  });

  document.addEventListener("mouseup", () => { cropDrag = null; });

  // ─── Drawing on annotation layer ─────────────────────────────────────────
  annCanvas.addEventListener("mousedown", (e) => {
    if (!tool || tool === "crop") return;
    const coords = canvasCoords(e);
    annColor = $("#tb-color").value;
    annStroke = parseInt($("#tb-stroke").value, 10);

    if (tool === "text") {
      const text = prompt("Texto:");
      if (text) {
        pushUndo();
        annotations.push({ type: "text", x: coords.x, y: coords.y, text, color: annColor, fontSize: Math.max(16, annStroke * 6), stroke: annStroke });
        renderAnnotations();
      }
      return;
    }

    drawingState = { tool, startX: coords.x, startY: coords.y, color: annColor, stroke: annStroke, points: [{ x: coords.x, y: coords.y }] };
    e.preventDefault();
  });

  annCanvas.addEventListener("mousemove", (e) => {
    if (!drawingState) return;
    const coords = canvasCoords(e);
    const ds = drawingState;

    annCtx.clearRect(0, 0, annCanvas.width, annCanvas.height);
    annotations.forEach(a => drawAnnotation(annCtx, a));

    annCtx.save();
    annCtx.strokeStyle = ds.color;
    annCtx.fillStyle = ds.color;
    annCtx.lineWidth = ds.stroke;
    annCtx.lineCap = "round";
    annCtx.lineJoin = "round";

    if (ds.tool === "rect") {
      annCtx.strokeRect(ds.startX, ds.startY, coords.x - ds.startX, coords.y - ds.startY);
    } else if (ds.tool === "arrow") {
      drawArrow(annCtx, ds.startX, ds.startY, coords.x, coords.y, ds.stroke);
    } else if (ds.tool === "blur") {
      const bx = Math.min(ds.startX, coords.x);
      const by = Math.min(ds.startY, coords.y);
      const bw = Math.abs(coords.x - ds.startX);
      const bh = Math.abs(coords.y - ds.startY);
      annCtx.setLineDash([4, 4]);
      annCtx.strokeStyle = "#4ade80";
      annCtx.strokeRect(bx, by, bw, bh);
      annCtx.setLineDash([]);
    } else if (ds.tool === "pen") {
      ds.points.push({ x: coords.x, y: coords.y });
      annCtx.beginPath();
      annCtx.moveTo(ds.points[0].x, ds.points[0].y);
      for (let i = 1; i < ds.points.length; i++) {
        annCtx.lineTo(ds.points[i].x, ds.points[i].y);
      }
      annCtx.stroke();
    }
    annCtx.restore();
  });

  annCanvas.addEventListener("mouseup", (e) => {
    if (!drawingState) return;
    const coords = canvasCoords(e);
    const ds = drawingState;
    drawingState = null;

    pushUndo();

    if (ds.tool === "rect") {
      annotations.push({ type: "rect", x: ds.startX, y: ds.startY, w: coords.x - ds.startX, h: coords.y - ds.startY, color: ds.color, stroke: ds.stroke });
    } else if (ds.tool === "arrow") {
      annotations.push({ type: "arrow", x1: ds.startX, y1: ds.startY, x2: coords.x, y2: coords.y, color: ds.color, stroke: ds.stroke });
    } else if (ds.tool === "blur") {
      const bx = Math.min(ds.startX, coords.x);
      const by = Math.min(ds.startY, coords.y);
      const bw = Math.abs(coords.x - ds.startX);
      const bh = Math.abs(coords.y - ds.startY);
      annotations.push({ type: "blur", x: bx, y: by, w: bw, h: bh, color: ds.color, stroke: ds.stroke });
    } else if (ds.tool === "pen") {
      ds.points.push({ x: coords.x, y: coords.y });
      annotations.push({ type: "pen", points: ds.points, color: ds.color, stroke: ds.stroke });
    }

    renderAnnotations();
  });

  // ─── Toolbar events ───────────────────────────────────────────────────────
  $("#tb-undo").addEventListener("click", undo);
  $("#tb-redo").addEventListener("click", redo);

  $("#tb-crop").addEventListener("click", () => {
    if (cropActive) { applyCrop(); } else { enterCrop(); }
  });

  $("#tb-rotate-l").addEventListener("click", () => rotateCanvas(-90));
  $("#tb-rotate-r").addEventListener("click", () => rotateCanvas(90));
  $("#tb-flip-h").addEventListener("click", () => flipCanvas("h"));
  $("#tb-flip-v").addEventListener("click", () => flipCanvas("v"));

  $("#tb-draw-rect").addEventListener("click", () => selectTool("rect", "tb-draw-rect"));
  $("#tb-draw-arrow").addEventListener("click", () => selectTool("arrow", "tb-draw-arrow"));
  $("#tb-draw-text").addEventListener("click", () => selectTool("text", "tb-draw-text"));
  $("#tb-draw-blur").addEventListener("click", () => selectTool("blur", "tb-draw-blur"));
  $("#tb-draw-pen").addEventListener("click", () => selectTool("pen", "tb-draw-pen"));

  $("#tb-zoom-out").addEventListener("click", () => setZoom(zoom / 1.25));
  $("#tb-zoom-in").addEventListener("click", () => setZoom(zoom * 1.25));
  $("#tb-zoom-fit").addEventListener("click", zoomFit);

  canvasArea.addEventListener("wheel", (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      setZoom(zoom * (e.deltaY < 0 ? 1.1 : 0.9));
    }
  }, { passive: false });

  $("#tb-copy").addEventListener("click", () => exportImage("clipboard"));

  const ddExport = $("#dd-export");
  $("#tb-download").addEventListener("click", (e) => {
    e.stopPropagation();
    ddExport.classList.toggle("open");
  });
  document.addEventListener("click", () => ddExport.classList.remove("open"));
  ddExport.addEventListener("click", (e) => {
    const item = e.target.closest(".dd-item");
    if (!item) return;
    const fmt = item.dataset.fmt;
    exportImage(fmt);
    ddExport.classList.remove("open");
  });

  // ─── Keyboard shortcuts ───────────────────────────────────────────────────
  document.addEventListener("keydown", (e) => {
    const ctrl = e.ctrlKey || e.metaKey;

    if (ctrl && e.key === "z") { e.preventDefault(); undo(); }
    if (ctrl && e.key === "y") { e.preventDefault(); redo(); }
    if (ctrl && e.key === "s") { e.preventDefault(); exportImage("png"); }
    if (ctrl && e.key === "c") { e.preventDefault(); exportImage("clipboard"); }

    if (e.key === "Escape") {
      if (cropActive) exitCrop();
      if (tool) { tool = null; setToolActive(null); }
    }

    if (!ctrl && !e.altKey) {
      if (e.key === "c" || e.key === "C") {
        if (!cropActive) enterCrop(); else applyCrop();
      }
      if (e.key === "r" || e.key === "R") selectTool("rect", "tb-draw-rect");
      if (e.key === "a" || e.key === "A") selectTool("arrow", "tb-draw-arrow");
      if (e.key === "t" || e.key === "T") selectTool("text", "tb-draw-text");
      if (e.key === "b" || e.key === "B") selectTool("blur", "tb-draw-blur");
      if (e.key === "p" || e.key === "P") selectTool("pen", "tb-draw-pen");
    }

    if (e.key === "+" || e.key === "=") { if (ctrl) { e.preventDefault(); setZoom(zoom * 1.25); } }
    if (e.key === "-") { if (ctrl) { e.preventDefault(); setZoom(zoom / 1.25); } }
    if (e.key === "0") { if (ctrl) { e.preventDefault(); setZoom(1); } }
  });

  // ─── Load image from storage ──────────────────────────────────────────────
  function init() {
    $("#status-text").textContent = "Carregando imagem…";
    chrome.storage.local.get("revoltz_editor_image", (data) => {
      const dataUrl = data?.revoltz_editor_image;
      if (dataUrl) {
        loadImage(dataUrl);
        chrome.storage.local.remove("revoltz_editor_image");
      } else {
        $("#status-text").textContent = "Nenhuma imagem recebida.";
      }
    });
  }

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "EDITOR_LOAD_IMAGE" && msg.dataUrl) {
      loadImage(msg.dataUrl);
    }
  });

  init();
})();
