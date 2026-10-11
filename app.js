// Grab the form and results container
const form = document.getElementById('searchForm');
const resultsEl = document.getElementById('results');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const q = document.getElementById('q').value.trim();
  if (!q) return; // nothing to search

  try {
    // Call the Netlify function (or your local proxy)
    const resp = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

    const data = await resp.json(); // array of { url, thumbnail, title }

    // Render the results
    resultsEl.innerHTML = '';
    data.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <a href="${item.url}" target="_blank">
          <img src="${item.thumbnail}" alt="${item.title}">
          ${item.title}
        </a>`;
      resultsEl.appendChild(li);
    });

  } catch (err) {
    console.error(err);
    resultsEl.innerHTML = '<p>Sorry, something went wrong.</p>';
  }
});
