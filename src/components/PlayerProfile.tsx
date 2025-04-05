import { useState } from 'react';
import { motion } from 'framer-motion';

interface GameSummary {
  id: number;
  date: string;
  courseName: string;
  score: number;
  relativeToPar: number;
}

interface PlayerStats {
  averageScore: number;
  roundsPlayed: number;
  careerPoints: number;
  winningPercentage: number;
  recentScores: number[];
  recentPerformance: ('win' | 'loss' | 'draw')[];
}

interface PlayerProfileProps {
  playerId: number;
  playerName: string;
  stats: PlayerStats;
  recentGames: GameSummary[];
  onClose?: () => void;
}

export const PlayerProfile = ({ playerName, stats, recentGames, onClose }: PlayerProfileProps) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'games'>('stats');
  
  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-charcoal-gray w-full max-w-md rounded-xl overflow-hidden shadow-retro-lg"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        {/* Header */}
        <div className="relative">
          <div className="h-24 bg-gradient-to-r from-teal to-dark-side"></div>
          <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start">
            <motion.button
              className="w-8 h-8 bg-rich-black bg-opacity-50 rounded-full flex items-center justify-center text-whiteout"
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
            
            <div className="text-right">
              <div className="text-xs text-ulthuan-grey opacity-80">Good Morning</div>
              <div className="text-whiteout font-bold">{playerName}</div>
            </div>
          </div>
          
          <div className="absolute -bottom-12 left-4">
            <div className="w-24 h-24 bg-rich-black rounded-full border-4 border-charcoal-gray flex items-center justify-center">
              <div className="text-3xl font-bold text-whiteout">{playerName.charAt(0)}</div>
            </div>
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="pt-16 px-4 pb-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-whiteout">{playerName}</h2>
            <p className="text-ulthuan-grey">Joined 2023</p>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b border-coffee-bean mb-4">
            <button
              className={`flex-1 py-2 text-center font-medium ${
                activeTab === 'stats' ? 'text-teal border-b-2 border-teal' : 'text-ulthuan-grey'
              }`}
              onClick={() => setActiveTab('stats')}
            >
              Statistics
            </button>
            <button
              className={`flex-1 py-2 text-center font-medium ${
                activeTab === 'games' ? 'text-teal border-b-2 border-teal' : 'text-ulthuan-grey'
              }`}
              onClick={() => setActiveTab('games')}
            >
              Recent Games
            </button>
          </div>
          
          {/* Statistics Tab */}
          {activeTab === 'stats' && (
            <div>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-ulthuan-grey uppercase text-sm">Average Score</h3>
                </div>
                <div className="flex items-end">
                  <div className="text-4xl font-bold text-whiteout">{stats.averageScore}</div>
                  <div className="text-sm text-ulthuan-grey ml-1 mb-1">.531</div>
                </div>
                
                <div className="mt-4 flex space-x-1">
                  {stats.recentScores.map((score, index) => (
                    <div 
                      key={index} 
                      className="flex-1"
                    >
                      <div 
                        className="bg-purple-500 rounded-t-sm" 
                        style={{ 
                          height: `${Math.max(15, Math.min(60, score))}px`,
                          opacity: 0.7 + (index * 0.05)
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-ulthuan-grey mt-1">Last 5 Games</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-dark-slate-gray rounded-lg p-3">
                  <div className="text-sm text-ulthuan-grey mb-1">Winning</div>
                  <div className="text-2xl font-bold text-whiteout">{stats.winningPercentage}%</div>
                  <div className="flex mt-2 space-x-1">
                    {stats.recentPerformance.map((result, index) => (
                      <div 
                        key={index}
                        className={`w-6 h-6 rounded-sm flex items-center justify-center ${
                          result === 'win' 
                            ? 'bg-teal' 
                            : result === 'loss' 
                              ? 'bg-salmon-tint' 
                              : 'bg-ulthuan-grey'
                        }`}
                      >
                        {result === 'win' && <span className="text-xs text-whiteout">W</span>}
                        {result === 'loss' && <span className="text-xs text-whiteout">L</span>}
                        {result === 'draw' && <span className="text-xs text-whiteout">D</span>}
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-ulthuan-grey mt-1">Last 5 Games</div>
                </div>
                
                <div className="bg-dark-slate-gray rounded-lg p-3">
                  <div className="text-sm text-ulthuan-grey mb-1">Career Points</div>
                  <div className="text-2xl font-bold text-whiteout">{stats.careerPoints}</div>
                  <div className="mt-2">
                    <div className="h-1 bg-rich-black rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-teal to-sugar-cookie" 
                        style={{ width: `${Math.min(100, (stats.careerPoints / 300) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-ulthuan-grey mt-1">
                    <span>0</span>
                    <span>300</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-dark-slate-gray rounded-lg p-4">
                <div className="text-sm text-ulthuan-grey mb-2">Rounds Played</div>
                <div className="text-3xl font-bold text-whiteout">{stats.roundsPlayed}</div>
                <div className="mt-4 h-12 flex items-end">
                  {/* Placeholder for a chart - in a real app this would be a proper chart */}
                  <div className="flex-1 h-6 bg-teal rounded-t-sm"></div>
                  <div className="flex-1 h-8 bg-teal rounded-t-sm"></div>
                  <div className="flex-1 h-10 bg-teal rounded-t-sm"></div>
                  <div className="flex-1 h-7 bg-teal rounded-t-sm"></div>
                  <div className="flex-1 h-12 bg-teal rounded-t-sm"></div>
                  <div className="flex-1 h-9 bg-teal rounded-t-sm"></div>
                  <div className="flex-1 h-5 bg-teal rounded-t-sm"></div>
                </div>
                <div className="flex justify-between text-xs text-ulthuan-grey mt-1">
                  <span>Sun</span>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Games Tab */}
          {activeTab === 'games' && (
            <div className="space-y-4">
              {recentGames.map(game => (
                <motion.div 
                  key={game.id}
                  className="bg-dark-slate-gray rounded-lg p-4 border-2 border-coffee-bean"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-whiteout">{game.courseName}</h3>
                      <p className="text-xs text-ulthuan-grey">{game.date}</p>
                    </div>
                    <div className={`text-lg font-bold ${game.relativeToPar <= 0 ? 'text-teal' : 'text-salmon-tint'}`}>
                      {game.relativeToPar <= 0 ? game.relativeToPar : `+${game.relativeToPar}`}
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="flex-1 h-1 bg-rich-black rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${game.relativeToPar <= 0 ? 'bg-teal' : 'bg-salmon-tint'}`}
                        style={{ width: `${Math.min(100, Math.abs(game.relativeToPar) * 5)}%` }}
                      ></div>
                    </div>
                    <div className="ml-2 text-sm text-whiteout font-medium">{game.score}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PlayerProfile;
