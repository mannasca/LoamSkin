import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ozfimgvjztcwvmkafrua.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96ZmltZ3ZqenRjd3Zta2FmcnVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1MTQxNjUsImV4cCI6MjA5ODA5MDE2NX0.I7sG4jdv3-CWYrdpr4zenhdQ0PmVCATwm2yWDES--Kw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
