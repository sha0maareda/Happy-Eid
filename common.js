// ========================
// SHARED UTILITIES
// ========================

// YouTube music player
let ytPlayer = null;
let ytReady  = false;
let ytMuted  = false;

const ytTag = document.createElement('script');
ytTag.src = 'https://www.youtube.com/iframe_api';
document.head.appendChild(ytTag);

window.onYouTubeIframeAPIReady = function () {
  const div = document.createElement('div');
  div.id = 'yt-frame';
  div.style.cssText = 'position:fixed;bottom:-200px;left:-200px;width:1px;height:1px;';
  document.body.appendChild(div);

  ytPlayer = new YT.Player('yt-frame', {
    height: '1', width: '1',
    videoId: 'DcArtUUQxkk',
    playerVars: { autoplay: 0, loop: 1, playlist: 'DcArtUUQxkk', controls: 0, mute: 0 },
    events: {
      onReady: () => {
        ytReady = true;
        // auto-play once ready (browser may block without gesture)
        try { ytPlayer.playVideo(); } catch(e) {}
      }
    }
  });
};

function playMusic() {
  if (ytReady && ytPlayer) {
    try { ytPlayer.playVideo(); } catch(e) {}
    const btn = document.getElementById('music-btn');
    if (btn) btn.style.display = 'block';
  } else {
    // retry after a moment if API not ready yet
    setTimeout(playMusic, 1200);
  }
}

function stopMusic() {
  if (ytReady && ytPlayer) try { ytPlayer.stopVideo(); } catch(e) {}
  const btn = document.getElementById('music-btn');
  if (btn) btn.style.display = 'none';
}

function toggleMusic() {
  if (!ytPlayer) return;
  const btn = document.getElementById('music-btn');
  if (ytMuted) {
    ytPlayer.unMute();
    if (btn) btn.textContent = '🔊 كتم';
  } else {
    ytPlayer.mute();
    if (btn) btn.textContent = '🔇 تشغيل';
  }
  ytMuted = !ytMuted;
}

// ========================
// CONFETTI
// ========================
function launchConfetti() {
  const colors = ['#d4a017','#f0c040','#27923e','#e74c3c','#ffffff','#f39c12','#9b59b6'];
  for (let i = 0; i < 90; i++) {
    setTimeout(() => {
      const d = document.createElement('div');
      d.className = 'confetti-piece';
      d.style.left   = (Math.random() * 100) + 'vw';
      d.style.top    = '-12px';
      d.style.width  = (7 + Math.random() * 9) + 'px';
      d.style.height = (7 + Math.random() * 9) + 'px';
      d.style.background = colors[Math.floor(Math.random() * colors.length)];
      d.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      d.style.animationDuration = (1.8 + Math.random() * 2) + 's';
      d.style.animationDelay    = (Math.random() * 0.6) + 's';
      document.body.appendChild(d);
      setTimeout(() => d.remove(), 4000);
    }, i * 25);
  }
}
