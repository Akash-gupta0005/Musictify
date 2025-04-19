// let play=document.querySelector("#play");
// play.addEventListener(onclick,()=>{
//     play.className="fa-solid fa-pause";
// });

console.log("Let's write javascript")
async function getSong() {
    let a = await fetch("http://127.0.0.1:5500/Musicoctify/songs/");
    let response = await a.text();
    // console.log(response);
    let div = document.createElement('div');
    div.innerHTML = response;
    let list = div.getElementsByTagName('a');
    // console.log(list);
    let songs = [];
    for (let index = 0; index < list.length; index++) {
        const element = list[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href);
        }
    }
    return songs;
}
async function main() {
    //list of all songs
    let songs = await getSong();
    // console.log(songs);

    //play the all songs
    // initialize audio with the first song
    let currentSongIndex = 0;
    let audio = new Audio(songs[currentSongIndex]);

    // Select play button
    let playBtn = document.querySelector("#play");

    playBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            playBtn.classList.remove("fa-play");
            playBtn.classList.add("fa-pause");
        } else {
            audio.pause();
            playBtn.classList.remove("fa-pause");
            playBtn.classList.add("fa-play");
        }
    });
    
     // Optional: Add listeners for next/prev if needed
     document.querySelector(".fa-forward-step").addEventListener("click", () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        audio.src = songs[currentSongIndex];
        audio.play();
    });

    document.querySelector(".fa-backward-step").addEventListener("click", () => {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        audio.src = songs[currentSongIndex];
        audio.play();
    });

    //Listen for time update
    audio.addEventListener("timeupdate",()=>{
        console.log(audio.currentTime,audio.duration);
    })
}
main();

