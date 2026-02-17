'use client'

import { supabase } from '../lib/supabaseClient'


export default function Home() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  return (
    <main className="flex h-screen items-center justify-center">
      <button
        onClick={login}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Sign in with Google
      </button>
    </main>
  )
}
