'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function RecipeContent() {
  const params = useParams();
  const router = useRouter();
  
  const id = params.id;

    if (!id) {
      return (
        <div className="error-message">
          <h2>Recipe not found</h2>
          <p>The recipe ID is missing from the URL.</p>
        </div>
      );
    }
    console.log('params id:', id); // Debugging line to check the id value
  const [recipe, setRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [newRecipeName, setNewRecipeName] = useState('');
  const [newRecipeContent, setNewRecipeContent] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    console.log('useEffect triggered with id:', id); // Debugging line to check the id value
    if (!id) {
      console.error('Recipe ID is missing');
      return;
    }
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
      if (!storedRecipes) {
        console.error('No recipes found in localStorage');
        return;
      }
      const parsedRecipes = JSON.parse(storedRecipes);
      console.log('Parsed recipes:', parsedRecipes); // Debugging line to check the parsed recipes

      setRecipes(parsedRecipes);
      const currentRecipe = parsedRecipes.find((r) => String(r.id) === String(id));
      console.log('Current recipe:', currentRecipe); // Debugging line to check the current recipe
      setRecipe(currentRecipe);
      setNewRecipeName(currentRecipe?.title || '');
      setNewRecipeContent(currentRecipe?.content || '');
    }
  }, [id]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSaveEdit = () => {
    const updatedRecipes = recipes.map((r) => String(r.id) === String(id) 
    ? { ...r, title: newRecipeName, content: newRecipeContent }
      : r
      );

    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));

     const updatedRecipe = updatedRecipes.find((r) => String(r.id) === String(id));
    setRecipe(updatedRecipe);

    setEditing(false);

    toast.success('Recipe saved! Redirecting...');

    router.push('/recipes');
  };

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div>
      {editing ? (
        <div className="h-screen bg-amber-700/80 font-bold text-white text-lg px-2">
      <Input 
        type="text" 
        name="title"
        placeholder="Recipe Name"
        value={newRecipeName}
        onChange={(e) => setNewRecipeName(e.target.value)}
        className="mb-4 w-full md:w-1/2 lg:w-1/3 p-0 focus-visible:ring-0 border-none"
      />
      <Textarea 
        name="content"
        value={newRecipeContent}
        onChange={(e) => setNewRecipeContent(e.target.value)}
        placeholder="Recipe Instructions"
        className="h-[calc(100vh-100px)] resize-none border-none focus-visible:ring-0 p-0"
      />
        <Button 
        className={"bg-black text-white hover:bg-gray-800 cursor-pointer float-right"}
        onClick={handleSaveEdit}>Save</Button>
        </div>
      ) : (
        <div className="h-screen bg-amber-700/80 font-bold text-white text-lg px-2 space-y-4">
          <h2>{recipe.title}</h2>
          <p>{recipe.content}</p>
          <Button 
          className={"bg-black text-white hover:bg-gray-800 cursor-pointer"}
          onClick={handleEdit}>Edit</Button>
        </div>
      )}
    </div>
  );
}