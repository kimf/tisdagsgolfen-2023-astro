import { useEffect } from 'react';
import { connectionManager } from '../store/scoringStore';

/**
 * Custom hook to manage session connection lifecycle
 *
 * This hook connects to a scoring session via SSE and ensures proper cleanup
 * when the component unmounts or when the session ID changes.
 *
 * @param sessionId The ID of the session to connect to
 */
export function useSessionConnection(sessionId: number | null) {
  useEffect(() => {
    // Skip if no sessionId is provided
    if (sessionId === null) return;

    // Connect to the session
    connectionManager.connect(sessionId);

    // Clean up when the component unmounts or sessionId changes
    return () => {
      // Only disconnect if we're still connected to this session
      if (connectionManager.getActiveSessionId() === sessionId) {
        connectionManager.disconnect();
      }
    };
  }, [sessionId]);
}
