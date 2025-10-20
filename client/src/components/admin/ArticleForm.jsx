import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Loader2,
  Bold,
  Italic,
  Code,
  Link,
  List,
  Image as ImageIcon,
  Eye,
} from "lucide-react";

import ImageUploader from "@/components/admin/ImageUploader";
import { BACKEND_URL } from "@/components/constants";

export default function ArticleForm({
  formData,
  onChange,
  bannerInputRef,
  imageInputRef,
  handleImageChange,
  handleImageUpload,
  imageData,
  isUploadingImage,
  handleSubmit,
  isSubmittingArticle,
  categories,
  selectedCategories,
  handleCategoryCheckbox,
  isEditing,
  cancelEditArticle,
  handleSubmitEdit,
}) {
  const [bannerPreview, setBannerPreview] = useState(null);

  useEffect(() => {
    if (isEditing && formData.banner) {
      setBannerPreview(
        typeof formData.banner === "string"
          ? `${BACKEND_URL}${formData.banner}`
          : null
      );
    }
  }, [isEditing, formData.banner]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
    setBannerPreview(null);
  };

  const handleFormSubmitEdit = (e) => {
    e.preventDefault();
    handleSubmitEdit(e);
    setBannerPreview(null);
  };


  const handleCancelEdit = () => {
    cancelEditArticle();
    setBannerPreview(null);
  }

  const handleBannerChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBannerPreview(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
    onChange(e);
  };

  const insertMarkdown = (before, after = "") => {
    const textarea = document.getElementById("content");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    const newContent =
      formData.content.substring(0, start) +
      before +
      selectedText +
      after +
      formData.content.substring(end);

    onChange({
      target: {
        name: "content",
        value: newContent,
      },
    });

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + before.length;
      textarea.selectionEnd = start + before.length + selectedText.length;
    }, 0);
  };

  const markdownButtons = [
    {
      icon: Bold,
      label: "Bold",
      onClick: () => insertMarkdown("**", "**"),
    },
    {
      icon: Italic,
      label: "Cursive",
      onClick: () => insertMarkdown("*", "*"),
    },
    {
      icon: Code,
      label: "Code",
      onClick: () => insertMarkdown("`", "`"),
    },
    {
      icon: Link,
      label: "Link",
      onClick: () => insertMarkdown("[texto](", ")"),
    },
    {
      icon: List,
      label: "List",
      onClick: () => insertMarkdown("\n- ", ""),
    },
  ];

  return (
    <div className="w-full mx-auto">
      <form
        onSubmit={isEditing ? handleFormSubmitEdit : handleFormSubmit}
        className="space-y-6"
      >
        {/* Header Card */}
        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="text-2xl">
              {isEditing ? "Edit article" : "Create new article"}
            </CardTitle>
            <CardDescription>
              {isEditing
                ? "Update the content and settings of your article"
                : "Fill in the details to publish a new article"}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Title Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Title
              </Label>
              <Input
                id="title"
                type="text"
                name="title"
                placeholder="E.g., The Future of Technology in Everyday Life"
                value={formData.title}
                onChange={onChange}
                required
                className="text-base"
              />
            </div>
          </CardContent>
        </Card>

        {/* Banner Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Article banner</CardTitle>
            <CardDescription>
              Upload a banner image that represents your article
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="banner" className="text-sm font-medium">
                Banner Image
              </Label>
              <div className="relative">
                <Input
                  ref={bannerInputRef}
                  id="banner"
                  type="file"
                  name="banner"
                  accept="image/*"
                  onChange={handleBannerChange}
                  className="cursor-pointer"
                />
              </div>
            </div>

            {bannerPreview && (
              <div className="relative w-full h-64 rounded-lg border-2 border-primary/20 overflow-hidden bg-muted">
                <img
                  src={bannerPreview}
                  alt="Banner preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Eye className="h-3 w-3" />
                    Preview
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Content Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Content</CardTitle>
            <CardDescription>
              Write the main content of your article here
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Markdown Toolbar */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-muted-foreground">
                Markdown Tools
              </Label>
              <div className="flex flex-wrap gap-1 p-3 bg-muted border border-input rounded-lg">
                {markdownButtons.map((btn) => (
                  <Button
                    key={btn.label}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={btn.onClick}
                    title={btn.label}
                    className="h-9 w-9 p-0 hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <btn.icon className="h-4 w-4" />
                  </Button>
                ))}
                <Separator orientation="vertical" className="mx-1" />
                <ImageUploader
                  imageInputRef={imageInputRef}
                  onImageChange={handleImageChange}
                  onUpload={handleImageUpload}
                  imageData={imageData}
                  isUploadingImage={isUploadingImage}
                />
              </div>
            </div>

            {/* Textarea */}
            <div className="space-y-2">
              <Label htmlFor="content" className="text-sm font-medium">
                Article Content
              </Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Write your article here... You can use Markdown to format."
                value={formData.content}
                onChange={onChange}
                required
                className="min-h-64 font-mono text-sm resize-vertical"
              />
              <p className="text-xs text-muted-foreground">
                You can use Markdown syntax to format your content.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Categories Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Categories</CardTitle>
            <CardDescription>
              Select the categories that best fit your article
            </CardDescription>
          </CardHeader>
          <CardContent>
            {categories.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No categories available. Please create categories first.
              </p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex items-center space-x-2 p-2 rounded-lg border border-input hover:bg-accent transition-colors"
                  >
                    <Checkbox
                      id={`cat-${cat.id}`}
                      checked={selectedCategories.includes(cat.id)}
                      onCheckedChange={() =>
                        handleCategoryCheckbox({
                          target: {
                            value: cat.id,
                            checked: !selectedCategories.includes(cat.id),
                          },
                        })
                      }
                    />
                    <Label
                      htmlFor={`cat-${cat.id}`}
                      className="cursor-pointer font-medium text-sm"
                    >
                      {cat.name}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Featured Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Publication Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-input hover:bg-accent/50 transition-colors cursor-pointer">
              <Checkbox
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) =>
                  onChange({
                    target: {
                      name: "featured",
                      value: checked,
                    },
                  })
                }
              />
              <div className="flex-1">
                <Label
                  htmlFor="featured"
                  className="cursor-pointer font-medium text-sm"
                >
                  Mark as Featured Article
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Featured articles are highlighted on the homepage and in
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex gap-2 pt-4">
          <Button
            type="submit"
            disabled={isSubmittingArticle}
            size="lg"
            className="flex-1"
          >
            {isSubmittingArticle && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isEditing ? "Update Article" : "Create Article"}
          </Button>
          {isEditing && (
            <Button
              type="submit"
              disabled={isSubmittingArticle}
              size="lg"
              className="flex-1"
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
