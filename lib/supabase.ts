import { createClient } from '@supabase/supabase-js'

// Environment variables checks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    // In development, this might happen during build before env vars are set properly
    // or if using local JSON mode. We don't want to crash import.
    console.warn('Supabase URL or Key missing. Database features will fail.')
}

export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null as any;
