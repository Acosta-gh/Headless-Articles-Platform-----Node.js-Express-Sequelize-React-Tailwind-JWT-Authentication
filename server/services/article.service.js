const {
  Article,
  User,
  Category,
  Comment,
  Like,
  Image,
} = require("@/models/index");
const { adoptTempImages } = require("@/utils/imageUtils");

const fs = require("fs");
const path = require("path");

const createArticle = async (data) => {
  try {
    const { categoryIds, tempId, ...articleData } = data;

    const article = await Article.create(articleData);

    if (Array.isArray(categoryIds)) {
      if (categoryIds.length > 0) {
        const categories = await Category.findAll({
          where: { id: categoryIds },
        });
        await article.setCategories(categories);
      } else {
        await article.setCategories([]);
      }
    }

    await adoptTempImages(tempId, article.id);

    return article;
  } catch (error) {
    throw new Error("Error creating article: " + error.message);
  }
};

const getAllArticles = async () => {
  try {
    const articles = await Article.findAll({
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "username", "email"],
        },
        {
          model: Image,
          as: "images",
          attributes: ["id", "url"],
        },
        {
          model: Like,
          as: "likes",
          attributes: ["id", "userId"],
          where: {
            commentId: null,
          },
          required: false,
        },
        {
          model: Category,
          as: "categories",
          attributes: ["id", "name"],
        },
      ],
    });
    return articles;
  } catch (error) {
    throw new Error("Error fetching articles: " + error.message);
  }
};

const getArticleById = async (id) => {
  try {
    const article = await Article.findByPk(id, {
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "username", "email"],
        },
        {
          model: Image,
          as: "images",
          attributes: ["id", "url"],
        },
        {
          model: Like,
          as: "likes",
          attributes: ["id", "userId"],
          where: {
            commentId: null,
          },
          required: false,
        },
        {
          model: Category,
          as: "categories",
          attributes: ["id", "name"],
        },
      ],
    });
    if (!article) {
      throw new Error("Article not found");
    }
    return article;
  } catch (error) {
    throw new Error("Error fetching article: " + error.message);
  }
};

const updateArticle = async (id, data) => {
  console.log("Updating article with ID:", id, "and data:", data);
  try {
    const article = await Article.findByPk(id);
    if (!article) {
      throw new Error("Article not found");
    }

    const { categoryIds, ...articleData } = data;

    await article.update(articleData);

    if (Array.isArray(categoryIds)) {
      if (categoryIds.length > 0) {
        const categories = await Category.findAll({
          where: { id: categoryIds },
        });
        await article.setCategories(categories);
      } else {
        await article.setCategories([]);
      }
    }

    return article;
  } catch (error) {
    throw new Error("Error updating article: " + error.message);
  }
};

const deleteArticle = async (id) => {
  if (!id) {
    throw new Error("Article ID is required");
  }

  try {
    const article = await Article.findByPk(id);
    if (!article) {
      throw new Error("Article not found");
    }

    const images = await Image.findAll({ where: { articleId: article.id } });

    for (const img of images) {
      const imagePath = path.join(
        __dirname,
        "../uploads",
        path.basename(img.url)
      );

      try {
        await fs.promises.unlink(imagePath);
      } catch (err) {
        console.error("Error deleting image:", err);
      }

      await img.destroy();
    }

    if (article.banner) {
      const bannerPath = path.join(
        __dirname,
        "../uploads",
        path.basename(article.banner)
      );

      try {
        await fs.promises.unlink(bannerPath);
      } catch (err) {
        console.error("Error deleting banner image:", err);
      }
    }

    await article.destroy();
    return { success: true, message: "Article deleted" };
  } catch (error) {
    throw new Error("Error deleting article: " + error.message);
  }
};

module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
};
