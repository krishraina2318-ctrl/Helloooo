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
const musicNote = document.getElementById('music-note');

const tracks = Array.from(document.querySelectorAll('.track')).map(el => ({
    src: el.dataset.src,
    title: el.dataset.title,
    artist: el.dataset.artist,
    cover: el.dataset.cover
}));

let currentTrack = -1;
let isSeeking = false;

function formatTime(s) {
    if (!isFinite(s)) return '0:00';
    const min = Math.floor(s / 60);
    let sec = Math.floor(s % 60);
    if (sec < 10) sec = '0' + sec;
    return `${min}:${sec}`;
}

function showNote(text) {
    musicNote.textContent = text;
    musicNote.classList.add('show');
}
function hideNote() {
    musicNote.classList.remove('show');
}

function loadTrack(index) {
    if (index < 0 || index >= tracks.length) return;
    currentTrack = index;
    const t = tracks[index];

    musicWidget.classList.remove('hidden');
    mTitle.textContent = t.title;
    mArtist.textContent = t.artist;
    mCover.src = t.cover;
    hideNote();

    audio.src = t.src;
    audio.play().then(() => {
        mPlay.textContent = '⏸';
    }).catch(() => {
        showNote('song not added yet — drop it into assets/audio');
        mPlay.textContent = '▶';
    });
}

document.querySelectorAll('.track').forEach((el, i) => {
    el.addEventListener('click', () => loadTrack(i));
    el.addEventListener('keypress', (e) => { if (e.key === 'Enter') loadTrack(i); });
});

mPlay.addEventListener('click', () => {
    if (currentTrack === -1) { if (tracks.length) loadTrack(0); return; }
    if (audio.paused) {
        audio.play().then(() => mPlay.textContent = '⏸').catch(() => showNote('song not added yet — drop it into assets/audio'));
    } else {
        audio.pause();
        mPlay.textContent = '▶';
    }
});

mNext.addEventListener('click', () => {
    if (!tracks.length) return;
    loadTrack((currentTrack + 1) % tracks.length);
});
mPrev.addEventListener('click', () => {
    if (!tracks.length) return;
    loadTrack((currentTrack - 1 + tracks.length) % tracks.length);
});

if (seekBar) {
    seekBar.addEventListener('input', () => { isSeeking = true; });
    seekBar.addEventListener('change', () => {
        if (audio.duration) audio.currentTime = (seekBar.value / 100) * audio.duration;
        isSeeking = false;
    });
}

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        if (!isSeeking) seekBar.value = (audio.currentTime / audio.duration) * 100;
        mCurrent.textContent = formatTime(audio.currentTime);
        mDuration.textContent = formatTime(audio.duration);
    }
});
audio.addEventListener('loadedmetadata', () => { mDuration.textContent = formatTime(audio.duration); });
audio.addEventListener('pause', () => { mPlay.textContent = '▶'; });
audio.addEventListener('play', () => { mPlay.textContent = '⏸'; });
audio.addEventListener('ended', () => { if (tracks.length) loadTrack((currentTrack + 1) % tracks.length); });
audio.addEventListener('error', () => {
    showNote('song not added yet — drop it into assets/audio');
    mPlay.textContent = '▶';
});

/* ---------------- video fallback ---------------- */

document.querySelectorAll('.video-frame').forEach(frame => {
    const video = frame.querySelector('video');
    const missing = frame.querySelector('.video-missing');
    video.addEventListener('error', () => missing.classList.add('show'));
});

/* ---------------- scroll reveal ---------------- */

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        entry.target.classList.toggle('in-view', entry.isIntersecting);
    });
}, { threshold: 0.2 });

document.querySelectorAll('#main section').forEach(sec => observer.observe(sec));
