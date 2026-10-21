import React, { useState, useRef } from 'react';
import { PROBLEM_STATEMENTS } from './data/problemStatements.ts';
import { ProblemStatement } from './types.ts';
import { PixelSunsetBackground } from './components/PixelSunsetBackground.tsx';
import { HangingTopNavigation } from './components/HangingTopNavigation.tsx';
import { MinecraftHUD } from './components/MinecraftHUD.tsx';
import { WoodenBeam } from './components/WoodenBeam.tsx';
import { ProblemStatementCard } from './components/ProblemStatementCard.tsx';
import { LecternBookModal } from './components/LecternBookModal.tsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function App() {
  const [selectedProblem, setSelectedProblem] = useState<ProblemStatement | null>(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleOpenDetails = (problem: ProblemStatement) => {
    setSelectedProblem(problem);
  };

  const handleCloseDetails = () => {
    setSelectedProblem(null);
  };

  const handleScrollToCard = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth * 0.88;
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setMobileActiveIndex(index);
    }
  };

  const handleCarouselScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const width = carouselRef.current.offsetWidth * 0.88;
      const newIndex = Math.round(scrollLeft / (width || 1));
      if (newIndex >= 0 && newIndex < PROBLEM_STATEMENTS.length) {
        setMobileActiveIndex(newIndex);
      }
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between text-white selection:bg-[#71963b] selection:text-white overflow-x-hidden">
      <PixelSunsetBackground />

      <HangingTopNavigation />

      <MinecraftHUD />

      <main className="w-full flex-1 flex flex-col items-center justify-center px-4 py-4 md:py-6 z-10">
        <div className="w-full max-w-4xl flex flex-col items-center">
          <WoodenBeam />

          <div className="hidden md:flex flex-col items-center gap-6 w-full">
            {PROBLEM_STATEMENTS.map((problem, index) => (
              <ProblemStatementCard
                key={problem.id}
                problem={problem}
                onOpenDetails={handleOpenDetails}
                showChains={index > 0}
              />
            ))}
          </div>

          <div className="flex md:hidden flex-col items-center w-full">
            <div className="flex items-center justify-between w-full px-2 mb-3">
              <span className="font-['Press_Start_2P',monospace] text-[9px] text-[#fcd34d] drop-shadow-[1px_1px_0px_#000]">
                QUEST {mobileActiveIndex + 1} OF {PROBLEM_STATEMENTS.length}
              </span>
              <span className="font-['Pixelify_Sans',sans-serif] text-xs text-[#fed7aa] flex items-center gap-1 drop-shadow-[1px_1px_0px_#000] font-semibold">
                <span>◀ SWIPE HORIZONTALLY ▶</span>
              </span>
            </div>

            <div
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              className="w-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 px-4 py-2"
            >
              {PROBLEM_STATEMENTS.map((problem) => (
                <div
                  key={problem.id}
                  className="snap-center shrink-0 w-[88vw] max-w-sm flex justify-center"
                >
                  <ProblemStatementCard
                    problem={problem}
                    onOpenDetails={handleOpenDetails}
                    showChains={false}
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 mt-5">
              <button
                type="button"
                onClick={() => handleScrollToCard(Math.max(0, mobileActiveIndex - 1))}
                disabled={mobileActiveIndex === 0}
                aria-label="Previous quest"
                className="bg-[#4a2e13] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#613b19] border-t-2 border-l-2 border-[#804e22] border-b-3 border-r-3 border-[#211204] p-2 text-[#ffeed1] font-['Press_Start_2P',monospace] text-xs cursor-pointer active:translate-y-0.5 shadow-[inset_1px_1px_0px_rgba(255,255,255,0.2)]"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex items-center gap-2.5">
                {PROBLEM_STATEMENTS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleScrollToCard(i)}
                    aria-label={`Jump to quest ${i + 1}`}
                    className={`w-3.5 h-3.5 transition-all cursor-pointer border ${
                      mobileActiveIndex === i
                        ? 'bg-[#f59e0b] border-[#fef08a] scale-110 shadow-[0_0_8px_#f59e0b]'
                        : 'bg-[#291708] border-[#5e3814] hover:bg-[#40260f]'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => handleScrollToCard(Math.min(PROBLEM_STATEMENTS.length - 1, mobileActiveIndex + 1))}
                disabled={mobileActiveIndex === PROBLEM_STATEMENTS.length - 1}
                aria-label="Next quest"
                className="bg-[#4a2e13] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#613b19] border-t-2 border-l-2 border-[#804e22] border-b-3 border-r-3 border-[#211204] p-2 text-[#ffeed1] font-['Press_Start_2P',monospace] text-xs cursor-pointer active:translate-y-0.5 shadow-[inset_1px_1px_0px_rgba(255,255,255,0.2)]"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-['Pixelify_Sans',sans-serif] text-[#fed7aa] border-t-2 border-[#452b14]/70 z-10 font-medium">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#16a34a] border border-[#14532d]" />
          <span>Hackfusion 4.0 · Google Developer Groups SWAG</span>
        </div>
        <div className="flex items-center gap-4 text-[#ffeed1]">
          <span>Minecraft HD Edition</span>
          <span>·</span>
          <span>Crafted with Blocks & Code</span>
        </div>
      </footer>

      <LecternBookModal
        problem={selectedProblem}
        onClose={handleCloseDetails}
      />
    </div>
  );
}
