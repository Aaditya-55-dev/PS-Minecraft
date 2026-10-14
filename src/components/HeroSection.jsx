import { motion } from "motion/react"
import { Link } from "react-router-dom"
import HeroImg from "../assets/mcmain.jpg"
import Logo from "../assets/logo.png"
import Countdown from "../components/Countdown"
import { useEffect, useRef, useState } from "react";

// animatable react-router Link (use motion(Link) if you're on an older framer-motion)
const MotionLink = motion.create(Link)

// flip these as needed (change the paths to match your routes)
const REGISTRATION_OPEN = true
const REGISTER_PATH = "/register"
const PROBLEM_STATEMENT_PATH = "/problem-statement"
const LOGIN_PATH = "/login"

function McButton({ to, children, color = "#7d7d7d", disabled = false, delay = 0 }) {
    const shared = {
        className: "mc-btn w-full",
        style: { "--bg": color, opacity: disabled ? 0.65 : 1, cursor: disabled ? "not-allowed" : "pointer" },
        initial: { opacity: 0, y: 20 },
        animate: { opacity: disabled ? 0.65 : 1, y: 0 },
        transition: { delay, duration: 0.5 },
        whileHover: disabled ? undefined : { scale: 1.05 },
        whileTap: disabled ? undefined : { scale: 0.96 },
    }

    // a disabled button is not a link at all
    if (disabled) {
        return (
            <motion.span aria-disabled="true" {...shared}>
                {children}
            </motion.span>
        )
    }

    return (
        <MotionLink to={to} {...shared}>
            {children}
        </MotionLink>
    )
}

export default function HeroSection() {
    const [heroLoaded, setHeroLoaded] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
  const img = imgRef.current;
  if (img && img.complete) setHeroLoaded(true);
  // fallback so it can never stay invisible
  const id = setTimeout(() => setHeroLoaded(true), 1500);
  return () => clearTimeout(id);
}, []);

    return (
        <section id="home" className="relative w-full min-h-screen overflow-hidden">
            <style>{`
                .mc-btn {
                    font-family: 'Press Start 2P', monospace;
                    font-size: 11px;
                    color: #fff;
                    text-align: center;
                    text-transform: uppercase;
                    text-shadow: 2px 2px 0 rgba(0,0,0,.55);
                    padding: 14px 22px;
                    background: var(--bg);
                    border: 4px solid #000;
                    box-shadow:
                        inset 4px 4px 0 rgba(255,255,255,.38),
                        inset -4px -4px 0 rgba(0,0,0,.38),
                        0 6px 0 rgba(0,0,0,.4);
                    transition: filter .15s ease;
                }
                .mc-btn:hover { filter: brightness(1.2); }
                @media (min-width: 640px) {
                    .mc-btn { font-size: 13px; padding: 16px 28px; }
                }
            `}</style>

            {/* background */}
            <img
                ref={imgRef}
                src={HeroImg}
                alt=""
                onLoad={() => setHeroLoaded(true)}
                onError={() => setHeroLoaded(true)}
                className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ease-in-out ${
                    heroLoaded ? "opacity-100" : "opacity-0"
                }`}
            />
            <div className="absolute inset-0 z-0" />

            {/* content */}
            <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-6 px-4 pt-28 pb-16 sm:gap-8">
                <motion.img
                    src={Logo}
                    alt="HackFusion"
                    className="h-50 sm:h-56 md:h-70 drop-shadow-[0_10px_0_rgba(0,0,0,0.35)] -mt-40 md:-mt-15"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                    transition={{
                        opacity: { duration: 0.6 },
                        scale: { type: "spring", stiffness: 120, damping: 12 },
                        // y: { duration: 0, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
                    }}
                />

                <motion.p
                    className="text-center text-[11px] text-black sm:text-sm md:text-base -mt-17 md:-mt-25 mb-5"
                    style={{ fontFamily: "'Press Start 2P', monospace", textShadow: "3px 3px 0 rgb(255,255,255)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    "Code. Compete. Survive."
                </motion.p>

                <div className="flex flex-col items-center gap-4 sm:flex-col sm:gap-5">
                    <McButton

                        to={REGISTER_PATH}
                        color={REGISTRATION_OPEN ? "#4f9a2f" : "#7d7d7d"}
                        disabled={!REGISTRATION_OPEN}
                        delay={0.4}
                    >
                        {REGISTRATION_OPEN ? "Register Now" : "Registration Closed"}
                    </McButton>
                    <McButton to={PROBLEM_STATEMENT_PATH} color="#3a6fc4" delay={0.6}>
                        View Problem Statement
                    </McButton>
                    <McButton to={LOGIN_PATH} color="#c43a3a" delay={0.8}>
                        Login
                    </McButton>
                </div>

                <Countdown />
            </div>
        </section>
    )
}