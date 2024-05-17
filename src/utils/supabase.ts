import { createClient } from '@supabase/supabase-js';

import type { Database } from './supabase_types';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_KEY;

const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    // storage: window ? window.localStorage : null,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase;
