import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

// ── Cursor ─────────────────────────────────────────────
function Cursor() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const cv = ref.current!; const ctx = cv.getContext('2d')!
    let W=0,H=0,mx=300,my=300,tick=0; const pts:any[]=[]
    const COLS=['rgba(234,179,8,','rgba(250,204,21,','rgba(200,200,200,']
    const resize=()=>{W=cv.width=window.innerWidth;H=cv.height=window.innerHeight}
    resize(); window.addEventListener('resize',resize)
    const onMove=(e:MouseEvent)=>{mx=e.clientX;my=e.clientY}
    document.addEventListener('mousemove',onMove)
    let raf=0
    const anim=()=>{
      raf=requestAnimationFrame(anim); ctx.clearRect(0,0,W,H)
      if(++tick%2===0) pts.push({x:mx,y:my,vx:(Math.random()-.5)*2,vy:(Math.random()-.5)*2-.5,r:3+Math.random()*4,life:1,decay:.028+Math.random()*.016,c:COLS[Math.floor(Math.random()*COLS.length)]})
      for(let i=pts.length-1;i>=0;i--){const p=pts[i];p.x+=p.vx;p.y+=p.vy;p.vy+=.04;p.life-=p.decay;if(p.life<=0){pts.splice(i,1);continue}ctx.beginPath();ctx.arc(p.x,p.y,p.r*p.life,0,Math.PI*2);ctx.fillStyle=p.c+(p.life*.8)+')';ctx.fill()}
      ctx.beginPath();ctx.arc(mx,my,5,0,Math.PI*2);ctx.fillStyle='#EAB308';ctx.fill()
    }
    anim()
    return ()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize);document.removeEventListener('mousemove',onMove)}
  },[])
  return <canvas ref={ref} className="fixed inset-0 z-[9999] pointer-events-none"/>
}

// ── Navbar ─────────────────────────────────────────────
function Navbar() {
  const [sc,setSc]=useState(false)
  useEffect(()=>{const f=()=>setSc(window.scrollY>50);window.addEventListener('scroll',f,{passive:true});return()=>window.removeEventListener('scroll',f)},[])
  return (
    <motion.nav initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{duration:.6}}
      className={`fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-8 md:px-16 transition-all duration-300 ${sc?'py-3 bg-white/90 backdrop-blur-sm shadow-sm':'py-6'}`}>
      <span className="font-black text-2xl tracking-tight">Rune<span className="text-yellow-400">.</span></span>
      <div className="hidden md:flex gap-10 text-sm font-semibold text-gray-600">
        {['About','Experience','Projects','Gallery','Contact'].map(l=>(
          <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-yellow-500 transition-colors">{l}</a>
        ))}
      </div>
    </motion.nav>
  )
}

// ── Hero ───────────────────────────────────────────────
function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-gray-50 relative overflow-hidden flex items-center">
      <div className="absolute top-10 right-10 w-96 h-96 bg-yellow-200/40 rounded-full blur-3xl"/>
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-yellow-100/60 rounded-full blur-3xl"/>
      <div className="absolute inset-0 opacity-[0.025]" style={{backgroundImage:'radial-gradient(circle,#000 1px,transparent 1px)',backgroundSize:'28px 28px'}}/>
      <div className="relative z-10 w-full px-8 md:px-16 pt-28 pb-16 grid md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
        <div>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.1}}
            className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 text-sm font-semibold px-5 py-2.5 rounded-full mb-8">
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"/>
            CS grad · Edmonton AB · open to work
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:.2}}
            className="text-6xl md:text-8xl font-black leading-[.9] tracking-tight mb-8">
            Hi, I'm<br/><span className="text-yellow-400">Rune</span><br/>Lin.
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.35}}
            className="text-gray-500 text-xl leading-relaxed max-w-md mb-10">
            Full-stack developer who finds equal joy in a clean pull request, a well-framed photo, and a golden retriever doing literally anything.
          </motion.p>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.45}} className="flex gap-4 flex-wrap">
            <a href="#contact" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg px-10 py-4 rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-yellow-200">Get in touch →</a>
            <a href="#experience" className="border-2 border-gray-200 hover:border-yellow-400 text-gray-700 font-bold text-lg px-10 py-4 rounded-2xl transition-all hover:-translate-y-0.5">View experience</a>
          </motion.div>
        </div>
        <motion.div initial={{opacity:0,scale:.9,rotate:-3}} animate={{opacity:1,scale:1,rotate:-2}} transition={{delay:.3,type:'spring',stiffness:100}}
          className="relative flex justify-center md:justify-end">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-300 rounded-[2.5rem] translate-x-4 translate-y-4"/>
            <div className="relative bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white" style={{width:'clamp(300px,40vw,460px)'}}>
              <img src="/images/FullSizeRender.jpg" alt="Rune Lin" className="w-full object-cover" style={{height:'clamp(380px,52vw,580px)'}}/>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Marquee — no duplicates ────────────────────────────
const ROW1=['/images/IMG_8972.jpg','/images/c7cbe8ad-d62d-431c-9590-dc2fc633a16e.jpg','/images/IMG_2042.jpg','/images/IMG_5909.jpg','/images/IMG_7849.jpg','/images/IMG_6259.jpg','/images/IMG_1735.jpg','/images/IMG_4100.jpg']
const ROW2=['/images/IMG_1544.jpg','/images/IMG_8186.jpg','/images/IMG_6824.jpg','/images/IMG_7971.jpg','/images/IMG_2524.jpg','/images/beauty_1766618940180.jpg','/images/IMG_6263.jpg','/images/IMG_4528.jpg']

function Marquee() {
  const r1=useRef<HTMLDivElement>(null),r2=useRef<HTMLDivElement>(null),sec=useRef<HTMLElement>(null)
  useEffect(()=>{
    const update=()=>{
      if(!sec.current)return
      const offset=(window.scrollY-sec.current.offsetTop+window.innerHeight)*.28
      if(r1.current)r1.current.style.transform=`translateX(${offset-160}px)`
      if(r2.current)r2.current.style.transform=`translateX(${-(offset-160)}px)`
    }
    window.addEventListener('scroll',update,{passive:true});update()
    return()=>window.removeEventListener('scroll',update)
  },[])
  const loop1=[...ROW1,...ROW1,...ROW1], loop2=[...ROW2,...ROW2,...ROW2]
  return (
    <section ref={sec} className="py-16 overflow-hidden bg-white">
      <div ref={r1} className="flex gap-4 mb-4 will-change-transform">
        {loop1.map((s,i)=><div key={i} className="flex-shrink-0 rounded-2xl overflow-hidden shadow-sm" style={{width:'clamp(220px,26vw,380px)',height:'clamp(140px,18vw,240px)'}}><img src={s} alt="" className="w-full h-full object-cover" loading="lazy"/></div>)}
      </div>
      <div ref={r2} className="flex gap-4 will-change-transform">
        {loop2.map((s,i)=><div key={i} className="flex-shrink-0 rounded-2xl overflow-hidden shadow-sm" style={{width:'clamp(220px,26vw,380px)',height:'clamp(140px,18vw,240px)'}}><img src={s} alt="" className="w-full h-full object-cover" loading="lazy"/></div>)}
      </div>
    </section>
  )
}

// ── About — bigger avatar centered ────────────────────
function About() {
  const ref=useRef(null);const inView=useInView(ref,{once:true,margin:'-10%'})
  const tags=['☕ chronically curious','🐕 dog-adjacent','📸 bad camera, good eye','🎨 paints sunsets','🏸 loses gracefully','🧩 puzzle hoarder']
  return (
    <section id="about" className="py-32 px-8 md:px-16 bg-[#faf9f6]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div ref={ref} initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.7}}>
          <span className="text-yellow-500 font-mono text-sm tracking-widest uppercase">01 · About me</span>
          <div className="mt-8 mb-10 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-yellow-300 translate-x-3 translate-y-3"/>
              <div className="relative rounded-full overflow-hidden border-4 border-white shadow-2xl" style={{width:'180px',height:'180px'}}>
                <img src="/images/IMG_8186.jpg" alt="Rune" className="w-full h-full object-cover" style={{objectPosition:'center 15%'}}/>
              </div>
            </div>
          </div>
          <h2 className="text-5xl md:text-7xl font-black leading-[.95] tracking-tight mb-10">
            Equal parts <span className="text-yellow-400">code</span><br/>& good light.
          </h2>
          <p className="text-gray-500 text-xl leading-relaxed mb-5 max-w-2xl mx-auto">
            <strong className="text-gray-800">Run Lin</strong> — most call me <strong className="text-gray-800">Rune</strong>. CS grad from the University of Alberta. I find the same satisfaction in a clean pull request, a well-framed photograph, and a half-finished watercolor painting on my desk.
          </p>
          <p className="text-gray-500 text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
            Currently sharing my apartment with the world's most photogenic golden retriever. Not a flex — just true.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {tags.map(t=><span key={t} className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-base font-semibold px-5 py-2.5 rounded-full">{t}</span>)}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Experience — Brittany style: mouse glow + dim others
const EXP=[
  {role:'Web Developer Intern',org:'Solution MS Technology',period:'Jun – Oct 2025',
   desc:'Full-stack logistics features with React, TypeScript, Node.js & MySQL. GraphQL + REST APIs. Refactored SQL — 30% faster pages. Jest + CI/CD cut post-release bugs by 20%.',
   tags:['React','TypeScript','Node.js','GraphQL','MySQL','Jest']},
  {role:'Full-Stack Developer (Volunteer)',org:'Grain Insight — Clifton Engineering',period:'Nov 2025 – Jan 2026',
   desc:'Deep learning platform for water engineers replacing manual grain counting. FastAPI + PostgreSQL backend, JWT auth, secure file upload/download.',
   tags:['FastAPI','PostgreSQL','JWT','Python']},
  {role:'Kaggle · Women in AI',org:'4th / 554 teams · 99.6% score',period:'Mar 2025',
   desc:'AI-generated image detection using Python-based computer vision and ensemble methods. Recognized at the Women in AI Innovation Awards.',
   tags:['Python','Computer Vision','Ensemble']},
  {role:'Kaggle Playground S5E2',org:'11th / 3,393 teams · top 0.3%',period:'2025',
   desc:'CatBoost regression pipeline with K-fold CV, GPU-accelerated target encoding, and ensemble blending.',
   tags:['CatBoost','K-fold CV','GPU','Python']},
  {role:'B.Sc. Computer Science',org:'University of Alberta · Minor in Mathematics',period:'Sep 2021 – May 2025',
   desc:'Data Structures, Software Engineering, Databases, Artificial Intelligence, Machine Learning, Numerical Methods.',
   tags:['Algorithms','AI','ML','Databases']},
]

function Experience() {
  const [hov,setHov]=useState<number|null>(null)
  const [mp,setMp]=useState({x:0,y:0})
  const secRef=useRef<HTMLElement>(null)
  const headRef=useRef(null);const headVis=useInView(headRef,{once:true})

  return (
    <section id="experience" ref={secRef}
      onMouseMove={e=>{const r=secRef.current!.getBoundingClientRect();setMp({x:e.clientX-r.left,y:e.clientY-r.top})}}
      className="py-32 px-8 md:px-16 bg-gray-950 text-white relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0"
        style={{background:`radial-gradient(600px circle at ${mp.x}px ${mp.y}px,rgba(234,179,8,0.07),transparent 40%)`}}/>
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div ref={headRef} initial={{opacity:0,y:20}} animate={headVis?{opacity:1,y:0}:{}} transition={{duration:.6}}>
          <span className="text-yellow-400 font-mono text-sm tracking-widest uppercase">02 · Experience</span>
          <h2 className="text-5xl md:text-7xl font-black mt-4 mb-16 leading-tight">Where I've spent<br/>my <span className="text-yellow-400">time</span>.</h2>
        </motion.div>
        <div className="flex flex-col">
          {EXP.map((e,i)=>{
            const r=useRef(null);const iv=useInView(r,{once:true,margin:'-5%'})
            const isHov=hov===i, isDim=hov!==null&&!isHov
            return (
              <motion.div ref={r} key={i}
                initial={{opacity:0,y:18}} animate={iv?{opacity:1,y:0}:{}} transition={{duration:.5,delay:i*.07}}
                onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
                className="group relative rounded-2xl p-6 md:p-8 cursor-default transition-all duration-200"
                style={{opacity:isDim?.3:1}}>
                <div className={`absolute inset-0 rounded-2xl border transition-all duration-200 ${isHov?'border-yellow-400/30 bg-white/[0.04]':'border-transparent'}`}/>
                <div className="relative grid grid-cols-[160px_1fr] gap-6">
                  <div className="text-sm font-mono mt-1 transition-colors duration-200" style={{color:isHov?'rgba(234,179,8,.8)':'#6B7280'}}>{e.period}</div>
                  <div>
                    <div className={`font-bold text-lg md:text-xl mb-0.5 transition-colors duration-200 ${isHov?'text-yellow-400':'text-white'}`}>{e.role}</div>
                    <div className="text-gray-500 text-sm font-mono mb-3">{e.org}</div>
                    <p className="text-gray-400 text-base leading-relaxed mb-4 max-w-xl">{e.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {e.tags.map(t=>(
                        <span key={t} className="text-xs font-mono px-3 py-1.5 rounded-full transition-all duration-200"
                          style={{background:isHov?'rgba(234,179,8,0.15)':'rgba(255,255,255,0.06)',color:isHov?'#EAB308':'#9CA3AF',border:isHov?'1px solid rgba(234,179,8,0.35)':'1px solid rgba(255,255,255,0.1)'}}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
        <div className="mt-10 pt-10 border-t border-white/10 flex flex-wrap gap-2">
          {['Python','TypeScript','React','Node.js','ASP.NET Core','FastAPI','PostgreSQL','MySQL','Firebase','AWS','Kotlin','C#'].map(s=>(
            <span key={s} className="border border-white/15 text-gray-400 text-sm font-mono px-4 py-2 rounded-full">{s}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Projects — watercolor warm bg, tight sticky, mouse glow
const PROJS=[
  {n:'01',cat:'Full-Stack · ASP.NET Core',name:'Work Order Management System',href:'https://github.com/runrunrunlin/WorkOrderSystem',
   desc:'Maintenance management web app with a four-stage work order lifecycle. Separate Admin and Technician access levels, bcrypt auth, automatic equipment status sync.',
   stack:['ASP.NET Core 8','Entity Framework','SQLite','JWT'],accent:'#D97706'},
  {n:'02',cat:'Android · Kotlin · Firebase',name:'PEVIS — Pet Health Management',href:'https://github.com/runrunrunlin/PEVIS',
   desc:'Android app for pet profiles and health records — vaccinations, check-ups, medications — with real-time reminders synced across two Firebase services. Built for my own dog.',
   stack:['Kotlin','Android Studio','Firebase'],accent:'#EA580C'},
  {n:'03',cat:'Python · Academic · CMPUT 291',name:'Social Media Platform',href:'',
   desc:'Full-featured GUI desktop app — login, follow/unfollow, post, repost, edit, feed browsing. Most classmates shipped terminal-only solutions.',
   stack:['Python','Tkinter','SQLite'],accent:'#0284C7'},
]

function ProjectCard({p,i}:{p:typeof PROJS[0],i:number}) {
  const slot=useRef(null)
  const {scrollYProgress}=useScroll({target:slot,offset:['start end','end start']})
  const scale=useTransform(scrollYProgress,[.15,.5,.85],[.97,1,1-(2-i)*.015])
  const r=useRef(null);const iv=useInView(r,{once:true})
  const [mp,setMp]=useState({x:200,y:100})
  const cardRef=useRef<HTMLDivElement>(null)

  return (
    <div ref={slot} style={{height:'52vh'}}>
      <motion.div ref={(el)=>{(r as any).current=el;(cardRef as any).current=el}}
        style={{scale,top:`${60+i*14}px`,background:'linear-gradient(135deg,#fffdf4 0%,#fff9e6 50%,#fef3c7 100%)'}}
        initial={{opacity:0}} animate={iv?{opacity:1}:{}} transition={{duration:.4}}
        className="sticky will-change-transform rounded-3xl overflow-hidden border border-yellow-200/60"
        onMouseMove={e=>{const rc=cardRef.current!.getBoundingClientRect();setMp({x:e.clientX-rc.left,y:e.clientY-rc.top})}}>
        <div className="pointer-events-none absolute inset-0 z-0"
          style={{background:`radial-gradient(300px circle at ${mp.x}px ${mp.y}px,rgba(234,179,8,0.13),transparent 65%)`}}/>
        <div className="relative z-10 p-7 md:p-9 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
              <div className="font-black leading-none opacity-[0.08]" style={{fontSize:'clamp(2.5rem,6vw,5rem)',color:p.accent}}>{p.n}</div>
              <div className="flex-1 px-5 pt-0.5">
                <div className="text-xs font-mono tracking-widest uppercase mb-1.5" style={{color:p.accent}}>{p.cat}</div>
                <div className="font-black text-xl md:text-2xl leading-snug text-gray-900">{p.name}</div>
              </div>
              {p.href
                ?<a href={p.href} target="_blank" rel="noreferrer" className="font-mono text-sm px-5 py-2 rounded-full border-2 transition-all hover:-translate-y-0.5 mt-0.5" style={{borderColor:p.accent,color:p.accent}}>GitHub ↗</a>
                :<span className="font-mono text-sm px-5 py-2 rounded-full border-2 border-gray-300 text-gray-400 mt-0.5">Academic</span>
              }
            </div>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mb-5">{p.desc}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {p.stack.map(s=><span key={s} className="text-sm font-mono px-4 py-1.5 rounded-full border-2 font-semibold" style={{borderColor:p.accent+'50',color:p.accent,background:p.accent+'12'}}>{s}</span>)}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function Projects() {
  const ref=useRef(null);const inView=useInView(ref,{once:true})
  return (
    <section id="projects" className="py-20 px-8 md:px-16 relative overflow-hidden"
      style={{background:'linear-gradient(135deg,#fffdf4 0%,#fff9e6 60%,#fef3c7 100%)'}}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl pointer-events-none"/>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-100/40 rounded-full blur-3xl pointer-events-none"/>
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div ref={ref} initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.6}}>
          <span className="text-yellow-600 font-mono text-sm tracking-widest uppercase">03 · Projects</span>
          <h2 className="text-5xl md:text-7xl font-black mt-4 mb-10 leading-tight text-gray-900">
            "Wait, I could<br/><span className="text-yellow-400">build</span> this."
          </h2>
        </motion.div>
        <div className="flex flex-col gap-0">
          {PROJS.map((p,i)=><ProjectCard key={i} p={p} i={i}/>)}
        </div>
      </div>
    </section>
  )
}

// ── Gallery — 3D cards, 5-col wide, watercolor bg ──────
const PHOTO_WORKS=[
  {src:'/images/IMG_2776.jpg',cap:'Stilt house, Thailand',tall:true},
  {src:'/images/IMG_0492.jpg',cap:'Sunset through trees',tall:false},
  {src:'/images/IMG_9930.jpg',cap:'Pavilion on the lake',tall:false},
  {src:'/images/IMG_9612.jpg',cap:'Spring canopy',tall:true},
  {src:'/images/IMG_0338.jpg',cap:'Autumn, looking up',tall:false},
  {src:'/images/IMG_7575.jpg',cap:'Lake Louise',tall:false},
  {src:'/images/IMG_4922.jpg',cap:'Bridge & green hills',tall:true},
  {src:'/images/IMG_0551.jpg',cap:'Eaves & reflection',tall:false},
  {src:'/images/IMG_1218.jpg',cap:'Morning light',tall:false},
  {src:'/images/painting-sunset.jpg',cap:'Evening Catch — original painting 🎨',tall:true},
  {src:'/images/IMG_9739.jpg',cap:'Sky through a doorway',tall:false},
  {src:'/images/IMG_7978.jpg',cap:'Brake lights & orange sky',tall:false},
  {src:'/images/IMG_1889.jpg',cap:'Golden hour road',tall:false},
  {src:'/images/IMG_7988.jpg',cap:'Window sunset',tall:false},
  {src:'/images/IMG_1724.jpg',cap:'Quiet afternoon',tall:false},
]

function PhotoCard({p,i}:{p:typeof PHOTO_WORKS[0],i:number}) {
  const [rot,setRot]=useState({x:0,y:0})
  const [hov,setHov]=useState(false)
  const cardRef=useRef<HTMLDivElement>(null)
  const r=useRef(null);const iv=useInView(r,{once:true,margin:'-5%'})

  return (
    <motion.div ref={r}
      initial={{opacity:0,y:14}} animate={iv?{opacity:1,y:0}:{}}
      transition={{duration:.5,delay:(i%5)*.05}}
      className={p.tall?'row-span-2':'row-span-1'}
      style={{perspective:'900px',minHeight:p.tall?'320px':'160px'}}>
      <div ref={cardRef}
        onMouseMove={e=>{const rc=cardRef.current!.getBoundingClientRect();setRot({x:((e.clientY-rc.top)/rc.height-.5)*-12,y:((e.clientX-rc.left)/rc.width-.5)*12})}}
        onMouseEnter={()=>setHov(true)} onMouseLeave={()=>{setHov(false);setRot({x:0,y:0})}}
        style={{transform:hov?`rotateX(${rot.x}deg) rotateY(${rot.y}deg) scale(1.03)`:'none',transition:hov?'transform .12s ease-out':'transform .45s ease',transformStyle:'preserve-3d',height:'100%'}}
        className="rounded-2xl overflow-hidden shadow-md cursor-pointer relative h-full">
        <img src={p.src} alt={p.cap} className="w-full h-full object-cover" loading="lazy"/>
        <div className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{opacity:hov?1:0,background:`radial-gradient(circle at ${50+rot.y*2}% ${50-rot.x*2}%,rgba(255,255,255,0.2) 0%,transparent 65%)`}}/>
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3 transition-opacity duration-200 ${hov?'opacity-100':'opacity-0'}`}>
          <p className="text-white font-mono text-xs tracking-wider">{p.cap}</p>
        </div>
      </div>
    </motion.div>
  )
}

function Gallery() {
  const ref=useRef(null);const inView=useInView(ref,{once:true})
  return (
    <section id="gallery" className="py-24 px-6 md:px-10 relative overflow-hidden"
      style={{background:'linear-gradient(160deg,#faf9f6 0%,#f0f9ff 35%,#ecfdf5 70%,#faf9f6 100%)'}}>
      <div className="absolute top-16 left-8 w-72 h-72 bg-blue-100/50 rounded-full blur-3xl pointer-events-none"/>
      <div className="absolute bottom-16 right-8 w-80 h-80 bg-green-100/40 rounded-full blur-3xl pointer-events-none"/>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-100/30 rounded-full blur-3xl pointer-events-none"/>
      <div className="max-w-screen-xl mx-auto relative z-10">
        <motion.div ref={ref} initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.6}} className="mb-10">
          <span className="text-yellow-500 font-mono text-sm tracking-widest uppercase">04 · Gallery</span>
          <h2 className="text-5xl md:text-7xl font-black mt-4 mb-5 leading-tight">
            I also love <span className="text-yellow-400">photography</span><br/>& painting.
          </h2>
          <p className="text-gray-500 text-xl leading-relaxed max-w-2xl">
            Chasing good light with my phone, finishing watercolors on weekends. No fancy gear — just noticing things. Hover for a little magic ✨
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 auto-rows-[160px]">
          {PHOTO_WORKS.map((p,i)=><PhotoCard key={i} p={p} i={i}/>)}
        </div>
      </div>
    </section>
  )
}

// ── Contact ─────────────────────────────────────────────
function Contact() {
  const ref=useRef(null);const inView=useInView(ref,{once:true,margin:'-10%'})
  return (
    <section id="contact" className="py-40 px-8 md:px-16 bg-gray-950 relative overflow-hidden text-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-yellow-400/5 rounded-full blur-3xl"/>
      <div className="relative max-w-4xl mx-auto">
        <motion.div ref={ref} initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.7}}>
          <span className="text-yellow-400 font-mono text-sm tracking-widest uppercase">05 · Contact</span>
          <h2 className="text-6xl md:text-8xl font-black mt-4 mb-6 text-white leading-[.95] tracking-tight">
            Let's build<br/>something <span className="text-yellow-400">good</span>.
          </h2>
          <p className="text-gray-400 text-xl mb-14">Open to full-stack, ML, or anything in between. Let's chat.</p>
          <div className="flex gap-5 flex-wrap justify-center mb-20">
            <a href="mailto:runlin982@gmail.com" className="bg-yellow-400 hover:bg-yellow-500 text-black font-black text-xl px-10 py-5 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-400/30">runlin982@gmail.com</a>
            <a href="https://linkedin.com/in/run-lin" target="_blank" rel="noreferrer" className="border-2 border-white/20 text-white font-bold text-xl px-10 py-5 rounded-2xl hover:bg-white/8 transition-all hover:-translate-y-1">LinkedIn ↗</a>
            <a href="https://github.com/runrunrunlin" target="_blank" rel="noreferrer" className="border-2 border-white/20 text-white font-bold text-xl px-10 py-5 rounded-2xl hover:bg-white/8 transition-all hover:-translate-y-1">GitHub ↗</a>
          </div>
          <p className="text-gray-600 text-sm font-mono">© 2026 Run "Rune" Lin · built with curiosity & one supervising dog</p>
        </motion.div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <Cursor/>
      <Navbar/>
      <main>
        <Hero/><Marquee/><About/><Experience/><Projects/><Gallery/><Contact/>
      </main>
    </>
  )
}
