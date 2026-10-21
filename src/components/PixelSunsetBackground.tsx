import React from 'react';

export const PixelSunsetBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f061f] via-[#2f1035] via-40% via-[#6e2221] via-60% via-[#b24617] via-78% to-[#f59e0b]" />

      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:12px_12px]" />

      <div className="absolute top-8 left-14 w-2.5 h-2.5 bg-[#ffffff] opacity-90 shadow-[0_0_8px_#ffffff]" />
      <div className="absolute top-16 left-1/4 w-1.5 h-1.5 bg-[#ffffff] opacity-75" />
      <div className="absolute top-10 right-1/3 w-2 h-2 bg-[#fde047] opacity-85 shadow-[0_0_4px_#fde047]" />
      <div className="absolute top-20 right-24 w-2 h-2 bg-[#ffffff] opacity-80" />
      <div className="absolute top-36 left-1/3 w-1.5 h-1.5 bg-[#fef08a] opacity-70" />
      <div className="absolute top-7 right-1/2 w-2.5 h-2.5 bg-[#ffffff] opacity-95 shadow-[0_0_8px_#ffffff]" />
      <div className="absolute top-28 right-16 w-1.5 h-1.5 bg-[#ffd8a8] opacity-75" />

      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-32 h-32 md:w-40 md:h-40 bg-[#fffbeb] border-4 border-[#fbbf24] shadow-[0_0_80px_rgba(251,191,36,0.85),inset_0_0_24px_#f59e0b]" />
        <div className="w-44 h-2.5 md:w-56 bg-[#ea580c] opacity-85 mt-1 shadow-[0_0_12px_#ea580c]" />
        <div className="w-56 h-2 md:w-68 bg-[#9a3412] opacity-75 mt-1" />
      </div>

      <div className="absolute top-24 left-[4%] flex flex-col opacity-90">
        <div className="flex">
          <div className="w-14 h-7 bg-[#fcd5ce]" />
          <div className="w-28 h-7 bg-[#ffedd5]" />
          <div className="w-16 h-7 bg-[#fcd5ce]" />
        </div>
        <div className="flex">
          <div className="w-6 h-7 bg-[#d9777f]" />
          <div className="w-52 h-7 bg-[#fcd5ce]" />
          <div className="w-10 h-7 bg-[#d9777f]" />
        </div>
        <div className="w-44 h-5 bg-[#831843] ml-5 shadow-[0_4px_10px_rgba(0,0,0,0.5)]" />
      </div>

      <div className="absolute top-40 right-[7%] flex flex-col opacity-85">
        <div className="flex ml-10">
          <div className="w-24 h-7 bg-[#ffedd5]" />
          <div className="w-18 h-7 bg-[#fcd5ce]" />
        </div>
        <div className="flex">
          <div className="w-10 h-7 bg-[#d9777f]" />
          <div className="w-48 h-7 bg-[#fcd5ce]" />
          <div className="w-14 h-7 bg-[#d9777f]" />
        </div>
        <div className="w-52 h-5 bg-[#831843] ml-3 shadow-[0_4px_10px_rgba(0,0,0,0.5)]" />
      </div>

      <div className="absolute bottom-20 -left-8 flex flex-col opacity-80">
        <div className="flex ml-14">
          <div className="w-36 h-7 bg-[#fdba74]" />
          <div className="w-24 h-7 bg-[#fb923c]" />
        </div>
        <div className="flex">
          <div className="w-16 h-7 bg-[#b91c1c]" />
          <div className="w-56 h-7 bg-[#fb923c]" />
        </div>
        <div className="w-60 h-5 bg-[#4c0519] ml-8" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-52 md:h-60 pointer-events-none">
        <svg
          viewBox="0 0 1200 240"
          preserveAspectRatio="none"
          className="w-full h-full block"
          shapeRendering="crispEdges"
        >
          <path
            d="M0,160 L40,160 L40,140 L80,140 L80,110 L120,110 L120,90 L160,90 L160,70 L200,70 L200,90 L240,90 L240,120 L280,120 L280,140 L320,140 L360,140 L360,100 L400,100 L400,80 L440,80 L440,50 L480,50 L480,80 L520,80 L520,110 L560,110 L600,110 L600,80 L640,80 L640,60 L680,60 L680,80 L720,80 L720,120 L760,120 L800,120 L800,90 L840,90 L840,60 L880,60 L880,90 L920,90 L960,90 L960,130 L1000,130 L1040,130 L1040,100 L1080,100 L1080,80 L1120,80 L1120,110 L1160,110 L1200,110 L1200,240 L0,240 Z"
            fill="#1c0b29"
          />
          <path
            d="M0,190 L30,190 L30,170 L60,170 L90,170 L90,150 L130,150 L130,130 L170,130 L170,150 L210,150 L250,150 L250,180 L290,180 L330,180 L370,180 L370,150 L410,150 L410,130 L450,130 L490,130 L490,160 L530,160 L570,160 L610,160 L610,140 L650,140 L690,140 L690,170 L730,170 L770,170 L810,170 L850,170 L850,140 L890,140 L930,140 L970,140 L970,170 L1010,170 L1050,170 L1090,170 L1090,140 L1130,140 L1170,140 L1200,140 L1200,240 L0,240 Z"
            fill="#10051a"
          />
          <path
            d="M0,220 L20,220 L20,205 L50,205 L50,190 L80,190 L80,205 L120,205 L150,205 L150,190 L180,190 L210,190 L240,190 L240,205 L280,205 L310,205 L310,190 L340,190 L370,190 L400,190 L430,190 L430,205 L470,205 L500,205 L530,205 L530,190 L560,190 L600,190 L630,190 L670,190 L670,205 L710,205 L740,205 L770,205 L800,205 L830,205 L830,190 L870,190 L900,190 L940,190 L970,190 L970,205 L1010,205 L1050,205 L1080,205 L1080,190 L1120,190 L1160,190 L1200,190 L1200,240 L0,240 Z"
            fill="#08020d"
          />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#06010a] border-t-4 border-[#1c0827]" />
    </div>
  );
};
