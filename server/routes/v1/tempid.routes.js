const express = require("express");
const router = express.Router();

const { createTempId } = require("@/controllers/tempid.controller");

// Create a new temp ID
router.get("/", createTempId);

module.exports = router;
