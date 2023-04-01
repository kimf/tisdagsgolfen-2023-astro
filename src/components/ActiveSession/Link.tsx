import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthProvider';
import getActiveSessions from '../../utils/getActiveSessions';

const ActiveSessionLink = () => {
  const { session } = useAuth();
  const result = useQuery(['sessions'], getActiveSessions);
  const { isLoading, fetchStatus, data } = result;
  const scoringSessions = (!isLoading && data && data.data) || [];
  const ownedScoringSession = scoringSessions.find((sesh) => sesh.owner_id === session?.user.id);

  useEffect(() => {
    document.querySelector('#links')?.remove();
  }, []);

  return (
    <div style={{ padding: '12px', display: 'flex', gap: 10 }}>
      {!isLoading && ownedScoringSession && (
        <a href={`/scoring/${ownedScoringSession.id}`}>FORTSÄTT RUNDA</a>
      )}
      {!isLoading && !ownedScoringSession && (
        <>
          <a href="/sessions/new">NY RUNDA</a>
          {scoringSessions.length > 0 && <a href="/scoring/leaderboard">FÖLJ AKTIV</a>}
        </>
      )}
    </div>
  );
};

export default ActiveSessionLink;
