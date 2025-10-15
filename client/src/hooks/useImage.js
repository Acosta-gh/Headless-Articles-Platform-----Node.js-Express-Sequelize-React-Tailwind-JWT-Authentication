import { useState, useEffect, useCallback } from "react";

import { uploadImage } from "@/services/image.services";

export const useImage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /*
    * Upload a new image to the server
    @param {File} file - Image file to upload
    @param {string} tempIdToken - Temporary ID for future article association
    @returns {string} URL of the uploaded image
  */
  const uploadNewImage = useCallback(async (file, tempIdToken) => {
    setLoading(true);
    try {
      const uploadedImageUrl = await uploadImage(file, tempIdToken);
      setImageUrl(uploadedImageUrl);
      return uploadedImageUrl;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    imageUrl,
    loading,
    error,
    uploadNewImage,
  };
};
