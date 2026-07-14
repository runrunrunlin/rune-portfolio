import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
export default function Contact(){
  const ref=useRef<HTMLElement>(null)
  const inView=useInView(ref,{once:true,margin:'-10%'})
  return(
    <section ref={ref} id="contact" className="relative z-[12] bg-[#2B2B2E] overflow-hidden text-center"
      style={{borderRadius:'50px 50px 0 0',marginTop:'-40px',padding:'clamp(100px,14vw,180px) 6vw clamp(60px,8vw,100px)'}}>
      {/* rings */}
      <span className="absolute rounded-full pointer-events-none border border-white/[0.04]"
        style={{width:'500px',height:'500px',bottom:'-220px',left:'50%',transform:'translateX(-50%)'}}/>
      <span className="absolute rounded-full pointer-events-none"
        style={{width:'300px',height:'300px',bottom:'-100px',left:'50%',transform:'translateX(-50%)',border:'1px solid rgba(255,122,89,.07)'}}/>

      <motion.h2 initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.8}}
        className="font-fraunces font-light text-[#FBF6EC] mb-11 relative z-[1]"
        style={{fontSize:'clamp(2.4rem,7vw,6rem)',lineHeight:1.02}}>
        Let's build<br/>something{' '}
        <em className="not-italic font-bold text-[#FF7A59]">good</em>.
      </motion.h2>

      <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.7,delay:.2}}
        className="flex gap-3.5 flex-wrap justify-center mb-20 relative z-[1]">
        <a href="mailto:runlin982@gmail.com"
          className="font-mono text-[.82rem] px-6 py-3.5 rounded-full text-white font-semibold no-underline hover:-translate-y-1 transition-all duration-300"
          style={{background:'linear-gradient(125deg,#E85D3D,#FF9B6B,#FFB347)',boxShadow:'0 8px 28px rgba(232,93,61,.35)'}}>
          runlin982@gmail.com
        </a>
        <a href="https://linkedin.com/in/run-lin" target="_blank" rel="noreferrer"
          className="font-mono text-[.82rem] px-6 py-3.5 rounded-full text-[#FBF6EC] no-underline border border-white/[.18] hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
          LinkedIn ↗
        </a>
        <a href="https://github.com/runrunrunlin" target="_blank" rel="noreferrer"
          className="font-mono text-[.82rem] px-6 py-3.5 rounded-full text-[#FBF6EC] no-underline border border-white/[.18] hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
          GitHub ↗
        </a>
      </motion.div>

      <p className="font-mono text-[.68rem] text-[rgba(251,246,236,.22)] relative z-[1]">
        © 2026 Run "Rune" Lin · built with curiosity &amp; one supervising dog
      </p>
    </section>
  )
}
