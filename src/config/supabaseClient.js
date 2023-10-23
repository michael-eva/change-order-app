import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// const supabaseUrl = 'https ://wsolkhiobftucjmfkwkk.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indzb2xraGlvYmZ0dWNqbWZrd2trIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE0ODU0MTAsImV4cCI6MjAwNzA2MTQxMH0.j0Xh-Xjni3I-7kD42LbQYBEqYm0IgagYEgBzKRa32bY';
console.log(supabaseUrl);
const supabase = createClient(
    supabaseUrl,
    supabaseKey
)
export default supabase