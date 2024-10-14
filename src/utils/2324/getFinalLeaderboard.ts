import supabase from './supabase';

export async function getFinalLeaderboard(year: string) {
  return supabase
    .from('sessions')
    .select(
      `
      id, owner_id, special, strokes, team_event, state, current_hole, modified_points, part_of_final, created_at,
      course:courses(id, club, name, holes_count, par,
        holes(id, par, index, number)
      ),
      scorecards(id, points, strokes, putts, given_strokes, team_index, to_par, through, session_id, created_at,
        players:scorecard_player(id, beers, ciders, fines, player:profiles(id, full_name, avatar_url))
      )`
    )
    .eq('part_of_final', true)
    .gte('created_at', `${year}-01-01`)
    .order('id', { referencedTable: 'scorecards', ascending: false })
    .order('full_name', { referencedTable: 'scorecards.players.player', ascending: false })
    .in('state', ['FINALPENDING', 'CLOSED']);
}
