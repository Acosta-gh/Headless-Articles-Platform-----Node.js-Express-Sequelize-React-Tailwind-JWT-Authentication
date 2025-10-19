import { useState, useEffect, useCallback } from "react";
import {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle as deleteArticleService,
} from "@/services/article.services";
import { useAuth } from "@/hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

export const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const decoded = token ? jwtDecode(token) : null;

  /*
   * Fetch all articles from the server
   */
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

  /*
    * Create a new article
    @param {Object} articleData - Data for the new article
    @param {string} tempIdToken - Temporary ID to associate the article with image uploads
    @returns {Object} The created article
  */
  const createNewArticle = async (articleData, tempIdToken) => {
    setLoading(true);
    try {
      console.log(
        "Creating article with data:",
        articleData,
        "and tempIdToken:",
        tempIdToken
      );
      const newArticle = await createArticle(articleData, tempIdToken, token);
      setArticles((prevArticles) => [newArticle, ...prevArticles]);
      return newArticle;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (id) => {
    setLoading(true);
    try {
      await deleteArticleService(id, token);
      setArticles((prevArticles) =>
        prevArticles.filter((article) => article.id !== id)
      );
      toast.success("Article deleted successfully");
    } catch (error) {
      setError(error);
      toast.error("Failed to delete article");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateExistingArticle = async (id, articleData, tempIdToken) => {
    setLoading(true);
    try {
      console.log(
        "Updating article with data:",
        articleData,
        "and tempIdToken:",
        tempIdToken
      );
      const updatedArticle = await updateArticle(id, articleData, tempIdToken, token);
      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article.id === id ? updatedArticle : article
        )
      );
      return updatedArticle;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /*
   * Fetch articles on mount
   */
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return {
    articles,
    loading,
    error,
    fetchArticles,
    createNewArticle,
    updateExistingArticle,
    deleteArticle,
  };
};
