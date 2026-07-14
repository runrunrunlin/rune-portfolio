import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function AnimatedText({text}:{text:string}){
  const ref=useRef<HTMLParagraphElement>(null)
  const chars=text.split('')
  useEffect(()=>{
    function update(){
      if(!ref.current)return
      const rect=ref.current.getBoundingClientRect()
      const H=window.innerHeight
      const progress=Math.max(0,Math.min(1,1-(rect.top-H*.2)/(rect.height+H*.6)))
      const lit=Math.floor(progress*chars.length)
      ref.current.querySelectorAll<HTMLSpanElement>('.char').forEach((s,i)=>{
        s.style.opacity=i<lit?'1':'0.18'
      })
    }
    window.addEventListener('scroll',update,{passive:true});update()
    return()=>window.removeEventListener('scroll',update)
  },[chars.length])
  return(
    <p ref={ref} className="font-grotesk font-light leading-relaxed text-[#55534f] text-center max-w-[580px]"
      style={{fontSize:'clamp(1rem,1.8vw,1.3rem)'}}>
      {chars.map((c,i)=>(
        <span key={i} className="char transition-opacity duration-75" style={{opacity:.18}}>
          {c===' '?'\u00a0':c}
        </span>
      ))}
    </p>
  )
}

const DecoBlobTL=()=>(
  <svg className="absolute top-[5%] left-[2%] pointer-events-none opacity-0 reveal-tl"
    style={{width:'clamp(90px,14vw,200px)'}} viewBox="0 0 200 200">
    <path d="M50,10 Q110,-10 160,50 Q210,110 160,170 Q110,230 50,190 Q-10,150 10,90 Q30,30 50,10Z" fill="rgba(255,155,107,.38)"/>
  </svg>
)
const DecoBlobTR=()=>(
  <svg className="absolute top-[5%] right-[2%] pointer-events-none opacity-0 reveal-tr"
    style={{width:'clamp(90px,14vw,200px)'}} viewBox="0 0 200 200">
    <path d="M60,20 Q120,0 165,60 Q200,120 155,175 Q110,220 55,185 Q0,150 15,90 Q30,30 60,20Z" fill="rgba(122,184,212,.33)"/>
  </svg>
)
const DecoBlobBL=()=>(
  <svg className="absolute bottom-[8%] left-[5%] pointer-events-none opacity-0 reveal-bl"
    style={{width:'clamp(80px,12vw,170px)'}} viewBox="0 0 200 200">
    <path d="M40,10 Q100,-5 155,55 Q205,115 165,175 Q120,225 55,190 Q-5,155 5,90 Q15,25 40,10Z" fill="rgba(107,175,120,.3)"/>
  </svg>
)
const DecoBlobBR=()=>(
  <svg className="absolute bottom-[8%] right-[5%] pointer-events-none opacity-0 reveal-br"
    style={{width:'clamp(80px,12vw,170px)'}} viewBox="0 0 200 200">
    <path d="M55,15 Q115,-5 165,55 Q210,115 165,175 Q120,230 55,195 Q-5,160 10,95 Q25,30 55,15Z" fill="rgba(255,205,88,.35)"/>
  </svg>
)

export default function About(){
  const headRef=useRef<HTMLHeadingElement>(null)
  const inView=useInView(headRef,{once:true,margin:'-10%'})
  useEffect(()=>{
    const io=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          ;(e.target as HTMLElement).style.opacity='1';
          (e.target as HTMLElement).style.transform='none'
          io.unobserve(e.target)
        }
      })
    },{threshold:.1})
    document.querySelectorAll('.reveal-tl,.reveal-tr,.reveal-bl,.reveal-br').forEach(el=>{
      const base=el.classList.contains('reveal-tl')||el.classList.contains('reveal-bl')?'translateX(-60px)':'translateX(60px)';
      (el as HTMLElement).style.transform=base;
      (el as HTMLElement).style.transition='opacity .9s ease, transform .9s ease'
      io.observe(el)
    })
    return()=>io.disconnect()
  },[])

  const TEXT="With a B.Sc. in Computer Science from the University of Alberta, I build full-stack applications and machine learning solutions people actually enjoy using. I find equal joy in a clean pull request and a well-framed photograph. Let's build something incredible together!"

  return(
    <section id="about" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{padding:'clamp(80px,12vw,160px) 6vw'}}>
      <DecoBlobTL/><DecoBlobTR/><DecoBlobBL/><DecoBlobBR/>

      <motion.h2 ref={headRef}
        initial={{opacity:0,y:40}} animate={inView?{opacity:1,y:0}:{}}
        transition={{duration:.8,ease:[.25,.1,.25,1]}}
        className="font-fraunces font-black uppercase tracking-[-0.02em] leading-[.94] text-center grad-head mb-12"
        style={{fontSize:'clamp(3rem,12vw,11rem)'}}>
        About me
      </motion.h2>

      <div className="flex flex-col items-center gap-12">
        <AnimatedText text={TEXT}/>
        <a href="#contact"
          className="inline-flex items-center gap-2 font-mono font-semibold text-[.8rem] uppercase tracking-[.1em] text-white px-7 py-3.5 rounded-full no-underline hover:-translate-y-1 transition-all duration-300"
          style={{background:'linear-gradient(125deg,#E85D3D,#FF9B6B,#FFB347)',boxShadow:'0 8px 28px rgba(232,93,61,.35)'}}>
          Get in touch ↗
        </a>
      </div>
    </section>
  )
}
