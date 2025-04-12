import { useState } from 'react';

export const NewSessionForm = () => {
  const [courseName, setCourseName] = useState('');
  const [totalHoles, setTotalHoles] = useState<9 | 18>(18);
  const [startingHole, setStartingHole] = useState<'front' | 'back'>('front');
  const [players, setPlayers] = useState<string[]>(['']);
  const [par, setPar] = useState(72);

  const addPlayer = () => {
    setPlayers([...players, '']);
  };

  const updatePlayer = (index: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[index] = name;
    setPlayers(newPlayers);
  };

  const removePlayer = (index: number) => {
    if (players.length > 1) {
      const newPlayers = [...players];
      newPlayers.splice(index, 1);
      setPlayers(newPlayers);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Filter out empty player names
    const validPlayers = players.filter((name) => name.trim() !== '');

    if (validPlayers.length === 0) {
      alert('Please add at least one player');
      return;
    }

    if (!courseName) {
      alert('Please enter a course name');
      return;
    }

    onCreateSession({
      courseName,
      totalHoles,
      startingHole,
      players: validPlayers,
      par
    });
  };

  return (
    <div>
      <div>
        <h2>Game Rules</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Course Name</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Enter course name"
              required
            />
          </div>

          <div>
            <label>Holes</label>
            <div>
              <button type="button" onClick={() => setTotalHoles(9)}>
                9 holes
              </button>

              <button type="button" onClick={() => setTotalHoles(18)}>
                18 holes
              </button>
            </div>
          </div>

          <div>
            <label>Starting from</label>
            <div>
              <button type="button" onClick={() => setStartingHole('front')}>
                Front
              </button>

              <button type="button" onClick={() => setStartingHole('back')}>
                Back
              </button>
            </div>
          </div>

          <div>
            <label>Par</label>
            <div>
              <button type="button" onClick={() => setPar(Math.max(54, par - 1))}>
                -
              </button>
              <input
                type="number"
                value={par}
                onChange={(e) => setPar(parseInt(e.target.value) || 72)}
                min="54"
                max="90"
              />
              <button type="button" onClick={() => setPar(Math.min(90, par + 1))}>
                +
              </button>
            </div>
          </div>

          <div>
            <div>
              <label>Players</label>
              <button type="button" onClick={addPlayer}>
                Add Player
              </button>
            </div>

            {players.map((player, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={player}
                  onChange={(e) => updatePlayer(index, e.target.value)}
                  placeholder={`Player ${index + 1}`}
                />
                {players.length > 1 && (
                  <button type="button" onClick={() => removePlayer(index)}></button>
                )}
              </div>
            ))}
          </div>

          <div>
            <button type="submit">Start Game</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewSessionForm;
