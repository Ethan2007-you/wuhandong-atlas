/* Scene coordinates are normalized to the actual illustration, not the viewport. */
window.STREET_SCENES = Object.freeze([
  {id:'alley',name:'巷口',en:'THE ALLEY',time:'21:18',x:.08,y:.84,focus:[.50,.54],image:'assets/scenes/alley.png',title:'进来坐坐，<br>街里还有热的。',intro:'先认一认路，再听一声熟悉的车铃。',actions:[
    {id:'plaque',name:'认认路牌',x:.40,y:.437,w:.13,h:.09,type:'plaque'},
    {id:'lamp',name:'点亮楼道灯',x:.885,y:.29,w:.15,h:.18,type:'lamp'},
    {id:'bell',name:'碰一下车铃',x:.327,y:.63,w:.13,h:.12,type:'bell'}]},
  {id:'breakfast',name:'过早铺',en:'BEFORE THE DAY',time:'07:00 / 晨光里的过早',light:'morning',x:.25,y:.84,focus:[.54,.56],image:'assets/scenes/breakfast-pot-closed.png',title:'晨光刚到，<br>早点已上桌。',intro:'门里的灶火、锅里的热气，都是早起的日常。',actions:[
    {id:'door',name:'推开店门',x:.455,y:.57,w:.126,h:.50,type:'door'},
    {id:'noodles',name:'看看热干面',x:.675,y:.635,w:.10,h:.12,type:'food',food:6},
    {id:'menwo',name:'看看面窝',x:.75,y:.63,w:.09,h:.10,type:'food',food:7},
    {id:'doupi',name:'看看豆皮',x:.86,y:.64,w:.10,h:.12,type:'food',food:8},
    {id:'menu',name:'翻翻早点单',x:.563,y:.434,w:.055,h:.17,type:'menu'},
    {id:'pot',name:'听听锅里的水',x:.586,y:.605,w:.09,h:.16,type:'pot'},
    {id:'cook',name:'看一碗面做好',x:.677,y:.535,w:.09,h:.12,type:'cook'}]},
  {id:'barbecue',name:'老街烧烤',en:'CHARCOAL AFTER DARK',time:'21:23 / 炭火正暖',x:.43,y:.84,focus:[.64,.56],image:'assets/scenes/barbecue-night.png',title:'炭火慢慢红，<br>夜才刚热闹。',intro:'旧铁炉、搪瓷盘，几串烟火就能坐一晚。',actions:[
    {id:'charcoal',name:'靠近炭火',x:.53,y:.66,w:.28,h:.19,type:'charcoal'},
    {id:'skewers',name:'看看刚烤的串',x:.837,y:.738,w:.20,h:.13,type:'skewers'},
    {id:'bbq-fan',name:'扇一阵炉边风',x:.912,y:.367,w:.09,h:.21,type:'bbq-fan'},
    {id:'bbq-light',name:'留住这盏暖灯',x:.834,y:.233,w:.08,h:.14,type:'bbq-light'}]},
  {id:'grocery',name:'杂货铺',en:'LITTLE EVERYDAY THINGS',time:'21:28',x:.61,y:.84,focus:[.57,.55],image:'assets/scenes/grocery.png',title:'小东西，<br>也装着日子。',intro:'这里的四样旧物件，各有各的小脾气。',actions:[
    {id:'soda',name:'倒一杯汽水',x:.455,y:.64,w:.09,h:.25,type:'soda'},
    {id:'fan',name:'摇一摇蒲扇',x:.52,y:.65,w:.14,h:.20,type:'fan'},
    {id:'cup',name:'看看搪瓷杯',x:.66,y:.67,w:.11,h:.13,type:'cup'},
    {id:'torch',name:'试试旧手电',x:.80,y:.68,w:.14,h:.13,type:'torch'}]},
  {id:'neighbors',name:'街坊纳凉',en:'PULL UP A STOOL',time:'21:32',x:.78,y:.84,focus:[.50,.57],image:'assets/scenes/neighbors.png',title:'凳子挪一挪，<br>就是自己人。',intro:'搭句话、换个台，坐下来就不用赶路了。',actions:[
    {id:'aunt',name:'听阿姨说一句',x:.30,y:.52,w:.17,h:.29,type:'aunt'},
    {id:'uncle',name:'听大伯说一句',x:.67,y:.49,w:.18,h:.30,type:'uncle'},
    {id:'radio',name:'转转收音机',x:.49,y:.575,w:.15,h:.13,type:'radio'},
    {id:'stool',name:'坐这个空位',x:.43,y:.83,w:.16,h:.17,type:'stool'}]},
  {id:'night',name:'夜归处',en:'TAKE THE WARMTH HOME',time:'21:38',x:.93,y:.84,focus:[.49,.53],image:'assets/scenes/night.png',title:'烟火不散，<br>武汉东。',intro:'留句话给晚归的自己，把这点暖意带走。',actions:[
    {id:'postcard',name:'写一张明信片',x:.275,y:.78,w:.13,h:.11,type:'postcard'},
    {id:'wind',name:'听一阵江风',x:.78,y:.53,w:.19,h:.22,type:'wind'},
    {id:'lastlight',name:'再留一盏灯',x:.94,y:.53,w:.11,h:.13,type:'lastlight'}]}
]);
window.STREET_FOODS = Object.freeze({
  6:{name:'热干面',line:'芝麻酱要拌匀，萝卜丁留一点脆。',detail:'面在滚水里烫热，捞起沥干，再淋芝麻酱。趁着热气拌开，酱就挂在每一根面上。'},
  7:{name:'面窝',line:'中间薄脆，边缘松软，刚出锅最香。',detail:'米浆里点一点葱花和芝麻，舀进面窝勺，下油锅。拎在纸袋里，边走边吃也方便。'},
  8:{name:'豆皮',line:'焦香的蛋皮下面，包着热乎的糯米。',detail:'一大张摊好，切成方方正正的小块。糯米、豆干和香菇的味道，都藏在这一口里。'}
});
