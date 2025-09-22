import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ludjmzioizjrorhzmtlb.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1ZGptemlvaXpqcm9yaHptdGxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NDk5MjQsImV4cCI6MjA3NDEyNTkyNH0.PyVxaXykO_8bBhJ0_reIxYhkcFkNcmPRF5IFrFrD2dU'

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
