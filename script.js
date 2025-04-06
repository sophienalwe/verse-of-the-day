let verses = [];

fetch('verses.json')
  .then(response => response.json())
  .then(data => {
    verses = data;
    getRandomVerse();
  });

function getRandomVerse() {
  const randomIndex = Math.floor(Math.random() * verses.length);
  const verse = verses[randomIndex];
  document.getElementById('verse-ref').innerText = verse.verse;
  document.getElementById('verse-text').innerText = verse.text;
}
