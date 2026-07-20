import { memo } from 'react';
import Orb from '../reactbits/Orb/Orb';
import DotField from '../reactbits/DotField/DotField';

/**
 * Layered ambient background.
 * Render order (back to front): gradient → noise → aurora → orb → dotfield → glass overlay.
 * Each layer is pointer-events-none so it never blocks interaction.
 */
function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* 1. Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0e0e1a_0%,#050505_55%,#050505_100%)]" />

      {/* 2. Noise */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E\")",
        }}
      />

      {/* 3. Aurora blobs */}
      <div className="absolute inset-0">
        <div className="absolute left-[-10%] top-[8%] h-[42vw] w-[42vw] rounded-full bg-accent/20 blur-[140px] animate-float-slow" />
        <div
          className="absolute right-[-8%] top-[35%] h-[38vw] w-[38vw] rounded-full bg-accent-cyan/15 blur-[150px] animate-float-slow"
          style={{ animationDelay: '2.5s' }}
        />
        <div
          className="absolute bottom-[5%] left-[30%] h-[30vw] w-[30vw] rounded-full bg-accent-orange/10 blur-[160px] animate-float-slow"
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* 4. Orb */}
      <div className="absolute left-1/2 top-1/2 h-[60vw] w-[60vw] max-h-[760px] max-w-[760px] -translate-x-1/2 -translate-y-1/2 opacity-50 blur-[2px]">
        <Orb color="#6D5DFB" intensity={0.55} hoverIntensity={1.1} />
      </div>

      {/* 5. DotField */}
      <div className="absolute inset-0 opacity-30">
        <DotField color="#ffffff" density={38} radius={150} />
      </div>

      {/* 6. Glass overlay + vignette */}
      <div className="absolute inset-0 bg-white/[0.015] backdrop-blur-[1px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,5,5,0.6)_100%)]" />
    </div>
  );
}

export default memo(Background);
