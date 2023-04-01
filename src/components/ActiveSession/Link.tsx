import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthProvider';
import getActiveSessions from '../../utils/getActiveSessions';

const ActiveSessionLink = () => {
  const { session } = useAuth();
  const result = useQuery(['sessions'], getActiveSessions, { staleTime: 0, cacheTime: 0 });
  const { isLoading, fetchStatus, data } = result;
  const scoringSessions = (!isLoading && data && data.data) || [];
  const ownedScoringSession = scoringSessions.find((sesh) => sesh.owner_id === session?.user.id);

  return (
    <div style={{ padding: '12px', display: 'flex', gap: 10, float: 'right', maxWidth: '200px' }}>
      {!isLoading && ownedScoringSession && (
        <a href={`/scoring/${ownedScoringSession.id}`} className="btn">
          FORTSÄTT RUNDA
        </a>
      )}
      {!isLoading && !ownedScoringSession && (
        <>
          <a href="/sessions/new">
            <button className="skeleton-box">NY RUNDA</button>
          </a>

          {scoringSessions.length > 0 && <a href="/scoring/leaderboard">FÖLJ AKTIV</a>}
        </>
      )}
    </div>
  );
};

export default ActiveSessionLink;
