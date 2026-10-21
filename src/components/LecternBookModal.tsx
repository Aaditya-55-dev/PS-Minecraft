import React, { useEffect, useState } from 'react';
import { ProblemStatement } from '../types.ts';
import { MinecraftButton } from './MinecraftButton.tsx';

interface LecternBookModalProps {
  problem: ProblemStatement | null;
  onClose: () => void;
}

export const LecternBookModal: React.FC<LecternBookModalProps> = ({
  problem,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'objectives' | 'tech' | 'rubric'>('overview');

  useEffect(() => {
    if (problem) {
      setActiveTab('overview');
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [problem, onClose]);

  if (!problem) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-xs select-none overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl my-auto flex flex-col items-center"
      >
        <div className="absolute -top-7 left-12 w-6 h-12 bg-[#a3221c] border-x-2 border-[#540e0b] shadow-[0_4px_8px_rgba(0,0,0,0.6)] z-20" />

        <div className="w-full bg-[#42270f] border-t-[8px] border-l-[8px] border-[#7d4d23] border-b-[10px] border-r-[10px] border-[#1c0f04] p-3 md:p-5 shadow-[inset_-4px_-4px_0px_rgba(0,0,0,0.6),_inset_4px_4px_0px_rgba(255,255,255,0.3),0_30px_70px_rgba(0,0,0,0.98)]">
          <div className="flex items-center justify-between pb-3 mb-3 border-b-4 border-[#1f1003] text-[#ffeed1]">
            <div className="flex items-center gap-2.5">
              <span className="w-4 h-4 bg-[#f59e0b] border-2 border-[#78350f] shadow-[inset_1px_1px_0px_#fde68a]" />
              <span className="font-['Press_Start_2P',monospace] text-xs sm:text-sm text-[#fef08a] tracking-wider drop-shadow-[1px_2px_0px_#000]">
                LECTERN OF WISDOM · {problem.trackNumber}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="bg-[#991b1b] hover:bg-[#b91c1c] active:bg-[#6e120d] text-white font-['Press_Start_2P',monospace] text-[11px] px-3.5 py-1.5 border-t-2 border-l-2 border-[#ef4444] border-b-4 border-r-4 border-[#3b0808] shadow-[inset_-2px_-2px_0px_rgba(0,0,0,0.7),_inset_2px_2px_0px_rgba(255,255,255,0.3)] cursor-pointer active:translate-y-0.5"
            >
              ✕ CLOSE
            </button>
          </div>

          <div className="relative bg-[#f4e2b8] border-4 border-[#c2965a] shadow-[inset_0_0_45px_rgba(139,94,40,0.38),0_10px_20px_rgba(0,0,0,0.4)] p-4 sm:p-7 text-[#2e1909]">
            <div className="absolute top-1 left-1 right-1 h-1 bg-[#eed3a1]" />
            <div className="absolute bottom-1 left-1 right-1 h-1 bg-[#d1af78]" />
            <div className="absolute top-1 bottom-1 left-1 w-1 bg-[#ebce9b]" />
            <div className="absolute top-1 bottom-1 right-1 w-1 bg-[#d4b17a]" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b-2 border-[#b58c54]/60 pb-4 mb-4">
              <div>
                <span className="font-['Press_Start_2P',monospace] text-[10px] text-[#784617] uppercase tracking-wider block mb-1">
                  {problem.category}
                </span>
                <h2 className="font-['Pixelify_Sans',sans-serif] font-bold text-2xl sm:text-3xl text-[#1f0f03] tracking-tight">
                  {problem.title}
                </h2>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                <span className="font-['Press_Start_2P',monospace] text-[9px] bg-[#deb887] text-[#2e1908] px-2.5 py-1.5 border border-[#855724] shadow-[inset_1px_1px_0px_rgba(255,255,255,0.3)]">
                  DIFFICULTY: {problem.difficulty.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="bg-[#ebdcb9] border-2 border-[#c7a775] p-3 mb-5 text-[#4a280c] italic font-['Pixelify_Sans',sans-serif] text-sm sm:text-base leading-relaxed shadow-[inset_1px_1px_0px_rgba(255,255,255,0.4)]">
              &quot;{problem.lore}&quot;
            </div>

            <div className="flex flex-wrap gap-2 mb-5 border-b-2 border-[#b58c54]/50 pb-3">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`font-['Press_Start_2P',monospace] text-[10px] px-3.5 py-2 cursor-pointer border-t-2 border-l-2 transition-all ${
                  activeTab === 'overview'
                    ? 'bg-[#291507] text-[#fef08a] border-[#4a2e13] border-b-2 border-r-2 border-[#120a03] shadow-[inset_1px_1px_0px_rgba(255,255,255,0.2)]'
                    : 'bg-[#d8bf94] text-[#3d240f] border-[#ebd4ab] border-b-2 border-r-2 border-[#947447] hover:bg-[#e4cca2]'
                }`}
              >
                1. BRIEF
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('objectives')}
                className={`font-['Press_Start_2P',monospace] text-[10px] px-3.5 py-2 cursor-pointer border-t-2 border-l-2 transition-all ${
                  activeTab === 'objectives'
                    ? 'bg-[#291507] text-[#fef08a] border-[#4a2e13] border-b-2 border-r-2 border-[#120a03] shadow-[inset_1px_1px_0px_rgba(255,255,255,0.2)]'
                    : 'bg-[#d8bf94] text-[#3d240f] border-[#ebd4ab] border-b-2 border-r-2 border-[#947447] hover:bg-[#e4cca2]'
                }`}
              >
                2. OBJECTIVES
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('tech')}
                className={`font-['Press_Start_2P',monospace] text-[10px] px-3.5 py-2 cursor-pointer border-t-2 border-l-2 transition-all ${
                  activeTab === 'tech'
                    ? 'bg-[#291507] text-[#fef08a] border-[#4a2e13] border-b-2 border-r-2 border-[#120a03] shadow-[inset_1px_1px_0px_rgba(255,255,255,0.2)]'
                    : 'bg-[#d8bf94] text-[#3d240f] border-[#ebd4ab] border-b-2 border-r-2 border-[#947447] hover:bg-[#e4cca2]'
                }`}
              >
                3. RECIPE
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('rubric')}
                className={`font-['Press_Start_2P',monospace] text-[10px] px-3.5 py-2 cursor-pointer border-t-2 border-l-2 transition-all ${
                  activeTab === 'rubric'
                    ? 'bg-[#291507] text-[#fef08a] border-[#4a2e13] border-b-2 border-r-2 border-[#120a03] shadow-[inset_1px_1px_0px_rgba(255,255,255,0.2)]'
                    : 'bg-[#d8bf94] text-[#3d240f] border-[#ebd4ab] border-b-2 border-r-2 border-[#947447] hover:bg-[#e4cca2]'
                }`}
              >
                4. REWARDS
              </button>
            </div>

            <div className="min-h-[220px] max-h-[50vh] overflow-y-auto pr-2 no-scrollbar">
              {activeTab === 'overview' && (
                <div className="space-y-4 font-['Pixelify_Sans',sans-serif]">
                  <div>
                    <h4 className="font-['Press_Start_2P',monospace] text-[11px] text-[#54300f] uppercase mb-2">
                      Challenge Overview
                    </h4>
                    <p className="text-base sm:text-lg leading-relaxed text-[#211003]">
                      {problem.overview}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-['Press_Start_2P',monospace] text-[11px] text-[#54300f] uppercase mb-2">
                      Expected Deliverables
                    </h4>
                    <ul className="space-y-2">
                      {problem.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-[#291506]">
                          <span className="text-[#a3221c] font-bold mt-0.5">◆</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'objectives' && (
                <div className="space-y-3 font-['Pixelify_Sans',sans-serif]">
                  <h4 className="font-['Press_Start_2P',monospace] text-[11px] text-[#54300f] uppercase mb-3">
                    Mission Milestones
                  </h4>
                  {problem.keyObjectives.map((obj, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 bg-[#ebdbb9] border-2 border-[#c5a574] p-3 shadow-xs"
                    >
                      <span className="w-5 h-5 shrink-0 bg-[#291507] text-[#fef08a] font-['Press_Start_2P',monospace] text-[9px] flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <p className="text-sm sm:text-base text-[#211003] leading-relaxed">
                        {obj}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'tech' && (
                <div className="space-y-4 font-['Pixelify_Sans',sans-serif]">
                  <div>
                    <h4 className="font-['Press_Start_2P',monospace] text-[11px] text-[#54300f] uppercase mb-2">
                      Recommended Tech Ingredients
                    </h4>
                    <p className="text-sm text-[#4d290c] mb-3">
                      Standard evaluation rewards proficiency with these developer technologies:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {problem.techStack.map((tech, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 bg-[#e4d1ab] border border-[#ba9a67] px-3.5 py-2 font-medium text-sm sm:text-base text-[#241305]"
                        >
                          <span className="w-2.5 h-2.5 bg-[#10b981] border border-[#065f46]" />
                          <span>{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'rubric' && (
                <div className="space-y-4 font-['Pixelify_Sans',sans-serif]">
                  <div>
                    <h4 className="font-['Press_Start_2P',monospace] text-[11px] text-[#54300f] uppercase mb-3">
                      Scoring Matrix
                    </h4>
                    <div className="space-y-2.5">
                      {problem.rubric.map((r, idx) => (
                        <div key={idx} className="bg-[#ebdbb9] border border-[#c2a270] p-3">
                          <div className="flex justify-between items-center text-sm sm:text-base mb-1.5 text-[#211003] font-semibold">
                            <span>{r.criterion}</span>
                            <span className="font-['Press_Start_2P',monospace] text-[10px] text-[#784617]">
                              {r.weight}%
                            </span>
                          </div>
                          <div className="w-full h-3.5 bg-[#c2a472] border-2 border-[#7a572a] relative">
                            <div
                              className="h-full bg-gradient-to-r from-[#15803d] to-[#22c55e] border-r-2 border-[#14532d]"
                              style={{ width: `${r.weight * 2.5}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#1f1003] border-2 border-[#5c3713] p-3.5 text-[#ffeed1] mt-4 shadow-[inset_2px_2px_0px_rgba(255,255,255,0.1)]">
                    <span className="font-['Press_Start_2P',monospace] text-[9px] text-[#fde047] block mb-1">
                      CHEST BOUNTY REWARD:
                    </span>
                    <p className="text-sm sm:text-base text-[#fef3c7]">
                      {problem.bountyReward}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t-2 border-[#b58c54]/60 flex flex-wrap items-center justify-between gap-3">
              <span className="font-['Press_Start_2P',monospace] text-[9px] text-[#633a14]">
                HACKFUSION 4.0 · SWAG GDG
              </span>
              <div className="flex items-center gap-3">
                <MinecraftButton
                  onClick={onClose}
                  variant="wood"
                  className="text-[10px] py-2 px-4"
                >
                  Accept & Close
                </MinecraftButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
