const express = require("express");
const router = express.Router();

// ======================================================================
//                   📧 Verify Controllers
// ======================================================================
const {
  verifyEmail,
  verifySubscriberEmail,
  resendVerificationEmail,
} = require("@/controllers/verify.controller");

// ======================================================================
//            🔐 Rate Limiting Middlewares
// ======================================================================
const {
  verifyLimiter,
  resendLimiter,
} = require("@/middlewares/rateLimit.middleware");

// ======================================================================
//                      📧 Verify Routes
// ======================================================================
// Verify user email
router.post("/resend", resendLimiter, resendVerificationEmail);
// Resend verification email
router.post("/", verifyLimiter, verifyEmail);
// Verify subscriber email
router.post("/subscriber", verifyLimiter, verifySubscriberEmail);

module.exports = router;
