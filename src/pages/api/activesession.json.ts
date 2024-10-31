import { eq } from 'drizzle-orm';
import { db } from '../../db';
import scoringSessions from '../../db/schema/session';
import courses from '../../db/schema/course';

export async function GET() {
  const sessions = await db.query.sessions.findFirst({
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
}
