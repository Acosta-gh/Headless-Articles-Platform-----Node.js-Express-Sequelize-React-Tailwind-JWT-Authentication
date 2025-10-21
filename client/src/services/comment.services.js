import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1/";
const COMMENT_URL = API_URL + "comment";

export const getComments = async (commentId) => {
  const response = await axios.get(`${COMMENT_URL}/${commentId}`);
  return response.data;
};

export const createComment = async (commentData) => {
  const response = await axios.post(COMMENT_URL, commentData);
  return response.data;
};

export const deleteComment = async (commentId) => {
  await axios.delete(`${COMMENT_URL}/${commentId}`);
};  

export const getAllCommentsByArticleId = async (articleId) => {
  const response = await axios.get(COMMENT_URL, { params: { articleId } });
  console.log("Response data in getAllCommentsByArticleId:", response.data);
  return response.data;
}