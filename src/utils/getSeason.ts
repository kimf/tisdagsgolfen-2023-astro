import { queryOptions, useQuery } from '@tanstack/react-query';
import supabase from './supabase';

export async function getSeason(name: SeasonYear) {
  return supabase.from('season').select('id, name, state, winners_array').eq('name', name).single();
}

export function seasonQuery(name: SeasonYear) {
  return queryOptions({
    queryKey: ['season', name],
    queryFn: () => getSeason(name),
  });
}

export default function useGetSeason(name: SeasonYear) {
  return useQuery(seasonQuery(name));
}
