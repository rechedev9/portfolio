import { useState } from 'react';
import type { ReactElement } from 'react';

const BLUE_PILL_RESET_MS = 2500;

type PillChoiceProps = {
  readonly onEnter: () => void;
};

export function PillChoice({ onEnter }: PillChoiceProps): ReactElement {
  const [blueChosen, setBlueChosen] = useState(false);

  const handleBluePill = (): void => {
    setBlueChosen(true);
    setTimeout(() => setBlueChosen(false), BLUE_PILL_RESET_MS);
  };

  if (blueChosen) {
    return (
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 font-mono animate-fade-in">
        <p className="text-terminal-green text-lg mb-2">You chose ignorance.</p>
        <p className="text-terminal-dim text-sm">The story ends. Waking up...</p>
      </div>
    );
  }

  return (
    <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 font-mono">
      {/* Morpheus quote */}
      <blockquote className="text-center max-w-md mb-12 sm:mb-16 animate-fade-in">
        <p className="text-terminal-dim text-sm sm:text-base leading-relaxed mb-2">
          &quot;You take the <span className="text-blue-400">blue pill</span>… the story ends.
        </p>
        <p className="text-terminal-dim text-sm sm:text-base leading-relaxed mb-6">
          You take the <span className="text-red-500">red pill</span>… you stay in Wonderland,
          and I show you how deep the rabbit hole goes.&quot;
        </p>
        <footer className="text-terminal-muted text-xs">— Morpheus</footer>
      </blockquote>

      {/* Pills */}
      <div className="flex items-center gap-16 sm:gap-24">
        {/* Blue pill */}
        <button
          type="button"
          onClick={handleBluePill}
          className="group flex flex-col items-center gap-4"
        >
          <div className="pill pill-blue w-20 h-10 sm:w-28 sm:h-12" />
          <span className="text-blue-400/50 text-xs group-hover:text-blue-400 transition-colors duration-300">
            Wake up
          </span>
        </button>

        {/* Red pill */}
        <button
          type="button"
          onClick={onEnter}
          className="group flex flex-col items-center gap-4"
        >
          <div className="pill pill-red w-20 h-10 sm:w-28 sm:h-12" />
          <span className="text-red-400/50 text-xs group-hover:text-red-400 transition-colors duration-300">
            Enter
          </span>
        </button>
      </div>
    </div>
  );
}
