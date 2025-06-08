'use server'

import { createClient } from '@/app/utils/supabase/server'  // adjust to your project setup
import { redirect } from 'next/navigation'

export async function logout() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Logout error:', error)
    redirect('/error')  // Or handle error more gracefully
  }

  redirect('/')  // Redirect to homepage or login after logout
}
