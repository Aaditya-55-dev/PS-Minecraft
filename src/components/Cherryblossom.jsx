import { useEffect, useRef } from "react"

// [main, highlight, shadow] per petal, so each block has a little pixel shading
const PALETTES = [
    ["#ffb3c6", "#ffd9e3", "#e8809f"],
    ["#ffc2d1", "#ffe6ed", "#f08fae"],
    ["#ffa6bd", "#ffd0dc", "#dd7394"],
    ["#ffd0dc", "#fff0f4", "#f4a0b9"],
]

const STEP = Math.PI / 4 // petals tumble in 45 degree steps for a chunky look

const rand = (a, b) => a + Math.random() * (b - a)

/* A blocky petal: one rectangle with a light top-left edge and a dark bottom-right edge */
function drawPetal(ctx, p) {
    const w = p.size
    const h = p.size * 0.7
    const e = Math.max(2, Math.round(p.size / 4)) // edge thickness

    ctx.save()
    ctx.translate(Math.round(p.x), Math.round(p.y))
    ctx.rotate(Math.round(p.rot / STEP) * STEP)
    ctx.globalAlpha = p.alpha

    ctx.fillStyle = p.palette[0]
    ctx.fillRect(-w / 2, -h / 2, w, h)

    ctx.fillStyle = p.palette[1]
    ctx.fillRect(-w / 2, -h / 2, w, e) // top edge
    ctx.fillRect(-w / 2, -h / 2, e, h) // left edge

    ctx.fillStyle = p.palette[2]
    ctx.fillRect(-w / 2, h / 2 - e, w, e) // bottom edge
    ctx.fillRect(w / 2 - e, -h / 2, e, h) // right edge

    ctx.restore()
}

/**
 * Wrap a page with <CherryBlossom>. Every few seconds a small bunch of
 * blocky petals sweeps from the top right to the bottom left.
 */
export default function CherryBlossom({ children }) {
    const canvasRef = useRef(null)

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        let w = 0
        let h = 0
        let petals = []
        let raf = null
        let last = 0
        let timer = null

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            w = window.innerWidth
            h = window.innerHeight
            canvas.width = w * dpr
            canvas.height = h * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        }

        const frame = (t) => {
            const dt = Math.min((t - last) / 1000, 0.05)
            last = t
            ctx.clearRect(0, 0, w, h)

            petals = petals.filter((p) => {
                if (p.delay > 0) {
                    p.delay -= dt * 1000
                    return true // waiting to enter
                }

                p.age += dt
                // small wobble across the direction of travel
                const wobble = Math.sin(p.age * p.wobbleSpeed + p.phase) * p.wobbleAmp
                p.x += (p.vx + wobble * 0.7) * dt
                p.y += (p.vy + wobble * 0.7) * dt
                p.rot += p.rotSpeed * dt

                drawPetal(ctx, p)

                return p.y < h + 40 && p.x > -60
            })

            if (petals.length > 0) {
                raf = requestAnimationFrame(frame)
            } else {
                raf = null
                ctx.clearRect(0, 0, w, h)
            }
        }

        const startLoop = () => {
            if (raf === null) {
                last = performance.now()
                raf = requestAnimationFrame(frame)
            }
        }

        const burst = () => {
            const count = Math.random() < 0.5 ? 5 : 6

            // the whole bunch shares one start point (top right) and one end point (bottom left)
            const startX = rand(0.65 * w, 1.0 * w)
            const endX = rand(0, 0.3 * w)

            for (let i = 0; i < count; i++) {
                const sx = startX + rand(-60, 60)
                const sy = -rand(20, 90)
                const tx = endX + rand(-60, 60)
                const ty = h + 40
                const duration = rand(1.6, 2.4) // seconds to cross the screen, so it's quick

                petals.push({
                    x: sx,
                    y: sy,
                    vx: (tx - sx) / duration,
                    vy: (ty - sy) / duration,
                    size: rand(9, 15),
                    rot: rand(0, Math.PI * 2),
                    rotSpeed: rand(-6, 6),
                    wobbleAmp: rand(15, 40),
                    wobbleSpeed: rand(4, 8),
                    phase: rand(0, Math.PI * 2),
                    age: 0,
                    palette: PALETTES[Math.floor(Math.random() * PALETTES.length)],
                    alpha: rand(0.85, 1),
                    delay: rand(0, 700),
                })
            }

            startLoop()
            timer = setTimeout(burst, rand(5000, 9000)) // quiet gap before the next bunch
        }

        resize()
        window.addEventListener("resize", resize)
        timer = setTimeout(burst, 1500)

        return () => {
            clearTimeout(timer)
            if (raf !== null) cancelAnimationFrame(raf)
            window.removeEventListener("resize", resize)
        }
    }, [])

    return (
        <>
            {children}
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 z-40"
            />
        </>
    )
}