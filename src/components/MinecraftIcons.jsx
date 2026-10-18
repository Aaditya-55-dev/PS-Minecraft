import React from 'react';

// Pixel-perfect Minecraft SVG icons tailored for HackFusion 4

export const GrassBlockIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Dirt base */}
    <rect x="0" y="5" width="16" height="11" fill="#866043" />
    <rect x="2" y="7" width="2" height="2" fill="#573d26" />
    <rect x="8" y="10" width="3" height="2" fill="#573d26" />
    <rect x="12" y="6" width="2" height="2" fill="#573d26" />
    <rect x="5" y="12" width="2" height="2" fill="#573d26" />
    <rect x="1" y="13" width="2" height="2" fill="#a07452" />
    <rect x="10" y="13" width="2" height="2" fill="#a07452" />
    {/* Grass Top */}
    <rect x="0" y="0" width="16" height="5" fill="#5c8e32" />
    <rect x="0" y="0" width="16" height="2" fill="#7ebd3b" />
    <rect x="1" y="5" width="2" height="3" fill="#5c8e32" />
    <rect x="5" y="5" width="2" height="4" fill="#5c8e32" />
    <rect x="9" y="5" width="2" height="2" fill="#5c8e32" />
    <rect x="13" y="5" width="2" height="3" fill="#5c8e32" />
    <rect x="1" y="7" width="2" height="1" fill="#4d7729" />
    <rect x="5" y="8" width="2" height="1" fill="#4d7729" />
    <rect x="13" y="7" width="2" height="1" fill="#4d7729" />
  </svg>
);

export const DiamondIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    <polygon points="5,1 11,1 15,6 8,15 1,6" fill="#4aecd4" />
    <polygon points="6,2 10,2 13,5 8,13 3,5" fill="#a8fff3" opacity="0.8" />
    <polygon points="8,1 11,1 15,6 8,15" fill="#2ebfa9" opacity="0.5" />
    <polygon points="7,2 9,2 11,5 8,11" fill="#ffffff" opacity="0.9" />
    {/* Outline */}
    <path d="M5,1 H11 L15,6 L8,15 L1,6 Z" fill="none" stroke="#125950" strokeWidth="1" />
  </svg>
);

export const EmeraldIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    <polygon points="4,2 12,2 15,8 12,14 4,14 1,8" fill="#17dd62" />
    <polygon points="5,3 11,3 13,8 11,13 5,13 3,8" fill="#5eff9b" opacity="0.85" />
    <polygon points="8,3 11,3 13,8 11,13 8,13" fill="#0ea245" opacity="0.6" />
    <polygon points="6,4 8,4 9,8 7,11" fill="#ffffff" opacity="0.9" />
    <path d="M4,2 H12 L15,8 L12,14 H4 L1,8 Z" fill="none" stroke="#06481d" strokeWidth="1" />
  </svg>
);

export const GoldenAppleIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Stem */}
    <rect x="7" y="1" width="2" height="3" fill="#694e24" />
    <rect x="9" y="1" width="2" height="1" fill="#4d7729" />
    {/* Apple Body */}
    <rect x="4" y="3" width="8" height="10" fill="#fbb610" rx="2" />
    <rect x="2" y="5" width="12" height="7" fill="#fbb610" />
    <rect x="4" y="4" width="3" height="4" fill="#fff59d" />
    <rect x="9" y="9" width="3" height="3" fill="#c48a04" />
    <rect x="4" y="12" width="8" height="2" fill="#c48a04" />
  </svg>
);

export const NetheriteIngotIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    <polygon points="3,6 10,2 15,5 8,9" fill="#4d494d" />
    <polygon points="3,6 8,9 8,14 3,11" fill="#312c31" />
    <polygon points="8,9 15,5 15,10 8,14" fill="#201b20" />
    <polygon points="5,5 9,3 12,5 8,7" fill="#656065" />
    <path d="M3,6 L10,2 L15,5 L15,10 L8,14 L3,11 Z" fill="none" stroke="#120f12" strokeWidth="1" />
  </svg>
);

export const ClockIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    <circle cx="8" cy="8" r="7" fill="#f0be36" stroke="#5d3512" strokeWidth="1" />
    <circle cx="8" cy="8" r="5" fill="#3b5998" />
    {/* Sun & Moon */}
    <rect x="5" y="4" width="3" height="3" fill="#ffe600" />
    <rect x="9" y="8" width="2" height="2" fill="#ffffff" />
    {/* Frame rim */}
    <circle cx="8" cy="8" r="6" fill="none" stroke="#a37617" strokeWidth="1" />
  </svg>
);

export const TotemIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Head */}
    <rect x="5" y="1" width="6" height="5" fill="#f8b820" />
    <rect x="6" y="2" width="4" height="2" fill="#52df70" />
    <rect x="5" y="4" width="6" height="1" fill="#b97c00" />
    {/* Wings */}
    <rect x="2" y="5" width="12" height="3" fill="#e2a114" />
    <rect x="1" y="6" width="14" height="2" fill="#f8b820" />
    {/* Body */}
    <rect x="6" y="8" width="4" height="6" fill="#f8b820" />
    <rect x="7" y="9" width="2" height="3" fill="#52df70" />
    <rect x="5" y="13" width="6" height="2" fill="#b97c00" />
  </svg>
);

export const ScrollMapIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    <rect x="3" y="2" width="10" height="12" fill="#e8cf99" stroke="#775628" strokeWidth="1" />
    <rect x="4" y="3" width="8" height="1" fill="#fff5d4" />
    <line x1="5" y1="5" x2="11" y2="5" stroke="#9e7b47" strokeWidth="1" strokeDasharray="1 1" />
    <line x1="5" y1="7" x2="11" y2="7" stroke="#9e7b47" strokeWidth="1" strokeDasharray="1 1" />
    <line x1="5" y1="9" x2="9" y2="9" stroke="#9e7b47" strokeWidth="1" strokeDasharray="1 1" />
    {/* Red seal */}
    <circle cx="10" cy="11" r="1.5" fill="#b71c1c" />
  </svg>
);

export const BedIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Blanket */}
    <rect x="1" y="6" width="10" height="5" fill="#b71c1c" />
    <rect x="1" y="6" width="10" height="1" fill="#e53935" />
    {/* Pillow */}
    <rect x="11" y="6" width="4" height="4" fill="#f5f5f5" />
    {/* Wood Frame */}
    <rect x="1" y="11" width="14" height="2" fill="#5d3512" />
    {/* Legs */}
    <rect x="1" y="13" width="2" height="2" fill="#3b2007" />
    <rect x="13" y="13" width="2" height="2" fill="#3b2007" />
  </svg>
);

export const EnchantTableIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Base Obsidian */}
    <rect x="2" y="8" width="12" height="7" fill="#1b122c" />
    <rect x="3" y="9" width="2" height="2" fill="#38255b" />
    <rect x="10" y="11" width="2" height="2" fill="#38255b" />
    {/* Red Cloth */}
    <rect x="1" y="6" width="14" height="2" fill="#b71c1c" />
    {/* Floating Book */}
    <polygon points="5,4 8,3 11,4 8,5" fill="#8e24aa" />
    <line x1="8" y1="3" x2="8" y2="5" stroke="#f5f5f5" strokeWidth="1" />
  </svg>
);

export const BeaconIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Glass Cube */}
    <rect x="3" y="3" width="10" height="10" fill="#a7f3d0" fillOpacity="0.4" stroke="#e0f2fe" strokeWidth="1" />
    {/* Obsidian Base */}
    <rect x="2" y="13" width="12" height="2" fill="#1e152d" />
    {/* Nether Star Core */}
    <polygon points="8,5 10,8 8,11 6,8" fill="#5eead4" />
    <circle cx="8" cy="8" r="1.5" fill="#ffffff" />
  </svg>
);

export const EnderChestIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    <rect x="2" y="3" width="12" height="11" fill="#0f2b2b" stroke="#091b1b" strokeWidth="1" />
    <rect x="3" y="4" width="10" height="2" fill="#1f4b4b" />
    {/* Latch */}
    <rect x="7" y="7" width="2" height="3" fill="#4ff0d0" />
    {/* Eye of ender slit */}
    <circle cx="8" cy="8.5" r="0.8" fill="#ff7043" />
  </svg>
);

export const ElytraIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    <path d="M7,2 Q4,6 3,14 Q6,12 8,8 Z" fill="#44424e" stroke="#2a2930" strokeWidth="1" />
    <path d="M9,2 Q12,6 13,14 Q10,12 8,8 Z" fill="#52505e" stroke="#2a2930" strokeWidth="1" />
    <line x1="8" y1="2" x2="8" y2="8" stroke="#1f1e24" strokeWidth="1" />
  </svg>
);

export const PickaxeIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Handle */}
    <line x1="3" y1="13" x2="11" y2="5" stroke="#5d3512" strokeWidth="2" strokeLinecap="square" />
    {/* Diamond Head */}
    <path d="M7,3 Q11,2 14,4 L13,7 Q10,5 9,6 Z" fill="#4deeea" stroke="#1b8a87" strokeWidth="1" />
  </svg>
);

export const TeamHeadIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 16" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Left Player (Alex) */}
    <rect x="0" y="4" width="7" height="7" fill="#d99368" />
    <rect x="0" y="4" width="7" height="3" fill="#b05c28" />
    <rect x="1" y="7" width="1.5" height="1.5" fill="#439e4e" />
    <rect x="4.5" y="7" width="1.5" height="1.5" fill="#439e4e" />
    
    {/* Center Player (Steve - Front) */}
    <rect x="8" y="1" width="8" height="8" fill="#bc7a52" />
    <rect x="8" y="1" width="8" height="3" fill="#472f1e" />
    <rect x="9.5" y="5" width="2" height="1.5" fill="#2d42ad" />
    <rect x="12.5" y="5" width="2" height="1.5" fill="#2d42ad" />
    <rect x="10" y="7" width="4" height="1" fill="#72462e" />
    {/* Body */}
    <rect x="8" y="9" width="8" height="6" fill="#00a8a8" />
    <rect x="10" y="9" width="4" height="2" fill="#bc7a52" />
    
    {/* Right Player */}
    <rect x="17" y="4" width="7" height="7" fill="#c98358" />
    <rect x="17" y="4" width="7" height="3" fill="#222222" />
    <rect x="18" y="7" width="1.5" height="1.5" fill="#9357d3" />
    <rect x="21.5" y="7" width="1.5" height="1.5" fill="#9357d3" />
  </svg>
);

export const CompassIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Compass outer casing (iron rim) */}
    <rect x="4" y="1" width="8" height="14" fill="#383838" />
    <rect x="1" y="4" width="14" height="8" fill="#383838" />
    <rect x="3" y="2" width="10" height="12" fill="#585858" />
    <rect x="2" y="3" width="12" height="10" fill="#585858" />
    {/* Inner dial */}
    <rect x="3" y="3" width="10" height="10" fill="#1b1b1b" />
    <rect x="4" y="4" width="8" height="8" fill="#0d1117" />
    {/* Needle (Red North, Cyan/White South) */}
    <polygon points="8,4 6,8 8,7 10,8" fill="#ff3333" />
    <polygon points="8,12 6,8 8,9 10,8" fill="#d0d0d0" />
    <rect x="7" y="7" width="2" height="2" fill="#ffffff" />
    {/* Glass reflection */}
    <rect x="4" y="4" width="2" height="1" fill="#ffffff" opacity="0.6" />
    <rect x="4" y="5" width="1" height="2" fill="#ffffff" opacity="0.6" />
  </svg>
);

export const BookAndQuillIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Book cover (brown leather) */}
    <rect x="2" y="3" width="10" height="11" fill="#693816" stroke="#3b1f0c" strokeWidth="1" />
    {/* Pages (creamy parchment) */}
    <rect x="4" y="4" width="7" height="9" fill="#f4ebd0" />
    <line x1="5" y1="6" x2="9" y2="6" stroke="#9e8557" strokeWidth="1" strokeDasharray="1 1" />
    <line x1="5" y1="8" x2="9" y2="8" stroke="#9e8557" strokeWidth="1" strokeDasharray="1 1" />
    <line x1="5" y1="10" x2="8" y2="10" stroke="#9e8557" strokeWidth="1" strokeDasharray="1 1" />
    {/* Quill Feather */}
    <path d="M14,1 C13,3 10,6 9,10 L8,11 L10,10 C12,7 14,3 14,1 Z" fill="#ffffff" stroke="#c0c0c0" strokeWidth="0.5" />
    <polygon points="12,2 14,1 13,4 11,5" fill="#e0e0e0" />
    {/* Ink tip */}
    <polygon points="8,11 7,13 9,11" fill="#1b122c" />
  </svg>
);

