import React from 'react';

/**
 * MinecraftAnimals — Pure React + Tailwind + inline SVG
 * High-quality Minecraft pixel-art animals as detailed SVG components
 * with CSS keyframe animations for lifelike swimming.
 * 
 * No Canvas, no Three.js, no external dependencies.
 * Just React JSX SVGs + CSS animations.
 */


// ── MINECRAFT SEA TURTLE SVG ─────────────────────────────────────────────────
function TurtleSVG({ size = 140 }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 100 70" style={{ imageRendering: 'pixelated' }}>
      {/* Shell - hexagonal blocky shape */}
      <rect x="25" y="12" width="50" height="40" fill="#2e7d32" rx="2" />
      <rect x="28" y="14" width="44" height="36" fill="#4caf50" />
      {/* Shell pattern - cross hatching */}
      <rect x="35" y="18" width="30" height="4" fill="#66bb6a" />
      <rect x="32" y="24" width="36" height="4" fill="#81c784" />
      <rect x="35" y="30" width="30" height="4" fill="#a5d6a7" />
      <rect x="32" y="36" width="36" height="4" fill="#81c784" />
      <rect x="35" y="42" width="30" height="4" fill="#66bb6a" />
      {/* Shell dome highlight */}
      <rect x="38" y="22" width="8" height="8" fill="#a5d6a7" opacity="0.6" />
      <rect x="50" y="28" width="10" height="6" fill="#c8e6c9" opacity="0.4" />
      {/* Shell border top */}
      <rect x="30" y="12" width="40" height="3" fill="#1b5e20" />
      <rect x="30" y="49" width="40" height="3" fill="#1b5e20" />

      {/* Head */}
      <rect x="75" y="22" width="16" height="14" fill="#4caf50" rx="1" />
      <rect x="77" y="24" width="12" height="10" fill="#66bb6a" />
      {/* Eye */}
      <rect x="84" y="26" width="4" height="4" fill="#1a1a1a" />
      <rect x="85" y="27" width="2" height="2" fill="#ffffff" />
      {/* Nose */}
      <rect x="89" y="30" width="2" height="2" fill="#2e7d32" />

      {/* Front flippers */}
      <g style={{ animation: 'mc-flipper 1.4s ease-in-out infinite', transformOrigin: '55px 15px' }}>
        <rect x="55" y="5" width="18" height="7" fill="#2e7d32" rx="1" />
        <rect x="57" y="7" width="14" height="3" fill="#388e3c" />
      </g>
      <g style={{ animation: 'mc-flipper 1.4s ease-in-out infinite reverse', transformOrigin: '55px 55px' }}>
        <rect x="55" y="52" width="18" height="7" fill="#2e7d32" rx="1" />
        <rect x="57" y="54" width="14" height="3" fill="#388e3c" />
      </g>

      {/* Rear flippers */}
      <g style={{ animation: 'mc-flipper 1.4s ease-in-out 0.4s infinite reverse', transformOrigin: '25px 15px' }}>
        <rect x="12" y="8" width="13" height="6" fill="#2e7d32" rx="1" />
        <rect x="14" y="9" width="9" height="4" fill="#388e3c" />
      </g>
      <g style={{ animation: 'mc-flipper 1.4s ease-in-out 0.4s infinite', transformOrigin: '25px 55px' }}>
        <rect x="12" y="50" width="13" height="6" fill="#2e7d32" rx="1" />
        <rect x="14" y="51" width="9" height="4" fill="#388e3c" />
      </g>

      {/* Tail */}
      <rect x="18" y="28" width="7" height="8" fill="#388e3c" />
      <rect x="14" y="30" width="4" height="4" fill="#2e7d32" />

      {/* Belly accent */}
      <rect x="40" y="49" width="20" height="3" fill="#c8b87a" opacity="0.6" />
    </svg>
  );
}

// ── MINECRAFT TETRA FISH SVG ─────────────────────────────────────────────────
function FishSVG({ size = 60, bodyColor = '#00bcd4', finColor = '#006064', tailColor = '#0097a7' }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 50 30" style={{ imageRendering: 'pixelated' }}>
      {/* Body */}
      <rect x="12" y="6" width="24" height="16" fill={bodyColor} rx="1" />
      <rect x="14" y="8" width="20" height="12" fill={bodyColor} />
      {/* Body highlight */}
      <rect x="16" y="8" width="12" height="4" fill="#ffffff" opacity="0.15" />
      {/* Belly */}
      <rect x="14" y="18" width="20" height="4" fill={bodyColor} opacity="0.7" />
      
      {/* Eye */}
      <rect x="30" y="10" width="5" height="5" fill="#ffffff" />
      <rect x="32" y="11" width="3" height="3" fill="#111111" />
      <rect x="33" y="12" width="1" height="1" fill="#ffffff" />

      {/* Mouth */}
      <rect x="36" y="15" width="3" height="2" fill={finColor} />

      {/* Dorsal fin (top) */}
      <rect x="18" y="2" width="10" height="5" fill={finColor} />
      <rect x="20" y="0" width="6" height="3" fill={finColor} />
      
      {/* Ventral fin (bottom) */}
      <rect x="22" y="22" width="6" height="4" fill={finColor} />
      <rect x="24" y="25" width="3" height="2" fill={finColor} />

      {/* Pectoral fin (side) */}
      <rect x="26" y="18" width="8" height="3" fill={finColor} opacity="0.7" />

      {/* Tail */}
      <g style={{ animation: 'mc-tail-wag 0.35s ease-in-out infinite alternate', transformOrigin: '12px 14px' }}>
        <rect x="2" y="4" width="10" height="8" fill={tailColor} />
        <rect x="0" y="2" width="6" height="5" fill={tailColor} />
        <rect x="2" y="16" width="10" height="8" fill={tailColor} />
        <rect x="0" y="21" width="6" height="5" fill={tailColor} />
        <rect x="6" y="10" width="6" height="8" fill={tailColor} />
      </g>
    </svg>
  );
}

// ── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function MinecraftAnimals3D() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {/* CSS Keyframes for all animal animations */}
      <style>{`

        @keyframes mc-turtle-swim {
          0%   { transform: translateX(-15vw) translateY(0vh) scaleX(1); }
          22%  { transform: translateX(15vw) translateY(-4vh) scaleX(1); }
          45%  { transform: translateX(42vw) translateY(2vh) scaleX(1); }
          50%  { transform: translateX(48vw) translateY(0vh) scaleX(-1); }
          72%  { transform: translateX(20vw) translateY(-3vh) scaleX(-1); }
          95%  { transform: translateX(-12vw) translateY(1vh) scaleX(-1); }
          100% { transform: translateX(-15vw) translateY(0vh) scaleX(1); }
        }

        @keyframes mc-flipper {
          0%   { transform: rotate(-18deg); }
          50%  { transform: rotate(18deg); }
          100% { transform: rotate(-18deg); }
        }

        @keyframes mc-fish1-swim {
          0%   { transform: translateX(-8vw) translateY(0vh) scaleX(1); }
          18%  { transform: translateX(22vw) translateY(-4vh) scaleX(1); }
          38%  { transform: translateX(55vw) translateY(2vh) scaleX(1); }
          48%  { transform: translateX(75vw) translateY(-1vh) scaleX(1); }
          52%  { transform: translateX(80vw) translateY(0vh) scaleX(-1); }
          72%  { transform: translateX(40vw) translateY(3vh) scaleX(-1); }
          88%  { transform: translateX(10vw) translateY(-2vh) scaleX(-1); }
          95%  { transform: translateX(-5vw) translateY(0vh) scaleX(-1); }
          100% { transform: translateX(-8vw) translateY(0vh) scaleX(1); }
        }

        @keyframes mc-fish2-swim {
          0%   { transform: translateX(90vw) translateY(0vh) scaleX(-1); }
          20%  { transform: translateX(55vw) translateY(3vh) scaleX(-1); }
          40%  { transform: translateX(20vw) translateY(-2vh) scaleX(-1); }
          50%  { transform: translateX(5vw) translateY(0vh) scaleX(1); }
          70%  { transform: translateX(35vw) translateY(-4vh) scaleX(1); }
          90%  { transform: translateX(75vw) translateY(2vh) scaleX(1); }
          100% { transform: translateX(90vw) translateY(0vh) scaleX(-1); }
        }

        @keyframes mc-fish3-swim {
          0%   { transform: translateX(10vw) translateY(0vh) scaleX(1); }
          15%  { transform: translateX(30vw) translateY(-3vh) scaleX(1); }
          35%  { transform: translateX(65vw) translateY(4vh) scaleX(1); }
          50%  { transform: translateX(85vw) translateY(1vh) scaleX(-1); }
          65%  { transform: translateX(60vw) translateY(-3vh) scaleX(-1); }
          85%  { transform: translateX(25vw) translateY(2vh) scaleX(-1); }
          100% { transform: translateX(10vw) translateY(0vh) scaleX(1); }
        }

        @keyframes mc-tail-wag {
          0%   { transform: rotate(-6deg) translateX(-1px); }
          100% { transform: rotate(6deg) translateX(1px); }
        }

        @keyframes mc-bob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}</style>


      {/* ── SEA TURTLE ── */}
      <div
        className="absolute"
        style={{
          top: '12%',
          animation: 'mc-turtle-swim 26s ease-in-out infinite',
          willChange: 'transform',
          filter: 'drop-shadow(0 0 10px rgba(46,125,50,0.35))',
        }}
      >
        <div style={{ animation: 'mc-bob 3s ease-in-out infinite' }}>
          <TurtleSVG size={120} />
        </div>
      </div>

      {/* ── SCHOOL OF 3 TETRA FISH ── */}
      {/* Fish 1 - Cyan (leader, largest) */}
      <div
        className="absolute"
        style={{
          top: '62%',
          animation: 'mc-fish1-swim 15s ease-in-out infinite',
          willChange: 'transform',
          filter: 'drop-shadow(0 0 5px rgba(0,188,212,0.3))',
        }}
      >
        <FishSVG size={55} bodyColor="#00bcd4" finColor="#006064" tailColor="#0097a7" />
      </div>

      {/* Fish 2 - Orange */}
      <div
        className="absolute"
        style={{
          top: '70%',
          animation: 'mc-fish2-swim 17s ease-in-out -4s infinite',
          willChange: 'transform',
          filter: 'drop-shadow(0 0 5px rgba(255,112,67,0.3))',
        }}
      >
        <FishSVG size={45} bodyColor="#ff7043" finColor="#bf360c" tailColor="#e64a19" />
      </div>

      {/* Fish 3 - Purple */}
      <div
        className="absolute"
        style={{
          top: '76%',
          animation: 'mc-fish3-swim 14s ease-in-out -7s infinite',
          willChange: 'transform',
          filter: 'drop-shadow(0 0 5px rgba(171,71,188,0.3))',
        }}
      >
        <FishSVG size={42} bodyColor="#ab47bc" finColor="#6a1b9a" tailColor="#8e24aa" />
      </div>
    </div>
  );
}
