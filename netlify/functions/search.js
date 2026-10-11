// netlify/functions/search.js
const fetch = require('node-fetch');   // remove this line if you’re on Node 18+

exports.handler = async function(event, context) {
  const q = event.queryStringParameters.q;
  if (!q) return { statusCode: 400, body: 'Missing query' };

  // --- YouTube example (replace YOUR_KEY) ---
  const YT_API = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCZgJ7z8B2qUe3S6bN0oY5WQ&maxResults=10&q=${encodeURIComponent(q)}&key=YOUR_KEY`;
  const ytRes = await fetch(YT_API);
  const ytData = await ytRes.json();

  const results = (ytData.items || []).map(v => ({
    title: v.snippet.title,
    url: `https://www.youtube.com/watch?v=${v.id.videoId}`,
    thumbnail: v.snippet.thumbnails.default.url
  }));

  return { statusCode: 200, body: JSON.stringify(results) };
};
