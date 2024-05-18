import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_KEY;

const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    // storage: window ? window.localStorage : null,
    flowType: 'pkce',
  },
});

export default supabase;
