// controllers/article.controller.js
const articleService = require("@/services/article.service");

async function createArticle(req, res) {
  const authorId = req.user.id;

  // Parse categoryIds from request body
  let categoryIds = [];
  // If categoryIds is sent as a JSON string, parse it
  if (req.body.categoryIds) {
    // Parse the JSON string into an array
    categoryIds = typeof req.body.categoryIds === 'string'
      ? JSON.parse(req.body.categoryIds)
      : req.body.categoryIds;
  }

  try {
    let bannerPath = null;
    if (req.file) {
      bannerPath = `/uploads/${req.file.filename}`;
    }

    const { title, content, tempId } = req.body;
    const article = await articleService.createArticle({
      authorId,
      title,
      content,
      banner: bannerPath,
      tempId,
      categoryIds  
    });
    return res.status(201).json(article);
  } catch (error) {
    console.error("Error creating article:", error);
    return res
      .status(500)
      .json({ error: "Error creating article: " + error.message });
  }
}
async function getAllArticles(req, res) {
  const articles = await articleService.getAllArticles();
  return res.status(200).json(articles);
}

async function getArticleById(req, res) {
  const article = await articleService.getArticleById(req.params.id);
  if (!article) return res.status(404).json({ error: "Article not found" });
  return res.status(200).json(article);
}

async function updateArticle(req, res) {
  const article = await articleService.updateArticle(req.params.id, req.body);
  if (!article) return res.status(404).json({ error: "Article not found" });
  return res.status(200).json(article);
}

async function deleteArticle(req, res) {
  const deleted = await articleService.deleteArticle(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Article not found" });
  return res.status(204).send();
}

module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
};
