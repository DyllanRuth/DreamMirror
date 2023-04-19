const videoCardContainer = document.querySelector('.video-container');

let api_key = "AIzaSyAg6TFmmYWaLFd3bH4GFaHFMLZrkygX9mc";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 30,
    regionCode: ''
}))
.then(res => res.json())
.then(data => {
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'youtube2.html'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}

// search bar

const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        //location.href = youtube2.html
        location.href = searchLink + searchInput.value;
    }
})

function searchByKeyword() {
    var results = Youtube.Se
}

const playerContainer = document.querySelector('#player');
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

