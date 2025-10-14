const express = require("express");
const router = express.Router();

const { verifyEmail } = require("@/controllers/verify.controller");

// Verify user email
router.post("/", verifyEmail);

module.exports = router;