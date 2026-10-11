const form = document.getElementById('search-form');
const resultsEl = document.getElementById('results');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const q = document.getElementById('q').value.trim();
  if (!q) return;

  // Call your proxy function
  const resp = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
  const data = await resp.json();

  resultsEl.innerHTML = '';
  data.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <a href="${item.url}" target="_blank">
        <img src="${item.thumbnail}" alt="">
        ${item.title}
      </a>`;
    resultsEl.appendChild(li);
  });
});
