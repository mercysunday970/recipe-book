import { login, signup } from './actions';
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className='pt-8 bg-amber-700 h-screen overflow-hidden '>
      <form className='flex flex-col gap-4 p-8 bg-stone-50 rounded-xl w-60 sm:w-80 md:w-100  lg:w-120 mx-auto item-center'>
        <label htmlFor="username" className='text-base font-semibold'>Username:</label>
        <input id="username" name="username" type="text" required className='text-sm font-light  rounded-lg bg-gray-300/70 p-2'/>
        <label htmlFor="email" className='text-base font-semibold'>Email:</label>
        <input id="email" name="email" type="email" required className='text-sm font-light  rounded-lg bg-gray-300 p-2'/>
        <label htmlFor="password" className='text-base font-semibold'>Password:</label>
        <input id="password" name="password" type="password" required className='text-sm font-light bg-gray-300/70 rounded-lg p-2' />
        <div className='text-md flex flex-col gap-2 '>
          <Button 
          className="border rounded-lg bg-gray-500/70 hover:bg-gray-500/40 cursor-pointer font-bold" 
          formAction={login}>Log In</Button>
          <Button 
          className="border rounded-lg bg-gray-500/70 hover:bg-gray-500/40 cursor-pointer font-bold" 
          formAction={signup}>Sign Up</Button>
        </div>
      </form>
    </div>
  )
}