const FEATURES = [
  { id: "colorpicker",icon: "🎨", name: "Color Picker",       desc: "Pega a cor exata do pixel",                       cat: "cores" },
  { id: "contrast",   icon: "♿", name: "Contraste WCAG",      desc: "Verifica contraste de cor para acessibilidade",   cat: "cores" },
  { id: "darkmode",      icon: "🌗", name: "Modo Escuro Forçado",   desc: "Inverte as cores do site para simular dark mode",    cat: "cores" },
  { id: "cssvars",       icon: "🎛️", name: "CSS Variables",         desc: "Lista todas as custom properties da página",         cat: "cores" },
  { id: "whatfont",   icon: "🔤", name: "Qual Fonte",         desc: "Identifica fontes dos elementos",                  cat: "tipografia" },
  { id: "changefont", icon: "✏️", name: "Trocar Fonte",        desc: "Troca a fonte do site inteiro",                   cat: "tipografia" },
  { id: "wordcount",     icon: "📝", name: "Contar Palavras",        desc: "Conta palavras e caracteres no body da página",      cat: "tipografia" },
  { id: "edittext",   icon: "✍️", name: "Editar Textos",       desc: "Torna os textos da página editáveis",             cat: "tipografia" },
  { id: "loremipsum",    icon: "📝", name: "Lorem Ipsum",           desc: "Gera texto placeholder para copiar ou injetar",       cat: "tipografia" },
  { id: "grid",       icon: "📐", name: "Grid Overlay",        desc: "Exibe overlay de grade de colunas na página",     cat: "layout" },
  { id: "ruler",      icon: "📏", name: "Régua",               desc: "Mede distâncias em pixels entre pontos",          cat: "layout" },
  { id: "boxmodel",      icon: "📦", name: "Box Model",              desc: "Inspeciona margin/padding/border ao passar o mouse",  cat: "layout" },
  { id: "outline",    icon: "🔲", name: "Outline Elementos",   desc: "Mostra bordas coloridas por tipo de elemento",    cat: "layout" },
  { id: "mobileview", icon: "📱", name: "Visão Mobile",        desc: "Simula tela de celular",                          cat: "layout" },
  { id: "zindexmap",     icon: "🧩", name: "Z-index Map",            desc: "Visualiza elementos com z-index definido",           cat: "layout" },
  { id: "saveimage",  icon: "💾", name: "Salvar Imagem",       desc: "Salva imagens em vários formatos",                cat: "midia" },
  { id: "base64img",     icon: "🔀", name: "Imagem ↔ Base64",      desc: "Converte imagem URL para base64 e vice-versa",       cat: "midia" },
  { id: "screenshot",    icon: "📸", name: "Capturar Print",         desc: "Captura área visível, página inteira ou elemento",  cat: "midia" },
  { id: "screenrecorder",icon: "🎬", name: "Gravador de Tela",    desc: "Grava tela, janela ou aba com áudio",                 cat: "midia" },
  { id: "noalt",      icon: "🖼️", name: "Imagens sem Alt",     desc: "Destaca imagens sem atributo alt",                cat: "midia" },
  { id: "lazycheck",     icon: "🦥", name: "Lazy Load Checker",     desc: "Detecta imagens sem loading=lazy",                   cat: "midia" },
  { id: "qrcode",        icon: "📱", name: "QR Code",               desc: "Gera QR Code da URL atual",                          cat: "midia" },
  { id: "metatags",   icon: "🏷️", name: "Meta Tags",           desc: "Lista todas as meta tags da página",              cat: "seo" },
  { id: "extlinks",   icon: "🔗", name: "Links Externos",       desc: "Lista todos os links externos da página",         cat: "seo" },
  { id: "headings",      icon: "🔍", name: "Headings",               desc: "Hierarquia H1–H6 da página",                        cat: "seo" },
  { id: "robotstxt",     icon: "🤖", name: "Robots.txt",             desc: "Exibe o robots.txt do site atual",                   cat: "seo" },
  { id: "sitemap",       icon: "🗺️", name: "Sitemap",               desc: "Tenta encontrar e exibir o sitemap.xml",             cat: "seo" },
  { id: "ogpreview",     icon: "👁️", name: "Open Graph Preview",   desc: "Simula preview do link em redes sociais",             cat: "seo" },
  { id: "iframes",     icon: "📦", name: "Iframes",           desc: "Detecta iframes em tempo real",                    cat: "inspecao" },
  { id: "deleteelem", icon: "🗑️", name: "Remover Elemento",    desc: "Clique para apagar elementos da página",          cat: "inspecao" },
  { id: "elemcount",     icon: "📊", name: "Contagem Elementos",     desc: "Quantidade de cada tag no DOM",                     cat: "inspecao" },
  { id: "requests",      icon: "🕵️", name: "Requisições",            desc: "Lista recursos carregados pela página",              cat: "inspecao" },
  { id: "interceptor",   icon: "📡", name: "Interceptor",            desc: "Intercepta requests em tempo real (XHR, WS, SSE)",   cat: "inspecao" },
  { id: "viewsource",    icon: "💻", name: "Ver Código Fonte",       desc: "Abre o código fonte da aba atual",                    cat: "inspecao" },
  { id: "techstack",     icon: "⚙️", name: "Tech Stack",            desc: "Detecta frameworks e tecnologias do site",           cat: "inspecao" },
  { id: "clearstorage",icon: "🧹", name: "Limpar Storage",     desc: "Apaga localStorage, sessionStorage e cookies",    cat: "storage" },
  { id: "storageviewer", icon: "🗄️", name: "Storage Viewer",       desc: "Visualiza e gerencia localStorage/sessionStorage",   cat: "storage" },
  { id: "cookieeditor",  icon: "🍪", name: "Cookie Editor",         desc: "Visualiza, edita e deleta cookies do site",          cat: "storage" },
  { id: "pagespeed",     icon: "⚡", name: "Page Speed",             desc: "Métricas de carregamento da página",                cat: "performance" },
  { id: "secheaders",    icon: "🛡️", name: "Security Headers",     desc: "Verifica headers de segurança do site",              cat: "performance" },
  { id: "disablejs",     icon: "🚫", name: "Disable JS",            desc: "Desativa JavaScript na aba atual",                   cat: "performance" },
  { id: "disablecss",    icon: "🎭", name: "Disable CSS",           desc: "Remove todas as folhas de estilo da página",         cat: "performance" },
  { id: "unprotect",  icon: "🔓", name: "Unprotect",          desc: "Remove proteções do site",                        cat: "performance" },
  { id: "datagen",       icon: "🎲", name: "Gerador de Dados",      desc: "Gera senhas, CPF, CNPJ, cartão, UUID e mais",        cat: "geradores" },
  { id: "hashgen",       icon: "🔒", name: "Hash Generator",       desc: "Gera SHA-1, SHA-256, SHA-512 de qualquer texto",     cat: "geradores" },
  { id: "timestamp",     icon: "⏰", name: "Timestamp",            desc: "Converte timestamp ↔ data e gera ISO 8601",          cat: "geradores" },
  { id: "encodedecode",  icon: "🔄", name: "Base64 Encode/Decode", desc: "Encode e decode de texto em Base64",                  cat: "geradores" },
  { id: "jsonformat",    icon: "📋", name: "JSON Formatter",        desc: "Formata e destaca JSON da página ou colado",         cat: "geradores" },
  { id: "consolelog",    icon: "📟", name: "Console Logger",        desc: "Captura logs do console da página",                  cat: "geradores" },
  { id: "translate",     icon: "🌐", name: "Traduzir Página",        desc: "Abre a página no Google Translate",                  cat: "utilidades" },
];

const USAGE_KEY = "revoltz_usage";
const LAST_USED_KEY = "revoltz_last_used";
const TOOL_FAVS_KEY = "revoltz_tool_favs";
let usageCounts = {};
let lastUsedTimes = {};
let toolFavs = new Set();

async function loadUsage() {
  const data = await chrome.storage.local.get([USAGE_KEY, LAST_USED_KEY, TOOL_FAVS_KEY]);
  usageCounts = data[USAGE_KEY] || {};
  lastUsedTimes = data[LAST_USED_KEY] || {};
  toolFavs = new Set(data[TOOL_FAVS_KEY] || []);
}
function trackUsage(id) {
  usageCounts[id] = (usageCounts[id] || 0) + 1;
  lastUsedTimes[id] = Date.now();
  chrome.storage.local.set({ [USAGE_KEY]: usageCounts, [LAST_USED_KEY]: lastUsedTimes });
}
function saveToolFavs() {
  chrome.storage.local.set({ [TOOL_FAVS_KEY]: [...toolFavs] });
}

const DEFAULT_CONFIG = { floatMode: false, imageOutputMode: "editor" };
FEATURES.forEach((f) => (DEFAULT_CONFIG[f.id] = true));

let config = { ...DEFAULT_CONFIG };
let activeTabId = null;
let iframeCount = 0;
let srIsRecording = false;
let activeMenuCat = "all";
let activeMenuSearch = "";

async function loadConfig() {
  return new Promise((resolve) => {
    chrome.storage.sync.get("revoltzConfig", (data) => {
      config = { ...DEFAULT_CONFIG, ...(data.revoltzConfig || {}) };
      resolve(config);
    });
  });
}

function saveConfig() {
  chrome.storage.sync.set({ revoltzConfig: config });
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
    chrome.tabs.create({ url: chrome.runtime.getURL("editor.html") });
  });
}

function showView(id) {
  ["view-menu", "view-panel", "view-settings", "view-features-toggle"].forEach((v) => {
    document.getElementById(v).style.display = v === id ? "block" : "none";
  });
}

const MENU_CATS = [
  { id: "all",         label: "Todos",       icon: "📋" },
  { id: "cores",       label: "Cores",       icon: "🎨" },
  { id: "tipografia",  label: "Tipografia",  icon: "🔤" },
  { id: "layout",      label: "Layout",      icon: "📐" },
  { id: "midia",       label: "Mídia",       icon: "🖼️" },
  { id: "seo",         label: "SEO",         icon: "🔍" },
  { id: "inspecao",    label: "Inspeção",    icon: "🔬" },
  { id: "storage",     label: "Storage",     icon: "🗄️" },
  { id: "performance", label: "Performance", icon: "⚡" },
  { id: "geradores",   label: "Geradores",   icon: "🎲" },
  { id: "utilidades",  label: "Utilidades",  icon: "🔧" },
  { id: "favs",        label: "Favoritos",   icon: "⭐" },
];

function buildMenu() {
  const container = document.getElementById("menu-list");
  container.innerHTML = "";

  const catWrap = document.createElement("div");
  catWrap.className = "menu-cat-wrap";

  const tabBar = document.createElement("div");
  tabBar.className = "menu-cat-tabs";
  const quickTabs = [
    { id: "all",     label: "Todos",     icon: "📋" },
    { id: "recents", label: "Recentes",  icon: "🕐" },
    { id: "favs",    label: "Favoritos", icon: "⭐" },
  ];
  quickTabs.forEach((cat) => {
    const t = document.createElement("button");
    t.className = "menu-cat-tab" + (activeMenuCat === cat.id ? " active" : "");
    t.innerHTML = `<span class="cat-icon">${cat.icon}</span><span class="cat-label">${cat.label}</span>`;
    t.addEventListener("click", () => {
      activeMenuCat = cat.id;
      activeMenuSearch = "";
      buildMenu();
    });
    tabBar.appendChild(t);
  });
  catWrap.appendChild(tabBar);

  container.appendChild(catWrap);

  const searchWrap = document.createElement("div");
  searchWrap.className = "menu-search-wrap";
  const searchInput = document.createElement("input");
  searchInput.className = "menu-search";
  searchInput.type = "search";
  searchInput.placeholder = "🔍 Pesquisar ferramenta…";
  searchInput.value = activeMenuSearch;
  searchInput.addEventListener("input", (e) => {
    activeMenuSearch = e.target.value;
    renderList();
  });
  searchWrap.appendChild(searchInput);
  container.appendChild(searchWrap);

  const listWrapper = document.createElement("div");
  listWrapper.className = "menu-items-wrapper";
  container.appendChild(listWrapper);

  function renderList() {
    listWrapper.innerHTML = "";
    const q = activeMenuSearch.trim().toLowerCase();

    let visible = FEATURES.filter((f) => config[f.id]);
    if (activeMenuCat === "favs") {
      visible = visible.filter((f) => toolFavs.has(f.id));
    } else if (activeMenuCat === "recents") {
      visible = visible.filter((f) => lastUsedTimes[f.id]);
    } else if (activeMenuCat !== "all") {
      visible = visible.filter((f) => f.cat === activeMenuCat);
    }
    if (q) {
      visible = visible.filter(
        (f) => f.name.toLowerCase().includes(q) || f.desc.toLowerCase().includes(q)
      );
    }

    if (activeMenuCat === "all" && !q) {
      // ── Seção "Recentes" no topo ──
      const recents = visible
        .filter(f => lastUsedTimes[f.id])
        .sort((a, b) => (lastUsedTimes[b.id] || 0) - (lastUsedTimes[a.id] || 0))
        .slice(0, 6);

      if (recents.length > 0) {
        const section = document.createElement("div");
        section.className = "menu-category-section";
        const header = document.createElement("div");
        header.className = "menu-category-header";
        header.innerHTML = `
          <span class="cat-header-name">🕐 Recentes</span>
          <span class="cat-header-badge">${recents.length}</span>
        `;
        section.appendChild(header);
        const grid = document.createElement("div");
        grid.className = "menu-items";
        recents.forEach(f => grid.appendChild(createFeatureItem(f)));
        section.appendChild(grid);
        listWrapper.appendChild(section);
      }

      const catOrder = MENU_CATS.filter(c => c.id !== "all" && c.id !== "favs").map(c => c.id);
      const grouped = {};
      catOrder.forEach(cat => { grouped[cat] = []; });
      
      visible.forEach(f => {
        if (grouped[f.cat]) grouped[f.cat].push(f);
      });

      // Sort items within each category by last used time
      catOrder.forEach(catId => {
        if (grouped[catId]) {
          grouped[catId].sort((a, b) => {
            const ta = lastUsedTimes[a.id] || 0;
            const tb = lastUsedTimes[b.id] || 0;
            if (tb !== ta) return tb - ta;
            return (usageCounts[b.id] || 0) - (usageCounts[a.id] || 0);
          });
        }
      });

      catOrder.forEach(catId => {
        const items = grouped[catId];
        if (!items || items.length === 0) return;
        
        const catInfo = MENU_CATS.find(c => c.id === catId);
        
        const section = document.createElement("div");
        section.className = "menu-category-section";
        
        const header = document.createElement("div");
        header.className = "menu-category-header";
        header.innerHTML = `
          <span class="cat-header-name">${catInfo.icon} ${catInfo.label}</span>
          <span class="cat-header-badge">${items.length}</span>
        `;
        section.appendChild(header);
        
        const grid = document.createElement("div");
        grid.className = "menu-items";
        
        items.forEach((feature) => {
          const item = createFeatureItem(feature);
          grid.appendChild(item);
        });
        
        section.appendChild(grid);
        listWrapper.appendChild(section);
      });
    } else {
      const grid = document.createElement("div");
      grid.className = "menu-items";
      
      visible = [...visible].sort((a, b) => {
        const ta = lastUsedTimes[a.id] || 0;
        const tb = lastUsedTimes[b.id] || 0;
        if (tb !== ta) return tb - ta;
        return (usageCounts[b.id] || 0) - (usageCounts[a.id] || 0);
      });

      visible.forEach((feature) => {
        const item = createFeatureItem(feature);
        grid.appendChild(item);
      });
      
      listWrapper.appendChild(grid);
    }

    if (!visible.length) {
      const msg = document.createElement("p");
      msg.className = "empty";
      msg.textContent =
        q ? "Nenhuma ferramenta encontrada." :
        activeMenuCat === "favs" ? "Nenhum favorito ainda. Clique em ★ para favoritar." :
        "Nenhuma ferramenta nesta categoria.";
      listWrapper.appendChild(msg);
    }
  }

  function createFeatureItem(feature) {
    const item = document.createElement("div");
    item.className = "menu-item";
    item.dataset.id = feature.id;

    const isFav = toolFavs.has(feature.id);
    let badgeHtml = "";
    if (feature.id === "iframes" && iframeCount > 0) {
      badgeHtml = `<span class="item-badge">${iframeCount}</span>`;
    }
    if (feature.id === "screenrecorder" && srIsRecording) {
      badgeHtml = `<span style="position:absolute;top:6px;right:6px;width:8px;height:8px;border-radius:50%;background:#ff5f57;animation:sr-blink 1.2s ease-in-out infinite;box-shadow:0 0 4px #ff5f57;"></span>`;
    }

    item.innerHTML = `
      <div class="item-icon">${feature.icon}</div>
      <div class="item-info">
        <div class="item-name">${feature.name}</div>
        <div class="item-desc">${feature.desc}</div>
      </div>
      ${badgeHtml}
      <button class="tool-fav-btn${isFav ? " starred" : ""}" data-id="${feature.id}" title="Favoritar">★</button>
      <div class="item-arrow">›</div>
    `;
    item.querySelector(".tool-fav-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      const id = feature.id;
      if (toolFavs.has(id)) toolFavs.delete(id);
      else toolFavs.add(id);
      saveToolFavs();
      renderList();
    });
    item.addEventListener("click", () => openPanel(feature.id));
    return item;
  }

  renderList();

  if (activeMenuSearch) {
    setTimeout(() => {
      const s = container.querySelector(".menu-search");
      if (s) { s.focus(); s.setSelectionRange(s.value.length, s.value.length); }
    }, 0);
  }
}

function openPanel(featureId) {
  showView("view-panel");
  const panel = document.getElementById("panel-content");
  panel.innerHTML = '<p class="empty">Carregando…</p>';

  const loaders = {
    iframes: loadIframesPanel,
    colorpicker: loadColorPickerPanel,
    whatfont: loadWhatFontPanel,
    changefont: loadChangeFontPanel,
    unprotect: loadUnprotectPanel,
    saveimage: loadSaveImagePanel,
    mobileview: loadMobileViewPanel,
    outline: loadOutlinePanel,
    grid: loadGridPanel,
    ruler: loadRulerPanel,
    contrast: loadContrastPanel,
    edittext: loadEditTextPanel,
    deleteelem: loadDeleteElemPanel,
    metatags: loadMetaTagsPanel,
    extlinks: loadExtLinksPanel,
    noalt: loadNoAltPanel,
    clearstorage: loadClearStoragePanel,
    base64img: loadBase64ImgPanel,
    screenshot: loadScreenshotPanel,
    requests:      loadRequestsPanel,
    interceptor:   loadInterceptorPanel,
    pagespeed:     loadPageSpeedPanel,
    elemcount:     loadElemCountPanel,
    headings:      loadHeadingsPanel,
    storageviewer: loadStorageViewerPanel,
    cssvars:       loadCssVarsPanel,
    boxmodel:      loadBoxModelPanel,
    darkmode:      loadDarkModePanel,
    zindexmap:     loadZIndexMapPanel,
    robotstxt:     loadRobotsTxtPanel,
    sitemap:       loadSitemapPanel,
    wordcount:     loadWordCountPanel,
    viewsource:    loadViewSourcePanel,
    translate:     loadTranslatePanel,
    jsonformat:    loadJsonFormatPanel,
    disablejs:     loadDisableJsPanel,
    disablecss:    loadDisableCssPanel,
    cookieeditor:  loadCookieEditorPanel,
    consolelog:    loadConsoleLogPanel,
    loremipsum:    loadLoremIpsumPanel,
    ogpreview:     loadOgPreviewPanel,
    lazycheck:     loadLazyCheckPanel,
    secheaders:    loadSecHeadersPanel,
    techstack:     loadTechStackPanel,
    qrcode:        loadQrCodePanel,
    datagen:       loadDataGenPanel,
    hashgen:       loadHashGenPanel,
    timestamp:     loadTimestampPanel,
    encodedecode:  loadEncodeDecodePanel,
    screenrecorder: loadScreenRecorderPanel,
  };

  if (loaders[featureId]) {
    trackUsage(featureId);
    loaders[featureId](panel);
  }
}

function loadIframesPanel(panel) {
  chrome.tabs.sendMessage(activeTabId, { type: "GET_IFRAMES" }, (response) => {
    if (chrome.runtime.lastError || !response) {
      panel.innerHTML = '<p class="empty">Não foi possível ler esta página.</p>';
      return;
    }
    const urls = response.urls || [];
    if (urls.length === 0) {
      panel.innerHTML = '<p class="empty">Nenhum iframe encontrado.</p>';
      return;
    }

    panel.innerHTML = `<div class="section-title">Iframes encontrados (${urls.length})</div>`;
    const list = document.createElement("ul");
    list.className = "item-list";

    urls.forEach((url) => {
      const li = document.createElement("li");
      li.className = "item-card";
      const span = document.createElement("span");
      span.className = "url";
      span.textContent = url;

      const btn = document.createElement("button");
      btn.className = "btn";
      btn.textContent = "Copiar";
      btn.addEventListener("click", () => {
        navigator.clipboard.writeText(url).then(() => {
          btn.textContent = "Copiado!";
          btn.classList.add("success");
          setTimeout(() => { btn.textContent = "Copiar"; btn.classList.remove("success"); }, 1500);
        });
      });

      li.appendChild(span);
      li.appendChild(btn);
      list.appendChild(li);
    });
    panel.appendChild(list);
  });
}

function loadColorPickerPanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Color Picker</div>
    <p class="empty">Escolha uma cor pela paleta<br>ou capture qualquer pixel da tela.</p>
    <div style="display:flex;gap:6px;margin-bottom:6px;">
      <button class="btn" id="btn-eyedropper" style="flex:1;">🔍 Capturar Cor</button>
      <label class="btn" id="btn-palette" style="flex:1;cursor:pointer;position:relative;overflow:hidden;text-align:center;">
        🎨 Paleta
        <input type="color" id="color-input" value="#ffffff" style="position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%;">
      </label>
    </div>
    <div id="color-result" style="margin-top:6px;"></div>
  `;

  document.getElementById("color-input").addEventListener("input", (e) => {
    showColorResult(e.target.value);
  });

  document.getElementById("btn-eyedropper").addEventListener("click", async () => {
    if (!window.EyeDropper) {
      document.getElementById("color-result").innerHTML = `<p class="empty" style="color:#c55;">EyeDropper não suportado neste navegador.</p>`;
      return;
    }
    try {
      const result = await new EyeDropper().open();
      showColorResult(result.sRGBHex);
      document.getElementById("color-input").value = result.sRGBHex;
    } catch (_) { /* cancelado pelo usuário */ }
  });
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function showColorResult(hex) {
  const resultEl = document.getElementById("color-result");
  if (!resultEl) return;
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  const rgbStr = `rgb(${r}, ${g}, ${b})`;
  const hslStr = `hsl(${h}, ${s}%, ${l}%)`;

  resultEl.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;background:#080808;border:1px solid #1a1a1a;border-radius:8px;padding:12px 14px;margin-bottom:8px;">
      <div style="width:40px;height:40px;border-radius:8px;background:${hex};border:1px solid #333;flex-shrink:0;"></div>
      <div style="flex:1;display:flex;flex-direction:column;gap:4px;">
        <div class="color-copy-row" data-value="${hex}" style="cursor:pointer;display:flex;align-items:center;justify-content:space-between;padding:4px 8px;border-radius:4px;transition:background 0.15s;">
          <span style="font-family:monospace;font-size:12px;font-weight:600;">${hex}</span>
          <span style="font-size:9px;color:#555;">HEX</span>
        </div>
        <div class="color-copy-row" data-value="${rgbStr}" style="cursor:pointer;display:flex;align-items:center;justify-content:space-between;padding:4px 8px;border-radius:4px;transition:background 0.15s;">
          <span style="font-family:monospace;font-size:11px;color:#aaa;">${rgbStr}</span>
          <span style="font-size:9px;color:#555;">RGB</span>
        </div>
        <div class="color-copy-row" data-value="${hslStr}" style="cursor:pointer;display:flex;align-items:center;justify-content:space-between;padding:4px 8px;border-radius:4px;transition:background 0.15s;">
          <span style="font-family:monospace;font-size:11px;color:#aaa;">${hslStr}</span>
          <span style="font-size:9px;color:#555;">HSL</span>
        </div>
      </div>
    </div>
  `;

  resultEl.querySelectorAll(".color-copy-row").forEach((row) => {
    row.addEventListener("mouseenter", () => { row.style.background = "#111"; });
    row.addEventListener("mouseleave", () => { row.style.background = "transparent"; });
    row.addEventListener("click", () => {
      navigator.clipboard.writeText(row.dataset.value);
      const label = row.querySelector("span:last-child");
      const original = label.textContent;
      label.textContent = "Copiado!";
      label.style.color = "#5a5";
      setTimeout(() => { label.textContent = original; label.style.color = "#555"; }, 1200);
    });
  });
}

function loadWhatFontPanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Qual Fonte</div>
    <p class="empty">Passe o mouse sobre qualquer texto para ver a fonte.<br>Clique para copiar as informações.</p>
    <button class="btn btn-full" id="btn-whatfont">Ativar Qual Fonte</button>
  `;

  document.getElementById("btn-whatfont").addEventListener("click", () => {
    chrome.tabs.sendMessage(activeTabId, { type: "ACTIVATE_WHATFONT" });
    window.close();
  });
}

function loadChangeFontPanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Trocar Fonte</div>
    <div class="font-tabs">
      <button class="font-tab active" data-tab="all">Todas</button>
      <button class="font-tab" data-tab="recent">Recentes</button>
      <button class="font-tab" data-tab="favs">★ Favoritos</button>
    </div>
    <div style="margin-bottom:8px;">
      <input type="text" id="font-search" placeholder="Buscar fonte…"
        style="width:100%;padding:8px 10px;background:#080808;border:1px solid #1a1a1a;border-radius:6px;color:#fff;font-family:'Anybody',sans-serif;font-size:11px;outline:none;">
    </div>
    <div id="font-list" style="max-height:260px;overflow-y:auto;display:flex;flex-direction:column;gap:4px;"></div>
    <button class="btn btn-full" id="btn-reset-font" style="margin-top:8px;">Resetar Fonte Original</button>
  `;

  initFontPanel();

  document.getElementById("btn-reset-font").addEventListener("click", () => {
    chrome.tabs.sendMessage(activeTabId, { type: "RESET_FONT" });
    document.querySelectorAll("#font-list .btn").forEach((b) => b.classList.remove("active-toggle"));
    showBtnSuccess(document.getElementById("btn-reset-font"));
  });
}

const FONT_FAVS_KEY = "revoltz_fonts_favs";
const FONT_RECENT_KEY = "revoltz_fonts_recent";
const MAX_RECENT = 30;

const ALL_FONTS = [
  // Sans-serif populares
  "Roboto", "Open Sans", "Noto Sans", "Montserrat", "Lato", "Poppins", "Inter",
  "Oswald", "Raleway", "Source Sans 3", "Nunito", "Ubuntu", "Rubik",
  "PT Sans", "Kanit", "Work Sans", "Fira Sans", "Barlow", "Mulish",
  "Quicksand", "Nunito Sans", "Titillium Web", "Heebo", "DM Sans", "Manrope",
  "Karla", "Libre Franklin", "Outfit", "Space Grotesk", "Figtree",
  "Plus Jakarta Sans", "Lexend", "Urbanist", "Sora", "Albert Sans",
  "Red Hat Display", "Comfortaa", "Archivo", "Anybody", "Cabin",
  "Exo 2", "Overpass", "Signika", "Catamaran", "Hind", "Asap",
  "Assistant", "Sarabun", "Nanum Gothic", "Prompt", "Dosis",
  "Abel", "Varela Round", "Yanone Kaffeesatz", "Arimo", "Teko",
  "Rajdhani", "Chakra Petch", "Orbitron", "Jost", "Readex Pro",

  // Serif
  "Playfair Display", "Merriweather", "Lora", "Noto Serif", "PT Serif",
  "Libre Baskerville", "EB Garamond", "Cormorant Garamond", "Crimson Text",
  "Bitter", "Domine", "Vollkorn", "Arvo", "Cardo", "Spectral",
  "Source Serif 4", "IBM Plex Serif", "Zilla Slab", "DM Serif Display",
  "DM Serif Text", "Bodoni Moda", "Fraunces",

  // Display / Decorativas
  "Bebas Neue", "Anton", "Righteous", "Fredoka One", "Passion One",
  "Bungee", "Bungee Shade", "Black Ops One", "Permanent Marker",
  "Alfa Slab One", "Lobster", "Lobster Two", "Paytone One",
  "Russo One", "Staatliches", "Fugaz One", "Sigmar One",
  "Lilita One", "Banger", "Rubik Mono One", "Audiowide",

  // Script / Handwriting
  "Dancing Script", "Pacifico", "Caveat", "Satisfy", "Great Vibes",
  "Indie Flower", "Sacramento", "Kalam", "Shadows Into Light",
  "Amatic SC", "Courgette", "Cookie", "Architects Daughter",
  "Patrick Hand", "Handlee", "Gloria Hallelujah",

  // Monospace
  "Roboto Mono", "Fira Code", "JetBrains Mono", "Source Code Pro",
  "IBM Plex Mono", "Space Mono", "Inconsolata", "Ubuntu Mono",
  "Cousine", "Anonymous Pro",
];

async function initFontPanel() {
  const fontListEl = document.getElementById("font-list");
  const searchEl = document.getElementById("font-search");
  if (!fontListEl) return;

  const loadedCss = new Set();
  let scrollTimer = null;
  let currentTab = "all";

  const stored = await chrome.storage.local.get([FONT_FAVS_KEY, FONT_RECENT_KEY]);
  const favs = new Set(stored[FONT_FAVS_KEY] || []);
  const recents = stored[FONT_RECENT_KEY] || [];

  async function saveFavs() {
    chrome.storage.local.set({ [FONT_FAVS_KEY]: [...favs] });
  }
  function addRecent(fontName) {
    const idx = recents.indexOf(fontName);
    if (idx !== -1) recents.splice(idx, 1);
    recents.unshift(fontName);
    if (recents.length > MAX_RECENT) recents.length = MAX_RECENT;
    chrome.storage.local.set({ [FONT_RECENT_KEY]: recents });
  }

  function loadVisibleFonts() {
    const rect = fontListEl.getBoundingClientRect();
    const pending = [];
    for (const btn of fontListEl.querySelectorAll(".btn[data-font]")) {
      const br = btn.getBoundingClientRect();
      if (br.bottom < rect.top - 100 || br.top > rect.bottom + 100) continue;
      const name = btn.dataset.font;
      if (loadedCss.has(name)) continue;
      loadedCss.add(name);
      pending.push(name);
    }
    if (pending.length) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${pending.map((f) => encodeURIComponent(f)).join("&family=")}&display=swap`;
      document.head.appendChild(link);
      link.onload = () => {
        pending.forEach((f) => {
          const b = fontListEl.querySelector(`.btn[data-font="${CSS.escape(f)}"]`);
          if (b) b.style.fontFamily = `"${f}", sans-serif`;
        });
      };
    }
  }

  function createFontRow(fontName) {
    const wrap = document.createElement("div");
    wrap.className = "font-btn-wrap";

    const btn = document.createElement("button");
    btn.className = "btn";
    btn.dataset.font = fontName;
    btn.style.cssText = "text-align:left;width:100%;padding:8px 10px;";
    btn.textContent = fontName;
    if (loadedCss.has(fontName)) btn.style.fontFamily = `"${fontName}", sans-serif`;

    btn.addEventListener("click", () => {
      chrome.tabs.sendMessage(activeTabId, { type: "CHANGE_FONT", font: fontName });
      fontListEl.querySelectorAll(".btn").forEach((b) => b.classList.remove("active-toggle"));
      btn.classList.add("active-toggle");
      addRecent(fontName);
    });

    const star = document.createElement("button");
    star.className = "font-star" + (favs.has(fontName) ? " starred" : "");
    star.textContent = "★";
    star.addEventListener("click", (e) => {
      e.stopPropagation();
      if (favs.has(fontName)) {
        favs.delete(fontName);
        star.classList.remove("starred");
      } else {
        favs.add(fontName);
        star.classList.add("starred");
      }
      saveFavs();
      if (currentTab === "favs") renderFonts(searchEl.value);
    });

    wrap.appendChild(btn);
    wrap.appendChild(star);
    return wrap;
  }

  function getList(filter) {
    const lf = filter.toLowerCase();
    let src = currentTab === "favs" ? ALL_FONTS.filter((f) => favs.has(f))
            : currentTab === "recent" ? recents
            : ALL_FONTS;
    return lf ? src.filter((f) => f.toLowerCase().includes(lf)) : src;
  }

  function renderFonts(filter = "") {
    const list = getList(filter);
    fontListEl.innerHTML = "";
    if (!list.length) {
      const msg = document.createElement("div");
      msg.className = "font-loading";
      msg.textContent = currentTab === "favs" ? "Nenhum favorito ainda" : currentTab === "recent" ? "Nenhuma fonte recente" : "Nenhuma fonte encontrada";
      fontListEl.appendChild(msg);
      return;
    }
    const frag = document.createDocumentFragment();
    list.forEach((f) => frag.appendChild(createFontRow(f)));
    fontListEl.appendChild(frag);
    requestAnimationFrame(loadVisibleFonts);
  }

  fontListEl.addEventListener("scroll", () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(loadVisibleFonts, 100);
  });

  renderFonts();
  searchEl.addEventListener("input", (e) => renderFonts(e.target.value));

  searchEl.addEventListener("keydown", (e) => {
    const btns = [...fontListEl.querySelectorAll(".btn[data-font]")];
    if (!btns.length) return;
    const current = fontListEl.querySelector(".btn[data-font].active-toggle") || fontListEl.querySelector(".btn[data-font].kb-focus");
    let idx = current ? btns.indexOf(current) : -1;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      idx = idx < btns.length - 1 ? idx + 1 : 0;
      btns.forEach((b) => b.classList.remove("kb-focus"));
      btns[idx].classList.add("kb-focus");
      btns[idx].scrollIntoView({ block: "nearest" });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      idx = idx > 0 ? idx - 1 : btns.length - 1;
      btns.forEach((b) => b.classList.remove("kb-focus"));
      btns[idx].classList.add("kb-focus");
      btns[idx].scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter") {
      e.preventDefault();
      const focused = fontListEl.querySelector(".btn[data-font].kb-focus");
      if (focused) focused.click();
    }
  });

  document.querySelectorAll(".font-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".font-tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      currentTab = tab.dataset.tab;
      renderFonts(searchEl.value);
    });
  });
}

function loadUnprotectPanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Remover Proteções</div>
    <p class="empty">Desbloqueia clique direito, cópia de texto e seleção que o site bloqueia.</p>
    <button class="btn btn-full" id="btn-unprotect-all">Desbloquear Tudo</button>
  `;

  document.getElementById("btn-unprotect-all").addEventListener("click", () => {
    chrome.tabs.sendMessage(activeTabId, { type: "ENABLE_FULL_UNPROTECT" }, () => {
      showBtnSuccess(document.getElementById("btn-unprotect-all"));
    });
  });
}

function loadSaveImagePanel(panel) {
  const PAGE_STEP = 12;
  let allImgs = [];
  let shown = PAGE_STEP;

  function render() {
    panel.innerHTML = `
      <div class="section-title">Salvar Imagens</div>
      <div style="display:flex;gap:6px;margin-bottom:10px;">
        <button class="btn" id="btn-save-image" style="flex:2;">🖱 Selecionar na Página</button>
        <button class="btn" id="btn-reload-imgs" style="flex:1;">↺ Recarregar</button>
      </div>
      <div id="img-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;"></div>
      <div id="img-footer" style="margin-top:8px;text-align:center;"></div>
    `;

    document.getElementById("btn-save-image").addEventListener("click", () => {
      chrome.tabs.sendMessage(activeTabId, { type: "ACTIVATE_IMAGE_SAVER" });
      window.close();
    });
    document.getElementById("btn-reload-imgs").addEventListener("click", () => {
      allImgs = [];
      shown = PAGE_STEP;
      fetchAndRenderImgs();
    });

    renderImgGrid();
  }

  function renderImgGrid() {
    const grid = document.getElementById("img-grid");
    const footer = document.getElementById("img-footer");
    if (!grid) return;
    grid.innerHTML = "";

    if (!allImgs.length) {
      grid.innerHTML = '<p class="empty" style="grid-column:1/-1;">Nenhuma imagem encontrada.</p>';
      footer.innerHTML = "";
      return;
    }

    const slice = allImgs.slice(0, shown);
    slice.forEach((src) => {
      const card = document.createElement("div");
      card.style.cssText = "position:relative;aspect-ratio:1;border:1px solid #1a1a1a;border-radius:6px;overflow:hidden;background:#080808;cursor:pointer;transition:border-color 0.15s;";
      card.addEventListener("mouseenter", () => { card.style.borderColor = "#555"; });
      card.addEventListener("mouseleave", () => { card.style.borderColor = "#1a1a1a"; });

      const img = document.createElement("img");
      img.src = src;
      img.style.cssText = "width:100%;height:100%;object-fit:cover;display:block;";
      img.onerror = () => { card.style.display = "none"; };

      const overlay = document.createElement("div");
      overlay.style.cssText = "position:absolute;inset:0;background:rgba(0,0,0,0.7);opacity:0;display:flex;align-items:center;justify-content:center;transition:opacity 0.15s;font-size:18px;";
      overlay.textContent = "💾";
      card.addEventListener("mouseenter", () => { overlay.style.opacity = "1"; });
      card.addEventListener("mouseleave", () => { overlay.style.opacity = "0"; });

      card.addEventListener("click", (e) => {
        e.preventDefault();
        const existing = document.getElementById("img-action-menu");
        if (existing) existing.remove();
        const menu = document.createElement("div");
        menu.id = "img-action-menu";
        menu.style.cssText = "position:fixed;background:#111;border:1px solid #333;border-radius:8px;padding:4px;z-index:9999;display:flex;flex-direction:column;gap:3px;";
        const cardRect = card.getBoundingClientRect();
        menu.style.left = cardRect.left + "px";
        menu.style.top = (cardRect.bottom + 4) + "px";
        const actions = [
          { label: "📥 Baixar", action: () => chrome.tabs.sendMessage(activeTabId, { type: "SAVE_IMAGE_AS", url: src, format: "png" }) },
          { label: "🖼️ Editor", action: () => {
            chrome.runtime.sendMessage({ type: "FETCH_IMAGE_AS_DATAURI", url: src }, (resp) => {
              if (resp?.dataUri) {
                chrome.storage.local.set({ revoltz_editor_image: resp.dataUri }, () => {
                  chrome.tabs.create({ url: chrome.runtime.getURL("editor.html") });
                });
              }
            });
          }},
          { label: "📋 Copiar", action: () => {
            chrome.runtime.sendMessage({ type: "FETCH_IMAGE_AS_DATAURI", url: src }, (resp) => {
              if (resp?.dataUri) {
                try {
                  const b64 = resp.dataUri.split(",")[1];
                  const bin = atob(b64);
                  const arr = new Uint8Array(bin.length);
                  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
                  const blob = new Blob([arr], { type: "image/png" });
                  navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]).catch(() => {});
                } catch {}
              }
            });
          }}
        ];
        actions.forEach(({ label, action }) => {
          const b = document.createElement("button");
          b.textContent = label;
          b.style.cssText = "background:none;border:none;color:#fff;font-family:inherit;font-size:10px;font-weight:600;padding:5px 12px;border-radius:5px;cursor:pointer;text-align:left;white-space:nowrap;";
          b.addEventListener("mouseenter", () => { b.style.background = "#222"; });
          b.addEventListener("mouseleave", () => { b.style.background = "none"; });
          b.addEventListener("click", (ev) => { ev.stopPropagation(); action(); menu.remove(); });
          menu.appendChild(b);
        });
        document.body.appendChild(menu);
        setTimeout(() => document.addEventListener("click", () => menu.remove(), { once: true }), 10);
      });

      // Right-click → show format chooser
      card.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        const existing = document.getElementById("img-ctx-menu");
        if (existing) existing.remove();
        const menu = document.createElement("div");
        menu.id = "img-ctx-menu";
        menu.style.cssText = "position:fixed;background:#111;border:1px solid #333;border-radius:8px;padding:4px;z-index:9999;display:flex;flex-direction:column;gap:3px;";
        menu.style.left = e.clientX + "px";
        menu.style.top = e.clientY + "px";
        ["png","jpg","webp","avif","original"].forEach(fmt => {
          const b = document.createElement("button");
          b.textContent = fmt.toUpperCase();
          b.style.cssText = "background:none;border:none;color:#fff;font-family:inherit;font-size:10px;font-weight:600;padding:5px 12px;border-radius:5px;cursor:pointer;text-align:left;";
          b.addEventListener("mouseenter", () => { b.style.background = "#222"; });
          b.addEventListener("mouseleave", () => { b.style.background = "none"; });
          b.addEventListener("click", () => {
            chrome.tabs.sendMessage(activeTabId, { type: "SAVE_IMAGE_AS", url: src, format: fmt });
            menu.remove();
          });
          menu.appendChild(b);
        });
        document.body.appendChild(menu);
        setTimeout(() => document.addEventListener("click", () => menu.remove(), { once: true }), 10);
      });

      card.appendChild(img);
      card.appendChild(overlay);
      grid.appendChild(card);
    });

    if (shown < allImgs.length) {
      footer.innerHTML = `<button class="btn" id="btn-load-more">Ver mais (${allImgs.length - shown} restantes)</button>`;
      document.getElementById("btn-load-more").addEventListener("click", () => {
        shown += PAGE_STEP;
        renderImgGrid();
      });
    } else {
      footer.innerHTML = allImgs.length > 0 ? `<span style="font-size:10px;color:#333;">${allImgs.length} imagem(ns) encontrada(s)</span>` : "";
    }
  }

  function fetchAndRenderImgs() {
    const grid = document.getElementById("img-grid");
    if (grid) grid.innerHTML = '<p class="empty" style="grid-column:1/-1;">Buscando imagens…</p>';
    chrome.tabs.sendMessage(activeTabId, { type: "GET_PAGE_IMAGES" }, (response) => {
      if (chrome.runtime.lastError || !response) return;
      allImgs = response.images || [];
      renderImgGrid();
    });
  }

  render();
  fetchAndRenderImgs();
}

function loadMobileViewPanel(panel) {
  const devices = [
    { name: "iPhone 4", w: 320, h: 480 },
    { name: "iPhone SE", w: 375, h: 667 },
    { name: "iPhone 6/7/8", w: 375, h: 667 },
    { name: "iPhone X/XS", w: 375, h: 812 },
    { name: "iPhone 12/13", w: 390, h: 844 },
    { name: "iPhone 14", w: 393, h: 852 },
    { name: "iPhone 14 Pro Max", w: 430, h: 932 },
    { name: "iPhone 15/16", w: 393, h: 852 },
    { name: "iPhone 16 Pro Max", w: 440, h: 956 },
    { name: "Galaxy S8", w: 360, h: 740 },
    { name: "Galaxy S21", w: 360, h: 800 },
    { name: "Galaxy S24", w: 360, h: 780 },
    { name: "Pixel 5", w: 393, h: 851 },
    { name: "Pixel 8", w: 412, h: 915 },
    { name: "iPad Mini", w: 768, h: 1024 },
    { name: "iPad Air", w: 820, h: 1180 },
    { name: "iPad Pro 11\"", w: 834, h: 1194 },
    { name: "iPad Pro 12.9\"", w: 1024, h: 1366 },
  ];

  let html = `<div class="section-title">Visão Mobile</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;">`;
  devices.forEach((d) => {
    html += `<button class="btn device-btn" style="text-align:left;padding:8px 10px;font-size:10px;" data-w="${d.w}" data-h="${d.h}">${d.name}<br><span style="color:#444;font-size:9px;">${d.w}×${d.h}</span></button>`;
  });
  html += `</div><button class="btn btn-full" id="btn-reset-viewport" style="margin-top:8px;">Voltar para Desktop</button>`;
  panel.innerHTML = html;

  panel.querySelectorAll(".device-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      chrome.tabs.sendMessage(activeTabId, { type: "MOBILE_VIEW", width: parseInt(btn.dataset.w), height: parseInt(btn.dataset.h) });
      panel.querySelectorAll(".device-btn").forEach((b) => b.classList.remove("active-toggle"));
      btn.classList.add("active-toggle");
    });
  });

  document.getElementById("btn-reset-viewport").addEventListener("click", () => {
    chrome.tabs.sendMessage(activeTabId, { type: "RESET_MOBILE_VIEW" });
    panel.querySelectorAll(".device-btn").forEach((b) => b.classList.remove("active-toggle"));
  });
}

function showBtnSuccess(btn) {
  const original = btn.textContent;
  btn.textContent = "✓ Feito!";
  btn.classList.add("success");
  setTimeout(() => { btn.textContent = original; btn.classList.remove("success"); }, 1500);
}

// ─── Outline Elementos ───────────────────────────────────────────────────────
function loadOutlinePanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Outline Elementos</div>
    <p class="empty">Mostra bordas coloridas em todos os elementos separados por tipo (div, p, img, a, button…).</p>
    <div style="display:flex;flex-direction:column;gap:6px;margin-top:8px;font-size:10px;color:#555;">
      <span>🟣 div/section/article</span>
      <span>🟡 p/span/li/td</span>
      <span>🟠 img/video/canvas</span>
      <span>🟢 header/footer/nav/main</span>
      <span>🔴 a (links)</span>
      <span>🟤 button/input/form</span>
      <span>🔵 h1–h6</span>
    </div>
    <button class="btn btn-full" id="btn-toggle-outline" style="margin-top:10px;">Ativar Outline</button>
  `;
  let active = false;
  const btn = document.getElementById("btn-toggle-outline");
  btn.addEventListener("click", () => {
    active = !active;
    chrome.tabs.sendMessage(activeTabId, { type: "TOGGLE_OUTLINE", on: active });
    btn.textContent = active ? "Desativar Outline" : "Ativar Outline";
    btn.classList.toggle("active-toggle", active);
  });
}

// ─── Grid Overlay ─────────────────────────────────────────────────────────────
function loadGridPanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Grid Overlay</div>
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
      <label style="color:#aaa;font-size:11px;flex:1;">Colunas</label>
      <input type="number" id="grid-cols" value="12" min="1" max="24"
        style="width:56px;padding:4px 8px;background:#080808;border:1px solid #1a1a1a;border-radius:6px;color:#fff;font-size:11px;text-align:center;">
    </div>
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
      <label style="color:#aaa;font-size:11px;flex:1;">Cor das colunas</label>
      <input type="color" id="grid-color" value="#6366f1"
        style="width:36px;height:28px;border:none;border-radius:4px;cursor:pointer;background:none;">
    </div>
    <button class="btn btn-full" id="btn-toggle-grid">Ativar Grid</button>
  `;
  let active = false;
  const btn = document.getElementById("btn-toggle-grid");
  function sendGrid() {
    chrome.tabs.sendMessage(activeTabId, {
      type: "TOGGLE_GRID",
      on: active,
      cols: parseInt(document.getElementById("grid-cols").value) || 12,
      color: document.getElementById("grid-color").value,
    });
  }
  btn.addEventListener("click", () => {
    active = !active;
    btn.textContent = active ? "Desativar Grid" : "Ativar Grid";
    btn.classList.toggle("active-toggle", active);
    sendGrid();
  });
  document.getElementById("grid-cols").addEventListener("change", () => { if (active) sendGrid(); });
  document.getElementById("grid-color").addEventListener("input", () => { if (active) sendGrid(); });
}

// ─── Régua ────────────────────────────────────────────────────────────────────
function loadRulerPanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Régua</div>
    <p class="empty">Clique em dois pontos na página para medir a distância em pixels.</p>
    <button class="btn btn-full" id="btn-activate-ruler">Ativar Régua</button>
  `;
  document.getElementById("btn-activate-ruler").addEventListener("click", () => {
    chrome.tabs.sendMessage(activeTabId, { type: "ACTIVATE_RULER" });
    window.close();
  });
}

// ─── Contraste WCAG ───────────────────────────────────────────────────────────
function calcContrastRatio(hex1, hex2) {
  function luminance(hex) {
    const { r, g, b } = hexToRgb(hex);
    return [r, g, b].reduce((sum, c, i) => {
      const s = c / 255;
      const v = s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      return sum + v * [0.2126, 0.7152, 0.0722][i];
    }, 0);
  }
  const l1 = luminance(hex1), l2 = luminance(hex2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function loadContrastPanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Contraste WCAG</div>
    <div style="display:flex;gap:10px;margin-bottom:10px;">
      <div style="flex:1;">
        <label style="display:block;color:#aaa;font-size:10px;margin-bottom:4px;">Texto</label>
        <input type="color" id="contrast-fg" value="#ffffff"
          style="width:100%;height:36px;border:1px solid #1a1a1a;border-radius:6px;cursor:pointer;background:none;">
      </div>
      <div style="flex:1;">
        <label style="display:block;color:#aaa;font-size:10px;margin-bottom:4px;">Fundo</label>
        <input type="color" id="contrast-bg" value="#000000"
          style="width:100%;height:36px;border:1px solid #1a1a1a;border-radius:6px;cursor:pointer;background:none;">
      </div>
    </div>
    <div id="contrast-result" style="text-align:center;padding:12px;background:#080808;border:1px solid #1a1a1a;border-radius:8px;"></div>
  `;
  function update() {
    const fg = document.getElementById("contrast-fg").value;
    const bg = document.getElementById("contrast-bg").value;
    const ratio = calcContrastRatio(fg, bg);
    const r = ratio.toFixed(2);
    const aa = ratio >= 4.5, aaa = ratio >= 7;
    document.getElementById("contrast-result").innerHTML = `
      <div style="font-size:28px;font-weight:700;color:${aaa ? "#4ade80" : aa ? "#facc15" : "#f87171"};">${r}:1</div>
      <div style="font-size:10px;color:#666;margin-top:4px;">
        AA Normal ${aa ? "✅" : "❌"} &nbsp; AA Large ${ratio >= 3 ? "✅" : "❌"} &nbsp; AAA ${aaa ? "✅" : "❌"}
      </div>
      <div style="margin-top:8px;padding:6px 10px;border-radius:6px;background:${bg};color:${fg};font-size:12px;font-weight:500;border:1px solid #333;">Exemplo de texto</div>
    `;
  }
  document.getElementById("contrast-fg").addEventListener("input", update);
  document.getElementById("contrast-bg").addEventListener("input", update);
  update();
}

// ─── Editar Textos ────────────────────────────────────────────────────────────
function loadEditTextPanel(panel) {
  chrome.storage.local.get(["revoltz_edittext_edits", "revoltz_edittext_persist"], data => {
    const saved = data.revoltz_edittext_edits || null;
    const hasSaved = !!(saved && saved.length);
    const persistOn = !!data.revoltz_edittext_persist;

    panel.innerHTML = `
      <div class="section-title">Editar Textos</div>
      <p class="empty" style="padding:0 0 14px;">Todo texto da página fica editável. Clique e digite. ESC para sair.</p>
      <button class="btn btn-full" id="btn-toggle-edittext">Ativar Edição</button>
      <div class="setting-item" style="margin-top:12px;">
        <div class="setting-info">
          <div class="setting-name">Manter após recarregar</div>
          <div class="setting-desc">Restaura as edições automaticamente ao abrir a página</div>
        </div>
        <label class="toggle">
          <input type="checkbox" id="edittext-persist-chk"${persistOn ? " checked" : ""}>
          <div class="slider"></div>
        </label>
      </div>
      <button class="btn btn-full" id="btn-clear-edittext"
        style="margin-top:8px;background:#0e0202;border-color:#3a1a1a;color:#f66;${hasSaved ? "" : "opacity:0.3;pointer-events:none;"}"
      >🗑 Limpar Edições Salvas</button>
    `;

    let active = false;
    const btn = document.getElementById("btn-toggle-edittext");
    const chk = document.getElementById("edittext-persist-chk");
    const clearBtn = document.getElementById("btn-clear-edittext");

    btn.addEventListener("click", () => {
      active = !active;
      const restore = (active && chk.checked && saved) ? saved : null;
      chrome.tabs.sendMessage(activeTabId, { type: "TOGGLE_EDIT_TEXT", on: active, persist: chk.checked, restore });
      btn.textContent = active ? "Desativar Edição" : "Ativar Edição";
      btn.classList.toggle("active-toggle", active);
    });

    chk.addEventListener("change", () => {
      if (chk.checked) {
        chrome.storage.local.set({ revoltz_edittext_persist: true });
      } else {
        chrome.storage.local.remove("revoltz_edittext_persist");
      }
      if (active) chrome.tabs.sendMessage(activeTabId, { type: "EDITTEXT_SET_PERSIST", persist: chk.checked });
    });

    clearBtn.addEventListener("click", () => {
      chrome.storage.local.remove(["revoltz_edittext_edits", "revoltz_edittext_persist"]);
      clearBtn.style.opacity = "0.3";
      clearBtn.style.pointerEvents = "none";
      chk.checked = false;
      if (active) {
        active = false;
        chrome.tabs.sendMessage(activeTabId, { type: "TOGGLE_EDIT_TEXT", on: false });
        btn.textContent = "Ativar Edição";
        btn.classList.remove("active-toggle");
      }
    });
  });
}

// ─── Remover Elemento ─────────────────────────────────────────────────────────
function loadDeleteElemPanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Remover Elemento</div>
    <p class="empty">Passe o mouse sobre um elemento e clique para removê-lo da página.</p>
    <button class="btn btn-full" id="btn-activate-delete">Ativar Modo Remoção</button>
  `;
  document.getElementById("btn-activate-delete").addEventListener("click", () => {
    chrome.tabs.sendMessage(activeTabId, { type: "ACTIVATE_DELETE_ELEM" });
    window.close();
  });
}

// ─── Meta Tags ────────────────────────────────────────────────────────────────
function loadMetaTagsPanel(panel) {
  panel.innerHTML = '<p class="empty">Carregando meta tags…</p>';
  chrome.tabs.sendMessage(activeTabId, { type: "GET_META_TAGS" }, (response) => {
    if (chrome.runtime.lastError || !response) {
      panel.innerHTML = '<p class="empty">Não foi possível ler esta página.</p>';
      return;
    }
    const tags = response.tags || [];
    if (!tags.length) {
      panel.innerHTML = '<div class="section-title">Meta Tags</div><p class="empty">Nenhuma meta tag encontrada.</p>';
      return;
    }
    let html = `<div class="section-title">Meta Tags (${tags.length})</div><ul class="item-list">`;
    tags.forEach((t) => {
      const key = t.name || t.property || t.httpEquiv || "(sem nome)";
      const val = t.content || "(vazio)";
      html += `<li class="item-card" style="flex-direction:column;align-items:flex-start;gap:2px;">
        <span style="font-size:10px;color:#666;font-weight:600;">${key}</span>
        <span class="url" style="word-break:break-all;">${val}</span>
      </li>`;
    });
    html += "</ul>";
    panel.innerHTML = html;
  });
}

// ─── Links Externos ───────────────────────────────────────────────────────────
function loadExtLinksPanel(panel) {
  panel.innerHTML = '<p class="empty">Carregando links externos…</p>';
  chrome.tabs.sendMessage(activeTabId, { type: "GET_EXT_LINKS" }, (response) => {
    if (chrome.runtime.lastError || !response) {
      panel.innerHTML = '<p class="empty">Não foi possível ler esta página.</p>';
      return;
    }
    const links = response.links || [];
    if (!links.length) {
      panel.innerHTML = '<div class="section-title">Links Externos</div><p class="empty">Nenhum link externo encontrado.</p>';
      return;
    }
    panel.innerHTML = `<div class="section-title">Links Externos (${links.length})</div>`;
    const ul = document.createElement("ul");
    ul.className = "item-list";
    links.forEach((url) => {
      const li = document.createElement("li");
      li.className = "item-card";
      const span = document.createElement("span");
      span.className = "url";
      span.textContent = url;
      const btn = document.createElement("button");
      btn.className = "btn";
      btn.textContent = "Copiar";
      btn.addEventListener("click", () => {
        navigator.clipboard.writeText(url).then(() => {
          btn.textContent = "Copiado!";
          btn.classList.add("success");
          setTimeout(() => { btn.textContent = "Copiar"; btn.classList.remove("success"); }, 1500);
        });
      });
      li.appendChild(span);
      li.appendChild(btn);
      ul.appendChild(li);
    });
    panel.appendChild(ul);
  });
}

// ─── Imagens sem Alt ──────────────────────────────────────────────────────────
function loadNoAltPanel(panel) {
  panel.innerHTML = '<p class="empty">Carregando imagens…</p>';
  chrome.tabs.sendMessage(activeTabId, { type: "GET_NO_ALT_IMGS" }, (response) => {
    if (chrome.runtime.lastError || !response) {
      panel.innerHTML = '<p class="empty">Não foi possível ler esta página.</p>';
      return;
    }
    const count = response.count || 0;
    let html = `<div class="section-title">Imagens sem Alt</div>`;
    if (!count) {
      html += '<p class="empty" style="color:#4ade80;">✅ Todas as imagens têm alt!</p>';
    } else {
      html += `<p class="empty">Encontradas <strong style="color:#f87171;">${count}</strong> imagem(ns) sem atributo alt.</p>`;
    }
    html += `<button class="btn btn-full" id="btn-toggle-noalt">Destacar na Página</button>`;
    panel.innerHTML = html;
    let active = false;
    const btn = document.getElementById("btn-toggle-noalt");
    btn.addEventListener("click", () => {
      active = !active;
      chrome.tabs.sendMessage(activeTabId, { type: "TOGGLE_NO_ALT", on: active });
      btn.textContent = active ? "Remover Destaque" : "Destacar na Página";
      btn.classList.toggle("active-toggle", active);
    });
  });
}

// ─── Limpar Storage ───────────────────────────────────────────────────────────
function loadClearStoragePanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Limpar Storage</div>
    <p class="empty">Apague dados armazenados pelo site. Isso pode deslogar você.</p>
    <div style="display:flex;flex-direction:column;gap:6px;">
      <button class="btn btn-full" id="btn-clear-local">🗂 Local Storage</button>
      <button class="btn btn-full" id="btn-clear-session">💾 Session Storage</button>
      <button class="btn btn-full" id="btn-clear-cookies">🍪 Cookies</button>
      <button class="btn btn-full" id="btn-clear-all" style="margin-top:4px;border-color:#f87171;color:#f87171;">⚠️ Limpar Tudo</button>
    </div>
  `;
  ["local", "session", "cookies", "all"].forEach((t) => {
    document.getElementById(`btn-clear-${t}`).addEventListener("click", () => {
      chrome.tabs.sendMessage(activeTabId, { type: "CLEAR_STORAGE", target: t }, () => {
        showBtnSuccess(document.getElementById(`btn-clear-${t}`));
      });
    });
  });
}

// ─── Imagem ↔ Base64 ─────────────────────────────────────────────────────────
function loadBase64ImgPanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Imagem ↔ Base64</div>
    <div style="margin-bottom:14px;">
      <div style="font-size:11px;color:#666;margin-bottom:6px;font-weight:600;">🌐 URL → Base64</div>
      <input type="text" id="b64-url-input" placeholder="https://exemplo.com/img.png"
        style="width:100%;padding:8px 10px;background:#080808;border:1px solid #1a1a1a;border-radius:6px;color:#fff;font-size:11px;outline:none;font-family:monospace;">
      <button class="btn btn-full" id="btn-url-to-b64" style="margin-top:6px;">Converter para Base64</button>
      <div id="b64-url-result" style="margin-top:6px;"></div>
    </div>
    <div style="border-top:1px solid #111;padding-top:12px;margin-bottom:14px;">
      <div style="font-size:11px;color:#666;margin-bottom:6px;font-weight:600;">🔢 Base64 → Imagem</div>
      <textarea id="b64-data-input" placeholder="data:image/png;base64,... ou só a string base64"
        style="width:100%;padding:8px 10px;background:#080808;border:1px solid #1a1a1a;border-radius:6px;color:#fff;font-size:10px;outline:none;font-family:monospace;resize:vertical;min-height:62px;"></textarea>
      <div style="display:flex;gap:6px;margin-top:6px;">
        <button class="btn" id="btn-b64-preview" style="flex:1;">👁 Preview</button>
        <button class="btn" id="btn-b64-download" style="flex:1;">⬇ Baixar PNG</button>
      </div>
      <div id="b64-data-result" style="margin-top:8px;text-align:center;"></div>
    </div>
    <div style="border-top:1px solid #111;padding-top:12px;">
      <div style="font-size:11px;color:#666;margin-bottom:6px;font-weight:600;">📝 Texto ↔ Base64</div>
      <textarea id="b64-text-input" placeholder="Digite ou cole o texto / base64 aqui…"
        style="width:100%;padding:8px 10px;background:#080808;border:1px solid #1a1a1a;border-radius:6px;color:#fff;font-size:10px;outline:none;font-family:monospace;resize:vertical;min-height:50px;"></textarea>
      <div style="display:flex;gap:6px;margin-top:6px;">
        <button class="btn" id="btn-b64-encode" style="flex:1;">Encode</button>
        <button class="btn" id="btn-b64-decode" style="flex:1;">Decode</button>
      </div>
      <div id="b64-text-result" style="margin-top:8px;"></div>
    </div>
  `;

  document.getElementById("btn-url-to-b64").addEventListener("click", () => {
    const url = document.getElementById("b64-url-input").value.trim();
    const resultEl = document.getElementById("b64-url-result");
    if (!url) { resultEl.innerHTML = '<span style="color:#f87171;font-size:10px;">Cole uma URL válida.</span>'; return; }
    resultEl.innerHTML = '<span style="font-size:10px;color:#555;">Buscando…</span>';
    chrome.runtime.sendMessage({ type: "FETCH_IMAGE_AS_DATAURI", url }, (resp) => {
      if (resp?.dataUri) {
        const preview = resp.dataUri.slice(0, 72) + "…";
        resultEl.innerHTML = `
          <div style="background:#080808;border:1px solid #1a1a1a;border-radius:6px;padding:8px 10px;">
            <div style="font-family:monospace;font-size:9px;color:#444;word-break:break-all;margin-bottom:6px;">${preview}</div>
            <button class="btn btn-full" id="btn-copy-b64">Copiar Base64</button>
          </div>`;
        document.getElementById("btn-copy-b64").addEventListener("click", () => {
          navigator.clipboard.writeText(resp.dataUri);
          showBtnSuccess(document.getElementById("btn-copy-b64"));
        });
      } else {
        resultEl.innerHTML = '<span style="color:#f87171;font-size:10px;">Erro ao buscar. Verifique a URL.</span>';
      }
    });
  });

  document.getElementById("btn-b64-preview").addEventListener("click", () => {
    let src = document.getElementById("b64-data-input").value.trim();
    const resultEl = document.getElementById("b64-data-result");
    if (!src) { resultEl.innerHTML = '<span style="color:#f87171;font-size:10px;">Cole um base64 válido.</span>'; return; }
    if (!src.startsWith("data:")) src = "data:image/png;base64," + src;
    resultEl.innerHTML = `<img src="${src}" style="max-width:100%;max-height:110px;border-radius:6px;border:1px solid #1a1a1a;" onerror="this.parentNode.innerHTML='<span style=color:#f87171;font-size:10px>Base64 inválido.</span>'">`;
  });

  document.getElementById("btn-b64-download").addEventListener("click", () => {
    let src = document.getElementById("b64-data-input").value.trim();
    const resultEl = document.getElementById("b64-data-result");
    if (!src) { resultEl.innerHTML = '<span style="color:#f87171;font-size:10px;">Cole um base64 válido.</span>'; return; }
    if (!src.startsWith("data:")) src = "data:image/png;base64," + src;
    outputImage(src, `imagem-base64-${Date.now()}.png`);
    resultEl.innerHTML = '<span style="color:#4ade80;font-size:10px;">✓ Pronto!</span>';
  });

  document.getElementById("btn-b64-encode").addEventListener("click", () => {
    const input = document.getElementById("b64-text-input").value;
    const resultEl = document.getElementById("b64-text-result");
    if (!input) { resultEl.innerHTML = '<span style="color:#f87171;font-size:10px;">Digite um texto.</span>'; return; }
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)));
      resultEl.innerHTML = `
        <div style="background:#080808;border:1px solid #1a1a1a;border-radius:6px;padding:8px 10px;">
          <pre style="font-family:monospace;font-size:10px;color:#7aa;word-break:break-all;white-space:pre-wrap;margin:0;">${escapeHtml(encoded)}</pre>
        </div>
        <button class="btn btn-full" id="btn-copy-b64-text" style="margin-top:6px;">Copiar</button>`;
      document.getElementById("btn-copy-b64-text").addEventListener("click", () => {
        navigator.clipboard.writeText(encoded);
        showBtnSuccess(document.getElementById("btn-copy-b64-text"));
      });
    } catch(e) { resultEl.innerHTML = `<span style="color:#f87171;font-size:10px;">Erro: ${e.message}</span>`; }
  });

  document.getElementById("btn-b64-decode").addEventListener("click", () => {
    const input = document.getElementById("b64-text-input").value;
    const resultEl = document.getElementById("b64-text-result");
    if (!input) { resultEl.innerHTML = '<span style="color:#f87171;font-size:10px;">Cole um base64.</span>'; return; }
    try {
      const decoded = decodeURIComponent(escape(atob(input)));
      resultEl.innerHTML = `
        <div style="background:#080808;border:1px solid #1a1a1a;border-radius:6px;padding:8px 10px;">
          <pre style="font-family:monospace;font-size:10px;color:#7aa;word-break:break-all;white-space:pre-wrap;margin:0;">${escapeHtml(decoded)}</pre>
        </div>
        <button class="btn btn-full" id="btn-copy-b64-decoded" style="margin-top:6px;">Copiar</button>`;
      document.getElementById("btn-copy-b64-decoded").addEventListener("click", () => {
        navigator.clipboard.writeText(decoded);
        showBtnSuccess(document.getElementById("btn-copy-b64-decoded"));
      });
    } catch(e) { resultEl.innerHTML = `<span style="color:#f87171;font-size:10px;">Base64 inválido.</span>`; }
  });
}

// ─── Capturar Print ───────────────────────────────────────────────────────────
function loadScreenshotPanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Capturar Print</div>
    <p class="empty">Capture a área visível, a página inteira ou um elemento específico.</p>
    <div style="display:flex;gap:6px;margin-bottom:6px;">
      <button class="btn" id="btn-screenshot-visible" style="flex:1;">📷 Área Visível</button>
      <button class="btn" id="btn-screenshot-full" style="flex:1;">📜 Página Inteira</button>
    </div>
    <button class="btn btn-full" id="btn-activate-capelem">✂️ Capturar Elemento</button>
    <div id="screenshot-progress" style="margin-top:8px;display:none;">
      <div style="height:4px;background:#1a1a1a;border-radius:2px;overflow:hidden;">
        <div id="screenshot-progress-bar" style="height:100%;background:#4ade80;width:0%;transition:width 0.3s;border-radius:2px;"></div>
      </div>
    </div>
    <div id="screenshot-status" style="margin-top:8px;font-size:11px;color:#666;text-align:center;"></div>
  `;

  let fpProgressListener = null;

  document.getElementById("btn-screenshot-visible").addEventListener("click", () => {
    const status = document.getElementById("screenshot-status");
    status.textContent = "Capturando…";
    chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
      if (chrome.runtime.lastError || !dataUrl) {
        status.textContent = "Erro ao capturar.";
        return;
      }
      outputImage(dataUrl, `screenshot-${Date.now()}.png`);
      status.textContent = "✓ Pronto!";
    });
  });

  document.getElementById("btn-screenshot-full").addEventListener("click", () => {
    const status = document.getElementById("screenshot-status");
    const progressWrap = document.getElementById("screenshot-progress");
    const progressBar = document.getElementById("screenshot-progress-bar");
    status.textContent = "Preparando captura…";
    progressWrap.style.display = "block";
    progressBar.style.width = "0%";
    const btns = panel.querySelectorAll("button");
    btns.forEach((b) => { b.disabled = true; });

    if (fpProgressListener) chrome.runtime.onMessage.removeListener(fpProgressListener);
    fpProgressListener = (msg) => {
      if (msg.type === "FP_PROGRESS") {
        const pct = msg.total > 0 ? Math.round((msg.step / msg.total) * 100) : 0;
        progressBar.style.width = pct + "%";
        status.textContent = `Capturando… ${msg.step}/${msg.total}`;
      }
    };
    chrome.runtime.onMessage.addListener(fpProgressListener);

    chrome.tabs.sendMessage(activeTabId, { type: "CAPTURE_FULL_PAGE" }, (response) => {
      if (fpProgressListener) {
        chrome.runtime.onMessage.removeListener(fpProgressListener);
        fpProgressListener = null;
      }
      btns.forEach((b) => { b.disabled = false; });
      progressBar.style.width = "100%";
      if (chrome.runtime.lastError || !response?.dataUrl) {
        status.textContent = "Erro ao capturar.";
        progressWrap.style.display = "none";
        return;
      }
      outputImage(response.dataUrl, `pagina-inteira-${Date.now()}.png`);
      status.textContent = "✓ Pronto!";
      setTimeout(() => { progressWrap.style.display = "none"; }, 2000);
    });
  });

  document.getElementById("btn-activate-capelem").addEventListener("click", () => {
    chrome.tabs.sendMessage(activeTabId, { type: "ACTIVATE_CAPTURE_ELEM" });
    window.close();
  });
}

// ─── Inspecionar Requisições ─────────────────────────────────────────────────
function loadRequestsPanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Inspecionar Requisições</div>
    <p class="empty">Recursos carregados pela página atual.</p>
    <div id="req-filter" style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:8px;"></div>
    <div id="req-list" style="font-size:11px;"></div>
  `;
  chrome.tabs.sendMessage(activeTabId, { type: "GET_REQUESTS" }, (res) => {
    if (chrome.runtime.lastError || !res) return;
    const entries = res.entries;
    const types = ["todos", ...new Set(entries.map(e => e.type))];
    let filter = "todos";
    function render() {
      const filterDiv = document.getElementById("req-filter");
      const listDiv = document.getElementById("req-list");
      if (!filterDiv || !listDiv) return;
      filterDiv.innerHTML = types.map(t =>
        `<button class="btn${t === filter ? " active-toggle" : ""}" data-t="${t}" style="padding:3px 8px;font-size:10px;">${t}</button>`
      ).join("");
      filterDiv.querySelectorAll("button").forEach(b => {
        b.addEventListener("click", () => { filter = b.dataset.t; render(); });
      });
      const shown = filter === "todos" ? entries : entries.filter(e => e.type === filter);
      if (!shown.length) { listDiv.innerHTML = `<p class="empty">Nenhuma requisição.</p>`; return; }
      listDiv.innerHTML = shown.map(e => {
        const path = (() => { try { const u = new URL(e.name); return u.pathname.slice(0,50); } catch { return e.name.slice(0,50); } })();
        const host = (() => { try { return new URL(e.name).hostname; } catch { return ""; } })();
        const sizeStr = e.size > 1024 ? `${(e.size/1024).toFixed(1)}kb` : e.size > 0 ? `${e.size}b` : "";
        return `<div style="display:flex;align-items:center;gap:6px;padding:5px 0;border-bottom:1px solid #0e0e0e;">
          <span style="background:#111;border:1px solid #222;border-radius:3px;font-size:9px;padding:1px 5px;color:#aaa;flex-shrink:0;min-width:36px;text-align:center;">${e.type}</span>
          <span style="flex:1;min-width:0;overflow:hidden;">
            <div style="color:#ccc;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${path}</div>
            <div style="color:#444;font-size:9px;">${host}</div>
          </span>
          <span style="color:#666;font-size:10px;flex-shrink:0;text-align:right;line-height:1.5;">${e.duration}ms${sizeStr ? `<br><span style="color:#555">${sizeStr}</span>` : ""}</span>
        </div>`;
      }).join("");
    }
    render();
  });
}

// ─── Page Speed Info ──────────────────────────────────────────────────────────
function loadPageSpeedPanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Page Speed</div>
    <p class="empty">Métricas de carregamento da aba atual.</p>
    <div id="speed-result"></div>
  `;
  chrome.tabs.sendMessage(activeTabId, { type: "GET_PAGE_SPEED" }, (res) => {
    const el = document.getElementById("speed-result");
    if (!el) return;
    if (chrome.runtime.lastError || !res) {
      el.innerHTML = `<p class="empty" style="color:#c55;">Não foi possível obter os dados.</p>`;
      return;
    }
    function col(val, warn, bad) { return val >= bad ? "#e55" : val >= warn ? "#fa0" : "#5a5"; }
    const rows = [
      { label: "TTFB",              val: `${res.ttfb}ms`,      c: col(res.ttfb, 600, 1800) },
      { label: "DOM Pronto",         val: `${res.domReady}ms`,  c: col(res.domReady, 1500, 3500) },
      { label: "Carregamento Total", val: `${res.loadTime}ms`,  c: col(res.loadTime, 2500, 5000) },
      { label: "Recursos",           val: `${res.resources}`,   c: "#aaa" },
      ...(res.transferSize != null ? [{ label: "Transferência", val: `${res.transferSize}kb`, c: "#aaa" }] : []),
    ];
    el.innerHTML = rows.map(r =>
      `<div style="display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid #0e0e0e;">
        <span style="font-size:12px;color:#888;">${r.label}</span>
        <span style="font-size:15px;font-weight:700;color:${r.c};">${r.val}</span>
      </div>`
    ).join("");
  });
}

// ─── Contagem de Elementos ────────────────────────────────────────────────────
function loadElemCountPanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Contagem de Elementos</div>
    <p class="empty">Quantidade de cada tipo de tag no DOM.</p>
    <div id="elemcount-result"></div>
  `;
  chrome.tabs.sendMessage(activeTabId, { type: "GET_ELEM_COUNT" }, (res) => {
    const el = document.getElementById("elemcount-result");
    if (!el) return;
    if (chrome.runtime.lastError || !res) {
      el.innerHTML = `<p class="empty" style="color:#c55;">Erro ao contar elementos.</p>`;
      return;
    }
    const { _total, ...tags } = res.counts;
    const sorted = Object.entries(tags).sort((a, b) => b[1] - a[1]);
    el.innerHTML = `
      <div style="text-align:center;padding:10px 0 8px;">
        <span style="font-size:28px;font-weight:700;">${_total.toLocaleString()}</span><br>
        <span style="font-size:10px;color:#555;">elementos totais</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px;">
        ${sorted.map(([tag, count]) =>
          `<div style="background:#080808;border:1px solid #141414;border-radius:6px;padding:6px 4px;text-align:center;">
            <div style="font-family:monospace;font-size:11px;color:#7aa;">&lt;${tag}&gt;</div>
            <div style="font-size:14px;font-weight:700;margin-top:3px;">${count}</div>
          </div>`
        ).join("")}
      </div>`;
  });
}

// ─── Headings ─────────────────────────────────────────────────────────────────
function loadHeadingsPanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Headings</div>
    <p class="empty">Hierarquia de títulos H1–H6 da página.</p>
    <div id="headings-result"></div>
  `;
  chrome.tabs.sendMessage(activeTabId, { type: "GET_HEADINGS" }, (res) => {
    const el = document.getElementById("headings-result");
    if (!el) return;
    if (chrome.runtime.lastError || !res) {
      el.innerHTML = `<p class="empty" style="color:#c55;">Erro ao obter headings.</p>`;
      return;
    }
    if (!res.headings.length) { el.innerHTML = `<p class="empty">Nenhum heading encontrado.</p>`; return; }
    el.innerHTML = res.headings.map(h =>
      `<div style="display:flex;align-items:baseline;gap:8px;padding:5px 0;border-bottom:1px solid #0a0a0a;padding-left:${(h.level-1)*14}px;">
        <span style="background:#111;border:1px solid #222;border-radius:3px;font-size:9px;padding:1px 5px;color:#7aa;flex-shrink:0;font-family:monospace;">H${h.level}</span>
        <span style="font-size:11px;color:#ccc;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${h.text.replace(/"/g,'&quot;')}">${h.text || "(vazio)"}</span>
      </div>`
    ).join("");
  });
}

// ─── Storage Viewer ───────────────────────────────────────────────────────────
function loadStorageViewerPanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Storage Viewer</div>
    <div style="display:flex;gap:4px;margin-bottom:8px;">
      <button class="btn active-toggle" id="sv-tab-local" style="flex:1;padding:5px;font-size:10px;">localStorage</button>
      <button class="btn" id="sv-tab-session" style="flex:1;padding:5px;font-size:10px;">sessionStorage</button>
    </div>
    <div id="sv-list"></div>
  `;
  let activeTab = "local";
  function renderStorage(data) {
    const list = document.getElementById("sv-list");
    if (!list) return;
    const items = activeTab === "local" ? data.local : data.session;
    if (!items.length) { list.innerHTML = `<p class="empty">${activeTab === "local" ? "localStorage" : "sessionStorage"} vazio.</p>`; return; }
    list.innerHTML = items.map(item =>
      `<div style="background:#080808;border:1px solid #141414;border-radius:6px;padding:8px 10px;margin-bottom:5px;">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
          <span style="font-family:monospace;font-size:10px;color:#7aa;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${item.key}</span>
          <button class="btn sv-del" data-key="${item.key}" data-type="${activeTab}" style="padding:2px 7px;font-size:9px;color:#f87171;border-color:#2a1a1a;">✕</button>
        </div>
        <div style="font-family:monospace;font-size:10px;color:#555;margin-top:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${String(item.value).slice(0,80)}${item.value.length > 80 ? "…" : ""}</div>
      </div>`
    ).join("");
    list.querySelectorAll(".sv-del").forEach(btn => {
      btn.addEventListener("click", () => {
        chrome.tabs.sendMessage(activeTabId, { type: "DELETE_STORAGE_KEY", key: btn.dataset.key, storageType: btn.dataset.type }, () => loadData());
      });
    });
  }
  function loadData() {
    chrome.tabs.sendMessage(activeTabId, { type: "GET_STORAGE" }, (res) => {
      if (chrome.runtime.lastError || !res) return;
      renderStorage(res);
    });
  }
  document.getElementById("sv-tab-local").addEventListener("click", () => {
    activeTab = "local";
    document.getElementById("sv-tab-local").classList.add("active-toggle");
    document.getElementById("sv-tab-session").classList.remove("active-toggle");
    loadData();
  });
  document.getElementById("sv-tab-session").addEventListener("click", () => {
    activeTab = "session";
    document.getElementById("sv-tab-session").classList.add("active-toggle");
    document.getElementById("sv-tab-local").classList.remove("active-toggle");
    loadData();
  });
  loadData();
}

// ─── CSS Variables ────────────────────────────────────────────────────────────
function loadCssVarsPanel(panel) {
  panel.innerHTML = `<div class="section-title">CSS Variables</div><p class="empty">Carregando…</p>`;
  chrome.tabs.sendMessage(activeTabId, { type: "GET_CSS_VARS" }, (res) => {
    if (chrome.runtime.lastError || !res || !res.vars.length) {
      panel.innerHTML = `<div class="section-title">CSS Variables</div><p class="empty">${!res || chrome.runtime.lastError ? "Não foi possível ler." : "Nenhuma CSS variable encontrada."}</p>`;
      return;
    }
    panel.innerHTML = `
      <div class="section-title">CSS Variables</div>
      <p class="empty" style="padding:4px 0 10px;">${res.vars.length} variáveis encontradas</p>
      <div id="cssvars-list"></div>
    `;
    document.getElementById("cssvars-list").innerHTML = res.vars.map(v => {
      const isColor = /^(#|rgb|hsl)/i.test(v.value.trim());
      const swatch = isColor ? `<div style="width:14px;height:14px;border-radius:3px;background:${v.value.trim()};border:1px solid #333;flex-shrink:0;"></div>` : `<div style="width:14px;"></div>`;
      return `<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid #0a0a0a;">
        ${swatch}
        <div style="flex:1;min-width:0;">
          <div style="font-family:monospace;font-size:10px;color:#7aa;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${v.name}</div>
          <div style="font-family:monospace;font-size:10px;color:#555;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${v.value.trim()}</div>
        </div>
      </div>`;
    }).join("");
  });
}

// ─── Box Model Inspector ──────────────────────────────────────────────────────
function loadBoxModelPanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Box Model Inspector</div>
    <p class="empty">Passe o mouse sobre elementos para ver margin, padding e border.</p>
    <button class="btn btn-full" id="btn-boxmodel">Ativar Box Model</button>
  `;
  document.getElementById("btn-boxmodel").addEventListener("click", () => {
    chrome.tabs.sendMessage(activeTabId, { type: "ACTIVATE_BOX_MODEL" });
    window.close();
  });
}

// ─── Modo Escuro Forçado ──────────────────────────────────────────────────────
function loadDarkModePanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Modo Escuro Forçado</div>
    <p class="empty">Inverte as cores do site para simular dark mode.</p>
    <button class="btn btn-full" id="btn-darkmode">Ativar Modo Escuro</button>
  `;
  let active = false;
  const btn = document.getElementById("btn-darkmode");
  btn.addEventListener("click", () => {
    active = !active;
    chrome.tabs.sendMessage(activeTabId, { type: "TOGGLE_DARK_MODE", on: active });
    btn.textContent = active ? "Desativar Modo Escuro" : "Ativar Modo Escuro";
    btn.classList.toggle("active-toggle", active);
  });
}

// ─── Z-index Map ──────────────────────────────────────────────────────────────
function loadZIndexMapPanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Z-index Map</div>
    <p class="empty">Destaca elementos com z-index definido na página.</p>
    <button class="btn btn-full" id="btn-zindex">Ativar Z-index Map</button>
  `;
  let active = false;
  const btn = document.getElementById("btn-zindex");
  btn.addEventListener("click", () => {
    active = !active;
    chrome.tabs.sendMessage(activeTabId, { type: "TOGGLE_ZINDEX_MAP", on: active });
    btn.textContent = active ? "Desativar Z-index Map" : "Ativar Z-index Map";
    btn.classList.toggle("active-toggle", active);
  });
}

// ─── Robots.txt ───────────────────────────────────────────────────────────────
function loadRobotsTxtPanel(panel) {
  panel.innerHTML = `<div class="section-title">Robots.txt</div><p class="empty">Carregando…</p>`;
  chrome.tabs.sendMessage(activeTabId, { type: "GET_ROBOTS_TXT" }, (res) => {
    if (chrome.runtime.lastError || !res || !res.content) {
      panel.innerHTML = `<div class="section-title">Robots.txt</div><p class="empty" style="color:#c55;">Não foi possível carregar o robots.txt.</p>`;
      return;
    }
    panel.innerHTML = `
      <div class="section-title">Robots.txt</div>
      <div style="background:#080808;border:1px solid #141414;border-radius:8px;padding:10px 12px;max-height:320px;overflow-y:auto;">
        <pre style="font-family:monospace;font-size:10px;color:#aaa;white-space:pre-wrap;word-break:break-all;margin:0;">${res.content.replace(/&/g,"&amp;").replace(/</g,"&lt;")}</pre>
      </div>
    `;
  });
}

// ─── Sitemap ──────────────────────────────────────────────────────────────────
function loadSitemapPanel(panel) {
  panel.innerHTML = `<div class="section-title">Sitemap</div><p class="empty">Tentando encontrar sitemap.xml…</p>`;
  chrome.tabs.sendMessage(activeTabId, { type: "GET_SITEMAP" }, (res) => {
    if (chrome.runtime.lastError || !res || !res.urls) {
      panel.innerHTML = `<div class="section-title">Sitemap</div><p class="empty" style="color:#c55;">Não foi possível encontrar o sitemap.</p>`;
      return;
    }
    panel.innerHTML = `
      <div class="section-title">Sitemap</div>
      <p class="empty" style="padding:4px 0 10px;">${res.urls.length} URLs encontradas</p>
      <div style="max-height:300px;overflow-y:auto;">
        ${res.urls.map(url =>
          `<div style="padding:5px 0;border-bottom:1px solid #0a0a0a;">
            <a href="#" class="sitemap-url" data-url="${url.replace(/"/g,"&quot;")}" style="font-family:monospace;font-size:10px;color:#7aa;text-decoration:none;word-break:break-all;">${url}</a>
          </div>`
        ).join("")}
      </div>
    `;
    panel.querySelectorAll(".sitemap-url").forEach(a => {
      a.addEventListener("click", (e) => { e.preventDefault(); chrome.tabs.create({ url: a.dataset.url }); });
    });
  });
}

// ─── Contar Palavras ──────────────────────────────────────────────────────────
function loadWordCountPanel(panel) {
  panel.innerHTML = `<div class="section-title">Contar Palavras</div><p class="empty">Carregando…</p>`;
  chrome.tabs.sendMessage(activeTabId, { type: "GET_WORD_COUNT" }, (res) => {
    if (chrome.runtime.lastError || !res) {
      panel.innerHTML = `<div class="section-title">Contar Palavras</div><p class="empty" style="color:#c55;">Erro ao contar.</p>`;
      return;
    }
    panel.innerHTML = `
      <div class="section-title">Contar Palavras</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px;">
        ${[
          ["Palavras", res.words.toLocaleString()],
          ["Caracteres", res.chars.toLocaleString()],
          ["Sem espaços", res.charsNoSpace.toLocaleString()],
          ["Parágrafos", res.paragraphs.toLocaleString()],
          ["Frases", res.sentences.toLocaleString()],
          ["Leitura", "~" + res.readTime + "min"],
        ].map(([label, val]) =>
          `<div style="background:#080808;border:1px solid #141414;border-radius:8px;padding:10px;text-align:center;">
            <div style="font-size:20px;font-weight:700;">${val}</div>
            <div style="font-size:9px;color:#555;margin-top:4px;">${label}</div>
          </div>`
        ).join("")}
      </div>
    `;
  });
}

// ─── Ver Código Fonte ─────────────────────────────────────────────────────────
function loadViewSourcePanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Ver Código Fonte</div>
    <p class="empty">Abre o código fonte HTML da página atual em uma nova aba.</p>
    <button class="btn btn-full" id="btn-viewsource">💻 Abrir Código Fonte</button>
  `;
  document.getElementById("btn-viewsource").addEventListener("click", () => {
    chrome.tabs.get(activeTabId, (tab) => { chrome.tabs.create({ url: "view-source:" + tab.url }); });
  });
}

// ─── Traduzir Página ──────────────────────────────────────────────────────────
function loadTranslatePanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Traduzir Página</div>
    <p class="empty">Abre a página atual no Google Translate.</p>
    <div style="margin-bottom:8px;">
      <label style="display:block;color:#aaa;font-size:10px;margin-bottom:4px;">Traduzir para:</label>
      <select id="translate-lang" style="width:100%;background:#080808;border:1px solid #1a1a1a;border-radius:6px;color:#fff;padding:7px 8px;font-size:11px;font-family:inherit;cursor:pointer;">
        <option value="pt">Português</option>
        <option value="en">Inglês</option>
        <option value="es">Espanhol</option>
        <option value="fr">Francês</option>
        <option value="de">Alemão</option>
        <option value="it">Italiano</option>
        <option value="ja">Japonês</option>
        <option value="zh-CN">Chinês</option>
        <option value="ru">Russo</option>
        <option value="ar">Árabe</option>
      </select>
    </div>
    <button class="btn btn-full" id="btn-translate">🌐 Abrir no Google Translate</button>
  `;
  document.getElementById("btn-translate").addEventListener("click", () => {
    const lang = document.getElementById("translate-lang").value;
    chrome.tabs.get(activeTabId, (tab) => {
      chrome.tabs.create({ url: `https://translate.google.com/translate?sl=auto&tl=${lang}&u=${encodeURIComponent(tab.url)}` });
    });
  });
}

// ─── JSON Formatter ───────────────────────────────────────────────────────────
function loadJsonFormatPanel(panel) {
  panel.innerHTML = `
    <div class="section-title">JSON Formatter</div>
    <p class="empty">Formata JSON da página (se for JSON puro) ou cole abaixo.</p>
    <button class="btn btn-full" id="btn-json-detect" style="margin-bottom:8px;">🔍 Detectar JSON na Página</button>
    <textarea id="json-input" placeholder='Cole seu JSON aqui…'
      style="width:100%;min-height:80px;padding:8px 10px;background:#080808;border:1px solid #1a1a1a;border-radius:6px;color:#fff;font-family:monospace;font-size:10px;outline:none;resize:vertical;"></textarea>
    <button class="btn btn-full" id="btn-json-format" style="margin-top:6px;">Formatar JSON</button>
    <div id="json-output" style="margin-top:8px;"></div>
  `;
  document.getElementById("btn-json-detect").addEventListener("click", () => {
    chrome.tabs.sendMessage(activeTabId, { type: "GET_PAGE_JSON" }, (res) => {
      if (chrome.runtime.lastError || !res?.json) {
        document.getElementById("json-output").innerHTML = '<span style="color:#f87171;font-size:10px;">Nenhum JSON detectado na página.</span>';
        return;
      }
      document.getElementById("json-input").value = res.json;
      formatJsonOutput(res.json);
    });
  });
  document.getElementById("btn-json-format").addEventListener("click", () => {
    formatJsonOutput(document.getElementById("json-input").value);
  });
  function formatJsonOutput(raw) {
    const out = document.getElementById("json-output");
    try {
      const parsed = JSON.parse(raw);
      const formatted = JSON.stringify(parsed, null, 2);
      out.innerHTML = `
        <div style="position:relative;">
          <button class="btn" id="btn-json-copy" style="position:absolute;top:6px;right:6px;padding:3px 8px;font-size:9px;">Copiar</button>
          <pre style="background:#080808;border:1px solid #1a1a1a;border-radius:6px;padding:10px;font-size:10px;color:#4ade80;overflow-x:auto;max-height:240px;white-space:pre-wrap;word-break:break-all;margin:0;">${escapeHtml(formatted)}</pre>
        </div>`;
      document.getElementById("btn-json-copy").addEventListener("click", () => {
        navigator.clipboard.writeText(formatted);
        showBtnSuccess(document.getElementById("btn-json-copy"));
      });
    } catch (e) {
      out.innerHTML = `<span style="color:#f87171;font-size:10px;">JSON inválido: ${escapeHtml(e.message)}</span>`;
    }
  }
}
function escapeHtml(str) { return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }

// ─── Disable JS ───────────────────────────────────────────────────────────────
function loadDisableJsPanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Disable JavaScript</div>
    <p class="empty">Remove e bloqueia scripts na página atual.<br>Recarregue para restaurar.</p>
    <button class="btn btn-full" id="btn-disable-js">🚫 Desativar JS</button>
    <button class="btn btn-full" id="btn-restore-js" style="margin-top:6px;">↺ Recarregar Página (restaurar)</button>
  `;
  document.getElementById("btn-disable-js").addEventListener("click", () => {
    chrome.tabs.sendMessage(activeTabId, { type: "DISABLE_JS" }, () => {
      showBtnSuccess(document.getElementById("btn-disable-js"));
    });
  });
  document.getElementById("btn-restore-js").addEventListener("click", () => {
    chrome.tabs.reload(activeTabId);
  });
}

// ─── Disable CSS ──────────────────────────────────────────────────────────────
function loadDisableCssPanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Disable CSS</div>
    <p class="empty">Remove todas as folhas de estilo da página.<br>Recarregue para restaurar.</p>
    <button class="btn btn-full" id="btn-disable-css">🎭 Desativar CSS</button>
    <button class="btn btn-full" id="btn-restore-css" style="margin-top:6px;">↺ Recarregar Página (restaurar)</button>
  `;
  let disabled = false;
  document.getElementById("btn-disable-css").addEventListener("click", () => {
    disabled = !disabled;
    chrome.tabs.sendMessage(activeTabId, { type: "TOGGLE_CSS", on: !disabled });
    const btn = document.getElementById("btn-disable-css");
    btn.textContent = disabled ? "🎭 Reativar CSS" : "🎭 Desativar CSS";
    btn.classList.toggle("active-toggle", disabled);
  });
  document.getElementById("btn-restore-css").addEventListener("click", () => {
    chrome.tabs.reload(activeTabId);
  });
}

// ─── Cookie Editor ────────────────────────────────────────────────────────────
function loadCookieEditorPanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Cookie Editor</div>
    <div style="display:flex;gap:6px;margin-bottom:8px;">
      <button class="btn" id="btn-cookie-refresh" style="flex:1;">↺ Atualizar</button>
      <button class="btn" id="btn-cookie-add" style="flex:1;">+ Novo Cookie</button>
    </div>
    <div id="cookie-list"></div>
    <div id="cookie-form" style="display:none;margin-top:8px;"></div>
  `;
  function loadCookies() {
    chrome.tabs.get(activeTabId, (tab) => {
      chrome.cookies.getAll({ url: tab.url }, (cookies) => {
        const list = document.getElementById("cookie-list");
        if (!list) return;
        if (!cookies || !cookies.length) {
          list.innerHTML = '<p class="empty">Nenhum cookie encontrado.</p>';
          return;
        }
        list.innerHTML = cookies.map((c, i) => `
          <div style="background:#080808;border:1px solid #141414;border-radius:6px;padding:8px 10px;margin-bottom:5px;">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
              <span style="font-family:monospace;font-size:10px;color:#7aa;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(c.name)}</span>
              <button class="btn cookie-del" data-name="${escapeHtml(c.name)}" data-domain="${escapeHtml(c.domain)}" data-path="${escapeHtml(c.path)}" style="padding:2px 7px;font-size:9px;color:#f87171;border-color:#2a1a1a;">✕</button>
            </div>
            <div style="font-family:monospace;font-size:10px;color:#555;margin-top:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${escapeHtml(c.value)}">${escapeHtml(c.value.slice(0,80))}${c.value.length>80?"…":""}</div>
            <div style="font-size:9px;color:#333;margin-top:3px;">${c.domain} · ${c.path} ${c.secure?"· 🔒":""} ${c.httpOnly?"· httpOnly":""}</div>
          </div>
        `).join("");
        list.querySelectorAll(".cookie-del").forEach(btn => {
          btn.addEventListener("click", () => {
            const protocol = btn.dataset.domain.startsWith(".") ? "https://" : "https://";
            const domain = btn.dataset.domain.replace(/^\./, "");
            chrome.cookies.remove({ url: protocol + domain + btn.dataset.path, name: btn.dataset.name }, () => loadCookies());
          });
        });
      });
    });
  }
  document.getElementById("btn-cookie-refresh").addEventListener("click", loadCookies);
  document.getElementById("btn-cookie-add").addEventListener("click", () => {
    const form = document.getElementById("cookie-form");
    form.style.display = "block";
    form.innerHTML = `
      <div style="background:#080808;border:1px solid #1a1a1a;border-radius:8px;padding:10px;">
        <div style="font-size:10px;color:#888;margin-bottom:6px;font-weight:600;">Novo Cookie</div>
        <input id="ck-name" placeholder="Nome" style="width:100%;padding:6px 8px;background:#000;border:1px solid #1a1a1a;border-radius:4px;color:#fff;font-size:10px;margin-bottom:4px;font-family:monospace;">
        <input id="ck-value" placeholder="Valor" style="width:100%;padding:6px 8px;background:#000;border:1px solid #1a1a1a;border-radius:4px;color:#fff;font-size:10px;margin-bottom:6px;font-family:monospace;">
        <button class="btn btn-full" id="btn-cookie-save">Salvar Cookie</button>
      </div>
    `;
    document.getElementById("btn-cookie-save").addEventListener("click", () => {
      const name = document.getElementById("ck-name").value.trim();
      const value = document.getElementById("ck-value").value;
      if (!name) return;
      chrome.tabs.get(activeTabId, (tab) => {
        chrome.cookies.set({ url: tab.url, name, value }, () => {
          form.style.display = "none";
          loadCookies();
        });
      });
    });
  });
  loadCookies();
}

// ─── Console Logger ───────────────────────────────────────────────────────────
function loadConsoleLogPanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Console Logger</div>
    <p class="empty">Captura mensagens do console da página em tempo real.</p>
    <div style="display:flex;gap:6px;margin-bottom:8px;">
      <button class="btn active-toggle" id="btn-console-start">▶ Iniciar Captura</button>
      <button class="btn" id="btn-console-clear">🗑 Limpar</button>
    </div>
    <div id="console-filter" style="display:flex;gap:4px;margin-bottom:6px;">
      <button class="btn active-toggle console-filter-btn" data-f="all" style="padding:3px 8px;font-size:9px;">Todos</button>
      <button class="btn console-filter-btn" data-f="log" style="padding:3px 8px;font-size:9px;">Log</button>
      <button class="btn console-filter-btn" data-f="warn" style="padding:3px 8px;font-size:9px;">Warn</button>
      <button class="btn console-filter-btn" data-f="error" style="padding:3px 8px;font-size:9px;">Error</button>
    </div>
    <div id="console-logs" style="max-height:260px;overflow-y:auto;font-family:monospace;font-size:10px;"></div>
  `;
  let logs = [];
  let capturing = false;
  let filter = "all";
  let pollTimer = null;

  function renderLogs() {
    const el = document.getElementById("console-logs");
    if (!el) return;
    const filtered = filter === "all" ? logs : logs.filter(l => l.level === filter);
    if (!filtered.length) { el.innerHTML = '<p class="empty" style="font-size:10px;">Nenhum log capturado.</p>'; return; }
    el.innerHTML = filtered.map(l => {
      const colors = { log: "#aaa", warn: "#facc15", error: "#f87171", info: "#60a5fa" };
      const color = colors[l.level] || "#aaa";
      return `<div style="padding:4px 6px;border-bottom:1px solid #0a0a0a;color:${color};word-break:break-all;">[${l.level}] ${escapeHtml(l.text)}</div>`;
    }).join("");
    el.scrollTop = el.scrollHeight;
  }

  function startCapture() {
    capturing = true;
    chrome.tabs.sendMessage(activeTabId, { type: "START_CONSOLE_CAPTURE" });
    pollTimer = setInterval(() => {
      chrome.tabs.sendMessage(activeTabId, { type: "GET_CONSOLE_LOGS" }, (res) => {
        if (chrome.runtime.lastError || !res) return;
        if (res.logs && res.logs.length > logs.length) {
          logs = res.logs;
          renderLogs();
        }
      });
    }, 1000);
  }
  function stopCapture() {
    capturing = false;
    clearInterval(pollTimer);
    chrome.tabs.sendMessage(activeTabId, { type: "STOP_CONSOLE_CAPTURE" });
  }

  const startBtn = document.getElementById("btn-console-start");
  startBtn.addEventListener("click", () => {
    if (capturing) { stopCapture(); startBtn.textContent = "▶ Iniciar Captura"; startBtn.classList.remove("active-toggle"); }
    else { startCapture(); startBtn.textContent = "⏸ Parar Captura"; startBtn.classList.add("active-toggle"); }
  });
  document.getElementById("btn-console-clear").addEventListener("click", () => {
    logs = [];
    chrome.tabs.sendMessage(activeTabId, { type: "CLEAR_CONSOLE_LOGS" });
    renderLogs();
  });
  document.querySelectorAll(".console-filter-btn").forEach(b => {
    b.addEventListener("click", () => {
      filter = b.dataset.f;
      document.querySelectorAll(".console-filter-btn").forEach(x => x.classList.remove("active-toggle"));
      b.classList.add("active-toggle");
      renderLogs();
    });
  });
  startCapture();
}

// ─── Lorem Ipsum ──────────────────────────────────────────────────────────────
function loadLoremIpsumPanel(panel) {
  const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const SENTENCES = LOREM.match(/[^.]+\./g).map(s => s.trim());

  panel.innerHTML = `
    <div class="section-title">Lorem Ipsum</div>
    <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px;">
      <label style="font-size:11px;color:#aaa;">Parágrafos</label>
      <input type="number" id="lorem-count" value="3" min="1" max="20"
        style="width:50px;padding:4px 8px;background:#080808;border:1px solid #1a1a1a;border-radius:6px;color:#fff;font-size:11px;text-align:center;">
    </div>
    <button class="btn btn-full" id="btn-lorem-gen">Gerar Texto</button>
    <button class="btn btn-full" id="btn-lorem-inject" style="margin-top:4px;">Injetar no Elemento (clique)</button>
    <div id="lorem-output" style="margin-top:8px;"></div>
  `;
  function gen() {
    const n = Math.max(1, Math.min(20, parseInt(document.getElementById("lorem-count").value) || 3));
    let text = "";
    for (let i = 0; i < n; i++) {
      const count = 3 + Math.floor(Math.random() * 4);
      const shuffled = [...SENTENCES].sort(() => Math.random() - 0.5).slice(0, count);
      if (i === 0) shuffled[0] = SENTENCES[0];
      text += shuffled.join(" ") + "\n\n";
    }
    return text.trim();
  }
  document.getElementById("btn-lorem-gen").addEventListener("click", () => {
    const text = gen();
    const out = document.getElementById("lorem-output");
    out.innerHTML = `
      <div style="background:#080808;border:1px solid #1a1a1a;border-radius:6px;padding:10px;max-height:200px;overflow-y:auto;">
        <pre style="font-size:10px;color:#aaa;white-space:pre-wrap;margin:0;font-family:inherit;">${escapeHtml(text)}</pre>
      </div>
      <button class="btn btn-full" id="btn-lorem-copy" style="margin-top:6px;">Copiar</button>
    `;
    document.getElementById("btn-lorem-copy").addEventListener("click", () => {
      navigator.clipboard.writeText(text);
      showBtnSuccess(document.getElementById("btn-lorem-copy"));
    });
  });
  document.getElementById("btn-lorem-inject").addEventListener("click", () => {
    const text = gen();
    chrome.tabs.sendMessage(activeTabId, { type: "INJECT_LOREM", text });
    window.close();
  });
}

// ─── Open Graph Preview ───────────────────────────────────────────────────────
function loadOgPreviewPanel(panel) {
  panel.innerHTML = `<div class="section-title">Open Graph Preview</div><p class="empty">Carregando meta tags…</p>`;
  chrome.tabs.sendMessage(activeTabId, { type: "GET_OG_DATA" }, (res) => {
    if (chrome.runtime.lastError || !res) {
      panel.innerHTML = '<div class="section-title">Open Graph Preview</div><p class="empty" style="color:#c55;">Não foi possível ler os dados.</p>';
      return;
    }
    const og = res;
    const hasImage = og.image && og.image.startsWith("http");
    panel.innerHTML = `
      <div class="section-title">Open Graph Preview</div>
      <div style="background:#080808;border:1px solid #1a1a1a;border-radius:10px;overflow:hidden;margin-bottom:10px;">
        ${hasImage ? `<img src="${escapeHtml(og.image)}" style="width:100%;max-height:160px;object-fit:cover;display:block;" onerror="this.style.display='none'">` : ""}
        <div style="padding:10px 12px;">
          <div style="font-size:9px;color:#444;text-transform:uppercase;margin-bottom:4px;">${escapeHtml(og.siteName || og.host || "")}</div>
          <div style="font-size:12px;font-weight:700;color:#ccc;margin-bottom:4px;">${escapeHtml(og.title || "(sem título)")}</div>
          <div style="font-size:10px;color:#666;line-height:1.4;">${escapeHtml(og.description || "(sem descrição)")}</div>
        </div>
      </div>
      <div style="font-size:9px;color:#444;margin-top:6px;">
        <div><strong>og:title:</strong> ${escapeHtml(og.title || "–")}</div>
        <div><strong>og:description:</strong> ${escapeHtml(og.description || "–")}</div>
        <div><strong>og:image:</strong> ${escapeHtml(og.image || "–")}</div>
        <div><strong>og:type:</strong> ${escapeHtml(og.type || "–")}</div>
        <div><strong>og:url:</strong> ${escapeHtml(og.url || "–")}</div>
        <div><strong>twitter:card:</strong> ${escapeHtml(og.twitterCard || "–")}</div>
      </div>
    `;
  });
}

// ─── Lazy Load Checker ────────────────────────────────────────────────────────
function loadLazyCheckPanel(panel) {
  panel.innerHTML = '<div class="section-title">Lazy Load Checker</div><p class="empty">Verificando imagens…</p>';
  chrome.tabs.sendMessage(activeTabId, { type: "GET_LAZY_CHECK" }, (res) => {
    if (chrome.runtime.lastError || !res) {
      panel.innerHTML = '<div class="section-title">Lazy Load Checker</div><p class="empty" style="color:#c55;">Erro ao verificar.</p>';
      return;
    }
    const { total, withLazy, withoutLazy } = res;
    const pct = total > 0 ? Math.round((withLazy / total) * 100) : 100;
    const color = pct >= 80 ? "#4ade80" : pct >= 50 ? "#facc15" : "#f87171";
    panel.innerHTML = `
      <div class="section-title">Lazy Load Checker</div>
      <div style="text-align:center;padding:10px 0;">
        <div style="font-size:32px;font-weight:700;color:${color};">${pct}%</div>
        <div style="font-size:10px;color:#555;margin-top:4px;">das imagens usam loading="lazy"</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px;">
        <div style="background:#080808;border:1px solid #141414;border-radius:6px;padding:8px;text-align:center;">
          <div style="font-size:18px;font-weight:700;">${total}</div><div style="font-size:9px;color:#555;">Total</div>
        </div>
        <div style="background:#080808;border:1px solid #141414;border-radius:6px;padding:8px;text-align:center;">
          <div style="font-size:18px;font-weight:700;color:#4ade80;">${withLazy}</div><div style="font-size:9px;color:#555;">Com lazy</div>
        </div>
        <div style="background:#080808;border:1px solid #141414;border-radius:6px;padding:8px;text-align:center;">
          <div style="font-size:18px;font-weight:700;color:#f87171;">${withoutLazy}</div><div style="font-size:9px;color:#555;">Sem lazy</div>
        </div>
      </div>
      <button class="btn btn-full" id="btn-highlight-nolazy" style="margin-top:8px;">Destacar Imagens sem Lazy</button>
    `;
    let active = false;
    document.getElementById("btn-highlight-nolazy").addEventListener("click", () => {
      active = !active;
      chrome.tabs.sendMessage(activeTabId, { type: "TOGGLE_NOLAZY_HIGHLIGHT", on: active });
      const btn = document.getElementById("btn-highlight-nolazy");
      btn.textContent = active ? "Remover Destaque" : "Destacar Imagens sem Lazy";
      btn.classList.toggle("active-toggle", active);
    });
  });
}

// ─── Security Headers ─────────────────────────────────────────────────────────
function loadSecHeadersPanel(panel) {
  panel.innerHTML = '<div class="section-title">Security Headers</div><p class="empty">Verificando headers…</p>';
  chrome.runtime.sendMessage({ type: "CHECK_SEC_HEADERS", tabId: activeTabId }, (res) => {
    if (chrome.runtime.lastError || !res || !res.headers) {
      panel.innerHTML = '<div class="section-title">Security Headers</div><p class="empty" style="color:#c55;">Não foi possível verificar.</p>';
      return;
    }
    const checks = [
      { name: "Content-Security-Policy", key: "content-security-policy" },
      { name: "Strict-Transport-Security", key: "strict-transport-security" },
      { name: "X-Content-Type-Options", key: "x-content-type-options" },
      { name: "X-Frame-Options", key: "x-frame-options" },
      { name: "X-XSS-Protection", key: "x-xss-protection" },
      { name: "Referrer-Policy", key: "referrer-policy" },
      { name: "Permissions-Policy", key: "permissions-policy" },
      { name: "Cross-Origin-Opener-Policy", key: "cross-origin-opener-policy" },
      { name: "Cross-Origin-Resource-Policy", key: "cross-origin-resource-policy" },
    ];
    const hdrs = res.headers;
    const found = checks.filter(c => hdrs[c.key]);
    const missing = checks.filter(c => !hdrs[c.key]);
    const score = Math.round((found.length / checks.length) * 100);
    const color = score >= 70 ? "#4ade80" : score >= 40 ? "#facc15" : "#f87171";
    panel.innerHTML = `
      <div class="section-title">Security Headers</div>
      <div style="text-align:center;padding:8px 0 10px;">
        <div style="font-size:32px;font-weight:700;color:${color};">${score}%</div>
        <div style="font-size:10px;color:#555;">${found.length}/${checks.length} headers presentes</div>
      </div>
      ${checks.map(c => {
        const val = hdrs[c.key];
        return `<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid #0a0a0a;">
          <span style="font-size:12px;">${val ? "✅" : "❌"}</span>
          <div style="flex:1;min-width:0;">
            <div style="font-size:10px;font-weight:600;color:${val ? "#ccc" : "#f87171"};">${c.name}</div>
            ${val ? `<div style="font-size:9px;color:#555;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(val)}</div>` : ""}
          </div>
        </div>`;
      }).join("")}
    `;
  });
}

// ─── Tech Stack Detector ──────────────────────────────────────────────────────
function loadTechStackPanel(panel) {
  panel.innerHTML = '<div class="section-title">Tech Stack</div><p class="empty">Analisando tecnologias…</p>';
  chrome.tabs.sendMessage(activeTabId, { type: "DETECT_TECH_STACK" }, (res) => {
    if (chrome.runtime.lastError || !res) {
      panel.innerHTML = '<div class="section-title">Tech Stack</div><p class="empty" style="color:#c55;">Erro ao detectar.</p>';
      return;
    }
    const techs = res.techs || [];
    if (!techs.length) {
      panel.innerHTML = '<div class="section-title">Tech Stack</div><p class="empty">Nenhuma tecnologia detectada.</p>';
      return;
    }
    panel.innerHTML = `
      <div class="section-title">Tech Stack (${techs.length})</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        ${techs.map(t =>
          `<div style="background:#080808;border:1px solid #1a1a1a;border-radius:8px;padding:8px 12px;display:flex;align-items:center;gap:6px;">
            <span style="font-size:14px;">${t.icon}</span>
            <div>
              <div style="font-size:11px;font-weight:600;color:#ccc;">${escapeHtml(t.name)}</div>
              ${t.version ? `<div style="font-size:9px;color:#555;">${escapeHtml(t.version)}</div>` : ""}
            </div>
          </div>`
        ).join("")}
      </div>
    `;
  });
}

// ─── QR Code ──────────────────────────────────────────────────────────────────
function loadQrCodePanel(panel) {
  panel.innerHTML = `
    <div class="section-title">QR Code</div>
    <p class="empty">Gera um QR Code da URL atual para abrir no celular.</p>
    <div id="qr-container" style="text-align:center;margin-top:10px;"></div>
  `;
  chrome.tabs.get(activeTabId, (tab) => {
    const url = tab.url;
    const container = document.getElementById("qr-container");
    if (!container) return;
    // Generate QR Code using a canvas-based generator
    const qr = generateQR(url);
    const canvas = document.createElement("canvas");
    const size = 200;
    const cellSize = size / qr.length;
    canvas.width = size;
    canvas.height = size;
    canvas.style.cssText = "border-radius:8px;border:1px solid #1a1a1a;image-rendering:pixelated;";
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#000000";
    for (let y = 0; y < qr.length; y++) {
      for (let x = 0; x < qr[y].length; x++) {
        if (qr[y][x]) {
          ctx.fillRect(Math.floor(x * cellSize), Math.floor(y * cellSize), Math.ceil(cellSize), Math.ceil(cellSize));
        }
      }
    }
    container.appendChild(canvas);
    container.insertAdjacentHTML("beforeend", `
      <div style="margin-top:8px;font-size:10px;color:#555;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(url)}</div>
      <button class="btn btn-full" id="btn-qr-download" style="margin-top:8px;">⬇ Baixar QR Code</button>
      <button class="btn btn-full" id="btn-qr-copy" style="margin-top:4px;">📋 Copiar URL</button>
    `);
    document.getElementById("btn-qr-download").addEventListener("click", () => {
      outputImage(canvas.toDataURL("image/png"), `qrcode-${Date.now()}.png`);
    });
    document.getElementById("btn-qr-copy").addEventListener("click", () => {
      navigator.clipboard.writeText(url);
      showBtnSuccess(document.getElementById("btn-qr-copy"));
    });
  });
}

// ─── Gerador de Dados ─────────────────────────────────────────────────────────
function loadDataGenPanel(panel) {
  const TABS = [
    { id: "senha",   label: "Senhas" },
    { id: "pessoa",  label: "Pessoa" },
    { id: "cartao",  label: "Cartão" },
    { id: "docs",    label: "CPF/CNPJ" },
    { id: "uuid",    label: "UUID" },
  ];
  let activeTab = "senha";

  function render() {
    panel.innerHTML = `
      <div class="section-title">Gerador de Dados</div>
      <div class="font-tabs" id="dg-tabs"></div>
      <div id="dg-content" style="margin-top:6px;"></div>
    `;
    const tabBar = document.getElementById("dg-tabs");
    TABS.forEach(t => {
      const btn = document.createElement("button");
      btn.className = "font-tab" + (activeTab === t.id ? " active" : "");
      btn.textContent = t.label;
      btn.addEventListener("click", () => { activeTab = t.id; render(); });
      tabBar.appendChild(btn);
    });
    const content = document.getElementById("dg-content");
    const renderers = { senha: renderSenha, pessoa: renderPessoa, cartao: renderCartao, docs: renderDocs, uuid: renderUuid };
    renderers[activeTab](content);
  }

  function copyField(text, btn) {
    navigator.clipboard.writeText(text);
    showBtnSuccess(btn);
  }

  function resultRow(label, value) {
    const id = "dg-" + Math.random().toString(36).slice(2, 8);
    return `<div style="display:flex;align-items:center;gap:6px;padding:6px 0;border-bottom:1px solid #0a0a0a;">
      <span style="font-size:9px;color:#555;width:65px;flex-shrink:0;text-transform:uppercase;">${label}</span>
      <span id="${id}" style="flex:1;font-size:11px;color:#ccc;font-family:monospace;word-break:break-all;">${escapeHtml(value)}</span>
      <button class="btn dg-copy-btn" data-val="${escapeHtml(value)}" style="padding:3px 8px;font-size:9px;">Copiar</button>
    </div>`;
  }

  function bindCopyButtons(container) {
    container.querySelectorAll(".dg-copy-btn").forEach(btn => {
      btn.addEventListener("click", () => copyField(btn.dataset.val, btn));
    });
  }

  // ── Gerador de Senhas ──
  function renderSenha(el) {
    el.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
        <label style="font-size:10px;color:#aaa;">Tamanho</label>
        <input type="range" id="dg-pw-len" min="4" max="64" value="16" style="flex:1;accent-color:#7aa;">
        <span id="dg-pw-len-val" style="font-size:11px;color:#fff;width:22px;text-align:center;">16</span>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:8px;font-size:10px;color:#aaa;">
        <label><input type="checkbox" id="dg-pw-upper" checked> A-Z</label>
        <label><input type="checkbox" id="dg-pw-lower" checked> a-z</label>
        <label><input type="checkbox" id="dg-pw-nums" checked> 0-9</label>
        <label><input type="checkbox" id="dg-pw-sym" checked> !@#$</label>
      </div>
      <button class="btn btn-full" id="dg-pw-gen">🔐 Gerar Senha</button>
      <div id="dg-pw-out" style="margin-top:8px;"></div>
    `;
    const slider = document.getElementById("dg-pw-len");
    const valLabel = document.getElementById("dg-pw-len-val");
    slider.addEventListener("input", () => { valLabel.textContent = slider.value; });

    document.getElementById("dg-pw-gen").addEventListener("click", () => {
      let chars = "";
      if (document.getElementById("dg-pw-upper").checked) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if (document.getElementById("dg-pw-lower").checked) chars += "abcdefghijklmnopqrstuvwxyz";
      if (document.getElementById("dg-pw-nums").checked) chars += "0123456789";
      if (document.getElementById("dg-pw-sym").checked) chars += "!@#$%^&*()-_=+[]{}|;:,.<>?";
      if (!chars) { chars = "abcdefghijklmnopqrstuvwxyz"; }
      const len = parseInt(slider.value);
      const arr = new Uint32Array(len);
      crypto.getRandomValues(arr);
      const pw = Array.from(arr, v => chars[v % chars.length]).join("");
      const out = document.getElementById("dg-pw-out");
      out.innerHTML = `
        <div style="background:#080808;border:1px solid #1a1a1a;border-radius:6px;padding:10px;text-align:center;">
          <span style="font-size:13px;font-family:monospace;color:#7aa;word-break:break-all;user-select:all;">${escapeHtml(pw)}</span>
        </div>
        <button class="btn btn-full" id="dg-pw-copy" style="margin-top:6px;">📋 Copiar Senha</button>
      `;
      document.getElementById("dg-pw-copy").addEventListener("click", () => {
        copyField(pw, document.getElementById("dg-pw-copy"));
      });
    });
  }

  // ── Gerador de Pessoa ──
  function renderPessoa(el) {
    el.innerHTML = `
      <button class="btn btn-full" id="dg-pessoa-gen">👤 Gerar Pessoa</button>
      <div id="dg-pessoa-out" style="margin-top:8px;"></div>
    `;
    document.getElementById("dg-pessoa-gen").addEventListener("click", () => {
      const pessoa = gerarPessoa();
      const out = document.getElementById("dg-pessoa-out");
      out.innerHTML = `<div style="background:#080808;border:1px solid #1a1a1a;border-radius:6px;padding:6px 10px;">
        ${resultRow("Nome", pessoa.nome)}
        ${resultRow("Email", pessoa.email)}
        ${resultRow("Telefone", pessoa.telefone)}
        ${resultRow("Nascimento", pessoa.nascimento)}
        ${resultRow("CPF", pessoa.cpf)}
        ${resultRow("RG", pessoa.rg)}
        ${resultRow("Endereço", pessoa.endereco)}
        ${resultRow("CEP", pessoa.cep)}
        ${resultRow("Cidade", pessoa.cidade)}
        ${resultRow("Estado", pessoa.estado)}
      </div>
      <button class="btn btn-full dg-copy-all" style="margin-top:6px;">📋 Copiar Tudo</button>`;
      bindCopyButtons(out);
      out.querySelector(".dg-copy-all").addEventListener("click", function() {
        const text = Object.entries(pessoa).map(([k,v]) => `${k}: ${v}`).join("\n");
        copyField(text, this);
      });
    });
  }

  // ── Gerador de Cartão ──
  function renderCartao(el) {
    el.innerHTML = `
      <div style="display:flex;gap:6px;margin-bottom:8px;">
        <button class="btn dg-card-flag active-toggle" data-flag="visa" style="flex:1;font-size:9px;">Visa</button>
        <button class="btn dg-card-flag" data-flag="master" style="flex:1;font-size:9px;">Master</button>
        <button class="btn dg-card-flag" data-flag="amex" style="flex:1;font-size:9px;">Amex</button>
      </div>
      <button class="btn btn-full" id="dg-card-gen">💳 Gerar Cartão</button>
      <div id="dg-card-out" style="margin-top:8px;"></div>
    `;
    let flag = "visa";
    el.querySelectorAll(".dg-card-flag").forEach(btn => {
      btn.addEventListener("click", () => {
        el.querySelectorAll(".dg-card-flag").forEach(b => b.classList.remove("active-toggle"));
        btn.classList.add("active-toggle");
        flag = btn.dataset.flag;
      });
    });
    document.getElementById("dg-card-gen").addEventListener("click", () => {
      const card = gerarCartao(flag);
      const out = document.getElementById("dg-card-out");
      out.innerHTML = `<div style="background:#080808;border:1px solid #1a1a1a;border-radius:6px;padding:6px 10px;">
        ${resultRow("Número", card.numero)}
        ${resultRow("Nome", card.nome)}
        ${resultRow("Validade", card.validade)}
        ${resultRow("CVV", card.cvv)}
      </div>
      <button class="btn btn-full dg-copy-all" style="margin-top:6px;">📋 Copiar Tudo</button>`;
      bindCopyButtons(out);
      out.querySelector(".dg-copy-all").addEventListener("click", function() {
        const text = `Número: ${card.numero}\nNome: ${card.nome}\nValidade: ${card.validade}\nCVV: ${card.cvv}`;
        copyField(text, this);
      });
    });
  }

  // ── Gerador de CPF/CNPJ ──
  function renderDocs(el) {
    el.innerHTML = `
      <div style="display:flex;gap:6px;margin-bottom:8px;">
        <button class="btn btn-full" id="dg-cpf-gen">Gerar CPF</button>
        <button class="btn btn-full" id="dg-cnpj-gen">Gerar CNPJ</button>
      </div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
        <label style="font-size:10px;color:#aaa;"><input type="checkbox" id="dg-doc-mask" checked> Com máscara</label>
      </div>
      <div id="dg-doc-out" style="margin-top:2px;"></div>
    `;
    function showDoc(label, value) {
      const out = document.getElementById("dg-doc-out");
      out.innerHTML = `<div style="background:#080808;border:1px solid #1a1a1a;border-radius:6px;padding:10px;text-align:center;">
        <span style="font-size:9px;color:#555;text-transform:uppercase;display:block;margin-bottom:4px;">${label}</span>
        <span style="font-size:15px;font-family:monospace;color:#7aa;user-select:all;">${escapeHtml(value)}</span>
      </div>
      <button class="btn btn-full" id="dg-doc-copy" style="margin-top:6px;">📋 Copiar</button>`;
      document.getElementById("dg-doc-copy").addEventListener("click", () => {
        copyField(value, document.getElementById("dg-doc-copy"));
      });
    }
    document.getElementById("dg-cpf-gen").addEventListener("click", () => {
      const mask = document.getElementById("dg-doc-mask").checked;
      showDoc("CPF", gerarCPF(mask));
    });
    document.getElementById("dg-cnpj-gen").addEventListener("click", () => {
      const mask = document.getElementById("dg-doc-mask").checked;
      showDoc("CNPJ", gerarCNPJ(mask));
    });
  }

  // ── Gerador de UUID ──
  function renderUuid(el) {
    el.innerHTML = `
      <button class="btn btn-full" id="dg-uuid-gen">🔑 Gerar UUID v4</button>
      <div id="dg-uuid-out" style="margin-top:8px;"></div>
      <button class="btn btn-full" id="dg-uuid-batch" style="margin-top:6px;">📦 Gerar 5 UUIDs</button>
      <div id="dg-uuid-batch-out" style="margin-top:8px;"></div>
    `;
    document.getElementById("dg-uuid-gen").addEventListener("click", () => {
      const uuid = gerarUUID();
      const out = document.getElementById("dg-uuid-out");
      out.innerHTML = `<div style="background:#080808;border:1px solid #1a1a1a;border-radius:6px;padding:10px;text-align:center;">
        <span style="font-size:12px;font-family:monospace;color:#7aa;user-select:all;">${uuid}</span>
      </div>
      <button class="btn btn-full" id="dg-uuid-copy" style="margin-top:6px;">📋 Copiar</button>`;
      document.getElementById("dg-uuid-copy").addEventListener("click", () => {
        copyField(uuid, document.getElementById("dg-uuid-copy"));
      });
    });
    document.getElementById("dg-uuid-batch").addEventListener("click", () => {
      const uuids = Array.from({ length: 5 }, () => gerarUUID());
      const out = document.getElementById("dg-uuid-batch-out");
      out.innerHTML = `<div style="background:#080808;border:1px solid #1a1a1a;border-radius:6px;padding:6px 10px;">
        ${uuids.map((u, i) => resultRow(`#${i + 1}`, u)).join("")}
      </div>
      <button class="btn btn-full dg-copy-all" style="margin-top:6px;">📋 Copiar Todos</button>`;
      bindCopyButtons(out);
      out.querySelector(".dg-copy-all").addEventListener("click", function() {
        copyField(uuids.join("\n"), this);
      });
    });
  }

  // ── Helpers de geração ──
  function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function gerarCPF(mask) {
    const n = Array.from({ length: 9 }, () => rand(0, 9));
    const d1 = (11 - (n.reduce((s, v, i) => s + v * (10 - i), 0) % 11)) % 11;
    n.push(d1 > 9 ? 0 : d1);
    const d2 = (11 - (n.reduce((s, v, i) => s + v * (11 - i), 0) % 11)) % 11;
    n.push(d2 > 9 ? 0 : d2);
    const str = n.join("");
    return mask ? str.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") : str;
  }

  function gerarCNPJ(mask) {
    const n = Array.from({ length: 8 }, () => rand(0, 9));
    n.push(0, 0, 0, 1);
    const w1 = [5,4,3,2,9,8,7,6,5,4,3,2];
    const d1 = (11 - (n.reduce((s, v, i) => s + v * w1[i], 0) % 11)) % 11;
    n.push(d1 > 9 ? 0 : d1);
    const w2 = [6,5,4,3,2,9,8,7,6,5,4,3,2];
    const d2 = (11 - (n.reduce((s, v, i) => s + v * w2[i], 0) % 11)) % 11;
    n.push(d2 > 9 ? 0 : d2);
    const str = n.join("");
    return mask ? str.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5") : str;
  }

  function gerarUUID() {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");
    return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
  }

  function gerarPessoa() {
    const nomes = ["João","Maria","Pedro","Ana","Lucas","Julia","Carlos","Fernanda","Rafael","Camila","Bruno","Beatriz","Gabriel","Larissa","Matheus","Mariana","Thiago","Letícia","Felipe","Amanda"];
    const sobrenomes = ["Silva","Santos","Oliveira","Souza","Rodrigues","Ferreira","Almeida","Pereira","Lima","Gomes","Costa","Ribeiro","Martins","Carvalho","Araújo","Melo","Barbosa","Cardoso","Nascimento","Correia"];
    const estados = [
      { uf: "SP", cidades: ["São Paulo","Campinas","Santos","Ribeirão Preto"] },
      { uf: "RJ", cidades: ["Rio de Janeiro","Niterói","Petrópolis"] },
      { uf: "MG", cidades: ["Belo Horizonte","Uberlândia","Juiz de Fora"] },
      { uf: "RS", cidades: ["Porto Alegre","Caxias do Sul","Pelotas"] },
      { uf: "PR", cidades: ["Curitiba","Londrina","Maringá"] },
      { uf: "BA", cidades: ["Salvador","Feira de Santana","Ilhéus"] },
      { uf: "SC", cidades: ["Florianópolis","Joinville","Blumenau"] },
      { uf: "PE", cidades: ["Recife","Olinda","Caruaru"] },
    ];
    const ruas = ["Rua das Flores","Av. Brasil","Rua São Paulo","Av. Paulista","Rua XV de Novembro","Rua Sete de Setembro","Av. Rio Branco","Rua Augusta","Rua da Consolação","Av. Getúlio Vargas"];

    const nome = pick(nomes);
    const sobrenome = pick(sobrenomes) + " " + pick(sobrenomes);
    const nomeCompleto = nome + " " + sobrenome;
    const emailBase = (nome + "." + sobrenome.split(" ")[0]).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const dominios = ["gmail.com","outlook.com","hotmail.com","yahoo.com.br","email.com"];
    const est = pick(estados);

    return {
      nome: nomeCompleto,
      email: emailBase + rand(1, 999) + "@" + pick(dominios),
      telefone: `(${rand(11,99)}) 9${rand(1000,9999)}-${rand(1000,9999)}`,
      nascimento: `${String(rand(1,28)).padStart(2,"0")}/${String(rand(1,12)).padStart(2,"0")}/${rand(1970,2005)}`,
      cpf: gerarCPF(true),
      rg: `${rand(10,99)}.${rand(100,999)}.${rand(100,999)}-${rand(0,9)}`,
      endereco: pick(ruas) + ", " + rand(1, 9999),
      cep: `${String(rand(10000,99999)).padStart(5,"0")}-${String(rand(100,999)).padStart(3,"0")}`,
      cidade: pick(est.cidades),
      estado: est.uf,
    };
  }

  function gerarCartao(flag) {
    const nomes = ["JOAO SILVA","MARIA SANTOS","PEDRO OLIVEIRA","ANA SOUZA","CARLOS FERREIRA","FERNANDA LIMA","RAFAEL COSTA","CAMILA PEREIRA"];
    let prefix, len;
    if (flag === "amex") { prefix = pick(["34","37"]); len = 15; }
    else if (flag === "master") { prefix = pick(["51","52","53","54","55"]); len = 16; }
    else { prefix = "4"; len = 16; }

    let num = prefix;
    while (num.length < len - 1) num += rand(0, 9);
    const digits = num.split("").map(Number);
    let sum = 0;
    let alt = true;
    for (let i = digits.length - 1; i >= 0; i--) {
      let d = digits[i];
      if (alt) { d *= 2; if (d > 9) d -= 9; }
      sum += d;
      alt = !alt;
    }
    const check = (10 - (sum % 10)) % 10;
    num += check;

    const formatted = flag === "amex"
      ? num.replace(/(\d{4})(\d{6})(\d{5})/, "$1 $2 $3")
      : num.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4");

    const mes = String(rand(1, 12)).padStart(2, "0");
    const ano = String(rand(2026, 2032));

    return {
      numero: formatted,
      nome: pick(nomes),
      validade: `${mes}/${ano}`,
      cvv: flag === "amex" ? String(rand(1000, 9999)) : String(rand(100, 999)),
    };
  }

  render();
}

// ─── Hash Generator ───────────────────────────────────────────────────────────
function loadHashGenPanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Hash Generator</div>
    <textarea id="hash-input" placeholder="Digite o texto para gerar o hash…"
      style="width:100%;min-height:70px;padding:8px;background:#080808;border:1px solid #1a1a1a;border-radius:6px;color:#ccc;font-family:monospace;font-size:11px;resize:vertical;box-sizing:border-box;"></textarea>
    <button class="btn btn-full" id="btn-hash-gen" style="margin-top:6px;">🔒 Gerar Hashes</button>
    <div id="hash-out" style="margin-top:8px;"></div>
  `;
  document.getElementById("btn-hash-gen").addEventListener("click", async () => {
    const text = document.getElementById("hash-input").value;
    if (!text) return;
    const out = document.getElementById("hash-out");
    out.innerHTML = '<p class="empty" style="font-size:10px;">Gerando…</p>';
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const algos = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];
    let rows = "";
    for (const algo of algos) {
      const buf = await crypto.subtle.digest(algo, data);
      const hex = Array.from(new Uint8Array(buf), b => b.toString(16).padStart(2, "0")).join("");
      rows += hashRow(algo, hex);
    }
    rows += hashRow("Base64", btoa(unescape(encodeURIComponent(text))));
    out.innerHTML = `<div style="background:#080808;border:1px solid #1a1a1a;border-radius:6px;padding:6px 10px;">${rows}</div>`;
    out.querySelectorAll(".hash-copy-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        navigator.clipboard.writeText(btn.dataset.val);
        showBtnSuccess(btn);
      });
    });
  });

  function hashRow(label, value) {
    return `<div style="display:flex;align-items:center;gap:6px;padding:6px 0;border-bottom:1px solid #0a0a0a;">
      <span style="font-size:9px;color:#555;width:58px;flex-shrink:0;text-transform:uppercase;">${label}</span>
      <span style="flex:1;font-size:10px;color:#ccc;font-family:monospace;word-break:break-all;">${escapeHtml(value)}</span>
      <button class="btn hash-copy-btn" data-val="${escapeHtml(value)}" style="padding:3px 8px;font-size:9px;">Copiar</button>
    </div>`;
  }
}

// ─── Timestamp ────────────────────────────────────────────────────────────────
function loadTimestampPanel(panel) {
  const now = Math.floor(Date.now() / 1000);
  panel.innerHTML = `
    <div class="section-title">Timestamp</div>
    <div style="background:#080808;border:1px solid #1a1a1a;border-radius:6px;padding:10px;text-align:center;margin-bottom:8px;">
      <span style="font-size:9px;color:#555;display:block;margin-bottom:4px;">TIMESTAMP ATUAL</span>
      <span id="ts-now" style="font-size:18px;font-family:monospace;color:#7aa;user-select:all;">${now}</span>
    </div>
    <button class="btn btn-full" id="ts-copy">📋 Copiar Timestamp Atual</button>
    <div style="margin-top:10px;border-top:1px solid #0a0a0a;padding-top:10px;">
      <label style="font-size:10px;color:#aaa;display:block;margin-bottom:4px;">Timestamp → Data</label>
      <div style="display:flex;gap:6px;">
        <input type="text" id="ts-input" placeholder="Ex: 1700000000" value="${now}"
          style="flex:1;padding:6px 8px;background:#080808;border:1px solid #1a1a1a;border-radius:6px;color:#fff;font-family:monospace;font-size:11px;">
        <button class="btn" id="ts-to-date">Converter</button>
      </div>
      <div id="ts-date-out" style="margin-top:6px;"></div>
    </div>
    <div style="margin-top:10px;border-top:1px solid #0a0a0a;padding-top:10px;">
      <label style="font-size:10px;color:#aaa;display:block;margin-bottom:4px;">Data → Timestamp</label>
      <div style="display:flex;gap:6px;">
        <input type="datetime-local" id="ts-date-input"
          style="flex:1;padding:6px 8px;background:#080808;border:1px solid #1a1a1a;border-radius:6px;color:#fff;font-size:11px;font-family:inherit;">
        <button class="btn" id="ts-date-to-ts">Converter</button>
      </div>
      <div id="ts-date-ts-out" style="margin-top:6px;"></div>
    </div>
    <div style="margin-top:10px;border-top:1px solid #0a0a0a;padding-top:10px;">
      <button class="btn btn-full" id="ts-iso">📅 Gerar ISO 8601 Atual</button>
      <div id="ts-iso-out" style="margin-top:6px;"></div>
    </div>
  `;

  const liveTs = document.getElementById("ts-now");
  const interval = setInterval(() => {
    if (!document.getElementById("ts-now")) { clearInterval(interval); return; }
    liveTs.textContent = Math.floor(Date.now() / 1000);
  }, 1000);

  document.getElementById("ts-copy").addEventListener("click", () => {
    navigator.clipboard.writeText(String(Math.floor(Date.now() / 1000)));
    showBtnSuccess(document.getElementById("ts-copy"));
  });

  document.getElementById("ts-to-date").addEventListener("click", () => {
    const ts = parseInt(document.getElementById("ts-input").value);
    if (isNaN(ts)) return;
    const d = new Date(ts * 1000);
    const out = document.getElementById("ts-date-out");
    out.innerHTML = `<div style="background:#080808;border:1px solid #1a1a1a;border-radius:6px;padding:6px 10px;">
      <div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid #0a0a0a;"><span style="font-size:9px;color:#555;">LOCAL</span><span style="font-size:11px;color:#ccc;font-family:monospace;">${escapeHtml(d.toLocaleString("pt-BR"))}</span></div>
      <div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid #0a0a0a;"><span style="font-size:9px;color:#555;">UTC</span><span style="font-size:11px;color:#ccc;font-family:monospace;">${escapeHtml(d.toUTCString())}</span></div>
      <div style="display:flex;justify-content:space-between;padding:4px 0;"><span style="font-size:9px;color:#555;">ISO</span><span style="font-size:11px;color:#ccc;font-family:monospace;">${escapeHtml(d.toISOString())}</span></div>
    </div>`;
  });

  document.getElementById("ts-date-to-ts").addEventListener("click", () => {
    const val = document.getElementById("ts-date-input").value;
    if (!val) return;
    const ts = Math.floor(new Date(val).getTime() / 1000);
    const out = document.getElementById("ts-date-ts-out");
    out.innerHTML = `<div style="background:#080808;border:1px solid #1a1a1a;border-radius:6px;padding:10px;text-align:center;">
      <span style="font-size:14px;font-family:monospace;color:#7aa;user-select:all;">${ts}</span>
    </div>
    <button class="btn btn-full" id="ts-copy-conv" style="margin-top:6px;">📋 Copiar</button>`;
    document.getElementById("ts-copy-conv").addEventListener("click", () => {
      navigator.clipboard.writeText(String(ts));
      showBtnSuccess(document.getElementById("ts-copy-conv"));
    });
  });

  document.getElementById("ts-iso").addEventListener("click", () => {
    const iso = new Date().toISOString();
    const out = document.getElementById("ts-iso-out");
    out.innerHTML = `<div style="background:#080808;border:1px solid #1a1a1a;border-radius:6px;padding:10px;text-align:center;">
      <span style="font-size:12px;font-family:monospace;color:#7aa;user-select:all;">${iso}</span>
    </div>
    <button class="btn btn-full" id="ts-copy-iso" style="margin-top:6px;">📋 Copiar</button>`;
    document.getElementById("ts-copy-iso").addEventListener("click", () => {
      navigator.clipboard.writeText(iso);
      showBtnSuccess(document.getElementById("ts-copy-iso"));
    });
  });
}

// ─── Encode / Decode ──────────────────────────────────────────────────────────
function loadEncodeDecodePanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Base64 Encode / Decode</div>
    <div style="margin-bottom:14px;">
      <div style="font-size:11px;color:#666;margin-bottom:6px;font-weight:600;">🔒 Encode (Texto → Base64)</div>
      <textarea id="enc-encode-input" placeholder="Digite o texto aqui…"
        style="width:100%;min-height:60px;padding:8px;background:#080808;border:1px solid #1a1a1a;border-radius:6px;color:#ccc;font-family:monospace;font-size:11px;resize:vertical;box-sizing:border-box;"></textarea>
      <button class="btn btn-full" id="btn-enc-encode" style="margin-top:6px;">Encode</button>
      <div id="enc-encode-out" style="margin-top:6px;"></div>
    </div>
    <div style="border-top:1px solid #111;padding-top:12px;">
      <div style="font-size:11px;color:#666;margin-bottom:6px;font-weight:600;">🔓 Decode (Base64 → Texto)</div>
      <textarea id="enc-decode-input" placeholder="Cole o Base64 aqui…"
        style="width:100%;min-height:60px;padding:8px;background:#080808;border:1px solid #1a1a1a;border-radius:6px;color:#ccc;font-family:monospace;font-size:11px;resize:vertical;box-sizing:border-box;"></textarea>
      <button class="btn btn-full" id="btn-enc-decode" style="margin-top:6px;">Decode</button>
      <div id="enc-decode-out" style="margin-top:6px;"></div>
    </div>
  `;

  function showResult(outId, text) {
    const out = document.getElementById(outId);
    const copyId = "copy-" + Math.random().toString(36).slice(2, 8);
    out.innerHTML = `
      <div style="background:#080808;border:1px solid #1a1a1a;border-radius:6px;padding:10px;max-height:120px;overflow-y:auto;">
        <pre style="font-size:10px;color:#7aa;white-space:pre-wrap;margin:0;font-family:monospace;word-break:break-all;">${escapeHtml(text)}</pre>
      </div>
      <button class="btn btn-full" id="${copyId}" style="margin-top:6px;">📋 Copiar</button>`;
    document.getElementById(copyId).addEventListener("click", () => {
      navigator.clipboard.writeText(text);
      showBtnSuccess(document.getElementById(copyId));
    });
  }

  document.getElementById("btn-enc-encode").addEventListener("click", () => {
    const input = document.getElementById("enc-encode-input").value;
    if (!input) return;
    try { showResult("enc-encode-out", btoa(unescape(encodeURIComponent(input)))); }
    catch(e) { showResult("enc-encode-out", "Erro: " + e.message); }
  });

  document.getElementById("btn-enc-decode").addEventListener("click", () => {
    const input = document.getElementById("enc-decode-input").value;
    if (!input) return;
    try { showResult("enc-decode-out", decodeURIComponent(escape(atob(input)))); }
    catch(e) { showResult("enc-decode-out", "Base64 inválido."); }
  });
}

// ─── Interceptor Panel ────────────────────────────────────────────────────────
function loadInterceptorPanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Network Interceptor</div>
    <div style="text-align:center;padding:20px 0;">
      <div style="font-size:26px;margin-bottom:10px;">📡</div>
      <div style="font-size:11px;color:#555;margin-bottom:14px;line-height:1.6;">
        Intercepta e monitora todas as requisições em tempo real<br>
        <span style="color:#444;">XHR · Fetch · WebSocket · SSE · Beacon</span>
      </div>
      <button class="btn btn-full" id="int-open" style="background:#1a1a1a;border-color:#333;font-size:12px;padding:10px;">📡 Abrir Interceptor</button>
    </div>
  `;
  document.getElementById("int-open").addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "INTERCEPTOR_OPEN", tabId: activeTabId });
  });
}

function loadScreenRecorderPanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Gravador de Tela</div>
    <div id="sr-status" style="text-align:center;padding:20px 0;">
      <div style="font-size:11px;color:#555;margin-bottom:6px;">Verificando…</div>
    </div>
  `;

  function renderStatus(state) {
    const wrap = document.getElementById("sr-status");
    if (!wrap) return;

    if (state && state.recording) {
      const elapsed = Date.now() - state.startTime;
      const hrs = String(Math.floor(elapsed / 3600000)).padStart(2, "0");
      const mins = String(Math.floor((elapsed % 3600000) / 60000)).padStart(2, "0");
      const secs = String(Math.floor((elapsed % 60000) / 1000)).padStart(2, "0");
      const statusText = state.isPaused ? "PAUSADO" : "GRAVANDO";
      const statusColor = state.isPaused ? "#febc2e" : "#ff5f57";
      wrap.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:8px;">
          <div style="width:8px;height:8px;border-radius:50%;background:${statusColor};box-shadow:0 0 4px ${statusColor};${state.isPaused ? "" : "animation:sr-blink 1.2s ease-in-out infinite;"}"></div>
          <span style="font-size:11px;color:${statusColor};font-weight:600;">${statusText}</span>
        </div>
        <div style="font-size:22px;font-weight:700;color:#fff;letter-spacing:2px;margin-bottom:14px;font-family:monospace;">${hrs}:${mins}:${secs}</div>
        <button class="btn btn-full" id="sr-open-recorder" style="font-size:12px;padding:10px;">🎬 Abrir Gravador</button>
      `;
      document.getElementById("sr-open-recorder").addEventListener("click", openRecorder);
    } else if (state && state.done) {
      wrap.innerHTML = `
        <div style="font-size:11px;color:#5a5;margin-bottom:14px;font-weight:600;">✅ Gravação finalizada</div>
        <button class="btn btn-full" id="sr-open-recorder" style="font-size:12px;padding:10px;">🎬 Ver Resultado</button>
      `;
      document.getElementById("sr-open-recorder").addEventListener("click", openRecorder);
    } else {
      wrap.innerHTML = `
        <div style="font-size:26px;margin-bottom:10px;">🎬</div>
        <div style="font-size:11px;color:#555;margin-bottom:14px;">Grave sua tela, janela ou aba do navegador com áudio</div>
        <button class="btn btn-full" id="sr-open-recorder" style="background:#1a1a1a;border-color:#333;font-size:12px;padding:10px;">🔴 Abrir Gravador</button>
      `;
      document.getElementById("sr-open-recorder").addEventListener("click", openRecorder);
    }
  }

  function openRecorder() {
    chrome.runtime.sendMessage({ type: "SR_OPEN_RECORDER" });
  }

  chrome.runtime.sendMessage({ type: "SR_GET_STATE" }, (state) => {
    if (chrome.runtime.lastError) { renderStatus(null); return; }
    renderStatus(state);
  });
}
// Minimal QR Code generator (numeric mode, version auto-select)
function generateQR(text) {
  // Use the QR generation via Google Charts API rendered to an image, then drawn to canvas
  // Instead, we'll do a simple pure-JS QR encoder
  // This is a simplified QR code matrix generator
  const EC_L = 1;
  // We'll use a data URL approach - encode into an img tag and then read it
  // Actually, let's use a proper minimal QR implementation:

  // Encode text to QR modules using byte mode
  const data = [];
  for (let i = 0; i < text.length; i++) {
    data.push(text.charCodeAt(i));
  }

  // Determine version (1-40) based on byte mode capacity with L error correction
  const capacities = [0,17,32,53,78,106,134,154,192,230,271,321,367,425,458,520,586,644,718,792,858,929,1003,1091,1171,1273,1367,1465,1528,1628,1732,1840,1952,2068,2188,2303,2431,2563,2699,2809,2953];
  let version = 1;
  for (let v = 1; v <= 40; v++) { if (capacities[v] >= data.length) { version = v; break; } }
  const size = 17 + version * 4;

  // Create blank matrix
  const matrix = Array.from({ length: size }, () => Array(size).fill(null));
  const reserved = Array.from({ length: size }, () => Array(size).fill(false));

  // Add finder patterns at (0,0), (0,size-7), (size-7,0)
  function addFinder(row, col) {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const rr = row + r, cc = col + c;
        if (rr < 0 || rr >= size || cc < 0 || cc >= size) continue;
        if ((r >= 0 && r <= 6 && (c === 0 || c === 6)) ||
            (c >= 0 && c <= 6 && (r === 0 || r === 6)) ||
            (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
          matrix[rr][cc] = true;
        } else {
          matrix[rr][cc] = false;
        }
        reserved[rr][cc] = true;
      }
    }
  }
  addFinder(0, 0); addFinder(0, size - 7); addFinder(size - 7, 0);

  // Add timing patterns
  for (let i = 8; i < size - 8; i++) {
    if (!reserved[6][i]) { matrix[6][i] = i % 2 === 0; reserved[6][i] = true; }
    if (!reserved[i][6]) { matrix[i][6] = i % 2 === 0; reserved[i][6] = true; }
  }

  // Dark module
  matrix[size - 8][8] = true; reserved[size - 8][8] = true;

  // Reserve format info areas
  for (let i = 0; i < 9; i++) {
    if (!reserved[8][i]) { reserved[8][i] = true; matrix[8][i] = false; }
    if (!reserved[i][8]) { reserved[i][8] = true; matrix[i][8] = false; }
    if (i < 8 && !reserved[8][size - 1 - i]) { reserved[8][size - 1 - i] = true; matrix[8][size - 1 - i] = false; }
    if (i < 8 && !reserved[size - 1 - i][8]) { reserved[size - 1 - i][8] = true; matrix[size - 1 - i][8] = false; }
  }

  // Alignment patterns for version >= 2
  if (version >= 2) {
    const positions = getAlignmentPositions(version, size);
    for (const row of positions) {
      for (const col of positions) {
        if (reserved[row][col]) continue;
        for (let r = -2; r <= 2; r++) {
          for (let c = -2; c <= 2; c++) {
            const rr = row + r, cc = col + c;
            if (rr >= 0 && rr < size && cc >= 0 && cc < size) {
              matrix[rr][cc] = (Math.abs(r) === 2 || Math.abs(c) === 2 || (r === 0 && c === 0));
              reserved[rr][cc] = true;
            }
          }
        }
      }
    }
  }

  // Reserve version info for version >= 7
  if (version >= 7) {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 3; j++) {
        reserved[i][size - 11 + j] = true;
        reserved[size - 11 + j][i] = true;
      }
    }
  }

  // Place data bits (simplified - just fill unreserved with data pattern)
  const allBits = [];
  // Mode indicator (byte) = 0100
  allBits.push(0,1,0,0);
  // Character count (8 bits for version 1-9, 16 for 10+)
  const countBits = version <= 9 ? 8 : 16;
  for (let i = countBits - 1; i >= 0; i--) allBits.push((data.length >> i) & 1);
  // Data
  for (const byte of data) {
    for (let i = 7; i >= 0; i--) allBits.push((byte >> i) & 1);
  }
  // Terminator
  for (let i = 0; i < 4 && allBits.length < capacities[version] * 8; i++) allBits.push(0);
  // Pad to byte boundary
  while (allBits.length % 8 !== 0) allBits.push(0);
  // Pad bytes
  const padBytes = [0xEC, 0x11];
  let padIdx = 0;
  while (allBits.length < capacities[version] * 8) {
    for (let i = 7; i >= 0; i--) allBits.push((padBytes[padIdx % 2] >> i) & 1);
    padIdx++;
  }

  // Place data in zigzag pattern
  let bitIdx = 0;
  let upward = true;
  for (let right = size - 1; right >= 0; right -= 2) {
    if (right === 6) right = 5; // Skip timing column
    const rows = upward ? Array.from({ length: size }, (_, i) => size - 1 - i) : Array.from({ length: size }, (_, i) => i);
    for (const row of rows) {
      for (const col of [right, right - 1]) {
        if (col < 0 || col >= size) continue;
        if (reserved[row][col]) continue;
        matrix[row][col] = bitIdx < allBits.length ? !!allBits[bitIdx] : false;
        bitIdx++;
      }
    }
    upward = !upward;
  }

  // Apply mask pattern 0 (checkerboard)
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!reserved[r][c] && (r + c) % 2 === 0) {
        matrix[r][c] = !matrix[r][c];
      }
    }
  }

  // Write format info (mask 0, EC level L)
  const formatBits = [1,1,1,0,1,1,1,1,1,0,0,0,1,0,0];
  const formatPositions1 = [[8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[8,7],[8,8],[7,8],[5,8],[4,8],[3,8],[2,8],[1,8],[0,8]];
  const formatPositions2 = [[size-1,8],[size-2,8],[size-3,8],[size-4,8],[size-5,8],[size-6,8],[size-7,8],[8,size-8],[8,size-7],[8,size-6],[8,size-5],[8,size-4],[8,size-3],[8,size-2],[8,size-1]];
  for (let i = 0; i < 15; i++) {
    const bit = !!formatBits[i];
    const [r1, c1] = formatPositions1[i];
    const [r2, c2] = formatPositions2[i];
    if (r1 < size && c1 < size) matrix[r1][c1] = bit;
    if (r2 < size && c2 < size) matrix[r2][c2] = bit;
  }

  // Add quiet zone
  const qz = 2;
  const final = Array.from({ length: size + qz * 2 }, () => Array(size + qz * 2).fill(false));
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      final[r + qz][c + qz] = !!matrix[r][c];
    }
  }
  return final;
}

function getAlignmentPositions(version, size) {
  if (version === 1) return [];
  const intervals = [0,0,0,0,0,0,0,16,18,20,22,24,26,28,20,22,24,24,26,28,28,22,24,24,26,26,28,28,24,24,26,26,26,28,28,24,26,26,26,28,28];
  const step = intervals[version] || 24;
  const positions = [6];
  let pos = size - 7;
  while (pos > 6) { positions.unshift(pos); pos -= step; }
  if (positions[0] !== 6) positions.unshift(6);
  return [...new Set(positions)].sort((a, b) => a - b);
}

// ─── Atalhos Rápidos ──────────────────────────────────────────────────────────
const SHORTCUTS_KEY = "revoltz_shortcuts";

function loadShortcutsPanel(panel) {
  panel.innerHTML = `
    <div class="section-title">Atalhos Rápidos</div>
    <p class="empty">Configure atalhos de teclado personalizados para abrir ferramentas rapidamente.<br>Os atalhos funcionam na página.</p>
    <div id="shortcuts-list" style="margin-top:8px;"></div>
    <button class="btn btn-full" id="btn-add-shortcut" style="margin-top:8px;">+ Adicionar Atalho</button>
  `;
  loadShortcuts();
  document.getElementById("btn-add-shortcut").addEventListener("click", () => addShortcutRow());
}

async function loadShortcuts() {
  const data = await chrome.storage.local.get(SHORTCUTS_KEY);
  const shortcuts = data[SHORTCUTS_KEY] || [];
  renderShortcutsList(shortcuts);
}

function renderShortcutsList(shortcuts) {
  const list = document.getElementById("shortcuts-list");
  if (!list) return;
  if (!shortcuts.length) {
    list.innerHTML = '<p class="empty" style="font-size:10px;">Nenhum atalho configurado.</p>';
    return;
  }
  list.innerHTML = shortcuts.map((s, i) => {
    const feature = FEATURES.find(f => f.id === s.featureId);
    return `<div style="display:flex;align-items:center;gap:6px;padding:6px 0;border-bottom:1px solid #0a0a0a;">
      <span style="background:#111;border:1px solid #222;border-radius:4px;padding:3px 8px;font-family:monospace;font-size:10px;color:#7aa;flex-shrink:0;">${escapeHtml(s.keys)}</span>
      <span style="font-size:10px;color:#ccc;flex:1;">${feature ? feature.icon + " " + feature.name : s.featureId}</span>
      <button class="btn shortcut-del" data-idx="${i}" style="padding:2px 7px;font-size:9px;color:#f87171;border-color:#2a1a1a;">✕</button>
    </div>`;
  }).join("");
  list.querySelectorAll(".shortcut-del").forEach(btn => {
    btn.addEventListener("click", async () => {
      shortcuts.splice(parseInt(btn.dataset.idx), 1);
      await chrome.storage.local.set({ [SHORTCUTS_KEY]: shortcuts });
      chrome.tabs.sendMessage(activeTabId, { type: "UPDATE_SHORTCUTS", shortcuts });
      renderShortcutsList(shortcuts);
    });
  });
}

function addShortcutRow() {
  const list = document.getElementById("shortcuts-list");
  const row = document.createElement("div");
  row.style.cssText = "background:#080808;border:1px solid #1a1a1a;border-radius:8px;padding:10px;margin-bottom:6px;";
  row.innerHTML = `
    <div style="font-size:10px;color:#888;margin-bottom:6px;">Pressione a combinação de teclas:</div>
    <input id="shortcut-keys-input" readonly placeholder="Ex: Ctrl+Shift+K"
      style="width:100%;padding:6px 8px;background:#000;border:1px solid #1a1a1a;border-radius:4px;color:#7aa;font-family:monospace;font-size:11px;text-align:center;margin-bottom:6px;cursor:pointer;">
    <div style="font-size:10px;color:#888;margin-bottom:4px;">Ferramenta:</div>
    <select id="shortcut-feature-select"
      style="width:100%;padding:6px 8px;background:#000;border:1px solid #1a1a1a;border-radius:4px;color:#fff;font-size:10px;font-family:inherit;margin-bottom:6px;">
      ${FEATURES.filter(f => config[f.id]).map(f => `<option value="${f.id}">${f.icon} ${f.name}</option>`).join("")}
    </select>
    <button class="btn btn-full" id="btn-save-shortcut">Salvar Atalho</button>
  `;
  list.insertBefore(row, list.firstChild);

  const keysInput = document.getElementById("shortcut-keys-input");
  keysInput.addEventListener("keydown", (e) => {
    e.preventDefault();
    const parts = [];
    if (e.ctrlKey) parts.push("Ctrl");
    if (e.altKey) parts.push("Alt");
    if (e.shiftKey) parts.push("Shift");
    if (e.key && !["Control","Alt","Shift","Meta"].includes(e.key)) {
      parts.push(e.key.length === 1 ? e.key.toUpperCase() : e.key);
    }
    keysInput.value = parts.join("+");
  });

  document.getElementById("btn-save-shortcut").addEventListener("click", async () => {
    const keys = keysInput.value.trim();
    const featureId = document.getElementById("shortcut-feature-select").value;
    if (!keys || !featureId) return;
    const data = await chrome.storage.local.get(SHORTCUTS_KEY);
    const shortcuts = data[SHORTCUTS_KEY] || [];
    shortcuts.push({ keys, featureId });
    await chrome.storage.local.set({ [SHORTCUTS_KEY]: shortcuts });
    chrome.tabs.sendMessage(activeTabId, { type: "UPDATE_SHORTCUTS", shortcuts });
    row.remove();
    renderShortcutsList(shortcuts);
  });
}

function buildSettings() {
  const list = document.getElementById("settings-list");
  list.innerHTML = "";

  // Opção de modo flutuante
  const floatItem = document.createElement("div");
  floatItem.className = "setting-item";
  floatItem.innerHTML = `
    <div class="setting-info">
      <div class="setting-name">📌 Modo Flutuante</div>
      <div class="setting-desc">Abre o popup como janela arastável ao clicar na extensão</div>
    </div>
    <label class="toggle">
      <input type="checkbox" id="toggle-float" ${config.floatMode ? "checked" : ""}>
      <div class="slider"></div>
    </label>
  `;
  list.appendChild(floatItem);

  list.querySelector("#toggle-float").addEventListener("change", (e) => {
    config.floatMode = e.target.checked;
    saveConfig();
  });

  const imgModeItem = document.createElement("div");
  imgModeItem.className = "setting-item";
  const isEditor = config.imageOutputMode !== "download";
  imgModeItem.innerHTML = `
    <div class="setting-info">
      <div class="setting-name">🖼️ Saída de Imagens</div>
      <div class="setting-desc" id="img-mode-desc">${isEditor ? "Abre no editor para recortar/anotar antes de salvar" : "Baixa a imagem diretamente"}</div>
    </div>
    <label class="toggle">
      <input type="checkbox" id="toggle-img-mode" ${isEditor ? "checked" : ""}>
      <div class="slider"></div>
    </label>
  `;
  list.appendChild(imgModeItem);

  list.querySelector("#toggle-img-mode").addEventListener("change", (e) => {
    config.imageOutputMode = e.target.checked ? "editor" : "download";
    document.getElementById("img-mode-desc").textContent = e.target.checked
      ? "Abre no editor para recortar/anotar antes de salvar"
      : "Baixa a imagem diretamente";
    saveConfig();
  });

  // Link para ferramentas ativas
  const linkItem = document.createElement("div");
  linkItem.className = "setting-item";
  linkItem.style.cursor = "pointer";
  linkItem.innerHTML = `
    <div class="setting-info">
      <div class="setting-name">🔧 Ferramentas Ativas</div>
      <div class="setting-desc">Ativar ou desativar ferramentas individualmente</div>
    </div>
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2.5">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  `;
  linkItem.addEventListener("click", () => {
    showView("view-features-toggle");
    buildFeaturesToggle();
  });
  list.appendChild(linkItem);

  // Link para atalhos rápidos
  const shortcutItem = document.createElement("div");
  shortcutItem.className = "setting-item";
  shortcutItem.style.cursor = "pointer";
  shortcutItem.innerHTML = `
    <div class="setting-info">
      <div class="setting-name">⌨️ Atalhos Rápidos</div>
      <div class="setting-desc">Configure atalhos de teclado para ferramentas</div>
    </div>
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2.5">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  `;
  shortcutItem.addEventListener("click", () => {
    showView("view-panel");
    const panel = document.getElementById("panel-content");
    panel.innerHTML = '<p class="empty">Carregando…</p>';
    loadShortcutsPanel(panel);
  });
  list.appendChild(shortcutItem);
}

function buildFeaturesToggle() {
  const list = document.getElementById("features-toggle-list");
  list.innerHTML = "";

  FEATURES.forEach((feature) => {
    const item = document.createElement("div");
    item.className = "setting-item";
    item.innerHTML = `
      <div class="setting-info">
        <div class="setting-name">${feature.icon} ${feature.name}</div>
        <div class="setting-desc">${feature.desc}</div>
      </div>
      <label class="toggle">
        <input type="checkbox" data-feature="${feature.id}" ${config[feature.id] ? "checked" : ""}>
        <div class="slider"></div>
      </label>
    `;
    list.appendChild(item);
  });

  list.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    input.addEventListener("change", (e) => {
      config[e.target.dataset.feature] = e.target.checked;
      saveConfig();
      chrome.tabs.sendMessage(activeTabId, { type: "CONFIG_UPDATED", config });
    });
  });
}

function fetchIframeCount() {
  if (!activeTabId) return;
  chrome.tabs.sendMessage(activeTabId, { type: "GET_IFRAMES" }, (response) => {
    if (chrome.runtime.lastError || !response) return;
    iframeCount = (response.urls || []).length;
    buildMenu();
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const { version } = chrome.runtime.getManifest();
  document.querySelectorAll(".logo-text").forEach((el) => {
    el.textContent = "Toolkit";
    const v = document.createElement("span");
    v.className = "logo-version";
    v.textContent = "v" + version;
    const wrap = document.createElement("span");
    wrap.className = "logo-name-wrap";
    el.replaceWith(wrap);
    wrap.appendChild(el);
    wrap.appendChild(v);
  });

  await loadConfig();

  // Se modo flutuante ativo e não é já uma janela popup, abre como popup e fecha este
  if (config.floatMode) {
    const currentWindow = await chrome.windows.getCurrent();
    if (currentWindow.type !== "popup") {
      chrome.windows.create({
        url: chrome.runtime.getURL("popup.html"),
        type: "popup",
        width: 380,
        height: 560,
      });
      window.close();
      return;
    }
  }

  document.getElementById("dot-close").addEventListener("click", () => window.close());

  document.getElementById("dot-float").addEventListener("click", () => {
    chrome.windows.create({
      url: chrome.runtime.getURL("popup.html"),
      type: "popup",
      width: 380,
      height: 560,
    });
    window.close();
  });

  document.getElementById("btn-settings").addEventListener("click", () => {
    showView("view-settings");
    buildSettings();
  });

  document.getElementById("btn-settings-back").addEventListener("click", async () => {
    await loadConfig();
    showView("view-menu");
    buildMenu();
    fetchIframeCount();
  });

  document.getElementById("btn-features-toggle-back").addEventListener("click", () => {
    showView("view-settings");
    buildSettings();
  });

  document.getElementById("btn-panel-back").addEventListener("click", async () => {
    await loadUsage();
    showView("view-menu");
    buildMenu();
    fetchIframeCount();
  });

  // Detecta se está em janela flutuante (popup)
  const curWin = await chrome.windows.getCurrent();
  const isFloating = curWin.type === "popup";

  let targetTabs;
  if (isFloating) {
    // Em modo flutuante, buscar a aba ativa da janela normal do navegador
    const allWindows = await chrome.windows.getAll({ windowTypes: ["normal"] });
    const normalWin = allWindows.find(w => w.focused) || allWindows[allWindows.length - 1];
    targetTabs = normalWin
      ? await new Promise(r => chrome.tabs.query({ active: true, windowId: normalWin.id }, r))
      : [];
  } else {
    targetTabs = await new Promise(r => chrome.tabs.query({ active: true, currentWindow: true }, r));
  }

  const tab = targetTabs[0];
  activeTabId = tab?.id;

  // Populate site bar
  document.getElementById("site-title").textContent = tab?.title || "";
  try {
    document.getElementById("site-url").textContent = new URL(tab?.url || "").hostname || tab?.url || "";
  } catch { document.getElementById("site-url").textContent = tab?.url || ""; }
  if (tab?.favIconUrl) {
    const fav = document.getElementById("site-favicon");
    fav.src = tab.favIconUrl;
    fav.style.display = "block";
  }

  await loadUsage();
  buildMenu();
  fetchIframeCount();
  chrome.runtime.sendMessage({ type: "SR_GET_STATE" }, (state) => {
    if (chrome.runtime.lastError) return;
    const wasRecording = srIsRecording;
    srIsRecording = !!(state && state.recording);
    if (srIsRecording !== wasRecording) buildMenu();
  });
});
