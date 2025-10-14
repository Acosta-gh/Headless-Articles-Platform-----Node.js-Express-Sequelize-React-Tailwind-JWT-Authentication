import axios from "axios";

let API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1/";
const USERS_URL = API_URL + "user";

export const register = async (userData) => {
  const response = await axios.post(`${USERS_URL}/register`, userData);
  console.log("Usuario registrado:", response.data);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${USERS_URL}/login`, userData);
  console.log("Usuario logueado:", response.data);
  return response.data;
};
