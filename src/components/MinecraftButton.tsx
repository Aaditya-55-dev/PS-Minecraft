import React from 'react';

interface MinecraftButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'wood' | 'stone' | 'redstone';
  className?: string;
}

export const MinecraftButton: React.FC<MinecraftButtonProps> = ({
  onClick,
  children,
  variant = 'wood',
  className = ''
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick();
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'stone':
        return 'bg-[#6b6f73] text-[#f8fafc] border-t-[4px] border-l-[4px] border-[#9ca3af] border-b-[6px] border-r-[6px] border-[#222528] hover:bg-[#7b8085] hover:border-t-[#cbd5e1] active:border-t-[6px] active:border-l-[6px] active:border-[#1a1b1d] active:border-b-[2px] active:border-r-[2px] active:border-[#83888e] shadow-[inset_-4px_-4px_0px_rgba(0,0,0,0.6),_inset_4px_4px_0px_rgba(255,255,255,0.3),0_6px_12px_rgba(0,0,0,0.6)] active:shadow-[inset_4px_4px_0px_rgba(0,0,0,0.8)]';
      case 'redstone':
        return 'bg-[#991b1b] text-[#fef2f2] border-t-[4px] border-l-[4px] border-[#ef4444] border-b-[6px] border-r-[6px] border-[#450a0a] hover:bg-[#b91c1c] hover:border-t-[#f87171] active:border-t-[6px] active:border-l-[6px] active:border-[#330606] active:border-b-[2px] active:border-r-[2px] active:border-[#991b1b] shadow-[inset_-4px_-4px_0px_rgba(0,0,0,0.6),_inset_4px_4px_0px_rgba(255,255,255,0.3),0_6px_12px_rgba(0,0,0,0.6)] active:shadow-[inset_4px_4px_0px_rgba(0,0,0,0.8)]';
      case 'wood':
      default:
        return 'bg-[#825227] text-[#fffbeb] border-t-[4px] border-l-[4px] border-[#bf864a] border-b-[6px] border-r-[6px] border-[#301a07] hover:bg-[#965e2e] hover:border-t-[#d99f64] active:border-t-[6px] active:border-l-[6px] active:border-[#211104] active:border-b-[2px] active:border-r-[2px] active:border-[#9c6431] shadow-[inset_-4px_-4px_0px_rgba(0,0,0,0.6),_inset_4px_4px_0px_rgba(255,255,255,0.3),0_6px_12px_rgba(0,0,0,0.6)] active:shadow-[inset_4px_4px_0px_rgba(0,0,0,0.8)]';
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`relative inline-flex items-center justify-center font-['Press_Start_2P',monospace] text-xs uppercase tracking-wider py-3 px-6 transition-transform select-none cursor-pointer active:translate-y-1 active:translate-x-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${getVariantStyles()} ${className}`}
    >
      <span className="drop-shadow-[1px_2px_0px_rgba(0,0,0,0.9)] flex items-center gap-2 pointer-events-none">
        {children}
      </span>
    </button>
  );
};
