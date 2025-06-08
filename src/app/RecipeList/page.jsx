'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Edit3, Trash2, } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RecipeList({recipes = [], setRecipes, handleDeleteRecipe}) {
  const router = useRouter();
  return (
    <>
        <div className="bg-amber-700 space-y-4 max-w-lg mx-auto">
            {recipes.map(recipe => (
              <Card key={recipe.id} className="bg-white border-0 text-black shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className='flex-2 min-w-0'>
                      <h2 className="font-bold">{recipe.title}</h2>
                      <p className="text-sm mt-2 truncate">{recipe.content}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => router.push(`/RecipeContent/${recipe.id}`)} 
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteRecipe(recipe.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
        
    </>
  );
}