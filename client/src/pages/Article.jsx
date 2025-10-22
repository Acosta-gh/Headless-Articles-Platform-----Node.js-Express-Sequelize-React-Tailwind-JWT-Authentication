"use client";

import { useEffect, useState } from "react";

import { Header } from "@/components/article/Header";
import { Content } from "@/components/article/Content";
import { CommentSection } from "@/components/article/CommentSection";

import { useArticles } from "@/hooks/useArticles";
import { useComments } from "@/hooks/useComments";
import { useLikes } from "@/hooks/useLikes";
import { useAuth } from "@/hooks/useAuth";

import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "sonner";

import { BACKEND_URL } from "@/components/constants";

export default function Article() {
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);

  const { getArticle, loading } = useArticles();
  const {
    comments: fetchedComments,
    addComment,
    fetchAllCommentsByArticleId,
    updateCommentLikes,
  } = useComments();

  const {
    likes,
    loading: likesLoading,
    error: likesError,
    toggleLikeStatus,
  } = useLikes(updateCommentLikes);

  // user id from auth hook
  const { userId } = useAuth();

  // Post Id from URL params
  const { id } = useParams();

  // Sync fetched comments with local state
  useEffect(() => {
    setComments(fetchedComments);
  }, [fetchedComments]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticle(id);
        setArticle(data);
        await fetchAllCommentsByArticleId(id);
      } catch (error) {
        console.error("Error fetching article:", error);
        toast.error("Failed to load article.");
      }
    };
    fetchArticle();
  }, [id]);

  const handleAddLikeToComment = async ({ commentId }) => {
    try {
      console.log("Adding like to comment ID:", commentId);
      console.log("Article ID is:", id);
      
      const response = await toggleLikeStatus(id, commentId);
      
      // Actualizar el comentario localmente con los nuevos likes
      setComments((prevComments) =>
        prevComments.map((comment) => {
          // Actualizar el comentario principal
          if (comment.id === commentId) {
            return {
              ...comment,
              likeIds: response.likeIds,
              likeCount: response.likeCount,
            };
          }
          
          // Actualizar replies si existe el comentario dentro de replies
          if (comment.replies && comment.replies.length > 0) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === commentId
                  ? {
                      ...reply,
                      likeIds: response.likeIds,
                      likeCount: response.likeCount,
                    }
                  : reply
              ),
            };
          }
          
          return comment;
        })
      );
    } catch (error) {
      console.error("Error toggling like status:", error);
      toast.error("Failed to update like status.");
    }
  };

  const handleAddReply = async (content, parentId) => {
    //console.log("handleAddReply: Adding reply to comment ID:", parentId);
    try {
      await addComment({
        articleId: id,
        commentId: parentId,
        content,
      });
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  const handleAddComment = async (content) => {
    try {
      await addComment({
        articleId: id,
        content,
      });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (loading || !article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Header
          categories={article.categories}
          title={article.title}
          author={article.author.username}
          publishedDate={(article.updatedAt
            ? new Date(article.updatedAt)
            : new Date(article.createdAt)
          ).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
          onBack={() => navigate.push("/")}
        />

        <div className="mt-16">
          <Content
            content={article.content}
            coverImage={BACKEND_URL + article.banner}
          />
        </div>

        <div className="mt-16">
          <CommentSection
            comments={comments}
            onAddComment={handleAddComment}
            onAddReply={handleAddReply}
            onAddLike={handleAddLikeToComment}
            currentUserId={userId}
            likesLoading={likesLoading}
          />
        </div>
      </div>
    </div>
  );
}