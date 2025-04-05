import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Player {
  id: number;
  name: string;
  totalScore: number;
  relativeScore: number;
  rounds: number;
  stats: {
    circleHits: number;
    insidePutts: number;
    converted: number;
    ob: number;
    op: number;
  };
}

interface LeaderboardProps {
  players: Player[];
  onPlayerSelect?: (playerId: number) => void;
}

export const Leaderboard = ({ players, onPlayerSelect }: LeaderboardProps) => {
  const [expandedPlayerId, setExpandedPlayerId] = useState<number | null>(null);
  
  const togglePlayerExpand = (playerId: number) => {
    setExpandedPlayerId(expandedPlayerId === playerId ? null : playerId);
  };
  
  const sortedPlayers = [...players].sort((a, b) => a.relativeScore - b.relativeScore);
  
  return (
    <div className="bg-charcoal-gray rounded-xl p-4 shadow-retro-lg">
      <h2 className="text-2xl font-bold text-salmon-tint mb-6 text-center uppercase tracking-wider">Leaderboard</h2>
      
      <div className="space-y-4">
        {sortedPlayers.map((player, index) => (
          <div key={player.id} className="relative">
            <motion.div 
              className={`bg-dark-slate-gray rounded-lg border-2 ${
                expandedPlayerId === player.id ? 'border-teal' : 'border-coffee-bean'
              } overflow-hidden cursor-pointer`}
              onClick={() => togglePlayerExpand(player.id)}
              layoutId={`player-card-${player.id}`}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Player summary row - always visible */}
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-rich-black rounded-full text-whiteout text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-whiteout">{player.name}</h3>
                    <p className="text-xs text-ulthuan-grey">{player.rounds} rounds</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className={`text-xl font-bold ${player.relativeScore <= 0 ? 'text-success' : 'text-salmon-tint'}`}>
                    {player.relativeScore <= 0 ? player.relativeScore : `+${player.relativeScore}`}
                  </div>
                  <motion.div
                    animate={{ rotate: expandedPlayerId === player.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-5 h-5 text-ulthuan-grey" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </div>
              </div>
              
              {/* Expanded details */}
              <AnimatePresence>
                {expandedPlayerId === player.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4"
                  >
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-rich-black rounded p-3">
                        <p className="text-xs text-ulthuan-grey mb-1">Circle Hits</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sugar-cookie font-bold">{player.stats.circleHits}%</span>
                          <div className="w-24 h-2 bg-outer-space rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-amber-500 to-amber-400" 
                              style={{ width: `${player.stats.circleHits}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-rich-black rounded p-3">
                        <p className="text-xs text-ulthuan-grey mb-1">Inside Putts</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sugar-cookie font-bold">{player.stats.insidePutts}%</span>
                          <div className="w-24 h-2 bg-outer-space rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-amber-500 to-amber-400" 
                              style={{ width: `${player.stats.insidePutts}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-rich-black rounded p-3">
                        <p className="text-xs text-ulthuan-grey mb-1">Converted</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sugar-cookie font-bold">{player.stats.converted}%</span>
                          <div className="w-24 h-2 bg-outer-space rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-fuchsia-600 to-fuchsia-400" 
                              style={{ width: `${player.stats.converted}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-rich-black rounded p-3">
                        <p className="text-xs text-ulthuan-grey mb-1">Penalties</p>
                        <div className="flex items-center justify-between space-x-4">
                          <div>
                            <span className="text-xs text-ulthuan-grey">OB</span>
                            <div className="text-salmon-tint font-bold">{player.stats.ob}</div>
                          </div>
                          <div>
                            <span className="text-xs text-ulthuan-grey">OP</span>
                            <div className="text-salmon-tint font-bold">{player.stats.op}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <motion.button
                      className="w-full py-2 bg-teal text-whiteout rounded-md font-medium shadow-retro"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayerSelect && onPlayerSelect(player.id);
                      }}
                    >
                      View Profile
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
