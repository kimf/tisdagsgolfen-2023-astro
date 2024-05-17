import { queryOptions, useQuery } from '@tanstack/react-query';
import supabase from './supabase';

// TODO: When data from prev seasons is brought over - add it here!
export type SeasonYear = '2023' | '2024';

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
