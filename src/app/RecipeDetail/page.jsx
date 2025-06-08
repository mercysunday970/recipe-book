'use client'

import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RecipeDetail() {
  const router = useRouter()
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    content: ""
  })

  const handleInputChange = (e) => {
    setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value })
  }

  const handleSaveAndRedirect = () => {
      if (!newRecipe.content.trim()) {
    alert("Please add recipe instructions before saving.");
    return;
  }
    // Get existing recipes from localStorage
    const saved = localStorage.getItem("recipes")
    const existingRecipes = saved ? JSON.parse(saved) : []

    const newRecipeToAdd = {
      id: Date.now().toString(),
      title: newRecipe.title || "Untitled Recipe",
      content: newRecipe.content,
      createdAt: new Date().toISOString()
    }

    const updatedRecipes = [newRecipeToAdd, ...existingRecipes]

    // Save updated recipes to localStorage
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes))
    console.log("Recipes after save:", updatedRecipes)

    // Redirect to recipes list page
    router.push('/recipes')
  }

  return (
    <div className="h-screen bg-amber-700/80 font-bold text-white text-lg px-2">
      <Input 
        type="text" 
        name="title"
        placeholder="Recipe Name"
        value={newRecipe.title} 
        onChange={handleInputChange}
        className="mb-4 w-full md:w-1/2 lg:w-1/3 p-0 focus-visible:ring-0 border-none"
      />
      <Textarea 
        name="content"
        value={newRecipe.content}
        onChange={handleInputChange}
        placeholder="Recipe Instructions"
        className="h-[calc(100vh-100px)] resize-none border-none focus-visible:ring-0 p-0"
      />
      
      <footer className="items-right">
        <Button 
          onClick={handleSaveAndRedirect}
          className="bg-black text-white hover:bg-gray-800 cursor-pointer float-right"
        >
          <Check className="mr-2" />
          Save
        </Button>
      </footer>
    </div>
  )
}

