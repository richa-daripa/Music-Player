
const shufflebtn=document.getElementById("shuffle");
const repeatbtn=document.getElementById("repeat");
const prevbtn=document.getElementById("prev");
const nextbtn=document.getElementById("next");
const playbtn=document.getElementById("play");
const pausebtn=document.getElementById("pause");

const audio=document.getElementById("audio");

const songName=document.getElementById("song-name");
const songArtist=document.getElementById("song-artist");

const currTime=document.getElementById("curr-time");
const maxDuration=document.getElementById("max-time");

const progressBar=document.getElementById("progress-bar");
const currProgress=document.getElementById("curr-progress");


let index=0;

let loop=true;

let shuffle = false;

//Create An Array For Song List

const songsList=[
    {
        name:"How Far I'll Go",
        link:"music/song1.mp3",
        artist:"Alessia Cara",
    },
    {
        name:"Even The Stars",
        link:"music/song2.mp3",
        artist:"Sarah Jeffery",
    },
    {
        name:"Lead The Way",
        link:"music/song3.mp3",
        artist:"Jhene Aiko",
    },
    {
        name:"Scars To Your Beautiful",
        link:"music/song4.mp3",
        artist:"Alessia Cara",
    },
    {
        name:"Loyal Brave True",
        link:"music/song5.mp3",
        artist:"Christina Aguilera",
    }
];


//Format Time
const timeformat=(time_input)=>{
    let min = Math.floor(time_input / 60);
    min = min < 10 ? "0" + min : min;  //if value of min is less than 10 then it adds a leading zero to the minutes
    let sec = Math.floor(time_input % 60);
    sec = sec < 10 ? "0" + sec : sec;
    return `${min}:${sec}`;    
};

//Function To Load Song
const loadSong =(song)=>{
    //this extracts all variables from the object
    //let { name, link, artist } = songsList[i];
    audio.src = song.link;
    songName.innerHTML = song.name;
    songArtist.innerHTML = song.artist;

    //display duration when media loads
    audio.onloadedmetadata = ()=>{
        maxDuration.innerText = timeformat(audio.duration);
    };
};


//Function To  Play Song

const playAudio = () => {
    audio.play();
    pausebtn.classList.remove('hide');
    playbtn.classList.add('hide');
};
playbtn.addEventListener('click', playAudio);


//Function To Toggle Repeat Mode

repeatbtn.addEventListener('click', function() {
    audio.loop = !audio.loop;
    //console.log("Loop status: " + audio.loop);
    if(audio.loop==true) 
    repeatbtn.setAttribute('data-tooltip', 'Repeat : on');
    else
    repeatbtn.setAttribute('data-tooltip', 'Repeat : off');
});

//Function To Play Next Song

const nextSong = () =>{
    if (shuffle) //if shuffle is on then next song will be a random one
    {   
        index = Math.floor(Math.random() * songsList.length);
    } 
    else //otherwise continue in normal order
    {
        index = (index + 1) % songsList.length;
    }
    loadSong(songsList[index]);
    playAudio();
}
nextbtn.addEventListener('click', nextSong);


//Function To Pause Song

pausebtn.addEventListener('click', function() {
    audio.pause();
    pausebtn.classList.add('hide');
    playbtn.classList.remove('hide');
});

//Function To Play Previous Song

prevbtn.addEventListener('click', function() {
    index = (index - 1 + songsList.length) % songsList.length;
    loadSong(songsList[index]);
    playAudio();
});

//play next song automatically when current song ends

audio.onended=()=>{
    nextSong();
}

//Function To Toggle Shuffle Mode

shufflebtn.addEventListener('click', function() {
    shuffle = !shuffle;
    //console.log("Shuffle status: " + shuffle);
    if(shuffle==true) 
    shufflebtn.setAttribute('data-tooltip', 'Shuffle : on');
    else
    shufflebtn.setAttribute('data-tooltip', 'Shuffle : off');
});

//Adding Event Listener to Progress Bar

progressBar.addEventListener("click" ,(event) => {
    //start of progress bar
    let coordstart = progressBar.getBoundingClientRect().left;
    //mouse click position
    let coordend = event.clientX;
    let progress =(coordend-coordstart) / progressBar.offsetWidth;
    //set width to progress
    currProgress.style.width = progress * 100 + '%';
    //set time
    audio.currentTime = progress * audio.duration;
    //play
    playAudio();
});


//Updating Progress every second
setInterval(() => {
    currTime.innerHTML = timeformat(audio.currentTime);
    currProgress.style.width = (audio.currentTime / audio.duration) * 100 + '%';
});

// Load first song on page load
/*window.onload=()=>{
    index=0;
    loadSong(index);
};*/

loadSong(songsList[index]);

//taking control of volume
var slider = document.getElementById("myRange");
var output = document.getElementById("range-value");
var mute=document.getElementById("mute");
var medium=document.getElementById("medium");
var high=document.getElementById("high");

slider.oninput = function() {
    var vol = this.value;
    audio.volume = this.value / 100;
    output.innerHTML = vol ;

    //Hide all icons initially
    mute.classList.add("hide");
    medium.classList.add("hide");
    high.classList.add("hide");

    if(vol == 0){
        mute.classList.remove("hide");
    } else if(vol >= 50){
        high.classList.remove("hide");
    } else {
        // Show the medium icon when volume is between 1 and 50
        medium.classList.remove("hide");
    } 
}

//for displaying playlist
const playlistButton=document.getElementById("menu");
const playlistContainer=document.getElementById("playlist-container");
const playlistSongs=document.getElementById("playlist-song");
const closeMenu=document.getElementById("close-menu");

function playlist(){
    
    // Iterate over each song in the songsList array
    for (let i = 0; i < songsList.length; i++) {

        let li = document.createElement('li');
        li.className = 'arrange';
        
        // Create an img element
        let img = document.createElement('img');
        img.src = 'images/img2.jpg'; // Replace with the actual image source
    
        // Create a p element
        let p = document.createElement('p');
        p.innerHTML = `${songsList[i].name} <br> <span>${songsList[i].artist}</span>`;
    
        // Append img and p to li
        li.appendChild(img);
        li.appendChild(p);
    
        // Append li to the playlist
        playlistSongs.appendChild(li);

        // Add an event listener to the li element
        li.addEventListener('click', () => {
            loadSong(songsList[i]);
            playAudio();
        });
    }
}

//load songs in the playlist on page load
playlist();


//open playlist
playlistButton.addEventListener('click', ()=>{
    playlistContainer.classList.remove('hide');
});

//hide playlist
closeMenu.addEventListener('click', ()=>{
    playlistContainer.classList.add('hide');
});

//to stop the music
const stopbtn=document.getElementById("stop");

stopbtn.addEventListener('click', function() {
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
        pausebtn.classList.add('hide');
        playbtn.classList.remove('hide');
    }
});