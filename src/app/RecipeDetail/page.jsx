'use client'

import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RecipeDetail() {
  const router = useRouter()
  const [category, setCategory] = useState("Breakfast"); // default

const [allCategories, setAllCategories] = useState([]);

useEffect(() => {
  const saved = localStorage.getItem("categories");
  if (saved) {
    setAllCategories(JSON.parse(saved));
  } else {
    const defaults = ["Breakfast", "Lunch", "Dinner", "Dessert"];
    setAllCategories(defaults);
    localStorage.setItem("categories", JSON.stringify(defaults));
  }
}, []);


  const [newRecipe, setNewRecipe] = useState({
    title: "",
    content: "",
    category: ""
  })

  const [categories, setCategories] = useState(["Breakfast", "Lunch", "Dinner", "Dessert"])

  // Load categories from localStorage
  useEffect(() => {
    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) {
      try {
        const parsed = JSON.parse(savedCategories);
        if (Array.isArray(parsed)) {
          setCategories(parsed);
        }
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveAndRedirect = () => {
    if (!newRecipe.content.trim()) {
      alert("Please add recipe instructions before saving.");
      return;
    }

    if (!newRecipe.category) {
      alert("Please select a category.");
      return;
    }

    const savedRecipes = localStorage.getItem("recipes");
    const existingRecipes = savedRecipes ? JSON.parse(savedRecipes) : [];

    const newRecipeToAdd = {
      id: Date.now().toString(),
      title: newRecipe.title || "Untitled Recipe",
      content: newRecipe.content,
      category,
      createdAt: new Date().toISOString()
    };


    const updatedRecipes = [newRecipeToAdd, ...existingRecipes];
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

    // Update categories if it's new
    const savedCategories = localStorage.getItem("categories");
    const existingCategories = savedCategories ? JSON.parse(savedCategories) : [];

    if (!existingCategories.includes(newRecipe.category)) {
      const updatedCategories = [...existingCategories, newRecipe.category];
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
    }

    router.push("/recipes");
  }

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
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="mb-4 w-full md:w-1/2 lg:w-1/3 text-black"
      >
        {allCategories.map((cat) => (
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
        className="h-[calc(100vh-180px)] resize-none border-none focus-visible:ring-0 p-0"
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
  )
}
