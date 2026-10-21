import React from 'react';

export const HangingTopNavigation: React.FC = () => {
  const tabs = [
    { id: 'Home', label: 'Home', isFeatured: false },
    { id: 'Sponsors', label: 'Sponsors', isFeatured: false },
    { id: 'Hackfusion', label: 'Hackfusion', isFeatured: true },
    { id: 'Schedule', label: 'Schedule', isFeatured: false },
    { id: 'Contact', label: 'Contact', isFeatured: false }
  ];

  return (
    <nav className="w-full relative z-30 select-none flex flex-col items-center">
      <div className="w-full h-5 sm:h-6 bg-[#3a200b] border-b-[4px] border-[#180c04] shadow-[inset_0_3px_0px_rgba(255,255,255,0.3),_inset_0_-3px_0px_rgba(0,0,0,0.7),0_8px_16px_rgba(0,0,0,0.85)] flex items-center justify-between px-4 sm:px-8 md:px-16">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 bg-[#242424] border border-[#525252] shadow-[inset_1px_1px_0px_#8c8c8c]" />
          <div className="w-3.5 h-3.5 bg-[#242424] border border-[#525252] shadow-[inset_1px_1px_0px_#8c8c8c]" />
        </div>
        <div className="hidden md:flex items-center gap-2">
          <div className="w-3.5 h-3.5 bg-[#242424] border border-[#525252] shadow-[inset_1px_1px_0px_#8c8c8c]" />
          <div className="w-3.5 h-3.5 bg-[#242424] border border-[#525252] shadow-[inset_1px_1px_0px_#8c8c8c]" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 bg-[#242424] border border-[#525252] shadow-[inset_1px_1px_0px_#8c8c8c]" />
          <div className="w-3.5 h-3.5 bg-[#242424] border border-[#525252] shadow-[inset_1px_1px_0px_#8c8c8c]" />
        </div>
      </div>

      <div className="w-full max-w-5xl px-2 sm:px-4 overflow-x-auto no-scrollbar py-2">
        <div className="flex items-start justify-center gap-2 sm:gap-4 md:gap-5 min-w-max mx-auto px-2">
          {tabs.map((tab) => (
            <div key={tab.id} className="flex flex-col items-center">
              <div className="flex justify-between w-14 sm:w-18 px-2 pointer-events-none -mb-1 z-10">
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2 bg-[#2b2b2b] border border-[#545454] shadow-[inset_1px_1px_0px_#888]" />
                  <div className="w-1.5 h-3 bg-[#171717] border-x border-[#474747]" />
                  <div className="w-2.5 h-2 bg-[#2b2b2b] border border-[#545454] shadow-[inset_1px_1px_0px_#888]" />
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2 bg-[#2b2b2b] border border-[#545454] shadow-[inset_1px_1px_0px_#888]" />
                  <div className="w-1.5 h-3 bg-[#171717] border-x border-[#474747]" />
                  <div className="w-2.5 h-2 bg-[#2b2b2b] border border-[#545454] shadow-[inset_1px_1px_0px_#888]" />
                </div>
              </div>

              <div
                className={`relative px-3.5 sm:px-5 md:px-6 py-2.5 sm:py-3 font-['Press_Start_2P',monospace] text-[10px] sm:text-xs tracking-wider transition-none select-none ${
                  tab.isFeatured
                    ? 'bg-[#996232] text-[#fff8db] border-t-[4px] border-l-[4px] border-[#fde047] border-b-[6px] border-r-[6px] border-[#1f0f03] shadow-[inset_-4px_-4px_0px_rgba(0,0,0,0.7),_inset_4px_4px_0px_rgba(255,255,255,0.4),0_0_18px_rgba(245,158,11,0.55)]'
                    : 'bg-[#754720] text-[#fed7aa] border-t-[4px] border-l-[4px] border-[#b0743b] border-b-[6px] border-r-[6px] border-[#291506] shadow-[inset_-4px_-4px_0px_rgba(0,0,0,0.65),_inset_4px_4px_0px_rgba(255,255,255,0.25),0_8px_16px_rgba(0,0,0,0.65)]'
                }`}
              >
                <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-[#1f1003] border border-[#593416]" />
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#1f1003] border border-[#593416]" />
                <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-[#1f1003] border border-[#593416]" />
                <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-[#1f1003] border border-[#593416]" />

                <span className="drop-shadow-[1px_2px_0px_#000] flex items-center gap-1.5">
                  {tab.isFeatured && (
                    <span className="w-2 h-2 bg-[#22c55e] border border-[#14532d] shadow-[0_0_8px_#22c55e] inline-block" />
                  )}
                  {tab.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};
