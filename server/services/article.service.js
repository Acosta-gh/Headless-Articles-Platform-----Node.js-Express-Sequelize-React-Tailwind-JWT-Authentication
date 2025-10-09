// services/article.service.js
const {Article, User, Comment, Like, Image} = require('@/models/index');
const fs = require('fs');
const path = require('path');

const createArticle = async (data) => {
  try {
    const article = await Article.create(data);

    if(data.tempId){
      const images = await Image.findAll({ where: { tempId: data.tempId } });
      await Promise.all(images.map(img => img.update({ articleId: article.id, tempId: null })));
      
      article.tempId = null;
      await article.save();
    }

    return article;
  } catch (error) {
    throw new Error("Error creating article: " + error.message);
  }
};

const getAllArticles = async () => {
  try {
    const articles = await Article.findAll({include: [
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
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'email']
        }],
        include: [{
          model: Comment,
          as: 'replies',
          include: [{
            model: User,
            as: 'user',
            attributes: ['id', 'username', 'email']
          }]
        }],
        attributes: ['id', 'content', 'userId', 'articleId', 'createdAt']
      },
      {
        model: Like,
        as: 'likes',
        attributes: ['id', 'userId']
      } 
    ]});
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
          include: [{
            model: User,
            as: 'user',
            attributes: ['id', 'username', 'email']
          }],
          include: [{
            model: Comment,
            as: 'replies',
            include: [{
              model: User,
              as: 'user',
              attributes: ['id', 'username', 'email']
            }]
          }],
          attributes: ['id', 'content', 'userId', 'articleId', 'createdAt']
        },
        {
          model: Like,
          as: 'likes',
          attributes: ['id', 'userId']
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
    await article.update(data);
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

    if(article.banner){
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