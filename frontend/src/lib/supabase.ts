import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wcubhrctkixaonblipra.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjdWJocmN0a2l4YW9uYmxpcHJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyMjg2OTEsImV4cCI6MjA4NTgwNDY5MX0.N9TxG9kkzEEs9IicnauXco-VhBbAHKfj9KKmPDx-cF0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const isSupabaseConfigured = true
