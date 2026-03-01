import type { ReactElement, ReactNode } from 'react';

type GameBoyFrameProps = {
  readonly children: ReactNode;
  readonly powered: boolean;
  readonly onPowerPress: () => void;
};

export function GameBoyFrame({ children, powered, onPowerPress }: GameBoyFrameProps): ReactElement {
  return (
    <div className="poke-gbc">
      {/* Top branding — colored letters like real GBC */}
      <div className="poke-top-label">
        <span className="poke-brand-g">G</span>
        <span className="poke-brand-a">A</span>
        <span className="poke-brand-m">M</span>
        <span className="poke-brand-e">E</span>
        {' '}
        <span className="poke-brand-b">B</span>
        <span className="poke-brand-o">O</span>
        <span className="poke-brand-y">Y</span>
        <span className="poke-brand-tm">&#8482;</span>
      </div>
      <div className="poke-color-label">COLOR</div>

      {/* Screen bezel */}
      <div className="poke-bezel">
        <div className="poke-power-row">
          <button
            type="button"
            className={`poke-power-led ${powered ? 'poke-power-on' : 'poke-power-off'}`}
            onClick={onPowerPress}
            aria-label="Power button"
          />
          <span className="poke-power-text">POWER</span>
          {!powered && <span className="poke-power-hint">&#9668; Press</span>}
        </div>
        <div className={`poke-screen ${powered ? 'poke-screen-on' : 'poke-screen-off'}`}>
          {children}
          <div className="poke-scanlines" />
        </div>
      </div>

      {/* Controls */}
      <div className="poke-controls">
        {/* D-Pad */}
        <div className="poke-dpad">
          <div className="poke-dpad-v" />
          <div className="poke-dpad-h" />
          <div className="poke-dpad-center" />
        </div>

        {/* A/B Buttons */}
        <div className="poke-ab">
          <div className="poke-btn poke-btn-b">B</div>
          <div className="poke-btn poke-btn-a">A</div>
        </div>
      </div>

      {/* START / SELECT */}
      <div className="poke-meta-row">
        <div className="poke-btn-meta">SELECT</div>
        <div className="poke-btn-meta">START</div>
      </div>

    </div>
  );
}
