"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header/Page";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import EmptyPage from "../components/Empty/page.jsx";
import RecipeList from "../RecipeList/page";

export default function Recipes() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState(["All", "Breakfast", "Lunch", "Dinner", "Dessert"]);
  const [showDialog, setShowDialog] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const defaultCategories = ["Breakfast", "Lunch", "Dinner", "Dessert"];

useEffect(() => {
  try {
    // Load recipes
    const savedRecipes = localStorage.getItem("recipes");
    if (savedRecipes) {
      const parsedRecipes = JSON.parse(savedRecipes);
      if (Array.isArray(parsedRecipes)) {
        setRecipes(parsedRecipes);
      }
    }

    // Load or initialize categories
    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) {
      const parsedCategories = JSON.parse(savedCategories);
      if (Array.isArray(parsedCategories)) {
        setCategories(["All", ...parsedCategories]);
      }
    } else {
      // First time: save default categories to localStorage
      localStorage.setItem("categories", JSON.stringify(defaultCategories));
      setCategories(["All", ...defaultCategories]);
    }
  } catch (error) {
    console.error("Failed to load data:", error);
  } finally {
    setIsLoading(false);
  }
}, []);





  const handleDeleteRecipe = (recipeId) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  const filteredRecipes = recipes.filter(
    (recipe) =>
      (selectedCategory === "All" || recipe.category === selectedCategory) &&
      (recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

const handleDeleteCategory = (cat) => {
  if (cat === "All") return;

  const updatedCategories = categories.filter((c) => c !== cat && c !== "All");
  setCategories(["All", ...updatedCategories]);
  localStorage.setItem("categories", JSON.stringify(updatedCategories));

  if (selectedCategory === cat) setSelectedCategory("All");
};



const handleAddCategory = () => {
  const trimmed = newCategory.trim();
  if (trimmed && !categories.includes(trimmed)) {
    const updatedCategories = [...categories.filter(c => c !== "All"), trimmed];
    setCategories(["All", ...updatedCategories]);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    setNewCategory("");
    setShowDialog(false);
  }
};


  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="min-h-screen bg-amber-700 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-screen-lg justify-center mx-auto">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {categories.map((cat) => (
            <Button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`${
                selectedCategory === cat
                  ? "bg-white text-black"
                  : "bg-black/60 text-white"
              } px-3 py-1 rounded flex items-center gap-1 hover:bg-black/40 rounded-md cursor-pointer`}
            >
              {cat}
              {cat !== "All" && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCategory(cat);
                  }}
                  className="text-red-300 hover:text-red-500 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </span>
              )}
            </Button>
          ))}

          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button className="bg-black/60 text-white px-3 py-1 rounded-md hover:bg-black/40 cursor-pointer">
                <Plus />Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white text-black p-6 rounded-lg shadow-lg max-w-sm w-full">
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
              </DialogHeader>
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category name"
              />
              <DialogFooter className="mt-4">
                <Button
                  className="bg-black/60 text-white hover:bg-black/40 cursor-pointer"
                  onClick={handleAddCategory}
                  disabled={!newCategory.trim()}
                >
                  Add
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="mt-4 w-full sm:w-100 md:w-150 mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-bold">My Recipes</CardTitle>
          </CardHeader>
          <CardContent className="text-center overflow-y-auto scrollbar-hide max-h-[25vh]">
            {filteredRecipes.length !== 0 ? (
              <RecipeList
                recipes={filteredRecipes}
                setRecipes={setRecipes}
                handleDeleteRecipe={handleDeleteRecipe}
              />
            ) : (
              <EmptyPage router={router} />
            )}
          </CardContent>
          <CardFooter className="flex justify-center mt-6">
            <Button
              onClick={() => router.push("/RecipeDetail")}
              className="border rounded-50 bg-black mt-2 cursor-pointer hover:bg-black/50 flex items-center gap-2"
            >
              <Plus /> Add Recipe
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
