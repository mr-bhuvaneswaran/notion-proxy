import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.post(`https://api.notion.com/v1/search`, req.body, {
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
