console.log( "Welcome to Spotify" );

// Initialise the variables
let songIndex = 0;
let audioElement = new Audio( 'song/1.mp3' );
let masterPlay = document.getElementById( 'masterPlay' );
let myProgressbar = document.getElementById( 'myProgressBar' );
let gif = document.getElementById( 'gif' );
let masterSongName = document.getElementById( 'masterSongName' );
let songItems = Array.from( document.getElementsByClassName( 'sonItem' ) );

let songs = [
    { songName: "Har Har Sambhu", filepath: "song/1.mp3", coverPath: "covers/cover1.jpg" },
    { songName: "Dandelions", filepath: "song/2.mp3", coverPath: "covers/cover2.jpg" },
    { songName: "Until I found you", filepath: "song/3.mp3", coverPath: "covers/cover3.jpg" },
    { songName: "What Makes You Beautiful", filepath: "song/4.mp3", coverPath: "covers/cover4.jpg" },
    { songName: "Humnava Mere", filepath: "song/5.mp3", coverPath: "covers/cover5.jpg" },
    { songName: "Raanjhana Ve", filepath: "song/6.mp3", coverPath: "covers/cover6.jpg" },
]

songItems.forEach( ( element, i ) =>
{
    // console.log(element, i);
    element.getElementsByTagName( "img" )[0].src = songs[i].coverPath;
    element.getElementsByClassName( "songName" )[0].innerText = songs[i].songName;
} )

// audioElement.play()

// Handle play/pause click
masterPlay.addEventListener( 'click', () =>
{
    if ( audioElement.paused || audioElement.currentTime <= 0 )
    {
        audioElement.play();
        masterPlay.classList.remove( 'fa-circle-play' );
        masterPlay.classList.add( 'fa-circle-pause' );
        gif.style.opacity = 1;
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove( 'fa-circle-pause' );
        masterPlay.classList.add( 'fa-circle-play' );
        gif.style.opacity = 0;
    }
} )
// Listen to events.
audioElement.addEventListener( 'timeupdate', () =>
{    // Update Seekbar
    progress = parseInt( ( audioElement.currentTime / audioElement.duration ) * 100 );
    myProgressbar.value = progress;
} )

myProgressbar.addEventListener( 'change', () =>
{
    audioElement.currentTime = myProgressbar.value * audioElement.duration / 100;
} );

const makeAllPlays = () =>
{
    Array.from( document.getElementsByClassName( 'songItemPlay' ) ).forEach( ( element ) =>
    {
        element.classList.remove( 'fa-circle-pause' );
        element.classList.add( 'fa-circle-play' );
    } )
}

Array.from( document.getElementsByClassName( 'songItemPlay' ) ).forEach( ( element ) =>
{
    element.addEventListener( 'click', ( e ) =>
    {
        makeAllPlays();
        songIndex = parseInt( e.target.id );
        e.target.classList.remove( 'fa-circle-play' );
        e.target.classList.add( 'fa-circle-pause' );
        audioElement.src = `song/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove( 'fa-circle-play' );
        masterPlay.classList.add( 'fa-circle-pause' );
    } )
} )

document.getElementById( 'next' ).addEventListener( 'click', () =>
{
    if ( songIndex > 9 )
    {
        songIndex = 0
    }
    else
    {
        songIndex += 1;
    }
    audioElement.src = `song/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove( 'fa-circle-play' );
    masterPlay.classList.add( 'fa-circle-pause' );
} )

document.getElementById( 'previous' ).addEventListener( 'click', () =>
{
    if ( songIndex <= 0 )
    {
        songIndex = 0
    }
    else
    {
        songIndex -= 1;
    }
    audioElement.src = `song/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove( 'fa-circle-play' );
    masterPlay.classList.add( 'fa-circle-pause' );
} )