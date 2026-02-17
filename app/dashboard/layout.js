'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

import { useRouter } from 'next/navigation'

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push('/')
      setLoading(false)
    })
  }, [])

  if (loading) return null
  return children
}
