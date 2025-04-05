import type { APIRoute } from 'astro';
import { db } from '../../../db';
import { courses, players, rounds, scores } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { sendUpdate } from '../sse';

export const POST: APIRoute = async ({ request }) => {
  try {
    const sessionData = await request.json();
    const { courseName, totalHoles, startingHole, players: playerNames, par } = sessionData;
    
    // Create or find course
    let courseId: number;
    const existingCourse = await db.select().from(courses).where(eq(courses.name, courseName)).limit(1);
    
    if (existingCourse.length > 0) {
      courseId = existingCourse[0].id;
    } else {
      const [newCourse] = await db.insert(courses).values({
        name: courseName,
        par,
        holes: totalHoles
      }).returning({ id: courses.id });
      
      courseId = newCourse.id;
    }
    
    // Create round
    const [round] = await db.insert(rounds).values({
      courseId,
      date: new Date().toISOString(),
      startingHole: startingHole === 'back' ? 10 : 1,
      status: 'active'
    }).returning({ id: rounds.id });
    
    const roundId = round.id;
    
    // Create players and scores
    const sessionPlayers = [];
    
    for (const playerName of playerNames) {
      // Find or create player
      let playerId: number;
      const existingPlayer = await db.select().from(players).where(eq(players.name, playerName)).limit(1);
      
      if (existingPlayer.length > 0) {
        playerId = existingPlayer[0].id;
      } else {
        const [newPlayer] = await db.insert(players).values({
          name: playerName
        }).returning({ id: players.id });
        
        playerId = newPlayer.id;
      }
      
      // Initialize scores (default to par for each hole)
      const playerScores = Array(totalHoles).fill(par / totalHoles);
      
      // Create score entries
      for (let holeIndex = 0; holeIndex < totalHoles; holeIndex++) {
        await db.insert(scores).values({
          roundId,
          playerId,
          holeNumber: holeIndex + 1,
          score: playerScores[holeIndex]
        });
      }
      
      sessionPlayers.push({
        id: playerId,
        name: playerName,
        scores: playerScores,
        total: playerScores.reduce((sum, score) => sum + score, 0)
      });
    }
    
    // Construct the session object
    const session = {
      id: roundId,
      courseId,
      courseName,
      date: new Date().toISOString(),
      players: sessionPlayers,
      currentHole: 0,
      totalHoles,
      par,
      status: 'active'
    };
    
    // Broadcast the new session to any connected clients
    sendUpdate(roundId.toString(), session);
    
    return new Response(JSON.stringify(session), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error creating session:', error);
    return new Response(JSON.stringify({ error: 'Failed to create session' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
