import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { POST } from '../create';
import { db } from '../../../../db';
import courses from '../../../../db/schema/course';
import scoringSessions from '../../../../db/schema/session';
import { eq } from 'drizzle-orm';
import profiles from '../../../../db/schema/profile';

// Mock the SSE update
vi.mock('../../sse', () => ({
  sendUpdate: vi.fn()
}));

describe('POST /api/scoring/create', () => {
  beforeEach(async () => {
    // Clear all tables before each test
    // await db.delete(scores);
    await db.delete(scoringSessions);
  });

  it('should create a new session with multiple players', async () => {
    const testData = {
      courseName: 'Test Course',
      totalHoles: 18,
      startingHole: 'front',
      players: ['Player 1', 'Player 2'],
      par: 72
    };

    const request = new Request('http://test.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    const response = await POST({ request } as any);
    const data = await response.json();

    // Verify response
    expect(response.status).toBe(201);
    expect(data.courseName).toBe(testData.courseName);
    expect(data.players).toHaveLength(2);
    expect(data.totalHoles).toBe(18);
    expect(data.status).toBe('active');

    // Verify database state
    const dbCourse = await db.select().from(courses).where(eq(courses.name, testData.courseName));
    expect(dbCourse).toHaveLength(1);

    const dbPlayers = await db.select().from(profiles);
    expect(dbPlayers).toHaveLength(2);

    const dbScores = await db.select().from(scores);
    // Should have 18 scores per player (36 total)
    expect(dbScores).toHaveLength(36);
  });

  it('should handle errors gracefully', async () => {
    const invalidData = {
      // Missing required fields
      courseName: 'Test Course'
    };

    const request = new Request('http://test.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(invalidData)
    });

    const response = await POST({ request } as any);
    expect(response.status).toBe(500);
  });
});
