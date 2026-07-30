import{b as c,j as e,f as Ct}from"./react-DDkUvPM3.js";import{g as M,S as Z,L as At}from"./motion-Dv0wD4dN.js";import{V as S,M as Y,u as re,a as W,E as Lt,L as ie,B as It,K as Pt,C as Bt,b as $,c as Xe,N as Ot,d as Ft,T as Wt,e as Gt,f as Ht,g as Dt,R as Ze,D as wt,h as yt,i as bt,P as Vt,j as qt,k as A,l as Ne,F as Ae,m as he,n as De,S as pe,o as We,A as ke,p as H,q as Ve,r as zt,s as ne,t as $t,O as jt,v as Ut,w as Mt,x as Kt,y as Yt,z as Xt,G as Zt,H as Qt}from"./three-C7T_VwH4.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function r(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(n){if(n.ep)return;n.ep=!0;const a=r(n);fetch(n.href,a)}})();M.registerPlugin(Z);M.defaults({ease:"power3.out",duration:1});Z.config({ignoreMobileResize:!0});const Ge=t=>typeof window<"u"&&window.matchMedia(t).matches,U=()=>Ge("(prefers-reduced-motion: reduce)"),St=()=>Ge("(hover: none)")||Ge("(pointer: coarse)");let ge=null;const Jt=()=>{if(ge)return ge;if(typeof window>"u")return"mid";const t=navigator.hardwareConcurrency??4,s=navigator.deviceMemory??4,r=window.innerWidth<760,o=window.devicePixelRatio||1;let n=0;return n+=t>=8?2:t>=4?1:0,n+=s>=8?2:s>=4?1:0,n+=r?0:1,n+=o>2.5?0:1,ge=n>=5?"high":n>=3?"mid":"low",ge},D=()=>{const t=Jt(),s=U();return{tier:t,reduced:s,dpr:t==="high"?[1,1.75]:t==="mid"?[1,1.4]:[.85,1],postFx:t!=="low"&&!s,shadows:t!=="low",ao:t==="high"||t==="mid",shadowMapSize:t==="high"?2048:1024,beanCount:t==="high"?220:t==="mid"?130:60,steamCount:t==="high"?1900:t==="mid"?1e3:340,emberCount:t==="high"?420:t==="mid"?240:110,dustCount:t==="high"?700:t==="mid"?380:160,cupSegments:t==="low"?40:t==="mid"?80:128}},Qe=["Sourcing","Roasting","Grinding","Ember & Oak"];function es({ready:t,onDone:s}){const r=c.useRef(null),o=c.useRef(null),n=c.useRef(null),a=c.useRef(null),[i,l]=c.useState(0),[d,h]=c.useState(!1),m=c.useRef(!1);return c.useEffect(()=>{const f={v:0},p=M.to(f,{v:.92,duration:U()?.2:2.1,ease:"power2.out",onUpdate:()=>{o.current&&(o.current.style.transform=`scaleX(${f.v})`)}});let v=0;const g=window.setInterval(()=>{v=Math.min(v+1,Qe.length-1),n.current&&M.timeline().to(n.current,{yPercent:-110,duration:.5,ease:"expo.inOut"}).add(()=>l(v)).fromTo(n.current,{yPercent:110},{yPercent:0,duration:.6,ease:"expo.out"})},620);return()=>{p.kill(),window.clearInterval(g)}},[]),c.useEffect(()=>{if(!t||m.current)return;m.current=!0;const f=U(),p={v:.92},v=M.timeline({onComplete:()=>{h(!0),s()}});return v.to(p,{v:1,duration:f?.1:.5,ease:"power2.inOut",onUpdate:()=>{o.current&&(o.current.style.transform=`scaleX(${p.v})`)}}),f?v.set([r.current,a.current],{autoAlpha:0}):v.to(".loader__inner",{yPercent:-8,autoAlpha:0,duration:.7,ease:"expo.inOut"},"+=0.15").to(r.current,{yPercent:-100,duration:1.15,ease:"expo.inOut"},"-=0.35").fromTo(a.current,{yPercent:0},{yPercent:-100,duration:1.25,ease:"expo.inOut"},"<0.08"),()=>{v.kill()}},[t,s]),d?null:e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"loader",ref:r,"data-done":t,role:"status","aria-live":"polite",children:e.jsxs("div",{className:"loader__inner",children:[e.jsx("h1",{className:"loader__word",children:e.jsx("span",{ref:n,children:Qe[i]})}),e.jsxs("div",{className:"loader__meta",children:[e.jsx("span",{children:"Ember & Oak"}),e.jsx("span",{children:"Shoreditch"})]}),e.jsx("div",{className:"loader__bar",children:e.jsx("i",{ref:o})})]})}),e.jsx("div",{className:"loader__curtain",ref:a,"aria-hidden":"true"})]})}const ts=(t=.32)=>{const s=c.useRef(null);return c.useEffect(()=>{const r=s.current;if(!r||St()||U())return;const o=M.quickTo(r,"x",{duration:.7,ease:"power3.out"}),n=M.quickTo(r,"y",{duration:.7,ease:"power3.out"}),a=l=>{const d=r.getBoundingClientRect();o((l.clientX-(d.left+d.width/2))*t),n((l.clientY-(d.top+d.height/2))*t)},i=()=>{o(0),n(0)};return r.addEventListener("pointermove",a),r.addEventListener("pointerleave",i),()=>{r.removeEventListener("pointermove",a),r.removeEventListener("pointerleave",i),M.killTweensOf(r)}},[t]),s},ss=()=>e.jsx("svg",{className:"btn__arrow",viewBox:"0 0 16 16",fill:"none","aria-hidden":"true",children:e.jsx("path",{d:"M2 8h11M9 4l4 4-4 4",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round",strokeLinejoin:"round"})});function qe({children:t,variant:s="outline",arrow:r=!0,strength:o=.28,className:n,...a}){const i=ts(o),l=["btn",s==="solid"&&"btn--solid",s==="ghost"&&"btn--ghost",n].filter(Boolean).join(" ");return e.jsxs("button",{ref:i,className:l,type:"button",...a,children:[e.jsx("span",{children:t}),r&&e.jsx(ss,{})]})}const Te=(t,s=!0)=>{const r=c.useRef(t);r.current=t,c.useEffect(()=>{if(!s)return;const o=(n,a)=>r.current(n,a);return M.ticker.add(o),()=>M.ticker.remove(o)},[s])},I=(t,s=0,r=1)=>Math.min(r,Math.max(s,t)),G=(t,s,r)=>t+(s-t)*r,R=(t,s,r,o)=>G(t,s,1-Math.exp(-r*o)),rs=(t,s,r,o=0,n=1)=>r-s===0?o:o+(t-s)/(r-s)*(n-o),O=(t,s,r,o=0,n=1)=>I(rs(t,s,r,o,n),Math.min(o,n),Math.max(o,n)),ns=t=>{const s=I(t);return s*s*(3-2*s)},os=t=>{const s=Math.sin(t*127.1+311.7)*43758.5453;return s-Math.floor(s)},P=(t,s,r)=>s+os(t)*(r-s),je=["hero","origin","roast","brew","menu","ritual","visit"],Je=je.reduce((t,s,r)=>(t[s]=r,t),{}),_={y:0,progress:0,tl:0,velocity:0,direction:1,act:"hero",actT:0,pointer:{x:0,y:0},vw:1280,vh:800,maxScroll:1,live:!1},Me=new Map,Se=new Map,et=(t,s)=>{s?Me.set(t,s):Me.delete(t),de()},de=()=>{if(typeof window>"u")return;const t=document.documentElement;_.vw=window.innerWidth,_.vh=window.innerHeight,_.maxScroll=Math.max(1,t.scrollHeight-window.innerHeight);const s=je.filter(o=>Me.has(o)),r=s.map(o=>Me.get(o).getBoundingClientRect().top+window.scrollY);s.forEach((o,n)=>{const a=n===0?0:r[n],i=n===s.length-1?_.maxScroll:r[n+1];Se.set(o,{start:a,end:Math.max(i,a+1)})})},as=1e-4,Le=t=>{const s=_.y;_.y=t,_.progress=I(t/_.maxScroll),Math.abs(t-s)>as&&(_.direction=t>s?1:-1);const r=je.filter(i=>Se.has(i));if(!r.length){_.tl=_.progress*(je.length-1);return}let o=0,n=r[0],a=0;for(let i=0;i<r.length;i++){const l=r[i],d=Se.get(l);if(t>=d.start&&t<d.end){a=I((t-d.start)/(d.end-d.start)),o=Je[l]+a,n=l;break}i===r.length-1&&(a=1,o=Je[l]+1,n=l)}_.tl=o,_.act=n,_.actT=a},is=t=>{_.velocity=I(t/45,-1,1)},ls=(t,s)=>{_.pointer.x=t,_.pointer.y=s},cs=t=>{_.live=t},me=t=>Se.get(t)?.start??0;let Q=null;const se=(t,s=0)=>{if(Q){Q.scrollTo(t,{offset:s,duration:1.6,lock:!1});return}const r=typeof t=="string"?document.querySelector(t):null,o=typeof t=="number"?t:(r?.getBoundingClientRect().top??0)+window.scrollY;window.scrollTo({top:o+s,behavior:"smooth"})},tt=t=>{document.body.dataset.locked=String(t),Q&&(t?Q.stop():Q.start())},us=()=>{const t=c.useRef(!1);c.useEffect(()=>{if(t.current)return;t.current=!0;const s=U(),r=new At({autoRaf:!1,lerp:s?1:.085,wheelMultiplier:1,touchMultiplier:1.6,syncTouch:!1,gestureOrientation:"vertical",anchors:!1});Q=r,document.documentElement.classList.add("lenis"),r.on("scroll",l=>{Le(l.scroll),is(l.velocity),Z.update()});const o=l=>r.raf(l*1e3);M.ticker.add(o),M.ticker.lagSmoothing(0);const n=l=>{ls(l.clientX/window.innerWidth*2-1,-(l.clientY/window.innerHeight*2-1))};let a=0;const i=()=>{window.clearTimeout(a),a=window.setTimeout(()=>{r.resize(),de(),Le(r.scroll),Z.refresh()},140)};return window.addEventListener("pointermove",n,{passive:!0}),window.addEventListener("resize",i),document.fonts?.ready.then(()=>{de(),Z.refresh()}),de(),Le(r.scroll),()=>{window.removeEventListener("pointermove",n),window.removeEventListener("resize",i),window.clearTimeout(a),M.ticker.remove(o),r.destroy(),Q=null,document.documentElement.classList.remove("lenis"),t.current=!1}},[])},ds=[{id:"origin",label:"Origin"},{id:"roast",label:"Roast"},{id:"brew",label:"Brew"},{id:"menu",label:"Menu"},{id:"visit",label:"Visit"}],ms=()=>e.jsx("span",{className:"nav__mark","aria-hidden":"true",children:e.jsxs("svg",{viewBox:"0 0 32 32",fill:"none",children:[e.jsx("circle",{cx:"16",cy:"16",r:"14.2",stroke:"currentColor",strokeWidth:"1",opacity:".45"}),e.jsx("circle",{cx:"16",cy:"16",r:"6.4",stroke:"currentColor",strokeWidth:"1.4"}),e.jsx("path",{d:"M16 1.8v6M16 24.2v6M1.8 16h6M24.2 16h6",stroke:"currentColor",strokeWidth:"1"})]})});function hs(){const[t,s]=c.useState(!1),[r,o]=c.useState(!1),[n,a]=c.useState("hero"),i=c.useRef(0);return Te(()=>{const l=_.y,d=l>80;d!==t&&s(d);const h=l>i.current+4,m=l<i.current-4;h&&l>520&&!r&&o(!0),(m||l<200)&&r&&o(!1),(h||m)&&(i.current=l),_.act!==n&&a(_.act)}),e.jsxs("header",{className:"nav","data-stuck":t,"data-hidden":r,children:[e.jsxs("a",{className:"nav__brand",href:"#top","data-cursor":"Top",onClick:l=>{l.preventDefault(),se(0)},children:[e.jsx(ms,{}),"Ember & Oak"]}),e.jsx("nav",{className:"nav__links","aria-label":"Sections",children:ds.map(l=>e.jsx("a",{className:"nav__link",href:`#${l.id}`,"data-active":n===l.id,onClick:d=>{d.preventDefault(),se(me(l.id))},children:l.label},l.id))}),e.jsx(qe,{className:"nav__cta",variant:"solid","data-cursor":"Reserve",onClick:()=>se(me("visit")),children:"Book a table"})]})}function ps(){const t=c.useRef(null),s=c.useRef(null),[r,o]=c.useState(""),[n,a]=c.useState(!1),[i,l]=c.useState(!1);return c.useEffect(()=>{l(!St())},[]),c.useEffect(()=>{if(!i)return;const d=t.current,h=s.current;if(!d||!h)return;const m=U()?0:.14,f=M.quickTo(d,"x",{duration:m,ease:"power2.out"}),p=M.quickTo(d,"y",{duration:m,ease:"power2.out"}),v=M.quickTo(h,"x",{duration:m*4.5,ease:"power2.out"}),g=M.quickTo(h,"y",{duration:m*4.5,ease:"power2.out"});let j={x:0,y:0};const b=T=>{f(T.clientX),p(T.clientY),v((T.clientX-j.x)*.06),g((T.clientY-j.y)*.06),j={x:T.clientX,y:T.clientY}},x=T=>{const B=T.target?.closest("[data-cursor]");B?(a(!0),o(B.dataset.cursor||"")):(a(!1),o(""))},w=()=>M.to(h,{scale:.78,duration:.25,ease:"power2.out"}),k=()=>M.to(h,{scale:1,duration:.4,ease:"power2.out"}),L=()=>M.to(d,{autoAlpha:0,duration:.3}),E=()=>M.to(d,{autoAlpha:1,duration:.3});return window.addEventListener("pointermove",b,{passive:!0}),window.addEventListener("pointerover",x,{passive:!0}),window.addEventListener("pointerdown",w),window.addEventListener("pointerup",k),document.addEventListener("pointerleave",L),document.addEventListener("pointerenter",E),()=>{window.removeEventListener("pointermove",b),window.removeEventListener("pointerover",x),window.removeEventListener("pointerdown",w),window.removeEventListener("pointerup",k),document.removeEventListener("pointerleave",L),document.removeEventListener("pointerenter",E),M.killTweensOf([d,h])}},[i]),i?e.jsxs("div",{className:"cursor",ref:t,"data-hot":n,"aria-hidden":"true",children:[e.jsx("div",{className:"cursor__ring",ref:s}),e.jsx("div",{className:"cursor__dot"}),e.jsx("span",{className:"cursor__label",children:r})]}):null}const fs=(t=180)=>{const s=document.createElement("canvas");s.width=t,s.height=t;const r=s.getContext("2d");if(!r)return"";const o=r.createImageData(t,t);for(let n=0;n<o.data.length;n+=4){const a=128+(Math.random()-.5)*255;o.data[n]=a,o.data[n+1]=a,o.data[n+2]=a,o.data[n+3]=255}return r.putImageData(o,0,0),s.toDataURL("image/png")};function vs(){const[t,s]=c.useState("");return c.useEffect(()=>{const r="requestIdleCallback"in window,o=()=>s(fs()),n=r?window.requestIdleCallback(o):window.setTimeout(o,240);return()=>{r?window.cancelIdleCallback(n):window.clearTimeout(n)}},[]),e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"vignette","aria-hidden":"true"}),e.jsx("div",{className:"grain","aria-hidden":"true",style:t?{backgroundImage:`url(${t})`}:void 0})]})}const gs={hero:"Arrival",origin:"Origin",roast:"Roast",brew:"Brew",menu:"Menu",ritual:"Ritual",visit:"Visit"};function xs(){const t=c.useRef(null),[s,r]=c.useState("hero"),[o,n]=c.useState(!1);return Te(()=>{const a=_.progress;t.current&&(t.current.style.transform=`scaleY(${Math.max(.01,a)})`),_.act!==s&&r(_.act);const i=_.y>240;i!==o&&n(i)}),e.jsxs("div",{className:"rail","data-visible":o,"aria-hidden":"true",children:[e.jsx("div",{className:"rail__track",children:e.jsx("i",{className:"rail__fill",ref:t})}),e.jsx("span",{className:"rail__num",style:{writingMode:"vertical-rl"},children:gs[s]??""})]})}class ws extends c.Component{state={failed:!1};static getDerivedStateFromError(){return{failed:!0}}componentDidCatch(s,r){console.warn("[scene] falling back to the flat layout:",s.message,r.componentStack),this.props.onFail()}render(){return this.state.failed?null:this.props.children}}const xe=[{tl:0,pos:[0,1.34,6],look:[0,.47,0],fov:30},{tl:.55,pos:[1.05,1.5,5.7],look:[0,.5,0],fov:30,roll:-.01},{tl:1,pos:[1.8,2.7,7.8],look:[0,.48,0],fov:36,roll:-.018},{tl:1.55,pos:[0,3.5,9.8],look:[0,.28,0],fov:44},{tl:2.05,pos:[0,1.05,5.5],look:[0,.34,0],fov:34},{tl:2.5,pos:[-.95,.62,4.5],look:[0,.24,0],fov:30,roll:.014},{tl:2.95,pos:[.4,1.15,4.9],look:[0,.3,0],fov:32},{tl:3.16,pos:[0,2.85,5.9],look:[0,1,0],fov:34},{tl:3.66,pos:[0,1.72,4.7],look:[0,.58,0],fov:30},{tl:4.06,pos:[0,1.32,6.5],look:[0,.48,0],fov:36},{tl:4.6,pos:[.6,1.65,7.3],look:[0,.44,0],fov:38,roll:-.012},{tl:5.15,pos:[0,1.95,8.8],look:[0,.58,0],fov:44},{tl:5.9,pos:[0,1.4,6.5],look:[0,.58,0],fov:38},{tl:6.6,pos:[0,1.16,5.3],look:[0,.56,0],fov:32}],st=new S,rt=new S,nt=new S,ot=new S,le={pos:new S,look:new S,fov:35,roll:0},ys=t=>{let s=0;for(;s<xe.length-2&&t>=xe[s+1].tl;)s++;const r=xe[s],o=xe[s+1]??r,n=o.tl-r.tl||1,a=ns((t-r.tl)/n);return st.fromArray(r.pos),rt.fromArray(o.pos),nt.fromArray(r.look),ot.fromArray(o.look),le.pos.copy(st).lerp(rt,a),le.look.copy(nt).lerp(ot,a),le.fov=Y.lerp(r.fov,o.fov,a),le.roll=Y.lerp(r.roll??0,o.roll??0,a),le},q=(t,s,r,o,n)=>Math.min(O(t,s,r),1-O(t,o,n)),u={tl:0,tlRaw:0,vel:0,time:0,dt:.016,aspect:1.6,narrow:!1,px:0,py:0,cup:1,trio:0,subjectShift:0,fill:.86,crema:1,steam:1,pour:0,pourLen:0,kettle:0,pourX:0,pourZ:0,beans:0,heroBean:0,roast:0,embers:0,dust:.4,floor:1,glow:.6,subjectX:0,subjectY:0},_e=[2.02,2.92],at=[3.04,3.86],bs=(t,s,r)=>{const o=Math.min(s,.05);u.dt=o,u.time=t,u.aspect=r,u.narrow=_.vw<900,u.tlRaw=_.tl,u.tl=R(u.tl,_.tl,7.5,o),u.vel=R(u.vel,_.velocity,5,o);const n=u.narrow?.25:1;u.px=R(u.px,_.pointer.x*n,3.2,o),u.py=R(u.py,_.pointer.y*n,3.2,o);const a=u.tl,i=1-O(a,.7,.98),l=O(a,2.72,3.02);u.cup=Math.max(i,l),u.trio=q(a,3.85,4.18,4.82,5.12);const d=O(a,3.14,3.62,.05,.94);u.fill=a<2.2?.86:d,u.crema=a<2.2?1:O(a,3.3,3.8,.1,1),u.pour=q(a,3.04,3.15,3.5,3.62),u.pourLen=O(a,3.04,3.2),u.kettle=q(a,2.9,3.06,3.6,3.82);const h=.155*u.pour*(.55+.45*Math.sin(t*.5));u.pourX=Math.cos(t*2.3)*h,u.pourZ=Math.sin(t*2.3)*h,u.steam=u.cup*I(.18+u.fill*1.05)*(1-u.pour*.35),u.beans=Math.max(q(a,.32,.86,1.7,2),q(a,4.7,5.1,5.9,6.2)*.75),u.heroBean=q(a,1.7,2.06,2.86,3.08),u.roast=O(a,_e[0],_e[1]),u.embers=q(a,2.12,2.4,2.88,3.1),u.dust=.35+.45*q(a,4.3,5,6.1,6.5);const m=u.narrow?0:I(O(u.aspect,1.1,1.6,.4,1)),f=O(a,1.55,2.1),p=1-O(a,3.5,3.98);u.subjectShift=.46*f*p*m,u.subjectY=-1.55*q(a,3.86,4.22,4.86,5.18),u.glow=.45+.55*u.embers+.25*u.cup,u.floor=G(1,.35,O(a,4.6,5.4))},it=new S,we=new S;function js(){const t=re(n=>n.camera),s=re(n=>n.size),r=c.useRef(new S(0,.6,0)),o=c.useRef(null);return W((n,a)=>{bs(n.clock.elapsedTime,a,s.width/Math.max(1,s.height));const i=ys(u.tl),l=u.time,d=i.pos.z*Math.tan(Y.degToRad(i.fov)*.5)*Math.max(1,u.aspect);u.subjectX=u.subjectShift*d;const h=u.narrow?1.26:G(1.12,1,I(O(u.aspect,1.15,1.75)));it.set(i.pos.x+u.px*.28,i.pos.y-u.py*.2+Math.sin(l*.35)*.022,i.pos.z*h+Math.sin(l*.27)*.03),t.position.copy(it),we.copy(i.look),we.x+=u.px*.06,we.y+=u.py*.03,r.current.lerp(we,1-Math.exp(-6*u.dt)),t.lookAt(r.current),t.rotateZ(i.roll+u.px*.008);const m=i.fov+(u.narrow?6:0);Math.abs(t.fov-m)>.01&&(t.fov=R(t.fov,m,8,u.dt),t.updateProjectionMatrix()),o.current&&(o.current.intensity=G(1.25,2.1,I(u.glow)))}),e.jsxs(e.Fragment,{children:[e.jsx("ambientLight",{intensity:.22,color:"#c99a6a"}),e.jsx("directionalLight",{ref:o,position:[-3.4,4.2,2.8],intensity:1.5,color:"#ffd7ab"}),e.jsx("directionalLight",{position:[3.6,1.8,-3.4],intensity:.42,color:"#7d90ad"}),e.jsxs(Lt,{resolution:256,frames:1,children:[e.jsx(ie,{form:"circle",intensity:3.4,color:"#ffe2bd",scale:[13,13,1],position:[-7,7,6],target:[0,.6,0]}),e.jsx(ie,{form:"rect",intensity:5,color:"#fff2dd",scale:[.55,6,1],position:[3.4,1.8,2.8],target:[0,.7,0]}),e.jsx(ie,{form:"circle",intensity:1.35,color:"#7d93b8",scale:[15,15,1],position:[8,2,-7],target:[0,.6,0]}),e.jsx(ie,{form:"circle",intensity:1.9,color:"#ff9b4d",scale:[7,7,1],position:[1.5,-2.4,4],target:[0,.4,0]}),e.jsx(ie,{form:"circle",intensity:.9,color:"#3b2416",scale:[16,16,1],position:[0,-7,0],target:[0,0,0]})]})]})}function Ms(){const t=c.useMemo(()=>D(),[]),s=c.useMemo(()=>new It({intensity:.5,luminanceThreshold:.62,luminanceSmoothing:.22,mipmapBlur:!0,kernelSize:Pt.LARGE,radius:.76}),[]),r=c.useMemo(()=>new Bt({blendFunction:Xe.NORMAL,offset:new $(28e-5,42e-5),radialModulation:!0,modulationOffset:.45}),[]),o=c.useMemo(()=>{const i=new Ot({blendFunction:Xe.SOFT_LIGHT,premultiply:!0});return i.blendMode.opacity.value=.15,i},[]),n=c.useMemo(()=>new Ft({offset:.22,darkness:.72}),[]),a=c.useMemo(()=>new Wt({mode:Gt.AGX}),[]);return c.useEffect(()=>()=>{[s,r,o,n,a].forEach(i=>i.dispose())},[s,r,o,n,a]),W(()=>{const i=I(u.embers*.9+u.cup*.3+.22);s.intensity=R(s.intensity,.3+i*.62,3,u.dt)}),e.jsxs(Ht,{multisampling:0,enableNormalPass:!1,children:[t.ao?e.jsx(Dt,{aoRadius:.55,distanceFalloff:.85,intensity:2.6,aoSamples:t.tier==="high"?16:8,denoiseSamples:4,halfRes:!0,color:"#160c07"}):e.jsx(e.Fragment,{}),e.jsx("primitive",{object:s}),e.jsx("primitive",{object:r}),e.jsx("primitive",{object:o}),e.jsx("primitive",{object:n}),e.jsx("primitive",{object:a})]})}const ye=(t,s,r)=>{const o=Math.sin(t*127.1+s*311.7+r*74.7)*43758.5453123;return o-Math.floor(o)},lt=t=>t*t*(3-2*t),ct=(t,s,r)=>{const o=Math.floor(t),n=Math.floor(s),a=lt(t-o),i=lt(s-n),l=ye(o,n,r),d=ye(o+1,n,r),h=ye(o,n+1,r),m=ye(o+1,n+1,r);return(l*(1-a)+d*a)*(1-i)+(h*(1-a)+m*a)*i},Ss=({size:t,frequency:s,octaves:r,seed:o,bias:n=.5,contrast:a=1})=>{const i=new Float32Array(t*t);let l=1/0,d=-1/0;for(let m=0;m<t;m++)for(let f=0;f<t;f++){let p=0,v=.5,g=s;for(let j=0;j<r;j++){const b=f/t*g,x=m/t*g;p+=v*(ct(b,x,o+j)*.5+ct(b+g,x+g,o+j*7)*.5),v*=.5,g*=2}i[m*t+f]=p,p<l&&(l=p),p>d&&(d=p)}const h=d-l||1;for(let m=0;m<i.length;m++){const f=(i[m]-l)/h;i[m]=Math.min(1,Math.max(0,Math.pow(f,a)*(n*2)))}return i},ut=(t,s)=>(t.wrapS=Ze,t.wrapT=Ze,t.repeat.set(s,s),t.needsUpdate=!0,t),_s=(t,s,r)=>{const o=new Uint8Array(s*s*4),n=(i,l)=>t[(l+s)%s*s+(i+s)%s];for(let i=0;i<s;i++)for(let l=0;l<s;l++){const d=(n(l+1,i)-n(l-1,i))*r,h=(n(l,i+1)-n(l,i-1))*r,m=Math.sqrt(d*d+h*h+1),f=(i*s+l)*4;o[f]=(-d/m*.5+.5)*255,o[f+1]=(-h/m*.5+.5)*255,o[f+2]=1/m*.5*255+127,o[f+3]=255}const a=new wt(o,s,s,yt);return a.colorSpace=bt,a},Ns=(t,s,r,o)=>{const n=new Uint8Array(s*s*4);for(let i=0;i<t.length;i++){const l=(r+(o-r)*t[i])*255;n[i*4]=l,n[i*4+1]=l,n[i*4+2]=l,n[i*4+3]=255}const a=new wt(n,s,s,yt);return a.colorSpace=bt,a},dt=new Map,ks={ceramic:{size:256,frequency:12,octaves:4,seed:11,contrast:1.1,normalStrength:2.6,roughLow:.3,roughHigh:.5,repeat:6},bean:{size:256,frequency:22,octaves:5,seed:29,bias:.55,contrast:1.5,normalStrength:13,roughLow:.52,roughHigh:.72,repeat:2},concrete:{size:256,frequency:7,octaves:5,seed:47,contrast:1.2,normalStrength:3.2,roughLow:.72,roughHigh:.96,repeat:16},metal:{size:256,frequency:4,octaves:3,seed:71,contrast:1,normalStrength:1.8,roughLow:.16,roughHigh:.32,repeat:2}},oe=t=>{const s=dt.get(t);if(s)return s;const r=ks[t],o=Ss(r);if(t==="metal"){const{size:a}=r,i=new Float32Array(o.length),l=9;for(let d=0;d<a;d++)for(let h=0;h<a;h++){let m=0;for(let f=-l;f<=l;f++)m+=o[d*a+(h+f+a)%a];i[d*a+h]=m/(l*2+1)}o.set(i)}const n={normalMap:ut(_s(o,r.size,r.normalStrength),r.repeat),roughnessMap:ut(Ns(o,r.size,r.roughLow,r.roughHigh),r.repeat)};return dt.set(t,n),n};function Ts(){const t=c.useMemo(()=>D(),[]),s=c.useMemo(()=>new Vt(44,44,1,1),[]),r=c.useMemo(()=>{const{normalMap:o,roughnessMap:n}=oe("concrete");return new qt({color:new A("#20150f").convertSRGBToLinear(),roughness:.82,metalness:0,normalMap:o,normalScale:new $(.22,.22),roughnessMap:n,envMapIntensity:.35})},[]);return c.useEffect(()=>()=>{s.dispose(),r.dispose()},[s,r]),W(()=>{r.envMapIntensity=R(r.envMapIntensity,.28+u.glow*.3,2,u.dt)}),e.jsx("mesh",{geometry:s,material:r,rotation:[-Math.PI/2,0,0],position:[0,-.002,0],receiveShadow:t.shadows})}const ze=(t,{steps:s=64,radial:r=20,radius:o,flatten:n=1,caps:a=!0})=>{const i=t.computeFrenetFrames(s,!1),l=[],d=[],h=[],m=[],f=new S,p=new S,v=new S;for(let b=0;b<=s;b++){const x=b/s;t.getPointAt(x,f);const w=o(x),k=i.normals[b],L=i.binormals[b];for(let E=0;E<=r;E++){const T=E/r*Math.PI*2,B=Math.sin(T),F=-Math.cos(T);p.set(k.x*F*n+L.x*B,k.y*F*n+L.y*B,k.z*F*n+L.z*B),p.normalize(),v.set(k.x*F*w*n+L.x*B*w,k.y*F*w*n+L.y*B*w,k.z*F*w*n+L.z*B*w),l.push(f.x+v.x,f.y+v.y,f.z+v.z),d.push(p.x,p.y,p.z),h.push(x,E/r)}}const g=r+1;for(let b=0;b<s;b++)for(let x=0;x<r;x++){const w=b*g+x,k=(b+1)*g+x;m.push(w,k,w+1,k,k+1,w+1)}if(a)for(const b of[0,1]){const x=b;t.getPointAt(x,f);const w=l.length/3,k=t.getTangentAt(x,new S).multiplyScalar(b===0?-1:1);l.push(f.x,f.y,f.z),d.push(k.x,k.y,k.z),h.push(x,.5);const L=b===0?0:s*g;for(let E=0;E<r;E++)b===0?m.push(w,L+E+1,L+E):m.push(w,L+E,L+E+1)}const j=new Ne;return j.setAttribute("position",new Ae(l,3)),j.setAttribute("normal",new Ae(d,3)),j.setAttribute("uv",new Ae(h,2)),j.setIndex(m),j.computeBoundingSphere(),j},y={height:1.16,rimOuter:.862,rimInner:.804,baseOuter:.455,baseInner:.42,floor:.1,bulge:.05,seat:.031},Rs=t=>{const s=Y.clamp((t-y.floor)/(y.height-.035-y.floor),0,1),r=Math.pow(s,.86);return Y.lerp(y.baseInner,y.rimInner,r)+y.bulge*Math.sin(s*Math.PI)*.55},N=(t,s)=>new $(t,s),Es=(t,s,r,o,n,a,i)=>{for(let l=0;l<=i;l++){const d=Y.lerp(n,a,l/i);t.push(N(s+Math.cos(d)*o,r+Math.sin(d)*o))}},mt=(t,s,r,o,n,a=0)=>{for(let i=1;i<=n;i++){const l=i/n,d=Math.pow(l,.86),h=a?Math.sin(l*Math.PI*a)*.0055*Math.sin(l*Math.PI):0;t.push(N(Y.lerp(s.x,r.x,d)+o*Math.sin(l*Math.PI)+h,Y.lerp(s.y,r.y,l)))}},_t=t=>{const s=[];s.push(N(0,.014)),s.push(N(y.baseOuter*.5,.01)),s.push(N(y.baseOuter*.82,.001)),s.push(N(y.baseOuter,0)),s.push(N(y.baseOuter+.012,.014)),s.push(N(y.baseOuter,.032)),mt(s,N(y.baseOuter,.032),N(y.rimOuter,y.height-.029),y.bulge,t,7);const r=(y.rimOuter-y.rimInner)/2;Es(s,y.rimOuter-r,y.height-.029,r,0,Math.PI,10);const o=s.length-1;return mt(s,N(y.rimInner,y.height-.032),N(y.baseInner,y.floor),-.05*.72,t,0),s.push(N(y.baseInner*.72,y.floor-.012)),s.push(N(y.baseInner*.36,y.floor-.02)),s.push(N(0,y.floor-.022)),{points:s,innerStart:o}},Cs=(t=96)=>{const s=Math.max(14,Math.round(t/2.6)),r=new he(_t(s).points,t);return r.computeVertexNormals(),r},As=(t=96)=>{const s=Math.max(14,Math.round(t/2.6)),{points:r,innerStart:o}=_t(s),n=r.slice(o).map(i=>N(Math.max(0,i.x-.005),i.y-.002)),a=new he(n,t);return a.computeVertexNormals(),a},Ls=(t=96)=>{const s=[N(0,.004),N(.3,0),N(.62,.006),N(.98,.036),N(1.24,.076),N(1.34,.098),N(1.375,.116),N(1.35,.132),N(1.16,.108),N(.84,.078),N(.63,.058),N(.56,.04),N(.5,y.seat),N(.26,y.seat-.003),N(0,y.seat-.004)],r=new he(s,t);return r.computeVertexNormals(),r},Is=(t=1)=>{const s=new De([new S(.78,.95,0),new S(1.2,.92,0),new S(1.42,.63,0),new S(1.24,.34,0),new S(.79,.29,0)],!1,"catmullrom",.4);return ze(s,{steps:t>.5?72:32,radial:t>.5?18:10,flatten:1.4,radius:r=>.026+.026*Math.pow(Math.sin(Math.PI*r),.55)})},fe=`
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
`,$e=`
  float sprite(vec2 uv, float softness) {
    float d = length(uv - 0.5) * 2.0;
    return smoothstep(1.0, 1.0 - softness, d);
  }
`,Ps=`
  uniform float uTime;
  uniform float uVel;
  uniform float uAgitate;

  varying vec2 vUv;
  varying float vR;
  varying float vWave;

  ${fe}

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
`,Bs=`
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

  ${fe}

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
`;class Os extends pe{constructor(){super({vertexShader:Ps,fragmentShader:Bs,transparent:!0,depthWrite:!1,side:We,uniforms:{uTime:{value:0},uVel:{value:0},uAgitate:{value:.25},uOpacity:{value:1},uCrema:{value:1},uDeep:{value:new A("#1a0c06").convertSRGBToLinear()},uCremaColor:{value:new A("#c98a4a").convertSRGBToLinear()},uHighlight:{value:new A("#ffd9a8").convertSRGBToLinear()}}})}}const Ue=`
  uniform float uWorldSize;
  uniform float uViewHeight;

  float pointPixels(float radius, float depth) {
    float perUnit = uViewHeight * projectionMatrix[1][1] * 0.5;
    return radius * perUnit / max(0.001, depth);
  }
`,Fs=`
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

  ${fe}
  ${Ue}

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
`,Ws=`
  precision highp float;

  uniform vec3 uColorCore;
  uniform vec3 uColorEdge;
  uniform float uTime;

  varying float vAlpha;
  varying float vLife;
  varying float vSeed;

  ${$e}

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
`;class Gs extends pe{constructor(){super({vertexShader:Fs,fragmentShader:Ws,transparent:!0,depthWrite:!1,depthTest:!0,blending:ke,uniforms:{uTime:{value:0},uIntensity:{value:0},uRise:{value:2.1},uWorldSize:{value:.12},uViewHeight:{value:900},uVel:{value:0},uSpread:{value:.75},uColorCore:{value:new A("#fff1de").convertSRGBToLinear()},uColorEdge:{value:new A("#6b4a34").convertSRGBToLinear()}}})}}const Hs=`
  uniform float uTime;
  uniform float uIntensity;

  attribute float aSeed;
  attribute float aScale;
  attribute float aSpeed;

  varying float vAlpha;
  varying float vHeat;

  ${fe}
  ${Ue}

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
`,Ds=`
  precision highp float;

  uniform vec3 uHot;
  uniform vec3 uCool;

  varying float vAlpha;
  varying float vHeat;

  ${$e}

  void main() {
    float mask = sprite(gl_PointCoord, 0.9);
    mask = pow(mask, 1.6);
    if (mask < 0.003) discard;

    vec3 col = mix(uCool, uHot, vHeat);
    gl_FragColor = vec4(col * (0.8 + vHeat * 1.6), mask * vAlpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;class Vs extends pe{constructor(){super({vertexShader:Hs,fragmentShader:Ds,transparent:!0,depthWrite:!1,blending:ke,uniforms:{uTime:{value:0},uIntensity:{value:0},uWorldSize:{value:.022},uViewHeight:{value:900},uHot:{value:new A("#ffd08a").convertSRGBToLinear()},uCool:{value:new A("#c23f11").convertSRGBToLinear()}}})}}const qs=`
  uniform float uTime;
  uniform float uIntensity;
  uniform float uDrift;

  attribute float aSeed;
  attribute float aScale;

  varying float vAlpha;

  ${Ue}

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
`,zs=`
  precision highp float;
  uniform vec3 uColor;
  varying float vAlpha;

  ${$e}

  void main() {
    float mask = sprite(gl_PointCoord, 1.0);
    mask *= mask;
    if (mask < 0.002) discard;
    gl_FragColor = vec4(uColor, mask * vAlpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;class $s extends pe{constructor(){super({vertexShader:qs,fragmentShader:zs,transparent:!0,depthWrite:!1,blending:ke,uniforms:{uTime:{value:0},uIntensity:{value:.5},uWorldSize:{value:.009},uViewHeight:{value:900},uDrift:{value:0},uColor:{value:new A("#e8c79a").convertSRGBToLinear()}}})}}function Us({count:t=900,radius:s=.62,rise:r=1.1,size:o=.19,spread:n=.9,intensity:a=l=>l.steam,position:i=[0,0,0]}){const l=re(p=>p.gl),d=c.useRef(null),h=c.useMemo(()=>new Gs,[]),m=c.useMemo(()=>{const p=new Ne,v=new Float32Array(t*3),g=new Float32Array(t),j=new Float32Array(t),b=new Float32Array(t);for(let x=0;x<t;x++){const w=Math.sqrt(Math.random())*s,k=Math.random()*Math.PI*2;v[x*3]=Math.cos(k)*w,v[x*3+1]=0,v[x*3+2]=Math.sin(k)*w,g[x]=Math.random(),j[x]=.35+Math.random()*.85,b[x]=.55+Math.random()*.9}return p.setAttribute("position",new H(v,3)),p.setAttribute("aSeed",new H(g,1)),p.setAttribute("aScale",new H(j,1)),p.setAttribute("aSpeed",new H(b,1)),p.boundingSphere=new Ve(new S(0,r*.5,0),r+s),p},[t,s,r]);c.useEffect(()=>{h.uniforms.uRise.value=r,h.uniforms.uWorldSize.value=o,h.uniforms.uSpread.value=n},[h,r,o,n]),c.useEffect(()=>()=>{m.dispose(),h.dispose()},[m,h]);const f=c.useRef(0);return W(()=>{const p=h.uniforms;p.uTime.value=u.time,p.uViewHeight.value=l.domElement.height,f.current=R(f.current,a(u),4,u.dt),p.uIntensity.value=f.current*.055,p.uVel.value=R(p.uVel.value,u.vel*.8,3,u.dt),d.current&&(d.current.visible=f.current>.004)}),e.jsx("points",{ref:d,geometry:m,material:h,position:i,frustumCulled:!1})}const Ie=y.floor+.03,Ks=y.height-.075;function Pe({presence:t=m=>m.cup,fill:s=m=>m.fill,steam:r=m=>m.steam,crema:o=m=>m.crema,position:n=[0,0,0],rotation:a=0,scale:i=1,saucer:l=!0,steamCount:d,seed:h=0}){const m=c.useMemo(()=>D(),[]),f=c.useRef(null),p=c.useRef(null),v=c.useRef(null),g=m.cupSegments,j=m.tier==="low"?.4:1,b=c.useMemo(()=>Cs(g),[g]),x=c.useMemo(()=>As(g),[g]),w=c.useMemo(()=>Ls(g),[g]),k=c.useMemo(()=>Is(j),[j]),L=c.useMemo(()=>new zt(1,Math.max(48,g)),[g]),E=c.useMemo(()=>new Os,[]),T=c.useMemo(()=>{const{normalMap:V,roughnessMap:te}=oe("ceramic");return new ne({color:new A("#1b100b").convertSRGBToLinear(),roughness:.4,metalness:0,normalMap:V,normalScale:new $(.12,.12),roughnessMap:te,clearcoat:.62,clearcoatRoughness:.3,sheen:.45,sheenColor:new A("#ffd9b0").convertSRGBToLinear(),sheenRoughness:.6,side:We,transparent:!0,opacity:1,envMapIntensity:.85})},[]),B=c.useMemo(()=>{const{normalMap:V,roughnessMap:te}=oe("ceramic");return new ne({color:new A("#cdbca4").convertSRGBToLinear(),roughness:.46,metalness:0,normalMap:V,normalScale:new $(.09,.09),roughnessMap:te,clearcoat:.5,clearcoatRoughness:.32,side:We,transparent:!0,envMapIntensity:.75})},[]);c.useEffect(()=>()=>{[b,x,w,k,L].forEach(V=>V.dispose()),[E,T,B].forEach(V=>V.dispose())},[b,x,w,k,L,E,T,B]);const F=c.useRef(0),Re=c.useRef(Ie),Ee=c.useRef(0);W(()=>{const V=I(t(u));F.current=R(F.current,V,6,u.dt);const te=F.current>.006;if(f.current){f.current.visible=te,f.current.scale.setScalar(i*G(.92,1,F.current)),f.current.position.set(n[0],n[1]+G(-.18,0,F.current),n[2]);const Ye=u.time+h*12;f.current.rotation.y=a+u.px*.1+Math.sin(Ye*.24)*.04+u.tl*.1,f.current.rotation.z=Math.sin(Ye*.19)*.006,f.current.rotation.x=u.py*.02}if(!te)return;T.opacity=F.current,B.opacity=F.current;const Ke=I(s(u));Re.current=R(Re.current,G(Ie,Ks,Ke),5,u.dt);const Ce=Re.current,Et=Rs(Ce)-.008;Ee.current=R(Ee.current,u.vel*.055,3.5,u.dt),p.current&&(p.current.position.y=Ce,p.current.scale.setScalar(Et),p.current.rotation.z=Ee.current,p.current.rotation.x=-Math.PI/2,p.current.visible=Ke>.015),v.current&&(v.current.position.y=Ce+.015);const K=E.uniforms;K.uTime.value=u.time,K.uOpacity.value=F.current,K.uCrema.value=R(K.uCrema.value,I(o(u)),4,u.dt),K.uVel.value=R(K.uVel.value,u.vel*.35,4,u.dt),K.uAgitate.value=R(K.uAgitate.value,.18+u.pour*1.9,4,u.dt)});const ee=m.shadows;return e.jsxs("group",{ref:f,children:[l&&e.jsx("mesh",{geometry:w,material:T,scale:[.8,1,.8],castShadow:ee,receiveShadow:ee}),e.jsxs("group",{position:[0,l?y.seat:0,0],children:[e.jsx("mesh",{geometry:b,material:T,castShadow:ee,receiveShadow:ee}),e.jsx("mesh",{geometry:x,material:B}),e.jsx("mesh",{geometry:k,material:T,castShadow:ee,receiveShadow:ee}),e.jsx("mesh",{ref:p,geometry:L,material:E,rotation:[-Math.PI/2,0,0],position:[0,Ie,0]}),e.jsx("group",{ref:v,children:e.jsx(Us,{count:d??m.steamCount,radius:y.rimInner*.72,rise:1.1,size:m.tier==="low"?.24:.19,intensity:r})})]})]})}const Be=(t,s)=>Math.exp(-(t*t)/(2*s*s)),Nt=({segments:t=64,length:s=1,width:r=.57,thickness:o=.395,crease:n=.94,lips:a=.13}={})=>{const i=new $t(1,t,Math.round(t*.62)),l=i.attributes.position,d=new S,h=new Float32Array(l.count*3);for(let m=0;m<l.count;m++){d.fromBufferAttribute(l,m);const f=d.x*s,p=1+.05*(1-Math.abs(d.x));let v=d.y*r*p,g=d.z*o*p;const j=g>0;j&&(g*=.86);const b=Math.max(0,1-Math.pow(Math.abs(f)/s,2.4));if(j){const L=g/(o*.86),E=Be(v/r,.085)*n*b;g-=g*E,g+=Be(Math.abs(v/r)-.3,.13)*a*o*b*L}const x=Math.sin(f*14.5)*Math.sin(v*21.3)*.002*(j?.4:1);g+=Math.sign(g||1)*x,v+=Math.sin(f*3.1)*.008,l.setXYZ(m,f,v,g);const w=j?Be(v/r,.06)*b:0,k=1+w*.85;h[m*3]=k,h[m*3+1]=k*(1-w*.04),h[m*3+2]=k*(1-w*.12)}return i.setAttribute("color",new H(h,3)),i.computeVertexNormals(),i.computeBoundingSphere(),i},be=["#8e9a6a","#c9a95f","#a3733f","#7b4a2c","#4e2c1c","#2c1610"].map(t=>new A(t).convertSRGBToLinear()),Ys=new A,kt=(t,s=new A)=>{const r=Math.min(.9999,Math.max(0,t))*(be.length-1),o=Math.floor(r);return s.copy(be[o]).lerp(Ys.copy(be[o+1]??be[o]),r-o),s},ce=new jt,ht=new A;function Xs(){const t=c.useMemo(()=>D(),[]),s=c.useRef(null),r=t.beanCount,o=c.useMemo(()=>Nt({segments:t.tier==="low"?28:56}),[t.tier]),n=c.useMemo(()=>{const{normalMap:l,roughnessMap:d}=oe("bean");return new ne({roughness:.58,metalness:0,normalMap:l,normalScale:new $(.4,.4),roughnessMap:d,vertexColors:!0,clearcoat:.3,clearcoatRoughness:.45,transparent:!0,opacity:0,envMapIntensity:.85})},[]),a=c.useMemo(()=>Array.from({length:r},(l,d)=>{const h=d*1.37;return{radius:P(h+1,1.4,7.2),angle:P(h+2,0,Math.PI*2),y:P(h+3,-.35,2.6)*(P(h+9,0,1)>.72?1:.28),scale:P(h+4,.075,.185),spin:new S(P(h+5,-1,1),P(h+6,-1,1),P(h+7,-1,1)).normalize(),rate:P(h+8,.12,.55),bob:P(h+10,.05,.3),phase:P(h+11,0,Math.PI*2)}}),[r]);c.useEffect(()=>{const l=s.current;if(l){for(let d=0;d<r;d++)kt(P(d*2.11+5,.42,.95),ht),l.setColorAt(d,ht);l.instanceColor&&(l.instanceColor.needsUpdate=!0)}},[r]),c.useEffect(()=>()=>{o.dispose(),n.dispose()},[o,n]);const i=c.useRef(0);return W(()=>{const l=s.current;if(!l)return;i.current=R(i.current,I(u.beans),4.5,u.dt);const d=i.current>.005;if(l.visible=d,n.opacity=i.current,!d)return;const h=u.time,m=.72+.28*i.current;l.rotation.y=h*.028+u.tl*.16;for(let f=0;f<r;f++){const p=a[f],v=p.angle+h*.012*p.rate,g=p.radius*m;ce.position.set(Math.cos(v)*g,p.y+Math.sin(h*.4*p.rate+p.phase)*p.bob,Math.sin(v)*g),ce.quaternion.setFromAxisAngle(p.spin,h*p.rate+p.phase),ce.scale.setScalar(p.scale*(.6+.4*i.current)),ce.updateMatrix(),l.setMatrixAt(f,ce.matrix)}l.instanceMatrix.needsUpdate=!0}),e.jsx("instancedMesh",{ref:s,args:[o,n,r],frustumCulled:!1,position:[0,.1,0]})}function Zs(){const t=c.useMemo(()=>D(),[]),s=re(l=>l.gl),r=c.useRef(null),o=t.emberCount,n=c.useMemo(()=>new Vs,[]),a=c.useMemo(()=>{const l=new Ne,d=new Float32Array(o*3),h=new Float32Array(o),m=new Float32Array(o),f=new Float32Array(o);for(let p=0;p<o;p++){const v=.7+Math.random()*1.9,g=Math.random()*Math.PI*2;d[p*3]=Math.cos(g)*v,d[p*3+1]=-1.1+Math.random()*.9,d[p*3+2]=Math.sin(g)*v*.8,h[p]=Math.random(),m[p]=.3+Math.random()*1,f[p]=.5+Math.random()*1.2}return l.setAttribute("position",new H(d,3)),l.setAttribute("aSeed",new H(h,1)),l.setAttribute("aScale",new H(m,1)),l.setAttribute("aSpeed",new H(f,1)),l.boundingSphere=new Ve(new S(0,1,0),6),l},[o]);c.useEffect(()=>{n.uniforms.uWorldSize.value=t.tier==="low"?.03:.024},[n,t.tier]),c.useEffect(()=>()=>{a.dispose(),n.dispose()},[a,n]);const i=c.useRef(0);return W(()=>{i.current=R(i.current,I(u.embers),4,u.dt),n.uniforms.uTime.value=u.time,n.uniforms.uViewHeight.value=s.domElement.height,n.uniforms.uIntensity.value=i.current*.85,r.current&&(r.current.visible=i.current>.004)}),e.jsx("points",{ref:r,geometry:a,material:n,frustumCulled:!1})}const ue=new jt,pt=new Ut;function Qs(){const t=c.useMemo(()=>D(),[]),s=c.useRef(null),r=c.useRef(null),o=c.useRef(null),n=c.useRef(null),a=t.tier==="high"?46:t.tier==="mid"?28:14,i=c.useMemo(()=>Nt({segments:t.tier==="low"?48:144}),[t.tier]),l=c.useMemo(()=>{const{normalMap:f,roughnessMap:p}=oe("bean");return new ne({color:new A("#8e9a6a").convertSRGBToLinear(),normalMap:f,normalScale:new $(.5,.5),roughnessMap:p,vertexColors:!0,roughness:.85,metalness:0,clearcoat:0,clearcoatRoughness:.4,sheen:.14,sheenColor:new A("#ffcf9b").convertSRGBToLinear(),emissive:new A("#e04a10").convertSRGBToLinear(),emissiveIntensity:0,transparent:!0,opacity:0,envMapIntensity:.58})},[]),d=c.useMemo(()=>Array.from({length:a},(f,p)=>{const v=p*3.7+11;return{radius:P(v,1.5,3.1),angle:P(v+1,0,Math.PI*2),y:P(v+2,-.9,1.1),scale:P(v+3,.06,.14),rate:P(v+4,.3,1.1),tilt:P(v+5,-.5,.5)}}),[a]);c.useEffect(()=>()=>{i.dispose(),l.dispose()},[i,l]);const h=c.useRef(0),m=c.useRef(0);return W(()=>{h.current=R(h.current,I(u.heroBean),5,u.dt);const f=h.current>.005;if(s.current&&(s.current.visible=f),l.opacity=h.current,!f)return;m.current=R(m.current,I(u.roast),6,u.dt);const p=m.current;kt(p,l.color),l.roughness=G(.9,.38,Math.pow(p,1.3)),l.clearcoat=O(p,.55,1,0,.85),l.clearcoatRoughness=G(.5,.14,p);const v=Math.exp(-Math.pow((p-.55)/.09,2)),g=Math.exp(-Math.pow((p-.88)/.07,2)),j=.75+.25*Math.sin(u.time*14)*Math.sin(u.time*6.3),b=(v*.7+g)*j;l.emissiveIntensity=b*.2*h.current,n.current&&(n.current.intensity=(1.8+b*11)*h.current,n.current.position.set(Math.sin(u.time*.6)*.6,.4,1.3));const x=u.time,w=s.current;w.rotation.y=-.72+Math.sin(x*.22)*.2+u.tl*.2+u.px*.16,w.rotation.z=.3+Math.sin(x*.3)*.05+u.py*.06,w.rotation.x=-.12+Math.sin(x*.19)*.05;const k=1+v*.035+g*.05;w.scale.setScalar(G(.58,.79,h.current)*k),w.position.y=.28+Math.sin(x*.45)*.06;const L=o.current;if(L){for(let E=0;E<a;E++){const T=d[E],B=T.angle+x*.18*T.rate;ue.position.set(Math.cos(B)*T.radius,T.y+Math.sin(x*.6+T.angle)*.16,Math.sin(B)*T.radius),pt.set(x*T.rate,x*T.rate*.7,T.tilt),ue.quaternion.setFromEuler(pt),ue.scale.setScalar(T.scale*h.current),ue.updateMatrix(),L.setMatrixAt(E,ue.matrix)}L.instanceMatrix.needsUpdate=!0}}),e.jsxs("group",{ref:s,children:[e.jsx("mesh",{ref:r,geometry:i,material:l,castShadow:t.shadows}),e.jsx("instancedMesh",{ref:o,args:[i,l,a],frustumCulled:!1,castShadow:t.shadows}),e.jsx("pointLight",{ref:n,color:"#ff7a2a",distance:9,decay:2,intensity:0}),e.jsx(Zs,{})]})}const Js=`
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
`,er=`
  precision highp float;

  uniform float uTime;
  uniform float uProgress;
  uniform float uOpacity;
  uniform vec3 uColor;
  uniform vec3 uSheen;

  varying vec2 vUv;
  varying float vY;

  ${fe}

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
`;class tr extends pe{constructor(){super({vertexShader:Js,fragmentShader:er,transparent:!0,depthWrite:!1,side:Mt,uniforms:{uTime:{value:0},uProgress:{value:0},uOpacity:{value:0},uWobble:{value:1},uColor:{value:new A("#5a2a12").convertSRGBToLinear()},uSheen:{value:new A("#e8b784").convertSRGBToLinear()}}})}}const Tt=1.7,ft=Tt-y.floor;function sr(){const t=c.useRef(null),s=c.useRef(null),r=c.useMemo(()=>new tr,[]),o=c.useMemo(()=>new Kt(.036,.023,ft,20,30,!0),[]),n=c.useMemo(()=>new Yt(.05,.24,44),[]),a=c.useMemo(()=>new Xt({color:new A("#f0c391").convertSRGBToLinear(),transparent:!0,opacity:0,blending:ke,depthWrite:!1,side:Mt}),[]);c.useEffect(()=>()=>{o.dispose(),n.dispose(),r.dispose(),a.dispose()},[o,n,r,a]);const i=c.useRef(0);return W(()=>{i.current=R(i.current,I(u.pour),6,u.dt);const l=i.current>.005;if(t.current&&(t.current.visible=l),!l)return;t.current&&t.current.position.set(u.pourX,y.seat,u.pourZ);const d=r.uniforms;if(d.uTime.value=u.time,d.uOpacity.value=i.current,d.uProgress.value=R(d.uProgress.value,u.pourLen,5,u.dt),d.uWobble.value=.7+Math.abs(u.vel)*1.4,s.current){const h=u.time*1.8%1;s.current.position.y=G(y.floor+.06,y.height-.09,I(u.fill)),s.current.scale.setScalar(.6+h*1.5),a.opacity=(1-h)*.45*i.current*d.uProgress.value}}),e.jsxs("group",{ref:t,position:[0,y.seat,0],children:[e.jsx("mesh",{geometry:o,material:r,position:[0,y.floor+ft/2,0]}),e.jsx("mesh",{ref:s,geometry:n,material:a,rotation:[-Math.PI/2,0,0]})]})}const He=new S(.876,.238,0),C=(t,s)=>new $(t,s),rr=(t=80)=>{const s=[C(0,.002),C(.24,0),C(.305,.008),C(.335,.03),C(.362,.09),C(.374,.17),C(.372,.27),C(.352,.37),C(.314,.455),C(.258,.52),C(.206,.565),C(.192,.6),C(.205,.612),C(.196,.62),C(.18,.606),C(0,.6)],r=new he(s,t);return r.computeVertexNormals(),r},nr=(t=64)=>{const s=[C(0,.604),C(.14,.606),C(.178,.614),C(.186,.626),C(.15,.634),C(.07,.638),C(.042,.652),C(.05,.676),C(.036,.69),C(0,.692)],r=new he(s,t);return r.computeVertexNormals(),r},or=(t=1)=>{const s=new De([new S(.22,.33,0),new S(.46,.39,0),new S(.68,.53,0),new S(.84,.5,0),new S(.888,.36,0),He.clone()],!1,"catmullrom",.4);return ze(s,{steps:t>.5?84:40,radial:t>.5?20:12,radius:r=>.082*Math.pow(1-r,.85)+.019})},ar=(t=1)=>{const s=new De([new S(-.28,.47,0),new S(-.56,.44,0),new S(-.66,.24,0),new S(-.5,.09,0),new S(-.3,.07,0)],!1,"catmullrom",.4);return ze(s,{steps:t>.5?64:30,radial:t>.5?16:10,flatten:1.25,radius:r=>.022+.014*Math.pow(Math.sin(Math.PI*r),.6)})};function ir(){const t=c.useMemo(()=>D(),[]),s=c.useRef(null),r=t.tier==="low"?.4:1,o=c.useMemo(()=>rr(t.cupSegments),[t.cupSegments]),n=c.useMemo(()=>nr(Math.round(t.cupSegments*.7)),[t.cupSegments]),a=c.useMemo(()=>or(r),[r]),i=c.useMemo(()=>ar(r),[r]),l=c.useMemo(()=>{const{normalMap:p,roughnessMap:v}=oe("metal");return new ne({color:new A("#b9bcc0").convertSRGBToLinear(),metalness:.94,roughness:.3,normalMap:p,normalScale:new $(.1,.1),roughnessMap:v,transparent:!0,opacity:0,envMapIntensity:1.25})},[]),d=c.useMemo(()=>new ne({color:new A("#3a241a").convertSRGBToLinear(),metalness:0,roughness:.52,clearcoat:.35,transparent:!0,opacity:0,envMapIntensity:.7}),[]);c.useEffect(()=>()=>{[o,n,a,i].forEach(p=>p.dispose()),[l,d].forEach(p=>p.dispose())},[o,n,a,i,l,d]);const h=c.useRef(0),m=c.useRef(0);W(()=>{const p=I(u.kettle);h.current=R(h.current,p,5,u.dt);const v=h.current>.006,g=s.current;if(g&&(g.visible=v),l.opacity=h.current,d.opacity=h.current,!v||!g)return;m.current=R(m.current,I(u.pour),4,u.dt);const j=u.time;g.position.set(u.pourX,Tt+G(.16,0,h.current),u.pourZ),g.rotation.z=-.05-.6*m.current+Math.sin(j*1.7)*.014*m.current,g.rotation.y=-.52+Math.sin(j*.5)*.05+u.px*.12,g.rotation.x=Math.sin(j*.42)*.02});const f=t.shadows;return e.jsx("group",{ref:s,children:e.jsxs("group",{scale:.78,position:[-He.x*.78,-He.y*.78,0],children:[e.jsx("mesh",{geometry:o,material:l,castShadow:f}),e.jsx("mesh",{geometry:n,material:l,castShadow:f}),e.jsx("mesh",{geometry:a,material:l,castShadow:f}),e.jsx("mesh",{geometry:i,material:d,castShadow:f})]})})}function lr(){const t=c.useMemo(()=>D(),[]),s=re(a=>a.gl),r=c.useMemo(()=>new $s,[]),o=t.dustCount,n=c.useMemo(()=>{const a=new Ne,i=new Float32Array(o*3),l=new Float32Array(o),d=new Float32Array(o);for(let h=0;h<o;h++)i[h*3]=(Math.random()-.5)*16,i[h*3+1]=Math.random()*7-1.2,i[h*3+2]=(Math.random()-.5)*12,l[h]=Math.random(),d[h]=.25+Math.random()*.9;return a.setAttribute("position",new H(i,3)),a.setAttribute("aSeed",new H(l,1)),a.setAttribute("aScale",new H(d,1)),a.boundingSphere=new Ve(new S(0,2,0),16),a},[o]);return c.useEffect(()=>()=>{n.dispose(),r.dispose()},[n,r]),W(()=>{const a=r.uniforms;a.uTime.value=u.time,a.uViewHeight.value=s.domElement.height,a.uIntensity.value=R(a.uIntensity.value,u.dust*.22,2.5,u.dt),a.uDrift.value=R(a.uDrift.value,-u.vel*.9,2,u.dt)}),e.jsx("points",{geometry:n,material:r,frustumCulled:!1})}function cr({onReady:t}){const s=c.useRef(0),r=re(o=>o.gl);return c.useEffect(()=>{const o=window.setTimeout(t,6e3);return()=>window.clearTimeout(o)},[t,r]),W(()=>{s.current+=1,s.current===4&&t()}),null}function ur(){const t=c.useMemo(()=>D(),[]),s=c.useRef(null),r=c.useRef(null);return c.useEffect(()=>{s.current&&r.current&&(s.current.target=r.current)},[]),W(()=>{s.current&&(s.current.intensity=R(s.current.intensity,120+u.glow*70,2,u.dt))}),t.shadows?e.jsxs(e.Fragment,{children:[e.jsx("object3D",{ref:r,position:[0,.42,0]}),e.jsx("spotLight",{ref:s,position:[.75,5.6,2.6],angle:.52,penumbra:1,decay:2,distance:30,intensity:120,color:"#ffd9b2",castShadow:!0,"shadow-mapSize-width":t.shadowMapSize,"shadow-mapSize-height":t.shadowMapSize,"shadow-bias":-6e-4,"shadow-normalBias":.022,"shadow-camera-near":1.2,"shadow-camera-far":18})]}):e.jsx("pointLight",{position:[.5,3.4,2],intensity:26,decay:2,color:"#ffd7ab"})}function dr(){const t=c.useRef(null);return W(()=>{const s=t.current;s&&(s.position.x=R(s.position.x,u.subjectX,5,u.dt),s.position.y=R(s.position.y,u.subjectY,5,u.dt))}),e.jsxs("group",{ref:t,children:[e.jsx(ur,{}),e.jsx(Ts,{}),e.jsx(Pe,{}),e.jsx(ir,{}),e.jsx(sr,{}),e.jsx(Qs,{}),e.jsx(Pe,{presence:s=>s.trio,fill:()=>.82,steam:s=>s.trio*.55,crema:()=>.85,position:[-1.72,0,.35],rotation:.6,scale:.78,seed:3,steamCount:280}),e.jsx(Pe,{presence:s=>s.trio,fill:()=>.62,steam:s=>s.trio*.45,crema:()=>.35,position:[1.72,0,.35],rotation:-.8,scale:.78,seed:7,steamCount:280})]})}function mr({onReady:t}){const s=c.useMemo(()=>D(),[]),[r,o]=c.useState(!0);return c.useEffect(()=>{const n=()=>o(!document.hidden);return document.addEventListener("visibilitychange",n),()=>document.removeEventListener("visibilitychange",n)},[]),e.jsxs(Zt,{dpr:s.dpr,shadows:s.shadows?"soft":!1,flat:s.postFx,frameloop:r?"always":"never",camera:{fov:34,near:.08,far:90,position:[0,.64,3.3]},gl:{antialias:!s.postFx,alpha:!0,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1},onCreated:({gl:n,scene:a})=>{n.setClearColor(new A("#080504"),0),a.fog=new Qt(new A("#0a0705").convertSRGBToLinear(),.1)},children:[e.jsx(js,{}),e.jsx(dr,{}),e.jsx(Xs,{}),e.jsx(lr,{}),e.jsx(cr,{onReady:t}),s.postFx&&e.jsx(Ms,{})]})}const J=t=>{const s=c.useCallback(r=>{et(t,r)},[t]);return c.useEffect(()=>()=>et(t,null),[t]),s};function ve({lines:t,as:s="span",className:r,reveal:o=!0,delay:n}){return c.createElement(s,{className:["split",r].filter(Boolean).join(" "),...o?{"data-reveal":"lines","data-reveal-delay":n}:{}},t.map((a,i)=>c.createElement("span",{className:"split__line",key:i},c.createElement("span",{className:"split__inner"},a))))}function Oe({text:t,as:s="span",className:r,reveal:o=!0,stagger:n=.045,delay:a}){return c.createElement(s,{className:["split__line",r].filter(Boolean).join(" "),"aria-label":t,...o?{"data-reveal":"chars","data-reveal-stagger":n,"data-reveal-delay":a}:{}},Array.from(t).map((i,l)=>c.createElement("span",{className:"split__char",key:`${i}-${l}`,"aria-hidden":"true"},i)))}const z={name:"Ember & Oak",est:"2014",address:"14 Kiln Lane, Shoreditch, London E2 7DP",coords:"51.5266° N, 0.0755° W",phone:"+44 20 7946 0412",email:"hello@emberandoak.coffee"},hr=[{id:"01",origin:"Yirgacheffe, Ethiopia",farm:"Chelbesa Washing Station",process:"Washed · Heirloom",altitude:"2,050 m",notes:["Bergamot","White peach","Jasmine"],metrics:[{label:"Acidity",value:.9},{label:"Body",value:.45},{label:"Sweetness",value:.72}]},{id:"02",origin:"Huila, Colombia",farm:"Finca El Mirador",process:"Honey · Caturra",altitude:"1,780 m",notes:["Red apple","Panela","Cocoa nib"],metrics:[{label:"Acidity",value:.62},{label:"Body",value:.78},{label:"Sweetness",value:.86}]},{id:"03",origin:"Karnataka, India",farm:"Ratnagiri Estate",process:"Anaerobic natural",altitude:"1,400 m",notes:["Dried fig","Clove","Dark treacle"],metrics:[{label:"Acidity",value:.34},{label:"Body",value:.94},{label:"Sweetness",value:.7}]}],X=[{at:0,name:"Charge",temp:92,time:"00:00",copy:"Green beans meet a hot drum. For ninety seconds nothing happens — the bean is only losing its shell of moisture."},{at:.22,name:"Drying",temp:148,time:"02:40",copy:"Grassy steam gives way to the smell of hay and bread. Water leaves; density stays."},{at:.42,name:"Maillard",temp:172,time:"05:10",copy:"Sugars and amino acids begin to trade places. This is where sweetness is decided, and it cannot be rushed."},{at:.58,name:"First crack",temp:196,time:"08:20",copy:"A sound like distant rain. Steam fractures the bean along its crease and the volume jumps by half."},{at:.76,name:"Development",temp:208,time:"10:05",copy:"Twenty-two percent of the roast happens here. Longer for the fig and treacle lots, shorter for the florals."},{at:.92,name:"Drop",temp:214,time:"11:40",copy:"Out onto the cooling tray before second crack takes the sugar. Ninety seconds of air and it is finished."}],Fe=[{n:"01",title:"Rinse & warm",body:"Paper rinsed, brewer warmed, scale zeroed. A cold cone steals four degrees from the extraction."},{n:"02",title:"Bloom",body:"Twice the coffee weight in water at 94°C. Forty-five seconds while the trapped carbon dioxide leaves."},{n:"03",title:"Pour in spirals",body:"Three pulses, centre outward, never onto the wall. The bed should stay flat and the drawdown even."},{n:"04",title:"Rest, then taste",body:"Below 60°C the sweetness arrives. We taste every batch at three temperatures before it reaches the counter."}],pr=[{label:"Dose",value:"18 g"},{label:"Water",value:"300 g"},{label:"Temperature",value:"94 °C"},{label:"Total time",value:"2:45"}],fr=[{n:"01",name:"Ember Espresso",detail:"Double · 40 ml · treacle & cocoa",price:"£3.10"},{n:"02",name:"Oak Flat White",detail:"6 oz · Huila honey lot",price:"£3.80"},{n:"03",name:"Kiln Cortado",detail:"4 oz · caramel, short",price:"£3.40"},{n:"04",name:"Single-Origin Filter",detail:"V60 · rotating lot",price:"£4.50"},{n:"05",name:"Cold Ember",detail:"18 h slow extraction · on tap",price:"£4.20"},{n:"06",name:"Cardamom Bun",detail:"Baked at 05:30, gone by noon",price:"£3.90"}],vr=[{n:"01",title:"The 5 a.m. drum",body:"Two roasters, one probe, and eleven minutes that decide the whole day.",art:"art--a"},{n:"02",title:"Cupping table",body:"Sixteen bowls, one spoon, no labels. The lot that wins gets the counter.",art:"art--b"},{n:"03",title:"Crema, close",body:"Tiger-striped and settling. If it breaks before you sit down, we pull it again.",art:"art--c"},{n:"04",title:"Kiln Lane, 07:02",body:"The first queue forms before the shutter is fully up. It always has.",art:"art--d"},{n:"05",title:"Bags, warm",body:"Rested four days, ground to order, never more than a fortnight old.",art:"art--e"}],gr=[{day:"Mon — Thu",time:"07:00 — 18:00"},{day:"Friday",time:"07:00 — 20:00"},{day:"Saturday",time:"08:00 — 18:00"},{day:"Sunday",time:"08:00 — 16:00"}],vt=["Single origin","Roasted on Kiln Lane","Rested four days","Ground to order","No bitterness"];function xr({start:t}){const s=J("hero"),r=c.useRef(null),o=c.useRef(!1);return c.useEffect(()=>{if(!t||o.current||!r.current||(o.current=!0,U()))return;const n=M.context(a=>{const i=a.selector;M.timeline({defaults:{ease:"expo.out"}}).from(i(".hero__eyebrow"),{autoAlpha:0,y:18,duration:1}).from(i(".hero__title .split__char"),{yPercent:118,autoAlpha:0,duration:1.5,stagger:.045},"-=0.7").from(i(".hero__sub"),{autoAlpha:0,y:24,duration:1.2},"-=1.05").from(i(".hero__foot > *"),{autoAlpha:0,y:22,duration:1.1,stagger:.09},"-=0.95")},r);return()=>n.revert()},[t]),e.jsx("section",{className:"hero shell",id:"hero",ref:s,"aria-label":"Ember and Oak",children:e.jsxs("div",{ref:r,style:{display:"contents"},children:[e.jsxs("div",{className:"hero__type",children:[e.jsx("p",{className:"hero__eyebrow",children:e.jsxs("span",{className:"label",children:["Micro-roastery · Est. ",z.est," · Shoreditch"]})}),e.jsxs("h1",{className:"hero__title",children:[e.jsx("span",{className:"row",children:e.jsx(Oe,{text:"EMBER",reveal:!1})}),e.jsxs("span",{className:"row row--split",children:[e.jsx(Oe,{text:"&",reveal:!1,as:"em"}),e.jsx(Oe,{text:"OAK",reveal:!1})]})]}),e.jsx("p",{className:"hero__sub",children:"Eleven minutes on the drum, four days of rest, then ninety seconds of your undivided attention."})]}),e.jsxs("div",{className:"hero__foot",children:[e.jsxs("div",{className:"hero__meta",children:[e.jsx("span",{children:z.coords}),e.jsxs("span",{children:["Today ",e.jsx("strong",{children:"07:00 — 18:00"})]})]}),e.jsxs("button",{type:"button",className:"hint","data-cursor":"Scroll",onClick:()=>se(me("origin")),"aria-label":"Scroll to the origin section",children:[e.jsx("span",{className:"label",children:"Scroll to begin"}),e.jsx("span",{className:"hint__line","aria-hidden":"true"})]}),e.jsx(qe,{variant:"outline","data-cursor":"Menu",onClick:()=>se(me("menu")),children:"See the menu"})]})]})})}const wr="top 86%",ae=(t=[])=>{const s=c.useRef(null);return c.useEffect(()=>{const r=s.current;if(!r)return;const o=U(),n=M.context(()=>{Array.from(r.querySelectorAll("[data-reveal]")).forEach(i=>{const l=i.dataset.reveal||"fade",d=Number(i.dataset.revealDelay??0),h=Number(i.dataset.revealStagger??.055);if(o){l==="meter"&&M.set(i,{scaleX:Number(i.dataset.v??1)});return}const m={trigger:i,start:wr,once:!0};switch(l){case"lines":{const f=i.querySelectorAll(".split__inner");M.from(f.length?f:i,{yPercent:116,rotate:1.4,duration:1.15,ease:"expo.out",stagger:.075,delay:d,scrollTrigger:m});break}case"chars":{const f=i.querySelectorAll(".split__char");M.from(f.length?f:i,{yPercent:108,opacity:0,duration:.9,ease:"expo.out",stagger:h,delay:d,scrollTrigger:m});break}case"mask":{M.from(i,{clipPath:"inset(0% 0% 100% 0%)",duration:1.3,ease:"expo.out",delay:d,scrollTrigger:m});break}case"scale":{M.from(i,{scale:.94,opacity:0,duration:1.25,ease:"expo.out",delay:d,scrollTrigger:m});break}case"meter":{const f=Number(i.dataset.v??1);M.fromTo(i,{scaleX:0},{scaleX:f,duration:1.5,ease:"expo.out",delay:d,scrollTrigger:{trigger:i,start:"top 92%",once:!0}});break}case"rule":{M.from(i,{scaleX:0,transformOrigin:"left center",duration:1.4,ease:"expo.inOut",delay:d,scrollTrigger:m});break}default:M.from(i,{y:34,opacity:0,duration:1.15,ease:"expo.out",delay:d,scrollTrigger:m})}})},r);return()=>n.revert()},t),s};function yr(){const t=J("origin"),s=ae(),r=c.useCallback(o=>{const n=o.currentTarget,a=n.getBoundingClientRect();n.style.setProperty("--mx",`${(o.clientX-a.left)/a.width*100}%`),n.style.setProperty("--my",`${(o.clientY-a.top)/a.height*100}%`)},[]);return e.jsx("section",{className:"section origin",id:"origin",ref:o=>{t(o),s.current=o},"aria-labelledby":"origin-title",children:e.jsxs("div",{className:"shell origin__grid",children:[e.jsxs("div",{className:"origin__sticky",children:[e.jsx("div",{className:"section__head",children:e.jsx("span",{className:"label",children:"Origin"})}),e.jsx("h2",{className:"origin__title",id:"origin-title",children:e.jsx(ve,{lines:["Three farms.",e.jsxs(e.Fragment,{children:["One ",e.jsx("em",{children:"obsession"}),"."]})]})}),e.jsx("p",{className:"lead","data-reveal":"fade","data-reveal-delay":.15,children:"We buy small — sixty to two hundred kilos at a time — from producers we can call by name. Everything we pour is traceable to a single harvest, a single washing station, and a price we are happy to print on the bag."}),e.jsx("p",{className:"prose","data-reveal":"fade","data-reveal-delay":.25,children:"Lots rotate as they peak. When one is gone it is gone, and something else takes the grinder."})]}),e.jsx("ul",{className:"origin__lots",children:hr.map((o,n)=>e.jsx("li",{className:"lot","data-reveal":"scale","data-reveal-delay":n*.06,onPointerMove:r,children:e.jsxs("div",{className:"lot__body",children:[e.jsxs("h3",{className:"lot__name",children:[o.origin,e.jsxs("small",{children:[o.farm," · ",o.process," · ",o.altitude]})]}),e.jsx("ul",{className:"lot__notes",children:o.notes.map(a=>e.jsx("li",{children:a},a))}),e.jsx("div",{className:"lot__meter",children:o.metrics.map(a=>e.jsxs("div",{className:"lot__meter-row",children:[e.jsx("span",{children:a.label}),e.jsx("span",{className:"lot__meter-track",children:e.jsx("i",{"data-reveal":"meter","data-v":a.value})})]},a.label))})]})},o.id))})]})})}const gt="M 8 232 C 96 226, 138 196, 196 150 S 300 78, 384 54 S 520 34, 592 30";function br(){const t=J("roast"),s=ae(),r=c.useRef(null),o=c.useRef(null),n=c.useRef(0),[a,i]=c.useState(X[0].temp),[l,d]=c.useState(0);c.useEffect(()=>{const m=r.current;m&&(n.current=m.getTotalLength(),m.style.strokeDasharray=`${n.current}`,m.style.strokeDashoffset=`${n.current}`)},[]),Te(()=>{const m=O(_.tl,_e[0],_e[1]);let f=0;for(let w=0;w<X.length;w++)m>=X[w].at&&(f=w);const p=X[f],v=X[f+1]??p,g=v.at===p.at?1:(m-p.at)/(v.at-p.at),j=Math.round(G(p.temp,v.temp,Math.min(1,Math.max(0,g))));j!==a&&i(j),f!==l&&d(f);const b=r.current,x=n.current;if(!(!b||!x)&&(b.style.strokeDashoffset=`${x*(1-m)}`,o.current)){const w=b.getPointAtLength(x*m);o.current.setAttribute("cx",`${w.x}`),o.current.setAttribute("cy",`${w.y}`),o.current.style.opacity=m>.004&&m<.998?"1":"0"}});const h=X[l];return e.jsx("section",{className:"roast",id:"roast",ref:m=>{t(m),s.current=m},"aria-labelledby":"roast-title",children:e.jsx("div",{className:"roast__pin",children:e.jsxs("div",{className:"shell roast__stack",children:[e.jsxs("div",{className:"roast__panel scrim",children:[e.jsxs("div",{className:"roast__readout",children:[e.jsx("div",{className:"section__head",children:e.jsx("span",{className:"label",children:"Roast"})}),e.jsx("h2",{className:"panel-title",id:"roast-title",children:e.jsx(ve,{lines:["Eleven minutes",e.jsxs(e.Fragment,{children:["of ",e.jsx("em",{children:"judgement"})]})]})}),e.jsxs("div",{className:"roast__temp","aria-hidden":"true",children:[a,e.jsx("sup",{children:"°C"})]}),e.jsxs("p",{className:"roast__stage",children:[e.jsx("span",{className:"sr-only",children:"Current phase: "}),h.time," · ",h.name]}),e.jsx("p",{className:"roast__desc","aria-live":"polite",children:h.copy})]}),e.jsxs("div",{className:"roast__curve","data-reveal":"fade",children:[e.jsxs("svg",{viewBox:"0 0 600 260",role:"img","aria-label":"Roast temperature curve",children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"emberStroke",x1:"0",y1:"1",x2:"1",y2:"0",children:[e.jsx("stop",{offset:"0%",stopColor:"#b7551f"}),e.jsx("stop",{offset:"55%",stopColor:"#e0803c"}),e.jsx("stop",{offset:"100%",stopColor:"#f6d9a8"})]})}),[0,1,2,3].map(m=>e.jsx("line",{x1:"8",x2:"592",y1:30+m*67,y2:30+m*67,stroke:"currentColor",strokeWidth:"1",opacity:"0.09"},m)),e.jsx("path",{className:"roast__curve-path",d:gt}),e.jsx("path",{className:"roast__curve-live",ref:r,d:gt}),e.jsx("circle",{className:"roast__curve-head",ref:o,r:"5",cx:"8",cy:"232",opacity:"0"})]}),e.jsxs("div",{className:"roast__ticks","aria-hidden":"true",children:[e.jsx("span",{children:"00:00"}),e.jsx("span",{children:"04:00"}),e.jsx("span",{children:"08:00"}),e.jsx("span",{children:"12:00"})]}),e.jsx("div",{className:"roast__phases",children:X.map((m,f)=>e.jsxs("div",{className:"roast__phase","data-on":f===l,children:[e.jsx("i",{"aria-hidden":"true"}),e.jsx("span",{children:m.name}),e.jsxs("span",{children:[m.time," · ",m.temp,"°C"]})]},m.name))})]})]}),e.jsx("div",{"aria-hidden":"true"})]})})})}function jr(){const t=J("brew"),s=ae(),[r,o]=c.useState(0);return Te(()=>{const n=O(_.tl,at[0],at[1]),a=Math.min(Fe.length-1,Math.floor(n*Fe.length));a!==r&&o(a)}),e.jsx("section",{className:"brew",id:"brew",ref:n=>{t(n),s.current=n},"aria-labelledby":"brew-title",children:e.jsx("div",{className:"brew__pin",children:e.jsxs("div",{className:"shell brew__inner",children:[e.jsxs("div",{children:[e.jsx("div",{className:"section__head",children:e.jsx("span",{className:"label",children:"Brew"})}),e.jsx("h2",{className:"panel-title",id:"brew-title",style:{marginBottom:"1.6rem"},children:e.jsx(ve,{lines:["The pour is",e.jsxs(e.Fragment,{children:["a ",e.jsx("em",{children:"ritual"})]})]})}),e.jsx("ol",{className:"brew__steps",children:Fe.map((n,a)=>e.jsxs("li",{className:"brew__step","data-on":a===r,children:[e.jsx("span",{className:"brew__step-mark","aria-hidden":"true"}),e.jsxs("div",{children:[e.jsx("h3",{className:"brew__step-title",children:n.title}),e.jsx("p",{className:"brew__step-body",children:n.body})]})]},n.title))})]}),e.jsxs("div",{className:"brew__aside",children:[e.jsx("dl",{className:"brew__spec","data-reveal":"scale",children:pr.map(n=>e.jsxs("div",{children:[e.jsx("dt",{children:n.label}),e.jsx("dd",{children:n.value})]},n.label))}),e.jsx("p",{className:"prose","data-reveal":"fade","data-reveal-delay":.1,children:"Every recipe on the bar is written on the bag. Take it home, weigh it out, and if it does not taste like it did here, come back and we will fix it with you."})]})]})})})}function Mr(){const t=J("menu"),s=ae();return e.jsx("section",{className:"section menu scrim",id:"menu",ref:r=>{t(r),s.current=r},"aria-labelledby":"menu-title",children:e.jsxs("div",{className:"shell",children:[e.jsx("div",{className:"section__head",children:e.jsx("span",{className:"label",children:"The counter"})}),e.jsx("h2",{className:"panel-title",id:"menu-title",style:{marginBottom:"2.5rem"},children:e.jsx(ve,{lines:[e.jsxs(e.Fragment,{children:["Everything ",e.jsx("em",{children:"on the bar"})]})]})}),e.jsx("ul",{className:"menu__list",children:fr.map((r,o)=>e.jsxs("li",{className:"menu__row","data-cursor":"Taste","data-reveal":"fade","data-reveal-delay":o*.04,children:[e.jsxs("span",{className:"menu__name",children:[r.name,e.jsx("small",{children:r.detail})]}),e.jsx("span",{className:"menu__price",children:r.price})]},r.name))}),e.jsxs("div",{className:"menu__foot",children:[e.jsx("p",{children:"Oat, whole and Jersey milk at no extra charge. Beans by the bag, ground to your brewer."}),e.jsx(qe,{variant:"solid","data-cursor":"Visit",onClick:()=>se(me("visit")),children:"Find us"})]})]})})}function xt({items:t,reverse:s=!1,duration:r=34,copies:o=2}){return e.jsxs("div",{className:"marquee","data-reverse":s,style:{"--marquee-duration":`${r}s`},children:[Array.from({length:o},(n,a)=>e.jsx("div",{className:"marquee__track","aria-hidden":"true",children:t.map((i,l)=>e.jsxs("span",{className:"marquee__item",children:[i,e.jsx("i",{className:"marquee__sep"})]},`${i}-${l}`))},a)),e.jsx("span",{className:"sr-only",children:t.join(" · ")})]})}function Sr(){const t=J("ritual"),s=ae(),r=c.useRef(null),o=c.useRef(null);return c.useEffect(()=>{const n=r.current,a=o.current;if(!n||!a||U())return;const i=M.context(()=>{const l=()=>Math.max(0,a.scrollWidth-window.innerWidth+48),d=M.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:n,start:"top top",end:"bottom bottom",scrub:.7,invalidateOnRefresh:!0}});d.to(a,{x:()=>-l()},0),d.fromTo(a.querySelectorAll(".plate__art"),{xPercent:-7},{xPercent:7},0),Z.refresh()},n);return()=>i.revert()},[]),e.jsxs("section",{className:"ritual",id:"ritual",ref:n=>{t(n),s.current=n},"aria-label":"The ritual",children:[e.jsx("div",{className:"ritual__marquee",children:e.jsx(xt,{items:vt,duration:38})}),e.jsxs("figure",{className:"quote shell",children:[e.jsx("blockquote",{"data-reveal":"lines",children:e.jsxs("span",{className:"split",children:[e.jsx("span",{className:"split__line",children:e.jsx("span",{className:"split__inner",children:"Coffee is agriculture, not alchemy."})}),e.jsx("span",{className:"split__line",children:e.jsx("span",{className:"split__inner",children:e.jsx("em",{children:"Our job is to get out of its way."})})})]})}),e.jsx("figcaption",{"data-reveal":"fade",children:"Marta Oyelaran — Head Roaster"})]}),e.jsx("div",{className:"ritual__track-wrap",ref:r,children:e.jsx("div",{className:"ritual__pin",children:e.jsx("div",{className:"ritual__track",ref:o,children:vr.map(n=>e.jsxs("figure",{className:"plate","data-cursor":"Look",children:[e.jsx("div",{className:"plate__art",children:e.jsx("div",{className:`art ${n.art}`})}),e.jsxs("figcaption",{className:"plate__cap",children:[e.jsx("h3",{children:n.title}),e.jsx("p",{children:n.body})]})]},n.title))})})}),e.jsx("div",{className:"ritual__marquee",children:e.jsx(xt,{items:[...vt].reverse(),duration:46,reverse:!0})})]})}function _r(){const t=J("visit"),s=ae(),[r,o]=c.useState(""),[n,a]=c.useState(""),i=l=>{l.preventDefault();const d=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(r);a(d?"Thank you — we send one note a month.":"That address looks incomplete."),d&&o("")};return e.jsx("footer",{className:"section visit scrim",id:"visit",ref:l=>{t(l),s.current=l},"aria-labelledby":"visit-title",children:e.jsxs("div",{className:"shell",children:[e.jsxs("div",{className:"visit__grid",children:[e.jsxs("div",{children:[e.jsx("div",{className:"section__head",children:e.jsx("span",{className:"label",children:"Visit"})}),e.jsx("h2",{className:"visit__title",id:"visit-title",children:e.jsx(ve,{lines:["Kiln Lane,",e.jsxs(e.Fragment,{children:["from ",e.jsx("em",{children:"seven"})]})]})}),e.jsxs("p",{className:"lead","data-reveal":"fade","data-reveal-delay":.1,children:[z.address,". Two minutes from Hoxton overground, under the green awning. No laptops after eleven on weekends."]}),e.jsxs("form",{className:"subscribe",onSubmit:i,"data-reveal":"fade","data-reveal-delay":.2,children:[e.jsx("label",{className:"sr-only",htmlFor:"newsletter",children:"Email address"}),e.jsx("input",{id:"newsletter",type:"email",name:"email",placeholder:"Lot drops and pop-ups",autoComplete:"email",value:r,onChange:l=>o(l.target.value)}),e.jsx("button",{type:"submit","data-cursor":"Send",children:"Subscribe"})]}),e.jsx("p",{className:"subscribe__msg",role:"status",children:n})]}),e.jsxs("div",{className:"visit__cols","data-reveal":"fade","data-reveal-delay":.15,children:[e.jsxs("div",{className:"visit__col",children:[e.jsx("h4",{children:"Hours"}),e.jsx("ul",{children:gr.map(l=>e.jsxs("li",{children:[e.jsx("span",{children:l.day}),e.jsx("span",{children:l.time})]},l.day))})]}),e.jsxs("div",{className:"visit__col",children:[e.jsx("h4",{children:"Contact"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx("a",{href:`tel:${z.phone.replace(/\s/g,"")}`,"data-cursor":"Call",children:z.phone})}),e.jsx("li",{children:e.jsx("a",{href:`mailto:${z.email}`,"data-cursor":"Email",children:z.email})}),e.jsx("li",{children:e.jsx("a",{href:"https://maps.google.com/?q=Kiln+Lane+Shoreditch+London",target:"_blank",rel:"noreferrer","data-cursor":"Map",children:"Directions"})})]})]}),e.jsxs("div",{className:"visit__col",children:[e.jsx("h4",{children:"Elsewhere"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx("a",{href:"https://instagram.com",target:"_blank",rel:"noreferrer",children:"Instagram"})}),e.jsx("li",{children:e.jsx("a",{href:"https://open.spotify.com",target:"_blank",rel:"noreferrer",children:"Bar playlist"})}),e.jsx("li",{children:e.jsx("a",{href:"#origin",children:"Wholesale"})})]})]})]})]}),e.jsx("p",{className:"wordmark","data-reveal":"mask","aria-hidden":"true",children:"Ember & Oak"}),e.jsxs("div",{className:"colophon",children:[e.jsxs("span",{children:["© ",new Date().getFullYear()," ",z.name," — ",z.coords]}),e.jsx("span",{children:"Roasted on site, six days a week"}),e.jsxs("span",{className:"colophon__vbuild",children:["Crafted by"," ",e.jsxs("a",{href:"https://github.com/vbuildlanka-oss",target:"_blank",rel:"noreferrer",children:["VBUILD",e.jsx("sup",{children:"™"})]})]})]})]})})}function Nr(){const[t,s]=c.useState(!1),[r,o]=c.useState(!1);us(),c.useEffect(()=>{"scrollRestoration"in history&&(history.scrollRestoration="manual"),window.scrollTo(0,0),tt(!0)},[]);const n=c.useCallback(()=>s(!0),[]),a=c.useCallback(()=>{tt(!1),cs(!0),o(!0),de(),Z.refresh()},[]);return e.jsxs(e.Fragment,{children:[e.jsx("a",{className:"skip-link",href:"#menu",children:"Skip to the menu"}),e.jsx("div",{className:"scene","data-ready":t,"aria-hidden":"true",children:e.jsx(ws,{onFail:n,children:e.jsx(mr,{onReady:n})})}),e.jsx("div",{className:"scene-veil","aria-hidden":"true"}),e.jsx(hs,{}),e.jsx(xs,{}),e.jsx(ps,{}),e.jsx(vs,{}),e.jsxs("main",{className:"main",id:"top",children:[e.jsx(xr,{start:r}),e.jsx(yr,{}),e.jsx(br,{}),e.jsx(jr,{}),e.jsx(Mr,{}),e.jsx(Sr,{}),e.jsx(_r,{})]}),e.jsx(es,{ready:t,onDone:a})]})}const Rt=document.getElementById("root");if(!Rt)throw new Error("Missing #root");Ct.createRoot(Rt).render(e.jsx(Nr,{}));
