const axios = require('axios');

module.exports = async (req, res) => {
  const NOTION_TOKEN = process.env.NOTION_TOKEN;
  const NOTION_VERSION = '2022-06-28';

  const { method, url: incomingPath, body, headers: incomingHeaders } = req;

  // Strip `/api/proxy.js` from the beginning of the request path
  const notionPath = incomingPath.replace(/^\/api/, '') || '/';
  const targetUrl = notionPath;

  console.log("Proxying to:", targetUrl);
console.log("body to:", body);


  try {
    const response = await axios({
      method,
      url: targetUrl,
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
        ...incomingHeaders
      },
      data: body
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error?.response?.data || error.message);
    res.status(error?.response?.status || 500).json({
      error: 'Proxy error',
      detail: error?.response?.data || error.message
    });
  }
};
