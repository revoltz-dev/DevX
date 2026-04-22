let mediaRecorder = null;
let recordedChunks = [];
let displayStream = null;
let micStream = null;
let audioCtx = null;
let startTime = 0;
let pausedTime = 0;
let isPaused = false;
let timerInterval = null;
let currentBlobUrl = null;
let selectedSource = "screen";

function showView(id) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function updateTimer() {
  if (isPaused) return;
  const elapsed = Date.now() - startTime;
  const hrs = String(Math.floor(elapsed / 3600000)).padStart(2, "0");
  const mins = String(Math.floor((elapsed % 3600000) / 60000)).padStart(2, "0");
  const secs = String(Math.floor((elapsed % 60000) / 1000)).padStart(2, "0");
  const el = document.getElementById("timer");
  if (el) el.textContent = `${hrs}:${mins}:${secs}`;
}

function startTimerLoop() {
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 500);
}

document.querySelectorAll("[data-source]").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll("[data-source]").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    selectedSource = tab.dataset.source;
  });
});

const micToggle = document.getElementById("mic-toggle");
const micSelect = document.getElementById("mic-select");
const micStatus = document.getElementById("mic-status");

micToggle.addEventListener("change", async () => {
  if (micToggle.checked) {
    micStatus.textContent = "Solicitando permissão…";
    micStatus.className = "mic-status";
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const devices = await navigator.mediaDevices.enumerateDevices();
      stream.getTracks().forEach(t => t.stop());
      const mics = devices.filter(d => d.kind === "audioinput" && d.deviceId);
      if (mics.length === 0) {
        micToggle.checked = false;
        micStatus.textContent = "Nenhum microfone encontrado";
        micStatus.className = "mic-status err";
        return;
      }
      micSelect.innerHTML = "";
      mics.forEach((mic, i) => {
        const opt = document.createElement("option");
        opt.value = mic.deviceId;
        opt.textContent = mic.label || `Microfone ${i + 1}`;
        micSelect.appendChild(opt);
      });
      micSelect.disabled = false;
      micStatus.textContent = `${mics.length} microfone(s) disponível(is)`;
      micStatus.className = "mic-status ok";
    } catch (e) {
      micToggle.checked = false;
      micStatus.textContent = "Permissão negada";
      micStatus.className = "mic-status err";
    }
  } else {
    micSelect.disabled = true;
    micSelect.innerHTML = '<option value="">Selecione o microfone</option>';
    micStatus.textContent = "";
  }
});

document.getElementById("btn-start").addEventListener("click", async () => {
  const wantSystemAudio = document.getElementById("system-audio").checked;
  const wantMic = micToggle.checked;
  const micDeviceId = micSelect.value;
  const surfaceMap = { screen: "monitor", window: "window", tab: "browser" };
  const displaySurface = surfaceMap[selectedSource] || "monitor";

  const btn = document.getElementById("btn-start");
  btn.textContent = "⏳ Aguardando seleção…";
  btn.disabled = true;

  try {
    displayStream = await navigator.mediaDevices.getDisplayMedia({
      video: { displaySurface },
      audio: !!wantSystemAudio
    });
  } catch (e) {
    btn.textContent = "🔴 Iniciar Gravação";
    btn.disabled = false;
    return;
  }

  displayStream.getVideoTracks().forEach(track => {
    track.addEventListener("ended", () => {
      if (mediaRecorder && mediaRecorder.state !== "inactive") stopRecording();
    });
  });

  const videoTracks = displayStream.getVideoTracks();
  const systemAudioTracks = displayStream.getAudioTracks();

  if (wantMic && micDeviceId) {
    try {
      micStream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId: { exact: micDeviceId } } });
    } catch (e) {
      micStream = null;
    }
  }

  let finalStream;
  if (systemAudioTracks.length > 0 || micStream) {
    audioCtx = new AudioContext();
    const dest = audioCtx.createMediaStreamDestination();
    if (systemAudioTracks.length > 0) {
      audioCtx.createMediaStreamSource(new MediaStream(systemAudioTracks)).connect(dest);
    }
    if (micStream) {
      audioCtx.createMediaStreamSource(micStream).connect(dest);
    }
    finalStream = new MediaStream([...videoTracks, ...dest.stream.getAudioTracks()]);
  } else {
    finalStream = new MediaStream(videoTracks);
  }

  const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=h264")
    ? "video/webm;codecs=h264"
    : MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9"
      : "video/webm";

  recordedChunks = [];
  mediaRecorder = new MediaRecorder(finalStream, { mimeType });

  mediaRecorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) recordedChunks.push(e.data);
  };

  mediaRecorder.onstop = async () => {
    showView("view-processing");
    const blob = new Blob(recordedChunks, { type: mimeType });
    chrome.runtime.sendMessage({ type: "SR_STOPPED" });
    if (currentBlobUrl) URL.revokeObjectURL(currentBlobUrl);
    currentBlobUrl = URL.createObjectURL(blob);
    document.getElementById("preview").src = currentBlobUrl;
    const sizeMB = (blob.size / (1024 * 1024)).toFixed(2);
    document.getElementById("file-info").textContent = `${sizeMB} MB • ${mimeType}`;
    await storeBlobInIDB(blob);
    cleanup();
    showView("view-done");
  };

  mediaRecorder.onerror = () => {
    chrome.runtime.sendMessage({ type: "SR_STOPPED" });
    cleanup();
    resetSetupUI();
    showView("view-setup");
  };

  mediaRecorder.start(1000);
  startTime = Date.now();
  pausedTime = 0;
  isPaused = false;

  chrome.runtime.sendMessage({ type: "SR_RECORDING_STARTED", startTime });
  showView("view-recording");
  startTimerLoop();
});

document.getElementById("btn-pause").addEventListener("click", () => {
  if (!mediaRecorder) return;
  if (mediaRecorder.state === "recording") {
    mediaRecorder.pause();
    isPaused = true;
    pausedTime = Date.now();
    document.getElementById("btn-pause").textContent = "▶️ Retomar";
    document.getElementById("rec-label").textContent = "PAUSADO";
    document.getElementById("rec-label").style.color = "#febc2e";
    document.getElementById("rec-dot").style.background = "#febc2e";
    document.getElementById("rec-dot").style.boxShadow = "0 0 4px #febc2e";
    document.getElementById("rec-dot").classList.remove("blink");
    chrome.runtime.sendMessage({ type: "SR_PAUSED" });
  } else if (mediaRecorder.state === "paused") {
    mediaRecorder.resume();
    if (pausedTime > 0) startTime += (Date.now() - pausedTime);
    isPaused = false;
    pausedTime = 0;
    document.getElementById("btn-pause").textContent = "⏸️ Pausar";
    document.getElementById("rec-label").textContent = "GRAVANDO";
    document.getElementById("rec-label").style.color = "#ff5f57";
    document.getElementById("rec-dot").style.background = "#ff5f57";
    document.getElementById("rec-dot").style.boxShadow = "0 0 4px #ff5f57";
    document.getElementById("rec-dot").classList.add("blink");
    chrome.runtime.sendMessage({ type: "SR_RESUMED" });
  }
});

document.getElementById("btn-stop").addEventListener("click", () => {
  stopRecording();
});

function stopRecording() {
  clearInterval(timerInterval);
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
  }
}

document.getElementById("btn-download").addEventListener("click", () => {
  if (!currentBlobUrl) return;
  const a = document.createElement("a");
  a.href = currentBlobUrl;
  const now = new Date();
  const ts = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;
  a.download = `DevX_Gravacao_${ts}.webm`;
  a.click();
});

document.getElementById("btn-new").addEventListener("click", () => {
  if (currentBlobUrl) URL.revokeObjectURL(currentBlobUrl);
  currentBlobUrl = null;
  resetSetupUI();
  chrome.runtime.sendMessage({ type: "SR_NEW" });
  showView("view-setup");
});

function resetSetupUI() {
  document.getElementById("timer").textContent = "00:00:00";
  document.getElementById("btn-start").textContent = "🔴 Iniciar Gravação";
  document.getElementById("btn-start").disabled = false;
  document.getElementById("btn-pause").textContent = "⏸️ Pausar";
  document.getElementById("rec-label").textContent = "GRAVANDO";
  document.getElementById("rec-label").style.color = "#ff5f57";
  document.getElementById("rec-dot").style.background = "#ff5f57";
  document.getElementById("rec-dot").style.boxShadow = "0 0 4px #ff5f57";
  document.getElementById("rec-dot").classList.add("blink");
}

function cleanup() {
  if (displayStream) displayStream.getTracks().forEach(t => t.stop());
  if (micStream) micStream.getTracks().forEach(t => t.stop());
  if (audioCtx && audioCtx.state !== "closed") audioCtx.close();
  displayStream = null;
  micStream = null;
  audioCtx = null;
}

function storeBlobInIDB(blob) {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("DevXRecorder", 1);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("recordings")) db.createObjectStore("recordings");
    };
    req.onsuccess = (e) => {
      const db = e.target.result;
      const tx = db.transaction("recordings", "readwrite");
      tx.objectStore("recordings").put(blob, "latest");
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = () => { db.close(); reject(tx.error); };
    };
    req.onerror = () => reject(req.error);
  });
}

window.addEventListener("beforeunload", () => {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    stopRecording();
  }
});

setInterval(() => {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    chrome.runtime.sendMessage({ type: "SR_HEARTBEAT" });
  }
}, 25000);
