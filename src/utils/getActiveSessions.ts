import supabase from '../utils/supabase';

export async function getActiveSessions() {
  return supabase
    .from('sessions')
    .select(
      `
      id, owner_id, state, special, strokes, team_event,
      scorecards(id, player_id),
      courses(id, club, name, par, holes_count, events_count)
      `
    )
    .neq('state', 'CLOSED')
    .throwOnError();
}

export default getActiveSessions;
