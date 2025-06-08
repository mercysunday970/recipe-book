'use client'

import { Button } from "@/components/ui/button"
import { logout } from "@/app/logout/actions";

export default function Navbar ()  {
  return (
   
    <nav className="flex justify-between items-center py-2 px-4 bg-amber-700/70 text-white">
        <div>
            <h1 className="text-lg font-bold">Recipes</h1>
        </div>

        <div className="text-black flex gap-4">
         
          {/* <form action={logout}>
            <Button 
              type="submit"
              className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200 transition">
              Logout
            </Button>
          </form> */}
        </div>
    </nav>
   
  )
}

