/* ---------------- gate / mend ---------------- */
const gate = document.getElementById('gate');
const gateVessel = document.getElementById('gate-vessel');
const openBtn = document.getElementById('open-btn');
const laterBtn = document.getElementById('later-btn');
const gateButtons = document.getElementById('gate-buttons');
const laterMsg = document.getElementById('later-msg');
const main = document.getElementById('main');
const musicWidget = document.getElementById('music-widget');

let opened = false;

function openLetter() {
    if (opened) return;
    opened = true;
    gateVessel.classList.add('mended');
    setTimeout(() => {
        gate.classList.add('fading');
        setTimeout(() => {
            gate.style.display = 'none';
            main.style.display = 'block';
            musicWidget.classList.remove('hidden');
            requestAnimationFrame(() => { main.style.opacity = '1'; });
        }, 1150);
    }, 1100);
}

openBtn.addEventListener('click', openLetter);
laterBtn.addEventListener('click', () => {
    gateButtons.classList.add('hidden');
    laterMsg.classList.remove('hidden');
});

/* ---------------- music widget ---------------- */
const audio = document.getElementById('bg-audio');
const mCover = document.getElementById('m-cover');
const mTitle = document.getElementById('m-title');
const mArtist = document.getElementById('m-artist');
const mPlay = document.getElementById('m-play');
const mPrev = document.getElementById('m-prev');
const mNext = document.getElementById('m-next');
const seekBar = document.getElementById('seek-bar');
const mCurrent = document.getElementById('m-current');
const mDuration = document.getElementById('m-duration');
const tracks = document.querySelectorAll('.track');

let currentTrack = 0;
let isSeeking = false;

function parseTimestamp(ts) {
    if (!ts) return 0;
    const parts = ts.split(':');
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
}

function loadTrack(index) {
    currentTrack = index;
    const track = tracks[index];
    audio.src = track.dataset.src;
    mCover.src = track.dataset.cover;
    mTitle.textContent = track.dataset.title;
    mArtist.textContent = track.dataset.artist;
    
    audio.currentTime = parseTimestamp(track.dataset.start || "0:00");
    audio.play().catch(() => { mPlay.textContent = '▶'; });
}

tracks.forEach((track, index) => {
    track.addEventListener('click', () => loadTrack(index));
    track.addEventListener('keypress', (e) => { if (e.key === 'Enter') loadTrack(index); });
});

mPlay.addEventListener('click', () => {
    if (audio.paused) audio.play();
    else audio.pause();
});

mPrev.addEventListener('click', () => loadTrack((currentTrack - 1 + tracks.length) % tracks.length));
mNext.addEventListener('click', () => loadTrack((currentTrack + 1) % tracks.length));

if (seekBar) {
    seekBar.addEventListener('input', () => { isSeeking = true; });
    seekBar.addEventListener('change', () => {
        if (audio.duration) audio.currentTime = (seekBar.value / 100) * audio.duration;
        isSeeking = false;
    });
}

audio.addEventListener('timeupdate', () => {
    if (audio.duration && !isSeeking) {
        seekBar.value = (audio.currentTime / audio.duration) * 100;
        mCurrent.textContent = formatTime(audio.currentTime);
    }
});

function formatTime(s) {
    if (!isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
}

audio.addEventListener('loadedmetadata', () => { mDuration.textContent = formatTime(audio.duration); });
audio.addEventListener('pause', () => { mPlay.textContent = '▶'; });
audio.addEventListener('play', () => { mPlay.textContent = '⏸'; });
audio.addEventListener('ended', () => { loadTrack((currentTrack + 1) % tracks.length); });

/* ---------------- scroll reveal ---------------- */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        entry.target.classList.toggle('in-view', entry.isIntersecting);
    });
}, { threshold: 0.2 });

document.querySelectorAll('#main section').forEach(s => observer.observe(s));
