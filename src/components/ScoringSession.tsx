import { observer } from '@legendapp/state/react';
import { store$ } from '../store/scoringSessionStore';

// First, load courses, players and scoring sessions in to memory/local cache
// If not logged in, login first
// if no active sessions - have them clone one or create a new one
// if active session, show current hole and scorecard

const App = observer(function App() {
  const session = store$.activeSession.get();

  console.log(session);

  const createNewSession = () => {
    store$.createScoringSession({
      id: 1,
      name: 'Sjö-Berg',
      club: 'Nynäshamns GK',
      par: 72,
      holesCount: 18
    });
  };

  if (!session) {
    return <button onClick={createNewSession}>Skapa ny session</button>;
  }

  const deleteSession = (e: React.MouseEvent) => {
    if (window.confirm('Vill du avsluta sessionen?')) {
      store$.deleteScoringSession();
    }
  };

  return (
    <div>
      <h2>{session.course.name}</h2>
      <p>Current Hole: {session.currentHole}</p>
      <button onClick={deleteSession}>Avsluta session</button>
      <a href="#">Fortsätt</a>
    </div>
  );
});

export default App;
