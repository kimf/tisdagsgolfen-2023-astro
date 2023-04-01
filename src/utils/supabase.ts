import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gdcmiadfblpkemteywvi.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkY21pYWRmYmxwa2VtdGV5d3ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ3NjkxNjIsImV4cCI6MTk5MDM0NTE2Mn0.VTevteJEuhHpJDo3ctzz-GksVRgin4AfWyXf0AzunZo';
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: window.localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase;
