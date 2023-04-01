// https://api.vercel.com/v1/integrations/deploy/prj_hOvFuqL3aSRlue7RGyNYIqSaWIgp/CKnAqNMQSn

// States:
// STARTED | PENDING | CLOSED

// Flow:
// take all sessions that are != "CLOSED".
// - if any == "STARTED"
//   - check if the session is older than X hours, send reminder??
//   - if older than Y hours, set state to PENDING??? Or only if all scorecards are filled out?
//     - update scorecards with week_points... (or maybe just do this on the fly? to get "realtime" points?)
//     - take data and update/create leaderboard rows
//     - call vercel webook to deploy website
//     - send push to mobile app
//     - would be nice to be able to post to messenger as well

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '');
const deployUrl = process.env.VERCEL_DEPLOY_URL || '';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  const sessions = await supabase
    .from('sessions')
    .select(
      `
      id, owner_id, special, strokes, team_event, state, current_hole,
      course:courses(id, club, name, holes_count, par,
        holes(id, par, index, number)
      ),
      scorecards(id, points, strokes, putts, given_strokes, scores, beers, fines, team_index,
        player:profiles(id, full_name, avatar_url),
        scores
      )`
    )
    .neq('state', 'CLOSED')
    .throwOnError();
  console.log(sessions);
  if (sessions.data === null || sessions.data.length === 0) {
    response.status(200).json({ body: 'No sessions found' });
  } else {
    response.status(200).json({
      body: sessions.data,
      query: request.query,
      cookies: request.cookies,
    });
  }
}
