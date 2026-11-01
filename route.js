/* A small, explicit walking itinerary. Completion comes from real interactions. */
(() => {
 'use strict';
 const KEY='wuhandong-guided-day', S=window.StreetStory;
 const steps=[
  {id:'breakfast',period:'morning',name:'过早铺',verb:'先吃一碗面',hint:'告诉吴姐口味，看她把面做好。吃过早，再去菜场。',action:'wu'},
  {id:'market',period:'morning',name:'早市菜摊',verb:'替陈姨留一篮菜',hint:'挑两样、称平秤杆，再决定是否帮陈姨留菜。菜先在这里保鲜，晚上交汤铺。',action:'market-basket'},
  {id:'newsstand',period:'morning',name:'街角报摊',verb:'翻到今晚的电影预告',hint:'展开报纸，看一眼院坝放映的消息。读完带走或放回都可以。',action:'paper-unfold'},
  {id:'exercise',period:'morning',name:'江滩晨练',verb:'在江边摇两下蒲扇',hint:'去码头之前歇一歇。轻点两次蒲扇，或左右慢摇。',action:'river-fan'},
  {id:'pier',period:'morning',name:'轮渡码头',verb:'把这张船票验好',hint:'点一下纸票，或把它划过验票口。验好后沿跳板上船。',action:'ferry-ticket'},
  {id:'ferry',period:'morning',name:'江上轮渡',verb:'坐完这一班轮渡',hint:'点击出发，看看两岸。靠岸后回到入夜路线，去汤铺交菜。',action:'river-crossing'},
  {id:'soup',period:'night',name:'巷口煨汤',verb:'把留好的菜交给周姐',hint:'先核对菜篮再交接。这篮备明早的料；空篮稍后去纳凉桌边取。',action:'basket-delivery'},
  {id:'barbecue',period:'night',name:'老街烧烤',verb:'到炭炉旁歇一脚',hint:'轻点炭火，看炉膛亮起来。交完菜，顺路去杂货铺喝口汽水。',action:'charcoal'},
  {id:'grocery',period:'night',name:'杂货铺',verb:'斟满一杯汽水',hint:'把瓶子向右倾，或点“斟满”。喝完去看早报预告的院坝电影。',action:'soda'},
  {id:'cinema',period:'night',name:'露天电影',verb:'把今晚的电影放出来',hint:'拉幕、转手轮、对焦。银幕会放今天这条路；散场后找陈姨。',action:'courtyard-movie'},
  {id:'neighbors',period:'night',name:'街坊纳凉',verb:'找陈姨拿回空篮',hint:'点陈姨，接过她留着的空篮。菜已交、篮已回，这件事才算办妥。',action:'aunt'},
  {id:'fishing',period:'night',name:'江滩夜钓',verb:'收一次鱼线，结束这一天',hint:'把线放到江面，再轻轻提起。没有鱼也没关系，走到这里就可以回家了。',action:'cast-line'}
 ];
 let progress={version:1,started:false,index:0,done:[],skipped:[]},view={state:'Overview',period:'morning',scene:null},ready=false,opening=false;
 const clean=v=>({version:1,started:v?.started===true,index:Math.max(0,Math.min(12,Number.isInteger(v?.index)?v.index:0)),done:Array.isArray(v?.done)?[...new Set(v.done.filter(x=>steps.some(s=>s.id===x)))]:[],skipped:Array.isArray(v?.skipped)?[...new Set(v.skipped.filter(x=>steps.some(s=>s.id===x)))]:[]});
 try{const raw=JSON.parse(localStorage.getItem(KEY));if(raw?.version===1)progress=clean(raw);}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(progress));}catch{}};
 const dialog=document.getElementById('route-dialog'),guide=document.getElementById('route-guide');
 function sheet(ending=false){
  const body=document.getElementById('route-body');body.replaceChildren();
  const add=(tag,cls,text)=>{const e=document.createElement(tag);e.className=cls;e.textContent=text;body.append(e);return e;};
  add('small','route-eyebrow',ending?'走完一整天 / 十二处生活':'今天，你来做这件小事');
  add('h2','',ending?'收竿了，\n今天就走到这里。':'帮陈姨留一篮菜，\n顺路逛过江。');
  add('p','route-lead',ending?'从一碗面，到一段江。今天的路，走到这里。':'陈姨明早要帮汤铺备料，托你在菜场留两样菜。菜摊先保鲜，晚上交给周姐，再向陈姨拿回空篮。');
  const route=add('div','route-preview','');route.hidden=ending;
  for(const [n,title,text]of [['01','晨起 · 从街口到江上','过早 → 留菜 → 看报 → 摇扇 → 验票 → 过江'],['02','入夜 · 从汤铺到小桌','交菜 → 看炭火 → 倒汽水 → 放电影 → 取空篮'],['03','江边 · 收竿回家','到江滩放一次线，再轻轻收回来']]){
   const row=document.createElement('div');row.innerHTML='<span>'+n+'</span><div><strong></strong><p></p></div>';row.querySelector('strong').textContent=title;row.querySelector('p').textContent=text;route.append(row);
  }
  if(ending){const s=S.get();add('p','route-footnote',s.basketErrand==='returned'?'你留的菜已交到周姐手里，空篮也已拿回。':s.basketErrand==='delivered'?'菜已交给周姐，空篮还在陈姨那儿。可以回去取，也可以先结束。':s.basketErrand==='reserved'?'你留的菜还没交汤铺。路线可以走完，这件事仍保留着。':'这次没有代送菜，你照自己的意思逛完了这一天。');}
  else add('p','route-footnote','每处只做一件小事。下面的小路签会告诉你怎么做、接着去哪；也可以跳过，随时自由逛。');
  const b=add('button','route-primary',ending?'回到全景':progress.index>0?'接着从'+current().name+'继续 ↗':progress.started?'继续这一段路':'从过早铺出发 ↗');b.onclick=()=>{dialog.close();if(ending)window.StreetAtlas.overview();else{progress.started=true;save();render();go();}};
  const free=add('button','route-free',ending?'再走一遍这条路线':'先自己逛，路线随时可看');free.onclick=()=>{dialog.close();if(ending){progress={version:1,started:true,index:0,done:[],skipped:[]};save();render();go();}else{progress.started=false;save();render();}};
  if(!dialog.open)dialog.showModal();if(!matchMedia('(prefers-reduced-motion: reduce)').matches)gsap.fromTo(body,{opacity:0,y:12},{opacity:1,y:0,duration:.45,ease:'power2.out'});
 }
 function current(){return steps[progress.index];}
 function correctPlace(){const x=current();return x&&view.state==='Scene'&&view.scene===x.id;}
 function complete(id){if(!progress.started||current()?.id!==id||progress.done.includes(id))return;progress.done.push(id);save();render();if(!matchMedia('(prefers-reduced-motion: reduce)').matches)gsap.fromTo(guide,{y:5},{y:0,duration:.35,ease:'power2.out'});}
 function recordStory(){if(!correctPlace())return;const s=S.get(),id=current().id;
  if(id==='breakfast'&&s.breakfastMade||id==='market'&&['reserved','delivered','returned','declined'].includes(s.basketErrand)||id==='newsstand'&&s.discoveredMemories.includes('paper-read')||id==='exercise'&&s.fanBorrowed||id==='pier'&&s.ticketValidated||id==='ferry'&&s.ferryCrossed||id==='soup'&&['delivered','returned'].includes(s.basketErrand)||id==='cinema'&&s.filmSeen||id==='neighbors'&&(s.basketErrand==='returned'||!['reserved','delivered'].includes(s.basketErrand)&&s.people.chen>0))complete(id);
 }
 function render(){
  guide.hidden=!progress.started;document.body.classList.toggle('route-active',progress.started);document.getElementById('route-toggle').textContent=progress.started?'这条路线':'跟着逛';if(!progress.started)return;
  const x=current(),finished=!x,done=x&&progress.done.includes(x.id),near=correctPlace(),s=S.get();
  guide.dataset.complete=String(!!done);guide.dataset.busy=String(view.state==='Transition'||opening);
  document.getElementById('route-count').textContent=finished?'从街口，走到江边':String(progress.index+1).padStart(2,'0')+' / 12 · '+(x.period==='morning'?'晨起':'入夜');
  document.getElementById('route-title').textContent=finished?'这一天，到这里。':done?'这一处，做到了。':x.verb;
  if(!done&&x?.id==='soup'&&!['reserved','delivered','returned'].includes(s.basketErrand))document.getElementById('route-title').textContent='听一听砂锅的热气';
  if(!done&&x?.id==='neighbors'&&!['reserved','delivered','returned'].includes(s.basketErrand))document.getElementById('route-title').textContent='跟陈姨打声招呼';
  let hint=finished?'你可以看看收尾，或回到画卷继续逛。':done?(progress.index===5?'船靠岸了。下一段入夜，我们去周姐汤铺。':progress.index===11?'鱼线收回，今天的小路走完了。':'下一站：'+steps[progress.index+1].name+'。') :x.hint;
  if(!done&&x?.id==='soup'&&!['reserved','delivered','returned'].includes(s.basketErrand))hint='你没有代送菜，不用交菜。点砂锅听听热气，再去炭炉旁。';
  if(!done&&x?.id==='neighbors'&&s.basketErrand!=='delivered')hint=s.basketErrand==='reserved'?'菜篮尚未交接。先回汤铺交菜，陈姨才有空篮还你。':'没有待取的空篮，跟陈姨打个招呼，再到江边。';
  document.getElementById('route-hint').textContent=hint;
  const button=document.getElementById('route-main');button.textContent=finished?'看看这一天的收尾 ↗':done?progress.index===11?'收竿，结束这一天 ↗':'继续 · '+steps[progress.index+1].name+' ↗':near?'做这一步 ↗':'前往 · '+x.name+' ↗';if(x?.id==='neighbors'&&s.basketErrand==='reserved')button.textContent=view.scene==='soup'?'核对并交菜 ↗':'先补交菜篮 ↗';button.disabled=view.state==='Transition'||opening;
  document.getElementById('route-skip').hidden=finished||!!done;document.getElementById('route-track').replaceChildren(...steps.map((s,i)=>{const dot=document.createElement('span');dot.className=i===progress.index?'current':progress.done.includes(s.id)?'done':progress.skipped.includes(s.id)?'skipped':'';dot.title=s.name;return dot;}));
  document.querySelectorAll('.route-target').forEach(n=>n.classList.remove('route-target'));if(near&&!done)document.querySelector('[data-testid="action-'+x.action+'"]')?.classList.add('route-target');
 }
 async function go(){if(opening||view.state==='Transition'||!current())return;opening=true;render();try{await window.StreetAtlas.go(current().period,current().id);}finally{opening=false;render();recordStory();}}
 async function act(){if(opening||view.state==='Transition')return;if(!current()){sheet(true);return;}if(progress.done.includes(current().id)){progress.index++;save();render();if(!current())sheet(true);else await go();return;}const s=S.get(),x=current();if(x.id==='neighbors'&&s.basketErrand==='reserved'){if(view.state==='Scene'&&view.scene==='soup')window.StreetAtlas.action('basket-delivery');else await window.StreetAtlas.go('night','soup');return;}if(!correctPlace()){await go();return;}window.StreetAtlas.action(x.id==='soup'&&!['reserved','delivered','returned'].includes(s.basketErrand)?'soup-pot':x.action);}
 document.getElementById('route-main').onclick=act;
 document.getElementById('route-skip').onclick=()=>{if(view.state==='Transition')return;const x=current();if(x&&!progress.skipped.includes(x.id))progress.skipped.push(x.id);progress.index++;save();render();if(current())go();else sheet(true);};
 document.getElementById('route-toggle').onclick=()=>sheet(progress.index===12);
 document.getElementById('route-close').onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
 window.addEventListener('street:view',e=>{view=e.detail;render();recordStory();});window.addEventListener('street:story-change',()=>{recordStory();render();});
 window.addEventListener('street:route-action',e=>{if(!correctPlace())return;if(current().id==='barbecue'&&e.detail==='charcoal'||current().id==='soup'&&e.detail==='soup-pot'&&!['reserved','delivered','returned'].includes(S.get().basketErrand))complete(current().id);});
 window.addEventListener('street:flow-complete',e=>{if(correctPlace()&&(e.detail==='soda'&&current().id==='grocery'||e.detail==='fishing'&&current().id==='fishing'))complete(current().id);});
 window.addEventListener('street:restart-day',()=>{progress={version:1,started:false,index:0,done:[],skipped:[]};save();render();});
 window.addEventListener('street:ready',()=>{ready=true;render();if(!progress.started)sheet();});
 window.StreetRoute=Object.freeze({next(){if(progress.started){if(!progress.done.includes(current()?.id))return;act();}else window.StreetAtlas.overview();},get steps(){return steps.map(s=>({...s}));}});
})();
