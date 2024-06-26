import { queryOptions, useQuery } from '@tanstack/react-query';
import supabase from './supabase';

export async function getEvents(seasonId: number) {
  return supabase
    .from('events')
    .select(
      `id, team_event, strokes, special, created_at,
       course:courses(id, club, name, par, holes_count),
       event_sessions(
        id,
        session:sessions(
          id, special, strokes, team_event, state,
          scorecards(
            id, week_points, points, strokes, putts, given_strokes, team_index, through, to_par, session_id,
            players:scorecard_player(id, beers, ciders, fines, player:profiles(id, full_name, avatar_url))
          )
        )
       )
      `
    )
    .eq('season_id', seasonId)
    .order('created_at', { ascending: false })
    .throwOnError();
}

export function eventsQuery(seasonId: number) {
  return queryOptions({
    queryKey: ['events', seasonId],
    queryFn: () => getEvents(seasonId),
  });
}

export default function useGetEvents(seasonId: number) {
  return useQuery(eventsQuery(seasonId));
}
