import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { FeaturedPostSidebarItem } from "@/components/blog/featured-post-sidebar-item";

import { useArticles } from "@/hooks/useArticles";
import { BACKEND_URL } from "@/components/constants";
import { ArrowRight } from "lucide-react";

import { Link } from "react-router-dom";

const BlogPage = () => {
  const { articles } = useArticles();

  const featuredArticles = articles.filter((article) => article.featured);
  const mainFeaturedArticle = featuredArticles[0];
  const otherFeaturedArticles = featuredArticles.slice(1, 5);
  const recentArticles = articles
    .filter((article) => !article.featured)
    .slice(0, 3);

  if (!articles || articles.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="text-2xl font-bold mb-2">No Articles Available</h2>
          <p className="text-muted-foreground">
            Articles will appear here once they are published.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      {/* Main Featured Article */}
      {mainFeaturedArticle && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mb-12">
          {/* Large Featured Post */}

          <Link to={`/article/${mainFeaturedArticle.id}`} className="relative h-[400px] overflow-hidden rounded-lg shadow-lg md:h-[500px] lg:col-span-2 group cursor-pointer">
            {mainFeaturedArticle.banner ? (
         
                <img
                  src={`${BACKEND_URL}${mainFeaturedArticle.banner}`}
                  alt={mainFeaturedArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
                <span className="text-muted-foreground">Sin imagen</span>
              </div>
            )}
            <Link />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 text-white">
              {mainFeaturedArticle.categories.length > 0 && (
                <Badge className="mb-2 w-fit bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 transition-colors">
                  {mainFeaturedArticle.categories[0]?.name || "Destacado"}
                </Badge>
              )}
              <h2 className="text-2xl leading-tight font-bold md:text-3xl mb-2">
                {mainFeaturedArticle.title}
              </h2>
              <p className="text-sm text-white/80">
                Por{" "}
                <span className="font-semibold">
                  {mainFeaturedArticle.author?.username}
                </span>{" "}
                •{" "}
                {new Date(mainFeaturedArticle.createdAt).toLocaleDateString(
                  "es-ES"
                )}
              </p>
            </div>
          </Link>

          {/* Other Featured Posts Sidebar */}
          <div className="bg-card text-card-foreground space-y-6 rounded-lg border p-6 lg:col-span-1 h-fit sticky top-4">
            <h3 className="text-xl font-semibold">Other Featured Articles</h3>
            <div className="space-y-4">
              {otherFeaturedArticles.length > 0 ? (
                otherFeaturedArticles.map((article) => (
                  <FeaturedPostSidebarItem
                    key={article.id}
                    imageSrc={
                      article.banner
                        ? `${BACKEND_URL}${article.banner}`
                        : "/placeholder.svg?height=80&width=80"
                    }
                    imageAlt={article.title}
                    title={article.title}
                    author={article.author?.username}
                    date={new Date(article.createdAt).toLocaleDateString(
                      "es-ES"
                    )}
                    articleId={article.id}
                  />
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  There are no other featured articles.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Recent Posts Section */}
      {recentArticles.length > 0 && (
        <div className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Recent Articles</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Discover our latest posts
              </p>
            </div>
            <Button variant="outline" className="gap-2">
              View All Articles
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentArticles.map((article) => (
              <BlogPostCard
                key={article.id}
                imageSrc={
                  article.banner
                    ? `${BACKEND_URL}${article.banner}`
                    : "/placeholder.svg?height=400&width=600"
                }
                imageAlt={article.title}
                title={article.title}
                description={
                  article.content
                    .replace(/!\[.*?\]\(.*?\)/g, "") // Elimina imágenes markdown
                    .replace(/[\r\n]+/g, " ") // Elimina saltos de línea
                    .substring(0, 150) + "..." // Primeros 150 caracteres
                }
                authorName={article.author?.username}
                authorAvatarSrc="/placeholder.svg?height=24&width=24"
                readTime={`${Math.ceil(
                  article.content.split(" ").length / 200
                )} min`}
                date={new Date(article.createdAt).toLocaleDateString("es-ES")}
                articleId={article.id}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty state for recent posts */}
      {recentArticles.length === 0 && !mainFeaturedArticle && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No hay artículos recientes</p>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
