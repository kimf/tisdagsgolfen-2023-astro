import type { APIRoute } from 'astro';
import { db } from '../../../../db';
import { eq } from 'drizzle-orm';

// Import the correct schema tables
import scoringSessions from '../../../../db/schema/session';
import courses from '../../../../db/schema/course';
import profiles from '../../../../db/schema/profile';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  try {
    const sessionId = parseInt(params.id || '0');

    if (!sessionId) {
      return new Response(JSON.stringify({ error: 'Invalid session ID' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Get the session from the database
    const sessionData = await db.select().from(scoringSessions).where(eq(scoringSessions.id, sessionId)).limit(1);

    if (sessionData.length === 0) {
      return new Response(JSON.stringify({ error: 'Session not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const session = sessionData[0];

    // Get the course information
    const courseData = await db.select().from(courses).where(eq(courses.id, session.courseId)).limit(1);
    const course = courseData.length > 0 ? courseData[0] : null;

    // Course information check
    if (!course) {
      console.log('Course not found for session:', session);
    }

    // Now we have both session and course data

    // Get player scores for this session
    // In a real implementation, you would query your scores table
    // For now, we'll create placeholder data for demonstration

    // Query players in this session
    const playersData = await db.select().from(profiles).limit(4);

    // Create placeholder scores for each player
    const sessionPlayers = playersData.map(player => {
      // Generate some random scores for demonstration
      const totalHoles = course?.holesCount || 18;
      const scores = Array(totalHoles).fill(0).map(() => Math.floor(Math.random() * 3) + 3);

      return {
        id: player.id,
        name: player.fullName || 'Player',
        scores,
        total: scores.reduce((sum, score) => sum + score, 0)
      };
    });

    // Construct the session object in the format expected by Legend State
    const sessionResponse = {
      id: sessionId,
      courseId: session.courseId,
      courseName: course?.name || 'Unknown Course',
      date: session.createdAt || new Date().toISOString(),
      players: sessionPlayers,
      currentHole: session.currentHole || 0,
      totalHoles: course?.holesCount || 18,
      par: course?.par || 72,
      status: session.state || 'active'
    };

    return new Response(JSON.stringify(sessionResponse), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching session:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch session' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
