import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.SUPABASE_URL;
// const supabaseKey = import.meta.env.SUPABASE_KEY;

const supabaseUrl = 'https://gdcmiadfblpkemteywvi.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkY21pYWRmYmxwa2VtdGV5d3ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ3NjkxNjIsImV4cCI6MTk5MDM0NTE2Mn0.VTevteJEuhHpJDo3ctzz-GksVRgin4AfWyXf0AzunZo';

const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    // storage: window ? window.localStorage : null,
    flowType: 'pkce',
  },
});

export default supabase;
