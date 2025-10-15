import { useState, useEffect } from "react";
import { getCategories, createCategory, deleteCategory } from "@/services/category.services";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (categoryData) => {
    setLoading(true);
    try {
      const newCategory = await createCategory(categoryData);
      setCategories((prev) => [...prev, newCategory]);
      return newCategory;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeCategory = async (categoryId) => {
    setLoading(true);
    try {
      await deleteCategory(categoryId);
      setCategories((prev) => prev.filter(c => c.id !== categoryId));
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  return { categories, loading, error, fetchCategories, addCategory, removeCategory };
};