const VENUE = {
  name: "Shri Guru Gobind Singhji Institute of Engineering and Technology",
  address: "Vishnupuri, Nanded 431-606",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Shri+Guru+Gobind+Singhji+Institute+of+Engineering+and+Technology+Vishnupuri+Nanded",
};

const PIXEL_FONT = "font-['Press_Start_2P',monospace]";

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#79C9F2]";

const MOB_PATH = "/images/mobs";
const MAP_IMAGE = "/images/footer/map.png";

function VenueCard() {
  return (
    <section
      aria-labelledby="footer-venue-heading"
      className="flex w-full flex-col items-start justify-center"
    >
      <h3
        id="footer-venue-heading"
        className={`${PIXEL_FONT} mb-2 text-xs leading-[1.8] text-[#F2C14E] [text-shadow:2px_2px_0_#151A17] sm:text-sm`}
      >
        VENUE LOCATION
      </h3>

      <p className="max-w-2xl break-words text-sm font-semibold leading-6 text-white [text-shadow:1px_1px_2px_#151A17] sm:text-base">
        {VENUE.name}
      </p>

      <p className="mt-1 text-sm leading-6 text-[#F5F2E8] [text-shadow:1px_1px_2px_#151A17] sm:text-base">
        {VENUE.address}
      </p>

      <a
        href={VENUE.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open SGGS Institute of Engineering and Technology in Google Maps (opens in a new tab)"
        className={`${PIXEL_FONT} ${FOCUS_RING} mt-3 inline-flex max-w-full items-center gap-2 border-[3px] border-[#263D2A] bg-[#5E9C45] px-3 py-2.5 text-[7px] leading-[2] text-[#F5F2E8] shadow-[3px_3px_0_0_#151A17] transition-colors hover:bg-[#F2C14E] hover:text-[#151A17] motion-reduce:transition-none sm:px-4 sm:text-[8px]`}
      >
        OPEN IN GOOGLE MAPS
        <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate w-full overflow-hidden bg-[#151A17]">
      {/* Bedrock background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/footer/bedrock-footer-background.webp')",
        }}
      />

      {/* Dark overlay for readable text */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[#151A17]/35"
      />

      {/* Main footer content */}
      <div className="mx-auto max-w-[1400px] px-5 pb-3 pt-3 sm:px-8 sm:pb-4 sm:pt-4">
        {/* Community heading */}
        {/* Community heading — wider and larger without extra padding */}
<div className="mx-auto w-full max-w-[1400px] text-center">
  <img
    src={`${MOB_PATH}/Ender_Dragon.gif`}
    alt=""
    aria-hidden="true"
    className="mx-auto mb-1 h-12 w-16 object-contain sm:h-14 sm:w-20 md:h-16 md:w-24"
  />

  <p
    className={`${PIXEL_FONT} mb-1 text-[8px] leading-tight text-[#A8E063] [text-shadow:1px_1px_2px_#151A17] sm:text-[9px]`}
  >
    BUILD YOUR NEXT ADVENTURE
  </p>

  <h2
    className={`${PIXEL_FONT} text-base leading-[1.5] text-[#FFD966] [text-shadow:2px_2px_0_#151A17] sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl`}
  >
    JOIN THE COMMUNITY
  </h2>

  <p
    className={`${PIXEL_FONT} mx-auto mt-1 w-full max-w-5xl text-[8px] leading-tight text-white [text-shadow:1px_1px_2px_#151A17] sm:text-[9px] md:text-[10px]`}
  >
    BUILD. COLLABORATE. CREATE SOMETHING LEGENDARY.
  </p>
</div>

        {/* Map, venue, and walking Iron Golem */}
        <div className="mx-auto mt-3 grid max-w-[1350px] grid-cols-1 items-center gap-4 sm:mt-4 sm:gap-5 md:grid-cols-[250px_minmax(0,1fr)] md:gap-7 lg:grid-cols-[280px_minmax(0,1fr)_220px] lg:gap-8 xl:grid-cols-[310px_minmax(0,1fr)_260px] xl:gap-10">
          {/* Minecraft map */}
          <div className="relative mx-auto w-full max-w-[205px] sm:max-w-[235px] md:max-w-[250px] lg:max-w-[275px] xl:max-w-[300px]">
            <img
              src={MAP_IMAGE}
              alt="Minecraft world map featuring forests, mountains, snowy biomes, and desert terrain"
              className="block h-auto w-full object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.45)]"
              loading="lazy"
            />

            {/* Clickable venue marker */}
            <a
              href={VENUE.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View SGGS Institute of Engineering and Technology on Google Maps"
              className={`${FOCUS_RING} group absolute left-[58%] top-[48%] z-10 flex -translate-x-1/2 -translate-y-full flex-col items-center`}
            >
              <div className="relative flex h-8 w-8 items-center justify-center border-[3px] border-[#151A17] bg-[#ee3c3f] shadow-[3px_3px_0_#795438] transition-transform group-hover:-translate-y-1 sm:h-9 sm:w-9">
                <div className="h-3 w-3 border-2 border-[#151A17] bg-[#C33B32] sm:h-4 sm:w-4" />
              </div>

              <div className="-mt-1 h-3 w-3 rotate-45 border-b-[3px] border-r-[3px] border-[#151A17] bg-[#e02841]" />
            </a>
          </div>

          {/* Venue details */}
          <div className="min-w-0 py-1 md:py-0">
            <VenueCard />
          </div>
          
        </div>
      </div>

      {/* Copyright integrated into the same footer */}
      <div className="border-t border-white/15 bg-[#151A17]/90">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-2 px-5 py-2 sm:flex-row sm:px-8 sm:py-3 sm:text-left">
          <p
            className={`${PIXEL_FONT} text-[6px] leading-[2] text-[#F5F2E8] sm:text-[7px]`}
          >
            © {year} HACKFUSION. ALL RIGHTS RESERVED.
          </p>

          {/* Larger frog GIF */}
          <img
            src={`${MOB_PATH}/frog.gif`}
            alt=""
            aria-hidden="true"
            className="h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12"
            loading="lazy"
          />

          <p
            className={`${PIXEL_FONT} text-[6px] leading-[2] text-[#A8E063] sm:text-[7px]`}
          >
            MADE WITH BLOCKS
          </p>
        </div>
      </div>
    </footer>
  );
}