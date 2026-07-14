import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
const links=[{l:'About',h:'#about'},{l:'Experience',h:'#experience'},{l:'Projects',h:'#projects'},{l:'Gallery',h:'#gallery'},{l:'Contact',h:'#contact'}]
export default function Navbar(){
  const [sc,setSc]=useState(false)
  useEffect(()=>{const f=()=>setSc(window.scrollY>60);window.addEventListener('scroll',f,{passive:true});return()=>window.removeEventListener('scroll',f)},[])
  return(
    <motion.nav initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.1}}
      className={`fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-[5vw] transition-all duration-300 ${sc?'py-3 bg-[#FBF6EC]/85 backdrop-blur-md shadow-[0_1px_0_rgba(43,43,46,0.08)]':'py-5'}`}>
      <a href="#" className="font-fraunces font-bold text-[1.4rem] tracking-tight text-[#2B2B2E] no-underline">
        Rune<em className="not-italic text-[#E85D3D]">.</em>
      </a>
      <div className="hidden md:flex gap-9">
        {links.map(l=>(
          <a key={l.h} href={l.h} className="font-mono text-[.78rem] tracking-[.08em] uppercase text-[#55534f] no-underline hover:opacity-50 transition-opacity duration-200">{l.l}</a>
        ))}
      </div>
    </motion.nav>
  )
}
