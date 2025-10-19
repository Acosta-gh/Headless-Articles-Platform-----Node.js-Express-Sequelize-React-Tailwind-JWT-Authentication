import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BACKEND_URL } from "@/components/constants";
import { Edit2, Trash2, Image as ImageIcon } from "lucide-react";

export default function ArticlesList({
  articles,
  setEditingArticle,
  handleDeleteArticle,
}) {
  if (!articles || articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-sm text-muted-foreground">
          No hay artículos disponibles
        </p>
      </div>
    );
  }

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {articles.map((article) => (
        <li key={article.id} className="group">
          <Card className="h-full overflow-hidden flex flex-col">
            {/* Banner Image */}
            <div className="relative w-full h-48 bg-muted overflow-hidden">
              {article.banner ? (
                <img
                  src={`${BACKEND_URL}${article.banner}`}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted-foreground/10">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <Badge className="absolute top-2 right-2 bg-black/50 hover:bg-black/70">
                ID: {article.id}
              </Badge>
            </div>

            {/* Content */}
            <CardHeader className="pb-3">
              <CardTitle className="text-base line-clamp-2 hover:text-primary transition-colors">
                {article.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="pb-3 flex-1">
              <div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {article.content}
                </p>
              </div>
              <div className="space-y-2">
                {article.categories && article.categories.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {article.categories.map((cat) => (
                      <Badge
                        key={cat.id}
                        variant="secondary"
                        className="text-xs"
                      >
                        {cat.name}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground">
                    Without categories
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-semibold">Author ID:</span>
                  <Badge variant="outline">{article.authorId}</Badge>
                </div>
              </div>
            </CardContent>

            {/* Actions */}
            <CardFooter className="gap-2 pt-4 border-t">
              <Button
                onClick={() => setEditingArticle(article)}
                className="flex-1 gap-2"
                variant="default"
                size="sm"
              >
                <Edit2 className="h-4 w-4" />
                Edit
              </Button>
              <Button
                onClick={() => handleDeleteArticle(article.id)}
                className="flex-1 gap-2"
                variant="destructive"
                size="sm"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  );
}
