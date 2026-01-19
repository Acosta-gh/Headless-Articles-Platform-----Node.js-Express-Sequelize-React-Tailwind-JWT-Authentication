const express = require("express");
const router = express.Router();

// ======================================================================
//                   📧 Verify Controllers
// ======================================================================
const {
  verifyUserEmail,           
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

// Verify user email -  /verify?token=xxx
router.post("/", verifyLimiter, verifyUserEmail);

// Verify subscriber email -  /verify/subscriber?token=xxx
router.post("/subscriber", verifyLimiter, verifySubscriberEmail);

// Resend verification email - POST /verify/resend
router.post("/resend", resendLimiter, resendVerificationEmail);

module.exports = router;