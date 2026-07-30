import{b as i,j as e,f as ct}from"./react-DDkUvPM3.js";import{g,S as U,L as ut}from"./motion-Dv0wD4dN.js";import{V as P,M as $,u as Q,a as O,E as dt,L as te,B as mt,K as ft,C as ht,b as k,c as Pe,N as pt,d as vt,T as gt,e as xt,f as wt,S as Y,g as M,P as yt,h as Je,i as et,F as Se,A as ge,j as Ne,k as W,l as ke,m as bt,n as me,o as jt,O as tt,p as _t,D as st,q as St,R as Mt,r as Nt,s as kt,t as Tt}from"./three-BWnlTA-q.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(a){if(a.ep)return;a.ep=!0;const o=r(a);fetch(a.href,o)}})();g.registerPlugin(U);g.defaults({ease:"power3.out",duration:1});U.config({ignoreMobileResize:!0});const Me=t=>typeof window<"u"&&window.matchMedia(t).matches,D=()=>Me("(prefers-reduced-motion: reduce)"),rt=()=>Me("(hover: none)")||Me("(pointer: coarse)");let le=null;const Rt=()=>{if(le)return le;if(typeof window>"u")return"mid";const t=navigator.hardwareConcurrency??4,s=navigator.deviceMemory??4,r=window.innerWidth<760,n=window.devicePixelRatio||1;let a=0;return a+=t>=8?2:t>=4?1:0,a+=s>=8?2:s>=4?1:0,a+=r?0:1,a+=n>2.5?0:1,le=a>=5?"high":a>=3?"mid":"low",le},Z=()=>{const t=Rt(),s=D();return{tier:t,reduced:s,dpr:t==="high"?[1,1.75]:t==="mid"?[1,1.4]:[.85,1],postFx:t!=="low"&&!s,shadows:!1,beanCount:t==="high"?220:t==="mid"?130:60,steamCount:t==="high"?1100:t==="mid"?650:280,emberCount:t==="high"?420:t==="mid"?240:110,dustCount:t==="high"?700:t==="mid"?380:160,cupSegments:t==="low"?32:64}},Be=["Sourcing","Roasting","Grinding","Ember & Oak"];function Ct({ready:t,onDone:s}){const r=i.useRef(null),n=i.useRef(null),a=i.useRef(null),o=i.useRef(null),[l,c]=i.useState(0),[d,m]=i.useState(0),[f,p]=i.useState(!1),h=i.useRef(!1);return i.useEffect(()=>{const v={v:0},w=g.to(v,{v:.92,duration:D()?.2:2.1,ease:"power2.out",onUpdate:()=>{c(Math.round(v.v*100)),n.current&&(n.current.style.transform=`scaleX(${v.v})`)}});let j=0;const R=window.setInterval(()=>{j=Math.min(j+1,Be.length-1),a.current&&g.timeline().to(a.current,{yPercent:-110,duration:.5,ease:"expo.inOut"}).add(()=>m(j)).fromTo(a.current,{yPercent:110},{yPercent:0,duration:.6,ease:"expo.out"})},620);return()=>{w.kill(),window.clearInterval(R)}},[]),i.useEffect(()=>{if(!t||h.current)return;h.current=!0;const v=D(),w={v:.92},j=g.timeline({onComplete:()=>{p(!0),s()}});return j.to(w,{v:1,duration:v?.1:.5,ease:"power2.inOut",onUpdate:()=>{c(Math.round(w.v*100)),n.current&&(n.current.style.transform=`scaleX(${w.v})`)}}),v?j.set([r.current,o.current],{autoAlpha:0}):j.to(".loader__inner",{yPercent:-8,autoAlpha:0,duration:.7,ease:"expo.inOut"},"+=0.15").to(r.current,{yPercent:-100,duration:1.15,ease:"expo.inOut"},"-=0.35").fromTo(o.current,{yPercent:0},{yPercent:-100,duration:1.25,ease:"expo.inOut"},"<0.08"),()=>{j.kill()}},[t,s]),f?null:e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"loader",ref:r,"data-done":t,role:"status","aria-live":"polite",children:e.jsxs("div",{className:"loader__inner",children:[e.jsx("h1",{className:"loader__word",children:e.jsx("span",{ref:a,children:Be[d]})}),e.jsxs("div",{className:"loader__meta",children:[e.jsx("span",{children:"Ember & Oak — Est. 2014"}),e.jsxs("span",{className:"loader__count",children:[String(l).padStart(3,"0"),"%"]})]}),e.jsx("div",{className:"loader__bar",children:e.jsx("i",{ref:n})})]})}),e.jsx("div",{className:"loader__curtain",ref:o,"aria-hidden":"true"})]})}const Et=(t=.32)=>{const s=i.useRef(null);return i.useEffect(()=>{const r=s.current;if(!r||rt()||D())return;const n=g.quickTo(r,"x",{duration:.7,ease:"power3.out"}),a=g.quickTo(r,"y",{duration:.7,ease:"power3.out"}),o=c=>{const d=r.getBoundingClientRect();n((c.clientX-(d.left+d.width/2))*t),a((c.clientY-(d.top+d.height/2))*t)},l=()=>{n(0),a(0)};return r.addEventListener("pointermove",o),r.addEventListener("pointerleave",l),()=>{r.removeEventListener("pointermove",o),r.removeEventListener("pointerleave",l),g.killTweensOf(r)}},[t]),s},At=()=>e.jsx("svg",{className:"btn__arrow",viewBox:"0 0 16 16",fill:"none","aria-hidden":"true",children:e.jsx("path",{d:"M2 8h11M9 4l4 4-4 4",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round",strokeLinejoin:"round"})});function Te({children:t,variant:s="outline",arrow:r=!0,strength:n=.28,className:a,...o}){const l=Et(n),c=["btn",s==="solid"&&"btn--solid",s==="ghost"&&"btn--ghost",a].filter(Boolean).join(" ");return e.jsxs("button",{ref:l,className:c,type:"button",...o,children:[e.jsx("span",{children:t}),r&&e.jsx(At,{})]})}const xe=(t,s=!0)=>{const r=i.useRef(t);r.current=t,i.useEffect(()=>{if(!s)return;const n=(a,o)=>r.current(a,o);return g.ticker.add(n),()=>g.ticker.remove(n)},[s])},T=(t,s=0,r=1)=>Math.min(r,Math.max(s,t)),B=(t,s,r)=>t+(s-t)*r,S=(t,s,r,n)=>B(t,s,1-Math.exp(-r*n)),Lt=(t,s,r,n=0,a=1)=>r-s===0?n:n+(t-s)/(r-s)*(a-n),A=(t,s,r,n=0,a=1)=>T(Lt(t,s,r,n,a),Math.min(n,a),Math.max(n,a)),Pt=t=>{const s=T(t);return s*s*(3-2*s)},Bt=t=>{const s=Math.sin(t*127.1+311.7)*43758.5453;return s-Math.floor(s)},C=(t,s,r)=>s+Bt(t)*(r-s),fe=["hero","origin","roast","brew","menu","ritual","visit"],Oe=fe.reduce((t,s,r)=>(t[s]=r,t),{}),x={y:0,progress:0,tl:0,velocity:0,direction:1,act:"hero",actT:0,pointer:{x:0,y:0},vw:1280,vh:800,maxScroll:1,live:!1},he=new Map,pe=new Map,Ie=(t,s)=>{s?he.set(t,s):he.delete(t),ne()},ne=()=>{if(typeof window>"u")return;const t=document.documentElement;x.vw=window.innerWidth,x.vh=window.innerHeight,x.maxScroll=Math.max(1,t.scrollHeight-window.innerHeight);const s=fe.filter(n=>he.has(n)),r=s.map(n=>he.get(n).getBoundingClientRect().top+window.scrollY);s.forEach((n,a)=>{const o=a===0?0:r[a],l=a===s.length-1?x.maxScroll:r[a+1];pe.set(n,{start:o,end:Math.max(l,o+1)})})},Ot=1e-4,ye=t=>{const s=x.y;x.y=t,x.progress=T(t/x.maxScroll),Math.abs(t-s)>Ot&&(x.direction=t>s?1:-1);const r=fe.filter(l=>pe.has(l));if(!r.length){x.tl=x.progress*(fe.length-1);return}let n=0,a=r[0],o=0;for(let l=0;l<r.length;l++){const c=r[l],d=pe.get(c);if(t>=d.start&&t<d.end){o=T((t-d.start)/(d.end-d.start)),n=Oe[c]+o,a=c;break}l===r.length-1&&(o=1,n=Oe[c]+1,a=c)}x.tl=n,x.act=a,x.actT=o},It=t=>{x.velocity=T(t/45,-1,1)},Ft=(t,s)=>{x.pointer.x=t,x.pointer.y=s},Wt=t=>{x.live=t},oe=t=>pe.get(t)?.start??0;let z=null;const X=(t,s=0)=>{if(z){z.scrollTo(t,{offset:s,duration:1.6,lock:!1});return}const r=typeof t=="string"?document.querySelector(t):null,n=typeof t=="number"?t:(r?.getBoundingClientRect().top??0)+window.scrollY;window.scrollTo({top:n+s,behavior:"smooth"})},Fe=t=>{document.body.dataset.locked=String(t),z&&(t?z.stop():z.start())},Gt=()=>{const t=i.useRef(!1);i.useEffect(()=>{if(t.current)return;t.current=!0;const s=D(),r=new ut({autoRaf:!1,lerp:s?1:.085,wheelMultiplier:1,touchMultiplier:1.6,syncTouch:!1,gestureOrientation:"vertical",anchors:!1});z=r,document.documentElement.classList.add("lenis"),r.on("scroll",c=>{ye(c.scroll),It(c.velocity),U.update()});const n=c=>r.raf(c*1e3);g.ticker.add(n),g.ticker.lagSmoothing(0);const a=c=>{Ft(c.clientX/window.innerWidth*2-1,-(c.clientY/window.innerHeight*2-1))};let o=0;const l=()=>{window.clearTimeout(o),o=window.setTimeout(()=>{r.resize(),ne(),ye(r.scroll),U.refresh()},140)};return window.addEventListener("pointermove",a,{passive:!0}),window.addEventListener("resize",l),document.fonts?.ready.then(()=>{ne(),U.refresh()}),ne(),ye(r.scroll),()=>{window.removeEventListener("pointermove",a),window.removeEventListener("resize",l),window.clearTimeout(o),g.ticker.remove(n),r.destroy(),z=null,document.documentElement.classList.remove("lenis"),t.current=!1}},[])},Dt=[{id:"origin",label:"Origin"},{id:"roast",label:"Roast"},{id:"brew",label:"Brew"},{id:"menu",label:"Menu"},{id:"visit",label:"Visit"}],Vt=()=>e.jsx("span",{className:"nav__mark","aria-hidden":"true",children:e.jsxs("svg",{viewBox:"0 0 32 32",fill:"none",children:[e.jsx("circle",{cx:"16",cy:"16",r:"14.2",stroke:"currentColor",strokeWidth:"1",opacity:".45"}),e.jsx("circle",{cx:"16",cy:"16",r:"6.4",stroke:"currentColor",strokeWidth:"1.4"}),e.jsx("path",{d:"M16 1.8v6M16 24.2v6M1.8 16h6M24.2 16h6",stroke:"currentColor",strokeWidth:"1"})]})});function Ht(){const[t,s]=i.useState(!1),[r,n]=i.useState(!1),[a,o]=i.useState("hero"),l=i.useRef(0);return xe(()=>{const c=x.y,d=c>80;d!==t&&s(d);const m=c>l.current+4,f=c<l.current-4;m&&c>520&&!r&&n(!0),(f||c<200)&&r&&n(!1),(m||f)&&(l.current=c),x.act!==a&&o(x.act)}),e.jsxs("header",{className:"nav","data-stuck":t,"data-hidden":r,children:[e.jsxs("a",{className:"nav__brand",href:"#top","data-cursor":"Top",onClick:c=>{c.preventDefault(),X(0)},children:[e.jsx(Vt,{}),"Ember & Oak"]}),e.jsx("nav",{className:"nav__links","aria-label":"Sections",children:Dt.map((c,d)=>e.jsxs("a",{className:"nav__link",href:`#${c.id}`,"data-active":a===c.id,onClick:m=>{m.preventDefault(),X(oe(c.id))},children:[e.jsxs("span",{className:"nav__link-index",children:["0",d+1]}),c.label]},c.id))}),e.jsx(Te,{className:"nav__cta",variant:"solid","data-cursor":"Reserve",onClick:()=>X(oe("visit")),children:"Book a table"})]})}function qt(){const t=i.useRef(null),s=i.useRef(null),[r,n]=i.useState(""),[a,o]=i.useState(!1),[l,c]=i.useState(!1);return i.useEffect(()=>{c(!rt())},[]),i.useEffect(()=>{if(!l)return;const d=t.current,m=s.current;if(!d||!m)return;const f=D()?0:.14,p=g.quickTo(d,"x",{duration:f,ease:"power2.out"}),h=g.quickTo(d,"y",{duration:f,ease:"power2.out"}),v=g.quickTo(m,"x",{duration:f*4.5,ease:"power2.out"}),w=g.quickTo(m,"y",{duration:f*4.5,ease:"power2.out"});let j={x:0,y:0};const R=N=>{p(N.clientX),h(N.clientY),v((N.clientX-j.x)*.06),w((N.clientY-j.y)*.06),j={x:N.clientX,y:N.clientY}},y=N=>{const F=N.target?.closest("[data-cursor]");F?(o(!0),n(F.dataset.cursor||"")):(o(!1),n(""))},_=()=>g.to(m,{scale:.78,duration:.25,ease:"power2.out"}),L=()=>g.to(m,{scale:1,duration:.4,ease:"power2.out"}),I=()=>g.to(d,{autoAlpha:0,duration:.3}),E=()=>g.to(d,{autoAlpha:1,duration:.3});return window.addEventListener("pointermove",R,{passive:!0}),window.addEventListener("pointerover",y,{passive:!0}),window.addEventListener("pointerdown",_),window.addEventListener("pointerup",L),document.addEventListener("pointerleave",I),document.addEventListener("pointerenter",E),()=>{window.removeEventListener("pointermove",R),window.removeEventListener("pointerover",y),window.removeEventListener("pointerdown",_),window.removeEventListener("pointerup",L),document.removeEventListener("pointerleave",I),document.removeEventListener("pointerenter",E),g.killTweensOf([d,m])}},[l]),l?e.jsxs("div",{className:"cursor",ref:t,"data-hot":a,"aria-hidden":"true",children:[e.jsx("div",{className:"cursor__ring",ref:s}),e.jsx("div",{className:"cursor__dot"}),e.jsx("span",{className:"cursor__label",children:r})]}):null}const Ut=(t=180)=>{const s=document.createElement("canvas");s.width=t,s.height=t;const r=s.getContext("2d");if(!r)return"";const n=r.createImageData(t,t);for(let a=0;a<n.data.length;a+=4){const o=128+(Math.random()-.5)*255;n.data[a]=o,n.data[a+1]=o,n.data[a+2]=o,n.data[a+3]=255}return r.putImageData(n,0,0),s.toDataURL("image/png")};function zt(){const[t,s]=i.useState("");return i.useEffect(()=>{const r="requestIdleCallback"in window,n=()=>s(Ut()),a=r?window.requestIdleCallback(n):window.setTimeout(n,240);return()=>{r?window.cancelIdleCallback(a):window.clearTimeout(a)}},[]),e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"vignette","aria-hidden":"true"}),e.jsx("div",{className:"grain","aria-hidden":"true",style:t?{backgroundImage:`url(${t})`}:void 0})]})}const $t={hero:"Arrival",origin:"Origin",roast:"Roast",brew:"Brew",menu:"Menu",ritual:"Ritual",visit:"Visit"};function Yt(){const t=i.useRef(null),[s,r]=i.useState(0),[n,a]=i.useState("hero"),[o,l]=i.useState(!1);return xe(()=>{const c=x.progress;t.current&&(t.current.style.transform=`scaleY(${Math.max(.01,c)})`);const d=Math.round(c*100);d!==s&&r(d),x.act!==n&&a(x.act);const m=x.y>240;m!==o&&l(m)}),e.jsxs("div",{className:"rail","data-visible":o,"aria-hidden":"true",children:[e.jsx("span",{className:"rail__num",children:String(s).padStart(2,"0")}),e.jsx("div",{className:"rail__track",children:e.jsx("i",{className:"rail__fill",ref:t})}),e.jsx("span",{className:"rail__num",style:{writingMode:"vertical-rl"},children:$t[n]??""})]})}class Kt extends i.Component{state={failed:!1};static getDerivedStateFromError(){return{failed:!0}}componentDidCatch(s,r){console.warn("[scene] falling back to the flat layout:",s.message,r.componentStack),this.props.onFail()}render(){return this.state.failed?null:this.props.children}}const ce=[{tl:0,pos:[0,.92,6.1],look:[0,.54,0],fov:30},{tl:.55,pos:[.95,1.25,5.8],look:[0,.54,0],fov:30,roll:-.01},{tl:1,pos:[1.8,2.7,7.8],look:[0,.48,0],fov:36,roll:-.018},{tl:1.55,pos:[0,3.5,9.8],look:[0,.28,0],fov:44},{tl:2.05,pos:[0,1.05,5.5],look:[0,.34,0],fov:34},{tl:2.5,pos:[-.95,.62,4.5],look:[0,.24,0],fov:30,roll:.014},{tl:2.95,pos:[.4,1.15,4.9],look:[0,.3,0],fov:32},{tl:3.16,pos:[0,2.45,4.7],look:[0,.72,0],fov:34},{tl:3.66,pos:[0,1.5,4.5],look:[0,.6,0],fov:30},{tl:4.06,pos:[0,1.32,6.5],look:[0,.48,0],fov:36},{tl:4.6,pos:[.6,1.65,7.3],look:[0,.44,0],fov:38,roll:-.012},{tl:5.15,pos:[0,1.95,8.8],look:[0,.58,0],fov:44},{tl:5.9,pos:[0,1.4,6.5],look:[0,.58,0],fov:38},{tl:6.6,pos:[0,1.16,5.3],look:[0,.56,0],fov:32}],We=new P,Ge=new P,De=new P,Ve=new P,se={pos:new P,look:new P,fov:35,roll:0},Xt=t=>{let s=0;for(;s<ce.length-2&&t>=ce[s+1].tl;)s++;const r=ce[s],n=ce[s+1]??r,a=n.tl-r.tl||1,o=Pt((t-r.tl)/a);return We.fromArray(r.pos),Ge.fromArray(n.pos),De.fromArray(r.look),Ve.fromArray(n.look),se.pos.copy(We).lerp(Ge,o),se.look.copy(De).lerp(Ve,o),se.fov=$.lerp(r.fov,n.fov,o),se.roll=$.lerp(r.roll??0,n.roll??0,o),se},H=(t,s,r,n,a)=>Math.min(A(t,s,r),1-A(t,n,a)),u={tl:0,tlRaw:0,vel:0,time:0,dt:.016,aspect:1.6,narrow:!1,px:0,py:0,cup:1,trio:0,subjectShift:0,fill:.86,crema:1,steam:1,pour:0,pourLen:0,beans:0,heroBean:0,roast:0,embers:0,dust:.4,floor:1,glow:.6,subjectX:0,subjectY:0},ve=[2.02,2.92],He=[3.04,3.86],Qt=(t,s,r)=>{const n=Math.min(s,.05);u.dt=n,u.time=t,u.aspect=r,u.narrow=x.vw<900,u.tlRaw=x.tl,u.tl=S(u.tl,x.tl,7.5,n),u.vel=S(u.vel,x.velocity,5,n);const a=u.narrow?.25:1;u.px=S(u.px,x.pointer.x*a,3.2,n),u.py=S(u.py,x.pointer.y*a,3.2,n);const o=u.tl,l=1-A(o,.7,.98),c=A(o,2.72,3.02);u.cup=Math.max(l,c),u.trio=H(o,3.85,4.18,4.82,5.12);const d=A(o,3.14,3.62,.05,.94);u.fill=o<2.2?.86:d,u.crema=o<2.2?1:A(o,3.3,3.8,.1,1),u.pour=H(o,3.04,3.15,3.5,3.62),u.pourLen=A(o,3.04,3.2),u.steam=u.cup*T(.18+u.fill*1.05)*(1-u.pour*.35),u.beans=Math.max(H(o,.32,.86,1.7,2),H(o,4.7,5.1,5.9,6.2)*.75),u.heroBean=H(o,1.7,2.06,2.86,3.08),u.roast=A(o,ve[0],ve[1]),u.embers=H(o,2.12,2.4,2.88,3.1),u.dust=.35+.45*H(o,4.3,5,6.1,6.5);const m=u.narrow?0:T(A(u.aspect,1.1,1.6,.4,1)),f=A(o,1.55,2.1),p=1-A(o,3.5,3.98);u.subjectShift=.46*f*p*m,u.subjectY=-1.55*H(o,3.86,4.22,4.86,5.18),u.glow=.45+.55*u.embers+.25*u.cup,u.floor=B(1,.35,A(o,4.6,5.4))},qe=new P,ue=new P;function Zt(){const t=Q(a=>a.camera),s=Q(a=>a.size),r=i.useRef(new P(0,.6,0)),n=i.useRef(null);return O((a,o)=>{Qt(a.clock.elapsedTime,o,s.width/Math.max(1,s.height));const l=Xt(u.tl),c=u.time,d=l.pos.z*Math.tan($.degToRad(l.fov)*.5)*Math.max(1,u.aspect);u.subjectX=u.subjectShift*d;const m=u.narrow?1.26:B(1.12,1,T(A(u.aspect,1.15,1.75)));qe.set(l.pos.x+u.px*.28,l.pos.y-u.py*.2+Math.sin(c*.35)*.022,l.pos.z*m+Math.sin(c*.27)*.03),t.position.copy(qe),ue.copy(l.look),ue.x+=u.px*.06,ue.y+=u.py*.03,r.current.lerp(ue,1-Math.exp(-6*u.dt)),t.lookAt(r.current),t.rotateZ(l.roll+u.px*.008);const f=l.fov+(u.narrow?6:0);Math.abs(t.fov-f)>.01&&(t.fov=S(t.fov,f,8,u.dt),t.updateProjectionMatrix()),n.current&&(n.current.intensity=B(2.1,3.4,T(u.glow)))}),e.jsxs(e.Fragment,{children:[e.jsx("ambientLight",{intensity:.35,color:"#c99a6a"}),e.jsx("directionalLight",{ref:n,position:[-3.2,4.4,2.6],intensity:2.4,color:"#ffd7ab"}),e.jsx("directionalLight",{position:[3.6,1.6,-3.2],intensity:1.5,color:"#6f86a8"}),e.jsx("pointLight",{position:[.6,-.4,1.6],intensity:1.5,distance:6.5,decay:2,color:"#c96a24"}),e.jsxs(dt,{resolution:256,frames:1,children:[e.jsx(te,{form:"circle",intensity:3.4,color:"#ffe2bd",scale:[13,13,1],position:[-7,7,6],target:[0,.6,0]}),e.jsx(te,{form:"rect",intensity:5,color:"#fff2dd",scale:[.55,6,1],position:[3.4,1.8,2.8],target:[0,.7,0]}),e.jsx(te,{form:"circle",intensity:1.35,color:"#7d93b8",scale:[15,15,1],position:[8,2,-7],target:[0,.6,0]}),e.jsx(te,{form:"circle",intensity:1.9,color:"#ff9b4d",scale:[7,7,1],position:[1.5,-2.4,4],target:[0,.4,0]}),e.jsx(te,{form:"circle",intensity:.9,color:"#3b2416",scale:[16,16,1],position:[0,-7,0],target:[0,0,0]})]})]})}function Jt(){const t=i.useMemo(()=>new mt({intensity:.55,luminanceThreshold:.3,luminanceSmoothing:.3,mipmapBlur:!0,kernelSize:ft.LARGE,radius:.76}),[]),s=i.useMemo(()=>new ht({blendFunction:Pe.NORMAL,offset:new k(6e-4,9e-4),radialModulation:!0,modulationOffset:.45}),[]),r=i.useMemo(()=>{const o=new pt({blendFunction:Pe.SOFT_LIGHT,premultiply:!0});return o.blendMode.opacity.value=.16,o},[]),n=i.useMemo(()=>new vt({offset:.22,darkness:.74}),[]),a=i.useMemo(()=>new gt({mode:xt.AGX}),[]);return i.useEffect(()=>()=>{[t,s,r,n,a].forEach(o=>o.dispose())},[t,s,r,n,a]),O(()=>{const o=T(u.embers*.9+u.cup*.3+.22);t.intensity=S(t.intensity,.4+o*.8,3,u.dt)}),e.jsxs(wt,{multisampling:0,enableNormalPass:!1,children:[e.jsx("primitive",{object:t}),e.jsx("primitive",{object:s}),e.jsx("primitive",{object:r}),e.jsx("primitive",{object:n}),e.jsx("primitive",{object:a})]})}const J=`
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float snoise(vec2 p) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;
    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    float m = step(a.y, a.x);
    vec2 o = vec2(m, 1.0 - m);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;
    vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
    vec3 n = h * h * h * h * vec3(
      dot(a, hash2(i)),
      dot(b, hash2(i + o)),
      dot(c, hash2(i + 1.0))
    );
    return dot(n, vec3(70.0));
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 5; i++) {
      v += amp * snoise(p);
      p *= 2.02;
      amp *= 0.5;
    }
    return v;
  }

  mat2 rot(float a) {
    float c = cos(a);
    float s = sin(a);
    return mat2(c, -s, s, c);
  }
`,Re=`
  float sprite(vec2 uv, float softness) {
    float d = length(uv - 0.5) * 2.0;
    return smoothstep(1.0, 1.0 - softness, d);
  }
`,es=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,ts=`
  precision highp float;

  uniform float uTime;
  uniform float uGlow;
  uniform float uOpacity;
  uniform vec3 uBase;
  uniform vec3 uWarm;

  varying vec2 vUv;

  ${J}

  void main() {
    vec2 p = (vUv - 0.5) * 2.0;
    float d = length(p);

    // Pool of light directly beneath the subject.
    float pool = exp(-d * d * 5.5);
    float halo = exp(-d * d * 1.4) * 0.35;

    // Brushed concrete: two noise octaves at different scales.
    float grain = fbm(vUv * 34.0) * 0.5 + 0.5;
    float sweep = fbm(vUv * 6.0 + vec2(uTime * 0.01, 0.0)) * 0.5 + 0.5;

    vec3 col = uBase * (0.65 + grain * 0.5);
    col = mix(col, uWarm, (pool * 0.7 + halo * 0.6) * uGlow);
    col *= 0.8 + sweep * 0.35;

    // Fade the plate out toward the horizon so it never shows an edge.
    float fade = 1.0 - smoothstep(0.18, 0.92, d);
    gl_FragColor = vec4(col, fade * uOpacity);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;class ss extends Y{constructor(){super({vertexShader:es,fragmentShader:ts,transparent:!0,depthWrite:!1,uniforms:{uTime:{value:0},uGlow:{value:1},uOpacity:{value:1},uBase:{value:new M("#150d09").convertSRGBToLinear()},uWarm:{value:new M("#4d2610").convertSRGBToLinear()}}})}}function rs(){const t=i.useMemo(()=>new ss,[]),s=i.useMemo(()=>new yt(36,36,1,1),[]),r=i.useMemo(()=>new Je(1.9,48),[]),n=i.useMemo(()=>new Y({transparent:!0,depthWrite:!1,uniforms:{uOpacity:{value:0}},vertexShader:`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,fragmentShader:`
          uniform float uOpacity;
          varying vec2 vUv;
          void main() {
            float d = length((vUv - 0.5) * 2.0);
            // Two falloffs stacked: a tight core contact plus a broad ambient.
            float core = exp(-d * d * 9.0);
            float soft = exp(-d * d * 2.2) * 0.5;
            gl_FragColor = vec4(0.0, 0.0, 0.0, min(1.0, (core + soft)) * uOpacity);
          }
        `}),[]),a=i.useRef(null);return i.useEffect(()=>()=>{s.dispose(),r.dispose(),t.dispose(),n.dispose()},[s,r,t,n]),O(()=>{t.uniforms.uTime.value=u.time,t.uniforms.uGlow.value=S(t.uniforms.uGlow.value,u.glow,3,u.dt),t.uniforms.uOpacity.value=S(t.uniforms.uOpacity.value,T(u.floor),3,u.dt);const o=T(u.cup)*.72+T(u.trio)*.2;n.uniforms.uOpacity.value=S(n.uniforms.uOpacity.value,o,4,u.dt),a.current&&(a.current.visible=n.uniforms.uOpacity.value>.004)}),e.jsxs("group",{children:[e.jsx("mesh",{geometry:s,material:t,rotation:[-Math.PI/2,0,0],position:[0,-.03,0]}),e.jsx("mesh",{ref:a,geometry:r,material:n,rotation:[-Math.PI/2,0,0],position:[0,.002,0],scale:[1,.85,1]})]})}const b={height:1.16,rimOuter:.86,rimInner:.79,baseOuter:.5,baseInner:.44,floor:.09,bulge:.055},as=t=>{const s=$.clamp((t-b.floor)/(b.height-b.floor),0,1),r=Math.pow(s,.86);return $.lerp(b.baseInner,b.rimInner,r)+b.bulge*Math.sin(s*Math.PI)*.6},Ue=(t,s,r,n,a)=>{for(let o=1;o<=a;o++){const l=o/a,c=Math.pow(l,.86),d=$.lerp(s.x,r.x,c)+n*Math.sin(l*Math.PI),m=$.lerp(s.y,r.y,l);t.push(new k(d,m))}},ns=(t=64)=>{const s=[],r=Math.max(10,Math.round(t/3));s.push(new k(0,.004)),s.push(new k(b.baseOuter*.55,0)),s.push(new k(b.baseOuter,.012)),Ue(s,new k(b.baseOuter,.012),new k(b.rimOuter,b.height),b.bulge,r),s.push(new k(b.rimOuter-.012,b.height+.012)),s.push(new k(b.rimInner+.012,b.height+.012)),Ue(s,new k(b.rimInner,b.height),new k(b.baseInner,b.floor),-.055*.8,r),s.push(new k(b.baseInner*.5,b.floor-.008)),s.push(new k(0,b.floor-.012));const n=new et(s,t);return n.computeVertexNormals(),n},os=(t=64)=>{const s=[new k(0,0),new k(.55,0),new k(.95,.008),new k(1.32,.058),new k(1.44,.086),new k(1.44,.104),new k(1.3,.086),new k(.9,.05),new k(.52,.042),new k(0,.042)],r=new et(s,t);return r.computeVertexNormals(),r},is=`
  uniform float uTime;
  uniform float uVel;
  uniform float uAgitate;

  varying vec2 vUv;
  varying float vR;
  varying float vWave;

  ${J}

  float surface(vec2 p, float t) {
    float r = length(p);
    // Concentric rings radiating from the centre, plus a slow swell.
    float rings = sin(r * 26.0 - t * 2.4) * exp(-r * 2.6) * 0.35;
    float swell = snoise(p * 2.1 + vec2(t * 0.12, -t * 0.09)) * 0.5;
    // Sloshing tilt driven by scroll velocity.
    float slosh = sin(p.x * 3.2 + t * 3.1) * uVel * 0.9;
    return rings * uAgitate + swell + slosh;
  }

  void main() {
    vUv = uv;
    vec3 p = position;
    vR = length(p.xy);

    float w = surface(p.xy, uTime);
    vWave = w;

    // Meniscus: the surface climbs slightly where it meets the wall.
    float meniscus = smoothstep(0.78, 1.0, vR) * 0.045;
    p.z += (1.0 - vR * vR) * 0.028 + w * 0.018 * (1.0 - vR) + meniscus;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`,ls=`
  precision highp float;

  uniform float uTime;
  uniform float uOpacity;
  uniform float uCrema;
  uniform vec3 uDeep;
  uniform vec3 uCremaColor;
  uniform vec3 uHighlight;

  varying vec2 vUv;
  varying float vR;
  varying float vWave;

  ${J}

  void main() {
    vec2 p = (vUv - 0.5) * 2.0;
    float r = length(p);
    if (r > 1.0) discard;

    float a = atan(p.y, p.x);

    // Crema: two counter-rotating noise fields sheared in polar space, which is
    // what gives espresso foam its marbled, dragged-out look.
    vec2 sw = vec2(cos(a), sin(a)) * r;
    float n1 = fbm(sw * 3.4 * rot(uTime * 0.05) + vec2(uTime * 0.06, 0.0));
    float n2 = fbm(sw * 6.8 * rot(-uTime * 0.08) - vec2(0.0, uTime * 0.05));
    float marble = n1 * 0.65 + n2 * 0.35;

    float foam = smoothstep(-0.05, 0.55, marble + (1.0 - r) * 0.35) * uCrema;

    vec3 col = mix(uDeep, uCremaColor, clamp(foam, 0.0, 1.0));

    // Denser ring of crema pushed against the wall.
    float ring = smoothstep(0.6, 0.95, r) * (1.0 - smoothstep(0.95, 1.0, r));
    col = mix(col, uCremaColor * 1.06, ring * 0.55 * uCrema);

    // Fake specular from the wave slope — a soft window reflection up-left.
    float slope = vWave;
    vec2 hp = p - vec2(-0.32, 0.42) - slope * 0.05;
    float spec = exp(-dot(hp, hp) * 5.2) * 0.55;
    spec += exp(-dot(p - vec2(0.28, -0.34), p - vec2(0.28, -0.34)) * 22.0) * 0.18;
    col += uHighlight * spec * (0.55 + 0.45 * uCrema);

    // Glints riding the ripples.
    float glint = smoothstep(0.55, 0.95, sin(vWave * 7.0 + uTime * 1.2)) * 0.06;
    col += uHighlight * glint;

    // Darken where the surface meets the ceramic.
    col *= 1.0 - smoothstep(0.86, 1.0, r) * 0.55;

    float alpha = uOpacity * (1.0 - smoothstep(0.985, 1.0, r));
    gl_FragColor = vec4(col, alpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;class cs extends Y{constructor(){super({vertexShader:is,fragmentShader:ls,transparent:!0,depthWrite:!1,side:Se,uniforms:{uTime:{value:0},uVel:{value:0},uAgitate:{value:.25},uOpacity:{value:1},uCrema:{value:1},uDeep:{value:new M("#1a0c06").convertSRGBToLinear()},uCremaColor:{value:new M("#c98a4a").convertSRGBToLinear()},uHighlight:{value:new M("#ffd9a8").convertSRGBToLinear()}}})}}const Ce=`
  uniform float uWorldSize;
  uniform float uViewHeight;

  float pointPixels(float radius, float depth) {
    float perUnit = uViewHeight * projectionMatrix[1][1] * 0.5;
    return radius * perUnit / max(0.001, depth);
  }
`,us=`
  uniform float uTime;
  uniform float uIntensity;
  uniform float uRise;
  uniform float uVel;
  uniform float uSpread;

  attribute float aSeed;
  attribute float aScale;
  attribute float aSpeed;

  varying float vAlpha;
  varying float vLife;
  varying float vSeed;

  ${J}
  ${Ce}

  void main() {
    float life = fract(uTime * aSpeed * 0.085 + aSeed);
    vLife = life;
    vSeed = aSeed;

    float y = pow(life, 0.82) * uRise;

    // Widen as it climbs, then curl with two out-of-phase drifts.
    float widen = mix(0.55, 1.0 + uSpread, pow(life, 1.3));
    float curl = snoise(vec2(aSeed * 31.0, uTime * 0.28 + life * 2.4)) * 0.42 * pow(life, 1.25);
    float curl2 = snoise(vec2(uTime * 0.21 - life * 1.9, aSeed * 17.0)) * 0.34 * pow(life, 1.15);

    vec3 world = vec3(
      position.x * widen + curl + uVel * 0.65 * pow(life, 1.4),
      y,
      position.z * widen + curl2
    );

    vec4 mv = modelViewMatrix * vec4(world, 1.0);

    // Fade in fast, out slow — steam thins as it dissipates.
    float fadeIn = smoothstep(0.0, 0.12, life);
    float fadeOut = 1.0 - smoothstep(0.14, 0.86, life);
    vAlpha = fadeIn * fadeOut * uIntensity * (0.35 + 0.65 * aScale);

    // Puffs expand as they rise, the way real condensation does.
    float radius = uWorldSize * aScale * (0.45 + life * 1.5);
    gl_PointSize = pointPixels(radius, -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`,ds=`
  precision highp float;

  uniform vec3 uColorCore;
  uniform vec3 uColorEdge;
  uniform float uTime;

  varying float vAlpha;
  varying float vLife;
  varying float vSeed;

  ${Re}

  void main() {
    float mask = sprite(gl_PointCoord, 1.0);
    mask = mask * mask;
    if (mask < 0.0015) discard;

    vec3 col = mix(uColorCore, uColorEdge, smoothstep(0.1, 0.8, vLife));
    float flick = 0.9 + 0.1 * sin(uTime * 3.0 + vSeed * 40.0);
    gl_FragColor = vec4(col, mask * vAlpha * flick);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;class ms extends Y{constructor(){super({vertexShader:us,fragmentShader:ds,transparent:!0,depthWrite:!1,depthTest:!0,blending:ge,uniforms:{uTime:{value:0},uIntensity:{value:0},uRise:{value:2.1},uWorldSize:{value:.12},uViewHeight:{value:900},uVel:{value:0},uSpread:{value:.75},uColorCore:{value:new M("#fff1de").convertSRGBToLinear()},uColorEdge:{value:new M("#6b4a34").convertSRGBToLinear()}}})}}const fs=`
  uniform float uTime;
  uniform float uIntensity;

  attribute float aSeed;
  attribute float aScale;
  attribute float aSpeed;

  varying float vAlpha;
  varying float vHeat;

  ${J}
  ${Ce}

  void main() {
    float life = fract(uTime * aSpeed * 0.14 + aSeed);
    float rise = life * 3.1;
    float droop = pow(life, 2.6) * 1.1;

    float swirlA = snoise(vec2(aSeed * 44.0, uTime * 0.4 + life * 3.0)) * 0.8 * life;
    float swirlB = snoise(vec2(uTime * 0.35, aSeed * 62.0 + life * 2.0)) * 0.8 * life;

    vec3 world = position + vec3(swirlA, rise - droop, swirlB);
    vec4 mv = modelViewMatrix * vec4(world, 1.0);

    vAlpha = uIntensity * sin(life * 3.14159) * (0.4 + 0.6 * aScale);
    vHeat = 1.0 - life;

    gl_PointSize = pointPixels(uWorldSize * aScale * (1.0 - life * 0.5), -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`,hs=`
  precision highp float;

  uniform vec3 uHot;
  uniform vec3 uCool;

  varying float vAlpha;
  varying float vHeat;

  ${Re}

  void main() {
    float mask = sprite(gl_PointCoord, 0.9);
    mask = pow(mask, 1.6);
    if (mask < 0.003) discard;

    vec3 col = mix(uCool, uHot, vHeat);
    gl_FragColor = vec4(col * (0.8 + vHeat * 1.6), mask * vAlpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;class ps extends Y{constructor(){super({vertexShader:fs,fragmentShader:hs,transparent:!0,depthWrite:!1,blending:ge,uniforms:{uTime:{value:0},uIntensity:{value:0},uWorldSize:{value:.022},uViewHeight:{value:900},uHot:{value:new M("#ffd08a").convertSRGBToLinear()},uCool:{value:new M("#c23f11").convertSRGBToLinear()}}})}}const vs=`
  uniform float uTime;
  uniform float uIntensity;
  uniform float uDrift;

  attribute float aSeed;
  attribute float aScale;

  varying float vAlpha;

  ${Ce}

  void main() {
    vec3 p = position;
    float t = uTime * 0.09;
    p.x += sin(t * 1.3 + aSeed * 26.0) * 0.5;
    p.y += sin(t * 0.9 + aSeed * 41.0) * 0.42 + uDrift;
    p.z += cos(t * 1.1 + aSeed * 33.0) * 0.5;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float twinkle = 0.45 + 0.55 * sin(uTime * 0.8 + aSeed * 55.0);
    vAlpha = uIntensity * twinkle * aScale;

    gl_PointSize = pointPixels(uWorldSize * aScale, -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`,gs=`
  precision highp float;
  uniform vec3 uColor;
  varying float vAlpha;

  ${Re}

  void main() {
    float mask = sprite(gl_PointCoord, 1.0);
    mask *= mask;
    if (mask < 0.002) discard;
    gl_FragColor = vec4(uColor, mask * vAlpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;class xs extends Y{constructor(){super({vertexShader:vs,fragmentShader:gs,transparent:!0,depthWrite:!1,blending:ge,uniforms:{uTime:{value:0},uIntensity:{value:.5},uWorldSize:{value:.014},uViewHeight:{value:900},uDrift:{value:0},uColor:{value:new M("#e8c79a").convertSRGBToLinear()}}})}}function ws({count:t=900,radius:s=.62,rise:r=1.1,size:n=.34,spread:a=.9,intensity:o=c=>c.steam,position:l=[0,0,0]}){const c=Q(h=>h.gl),d=i.useRef(null),m=i.useMemo(()=>new ms,[]),f=i.useMemo(()=>{const h=new Ne,v=new Float32Array(t*3),w=new Float32Array(t),j=new Float32Array(t),R=new Float32Array(t);for(let y=0;y<t;y++){const _=Math.sqrt(Math.random())*s,L=Math.random()*Math.PI*2;v[y*3]=Math.cos(L)*_,v[y*3+1]=0,v[y*3+2]=Math.sin(L)*_,w[y]=Math.random(),j[y]=.35+Math.random()*.85,R[y]=.55+Math.random()*.9}return h.setAttribute("position",new W(v,3)),h.setAttribute("aSeed",new W(w,1)),h.setAttribute("aScale",new W(j,1)),h.setAttribute("aSpeed",new W(R,1)),h.boundingSphere=new ke(new P(0,r*.5,0),r+s),h},[t,s,r]);i.useEffect(()=>{m.uniforms.uRise.value=r,m.uniforms.uWorldSize.value=n,m.uniforms.uSpread.value=a},[m,r,n,a]),i.useEffect(()=>()=>{f.dispose(),m.dispose()},[f,m]);const p=i.useRef(0);return O(()=>{const h=m.uniforms;h.uTime.value=u.time,h.uViewHeight.value=c.domElement.height,p.current=S(p.current,o(u),4,u.dt),h.uIntensity.value=p.current*.036,h.uVel.value=S(h.uVel.value,u.vel*.8,3,u.dt),d.current&&(d.current.visible=p.current>.004)}),e.jsx("points",{ref:d,geometry:f,material:m,position:l,frustumCulled:!1})}const ys=b.floor+.03,bs=b.height-.06;function be({presence:t=f=>f.cup,fill:s=f=>f.fill,steam:r=f=>f.steam,crema:n=f=>f.crema,position:a=[0,0,0],rotation:o=0,scale:l=1,saucer:c=!0,steamCount:d,seed:m=0}){const f=i.useMemo(()=>Z(),[]),p=i.useRef(null),h=i.useRef(null),v=i.useRef(null),w=i.useMemo(()=>ns(f.cupSegments),[f.cupSegments]),j=i.useMemo(()=>os(f.cupSegments),[f.cupSegments]),R=i.useMemo(()=>new bt(.29,.052,f.tier==="low"?8:16,f.cupSegments),[f]),y=i.useMemo(()=>new Je(1,f.cupSegments),[f.cupSegments]),_=i.useMemo(()=>new cs,[]),L=i.useMemo(()=>new me({color:new M("#1b100b").convertSRGBToLinear(),roughness:.36,metalness:0,clearcoat:.55,clearcoatRoughness:.34,sheen:.55,sheenColor:new M("#ffd9b0").convertSRGBToLinear(),sheenRoughness:.6,side:Se,transparent:!0,opacity:1,envMapIntensity:.8}),[]),I=i.useMemo(()=>new me({color:new M("#e7dac6").convertSRGBToLinear(),roughness:.5,metalness:0,clearcoat:.4,clearcoatRoughness:.35,side:Se,transparent:!0,envMapIntensity:1.05}),[]);i.useEffect(()=>()=>{[w,j,R,y].forEach(F=>F.dispose()),[_,L,I].forEach(F=>F.dispose())},[w,j,R,y,_,L,I]);const E=i.useRef(0),N=i.useRef(.5);return O(()=>{const F=T(t(u));E.current=S(E.current,F,6,u.dt);const Ee=E.current>.006;if(p.current){p.current.visible=Ee;const lt=l*B(.9,1,E.current);p.current.scale.setScalar(lt),p.current.position.set(a[0],a[1]+B(-.22,0,E.current),a[2]);const Le=u.time+m*12;p.current.rotation.y=o+u.px*.12+Math.sin(Le*.24)*.05+u.tl*.14,p.current.rotation.z=Math.sin(Le*.19)*.008,p.current.rotation.x=u.py*.03}if(!Ee)return;L.opacity=E.current,I.opacity=E.current;const Ae=T(s(u));N.current=S(N.current,B(ys,bs,Ae),5,u.dt);const we=N.current,it=as(we)-.006;h.current&&(h.current.position.y=we,h.current.scale.setScalar(it),h.current.visible=Ae>.015),v.current&&(v.current.position.y=we+.02);const V=_.uniforms;V.uTime.value=u.time,V.uOpacity.value=E.current,V.uCrema.value=S(V.uCrema.value,T(n(u)),4,u.dt),V.uVel.value=S(V.uVel.value,u.vel*.35,4,u.dt),V.uAgitate.value=S(V.uAgitate.value,.2+u.pour*1.6,4,u.dt)}),e.jsxs("group",{ref:p,children:[c&&e.jsx("mesh",{geometry:j,material:L,scale:[.78,1,.78]}),e.jsxs("group",{position:[0,.045,0],children:[e.jsx("mesh",{geometry:w,material:L,castShadow:!1}),e.jsx("mesh",{geometry:R,material:L,position:[b.rimOuter*.95,.66,0],rotation:[0,0,-.14],scale:[.82,1.12,1]}),e.jsx("mesh",{geometry:w,material:I,scale:[.955,.995,.955]}),e.jsx("mesh",{ref:h,geometry:y,material:_,rotation:[-Math.PI/2,0,0],position:[0,.5,0]}),e.jsx("group",{ref:v,children:e.jsx(ws,{count:d??f.steamCount,radius:b.rimInner*.72,rise:1.1,size:f.tier==="low"?.4:.34,intensity:r})})]})]})}const ze=(t,s)=>Math.exp(-(t*t)/(2*s*s)),at=({segments:t=64,length:s=1,width:r=.63,thickness:n=.43,crease:a=.94,lips:o=.13}={})=>{const l=new jt(1,t,Math.round(t*.62)),c=l.attributes.position,d=new P;for(let m=0;m<c.count;m++){d.fromBufferAttribute(c,m);const f=d.x*s,p=1+.08*(1-Math.abs(d.x));let h=d.y*r*p,v=d.z*n*p;const w=v>0;w&&(v*=.86);const j=Math.max(0,1-Math.pow(Math.abs(f)/s,2.4));if(w){const y=v/(n*.86),_=ze(h/r,.085)*a*j;v-=v*_,v+=ze(Math.abs(h/r)-.3,.13)*o*n*j*y}const R=Math.sin(f*14.5)*Math.sin(h*21.3)*.002*(w?.4:1);v+=Math.sign(v||1)*R,h+=Math.sin(f*3.1)*.008,c.setXYZ(m,f,h,v)}return l.computeVertexNormals(),l.computeBoundingSphere(),l},de=["#8e9a6a","#c9a95f","#b2793c","#8a4a26","#54291a","#2c1610"].map(t=>new M(t).convertSRGBToLinear()),js=new M,nt=(t,s=new M)=>{const r=Math.min(.9999,Math.max(0,t))*(de.length-1),n=Math.floor(r);return s.copy(de[n]).lerp(js.copy(de[n+1]??de[n]),r-n),s},re=new tt,$e=new M;function _s(){const t=i.useMemo(()=>Z(),[]),s=i.useRef(null),r=t.beanCount,n=i.useMemo(()=>at({segments:t.tier==="low"?24:40}),[t.tier]),a=i.useMemo(()=>new me({roughness:.58,metalness:0,clearcoat:.3,clearcoatRoughness:.45,transparent:!0,opacity:0,envMapIntensity:.85}),[]),o=i.useMemo(()=>Array.from({length:r},(c,d)=>{const m=d*1.37;return{radius:C(m+1,1.4,7.2),angle:C(m+2,0,Math.PI*2),y:C(m+3,-.35,2.6)*(C(m+9,0,1)>.72?1:.28),scale:C(m+4,.075,.185),spin:new P(C(m+5,-1,1),C(m+6,-1,1),C(m+7,-1,1)).normalize(),rate:C(m+8,.12,.55),bob:C(m+10,.05,.3),phase:C(m+11,0,Math.PI*2)}}),[r]);i.useEffect(()=>{const c=s.current;if(c){for(let d=0;d<r;d++)nt(C(d*2.11+5,.42,.95),$e),c.setColorAt(d,$e);c.instanceColor&&(c.instanceColor.needsUpdate=!0)}},[r]),i.useEffect(()=>()=>{n.dispose(),a.dispose()},[n,a]);const l=i.useRef(0);return O(()=>{const c=s.current;if(!c)return;l.current=S(l.current,T(u.beans),4.5,u.dt);const d=l.current>.005;if(c.visible=d,a.opacity=l.current,!d)return;const m=u.time,f=.72+.28*l.current;c.rotation.y=m*.028+u.tl*.16;for(let p=0;p<r;p++){const h=o[p],v=h.angle+m*.012*h.rate,w=h.radius*f;re.position.set(Math.cos(v)*w,h.y+Math.sin(m*.4*h.rate+h.phase)*h.bob,Math.sin(v)*w),re.quaternion.setFromAxisAngle(h.spin,m*h.rate+h.phase),re.scale.setScalar(h.scale*(.6+.4*l.current)),re.updateMatrix(),c.setMatrixAt(p,re.matrix)}c.instanceMatrix.needsUpdate=!0}),e.jsx("instancedMesh",{ref:s,args:[n,a,r],frustumCulled:!1,position:[0,.1,0]})}function Ss(){const t=i.useMemo(()=>Z(),[]),s=Q(c=>c.gl),r=i.useRef(null),n=t.emberCount,a=i.useMemo(()=>new ps,[]),o=i.useMemo(()=>{const c=new Ne,d=new Float32Array(n*3),m=new Float32Array(n),f=new Float32Array(n),p=new Float32Array(n);for(let h=0;h<n;h++){const v=.7+Math.random()*1.9,w=Math.random()*Math.PI*2;d[h*3]=Math.cos(w)*v,d[h*3+1]=-1.1+Math.random()*.9,d[h*3+2]=Math.sin(w)*v*.8,m[h]=Math.random(),f[h]=.3+Math.random()*1,p[h]=.5+Math.random()*1.2}return c.setAttribute("position",new W(d,3)),c.setAttribute("aSeed",new W(m,1)),c.setAttribute("aScale",new W(f,1)),c.setAttribute("aSpeed",new W(p,1)),c.boundingSphere=new ke(new P(0,1,0),6),c},[n]);i.useEffect(()=>{a.uniforms.uWorldSize.value=t.tier==="low"?.03:.024},[a,t.tier]),i.useEffect(()=>()=>{o.dispose(),a.dispose()},[o,a]);const l=i.useRef(0);return O(()=>{l.current=S(l.current,T(u.embers),4,u.dt),a.uniforms.uTime.value=u.time,a.uniforms.uViewHeight.value=s.domElement.height,a.uniforms.uIntensity.value=l.current*.85,r.current&&(r.current.visible=l.current>.004)}),e.jsx("points",{ref:r,geometry:o,material:a,frustumCulled:!1})}const ae=new tt,Ye=new _t;function Ms(){const t=i.useMemo(()=>Z(),[]),s=i.useRef(null),r=i.useRef(null),n=i.useRef(null),a=i.useRef(null),o=t.tier==="high"?46:t.tier==="mid"?28:14,l=i.useMemo(()=>at({segments:t.tier==="low"?40:96}),[t.tier]),c=i.useMemo(()=>new me({color:new M("#8e9a6a").convertSRGBToLinear(),roughness:.85,metalness:0,clearcoat:0,clearcoatRoughness:.4,sheen:.14,sheenColor:new M("#ffcf9b").convertSRGBToLinear(),emissive:new M("#ff5a12").convertSRGBToLinear(),emissiveIntensity:0,transparent:!0,opacity:0,envMapIntensity:.58}),[]),d=i.useMemo(()=>Array.from({length:o},(p,h)=>{const v=h*3.7+11;return{radius:C(v,1.5,3.1),angle:C(v+1,0,Math.PI*2),y:C(v+2,-.9,1.1),scale:C(v+3,.06,.14),rate:C(v+4,.3,1.1),tilt:C(v+5,-.5,.5)}}),[o]);i.useEffect(()=>()=>{l.dispose(),c.dispose()},[l,c]);const m=i.useRef(0),f=i.useRef(0);return O(()=>{m.current=S(m.current,T(u.heroBean),5,u.dt);const p=m.current>.005;if(s.current&&(s.current.visible=p),c.opacity=m.current,!p)return;f.current=S(f.current,T(u.roast),6,u.dt);const h=f.current;nt(h,c.color),c.roughness=B(.88,.26,Math.pow(h,1.3)),c.clearcoat=A(h,.55,1,0,.85),c.clearcoatRoughness=B(.5,.14,h);const v=Math.exp(-Math.pow((h-.55)/.09,2)),w=Math.exp(-Math.pow((h-.88)/.07,2)),j=.75+.25*Math.sin(u.time*14)*Math.sin(u.time*6.3),R=(v*.7+w)*j;c.emissiveIntensity=R*.34*m.current,a.current&&(a.current.intensity=(1.8+R*11)*m.current,a.current.position.set(Math.sin(u.time*.6)*.6,.4,1.3));const y=u.time,_=s.current;_.rotation.y=-.5+Math.sin(y*.22)*.3+u.tl*.34+u.px*.2,_.rotation.z=.3+Math.sin(y*.3)*.05+u.py*.06,_.rotation.x=-.12+Math.sin(y*.19)*.05;const L=1+v*.035+w*.05;_.scale.setScalar(B(.62,.86,m.current)*L),_.position.y=.28+Math.sin(y*.45)*.06;const I=n.current;if(I){for(let E=0;E<o;E++){const N=d[E],F=N.angle+y*.18*N.rate;ae.position.set(Math.cos(F)*N.radius,N.y+Math.sin(y*.6+N.angle)*.16,Math.sin(F)*N.radius),Ye.set(y*N.rate,y*N.rate*.7,N.tilt),ae.quaternion.setFromEuler(Ye),ae.scale.setScalar(N.scale*m.current),ae.updateMatrix(),I.setMatrixAt(E,ae.matrix)}I.instanceMatrix.needsUpdate=!0}}),e.jsxs("group",{ref:s,children:[e.jsx("mesh",{ref:r,geometry:l,material:c}),e.jsx("instancedMesh",{ref:n,args:[l,c,o],frustumCulled:!1}),e.jsx("pointLight",{ref:a,color:"#ff7a2a",distance:9,decay:2,intensity:0}),e.jsx(Ss,{})]})}const Ns=`
  uniform float uTime;
  uniform float uWobble;

  varying vec2 vUv;
  varying float vY;

  void main() {
    vUv = uv;
    vec3 p = position;
    // Local Y runs -0.5..0.5 on a unit cylinder; 0 = top of the stream.
    float t = 0.5 - p.y;
    vY = t;

    // The stream necks down and sways as it falls.
    float taper = mix(1.0, 0.52, smoothstep(0.0, 1.0, t));
    p.xz *= taper;
    p.x += sin(t * 7.0 + uTime * 6.0) * 0.028 * uWobble * t;
    p.z += cos(t * 6.2 + uTime * 5.2) * 0.024 * uWobble * t;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`,ks=`
  precision highp float;

  uniform float uTime;
  uniform float uProgress;
  uniform float uOpacity;
  uniform vec3 uColor;
  uniform vec3 uSheen;

  varying vec2 vUv;
  varying float vY;

  ${J}

  void main() {
    // The stream extends downward as the pour begins.
    if (vY > uProgress) discard;

    float flow = fbm(vec2(vUv.x * 4.0, vY * 7.0 - uTime * 3.4)) * 0.5 + 0.5;

    // Cylindrical shading: bright edge-lit column with a hot specular seam.
    float edge = abs(vUv.x - 0.5) * 2.0;
    float body = 1.0 - pow(edge, 2.2);
    float seam = exp(-pow((vUv.x - 0.36) * 9.0, 2.0));

    vec3 col = uColor * (0.55 + 0.75 * flow * body);
    col += uSheen * seam * 0.7;

    float tipFade = 1.0 - smoothstep(uProgress - 0.12, uProgress, vY);
    float alpha = uOpacity * body * (0.55 + 0.45 * flow) * tipFade;

    gl_FragColor = vec4(col, alpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;class Ts extends Y{constructor(){super({vertexShader:Ns,fragmentShader:ks,transparent:!0,depthWrite:!1,side:st,uniforms:{uTime:{value:0},uProgress:{value:0},uOpacity:{value:0},uWobble:{value:1},uColor:{value:new M("#5a2a12").convertSRGBToLinear()},uSheen:{value:new M("#e8b784").convertSRGBToLinear()}}})}}const Ke=1.7;function Rs(){const t=i.useRef(null),s=i.useRef(null),r=i.useMemo(()=>new Ts,[]),n=i.useMemo(()=>new St(.062,.05,Ke,20,26,!0),[]),a=i.useMemo(()=>new Mt(.06,.26,40),[]),o=i.useMemo(()=>new Nt({color:new M("#f0c391").convertSRGBToLinear(),transparent:!0,opacity:0,blending:ge,depthWrite:!1,side:st}),[]);i.useEffect(()=>()=>{n.dispose(),a.dispose(),r.dispose(),o.dispose()},[n,a,r,o]);const l=i.useRef(0);return O(()=>{l.current=S(l.current,T(u.pour),6,u.dt);const c=l.current>.005;if(t.current&&(t.current.visible=c),!c)return;const d=r.uniforms;if(d.uTime.value=u.time,d.uOpacity.value=l.current*.95,d.uProgress.value=S(d.uProgress.value,u.pourLen,5,u.dt),d.uWobble.value=.7+Math.abs(u.vel)*1.4,s.current){const m=u.time*1.8%1;s.current.position.y=B(b.floor+.06,b.height-.08,T(u.fill)),s.current.scale.setScalar(.6+m*1.5),o.opacity=(1-m)*.5*l.current*d.uProgress.value}}),e.jsxs("group",{ref:t,position:[0,.045,0],children:[e.jsx("mesh",{geometry:n,material:r,position:[0,b.height+Ke/2-.1,0]}),e.jsx("mesh",{ref:s,geometry:a,material:o,rotation:[-Math.PI/2,0,0]})]})}function Cs(){const t=i.useMemo(()=>Z(),[]),s=Q(o=>o.gl),r=i.useMemo(()=>new xs,[]),n=t.dustCount,a=i.useMemo(()=>{const o=new Ne,l=new Float32Array(n*3),c=new Float32Array(n),d=new Float32Array(n);for(let m=0;m<n;m++)l[m*3]=(Math.random()-.5)*16,l[m*3+1]=Math.random()*7-1.2,l[m*3+2]=(Math.random()-.5)*12,c[m]=Math.random(),d[m]=.25+Math.random()*.9;return o.setAttribute("position",new W(l,3)),o.setAttribute("aSeed",new W(c,1)),o.setAttribute("aScale",new W(d,1)),o.boundingSphere=new ke(new P(0,2,0),16),o},[n]);return i.useEffect(()=>()=>{a.dispose(),r.dispose()},[a,r]),O(()=>{const o=r.uniforms;o.uTime.value=u.time,o.uViewHeight.value=s.domElement.height,o.uIntensity.value=S(o.uIntensity.value,u.dust*.5,2.5,u.dt),o.uDrift.value=S(o.uDrift.value,-u.vel*.9,2,u.dt)}),e.jsx("points",{geometry:a,material:r,frustumCulled:!1})}function Es({onReady:t}){const s=i.useRef(0),r=Q(n=>n.gl);return i.useEffect(()=>{const n=window.setTimeout(t,6e3);return()=>window.clearTimeout(n)},[t,r]),O(()=>{s.current+=1,s.current===4&&t()}),null}function As(){const t=i.useRef(null);return O(()=>{const s=t.current;s&&(s.position.x=S(s.position.x,u.subjectX,5,u.dt),s.position.y=S(s.position.y,u.subjectY,5,u.dt))}),e.jsxs("group",{ref:t,children:[e.jsx(rs,{}),e.jsx(be,{}),e.jsx(Rs,{}),e.jsx(Ms,{}),e.jsx(be,{presence:s=>s.trio,fill:()=>.82,steam:s=>s.trio*.55,crema:()=>.85,position:[-1.72,0,.35],rotation:.6,scale:.78,seed:3,steamCount:280}),e.jsx(be,{presence:s=>s.trio,fill:()=>.62,steam:s=>s.trio*.45,crema:()=>.35,position:[1.72,0,.35],rotation:-.8,scale:.78,seed:7,steamCount:280})]})}function Ls({onReady:t}){const s=i.useMemo(()=>Z(),[]),[r,n]=i.useState(!0);return i.useEffect(()=>{const a=()=>n(!document.hidden);return document.addEventListener("visibilitychange",a),()=>document.removeEventListener("visibilitychange",a)},[]),e.jsxs(kt,{dpr:s.dpr,flat:s.postFx,frameloop:r?"always":"never",camera:{fov:34,near:.08,far:90,position:[0,.64,3.3]},gl:{antialias:!s.postFx,alpha:!0,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1},onCreated:({gl:a,scene:o})=>{a.setClearColor(new M("#080504"),0),o.fog=new Tt(new M("#0a0705").convertSRGBToLinear(),.052)},children:[e.jsx(Zt,{}),e.jsx(As,{}),e.jsx(_s,{}),e.jsx(Cs,{}),e.jsx(Es,{onReady:t}),s.postFx&&e.jsx(Jt,{})]})}const K=t=>{const s=i.useCallback(r=>{Ie(t,r)},[t]);return i.useEffect(()=>()=>Ie(t,null),[t]),s};function ie({lines:t,as:s="span",className:r,reveal:n=!0,delay:a}){return i.createElement(s,{className:["split",r].filter(Boolean).join(" "),...n?{"data-reveal":"lines","data-reveal-delay":a}:{}},t.map((o,l)=>i.createElement("span",{className:"split__line",key:l},i.createElement("span",{className:"split__inner"},o))))}function je({text:t,as:s="span",className:r,reveal:n=!0,stagger:a=.045,delay:o}){return i.createElement(s,{className:["split__line",r].filter(Boolean).join(" "),"aria-label":t,...n?{"data-reveal":"chars","data-reveal-stagger":a,"data-reveal-delay":o}:{}},Array.from(t).map((l,c)=>i.createElement("span",{className:"split__char",key:`${l}-${c}`,"aria-hidden":"true"},l)))}const G={name:"Ember & Oak",est:"2014",address:"14 Kiln Lane, Shoreditch, London E2 7DP",coords:"51.5266° N, 0.0755° W",phone:"+44 20 7946 0412",email:"hello@emberandoak.coffee"},Ps=[{id:"01",origin:"Yirgacheffe, Ethiopia",farm:"Chelbesa Washing Station",process:"Washed · Heirloom",altitude:"2,050 m",notes:["Bergamot","White peach","Jasmine"],metrics:[{label:"Acidity",value:.9},{label:"Body",value:.45},{label:"Sweetness",value:.72}]},{id:"02",origin:"Huila, Colombia",farm:"Finca El Mirador",process:"Honey · Caturra",altitude:"1,780 m",notes:["Red apple","Panela","Cocoa nib"],metrics:[{label:"Acidity",value:.62},{label:"Body",value:.78},{label:"Sweetness",value:.86}]},{id:"03",origin:"Karnataka, India",farm:"Ratnagiri Estate",process:"Anaerobic natural",altitude:"1,400 m",notes:["Dried fig","Clove","Dark treacle"],metrics:[{label:"Acidity",value:.34},{label:"Body",value:.94},{label:"Sweetness",value:.7}]}],q=[{at:0,name:"Charge",temp:92,time:"00:00",copy:"Green beans meet a hot drum. For ninety seconds nothing happens — the bean is only losing its shell of moisture."},{at:.22,name:"Drying",temp:148,time:"02:40",copy:"Grassy steam gives way to the smell of hay and bread. Water leaves; density stays."},{at:.42,name:"Maillard",temp:172,time:"05:10",copy:"Sugars and amino acids begin to trade places. This is where sweetness is decided, and it cannot be rushed."},{at:.58,name:"First crack",temp:196,time:"08:20",copy:"A sound like distant rain. Steam fractures the bean along its crease and the volume jumps by half."},{at:.76,name:"Development",temp:208,time:"10:05",copy:"Twenty-two percent of the roast happens here. Longer for the fig and treacle lots, shorter for the florals."},{at:.92,name:"Drop",temp:214,time:"11:40",copy:"Out onto the cooling tray before second crack takes the sugar. Ninety seconds of air and it is finished."}],_e=[{n:"01",title:"Rinse & warm",body:"Paper rinsed, brewer warmed, scale zeroed. A cold cone steals four degrees from the extraction."},{n:"02",title:"Bloom",body:"Twice the coffee weight in water at 94°C. Forty-five seconds while the trapped carbon dioxide leaves."},{n:"03",title:"Pour in spirals",body:"Three pulses, centre outward, never onto the wall. The bed should stay flat and the drawdown even."},{n:"04",title:"Rest, then taste",body:"Below 60°C the sweetness arrives. We taste every batch at three temperatures before it reaches the counter."}],Bs=[{label:"Dose",value:"18 g"},{label:"Water",value:"300 g"},{label:"Temperature",value:"94 °C"},{label:"Total time",value:"2:45"}],Os=[{n:"01",name:"Ember Espresso",detail:"Double · 40 ml · treacle & cocoa",price:"£3.10"},{n:"02",name:"Oak Flat White",detail:"6 oz · Huila honey lot",price:"£3.80"},{n:"03",name:"Kiln Cortado",detail:"4 oz · caramel, short",price:"£3.40"},{n:"04",name:"Single-Origin Filter",detail:"V60 · rotating lot",price:"£4.50"},{n:"05",name:"Cold Ember",detail:"18 h slow extraction · on tap",price:"£4.20"},{n:"06",name:"Cardamom Bun",detail:"Baked at 05:30, gone by noon",price:"£3.90"}],Is=[{n:"01",title:"The 5 a.m. drum",body:"Two roasters, one probe, and eleven minutes that decide the whole day.",art:"art--a"},{n:"02",title:"Cupping table",body:"Sixteen bowls, one spoon, no labels. The lot that wins gets the counter.",art:"art--b"},{n:"03",title:"Crema, close",body:"Tiger-striped and settling. If it breaks before you sit down, we pull it again.",art:"art--c"},{n:"04",title:"Kiln Lane, 07:02",body:"The first queue forms before the shutter is fully up. It always has.",art:"art--d"},{n:"05",title:"Bags, warm",body:"Rested four days, ground to order, never more than a fortnight old.",art:"art--e"}],Fs=[{day:"Mon — Thu",time:"07:00 — 18:00"},{day:"Friday",time:"07:00 — 20:00"},{day:"Saturday",time:"08:00 — 18:00"},{day:"Sunday",time:"08:00 — 16:00"}],Xe=["Single origin","Roasted on Kiln Lane","Rested four days","Ground to order","No bitterness"];function Ws({start:t}){const s=K("hero"),r=i.useRef(null),n=i.useRef(!1);return i.useEffect(()=>{if(!t||n.current||!r.current||(n.current=!0,D()))return;const a=g.context(o=>{const l=o.selector;g.timeline({defaults:{ease:"expo.out"}}).from(l(".hero__eyebrow"),{autoAlpha:0,y:18,duration:1}).from(l(".hero__title .split__char"),{yPercent:118,autoAlpha:0,duration:1.5,stagger:.045},"-=0.7").from(l(".hero__sub"),{autoAlpha:0,y:24,duration:1.2},"-=1.05").from(l(".hero__foot > *"),{autoAlpha:0,y:22,duration:1.1,stagger:.09},"-=0.95")},r);return()=>a.revert()},[t]),e.jsx("section",{className:"hero shell",id:"hero",ref:s,"aria-label":"Ember and Oak",children:e.jsxs("div",{ref:r,style:{display:"contents"},children:[e.jsxs("div",{className:"hero__type",children:[e.jsx("p",{className:"hero__eyebrow",children:e.jsxs("span",{className:"label",children:["Micro-roastery · Est. ",G.est," · Shoreditch"]})}),e.jsxs("h1",{className:"hero__title",children:[e.jsx("span",{className:"row",children:e.jsx(je,{text:"EMBER",reveal:!1})}),e.jsxs("span",{className:"row row--split",children:[e.jsx(je,{text:"&",reveal:!1,as:"em"}),e.jsx(je,{text:"OAK",reveal:!1})]})]}),e.jsx("p",{className:"hero__sub",children:"Eleven minutes on the drum, four days of rest, then ninety seconds of your undivided attention."})]}),e.jsxs("div",{className:"hero__foot",children:[e.jsxs("div",{className:"hero__meta",children:[e.jsx("span",{children:G.coords}),e.jsxs("span",{children:["Today ",e.jsx("strong",{children:"07:00 — 18:00"})]})]}),e.jsxs("button",{type:"button",className:"hint","data-cursor":"Scroll",onClick:()=>X(oe("origin")),"aria-label":"Scroll to the origin section",children:[e.jsx("span",{className:"label",children:"Scroll to begin"}),e.jsx("span",{className:"hint__line","aria-hidden":"true"})]}),e.jsx(Te,{variant:"outline","data-cursor":"Menu",onClick:()=>X(oe("menu")),children:"See the menu"})]})]})})}const Gs="top 86%",ee=(t=[])=>{const s=i.useRef(null);return i.useEffect(()=>{const r=s.current;if(!r)return;const n=D(),a=g.context(()=>{Array.from(r.querySelectorAll("[data-reveal]")).forEach(l=>{const c=l.dataset.reveal||"fade",d=Number(l.dataset.revealDelay??0),m=Number(l.dataset.revealStagger??.055);if(n){c==="meter"&&g.set(l,{scaleX:Number(l.dataset.v??1)});return}const f={trigger:l,start:Gs,once:!0};switch(c){case"lines":{const p=l.querySelectorAll(".split__inner");g.from(p.length?p:l,{yPercent:116,rotate:1.4,duration:1.15,ease:"expo.out",stagger:.075,delay:d,scrollTrigger:f});break}case"chars":{const p=l.querySelectorAll(".split__char");g.from(p.length?p:l,{yPercent:108,opacity:0,duration:.9,ease:"expo.out",stagger:m,delay:d,scrollTrigger:f});break}case"mask":{g.from(l,{clipPath:"inset(0% 0% 100% 0%)",duration:1.3,ease:"expo.out",delay:d,scrollTrigger:f});break}case"scale":{g.from(l,{scale:.94,opacity:0,duration:1.25,ease:"expo.out",delay:d,scrollTrigger:f});break}case"meter":{const p=Number(l.dataset.v??1);g.fromTo(l,{scaleX:0},{scaleX:p,duration:1.5,ease:"expo.out",delay:d,scrollTrigger:{trigger:l,start:"top 92%",once:!0}});break}case"rule":{g.from(l,{scaleX:0,transformOrigin:"left center",duration:1.4,ease:"expo.inOut",delay:d,scrollTrigger:f});break}default:g.from(l,{y:34,opacity:0,duration:1.15,ease:"expo.out",delay:d,scrollTrigger:f})}})},r);return()=>a.revert()},t),s};function Ds(){const t=K("origin"),s=ee(),r=i.useCallback(n=>{const a=n.currentTarget,o=a.getBoundingClientRect();a.style.setProperty("--mx",`${(n.clientX-o.left)/o.width*100}%`),a.style.setProperty("--my",`${(n.clientY-o.top)/o.height*100}%`)},[]);return e.jsx("section",{className:"section origin",id:"origin",ref:n=>{t(n),s.current=n},"aria-labelledby":"origin-title",children:e.jsxs("div",{className:"shell origin__grid",children:[e.jsxs("div",{className:"origin__sticky",children:[e.jsx("div",{className:"section__head",children:e.jsx("span",{className:"label",children:"01 — Origin"})}),e.jsx("h2",{className:"origin__title",id:"origin-title",children:e.jsx(ie,{lines:["Three farms.",e.jsxs(e.Fragment,{children:["One ",e.jsx("em",{children:"obsession"}),"."]})]})}),e.jsx("p",{className:"lead","data-reveal":"fade","data-reveal-delay":.15,children:"We buy small — sixty to two hundred kilos at a time — from producers we can call by name. Everything we pour is traceable to a single harvest, a single washing station, and a price we are happy to print on the bag."}),e.jsx("p",{className:"prose","data-reveal":"fade","data-reveal-delay":.25,children:"Lots rotate as they peak. When one is gone it is gone, and something else takes the grinder."})]}),e.jsx("ul",{className:"origin__lots",children:Ps.map((n,a)=>e.jsxs("li",{className:"lot","data-reveal":"scale","data-reveal-delay":a*.06,onPointerMove:r,children:[e.jsx("span",{className:"lot__index",children:n.id}),e.jsxs("div",{className:"lot__body",children:[e.jsxs("h3",{className:"lot__name",children:[n.origin,e.jsxs("small",{children:[n.farm," · ",n.process," · ",n.altitude]})]}),e.jsx("ul",{className:"lot__notes",children:n.notes.map(o=>e.jsx("li",{children:o},o))}),e.jsx("div",{className:"lot__meter",children:n.metrics.map(o=>e.jsxs("div",{className:"lot__meter-row",children:[e.jsx("span",{children:o.label}),e.jsx("span",{className:"lot__meter-track",children:e.jsx("i",{"data-reveal":"meter","data-v":o.value})}),e.jsx("span",{children:Math.round(o.value*100)})]},o.label))})]})]},n.id))})]})})}const Qe="M 8 232 C 96 226, 138 196, 196 150 S 300 78, 384 54 S 520 34, 592 30";function Vs(){const t=K("roast"),s=ee(),r=i.useRef(null),n=i.useRef(null),a=i.useRef(0),[o,l]=i.useState(q[0].temp),[c,d]=i.useState(0);i.useEffect(()=>{const f=r.current;f&&(a.current=f.getTotalLength(),f.style.strokeDasharray=`${a.current}`,f.style.strokeDashoffset=`${a.current}`)},[]),xe(()=>{const f=A(x.tl,ve[0],ve[1]);let p=0;for(let _=0;_<q.length;_++)f>=q[_].at&&(p=_);const h=q[p],v=q[p+1]??h,w=v.at===h.at?1:(f-h.at)/(v.at-h.at),j=Math.round(B(h.temp,v.temp,Math.min(1,Math.max(0,w))));j!==o&&l(j),p!==c&&d(p);const R=r.current,y=a.current;if(!(!R||!y)&&(R.style.strokeDashoffset=`${y*(1-f)}`,n.current)){const _=R.getPointAtLength(y*f);n.current.setAttribute("cx",`${_.x}`),n.current.setAttribute("cy",`${_.y}`),n.current.style.opacity=f>.004&&f<.998?"1":"0"}});const m=q[c];return e.jsx("section",{className:"roast",id:"roast",ref:f=>{t(f),s.current=f},"aria-labelledby":"roast-title",children:e.jsx("div",{className:"roast__pin",children:e.jsxs("div",{className:"shell roast__stack",children:[e.jsxs("div",{className:"roast__panel scrim",children:[e.jsxs("div",{className:"roast__readout",children:[e.jsx("div",{className:"section__head",children:e.jsx("span",{className:"label",children:"02 — Roast"})}),e.jsx("h2",{className:"panel-title",id:"roast-title",children:e.jsx(ie,{lines:["Eleven minutes",e.jsxs(e.Fragment,{children:["of ",e.jsx("em",{children:"judgement"})]})]})}),e.jsxs("div",{className:"roast__temp","aria-hidden":"true",children:[o,e.jsx("sup",{children:"°C"})]}),e.jsxs("p",{className:"roast__stage",children:[e.jsx("span",{className:"sr-only",children:"Current phase: "}),m.time," · ",m.name]}),e.jsx("p",{className:"roast__desc","aria-live":"polite",children:m.copy})]}),e.jsxs("div",{className:"roast__curve","data-reveal":"fade",children:[e.jsxs("svg",{viewBox:"0 0 600 260",role:"img","aria-label":"Roast temperature curve",children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"emberStroke",x1:"0",y1:"1",x2:"1",y2:"0",children:[e.jsx("stop",{offset:"0%",stopColor:"#b7551f"}),e.jsx("stop",{offset:"55%",stopColor:"#e0803c"}),e.jsx("stop",{offset:"100%",stopColor:"#f6d9a8"})]})}),[0,1,2,3].map(f=>e.jsx("line",{x1:"8",x2:"592",y1:30+f*67,y2:30+f*67,stroke:"currentColor",strokeWidth:"1",opacity:"0.09"},f)),e.jsx("path",{className:"roast__curve-path",d:Qe}),e.jsx("path",{className:"roast__curve-live",ref:r,d:Qe}),e.jsx("circle",{className:"roast__curve-head",ref:n,r:"5",cx:"8",cy:"232",opacity:"0"})]}),e.jsxs("div",{className:"roast__ticks","aria-hidden":"true",children:[e.jsx("span",{children:"00:00"}),e.jsx("span",{children:"04:00"}),e.jsx("span",{children:"08:00"}),e.jsx("span",{children:"12:00"})]}),e.jsx("div",{className:"roast__phases",children:q.map((f,p)=>e.jsxs("div",{className:"roast__phase","data-on":p===c,children:[e.jsx("i",{"aria-hidden":"true"}),e.jsx("span",{children:f.name}),e.jsxs("span",{children:[f.time," · ",f.temp,"°C"]})]},f.name))})]})]}),e.jsx("div",{"aria-hidden":"true"})]})})})}function Hs(){const t=K("brew"),s=ee(),[r,n]=i.useState(0);return xe(()=>{const a=A(x.tl,He[0],He[1]),o=Math.min(_e.length-1,Math.floor(a*_e.length));o!==r&&n(o)}),e.jsx("section",{className:"brew",id:"brew",ref:a=>{t(a),s.current=a},"aria-labelledby":"brew-title",children:e.jsx("div",{className:"brew__pin",children:e.jsxs("div",{className:"shell brew__inner",children:[e.jsxs("div",{children:[e.jsx("div",{className:"section__head",children:e.jsx("span",{className:"label",children:"03 — Brew"})}),e.jsx("h2",{className:"panel-title",id:"brew-title",style:{marginBottom:"1.6rem"},children:e.jsx(ie,{lines:["The pour is",e.jsxs(e.Fragment,{children:["a ",e.jsx("em",{children:"ritual"})]})]})}),e.jsx("ol",{className:"brew__steps",children:_e.map((a,o)=>e.jsxs("li",{className:"brew__step","data-on":o===r,children:[e.jsx("span",{className:"brew__step-n",children:a.n}),e.jsxs("div",{children:[e.jsx("h3",{className:"brew__step-title",children:a.title}),e.jsx("p",{className:"brew__step-body",children:a.body})]})]},a.n))})]}),e.jsxs("div",{className:"brew__aside",children:[e.jsx("dl",{className:"brew__spec","data-reveal":"scale",children:Bs.map(a=>e.jsxs("div",{children:[e.jsx("dt",{children:a.label}),e.jsx("dd",{children:a.value})]},a.label))}),e.jsx("p",{className:"prose","data-reveal":"fade","data-reveal-delay":.1,children:"Every recipe on the bar is written on the bag. Take it home, weigh it out, and if it does not taste like it did here, come back and we will fix it with you."})]})]})})})}function qs(){const t=K("menu"),s=ee();return e.jsx("section",{className:"section menu scrim",id:"menu",ref:r=>{t(r),s.current=r},"aria-labelledby":"menu-title",children:e.jsxs("div",{className:"shell",children:[e.jsx("div",{className:"section__head",children:e.jsx("span",{className:"label",children:"04 — Counter"})}),e.jsx("h2",{className:"panel-title",id:"menu-title",style:{marginBottom:"2.5rem"},children:e.jsx(ie,{lines:[e.jsxs(e.Fragment,{children:["Everything ",e.jsx("em",{children:"on the bar"})]})]})}),e.jsx("ul",{className:"menu__list",children:Os.map((r,n)=>e.jsxs("li",{className:"menu__row","data-cursor":"Taste","data-reveal":"fade","data-reveal-delay":n*.04,children:[e.jsx("span",{className:"menu__n",children:r.n}),e.jsxs("span",{className:"menu__name",children:[r.name,e.jsx("small",{children:r.detail})]}),e.jsx("span",{className:"menu__price",children:r.price})]},r.n))}),e.jsxs("div",{className:"menu__foot",children:[e.jsx("p",{children:"Oat, whole and Jersey milk at no extra charge. Beans by the bag, ground to your brewer."}),e.jsx(Te,{variant:"solid","data-cursor":"Visit",onClick:()=>X(oe("visit")),children:"Find us"})]})]})})}function Ze({items:t,reverse:s=!1,duration:r=34,copies:n=2}){return e.jsxs("div",{className:"marquee","data-reverse":s,style:{"--marquee-duration":`${r}s`},children:[Array.from({length:n},(a,o)=>e.jsx("div",{className:"marquee__track","aria-hidden":"true",children:t.map((l,c)=>e.jsxs("span",{className:"marquee__item",children:[l,e.jsx("i",{className:"marquee__sep"})]},`${l}-${c}`))},o)),e.jsx("span",{className:"sr-only",children:t.join(" · ")})]})}function Us(){const t=K("ritual"),s=ee(),r=i.useRef(null),n=i.useRef(null);return i.useEffect(()=>{const a=r.current,o=n.current;if(!a||!o||D())return;const l=g.context(()=>{const c=()=>Math.max(0,o.scrollWidth-window.innerWidth+48),d=g.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:a,start:"top top",end:"bottom bottom",scrub:.7,invalidateOnRefresh:!0}});d.to(o,{x:()=>-c()},0),d.fromTo(o.querySelectorAll(".plate__art"),{xPercent:-7},{xPercent:7},0),U.refresh()},a);return()=>l.revert()},[]),e.jsxs("section",{className:"ritual",id:"ritual",ref:a=>{t(a),s.current=a},"aria-label":"The ritual",children:[e.jsx("div",{className:"ritual__marquee",children:e.jsx(Ze,{items:Xe,duration:38})}),e.jsxs("figure",{className:"quote shell",children:[e.jsx("blockquote",{"data-reveal":"lines",children:e.jsxs("span",{className:"split",children:[e.jsx("span",{className:"split__line",children:e.jsx("span",{className:"split__inner",children:"Coffee is agriculture, not alchemy."})}),e.jsx("span",{className:"split__line",children:e.jsx("span",{className:"split__inner",children:e.jsx("em",{children:"Our job is to get out of its way."})})})]})}),e.jsx("figcaption",{"data-reveal":"fade",children:"Marta Oyelaran — Head Roaster"})]}),e.jsx("div",{className:"ritual__track-wrap",ref:r,children:e.jsx("div",{className:"ritual__pin",children:e.jsx("div",{className:"ritual__track",ref:n,children:Is.map(a=>e.jsxs("figure",{className:"plate","data-cursor":"Look",children:[e.jsx("div",{className:"plate__art",children:e.jsx("div",{className:`art ${a.art}`})}),e.jsx("span",{className:"plate__no",children:a.n}),e.jsxs("figcaption",{className:"plate__cap",children:[e.jsx("h3",{children:a.title}),e.jsx("p",{children:a.body})]})]},a.n))})})}),e.jsx("div",{className:"ritual__marquee",children:e.jsx(Ze,{items:[...Xe].reverse(),duration:46,reverse:!0})})]})}function zs(){const t=K("visit"),s=ee(),[r,n]=i.useState(""),[a,o]=i.useState(""),l=c=>{c.preventDefault();const d=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(r);o(d?"Thank you — we send one note a month.":"That address looks incomplete."),d&&n("")};return e.jsx("footer",{className:"section visit scrim",id:"visit",ref:c=>{t(c),s.current=c},"aria-labelledby":"visit-title",children:e.jsxs("div",{className:"shell",children:[e.jsxs("div",{className:"visit__grid",children:[e.jsxs("div",{children:[e.jsx("div",{className:"section__head",children:e.jsx("span",{className:"label",children:"05 — Visit"})}),e.jsx("h2",{className:"visit__title",id:"visit-title",children:e.jsx(ie,{lines:["Kiln Lane,",e.jsxs(e.Fragment,{children:["from ",e.jsx("em",{children:"seven"})]})]})}),e.jsxs("p",{className:"lead","data-reveal":"fade","data-reveal-delay":.1,children:[G.address,". Two minutes from Hoxton overground, under the green awning. No laptops after eleven on weekends."]}),e.jsxs("form",{className:"subscribe",onSubmit:l,"data-reveal":"fade","data-reveal-delay":.2,children:[e.jsx("label",{className:"sr-only",htmlFor:"newsletter",children:"Email address"}),e.jsx("input",{id:"newsletter",type:"email",name:"email",placeholder:"Lot drops and pop-ups",autoComplete:"email",value:r,onChange:c=>n(c.target.value)}),e.jsx("button",{type:"submit","data-cursor":"Send",children:"Subscribe"})]}),e.jsx("p",{className:"subscribe__msg",role:"status",children:a})]}),e.jsxs("div",{className:"visit__cols","data-reveal":"fade","data-reveal-delay":.15,children:[e.jsxs("div",{className:"visit__col",children:[e.jsx("h4",{children:"Hours"}),e.jsx("ul",{children:Fs.map(c=>e.jsxs("li",{children:[e.jsx("span",{children:c.day}),e.jsx("span",{children:c.time})]},c.day))})]}),e.jsxs("div",{className:"visit__col",children:[e.jsx("h4",{children:"Contact"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx("a",{href:`tel:${G.phone.replace(/\s/g,"")}`,"data-cursor":"Call",children:G.phone})}),e.jsx("li",{children:e.jsx("a",{href:`mailto:${G.email}`,"data-cursor":"Email",children:G.email})}),e.jsx("li",{children:e.jsx("a",{href:"https://maps.google.com/?q=Kiln+Lane+Shoreditch+London",target:"_blank",rel:"noreferrer","data-cursor":"Map",children:"Directions"})})]})]}),e.jsxs("div",{className:"visit__col",children:[e.jsx("h4",{children:"Elsewhere"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx("a",{href:"https://instagram.com",target:"_blank",rel:"noreferrer",children:"Instagram"})}),e.jsx("li",{children:e.jsx("a",{href:"https://open.spotify.com",target:"_blank",rel:"noreferrer",children:"Bar playlist"})}),e.jsx("li",{children:e.jsx("a",{href:"#origin",children:"Wholesale"})})]})]})]})]}),e.jsx("p",{className:"wordmark","data-reveal":"mask","aria-hidden":"true",children:"Ember & Oak"}),e.jsxs("div",{className:"colophon",children:[e.jsxs("span",{children:["© ",new Date().getFullYear()," ",G.name," — ",G.coords]}),e.jsx("span",{children:"Roasted on site, six days a week"}),e.jsxs("span",{className:"colophon__vbuild",children:["Crafted by"," ",e.jsxs("a",{href:"https://github.com/vbuildlanka-oss",target:"_blank",rel:"noreferrer",children:["VBUILD",e.jsx("sup",{children:"™"})]})]})]})]})})}function $s(){const[t,s]=i.useState(!1),[r,n]=i.useState(!1);Gt(),i.useEffect(()=>{"scrollRestoration"in history&&(history.scrollRestoration="manual"),window.scrollTo(0,0),Fe(!0)},[]);const a=i.useCallback(()=>s(!0),[]),o=i.useCallback(()=>{Fe(!1),Wt(!0),n(!0),ne(),U.refresh()},[]);return e.jsxs(e.Fragment,{children:[e.jsx("a",{className:"skip-link",href:"#menu",children:"Skip to the menu"}),e.jsx("div",{className:"scene","data-ready":t,"aria-hidden":"true",children:e.jsx(Kt,{onFail:a,children:e.jsx(Ls,{onReady:a})})}),e.jsx("div",{className:"scene-veil","aria-hidden":"true"}),e.jsx(Ht,{}),e.jsx(Yt,{}),e.jsx(qt,{}),e.jsx(zt,{}),e.jsxs("main",{className:"main",id:"top",children:[e.jsx(Ws,{start:r}),e.jsx(Ds,{}),e.jsx(Vs,{}),e.jsx(Hs,{}),e.jsx(qs,{}),e.jsx(Us,{}),e.jsx(zs,{})]}),e.jsx(Ct,{ready:t,onDone:o})]})}const ot=document.getElementById("root");if(!ot)throw new Error("Missing #root");ct.createRoot(ot).render(e.jsx($s,{}));
