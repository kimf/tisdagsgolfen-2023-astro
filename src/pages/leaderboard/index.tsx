import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Leaderboard from '../../components/Leaderboard';
import PlayerProfile from '../../components/PlayerProfile';

// Mock data for demonstration
const MOCK_PLAYERS = [
  {
    id: 1,
    name: 'Hilary Ouse',
    totalScore: 68,
    relativeScore: -6,
    rounds: 12,
    stats: {
      circleHits: 50,
      insidePutts: 75,
      converted: 100,
      ob: 0,
      op: 1
    }
  },
  {
    id: 2,
    name: 'Eric Widget',
    totalScore: 70,
    relativeScore: -4,
    rounds: 10,
    stats: {
      circleHits: 45,
      insidePutts: 60,
      converted: 85,
      ob: 0,
      op: 2
    }
  },
  {
    id: 3,
    name: 'Kim Fransman',
    totalScore: 72,
    relativeScore: 0,
    rounds: 15,
    stats: {
      circleHits: 55,
      insidePutts: 65,
      converted: 90,
      ob: 1,
      op: 0
    }
  },
  {
    id: 4,
    name: 'John Doe',
    totalScore: 75,
    relativeScore: 3,
    rounds: 8,
    stats: {
      circleHits: 40,
      insidePutts: 55,
      converted: 70,
      ob: 2,
      op: 3
    }
  }
];

const MOCK_PLAYER_STATS = {
  averageScore: 68,
  roundsPlayed: 1830,
  careerPoints: 213,
  winningPercentage: 41,
  recentScores: [72, 68, 70, 65, 71],
  recentPerformance: ['win', 'win', 'loss', 'win', 'loss'] as ('win' | 'loss' | 'draw')[]
};

const MOCK_RECENT_GAMES = [
  {
    id: 1,
    date: '17 August 2023',
    courseName: 'Augusta Golf Club',
    score: 68,
    relativeToPar: -4
  },
  {
    id: 2,
    date: '10 August 2023',
    courseName: 'Wierzchowska Golf & Country Club',
    score: 70,
    relativeToPar: -2
  },
  {
    id: 3,
    date: '3 August 2023',
    courseName: 'Golf & Country Club Hamburg-Treudelberg e.V.',
    score: 75,
    relativeToPar: 3
  }
];

export default function LeaderboardPage() {
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const [seasonFilter, setSeasonFilter] = useState<'current' | 'all'>('current');
  
  const selectedPlayer = MOCK_PLAYERS.find(player => player.id === selectedPlayerId);
  
  return (
    <div className="min-h-screen bg-rich-black p-4">
      <header className="mb-8 text-center">
        <motion.h1 
          className="text-3xl font-bold text-salmon-tint mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          TISDAGSGOLFEN
        </motion.h1>
        <motion.div
          className="text-ulthuan-grey text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Season Leaderboard
        </motion.div>
      </header>

      <main className="max-w-3xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div className="flex space-x-2">
            <motion.button
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                seasonFilter === 'current' 
                  ? 'bg-teal text-whiteout' 
                  : 'bg-dark-slate-gray text-ulthuan-grey'
              }`}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSeasonFilter('current')}
            >
              Current Season
            </motion.button>
            <motion.button
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                seasonFilter === 'all' 
                  ? 'bg-teal text-whiteout' 
                  : 'bg-dark-slate-gray text-ulthuan-grey'
              }`}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSeasonFilter('all')}
            >
              All Time
            </motion.button>
          </div>
          
          <motion.button
            className="w-10 h-10 bg-dark-slate-gray rounded-full flex items-center justify-center text-ulthuan-grey"
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </motion.button>
        </div>
        
        <Leaderboard 
          players={MOCK_PLAYERS} 
          onPlayerSelect={(playerId) => setSelectedPlayerId(playerId)} 
        />
      </main>
      
      <AnimatePresence>
        {selectedPlayerId && selectedPlayer && (
          <PlayerProfile
            playerId={selectedPlayer.id}
            playerName={selectedPlayer.name}
            stats={MOCK_PLAYER_STATS}
            recentGames={MOCK_RECENT_GAMES}
            onClose={() => setSelectedPlayerId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
