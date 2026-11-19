//TODO remove filepicker from html
const filePicker = document.getElementById("file-picker");
const displayedLyrics = document.getElementById("lyrics-list");
const guessInput = document.getElementById("guess-input");
const guessForm = document.getElementById("guess-form");
const guessButton = document.getElementById("guess-form-button");
const nextSongButton = document.getElementById("next-song-button");

const songs = [];
var currentSong = { artist:"", title:"", difficulty:1, lyrics:[] };
var lyricsShownCount = 0;


function selectNewSong() {
  currentSong = songs[Math.floor(Math.random() * songs.length)];

  guessInput.value = "";
  lyricsShownCount = 0;
  displayedLyrics.innerHTML = "";
  displayedLyrics.scrollTop = displayedLyrics.scrollHeight;

  showNextLyric();
}

function showNextLyric() {
  if (lyricsShownCount < currentSong.lyrics.length) {
    addLyricLine(currentSong.lyrics[lyricsShownCount]);
    lyricsShownCount++;
  }
}

function addLyricLine(text) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(text));
  displayedLyrics.appendChild(li);
  displayedLyrics.scrollTop = displayedLyrics.scrollHeight;
}

function revealSong(success) {  
  addLyricLine("FIN DU JEU:")
  addLyricLine(success ? "✨ BRAVO !!! ✨" : "😭 Oh non... 😭")
  addLyricLine("C'était \"" + currentSong.title + "\" de " + currentSong.artist);
  displayedLyrics.scrollTop = displayedLyrics.scrollHeight;

  guessInput.value = ""
}

function toggleSongButtonVisibility(){
  guessButton.hidden = !guessButton.hidden;
  nextSongButton.hidden = !nextSongButton.hidden;
}

filePicker.addEventListener("change", (event) => {
  const files = event.target.files;

  let reader = new FileReader();  
  reader.addEventListener("load", () => {
    songs.push(... parseCSV(reader.result));
    selectNewSong();
  });

  for (const file of files) {
    reader.readAsText(file, "UTF-8");
  }
});

guessForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const guess = guessInput.value;

  if (guess === currentSong.title) {
    revealSong(true);
    toggleSongButtonVisibility();
    return;
  }

  if (lyricsShownCount < currentSong.lyrics.length) {
    showNextLyric();
  } else {
    revealSong(false);
    toggleSongButtonVisibility();
  }
});

nextSongButton.addEventListener("click", () => {
  toggleSongButtonVisibility();
  selectNewSong();
});


//TODO : scoring? calculer + incrémenter du score
//TODO : multi? assigner le score a une personne (menu déroulant truc du genre)
//TODO : multi : attribution des points (choix joueur) uniquement si GG
//TODO : QoL, ne plus avoir a charger csv, redémarrer partie, changer nb joueurs
//TODO : stocker score max en local? possibilité de réset score