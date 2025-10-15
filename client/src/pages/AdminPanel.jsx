import React, { useEffect, useRef, useState } from "react";

import { useArticles } from "@/hooks/useArticles";
import { useImage } from "@/hooks/useImage";
import { useTempid } from "@/hooks/useTempid";
import { useCategories } from "@/hooks/useCategories";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

function AdminPanel() {
  const {
    articles,
    loading: articleLoading,
    error: articleError,
    fetchArticles,
    createNewArticle,
  } = useArticles();

  const {
    tempId,
    tempIdToken,
    loading: tempIdLoading,
    error: tempIdError,
    fetchTempId,
  } = useTempid();

  const {
    uploadNewImage,
    imageUrl,
    loading: imageLoading,
    error: imageError,
  } = useImage();

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    addCategory,
    removeCategory,
  } = useCategories();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tempId: "",
    banner: null,
  });
  const [imageData, setImageData] = useState(null);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
  });
  const [selectedCategories, setSelectedCategories] = useState([]);

  // https://bobbyhadz.com/blog/react-reset-file-input
  const bannerInputRef = useRef(null);
  const imageInputRef = useRef(null);

  useEffect(() => {
    if (tempId) {
      setFormData((prevData) => ({ ...prevData, tempId }));
    }
  }, [tempId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "banner") {
      setFormData((prevData) => ({ ...prevData, banner: files?.[0] ?? null }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      setImageData(files[0]);
    }
  };

  const handleCategoryFormChange = (e) => {
    const { name, value } = e.target;
    setCategoryForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      await addCategory(categoryForm);
      setCategoryForm({ name: "", description: "" });
      toast.success("Categoría creada");
    } catch (err) {
      toast.error("Error creando categoría");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (confirm("¿Eliminar esta categoría?")) {
      try {
        await removeCategory(id);
        toast.success("Categoría eliminada");
      } catch (err) {
        toast.error("Error eliminando categoría");
      }
    }
  };

  // Manejar el cambio de selección de categorías para el post
  const handleCategoryCheckbox = (e) => {
    const value = Number(e.target.value);
    setSelectedCategories((prev) =>
      e.target.checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("tempId", formData.tempId);
      if (formData.banner) {
        data.append("banner", formData.banner);
      }
      console.log("Submitting article with data:", formData);

      data.append("categoryIds", JSON.stringify(selectedCategories));

      await createNewArticle(data, tempIdToken);
      toast.success("Article created successfully");

      setFormData({
        title: "",
        content: "",
        tempId: tempId || "",
        banner: null,
      });
      setSelectedCategories([]);
      // Limpia el input file del banner
      if (bannerInputRef.current) {
        bannerInputRef.current.value = "";
      }

      fetchArticles?.();
    } catch (error) {
      console.error("Error creating article:", error);
      toast.error("Error creating article");
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!imageData) {
      return;
    }
    try {
      const data = new FormData();
      data.append("image", imageData);
      data.append("tempId", tempId);

      const uploadedImage = await uploadNewImage(data, tempIdToken);

      toast.success("Imagen subida con éxito");
      setImageData(null);

      // Limpia el input file de imagen
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
      console.log("Imagen subida:", uploadedImage);
      console.log("URL de la imagen:", uploadedImage.url);
      setFormData((prevData) => ({
        ...prevData,
        content:
          prevData.content +
          `\n![alt text](${BACKEND_URL}${uploadedImage.url})`,
      }));
    } catch (error) {
      toast.error("Error al subir imagen");
    }
  };

  const isSubmittingArticle = articleLoading || tempIdLoading;
  const isUploadingImage = imageLoading || tempIdLoading;

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">Admin Panel</h2>

      {(tempIdError || articleError || imageError) && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {tempIdError && <div>TempID: {tempIdError.message}</div>}
            {articleError && <div>Artículo: {articleError.message}</div>}
            {imageError && <div>Imagen: {imageError.message}</div>}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Crear artículo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                type="text"
                name="title"
                placeholder="Título"
                value={formData.title}
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </div>

            {/* FORMULARIO DE IMAGEN VISUALMENTE DENTRO */}
            <div className="border-t pt-4">
              <div className="space-y-2">
                <Label htmlFor="image">Subir imagen al contenido</Label>
                <div className="flex gap-2">
                  <Input
                    ref={imageInputRef}
                    id="image"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={isUploadingImage || !imageData}
                    onClick={handleImageUpload}
                  >
                    {isUploadingImage && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Subir
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Contenido</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Contenido del artículo"
                value={formData.content}
                onChange={handleChange}
                required
                className="min-h-32"
              />
            </div>

            <Label>Categorías</Label>

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
            <CardFooter className="px-0">
              <Button type="submit" disabled={isSubmittingArticle}>
                {isSubmittingArticle && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Crear artículo
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

      {tempId && (
        <p className="text-sm text-muted-foreground">TempID actual: {tempId}</p>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Categorías</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCategorySubmit} className="space-y-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="cat-name">Nombre</Label>
              <Input
                id="cat-name"
                name="name"
                value={categoryForm.name}
                onChange={handleCategoryFormChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cat-desc">Descripción</Label>
              <Textarea
                id="cat-desc"
                name="description"
                value={categoryForm.description}
                onChange={handleCategoryFormChange}
              />
            </div>
            <Button type="submit" disabled={categoriesLoading}>
              Añadir categoría
            </Button>
          </form>
          <ul>
            {categories.map((cat) => (
              <li key={cat.id} className="flex items-center gap-2 mb-1">
                <span className="font-semibold">{cat.name}</span>
                <span className="text-xs text-muted-foreground">
                  {cat.description}
                </span>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteCategory(cat.id)}
                >
                  Eliminar
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Separator />

      <div className="space-y-3">
        <h3 className="text-lg font-bold">Artículos existentes</h3>
        {articles.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No hay artículos disponibles.
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <li key={article.id}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-base">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {article.banner && (
                      <img
                        src={`${BACKEND_URL}${article.banner}`}
                        alt={article.title}
                        className="w-full h-auto rounded-md"
                      />
                    )}
                    <p className="text-xs break-all text-muted-foreground">
                      {`${BACKEND_URL}${article.banner}`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Autor ID: {article.authorId}
                    </p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;