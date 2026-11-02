/* Real photographs remain separate from the fictional illustrated locations. */
(() => {
 'use strict';
 const details={
  'breakfast-1987.jpg':[[48,65,'街边的队伍','照片里，食客聚集在江汉路的店门前。'],[56,27,'店门前','这是水塔对面的热干面馆；画卷里的吴姐与店铺是虚构的。']],
  'breakfast-1989.jpg':[[48,69,'一桌早点','碗碟摆在露天桌上，人们坐在一起吃早饭。'],[72,29,'街边的早晨','树下和摊位旁都有人，这张照片拍于航空侧路。']],
  'market-1984.jpg':[[56,69,'一地西瓜','车站路街边，西瓜堆成一片。'],[67,31,'运瓜的车','照片里一车瓜还停在摊位后面。']],
  'market-1992.jpg':[[65,64,'买菜的人','有人手里提着菜，从街市间走过。'],[28,70,'停在一旁的车','自行车停在街边，买菜、过早都在同一片街市里。']],
  'river-1988.jpg':[[40,42,'靠江歇脚','有人坐在岸边，有人站着看江。'],[66,73,'岸上的孩子','江边不只有江水，也有孩子在岸上玩耍。']],
  'river-1988-evening.jpg':[[28,24,'江上的桥','桥身从岸边伸向江面；这是武昌大桥下的实景。'],[61,83,'靠水的人们','人们在江边聚集、游泳，这张照片并非夜钓现场。']],
  'barbecue-1989.jpg':[[56,60,'街边的一桌','食客围坐在街边吃烧烤。'],[31,26,'紫阳路的夜市','桌椅和人群沿街铺开，照片摄于1989年的武昌紫阳路。']],
  'grocery-1992.jpg':[[78,64,'卖冰棒的摊点','胜利街的路边摊，照片记录了卖汽水和冰棒的小贩。'],[30,44,'街边的来往','摊点、行人和车挤在同一条街上。']],
  'neighbors-1984.jpg':[[52,66,'街边的椅子','三民路铜人像附近，人们在街上纳凉。'],[73,39,'楼前的夜晚','照片记录真实街景，画卷里的陈姨和李伯是虚构人物。']],
  'tea-1989.jpg':[[53,61,'门口的小桌','茶杯摆在桌上，几位老友坐在门前闲聊。'],[23,42,'洞庭街的傍晚','这张照片拍于1989年的洞庭街。']],
  'cinema-1987.jpg':[[57,36,'放映厅门面','这是武昌大东门一家影碟放映厅，并非露天电影现场。'],[47,69,'街边的人','照片保留了这家店门前的街道生活。']],
  'ferry-old.jpg':[[51,62,'船上的乘客','原报道将照片标为武汉轮渡，拍摄时间与摄影者未注明。'],[53,20,'船舱','人们在船舱里等着过江。']],
  'ferry-early.jpg':[[50,50,'轮渡','原报道称此图为早期武汉轮渡，具体拍摄时间未注明。']],
  'pier-pre1914.jpg':[[50,52,'汉口江港','这是第一次世界大战前的汉口江港，不是画卷里虚构的码头。']],
  'bookstall.jpg':[[50,54,'街头书摊','这是一处小人书摊，并非画卷中的报摊；原文未注明确切年代。']],
  'reading-1983.jpg':[[50,50,'读书的人','1983年的集贤村，有孩子在街坊间看小人书。']],
  'cooking-1985.jpg':[[50,55,'街头灶台','1985年武昌某巷的柴火灶，制作的是粑粑，不是煨汤。']],
  'television-1984.jpg':[[50,50,'街坊看电视','1984年任东街，人们聚在有电视的人家门前。']],
  'river-1989-evening.jpg':[[50,65,'沿江的人','1989年龙王庙，人们在汉水边玩水、乘凉。']],
  'ferry-unknown.jpg':[[50,50,'轮渡上的一刻','原报道未注明这张照片的具体日期及摄影者。']]
 };
 const root=document.createElement('dialog');root.id='real-street';root.className='real-street';root.setAttribute('aria-labelledby','real-title');root.innerHTML='<header class="real-top"><div><small>走进影像 / WUHAN IN LIFE</small><h2 id="real-title"></h2></div><button class="real-close" type="button">回到画卷 ×</button></header><div class="real-window"><div class="real-frame"><img class="real-image" alt=""><div class="real-points"></div></div></div><div class="real-bottom"><div><small class="real-date"></small><p class="real-note" aria-live="polite">点画面中的细节，走近看一看。</p><span class="real-credit"></span> <a class="real-source" target="_blank" rel="noopener noreferrer">查看出处 ↗</a></div><div class="real-actions"><button class="real-reset" type="button" hidden>退回街景</button><button class="real-next" type="button">走向另一处 →</button></div></div>';document.body.appendChild(root);
 const $=s=>root.querySelector(s),frame=$('.real-frame'),img=$('.real-image'),points=$('.real-points');let list=[],index=0,focus=null;
 function render(){const p=list[index];if(!p)return;frame.style.transform='';frame.style.transformOrigin='center';$('.real-reset').hidden=true;img.src=p.src;img.alt=p.date+'，'+p.title;$('#real-title').textContent=p.title;$('.real-date').textContent='真实影像 · '+p.date;$('.real-credit').textContent=p.credit;$('.real-source').href=p.source;$('.real-note').textContent='点画面中的细节，走近看一看。';$('.real-next').hidden=list.length<2;$('.real-next').textContent='走向另一处 '+(index+1)+' / '+list.length+' →';points.replaceChildren();const key=p.src.split('/').pop();(details[key]||[[50,50,'看这处街景',p.caption]]).forEach(([x,y,title,description])=>{const b=document.createElement('button');b.type='button';b.className='real-point';b.style.left=x+'%';b.style.top=y+'%';b.setAttribute('aria-label','走近看：'+title);b.innerHTML='<span aria-hidden="true">＋</span><em></em>';b.querySelector('em').textContent=title;b.addEventListener('click',()=>{frame.style.transformOrigin=x+'% '+y+'%';frame.style.transform='scale(1.45)';$('.real-note').textContent=description;$('.real-reset').hidden=false;});points.appendChild(b);});}
 function open(id,photos){if(!photos?.length||root.open)return false;list=photos;index=0;focus=document.activeElement;render();root.showModal();return true;}
 function close(){if(!root.open)return;root.close();frame.style.transform='';if(focus?.isConnected)focus.focus({preventScroll:true});focus=null;}
 $('.real-close').addEventListener('click',close);$('.real-reset').addEventListener('click',()=>{frame.style.transform='';$('.real-note').textContent='点画面中的细节，走近看一看。';$('.real-reset').hidden=true;});$('.real-next').addEventListener('click',()=>{index=(index+1)%list.length;render();});root.addEventListener('cancel',e=>{e.preventDefault();close();});window.addEventListener('street:view',close);window.RealStreet=Object.freeze({open});
})();
