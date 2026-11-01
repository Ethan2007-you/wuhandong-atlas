/* Original fictional street stories. These are not historical records or user memories. */
(() => {
 'use strict';
 const produce={greens:'青菜',lotus:'莲藕',radish:'白萝卜'},flavors={regular:'麻酱原味',less_chili:'少点辣',scallion:'多放葱'};
 const items=a=>a.map(x=>produce[x]).filter(Boolean).join('、');
 const people={
  chen:{name:'陈姨',role:'退休缝纫工，明早替汤铺切菜',habit:'怕东西混了主人，篮把上缝一截红线；提醒别人时总像在发号施令。',concern:'留好明早的菜，散场前把借的篮子还掉。',relation:'李伯修凳子，她拿布条消响；偶尔借吴姐的杯，常忘了放哪儿。',object:'红线篮把与背面写“陈”的蒲扇'},
  li:{name:'李伯',role:'退休轮渡机修工',habit:'收音机指针要对准刻度，别人说“差不多”他不答应。',concern:'把电影放映前的收音机调稳；不许陈姨把旧机子换成新音箱。',relation:'给陈姨补过凳脚，借过吴姐的杯盖垫电池仓。',object:'用橡皮圈扣住电池盖的旧收音机'},
  wu:{name:'吴姐',role:'过早铺摊主',habit:'口味先写便条再下碗，忙起来也不凭印象乱放辣。',concern:'第二锅面窝别被当成售完；找回底下刻三角的搪瓷杯。',relation:'陈姨借过她的杯；李伯总拿“再来一点”代替说清口味。',object:'杯底刻△的搪瓷杯和改过的早点单'}
 };
 function dialogue(id,s){const first=!s.people[id],flavor=flavors[s.breakfastOrder];
  if(id==='chen'){
   if(s.basketErrand==='returned')return{branch:'returned',lines:['篮子你已经拿回去了，红线留着，别剪。下回看见这截线就认得出。',s.discoveredMemories.includes('cup-mark')?'吴姐的杯原来寄在杂货柜？怪我，昨天拿它装瓜子，收桌时当成李伯的了。':'李伯说这凳子修完能坐十年。十年我不敢说，今天先别往外侧压。']};
   if(s.basketErrand==='delivered')return{branch:'return',lines:['周姐把菜收进保鲜柜了，空篮我替你拿到桌边。你核过那张备料笺，她才敢收。',s.errandProduce.includes('lotus')?'你选的藕留着明早下锅。今晚喝到的那碗，是中午已经煨上的。':'你带的'+items(s.errandProduce)+'留作明早的配菜，藕是周姐另外备的。别把两篮算在一起。','篮把的红线是我缝的，省得又认错。你走时把空篮拿回去。']};
   if(s.basketErrand==='reserved')return{branch:'waiting',lines:['你留的'+items(s.errandProduce)+'还在菜摊的保鲜箱里。傍晚去汤铺核一下名字，就能交接。','别急着说汤是你带的菜煨的，今晚那锅中午就上火了。']};
   if(s.basketErrand==='declined')return{branch:'declined',lines:['你早上挑的菜自己带走就行，我那份周姐另有安排。','莫坐凳子靠外那边。李伯箍过脚，说牢靠，我还是让你坐里边。']};
   return{branch:first?'first':'again',lines:first?['我姓陈，叫陈姨。先别坐靠外那张凳子，脚修过，我给你挪个稳的。','明早我去周姐铺里帮忙切菜。没托上人也不打紧，她留了备用的一篮。']:['又来啦？李伯把凳子往外挪一寸，我就往里挪一寸。你坐中间，别替他试手艺。',s.discoveredMemories.includes('cup-mark')?'杯底有三角？那是吴姐的！昨天借来装瓜子，收桌时忘在杂货铺了。':'蒲扇背面有个“陈”。不是防你拿，是防李伯拿着就走。']};
  }
  if(id==='li'){
   if(s.heardLiStory)return{branch:'heard',lines:['橡皮圈那段你看完了？修东西有时不是换件，是别把那个人的习惯也换掉。',s.ticketValidated?'你今天也验过船票了。跳板上推车，先扶稳，别光顾着看江。':'我修过轮渡的机舱，也修过这台收音机。船靠岸前最忙，机子倒只要换两节电池。']};
   if(s.programsRead.includes('letters'))return{branch:'letters',lines:['那张招领条写的是吴姐的杯。陈姨说像我的，我的杯底哪有三角？','把旋钮对到“机修手记”那格，别停在两格中间。橡皮圈的来历还没讲。']};
   return{branch:first?'first':'again',lines:first?['姓李，以前在轮渡干机修。这个旋钮别掰到底，老机子得顺着它的脾气。','先对准“机修手记”那格，再看我为什么不肯换它。不是舍不得那几个钱。']:['还差半格。你说差不多，我耳朵可不认。','陈姨拿蓝布套垫凳脚，我用铅丝箍裂口。她把难看的留给我，好看的归她。']};
  }
  if(s.discoveredMemories.includes('cup-mark'))return{branch:'cup',lines:['你在杂货柜看见杯底的△了？那就是我的。陈姨又当李伯的收起来了。',flavor?'你的口味便条还贴着：'+flavor+'。要换口味你说一声，我不猜。':'这回要哪种口味？我先写下来，再下碗。']};
  if(s.breakfastMade)return{branch:'made',lines:[flavor?flavor+'那碗做好了。下回照这张便条做，不用你重新解释。':'刚才那碗做好了。你没选口味，我就没替你写“照旧”。','第二锅面窝在炸，桌上几只给街坊留的。别看纸上有“售完”两个字就掉头。']};
  if(flavor)return{branch:'ordered',lines:['记下了，'+flavor+'。便条压在碗底，忙也不会拿错。','李伯就会说“再一点”，辣一点还是葱一点？你比他讲得清楚。']};
  return{branch:first?'first':'again',lines:first?['叫我吴姐。先说口味，辣和葱分开记，免得李伯一喊“照旧”又嫌辣。','陈姨昨晚借了我的搪瓷杯，底下刻个三角。她说没拿，我先不跟她争。']:['锅正开着，口味还没写。你不说，我就不能替你记成“老样子”。','“第一锅售完”后面还有一行：第二锅在炸。那行是陈姨替我添的，字大多了。']};
 }
 function delivery(s){const p=items(s.errandProduce),lotus=s.errandProduce.includes('lotus');
  if(s.basketErrand==='reserved')return{title:'周姐把备料笺转了过来。',lines:['早晨寄存的菜篮已从菜摊保鲜箱取出。傍晚路过汤铺，你把单子上的名字核一核，再交给周姐。','周姐：“'+p+'，是陈姨明早要用的这篮吧？”',lotus?'“藕留作明早那锅。今晚这锅中午就煨上了，不能算你的功劳。”':'“没有藕没事，这些明早做配菜。汤里的藕我另备，两份分开记。”'],confirm:true};
  if(['delivered','returned'].includes(s.basketErrand))return{title:'菜已经收进保鲜柜。',lines:[lotus?'陈姨选好的莲藕那栏，周姐已划了接收记号。':'你带的是'+p+'，配菜一栏已划收；莲藕一栏标着“周姐另备”。',s.basketErrand==='returned'?'空篮已经由陈姨还给你，不会再交接第二次。':'空篮被陈姨带到纳凉小桌旁了。她还惦记着把篮子还你。','今晚的汤是中午煨好的；你帮忙备的是明早的料。'],confirm:false};
  return{title:'周姐的明早备料笺。',lines:[s.basketErrand==='declined'?'“你早上那篮自己带着吧。我给陈姨另留，不混着记。”':'“你是来喝汤的吧？明早这张单我留着。陈姨没托上人，我就自己去补。”','眼前这一锅中午就上火了。灶边另一张纸，是明早的备料，墨还没干。'],confirm:false};
 }
 const traces={
  'menu-edit':{scene:'breakfast',title:'添了一行的早点单',short:'第一锅售完？',text:'“第一锅面窝售完”下面，陈姨替吴姐添了一行：“第二锅 07:20 出锅；桌上几只给街坊留的。”旧单和后来添的字均为原创情景，不作武汉历史价格记录。',link:'想知道谁写的，去纳凉处问陈姨。'},
  'flavor-note':{scene:'breakfast',title:'吴姐的口味便条',short:'口味写在这里',text:'辣和葱分开写。李伯只说“再一点”，她干脆把“说明白”三个字贴在灶边。',link:'点吴姐，可以留下你实际选的口味。'},
  'reserve-tag':{scene:'market',title:'红线系着的预留牌',short:'陈姨 · 先保鲜',text:'陈姨要替周姐备明早的菜。有藕就留藕，没有也可带两样配菜。选好后先寄菜摊保鲜，傍晚经过汤铺再交，不拎着鲜菜晒一天。',link:'你可以帮忙，也可以只挑自己的一篮。'},
  'movie-notice':{scene:'newsstand',title:'院坝今晚开映',short:'今晚的白幕',text:'20:00，院坝白幕放原创照片故事《一只篮子借了三回》。陈姨说“看完把凳子各家领走”，李伯在旁边添一句“先别碰放映机”。',link:'晚上去露天电影，可以看到这则预告的回应。'},
  'cup-notice':{scene:'newsstand',title:'招领：杯底有个△',short:'有人找杯子',text:'吴姐昨晚借出去的搪瓷杯，被陈姨收进了杂货铺柜台。店主请她别再问杯沿的花，先看杯底有没有三角。',link:'杂货铺的押瓶本里夹着领杯条。'},
  'deposit-ledger':{scene:'grocery',title:'押瓶本里夹着领杯条',short:'陈姨的两只空瓶',text:'陈姨：空汽水瓶两只，已收。李伯：还差一只。夹页：“吴姐的杯在右柜，不算瓶子，不记押金。”店主又把“不记”描粗了一遍。',link:'先看杯底记号，再告诉陈姨，别真把杯子当押瓶。'},
  'fan-name':{scene:'neighbors',title:'蒲扇背面的小字',short:'背面写着“陈”',text:'陈姨用剩下的线头缠了扇柄，又写一个“陈”。李伯嫌字太大，她说：“大一点，你拿回去一眼就看得见。”',link:'晨练时借到的扇子，也是陈姨的。'},
  'stool-repair':{scene:'neighbors',title:'响一声的凳脚',short:'修过的这一脚',text:'凳脚裂过一道口，李伯箍了两圈线；陈姨另套一截布，免得一挪就刮地。她嘴上不信“能坐十年”，却一直把这张留在自家门口。',link:'可以看看故事里修补前后留下的痕迹。'},
  'ticket-note':{scene:'pier',title:'票背的一句提醒',short:'先扶稳，再推车',text:'“先扶稳，再推车。”李伯当年在班组便笺上写的话，如今被抄在这幅原创画卷的船票背面。不是历史票样，也不是现行乘船告示。',link:'晚上把收音机调到“机修手记”，再听他讲那道橡皮圈。'},
  'cup-mark':{scene:'grocery',title:'吴姐的杯底记号',short:'杯底的△',text:'吴姐说杯沿的花谁家都有，杯底那道浅三角才认得出。陈姨昨晚拿它装瓜子，收桌时把它当成李伯的，顺手寄在杂货柜里。',link:'告诉吴姐或陈姨，她们会对这次发现作出回应。'}
 };
 function ferryArrival(s){const belongings=[];if(s.selectedProduce.length)belongings.push('你挑的'+items(s.selectedProduce));if(s.paperTaken)belongings.push('那张街坊早报');return '那一岸到了。'+(belongings.length?belongings.join('，还有')+'，都在今天这段经历里。':'你只带着验过的纸票，过了这一段江。')+(s.basketErrand==='reserved'?'陈姨那份还在菜摊保鲜，傍晚别拎错了。':'');}
 function postcard(s){
  const out=[];if(s.breakfastOrder)out.push('吴姐记下：'+flavors[s.breakfastOrder]);else if(s.breakfastMade)out.push('在吴姐铺里看过一碗面做好');
  if(s.selectedProduce.length)out.push('挑过：'+items(s.selectedProduce));
  if(s.basketErrand==='reserved')out.push('替陈姨预留了明早的菜');if(s.basketErrand==='delivered')out.push('把备料篮交到周姐汤铺');if(s.basketErrand==='returned')out.push('送过菜，也从陈姨手里取回空篮');
  if(s.paperTaken)out.push('夹走一张街坊早报');else if(s.discoveredMemories.includes('paper-read'))out.push('读过街坊早报，留在报摊');
  if(s.ticketValidated)out.push('验过一张船票'+(s.ferryCrossed?'，到过另一岸':''));else if(s.discoveredMemories.includes('ticket-note'))out.push('读过票背的“先扶稳，再推车”');
  if(s.fanBorrowed)out.push('在江滩摇过陈姨的扇子');if(s.heardLiStory)out.push('看完李伯的“橡皮圈”机修手记');
  for(const id of s.programsRead||[])if(id!=='li')out.push('读完字幕《'+(id==='street'?'街坊生活报':'招领小留言')+'》');
  if(s.discoveredMemories.includes('cup-mark'))out.push('认出吴姐杯底的△');if(s.discoveredMemories.includes('memory-stool-repair'))out.push('看过李伯和陈姨修补的凳脚');if(s.discoveredMemories.includes('memory-menu-edit'))out.push('在旧单上认出陈姨补的后半句');
  if(s.filmSeen)out.push('在院坝看完《一只篮子借了三回》');return out;
 }
 function newspaper(s){return[
  {title:'今晚院坝放一只篮子的故事',text:'20:00，白幕放原创照片故事《一只篮子借了三回》。陈姨请各家带凳子，李伯只管放映机，谁也别替他乱拧。'},
  {title:'招领：别光认杯沿的花',text:'吴姐找杯底刻△的搪瓷杯。陈姨昨晚借去装瓜子，收桌时寄在杂货柜。押瓶本夹页写着：“杯子不算空瓶。”'},
  {title:'陈姨的明早备料',text:s.basketErrand==='reserved'?'你预留的'+items(s.errandProduce)+'先寄菜摊保鲜，傍晚再交到周姐汤铺。今晚那锅汤中午已上火。':['delivered','returned'].includes(s.basketErrand)?'你预留的'+items(s.errandProduce)+'，周姐已接收。那是明早的备料，不是今晚现成的汤。':'陈姨明早替周姐切菜，有藕留藕，没有就备两样配菜。没人顺路时，周姐会另备，不把这件小事压给路过的人。'},
  {title:'街坊来信 / 李伯多写了半句',text:'“先扶稳，再推车”，本来只是班组便笺。陈姨让李伯写清楚“人也要站稳”，说有些人只顾车，不顾自己。——原创街坊来信'}
 ];}
 const stations=[{id:'street',f:89.4,name:'街坊生活报'},{id:'letters',f:96.8,name:'招领小留言'},{id:'li',f:104.2,name:'李伯的机修手记'}];
 function programme(id,s){const errand=s.basketErrand,lotus=s.errandProduce.includes('lotus');const all={
  street:{name:'街坊生活报',by:'原创模拟广播 · 字幕版',cues:[
   '这里是画卷里的街坊生活报。不是实际电台，今天只报三件门口的小事。',
   '吴姐门上写“第一锅售完”，有人看一眼就走。陈姨替她补了第二锅出锅的时间。',
   '她说，写字不是越省越好，少半句话，就得多追出去解释一回。',
   errand==='reserved'?'菜摊有一篮'+items(s.errandProduce)+'，是你替陈姨留的。先保鲜，傍晚再交给周姐。':['delivered','returned'].includes(errand)?'你交给周姐的'+items(s.errandProduce)+'已经收进保鲜柜，留作明早的料。今晚那锅中午就煨上了。':'菜摊留菜这件事，你没有接下。陈姨那份由周姐另备，今晚照常开汤。',
   lotus&&['delivered','returned'].includes(errand)?'莲藕一栏已划接收。空篮由陈姨带到纳凉桌边，跟菜分开记。':'没有交来的莲藕，不写成谁送的。备料单留一栏，等真收到再划。',
   '最后提醒一件：院坝白幕开映后，门口还要留一条能走人的缝。陈姨说，挪凳子这事她管。'
  ]},
  letters:{name:'招领小留言',by:'原创模拟广播 · 字幕版',cues:[
   '这是一则原创街坊留言。吴姐说，她那只搪瓷杯，杯底有一道浅三角。',
   '陈姨昨天借来装瓜子，收桌时觉得花样像李伯的，就放到了杂货柜。',
   '店主把领杯条夹在押瓶本里，特意写了“杯子不算空瓶”，又描粗一次。',
   '李伯听见就不服：“我的杯底没三角。你不能见个搪瓷杯，都写成我的。”',
   s.discoveredMemories.includes('cup-mark')?'你已经认过那个杯底记号。这回再去跟吴姐或陈姨说，她们知道你说的是哪只。':'想认一认，就到杂货铺看看杯底。没看过，先别替吴姐说找到了。',
   '杯子还寄在柜台，不会自动跑回谁手里。这则留言只把位置讲清，取不取，等主人顺路。'
  ]},
  li:{name:'李伯的机修手记',by:'李伯 / 原创角色回忆 · 字幕版',cues:[
   '“故事里的2009年，我还在轮渡干机修。别人只记得船靠岸，我记得靠岸前机舱不能分神。”',
   '“有回陈姨拿收音机来，电池盖卡扣断了，路一颠就掉。她不让我把整个壳换掉。”',
   '“我找根橡皮圈扣上，她嫌难看，第二天拿了截蓝布套。线头还给我剪得齐齐的。”',
   '“后来我自己留着这台机子。指针差半格也要拧正，倒不全为了声响，是手上的习惯。”',
   s.ticketValidated?'“你今天也验过画卷船票了。票背那句‘先扶稳，再推车’，是我们这段故事里的提醒。”':'“哪天去码头，看看画卷船票的背面。我那句‘先扶稳，再推车’，被抄在上头。”',
   '“她修布，我修铁，各管一半。你问谁修得好？这话你去问她，我不先说。”'
  ]}
 };return all[id];}
 function film(s){const read=s.paperTaken||s.discoveredMemories.includes('paper-read');let today;
  if(['delivered','returned'].includes(s.basketErrand))today='今天第三回：你选的'+items(s.errandProduce)+'，经你核对交到周姐手里，留作明早备料。';
  else if(s.basketErrand==='reserved')today='今天第三回：你替陈姨留了'+items(s.errandProduce)+'。这篮仍在菜摊保鲜，尚未交接，银幕不会替你把事做完。';
  else if(s.basketErrand==='declined')today='今天你只挑了自己的一篮。陈姨把旧篮借给周姐装备用菜，一样能开明早的铺。';
  else today='今天陈姨又把篮子送到汤铺，请周姐留明早的备用菜。周姐先核过名字，才肯把这只旧篮收下。';
  return{title:'一只篮子借了三回',frames:[
   {src:'assets/scenes/breakfast-pot-closed.png',text:(read?'早报预告过这只篮子。':'这只篮子在这条街上借过几回。')+'第一回，吴姐借它装街坊的碗，陈姨把干净布垫在底下。',ms:6500},
   {src:'assets/scenes/market-day.png',text:'第二回，李伯拿去装螺丝。陈姨没夸他修好凳子，只追着问：“篮底洗干净了没有？”',ms:6500},
   {src:['delivered','returned'].includes(s.basketErrand)?'assets/scenes/soup-night.png':'assets/scenes/market-day.png',text:today,ms:7500},
   {src:'assets/scenes/neighbors.png',text:(s.basketErrand==='returned'?'你已经从陈姨手里接回空篮。':s.basketErrand==='delivered'?'空篮在陈姨脚边，等你散场去接。':'镜头回到纳凉的小桌。')+(s.fanBorrowed?'你早上摇过的那把扇子，背面写着“陈”。':'陈姨翻过蒲扇，背面的“陈”字比手写招牌还大。')+'李伯说：“篮子可以借，螺丝下回我用铁盒。”',ms:7500}
  ]};}
 window.STREET_CONTENT={people,produce,flavors,items,dialogue,delivery,traces,ferryArrival,postcard,newspaper,stations,programme,film};
})();
