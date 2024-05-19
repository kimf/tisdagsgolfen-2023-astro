import { queryOptions, useQuery } from '@tanstack/react-query';
import supabase from './supabase';

export async function getSession(id: number) {
  return supabase
    .from('sessions')
    .select(
      `
      id, owner_id, special, strokes, team_event, state, current_hole, course_id, part_of_final, created_at,
      course:courses(id, club, name, holes_count, par,
        holes(id, par, index, number)
      ),
      scorecards(id, points, strokes, course_id, putts, given_strokes, team_index, to_par, through, session_id, created_at,
        players:scorecard_player(id, beers, ciders, fines, player:profiles(id, full_name, avatar_url)),
        scores(id, hole, strokes, putts, points, fines, beers, ciders, to_par, extra_strokes, created_at, scorecard_id)
      )`
    )
    .eq('id', id)
    .order('id', { referencedTable: 'scorecards', ascending: false })
    .order('full_name', { referencedTable: 'scorecards.players.player', ascending: false })
    .single();
}

export function sessionQuery(sessionId: number, options?: object) {
  return queryOptions({
    queryKey: ['sessions', sessionId],
    queryFn: () => getSession(sessionId),
    ...options,
  });
}

export default function useGetSession(sessionId: number, options?: object) {
  return useQuery(sessionQuery(sessionId, options));
}
