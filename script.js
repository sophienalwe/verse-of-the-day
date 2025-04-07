

let verses = [];

fetch('verses.json')
  .then(response => response.json())
  .then(data => {
    verses = data;
  });

document.getElementById("generateBtn").addEventListener("click", function () {
  const theme = document.getElementById("themeSelect").value;

  // Filter verses based on selected theme
  const filtered = verses.filter(v => v.theme === theme);

  // Randomly pick one
  const random = filtered[Math.floor(Math.random() * filtered.length)];

  // Display it
  if (random) {
    document.getElementById("verseDisplay").innerHTML = `
      <p>"${random.verse}"</p>
      <p><strong>${random.reference}</strong></p>
    `;
  } else {
    document.getElementById("verseDisplay").innerHTML = "<p>No verse found for this theme.</p>";
  }
});