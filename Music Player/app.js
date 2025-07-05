let currentMusic = 0;

const music = document.querySelector('#audio');
const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn');
const backwardBtn = document.querySelector('.backward-btn');

let isPlaying = false;

// Play/Pause Button Functionality
playBtn.addEventListener('click', () => {
    if (!isPlaying) {
        music.play();
        isPlaying = true;
        playBtn.classList.remove('pause');
        disk.classList.add('play');
    } else {
        music.pause();
        isPlaying = false;
        playBtn.classList.add('pause');
        disk.classList.remove('play');
    }
});

// Set Music and Load It
const setMusic = (i) => {
    seekBar.value = 0; // Reset seek bar
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;

    // Play music when loaded
    music.onloadedmetadata = () => {
        seekBar.max = music.duration;
        musicDuration.innerText = formatTime(music.duration);
        currentTime.innerText = '00:00';
    };
};

// Format seconds into MM:SS
const formatTime = (time) => {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
};

// Auto update seek bar and current time
music.addEventListener('timeupdate', () => {
    seekBar.value = music.currentTime;
    currentTime.innerText = formatTime(music.currentTime);
});

// Seek manually
seekBar.addEventListener('input', () => {
    music.currentTime = seekBar.value;
});

// Go to next song
forwardBtn.addEventListener('click', () => {
    if (currentMusic >= songs.length - 1) {
        currentMusic = 0;
    } else {
        currentMusic++;
    }
    setMusic(currentMusic);
    if (isPlaying) music.play();
});

// Go to previous song
backwardBtn.addEventListener('click', () => {
    if (currentMusic <= 0) {
        currentMusic = songs.length - 1;
    } else {
        currentMusic--;
    }
    setMusic(currentMusic);
    if (isPlaying) music.play();
});

// Initialize first song
setMusic(0);