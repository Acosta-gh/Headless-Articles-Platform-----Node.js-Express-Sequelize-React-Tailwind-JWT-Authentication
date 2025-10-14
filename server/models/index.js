  // models/index.js
  const { Article } = require('@/models/article.model');
  const { User } = require('@/models/user.model');
  const { Image } = require('@/models/image.model');
  const { Comment } = require('@/models/comment.model');
  const { Like } = require('@/models/like.model');
  const { Bookmark } = require('@/models/bookmark.model');
  const { Category } = require('@/models/category.model');

  // Define associations
  Article.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
  User.hasMany(Article, { foreignKey: 'authorId', as: 'articles' });

  Image.belongsTo(Article, { foreignKey: 'articleId', as: 'article' });
  Article.hasMany(Image, { foreignKey: 'articleId', as: 'images' });

  Comment.belongsTo(Article, { foreignKey: 'articleId', as: 'article' });
  Article.hasMany(Comment, { foreignKey: 'articleId', as: 'comments' });

  Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });

  Comment.belongsTo(Comment, { foreignKey: 'commentId', as: 'parentComment' });
  Comment.hasMany(Comment, { foreignKey: 'commentId', as: 'replies' });

  Like.belongsTo(Article, { foreignKey: 'articleId', as: 'article' });
  Article.hasMany(Like, { foreignKey: 'articleId', as: 'likes' });

  Like.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  User.hasMany(Like, { foreignKey: 'userId', as: 'likes' });

  Bookmark.belongsTo(Article, { foreignKey: 'articleId', as: 'article' });
  Article.hasMany(Bookmark, { foreignKey: 'articleId', as: 'bookmarks' });

  Bookmark.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  User.hasMany(Bookmark, { foreignKey: 'userId', as: 'bookmarks' });

  Article.belongsToMany(Category, { 
    through: 'ArticleCategories', // Intermediate table
    foreignKey: 'articleId',      // Key pointing to Article
    otherKey: 'categoryId',       // Key pointing to Category
    as: 'categories'              // Alias for the association
  });

  Category.belongsToMany(Article, {
    through: 'ArticleCategories',  // Intermediate table
    foreignKey: 'categoryId',      // Key pointing to Category
    otherKey: 'articleId',         // Key pointing to Article
    as: 'articles'                 // Alias for the association
  });

  module.exports = {
    Article,
    User,
    Image,
    Comment,
    Like,
    Bookmark,
    Category
  };