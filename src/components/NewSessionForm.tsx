import { useState } from 'react';
import { motion } from 'framer-motion';

interface NewSessionFormProps {
  onCreateSession: (sessionData: {
    courseName: string;
    totalHoles: number;
    startingHole: 'front' | 'back';
    players: string[];
    par: number;
  }) => void;
  onCancel: () => void;
}

export const NewSessionForm = ({ onCreateSession, onCancel }: NewSessionFormProps) => {
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
    const validPlayers = players.filter(name => name.trim() !== '');
    
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
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-charcoal-gray text-whiteout rounded-xl p-6 w-full max-w-md border-3 border-rich-black shadow-retro-lg"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <h2 className="text-2xl font-bold text-salmon-tint mb-6 text-center uppercase tracking-wider">Game Rules</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-ulthuan-grey mb-2 text-sm uppercase tracking-wider">Course Name</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full bg-dark-slate-gray border-2 border-coffee-bean rounded p-3 text-whiteout"
              placeholder="Enter course name"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-ulthuan-grey mb-2 text-sm uppercase tracking-wider">Holes</label>
            <div className="flex gap-4">
              <motion.button
                type="button"
                className={`flex-1 py-3 px-4 rounded border-2 flex items-center justify-center gap-2 ${
                  totalHoles === 9 
                    ? 'bg-teal border-dark-side text-whiteout' 
                    : 'bg-dark-slate-gray border-coffee-bean text-ulthuan-grey'
                }`}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTotalHoles(9)}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <circle cx="8" cy="12" r="2" fill="currentColor" />
                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                  <circle cx="16" cy="12" r="2" fill="currentColor" />
                </svg>
                9 holes
              </motion.button>
              
              <motion.button
                type="button"
                className={`flex-1 py-3 px-4 rounded border-2 flex items-center justify-center gap-2 ${
                  totalHoles === 18 
                    ? 'bg-teal border-dark-side text-whiteout' 
                    : 'bg-dark-slate-gray border-coffee-bean text-ulthuan-grey'
                }`}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTotalHoles(18)}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <circle cx="8" cy="9" r="1.5" fill="currentColor" />
                  <circle cx="12" cy="9" r="1.5" fill="currentColor" />
                  <circle cx="16" cy="9" r="1.5" fill="currentColor" />
                  <circle cx="8" cy="15" r="1.5" fill="currentColor" />
                  <circle cx="12" cy="15" r="1.5" fill="currentColor" />
                  <circle cx="16" cy="15" r="1.5" fill="currentColor" />
                </svg>
                18 holes
              </motion.button>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-ulthuan-grey mb-2 text-sm uppercase tracking-wider">Starting from</label>
            <div className="flex gap-4">
              <motion.button
                type="button"
                className={`flex-1 py-3 px-4 rounded border-2 flex items-center justify-center gap-2 ${
                  startingHole === 'front' 
                    ? 'bg-teal border-dark-side text-whiteout' 
                    : 'bg-dark-slate-gray border-coffee-bean text-ulthuan-grey'
                }`}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStartingHole('front')}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M5 12L11 6M5 12L11 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Front
              </motion.button>
              
              <motion.button
                type="button"
                className={`flex-1 py-3 px-4 rounded border-2 flex items-center justify-center gap-2 ${
                  startingHole === 'back' 
                    ? 'bg-teal border-dark-side text-whiteout' 
                    : 'bg-dark-slate-gray border-coffee-bean text-ulthuan-grey'
                }`}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStartingHole('back')}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back
              </motion.button>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-ulthuan-grey mb-2 text-sm uppercase tracking-wider">Par</label>
            <div className="flex items-center">
              <motion.button
                type="button"
                className="w-10 h-10 rounded-l border-2 border-coffee-bean bg-dark-slate-gray flex items-center justify-center"
                whileTap={{ scale: 0.95 }}
                onClick={() => setPar(Math.max(54, par - 1))}
              >
                -
              </motion.button>
              <input
                type="number"
                value={par}
                onChange={(e) => setPar(parseInt(e.target.value) || 72)}
                className="w-16 h-10 bg-dark-slate-gray border-t-2 border-b-2 border-coffee-bean text-center text-whiteout"
                min="54"
                max="90"
              />
              <motion.button
                type="button"
                className="w-10 h-10 rounded-r border-2 border-coffee-bean bg-dark-slate-gray flex items-center justify-center"
                whileTap={{ scale: 0.95 }}
                onClick={() => setPar(Math.min(90, par + 1))}
              >
                +
              </motion.button>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-ulthuan-grey text-sm uppercase tracking-wider">Players</label>
              <motion.button
                type="button"
                className="text-sugar-cookie text-sm flex items-center"
                whileTap={{ scale: 0.95 }}
                onClick={addPlayer}
              >
                <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Add Player
              </motion.button>
            </div>
            
            {players.map((player, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={player}
                  onChange={(e) => updatePlayer(index, e.target.value)}
                  className="flex-1 bg-dark-slate-gray border-2 border-coffee-bean rounded p-2 text-whiteout"
                  placeholder={`Player ${index + 1}`}
                />
                {players.length > 1 && (
                  <motion.button
                    type="button"
                    className="w-10 h-10 bg-dark-slate-gray border-2 border-coffee-bean rounded flex items-center justify-center text-salmon-tint"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => removePlayer(index)}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.button>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex gap-4 mt-8">
            <motion.button
              type="button"
              className="flex-1 py-3 px-4 bg-dark-slate-gray border-2 border-coffee-bean rounded text-ulthuan-grey"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onCancel}
            >
              Cancel
            </motion.button>
            
            <motion.button
              type="submit"
              className="flex-1 py-3 px-4 bg-teal border-2 border-dark-side rounded text-whiteout font-bold shadow-retro"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Game
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default NewSessionForm;
