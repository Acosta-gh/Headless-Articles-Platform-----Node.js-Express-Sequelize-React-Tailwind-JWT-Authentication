
const express = require('express');
const router = express.Router();
const { upload, multerErrorHandler } = require('@/middlewares/upload.middleware');

const { createImage, getAllImages } = require('@/controllers/image.controller');

const { verifyTempIdToken } = require('@/middlewares/tempid.middleware');

// Create a new image
router.post('/', upload.single('image'), multerErrorHandler, verifyTempIdToken, createImage);

// Get all images
router.get('/', getAllImages);

module.exports = router;    