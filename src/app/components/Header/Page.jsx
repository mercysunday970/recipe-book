'use client'

import { Input } from "@/components/ui/input"

export default function Header({ searchQuery, setSearchQuery }) {
  return (
    <div className="text-left bg-amber-700 text-white w-full md:w-1/2 lg:w-1/3">
      <h1 className="text-2xl font-bold mb-2">Recipes</h1>
      <Input 
        type="search" 
        placeholder="Search recipes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border-1 border-gray-500 bg-gray-700/70 rounded-lg md:w-100 p-2 sm:w-50"
      />
    </div>
  )
}

