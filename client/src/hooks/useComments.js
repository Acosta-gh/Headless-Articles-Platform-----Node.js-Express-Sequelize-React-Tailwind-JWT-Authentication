import { useState } from "react";
import {
  createComment,
  deleteComment,
  getAllCommentsByArticleId,
} from "@/services/comment.services";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export const useComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { token, isAuthenticated } = useAuth();

  const fetchAllCommentsByArticleId = async (articleId) => {
    setLoading(true);
    try {
      const data = await getAllCommentsByArticleId(articleId);
      const normalized = data.map((c) => ({
        ...c,
        replies: (c.replies || []).map((reply) => ({
          ...reply,
          likeIds: reply.likeIds || [],
          likeCount: reply.likeCount || 0,
        })),
        likeIds: c.likeIds || [],
        likeCount: c.likeCount || 0,
      }));

      setComments(normalized);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (commentData) => {
    setLoading(true);

    if (!isAuthenticated()) {
      toast.error("You must be logged in to post a comment.");
      setLoading(false);
      return;
    }

    try {
      const newComment = await createComment(commentData, token);

      if (newComment.commentId) {
        setComments((prevComments) => {
          return prevComments.map((c) => {
            if (c.id === newComment.commentId) {
              const updatedReplies = c.replies
                ? [...c.replies, newComment]
                : [newComment];
              return {
                ...c,
                replies: updatedReplies,
              };
            } else {
              return c;
            }
          });
        });
      } else {
        const normalizedNewComment = {
          ...newComment,
          replies: newComment.replies || [],
          likeIds: newComment.likeIds || [],
          likeCount: newComment.likeCount || 0,
        };
        setComments((prevComments) => [normalizedNewComment, ...prevComments]);
      }

      if (commentData.commentId) {
        toast.success("Reply added successfully.");
      } else {
        toast.success("Comment added successfully.");
      }

      return newComment;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCommentLikes = (commentId, likeData) => {
    //console.log(`Updating likes for comment ${commentId}:`, likeData);

    setComments((prevComments) =>
      prevComments.map((c) => {
        if (c.id === commentId) {
          return {
            ...c,
            likeCount: likeData.likeCount,
            likeIds: likeData.likeIds || [],
          };
        }

        // También actualizar replies
        if (c.replies && c.replies.length > 0) {
          return {
            ...c,
            replies: c.replies.map((reply) =>
              reply.id === commentId
                ? {
                    ...reply,
                    likeCount: likeData.likeCount,
                    likeIds: likeData.likeIds || [],
                  }
                : reply
            ),
          };
        }

        return c;
      })
    );
  };

  const removeComment = async (comment) => {
    setLoading(true);
    try {
      await deleteComment(comment.id, token);

      if (comment.commentId) {
        // Es una reply
        setComments((prev) =>
          prev.map((c) => {
            if (c.id === comment.commentId) {
              return {
                ...c,
                replies: c.replies.filter((r) => r.id !== comment.id),
              };
            }
            return c;
          })
        );
        toast.success("Reply deleted successfully");
        setLoading(false);
        return;
      } else {
        // Es un comentario principal
        setComments((prev) => prev.filter((c) => c.id !== comment.id));
        toast.success("Comment deleted successfully");
      }

      setComments((prev) => prev.filter((c) => c.id !== comment.id));
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    comments,
    loading,
    error,
    fetchAllCommentsByArticleId,
    addComment,
    removeComment,
    updateCommentLikes,
  };
};
