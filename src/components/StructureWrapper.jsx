function StructureWrapper({ children }) {
  return (
<<<<<<< Updated upstream
    <div className="structure-wrapper">
      <div className="beam-container mt-30">
        <div className="hanging-lantern lantern-left">
          <div className="lantern-chain"></div>
          <div className="lantern-body">
            <div className="lantern-cap"></div>
            <div className="lantern-glass">
              <div className="lantern-flame"></div>
=======
    <div className="w-full max-w-3xl mx-auto my-10 md:my-[40px] md:mb-[60px] px-4 relative">
      <div className="flex items-start justify-center relative z-10 -mb-1">
        <div className="hidden md:flex absolute top-2.5 -left-5 z-20 flex-col items-center">
          <div className="w-1 h-7 bg-[repeating-linear-gradient(to_bottom,#6E6E6E_0px,#6E6E6E_4px,#222222_4px,#222222_8px)] shadow-[1px_0_0_#9E9E9E,-1px_0_0_#000000]"></div>
          <div className="w-8 flex flex-col items-center [filter:drop-shadow(0_0_16px_rgba(255,170,0,0.95))_drop-shadow(0_0_32px_rgba(255,110,0,0.6))]">
            <div className="w-8 h-2 bg-[#2A2A2A] border-2 border-[#0A0A0A] shadow-[inset_1px_1px_0px_#555555]"></div>
            <div className="w-6 h-[26px] bg-[radial-gradient(circle_at_center,#FFF4A3_20%,#FFAA00_70%,#CC6600_100%)] border-2 border-[#1A1A1A] shadow-[inset_0_0_8px_#FFFFFF,0_0_14px_#FFAA00] flex items-center justify-center">
              <div className="w-2 h-2.5 bg-white shadow-[0_0_6px_#FFF799]"></div>
>>>>>>> Stashed changes
            </div>
            <div className="w-7 h-1.5 bg-[#2A2A2A] border-2 border-[#0A0A0A] shadow-[inset_1px_1px_0px_#555555]"></div>
          </div>
        </div>

        <div className="flex-1 w-full max-w-3xl h-[250px] md:h-[400px] mx-auto bg-contain bg-center bg-no-repeat bg-[#7A4926] border-4 border-[#281508] shadow-[inset_4px_4px_0px_#A86D3F,inset_-4px_-4px_0px_#4B2B12,0_8px_12px_rgba(0,0,0,0.6)] py-5 px-9 md:py-6 md:px-[70px] text-center relative flex items-center justify-center">
          <div className="absolute -top-1 -bottom-1 left-2 md:left-5 w-7 bg-[#555A63] border-[3px] border-[#1E2024] shadow-[inset_2px_2px_0px_#808590,inset_-2px_-2px_0px_#2D3036] flex flex-col justify-around items-center py-1.5">
            <span className="w-2 h-2 bg-[#2D3036] border border-black shadow-[inset_1px_1px_0px_#808590]"></span>
            <span className="w-2 h-2 bg-[#2D3036] border border-black shadow-[inset_1px_1px_0px_#808590]"></span>
          </div>
          <h1 className="text-[#FFFF55] [text-shadow:3px_3px_0px_#2A170A] text-sm md:text-xl leading-[1.5] md:leading-[1.6] tracking-wider m-0 font-normal">
            HACKFUSION PROBLEM STATEMENTS
          </h1>
          <div className="absolute -top-1 -bottom-1 right-2 md:right-5 w-7 bg-[#555A63] border-[3px] border-[#1E2024] shadow-[inset_2px_2px_0px_#808590,inset_-2px_-2px_0px_#2D3036] flex flex-col justify-around items-center py-1.5">
            <span className="w-2 h-2 bg-[#2D3036] border border-black shadow-[inset_1px_1px_0px_#808590]"></span>
            <span className="w-2 h-2 bg-[#2D3036] border border-black shadow-[inset_1px_1px_0px_#808590]"></span>
          </div>
        </div>

        <div className="hidden md:flex absolute top-2.5 -right-5 z-20 flex-col items-center">
          <div className="w-1 h-7 bg-[repeating-linear-gradient(to_bottom,#6E6E6E_0px,#6E6E6E_4px,#222222_4px,#222222_8px)] shadow-[1px_0_0_#9E9E9E,-1px_0_0_#000000]"></div>
          <div className="w-8 flex flex-col items-center [filter:drop-shadow(0_0_16px_rgba(255,170,0,0.95))_drop-shadow(0_0_32px_rgba(255,110,0,0.6))]">
            <div className="w-8 h-2 bg-[#2A2A2A] border-2 border-[#0A0A0A] shadow-[inset_1px_1px_0px_#555555]"></div>
            <div className="w-6 h-[26px] bg-[radial-gradient(circle_at_center,#FFF4A3_20%,#FFAA00_70%,#CC6600_100%)] border-2 border-[#1A1A1A] shadow-[inset_0_0_8px_#FFFFFF,0_0_14px_#FFAA00] flex items-center justify-center">
              <div className="w-2 h-2.5 bg-white shadow-[0_0_6px_#FFF799]"></div>
            </div>
            <div className="w-7 h-1.5 bg-[#2A2A2A] border-2 border-[#0A0A0A] shadow-[inset_1px_1px_0px_#555555]"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-row w-full max-w-3xl mx-auto border-4 border-[#1A1A1A] shadow-[0_12px_24px_rgba(0,0,0,0.7)]">
        <div className="w-6 min-w-[24px] md:w-[52px] md:min-w-[52px] shrink-0 bg-[#6C6C6C] bg-[linear-gradient(90deg,#1F1F1F_3px,transparent_3px),linear-gradient(#1F1F1F_3px,transparent_3px),linear-gradient(90deg,#8E8E8E_1px,transparent_1px),linear-gradient(#8E8E8E_1px,transparent_1px)] [background-size:24px_20px,24px_20px,12px_10px,12px_10px] md:[background-size:52px_26px,52px_26px,26px_13px,26px_13px] shadow-[inset_4px_0_0px_#9C9C9C,inset_-4px_0_0px_#3A3A3A]"></div>
        <main className="flex-1 bg-[#333333] bg-[linear-gradient(45deg,#242424_25%,transparent_25%),linear-gradient(-45deg,#242424_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#242424_75%),linear-gradient(-45deg,transparent_75%,#242424_75%),linear-gradient(135deg,#444444_25%,transparent_25%),linear-gradient(-135deg,#444444_25%,transparent_25%),linear-gradient(135deg,transparent_75%,#444444_75%),linear-gradient(-135deg,transparent_75%,#444444_75%)] [background-size:16px_16px,16px_16px,16px_16px,16px_16px,32px_32px,32px_32px,32px_32px,32px_32px] shadow-[inset_6px_6px_18px_rgba(0,0,0,0.8),inset_-6px_-6px_18px_rgba(0,0,0,0.8)] py-5 px-3 md:py-9 md:px-7 flex flex-col gap-5 md:gap-8">
          {children}
        </main>
        <div className="w-6 min-w-[24px] md:w-[52px] md:min-w-[52px] shrink-0 bg-[#6C6C6C] bg-[linear-gradient(90deg,#1F1F1F_3px,transparent_3px),linear-gradient(#1F1F1F_3px,transparent_3px),linear-gradient(90deg,#8E8E8E_1px,transparent_1px),linear-gradient(#8E8E8E_1px,transparent_1px)] [background-size:24px_20px,24px_20px,12px_10px,12px_10px] md:[background-size:52px_26px,52px_26px,26px_13px,26px_13px] shadow-[inset_4px_0_0px_#9C9C9C,inset_-4px_0_0px_#3A3A3A]"></div>
      </div>
    </div>
  );
}

export default StructureWrapper;
