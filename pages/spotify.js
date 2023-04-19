var audio,
  playbtn,
  song_artist,
  album_cover,
  song_title,
  seekslider,
  seeking = false,
  seekto,
  currenttimetext,
  durationtimetext,
  playlist_status,
  dir,
  song_url,
  ext,
  agent,
  playlists_artists,
  repeat,
  random;

song_url = [
  "https://assets.codepen.io/4927073/yt5s.io+-+Miley+Cyrus+-+Flowers+%28Official+Video%29+%28192+kbps%29.mp3",
  "https://assets.codepen.io/4927073/yt5s.io+-+Dreamin+Of+The+Past+%28128+kbps%29.mp3",
  "https://assets.codepen.io/4927073/yt5s.io+-+Post+Malone+-+I+Cannot+Be+%28A+Sadder+Song%29+%28Audio%29+ft.+Gunna+%28128+kbps%29.mp3",
  "https://assets.codepen.io/4927073/yt5s.io+-+Sidewalks+%28128+kbps%29.mp3",
  "https://assets.codepen.io/4927073/yt5s.io+-+Young+Thug+-+Love+You+More+%28with+Nate+Ruess%2C+Gunna+%26+Jeff+Bhasker%29+-Official+Audio-+%28128+kbps%29.mp3",
  "https://assets.codepen.io/4927073/yt5s.io+-+Big+Lie+%28128+kbps%29.mp3",
  "https://thinknews.com.ng/wp-content/uploads/2022/05/Kanye_West_All_Of_The_Lights_(thinkNews.com.ng).mp3",
  "https://assets.codepen.io/4927073/yt5s.io+-+Justin+Bieber+-+Honest+%28feat.+Don+Toliver%29+%28Official+Lyric+Video%29+%28128+kbps%29.mp3"
];

song_artist = [
  "Miley Cyrus",
  "Pusha T",
  "Post Malone Ft. Gunna",
  "The Weeknd",
  "Young Thug",
  "Post Malone",
  "Kanye West",
  "Justin Bieber"
];

album_cover = [
  "https://static.spin.com/files/2023/01/Miley-Cyrus-Endless-Summer-Vacation.png",
  "https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/c5/1c/ec/c51cece0-dcb5-6b66-19e5-b4605d13bf75/22UMGIM43682.rgb.jpg/3000x3000bb.jpg",
  "https://lastfm.freetls.fastly.net/i/u/d897b8b9afe75c015ae753ff914f9021.png",
  "https://images.universal-music.de/img/assets/420/420692/195/The-Weeknd-Starboy-Popup-Store.jpg",
  "https://i1.sndcdn.com/artworks-WUYa9HZyf2zZUAlf-VT6ZAQ-original.jpg",
  "https://www.1977magazine.com/wp-content/uploads/2016/12/Post-Malone-Stoney-2016-2480x2480.jpg",
  "https://is5-ssl.mzstatic.com/image/thumb/Music118/v4/1d/0a/a2/1d0aa275-cb98-a7b3-28e5-30673b66caba/00602527584935.rgb.jpg/1945x1945bb.jpeg",
  "http://files.nowre.com/articles/2022/08/Honest-scaled.jpg"
];
song_title = [
  "Rose Colored Lenses",
  "Dreamin Of The Past",
  "I Cannot Be (A Sadder Song)",
  "Sidewalks Ft. Kendrick Lamar",
  "Love You More",
  "Big Lie",
  "All Of The Lights",
  "Honest"
];

playlist_index = 0;
agent = navigator.userAgent.toLowerCase();
if (agent.indexOf("firefox") != -1 || agent.indexOf("opera") != -1) {
  ext = ".ogg";
}

playbtn = document.getElementById("playpausebtn");
nextbtn = document.getElementById("nextbtn");
prevbtn = document.getElementById("prevbtn");
seekslider = document.getElementById("seekslider");
currenttimetext = document.getElementById("currenttimetext");
durationtimetext = document.getElementById("durationtimetext");
playlist_status = document.getElementById("playlist_status");
playlists_artists = document.getElementById("playlist_artist");
repeat = document.getElementById("repeat");
randomSong = document.getElementById("random");
volume_slider = document.getElementById(".volume_slider");

audio = new Audio();
audio.src = song_url[0];
audio.loop = false;

playlist_status.innerHTML = song_artist[playlist_index];
playlists_artists.innerHTML = song_title[playlist_index];

playbtn.addEventListener("click", playPause);

nextbtn.addEventListener("click", nextSong);
prevbtn.addEventListener("click", prevSong);
seekslider.addEventListener("mousedown", function (event) {
  seeking = true;
  seek(event);
});
seekslider.addEventListener("mousemove", function (event) {
  seek(event);
});

seekslider.addEventListener("mouseup", function () {
  seeking = false;
});

audio.addEventListener("timeupdate", function () {
  seektimeupdate();
});
audio.addEventListener("ended", function () {
  switchTrack();
});
repeat.addEventListener("click", loop);
randomSong.addEventListener("click", random);

//functions
function fetchMusicDetail() {
  $("#image").attr("src", album_cover[playlist_index]);
  
  var imageUrl = album_cover[playlist_index];
  var songUrl = song_title[playlist_index];
  $(".box").css("background-image", "url(" + imageUrl + ")");
  document.getElementById('playlist_artist').className = songUrl;
  document.getElementById('image').className = ("image rotate " + songUrl);
  document.getElementById('seekslider').className = songUrl;
  
  playlist_status.innerHTML = song_artist[playlist_index];
  playlist_artist.innerHTML = song_title[playlist_index];
  audio.src = song_url[playlist_index];
  audio.play();
  
  
}

function getRandomNumber(min, max) {
  let step1 = max - min + 1;
  let step2 = Math.random() * step1;
  let result = Math.floor(step2) + min;
  return result;
}

function random() {
  let randomIndex = getRandomNumber(0, song_url.length - 1);
  playlist_index = randomIndex;
  fetchMusicDetail();
  document.querySelector(".playpause").classList.add("active");
}

function loop() {
  if (audio.loop) {
    audio.loop = false;
    document.querySelector(".loop").classList.remove("active");
  } else {
    audio.loop = true;
    document.querySelector(".loop").classList.add("active");
  }
}

function nextSong() {
  document.querySelector(".playpause").classList.add("active");
  document.querySelector("#image").classList.add("rotate");
  playlist_index++;
  if (playlist_index > song_url.length - 1) {
    playlist_index = 0;
  }
  fetchMusicDetail();
}
function prevSong() {
  document.querySelector(".playpause").classList.add("active");
  document.querySelector("#image").classList.add("rotate");
  playlist_index--;
  if (playlist_index < 0) {
    playlist_index = song_url.length - 1;
  }
  fetchMusicDetail();
}

function playPause() {
  if (audio.paused) {
    audio.play();
   document.querySelector(".playpause").classList.add("active"); document.querySelector("#image").classList.add("rotate");
    
    
  } else {
    audio.pause();
    document.querySelector("#image").classList.remove("rotate");
    document.querySelector(".playpause").classList.remove("active");
  }
}

function switchTrack() {
  if (playlist_index == song_url.length - 1) {
    playlist_index = 0;
  } else {
    playlist_index++;
  }
  fetchMusicDetail();
}

function seek(event) {
  if (audio.duration == 0) {
    seekslider.value = 0;
  } else {
    if (seeking) {
      seekslider.value = event.clientX - seekslider.offsetLeft;
      seekto = audio.duration * (seekslider.value / 100);
      //audio.currentTime = seekto;
    }
  }
}



function seektimeupdate() {
  if (audio.duration) {
    var nt = audio.currentTime * (100 / audio.duration);
    seekslider.value = nt;
    var curmins = Math.floor(audio.currentTime / 60);
    var cursecs = Math.floor(audio.currentTime - curmins * 60);
    var durmins = Math.floor(audio.duration / 60);
    var dursecs = Math.floor(audio.duration - durmins * 60);
    if (cursecs < 10) {
      cursecs = "0" + cursecs;
    }
    if (dursecs < 10) {
      dursecs = "0" + dursecs;
    }
    if (curmins < 10) {
      curmins = "0" + curmins;
    }
    if (durmins < 10) {
      durmins = "0" + durmins;
    }
    currenttimetext.innerHTML = curmins + ":" + cursecs;
    durationtimetext.innerHTML = durmins + ":" + dursecs;
  } else {
    currenttimetext.innerHTML = "00" + ":" + "00";
    durationtimetext.innerHTML = "00" + ":" + "00";
  }
}

let checkbox = document.querySelector("input[name=theme]");
checkbox.addEventListener("change", function () {
  if (this.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
});



//let backgroundColor = song_artist[playlist_index];
//$("body").css('background', backgroundColor)
//$("#background").css('background-image');

//--------Making the player draggable----------------

const playerContainer = document.querySelector('.player');
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

playerContainer.addEventListener('mousedown', dragStart);
playerContainer.addEventListener('mouseup', dragEnd);
playerContainer.addEventListener('mousemove', drag);

function dragStart(event) {
  initialX = event.clientX - xOffset;
  initialY = event.clientY - yOffset;
  
  if (event.target === playerContainer) {
    isDragging = true;
  }
}

function dragEnd(event) {
  initialX = currentX;
  initialY = currentY;
  
  isDragging = false;
}

function drag(event) {
  if (isDragging) {
    event.preventDefault();
    
    currentX = event.clientX - initialX;
    currentY = event.clientY - initialY;
    
    xOffset = currentX;
    yOffset = currentY;
    
    setTranslate(currentX, currentY, playerContainer);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

