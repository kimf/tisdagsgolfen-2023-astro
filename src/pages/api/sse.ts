export const prerender = false;
import type { APIRoute } from 'astro';
import { eq } from 'drizzle-orm';
import db from 'src/db';
import { scoringSessions } from 'src/db/schema';
// Store active connections with their writers
const clients = new Map<string, WritableStreamDefaultWriter<Uint8Array>>();

// Function to send updates to all connected clients
export async function sendUpdate(sessionId: string, data: any) {
  const clientsForSession = Array.from(clients.entries()).filter(([clientId]) =>
    clientId.startsWith(`session-${sessionId}`)
  );

  const writePromises = clientsForSession.map(async ([clientId, writer]) => {
    try {
      const encoder = new TextEncoder();
      const chunk = encoder.encode(`data: ${JSON.stringify(data)}\n\n`);
      await writer.write(chunk);
    } catch (error) {
      console.error(`Error sending update to client ${clientId}:`, error);
      clients.delete(clientId);
    }
  });

  // Wait for all writes to complete
  await Promise.allSettled(writePromises);
}

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get('sessionId');

  if (!sessionId) {
    return new Response(null, {
      status: 400,
      statusText: 'Missing sessionId parameter'
    });
  }

  // Verify the session exists
  const session = await db
    .select()
    .from(scoringSessions)
    .where(eq(scoringSessions.id, parseInt(sessionId)))
    .limit(1);

  if (session.length === 0) {
    return new Response(null, { status: 404, statusText: 'Session not found' });
  }

  // Create a unique client ID
  const clientId = `session-${sessionId}-${Date.now()}`;

  // Create a TransformStream to be able to write to the stream
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();

  // Store the writer for later use
  clients.set(clientId, writer);

  // Send initial connection message with proper error handling
  try {
    const encoder = new TextEncoder();
    await writer.write(encoder.encode(': connected\n\n'));
  } catch (error) {
    console.error('Error sending initial connection message:', error);
    clients.delete(clientId);
    return new Response(null, {
      status: 500,
      statusText: 'Failed to establish connection'
    });
  }

  // Clean up when client disconnects
  request.signal.addEventListener('abort', () => {
    clients.delete(clientId);
    writer.close().catch((error) => {
      console.error('Error closing writer:', error);
    });
  });

  // Return the response with the readable stream
  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    }
  });
};
