(()=>{var rx=Object.defineProperty;var ox=(s,t,e)=>t in s?rx(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var Ot=(s,t,e)=>ox(s,typeof t!="symbol"?t+"":t,e);var Am="1.3.27";function Pm(s,t,e){return Math.max(s,Math.min(t,e))}function ax(s,t,e){return(1-e)*s+e*t}function lx(s,t,e,i){return ax(s,t,1-Math.exp(-e*i))}function cx(s,t){return(s%t+t)%t}var hx=class{constructor(){Ot(this,"isRunning",!1);Ot(this,"value",0);Ot(this,"from",0);Ot(this,"to",0);Ot(this,"currentTime",0);Ot(this,"lerp");Ot(this,"duration");Ot(this,"easing");Ot(this,"onUpdate")}advance(s){if(!this.isRunning)return;let t=!1;if(this.duration&&this.easing){this.currentTime+=s;let e=Pm(0,this.currentTime/this.duration,1);t=e>=1;let i=t?1:this.easing(e);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=lx(this.value,this.to,this.lerp*60,s),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,t=!0)):(this.value=this.to,t=!0);t&&this.stop(),this.onUpdate?.(this.value,t)}stop(){this.isRunning=!1}fromTo(s,t,{lerp:e,duration:i,easing:n,onStart:r,onUpdate:o}){this.from=this.value=s,this.to=t,this.lerp=e,this.duration=i,this.easing=n,this.currentTime=0,this.isRunning=!0,r?.(),this.onUpdate=o}};function ux(s,t){let e;return function(...i){clearTimeout(e),e=setTimeout(()=>{e=void 0,s.apply(this,i)},t)}}var fx=class{constructor(s,t,{autoResize:e=!0,debounce:i=250}={}){Ot(this,"width",0);Ot(this,"height",0);Ot(this,"scrollHeight",0);Ot(this,"scrollWidth",0);Ot(this,"debouncedResize");Ot(this,"wrapperResizeObserver");Ot(this,"contentResizeObserver");Ot(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});Ot(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});Ot(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=s,this.content=t,e&&(this.debouncedResize=ux(this.resize,i),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Im=class{constructor(){Ot(this,"events",{})}emit(s,...t){let e=this.events[s]||[];for(let i=0,n=e.length;i<n;i++)e[i]?.(...t)}on(s,t){return this.events[s]?this.events[s].push(t):this.events[s]=[t],()=>{this.events[s]=this.events[s]?.filter(e=>t!==e)}}off(s,t){this.events[s]=this.events[s]?.filter(e=>t!==e)}destroy(){this.events={}}},dx=100/6,er={passive:!1};function Cm(s,t){return s===1?dx:s===2?t:1}var px=class{constructor(s,t={wheelMultiplier:1,touchMultiplier:1}){Ot(this,"touchStart",{x:0,y:0});Ot(this,"lastDelta",{x:0,y:0});Ot(this,"window",{width:0,height:0});Ot(this,"emitter",new Im);Ot(this,"onTouchStart",s=>{let{clientX:t,clientY:e}=s.targetTouches?s.targetTouches[0]:s;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:s})});Ot(this,"onTouchMove",s=>{let{clientX:t,clientY:e}=s.targetTouches?s.targetTouches[0]:s,i=-(t-this.touchStart.x)*this.options.touchMultiplier,n=-(e-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:i,y:n},this.emitter.emit("scroll",{deltaX:i,deltaY:n,event:s})});Ot(this,"onTouchEnd",s=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:s})});Ot(this,"onWheel",s=>{let{deltaX:t,deltaY:e,deltaMode:i}=s,n=Cm(i,this.window.width),r=Cm(i,this.window.height);t*=n,e*=r,t*=this.options.wheelMultiplier,e*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:e,event:s})});Ot(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=s,this.options=t,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,er),this.element.addEventListener("touchstart",this.onTouchStart,er),this.element.addEventListener("touchmove",this.onTouchMove,er),this.element.addEventListener("touchend",this.onTouchEnd,er)}on(s,t){return this.emitter.on(s,t)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,er),this.element.removeEventListener("touchstart",this.onTouchStart,er),this.element.removeEventListener("touchmove",this.onTouchMove,er),this.element.removeEventListener("touchend",this.onTouchEnd,er)}},Rm=s=>Math.min(1,1.001-2**(-10*s)),Lm=class{constructor({wrapper:s=window,content:t=document.documentElement,eventsTarget:e=s,smoothWheel:i=!0,syncTouch:n=!1,syncTouchLerp:r=.075,touchInertiaExponent:o=1.7,duration:a,easing:l,lerp:c=.1,infinite:h=!1,orientation:f="vertical",gestureOrientation:u=f==="horizontal"?"both":"vertical",touchMultiplier:d=1,wheelMultiplier:p=1,autoResize:m=!0,prevent:g,virtualScroll:_,overscroll:y=!0,autoRaf:E=!1,anchors:x=!1,autoToggle:b=!1,allowNestedScroll:M=!1,__experimental__naiveDimensions:T=!1,naiveDimensions:v=T,stopInertiaOnNavigate:w=!1,respectReducedMotion:C=!0}={}){Ot(this,"_isScrolling",!1);Ot(this,"_isStopped",!1);Ot(this,"_isLocked",!1);Ot(this,"_preventNextNativeScrollEvent",!1);Ot(this,"_resetVelocityTimeout",null);Ot(this,"_rafId",null);Ot(this,"_isDraggingSelection",!1);Ot(this,"reducedMotionMediaQuery",window.matchMedia("(prefers-reduced-motion: reduce)"));Ot(this,"isTouching");Ot(this,"isIos");Ot(this,"time",0);Ot(this,"userData",{});Ot(this,"lastVelocity",0);Ot(this,"velocity",0);Ot(this,"direction",0);Ot(this,"options");Ot(this,"targetScroll");Ot(this,"animatedScroll");Ot(this,"animate",new hx);Ot(this,"emitter",new Im);Ot(this,"dimensions");Ot(this,"virtualScroll");Ot(this,"onScrollEnd",s=>{s instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&s.stopPropagation()});Ot(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});Ot(this,"onTransitionEnd",s=>{s.propertyName?.includes("overflow")&&s.target===this.rootElement&&this.checkOverflow()});Ot(this,"onClick",s=>{let t=s.composedPath().filter(i=>i instanceof HTMLAnchorElement&&i.href).map(i=>new URL(i.href)),e=new URL(window.location.href);if(this.options.anchors){let i=t.find(n=>e.host===n.host&&e.pathname===n.pathname&&n.hash);if(i){let n=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,r=decodeURIComponent(i.hash);this.scrollTo(r,n);return}}if(this.options.stopInertiaOnNavigate&&t.some(i=>e.host===i.host&&e.pathname!==i.pathname)){this.reset();return}});Ot(this,"onPointerDown",s=>{s.button===1&&this.reset()});Ot(this,"onVirtualScroll",s=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(s)===!1)return;let{deltaX:t,deltaY:e,event:i}=s;if(this.emitter.emit("virtual-scroll",{deltaX:t,deltaY:e,event:i}),i.ctrlKey||i.lenisStopPropagation)return;let n=i.type.includes("touch"),r=i.type.includes("wheel");if(n&&this.isIos&&(i.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(i)),this._isDraggingSelection)){i.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=i.type==="touchstart"||i.type==="touchmove";let o=t===0&&e===0;if(this.options.syncTouch&&n&&i.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}let a=this.options.gestureOrientation==="vertical"&&e===0||this.options.gestureOrientation==="horizontal"&&t===0;if(o||a)return;let l=i.composedPath();l=l.slice(0,l.indexOf(this.rootElement));let c=this.options.prevent,h=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";if(l.find(p=>p instanceof HTMLElement&&(typeof c=="function"&&c?.(p)||p.hasAttribute?.("data-lenis-prevent")||h==="vertical"&&p.hasAttribute?.("data-lenis-prevent-vertical")||h==="horizontal"&&p.hasAttribute?.("data-lenis-prevent-horizontal")||n&&p.hasAttribute?.("data-lenis-prevent-touch")||r&&p.hasAttribute?.("data-lenis-prevent-wheel")||this.options.allowNestedScroll&&this.hasNestedScroll(p,{deltaX:t,deltaY:e}))))return;if(this.isStopped||this.isLocked){i.cancelable&&i.preventDefault();return}if(!(this.options.syncTouch&&n||this.options.smoothWheel&&r)){this.isScrolling="native",this.animate.stop(),i.lenisStopPropagation=!0;return}let f=e;this.options.gestureOrientation==="both"?f=Math.abs(e)>Math.abs(t)?e:t:this.options.gestureOrientation==="horizontal"&&(f=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&e>0||this.animatedScroll===this.limit&&e<0))&&(i.lenisStopPropagation=!0),i.cancelable&&i.preventDefault();let u=n&&this.options.syncTouch,d=n&&i.type==="touchend";d&&(f=Math.sign(f)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+f,{programmatic:!1,...u?{lerp:d?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});Ot(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){let s=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-s,this.direction=Math.sign(this.animatedScroll-s),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});Ot(this,"raf",s=>{let t=s-(this.time||s);this.time=s,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))});window.lenisVersion=Am,window.lenis||(window.lenis={}),window.lenis.version=Am,f==="horizontal"&&(window.lenis.horizontal=!0),n===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!s||s===document.documentElement)&&(s=window),typeof a=="number"&&typeof l!="function"?l=Rm:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:s,content:t,eventsTarget:e,smoothWheel:i,syncTouch:n,syncTouchLerp:r,touchInertiaExponent:o,duration:a,easing:l,lerp:c,infinite:h,gestureOrientation:u,orientation:f,touchMultiplier:d,wheelMultiplier:p,autoResize:m,prevent:g,virtualScroll:_,overscroll:y,autoRaf:E,anchors:x,autoToggle:b,allowNestedScroll:M,naiveDimensions:v,stopInertiaOnNavigate:w,respectReducedMotion:C},this.dimensions=new fx(s,t,{autoResize:m}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new px(e,{touchMultiplier:d,wheelMultiplier:p}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(s,t){return this.emitter.on(s,t)}off(s,t){return this.emitter.off(s,t)}get overflow(){let s=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[s]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}setScroll(s){this.isHorizontal?this.options.wrapper.scrollTo({left:s,behavior:"instant"}):this.options.wrapper.scrollTo({top:s,behavior:"instant"})}isTouchOnSelectionHandle(s){let t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return!1;let e=s.targetTouches[0]??s.changedTouches[0];if(!e)return!1;let i=t.getRangeAt(0).getClientRects();if(i.length===0)return!1;let n=i[0],r=i[i.length-1],o=40,a=Math.hypot(e.clientX-n.left,e.clientY-n.top)<=o,l=Math.hypot(e.clientX-r.right,e.clientY-r.bottom)<=o;return a||l}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(s,{offset:t=0,immediate:e=!1,lock:i=!1,programmatic:n=!0,lerp:r=n?this.options.lerp:void 0,duration:o=n?this.options.duration:void 0,easing:a=n?this.options.easing:void 0,onStart:l,onComplete:c,force:h=!1,userData:f}={}){if(this.prefersReducedMotion&&(n?e=!0:(r=1,o=void 0,a=void 0)),(this.isStopped||this.isLocked)&&!h)return;let u=s,d=t;if(typeof u=="string"&&["top","left","start","#"].includes(u))u=0;else if(typeof u=="string"&&["bottom","right","end"].includes(u))u=this.limit;else{let p=null;if(typeof u=="string"?(p=u.startsWith("#")?document.getElementById(u.slice(1)):document.querySelector(u),p||(u==="#top"?u=0:console.warn("Lenis: Target not found",u))):u instanceof Element&&(p=u),p){if(this.options.wrapper!==window){let x=this.rootElement.getBoundingClientRect();d-=this.isHorizontal?x.left:x.top}let m=p.getBoundingClientRect(),g=getComputedStyle(p),_=this.isHorizontal?Number.parseFloat(g.scrollMarginLeft):Number.parseFloat(g.scrollMarginTop),y=getComputedStyle(this.rootElement),E=this.isHorizontal?Number.parseFloat(y.scrollPaddingLeft):Number.parseFloat(y.scrollPaddingTop);u=(this.isHorizontal?m.left:m.top)+this.animatedScroll-(Number.isNaN(_)?0:_)-(Number.isNaN(E)?0:E)}}if(typeof u=="number"){if(u+=d,this.options.infinite){if(n){this.targetScroll=this.animatedScroll=this.scroll;let p=u-this.animatedScroll;p>this.limit/2?u-=this.limit:p<-this.limit/2&&(u+=this.limit)}}else u=Pm(0,u,this.limit);if(u===this.targetScroll){l?.(this),c?.(this);return}if(this.userData=f??{},e){this.animatedScroll=this.targetScroll=u,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}n||(this.targetScroll=u),typeof o=="number"&&typeof a!="function"?a=Rm:typeof a=="function"&&typeof o!="number"&&(o=1),this.animate.fromTo(this.animatedScroll,u,{duration:o,easing:a,lerp:r,onStart:()=>{i&&(this.isLocked=!0),this.isScrolling="smooth",l?.(this)},onUpdate:(p,m)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=p-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=p,this.setScroll(this.scroll),n&&(this.targetScroll=p),m||this.emit(),m&&(this.reset(),this.emit(),c?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(s,{deltaX:t,deltaY:e}){let i=Date.now();s._lenis||(s._lenis={});let n=s._lenis,r,o,a,l,c,h,f,u,d,p;if(i-(n.time??0)>2e3){n.time=Date.now();let M=window.getComputedStyle(s);if(n.computedStyle=M,r=["auto","overlay","scroll"].includes(M.overflowX),o=["auto","overlay","scroll"].includes(M.overflowY),c=["auto"].includes(M.overscrollBehaviorX),h=["auto"].includes(M.overscrollBehaviorY),n.hasOverflowX=r,n.hasOverflowY=o,!(r||o))return!1;f=s.scrollWidth,u=s.scrollHeight,d=s.clientWidth,p=s.clientHeight,a=f>d,l=u>p,n.isScrollableX=a,n.isScrollableY=l,n.scrollWidth=f,n.scrollHeight=u,n.clientWidth=d,n.clientHeight=p,n.hasOverscrollBehaviorX=c,n.hasOverscrollBehaviorY=h}else a=n.isScrollableX,l=n.isScrollableY,r=n.hasOverflowX,o=n.hasOverflowY,f=n.scrollWidth,u=n.scrollHeight,d=n.clientWidth,p=n.clientHeight,c=n.hasOverscrollBehaviorX,h=n.hasOverscrollBehaviorY;if(!(r&&a||o&&l))return!1;let m=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical",g,_,y,E,x,b;if(m==="horizontal")g=Math.round(s.scrollLeft),_=f-d,y=t,E=r,x=a,b=c;else if(m==="vertical")g=Math.round(s.scrollTop),_=u-p,y=e,E=o,x=l,b=h;else return!1;return!b&&(g>=_||g<=0)?!0:(y>0?g<_:g>0)&&E&&x}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){let s=this.options.wrapper;return this.isHorizontal?s.scrollX??s.scrollLeft:s.scrollY??s.scrollTop}get scroll(){return this.options.infinite?cx(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(s){this._isScrolling!==s&&(this._isScrolling=s,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(s){this._isStopped!==s&&(this._isStopped=s,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(s){this._isLocked!==s&&(this._isLocked=s,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let s="lenis";return this.options.autoToggle&&(s+=" lenis-autoToggle"),this.isStopped&&(s+=" lenis-stopped"),this.isLocked&&(s+=" lenis-locked"),this.isScrolling&&(s+=" lenis-scrolling"),this.isScrolling==="smooth"&&(s+=" lenis-smooth"),s}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(s=>{this.rootElement.classList.add(s)})}cleanUpClassName(){for(let s of Array.from(this.rootElement.classList))(s==="lenis"||s.startsWith("lenis-"))&&this.rootElement.classList.remove(s)}};function Is(s){if(s===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return s}function Hm(s,t){s.prototype=Object.create(t.prototype),s.prototype.constructor=s,s.__proto__=t}var yn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Xa={duration:.5,overwrite:!1,delay:0},Zf,Ni,Ye,Gn=1e8,Be=1/Gn,Bf=Math.PI*2,mx=Bf/4,gx=0,Vm=Math.sqrt,_x=Math.cos,vx=Math.sin,yi=function(t){return typeof t=="string"},ti=function(t){return typeof t=="function"},Ds=function(t){return typeof t=="number"},Pc=function(t){return typeof t>"u"},vs=function(t){return typeof t=="object"},xn=function(t){return t!==!1},Kf=function(){return typeof window<"u"},Sc=function(t){return ti(t)||yi(t)},Gm=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Vi=Array.isArray,xx=/random\([^)]+\)/g,yx=/,\s*/g,Dm=/(?:-?\.?\d|\.)+/gi,Jf=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Fr=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,If=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,$f=/[+-]=-?[.\d]+/,Sx=/[^,'"\[\]\s]+/gi,Mx=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Je,gs,kf,jf,Rn={},Tc={},Wm,Xm=function(t){return(Tc=wo(t,Rn))&&Gi},Ic=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},Ya=function(t,e){return!e&&console.warn(t)},Ym=function(t,e){return t&&(Rn[t]=e)&&Tc&&(Tc[t]=e)||Rn},qa=function(){return 0},bx={suppressEvents:!0,isStart:!0,kill:!1},Mc={suppressEvents:!0,kill:!1},wx={suppressEvents:!0},Qf={},nr=[],zf={},qm,_n={},Lf={},Nm=30,bc=[],td="",ed=function(t){var e=t[0],i,n;if(vs(e)||ti(e)||(t=[t]),!(i=(e._gsap||{}).harness)){for(n=bc.length;n--&&!bc[n].targetTest(e););i=bc[n]}for(n=t.length;n--;)t[n]&&(t[n]._gsap||(t[n]._gsap=new rd(t[n],i)))||t.splice(n,1);return t},sr=function(t){return t._gsap||ed(Wn(t))[0]._gsap},id=function(t,e,i){return(i=t[e])&&ti(i)?t[e]():Pc(i)&&t.getAttribute&&t.getAttribute(e)||i},rn=function(t,e){return(t=t.split(",")).forEach(e)||t},ei=function(t){return Math.round(t*1e5)/1e5||0},Ke=function(t){return Math.round(t*1e7)/1e7||0},Or=function(t,e){var i=e.charAt(0),n=parseFloat(e.substr(2));return t=parseFloat(t),i==="+"?t+n:i==="-"?t-n:i==="*"?t*n:t/n},Tx=function(t,e){for(var i=e.length,n=0;t.indexOf(e[n])<0&&++n<i;);return n<i},Ec=function(){var t=nr.length,e=nr.slice(0),i,n;for(zf={},nr.length=0,i=0;i<t;i++)n=e[i],n&&n._lazy&&(n.render(n._lazy[0],n._lazy[1],!0)._lazy=0)},nd=function(t){return!!(t._initted||t._startAt||t.add)},Zm=function(t,e,i,n){nr.length&&!Ni&&Ec(),t.render(e,i,n||!!(Ni&&e<0&&nd(t))),nr.length&&!Ni&&Ec()},Km=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(Sx).length<2?e:yi(t)?t.trim():t},Jm=function(t){return t},Pn=function(t,e){for(var i in e)i in t||(t[i]=e[i]);return t},Ex=function(t){return function(e,i){for(var n in i)n in e||n==="duration"&&t||n==="ease"||(e[n]=i[n])}},wo=function(t,e){for(var i in e)t[i]=e[i];return t},Um=function s(t,e){for(var i in e)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(t[i]=vs(e[i])?s(t[i]||(t[i]={}),e[i]):e[i]);return t},Ac=function(t,e){var i={},n;for(n in t)n in e||(i[n]=t[n]);return i},Va=function(t){var e=t.parent||Je,i=t.keyframes?Ex(Vi(t.keyframes)):Pn;if(xn(t.inherit))for(;e;)i(t,e.vars.defaults),e=e.parent||e._dp;return t},Ax=function(t,e){for(var i=t.length,n=i===e.length;n&&i--&&t[i]===e[i];);return i<0},$m=function(t,e,i,n,r){i===void 0&&(i="_first"),n===void 0&&(n="_last");var o=t[n],a;if(r)for(a=e[r];o&&o[r]>a;)o=o._prev;return o?(e._next=o._next,o._next=e):(e._next=t[i],t[i]=e),e._next?e._next._prev=e:t[n]=e,e._prev=o,e.parent=e._dp=t,e},Lc=function(t,e,i,n){i===void 0&&(i="_first"),n===void 0&&(n="_last");var r=e._prev,o=e._next;r?r._next=o:t[i]===e&&(t[i]=o),o?o._prev=r:t[n]===e&&(t[n]=r),e._next=e._prev=e.parent=null},rr=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},Dr=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var i=t;i;)i._dirty=1,i=i.parent;return t},Cx=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},Hf=function(t,e,i,n){return t._startAt&&(Ni?t._startAt.revert(Mc):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,n))},Rx=function s(t){return!t||t._ts&&s(t.parent)},Fm=function(t){return t._repeat?To(t._tTime,t=t.duration()+t._rDelay)*t:0},To=function(t,e){var i=Math.floor(t=Ke(t/e));return t&&i===t?i-1:i},Cc=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},Dc=function(t){return t._end=Ke(t._start+(t._tDur/Math.abs(t._ts||t._rts||Be)||0))},Nc=function(t,e){var i=t._dp;return i&&i.smoothChildTiming&&t._ts&&(t._start=Ke(i._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),Dc(t),i._dirty||Dr(i,t)),t},jm=function(t,e){var i;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(i=Cc(t.rawTime(),e),(!e._dur||Ja(0,e.totalDuration(),i)-e._tTime>Be)&&e.render(i,!0)),Dr(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(i=t;i._dp;)i.rawTime()>=0&&i.totalTime(i._tTime),i=i._dp;t._zTime=-Be}},_s=function(t,e,i,n){return e.parent&&rr(e),e._start=Ke((Ds(i)?i:i||t!==Je?Vn(t,i,e):t._time)+e._delay),e._end=Ke(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),$m(t,e,"_first","_last",t._sort?"_start":0),Vf(e)||(t._recent=e),n||jm(t,e),t._ts<0&&Nc(t,t._tTime),t},Qm=function(t,e){return(Rn.ScrollTrigger||Ic("scrollTrigger",e))&&Rn.ScrollTrigger.create(e,t)},t0=function(t,e,i,n,r){if(ld(t,e,r),!t._initted)return 1;if(!i&&t._pt&&!Ni&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&qm!==vn.frame)return nr.push(t),t._lazy=[r,n],1},Px=function s(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||s(e))},Vf=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},Ix=function(t,e,i,n){var r=t.ratio,o=e<0||!e&&(!t._start&&Px(t)&&!(!t._initted&&Vf(t))||(t._ts<0||t._dp._ts<0)&&!Vf(t))?0:1,a=t._rDelay,l=0,c,h,f;if(a&&t._repeat&&(l=Ja(0,t._tDur,e),h=To(l,a),t._yoyo&&h&1&&(o=1-o),h!==To(t._tTime,a)&&(r=1-o,t.vars.repeatRefresh&&t._initted&&t.invalidate())),o!==r||Ni||n||t._zTime===Be||!e&&t._zTime){if(!t._initted&&t0(t,e,n,i,l))return;for(f=t._zTime,t._zTime=e||(i?Be:0),i||(i=e&&!f),t.ratio=o,t._from&&(o=1-o),t._time=0,t._tTime=l,c=t._pt;c;)c.r(o,c.d),c=c._next;e<0&&Hf(t,e,i,!0),t._onUpdate&&!i&&Cn(t,"onUpdate"),l&&t._repeat&&!i&&t.parent&&Cn(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===o&&(o&&rr(t,1),!i&&!Ni&&(Cn(t,o?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},Lx=function(t,e,i){var n;if(i>e)for(n=t._first;n&&n._start<=i;){if(n.data==="isPause"&&n._start>e)return n;n=n._next}else for(n=t._last;n&&n._start>=i;){if(n.data==="isPause"&&n._start<e)return n;n=n._prev}},Eo=function(t,e,i,n){var r=t._repeat,o=Ke(e)||0,a=t._tTime/t._tDur;return a&&!n&&(t._time*=o/t._dur),t._dur=o,t._tDur=r?r<0?1e10:Ke(o*(r+1)+t._rDelay*r):o,a>0&&!n&&Nc(t,t._tTime=t._tDur*a),t.parent&&Dc(t),i||Dr(t.parent,t),t},Om=function(t){return t instanceof Hi?Dr(t):Eo(t,t._dur)},Dx={_start:0,endTime:qa,totalDuration:qa},Vn=function s(t,e,i){var n=t.labels,r=t._recent||Dx,o=t.duration()>=Gn?r.endTime(!1):t._dur,a,l,c;return yi(e)&&(isNaN(e)||e in n)?(l=e.charAt(0),c=e.substr(-1)==="%",a=e.indexOf("="),l==="<"||l===">"?(a>=0&&(e=e.replace(/=/,"")),(l==="<"?r._start:r.endTime(r._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(a<0?r:i).totalDuration()/100:1)):a<0?(e in n||(n[e]=o),n[e]):(l=parseFloat(e.charAt(a-1)+e.substr(a+1)),c&&i&&(l=l/100*(Vi(i)?i[0]:i).totalDuration()),a>1?s(t,e.substr(0,a-1),i)+l:o+l)):e==null?o:+e},Ga=function(t,e,i){var n=Ds(e[1]),r=(n?2:1)+(t<2?0:1),o=e[r],a,l;if(n&&(o.duration=e[1]),o.parent=i,t){for(a=o,l=i;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=xn(l.vars.inherit)&&l.parent;o.immediateRender=xn(a.immediateRender),t<2?o.runBackwards=1:o.startAt=e[r-1]}return new ai(e[0],o,e[r+1])},or=function(t,e){return t||t===0?e(t):e},Ja=function(t,e,i){return i<t?t:i>e?e:i},Ui=function(t,e){return!yi(t)||!(e=Mx.exec(t))?"":e[1]},Nx=function(t,e,i){return or(i,function(n){return Ja(t,e,n)})},Gf=[].slice,e0=function(t,e){return t&&vs(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&vs(t[0]))&&!t.nodeType&&t!==gs},Ux=function(t,e,i){return i===void 0&&(i=[]),t.forEach(function(n){var r;return yi(n)&&!e||e0(n,1)?(r=i).push.apply(r,Wn(n)):i.push(n)})||i},Wn=function(t,e,i){return Ye&&!e&&Ye.selector?Ye.selector(t):yi(t)&&!i&&(kf||!Ao())?Gf.call((e||jf).querySelectorAll(t),0):Vi(t)?Ux(t,i):e0(t)?Gf.call(t,0):t?[t]:[]},Wf=function(t){return t=Wn(t)[0]||Ya("Invalid scope")||{},function(e){var i=t.current||t.nativeElement||t;return Wn(e,i.querySelectorAll?i:i===t?Ya("Invalid scope")||jf.createElement("div"):t)}},i0=function(t){return t.sort(function(){return .5-Math.random()})},n0=function(t){if(ti(t))return t;var e=vs(t)?t:{each:t},i=Nr(e.ease),n=e.from||0,r=parseFloat(e.base)||0,o={},a=n>0&&n<1,l=isNaN(n)||a,c=e.axis,h=n,f=n;return yi(n)?h=f={center:.5,edges:.5,end:1}[n]||0:!a&&l&&(h=n[0],f=n[1]),function(u,d,p){var m=(p||e).length,g=o[m],_,y,E,x,b,M,T,v,w;if(!g){if(w=e.grid==="auto"?0:(e.grid||[1,Gn])[1],!w){for(T=-Gn;T<(T=p[w++].getBoundingClientRect().left)&&w<m;);w<m&&w--}for(g=o[m]=[],_=l?Math.min(w,m)*h-.5:n%w,y=w===Gn?0:l?m*f/w-.5:n/w|0,T=0,v=Gn,M=0;M<m;M++)E=M%w-_,x=y-(M/w|0),g[M]=b=c?Math.abs(c==="y"?x:E):Vm(E*E+x*x),b>T&&(T=b),b<v&&(v=b);n==="random"&&i0(g),g.max=T-v,g.min=v,g.v=m=(parseFloat(e.amount)||parseFloat(e.each)*(w>m?m-1:c?c==="y"?m/w:w:Math.max(w,m/w))||0)*(n==="edges"?-1:1),g.b=m<0?r-m:r,g.u=Ui(e.amount||e.each)||0,i=i&&m<0?Zx(i):i}return m=(g[u]-g.min)/g.max||0,Ke(g.b+(i?i(m):m)*g.v)+g.u}},Xf=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(i){var n=Ke(Math.round(parseFloat(i)/t)*t*e);return(n-n%1)/e+(Ds(i)?0:Ui(i))}},s0=function(t,e){var i=Vi(t),n,r;return!i&&vs(t)&&(n=i=t.radius||Gn,t.values?(t=Wn(t.values),(r=!Ds(t[0]))&&(n*=n)):t=Xf(t.increment)),or(e,i?ti(t)?function(o){return r=t(o),Math.abs(r-o)<=n?r:o}:function(o){for(var a=parseFloat(r?o.x:o),l=parseFloat(r?o.y:0),c=Gn,h=0,f=t.length,u,d;f--;)r?(u=t[f].x-a,d=t[f].y-l,u=u*u+d*d):u=Math.abs(t[f]-a),u<c&&(c=u,h=f);return h=!n||c<=n?t[h]:o,r||h===o||Ds(o)?h:h+Ui(o)}:Xf(t))},r0=function(t,e,i,n){return or(Vi(t)?!e:i===!0?!!(i=0):!n,function(){return Vi(t)?t[~~(Math.random()*t.length)]:(i=i||1e-5)&&(n=i<1?Math.pow(10,(i+"").length-2):1)&&Math.floor(Math.round((t-i/2+Math.random()*(e-t+i*.99))/i)*i*n)/n})},Fx=function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];return function(n){return e.reduce(function(r,o){return o(r)},n)}},Ox=function(t,e){return function(i){return t(parseFloat(i))+(e||Ui(i))}},Bx=function(t,e,i){return a0(t,e,0,1,i)},o0=function(t,e,i){return or(i,function(n){return t[~~e(n)]})},kx=function s(t,e,i){var n=e-t;return Vi(t)?o0(t,s(0,t.length),e):or(i,function(r){return(n+(r-t)%n)%n+t})},zx=function s(t,e,i){var n=e-t,r=n*2;return Vi(t)?o0(t,s(0,t.length-1),e):or(i,function(o){return o=(r+(o-t)%r)%r||0,t+(o>n?r-o:o)})},Co=function(t){return t.replace(xx,function(e){var i=e.indexOf("[")+1,n=e.substring(i||7,i?e.indexOf("]"):e.length-1).split(yx);return r0(i?n:+n[0],i?0:+n[1],+n[2]||1e-5)})},a0=function(t,e,i,n,r){var o=e-t,a=n-i;return or(r,function(l){return i+((l-t)/o*a||0)})},Hx=function s(t,e,i,n){var r=isNaN(t+e)?0:function(d){return(1-d)*t+d*e};if(!r){var o=yi(t),a={},l,c,h,f,u;if(i===!0&&(n=1)&&(i=null),o)t={p:t},e={p:e};else if(Vi(t)&&!Vi(e)){for(h=[],f=t.length,u=f-2,c=1;c<f;c++)h.push(s(t[c-1],t[c]));f--,r=function(p){p*=f;var m=Math.min(u,~~p);return h[m](p-m)},i=e}else n||(t=wo(Vi(t)?[]:{},t));if(!h){for(l in e)od.call(a,t,l,"get",e[l]);r=function(p){return ud(p,a)||(o?t.p:t)}}}return or(i,r)},Bm=function(t,e,i){var n=t.labels,r=Gn,o,a,l;for(o in n)a=n[o]-e,a<0==!!i&&a&&r>(a=Math.abs(a))&&(l=o,r=a);return l},Cn=function(t,e,i){var n=t.vars,r=n[e],o=Ye,a=t._ctx,l,c,h;if(r)return l=n[e+"Params"],c=n.callbackScope||t,i&&nr.length&&Ec(),a&&(Ye=a),h=l?r.apply(c,l):r.call(c),Ye=o,h},za=function(t){return rr(t),t.scrollTrigger&&t.scrollTrigger.kill(!!Ni),t.progress()<1&&Cn(t,"onInterrupt"),t},bo,l0=[],c0=function(t){if(t)if(t=!t.name&&t.default||t,Kf()||t.headless){var e=t.name,i=ti(t),n=e&&!i&&t.init?function(){this._props=[]}:t,r={init:qa,render:ud,add:od,kill:sy,modifier:ny,rawVars:0},o={targetTest:0,get:0,getSetter:Uc,aliases:{},register:0};if(Ao(),t!==n){if(_n[e])return;Pn(n,Pn(Ac(t,r),o)),wo(n.prototype,wo(r,Ac(t,o))),_n[n.prop=e]=n,t.targetTest&&(bc.push(n),Qf[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}Ym(e,n),t.register&&t.register(Gi,n,on)}else l0.push(t)},Oe=255,Ha={aqua:[0,Oe,Oe],lime:[0,Oe,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Oe],navy:[0,0,128],white:[Oe,Oe,Oe],olive:[128,128,0],yellow:[Oe,Oe,0],orange:[Oe,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Oe,0,0],pink:[Oe,192,203],cyan:[0,Oe,Oe],transparent:[Oe,Oe,Oe,0]},Df=function(t,e,i){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(i-e)*t*6:t<.5?i:t*3<2?e+(i-e)*(2/3-t)*6:e)*Oe+.5|0},h0=function(t,e,i){var n=t?Ds(t)?[t>>16,t>>8&Oe,t&Oe]:0:Ha.black,r,o,a,l,c,h,f,u,d,p;if(!n){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),Ha[t])n=Ha[t];else if(t.charAt(0)==="#"){if(t.length<6&&(r=t.charAt(1),o=t.charAt(2),a=t.charAt(3),t="#"+r+r+o+o+a+a+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return n=parseInt(t.substr(1,6),16),[n>>16,n>>8&Oe,n&Oe,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),n=[t>>16,t>>8&Oe,t&Oe]}else if(t.substr(0,3)==="hsl"){if(n=p=t.match(Dm),!e)l=+n[0]%360/360,c=+n[1]/100,h=+n[2]/100,o=h<=.5?h*(c+1):h+c-h*c,r=h*2-o,n.length>3&&(n[3]*=1),n[0]=Df(l+1/3,r,o),n[1]=Df(l,r,o),n[2]=Df(l-1/3,r,o);else if(~t.indexOf("="))return n=t.match(Jf),i&&n.length<4&&(n[3]=1),n}else n=t.match(Dm)||Ha.transparent;n=n.map(Number)}return e&&!p&&(r=n[0]/Oe,o=n[1]/Oe,a=n[2]/Oe,f=Math.max(r,o,a),u=Math.min(r,o,a),h=(f+u)/2,f===u?l=c=0:(d=f-u,c=h>.5?d/(2-f-u):d/(f+u),l=f===r?(o-a)/d+(o<a?6:0):f===o?(a-r)/d+2:(r-o)/d+4,l*=60),n[0]=~~(l+.5),n[1]=~~(c*100+.5),n[2]=~~(h*100+.5)),i&&n.length<4&&(n[3]=1),n},u0=function(t){var e=[],i=[],n=-1;return t.split(Ls).forEach(function(r){var o=r.match(Fr)||[];e.push.apply(e,o),i.push(n+=o.length+1)}),e.c=i,e},km=function(t,e,i){var n="",r=(t+n).match(Ls),o=e?"hsla(":"rgba(",a=0,l,c,h,f;if(!r)return t;if(r=r.map(function(u){return(u=h0(u,e,1))&&o+(e?u[0]+","+u[1]+"%,"+u[2]+"%,"+u[3]:u.join(","))+")"}),i&&(h=u0(t),l=i.c,l.join(n)!==h.c.join(n)))for(c=t.replace(Ls,"1").split(Fr),f=c.length-1;a<f;a++)n+=c[a]+(~l.indexOf(a)?r.shift()||o+"0,0,0,0)":(h.length?h:r.length?r:i).shift());if(!c)for(c=t.split(Ls),f=c.length-1;a<f;a++)n+=c[a]+r[a];return n+c[f]},Ls=(function(){var s="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in Ha)s+="|"+t+"\\b";return new RegExp(s+")","gi")})(),Vx=/hsl[a]?\(/,sd=function(t){var e=t.join(" "),i;if(Ls.lastIndex=0,Ls.test(e))return i=Vx.test(e),t[1]=km(t[1],i),t[0]=km(t[0],i,u0(t[1])),!0},Za,vn=(function(){var s=Date.now,t=500,e=33,i=s(),n=i,r=1e3/240,o=r,a=[],l,c,h,f,u,d,p=function m(g){var _=s()-n,y=g===!0,E,x,b,M;if((_>t||_<0)&&(i+=_-e),n+=_,b=n-i,E=b-o,(E>0||y)&&(M=++f.frame,u=b-f.time*1e3,f.time=b=b/1e3,o+=E+(E>=r?4:r-E),x=1),y||(l=c(m)),x)for(d=0;d<a.length;d++)a[d](b,u,M,g)};return f={time:0,frame:0,tick:function(){p(!0)},deltaRatio:function(g){return u/(1e3/(g||60))},wake:function(){Wm&&(!kf&&Kf()&&(gs=kf=window,jf=gs.document||{},Rn.gsap=Gi,(gs.gsapVersions||(gs.gsapVersions=[])).push(Gi.version),Xm(Tc||gs.GreenSockGlobals||!gs.gsap&&gs||{}),l0.forEach(c0)),h=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&f.sleep(),c=h||function(g){return setTimeout(g,o-f.time*1e3+1|0)},Za=1,p(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(l),Za=0,c=qa},lagSmoothing:function(g,_){t=g||1/0,e=Math.min(_||33,t)},fps:function(g){r=1e3/(g||240),o=f.time*1e3+r},add:function(g,_,y){var E=_?function(x,b,M,T){g(x,b,M,T),f.remove(E)}:g;return f.remove(g),a[y?"unshift":"push"](E),Ao(),E},remove:function(g,_){~(_=a.indexOf(g))&&a.splice(_,1)&&d>=_&&d--},_listeners:a},f})(),Ao=function(){return!Za&&vn.wake()},xe={},Gx=/^[\d.\-M][\d.\-,\s]/,Wx=/["']/g,Xx=function(t){for(var e={},i=t.substr(1,t.length-3).split(":"),n=i[0],r=1,o=i.length,a,l,c;r<o;r++)l=i[r],a=r!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),e[n]=isNaN(c)?c.replace(Wx,"").trim():+c,n=l.substr(a+1).trim();return e},Yx=function(t){var e=t.indexOf("(")+1,i=t.indexOf(")"),n=t.indexOf("(",e);return t.substring(e,~n&&n<i?t.indexOf(")",i+1):i)},qx=function(t){var e=(t+"").split("("),i=xe[e[0]];return i&&e.length>1&&i.config?i.config.apply(null,~t.indexOf("{")?[Xx(e[1])]:Yx(t).split(",").map(Km)):xe._CE&&Gx.test(t)?xe._CE("",t):i},Zx=function(t){return function(e){return 1-t(1-e)}},Nr=function(t,e){return t&&(ti(t)?t:xe[t]||qx(t))||e},Br=function(t,e,i,n){i===void 0&&(i=function(l){return 1-e(1-l)}),n===void 0&&(n=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var r={easeIn:e,easeOut:i,easeInOut:n},o;return rn(t,function(a){xe[a]=Rn[a]=r,xe[o=a.toLowerCase()]=i;for(var l in r)xe[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=xe[a+"."+l]=r[l]}),r},f0=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},Nf=function s(t,e,i){var n=e>=1?e:1,r=(i||(t?.3:.45))/(e<1?e:1),o=r/Bf*(Math.asin(1/n)||0),a=function(h){return h===1?1:n*Math.pow(2,-10*h)*vx((h-o)*r)+1},l=t==="out"?a:t==="in"?function(c){return 1-a(1-c)}:f0(a);return r=Bf/r,l.config=function(c,h){return s(t,c,h)},l},Uf=function s(t,e){e===void 0&&(e=1.70158);var i=function(o){return o?--o*o*((e+1)*o+e)+1:0},n=t==="out"?i:t==="in"?function(r){return 1-i(1-r)}:f0(i);return n.config=function(r){return s(t,r)},n};rn("Linear,Quad,Cubic,Quart,Quint,Strong",function(s,t){var e=t<5?t+1:t;Br(s+",Power"+(e-1),t?function(i){return Math.pow(i,e)}:function(i){return i},function(i){return 1-Math.pow(1-i,e)},function(i){return i<.5?Math.pow(i*2,e)/2:1-Math.pow((1-i)*2,e)/2})});xe.Linear.easeNone=xe.none=xe.Linear.easeIn;Br("Elastic",Nf("in"),Nf("out"),Nf());(function(s,t){var e=1/t,i=2*e,n=2.5*e,r=function(a){return a<e?s*a*a:a<i?s*Math.pow(a-1.5/t,2)+.75:a<n?s*(a-=2.25/t)*a+.9375:s*Math.pow(a-2.625/t,2)+.984375};Br("Bounce",function(o){return 1-r(1-o)},r)})(7.5625,2.75);Br("Expo",function(s){return Math.pow(2,10*(s-1))*s+s*s*s*s*s*s*(1-s)});Br("Circ",function(s){return-(Vm(1-s*s)-1)});Br("Sine",function(s){return s===1?1:-_x(s*mx)+1});Br("Back",Uf("in"),Uf("out"),Uf());xe.SteppedEase=xe.steps=Rn.SteppedEase={config:function(t,e){t===void 0&&(t=1);var i=1/t,n=t+(e?0:1),r=e?1:0,o=1-Be;return function(a){return((n*Ja(0,o,a)|0)+r)*i}}};Xa.ease=xe["quad.out"];rn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(s){return td+=s+","+s+"Params,"});var rd=function(t,e){this.id=gx++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:id,this.set=e?e.getSetter:Uc},Ka=(function(){function s(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,Eo(this,+e.duration,1,1),this.data=e.data,Ye&&(this._ctx=Ye,Ye.data.push(this)),Za||vn.wake()}var t=s.prototype;return t.delay=function(i){return i||i===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+i-this._delay),this._delay=i,this):this._delay},t.duration=function(i){return arguments.length?this.totalDuration(this._repeat>0?i+(i+this._rDelay)*this._repeat:i):this.totalDuration()&&this._dur},t.totalDuration=function(i){return arguments.length?(this._dirty=0,Eo(this,this._repeat<0?i:(i-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(i,n){if(Ao(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(Nc(this,i),!r._dp||r.parent||jm(r,this);r&&r.parent;)r.parent._time!==r._start+(r._ts>=0?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&i<this._tDur||this._ts<0&&i>0||!this._tDur&&!i)&&_s(this._dp,this,this._start-this._delay)}return(this._tTime!==i||!this._dur&&!n||this._initted&&Math.abs(this._zTime)===Be||!this._initted&&this._dur&&i||!i&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=i),Zm(this,i,n)),this},t.time=function(i,n){return arguments.length?this.totalTime(Math.min(this.totalDuration(),i+Fm(this))%(this._dur+this._rDelay)||(i?this._dur:0),n):this._time},t.totalProgress=function(i,n){return arguments.length?this.totalTime(this.totalDuration()*i,n):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(i,n){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-i:i)+Fm(this),n):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(i,n){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(i-1)*r,n):this._repeat?To(this._tTime,r)+1:1},t.timeScale=function(i,n){if(!arguments.length)return this._rts===-Be?0:this._rts;if(this._rts===i)return this;var r=this.parent&&this._ts?Cc(this.parent._time,this):this._tTime;return this._rts=+i||0,this._ts=this._ps||i===-Be?0:this._rts,this.totalTime(Ja(-Math.abs(this._delay),this.totalDuration(),r),n!==!1),Dc(this),Cx(this)},t.paused=function(i){return arguments.length?(this._ps!==i&&(this._ps=i,i?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Ao(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Be&&(this._tTime-=Be)))),this):this._ps},t.startTime=function(i){if(arguments.length){this._start=Ke(i);var n=this.parent||this._dp;return n&&(n._sort||!this.parent)&&_s(n,this,this._start-this._delay),this}return this._start},t.endTime=function(i){return this._start+(xn(i)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(i){var n=this.parent||this._dp;return n?i&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Cc(n.rawTime(i),this):this._tTime:this._tTime},t.revert=function(i){i===void 0&&(i=wx);var n=Ni;return Ni=i,nd(this)&&(this.timeline&&this.timeline.revert(i),this.totalTime(-.01,i.suppressEvents)),this.data!=="nested"&&i.kill!==!1&&this.kill(),Ni=n,this},t.globalTime=function(i){for(var n=this,r=arguments.length?i:n.rawTime();n;)r=n._start+r/(Math.abs(n._ts)||1),n=n._dp;return!this.parent&&this._sat?this._sat.globalTime(i):r},t.repeat=function(i){return arguments.length?(this._repeat=i===1/0?-2:i,Om(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(i){if(arguments.length){var n=this._time;return this._rDelay=i,Om(this),n?this.time(n):this}return this._rDelay},t.yoyo=function(i){return arguments.length?(this._yoyo=i,this):this._yoyo},t.seek=function(i,n){return this.totalTime(Vn(this,i),xn(n))},t.restart=function(i,n){return this.play().totalTime(i?-this._delay:0,xn(n)),this._dur||(this._zTime=-Be),this},t.play=function(i,n){return i!=null&&this.seek(i,n),this.reversed(!1).paused(!1)},t.reverse=function(i,n){return i!=null&&this.seek(i||this.totalDuration(),n),this.reversed(!0).paused(!1)},t.pause=function(i,n){return i!=null&&this.seek(i,n),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(i){return arguments.length?(!!i!==this.reversed()&&this.timeScale(-this._rts||(i?-Be:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-Be,this},t.isActive=function(){var i=this.parent||this._dp,n=this._start,r;return!!(!i||this._ts&&this._initted&&i.isActive()&&(r=i.rawTime(!0))>=n&&r<this.endTime(!0)-Be)},t.eventCallback=function(i,n,r){var o=this.vars;return arguments.length>1?(n?(o[i]=n,r&&(o[i+"Params"]=r),i==="onUpdate"&&(this._onUpdate=n)):delete o[i],this):o[i]},t.then=function(i){var n=this,r=n._prom;return new Promise(function(o){var a=ti(i)?i:Jm,l=function(){var h=n.then;n.then=null,r&&r(),ti(a)&&(a=a(n))&&(a.then||a===n)&&(n.then=h),o(a),n.then=h};n._initted&&n.totalProgress()===1&&n._ts>=0||!n._tTime&&n._ts<0?l():n._prom=l})},t.kill=function(){za(this)},s})();Pn(Ka.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Be,_prom:0,_ps:!1,_rts:1});var Hi=(function(s){Hm(t,s);function t(i,n){var r;return i===void 0&&(i={}),r=s.call(this,i)||this,r.labels={},r.smoothChildTiming=!!i.smoothChildTiming,r.autoRemoveChildren=!!i.autoRemoveChildren,r._sort=xn(i.sortChildren),Je&&_s(i.parent||Je,Is(r),n),i.reversed&&r.reverse(),i.paused&&r.paused(!0),i.scrollTrigger&&Qm(Is(r),i.scrollTrigger),r}var e=t.prototype;return e.to=function(n,r,o){return Ga(0,arguments,this),this},e.from=function(n,r,o){return Ga(1,arguments,this),this},e.fromTo=function(n,r,o,a){return Ga(2,arguments,this),this},e.set=function(n,r,o){return r.duration=0,r.parent=this,Va(r).repeatDelay||(r.repeat=0),r.immediateRender=!!r.immediateRender,new ai(n,r,Vn(this,o),1),this},e.call=function(n,r,o){return _s(this,ai.delayedCall(0,n,r),o)},e.staggerTo=function(n,r,o,a,l,c,h){return o.duration=r,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=h,o.parent=this,new ai(n,o,Vn(this,l)),this},e.staggerFrom=function(n,r,o,a,l,c,h){return o.runBackwards=1,Va(o).immediateRender=xn(o.immediateRender),this.staggerTo(n,r,o,a,l,c,h)},e.staggerFromTo=function(n,r,o,a,l,c,h,f){return a.startAt=o,Va(a).immediateRender=xn(a.immediateRender),this.staggerTo(n,r,a,l,c,h,f)},e.render=function(n,r,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,h=n<=0?0:Ke(n),f=this._zTime<0!=n<0&&(this._initted||!c),u,d,p,m,g,_,y,E,x,b,M,T;if(this!==Je&&h>l&&n>=0&&(h=l),h!==this._tTime||o||f){if(a!==this._time&&c&&(h+=this._time-a,n+=this._time-a),u=h,x=this._start,E=this._ts,_=!E,f&&(c||(a=this._zTime),(n||!r)&&(this._zTime=n)),this._repeat){if(M=this._yoyo,g=c+this._rDelay,this._repeat<-1&&n<0)return this.totalTime(g*100+n,r,o);if(u=Ke(h%g),h===l?(m=this._repeat,u=c):(b=Ke(h/g),m=~~b,m&&m===b&&(u=c,m--),u>c&&(u=c)),b=To(this._tTime,g),!a&&this._tTime&&b!==m&&this._tTime-b*g-this._dur<=0&&(b=m),M&&m&1&&(u=c-u,T=1),m!==b&&!this._lock){var v=M&&b&1,w=v===(M&&m&1);if(m<b&&(v=!v),a=v?0:h%c?c:h,this._lock=1,this.render(a||(T?0:Ke(m*g)),r,!c)._lock=0,this._tTime=h,!r&&this.parent&&Cn(this,"onRepeat"),this.vars.repeatRefresh&&!T&&(this.invalidate()._lock=1,b=m),a&&a!==this._time||_!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,w&&(this._lock=2,a=v?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!T&&this.invalidate()),this._lock=0,!this._ts&&!_)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(y=Lx(this,Ke(a),Ke(u)),y&&(h-=u-(u=y._start))),this._tTime=h,this._time=u,this._act=!!E,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=n,a=0),!a&&h&&c&&!r&&!b&&(Cn(this,"onStart"),this._tTime!==h))return this;if(u>=a&&n>=0)for(d=this._first;d;){if(p=d._next,(d._act||u>=d._start)&&d._ts&&y!==d){if(d.parent!==this)return this.render(n,r,o);if(d.render(d._ts>0?(u-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(u-d._start)*d._ts,r,o),u!==this._time||!this._ts&&!_){y=0,p&&(h+=this._zTime=-Be);break}}d=p}else{d=this._last;for(var C=n<0?n:u;d;){if(p=d._prev,(d._act||C<=d._end)&&d._ts&&y!==d){if(d.parent!==this)return this.render(n,r,o);if(d.render(d._ts>0?(C-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(C-d._start)*d._ts,r,o||Ni&&nd(d)),u!==this._time||!this._ts&&!_){y=0,p&&(h+=this._zTime=C?-Be:Be);break}}d=p}}if(y&&!r&&(this.pause(),y.render(u>=a?0:-Be)._zTime=u>=a?1:-1,this._ts))return this._start=x,Dc(this),this.render(n,r,o);this._onUpdate&&!r&&Cn(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&a)&&(x===this._start||Math.abs(E)!==Math.abs(this._ts))&&(this._lock||((n||!c)&&(h===l&&this._ts>0||!h&&this._ts<0)&&rr(this,1),!r&&!(n<0&&!a)&&(h||a||!l)&&(Cn(this,h===l&&n>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(n,r){var o=this;if(Ds(r)||(r=Vn(this,r,n)),!(n instanceof Ka)){if(Vi(n))return n.forEach(function(a){return o.add(a,r)}),this;if(yi(n))return this.addLabel(n,r);if(ti(n))n=ai.delayedCall(0,n);else return this}return this!==n?_s(this,n,r):this},e.getChildren=function(n,r,o,a){n===void 0&&(n=!0),r===void 0&&(r=!0),o===void 0&&(o=!0),a===void 0&&(a=-Gn);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof ai?r&&l.push(c):(o&&l.push(c),n&&l.push.apply(l,c.getChildren(!0,r,o)))),c=c._next;return l},e.getById=function(n){for(var r=this.getChildren(1,1,1),o=r.length;o--;)if(r[o].vars.id===n)return r[o]},e.remove=function(n){return yi(n)?this.removeLabel(n):ti(n)?this.killTweensOf(n):(n.parent===this&&Lc(this,n),n===this._recent&&(this._recent=this._last),Dr(this))},e.totalTime=function(n,r){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Ke(vn.time-(this._ts>0?n/this._ts:(this.totalDuration()-n)/-this._ts))),s.prototype.totalTime.call(this,n,r),this._forcing=0,this):this._tTime},e.addLabel=function(n,r){return this.labels[n]=Vn(this,r),this},e.removeLabel=function(n){return delete this.labels[n],this},e.addPause=function(n,r,o){var a=ai.delayedCall(0,r||qa,o);return a.data="isPause",this._hasPause=1,_s(this,a,Vn(this,n))},e.removePause=function(n){var r=this._first;for(n=Vn(this,n);r;)r._start===n&&r.data==="isPause"&&rr(r),r=r._next},e.killTweensOf=function(n,r,o){for(var a=this.getTweensOf(n,o),l=a.length;l--;)ir!==a[l]&&a[l].kill(n,r);return this},e.getTweensOf=function(n,r){for(var o=[],a=Wn(n),l=this._first,c=Ds(r),h;l;)l instanceof ai?Tx(l._targets,a)&&(c?(!ir||l._initted&&l._ts)&&l.globalTime(0)<=r&&l.globalTime(l.totalDuration())>r:!r||l.isActive())&&o.push(l):(h=l.getTweensOf(a,r)).length&&o.push.apply(o,h),l=l._next;return o},e.tweenTo=function(n,r){r=r||{};var o=this,a=Vn(o,n),l=r,c=l.startAt,h=l.onStart,f=l.onStartParams,u=l.immediateRender,d,p=ai.to(o,Pn({ease:r.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:r.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||Be,onStart:function(){if(o.pause(),!d){var g=r.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());p._dur!==g&&Eo(p,g,0,1).render(p._time,!0,!0),d=1}h&&h.apply(p,f||[])}},r));return u?p.render(0):p},e.tweenFromTo=function(n,r,o){return this.tweenTo(r,Pn({startAt:{time:Vn(this,n)}},o))},e.recent=function(){return this._recent},e.nextLabel=function(n){return n===void 0&&(n=this._time),Bm(this,Vn(this,n))},e.previousLabel=function(n){return n===void 0&&(n=this._time),Bm(this,Vn(this,n),1)},e.currentLabel=function(n){return arguments.length?this.seek(n,!0):this.previousLabel(this._time+Be)},e.shiftChildren=function(n,r,o){o===void 0&&(o=0);var a=this._first,l=this.labels,c;for(n=Ke(n);a;)a._start>=o&&(a._start+=n,a._end+=n),a=a._next;if(r)for(c in l)l[c]>=o&&(l[c]+=n);return Dr(this)},e.invalidate=function(n){var r=this._first;for(this._lock=0;r;)r.invalidate(n),r=r._next;return s.prototype.invalidate.call(this,n)},e.clear=function(n){n===void 0&&(n=!0);for(var r=this._first,o;r;)o=r._next,this.remove(r),r=o;return this._dp&&(this._time=this._tTime=this._pTime=0),n&&(this.labels={}),Dr(this)},e.totalDuration=function(n){var r=0,o=this,a=o._last,l=Gn,c,h,f;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-n:n));if(o._dirty){for(f=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),h=a._start,h>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,_s(o,a,h-a._delay,1)._lock=0):l=h,h<0&&a._ts&&(r-=h,(!f&&!o._dp||f&&f.smoothChildTiming)&&(o._start+=Ke(h/o._ts),o._time-=h,o._tTime-=h),o.shiftChildren(-h,!1,-1/0),l=0),a._end>r&&a._ts&&(r=a._end),a=c;Eo(o,o===Je&&o._time>r?o._time:r,1,1),o._dirty=0}return o._tDur},t.updateRoot=function(n){if(Je._ts&&(Zm(Je,Cc(n,Je)),qm=vn.frame),vn.frame>=Nm){Nm+=yn.autoSleep||120;var r=Je._first;if((!r||!r._ts)&&yn.autoSleep&&vn._listeners.length<2){for(;r&&!r._ts;)r=r._next;r||vn.sleep()}}},t})(Ka);Pn(Hi.prototype,{_lock:0,_hasPause:0,_forcing:0});var Kx=function(t,e,i,n,r,o,a){var l=new on(this._pt,t,e,0,1,hd,null,r),c=0,h=0,f,u,d,p,m,g,_,y;for(l.b=i,l.e=n,i+="",n+="",(_=~n.indexOf("random("))&&(n=Co(n)),o&&(y=[i,n],o(y,t,e),i=y[0],n=y[1]),u=i.match(If)||[];f=If.exec(n);)p=f[0],m=n.substring(c,f.index),d?d=(d+1)%5:m.substr(-5)==="rgba("&&(d=1),p!==u[h++]&&(g=parseFloat(u[h-1])||0,l._pt={_next:l._pt,p:m||h===1?m:",",s:g,c:p.charAt(1)==="="?Or(g,p)-g:parseFloat(p)-g,m:d&&d<4?Math.round:0},c=If.lastIndex);return l.c=c<n.length?n.substring(c,n.length):"",l.fp=a,($f.test(n)||_)&&(l.e=0),this._pt=l,l},od=function(t,e,i,n,r,o,a,l,c,h){ti(n)&&(n=n(r||0,t,o));var f=t[e],u=i!=="get"?i:ti(f)?c?t[e.indexOf("set")||!ti(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():f,d=ti(f)?c?ty:m0:cd,p;if(yi(n)&&(~n.indexOf("random(")&&(n=Co(n)),n.charAt(1)==="="&&(p=Or(u,n)+(Ui(u)||0),(p||p===0)&&(n=p))),!h||u!==n||Yf)return!isNaN(u*n)&&n!==""?(p=new on(this._pt,t,e,+u||0,n-(u||0),typeof f=="boolean"?iy:g0,0,d),c&&(p.fp=c),a&&p.modifier(a,this,t),this._pt=p):(!f&&!(e in t)&&Ic(e,n),Kx.call(this,t,e,u,n,d,l||yn.stringFilter,c))},Jx=function(t,e,i,n,r){if(ti(t)&&(t=Wa(t,r,e,i,n)),!vs(t)||t.style&&t.nodeType||Vi(t)||Gm(t))return yi(t)?Wa(t,r,e,i,n):t;var o={},a;for(a in t)o[a]=Wa(t[a],r,e,i,n);return o},ad=function(t,e,i,n,r,o){var a,l,c,h;if(_n[t]&&(a=new _n[t]).init(r,a.rawVars?e[t]:Jx(e[t],n,r,o,i),i,n,o)!==!1&&(i._pt=l=new on(i._pt,r,t,0,1,a.render,a,0,a.priority),i!==bo))for(c=i._ptLookup[i._targets.indexOf(r)],h=a._props.length;h--;)c[a._props[h]]=l;return a},ir,Yf,ld=function s(t,e,i){var n=t.vars,r=n.ease,o=n.startAt,a=n.immediateRender,l=n.lazy,c=n.onUpdate,h=n.runBackwards,f=n.yoyoEase,u=n.keyframes,d=n.autoRevert,p=t._dur,m=t._startAt,g=t._targets,_=t.parent,y=_&&_.data==="nested"?_.vars.targets:g,E=t._overwrite==="auto"&&!Zf,x=t.timeline,b=n.easeReverse||f,M,T,v,w,C,D,I,O,L,B,V,z,$;if(x&&(!u||!r)&&(r="none"),t._ease=Nr(r,Xa.ease),t._rEase=b&&(Nr(b)||t._ease),t._from=!x&&!!n.runBackwards,t._from&&(t.ratio=1),!x||u&&!n.stagger){if(O=g[0]?sr(g[0]).harness:0,z=O&&n[O.prop],M=Ac(n,Qf),m&&(m._zTime<0&&m.progress(1),e<0&&h&&a&&!d?m.render(-1,!0):m.revert(h&&p?Mc:bx),m._lazy=0),o){if(rr(t._startAt=ai.set(g,Pn({data:"isStart",overwrite:!1,parent:_,immediateRender:!0,lazy:!m&&xn(l),startAt:null,delay:0,onUpdate:c&&function(){return Cn(t,"onUpdate")},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Ni||!a&&!d)&&t._startAt.revert(Mc),a&&p&&e<=0&&i<=0){e&&(t._zTime=e);return}}else if(h&&p&&!m){if(e&&(a=!1),v=Pn({overwrite:!1,data:"isFromStart",lazy:a&&!m&&xn(l),immediateRender:a,stagger:0,parent:_},M),z&&(v[O.prop]=z),rr(t._startAt=ai.set(g,v)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Ni?t._startAt.revert(Mc):t._startAt.render(-1,!0)),t._zTime=e,!a)s(t._startAt,Be,Be);else if(!e)return}for(t._pt=t._ptCache=0,l=p&&xn(l)||l&&!p,T=0;T<g.length;T++){if(C=g[T],I=C._gsap||ed(g)[T]._gsap,t._ptLookup[T]=B={},zf[I.id]&&nr.length&&Ec(),V=y===g?T:y.indexOf(C),O&&(L=new O).init(C,z||M,t,V,y)!==!1&&(t._pt=w=new on(t._pt,C,L.name,0,1,L.render,L,0,L.priority),L._props.forEach(function(Z){B[Z]=w}),L.priority&&(D=1)),!O||z)for(v in M)_n[v]&&(L=ad(v,M,t,V,C,y))?L.priority&&(D=1):B[v]=w=od.call(t,C,v,"get",M[v],V,y,0,n.stringFilter);t._op&&t._op[T]&&t.kill(C,t._op[T]),E&&t._pt&&(ir=t,Je.killTweensOf(C,B,t.globalTime(e)),$=!t.parent,ir=0),t._pt&&l&&(zf[I.id]=1)}D&&fd(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!$,u&&e<=0&&x.render(Gn,!0,!0)},$x=function(t,e,i,n,r,o,a,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],h,f,u,d;if(!c)for(c=t._ptCache[e]=[],u=t._ptLookup,d=t._targets.length;d--;){if(h=u[d][e],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==e&&h.fp!==e;)h=h._next;if(!h)return Yf=1,t.vars[e]="+=0",ld(t,a),Yf=0,l?Ya(e+" not eligible for reset. Try splitting into individual properties"):1;c.push(h)}for(d=c.length;d--;)f=c[d],h=f._pt||f,h.s=(n||n===0)&&!r?n:h.s+(n||0)+o*h.c,h.c=i-h.s,f.e&&(f.e=ei(i)+Ui(f.e)),f.b&&(f.b=h.s+Ui(f.b))},jx=function(t,e){var i=t[0]?sr(t[0]).harness:0,n=i&&i.aliases,r,o,a,l;if(!n)return e;r=wo({},e);for(o in n)if(o in r)for(l=n[o].split(","),a=l.length;a--;)r[l[a]]=r[o];return r},Qx=function(t,e,i,n){var r=e.ease||n||"power1.inOut",o,a;if(Vi(e))a=i[t]||(i[t]=[]),e.forEach(function(l,c){return a.push({t:c/(e.length-1)*100,v:l,e:r})});else for(o in e)a=i[o]||(i[o]=[]),o==="ease"||a.push({t:parseFloat(t),v:e[o],e:r})},Wa=function(t,e,i,n,r){return ti(t)?t.call(e,i,n,r):yi(t)&&~t.indexOf("random(")?Co(t):t},d0=td+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",p0={};rn(d0+",id,stagger,delay,duration,paused,scrollTrigger",function(s){return p0[s]=1});var ai=(function(s){Hm(t,s);function t(i,n,r,o){var a;typeof n=="number"&&(r.duration=n,n=r,r=null),a=s.call(this,o?n:Va(n))||this;var l=a.vars,c=l.duration,h=l.delay,f=l.immediateRender,u=l.stagger,d=l.overwrite,p=l.keyframes,m=l.defaults,g=l.scrollTrigger,_=n.parent||Je,y=(Vi(i)||Gm(i)?Ds(i[0]):"length"in n)?[i]:Wn(i),E,x,b,M,T,v,w,C;if(a._targets=y.length?ed(y):Ya("GSAP target "+i+" not found. https://gsap.com",!yn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,p||u||Sc(c)||Sc(h)){n=a.vars;var D=n.easeReverse||n.yoyoEase;if(E=a.timeline=new Hi({data:"nested",defaults:m||{},targets:_&&_.data==="nested"?_.vars.targets:y}),E.kill(),E.parent=E._dp=Is(a),E._start=0,u||Sc(c)||Sc(h)){if(M=y.length,w=u&&n0(u),vs(u))for(T in u)~d0.indexOf(T)&&(C||(C={}),C[T]=u[T]);for(x=0;x<M;x++)b=Ac(n,p0),b.stagger=0,D&&(b.easeReverse=D),C&&wo(b,C),v=y[x],b.duration=+Wa(c,Is(a),x,v,y),b.delay=(+Wa(h,Is(a),x,v,y)||0)-a._delay,!u&&M===1&&b.delay&&(a._delay=h=b.delay,a._start+=h,b.delay=0),E.to(v,b,w?w(x,v,y):0),E._ease=xe.none;E.duration()?c=h=0:a.timeline=0}else if(p){Va(Pn(E.vars.defaults,{ease:"none"})),E._ease=Nr(p.ease||n.ease||"none");var I=0,O,L,B;if(Vi(p))p.forEach(function(V){return E.to(y,V,">")}),E.duration();else{b={};for(T in p)T==="ease"||T==="easeEach"||Qx(T,p[T],b,p.easeEach);for(T in b)for(O=b[T].sort(function(V,z){return V.t-z.t}),I=0,x=0;x<O.length;x++)L=O[x],B={ease:L.e,duration:(L.t-(x?O[x-1].t:0))/100*c},B[T]=L.v,E.to(y,B,I),I+=B.duration;E.duration()<c&&E.to({},{duration:c-E.duration()})}}c||a.duration(c=E.duration())}else a.timeline=0;return d===!0&&!Zf&&(ir=Is(a),Je.killTweensOf(y),ir=0),_s(_,Is(a),r),n.reversed&&a.reverse(),n.paused&&a.paused(!0),(f||!c&&!p&&a._start===Ke(_._time)&&xn(f)&&Rx(Is(a))&&_.data!=="nested")&&(a._tTime=-Be,a.render(Math.max(0,-h)||0)),g&&Qm(Is(a),g),a}var e=t.prototype;return e.render=function(n,r,o){var a=this._time,l=this._tDur,c=this._dur,h=n<0,f=n>l-Be&&!h?l:n<Be?0:n,u,d,p,m,g,_,y,E;if(!c)Ix(this,n,r,o);else if(f!==this._tTime||!n||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h||this._lazy){if(u=f,E=this.timeline,this._repeat){if(m=c+this._rDelay,this._repeat<-1&&h)return this.totalTime(m*100+n,r,o);if(u=Ke(f%m),f===l?(p=this._repeat,u=c):(g=Ke(f/m),p=~~g,p&&p===g?(u=c,p--):u>c&&(u=c)),_=this._yoyo&&p&1,_&&(u=c-u),g=To(this._tTime,m),u===a&&!o&&this._initted&&p===g)return this._tTime=f,this;p!==g&&this.vars.repeatRefresh&&!_&&!this._lock&&u!==m&&this._initted&&(this._lock=o=1,this.render(Ke(m*p),!0).invalidate()._lock=0)}if(!this._initted){if(t0(this,h?n:u,o,r,f))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&p!==g))return this;if(c!==this._dur)return this.render(n,r,o)}if(this._rEase){var x=u<a;if(x!==this._inv){var b=x?a:c-a;this._inv=x,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=a,this._invRecip=b?(x?-1:1)/b:0,this._invScale=x?-this.ratio:1-this.ratio,this._invEase=x?this._rEase:this._ease}this.ratio=y=this._invRatio+this._invScale*this._invEase((u-this._invTime)*this._invRecip)}else this.ratio=y=this._ease(u/c);if(this._from&&(this.ratio=y=1-y),this._tTime=f,this._time=u,!this._act&&this._ts&&(this._act=1,this._lazy=0),!a&&f&&!r&&!g&&(Cn(this,"onStart"),this._tTime!==f))return this;for(d=this._pt;d;)d.r(y,d.d),d=d._next;E&&E.render(n<0?n:E._dur*E._ease(u/this._dur),r,o)||this._startAt&&(this._zTime=n),this._onUpdate&&!r&&(h&&Hf(this,n,r,o),Cn(this,"onUpdate")),this._repeat&&p!==g&&this.vars.onRepeat&&!r&&this.parent&&Cn(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(h&&!this._onUpdate&&Hf(this,n,!0,!0),(n||!c)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&rr(this,1),!r&&!(h&&!a)&&(f||a||_)&&(Cn(this,f===l?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(n){return(!n||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(n),s.prototype.invalidate.call(this,n)},e.resetTo=function(n,r,o,a,l){Za||vn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||ld(this,c),h=this._ease(c/this._dur),$x(this,n,r,o,a,h,c,l)?this.resetTo(n,r,o,a,1):(Nc(this,0),this.parent||$m(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(n,r){if(r===void 0&&(r="all"),!n&&(!r||r==="all"))return this._lazy=this._pt=0,this.parent?za(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Ni),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(n,r,ir&&ir.vars.overwrite!==!0)._first||za(this),this.parent&&o!==this.timeline.totalDuration()&&Eo(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=n?Wn(n):a,c=this._ptLookup,h=this._pt,f,u,d,p,m,g,_;if((!r||r==="all")&&Ax(a,l))return r==="all"&&(this._pt=0),za(this);for(f=this._op=this._op||[],r!=="all"&&(yi(r)&&(m={},rn(r,function(y){return m[y]=1}),r=m),r=jx(a,r)),_=a.length;_--;)if(~l.indexOf(a[_])){u=c[_],r==="all"?(f[_]=r,p=u,d={}):(d=f[_]=f[_]||{},p=r);for(m in p)g=u&&u[m],g&&((!("kill"in g.d)||g.d.kill(m)===!0)&&Lc(this,g,"_pt"),delete u[m]),d!=="all"&&(d[m]=1)}return this._initted&&!this._pt&&h&&za(this),this},t.to=function(n,r){return new t(n,r,arguments[2])},t.from=function(n,r){return Ga(1,arguments)},t.delayedCall=function(n,r,o,a){return new t(r,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:n,onComplete:r,onReverseComplete:r,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},t.fromTo=function(n,r,o){return Ga(2,arguments)},t.set=function(n,r){return r.duration=0,r.repeatDelay||(r.repeat=0),new t(n,r)},t.killTweensOf=function(n,r,o){return Je.killTweensOf(n,r,o)},t})(Ka);Pn(ai.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});rn("staggerTo,staggerFrom,staggerFromTo",function(s){ai[s]=function(){var t=new Hi,e=Gf.call(arguments,0);return e.splice(s==="staggerFromTo"?5:4,0,0),t[s].apply(t,e)}});var cd=function(t,e,i){return t[e]=i},m0=function(t,e,i){return t[e](i)},ty=function(t,e,i,n){return t[e](n.fp,i)},ey=function(t,e,i){return t.setAttribute(e,i)},Uc=function(t,e){return ti(t[e])?m0:Pc(t[e])&&t.setAttribute?ey:cd},g0=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},iy=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},hd=function(t,e){var i=e._pt,n="";if(!t&&e.b)n=e.b;else if(t===1&&e.e)n=e.e;else{for(;i;)n=i.p+(i.m?i.m(i.s+i.c*t):Math.round((i.s+i.c*t)*1e4)/1e4)+n,i=i._next;n+=e.c}e.set(e.t,e.p,n,e)},ud=function(t,e){for(var i=e._pt;i;)i.r(t,i.d),i=i._next},ny=function(t,e,i,n){for(var r=this._pt,o;r;)o=r._next,r.p===n&&r.modifier(t,e,i),r=o},sy=function(t){for(var e=this._pt,i,n;e;)n=e._next,e.p===t&&!e.op||e.op===t?Lc(this,e,"_pt"):e.dep||(i=1),e=n;return!i},ry=function(t,e,i,n){n.mSet(t,e,n.m.call(n.tween,i,n.mt),n)},fd=function(t){for(var e=t._pt,i,n,r,o;e;){for(i=e._next,n=r;n&&n.pr>e.pr;)n=n._next;(e._prev=n?n._prev:o)?e._prev._next=e:r=e,(e._next=n)?n._prev=e:o=e,e=i}t._pt=r},on=(function(){function s(e,i,n,r,o,a,l,c,h){this.t=i,this.s=r,this.c=o,this.p=n,this.r=a||g0,this.d=l||this,this.set=c||cd,this.pr=h||0,this._next=e,e&&(e._prev=this)}var t=s.prototype;return t.modifier=function(i,n,r){this.mSet=this.mSet||this.set,this.set=ry,this.m=i,this.mt=r,this.tween=n},s})();rn(td+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(s){return Qf[s]=1});Rn.TweenMax=Rn.TweenLite=ai;Rn.TimelineLite=Rn.TimelineMax=Hi;Je=new Hi({sortChildren:!1,defaults:Xa,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});yn.stringFilter=sd;var Ur=[],wc={},oy=[],zm=0,ay=0,Ff=function(t){return(wc[t]||oy).map(function(e){return e()})},qf=function(){var t=Date.now(),e=[];t-zm>2&&(Ff("matchMediaInit"),Ur.forEach(function(i){var n=i.queries,r=i.conditions,o,a,l,c;for(a in n)o=gs.matchMedia(n[a]).matches,o&&(l=1),o!==r[a]&&(r[a]=o,c=1);c&&(i.revert(),l&&e.push(i))}),Ff("matchMediaRevert"),e.forEach(function(i){return i.onMatch(i,function(n){return i.add(null,n)})}),zm=t,Ff("matchMedia"))},_0=(function(){function s(e,i){this.selector=i&&Wf(i),this.data=[],this._r=[],this.isReverted=!1,this.id=ay++,e&&this.add(e)}var t=s.prototype;return t.add=function(i,n,r){ti(i)&&(r=n,n=i,i=ti);var o=this,a=function(){var c=Ye,h=o.selector,f;return c&&c!==o&&c.data.push(o),r&&(o.selector=Wf(r)),Ye=o,f=n.apply(o,arguments),ti(f)&&o._r.push(f),Ye=c,o.selector=h,o.isReverted=!1,f};return o.last=a,i===ti?a(o,function(l){return o.add(null,l)}):i?o[i]=a:a},t.ignore=function(i){var n=Ye;Ye=null,i(this),Ye=n},t.getTweens=function(){var i=[];return this.data.forEach(function(n){return n instanceof s?i.push.apply(i,n.getTweens()):n instanceof ai&&!(n.parent&&n.parent.data==="nested")&&i.push(n)}),i},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(i,n){var r=this;if(i?(function(){for(var a=r.getTweens(),l=r.data.length,c;l--;)c=r.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(h){return a.splice(a.indexOf(h),1)}));for(a.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,f){return f.g-h.g||-1/0}).forEach(function(h){return h.t.revert(i)}),l=r.data.length;l--;)c=r.data[l],c instanceof Hi?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof ai)&&c.revert&&c.revert(i);r._r.forEach(function(h){return h(i,r)}),r.isReverted=!0})():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),n)for(var o=Ur.length;o--;)Ur[o].id===this.id&&Ur.splice(o,1)},t.revert=function(i){this.kill(i||{})},s})(),ly=(function(){function s(e){this.contexts=[],this.scope=e,Ye&&Ye.data.push(this)}var t=s.prototype;return t.add=function(i,n,r){vs(i)||(i={matches:i});var o=new _0(0,r||this.scope),a=o.conditions={},l,c,h;Ye&&!o.selector&&(o.selector=Ye.selector),this.contexts.push(o),n=o.add("onMatch",n),o.queries=i;for(c in i)c==="all"?h=1:(l=gs.matchMedia(i[c]),l&&(Ur.indexOf(o)<0&&Ur.push(o),(a[c]=l.matches)&&(h=1),l.addListener?l.addListener(qf):l.addEventListener("change",qf)));return h&&n(o,function(f){return o.add(null,f)}),this},t.revert=function(i){this.kill(i||{})},t.kill=function(i){this.contexts.forEach(function(n){return n.kill(i,!0)})},s})(),Rc={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];e.forEach(function(n){return c0(n)})},timeline:function(t){return new Hi(t)},getTweensOf:function(t,e){return Je.getTweensOf(t,e)},getProperty:function(t,e,i,n){yi(t)&&(t=Wn(t)[0]);var r=sr(t||{}).get,o=i?Jm:Km;return i==="native"&&(i=""),t&&(e?o((_n[e]&&_n[e].get||r)(t,e,i,n)):function(a,l,c){return o((_n[a]&&_n[a].get||r)(t,a,l,c))})},quickSetter:function(t,e,i){if(t=Wn(t),t.length>1){var n=t.map(function(h){return Gi.quickSetter(h,e,i)}),r=n.length;return function(h){for(var f=r;f--;)n[f](h)}}t=t[0]||{};var o=_n[e],a=sr(t),l=a.harness&&(a.harness.aliases||{})[e]||e,c=o?function(h){var f=new o;bo._pt=0,f.init(t,i?h+i:h,bo,0,[t]),f.render(1,f),bo._pt&&ud(1,bo)}:a.set(t,l);return o?c:function(h){return c(t,l,i?h+i:h,a,1)}},quickTo:function(t,e,i){var n,r=Gi.to(t,Pn((n={},n[e]="+=0.1",n.paused=!0,n.stagger=0,n),i||{})),o=function(l,c,h){return r.resetTo(e,l,c,h)};return o.tween=r,o},isTweening:function(t){return Je.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=Nr(t.ease,Xa.ease)),Um(Xa,t||{})},config:function(t){return Um(yn,t||{})},registerEffect:function(t){var e=t.name,i=t.effect,n=t.plugins,r=t.defaults,o=t.extendTimeline;(n||"").split(",").forEach(function(a){return a&&!_n[a]&&!Rn[a]&&Ya(e+" effect requires "+a+" plugin.")}),Lf[e]=function(a,l,c){return i(Wn(a),Pn(l||{},r),c)},o&&(Hi.prototype[e]=function(a,l,c){return this.add(Lf[e](a,vs(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){xe[t]=Nr(e)},parseEase:function(t,e){return arguments.length?Nr(t,e):xe},getById:function(t){return Je.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var i=new Hi(t),n,r;for(i.smoothChildTiming=xn(t.smoothChildTiming),Je.remove(i),i._dp=0,i._time=i._tTime=Je._time,n=Je._first;n;)r=n._next,(e||!(!n._dur&&n instanceof ai&&n.vars.onComplete===n._targets[0]))&&_s(i,n,n._start-n._delay),n=r;return _s(Je,i,0),i},context:function(t,e){return t?new _0(t,e):Ye},matchMedia:function(t){return new ly(t)},matchMediaRefresh:function(){return Ur.forEach(function(t){var e=t.conditions,i,n;for(n in e)e[n]&&(e[n]=!1,i=1);i&&t.revert()})||qf()},addEventListener:function(t,e){var i=wc[t]||(wc[t]=[]);~i.indexOf(e)||i.push(e)},removeEventListener:function(t,e){var i=wc[t],n=i&&i.indexOf(e);n>=0&&i.splice(n,1)},utils:{wrap:kx,wrapYoyo:zx,distribute:n0,random:r0,snap:s0,normalize:Bx,getUnit:Ui,clamp:Nx,splitColor:h0,toArray:Wn,selector:Wf,mapRange:a0,pipe:Fx,unitize:Ox,interpolate:Hx,shuffle:i0},install:Xm,effects:Lf,ticker:vn,updateRoot:Hi.updateRoot,plugins:_n,globalTimeline:Je,core:{PropTween:on,globals:Ym,Tween:ai,Timeline:Hi,Animation:Ka,getCache:sr,_removeLinkedListItem:Lc,reverting:function(){return Ni},context:function(t){return t&&Ye&&(Ye.data.push(t),t._ctx=Ye),Ye},suppressOverwrites:function(t){return Zf=t}}};rn("to,from,fromTo,delayedCall,set,killTweensOf",function(s){return Rc[s]=ai[s]});vn.add(Hi.updateRoot);bo=Rc.to({},{duration:0});var cy=function(t,e){for(var i=t._pt;i&&i.p!==e&&i.op!==e&&i.fp!==e;)i=i._next;return i},hy=function(t,e){var i=t._targets,n,r,o;for(n in e)for(r=i.length;r--;)o=t._ptLookup[r][n],o&&(o=o.d)&&(o._pt&&(o=cy(o,n)),o&&o.modifier&&o.modifier(e[n],t,i[r],n))},Of=function(t,e){return{name:t,headless:1,rawVars:1,init:function(n,r,o){o._onInit=function(a){var l,c;if(yi(r)&&(l={},rn(r,function(h){return l[h]=1}),r=l),e){l={};for(c in r)l[c]=e(r[c]);r=l}hy(a,r)}}}},Gi=Rc.registerPlugin({name:"attr",init:function(t,e,i,n,r){var o,a,l;this.tween=i;for(o in e)l=t.getAttribute(o)||"",a=this.add(t,"setAttribute",(l||0)+"",e[o],n,r,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(t,e){for(var i=e._pt;i;)Ni?i.set(i.t,i.p,i.b,i):i.r(t,i.d),i=i._next}},{name:"endArray",headless:1,init:function(t,e){for(var i=e.length;i--;)this.add(t,i,t[i]||0,e[i],0,0,0,0,0,1)}},Of("roundProps",Xf),Of("modifiers"),Of("snap",s0))||Rc;ai.version=Hi.version=Gi.version="3.15.0";Wm=1;Kf()&&Ao();var uy=xe.Power0,fy=xe.Power1,dy=xe.Power2,py=xe.Power3,my=xe.Power4,gy=xe.Linear,_y=xe.Quad,vy=xe.Cubic,xy=xe.Quart,yy=xe.Quint,Sy=xe.Strong,My=xe.Elastic,by=xe.Back,wy=xe.SteppedEase,Ty=xe.Bounce,Ey=xe.Sine,Ay=xe.Expo,Cy=xe.Circ;var v0,ar,Po,vd,Vr,Ry,x0,xd,Py=function(){return typeof window<"u"},Us={},Hr=180/Math.PI,Io=Math.PI/180,Ro=Math.atan2,y0=1e8,yd=/([A-Z])/g,Iy=/(left|right|width|margin|padding|x)/i,Ly=/[\s,\(]\S/,xs={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},pd=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},Dy=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},Ny=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},Uy=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},Fy=function(t,e){var i=e.s+e.c*t;e.set(e.t,e.p,~~(i+(i<0?-.5:.5))+e.u,e)},C0=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},R0=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},Oy=function(t,e,i){return t.style[e]=i},By=function(t,e,i){return t.style.setProperty(e,i)},ky=function(t,e,i){return t._gsap[e]=i},zy=function(t,e,i){return t._gsap.scaleX=t._gsap.scaleY=i},Hy=function(t,e,i,n,r){var o=t._gsap;o.scaleX=o.scaleY=i,o.renderTransform(r,o)},Vy=function(t,e,i,n,r){var o=t._gsap;o[e]=i,o.renderTransform(r,o)},$e="transform",Sn=$e+"Origin",Gy=function s(t,e){var i=this,n=this.target,r=n.style,o=n._gsap;if(t in Us&&r){if(this.tfm=this.tfm||{},t!=="transform")t=xs[t]||t,~t.indexOf(",")?t.split(",").forEach(function(a){return i.tfm[a]=Ns(n,a)}):this.tfm[t]=o.x?o[t]:Ns(n,t),t===Sn&&(this.tfm.zOrigin=o.zOrigin);else return xs.transform.split(",").forEach(function(a){return s.call(i,a,e)});if(this.props.indexOf($e)>=0)return;o.svg&&(this.svgo=n.getAttribute("data-svg-origin"),this.props.push(Sn,e,"")),t=$e}(r||e)&&this.props.push(t,e,r[t])},P0=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},Wy=function(){var t=this.props,e=this.target,i=e.style,n=e._gsap,r,o;for(r=0;r<t.length;r+=3)t[r+1]?t[r+1]===2?e[t[r]](t[r+2]):e[t[r]]=t[r+2]:t[r+2]?i[t[r]]=t[r+2]:i.removeProperty(t[r].substr(0,2)==="--"?t[r]:t[r].replace(yd,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)n[o]=this.tfm[o];n.svg&&(n.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),r=xd(),(!r||!r.isStart)&&!i[$e]&&(P0(i),n.zOrigin&&i[Sn]&&(i[Sn]+=" "+n.zOrigin+"px",n.zOrigin=0,n.renderTransform()),n.uncache=1)}},I0=function(t,e){var i={target:t,props:[],revert:Wy,save:Gy};return t._gsap||Gi.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(n){return i.save(n)}),i},L0,md=function(t,e){var i=ar.createElementNS?ar.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):ar.createElement(t);return i&&i.style?i:ar.createElement(t)},In=function s(t,e,i){var n=getComputedStyle(t);return n[e]||n.getPropertyValue(e.replace(yd,"-$1").toLowerCase())||n.getPropertyValue(e)||!i&&s(t,Lo(e)||e,1)||""},S0="O,Moz,ms,Ms,Webkit".split(","),Lo=function(t,e,i){var n=e||Vr,r=n.style,o=5;if(t in r&&!i)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);o--&&!(S0[o]+t in r););return o<0?null:(o===3?"ms":o>=0?S0[o]:"")+t},gd=function(){Py()&&window.document&&(v0=window,ar=v0.document,Po=ar.documentElement,Vr=md("div")||{style:{}},Ry=md("div"),$e=Lo($e),Sn=$e+"Origin",Vr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",L0=!!Lo("perspective"),xd=Gi.core.reverting,vd=1)},M0=function(t){var e=t.ownerSVGElement,i=md("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),n=t.cloneNode(!0),r;n.style.display="block",i.appendChild(n),Po.appendChild(i);try{r=n.getBBox()}catch{}return i.removeChild(n),Po.removeChild(i),r},b0=function(t,e){for(var i=e.length;i--;)if(t.hasAttribute(e[i]))return t.getAttribute(e[i])},D0=function(t){var e,i;try{e=t.getBBox()}catch{e=M0(t),i=1}return e&&(e.width||e.height)||i||(e=M0(t)),e&&!e.width&&!e.x&&!e.y?{x:+b0(t,["x","cx","x1"])||0,y:+b0(t,["y","cy","y1"])||0,width:0,height:0}:e},N0=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&D0(t))},cr=function(t,e){if(e){var i=t.style,n;e in Us&&e!==Sn&&(e=$e),i.removeProperty?(n=e.substr(0,2),(n==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),i.removeProperty(n==="--"?e:e.replace(yd,"-$1").toLowerCase())):i.removeAttribute(e)}},lr=function(t,e,i,n,r,o){var a=new on(t._pt,e,i,0,1,o?R0:C0);return t._pt=a,a.b=n,a.e=r,t._props.push(i),a},w0={deg:1,rad:1,turn:1},Xy={grid:1,flex:1},hr=function s(t,e,i,n){var r=parseFloat(i)||0,o=(i+"").trim().substr((r+"").length)||"px",a=Vr.style,l=Iy.test(e),c=t.tagName.toLowerCase()==="svg",h=(c?"client":"offset")+(l?"Width":"Height"),f=100,u=n==="px",d=n==="%",p,m,g,_;if(n===o||!r||w0[n]||w0[o])return r;if(o!=="px"&&!u&&(r=s(t,e,i,"px")),_=t.getCTM&&N0(t),(d||o==="%")&&(Us[e]||~e.indexOf("adius")))return p=_?t.getBBox()[l?"width":"height"]:t[h],ei(d?r/p*f:r/100*p);if(a[l?"width":"height"]=f+(u?o:n),m=n!=="rem"&&~e.indexOf("adius")||n==="em"&&t.appendChild&&!c?t:t.parentNode,_&&(m=(t.ownerSVGElement||{}).parentNode),(!m||m===ar||!m.appendChild)&&(m=ar.body),g=m._gsap,g&&d&&g.width&&l&&g.time===vn.time&&!g.uncache)return ei(r/g.width*f);if(d&&(e==="height"||e==="width")){var y=t.style[e];t.style[e]=f+n,p=t[h],y?t.style[e]=y:cr(t,e)}else(d||o==="%")&&!Xy[In(m,"display")]&&(a.position=In(t,"position")),m===t&&(a.position="static"),m.appendChild(Vr),p=Vr[h],m.removeChild(Vr),a.position="absolute";return l&&d&&(g=sr(m),g.time=vn.time,g.width=m[h]),ei(u?p*r/f:p&&r?f/p*r:0)},Ns=function(t,e,i,n){var r;return vd||gd(),e in xs&&e!=="transform"&&(e=xs[e],~e.indexOf(",")&&(e=e.split(",")[0])),Us[e]&&e!=="transform"?(r=Qa(t,n),r=e!=="transformOrigin"?r[e]:r.svg?r.origin:Oc(In(t,Sn))+" "+r.zOrigin+"px"):(r=t.style[e],(!r||r==="auto"||n||~(r+"").indexOf("calc("))&&(r=Fc[e]&&Fc[e](t,e,i)||In(t,e)||id(t,e)||(e==="opacity"?1:0))),i&&!~(r+"").trim().indexOf(" ")?hr(t,e,r,i)+i:r},Yy=function(t,e,i,n){if(!i||i==="none"){var r=Lo(e,t,1),o=r&&In(t,r,1);o&&o!==i?(e=r,i=o):e==="borderColor"&&(i=In(t,"borderTopColor"))}var a=new on(this._pt,t.style,e,0,1,hd),l=0,c=0,h,f,u,d,p,m,g,_,y,E,x,b;if(a.b=i,a.e=n,i+="",n+="",n.substring(0,6)==="var(--"&&(n=In(t,n.substring(4,n.indexOf(")")))),n==="auto"&&(m=t.style[e],t.style[e]=n,n=In(t,e)||n,m?t.style[e]=m:cr(t,e)),h=[i,n],sd(h),i=h[0],n=h[1],u=i.match(Fr)||[],b=n.match(Fr)||[],b.length){for(;f=Fr.exec(n);)g=f[0],y=n.substring(l,f.index),p?p=(p+1)%5:(y.substr(-5)==="rgba("||y.substr(-5)==="hsla(")&&(p=1),g!==(m=u[c++]||"")&&(d=parseFloat(m)||0,x=m.substr((d+"").length),g.charAt(1)==="="&&(g=Or(d,g)+x),_=parseFloat(g),E=g.substr((_+"").length),l=Fr.lastIndex-E.length,E||(E=E||yn.units[e]||x,l===n.length&&(n+=E,a.e+=E)),x!==E&&(d=hr(t,e,m,E)||0),a._pt={_next:a._pt,p:y||c===1?y:",",s:d,c:_-d,m:p&&p<4||e==="zIndex"?Math.round:0});a.c=l<n.length?n.substring(l,n.length):""}else a.r=e==="display"&&n==="none"?R0:C0;return $f.test(n)&&(a.e=0),this._pt=a,a},T0={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},qy=function(t){var e=t.split(" "),i=e[0],n=e[1]||"50%";return(i==="top"||i==="bottom"||n==="left"||n==="right")&&(t=i,i=n,n=t),e[0]=T0[i]||i,e[1]=T0[n]||n,e.join(" ")},Zy=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var i=e.t,n=i.style,r=e.u,o=i._gsap,a,l,c;if(r==="all"||r===!0)n.cssText="",l=1;else for(r=r.split(","),c=r.length;--c>-1;)a=r[c],Us[a]&&(l=1,a=a==="transformOrigin"?Sn:$e),cr(i,a);l&&(cr(i,$e),o&&(o.svg&&i.removeAttribute("transform"),n.scale=n.rotate=n.translate="none",Qa(i,1),o.uncache=1,P0(n)))}},Fc={clearProps:function(t,e,i,n,r){if(r.data!=="isFromStart"){var o=t._pt=new on(t._pt,e,i,0,0,Zy);return o.u=n,o.pr=-10,o.tween=r,t._props.push(i),1}}},ja=[1,0,0,1,0,0],U0={},F0=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},E0=function(t){var e=In(t,$e);return F0(e)?ja:e.substr(7).match(Jf).map(ei)},Sd=function(t,e){var i=t._gsap||sr(t),n=t.style,r=E0(t),o,a,l,c;return i.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,r=[l.a,l.b,l.c,l.d,l.e,l.f],r.join(",")==="1,0,0,1,0,0"?ja:r):(r===ja&&!t.offsetParent&&t!==Po&&!i.svg&&(l=n.display,n.display="block",o=t.parentNode,(!o||!t.offsetParent&&!t.getBoundingClientRect().width)&&(c=1,a=t.nextElementSibling,Po.appendChild(t)),r=E0(t),l?n.display=l:cr(t,"display"),c&&(a?o.insertBefore(t,a):o?o.appendChild(t):Po.removeChild(t))),e&&r.length>6?[r[0],r[1],r[4],r[5],r[12],r[13]]:r)},_d=function(t,e,i,n,r,o){var a=t._gsap,l=r||Sd(t,!0),c=a.xOrigin||0,h=a.yOrigin||0,f=a.xOffset||0,u=a.yOffset||0,d=l[0],p=l[1],m=l[2],g=l[3],_=l[4],y=l[5],E=e.split(" "),x=parseFloat(E[0])||0,b=parseFloat(E[1])||0,M,T,v,w;i?l!==ja&&(T=d*g-p*m)&&(v=x*(g/T)+b*(-m/T)+(m*y-g*_)/T,w=x*(-p/T)+b*(d/T)-(d*y-p*_)/T,x=v,b=w):(M=D0(t),x=M.x+(~E[0].indexOf("%")?x/100*M.width:x),b=M.y+(~(E[1]||E[0]).indexOf("%")?b/100*M.height:b)),n||n!==!1&&a.smooth?(_=x-c,y=b-h,a.xOffset=f+(_*d+y*m)-_,a.yOffset=u+(_*p+y*g)-y):a.xOffset=a.yOffset=0,a.xOrigin=x,a.yOrigin=b,a.smooth=!!n,a.origin=e,a.originIsAbsolute=!!i,t.style[Sn]="0px 0px",o&&(lr(o,a,"xOrigin",c,x),lr(o,a,"yOrigin",h,b),lr(o,a,"xOffset",f,a.xOffset),lr(o,a,"yOffset",u,a.yOffset)),t.setAttribute("data-svg-origin",x+" "+b)},Qa=function(t,e){var i=t._gsap||new rd(t);if("x"in i&&!e&&!i.uncache)return i;var n=t.style,r=i.scaleX<0,o="px",a="deg",l=getComputedStyle(t),c=In(t,Sn)||"0",h,f,u,d,p,m,g,_,y,E,x,b,M,T,v,w,C,D,I,O,L,B,V,z,$,Z,R,tt,it,at,j,ht;return h=f=u=m=g=_=y=E=x=0,d=p=1,i.svg=!!(t.getCTM&&N0(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(n[$e]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[$e]!=="none"?l[$e]:"")),n.scale=n.rotate=n.translate="none"),T=Sd(t,i.svg),i.svg&&(i.uncache?($=t.getBBox(),c=i.xOrigin-$.x+"px "+(i.yOrigin-$.y)+"px",z=""):z=!e&&t.getAttribute("data-svg-origin"),_d(t,z||c,!!z||i.originIsAbsolute,i.smooth!==!1,T)),b=i.xOrigin||0,M=i.yOrigin||0,T!==ja&&(D=T[0],I=T[1],O=T[2],L=T[3],h=B=T[4],f=V=T[5],T.length===6?(d=Math.sqrt(D*D+I*I),p=Math.sqrt(L*L+O*O),m=D||I?Ro(I,D)*Hr:0,y=O||L?Ro(O,L)*Hr+m:0,y&&(p*=Math.abs(Math.cos(y*Io))),i.svg&&(h-=b-(b*D+M*O),f-=M-(b*I+M*L))):(ht=T[6],at=T[7],R=T[8],tt=T[9],it=T[10],j=T[11],h=T[12],f=T[13],u=T[14],v=Ro(ht,it),g=v*Hr,v&&(w=Math.cos(-v),C=Math.sin(-v),z=B*w+R*C,$=V*w+tt*C,Z=ht*w+it*C,R=B*-C+R*w,tt=V*-C+tt*w,it=ht*-C+it*w,j=at*-C+j*w,B=z,V=$,ht=Z),v=Ro(-O,it),_=v*Hr,v&&(w=Math.cos(-v),C=Math.sin(-v),z=D*w-R*C,$=I*w-tt*C,Z=O*w-it*C,j=L*C+j*w,D=z,I=$,O=Z),v=Ro(I,D),m=v*Hr,v&&(w=Math.cos(v),C=Math.sin(v),z=D*w+I*C,$=B*w+V*C,I=I*w-D*C,V=V*w-B*C,D=z,B=$),g&&Math.abs(g)+Math.abs(m)>359.9&&(g=m=0,_=180-_),d=ei(Math.sqrt(D*D+I*I+O*O)),p=ei(Math.sqrt(V*V+ht*ht)),v=Ro(B,V),y=Math.abs(v)>2e-4?v*Hr:0,x=j?1/(j<0?-j:j):0),i.svg&&(z=t.getAttribute("transform"),i.forceCSS=t.setAttribute("transform","")||!F0(In(t,$e)),z&&t.setAttribute("transform",z))),Math.abs(y)>90&&Math.abs(y)<270&&(r?(d*=-1,y+=m<=0?180:-180,m+=m<=0?180:-180):(p*=-1,y+=y<=0?180:-180)),e=e||i.uncache,i.x=h-((i.xPercent=h&&(!e&&i.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-h)?-50:0)))?t.offsetWidth*i.xPercent/100:0)+o,i.y=f-((i.yPercent=f&&(!e&&i.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-f)?-50:0)))?t.offsetHeight*i.yPercent/100:0)+o,i.z=u+o,i.scaleX=ei(d),i.scaleY=ei(p),i.rotation=ei(m)+a,i.rotationX=ei(g)+a,i.rotationY=ei(_)+a,i.skewX=y+a,i.skewY=E+a,i.transformPerspective=x+o,(i.zOrigin=parseFloat(c.split(" ")[2])||!e&&i.zOrigin||0)&&(n[Sn]=Oc(c)),i.xOffset=i.yOffset=0,i.force3D=yn.force3D,i.renderTransform=i.svg?Jy:L0?O0:Ky,i.uncache=0,i},Oc=function(t){return(t=t.split(" "))[0]+" "+t[1]},dd=function(t,e,i){var n=Ui(e);return ei(parseFloat(e)+parseFloat(hr(t,"x",i+"px",n)))+n},Ky=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,O0(t,e)},kr="0deg",$a="0px",zr=") ",O0=function(t,e){var i=e||this,n=i.xPercent,r=i.yPercent,o=i.x,a=i.y,l=i.z,c=i.rotation,h=i.rotationY,f=i.rotationX,u=i.skewX,d=i.skewY,p=i.scaleX,m=i.scaleY,g=i.transformPerspective,_=i.force3D,y=i.target,E=i.zOrigin,x="",b=_==="auto"&&t&&t!==1||_===!0;if(E&&(f!==kr||h!==kr)){var M=parseFloat(h)*Io,T=Math.sin(M),v=Math.cos(M),w;M=parseFloat(f)*Io,w=Math.cos(M),o=dd(y,o,T*w*-E),a=dd(y,a,-Math.sin(M)*-E),l=dd(y,l,v*w*-E+E)}g!==$a&&(x+="perspective("+g+zr),(n||r)&&(x+="translate("+n+"%, "+r+"%) "),(b||o!==$a||a!==$a||l!==$a)&&(x+=l!==$a||b?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+zr),c!==kr&&(x+="rotate("+c+zr),h!==kr&&(x+="rotateY("+h+zr),f!==kr&&(x+="rotateX("+f+zr),(u!==kr||d!==kr)&&(x+="skew("+u+", "+d+zr),(p!==1||m!==1)&&(x+="scale("+p+", "+m+zr),y.style[$e]=x||"translate(0, 0)"},Jy=function(t,e){var i=e||this,n=i.xPercent,r=i.yPercent,o=i.x,a=i.y,l=i.rotation,c=i.skewX,h=i.skewY,f=i.scaleX,u=i.scaleY,d=i.target,p=i.xOrigin,m=i.yOrigin,g=i.xOffset,_=i.yOffset,y=i.forceCSS,E=parseFloat(o),x=parseFloat(a),b,M,T,v,w;l=parseFloat(l),c=parseFloat(c),h=parseFloat(h),h&&(h=parseFloat(h),c+=h,l+=h),l||c?(l*=Io,c*=Io,b=Math.cos(l)*f,M=Math.sin(l)*f,T=Math.sin(l-c)*-u,v=Math.cos(l-c)*u,c&&(h*=Io,w=Math.tan(c-h),w=Math.sqrt(1+w*w),T*=w,v*=w,h&&(w=Math.tan(h),w=Math.sqrt(1+w*w),b*=w,M*=w)),b=ei(b),M=ei(M),T=ei(T),v=ei(v)):(b=f,v=u,M=T=0),(E&&!~(o+"").indexOf("px")||x&&!~(a+"").indexOf("px"))&&(E=hr(d,"x",o,"px"),x=hr(d,"y",a,"px")),(p||m||g||_)&&(E=ei(E+p-(p*b+m*T)+g),x=ei(x+m-(p*M+m*v)+_)),(n||r)&&(w=d.getBBox(),E=ei(E+n/100*w.width),x=ei(x+r/100*w.height)),w="matrix("+b+","+M+","+T+","+v+","+E+","+x+")",d.setAttribute("transform",w),y&&(d.style[$e]=w)},$y=function(t,e,i,n,r){var o=360,a=yi(r),l=parseFloat(r)*(a&&~r.indexOf("rad")?Hr:1),c=l-n,h=n+c+"deg",f,u;return a&&(f=r.split("_")[1],f==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),f==="cw"&&c<0?c=(c+o*y0)%o-~~(c/o)*o:f==="ccw"&&c>0&&(c=(c-o*y0)%o-~~(c/o)*o)),t._pt=u=new on(t._pt,e,i,n,c,Dy),u.e=h,u.u="deg",t._props.push(i),u},A0=function(t,e){for(var i in e)t[i]=e[i];return t},jy=function(t,e,i){var n=A0({},i._gsap),r="perspective,force3D,transformOrigin,svgOrigin",o=i.style,a,l,c,h,f,u,d,p;n.svg?(c=i.getAttribute("transform"),i.setAttribute("transform",""),o[$e]=e,a=Qa(i,1),cr(i,$e),i.setAttribute("transform",c)):(c=getComputedStyle(i)[$e],o[$e]=e,a=Qa(i,1),o[$e]=c);for(l in Us)c=n[l],h=a[l],c!==h&&r.indexOf(l)<0&&(d=Ui(c),p=Ui(h),f=d!==p?hr(i,l,c,p):parseFloat(c),u=parseFloat(h),t._pt=new on(t._pt,a,l,f,u-f,pd),t._pt.u=p||0,t._props.push(l));A0(a,n)};rn("padding,margin,Width,Radius",function(s,t){var e="Top",i="Right",n="Bottom",r="Left",o=(t<3?[e,i,n,r]:[e+r,e+i,n+i,n+r]).map(function(a){return t<2?s+a:"border"+a+s});Fc[t>1?"border"+s:s]=function(a,l,c,h,f){var u,d;if(arguments.length<4)return u=o.map(function(p){return Ns(a,p,c)}),d=u.join(" "),d.split(u[0]).length===5?u[0]:d;u=(h+"").split(" "),d={},o.forEach(function(p,m){return d[p]=u[m]=u[m]||u[(m-1)/2|0]}),a.init(l,d,f)}});var Md={name:"css",register:gd,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,i,n,r){var o=this._props,a=t.style,l=i.vars.startAt,c,h,f,u,d,p,m,g,_,y,E,x,b,M,T,v,w;vd||gd(),this.styles=this.styles||I0(t),v=this.styles.props,this.tween=i;for(m in e)if(m!=="autoRound"&&(h=e[m],!(_n[m]&&ad(m,e,i,n,t,r)))){if(d=typeof h,p=Fc[m],d==="function"&&(h=h.call(i,n,t,r),d=typeof h),d==="string"&&~h.indexOf("random(")&&(h=Co(h)),p)p(this,t,m,h,i)&&(T=1);else if(m.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(m)+"").trim(),h+="",Ls.lastIndex=0,Ls.test(c)||(g=Ui(c),_=Ui(h),_?g!==_&&(c=hr(t,m,c,_)+_):g&&(h+=g)),this.add(a,"setProperty",c,h,n,r,0,0,m),o.push(m),v.push(m,0,a[m]);else if(d!=="undefined"){if(l&&m in l?(c=typeof l[m]=="function"?l[m].call(i,n,t,r):l[m],yi(c)&&~c.indexOf("random(")&&(c=Co(c)),Ui(c+"")||c==="auto"||(c+=yn.units[m]||Ui(Ns(t,m))||""),(c+"").charAt(1)==="="&&(c=Ns(t,m))):c=Ns(t,m),u=parseFloat(c),y=d==="string"&&h.charAt(1)==="="&&h.substr(0,2),y&&(h=h.substr(2)),f=parseFloat(h),m in xs&&(m==="autoAlpha"&&(u===1&&Ns(t,"visibility")==="hidden"&&f&&(u=0),v.push("visibility",0,a.visibility),lr(this,a,"visibility",u?"inherit":"hidden",f?"inherit":"hidden",!f)),m!=="scale"&&m!=="transform"&&(m=xs[m],~m.indexOf(",")&&(m=m.split(",")[0]))),E=m in Us,E){if(this.styles.save(m),w=h,d==="string"&&h.substring(0,6)==="var(--"){if(h=In(t,h.substring(4,h.indexOf(")"))),h.substring(0,5)==="calc("){var C=t.style.perspective;t.style.perspective=h,h=In(t,"perspective"),C?t.style.perspective=C:cr(t,"perspective")}f=parseFloat(h)}if(x||(b=t._gsap,b.renderTransform&&!e.parseTransform||Qa(t,e.parseTransform),M=e.smoothOrigin!==!1&&b.smooth,x=this._pt=new on(this._pt,a,$e,0,1,b.renderTransform,b,0,-1),x.dep=1),m==="scale")this._pt=new on(this._pt,b,"scaleY",b.scaleY,(y?Or(b.scaleY,y+f):f)-b.scaleY||0,pd),this._pt.u=0,o.push("scaleY",m),m+="X";else if(m==="transformOrigin"){v.push(Sn,0,a[Sn]),h=qy(h),b.svg?_d(t,h,0,M,0,this):(_=parseFloat(h.split(" ")[2])||0,_!==b.zOrigin&&lr(this,b,"zOrigin",b.zOrigin,_),lr(this,a,m,Oc(c),Oc(h)));continue}else if(m==="svgOrigin"){_d(t,h,1,M,0,this);continue}else if(m in U0){$y(this,b,m,u,y?Or(u,y+h):h);continue}else if(m==="smoothOrigin"){lr(this,b,"smooth",b.smooth,h);continue}else if(m==="force3D"){b[m]=h;continue}else if(m==="transform"){jy(this,h,t);continue}}else m in a||(m=Lo(m)||m);if(E||(f||f===0)&&(u||u===0)&&!Ly.test(h)&&m in a)g=(c+"").substr((u+"").length),f||(f=0),_=Ui(h)||(m in yn.units?yn.units[m]:g),g!==_&&(u=hr(t,m,c,_)),this._pt=new on(this._pt,E?b:a,m,u,(y?Or(u,y+f):f)-u,!E&&(_==="px"||m==="zIndex")&&e.autoRound!==!1?Fy:pd),this._pt.u=_||0,E&&w!==h?(this._pt.b=c,this._pt.e=w,this._pt.r=Uy):g!==_&&_!=="%"&&(this._pt.b=c,this._pt.r=Ny);else if(m in a)Yy.call(this,t,m,c,y?y+h:h);else if(m in t)this.add(t,m,c||t[m],y?y+h:h,n,r);else if(m!=="parseTransform"){Ic(m,h);continue}E||(m in a?v.push(m,0,a[m]):typeof t[m]=="function"?v.push(m,2,t[m]()):v.push(m,1,c||t[m])),o.push(m)}}T&&fd(this)},render:function(t,e){if(e.tween._time||!xd())for(var i=e._pt;i;)i.r(t,i.d),i=i._next;else e.styles.revert()},get:Ns,aliases:xs,getSetter:function(t,e,i){var n=xs[e];return n&&n.indexOf(",")<0&&(e=n),e in Us&&e!==Sn&&(t._gsap.x||Ns(t,"x"))?i&&x0===i?e==="scale"?zy:ky:(x0=i||{})&&(e==="scale"?Hy:Vy):t.style&&!Pc(t.style[e])?Oy:~e.indexOf("-")?By:Uc(t,e)},core:{_removeProperty:cr,_getMatrix:Sd}};Gi.utils.checkPrefix=Lo;Gi.core.getStyleSaver=I0;(function(s,t,e,i){var n=rn(s+","+t+","+e,function(r){Us[r]=1});rn(t,function(r){yn.units[r]="deg",U0[r]=1}),xs[n[13]]=s+","+t,rn(i,function(r){var o=r.split(":");xs[o[1]]=n[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");rn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(s){yn.units[s]="px"});Gi.registerPlugin(Md);var se=Gi.registerPlugin(Md)||Gi,yA=se.core.Tween;function B0(s,t){for(var e=0;e<t.length;e++){var i=t[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(s,i.key,i)}}function Qy(s,t,e){return t&&B0(s.prototype,t),e&&B0(s,e),s}var Fi,zc,tS,Ln,ur,fr,No,z0,Gr,Uo,H0,Fs,jn,V0,G0=function(){return Fi||typeof window<"u"&&(Fi=window.gsap)&&Fi.registerPlugin&&Fi},W0=1,Do=[],ae=[],Qn=[],el=Date.now,bd=function(t,e){return e},eS=function(){var t=Uo.core,e=t.bridge||{},i=t._scrollers,n=t._proxies;i.push.apply(i,ae),n.push.apply(n,Qn),ae=i,Qn=n,bd=function(o,a){return e[o](a)}},Bs=function(t,e){return~Qn.indexOf(t)&&Qn[Qn.indexOf(t)+1][e]},il=function(t){return!!~H0.indexOf(t)},ln=function(t,e,i,n,r){return t.addEventListener(e,i,{passive:n!==!1,capture:!!r})},an=function(t,e,i,n){return t.removeEventListener(e,i,!!n)},Bc="scrollLeft",kc="scrollTop",wd=function(){return Fs&&Fs.isPressed||ae.cache++},Hc=function(t,e){var i=function n(r){if(r||r===0){W0&&(Ln.history.scrollRestoration="manual");var o=Fs&&Fs.isPressed;r=n.v=Math.round(r)||(Fs&&Fs.iOS?1:0),t(r),n.cacheID=ae.cache,o&&bd("ss",r)}else(e||ae.cache!==n.cacheID||bd("ref"))&&(n.cacheID=ae.cache,n.v=t());return n.v+n.offset};return i.offset=0,t&&i},Wi={s:Bc,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Hc(function(s){return arguments.length?Ln.scrollTo(s,fi.sc()):Ln.pageXOffset||ur[Bc]||fr[Bc]||No[Bc]||0})},fi={s:kc,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Wi,sc:Hc(function(s){return arguments.length?Ln.scrollTo(Wi.sc(),s):Ln.pageYOffset||ur[kc]||fr[kc]||No[kc]||0})},cn=function(t,e){return(e&&e._ctx&&e._ctx.selector||Fi.utils.toArray)(t)[0]||(typeof t=="string"&&Fi.config().nullTargetWarn!==!1?console.warn("Element not found:",t):null)},iS=function(t,e){for(var i=e.length;i--;)if(e[i]===t||e[i].contains(t))return!0;return!1},Os=function(t,e){var i=e.s,n=e.sc;il(t)&&(t=ur.scrollingElement||fr);var r=ae.indexOf(t),o=n===fi.sc?1:2;!~r&&(r=ae.push(t)-1),ae[r+o]||ln(t,"scroll",wd);var a=ae[r+o],l=a||(ae[r+o]=Hc(Bs(t,i),!0)||(il(t)?n:Hc(function(c){return arguments.length?t[i]=c:t[i]})));return l.target=t,a||(l.smooth=Fi.getProperty(t,"scrollBehavior")==="smooth"),l},Vc=function(t,e,i){var n=t,r=t,o=el(),a=o,l=e||50,c=Math.max(500,l*3),h=function(p,m){var g=el();m||g-o>l?(r=n,n=p,a=o,o=g):i?n+=p:n=r+(p-r)/(g-a)*(o-a)},f=function(){r=n=i?0:n,a=o=0},u=function(p){var m=a,g=r,_=el();return(p||p===0)&&p!==n&&h(p),o===a||_-a>c?0:(n+(i?g:-g))/((i?_:o)-m)*1e3};return{update:h,reset:f,getVelocity:u}},tl=function(t,e){return e&&!t._gsapAllow&&t.cancelable!==!1&&t.preventDefault(),t.changedTouches?t.changedTouches[0]:t},k0=function(t){var e=Math.max.apply(Math,t),i=Math.min.apply(Math,t);return Math.abs(e)>=Math.abs(i)?e:i},X0=function(){Uo=Fi.core.globals().ScrollTrigger,Uo&&Uo.core&&eS()},Y0=function(t){return Fi=t||G0(),!zc&&Fi&&typeof document<"u"&&document.body&&(Ln=window,ur=document,fr=ur.documentElement,No=ur.body,H0=[Ln,ur,fr,No],tS=Fi.utils.clamp,V0=Fi.core.context||function(){},Gr="onpointerenter"in No?"pointer":"mouse",z0=ii.isTouch=Ln.matchMedia&&Ln.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Ln||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,jn=ii.eventTypes=("ontouchstart"in fr?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in fr?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return W0=0},500),zc=1),Uo||X0(),zc};Wi.op=fi;ae.cache=0;var ii=(function(){function s(e){this.init(e)}var t=s.prototype;return t.init=function(i){zc||Y0(Fi)||console.warn("Please gsap.registerPlugin(Observer)"),Uo||X0();var n=i.tolerance,r=i.dragMinimum,o=i.type,a=i.target,l=i.lineHeight,c=i.debounce,h=i.preventDefault,f=i.onStop,u=i.onStopDelay,d=i.ignore,p=i.wheelSpeed,m=i.event,g=i.onDragStart,_=i.onDragEnd,y=i.onDrag,E=i.onPress,x=i.onRelease,b=i.onRight,M=i.onLeft,T=i.onUp,v=i.onDown,w=i.onChangeX,C=i.onChangeY,D=i.onChange,I=i.onToggleX,O=i.onToggleY,L=i.onHover,B=i.onHoverEnd,V=i.onMove,z=i.ignoreCheck,$=i.isNormalizer,Z=i.onGestureStart,R=i.onGestureEnd,tt=i.onWheel,it=i.onEnable,at=i.onDisable,j=i.onClick,ht=i.scrollSpeed,bt=i.capture,G=i.allowClicks,J=i.lockAxis,ot=i.onLockAxis;this.target=a=cn(a)||fr,this.vars=i,d&&(d=Fi.utils.toArray(d)),n=n||1e-9,r=r||0,p=p||1,ht=ht||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(Ln.getComputedStyle(No).lineHeight)||22);var Dt,_t,zt,Vt,Ct,Xt,te,W=this,he=0,De=0,Ze=i.passive||!h&&i.passive!==!1,ee=Os(a,Wi),Ee=Os(a,fi),k=ee(),Xe=Ee(),jt=~o.indexOf("touch")&&!~o.indexOf("pointer")&&jn[0]==="pointerdown",P=il(a),S=a.ownerDocument||ur,H=[0,0,0],Y=[0,0,0],Q=0,mt=function(){return Q=el()},ft=function(ct,Ht){return(W.event=ct)&&d&&iS(ct.target,d)||Ht&&jt&&ct.pointerType!=="touch"||z&&z(ct,Ht)},et=function(){W._vx.reset(),W._vy.reset(),_t.pause(),f&&f(W)},rt=function(){var ct=W.deltaX=k0(H),Ht=W.deltaY=k0(Y),ut=Math.abs(ct)>=n,Gt=Math.abs(Ht)>=n;D&&(ut||Gt)&&D(W,ct,Ht,H,Y),ut&&(b&&W.deltaX>0&&b(W),M&&W.deltaX<0&&M(W),w&&w(W),I&&W.deltaX<0!=he<0&&I(W),he=W.deltaX,H[0]=H[1]=H[2]=0),Gt&&(v&&W.deltaY>0&&v(W),T&&W.deltaY<0&&T(W),C&&C(W),O&&W.deltaY<0!=De<0&&O(W),De=W.deltaY,Y[0]=Y[1]=Y[2]=0),(Vt||zt)&&(V&&V(W),zt&&(g&&zt===1&&g(W),y&&y(W),zt=0),Vt=!1),Xt&&!(Xt=!1)&&ot&&ot(W),Ct&&(tt(W),Ct=!1),Dt=0},xt=function(ct,Ht,ut){H[ut]+=ct,Y[ut]+=Ht,W._vx.update(ct),W._vy.update(Ht),c?Dt||(Dt=requestAnimationFrame(rt)):rt()},Lt=function(ct,Ht){J&&!te&&(W.axis=te=Math.abs(ct)>Math.abs(Ht)?"x":"y",Xt=!0),te!=="y"&&(H[2]+=ct,W._vx.update(ct,!0)),te!=="x"&&(Y[2]+=Ht,W._vy.update(Ht,!0)),c?Dt||(Dt=requestAnimationFrame(rt)):rt()},yt=function(ct){if(!ft(ct,1)){ct=tl(ct,h);var Ht=ct.clientX,ut=ct.clientY,Gt=Ht-W.x,Nt=ut-W.y,ie=W.isDragging;W.x=Ht,W.y=ut,(ie||(Gt||Nt)&&(Math.abs(W.startX-Ht)>=r||Math.abs(W.startY-ut)>=r))&&(zt||(zt=ie?2:1),ie||(W.isDragging=!0),Lt(Gt,Nt))}},vt=W.onPress=function(dt){ft(dt,1)||dt&&dt.button||(W.axis=te=null,_t.pause(),W.isPressed=!0,dt=tl(dt),he=De=0,W.startX=W.x=dt.clientX,W.startY=W.y=dt.clientY,W._vx.reset(),W._vy.reset(),ln($?a:S,jn[1],yt,Ze,!0),W.deltaX=W.deltaY=0,E&&E(W))},pt=W.onRelease=function(dt){if(!ft(dt,1)){an($?a:S,jn[1],yt,!0);var ct=!isNaN(W.y-W.startY),Ht=W.isDragging,ut=Ht&&(Math.abs(W.x-W.startX)>3||Math.abs(W.y-W.startY)>3),Gt=tl(dt);!ut&&ct&&(W._vx.reset(),W._vy.reset(),h&&G&&Fi.delayedCall(.08,function(){if(el()-Q>300&&!dt.defaultPrevented){if(dt.target.click)dt.target.click();else if(S.createEvent){var Nt=S.createEvent("MouseEvents");Nt.initMouseEvent("click",!0,!0,Ln,1,Gt.screenX,Gt.screenY,Gt.clientX,Gt.clientY,!1,!1,!1,!1,0,null),dt.target.dispatchEvent(Nt)}}})),W.isDragging=W.isGesturing=W.isPressed=!1,f&&Ht&&!$&&_t.restart(!0),zt&&rt(),_&&Ht&&_(W),x&&x(W,ut)}},Bt=function(ct){return ct.touches&&ct.touches.length>1&&(W.isGesturing=!0)&&Z(ct,W.isDragging)},Yt=function(){return(W.isGesturing=!1)||R(W)},U=function(ct){if(!ft(ct)){var Ht=ee(),ut=Ee();xt((Ht-k)*ht,(ut-Xe)*ht,1),k=Ht,Xe=ut,f&&_t.restart(!0)}},gt=function(ct){if(!ft(ct)){ct=tl(ct,h),tt&&(Ct=!0);var Ht=(ct.deltaMode===1?l:ct.deltaMode===2?Ln.innerHeight:1)*p;xt(ct.deltaX*Ht,ct.deltaY*Ht,0),f&&!$&&_t.restart(!0)}},st=function(ct){if(!ft(ct)){var Ht=ct.clientX,ut=ct.clientY,Gt=Ht-W.x,Nt=ut-W.y;W.x=Ht,W.y=ut,Vt=!0,f&&_t.restart(!0),(Gt||Nt)&&Lt(Gt,Nt)}},St=function(ct){W.event=ct,L(W)},wt=function(ct){W.event=ct,B(W)},lt=function(ct){return ft(ct)||tl(ct,h)&&j(W)};_t=W._dc=Fi.delayedCall(u||.25,et).pause(),W.deltaX=W.deltaY=0,W._vx=Vc(0,50,!0),W._vy=Vc(0,50,!0),W.scrollX=ee,W.scrollY=Ee,W.isDragging=W.isGesturing=W.isPressed=!1,V0(this),W.enable=function(dt){return W.isEnabled||(ln(P?S:a,"scroll",wd),o.indexOf("scroll")>=0&&ln(P?S:a,"scroll",U,Ze,bt),o.indexOf("wheel")>=0&&ln(a,"wheel",gt,Ze,bt),(o.indexOf("touch")>=0&&z0||o.indexOf("pointer")>=0)&&(ln(a,jn[0],vt,Ze,bt),ln(S,jn[2],pt),ln(S,jn[3],pt),G&&ln(a,"click",mt,!0,!0),j&&ln(a,"click",lt),Z&&ln(S,"gesturestart",Bt),R&&ln(S,"gestureend",Yt),L&&ln(a,Gr+"enter",St),B&&ln(a,Gr+"leave",wt),V&&ln(a,Gr+"move",st)),W.isEnabled=!0,W.isDragging=W.isGesturing=W.isPressed=Vt=zt=!1,W._vx.reset(),W._vy.reset(),k=ee(),Xe=Ee(),dt&&dt.type&&vt(dt),it&&it(W)),W},W.disable=function(){W.isEnabled&&(Do.filter(function(dt){return dt!==W&&il(dt.target)}).length||an(P?S:a,"scroll",wd),W.isPressed&&(W._vx.reset(),W._vy.reset(),an($?a:S,jn[1],yt,!0)),an(P?S:a,"scroll",U,bt),an(a,"wheel",gt,bt),an(a,jn[0],vt,bt),an(S,jn[2],pt),an(S,jn[3],pt),an(a,"click",mt,!0),an(a,"click",lt),an(S,"gesturestart",Bt),an(S,"gestureend",Yt),an(a,Gr+"enter",St),an(a,Gr+"leave",wt),an(a,Gr+"move",st),W.isEnabled=W.isPressed=W.isDragging=!1,at&&at(W))},W.kill=W.revert=function(){W.disable();var dt=Do.indexOf(W);dt>=0&&Do.splice(dt,1),Fs===W&&(Fs=0)},Do.push(W),$&&il(a)&&(Fs=W),W.enable(m)},Qy(s,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),s})();ii.version="3.15.0";ii.create=function(s){return new ii(s)};ii.register=Y0;ii.getAll=function(){return Do.slice()};ii.getById=function(s){return Do.filter(function(t){return t.vars.id===s})[0]};G0()&&Fi.registerPlugin(ii);var It,ko,fe,Pe,Un,Ce,Bd,sh,gl,cl,sl,Gc,Xi,ah,Id,un,q0,Z0,zo,hg,Td,ug,hn,Ld,fg,dg,dr,Dd,kd,Ho,zd,hl,Nd,Ed,Wc=1,Yi=Date.now,Ad=Yi(),qn=0,rl=0,K0=function(t,e,i){var n=Nn(t)&&(t.substr(0,6)==="clamp("||t.indexOf("max")>-1);return i["_"+e+"Clamp"]=n,n?t.substr(6,t.length-7):t},J0=function(t,e){return e&&(!Nn(t)||t.substr(0,6)!=="clamp(")?"clamp("+t+")":t},nS=function s(){return rl&&requestAnimationFrame(s)},$0=function(){return ah=1},j0=function(){return ah=0},ys=function(t){return t},ol=function(t){return Math.round(t*1e5)/1e5||0},pg=function(){return typeof window<"u"},mg=function(){return It||pg()&&(It=window.gsap)&&It.registerPlugin&&It},Kr=function(t){return!!~Bd.indexOf(t)},gg=function(t){return(t==="Height"?zd:fe["inner"+t])||Un["client"+t]||Ce["client"+t]},_g=function(t){return Bs(t,"getBoundingClientRect")||(Kr(t)?function(){return nh.width=fe.innerWidth,nh.height=zd,nh}:function(){return ks(t)})},sS=function(t,e,i){var n=i.d,r=i.d2,o=i.a;return(o=Bs(t,"getBoundingClientRect"))?function(){return o()[n]}:function(){return(e?gg(r):t["client"+r])||0}},rS=function(t,e){return!e||~Qn.indexOf(t)?_g(t):function(){return nh}},Ss=function(t,e){var i=e.s,n=e.d2,r=e.d,o=e.a;return Math.max(0,(i="scroll"+n)&&(o=Bs(t,i))?o()-_g(t)()[r]:Kr(t)?(Un[i]||Ce[i])-gg(n):t[i]-t["offset"+n])},Xc=function(t,e){for(var i=0;i<zo.length;i+=3)(!e||~e.indexOf(zo[i+1]))&&t(zo[i],zo[i+1],zo[i+2])},Nn=function(t){return typeof t=="string"},qi=function(t){return typeof t=="function"},al=function(t){return typeof t=="number"},Wr=function(t){return typeof t=="object"},nl=function(t,e,i){return t&&t.progress(e?0:1)&&i&&t.pause()},Fo=function(t,e,i){if(t.enabled){var n=t._ctx?t._ctx.add(function(){return e(t,i)}):e(t,i);n&&n.totalTime&&(t.callbackAnimation=n)}},Oo=Math.abs,vg="left",xg="top",Hd="right",Vd="bottom",Yr="width",qr="height",ul="Right",fl="Left",dl="Top",pl="Bottom",di="padding",Xn="margin",Go="Width",Gd="Height",Si="px",Yn=function(t){return fe.getComputedStyle(t.nodeType===Node.DOCUMENT_NODE?t.scrollingElement:t)},oS=function(t){var e=Yn(t).position;t.style.position=e==="absolute"||e==="fixed"?e:"relative"},Q0=function(t,e){for(var i in e)i in t||(t[i]=e[i]);return t},ks=function(t,e){var i=e&&Yn(t)[Id]!=="matrix(1, 0, 0, 1, 0, 0)"&&It.to(t,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),n=t.getBoundingClientRect?t.getBoundingClientRect():t.scrollingElement.getBoundingClientRect();return i&&i.progress(0).kill(),n},rh=function(t,e){var i=e.d2;return t["offset"+i]||t["client"+i]||0},yg=function(t){var e=[],i=t.labels,n=t.duration(),r;for(r in i)e.push(i[r]/n);return e},aS=function(t){return function(e){return It.utils.snap(yg(t),e)}},Wd=function(t){var e=It.utils.snap(t),i=Array.isArray(t)&&t.slice(0).sort(function(n,r){return n-r});return i?function(n,r,o){o===void 0&&(o=.001);var a;if(!r)return e(n);if(r>0){for(n-=o,a=0;a<i.length;a++)if(i[a]>=n)return i[a];return i[a-1]}else for(a=i.length,n+=o;a--;)if(i[a]<=n)return i[a];return i[0]}:function(n,r,o){o===void 0&&(o=.001);var a=e(n);return!r||Math.abs(a-n)<o||a-n<0==r<0?a:e(r<0?n-t:n+t)}},lS=function(t){return function(e,i){return Wd(yg(t))(e,i.direction)}},Yc=function(t,e,i,n){return i.split(",").forEach(function(r){return t(e,r,n)})},Ri=function(t,e,i,n,r){return t.addEventListener(e,i,{passive:!n,capture:!!r})},Ci=function(t,e,i,n){return t.removeEventListener(e,i,!!n)},qc=function(t,e,i){i=i&&i.wheelHandler,i&&(t(e,"wheel",i),t(e,"touchmove",i))},tg={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Zc={toggleActions:"play",anticipatePin:0},oh={top:0,left:0,center:.5,bottom:1,right:1},Qc=function(t,e){if(Nn(t)){var i=t.indexOf("="),n=~i?+(t.charAt(i-1)+1)*parseFloat(t.substr(i+1)):0;~i&&(t.indexOf("%")>i&&(n*=e/100),t=t.substr(0,i-1)),t=n+(t in oh?oh[t]*e:~t.indexOf("%")?parseFloat(t)*e/100:parseFloat(t)||0)}return t},Kc=function(t,e,i,n,r,o,a,l){var c=r.startColor,h=r.endColor,f=r.fontSize,u=r.indent,d=r.fontWeight,p=Pe.createElement("div"),m=Kr(i)||Bs(i,"pinType")==="fixed",g=t.indexOf("scroller")!==-1,_=m?Ce:i.tagName==="IFRAME"?i.contentDocument.body:i,y=t.indexOf("start")!==-1,E=y?c:h,x="border-color:"+E+";font-size:"+f+";color:"+E+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return x+="position:"+((g||l)&&m?"fixed;":"absolute;"),(g||l||!m)&&(x+=(n===fi?Hd:Vd)+":"+(o+parseFloat(u))+"px;"),a&&(x+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),p._isStart=y,p.setAttribute("class","gsap-marker-"+t+(e?" marker-"+e:"")),p.style.cssText=x,p.innerText=e||e===0?t+"-"+e:t,_.children[0]?_.insertBefore(p,_.children[0]):_.appendChild(p),p._offset=p["offset"+n.op.d2],th(p,0,n,y),p},th=function(t,e,i,n){var r={display:"block"},o=i[n?"os2":"p2"],a=i[n?"p2":"os2"];t._isFlipped=n,r[i.a+"Percent"]=n?-100:0,r[i.a]=n?"1px":0,r["border"+o+Go]=1,r["border"+a+Go]=0,r[i.p]=e+"px",It.set(t,r)},le=[],Ud={},_l,eg=function(){return Yi()-qn>34&&(_l||(_l=requestAnimationFrame(zs)))},Bo=function(){(!hn||!hn.isPressed||hn.startX>Ce.clientWidth)&&(ae.cache++,hn?_l||(_l=requestAnimationFrame(zs)):zs(),qn||$r("scrollStart"),qn=Yi())},Cd=function(){dg=fe.innerWidth,fg=fe.innerHeight},ll=function(t){ae.cache++,(t===!0||!Xi&&!ug&&!Pe.fullscreenElement&&!Pe.webkitFullscreenElement&&(!Ld||dg!==fe.innerWidth||Math.abs(fe.innerHeight-fg)>fe.innerHeight*.25))&&sh.restart(!0)},Jr={},cS=[],Sg=function s(){return Ci(qt,"scrollEnd",s)||Xr(!0)},$r=function(t){return Jr[t]&&Jr[t].map(function(e){return e()})||cS},Dn=[],Mg=function(t){for(var e=0;e<Dn.length;e+=5)(!t||Dn[e+4]&&Dn[e+4].query===t)&&(Dn[e].style.cssText=Dn[e+1],Dn[e].getBBox&&Dn[e].setAttribute("transform",Dn[e+2]||""),Dn[e+3].uncache=1)},bg=function(){return ae.forEach(function(t){return qi(t)&&++t.cacheID&&(t.rec=t())})},Xd=function(t,e){var i;for(un=0;un<le.length;un++)i=le[un],i&&(!e||i._ctx===e)&&(t?i.kill(1):i.revert(!0,!0));hl=!0,e&&Mg(e),e||$r("revert")},wg=function(t,e){ae.cache++,(e||!fn)&&ae.forEach(function(i){return qi(i)&&i.cacheID++&&(i.rec=0)}),Nn(t)&&(fe.history.scrollRestoration=kd=t)},fn,Zr=0,ig,hS=function(){if(ig!==Zr){var t=ig=Zr;requestAnimationFrame(function(){return t===Zr&&Xr(!0)})}},Tg=function(){Ce.appendChild(Ho),zd=!hn&&Ho.offsetHeight||fe.innerHeight,Ce.removeChild(Ho)},ng=function(t){return gl(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(e){return e.style.display=t?"none":"block"})},Xr=function(t,e){if(Un=Pe.documentElement,Ce=Pe.body,Bd=[fe,Pe,Un,Ce],qn&&!t&&!hl){Ri(qt,"scrollEnd",Sg);return}Tg(),fn=qt.isRefreshing=!0,hl||bg();var i=$r("refreshInit");hg&&qt.sort(),e||Xd(),ae.forEach(function(n){qi(n)&&(n.smooth&&(n.target.style.scrollBehavior="auto"),n(0))}),le.slice(0).forEach(function(n){return n.refresh()}),hl=!1,le.forEach(function(n){if(n._subPinOffset&&n.pin){var r=n.vars.horizontal?"offsetWidth":"offsetHeight",o=n.pin[r];n.revert(!0,1),n.adjustPinSpacing(n.pin[r]-o),n.refresh()}}),Nd=1,ng(!0),le.forEach(function(n){var r=Ss(n.scroller,n._dir),o=n.vars.end==="max"||n._endClamp&&n.end>r,a=n._startClamp&&n.start>=r;(o||a)&&n.setPositions(a?r-1:n.start,o?Math.max(a?r:n.start+1,r):n.end,!0)}),ng(!1),Nd=0,i.forEach(function(n){return n&&n.render&&n.render(-1)}),ae.forEach(function(n){qi(n)&&(n.smooth&&requestAnimationFrame(function(){return n.target.style.scrollBehavior="smooth"}),n.rec&&n(n.rec))}),wg(kd,1),sh.pause(),Zr++,fn=2,zs(2),le.forEach(function(n){return qi(n.vars.onRefresh)&&n.vars.onRefresh(n)}),fn=qt.isRefreshing=!1,$r("refresh")},Fd=0,eh=1,ml,zs=function(t){if(t===2||!fn&&!hl){qt.isUpdating=!0,ml&&ml.update(0);var e=le.length,i=Yi(),n=i-Ad>=50,r=e&&le[0].scroll();if(eh=Fd>r?-1:1,fn||(Fd=r),n&&(qn&&!ah&&i-qn>200&&(qn=0,$r("scrollEnd")),sl=Ad,Ad=i),eh<0){for(un=e;un-- >0;)le[un]&&le[un].update(0,n);eh=1}else for(un=0;un<e;un++)le[un]&&le[un].update(0,n);qt.isUpdating=!1}_l=0},Od=[vg,xg,Vd,Hd,Xn+pl,Xn+ul,Xn+dl,Xn+fl,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],ih=Od.concat([Yr,qr,"boxSizing","max"+Go,"max"+Gd,"position",Xn,di,di+dl,di+ul,di+pl,di+fl]),uS=function(t,e,i){Vo(i);var n=t._gsap;if(n.spacerIsNative)Vo(n.spacerState);else if(t._gsap.swappedIn){var r=e.parentNode;r&&(r.insertBefore(t,e),r.removeChild(e))}t._gsap.swappedIn=!1},Rd=function(t,e,i,n){if(!t._gsap.swappedIn){for(var r=Od.length,o=e.style,a=t.style,l;r--;)l=Od[r],o[l]=i[l];o.position=i.position==="absolute"?"absolute":"relative",i.display==="inline"&&(o.display="inline-block"),a[Vd]=a[Hd]="auto",o.flexBasis=i.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[Yr]=rh(t,Wi)+Si,o[qr]=rh(t,fi)+Si,o[di]=a[Xn]=a[xg]=a[vg]="0",Vo(n),a[Yr]=a["max"+Go]=i[Yr],a[qr]=a["max"+Gd]=i[qr],a[di]=i[di],t.parentNode!==e&&(t.parentNode.insertBefore(e,t),e.appendChild(t)),t._gsap.swappedIn=!0}},fS=/([A-Z])/g,Vo=function(t){if(t){var e=t.t.style,i=t.length,n=0,r,o;for((t.t._gsap||It.core.getCache(t.t)).uncache=1;n<i;n+=2)o=t[n+1],r=t[n],o?e[r]=o:e[r]&&e.removeProperty(r.replace(fS,"-$1").toLowerCase())}},Jc=function(t){for(var e=ih.length,i=t.style,n=[],r=0;r<e;r++)n.push(ih[r],i[ih[r]]);return n.t=t,n},dS=function(t,e,i){for(var n=[],r=t.length,o=i?8:0,a;o<r;o+=2)a=t[o],n.push(a,a in e?e[a]:t[o+1]);return n.t=t.t,n},nh={left:0,top:0},sg=function(t,e,i,n,r,o,a,l,c,h,f,u,d,p){qi(t)&&(t=t(l)),Nn(t)&&t.substr(0,3)==="max"&&(t=u+(t.charAt(4)==="="?Qc("0"+t.substr(3),i):0));var m=d?d.time():0,g,_,y;if(d&&d.seek(0),isNaN(t)||(t=+t),al(t))d&&(t=It.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,u,t)),a&&th(a,i,n,!0);else{qi(e)&&(e=e(l));var E=(t||"0").split(" "),x,b,M,T;y=cn(e,l)||Ce,x=ks(y)||{},(!x||!x.left&&!x.top)&&Yn(y).display==="none"&&(T=y.style.display,y.style.display="block",x=ks(y),T?y.style.display=T:y.style.removeProperty("display")),b=Qc(E[0],x[n.d]),M=Qc(E[1]||"0",i),t=x[n.p]-c[n.p]-h+b+r-M,a&&th(a,M,n,i-M<20||a._isStart&&M>20),i-=i-M}if(p&&(l[p]=t||-.001,t<0&&(t=0)),o){var v=t+i,w=o._isStart;g="scroll"+n.d2,th(o,v,n,w&&v>20||!w&&(f?Math.max(Ce[g],Un[g]):o.parentNode[g])<=v+1),f&&(c=ks(a),f&&(o.style[n.op.p]=c[n.op.p]-n.op.m-o._offset+Si))}return d&&y&&(g=ks(y),d.seek(u),_=ks(y),d._caScrollDist=g[n.p]-_[n.p],t=t/d._caScrollDist*u),d&&d.seek(m),d?t:Math.round(t)},pS=/(webkit|moz|length|cssText|inset)/i,rg=function(t,e,i,n){if(t.parentNode!==e){var r=t.style,o,a;if(e===Ce){t._stOrig=r.cssText,a=Yn(t);for(o in a)!+o&&!pS.test(o)&&a[o]&&typeof r[o]=="string"&&o!=="0"&&(r[o]=a[o]);r.top=i,r.left=n}else r.cssText=t._stOrig;It.core.getCache(t).uncache=1,e.appendChild(t)}},Eg=function(t,e,i){var n=e,r=n;return function(o){var a=Math.round(t());return a!==n&&a!==r&&Math.abs(a-n)>3&&Math.abs(a-r)>3&&(o=a,i&&i()),r=n,n=Math.round(o),n}},$c=function(t,e,i){var n={};n[e.p]="+="+i,It.set(t,n)},og=function(t,e){var i=Os(t,e),n="_scroll"+e.p2,r=function o(a,l,c,h,f){var u=o.tween,d=l.onComplete,p={};c=c||i();var m=Eg(i,c,function(){u.kill(),o.tween=0});return f=h&&f||0,h=h||a-c,u&&u.kill(),l[n]=a,l.inherit=!1,l.modifiers=p,p[n]=function(){return m(c+h*u.ratio+f*u.ratio*u.ratio)},l.onUpdate=function(){ae.cache++,o.tween&&zs()},l.onComplete=function(){o.tween=0,d&&d.call(u)},u=o.tween=It.to(t,l),u};return t[n]=i,i.wheelHandler=function(){return r.tween&&r.tween.kill()&&(r.tween=0)},Ri(t,"wheel",i.wheelHandler),qt.isTouch&&Ri(t,"touchmove",i.wheelHandler),r},qt=(function(){function s(e,i){ko||s.register(It)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Dd(this),this.init(e,i)}var t=s.prototype;return t.init=function(i,n){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!rl){this.update=this.refresh=this.kill=ys;return}i=Q0(Nn(i)||al(i)||i.nodeType?{trigger:i}:i,Zc);var r=i,o=r.onUpdate,a=r.toggleClass,l=r.id,c=r.onToggle,h=r.onRefresh,f=r.scrub,u=r.trigger,d=r.pin,p=r.pinSpacing,m=r.invalidateOnRefresh,g=r.anticipatePin,_=r.onScrubComplete,y=r.onSnapComplete,E=r.once,x=r.snap,b=r.pinReparent,M=r.pinSpacer,T=r.containerAnimation,v=r.fastScrollEnd,w=r.preventOverlaps,C=i.horizontal||i.containerAnimation&&i.horizontal!==!1?Wi:fi,D=!f&&f!==0,I=cn(i.scroller||fe),O=It.core.getCache(I),L=Kr(I),B=("pinType"in i?i.pinType:Bs(I,"pinType")||L&&"fixed")==="fixed",V=[i.onEnter,i.onLeave,i.onEnterBack,i.onLeaveBack],z=D&&i.toggleActions.split(" "),$="markers"in i?i.markers:Zc.markers,Z=L?0:parseFloat(Yn(I)["border"+C.p2+Go])||0,R=this,tt=i.onRefreshInit&&function(){return i.onRefreshInit(R)},it=sS(I,L,C),at=rS(I,L),j=0,ht=0,bt=0,G=Os(I,C),J,ot,Dt,_t,zt,Vt,Ct,Xt,te,W,he,De,Ze,ee,Ee,k,Xe,jt,P,S,H,Y,Q,mt,ft,et,rt,xt,Lt,yt,vt,pt,Bt,Yt,U,gt,st,St,wt;if(R._startClamp=R._endClamp=!1,R._dir=C,g*=45,R.scroller=I,R.scroll=T?T.time.bind(T):G,_t=G(),R.vars=i,n=n||i.animation,"refreshPriority"in i&&(hg=1,i.refreshPriority===-9999&&(ml=R)),O.tweenScroll=O.tweenScroll||{top:og(I,fi),left:og(I,Wi)},R.tweenTo=J=O.tweenScroll[C.p],R.scrubDuration=function(ut){Bt=al(ut)&&ut,Bt?pt?pt.duration(ut):pt=It.to(n,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:Bt,paused:!0,onComplete:function(){return _&&_(R)}}):(pt&&pt.progress(1).kill(),pt=0)},n&&(n.vars.lazy=!1,n._initted&&!R.isReverted||n.vars.immediateRender!==!1&&i.immediateRender!==!1&&n.duration()&&n.render(0,!0,!0),R.animation=n.pause(),n.scrollTrigger=R,R.scrubDuration(f),yt=0,l||(l=n.vars.id)),x&&((!Wr(x)||x.push)&&(x={snapTo:x}),"scrollBehavior"in Ce.style&&It.set(L?[Ce,Un]:I,{scrollBehavior:"auto"}),ae.forEach(function(ut){return qi(ut)&&ut.target===(L?Pe.scrollingElement||Un:I)&&(ut.smooth=!1)}),Dt=qi(x.snapTo)?x.snapTo:x.snapTo==="labels"?aS(n):x.snapTo==="labelsDirectional"?lS(n):x.directional!==!1?function(ut,Gt){return Wd(x.snapTo)(ut,Yi()-ht<500?0:Gt.direction)}:It.utils.snap(x.snapTo),Yt=x.duration||{min:.1,max:2},Yt=Wr(Yt)?cl(Yt.min,Yt.max):cl(Yt,Yt),U=It.delayedCall(x.delay||Bt/2||.1,function(){var ut=G(),Gt=Yi()-ht<500,Nt=J.tween;if((Gt||Math.abs(R.getVelocity())<10)&&!Nt&&!ah&&j!==ut){var ie=(ut-Vt)/ee,ci=n&&!D?n.totalProgress():ie,ue=Gt?0:(ci-vt)/(Yi()-sl)*1e3||0,He=It.utils.clamp(-ie,1-ie,Oo(ue/2)*ue/.185),Ei=ie+(x.inertia===!1?0:He),Ve,Ue,ve=x,en=ve.onStart,ke=ve.onInterrupt,ki=ve.onComplete;if(Ve=Dt(Ei,R),al(Ve)||(Ve=Ei),Ue=Math.max(0,Math.round(Vt+Ve*ee)),ut<=Ct&&ut>=Vt&&Ue!==ut){if(Nt&&!Nt._initted&&Nt.data<=Oo(Ue-ut))return;x.inertia===!1&&(He=Ve-ie),J(Ue,{duration:Yt(Oo(Math.max(Oo(Ei-ci),Oo(Ve-ci))*.185/ue/.05||0)),ease:x.ease||"power3",data:Oo(Ue-ut),onInterrupt:function(){return U.restart(!0)&&ke&&Fo(R,ke)},onComplete:function(){R.update(),j=G(),n&&!D&&(pt?pt.resetTo("totalProgress",Ve,n._tTime/n._tDur):n.progress(Ve)),yt=vt=n&&!D?n.totalProgress():R.progress,y&&y(R),ki&&Fo(R,ki)}},ut,He*ee,Ue-ut-He*ee),en&&Fo(R,en,J.tween)}}else R.isActive&&j!==ut&&U.restart(!0)}).pause()),l&&(Ud[l]=R),u=R.trigger=cn(u||d!==!0&&d),wt=u&&u._gsap&&u._gsap.stRevert,wt&&(wt=wt(R)),d=d===!0?u:cn(d),Nn(a)&&(a={targets:u,className:a}),d&&(p===!1||p===Xn||(p=!p&&d.parentNode&&d.parentNode.style&&Yn(d.parentNode).display==="flex"?!1:di),R.pin=d,ot=It.core.getCache(d),ot.spacer?Ee=ot.pinState:(M&&(M=cn(M),M&&!M.nodeType&&(M=M.current||M.nativeElement),ot.spacerIsNative=!!M,M&&(ot.spacerState=Jc(M))),ot.spacer=jt=M||Pe.createElement("div"),jt.classList.add("pin-spacer"),l&&jt.classList.add("pin-spacer-"+l),ot.pinState=Ee=Jc(d)),i.force3D!==!1&&It.set(d,{force3D:!0}),R.spacer=jt=ot.spacer,Lt=Yn(d),mt=Lt[p+C.os2],S=It.getProperty(d),H=It.quickSetter(d,C.a,Si),Rd(d,jt,Lt),Xe=Jc(d)),$){De=Wr($)?Q0($,tg):tg,W=Kc("scroller-start",l,I,C,De,0),he=Kc("scroller-end",l,I,C,De,0,W),P=W["offset"+C.op.d2];var lt=cn(Bs(I,"content")||I);Xt=this.markerStart=Kc("start",l,lt,C,De,P,0,T),te=this.markerEnd=Kc("end",l,lt,C,De,P,0,T),T&&(St=It.quickSetter([Xt,te],C.a,Si)),!B&&!(Qn.length&&Bs(I,"fixedMarkers")===!0)&&(oS(L?Ce:I),It.set([W,he],{force3D:!0}),et=It.quickSetter(W,C.a,Si),xt=It.quickSetter(he,C.a,Si))}if(T){var dt=T.vars.onUpdate,ct=T.vars.onUpdateParams;T.eventCallback("onUpdate",function(){R.update(0,0,1),dt&&dt.apply(T,ct||[])})}if(R.previous=function(){return le[le.indexOf(R)-1]},R.next=function(){return le[le.indexOf(R)+1]},R.revert=function(ut,Gt){if(!Gt)return R.kill(!0);var Nt=ut!==!1||!R.enabled,ie=Xi;Nt!==R.isReverted&&(Nt&&(gt=Math.max(G(),R.scroll.rec||0),bt=R.progress,st=n&&n.progress()),Xt&&[Xt,te,W,he].forEach(function(ci){return ci.style.display=Nt?"none":"block"}),Nt&&(Xi=R,R.update(Nt)),d&&(!b||!R.isActive)&&(Nt?uS(d,jt,Ee):Rd(d,jt,Yn(d),ft)),Nt||R.update(Nt),Xi=ie,R.isReverted=Nt)},R.refresh=function(ut,Gt,Nt,ie){if(!((Xi||!R.enabled)&&!Gt)){if(d&&ut&&qn){Ri(s,"scrollEnd",Sg);return}!fn&&tt&&tt(R),Xi=R,J.tween&&!Nt&&(J.tween.kill(),J.tween=0),pt&&pt.pause(),m&&n&&(n.revert({kill:!1}).invalidate(),n.getChildren?n.getChildren(!0,!0,!1).forEach(function(Mt){return Mt.vars.immediateRender&&Mt.render(0,!0,!0)}):n.vars.immediateRender&&n.render(0,!0,!0)),R.isReverted||R.revert(!0,!0),R._subPinOffset=!1;var ci=it(),ue=at(),He=T?T.duration():Ss(I,C),Ei=ee<=.01||!ee,Ve=0,Ue=ie||0,ve=Wr(Nt)?Nt.end:i.end,en=i.endTrigger||u,ke=Wr(Nt)?Nt.start:i.start||(i.start===0||!u?0:d?"0 0":"0 100%"),ki=R.pinnedContainer=i.pinnedContainer&&cn(i.pinnedContainer,R),nn=u&&Math.max(0,le.indexOf(R))||0,hi=nn,Qe,xi,ps,xo,Ai,ri,zn,yo,A,F,K,X,q;for($&&Wr(Nt)&&(X=It.getProperty(W,C.p),q=It.getProperty(he,C.p));hi-- >0;)ri=le[hi],ri.end||ri.refresh(0,1)||(Xi=R),zn=ri.pin,zn&&(zn===u||zn===d||zn===ki)&&!ri.isReverted&&(F||(F=[]),F.unshift(ri),ri.revert(!0,!0)),ri!==le[hi]&&(nn--,hi--);for(qi(ke)&&(ke=ke(R)),ke=K0(ke,"start",R),Vt=sg(ke,u,ci,C,G(),Xt,W,R,ue,Z,B,He,T,R._startClamp&&"_startClamp")||(d?-.001:0),qi(ve)&&(ve=ve(R)),Nn(ve)&&!ve.indexOf("+=")&&(~ve.indexOf(" ")?ve=(Nn(ke)?ke.split(" ")[0]:"")+ve:(Ve=Qc(ve.substr(2),ci),ve=Nn(ke)?ke:(T?It.utils.mapRange(0,T.duration(),T.scrollTrigger.start,T.scrollTrigger.end,Vt):Vt)+Ve,en=u)),ve=K0(ve,"end",R),Ct=Math.max(Vt,sg(ve||(en?"100% 0":He),en,ci,C,G()+Ve,te,he,R,ue,Z,B,He,T,R._endClamp&&"_endClamp"))||-.001,Ve=0,hi=nn;hi--;)ri=le[hi]||{},zn=ri.pin,zn&&ri.start-ri._pinPush<=Vt&&!T&&ri.end>0&&(Qe=ri.end-(R._startClamp?Math.max(0,ri.start):ri.start),(zn===u&&ri.start-ri._pinPush<Vt||zn===ki)&&isNaN(ke)&&(Ve+=Qe*(1-ri.progress)),zn===d&&(Ue+=Qe));if(Vt+=Ve,Ct+=Ve,R._startClamp&&(R._startClamp+=Ve),R._endClamp&&!fn&&(R._endClamp=Ct||-.001,Ct=Math.min(Ct,Ss(I,C))),ee=Ct-Vt||(Vt-=.01)&&.001,Ei&&(bt=It.utils.clamp(0,1,It.utils.normalize(Vt,Ct,gt))),R._pinPush=Ue,Xt&&Ve&&(Qe={},Qe[C.a]="+="+Ve,ki&&(Qe[C.p]="-="+G()),It.set([Xt,te],Qe)),d&&!(Nd&&R.end>=Ss(I,C)))Qe=Yn(d),xo=C===fi,ps=G(),Y=parseFloat(S(C.a))+Ue,!He&&Ct>1&&(K=(L?Pe.scrollingElement||Un:I).style,K={style:K,value:K["overflow"+C.a.toUpperCase()]},L&&Yn(Ce)["overflow"+C.a.toUpperCase()]!=="scroll"&&(K.style["overflow"+C.a.toUpperCase()]="scroll")),Rd(d,jt,Qe),Xe=Jc(d),xi=ks(d,!0),yo=B&&Os(I,xo?Wi:fi)(),p?(ft=[p+C.os2,ee+Ue+Si],ft.t=jt,hi=p===di?rh(d,C)+ee+Ue:0,hi&&(ft.push(C.d,hi+Si),jt.style.flexBasis!=="auto"&&(jt.style.flexBasis=hi+Si)),Vo(ft),ki&&le.forEach(function(Mt){Mt.pin===ki&&Mt.vars.pinSpacing!==!1&&(Mt._subPinOffset=!0)}),B&&G(gt)):(hi=rh(d,C),hi&&jt.style.flexBasis!=="auto"&&(jt.style.flexBasis=hi+Si)),B&&(Ai={top:xi.top+(xo?ps-Vt:yo)+Si,left:xi.left+(xo?yo:ps-Vt)+Si,boxSizing:"border-box",position:"fixed"},Ai[Yr]=Ai["max"+Go]=Math.ceil(xi.width)+Si,Ai[qr]=Ai["max"+Gd]=Math.ceil(xi.height)+Si,Ai[Xn]=Ai[Xn+dl]=Ai[Xn+ul]=Ai[Xn+pl]=Ai[Xn+fl]="0",Ai[di]=Qe[di],Ai[di+dl]=Qe[di+dl],Ai[di+ul]=Qe[di+ul],Ai[di+pl]=Qe[di+pl],Ai[di+fl]=Qe[di+fl],k=dS(Ee,Ai,b),fn&&G(0)),n?(A=n._initted,Td(1),n.render(n.duration(),!0,!0),Q=S(C.a)-Y+ee+Ue,rt=Math.abs(ee-Q)>1,B&&rt&&k.splice(k.length-2,2),n.render(0,!0,!0),A||n.invalidate(!0),n.parent||n.totalTime(n.totalTime()),Td(0)):Q=ee,K&&(K.value?K.style["overflow"+C.a.toUpperCase()]=K.value:K.style.removeProperty("overflow-"+C.a));else if(u&&G()&&!T)for(xi=u.parentNode;xi&&xi!==Ce;)xi._pinOffset&&(Vt-=xi._pinOffset,Ct-=xi._pinOffset),xi=xi.parentNode;F&&F.forEach(function(Mt){return Mt.revert(!1,!0)}),R.start=Vt,R.end=Ct,_t=zt=fn?gt:G(),!T&&!fn&&(_t<gt&&G(gt),R.scroll.rec=0),R.revert(!1,!0),ht=Yi(),U&&(j=-1,U.restart(!0)),Xi=0,n&&D&&(n._initted||st)&&n.progress()!==st&&n.progress(st||0,!0).render(n.time(),!0,!0),(Ei||bt!==R.progress||T||m||n&&!n._initted)&&(n&&!D&&(n._initted||bt||n.vars.immediateRender!==!1)&&n.totalProgress(T&&Vt<-.001&&!bt?It.utils.normalize(Vt,Ct,0):bt,!0),R.progress=Ei||(_t-Vt)/ee===bt?0:bt),d&&p&&(jt._pinOffset=Math.round(R.progress*Q)),pt&&pt.invalidate(),isNaN(X)||(X-=It.getProperty(W,C.p),q-=It.getProperty(he,C.p),$c(W,C,X),$c(Xt,C,X-(ie||0)),$c(he,C,q),$c(te,C,q-(ie||0))),Ei&&!fn&&R.update(),h&&!fn&&!Ze&&(Ze=!0,h(R),Ze=!1)}},R.getVelocity=function(){return(G()-zt)/(Yi()-sl)*1e3||0},R.endAnimation=function(){nl(R.callbackAnimation),n&&(pt?pt.progress(1):n.paused()?D||nl(n,R.direction<0,1):nl(n,n.reversed()))},R.labelToScroll=function(ut){return n&&n.labels&&(Vt||R.refresh()||Vt)+n.labels[ut]/n.duration()*ee||0},R.getTrailing=function(ut){var Gt=le.indexOf(R),Nt=R.direction>0?le.slice(0,Gt).reverse():le.slice(Gt+1);return(Nn(ut)?Nt.filter(function(ie){return ie.vars.preventOverlaps===ut}):Nt).filter(function(ie){return R.direction>0?ie.end<=Vt:ie.start>=Ct})},R.update=function(ut,Gt,Nt){if(!(T&&!Nt&&!ut)){var ie=fn===!0?gt:R.scroll(),ci=ut?0:(ie-Vt)/ee,ue=ci<0?0:ci>1?1:ci||0,He=R.progress,Ei,Ve,Ue,ve,en,ke,ki,nn;if(Gt&&(zt=_t,_t=T?G():ie,x&&(vt=yt,yt=n&&!D?n.totalProgress():ue)),g&&d&&!Xi&&!Wc&&qn&&(!ue&&Vt<ie+(ie-zt)/(Yi()-sl)*g?ue=1e-4:ue===1&&Ct>ie+(ie-zt)/(Yi()-sl)*g&&(ue=.9999)),ue!==He&&R.enabled){if(Ei=R.isActive=!!ue&&ue<1,Ve=!!He&&He<1,ke=Ei!==Ve,en=ke||!!ue!=!!He,R.direction=ue>He?1:-1,R.progress=ue,en&&!Xi&&(Ue=ue&&!He?0:ue===1?1:He===1?2:3,D&&(ve=!ke&&z[Ue+1]!=="none"&&z[Ue+1]||z[Ue],nn=n&&(ve==="complete"||ve==="reset"||ve in n))),w&&(ke||nn)&&(nn||f||!n)&&(qi(w)?w(R):R.getTrailing(w).forEach(function(ps){return ps.endAnimation()})),D||(pt&&!Xi&&!Wc?(pt._dp._time-pt._start!==pt._time&&pt.render(pt._dp._time-pt._start),pt.resetTo?pt.resetTo("totalProgress",ue,n._tTime/n._tDur):(pt.vars.totalProgress=ue,pt.invalidate().restart())):n&&n.totalProgress(ue,!!(Xi&&(ht||ut)))),d){if(ut&&p&&(jt.style[p+C.os2]=mt),!B)H(ol(Y+Q*ue));else if(en){if(ki=!ut&&ue>He&&Ct+1>ie&&ie+1>=Ss(I,C),b)if(!ut&&(Ei||ki)){var hi=ks(d,!0),Qe=ie-Vt;rg(d,Ce,hi.top+(C===fi?Qe:0)+Si,hi.left+(C===fi?0:Qe)+Si)}else rg(d,jt);Vo(Ei||ki?k:Xe),rt&&ue<1&&Ei||H(Y+(ue===1&&!ki?Q:0))}}x&&!J.tween&&!Xi&&!Wc&&U.restart(!0),a&&(ke||E&&ue&&(ue<1||!Ed))&&gl(a.targets).forEach(function(ps){return ps.classList[Ei||E?"add":"remove"](a.className)}),o&&!D&&!ut&&o(R),en&&!Xi?(D&&(nn&&(ve==="complete"?n.pause().totalProgress(1):ve==="reset"?n.restart(!0).pause():ve==="restart"?n.restart(!0):n[ve]()),o&&o(R)),(ke||!Ed)&&(c&&ke&&Fo(R,c),V[Ue]&&Fo(R,V[Ue]),E&&(ue===1?R.kill(!1,1):V[Ue]=0),ke||(Ue=ue===1?1:3,V[Ue]&&Fo(R,V[Ue]))),v&&!Ei&&Math.abs(R.getVelocity())>(al(v)?v:2500)&&(nl(R.callbackAnimation),pt?pt.progress(1):nl(n,ve==="reverse"?1:!ue,1))):D&&o&&!Xi&&o(R)}if(xt){var xi=T?ie/T.duration()*(T._caScrollDist||0):ie;et(xi+(W._isFlipped?1:0)),xt(xi)}St&&St(-ie/T.duration()*(T._caScrollDist||0))}},R.enable=function(ut,Gt){R.enabled||(R.enabled=!0,Ri(I,"resize",ll),L||Ri(I,"scroll",Bo),tt&&Ri(s,"refreshInit",tt),ut!==!1&&(R.progress=bt=0,_t=zt=j=G()),Gt!==!1&&R.refresh())},R.getTween=function(ut){return ut&&J?J.tween:pt},R.setPositions=function(ut,Gt,Nt,ie){if(T){var ci=T.scrollTrigger,ue=T.duration(),He=ci.end-ci.start;ut=ci.start+He*ut/ue,Gt=ci.start+He*Gt/ue}R.refresh(!1,!1,{start:J0(ut,Nt&&!!R._startClamp),end:J0(Gt,Nt&&!!R._endClamp)},ie),R.update()},R.adjustPinSpacing=function(ut){if(ft&&ut){var Gt=ft.indexOf(C.d)+1;ft[Gt]=parseFloat(ft[Gt])+ut+Si,ft[1]=parseFloat(ft[1])+ut+Si,Vo(ft)}},R.disable=function(ut,Gt){if(ut!==!1&&R.revert(!0,!0),R.enabled&&(R.enabled=R.isActive=!1,Gt||pt&&pt.pause(),gt=0,ot&&(ot.uncache=1),tt&&Ci(s,"refreshInit",tt),U&&(U.pause(),J.tween&&J.tween.kill()&&(J.tween=0)),!L)){for(var Nt=le.length;Nt--;)if(le[Nt].scroller===I&&le[Nt]!==R)return;Ci(I,"resize",ll),L||Ci(I,"scroll",Bo)}},R.kill=function(ut,Gt){R.disable(ut,Gt),pt&&!Gt&&pt.kill(),l&&delete Ud[l];var Nt=le.indexOf(R);Nt>=0&&le.splice(Nt,1),Nt===un&&eh>0&&un--,Nt=0,le.forEach(function(ie){return ie.scroller===R.scroller&&(Nt=1)}),Nt||fn||(R.scroll.rec=0),n&&(n.scrollTrigger=null,ut&&n.revert({kill:!1}),Gt||n.kill()),Xt&&[Xt,te,W,he].forEach(function(ie){return ie.parentNode&&ie.parentNode.removeChild(ie)}),ml===R&&(ml=0),d&&(ot&&(ot.uncache=1),Nt=0,le.forEach(function(ie){return ie.pin===d&&Nt++}),Nt||(ot.spacer=0)),i.onKill&&i.onKill(R)},le.push(R),R.enable(!1,!1),wt&&wt(R),n&&n.add&&!ee){var Ht=R.update;R.update=function(){R.update=Ht,ae.cache++,Vt||Ct||R.refresh()},It.delayedCall(.01,R.update),ee=.01,Vt=Ct=0}else R.refresh();d&&hS()},s.register=function(i){return ko||(It=i||mg(),pg()&&window.document&&s.enable(),ko=rl),ko},s.defaults=function(i){if(i)for(var n in i)Zc[n]=i[n];return Zc},s.disable=function(i,n){rl=0,le.forEach(function(o){return o[n?"kill":"disable"](i)}),Ci(fe,"wheel",Bo),Ci(Pe,"scroll",Bo),clearInterval(Gc),Ci(Pe,"touchcancel",ys),Ci(Ce,"touchstart",ys),Yc(Ci,Pe,"pointerdown,touchstart,mousedown",$0),Yc(Ci,Pe,"pointerup,touchend,mouseup",j0),sh.kill(),Xc(Ci);for(var r=0;r<ae.length;r+=3)qc(Ci,ae[r],ae[r+1]),qc(Ci,ae[r],ae[r+2])},s.enable=function(){if(fe=window,Pe=document,Un=Pe.documentElement,Ce=Pe.body,It){if(gl=It.utils.toArray,cl=It.utils.clamp,Dd=It.core.context||ys,Td=It.core.suppressOverwrites||ys,kd=fe.history.scrollRestoration||"auto",Fd=fe.pageYOffset||0,It.core.globals("ScrollTrigger",s),Ce){rl=1,Ho=document.createElement("div"),Ho.style.height="100vh",Ho.style.position="absolute",Tg(),nS(),ii.register(It),s.isTouch=ii.isTouch,dr=ii.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Ld=ii.isTouch===1,Ri(fe,"wheel",Bo),Bd=[fe,Pe,Un,Ce],It.matchMedia?(s.matchMedia=function(h){var f=It.matchMedia(),u;for(u in h)f.add(u,h[u]);return f},It.addEventListener("matchMediaInit",function(){bg(),Xd()}),It.addEventListener("matchMediaRevert",function(){return Mg()}),It.addEventListener("matchMedia",function(){Xr(0,1),$r("matchMedia")}),It.matchMedia().add("(orientation: portrait)",function(){return Cd(),Cd})):console.warn("Requires GSAP 3.11.0 or later"),Cd(),Ri(Pe,"scroll",Bo);var i=Ce.hasAttribute("style"),n=Ce.style,r=n.borderTopStyle,o=It.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),n.borderTopStyle="solid",a=ks(Ce),fi.m=Math.round(a.top+fi.sc())||0,Wi.m=Math.round(a.left+Wi.sc())||0,r?n.borderTopStyle=r:n.removeProperty("border-top-style"),i||(Ce.setAttribute("style",""),Ce.removeAttribute("style")),Gc=setInterval(eg,250),It.delayedCall(.5,function(){return Wc=0}),Ri(Pe,"touchcancel",ys),Ri(Ce,"touchstart",ys),Yc(Ri,Pe,"pointerdown,touchstart,mousedown",$0),Yc(Ri,Pe,"pointerup,touchend,mouseup",j0),Id=It.utils.checkPrefix("transform"),ih.push(Id),ko=Yi(),sh=It.delayedCall(.2,Xr).pause(),zo=[Pe,"visibilitychange",function(){var h=fe.innerWidth,f=fe.innerHeight;Pe.hidden?(q0=h,Z0=f):(q0!==h||Z0!==f)&&ll()},Pe,"DOMContentLoaded",Xr,fe,"load",Xr,fe,"resize",ll],Xc(Ri),le.forEach(function(h){return h.enable(0,1)}),l=0;l<ae.length;l+=3)qc(Ci,ae[l],ae[l+1]),qc(Ci,ae[l],ae[l+2])}else if(Pe){var c=function h(){s.enable(),Pe.removeEventListener("DOMContentLoaded",h)};Pe.addEventListener("DOMContentLoaded",c)}}},s.config=function(i){"limitCallbacks"in i&&(Ed=!!i.limitCallbacks);var n=i.syncInterval;n&&clearInterval(Gc)||(Gc=n)&&setInterval(eg,n),"ignoreMobileResize"in i&&(Ld=s.isTouch===1&&i.ignoreMobileResize),"autoRefreshEvents"in i&&(Xc(Ci)||Xc(Ri,i.autoRefreshEvents||"none"),ug=(i.autoRefreshEvents+"").indexOf("resize")===-1)},s.scrollerProxy=function(i,n){var r=cn(i),o=ae.indexOf(r),a=Kr(r);~o&&ae.splice(o,a?6:2),n&&(a?Qn.unshift(fe,n,Ce,n,Un,n):Qn.unshift(r,n))},s.clearMatchMedia=function(i){le.forEach(function(n){return n._ctx&&n._ctx.query===i&&n._ctx.kill(!0,!0)})},s.isInViewport=function(i,n,r){var o=(Nn(i)?cn(i):i).getBoundingClientRect(),a=o[r?Yr:qr]*n||0;return r?o.right-a>0&&o.left+a<fe.innerWidth:o.bottom-a>0&&o.top+a<fe.innerHeight},s.positionInViewport=function(i,n,r){Nn(i)&&(i=cn(i));var o=i.getBoundingClientRect(),a=o[r?Yr:qr],l=n==null?a/2:n in oh?oh[n]*a:~n.indexOf("%")?parseFloat(n)*a/100:parseFloat(n)||0;return r?(o.left+l)/fe.innerWidth:(o.top+l)/fe.innerHeight},s.killAll=function(i){if(le.slice(0).forEach(function(r){return r.vars.id!=="ScrollSmoother"&&r.kill()}),i!==!0){var n=Jr.killAll||[];Jr={},n.forEach(function(r){return r()})}},s})();qt.version="3.15.0";qt.saveStyles=function(s){return s?gl(s).forEach(function(t){if(t&&t.style){var e=Dn.indexOf(t);e>=0&&Dn.splice(e,5),Dn.push(t,t.style.cssText,t.getBBox&&t.getAttribute("transform"),It.core.getCache(t),Dd())}}):Dn};qt.revert=function(s,t){return Xd(!s,t)};qt.create=function(s,t){return new qt(s,t)};qt.refresh=function(s){return s?ll(!0):(ko||qt.register())&&Xr(!0)};qt.update=function(s){return++ae.cache&&zs(s===!0?2:0)};qt.clearScrollMemory=wg;qt.maxScroll=function(s,t){return Ss(s,t?Wi:fi)};qt.getScrollFunc=function(s,t){return Os(cn(s),t?Wi:fi)};qt.getById=function(s){return Ud[s]};qt.getAll=function(){return le.filter(function(s){return s.vars.id!=="ScrollSmoother"})};qt.isScrolling=function(){return!!qn};qt.snapDirectional=Wd;qt.addEventListener=function(s,t){var e=Jr[s]||(Jr[s]=[]);~e.indexOf(t)||e.push(t)};qt.removeEventListener=function(s,t){var e=Jr[s],i=e&&e.indexOf(t);i>=0&&e.splice(i,1)};qt.batch=function(s,t){var e=[],i={},n=t.interval||.016,r=t.batchMax||1e9,o=function(c,h){var f=[],u=[],d=It.delayedCall(n,function(){h(f,u),f=[],u=[]}).pause();return function(p){f.length||d.restart(!0),f.push(p.trigger),u.push(p),r<=f.length&&d.progress(1)}},a;for(a in t)i[a]=a.substr(0,2)==="on"&&qi(t[a])&&a!=="onRefreshInit"?o(a,t[a]):t[a];return qi(r)&&(r=r(),Ri(qt,"refresh",function(){return r=t.batchMax()})),gl(s).forEach(function(l){var c={};for(a in i)c[a]=i[a];c.trigger=l,e.push(qt.create(c))}),e};var ag=function(t,e,i,n){return e>n?t(n):e<0&&t(0),i>n?(n-e)/(i-e):i<0?e/(e-i):1},Pd=function s(t,e){e===!0?t.style.removeProperty("touch-action"):t.style.touchAction=e===!0?"auto":e?"pan-"+e+(ii.isTouch?" pinch-zoom":""):"none",t===Un&&s(Ce,e)},jc={auto:1,scroll:1},mS=function(t){var e=t.event,i=t.target,n=t.axis,r=(e.changedTouches?e.changedTouches[0]:e).target,o=r._gsap||It.core.getCache(r),a=Yi(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;r&&r!==Ce&&(r.scrollHeight<=r.clientHeight&&r.scrollWidth<=r.clientWidth||!(jc[(l=Yn(r)).overflowY]||jc[l.overflowX]));)r=r.parentNode;o._isScroll=r&&r!==i&&!Kr(r)&&(jc[(l=Yn(r)).overflowY]||jc[l.overflowX]),o._isScrollT=a}(o._isScroll||n==="x")&&(e.stopPropagation(),e._gsapAllow=!0)},Ag=function(t,e,i,n){return ii.create({target:t,capture:!0,debounce:!1,lockAxis:!0,type:e,onWheel:n=n&&mS,onPress:n,onDrag:n,onScroll:n,onEnable:function(){return i&&Ri(Pe,ii.eventTypes[0],cg,!1,!0)},onDisable:function(){return Ci(Pe,ii.eventTypes[0],cg,!0)}})},gS=/(input|label|select|textarea)/i,lg,cg=function(t){var e=gS.test(t.target.tagName);(e||lg)&&(t._gsapAllow=!0,lg=e)},_S=function(t){Wr(t)||(t={}),t.preventDefault=t.isNormalizer=t.allowClicks=!0,t.type||(t.type="wheel,touch"),t.debounce=!!t.debounce,t.id=t.id||"normalizer";var e=t,i=e.normalizeScrollX,n=e.momentum,r=e.allowNestedScroll,o=e.onRelease,a,l,c=cn(t.target)||Un,h=It.core.globals().ScrollSmoother,f=h&&h.get(),u=dr&&(t.content&&cn(t.content)||f&&t.content!==!1&&!f.smooth()&&f.content()),d=Os(c,fi),p=Os(c,Wi),m=1,g=(ii.isTouch&&fe.visualViewport?fe.visualViewport.scale*fe.visualViewport.width:fe.outerWidth)/fe.innerWidth,_=0,y=qi(n)?function(){return n(a)}:function(){return n||2.8},E,x,b=Ag(c,t.type,!0,r),M=function(){return x=!1},T=ys,v=ys,w=function(){l=Ss(c,fi),v=cl(dr?1:0,l),i&&(T=cl(0,Ss(c,Wi))),E=Zr},C=function(){u._gsap.y=ol(parseFloat(u._gsap.y)+d.offset)+"px",u.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(u._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},D=function(){if(x){requestAnimationFrame(M);var $=ol(a.deltaY/2),Z=v(d.v-$);if(u&&Z!==d.v+d.offset){d.offset=Z-d.v;var R=ol((parseFloat(u&&u._gsap.y)||0)-d.offset);u.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+R+", 0, 1)",u._gsap.y=R+"px",d.cacheID=ae.cache,zs()}return!0}d.offset&&C(),x=!0},I,O,L,B,V=function(){w(),I.isActive()&&I.vars.scrollY>l&&(d()>l?I.progress(1)&&d(l):I.resetTo("scrollY",l))};return u&&It.set(u,{y:"+=0"}),t.ignoreCheck=function(z){return dr&&z.type==="touchmove"&&D(z)||m>1.05&&z.type!=="touchstart"||a.isGesturing||z.touches&&z.touches.length>1},t.onPress=function(){x=!1;var z=m;m=ol((fe.visualViewport&&fe.visualViewport.scale||1)/g),I.pause(),z!==m&&Pd(c,m>1.01?!0:i?!1:"x"),O=p(),L=d(),w(),E=Zr},t.onRelease=t.onGestureStart=function(z,$){if(d.offset&&C(),!$)B.restart(!0);else{ae.cache++;var Z=y(),R,tt;i&&(R=p(),tt=R+Z*.05*-z.velocityX/.227,Z*=ag(p,R,tt,Ss(c,Wi)),I.vars.scrollX=T(tt)),R=d(),tt=R+Z*.05*-z.velocityY/.227,Z*=ag(d,R,tt,Ss(c,fi)),I.vars.scrollY=v(tt),I.invalidate().duration(Z).play(.01),(dr&&I.vars.scrollY>=l||R>=l-1)&&It.to({},{onUpdate:V,duration:Z})}o&&o(z)},t.onWheel=function(){I._ts&&I.pause(),Yi()-_>1e3&&(E=0,_=Yi())},t.onChange=function(z,$,Z,R,tt){if(Zr!==E&&w(),$&&i&&p(T(R[2]===$?O+(z.startX-z.x):p()+$-R[1])),Z){d.offset&&C();var it=tt[2]===Z,at=it?L+z.startY-z.y:d()+Z-tt[1],j=v(at);it&&at!==j&&(L+=j-at),d(j)}(Z||$)&&zs()},t.onEnable=function(){Pd(c,i?!1:"x"),qt.addEventListener("refresh",V),Ri(fe,"resize",V),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=p.smooth=!1),b.enable()},t.onDisable=function(){Pd(c,!0),Ci(fe,"resize",V),qt.removeEventListener("refresh",V),b.kill()},t.lockAxis=t.lockAxis!==!1,a=new ii(t),a.iOS=dr,dr&&!d()&&d(1),dr&&It.ticker.add(ys),B=a._dc,I=It.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:i?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:Eg(d,d(),function(){return I.pause()})},onUpdate:zs,onComplete:B.vars.onComplete}),a};qt.sort=function(s){if(qi(s))return le.sort(s);var t=fe.pageYOffset||0;return qt.getAll().forEach(function(e){return e._sortY=e.trigger?t+e.trigger.getBoundingClientRect().top:e.start+fe.innerHeight}),le.sort(s||function(e,i){return(e.vars.refreshPriority||0)*-1e6+(e.vars.containerAnimation?1e6:e._sortY)-((i.vars.containerAnimation?1e6:i._sortY)+(i.vars.refreshPriority||0)*-1e6)})};qt.observe=function(s){return new ii(s)};qt.normalizeScroll=function(s){if(typeof s>"u")return hn;if(s===!0&&hn)return hn.enable();if(s===!1){hn&&hn.kill(),hn=s;return}var t=s instanceof ii?s:_S(s);return hn&&hn.target===t.target&&hn.kill(),Kr(t.target)&&(hn=t),t};qt.core={_getVelocityProp:Vc,_inputObserver:Ag,_scrollers:ae,_proxies:Qn,bridge:{ss:function(){qn||$r("scrollStart"),qn=Yi()},ref:function(){return Xi}}};mg()&&It.registerPlugin(qt);var Tr={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Er={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},o_=0,Tp=1,a_=2;var Jl=1,gu=2,wa=3,Ar=0,li=1,bn=2,Kn=0,Ta=1,wn=2,Ep=3,Ap=4,l_=5;var oo=100,c_=101,h_=102,u_=103,f_=104,d_=200,p_=201,m_=202,g_=203,Cp=204,Rp=205,__=206,v_=207,x_=208,y_=209,S_=210,M_=211,b_=212,w_=213,T_=214,Oh=0,Bh=1,kh=2,aa=3,zh=4,Hh=5,Vh=6,Gh=7,_u=0,E_=1,A_=2,hs=0,$l=1,jl=2,Ql=3,ao=4,tc=5,ec=6,ic=7;var Pp=300,Cr=301,lo=302,vu=303,xu=304,nc=306,Wh=1e3,bs=1001,Xh=1002,Di=1003,C_=1004;var sc=1005;var Oi=1006,yu=1007;var Cs=1008;var Tn=1009,Ip=1010,Lp=1011,Ea=1012,Su=1013,us=1014,Jn=1015,gi=1016,Mu=1017,bu=1018,Aa=1020,Dp=35902,Np=35899,Up=1021,Fp=1022,$n=1023,ws=1026,Rr=1027,wu=1028,Tu=1029,Pr=1030,Eu=1031;var Au=1033,rc=33776,oc=33777,ac=33778,lc=33779,Cu=35840,Ru=35841,Pu=35842,Iu=35843,Lu=36196,Du=37492,Nu=37496,Uu=37488,Fu=37489,cc=37490,Ou=37491,Bu=37808,ku=37809,zu=37810,Hu=37811,Vu=37812,Gu=37813,Wu=37814,Xu=37815,Yu=37816,qu=37817,Zu=37818,Ku=37819,Ju=37820,$u=37821,ju=36492,Qu=36494,tf=36495,ef=36283,nf=36284,hc=36285,sf=36286;var El=2300,Yh=2301,Uh=2302,mp=2303,gp=2400,_p=2401,vp=2402;var R_=3200,Op=3201;var uc=0,P_=1,Ks="",Ii="srgb",Al="srgb-linear",Cl="linear",Te="srgb";var Fh=7680;var I_=519,L_=512,D_=513,N_=514,rf=515,U_=516,F_=517,of=518,O_=519,B_=35044,af=35048;var Bp="300 es",ss=2e3,la=2001;function vS(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function xS(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Rl(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function k_(){let s=Rl("canvas");return s.style.display="block",s}var Cg={},ca=null;function kp(...s){let t="THREE."+s.shift();ca?ca("log",t,...s):console.log(t,...s)}function z_(s){let t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=s[1];e&&e.isStackTrace?s[0]+=" "+e.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Zt(...s){s=z_(s);let t="THREE."+s.shift();if(ca)ca("warn",t,...s);else{let e=s[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...s)}}function $t(...s){s=z_(s);let t="THREE."+s.shift();if(ca)ca("error",t,...s);else{let e=s[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...s)}}function io(...s){let t=s.join(" ");t in Cg||(Cg[t]=!0,Zt(...s))}function H_(s,t,e){return new Promise(function(i,n){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:n();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}var V_={[Oh]:Bh,[kh]:Vh,[zh]:Gh,[aa]:Hh,[Bh]:Oh,[Vh]:kh,[Gh]:zh,[Hh]:aa},os=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let n=i[t];if(n!==void 0){let r=n.indexOf(e);r!==-1&&n.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let n=i.slice(0);for(let r=0,o=n.length;r<o;r++)n[r].call(this,t);t.target=null}}},Zi=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Rg=1234567,ra=Math.PI/180,ha=180/Math.PI;function Ca(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Zi[s&255]+Zi[s>>8&255]+Zi[s>>16&255]+Zi[s>>24&255]+"-"+Zi[t&255]+Zi[t>>8&255]+"-"+Zi[t>>16&15|64]+Zi[t>>24&255]+"-"+Zi[e&63|128]+Zi[e>>8&255]+"-"+Zi[e>>16&255]+Zi[e>>24&255]+Zi[i&255]+Zi[i>>8&255]+Zi[i>>16&255]+Zi[i>>24&255]).toLowerCase()}function ce(s,t,e){return Math.max(t,Math.min(e,s))}function zp(s,t){return(s%t+t)%t}function yS(s,t,e,i,n){return i+(s-t)*(n-i)/(e-t)}function SS(s,t,e){return s!==t?(e-s)/(t-s):0}function Tl(s,t,e){return(1-e)*s+e*t}function MS(s,t,e,i){return Tl(s,t,1-Math.exp(-e*i))}function bS(s,t=1){return t-Math.abs(zp(s,t*2)-t)}function wS(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function TS(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function ES(s,t){return s+Math.floor(Math.random()*(t-s+1))}function AS(s,t){return s+Math.random()*(t-s)}function CS(s){return s*(.5-Math.random())}function RS(s){s!==void 0&&(Rg=s);let t=Rg+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function PS(s){return s*ra}function IS(s){return s*ha}function LS(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function DS(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function NS(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function US(s,t,e,i,n){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+i)/2),h=o((t+i)/2),f=r((t-i)/2),u=o((t-i)/2),d=r((i-t)/2),p=o((i-t)/2);switch(n){case"XYX":s.set(a*h,l*f,l*u,a*c);break;case"YZY":s.set(l*u,a*h,l*f,a*c);break;case"ZXZ":s.set(l*f,l*u,a*h,a*c);break;case"XZX":s.set(a*h,l*p,l*d,a*c);break;case"YXY":s.set(l*d,a*h,l*p,a*c);break;case"ZYZ":s.set(l*p,l*d,a*h,a*c);break;default:Zt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}}function sa(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function dn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Js={DEG2RAD:ra,RAD2DEG:ha,generateUUID:Ca,clamp:ce,euclideanModulo:zp,mapLinear:yS,inverseLerp:SS,lerp:Tl,damp:MS,pingpong:bS,smoothstep:wS,smootherstep:TS,randInt:ES,randFloat:AS,randFloatSpread:CS,seededRandom:RS,degToRad:PS,radToDeg:IS,isPowerOfTwo:LS,ceilPowerOfTwo:DS,floorPowerOfTwo:NS,setQuaternionFromProperEuler:US,normalize:dn,denormalize:sa},Xp=class Xp{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,n=t.elements;return this.x=n[0]*e+n[3]*i+n[6],this.y=n[1]*e+n[4]*i+n[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ce(this.x,t.x,e.x),this.y=ce(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ce(this.x,t,e),this.y=ce(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ce(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(ce(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),n=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*n+t.x,this.y=r*n+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Xp.prototype.isVector2=!0;var Tt=Xp,Mi=class{constructor(t=0,e=0,i=0,n=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=n}static slerpFlat(t,e,i,n,r,o,a){let l=i[n+0],c=i[n+1],h=i[n+2],f=i[n+3],u=r[o+0],d=r[o+1],p=r[o+2],m=r[o+3];if(f!==m||l!==u||c!==d||h!==p){let g=l*u+c*d+h*p+f*m;g<0&&(u=-u,d=-d,p=-p,m=-m,g=-g);let _=1-a;if(g<.9995){let y=Math.acos(g),E=Math.sin(y);_=Math.sin(_*y)/E,a=Math.sin(a*y)/E,l=l*_+u*a,c=c*_+d*a,h=h*_+p*a,f=f*_+m*a}else{l=l*_+u*a,c=c*_+d*a,h=h*_+p*a,f=f*_+m*a;let y=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=y,c*=y,h*=y,f*=y}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,n,r,o){let a=i[n],l=i[n+1],c=i[n+2],h=i[n+3],f=r[o],u=r[o+1],d=r[o+2],p=r[o+3];return t[e]=a*p+h*f+l*d-c*u,t[e+1]=l*p+h*u+c*f-a*d,t[e+2]=c*p+h*d+a*u-l*f,t[e+3]=h*p-a*f-l*u-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,n){return this._x=t,this._y=e,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,n=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(n/2),f=a(r/2),u=l(i/2),d=l(n/2),p=l(r/2);switch(o){case"XYZ":this._x=u*h*f+c*d*p,this._y=c*d*f-u*h*p,this._z=c*h*p+u*d*f,this._w=c*h*f-u*d*p;break;case"YXZ":this._x=u*h*f+c*d*p,this._y=c*d*f-u*h*p,this._z=c*h*p-u*d*f,this._w=c*h*f+u*d*p;break;case"ZXY":this._x=u*h*f-c*d*p,this._y=c*d*f+u*h*p,this._z=c*h*p+u*d*f,this._w=c*h*f-u*d*p;break;case"ZYX":this._x=u*h*f-c*d*p,this._y=c*d*f+u*h*p,this._z=c*h*p-u*d*f,this._w=c*h*f+u*d*p;break;case"YZX":this._x=u*h*f+c*d*p,this._y=c*d*f+u*h*p,this._z=c*h*p-u*d*f,this._w=c*h*f-u*d*p;break;case"XZY":this._x=u*h*f-c*d*p,this._y=c*d*f-u*h*p,this._z=c*h*p+u*d*f,this._w=c*h*f+u*d*p;break;default:Zt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,n=Math.sin(i);return this._x=t.x*n,this._y=t.y*n,this._z=t.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],n=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],f=e[10],u=i+a+f;if(u>0){let d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(o-n)*d}else if(i>a&&i>f){let d=2*Math.sqrt(1+i-a-f);this._w=(h-l)/d,this._x=.25*d,this._y=(n+o)/d,this._z=(r+c)/d}else if(a>f){let d=2*Math.sqrt(1+a-i-f);this._w=(r-c)/d,this._x=(n+o)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+f-i-a);this._w=(o-n)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ce(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let n=Math.min(1,e/i);return this.slerp(t,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,n=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+o*a+n*c-r*l,this._y=n*h+o*l+r*a-i*c,this._z=r*h+o*c+i*l-n*a,this._w=o*h-i*a-n*l-r*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,n=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(i=-i,n=-n,r=-r,o=-o,a=-a);let l=1-e;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+i*e,this._y=this._y*l+n*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+n*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(n*Math.sin(t),n*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Yp=class Yp{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Pg.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Pg.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,n=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*n,this.y=r[1]*e+r[4]*i+r[7]*n,this.z=r[2]*e+r[5]*i+r[8]*n,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,n=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*n+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*n+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*n+r[14])*o,this}applyQuaternion(t){let e=this.x,i=this.y,n=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*n-a*i),h=2*(a*e-r*n),f=2*(r*i-o*e);return this.x=e+l*c+o*f-a*h,this.y=i+l*h+a*c-r*f,this.z=n+l*f+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,n=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*n,this.y=r[1]*e+r[5]*i+r[9]*n,this.z=r[2]*e+r[6]*i+r[10]*n,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ce(this.x,t.x,e.x),this.y=ce(this.y,t.y,e.y),this.z=ce(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ce(this.x,t,e),this.y=ce(this.y,t,e),this.z=ce(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ce(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,n=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=n*l-r*a,this.y=r*o-i*l,this.z=i*a-n*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Yd.copy(this).projectOnVector(t),this.sub(Yd)}reflect(t){return this.sub(Yd.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(ce(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,n=this.z-t.z;return e*e+i*i+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let n=Math.sin(e)*t;return this.x=n*Math.sin(i),this.y=Math.cos(e)*t,this.z=n*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),n=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=n,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Yp.prototype.isVector3=!0;var N=Yp,Yd=new N,Pg=new Mi,qp=class qp{constructor(t,e,i,n,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,n,r,o,a,l,c)}set(t,e,i,n,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=n,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,n=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],f=i[7],u=i[2],d=i[5],p=i[8],m=n[0],g=n[3],_=n[6],y=n[1],E=n[4],x=n[7],b=n[2],M=n[5],T=n[8];return r[0]=o*m+a*y+l*b,r[3]=o*g+a*E+l*M,r[6]=o*_+a*x+l*T,r[1]=c*m+h*y+f*b,r[4]=c*g+h*E+f*M,r[7]=c*_+h*x+f*T,r[2]=u*m+d*y+p*b,r[5]=u*g+d*E+p*M,r[8]=u*_+d*x+p*T,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-i*r*h+i*a*l+n*r*c-n*o*l}invert(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],f=h*o-a*c,u=a*l-h*r,d=c*r-o*l,p=e*f+i*u+n*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return t[0]=f*m,t[1]=(n*c-h*i)*m,t[2]=(a*i-n*o)*m,t[3]=u*m,t[4]=(h*e-n*l)*m,t[5]=(n*r-a*e)*m,t[6]=d*m,t[7]=(i*l-c*e)*m,t[8]=(o*e-i*r)*m,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,n,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-n*c,n*l,-n*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return io("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(qd.makeScale(t,e)),this}rotate(t){return io("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(qd.makeRotation(-t)),this}translate(t,e){return io("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(qd.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let n=0;n<9;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};qp.prototype.isMatrix3=!0;var ne=qp,qd=new ne,Ig=new ne().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Lg=new ne().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function FS(){let s={enabled:!0,workingColorSpace:Al,spaces:{},convert:function(n,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Te&&(n.r=Ys(n.r),n.g=Ys(n.g),n.b=Ys(n.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(n.applyMatrix3(this.spaces[r].toXYZ),n.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Te&&(n.r=oa(n.r),n.g=oa(n.g),n.b=oa(n.b))),n},workingToColorSpace:function(n,r){return this.convert(n,this.workingColorSpace,r)},colorSpaceToWorking:function(n,r){return this.convert(n,r,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Ks?Cl:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,r=this.workingColorSpace){return n.fromArray(this.spaces[r].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,r,o){return n.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(n,r){return io("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(n,r)},toWorkingColorSpace:function(n,r){return io("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(n,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return s.define({[Al]:{primaries:t,whitePoint:i,transfer:Cl,toXYZ:Ig,fromXYZ:Lg,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ii},outputColorSpaceConfig:{drawingBufferColorSpace:Ii}},[Ii]:{primaries:t,whitePoint:i,transfer:Te,toXYZ:Ig,fromXYZ:Lg,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ii}}}),s}var de=FS();function Ys(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function oa(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Wo,qh=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Wo===void 0&&(Wo=Rl("canvas")),Wo.width=t.width,Wo.height=t.height;let n=Wo.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),i=Wo}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Rl("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let n=i.getImageData(0,0,t.width,t.height),r=n.data;for(let o=0;o<r.length;o++)r[o]=Ys(r[o]/255)*255;return i.putImageData(n,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ys(e[i]/255)*255):e[i]=Ys(e[i]);return{data:e,width:t.width,height:t.height}}else return Zt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},OS=0,ua=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:OS++}),this.uuid=Ca(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let o=0,a=n.length;o<a;o++)n[o].isDataTexture?r.push(Zd(n[o].image)):r.push(Zd(n[o]))}else r=Zd(n);i.url=r}return e||(t.images[this.uuid]=i),i}};function Zd(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?qh.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Zt("Texture: Unable to serialize Texture."),{})}var BS=0,Kd=new N,mn=class s extends os{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,i=bs,n=bs,r=Oi,o=Cs,a=$n,l=Tn,c=s.DEFAULT_ANISOTROPY,h=Ks){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:BS++}),this.uuid=Ca(),this.name="",this.source=new ua(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Tt(0,0),this.repeat=new Tt(1,1),this.center=new Tt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ne,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Kd).x}get height(){return this.source.getSize(Kd).y}get depth(){return this.source.getSize(Kd).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){Zt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let n=this[e];if(n===void 0){Zt(`Texture.setValues(): property '${e}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Pp)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Wh:t.x=t.x-Math.floor(t.x);break;case bs:t.x=t.x<0?0:1;break;case Xh:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Wh:t.y=t.y-Math.floor(t.y);break;case bs:t.y=t.y<0?0:1;break;case Xh:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};mn.DEFAULT_IMAGE=null;mn.DEFAULT_MAPPING=Pp;mn.DEFAULT_ANISOTROPY=1;var Zp=class Zp{constructor(t=0,e=0,i=0,n=1){this.x=t,this.y=e,this.z=i,this.w=n}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,n){return this.x=t,this.y=e,this.z=i,this.w=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,n=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*n+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*n+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*n+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*n+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,n,r,l=t.elements,c=l[0],h=l[4],f=l[8],u=l[1],d=l[5],p=l[9],m=l[2],g=l[6],_=l[10];if(Math.abs(h-u)<.01&&Math.abs(f-m)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+m)<.1&&Math.abs(p+g)<.1&&Math.abs(c+d+_-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let E=(c+1)/2,x=(d+1)/2,b=(_+1)/2,M=(h+u)/4,T=(f+m)/4,v=(p+g)/4;return E>x&&E>b?E<.01?(i=0,n=.707106781,r=.707106781):(i=Math.sqrt(E),n=M/i,r=T/i):x>b?x<.01?(i=.707106781,n=0,r=.707106781):(n=Math.sqrt(x),i=M/n,r=v/n):b<.01?(i=.707106781,n=.707106781,r=0):(r=Math.sqrt(b),i=T/r,n=v/r),this.set(i,n,r,e),this}let y=Math.sqrt((g-p)*(g-p)+(f-m)*(f-m)+(u-h)*(u-h));return Math.abs(y)<.001&&(y=1),this.x=(g-p)/y,this.y=(f-m)/y,this.z=(u-h)/y,this.w=Math.acos((c+d+_-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ce(this.x,t.x,e.x),this.y=ce(this.y,t.y,e.y),this.z=ce(this.z,t.z,e.z),this.w=ce(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ce(this.x,t,e),this.y=ce(this.y,t,e),this.z=ce(this.z,t,e),this.w=ce(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ce(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Zp.prototype.isVector4=!0;var qe=Zp,Zh=class extends os{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Oi,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new qe(0,0,t,e),this.scissorTest=!1,this.viewport=new qe(0,0,t,e),this.textures=[];let n={width:t,height:e,depth:i.depth},r=new mn(n),o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Oi,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let n=0,r=this.textures.length;n<r;n++)this.textures[n].image.width=t,this.textures[n].image.height=e,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let n=Object.assign({},t.textures[e].image);this.textures[e].source=new ua(n)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},ni=class extends Zh{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},Pl=class extends mn{constructor(t=null,e=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Di,this.minFilter=Di,this.wrapR=bs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Kh=class extends mn{constructor(t=null,e=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Di,this.minFilter=Di,this.wrapR=bs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var mu=class mu{constructor(t,e,i,n,r,o,a,l,c,h,f,u,d,p,m,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,n,r,o,a,l,c,h,f,u,d,p,m,g)}set(t,e,i,n,r,o,a,l,c,h,f,u,d,p,m,g){let _=this.elements;return _[0]=t,_[4]=e,_[8]=i,_[12]=n,_[1]=r,_[5]=o,_[9]=a,_[13]=l,_[2]=c,_[6]=h,_[10]=f,_[14]=u,_[3]=d,_[7]=p,_[11]=m,_[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new mu().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,i=t.elements,n=1/Xo.setFromMatrixColumn(t,0).length(),r=1/Xo.setFromMatrixColumn(t,1).length(),o=1/Xo.setFromMatrixColumn(t,2).length();return e[0]=i[0]*n,e[1]=i[1]*n,e[2]=i[2]*n,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,n=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(n),c=Math.sin(n),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let u=o*h,d=o*f,p=a*h,m=a*f;e[0]=l*h,e[4]=-l*f,e[8]=c,e[1]=d+p*c,e[5]=u-m*c,e[9]=-a*l,e[2]=m-u*c,e[6]=p+d*c,e[10]=o*l}else if(t.order==="YXZ"){let u=l*h,d=l*f,p=c*h,m=c*f;e[0]=u+m*a,e[4]=p*a-d,e[8]=o*c,e[1]=o*f,e[5]=o*h,e[9]=-a,e[2]=d*a-p,e[6]=m+u*a,e[10]=o*l}else if(t.order==="ZXY"){let u=l*h,d=l*f,p=c*h,m=c*f;e[0]=u-m*a,e[4]=-o*f,e[8]=p+d*a,e[1]=d+p*a,e[5]=o*h,e[9]=m-u*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let u=o*h,d=o*f,p=a*h,m=a*f;e[0]=l*h,e[4]=p*c-d,e[8]=u*c+m,e[1]=l*f,e[5]=m*c+u,e[9]=d*c-p,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let u=o*l,d=o*c,p=a*l,m=a*c;e[0]=l*h,e[4]=m-u*f,e[8]=p*f+d,e[1]=f,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=d*f+p,e[10]=u-m*f}else if(t.order==="XZY"){let u=o*l,d=o*c,p=a*l,m=a*c;e[0]=l*h,e[4]=-f,e[8]=c*h,e[1]=u*f+m,e[5]=o*h,e[9]=d*f-p,e[2]=p*f-d,e[6]=a*h,e[10]=m*f+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(kS,t,zS)}lookAt(t,e,i){let n=this.elements;return Fn.subVectors(t,e),Fn.lengthSq()===0&&(Fn.z=1),Fn.normalize(),pr.crossVectors(i,Fn),pr.lengthSq()===0&&(Math.abs(i.z)===1?Fn.x+=1e-4:Fn.z+=1e-4,Fn.normalize(),pr.crossVectors(i,Fn)),pr.normalize(),lh.crossVectors(Fn,pr),n[0]=pr.x,n[4]=lh.x,n[8]=Fn.x,n[1]=pr.y,n[5]=lh.y,n[9]=Fn.y,n[2]=pr.z,n[6]=lh.z,n[10]=Fn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,n=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],f=i[5],u=i[9],d=i[13],p=i[2],m=i[6],g=i[10],_=i[14],y=i[3],E=i[7],x=i[11],b=i[15],M=n[0],T=n[4],v=n[8],w=n[12],C=n[1],D=n[5],I=n[9],O=n[13],L=n[2],B=n[6],V=n[10],z=n[14],$=n[3],Z=n[7],R=n[11],tt=n[15];return r[0]=o*M+a*C+l*L+c*$,r[4]=o*T+a*D+l*B+c*Z,r[8]=o*v+a*I+l*V+c*R,r[12]=o*w+a*O+l*z+c*tt,r[1]=h*M+f*C+u*L+d*$,r[5]=h*T+f*D+u*B+d*Z,r[9]=h*v+f*I+u*V+d*R,r[13]=h*w+f*O+u*z+d*tt,r[2]=p*M+m*C+g*L+_*$,r[6]=p*T+m*D+g*B+_*Z,r[10]=p*v+m*I+g*V+_*R,r[14]=p*w+m*O+g*z+_*tt,r[3]=y*M+E*C+x*L+b*$,r[7]=y*T+E*D+x*B+b*Z,r[11]=y*v+E*I+x*V+b*R,r[15]=y*w+E*O+x*z+b*tt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],n=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],f=t[6],u=t[10],d=t[14],p=t[3],m=t[7],g=t[11],_=t[15],y=l*d-c*u,E=a*d-c*f,x=a*u-l*f,b=o*d-c*h,M=o*u-l*h,T=o*f-a*h;return e*(m*y-g*E+_*x)-i*(p*y-g*b+_*M)+n*(p*E-m*b+_*T)-r*(p*x-m*M+g*T)}determinantAffine(){let t=this.elements,e=t[0],i=t[4],n=t[8],r=t[1],o=t[5],a=t[9],l=t[2],c=t[6],h=t[10];return e*(o*h-a*c)-i*(r*h-a*l)+n*(r*c-o*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let n=this.elements;return t.isVector3?(n[12]=t.x,n[13]=t.y,n[14]=t.z):(n[12]=t,n[13]=e,n[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],f=t[9],u=t[10],d=t[11],p=t[12],m=t[13],g=t[14],_=t[15],y=e*a-i*o,E=e*l-n*o,x=e*c-r*o,b=i*l-n*a,M=i*c-r*a,T=n*c-r*l,v=h*m-f*p,w=h*g-u*p,C=h*_-d*p,D=f*g-u*m,I=f*_-d*m,O=u*_-d*g,L=y*O-E*I+x*D+b*C-M*w+T*v;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let B=1/L;return t[0]=(a*O-l*I+c*D)*B,t[1]=(n*I-i*O-r*D)*B,t[2]=(m*T-g*M+_*b)*B,t[3]=(u*M-f*T-d*b)*B,t[4]=(l*C-o*O-c*w)*B,t[5]=(e*O-n*C+r*w)*B,t[6]=(g*x-p*T-_*E)*B,t[7]=(h*T-u*x+d*E)*B,t[8]=(o*I-a*C+c*v)*B,t[9]=(i*C-e*I-r*v)*B,t[10]=(p*M-m*x+_*y)*B,t[11]=(f*x-h*M-d*y)*B,t[12]=(a*w-o*D-l*v)*B,t[13]=(e*D-i*w+n*v)*B,t[14]=(m*E-p*b-g*y)*B,t[15]=(h*b-f*E+u*y)*B,this}scale(t){let e=this.elements,i=t.x,n=t.y,r=t.z;return e[0]*=i,e[4]*=n,e[8]*=r,e[1]*=i,e[5]*=n,e[9]*=r,e[2]*=i,e[6]*=n,e[10]*=r,e[3]*=i,e[7]*=n,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],n=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,n))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),n=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+i,c*a-n*l,c*l+n*a,0,c*a+n*l,h*a+i,h*l-n*o,0,c*l-n*a,h*l+n*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,n,r,o){return this.set(1,i,r,0,t,1,o,0,e,n,1,0,0,0,0,1),this}compose(t,e,i){let n=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,f=a+a,u=r*c,d=r*h,p=r*f,m=o*h,g=o*f,_=a*f,y=l*c,E=l*h,x=l*f,b=i.x,M=i.y,T=i.z;return n[0]=(1-(m+_))*b,n[1]=(d+x)*b,n[2]=(p-E)*b,n[3]=0,n[4]=(d-x)*M,n[5]=(1-(u+_))*M,n[6]=(g+y)*M,n[7]=0,n[8]=(p+E)*T,n[9]=(g-y)*T,n[10]=(1-(u+m))*T,n[11]=0,n[12]=t.x,n[13]=t.y,n[14]=t.z,n[15]=1,this}decompose(t,e,i){let n=this.elements;t.x=n[12],t.y=n[13],t.z=n[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let o=Xo.set(n[0],n[1],n[2]).length(),a=Xo.set(n[4],n[5],n[6]).length(),l=Xo.set(n[8],n[9],n[10]).length();r<0&&(o=-o),ts.copy(this);let c=1/o,h=1/a,f=1/l;return ts.elements[0]*=c,ts.elements[1]*=c,ts.elements[2]*=c,ts.elements[4]*=h,ts.elements[5]*=h,ts.elements[6]*=h,ts.elements[8]*=f,ts.elements[9]*=f,ts.elements[10]*=f,e.setFromRotationMatrix(ts),i.x=o,i.y=a,i.z=l,this}makePerspective(t,e,i,n,r,o,a=ss,l=!1){let c=this.elements,h=2*r/(e-t),f=2*r/(i-n),u=(e+t)/(e-t),d=(i+n)/(i-n),p,m;if(l)p=r/(o-r),m=o*r/(o-r);else if(a===ss)p=-(o+r)/(o-r),m=-2*o*r/(o-r);else if(a===la)p=-o/(o-r),m=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,n,r,o,a=ss,l=!1){let c=this.elements,h=2/(e-t),f=2/(i-n),u=-(e+t)/(e-t),d=-(i+n)/(i-n),p,m;if(l)p=1/(o-r),m=o/(o-r);else if(a===ss)p=-2/(o-r),m=-(o+r)/(o-r);else if(a===la)p=-1/(o-r),m=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let n=0;n<16;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};mu.prototype.isMatrix4=!0;var be=mu,Xo=new N,ts=new be,kS=new N(0,0,0),zS=new N(1,1,1),pr=new N,lh=new N,Fn=new N,Dg=new be,Ng=new Mi,Mn=class s{constructor(t=0,e=0,i=0,n=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=n}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,n=this._order){return this._x=t,this._y=e,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let n=t.elements,r=n[0],o=n[4],a=n[8],l=n[1],c=n[5],h=n[9],f=n[2],u=n[6],d=n[10];switch(e){case"XYZ":this._y=Math.asin(ce(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ce(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(ce(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ce(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ce(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-ce(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Zt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Dg.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Dg,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ng.setFromEuler(this),this.setFromQuaternion(Ng,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Mn.DEFAULT_ORDER="XYZ";var fa=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},HS=0,Ug=new N,Yo=new Mi,Hs=new be,ch=new N,vl=new N,VS=new N,GS=new Mi,Fg=new N(1,0,0),Og=new N(0,1,0),Bg=new N(0,0,1),kg={type:"added"},WS={type:"removed"},qo={type:"childadded",child:null},Jd={type:"childremoved",child:null},mi=class s extends os{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:HS++}),this.uuid=Ca(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new N,e=new Mn,i=new Mi,n=new N(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new be},normalMatrix:{value:new ne}}),this.matrix=new be,this.matrixWorld=new be,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Yo.setFromAxisAngle(t,e),this.quaternion.multiply(Yo),this}rotateOnWorldAxis(t,e){return Yo.setFromAxisAngle(t,e),this.quaternion.premultiply(Yo),this}rotateX(t){return this.rotateOnAxis(Fg,t)}rotateY(t){return this.rotateOnAxis(Og,t)}rotateZ(t){return this.rotateOnAxis(Bg,t)}translateOnAxis(t,e){return Ug.copy(t).applyQuaternion(this.quaternion),this.position.add(Ug.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Fg,t)}translateY(t){return this.translateOnAxis(Og,t)}translateZ(t){return this.translateOnAxis(Bg,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Hs.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?ch.copy(t):ch.set(t,e,i);let n=this.parent;this.updateWorldMatrix(!0,!1),vl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Hs.lookAt(vl,ch,this.up):Hs.lookAt(ch,vl,this.up),this.quaternion.setFromRotationMatrix(Hs),n&&(Hs.extractRotation(n.matrixWorld),Yo.setFromRotationMatrix(Hs),this.quaternion.premultiply(Yo.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?($t("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(kg),qo.child=t,this.dispatchEvent(qo),qo.child=null):$t("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(WS),Jd.child=t,this.dispatchEvent(Jd),Jd.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Hs.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Hs.multiply(t.parent.matrixWorld)),t.applyMatrix4(Hs),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(kg),qo.child=t,this.dispatchEvent(qo),qo.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,n=this.children.length;i<n;i++){let o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let n=this.children;for(let r=0,o=n.length;r<o;r++)n[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vl,t,VS),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vl,GS,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,i=t.y,n=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*n,r[13]+=i-r[1]*e-r[5]*i-r[9]*n,r[14]+=n-r[2]*e-r[6]*i-r[10]*n}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,i)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let n={};n.uuid=this.uuid,n.type=this.type,n.name=this.name,n.castShadow=this.castShadow,n.receiveShadow=this.receiveShadow,n.visible=this.visible,n.frustumCulled=this.frustumCulled,n.renderOrder=this.renderOrder,n.static=this.static,n.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.pivot!==null&&(n.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(n.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(n.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(a=>({...a})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(t),n.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));n.material=a}else n.material=r(t.materials,this.material);if(this.children.length>0){n.children=[];for(let a=0;a<this.children.length;a++)n.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){n.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];n.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),f=o(t.shapes),u=o(t.skeletons),d=o(t.animations),p=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),f.length>0&&(i.shapes=f),u.length>0&&(i.skeletons=u),d.length>0&&(i.animations=d),p.length>0&&(i.nodes=p)}return i.object=n,i;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let n=t.children[i];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};mi.DEFAULT_UP=new N(0,1,0);mi.DEFAULT_MATRIX_AUTO_UPDATE=!0;mi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var rs=class extends mi{constructor(){super(),this.isGroup=!0,this.type="Group"}},XS={type:"move"},da=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new rs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new rs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new rs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let n=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let m of t.hand.values()){let g=e.getJointPose(m,i),_=this._getHandJoint(c,m);g!==null&&(_.matrix.fromArray(g.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=g.radius),_.visible=g!==null}let h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,p=.005;c.inputState.pinching&&u>d+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=d-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(n=e.getPose(t.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(a.matrix.fromArray(n.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,n.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(n.linearVelocity)):a.hasLinearVelocity=!1,n.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(n.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(XS)))}return a!==null&&(a.visible=n!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new rs;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},G_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},mr={h:0,s:0,l:0},hh={h:0,s:0,l:0};function $d(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var Wt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let n=t;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ii){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,de.colorSpaceToWorking(this,e),this}setRGB(t,e,i,n=de.workingColorSpace){return this.r=t,this.g=e,this.b=i,de.colorSpaceToWorking(this,n),this}setHSL(t,e,i,n=de.workingColorSpace){if(t=zp(t,1),e=ce(e,0,1),i=ce(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=$d(o,r,t+1/3),this.g=$d(o,r,t),this.b=$d(o,r,t-1/3)}return de.colorSpaceToWorking(this,n),this}setStyle(t,e=Ii){function i(r){r!==void 0&&parseFloat(r)<1&&Zt("Color: Alpha component of "+t+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=n[1],a=n[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Zt("Color: Unknown color model "+t)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=n[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Zt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ii){let i=G_[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Zt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ys(t.r),this.g=Ys(t.g),this.b=Ys(t.b),this}copyLinearToSRGB(t){return this.r=oa(t.r),this.g=oa(t.g),this.b=oa(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ii){return de.workingToColorSpace(Ki.copy(this),t),Math.round(ce(Ki.r*255,0,255))*65536+Math.round(ce(Ki.g*255,0,255))*256+Math.round(ce(Ki.b*255,0,255))}getHexString(t=Ii){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=de.workingColorSpace){de.workingToColorSpace(Ki.copy(this),e);let i=Ki.r,n=Ki.g,r=Ki.b,o=Math.max(i,n,r),a=Math.min(i,n,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let f=o-a;switch(c=h<=.5?f/(o+a):f/(2-o-a),o){case i:l=(n-r)/f+(n<r?6:0);break;case n:l=(r-i)/f+2;break;case r:l=(i-n)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=de.workingColorSpace){return de.workingToColorSpace(Ki.copy(this),e),t.r=Ki.r,t.g=Ki.g,t.b=Ki.b,t}getStyle(t=Ii){de.workingToColorSpace(Ki.copy(this),t);let e=Ki.r,i=Ki.g,n=Ki.b;return t!==Ii?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(t,e,i){return this.getHSL(mr),this.setHSL(mr.h+t,mr.s+e,mr.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(mr),t.getHSL(hh);let i=Tl(mr.h,hh.h,e),n=Tl(mr.s,hh.s,e),r=Tl(mr.l,hh.l,e);return this.setHSL(i,n,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,n=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*n,this.g=r[1]*e+r[4]*i+r[7]*n,this.b=r[2]*e+r[5]*i+r[8]*n,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ki=new Wt;Wt.NAMES=G_;var Il=class s{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Wt(t),this.density=e}clone(){return new s(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var xr=class extends mi{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Mn,this.environmentIntensity=1,this.environmentRotation=new Mn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},es=new N,Vs=new N,jd=new N,Gs=new N,Zo=new N,Ko=new N,zg=new N,Qd=new N,tp=new N,ep=new N,ip=new qe,np=new qe,sp=new qe,ns=class s{constructor(t=new N,e=new N,i=new N){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,n){n.subVectors(i,e),es.subVectors(t,e),n.cross(es);let r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(t,e,i,n,r){es.subVectors(n,e),Vs.subVectors(i,e),jd.subVectors(t,e);let o=es.dot(es),a=es.dot(Vs),l=es.dot(jd),c=Vs.dot(Vs),h=Vs.dot(jd),f=o*c-a*a;if(f===0)return r.set(0,0,0),null;let u=1/f,d=(c*l-a*h)*u,p=(o*h-a*l)*u;return r.set(1-d-p,p,d)}static containsPoint(t,e,i,n){return this.getBarycoord(t,e,i,n,Gs)===null?!1:Gs.x>=0&&Gs.y>=0&&Gs.x+Gs.y<=1}static getInterpolation(t,e,i,n,r,o,a,l){return this.getBarycoord(t,e,i,n,Gs)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Gs.x),l.addScaledVector(o,Gs.y),l.addScaledVector(a,Gs.z),l)}static getInterpolatedAttribute(t,e,i,n,r,o){return ip.setScalar(0),np.setScalar(0),sp.setScalar(0),ip.fromBufferAttribute(t,e),np.fromBufferAttribute(t,i),sp.fromBufferAttribute(t,n),o.setScalar(0),o.addScaledVector(ip,r.x),o.addScaledVector(np,r.y),o.addScaledVector(sp,r.z),o}static isFrontFacing(t,e,i,n){return es.subVectors(i,e),Vs.subVectors(t,e),es.cross(Vs).dot(n)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,n){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[n]),this}setFromAttributeAndIndices(t,e,i,n){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return es.subVectors(this.c,this.b),Vs.subVectors(this.a,this.b),es.cross(Vs).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,n,r){return s.getInterpolation(t,this.a,this.b,this.c,e,i,n,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,n=this.b,r=this.c,o,a;Zo.subVectors(n,i),Ko.subVectors(r,i),Qd.subVectors(t,i);let l=Zo.dot(Qd),c=Ko.dot(Qd);if(l<=0&&c<=0)return e.copy(i);tp.subVectors(t,n);let h=Zo.dot(tp),f=Ko.dot(tp);if(h>=0&&f<=h)return e.copy(n);let u=l*f-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(i).addScaledVector(Zo,o);ep.subVectors(t,r);let d=Zo.dot(ep),p=Ko.dot(ep);if(p>=0&&d<=p)return e.copy(r);let m=d*c-l*p;if(m<=0&&c>=0&&p<=0)return a=c/(c-p),e.copy(i).addScaledVector(Ko,a);let g=h*p-d*f;if(g<=0&&f-h>=0&&d-p>=0)return zg.subVectors(r,n),a=(f-h)/(f-h+(d-p)),e.copy(n).addScaledVector(zg,a);let _=1/(g+m+u);return o=m*_,a=u*_,e.copy(i).addScaledVector(Zo,o).addScaledVector(Ko,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Ts=class{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(is.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(is.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=is.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,is):is.fromBufferAttribute(r,o),is.applyMatrix4(t.matrixWorld),this.expandByPoint(is);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),uh.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),uh.copy(i.boundingBox)),uh.applyMatrix4(t.matrixWorld),this.union(uh)}let n=t.children;for(let r=0,o=n.length;r<o;r++)this.expandByObject(n[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,is),is.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(xl),fh.subVectors(this.max,xl),Jo.subVectors(t.a,xl),$o.subVectors(t.b,xl),jo.subVectors(t.c,xl),gr.subVectors($o,Jo),_r.subVectors(jo,$o),jr.subVectors(Jo,jo);let e=[0,-gr.z,gr.y,0,-_r.z,_r.y,0,-jr.z,jr.y,gr.z,0,-gr.x,_r.z,0,-_r.x,jr.z,0,-jr.x,-gr.y,gr.x,0,-_r.y,_r.x,0,-jr.y,jr.x,0];return!rp(e,Jo,$o,jo,fh)||(e=[1,0,0,0,1,0,0,0,1],!rp(e,Jo,$o,jo,fh))?!1:(dh.crossVectors(gr,_r),e=[dh.x,dh.y,dh.z],rp(e,Jo,$o,jo,fh))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,is).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(is).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ws[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ws[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ws[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ws[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ws[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ws[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ws[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ws[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ws),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Ws=[new N,new N,new N,new N,new N,new N,new N,new N],is=new N,uh=new Ts,Jo=new N,$o=new N,jo=new N,gr=new N,_r=new N,jr=new N,xl=new N,fh=new N,dh=new N,Qr=new N;function rp(s,t,e,i,n){for(let r=0,o=s.length-3;r<=o;r+=3){Qr.fromArray(s,r);let a=n.x*Math.abs(Qr.x)+n.y*Math.abs(Qr.y)+n.z*Math.abs(Qr.z),l=t.dot(Qr),c=e.dot(Qr),h=i.dot(Qr);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var pi=new N,ph=new Tt,YS=0,ye=class extends os{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:YS++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=B_,this.updateRanges=[],this.gpuType=Jn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[t+n]=e.array[i+n];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)ph.fromBufferAttribute(this,e),ph.applyMatrix3(t),this.setXY(e,ph.x,ph.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)pi.fromBufferAttribute(this,e),pi.applyMatrix3(t),this.setXYZ(e,pi.x,pi.y,pi.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)pi.fromBufferAttribute(this,e),pi.applyMatrix4(t),this.setXYZ(e,pi.x,pi.y,pi.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)pi.fromBufferAttribute(this,e),pi.applyNormalMatrix(t),this.setXYZ(e,pi.x,pi.y,pi.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)pi.fromBufferAttribute(this,e),pi.transformDirection(t),this.setXYZ(e,pi.x,pi.y,pi.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=sa(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=dn(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=sa(e,this.array)),e}setX(t,e){return this.normalized&&(e=dn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=sa(e,this.array)),e}setY(t,e){return this.normalized&&(e=dn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=sa(e,this.array)),e}setZ(t,e){return this.normalized&&(e=dn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=sa(e,this.array)),e}setW(t,e){return this.normalized&&(e=dn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=dn(e,this.array),i=dn(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,n){return t*=this.itemSize,this.normalized&&(e=dn(e,this.array),i=dn(i,this.array),n=dn(n,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this}setXYZW(t,e,i,n,r){return t*=this.itemSize,this.normalized&&(e=dn(e,this.array),i=dn(i,this.array),n=dn(n,this.array),r=dn(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var Ll=class extends ye{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var Dl=class extends ye{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var me=class extends ye{constructor(t,e,i){super(new Float32Array(t),e,i)}},qS=new Ts,yl=new N,op=new N,Es=class{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):qS.setFromPoints(t).getCenter(i);let n=0;for(let r=0,o=t.length;r<o;r++)n=Math.max(n,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(n),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;yl.subVectors(t,this.center);let e=yl.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),n=(i-this.radius)*.5;this.center.addScaledVector(yl,n/i),this.radius+=n}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(op.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(yl.copy(t.center).add(op)),this.expandByPoint(yl.copy(t.center).sub(op))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},ZS=0,Zn=new be,ap=new mi,Qo=new N,On=new Ts,Sl=new Ts,Pi=new N,Re=class s extends os{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ZS++}),this.uuid=Ca(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(vS(t)?Dl:Ll)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new ne().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Zn.makeRotationFromQuaternion(t),this.applyMatrix4(Zn),this}rotateX(t){return Zn.makeRotationX(t),this.applyMatrix4(Zn),this}rotateY(t){return Zn.makeRotationY(t),this.applyMatrix4(Zn),this}rotateZ(t){return Zn.makeRotationZ(t),this.applyMatrix4(Zn),this}translate(t,e,i){return Zn.makeTranslation(t,e,i),this.applyMatrix4(Zn),this}scale(t,e,i){return Zn.makeScale(t,e,i),this.applyMatrix4(Zn),this}lookAt(t){return ap.lookAt(t),ap.updateMatrix(),this.applyMatrix4(ap.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qo).negate(),this.translate(Qo.x,Qo.y,Qo.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let n=0,r=t.length;n<r;n++){let o=t[n];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new me(i,3))}else{let i=Math.min(t.length,e.count);for(let n=0;n<i;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&Zt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ts);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){$t("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,n=e.length;i<n;i++){let r=e[i];On.setFromBufferAttribute(r),this.morphTargetsRelative?(Pi.addVectors(this.boundingBox.min,On.min),this.boundingBox.expandByPoint(Pi),Pi.addVectors(this.boundingBox.max,On.max),this.boundingBox.expandByPoint(Pi)):(this.boundingBox.expandByPoint(On.min),this.boundingBox.expandByPoint(On.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&$t('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Es);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){$t("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){let i=this.boundingSphere.center;if(On.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Sl.setFromBufferAttribute(a),this.morphTargetsRelative?(Pi.addVectors(On.min,Sl.min),On.expandByPoint(Pi),Pi.addVectors(On.max,Sl.max),On.expandByPoint(Pi)):(On.expandByPoint(Sl.min),On.expandByPoint(Sl.max))}On.getCenter(i);let n=0;for(let r=0,o=t.count;r<o;r++)Pi.fromBufferAttribute(t,r),n=Math.max(n,i.distanceToSquared(Pi));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Pi.fromBufferAttribute(a,c),l&&(Qo.fromBufferAttribute(t,c),Pi.add(Qo)),n=Math.max(n,i.distanceToSquared(Pi))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&$t('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){$t("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,n=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new ye(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));let a=[],l=[];for(let v=0;v<i.count;v++)a[v]=new N,l[v]=new N;let c=new N,h=new N,f=new N,u=new Tt,d=new Tt,p=new Tt,m=new N,g=new N;function _(v,w,C){c.fromBufferAttribute(i,v),h.fromBufferAttribute(i,w),f.fromBufferAttribute(i,C),u.fromBufferAttribute(r,v),d.fromBufferAttribute(r,w),p.fromBufferAttribute(r,C),h.sub(c),f.sub(c),d.sub(u),p.sub(u);let D=1/(d.x*p.y-p.x*d.y);isFinite(D)&&(m.copy(h).multiplyScalar(p.y).addScaledVector(f,-d.y).multiplyScalar(D),g.copy(f).multiplyScalar(d.x).addScaledVector(h,-p.x).multiplyScalar(D),a[v].add(m),a[w].add(m),a[C].add(m),l[v].add(g),l[w].add(g),l[C].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let v=0,w=y.length;v<w;++v){let C=y[v],D=C.start,I=C.count;for(let O=D,L=D+I;O<L;O+=3)_(t.getX(O+0),t.getX(O+1),t.getX(O+2))}let E=new N,x=new N,b=new N,M=new N;function T(v){b.fromBufferAttribute(n,v),M.copy(b);let w=a[v];E.copy(w),E.sub(b.multiplyScalar(b.dot(w))).normalize(),x.crossVectors(M,w);let D=x.dot(l[v])<0?-1:1;o.setXYZW(v,E.x,E.y,E.z,D)}for(let v=0,w=y.length;v<w;++v){let C=y[v],D=C.start,I=C.count;for(let O=D,L=D+I;O<L;O+=3)T(t.getX(O+0)),T(t.getX(O+1)),T(t.getX(O+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new ye(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,d=i.count;u<d;u++)i.setXYZ(u,0,0,0);let n=new N,r=new N,o=new N,a=new N,l=new N,c=new N,h=new N,f=new N;if(t)for(let u=0,d=t.count;u<d;u+=3){let p=t.getX(u+0),m=t.getX(u+1),g=t.getX(u+2);n.fromBufferAttribute(e,p),r.fromBufferAttribute(e,m),o.fromBufferAttribute(e,g),h.subVectors(o,r),f.subVectors(n,r),h.cross(f),a.fromBufferAttribute(i,p),l.fromBufferAttribute(i,m),c.fromBufferAttribute(i,g),a.add(h),l.add(h),c.add(h),i.setXYZ(p,a.x,a.y,a.z),i.setXYZ(m,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,d=e.count;u<d;u+=3)n.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),f.subVectors(n,r),h.cross(f),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Pi.fromBufferAttribute(t,e),Pi.normalize(),t.setXYZ(e,Pi.x,Pi.y,Pi.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,f=a.normalized,u=new c.constructor(l.length*h),d=0,p=0;for(let m=0,g=l.length;m<g;m++){a.isInterleavedBufferAttribute?d=l[m]*a.data.stride+a.offset:d=l[m]*h;for(let _=0;_<h;_++)u[p++]=c[d++]}return new ye(u,h,f)}if(this.index===null)return Zt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,i=this.index.array,n=this.attributes;for(let a in n){let l=n[a],c=t(l,i);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,f=c.length;h<f;h++){let u=c[h],d=t(u,i);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let n={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let f=0,u=c.length;f<u;f++){let d=c[f];h.push(d.toJSON(t.data))}h.length>0&&(n[l]=h,r=!0)}r&&(t.data.morphAttributes=n,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let n=t.attributes;for(let c in n){let h=n[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],f=r[c];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var lp=new N,KS=new N,JS=new ne,pn=class{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,n){return this.normal.set(t,e,i),this.constant=n,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let n=lp.subVectors(i,e).cross(KS.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(n,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){let n=t.delta(lp),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(n,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||JS.getNormalMatrix(t),n=this.coplanarPoint(lp).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},$S=0,as=class extends os{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$S++}),this.uuid=Ca(),this.name="",this.type="Material",this.blending=Ta,this.side=Ar,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Cp,this.blendDst=Rp,this.blendEquation=oo,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Wt(0,0,0),this.blendAlpha=0,this.depthFunc=aa,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=I_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fh,this.stencilZFail=Fh,this.stencilZPass=Fh,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){Zt(`Material: parameter '${e}' has value of undefined.`);continue}let n=this[e];if(n===void 0){Zt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector2&&i&&i.isVector2||n&&n.isEuler&&i&&i.isEuler||n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=n(t.textures),o=n(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Wt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new pn().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Tt().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Tt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let n=e.length;i=new Array(n);for(let r=0;r!==n;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Xs=new N,cp=new N,mh=new N,gh=new N,qs=class{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Xs)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Xs.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Xs.copy(this.origin).addScaledVector(this.direction,e),Xs.distanceToSquared(t))}distanceSqToSegment(t,e,i,n){cp.copy(t).add(e).multiplyScalar(.5),mh.copy(e).sub(t).normalize(),gh.copy(this.origin).sub(cp);let r=t.distanceTo(e)*.5,o=-this.direction.dot(mh),a=gh.dot(this.direction),l=-gh.dot(mh),c=gh.lengthSq(),h=Math.abs(1-o*o),f,u,d,p;if(h>0)if(f=o*l-a,u=o*a-l,p=r*h,f>=0)if(u>=-p)if(u<=p){let m=1/h;f*=m,u*=m,d=f*(f+o*u+2*a)+u*(o*f+u+2*l)+c}else u=r,f=Math.max(0,-(o*u+a)),d=-f*f+u*(u+2*l)+c;else u=-r,f=Math.max(0,-(o*u+a)),d=-f*f+u*(u+2*l)+c;else u<=-p?(f=Math.max(0,-(-o*r+a)),u=f>0?-r:Math.min(Math.max(-r,-l),r),d=-f*f+u*(u+2*l)+c):u<=p?(f=0,u=Math.min(Math.max(-r,-l),r),d=u*(u+2*l)+c):(f=Math.max(0,-(o*r+a)),u=f>0?r:Math.min(Math.max(-r,-l),r),d=-f*f+u*(u+2*l)+c);else u=o>0?-r:r,f=Math.max(0,-(o*u+a)),d=-f*f+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),n&&n.copy(cp).addScaledVector(mh,u),d}intersectSphere(t,e){if(t.radius<0)return null;Xs.subVectors(t.center,this.origin);let i=Xs.dot(this.direction),n=Xs.dot(Xs)-i*i,r=t.radius*t.radius;if(n>r)return null;let o=Math.sqrt(r-n),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,n,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,n=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,n=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),i>o||r>n||((r>i||isNaN(i))&&(i=r),(o<n||isNaN(n))&&(n=o),f>=0?(a=(t.min.z-u.z)*f,l=(t.max.z-u.z)*f):(a=(t.max.z-u.z)*f,l=(t.min.z-u.z)*f),i>l||a>n)||((a>i||i!==i)&&(i=a),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,e)}intersectsBox(t){return this.intersectBox(t,Xs)!==null}intersectTriangle(t,e,i,n,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,f=t.x-o.x,u=t.y-o.y,d=t.z-o.z,p=e.x-o.x,m=e.y-o.y,g=e.z-o.z,_=i.x-o.x,y=i.y-o.y,E=i.z-o.z,x=Math.abs(l),b=Math.abs(c),M=Math.abs(h),T,v,w,C,D,I,O,L,B,V,z,$;if(x>=b&&x>=M?(w=l,I=f,B=p,$=_,l>=0?(T=c,v=h,C=u,D=d,O=m,L=g,V=y,z=E):(T=h,v=c,C=d,D=u,O=g,L=m,V=E,z=y)):b>=M?(w=c,I=u,B=m,$=y,c>=0?(T=h,v=l,C=d,D=f,O=g,L=p,V=E,z=_):(T=l,v=h,C=f,D=d,O=p,L=g,V=_,z=E)):(w=h,I=d,B=g,$=E,h>=0?(T=l,v=c,C=f,D=u,O=p,L=m,V=_,z=y):(T=c,v=l,C=u,D=f,O=m,L=p,V=y,z=_)),w===0)return null;let Z=T/w,R=v/w,tt=1/w,it=C-Z*I,at=D-R*I,j=O-Z*B,ht=L-R*B,bt=V-Z*$,G=z-R*$,J=bt*ht-G*j,ot=it*G-at*bt,Dt=j*at-ht*it;if(n){if(J<0||ot<0||Dt<0)return null}else if((J<0||ot<0||Dt<0)&&(J>0||ot>0||Dt>0))return null;let _t=J+ot+Dt;if(_t===0)return null;let zt=tt*(J*I+ot*B+Dt*$);return(_t>0?zt<0:zt>0)?null:this.at(zt/_t,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},no=class extends as{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.combine=_u,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Hg=new be,to=new qs,_h=new Es,Vg=new N,vh=new N,xh=new N,yh=new N,hp=new N,Sh=new N,Gg=new N,Mh=new N,ge=class extends mi{constructor(t=new Re,e=new no){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=n.length;r<o;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(n,t);let a=this.morphTargetInfluences;if(r&&a){Sh.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],f=r[l];h!==0&&(hp.fromBufferAttribute(f,t),o?Sh.addScaledVector(hp,h):Sh.addScaledVector(hp.sub(e),h))}e.add(Sh)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),_h.copy(i.boundingSphere),_h.applyMatrix4(r),to.copy(t.ray).recast(t.near),!(_h.containsPoint(to.origin)===!1&&(to.intersectSphere(_h,Vg)===null||to.origin.distanceToSquared(Vg)>(t.far-t.near)**2))&&(Hg.copy(r).invert(),to.copy(t.ray).applyMatrix4(Hg),!(i.boundingBox!==null&&to.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,to)))}_computeIntersections(t,e,i){let n,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,m=u.length;p<m;p++){let g=u[p],_=o[g.materialIndex],y=Math.max(g.start,d.start),E=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let x=y,b=E;x<b;x+=3){let M=a.getX(x),T=a.getX(x+1),v=a.getX(x+2);n=bh(this,_,t,i,c,h,f,M,T,v),n&&(n.faceIndex=Math.floor(x/3),n.face.materialIndex=g.materialIndex,e.push(n))}}else{let p=Math.max(0,d.start),m=Math.min(a.count,d.start+d.count);for(let g=p,_=m;g<_;g+=3){let y=a.getX(g),E=a.getX(g+1),x=a.getX(g+2);n=bh(this,o,t,i,c,h,f,y,E,x),n&&(n.faceIndex=Math.floor(g/3),e.push(n))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,m=u.length;p<m;p++){let g=u[p],_=o[g.materialIndex],y=Math.max(g.start,d.start),E=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let x=y,b=E;x<b;x+=3){let M=x,T=x+1,v=x+2;n=bh(this,_,t,i,c,h,f,M,T,v),n&&(n.faceIndex=Math.floor(x/3),n.face.materialIndex=g.materialIndex,e.push(n))}}else{let p=Math.max(0,d.start),m=Math.min(l.count,d.start+d.count);for(let g=p,_=m;g<_;g+=3){let y=g,E=g+1,x=g+2;n=bh(this,o,t,i,c,h,f,y,E,x),n&&(n.faceIndex=Math.floor(g/3),e.push(n))}}}};function jS(s,t,e,i,n,r,o,a){let l;if(t.side===li?l=i.intersectTriangle(o,r,n,!0,a):l=i.intersectTriangle(n,r,o,t.side===Ar,a),l===null)return null;Mh.copy(a),Mh.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(Mh);return c<e.near||c>e.far?null:{distance:c,point:Mh.clone(),object:s}}function bh(s,t,e,i,n,r,o,a,l,c){s.getVertexPosition(a,vh),s.getVertexPosition(l,xh),s.getVertexPosition(c,yh);let h=jS(s,t,e,i,vh,xh,yh,Gg);if(h){let f=new N;ns.getBarycoord(Gg,vh,xh,yh,f),n&&(h.uv=ns.getInterpolatedAttribute(n,a,l,c,f,new Tt)),r&&(h.uv1=ns.getInterpolatedAttribute(r,a,l,c,f,new Tt)),o&&(h.normal=ns.getInterpolatedAttribute(o,a,l,c,f,new N),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:l,c,normal:new N,materialIndex:0};ns.getNormal(vh,xh,yh,u.normal),h.face=u,h.barycoord=f}return h}var Nl=class extends mn{constructor(t=null,e=1,i=1,n,r,o,a,l,c=Di,h=Di,f,u){super(null,o,a,l,c,h,n,r,f,u),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var pa=class extends ye{constructor(t,e,i,n=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},ta=new be,Wg=new be,wh=[],Xg=new Ts,QS=new be,Ml=new ge,bl=new Es,so=class extends ge{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new pa(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,QS)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Ts),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,ta),Xg.copy(t.boundingBox).applyMatrix4(ta),this.boundingBox.union(Xg)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Es),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,ta),bl.copy(t.boundingSphere).applyMatrix4(ta),this.boundingSphere.union(bl)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let i=e.morphTargetInfluences,n=this.morphTexture.source.data.data,r=i.length+1,o=t*r+1;for(let a=0;a<i.length;a++)i[a]=n[o+a]}raycast(t,e){let i=this.matrixWorld,n=this.count;if(Ml.geometry=this.geometry,Ml.material=this.material,Ml.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),bl.copy(this.boundingSphere),bl.applyMatrix4(i),t.ray.intersectsSphere(bl)!==!1))for(let r=0;r<n;r++){this.getMatrixAt(r,ta),Wg.multiplyMatrices(i,ta),Ml.matrixWorld=Wg,Ml.raycast(t,wh);for(let o=0,a=wh.length;o<a;o++){let l=wh[o];l.instanceId=r,l.object=this,e.push(l)}wh.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new pa(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let i=e.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new Nl(new Float32Array(n*this.count),n,this.count,wu,Jn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<i.length;c++)o+=i[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=n*t;return r[l]=a,r.set(i,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},eo=new Es,tM=new Tt(.5,.5),Th=new N,ma=class{constructor(t=new pn,e=new pn,i=new pn,n=new pn,r=new pn,o=new pn){this.planes=[t,e,i,n,r,o]}set(t,e,i,n,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(n),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=ss,i=!1){let n=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],f=r[5],u=r[6],d=r[7],p=r[8],m=r[9],g=r[10],_=r[11],y=r[12],E=r[13],x=r[14],b=r[15];if(n[0].setComponents(c-o,d-h,_-p,b-y).normalize(),n[1].setComponents(c+o,d+h,_+p,b+y).normalize(),n[2].setComponents(c+a,d+f,_+m,b+E).normalize(),n[3].setComponents(c-a,d-f,_-m,b-E).normalize(),i)n[4].setComponents(l,u,g,x).normalize(),n[5].setComponents(c-l,d-u,_-g,b-x).normalize();else if(n[4].setComponents(c-l,d-u,_-g,b-x).normalize(),e===ss)n[5].setComponents(c+l,d+u,_+g,b+x).normalize();else if(e===la)n[5].setComponents(l,u,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),eo.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),eo.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(eo)}intersectsSprite(t){eo.center.set(0,0,0);let e=tM.distanceTo(t.center);return eo.radius=.7071067811865476+e,eo.applyMatrix4(t.matrixWorld),this.intersectsSphere(eo)}intersectsSphere(t){let e=this.planes,i=t.center,n=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let n=e[i];if(Th.x=n.normal.x>0?t.max.x:t.min.x,Th.y=n.normal.y>0?t.max.y:t.min.y,Th.z=n.normal.z>0?t.max.z:t.min.z,n.distanceToPoint(Th)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Jh=class extends as{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Wt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},$h=new N,jh=new N,Yg=new be,wl=new qs,Eh=new Es,up=new N,qg=new N,Qh=class extends mi{constructor(t=new Re,e=new Jh){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let n=1,r=e.count;n<r;n++)$h.fromBufferAttribute(e,n-1),jh.fromBufferAttribute(e,n),i[n]=i[n-1],i[n]+=$h.distanceTo(jh);t.setAttribute("lineDistance",new me(i,1))}else Zt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,n=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Eh.copy(i.boundingSphere),Eh.applyMatrix4(n),Eh.radius+=r,t.ray.intersectsSphere(Eh)===!1)return;Yg.copy(n).invert(),wl.copy(t.ray).applyMatrix4(Yg);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){let d=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let m=d,g=p-1;m<g;m+=c){let _=h.getX(m),y=h.getX(m+1),E=Ah(this,t,wl,l,_,y,m);E&&e.push(E)}if(this.isLineLoop){let m=h.getX(p-1),g=h.getX(d),_=Ah(this,t,wl,l,m,g,p-1);_&&e.push(_)}}else{let d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let m=d,g=p-1;m<g;m+=c){let _=Ah(this,t,wl,l,m,m+1,m);_&&e.push(_)}if(this.isLineLoop){let m=Ah(this,t,wl,l,p-1,d,p-1);m&&e.push(m)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=n.length;r<o;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Ah(s,t,e,i,n,r,o){let a=s.geometry.attributes.position;if($h.fromBufferAttribute(a,n),jh.fromBufferAttribute(a,r),e.distanceSqToSegment($h,jh,up,qg)>i)return;up.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(up);if(!(c<t.near||c>t.far))return{distance:c,point:qg.clone().applyMatrix4(s.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:s}}var Zg=new N,Kg=new N,Ul=class extends Qh{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let n=0,r=e.count;n<r;n+=2)Zg.fromBufferAttribute(e,n),Kg.fromBufferAttribute(e,n+1),i[n]=n===0?0:i[n-1],i[n+1]=i[n]+Zg.distanceTo(Kg);t.setAttribute("lineDistance",new me(i,1))}else Zt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var tu=class extends as{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Wt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Jg=new be,xp=new qs,Ch=new Es,Rh=new N,Zs=class extends mi{constructor(t=new Re,e=new tu){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,n=this.matrixWorld,r=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ch.copy(i.boundingSphere),Ch.applyMatrix4(n),Ch.radius+=r,t.ray.intersectsSphere(Ch)===!1)return;Jg.copy(n).invert(),xp.copy(t.ray).applyMatrix4(Jg);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,f=i.attributes.position;if(c!==null){let u=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let p=u,m=d;p<m;p++){let g=c.getX(p);Rh.fromBufferAttribute(f,g),$g(Rh,g,l,n,t,e,this)}}else{let u=Math.max(0,o.start),d=Math.min(f.count,o.start+o.count);for(let p=u,m=d;p<m;p++)Rh.fromBufferAttribute(f,p),$g(Rh,p,l,n,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=n.length;r<o;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function $g(s,t,e,i,n,r,o){let a=xp.distanceSqToPoint(s);if(a<e){let l=new N;xp.closestPointToPoint(s,l),l.applyMatrix4(i);let c=n.ray.origin.distanceTo(l);if(c<n.near||c>n.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Fl=class extends mn{constructor(t=[],e=Cr,i,n,r,o,a,l,c,h){super(t,e,i,n,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},ga=class extends mn{constructor(t,e,i,n,r,o,a,l,c){super(t,e,i,n,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var yr=class extends mn{constructor(t,e,i=us,n,r,o,a=Di,l=Di,c,h=ws,f=1){if(h!==ws&&h!==Rr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:f};super(u,n,r,o,a,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ua(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},eu=class extends yr{constructor(t,e=us,i=Cr,n,r,o=Di,a=Di,l,c=ws){let h={width:t,height:t,depth:1},f=[h,h,h,h,h,h];super(t,t,e,i,n,r,o,a,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Ol=class extends mn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},_e=class s extends Re{constructor(t=1,e=1,i=1,n=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:n,heightSegments:r,depthSegments:o};let a=this;n=Math.floor(n),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],f=[],u=0,d=0;p("z","y","x",-1,-1,i,e,t,o,r,0),p("z","y","x",1,-1,i,e,-t,o,r,1),p("x","z","y",1,1,t,i,e,n,o,2),p("x","z","y",1,-1,t,i,-e,n,o,3),p("x","y","z",1,-1,t,e,i,n,r,4),p("x","y","z",-1,-1,t,e,-i,n,r,5),this.setIndex(l),this.setAttribute("position",new me(c,3)),this.setAttribute("normal",new me(h,3)),this.setAttribute("uv",new me(f,2));function p(m,g,_,y,E,x,b,M,T,v,w){let C=x/T,D=b/v,I=x/2,O=b/2,L=M/2,B=T+1,V=v+1,z=0,$=0,Z=new N;for(let R=0;R<V;R++){let tt=R*D-O;for(let it=0;it<B;it++){let at=it*C-I;Z[m]=at*y,Z[g]=tt*E,Z[_]=L,c.push(Z.x,Z.y,Z.z),Z[m]=0,Z[g]=0,Z[_]=M>0?1:-1,h.push(Z.x,Z.y,Z.z),f.push(it/T),f.push(1-R/v),z+=1}}for(let R=0;R<v;R++)for(let tt=0;tt<T;tt++){let it=u+tt+B*R,at=u+tt+B*(R+1),j=u+(tt+1)+B*(R+1),ht=u+(tt+1)+B*R;l.push(it,at,ht),l.push(at,j,ht),$+=6}a.addGroup(d,$,w),d+=$,u+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Bl=class s extends Re{constructor(t=1,e=32,i=0,n=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:n},e=Math.max(3,e);let r=[],o=[],a=[],l=[],c=new N,h=new Tt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let f=0,u=3;f<=e;f++,u+=3){let d=i+f/e*n;c.x=t*Math.cos(d),c.y=t*Math.sin(d),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[u]/t+1)/2,h.y=(o[u+1]/t+1)/2,l.push(h.x,h.y)}for(let f=1;f<=e;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new me(o,3)),this.setAttribute("normal",new me(a,3)),this.setAttribute("uv",new me(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Ji=class s extends Re{constructor(t=1,e=1,i=1,n=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:n,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;n=Math.floor(n),r=Math.floor(r);let h=[],f=[],u=[],d=[],p=0,m=[],g=i/2,_=0;y(),o===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new me(f,3)),this.setAttribute("normal",new me(u,3)),this.setAttribute("uv",new me(d,2));function y(){let x=new N,b=new N,M=0,T=(e-t)/i;for(let v=0;v<=r;v++){let w=[],C=v/r,D=C*(e-t)+t;for(let I=0;I<=n;I++){let O=I/n,L=O*l+a,B=Math.sin(L),V=Math.cos(L);b.x=D*B,b.y=-C*i+g,b.z=D*V,f.push(b.x,b.y,b.z),x.set(B,T,V).normalize(),u.push(x.x,x.y,x.z),d.push(O,1-C),w.push(p++)}m.push(w)}for(let v=0;v<n;v++)for(let w=0;w<r;w++){let C=m[w][v],D=m[w+1][v],I=m[w+1][v+1],O=m[w][v+1];(t>0||w!==0)&&(h.push(C,D,O),M+=3),(e>0||w!==r-1)&&(h.push(D,I,O),M+=3)}c.addGroup(_,M,0),_+=M}function E(x){let b=p,M=new Tt,T=new N,v=0,w=x===!0?t:e,C=x===!0?1:-1;for(let I=1;I<=n;I++)f.push(0,g*C,0),u.push(0,C,0),d.push(.5,.5),p++;let D=p;for(let I=0;I<=n;I++){let L=I/n*l+a,B=Math.cos(L),V=Math.sin(L);T.x=w*V,T.y=g*C,T.z=w*B,f.push(T.x,T.y,T.z),u.push(0,C,0),M.x=B*.5+.5,M.y=V*.5*C+.5,d.push(M.x,M.y),p++}for(let I=0;I<n;I++){let O=b+I,L=D+I;x===!0?h.push(L,L+1,O):h.push(L+1,L,O),v+=3}c.addGroup(_,v,x===!0?1:2),_+=v}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},kl=class s extends Ji{constructor(t=1,e=1,i=32,n=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,i,n,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:n,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new s(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},iu=class s extends Re{constructor(t=[],e=[],i=1,n=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:n};let r=[],o=[];a(n),c(i),h(),this.setAttribute("position",new me(r,3)),this.setAttribute("normal",new me(r.slice(),3)),this.setAttribute("uv",new me(o,2)),n===0?this.computeVertexNormals():this.normalizeNormals();function a(y){let E=new N,x=new N,b=new N;for(let M=0;M<e.length;M+=3)d(e[M+0],E),d(e[M+1],x),d(e[M+2],b),l(E,x,b,y)}function l(y,E,x,b){let M=b+1,T=[];for(let v=0;v<=M;v++){T[v]=[];let w=y.clone().lerp(x,v/M),C=E.clone().lerp(x,v/M),D=M-v;for(let I=0;I<=D;I++)I===0&&v===M?T[v][I]=w:T[v][I]=w.clone().lerp(C,I/D)}for(let v=0;v<M;v++)for(let w=0;w<2*(M-v)-1;w++){let C=Math.floor(w/2);w%2===0?(u(T[v][C+1]),u(T[v+1][C]),u(T[v][C])):(u(T[v][C+1]),u(T[v+1][C+1]),u(T[v+1][C]))}}function c(y){let E=new N;for(let x=0;x<r.length;x+=3)E.x=r[x+0],E.y=r[x+1],E.z=r[x+2],E.normalize().multiplyScalar(y),r[x+0]=E.x,r[x+1]=E.y,r[x+2]=E.z}function h(){let y=new N;for(let E=0;E<r.length;E+=3){y.x=r[E+0],y.y=r[E+1],y.z=r[E+2];let x=g(y)/2/Math.PI+.5,b=_(y)/Math.PI+.5;o.push(x,1-b)}p(),f()}function f(){for(let y=0;y<o.length;y+=6){let E=o[y+0],x=o[y+2],b=o[y+4],M=Math.max(E,x,b),T=Math.min(E,x,b);M>.9&&T<.1&&(E<.2&&(o[y+0]+=1),x<.2&&(o[y+2]+=1),b<.2&&(o[y+4]+=1))}}function u(y){r.push(y.x,y.y,y.z)}function d(y,E){let x=y*3;E.x=t[x+0],E.y=t[x+1],E.z=t[x+2]}function p(){let y=new N,E=new N,x=new N,b=new N,M=new Tt,T=new Tt,v=new Tt;for(let w=0,C=0;w<r.length;w+=9,C+=6){y.set(r[w+0],r[w+1],r[w+2]),E.set(r[w+3],r[w+4],r[w+5]),x.set(r[w+6],r[w+7],r[w+8]),M.set(o[C+0],o[C+1]),T.set(o[C+2],o[C+3]),v.set(o[C+4],o[C+5]),b.copy(y).add(E).add(x).divideScalar(3);let D=g(b);m(M,C+0,y,D),m(T,C+2,E,D),m(v,C+4,x,D)}}function m(y,E,x,b){b<0&&y.x===1&&(o[E]=y.x-1),x.x===0&&x.z===0&&(o[E]=b/2/Math.PI+.5)}function g(y){return Math.atan2(y.z,-y.x)}function _(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.vertices,t.indices,t.radius,t.detail)}};var Ph=new N,Ih=new N,fp=new N,Lh=new ns,zl=class extends Re{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let n=Math.pow(10,4),r=Math.cos(ra*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],f=new Array(3),u={},d=[];for(let p=0;p<l;p+=3){o?(c[0]=o.getX(p),c[1]=o.getX(p+1),c[2]=o.getX(p+2)):(c[0]=p,c[1]=p+1,c[2]=p+2);let{a:m,b:g,c:_}=Lh;if(m.fromBufferAttribute(a,c[0]),g.fromBufferAttribute(a,c[1]),_.fromBufferAttribute(a,c[2]),Lh.getNormal(fp),f[0]=`${Math.round(m.x*n)},${Math.round(m.y*n)},${Math.round(m.z*n)}`,f[1]=`${Math.round(g.x*n)},${Math.round(g.y*n)},${Math.round(g.z*n)}`,f[2]=`${Math.round(_.x*n)},${Math.round(_.y*n)},${Math.round(_.z*n)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let y=0;y<3;y++){let E=(y+1)%3,x=f[y],b=f[E],M=Lh[h[y]],T=Lh[h[E]],v=`${x}_${b}`,w=`${b}_${x}`;w in u&&u[w]?(fp.dot(u[w].normal)<=r&&(d.push(M.x,M.y,M.z),d.push(T.x,T.y,T.z)),u[w]=null):v in u||(u[v]={index0:c[y],index1:c[E],normal:fp.clone()})}}for(let p in u)if(u[p]){let{index0:m,index1:g}=u[p];Ph.fromBufferAttribute(a,m),Ih.fromBufferAttribute(a,g),d.push(Ph.x,Ph.y,Ph.z),d.push(Ih.x,Ih.y,Ih.z)}this.setAttribute("position",new me(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}};var _a=class s extends Re{constructor(t=[new Tt(0,-.5),new Tt(.5,0),new Tt(0,.5)],e=12,i=0,n=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:i,phiLength:n},e=Math.floor(e),n=ce(n,0,Math.PI*2);let r=[],o=[],a=[],l=[],c=[],h=1/e,f=new N,u=new Tt,d=new N,p=new N,m=new N,g=0,_=0;for(let y=0;y<=t.length-1;y++)switch(y){case 0:g=t[y+1].x-t[y].x,_=t[y+1].y-t[y].y,d.x=_*1,d.y=-g,d.z=_*0,m.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case t.length-1:l.push(m.x,m.y,m.z);break;default:g=t[y+1].x-t[y].x,_=t[y+1].y-t[y].y,d.x=_*1,d.y=-g,d.z=_*0,p.copy(d),d.x+=m.x,d.y+=m.y,d.z+=m.z,d.normalize(),l.push(d.x,d.y,d.z),m.copy(p)}for(let y=0;y<=e;y++){let E=i+y*h*n,x=Math.sin(E),b=Math.cos(E);for(let M=0;M<=t.length-1;M++){f.x=t[M].x*x,f.y=t[M].y,f.z=t[M].x*b,o.push(f.x,f.y,f.z),u.x=y/e,u.y=M/(t.length-1),a.push(u.x,u.y);let T=l[3*M+0]*x,v=l[3*M+1],w=l[3*M+0]*b;c.push(T,v,w)}}for(let y=0;y<e;y++)for(let E=0;E<t.length-1;E++){let x=E+y*t.length,b=x,M=x+t.length,T=x+t.length+1,v=x+1;r.push(b,M,v),r.push(T,v,M)}this.setIndex(r),this.setAttribute("position",new me(o,3)),this.setAttribute("uv",new me(a,2)),this.setAttribute("normal",new me(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.points,t.segments,t.phiStart,t.phiLength)}};var ls=class s extends Re{constructor(t=1,e=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:n};let r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(n),c=a+1,h=l+1,f=t/a,u=e/l,d=[],p=[],m=[],g=[];for(let _=0;_<h;_++){let y=_*u-o;for(let E=0;E<c;E++){let x=E*f-r;p.push(x,-y,0),m.push(0,0,1),g.push(E/a),g.push(1-_/l)}}for(let _=0;_<l;_++)for(let y=0;y<a;y++){let E=y+c*_,x=y+c*(_+1),b=y+1+c*(_+1),M=y+1+c*_;d.push(E,x,M),d.push(x,b,M)}this.setIndex(d),this.setAttribute("position",new me(p,3)),this.setAttribute("normal",new me(m,3)),this.setAttribute("uv",new me(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}};var gn=class s extends Re{constructor(t=1,e=32,i=16,n=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:n,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(o+a,Math.PI),c=0,h=[],f=new N,u=new N,d=[],p=[],m=[],g=[];for(let _=0;_<=i;_++){let y=[],E=_/i,x=o+E*a,b=t*Math.cos(x),M=Math.sqrt(t*t-b*b),T=0;_===0&&o===0?T=.5/e:_===i&&l===Math.PI&&(T=-.5/e);for(let v=0;v<=e;v++){let w=v/e,C=n+w*r;f.x=-M*Math.cos(C),f.y=b,f.z=M*Math.sin(C),p.push(f.x,f.y,f.z),u.copy(f).normalize(),m.push(u.x,u.y,u.z),g.push(w+T,1-E),y.push(c++)}h.push(y)}for(let _=0;_<i;_++)for(let y=0;y<e;y++){let E=h[_][y+1],x=h[_][y],b=h[_+1][y],M=h[_+1][y+1];(_!==0||o>0)&&d.push(E,x,M),(_!==i-1||l<Math.PI)&&d.push(x,b,M)}this.setIndex(d),this.setAttribute("position",new me(p,3)),this.setAttribute("normal",new me(m,3)),this.setAttribute("uv",new me(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},Hl=class s extends iu{constructor(t=1,e=0){let i=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],n=[2,1,0,0,3,2,1,3,0,2,3,1];super(i,n,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}},As=class s extends Re{constructor(t=1,e=.4,i=12,n=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:n,arc:r,thetaStart:o,thetaLength:a},i=Math.floor(i),n=Math.floor(n);let l=[],c=[],h=[],f=[],u=new N,d=new N,p=new N;for(let m=0;m<=i;m++){let g=o+m/i*a;for(let _=0;_<=n;_++){let y=_/n*r;d.x=(t+e*Math.cos(g))*Math.cos(y),d.y=(t+e*Math.cos(g))*Math.sin(y),d.z=e*Math.sin(g),c.push(d.x,d.y,d.z),u.x=t*Math.cos(y),u.y=t*Math.sin(y),p.subVectors(d,u).normalize(),h.push(p.x,p.y,p.z),f.push(_/n),f.push(m/i)}}for(let m=1;m<=i;m++)for(let g=1;g<=n;g++){let _=(n+1)*m+g-1,y=(n+1)*(m-1)+g-1,E=(n+1)*(m-1)+g,x=(n+1)*m+g;l.push(_,y,x),l.push(y,E,x)}this.setIndex(l),this.setAttribute("position",new me(c,3)),this.setAttribute("normal",new me(h,3)),this.setAttribute("uv",new me(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function co(s){let t={};for(let e in s){t[e]={};for(let i in s[e]){let n=s[e][i];if(jg(n))n.isRenderTargetTexture?(Zt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=n.clone();else if(Array.isArray(n))if(jg(n[0])){let r=[];for(let o=0,a=n.length;o<a;o++)r[o]=n[o].clone();t[e][i]=r}else t[e][i]=n.slice();else t[e][i]=n}}return t}function $i(s){let t={};for(let e=0;e<s.length;e++){let i=co(s[e]);for(let n in i)t[n]=i[n]}return t}function jg(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function eM(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Hp(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:de.workingColorSpace}var fs={clone:co,merge:$i},iM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,nM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Se=class extends as{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=iM,this.fragmentShader=nM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=co(t.uniforms),this.uniformsGroups=eM(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let n in this.uniforms){let o=this.uniforms[n].value;o&&o.isTexture?e.uniforms[n]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[n]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[n]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[n]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[n]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[n]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[n]={type:"m4",value:o.toArray()}:e.uniforms[n]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let i in t.uniforms){let n=t.uniforms[i];switch(this.uniforms[i]={},n.type){case"t":this.uniforms[i].value=e[n.value]||null;break;case"c":this.uniforms[i].value=new Wt().setHex(n.value);break;case"v2":this.uniforms[i].value=new Tt().fromArray(n.value);break;case"v3":this.uniforms[i].value=new N().fromArray(n.value);break;case"v4":this.uniforms[i].value=new qe().fromArray(n.value);break;case"m3":this.uniforms[i].value=new ne().fromArray(n.value);break;case"m4":this.uniforms[i].value=new be().fromArray(n.value);break;default:this.uniforms[i].value=n.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},va=class extends Se{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},cs=class extends as{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Wt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=uc,this.normalScale=new Tt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Vl=class extends as{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=uc,this.normalScale=new Tt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.combine=_u,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},xa=class extends as{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=R_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},nu=class extends as{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function ea(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function dp(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}var Sr=class{constructor(t,e,i,n){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=n!==void 0?n:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,n=e[i],r=e[i-1];i:{t:{let o;e:{n:if(!(t<n)){for(let a=i+2;;){if(n===void 0){if(t<r)break n;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=n,n=e[++i],t<n)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(i=2,r=a);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(n=r,r=e[--i-1],t>=r)break t}o=i,i=0;break e}break i}for(;i<o;){let a=i+o>>>1;t<e[a]?o=a:i=a+1}if(n=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,n)}return this.interpolate_(i,r,t,n)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,n=this.valueSize,r=t*n;for(let o=0;o!==n;++o)e[o]=i[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},su=class extends Sr{constructor(t,e,i,n){super(t,e,i,n),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:gp,endingEnd:gp}}intervalChanged_(t,e,i){let n=this.parameterPositions,r=t-2,o=t+1,a=n[r],l=n[o];if(a===void 0)switch(this.getSettings_().endingStart){case _p:r=t,a=2*e-i;break;case vp:r=n.length-2,a=e+n[r]-n[r+1];break;default:r=t,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case _p:o=t,l=2*i-e;break;case vp:o=1,l=i+n[1]-n[0];break;default:o=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,i,n){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,f=this._offsetNext,u=this._weightPrev,d=this._weightNext,p=(i-e)/(n-e),m=p*p,g=m*p,_=-u*g+2*u*m-u*p,y=(1+u)*g+(-1.5-2*u)*m+(-.5+u)*p+1,E=(-1-d)*g+(1.5+d)*m+.5*p,x=d*g-d*m;for(let b=0;b!==a;++b)r[b]=_*o[h+b]+y*o[c+b]+E*o[l+b]+x*o[f+b];return r}},ru=class extends Sr{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t,e,i,n){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(i-e)/(n-e),f=1-h;for(let u=0;u!==a;++u)r[u]=o[c+u]*f+o[l+u]*h;return r}},ou=class extends Sr{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t){return this.copySampleValue_(t-1)}},au=class extends Sr{interpolate_(t,e,i,n){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this.inTangents,f=this.outTangents;if(!h||!f){let p=(i-e)/(n-e),m=1-p;for(let g=0;g!==a;++g)r[g]=o[c+g]*m+o[l+g]*p;return r}let u=a*2,d=t-1;for(let p=0;p!==a;++p){let m=o[c+p],g=o[l+p],_=d*u+p*2,y=f[_],E=f[_+1],x=t*u+p*2,b=h[x],M=h[x+1],T=rM(i,e,y,b,n);r[p]=W_(T,m,E,M,g)}return r}};function W_(s,t,e,i,n){let r=1-s;return r*r*r*t+3*r*r*s*e+3*r*s*s*i+s*s*s*n}function sM(s,t,e,i,n){let r=1-s;return 3*r*r*(e-t)+6*r*s*(i-e)+3*s*s*(n-i)}function rM(s,t,e,i,n){let r=(s-t)/(n-t);for(let o=0;o<8;o++){let a=W_(r,t,e,i,n)-s;if(Math.abs(a)<1e-10)break;let l=sM(r,t,e,i,n);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var Bn=class{constructor(t,e,i,n){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ea(e,this.TimeBufferType),this.values=ea(i,this.ValueBufferType),this.setInterpolation(n||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:ea(t.times,Array),values:ea(t.values,Array)};let n=t.getInterpolation();n!==t.DefaultInterpolation&&(i.interpolation=n),dp(t.settings)&&(i.settings={inTangents:ea(t.settings.inTangents,Array),outTangents:ea(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new ou(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new ru(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new su(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new au(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case El:e=this.InterpolantFactoryMethodDiscrete;break;case Yh:e=this.InterpolantFactoryMethodLinear;break;case Uh:e=this.InterpolantFactoryMethodSmooth;break;case mp:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Zt("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return El;case this.InterpolantFactoryMethodLinear:return Yh;case this.InterpolantFactoryMethodSmooth:return Uh;case this.InterpolantFactoryMethodBezier:return mp}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,n=e.length;i!==n;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,n=e.length;i!==n;++i)e[i]*=t;dp(this.settings)&&(Qg(this.settings.inTangents,t),Qg(this.settings.outTangents,t))}return this}trim(t,e){let i=this.times,n=i.length,r=0,o=n-1;for(;r!==n&&i[r]<t;)++r;for(;o!==-1&&i[o]>e;)--o;if(++o,r!==0||o!==n){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&($t("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,n=this.values,r=i.length;r===0&&($t("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){$t("KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){$t("KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(n!==void 0&&xS(n))for(let a=0,l=n.length;a!==l;++a){let c=n[a];if(isNaN(c)){$t("KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),n=this.getInterpolation()===Uh,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(n)l=!0;else{let f=a*i,u=f-i,d=f+i;for(let p=0;p!==i;++p){let m=e[f+p];if(m!==e[u+p]||m!==e[d+p]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let f=a*i,u=o*i;for(let d=0;d!==i;++d)e[u+d]=e[f+d]}++o}}if(r>0){t[o]=t[r];for(let a=r*i,l=o*i,c=0;c!==i;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,n=new i(this.name,t,e);return n.createInterpolant=this.createInterpolant,dp(this.settings)&&(n.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),n}};function Qg(s,t){for(let e=0,i=s.length;e!==i;e+=2)s[e]*=t}Bn.prototype.ValueTypeName="";Bn.prototype.TimeBufferType=Float32Array;Bn.prototype.ValueBufferType=Float32Array;Bn.prototype.DefaultInterpolation=Yh;var Mr=class extends Bn{constructor(t,e,i){super(t,e,i)}};Mr.prototype.ValueTypeName="bool";Mr.prototype.ValueBufferType=Array;Mr.prototype.DefaultInterpolation=El;Mr.prototype.InterpolantFactoryMethodLinear=void 0;Mr.prototype.InterpolantFactoryMethodSmooth=void 0;var lu=class extends Bn{constructor(t,e,i,n){super(t,e,i,n)}};lu.prototype.ValueTypeName="color";var cu=class extends Bn{constructor(t,e,i,n){super(t,e,i,n)}};cu.prototype.ValueTypeName="number";var hu=class extends Sr{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t,e,i,n){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-e)/(n-e),c=t*a;for(let h=c+a;c!==h;c+=4)Mi.slerpFlat(r,0,o,c-a,o,c,l);return r}},Gl=class extends Bn{constructor(t,e,i,n){super(t,e,i,n)}InterpolantFactoryMethodLinear(t){return new hu(this.times,this.values,this.getValueSize(),t)}};Gl.prototype.ValueTypeName="quaternion";Gl.prototype.InterpolantFactoryMethodSmooth=void 0;var br=class extends Bn{constructor(t,e,i){super(t,e,i)}};br.prototype.ValueTypeName="string";br.prototype.ValueBufferType=Array;br.prototype.DefaultInterpolation=El;br.prototype.InterpolantFactoryMethodLinear=void 0;br.prototype.InterpolantFactoryMethodSmooth=void 0;var uu=class extends Bn{constructor(t,e,i,n){super(t,e,i,n)}};uu.prototype.ValueTypeName="vector";var fu=class{constructor(t,e,i){let n=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(h){a++,r===!1&&n.onStart!==void 0&&n.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,n.onProgress!==void 0&&n.onProgress(h,o,a),o===a&&(r=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(h){n.onError!==void 0&&n.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,f){return c.push(h,f),this},this.removeHandler=function(h){let f=c.indexOf(h);return f!==-1&&c.splice(f,2),this},this.getHandler=function(h){for(let f=0,u=c.length;f<u;f+=2){let d=c[f],p=c[f+1];if(d.global&&(d.lastIndex=0),d.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},X_=new fu,du=class{constructor(t){this.manager=t!==void 0?t:X_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(n,r){i.load(t,n,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};du.DEFAULT_MATERIAL_NAME="__DEFAULT";var ya=class extends mi{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Wt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},Wl=class extends ya{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(mi.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Wt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},pp=new be,t_=new N,e_=new N,Xl=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Tt(512,512),this.mapType=Tn,this.map=null,this.mapPass=null,this.matrix=new be,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ma,this._frameExtents=new Tt(1,1),this._viewportCount=1,this._viewports=[new qe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;t_.setFromMatrixPosition(t.matrixWorld),e.position.copy(t_),e_.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(e_),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,n){pp.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(pp,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=n?n.z/r.x:1,a=n?n.w/r.y:1,l=n?n.x/r.x:0,c=n?n.y/r.y:0;t.coordinateSystem===la||t.reversedDepth?e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),e.multiply(pp)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Dh=new N,Nh=new Mi,Ms=new N,Yl=class extends mi{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new be,this.projectionMatrix=new be,this.projectionMatrixInverse=new be,this.coordinateSystem=ss,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Dh,Nh,Ms),Ms.x===1&&Ms.y===1&&Ms.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Dh,Nh,Ms.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(Dh,Nh,Ms),Ms.x===1&&Ms.y===1&&Ms.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Dh,Nh,Ms.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},vr=new N,i_=new Tt,n_=new Tt,Li=class extends Yl{constructor(t=50,e=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=ha*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(ra*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ha*2*Math.atan(Math.tan(ra*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){vr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(vr.x,vr.y).multiplyScalar(-t/vr.z),vr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(vr.x,vr.y).multiplyScalar(-t/vr.z)}getViewSize(t,e){return this.getViewBounds(t,i_,n_),e.subVectors(n_,i_)}setViewOffset(t,e,i,n,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(ra*.5*this.fov)/this.zoom,i=2*e,n=this.aspect*i,r=-.5*n,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*n/l,e-=o.offsetY*i/c,n*=o.width/l,i*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var yp=class extends Xl{constructor(){super(new Li(90,1,.5,500)),this.isPointLightShadow=!0}},ro=class extends ya{constructor(t,e,i=0,n=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=n,this.shadow=new yp}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},wr=class extends Yl{constructor(t=-1,e=1,i=1,n=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=n,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,n,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2,r=i-t,o=i+t,a=n+e,l=n-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Sp=class extends Xl{constructor(){super(new wr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Sa=class extends ya{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(mi.DEFAULT_UP),this.updateMatrix(),this.target=new mi,this.shadow=new Sp}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var ia=-90,na=1,Ma=class extends mi{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let n=new Li(ia,na,t,e);n.layers=this.layers,this.add(n);let r=new Li(ia,na,t,e);r.layers=this.layers,this.add(r);let o=new Li(ia,na,t,e);o.layers=this.layers,this.add(o);let a=new Li(ia,na,t,e);a.layers=this.layers,this.add(a);let l=new Li(ia,na,t,e);l.layers=this.layers,this.add(l);let c=new Li(ia,na,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,n,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===ss)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===la)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,f=t.getRenderTarget(),u=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;let m=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(i,0,n),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,n),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,2,n),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,3,n),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(i,4,n),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.generateMipmaps=m,t.setRenderTarget(i,5,n),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(f,u,d),t.xr.enabled=p,i.texture.needsPMREMUpdate=!0}},pu=class extends Li{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}},ql=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=oM.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function oM(){this._document.hidden===!1&&this.reset()}var Vp="\\[\\]\\.:\\/",aM=new RegExp("["+Vp+"]","g"),Gp="[^"+Vp+"]",lM="[^"+Vp.replace("\\.","")+"]",cM=/((?:WC+[\/:])*)/.source.replace("WC",Gp),hM=/(WCOD+)?/.source.replace("WCOD",lM),uM=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Gp),fM=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Gp),dM=new RegExp("^"+cM+hM+uM+fM+"$"),pM=["material","materials","bones","map"],Mp=class{constructor(t,e,i){let n=i||We.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,n)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,n=this._bindings[i];n!==void 0&&n.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let n=this._targetGroup.nCachedObjects_,r=i.length;n!==r;++n)i[n].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},We=class s{constructor(t,e,i){this.path=e,this.parsedPath=i||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,i):new s(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(aM,"")}static parseTrackName(t){let e=dM.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},n=i.nodeName&&i.nodeName.lastIndexOf(".");if(n!==void 0&&n!==-1){let r=i.nodeName.substring(n+1);pM.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,n),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=i(a.children);if(l)return l}return null},n=i(t.children);if(n)return n}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)t[e++]=i[n]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,n=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Zt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){$t("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){$t("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){$t("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){$t("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){$t("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){$t("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){$t("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[n];if(o===void 0){let c=e.nodeName;$t("PropertyBinding: Trying to update property for track: "+c+"."+n+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(n==="morphTargetInfluences"){if(!t.geometry){$t("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){$t("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=n;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};We.Composite=Mp;We.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};We.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};We.prototype.GetterByBindingType=[We.prototype._getValue_direct,We.prototype._getValue_array,We.prototype._getValue_arrayElement,We.prototype._getValue_toArray];We.prototype.SetterByBindingTypeAndVersioning=[[We.prototype._setValue_direct,We.prototype._setValue_direct_setNeedsUpdate,We.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[We.prototype._setValue_array,We.prototype._setValue_array_setNeedsUpdate,We.prototype._setValue_array_setMatrixWorldNeedsUpdate],[We.prototype._setValue_arrayElement,We.prototype._setValue_arrayElement_setNeedsUpdate,We.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[We.prototype._setValue_fromArray,We.prototype._setValue_fromArray_setNeedsUpdate,We.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var TA=new Float32Array(1);var s_=new be,Zl=class{constructor(t,e,i=0,n=1/0){this.ray=new qs(t,e),this.near=i,this.far=n,this.camera=null,this.layers=new fa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):$t("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return s_.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(s_),this}intersectObject(t,e=!0,i=[]){return bp(t,this,i,e),i.sort(r_),i}intersectObjects(t,e=!0,i=[]){for(let n=0,r=t.length;n<r;n++)bp(t[n],this,i,e);return i.sort(r_),i}};function r_(s,t){return s.distance-t.distance}function bp(s,t,e,i){let n=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(n=!1),n===!0&&i===!0){let r=s.children;for(let o=0,a=r.length;o<a;o++)bp(r[o],t,e,!0)}}var ba=class{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=ce(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(ce(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Kp=class Kp{constructor(t,e,i,n){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,n)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,n){let r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=n,this}};Kp.prototype.isMatrix2=!0;var wp=Kp;var Kl=class extends os{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function Wp(s,t,e,i){let n=mM(i);switch(e){case Up:return s*t;case wu:return s*t/n.components*n.byteLength;case Tu:return s*t/n.components*n.byteLength;case Pr:return s*t*2/n.components*n.byteLength;case Eu:return s*t*2/n.components*n.byteLength;case Fp:return s*t*3/n.components*n.byteLength;case $n:return s*t*4/n.components*n.byteLength;case Au:return s*t*4/n.components*n.byteLength;case rc:case oc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case ac:case lc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ru:case Iu:return Math.max(s,16)*Math.max(t,8)/4;case Cu:case Pu:return Math.max(s,8)*Math.max(t,8)/2;case Lu:case Du:case Uu:case Fu:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Nu:case cc:case Ou:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Bu:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ku:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case zu:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Hu:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Vu:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Gu:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Wu:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Xu:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Yu:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case qu:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Zu:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Ku:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Ju:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case $u:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case ju:case Qu:case tf:return Math.ceil(s/4)*Math.ceil(t/4)*16;case ef:case nf:return Math.ceil(s/4)*Math.ceil(t/4)*8;case hc:case sf:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function mM(s){switch(s){case Tn:case Ip:return{byteLength:1,components:1};case Ea:case Lp:case gi:return{byteLength:2,components:1};case Mu:case bu:return{byteLength:2,components:4};case us:case Su:case Jn:return{byteLength:4,components:1};case Dp:case Np:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Zt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function dv(){let s=null,t=!1,e=null,i=null;function n(r,o){i=s.requestAnimationFrame(n),e(r,o)}return{start:function(){t!==!0&&e!==null&&s!==null&&(i=s.requestAnimationFrame(n),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function MM(s){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,f=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),a.onUploadCallback();let d;if(c instanceof Float32Array)d=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=s.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=s.SHORT;else if(c instanceof Uint32Array)d=s.UNSIGNED_INT;else if(c instanceof Int32Array)d=s.INT;else if(c instanceof Int8Array)d=s.BYTE;else if(c instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,l,c){let h=l.array,f=l.updateRanges;if(s.bindBuffer(c,a),f.length===0)s.bufferSubData(c,0,h);else{f.sort((d,p)=>d.start-p.start);let u=0;for(let d=1;d<f.length;d++){let p=f[u],m=f[d];m.start<=p.start+p.count+1?p.count=Math.max(p.count,m.start+m.count-p.start):(++u,f[u]=m)}f.length=u+1;for(let d=0,p=f.length;d<p;d++){let m=f[d];s.bufferSubData(c,m.start*h.BYTES_PER_ELEMENT,h,m.start,m.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(s.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:n,remove:r,update:o}}var bM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wM=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,TM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,EM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,AM=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,CM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,RM=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,PM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,IM=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,LM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,DM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,NM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,UM=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,FM=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,OM=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,BM=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,kM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,zM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,HM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,VM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,GM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,WM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,XM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,YM=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,qM=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ZM=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,KM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,JM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$M=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,jM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,QM="gl_FragColor = linearToOutputTexel( gl_FragColor );",t1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,e1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,i1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,n1=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,s1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,r1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,o1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,a1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,l1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,c1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,h1=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,u1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,f1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,d1=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,p1=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,m1=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,g1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_1=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,v1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,x1=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,y1=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,S1=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,M1=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,b1=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,w1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,T1=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,E1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,A1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,C1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,R1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,P1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,I1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,L1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,D1=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,N1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,U1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,F1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,O1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,B1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,k1=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,z1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,H1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,V1=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,G1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,W1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,X1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Y1=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,q1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Z1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,K1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,J1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,j1=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Q1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,tb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,eb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ib=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,nb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,sb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,rb=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,ob=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ab=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,lb=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,cb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hb=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ub=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,fb=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,db=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,pb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,mb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gb=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,_b=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,vb=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,xb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Sb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Mb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,bb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,wb=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Eb=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ab=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rb=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Pb=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ib=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Lb=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Db=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Nb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ub=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Fb=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ob=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Bb=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kb=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zb=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hb=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Vb=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gb=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Wb=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Xb=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yb=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qb=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Zb=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kb=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jb=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$b=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,jb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qb=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tw=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ew=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,iw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,oe={alphahash_fragment:bM,alphahash_pars_fragment:wM,alphamap_fragment:TM,alphamap_pars_fragment:EM,alphatest_fragment:AM,alphatest_pars_fragment:CM,aomap_fragment:RM,aomap_pars_fragment:PM,batching_pars_vertex:IM,batching_vertex:LM,begin_vertex:DM,beginnormal_vertex:NM,bsdfs:UM,iridescence_fragment:FM,bumpmap_pars_fragment:OM,clipping_planes_fragment:BM,clipping_planes_pars_fragment:kM,clipping_planes_pars_vertex:zM,clipping_planes_vertex:HM,color_fragment:VM,color_pars_fragment:GM,color_pars_vertex:WM,color_vertex:XM,common:YM,cube_uv_reflection_fragment:qM,defaultnormal_vertex:ZM,displacementmap_pars_vertex:KM,displacementmap_vertex:JM,emissivemap_fragment:$M,emissivemap_pars_fragment:jM,colorspace_fragment:QM,colorspace_pars_fragment:t1,envmap_fragment:e1,envmap_common_pars_fragment:i1,envmap_pars_fragment:n1,envmap_pars_vertex:s1,envmap_physical_pars_fragment:m1,envmap_vertex:r1,fog_vertex:o1,fog_pars_vertex:a1,fog_fragment:l1,fog_pars_fragment:c1,gradientmap_pars_fragment:h1,lightmap_pars_fragment:u1,lights_lambert_fragment:f1,lights_lambert_pars_fragment:d1,lights_pars_begin:p1,lights_toon_fragment:g1,lights_toon_pars_fragment:_1,lights_phong_fragment:v1,lights_phong_pars_fragment:x1,lights_physical_fragment:y1,lights_physical_pars_fragment:S1,lights_fragment_begin:M1,lights_fragment_maps:b1,lights_fragment_end:w1,lightprobes_pars_fragment:T1,logdepthbuf_fragment:E1,logdepthbuf_pars_fragment:A1,logdepthbuf_pars_vertex:C1,logdepthbuf_vertex:R1,map_fragment:P1,map_pars_fragment:I1,map_particle_fragment:L1,map_particle_pars_fragment:D1,metalnessmap_fragment:N1,metalnessmap_pars_fragment:U1,morphinstance_vertex:F1,morphcolor_vertex:O1,morphnormal_vertex:B1,morphtarget_pars_vertex:k1,morphtarget_vertex:z1,normal_fragment_begin:H1,normal_fragment_maps:V1,normal_pars_fragment:G1,normal_pars_vertex:W1,normal_vertex:X1,normalmap_pars_fragment:Y1,clearcoat_normal_fragment_begin:q1,clearcoat_normal_fragment_maps:Z1,clearcoat_pars_fragment:K1,iridescence_pars_fragment:J1,opaque_fragment:$1,packing:j1,premultiplied_alpha_fragment:Q1,project_vertex:tb,dithering_fragment:eb,dithering_pars_fragment:ib,roughnessmap_fragment:nb,roughnessmap_pars_fragment:sb,shadowmap_pars_fragment:rb,shadowmap_pars_vertex:ob,shadowmap_vertex:ab,shadowmask_pars_fragment:lb,skinbase_vertex:cb,skinning_pars_vertex:hb,skinning_vertex:ub,skinnormal_vertex:fb,specularmap_fragment:db,specularmap_pars_fragment:pb,tonemapping_fragment:mb,tonemapping_pars_fragment:gb,transmission_fragment:_b,transmission_pars_fragment:vb,uv_pars_fragment:xb,uv_pars_vertex:yb,uv_vertex:Sb,worldpos_vertex:Mb,background_vert:bb,background_frag:wb,backgroundCube_vert:Tb,backgroundCube_frag:Eb,cube_vert:Ab,cube_frag:Cb,depth_vert:Rb,depth_frag:Pb,distance_vert:Ib,distance_frag:Lb,equirect_vert:Db,equirect_frag:Nb,linedashed_vert:Ub,linedashed_frag:Fb,meshbasic_vert:Ob,meshbasic_frag:Bb,meshlambert_vert:kb,meshlambert_frag:zb,meshmatcap_vert:Hb,meshmatcap_frag:Vb,meshnormal_vert:Gb,meshnormal_frag:Wb,meshphong_vert:Xb,meshphong_frag:Yb,meshphysical_vert:qb,meshphysical_frag:Zb,meshtoon_vert:Kb,meshtoon_frag:Jb,points_vert:$b,points_frag:jb,shadow_vert:Qb,shadow_frag:tw,sprite_vert:ew,sprite_frag:iw},Et={common:{diffuse:{value:new Wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ne},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ne}},envmap:{envMap:{value:null},envMapRotation:{value:new ne},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ne},normalScale:{value:new Tt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new N},probesMax:{value:new N},probesResolution:{value:new N}},points:{diffuse:{value:new Wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0},uvTransform:{value:new ne}},sprite:{diffuse:{value:new Wt(16777215)},opacity:{value:1},center:{value:new Tt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ne},alphaMap:{value:null},alphaMapTransform:{value:new ne},alphaTest:{value:0}}},Ps={basic:{uniforms:$i([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.fog]),vertexShader:oe.meshbasic_vert,fragmentShader:oe.meshbasic_frag},lambert:{uniforms:$i([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,Et.lights,{emissive:{value:new Wt(0)},envMapIntensity:{value:1}}]),vertexShader:oe.meshlambert_vert,fragmentShader:oe.meshlambert_frag},phong:{uniforms:$i([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,Et.lights,{emissive:{value:new Wt(0)},specular:{value:new Wt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:oe.meshphong_vert,fragmentShader:oe.meshphong_frag},standard:{uniforms:$i([Et.common,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.roughnessmap,Et.metalnessmap,Et.fog,Et.lights,{emissive:{value:new Wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:oe.meshphysical_vert,fragmentShader:oe.meshphysical_frag},toon:{uniforms:$i([Et.common,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.gradientmap,Et.fog,Et.lights,{emissive:{value:new Wt(0)}}]),vertexShader:oe.meshtoon_vert,fragmentShader:oe.meshtoon_frag},matcap:{uniforms:$i([Et.common,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,{matcap:{value:null}}]),vertexShader:oe.meshmatcap_vert,fragmentShader:oe.meshmatcap_frag},points:{uniforms:$i([Et.points,Et.fog]),vertexShader:oe.points_vert,fragmentShader:oe.points_frag},dashed:{uniforms:$i([Et.common,Et.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:oe.linedashed_vert,fragmentShader:oe.linedashed_frag},depth:{uniforms:$i([Et.common,Et.displacementmap]),vertexShader:oe.depth_vert,fragmentShader:oe.depth_frag},normal:{uniforms:$i([Et.common,Et.bumpmap,Et.normalmap,Et.displacementmap,{opacity:{value:1}}]),vertexShader:oe.meshnormal_vert,fragmentShader:oe.meshnormal_frag},sprite:{uniforms:$i([Et.sprite,Et.fog]),vertexShader:oe.sprite_vert,fragmentShader:oe.sprite_frag},background:{uniforms:{uvTransform:{value:new ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:oe.background_vert,fragmentShader:oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ne}},vertexShader:oe.backgroundCube_vert,fragmentShader:oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:oe.cube_vert,fragmentShader:oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:oe.equirect_vert,fragmentShader:oe.equirect_frag},distance:{uniforms:$i([Et.common,Et.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:oe.distance_vert,fragmentShader:oe.distance_frag},shadow:{uniforms:$i([Et.lights,Et.fog,{color:{value:new Wt(0)},opacity:{value:1}}]),vertexShader:oe.shadow_vert,fragmentShader:oe.shadow_frag}};Ps.physical={uniforms:$i([Ps.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ne},clearcoatNormalScale:{value:new Tt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ne},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ne},sheen:{value:0},sheenColor:{value:new Wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ne},transmissionSamplerSize:{value:new Tt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ne},attenuationDistance:{value:0},attenuationColor:{value:new Wt(0)},specularColor:{value:new Wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ne},anisotropyVector:{value:new Tt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ne}}]),vertexShader:oe.meshphysical_vert,fragmentShader:oe.meshphysical_frag};var lf={r:0,b:0,g:0},nw=new be,pv=new ne;pv.set(-1,0,0,0,1,0,0,0,1);function sw(s,t,e,i,n,r){let o=new Wt(0),a=n===!0?0:1,l,c,h=null,f=0,u=null;function d(y){let E=y.isScene===!0?y.background:null;if(E&&E.isTexture){let x=y.backgroundBlurriness>0;E=t.get(E,x)}return E}function p(y){let E=!1,x=d(y);x===null?g(o,a):x&&x.isColor&&(g(x,1),E=!0);let b=s.xr.getEnvironmentBlendMode();b==="additive"?e.buffers.color.setClear(0,0,0,1,r):b==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(s.autoClear||E)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(y,E){let x=d(E);x&&(x.isCubeTexture||x.mapping===nc)?(c===void 0&&(c=new ge(new _e(1,1,1),new Se({name:"BackgroundCubeMaterial",uniforms:co(Ps.backgroundCube.uniforms),vertexShader:Ps.backgroundCube.vertexShader,fragmentShader:Ps.backgroundCube.fragmentShader,side:li,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(b,M,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(nw.makeRotationFromEuler(E.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(pv),c.material.toneMapped=de.getTransfer(x.colorSpace)!==Te,(h!==x||f!==x.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,h=x,f=x.version,u=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new ge(new ls(2,2),new Se({name:"BackgroundMaterial",uniforms:co(Ps.background.uniforms),vertexShader:Ps.background.vertexShader,fragmentShader:Ps.background.fragmentShader,side:Ar,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=de.getTransfer(x.colorSpace)!==Te,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||f!==x.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,h=x,f=x.version,u=s.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function g(y,E){y.getRGB(lf,Hp(s)),e.buffers.color.setClear(lf.r,lf.g,lf.b,E,r)}function _(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,E=1){o.set(y),a=E,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(y){a=y,g(o,a)},render:p,addToRenderList:m,dispose:_}}function rw(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),i={},n=u(null),r=n,o=!1;function a(D,I,O,L,B){let V=!1,z=f(D,L,O,I);r!==z&&(r=z,c(r.object)),V=d(D,L,O,B),V&&p(D,L,O,B),B!==null&&t.update(B,s.ELEMENT_ARRAY_BUFFER),(V||o)&&(o=!1,x(D,I,O,L),B!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function l(){return s.createVertexArray()}function c(D){return s.bindVertexArray(D)}function h(D){return s.deleteVertexArray(D)}function f(D,I,O,L){let B=L.wireframe===!0,V=i[I.id];V===void 0&&(V={},i[I.id]=V);let z=D.isInstancedMesh===!0?D.id:0,$=V[z];$===void 0&&($={},V[z]=$);let Z=$[O.id];Z===void 0&&(Z={},$[O.id]=Z);let R=Z[B];return R===void 0&&(R=u(l()),Z[B]=R),R}function u(D){let I=[],O=[],L=[];for(let B=0;B<e;B++)I[B]=0,O[B]=0,L[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:O,attributeDivisors:L,object:D,attributes:{},index:null}}function d(D,I,O,L){let B=r.attributes,V=I.attributes,z=0,$=O.getAttributes();for(let Z in $)if($[Z].location>=0){let tt=B[Z],it=V[Z];if(it===void 0&&(Z==="instanceMatrix"&&D.instanceMatrix&&(it=D.instanceMatrix),Z==="instanceColor"&&D.instanceColor&&(it=D.instanceColor)),tt===void 0||tt.attribute!==it||it&&tt.data!==it.data)return!0;z++}return r.attributesNum!==z||r.index!==L}function p(D,I,O,L){let B={},V=I.attributes,z=0,$=O.getAttributes();for(let Z in $)if($[Z].location>=0){let tt=V[Z];tt===void 0&&(Z==="instanceMatrix"&&D.instanceMatrix&&(tt=D.instanceMatrix),Z==="instanceColor"&&D.instanceColor&&(tt=D.instanceColor));let it={};it.attribute=tt,tt&&tt.data&&(it.data=tt.data),B[Z]=it,z++}r.attributes=B,r.attributesNum=z,r.index=L}function m(){let D=r.newAttributes;for(let I=0,O=D.length;I<O;I++)D[I]=0}function g(D){_(D,0)}function _(D,I){let O=r.newAttributes,L=r.enabledAttributes,B=r.attributeDivisors;O[D]=1,L[D]===0&&(s.enableVertexAttribArray(D),L[D]=1),B[D]!==I&&(s.vertexAttribDivisor(D,I),B[D]=I)}function y(){let D=r.newAttributes,I=r.enabledAttributes;for(let O=0,L=I.length;O<L;O++)I[O]!==D[O]&&(s.disableVertexAttribArray(O),I[O]=0)}function E(D,I,O,L,B,V,z){z===!0?s.vertexAttribIPointer(D,I,O,B,V):s.vertexAttribPointer(D,I,O,L,B,V)}function x(D,I,O,L){m();let B=L.attributes,V=O.getAttributes(),z=I.defaultAttributeValues;for(let $ in V){let Z=V[$];if(Z.location>=0){let R=B[$];if(R===void 0&&($==="instanceMatrix"&&D.instanceMatrix&&(R=D.instanceMatrix),$==="instanceColor"&&D.instanceColor&&(R=D.instanceColor)),R!==void 0){let tt=R.normalized,it=R.itemSize,at=t.get(R);if(at===void 0)continue;let j=at.buffer,ht=at.type,bt=at.bytesPerElement,G=ht===s.INT||ht===s.UNSIGNED_INT||R.gpuType===Su;if(R.isInterleavedBufferAttribute){let J=R.data,ot=J.stride,Dt=R.offset;if(J.isInstancedInterleavedBuffer){for(let _t=0;_t<Z.locationSize;_t++)_(Z.location+_t,J.meshPerAttribute);D.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let _t=0;_t<Z.locationSize;_t++)g(Z.location+_t);s.bindBuffer(s.ARRAY_BUFFER,j);for(let _t=0;_t<Z.locationSize;_t++)E(Z.location+_t,it/Z.locationSize,ht,tt,ot*bt,(Dt+it/Z.locationSize*_t)*bt,G)}else{if(R.isInstancedBufferAttribute){for(let J=0;J<Z.locationSize;J++)_(Z.location+J,R.meshPerAttribute);D.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=R.meshPerAttribute*R.count)}else for(let J=0;J<Z.locationSize;J++)g(Z.location+J);s.bindBuffer(s.ARRAY_BUFFER,j);for(let J=0;J<Z.locationSize;J++)E(Z.location+J,it/Z.locationSize,ht,tt,it*bt,it/Z.locationSize*J*bt,G)}}else if(z!==void 0){let tt=z[$];if(tt!==void 0)switch(tt.length){case 2:s.vertexAttrib2fv(Z.location,tt);break;case 3:s.vertexAttrib3fv(Z.location,tt);break;case 4:s.vertexAttrib4fv(Z.location,tt);break;default:s.vertexAttrib1fv(Z.location,tt)}}}}y()}function b(){w();for(let D in i){let I=i[D];for(let O in I){let L=I[O];for(let B in L){let V=L[B];for(let z in V)h(V[z].object),delete V[z];delete L[B]}}delete i[D]}}function M(D){if(i[D.id]===void 0)return;let I=i[D.id];for(let O in I){let L=I[O];for(let B in L){let V=L[B];for(let z in V)h(V[z].object),delete V[z];delete L[B]}}delete i[D.id]}function T(D){for(let I in i){let O=i[I];for(let L in O){let B=O[L];if(B[D.id]===void 0)continue;let V=B[D.id];for(let z in V)h(V[z].object),delete V[z];delete B[D.id]}}}function v(D){for(let I in i){let O=i[I],L=D.isInstancedMesh===!0?D.id:0,B=O[L];if(B!==void 0){for(let V in B){let z=B[V];for(let $ in z)h(z[$].object),delete z[$];delete B[V]}delete O[L],Object.keys(O).length===0&&delete i[I]}}}function w(){C(),o=!0,r!==n&&(r=n,c(r.object))}function C(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:a,reset:w,resetDefaultState:C,dispose:b,releaseStatesOfGeometry:M,releaseStatesOfObject:v,releaseStatesOfProgram:T,initAttributes:m,enableAttribute:g,disableUnusedAttributes:y}}function ow(s,t,e){let i;function n(l){i=l}function r(l,c){s.drawArrays(i,l,c),e.update(c,i,1)}function o(l,c,h){h!==0&&(s.drawArraysInstanced(i,l,c,h),e.update(c,i,h))}function a(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let u=0;for(let d=0;d<h;d++)u+=c[d];e.update(u,i,1)}this.setMode=n,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function aw(s,t,e,i){let n;function r(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){let T=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function o(T){return!(T!==$n&&i.convert(T)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){let v=T===gi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==Tn&&T!==Jn&&!v&&i.convert(T)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(T){if(T==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Zt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let f=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Zt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),_=s.getParameter(s.MAX_VERTEX_ATTRIBS),y=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),E=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),b=s.getParameter(s.MAX_SAMPLES),M=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:p,maxTextureSize:m,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:y,maxVaryings:E,maxFragmentUniforms:x,maxSamples:b,samples:M}}function lw(s){let t=this,e=null,i=0,n=!1,r=!1,o=new pn,a=new ne,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){let d=f.length!==0||u||i!==0||n;return n=u,i=f.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){e=h(f,u,0)},this.setState=function(f,u,d){let p=f.clippingPlanes,m=f.clipIntersection,g=f.clipShadows,_=s.get(f);if(!n||p===null||p.length===0||r&&!g)r?h(null):c();else{let y=r?0:i,E=y*4,x=_.clippingState||null;l.value=x,x=h(p,u,E,d);for(let b=0;b!==E;++b)x[b]=e[b];_.clippingState=x,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(f,u,d,p){let m=f!==null?f.length:0,g=null;if(m!==0){if(g=l.value,p!==!0||g===null){let _=d+m*4,y=u.matrixWorldInverse;a.getNormalMatrix(y),(g===null||g.length<_)&&(g=new Float32Array(_));for(let E=0,x=d;E!==m;++E,x+=4)o.copy(f[E]).applyMatrix4(y,a),o.normal.toArray(g,x),g[x+3]=o.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=m,t.numIntersection=0,g}}var Pa=4,cw=6,hw=20,uw=256,fc=new wr,Y_=new Wt,Jp=null,$p=0,jp=0,Qp=!1,fw=new N,ho=new N,La=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,n=100,r={}){let{size:o=256,position:a=fw}=r;Jp=this._renderer.getRenderTarget(),$p=this._renderer.getActiveCubeFace(),jp=this._renderer.getActiveMipmapLevel(),Qp=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,n,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=K_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Z_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Jp,$p,jp),this._renderer.xr.enabled=Qp,t.scissorTest=!1,Ra(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Cr||t.mapping===lo?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Jp=this._renderer.getRenderTarget(),$p=this._renderer.getActiveCubeFace(),jp=this._renderer.getActiveMipmapLevel(),Qp=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Oi,minFilter:Oi,generateMipmaps:!1,type:gi,format:$n,colorSpace:Al,depthBuffer:!1},n=q_(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=q_(t,e,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=dw(r)),this._blurMaterial=mw(r,t,e),this._ggxMaterial=pw(r,t,e)}return n}_compileMaterial(t){let e=new ge(new Re,t);this._renderer.compile(e,fc)}_sceneToCubeUV(t,e,i,n,r){let l=new Li(90,1,e,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,d=f.toneMapping;f.getClearColor(Y_),f.toneMapping=hs,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(n),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ge(new _e,new no({name:"PMREM.Background",side:li,depthWrite:!1,depthTest:!1})));let m=this._backgroundBox,g=m.material,_=!1,y=t.background;y?y.isColor&&(g.color.copy(y),t.background=null,_=!0):(g.color.copy(Y_),_=!0);for(let E=0;E<6;E++){let x=E%3;x===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[E],r.y,r.z)):x===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[E]));let b=this._cubeSize;Ra(n,x*b,E>2?b:0,b,b),f.setRenderTarget(n),_&&f.render(m,l),f.render(t,l)}f.toneMapping=d,f.autoClear=u,t.background=y}_textureToCubeUV(t,e){let i=this._renderer,n=t.mapping===Cr||t.mapping===lo;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=K_()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Z_());let r=n?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;Ra(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,fc)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let n=this._lodMeshes.length;for(let r=1;r<n;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){let n=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;let l=o.uniforms,c=i/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),f=Math.sqrt(c*c-h*h),u=c*1.25,d=f*u,{_lodMax:p}=this,m=this._sizeLods[i],g=3*m*(i>p-Pa?i-p+Pa:0),_=4*(this._cubeSize-m);l.envMap.value=t.texture,l.roughness.value=d,l.mipInt.value=p-e,Ra(r,g,_,3*m,2*m),n.setRenderTarget(r),n.render(a,fc),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=p-i,Ra(t,g,_,3*m,2*m),n.setRenderTarget(t),n.render(a,fc)}_blur(t,e,i,n){let r=this._pingPongRenderTarget,o=Math.min(n,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,i,o),this._blurPass(r,t,i,i,o)}_blurPass(t,e,i,n,r){let o=this._renderer,a=this._blurMaterial,l=this._lodMeshes[n];l.material=a;let c=a.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;let h=this._sizeLods[n],f=3*h*(n>this._lodMax-Pa?n-this._lodMax+Pa:0),u=4*(this._cubeSize-h);Ra(e,f,u,3*h,2*h),o.setRenderTarget(e),o.render(l,fc)}};function dw(s){let t=[],e=[],i=s,n=s-Pa+1+cw;for(let r=0;r<n;r++){let o=Math.pow(2,i);t.push(o);let a=1/(o-2),l=-a,c=1+a,h=[l,l,c,l,c,c,l,l,c,c,l,c],f=6,u=6,d=3,p=new Float32Array(d*u*f),m=new Float32Array(d*u*f);for(let _=0;_<f;_++){let y=_%3*2/3-1,E=_>2?0:-1,x=[y,E,0,y+2/3,E,0,y+2/3,E+1,0,y,E,0,y+2/3,E+1,0,y,E+1,0];p.set(x,d*u*_);for(let b=0;b<u;b++){let M=h[b*2]*2-1,T=h[b*2+1]*2-1;_===0?ho.set(1,T,M):_===1?ho.set(-M,1,-T):_===2?ho.set(-M,T,1):_===3?ho.set(-1,T,-M):_===4?ho.set(-M,-1,T):ho.set(M,T,-1),ho.toArray(m,(_*u+b)*d)}}let g=new Re;g.setAttribute("position",new ye(p,d)),g.setAttribute("outputDirection",new ye(m,d)),e.push(new ge(g,null)),i>Pa&&i--}return{lodMeshes:e,sizeLods:t}}function q_(s,t,e){let i=new ni(s,t,e);return i.texture.mapping=nc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ra(s,t,e,i,n){s.viewport.set(t,e,i,n),s.scissor.set(t,e,i,n)}function pw(s,t,e){return new Se({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:uw,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:uf(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function mw(s,t,e){return new Se({name:"SphericalGaussianBlur",defines:{SAMPLES:hw,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:uf(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function Z_(){return new Se({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:uf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function K_(){return new Se({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:uf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function uf(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var uo=class extends ni{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},n=[i,i,i,i,i,i];this.texture=new Fl(n),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new _e(5,5,5),r=new Se({name:"CubemapFromEquirect",uniforms:co(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:li,blending:Kn});r.uniforms.tEquirect.value=e;let o=new ge(n,r),a=e.minFilter;return e.minFilter===Cs&&(e.minFilter=Oi),new Ma(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,n=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,n);t.setRenderTarget(r)}};function gw(s){let t=new WeakMap,e=new WeakMap,i=null;function n(u,d=!1){return u==null?null:d?o(u):r(u)}function r(u){if(u&&u.isTexture){let d=u.mapping;if(d===vu||d===xu)if(t.has(u)){let p=t.get(u).texture;return a(p,u.mapping)}else{let p=u.image;if(p&&p.height>0){let m=new uo(p.height);return m.fromEquirectangularTexture(s,u),t.set(u,m),u.addEventListener("dispose",c),a(m.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){let d=u.mapping,p=d===vu||d===xu,m=d===Cr||d===lo;if(p||m){let g=e.get(u),_=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==_)return i===null&&(i=new La(s)),g=p?i.fromEquirectangular(u,g):i.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),g.texture;if(g!==void 0)return g.texture;{let y=u.image;return p&&y&&y.height>0||m&&y&&l(y)?(i===null&&(i=new La(s)),g=p?i.fromEquirectangular(u):i.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function a(u,d){return d===vu?u.mapping=Cr:d===xu&&(u.mapping=lo),u}function l(u){let d=0,p=6;for(let m=0;m<p;m++)u[m]!==void 0&&d++;return d===p}function c(u){let d=u.target;d.removeEventListener("dispose",c);let p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function h(u){let d=u.target;d.removeEventListener("dispose",h);let p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function f(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:n,dispose:f}}function _w(s){let t={};function e(i){if(t[i]!==void 0)return t[i];let n=s.getExtension(i);return t[i]=n,n}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let n=e(i);return n===null&&io("WebGLRenderer: "+i+" extension not supported."),n}}}function vw(s,t,e,i){let n={},r=new WeakMap;function o(f){let u=f.target;u.index!==null&&t.remove(u.index);for(let p in u.attributes)t.remove(u.attributes[p]);u.removeEventListener("dispose",o),delete n[u.id];let d=r.get(u);d&&(t.remove(d),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(f,u){return n[u.id]===!0||(u.addEventListener("dispose",o),n[u.id]=!0,e.memory.geometries++),u}function l(f){let u=f.attributes;for(let d in u)t.update(u[d],s.ARRAY_BUFFER)}function c(f){let u=[],d=f.index,p=f.attributes.position,m=0;if(p===void 0)return;if(d!==null){let y=d.array;m=d.version;for(let E=0,x=y.length;E<x;E+=3){let b=y[E+0],M=y[E+1],T=y[E+2];u.push(b,M,M,T,T,b)}}else{let y=p.array;m=p.version;for(let E=0,x=y.length/3-1;E<x;E+=3){let b=E+0,M=E+1,T=E+2;u.push(b,M,M,T,T,b)}}let g=new(p.count>=65535?Dl:Ll)(u,1);g.version=m;let _=r.get(f);_&&t.remove(_),r.set(f,g)}function h(f){let u=r.get(f);if(u){let d=f.index;d!==null&&u.version<d.version&&c(f)}else c(f);return r.get(f)}return{get:a,update:l,getWireframeAttribute:h}}function xw(s,t,e){let i;function n(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,u){s.drawElements(i,u,r,f*o),e.update(u,i,1)}function c(f,u,d){d!==0&&(s.drawElementsInstanced(i,u,r,f*o,d),e.update(u,i,d))}function h(f,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,f,0,d);let m=0;for(let g=0;g<d;g++)m+=u[g];e.update(m,i,1)}this.setMode=n,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function yw(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:$t("WebGLInfo: Unknown draw mode:",o);break}}function n(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:n,update:i}}function Sw(s,t,e){let i=new WeakMap,n=new qe;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=h!==void 0?h.length:0,u=i.get(a);if(u===void 0||u.count!==f){let w=function(){T.dispose(),i.delete(a),a.removeEventListener("dispose",w)};u!==void 0&&u.texture.dispose();let d=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],_=a.morphAttributes.normal||[],y=a.morphAttributes.color||[],E=0;d===!0&&(E=1),p===!0&&(E=2),m===!0&&(E=3);let x=a.attributes.position.count*E,b=1;x>t.maxTextureSize&&(b=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);let M=new Float32Array(x*b*4*f),T=new Pl(M,x,b,f);T.type=Jn,T.needsUpdate=!0;let v=E*4;for(let C=0;C<f;C++){let D=g[C],I=_[C],O=y[C],L=x*b*4*C;for(let B=0;B<D.count;B++){let V=B*v;d===!0&&(n.fromBufferAttribute(D,B),M[L+V+0]=n.x,M[L+V+1]=n.y,M[L+V+2]=n.z,M[L+V+3]=0),p===!0&&(n.fromBufferAttribute(I,B),M[L+V+4]=n.x,M[L+V+5]=n.y,M[L+V+6]=n.z,M[L+V+7]=0),m===!0&&(n.fromBufferAttribute(O,B),M[L+V+8]=n.x,M[L+V+9]=n.y,M[L+V+10]=n.z,M[L+V+11]=O.itemSize===4?n.w:1)}}u={count:f,texture:T,size:new Tt(x,b)},i.set(a,u),a.addEventListener("dispose",w)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let d=0;for(let m=0;m<c.length;m++)d+=c[m];let p=a.morphTargetsRelative?1:1-d;l.getUniforms().setValue(s,"morphTargetBaseInfluence",p),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function Mw(s,t,e,i,n){let r=new WeakMap;function o(c){let h=n.render.frame,f=c.geometry,u=t.get(c,f);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let d=c.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return u}function a(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}var bw={[$l]:"LINEAR_TONE_MAPPING",[jl]:"REINHARD_TONE_MAPPING",[Ql]:"CINEON_TONE_MAPPING",[ao]:"ACES_FILMIC_TONE_MAPPING",[ec]:"AGX_TONE_MAPPING",[ic]:"NEUTRAL_TONE_MAPPING",[tc]:"CUSTOM_TONE_MAPPING"};function ww(s,t,e,i,n,r){let o=new ni(t,e,{type:s,depthBuffer:n,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=new Re;c.setAttribute("position",new me([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new me([0,2,0,0,2,0],2));let h=new va({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new ge(c,h),u=new wr(-1,1,1,-1,0,1),d=null,p=null,m=!1,g,_=null,y=[],E=!1;this.setSize=function(x,b){o.setSize(x,b),a!==null&&a.setSize(x,b),l!==null&&l.setSize(x,b);for(let M=0;M<y.length;M++){let T=y[M];T.setSize&&T.setSize(x,b)}},this.setEffects=function(x){y=x,E=y.length>0&&y[0].isRenderPass===!0;let b=o.width,M=o.height;y.length>0&&a===null&&(a=new ni(b,M,{type:gi,depthBuffer:!1,stencilBuffer:!1}),l=new ni(b,M,{type:gi,depthBuffer:!1,stencilBuffer:!1}));for(let T=0;T<y.length;T++){let v=y[T];v.setSize&&v.setSize(b,M)}},this.begin=function(x,b){if(m||x.toneMapping===hs&&y.length===0)return!1;if(_=b,b!==null){let M=b.width,T=b.height;(o.width!==M||o.height!==T)&&this.setSize(M,T)}return E===!1&&x.setRenderTarget(o),g=x.toneMapping,x.toneMapping=hs,!0},this.hasRenderPass=function(){return E},this.end=function(x,b){x.toneMapping=g,m=!0;let M=o,T=a;for(let v=0;v<y.length;v++){let w=y[v];w.enabled!==!1&&(w.render(x,T,M,b),w.needsSwap!==!1&&(M=T,T=T===a?l:a))}if(d!==x.outputColorSpace||p!==x.toneMapping){d=x.outputColorSpace,p=x.toneMapping,h.defines={},de.getTransfer(d)===Te&&(h.defines.SRGB_TRANSFER="");let v=bw[p];v&&(h.defines[v]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=M.texture,x.setRenderTarget(_),x.render(f,u),_=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var mv=new mn,im=new yr(1,1),gv=new Pl,_v=new Kh,vv=new Fl,J_=[],$_=[],j_=new Float32Array(16),Q_=new Float32Array(9),tv=new Float32Array(4);function Da(s,t,e){let i=s[0];if(i<=0||i>0)return s;let n=t*e,r=J_[n];if(r===void 0&&(r=new Float32Array(n),J_[n]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function bi(s,t){if(s.length!==t.length)return!1;for(let e=0,i=s.length;e<i;e++)if(s[e]!==t[e])return!1;return!0}function wi(s,t){for(let e=0,i=t.length;e<i;e++)s[e]=t[e]}function ff(s,t){let e=$_[t];e===void 0&&(e=new Int32Array(t),$_[t]=e);for(let i=0;i!==t;++i)e[i]=s.allocateTextureUnit();return e}function Tw(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Ew(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(bi(e,t))return;s.uniform2fv(this.addr,t),wi(e,t)}}function Aw(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(bi(e,t))return;s.uniform3fv(this.addr,t),wi(e,t)}}function Cw(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(bi(e,t))return;s.uniform4fv(this.addr,t),wi(e,t)}}function Rw(s,t){let e=this.cache,i=t.elements;if(i===void 0){if(bi(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),wi(e,t)}else{if(bi(e,i))return;tv.set(i),s.uniformMatrix2fv(this.addr,!1,tv),wi(e,i)}}function Pw(s,t){let e=this.cache,i=t.elements;if(i===void 0){if(bi(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),wi(e,t)}else{if(bi(e,i))return;Q_.set(i),s.uniformMatrix3fv(this.addr,!1,Q_),wi(e,i)}}function Iw(s,t){let e=this.cache,i=t.elements;if(i===void 0){if(bi(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),wi(e,t)}else{if(bi(e,i))return;j_.set(i),s.uniformMatrix4fv(this.addr,!1,j_),wi(e,i)}}function Lw(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Dw(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(bi(e,t))return;s.uniform2iv(this.addr,t),wi(e,t)}}function Nw(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(bi(e,t))return;s.uniform3iv(this.addr,t),wi(e,t)}}function Uw(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(bi(e,t))return;s.uniform4iv(this.addr,t),wi(e,t)}}function Fw(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Ow(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(bi(e,t))return;s.uniform2uiv(this.addr,t),wi(e,t)}}function Bw(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(bi(e,t))return;s.uniform3uiv(this.addr,t),wi(e,t)}}function kw(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(bi(e,t))return;s.uniform4uiv(this.addr,t),wi(e,t)}}function zw(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);let r;this.type===s.SAMPLER_2D_SHADOW?(im.compareFunction=e.isReversedDepthBuffer()?of:rf,r=im):r=mv,e.setTexture2D(t||r,n)}function Hw(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture3D(t||_v,n)}function Vw(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTextureCube(t||vv,n)}function Gw(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture2DArray(t||gv,n)}function Ww(s){switch(s){case 5126:return Tw;case 35664:return Ew;case 35665:return Aw;case 35666:return Cw;case 35674:return Rw;case 35675:return Pw;case 35676:return Iw;case 5124:case 35670:return Lw;case 35667:case 35671:return Dw;case 35668:case 35672:return Nw;case 35669:case 35673:return Uw;case 5125:return Fw;case 36294:return Ow;case 36295:return Bw;case 36296:return kw;case 35678:case 36198:case 36298:case 36306:case 35682:return zw;case 35679:case 36299:case 36307:return Hw;case 35680:case 36300:case 36308:case 36293:return Vw;case 36289:case 36303:case 36311:case 36292:return Gw}}function Xw(s,t){s.uniform1fv(this.addr,t)}function Yw(s,t){let e=Da(t,this.size,2);s.uniform2fv(this.addr,e)}function qw(s,t){let e=Da(t,this.size,3);s.uniform3fv(this.addr,e)}function Zw(s,t){let e=Da(t,this.size,4);s.uniform4fv(this.addr,e)}function Kw(s,t){let e=Da(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Jw(s,t){let e=Da(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function $w(s,t){let e=Da(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function jw(s,t){s.uniform1iv(this.addr,t)}function Qw(s,t){s.uniform2iv(this.addr,t)}function tT(s,t){s.uniform3iv(this.addr,t)}function eT(s,t){s.uniform4iv(this.addr,t)}function iT(s,t){s.uniform1uiv(this.addr,t)}function nT(s,t){s.uniform2uiv(this.addr,t)}function sT(s,t){s.uniform3uiv(this.addr,t)}function rT(s,t){s.uniform4uiv(this.addr,t)}function oT(s,t,e){let i=this.cache,n=t.length,r=ff(e,n);bi(i,r)||(s.uniform1iv(this.addr,r),wi(i,r));let o;this.type===s.SAMPLER_2D_SHADOW?o=im:o=mv;for(let a=0;a!==n;++a)e.setTexture2D(t[a]||o,r[a])}function aT(s,t,e){let i=this.cache,n=t.length,r=ff(e,n);bi(i,r)||(s.uniform1iv(this.addr,r),wi(i,r));for(let o=0;o!==n;++o)e.setTexture3D(t[o]||_v,r[o])}function lT(s,t,e){let i=this.cache,n=t.length,r=ff(e,n);bi(i,r)||(s.uniform1iv(this.addr,r),wi(i,r));for(let o=0;o!==n;++o)e.setTextureCube(t[o]||vv,r[o])}function cT(s,t,e){let i=this.cache,n=t.length,r=ff(e,n);bi(i,r)||(s.uniform1iv(this.addr,r),wi(i,r));for(let o=0;o!==n;++o)e.setTexture2DArray(t[o]||gv,r[o])}function hT(s){switch(s){case 5126:return Xw;case 35664:return Yw;case 35665:return qw;case 35666:return Zw;case 35674:return Kw;case 35675:return Jw;case 35676:return $w;case 5124:case 35670:return jw;case 35667:case 35671:return Qw;case 35668:case 35672:return tT;case 35669:case 35673:return eT;case 5125:return iT;case 36294:return nT;case 36295:return sT;case 36296:return rT;case 35678:case 36198:case 36298:case 36306:case 35682:return oT;case 35679:case 36299:case 36307:return aT;case 35680:case 36300:case 36308:case 36293:return lT;case 36289:case 36303:case 36311:case 36292:return cT}}var nm=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Ww(e.type)}},sm=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=hT(e.type)}},rm=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let n=this.seq;for(let r=0,o=n.length;r!==o;++r){let a=n[r];a.setValue(t,e[a.id],i)}}},tm=/(\w+)(\])?(\[|\.)?/g;function ev(s,t){s.seq.push(t),s.map[t.id]=t}function uT(s,t,e){let i=s.name,n=i.length;for(tm.lastIndex=0;;){let r=tm.exec(i),o=tm.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===n){ev(e,c===void 0?new nm(a,s,t):new sm(a,s,t));break}else{let f=e.map[a];f===void 0&&(f=new rm(a),ev(e,f)),e=f}}}var Ia=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){let a=t.getActiveUniform(e,o),l=t.getUniformLocation(e,a.name);uT(a,l,this)}let n=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?n.push(o):r.push(o);n.length>0&&(this.seq=n.concat(r))}setValue(t,e,i,n){let r=this.map[e];r!==void 0&&r.setValue(t,i,n)}setOptional(t,e,i){let n=e[i];n!==void 0&&this.setValue(t,i,n)}static upload(t,e,i,n){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,n)}}static seqWithValue(t,e){let i=[];for(let n=0,r=t.length;n!==r;++n){let o=t[n];o.id in e&&i.push(o)}return i}};function iv(s,t,e){let i=s.createShader(t);return s.shaderSource(i,e),s.compileShader(i),i}var fT=37297,dT=0;function pT(s,t){let e=s.split(`
`),i=[],n=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=n;o<r;o++){let a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}var nv=new ne;function mT(s){de._getMatrix(nv,de.workingColorSpace,s);let t=`mat3( ${nv.elements.map(e=>e.toFixed(4))} )`;switch(de.getTransfer(s)){case Cl:return[t,"LinearTransferOETF"];case Te:return[t,"sRGBTransferOETF"];default:return Zt("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function sv(s,t,e){let i=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+pT(s.getShaderSource(t),a)}else return r}function gT(s,t){let e=mT(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var _T={[$l]:"Linear",[jl]:"Reinhard",[Ql]:"Cineon",[ao]:"ACESFilmic",[ec]:"AgX",[ic]:"Neutral",[tc]:"Custom"};function vT(s,t){let e=_T[t];return e===void 0?(Zt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var cf=new N;function xT(){de.getLuminanceCoefficients(cf);let s=cf.x.toFixed(4),t=cf.y.toFixed(4),e=cf.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function yT(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(pc).join(`
`)}function ST(s){let t=[];for(let e in s){let i=s[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function MT(s,t){let e={},i=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){let r=s.getActiveAttrib(t,n),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function pc(s){return s!==""}function rv(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ov(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var bT=/^[ \t]*#include +<([\w\d./]+)>/gm;function om(s){return s.replace(bT,TT)}var wT=new Map;function TT(s,t){let e=oe[t];if(e===void 0){let i=wT.get(t);if(i!==void 0)e=oe[i],Zt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return om(e)}var ET=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function av(s){return s.replace(ET,AT)}function AT(s,t,e,i){let n="";for(let r=parseInt(t);r<parseInt(e);r++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return n}function lv(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var CT={[Jl]:"SHADOWMAP_TYPE_PCF",[wa]:"SHADOWMAP_TYPE_VSM"};function RT(s){return CT[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var PT={[Cr]:"ENVMAP_TYPE_CUBE",[lo]:"ENVMAP_TYPE_CUBE",[nc]:"ENVMAP_TYPE_CUBE_UV"};function IT(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":PT[s.envMapMode]||"ENVMAP_TYPE_CUBE"}var LT={[lo]:"ENVMAP_MODE_REFRACTION"};function DT(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":LT[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var NT={[_u]:"ENVMAP_BLENDING_MULTIPLY",[E_]:"ENVMAP_BLENDING_MIX",[A_]:"ENVMAP_BLENDING_ADD"};function UT(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":NT[s.combine]||"ENVMAP_BLENDING_NONE"}function FT(s){let t=s.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function OT(s,t,e,i){let n=s.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=RT(e),c=IT(e),h=DT(e),f=UT(e),u=FT(e),d=yT(e),p=ST(r),m=n.createProgram(),g,_,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(pc).join(`
`),g.length>0&&(g+=`
`),_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(pc).join(`
`),_.length>0&&(_+=`
`)):(g=[lv(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(pc).join(`
`),_=[lv(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==hs?"#define TONE_MAPPING":"",e.toneMapping!==hs?oe.tonemapping_pars_fragment:"",e.toneMapping!==hs?vT("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",oe.colorspace_pars_fragment,gT("linearToOutputTexel",e.outputColorSpace),xT(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(pc).join(`
`)),o=om(o),o=rv(o,e),o=ov(o,e),a=om(a),a=rv(a,e),a=ov(a,e),o=av(o),a=av(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,_=["#define varying in",e.glslVersion===Bp?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Bp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);let E=y+g+o,x=y+_+a,b=iv(n,n.VERTEX_SHADER,E),M=iv(n,n.FRAGMENT_SHADER,x);n.attachShader(m,b),n.attachShader(m,M),e.index0AttributeName!==void 0?n.bindAttribLocation(m,0,e.index0AttributeName):e.hasPositionAttribute===!0&&n.bindAttribLocation(m,0,"position"),n.linkProgram(m);function T(D){if(s.debug.checkShaderErrors){let I=n.getProgramInfoLog(m)||"",O=n.getShaderInfoLog(b)||"",L=n.getShaderInfoLog(M)||"",B=I.trim(),V=O.trim(),z=L.trim(),$=!0,Z=!0;if(n.getProgramParameter(m,n.LINK_STATUS)===!1)if($=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,m,b,M);else{let R=sv(n,b,"vertex"),tt=sv(n,M,"fragment");$t("WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(m,n.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+B+`
`+R+`
`+tt)}else B!==""?Zt("WebGLProgram: Program Info Log:",B):(V===""||z==="")&&(Z=!1);Z&&(D.diagnostics={runnable:$,programLog:B,vertexShader:{log:V,prefix:g},fragmentShader:{log:z,prefix:_}})}n.deleteShader(b),n.deleteShader(M),v=new Ia(n,m),w=MT(n,m)}let v;this.getUniforms=function(){return v===void 0&&T(this),v};let w;this.getAttributes=function(){return w===void 0&&T(this),w};let C=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=n.getProgramParameter(m,fT)),C},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=dT++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=M,this}var BT=0,am=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){let n=this._getShaderCacheForMaterial(t);return n.has(e)===!1&&(n.add(e),e.usedTimes++),n.has(i)===!1&&(n.add(i),i.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new lm(t),e.set(t,i)),i}},lm=class{constructor(t){this.id=BT++,this.code=t,this.usedTimes=0}};function kT(s){return s===Pr||s===cc||s===hc}function zT(s,t,e,i,n,r){let o=new fa,a=new am,l=new Set,c=[],h=new Map,f=i.logarithmicDepthBuffer,u=i.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(v){return l.add(v),v===0?"uv":`uv${v}`}function m(v,w,C,D,I,O){let L=D.fog,B=I.geometry,V=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?D.environment:null,z=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,$=t.get(v.envMap||V,z),Z=$&&$.mapping===nc?$.image.height:null,R=d[v.type];v.precision!==null&&(u=i.getMaxPrecision(v.precision),u!==v.precision&&Zt("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));let tt=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,it=tt!==void 0?tt.length:0,at=0;B.morphAttributes.position!==void 0&&(at=1),B.morphAttributes.normal!==void 0&&(at=2),B.morphAttributes.color!==void 0&&(at=3);let j,ht,bt,G;if(R){let Ht=Ps[R];j=Ht.vertexShader,ht=Ht.fragmentShader}else{j=v.vertexShader,ht=v.fragmentShader;let Ht=a.getVertexShaderStage(v),ut=a.getFragmentShaderStage(v);a.update(v,Ht,ut),bt=Ht.id,G=ut.id}let J=s.getRenderTarget(),ot=s.state.buffers.depth.getReversed(),Dt=I.isInstancedMesh===!0,_t=I.isBatchedMesh===!0,zt=!!v.map,Vt=!!v.matcap,Ct=!!$,Xt=!!v.aoMap,te=!!v.lightMap,W=!!v.bumpMap&&v.wireframe===!1,he=!!v.normalMap,De=!!v.displacementMap,Ze=!!v.emissiveMap,ee=!!v.metalnessMap,Ee=!!v.roughnessMap,k=v.anisotropy>0,Xe=v.clearcoat>0,jt=v.dispersion>0,P=v.retroreflectivity>0,S=v.iridescence>0,H=v.sheen>0,Y=v.transmission>0,Q=k&&!!v.anisotropyMap,mt=Xe&&!!v.clearcoatMap,ft=Xe&&!!v.clearcoatNormalMap,et=Xe&&!!v.clearcoatRoughnessMap,rt=S&&!!v.iridescenceMap,xt=S&&!!v.iridescenceThicknessMap,Lt=H&&!!v.sheenColorMap,yt=H&&!!v.sheenRoughnessMap,vt=!!v.specularMap,pt=!!v.specularColorMap,Bt=!!v.specularIntensityMap,Yt=Y&&!!v.transmissionMap,U=Y&&!!v.thicknessMap,gt=!!v.gradientMap,st=!!v.alphaMap,St=v.alphaTest>0,wt=!!v.alphaHash,lt=!!v.extensions,dt=hs;v.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(dt=s.toneMapping);let ct={shaderID:R,shaderType:v.type,shaderName:v.name,vertexShader:j,fragmentShader:ht,defines:v.defines,customVertexShaderID:bt,customFragmentShaderID:G,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:_t,batchingColor:_t&&I._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&I.instanceColor!==null,instancingMorph:Dt&&I.morphTexture!==null,outputColorSpace:J===null?s.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:de.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:zt,matcap:Vt,envMap:Ct,envMapMode:Ct&&$.mapping,envMapCubeUVHeight:Z,aoMap:Xt,lightMap:te,bumpMap:W,normalMap:he,displacementMap:De,emissiveMap:Ze,normalMapObjectSpace:he&&v.normalMapType===P_,normalMapTangentSpace:he&&v.normalMapType===uc,packedNormalMap:he&&v.normalMapType===uc&&kT(v.normalMap.format),metalnessMap:ee,roughnessMap:Ee,anisotropy:k,anisotropyMap:Q,clearcoat:Xe,clearcoatMap:mt,clearcoatNormalMap:ft,clearcoatRoughnessMap:et,dispersion:jt,retroreflection:P,iridescence:S,iridescenceMap:rt,iridescenceThicknessMap:xt,sheen:H,sheenColorMap:Lt,sheenRoughnessMap:yt,specularMap:vt,specularColorMap:pt,specularIntensityMap:Bt,transmission:Y,transmissionMap:Yt,thicknessMap:U,gradientMap:gt,opaque:v.transparent===!1&&v.blending===Ta&&v.alphaToCoverage===!1,alphaMap:st,alphaTest:St,alphaHash:wt,combine:v.combine,mapUv:zt&&p(v.map.channel),aoMapUv:Xt&&p(v.aoMap.channel),lightMapUv:te&&p(v.lightMap.channel),bumpMapUv:W&&p(v.bumpMap.channel),normalMapUv:he&&p(v.normalMap.channel),displacementMapUv:De&&p(v.displacementMap.channel),emissiveMapUv:Ze&&p(v.emissiveMap.channel),metalnessMapUv:ee&&p(v.metalnessMap.channel),roughnessMapUv:Ee&&p(v.roughnessMap.channel),anisotropyMapUv:Q&&p(v.anisotropyMap.channel),clearcoatMapUv:mt&&p(v.clearcoatMap.channel),clearcoatNormalMapUv:ft&&p(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:et&&p(v.clearcoatRoughnessMap.channel),iridescenceMapUv:rt&&p(v.iridescenceMap.channel),iridescenceThicknessMapUv:xt&&p(v.iridescenceThicknessMap.channel),sheenColorMapUv:Lt&&p(v.sheenColorMap.channel),sheenRoughnessMapUv:yt&&p(v.sheenRoughnessMap.channel),specularMapUv:vt&&p(v.specularMap.channel),specularColorMapUv:pt&&p(v.specularColorMap.channel),specularIntensityMapUv:Bt&&p(v.specularIntensityMap.channel),transmissionMapUv:Yt&&p(v.transmissionMap.channel),thicknessMapUv:U&&p(v.thicknessMap.channel),alphaMapUv:st&&p(v.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(he||k),vertexNormals:!!B.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!B.attributes.uv&&(zt||st),fog:!!L,useFog:v.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||B.attributes.normal===void 0&&he===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ot,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:it,morphTextureStride:at,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:O.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&C.length>0,shadowMapType:s.shadowMap.type,toneMapping:dt,decodeVideoTexture:zt&&v.map.isVideoTexture===!0&&de.getTransfer(v.map.colorSpace)===Te,decodeVideoTextureEmissive:Ze&&v.emissiveMap.isVideoTexture===!0&&de.getTransfer(v.emissiveMap.colorSpace)===Te,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===bn,flipSided:v.side===li,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:lt&&v.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(lt&&v.extensions.multiDraw===!0||_t)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return ct.vertexUv1s=l.has(1),ct.vertexUv2s=l.has(2),ct.vertexUv3s=l.has(3),l.clear(),ct}function g(v){let w=[];if(v.shaderID?w.push(v.shaderID):(w.push(v.customVertexShaderID),w.push(v.customFragmentShaderID)),v.defines!==void 0)for(let C in v.defines)w.push(C),w.push(v.defines[C]);return v.isRawShaderMaterial===!1&&(_(w,v),y(w,v),w.push(s.outputColorSpace)),w.push(v.customProgramCacheKey),w.join()}function _(v,w){v.push(w.precision),v.push(w.outputColorSpace),v.push(w.envMapMode),v.push(w.envMapCubeUVHeight),v.push(w.mapUv),v.push(w.alphaMapUv),v.push(w.lightMapUv),v.push(w.aoMapUv),v.push(w.bumpMapUv),v.push(w.normalMapUv),v.push(w.displacementMapUv),v.push(w.emissiveMapUv),v.push(w.metalnessMapUv),v.push(w.roughnessMapUv),v.push(w.anisotropyMapUv),v.push(w.clearcoatMapUv),v.push(w.clearcoatNormalMapUv),v.push(w.clearcoatRoughnessMapUv),v.push(w.iridescenceMapUv),v.push(w.iridescenceThicknessMapUv),v.push(w.sheenColorMapUv),v.push(w.sheenRoughnessMapUv),v.push(w.specularMapUv),v.push(w.specularColorMapUv),v.push(w.specularIntensityMapUv),v.push(w.transmissionMapUv),v.push(w.thicknessMapUv),v.push(w.combine),v.push(w.fogExp2),v.push(w.sizeAttenuation),v.push(w.morphTargetsCount),v.push(w.morphAttributeCount),v.push(w.numSunLights),v.push(w.numDirLights),v.push(w.numPointLights),v.push(w.numSpotLights),v.push(w.numSpotLightMaps),v.push(w.numHemiLights),v.push(w.numRectAreaLights),v.push(w.numSunLightShadows),v.push(w.numDirLightShadows),v.push(w.numPointLightShadows),v.push(w.numSpotLightShadows),v.push(w.numSpotLightShadowsWithMaps),v.push(w.numLightProbes),v.push(w.shadowMapType),v.push(w.toneMapping),v.push(w.numClippingPlanes),v.push(w.numClipIntersection),v.push(w.depthPacking)}function y(v,w){o.disableAll(),w.instancing&&o.enable(0),w.instancingColor&&o.enable(1),w.instancingMorph&&o.enable(2),w.matcap&&o.enable(3),w.envMap&&o.enable(4),w.normalMapObjectSpace&&o.enable(5),w.normalMapTangentSpace&&o.enable(6),w.clearcoat&&o.enable(7),w.iridescence&&o.enable(8),w.alphaTest&&o.enable(9),w.vertexColors&&o.enable(10),w.vertexAlphas&&o.enable(11),w.vertexUv1s&&o.enable(12),w.vertexUv2s&&o.enable(13),w.vertexUv3s&&o.enable(14),w.vertexTangents&&o.enable(15),w.anisotropy&&o.enable(16),w.alphaHash&&o.enable(17),w.batching&&o.enable(18),w.dispersion&&o.enable(19),w.retroreflection&&o.enable(24),w.batchingColor&&o.enable(20),w.gradientMap&&o.enable(21),w.packedNormalMap&&o.enable(22),w.vertexNormals&&o.enable(23),v.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.reversedDepthBuffer&&o.enable(4),w.skinning&&o.enable(5),w.morphTargets&&o.enable(6),w.morphNormals&&o.enable(7),w.morphColors&&o.enable(8),w.premultipliedAlpha&&o.enable(9),w.shadowMapEnabled&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),w.decodeVideoTextureEmissive&&o.enable(20),w.alphaToCoverage&&o.enable(21),w.numLightProbeGrids>0&&o.enable(22),w.hasPositionAttribute&&o.enable(23),v.push(o.mask)}function E(v){let w=d[v.type],C;if(w){let D=Ps[w];C=fs.clone(D.uniforms)}else C=v.uniforms;return C}function x(v,w){let C=h.get(w);return C!==void 0?++C.usedTimes:(C=new OT(s,w,v,n),c.push(C),h.set(w,C)),C}function b(v){if(--v.usedTimes===0){let w=c.indexOf(v);c[w]=c[c.length-1],c.pop(),h.delete(v.cacheKey),v.destroy()}}function M(v){a.remove(v)}function T(){a.dispose()}return{getParameters:m,getProgramCacheKey:g,getUniforms:E,acquireProgram:x,releaseProgram:b,releaseShaderCache:M,programs:c,dispose:T}}function HT(){let s=new WeakMap;function t(o){return s.has(o)}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function i(o){s.delete(o)}function n(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:i,update:n,dispose:r}}function VT(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function cv(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function hv(){let s=[],t=0,e=[],i=[],n=[];function r(){t=0,e.length=0,i.length=0,n.length=0}function o(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function a(u,d,p,m,g,_){let y=s[t];return y===void 0?(y={id:u.id,object:u,geometry:d,material:p,materialVariant:o(u),groupOrder:m,renderOrder:u.renderOrder,z:g,group:_},s[t]=y):(y.id=u.id,y.object=u,y.geometry=d,y.material=p,y.materialVariant=o(u),y.groupOrder=m,y.renderOrder=u.renderOrder,y.z=g,y.group=_),t++,y}function l(u,d,p,m,g,_,y){y.reversedDepth===!0&&(g=-g);let E=a(u,d,p,m,g,_);p.transmission>0?i.push(E):p.transparent===!0?n.push(E):e.push(E)}function c(u,d,p,m,g,_){let y=a(u,d,p,m,g,_);p.transmission>0?i.unshift(y):p.transparent===!0?n.unshift(y):e.unshift(y)}function h(u,d){e.length>1&&e.sort(u||VT),i.length>1&&i.sort(d||cv),n.length>1&&n.sort(d||cv)}function f(){for(let u=t,d=s.length;u<d;u++){let p=s[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:n,init:r,push:l,unshift:c,finish:f,sort:h}}function GT(){let s=new WeakMap;function t(i,n){let r=s.get(i),o;return r===void 0?(o=new hv,s.set(i,[o])):n>=r.length?(o=new hv,r.push(o)):o=r[n],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function WT(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new N,color:new Wt};break;case"SpotLight":e={position:new N,direction:new N,color:new Wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new Wt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new Wt,groundColor:new Wt};break;case"RectAreaLight":e={color:new Wt,position:new N,halfWidth:new N,halfHeight:new N};break}return s[t.id]=e,e}}}function XT(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Tt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Tt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Tt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var YT=0;function qT(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function ZT(s){let t=new WT,e=XT(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new N);let n=new N,r=new be,o=new be;function a(c){let h=0,f=0,u=0;for(let I=0;I<9;I++)i.probe[I].set(0,0,0);let d=0,p=0,m=0,g=0,_=0,y=0,E=0,x=0,b=0,M=0,T=0,v=0,w=0,C=0;c.sort(qT);for(let I=0,O=c.length;I<O;I++){let L=c[I],B=L.color,V=L.intensity,z=L.distance,$=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===Pr?$=L.shadow.map.texture:$=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=B.r*V,f+=B.g*V,u+=B.b*V;else if(L.isLightProbe){for(let Z=0;Z<9;Z++)i.probe[Z].addScaledVector(L.sh.coefficients[Z],V);C++}else if(L.isSunLight){let Z=t.get(L);if(Z.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let R=L.shadow,tt=e.get(L);tt.shadowIntensity=R.intensity,tt.shadowBias=R.bias,tt.shadowNormalBias=R.normalBias,tt.shadowRadius=R.radius,tt.shadowMapSize.copy(R.mapSize).multiply(R.getFrameExtents()),i.sunShadow[p]=tt,i.sunShadowMap[p]=$;let it=R.getViewportCount();for(let at=0;at<it;at++)i.sunShadowMatrix[m+at]=R.getMatrix(at),i.sunShadowCascade[m+at]=R._cascadeData[at];m+=it,p++}i.sun[d]=Z,d++}else if(L.isDirectionalLight){let Z=t.get(L);if(Z.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let R=L.shadow,tt=e.get(L);tt.shadowIntensity=R.intensity,tt.shadowBias=R.bias,tt.shadowNormalBias=R.normalBias,tt.shadowRadius=R.radius,tt.shadowMapSize=R.mapSize,i.directionalShadow[g]=tt,i.directionalShadowMap[g]=$,i.directionalShadowMatrix[g]=L.shadow.matrix,b++}i.directional[g]=Z,g++}else if(L.isSpotLight){let Z=t.get(L);Z.position.setFromMatrixPosition(L.matrixWorld),Z.color.copy(B).multiplyScalar(V),Z.distance=z,Z.coneCos=Math.cos(L.angle),Z.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Z.decay=L.decay,i.spot[y]=Z;let R=L.shadow;if(L.map&&(i.spotLightMap[v]=L.map,v++,R.updateMatrices(L),L.castShadow&&w++),i.spotLightMatrix[y]=R.matrix,L.castShadow){let tt=e.get(L);tt.shadowIntensity=R.intensity,tt.shadowBias=R.bias,tt.shadowNormalBias=R.normalBias,tt.shadowRadius=R.radius,tt.shadowMapSize=R.mapSize,i.spotShadow[y]=tt,i.spotShadowMap[y]=$,T++}y++}else if(L.isRectAreaLight){let Z=t.get(L);Z.color.copy(B).multiplyScalar(V),Z.halfWidth.set(L.width*.5,0,0),Z.halfHeight.set(0,L.height*.5,0),i.rectArea[E]=Z,E++}else if(L.isPointLight){let Z=t.get(L);if(Z.color.copy(L.color).multiplyScalar(L.intensity),Z.distance=L.distance,Z.decay=L.decay,L.castShadow){let R=L.shadow,tt=e.get(L);tt.shadowIntensity=R.intensity,tt.shadowBias=R.bias,tt.shadowNormalBias=R.normalBias,tt.shadowRadius=R.radius,tt.shadowMapSize=R.mapSize,tt.shadowCameraNear=R.camera.near,tt.shadowCameraFar=R.camera.far,i.pointShadow[_]=tt,i.pointShadowMap[_]=$,i.pointShadowMatrix[_]=L.shadow.matrix,M++}i.point[_]=Z,_++}else if(L.isHemisphereLight){let Z=t.get(L);Z.skyColor.copy(L.color).multiplyScalar(V),Z.groundColor.copy(L.groundColor).multiplyScalar(V),i.hemi[x]=Z,x++}}E>0&&(s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Et.LTC_FLOAT_1,i.rectAreaLTC2=Et.LTC_FLOAT_2):(i.rectAreaLTC1=Et.LTC_HALF_1,i.rectAreaLTC2=Et.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=f,i.ambient[2]=u;let D=i.hash;(D.sunLength!==d||D.directionalLength!==g||D.pointLength!==_||D.spotLength!==y||D.rectAreaLength!==E||D.hemiLength!==x||D.numSunShadows!==p||D.numDirectionalShadows!==b||D.numPointShadows!==M||D.numSpotShadows!==T||D.numSpotMaps!==v||D.numLightProbes!==C)&&(i.sun.length=d,i.directional.length=g,i.spot.length=y,i.rectArea.length=E,i.point.length=_,i.hemi.length=x,i.sunShadow.length=p,i.sunShadowMap.length=p,i.sunShadowMatrix.length=m,i.sunShadowCascade.length=m,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.directionalShadowMatrix.length=b,i.pointShadow.length=M,i.pointShadowMap.length=M,i.pointShadowMatrix.length=M,i.spotShadow.length=T,i.spotShadowMap.length=T,i.spotLightMatrix.length=T+v-w,i.spotLightMap.length=v,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=C,D.sunLength=d,D.directionalLength=g,D.pointLength=_,D.spotLength=y,D.rectAreaLength=E,D.hemiLength=x,D.numSunShadows=p,D.numDirectionalShadows=b,D.numPointShadows=M,D.numSpotShadows=T,D.numSpotMaps=v,D.numLightProbes=C,i.version=YT++)}function l(c,h){let f=0,u=0,d=0,p=0,m=0,g=0,_=h.matrixWorldInverse;for(let y=0,E=c.length;y<E;y++){let x=c[y];if(x.isSunLight){let b=i.sun[f];b.direction.setFromMatrixPosition(x.matrixWorld),b.direction.transformDirection(_),f++}else if(x.isDirectionalLight){let b=i.directional[u];b.direction.setFromMatrixPosition(x.matrixWorld),n.setFromMatrixPosition(x.target.matrixWorld),b.direction.sub(n),b.direction.transformDirection(_),u++}else if(x.isSpotLight){let b=i.spot[p];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(_),b.direction.setFromMatrixPosition(x.matrixWorld),n.setFromMatrixPosition(x.target.matrixWorld),b.direction.sub(n),b.direction.transformDirection(_),p++}else if(x.isRectAreaLight){let b=i.rectArea[m];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(_),o.identity(),r.copy(x.matrixWorld),r.premultiply(_),o.extractRotation(r),b.halfWidth.set(x.width*.5,0,0),b.halfHeight.set(0,x.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),m++}else if(x.isPointLight){let b=i.point[d];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(_),d++}else if(x.isHemisphereLight){let b=i.hemi[g];b.direction.setFromMatrixPosition(x.matrixWorld),b.direction.transformDirection(_),g++}}}return{setup:a,setupView:l,state:i}}function uv(s){let t=new ZT(s),e=[],i=[],n=[];function r(u){f.camera=u,e.length=0,i.length=0,n.length=0}function o(u){e.push(u)}function a(u){i.push(u)}function l(u){n.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}let f={lightsArray:e,shadowsArray:i,lightProbeGridArray:n,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function KT(s){let t=new WeakMap;function e(n,r=0){let o=t.get(n),a;return o===void 0?(a=new uv(s),t.set(n,[a])):r>=o.length?(a=new uv(s),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}var JT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$T=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,jT=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],QT=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],fv=new be,dc=new N,em=new N;function tE(s,t,e){let i=new ma,n=new Tt,r=new Tt,o=new qe,a=new xa,l=new nu,c={},h=e.maxTextureSize,f={[Ar]:li,[li]:Ar,[bn]:bn},u=new Se({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Tt},radius:{value:4}},vertexShader:JT,fragmentShader:$T}),d=u.clone();d.defines.HORIZONTAL_PASS=1;let p=new Re;p.setAttribute("position",new ye(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let m=new ge(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Jl;let _=this.type;this.render=function(M,T,v){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||M.length===0)return;this.type===gu&&(Zt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Jl);let w=s.getRenderTarget(),C=s.getActiveCubeFace(),D=s.getActiveMipmapLevel(),I=s.state;I.setBlending(Kn),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);let O=_!==this.type;O&&T.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(B=>B.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,B=M.length;L<B;L++){let V=M[L],z=V.shadow;if(z===void 0){Zt("WebGLShadowMap:",V,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;n.copy(z.mapSize);let $=z.getFrameExtents();n.multiply($),r.copy(z.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(r.x=Math.floor(h/$.x),n.x=r.x*$.x,z.mapSize.x=r.x),n.y>h&&(r.y=Math.floor(h/$.y),n.y=r.y*$.y,z.mapSize.y=r.y));let Z=s.state.buffers.depth.getReversed();if(z.camera._reversedDepth=Z,z.map===null||O===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===wa){if(V.isPointLight){Zt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new ni(n.x,n.y,{format:Pr,type:gi,minFilter:Oi,magFilter:Oi,generateMipmaps:!1}),z.map.texture.name=V.name+".shadowMap",z.map.depthTexture=new yr(n.x,n.y,Jn),z.map.depthTexture.name=V.name+".shadowMapDepth",z.map.depthTexture.format=ws,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Di,z.map.depthTexture.magFilter=Di}else V.isPointLight?(z.map=new uo(n.x),z.map.depthTexture=new eu(n.x,us)):(z.map=new ni(n.x,n.y),z.map.depthTexture=new yr(n.x,n.y,us)),z.map.depthTexture.name=V.name+".shadowMap",z.map.depthTexture.format=ws,this.type===Jl?(z.map.depthTexture.compareFunction=Z?of:rf,z.map.depthTexture.minFilter=Oi,z.map.depthTexture.magFilter=Oi):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Di,z.map.depthTexture.magFilter=Di);z.camera.updateProjectionMatrix()}z.map.isWebGLCubeRenderTarget!==!0&&(z.map.width!==n.x||z.map.height!==n.y)&&z.map.setSize(n.x,n.y);let R=z.map.isWebGLCubeRenderTarget?6:z.getViewportCount();V.isPointLight!==!0&&z.updateMatrices(V,v);for(let tt=0;tt<R;tt++){let it=z.getCamera(tt);if(V.isPointLight){let at=z.camera,j=z.matrix,ht=V.distance||at.far;ht!==at.far&&(at.far=ht,at.updateProjectionMatrix()),dc.setFromMatrixPosition(V.matrixWorld),at.position.copy(dc),em.copy(at.position),em.add(jT[tt]),at.up.copy(QT[tt]),at.lookAt(em),at.updateMatrixWorld(),j.makeTranslation(-dc.x,-dc.y,-dc.z),fv.multiplyMatrices(at.projectionMatrix,at.matrixWorldInverse),z._frustum.setFromProjectionMatrix(fv,at.coordinateSystem,at.reversedDepth)}if(z.map.isWebGLCubeRenderTarget)s.setRenderTarget(z.map,tt),s.clear();else{tt===0&&(s.setRenderTarget(z.map),s.clear());let at=z.getViewport(tt);o.set(r.x*at.x,r.y*at.y,r.x*at.z,r.y*at.w),I.viewport(o)}i=z.getFrustum(tt),x(T,v,it,V,this.type)}z.isPointLightShadow!==!0&&this.type===wa&&y(z,v),z.needsUpdate=!1}_=this.type,g.needsUpdate=!1,s.setRenderTarget(w,C,D)};function y(M,T){let v=t.update(m);u.defines.VSM_SAMPLES!==M.blurSamples&&(u.defines.VSM_SAMPLES=M.blurSamples,d.defines.VSM_SAMPLES=M.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),M.mapPass===null?M.mapPass=new ni(n.x,n.y,{format:Pr,type:gi}):(M.mapPass.width!==M.map.width||M.mapPass.height!==M.map.height)&&M.mapPass.setSize(M.map.width,M.map.height),u.uniforms.shadow_pass.value=M.map.depthTexture,u.uniforms.resolution.value.set(M.map.width,M.map.height),u.uniforms.radius.value=M.radius,s.setRenderTarget(M.mapPass),s.clear(),s.renderBufferDirect(T,null,v,u,m,null),d.uniforms.shadow_pass.value=M.mapPass.texture,d.uniforms.resolution.value.set(M.map.width,M.map.height),d.uniforms.radius.value=M.radius,s.setRenderTarget(M.map),s.clear(),s.renderBufferDirect(T,null,v,d,m,null)}function E(M,T,v,w){let C=null,D=v.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(D!==void 0)C=D;else if(C=v.isPointLight===!0?l:a,s.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){let I=C.uuid,O=T.uuid,L=c[I];L===void 0&&(L={},c[I]=L);let B=L[O];B===void 0&&(B=C.clone(),L[O]=B,T.addEventListener("dispose",b)),C=B}if(C.visible=T.visible,C.wireframe=T.wireframe,w===wa?C.side=T.shadowSide!==null?T.shadowSide:T.side:C.side=T.shadowSide!==null?T.shadowSide:f[T.side],C.alphaMap=T.alphaMap,C.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,C.map=T.map,C.clipShadows=T.clipShadows,C.clippingPlanes=T.clippingPlanes,C.clipIntersection=T.clipIntersection,C.displacementMap=T.displacementMap,C.displacementScale=T.displacementScale,C.displacementBias=T.displacementBias,C.wireframeLinewidth=T.wireframeLinewidth,C.linewidth=T.linewidth,v.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let I=s.properties.get(C);I.light=v}return C}function x(M,T,v,w,C){if(M.visible===!1)return;if(M.layers.test(T.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&C===wa)&&(!M.frustumCulled||M.intersectsFrustum(i))){M.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,M.matrixWorld);let O=t.update(M),L=M.material;if(Array.isArray(L)){let B=O.groups;for(let V=0,z=B.length;V<z;V++){let $=B[V],Z=L[$.materialIndex];if(Z&&Z.visible){let R=E(M,Z,w,C);M.onBeforeShadow(s,M,T,v,O,R,$),s.renderBufferDirect(v,null,O,R,M,$),M.onAfterShadow(s,M,T,v,O,R,$)}}}else if(L.visible){let B=E(M,L,w,C);M.onBeforeShadow(s,M,T,v,O,B,null),s.renderBufferDirect(v,null,O,B,M,null),M.onAfterShadow(s,M,T,v,O,B,null)}}let I=M.children;for(let O=0,L=I.length;O<L;O++)x(I[O],T,v,w,C)}function b(M){M.target.removeEventListener("dispose",b);for(let v in c){let w=c[v],C=M.target.uuid;C in w&&(w[C].dispose(),delete w[C])}}}function eE(s,t){function e(){let U=!1,gt=new qe,st=null,St=new qe(0,0,0,0);return{setMask:function(wt){st!==wt&&!U&&(s.colorMask(wt,wt,wt,wt),st=wt)},setLocked:function(wt){U=wt},setClear:function(wt,lt,dt,ct,Ht){Ht===!0&&(wt*=ct,lt*=ct,dt*=ct),gt.set(wt,lt,dt,ct),St.equals(gt)===!1&&(s.clearColor(wt,lt,dt,ct),St.copy(gt))},reset:function(){U=!1,st=null,St.set(-1,0,0,0)}}}function i(){let U=!1,gt=!1,st=null,St=null,wt=null;return{setReversed:function(lt){if(gt!==lt){let dt=t.get("EXT_clip_control");lt?dt.clipControlEXT(dt.LOWER_LEFT_EXT,dt.ZERO_TO_ONE_EXT):dt.clipControlEXT(dt.LOWER_LEFT_EXT,dt.NEGATIVE_ONE_TO_ONE_EXT),gt=lt;let ct=wt;wt=null,this.setClear(ct)}},getReversed:function(){return gt},setTest:function(lt){lt?J(s.DEPTH_TEST):ot(s.DEPTH_TEST)},setMask:function(lt){st!==lt&&!U&&(s.depthMask(lt),st=lt)},setFunc:function(lt){if(gt&&(lt=V_[lt]),St!==lt){switch(lt){case Oh:s.depthFunc(s.NEVER);break;case Bh:s.depthFunc(s.ALWAYS);break;case kh:s.depthFunc(s.LESS);break;case aa:s.depthFunc(s.LEQUAL);break;case zh:s.depthFunc(s.EQUAL);break;case Hh:s.depthFunc(s.GEQUAL);break;case Vh:s.depthFunc(s.GREATER);break;case Gh:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}St=lt}},setLocked:function(lt){U=lt},setClear:function(lt){wt!==lt&&(wt=lt,gt&&(lt=1-lt),s.clearDepth(lt))},reset:function(){U=!1,st=null,St=null,wt=null,gt=!1}}}function n(){let U=!1,gt=null,st=null,St=null,wt=null,lt=null,dt=null,ct=null,Ht=null;return{setTest:function(ut){U||(ut?J(s.STENCIL_TEST):ot(s.STENCIL_TEST))},setMask:function(ut){gt!==ut&&!U&&(s.stencilMask(ut),gt=ut)},setFunc:function(ut,Gt,Nt){(st!==ut||St!==Gt||wt!==Nt)&&(s.stencilFunc(ut,Gt,Nt),st=ut,St=Gt,wt=Nt)},setOp:function(ut,Gt,Nt){(lt!==ut||dt!==Gt||ct!==Nt)&&(s.stencilOp(ut,Gt,Nt),lt=ut,dt=Gt,ct=Nt)},setLocked:function(ut){U=ut},setClear:function(ut){Ht!==ut&&(s.clearStencil(ut),Ht=ut)},reset:function(){U=!1,gt=null,st=null,St=null,wt=null,lt=null,dt=null,ct=null,Ht=null}}}let r=new e,o=new i,a=new n,l=new WeakMap,c=new WeakMap,h={},f={},u={},d=new WeakMap,p=[],m=null,g=!1,_=null,y=null,E=null,x=null,b=null,M=null,T=null,v=new Wt(0,0,0),w=0,C=!1,D=null,I=null,O=null,L=null,B=null,V=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),z=!1,$=0,Z=s.getParameter(s.VERSION);Z.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(Z)[1]),z=$>=1):Z.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),z=$>=2);let R=null,tt={},it=s.getParameter(s.SCISSOR_BOX),at=s.getParameter(s.VIEWPORT),j=new qe().fromArray(it),ht=new qe().fromArray(at);function bt(U,gt,st,St){let wt=new Uint8Array(4),lt=s.createTexture();s.bindTexture(U,lt),s.texParameteri(U,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(U,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let dt=0;dt<st;dt++)U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY?s.texImage3D(gt,0,s.RGBA,1,1,St,0,s.RGBA,s.UNSIGNED_BYTE,wt):s.texImage2D(gt+dt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,wt);return lt}let G={};G[s.TEXTURE_2D]=bt(s.TEXTURE_2D,s.TEXTURE_2D,1),G[s.TEXTURE_CUBE_MAP]=bt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),G[s.TEXTURE_2D_ARRAY]=bt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),G[s.TEXTURE_3D]=bt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),J(s.DEPTH_TEST),o.setFunc(aa),W(!1),he(Tp),J(s.CULL_FACE),Xt(Kn);function J(U){h[U]!==!0&&(s.enable(U),h[U]=!0)}function ot(U){h[U]!==!1&&(s.disable(U),h[U]=!1)}function Dt(U,gt){return u[U]!==gt?(s.bindFramebuffer(U,gt),u[U]=gt,U===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=gt),U===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=gt),!0):!1}function _t(U,gt){let st=p,St=!1;if(U){st=d.get(gt),st===void 0&&(st=[],d.set(gt,st));let wt=U.textures;if(st.length!==wt.length||st[0]!==s.COLOR_ATTACHMENT0){for(let lt=0,dt=wt.length;lt<dt;lt++)st[lt]=s.COLOR_ATTACHMENT0+lt;st.length=wt.length,St=!0}}else st[0]!==s.BACK&&(st[0]=s.BACK,St=!0);St&&s.drawBuffers(st)}function zt(U){return m!==U?(s.useProgram(U),m=U,!0):!1}let Vt={[oo]:s.FUNC_ADD,[c_]:s.FUNC_SUBTRACT,[h_]:s.FUNC_REVERSE_SUBTRACT};Vt[u_]=s.MIN,Vt[f_]=s.MAX;let Ct={[d_]:s.ZERO,[p_]:s.ONE,[m_]:s.SRC_COLOR,[Cp]:s.SRC_ALPHA,[S_]:s.SRC_ALPHA_SATURATE,[x_]:s.DST_COLOR,[__]:s.DST_ALPHA,[g_]:s.ONE_MINUS_SRC_COLOR,[Rp]:s.ONE_MINUS_SRC_ALPHA,[y_]:s.ONE_MINUS_DST_COLOR,[v_]:s.ONE_MINUS_DST_ALPHA,[M_]:s.CONSTANT_COLOR,[b_]:s.ONE_MINUS_CONSTANT_COLOR,[w_]:s.CONSTANT_ALPHA,[T_]:s.ONE_MINUS_CONSTANT_ALPHA};function Xt(U,gt,st,St,wt,lt,dt,ct,Ht,ut){if(U===Kn){g===!0&&(ot(s.BLEND),g=!1);return}if(g===!1&&(J(s.BLEND),g=!0),U!==l_){if(U!==_||ut!==C){if((y!==oo||b!==oo)&&(s.blendEquation(s.FUNC_ADD),y=oo,b=oo),ut)switch(U){case Ta:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case wn:s.blendFunc(s.ONE,s.ONE);break;case Ep:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ap:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:$t("WebGLState: Invalid blending: ",U);break}else switch(U){case Ta:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case wn:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Ep:$t("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ap:$t("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:$t("WebGLState: Invalid blending: ",U);break}E=null,x=null,M=null,T=null,v.set(0,0,0),w=0,_=U,C=ut}return}wt=wt||gt,lt=lt||st,dt=dt||St,(gt!==y||wt!==b)&&(s.blendEquationSeparate(Vt[gt],Vt[wt]),y=gt,b=wt),(st!==E||St!==x||lt!==M||dt!==T)&&(s.blendFuncSeparate(Ct[st],Ct[St],Ct[lt],Ct[dt]),E=st,x=St,M=lt,T=dt),(ct.equals(v)===!1||Ht!==w)&&(s.blendColor(ct.r,ct.g,ct.b,Ht),v.copy(ct),w=Ht),_=U,C=!1}function te(U,gt){U.side===bn?ot(s.CULL_FACE):J(s.CULL_FACE);let st=U.side===li;gt&&(st=!st),W(st),U.blending===Ta&&U.transparent===!1?Xt(Kn):Xt(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);let St=U.stencilWrite;a.setTest(St),St&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Ze(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?J(s.SAMPLE_ALPHA_TO_COVERAGE):ot(s.SAMPLE_ALPHA_TO_COVERAGE)}function W(U){D!==U&&(U?s.frontFace(s.CW):s.frontFace(s.CCW),D=U)}function he(U){U!==o_?(J(s.CULL_FACE),U!==I&&(U===Tp?s.cullFace(s.BACK):U===a_?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ot(s.CULL_FACE),I=U}function De(U){U!==O&&(z&&s.lineWidth(U),O=U)}function Ze(U,gt,st){U?(J(s.POLYGON_OFFSET_FILL),(L!==gt||B!==st)&&(L=gt,B=st,o.getReversed()&&(gt=-gt),s.polygonOffset(gt,st))):ot(s.POLYGON_OFFSET_FILL)}function ee(U){U?J(s.SCISSOR_TEST):ot(s.SCISSOR_TEST)}function Ee(U){U===void 0&&(U=s.TEXTURE0+V-1),R!==U&&(s.activeTexture(U),R=U)}function k(U,gt,st){st===void 0&&(R===null?st=s.TEXTURE0+V-1:st=R);let St=tt[st];St===void 0&&(St={type:void 0,texture:void 0},tt[st]=St),(St.type!==U||St.texture!==gt)&&(R!==st&&(s.activeTexture(st),R=st),s.bindTexture(U,gt||G[U]),St.type=U,St.texture=gt)}function Xe(){let U=tt[R];U!==void 0&&U.type!==void 0&&(s.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function jt(){try{s.compressedTexImage2D(...arguments)}catch(U){$t("WebGLState:",U)}}function P(){try{s.compressedTexImage3D(...arguments)}catch(U){$t("WebGLState:",U)}}function S(){try{s.texSubImage2D(...arguments)}catch(U){$t("WebGLState:",U)}}function H(){try{s.texSubImage3D(...arguments)}catch(U){$t("WebGLState:",U)}}function Y(){try{s.compressedTexSubImage2D(...arguments)}catch(U){$t("WebGLState:",U)}}function Q(){try{s.compressedTexSubImage3D(...arguments)}catch(U){$t("WebGLState:",U)}}function mt(){try{s.texStorage2D(...arguments)}catch(U){$t("WebGLState:",U)}}function ft(){try{s.texStorage3D(...arguments)}catch(U){$t("WebGLState:",U)}}function et(){try{s.texImage2D(...arguments)}catch(U){$t("WebGLState:",U)}}function rt(){try{s.texImage3D(...arguments)}catch(U){$t("WebGLState:",U)}}function xt(U){return f[U]!==void 0?f[U]:s.getParameter(U)}function Lt(U,gt){f[U]!==gt&&(s.pixelStorei(U,gt),f[U]=gt)}function yt(U){j.equals(U)===!1&&(s.scissor(U.x,U.y,U.z,U.w),j.copy(U))}function vt(U){ht.equals(U)===!1&&(s.viewport(U.x,U.y,U.z,U.w),ht.copy(U))}function pt(U,gt){let st=c.get(gt);st===void 0&&(st=new WeakMap,c.set(gt,st));let St=st.get(U);St===void 0&&(St=s.getUniformBlockIndex(gt,U.name),st.set(U,St))}function Bt(U,gt){let St=c.get(gt).get(U);l.get(gt)!==St&&(s.uniformBlockBinding(gt,St,U.__bindingPointIndex),l.set(gt,St))}function Yt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},f={},R=null,tt={},u={},d=new WeakMap,p=[],m=null,g=!1,_=null,y=null,E=null,x=null,b=null,M=null,T=null,v=new Wt(0,0,0),w=0,C=!1,D=null,I=null,O=null,L=null,B=null,j.set(0,0,s.canvas.width,s.canvas.height),ht.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:J,disable:ot,bindFramebuffer:Dt,drawBuffers:_t,useProgram:zt,setBlending:Xt,setMaterial:te,setFlipSided:W,setCullFace:he,setLineWidth:De,setPolygonOffset:Ze,setScissorTest:ee,activeTexture:Ee,bindTexture:k,unbindTexture:Xe,compressedTexImage2D:jt,compressedTexImage3D:P,texImage2D:et,texImage3D:rt,pixelStorei:Lt,getParameter:xt,updateUBOMapping:pt,uniformBlockBinding:Bt,texStorage2D:mt,texStorage3D:ft,texSubImage2D:S,texSubImage3D:H,compressedTexSubImage2D:Y,compressedTexSubImage3D:Q,scissor:yt,viewport:vt,reset:Yt}}function iE(s,t,e,i,n,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Tt,h=new WeakMap,f=new Set,u,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(P,S){return p?new OffscreenCanvas(P,S):Rl("canvas")}function g(P,S,H){let Y=1,Q=jt(P);if((Q.width>H||Q.height>H)&&(Y=H/Math.max(Q.width,Q.height)),Y<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let mt=Math.floor(Y*Q.width),ft=Math.floor(Y*Q.height);u===void 0&&(u=m(mt,ft));let et=S?m(mt,ft):u;return et.width=mt,et.height=ft,et.getContext("2d").drawImage(P,0,0,mt,ft),Zt("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+mt+"x"+ft+")."),et}else return"data"in P&&Zt("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),P;return P}function _(P){return P.generateMipmaps}function y(P){s.generateMipmap(P)}function E(P){return P.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?s.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function x(P,S,H,Y,Q,mt=!1){if(P!==null){if(s[P]!==void 0)return s[P];Zt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ft;Y&&(ft=t.get("EXT_texture_norm16"),ft||Zt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let et=S;if(S===s.RED&&(H===s.FLOAT&&(et=s.R32F),H===s.HALF_FLOAT&&(et=s.R16F),H===s.UNSIGNED_BYTE&&(et=s.R8),H===s.UNSIGNED_SHORT&&ft&&(et=ft.R16_EXT),H===s.SHORT&&ft&&(et=ft.R16_SNORM_EXT)),S===s.RED_INTEGER&&(H===s.UNSIGNED_BYTE&&(et=s.R8UI),H===s.UNSIGNED_SHORT&&(et=s.R16UI),H===s.UNSIGNED_INT&&(et=s.R32UI),H===s.BYTE&&(et=s.R8I),H===s.SHORT&&(et=s.R16I),H===s.INT&&(et=s.R32I)),S===s.RG&&(H===s.FLOAT&&(et=s.RG32F),H===s.HALF_FLOAT&&(et=s.RG16F),H===s.UNSIGNED_BYTE&&(et=s.RG8),H===s.UNSIGNED_SHORT&&ft&&(et=ft.RG16_EXT),H===s.SHORT&&ft&&(et=ft.RG16_SNORM_EXT)),S===s.RG_INTEGER&&(H===s.UNSIGNED_BYTE&&(et=s.RG8UI),H===s.UNSIGNED_SHORT&&(et=s.RG16UI),H===s.UNSIGNED_INT&&(et=s.RG32UI),H===s.BYTE&&(et=s.RG8I),H===s.SHORT&&(et=s.RG16I),H===s.INT&&(et=s.RG32I)),S===s.RGB_INTEGER&&(H===s.UNSIGNED_BYTE&&(et=s.RGB8UI),H===s.UNSIGNED_SHORT&&(et=s.RGB16UI),H===s.UNSIGNED_INT&&(et=s.RGB32UI),H===s.BYTE&&(et=s.RGB8I),H===s.SHORT&&(et=s.RGB16I),H===s.INT&&(et=s.RGB32I)),S===s.RGBA_INTEGER&&(H===s.UNSIGNED_BYTE&&(et=s.RGBA8UI),H===s.UNSIGNED_SHORT&&(et=s.RGBA16UI),H===s.UNSIGNED_INT&&(et=s.RGBA32UI),H===s.BYTE&&(et=s.RGBA8I),H===s.SHORT&&(et=s.RGBA16I),H===s.INT&&(et=s.RGBA32I)),S===s.RGB&&(H===s.UNSIGNED_SHORT&&ft&&(et=ft.RGB16_EXT),H===s.SHORT&&ft&&(et=ft.RGB16_SNORM_EXT),H===s.UNSIGNED_INT_5_9_9_9_REV&&(et=s.RGB9_E5),H===s.UNSIGNED_INT_10F_11F_11F_REV&&(et=s.R11F_G11F_B10F)),S===s.RGBA){let rt=mt?Cl:de.getTransfer(Q);H===s.FLOAT&&(et=s.RGBA32F),H===s.HALF_FLOAT&&(et=s.RGBA16F),H===s.UNSIGNED_BYTE&&(et=rt===Te?s.SRGB8_ALPHA8:s.RGBA8),H===s.UNSIGNED_SHORT&&ft&&(et=ft.RGBA16_EXT),H===s.SHORT&&ft&&(et=ft.RGBA16_SNORM_EXT),H===s.UNSIGNED_SHORT_4_4_4_4&&(et=s.RGBA4),H===s.UNSIGNED_SHORT_5_5_5_1&&(et=s.RGB5_A1)}return(et===s.R16F||et===s.R32F||et===s.RG16F||et===s.RG32F||et===s.RGBA16F||et===s.RGBA32F)&&t.get("EXT_color_buffer_float"),et}function b(P,S){let H;return P?S===null||S===us||S===Aa?H=s.DEPTH24_STENCIL8:S===Jn?H=s.DEPTH32F_STENCIL8:S===Ea&&(H=s.DEPTH24_STENCIL8,Zt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===us||S===Aa?H=s.DEPTH_COMPONENT24:S===Jn?H=s.DEPTH_COMPONENT32F:S===Ea&&(H=s.DEPTH_COMPONENT16),H}function M(P,S){return _(P)===!0||P.isFramebufferTexture&&P.minFilter!==Di&&P.minFilter!==Oi?Math.log2(Math.max(S.width,S.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?S.mipmaps.length:1}function T(P){let S=P.target;S.removeEventListener("dispose",T),w(S),S.isVideoTexture&&h.delete(S),S.isHTMLTexture&&f.delete(S)}function v(P){let S=P.target;S.removeEventListener("dispose",v),D(S)}function w(P){let S=i.get(P);if(S.__webglInit===void 0)return;let H=P.source,Y=d.get(H);if(Y){let Q=Y[S.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&C(P),Object.keys(Y).length===0&&d.delete(H)}i.remove(P)}function C(P){let S=i.get(P);s.deleteTexture(S.__webglTexture);let H=P.source,Y=d.get(H);delete Y[S.__cacheKey],o.memory.textures--}function D(P){let S=i.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),i.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(S.__webglFramebuffer[Y]))for(let Q=0;Q<S.__webglFramebuffer[Y].length;Q++)s.deleteFramebuffer(S.__webglFramebuffer[Y][Q]);else s.deleteFramebuffer(S.__webglFramebuffer[Y]);S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer[Y])}else{if(Array.isArray(S.__webglFramebuffer))for(let Y=0;Y<S.__webglFramebuffer.length;Y++)s.deleteFramebuffer(S.__webglFramebuffer[Y]);else s.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&s.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let Y=0;Y<S.__webglColorRenderbuffer.length;Y++)S.__webglColorRenderbuffer[Y]&&s.deleteRenderbuffer(S.__webglColorRenderbuffer[Y]);S.__webglDepthRenderbuffer&&s.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let H=P.textures;for(let Y=0,Q=H.length;Y<Q;Y++){let mt=i.get(H[Y]);mt.__webglTexture&&(s.deleteTexture(mt.__webglTexture),o.memory.textures--),i.remove(H[Y])}i.remove(P)}let I=0;function O(){I=0}function L(){return I}function B(P){I=P}function V(){let P=I;return P>=n.maxTextures&&Zt("WebGLTextures: Trying to use "+(P+1)+" texture units while this GPU supports only "+n.maxTextures),I+=1,P}function z(P){let S=[];return S.push(P.wrapS),S.push(P.wrapT),S.push(P.wrapR||0),S.push(P.magFilter),S.push(P.minFilter),S.push(P.anisotropy),S.push(P.internalFormat),S.push(P.format),S.push(P.type),S.push(P.generateMipmaps),S.push(P.premultiplyAlpha),S.push(P.flipY),S.push(P.unpackAlignment),S.push(P.colorSpace),S.join()}function $(P,S){let H=i.get(P);if(P.isVideoTexture&&k(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&H.__version!==P.version){let Y=P.image;if(Y===null)Zt("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Zt("WebGLRenderer: Texture marked for update but image is incomplete");else{ot(H,P,S);return}}else P.isExternalTexture&&(H.__webglTexture=P.sourceTexture?P.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,H.__webglTexture,s.TEXTURE0+S)}function Z(P,S){let H=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&H.__version!==P.version){ot(H,P,S);return}else P.isExternalTexture&&(H.__webglTexture=P.sourceTexture?P.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,H.__webglTexture,s.TEXTURE0+S)}function R(P,S){let H=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&H.__version!==P.version){ot(H,P,S);return}e.bindTexture(s.TEXTURE_3D,H.__webglTexture,s.TEXTURE0+S)}function tt(P,S){let H=i.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&H.__version!==P.version){Dt(H,P,S);return}e.bindTexture(s.TEXTURE_CUBE_MAP,H.__webglTexture,s.TEXTURE0+S)}let it={[Wh]:s.REPEAT,[bs]:s.CLAMP_TO_EDGE,[Xh]:s.MIRRORED_REPEAT},at={[Di]:s.NEAREST,[C_]:s.NEAREST_MIPMAP_NEAREST,[sc]:s.NEAREST_MIPMAP_LINEAR,[Oi]:s.LINEAR,[yu]:s.LINEAR_MIPMAP_NEAREST,[Cs]:s.LINEAR_MIPMAP_LINEAR},j={[L_]:s.NEVER,[O_]:s.ALWAYS,[D_]:s.LESS,[rf]:s.LEQUAL,[N_]:s.EQUAL,[of]:s.GEQUAL,[U_]:s.GREATER,[F_]:s.NOTEQUAL};function ht(P,S){if(S.type===Jn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===Oi||S.magFilter===yu||S.magFilter===sc||S.magFilter===Cs||S.minFilter===Oi||S.minFilter===yu||S.minFilter===sc||S.minFilter===Cs)&&Zt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(P,s.TEXTURE_WRAP_S,it[S.wrapS]),s.texParameteri(P,s.TEXTURE_WRAP_T,it[S.wrapT]),(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)&&s.texParameteri(P,s.TEXTURE_WRAP_R,it[S.wrapR]),s.texParameteri(P,s.TEXTURE_MAG_FILTER,at[S.magFilter]),s.texParameteri(P,s.TEXTURE_MIN_FILTER,at[S.minFilter]),S.compareFunction&&(s.texParameteri(P,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(P,s.TEXTURE_COMPARE_FUNC,j[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Di||S.minFilter!==sc&&S.minFilter!==Cs||S.type===Jn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){let H=t.get("EXT_texture_filter_anisotropic");s.texParameterf(P,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,n.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function bt(P,S){let H=!1;P.__webglInit===void 0&&(P.__webglInit=!0,S.addEventListener("dispose",T));let Y=S.source,Q=d.get(Y);Q===void 0&&(Q={},d.set(Y,Q));let mt=z(S);if(mt!==P.__cacheKey){Q[mt]===void 0&&(Q[mt]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,H=!0),Q[mt].usedTimes++;let ft=Q[P.__cacheKey];ft!==void 0&&(Q[P.__cacheKey].usedTimes--,ft.usedTimes===0&&C(S)),P.__cacheKey=mt,P.__webglTexture=Q[mt].texture}return H}function G(P,S,H){return Math.floor(Math.floor(P/H)/S)}function J(P,S,H,Y){let mt=P.updateRanges;if(mt.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,S.width,S.height,H,Y,S.data);else{mt.sort((Lt,yt)=>Lt.start-yt.start);let ft=0;for(let Lt=1;Lt<mt.length;Lt++){let yt=mt[ft],vt=mt[Lt],pt=yt.start+yt.count,Bt=G(vt.start,S.width,4),Yt=G(yt.start,S.width,4);vt.start<=pt+1&&Bt===Yt&&G(vt.start+vt.count-1,S.width,4)===Bt?yt.count=Math.max(yt.count,vt.start+vt.count-yt.start):(++ft,mt[ft]=vt)}mt.length=ft+1;let et=e.getParameter(s.UNPACK_ROW_LENGTH),rt=e.getParameter(s.UNPACK_SKIP_PIXELS),xt=e.getParameter(s.UNPACK_SKIP_ROWS);e.pixelStorei(s.UNPACK_ROW_LENGTH,S.width);for(let Lt=0,yt=mt.length;Lt<yt;Lt++){let vt=mt[Lt],pt=Math.floor(vt.start/4),Bt=Math.ceil(vt.count/4),Yt=pt%S.width,U=Math.floor(pt/S.width),gt=Bt,st=1;e.pixelStorei(s.UNPACK_SKIP_PIXELS,Yt),e.pixelStorei(s.UNPACK_SKIP_ROWS,U),e.texSubImage2D(s.TEXTURE_2D,0,Yt,U,gt,st,H,Y,S.data)}P.clearUpdateRanges(),e.pixelStorei(s.UNPACK_ROW_LENGTH,et),e.pixelStorei(s.UNPACK_SKIP_PIXELS,rt),e.pixelStorei(s.UNPACK_SKIP_ROWS,xt)}}function ot(P,S,H){let Y=s.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Y=s.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Y=s.TEXTURE_3D);let Q=bt(P,S),mt=S.source;e.bindTexture(Y,P.__webglTexture,s.TEXTURE0+H);let ft=i.get(mt);if(mt.version!==ft.__version||Q===!0){if(e.activeTexture(s.TEXTURE0+H),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){let st=de.getPrimaries(de.workingColorSpace),St=S.colorSpace===Ks?null:de.getPrimaries(S.colorSpace),wt=S.colorSpace===Ks||st===St?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt)}e.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment);let rt=g(S.image,!1,n.maxTextureSize);rt=Xe(S,rt);let xt=r.convert(S.format,S.colorSpace),Lt=r.convert(S.type),yt=x(S.internalFormat,xt,Lt,S.normalized,S.colorSpace,S.isVideoTexture);ht(Y,S);let vt,pt=S.mipmaps,Bt=S.isVideoTexture!==!0,Yt=ft.__version===void 0||Q===!0,U=mt.dataReady,gt=M(S,rt);if(S.isDepthTexture)yt=b(S.format===Rr,S.type),Yt&&(Bt?e.texStorage2D(s.TEXTURE_2D,1,yt,rt.width,rt.height):e.texImage2D(s.TEXTURE_2D,0,yt,rt.width,rt.height,0,xt,Lt,null));else if(S.isDataTexture)if(pt.length>0){Bt&&Yt&&e.texStorage2D(s.TEXTURE_2D,gt,yt,pt[0].width,pt[0].height);for(let st=0,St=pt.length;st<St;st++)vt=pt[st],Bt?U&&e.texSubImage2D(s.TEXTURE_2D,st,0,0,vt.width,vt.height,xt,Lt,vt.data):e.texImage2D(s.TEXTURE_2D,st,yt,vt.width,vt.height,0,xt,Lt,vt.data);S.generateMipmaps=!1}else Bt?(Yt&&e.texStorage2D(s.TEXTURE_2D,gt,yt,rt.width,rt.height),U&&J(S,rt,xt,Lt)):e.texImage2D(s.TEXTURE_2D,0,yt,rt.width,rt.height,0,xt,Lt,rt.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Bt&&Yt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,gt,yt,pt[0].width,pt[0].height,rt.depth);for(let st=0,St=pt.length;st<St;st++)if(vt=pt[st],S.format!==$n)if(xt!==null)if(Bt){if(U)if(S.layerUpdates.size>0){let wt=Wp(vt.width,vt.height,S.format,S.type);for(let lt of S.layerUpdates){let dt=vt.data.subarray(lt*wt/vt.data.BYTES_PER_ELEMENT,(lt+1)*wt/vt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,st,0,0,lt,vt.width,vt.height,1,xt,dt)}}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,st,0,0,0,vt.width,vt.height,rt.depth,xt,vt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,st,yt,vt.width,vt.height,rt.depth,0,vt.data,0,0);else Zt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Bt?U&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,st,0,0,0,vt.width,vt.height,rt.depth,xt,Lt,vt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,st,yt,vt.width,vt.height,rt.depth,0,xt,Lt,vt.data);S.layerUpdates.size>0&&S.clearLayerUpdates()}else{Bt&&Yt&&e.texStorage2D(s.TEXTURE_2D,gt,yt,pt[0].width,pt[0].height);for(let st=0,St=pt.length;st<St;st++)vt=pt[st],S.format!==$n?xt!==null?Bt?U&&e.compressedTexSubImage2D(s.TEXTURE_2D,st,0,0,vt.width,vt.height,xt,vt.data):e.compressedTexImage2D(s.TEXTURE_2D,st,yt,vt.width,vt.height,0,vt.data):Zt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Bt?U&&e.texSubImage2D(s.TEXTURE_2D,st,0,0,vt.width,vt.height,xt,Lt,vt.data):e.texImage2D(s.TEXTURE_2D,st,yt,vt.width,vt.height,0,xt,Lt,vt.data)}else if(S.isDataArrayTexture)if(Bt){if(Yt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,gt,yt,rt.width,rt.height,rt.depth),U)if(S.layerUpdates.size>0){let st=Wp(rt.width,rt.height,S.format,S.type);for(let St of S.layerUpdates){let wt=rt.data.subarray(St*st/rt.data.BYTES_PER_ELEMENT,(St+1)*st/rt.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,St,rt.width,rt.height,1,xt,Lt,wt)}S.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,rt.width,rt.height,rt.depth,xt,Lt,rt.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,yt,rt.width,rt.height,rt.depth,0,xt,Lt,rt.data);else if(S.isData3DTexture)Bt?(Yt&&e.texStorage3D(s.TEXTURE_3D,gt,yt,rt.width,rt.height,rt.depth),U&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,rt.width,rt.height,rt.depth,xt,Lt,rt.data)):e.texImage3D(s.TEXTURE_3D,0,yt,rt.width,rt.height,rt.depth,0,xt,Lt,rt.data);else if(S.isFramebufferTexture){if(Yt)if(Bt)e.texStorage2D(s.TEXTURE_2D,gt,yt,rt.width,rt.height);else{let st=rt.width,St=rt.height;for(let wt=0;wt<gt;wt++)e.texImage2D(s.TEXTURE_2D,wt,yt,st,St,0,xt,Lt,null),st>>=1,St>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in s){let st=s.canvas;if(st.hasAttribute("layoutsubtree")||st.setAttribute("layoutsubtree","true"),rt.parentNode!==st){st.appendChild(rt),f.add(S),st.onpaint=St=>{let wt=St.changedElements;for(let lt of f)wt.includes(lt.image)&&(lt.needsUpdate=!0)},st.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,rt);else{let wt=s.RGBA,lt=s.RGBA,dt=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,wt,lt,dt,rt)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(pt.length>0){if(Bt&&Yt){let st=jt(pt[0]);e.texStorage2D(s.TEXTURE_2D,gt,yt,st.width,st.height)}for(let st=0,St=pt.length;st<St;st++)vt=pt[st],Bt?U&&e.texSubImage2D(s.TEXTURE_2D,st,0,0,xt,Lt,vt):e.texImage2D(s.TEXTURE_2D,st,yt,xt,Lt,vt);S.generateMipmaps=!1}else if(Bt){if(Yt){let st=jt(rt);e.texStorage2D(s.TEXTURE_2D,gt,yt,st.width,st.height)}U&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,xt,Lt,rt)}else e.texImage2D(s.TEXTURE_2D,0,yt,xt,Lt,rt);_(S)&&y(Y),ft.__version=mt.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function Dt(P,S,H){if(S.image.length!==6)return;let Y=bt(P,S),Q=S.source;e.bindTexture(s.TEXTURE_CUBE_MAP,P.__webglTexture,s.TEXTURE0+H);let mt=i.get(Q);if(Q.version!==mt.__version||Y===!0){e.activeTexture(s.TEXTURE0+H);let ft=de.getPrimaries(de.workingColorSpace),et=S.colorSpace===Ks?null:de.getPrimaries(S.colorSpace),rt=S.colorSpace===Ks||ft===et?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),e.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,rt);let xt=S.isCompressedTexture||S.image[0].isCompressedTexture,Lt=S.image[0]&&S.image[0].isDataTexture,yt=[];for(let lt=0;lt<6;lt++)!xt&&!Lt?yt[lt]=g(S.image[lt],!0,n.maxCubemapSize):yt[lt]=Lt?S.image[lt].image:S.image[lt],yt[lt]=Xe(S,yt[lt]);let vt=yt[0],pt=r.convert(S.format,S.colorSpace),Bt=r.convert(S.type),Yt=x(S.internalFormat,pt,Bt,S.normalized,S.colorSpace),U=S.isVideoTexture!==!0,gt=mt.__version===void 0||Y===!0,st=Q.dataReady,St=M(S,vt);ht(s.TEXTURE_CUBE_MAP,S);let wt;if(xt){U&&gt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,St,Yt,vt.width,vt.height);for(let lt=0;lt<6;lt++){wt=yt[lt].mipmaps;for(let dt=0;dt<wt.length;dt++){let ct=wt[dt];S.format!==$n?pt!==null?U?st&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+lt,dt,0,0,ct.width,ct.height,pt,ct.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+lt,dt,Yt,ct.width,ct.height,0,ct.data):Zt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?st&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+lt,dt,0,0,ct.width,ct.height,pt,Bt,ct.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+lt,dt,Yt,ct.width,ct.height,0,pt,Bt,ct.data)}}}else{if(wt=S.mipmaps,U&&gt){wt.length>0&&St++;let lt=jt(yt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,St,Yt,lt.width,lt.height)}for(let lt=0;lt<6;lt++)if(Lt){U?st&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,0,0,yt[lt].width,yt[lt].height,pt,Bt,yt[lt].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,Yt,yt[lt].width,yt[lt].height,0,pt,Bt,yt[lt].data);for(let dt=0;dt<wt.length;dt++){let Ht=wt[dt].image[lt].image;U?st&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+lt,dt+1,0,0,Ht.width,Ht.height,pt,Bt,Ht.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+lt,dt+1,Yt,Ht.width,Ht.height,0,pt,Bt,Ht.data)}}else{U?st&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,0,0,pt,Bt,yt[lt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,Yt,pt,Bt,yt[lt]);for(let dt=0;dt<wt.length;dt++){let ct=wt[dt];U?st&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+lt,dt+1,0,0,pt,Bt,ct.image[lt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+lt,dt+1,Yt,pt,Bt,ct.image[lt])}}}_(S)&&y(s.TEXTURE_CUBE_MAP),mt.__version=Q.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function _t(P,S,H,Y,Q,mt){let ft=r.convert(H.format,H.colorSpace),et=r.convert(H.type),rt=x(H.internalFormat,ft,et,H.normalized,H.colorSpace),xt=i.get(S),Lt=i.get(H);if(Lt.__renderTarget=S,!xt.__hasExternalTextures){let yt=Math.max(1,S.width>>mt),vt=Math.max(1,S.height>>mt);Q===s.TEXTURE_3D||Q===s.TEXTURE_2D_ARRAY?e.texImage3D(Q,mt,rt,yt,vt,S.depth,0,ft,et,null):e.texImage2D(Q,mt,rt,yt,vt,0,ft,et,null)}e.bindFramebuffer(s.FRAMEBUFFER,P),Ee(S)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Y,Q,Lt.__webglTexture,0,ee(S)):(Q===s.TEXTURE_2D||Q>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,Y,Q,Lt.__webglTexture,mt),e.bindFramebuffer(s.FRAMEBUFFER,null)}function zt(P,S,H){if(s.bindRenderbuffer(s.RENDERBUFFER,P),S.depthBuffer){let Y=S.depthTexture,Q=Y&&Y.isDepthTexture?Y.type:null,mt=b(S.stencilBuffer,Q),ft=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;Ee(S)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ee(S),mt,S.width,S.height):H?s.renderbufferStorageMultisample(s.RENDERBUFFER,ee(S),mt,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,mt,S.width,S.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,ft,s.RENDERBUFFER,P)}else{let Y=S.textures;for(let Q=0;Q<Y.length;Q++){let mt=Y[Q],ft=r.convert(mt.format,mt.colorSpace),et=r.convert(mt.type),rt=x(mt.internalFormat,ft,et,mt.normalized,mt.colorSpace);Ee(S)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ee(S),rt,S.width,S.height):H?s.renderbufferStorageMultisample(s.RENDERBUFFER,ee(S),rt,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,rt,S.width,S.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Vt(P,S,H){let Y=S.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(s.FRAMEBUFFER,P),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Q=i.get(S.depthTexture);if(Q.__renderTarget=S,(!Q.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),Y){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,S.depthTexture.addEventListener("dispose",T)),Q.__webglTexture===void 0){Q.__webglTexture=s.createTexture(),e.bindTexture(s.TEXTURE_CUBE_MAP,Q.__webglTexture),ht(s.TEXTURE_CUBE_MAP,S.depthTexture);let xt=r.convert(S.depthTexture.format),Lt=r.convert(S.depthTexture.type),yt;S.depthTexture.format===ws?yt=s.DEPTH_COMPONENT24:S.depthTexture.format===Rr&&(yt=s.DEPTH24_STENCIL8);for(let vt=0;vt<6;vt++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,yt,S.width,S.height,0,xt,Lt,null)}}else $(S.depthTexture,0);let mt=Q.__webglTexture,ft=ee(S),et=Y?s.TEXTURE_CUBE_MAP_POSITIVE_X+H:s.TEXTURE_2D,rt=S.depthTexture.format===Rr?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(S.depthTexture.format===ws)Ee(S)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,rt,et,mt,0,ft):s.framebufferTexture2D(s.FRAMEBUFFER,rt,et,mt,0);else if(S.depthTexture.format===Rr)Ee(S)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,rt,et,mt,0,ft):s.framebufferTexture2D(s.FRAMEBUFFER,rt,et,mt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ct(P){let S=i.get(P),H=P.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==P.depthTexture){let Y=P.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),Y){let Q=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,Y.removeEventListener("dispose",Q)};Y.addEventListener("dispose",Q),S.__depthDisposeCallback=Q}S.__boundDepthTexture=Y}if(P.depthTexture&&!S.__autoAllocateDepthBuffer)if(H)for(let Y=0;Y<6;Y++)Vt(S.__webglFramebuffer[Y],P,Y);else{let Y=P.texture.mipmaps;Y&&Y.length>0?Vt(S.__webglFramebuffer[0],P,0):Vt(S.__webglFramebuffer,P,0)}else if(H){S.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(e.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[Y]),S.__webglDepthbuffer[Y]===void 0)S.__webglDepthbuffer[Y]=s.createRenderbuffer(),zt(S.__webglDepthbuffer[Y],P,!1);else{let Q=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,mt=S.__webglDepthbuffer[Y];s.bindRenderbuffer(s.RENDERBUFFER,mt),s.framebufferRenderbuffer(s.FRAMEBUFFER,Q,s.RENDERBUFFER,mt)}}else{let Y=P.texture.mipmaps;if(Y&&Y.length>0?e.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=s.createRenderbuffer(),zt(S.__webglDepthbuffer,P,!1);else{let Q=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,mt=S.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,mt),s.framebufferRenderbuffer(s.FRAMEBUFFER,Q,s.RENDERBUFFER,mt)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Xt(P,S,H){let Y=i.get(P);S!==void 0&&_t(Y.__webglFramebuffer,P,P.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),H!==void 0&&Ct(P)}function te(P){let S=P.texture,H=i.get(P),Y=i.get(S);P.addEventListener("dispose",v);let Q=P.textures,mt=P.isWebGLCubeRenderTarget===!0,ft=Q.length>1;if(ft||(Y.__webglTexture===void 0&&(Y.__webglTexture=s.createTexture()),Y.__version=S.version,o.memory.textures++),mt){H.__webglFramebuffer=[];for(let et=0;et<6;et++)if(S.mipmaps&&S.mipmaps.length>0){H.__webglFramebuffer[et]=[];for(let rt=0;rt<S.mipmaps.length;rt++)H.__webglFramebuffer[et][rt]=s.createFramebuffer()}else H.__webglFramebuffer[et]=s.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){H.__webglFramebuffer=[];for(let et=0;et<S.mipmaps.length;et++)H.__webglFramebuffer[et]=s.createFramebuffer()}else H.__webglFramebuffer=s.createFramebuffer();if(ft)for(let et=0,rt=Q.length;et<rt;et++){let xt=i.get(Q[et]);xt.__webglTexture===void 0&&(xt.__webglTexture=s.createTexture(),o.memory.textures++)}if(P.samples>0&&Ee(P)===!1){H.__webglMultisampledFramebuffer=s.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let et=0;et<Q.length;et++){let rt=Q[et];H.__webglColorRenderbuffer[et]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,H.__webglColorRenderbuffer[et]);let xt=r.convert(rt.format,rt.colorSpace),Lt=r.convert(rt.type),yt=x(rt.internalFormat,xt,Lt,rt.normalized,rt.colorSpace,P.isXRRenderTarget===!0),vt=ee(P);s.renderbufferStorageMultisample(s.RENDERBUFFER,vt,yt,P.width,P.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+et,s.RENDERBUFFER,H.__webglColorRenderbuffer[et])}s.bindRenderbuffer(s.RENDERBUFFER,null),P.depthBuffer&&(H.__webglDepthRenderbuffer=s.createRenderbuffer(),zt(H.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(mt){e.bindTexture(s.TEXTURE_CUBE_MAP,Y.__webglTexture),ht(s.TEXTURE_CUBE_MAP,S);for(let et=0;et<6;et++)if(S.mipmaps&&S.mipmaps.length>0)for(let rt=0;rt<S.mipmaps.length;rt++)_t(H.__webglFramebuffer[et][rt],P,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+et,rt);else _t(H.__webglFramebuffer[et],P,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+et,0);_(S)&&y(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ft){for(let et=0,rt=Q.length;et<rt;et++){let xt=Q[et],Lt=i.get(xt),yt=s.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(yt=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(yt,Lt.__webglTexture),ht(yt,xt),_t(H.__webglFramebuffer,P,xt,s.COLOR_ATTACHMENT0+et,yt,0),_(xt)&&y(yt)}e.unbindTexture()}else{let et=s.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(et=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(et,Y.__webglTexture),ht(et,S),S.mipmaps&&S.mipmaps.length>0)for(let rt=0;rt<S.mipmaps.length;rt++)_t(H.__webglFramebuffer[rt],P,S,s.COLOR_ATTACHMENT0,et,rt);else _t(H.__webglFramebuffer,P,S,s.COLOR_ATTACHMENT0,et,0);_(S)&&y(et),e.unbindTexture()}P.depthBuffer&&Ct(P)}function W(P){let S=P.textures;for(let H=0,Y=S.length;H<Y;H++){let Q=S[H];if(_(Q)){let mt=E(P),ft=i.get(Q).__webglTexture;e.bindTexture(mt,ft),y(mt),e.unbindTexture()}}}let he=[],De=[];function Ze(P){if(P.samples>0){if(Ee(P)===!1){let S=P.textures,H=P.width,Y=P.height,Q=s.COLOR_BUFFER_BIT,mt=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ft=i.get(P),et=S.length>1;if(et)for(let xt=0;xt<S.length;xt++)e.bindFramebuffer(s.FRAMEBUFFER,ft.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,ft.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,ft.__webglMultisampledFramebuffer);let rt=P.texture.mipmaps;rt&&rt.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ft.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ft.__webglFramebuffer);for(let xt=0;xt<S.length;xt++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(Q|=s.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(Q|=s.STENCIL_BUFFER_BIT)),et){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,ft.__webglColorRenderbuffer[xt]);let Lt=i.get(S[xt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Lt,0)}s.blitFramebuffer(0,0,H,Y,0,0,H,Y,Q,s.NEAREST),l===!0&&(he.length=0,De.length=0,he.push(s.COLOR_ATTACHMENT0+xt),P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&(he.push(mt),De.push(mt),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,De)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,he))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),et)for(let xt=0;xt<S.length;xt++){e.bindFramebuffer(s.FRAMEBUFFER,ft.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.RENDERBUFFER,ft.__webglColorRenderbuffer[xt]);let Lt=i.get(S[xt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,ft.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.TEXTURE_2D,Lt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ft.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&l){let S=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[S])}}}function ee(P){return Math.min(n.maxSamples,P.samples)}function Ee(P){let S=i.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function k(P){let S=o.render.frame;h.get(P)!==S&&(h.set(P,S),P.update())}function Xe(P,S){let H=P.colorSpace,Y=P.format,Q=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||H!==Al&&H!==Ks&&(de.getTransfer(H)===Te?(Y!==$n||Q!==Tn)&&Zt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):$t("WebGLTextures: Unsupported texture color space:",H)),S}function jt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=O,this.getTextureUnits=L,this.setTextureUnits=B,this.setTexture2D=$,this.setTexture2DArray=Z,this.setTexture3D=R,this.setTextureCube=tt,this.rebindTextures=Xt,this.setupRenderTarget=te,this.updateRenderTargetMipmap=W,this.updateMultisampleRenderTarget=Ze,this.setupDepthRenderbuffer=Ct,this.setupFrameBufferTexture=_t,this.useMultisampledRTT=Ee,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function nE(s,t){function e(i,n=Ks){let r,o=de.getTransfer(n);if(i===Tn)return s.UNSIGNED_BYTE;if(i===Mu)return s.UNSIGNED_SHORT_4_4_4_4;if(i===bu)return s.UNSIGNED_SHORT_5_5_5_1;if(i===Dp)return s.UNSIGNED_INT_5_9_9_9_REV;if(i===Np)return s.UNSIGNED_INT_10F_11F_11F_REV;if(i===Ip)return s.BYTE;if(i===Lp)return s.SHORT;if(i===Ea)return s.UNSIGNED_SHORT;if(i===Su)return s.INT;if(i===us)return s.UNSIGNED_INT;if(i===Jn)return s.FLOAT;if(i===gi)return s.HALF_FLOAT;if(i===Up)return s.ALPHA;if(i===Fp)return s.RGB;if(i===$n)return s.RGBA;if(i===ws)return s.DEPTH_COMPONENT;if(i===Rr)return s.DEPTH_STENCIL;if(i===wu)return s.RED;if(i===Tu)return s.RED_INTEGER;if(i===Pr)return s.RG;if(i===Eu)return s.RG_INTEGER;if(i===Au)return s.RGBA_INTEGER;if(i===rc||i===oc||i===ac||i===lc)if(o===Te)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===rc)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===oc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ac)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===lc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===rc)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===oc)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ac)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===lc)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Cu||i===Ru||i===Pu||i===Iu)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Cu)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ru)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Pu)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Iu)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Lu||i===Du||i===Nu||i===Uu||i===Fu||i===cc||i===Ou)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Lu||i===Du)return o===Te?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Nu)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Uu)return r.COMPRESSED_R11_EAC;if(i===Fu)return r.COMPRESSED_SIGNED_R11_EAC;if(i===cc)return r.COMPRESSED_RG11_EAC;if(i===Ou)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Bu||i===ku||i===zu||i===Hu||i===Vu||i===Gu||i===Wu||i===Xu||i===Yu||i===qu||i===Zu||i===Ku||i===Ju||i===$u)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Bu)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ku)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===zu)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Hu)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Vu)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Gu)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Wu)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Xu)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Yu)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===qu)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Zu)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ku)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ju)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===$u)return o===Te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ju||i===Qu||i===tf)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===ju)return o===Te?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Qu)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===tf)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ef||i===nf||i===hc||i===sf)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===ef)return r.COMPRESSED_RED_RGTC1_EXT;if(i===nf)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===hc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===sf)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Aa?s.UNSIGNED_INT_24_8:s[i]!==void 0?s[i]:null}return{convert:e}}var sE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,rE=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,cm=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new Ol(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new Se({vertexShader:sE,fragmentShader:rE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ge(new ls(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},hm=class extends os{constructor(t,e){super();let i=this,n=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,f=null,u=null,d=null,p=null,m=typeof XRWebGLBinding<"u",g=new cm,_={},y=e.getContextAttributes(),E=null,x=null,b=[],M=[],T=new Tt,v=null,w=null,C=new Li;C.viewport=new qe;let D=new Li;D.viewport=new qe;let I=[C,D],O=new pu,L=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let J=b[G];return J===void 0&&(J=new da,b[G]=J),J.getTargetRaySpace()},this.getControllerGrip=function(G){let J=b[G];return J===void 0&&(J=new da,b[G]=J),J.getGripSpace()},this.getHand=function(G){let J=b[G];return J===void 0&&(J=new da,b[G]=J),J.getHandSpace()};function V(G){let J=M.indexOf(G.inputSource);if(J===-1)return;let ot=b[J];ot!==void 0&&(ot.update(G.inputSource,G.frame,c||o),ot.dispatchEvent({type:G.type,data:G.inputSource}))}function z(){n.removeEventListener("select",V),n.removeEventListener("selectstart",V),n.removeEventListener("selectend",V),n.removeEventListener("squeeze",V),n.removeEventListener("squeezestart",V),n.removeEventListener("squeezeend",V),n.removeEventListener("end",z),n.removeEventListener("inputsourceschange",$);for(let G=0;G<b.length;G++){let J=M[G];J!==null&&(M[G]=null,b[G].disconnect(J))}L=null,B=null,g.reset();for(let G in _)delete _[G];if(t.setRenderTarget(E),d=null,u=null,f=null,n=null,x=null,bt.stop(),i.isPresenting=!1,t.setPixelRatio(v),t.setSize(T.width,T.height,!1),w!==null){let G=w.camera;G.fov=w.fov,G.zoom=w.zoom,G.updateProjectionMatrix(),w=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){r=G,i.isPresenting===!0&&Zt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){a=G,i.isPresenting===!0&&Zt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f===null&&m&&(f=new XRWebGLBinding(n,e)),f},this.getFrame=function(){return p},this.getSession=function(){return n},this.setSession=async function(G){if(n=G,n!==null){if(E=t.getRenderTarget(),n.addEventListener("select",V),n.addEventListener("selectstart",V),n.addEventListener("selectend",V),n.addEventListener("squeeze",V),n.addEventListener("squeezestart",V),n.addEventListener("squeezeend",V),n.addEventListener("end",z),n.addEventListener("inputsourceschange",$),y.xrCompatible!==!0&&await e.makeXRCompatible(),v=t.getPixelRatio(),t.getSize(T),m&&"createProjectionLayer"in XRWebGLBinding.prototype){let ot=null,Dt=null,_t=null;y.depth&&(_t=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ot=y.stencil?Rr:ws,Dt=y.stencil?Aa:us);let zt={colorFormat:e.RGBA8,depthFormat:_t,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(zt),n.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),x=new ni(u.textureWidth,u.textureHeight,{format:$n,type:Tn,depthTexture:new yr(u.textureWidth,u.textureHeight,Dt,void 0,void 0,void 0,void 0,void 0,void 0,ot),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let ot={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(n,e,ot),n.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new ni(d.framebufferWidth,d.framebufferHeight,{format:$n,type:Tn,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await n.requestReferenceSpace(a),bt.setContext(n),bt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function $(G){for(let J=0;J<G.removed.length;J++){let ot=G.removed[J],Dt=M.indexOf(ot);Dt>=0&&(M[Dt]=null,b[Dt].disconnect(ot))}for(let J=0;J<G.added.length;J++){let ot=G.added[J],Dt=M.indexOf(ot);if(Dt===-1){for(let zt=0;zt<b.length;zt++)if(zt>=M.length){M.push(ot),Dt=zt;break}else if(M[zt]===null){M[zt]=ot,Dt=zt;break}if(Dt===-1)break}let _t=b[Dt];_t&&_t.connect(ot)}}let Z=new N,R=new N;function tt(G,J,ot){Z.setFromMatrixPosition(J.matrixWorld),R.setFromMatrixPosition(ot.matrixWorld);let Dt=Z.distanceTo(R),_t=J.projectionMatrix.elements,zt=ot.projectionMatrix.elements,Vt=_t[14]/(_t[10]-1),Ct=_t[14]/(_t[10]+1),Xt=(_t[9]+1)/_t[5],te=(_t[9]-1)/_t[5],W=(_t[8]-1)/_t[0],he=(zt[8]+1)/zt[0],De=Vt*W,Ze=Vt*he,ee=Dt/(-W+he),Ee=ee*-W;if(J.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(Ee),G.translateZ(ee),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert(),_t[10]===-1)G.projectionMatrix.copy(J.projectionMatrix),G.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{let k=Vt+ee,Xe=Ct+ee,jt=De-Ee,P=Ze+(Dt-Ee),S=Xt*Ct/Xe*k,H=te*Ct/Xe*k;G.projectionMatrix.makePerspective(jt,P,S,H,k,Xe),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}}function it(G,J){J===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(J.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(n===null)return;let J=G.near,ot=G.far;g.texture!==null&&(g.depthNear>0&&(J=g.depthNear),g.depthFar>0&&(ot=g.depthFar)),O.near=D.near=C.near=J,O.far=D.far=C.far=ot,(L!==O.near||B!==O.far)&&(n.updateRenderState({depthNear:O.near,depthFar:O.far}),L=O.near,B=O.far),O.layers.mask=G.layers.mask|6,C.layers.mask=O.layers.mask&-5,D.layers.mask=O.layers.mask&-3;let Dt=G.parent,_t=O.cameras;it(O,Dt);for(let zt=0;zt<_t.length;zt++)it(_t[zt],Dt);_t.length===2?tt(O,C,D):O.projectionMatrix.copy(C.projectionMatrix),w===null&&G.isPerspectiveCamera&&(w={camera:G,fov:G.fov,zoom:G.zoom}),at(G,O,Dt)};function at(G,J,ot){ot===null?G.matrix.copy(J.matrixWorld):(G.matrix.copy(ot.matrixWorld),G.matrix.invert(),G.matrix.multiply(J.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(J.projectionMatrix),G.projectionMatrixInverse.copy(J.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=ha*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(u===null&&d===null))return l},this.setFoveation=function(G){l=G,u!==null&&(u.fixedFoveation=G),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=G)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(O)},this.getCameraTexture=function(G){return _[G]};let j=null;function ht(G,J){if(h=J.getViewerPose(c||o),p=J,h!==null){let ot=h.views;d!==null&&(t.setRenderTargetFramebuffer(x,d.framebuffer),t.setRenderTarget(x));let Dt=!1;ot.length!==O.cameras.length&&(O.cameras.length=0,Dt=!0);for(let Ct=0;Ct<ot.length;Ct++){let Xt=ot[Ct],te=null;if(d!==null)te=d.getViewport(Xt);else{let he=f.getViewSubImage(u,Xt);te=he.viewport,Ct===0&&(t.setRenderTargetTextures(x,he.colorTexture,he.depthStencilTexture),t.setRenderTarget(x))}let W=I[Ct];W===void 0&&(W=new Li,W.layers.enable(Ct),W.viewport=new qe,I[Ct]=W),W.matrix.fromArray(Xt.transform.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale),W.projectionMatrix.fromArray(Xt.projectionMatrix),W.projectionMatrixInverse.copy(W.projectionMatrix).invert(),W.viewport.set(te.x,te.y,te.width,te.height),Ct===0&&(O.matrix.copy(W.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Dt===!0&&O.cameras.push(W)}let _t=n.enabledFeatures;if(_t&&_t.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&m){f=i.getBinding();let Ct=f.getDepthInformation(ot[0]);Ct&&Ct.isValid&&Ct.texture&&g.init(Ct,n.renderState)}if(_t&&_t.includes("camera-access")&&m){t.state.unbindTexture(),f=i.getBinding();for(let Ct=0;Ct<ot.length;Ct++){let Xt=ot[Ct].camera;if(Xt){let te=_[Xt];te||(te=new Ol,_[Xt]=te);let W=f.getCameraImage(Xt);te.sourceTexture=W}}}}for(let ot=0;ot<b.length;ot++){let Dt=M[ot],_t=b[ot];Dt!==null&&_t!==void 0&&_t.update(Dt,J,c||o)}j&&j(G,J),J.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:J}),p=null}let bt=new dv;bt.setAnimationLoop(ht),this.setAnimationLoop=function(G){j=G},this.dispose=function(){}}},oE=new be,xv=new ne;xv.set(-1,0,0,0,1,0,0,0,1);function aE(s,t){function e(g,_){g.matrixAutoUpdate===!0&&g.updateMatrix(),_.value.copy(g.matrix)}function i(g,_){_.color.getRGB(g.fogColor.value,Hp(s)),_.isFog?(g.fogNear.value=_.near,g.fogFar.value=_.far):_.isFogExp2&&(g.fogDensity.value=_.density)}function n(g,_,y,E,x){_.isNodeMaterial?_.uniformsNeedUpdate=!1:_.isMeshBasicMaterial?r(g,_):_.isMeshLambertMaterial?(r(g,_),_.envMap&&(g.envMapIntensity.value=_.envMapIntensity)):_.isMeshToonMaterial?(r(g,_),f(g,_)):_.isMeshPhongMaterial?(r(g,_),h(g,_),_.envMap&&(g.envMapIntensity.value=_.envMapIntensity)):_.isMeshStandardMaterial?(r(g,_),u(g,_),_.isMeshPhysicalMaterial&&d(g,_,x)):_.isMeshMatcapMaterial?(r(g,_),p(g,_)):_.isMeshDepthMaterial?r(g,_):_.isMeshDistanceMaterial?(r(g,_),m(g,_)):_.isMeshNormalMaterial?r(g,_):_.isLineBasicMaterial?(o(g,_),_.isLineDashedMaterial&&a(g,_)):_.isPointsMaterial?l(g,_,y,E):_.isSpriteMaterial?c(g,_):_.isShadowMaterial?(g.color.value.copy(_.color),g.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function r(g,_){g.opacity.value=_.opacity,_.color&&g.diffuse.value.copy(_.color),_.emissive&&g.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(g.map.value=_.map,e(_.map,g.mapTransform)),_.alphaMap&&(g.alphaMap.value=_.alphaMap,e(_.alphaMap,g.alphaMapTransform)),_.bumpMap&&(g.bumpMap.value=_.bumpMap,e(_.bumpMap,g.bumpMapTransform),g.bumpScale.value=_.bumpScale,_.side===li&&(g.bumpScale.value*=-1)),_.normalMap&&(g.normalMap.value=_.normalMap,e(_.normalMap,g.normalMapTransform),g.normalScale.value.copy(_.normalScale),_.side===li&&g.normalScale.value.negate()),_.displacementMap&&(g.displacementMap.value=_.displacementMap,e(_.displacementMap,g.displacementMapTransform),g.displacementScale.value=_.displacementScale,g.displacementBias.value=_.displacementBias),_.emissiveMap&&(g.emissiveMap.value=_.emissiveMap,e(_.emissiveMap,g.emissiveMapTransform)),_.specularMap&&(g.specularMap.value=_.specularMap,e(_.specularMap,g.specularMapTransform)),_.alphaTest>0&&(g.alphaTest.value=_.alphaTest);let y=t.get(_),E=y.envMap,x=y.envMapRotation;E&&(g.envMap.value=E,g.envMapRotation.value.setFromMatrix4(oE.makeRotationFromEuler(x)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(xv),g.reflectivity.value=_.reflectivity,g.ior.value=_.ior,g.refractionRatio.value=_.refractionRatio),_.lightMap&&(g.lightMap.value=_.lightMap,g.lightMapIntensity.value=_.lightMapIntensity,e(_.lightMap,g.lightMapTransform)),_.aoMap&&(g.aoMap.value=_.aoMap,g.aoMapIntensity.value=_.aoMapIntensity,e(_.aoMap,g.aoMapTransform))}function o(g,_){g.diffuse.value.copy(_.color),g.opacity.value=_.opacity,_.map&&(g.map.value=_.map,e(_.map,g.mapTransform))}function a(g,_){g.dashSize.value=_.dashSize,g.totalSize.value=_.dashSize+_.gapSize,g.scale.value=_.scale}function l(g,_,y,E){g.diffuse.value.copy(_.color),g.opacity.value=_.opacity,g.size.value=_.size*y,g.scale.value=E*.5,_.map&&(g.map.value=_.map,e(_.map,g.uvTransform)),_.alphaMap&&(g.alphaMap.value=_.alphaMap,e(_.alphaMap,g.alphaMapTransform)),_.alphaTest>0&&(g.alphaTest.value=_.alphaTest)}function c(g,_){g.diffuse.value.copy(_.color),g.opacity.value=_.opacity,g.rotation.value=_.rotation,_.map&&(g.map.value=_.map,e(_.map,g.mapTransform)),_.alphaMap&&(g.alphaMap.value=_.alphaMap,e(_.alphaMap,g.alphaMapTransform)),_.alphaTest>0&&(g.alphaTest.value=_.alphaTest)}function h(g,_){g.specular.value.copy(_.specular),g.shininess.value=Math.max(_.shininess,1e-4)}function f(g,_){_.gradientMap&&(g.gradientMap.value=_.gradientMap)}function u(g,_){g.metalness.value=_.metalness,_.metalnessMap&&(g.metalnessMap.value=_.metalnessMap,e(_.metalnessMap,g.metalnessMapTransform)),g.roughness.value=_.roughness,_.roughnessMap&&(g.roughnessMap.value=_.roughnessMap,e(_.roughnessMap,g.roughnessMapTransform)),_.envMap&&(g.envMapIntensity.value=_.envMapIntensity)}function d(g,_,y){g.ior.value=_.ior,_.sheen>0&&(g.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),g.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(g.sheenColorMap.value=_.sheenColorMap,e(_.sheenColorMap,g.sheenColorMapTransform)),_.sheenRoughnessMap&&(g.sheenRoughnessMap.value=_.sheenRoughnessMap,e(_.sheenRoughnessMap,g.sheenRoughnessMapTransform))),_.clearcoat>0&&(g.clearcoat.value=_.clearcoat,g.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(g.clearcoatMap.value=_.clearcoatMap,e(_.clearcoatMap,g.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,e(_.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(g.clearcoatNormalMap.value=_.clearcoatNormalMap,e(_.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===li&&g.clearcoatNormalScale.value.negate())),_.dispersion>0&&(g.dispersion.value=_.dispersion),_.retroreflectivity>0&&(g.retroreflectivity.value=_.retroreflectivity),_.iridescence>0&&(g.iridescence.value=_.iridescence,g.iridescenceIOR.value=_.iridescenceIOR,g.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(g.iridescenceMap.value=_.iridescenceMap,e(_.iridescenceMap,g.iridescenceMapTransform)),_.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=_.iridescenceThicknessMap,e(_.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),_.transmission>0&&(g.transmission.value=_.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),_.transmissionMap&&(g.transmissionMap.value=_.transmissionMap,e(_.transmissionMap,g.transmissionMapTransform)),g.thickness.value=_.thickness,_.thicknessMap&&(g.thicknessMap.value=_.thicknessMap,e(_.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=_.attenuationDistance,g.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(g.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(g.anisotropyMap.value=_.anisotropyMap,e(_.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=_.specularIntensity,g.specularColor.value.copy(_.specularColor),_.specularColorMap&&(g.specularColorMap.value=_.specularColorMap,e(_.specularColorMap,g.specularColorMapTransform)),_.specularIntensityMap&&(g.specularIntensityMap.value=_.specularIntensityMap,e(_.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,_){_.matcap&&(g.matcap.value=_.matcap)}function m(g,_){let y=t.get(_).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function lE(s,t,e,i){let n={},r={},o=[],a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,b){let M=b.program;i.uniformBlockBinding(x,M)}function c(x,b){let M=n[x.id];M===void 0&&(g(x),M=h(x),n[x.id]=M,x.addEventListener("dispose",y));let T=b.program;i.updateUBOMapping(x,T);let v=t.render.frame;r[x.id]!==v&&(u(x),r[x.id]=v)}function h(x){let b=f();x.__bindingPointIndex=b;let M=s.createBuffer(),T=x.__size,v=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,M),s.bufferData(s.UNIFORM_BUFFER,T,v),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,b,M),M}function f(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return $t("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){let b=n[x.id],M=x.uniforms,T=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,b);for(let v=0,w=M.length;v<w;v++){let C=M[v];if(Array.isArray(C))for(let D=0,I=C.length;D<I;D++)d(C[D],v,D,T);else d(C,v,0,T)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(x,b,M,T){if(m(x,b,M,T)===!0){let v=x.__offset,w=x.value;if(Array.isArray(w)){let C=0;for(let D=0;D<w.length;D++){let I=w[D],O=_(I);p(I,x.__data,C),typeof I!="number"&&typeof I!="boolean"&&!I.isMatrix3&&!ArrayBuffer.isView(I)&&(C+=O.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(w,x.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,v,x.__data)}}function p(x,b,M){typeof x=="number"||typeof x=="boolean"?b[0]=x:x.isMatrix3?(b[0]=x.elements[0],b[1]=x.elements[1],b[2]=x.elements[2],b[3]=0,b[4]=x.elements[3],b[5]=x.elements[4],b[6]=x.elements[5],b[7]=0,b[8]=x.elements[6],b[9]=x.elements[7],b[10]=x.elements[8],b[11]=0):ArrayBuffer.isView(x)?b.set(new x.constructor(x.buffer,x.byteOffset,b.length)):x.toArray(b,M)}function m(x,b,M,T){let v=x.value,w=b+"_"+M;if(T[w]===void 0)return typeof v=="number"||typeof v=="boolean"?T[w]=v:ArrayBuffer.isView(v)?T[w]=v.slice():T[w]=v.clone(),!0;{let C=T[w];if(typeof v=="number"||typeof v=="boolean"){if(C!==v)return T[w]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(C.equals(v)===!1)return C.copy(v),!0}}return!1}function g(x){let b=x.uniforms,M=0,T=16;for(let w=0,C=b.length;w<C;w++){let D=Array.isArray(b[w])?b[w]:[b[w]];for(let I=0,O=D.length;I<O;I++){let L=D[I],B=Array.isArray(L.value)?L.value:[L.value];for(let V=0,z=B.length;V<z;V++){let $=B[V],Z=_($),R=M%T,tt=R%Z.boundary,it=R+tt;M+=tt,it!==0&&T-it<Z.storage&&(M+=T-it),L.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=M,M+=Z.storage}}}let v=M%T;return v>0&&(M+=T-v),x.__size=M,x.__cache={},this}function _(x){let b={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(b.boundary=4,b.storage=4):x.isVector2?(b.boundary=8,b.storage=8):x.isVector3||x.isColor?(b.boundary=16,b.storage=12):x.isVector4?(b.boundary=16,b.storage=16):x.isMatrix3?(b.boundary=48,b.storage=48):x.isMatrix4?(b.boundary=64,b.storage=64):x.isTexture?Zt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(b.boundary=16,b.storage=x.byteLength):Zt("WebGLRenderer: Unsupported uniform value type.",x),b}function y(x){let b=x.target;b.removeEventListener("dispose",y);let M=o.indexOf(b.__bindingPointIndex);o.splice(M,1),s.deleteBuffer(n[b.id]),delete n[b.id],delete r[b.id]}function E(){for(let x in n)s.deleteBuffer(n[x]);o=[],n={},r={}}return{bind:l,update:c,dispose:E}}var cE=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Rs=null;function hE(){return Rs===null&&(Rs=new Nl(cE,16,16,Pr,gi),Rs.name="DFG_LUT",Rs.minFilter=Oi,Rs.magFilter=Oi,Rs.wrapS=bs,Rs.wrapT=bs,Rs.generateMipmaps=!1,Rs.needsUpdate=!0),Rs}var hf=class{constructor(t={}){let{canvas:e=k_(),context:i=null,depth:n=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:d=Tn}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;let m=d,g=new Set([Au,Eu,Tu]),_=new Set([Tn,us,Ea,Aa,Mu,bu]),y=new Uint32Array(4),E=new Int32Array(4),x=new N,b=null,M=null,T=[],v=[],w=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=hs,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,D=!1,I=null,O=null,L=null,B=null;this._outputColorSpace=Ii;let V=0,z=0,$=null,Z=-1,R=null,tt=new qe,it=new qe,at=null,j=new Wt(0),ht=0,bt=e.width,G=e.height,J=1,ot=null,Dt=null,_t=new qe(0,0,bt,G),zt=new qe(0,0,bt,G),Vt=!1,Ct=new ma,Xt=!1,te=!1,W=new be,he=new N,De=new qe,Ze={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ee=!1;function Ee(){return $===null?J:1}let k=i;function Xe(A,F){return e.getContext(A,F)}let jt,P,S,H,Y,Q,mt,ft,et,rt,xt,Lt,yt,vt,pt,Bt,Yt,U,gt,st,St,wt,lt;try{let A={alpha:!0,depth:n,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",Ht,!1),e.addEventListener("webglcontextrestored",ut,!1),e.addEventListener("webglcontextcreationerror",Gt,!1),k===null){let F="webgl2";if(k=Xe(F,A),k===null)throw Xe(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}dt()}catch(A){throw e.removeEventListener("webglcontextlost",Ht,!1),e.removeEventListener("webglcontextrestored",ut,!1),e.removeEventListener("webglcontextcreationerror",Gt,!1),$t("WebGLRenderer: "+A.message),A}function dt(){jt=new _w(k),jt.init(),St=new nE(k,jt),P=new aw(k,jt,t,St),S=new eE(k,jt),P.reversedDepthBuffer&&u&&S.buffers.depth.setReversed(!0),O=k.createFramebuffer(),L=k.createFramebuffer(),B=k.createFramebuffer(),H=new yw(k),Y=new HT,Q=new iE(k,jt,S,Y,P,St,H),mt=new gw(C),ft=new MM(k),wt=new rw(k,ft),et=new vw(k,ft,H,wt),rt=new Mw(k,et,ft,wt,H),U=new Sw(k,P,Q),pt=new lw(Y),xt=new zT(C,mt,jt,P,wt,pt),Lt=new aE(C,Y),yt=new GT,vt=new KT(jt),Yt=new sw(C,mt,S,rt,p,l),Bt=new tE(C,rt,P),lt=new lE(k,H,P,S),gt=new ow(k,jt,H),st=new xw(k,jt,H),H.programs=xt.programs,C.capabilities=P,C.extensions=jt,C.properties=Y,C.renderLists=yt,C.shadowMap=Bt,C.state=S,C.info=H}m!==Tn&&(w=new ww(m,e.width,e.height,a,n,r));let ct=new hm(C,k);this.xr=ct,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){let A=jt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=jt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(A){A!==void 0&&(J=A,this.setSize(bt,G,!1))},this.getSize=function(A){return A.set(bt,G)},this.setSize=function(A,F,K=!0){if(ct.isPresenting){Zt("WebGLRenderer: Can't change size while VR device is presenting.");return}bt=A,G=F,e.width=Math.floor(A*J),e.height=Math.floor(F*J),K===!0&&(e.style.width=A+"px",e.style.height=F+"px"),w!==null&&w.setSize(e.width,e.height),this.setViewport(0,0,A,F)},this.getDrawingBufferSize=function(A){return A.set(bt*J,G*J).floor()},this.setDrawingBufferSize=function(A,F,K){bt=A,G=F,J=K,e.width=Math.floor(A*K),e.height=Math.floor(F*K),this.setViewport(0,0,A,F)},this.setEffects=function(A){if(m===Tn){$t("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let F=0;F<A.length;F++)if(A[F].isOutputPass===!0){Zt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(tt)},this.getViewport=function(A){return A.copy(_t)},this.setViewport=function(A,F,K,X){A.isVector4?_t.set(A.x,A.y,A.z,A.w):_t.set(A,F,K,X),S.viewport(tt.copy(_t).multiplyScalar(J).round())},this.getScissor=function(A){return A.copy(zt)},this.setScissor=function(A,F,K,X){A.isVector4?zt.set(A.x,A.y,A.z,A.w):zt.set(A,F,K,X),S.scissor(it.copy(zt).multiplyScalar(J).round())},this.getScissorTest=function(){return Vt},this.setScissorTest=function(A){S.setScissorTest(Vt=A)},this.setOpaqueSort=function(A){ot=A},this.setTransparentSort=function(A){Dt=A},this.getClearColor=function(A){return A.copy(Yt.getClearColor())},this.setClearColor=function(){Yt.setClearColor(...arguments)},this.getClearAlpha=function(){return Yt.getClearAlpha()},this.setClearAlpha=function(){Yt.setClearAlpha(...arguments)},this.clear=function(A=!0,F=!0,K=!0){let X=0;if(A){let q=!1;if($!==null){let Mt=$.texture.format;q=g.has(Mt)}if(q){let Mt=$.texture.type,Pt=_.has(Mt),At=Yt.getClearColor(),Ut=Yt.getClearAlpha(),kt=At.r,re=At.g,pe=At.b;Pt?(y[0]=kt,y[1]=re,y[2]=pe,y[3]=Ut,k.clearBufferuiv(k.COLOR,0,y)):(E[0]=kt,E[1]=re,E[2]=pe,E[3]=Ut,k.clearBufferiv(k.COLOR,0,E))}else X|=k.COLOR_BUFFER_BIT}F&&(X|=k.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),K&&(X|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&k.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),I=A},this.dispose=function(){e.removeEventListener("webglcontextlost",Ht,!1),e.removeEventListener("webglcontextrestored",ut,!1),e.removeEventListener("webglcontextcreationerror",Gt,!1),Yt.dispose(),yt.dispose(),vt.dispose(),Y.dispose(),mt.dispose(),rt.dispose(),wt.dispose(),lt.dispose(),xt.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",Ve),ct.removeEventListener("sessionend",Ue),ve.stop()};function Ht(A){A.preventDefault(),kp("WebGLRenderer: Context Lost."),D=!0}function ut(){kp("WebGLRenderer: Context Restored."),D=!1;let A=H.autoReset,F=Bt.enabled,K=Bt.autoUpdate,X=Bt.needsUpdate,q=Bt.type;dt(),H.autoReset=A,Bt.enabled=F,Bt.autoUpdate=K,Bt.needsUpdate=X,Bt.type=q}function Gt(A){$t("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Nt(A){let F=A.target;F.removeEventListener("dispose",Nt),ie(F)}function ie(A){ci(A),Y.remove(A)}function ci(A){let F=Y.get(A).programs;F!==void 0&&(F.forEach(function(K){xt.releaseProgram(K)}),A.isShaderMaterial&&xt.releaseShaderCache(A))}this.renderBufferDirect=function(A,F,K,X,q,Mt){F===null&&(F=Ze);let Pt=q.isMesh&&q.matrixWorld.determinantAffine()<0,At=Ai(A,F,K,X,q);S.setMaterial(X,Pt);let Ut=K.index,kt=1;if(X.wireframe===!0){if(Ut=et.getWireframeAttribute(K),Ut===void 0)return;kt=2}let re=K.drawRange,pe=K.attributes.position,Ft=re.start*kt,Ae=(re.start+re.count)*kt;Mt!==null&&(Ft=Math.max(Ft,Mt.start*kt),Ae=Math.min(Ae,(Mt.start+Mt.count)*kt)),Ut!==null?(Ft=Math.max(Ft,0),Ae=Math.min(Ae,Ut.count)):pe!=null&&(Ft=Math.max(Ft,0),Ae=Math.min(Ae,pe.count));let ui=Ae-Ft;if(ui<0||ui===1/0)return;wt.setup(q,X,At,K,Ut);let Ge,Fe=gt;if(Ut!==null&&(Ge=ft.get(Ut),Fe=st,Fe.setIndex(Ge)),q.isMesh)X.wireframe===!0?(S.setLineWidth(X.wireframeLinewidth*Ee()),Fe.setMode(k.LINES)):Fe.setMode(k.TRIANGLES);else if(q.isLine){let zi=X.linewidth;zi===void 0&&(zi=1),S.setLineWidth(zi*Ee()),q.isLineSegments?Fe.setMode(k.LINES):q.isLineLoop?Fe.setMode(k.LINE_LOOP):Fe.setMode(k.LINE_STRIP)}else q.isPoints?Fe.setMode(k.POINTS):q.isSprite&&Fe.setMode(k.TRIANGLES);if(q.isBatchedMesh)if(jt.get("WEBGL_multi_draw"))Fe.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{let zi=q._multiDrawStarts,Rt=q._multiDrawCounts,sn=q._multiDrawCount,Me=Ut?ft.get(Ut).bytesPerElement:1,Hn=Y.get(X).currentProgram.getUniforms();for(let ms=0;ms<sn;ms++)Hn.setValue(k,"_gl_DrawID",ms),Fe.render(zi[ms]/Me,Rt[ms])}else if(q.isInstancedMesh)Fe.renderInstances(Ft,ui,q.count);else if(K.isInstancedBufferGeometry){let zi=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Rt=Math.min(K.instanceCount,zi);Fe.renderInstances(Ft,ui,Rt)}else Fe.render(Ft,ui)};function ue(A,F,K,X){I!==null&&A.isNodeMaterial&&I.setObject(X,A),Xt===!0&&pt.setState(A,K,!1),A.transparent===!0&&A.side===bn&&A.forceSinglePass===!1?(A.side=li,A.needsUpdate=!0,Qe(A,F,X),A.side=Ar,A.needsUpdate=!0,Qe(A,F,X),A.side=bn):Qe(A,F,X)}this.compile=function(A,F,K=null){K===null&&(K=A),I!==null&&I.renderStart(A,F,K),M=vt.get(K),M.init(F),v.push(M),K.traverseVisible(function(q){q.isLight&&q.layers.test(F.layers)&&(M.pushLight(q),q.castShadow&&M.pushShadow(q))}),A!==K&&A.traverseVisible(function(q){q.isLight&&q.layers.test(F.layers)&&(M.pushLight(q),q.castShadow&&M.pushShadow(q))}),M.setupLights(),I!==null&&I.updateLights(M.state.lightsArray),te=this.localClippingEnabled,Xt=pt.init(this.clippingPlanes,te),Xt===!0&&pt.setGlobalState(this.clippingPlanes,F),I!==null&&Bt.render(M.state.shadowsArray,K,F);let X=new Set;return A.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;let Mt=q.material;if(Mt)if(Array.isArray(Mt))for(let Pt=0;Pt<Mt.length;Pt++){let At=Mt[Pt];ue(At,K,F,q),X.add(At)}else ue(Mt,K,F,q),X.add(Mt)}),M=v.pop(),I!==null&&I.renderEnd(),X},this.compileAsync=function(A,F,K=null){let X=this.compile(A,F,K);return new Promise(q=>{function Mt(){if(X.forEach(function(Pt){let Ut=Y.get(Pt).currentProgram;(Ut===void 0||Ut.isReady())&&X.delete(Pt)}),X.size===0){q(A);return}setTimeout(Mt,10)}jt.get("KHR_parallel_shader_compile")!==null?Mt():setTimeout(Mt,10)})};let He=null;function Ei(A){He&&He(A)}function Ve(){ve.stop()}function Ue(){ve.start()}let ve=new dv;ve.setAnimationLoop(Ei),typeof self<"u"&&ve.setContext(self),this.setAnimationLoop=function(A){He=A,ct.setAnimationLoop(A),A===null?ve.stop():ve.start()},ct.addEventListener("sessionstart",Ve),ct.addEventListener("sessionend",Ue),this.render=function(A,F){if(F!==void 0&&F.isCamera!==!0){$t("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;I!==null&&I.renderStart(A,F);let K=ct.enabled===!0&&ct.isPresenting===!0,X=w!==null&&($===null||K)&&w.begin(C,$);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(F),F=ct.getCamera()),A.isScene===!0&&A.onBeforeRender(C,A,F,$),M=vt.get(A,v.length),M.init(F),M.state.textureUnits=Q.getTextureUnits(),v.push(M),W.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Ct.setFromProjectionMatrix(W,ss,F.reversedDepth),te=this.localClippingEnabled,Xt=pt.init(this.clippingPlanes,te),b=yt.get(A,T.length),b.init(),T.push(b),ct.enabled===!0&&ct.isPresenting===!0){let Pt=C.xr.getDepthSensingMesh();Pt!==null&&en(Pt,F,-1/0,C.sortObjects)}en(A,F,0,C.sortObjects),b.finish(),I!==null&&I.updateLights(M.state.lightsArray),C.sortObjects===!0&&b.sort(ot,Dt),ee=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,ee&&Yt.addToRenderList(b,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Xt===!0&&pt.beginShadows();let q=M.state.shadowsArray;if(Bt.render(q,A,F),Xt===!0&&pt.endShadows(),(X&&w.hasRenderPass())===!1){let Pt=b.opaque,At=b.transmissive;if(M.setupLights(),F.isArrayCamera){let Ut=F.cameras;if(At.length>0)for(let kt=0,re=Ut.length;kt<re;kt++){let pe=Ut[kt];ki(Pt,At,A,pe)}ee&&Yt.render(A);for(let kt=0,re=Ut.length;kt<re;kt++){let pe=Ut[kt];ke(b,A,pe,pe.viewport)}}else At.length>0&&ki(Pt,At,A,F),ee&&Yt.render(A),ke(b,A,F)}$!==null&&z===0&&(Q.updateMultisampleRenderTarget($),Q.updateRenderTargetMipmap($)),X&&w.end(C),A.isScene===!0&&A.onAfterRender(C,A,F),wt.resetDefaultState(),Z=-1,R=null,v.pop(),v.length>0?(M=v[v.length-1],Q.setTextureUnits(M.state.textureUnits),Xt===!0&&pt.setGlobalState(C.clippingPlanes,M.state.camera)):M=null,T.pop(),T.length>0?b=T[T.length-1]:b=null,I!==null&&I.renderEnd()};function en(A,F,K,X){if(A.visible===!1)return;if(A.layers.test(F.layers)){if(A.isGroup)K=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(F);else if(A.isLightProbeGrid)M.pushLightProbeGrid(A);else if(A.isLight)M.pushLight(A),A.castShadow&&M.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||A.intersectsFrustum(Ct)){X&&De.setFromMatrixPosition(A.matrixWorld).applyMatrix4(W);let Pt=rt.update(A),At=A.material;At.visible&&b.push(A,Pt,At,K,De.z,null,F)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||A.intersectsFrustum(Ct))){let Pt=rt.update(A),At=A.material;if(X&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),De.copy(A.boundingSphere.center)):(Pt.boundingSphere===null&&Pt.computeBoundingSphere(),De.copy(Pt.boundingSphere.center)),De.applyMatrix4(A.matrixWorld).applyMatrix4(W)),Array.isArray(At)){let Ut=Pt.groups;for(let kt=0,re=Ut.length;kt<re;kt++){let pe=Ut[kt],Ft=At[pe.materialIndex];Ft&&Ft.visible&&b.push(A,Pt,Ft,K,De.z,pe,F)}}else At.visible&&b.push(A,Pt,At,K,De.z,null,F)}}let Mt=A.children;for(let Pt=0,At=Mt.length;Pt<At;Pt++)en(Mt[Pt],F,K,X)}function ke(A,F,K,X){let{opaque:q,transmissive:Mt,transparent:Pt}=A;M.setupLightsView(K),Xt===!0&&pt.setGlobalState(C.clippingPlanes,K),X&&S.viewport(tt.copy(X)),q.length>0&&nn(q,F,K),Mt.length>0&&nn(Mt,F,K),Pt.length>0&&nn(Pt,F,K),S.buffers.depth.setTest(!0),S.buffers.depth.setMask(!0),S.buffers.color.setMask(!0),S.setPolygonOffset(!1)}function ki(A,F,K,X){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[X.id]===void 0){let Ft=jt.has("EXT_color_buffer_half_float")||jt.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[X.id]=new ni(1,1,{generateMipmaps:!0,type:Ft?gi:Tn,minFilter:Cs,samples:Math.max(4,P.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:de.workingColorSpace})}let Mt=M.state.transmissionRenderTarget[X.id],Pt=X.viewport||tt;Mt.setSize(Pt.z*C.transmissionResolutionScale,Pt.w*C.transmissionResolutionScale);let At=C.getRenderTarget(),Ut=C.getActiveCubeFace(),kt=C.getActiveMipmapLevel();C.setRenderTarget(Mt),C.getClearColor(j),ht=C.getClearAlpha(),ht<1&&C.setClearColor(16777215,.5),C.clear(),ee&&Yt.render(K);let re=C.toneMapping;C.toneMapping=hs;let pe=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),M.setupLightsView(X),Xt===!0&&pt.setGlobalState(C.clippingPlanes,X),nn(A,K,X),Q.updateMultisampleRenderTarget(Mt),Q.updateRenderTargetMipmap(Mt),jt.has("WEBGL_multisampled_render_to_texture")===!1){let Ft=!1;for(let Ae=0,ui=F.length;Ae<ui;Ae++){let Ge=F[Ae],{object:Fe,geometry:zi,material:Rt,group:sn}=Ge;if(Rt.side===bn&&Fe.layers.test(X.layers)){let Me=Rt.side;Rt.side=li,Rt.needsUpdate=!0,hi(Fe,K,X,zi,Rt,sn),Rt.side=Me,Rt.needsUpdate=!0,Ft=!0}}Ft===!0&&(Q.updateMultisampleRenderTarget(Mt),Q.updateRenderTargetMipmap(Mt))}C.setRenderTarget(At,Ut,kt),C.setClearColor(j,ht),pe!==void 0&&(X.viewport=pe),C.toneMapping=re}function nn(A,F,K){let X=F.isScene===!0?F.overrideMaterial:null;for(let q=0,Mt=A.length;q<Mt;q++){let Pt=A[q],{object:At,geometry:Ut,group:kt}=Pt,re=Pt.material;re.allowOverride===!0&&X!==null&&(re=X),At.layers.test(K.layers)&&hi(At,F,K,Ut,re,kt)}}function hi(A,F,K,X,q,Mt){I!==null&&q.isNodeMaterial&&I.setObject(A,q),A.onBeforeRender(C,F,K,X,q,Mt),A.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),q.onBeforeRender(C,F,K,X,A,Mt),q.transparent===!0&&q.side===bn&&q.forceSinglePass===!1?(q.side=li,q.needsUpdate=!0,C.renderBufferDirect(K,F,X,q,A,Mt),q.side=Ar,q.needsUpdate=!0,C.renderBufferDirect(K,F,X,q,A,Mt),q.side=bn):C.renderBufferDirect(K,F,X,q,A,Mt),A.onAfterRender(C,F,K,X,q,Mt)}function Qe(A,F,K){F.isScene!==!0&&(F=Ze);let X=Y.get(A),q=M.state.lights,Mt=M.state.shadowsArray,Pt=q.state.version,At=xt.getParameters(A,q.state,Mt,F,K,M.state.lightProbeGridArray),Ut=xt.getProgramCacheKey(At),kt=X.programs;X.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?F.environment:null,X.fog=F.fog;let re=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;X.envMap=mt.get(A.envMap||X.environment,re),X.envMapRotation=X.environment!==null&&A.envMap===null?F.environmentRotation:A.envMapRotation,kt===void 0&&(A.addEventListener("dispose",Nt),kt=new Map,X.programs=kt);let pe=kt.get(Ut);if(pe!==void 0){if(X.currentProgram===pe&&X.lightsStateVersion===Pt)return ps(A,At),pe}else At.uniforms=xt.getUniforms(A),I!==null&&A.isNodeMaterial&&I.build(A,K,At),A.onBeforeCompile(At,C),pe=xt.acquireProgram(At,Ut),kt.set(Ut,pe),X.uniforms=At.uniforms;let Ft=X.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ft.clippingPlanes=pt.uniform),ps(A,At),X.needsLights=zn(A),X.lightsStateVersion=Pt,X.needsLights&&(Ft.ambientLightColor.value=q.state.ambient,Ft.lightProbe.value=q.state.probe,Ft.sunLights.value=q.state.sun,Ft.sunLightShadows.value=q.state.sunShadow,Ft.directionalLights.value=q.state.directional,Ft.directionalLightShadows.value=q.state.directionalShadow,Ft.spotLights.value=q.state.spot,Ft.spotLightShadows.value=q.state.spotShadow,Ft.rectAreaLights.value=q.state.rectArea,Ft.ltc_1.value=q.state.rectAreaLTC1,Ft.ltc_2.value=q.state.rectAreaLTC2,Ft.pointLights.value=q.state.point,Ft.pointLightShadows.value=q.state.pointShadow,Ft.hemisphereLights.value=q.state.hemi,Ft.sunShadowMatrix.value=q.state.sunShadowMatrix,Ft.sunShadowCascade.value=q.state.sunShadowCascade,Ft.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Ft.spotLightMatrix.value=q.state.spotLightMatrix,Ft.spotLightMap.value=q.state.spotLightMap,Ft.pointShadowMatrix.value=q.state.pointShadowMatrix),X.lightProbeGrid=M.state.lightProbeGridArray.length>0,X.currentProgram=pe,X.uniformsList=null,pe}function xi(A){if(A.uniformsList===null){let F=A.currentProgram.getUniforms();A.uniformsList=Ia.seqWithValue(F.seq,A.uniforms)}return A.uniformsList}function ps(A,F){let K=Y.get(A);K.outputColorSpace=F.outputColorSpace,K.batching=F.batching,K.batchingColor=F.batchingColor,K.instancing=F.instancing,K.instancingColor=F.instancingColor,K.instancingMorph=F.instancingMorph,K.skinning=F.skinning,K.morphTargets=F.morphTargets,K.morphNormals=F.morphNormals,K.morphColors=F.morphColors,K.morphTargetsCount=F.morphTargetsCount,K.numClippingPlanes=F.numClippingPlanes,K.numIntersection=F.numClipIntersection,K.vertexAlphas=F.vertexAlphas,K.vertexTangents=F.vertexTangents,K.toneMapping=F.toneMapping}function xo(A,F){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;x.setFromMatrixPosition(F.matrixWorld);for(let K=0,X=A.length;K<X;K++){let q=A[K];if(q.texture!==null&&q.boundingBox.containsPoint(x))return q}return null}function Ai(A,F,K,X,q){F.isScene!==!0&&(F=Ze),Q.resetTextureUnits();let Mt=F.fog,Pt=X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial?F.environment:null,At=$===null?C.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:de.workingColorSpace,Ut=X.isMeshStandardMaterial||X.isMeshLambertMaterial&&!X.envMap||X.isMeshPhongMaterial&&!X.envMap,kt=mt.get(X.envMap||Pt,Ut),re=X.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pe=!!K.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Ft=!!K.morphAttributes.position,Ae=!!K.morphAttributes.normal,ui=!!K.morphAttributes.color,Ge=hs;X.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(Ge=C.toneMapping);let Fe=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,zi=Fe!==void 0?Fe.length:0,Rt=Y.get(X),sn=M.state.lights;if(Xt===!0&&(te===!0||A!==R)){let ze=A===R&&X.id===Z;pt.setState(X,A,ze)}let Me=!1;X.version===Rt.__version?(Rt.needsLights&&Rt.lightsStateVersion!==sn.state.version||Rt.outputColorSpace!==At||q.isBatchedMesh&&Rt.batching===!1||!q.isBatchedMesh&&Rt.batching===!0||q.isBatchedMesh&&Rt.batchingColor===!0&&q._colorsTexture===null||q.isBatchedMesh&&Rt.batchingColor===!1&&q._colorsTexture!==null||q.isInstancedMesh&&Rt.instancing===!1||!q.isInstancedMesh&&Rt.instancing===!0||q.isSkinnedMesh&&Rt.skinning===!1||!q.isSkinnedMesh&&Rt.skinning===!0||q.isInstancedMesh&&Rt.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&Rt.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&Rt.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&Rt.instancingMorph===!1&&q.morphTexture!==null||Rt.envMap!==kt||X.fog===!0&&Rt.fog!==Mt||Rt.numClippingPlanes!==void 0&&(Rt.numClippingPlanes!==pt.numPlanes||Rt.numIntersection!==pt.numIntersection)||Rt.vertexAlphas!==re||Rt.vertexTangents!==pe||Rt.morphTargets!==Ft||Rt.morphNormals!==Ae||Rt.morphColors!==ui||Rt.toneMapping!==Ge||Rt.morphTargetsCount!==zi||!!Rt.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(Me=!0):(Me=!0,Rt.__version=X.version);let Hn=Rt.currentProgram;Me===!0&&(Hn=Qe(X,F,q),I&&X.isNodeMaterial&&I.onUpdateProgram(X,Hn,Rt));let ms=!1,js=!1,So=!1,Ne=Hn.getUniforms(),oi=Rt.uniforms;if(S.useProgram(Hn.program)&&(ms=!0,js=!0,So=!0),X.id!==Z&&(Z=X.id,js=!0),Rt.needsLights){let ze=xo(M.state.lightProbeGridArray,q);Rt.lightProbeGrid!==ze&&(Rt.lightProbeGrid=ze,js=!0)}if(ms||R!==A){S.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Ne.setValue(k,"projectionMatrix",A.projectionMatrix),Ne.setValue(k,"viewMatrix",A.matrixWorldInverse);let tr=Ne.map.cameraPosition;tr!==void 0&&tr.setValue(k,he.setFromMatrixPosition(A.matrixWorld)),P.logarithmicDepthBuffer&&Ne.setValue(k,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&Ne.setValue(k,"isOrthographic",A.isOrthographicCamera===!0),R!==A&&(R=A,js=!0,So=!0)}if(Rt.needsLights&&(sn.state.sunShadowMap.length>0&&Ne.setValue(k,"sunShadowMap",sn.state.sunShadowMap,Q),sn.state.directionalShadowMap.length>0&&Ne.setValue(k,"directionalShadowMap",sn.state.directionalShadowMap,Q),sn.state.spotShadowMap.length>0&&Ne.setValue(k,"spotShadowMap",sn.state.spotShadowMap,Q),sn.state.pointShadowMap.length>0&&Ne.setValue(k,"pointShadowMap",sn.state.pointShadowMap,Q)),q.isSkinnedMesh){Ne.setOptional(k,q,"bindMatrix"),Ne.setOptional(k,q,"bindMatrixInverse");let ze=q.skeleton;ze&&(ze.boneTexture===null&&ze.computeBoneTexture(),Ne.setValue(k,"boneTexture",ze.boneTexture,Q))}q.isBatchedMesh&&(Ne.setOptional(k,q,"batchingTexture"),Ne.setValue(k,"batchingTexture",q._matricesTexture,Q),Ne.setOptional(k,q,"batchingIdTexture"),Ne.setValue(k,"batchingIdTexture",q._indirectTexture,Q),Ne.setOptional(k,q,"batchingColorTexture"),q._colorsTexture!==null&&Ne.setValue(k,"batchingColorTexture",q._colorsTexture,Q));let Qs=K.morphAttributes;if((Qs.position!==void 0||Qs.normal!==void 0||Qs.color!==void 0)&&U.update(q,K,Hn),(js||Rt.receiveShadow!==q.receiveShadow)&&(Rt.receiveShadow=q.receiveShadow,Ne.setValue(k,"receiveShadow",q.receiveShadow)),(X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial)&&X.envMap===null&&F.environment!==null&&(oi.envMapIntensity.value=F.environmentIntensity),oi.dfgLUT!==void 0&&(oi.dfgLUT.value=hE()),js){if(Ne.setValue(k,"toneMappingExposure",C.toneMappingExposure),Rt.needsLights&&ri(oi,So),Mt&&X.fog===!0&&Lt.refreshFogUniforms(oi,Mt),Lt.refreshMaterialUniforms(oi,X,J,G,M.state.transmissionRenderTarget[A.id]),Rt.needsLights&&Rt.lightProbeGrid){let ze=Rt.lightProbeGrid;oi.probesSH.value=ze.texture,oi.probesMin.value.copy(ze.boundingBox.min),oi.probesMax.value.copy(ze.boundingBox.max),oi.probesResolution.value.copy(ze.resolution)}Ia.upload(k,xi(Rt),oi,Q)}if(X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Ia.upload(k,xi(Rt),oi,Q),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&Ne.setValue(k,"center",q.center),Ne.setValue(k,"modelViewMatrix",q.modelViewMatrix),Ne.setValue(k,"normalMatrix",q.normalMatrix),Ne.setValue(k,"modelMatrix",q.matrixWorld),X.uniformsGroups!==void 0){let ze=X.uniformsGroups;for(let tr=0,Mo=ze.length;tr<Mo;tr++){let Em=ze[tr];lt.update(Em,Hn),lt.bind(Em,Hn)}}return Hn}function ri(A,F){A.ambientLightColor.needsUpdate=F,A.lightProbe.needsUpdate=F,A.sunLights.needsUpdate=F,A.sunLightShadows.needsUpdate=F,A.directionalLights.needsUpdate=F,A.directionalLightShadows.needsUpdate=F,A.pointLights.needsUpdate=F,A.pointLightShadows.needsUpdate=F,A.spotLights.needsUpdate=F,A.spotLightShadows.needsUpdate=F,A.rectAreaLights.needsUpdate=F,A.hemisphereLights.needsUpdate=F}function zn(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return $},this.setRenderTargetTextures=function(A,F,K){let X=Y.get(A);X.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),Y.get(A.texture).__webglTexture=F,Y.get(A.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:K,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,F){let K=Y.get(A);K.__webglFramebuffer=F,K.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(A,F=0,K=0){$=A,V=F,z=K;let X=null,q=!1,Mt=!1;if(A){let At=Y.get(A);if(At.__useDefaultFramebuffer!==void 0){S.bindFramebuffer(k.FRAMEBUFFER,At.__webglFramebuffer),tt.copy(A.viewport),it.copy(A.scissor),at=A.scissorTest,S.viewport(tt),S.scissor(it),S.setScissorTest(at),Z=-1;return}else if(At.__webglFramebuffer===void 0)Q.setupRenderTarget(A);else if(At.__hasExternalTextures)Q.rebindTextures(A,Y.get(A.texture).__webglTexture,Y.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let re=A.depthTexture;if(At.__boundDepthTexture!==re){if(re!==null&&Y.has(re)&&(A.width!==re.image.width||A.height!==re.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Q.setupDepthRenderbuffer(A)}}let Ut=A.texture;(Ut.isData3DTexture||Ut.isDataArrayTexture||Ut.isCompressedArrayTexture)&&(Mt=!0);let kt=Y.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(kt[F])?X=kt[F][K]:X=kt[F],q=!0):A.samples>0&&Q.useMultisampledRTT(A)===!1?X=Y.get(A).__webglMultisampledFramebuffer:Array.isArray(kt)?X=kt[K]:X=kt,tt.copy(A.viewport),it.copy(A.scissor),at=A.scissorTest}else tt.copy(_t).multiplyScalar(J).floor(),it.copy(zt).multiplyScalar(J).floor(),at=Vt;if(K!==0&&(X=O),S.bindFramebuffer(k.FRAMEBUFFER,X)&&S.drawBuffers(A,X),S.viewport(tt),S.scissor(it),S.setScissorTest(at),q){let At=Y.get(A.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+F,At.__webglTexture,K)}else if(Mt){let At=F;for(let Ut=0;Ut<A.textures.length;Ut++){let kt=Y.get(A.textures[Ut]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+Ut,kt.__webglTexture,K,At)}}else if(A!==null&&K!==0){let At=Y.get(A.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,At.__webglTexture,K)}Z=-1};function yo(A){let F=Y.get(A);return(F.__readFormat!==A.format||F.__readType!==A.type)&&(F.__readFormat=A.format,F.__readType=A.type,F.__formatReadable=P.textureFormatReadable(A.format),F.__typeReadable=P.textureTypeReadable(A.type)),F}this.readRenderTargetPixels=function(A,F,K,X,q,Mt,Pt,At=0){if(!(A&&A.isWebGLRenderTarget)){$t("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ut=Y.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Pt!==void 0&&(Ut=Ut[Pt]),Ut){S.bindFramebuffer(k.FRAMEBUFFER,Ut);try{let kt=A.textures[At],re=kt.format,pe=kt.type;A.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+At);let Ft=yo(kt);if(Ft.__formatReadable===!1){$t("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ft.__typeReadable===!1){$t("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=A.width-X&&K>=0&&K<=A.height-q&&k.readPixels(F,K,X,q,St.convert(re),St.convert(pe),Mt)}finally{let kt=$!==null?Y.get($).__webglFramebuffer:null;S.bindFramebuffer(k.FRAMEBUFFER,kt)}}},this.readRenderTargetPixelsAsync=async function(A,F,K,X,q,Mt,Pt,At=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ut=Y.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Pt!==void 0&&(Ut=Ut[Pt]),Ut)if(F>=0&&F<=A.width-X&&K>=0&&K<=A.height-q){S.bindFramebuffer(k.FRAMEBUFFER,Ut);let kt=A.textures[At],re=kt.format,pe=kt.type;A.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+At);let Ft=yo(kt);if(Ft.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ft.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Ae=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,Ae),k.bufferData(k.PIXEL_PACK_BUFFER,Mt.byteLength,k.STREAM_READ),k.readPixels(F,K,X,q,St.convert(re),St.convert(pe),0),k.bindBuffer(k.PIXEL_PACK_BUFFER,null);let ui=$!==null?Y.get($).__webglFramebuffer:null;S.bindFramebuffer(k.FRAMEBUFFER,ui);let Ge=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await H_(k,Ge,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,Ae),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,Mt),k.bindBuffer(k.PIXEL_PACK_BUFFER,null),k.deleteBuffer(Ae),k.deleteSync(Ge),Mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,F=null,K=0){let X=Math.pow(2,-K),q=Math.floor(A.image.width*X),Mt=Math.floor(A.image.height*X),Pt=F!==null?F.x:0,At=F!==null?F.y:0;Q.setTexture2D(A,0),k.copyTexSubImage2D(k.TEXTURE_2D,K,0,0,Pt,At,q,Mt),S.unbindTexture()},this.copyTextureToTexture=function(A,F,K=null,X=null,q=0,Mt=0){let Pt,At,Ut,kt,re,pe,Ft,Ae,ui,Ge=A.isCompressedTexture?A.mipmaps[Mt]:A.image;if(K!==null)Pt=K.max.x-K.min.x,At=K.max.y-K.min.y,Ut=K.isBox3?K.max.z-K.min.z:1,kt=K.min.x,re=K.min.y,pe=K.isBox3?K.min.z:0;else{let oi=Math.pow(2,-q);Pt=Math.floor(Ge.width*oi),At=Math.floor(Ge.height*oi),A.isDataArrayTexture?Ut=Ge.depth:A.isData3DTexture?Ut=Math.floor(Ge.depth*oi):Ut=1,kt=0,re=0,pe=0}X!==null?(Ft=X.x,Ae=X.y,ui=X.z):(Ft=0,Ae=0,ui=0);let Fe=St.convert(F.format),zi=St.convert(F.type),Rt;F.isData3DTexture?(Q.setTexture3D(F,0),Rt=k.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Q.setTexture2DArray(F,0),Rt=k.TEXTURE_2D_ARRAY):(Q.setTexture2D(F,0),Rt=k.TEXTURE_2D),S.activeTexture(k.TEXTURE0),S.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,F.flipY),S.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),S.pixelStorei(k.UNPACK_ALIGNMENT,F.unpackAlignment);let sn=S.getParameter(k.UNPACK_ROW_LENGTH),Me=S.getParameter(k.UNPACK_IMAGE_HEIGHT),Hn=S.getParameter(k.UNPACK_SKIP_PIXELS),ms=S.getParameter(k.UNPACK_SKIP_ROWS),js=S.getParameter(k.UNPACK_SKIP_IMAGES);S.pixelStorei(k.UNPACK_ROW_LENGTH,Ge.width),S.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Ge.height),S.pixelStorei(k.UNPACK_SKIP_PIXELS,kt),S.pixelStorei(k.UNPACK_SKIP_ROWS,re),S.pixelStorei(k.UNPACK_SKIP_IMAGES,pe);let So=A.isDataArrayTexture||A.isData3DTexture,Ne=F.isDataArrayTexture||F.isData3DTexture;if(A.isDepthTexture){let oi=Y.get(A),Qs=Y.get(F),ze=Y.get(oi.__renderTarget),tr=Y.get(Qs.__renderTarget);S.bindFramebuffer(k.READ_FRAMEBUFFER,ze.__webglFramebuffer),S.bindFramebuffer(k.DRAW_FRAMEBUFFER,tr.__webglFramebuffer);for(let Mo=0;Mo<Ut;Mo++)So&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Y.get(A).__webglTexture,q,pe+Mo),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Y.get(F).__webglTexture,Mt,ui+Mo)),k.blitFramebuffer(kt,re,Pt,At,Ft,Ae,Pt,At,k.DEPTH_BUFFER_BIT,k.NEAREST);S.bindFramebuffer(k.READ_FRAMEBUFFER,null),S.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(q!==0||A.isRenderTargetTexture||Y.has(A)){let oi=Y.get(A),Qs=Y.get(F);S.bindFramebuffer(k.READ_FRAMEBUFFER,L),S.bindFramebuffer(k.DRAW_FRAMEBUFFER,B);for(let ze=0;ze<Ut;ze++)So?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,oi.__webglTexture,q,pe+ze):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,oi.__webglTexture,q),Ne?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Qs.__webglTexture,Mt,ui+ze):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Qs.__webglTexture,Mt),q!==0?k.blitFramebuffer(kt,re,Pt,At,Ft,Ae,Pt,At,k.COLOR_BUFFER_BIT,k.NEAREST):Ne?k.copyTexSubImage3D(Rt,Mt,Ft,Ae,ui+ze,kt,re,Pt,At):k.copyTexSubImage2D(Rt,Mt,Ft,Ae,kt,re,Pt,At);S.bindFramebuffer(k.READ_FRAMEBUFFER,null),S.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else Ne?A.isDataTexture||A.isData3DTexture?k.texSubImage3D(Rt,Mt,Ft,Ae,ui,Pt,At,Ut,Fe,zi,Ge.data):F.isCompressedArrayTexture?k.compressedTexSubImage3D(Rt,Mt,Ft,Ae,ui,Pt,At,Ut,Fe,Ge.data):k.texSubImage3D(Rt,Mt,Ft,Ae,ui,Pt,At,Ut,Fe,zi,Ge):A.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,Mt,Ft,Ae,Pt,At,Fe,zi,Ge.data):A.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,Mt,Ft,Ae,Ge.width,Ge.height,Fe,Ge.data):k.texSubImage2D(k.TEXTURE_2D,Mt,Ft,Ae,Pt,At,Fe,zi,Ge);S.pixelStorei(k.UNPACK_ROW_LENGTH,sn),S.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Me),S.pixelStorei(k.UNPACK_SKIP_PIXELS,Hn),S.pixelStorei(k.UNPACK_SKIP_ROWS,ms),S.pixelStorei(k.UNPACK_SKIP_IMAGES,js),Mt===0&&F.generateMipmaps&&k.generateMipmap(Rt),S.unbindTexture()},this.initRenderTarget=function(A){Y.get(A).__webglFramebuffer===void 0&&Q.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?Q.setTextureCube(A,0):A.isData3DTexture?Q.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?Q.setTexture2DArray(A,0):Q.setTexture2D(A,0),S.unbindTexture()},this.resetState=function(){V=0,z=0,$=null,S.reset(),wt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ss}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=de._getDrawingBufferColorSpace(t),e.unpackColorSpace=de._getUnpackColorSpace()}};var Ua={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var kn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},uE=new wr(-1,1,1,-1,0,1),um=class extends Re{constructor(){super(),this.setAttribute("position",new me([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new me([0,2,0,0,2,0],2))}},fE=new um,Ir=class{constructor(t){this._mesh=new ge(fE,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,uE)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}};var Fa=class extends kn{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof Se?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=fs.clone(t.uniforms),this.material=new Se({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new Ir(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var mc=class extends kn{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){let n=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),r.buffers.stencil.setFunc(n.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(n.EQUAL,1,4294967295),r.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),r.buffers.stencil.setLocked(!0)}},df=class extends kn{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}};var pf=class{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){let i=t.getSize(new Tt);this._width=i.width,this._height=i.height,e=new ni(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:gi}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Fa(Ua),this.copyPass.material.blending=Kn,this.timer=new ql}swapBuffers(){let t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){let e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());let e=this.renderer.getRenderTarget(),i=!1;for(let n=0,r=this.passes.length;n<r;n++){let o=this.passes[n];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),o.needsSwap){if(i){let a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}mc!==void 0&&(o instanceof mc?i=!0:o instanceof df&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){let e=this.renderer.getSize(new Tt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;let i=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(i,n),this.renderTarget2.setSize(i,n);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,n)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var mf=class extends kn{constructor(t,e,i=null,n=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=n,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Wt}render(t,e,i){let n=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=n}};var yv={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Wt(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var Oa=class s extends kn{constructor(t,e=1,i,n){super(),this.strength=e,this.radius=i,this.threshold=n,this.resolution=t!==void 0?new Tt(t.x,t.y):new Tt(256,256),this.clearColor=new Wt(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new ni(r,o,{type:gi,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){let f=new ni(r,o,{type:gi,depthBuffer:!1});f.texture.name="UnrealBloomPass.h"+h,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);let u=new ni(r,o,{type:gi,depthBuffer:!1});u.texture.name="UnrealBloomPass.v"+h,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),r=Math.round(r/2),o=Math.round(o/2)}let a=yv;this.highPassUniforms=fs.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=n,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Se({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new Tt(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=fs.clone(Ua.uniforms),this.blendMaterial=new Se({uniforms:this.copyUniforms,vertexShader:Ua.vertexShader,fragmentShader:Ua.fragmentShader,premultipliedAlpha:!0,blending:wn,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Wt,this._oldClearAlpha=1,this._basic=new no,this._fsQuad=new Ir(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),n=Math.round(e/2);this.renderTargetBright.setSize(i,n);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,n),this.renderTargetsVertical[r].setSize(i,n),this.separableBlurMaterials[r].uniforms.invSize.value=new Tt(1/i,1/n),i=Math.round(i/2),n=Math.round(n/2)}render(t,e,i,n,r){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=s.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=s.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this._fsQuad.render(t),a=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(i),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(t){let e=[],i=t/3;for(let o=0;o<t;o++)e.push(.39894*Math.exp(-.5*o*o/(i*i))/i);let n=[],r=[];for(let o=1;o<t;o+=2){let a=e[o],l=o+1<t?e[o+1]:0,c=a+l;n.push((o*a+(o+1)*l)/c),r.push(c)}return new Se({defines:{KERNEL_PAIRS:n.length},uniforms:{colorTexture:{value:null},invSize:{value:new Tt(.5,.5)},direction:{value:new Tt(.5,.5)},centerWeight:{value:e[0]},gaussianOffsets:{value:n},gaussianWeights:{value:r}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(t){return new Se({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};Oa.BlurDirectionX=new Tt(1,0);Oa.BlurDirectionY=new Tt(0,1);var gc={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var gf=class extends kn{constructor(){super(),this.isOutputPass=!0,this.uniforms=fs.clone(gc.uniforms),this.material=new va({name:gc.name,uniforms:this.uniforms,vertexShader:gc.vertexShader,fragmentShader:gc.fragmentShader}),this._fsQuad=new Ir(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},de.getTransfer(this._outputColorSpace)===Te&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===$l?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===jl?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Ql?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ao?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ec?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ic?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===tc&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var _f=class extends xr{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let t=new _e;t.deleteAttribute("uv");let e=new cs({side:li}),i=new cs,n=new ro(16777215,900,28,2);n.position.set(.418,16.199,.3),this.add(n);let r=new ge(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let o=new so(t,i,6),a=new mi;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);let l=new ge(t,Ba(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new ge(t,Ba(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let h=new ge(t,Ba(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let f=new ge(t,Ba(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);let u=new ge(t,Ba(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);let d=new ge(t,Ba(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){let t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(let e of t)e.dispose()}};function Ba(s){return new Vl({color:0,emissive:16777215,emissiveIntensity:s})}var Sv={type:"change"},dm={type:"start"},bv={type:"end"},vf=new qs,Mv=new pn,dE=Math.cos(70*Js.DEG2RAD),Ti=new N,En=2*Math.PI,Ie={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},fm=1e-6,xf=class extends Kl{constructor(t,e=null){super(t,e),this.state=Ie.NONE,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Tr.ROTATE,MIDDLE:Tr.DOLLY,RIGHT:Tr.PAN},this.touches={ONE:Er.ROTATE,TWO:Er.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new N,this._lastQuaternion=new Mi,this._lastTargetPosition=new N,this._quat=new Mi().setFromUnitVectors(t.up,new N(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ba,this._sphericalDelta=new ba,this._scale=1,this._panOffset=new N,this._rotateStart=new Tt,this._rotateEnd=new Tt,this._rotateDelta=new Tt,this._panStart=new Tt,this._panEnd=new Tt,this._panDelta=new Tt,this._dollyStart=new Tt,this._dollyEnd=new Tt,this._dollyDelta=new Tt,this._dollyDirection=new N,this._mouse=new Tt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=mE.bind(this),this._onPointerDown=pE.bind(this),this._onPointerUp=gE.bind(this),this._onContextMenu=bE.bind(this),this._onMouseWheel=xE.bind(this),this._onKeyDown=yE.bind(this),this._onTouchStart=SE.bind(this),this._onTouchMove=ME.bind(this),this._onMouseDown=_E.bind(this),this._onMouseMove=vE.bind(this),this._interceptControlDown=wE.bind(this),this._interceptControlUp=TE.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=Ie.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Sv),this.update(),this.state=Ie.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;Ti.copy(e).sub(this.target),Ti.applyQuaternion(this._quat),this._spherical.setFromVector3(Ti),this.autoRotate&&this.state===Ie.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,n=this.maxAzimuthAngle;isFinite(i)&&isFinite(n)&&(i<-Math.PI?i+=En:i>Math.PI&&(i-=En),n<-Math.PI?n+=En:n>Math.PI&&(n-=En),i<=n?this._spherical.theta=Math.max(i,Math.min(n,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+n)/2?Math.max(i,this._spherical.theta):Math.min(n,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ti.setFromSpherical(this._spherical),Ti.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ti),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Ti.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let a=new N(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new N(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Ti.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(vf.origin.copy(this.object.position),vf.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(vf.direction))<dE?this.object.lookAt(this.target):(Mv.setFromNormalAndCoplanarPoint(this.object.up,this.target),vf.intersectPlane(Mv,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>fm||8*(1-this._lastQuaternion.dot(this.object.quaternion))>fm||this._lastTargetPosition.distanceToSquared(this.target)>fm?(this.dispatchEvent(Sv),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?En/60*this.autoRotateSpeed*t:En/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ti.setFromMatrixColumn(e,0),Ti.multiplyScalar(-t),this._panOffset.add(Ti)}_panUp(t,e){this.screenSpacePanning===!0?Ti.setFromMatrixColumn(e,1):(Ti.setFromMatrixColumn(e,0),Ti.crossVectors(this.object.up,Ti)),Ti.multiplyScalar(t),this._panOffset.add(Ti)}_pan(t,e){let i=this.domElement;if(this.object.isPerspectiveCamera){let n=this.object.position;Ti.copy(n).sub(this.target);let r=Ti.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),n=t-i.left,r=e-i.top,o=i.width,a=i.height;this._mouse.x=n/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(En*this._rotateDelta.x/e.clientHeight),this._rotateUp(En*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(En*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-En*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(En*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-En*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),n=.5*(t.pageY+e.y);this._rotateStart.set(i,n)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),n=.5*(t.pageY+e.y);this._panStart.set(i,n)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,n=t.pageY-e.y,r=Math.sqrt(i*i+n*n);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let i=this._getSecondPointerPosition(t),n=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(n,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(En*this._rotateDelta.x/e.clientHeight),this._rotateUp(En*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),n=.5*(t.pageY+e.y);this._panEnd.set(i,n)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,n=t.pageY-e.y,r=Math.sqrt(i*i+n*n);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Tt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function pE(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function mE(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function gE(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(bv),this.state=Ie.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function _E(s){let t;switch(s.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Tr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=Ie.DOLLY;break;case Tr.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=Ie.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=Ie.ROTATE}break;case Tr.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=Ie.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=Ie.PAN}break;default:this.state=Ie.NONE}this.state!==Ie.NONE&&this.dispatchEvent(dm)}function vE(s){switch(this.state){case Ie.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case Ie.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case Ie.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function xE(s){this.enabled===!1||this.enableZoom===!1||this.state!==Ie.NONE||(s.preventDefault(),this.dispatchEvent(dm),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(bv))}function yE(s){this.enabled!==!1&&this._handleKeyDown(s)}function SE(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case Er.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=Ie.TOUCH_ROTATE;break;case Er.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=Ie.TOUCH_PAN;break;default:this.state=Ie.NONE}break;case 2:switch(this.touches.TWO){case Er.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=Ie.TOUCH_DOLLY_PAN;break;case Er.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=Ie.TOUCH_DOLLY_ROTATE;break;default:this.state=Ie.NONE}break;default:this.state=Ie.NONE}this.state!==Ie.NONE&&this.dispatchEvent(dm)}function ME(s){switch(this._trackPointer(s),this.state){case Ie.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case Ie.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case Ie.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case Ie.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=Ie.NONE}}function bE(s){this.enabled!==!1&&s.preventDefault()}function wE(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function TE(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var _c=class s extends ge{constructor(){let t=s.SkyShader,e=new Se({name:t.name,uniforms:fs.clone(t.uniforms),vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,side:li,depthWrite:!1});super(new _e(1,1,1),e),this.isSky=!0}};_c.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new N},cloudScale:{value:2e-4},cloudSpeed:{value:2e-5},cloudCoverage:{value:.4},cloudDensity:{value:.4},cloudElevation:{value:.5},showSunDisc:{value:1},time:{value:0}},vertexShader:`
		uniform vec3 sunPosition;
		uniform float rayleigh;
		uniform float turbidity;
		uniform float mieCoefficient;

		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		// constants for atmospheric scattering
		const float e = 2.71828182845904523536028747135266249775724709369995957;
		const float pi = 3.141592653589793238462643383279502884197169;

		// wavelength of used primaries, according to preetham
		const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
		// this pre-calculation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

		// mie stuff
		// K coefficient for the primaries
		const float v = 4.0;
		const vec3 K = vec3( 0.686, 0.678, 0.666 );
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		const float cutoffAngle = 1.6110731556870734;
		const float steepness = 1.5;
		const float EE = 1000.0;

		float sunIntensity( float zenithAngleCos ) {
			zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
			return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
		}

		vec3 totalMie( float T ) {
			float c = ( 0.2 * T ) * 10E-18;
			return 0.434 * c * MieConst;
		}

		void main() {

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vWorldPosition = worldPosition.xyz;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			gl_Position.z = gl_Position.w; // set z to camera.far

			vSunDirection = normalize( sunPosition );

			vSunE = sunIntensity( vSunDirection.y );

			vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

			float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

			// extinction (absorption + out scattering)
			// rayleigh coefficients
			vBetaR = totalRayleigh * rayleighCoefficient;

			// mie coefficients
			vBetaM = totalMie( turbidity ) * mieCoefficient;

		}`,fragmentShader:`
		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		uniform float mieDirectionalG;
		uniform float cloudScale;
		uniform float cloudSpeed;
		uniform float cloudCoverage;
		uniform float cloudDensity;
		uniform float cloudElevation;
		uniform float showSunDisc;
		uniform float time;

		// gradient at a lattice corner; sinless hash so every GPU produces the same clouds
		vec2 gradient( vec2 i ) {
			vec3 p = fract( i.xyx * vec3( 0.1031, 0.1030, 0.0973 ) );
			p += dot( p, p.yzx + 33.33 );
			return fract( ( p.xx + p.yz ) * p.zy ) * 2.0 - 1.0;
		}

		// 2D gradient noise: isotropic lobes like Perlin at value-noise cost
		float noise( vec2 p ) {
			vec2 i = floor( p );
			vec2 f = fract( p );
			vec2 u = f * f * f * ( f * ( f * 6.0 - 15.0 ) + 10.0 ); // quintic fade
			float a = dot( gradient( i ), f );
			float b = dot( gradient( i + vec2( 1.0, 0.0 ) ), f - vec2( 1.0, 0.0 ) );
			float c = dot( gradient( i + vec2( 0.0, 1.0 ) ), f - vec2( 0.0, 1.0 ) );
			float d = dot( gradient( i + vec2( 1.0, 1.0 ) ), f - vec2( 1.0, 1.0 ) );
			return mix( mix( a, b, u.x ), mix( c, d, u.x ), u.y ) * 1.6; // ~[-1,1]
		}

		// fbm; per-octave drift makes clouds billow instead of scrolling as a rigid stamp
		float fbm( vec2 p, float drift ) {
			float result = 0.0;
			float amplitude = 1.0;
			for ( int i = 0; i < 4; i ++ ) {
				result += amplitude * noise( p );
				amplitude *= 0.5;
				p = p * 2.0 + drift;
			}
			return result;
		}

		// constants for atmospheric scattering
		const float pi = 3.141592653589793238462643383279502884197169;

		const float n = 1.0003; // refractive index of air
		const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		const float rayleighZenithLength = 8.4E3;
		const float mieZenithLength = 1.25E3;
		// 66 arc seconds -> degrees, and the cosine of that
		const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

		// 3.0 / ( 16.0 * pi )
		const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
		// 1.0 / ( 4.0 * pi )
		const float ONE_OVER_FOURPI = 0.07957747154594767;

		float rayleighPhase( float cosTheta ) {
			return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
		}

		float hgPhase( float cosTheta, float g ) {
			float g2 = pow( g, 2.0 );
			float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
			return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
		}

		void main() {

			vec3 direction = normalize( vWorldPosition - cameraPosition );

			// optical length
			// cutoff angle at 90 to avoid singularity in next formula.
			float zenithAngle = acos( max( 0.0, direction.y ) );
			float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
			float sR = rayleighZenithLength * inverse;
			float sM = mieZenithLength * inverse;

			// combined extinction factor
			vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

			// in scattering
			float cosTheta = dot( direction, vSunDirection );

			float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
			vec3 betaRTheta = vBetaR * rPhase;

			float mPhase = hgPhase( cosTheta, mieDirectionalG );
			vec3 betaMTheta = vBetaM * mPhase;

			vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
			Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - vSunDirection.y, 5.0 ), 0.0, 1.0 ) );

			// nightsky
			float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
			float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
			vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
			vec3 L0 = vec3( 0.1 ) * Fex;

			// composition + solar disc
			float sundisc = clamp( ( cosTheta - sunAngularDiameterCos ) * 50000.0, 0.0, 1.0 ) * showSunDisc;
			vec3 sundiscColor = ( 760.0 * sundisc ) * min( vSunE * Fex, 80.0 );

			vec3 texColor = ( Lin + L0 ) * 0.04 + sundiscColor + vec3( 0.0, 0.0003, 0.00075 );

			// Clouds
			if ( direction.y > 0.0 && cloudCoverage > 0.0 ) {

				// Project to cloud plane (higher elevation = clouds appear lower/closer)
				float elevation = mix( 1.0, 0.1, cloudElevation );
				vec2 cloudUV = direction.xz / ( direction.y * elevation );
				cloudUV *= cloudScale;
				cloudUV += time * cloudSpeed;

				// Cloud density field
				float evolve = time * cloudSpeed * 300.0;
				float cloudNoise = clamp( fbm( cloudUV * 1000.0, evolve ) * 0.7 + 0.5, 0.0, 1.0 );

				// Large-scale coverage variation: clear gaps next to dense banks
				float region = noise( cloudUV * 300.0 ) * 0.37 + 0.5;
				float cov = clamp( cloudCoverage + ( region - 0.5 ) * 0.6, 0.0, 1.0 );

				// Carve clouds where noise rises above the coverage level
				float threshold = 1.0 - cov;
				float cloudMask = smoothstep( threshold, threshold + 0.3, cloudNoise );

				// Fade clouds near horizon (adjusted by elevation)
				float horizonFade = smoothstep( 0.0, 0.03 + 0.06 * cloudElevation, direction.y );
				cloudMask *= horizonFade;

				// Cloud lighting from the sky's own radiance
				float dayFactor = smoothstep( -0.08, 0.3, vSunDirection.y );
				vec3 sunColor = vSunE * Fex * 0.22 * 0.04; // 0.22 ~ albedo/pi, 0.04 = exposure; the aerial composite adds the eye-leg extinction
				vec3 skyAmbient = Lin * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

				// Beer-powder self-shadow from the sampled density
				float depth = max( 0.0, cloudNoise - threshold );
				float beer = exp( depth * -4.0 );
				float powder = 1.0 - beer * beer; // beer*beer == exp(-8*depth)
				float shade = mix( 0.45, 1.0, clamp( beer * powder * 2.6, 0.0, 1.0 ) ); // 2.6 = 1/0.385, normalizes beer*powder peak to 1

				// Henyey-Greenstein forward lobe ( g = 0.7 ): silver lining on rims toward the sun
				float silver = clamp( 0.51 / pow( 1.49 - cosTheta * 1.4, 1.5 ), 0.0, 3.0 ); // 0.51=1-g^2, 1.49=1+g^2, 1.4=2g
				float edge = cloudMask * ( 1.0 - cloudMask ) * 4.0;

				vec3 cloudColor = skyAmbient + sunColor * shade;
				cloudColor += sunColor * silver * edge * 0.6;
				cloudColor *= max( dayFactor, 0.03 );

				// Cloud opacity via Beer's law: density sets how solid the clouds get
				float alpha = ( 1.0 - exp( depth * cloudDensity * -12.0 ) ) * horizonFade;

				// Occlude the sun disc/glow behind opaque cloud
				texColor -= L0 * 0.04 * alpha;

				// Composite through the atmosphere so distant clouds dissolve into haze
				vec3 cloudAerial = mix( texColor, cloudColor, Fex );
				texColor = mix( texColor, cloudAerial, alpha );

			}

			gl_FragColor = vec4( texColor, 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};var ds={uBuild:{value:0},uAlive:{value:0},uTime:{value:0},uSky:{value:0}},wv=`
#include <common>
uniform float uBuild;
attribute vec3 aPivot;
attribute float aDelay;
attribute float aSeed;
varying float vBp;
varying float vHeat;
varying vec3 vDsWP;
mat3 dsRotY(float a){ float c = cos(a), s = sin(a); return mat3(c,0.,-s, 0.,1.,0., s,0.,c); }
`,Tv=`
float dsBp = clamp((uBuild - aDelay) / 0.06, 0.0, 1.0);
float dsE = 1.0 - pow(1.0 - dsBp, 3.0);
float dsAng = (1.0 - dsE) * (aSeed - 0.5) * 4.0;
mat3 dsR = dsRotY(dsAng);
`,EE=Tv+`
vec3 objectNormal = dsR * vec3( normal );
#ifdef USE_TANGENT
vec3 objectTangent = vec3( tangent.xyz );
#endif
`,Ev=`
vec3 dsRel = dsR * (position - aPivot) * mix(0.35, 1.0, dsE);
vec3 dsOff = vec3((aSeed - 0.5) * 18.0, 22.0 + aSeed * 22.0, (fract(aSeed * 7.31) - 0.5) * 18.0) * (1.0 - dsE);
vec3 transformed = aPivot + dsRel + dsOff;
vBp = dsBp;
float dsSince = (uBuild - aDelay - 0.06) / 0.035;
vHeat = dsBp >= 1.0 ? exp(-max(dsSince, 0.0) * 4.0) : dsBp * dsBp;
vDsWP = (modelMatrix * vec4(transformed, 1.0)).xyz;
`,Av=`
float dsHash(vec3 p){ p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float dsNoise(vec3 x){
  vec3 i = floor(x); vec3 f = fract(x); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(dsHash(i + vec3(0,0,0)), dsHash(i + vec3(1,0,0)), f.x), mix(dsHash(i + vec3(0,1,0)), dsHash(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(dsHash(i + vec3(0,0,1)), dsHash(i + vec3(1,0,1)), f.x), mix(dsHash(i + vec3(0,1,1)), dsHash(i + vec3(1,1,1)), f.x), f.y), f.z);
}
float dsFbm(vec3 p){ float a = 0.5, s = 0.0; for (int i = 0; i < 3; i++){ s += a * dsNoise(p); p = p * 2.03 + 11.7; a *= 0.5; } return s * 1.14; }
float dsFbm2(vec3 p){ return (dsNoise(p) * 0.66 + dsNoise(p * 2.03 + 11.7) * 0.34); }
vec3 dsPerturb(vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection){
  vec3 vSigmaX = dFdx(surf_pos.xyz); vec3 vSigmaY = dFdy(surf_pos.xyz); vec3 vN = surf_norm;
  vec3 R1 = cross(vSigmaY, vN); vec3 R2 = cross(vN, vSigmaX);
  float fDet = dot(vSigmaX, R1) * faceDirection;
  vec3 vGrad = sign(fDet) * (dHdxy.x * R1 + dHdxy.y * R2);
  return normalize(abs(fDet) * surf_norm - vGrad);
}
`;function Cv({grime:s=.4,scale:t=.35,bands:e=0,corr:i=0,ground:n=!1}){let r=`
  #include <color_fragment>
  float dsN = dsFbm(vDsWP * ${t.toFixed(3)});
  float dsN2 = dsNoise(vDsWP * 3.1);
  float dsStreak = dsFbm2(vec3(vDsWP.x * 1.6 + vDsWP.z * 1.6, vDsWP.y * 0.07, vDsWP.z * 0.4));
  diffuseColor.rgb *= mix(0.8, 1.08, dsN) * mix(0.94, 1.03, dsN2);
  diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(0.62, 0.5, 0.4), ${s.toFixed(2)} * smoothstep(0.5, 0.82, dsStreak) * smoothstep(9.0, 0.0, vDsWP.y * 0.25));
  ${n?"":"diffuseColor.rgb *= mix(0.45, 1.0, smoothstep(0.0, 2.6, vDsWP.y));"}
  ${e>0?`float dsBand = smoothstep(0.0, 0.03, abs(fract(vDsWP.y / ${e.toFixed(2)}) - 0.5) - 0.465);
  diffuseColor.rgb *= 1.0 - dsBand * 0.35;`:""}
  `,o=`
  #include <roughnessmap_fragment>
  roughnessFactor = clamp(roughnessFactor * mix(0.7, 1.3, dsN) + ${s.toFixed(2)} * 0.25 * smoothstep(0.5, 0.82, dsStreak), 0.04, 1.0);
  `,a=i>0?`
  #include <normal_fragment_maps>
  float dsH = sin((vDsWP.x + vDsWP.z) * ${(Math.PI*2/i).toFixed(3)});
  dsH = smoothstep(-0.55, 0.55, dsH) * 0.05;
  normal = dsPerturb(-vViewPosition, normal, vec2(dFdx(dsH), dFdy(dsH)) * 1.0, faceDirection);
  `:"#include <normal_fragment_maps>";return{color:r,rough:o,normal:a}}var AE=`
#include <common>
uniform float uAlive;
uniform float uSky;
varying float vBp;
varying float vHeat;
varying vec3 vDsWP;
${Av}
`;function CE(s,{lamp:t=!1,heat:e=1,surface:i={}}={}){let n=new cs(s),r=Cv(i);n.onBeforeCompile=a=>{a.uniforms.uBuild=ds.uBuild,a.uniforms.uAlive=ds.uAlive,a.uniforms.uSky=ds.uSky,a.vertexShader=a.vertexShader.replace("#include <common>",wv).replace("#include <beginnormal_vertex>",EE).replace("#include <begin_vertex>",Ev),a.fragmentShader=a.fragmentShader.replace("#include <common>",AE).replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
if (vBp <= 0.0) discard;`).replace("#include <color_fragment>",t?"#include <color_fragment>":r.color).replace("#include <roughnessmap_fragment>",t?"#include <roughnessmap_fragment>":r.rough).replace("#include <normal_fragment_maps>",t?"#include <normal_fragment_maps>":r.normal).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
        ${t?"totalEmissiveRadiance *= uAlive;":""}
        totalEmissiveRadiance += vec3(1.0, 0.3, 0.06) * vHeat * ${e.toFixed(2)};`)};let o=JSON.stringify(i);return n.customProgramCacheKey=()=>`ds-build-${t?"L":"S"}-${e}-${o}`,n.userData.depth=RE(),n}var pm=null;function RE(){if(pm)return pm;let s=new xa({depthPacking:Op});return s.onBeforeCompile=t=>{t.uniforms.uBuild=ds.uBuild,t.vertexShader=t.vertexShader.replace("#include <common>",wv).replace("#include <begin_vertex>",Tv+Ev),t.fragmentShader=t.fragmentShader.replace("#include <common>",`#include <common>
varying float vBp;`).replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
if (vBp <= 0.0) discard;`)},s.customProgramCacheKey=()=>"ds-depth",pm=s,s}function Rv(){let s=new cs({color:5986127,roughness:.96,metalness:0}),t=Cv({grime:0,scale:.12,ground:!0});return s.onBeforeCompile=e=>{e.uniforms.uSky=ds.uSky,e.uniforms.uAlive=ds.uAlive,e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vDsWP;`).replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
vDsWP = (modelMatrix * vec4(transformed, 1.0)).xyz;`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
uniform float uSky; uniform float uAlive; varying vec3 vDsWP;
`+Av).replace("#include <color_fragment>",t.color+`
        float dsPatch = dsFbm(vDsWP * 0.025);
        diffuseColor.rgb = mix(diffuseColor.rgb * vec3(0.78, 0.74, 0.66), diffuseColor.rgb * vec3(1.05, 1.0, 0.92), dsPatch);
        float dsGravel = dsNoise(vDsWP * 9.0);
        diffuseColor.rgb *= mix(0.86, 1.08, dsGravel);
        diffuseColor.rgb *= uSky;`).replace("#include <roughnessmap_fragment>",t.rough)},s.customProgramCacheKey=()=>"ds-ground",s}function Pv(){let s=(t,e)=>CE(t,e);return{steel:s({color:8357522,metalness:.75,roughness:.45},{heat:1.6,surface:{grime:.5}}),dark:s({color:3685444,metalness:.6,roughness:.55},{heat:1.6,surface:{grime:.45}}),white:s({color:14211540,metalness:.08,roughness:.5},{heat:1.1,surface:{grime:.8,bands:2.4}}),alu:s({color:12896719,metalness:.9,roughness:.4},{heat:1.2,surface:{grime:.25,bands:1.1,scale:.6}}),brand:s({color:3617976,metalness:.35,roughness:.42},{heat:1.3,surface:{grime:.35}}),yellow:s({color:14854164,metalness:.15,roughness:.55},{heat:1.3,surface:{grime:.45}}),red:s({color:11810091,metalness:.2,roughness:.5},{heat:1,surface:{grime:.4}}),green:s({color:5338972,metalness:.2,roughness:.5},{heat:1,surface:{grime:.4}}),concrete:s({color:9341828,metalness:0,roughness:.95},{heat:.4,surface:{grime:.55,scale:.25}}),asphalt:s({color:3092530,metalness:0,roughness:.88},{heat:.2,surface:{grime:.1,scale:.2}}),paint:s({color:15328988,metalness:0,roughness:.7},{heat:.2,surface:{grime:.2}}),tower:s({color:11183773,metalness:0,roughness:.92,side:bn},{heat:.6,surface:{grime:.9,scale:.18}}),clad:s({color:9410982,metalness:.55,roughness:.42},{heat:1.2,surface:{grime:.4,corr:.32}}),cladBrand:s({color:3420574,metalness:.45,roughness:.42},{heat:1.2,surface:{grime:.3,corr:.32}}),contRed:s({color:10236710,metalness:.35,roughness:.55},{heat:.8,surface:{grime:.5,corr:.22}}),contBlue:s({color:2051450,metalness:.35,roughness:.55},{heat:.8,surface:{grime:.5,corr:.22}}),solar:s({color:1712976,metalness:.85,roughness:.16},{heat:1,surface:{grime:.05,scale:.9}}),lamp:s({color:723728,emissive:16757086,emissiveIntensity:2.2,roughness:1,metalness:0},{lamp:!0,heat:0}),molten:s({color:1377536,emissive:16734736,emissiveIntensity:5,roughness:1,metalness:0},{lamp:!0,heat:0})}}function fo(s,t=!1){let e=s[0].index!==null,i=new Set(Object.keys(s[0].attributes)),n=new Set(Object.keys(s[0].morphAttributes)),r={},o={},a=s[0].morphTargetsRelative,l=new Re,c=0;for(let h=0;h<s.length;++h){let f=s[h],u=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let d in f.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(f.attributes[d]),u++}if(u!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let d in f.morphAttributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(f.morphAttributes[d])}if(t){let d;if(e)d=f.index.count;else if(f.attributes.position!==void 0)d=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,h),c+=d}}if(e){let h=0,f=[];for(let u=0;u<s.length;++u){let d=s[u].index;for(let p=0;p<d.count;++p)f.push(d.getX(p)+h);h+=s[u].attributes.position.count}l.setIndex(f)}for(let h in r){let f=Iv(r[h]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,f)}for(let h in o){let f=o[h][0].length;if(f!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<f;++u){let d=[];for(let m=0;m<o[h].length;++m)d.push(o[h][m][u]);let p=Iv(d);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(p)}}}return l}function Iv(s){let t,e,i,n=-1,r=0;for(let c=0;c<s.length;++c){let h=s[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(n===-1&&(n=h.gpuType),n!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let o=new t(r),a=new ye(o,e,i),l=0;for(let c=0;c<s.length;++c){let h=s[c];if(h.isInterleavedBufferAttribute){let f=l/e;for(let u=0,d=h.count;u<d;u++)for(let p=0;p<e;p++){let m=h.getComponent(u,p);a.setComponent(u+f,p,m)}}else o.set(h.array,l);l+=h.count*e}return n!==void 0&&(a.gpuType=n),a}var PE=new N(0,1,0),Dv=new be,mm=new Mi,Lv=new Mn,Nv=new N(1,1,1),nt=(s,t,e)=>new N(s,t,e);function we(s,t=0,e=0,i=0,n=0,r=0,o=0){return Lv.set(n,r,o),s.applyMatrix4(Dv.compose(new N(t,e,i),mm.setFromEuler(Lv),Nv)),s}var Kt=(s,t,e,i,n,r,o=0)=>we(new _e(s,t,e),i,n,r,0,o,0),_i=(s,t,e,i,n,r,o=20,a=!1)=>we(new Ji(s,t,e,o,1,a),i,n+e/2,r),Uv=(s,t,e,i,n=24,r=16)=>we(new gn(s,n,r),t,e,i),po=(s,t,e,i,n,r=40)=>we(new As(s,t,6,r),e,i,n,Math.PI/2);function Fv(s,t,e){let i=new N().subVectors(e,t);return mm.setFromUnitVectors(PE,i.clone().normalize()),s.applyMatrix4(Dv.compose(t.clone().add(e).multiplyScalar(.5),mm,Nv)),s}var Jt=(s,t,e=.3,i=e)=>Fv(new _e(e,s.distanceTo(t),i),s,t),mo=(s,t,e,i=10)=>Fv(new Ji(e,e,s.distanceTo(t),i,1,!1),s,t);function ji(s,t,e,i,n=.55,r=0){let o=n*.14,a=fo([new _e(n,i,o).translate(0,0,n/2-o/2),new _e(n,i,o).translate(0,0,-n/2+o/2),new _e(o,i,n-2*o)]);return we(a,s,t+i/2,e,0,r,0)}function Qt(s){return fo(s)}var ka=class{constructor(){this.lists={},this.edgeList=[],this.pieces=[],this.lamps=[],this.cur=null}begin(t,e,i=.18){this.cur={t0:t,t1:e,jitter:i,items:[]}}end(){let t=this.cur;if(this.cur=null,!t||!t.items.length)return;let e=1/0,i=-1/0;for(let n of t.items)e=Math.min(e,n.y),i=Math.max(i,n.y);for(let n of t.items){let r=i>e?(n.y-e)/(i-e):Math.random();n.setDelay(t.t0+(t.t1-t.t0)*(r*(1-t.jitter)+Math.random()*t.jitter))}}add(t,e,{edges:i=!0,delay:n=0,edgeAngle:r=30}={}){var d;if(e.attributes.uv&&e.deleteAttribute("uv"),e.attributes.uv1&&e.deleteAttribute("uv1"),!e.index){let p=e.attributes.position.count,m=new(p>65535?Uint32Array:Uint16Array)(p);for(let g=0;g<p;g++)m[g]=g;e.setIndex(new ye(m,1))}e.computeBoundingBox();let o=e.boundingBox.getCenter(new N),a=e.attributes.position.count,l=new Float32Array(a*3);for(let p=0;p<a;p++)l[p*3]=o.x,l[p*3+1]=o.y,l[p*3+2]=o.z;let c=new Float32Array(a),h=new Float32Array(a).fill(Math.random());e.setAttribute("aPivot",new ye(l,3)),e.setAttribute("aDelay",new ye(c,1)),e.setAttribute("aSeed",new ye(h,1)),((d=this.lists)[t]||(d[t]=[])).push(e);let f=null;if(i){let p=new zl(e,r);f=new Float32Array(p.attributes.position.count),p.setAttribute("aDelay",new ye(f,1)),this.edgeList.push(p)}let u={y:o.y,pivot:o,top:e.boundingBox.max.y,size:e.boundingBox.getSize(new N).length(),delay:0,setDelay(p){c.fill(p),f&&f.fill(p),u.delay=p}};return this.cur?this.cur.items.push(u):u.setDelay(n),this.pieces.push(u),u}lamp(t,e,i,n=0){this.lamps.push(t,e,i,n)}build(t){let e=new rs,i={};for(let[r,o]of Object.entries(this.lists)){let a=fo(o);a.computeBoundingSphere();let l=new ge(a,t[r]);l.frustumCulled=!1,e.add(l),i[r]=a}let n=this.edgeList.length?fo(this.edgeList):null;return{group:e,merged:i,edges:n}}};var go=Math.random,si=Math.PI*2,xc=[{name:"Rafineri",focus:nt(-40,16,-24)},{name:"Kimya",focus:nt(-6,8,28)},{name:"Demir-\xC7elik",focus:nt(34,10,-22)},{name:"Enerji",focus:nt(56,16,30)}];function Mf(s,t=!0){let e=[new _e(.07,s,.1).translate(-.24,s/2,0),new _e(.07,s,.1).translate(.24,s/2,0)];for(let i=.3;i<s;i+=.32)e.push(new _e(.48,.035,.035).translate(0,i,0));if(t){for(let i=2.4;i<s;i+=1){let n=new As(.42,.025,4,10,Math.PI);n.rotateX(Math.PI/2),n.translate(0,i,.12),e.push(n)}for(let i of[.25,.5,.75]){let n=i*Math.PI;e.push(new _e(.03,s-2.4,.03).translate(Math.cos(n)*.42,2.4+(s-2.4)/2,.12+Math.sin(n)*.42))}}return Qt(e)}function xm(s,t,e,i,n,r=0){return we(s,t+Math.cos(n)*(i+.35),r,e+Math.sin(n)*(i+.35),0,Math.PI/2-n,0)}function Sf(s,t){return Qt([new Ji(s,s,t,12).rotateX(Math.PI/2).translate(0,0,t/2),new Ji(s*1.7,s*1.7,.12,16).rotateX(Math.PI/2).translate(0,0,t)])}function vc(s,t,e,i,n=Math.PI*1.4,r=0){let o=[new Ji(i,i,.12,32,1,!1,r,n)],a=i-.08,l=Math.max(6,Math.round(n*i/1.4)),c=(h,f)=>{let u=r+h/l*n;return nt(Math.sin(u)*a,f,Math.cos(u)*a)};for(let h=0;h<=l;h++){let f=c(h,0);if(o.push(new _e(.05,1.08,.05).translate(f.x,.54,f.z)),h<l)for(let u of[.55,1.05])o.push(Jt(c(h,u),c(h+1,u),.04))}return we(Qt(o),s,t,e)}function _o(s,t){let e=[],i=s.distanceTo(t),n=Math.max(2,Math.round(i/1.5));for(let r=0;r<=n;r++){let o=s.clone().lerp(t,r/n);e.push(new _e(.05,1.08,.05).translate(o.x,o.y+.54,o.z))}return e.push(Jt(s.clone().setY(s.y+1.05),t.clone().setY(t.y+1.05),.05)),e.push(Jt(s.clone().setY(s.y+.55),t.clone().setY(t.y+.55),.04)),Qt(e)}function IE(s,t,e,i=9){let n=[mo(s,t,e,14)],r=s.distanceTo(t),o=Math.floor(r/i),a=new N().subVectors(t,s).normalize(),l=new Mi().setFromUnitVectors(new N(0,1,0),a);for(let c=1;c<=o;c++){let h=s.clone().addScaledVector(a,c*r/(o+1)),f=new Ji(e*1.45,e*1.45,.14,14);f.applyQuaternion(l),f.translate(h.x,h.y,h.z),n.push(f)}return Qt(n)}function ym(s,t){let e=[];for(let i=0;i<s.length-1;i++)e.push(mo(s[i],s[i+1],t,12));for(let i=1;i<s.length-1;i++)e.push(new gn(t*1.05,12,8).translate(s[i].x,s[i].y,s[i].z));return Qt(e)}function bf(s,t,e,i,n,r=0,o=.06){s.begin(r,o,1);let a=4;for(let l=0;l<a;l++)for(let c=0;c<a;c++){let h=i/a,f=n/a;s.add("concrete",Kt(h-.1,.5,f-.1,t-i/2+h*(l+.5),.25,e-n/2+f*(c+.5)),{edgeAngle:80})}s.end()}function yf(s,t,e,i,n,{t0:r,t1:o,mat:a="alu",platforms:l=4}){s.begin(r,o,.1),s.add("concrete",_i(i+.45,i+.55,3.2,t,.5,e,28));let c=3;for(let p=0;p<c;p++)s.add(a,_i(i,i,(n-3)/c,t,3.7+(n-3)/c*p,e,32));s.add(a,we(new gn(i,32,10,0,si,0,Math.PI/2),t,n+.7,e)),s.add("steel",we(Sf(.35,.9),t,n+.7+i*.9,e,-Math.PI/2,0,0),{edges:!1});let h=go()*si;s.add("yellow",xm(Mf(n-3,!0),t,e,i,h,3.7),{edges:!1});let f=h+2.2,u=t+Math.cos(f)*(i+.7),d=e+Math.sin(f)*(i+.7);s.add("alu",ym([nt(t+Math.cos(f)*i*.6,n+1.2,e+Math.sin(f)*i*.6),nt(u,n+1.2,d),nt(u,2.2,d),nt(u,2.2,d+4)],.42));for(let p=0;p<5;p++){let m=go()*si,g=5+go()*(n-8);s.add("steel",we(Sf(.22+go()*.2,.7),t+Math.cos(m)*i,g,e+Math.sin(m)*i,0,Math.PI/2-m,0),{edges:!1})}for(let p=1;p<=l;p++){let m=3+p*(n-4)/l,g=go()*si;s.add("dark",vc(t,m,e,i+1.35,Math.PI*1.3,g),{edgeAngle:60}),s.lamp(t+Math.sin(g+.4)*(i+1.1),m+1.5,e+Math.cos(g+.4)*(i+1.1),0),p%2===0&&s.lamp(t+Math.sin(g+3)*(i+1.1),m+1.5,e+Math.cos(g+3)*(i+1.1),1)}s.lamp(t,n+i+2.2,e,2),s.end()}function gm(s,t,e,i,n,r){s.begin(n,r,.1);let o=i+3.2,a=8,l=[];for(let d=0;d<a;d++){let p=d/a*si;l.push([t+Math.cos(p)*i*.98,e+Math.sin(p)*i*.98])}for(let d=0;d<a;d++){let[p,m]=l[d],[g,_]=l[(d+1)%a];s.add("white",_i(.32,.32,o,p,0,m,10)),s.add("concrete",_i(.6,.6,.6,p,0,m,10),{edges:!1}),s.add("steel",Qt([Jt(nt(p,.6,m),nt(g,o-2.2,_),.09),Jt(nt(g,.6,_),nt(p,o-2.2,m),.09)]),{edges:!1})}s.add("white",we(new gn(i,40,14,0,si,Math.PI/2,Math.PI/2),t,o,e)),s.add("white",we(new gn(i,40,14,0,si,0,Math.PI/2),t,o,e)),s.add("brand",po(i+.05,.2,t,o,e,56)),s.add("dark",vc(t,o+i-.1,e,1.9,si,0),{edges:!1});let c=t+i+2.2,h=e;s.add("steel",Qt([ji(c-.9,0,h-.9,o+i,.25),ji(c+.9,0,h-.9,o+i,.25),ji(c-.9,0,h+.9,o+i,.25),ji(c+.9,0,h+.9,o+i,.25)]));let f=Math.floor((o+i)/2.6),u=[];for(let d=0;d<f;d++){let p=d*2.6,m=d%2?1:-1;u.push(Jt(nt(c-.45,p,h-.8*m),nt(c-.45,p+2.6,h+.8*m),.7,.08)),u.push(new _e(1.8,.08,1.8).translate(c,p+2.6,h))}s.add("dark",Qt(u),{edges:!1}),s.add("yellow",Jt(nt(c-.9,o+i,h),nt(t+1.7,o+i,e),.6,.6),{edges:!1}),s.lamp(t,o+i+1.4,e,0),s.lamp(c,o*.6,h,1),s.end()}function _m(s,t,e,i,n,r,o){s.begin(r,o,.1),s.add("concrete",_i(i+.7,i+.7,.6,t,0,e,40));let a=4;for(let f=0;f<a;f++)s.add("white",_i(i,i,n/a,t,.6+n/a*f,e,48,!0));s.add("white",we(new kl(i+.15,i*.16,48),t,.6+n+i*.16/2,e)),s.add("white",po(i+.25,.12,t,.6+n-1.2,e,56),{edges:!1}),s.add("dark",we(LE(i-.05),t,.6+n+.05,e),{edges:!1});let l=34,c=Math.PI*1.15,h=[];for(let f=0;f<l;f++){let u=f/l*c,d=.6+f/l*n;h.push(we(new _e(1,.07,.38),t+Math.cos(u)*(i+.6),d,e+Math.sin(u)*(i+.6),0,-u,0));let p=nt(t+Math.cos(u)*(i+1.1),d+1,e+Math.sin(u)*(i+1.1));if(h.push(new _e(.04,1,.04).translate(p.x,p.y-.5,p.z)),f>0){let m=(f-1)/l*c,g=.6+(f-1)/l*n;h.push(Jt(nt(t+Math.cos(m)*(i+1.1),g+1,e+Math.sin(m)*(i+1.1)),p,.04))}}s.add("yellow",Qt(h),{edges:!1});for(let f=0;f<3;f++){let u=Math.PI+f*.5;s.add("steel",we(Sf(.3,1.4),t+Math.cos(u)*i,1.4,e+Math.sin(u)*i,0,Math.PI/2-u,0),{edges:!1})}s.lamp(t+i*.6,.6+n+i*.15,e,0),s.lamp(t-i*.4,.6+n+i*.1,e+i*.5,1),s.end()}function LE(s){let t=[];for(let i of[.55,1.05]){let n=new As(s,.03,4,48);n.rotateX(Math.PI/2),n.translate(0,i,0),t.push(n)}let e=Math.round(si*s/1.6);for(let i=0;i<e;i++){let n=i/e*si;t.push(new _e(.05,1.08,.05).translate(Math.cos(n)*s,.54,Math.sin(n)*s))}return Qt(t)}function DE(s,t,e,i,n,r,o){s.begin(r,o,1);let a=1.3,l=.35;s.add("concrete",Kt(i-t,a,l,(t+i)/2,a/2,e)),s.add("concrete",Kt(i-t,a,l,(t+i)/2,a/2,n)),s.add("concrete",Kt(l,a,n-e,t,a/2,(e+n)/2)),s.add("concrete",Kt(l,a,n-e,i,a/2,(e+n)/2)),s.end()}function Sm(s,t,e,i,n,r,o,a,l,c="brand"){s.begin(a,l,.15);let h=[t-i/2,t+i/2],f=[e-n/2,e+n/2];for(let u of h)for(let d of f)s.add(c,ji(u,0,d,r,.5));for(let u=1;u<=o;u++){let d=u*r/o;s.add(c,Qt([Jt(nt(h[0],d,f[0]),nt(h[1],d,f[0]),.35),Jt(nt(h[0],d,f[1]),nt(h[1],d,f[1]),.35),Jt(nt(h[0],d,f[0]),nt(h[0],d,f[1]),.35),Jt(nt(h[1],d,f[0]),nt(h[1],d,f[1]),.35)])),s.add("dark",Kt(i,.1,n,t,d-.2,e),{edges:!1}),s.add("yellow",Qt([_o(nt(h[0],d-.15,f[0]),nt(h[1],d-.15,f[0])),_o(nt(h[0],d-.15,f[1]),nt(h[1],d-.15,f[1])),_o(nt(h[1],d-.15,f[0]),nt(h[1],d-.15,f[1]))]),{edges:!1}),s.lamp(t,d+2,e,0)}s.add(c,Qt([Jt(nt(h[0],0,f[0]),nt(h[1],r/o,f[0]),.18),Jt(nt(h[1],0,f[0]),nt(h[0],r/o,f[0]),.18),Jt(nt(h[0],0,f[1]),nt(h[1],r/o,f[1]),.18),Jt(nt(h[1],0,f[1]),nt(h[0],r/o,f[1]),.18)])),s.add("yellow",Mf(r,!0).translate(h[0]-.4,0,e).rotateY(0),{edges:!1}),s.end()}function Ov(s,t,e,i,n,r){s.begin(n,r-.1,.35);let h=0;for(let p=t;p<=e+.01;p+=6,h++)s.add("brand",ji(p,0,i,9.5,.55)),s.add("brand",ji(p,0,i+7,9.5,.55)),s.add("concrete",Qt([Kt(1.2,.6,1.2,p,.3,i),Kt(1.2,.6,1.2,p,.3,i+7)]),{edges:!1}),s.add("brand",Qt([Jt(nt(p,6,i),nt(p,6,i+7),.45),Jt(nt(p,9.5,i),nt(p,9.5,i+7),.45)])),p+6<=e+.01&&(s.add("brand",Qt([Jt(nt(p,6,i),nt(p+6,6,i),.3),Jt(nt(p,6,i+7),nt(p+6,6,i+7),.3),Jt(nt(p,9.5,i),nt(p+6,9.5,i),.3),Jt(nt(p,9.5,i+7),nt(p+6,9.5,i+7),.3)]),{edges:!1}),h%3===1&&s.add("brand",Qt([Jt(nt(p,.6,i),nt(p+6,6,i),.18),Jt(nt(p+6,.6,i),nt(p,6,i),.18),Jt(nt(p,.6,i+7),nt(p+6,6,i+7),.18),Jt(nt(p+6,.6,i+7),nt(p,6,i+7),.18)]),{edges:!1}),s.add("steel",Kt(6,.15,.9,p+6/2,9.5+1.2,i+7-.8),{edges:!1})),h%3===0&&s.lamp(p,9.5+.6,i+7/2,0);s.end();let f=[[.7,"alu"],[.4,"steel"],[.62,"alu"],[.3,"yellow"],[.45,"green"],[.35,"red"]],u=[[.5,"steel"],[.85,"alu"],[.3,"yellow"],[.42,"brand"]];s.begin(n+.12,r,.6);let d=(p,m)=>{p.forEach(([g,_],y)=>{let E=i+.8+y*5.4/(p.length-1),x=4,b=(e-t)/x;for(let M=0;M<x;M++){let T=nt(t+b*M,m+g+.25,E),v=nt(t+b*(M+1),m+g+.25,E);s.add(_,_==="alu"?mo(T,v,g,16):IE(T,v,g,9),{edgeAngle:50})}})};d(f,6),d(u,9.5),s.end()}function NE(s){bf(s,-40,-25,44,32,.02,.08),yf(s,-50,-30,2.6,38,{t0:.16,t1:.42,platforms:5}),yf(s,-41,-33,2,30,{t0:.18,t1:.4,mat:"white"}),yf(s,-31,-27,3.1,46,{t0:.14,t1:.46,platforms:6}),yf(s,-45,-18,1.6,24,{t0:.2,t1:.42,mat:"steel",platforms:3}),Sm(s,-37,-17,8,6,15,3,.12,.36),s.begin(.22,.44,.1),s.add("clad",Kt(12,8,7,-26,4.5,-14)),s.add("dark",Kt(12.6,.4,7.6,-26,8.6,-14)),s.add("dark",Qt([ji(-32,.5,-10.4,8,.4),ji(-20,.5,-10.4,8,.4),ji(-32,.5,-17.6,8,.4),ji(-20,.5,-17.6,8,.4)])),s.add("steel",_i(1.1,1.3,16,-26,8.8,-14,20)),s.add("red",_i(1.12,1.12,1.2,-26,22.5,-14,20)),s.add("dark",vc(-26,20,-14,2.2,si,0),{edges:!1});for(let r=0;r<5;r++)s.add("molten",Kt(1.4,.8,.1,-30.8+r*2.4,2.4,-10.45),{edges:!1});s.add("yellow",Qt([_o(nt(-32,8.8,-10.6),nt(-20,8.8,-10.6)),_o(nt(-32,8.8,-17.4),nt(-20,8.8,-17.4))]),{edges:!1}),s.lamp(-26,25.3,-14,2),s.end(),s.begin(.26,.46,.2);for(let r=0;r<3;r++){let o=-40+r*3.4;s.add("concrete",Qt([Kt(.8,1.6,2.4,-36,.8,o),Kt(.8,1.6,2.4,-30,.8,o)]),{edges:!1}),s.add("steel",mo(nt(-38.5,2.6,o),nt(-27.5,2.6,o),1.15,24)),s.add("steel",we(new gn(1.15,20,8,0,si,0,Math.PI/2),-38.5,2.6,o,0,0,Math.PI/2),{edges:!1}),s.add("steel",we(Sf(.3,1.2),-33,3.6,o,-Math.PI/2,0,0),{edges:!1})}s.end(),s.begin(.3,.5,.05);let t=-64,e=-42,i=54,n=[];for(let r=0;r<3;r++){let o=r/3*si;n.push(Jt(nt(t+Math.cos(o)*3.2,0,e+Math.sin(o)*3.2),nt(t+Math.cos(o)*.9,i-4,e+Math.sin(o)*.9),.3))}s.add("red",Qt(n));for(let r=0;r<8;r++){let o=4+r*6.2,a=3.2-r/8*2.2;s.add(r%2?"red":"paint",po(a*.62,.1,t,o,e,3),{edges:!1})}s.add("steel",_i(.75,.75,i,t,0,e,14)),s.add("red",_i(.85,.85,1.5,t,i-1.5,e,14)),s.lamp(t,i*.5,e+1,2),s.end()}function UE(s){bf(s,-4,29,44,30,.03,.09),DE(s,-25.5,30.5,15.5,43,.05,.1),gm(s,-19,21,5.6,.26,.5),gm(s,-5,21,5.6,.29,.53),gm(s,8,20,4.6,.31,.55),_m(s,-18,37,6.5,10,.3,.56),_m(s,-3,37.5,5.5,12,.32,.58),_m(s,10,36.5,4.2,9,.34,.6),Sm(s,19,25,6,6,16,3,.24,.48,"dark"),s.begin(.4,.58,.1),s.add("alu",_i(1.7,1.7,13,19,1,25,28)),s.add("alu",we(new gn(1.7,28,8,0,si,0,Math.PI/2),19,14,25)),s.add("brand",_i(1.95,1.95,5,19,4,25,28)),s.add("steel",ym([nt(19,15.2,25),nt(19,17,25),nt(14,17,25),nt(14,10.2,25),nt(14,10.2,8)],.3),{edges:!1}),s.end()}function FE(s){bf(s,36,-23,52,30,.01,.07);let t=13,e=43,i=-35,n=-15,r=12,o=16,a=(i+n)/2;s.begin(.08,.34,.2);for(let p=t;p<=e+.01;p+=5)s.add("brand",ji(p,0,i,r,.7)),s.add("brand",ji(p,0,n,r,.7)),s.add("brand",Qt([Jt(nt(p,r,i),nt(p,o,a),.6,.45),Jt(nt(p,r,n),nt(p,o,a),.6,.45)])),s.add("yellow",Qt([Kt(.6,.6,.6,p,8,i+.7),Kt(.6,.6,.6,p,8,n-.7)]),{edges:!1});s.end(),s.begin(.18,.42,.4);for(let p=0;p<=4;p++){let m=p/4;s.add("dark",Qt([Jt(nt(t,r+(o-r)*m,i+(a-i)*m),nt(e,r+(o-r)*m,i+(a-i)*m),.22),Jt(nt(t,r+(o-r)*m,n+(a-n)*m),nt(e,r+(o-r)*m,n+(a-n)*m),.22)]),{edges:!1})}s.add("dark",Qt([Jt(nt(t,8.5,i+.7),nt(e,8.5,i+.7),.5),Jt(nt(t,8.5,n-.7),nt(e,8.5,n-.7),.5)])),s.add("yellow",Qt([Kt(1.2,1.2,n-i-1.4,30,9.4,a),Kt(2,1.4,2,30,8.4,a+2)])),s.end(),s.begin(.36,.56,.5);let l=(e-t)/5,c=Math.atan2(o-r,a-i),h=Math.hypot(o-r,a-i);for(let p=0;p<l;p++){let m=t+5*p+2.5,g=p===l-1;g||(s.add("clad",we(new _e(5,.1,h),m,(r+o)/2+.4,(n+a)/2,c,0,0),{edgeAngle:80}),s.add("clad",we(new _e(5,.1,h),m,(r+o)/2+.4,(i+a)/2,-c,0,0),{edgeAngle:80}),s.add("alu",we(new _e(1.2,.12,h*.8),m,(r+o)/2+.47,(n+a)/2,c,0,0),{edges:!1})),p%3===1?(s.add("clad",Kt(5,7,.12,m,8.5,n+.42),{edgeAngle:80}),s.add("contBlue",Kt(4.4,6.8,.1,m,3.4,n+.45),{edgeAngle:80})):s.add("clad",Kt(5,r,.12,m,r/2,n+.42),{edgeAngle:80}),g||s.add("clad",Kt(5,r,.12,m,r/2,i-.42),{edgeAngle:80}),s.add("lamp",Kt(4.2,.9,.08,m,10.6,n+.5),{edges:!1}),s.lamp(m,7.5,a,0)}s.add("clad",Kt(.12,r,n-i,t-.4,r/2,a),{edgeAngle:80}),s.end(),s.begin(.3,.56,.1);let f=53,u=-17,d=[[.2,0],[5.2,0],[5.6,4],[6.6,10],[6.6,14],[5,22],[3.4,29],[3.2,34],[.2,34]].map(([p,m])=>new Tt(p,m));s.add("dark",we(new _a(d,40),f,.5,u)),s.add("steel",po(7.4,.55,f,13,u,48));for(let p=0;p<4;p++){let m=p/4*si+.4;s.add("steel",mo(nt(f+Math.cos(m)*3.2,34,u+Math.sin(m)*3.2),nt(f+Math.cos(m)*3.6,42,u+Math.sin(m)*3.6),.6))}s.add("steel",ym([nt(f,41.5,u),nt(f-9,41.5,u),nt(f-9,6,u)],.9)),s.add("dark",_i(2.6,3.2,6,f-9,0,u,20)),Sm(s,f,u,15,15,18,3,.32,.5,"dark"),s.lamp(f,43.5,u,2),s.end(),s.begin(.34,.6,.1);for(let p=0;p<3;p++){let m=48+p*6.2,g=-32;s.add("steel",_i(2.6,2.6,22,m,0,g,28)),s.add("steel",we(new gn(2.6,28,8,0,si,0,Math.PI/2),m,22,g)),s.add("brand",Qt([po(2.65,.15,m,8,g),po(2.65,.15,m,16,g)])),s.add("yellow",xm(Mf(22,!0),m,g,2.6,Math.PI/2),{edges:!1}),s.lamp(m,25,g,0)}s.end(),s.begin(.5,.62,.1),s.add("dark",_i(2.2,1.8,3,45,.5,-9.5,24)),s.add("molten",we(new Bl(2.05,28),45,3.45,-9.5,-Math.PI/2),{edges:!1}),s.add("molten",Kt(.5,.5,6,48.5,.8,-12.5),{edges:!1}),s.end()}function OE(s){s.begin(.1,.3,.6);let t=(i,n,r,o,a,l)=>{let c=[];for(let h=0;h<r;h++)for(let f=0;f<r-h;f++){let u=i+(f-(r-h-1)/2)*o*2.05,d=.5+o+h*o*1.75;c.push(mo(nt(u,d,n-a/2),nt(u,d,n+a/2),o,12))}c.push(Kt(o*2.2*r,.25,.4,i,.38,n-a*.35),Kt(o*2.2*r,.25,.4,i,.38,n+a*.35)),s.add(l,Qt(c),{edges:!1})};t(2,-30,4,.45,12,"steel"),t(7,-30,3,.6,12,"red"),t(-2.5,-24,5,.3,10,"steel");for(let i=0;i<3;i++)s.add("brand",Qt([0,1,2,3].map(n=>Jt(nt(4.5+n*.8,.85+i*.55,-26),nt(4.5+n*.8,.85+i*.55,-16),.5,.45))),{edges:!1});s.add("dark",Qt([0,1,2,3,4].map(i=>Jt(nt(0+i*.75,.8,-18),nt(0+i*.75,.8,-6),.5,.45))),{edges:!1}),s.end(),s.begin(.12,.28,.5);let e=(i,n,r,o,a)=>s.add(a,we(new _e(12.2,2.6,2.44),i,n+1.3,r,0,o,0),{edgeAngle:80});e(62,.5,-1.5,0,"contRed"),e(62,3.1,-1.5,0,"contBlue"),e(62,.5,1.4,0,"contBlue"),e(75,.5,-1.5,0,"white"),e(-7,.5,-36,Math.PI/2,"contRed"),e(-10,.5,-36,Math.PI/2,"contBlue"),e(-10,3.1,-36,Math.PI/2,"white"),s.end()}function vm(s,t,e,i,n,r="pipes"){s.begin(n,n+.06,.4);let o={cab:[],dark:[],load:[]};o.cab.push(new _e(2.5,2.8,2.4).translate(0,2,0)),o.dark.push(new _e(2.55,.9,2.2).translate(.2,2.6,0)),o.dark.push(new _e(10.5,.4,2.4).translate(-6.3,1.25,0));for(let l of[.2,-5,-6.4,-10])for(let c of[-1.05,1.05])o.dark.push(new Ji(.55,.55,.4,14).rotateX(Math.PI/2).translate(l,.55,c));if(r==="pipes")for(let l=0;l<4;l++)for(let c=0;c<2;c++)o.load.push(new Ji(.4,.4,10,10).rotateZ(Math.PI/2).translate(-6.3,1.9+c*.75,-.9+l*.6));else o.load.push(new _e(10,2.6,2.4).translate(-6.3,2.75,0));let a=l=>we(l,t,0,e,0,i,0);s.add("red",a(Qt(o.cab)),{edges:!1}),s.add("dark",a(Qt(o.dark)),{edges:!1}),s.add(r==="pipes"?"steel":"contBlue",a(Qt(o.load)),{edges:!1}),s.end()}function BE(s){bf(s,56,31,50,36,.04,.1);let t=(h,f,u,d,p)=>{s.begin(d,p,.05);let m=36*u,g=11*u,_=7.2*u,y=8.4*u,E=[],x=24;for(let M=0;M<=x;M++){let T=M/x,v=3*u+T*(m-3*u),w=.72,C=T<w?_+(g-_)*Math.pow((w-T)/w,1.7):_+(y-_)*Math.pow((T-w)/(1-w),1.6);E.push(new Tt(C,v))}for(let M=0;M<3;M++){let T=E.slice(Math.floor(M*x/3),Math.floor((M+1)*x/3)+1);s.add("tower",we(new _a(T,64),h,0,f),{edgeAngle:89})}let b=[];for(let M=0;M<28;M++){let T=M/28*si,v=T+si/28;b.push(Jt(nt(h+Math.cos(T)*g*1.04,0,f+Math.sin(T)*g*1.04),nt(h+Math.cos(v)*g,3*u,f+Math.sin(v)*g),.35))}s.add("tower",Qt(b),{edges:!1}),s.add("concrete",we(new As(g*1.12,.5,6,64),h,.6,f,Math.PI/2),{edges:!1}),s.add("tower",we(new As(y,.3,6,64),h,m,f,Math.PI/2)),s.lamp(h+y,m+.6,f,2),s.lamp(h-y,m+.6,f,2),s.end()};t(44,35,1,.38,.62),t(67,39,.9,.42,.66),s.begin(.44,.68,.05);let e=78,i=18,n=64;s.add("concrete",_i(3.2,3.6,2,e,0,i,28));for(let h=0;h<6;h++){let f=2+h*(n-2)/6,u=(n-2)/6,d=2.8-h/6*1.2,p=2.8-(h+1)/6*1.2;s.add(h>=4&&h%2===0?"red":h===5?"paint":"tower",_i(p,d,u,e,f,i,28))}s.add("dark",vc(e,n-6,i,2.6,si,0),{edges:!1}),s.add("dark",vc(e,n*.5,i,3.1,si,0),{edges:!1}),s.add("yellow",xm(Mf(n-4,!0),e,i,2.2,-Math.PI/2,2),{edges:!1}),s.lamp(e,n+.5,i,2),s.lamp(e,n*.55,i+2.4,2),s.end(),s.begin(.4,.62,.3);let r=60,o=19,a=22,l=11,c=13;for(let h=0;h<=4;h++){let f=r-a/2+h*a/4;s.add("dark",Qt([ji(f,0,o-l/2,c,.6),ji(f,0,o+l/2,c,.6)]))}s.add("clad",Kt(a+.6,.6,l+.6,r,c+.3,o)),s.add("cladBrand",Kt(a,c-2,.15,r,(c-2)/2+2,o-l/2),{edgeAngle:80}),s.add("cladBrand",Kt(a,c-2,.15,r,(c-2)/2+2,o+l/2),{edgeAngle:80}),s.add("cladBrand",Kt(.15,c,l,r+a/2,c/2,o),{edgeAngle:80}),s.add("cladBrand",Kt(.15,c,l,r-a/2,c/2,o),{edgeAngle:80}),s.add("lamp",Kt(a-2,1.2,.1,r,c-2.5,o-l/2-.1),{edges:!1}),s.add("lamp",Kt(a-2,1.2,.1,r,c-2.5,o+l/2+.1),{edges:!1}),s.lamp(r-a/2,c+1,o-l/2,0),s.lamp(r+a/2,c+1,o+l/2,0),s.end(),s.begin(.5,.68,.4);for(let h=0;h<3;h++)s.add("dark",Kt(2.6,3,2.2,36+h*4.2,1.5,21)),s.add("steel",Qt([0,1,2,3,4,5].map(f=>Kt(.08,2,1.8,37.3+h*4.2+f*.08,1.6,21))),{edges:!1}),s.add("white",Qt([0,1,2].map(f=>_i(.12,.18,1.4,35.5+h*4.2+f*.5,3,21,8))),{edges:!1});s.add("steel",Qt([_o(nt(33,.5,18.5),nt(47,.5,18.5)),_o(nt(33,.5,23.5),nt(47,.5,23.5))]),{edges:!1}),s.end()}function kE(s){s.begin(.55,.82,.6);for(let t=0;t<9;t++)for(let e=0;e<3;e++){let i=-96+e*13,n=22+t*4.4;s.add("solar",we(new _e(12,.1,2.6),i,1.6,n,-.45,0,0),{edgeAngle:80}),s.add("alu",Qt([Kt(.12,1.4,.12,i-5,.7,n+.6),Kt(.12,1.4,.12,i+5,.7,n+.6),Kt(.12,1.1,.12,i,.55,n+.6)]),{edges:!1})}s.end()}function zE(s){s.begin(.6,.78,1);let t=(e,i,n)=>{s.add("steel",Qt([new Ji(.1,.14,8,8).translate(0,4,0),new _e(1.6,.08,.08).translate(.8,7.9,0)]).rotateY(n).translate(e,0,i),{edges:!1});let r=e+Math.cos(-n)*1.5,o=i+Math.sin(-n)*1.5;s.add("lamp",Kt(.6,.12,.3,r,7.82,o),{edges:!1}),s.lamp(r,7.7,o,0)};for(let e=-66;e<=82;e+=22)t(e,-6.8,Math.PI/2),t(e+11,15.8,-Math.PI/2);for(let e=-38;e<=48;e+=22)t(-17.3,e,0),t(26.3,e+11,Math.PI);s.end()}function Bv(s,t,e,i,n,r){s.begin(n,r,.05);let o=1.1,a=[];for(let[m,g]of[[-o,-o],[o,-o],[o,o],[-o,o]])a.push(Jt(nt(t+m,0,e+g),nt(t+m,i,e+g),.18));s.add("yellow",Qt(a),{edges:!1});for(let m=0;m<i-1;m+=2.4)s.add("yellow",Qt([Jt(nt(t-o,m,e-o),nt(t+o,m+2.4,e-o),.08),Jt(nt(t+o,m,e+o),nt(t-o,m+2.4,e+o),.08),Jt(nt(t-o,m,e+o),nt(t-o,m+2.4,e-o),.08),Jt(nt(t+o,m,e-o),nt(t+o,m+2.4,e+o),.08)]),{edges:!1});s.add("concrete",Kt(5,1,5,t,.5,e)),s.end();let l=new ka;l.begin(r-.02,r+.08,.3);let c=34,h=11,f=m=>nt(m,2.2,0),u=m=>nt(m,0,-.9),d=m=>nt(m,0,.9);l.add("yellow",Qt([Jt(f(-h),f(c),.14),Jt(u(-h),u(c),.14),Jt(d(-h),d(c),.14)]),{edges:!1});let p=[];for(let m=-h;m<c;m+=2.5)p.push(Jt(u(m),f(m+1.25),.07)),p.push(Jt(f(m+1.25),d(m+2.5),.07));return l.add("yellow",Qt(p),{edges:!1}),l.add("yellow",Jt(nt(0,0,0),nt(0,7,0),.4)),l.add("steel",Qt([Jt(nt(0,7,0),nt(c*.7,2.2,0),.05),Jt(nt(0,7,0),nt(-h,2.2,0),.05)]),{edges:!1}),l.add("concrete",Kt(3.2,2.2,3,-h+1.8,-.6,0)),l.add("white",Kt(1.8,1.8,1.8,1.6,-1.4,1.6)),l.add("dark",Kt(1.2,.6,1.4,c*.62,-.4,0)),l.add("steel",Jt(nt(c*.62,-.6,0),nt(c*.62,-i*.55,0),.05),{edges:!1}),l.add("yellow",Kt(1,1.2,1,c*.62,-i*.55-.6,0)),l.lamp(0,7.4,0,2),l.end(),{jb:l,pos:nt(t,i,e)}}function HE(s,t,e,i,n,r){s.begin(n,r,.05);let o=4;for(let l=0;l<o;l++){let c=2.1-l*.35,h=2.1-(l+1)*.35;s.add("paint",_i(h,c,i/o,t,i/o*l,e,24))}s.add("paint",Kt(2.4,2.6,7,t,i+1.1,e+1.2)),s.lamp(t,i+2.7,e,2),s.end();let a=new ka;a.begin(r,r+.06,.6),a.add("paint",Uv(1.4,0,0,0,16,10));for(let l=0;l<3;l++){let c=new Ji(.25,.9,20,8,1).translate(0,11,0);c.scale(1,1,.45),a.add("paint",we(c,0,0,.4,0,0,l/3*si))}return a.end(),{rb:a,pos:nt(t,i+1.1,e-2.6)}}function kv(s){let t=new ka;t.begin(0,.05,1);let e=(f,u,d,p)=>t.add("asphalt",Kt(d,.08,p,f,.04,u),{edges:!1});e(8,-4.5,170,6),e(8,13.5,170,6),e(-15,4.5,6,100),e(24,4.5,6,100);let i=[];for(let f=-76;f<92;f+=6)i.push(Kt(2.6,.02,.15,f,.09,-4.5)),i.push(Kt(2.6,.02,.15,f,.09,13.5));for(let f=-44;f<54;f+=6)i.push(Kt(.15,.02,2.6,-15,.09,f)),i.push(Kt(.15,.02,2.6,24,.09,f));t.add("paint",Qt(i),{edges:!1}),t.end(),Ov(t,-60,66,.5,.06,.52),Ov(t,-24,-12,-9,.1,.48),NE(t),UE(t),FE(t),BE(t),kE(t),OE(t),zE(t),vm(t,14,-4.5,0,.2,"pipes"),vm(t,-40,13.5,Math.PI,.24,"box"),vm(t,24,30,Math.PI/2,.28,"pipes");let n=[],r=Bv(t,8,-12,40,.02,.16),o=Bv(t,-28,47,34,.04,.2);n.push({...r,kind:"crane",speed:.05,phase:.6}),n.push({...o,kind:"crane",speed:-.035,phase:2.2}),[[-200,120],[-150,175],[-90,215],[215,-110],[235,-40],[205,140],[-230,-60]].forEach(([f,u],d)=>{let p=HE(t,f,u,46,.6+d*.025,.7+d*.015);n.push({jb:p.rb,pos:p.pos,kind:"rotor",speed:.9+go()*.3,phase:go()*si})});let l=t.build(s),c=l.group,h=[];for(let f of n){let u=f.jb.build(s);u.group.position.copy(f.pos),c.add(u.group),h.push({obj:u.group,kind:f.kind,speed:f.speed,phase:f.phase}),t.pieces.push(...f.jb.pieces.map(d=>({...d,pivot:d.pivot.clone().add(f.pos),top:d.top+f.pos.y})));for(let d=0;d<f.jb.lamps.length;d+=4)t.lamps.push(f.jb.lamps[d]+f.pos.x,f.jb.lamps[d+1]+f.pos.y,f.jb.lamps[d+2]+f.pos.z,f.jb.lamps[d+3])}return c.traverse(f=>{f.isMesh&&(f.castShadow=!0,f.receiveShadow=!0,f.material.userData.depth&&(f.customDepthMaterial=f.material.userData.depth))}),{group:c,merged:l.merged,edges:l.edges,pieces:t.pieces,lamps:t.lamps,movers:h}}var je=new ns,wf=new N,zv=new Tt,Hv=new Tt,Vv=new Tt,Tf=class{constructor(t){this.geometry=t.geometry,this.randomFunction=Math.random,this.indexAttribute=this.geometry.index,this.positionAttribute=this.geometry.getAttribute("position"),this.normalAttribute=this.geometry.getAttribute("normal"),this.colorAttribute=this.geometry.getAttribute("color"),this.uvAttribute=this.geometry.getAttribute("uv"),this.weightAttribute=null,this.distribution=null}setWeightAttribute(t){return this.weightAttribute=t?this.geometry.getAttribute(t):null,this}build(){let t=this.indexAttribute,e=this.positionAttribute,i=this.weightAttribute,n=t?t.count/3:e.count/3,r=new Float32Array(n);for(let l=0;l<n;l++){let c=1,h=3*l,f=3*l+1,u=3*l+2;t&&(h=t.getX(h),f=t.getX(f),u=t.getX(u)),i&&(c=i.getX(h)+i.getX(f)+i.getX(u)),je.a.fromBufferAttribute(e,h),je.b.fromBufferAttribute(e,f),je.c.fromBufferAttribute(e,u),c*=je.getArea(),r[l]=c}let o=new Float32Array(n),a=0;for(let l=0;l<n;l++)a+=r[l],o[l]=a;return this.distribution=o,this}setRandomGenerator(t){return this.randomFunction=t,this}sample(t,e,i,n){let r=this._sampleFaceIndex();return this._sampleFace(r,t,e,i,n)}_sampleFaceIndex(){let t=this.distribution[this.distribution.length-1];return this._binarySearch(this.randomFunction()*t)}_binarySearch(t){let e=this.distribution,i=0,n=e.length-1,r=-1;for(;i<=n;){let o=Math.ceil((i+n)/2);if(o===0||e[o-1]<=t&&e[o]>t){r=o;break}else t<e[o]?n=o-1:i=o+1}return r}_sampleFace(t,e,i,n,r){let o=this.randomFunction(),a=this.randomFunction();o+a>1&&(o=1-o,a=1-a);let l=this.indexAttribute,c=t*3,h=t*3+1,f=t*3+2;return l&&(c=l.getX(c),h=l.getX(h),f=l.getX(f)),je.a.fromBufferAttribute(this.positionAttribute,c),je.b.fromBufferAttribute(this.positionAttribute,h),je.c.fromBufferAttribute(this.positionAttribute,f),e.set(0,0,0).addScaledVector(je.a,o).addScaledVector(je.b,a).addScaledVector(je.c,1-(o+a)),i!==void 0&&(this.normalAttribute!==void 0?(je.a.fromBufferAttribute(this.normalAttribute,c),je.b.fromBufferAttribute(this.normalAttribute,h),je.c.fromBufferAttribute(this.normalAttribute,f),i.set(0,0,0).addScaledVector(je.a,o).addScaledVector(je.b,a).addScaledVector(je.c,1-(o+a)).normalize()):je.getNormal(i)),n!==void 0&&this.colorAttribute!==void 0&&(je.a.fromBufferAttribute(this.colorAttribute,c),je.b.fromBufferAttribute(this.colorAttribute,h),je.c.fromBufferAttribute(this.colorAttribute,f),wf.set(0,0,0).addScaledVector(je.a,o).addScaledVector(je.b,a).addScaledVector(je.c,1-(o+a)),n.r=wf.x,n.g=wf.y,n.b=wf.z),r!==void 0&&this.uvAttribute!==void 0&&(zv.fromBufferAttribute(this.uvAttribute,c),Hv.fromBufferAttribute(this.uvAttribute,h),Vv.fromBufferAttribute(this.uvAttribute,f),r.set(0,0).addScaledVector(zv,o).addScaledVector(Hv,a).addScaledVector(Vv,1-(o+a))),this}};var VE=`
uniform float uTime;
uniform float uConverge;
uniform float uPR;
uniform float uSize;
uniform vec3 uMouse;
uniform float uMouseOn;
attribute vec4 aSeed;
attribute vec3 aTarget;
attribute float aHot;
varying vec3 vCol;
varying float vA;

vec3 vortex(vec4 s, float t){
  float h = s.y;
  float rad = mix(1.4, 30.0, pow(h, 1.65)) * (0.25 + 0.75 * s.x);
  float spin = (0.5 + 1.5 * (1.0 - h)) * (0.7 + 0.6 * s.w);
  float ang = s.z * 6.2831853 + t * spin * 1.1;
  vec3 p = vec3(cos(ang) * rad, h * 54.0 - 2.0, sin(ang) * rad);
  p.x += sin(h * 3.3 + t * 0.42) * 5.0 * h;
  p.z += cos(h * 2.6 + t * 0.35) * 3.5 * h;
  p.y += sin(t * 1.7 + s.z * 40.0) * 0.6;
  return p;
}

void main(){
  vec3 vp = vortex(aSeed, uTime);
  float k = clamp(uConverge * 1.7 - aSeed.w * 0.7, 0.0, 1.0);
  float e = k * k * (3.0 - 2.0 * k);
  vec3 p = mix(vp, aTarget, e);
  p.y += sin(e * 3.14159) * (10.0 + aSeed.x * 14.0);
  vec3 d = p - uMouse;
  float dl2 = dot(d, d);
  p += normalize(d + 1e-4) * uMouseOn * (1.0 - e) * 9.0 * exp(-dl2 / 70.0);

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;

  vec3 steel = mix(vec3(0.42, 0.47, 0.75), vec3(0.85, 0.88, 1.0), aSeed.x);
  vec3 hot = vec3(2.6, 0.85, 0.22);
  vec3 blue = vec3(0.45, 0.5, 1.5);
  vec3 c = mix(steel, hot, aHot);
  vCol = mix(c, blue, e);
  vA = mix((0.4 + aHot * 0.55) * (0.35 + 0.65 * smoothstep(0.0, 0.45, aSeed.y)), 0.7, e);
  float sz = uSize * (0.55 + aSeed.x * 1.1) * mix(1.0 + aHot * 0.6, 0.75, e);
  gl_PointSize = sz * uPR * (110.0 / -mv.z);
}
`,GE=`
uniform float uOpacity;
varying vec3 vCol;
varying float vA;
void main(){
  vec2 q = gl_PointCoord - 0.5;
  float r = length(q);
  if (r > 0.5) discard;
  float a = smoothstep(0.5, 0.0, r);
  a = a * a;
  gl_FragColor = vec4(vCol * a * vA * uOpacity, 1.0);
}
`;function Gv(s,t){let e=Object.entries(s).filter(([C])=>C!=="concrete"&&C!=="lamp"&&C!=="molten").map(([,C])=>{let D=new Re;return D.setAttribute("position",C.attributes.position),D.setIndex(C.index),D}),i=fo(e),n=new Tf(new ge(i)).build(),r=new Float32Array(t*4),o=new Float32Array(t*3),a=new Float32Array(t),l=new Float32Array(t*3),c=new N;for(let C=0;C<t;C++)r[C*4]=Math.random(),r[C*4+1]=Math.pow(Math.random(),.85),r[C*4+2]=Math.random(),r[C*4+3]=Math.random(),n.sample(c),o[C*3]=c.x,o[C*3+1]=c.y,o[C*3+2]=c.z,a[C]=Math.random()<.09?1:0;let h=new Re;h.setAttribute("position",new ye(l,3)),h.setAttribute("aSeed",new ye(r,4)),h.setAttribute("aTarget",new ye(o,3)),h.setAttribute("aHot",new ye(a,1));let f={uTime:{value:0},uConverge:{value:0},uPR:{value:1},uSize:{value:2.2},uMouse:{value:new N(0,-999,0)},uMouseOn:{value:0},uOpacity:{value:1}},u=new Se({vertexShader:VE,fragmentShader:GE,uniforms:f,transparent:!0,depthWrite:!1,blending:wn}),d=new Zs(h,u);d.frustumCulled=!1;let p=Math.round(t/45),m=new Hl(.42,0);m.scale(1,.35,1.8);let g=new cs({color:12107736,metalness:1,roughness:.22,envMapIntensity:1.6}),_=new so(m,g,p);_.frustumCulled=!1;let y=[];for(let C=0;C<p;C++)y.push([Math.random(),Math.pow(Math.random(),1.1),Math.random(),Math.random(),Math.random()*10]);let E=new be,x=new Mi,b=new Mn,M=new N,T=new N;function v(C,D,I){let O=C[1],L=(1.4+(30-1.4)*Math.pow(O,1.65))*(.25+.75*C[0]),B=(.5+1.5*(1-O))*(.7+.6*C[3]),V=C[2]*Math.PI*2+D*B*1.1;return I.set(Math.cos(V)*L+Math.sin(O*3.3+D*.42)*5*O,O*54-2,Math.sin(V)*L+Math.cos(O*2.6+D*.35)*3.5*O),I}function w(C,D,I){f.uTime.value=C,f.uConverge.value=D;let O=I*(1-Math.min(1,D*2.2));if(_.visible=O>.01,!!_.visible){for(let L=0;L<p;L++){let B=y[L];v(B,C,M),M.y+=Math.sin(C*1.3+B[4])*.8,b.set(C*(1+B[3]*2)+B[4],C*.7+B[2]*6,B[4]),x.setFromEuler(b);let V=O*(.5+B[0]*1.2);T.set(V,V,V),E.compose(M,x,T),_.setMatrixAt(L,E)}_.instanceMatrix.needsUpdate=!0}}return{points:d,shards:_,uniforms:f,update:w}}function Wv(){let s={uGrid:{value:.4},uTime:{value:0},uScan:{value:0}},t=new Se({uniforms:s,transparent:!0,depthWrite:!1,vertexShader:`
      varying vec3 vW;
      void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,fragmentShader:`
      uniform float uGrid; uniform float uTime; uniform float uScan;
      varying vec3 vW;
      float gridLine(vec2 p, float s, float w){ vec2 g = abs(fract(p / s - 0.5) - 0.5) / fwidth(p / s); return 1.0 - min(min(g.x, g.y) / w, 1.0); }
      void main(){
        float d = length(vW.xz);
        float minor = gridLine(vW.xz, 4.0, 1.0) * 0.35;
        float major = gridLine(vW.xz, 20.0, 1.2);
        float fade = exp(-d * 0.0095);
        float scan = smoothstep(5.0, 0.0, abs(d - uScan)) * step(0.01, uScan) * 0.55;
        vec3 col = vec3(0.32, 0.34, 0.95) * (minor + major * 0.8) * uGrid * fade;
        col += vec3(0.5, 0.55, 1.6) * scan * fade * (0.25 + major);
        float glow = exp(-d * 0.012) * 0.07 * uGrid;
        col += vec3(0.12, 0.1, 0.35) * glow;
        gl_FragColor = vec4(col, 1.0);
      }`,blending:wn}),e=new ge(new ls(900,900).rotateX(-Math.PI/2),t);return e.position.y=.01,e.renderOrder=-1,{mesh:e,uniforms:s}}function Xv(s){let t={uDraw:{value:0},uLines:{value:0}},e=new Se({uniforms:t,transparent:!0,depthWrite:!1,blending:wn,vertexShader:`
      uniform float uDraw;
      attribute float aDelay;
      varying float vT; varying float vD;
      void main(){
        vT = clamp((uDraw * 1.12 - aDelay) / 0.12, 0.0, 1.0);
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vD = -mv.z;
        gl_Position = projectionMatrix * mv;
      }`,fragmentShader:`
      uniform float uLines;
      varying float vT; varying float vD;
      void main(){
        if (vT <= 0.0) discard;
        vec3 base = vec3(0.2, 0.23, 0.62);
        vec3 head = vec3(1.3, 1.2, 1.6);
        float flash = (1.0 - vT) * step(vT, 0.999);
        vec3 c = mix(base, head, flash * flash);
        float fog = exp(-vD * 0.0045);
        gl_FragColor = vec4(c * uLines * fog, 1.0);
      }`}),i=new Ul(s,e);return i.frustumCulled=!1,{lines:i,uniforms:t}}function Yv(s){let t=s.length/4,e=new Float32Array(t*3),i=new Float32Array(t),n=new Float32Array(t);for(let c=0;c<t;c++)e[c*3]=s[c*4],e[c*3+1]=s[c*4+1],e[c*3+2]=s[c*4+2],i[c]=s[c*4+3],n[c]=Math.random();let r=new Re;r.setAttribute("position",new ye(e,3)),r.setAttribute("aKind",new ye(i,1)),r.setAttribute("aDelay",new ye(n,1));let o={uAlive:{value:0},uTime:{value:0},uPR:{value:1}},a=new Se({uniforms:o,transparent:!0,depthWrite:!1,blending:wn,vertexShader:`
      uniform float uAlive; uniform float uTime; uniform float uPR;
      attribute float aKind; attribute float aDelay;
      varying vec3 vC; varying float vA;
      void main(){
        float on = clamp((uAlive * 1.3 - aDelay * 0.3) / 0.25, 0.0, 1.0);
        float blink = aKind > 1.5 ? step(0.5, fract(uTime * 0.6 + aDelay)) : 1.0;
        vA = on * blink;
        vC = aKind < 0.5 ? vec3(3.2, 1.9, 0.8) : aKind < 1.5 ? vec3(2.4, 2.6, 3.2) : vec3(4.0, 0.35, 0.25);
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = (aKind > 1.5 ? 7.0 : 5.0) * uPR * (60.0 / -mv.z) + 1.5 * uPR;
      }`,fragmentShader:`
      varying vec3 vC; varying float vA;
      void main(){
        float r = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, r);
        gl_FragColor = vec4(vC * a * a * vA, 1.0);
      }`}),l=new Zs(r,a);return l.frustumCulled=!1,{points:l,uniforms:o}}function qv(s=2400){let t=new Float32Array(s*3),e=new Float32Array(s),i=new Float32Array(s*3),n=new Float32Array(s),r=new Re,o=new ye(t,3).setUsage(af),a=new ye(e,1).setUsage(af);r.setAttribute("position",o),r.setAttribute("aLife",a);let l={uPR:{value:1}},c=new Se({uniforms:l,transparent:!0,depthWrite:!1,blending:wn,vertexShader:`
      uniform float uPR; attribute float aLife; varying float vL;
      void main(){
        vL = aLife;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = aLife <= 0.0 ? 0.0 : (2.0 + aLife * 4.0) * uPR * (70.0 / -mv.z) + 1.0;
      }`,fragmentShader:`
      varying float vL;
      void main(){
        if (vL <= 0.0) discard;
        float r = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, r);
        vec3 c = mix(vec3(3.0, 0.5, 0.08), vec3(4.0, 3.2, 2.2), vL * vL);
        gl_FragColor = vec4(c * a * vL, 1.0);
      }`}),h=new Zs(r,c);h.frustumCulled=!1;let f=0,u=0;function d(g,_,y,E,x=1){u+=E;for(let b=0;b<E;b++){let M=f;f=(f+1)%s,t[M*3]=g,t[M*3+1]=_,t[M*3+2]=y;let T=Math.random()*Math.PI*2,v=(3+Math.random()*9)*x;i[M*3]=Math.cos(T)*v*.6,i[M*3+1]=(2+Math.random()*8)*x,i[M*3+2]=Math.sin(T)*v*.6,n[M]=.5+Math.random()*.9,e[M]=1}}function p(g){if(u<=0){h.visible=!1;return}h.visible=!0;let _=0;for(let y=0;y<s;y++)e[y]<=0||(_++,e[y]-=g/n[y],i[y*3+1]-=22*g,t[y*3]+=i[y*3]*g,t[y*3+1]+=i[y*3+1]*g,t[y*3+2]+=i[y*3+2]*g,t[y*3+1]<.1&&(t[y*3+1]=.1,i[y*3+1]*=-.3,i[y*3]*=.6,i[y*3+2]*=.6));u=_,o.needsUpdate=!0,a.needsUpdate=!0}function m(){e.fill(0),u=0,h.visible=!1}return{points:h,uniforms:l,emit:d,update:p,clear:m}}function WE(){let s=document.createElement("canvas");s.width=s.height=64;let t=s.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,32);e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.35,"rgba(255,255,255,.55)"),e.addColorStop(.7,"rgba(255,255,255,.15)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,64,64);let i=new ga(s);return i.colorSpace=Ii,i}function Zv(s,t=70){let e=s.length*t,i=new Float32Array(e*3),n=new Float32Array(e*4),r=new Float32Array(e*4);for(let h=0;h<e;h++){let f=s[Math.floor(h/t)];r[h*4]=f.x,r[h*4+1]=f.y,r[h*4+2]=f.z,r[h*4+3]=f.r,n[h*4]=Math.random(),n[h*4+1]=Math.random(),n[h*4+2]=Math.random(),n[h*4+3]=Math.random()}let o=new Re;o.setAttribute("position",new ye(i,3)),o.setAttribute("aSeed",new ye(n,4)),o.setAttribute("aSrc",new ye(r,4));let a={uTime:{value:0},uAlive:{value:0},uPR:{value:1},uMap:{value:WE()}},l=new Se({uniforms:a,transparent:!0,depthWrite:!1,vertexShader:`
      uniform float uTime; uniform float uAlive; uniform float uPR;
      attribute vec4 aSeed; attribute vec4 aSrc;
      varying float vA; varying float vR;
      void main(){
        float t = fract(uTime * (0.04 + aSeed.w * 0.025) + aSeed.x);
        float a = aSeed.y * 6.2831;
        float r = aSrc.w * (0.1 + 0.6 * aSeed.z) * (1.0 + t * 1.2);
        vec3 p = aSrc.xyz + vec3(cos(a) * r + t * t * 30.0, t * 34.0, sin(a) * r + t * 8.0);
        vA = smoothstep(0.0, 0.12, t) * (1.0 - t) * uAlive;
        vR = aSeed.x * 6.28 + uTime * 0.1;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = (110.0 + t * 380.0) * uPR * (60.0 / -mv.z);
      }`,fragmentShader:`
      uniform sampler2D uMap; varying float vA; varying float vR;
      void main(){
        vec4 tx = texture2D(uMap, gl_PointCoord);
        gl_FragColor = vec4(vec3(0.62, 0.63, 0.7), tx.a * vA * 0.055);
      }`}),c=new Zs(o,l);return c.frustumCulled=!1,{points:c,uniforms:a}}function Kv(s){let t={uTime:{value:0},uAlive:{value:0}},e=new Se({uniforms:t,transparent:!0,depthWrite:!1,blending:wn,side:bn,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
      uniform float uTime; uniform float uAlive; varying vec2 vUv;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
        return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y); }
      void main(){
        vec2 uv = vUv;
        float n = noise(vec2(uv.x * 4.0, uv.y * 3.0 - uTime * 3.2)) * 0.6 + noise(vec2(uv.x * 9.0, uv.y * 7.0 - uTime * 5.0)) * 0.4;
        float w = (1.0 - uv.y) * 0.42 + 0.04;
        float d = abs(uv.x - 0.5 + (n - 0.5) * 0.25 * uv.y);
        float body = smoothstep(w, w * 0.2, d) * smoothstep(1.0, 0.25, uv.y + n * 0.35) * smoothstep(0.0, 0.08, uv.y);
        vec3 c = mix(vec3(3.5, 0.9, 0.15), vec3(4.0, 3.0, 1.4), smoothstep(0.35, 0.95, body));
        gl_FragColor = vec4(c * body * uAlive, 1.0);
      }`}),i=new rs;for(let n=0;n<2;n++){let r=new ge(new ls(5,11).translate(0,5.3,0),e);r.rotation.y=n*(Math.PI/2),i.add(r)}return i.position.copy(s),{group:i,uniforms:t}}function Jv(s){let t=document.createElement("canvas");t.width=1024,t.height=128;let e=t.getContext("2d"),i=()=>{e.fillStyle="#000",e.fillRect(0,0,1024,128),e.textBaseline="middle",e.fillStyle="#fff";let l="DEM\u0130R",c="STORM";e.font="900 92px Archivo, Arial Black, sans-serif";let h=e.measureText(l).width;e.font="300 92px Archivo, Arial, sans-serif";let f=e.measureText(c).width,u=(1024-h-f)/2;e.font="900 92px Archivo, Arial Black, sans-serif",e.fillText(l,u,68),e.font="300 92px Archivo, Arial, sans-serif",e.fillText(c,u+h,68)};i();let n=new ga(t);n.colorSpace=Ii;let r={uMap:{value:n},uAlive:{value:0}},o=new Se({uniforms:r,transparent:!0,depthWrite:!1,blending:wn,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform sampler2D uMap; uniform float uAlive; varying vec2 vUv;
      void main(){ float a = texture2D(uMap, vUv).r; gl_FragColor = vec4(vec3(0.75, 0.74, 2.6) * a * uAlive, 1.0); }`}),a=new ge(new ls(22,2.75),o);return a.position.copy(s),{mesh:a,uniforms:r,redraw:()=>{i(),n.needsUpdate=!0}}}var XE={uniforms:{tDiffuse:{value:null}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
    uniform sampler2D tDiffuse; varying vec2 vUv;
    void main(){
      vec2 c = vUv - 0.5;
      float d = dot(c, c);
      vec3 col = texture2D(tDiffuse, vUv).rgb;
      col *= mix(1.0, smoothstep(0.85, 0.15, d * 1.9), 0.9);
      float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
      col = mix(vec3(lum), col, 0.9);
      col = mix(col, col * col * (3.0 - 2.0 * col), 0.22);
      gl_FragColor = vec4(col, 1.0);
    }`},Le=(s,t,e)=>s+(t-s)*e,YE=s=>s*s*(3-2*s),Mm=Js.smoothstep,qE=new N(0,1,0),yc=[{pixels:9e5,shadow:0,bloom:!1,msaa:0},{pixels:15e5,shadow:1024,bloom:!0,msaa:0},{pixels:24e5,shadow:2048,bloom:!0,msaa:4}],Ef=class{constructor(t,{mobile:e}){this.canvas=t,this.mobile=e,this.quality=e?1:2,this.keys=[],this.anchors=[],this.mouse=new Tt,this.mouseS=new Tt,this.state={},this.explore=0,this.exploreTarget=0,this.exploreSun=16,this.orbitAngle=0,this.time=0,this.lastBuild=0,this.sparkPtr=0,this.slowTime=0,this.lastAdapt=0,this.shadowKey="",this.frame=0,this.tmp={cam:new N,look:new N,hit:new N,fog:new Wt,ray:new Zl,plane:new pn(new N(0,0,1),0),proj:new N},this.fogDay=new Wt().setRGB(.68,.62,.55),this.fogDusk=new Wt().setRGB(.12,.13,.2),this.fogVoid=new Wt(329228);let i=this.renderer=new hf({canvas:t,antialias:!1,powerPreference:"high-performance",stencil:!1});i.setClearColor(329228,1),i.toneMapping=ao,i.toneMappingExposure=1.05,i.outputColorSpace=Ii,i.shadowMap.type=gu,i.shadowMap.autoUpdate=!1,i.shadowMap.enabled=yc[this.quality].shadow>0;let n=this.scene=new xr;n.fog=new Il(329228,.0052);let r=this.pmrem=new La(i);this.roomEnv=r.fromScene(new _f,.04,.1,100,{size:128}).texture,n.environment=this.roomEnv,n.environmentIntensity=.32,this.camera=new Li(42,1,.5,2600),this.exCam=new Li(42,1,.5,1400),this.exCam.position.set(110,70,130);let o=this.controls=new xf(this.exCam,t);o.enabled=!1,o.enableDamping=!0,o.dampingFactor=.06,o.target.set(0,8,0),o.maxPolarAngle=Math.PI*.47,o.minDistance=25,o.maxDistance=260,o.autoRotate=!0,o.autoRotateSpeed=.4,o.addEventListener("start",()=>{o.autoRotate=!1}),this.hemi=new Wl(6976712,460813,.55);let a=this.sun=new Sa(16773340,0);a.castShadow=!0,Object.assign(a.shadow.camera,{left:-125,right:125,top:125,bottom:-125,near:10,far:520}),a.shadow.bias=-4e-4,a.shadow.normalBias=.06,this.moon=new Sa(11845887,1.25),this.moon.position.set(-80,120,60),this.furnaceLight=new ro(16737304,0,70,1.6),this.furnaceLight.position.set(44,6,-10),n.add(this.hemi,a,a.target,this.moon,this.furnaceLight),this.skyScene=new xr,this.sky=new _c,this.sky.scale.setScalar(900),this.skyScene.add(this.sky);let l=this.sky.material.uniforms;Object.assign(l.turbidity,{value:4}),l.rayleigh.value=2.4,l.mieCoefficient.value=.004,l.mieDirectionalG.value=.86,l.cloudCoverage.value=.34,l.cloudDensity.value=.5,l.cloudElevation.value=.55,l.showSunDisc.value=0,this.skyCache=new Map,this.cubeCam=new Ma(1,1e3,new uo(128)),this.skyEnv=null,this.skyKey=null,this.sunDir=new N,this.dome=new ge(new gn(1200,32,16),new Se({uniforms:{uCube:{value:null},uFog:{value:new Wt},uInt:{value:0}},vertexShader:"varying vec3 vDir; void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vDir = w.xyz - cameraPosition; gl_Position = projectionMatrix * viewMatrix * w; gl_Position.z = gl_Position.w * 0.99999; }",fragmentShader:`uniform samplerCube uCube; uniform vec3 uFog; uniform float uInt; varying vec3 vDir;
          void main(){ vec3 d = normalize(vDir); vec3 c = textureCube(uCube, vec3(d.x, max(d.y, 0.02), d.z)).rgb * uInt;
            float k = smoothstep(-0.01, 0.16, d.y); gl_FragColor = vec4(mix(uFog, c, k), 1.0); }`,side:li,depthWrite:!1,fog:!1})),this.dome.frustumCulled=!1,this.dome.renderOrder=-10,n.add(this.dome),this.groundMesh=new ge(new ls(2400,2400).rotateX(-Math.PI/2),Rv()),this.groundMesh.receiveShadow=!0,n.add(this.groundMesh);let c=this.plant=kv(Pv());n.add(c.group),this.pieces=[...c.pieces].sort((h,f)=>h.delay-f.delay),this.cranes=c.movers.filter(h=>h.kind==="crane"),this.ground=Wv(),this.blue=Xv(c.edges),this.lamps=Yv(c.lamps),this.sparks=qv(e?1200:2400),this.steam=Zv([{x:44,y:36,z:35,r:8.4},{x:67,y:32.4,z:39,r:7.5},{x:78,y:64,z:18,r:1.4}],e?50:110),this.flame=Kv(new N(-64,54,-42)),this.sign=Jv(new N(28,6.4,-14.42)),this.storm=Gv(c.merged,e?12e3:28e3),n.add(this.ground.mesh,this.blue.lines,this.lamps.points,this.sparks.points,this.steam.points,this.flame.group,this.sign.mesh,this.storm.points,this.storm.shards),this.welds=[new N(19,1.2,-24),new N(33,1.6,-29),new N(26,2.6,-19.5)],this.zoneScreen=xc.map(()=>({x:0,y:0,vis:!1})),this.composer=new pf(i,new ni(4,4,{type:gi,samples:yc[this.quality].msaa})),this.composer.addPass(new mf(n,this.camera)),this.bloom=new Oa(new Tt(256,256),.85,.55,.82),this.composer.addPass(this.bloom),this.composer.addPass(new gf),this.composer.addPass(new Fa(XE)),this.applyQuality(),window.addEventListener("resize",()=>this.resize()),window.addEventListener("pointermove",h=>{this.mouse.set(h.clientX/innerWidth*2-1,-(h.clientY/innerHeight)*2+1)},{passive:!0})}warmup(){for(let e=-6;e<=20;e+=2)this.skyFor(e);let t=[...new Set(this.anchors)].sort((e,i)=>e-i);for(let e of t)this.render(.016,e);this.render(.016,t[t.length-1]||0),this.lastBuild=0,this.sparkPtr=0,this.sparks.clear(),this.time=0,this.render(.016,0)}dpr(){let t=yc[this.quality],e=Math.sqrt(t.pixels/(innerWidth*innerHeight));return Math.max(.6,Math.min(window.devicePixelRatio||1,e,2))}applyQuality(){let t=yc[this.quality];t.shadow&&(this.sun.shadow.mapSize.set(t.shadow,t.shadow),this.sun.shadow.map&&(this.sun.shadow.map.dispose(),this.sun.shadow.map=null)),this.bloom.enabled=t.bloom;for(let e of[this.composer.renderTarget1,this.composer.renderTarget2])e.samples!==t.msaa&&(e.samples=t.msaa,e.dispose());this.shadowKey="",this.resize()}resize(){let t=innerWidth,e=innerHeight,i=this.dpr();this.renderer.setPixelRatio(i),this.renderer.setSize(t,e,!1),this.composer.setPixelRatio(i),this.composer.setSize(t,e);for(let r of[this.camera,this.exCam])r.aspect=t/e,r.updateProjectionMatrix();let n=i*(e/900);this.storm.uniforms.uPR.value=n,this.lamps.uniforms.uPR.value=n,this.sparks.uniforms.uPR.value=n,this.steam.uniforms.uPR.value=n,this.w=t,this.h=e,this.layout()}setKeys(t){let e={};this.keys=t.map(i=>{let n={...e,...i.s};return e=n,{...i,s:n}}),this.layout()}layout(){let t=innerHeight;this.anchors=this.keys.map(e=>{let i=document.querySelector(e.sel);if(!i)return 0;let n=i.getBoundingClientRect().top+window.scrollY,r=i.offsetHeight;return e.sticky?n+e.at*(r-t):n-t+e.at*(r+t)})}sample(t){let e=this.keys,i=this.anchors;if(!e.length)return null;if(t<=i[0])return e[0].s;for(let n=0;n<e.length-1;n++)if(t<i[n+1]){let r=YE(Math.min(1,Math.max(0,(t-i[n])/Math.max(1,i[n+1]-i[n])))),o=e[n].s,a=e[n+1].s,l=this.sampled||(this.sampled={});for(let c in a){let h=o[c],f=a[c];if(Array.isArray(f)){let u=l[c]&&l[c].length===f.length?l[c]:l[c]=[];for(let d=0;d<f.length;d++)u[d]=Le(h?h[d]:f[d],f[d],r)}else typeof f=="number"?l[c]=Le(h??f,f,r):l[c]=r<.5&&h!==void 0?h:f}return l}return e[e.length-1].s}setExplore(t){this.exploreTarget=t?1:0,this.controls.enabled=t,t&&(this.exCam.position.copy(this.camera.position),this.controls.target.set(0,8,0),this.controls.update(),this.flyTo(-1))}setExploreSun(t){se.to(this,{exploreSun:t,duration:2.2,ease:"power2.inOut"})}flyTo(t){let e=this.controls;e.autoRotate=!1;let i=t<0?new N(0,8,0):xc[t].focus.clone(),n=t<0?new N(110,70,130):new N(34,22,40),r=i.clone().add(n);se.to(e.target,{x:i.x,y:i.y,z:i.z,duration:2,ease:"power3.inOut"}),se.to(this.exCam.position,{x:r.x,y:r.y,z:r.z,duration:2,ease:"power3.inOut",onComplete:()=>{e.autoRotate=!0}})}project(t,e){let i=this.tmp.proj.copy(t).project(this.camera);return e.x=(i.x*.5+.5)*this.w,e.y=(-i.y*.5+.5)*this.h,e.vis=i.z<1&&i.z>-1,e}render(t,e){this.time+=t,this.frame++;let i=this.time,n=this.sample(e);if(!n)return;this.state=n,this.explore+=(this.exploreTarget-this.explore)*Math.min(1,t*2.5),Math.abs(this.exploreTarget-this.explore)<5e-4&&(this.explore=this.exploreTarget);let r=this.explore;if((n.veil??0)>.995&&r<.01){this.slowTime=0;return}let o=Le(n.build,1,r),a=Le(n.alive,1,r);ds.uBuild.value=o,ds.uAlive.value=a,ds.uTime.value=i,this.updateSky(n,r,i);let l=r>.25?0:n.storm*(1-r*4);this.storm.update(i,n.converge,l);let c=this.storm.uniforms;c.uOpacity.value=n.cloud*(1-r),this.storm.points.visible=c.uOpacity.value>.003,this.blue.uniforms.uDraw.value=n.draw,this.blue.uniforms.uLines.value=n.lines*(1-r)*(1-(n.sky??0)),this.blue.lines.visible=this.blue.uniforms.uLines.value>.003&&n.draw>0,this.ground.uniforms.uGrid.value=Le(n.grid,.04,r),this.ground.uniforms.uScan.value=n.draw>0&&n.draw<1?n.draw*240:0,this.ground.mesh.visible=this.ground.uniforms.uGrid.value>.005||this.ground.uniforms.uScan.value>0,this.plant.group.visible=o>1e-4;let h=a>.001;if(this.lamps.uniforms.uAlive.value=a,this.lamps.uniforms.uTime.value=i,this.lamps.points.visible=h,this.steam.uniforms.uAlive.value=a,this.steam.uniforms.uTime.value=i,this.steam.points.visible=h,this.flame.uniforms.uAlive.value=a,this.flame.uniforms.uTime.value=i,this.flame.group.visible=h,this.sign.uniforms.uAlive.value=a,this.sign.mesh.visible=h,this.furnaceLight.intensity=700*a*(.85+Math.sin(i*13)*.08+Math.sin(i*31)*.07),this.plant.group.visible)for(let _ of this.plant.movers)_.kind==="rotor"?_.obj.rotation.z=i*_.speed+_.phase:_.obj.rotation.y=Math.sin(i*_.speed+_.phase)*1.2+_.phase;this.buildSparks(o);let f=Math.max(n.weld||0,a*.6,r*.6);if(f>.01){for(let _=0;_<this.welds.length;_++)if(Math.sin(i*(1.3+_*.4)+_*2)>-.2&&Math.random()<f){let y=this.welds[_];this.sparks.emit(y.x,y.y,y.z,Math.random()<.3?6:2,.8)}}this.sparks.update(Math.min(t,.05));let u=this.camera,d=this.tmp;this.mouseS.lerp(this.mouse,Math.min(1,t*3)),n.orbit>0&&(this.orbitAngle+=t*.035);let p=d.cam.fromArray(n.cam),m=d.look.fromArray(n.look);n.orbit>0&&p.applyAxisAngle(qE,this.orbitAngle*n.orbit),this.mobile||(p.x+=this.mouseS.x*3*(1-r),p.y+=this.mouseS.y*2*(1-r)),r>.001&&(this.controls.update(),p.lerp(this.exCam.position,r),m.lerp(this.controls.target,r)),u.position.copy(p),u.lookAt(m);let g=(this.mobile?0:n.shift||0)*(1-r);Math.abs(g)>.001?u.setViewOffset(this.w,this.h,-g*this.w,0,this.w,this.h):u.view&&u.view.enabled&&u.clearViewOffset(),u.fov!==(n.fov||42)&&(u.fov=n.fov||42),u.updateProjectionMatrix(),l>.01&&!this.mobile?(d.ray.setFromCamera(this.mouseS,u),d.ray.ray.intersectPlane(d.plane,d.hit)&&c.uMouse.value.copy(d.hit),c.uMouseOn.value=l):c.uMouseOn.value=0,this.bloom.strength=(n.bloom??.85)*Le(1,.25,this.dayF*this.skyMix),this.bloom.threshold=Le(.82,Le(1.25,3,this.dayF),this.skyMix);for(let _=0;_<xc.length;_++)this.project(xc[_].focus,this.zoneScreen[_]);this.updateShadows(o),this.composer.render(t),this.adapt(t)}updateShadows(t){let e=this.renderer;if(!e.shadowMap.enabled||yc[this.quality].shadow===0||this.sun.intensity<.02||!this.plant.group.visible)return;let i=`${t.toFixed(3)}|${this.sunDir.y.toFixed(3)}`;(i!==this.shadowKey||this.frame%12===0)&&(e.shadowMap.needsUpdate=!0,this.shadowKey=i)}updateSky(t,e,i){let n=this.skyMix=Le(t.sky??0,1,e),r=Le(t.sun??10,this.exploreSun,e),o=this.dayF=Mm(r,-4,14),a=this.scene,l=Js.degToRad(90-r),c=Js.degToRad(68);this.sunDir.setFromSphericalCoords(1,l,c),this.sun.position.copy(this.sunDir).multiplyScalar(260);let h=Mm(r,2,30);this.sun.color.setRGB(1,Le(.62,.95,h),Le(.38,.86,h)),this.sun.intensity=2.4*Mm(r,-1.5,8)*n;let f=1-o*n;this.moon.intensity=1.35*Le(1,.55,n)*f,this.hemi.color.setRGB(Le(.42,.62,o),Le(.45,.68,o),Le(.78,.82,o)),this.hemi.groundColor.setRGB(Le(.03,.22,o*n),Le(.03,.18,o*n),Le(.05,.14,o*n)),this.hemi.intensity=Le(.55,Le(.3,.5,o),n),ds.uSky.value=Le(.08,Le(.16,1,o),n);let u=this.tmp.fog.copy(this.fogDusk).lerp(this.fogDay,o);if(a.fog.color.copy(this.fogVoid).lerp(u,n),a.fog.density=Le(.0052,Le(.0032,.0019,o),n),this.renderer.toneMappingExposure=Le(1.05,Le(1.1,.62,o),n),n>.01){let p=Math.max(-6,Math.min(20,Math.round(r/2)*2));if(p!==this.skyKey){let m=this.skyFor(p);this.skyEnv=m.env,this.dome.material.uniforms.uCube.value=m.cube.texture,this.skyKey=p}this.dome.visible=!0,this.dome.position.copy(this.camera.position),this.dome.material.uniforms.uFog.value.copy(a.fog.color),this.dome.material.uniforms.uInt.value=n*Le(.9,.6,o)}else this.dome.visible=!1;let d=n>.5&&this.skyEnv;a.environment=d?this.skyEnv:this.roomEnv,a.environmentIntensity=d?Le(.3,.6,o):.32,this.groundMesh.visible=n>.01}skyFor(t){let e=this.skyCache.get(t);if(!e){let i=new uo(128,{type:gi,generateMipmaps:!0,minFilter:Cs});this.sky.material.uniforms.sunPosition.value.setFromSphericalCoords(1,Js.degToRad(90-t),Js.degToRad(68)),this.cubeCam.renderTarget=i,this.cubeCam.update(this.renderer,this.skyScene),e={cube:i,env:this.pmrem.fromCubemap(i.texture).texture},this.skyCache.set(t,e)}return e}buildSparks(t){let e=this.pieces;if(t>this.lastBuild){let i=26;for(;this.sparkPtr<e.length&&e[this.sparkPtr].delay+.06<=t;){let n=e[this.sparkPtr++];i-- >0&&n.size>1.2&&Math.random()<.75&&this.sparks.emit(n.pivot.x,n.top,n.pivot.z,3+(Math.random()*6|0),1)}}else if(t<this.lastBuild)for(;this.sparkPtr>0&&e[this.sparkPtr-1].delay+.06>t;)this.sparkPtr--;this.lastBuild=t}adapt(t){this.quality===0||document.hidden||(t>1/45&&t<.25?this.slowTime+=t:this.slowTime=Math.max(0,this.slowTime-t*.5),this.slowTime>1.5&&this.time-this.lastAdapt>3&&(this.quality--,this.lastAdapt=this.time,this.slowTime=0,this.applyQuality()))}};var Af={socar:{name:"SOCAR",file:"socar.svg"},"tecnicas-reunidas":{name:"T\xE9cnicas Reunidas",file:"tecnicas-reunidas.svg"},maleik:{name:"TN Maleik Petrokimya",file:"maleik.webp"},enka:{name:"ENKA",file:"enka.svg"},radisson:{name:"Radisson",file:"radisson.svg"},ravago:{name:"Ravago",file:"ravago.svg"},petkim:{name:"PETK\u0130M",file:"petkim.svg"},sasa:{name:"SASA",file:"sasa.svg"},aygaz:{name:"AYGAZ",file:"aygaz.svg"},habas:{name:"HABA\u015E",file:"habas.svg"},kolin:{name:"KOL\u0130N",file:"kolin.svg"},limak:{name:"Limak",file:"limak.svg"},kalyon:{name:"Kalyon",file:"kalyon.svg"},cengiz:{name:"Cengiz Holding",file:"cengiz.svg"},"air-liquide":{name:"Air Liquide",file:"air-liquide.svg"},milangaz:{name:"Milangaz",file:"milangaz.svg"},"eren-enerji":{name:"Eren Enerji",file:"eren-enerji.svg"},petroyag:{name:"Petroya\u011F",file:"petroyag.svg"},alpet:{name:"ALPET",file:"alpet.svg"},chryso:{name:"CHRYSO",file:"chryso.svg"},parex:{name:"PAREX",file:"parex.svg"},ode:{name:"ODE",file:"ode.svg"},sapro:{name:"Sapro",file:"sapro.svg"},nemport:{name:"Nemport",file:"nemport.svg"}};var Bi=(s,t=document)=>t.querySelector(s),Lr=(s,t=document)=>[...t.querySelectorAll(s)];function $v(s,t=""){let e=Af[s];if(e&&e.file){let n=document.createElement("img");return n.src="assets/logos/"+e.file,n.alt=e.name,n.loading="lazy",t&&(n.className=t),e.dark&&(n.dataset.dark="1"),n}let i=document.createElement("span");return i.className="logo-fb",i.textContent=e&&e.name||s.toUpperCase(),i}function jv({lenis:s,world:t,mobile:e,reduced:i,cursor:n}){let r=document.body,o=[],a=Lr("#exploreZones button"),l=Lr("#exploreTime button");function c(){t&&(r.classList.add("is-exploring"),r.classList.remove("menu-open"),s.stop(),t.setExplore(!0),n.classList.add("is-drag"))}function h(){r.classList.remove("is-exploring"),t&&t.setExplore(!1),s.start(),n.classList.remove("is-drag")}Lr("[data-explore]").forEach(it=>it.addEventListener("click",c)),Bi("#exploreExit").addEventListener("click",h),t||Lr("[data-explore]").forEach(it=>it.style.display="none"),a.forEach(it=>it.addEventListener("click",()=>{a.forEach(at=>at.classList.toggle("is-on",at===it)),t&&t.flyTo(+it.dataset.zone)})),l.forEach(it=>it.addEventListener("click",()=>{l.forEach(at=>at.classList.toggle("is-on",at===it)),t&&t.setExploreSun(+it.dataset.sun)}));let f=Bi("#epcLine");f&&(se.fromTo(f,{scaleX:0},{scaleX:1,ease:"none",scrollTrigger:{trigger:"#epc",start:"top 80%",end:"bottom 45%",scrub:.6}}),se.from(".epc__step",{y:50,opacity:0,duration:1,stagger:.12,ease:"power3.out",scrollTrigger:{trigger:"#epc",start:"top 85%"}})),se.from(".svc-card",{y:60,opacity:0,duration:1,stagger:.07,ease:"power3.out",scrollTrigger:{trigger:".svc-grid",start:"top 85%"}}),se.from(".panel",{y:50,opacity:0,duration:1,stagger:.12,ease:"power3.out",scrollTrigger:{trigger:".consult__grid",start:"top 85%"}}),se.from(".foot__cta",{y:50,opacity:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:".foot__cta",start:"top 92%"}});let u=Bi("#factoryStage"),d=Bi("#factoryImg"),p=Bi("#factoryFlash"),m=Bi("#factorySparks"),g=m.getContext("2d"),_=!1,y=[];e?se.from(".fspec",{y:40,opacity:0,stagger:.08,duration:.8,scrollTrigger:{trigger:".factory__specs",start:"top 95%"}}):se.timeline({scrollTrigger:{trigger:".factory",start:"top top",end:"+=180%",pin:".factory__pin",scrub:.8,anticipatePin:1,refreshPriority:1}}).fromTo(u,{clipPath:"inset(14% 18% 14% 18% round 18px)"},{clipPath:"inset(0% 0% 0% 0% round 0px)",ease:"none",duration:1},0).fromTo(d,{scale:1.25},{scale:1,ease:"none",duration:1},0).fromTo(".factory__title span:first-child",{xPercent:-30,opacity:0},{xPercent:0,opacity:1,duration:.6,ease:"power2.out"},.05).fromTo(".factory__title span:last-child",{xPercent:30,opacity:0},{xPercent:0,opacity:1,duration:.6,ease:"power2.out"},.12).fromTo(".factory__lead, .factory__copy .tag",{y:30,opacity:0},{y:0,opacity:1,duration:.4},.35).fromTo(".fspec",{y:80,opacity:0},{y:0,opacity:1,duration:.4,stagger:.08,ease:"power2.out"},.55),qt.create({trigger:".factory",start:"top bottom",end:"bottom top",onToggle:it=>{_=it.isActive}});function E(){let it=m.getBoundingClientRect(),at=Math.min(devicePixelRatio||1,2);m.width=Math.round(it.width*at),m.height=Math.round(it.height*at)}E(),window.addEventListener("resize",E);function x(){let it=m.width,at=m.height,j=800/533,ht=it,bt=it/j;bt<at&&(bt=at,ht=at*j);let G=parseFloat(se.getProperty(d,"scale"))||1,J=it/2+(.48-.5)*ht*G,ot=at/2+(.66-.5)*bt*G;return[J,ot,it/1400]}let b=performance.now();o.push(()=>{let it=performance.now(),at=Math.min(.05,(it-b)/1e3);if(b=it,!_||i)return;let[j,ht,bt]=x(),G=Math.random()<.12?26:5;for(let J=0;J<G;J++){let ot=-Math.PI/2+(Math.random()-.5)*Math.PI*1.6,Dt=(220+Math.random()*720)*bt;y.push({x:j,y:ht,vx:Math.cos(ot)*Dt,vy:Math.sin(ot)*Dt,life:1,max:.4+Math.random()*.9})}p.style.opacity=(.25+Math.random()*.45).toFixed(2),g.clearRect(0,0,m.width,m.height),g.globalCompositeOperation="lighter";for(let J=y.length-1;J>=0;J--){let ot=y[J];if(ot.life-=at/ot.max,ot.life<=0||y.length>900){y.splice(J,1);continue}let Dt=ot.x,_t=ot.y;ot.vy+=900*bt*at,ot.x+=ot.vx*at,ot.y+=ot.vy*at,ot.y>m.height*.82&&ot.vy>0&&(ot.vy*=-.35,ot.vx*=.7);let zt=Math.floor(160+95*ot.life);g.strokeStyle=`rgba(255,${zt},${Math.floor(60*ot.life)},${Math.min(1,ot.life*1.4)})`,g.lineWidth=(1+ot.life*2.2)*bt*1.6,g.beginPath(),g.moveTo(Dt,_t),g.lineTo(ot.x,ot.y),g.stroke()}});for(let it of Lr("img[data-logo]")){let at=$v(it.dataset.logo),j=it.parentElement;it.replaceWith(at),at.dataset.dark&&j.classList.add("is-dark")}let M=Lr(".logo-row").map(it=>{let at=Bi(".logo-row__track",it),j=at.dataset.logos.split(","),ht=()=>j.forEach(G=>{let J=document.createElement("div");J.className="logo-tile",J.title=Af[G]&&Af[G].name||G;let ot=$v(G);ot.dataset.dark&&J.classList.add("is-dark"),J.appendChild(ot),at.appendChild(J)});ht(),ht();let bt={tr:at,dir:+it.dataset.dir,x:0,half:0,hover:!1};return it.addEventListener("mouseenter",()=>bt.hover=!0),it.addEventListener("mouseleave",()=>bt.hover=!1),bt}),T=0,v=!1,w=0;s.on("scroll",it=>{T=it.velocity||0});let C=()=>M.forEach(it=>{it.half=it.tr.scrollWidth/2});new ResizeObserver(C).observe(Bi("#logoRows")),new IntersectionObserver(([it])=>{v=it.isIntersecting,w=0}).observe(Bi("#logoRows")),o.push(()=>{if(!v)return;let it=performance.now(),at=w?Math.min(.1,(it-w)/1e3):0;w=it;let j=1+Math.min(5,Math.abs(T)*.2);for(let ht of M){ht.half||C();let bt=ht.half;bt&&(ht.x-=ht.dir*60*at*j*(i?.5:1)*(ht.hover?.3:1),ht.x<-bt&&(ht.x+=bt),ht.x>0&&(ht.x-=bt),ht.tr.style.transform=`translate3d(${ht.x.toFixed(2)}px,0,0)`)}T*=.92});let D=Bi("#ppe"),I=Bi("#ppeArc"),O=Bi("#ppeCount"),L=Bi("#ppeStatus"),B=Bi("#ppeMsg"),V=Lr(".ppe__item"),z=Lr("#ppeBtns button"),$=new Set;function Z(){V.forEach(ht=>ht.classList.toggle("is-on",$.has(ht.dataset.item))),z.forEach(ht=>ht.classList.toggle("is-on",$.has(ht.dataset.item)));let it=$.size,at=z.length;O.textContent=`${it}/${at}`,I.style.strokeDashoffset=String(327*(1-it/at));let j=it===at;D.classList.toggle("is-ready",j),Bi("#ppeZeroBox").classList.toggle("is-ready",j),L.classList.toggle("is-ready",j),B.textContent=j?"Sahaya haz\u0131r. S\u0131f\u0131r kaza ile.":it===0?"\xC7al\u0131\u015Fan sahaya haz\u0131r de\u011Fil":`${at-it} ekipman eksik`,j&&se.fromTo("#ppeZero",{scale:.7},{scale:1,duration:1.2,ease:"elastic.out(1,0.5)"})}z.forEach(it=>it.addEventListener("click",()=>{let at=it.dataset.item;$.has(at)?$.delete(at):$.add(at),Z()})),Bi("#ppeAll").addEventListener("click",()=>{let it=$.size===z.length;z.forEach((at,j)=>setTimeout(()=>{it?$.delete(at.dataset.item):$.add(at.dataset.item),Z()},j*140))}),qt.create({trigger:"#ppe",start:"top 70%",once:!0,onEnter:()=>{$.size||($.add("helmet"),Z())}}),Z();let R=Bi("#footWord"),tt=()=>{let it=R.parentElement,at=100;for(let j=0;j<3;j++)R.style.fontSize=at+"px",at*=it.clientWidth*.99/R.getBoundingClientRect().width;R.style.fontSize=Math.floor(at)+"px"};return tt(),window.addEventListener("resize",tt),document.fonts&&document.fonts.ready.then(tt),qt.sort(),qt.refresh(),{exitExplore:h,update(){for(let it of o)it()}}}var vi=(s,t=document)=>t.querySelector(s),An=(s,t=document)=>[...t.querySelectorAll(s)],Cf=(s,t=0,e=1)=>Math.min(e,Math.max(t,s));function ZE(s){let t=s.textContent;s.textContent="";for(let e of t){let i=document.createElement("span");i.className="ch",i.textContent=e,s.appendChild(i)}return An(".ch",s)}function Qv(s){let t=s.textContent.trim().split(/\s+/);return s.innerHTML=t.map(e=>`<span class="w">${e}</span>`).join(" "),An(".w",s)}function KE(s){let t=s.innerHTML.split(/<br\s*\/?>/i);return s.innerHTML=t.map(e=>`<span class="line-mask"><span>${e.trim()}</span></span>`).join(""),An(".line-mask > span",s)}function tx({lenis:s,world:t,mobile:e,reduced:i}){let n=document.body,r=An("[data-split]").flatMap(ZE);se.set(r,{yPercent:110,rotate:6,opacity:0}),se.set(".hero .reveal-up",{y:24,opacity:0}),se.set(".bar",{y:-30,opacity:0});for(let j of An("[data-split-lines]")){let ht=KE(j);se.from(ht,{yPercent:110,duration:1.1,ease:"expo.out",stagger:.08,scrollTrigger:{trigger:j,start:"top 85%"}})}for(let j of An(".tag, .lead, .certs__by, .badges"))j.closest(".hero")||j.closest(".process__panel")||j.closest(".sectors__head")||se.from(j,{y:26,opacity:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:j,start:"top 90%"}});for(let j of An(".who, .offers, .values, .locs, .foot__cols"))se.from(j.children,{y:30,opacity:0,duration:.9,ease:"power3.out",stagger:.06,scrollTrigger:{trigger:j,start:"top 85%"}});se.from(".cert",{y:80,rotateX:-25,opacity:0,duration:1.2,ease:"expo.out",stagger:.08,scrollTrigger:{trigger:".certs",start:"top 85%"}}),se.from(".map",{y:60,opacity:0,duration:1.2,ease:"power3.out",scrollTrigger:{trigger:".map",start:"top 90%"}}),se.from(".foot__word",{yPercent:40,opacity:0,duration:1.4,ease:"expo.out",scrollTrigger:{trigger:".foot",start:"top 95%"}});for(let j of An("[data-count]")){let ht=+j.dataset.count,bt=j.dataset.suffix||"",G={v:0};j.textContent="0"+bt,qt.create({trigger:j,start:"top 88%",once:!0,onEnter:()=>se.to(G,{v:ht,duration:ht===0?.6:2.2,ease:"expo.out",onUpdate:()=>{j.textContent=Math.round(G.v)+bt}})}),se.from(j.parentElement,{y:40,opacity:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:j,start:"top 92%"}})}let o=Qv(vi("#manifestoText")),a=Qv(vi("#visionQuote"));se.from(".manifesto .kicker, .manifesto__sub",{opacity:0,y:20,duration:1,stagger:.2,scrollTrigger:{trigger:".manifesto",start:"top 60%"}}),qt.create({trigger:".vision",start:"top 80%",end:"bottom 50%",scrub:!0,onUpdate:j=>l(a,j.progress*1.15)});function l(j,ht){let bt=j.length;j.forEach((G,J)=>{G.style.opacity=(.13+.87*Cf(ht*bt-J)).toFixed(3)})}let c={manifesto:vi("#manifesto"),process:vi("#surec"),sectors:vi("#sektorler")},h={},f=1;function u(){f=Math.max(1,document.documentElement.scrollHeight-innerHeight);for(let[j,ht]of Object.entries(c))h[j]={top:ht.getBoundingClientRect().top+window.scrollY,h:ht.offsetHeight}}u(),window.addEventListener("resize",u),window.addEventListener("load",u),qt.addEventListener("refresh",()=>{u(),t&&t.layout()});let d=(j,ht)=>Cf((ht-h[j].top)/(h[j].h-innerHeight)),p=An(".step"),m=vi("#stepNum"),g=vi("#stepRail"),_=An(".sector"),y=An(".marker"),E=-1,x=-1,b=vi("#projectsTrack");e?se.utils.toArray(".proj").forEach(j=>se.from(j,{y:50,opacity:0,duration:.9,ease:"power3.out",scrollTrigger:{trigger:j,start:"top 92%"}})):se.to(b,{x:()=>-(b.scrollWidth-innerWidth),ease:"none",scrollTrigger:{trigger:".projects",start:"top top",end:()=>"+="+(b.scrollWidth-innerWidth),pin:".projects__pin",scrub:.6,invalidateOnRefresh:!0,anticipatePin:1,refreshPriority:-1}});for(let j of An(".cert"))e||(j.addEventListener("pointermove",ht=>{let bt=j.getBoundingClientRect(),G=(ht.clientX-bt.left)/bt.width-.5,J=(ht.clientY-bt.top)/bt.height-.5;se.to(j,{rotateY:G*18,rotateX:-J*14,y:-10,duration:.5,ease:"power2.out"})}),j.addEventListener("pointerleave",()=>se.to(j,{rotateY:0,rotateX:0,y:0,duration:.8,ease:"elastic.out(1,0.5)"}))),j.addEventListener("click",()=>v([j.dataset.full,j.dataset.full2].filter(Boolean)));let M=vi("#lightbox"),T=vi("#lbStage");function v(j){T.innerHTML=j.map(ht=>`<img src="${ht}" alt="Belge">`).join(""),M.classList.add("is-open"),s.stop()}function w(){M.classList.remove("is-open"),s.start()}vi("#lbClose").addEventListener("click",w),M.addEventListener("click",j=>{j.target===M&&w()}),window.addEventListener("keydown",j=>{j.key==="Escape"&&(w(),n.classList.contains("is-exploring")&&O.exitExplore())}),vi("#burger").addEventListener("click",()=>n.classList.toggle("menu-open"));for(let j of An('a[href^="#"]'))j.addEventListener("click",ht=>{let bt=j.getAttribute("href"),G=vi(bt);G&&(ht.preventDefault(),n.classList.remove("menu-open"),s.scrollTo(G,{duration:2.2,easing:J=>1-Math.pow(1-J,4)}))});let C=An(".nav a");for(let j of C){let ht=vi(j.getAttribute("href"));qt.create({trigger:ht,start:"top 50%",end:"bottom 50%",onToggle:bt=>j.classList.toggle("is-active",bt.isActive)})}let D=vi("#cursor"),I={x:innerWidth/2,y:innerHeight/2,tx:innerWidth/2,ty:innerHeight/2};window.addEventListener("pointermove",j=>{I.tx=j.clientX,I.ty=j.clientY},{passive:!0}),document.addEventListener("pointerover",j=>{D.classList.toggle("is-hover",!!j.target.closest("a, button"))});let O=jv({lenis:s,world:t,mobile:e,reduced:i,cursor:D}),L=vi("#hudMode"),B=vi("#hudCoords"),V=vi("#progress"),z=vi("#bar"),$=vi("#veil"),Z=0,R="",tt=j=>(j<0?"-":" ")+Math.abs(j).toFixed(1).padStart(5,"0");function it(){se.timeline().to(r,{yPercent:0,rotate:0,opacity:1,duration:1.4,ease:"expo.out",stagger:.045}).to(".hero .reveal-up",{y:0,opacity:1,duration:1.1,ease:"power3.out",stagger:.1},"-=1.0").to(".bar",{y:0,opacity:1,duration:1,ease:"power3.out"},"-=1.1"),qt.refresh(),t&&t.layout(),u()}function at(j,ht){let bt=d("manifesto",j);l(o,Cf((bt-.04)/.62)*1.05);let G=d("process",j),J=Math.min(4,Math.floor(G*5+1e-4));J!==E&&(E=J,p.forEach((Ct,Xt)=>Ct.classList.toggle("is-active",Xt===J)),m.textContent=String(J+1).padStart(2,"0")),g.style.transform=`scaleX(${G})`;let ot=d("sectors",j),Dt=ot<.24?0:ot<.49?1:ot<.74?2:3;Dt!==x&&(x=Dt,_.forEach((Ct,Xt)=>Ct.classList.toggle("is-active",Xt===Dt))),c.sectors.classList.toggle("is-touring",ot>.16);let _t=j>h.sectors.top-innerHeight*.3&&j<h.sectors.top+h.sectors.h-innerHeight*.7;if(y.forEach((Ct,Xt)=>{let te=ht&&ht.zoneScreen[Xt],W=_t&&te&&te.vis&&Xt===Dt&&!n.classList.contains("is-exploring");Ct.classList.toggle("is-on",!!W),te&&(Ct.style.transform=`translate3d(${te.x.toFixed(1)}px, ${te.y.toFixed(1)}px, 0)`)}),ht&&ht.state){$.style.opacity=(ht.state.veil??0).toFixed(3),ht.state.mode!==R&&(R=ht.state.mode,L.textContent=R);let Ct=ht.camera.position;B.textContent=`X${tt(Ct.x)} \xB7 Y${tt(Ct.y)} \xB7 Z${tt(Ct.z)}`,n.classList.toggle("is-solid-zone",(ht.state.veil??0)>.5)}let zt=f;V.style.transform=`scaleY(${Cf(j/Math.max(1,zt))})`;let Vt=j-Z;Math.abs(Vt)>2&&(z.classList.toggle("is-hidden",Vt>0&&j>innerHeight*.8&&!n.classList.contains("menu-open")),Z=j),z.classList.toggle("is-solid",j>40),n.classList.toggle("in-hero",j<innerHeight*.6),I.x+=(I.tx-I.x)*.25,I.y+=(I.ty-I.y)*.25,D.style.transform=`translate3d(${I.x}px, ${I.y}px, 0)`,O.update()}return{intro:it,update:at}}se.registerPlugin(qt);var vo=matchMedia("(max-width: 760px)").matches||matchMedia("(pointer: coarse)").matches,bm=matchMedia("(prefers-reduced-motion: reduce)").matches,Pf=new URLSearchParams(location.search).get("shot");history.scrollRestoration="manual";window.scrollTo(0,0);var JE=document.getElementById("loaderTemp"),$E=document.getElementById("loaderBar"),Rf={p:0},jE=se.to(Rf,{p:.82,duration:2,ease:"power2.out",onUpdate:()=>nx(Rf.p)});function nx(s){JE.textContent=String(Math.round(s*1538)).padStart(4,"0"),$E.style.transform=`scaleX(${s})`}var tn=null;try{if(location.search.includes("nogl"))throw new Error("nogl");tn=new Ef(document.getElementById("gl"),{mobile:vo})}catch(s){console.error("WebGL ba\u015Flat\u0131lamad\u0131",s),document.body.classList.add("no-gl")}location.search.includes("debug")&&(window.__ds={world:tn,gsap:se});var $s=new Lm({lerp:bm?1:.085,wheelMultiplier:.9,touchMultiplier:1.4});$s.on("scroll",qt.update);$s.stop();window.__ds&&(window.__ds.lenis=$s);var QE=vo?0:.17,Qi=[{cam:[4,30,22],look:[-42,16,-26]},{cam:[36,26,80],look:[-4,6,28]},{cam:[30,34,10],look:[36,8,-24]},{cam:[18,34,110],look:[58,18,32]}];vo&&(Qi[0].cam=[-10,26,30],Qi[1].cam=[22,22,82],Qi[2].cam=[76,30,26],Qi[3].cam=[30,36,112]);var tA=vo?{cam:[0,20,92],look:[0,24,0]}:{cam:[0,16,66],look:[0,22,0]},wm=[{sel:"#hero",at:0,sticky:!0,s:{...tA,fov:42,shift:QE,storm:1,converge:0,cloud:1,draw:0,lines:0,build:0,alive:0,veil:0,weld:0,grid:.35,orbit:0,bloom:.8,sky:0,sun:14,mode:"FIRTINA"}},{sel:"#manifesto",at:0,sticky:!0,s:{cam:vo?[0,26,100]:[6,22,78],look:[0,22,0],mode:"D\xD6N\xDC\u015E\xDCM"}},{sel:"#manifesto",at:.9,sticky:!0,s:{cam:[72,92,122],look:[0,4,0],converge:1,storm:0,bloom:.9}},{sel:"#rakamlar",at:.25,s:{cam:[-20,110,140],look:[0,0,0],draw:.05,lines:1,mode:"TASLAK"}},{sel:"#rakamlar",at:.8,s:{cam:[-86,84,112],look:[0,0,0],draw:1,cloud:.35}},{sel:"#surec",at:0,sticky:!0,s:{cam:[0,150,64],look:[0,0,0],cloud:0,mode:"DANI\u015EMANLIK"}},{sel:"#surec",at:.1,sticky:!0,s:{cam:[-10,140,74],look:[0,0,0]}},{sel:"#surec",at:.3,sticky:!0,s:{cam:[-96,58,92],look:[0,6,0],build:0,lines:1,mode:"M\xDCHEND\u0130SL\u0130K"}},{sel:"#surec",at:.5,sticky:!0,s:{cam:vo?[62,34,30]:[56,26,12],look:[28,7,-23],build:.5,weld:1,lines:.45,sky:1,sun:18,grid:.06,mode:"\u0130MALAT"}},{sel:"#surec",at:.7,sticky:!0,s:{cam:[-34,50,98],look:[4,6,0],build:1,weld:.3,lines:.12,sun:10,grid:0,mode:"MONTAJ"}},{sel:"#surec",at:.9,sticky:!0,s:{cam:[-104,42,82],look:[0,10,0],alive:1,lines:0,weld:0,grid:0,sun:4,mode:"\u0130\u015ELETME"}},{sel:"#surec",at:1,sticky:!0,s:{cam:[-110,60,120],look:[0,8,0],shift:0,sun:3.5}},{sel:"#sektorler",at:.05,sticky:!0,s:{...Qi[0],sun:3,mode:"SAHA \xB7 RAF\u0130NER\u0130"}},{sel:"#sektorler",at:.18,sticky:!0,s:{...Qi[0],cam:Qi[0].cam.map((s,t)=>s+[4,-2,6][t])}},{sel:"#sektorler",at:.3,sticky:!0,s:{...Qi[1],sun:1.5,mode:"SAHA \xB7 K\u0130MYA"}},{sel:"#sektorler",at:.43,sticky:!0,s:{...Qi[1],cam:Qi[1].cam.map((s,t)=>s+[-6,0,4][t])}},{sel:"#sektorler",at:.55,sticky:!0,s:{...Qi[2],sun:0,mode:"SAHA \xB7 DEM\u0130R-\xC7EL\u0130K"}},{sel:"#sektorler",at:.68,sticky:!0,s:{...Qi[2],cam:Qi[2].cam.map((s,t)=>s+[4,2,8][t])}},{sel:"#sektorler",at:.8,sticky:!0,s:{...Qi[3],sun:-1,mode:"SAHA \xB7 ENERJ\u0130"}},{sel:"#sektorler",at:1,sticky:!0,s:{...Qi[3],cam:Qi[3].cam.map((s,t)=>s+[-8,4,8][t]),veil:0}},{sel:"#hizmetler",at:.06,s:{cam:[0,120,190],look:[0,0,0],orbit:1,veil:1,bloom:.7,mode:"H\u0130ZMETLER"}}];window.__ds&&(window.__ds.keys=wm);var Tm=tx({lenis:$s,world:tn,mobile:vo,reduced:bm});function ex(){if(Pf)return eA();tn&&(tn.setKeys(wm),tn.warmup(),document.fonts&&document.fonts.ready.then(()=>{tn.sign.redraw(),tn.layout()})),jE.kill(),se.to(Rf,{p:1,duration:.7,ease:"power3.inOut",onUpdate:()=>nx(Rf.p),onComplete:iA})}function eA(){tn&&(tn.setKeys(wm),tn.warmup()),document.getElementById("loader").remove(),document.body.classList.remove("is-loading"),$s.start(),Tm.intro(),se.globalTimeline.progress(1);let[s,t]=Pf.split(":"),e=document.querySelector(s),i=e.getBoundingClientRect().top+window.scrollY,n=e.offsetHeight>innerHeight*1.5;$s.scrollTo(n?i+(e.offsetHeight-innerHeight)*+t:i+ +t,{immediate:!0,force:!0}),qt.refresh(),qt.getAll().forEach(r=>{!r.vars.scrub&&r.animation&&r.animation.progress(1)})}function iA(){se.timeline({onComplete:()=>{document.getElementById("loader").remove()}}).to(".loader__inner",{opacity:0,scale:.96,duration:.45,ease:"power2.in"}).to(".loader__half--top",{yPercent:-100,duration:1.1,ease:"expo.inOut"},"-=0.05").to(".loader__half--bottom",{yPercent:100,duration:1.1,ease:"expo.inOut"},"<").add(()=>{document.body.classList.remove("is-loading"),$s.start(),Tm.intro()},"-=0.75")}var ix=performance.now();function sx(s){let t=Math.min(.1,(s-ix)/1e3);ix=s,$s.raf(s);let e=$s.scroll??window.scrollY;tn&&tn.render(t,e),Tm.update(e,tn),requestAnimationFrame(sx)}requestAnimationFrame(sx);var nA=new Promise(s=>setTimeout(s,bm||Pf?100:1600)),sA=document.fonts?Promise.race([document.fonts.ready,new Promise(s=>setTimeout(s,2500))]):Promise.resolve();Promise.all([nA,sA]).then(()=>Pf?ex():requestAnimationFrame(ex));window.addEventListener("resize",()=>{tn&&tn.layout(),qt.refresh()});})();
