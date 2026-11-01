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
 const pin=document.getElementById('history-pin'),dialog=document.getElementById('history-dialog');let active=null,opener=null;
 function close(){if(dialog.open)dialog.close();}
 function show(id){const p=photos[id];if(!p)return;active=id;pin.hidden=false;pin.querySelector('img').src=p.src;pin.querySelector('img').alt='';pin.querySelector('.history-pin-date').textContent=p.date;pin.querySelector('.history-pin-title').textContent=p.title;pin.setAttribute('aria-label','查看历史照片：'+p.title+'，'+p.date);}
 function open(){const p=photos[active];if(!p||dialog.open)return;opener=document.activeElement;document.getElementById('history-photo').src=p.src;document.getElementById('history-photo').alt=p.date+'，'+p.title;document.getElementById('history-date').textContent='真实影像 / '+p.date;document.getElementById('history-title').textContent=p.title;document.getElementById('history-caption').textContent=p.caption;document.getElementById('history-credit').textContent=p.credit;document.getElementById('history-source').href=p.source;dialog.showModal();}
 pin.addEventListener('pointerdown',e=>e.stopPropagation());pin.addEventListener('click',e=>{e.stopPropagation();open();});document.getElementById('history-close').addEventListener('click',close);dialog.addEventListener('click',e=>{if(e.target===dialog)close();});dialog.addEventListener('close',()=>{if(opener?.isConnected&&!pin.hidden)opener.focus({preventScroll:true});});
 window.addEventListener('street:view',e=>{close();pin.hidden=true;active=null;if(e.detail.state==='Scene')show(e.detail.scene);});
})();
