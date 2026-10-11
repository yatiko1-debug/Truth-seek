exports.handler = async function (event, context) {
  const q = event.queryStringParameters?.q;
  if (!q) return { statusCode: 400, body: 'Missing q param' };

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return { statusCode: 500, body: 'Missing API key' };

  const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(q)}&type=video&maxResults=10&key=${apiKey}`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`YouTube API error ${res.status}`);

    const data = await res.json();

    // Map YouTube’s response to a simpler shape
    const items = data.items.map(i => ({
      url: `https://www.youtube.com/watch?v=${i.id.videoId}`,
      thumbnail: i.snippet.thumbnails.medium.url,
      title: i.snippet.title
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(items),
      headers: { 'Content-Type': 'application/json' }
    };

  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: 'Internal server error' };
  }
};
