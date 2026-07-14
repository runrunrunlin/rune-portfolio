import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const links = ['About','Experience','Projects','Gallery','Contact']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .7, ease: [.25,.1,.25,1] }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-[5vw] transition-all duration-400 ${
        scrolled ? 'py-[14px] bg-cream/88 backdrop-blur-xl shadow-[0_1px_0_rgba(43,43,46,.08)]' : 'py-[22px]'
      }`}
    >
      <a href="#" className="font-fraunces font-bold text-[1.4rem] tracking-[-0.02em] text-ink no-underline">
        Rune<em className="not-italic text-coral-d">.</em>
      </a>
      <div className="hidden md:flex gap-9">
        {links.map(l => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            className="font-mono text-[.78rem] tracking-[.08em] uppercase text-ink2 no-underline transition-opacity hover:opacity-50"
          >{l}</a>
        ))}
      </div>
    </motion.nav>
  )
}
