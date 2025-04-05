import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { observable } from '@legendapp/state';
import { useObservable } from '@legendapp/state/react';
import { ScoringCard } from '../../components/ScoringCard';
import NewSessionForm from '../../components/NewSessionForm';
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
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData),
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
    <div className="min-h-screen bg-rich-black p-4">
      <header className="mb-8 text-center">
        <motion.h1
          className="text-3xl font-bold text-salmon-tint mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          TISDAGSGOLFEN
        </motion.h1>
        <motion.div
          className="text-ulthuan-grey text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {isConnected.get() ? (
            <span className="text-success">Online Mode</span>
          ) : (
            <span className="text-warning">Local-First Mode</span>
          )}
        </motion.div>
      </header>

      <main className="max-w-3xl mx-auto">
        {activeSession.get() ? (
          <div>
            <ScoringCard sessionId={activeSession.get()?.id || 0} />

            <motion.div
              className="mt-6 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                className="px-4 py-2 bg-dark-slate-gray text-salmon-tint rounded border-2 border-coffee-bean"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDisconnect}
              >
                Exit Session
              </motion.button>
            </motion.div>
          </div>
        ) : (
          <motion.div
            className="bg-charcoal-gray rounded-lg shadow-retro-lg p-6 border-3 border-rich-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-sugar-cookie mb-6 text-center uppercase tracking-wider">SPELADE RUNDOR</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* Example past rounds - in a real app, these would be loaded from the database */}
              <motion.div
                className="bg-dark-slate-gray p-4 rounded border-2 border-coffee-bean cursor-pointer hover:bg-outer-space transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleLoadSession(1)}
              >
                <div className="text-salmon-tint font-bold">29 Augusti</div>
                <div className="flex justify-between text-sm">
                  <span className="text-ulthuan-grey">Dal-Sjö</span>
                  <span className="text-sugar-cookie">PAR 72 • 18 HÅL</span>
                </div>
                <div className="text-xs text-ulthuan-grey mt-2">Nynäshamns Golfklubb</div>
              </motion.div>

              <motion.div
                className="bg-dark-slate-gray p-4 rounded border-2 border-coffee-bean cursor-pointer hover:bg-outer-space transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleLoadSession(2)}
              >
                <div className="text-salmon-tint font-bold">22 Augusti</div>
                <div className="flex justify-between text-sm">
                  <span className="text-ulthuan-grey">Sjö-Berg</span>
                  <span className="text-sugar-cookie">PAR 72 • 18 HÅL</span>
                </div>
                <div className="text-xs text-ulthuan-grey mt-2">Nynäshamns Golfklubb</div>
              </motion.div>
            </div>

            <motion.button
              className="w-full py-3 bg-teal text-whiteout rounded font-bold shadow-retro border-2 border-dark-side"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowNewSessionForm(true)}
            >
              + Ny Runda
            </motion.button>
          </motion.div>
        )}
      </main>

      <AnimatePresence>
        {showNewSessionForm && (
          <NewSessionForm
            onCreateSession={handleCreateSession}
            onCancel={() => setShowNewSessionForm(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
