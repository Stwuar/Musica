const btnPlay = document.querySelector("#btn-play");
const btnPlayIcon = document.querySelector("#btn-play-icon");
const btnRepeat = document.querySelector("#btn-repeat");
const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
const btnVolume = document.querySelector("#btn-volume");
const btnVolumeIcon = document.querySelector("#btn-volume i");
const playerVolume = document.querySelector("#player-volume");
const songName = document.querySelector("#song-name");
const songAuthor = document.querySelector("#song-author");
const playerCurrentTime = document.querySelector("#player-current-time");
const playerDuration = document.querySelector("#player-duration");
const playerProgress = document.querySelector("#player-progress");
const audioPlayer = document.querySelector("#audio-player");

let currentSong = 0;
let repeatSong = false;

const songs = [
  {
    name: "Mood",
    author: "24k Goldn",
    path: "./assets/songs/24kgoldn-mood-official-video-ft-iann-dior.mp3",
  },
  {
    name: "Easy on me",
    author: "Adele",
    path: "./assets/songs/adele-easy-on-me-official-lyric-video.mp3",
  },
  {
    name: "Hello",
    author: "Adele",
    path: "./assets/songs/adele-hello.mp3",
  },
  {
    name: "Rolling in the deep",
    author: "Adele",
    path: "./assets/songs/adele-rolling-in-the-deep-official-music-video.mp3",
  },
  {
    name: "I need your love",
    author: "Calvin Harris",
    path: "./assets/songs/calvin-harris-i-need-your-love-official-video-ft-ellie-goulding.mp3",
  },
  {
    name: "Outside",
    author: "Calvin Harris",
    path: "./assets/songs/calvin-harris-outside-official-video-ft-ellie-goulding.mp3",
  },
  {
    name: "Summer",
    author: "Calvin Harris",
    path: "./assets/songs/calvin-harris-summer-official-video.mp3",
  },
  {
    name: "Call me maybe",
    author: "Carly Rae Jepsen",
    path: "./assets/songs/carly-rae-jepsen-call-me-maybe.mp3",
  },
  {
    name: "Gyal you a party animal",
    author: "Charly Black",
    path: "./assets/songs/charly-black-gyal-you-a-party-animal.mp3",
  },
  {
    name: "Im the one",
    author: "DJ Khaled",
    path: "./assets/songs/dj-khaled-im-the-one-ft-justin-bieber-quavo-chance-the-rapper-lil-wayne.mp3",
  },
  {
    name: "Burn",
    author: "Ellie goulding",
    path: "./assets/songs/ellie-goulding-burn-official-video.mp3",
  },
  {
    name: "Good feeling",
    author: "Florida",
    path: "./assets/songs/flo-rida-good-feeling-official-video.mp3",
  },
  {
    name: "Beautiful",
    author: "Sean Kingston",
    path: "./assets/songs/sean-kingston-beautiful-girls-official-hd-video.mp3",
  },
  {
    name: "Eenie Meenie",
    author: "Sean Kingston",
    path: "./assets/songs/sean-kingston-justin-bieber-eenie-meenie-video-version.mp3",
  },
  {
    name: "Someone like you",
    author: "Adele",
    path: "./assets/songs/someone-like-you-adele-lyrics.mp3",
  },
];

btnPlay.addEventListener("click", () => togglePlaySong());
btnPrev.addEventListener("click", () => changeSong(false));
btnNext.addEventListener("click", () => changeSong());
btnRepeat.addEventListener("click", () => toggleRepeatSong());
playerVolume.addEventListener("input", () => changeVolume());
playerProgress.addEventListener("input", () => changeTime());
audioPlayer.addEventListener("timeupdate", () => timeUpdate());
audioPlayer.addEventListener("ended", () => ended());

const togglePlaySong = () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    btnPlayIcon.classList.replace("bi-play-fill", "bi-pause-fill");
  } else {
    audioPlayer.pause();
    btnPlayIcon.classList.replace("bi-pause-fill", "bi-play-fill");
  }
};

const changeSong = (next = true) => {
  if (next && currentSong < songs.length - 1) {
    currentSong++;
  } else if (!next && currentSong > 0) {
    currentSong--;
  } else {
    return;
  }

  updatePlayer();
  togglePlaySong();
};

const updatePlayer = () => {
  const song = songs[currentSong];

  songName.innerHTML = song.name;
  songAuthor.innerHTML = song.author;
  audioPlayer.src = song.path;
  playerProgress.value = audioPlayer.currentTime;
};

const toggleRepeatSong = () => {
  repeatSong = !repeatSong;
  btnRepeat.classList.toggle("btn-activated");
};

const timeUpdate = () => {
  const { currentTime, duration } = audioPlayer;

  if (isNaN(duration)) return;

  playerDuration.innerHTML = formatSecondsToMinutes(duration);
  playerCurrentTime.innerHTML = formatSecondsToMinutes(currentTime);
  playerProgress.max = duration;
  playerProgress.value = currentTime;
};

const changeVolume = () => {
  const { value } = playerVolume;

  audioPlayer.volume = value;

  if (value == 0) {
    btnVolumeIcon.classList.replace("bi-volume-up-fill", "bi-volume-mute-fill");
  } else {
    btnVolumeIcon.classList.replace("bi-volume-mute-fill", "bi-volume-up-fill");
  }
};

const changeTime = () => {
  audioPlayer.currentTime = playerProgress.value;
};

const formatSecondsToMinutes = (seconds) => {
  return new Date(seconds * 1000).toISOString().slice(14, 19);
};

const ended = () => {
  repeatSong ? togglePlaySong() : changeSong(true);
};

window.onload = () => {
  updatePlayer();
};
