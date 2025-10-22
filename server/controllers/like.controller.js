const likeService = require('@/services/like.service');

async function createLike(req, res) {
  console.log("Creating/Undoing like with data:", req.body, "for user:", req.user);
  try {
    const result = await likeService.createLike(req.body, req.user.id);
    return res.status(201).json(result);
  } catch (error) {
    console.error("Error while creating/removing like:", error);
    return res.status(500).json({ error: error.message });
  }
}

async function getLikesByArticleId(req, res) {
  try {
    const likes = await likeService.getLikesByArticleId(req.query.articleId);
    return res.status(200).json(likes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createLike,
  getLikesByArticleId,
};  