import { useEffect, useRef } from 'react'
const IMGS=[
  '/images/IMG_2776.jpg','/images/IMG_9930.jpg','/images/IMG_0492.jpg',
  '/images/IMG_0338.jpg','/images/IMG_9612.jpg','/images/IMG_7575.jpg',
  '/images/IMG_0551.jpg','/images/IMG_4922.jpg','/images/IMG_7978.jpg',
  '/images/IMG_7988.jpg','/images/IMG_9739.jpg',
  '/images/FullSizeRender.jpg','/images/IMG_2042.jpg','/images/IMG_5909.jpg',
  '/images/IMG_8186.jpg','/images/IMG_1735.jpg','/images/IMG_6259.jpg',
  '/images/IMG_7971.jpg','/images/IMG_1544.jpg','/images/100_1137.jpg',
  '/images/painting-sunset.jpg'
]
const half=Math.ceil(IMGS.length/2)
const row1=[...IMGS.slice(0,half),...IMGS.slice(0,half),...IMGS.slice(0,half)]
const row2=[...IMGS.slice(half),...IMGS.slice(half),...IMGS.slice(half)]

export default function Marquee(){
  const r1=useRef<HTMLDivElement>(null),r2=useRef<HTMLDivElement>(null),sec=useRef<HTMLElement>(null)
  useEffect(()=>{
    function update(){
      if(!sec.current||!r1.current||!r2.current)return
      const offset=(window.scrollY-sec.current.offsetTop+window.innerHeight)*.3
      r1.current.style.transform=`translateX(${offset-200}px)`
      r2.current.style.transform=`translateX(${-(offset-200)}px)`
    }
    window.addEventListener('scroll',update,{passive:true});update()
    return()=>window.removeEventListener('scroll',update)
  },[])
  const Item=({src}:{src:string})=>(
    <div className="flex-shrink-0 rounded-2xl overflow-hidden" style={{width:'clamp(220px,28vw,400px)',height:'clamp(140px,18vw,255px)'}}>
      <img src={src} alt="" className="w-full h-full object-cover" loading="lazy"/>
    </div>
  )
  return(
    <section ref={sec} className="bg-[#FBF6EC] overflow-hidden" style={{padding:'clamp(60px,10vw,140px) 0 40px'}}>
      <div ref={r1} className="flex gap-3.5 mb-3.5 will-change-transform">{row1.map((s,i)=><Item key={i} src={s}/>)}</div>
      <div ref={r2} className="flex gap-3.5 will-change-transform">{row2.map((s,i)=><Item key={i} src={s}/>)}</div>
    </section>
  )
}
