import { motion } from "motion/react"
import { Link } from "react-router-dom"

// animatable react-router Link (use motion(Link) if you're on an older framer-motion)
const MotionLink = motion.create(Link)

// change these paths to match your routes
const LEFT_LINKS = [
    { label: "Home", to: "/" },
    { label: "Sponsors", to: "/sponsors" },
]

const RIGHT_LINKS = [
    { label: "Schedule", to: "/schedule" },
    { label: "Contact", to: "/contact" },
]

/* A single wooden sign hanging from two chains */
function HangingSign({ to, index, children, square = false }) {
    return (
        <motion.div
            className="pointer-events-auto"
            initial={{ y: -180, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 80,
                damping: 9,
                delay: 0.12 * index,
            }}
        >
            <MotionLink
                to={to}
                className="mc-sign-link block"
                style={{ transformOrigin: "50% 0%" }}
                whileHover={{ rotate: index % 2 ? -6 : 6 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 220, damping: 7 }}
            >
                {/* idle sway lives in CSS so it never fights the hover animation */}
                <div
                    className="mc-sway"
                    style={{ animationDelay: `${index * -0.9}s` }}
                >
                    <div className="mc-chain-row">
                        <span className="mc-chain mc-chain-l" />
                        <span className="mc-chain mc-chain-r" />
                    </div>
                    <div className={`mc-plank ${square ? "mc-plank-square" : ""}`}>
                        {children}
                    </div>
                </div>
            </MotionLink>
        </motion.div>
    )
}

/* Small pixel grass block used as the centre "logo" sign */
function GrassBlock() {
    return <span className="mc-grass" aria-label="Home" />
}

export default function Navbar() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

                .mc-sway {
                    transform-origin: 50% 0%;
                    animation: mc-sway 5s ease-in-out infinite;
                }
                @keyframes mc-sway {
                    0%, 100% { transform: rotate(-1.8deg); }
                    50%      { transform: rotate(1.8deg); }
                }

                /* chains */
                .mc-chain-row {
                    position: relative;
                    width: 100%;
                    height: 44px;
                }
                .mc-chain {
                    position: absolute;
                    top: -4px;
                    bottom: -2px;
                    width: 8px;
                    background: repeating-linear-gradient(
                        180deg,
                        #aab0b6 0 4px,
                        #50565c 4px 6px,
                        #747b82 6px 10px,
                        #23272b 10px 12px
                    );
                    box-shadow:
                        inset 2px 0 0 rgba(255,255,255,.3),
                        inset -2px 0 0 rgba(0,0,0,.4);
                    image-rendering: pixelated;
                }
                .mc-chain-l { left: 16%; }
                .mc-chain-r { right: 16%; }

                /* wooden plank */
                .mc-plank {
                    position: relative;
                    font-family: 'Press Start 2P', monospace;
                    font-size: 11px;
                    line-height: 1;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                    white-space: nowrap;
                    color: #2a1808;
                    padding: 16px 20px;
                    background:
                        repeating-linear-gradient(0deg, rgba(0,0,0,.08) 0 4px, transparent 4px 10px),
                        repeating-linear-gradient(90deg, rgba(255,255,255,.05) 0 6px, transparent 6px 22px),
                        #a97c46;
                    border: 4px solid #3b2410;
                    box-shadow:
                        inset 4px 4px 0 rgba(255,255,255,.22),
                        inset -4px -4px 0 rgba(0,0,0,.28),
                        0 8px 0 rgba(0,0,0,.35);
                    text-shadow: 2px 2px 0 rgba(255,255,255,.2);
                    transition: filter .15s ease, color .15s ease, text-shadow .15s ease;
                }
                .mc-plank-square { padding: 10px; }
                /* nails */
                .mc-plank::before,
                .mc-plank::after {
                    content: "";
                    position: absolute;
                    top: 5px;
                    width: 4px;
                    height: 4px;
                    background: #3b2410;
                }
                .mc-plank::before { left: 5px; }
                .mc-plank::after  { right: 5px; }

                .mc-sign-link:hover .mc-plank {
                    filter: brightness(1.18);
                    color: #fff;
                    text-shadow: 2px 2px 0 #3b2410;
                }

                /* grass block icon */
                .mc-grass {
                    display: block;
                    width: 34px;
                    height: 34px;
                    border: 3px solid #2a1808;
                    background:
                        linear-gradient(#63b23b 0 34%, #3f7d24 34% 42%, transparent 42%),
                        repeating-linear-gradient(90deg, rgba(0,0,0,.15) 0 4px, transparent 4px 8px),
                        #7b5230;
                    image-rendering: pixelated;
                }

                @media (max-width: 640px) {
                    .mc-plank { font-size: 8px; padding: 12px 9px; }
                    .mc-plank-square { padding: 7px; }
                    .mc-grass { width: 24px; height: 24px; }
                    .mc-chain-row { height: 32px; }
                    .mc-chain { width: 6px; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .mc-sway { animation: none; }
                }
            `}</style>

            <nav className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-center gap-2 sm:gap-8">
                {LEFT_LINKS.map((l, i) => (
                    <HangingSign key={l.label} to={l.to} index={i}>
                        {l.label}
                    </HangingSign>
                ))}

                <HangingSign to="/" index={2} square>
                    <GrassBlock />
                </HangingSign>

                {RIGHT_LINKS.map((l, i) => (
                    <HangingSign key={l.label} to={l.to} index={i + 3}>
                        {l.label}
                    </HangingSign>
                ))}
            </nav>
        </>
    )
}