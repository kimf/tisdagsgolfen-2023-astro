import { useObservable, use$ } from '@legendapp/state/react';
import { scoringStore, updateScore } from '../store/scoringStore';
import { useSessionConnection } from '../hooks/useSessionConnection';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import HoleSelector from './HoleSelector';

interface ScoringCardProps {
  sessionId: number;
}

export const ScoringCard = ({ sessionId }: ScoringCardProps) => {
  // Local state for UI interactions
  const holeIndex = useObservable(0);
  const [showHoleSelector, setShowHoleSelector] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('');

  // Use the custom hook to manage session connection
  useSessionConnection(sessionId);

  // Add some debugging to help troubleshoot
  useEffect(() => {
    console.log('ScoringCard mounted with sessionId:', sessionId);

    // Fetch session data directly if needed
    const fetchSessionData = async () => {
      try {
        const response = await fetch(`/api/scoring/${sessionId}`);
        if (response.ok) {
          const sessionData = await response.json();
          console.log('Session data fetched directly:', sessionData);
          scoringStore.session.set(sessionData);
        } else {
          console.error('Failed to fetch session data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching session data:', error);
      }
    };

    // Check if we already have session data
    const session = scoringStore.session.get();
    if (!session || session.id !== sessionId) {
      console.log('No session data in store, fetching...');
      fetchSessionData();
    }

    const checkSession = () => {
      const session = scoringStore.session.get();
      console.log('Current session in store:', session);
      setDebugInfo(
        JSON.stringify(
          {
            sessionId,
            hasSession: !!session,
            sessionData: session ? { id: session.id, players: session.players?.length || 0 } : null,
            isConnected: scoringStore.isConnected.get()
          },
          null,
          2
        )
      );
    };

    checkSession();
    const intervalId = setInterval(checkSession, 2000);

    return () => clearInterval(intervalId);
  }, [sessionId]);

  // Function to transform the session data if needed
  const transformSessionData = (rawSession: any) => {
    if (!rawSession) return null;

    // Check if the session already has the expected structure
    if (rawSession.players && Array.isArray(rawSession.players)) {
      return rawSession;
    }

    // If not, try to transform it to the expected structure
    try {
      console.log('Transforming session data:', rawSession);

      // Create a default structure if the data doesn't match expectations
      return {
        id: rawSession.id,
        courseId: rawSession.courseId,
        courseName: rawSession.courseName || 'Unknown Course',
        date: rawSession.createdAt || new Date().toISOString(),
        currentHole: rawSession.currentHole || 0,
        totalHoles: rawSession.totalHoles || 18,
        par: rawSession.par || 72,
        status: rawSession.state || 'active',
        // Create empty players array if none exists
        players: []
      };
    } catch (error) {
      console.error('Error transforming session data:', error);
      return null;
    }
  };

  return use$(() => {
    const rawSession = scoringStore.session.get();
    const session = transformSessionData(rawSession);

    if (!session) {
      return (
        <div className="p-4 bg-charcoal-gray rounded-lg shadow-retro-lg">
          <h2 className="text-xl font-bold text-salmon-tint mb-4">Loading scoring session...</h2>
          <div className="flex justify-center">
            <motion.div
              className="w-10 h-10 border-4 border-teal border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          <div className="mt-6 p-4 bg-dark-slate-gray rounded border border-coffee-bean">
            <h3 className="text-sm font-bold text-ulthuan-grey mb-2">Debug Info:</h3>
            <pre className="text-xs text-whiteout overflow-auto max-h-40">{debugInfo}</pre>
          </div>

          <div className="mt-4 p-4 bg-dark-slate-gray rounded border border-coffee-bean">
            <h3 className="text-sm font-bold text-ulthuan-grey mb-2">Raw Session Data:</h3>
            <pre className="text-xs text-whiteout overflow-auto max-h-40">
              {JSON.stringify(rawSession, null, 2)}
            </pre>
          </div>
        </div>
      );
    }

    const currentHole = holeIndex.get();
    const isConnected = scoringStore.isConnected.get();
    const { courseName, players, totalHoles } = session;

    const handlePrevHole = () => {
      if (currentHole > 0) {
        holeIndex.set(currentHole - 1);
      }
    };

    const handleNextHole = () => {
      if (currentHole < totalHoles - 1) {
        holeIndex.set(currentHole + 1);
      }
    };

    const handleHoleSelect = (selectedHoleIndex: number) => {
      holeIndex.set(selectedHoleIndex);
      setShowHoleSelector(false);
    };

    const handleScoreChange = (playerId: number, newScore: number) => {
      updateScore(playerId, currentHole, newScore);
    };

    return (
      <motion.div
        className="scoring-card max-w-full overflow-x-auto bg-charcoal-gray text-whiteout rounded-lg shadow-retro-lg p-6 my-4 border-3 border-rich-black font-retro"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="connection-status mb-4 flex items-center justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {isConnected ? (
            <motion.span
              className="connected text-success flex items-center text-xs uppercase tracking-wider"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Online
            </motion.span>
          ) : (
            <motion.span
              className="disconnected text-warning flex items-center text-xs uppercase tracking-wider"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2 }}
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              Offline (Local First Mode)
            </motion.span>
          )}
        </motion.div>

        <motion.div className="mb-8">
          <motion.h2
            className="text-2xl font-bold text-salmon-tint mb-2 uppercase tracking-wider"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {courseName}
          </motion.h2>
          <motion.div
            className="flex justify-between items-center bg-dark-slate-gray p-3 rounded border-2 border-coffee-bean"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <span className="text-sm text-ulthuan-grey">PAR {session.par}</span>
            <span className="text-sm text-ulthuan-grey">{session.totalHoles} HÅL</span>
          </motion.div>
        </motion.div>
        <motion.div
          className="hole-navigation flex justify-between items-center my-6 bg-dark-slate-gray p-4 rounded border-2 border-coffee-bean"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            className="px-3 py-2 bg-dark-side text-whiteout rounded border-2 border-teal disabled:opacity-50 disabled:cursor-not-allowed shadow-retro"
            onClick={handlePrevHole}
            disabled={currentHole === 0}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ←
          </motion.button>

          <motion.div className="text-center">
            <motion.button
              className="font-bold text-xl text-sugar-cookie block hover:underline"
              key={`hole-${currentHole}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowHoleSelector(true)}
            >
              HÅL {currentHole + 1}
            </motion.button>
            <motion.span
              className="text-xs text-ulthuan-grey block mt-1"
              key={`total-${currentHole}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              av {totalHoles}
            </motion.span>
          </motion.div>

          <motion.button
            className="px-3 py-2 bg-dark-side text-whiteout rounded border-2 border-teal disabled:opacity-50 disabled:cursor-not-allowed shadow-retro"
            onClick={handleNextHole}
            disabled={currentHole === totalHoles - 1}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            →
          </motion.button>
        </motion.div>

        <motion.div
          className="mt-6 mb-4 uppercase tracking-wider text-sm text-center text-sugar-cookie"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          POÄNG
        </motion.div>

        <motion.table
          className="scoring-table w-full border-collapse"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <thead>
            <tr>
              <th className="p-2 text-left bg-dark-side border border-coffee-bean font-bold text-ulthuan-grey uppercase text-xs tracking-wider">
                Spelare
              </th>
              <th className="p-2 text-center bg-dark-side border border-coffee-bean font-bold text-ulthuan-grey uppercase text-xs tracking-wider">
                Poäng
              </th>
              <th className="p-2 text-center bg-dark-side border border-coffee-bean font-bold text-ulthuan-grey uppercase text-xs tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {players.map((player: any) => (
                <motion.tr
                  key={player.id}
                  className="hover:bg-dark-slate-gray transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <td className="p-3 border border-coffee-bean font-medium text-salmon-tint">
                    {player.name}
                  </td>
                  <td className="p-3 border border-coffee-bean">
                    <div className="score-controls flex justify-center items-center gap-3">
                      <motion.button
                        className="w-8 h-8 rounded-sm border-2 border-dark-side bg-outer-space hover:bg-dark-side flex items-center justify-center shadow-retro text-whiteout font-bold"
                        onClick={() =>
                          handleScoreChange(player.id, Math.max(1, player.scores[currentHole] - 1))
                        }
                        aria-label="Decrease score"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        -
                      </motion.button>
                      <motion.span
                        key={`${player.id}-${currentHole}-${player.scores[currentHole]}`}
                        className="font-bold text-xl w-8 text-center text-sugar-cookie"
                        initial={{ scale: 1.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                      >
                        {player.scores[currentHole]}
                      </motion.span>
                      <motion.button
                        className="w-8 h-8 rounded-sm border-2 border-dark-side bg-outer-space hover:bg-dark-side flex items-center justify-center shadow-retro text-whiteout font-bold"
                        onClick={() => handleScoreChange(player.id, player.scores[currentHole] + 1)}
                        aria-label="Increase score"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        +
                      </motion.button>
                    </div>
                  </td>
                  <td className="p-3 border border-coffee-bean text-center font-bold">
                    <motion.span
                      key={`${player.id}-total-${player.total}`}
                      className="text-ulthuan-grey"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {player.total}
                    </motion.span>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </motion.table>

        {/* Hole selection modal - inspired by image 4 */}
        <motion.div
          className="mt-8 flex justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            className="px-4 py-2 bg-dark-side text-whiteout rounded border-2 border-teal shadow-retro flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevHole}
            disabled={currentHole === 0}
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Föregående Hål
          </motion.button>

          <motion.button
            className="px-4 py-2 bg-teal text-whiteout rounded border-2 border-dark-side shadow-retro flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextHole}
            disabled={currentHole === totalHoles - 1}
          >
            Spara Hål {currentHole + 1}
            <svg
              className="w-5 h-5 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>

        {/* Hole Selector Modal */}
        <AnimatePresence>
          {showHoleSelector && (
            <HoleSelector
              totalHoles={totalHoles}
              currentHole={currentHole}
              onHoleSelect={handleHoleSelect}
              onClose={() => setShowHoleSelector(false)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    );
  });
};

export default ScoringCard;
