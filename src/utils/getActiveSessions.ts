import supabase from '../utils/supabase';

export async function getActiveSessions() {
  return supabase
    .from('sessions')
    .select(
      `id, owner_id, state, special, strokes, team_event, current_hole, part_of_final,
       course:courses(id, club, name, par, holes_count),
       scorecards(id, scorecard_player(player_id, player:profiles(id, full_name, avatar_url)))
      `
    )
    .neq('state', 'CLOSED')
    .neq('state', 'FINALPENDING')
    .order('id', { referencedTable: 'scorecards', ascending: false })
    .throwOnError();
}
