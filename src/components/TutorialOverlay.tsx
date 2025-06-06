export const TutorialOverlay = ({
  step,
  onNext,
  onSkip,
}: {
  step: { selector: string; content: string };
  onNext: () => void;
  onSkip: () => void;
}) => {
  const target = document.querySelector(step.selector);
  const rect = target?.getBoundingClientRect();

  if (!target || !rect) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div
        className="absolute bg-black bg-opacity-70 rounded-lg p-4 w-72 pointer-events-auto"
        style={{
          top: rect.top + window.scrollY - 10,
          left: rect.left + rect.width + 20,
        }}
      >
        <p className="text-white text-sm mb-3">{step.content}</p>
        <div className="flex justify-between gap-2">
          <button
            onClick={onSkip}
            className="text-sm text-gray-300 hover:underline"
          >
            Skip
          </button>
          <button
            onClick={onNext}
            className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
