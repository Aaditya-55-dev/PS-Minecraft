import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../hooks/api";
import logo from "../assets/logo.png";
import bg from "../assets/reg_bg.webp"
import Navbar from "../components/Navbar";

/* ------------------------------------------------------------------ */
/*  Things to update for HackFusion 4                                  */
/* ------------------------------------------------------------------ */
const EVENT_NAME = "HackFusion 4";
const THEME = "AI in Healthcare"; // sent to register.php as "theme" - change if the theme changed
const REGISTRATION_FEE = 749;
const PS_ROUTE = "/problem-statement"; // must match the <Route path> of ProblemStatement.jsx in your router
const QR_IMAGE = "/hackfusionpayment.jpeg";
const BG_IMAGE = ""; // optional: import bg from "../assets/bg.jpg" and set BG_IMAGE = bg

const ABSTRACT_MIN = 150;
const ABSTRACT_MAX = 3000;
const MAX_FILE_BYTES = 1 * 1024 * 1024; // 1MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const TAB_META = {
  teamSize: { label: "Team Size", accent: "#9aa0a6" },
  lead: { label: "Team Lead", accent: "#e5484d" },
  member1: { label: "Member 1", accent: "#4c8dff" },
  member2: { label: "Member 2", accent: "#f2b705" },
  member3: { label: "Member 3", accent: "#55c038" },
  team: { label: "Team Info", accent: "#b074ff" },
  abstract: { label: "Abstract", accent: "#ff8a1f" },
  payment: { label: "Payment", accent: "#ff6fae" },
};

/* ------------------------------------------------------------------ */
/*  Validation rules (strict)                                          */
/* ------------------------------------------------------------------ */
const NAME_RE = /^[A-Za-z][A-Za-z .'-]*$/;
const EMAIL_RE =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
const MOBILE_RE = /^[6-9]\d{9}$/;
const PLACE_RE = /^[A-Za-z][A-Za-z .'-]*$/;

const checkName = (v) => {
  const t = v.trim();
  if (!t) return "Full name is required";
  if (t.length < 3) return "Name must be at least 3 characters";
  if (!NAME_RE.test(t)) return "Use letters only (spaces, . ' - allowed)";
  return null;
};
const checkEmail = (v) => {
  const t = v.trim();
  if (!t) return "Email is required";
  if (!EMAIL_RE.test(t)) return "Enter a valid email like name@example.com";
  return null;
};
const checkMobile = (v) => {
  const t = v.trim();
  if (!t) return "Mobile number is required";
  if (t.length !== 10) return "Mobile number must be 10 digits";
  if (!MOBILE_RE.test(t)) return "Enter a valid Indian number (starts with 6-9)";
  return null;
};
const checkPassword = (v) => {
  if (!v.trim()) return "Password is required";
  if (v.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Za-z]/.test(v) || !/\d/.test(v))
    return "Password must contain a letter and a number";
  return null;
};
const checkCollege = (v) => {
  const t = v.trim();
  if (!t) return "College name is required";
  if (t.length < 3) return "Enter the full college name";
  if (!/[A-Za-z]{3}/.test(t)) return "Enter a valid college name";
  return null;
};
const checkCity = (v) => {
  const t = v.trim();
  if (!t) return "City is required";
  if (t.length < 2) return "Enter a valid city";
  if (!PLACE_RE.test(t)) return "Use letters only";
  return null;
};
const checkAbstract = (v) => {
  const t = v.trim();
  if (!t) return "Abstract is required";
  if (t.length < ABSTRACT_MIN)
    return `Abstract must be at least ${ABSTRACT_MIN} characters`;
  if (t.length > ABSTRACT_MAX)
    return `Abstract can be at most ${ABSTRACT_MAX} characters`;
  return null;
};

/* keeps junk out of the fields while typing */
const sanitize = (name, v) => {
  if (/Mobile$/.test(name)) {
    let d = v.replace(/\D/g, "");
    if (d.length > 10 && d.startsWith("91")) d = d.slice(2);
    if (d.length > 10 && d.startsWith("0")) d = d.slice(1);
    return d.slice(0, 10);
  }
  if (/Email$/.test(name)) return v.replace(/\s/g, "").slice(0, 100);
  if (/^(lead|m[123])Name$/.test(name))
    return v
      .replace(/[^A-Za-z .'-]/g, "")
      .replace(/^\s+/, "")
      .replace(/\s{2,}/g, " ")
      .slice(0, 60);
  if (name === "city")
    return v
      .replace(/[^A-Za-z .'-]/g, "")
      .replace(/^\s+/, "")
      .replace(/\s{2,}/g, " ")
      .slice(0, 50);
  if (name === "college")
    return v.replace(/^\s+/, "").replace(/\s{2,}/g, " ").slice(0, 100);
  if (name === "coupon")
    return v.toUpperCase().replace(/[^A-Z0-9_-]/g, "").slice(0, 20);
  if (name === "password" || name === "confirmPassword")
    return v.replace(/\s/g, "").slice(0, 64);
  if (name === "abstract") return v.slice(0, ABSTRACT_MAX);
  return v;
};

const peopleFor = (size) => ["lead", "m1", "m2", ...(size === 4 ? ["m3"] : [])];

/* errors for ONE tab (used by Next, blur, submit and the "done" ticks) */
const getTabErrors = (tabId, d, size) => {
  const e = {};
  const set = (key, msg) => {
    if (msg) e[key] = msg;
  };

  const person = (p) => {
    const order = peopleFor(size);
    const before = order.slice(0, order.indexOf(p));
    set(`${p}Name`, checkName(d[`${p}Name`]));

    let emailMsg = checkEmail(d[`${p}Email`]);
    if (
      !emailMsg &&
      before.some(
        (q) =>
          d[`${q}Email`].trim().toLowerCase() ===
          d[`${p}Email`].trim().toLowerCase()
      )
    )
      emailMsg = "This email is already used by another team member";
    set(`${p}Email`, emailMsg);

    let mobMsg = checkMobile(d[`${p}Mobile`]);
    if (
      !mobMsg &&
      before.some((q) => d[`${q}Mobile`].trim() === d[`${p}Mobile`].trim())
    )
      mobMsg = "This number is already used by another team member";
    set(`${p}Mobile`, mobMsg);

    if (!d[`${p}Image`]) set(`${p}Image`, "Profile picture is required");
  };

  switch (tabId) {
    case "lead":
      person("lead");
      set("password", checkPassword(d.password));
      if (!d.confirmPassword.trim())
        set("confirmPassword", "Please confirm your password");
      else if (d.password !== d.confirmPassword)
        set("confirmPassword", "Passwords do not match");
      break;
    case "member1":
      person("m1");
      break;
    case "member2":
      person("m2");
      break;
    case "member3":
      if (size === 4) person("m3");
      break;
    case "team":
      set("college", checkCollege(d.college));
      set("city", checkCity(d.city));
      if (!d.confirmEmail.trim())
        set("confirmEmail", "Confirm email is required");
      else if (
        d.confirmEmail.trim().toLowerCase() !==
        d.leadEmail.trim().toLowerCase()
      )
        set("confirmEmail", "Email confirmation doesn't match lead email");
      if (d.coupon && d.coupon.length < 3)
        set("coupon", "Coupon code must be at least 3 characters");
      break;
    case "abstract":
      set("abstract", checkAbstract(d.abstract));
      break;
    case "payment":
      if (!d.paymentScreenshot)
        set("paymentScreenshot", "Payment screenshot is required");
      break;
    default:
      break;
  }
  return e;
};

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');

.hf4 { --accent:#55c038; font-family:'VT323', ui-monospace, monospace; font-size:22px; color:#e8e8e8; }
.hf4 .px { font-family:'Press Start 2P', ui-monospace, monospace; letter-spacing:0; }
.hf4 *, .hf4 *::before, .hf4 *::after { box-sizing:border-box; }
/* ---------- logo + shell entrance ---------- */
.hf4 .mc-logo { filter:drop-shadow(0 6px 0 rgba(0,0,0,.5)); animation:mc-drop .7s steps(8) both, mc-bob 4s ease-in-out .7s infinite; }
@keyframes mc-drop { from{opacity:0; transform:translateY(-40px)} to{opacity:1; transform:translateY(0)} }
.hf4 .mc-shell-in { animation:mc-pop .6s steps(7) .25s both; }
@keyframes mc-pop { from{opacity:0; transform:translateY(28px) scale(.97)} to{opacity:1; transform:translateY(0) scale(1)} }

/* ---------- shell ---------- */
.hf4 .mc-shell {
  background:rgba(28,28,32,.9); border:4px solid #000;
  box-shadow: inset 4px 4px 0 #5e5e5e, inset -4px -4px 0 #1a1a1a, 0 12px 0 rgba(0,0,0,.45);
}
.hf4 .mc-grass { height:20px; border-bottom:4px solid #000;
  background:
    linear-gradient(#7fc944,#7fc944) top / 100% 10px no-repeat,
    repeating-linear-gradient(90deg,#5ea231 0 16px,#4e8d28 16px 32px) 0 10px / 100% 10px no-repeat; }
.hf4 .mc-aside {
  position:relative; border-bottom:4px solid #000;
  background:linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)), repeating-conic-gradient(#6b4a2b 0 25%, #5f4125 0 50%) 0 0 / 32px 32px;
}
@media (min-width:1024px) { .hf4 .mc-aside { border-bottom:0; border-right:4px solid #000; } }

/* steps */
.hf4 .mc-step {
  position:relative; flex:0 0 auto; display:flex; align-items:center; gap:10px; cursor:pointer; text-align:left;
  color:#d0d0d0; padding:11px 12px; background:#3a3a3a; border:3px solid #000;
  box-shadow: inset 3px 3px 0 #6a6a6a, inset -3px -3px 0 #232323;
  transition:transform .08s, background-color .08s, color .08s;
}
.hf4 .mc-step .label { font-family:'Press Start 2P', monospace; font-size:10px; line-height:1.3; white-space:nowrap; }
.hf4 .mc-step .swatch { width:18px; height:18px; flex:0 0 18px; background:var(--slot); border:2px solid #000; box-shadow: inset 3px 3px 0 rgba(255,255,255,.45), inset -3px -3px 0 rgba(0,0,0,.35); }
.hf4 .mc-step:hover { background:#4a4a4a; color:#fff; transform:translateX(3px); }
.hf4 .mc-step.on { background:var(--slot); color:#fff; text-shadow:2px 2px 0 rgba(0,0,0,.6);
  box-shadow: inset 3px 3px 0 rgba(255,255,255,.4), inset -3px -3px 0 rgba(0,0,0,.35), 0 0 0 3px #fff; transform:none; }
.hf4 .mc-step.on .swatch { background:#fff; }
.hf4 .mc-step:focus-visible { outline:3px solid #fff; outline-offset:3px; }
.hf4 .mc-check { margin-left:auto; color:#7dea2b; filter:drop-shadow(2px 2px 0 #000); }
@media (max-width:1023px) { .hf4 .mc-step:hover { transform:translateY(-2px); } .hf4 .mc-step { padding:10px 10px; } .hf4 .mc-step .label { font-size:9px; } }

/* party heads */
.hf4 .mc-head { transition:filter .25s, transform .25s; }
.hf4 .mc-head.off { filter:grayscale(1) brightness(.55); }
.hf4 .mc-head.on { animation:mc-hop .45s steps(5) 1; }
@keyframes mc-hop { 0%,100%{transform:translateY(0)} 40%{transform:translateY(-10px)} }

/* XP bar */
.hf4 .mc-xp { position:relative; height:18px; background:#111; border:3px solid #000; box-shadow: inset 2px 2px 0 #000, inset -2px -2px 0 #3d3d3d; overflow:hidden; }
.hf4 .mc-xp-fill { position:relative; height:100%; background:#7dea2b; box-shadow: inset 0 3px 0 rgba(255,255,255,.45), inset 0 -3px 0 rgba(0,0,0,.3); transition:width .45s steps(10); overflow:hidden; }
.hf4 .mc-xp-fill::after { content:""; position:absolute; top:0; bottom:0; width:40px; left:-40px; background:linear-gradient(90deg, transparent, rgba(255,255,255,.55), transparent); animation:mc-sheen 2.6s linear infinite; }
@keyframes mc-sheen { to{ left:110%; } }
.hf4 .mc-xp-ticks { position:absolute; inset:0; background:repeating-linear-gradient(90deg, transparent 0, transparent calc(var(--seg) - 3px), #000 calc(var(--seg) - 3px), #000 var(--seg)); pointer-events:none; }

/* tab content transition */
.hf4 .mc-enter { animation:mc-in .35s steps(7) both; }
.hf4 .mc-enter .grid > * { animation:mc-in .4s steps(7) both; }
.hf4 .mc-enter .grid > *:nth-child(1) { animation-delay:.04s; }
.hf4 .mc-enter .grid > *:nth-child(2) { animation-delay:.08s; }
.hf4 .mc-enter .grid > *:nth-child(3) { animation-delay:.12s; }
.hf4 .mc-enter .grid > *:nth-child(4) { animation-delay:.16s; }
.hf4 .mc-enter .grid > *:nth-child(5) { animation-delay:.20s; }
.hf4 .mc-enter .grid > *:nth-child(6) { animation-delay:.24s; }
.hf4 .mc-enter .grid > *:nth-child(7) { animation-delay:.28s; }
.hf4 .mc-enter .grid > *:nth-child(8) { animation-delay:.32s; }
@keyframes mc-in { from{opacity:0; transform:translateY(14px)} to{opacity:1; transform:translateY(0)} }

/* ---------- form controls ---------- */
.hf4 .mc-label { display:block; margin-bottom:6px; color:#f1f1f1; font-size:22px; line-height:1.1; }
.hf4 .mc-input {
  display:block; width:100%; min-height:48px; border-radius:0; outline:none;
  background:#111; color:#fff; font:inherit; font-size:23px; line-height:1.15; padding:9px 12px;
  border:3px solid #000; box-shadow: inset 3px 3px 0 #000, inset -3px -3px 0 #505050;
  caret-color:var(--accent); transition:box-shadow .12s;
}
.hf4 .mc-input::placeholder { color:#777; }
.hf4 .mc-input:focus { outline:3px solid var(--accent); outline-offset:2px; box-shadow: inset 3px 3px 0 #000, inset -3px -3px 0 #505050, 0 0 18px -2px var(--accent); }
.hf4 .mc-input.err { border-color:#d23232; animation:mc-shake .35s steps(7) 1; }
@keyframes mc-shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
.hf4 select.mc-input {
  appearance:none; -webkit-appearance:none; padding-right:42px; cursor:pointer;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' shape-rendering='crispEdges'><path fill='%23ffffff' d='M1 2h6v1H6v1H5v1H4v1H3V5H2V4H1z'/></svg>");
  background-repeat:no-repeat; background-position:right 12px center; background-size:18px 18px;
}
.hf4 select.mc-input option { background:#1b1b1b; color:#fff; }
.hf4 textarea.mc-input { resize:vertical; min-height:200px; }
.hf4 input[type=file].mc-input { padding:8px; cursor:pointer; font-size:20px; }
.hf4 input[type=file].mc-input::file-selector-button {
  font-family:'Press Start 2P', monospace; font-size:10px; margin-right:12px; padding:10px 12px; cursor:pointer;
  background:var(--accent); color:#fff; border:3px solid #000; text-shadow:2px 2px 0 rgba(0,0,0,.5);
  box-shadow: inset 3px 3px 0 rgba(255,255,255,.4), inset -3px -3px 0 rgba(0,0,0,.35);
}
.hf4 .mc-error { color:#ff7b7b; margin-top:6px; font-size:21px; line-height:1.1; }
.hf4 .mc-error::before { content:"! "; }
.hf4 .mc-hint { color:#9a9a9a; margin-top:6px; font-size:20px; line-height:1.1; }
.hf4 .mc-ok { color:#7dea2b; margin-top:6px; font-size:20px; word-break:break-all; }

/* buttons */
.hf4 .mc-btn {
  display:inline-flex; align-items:center; justify-content:center; gap:10px; cursor:pointer;
  font-family:'Press Start 2P', monospace; font-size:11px; line-height:1.4; color:#fff; text-align:center;
  padding:16px 22px; min-height:52px; background:#7b7b7b; border:3px solid #000; border-radius:0;
  text-shadow:2px 2px 0 #3b3b3b;
  box-shadow: inset 3px 3px 0 #b9b9b9, inset -3px -3px 0 #4a4a4a;
  transition:background-color .08s, transform .08s;
}
.hf4 .mc-btn:hover:not(:disabled) { background:#6b7bd1; box-shadow: inset 3px 3px 0 #a8b4f2, inset -3px -3px 0 #3d4a97; transform:translateY(-2px); }
.hf4 .mc-btn:active:not(:disabled) { transform:translateY(3px); }
.hf4 .mc-btn:focus-visible { outline:3px solid #fff; outline-offset:3px; }
.hf4 .mc-btn:disabled { cursor:not-allowed; color:#8a8a8a; text-shadow:none; background:#4a4a4a; box-shadow: inset 3px 3px 0 #5f5f5f, inset -3px -3px 0 #333; }
.hf4 .mc-btn.green { background:#4fa22a; box-shadow: inset 3px 3px 0 #8fe05f, inset -3px -3px 0 #2e6a14; text-shadow:2px 2px 0 #1d4a0a; }
.hf4 .mc-btn.green:hover:not(:disabled) { background:#5bb832; box-shadow: inset 3px 3px 0 #a6f07a, inset -3px -3px 0 #2e6a14; }
.hf4 .mc-btn.on { background:#4fa22a; box-shadow: inset 3px 3px 0 #8fe05f, inset -3px -3px 0 #2e6a14, 0 0 0 3px #fff; text-shadow:2px 2px 0 #1d4a0a; }
.hf4 .mc-btn svg { transition:transform .12s; }
.hf4 .mc-btn.next:hover:not(:disabled) svg { transform:translateX(4px); }
.hf4 .mc-btn.prev:hover:not(:disabled) svg { transform:translateX(-4px); }
.hf4 .mc-btn:hover .mc-hop-head { animation:mc-hop .45s steps(5) 1; animation-delay:var(--d); }

/* sign / callout */
.hf4 .mc-note { background:#2b2307; border:3px solid #f0b90b; color:#ffe27a; padding:10px 14px; font-size:22px; line-height:1.15; box-shadow: inset 3px 3px 0 rgba(255,255,255,.08); }
.hf4 .mc-note a { color:#ffe27a; text-decoration:underline; text-underline-offset:3px; }
.hf4 .mc-note a:hover { color:#fff; }
.hf4 .mc-panel { background:#1c1c1c; border:3px solid #000; box-shadow: inset 3px 3px 0 #0a0a0a, inset -3px -3px 0 #484848; }
.hf4 .mc-title { text-shadow:3px 3px 0 #000; }

.hf4 .no-scrollbar { scrollbar-width:none; -ms-overflow-style:none; }
.hf4 .no-scrollbar::-webkit-scrollbar { display:none; }

@media (max-width:640px) {
  .hf4 { font-size:21px; }
  .hf4 .mc-btn { padding:14px 14px; font-size:10px; }
}
@media (prefers-reduced-motion: reduce) {
  .hf4 *, .hf4 *::before, .hf4 *::after { transition:none !important; animation:none !important; }
}
`;

/* ------------------------------------------------------------------ */
/*  Decorative pieces                                                  */
/* ------------------------------------------------------------------ */
const STARS = Array.from({ length: 46 }, (_, i) => ({
  left: (i * 37) % 100 + ((i * 13) % 7) * 0.3,
  top: (i * 53) % 58,
  size: i % 6 === 0 ? 4 : 2,
  delay: ((i * 7) % 30) / 10,
}));
const CLOUDS = [
  { top: "12%", dur: 90, delay: -20 },
  { top: "24%", dur: 120, delay: -70 },
  { top: "7%", dur: 150, delay: -110 },
  { top: "33%", dur: 105, delay: -40 },
];
const ORBS = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 61) % 100,
  size: 6 + (i % 3) * 3,
  dur: 9 + (i % 5) * 2.2,
  delay: -((i * 3.7) % 14),
  dx: (i % 2 ? 1 : -1) * (20 + (i % 4) * 14),
}));

const Scene = ({ bgImage }) => (
  <div className="mc-scene" aria-hidden="true">
    {bgImage ? (
      <>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/35" />
      </>
    ) : (
      <>
        <div className="mc-sky" />
        {STARS.map((s, i) => (
          <span
            key={i}
            className="mc-star"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
        <div className="mc-moon" />
        {CLOUDS.map((c, i) => (
          <div
            key={i}
            className="mc-cloud"
            style={{ top: c.top, "--dur": `${c.dur}s`, "--delay": `${c.delay}s` }}
          />
        ))}
        <div className="mc-hill far" />
        <div className="mc-hill near" />
      </>
    )}
    {ORBS.map((o, i) => (
      <span
        key={i}
        className="mc-orb"
        style={{
          left: `${o.left}%`,
          width: o.size,
          height: o.size,
          animationDuration: `${o.dur}s`,
          animationDelay: `${o.delay}s`,
          "--dx": `${o.dx}px`,
        }}
      />
    ))}
  </div>
);

const Cube = ({ variant, size = 56, reverse }) => (
  <div className="mc-cube-wrap" style={{ animationDelay: reverse ? "-1.4s" : "0s" }}>
    <div
      className={`mc-cube ${variant} ${reverse ? "rev" : ""}`}
      style={{ "--s": `${size}px` }}
    >
      <i className="face side front" />
      <i className="face side back" />
      <i className="face side right" />
      <i className="face side left" />
      <i className="face top" />
      <i className="face bottom" />
    </div>
  </div>
);

const HEAD = [
  "HHHHHHHH",
  "HHHHHHHH",
  "HSSSSSSH",
  "SSSSSSSS",
  "SWBSSBWS",
  "SSSSSSSS",
  "SSMMMMSS",
  "SSSSSSSS",
];
const HEAD_COLORS = [
  ["#3a2a1a", "#c68a63"],
  ["#d94b2b", "#f1c7a0"],
  ["#2b2b2b", "#8d5a3b"],
  ["#e8c14a", "#e0ac82"],
];

const PixelHead = ({ hair, skin, size = 40, className = "", style }) => {
  const map = { H: hair, S: skin, W: "#ffffff", B: "#3b4bb5", M: "#7a4a30" };
  return (
    <svg
      viewBox="0 0 8 8"
      width={size}
      height={size}
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {HEAD.map((row, y) =>
        row
          .split("")
          .map((c, x) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={map[c]} />
          ))
      )}
    </svg>
  );
};

const ICON_CHECK = "M1 4h1v1H1zM2 5h1v1H2zM3 4h1v1H3zM4 3h1v1H4zM5 2h1v1H5zM6 1h1v1H6z";
const ICON_ARROW = "M2 1h1v6H2zM3 2h1v4H3zM4 3h1v2H4z";

const PixelIcon = ({ d, size = 16, flip = false, className = "" }) => (
  <svg
    viewBox="0 0 8 8"
    width={size}
    height={size}
    fill="currentColor"
    shapeRendering="crispEdges"
    aria-hidden="true"
    className={className}
    style={flip ? { transform: "scaleX(-1)" } : undefined}
  >
    <path d={d} />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Form building blocks (outside Register so inputs keep focus)       */
/* ------------------------------------------------------------------ */
const Field = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  required = true,
  hint,
  className = "",
  ...rest
}) => (
  <div className={className}>
    <label htmlFor={name} className="mc-label">
      {label}
      {required && <span className="text-red-400"> *</span>}
    </label>
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      required={required}
      className={`mc-input ${error ? "err" : ""}`}
      {...rest}
    />
    {error && <p className="mc-error">{error}</p>}
    {hint && !error && <p className="mc-hint">{hint}</p>}
  </div>
);

const SelectField = ({ label, name, value, onChange, options, className = "" }) => (
  <div className={className}>
    <label htmlFor={name} className="mc-label">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="mc-input"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.text}
        </option>
      ))}
    </select>
  </div>
);

const FileField = ({
  label,
  name,
  onChange,
  file,
  error,
  fileError,
  hint = "JPG, PNG or WEBP. Maximum file size: 1MB",
  className = "",
}) => (
  <div className={className}>
    <label htmlFor={name} className="mc-label">
      {label}
    </label>
    <input
      id={name}
      type="file"
      name={name}
      onChange={onChange}
      accept={ALLOWED_TYPES.join(",")}
      className={`mc-input ${error || fileError ? "err" : ""}`}
    />
    {fileError && <p className="mc-error">{fileError}</p>}
    {error && !fileError && <p className="mc-error">{error}</p>}
    {file && <p className="mc-ok">Selected: {file.name}</p>}
    <p className="mc-hint">{hint}</p>
  </div>
);

const SectionTitle = ({ children }) => (
  <h2
    className="px mc-title mb-5 text-sm leading-relaxed sm:text-lg"
    style={{ color: "var(--accent)" }}
  >
    {children}
  </h2>
);

const PersonTab = ({
  prefix,
  title,
  formData,
  errors,
  fileErrors,
  onChange,
  onBlur,
  children,
}) => (
  <div>
    <SectionTitle>{title}</SectionTitle>
    <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2">
      <Field
        label="Full Name"
        name={`${prefix}Name`}
        value={formData[`${prefix}Name`]}
        onChange={onChange}
        onBlur={onBlur}
        error={errors[`${prefix}Name`]}
        autoComplete="off"
        maxLength={60}
        placeholder="As on your college ID"
      />
      <Field
        label="Email"
        type="email"
        name={`${prefix}Email`}
        value={formData[`${prefix}Email`]}
        onChange={onChange}
        onBlur={onBlur}
        error={errors[`${prefix}Email`]}
        autoComplete="off"
        maxLength={100}
        placeholder="name@example.com"
      />
      <Field
        label="Mobile"
        type="tel"
        inputMode="numeric"
        name={`${prefix}Mobile`}
        value={formData[`${prefix}Mobile`]}
        onChange={onChange}
        onBlur={onBlur}
        error={errors[`${prefix}Mobile`]}
        autoComplete="off"
        maxLength={10}
        placeholder="10-digit number"
      />
      {children}
      <SelectField
        label="Gender"
        name={`${prefix}Gender`}
        value={formData[`${prefix}Gender`]}
        onChange={onChange}
        options={[
          { value: "M", text: "Male" },
          { value: "F", text: "Female" },
          { value: "O", text: "Other" },
        ]}
      />
      <SelectField
        label="PWD (Person with Disability)"
        name={`${prefix}Pwd`}
        value={formData[`${prefix}Pwd`]}
        onChange={onChange}
        options={[
          { value: "no", text: "No" },
          { value: "yes", text: "Yes" },
        ]}
      />
      <FileField
        className="md:col-span-2"
        label="Photo * (Don't upload a passport style photo, upload a cool photo 😎)"
        name={`${prefix}Image`}
        onChange={onChange}
        file={formData[`${prefix}Image`]}
        error={errors[`${prefix}Image`]}
        fileError={fileErrors[`${prefix}Image`]}
      />
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
function Register() {
  const [teamSize, setTeamSize] = useState(4); // Default to 4 members
  const [activeTab, setActiveTab] = useState("teamSize");
  const [formData, setFormData] = useState({
    teamSize: 4,
    abstract: "",
    city: "",
    college: "",
    confirmEmail: "",
    coupon: "",
    leadEmail: "",
    leadGender: "M",
    leadMobile: "",
    leadName: "",
    leadPwd: "no",
    m1Email: "",
    m1Gender: "M",
    m1Mobile: "",
    m1Name: "",
    m1Pwd: "no",
    m2Email: "",
    m2Gender: "M",
    m2Mobile: "",
    m2Name: "",
    m2Pwd: "no",
    m3Email: "",
    m3Gender: "M",
    m3Mobile: "",
    m3Name: "",
    m3Pwd: "no",
    password: "",
    confirmPassword: "",
    leadImage: null,
    m1Image: null,
    m2Image: null,
    m3Image: null,
    paymentScreenshot: null,
  });

  const [errors, setErrors] = useState({});
  const [fileErrors, setFileErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const tabsRef = useRef(null);
  const tabBarRef = useRef(null);
  const navigate = useNavigate();

  const scrollToCard = () => {
    if (tabsRef.current) {
      tabsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      if (!file) return; // user cancelled the file dialog

      if (!ALLOWED_TYPES.includes(file.type)) {
        setFileErrors((prev) => ({
          ...prev,
          [name]: "Only JPG, PNG or WEBP images are allowed",
        }));
        e.target.value = "";
        return;
      }
      if (file.size > MAX_FILE_BYTES) {
        setFileErrors((prev) => ({
          ...prev,
          [name]: `File size must be less than 1MB. Current size: ${(
            file.size /
            (1024 * 1024)
          ).toFixed(2)}MB`,
        }));
        e.target.value = "";
        return;
      }
      setFileErrors((prev) => ({ ...prev, [name]: null }));
      setFormData((prev) => ({ ...prev, [name]: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: sanitize(name, value) }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // validate a field as soon as the user leaves it (only if they typed something)
  const handleBlur = (e) => {
    const { name, value, type } = e.target;
    if (type === "file" || !value) return;
    const tabErrors = getTabErrors(activeTab, formData, teamSize);
    if (tabErrors[name]) {
      setErrors((prev) => ({ ...prev, [name]: tabErrors[name] }));
    }
  };

  const handleTeamSizeChange = (size) => {
    setTeamSize(size);
    setFormData((prev) => ({ ...prev, teamSize: size }));
    setActiveTab("lead");
    scrollToCard();
  };

  const tabs = [
    { id: "teamSize", ...TAB_META.teamSize },
    { id: "lead", ...TAB_META.lead },
    { id: "member1", ...TAB_META.member1 },
    { id: "member2", ...TAB_META.member2 },
    ...(teamSize === 4 ? [{ id: "member3", ...TAB_META.member3 }] : []),
    { id: "team", ...TAB_META.team },
    { id: "abstract", ...TAB_META.abstract },
    { id: "payment", ...TAB_META.payment },
  ];

  const validateAllTabs = () => {
    const newErrors = {};
    let firstErrorTab = null;

    tabs
      .filter((t) => t.id !== "teamSize")
      .forEach((t) => {
        const tabErrors = getTabErrors(t.id, formData, teamSize);
        if (!firstErrorTab && Object.keys(tabErrors).length > 0) {
          firstErrorTab = t.id;
        }
        Object.assign(newErrors, tabErrors);
      });

    setErrors(newErrors);

    // Return both validation result and the first tab with error
    return {
      isValid: Object.keys(newErrors).length === 0,
      firstErrorTab,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    // Validate all tabs
    const validationResult = validateAllTabs();

    // If there are errors, navigate to the first tab with an error
    if (!validationResult.isValid && validationResult.firstErrorTab) {
      setActiveTab(validationResult.firstErrorTab);

      // Scroll to the top of the form to ensure the error is visible
      scrollToCard();
      setIsLoading(false);

      return;
    }

    try {
      const formDataToSend = new FormData();

      // Append normal fields
      formDataToSend.append("theme", THEME);
      formDataToSend.append("abstract", formData.abstract);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("college", formData.college);
      formDataToSend.append("coupon", formData.coupon);
      formDataToSend.append("teamSize", formData.teamSize);
      formDataToSend.append("password", formData.password);

      // Lead
      formDataToSend.append("leadName", formData.leadName);
      formDataToSend.append("leadEmail", formData.leadEmail);
      formDataToSend.append("leadMobile", formData.leadMobile);
      formDataToSend.append("leadGender", formData.leadGender);
      formDataToSend.append("leadIsPwd", formData.leadPwd === "yes" ? 1 : 0);

      // Member 1
      formDataToSend.append("m1Name", formData.m1Name);
      formDataToSend.append("m1Email", formData.m1Email);
      formDataToSend.append("m1Mobile", formData.m1Mobile);
      formDataToSend.append("m1Gender", formData.m1Gender);
      formDataToSend.append("m1IsPwd", formData.m1Pwd === "yes" ? 1 : 0);

      // Member 2
      formDataToSend.append("m2Name", formData.m2Name);
      formDataToSend.append("m2Email", formData.m2Email);
      formDataToSend.append("m2Mobile", formData.m2Mobile);
      formDataToSend.append("m2Gender", formData.m2Gender);
      formDataToSend.append("m2IsPwd", formData.m2Pwd === "yes" ? 1 : 0);

      // Member 3 (only if teamSize === 4)
      if (formData.teamSize === 4) {
        formDataToSend.append("m3Name", formData.m3Name);
        formDataToSend.append("m3Email", formData.m3Email);
        formDataToSend.append("m3Mobile", formData.m3Mobile);
        formDataToSend.append("m3Gender", formData.m3Gender);
        formDataToSend.append("m3IsPwd", formData.m3Pwd === "yes" ? 1 : 0);
      }

      // Files
      if (formData.leadImage)
        formDataToSend.append("leadProfilePic", formData.leadImage);
      if (formData.m1Image)
        formDataToSend.append("m1ProfilePic", formData.m1Image);
      if (formData.m2Image)
        formDataToSend.append("m2ProfilePic", formData.m2Image);
      if (formData.m3Image)
        formDataToSend.append("m3ProfilePic", formData.m3Image);
      if (formData.paymentScreenshot)
        formDataToSend.append("paymentProof", formData.paymentScreenshot);

      // API Request
      const response = await fetch(`${BASE_URL}/register.php`, {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      console.log("Response:", result);

      if (result.success) {
        alert(`Registration successful! Team ID: ${result.data.team_id}`);
        navigate("/login");
      } else {
        alert(`Registration failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong while submitting the form.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabNavigation = (direction) => {
    if (direction === "next") {
      // Validate current tab before proceeding
      const newErrors = getTabErrors(activeTab, formData, teamSize);
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setErrors({});
    }

    const idx = tabs.findIndex((tab) => tab.id === activeTab);
    if (direction === "next" && idx < tabs.length - 1) {
      setActiveTab(tabs[idx + 1].id);
      scrollToCard();
    } else if (direction === "prev" && idx > 0) {
      setActiveTab(tabs[idx - 1].id);
      scrollToCard();
    }
  };

  const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
  const currentTab = tabs[currentIndex] || tabs[0];
  const isLastTab = activeTab === tabs[tabs.length - 1].id;
  const progress = ((currentIndex + 1) / tabs.length) * 100;

  const isDone = (id) =>
    id === "teamSize"
      ? currentIndex > 0
      : Object.keys(getTabErrors(id, formData, teamSize)).length === 0;

  const party = peopleFor(teamSize).map((p) => ({
    id: p,
    joined: !checkName(formData[`${p}Name`]),
  }));
  const joinedCount = party.filter((p) => p.joined).length;

  // keep the active step visible when the step list scrolls sideways (mobile)
  useEffect(() => {
    const bar = tabBarRef.current;
    const el = bar?.querySelector('[data-active="true"]');
    if (bar && el && bar.scrollWidth > bar.clientWidth) {
      bar.scrollTo({
        left: el.offsetLeft - bar.clientWidth / 2 + el.clientWidth / 2,
        behavior: "smooth",
      });
    }
  }, [activeTab]);

  // Enter moves to the next tab instead of submitting early
  const handleFormKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      e.target.tagName !== "TEXTAREA" &&
      e.target.tagName !== "BUTTON" &&
      !isLastTab
    ) {
      e.preventDefault();
      handleTabNavigation("next");
    }
  };

  const abstractLen = formData.abstract.trim().length;

  return (
    <div className="hf4 relative min-h-screen w-full overflow-x-hidden">
        <Navbar/>
        <img src={bg} alt="" className="fixed top-0 left-0 -z-10 h-screen w-screen object-cover" />
      <style>{styles}</style>
      <Scene bgImage={BG_IMAGE} />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-3 pb-14 pt-24 sm:px-6 sm:pt-28">
        {/* Hero */}
        <header className="mb-8 flex items-center justify-center gap-6 sm:mb-10 md:gap-14">
          <div className="hidden md:block">
            <Cube variant="grass" size={58} />
          </div>
          <div className="text-center">
            <h1 className="sr-only">{EVENT_NAME} Team Registration</h1>
            {/* <img
              src={logo}
              alt={EVENT_NAME}
              className="mc-logo mx-auto h-auto w-full max-w-[240px] sm:max-w-[340px]"
            /> */}
            <p className="px mc-title mt-10 text-white text-lg md:text-4xl">
              Team Registration
            </p>
          </div>
          <div className="hidden md:block">
            <Cube variant="ore" size={58} reverse />
          </div>
        </header>

        {/* Shell */}
        <div ref={tabsRef} className="mc-shell mc-shell-in scroll-mt-20" style={{ "--accent": currentTab.accent }}>
          <div className="mc-grass" />

          <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)]">
            {/* Step list */}
            <aside className="mc-aside p-3 lg:p-4">
              <div
                ref={tabBarRef}
                role="tablist"
                aria-label="Registration steps"
                className="no-scrollbar relative flex gap-2 overflow-x-auto p-1 lg:flex-col lg:overflow-visible"
              >
                {tabs.map((tab) => {
                  const active = activeTab === tab.id;
                  const done = isDone(tab.id);
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      data-active={active}
                      onClick={() => setActiveTab(tab.id)}
                      className={`mc-step ${active ? "on" : ""}`}
                      style={{ "--slot": tab.accent }}
                    >
                      <span className="swatch" />
                      <span className="label">{tab.label}</span>
                      {done && !active && (
                        <PixelIcon d={ICON_CHECK} size={16} className="mc-check" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* party */}
              <div className="mc-panel mt-4 hidden p-3 lg:block">
                <p className="px mb-3 text-[9px] text-gray-300">
                  Party {joinedCount}/{party.length}
                </p>
                <div className="flex gap-1">
                  {party.map((p, i) => (
                    <PixelHead
                      key={`${p.id}-${p.joined}`}
                      hair={HEAD_COLORS[i][0]}
                      skin={HEAD_COLORS[i][1]}
                      size={44}
                      className={`mc-head ${p.joined ? "on" : "off"}`}
                    />
                  ))}
                </div>
              </div>
            </aside>

            {/* Content */}
            <section className="min-w-0 p-4 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="px shrink-0 text-[9px] text-gray-300 sm:text-[10px]">
                  {currentIndex + 1}/{tabs.length}
                </span>
                <div
                  className="mc-xp w-full"
                  style={{ "--seg": `${100 / tabs.length}%` }}
                  role="progressbar"
                  aria-valuemin={1}
                  aria-valuemax={tabs.length}
                  aria-valuenow={currentIndex + 1}
                >
                  <div className="mc-xp-fill" style={{ width: `${progress}%` }} />
                  <div className="mc-xp-ticks" />
                </div>
              </div>

              <form onSubmit={handleSubmit} onKeyDown={handleFormKeyDown}>
                <div key={activeTab} className="mc-enter">
                  {/* Team Size Selection Tab */}
                  {activeTab === "teamSize" && (
                    <div className="text-center">
                      <SectionTitle>Select Team Size</SectionTitle>
                      <div className="mx-auto grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                        {[3, 4].map((n) => (
                          <button
                            key={n}
                            type="button"
                            aria-pressed={teamSize === n}
                            onClick={() => handleTeamSizeChange(n)}
                            className={`mc-btn flex-col !gap-3 !px-4 !py-6 ${
                              teamSize === n ? "on" : ""
                            }`}
                          >
                            <span className="flex justify-center gap-1">
                              {HEAD_COLORS.slice(0, n).map(([hair, skin], i) => (
                                <PixelHead
                                  key={i}
                                  hair={hair}
                                  skin={skin}
                                  size={n === 4 ? 34 : 40}
                                  className="mc-hop-head"
                                  style={{ "--d": `${i * 70}ms` }}
                                />
                              ))}
                            </span>
                            <span className="text-xs sm:text-sm">{n} Members</span>
                            <span
                              className="text-[22px] leading-none"
                              style={{ fontFamily: "'VT323', monospace", textShadow: "none" }}
                            >
                              Team Lead + {n - 1} Members
                            </span>
                          </button>
                        ))}
                      </div>
                      <p className="mc-hint mt-6 !text-[22px]">
                        Pick your team size to continue with registration
                      </p>
                    </div>
                  )}

                  {/* Lead Tab */}
                  {activeTab === "lead" && (
                    <PersonTab
                      prefix="lead"
                      title="Team Lead Information"
                      formData={formData}
                      errors={errors}
                      fileErrors={fileErrors}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    >
                      <Field
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        error={errors.password}
                        hint="At least 8 characters, with a letter and a number"
                        maxLength={64}
                        autoComplete="new-password"
                      />
                      <Field
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        error={errors.confirmPassword}
                        maxLength={64}
                        autoComplete="new-password"
                      />
                    </PersonTab>
                  )}

                  {/* Member 1 Tab */}
                  {activeTab === "member1" && (
                    <PersonTab
                      prefix="m1"
                      title="Member 1 Information"
                      formData={formData}
                      errors={errors}
                      fileErrors={fileErrors}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                  )}

                  {/* Member 2 Tab */}
                  {activeTab === "member2" && (
                    <PersonTab
                      prefix="m2"
                      title="Member 2 Information"
                      formData={formData}
                      errors={errors}
                      fileErrors={fileErrors}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                  )}

                  {/* Member 3 Tab - only shown if team size is 4 */}
                  {activeTab === "member3" && teamSize === 4 && (
                    <PersonTab
                      prefix="m3"
                      title="Member 3 Information"
                      formData={formData}
                      errors={errors}
                      fileErrors={fileErrors}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                  )}

                  {/* Team Info Tab */}
                  {activeTab === "team" && (
                    <div>
                      <SectionTitle>Team Information</SectionTitle>
                      <div className="mc-note mb-5">
                        Teams will be assigned a unique Pokémon name as their team
                        name after successful registration.
                      </div>
                      <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2">
                        <Field
                          label="College"
                          name="college"
                          value={formData.college}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          error={errors.college}
                          maxLength={100}
                          placeholder="Full college name"
                        />
                        <Field
                          label="City"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          error={errors.city}
                          maxLength={50}
                        />
                        <Field
                          label="Confirm Email"
                          type="email"
                          name="confirmEmail"
                          value={formData.confirmEmail}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          error={errors.confirmEmail}
                          hint="Must match team lead email"
                          maxLength={100}
                          autoComplete="off"
                        />
                        <Field
                          label="Coupon Code (Optional)"
                          name="coupon"
                          value={formData.coupon}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          error={errors.coupon}
                          required={false}
                          maxLength={20}
                          placeholder="Enter coupon code if available"
                        />
                      </div>
                    </div>
                  )}

                  {/* Abstract Tab */}
                  {activeTab === "abstract" && (
                    <div>
                      <SectionTitle>Abstract and PPT Submission</SectionTitle>
                      <div className="mc-note mb-5">
                        <Link to={PS_ROUTE} target="_blank" rel="noopener noreferrer">
                          Read the Problem Statement
                        </Link>
                        <span className="block text-[20px] opacity-80">
                          Opens in a new tab, so your form stays as it is.
                        </span>
                      </div>
                      <label htmlFor="abstract" className="mc-label">
                        Project Abstract <span className="text-red-400">*</span>
                      </label>
                      <p className="mc-hint !mt-0 mb-2">
                        Minimum {ABSTRACT_MIN} characters. You can edit the
                        abstract after submission from the dashboard. PPT is
                        optional: add the link in the abstract if you have one.
                      </p>
                      <textarea
                        id="abstract"
                        name="abstract"
                        value={formData.abstract}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        rows="8"
                        maxLength={ABSTRACT_MAX}
                        className={`mc-input ${errors.abstract ? "err" : ""}`}
                        placeholder="Describe your project idea, approach, and expected outcomes..."
                        required
                      />
                      {errors.abstract && <p className="mc-error">{errors.abstract}</p>}
                      <p
                        className="mc-hint"
                        style={{ color: abstractLen >= ABSTRACT_MIN ? "#7dea2b" : undefined }}
                      >
                        {formData.abstract.length}/{ABSTRACT_MAX} characters
                        {abstractLen < ABSTRACT_MIN
                          ? ` (${ABSTRACT_MIN - abstractLen} more needed)`
                          : ""}
                      </p>
                    </div>
                  )}

                  {/* Payment Tab */}
                  {activeTab === "payment" && (
                    <div>
                      <SectionTitle>Payment Information</SectionTitle>

                      <div className="mc-panel p-4 sm:p-6">
                        <h3 className="px mc-title mb-4 text-xs text-yellow-300 sm:text-sm">
                          Payment Instructions
                        </h3>
                        <ol className="space-y-1 text-[22px] leading-tight text-gray-200">
                          <li>1. Scan the QR code below using your UPI payment app</li>
                          <li>
                            2. Pay the registration fee of ₹{REGISTRATION_FEE} per team
                          </li>
                          <li>3. Take a screenshot of the successful payment</li>
                          <li>4. Upload the screenshot below</li>
                        </ol>

                        <div className="mt-6 flex flex-col items-center gap-6 md:flex-row md:items-start">
                          <div
                            className="shrink-0 border-4 border-black bg-white p-3"
                            style={{ boxShadow: "inset 0 0 0 3px #bdbdbd" }}
                          >
                            <div className="flex h-52 w-52 items-center justify-center bg-gray-200 sm:h-56 sm:w-56">
                              <img
                                src={QR_IMAGE}
                                alt="UPI QR Code"
                                className="h-full w-full object-contain"
                              />
                            </div>
                            <p className="mt-2 text-center text-[22px] text-black">
                              Registration Fee: ₹{REGISTRATION_FEE}
                            </p>
                          </div>

                          <div className="w-full flex-1">
                            <FileField
                              label="Payment Screenshot"
                              name="paymentScreenshot"
                              onChange={handleInputChange}
                              file={formData.paymentScreenshot}
                              error={errors.paymentScreenshot}
                              fileError={fileErrors.paymentScreenshot}
                              hint="Upload a clear screenshot of your successful payment. JPG, PNG or WEBP, maximum 1MB"
                            />
                            <div className="mc-note mt-5">
                              Note: Teams who don't get shortlisted in the final
                              round will get a full refund of the registration fee.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="mt-8 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => handleTabNavigation("prev")}
                    disabled={activeTab === "teamSize"}
                    className="mc-btn prev"
                  >
                    <PixelIcon d={ICON_ARROW} size={14} flip />
                    Previous
                  </button>

                  {!isLastTab ? (
                    <button
                      type="button"
                      onClick={() => handleTabNavigation("next")}
                      className="mc-btn green next"
                    >
                      Next
                      <PixelIcon d={ICON_ARROW} size={14} />
                    </button>
                  ) : (
                    <button type="submit" disabled={isLoading} className="mc-btn green">
                      {isLoading ? "Processing..." : "Submit Registration"}
                    </button>
                  )}
                </div>
              </form>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;