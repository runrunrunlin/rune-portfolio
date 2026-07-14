import { useEffect, useRef } from 'react'
const BLOBS=[
  {x:.12,y:.18,r:.42,c:'rgba(255,155,107,',a:.22,ph:0,sp:.35},
  {x:.72,y:.12,r:.38,c:'rgba(255,210,100,',a:.18,ph:1.2,sp:.28},
  {x:.50,y:.62,r:.44,c:'rgba(180,220,200,',a:.17,ph:2.4,sp:.32},
  {x:.88,y:.72,r:.32,c:'rgba(160,200,230,',a:.20,ph:3.6,sp:.38},
  {x:.18,y:.78,r:.35,c:'rgba(255,160,140,',a:.16,ph:4.8,sp:.30},
  {x:.42,y:.35,r:.28,c:'rgba(200,230,180,',a:.14,ph:0.6,sp:.42},
]
export default function WatercolorCanvas({className=''}:{className?:string}){
  const ref=useRef<HTMLCanvasElement>(null)
  useEffect(()=>{
    const cv=ref.current!,ctx=cv.getContext('2d')!
    let W=0,H=0,t=0,raf=0
    function resize(){W=cv.width=cv.offsetWidth;H=cv.height=cv.offsetHeight}
    function draw(){
      ctx.clearRect(0,0,W,H);ctx.fillStyle='#FBF6EC';ctx.fillRect(0,0,W,H)
      BLOBS.forEach(b=>{
        const bx=W*(b.x+Math.sin(t*b.sp+b.ph)*.06)
        const by=H*(b.y+Math.cos(t*b.sp*.8+b.ph)*.05)
        const r=Math.min(W,H)*b.r
        for(let i=0;i<5;i++){
          const g=ctx.createRadialGradient(bx,by,0,bx,by,r*(1-i*.15))
          const al=b.a*(1-i*.18)
          g.addColorStop(0,b.c+al+')');g.addColorStop(.55,b.c+(al*.4)+')');g.addColorStop(1,b.c+'0)')
          ctx.save();ctx.translate(bx,by)
          ctx.scale(1+Math.sin(t*.3+b.ph)*.04,1+Math.cos(t*.25+b.ph)*.04)
          ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();ctx.restore()
        }
      })
      t+=.007;raf=requestAnimationFrame(draw)
    }
    const ro=new ResizeObserver(resize);ro.observe(cv);resize();draw()
    return()=>{cancelAnimationFrame(raf);ro.disconnect()}
  },[])
  return <canvas ref={ref} className={`w-full h-full ${className}`}/>
}
