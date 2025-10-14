import axios from "axios";

let API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1/";
const ARTICLES_URL = API_URL + "article/";

export const getArticles = async () => {
  const response = await axios.get(ARTICLES_URL);
  return response.data;
};

export const getArticleById = async (id) => {
  const response = await axios.get(`${ARTICLES_URL}/${id}`);
  return response.data;
};

export const createArticle = async (articleData, tempIdToken) => {
  const response = await axios.post(ARTICLES_URL, articleData, {
    headers: {
      "x-tempid-token": tempIdToken, 
    },
  });
  return response.data;
};

export const updateArticle = async (id, articleData) => {
  const response = await axios.put(`${ARTICLES_URL}/${id}`, articleData);
  return response.data;
};

export const deleteArticle = async (id) => {
  const response = await axios.delete(`${ARTICLES_URL}/${id}`);
  return response.data;
};
