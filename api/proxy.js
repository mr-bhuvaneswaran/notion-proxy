module.exports = async (req, res) => {
  const NOTION_TOKEN = process.env.NOTION_TOKEN;
  const NOTION_VERSION = '2022-06-28';

  const { method, url: incomingPath, body } = req;

  // Clean the path: strip "/api" from beginning
  const notionPath = incomingPath.replace(/^\/api/, '') || '/';
  const targetUrl = `https://api.notion.com/v1/${notionPath}`;

  console.log("Proxying to:", targetUrl);
  console.log("Body to:", body);
  console.log("NOTION_TOKEN to:", NOTION_TOKEN);

  try {
    const fetchOptions = {
      method,
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json'
      }
    };

    if (method !== 'GET' && method !== 'HEAD') {
      fetchOptions.body = JSON.stringify(body);
    }

    const response = await fetch(targetUrl, fetchOptions);
    const result = await response.json();

    console.log("Response from Notion:", result);

    res.status(response.status).json(result);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({
      error: 'Proxy error',
      detail: error.message
    });
  }
};
