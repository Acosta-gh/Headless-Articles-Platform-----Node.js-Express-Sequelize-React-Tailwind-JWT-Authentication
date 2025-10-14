import { useState, useEffect, useCallback } from "react";
import {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from "@/services/article.services";

export const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getArticles();
      setArticles(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createNewArticle = async (articleData, tempIdToken) => {
    setLoading(true);
    try {
      const newArticle = await createArticle(articleData, tempIdToken);
      setArticles((prevArticles) => [newArticle, ...prevArticles]);
      return newArticle;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return {
    articles,
    loading,
    error,
    fetchArticles,
    createNewArticle,
  };
};
