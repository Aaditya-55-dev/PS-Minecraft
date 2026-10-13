import { useState } from 'react'
import './App.css'
import { motion } from 'motion/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="flex flex-col items-center gap-6 rounded-3xl border border-slate-700 bg-slate-800/70 p-10 shadow-2xl"
      >
        <div className="text-sm uppercase tracking-[0.25em] text-sky-300">HackFusion 4.0</div>
        <motion.div
          className="flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-4xl font-bold shadow-lg"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
        >
          {count}
        </motion.div>
        <button
          type="button"
          onClick={() => setCount((value) => value + 1)}
          className="rounded-full bg-blue-500 px-5 py-2.5 font-medium text-white transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Increment
        </button>
      </motion.div>
    </div>
  )
}

export default App
