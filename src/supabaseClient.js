import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    // "https://ykentbyslxlzekgkbmqk.supabase.co",
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrZW50YnlzbHhsemVrZ2tibXFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjA3MzczMjYsImV4cCI6MTk3NjMxMzMyNn0.uYFHaSfJmKRalNrKyN9l_eM2H5cHVrUhOR_j3hLgiOc"
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_ANON_KEY,
)

export default supabase