import { queryOptions, useQuery } from '@tanstack/react-query';
import supabase from './supabase';

export async function getPlayers() {
  return supabase
    .from('profiles')
    .select('id, full_name, avatar_url, guest')
    .order('guest')
    .order('full_name')
    .throwOnError();
}

export function playersQuery() {
  return queryOptions({
    queryKey: ['players'],
    queryFn: () => getPlayers(),
  });
}

export default function useGetPlayers() {
  return useQuery(playersQuery());
}
