import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get(`https://api.notion.com/v1/comments?block_id={{BLOCK_ID}}&page_size=100`, null, {
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message, details: error.response?.data });
  }
}
