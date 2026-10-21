import React from 'react';

export const WoodenBeam: React.FC = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto hidden md:flex items-center justify-between select-none pointer-events-none mb-1">
      <div className="w-10 h-10 bg-[#3d240e] border-4 border-[#1f1105] shadow-[inset_3px_3px_0_#6b411b,inset_-3px_-3px_0_#140a02] flex items-center justify-center">
        <div className="w-5 h-5 rounded-full border-2 border-[#1f1105] bg-[#5c3515]" />
      </div>

      <div className="relative flex-1 h-8 bg-[#523315] border-t-4 border-b-4 border-[#241405] shadow-[inset_0_4px_0_#805324,inset_0_-4px_0_#1a0d03] flex items-center justify-around px-12">
        <div className="w-6 h-10 bg-[#292929] border-2 border-[#545454] shadow-[inset_1px_1px_0_#888] -my-1" />
        <div className="w-6 h-10 bg-[#292929] border-2 border-[#545454] shadow-[inset_1px_1px_0_#888] -my-1" />
      </div>

      <div className="w-10 h-10 bg-[#3d240e] border-4 border-[#1f1105] shadow-[inset_3px_3px_0_#6b411b,inset_-3px_-3px_0_#140a02] flex items-center justify-center">
        <div className="w-5 h-5 rounded-full border-2 border-[#1f1105] bg-[#5c3515]" />
      </div>
    </div>
  );
};
