(() => {
 'use strict';
 const S=window.StreetStory,C=window.STREET_CONTENT;
 const dialog=document.getElementById('story-dialog'),body=document.getElementById('story-body');
 let context=null,controller=null,openedTrace=null,fitTimer=null;
 const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
 const listen=(n,type,fn)=>n.addEventListener(type,fn,{signal:controller.signal});
 function close(){if(dialog.open)dialog.close();controller?.abort();}
 dialog.addEventListener('close',()=>{if(dialog.open)return;controller?.abort();body.replaceChildren();});
 dialog.addEventListener('click',e=>{if(e.target===dialog)close();});
 function sheet(kind,kicker,title,lines=[]){close();controller=new AbortController();dialog.className='story-dialog story-'+kind;body.replaceChildren();body.append(el('small','story-kicker',kicker),Object.assign(el('h2','',title),{id:'story-heading'}));for(const line of lines)body.append(el('p','story-line',line));const x=document.getElementById('story-close');listen(x,'click',close);dialog.showModal();}
 function choices(){const row=el('div','story-choices');body.append(row);return row;}
 function choice(row,label,fn){const b=el('button','story-choice',label);b.type='button';row.append(b);listen(b,'click',fn);return b;}
 function sayPerson(id){const s=S.get(),person=C.people[id],d=C.dialogue(id,s);S.talk(id);sheet('person',person.name+' / '+person.role,person.name+'说',d.lines);dialog.dataset.person=id;dialog.dataset.branch=d.branch;
  const row=choices();if(id==='wu'){
   for(const [value,label]of Object.entries(C.flavors))choice(row,label,()=>{S.order(value);sheet('person','吴姐 / 灶边的口味便条','“'+label+'，写好了。”',['辣和葱各记一栏，不会凭一个“照旧”猜。你可以接着看这一碗做好，也可以先去别处。']);const next=choices();choice(next,'看看这一碗做好',()=>{close();context?.cook();});choice(next,'先记着，我再逛逛',close);});
  }else if(id==='chen'&&s.basketErrand==='delivered')choice(row,'接过空篮',()=>{if(S.returnBasket()){sheet('person','陈姨 / 红线篮把','“这回认得出是谁的了。”',['菜在周姐保鲜柜里，空篮你已接回。红线是陈姨留下的记号。她转头又去跟李伯争那张凳子了。']);choice(choices(),'把篮子收好',close);}});
  else if(id==='li'&&!s.heardLiStory)choice(row,'看看李伯的收音机',()=>{close();context?.openJourney('radio');});
  choice(row,'听完了，先逛别处',close);
 }
 function delivery(){const s=S.get(),d=C.delivery(s);sheet('delivery','周姐 / 傍晚交接，备明早的料',d.title,d.lines);dialog.dataset.errand=s.basketErrand;
  const row=choices();if(d.confirm)choice(row,'核对了，把这篮交给周姐',()=>{if(!S.deliver())return;sheet('delivery','周姐 / 接收记号已划好','“收到了，空篮给陈姨带过去。”',[C.items(S.get().errandProduce)+'已经收进保鲜柜，留作明早的料。今晚那锅汤仍是中午煨好的。','到纳凉小桌找陈姨，她会把空篮交还给你。']);choice(choices(),'好，记住了',close);});choice(row,d.confirm?'还没交，先收好':'收起备料笺',close);
 }
 function traceText(id){const s=S.get();if(id==='flavor-note'&&s.breakfastOrder)return '吴姐刚写下：'+C.flavors[s.breakfastOrder]+'。这张便条会留到你下次进铺；没说过的口味，她不会替你猜。';if(id==='reserve-tag'&&s.basketErrand==='reserved')return C.items(s.errandProduce)+'已按你的选择预留，陈姨的名字写在纸牌上。菜摊先保鲜，傍晚再交到汤铺。';if(id==='reserve-tag'&&['delivered','returned'].includes(s.basketErrand))return '纸牌上添了“周姐已收”：'+C.items(s.errandProduce)+'。这是你实际交过的那篮，不再重复留菜。';return C.traces[id].text;}
 function toggleTrace(id){if(!C.traces[id])return;openedTrace=openedTrace===id?null:id;S.discover(id);renderWorld();document.querySelector('[data-trace="'+id+'"] .story-note-tab')?.focus({preventScroll:true});}
 function fitOpenNote(){const note=document.querySelector('.story-note[data-open=true]');if(!note)return;note.style.setProperty('--note-shift-x','0px');note.style.setProperty('--note-shift-y','0px');const heading=document.getElementById('scene-heading').getBoundingClientRect(),index=document.getElementById('object-index').getBoundingClientRect(),top=Math.min(heading.bottom+10,innerHeight*.42),bottom=Math.min(innerHeight-90,index.top-12),copy=note.querySelector('.story-note-copy');copy.style.maxHeight=Math.max(110,bottom-top-48)+'px';const r=note.getBoundingClientRect(),world=document.getElementById('scene-world'),scale=world.getBoundingClientRect().width/world.offsetWidth,left=Math.max(16,Math.min(r.left,innerWidth-r.width-16)),y=Math.max(top,Math.min(r.top,bottom-r.height));note.style.setProperty('--note-shift-x',(left-r.left)/scale+'px');note.style.setProperty('--note-shift-y',(y-r.top)/scale+'px');}
 function renderWorld(){const old=document.getElementById('story-world');old?.remove();if(!context)return;const host=el('div','story-world');host.id='story-world';document.getElementById('scene-world').append(host);
  for(const a of context.scene.actions.filter(x=>x.type==='trace')){const t=C.traces[a.trace];if(!t)continue;const note=el('article','story-note');note.dataset.trace=a.trace;note.dataset.open=String(openedTrace===a.trace);Object.assign(note.style,{left:a.x*100+'%',top:a.y*100+'%',width:(a.noteWidth||.11)*100+'%'});const b=el('button','story-note-tab',t.short);b.type='button';b.setAttribute('aria-label','展开：'+t.title);b.setAttribute('aria-expanded',String(openedTrace===a.trace));b.onclick=()=>context?.runAction(a);note.append(b);const text=el('div','story-note-copy');text.hidden=openedTrace!==a.trace;text.append(el('strong','',t.title),el('p','',traceText(a.trace)),el('small','',t.link));
   text.addEventListener('pointerdown',e=>e.stopPropagation());note.append(text);host.append(note);}
  const s=S.get(),id=context.scene.id;if(id==='soup'&&['reserved','delivered'].includes(s.basketErrand)||id==='neighbors'&&s.basketErrand==='delivered'){
   const basket=el('div','story-basket');basket.dataset.empty=String(id==='neighbors');basket.setAttribute('role','img');basket.setAttribute('aria-label',id==='neighbors'?'陈姨替你带回的空篮':'你预留的'+C.items(s.errandProduce)+'，等待明早备料');Object.assign(basket.style,{left:(id==='neighbors'?.14:.74)*100+'%',top:(id==='neighbors'?.89:.86)*100+'%'});const paint=el('span','story-basket-art');basket.append(paint);
   if(id==='soup')s.errandProduce.forEach((p,i)=>{const item=el('span','story-basket-produce');item.style.setProperty('--slot',p==='greens'?0:p==='lotus'?50:100);item.style.setProperty('--n',i);basket.append(item);});basket.append(el('span','basket-red-thread'),el('small','',id==='neighbors'?'空篮 · 陈姨留着':s.basketErrand==='reserved'?'陈姨 · 待交接':'周姐已收 · 明早备料'));host.append(basket);
  }fitOpenNote();
 }
 function resetPrompt(){sheet('reset','只重置这段原创故事','重新逛这一天？',['会清除口味、送菜与人物进度，回到晨起全景。本地选择的配乐保留。']);const row=choices();choice(row,'重新开始这一天',()=>{close();document.getElementById('about-dialog').close();window.dispatchEvent(new CustomEvent('street:restart-day'));});choice(row,'保留今天的经历',close);}
 document.getElementById('restart-day').addEventListener('click',resetPrompt);
 window.addEventListener('street:story-change',renderWorld);window.addEventListener('resize',()=>{clearTimeout(fitTimer);fitTimer=setTimeout(fitOpenNote,180);});
 window.StreetStoryUI={mount(scene,ctx){context={...ctx,scene};openedTrace=null;renderWorld();},leave(){clearTimeout(fitTimer);close();context=null;openedTrace=null;document.getElementById('story-world')?.remove();},close,
  handle(a){if(a.type==='person'){sayPerson(a.person);return true;}if(a.type==='delivery'){delivery();return true;}if(a.type==='trace'){toggleTrace(a.trace);return true;}if(a.type==='cup'){toggleTrace('cup-mark');return true;}if(a.type==='stool'){S.discover('stool-repair');sheet('person','陈姨 / 先把凳子认准','“坐里边，别压外侧。”',['凳脚裂过，李伯箍了两圈线。我又套块布，挪凳子才不响。你看那一脚，就知道为什么我总要多嘴。']);choice(choices(),'好，坐稳了',()=>{close();window.StreetHistory?.moment('neighbors',{continueLabel:'回到小桌旁 →'});});return true;}return false;}};
})();
