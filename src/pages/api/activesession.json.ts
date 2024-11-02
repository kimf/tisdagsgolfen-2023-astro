export const prerender = false; // Render at request time
import { eq } from 'drizzle-orm';
import { db } from '../../db';
import scoringSessions from '../../db/schema/session';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ cookies }) => {
  const userId = cookies.get('activeUserId');
  if (!userId) {
    return new Response(null, {
      status: 401,
      statusText: 'Unauthorized'
    });
  }

  const sessions = await db.query.sessions.findFirst({
    where: eq(scoringSessions.ownerId, userId.value),
    with: {
      course: true
    }
  });

  if (!sessions) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found'
    });
  }

  return new Response(JSON.stringify(sessions), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
