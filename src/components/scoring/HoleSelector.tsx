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
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <div>
          <h2>Select Hole</h2>
          <button onClick={onClose}>
            <svg
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

        <div>
          {holes.map((holeNumber) => {
            const holeIndex = holeNumber - 1;
            const isSelected = holeIndex === currentHole;
            const isCompleted = holeIndex < currentHole;

            return (
              <button key={holeNumber} onClick={() => onHoleSelect(holeIndex)}>
                {holeNumber}
                {isCompleted && !isSelected && (
                  <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        <button onClick={onClose}>Finish Game</button>
      </div>
    </div>
  );
};

export default HoleSelector;
