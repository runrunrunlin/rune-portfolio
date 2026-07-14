import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import WatercolorCanvas from './WatercolorCanvas'

function MagneticPortrait(){
  const ref=useRef<HTMLDivElement>(null)
  useEffect(()=>{
    const el=ref.current!
    const PADDING=140,STR=3.2
    const onMove=(e:MouseEvent)=>{
      const r=el.getBoundingClientRect()
      const cx=r.left+r.width/2,cy=r.top+r.height/2
      const dx=e.clientX-cx,dy=e.clientY-cy
      const dist=Math.sqrt(dx*dx+dy*dy)
      const active=dist<r.width/2+PADDING
      el.style.transition=active?'transform .3s ease-out':'transform .6s ease-in-out'
      el.style.transform=active?`translate(calc(-50% + ${dx/STR}px),calc(-50% + ${dy/STR}px))`:'translate(-50%,-50%)'
    }
    document.addEventListener('mousemove',onMove)
    return()=>document.removeEventListener('mousemove',onMove)
  },[])
  return(
    <div ref={ref} className="absolute left-1/2 top-1/2 z-[3]" style={{transform:'translate(-50%,-50%)',width:'clamp(180px,26vw,360px)'}}>
      <div className="bg-white rounded-sm p-[10px] pb-8 hover:scale-[1.02] transition-transform duration-500"
        style={{boxShadow:'0 30px 80px -20px rgba(43,43,46,.3)',transform:'rotate(-2deg)'}}>
        <img src="/images/FullSizeRender.jpg" alt="Rune" className="w-full block rounded-[3px] object-cover" style={{aspectRatio:'3/4'}}/>
        <p className="font-mono text-[.62rem] text-center text-[#aaa] pt-2 tracking-[.04em]">phi phi island ☀️</p>
      </div>
    </div>
  )
}

const f=(delay:number,y=20)=>({initial:{opacity:0,y},animate:{opacity:1,y:0},transition:{duration:.8,delay,ease:[.25,.1,.25,1] as const}})

export default function Hero(){
  return(
    <section className="relative h-screen min-h-[640px] flex flex-col overflow-x-clip">
      <div className="absolute inset-0 z-0"><WatercolorCanvas className="absolute inset-0"/></div>

      <motion.div {...f(.15,-20)} className="relative z-[2] flex justify-between items-center px-[5vw] pt-24">
        <span className="font-mono text-[.72rem] tracking-[.1em] uppercase text-[#55534f]/70">CS grad · Edmonton AB · building with care</span>
        <span className="font-mono text-[.72rem] text-[#55534f]/60">scroll to explore ↓</span>
      </motion.div>

      <motion.div {...f(.28,40)} className="relative z-[2] flex-1 flex items-center justify-center overflow-hidden px-[5vw]">
        <h1 className="font-fraunces font-black uppercase tracking-[-0.02em] leading-[.94] whitespace-nowrap w-full text-center grad-head"
          style={{fontSize:'clamp(3.8rem,15vw,12rem)'}}>
          Hi, I'm Rune
        </h1>
      </motion.div>

      <motion.div {...f(.55,30)} className="contents"><MagneticPortrait/></motion.div>

      <div className="relative z-[2] flex justify-between items-end px-[5vw] pb-9">
        <motion.p {...f(.38,20)} className="font-grotesk font-light uppercase tracking-[.04em] leading-snug text-[#55534f] max-w-[220px]"
          style={{fontSize:'clamp(.78rem,1.3vw,1.05rem)'}}>
          Full-stack developer. equal joy in clean code, good light &amp; golden retrievers.
        </motion.p>
        <motion.a {...f(.5,20)} href="#contact"
          className="inline-flex items-center gap-2 font-mono font-semibold text-[.8rem] uppercase tracking-[.1em] text-white px-7 py-3.5 rounded-full no-underline hover:-translate-y-1 transition-all duration-300"
          style={{background:'linear-gradient(125deg,#E85D3D,#FF9B6B,#FFB347)',boxShadow:'0 8px 28px rgba(232,93,61,.35)'}}>
          Get in touch ↗
        </motion.a>
      </div>
    </section>
  )
}
