import db from 'src/db';
import { scoringSessions } from '../schema';
import { eq } from 'drizzle-orm';

export async function userActiveSession(userId: number | string) {
  const activeSessions = await db
    .select()
    .from(scoringSessions)
    .where(eq(scoringSessions.ownerId, Number(userId)))
    .limit(1);

  if (!activeSessions || activeSessions.length === 0) {
    return null;
  }

  return activeSessions[0];
}
