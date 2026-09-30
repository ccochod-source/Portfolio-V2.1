/** Canvas animation adapted from the approved six-second preview. No external runtime. */
/**
 * @param {HTMLElement} stage
 * @param {HTMLCanvasElement} canvas
 * @param {{onReady?:()=>void,onProgress?:(progress:number)=>void,onComplete:()=>void,onError:()=>void}} callbacks
 * @returns {()=>void}
 */
export function mountMiraklScene(stage, canvas, {onReady,onProgress,onComplete,onError}) {
 const ctx=canvas.getContext('2d');
 if(!ctx){onError();return ()=>{};}
 const art=new Image(),clean=new Image();
 const reduced=false;
 let time=0,raf=0,last=null,loaded=false,mobile=false,width=0,height=0,px=0,py=0,disposed=false;
 const end=12,duration=6,playbackRate=end/duration,clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>1-Math.pow(1-clamp(x),4),sprites={};
 const vitality=()=>reduced?0:ease((time-.6)/1.7)*(1-ease((time-10.5)/1.5));
 const pieces={seller:{crop:[64,125,520,500],socket:[551,273],delay:.05},orb:{crop:[650,143,396,361],left:[680,327],right:[1020,342],delay:.45},market:{crop:[1128,84,518,540],socket:[1155,320],bottom:[1420,552],delay:.8},mail:{crop:[582,484,568,420],socket:[1124,680],delay:3.15}};
 function layout(){width=stage.clientWidth;height=stage.clientHeight;mobile=width<520;const ratio=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);draw()}
 function placement(key){const b=pieces[key];if(!mobile){const [x,y,w,h]=b.crop;return {x:x+64,y:y+118,w,h,s:1}}const layouts={seller:[110,25,.8],orb:[201,453,.6],market:[109,725,.81],mail:[77,1155,.86]};const [x,y,s]=layouts[key];return{x,y,w:b.crop[2]*s,h:b.crop[3]*s,s}}
 function pose(key){const p=placement(key),a=ease((time-pieces[key].delay)/1.15),depth={seller:.8,orb:1,market:.7,mail:1.3}[key],phase={seller:0,orb:.9,market:2.1,mail:3.5}[key],life=vitality()*a,motion=mobile?.7:1,lift=Math.sin(time*1.18+phase)*9*life*motion;return {...p,a,lift,x:p.x+(key==='seller'?-32:key==='market'?32:0)*(1-a)+(reduced?0:px*depth*11)+Math.sin(time*.8+phase)*3*life*motion,y:p.y+(key==='orb'?12:26)*(1-a)+(reduced?0:py*depth*6)+lift,zoom:.97+.03*a+(key==='orb'?.012*Math.sin(time*1.65)*life:0),angle:(key==='seller'?-.028:key==='market'?.028:.014)*(1-a)+Math.sin(time*.9+phase)*(key==='orb'?.025:.008)*life}}
 function point(key,source){const p=pose(key),[sx,sy,sw,sh]=pieces[key].crop;const dx=(source[0]-sx-sw/2)*p.s*p.zoom,dy=(source[1]-sy-sh/2)*p.s*p.zoom;return [p.x+p.w/2+dx*Math.cos(p.angle)-dy*Math.sin(p.angle),p.y+p.h/2+dx*Math.sin(p.angle)+dy*Math.cos(p.angle)]}
 function bezier(c,t){const u=1-t;return [u*u*u*c[0][0]+3*u*u*t*c[1][0]+3*u*t*t*c[2][0]+t*t*t*c[3][0],u*u*u*c[0][1]+3*u*u*t*c[1][1]+3*u*t*t*c[2][1]+t*t*t*c[3][1]]}
 function glow(x,y,r,color,opacity){ctx.save();ctx.globalAlpha=opacity;const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'rgba(90,170,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();ctx.restore()}
 function backdrop(W,H){ctx.save();const g=ctx.createLinearGradient(0,0,W,H);g.addColorStop(0,'#edf6ff');g.addColorStop(.5,'#f7faff');g.addColorStop(1,'#eee8ff');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);glow(W*.94,H*.2,W*.8,'rgba(204,189,255,.19)',1);glow(W*.06,H*.66,W*.7,'rgba(154,206,255,.13)',1);ctx.lineWidth=.8;ctx.strokeStyle='rgba(101,155,227,.12)';ctx.beginPath();const space=mobile?90:125;for(let i=-H*3;i<W+H*3;i+=space){ctx.moveTo(i,H*.13);ctx.lineTo(i+H*1.6,H);ctx.moveTo(i,H*.13);ctx.lineTo(i-H*1.6,H)}ctx.stroke();const fade=ctx.createLinearGradient(0,0,0,H*.63);fade.addColorStop(0,'#f2f7ff');fade.addColorStop(.33,'rgba(242,247,255,.94)');fade.addColorStop(1,'rgba(242,247,255,0)');ctx.fillStyle=fade;ctx.fillRect(0,0,W,H);ctx.restore()}
 function shadow(key){const p=pose(key);if(p.a<.002)return;ctx.save();ctx.translate(p.x+p.w*.53,p.y-p.lift+p.h*.95);const breath=1+p.lift*.002;ctx.scale(p.w*.6*breath,p.h*.10*breath);const g=ctx.createRadialGradient(0,0,0,0,0,1);g.addColorStop(0,'rgba(57,93,179,.23)');g.addColorStop(.48,'rgba(92,128,200,.09)');g.addColorStop(1,'rgba(90,126,200,0)');ctx.globalAlpha=p.a*(.9+p.lift*.006);ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,1,0,Math.PI*2);ctx.fill();ctx.restore()}
 function messageTexture(){const s=sprites.mail,x=s.message.getContext('2d'),[sx,sy,w,h]=pieces.mail.crop;x.clearRect(0,0,w,h);x.drawImage(s.base,0,0);const lines=[[[658,614],[1042,700]],[[658,642],[961,712]],[[658,671],[834,713]]];lines.forEach(([a,b],i)=>{const visible=reduced?1:clamp((time-(4.94+i*.38))/.24);if(visible>=1)return;const dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy),r=12;x.save();x.globalAlpha=1-visible;x.translate(a[0]-sx,a[1]-sy);x.rotate(Math.atan2(dy,dx));x.beginPath();x.moveTo(0,-r);x.lineTo(len,-r);x.arc(len,0,r,-Math.PI/2,Math.PI/2);x.lineTo(0,r);x.arc(0,0,r,Math.PI/2,Math.PI*1.5);x.closePath();x.clip();x.rotate(-Math.atan2(dy,dx));x.translate(-(a[0]-sx),-(a[1]-sy));x.drawImage(clean,sx,sy,w,h,0,0,w,h);x.restore()});return s.message}
 function reflection(key,p){if(reduced)return;const b=pieces[key],s=sprites[key],delay={seller:1.35,orb:2.1,market:2.75,mail:4.4}[key];let q=-1;for(const start of [delay,delay+4.8]){const f=(time-start)/1.7;if(f>0&&f<1)q=f;}if(q<0)return;const x=s.canvas.getContext('2d'),w=b.crop[2],h=b.crop[3];x.clearRect(0,0,w,h);x.globalCompositeOperation='source-over';x.drawImage(key==='mail'?s.message:s.base,0,0);x.globalCompositeOperation='source-in';const pos=-w*.45+q*w*1.9,g=x.createLinearGradient(pos-65,0,pos+85,h*.12);g.addColorStop(0,'rgba(220,246,255,0)');g.addColorStop(.4,'rgba(226,247,255,.08)');g.addColorStop(.52,'rgba(255,255,255,.36)');g.addColorStop(.65,'rgba(228,243,255,.1)');g.addColorStop(1,'rgba(220,246,255,0)');x.fillStyle=g;x.fillRect(0,0,w,h);ctx.drawImage(s.canvas,-p.w/2,-p.h/2,p.w,p.h)}
 function item(key){const p=pose(key),[sx,sy,sw,sh]=pieces[key].crop;if(p.a<.003)return;ctx.save();ctx.globalAlpha=Math.min(1,p.a*2);ctx.translate(p.x+p.w/2,p.y+p.h/2);ctx.rotate(p.angle);ctx.scale(p.zoom,p.zoom);if(key==='orb'){ctx.beginPath();ctx.ellipse(0,0,p.w*.494,p.h*.495,0,0,Math.PI*2);ctx.clip()}if(key==='mail'||key==='market'){const contour=key==='mail'?[[580,501],[631,478],[1101,566],[1153,631],[1153,906],[577,790]]:[[1125,92],[1205,76],[1639,171],[1650,615],[1580,636],[1125,510]];ctx.beginPath();contour.forEach(([x,y],i)=>{const X=(x-sx-sw/2)*p.s,Y=(y-sy-sh/2)*p.s;i?ctx.lineTo(X,Y):ctx.moveTo(X,Y)});ctx.closePath();ctx.clip()}if(key==='mail')ctx.drawImage(messageTexture(),-p.w/2,-p.h/2,p.w,p.h);else ctx.drawImage(art,sx,sy,sw,sh,-p.w/2,-p.h/2,p.w,p.h);reflection(key,p);ctx.restore()}
 function routes(){const a=point('seller',pieces.seller.socket),b=point('orb',pieces.orb.left),c=point('orb',pieces.orb.right),d=point('market',pieces.market.socket),e=point('market',pieces.market.bottom),f=point('mail',pieces.mail.socket);if(mobile){return [[a,[a[0]+85,a[1]+65],[b[0]-115,b[1]-30],b],[c,[c[0]+90,c[1]+25],[d[0]-95,d[1]-90],d],[e,[e[0]+145,e[1]+40],[f[0]+83,f[1]-10],f]]}return [[a,[a[0]+53,a[1]-12],[b[0]-67,b[1]+8],b],[c,[c[0]+65,c[1]+8],[d[0]-63,d[1]+8],d],[e,[e[0]+126,e[1]+95],[f[0]+215,f[1]+38],f]]}
 function curve(c,fraction,width,stroke){const segments=90;ctx.beginPath();ctx.moveTo(...c[0]);for(let j=1;j<=Math.ceil(segments*fraction);j++)ctx.lineTo(...bezier(c,Math.min(j/segments,fraction)));ctx.strokeStyle=stroke;ctx.lineWidth=width;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke()}
 function cables(){routes().forEach((c,i)=>{const a=ease((time-(1.3+i*.75))/.75);if(a<=0)return;ctx.save();curve(c,a,10,'rgba(51,153,255,.14)');curve(c,a,6.5,'#3c91ff');curve(c,a,3.4,'#0664ff');curve(c,a,1.1,'#a3edff');ctx.restore()})}
 function signals(){if(reduced)return;routes().forEach((c,i)=>{for(const batch of [2,5.1,8.2]){const q=(time-batch-i*.75)/1.3;if(q<=0||q>=1)continue;for(let j=8;j>0;j--){const tail=q-j*.013;if(tail<0)continue;const [tx,ty]=bezier(c,tail);glow(tx,ty,6,'rgba(255,112,151,.24)',(1-j/9)*.9)}const [x,y]=bezier(c,q);glow(x,y,23,'rgba(255,65,109,.30)',1);const g=ctx.createRadialGradient(x-3,y-4,1,x,y,9);g.addColorStop(0,'#fff0f5');g.addColorStop(.35,'#ff6d8f');g.addColorStop(.72,'#ff285d');g.addColorStop(1,'#d20e44');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,9,0,Math.PI*2);ctx.fill()}})}
 function shine(){if(reduced)return;const p=pose('orb'),m=pose('mail');glow(p.x+p.w*.5,p.y+p.h*.5,p.w*.36,'rgba(125,209,255,.21)',(.42+.3*Math.sin(time*1.65))*vitality());for(const start of [3,6.1,9.2]){const pulse=Math.sin(clamp((time-start)/.8)*Math.PI);if(pulse>0)glow(p.x+p.w*.5,p.y+p.h*.5,p.w*.49,'rgba(130,219,255,.35)',pulse*.55);const flash=Math.sin(clamp((time-start-2.0)/.9)*Math.PI);if(flash>0){const button=point('mail',[1014,803]);glow(button[0],button[1],m.w*.10,'rgba(77,156,255,.48)',flash);}}}

 function draw(){if(!loaded)return;const W=mobile?640:1800,H=mobile?1590:1184;ctx.setTransform(canvas.width/W,0,0,canvas.height/H,0,0);ctx.clearRect(0,0,W,H);backdrop(W,H);['seller','market','orb','mail'].forEach(shadow);cables();['seller','market','orb','mail'].forEach(item);signals();shine();onProgress?.(time/end);}

 function frame(now){
  if(disposed)return;
  if(last!==null)time=Math.min(end,time+(now-last)/1000*playbackRate);
  last=now;
  try{draw();}catch{onError();return;}
  if(time>=end){onComplete();return;}
  raf=requestAnimationFrame(frame);
 }
 const observer=new ResizeObserver(()=>{if(!disposed)layout();});
 function pointerMove(event){if(event.pointerType==='touch'||mobile)return;const r=stage.getBoundingClientRect();px=(event.clientX-r.left)/r.width-.5;py=(event.clientY-r.top)/r.height-.5;}
 function pointerLeave(){px=py=0;}
 function prepare(){
  if(disposed||loaded||!art.complete||!clean.complete||!art.naturalWidth||!clean.naturalWidth)return;
  try{
   for(const [key,b]of Object.entries(pieces)){
    const [x,y,w,h]=b.crop,base=document.createElement('canvas'),shine=document.createElement('canvas'),message=document.createElement('canvas');
    base.width=shine.width=message.width=w;base.height=shine.height=message.height=h;
    const context=base.getContext('2d');if(!context)throw new Error('Canvas unavailable');
    context.drawImage(art,x,y,w,h,0,0,w,h);sprites[key]={base,canvas:shine,message};
   }
   loaded=true;observer.observe(stage);layout();onReady?.();raf=requestAnimationFrame(frame);
  }catch{onError();}
 }
 art.onload=clean.onload=prepare;
 art.onerror=clean.onerror=()=>{if(!disposed)onError();};
 art.src='/projects/mirakl-motion/scene.webp';clean.src='/projects/mirakl-motion/message-clean.webp';
 stage.addEventListener('pointermove',pointerMove);stage.addEventListener('pointerleave',pointerLeave);prepare();
 return ()=>{disposed=true;cancelAnimationFrame(raf);observer.disconnect();art.onload=clean.onload=art.onerror=clean.onerror=null;stage.removeEventListener('pointermove',pointerMove);stage.removeEventListener('pointerleave',pointerLeave);};
}
