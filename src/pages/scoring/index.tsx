import { useState } from 'react';
import { useObservable } from '@legendapp/state/react';
import { ScoringCard } from '../../components/homepage/ScoringCard';
import NewSessionForm from '../../components/scoring/NewSessionForm';
import { scoringStore, connectToSSE, disconnectFromSSE } from '../../store/scoringStore';

// Setup reactive tracking for React components
const enableTracking = () => {
  // In a real implementation, this would use the actual enableReactTracking
  // For now, we'll just create a placeholder function
  return { auto: true };
};

// Enable reactive tracking for React components
enableTracking();

interface ScoringPageProps {
  // Props can be passed from Astro if needed
}

export default function ScoringPage({}: ScoringPageProps) {
  const [showNewSessionForm, setShowNewSessionForm] = useState(false);
  const activeSession = useObservable(scoringStore.session);
  const isConnected = useObservable(scoringStore.isConnected);

  const handleCreateSession = async (sessionData: {
    courseName: string;
    totalHoles: number;
    startingHole: 'front' | 'back';
    players: string[];
    par: number;
  }) => {
    try {
      console.log('Creating new session with data:', sessionData);
      // Create a new session on the server
      const response = await fetch('/api/scoring/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sessionData)
      });

      if (!response.ok) {
        console.error('Server response not OK:', response.status, response.statusText);
        throw new Error(`Failed to create session: ${response.status} ${response.statusText}`);
      }

      const newSession = await response.json();
      console.log('New session created:', newSession);

      // Check if the session has the expected structure
      if (!newSession || typeof newSession !== 'object') {
        console.error('Invalid session data format:', newSession);
        throw new Error('Invalid session data format');
      }

      // Update the store with the new session
      scoringStore.session.set(newSession);
      console.log('Session set in store:', scoringStore.session.get());

      // Connect to SSE for real-time updates
      connectToSSE(newSession.id);

      // Hide the form
      setShowNewSessionForm(false);
    } catch (error) {
      console.error('Error creating session:', error);
      alert('Failed to create session. Please try again.');
    }
  };

  const handleLoadSession = async (sessionId: number) => {
    try {
      console.log('Loading session:', sessionId);
      // Load session from the server
      const response = await fetch(`/api/scoring/${sessionId}`);

      if (!response.ok) {
        console.error('Server response not OK:', response.status, response.statusText);
        throw new Error(`Failed to load session: ${response.status} ${response.statusText}`);
      }

      const session = await response.json();
      console.log('Session loaded:', session);

      // Check if the session has the expected structure
      if (!session || typeof session !== 'object') {
        console.error('Invalid session data format:', session);
        throw new Error('Invalid session data format');
      }

      // Update the store with the loaded session
      scoringStore.session.set(session);
      console.log('Session set in store:', scoringStore.session.get());

      // Connect to SSE for real-time updates
      connectToSSE(session.id);
    } catch (error) {
      console.error('Error loading session:', error);
      alert('Failed to load session. Please try again.');
    }
  };

  const handleDisconnect = () => {
    console.log('Disconnecting from session');
    disconnectFromSSE();
    scoringStore.session.set(null);
    console.log('Session cleared from store');
  };

  return (
    <div>
      <header>
        <h1>TISDAGSGOLFEN</h1>
        {isConnected.get() ? (
          <span className="connected">Online Mode</span>
        ) : (
          <span className="disconnected">Local-First Mode</span>
        )}
      </header>

      <main>
        {activeSession.get() && (
          <div>
            <ScoringCard sessionId={activeSession.get()?.id || 0} />

            <button onClick={handleDisconnect}>Exit Session</button>
          </div>
        )}
      </main>

      {showNewSessionForm && (
        <NewSessionForm
          onCreateSession={handleCreateSession}
          onCancel={() => setShowNewSessionForm(false)}
        />
      )}
    </div>
  );
}
