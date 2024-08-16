import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://tvwdcmfmwzudqfzpplox.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2d2RjbWZtd3p1ZHFmenBwbG94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM0Njk2ODMsImV4cCI6MjAzOTA0NTY4M30.IR5JrLgXff7K_dzUWqaZqX-jL1AHqoKQrLJViCQIoto"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase