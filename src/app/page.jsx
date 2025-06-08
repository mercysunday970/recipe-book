import { logout } from "./logout/actions";
import Navbar from "./components/Navbar/page";  
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Check, CircleCheck } from "lucide-react";

export default function Home() {
  return (
    <>
   
      
      <main className=" text-center bg-amber-700 text-white min-h-screen">
        <Navbar className="border"/>
        <div className="pt-8">
          <h3 className="text-xl font-semibold">What's cooking?</h3>
          <p className="text-sm font-normal">Add your favorite recipes and make meal planning a breeze</p>
        </div>

        <Card className="md:w-120 sm:w-90 bg-stone-300 mx-auto mt-8 h-80 text-black">
          <CardHeader>
            <CircleCheck className="mx-auto w-40 h-40 mb-2 "/>
            <CardTitle>No Recipes added</CardTitle>
          </CardHeader>
          <CardContent className="">
            <Button
            className="border rounded-lg bg-slate-600 text-white hover:bg-slate-600/50 cursor-pointer">
              <Link href="/recipes" className="active:text-current no-underline">Click to Start</Link>
           
            </Button>
          </CardContent>
      
        </Card>
    












        
      </main>
      
    </>
  )
}