const express = require("express");
const router = express.Router();

const { verifyEmail, resendVerificationEmail} = require("@/controllers/verify.controller");

const {verifyLimiter, resendLimiter} = require("@/middlewares/rateLimit.middleware");

// Verify user email
router.post("/resend", resendLimiter, resendVerificationEmail);
router.post("/", verifyLimiter, verifyEmail);

module.exports = router;