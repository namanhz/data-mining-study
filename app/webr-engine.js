// WebR Engine – runs R code in the browser via WebAssembly
let webR = null;
let webRReady = false;
let webRLoading = false;

const REQUIRED_PACKAGES = ['dplyr', 'tidyr', 'ggplot2', 'gapminder'];

async function initWebR() {
  if (webRReady || webRLoading) return;
  webRLoading = true;

  updateStatusBar('⏳ Đang tải R engine...', false);

  try {
    const { WebR } = await import('https://webr.r-wasm.org/latest/webr.mjs');
    webR = new WebR();
    await webR.init();
    await webR.evalRVoid(`options(warn = -1)`);

    const loaded = [];
    for (const pkg of REQUIRED_PACKAGES) {
      updateStatusBar(`📦 Đang cài ${pkg}...`, false);
      try {
        await webR.installPackages([pkg], { quiet: true });
        await webR.evalRVoid(`library(${pkg})`);
        loaded.push(pkg);
      } catch (e) {
        console.warn(`Package ${pkg} not available:`, e.message);
      }
    }

    webRReady = true;
    webRLoading = false;
    updateStatusBar(`✅ R + packages sẵn sàng! (${loaded.join(', ')})`, true);
  } catch (err) {
    webRLoading = false;
    updateStatusBar('❌ Lỗi: ' + err.message, false);
    console.error('WebR init error:', err);
  }
}

function updateStatusBar(msg, ready) {
  const bar = document.getElementById('webr-status');
  const text = document.getElementById('webr-status-text');
  if (text) text.textContent = msg;
  if (bar) {
    bar.classList.toggle('ready', ready);
    bar.classList.toggle('hidden', false);
  }
}

async function runRCode(code, outputEl, statusEl) {
  if (!webRReady) {
    await initWebR();
    if (!webRReady) {
      outputEl.textContent = '❌ R engine chưa sẵn sàng. Vui lòng thử lại.';
      return;
    }
  }

  statusEl.textContent = '⏳ Đang chạy...';
  statusEl.style.display = 'block';
  outputEl.textContent = '';

  try {
    const shelter = await new webR.Shelter();
    try {
      const result = await shelter.captureR(code, {
        withAutoprint: true,
        captureStreams: true,
        captureConditions: true,
        captureGraphics: false
      });

      let output = '';
      const outputs = Array.isArray(result.output) ? result.output : [];
      for (const item of outputs) {
        if (item.type === 'stdout') output += item.data + '\n';
        else if (item.type === 'stderr') output += '⚠️ ' + item.data + '\n';
      }
      const conditions = Array.isArray(result.conditions) ? result.conditions : [];
      for (const cond of conditions) {
        if (cond.type === 'warning') output += '⚠️ Warning: ' + (cond.message || '') + '\n';
        else if (cond.type === 'error') output += '❌ Error: ' + (cond.message || '') + '\n';
        else if (cond.type === 'message') output += 'ℹ️ ' + (cond.message || '');
      }

      outputEl.textContent = output.trim() || '(Không có output)';
      statusEl.textContent = '✅ Hoàn thành!';
    } finally {
      shelter.purge();
    }
  } catch (err) {
    outputEl.textContent = '❌ Error: ' + err.message;
    statusEl.textContent = '❌ Lỗi';
  }

  setTimeout(() => { statusEl.style.display = 'none'; }, 2000);
}

async function runRCodeStepByStep(code, outputEl, statusEl, editorEl) {
  if (!webRReady) {
    await initWebR();
    if (!webRReady) {
      outputEl.textContent = '❌ R engine chưa sẵn sàng.';
      return;
    }
  }

  const rawLines = code.split('\n');
  const groups = [];
  let buffer = '';
  for (const line of rawLines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      if (buffer) { groups.push(buffer); buffer = ''; }
      continue;
    }
    buffer += (buffer ? '\n' : '') + line;
    const endsOpen = /[,+\-\*\/\|&%>~({]\s*$/.test(trimmed) || /%>%\s*$/.test(trimmed);
    if (!endsOpen) { groups.push(buffer); buffer = ''; }
  }
  if (buffer) groups.push(buffer);

  outputEl.textContent = '';
  let fullOutput = '';

  for (let i = 0; i < groups.length; i++) {
    const block = groups[i];
    const label = block.split('\n')[0].substring(0, 60);
    statusEl.textContent = `⏳ Block ${i + 1}/${groups.length}: ${label}...`;
    statusEl.style.display = 'block';

    if (editorEl && editorEl.tagName === 'TEXTAREA') {
      const idx = editorEl.value.indexOf(block);
      if (idx >= 0) { editorEl.setSelectionRange(idx, idx + block.length); editorEl.focus(); }
    }

    try {
      const shelter = await new webR.Shelter();
      try {
        const result = await shelter.captureR(block, {
          withAutoprint: true, captureStreams: true,
          captureConditions: true, captureGraphics: false
        });
        let lineOutput = '';
        const outputs = Array.isArray(result.output) ? result.output : [];
        for (const item of outputs) {
          if (item.type === 'stdout') lineOutput += item.data + '\n';
          else if (item.type === 'stderr') lineOutput += '⚠️ ' + item.data + '\n';
        }
        const conditions = Array.isArray(result.conditions) ? result.conditions : [];
        for (const cond of conditions) {
          if (cond.type === 'error') lineOutput += '❌ Error: ' + (cond.message || '') + '\n';
          else if (cond.type === 'warning') lineOutput += '⚠️ ' + (cond.message || '') + '\n';
        }
        const displayLine = block.includes('\n') ? block.split('\n')[0] + ' ...' : block;
        fullOutput += lineOutput.trim() ? `> ${displayLine}\n${lineOutput}` : `> ${displayLine}\n`;
      } finally { shelter.purge(); }
    } catch (err) {
      fullOutput += `> ${block.split('\n')[0]}\n❌ ${err.message}\n`;
    }

    outputEl.textContent = fullOutput;
    outputEl.scrollTop = outputEl.scrollHeight;
    await new Promise(r => setTimeout(r, 400));
  }

  statusEl.textContent = '✅ Hoàn thành!';
  setTimeout(() => { statusEl.style.display = 'none'; }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => initWebR(), 500);
});
