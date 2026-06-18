const audio = document.getElementById('bg-music');
const playPauseBtn = document.getElementById('play-pause-btn');
const seekBar = document.getElementById('seek-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');

const playlist = [
    { src: 'Jutti Meri Live.mp3', title: 'Jutti Meri Live', artist: 'Live Performance', cover: 'cover/Jutti-Meri-Live-1.jpg' },
    { src: 'Bairan (PenduJatt.Com.Se).mp3', title: 'Bairan', artist: 'PenduJatt', cover: 'cover/bairan.jpg' },
    { src: 'Par Chanaa De (PenduJatt.Com.Se).mp3', title: 'Par Chanaa De', artist: 'Coke Studio', cover: 'cover/par chana.jpg' },
    { src: 'Mera Yaar (PenduJatt.Com.Se).mp3', title: 'Mera Yaar', artist: 'PenduJatt', cover: 'cover/mera yaar.jpg' },
    { src: 'Tajdar-E-Haram (PenduJatt.Com.Se).mp3', title: 'Tajdar-E-Haram', artist: 'Coke Studio', cover: 'cover/tajiadar.jpg' },
    { src: 'Sultan_Sultan_-_Bulleyya_(mp3.pm).mp3', title: 'Bulleya', artist: 'Sultan', cover: 'cover/bulleya.jpg' },
    { src: 'Edd_Sheeran_-_Perfect_(mp3.pm).mp3', title: 'Perfect', artist: 'Ed Sheeran', cover: 'cover/perfect.jpg' }
];

let currentSongIndex = 0; 

function toggleMusic() {
    if(audio.paused) { 
        audio.play().catch(err => console.log("Playback blocked:", err)); 
        playPauseBtn.innerText = '⏸'; 
    } else { 
        audio.pause(); 
        playPauseBtn.innerText = '▶'; 
    }
}

function changeSong(songSrc, songTitle, songArtist, coverSrc) {
    audio.src = songSrc; 
    audio.load();
    
    document.getElementById('player-title').innerText = songTitle;
    document.getElementById('player-artist').innerText = songArtist;
    document.getElementById('player-cover').src = coverSrc; 
    
    const foundIndex = playlist.findIndex(song => song.src === songSrc);
    if(foundIndex !== -1) { currentSongIndex = foundIndex; }
    
    audio.play().catch(err => console.log("Playback error:", err));
    playPauseBtn.innerText = '⏸';
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    let next = playlist[currentSongIndex];
    changeSong(next.src, next.title, next.artist, next.cover);
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    let prev = playlist[currentSongIndex];
    changeSong(prev.src, prev.title, prev.artist, prev.cover);
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

let isSeeking = false;
if(seekBar) { 
    seekBar.addEventListener('input', () => isSeeking = true);
    seekBar.addEventListener('change', () => {
        audio.currentTime = (seekBar.value / 100) * audio.duration;
        isSeeking = false;
    });
}

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        if (seekBar && !isSeeking) seekBar.value = (audio.currentTime / audio.duration) * 100;
        if (currentTimeDisplay) currentTimeDisplay.innerText = formatTime(audio.currentTime);
        if (durationDisplay && !isNaN(audio.duration)) durationDisplay.innerText = formatTime(audio.duration);
    }
});

audio.addEventListener('loadedmetadata', () => {
    if (durationDisplay) durationDisplay.innerText = formatTime(audio.duration);
});

audio.addEventListener('pause', () => playPauseBtn.innerText = '▶');
audio.addEventListener('play', () => playPauseBtn.innerText = '⏸');
audio.addEventListener('ended', nextSong);

// Cherry Blossom Petals setup
const petalsContainer = document.getElementById('petals-container');
if(petalsContainer) {
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
    if(isGiftOpened) return;
    if(popupOverlay) {
        popupOverlay.classList.add('show');
    } else {
        executeOpenGift();
    }
}

function confirmOpenGift() {
    if(popupOverlay) popupOverlay.classList.remove('show');
    executeOpenGift();
}

function moveButton() {
    if(!btnNo || !popupBox) return;
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
    if(isGiftOpened) return;
    isGiftOpened = true;
    changeSong('Jutti Meri Live.mp3', 'Jutti Meri Live', 'Live Performance', 'cover/Jutti-Meri-Live-1.jpg');
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
