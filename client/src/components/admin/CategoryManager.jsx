import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { Trash } from 'lucide-react';

export default function CategoryManager({
  categoryForm,
  onCategoryFormChange,
  onCategorySubmit,
  categories,
  categoriesLoading,
  onDeleteCategory,
}) {
  return (
    <>
      <form onSubmit={onCategorySubmit} className="space-y-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="cat-name">Name</Label>
          <Input
            id="cat-name"
            name="name"
            value={categoryForm.name}
            onChange={onCategoryFormChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cat-desc">Descripton</Label>
          <Textarea
            id="cat-desc"
            name="description"
            value={categoryForm.description}
            onChange={onCategoryFormChange}
          />
        </div>
        <Button type="submit" disabled={categoriesLoading}>
          {categoriesLoading ? "Adding..." : "Add Category"}
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
              onClick={() => onDeleteCategory(cat.id)}
            >
               <Trash /> <span>Delete</span>
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
}
