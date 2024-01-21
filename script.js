let audioElement =new Audio('./songs/1.mp3')
let songIndex;
let masterPlay = document.querySelector('#masterPlay')
let gif = document.querySelector('#gif')
let masterSongName = document.getElementById('songName')
let songItems = Array.from(document.getElementsByClassName('songItem'));
let isPlaying = false;

let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},

]

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime <=0){
        
        if(songIndex == undefined){
            songIndex = 1
        }
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        document.getElementById(songIndex-1).classList.add('fa-circle-pause')
        document.getElementById(songIndex-1).classList.add('fa-circle-play')
        // masterSongName.innerText = "Warriyo - Mortals [NCS Release]"
    
        masterSongName.innerText = songs[songIndex-1].songName
        gif.style.opacity="1";
    }else{
        audioElement.pause();
        makeAllPlays();
        masterPlay.classList.add('fa-circle-play')
        masterPlay.classList.remove('fa-circle-pause')
        gif.style.opacity="0";
      
    }
})

audioElement.addEventListener('timeupdate',()=>{
    console.log("updatetime")
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    document.querySelector('#myProgressBar').value=progress;
})

document.querySelector('#myProgressBar').addEventListener('change',()=>{{
    audioElement.currentTime = (document.querySelector('#myProgressBar').value/100)*audioElement.duration
}})

songItems.forEach((element,i)=>{
   
   element.getElementsByTagName('img')[0].src=songs[i].coverPath
   element.getElementsByClassName('name')[0].innerHTML=songs[i].songName
  
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach(element=>{
    console.log(isPlaying)
  
    element.addEventListener('click',()=>{
        
    if(audioElement.paused || audioElement.currentTime<=0){
        makeAllPlays();
        element.classList.remove('fa-circle-play');
        element.classList.add("fa-circle-pause");
       songIndex = +element.id;
       songIndex+=1;
       isPlaying=true
        audioElement.src ='./songs/'+songIndex+'.mp3';
        // audioElement.currentTime=0
        masterSongName.innerText = songs[songIndex-1].songName
        gif.style.opacity="1";
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add("fa-circle-pause");
    }else{
        makeAllPlays();
        element.classList.add('fa-circle-play');
        element.classList.remove("fa-circle-pause");
        masterPlay.classList.add('fa-circle-play')
        masterPlay.classList.remove("fa-circle-pause");
        gif.style.opacity="0";
        audioElement.pause()
    }
    })
    
})

document.getElementById('next').addEventListener('click',()=>{{
    if(songIndex>9){
        songIndex = 0;
    }else{
        songIndex+=1;
    }
    audioElement.src ='./songs/'+songIndex+'.mp3';
    masterSongName.innerText = songs[songIndex-1].songName
    gif.style.opacity="1";
    audioElement.currentTime=0
    isPlaying = true
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add("fa-circle-pause");
}})

document.getElementById('back').addEventListener('click',()=>{{
    if(songIndex<=0){
        songIndex=9;
    }else{
        songIndex-=1;
    }
    audioElement.src ='./songs/'+songIndex+'.mp3';
    masterSongName.innerText = songs[songIndex-1].songName
    gif.style.opacity="1";
    audioElement.currentTime=0
    isPlaying = true
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add("fa-circle-pause");
}})