import { observable, computed, observe } from '@legendapp/state';

// Define your scoring types
export interface Player {
  id: number;
  name: string;
  scores: number[];
  total: number;
}

export interface ScoringSession {
  id: number;
  courseId: number;
  courseName: string;
  date: string;
  players: Player[];
  currentHole: number;
  totalHoles: number;
  par: number;
  status: 'active' | 'completed';
}

// Create the store with initial state
export const scoringStore = observable<{
  session: ScoringSession | null;
  isConnected: boolean;
}>({
  session: null,
  isConnected: false,
});

// Load persisted state from localStorage if available
if (typeof window !== 'undefined') {
  try {
    const savedState = localStorage.getItem('tisdagsgolfen-scoring-store');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      scoringStore.set(parsedState);
      console.log('Store loaded from localStorage');
    }
  } catch (error) {
    console.error('Failed to load state from localStorage:', error);
  }

  // Save state to localStorage when it changes
  observe(scoringStore, () => {
    try {
      const stateToSave = scoringStore.get();
      localStorage.setItem('tisdagsgolfen-scoring-store', JSON.stringify(stateToSave));
    } catch (error) {
      console.error('Failed to save state to localStorage:', error);
    }
  });
}

// Computed values
export const totalScores = computed(() => {
  const session = scoringStore.session.get();
  if (!session || !session.players) return [];

  return session.players.map(player => ({
    id: player.id,
    name: player.name,
    total: player.scores.reduce((sum, score) => sum + score, 0)
  }));
});

// Connection manager to handle SSE connections reactively
class ConnectionManager {
  private eventSource: EventSource | null = null;
  private activeSessionId: number | null = null;
  private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;

  // Connect to a session
  connect(sessionId: number) {
    // If already connected to this session, do nothing
    if (this.activeSessionId === sessionId && this.eventSource) {
      return;
    }

    // Disconnect any existing connection
    this.disconnect();

    // Set the active session
    this.activeSessionId = sessionId;

    // Create new EventSource
    this.eventSource = new EventSource(`/api/sse?sessionId=${sessionId}`);

    // Handle connection open
    this.eventSource.onopen = () => {
      scoringStore.isConnected.set(true);
    };

    // Handle incoming messages
    this.eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      scoringStore.session.set(data);

      // Save to local storage for offline use
      localStorage.setItem(`scoring-session-${sessionId}`, JSON.stringify(data));
    };

    // Handle errors
    this.eventSource.onerror = () => {
      scoringStore.isConnected.set(false);
      this.eventSource?.close();
      this.eventSource = null;

      // Try to load from local storage
      const savedSession = localStorage.getItem(`scoring-session-${sessionId}`);
      if (savedSession) {
        scoringStore.session.set(JSON.parse(savedSession));
      }

      // Attempt to reconnect after a delay
      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
      }

      this.reconnectTimeout = setTimeout(() => {
        if (this.activeSessionId === sessionId) {
          this.connect(sessionId);
        }
      }, 5000);
    };

    // Load initial data from local storage if available
    const savedSession = localStorage.getItem(`scoring-session-${sessionId}`);
    if (savedSession) {
      scoringStore.session.set(JSON.parse(savedSession));
    }
  }

  // Disconnect from the current session
  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    this.activeSessionId = null;
    scoringStore.isConnected.set(false);
  }

  // Get the current session ID
  getActiveSessionId() {
    return this.activeSessionId;
  }
}

// Create a singleton instance
export const connectionManager = new ConnectionManager();

// Simplified connect function that uses the manager
export function connectToSSE(sessionId: number) {
  connectionManager.connect(sessionId);
}

// Simplified disconnect function that uses the manager
export function disconnectFromSSE() {
  connectionManager.disconnect();
}

// Update a player's score
export async function updateScore(playerId: number, holeIndex: number, score: number) {
  const session = scoringStore.session.get();
  if (!session || !session.players) return;

  // Update local state immediately
  const playerIndex = session.players.findIndex(p => p.id === playerId);
  if (playerIndex === -1) return;

  // Make sure the player and scores exist
  const player = session.players[playerIndex];
  if (!player || !player.scores) return;

  // Update the score
  player.scores[holeIndex] = score;

  // Calculate new total
  const newTotal = player.scores.reduce((sum, s) => sum + s, 0);
  player.total = newTotal;

  // Update the store
  scoringStore.session.set(session);

  // Save to local storage
  const sessionId = session.id;
  localStorage.setItem(`scoring-session-${sessionId}`, JSON.stringify(session));

  // Send update to server if connected
  if (scoringStore.isConnected.get()) {
    try {
      const response = await fetch(`/api/scoring/${sessionId}/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          playerId,
          holeIndex,
          score
        })
      });

    } catch (error) {
      console.error('Failed to update score on server:', error);
    }
  }
}


