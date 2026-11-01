/* Small, tactile life sequences. Art and sound are bundled; nothing is uploaded. */
(() => {
 'use strict';
 const host=document.getElementById('journey'),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let context=null,controller=null,previous=null,revision=0,currentFlow='',timers=[],motions=[],cleanups=[];
 const memory={get ticket(){return window.StreetStory.get().ticketValidated;},set ticket(v){if(v)window.StreetStory.ticket();},get crossed(){return window.StreetStory.get().ferryCrossed;},set crossed(v){if(v)window.StreetStory.cross();}};
 const $=s=>host.querySelector(s),$$=s=>[...host.querySelectorAll(s)];
 const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
 const listen=(el,type,fn)=>el.addEventListener(type,fn,{signal:controller.signal});
 const later=(fn,ms)=>{const token=revision,id=setTimeout(()=>{if(token===revision&&!host.hidden)fn();},ms);timers.push(id);return id;};
 const tween=(el,vars)=>{const t=gsap.to(el,{...vars,duration:reduced?0:vars.duration,ease:vars.ease||'power2.out'});motions.push(t);return t;};
 function caption(text){$('.journey-caption').textContent=text;}
 function feedback(path,volume=.12){context?.sound(path,volume);}
 function shell(id,title,hint){
  cleanups.forEach(fn=>fn());cleanups=[];controller?.abort();timers.forEach(clearTimeout);motions.forEach(t=>t.kill());timers=[];motions=[];controller=new AbortController();currentFlow=id;revision++;
  host.hidden=false;host.className='journey journey-'+id;host.dataset.phase='begin';host.dataset.flow=id;document.body.classList.add('journey-active');document.getElementById('stage').inert=true;
  host.innerHTML='<img class="journey-backdrop" alt="" src="'+context.scene.image+'"><div class="journey-scrim"></div><header class="journey-heading"><small>'+context.scene.name+' / 轻轻参与一段日常</small><h2>'+title+'</h2><p class="journey-instruction">'+hint+'</p></header><button class="journey-close" aria-label="收起这个小流程">收起这一段 ×</button><div class="journey-playfield"></div><footer class="journey-controls"><p class="journey-caption" role="status" aria-live="polite">'+hint+'</p><div class="journey-buttons"></div></footer>';
  listen($('.journey-close'),'click',()=>close());host.focus({preventScroll:true});
 }
 function button(label,fn,cls='journey-continue'){const b=document.createElement('button');b.className=cls;b.type='button';b.textContent=label;$('.journey-buttons').append(b);listen(b,'click',fn);return b;}
 function phase(name){host.dataset.phase=name;}
 function close({silent=false}={}){if(host.hidden)return;revision++;cleanups.forEach(fn=>fn());cleanups=[];controller?.abort();timers.forEach(clearTimeout);motions.forEach(t=>t.kill());gsap.killTweensOf(host.querySelectorAll('*'));timers=[];motions=[];host.hidden=true;host.replaceChildren();host.className='journey';document.body.classList.remove('journey-active');document.getElementById('stage').inert=false;context?.stopSounds?.();if(!silent)previous?.focus?.({preventScroll:true});}
 function finish(label,fn){$('.journey-buttons').replaceChildren();button(label,fn);}
 function routeOnward(fallback){return ()=>{const ctx=context;close({silent:true});if(window.StreetRoute&&document.body.classList.contains('route-active'))window.StreetRoute.next();else fallback?.(ctx);};}
 function draggable(el,{move,end}){
  let drag=null,suppress=false;
  listen(el,'pointerdown',e=>{if(e.button>0||el.disabled)return;e.preventDefault();el.setPointerCapture(e.pointerId);drag={id:e.pointerId,x:e.clientX,y:e.clientY,lastX:e.clientX,lastY:e.clientY,moved:false};el.classList.add('is-held');});
  listen(el,'pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.hypot(dx,dy)>6)drag.moved=true;drag.lastX=e.clientX;drag.lastY=e.clientY;move?.({dx,dy,x:e.clientX,y:e.clientY,event:e});});
  const release=(e,cancelled=false)=>{if(!drag||drag.id!==e.pointerId)return;const d=drag;drag=null;el.classList.remove('is-held');if(el.hasPointerCapture(e.pointerId))el.releasePointerCapture(e.pointerId);suppress=d.moved;end?.({dx:d.lastX-d.x,dy:d.lastY-d.y,x:d.lastX,y:d.lastY,moved:d.moved,cancelled});};
  listen(el,'pointerup',e=>release(e));listen(el,'pointercancel',e=>release(e,true));listen(el,'click',e=>{if(suppress){e.preventDefault();e.stopImmediatePropagation();suppress=false;}});
 }
 function sprite(slot,cls=''){return '<span class="market-art '+cls+'" style="--sprite-x:'+(slot%3*50)+'%;--sprite-y:'+(Math.floor(slot/3)*100)+'%" aria-hidden="true"></span>';}

 function market(){
  const S=window.StreetStory,C=window.STREET_CONTENT,keys=['greens','lotus','radish'],saved=S.get();
  shell('market','陈姨留菜，先问你愿不愿意。','挑两样菜放进竹篮，再挪秤砣。称好后，你可以帮忙，也可以自己带走。');
  $('.journey-playfield').innerHTML='<div class="market-board"><div class="produce-tray">'+['青菜','莲藕','白萝卜'].map((name,i)=>'<button class="produce-piece" data-produce="'+i+'" aria-label="把'+name+'放进竹篮">'+sprite(i)+'<span class="produce-name">'+name+'</span></button>').join('')+'</div><div class="basket-drop" aria-label="装菜的竹篮">'+sprite(3,'basket-paint')+'<span class="basket-invitation">放进这一篮</span></div><div class="market-scale" hidden><div class="scale-beam"><span class="scale-weight"></span></div><label>挪动秤砣，让秤杆平下来<input id="market-weight" aria-label="挪动秤砣" type="range" min="0" max="100" value="12"></label></div><div class="take-home" hidden>'+sprite(4)+'</div></div>';
  const drop=$('.basket-drop'),pieces=$$('.produce-piece'),selected=new Set();let weighed=false,settle=null;
  const onward=()=>button('这一篮记好了，去报摊 →',routeOnward(ctx=>ctx.go('newsstand')));
  function decisions(){const s=S.get();$('.journey-buttons').replaceChildren();
   if(s.basketErrand==='reserved'){phase('reserved');caption('你替陈姨留了'+C.items(s.errandProduce)+'。菜摊先放保鲜箱，傍晚再拿到周姐汤铺。');onward();}
   else if(['delivered','returned'].includes(s.basketErrand)){phase('remembered');caption('这篮'+C.items(s.errandProduce)+'已经交给周姐。'+(s.basketErrand==='returned'?'陈姨也已经把空篮还你。':'空篮在纳凉桌旁，由陈姨留着。')+'不会重复留菜。');onward();}
   else if(s.basketErrand==='declined'){phase('declined');caption('这次选的是你自己的一篮：'+C.items(s.selectedProduce)+'。陈姨的备料由周姐另安排。');onward();button('改为替陈姨预留这篮',()=>{if(S.reserve())decisions();},'journey-secondary');}
   else{phase('choice');caption('秤杆平了：'+C.items(s.selectedProduce)+'。陈姨明早替周姐切菜，有藕留藕，没有也可留两样配菜。你要顺路帮她吗？');button('替陈姨留这篮，傍晚送汤铺',()=>{if(S.reserve())decisions();});button('这篮我自己带走',()=>{S.decline();decisions();},'journey-secondary');}
  }
  function add(el,quiet=false){if(selected.has(el.dataset.produce)||weighed)return;selected.add(el.dataset.produce);el.classList.add('is-picked');el.setAttribute('aria-pressed','true');gsap.set(el,{x:0,y:0});const art=el.querySelector('.market-art').cloneNode(true);art.classList.add('basket-produce');art.style.setProperty('--picked',selected.size);drop.append(art);if(!quiet)feedback('paper-recorded.wav',.08);$('.basket-invitation').textContent=selected.size<2?'再挑一样':'鲜的都装好了';if(!quiet)caption(selected.size<2?'挑中这一样了。再放一样进篮子。':'把秤砣推一推，等秤杆平下来。');if(selected.size===2&&!quiet){phase('weigh');$('.market-scale').hidden=false;button('还没称好，重新挑',market,'journey-secondary');}}
  for(const el of pieces){draggable(el,{move:({dx,dy})=>{if(!selected.has(el.dataset.produce)&&!weighed)gsap.set(el,{x:dx,y:dy});},end:({x,y,moved,cancelled})=>{const r=drop.getBoundingClientRect();if(!cancelled&&moved&&x>r.left-15&&x<r.right+15&&y>r.top-15&&y<r.bottom+15)add(el);else tween(el,{x:0,y:0,duration:.25});}});listen(el,'click',()=>add(el));}
  listen($('#market-weight'),'input',e=>{if(weighed)return;const val=+e.target.value,angle=clamp((val-58)*.24,-10,10);gsap.set($('.scale-beam'),{rotation:angle});$('.scale-weight').style.left=val+'%';clearTimeout(settle);if(Math.abs(val-58)<8)settle=later(()=>{weighed=true;S.pack([...selected].map(i=>keys[+i]));phase('packed');$('.take-home').hidden=false;tween($('.take-home'),{autoAlpha:1,y:-12,duration:.7});feedback('cloth-recorded.wav',.12);decisions();},500);});
  if(saved.selectedProduce.length>=2){for(const p of saved.selectedProduce){const i=keys.indexOf(p);if(i>=0)add(pieces[i],true);}weighed=true;$('.take-home').hidden=false;gsap.set($('.take-home'),{autoAlpha:1});decisions();}
 }

 function paper(){
  const articles=window.STREET_CONTENT.newspaper(window.StreetStory.get());
  shell('paper','今天的小报，晚上有回音。','捏住纸角向左展开；也可以轻点。读完可以夹好带走，或留在报摊。');
  $('.journey-playfield').innerHTML='<article class="morning-paper"><header><small>原创街坊小报 · 非历史报纸</small><strong>武汉东早报</strong><span>读的是今天，也有以前留下的字</span></header><div class="paper-columns">'+articles.map(a=>'<section><h3>'+a.title+'</h3><p>'+a.text+'</p></section>').join('')+'</div><div class="paper-fold"><span>捏住纸角，向左展开</span></div><button class="paper-corner" aria-label="展开早报纸角">↖</button></article>';
  const fold=$('.paper-fold'),corner=$('.paper-corner');$('.paper-columns').setAttribute('aria-hidden','true');let opened=false;
  function reveal(p){p=clamp(p,0,1);fold.style.clipPath='polygon('+(p*100)+'% 0,100% 0,100% 100%,'+(p*100)+'% 100%)';fold.style.opacity=String(1-p*.55);corner.style.right=(p*80+2)+'%';}
  function done(){if(opened)return;opened=true;$('.paper-columns').setAttribute('aria-hidden','false');phase('unfolded');window.StreetStory.discover('paper-read');tween(fold,{autoAlpha:0,duration:.45});corner.hidden=true;feedback('page-recorded.wav');caption('今晚先交菜，接着看炭火、倒汽水，再去院坝看这场电影。');finish('夹好报纸，去江滩 →',()=>{window.StreetStory.paper();routeOnward(ctx=>ctx.go('exercise'))();});button('放回报纸，去江滩 →',routeOnward(ctx=>ctx.go('exercise')),'journey-secondary');}
  draggable(corner,{move:({dx})=>reveal(-dx/($('.morning-paper').clientWidth*.58)),end:({dx,cancelled})=>{if(!cancelled&&dx<-45)done();else reveal(0);}});listen(corner,'click',done);
 }

 function fan(){
  shell('fan','这一阵风，从手边起。','握住蒲扇左右慢摇，江边的风也跟着来。');
  $('.journey-playfield').innerHTML='<div class="breathing-river" aria-hidden="true"></div><button class="held-fan" aria-label="握住蒲扇慢慢摇，也可以用左右方向键">'+sprite(5)+'</button><div class="wind-traces" aria-hidden="true"><i></i><i></i><i></i></div>';
  let total=0,last=0,complete=false;
  function swing(v){v=clamp(v,-1,1);gsap.set($('.held-fan'),{rotation:v*23,x:v*25});$('.wind-traces').style.opacity=String(Math.abs(v)*.7);$('.breathing-river').style.transform='translateX('+(v*5)+'px)';total+=Math.abs(v-last);last=v;if(total>1.5&&!complete){feedback('cloth-recorded.wav',.10);complete=true;window.StreetStory.fan();phase('breeze');caption('风到了。衣角动一下，江面也亮一下。早晨可以这样慢慢开始。');finish('收好蒲扇，去码头 →',routeOnward(ctx=>ctx.go('pier')));}}
  const el=$('.held-fan');draggable(el,{move:({dx})=>swing(dx/100),end:()=>{tween(el,{rotation:0,x:0,duration:.7});}});listen(el,'keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();swing(e.key==='ArrowLeft'?-1:1);}});listen(el,'click',()=>{swing(last>0?-.8:.8);});
 }

 function ticket(){
  shell('ticket','一张薄票，两岸日常。','把纸票拖过验票口。手机轻点纸票也能验票。');
  $('.journey-playfield').innerHTML='<div class="ticket-counter"><button class="ferry-ticket" aria-label="拿纸票验票"><small>武汉东 · 江上日常</small><strong>过江</strong><span>这一岸　↔　那一岸</span><b>普通的一天，也值得坐一班船。</b><i class="ticket-stamp">已验票</i></button><div class="ticket-punch"><span>验票口</span><i></i><small>将票沿箭头划过 →</small></div></div>';
  const card=$('.ferry-ticket'),punch=$('.ticket-punch');let punched=false;
  function validate(){if(punched)return;punched=true;memory.ticket=true;phase('validated');card.classList.add('validated');card.setAttribute('aria-label','已验好的船票');feedback('paper-recorded.wav',.15);tween(card,{x:0,y:0,rotation:-3,duration:.35});caption('票角剪去一小口。跳板通向甲板，江风已经到了。');finish('沿着跳板，上船 →',()=>{if(context.scene.id==='ferry')ferry();else routeOnward(ctx=>ctx.go('ferry'))();});}
  draggable(card,{move:({dx,dy})=>{if(!punched)gsap.set(card,{x:dx,y:dy,rotation:clamp(dx*.02,-6,6)});},end:({x,y,moved,cancelled})=>{if(punched)return;const r=punch.getBoundingClientRect();if(moved&&!cancelled&&x>r.left-40&&x<r.right+40&&y>r.top-45&&y<r.bottom+45)validate();else tween(card,{x:0,y:0,rotation:0,duration:.3});}});listen(card,'click',validate);
 }

 function ferry(){
  if(!memory.ticket){ticket();return;}
  shell('ferry','把这一段路，交给江。','拖动江面看向两岸。扶好栏杆，船会慢慢开。');
  $('.journey-playfield').innerHTML='<div class="river-window"><div class="river-track"><img src="assets/scenes/ferry-river.png" alt="两岸和宽阔江面，随轮渡缓慢移动"></div><div class="river-shimmer" aria-hidden="true"></div><img class="ferry-foreground" src="assets/scenes/ferry-rail.png" alt="轮渡甲板的木扶手和缆绳"><div class="river-position" aria-hidden="true"><span>这一岸</span><i></i><span>那一岸</span></div></div>';
  const track=$('.river-track'),rail=$('.ferry-foreground'),river=$('.river-window'),camera={t:0,look:0};let voyage=null,lookStart=0,started=false;
  // A boat follows several small waves rather than one perfectly regular lift.
  // Ease the swell in/out so departure and docking remain steady.
  const smooth=v=>{v=clamp(v,0,1);return v*v*(3-2*v);};
  const render=()=>{
   const seconds=camera.t*18,swell=reduced?0:smooth(camera.t/.12)*smooth((1-camera.t)/.15);
   const amplitude=Math.min(innerHeight*.012,10),heave=(Math.sin(seconds*1.65)+Math.sin(seconds*.73)*.32)*amplitude*swell;
   const roll=(Math.sin(seconds*1.12)*.32+Math.sin(seconds*.49)*.10)*swell;
   gsap.set(track,{xPercent:-2-camera.t*38+camera.look*2,y:-heave*.6,rotation:-roll*.55,scale:1.04,transformOrigin:'50% 55%'});
   gsap.set(rail,{y:heave,rotation:roll,scale:1.05,transformOrigin:'50% 80%'});
   $('.river-position i').style.setProperty('--crossing',camera.t);
  };
  draggable($('.river-window'),{move:({dx})=>{camera.look=clamp(lookStart+dx/innerWidth,-1,1);render();},end:()=>{lookStart=camera.look;}});
  listen($('.river-window'),'keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();camera.look=clamp(camera.look+(e.key==='ArrowLeft'?.2:-.2),-1,1);render();}});$('.river-window').tabIndex=0;$('.river-window').setAttribute('aria-label','左右拖动看江，左右方向键也可转动视线');render();
  const start=()=>{if(started)return;started=true;phase('crossing');river.dataset.sailing='true';$('.journey-buttons').replaceChildren();feedback('breeze-recorded.wav',.10);caption('缆绳松了，船身随波轻轻起伏，两岸的房子缓缓退后。');const pause=button('停一停，看两岸',()=>{if(voyage.paused()){voyage.resume();river.dataset.sailing='true';pause.textContent='停一停，看两岸';}else{voyage.pause();river.dataset.sailing='false';pause.textContent='继续这段航程';}},'journey-secondary');
   voyage=gsap.timeline({onComplete(){river.dataset.sailing='false';memory.crossed=true;phase('arrived');caption(window.STREET_CONTENT.ferryArrival(window.StreetStory.get()));finish('靠岸了，去入夜的汤铺 →',routeOnward(ctx=>ctx.evening()));}});motions.push(voyage);voyage.to(camera,{t:1,duration:reduced?6:18,ease:'none',onUpdate:render},0).call(()=>caption('离岸远一点，才看见江有多宽。街巷在身后，另一岸在眼前。'),[],reduced?2:6).call(()=>caption('船从两岸之间穿过。轮渡，也是武汉人的日常。'),[],reduced?4:12);
  };
  button(memory.crossed?'再坐一班船':'随船出发 →',start);caption('船票已验好。今天不赶路，坐一班船去那一岸。');
 }

 function cinema(){
  shell('cinema','从街口到江边。','先下拉幕边拉环，再转动手轮。今晚放的是原创街坊插画短片。');
  $('.journey-playfield').innerHTML='<img class="cinema-base" src="assets/scenes/courtyard-cinema.png" alt="街坊围坐的露天电影院子"><div class="projected-film"><img src="assets/scenes/breakfast-pot-closed.png" alt="原创街坊插画短片"></div><button class="curtain-pull" aria-label="向下拉开白幕，也可轻点"><i></i><span>拉开白幕 ↓</span></button><div class="projector-beam" aria-hidden="true"></div>';
  const film=$('.projected-film'),pull=$('.curtain-pull');let screenReady=false,angle=0,playing=false,chapter=0,filmTimer=null,paused=false,story=null,pauseButton=null;
  const unveil=p=>{const v=clamp(p,0,1);film.style.setProperty('--screen-reveal',v);pull.style.transform='translateY('+(v*50)+'px)';};
  function ready(){if(screenReady)return;screenReady=true;phase('screen-ready');unveil(1);pull.hidden=true;feedback('cloth-recorded.wav',.12);caption('白幕铺开了。转动手轮，再把画面对清楚。');$('.journey-buttons').innerHTML='<div class="projector-controls"><button class="projector-crank" aria-label="转动放映机手轮，或按左右键">↻<i></i></button><label>对焦<input class="film-focus" aria-label="对焦放映画面" type="range" min="0" max="100" value="18"></label></div>';const crank=$('.projector-crank');let startAngle=0;
   const rotate=v=>{angle=v;gsap.set(crank,{rotation:angle});if(Math.abs(angle)>65&&!playing)play();};
   draggable(crank,{move:({dx,dy})=>rotate(startAngle+dx*2+dy),end:()=>{startAngle=angle;}});listen(crank,'keydown',e=>{if(['ArrowLeft','ArrowRight','Enter',' '].includes(e.key)){e.preventDefault();rotate(angle+35);}});listen(crank,'click',()=>rotate(angle+80));
   listen($('.film-focus'),'input',e=>{const blur=Math.abs(+e.target.value-64)/13;film.style.setProperty('--film-blur',blur+'px');film.classList.toggle('focused',blur<1);});
  }
  function showFrame(){clearTimeout(filmTimer);if(chapter>=story.frames.length){window.StreetStory.film();phase('screening');caption('放映结束了。去纳凉小桌找陈姨，交过菜的话，她把空篮替你留在那里。');finish('散场，去找陈姨 →',routeOnward(ctx=>ctx.go('neighbors')));button('再看一次',()=>{playing=false;play();},'journey-secondary');return;}
   const frame=story.frames[chapter],image=film.querySelector('img');image.src=frame.src;image.alt=story.title+' / 第'+(chapter+1)+'段';gsap.set(image,{xPercent:0});tween(image,{xPercent:-5,duration:reduced?0:frame.ms/1000,ease:'none'});caption(frame.text);if(!paused)filmTimer=later(()=>{chapter++;showFrame();},frame.ms);
  }
  function play(){playing=true;paused=false;chapter=0;story=window.STREET_CONTENT.film(window.StreetStory.get());phase('projecting');feedback('cassette-recorded.wav',.06);$('.projector-beam').classList.add('on');film.classList.add('is-projecting');$('.journey-buttons').querySelector('.film-pause')?.remove();const pause=button('停在这一页，读一读',()=>{paused=!paused;if(paused){clearTimeout(filmTimer);pause.textContent='继续放映';}else{pause.textContent='停在这一页，读一读';showFrame();}},'journey-secondary film-pause');pauseButton=pause;showFrame();}
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing&&!paused&&host.dataset.phase==='projecting'){paused=true;clearTimeout(filmTimer);if(pauseButton)pauseButton.textContent='继续放映';}},{signal:controller.signal});cleanups.push(()=>clearTimeout(filmTimer));unveil(0);draggable(pull,{move:({dy})=>unveil(dy/90),end:({dy,cancelled})=>{if(!cancelled&&dy>38)ready();else unveil(0);}});listen(pull,'click',ready);
 }

 function fishing(){
  shell('fishing','江边，没有催人的钟。','把浮漂从岸边拖到水面。轻点也可以放线。');
  $('.journey-playfield').innerHTML='<img class="fishing-base" src="assets/scenes/night-fishing-clean.png" alt="石阶上的钓者与整片夜江"><div class="fishing-water" aria-label="可以放线的江面"></div><span class="fishing-line" aria-hidden="true"></span><button class="fishing-float" aria-label="将浮漂送到江面，轻点也可放线"><i></i><small>把浮漂送进江面 ↗</small></button><div class="float-ripples" aria-hidden="true"><i></i><i></i></div>';
  let cast=false,lifted=false,startX=0,startY=0,settled=false;const float=$('.fishing-float'),line=$('.fishing-line'),ripples=$('.float-ripples');
  function place(x,y){float.style.left=x+'%';float.style.top=y+'%';ripples.style.left=x+'%';ripples.style.top=y+'%';const dx=x-65.4,dy=(y-14.4)*.5625;line.style.width=Math.hypot(dx,dy)+'%';line.style.transform='rotate('+Math.atan2(dy,dx)*180/Math.PI+'deg)';}
  function castOut(){if(cast)return;cast=true;phase('waiting');place(66,67);float.classList.add('on-water');ripples.classList.add('visible');float.querySelector('small').textContent='轻轻提一下鱼线 ↑';feedback('breeze-recorded.wav',.07);caption('线松开了。看灯影晃一晃，浮漂也跟着水慢慢动。');later(()=>{if(!lifted){settled=true;float.classList.add('a-stir');caption('浮漂轻轻动了一下。不必抢，慢慢提线看看。');}},5500);}
  function lift(){if(!cast||lifted)return;lifted=true;phase('released');window.dispatchEvent(new CustomEvent('street:flow-complete',{detail:'fishing'}));float.classList.remove('a-stir','on-water');tween(float,{y:-35,duration:.8});caption(settled?'提起一点水、一点月光。没有鱼也没关系，今晚已经坐得很舒服。':'不赶这一口。鱼线提起来，又轻轻放下去。');feedback('cloth-recorded.wav',.08);later(()=>{tween(float,{y:0,duration:1});float.classList.add('on-water');},900);finish('收竿，结束这一天 ↗',routeOnward(ctx=>ctx.overview()));button('再陪江坐一会儿',fishing,'journey-secondary');}
  place(34,83);draggable(float,{move:({dx,dy})=>{if(!cast)gsap.set(float,{x:dx,y:dy});else gsap.set(float,{y:clamp(dy,-75,15)});},end:({x,y,dy,cancelled})=>{gsap.set(float,{x:0});if(cancelled){gsap.set(float,{y:0});return;}if(!cast){const r=$('.journey-playfield').getBoundingClientRect();const xp=(x-r.left)/r.width,yp=(y-r.top)/r.height;if(xp>.47&&yp>.35&&yp<.88){gsap.set(float,{y:0});castOut();}else tween(float,{x:0,y:0,duration:.3});}else if(dy<-24)lift();else tween(float,{y:0,duration:.3});}});listen(float,'click',()=>cast?lift():castOut());
 }

 function radio(){
  shell('radio','先把刻度对准，再听李伯讲。','转旋钮或移动滑杆。三段原创节目采用字幕播放；人声尚未制作。');
  $('.journey-playfield').innerHTML='<div class="radio-cabinet"><div class="radio-illustration" aria-hidden="true"></div><div class="radio-glass"><div class="radio-ticks">88　92　96　100　104　108</div><i class="radio-needle"></i><output class="radio-frequency">88.0</output><span class="radio-station">把指针对准一格</span></div><button class="radio-knob" aria-label="转动收音机调台旋钮，可用左右方向键"><i></i></button><label class="radio-range-label">虚构调音刻度<input class="radio-range" aria-label="收音机频率" type="range" min="88" max="108" value="88" step=".1"></label></div><section class="radio-transcript" aria-label="原创广播节目字幕"><small>原创模拟广播 · 字幕版</small><h3 class="programme-title">三段门口的小事</h3><p class="programme-cue" role="status" aria-live="polite">89.4 生活报 · 96.8 招领留言 · 104.2 李伯的机修手记。调准后，字幕会开始。</p><small class="programme-position">约三十秒一段；可暂停或逐句阅读。</small><div class="programme-buttons"></div><small class="programme-disclaimer">非真实台频或历史录音；尚未制作人声。字幕播放时配乐降低，收起后恢复。</small></section>';
  const stations=window.STREET_CONTENT.stations;let frequency=88,from=88,last=-1,programme=null,cue=0,programmeTimer=null,tuningTimer=null,paused=false,finished=false;
  const controls=$('.programme-buttons');
  function stop(){clearTimeout(programmeTimer);clearTimeout(tuningTimer);window.StreetMusic?.setDucked(false);programme=null;}
  function schedule(){clearTimeout(programmeTimer);if(!paused&&programme&&!finished)programmeTimer=later(nextCue,5000);}
  function renderCue(){if(!programme)return;$('.programme-title').textContent=programme.name;$('.programme-cue').textContent=programme.cues[cue];$('.programme-position').textContent='第 '+(cue+1)+' 句 / 共 '+programme.cues.length+' 句';schedule();}
  function complete(){if(finished||!programme)return;finished=true;window.StreetStory.programme(stations[last].id);window.StreetMusic?.setDucked(false);$('.programme-position').textContent='本段已读完，李伯会记得你看过。';phase('programme-complete');$('.programme-pause').textContent='从头再看';}
  function nextCue(){if(!programme||finished)return;if(cue>=programme.cues.length-1){complete();return;}cue++;renderCue();}
  function start(i){clearTimeout(programmeTimer);programme=window.STREET_CONTENT.programme(stations[i].id,window.StreetStory.get());cue=0;paused=false;finished=false;phase('programme-playing');window.StreetMusic?.setDucked(true);controls.replaceChildren();const add=(label,cls,fn)=>{const b=document.createElement('button');b.type='button';b.className=cls;b.textContent=label;controls.append(b);listen(b,'click',fn);return b;};
   add('上一句','programme-prev',()=>{if(!programme)return;finished=false;cue=Math.max(0,cue-1);window.StreetMusic?.setDucked(!paused);renderCue();});
   add('暂停字幕','programme-pause',()=>{if(!programme)return;if(finished){start(i);return;}paused=!paused;$('.programme-pause').textContent=paused?'继续字幕':'暂停字幕';window.StreetMusic?.setDucked(!paused);if(paused)clearTimeout(programmeTimer);else schedule();});
   add('下一句','programme-next',nextCue);renderCue();
  }
  function tune(f){frequency=clamp(f,88,108);$('.radio-frequency').textContent=frequency.toFixed(1);$('.radio-range').value=frequency;$('.radio-needle').style.left=(8+(frequency-88)/20*84)+'%';gsap.set($('.radio-knob'),{rotation:(frequency-98)*12});const i=stations.findIndex(s=>Math.abs(s.f-frequency)<.55);if(i===last)return;stop();last=i;if(i>=0){$('.radio-station').textContent=stations[i].name;$('.programme-cue').textContent='刻度对准了，字幕即将开始。';tuningTimer=later(()=>start(i),350);}else{phase('tuning');$('.radio-station').textContent='把指针对准一格';$('.programme-cue').textContent='旋钮离开频道，本段字幕已停止。89.4 / 96.8 / 104.2 各有一段。';$('.programme-position').textContent='字幕与配乐都不会从上一段串过来。';controls.replaceChildren();}}
  draggable($('.radio-knob'),{move:({dx,dy})=>tune(from+(dx-dy)/9),end:()=>{from=frequency;}});listen($('.radio-knob'),'keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();tune(frequency+(e.key==='ArrowRight'?.2:-.2));}});listen($('.radio-range'),'input',e=>tune(+e.target.value));
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&programme&&!finished){paused=true;clearTimeout(programmeTimer);window.StreetMusic?.setDucked(false);$('.programme-pause').textContent='继续字幕';}},{signal:controller.signal});cleanups.push(stop);tune(88);caption('对准刻度后字幕播放；想自己控制阅读速度，可以暂停后逐句翻看。');button('收起收音机，回桌边',()=>close(),'journey-secondary');
 }

 function soda(){
  shell('soda','沿着杯壁，斟一杯旧时光。','握住瓶子向右慢慢倾斜；松手会扶正。');
  $('.journey-playfield').innerHTML='<div class="soda-table"><button class="soda-bottle" aria-label="向右倾斜汽水瓶，也可按住右方向键"><span></span></button><div class="soda-stream" aria-hidden="true"></div><div class="enamel-cup"><span class="soda-level"></span><span class="soda-cup-art"></span></div></div>';
  let amount=0,angle=0,pouring=false,full=false,pourTween=null;
  function tilt(a){angle=clamp(a,0,118);const bottle=$('.soda-bottle'),cup=$('.enamel-cup'),field=$('.journey-playfield'),stream=$('.soda-stream'),shift=angle/110*field.clientWidth*.20,raise=angle/110*field.clientHeight*.30,radians=angle*Math.PI/180;gsap.set(bottle,{rotation:angle,x:shift,y:-raise});
   const neckX=bottle.offsetLeft+bottle.offsetWidth*.5+shift+Math.sin(radians)*bottle.offsetHeight*.63,neckY=bottle.offsetTop+bottle.offsetHeight*.7-raise-Math.cos(radians)*bottle.offsetHeight*.63,mouthX=cup.offsetLeft+cup.offsetWidth*.42,mouthY=cup.offsetTop+cup.offsetHeight*.13,dx=mouthX-neckX,dy=mouthY-neckY;
   Object.assign(stream.style,{left:neckX+'px',top:neckY+'px',height:Math.hypot(dx,dy)+'px',transform:'rotate('+(-Math.atan2(dx,dy)*180/Math.PI)+'deg)',opacity:angle>90&&!full?'.65':'0'});
   if(angle>90&&!pouring&&!full){pouring=true;feedback('soda-recorded.wav',.12);const liquid={value:amount};pourTween=gsap.to(liquid,{value:1,duration:3.4*(1-amount),ease:'none',onUpdate(){amount=liquid.value;$('.soda-level').style.height=(amount*9)+'%';},onComplete(){full=true;phase('poured');window.dispatchEvent(new CustomEvent('street:flow-complete',{detail:'soda'}));tilt(0);caption('气泡冒到杯沿，就刚刚好。冰凉的一口，留在这家夜里的小铺。');finish('放回杯子，去看电影 →',routeOnward(ctx=>ctx.go('cinema')));}});motions.push(pourTween);}else if(angle<=90&&pouring&&!full){pouring=false;pourTween?.kill();}}
  draggable($('.soda-bottle'),{move:({dx})=>tilt(dx*1.15),end:()=>{tilt(0);tween($('.soda-bottle'),{rotation:0,x:0,y:0,duration:.4});}});listen($('.soda-bottle'),'keydown',e=>{if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();tilt(110);}if(e.key==='ArrowLeft'){e.preventDefault();tilt(0);}});listen($('.soda-bottle'),'keyup',()=>{if(!full)tilt(0);});button('慢慢斟满这一杯',()=>tilt(110),'journey-secondary');
 }
 const flows={market,paper,fan,ticket,ferry,cinema,fishing,radio,soda};
 window.StreetJourneys={get active(){return !host.hidden;},open(flow,ctx){if(!flows[flow])return;close({silent:true});previous=document.activeElement;context=ctx;flows[flow]();},close};
})();
