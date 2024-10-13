import supabase from './supabase';

export async function getLeaderboard(
  courseId: number,
  special: boolean,
  teamEvent: boolean,
  strokes: boolean,
  partOfFinal: boolean
) {
  return supabase
    .from('sessions')
    .select(
      `
      id, owner_id, special, strokes, team_event, state, current_hole, part_of_final, created_at,
      course:courses(id, club, name, holes_count, par,
        holes(id, par, index, number)
      ),
      scorecards(id, points, strokes, putts, given_strokes, team_index, to_par, through, session_id, created_at,
        players:scorecard_player(id, beers, ciders, fines, player:profiles(id, full_name, avatar_url))
      )`
    )
    .eq('course_id', courseId)
    .eq('special', special)
    .eq('team_event', teamEvent)
    .eq('strokes', strokes)
    .eq('part_of_final', partOfFinal)
    .order('id', { referencedTable: 'scorecards', ascending: false })
    .order('full_name', { referencedTable: 'scorecards.players.player', ascending: false })
    .neq('state', 'CLOSED');
}
