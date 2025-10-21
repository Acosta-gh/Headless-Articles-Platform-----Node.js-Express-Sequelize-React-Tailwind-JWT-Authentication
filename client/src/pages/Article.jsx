"use client";

import { useEffect, useState } from "react";

import { Header } from "@/components/article/Header";
import { Content } from "@/components/article/Content";
import { CommentSection } from "@/components/article/CommentSection";

import { useArticles } from "@/hooks/useArticles";
import { useComments } from "@/hooks/useComments";

import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "sonner";

import { BACKEND_URL } from "@/components/constants";

export default function Article() {
  const [article, setArticle] = useState(null);

  const { getArticle, loading } = useArticles();
  const { comments, addComment, fetchAllCommentsByArticleId } = useComments();

  const { id } = useParams();
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticle(id);
        setArticle(data);
        console.log("Fetched article data:", data);
        await fetchAllCommentsByArticleId(id);
        console.log("Fetched comments data:", comments);
      } catch (error) {
        console.error("Error fetching article:", error);
        toast.error("Failed to load article.");
      }
    };
    fetchArticle();
  }, [id]);

  console.log("Article data from hook:", article);
  console.log("Comments data from hook:", comments);

  const handleAddComment = async (content) => {
    try {
      await addComment({
        postId: id,
        content,
      });
      toast.success("Comment posted!");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to post comment.");
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
          />
        </div>
      </div>
    </div>
  );
}
