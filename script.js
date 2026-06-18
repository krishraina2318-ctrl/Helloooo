const playPauseBtn = document.getElementById('play-pause-btn');
const seekBar = document.getElementById('seek-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');

// FIX: Sources mapped to match your exact GitHub repository filenames perfectly
const playlist = [
    { title: 'Jutti Meri Live', artist: 'Live Performance', cover: 'cover/Jutti-Meri-Live-1.jpg', src: 'Jutti Meri Live.mp3' },
    { title: 'Bairan', artist: 'PenduJatt', cover: 'cover/bairan.jpg', src: 'bairan.mp3' },
    { title: 'Par Chanaa De', artist: 'Coke Studio', cover: 'cover/par chana.jpg', src: 'par_chanaa_de.mp3' },
    { title: 'Mera Yaar', artist: 'PenduJatt', cover: 'cover/mera yaar.jpg', src: 'mera_yaar.mp3' },
    { title: 'Tajdar-E-Haram', artist: 'Coke Studio', cover: 'cover/tajiadar.jpg', src: 'tajdar_e_haram.mp3' },
    { title: 'Bulleya', artist: 'Sultan', cover: 'cover/bulleya.jpg', src: 'bulleyya.mp3' },
    { title: 'Perfect', artist: 'Ed Sheeran', cover: 'cover/perfect.jpg', src: 'perfect.mp3' }
];

let currentIndex = 0;
const audio = document.getElementById('main-audio');
let isSeeking = false;

function initAudioPlayer() {
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', nextSong);

    if (seekBar) { 
        seekBar.addEventListener('input', () => isSeeking = true);
        seekBar.addEventListener('change', () => {
            audio.currentTime = (seekBar.value / 100) * audio.duration;
            isSeeking = false;
        });
    }
}

function updateProgress() {
    if (audio.duration) {
        if (seekBar && !isSeeking) seekBar.value = (audio.currentTime / audio.duration) * 100;
        if (currentTimeDisplay) currentTimeDisplay.innerText = formatTime(audio.currentTime);
    }
}

function updateDuration() {
    if (durationDisplay) durationDisplay.innerText = formatTime(audio.duration);
}

function switchToTrack(index) {
    currentIndex = index;
    
    audio.src = playlist[index].src;
    
    document.getElementById('player-title').innerText = playlist[index].title;
    document.getElementById('player-artist').innerText = playlist[index].artist;
    document.getElementById('player-cover').src = playlist[index].cover;
    
    audio.play().then(() => {
        playPauseBtn.innerText = '⏸';
    }).catch(err => {
        console.log("Playback blocked or failed:", err);
    });
}

function toggleMusic() {
    if (!audio.src) {
        audio.src = playlist[currentIndex].src;
    }
    if (audio.paused) { 
        audio.play().catch(err => console.log(err)); 
        playPauseBtn.innerText = '⏸'; 
    } else { 
        audio.pause(); 
        playPauseBtn.innerText = '▶'; 
    }
}

function nextSong() {
    let target = (currentIndex + 1) % playlist.length;
    switchToTrack(target);
}

function prevSong() {
    let target = (currentIndex - 1 + playlist.length) % playlist.length;
    switchToTrack(target);
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Falling petals feature
const petalsContainer = document.getElementById('petals-container');
if (petalsContainer) {
    for (let i = 0; i < 35; i++) {
        let petal = document.createElement('div');
        petal.classList.add('petal');
        let size = Math.random() * 8 + 6; 
        petal.style.width = size + 'px'; petal.style.height = size + 'px';
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDuration = Math.random() * 6 + 6 + 's';
        petal.style.animationDelay = Math.random() * 7 + 's';
        petalsContainer.appendChild(petal);
    }
}

function createBurst() {
    const emojis = ['🌸', '🌺', '🌹', '✨', '💖'];
    const container = document.getElementById('cover-screen');
    for (let i = 0; i < 15; i++) {
        let flower = document.createElement('div');
        flower.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        flower.classList.add('burst-flower');
        flower.style.left = '50%'; flower.style.top = '50%';
        container.appendChild(flower);
        setTimeout(() => {
            const angle = Math.random() * Math.PI * 2;
            const velocity = 100 + Math.random() * 150;
            flower.style.transform = `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) rotate(${Math.random()*360}deg) scale(${0.5 + Math.random()})`;
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
    popupOverlay.classList.add('show');
}

function confirmOpenGift() {
    popupOverlay.classList.remove('show');
    executeOpenGift();
}

function moveButton() {
    if (!btnNo || !popupBox) return;
    btnNo.style.position = 'absolute';
    const maxX = popupBox.clientWidth - btnNo.clientWidth - 20;
    const maxY = popupBox.clientHeight - btnNo.clientHeight - 20;
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
    document.getElementById('gift-icon').style.display = 'none';
    document.getElementById('tap-text').style.display = 'none';
    createBurst(); 
    setTimeout(() => {
        document.getElementById('cover-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('cover-screen').style.display = 'none';
            document.getElementById('main-content').style.display = 'block';
            setTimeout(() => { document.getElementById('main-content').style.opacity = '1'; }, 50);
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
}, { root: null, threshold: 0.2 });

document.querySelectorAll('section').forEach(sec => sectionObserver.observe(sec));

initAudioPlayer();
