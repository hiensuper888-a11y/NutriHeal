import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oxbxffgrwwamwztljjsm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94YnhmZmdyd3dhbXd6dGxqanNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNTY0ODksImV4cCI6MjA4OTYzMjQ4OX0.MVBzMN--rpOOZrEkqu1FrqE10MhiAKKfzX9tB-sp1_E';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
