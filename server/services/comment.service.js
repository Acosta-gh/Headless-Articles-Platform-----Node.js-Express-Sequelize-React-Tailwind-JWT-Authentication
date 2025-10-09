const { Comment } = require("@/models/index");

const createComment = async (data) => {
  try {
    const comment = await Comment.create(data);
    return comment;
  } catch (error) {
    throw new Error("Error creating comment: " + error.message);
  }
};

const deleteComment = async (id) => {
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      throw new Error("Comment not found");
    }
    await comment.destroy();
    return true;
  } catch (error) {
    throw new Error("Error deleting comment: " + error.message);
  }
};

const getCommentById = async (id) => {
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      throw new Error("Comment not found");
    }
    return comment;
  } catch (error) {
    throw new Error("Error fetching comment: " + error.message);
  }
};

const getAllComments = async () => {
  try {
    const comments = await Comment.findAll();
    return comments;
  } catch (error) {
    throw new Error("Error fetching comments: " + error.message);
  }
};

module.exports = {
  createComment,
  deleteComment,
  getAllComments,
  getCommentById,
};
