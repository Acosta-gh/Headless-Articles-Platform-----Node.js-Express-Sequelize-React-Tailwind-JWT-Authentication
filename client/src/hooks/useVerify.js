import { useEffect, useState, useCallback } from "react";
import { verifyEmail as verifyEmailService } from "@/services/verify.services";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1/";
const VERIFY_URL = API_URL + "verify/";

export const useVerify = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const verifyEmail = useCallback(async (token) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await verifyEmailService(token);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, success, verifyEmail };
};
