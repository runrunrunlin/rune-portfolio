import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ITEMS=[
  {n:'01',role:'Web Developer Intern',org:'Solution MS Technology · Edmonton',period:'Jun–Oct 2025',
   desc:'Full-stack logistics features with React, TypeScript, Node.js & MySQL. GraphQL + REST APIs. Refactored SQL — 30% faster pages, 15% faster queries. Jest + CI/CD cut post-release bugs by 20%.'},
  {n:'02',role:'Full-Stack Developer (Volunteer)',org:'Grain Insight — Clifton Engineering',period:'Nov 2025–Jan 2026',
   desc:'Deep learning platform for water engineers replacing manual grain image counting. FastAPI + PostgreSQL backend, JWT auth, secure file upload/download.'},
  {n:'03',role:'Kaggle — Women in AI Challenge',org:'Competition · Mar 2025',period:'4th / 554 teams',
   desc:'99.6% score on AI-generated image detection using Python-based computer vision & ensemble methods. Recognized at Women in AI Innovation Awards.'},
  {n:'04',role:'Kaggle Playground S5E2',org:'Competition · 2025',period:'11th / 3,393 teams (top 0.3%)',
   desc:'CatBoost regression pipeline with K-fold cross-validation, GPU-accelerated target encoding & ensemble blending to predict structured data.'},
  {n:'05',role:'B.Sc. Computer Science',org:'University of Alberta · Minor in Mathematics',period:'Sep 2021–May 2025',
   desc:'Data Structures & Algorithms, Software Engineering, Database Management, Artificial Intelligence, Machine Learning, Numerical Methods.'},
]

function SvcItem({item,index}:{item:typeof ITEMS[0],index:number}){
  const ref=useRef<HTMLDivElement>(null)
  const inView=useInView(ref,{once:true,margin:'-5%'})
  return(
    <motion.div ref={ref}
      initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}}
      transition={{duration:.7,delay:index*.1,ease:[.25,.1,.25,1]}}
      className="flex items-start gap-[clamp(16px,3vw,48px)] py-[clamp(24px,4vw,44px)] border-t border-[rgba(43,43,46,.1)] last:border-b">
      <div className="font-fraunces font-black leading-none flex-shrink-0 text-[#2B2B2E]/10"
        style={{fontSize:'clamp(2.5rem,8vw,8rem)',minWidth:'clamp(55px,9vw,130px)'}}>
        {item.n}
      </div>
      <div className="pt-[.3em]">
        <div className="font-grotesk font-semibold uppercase tracking-[.03em] mb-1 text-[#2B2B2E]"
          style={{fontSize:'clamp(1rem,2vw,1.8rem)'}}>{item.role}</div>
        <div className="font-mono text-[.78rem] text-[#55534f] mb-3 flex flex-wrap gap-3">
          <span>{item.org}</span>
          <span className="text-[#B5821E]">· {item.period}</span>
        </div>
        <p className="font-grotesk font-light leading-relaxed text-[#55534f] max-w-[540px]"
          style={{fontSize:'clamp(.85rem,1.4vw,1.05rem)'}}>{item.desc}</p>
      </div>
    </motion.div>
  )
}

export default function Experience(){
  const headRef=useRef<HTMLHeadingElement>(null)
  const inView=useInView(headRef,{once:true,margin:'-10%'})
  return(
    <section id="experience" className="bg-white" style={{borderRadius:'50px 50px 0 0',padding:'clamp(60px,10vw,130px) 6vw'}}>
      <motion.h2 ref={headRef}
        initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}}
        transition={{duration:.8}}
        className="font-fraunces font-black uppercase tracking-[-0.02em] leading-[.94] text-center text-[#2B2B2E] mb-[clamp(40px,7vw,90px)]"
        style={{fontSize:'clamp(3rem,12vw,11rem)'}}>
        Experience
      </motion.h2>
      <div className="max-w-[900px] mx-auto">
        {ITEMS.map((item,i)=><SvcItem key={i} item={item} index={i}/>)}
      </div>
    </section>
  )
}
