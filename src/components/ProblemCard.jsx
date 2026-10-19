function ProblemCard({ title, track, image, description, onSelect }) {
  return (
    <article
      data-track={track}
      className="flex flex-col md:flex-row items-center md:items-stretch gap-[18px] md:gap-6 bg-[#F4E2B1] bg-[radial-gradient(circle_at_50%_50%,#FAF1D6_15%,#F4E2B1_50%,#DEC78E_100%)] border-4 border-[#825F2E] shadow-[inset_4px_4px_0px_#FFF7DF,inset_-4px_-4px_0px_#BF9F5B,4px_4px_0px_rgba(0,0,0,0.5),-2px_-2px_0px_#573E1E] [clip-path:polygon(0%_6px,6px_6px,6px_0%,calc(100%-6px)_0%,calc(100%-6px)_6px,100%_6px,100%_calc(100%-6px),calc(100%-6px)_calc(100%-6px),calc(100%-6px)_100%,6px_100%,6px_calc(100%-6px),0%_calc(100%-6px))] py-[18px] px-3.5 md:p-6 w-full max-w-full"
    >
      <div className="w-[150px] h-[150px] min-w-[150px] min-h-[150px] bg-[#24140A] border-[6px] border-[#4A2711] shadow-[inset_3px_3px_0px_#7A431F,inset_-3px_-3px_0px_#150903,0_4px_8px_rgba(0,0,0,0.4)] flex items-center justify-center box-border shrink-0 [image-rendering:pixelated] [&_img]:w-full [&_img]:max-w-3xl [&_img]:object-contain [&_img]:mx-auto [&_img]:max-h-[50vh]">
        {image}
      </div>
      <div className="flex flex-col flex-1 w-full items-center md:items-start text-center md:text-left">
        <span className="text-[#8C4308] [text-shadow:1px_1px_0px_#FCEECB] text-[13px] leading-[1.5] mb-3 tracking-[0.5px]">
          [ TRACK: <span>{track}</span> ]
        </span>
        <h3 className="text-[#261306] [text-shadow:1px_1px_0px_#F9E7BA] text-[13px] md:text-base leading-[1.5] mb-3.5 font-normal">
          {title}
        </h3>
        <p className="text-[#381F0C] [text-shadow:1px_1px_0px_#F8E5B4] text-[10px] md:text-[11px] leading-[1.7] md:leading-[1.8] mb-5">
          {description}
        </p>
        <div className="flex justify-center md:justify-end w-full mt-auto">
          <button
            type="button"
            onClick={onSelect}
            className="w-full md:w-auto bg-[#B56F30] border-[3px] border-[#331A0B] shadow-[inset_2px_2px_0px_#E59B5B,inset_-2px_-2px_0px_#703E14,0_3px_0px_#241206] text-white [text-shadow:2px_2px_0px_#241206] text-[13px] px-6 py-3 cursor-pointer outline-none select-none transition-colors duration-100 hover:bg-[#C67E3C] hover:text-[#FFFF55] active:shadow-[inset_-2px_-2px_0px_#E59B5B,inset_2px_2px_0px_#703E14,0_1px_0px_#241206] active:translate-y-[2px]"
          >
            SELECT
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProblemCard;
