import { observer } from '@legendapp/state/react';
import { store$ } from '../store/scoringSessionStore';

const App = observer(function App() {
  const session = store$.activeSession.get();

  if (session === undefined) {
    return <div>Loading...</div>;
  }

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
