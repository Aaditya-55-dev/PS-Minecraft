import { useEffect, useState } from "react";

/* ------------------------------------------------------------------
   ASSETS  (this file lives in src/pages, so every path starts with ../assets)
   src/assets/characters-clean/   -> the 3 character pngs
   src/assets/pageassets-clean/   -> the Minecraft page art
------------------------------------------------------------------ */
import khushwantImage from "../assets/characters-clean/khushwant.png";
import hrishikeshImage from "../assets/characters-clean/hrishikesh.png";
import pradeepImage from "../assets/characters-clean/pradeep.png";

import bgVillage from "../assets/pageassets-clean/bg-village-sunset.png";
import stoneStrip from "../assets/pageassets-clean/stone-strip-ground.png";
import titleImg from "../assets/pageassets-clean/title-contact-us.png";
import plankBanner from "../assets/pageassets-clean/plank-long-banner-footer.png";
import bookOpen from "../assets/pageassets-clean/book-open.png";
import lectern from "../assets/pageassets-clean/lectern-with-books.png";
import quill from "../assets/pageassets-clean/feather-quill.png";
import envelope from "../assets/pageassets-clean/envelope.png";
import boardFrame from "../assets/pageassets-clean/board-stone-frame-lanterns.png";
import stonePlate from "../assets/pageassets-clean/stone-texture-header-plate.png";
import parchmentLarge from "../assets/pageassets-clean/parchment-large.png";
import parchmentSmall from "../assets/pageassets-clean/parchment-card-small.png";
import postsPair from "../assets/pageassets-clean/posts-wooden-pair.png";
import woodPlank from "../assets/pageassets-clean/plank-panel-wood-spare.png";
import lanternHanging from "../assets/pageassets-clean/lantern-hanging.png";
import craftingTable from "../assets/pageassets-clean/crafting-table-icon.png";

const teamMembers = [
  {
    id: 1,
    name: "Khushwant Singh Mahajan",
    role: "SWAG President",
    phone: "7020942799",
    image: khushwantImage,
  },
  {
    id: 2,
    name: "Hrishikesh Karale",
    role: "SWAG Vice President",
    phone: "97677533091",
    image: hrishikeshImage,
  },
  {
    id: 3,
    name: "Pradeep Salunke",
    role: "Hackfusion Coordinator",
    phone: "8956467929",
    image: pradeepImage,
  },
];

// Opening animation style: "smooth" (fluid, default) or "blocky" (chunky Minecraft steps)
const ANIMATION = "smooth";

/* ------------------------------------------------------------------
   TAILWIND HELPERS
   Breakpoint used everywhere: mobile = base / max-[700px], desktop = min-[701px]
   (same split as the old CSS, so nothing shifts).
   Class strings are always written out in full so Tailwind can see them.
------------------------------------------------------------------ */
const PIXEL = "[image-rendering:pixelated]";
const HEAD = "[font-family:'Press_Start_2P','Courier_New',monospace]";
const BODY = "[font-family:VT323,'Courier_New',monospace]";
const FILL = "bg-center bg-no-repeat [background-size:100%_100%]";
const COVER = "bg-center bg-cover bg-no-repeat";
const FOCUS_GOLD =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#ffd24a] focus-visible:outline-offset-2";
const FOCUS_BROWN =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#6b2f0c] focus-visible:outline-offset-2";

// images go in through inline background-image so Vite can hash/bundle them
const art = (src) => ({ backgroundImage: `url(${src})` });
const artOver = (src, tint) => ({
  backgroundImage: `linear-gradient(${tint}, ${tint}), url(${src})`,
});

const cx = (...parts) => parts.filter(Boolean).join(" ");

/* easing variables for the opening animation */
const EASE_SMOOTH = cx(
  "[--e-title:cubic-bezier(0.2,0.9,0.25,1.15)]",
  "[--e-plank:cubic-bezier(0.2,0.8,0.3,1)]",
  "[--e-drop:cubic-bezier(0.3,1.45,0.5,1)]",
  "[--e-rise:cubic-bezier(0.16,1,0.3,1)]",
  "[--e-pop:cubic-bezier(0.34,1.56,0.64,1)]",
  "[--e-fade:cubic-bezier(0.4,0,0.2,1)]"
);
const EASE_BLOCKY = cx(
  "[--e-title:steps(6,end)]",
  "[--e-plank:steps(8,end)]",
  "[--e-drop:steps(8,end)]",
  "[--e-rise:steps(10,end)]",
  "[--e-pop:steps(5,end)]",
  "[--e-fade:steps(6,end)]"
);

/* opening animation classes (keyframes live in index.css) */
const A_TITLE = "[animation:mc-title-in_0.8s_var(--e-title)_0.35s_backwards]";
const A_PLANK = "[animation:mc-plank-in_0.7s_var(--e-plank)_0.7s_backwards]";
const A_DROP = "[animation:mc-drop_1.1s_var(--e-drop)_0.8s_backwards]";
const A_RISE = "[animation:mc-rise_1s_var(--e-rise)_0.7s_backwards]";
const A_POP_H2 = "[animation:mc-pop_0.55s_var(--e-pop)_1.5s_backwards]";
const A_SPAWN = "[animation:mc-spawn_0.9s_var(--e-fade)_1.65s_backwards]";
const A_FADE_CARD = "[animation:mc-fade_0.8s_var(--e-fade)_1.65s_backwards]";
const A_POP_INFO = "[animation:mc-pop_0.55s_var(--e-pop)_1.8s_backwards]";
const A_POP_HEAD = "[animation:mc-pop_0.55s_var(--e-pop)_1.95s_backwards]";
const A_POP_CARD = "[animation:mc-pop_0.55s_var(--e-pop)_backwards]"; // delay set per card
const A_FOOTER = "[animation:mc-footer-rise_0.7s_var(--e-rise)_2.4s_backwards]";
const A_POSTS = "[animation:mc-fade_0.9s_var(--e-fade)_0.7s_backwards]";
const A_GLOW =
  "[animation:mc-flicker_3.6s_steps(1,end)_infinite,mc-fade_1s_var(--e-fade)_1.7s_backwards]";
const A_EMBER_1 = "[animation:mc-embers_9s_linear_infinite]";
const A_EMBER_2 = "[animation:mc-embers_12s_linear_4.5s_infinite]";

const CARD_DELAYS = ["2.05s", "2.15s", "2.25s", "2.35s"];

/* stone header plates + wooden item frame + wood buttons */
const FRAME_BORDER =
  "border-solid border-[#7a4e27] border-t-[#a47341] border-l-[#8f5f32] border-b-[#4d2f17] border-r-[#5b361b]";
const FRAME_BG = "bg-[linear-gradient(180deg,#2a1a10,#3b2616)]";
const WOOD_BTN = cx(
  "mt-auto min-h-[44px] min-w-[140px] flex-none text-[#f1dcae] text-[22px] leading-none",
  "[padding:6px_20px] [text-shadow:2px_2px_0_#2a1608]",
  "border-[3px] border-solid border-[#3a2110]",
  "[box-shadow:inset_0_0_0_2px_rgba(255,220,160,0.25),0_3px_0_rgba(0,0,0,0.4)]",
  "active:translate-y-[2px]",
  BODY,
  FILL,
  PIXEL,
  FOCUS_GOLD
);
const WOOD_BTN_STYLE = artOver(woodPlank, "rgba(60,32,12,0.5)");

/* page shade (readability overlay) */
const SHADE_DESKTOP =
  "radial-gradient(ellipse at 50% 58%, rgba(0,0,0,0) 52%, rgba(6,3,14,0.42) 100%), linear-gradient(180deg, rgba(10,6,20,0.45) 0%, rgba(10,6,20,0) 35%, rgba(10,6,20,0.12) 100%), linear-gradient(rgba(8,5,18,0.24), rgba(8,5,18,0.24))";
const SHADE_MOBILE =
  "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 55%, rgba(6,3,14,0.4) 100%), linear-gradient(180deg, rgba(10,6,20,0.35) 0%, rgba(10,6,20,0) 25%), linear-gradient(180deg, rgba(255,140,40,0.3) 0%, rgba(255,140,40,0) 60%), linear-gradient(rgba(8,5,18,0.24), rgba(8,5,18,0.24))";

/* lantern glow (desktop) */
const GLOW =
  "radial-gradient(ellipse 7.8% 12% at 10.3% 33%, rgba(255,190,90,0.5) 0%, rgba(255,150,50,0.2) 45%, rgba(255,150,50,0) 100%), radial-gradient(ellipse 7.8% 12% at 89.7% 33%, rgba(255,190,90,0.5) 0%, rgba(255,150,50,0.2) 45%, rgba(255,150,50,0) 100%), radial-gradient(ellipse 10.3% 34% at 16.4% 40%, rgba(255,170,60,0.1) 0%, rgba(255,170,60,0) 100%), radial-gradient(ellipse 10.3% 34% at 83.6% 40%, rgba(255,170,60,0.1) 0%, rgba(255,170,60,0) 100%)";

/* floating embers */
const EMBERS = {
  desktopA:
    "4vw 62vh 1px 0 #ffd36b, 12vw 40vh 1px 0 #ffb347, 21vw 70vh 1px 0 #ffd36b, 30vw 34vh 1px 0 #ffe9a8, 9vw 78vh 1px 0 #ffb347, 38vw 22vh 1px 0 #ffd36b, 52vw 20vh 1px 0 #ffe9a8, 70vw 19vh 1px 0 #ffb347, 89vw 58vh 1px 0 #ffd36b, 95vw 40vh 1px 0 #ffb347, 92vw 74vh 1px 0 #ffe9a8",
  desktopB:
    "7vw 52vh 1px 0 #ffe9a8, 17vw 30vh 1px 0 #ffd36b, 26vw 66vh 1px 0 #ffb347, 34vw 48vh 1px 0 #ffd36b, 3vw 36vh 1px 0 #ffb347, 46vw 21vh 1px 0 #ffd36b, 62vw 18vh 1px 0 #ffe9a8, 80vw 22vh 1px 0 #ffd36b, 97vw 66vh 1px 0 #ffe9a8, 91vw 30vh 1px 0 #ffb347",
  mobileA:
    "6vw 30vh 1px 0 #ffd36b, 90vw 44vh 1px 0 #ffb347, 12vw 66vh 1px 0 #ffe9a8, 84vw 80vh 1px 0 #ffd36b, 5vw 96vh 1px 0 #ffb347, 94vw 110vh 1px 0 #ffd36b, 50vw 52vh 1px 0 #ffe9a8, 70vw 24vh 1px 0 #ffb347",
  mobileB:
    "92vw 28vh 1px 0 #ffe9a8, 8vw 50vh 1px 0 #ffd36b, 88vw 62vh 1px 0 #ffb347, 4vw 84vh 1px 0 #ffd36b, 96vw 94vh 1px 0 #ffe9a8, 10vw 118vh 1px 0 #ffb347, 40vw 40vh 1px 0 #ffd36b",
};
const EMBER_BASE =
  "pointer-events-none absolute left-0 top-0 z-[1] h-[3px] w-[3px] bg-transparent opacity-0 [will-change:transform,opacity]";

const contactPageAnimations = `\
@keyframes mc-sign-drop {
  0%   { transform: translate3d(0, -140%, 0) rotate(-7deg); opacity: 0; }
  35%  { opacity: 1; }
  100% { transform: translate3d(0, 0, 0) rotate(0deg); opacity: 1; }
}
@keyframes mc-sway {
  0%, 100% { rotate: 0deg; }
  25% { rotate: 0.9deg; }
  75% { rotate: -0.9deg; }
}
@keyframes mc-title-in {
  0%   { opacity: 0; transform: translate3d(0, -18px, 0) scale(0.8); }
  100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes mc-plank-in {
  0%   { opacity: 0; transform: scaleX(0.35); }
  100% { opacity: 1; transform: scaleX(1); }
}
@keyframes mc-drop {
  0%   { opacity: 0; transform: translate3d(0, -110px, 0); }
  30%  { opacity: 1; }
  100% { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes mc-rise {
  0%   { opacity: 0; transform: translate3d(0, 80px, 0); }
  100% { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes mc-pop {
  0%   { opacity: 0; transform: translate3d(0, 12px, 0) scale(0.7); }
  100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes mc-spawn {
  0%   { opacity: 0; filter: brightness(3.5); }
  45%  { opacity: 1; filter: brightness(2); }
  100% { opacity: 1; filter: brightness(1); }
}
@keyframes mc-fade {
  0%   { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes mc-footer-rise {
  0%   { opacity: 0; transform: translate3d(0, 34px, 0); }
  100% { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes mc-flicker {
  0%, 100% { opacity: 0.85; }
  7%  { opacity: 1; }
  14% { opacity: 0.7; }
  23% { opacity: 0.95; }
  37% { opacity: 0.78; }
  52% { opacity: 1; }
  66% { opacity: 0.72; }
  81% { opacity: 0.92; }
}
@keyframes mc-embers {
  0%   { transform: translate3d(0, 0, 0); opacity: 0; }
  15%  { opacity: 1; }
  50%  { transform: translate3d(14px, -14vh, 0); opacity: 0.85; }
  85%  { opacity: 0.9; }
  100% { transform: translate3d(-10px, -26vh, 0); opacity: 0; }
}\n`;

function Contact() {
  useEffect(() => {
    const preconnectGoogle = document.createElement("link");
    preconnectGoogle.rel = "preconnect";
    preconnectGoogle.href = "https://fonts.googleapis.com";

    const preconnectGstatic = document.createElement("link");
    preconnectGstatic.rel = "preconnect";
    preconnectGstatic.href = "https://fonts.gstatic.com";
    preconnectGstatic.crossOrigin = "anonymous";

    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap";

    document.head.appendChild(preconnectGoogle);
    document.head.appendChild(preconnectGstatic);
    document.head.appendChild(fontLink);

    return () => {
      preconnectGoogle.remove();
      preconnectGstatic.remove();
      fontLink.remove();
    };
  }, []);

  const [selectedContact, setSelectedContact] = useState(teamMembers[0]);
  const [showInfo, setShowInfo] = useState(false);
  const [ready, setReady] = useState(false);
  const [reduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      !!window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // animations run only when the page is ready and the visitor allows motion
  const anim = (cls) => (ready && !reduceMotion ? cls : "");
  const hold = ready ? "" : "opacity-0";

  // start the opening animation only after fonts + images have finished loading,
  // so it never stutters while files are still downloading
  useEffect(() => {
    let cancelled = false;
    const go = () => {
      if (cancelled) return;
      // two frames so the browser has painted the hidden state first
      requestAnimationFrame(() =>
        requestAnimationFrame(() => !cancelled && setReady(true))
      );
    };
    const loaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((resolve) =>
            window.addEventListener("load", resolve, { once: true })
          );
    Promise.all([loaded, document.fonts ? document.fonts.ready : null]).then(go);
    const fallback = setTimeout(go, 3000); // never leave the page hidden


  return () => {
      cancelled = true;
      clearTimeout(fallback);
    };
  }, []);

  // page-level tweaks that must not leak to other routes:
  // dark <html> background (no white flash) + hidden scrollbar on desktop
  useEffect(() => {
    const html = document.documentElement;
    const prevBg = html.style.backgroundColor;
    const scrollbarClasses = [
      "min-[701px]:[scrollbar-width:none]",
      "min-[701px]:[&::-webkit-scrollbar]:hidden",
    ];
    html.style.backgroundColor = "#1d1530";
    html.classList.add(...scrollbarClasses);
    return () => {
      html.style.backgroundColor = prevBg;
      html.classList.remove(...scrollbarClasses);
    };
  }, []);

  const selectContact = (member) => {
    setSelectedContact(member);
    setShowInfo(false);
  };

  // Contact-page-only animations; kept here so no global CSS file is modified.
  const animationStyles = <style>{contactPageAnimations}</style>;

  return (
    <>
      {animationStyles}
    <div
      className={cx(
        "relative isolate flex min-h-[100dvh] w-full flex-col overflow-x-clip",
        "bg-cover bg-no-repeat bg-[#3a1d1a] [background-position:70%_center]",
        "min-[701px]:bg-[#1d1530] min-[701px]:[background-position:center_58%]",
        "text-[#3b2414]",
        BODY,
        // scene units (desktop only)
        "[--strip-h:56px]",
        "min-[701px]:[--u:min(1vw,1.36vh)]",
        "min-[701px]:[--strip-h:clamp(40px,calc(var(--u)_*_7),100px)]",
        "min-[701px]:[--board-bottom-pad:clamp(24px,calc(var(--u)_*_5.5),110px)]",
        ANIMATION === "blocky" ? EASE_BLOCKY : EASE_SMOOTH
      )}
      style={art(bgVillage)}
    >
      {/* readability shade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[-1] min-[701px]:hidden"
        style={{ backgroundImage: SHADE_MOBILE }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[-1] max-[700px]:hidden"
        style={{ backgroundImage: SHADE_DESKTOP }}
      />

      {/* stone ground strip along the bottom */}
      <div
        aria-hidden="true"
        className={cx(
          "pointer-events-none absolute inset-x-0 bottom-0 z-[-1] h-[var(--strip-h)]",
          "bg-repeat-x [background-size:auto_100%] bg-bottom min-[701px]:bg-left-bottom",
          PIXEL
        )}
        style={art(stoneStrip)}
      />

      {/* ================================ MAIN ================================ */}
      <main className={cx("relative flex-[1_0_auto] min-[701px]:flex min-[701px]:flex-col", hold)}>
        {/* floating embers (decorative) */}
        <span
          aria-hidden="true"
          className={cx(EMBER_BASE, "max-[700px]:hidden", anim(A_EMBER_1))}
          style={{ boxShadow: EMBERS.desktopA }}
        />
        <span
          aria-hidden="true"
          className={cx(EMBER_BASE, "max-[700px]:hidden", anim(A_EMBER_2))}
          style={{ boxShadow: EMBERS.desktopB }}
        />
        <span
          aria-hidden="true"
          className={cx(EMBER_BASE, "min-[701px]:hidden", anim(A_EMBER_1))}
          style={{ boxShadow: EMBERS.mobileA }}
        />
        <span
          aria-hidden="true"
          className={cx(EMBER_BASE, "min-[701px]:hidden", anim(A_EMBER_2))}
          style={{ boxShadow: EMBERS.mobileB }}
        />

        {/* ---------- heading: stone title + wooden subtitle plank ---------- */}
        <section className="px-[14px] pt-[130px] text-center min-[701px]:px-4 min-[701px]:pt-[140px]">
          <h1
            className={cx(
              "mx-auto mb-2 aspect-[1400/256] w-[min(78vw,340px)]",
              "min-[701px]:mb-[clamp(6px,var(--u),14px)] min-[701px]:w-[clamp(180px,calc(var(--u)_*_31),480px)]",
              "[filter:drop-shadow(0_3px_0_rgba(0,0,0,0.4))]",
              anim(A_TITLE)
            )}
          >
            <img
              src={titleImg}
              alt="Contact Us"
              className={cx("block h-full w-full object-contain", PIXEL)}
            />
          </h1>
          <p
            className={cx(
              "inline-block max-w-full text-[#3b2414]",
              "[padding:9px_22px] text-[15px] leading-[1.1]",
              "min-[701px]:[padding:clamp(7px,calc(var(--u)_*_1.1),15px)_clamp(26px,calc(var(--u)_*_3.4),48px)]",
              "min-[701px]:text-[length:clamp(13px,calc(var(--u)_*_1.6),22px)] min-[701px]:leading-[1.15]",
              "[text-shadow:0_1px_0_rgba(255,226,170,0.5)]",
              FILL,
              PIXEL,
              anim(A_PLANK)
            )}
            style={art(plankBanner)}
          >
            Have a question? Get in touch with the HackFusion team.
          </p>
        </section>

        {/* ------------------- book column + stone board ------------------- */}
        <div
          className={cx(
            "relative mx-auto grid w-full max-w-[520px] grid-cols-[minmax(0,1fr)] gap-[26px]",
            "[padding:40px_14px_28px] max-[380px]:px-[10px]",
            "[container-type:inline-size]",
            "[filter:drop-shadow(0_0_2px_rgba(0,0,0,0.9))_drop-shadow(0_8px_16px_rgba(0,0,0,0.6))]",
            "min-[701px]:mt-auto min-[701px]:mb-0 min-[701px]:max-w-[min(1400px,calc(var(--u)_*_93.7))]",
            "min-[701px]:grid-cols-[minmax(0,29fr)_minmax(0,66fr)] min-[701px]:items-start min-[701px]:gap-x-[3%] min-[701px]:gap-y-0",
            "min-[701px]:[padding:clamp(6px,calc(var(--u)_*_0.9),14px)_2%_var(--board-bottom-pad)]"
          )}
        >
          {/* lantern glow (desktop) */}
          <div
            aria-hidden="true"
            className={cx(
              "pointer-events-none absolute z-[3] max-[700px]:hidden",
              "col-start-2 col-end-3 row-start-1 row-end-2 [inset:0_-8%] [will-change:opacity]",
              anim(A_GLOW)
            )}
            style={{ backgroundImage: GLOW }}
          />

          {/* wooden posts that hold the board (desktop) */}
          <div
            aria-hidden="true"
            className={cx(
              "pointer-events-none absolute z-[-1] max-[700px]:hidden",
              "col-start-2 col-end-3 row-start-1 row-end-2 left-[14%] top-[78%] w-[72%]",
              "h-[calc(22%_+_var(--board-bottom-pad)_-_var(--strip-h)_*_0.083_+_12px)]",
              "bg-bottom bg-no-repeat [background-size:100%_auto]",
              PIXEL,
              anim(A_POSTS)
            )}
            style={art(postsPair)}
          />

          {/* ---------------- EMAIL SUPPORT = open book on a lectern ---------------- */}
          <section
            aria-labelledby="email-heading"
            className={cx(
              "relative isolate grid aspect-[1088/674] w-full max-w-[420px] grid-cols-2 items-center justify-items-center justify-self-center",
              "text-[#3b2414] [padding:3.5%_11%_12.5%_11%]",
              "min-[701px]:max-w-none min-[701px]:self-end",
              "min-[701px]:mb-[calc(51.1%_-_var(--board-bottom-pad)_+_var(--strip-h)_*_0.083_-_10px)]",
              anim(A_DROP)
            )}
          >
            {/* book art */}
            <div
              aria-hidden="true"
              className={cx("pointer-events-none absolute inset-0 z-[-1]", FILL, PIXEL)}
              style={art(bookOpen)}
            />
            {/* lectern under the book (desktop) */}
            <div
              aria-hidden="true"
              className={cx(
                "pointer-events-none absolute left-1/2 top-[76%] z-[-2] aspect-[513/627] w-[54%] -translate-x-1/2 max-[700px]:hidden",
                FILL,
                PIXEL
              )}
              style={art(lectern)}
            />

            <h2
              id="email-heading"
              className="text-center text-[#3b2414] leading-none text-[length:clamp(15px,4.6cqw,22px)] min-[701px]:text-[length:max(12px,2cqw)]"
            >
              <img
                src={quill}
                alt=""
                aria-hidden="true"
                className={cx(
                  "mx-auto mb-[0.3em] block aspect-[749/801] w-[clamp(34px,11cqw,56px)] min-[701px]:w-[clamp(40px,5.6cqw,84px)]",
                  PIXEL
                )}
              />
              Email Support
            </h2>

            <div className="flex w-full min-w-0 flex-col items-center gap-2 min-[701px]:gap-[1.2cqw]">
              {["gdg@sggs.ac.in", "swag@sggs.ac.in"].map((mail) => (
                <a
                  key={mail}
                  href={`mailto:${mail}`}
                  className={cx(
                    "flex max-w-full flex-col items-center text-center text-[#3b2414] underline underline-offset-[3px] [overflow-wrap:anywhere]",
                    "leading-[1.05] text-[length:clamp(12px,3.7cqw,17px)] min-[701px]:text-[length:max(10px,1.45cqw)]",
                    "min-[701px]:hover:text-[#6b2f0c]",
                    FOCUS_BROWN
                  )}
                >
                  <img
                    src={envelope}
                    alt=""
                    aria-hidden="true"
                    className={cx(
                      "mb-[2px] block aspect-[616/443] w-[clamp(20px,6.5cqw,30px)] min-[701px]:w-[clamp(24px,2.6cqw,36px)]",
                      PIXEL
                    )}
                  />
                  {mail}
                </a>
              ))}
            </div>
          </section>

          {/* ---------------- CONTACT PERSON = stone board on posts ---------------- */}
          <section
            id="contact"
            aria-labelledby="contact-heading"
            className={cx(
              "relative block w-full text-[#f4f1e8] [--bs:1.065]",
              // mobile: board art stretched to --board-h, derived from the flip-card height
              "[--win:clamp(190px,52vw,260px)] [--card-h:calc(var(--win)_+_84px)] [--board-h:calc((var(--card-h)_+_56px)_/_0.7)]",
              "[padding:calc(var(--board-h)_*_0.185)_12%_0_11.5%] [background-size:100%_var(--board-h)] bg-top bg-no-repeat",
              // desktop: board fills its box
              "min-[701px]:grid min-[701px]:grid-cols-[minmax(0,0.55fr)_minmax(0,1.45fr)] min-[701px]:grid-rows-[auto_auto_auto_auto]",
              "min-[701px]:content-start min-[701px]:items-stretch min-[701px]:gap-x-[3%] min-[701px]:gap-y-0",
              "min-[701px]:aspect-[1288/905] min-[701px]:[padding:12.5%_12.3%_12.6%_12.1%]",
              "min-[701px]:[background-size:100%_100%] min-[701px]:bg-center",
              PIXEL,
              anim(A_RISE)
            )}
            style={art(boardFrame)}
          >
            {/* stone wall inside the frame */}
            <div
              aria-hidden="true"
              className={cx(
                "pointer-events-none absolute z-0 left-[11%] right-[11.6%]",
                "top-[calc(var(--board-h)_*_0.145)] h-[calc(var(--board-h)_*_0.74)]",
                "min-[701px]:top-[14.5%] min-[701px]:bottom-[11.5%] min-[701px]:h-auto",
                "[box-shadow:inset_0_0_0_3px_rgba(0,0,0,0.35),inset_0_6px_16px_rgba(0,0,0,0.45)]",
                FILL,
                PIXEL
              )}
              style={artOver(stonePlate, "rgba(36,26,22,0.38)")}
            />

            {/* two full-size lanterns over the small baked-in ones (mobile) */}
            <div
              aria-hidden="true"
              className={cx(
                "pointer-events-none absolute z-[2] -left-[6px] -right-[6px] min-[701px]:hidden",
                "top-[calc(var(--board-h)_*_0.124)] h-[calc(var(--board-h)_*_0.29)]",
                "bg-no-repeat [background-size:auto_100%] [background-position:left_top,right_top]",
                PIXEL
              )}
              style={{
                backgroundImage: `url(${lanternHanging}), url(${lanternHanging})`,
              }}
            />

            {/* "Contact Person" stone header plate */}
            <h2
              id="contact-heading"
              className={cx(
                "relative z-[1] mx-auto mb-2 w-[70%] text-center text-[#f4f1e8] leading-[1.2]",
                "[padding:0.5em_0.4em_0.55em] text-[length:clamp(8px,2.9cqw,12px)]",
                "[text-shadow:2px_2px_0_#1b1b1b]",
                "border-[3px] border-solid border-[#1f1f1f]",
                "[box-shadow:inset_0_0_0_2px_rgba(190,190,190,0.35),0_3px_0_rgba(0,0,0,0.35)]",
                "min-[701px]:col-span-full min-[701px]:row-start-1 min-[701px]:justify-self-center min-[701px]:w-[54%] min-[701px]:mx-0",
                "min-[701px]:mb-[calc(1.1cqw_*_var(--bs))] min-[701px]:[padding:0.55em_0.4em_0.6em]",
                "min-[701px]:text-[length:max(9px,calc(1.1cqw_*_var(--bs)))]",
                HEAD,
                COVER,
                PIXEL,
                anim(A_POP_H2)
              )}
              style={artOver(stonePlate, "rgba(0,0,0,0.22)")}
            >
              Contact Person
            </h2>

            {/* organiser card: mobile = block, desktop = children join the board grid */}
            <div className="relative z-[1] mb-[calc(var(--board-h)_*_0.115_+_12px)] min-[701px]:contents">
              {/* ---- desktop: wooden item frame with the character ---- */}
              <div
                className={cx(
                  "relative z-[1] hidden min-w-0 overflow-hidden min-[701px]:block",
                  "min-[701px]:col-start-1 min-[701px]:row-start-2 min-[701px]:row-end-5 min-[701px]:self-stretch",
                  "[border-width:max(6px,calc(0.75cqw_*_var(--bs)))]",
                  FRAME_BORDER,
                  FRAME_BG,
                  "[box-shadow:0_0_0_2px_#1a0f08,inset_0_0_0_2px_#24140a,inset_0_0_18px_rgba(0,0,0,0.6),0_4px_0_2px_rgba(0,0,0,0.35)]",
                  anim(A_SPAWN)
                )}
              >
                <img
                  src={selectedContact.image}
                  alt={`${selectedContact.name} Minecraft character`}
                  className={cx(
                    "absolute inset-0 block h-full w-full scale-[1.2] origin-[50%_52%] object-cover object-top",
                    "[filter:drop-shadow(0_6px_0_rgba(0,0,0,0.35))]",
                    PIXEL
                  )}
                />
              </div>

              {/* ---- desktop: info on parchment ---- */}
              <div
                className={cx(
                  "relative z-[1] hidden min-w-0 flex-col items-center justify-center text-center text-[#3b2414] [overflow-wrap:anywhere]",
                  "min-[701px]:flex min-[701px]:col-start-2 min-[701px]:row-start-2",
                  "min-[701px]:min-h-[calc(8cqw_*_var(--bs))] [padding:4.5%_8%]",
                  "[filter:drop-shadow(0_3px_0_rgba(0,0,0,0.35))]",
                  FILL,
                  PIXEL,
                  anim(A_POP_INFO)
                )}
                style={art(parchmentLarge)}
              >
                <div>
                  <h3 className="mb-[0.15em] text-[#2b1608] leading-[0.95] [overflow-wrap:break-word] [text-wrap:balance] text-[length:max(13px,calc(2.25cqw_*_var(--bs)))]">
                    {selectedContact.name}
                  </h3>
                  <p className="my-[0.1em] text-[#3b2414] leading-none text-[length:max(11px,calc(1.6cqw_*_var(--bs)))]">
                    {selectedContact.role}
                  </p>
                  <a
                    href={`tel:${selectedContact.phone}`}
                    className={cx(
                      "text-[#5a2d0a] underline underline-offset-[3px] hover:text-[#8a3d0c] leading-none text-[length:max(11px,calc(1.6cqw_*_var(--bs)))]",
                      FOCUS_BROWN
                    )}
                  >
                    {selectedContact.phone}
                  </a>
                </div>
              </div>

              {/* ---- mobile: flip card (front = character, back = parchment) ---- */}
              <div
                className={cx(
                  "relative z-[1] mx-auto h-[var(--card-h)] w-[calc(100%_-_16px)] overflow-hidden [perspective:1000px] min-[701px]:hidden",
                  anim(A_FADE_CARD)
                )}
              >
                <div
                  className={cx(
                    "relative h-full w-full [transform-style:preserve-3d] transition-transform duration-[600ms] ease-[ease] motion-reduce:transition-none",
                    showInfo ? "[transform:rotateY(180deg)]" : ""
                  )}
                >
                  {/* front */}
                  <div
                    className={cx(
                      "absolute inset-0 flex flex-col items-center justify-start gap-[10px] overflow-hidden [padding:6px_6px_8px] text-[#f4f1e8]",
                      "border-[6px]",
                      FRAME_BORDER,
                      FRAME_BG,
                      "[box-shadow:0_0_0_2px_#1a0f08,inset_0_0_0_2px_#24140a,inset_0_0_18px_rgba(0,0,0,0.6)]",
                      "[backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
                    )}
                  >
                    <img
                      src={selectedContact.image}
                      alt={`${selectedContact.name} Minecraft character`}
                      className={cx(
                        "block h-[var(--win)] w-full flex-none object-cover object-top",
                        "[mask-image:linear-gradient(to_bottom,#000_78%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_78%,transparent_100%)]",
                        PIXEL
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowInfo(true)}
                      className={WOOD_BTN}
                      style={WOOD_BTN_STYLE}
                    >
                      Contact
                    </button>
                  </div>

                  {/* back */}
                  <div
                    className={cx(
                      "absolute inset-0 flex flex-col items-center justify-center overflow-hidden text-center text-[#3b2414] [overflow-wrap:anywhere]",
                      "[padding:8%_10%] [transform:rotateY(180deg)]",
                      "[backface-visibility:hidden] [-webkit-backface-visibility:hidden]",
                      FILL,
                      PIXEL
                    )}
                    style={art(parchmentLarge)}
                  >
                    <h3 className="mb-[6px] text-[#2b1608] leading-[0.95] [text-wrap:balance] text-[length:clamp(22px,6.4cqw,30px)]">
                      {selectedContact.name}
                    </h3>
                    <p className="my-[2px] text-[#3b2414] leading-none text-[length:clamp(17px,4.6cqw,22px)]">
                      {selectedContact.role}
                    </p>
                    <p className="my-[2px] text-[#3b2414] leading-none text-[length:clamp(17px,4.6cqw,22px)]">
                      <a
                        href={`tel:${selectedContact.phone}`}
                        className="text-[#5a2d0a] underline underline-offset-[3px]"
                      >
                        {selectedContact.phone}
                      </a>
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowInfo(false)}
                      className={WOOD_BTN}
                      style={WOOD_BTN_STYLE}
                    >
                      Show Avatar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ---- OTHER TEAM MEMBERS plate ---- */}
            <h3
              className={cx(
                "relative z-[1] block text-center text-[#1b1b1b] leading-[1.2]",
                "w-[calc(100%_+_11.5%_+_12%)] [margin:0_-12%_0_-11.5%] [padding:0.7em_0.4em_0.75em] text-[length:clamp(9px,3.3cqw,13px)]",
                "[text-shadow:0_1px_0_rgba(255,255,255,0.45)]",
                "border-[3px] border-solid border-[#2e2e2e]",
                "[box-shadow:inset_0_0_0_2px_rgba(255,255,255,0.3),0_3px_0_rgba(0,0,0,0.35)]",
                "min-[701px]:col-start-2 min-[701px]:row-start-3 min-[701px]:self-end min-[701px]:w-full",
                "min-[701px]:[margin:calc(1.3cqw_*_var(--bs))_0_calc(0.8cqw_*_var(--bs))] min-[701px]:[padding:0.55em_0.4em_0.6em]",
                "min-[701px]:text-[length:max(8px,calc(0.95cqw_*_var(--bs)))]",
                HEAD,
                COVER,
                PIXEL,
                anim(A_POP_HEAD)
              )}
              style={artOver(stonePlate, "rgba(255,255,255,0.2)")}
            >
              OTHER TEAM MEMBERS
            </h3>

            {/* ---- member cards: scroll-snap row (wooden tray on mobile) ---- */}
            <div
              className={cx(
                "relative z-[1] flex min-w-0 flex-nowrap items-start overflow-x-auto overflow-y-hidden min-h-max",
                "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [-webkit-overflow-scrolling:touch]",
                "[scroll-snap-type:x_mandatory]",
                // mobile tray
                "w-[calc(100%_+_11.5%_+_12%)] [margin:0_-12%_0_-11.5%] gap-[10px] [padding:12px_10px_24px] [scroll-padding-inline:10px]",
                "max-[700px]:border-[4px] max-[700px]:border-solid max-[700px]:border-[#7a4e27] max-[700px]:border-t-0",
                "max-[700px]:bg-[linear-gradient(180deg,#3b2616,#2a1a10)]",
                "max-[700px]:[box-shadow:0_0_0_2px_#1a0f08,inset_0_0_14px_rgba(0,0,0,0.5)]",
                // desktop row
                "min-[701px]:col-start-2 min-[701px]:row-start-4 min-[701px]:m-0 min-[701px]:w-full min-[701px]:max-w-full",
                "min-[701px]:gap-[calc(1cqw_*_var(--bs))] min-[701px]:[padding:10px_8px_24px] min-[701px]:[scroll-padding-inline:8px]"
              )}
            >
              {teamMembers.map((member, index) => {
                const selected = selectedContact.id === member.id;
                return (
                  <button
                    type="button"
                    key={member.id}
                    aria-pressed={selected}
                    onClick={() => selectContact(member)}
                    style={{
                      ...art(parchmentSmall),
                      animationDelay: CARD_DELAYS[Math.min(index, 3)],
                    }}
                    className={cx(
                      "snap-start shrink-0 grow-0 aspect-[1032/488]",
                      "[--cw:clamp(132px,38vw,168px)] min-[701px]:[--cw:clamp(96px,calc(13.5cqw_*_var(--bs)),176px)]",
                      "w-[var(--cw)] min-w-[var(--cw)] max-w-[var(--cw)]",
                      "flex flex-col items-center justify-center text-center text-[#3b2414] [padding:5%_9%] [overflow-wrap:anywhere]",
                      "[transition:transform_0.12s_steps(2),translate_0.12s_steps(2),filter_0.12s_steps(2)] motion-reduce:[transition:none]",
                      selected
                        ? "-translate-y-[3px] [filter:drop-shadow(0_0_6px_#ffd24a)_drop-shadow(0_0_2px_#ffd24a)] motion-reduce:translate-y-0"
                        : "hover:brightness-[1.08]",
                      FILL,
                      PIXEL,
                      FOCUS_GOLD,
                      anim(A_POP_CARD)
                    )}
                  >
                    <h4 className="mb-[0.2em] w-full text-[15px] leading-[0.95] text-[#2b1608] [text-wrap:balance] [overflow-wrap:anywhere] min-[701px]:text-[length:max(11px,calc(1.45cqw_*_var(--bs)))]">
                      {member.name}
                    </h4>
                    <p className="w-full text-[12px] leading-none text-[#3b2414] [overflow-wrap:anywhere] min-[701px]:text-[length:max(9px,calc(1.15cqw_*_var(--bs)))]">
                      {member.role}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      {/* =============================== FOOTER =============================== */}
      <footer
        className={cx(
          "relative z-[1] flex flex-none items-center justify-center self-center text-center text-[#2b1608] aspect-[1400/278] [padding:0_5%]",
          "w-[min(calc(100%_-_84px),calc(var(--strip-h)_*_4.2))] [margin:12px_42px_calc(var(--strip-h)_*_0.083)_0]",
          "text-[13px] leading-[1.05] [text-shadow:0_1px_0_rgba(255,226,170,0.5)]",
          "min-[701px]:w-[calc(var(--strip-h)_*_4.2)] min-[701px]:[margin:0_0_calc(var(--strip-h)_*_0.083)]",
          "min-[701px]:text-[length:clamp(10px,calc(var(--u)_*_1.3),18px)]",
          FILL,
          PIXEL,
          hold,
          anim(A_FOOTER)
        )}
        style={art(plankBanner)}
      >
        © 2026 HackFusion. All rights reserved.
        {/* crafting table beside the plank */}
        <img
          src={craftingTable}
          alt=""
          aria-hidden="true"
          className={cx(
            "pointer-events-none absolute left-full top-1/2 ml-[6px] aspect-square w-9 -translate-y-1/2",
            "min-[701px]:ml-2 min-[701px]:w-[clamp(22px,calc(var(--u)_*_3.2),44px)]",
            PIXEL
          )}
        />
      </footer>
    </div>
    </>

  );
}

export default Contact;