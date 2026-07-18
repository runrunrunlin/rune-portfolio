import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

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
      if(++tick%2===0) pts.push({x:mx,y:my,vx:(Math.random()-.5)*2,vy:(Math.random()-.5)*2-.5,r:2+Math.random()*3,life:1,decay:.03+Math.random()*.018,c:COLS[Math.floor(Math.random()*COLS.length)]})
      for(let i=pts.length-1;i>=0;i--){const p=pts[i];p.x+=p.vx;p.y+=p.vy;p.vy+=.04;p.life-=p.decay;if(p.life<=0){pts.splice(i,1);continue}ctx.beginPath();ctx.arc(p.x,p.y,p.r*p.life,0,Math.PI*2);ctx.fillStyle=p.c+(p.life*.8)+')';ctx.fill()}
      ctx.beginPath();ctx.arc(mx,my,4,0,Math.PI*2);ctx.fillStyle='#EAB308';ctx.fill()
    }
    anim()
    return ()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize);document.removeEventListener('mousemove',onMove)}
  },[])
  return <canvas ref={ref} className="fixed inset-0 z-[9999] pointer-events-none"/>
}

function Navbar() {
  const [sc,setSc]=useState(false)
  useEffect(()=>{const f=()=>setSc(window.scrollY>50);window.addEventListener('scroll',f,{passive:true});return()=>window.removeEventListener('scroll',f)},[])
  return (
    <motion.nav initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{duration:.6}}
      className={`fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-6 md:px-12 transition-all duration-300 ${sc?'py-2.5 bg-white/90 backdrop-blur-sm shadow-sm':'py-5'}`}>
      <span className="font-black text-xl tracking-tight">Rune<span className="text-yellow-400">.</span></span>
      <div className="hidden md:flex gap-8 text-xs font-semibold text-gray-600 uppercase tracking-wider">
        {['About','Experience','Projects','Gallery','Contact'].map(l=>(
          <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-yellow-500 transition-colors">{l}</a>
        ))}
      </div>
    </motion.nav>
  )
}

function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-gray-50 relative overflow-hidden flex items-center">
      <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-200/40 rounded-full blur-3xl"/>
      <div className="absolute bottom-10 left-0 w-64 h-64 bg-yellow-100/60 rounded-full blur-3xl"/>
      <div className="absolute inset-0 opacity-[0.025]" style={{backgroundImage:'radial-gradient(circle,#000 1px,transparent 1px)',backgroundSize:'24px 24px'}}/>
      <div className="relative z-10 w-full px-6 md:px-12 pt-24 pb-12 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14 max-w-4xl mx-auto text-center md:text-left">
        <div className="max-w-sm shrink-0">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.1}}
            className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"/>
            CS grad · Edmonton AB · open to work
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:.2}}
            className="text-4xl md:text-5xl font-black leading-[.95] tracking-tight mb-5">
            Hi, I'm<br/><span className="text-yellow-400">Rune</span><br/>Lin.
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.35}}
            className="text-gray-500 text-sm leading-relaxed mb-7 mx-auto md:mx-0">
            Full-stack developer who finds equal joy in a clean pull request, a well-framed photo, and a golden retriever doing literally anything.
          </motion.p>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.45}} className="flex gap-3 flex-wrap justify-center md:justify-start">
            <a href="#contact" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-sm px-7 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-200">Get in touch →</a>
            <a href="#experience" className="border-2 border-gray-200 hover:border-yellow-400 text-gray-700 font-bold text-sm px-7 py-3 rounded-xl transition-all hover:-translate-y-0.5">View experience</a>
          </motion.div>
        </div>
        <motion.div initial={{opacity:0,scale:.9,rotate:-3}} animate={{opacity:1,scale:1,rotate:-2}} transition={{delay:.3,type:'spring',stiffness:100}}
          className="relative flex justify-center shrink-0">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-300 rounded-[2rem] translate-x-3 translate-y-3"/>
            <div className="relative bg-white rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white" style={{width:'clamp(180px,22vw,280px)'}}>
              <img src="/images/FullSizeRender.jpg" alt="Rune Lin" className="w-full object-cover" style={{height:'clamp(220px,30vw,360px)'}}/>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Marquee ──────────────────────────────────────────────
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
    <section ref={sec} className="py-10 overflow-hidden bg-white">
      <div ref={r1} className="flex gap-3 mb-3 will-change-transform">
        {loop1.map((s,i)=><div key={i} className="flex-shrink-0 rounded-xl overflow-hidden shadow-sm" style={{width:'clamp(130px,14vw,200px)',height:'clamp(85px,9vw,130px)'}}><img src={s} alt="" className="w-full h-full object-cover" loading="lazy"/></div>)}
      </div>
      <div ref={r2} className="flex gap-3 will-change-transform">
        {loop2.map((s,i)=><div key={i} className="flex-shrink-0 rounded-xl overflow-hidden shadow-sm" style={{width:'clamp(130px,14vw,200px)',height:'clamp(85px,9vw,130px)'}}><img src={s} alt="" className="w-full h-full object-cover" loading="lazy"/></div>)}
      </div>
    </section>
  )
}

// ── About ─────────────────────────────────────────────────
function About() {
  const ref=useRef(null);const inView=useInView(ref,{once:true,margin:'-10%'})
  const tags=['☕ chronically curious','🐕 dog-adjacent','📸 bad camera, good eye','🎨 paints sunsets','🏸 loses gracefully','🧩 puzzle hoarder']
  return (
    <section id="about" className="py-16 px-6 md:px-12 bg-[#faf9f6]">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div ref={ref} initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.7}}>
          <span className="text-yellow-500 font-mono text-xs tracking-widest uppercase">01 · About me</span>
          <div className="mt-5 mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-yellow-300 translate-x-2 translate-y-2"/>
              <div className="relative rounded-full overflow-hidden border-3 border-white shadow-xl" style={{width:'88px',height:'88px'}}>
                {/* 👇 改这里换头像图片 */}
                <img src="/images/IMG_8186.jpg" alt="Rune" className="w-full h-full object-cover" style={{objectPosition:'center 15%'}}/>
              </div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-black leading-[.95] tracking-tight mb-5">
            Equal parts <span className="text-yellow-400">code</span><br/>& good light.
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-3 mx-auto">
            <strong className="text-gray-800">Run Lin</strong> — most call me <strong className="text-gray-800">Rune</strong>. CS grad from the University of Alberta. I find the same satisfaction in a clean pull request, a well-framed photograph, and a half-finished watercolor painting on my desk.
          </p>
          <p className="text-gray-500 text-sm leading-relaxed mb-7 mx-auto">
            Currently sharing my apartment with the world's most photogenic golden retriever. Not a flex — just true.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {tags.map(t=><span key={t} className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs font-semibold px-4 py-2 rounded-full">{t}</span>)}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Experience — mouse glow + dim on hover ────────────────
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
      className="py-20 px-6 md:px-12 bg-gray-950 text-white relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0"
        style={{background:`radial-gradient(500px circle at ${mp.x}px ${mp.y}px,rgba(234,179,8,0.07),transparent 40%)`}}/>
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div ref={headRef} initial={{opacity:0,y:20}} animate={headVis?{opacity:1,y:0}:{}} transition={{duration:.6}}>
          <span className="text-yellow-400 font-mono text-xs tracking-widest uppercase">02 · Experience</span>
          <h2 className="text-3xl md:text-4xl font-black mt-3 mb-8 leading-tight">Where I've spent<br/>my <span className="text-yellow-400">time</span>.</h2>
        </motion.div>
        <div className="flex flex-col">
          {EXP.map((e,i)=>{
            const r=useRef(null);const iv=useInView(r,{once:true,margin:'-5%'})
            const isHov=hov===i, isDim=hov!==null&&!isHov
            return (
              <motion.div ref={r} key={i}
                initial={{opacity:0,y:16}} animate={iv?{opacity:1,y:0}:{}} transition={{duration:.5,delay:i*.07}}
                onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
                className="group relative rounded-xl p-5 cursor-default transition-all duration-200"
                style={{opacity:isDim?.3:1}}>
                <div className={`absolute inset-0 rounded-xl border transition-all duration-200 ${isHov?'border-yellow-400/30 bg-white/[0.04]':'border-transparent'}`}/>
                <div className="relative grid grid-cols-[130px_1fr] gap-5">
                  <div className="text-xs font-mono mt-0.5 transition-colors duration-200" style={{color:isHov?'rgba(234,179,8,.8)':'#6B7280'}}>{e.period}</div>
                  <div>
                    <div className={`font-bold text-base mb-0.5 transition-colors duration-200 ${isHov?'text-yellow-400':'text-white'}`}>{e.role}</div>
                    <div className="text-gray-500 text-xs font-mono mb-2">{e.org}</div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-3 max-w-lg">{e.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {e.tags.map(t=>(
                        <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-full transition-all duration-200"
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
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap gap-1.5">
          {['Python','TypeScript','React','Node.js','ASP.NET Core','FastAPI','PostgreSQL','MySQL','Firebase','AWS','Kotlin','C#'].map(s=>(
            <span key={s} className="border border-white/15 text-gray-400 text-xs font-mono px-3 py-1.5 rounded-full">{s}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Projects ───────────────────────────────────────────────
const PROJS=[
  {n:'01',cat:'Full-Stack · ASP.NET Core',name:'Work Order Management System',href:'https://github.com/runrunrunlin/WorkOrderSystem',badge:'',
   desc:'Maintenance management web app with a four-stage work order lifecycle. Separate Admin and Technician access levels, bcrypt auth, automatic equipment status sync.',
   stack:['ASP.NET Core 8','Entity Framework','SQLite','JWT'],accent:'#D97706'},
  {n:'02',cat:'Android · Kotlin · Firebase',name:'PEVIS — Pet Health Management',href:'https://github.com/runrunrunlin/PEVIS',badge:'',
   desc:'Android app for pet profiles and health records — vaccinations, check-ups, medications — with real-time reminders synced across two Firebase services. Built for my own dog.',
   stack:['Kotlin','Android Studio','Firebase'],accent:'#EA580C'},
  {n:'03',cat:'Python · Academic · CMPUT 291',name:'Social Media Platform',href:'',badge:'Academic',
   desc:'Full-featured GUI desktop app — login, follow/unfollow, post, repost, edit, feed browsing. Most classmates shipped terminal-only solutions.',
   stack:['Python','Tkinter','SQLite'],accent:'#0284C7'},
  {n:'04',cat:'Game Dev · Unity · C#',name:'DNF Demo — 2D Fighting Game',href:'https://github.com/runrunrunlin/DNF_Demo',badge:'',
   desc:'2D side-scrolling fighting game demo inspired by Dungeon Fighter Online. Animator-driven combo system with buffered input windows, precise hitbox detection, hit-stop frame freeze on impact, and independently tunable knockback per attack. Enemy AI runs a 5-state chase-and-attack machine.',
   stack:['Unity 6','C#','Animator FSM','Coroutines'],accent:'#7C3AED'},
  {n:'05',cat:'Python · FastAPI · SQLAlchemy',name:'Intelligent Recipe Finder',href:'',badge:'Personal project',
   desc:"Ingredient-based recipe search engine — type what's in your fridge, get matching recipes ranked by relevance. FastAPI REST API over a many-to-many recipe/ingredient schema with fuzzy matching across thousands of recipes, each paired with its own photo.",
   stack:['FastAPI','SQLAlchemy','SQLite','Python'],accent:'#059669'},
]

function ProjectCard({p,i}:{p:typeof PROJS[0],i:number}) {
  const r=useRef(null);const iv=useInView(r,{once:true,margin:'-15% 0px -15% 0px'})
  const [mp,setMp]=useState({x:200,y:100})
  const cardRef=useRef<HTMLDivElement>(null)
  return (
    <motion.div ref={(el)=>{(r as any).current=el;(cardRef as any).current=el}}
      style={{background:'linear-gradient(135deg,#fffdf4 0%,#fff9e6 50%,#fef3c7 100%)'}}
      initial={{opacity:0,y:70,rotate:i%2===0?-1.2:1.2}}
      animate={iv?{opacity:1,y:0,rotate:0}:{}}
      transition={{duration:.7,delay:i*.08,ease:[.16,1,.3,1]}}
      className="relative rounded-2xl overflow-hidden border border-yellow-200/60"
      onMouseMove={e=>{const rc=cardRef.current!.getBoundingClientRect();setMp({x:e.clientX-rc.left,y:e.clientY-rc.top})}}>
      <div className="pointer-events-none absolute inset-0 z-0"
        style={{background:`radial-gradient(250px circle at ${mp.x}px ${mp.y}px,rgba(234,179,8,0.13),transparent 65%)`}}/>
      <div className="relative z-10 p-6 md:p-8">
        <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
          <div className="font-black leading-none opacity-[0.08]" style={{fontSize:'clamp(2rem,5vw,4rem)',color:p.accent}}>{p.n}</div>
          <div className="flex-1 px-4 pt-0.5">
            <div className="text-xs font-mono tracking-widest uppercase mb-1" style={{color:p.accent}}>{p.cat}</div>
            <div className="font-black text-lg md:text-xl leading-snug text-gray-900">{p.name}</div>
          </div>
          {p.href
            ?<a href={p.href} target="_blank" rel="noreferrer" className="font-mono text-xs px-4 py-2 rounded-full border-2 transition-all hover:-translate-y-0.5 mt-0.5" style={{borderColor:p.accent,color:p.accent}}>GitHub ↗</a>
            :<span className="font-mono text-xs px-4 py-2 rounded-full border-2 border-gray-300 text-gray-400 mt-0.5">{p.badge||'Academic'}</span>
          }
        </div>
        <p className="text-gray-600 text-sm leading-relaxed max-w-xl mb-4">{p.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {p.stack.map(s=><span key={s} className="text-xs font-mono px-3 py-1.5 rounded-full border-2 font-semibold" style={{borderColor:p.accent+'50',color:p.accent,background:p.accent+'12'}}>{s}</span>)}
        </div>
      </div>
    </motion.div>
  )
}

function Projects() {
  const ref=useRef(null);const inView=useInView(ref,{once:true})
  return (
    <section id="projects" className="py-14 px-6 md:px-12 relative overflow-hidden" style={{background:'#faf9f6'}}>
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-200/25 rounded-full blur-3xl pointer-events-none"/>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl pointer-events-none"/>
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div ref={ref} initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.6}}>
          <span className="text-yellow-600 font-mono text-xs tracking-widest uppercase">03 · Projects</span>
          <h2 className="text-3xl md:text-4xl font-black mt-3 mb-8 leading-tight text-gray-900">
            "Wait, I could<br/><span className="text-yellow-400">build</span> this."
          </h2>
        </motion.div>
        <div className="flex flex-col gap-6">
          {PROJS.map((p,i)=><ProjectCard key={i} p={p} i={i}/>)}
        </div>
      </div>
    </section>
  )
}

// ── Gallery — masonry grid, object-cover, wider ───────────
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

const TAPE_ON=[1,4,7,11] // indices that get a little washi-tape accent for scrapbook feel

function PhotoCard({p,i}:{p:typeof PHOTO_WORKS[0],i:number}) {
  const [rot,setRot]=useState({x:0,y:0})
  const [hov,setHov]=useState(false)
  const cardRef=useRef<HTMLDivElement>(null)
  const r=useRef(null);const iv=useInView(r,{once:true,margin:'-8%'})
  const tiltBase=(i%2===0?-1.6:1.6)
  const hasTape=TAPE_ON.includes(i%12)
  return (
    <motion.div ref={r}
      initial={{opacity:0,y:36,scale:.92,rotate:tiltBase*2}}
      animate={iv?{opacity:1,y:0,scale:1,rotate:tiltBase}:{}}
      transition={{duration:.6,delay:(i%6)*.08,ease:[.16,1,.3,1]}}
      whileHover={{scale:1.035,rotate:0,zIndex:20}}
      className="break-inside-avoid mb-3 relative"
      style={{perspective:'900px'}}>
      {hasTape && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-yellow-200/70 border border-yellow-300/60 shadow-sm z-20 pointer-events-none"
          style={{transform:'translateX(-50%) rotate(-3deg)'}}/>
      )}
      <div ref={cardRef}
        onMouseMove={e=>{const rc=cardRef.current!.getBoundingClientRect();setRot({x:((e.clientY-rc.top)/rc.height-.5)*-8,y:((e.clientX-rc.left)/rc.width-.5)*8})}}
        onMouseEnter={()=>setHov(true)} onMouseLeave={()=>{setHov(false);setRot({x:0,y:0})}}
        style={{transform:hov?`rotateX(${rot.x}deg) rotateY(${rot.y}deg)`:'none',transition:hov?'transform .12s ease-out':'transform .45s ease',transformStyle:'preserve-3d'}}
        className="rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 cursor-pointer relative bg-white p-1.5">
        <div className="relative overflow-hidden rounded-md">
          <img src={p.src} alt={p.cap} className="w-full h-auto block transition-transform duration-500" style={{transform:hov?'scale(1.08)':'scale(1)'}} loading="lazy"/>
          <div className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{opacity:hov?1:0,background:`radial-gradient(circle at ${50+rot.y*2}% ${50-rot.x*2}%,rgba(255,255,255,0.22) 0%,transparent 65%)`}}/>
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3 transition-opacity duration-200 ${hov?'opacity-100':'opacity-0'}`}>
            <p className="text-white font-mono text-xs">{p.cap}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function Gallery() {
  const ref=useRef(null);const inView=useInView(ref,{once:true})
  return (
    <section id="gallery" className="py-16 px-6 md:px-10 relative overflow-hidden" style={{background:'#faf9f6'}}>
      <div className="absolute top-12 left-6 w-56 h-56 bg-blue-100/40 rounded-full blur-3xl pointer-events-none"/>
      <div className="absolute bottom-12 right-6 w-64 h-64 bg-green-100/35 rounded-full blur-3xl pointer-events-none"/>
      {/* scattered decorative dots, echoes the hero's accent dots */}
      <motion.span initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:.6,duration:.6}} className="hidden md:block absolute top-24 left-[38%] w-2 h-2 rounded-full bg-yellow-400 pointer-events-none"/>
      <motion.span initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:.8,duration:.6}} className="hidden md:block absolute top-40 left-[42%] w-1 h-1 rounded-full bg-yellow-400/70 pointer-events-none"/>
      <motion.span initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:1,duration:.6}} className="hidden md:block absolute bottom-24 right-[8%] w-1.5 h-1.5 rounded-full bg-orange-400/70 pointer-events-none"/>
      <div className="max-w-screen-xl mx-auto relative z-10">
        <motion.div ref={ref} initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.6}} className="mb-8">
          <span className="text-yellow-500 font-mono text-xs tracking-widest uppercase">04 · Gallery</span>
          <h2 className="text-3xl md:text-4xl font-black mt-3 mb-3 leading-tight">
            I also love <span className="text-yellow-400">photography</span><br/>& painting.
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
            Chasing good light with my phone, finishing watercolors on weekends. No fancy gear — just noticing things. Hover for a little magic ✨
          </p>
        </motion.div>
        {/* true masonry via CSS columns — natural aspect ratios, no cropping */}
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-3">
          {PHOTO_WORKS.map((p,i)=><PhotoCard key={i} p={p} i={i}/>)}
        </div>
      </div>
    </section>
  )
}

// ── Contact — mouse glow + button backlight ───────────────
function Contact() {
  const ref=useRef(null);const inView=useInView(ref,{once:true,margin:'-10%'})
  const [mp,setMp]=useState({x:0,y:0})
  const secRef=useRef<HTMLElement>(null)
  return (
    <section id="contact" ref={secRef}
      onMouseMove={e=>{const r=secRef.current!.getBoundingClientRect();setMp({x:e.clientX-r.left,y:e.clientY-r.top})}}
      className="py-24 px-6 md:px-12 bg-gray-950 relative overflow-hidden text-center">
      {/* mouse glow — same as experience */}
      <div className="pointer-events-none absolute inset-0 z-0"
        style={{background:`radial-gradient(500px circle at ${mp.x}px ${mp.y}px,rgba(234,179,8,0.07),transparent 40%)`}}/>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-yellow-400/5 rounded-full blur-3xl pointer-events-none"/>
      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div ref={ref} initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.7}}>
          <span className="text-yellow-400 font-mono text-xs tracking-widest uppercase">05 · Contact</span>
          <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4 text-white leading-[.95] tracking-tight">
            Let's build<br/>something <span className="text-yellow-400">good</span>.
          </h2>
          <p className="text-gray-400 text-sm mb-8">Open to full-stack, ML, or anything in between. Let's chat.</p>
          <div className="flex gap-3 flex-wrap justify-center mb-10">
            {/* primary button — yellow backlight on hover */}
            <a href="mailto:runlin982@gmail.com"
              className="group relative bg-yellow-400 text-black font-black text-sm px-7 py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
              style={{}}>
              <span className="relative z-10">runlin982@gmail.com</span>
              <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{boxShadow:'0 0 24px 6px rgba(234,179,8,0.55)',background:'rgba(250,204,21,0.15)'}}/>
            </a>
            {/* LinkedIn */}
            <a href="https://linkedin.com/in/run-lin" target="_blank" rel="noreferrer"
              className="group relative border-2 border-white/20 text-white font-bold text-sm px-7 py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5">
              <span className="relative z-10">LinkedIn ↗</span>
              <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{boxShadow:'0 0 20px 4px rgba(255,255,255,0.12)',background:'rgba(255,255,255,0.06)'}}/>
            </a>
            {/* GitHub */}
            <a href="https://github.com/runrunrunlin" target="_blank" rel="noreferrer"
              className="group relative border-2 border-white/20 text-white font-bold text-sm px-7 py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5">
              <span className="relative z-10">GitHub ↗</span>
              <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{boxShadow:'0 0 20px 4px rgba(255,255,255,0.12)',background:'rgba(255,255,255,0.06)'}}/>
            </a>
          </div>
          <p className="text-gray-600 text-xs font-mono">© 2026 Run "Rune" Lin · built with curiosity & one supervising dog</p>
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
