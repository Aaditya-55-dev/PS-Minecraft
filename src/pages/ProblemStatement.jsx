<<<<<<< Updated upstream
import { useState } from 'react';
import Navbar from '../components/Navbar';
import StructureWrapper from '../components/StructureWrapper';
import ProblemCard from '../components/ProblemCard';
import MinecraftModal from '../components/MinecraftModal';
import ToastNotification from '../components/ToastNotification';
=======
import { useState, useRef, useEffect } from 'react';
>>>>>>> Stashed changes
import { problemStatementsData } from '../data/problemStatementsData';

export default function ProblemStatement() {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastData, setToastData] = useState(null);
  const modalContainerRef = useRef(null);

  useEffect(() => {
    if (isModalOpen && modalContainerRef.current) {
      modalContainerRef.current.focus();
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (!toastData) return;
    const timer = setTimeout(() => {
      setToastData(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toastData]);

  const handleSelectCard = (track) => {
    setSelectedTrack(track);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmSelection = (track) => {
    setIsModalOpen(false);
    setToastData(track.trackName);
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Sponsors', href: '/sponsors' },
    { label: 'Hackfusion', href: '#' },
    { label: 'Schedule', href: '/schedule' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
<<<<<<< Updated upstream
    <div className="problem-statements-page">
      <Navbar />
=======
    <div className="min-h-screen w-full flex flex-col items-center justify-start overflow-x-hidden pt-10 font-['Press_Start_2P',monospace] bg-[#C36E3E] bg-[linear-gradient(rgba(20,10,5,0.35),rgba(20,10,5,0.45)),url('https://images7.alphacoders.com/336/thumb-1920-336294.png')] bg-cover bg-center bg-no-repeat bg-fixed">
      <nav className="w-full flex justify-center px-4 relative z-[100] mt-0">
        <ul className="list-none flex flex-wrap justify-center gap-3 md:gap-6 m-0 p-0">
          {navItems.map((item) => (
            <li key={item.label} className="relative pt-[18px] md:pt-[28px]">
              <div className="absolute top-0 left-[14px] w-1 h-5 md:h-[30px] bg-[repeating-linear-gradient(to_bottom,#7B7B7B_0px,#7B7B7B_5px,#2E2E2E_5px,#2E2E2E_10px)] shadow-[1px_0_0_#9E9E9E,-1px_0_0_#000000] z-[1]"></div>
              <div className="absolute top-0 right-[14px] w-1 h-5 md:h-[30px] bg-[repeating-linear-gradient(to_bottom,#7B7B7B_0px,#7B7B7B_5px,#2E2E2E_5px,#2E2E2E_10px)] shadow-[1px_0_0_#9E9E9E,-1px_0_0_#000000] z-[1]"></div>
              <a
                href={item.href}
                className={
                  item.label === 'Home'
                    ? "text-white text-xl font-bold font-['Press_Start_2P',monospace] mt-8 hover:text-gray-300 z-50 relative inline-block no-underline"
                    : "block relative bg-[#D28F47] border-[3px] border-[#3F2312] shadow-[inset_3px_3px_0px_#F5BD7D,inset_-3px_-3px_0px_#8C5224,0_6px_0px_rgba(0,0,0,0.5)] text-white [text-shadow:2px_2px_0px_#2A170A] no-underline font-['Press_Start_2P',monospace] text-[9px] md:text-[11px] px-2.5 py-2 md:px-[18px] md:py-3 transition-all duration-150 ease-out select-none hover:bg-[#E29E54] hover:text-[#FFFF55] hover:translate-y-[2px]"
                }
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
>>>>>>> Stashed changes

      <div className="w-full max-w-3xl mx-auto my-10 md:my-[40px] md:mb-[60px] px-4 relative">
        <div className="flex items-start justify-center relative z-10 -mb-1">
          <div className="hidden md:flex absolute top-2.5 -left-5 z-20 flex-col items-center">
            <div className="w-1 h-7 bg-[repeating-linear-gradient(to_bottom,#6E6E6E_0px,#6E6E6E_4px,#222222_4px,#222222_8px)] shadow-[1px_0_0_#9E9E9E,-1px_0_0_#000000]"></div>
            <div className="w-8 flex flex-col items-center [filter:drop-shadow(0_0_16px_rgba(255,170,0,0.95))_drop-shadow(0_0_32px_rgba(255,110,0,0.6))]">
              <div className="w-8 h-2 bg-[#2A2A2A] border-2 border-[#0A0A0A] shadow-[inset_1px_1px_0px_#555555]"></div>
              <div className="w-6 h-[26px] bg-[radial-gradient(circle_at_center,#FFF4A3_20%,#FFAA00_70%,#CC6600_100%)] border-2 border-[#1A1A1A] shadow-[inset_0_0_8px_#FFFFFF,0_0_14px_#FFAA00] flex items-center justify-center">
                <div className="w-2 h-2.5 bg-white shadow-[0_0_6px_#FFF799]"></div>
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
            {problemStatementsData.map((problem) => (
              <article
                key={problem.id}
                className="flex flex-col md:flex-row items-center md:items-stretch gap-[18px] md:gap-6 bg-[#F4E2B1] bg-[radial-gradient(circle_at_50%_50%,#FAF1D6_15%,#F4E2B1_50%,#DEC78E_100%)] border-4 border-[#825F2E] shadow-[inset_4px_4px_0px_#FFF7DF,inset_-4px_-4px_0px_#BF9F5B,4px_4px_0px_rgba(0,0,0,0.5),-2px_-2px_0px_#573E1E] [clip-path:polygon(0%_6px,6px_6px,6px_0%,calc(100%-6px)_0%,calc(100%-6px)_6px,100%_6px,100%_calc(100%-6px),calc(100%-6px)_calc(100%-6px),calc(100%-6px)_100%,6px_100%,6px_calc(100%-6px),0%_calc(100%-6px))] py-[18px] px-3.5 md:p-6 w-full max-w-full"
              >
                <div className="w-[150px] h-[150px] min-w-[150px] min-h-[150px] bg-[#24140A] border-[6px] border-[#4A2711] shadow-[inset_3px_3px_0px_#7A431F,inset_-3px_-3px_0px_#150903,0_4px_8px_rgba(0,0,0,0.4)] flex items-center justify-center box-border shrink-0 [image-rendering:pixelated] [&_img]:w-full [&_img]:max-w-3xl [&_img]:object-contain [&_img]:mx-auto [&_img]:max-h-[50vh]">
                  {problem.image}
                </div>
                <div className="flex flex-col flex-1 w-full items-center md:items-start text-center md:text-left">
                  <span className="text-[#8C4308] [text-shadow:1px_1px_0px_#FCEECB] text-[13px] leading-[1.5] mb-3 tracking-[0.5px]">
                    [ TRACK: <span>{problem.trackName}</span> ]
                  </span>
                  <h3 className="text-[#261306] [text-shadow:1px_1px_0px_#F9E7BA] text-[13px] md:text-base leading-[1.5] mb-3.5 font-normal">
                    {problem.title}
                  </h3>
                  <p className="text-[#381F0C] [text-shadow:1px_1px_0px_#F8E5B4] text-[10px] md:text-[11px] leading-[1.7] md:leading-[1.8] mb-5">
                    {problem.shortDescription}
                  </p>
                  <div className="flex justify-center md:justify-end w-full mt-auto">
                    <button
                      type="button"
                      onClick={() => handleSelectCard(problem)}
                      className="w-full md:w-auto bg-[#B56F30] border-[3px] border-[#331A0B] shadow-[inset_2px_2px_0px_#E59B5B,inset_-2px_-2px_0px_#703E14,0_3px_0px_#241206] text-white [text-shadow:2px_2px_0px_#241206] text-[13px] px-6 py-3 cursor-pointer outline-none select-none transition-colors duration-100 hover:bg-[#C67E3C] hover:text-[#FFFF55] active:shadow-[inset_-2px_-2px_0px_#E59B5B,inset_2px_2px_0px_#703E14,0_1px_0px_#241206] active:translate-y-[2px]"
                    >
                      SELECT
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </main>

          <div className="w-6 min-w-[24px] md:w-[52px] md:min-w-[52px] shrink-0 bg-[#6C6C6C] bg-[linear-gradient(90deg,#1F1F1F_3px,transparent_3px),linear-gradient(#1F1F1F_3px,transparent_3px),linear-gradient(90deg,#8E8E8E_1px,transparent_1px),linear-gradient(#8E8E8E_1px,transparent_1px)] [background-size:24px_20px,24px_20px,12px_10px,12px_10px] md:[background-size:52px_26px,52px_26px,26px_13px,26px_13px] shadow-[inset_4px_0_0px_#9C9C9C,inset_-4px_0_0px_#3A3A3A]"></div>
        </div>
      </div>

      <a
        href="/"
        className="text-white text-xl font-bold font-['Press_Start_2P',monospace] mt-8 hover:text-gray-300 z-50 relative"
      >
        Home
      </a>

      <footer className="w-full bg-[#404040] bg-[linear-gradient(45deg,#2B2B2B_25%,transparent_25%),linear-gradient(-45deg,#2B2B2B_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#2B2B2B_75%),linear-gradient(-45deg,transparent_75%,#2B2B2B_75%),linear-gradient(135deg,#505050_25%,transparent_25%),linear-gradient(-135deg,#505050_25%,transparent_25%),linear-gradient(135deg,transparent_75%,#505050_75%),linear-gradient(-135deg,transparent_75%,#505050_75%)] [background-size:20px_20px,20px_20px,20px_20px,20px_20px,40px_40px,40px_40px,40px_40px,40px_40px] border-t-[5px] border-[#1C1C1C] shadow-[inset_0_8px_16px_rgba(0,0,0,0.7)] flex justify-center items-center py-[30px] px-5 mt-auto">
        <div className="w-full max-w-3xl mx-auto bg-[#D28F47] border-[3px] border-[#3F2312] shadow-[inset_3px_3px_0px_#F5BD7D,inset_-3px_-3px_0px_#8C5224,0_6px_10px_rgba(0,0,0,0.6)] py-3.5 px-7 text-center">
          <span className="text-white [text-shadow:2px_2px_0px_#2A170A] text-[9px] md:text-[11px] leading-[1.6]">
            &copy; 2026 Hackfusion. All rights reserved
          </span>
        </div>
      </footer>

      {isModalOpen && selectedTrack && (
        <div
          ref={modalContainerRef}
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === 'Escape') handleCloseModal();
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseModal();
          }}
          className="fixed inset-0 bg-black/75 backdrop-blur-[4px] flex items-center justify-center z-[2000] p-5"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-[#F4E2B1] bg-[radial-gradient(circle_at_50%_50%,#FAF1D6_15%,#F4E2B1_55%,#DEC78E_100%)] border-[6px] border-[#381E0B] shadow-[inset_4px_4px_0px_#7A431F,inset_-4px_-4px_0px_#150903,0_20px_40px_rgba(0,0,0,0.85)] max-w-3xl w-[95%] md:w-[90%] max-h-[90vh] md:max-h-[85vh] flex flex-col relative object-contain mx-auto">
            <div className="flex justify-between items-start py-3 px-4 md:pt-[22px] md:px-6 md:pb-[18px] bg-[#DEC78E] border-b-[3px] border-[#825F2E] gap-4">
              <div className="flex-1">
                <span className="text-[#8C4308] [text-shadow:1px_1px_0px_#FCEECB] text-[10px] md:text-[12px] tracking-[0.5px] block mb-2.5">
                  [ TRACK: {selectedTrack.trackName} ]
                </span>
                <h2 className="text-[#261306] [text-shadow:1px_1px_0px_#F9E7BA] text-[13px] md:text-base leading-[1.5] m-0 font-normal">
                  {selectedTrack.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Close modal"
                className="w-[30px] h-[30px] md:w-9 md:h-9 min-w-[30px] min-h-[30px] md:min-w-[36px] md:min-h-[36px] bg-[#C9302C] border-2 border-black shadow-[inset_2px_2px_0px_#FF6662,inset_-2px_-2px_0px_#631210,0_3px_0px_#241206] text-white text-[13px] md:text-base flex items-center justify-center cursor-pointer select-none transition-colors duration-100 leading-none p-0 hover:bg-[#E2433E] active:shadow-[inset_-2px_-2px_0px_#FF6662,inset_2px_2px_0px_#631210] active:translate-y-[2px]"
              >
                &times;
              </button>
            </div>

            <div className="overflow-y-auto py-4 px-3.5 md:p-6 flex flex-col gap-[18px] md:gap-[26px] border-y-2 border-[#381E0B]">
              <section className="flex flex-col">
                <h4 className="text-[#5C320A] [text-shadow:1px_1px_0px_#FAF1D6] text-[11px] md:text-[13px] mb-3.5 tracking-[0.5px] flex items-center gap-2 m-0 font-normal">
                  <span className="text-[#8C4308] text-[10px]">◆</span>
                  MISSION OVERVIEW
                </h4>
                <div className="flex flex-col">
                  {Array.isArray(selectedTrack.fullContext) ? (
                    selectedTrack.fullContext.map((paragraph, index) => (
                      <p key={index} className="text-[#381F0C] [text-shadow:1px_1px_0px_#F8E5B4] text-[10px] md:text-[11px] leading-[1.8] mb-3 last:mb-0">
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    <p className="text-[#381F0C] [text-shadow:1px_1px_0px_#F8E5B4] text-[10px] md:text-[11px] leading-[1.8] mb-3 last:mb-0">
                      {selectedTrack.fullContext}
                    </p>
                  )}
                </div>
              </section>

              <section className="flex flex-col">
                <h4 className="text-[#5C320A] [text-shadow:1px_1px_0px_#FAF1D6] text-[11px] md:text-[13px] mb-3.5 tracking-[0.5px] flex items-center gap-2 m-0 font-normal">
                  <span className="text-[#8C4308] text-[10px]">◆</span>
                  KEY DELIVERABLES &amp; REQUIREMENTS
                </h4>
                <ul className="list-none p-0 m-0 flex flex-col gap-3">
                  {selectedTrack.requirements &&
                    selectedTrack.requirements.map((req, index) => (
                      <li key={index} className="text-[#381F0C] [text-shadow:1px_1px_0px_#F8E5B4] text-[10px] md:text-[11px] leading-[1.7] relative pl-6">
                        <span className="absolute left-1 top-[1px] text-[#00AAAA] text-[10px] [text-shadow:1px_1px_0px_#005555]">◆</span>
                        {req}
                      </li>
                    ))}
                </ul>
              </section>

              <section className="flex flex-col">
                <h4 className="text-[#5C320A] [text-shadow:1px_1px_0px_#FAF1D6] text-[11px] md:text-[13px] mb-3.5 tracking-[0.5px] flex items-center gap-2 m-0 font-normal">
                  <span className="text-[#8C4308] text-[10px]">◆</span>
                  RECOMMENDED TECH STACK
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {selectedTrack.techStack &&
                    selectedTrack.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-[#555A63] border-2 border-[#1E2024] shadow-[inset_2px_2px_0px_#808590,inset_-2px_-2px_0px_#2D3036,0_2px_0px_#241206] text-[#FFFF55] [text-shadow:1px_1px_0px_#2D3036] text-[9px] md:text-[10px] py-1.5 px-2.5 md:py-2 md:px-3.5 tracking-[0.5px]"
                      >
                        {tech}
                      </span>
                    ))}
                </div>
              </section>

              <section className="flex flex-col">
                <h4 className="text-[#5C320A] [text-shadow:1px_1px_0px_#FAF1D6] text-[11px] md:text-[13px] mb-3.5 tracking-[0.5px] flex items-center gap-2 m-0 font-normal">
                  <span className="text-[#8C4308] text-[10px]">◆</span>
                  EVALUATION CRITERIA
                </h4>
                <div className="border-[3px] border-[#825F2E] shadow-[inset_2px_2px_0px_#FFF7DF,inset_-2px_-2px_0px_#BF9F5B] bg-[#FAF1D6]">
                  <table className="w-full border-collapse text-[9px] md:text-[11px]">
                    <thead>
                      <tr>
                        <th className="bg-[#DEC78E] border-b-2 border-[#825F2E] text-[#261306] [text-shadow:1px_1px_0px_#F9E7BA] p-2 md:py-3 md:px-3.5 text-left text-[9px] md:text-[11px] font-normal">
                          CRITERIA
                        </th>
                        <th className="bg-[#DEC78E] border-b-2 border-[#825F2E] text-[#261306] [text-shadow:1px_1px_0px_#F9E7BA] p-2 md:py-3 md:px-3.5 text-right text-[9px] md:text-[11px] font-normal">
                          WEIGHT
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedTrack.evaluationRubric &&
                        selectedTrack.evaluationRubric.map((item, index) => (
                          <tr key={index}>
                            <td className="p-2 md:py-3 md:px-3.5 border-b border-[#DEC78E] text-[#381F0C] [text-shadow:1px_1px_0px_#F8E5B4] leading-[1.6]">
                              {item.label}
                            </td>
                            <td className="p-2 md:py-3 md:px-3.5 border-b border-[#DEC78E] text-right text-[#8C4308] font-bold whitespace-nowrap leading-[1.6]">
                              {item.percentage}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            <div className="flex flex-col-reverse md:flex-row justify-end gap-2.5 md:gap-4 py-3.5 px-4 md:py-[18px] md:px-6 bg-[#DEC78E] border-t-[3px] border-[#825F2E]">
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-full md:w-auto bg-[#8B8B8B] border-[3px] border-[#1E1E1E] shadow-[inset_2px_2px_0px_#D8D8D8,inset_-2px_-2px_0px_#4A4A4A,0_3px_0px_#241206] text-white [text-shadow:2px_2px_0px_#3F3F3F] text-[13px] px-6 py-3 cursor-pointer outline-none select-none transition-colors duration-100 hover:bg-[#9C9C9C] active:shadow-[inset_-2px_-2px_0px_#D8D8D8,inset_2px_2px_0px_#4A4A4A,0_1px_0px_#241206] active:translate-y-[2px]"
              >
                CLOSE
              </button>
              <button
                type="button"
                onClick={() => handleConfirmSelection(selectedTrack)}
                className="w-full md:w-auto bg-[#4E933B] border-[3px] border-[#1B4512] shadow-[inset_2px_2px_0px_#79C265,inset_-2px_-2px_0px_#295C1E,0_3px_0px_#241206] text-white [text-shadow:2px_2px_0px_#1B4512] text-[13px] px-6 py-3 cursor-pointer outline-none select-none transition-colors duration-100 hover:bg-[#5CA846] hover:text-[#FFFF55] active:shadow-[inset_-2px_-2px_0px_#79C265,inset_2px_2px_0px_#295C1E,0_1px_0px_#241206] active:translate-y-[2px]"
              >
                CONFIRM SELECTION
              </button>
            </div>
          </div>
        </div>
      )}

      {toastData && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-0 left-1/2 -translate-x-1/2 -translate-y-9 bg-[#D28F47] border-[3px] border-[#3F2312] shadow-[inset_3px_3px_0px_#F5BD7D,inset_-3px_-3px_0px_#8C5224,0_8px_16px_rgba(0,0,0,0.7)] text-[#FFFF55] [text-shadow:2px_2px_0px_#2A170A] text-[11px] md:text-[13px] leading-[1.6] py-3.5 px-[18px] md:py-[18px] md:px-7 text-center z-[9999] pointer-events-none max-w-[90vw] transition-transform duration-300 ease-[cubic-bezier(0.18,0.89,0.32,1.28)]"
        >
          Track Selected: {toastData}
        </div>
      )}
    </div>
  );
}
