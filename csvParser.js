function parseCSV(text) {
  const songs = [];
  const lines = text.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.split(";");

    if(line.length !== 4){
      continue;
    }      

    const title = line[0].trim();
    const artist = line[1].trim();
    const difficulty = line[2].trim();
    const lyricsRaw = line[3].trim();

    const lyrics = lyricsRaw
      .split("|")
      .map((l) => l.trim())
      .filter((l) => l !== "");

    if (nullOrEmpty(artist) || nullOrEmpty(title) || lyrics.length === 0) {
      continue;
    }

    songs.push({ artist, title, difficulty, lyrics });
  }
  return songs;
}

function nullOrEmpty(textToCheck){
  return !textToCheck || textToCheck.length === 0
}