export const prerender = false; // Render at request time
import { eq } from 'drizzle-orm';
import { db } from '../../db';
import scoringSessions from '../../db/schema/session';
import courses from '../../db/schema/course';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ cookies }) => {
  const userId = cookies.get('activeUserId');
  if (!userId) {
    console.log('No activeUserId cookie found');
    return new Response(null, {
      status: 401,
      statusText: 'Unauthorized'
    });
  }

  // console.log('Looking for active session for user:', userId.value);

  try {
    // Use the correct query with scoringSessions
    const session = await db
      .select()
      .from(scoringSessions)
      .where(eq(scoringSessions.ownerId, userId.value))
      .limit(1);

    console.log('Query result:', session);

    if (session.length === 0) {
      console.log('No active session found for user');
      return new Response(null, {
        status: 404,
        statusText: 'Not found'
      });
    }

    // Get the course information
    const courseInfo = await db.query.courses.findFirst({
      where: eq(courses.id, session[0].courseId)
    });

    console.log('Course info:', courseInfo);

    // Get player scores for this session
    // This would need to be adapted to your actual schema
    // This is just a placeholder based on your existing code
    const playerScores: Array<{ id: number; name: string; scores: number[]; total: number }> = [];

    // Format the response to match what ScoringCard expects
    const formattedSession = {
      ...session[0],
      courseName: courseInfo?.name || 'Unknown Course',
      players: playerScores, // This should be populated based on your schema
      totalHoles: courseInfo?.holesCount || 18,
      par: courseInfo?.par || 72,
      status: session[0].state || 'active'
    };

    console.log('Active session found:', formattedSession);

    return new Response(JSON.stringify(formattedSession), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching active session:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch active session' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
