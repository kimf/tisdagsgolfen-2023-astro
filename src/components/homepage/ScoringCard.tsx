import { useObservable, use$ } from '@legendapp/state/react';
import { scoringStore, updateScore } from '../../store/scoringStore';
import { useSessionConnection } from '../../hooks/useSessionConnection';
import { useState, useEffect } from 'react';
import HoleSelector from '../scoring/HoleSelector';

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
        <div>
          <h2>Loading scoring session...</h2>

          <div>
            <h3>Debug Info:</h3>
            <pre>{debugInfo}</pre>
          </div>

          <div>
            <h3>Raw Session Data:</h3>
            <pre>{JSON.stringify(rawSession, null, 2)}</pre>
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
      <div>
        <div>
          {isConnected ? (
            <span>
              <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Online
            </span>
          ) : (
            <span>
              <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              Offline (Local First Mode)
            </span>
          )}
        </div>

        <div>
          <h2>{courseName}</h2>
          <div>
            <span>PAR {session.par}</span>
            <span>{session.totalHoles} HÅL</span>
          </div>
        </div>
        <div>
          <button onClick={handlePrevHole} disabled={currentHole === 0}>
            ←
          </button>

          <div>
            <button key={`hole-${currentHole}`} onClick={() => setShowHoleSelector(true)}>
              HÅL {currentHole + 1}
            </button>
            <span key={`total-${currentHole}`} transition={{ delay: 0.3 }}>
              av {totalHoles}
            </span>
          </div>

          <button onClick={handleNextHole} disabled={currentHole === totalHoles - 1}>
            →
          </button>
        </div>

        <div>POÄNG</div>

        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th style={{ textAlign: 'center' }}>Score</th>
              <th style={{ textAlign: 'center' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player: any) => (
              <tr key={player.id}>
                <td>
                  <span>{player.name}</span>
                </td>
                <td>
                  <div>
                    <button
                      onClick={() =>
                        handleScoreChange(player.id, Math.max(1, player.scores[currentHole] - 1))
                      }
                      aria-label="Decrease score"
                    >
                      -
                    </button>
                    <span key={`${player.id}-${currentHole}-${player.scores[currentHole]}`}>
                      {player.scores[currentHole]}
                    </span>
                    <button
                      onClick={() => handleScoreChange(player.id, player.scores[currentHole] + 1)}
                      aria-label="Increase score"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span key={`${player.id}-total-${player.total}`}>{player.total}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Hole selection modal - inspired by image 4 */}
        <div>
          <button onClick={handlePrevHole} disabled={currentHole === 0}>
            <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Föregående Hål
          </button>

          <button onClick={handleNextHole} disabled={currentHole === totalHoles - 1}>
            Spara Hål {currentHole + 1}
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Hole Selector Modal */}

        {showHoleSelector && (
          <HoleSelector
            totalHoles={totalHoles}
            currentHole={currentHole}
            onHoleSelect={handleHoleSelect}
            onClose={() => setShowHoleSelector(false)}
          />
        )}
      </div>
    );
  });
};

export default ScoringCard;
