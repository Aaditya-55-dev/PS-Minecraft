import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import faqChargedCreeper from "../assets/digvijay's_assets/faq-charged-creeper.webp";
import faqDirtBackground from "../assets/digvijay's_assets/faq-dirt-background.jpg";
import faqTabSandTexture from "../assets/digvijay's_assets/faq-tab-sand-texture.webp";
import Navbar from "../components/Navbar"

const questions = [
  {
    question: "What is HackFusion 3?",
    answer: "HackFusion 3 is a national 36-hour hackathon running from 29th to 31st December.",
  },
  {
    question: "What is the registration fee and refund policy?",
    answer: "The fee is ₹749 per team and includes food. Teams not selected for Stage 2 get a refund; participant-initiated cancellations are not refundable.",
  },
  {
    question: "How do we pay the registration fee?",
    answer: "Pay using the QR code on the Account Details page. Keep your payment screenshot and UTR number, and upload the screenshot when requested.",
  },
  {
    question: "What are the stages of the hackathon?",
    answer: "Stage 1 is abstract submission and PPT-based selection (PPT optional). Stage 2 is the grand finale at SGGSIE&T, Nanded, Maharashtra.",
  },
  {
    question: "What should we bring to the hackathon?",
    answer: "Bring a laptop and charger, phone, headphones, notebook and pen, USB drive, ID, water bottle, medicines, backup drive or USB hub, snacks, comfortable clothes, nap essentials, toiletries, and required software installed.",
  },
  {
    question: "Which academic years and branches can participate?",
    answer: "Students from any academic year and branch can participate.",
  },
  {
    question: "Is a girl team member compulsory?",
    answer: "No.",
  },
  {
    question: "Are a PPT or abstract required?",
    answer: "An abstract is required; a PPT is optional. Explain your approach to solving the problem statement.",
  },
  {
    question: "What is the last date to register?",
    answer: "The stated deadline is yet to be decleared",
  },
  {
    question: "Can we leave the venue during the hackathon?",
    answer: "Only in an emergency.",
  },
  {
    question: "Can we use ChatGPT during the competition?",
    answer: "Yes. You may use open-source tools, but make sure you understand your solution and approach.",
  },
  {
    question: "What do winning teams get besides prize money?",
    answer: "Benefits include skill development, networking, portfolio and career growth, personal growth, and internship opportunities.",
  },
  {
    question: "Will there be sleeping or rest areas?",
    answer: "Yes.",
  },
  {
    question: "Will reliable internet be available?",
    answer: "Yes, internet will be available.",
  },
  {
    question: "Can teammates be from different colleges?",
    answer: "Yes, participants from different colleges can form a team.",
  },
  {
    question: "I didn't receive an OTP email. What should I do?",
    answer: "Check your spam folder or contact the organizers.",
  },
  {
    question: "What will the problem statement be like?",
    answer: "Check the official problem statement for details.",
  },
  {
    question: "Will refreshments and breakfast be provided?",
    answer: "Yes, refreshments and breakfast will be provided at regular intervals.",
  },
  {
    question: "Is lunch and dinner included in the registration fee?",
    answer: "Yes, meals are included in the registration fee.",
  },
  {
    question: "Can I get a refund?",
    answer: "You can get a refund if your team is not selected for Stage 2.",
  },
];

// little glowing "XP orbs" floating in the background
const ORBS = [
  { l: "6%", t: "28%", s: 8, d: 0 },
  { l: "92%", t: "35%", s: 10, d: 1.2 },
  { l: "14%", t: "62%", s: 6, d: 0.6 },
  { l: "88%", t: "72%", s: 8, d: 2 },
  { l: "48%", t: "18%", s: 6, d: 1.8 },
  { l: "72%", t: "84%", s: 10, d: 0.3 },
  { l: "30%", t: "88%", s: 6, d: 1.5 },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

/* grass strip hanging from the top of the section */
.faq-grass {
  position: absolute;
  inset: 0 0 auto 0;
  height: 28px;
  z-index: 3;
  pointer-events: none;
  background-repeat: no-repeat;
  background-position: top left;
  background-image:
    linear-gradient(#6fc443, #6fc443),
    repeating-linear-gradient(90deg, #4e9a2c 0 16px, transparent 16px 44px),
    repeating-linear-gradient(90deg, transparent 0 24px, #4e9a2c 24px 40px, transparent 40px 72px);
  background-size: 100% 14px, 100% 22px, 100% 28px;
}

/* stone-ish scroll bar */
.faq-scroll { scrollbar-width: thin; scrollbar-color: #8b8b8b #111; }
.faq-scroll::-webkit-scrollbar { width: 16px; }
.faq-scroll::-webkit-scrollbar-track { background: #111; border: 2px solid #000; }
.faq-scroll::-webkit-scrollbar-thumb {
  background: #8b8b8b;
  border: 3px solid #000;
  box-shadow: inset 3px 3px 0 #c6c6c6, inset -3px -3px 0 #555;
}

/* question panel */
.faq-card {
  position: relative;
  border: 4px solid #000;
  background-image:
    linear-gradient(180deg, rgba(60,36,16,.55), rgba(30,18,8,.68)),
    var(--tex);
  background-size: auto, 900px;
  background-position: center;
  box-shadow:
    inset 4px 4px 0 rgba(255,235,190,.28),
    inset -4px -4px 0 rgba(0,0,0,.4),
    0 8px 0 rgba(0,0,0,.5);
  transition: filter .15s steps(3), box-shadow .15s steps(3);
}
.faq-card:hover { filter: brightness(1.15); }
.faq-card.is-open {
  box-shadow:
    inset 4px 4px 0 rgba(255,235,190,.35),
    inset -4px -4px 0 rgba(0,0,0,.4),
    0 0 0 4px #7cfc00,
    0 8px 0 4px rgba(0,0,0,.5);
}

.faq-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 14px;
  text-align: left;
  background: transparent;
  border: 0;
  color: #fff;
  font: inherit;
  font-size: 11px;
  line-height: 1.7;
  text-shadow: 2px 2px 0 #000;
  cursor: pointer;
}
.faq-btn:focus-visible { outline: 3px solid #ffe48a; outline-offset: -6px; }
@media (min-width: 640px) {
  .faq-btn { font-size: 13px; padding: 18px 20px; gap: 16px; }
}

/* green "XP" number badge */
.faq-badge {
  flex-shrink: 0;
  min-width: 40px;
  padding: 9px 6px 7px;
  text-align: center;
  font-size: 10px;
  color: #fff;
  background: #5cb82b;
  border: 3px solid #000;
  box-shadow: inset 3px 3px 0 #9be35f, inset -3px -3px 0 #347a12;
  text-shadow: 2px 2px 0 #1f4a0a;
}

/* +/- button */
.faq-toggle {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  font-size: 16px;
  color: #fff;
  background: #8b8b8b;
  border: 4px solid #000;
  box-shadow: inset 3px 3px 0 #c6c6c6, inset -3px -3px 0 #555;
  text-shadow: 2px 2px 0 #3f3f3f;
}
.faq-btn:hover .faq-toggle { background: #7b8fd1; }

/* answer shown as an item tooltip */
.faq-tip {
  margin: 0 14px 16px;
  padding: 14px;
  font-size: 10px;
  line-height: 2;
  color: #fff;
  background: rgba(16, 0, 16, .94);
  border: 4px solid #1b0540;
  box-shadow: inset 0 0 0 2px #4b1d9c, 0 0 0 3px #100010;
  text-shadow: 2px 2px 0 #3f3f3f;
}
@media (min-width: 640px) {
  .faq-tip { margin: 0 20px 20px; padding: 18px; font-size: 12px; }
}

/* XP bar (scroll progress) */
.faq-xp-track {
  position: relative;
  height: 16px;
  overflow: hidden;
  background: #1b1b1b;
  border: 3px solid #000;
  box-shadow: inset 0 0 0 2px #3a3a3a;
}
.faq-xp-fill {
  position: absolute;
  inset: 0;
  transform-origin: left center;
  background: repeating-linear-gradient(90deg, #8ff03a 0 10px, #4fa81c 10px 12px);
}
.faq-lvl {
  display: block;
  margin-bottom: 6px;
  text-align: center;
  font-size: 14px;
  color: #80ff20;
  text-shadow: 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000;
}
`;

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const [level, setLevel] = useState(0);
  const reduceMotion = useReducedMotion();
  const scrollRef = useRef(null);

  // scroll progress of the inner list drives the XP bar + creeper parallax
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const creeperY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setLevel(Math.round(v * questions.length))
  );

  return (
    <section
      className="relative isolate h-svh overflow-hidden bg-[#1f3a1a] text-white [font-family:'Press_Start_2P',monospace]"
      aria-labelledby="faq-title"
    >
      <style>{CSS}</style>

      <Navbar/>
      {/* backdrop */}
      <img
        className="pointer-events-none absolute inset-0 z-[-1] h-full w-full object-cover object-center"
        src={faqDirtBackground}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        draggable="false"
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(0,0,0,.35),rgba(0,0,0,.65))]"
        aria-hidden="true"
      />
      <div className="faq-grass" aria-hidden="true" />

      {/* floating XP orbs */}
      {!reduceMotion &&
        ORBS.map((o, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute z-0 bg-[#b6f23c] shadow-[0_0_10px_#8ff03a]"
            style={{ left: o.l, top: o.t, width: o.s, height: o.s }}
            animate={{ y: [0, -30, 0], opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 4 + o.d, repeat: Infinity, ease: "easeInOut", delay: o.d }}
            aria-hidden="true"
          />
        ))}

      {/* charged creeper drifts up as you scroll the list */}
      <motion.img
        className="pointer-events-none absolute bottom-0 left-[clamp(8rem,16vw,15rem)] z-0 hidden w-[clamp(145px,16vw,250px)] select-none md:block [filter:drop-shadow(0_14px_18px_rgba(0,0,0,.72))_drop-shadow(0_0_24px_rgba(31,255,143,.28))]"
        style={{ y: reduceMotion ? 0 : creeperY, scaleX: -1 }}
        src={faqChargedCreeper}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        draggable="false"
      />

      <div className="relative z-[1] mx-auto flex h-full w-full max-w-[1100px] flex-col px-4 pb-4 pt-[clamp(3rem,8vh,5rem)] sm:px-8  mt-5 md:mt-17">
        {/* heading */}
        <motion.div
          className="shrink-0"
          initial={reduceMotion ? false : { opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="mb-3 text-[9px] tracking-[.2em] text-[#ffcb66] [text-shadow:2px_2px_#2b160c] sm:text-xs">
            HACKFUSION 3 · FIELD GUIDE
          </p>
          <h2
            id="faq-title"
            className="mb-5 text-[clamp(1rem,3.6vw,2.4rem)] leading-[1.4] text-[#fff4dc] [text-shadow:4px_4px_0_#35190d,0_8px_22px_rgba(0,0,0,.45)]"
          >
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* list */}
        <div
          ref={scrollRef}
          className="faq-scroll min-h-0 flex-1 overflow-x-hidden overscroll-y-contain pb-3 pl-1 pr-3 pt-1"
          data-lenis-prevent
        >
          <div className="grid gap-4 pb-3 sm:gap-5">
            {questions.map(({ question, answer }, index) => {
              const isOpen = openIndex === index;
              const answerId = `faq-answer-${index + 1}`;
              return (
                <motion.article
                  key={question}
                  className={`faq-card ${isOpen ? "is-open" : ""}`}
                  style={{ "--tex": `url("${faqTabSandTexture}")` }}
                  initial={reduceMotion ? false : { opacity: 0, x: index % 2 ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ root: scrollRef, once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  whileHover={reduceMotion ? undefined : { x: 6 }}
                >
                  <h3 className="m-0">
                    <button
                      className="faq-btn"
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span className="faq-badge">{String(index + 1).padStart(2, "0")}</span>
                      <span className="min-w-0 flex-1">{question}</span>
                      <span className="faq-toggle" aria-hidden="true">
                        {isOpen ? "-" : "+"}
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="overflow-hidden"
                        id={answerId}
                        key="answer"
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeOut" }}
                      >
                        <p className="faq-tip">{answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* XP bar = how far you've scrolled, level = questions read */}
        <div className="mt-4 shrink-0" aria-hidden="true">
          <span className="faq-lvl">{level}</span>
          <div className="faq-xp-track">
            <motion.div className="faq-xp-fill" style={{ scaleX: scrollYProgress }} />
          </div>
        </div>
      </div>
    </section>
  );
}