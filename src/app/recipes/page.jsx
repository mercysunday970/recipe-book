"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header/Page";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { X } from "lucide-react";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import EmptyPage from "../components/Empty/page.jsx";
import RecipeList from "../RecipeList/page";

export default function Recipes() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState(["All"]);
  const [showDialog, setShowDialog] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("recipes");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setRecipes(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to load recipes:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;
  console.log("Recipes state updated. Current count:", recipes.length);

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
  const handleAddCategory = () => {
    const newCategory = prompt("Enter new category name:");
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  const handleDeleteCategory = (cat) => {
    if (cat === "All") return;
    const updatedCategories = categories.filter((c) => c !== cat);
    setCategories(updatedCategories);
    if (selectedCategory === cat) setSelectedCategory("All");
  };

 

  return (
      <main className="min-h-screen bg-amber-700 text-white flex items-center justify-center">
        <div>
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
              } px-3 py-1 rounded flex items-center gap-1 hover:bg-black/40 rounded-md curor-pointer`}
            >
              {cat !== "All" && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteCategory(cat)}
                  className="text-red-300 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
              {cat}
            </Button>
          ))}
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button className="bg-black/60 text-white px-3 py-1 rounded-md hover:bg-black/40 cursor-pointer">
                 <Plus />
              </Button>
            </DialogTrigger>
            <DialogContent  className="bg-white text-black p-6 rounded-lg shadow-lg">
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
                  onClick={() => {
                    if (newCategory && !categories.includes(newCategory)) {
                      setCategories([...categories, newCategory]);
                      setNewCategory("");
                      setShowDialog(false);
                    }
                  }}
                >
                  Add
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

          <Card className="mt-6 w-100">
            <CardHeader>
              <CardTitle className="text-lg font-bold">My Recipes</CardTitle>
            </CardHeader>
            <CardContent className="text-center overflow-y-auto scrollbar-hide h-[calc(100vh-400px)]">
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
                className="border rounded-50 bg-black mt-2 cursor-pointer hover:bg-black/50"
              >
                <Plus /> Add Recipe
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
  );
}
