const playPauseBtn = document.getElementById('play-pause-btn');
const seekBar = document.getElementById('seek-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');

// FIXED PATHS: Added the 'assets/' folder prefix so GitHub Pages can locate your audio files!
const playlist = [
    { title: 'Jutti Meri Live', artist: 'Live Performance', cover: 'cover/Jutti-Meri-Live-1.jpg', src: 'assets/Jutti Meri Live.mp3' },
    { title: 'Bairan', artist: 'PenduJatt', cover: 'cover/bairan.jpg', src: 'assets/bairan.mp3' },
    { title: 'Par Chanaa De', artist: 'Coke Studio', cover: 'cover/par chana.jpg', src: 'assets/par_chanaa_de.mp3' },
    { title: 'Mera Yaar', artist: 'PenduJatt', cover: 'cover/mera yaar.jpg', src: 'assets/mera_yaar.mp3' },
    { title: 'Tajdar-E-Haram', artist: 'Coke Studio', cover: 'cover/tajiadar.jpg', src: 'assets/tajdar_e_haram.mp3' },
    { title: 'Bulleya', artist: 'Sultan', cover: 'cover/bulleya.jpg', src: 'assets/bulleyya.mp3' },
    { title: 'Perfect', artist: 'Ed Sheeran', cover: 'cover/perfect.jpg', src: 'assets/perfect.mp3' }
];

let currentIndex = 0;
const audio = document.getElementById('main-audio');
let isSeeking = false;

function initPlayer() {
    if (playlist.length > 0) {
        switchToTrack(0);
        audio.pause();
        if(playPauseBtn) playPauseBtn.innerText = '▶';
    }
}

function toggleMusic() {
    if (!audio.src) {
        switchToTrack(currentIndex);
    }
    if (audio.paused) {
        audio.play().catch(err => console.log("Playback error:", err));
        if(playPauseBtn) playPauseBtn.innerText = '⏸';
    } else {
        audio.pause();
        if(playPauseBtn) playPauseBtn.innerText = '▶';
    }
}

function switchToTrack(index) {
    if (index < 0 || index >= playlist.length) return;
    currentIndex = index;
    
    audio.src = playlist[currentIndex].src;
    audio.load();

    const titleEl = document.getElementById('player-title');
    const artistEl = document.getElementById('player-artist');
    const coverEl = document.getElementById('player-cover');

    if (titleEl) titleEl.innerText = playlist[currentIndex].title;
    if (artistEl) artistEl.innerText = playlist[currentIndex].artist;
    if (coverEl) coverEl.src = playlist[currentIndex].cover;

    audio.play().then(() => {
        if(playPauseBtn) playPauseBtn.innerText = '⏸';
    }).catch(err => {
        console.log("Auto-play prevented or failed:", err);
        if(playPauseBtn) playPauseBtn.innerText = '▶';
    });
}

function nextSong() {
    currentIndex = (currentIndex + 1) % playlist.length;
    switchToTrack(currentIndex);
}

function prevSong() {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    switchToTrack(currentIndex);
}

function changeSong(src, title, artist, cover) {
    const foundIndex = playlist.findIndex(item => item.src === src);
    if (foundIndex !== -1) {
        switchToTrack(foundIndex);
    } else {
        audio.src = src;
        const titleEl = document.getElementById('player-title');
        const artistEl = document.getElementById('player-artist');
        const coverEl = document.getElementById('player-cover');
        if (titleEl) titleEl.innerText = title;
        if (artistEl) artistEl.innerText = artist;
        if (coverEl) coverEl.src = cover;
        audio.play().catch(e => console.log(e));
        if(playPauseBtn) playPauseBtn.innerText = '⏸';
    }
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

if (seekBar) {
    seekBar.addEventListener('input', () => { isSeeking = true; });
    seekBar.addEventListener('change', () => {
        if (audio.duration) {
            audio.currentTime = (seekBar.value / 100) * audio.duration;
        }
        isSeeking = false;
    });
}

if (audio) {
    audio.addEventListener('timeupdate', () => {
        if (audio.duration && !isSeeking) {
            if (seekBar) seekBar.value = (audio.currentTime / audio.duration) * 100;
            if (currentTimeDisplay) currentTimeDisplay.innerText = formatTime(audio.currentTime);
        }
    });

    audio.addEventListener('loadedmetadata', () => {
        if (durationDisplay) durationDisplay.innerText = formatTime(audio.duration);
    });

    audio.addEventListener('ended', () => { nextSong(); });
}

const petalsContainer = document.getElementById('petals-container');
if (petalsContainer) {
    for (let i = 0; i < 35; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        const size = Math.random() * 8 + 6;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.animationDuration = `${Math.random() * 6 + 6}s`;
        petal.style.animationDelay = `${Math.random() * 7}s`;
        petalsContainer.appendChild(petal);
    }
}

function createBurst() {
    const emojis = ['🌸', '🌺', '🌹', '✨', '💖'];
    const container = document.getElementById('cover-screen');
    if (!container) return;
    for (let i = 0; i < 15; i++) {
        const flower = document.createElement('div');
        flower.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        flower.classList.add('burst-flower');
        flower.style.left = '50%';
        flower.style.top = '50%';
        container.appendChild(flower);
        setTimeout(() => {
            const angle = Math.random() * Math.PI * 2;
            const velocity = 100 + Math.random() * 150;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            flower.style.transform = `translate(${tx}px, ${ty}px) rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random()})`;
            flower.style.opacity = '1';
        }, 10);
    }
}

let isGiftOpened = false;
const popupOverlay = document.getElementById('popup-overlay');
const popupBox = document.getElementById('popup-box');
const btnNo = document.getElementById('btn-no');

function showPopup() {
    if (isGiftOpened) return;
    if (popupOverlay) {
        popupOverlay.classList.add('show');
    } else {
        executeOpenGift();
    }
}

function confirmOpenGift() {
    if (popupOverlay) popupOverlay.classList.remove('show');
    executeOpenGift();
}

function moveButton() {
    if (!btnNo || !popupBox) return;
    btnNo.style.position = 'absolute';
    const boxWidth = popupBox.clientWidth;
    const boxHeight = popupBox.clientHeight;
    const btnWidth = btnNo.clientWidth;
    const btnHeight = btnNo.clientHeight;
    const maxX = boxWidth - btnWidth - 20;
    const maxY = boxHeight - btnHeight - 20;
    btnNo.style.left = `${Math.max(10, Math.floor(Math.random() * maxX))}px`;
    btnNo.style.top = `${Math.max(10, Math.floor(Math.random() * maxY))}px`;
}

if (btnNo) {
    btnNo.addEventListener('mouseover', moveButton);
    btnNo.addEventListener('click', (e) => { e.preventDefault(); moveButton(); });
}

function executeOpenGift() {
    if (isGiftOpened) return;
    isGiftOpened = true;
    switchToTrack(0);
    if (document.getElementById('gift-icon')) document.getElementById('gift-icon').style.display = 'none';
    if (document.getElementById('tap-text')) document.getElementById('tap-text').style.display = 'none';
    createBurst(); 
    setTimeout(() => {
        if (document.getElementById('cover-screen')) document.getElementById('cover-screen').style.opacity = '0';
        setTimeout(() => {
            if (document.getElementById('cover-screen')) document.getElementById('cover-screen').style.display = 'none';
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.style.display = 'block';
                setTimeout(() => { mainContent.style.opacity = '1'; }, 50);
            }
        }, 1000);
    }, 800);
}

function nextSection(btn) {
    const nextSec = btn.closest('section').nextElementSibling;
    if (nextSec && nextSec.tagName === 'SECTION') nextSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
        else entry.target.classList.remove('in-view');
    });
}, { root: null, rootMargin: '0px', threshold: 0.2 });

document.querySelectorAll('section').forEach(sec => {
    sectionObserver.observe(sec);
});

window.addEventListener('DOMContentLoaded', initPlayer);
