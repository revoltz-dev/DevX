(function () {
  const script = document.currentScript;
  const mode = script?.dataset?.mode || "all";
  const revoltzState = window.__revoltzUnprotectState || (window.__revoltzUnprotectState = {});

  if (mode === "all" || mode === "rightclick") {
    document.oncontextmenu = null;
    window.oncontextmenu = null;
    if (!revoltzState.originalAddEventListener) {
      revoltzState.originalAddEventListener = EventTarget.prototype.addEventListener;
    }
    if (!revoltzState.rightclickPatched) {
      const blocked = ["contextmenu", "selectstart", "dragstart", "mousedown"];
      const origAdd = revoltzState.originalAddEventListener;
      EventTarget.prototype.addEventListener = function (type, fn, opts) {
        if (blocked.includes(type)) return;
        return origAdd.call(this, type, fn, opts);
      };
      revoltzState.rightclickPatched = true;
    }
  }

  if (mode === "all" || mode === "console") {
    if (!revoltzState.originalSetInterval) {
      revoltzState.originalSetInterval = window.setInterval;
    }
    if (!revoltzState.consolePatched) {
      const origSetInterval = revoltzState.originalSetInterval;
      window.setInterval = function (fn, ms, ...args) {
        const fnStr = typeof fn === "function" ? fn.toString() : String(fn);
        if (fnStr.includes("debugger") || fnStr.includes("console")) return 0;
        return origSetInterval.call(this, fn, ms, ...args);
      };

      const handler = {
        get(target, prop) {
          return target[prop];
        },
      };
      try { window.console = new Proxy(console, handler); } catch (e) {}
      revoltzState.consolePatched = true;
    }
  }

  if (mode === "all" || mode === "select") {
    document.onselectstart = null;
    document.ondragstart = null;
  }

  if (mode === "all" || mode === "copy") {
    document.oncopy = null;
    document.oncut = null;
    document.onpaste = null;
  }
})();
