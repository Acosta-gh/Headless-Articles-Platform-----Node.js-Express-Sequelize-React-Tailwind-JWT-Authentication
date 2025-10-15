import { useState, useEffect, useCallback } from "react";
import { getProfile as getProfileService } from "@/services/profile.services";
import { useAuth } from "@/hooks/useAuth";
import { jwtDecode } from "jwt-decode";

export const useProfile = () => {
  const { token, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const decoded = jwtDecode(token);
      console.log("Token:", token);
      console.log("Decoded token:", decoded);
      console.log("Fetching profile for user ID:", decoded.id);
      const userProfile = await getProfileService(decoded.id, token);
      setProfile(userProfile);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
    } else {
      setProfile(null);
    }
  }, [isAuthenticated, fetchProfile]);

  return {
    profile,
    loading,
    error,
  };
};
