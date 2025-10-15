import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1/";
const CATEGORY_URL = API_URL + "category/";

export const getCategories = async () => {
  const response = await axios.get(CATEGORY_URL);
  return response.data;
};

export const createCategory = async (categoryData) => {
  const response = await axios.post(CATEGORY_URL, categoryData);
  return response.data;
};

export const deleteCategory = async (categoryId) => {
  await axios.delete(`${CATEGORY_URL}${categoryId}`);
};