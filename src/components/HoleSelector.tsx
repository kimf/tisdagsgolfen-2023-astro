import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HoleSelectorProps {
  totalHoles: number;
  currentHole: number;
  onHoleSelect: (holeIndex: number) => void;
  onClose: () => void;
}

export const HoleSelector = ({
  totalHoles,
  currentHole,
  onHoleSelect,
  onClose
}: HoleSelectorProps) => {
  // Generate array of hole numbers (1-based for display)
  const holes = Array.from({ length: totalHoles }, (_, i) => i + 1);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-md p-6 mx-4 bg-whiteout rounded-xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-charcoal-gray">Select Hole</h2>
          <button onClick={onClose} className="p-1 text-charcoal-gray">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-6">
          {holes.map((holeNumber) => {
            const holeIndex = holeNumber - 1;
            const isSelected = holeIndex === currentHole;
            const isCompleted = holeIndex < currentHole;

            return (
              <motion.button
                key={holeNumber}
                className={`
                  w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold
                  ${
                    isSelected
                      ? 'bg-teal text-whiteout border-2 border-dark-side'
                      : isCompleted
                        ? 'bg-ulthuan-grey text-dark-side border border-teal'
                        : 'border border-dashed border-gray-300 text-gray-400'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onHoleSelect(holeIndex)}
              >
                {holeNumber}
                {isCompleted && !isSelected && (
                  <svg
                    className="absolute w-3 h-3 top-1 right-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </motion.button>
            );
          })}
        </div>

        <motion.button
          className="w-full py-3 font-bold rounded-lg bg-teal text-whiteout shadow-retro"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
        >
          Finish Game
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default HoleSelector;
