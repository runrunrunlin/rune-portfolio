import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const PROJECTS=[
  {n:'01',cat:'Full-Stack · .NET',name:'Work Order Management System',
   href:'https://github.com/runrunrunlin/WorkOrderSystem',
   imgs:['/images/IMG_9612.jpg','/images/IMG_0338.jpg','/images/IMG_7575.jpg']},
  {n:'02',cat:'Android · Firebase',name:'PEVIS — Pet Health App',
   href:'https://github.com/runrunrunlin/PEVIS',
   imgs:['/images/IMG_7971.jpg','/images/IMG_1544.jpg','/images/c7cbe8ad-d62d-431c-9590-dc2fc633a16e.jpg']},
  {n:'03',cat:'Python · Academic',name:'Social Media Platform',href:'',
   imgs:['/images/IMG_2776.jpg','/images/IMG_0492.jpg','/images/IMG_9930.jpg']},
]
const TOTAL=PROJECTS.length

function ProjectCard({proj,index}:{proj:typeof PROJECTS[0],index:number}){
  const slotRef=useRef<HTMLDivElement>(null)
  const {scrollYProgress}=useScroll({target:slotRef,offset:['start end','end start']})
  const scale=useTransform(scrollYProgress,[0,.5,1],[.95,1,1-(TOTAL-1-index)*.03])
  return(
    <div ref={slotRef} className="h-[85vh] relative">
      <motion.div style={{scale,top:`${100+index*28}px`}}
        className="sticky rounded-[clamp(24px,4vw,44px)] border-2 border-[rgba(251,246,236,.15)] bg-[#2B2B2E] overflow-hidden will-change-transform"
        transition={{duration:.3}}>
        {/* wc glow */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{background:'radial-gradient(ellipse at 30% 20%,#FF9B6B,transparent 60%),radial-gradient(ellipse at 70% 80%,#7AB8D4,transparent 60%)'}}/>
        <div className="relative p-[clamp(20px,3vw,40px)]">
          {/* top row */}
          <div className="flex items-start justify-between mb-[clamp(14px,2.5vw,28px)] flex-wrap gap-3">
            <div className="font-fraunces font-black leading-none grad-head-cool"
              style={{fontSize:'clamp(2.5rem,8vw,8rem)'}}>
              {proj.n}
            </div>
            <div className="flex-1 px-[clamp(12px,2vw,28px)]">
              <div className="font-mono text-[.7rem] tracking-[.1em] uppercase text-[rgba(251,246,236,.4)] mb-1">{proj.cat}</div>
              <div className="font-fraunces font-medium text-[#FBF6EC] leading-snug"
                style={{fontSize:'clamp(1.2rem,2.8vw,2.4rem)'}}>{proj.name}</div>
            </div>
            {proj.href
              ? <a href={proj.href} target="_blank" rel="noreferrer"
                  className="border-2 border-[rgba(251,246,236,.35)] text-[rgba(251,246,236,.8)] font-mono text-[.7rem] uppercase tracking-[.1em] px-5 py-2.5 rounded-full no-underline hover:bg-[rgba(251,246,236,.1)] transition-colors">
                  GitHub ↗
                </a>
              : <span className="border-2 border-[rgba(251,246,236,.2)] text-[rgba(251,246,236,.4)] font-mono text-[.7rem] uppercase tracking-[.1em] px-5 py-2.5 rounded-full">
                  Academic
                </span>
            }
          </div>
          {/* images */}
          <div className="grid gap-[clamp(8px,1.5vw,18px)]" style={{gridTemplateColumns:'2fr 3fr'}}>
            <div className="flex flex-col gap-[clamp(8px,1.5vw,18px)]">
              <img src={proj.imgs[0]} alt="" className="w-full object-cover" style={{height:'clamp(110px,16vw,210px)',borderRadius:'clamp(14px,2.5vw,32px)'}}/>
              <img src={proj.imgs[1]} alt="" className="w-full object-cover" style={{height:'clamp(130px,19vw,270px)',borderRadius:'clamp(14px,2.5vw,32px)'}}/>
            </div>
            <img src={proj.imgs[2]} alt="" className="w-full object-cover" style={{height:'clamp(255px,36vw,495px)',borderRadius:'clamp(14px,2.5vw,32px)'}}/>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Projects(){
  const headRef=useRef<HTMLDivElement>(null)
  return(
    <section id="projects" className="bg-[#2B2B2E] relative z-10"
      style={{borderRadius:'50px 50px 0 0',marginTop:'-40px',padding:'clamp(60px,8vw,110px) 5vw clamp(60px,8vw,110px)'}}>
      <h2 ref={headRef as any}
        className="font-fraunces font-black uppercase tracking-[-0.02em] leading-[.94] text-center grad-head-cool mb-[clamp(40px,6vw,80px)]"
        style={{fontSize:'clamp(3rem,12vw,11rem)'}}>
        Projects
      </h2>
      <div>{PROJECTS.map((p,i)=><ProjectCard key={i} proj={p} index={i}/>)}</div>
    </section>
  )
}
