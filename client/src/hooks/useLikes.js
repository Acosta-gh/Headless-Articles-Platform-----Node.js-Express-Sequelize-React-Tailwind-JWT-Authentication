import { useState } from "react";
import { toggleLike } from "@/services/like.services";
import { useAuth } from "@/hooks/useAuth";

import { toast } from "sonner";

export const useLikes = (onCommentLikeChange) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const toggleLikeStatus = async (articleId, commentId) => {
    //console.log("Toggling like for articleId:", articleId, "commentId:", commentId);
    
    if (loading) {
      //console.log("Already processing a like, ignoring this click");
      return;
    }

    setLoading(true);
    try {
      const response = await toggleLike(articleId, commentId, token);
      //console.log("Response from toggleLike:", response);

      if (commentId && onCommentLikeChange) {
        onCommentLikeChange(commentId, {
          likeCount: response.likeCount,
          likeIds: response.likeIds,
          liked: response.liked,
        });
      }

      toast.success(response.liked ? "Liked" : "Like removed");

      return response;
      
    } catch (error) {
      setError(error);
      //console.error("Error toggling like:", error);
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    toggleLikeStatus,
  };
};