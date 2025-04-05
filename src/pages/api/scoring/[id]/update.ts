export const prerender = false;
import type { APIRoute } from 'astro';
import { eq, and } from 'drizzle-orm';
import { db } from '../../../../db';
import { rounds, scores, players, courses } from '../../../../db/schema';
import { sendUpdate } from '../../sse';

export const POST: APIRoute = async ({ request, params }) => {
  const sessionId = params.id;
  if (!sessionId) {
    return new Response(JSON.stringify({ error: 'Session ID is required' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const data = await request.json();
    const { playerId, holeIndex, score } = data;
    
    if (!playerId || holeIndex === undefined || score === undefined) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Get the round
    const round = await db.select().from(rounds).where(eq(rounds.id, parseInt(sessionId))).limit(1);
    
    if (round.length === 0) {
      return new Response(JSON.stringify({ error: 'Session not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Update the score in the database
    const holeNumber = holeIndex + 1; // Convert 0-based index to 1-based hole number
    
    await db.update(scores)
      .set({ score })
      .where(
        and(
          eq(scores.roundId, parseInt(sessionId)),
          eq(scores.playerId, playerId),
          eq(scores.holeNumber, holeNumber)
        )
      );
    
    // Fetch the updated session data
    // Get the course
    const course = await db.select().from(courses).where(eq(courses.id, round[0].courseId)).limit(1);
    
    // Get all scores for this round
    const allScores = await db.select().from(scores).where(eq(scores.roundId, parseInt(sessionId)));
    
    // Get unique player IDs from scores
    const playerIds = [...new Set(allScores.map(score => score.playerId))];
    
    // Get player details
    const sessionPlayers = [];
    
    for (const pid of playerIds) {
      const player = await db.select().from(players).where(eq(players.id, pid)).limit(1);
      
      if (player.length > 0) {
        // Get all scores for this player in this round
        const playerScores = allScores
          .filter(s => s.playerId === pid)
          .sort((a, b) => a.holeNumber - b.holeNumber)
          .map(s => s.score);
        
        // Calculate total
        const total = playerScores.reduce((sum, s) => sum + s, 0);
        
        sessionPlayers.push({
          id: pid,
          name: player[0].name,
          scores: playerScores,
          total
        });
      }
    }
    
    // Construct the updated session object
    const updatedSession = {
      id: parseInt(sessionId),
      courseId: course[0].id,
      courseName: course[0].name,
      date: round[0].date,
      players: sessionPlayers,
      currentHole: holeIndex,
      totalHoles: course[0].holes,
      par: course[0].par,
      status: round[0].status
    };
    
    // Send update to all connected clients
    sendUpdate(sessionId, updatedSession);
    
    return new Response(JSON.stringify(updatedSession), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error updating score:', error);
    return new Response(JSON.stringify({ error: 'Failed to update score' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
