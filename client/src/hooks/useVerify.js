import { useEffect, useState, useCallback } from "react";
import { verifyEmail as verifyEmailService, resendVerificationEmail as resendEmailService } from "@/services/verify.services";

export const useVerify = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  /*
    * Verify email with the provided token
    @param {string} token - Verification token from email
  */
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

  const resendVerificationEmail = useCallback(async (email) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await resendEmailService(email);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, success, verifyEmail, resendVerificationEmail };
};
