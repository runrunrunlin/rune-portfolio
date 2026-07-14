import { useRef, useState, useEffect } from 'react'

const PAGES=[
  {layout:'two',imgs:[{s:'/images/FullSizeRender.jpg',c:'phi phi island ☀️'},{s:'/images/IMG_2042.jpg',c:'thailand 🌿'}]},
  {layout:'two',imgs:[{s:'/images/IMG_8186.jpg',c:'on a boat'},{s:'/images/IMG_5909.jpg',c:'niagara falls'}]},
  {layout:'three',imgs:[{s:'/images/IMG_9612.jpg',c:'spring canopy'},{s:'/images/IMG_7575.jpg',c:'lake louise 🏔️'},{s:'/images/IMG_0492.jpg',c:'sunset gap'}]},
  {layout:'two',imgs:[{s:'/images/IMG_7971.jpg',c:'my dog~ 🐾'},{s:'/images/IMG_1544.jpg',c:'my dog~ snow ❄️'}]},
  {layout:'three',imgs:[{s:'/images/c7cbe8ad-d62d-431c-9590-dc2fc633a16e.jpg',c:'my dog~ costume 😂'},{s:'/images/beauty_1766618940180.jpg',c:'my dog~ scholar 🎓'},{s:'/images/100_1137.jpg',c:'my dog~ 📷'}]},
  {layout:'two',imgs:[{s:'/images/painting-sunset.jpg',c:'my paint~ Evening Catch 🎨'},{s:'/images/IMG_7978.jpg',c:'chasing sunsets'}]},
  {layout:'three',imgs:[{s:'/images/IMG_0338.jpg',c:'autumn'},{s:'/images/IMG_2776.jpg',c:'stilt house thailand'},{s:'/images/IMG_6259.jpg',c:'graduation day'}]},
  {layout:'two',imgs:[{s:'/images/IMG_8972.jpg',c:'niagara'},{s:'/images/IMG_1735.jpg',c:'shanghai nights'}]},
]

export default function Gallery(){
  const [cur,setCur]=useState(0)
  const [opened,setOpened]=useState(false)
  const bookRef=useRef<HTMLDivElement>(null)
  const secRef=useRef<HTMLElement>(null)
  const [tilt,setTilt]=useState({rx:8,ry:-5})
  const dragStart=useRef<number|null>(null)

  useEffect(()=>{
    const sec=secRef.current!
    function onMove(e:MouseEvent){
      const scene=bookRef.current?.parentElement
      if(!scene)return
      const r=scene.getBoundingClientRect()
      const cx=r.left+r.width/2,cy=r.top+r.height/2
      setTilt({rx:8+((e.clientY-cy)/cy)*(-5),ry:-5+((e.clientX-cx)/cx)*7})
    }
    function onLeave(){setTilt({rx:8,ry:-5})}
    sec.addEventListener('mousemove',onMove)
    sec.addEventListener('mouseleave',onLeave)
    return()=>{sec.removeEventListener('mousemove',onMove);sec.removeEventListener('mouseleave',onLeave)}
  },[])

  function next(){if(!opened)return;setCur(p=>Math.min(p+1,PAGES.length-1))}
  function prev(){if(!opened)return;setCur(p=>Math.max(p-1,0))}
  function clickCover(){if(!opened){setOpened(true)}else next()}

  function onMouseDown(e:React.MouseEvent){dragStart.current=e.clientX}
  function onMouseUp(e:React.MouseEvent){
    if(dragStart.current===null)return
    const dx=e.clientX-dragStart.current
    if(dx<-50)next();else if(dx>50)prev()
    dragStart.current=null
  }

  const pg=PAGES[cur]

  return(
    <section ref={secRef} id="gallery" className="relative z-[11] bg-[#E8F2F5]"
      style={{borderRadius:'50px 50px 0 0',marginTop:'-40px',padding:'clamp(60px,10vw,130px) 5vw'}}>
      <h2 className="font-fraunces font-black uppercase tracking-[-0.02em] leading-[.94] text-center text-[#2B2B2E] mb-[clamp(32px,5vw,70px)]"
        style={{fontSize:'clamp(3rem,12vw,11rem)'}}>
        My <em className="not-italic text-[#5BAAC8]">Album</em>
      </h2>

      <div className="flex flex-col items-center gap-5">
        {/* perspective wrapper */}
        <div style={{perspective:'2000px',width:'min(700px,92vw)'}}>
          <div ref={bookRef}
            className="relative will-change-transform transition-transform duration-500"
            style={{width:'100%',aspectRatio:'16/10',transformStyle:'preserve-3d',
              transform:`rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`}}
            onMouseDown={onMouseDown} onMouseUp={onMouseUp}>

            {/* LEFT COVER */}
            <div onClick={clickCover} style={{
              position:'absolute',left:0,top:0,width:'50%',height:'100%',
              background:'linear-gradient(135deg,#7AB8D4 0%,#5BAAC8 50%,#3d7a8a 100%)',
              borderRadius:'6px 0 0 6px',transformOrigin:'right center',transformStyle:'preserve-3d',
              boxShadow:'-10px 0 30px rgba(0,0,0,.25)',
              display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',
              color:'#fff',cursor:'pointer',
              transition:'transform .75s cubic-bezier(.4,0,.2,1)',
              transform:opened?'rotateY(-165deg)':'rotateY(0deg)',
            }}>
              <div className="font-fraunces italic font-light text-[clamp(1rem,2.5vw,1.5rem)]">Rune's Album</div>
              <div className="font-mono text-[.6rem] opacity-60 mt-1.5 tracking-[.06em]">
                {opened?'click to flip →':'click to open →'}
              </div>
            </div>

            {/* SPINE */}
            <div style={{position:'absolute',left:'calc(50% - 12px)',top:0,width:'24px',height:'100%',
              background:'linear-gradient(to right,#3d7a8a,#5BAAC8,#3d7a8a)',
              boxShadow:'0 0 14px rgba(0,0,0,.35)',zIndex:10}}/>

            {/* PAGES */}
            <div style={{position:'absolute',right:0,top:0,width:'50%',height:'100%',
              borderRadius:'0 6px 6px 0',background:'#fdf9f4',overflow:'hidden'}}>
              <div style={{
                display:'grid',gap:'8px',padding:'14px',height:'100%',alignContent:'start',
                gridTemplateColumns:pg.layout==='three'?'1fr 1fr 1fr':'1fr 1fr',
              }}>
                {pg.imgs.map((im,i)=>(
                  <div key={i} style={{display:'flex',flexDirection:'column',gap:'4px'}}>
                    <img src={im.s} alt="" loading="lazy"
                      style={{width:'100%',borderRadius:'5px',objectFit:'cover',
                        boxShadow:'0 3px 12px rgba(0,0,0,.15)',
                        transform:`rotate(${(i%2===0?-1:1)*1.5}deg)`,flex:1,minHeight:0}}/>
                    <div className="font-mono text-[.55rem] text-[#aaa] text-center">{im.c}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* PAGE THICKNESS ILLUSION */}
            <div style={{position:'absolute',right:0,top:'4px',width:'10px',height:'calc(100% - 8px)',
              background:'linear-gradient(to right,#e5d8c8,#f0e8da)',borderRadius:'0 3px 3px 0'}}/>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button onClick={prev}
            className="w-10 h-10 rounded-full border border-[rgba(91,170,200,.4)] bg-white/60 text-[#3d7a8a] text-base flex items-center justify-center backdrop-blur-sm hover:bg-[#5BAAC8] hover:text-white hover:border-[#5BAAC8] transition-all">
            ‹
          </button>
          <span className="font-mono text-[.7rem] text-[#3d7a8a]">
            {opened?`${cur+1} / ${PAGES.length}`:'open the book'}
          </span>
          <button onClick={next}
            className="w-10 h-10 rounded-full border border-[rgba(91,170,200,.4)] bg-white/60 text-[#3d7a8a] text-base flex items-center justify-center backdrop-blur-sm hover:bg-[#5BAAC8] hover:text-white hover:border-[#5BAAC8] transition-all">
            ›
          </button>
        </div>
        <p className="font-mono text-[.65rem] text-[#3d7a8a]/55 tracking-[.06em]">
          drag book · click arrows to flip pages
        </p>
      </div>
    </section>
  )
}
