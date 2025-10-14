import { useCallback } from "react";
import { jwtDecode } from "jwt-decode";

// Rename the imports to avoid conflicts
import { register as registerService, login as loginService } from "@/services/auth.service";

function getToken() {
  return localStorage.getItem("token");
}

function isExpired(token) {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
}

function checkAdmin(token) {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    return decoded.admin === true;
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
}

export function useAuth() {
  const login = useCallback(async (credentials) => {
    const response = await loginService(credentials);
    if (response.token) {
      localStorage.setItem("token", response.token);
    }
    return response;
  }, []);

  const register = useCallback(async (userData) => {
    const response = await registerService(userData); 
    return response;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
  }, []);

  const isAuthenticated = useCallback(() => {
    const token = getToken();
    return token && !isExpired(token);
  }, []);

  const isAdmin = useCallback(() => {
    const token = getToken();
    return checkAdmin(token);
  }, []);

  return { login, register, logout, isAuthenticated, isAdmin };
}