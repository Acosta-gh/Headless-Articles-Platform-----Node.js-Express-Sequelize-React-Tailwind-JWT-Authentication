import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CardFooter } from "@/components/ui/card";
import { Loader2, Bold, Italic, Code, Link, List, Image } from "lucide-react";

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
  handleSubmitEdit,
}) {
  const [bannerPreview, setBannerPreview] = useState(null);

  // Set initial banner preview when editing an article
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
      label: "Negrita",
      onClick: () => insertMarkdown("**", "**"),
    },
    {
      icon: Italic,
      label: "Cursiva",
      onClick: () => insertMarkdown("*", "*"),
    },
    {
      icon: Code,
      label: "Código",
      onClick: () => insertMarkdown("`", "`"),
    },
    {
      icon: Link,
      label: "Enlace",
      onClick: () => insertMarkdown("[texto](", ")"),
    },
    {
      icon: List,
      label: "Lista",
      onClick: () => insertMarkdown("\n- ", ""),
    },
  ];

  return (
    <form
      onSubmit={isEditing ? handleFormSubmitEdit : handleFormSubmit}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          type="text"
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={onChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="banner">Banner</Label>
        <Input
          ref={bannerInputRef}
          id="banner"
          type="file"
          name="banner"
          accept="image/*"
          onChange={handleBannerChange}
        />
        {bannerPreview && (
          <div className="mt-4 rounded-lg border border-gray-200 overflow-hidden">
            <img
              src={bannerPreview}
              alt="Preview del banner"
              className="w-full h-48 object-cover"
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>

        <div className="flex flex-wrap gap-2 p-2 border border-gray-200 rounded-t-lg bg-gray-50">
          {markdownButtons.map((btn) => (
            <Button
              key={btn.label}
              type="button"
              variant="outline"
              size="sm"
              onClick={btn.onClick}
              title={btn.label}
              className="p-2 h-8 w-8"
            >
              <btn.icon className="h-4 w-4" />
            </Button>
          ))}
          <ImageUploader
            imageInputRef={imageInputRef}
            onImageChange={handleImageChange}
            onUpload={handleImageUpload}
            imageData={imageData}
            isUploadingImage={isUploadingImage}
          />
        </div>

        <Textarea
          id="content"
          name="content"
          placeholder="Article content in Markdown"
          value={formData.content}
          onChange={onChange}
          required
          className="min-h-32 rounded-t-none"
        />
      </div>

      <Label>Categories</Label>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <label key={cat.id} className="flex items-center gap-1">
            <input
              type="checkbox"
              value={cat.id}
              checked={selectedCategories.includes(cat.id)}
              onChange={handleCategoryCheckbox}
            />
            {cat.name}
          </label>
        ))}
      </div>

      <Label>Featured</Label>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="featured"
          checked={formData.featured}
          onChange={(e) =>
            onChange({
              target: {
                name: "featured",
                value: e.target.checked,
              },
            })
          }
        />
        <span>Mark as featured article</span>
      </div>

      <CardFooter className="px-0">
        <Button type="submit" disabled={isSubmittingArticle}>
          {isSubmittingArticle && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {isEditing ? "Update Article" : "Create Article"}
        </Button>
      </CardFooter>
    </form>
  );
}
