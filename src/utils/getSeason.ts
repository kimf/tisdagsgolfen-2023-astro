import supabase from './supabase';

export async function getSeason(name: SeasonYear) {
  return supabase.from('season').select('id, name, state, winners_array').eq('name', name).single();
}
