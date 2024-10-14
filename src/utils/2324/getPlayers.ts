import supabase from './supabase';

export async function getPlayers() {
  return supabase
    .from('profiles')
    .select('id, full_name, avatar_url, guest')
    .order('guest')
    .order('full_name')
    .throwOnError();
}
