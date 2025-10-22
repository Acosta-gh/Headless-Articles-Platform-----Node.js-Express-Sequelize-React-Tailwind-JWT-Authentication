/**
 * Transforms likes array into likeIds and likeCount
 * @param {Array} likes - likes array
 * @returns {Object} {likeIds, likeCount}
 */
const transformLikes = (likes = []) => {
  console.log("Transforming likes:", likes);
  const likeIds = likes.map((like) => like.userId);
  return {
    likeIds,
    likeCount: likeIds.length,
  };
};

/**
 * Transforms a comment with likes
 * @param {Object} commentData - comment data
 * @returns {Object} transformed comment
 */
const transformComment = (commentData) => {
  if (!commentData) return null;

  const { likes = [], ...rest } = commentData;
  return {
    ...rest,
    ...transformLikes(likes),
  };
};

/**
 * Transforms an array of comments with their replies
 * @param {Array} comments - array of comments
 * @returns {Array} transformed comments with replies
 */
const transformCommentsWithReplies = (comments) => {
  return comments.map((comment) => {
    const commentData = comment.toJSON ? comment.toJSON() : comment;
    const transformed = transformComment(commentData);

    if (commentData.replies && Array.isArray(commentData.replies)) {
      transformed.replies = commentData.replies.map((reply) =>
        transformComment(reply)
      );
    }

    return transformed;
  });
};

module.exports = {
  transformLikes,
  transformComment,
  transformCommentsWithReplies,
};
