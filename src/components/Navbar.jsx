import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Link } from "react-router-dom"

const MotionLink = motion.create(Link)

// change these paths to match your routes
const LEFT_LINKS = [
    { label: "Home", to: "/" },
    { label: "Schedule", to: "/schedule" },
    { label: "Sponsors", to: "/sponsors" },
]

const RIGHT_LINKS = [
    { label: "PS", to: "/" },
    { label: "FAQ", to: "/faq" },
    { label: "Contact", to: "/contact" },
]

const MOBILE_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS]

/* A single wooden sign hanging from two chains. Renders a link when `to` is given, otherwise a button. */
function HangingSign({ to, index, children, square = false, onClick, label, expanded }) {
    const reduceMotion = useReducedMotion()
    const Tag = to ? MotionLink : motion.button
    const tagProps = to
        ? { to }
        : { type: "button", onClick, "aria-label": label, "aria-expanded": expanded }

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
            <Tag
                {...tagProps}
                className="group block cursor-pointer"
                style={{ transformOrigin: "50% 0%" }}
                whileHover={{ rotate: index % 2 ? -6 : 6 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 220, damping: 7 }}
            >
                {/* idle sway, on its own element so it never fights the hover rotate */}
                <motion.div
                    style={{ transformOrigin: "50% 0%" }}
                    initial={{ rotate: -1.8 }}
                    animate={reduceMotion ? undefined : { rotate: 1.8 }}
                    transition={{
                        duration: 2.5,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "mirror",
                        delay: index * -0.9,
                    }}
                >
                    {/* chains */}
                    <div className="relative h-8 w-full sm:h-11">
                        <span className="absolute -top-1 -bottom-0.5 left-[16%] w-1.5 [image-rendering:pixelated] [background-image:repeating-linear-gradient(180deg,#aab0b6_0_4px,#50565c_4px_6px,#747b82_6px_10px,#23272b_10px_12px)] shadow-[inset_2px_0_0_rgba(255,255,255,0.3),inset_-2px_0_0_rgba(0,0,0,0.4)] sm:w-2" />
                        <span className="absolute -top-1 -bottom-0.5 right-[16%] w-1.5 [image-rendering:pixelated] [background-image:repeating-linear-gradient(180deg,#aab0b6_0_4px,#50565c_4px_6px,#747b82_6px_10px,#23272b_10px_12px)] shadow-[inset_2px_0_0_rgba(255,255,255,0.3),inset_-2px_0_0_rgba(0,0,0,0.4)] sm:w-2" />
                    </div>

                    {/* wooden plank */}
                    <div
                        className={`relative whitespace-nowrap border-4 border-[#3b2410] bg-[#a97c46] font-['Press_Start_2P',monospace] text-[8px] uppercase leading-none tracking-[0.5px] text-[#2a1808] [background-image:repeating-linear-gradient(0deg,rgba(0,0,0,0.08)_0_4px,transparent_4px_10px),repeating-linear-gradient(90deg,rgba(255,255,255,0.05)_0_6px,transparent_6px_22px)] [text-shadow:2px_2px_0_rgba(255,255,255,0.2)] shadow-[inset_4px_4px_0_rgba(255,255,255,0.22),inset_-4px_-4px_0_rgba(0,0,0,0.28),0_8px_0_rgba(0,0,0,0.35)] transition-[filter,color,text-shadow] duration-150 ease-in-out before:absolute before:left-[5px] before:top-[5px] before:h-1 before:w-1 before:bg-[#3b2410] before:content-[''] after:absolute after:right-[5px] after:top-[5px] after:h-1 after:w-1 after:bg-[#3b2410] after:content-[''] group-hover:text-white group-hover:brightness-[1.18] group-hover:[text-shadow:2px_2px_0_#3b2410] sm:text-[11px] ${
                            square ? "p-[7px] sm:p-2.5" : "px-[9px] py-3 sm:px-5 sm:py-4"
                        }`}
                    >
                        {children}
                    </div>
                </motion.div>
            </Tag>
        </motion.div>
    )
}

/* Small pixel grass block used as the centre "logo" sign */
function GrassBlock() {
    return (
        <span
            aria-label="Home"
            className="block h-6 w-6 border-[3px] border-[#2a1808] bg-[#7b5230] [image-rendering:pixelated] [background-image:linear-gradient(#63b23b_0_34%,#3f7d24_34%_42%,transparent_42%),repeating-linear-gradient(90deg,rgba(0,0,0,0.15)_0_4px,transparent_4px_8px)] sm:h-[34px] sm:w-[34px]"
        />
    )
}

/* Three chunky pixel bars that morph into an X when the menu is open */
function BurgerIcon({ open }) {
    return (
        <span className="relative block h-6 w-6">
            <motion.span
                className="absolute left-0 top-[2px] block h-1 w-6 bg-[#2a1808] shadow-[inset_1px_1px_0_rgba(255,255,255,0.3)] transition-colors duration-150 group-hover:bg-white"
                animate={open ? { y: 8, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            <motion.span
                className="absolute left-0 top-[10px] block h-1 w-6 bg-[#2a1808] shadow-[inset_1px_1px_0_rgba(255,255,255,0.3)] transition-colors duration-150 group-hover:bg-white"
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.15 }}
            />
            <motion.span
                className="absolute left-0 top-[18px] block h-1 w-6 bg-[#2a1808] shadow-[inset_1px_1px_0_rgba(255,255,255,0.3)] transition-colors duration-150 group-hover:bg-white"
                animate={open ? { y: -8, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
        </span>
    )
}

export default function Navbar() {
    const [open, setOpen] = useState(false)

    // close on Escape
    useEffect(() => {
        if (!open) return
        const onKey = (e) => e.key === "Escape" && setOpen(false)
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [open])

    return (
        <>
            {/* desktop / tablet nav */}
            <nav className="pointer-events-none fixed inset-x-0 top-0 z-50 hidden items-start justify-center gap-8 sm:flex">
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

            {/* mobile nav: home sign on the left, hamburger sign on the right */}
            <nav className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between px-3 sm:hidden">
                <HangingSign to="/" index={0} square>
                    <GrassBlock />
                </HangingSign>

                <HangingSign
                    index={1}
                    square
                    onClick={() => setOpen((v) => !v)}
                    label={open ? "Close menu" : "Open menu"}
                    expanded={open}
                >
                    <BurgerIcon open={open} />
                </HangingSign>
            </nav>

            {/* mobile menu */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* dim backdrop, tap to close */}
                        <motion.div
                            key="backdrop"
                            className="fixed inset-0 z-40 bg-black/50 sm:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setOpen(false)}
                        />

                        {/* board hanging from chains */}
                        <motion.div
                            key="panel"
                            className="fixed right-3 top-[78px] z-50 w-[min(14rem,calc(100vw-1.5rem))] sm:hidden"
                            style={{ transformOrigin: "100% 0%" }}
                            initial={{ opacity: 0, y: -24, scale: 0.92 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -24, scale: 0.92 }}
                            transition={{ type: "spring", stiffness: 220, damping: 16 }}
                        >
                            {/* chains */}
                            <div className="relative h-4 w-full">
                                <span className="absolute -top-1 -bottom-0.5 left-[16%] w-1.5 [image-rendering:pixelated] [background-image:repeating-linear-gradient(180deg,#aab0b6_0_4px,#50565c_4px_6px,#747b82_6px_10px,#23272b_10px_12px)] shadow-[inset_2px_0_0_rgba(255,255,255,0.3),inset_-2px_0_0_rgba(0,0,0,0.4)]" />
                                <span className="absolute -top-1 -bottom-0.5 right-[16%] w-1.5 [image-rendering:pixelated] [background-image:repeating-linear-gradient(180deg,#aab0b6_0_4px,#50565c_4px_6px,#747b82_6px_10px,#23272b_10px_12px)] shadow-[inset_2px_0_0_rgba(255,255,255,0.3),inset_-2px_0_0_rgba(0,0,0,0.4)]" />
                            </div>

                            {/* wooden board */}
                            <div className="relative border-4 border-[#3b2410] bg-[#a97c46] p-3 [background-image:repeating-linear-gradient(0deg,rgba(0,0,0,0.08)_0_4px,transparent_4px_10px),repeating-linear-gradient(90deg,rgba(255,255,255,0.05)_0_6px,transparent_6px_22px)] shadow-[inset_4px_4px_0_rgba(255,255,255,0.22),inset_-4px_-4px_0_rgba(0,0,0,0.28),0_8px_0_rgba(0,0,0,0.35)] before:absolute before:left-[5px] before:top-[5px] before:h-1 before:w-1 before:bg-[#3b2410] before:content-[''] after:absolute after:right-[5px] after:top-[5px] after:h-1 after:w-1 after:bg-[#3b2410] after:content-['']">
                                <p className="mb-3 mt-1 text-center font-['Press_Start_2P',monospace] text-[9px] uppercase leading-none tracking-[0.5px] text-[#2a1808] [text-shadow:2px_2px_0_rgba(255,255,255,0.2)]">
                                    Menu
                                </p>

                                <div className="flex flex-col gap-3">
                                    {MOBILE_LINKS.map((l, i) => (
                                        <MotionLink
                                            key={l.label}
                                            to={l.to}
                                            onClick={() => setOpen(false)}
                                            className="block w-full cursor-pointer border-4 border-black bg-[#7d7d7d] px-4 py-3 text-center font-['Press_Start_2P',monospace] text-[10px] uppercase leading-snug text-white [text-shadow:2px_2px_0_rgba(0,0,0,0.55)] shadow-[inset_4px_4px_0_rgba(255,255,255,0.38),inset_-4px_-4px_0_rgba(0,0,0,0.38),0_4px_0_rgba(0,0,0,0.4)] transition-[filter] duration-150 ease-in-out hover:brightness-[1.2] active:brightness-[1.2]"
                                            initial={{ opacity: 0, x: 24 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + i * 0.06, duration: 0.3 }}
                                            whileTap={{ scale: 0.96 }}
                                        >
                                            {l.label}
                                        </MotionLink>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}