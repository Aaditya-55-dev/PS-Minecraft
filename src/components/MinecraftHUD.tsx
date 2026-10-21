import React from 'react';

export const MinecraftHUD: React.FC = () => {
  return (
    <header className="w-full max-w-5xl mx-auto pt-2 pb-2 px-4 flex flex-col items-center select-none z-20">
      <div className="flex flex-col items-center text-center mb-2">
        <span className="font-['Press_Start_2P',monospace] text-[9px] sm:text-[10px] text-[#fcd34d] tracking-wider block drop-shadow-[1px_1px_0px_#000]">
          SWAG GOOGLE DEVELOPER GROUPS
        </span>
        <span className="font-['Pixelify_Sans',sans-serif] text-xs sm:text-sm text-[#e2e8f0] font-medium drop-shadow-[1px_1px_0px_#000]">
          Hackfusion 4.0 · Challenge Arena
        </span>
      </div>

      <div className="flex flex-col items-center my-2 text-center">
        <div className="inline-block bg-[#1a1007]/90 border-t-2 border-l-2 border-[#73441a] border-b-3 border-r-3 border-[#120a03] shadow-[inset_1px_1px_0px_rgba(255,255,255,0.2),_inset_-2px_-2px_0px_rgba(0,0,0,0.7),0_4px_8px_rgba(0,0,0,0.5)] px-4 py-1.5 mb-2.5">
          <span className="font-['Press_Start_2P',monospace] text-[10px] sm:text-xs text-[#ffd700] tracking-widest drop-shadow-[1px_2px_0px_#000]">
            ⚡ EXPEDITION: 3 ANCIENT BLUEPRINTS ⚡
          </span>
        </div>

        <h1 className="font-['Press_Start_2P',monospace] text-2xl sm:text-3xl md:text-4xl text-[#fff8db] tracking-wider drop-shadow-[3px_4px_0px_#2b1604] mb-2 leading-tight">
          HACKFUSION 4.0
        </h1>
        <p className="font-['Pixelify_Sans',sans-serif] text-base sm:text-lg text-[#fed7aa] max-w-xl drop-shadow-[1px_2px_0px_#000] font-medium">
          Select your expedition. Forge your solution. Claim eternal glory in the Overworld and beyond.
        </p>
      </div>

      <div className="w-full max-w-md hidden sm:flex flex-col items-center gap-1 mt-1 mb-3 opacity-95">
        <div className="w-full flex items-center justify-between text-[10px] font-['Press_Start_2P',monospace]">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="text-[#ef4444] text-xs drop-shadow-[1px_1px_0px_#000]">♥</span>
            ))}
          </div>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="text-[#f59e0b] text-xs drop-shadow-[1px_1px_0px_#000]">🍖</span>
            ))}
          </div>
        </div>

        <div className="w-full relative h-3 bg-[#121212] border-2 border-[#383838] shadow-[inset_1px_1px_0px_#050505] flex items-center">
          <div className="h-full bg-gradient-to-r from-[#16a34a] via-[#22c55e] to-[#86efac] w-[88%] shadow-[inset_0_1px_0px_rgba(255,255,255,0.4)]" />
          <span className="absolute left-1/2 -top-4 -translate-x-1/2 font-['Press_Start_2P',monospace] text-[10px] text-[#4ade80] drop-shadow-[1px_2px_0px_#000]">
            40
          </span>
        </div>
      </div>
    </header>
  );
};
