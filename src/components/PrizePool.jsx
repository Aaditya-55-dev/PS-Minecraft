import { motion } from "motion/react";
import UnderwaterEffects from "../components/UnderwaterEffects.jsx";
import bgImage from "../assets/minecraft_coral_ocean.webp";
import parchmentCardImg from "../assets/parchment_card.webp";

import diamondIcon from "../assets/icons/diamond.webp";
import paperIcon from "../assets/icons/paper.webp";
import bedIcon from "../assets/icons/bed.webp";
import enchantedBookIcon from "../assets/icons/enchanted_book.webp";
import beaconIcon from "../assets/icons/beacon.webp";
import enderChestIcon from "../assets/icons/ender_chest.webp";
import elytraIcon from "../assets/icons/elytra.webp";
import goldenAppleIcon from "../assets/icons/golden_apple.webp";
import pickaxeIcon from "../assets/icons/pickaxe.webp";
import compassIcon from "../assets/icons/compass.webp";
import emeraldIcon from "../assets/icons/emerald.webp";
import clockIcon from "../assets/icons/clock.webp";
import totemIcon from "../assets/icons/totem.webp";

/* ------------------------------------------------------------------ */
/*  Fonts + shared styles                                              */
/*  PIXEL = titles & numbers only. BODY = everything you read.         */
/* ------------------------------------------------------------------ */
const PIXEL = "font-['Press_Start_2P']";
const BODY = "font-['VT323']";

const TILE =
  "border-2 border-[#8f5e30] bg-[#e8c88e]/95 shadow-[inset_1px_1px_0_rgba(255,250,230,0.85),0_2px_4px_rgba(60,35,10,0.15)]";
const ICON_BOX =
  "flex items-center justify-center border-2 border-[#5c371a] bg-[#2d1b0f] shadow-[inset_1px_1px_0_rgba(0,0,0,0.5)]";
const ICON_IMG = "object-contain [image-rendering:pixelated]";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */
const SPECIAL_PRIZES = [
  { icon: totemIcon, alt: "Totem of Undying", text: "Special prize for specially-abled teams.", note: "(Min 2 in team)" },
  { icon: goldenAppleIcon, alt: "Golden Apple", text: "Special prize for all-girls teams.", note: "(100% girls Team)" },
];

const INFO_CARDS = [
  {
    icon: emeraldIcon,
    alt: "Emerald",
    title: "Great Community",
    titleColor: "text-[#15803d]",
    from: "left",
    text: "Embark on a journey of collaboration and knowledge exchange. Seize networking opportunities with enthusiasts and industry experts. Create lasting connections that propel your success!",
  },
  {
    icon: clockIcon,
    alt: "Clock",
    title: "36+ Hours",
    titleColor: "text-[#b45309]",
    from: "right",
    text: "Two days of intense brainstorming and coding. Dynamic discussions, exchange ideas with top professionals, and harness collaborative problem-solving.",
  },
];

const PERKS = [
  { title: "₹2,30,000 Prize Pool", desc: "Top ranking team awards", icon: diamondIcon, rarity: "Diamond", color: "#0284c7" },
  { title: "Certificate", desc: "Official participation proof", icon: paperIcon, rarity: "Credential", color: "#b45309" },
  { title: "Free Accommodation", desc: "Stay for the full 36 hours", icon: bedIcon, rarity: "Stay", color: "#dc2626" },
  { title: "Skill Development", desc: "Workshops & mentor support", icon: enchantedBookIcon, rarity: "Experience", color: "#9333ea" },
  { title: "Networking", desc: "Connect with sponsors & peers", icon: beaconIcon, rarity: "Network", color: "#0d9488" },
  { title: "Portfolio Enhancement", desc: "Showcase real projects", icon: enderChestIcon, rarity: "Portfolio", color: "#7c3aed" },
  { title: "Career Advancement", desc: "Fast-track interviews", icon: elytraIcon, rarity: "Career", color: "#c2410c" },
  { title: "Personal Growth", desc: "Push your limits", icon: goldenAppleIcon, rarity: "Growth", color: "#ca8a04" },
  { title: "Internship Opportunity", desc: "Exclusive recruiter rounds", icon: pickaxeIcon, rarity: "Internship", color: "#0369a1" },
  { title: "Mentorship", desc: "Guidance from industry leaders", icon: compassIcon, rarity: "Mentorship", color: "#16a34a" },
];

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */
const OFFSETS = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: -24 },
  right: { x: 24 },
};

function Reveal({ children, delay = 0, from = "up", className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...OFFSETS[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: delay / 1000, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ParchmentCard({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative h-full bg-[length:100%_100%] bg-no-repeat [filter:drop-shadow(0_14px_32px_rgba(1,14,28,0.72))_drop-shadow(0_2px_8px_rgba(0,0,0,0.45))] ${className}`}
      style={{ backgroundImage: `url(${parchmentCardImg})` }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */
export default function PrizePool() {
  return (
    <section
      id="prizes"
      className="relative select-none overflow-x-clip px-2.5 text-[#ede5da] selection:bg-[#55ff55] selection:text-black sm:px-5"
    >
      {/* Fonts (cleaner long-term: put this link in index.html and delete it here) */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap"
      />

      {/* Background: a screen-sized layer pinned while the section scrolls.
          Never stretched over the whole section, so it stays sharp when zooming. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
          <img
            src={bgImage}
            alt=""
            draggable={false}
            className="h-full w-full object-cover object-[center_40%] [filter:brightness(1.15)_contrast(1.02)_saturate(1.06)]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(30,120,180,0.12)_0%,transparent_70%)]" />
          <UnderwaterEffects />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto w-full max-w-[840px] space-y-5 px-1.5 py-10 sm:space-y-6 sm:px-4 sm:py-14">
        {/* Title */}
        <Reveal from="down">
          <div className="space-y-3 text-center">
            <h2
              className={`${PIXEL} text-[22px] uppercase leading-tight tracking-wider text-[#ffd54f] [text-shadow:3px_3px_0_#422006,5px_5px_0_#051829] sm:text-[40px] md:text-[52px]`}
            >
              Perks &amp; Prizes
            </h2>
            <p
              className={`${BODY} text-lg uppercase tracking-widest text-[#c5ecf8] [text-shadow:2px_2px_0_#1f1f1f] sm:text-2xl`}
            >
              HackFusion 4 — what awaits your squad
            </p>
          </div>
        </Reveal>

        {/* Prize pool */}
        <Reveal delay={80}>
          <ParchmentCard className="px-6 py-7 text-[#2b1608] sm:px-12 sm:py-9 md:px-14 md:py-10">
            <div className="flex flex-col items-center text-center">
              <div className="mb-2 inline-flex items-center gap-2 border-2 border-[#5c371a] bg-[#2d1b0f] px-3 py-1 shadow-[inset_1px_1px_0_rgba(255,240,200,0.2),0_2px_6px_rgba(0,0,0,0.35)] sm:px-4">
                <img src={diamondIcon} alt="" className={`h-4 w-4 sm:h-6 sm:w-6 ${ICON_IMG}`} />
                <span
                  className={`${PIXEL} text-[8px] uppercase tracking-widest text-[#55ffff] [text-shadow:2px_2px_0_#093f38] sm:text-xs`}
                >
                  Prize pool
                </span>
              </div>

              <div
                className={`${PIXEL} my-3 text-3xl tracking-wider text-[#5c2d0f] [text-shadow:2px_2px_0_rgba(180,130,60,0.45),4px_4px_0_rgba(90,50,15,0.2)] sm:text-5xl md:text-6xl`}
              >
                ₹2,30,000
              </div>
              <div
                className={`${BODY} mb-4 text-lg font-bold uppercase tracking-[0.25em] text-[#5c371a] [text-shadow:1px_1px_0_rgba(255,245,215,0.85)] sm:mb-5 sm:text-xl`}
              >
                Total awards
              </div>

              <div className="grid w-full grid-cols-1 gap-2.5 border-t-2 border-[#8f5e30]/40 px-1 pt-4 sm:grid-cols-2 sm:gap-4 sm:px-3 sm:pt-5">
                {SPECIAL_PRIZES.map((p) => (
                  <div key={p.alt} className={`flex items-center gap-3 p-3 text-left ${TILE}`}>
                    <img src={p.icon} alt={p.alt} className={`h-8 w-8 shrink-0 ${ICON_IMG}`} />
                    <p className={`${BODY} text-base font-bold leading-tight text-[#2b1608] sm:text-lg`}>
                      {p.text} <span className="text-[#b45309]">{p.note}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ParchmentCard>
        </Reveal>

        {/* Community + Hours */}
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-5">
          {INFO_CARDS.map((c) => (
            <Reveal key={c.title} from={c.from} delay={50} className="h-full">
              <ParchmentCard className="flex min-h-[170px] flex-col justify-start px-6 py-7 text-[#2b1608] sm:min-h-[210px] sm:px-8 sm:py-8 md:px-10 md:py-9">
                <div className="mb-3 flex items-center gap-2 border-b-2 border-[#8f5e30]/40 pb-3 pt-1 sm:pt-0">
                  <img src={c.icon} alt={c.alt} className={`h-6 w-6 shrink-0 sm:h-7 sm:w-7 ${ICON_IMG}`} />
                  <h3
                    className={`${PIXEL} text-[10px] uppercase tracking-wide [text-shadow:1px_1px_0_rgba(255,245,215,0.85)] sm:text-xs ${c.titleColor}`}
                  >
                    {c.title}
                  </h3>
                </div>
                <p className={`${BODY} px-1 text-base leading-snug text-[#3a200f] sm:text-lg`}>{c.text}</p>
              </ParchmentCard>
            </Reveal>
          ))}
        </div>

        {/* Squad pass */}
        <Reveal delay={80}>
          <div id="squad-pass" className="w-full">
            <ParchmentCard className="px-5 py-7 text-[#2b1608] sm:px-10 sm:py-9 md:px-12 md:py-10">
              <div className="mb-4 flex flex-col items-center border-b-2 border-[#8f5e30]/40 pb-4 pt-8 text-center sm:pt-6">
                <div
                  className={`${PIXEL} text-3xl tracking-wider text-[#5c2d0f] [text-shadow:2px_2px_0_rgba(180,130,60,0.45),4px_4px_0_rgba(90,50,15,0.2)] sm:text-5xl md:text-6xl`}
                >
                  ₹749/-
                </div>
                <div
                  className={`${BODY} mt-2 text-lg uppercase tracking-widest text-[#5c371a] [text-shadow:1px_1px_0_rgba(255,245,215,0.85)] sm:text-xl`}
                >
                  [ 100% refundable ]
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 px-0.5 sm:gap-3.5 sm:px-2">
                {PERKS.map((perk, i) => (
                  <Reveal key={perk.title} delay={i * 30} className="h-full">
                    <div
                      className={`group flex h-full min-h-[84px] cursor-default flex-col gap-2 p-2.5 transition-[transform,background-color,border-color] hover:-translate-y-0.5 hover:border-[#b45309] hover:bg-[#edd29b] sm:min-h-[88px] sm:flex-row sm:items-center sm:gap-3 sm:p-3 ${TILE}`}
                    >
                      <div
                        className={`h-9 w-9 shrink-0 transition-colors group-hover:border-[#d97706] sm:h-12 sm:w-12 ${ICON_BOX}`}
                      >
                        <img src={perk.icon} alt="" className={`h-5 w-5 sm:h-7 sm:w-7 ${ICON_IMG}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span
                          className={`${BODY} block text-sm font-bold uppercase tracking-wider sm:text-base`}
                          style={{ color: perk.color }}
                        >
                          {perk.rarity}
                        </span>
                        <h4
                          className={`${PIXEL} mt-0.5 text-[8px] leading-[1.5] text-[#241306] transition-colors group-hover:text-[#b45309] sm:text-[10px]`}
                        >
                          {perk.title}
                        </h4>
                        <p className={`${BODY} mt-1 text-sm leading-tight text-[#523319] sm:text-base`}>
                          {perk.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </ParchmentCard>
          </div>
        </Reveal>
      </div>
    </section>
  );
}