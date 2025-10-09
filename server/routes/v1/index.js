// routes/v1/index.js
const express = require('express');
const router = express.Router();

// Import article routes
const articleRoutes = require('@/routes/v1/article.routes');
const userRoutes = require('@/routes/v1/user.routes');
const commentRoutes = require('@/routes/v1/comment.routes');
const tempIdRoutes = require('@/routes/v1/tempid.routes');
const imageRoutes = require('@/routes/v1/image.routes');

// Use image routes for any requests to /image
router.use('/image', imageRoutes);
// Use temp ID routes for any requests to /tempid
router.use('/tempid', tempIdRoutes);
// Use comment routes for any requests to /comment
router.use('/comment', commentRoutes);
// Use user routes for any requests to /user
router.use('/user', userRoutes);
// Use article routes for any requests to /article
router.use('/article', articleRoutes);

// Prefix all routes with /v1 for versioning
router.get('/', (req, res) => res.send('API v1 is running'));

module.exports = router;