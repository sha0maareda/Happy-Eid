// ========================
// WELCOME PAGE JS
// ========================

const nameInput = document.getElementById('player-name');
const startBtn  = document.getElementById('start-btn');
let selectedGame = 1;

nameInput.addEventListener('input', () => {
  startBtn.disabled = nameInput.value.trim().length === 0;
});
nameInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !startBtn.disabled) goPlay();
});

function selectGame(n) {
  selectedGame = n;
  document.getElementById('btn-g1').classList.toggle('selected', n === 1);
  document.getElementById('btn-g2').classList.toggle('selected', n === 2);
}

function goPlay() {
  const name = nameInput.value.trim();
  if (!name) return;
  sessionStorage.setItem('eid_name', name);
  sessionStorage.setItem('eid_game', selectedGame);
  window.location.href = selectedGame === 1 ? 'catch.html' : 'runner.html';
}

// ========================
// BALLOONS
// ========================
const balloonColors = ['🎈','🎈','🎈','🎈','🎉','🎊','🌙','⭐'];
const balloonEls = [];
const bc = document.getElementById('balloons-container');

for (let i = 0; i < 14; i++) {
  const b = document.createElement('div');
  b.className = 'balloon';
  b.textContent = balloonColors[Math.floor(Math.random() * balloonColors.length)];
  b.style.left = (Math.random() * 100) + '%';
  b.style.animationDuration = (8 + Math.random() * 10) + 's';
  b.style.animationDelay = (Math.random() * 10) + 's';
  b.style.fontSize = (1.5 + Math.random() * 1.5) + 'rem';
  bc.appendChild(b);
}

// ========================
// STARS
// ========================
const sc = document.getElementById('stars-container');
for (let i = 0; i < 40; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  const size = 2 + Math.random() * 3;
  s.style.width = size + 'px';
  s.style.height = size + 'px';
  s.style.left = (Math.random() * 100) + '%';
  s.style.top  = (Math.random() * 60) + '%';
  s.style.animationDuration = (2 + Math.random() * 3) + 's';
  s.style.animationDelay    = (Math.random() * 3) + 's';
  sc.appendChild(s);
}

// ========================
// SHEEP HERO DRAWING
// ========================
const sc2 = document.getElementById('sheepCanvas');
const ctx2 = sc2.getContext('2d');
let sheepFrame = 0;

function drawHeroSheep() {
  const c = ctx2;
  const W = sc2.width, H = sc2.height;
  c.clearRect(0, 0, W, H);

  const t = Date.now() / 1000;
  const bounce = Math.sin(t * 2) * 4;
  const legSwing = Math.sin(t * 5);

  // Shadow
  c.fillStyle = 'rgba(0,0,0,0.18)';
  c.beginPath();
  c.ellipse(90, H - 12 + bounce * 0.3, 50, 8, 0, 0, Math.PI * 2);
  c.fill();

  // Body (fluffy)
  c.fillStyle = '#f0ede0';
  c.beginPath();
  c.ellipse(90, H - 55 + bounce, 52, 35, 0, 0, Math.PI * 2);
  c.fill();

  // Fluffy bumps on body
  const bumpPositions = [
    [55, H - 72 + bounce, 18],
    [75, H - 78 + bounce, 20],
    [98, H - 80 + bounce, 22],
    [118, H - 74 + bounce, 18],
    [132, H - 65 + bounce, 15],
    [50, H - 58 + bounce, 14],
    [138, H - 55 + bounce, 13],
  ];
  c.fillStyle = '#e8e5d8';
  bumpPositions.forEach(([bx, by, br]) => {
    c.beginPath();
    c.arc(bx, by, br, 0, Math.PI * 2);
    c.fill();
  });

  // Head
  c.fillStyle = '#d4c9a8';
  c.beginPath();
  c.ellipse(145, H - 65 + bounce, 22, 18, 0.2, 0, Math.PI * 2);
  c.fill();

  // Ear
  c.fillStyle = '#c4b898';
  c.beginPath();
  c.ellipse(158, H - 77 + bounce, 7, 12, 0.5, 0, Math.PI * 2);
  c.fill();

  // Eye
  c.fillStyle = '#2a1a0a';
  c.beginPath();
  c.arc(152, H - 67 + bounce, 3.5, 0, Math.PI * 2);
  c.fill();
  // Eye shine
  c.fillStyle = 'white';
  c.beginPath();
  c.arc(153.5, H - 68.5 + bounce, 1.2, 0, Math.PI * 2);
  c.fill();

  // Nose
  c.fillStyle = '#c4748a';
  c.beginPath();
  c.ellipse(157, H - 60 + bounce, 5, 3.5, 0.1, 0, Math.PI * 2);
  c.fill();

  // Horn
  c.strokeStyle = '#d4a017';
  c.lineWidth = 3;
  c.lineCap = 'round';
  c.beginPath();
  c.moveTo(148, H - 80 + bounce);
  c.quadraticCurveTo(155, H - 96 + bounce, 148, H - 100 + bounce);
  c.stroke();

  // Legs (4 legs, animated)
  c.strokeStyle = '#a09070';
  c.lineWidth = 6;
  c.lineCap = 'round';
  const legY = H - 22 + bounce;
  const legTop = H - 44 + bounce;
  // Front legs
  c.beginPath();
  c.moveTo(110, legTop);
  c.lineTo(110 + legSwing * 5, legY);
  c.stroke();
  c.beginPath();
  c.moveTo(125, legTop);
  c.lineTo(125 - legSwing * 5, legY);
  c.stroke();
  // Back legs
  c.beginPath();
  c.moveTo(65, legTop);
  c.lineTo(65 - legSwing * 5, legY);
  c.stroke();
  c.beginPath();
  c.moveTo(78, legTop);
  c.lineTo(78 + legSwing * 5, legY);
  c.stroke();

  // Hooves
  c.fillStyle = '#555';
  [[110 + legSwing * 5, legY],
   [125 - legSwing * 5, legY],
   [65 - legSwing * 5, legY],
   [78 + legSwing * 5, legY]].forEach(([hx, hy]) => {
    c.beginPath();
    c.ellipse(hx, hy + 1, 5, 3, 0, 0, Math.PI * 2);
    c.fill();
  });

  // Tail
  c.fillStyle = '#e8e5d8';
  c.beginPath();
  c.arc(40, H - 52 + bounce + Math.sin(t * 3) * 3, 10, 0, Math.PI * 2);
  c.fill();

  // Small flowers around sheep
  const flowerT = Date.now() * 0.001;
  drawFlower(c, 20, H - 15, flowerT);
  drawFlower(c, 160, H - 10, flowerT + 1);
  drawFlower(c, 5, H - 35, flowerT + 2);

  requestAnimationFrame(drawHeroSheep);
}

function drawFlower(c, x, y, t) {
  const r = 5 + Math.sin(t) * 1;
  c.fillStyle = '#f0c040';
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    c.beginPath();
    c.arc(x + Math.cos(a) * r, y + Math.sin(a) * r, 3, 0, Math.PI * 2);
    c.fill();
  }
  c.fillStyle = '#ff6b9d';
  c.beginPath();
  c.arc(x, y, 4, 0, Math.PI * 2);
  c.fill();
}

drawHeroSheep();
