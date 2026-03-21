import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pwjbszbjhwgufmfkdzqw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3amJzemJqaHdndWZtZmtkenF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MjI5ODMsImV4cCI6MjA4ODk5ODk4M30.Bx9EQX27QQX_WkGQ1OV_iRxSFNGYWQ9cs7rZieNqjdM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
