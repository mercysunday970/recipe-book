"use client"


import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header/Page"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import EmptyPage from "../components/Empty/page.jsx"
import RecipeList from "../RecipeList/page";

export default function Recipes() {
  const router = useRouter();
    const [recipes, setRecipes] = useState({
      id: Date.now().toString(),
      title: "",
      content: "This is a sample recipe content.",
      createdAt: new Date().toISOString()
  });
    const [isLoading, setIsLoading] = useState(true);
    
  
    useEffect(() => {
      try {
        const saved = localStorage.getItem('recipes');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setRecipes(parsed);
          } 
        } 
      } catch (error) {
        console.error('Failed to load recipes:', error);
      } finally {
        setIsLoading(false);
      }
    }, []);
   
    if (isLoading) return <div>Loading...</div>; 
  console.log("Recipes state updated. Current count:", recipes.length);

   

   const handleDeleteRecipe = (recipeId) => {
    const updatedRecipes = recipes.filter(recipe => recipe.id !== recipeId);
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
   }
 
  return (
    <div className="min-h-screen bg-amber-700 text-white">
      
        <main className="container p-4 items-center gap-6 h-screen">
          <div>
            <div>
              <Header recipes={recipes} />
                
              <Card className="mt-6 w-100">
                <CardHeader>
                    <CardTitle className="text-lg font-bold">My Recipes</CardTitle>
                </CardHeader>
                <CardContent className="text-center overflow-y-auto scrollbar-hide h-[calc(100vh-300px)]">
                  {recipes.length !== 0 ?  
                  <RecipeList 
                  recipes={recipes}
                  setRecipes={setRecipes}
                  handleDeleteRecipe={handleDeleteRecipe}
                  /> :
                  <EmptyPage
                  router={router} />}
                </CardContent>
                <CardFooter className="flex justify-center mt-6">
                  <Button
                  onClick={() => router.push('/RecipeDetail')}
                  className="border rounded-50 bg-black mt-2 cursor-pointer hover:bg-black/50">
                    <Plus /> 
                    Add Recipe
                  </Button>
                </CardFooter>
              </Card>
                
            </div>
        </div>
          
        </main>
    </div>
  )
}
