// api/health.js
module.exports = async (req, res) => {
  return res.status(200).json({
    status: "ok",
    service: "notion-vercel-proxy",
    time: new Date().toISOString()
  });
};
