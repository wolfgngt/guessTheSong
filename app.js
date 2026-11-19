//TODO remove filepicker from html
const filePicker = document.getElementById("file-picker");
const songs = [];
var currentSong = { artist:"", title:"", difficulty:1, lyrics:[] };

filePicker.addEventListener("change", (event) => {
  const files = event.target.files;

  let reader = new FileReader();  
  reader.addEventListener("load", () => {
    songs.push(... parseCSV(reader.result));
    const selectedSong = songs[Math.floor(Math.random() * songs.length)];
    console.log(selectedSong);
    const displayedLyrics = document.getElementById("lyrics-list");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(selectedSong.lyrics[0]));
    displayedLyrics.appendChild(li);
    currentSong = selectedSong;
  });

  for (const file of files) {
    reader.readAsText(file, "UTF-8");
  }
});

const guessForm = document.getElementById("guess-form");
//TODO : do the click actions


//TODO : wrong guess -> next lyrics
//TODO : no more lyrics to display -> next song button
//TODO : fail -> show title/artist


//TODO : good guess -> show title, artist and display the next song button