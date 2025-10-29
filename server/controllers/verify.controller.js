const verifyService = require("@/services/verify.service");

async function verifyEmail(req, res) {
  console.log("Verify email request query:", req.query);
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

async function resendVerificationEmail(req, res) {
  console.log("Resend verification email request body:", req.body);
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const result = await verifyService.resendVerificationEmail(email);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error resending verification email:", error);
    return res.status(500).json({ error: error.message });
  }
} 

async function verifySubscriberEmail(req, res) {
  console.log("Verify subscriber email request query:", req.query);
  const { token } = req.query;
  if (!token) {
    return res.status(400).json({ error: "Verification token is required" });
  }

  try {
    const result = await verifyService.verifySubscriberEmail(token);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error verifying subscriber email:", error);
    return res.status(400).json({ error: error.message });
  }
} 

module.exports = {
  verifyEmail,
  resendVerificationEmail,
  verifySubscriberEmail,
};