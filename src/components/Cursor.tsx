import { useEffect, useRef } from 'react'

interface P { x:number;y:number;vx:number;vy:number;r:number;life:number;decay:number;color:string }
const COLS=['rgba(255,122,89,','rgba(255,205,88,','rgba(143,168,136,','rgba(122,184,212,']

export default function Cursor() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const cv=ref.current!,ctx=cv.getContext('2d')!
    let W=0,H=0,mx=300,my=300,tick=0
    const pts:P[]=[]
    function resize(){W=cv.width=window.innerWidth;H=cv.height=window.innerHeight}
    resize();window.addEventListener('resize',resize)
    const onMove=(e:MouseEvent)=>{mx=e.clientX;my=e.clientY}
    document.addEventListener('mousemove',onMove)
    function spawn(){pts.push({x:mx,y:my,vx:(Math.random()-.5)*2.4,vy:(Math.random()-.5)*2.4-.7,r:3+Math.random()*4.5,life:1,decay:.026+Math.random()*.016,color:COLS[Math.floor(Math.random()*COLS.length)]})}
    let raf=0
    function anim(){
      raf=requestAnimationFrame(anim);ctx.clearRect(0,0,W,H)
      if(++tick%2===0)spawn()
      for(let i=pts.length-1;i>=0;i--){const p=pts[i];p.x+=p.vx;p.y+=p.vy;p.vy+=.045;p.life-=p.decay;if(p.life<=0){pts.splice(i,1);continue}ctx.beginPath();ctx.arc(p.x,p.y,p.r*p.life,0,Math.PI*2);ctx.fillStyle=p.color+(p.life*.85)+')';ctx.fill()}
      ctx.beginPath();ctx.arc(mx,my,5,0,Math.PI*2);ctx.fillStyle='rgba(232,93,61,.9)';ctx.fill()
    }
    anim()
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize);document.removeEventListener('mousemove',onMove)}
  },[])
  return <canvas ref={ref} className="fixed inset-0 z-[9999] pointer-events-none"/>
}
