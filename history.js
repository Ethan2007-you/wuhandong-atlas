/* Historical photographs are explicitly distinguished from fictional scenes. */
(() => {
 'use strict';
 const paper='https://m.thepaper.cn/newsDetail_forward_22569966';
 const photos={
  breakfast:{src:'assets/history/breakfast-1987.jpg',date:'1987 · 江汉路',title:'水塔对面的热干面馆',caption:'过早的人排到店外。这张照片里的热干面馆位于江汉路，并非画卷中的虚构小铺。',credit:'摄影：谢国安；资料：汉声 / 澎湃新闻',source:paper},
  market:{src:'assets/history/market-1984.jpg',date:'1984 · 车站路',title:'街上卖瓜的摊位',caption:'盛夏的街头，西瓜成车运来。老照片拍的是瓜摊，画卷中的菜篮是原创情节。',credit:'摄影：谢国安；资料：汉声 / 澎湃新闻',source:paper},
  exercise:{src:'assets/history/river-1988.jpg',date:'1988 · 武昌中华路江边',title:'江边的午后',caption:'江边有人歇脚、聊天，孩子在岸边玩耍。这是武昌中华路江边的真实影像。',credit:'摄影：谢国安；资料：汉声 / 澎湃新闻',source:paper},
  pier:{src:'assets/history/pier-pre1914.jpg',date:'第一次世界大战前 · 汉口',title:'过去的汉口江港',caption:'早期汉口江港与停泊船只。照片是江港史料，并非画卷中虚构的轮渡码头。',credit:'作者不详；来源：Wikimedia Commons',source:'https://commons.wikimedia.org/wiki/File:Hankow_waterside.jpg'},
  cinema:{src:'assets/history/cinema-1987.jpg',date:'1987 · 武昌大东门',title:'街边的影碟放映厅',caption:'这是一家影碟放映厅的门面，记录那个年代看电影的方式；画卷中是原创的院坝放映。',credit:'摄影：谢国安；资料：汉声 / 澎湃新闻',source:paper},
  grocery:{src:'assets/history/grocery-1992.jpg',date:'1992 · 胜利街',title:'卖汽水和冰棒的小贩',caption:'街边卖汽水和冰棒的摊点，与画卷中的汽水瓶隔着三十多年相望。',credit:'摄影：谢国安；资料：汉声 / 澎湃新闻',source:paper},
  neighbors:{src:'assets/history/neighbors-1984.jpg',date:'1984 · 三民路铜人像',title:'夏夜乘凉的人们',caption:'人们把椅子摆到街边乘凉。照片记录的是三民路的夜晚，人物不是画卷中的虚构街坊。',credit:'摄影：谢国安；资料：汉声 / 澎湃新闻',source:paper}
 };
 const make=(file,date,title,caption,source=paper,credit='摄影：谢国安；资料：汉声 / 澎湃新闻')=>({src:'assets/history/'+file,date,title,caption,source,credit});
 const sohu='https://www.sohu.com/a/78286368_355712',ferrySource='https://www.peopleapp.com/rmharticle/30047474195';
 const extra={
  breakfast:make('breakfast-1989.jpg','1989 · 航空侧路','街头过早的热气','航空侧路的早餐摊和食客。'),
  market:make('market-1992.jpg','1992 · 武汉','买菜路上带早点','买菜和过早相连的日常。','https://m.thepaper.cn/baijiahao_15026832','摄影：谢国安；资料：Local本地 / 澎湃新闻'),
  reading:make('reading-1983.jpg','1983 · 集贤村','看小人书的孩子','街坊看小人书，不是画卷中虚构的报摊。'),
  bookstall:make('bookstall.jpg','年代未注明 · 武汉','街头小人书摊','街头读书摊；原文未注明拍摄者及确切年代。',sohu,'摄影者未注明；资料：搜狐，综合楚天都市报等'),
  riverEvening:make('river-1988-evening.jpg','1988 · 武昌大桥下','傍晚的江边','人们在桥下江边聚集、游泳，并非夜钓现场。'),
  riverHankou:make('river-1989-evening.jpg','1989 · 龙王庙','沿江的人和水','汉水边人们傍晚玩水、乘凉，与虚构的钓鱼情节分开记录。'),
  ferryOld:make('ferry-old.jpg','年代未注明 · 武汉','过去的过江轮渡','原报道配图为敞开式轮渡，拍摄者与具体日期未注明。',sohu,'摄影者未注明；资料：搜狐，综合楚天都市报等'),
  ferryEarly:make('ferry-early.jpg','年代未注明 · 武汉','早期武汉轮渡','原报道称此图为早期武汉轮渡，未注明具体年代及摄影者。',ferrySource,'摄影者未注明；资料：长江网 / 人民日报客户端，图片来源网络'),
  ferryRecent:make('ferry-unknown.jpg','日期未注明 · 武汉','轮渡上的乘客','轮渡上的一刻；原报道未注明具体日期及作者。',ferrySource,'摄影者未注明；资料：长江网 / 人民日报客户端，图片来源网络'),
  cooking:make('cooking-1985.jpg','1985 · 武昌某巷','巷口的柴火灶','街头用柴火制作粑粑，并非画卷中的煨汤摊。'),
  tea:make('tea-1989.jpg','1989 · 洞庭街','家门口喝茶','夏天傍晚，老友在门口喝茶闲聊。'),
  barbecue:make('barbecue-1989.jpg','1989 · 武昌紫阳路','夜市烧烤一条街','紫阳路夜市烧烤的真实影像，并非画卷中虚构的摊位。'),
  television:make('television-1984.jpg','1984 · 任东街','街坊围看电视','街坊在有电视机的人家门口观看节目，不是露天电影现场。')
 };
 const groups={breakfast:[photos.breakfast,extra.breakfast],market:[photos.market,extra.market],newsstand:[extra.bookstall,extra.reading],exercise:[photos.exercise,extra.riverEvening],pier:[photos.pier,extra.ferryEarly],ferry:[extra.ferryOld,extra.ferryRecent,extra.ferryEarly],cinema:[photos.cinema,extra.television],soup:[extra.cooking,extra.tea],barbecue:[extra.barbecue,photos.neighbors],grocery:[photos.grocery,photos.market],neighbors:[photos.neighbors,extra.tea],fishing:[extra.riverEvening,extra.riverHankou]};
 const pin=document.getElementById('history-pin'),dialog=document.getElementById('history-dialog'),gallery=document.getElementById('history-gallery'),moment=document.getElementById('history-moment');let active=null,index=0,opener=null,momentScene=null,momentIndex=0,momentCallback=null,momentOrigin=null;const seen=new Set();
 function close(){if(dialog.open)dialog.close();}
 function show(id){const group=groups[id],p=group?.[0];if(!p)return;active=id;index=0;pin.hidden=false;pin.classList.toggle('is-river',['exercise','pier','ferry','fishing'].includes(id));pin.querySelector('img').src=p.src;pin.querySelector('img').alt='';pin.querySelector('.history-pin-date').textContent=p.date;pin.querySelector('.history-pin-title').textContent=p.title;pin.querySelector('span:last-child').textContent='走进真实街景 · '+group.length+' 处 ↗';pin.setAttribute('aria-label','走进真实街景：'+p.title+'，'+p.date);}
 function selectPhoto(i){const group=groups[active],p=group?.[i];if(!p)return;index=i;document.getElementById('history-photo').src=p.src;document.getElementById('history-photo').alt=p.date+'，'+p.title;document.getElementById('history-date').textContent='真实影像 / '+p.date;document.getElementById('history-title').textContent=p.title;document.getElementById('history-caption').textContent=p.caption;document.getElementById('history-credit').textContent=p.credit;document.getElementById('history-source').href=p.source;gallery.replaceChildren(...group.map((photo,n)=>{const b=document.createElement('button');b.type='button';b.textContent=String(n+1).padStart(2,'0')+' · '+photo.title;b.setAttribute('aria-pressed',String(n===index));b.onclick=()=>selectPhoto(n);return b;}));}
 function open(){if(!groups[active]||dialog.open)return;if(window.RealStreet?.open(active,groups[active]))return;opener=document.activeElement;selectPhoto(0);dialog.showModal();}
 pin.addEventListener('pointerdown',e=>e.stopPropagation());pin.addEventListener('click',e=>{e.stopPropagation();open();});document.getElementById('history-close').addEventListener('click',close);dialog.addEventListener('click',e=>{if(e.target===dialog)close();});dialog.addEventListener('close',()=>{if(opener?.isConnected&&!pin.hidden)opener.focus({preventScroll:true});});
 const lines={breakfast:'那时的早饭，也摆在街边。',market:'买菜和过早，原本就在同一条路上。',newsstand:'翻开纸页，也翻到街边读书的人。',ferry:'这一段江，很多人每天都要过。',barbecue:'炭火边的热闹，也曾铺满一条街。',neighbors:'凳子挪到街边，一坐就是一个夏夜。',fishing:'今天走过的，是许多人曾经生活过的江边。'};
 function renderMoment(){const list=groups[momentScene],p=list?.[momentIndex];if(!p)return;const img=document.getElementById('moment-image');img.src=p.src;img.alt=p.date+'，'+p.title;document.getElementById('moment-date').textContent='真实影像 / '+p.date;document.getElementById('moment-title').textContent=p.title;document.getElementById('moment-line').textContent=lines[momentScene]||'这一刻，留在武汉的旧影里。';document.getElementById('moment-caption').textContent=p.caption;document.getElementById('moment-credit').textContent=p.credit;document.getElementById('moment-source').href=p.source;document.getElementById('moment-next').hidden=list.length<2;document.getElementById('moment-next').textContent='再看一眼 '+(momentIndex+1)+' / '+list.length+' ↗';if(!matchMedia('(prefers-reduced-motion: reduce)').matches)gsap.fromTo(img,{opacity:.25,scale:1.015},{opacity:1,scale:1,duration:.8,ease:'power2.out',overwrite:true});}
 function finishMoment(resume=true){if(!moment.open)return;const callback=momentCallback,focus=momentOrigin;momentCallback=null;momentOrigin=null;momentScene=null;gsap.killTweensOf(moment);gsap.killTweensOf(document.getElementById('moment-image'));moment.close();if(resume){if(focus?.isConnected)focus.focus({preventScroll:true});callback?.();}}
 function playMoment(id,opts={}){if(!groups[id]||document.querySelector('dialog[open]')||(seen.has(id)&&!opts.repeat))return false;seen.add(id);momentScene=id;momentIndex=Math.max(0,Math.min(groups[id].length-1,opts.index||0));momentOrigin=document.activeElement;momentCallback=opts.onContinue||null;document.getElementById('moment-continue').textContent=opts.continueLabel||'继续逛这条街 →';renderMoment();moment.showModal();if(!matchMedia('(prefers-reduced-motion: reduce)').matches)gsap.fromTo(moment,{opacity:0},{opacity:1,duration:.65,ease:'power2.out',overwrite:true});return true;}
 document.getElementById('moment-continue').addEventListener('click',()=>finishMoment(true));document.getElementById('moment-next').addEventListener('click',()=>{momentIndex=(momentIndex+1)%groups[momentScene].length;renderMoment();});moment.addEventListener('cancel',e=>{e.preventDefault();finishMoment(true);});
 window.StreetHistory=Object.freeze({moment:playMoment,dismiss:()=>finishMoment(false)});
 window.addEventListener('street:view',e=>{finishMoment(false);close();pin.hidden=true;active=null;if(e.detail.state==='Scene')show(e.detail.scene);});
})();
