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
    <p id ="verse-text">"${random.verse}"</p>
    <p id="verse-reference"><strong>${random.reference}</strong></p>
    `;
    document.getElementById("email-verse-btn").href =
  `mailto:?subject=Verse of the Day&body=${encodeURIComponent('"' + random.verse + '"\n\n' + random.reference)}`;

  } else {
    document.getElementById("verseDisplay").innerHTML = "<p>No verse found for this theme.</p>";
    document.getElementById("email-verse-btn").href = "#";
  }
});
// Favorite button handler
document.getElementById('favorite-btn').addEventListener('click', () => {
  const verseText = document.getElementById('verse-text').innerText;
  if (!verseText) return;

  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (!favorites.includes(verseText)) {
    favorites.push(verseText);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('Verse added to favorites! 💛');
  } else {
    alert('This verse is already in your favorites! ✨');
  }
});

// Show favorites
document.getElementById('show-favorites-btn').addEventListener('click', () => {
  const container = document.getElementById('favorites-container');
  const list = document.getElementById('favorites-list');

  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  container.innerHTML = '';

  if (favorites.length === 0) {
    container.innerHTML = '<li>No favorites yet! 📭</li>';
  } else {
    favorites.forEach((verse, index) => {
      const li = document.createElement('li');
      li.innerText = verse;

      // Add a remove button
      const removeBtn = document.createElement('button');
      removeBtn.innerText = '❌';
      removeBtn.onclick = () => {
        favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        document.getElementById('show-favorites-btn').click(); // refresh
      };

      li.appendChild(removeBtn);
      container.appendChild(li);
    });
  }

  list.style.display = list.style.display === 'none' ? 'block' : 'none';
});
