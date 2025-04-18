
const axios = require('axios');

module.exports = async (req, res) => {
  const NOTION_TOKEN = process.env.NOTION_TOKEN;
  const NOTION_VERSION = '2022-06-28';

  try {
    const method = req.query.method;
    const id = req.query.id || '';
    const sub = req.query.sub || '';
    const url = `https://api.notion.com/v1${id}${sub ? '/' + sub : ''}`;

    const headers = {
      'Authorization': `Bearer ${NOTION_TOKEN}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json'
    };

    const config = { headers };
    let response;

    switch (method) {
      case 'GET':
        response = await axios.get(url, config);
        break;
      case 'POST':
        response = await axios.post(url, req.body, config);
        break;
      case 'PATCH':
        response = await axios.patch(url, req.body, config);
        break;
      case 'DELETE':
        response = await axios.delete(url, config);
        break;
      default:
        return res.status(400).json({ error: 'Unsupported method' });
    }

    res.status(200).json(response.data);
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({ error: 'Notion proxy error', detail: err?.response?.data });
  }
};
