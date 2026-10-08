const ICONS = {
  chevronDown: '<path d="M6 9l6 6 6-6"/>',
  megaphone: '<path d="M3 11v2a1 1 0 001 1h2l4 4V6L6 10H4a1 1 0 00-1 1z"/><path d="M15 8a4 4 0 010 8"/>',
  triangle: '<path d="M10.3 4.5L2.8 17a2 2 0 001.7 3h15a2 2 0 001.7-3L13.7 4.5a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  circleAlert: '<circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/>',
  square: '<rect x="3" y="5" width="18" height="14" rx="2"/>',
  sparkle: '<path d="M5 3v4M3 5h4M6 17v4M4 19h4"/><path d="M13 4l2.5 6.5L22 13l-6.5 2.5L13 22l-2.5-6.5L4 13l6.5-2.5z"/>',
  user: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0114 0"/>',
  users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0112 0"/><path d="M16 5.5a3.2 3.2 0 010 6M17 20a6 6 0 00-2-4.4"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>',
  tag: '<path d="M3 12V5a2 2 0 012-2h7l9 9-9 9-9-9z"/><circle cx="8" cy="8" r="1.4"/>',
  dashedSquare: '<path d="M4 7V5h3M20 7V5h-3M4 17v2h3M20 17v2h-3M4 10v4M20 10v4M10 5h4M10 19h4"/>',
  chevronRight: '<path d="M9 6l6 6-6 6"/>',
  cursor: '<path d="M4 3l7 17 2.5-6.5L20 11 4 3z"/>',
  gridSmall: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="M2 10h20"/>',
  carousel: '<rect x="6" y="5" width="12" height="14" rx="2"/><path d="M3 8v8M21 8v8"/>',
  checkSquare: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12.5l2.5 2.5L16 9.5"/>',
  listCheck: '<path d="M4 7l2 2 3-3M4 16l2 2 3-3M13 8h7M13 17h7"/>',
  code: '<path d="M9 7l-5 5 5 5M15 7l5 5-5 5"/>',
  collapse: '<path d="M8 9l4-4 4 4M8 15l4 4 4-4"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
  terminal: '<path d="M5 7l5 5-5 5M12 19h7"/>',
  pointer: '<path d="M4 3l7 17 2.5-6.5L20 11 4 3z"/>',
  clipboard: '<rect x="8" y="3" width="8" height="4" rx="1.2"/><path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h8M16 5h2a2 2 0 012 2v6"/><path d="M14 17h7M18 14l3 3-3 3"/>',
  hash: '<path d="M5 9h14M5 15h14M10 4L8 20M16 4l-2 16"/>',
  creditCard: '<rect x="2.5" y="5.5" width="19" height="13" rx="2.5"/><path d="M2.5 10h19M6 15h4"/>',
  table: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M3 14.5h18M9 9v11M15 9v11"/>'
};

const COMPONENTS = [
  ['Accordion', 'chevronDown'],
  ['Announcement', 'megaphone'],
  ['Alert Dialog', 'triangle'],
  ['Alert', 'circleAlert'],
  ['Aspect Ratio', 'square'],
  ['Autocomplete', 'sparkle'],
  ['Avatar', 'user'],
  ['Avatar Group', 'users'],
  ['Avatar Stack', 'layers'],
  ['Badge', 'tag'],
  ['Border Button', 'dashedSquare'],
  ['Breadcrumb', 'chevronRight'],
  ['Button', 'cursor'],
  ['Button Group', 'gridSmall'],
  ['Calendar', 'calendar'],
  ['Card', 'card'],
  ['Carousel', 'carousel'],
  ['Checkbox', 'checkSquare'],
  ['Choicebox', 'listCheck'],
  ['Code Block', 'code'],
  ['Collapsible', 'collapse'],
  ['Combobox', 'search'],
  ['Command', 'terminal'],
  ['Context Menu', 'pointer'],
  ['Copy Clipboard', 'clipboard'],
  ['Counter', 'hash'],
  ['Credit Card', 'creditCard'],
  ['Data Table', 'table']
];

const grid = document.getElementById('componentGrid');
grid.innerHTML = COMPONENTS.map(([label, icon]) => `
  <a class="cell" href="#">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[icon]}</svg>
    <span>${label}</span>
  </a>`).join('');

const track = document.getElementById('track');
const panels = Array.from(document.querySelectorAll('.panel'));
const dots = Array.from(document.querySelectorAll('.dot'));
const hint = document.getElementById('hint');
const nav = document.querySelector('.nav');

const SLIDE_MS = 950;
const QUIET_MS = 160;
const SWIPE_MIN = 45;

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const stacked = () => window.matchMedia('(max-width: 860px)').matches;

let index = 0;
let locked = false;
let lockedAt = 0;
let quietTimer = null;
let touchStartY = 0;
let touchStartX = 0;

function render() {
  const width = panels[0].offsetWidth;
  track.style.transform = `translate3d(${-index * width}px, 0, 0)`;
  panels.forEach((panel, i) => panel.classList.toggle('is-active', i === index));
  dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
  nav.classList.toggle('is-stuck', index > 0);
  hint.classList.toggle('is-hidden', index > 0);
}

function go(next) {
  const target = Math.min(panels.length - 1, Math.max(0, next));
  if (target === index) return;
  index = target;
  locked = true;
  lockedAt = Date.now();
  render();
}

function settle() {
  if (Date.now() - lockedAt >= (reduceMotion ? 0 : SLIDE_MS)) locked = false;
}

function onWheel(event) {
  if (stacked()) return;
  event.preventDefault();
  clearTimeout(quietTimer);
  quietTimer = setTimeout(settle, QUIET_MS);
  if (locked) return;
  const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
  if (Math.abs(delta) < 6) return;
  go(index + (delta > 0 ? 1 : -1));
}

function onKey(event) {
  if (stacked()) return;
  const next = { ArrowRight: 1, ArrowDown: 1, PageDown: 1, ' ': 1, ArrowLeft: -1, ArrowUp: -1, PageUp: -1 };
  if (event.key === 'Home') { event.preventDefault(); go(0); return; }
  if (event.key === 'End') { event.preventDefault(); go(panels.length - 1); return; }
  if (!(event.key in next)) return;
  event.preventDefault();
  if (locked) return;
  go(index + next[event.key]);
}

function onTouchStart(event) {
  touchStartY = event.touches[0].clientY;
  touchStartX = event.touches[0].clientX;
}

function onTouchEnd(event) {
  if (stacked() || locked) return;
  const dy = touchStartY - event.changedTouches[0].clientY;
  const dx = touchStartX - event.changedTouches[0].clientX;
  const delta = Math.abs(dx) > Math.abs(dy) ? dx : dy;
  if (Math.abs(delta) < SWIPE_MIN) return;
  go(index + (delta > 0 ? 1 : -1));
}

function onResize() {
  if (stacked()) {
    track.style.transform = '';
    panels.forEach((panel) => panel.classList.add('is-active'));
    return;
  }
  const previous = track.style.transition;
  track.style.transition = 'none';
  render();
  void track.offsetWidth;
  track.style.transition = previous;
}

dots.forEach((dot) => dot.addEventListener('click', () => go(Number(dot.dataset.goto))));

window.addEventListener('wheel', onWheel, { passive: false });
window.addEventListener('keydown', onKey);
window.addEventListener('touchstart', onTouchStart, { passive: true });
window.addEventListener('touchend', onTouchEnd, { passive: true });
window.addEventListener('resize', onResize);
track.addEventListener('transitionend', settle);

onResize();
render();
