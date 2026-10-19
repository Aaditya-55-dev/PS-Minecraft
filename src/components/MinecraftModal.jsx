import { useRef, useEffect } from 'react';

function MinecraftModal({ selectedTrack, onClose, onConfirm }) {
  const modalContainerRef = useRef(null);

  useEffect(() => {
    if (modalContainerRef.current) {
      modalContainerRef.current.focus();
    }
  }, []);

  if (!selectedTrack) {
    return null;
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(selectedTrack);
    }
  };

  return (
    <div
      ref={modalContainerRef}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
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
            className="w-[30px] h-[30px] md:w-9 md:h-9 min-w-[30px] min-h-[30px] md:min-w-[36px] md:min-h-[36px] bg-[#C9302C] border-2 border-black shadow-[inset_2px_2px_0px_#FF6662,inset_-2px_-2px_0px_#631210,0_3px_0px_#241206] text-white text-[13px] md:text-base flex items-center justify-center cursor-pointer select-none transition-colors duration-100 leading-none p-0 hover:bg-[#E2433E] active:shadow-[inset_-2px_-2px_0px_#FF6662,inset_2px_2px_0px_#631210] active:translate-y-[2px]"
            onClick={onClose}
            aria-label="Close modal"
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
            className="w-full md:w-auto bg-[#8B8B8B] border-[3px] border-[#1E1E1E] shadow-[inset_2px_2px_0px_#D8D8D8,inset_-2px_-2px_0px_#4A4A4A,0_3px_0px_#241206] text-white [text-shadow:2px_2px_0px_#3F3F3F] text-[13px] px-6 py-3 cursor-pointer outline-none select-none transition-colors duration-100 hover:bg-[#9C9C9C] active:shadow-[inset_-2px_-2px_0px_#D8D8D8,inset_2px_2px_0px_#4A4A4A,0_1px_0px_#241206] active:translate-y-[2px]"
            onClick={onClose}
          >
            CLOSE
          </button>
          <button
            type="button"
            className="w-full md:w-auto bg-[#4E933B] border-[3px] border-[#1B4512] shadow-[inset_2px_2px_0px_#79C265,inset_-2px_-2px_0px_#295C1E,0_3px_0px_#241206] text-white [text-shadow:2px_2px_0px_#1B4512] text-[13px] px-6 py-3 cursor-pointer outline-none select-none transition-colors duration-100 hover:bg-[#5CA846] hover:text-[#FFFF55] active:shadow-[inset_-2px_-2px_0px_#79C265,inset_2px_2px_0px_#295C1E,0_1px_0px_#241206] active:translate-y-[2px]"
            onClick={handleConfirm}
          >
            CONFIRM SELECTION
          </button>
        </div>
      </div>
    </div>
  );
}

export default MinecraftModal;
