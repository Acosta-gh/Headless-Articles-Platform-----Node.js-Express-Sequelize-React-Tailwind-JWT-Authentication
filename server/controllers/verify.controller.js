const verifyService = require("@/services/verify.service");

async function verifyEmail(req, res) {
  const { token } = req.query;
  if (!token) {
    return res.status(400).json({ error: "Verification token is required" });
  }

  try {
    const result = await verifyService.verifyUserEmail(token);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error verifying email:", error);
    return res.status(400).json({ error: error.message });
  }
}

module.exports = {
  verifyEmail,
};  