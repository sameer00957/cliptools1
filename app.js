const input = document.getElementById('videoInput');
const video = document.getElementById('video');
const editor = document.getElementById('editor');
const dropZone = document.getElementById('dropZone');
const statusBox = document.getElementById('status');
const fileName = document.getElementById('fileName');
const fileInfo = document.getElementById('fileInfo');
const panels = {
  download: document.getElementById('downloadPanel'),
  trim: document.getElementById('trimPanel'),
  thumbnail: document.getElementById('thumbnailPanel'),
  gif: document.getElementById('gifPanel')
};
let currentTool = 'download';
let currentFile = null;
let objectUrl = null;

document.getElementById('year').textContent = new Date().getFullYear();

function message(text) { statusBox.textContent = text; }
function prettySize(bytes) {
  if (!bytes) return '0 B';
  const units = ['B','KB','MB','GB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / Math.pow(1024,index)).toFixed(index ? 1 : 0)} ${units[index]}`;
}
function formatTime(seconds) {
  const s = Math.max(0, Number(seconds) || 0);
  return `${Math.floor(s / 60)}:${(s % 60).toFixed(1).padStart(4,'0')}`;
}
function setTool(tool) {
  currentTool = tool;
  document.querySelectorAll('.tool-card').forEach(card => card.classList.toggle('active', card.dataset.tool === tool));
  Object.entries(panels).forEach(([name, panel]) => panel.classList.toggle('hidden', name !== tool));
  const titles = {download:'Video Preview & Download',trim:'Video Trimmer',thumbnail:'Thumbnail Maker',gif:'Video to GIF'};
  document.getElementById('toolHeading').textContent = titles[tool];
  message('');
  document.getElementById('workspace').scrollIntoView({behavior:'smooth',block:'start'});
}
document.querySelectorAll('.tool-card').forEach(card => card.addEventListener('click', () => setTool(card.dataset.tool)));

function loadFile(file) {
  if (!file) return;
  if (!file.type.startsWith('video/')) { message('Please choose a video file.'); return; }
  if (objectUrl) URL.revokeObjectURL(objectUrl);
  currentFile = file;
  objectUrl = URL.createObjectURL(file);
  video.src = objectUrl;
  fileName.textContent = file.name;
  fileInfo.textContent = `${prettySize(file.size)} · Loading video details…`;
  dropZone.classList.add('hidden');
  editor.classList.remove('hidden');
  message('Your video is ready to use in this browser.');
  video.onloadedmetadata = () => {
    fileInfo.textContent = `${prettySize(file.size)} · ${formatTime(video.duration)} · ${video.videoWidth}×${video.videoHeight}`;
    document.getElementById('endTime').value = Math.min(5, video.duration || 5);
    document.getElementById('endTime').max = video.duration || 5;
    document.getElementById('startTime').max = video.duration || 5;
  };
}
input.addEventListener('change', event => loadFile(event.target.files[0]));
document.getElementById('resetBtn').addEventListener('click', () => {
  video.pause(); video.removeAttribute('src'); video.load();
  if (objectUrl) URL.revokeObjectURL(objectUrl);
  objectUrl = null; currentFile = null; input.value = '';
  editor.classList.add('hidden'); dropZone.classList.remove('hidden'); message('');
});
document.getElementById('downloadBtn').addEventListener('click', () => {
  if (!currentFile) return;
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = currentFile.name;
  document.body.appendChild(link); link.click(); link.remove();
  message('Download started. Check your browser downloads.');
});
document.getElementById('previewTrimBtn').addEventListener('click', async () => {
  if (!currentFile) return;
  const start = Number(document.getElementById('startTime').value);
  const end = Number(document.getElementById('endTime').value);
  if (start < 0 || end <= start || end > video.duration) {
    message('Please enter a valid start and end time within the video duration.'); return;
  }
  video.currentTime = start;
  try { await video.play(); } catch (_) {}
  message(`Previewing from ${formatTime(start)} to ${formatTime(end)}. This demo previews only; it does not export a trimmed file.`);
  const stopAt = () => {
    if (video.currentTime >= end) { video.pause(); video.removeEventListener('timeupdate', stopAt); }
  };
  video.addEventListener('timeupdate', stopAt);
});
document.getElementById('captureBtn').addEventListener('click', () => {
  if (!video.videoWidth || video.readyState < 2) { message('Play or load the video first, then pause on the frame you want.'); return; }
  const canvas = document.getElementById('thumbCanvas');
  const maxWidth = 1280;
  const scale = Math.min(1, maxWidth / video.videoWidth);
  canvas.width = Math.round(video.videoWidth * scale);
  canvas.height = Math.round(video.videoHeight * scale);
  const context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const link = document.getElementById('imageDownload');
  link.href = canvas.toDataURL('image/png');
  link.classList.remove('hidden');
  message('Thumbnail captured. Use “Save thumbnail PNG” to download it.');
});
const drop = document.getElementById('dropZone');
drop.addEventListener('dragover', e => { e.preventDefault(); drop.style.borderColor = '#9b8cff'; });
drop.addEventListener('dragleave', () => { drop.style.borderColor = ''; });
drop.addEventListener('drop', e => {
  e.preventDefault(); drop.style.borderColor = '';
  loadFile(e.dataTransfer.files[0]);
});
window.addEventListener('beforeunload', () => { if (objectUrl) URL.revokeObjectURL(objectUrl); });
