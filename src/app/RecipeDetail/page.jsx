"use client";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RecipeDetail() {
  const router = useRouter();

  const [newRecipe, setNewRecipe] = useState({
    title: "",
    content: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("categories"));
    const defaultCategories = ["All", "Breakfast", "Lunch", "Dinner", "Dessert"];

    const categoriesToUse = Array.isArray(stored) && stored.length > 0 ? stored : defaultCategories;

    setCategories(categoriesToUse);
    localStorage.setItem("categories", JSON.stringify(categoriesToUse));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveAndRedirect = () => {
    if (!newRecipe.content.trim()) {
      alert("Please add recipe instructions before saving.");
      return;
    }

    if (!newRecipe.category || newRecipe.category === "All") {
      alert("Please select a valid category (not 'All').");
      return;
    }

    const saved = localStorage.getItem("recipes");
    const existingRecipes = saved ? JSON.parse(saved) : [];

    const newRecipeToAdd = {
      id: Date.now().toString(),
      title: newRecipe.title || "Untitled Recipe",
      content: newRecipe.content,
      category: newRecipe.category,
      createdAt: new Date().toISOString(),
    };

    const updatedRecipes = [newRecipeToAdd, ...existingRecipes];
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    router.push("/recipes");
  };

  return (
    <div className="h-screen bg-amber-700/80 font-bold text-white text-lg px-2 py-4">
      <Input
        type="text"
        name="title"
        placeholder="Recipe Name"
        value={newRecipe.title}
        onChange={handleInputChange}
        className="mb-4 w-full md:w-1/2 lg:w-1/3 p-0 focus-visible:ring-0 border-none"
      />

      {/* Category Selector - excludes "All" */}
      <select
        name="category"
        value={newRecipe.category}
        onChange={handleInputChange}
        className="mb-4 w-full md:w-1/2 lg:w-1/3 p-2 text-black rounded"
      >
        <option value="">Select category</option>
        {categories
          .filter((cat) => cat !== "All")
          .map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
      </select>

      <Textarea
        name="content"
        value={newRecipe.content}
        onChange={handleInputChange}
        placeholder="Recipe Instructions"
        className="h-[calc(100vh-200px)] resize-none border-none focus-visible:ring-0 p-0"
      />

      <footer className="items-right">
        <Button
          onClick={handleSaveAndRedirect}
          className="bg-black text-white hover:bg-gray-800 cursor-pointer float-right mt-4"
        >
          <Check className="mr-2" />
          Save
        </Button>
      </footer>
    </div>
  );
}
