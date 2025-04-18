
const axios = require('axios');

module.exports = async (req, res) => {
  const NOTION_TOKEN = process.env.NOTION_TOKEN;
  const NOTION_VERSION = '2022-06-28';
  const baseURL = 'https://api.notion.com/v1/search';
  const id = req.query.id || '';
  const fullURL = id ? `${baseURL}/${id}` : baseURL;

  try {
    const response = await axios.post(
      fullURL,
      req.body,
      {
        headers: {
          'Authorization': `Bearer ${NOTION_TOKEN}`,
          'Notion-Version': NOTION_VERSION,
          'Content-Type': 'application/json'
        }
      }
    );
    res.status(200).json(response.data);
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({ error: 'Notion proxy error', detail: err?.response?.data });
  }
};
