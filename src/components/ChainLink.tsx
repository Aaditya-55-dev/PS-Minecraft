import React from 'react';

interface ChainLinkProps {
  length?: number;
}

export const ChainLink: React.FC<ChainLinkProps> = ({ length = 6 }) => {
  const links = Array.from({ length });

  return (
    <div className="flex flex-col items-center select-none pointer-events-none">
      <div className="w-5 h-3 bg-[#242424] border-t-2 border-l-2 border-[#545454] border-b-2 border-r-2 border-[#121212] mb-0.5" />
      {links.map((_, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="w-4 h-4 bg-[#383838] border-2 border-[#141414] shadow-[inset_1px_1px_0_#6e6e6e,inset_-1px_-1px_0_#1c1c1c] relative">
            <div className="absolute inset-1 bg-[#141414]" />
          </div>
          <div className="w-2.5 h-2.5 bg-[#4f4f4f] border border-[#141414] -my-1 z-10" />
        </div>
      ))}
      <div className="w-5 h-3 bg-[#383838] border-2 border-[#141414] shadow-[inset_1px_1px_0_#757575] mt-0.5" />
    </div>
  );
};
