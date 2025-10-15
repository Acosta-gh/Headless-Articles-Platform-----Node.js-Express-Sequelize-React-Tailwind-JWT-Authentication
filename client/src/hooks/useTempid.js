import { useEffect, useState, useCallback } from "react";
import { generateTempId } from "@/services/tempid.services";

export const useTempid = () => {
  const [tempId, setTempId] = useState(null);
  const [tempIdToken, setTempIdToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /*
    * Fetch a new temporary ID from the server
  */
  const fetchTempId = useCallback(async () => {
    setLoading(true);
    try {
      const data = await generateTempId();
      setTempId(data.tempId);
      setTempIdToken(data.token);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  /* Fetch temp ID on mount */
  useEffect(() => {
    fetchTempId();
  }, [fetchTempId]);

  return { tempId, tempIdToken, loading, error, fetchTempId };
}