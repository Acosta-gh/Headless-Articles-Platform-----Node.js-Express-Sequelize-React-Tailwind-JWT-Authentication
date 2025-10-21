import { useState, useEffect } from "react";

import {
  getComments,
  createComment,
  deleteComment,
  getAllCommentsByArticleId,
} from "@/services/comment.services";
export const useComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = async (postId) => {
    setLoading(true);
    try {
      const data = await getComments(postId);
      setComments(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (commentData) => {
    setLoading(true);
    try {
      const newComment = await createComment(commentData);
      setComments((prev) => [...prev, newComment]);
      return newComment;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeComment = async (commentId) => {
    setLoading(true);
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchAllCommentsByArticleId = async (articleId) => {
    console.log("Trying to fetch comments for articleId:", articleId);
    setLoading(true);
    try {
      console.log("Calling getAllCommentsByArticleId with articleId:", articleId);
      const data = await getAllCommentsByArticleId(articleId);
      console.log("Fetched comments data:", data);
      setComments(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    comments,
    loading,
    error,
    fetchComments,
    fetchAllCommentsByArticleId,
    addComment,
    removeComment,
  };
};
