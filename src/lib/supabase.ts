import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Feedback {
  id: string
  toilet_id: string
  cleanliness_rating: number
  water_available: boolean
  soap_available: boolean
  comments: string
  created_at: string
}

export interface Toilet {
  id: string
  name: string
  location: string
  created_at: string
}
