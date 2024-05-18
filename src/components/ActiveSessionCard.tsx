import { useGetActiveSessions } from '../utils/getActiveSessions';

export default function ActiveSessionCard() {
  const userId = document?.cookie
    .split('; ')
    .find((row) => row.startsWith('sb-user-id='))
    .split('=')[1] as string;

  const scoringSessions = useGetActiveSessions();

  if (!scoringSessions.data?.data) {
    return <div className="tabs">Laddar...</div>;
  }

  console.log(scoringSessions.data.data);
  const ownedScoringSession = scoringSessions?.data?.data.find((sesh) => sesh.owner_id === userId);
  const hasFinishedSession = ownedScoringSession && ownedScoringSession.state === 'PENDING';
  const scoringSession = ownedScoringSession || scoringSessions[0];

  return (
    <div className="tabs">
      <h2>{scoringSession.course.name.toUpperCase()}</h2>
      <div style={{ flexDirection: 'column' }}>
        <a href={`/leaderboard/${scoringSession.id}`}>
          <div style={{ flexDirection: 'row', justifyContent: 'space-between' }}>LEDARTAVLA</div>
        </a>
        <a
          href={
            !ownedScoringSession
              ? '/sessions/new?id=' + scoringSession.id
              : `/scoring/${ownedScoringSession.id}`
          }>
          {hasFinishedSession ? 'REDIGERA' : ownedScoringSession ? 'FORTSÄTT' : 'SPELA'}
        </a>
      </div>
    </div>
  );
}
