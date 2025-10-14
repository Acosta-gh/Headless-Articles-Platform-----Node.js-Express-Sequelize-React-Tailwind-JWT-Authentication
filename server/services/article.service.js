const {Article, User, Category, Comment, Like, Image} = require('@/models/index');
const { adoptTempImages } = require('@/utils/imageUtils');

const fs = require('fs');
const path = require('path');

const createArticle = async (data) => {
  try {
    const { categoryIds, tempId, ...articleData } = data;

    const article = await Article.create(articleData);

    if (Array.isArray(categoryIds)) {
      if (categoryIds.length > 0) {
        const categories = await Category.findAll({ where: { id: categoryIds } });
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
          as: 'author',
          attributes: ['id', 'username', 'email']
        },
        {
          model: Image,
          as: 'images',
          attributes: ['id', 'url']
        },
        {
          model: Comment,
          as: 'comments',
          attributes: ['id', 'content', 'userId', 'articleId', 'createdAt'],
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'username', 'email']
            },
            {
              model: Comment,
              as: 'replies',
              include: [
                {
                  model: User,
                  as: 'user',
                  attributes: ['id', 'username', 'email']
                }
              ]
            }
          ]
        },
        {
          model: Like,
          as: 'likes',
          attributes: ['id', 'userId']
        },
         {
          model: Category,
          as: 'categories',
          attributes: ['id', 'name']
        }
      ]
    });
    return articles;
  } catch (error) {
    throw new Error("Error fetching articles: " + error.message);
  }
};

const getArticleById = async (id) => {
  try {
    const article = await Article.findByPk(id,{
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'email']
        },
        {
          model: Image,
          as: 'images',
          attributes: ['id', 'url']
        },
        {
          model: Comment,
          as: 'comments',
          attributes: ['id', 'content', 'userId', 'articleId', 'createdAt'],
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'username', 'email']
            },
            {
              model: Comment,
              as: 'replies',
              include: [
                {
                  model: User,
                  as: 'user',
                  attributes: ['id', 'username', 'email']
                }
              ]
            }
          ]
        },
        {
          model: Like,
          as: 'likes',
          attributes: ['id', 'userId']
        },
        {
          model: Category,
          as: 'categories',
          attributes: ['id', 'name']
        }
      ]
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
  try {
    const article = await Article.findByPk(id);
    if (!article) {
      throw new Error("Article not found");
    }

    const { categoryIds, tempId, ...articleData } = data;

    await article.update(articleData);

    if (Array.isArray(categoryIds)) {
      if (categoryIds.length > 0) {
        const categories = await Category.findAll({ where: { id: categoryIds } });
        await article.setCategories(categories);
      } else {
        await article.setCategories([]); // Limpia todas si se envía []
      }
    }

    await adoptTempImages(tempId, article.id);

    return article;
  } catch (error) {
    throw new Error("Error updating article: " + error.message);
  }
};

const deleteArticle = async (id) => {
  try {
    const article = await Article.findByPk(id);
    if (!article) {
      throw new Error("Article not found");
    }

    const images = await Image.findAll({ where: { articleId: article.id } });

    for (const img of images) {
      const imagePath = path.join(__dirname, '../uploads', path.basename(img.url));
      console.log("Deleting image at path:", imagePath);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image:", err);
        } else {
          console.log("Image deleted:", imagePath);
        }
      });
      await img.destroy();
    }

    if (article.banner) {
      const bannerPath = path.join(__dirname, '../uploads', path.basename(article.banner));
      console.log("Deleting banner image at path:", bannerPath);
      fs.unlink(bannerPath, (err) => {
        if (err) {
          console.error("Error deleting banner image:", err);
        } else {
          console.log("Banner image deleted:", bannerPath);
        }
      });
    }
    
    await article.destroy();

    return true;
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