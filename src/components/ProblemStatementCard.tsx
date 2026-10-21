import React from 'react';
import { ProblemStatement } from '../types.ts';
import { MinecraftButton } from './MinecraftButton.tsx';
import { ChainLink } from './ChainLink.tsx';

interface ProblemStatementCardProps {
  problem: ProblemStatement;
  onOpenDetails: (problem: ProblemStatement) => void;
  showChains?: boolean;
}

export const ProblemStatementCard: React.FC<ProblemStatementCardProps> = ({
  problem,
  onOpenDetails,
  showChains = true
}) => {
  const getPanelStyles = () => {
    switch (problem.material) {
      case 'stone':
        return {
          outer: 'bg-[#505458] border-t-[6px] border-l-[6px] border-[#8a9198] border-b-[8px] border-r-[8px] border-[#1b1d1e] shadow-[inset_-4px_-4px_0px_rgba(0,0,0,0.6),_inset_4px_4px_0px_rgba(255,255,255,0.3),0_20px_40px_rgba(0,0,0,0.85)]',
          inner: 'bg-[#3b3e42] border-4 border-[#1f2123] shadow-[inset_0_4px_16px_rgba(0,0,0,0.7)]',
          plankLines: 'bg-[repeating-linear-gradient(0deg,#3e4246,#3e4246_32px,#242628_32px,#242628_36px)]',
          titleColor: 'text-[#f1f5f9]',
          badgeBg: 'bg-[#1e2022] border-2 border-[#696f75] text-[#86efac] shadow-[inset_1px_1px_0px_rgba(255,255,255,0.2)]',
          bracketColor: 'bg-[#18191a] border-[#5e6368]',
          ringBg: 'bg-[#292b2e] border-[#666a70]'
        };
      case 'deepslate':
        return {
          outer: 'bg-[#2c2838] border-t-[6px] border-l-[6px] border-[#5e5775] border-b-[8px] border-r-[8px] border-[#0f0c14] shadow-[inset_-4px_-4px_0px_rgba(0,0,0,0.6),_inset_4px_4px_0px_rgba(255,255,255,0.3),0_20px_40px_rgba(0,0,0,0.85)]',
          inner: 'bg-[#1d1a26] border-4 border-[#0d0b12] shadow-[inset_0_4px_16px_rgba(0,0,0,0.8)]',
          plankLines: 'bg-[repeating-linear-gradient(0deg,#211d2b,#211d2b_32px,#100e16_32px,#100e16_36px)]',
          titleColor: 'text-[#fae8ff]',
          badgeBg: 'bg-[#131018] border-2 border-[#5a5170] text-[#f87171] shadow-[inset_1px_1px_0px_rgba(255,255,255,0.2)]',
          bracketColor: 'bg-[#100d17] border-[#4c445c]',
          ringBg: 'bg-[#221d2d] border-[#554b68]'
        };
      case 'oak':
      default:
        return {
          outer: 'bg-[#7d4e23] border-t-[6px] border-l-[6px] border-[#be864b] border-b-[8px] border-r-[8px] border-[#331c0a] shadow-[inset_-4px_-4px_0px_rgba(0,0,0,0.6),_inset_4px_4px_0px_rgba(255,255,255,0.3),0_20px_40px_rgba(0,0,0,0.85)]',
          inner: 'bg-[#613b16] border-4 border-[#291708] shadow-[inset_0_4px_16px_rgba(0,0,0,0.7)]',
          plankLines: 'bg-[repeating-linear-gradient(0deg,#663f19,#663f19_32px,#38200b_32px,#38200b_36px)]',
          titleColor: 'text-[#fff7ed]',
          badgeBg: 'bg-[#311c09] border-2 border-[#9e6730] text-[#fcd34d] shadow-[inset_1px_1px_0px_rgba(255,255,255,0.25)]',
          bracketColor: 'bg-[#241306] border-[#8a5728]',
          ringBg: 'bg-[#361e0b] border-[#8c5a2c]'
        };
    }
  };

  const styles = getPanelStyles();

  return (
    <div className="relative w-full max-w-3xl flex flex-col items-center">
      {showChains && (
        <div className="hidden md:flex justify-between w-full max-w-xl px-12 -mb-2 z-10 pointer-events-none">
          <ChainLink length={4} />
          <ChainLink length={4} />
        </div>
      )}

      <div
        onClick={() => onOpenDetails(problem)}
        className={`w-full relative p-4 md:p-6 cursor-pointer group transition-all duration-200 hover:-translate-y-1 ${styles.outer}`}
      >
        <div className="absolute top-2 left-2 w-4 h-4 bg-[#18191a] border-2 border-[#5e6368] shadow-[inset_1.5px_1.5px_0px_#ffffff,inset_-1.5px_-1.5px_0px_#000000]" />
        <div className="absolute top-2 right-2 w-4 h-4 bg-[#18191a] border-2 border-[#5e6368] shadow-[inset_1.5px_1.5px_0px_#ffffff,inset_-1.5px_-1.5px_0px_#000000]" />
        <div className="absolute bottom-2 left-2 w-4 h-4 bg-[#18191a] border-2 border-[#5e6368] shadow-[inset_1.5px_1.5px_0px_#ffffff,inset_-1.5px_-1.5px_0px_#000000]" />
        <div className="absolute bottom-2 right-2 w-4 h-4 bg-[#18191a] border-2 border-[#5e6368] shadow-[inset_1.5px_1.5px_0px_#ffffff,inset_-1.5px_-1.5px_0px_#000000]" />

        <div className="absolute -top-4 left-16 md:left-24 w-8 h-4.5 bg-[#212121] border-2 border-[#5c5c5c] shadow-[inset_1px_1px_0px_#8c8c8c,inset_-1px_-1px_0px_#000000]" />
        <div className="absolute -top-4 right-16 md:right-24 w-8 h-4.5 bg-[#212121] border-2 border-[#5c5c5c] shadow-[inset_1px_1px_0px_#8c8c8c,inset_-1px_-1px_0px_#000000]" />

        <div className={`p-4 md:p-6 ${styles.inner} ${styles.plankLines}`}>
          <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
            <div className="flex items-center gap-2.5">
              <span className={`px-2.5 py-1 font-['Press_Start_2P',monospace] text-[10px] uppercase tracking-wider drop-shadow-[1px_1px_0px_#000] ${styles.badgeBg}`}>
                {problem.trackNumber}
              </span>
              <span className="text-xs sm:text-sm text-[#fef08a] font-['Pixelify_Sans',sans-serif] tracking-wider font-bold drop-shadow-[1px_2px_0px_#000]">
                {problem.category}
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-['Pixelify_Sans',sans-serif] text-xs sm:text-sm font-semibold text-[#fef3c7] drop-shadow-[1px_1px_0px_#000]">
              <span className="w-3 h-3 bg-[#f59e0b] border-2 border-[#78350f] inline-block shadow-[inset_1px_1px_0px_#fde68a]" />
              <span>Rank: {problem.difficulty}</span>
            </div>
          </div>

          <h3 className={`font-['Pixelify_Sans',sans-serif] font-bold text-2xl md:text-3xl mb-3 tracking-wide leading-snug drop-shadow-[2px_3px_0px_#0a0603] ${styles.titleColor}`}>
            {problem.title}
          </h3>

          <p className="font-['Pixelify_Sans',sans-serif] text-sm md:text-base text-[#ffedd5] leading-relaxed mb-6 drop-shadow-[1px_2px_0px_#000] font-normal">
            {problem.excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-3.5 border-t-2 border-black/40">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-['Press_Start_2P',monospace] text-[9px] text-[#fed7aa] uppercase drop-shadow-[1px_1px_0px_#000]">
                LOOT:
              </span>
              <span className="font-['Pixelify_Sans',sans-serif] text-xs sm:text-sm text-[#fef08a] bg-[#140c05] px-3 py-1 border border-[#855325] shadow-[inset_1px_1px_0px_rgba(255,255,255,0.2)] font-medium">
                {problem.bountyReward.split('+')[0].trim()}
              </span>
            </div>

            <MinecraftButton
              onClick={() => onOpenDetails(problem)}
              variant="wood"
              className="text-[11px] py-3 px-5 sm:px-6 group-hover:scale-102"
            >
              Open Quest Scroll
            </MinecraftButton>
          </div>
        </div>
      </div>
    </div>
  );
};
