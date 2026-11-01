/* Only this key is reset. Other browser data and local music are untouched. */
(() => {
 'use strict';
 const KEY='wuhandong-story-day',VERSION=1,produce=['greens','lotus','radish'],stages=['not_started','declined','reserved','delivered','returned'];
 const scenes=['breakfast','market','newsstand','exercise','pier','ferry','cinema','soup','barbecue','grocery','neighbors','fishing'];
 const unique=(v,allowed)=>Array.isArray(v)?[...new Set(v.filter(x=>typeof x==='string'&&(!allowed||allowed.includes(x))))].slice(0,80):[];
 const fresh=()=>({version:VERSION,lastPeriod:'morning',breakfastOrder:null,breakfastMade:false,selectedProduce:[],basketErrand:'not_started',errandProduce:[],paperTaken:false,ticketValidated:false,ferryCrossed:false,fanBorrowed:false,heardLiStory:false,programsRead:[],discoveredMemories:[],visitedScenes:[],sceneVisits:{},people:{chen:0,li:0,wu:0},filmSeen:false});
 function sanitize(raw){const s=fresh();if(!raw||raw.version!==VERSION)return s;
  s.lastPeriod=raw.lastPeriod==='night'?'night':'morning';s.breakfastOrder=['regular','less_chili','scallion'].includes(raw.breakfastOrder)?raw.breakfastOrder:null;
  for(const k of ['breakfastMade','paperTaken','ticketValidated','ferryCrossed','fanBorrowed','filmSeen'])s[k]=raw[k]===true;
  if(!s.ticketValidated)s.ferryCrossed=false;
  s.selectedProduce=unique(raw.selectedProduce,produce);s.errandProduce=unique(raw.errandProduce,produce);s.basketErrand=stages.includes(raw.basketErrand)?raw.basketErrand:'not_started';
  if(['reserved','delivered','returned'].includes(s.basketErrand)&&s.errandProduce.length<2){s.basketErrand='not_started';s.errandProduce=[];}
  if(!['reserved','delivered','returned'].includes(s.basketErrand))s.errandProduce=[];
  s.discoveredMemories=unique(raw.discoveredMemories).filter(x=>/^[a-z0-9-]{1,45}$/.test(x));s.programsRead=unique(raw.programsRead,['street','letters','li']);s.heardLiStory=s.programsRead.includes('li');
  s.visitedScenes=unique(raw.visitedScenes,scenes);for(const id of scenes)s.sceneVisits[id]=Math.min(99,Math.max(0,Number(raw.sceneVisits?.[id])||0));
  for(const id of ['chen','li','wu'])s.people[id]=Math.min(99,Math.max(0,Number(raw.people?.[id])||0));return s;
 }
 let state=fresh(),persistent=true;
 try{const text=localStorage.getItem(KEY);state=sanitize(text?JSON.parse(text):null);}catch{persistent=false;}
 const get=()=>JSON.parse(JSON.stringify(state));
 function commit(edit){const draft=get();edit(draft);state=sanitize(draft);try{localStorage.setItem(KEY,JSON.stringify(state));persistent=true;}catch{persistent=false;}window.dispatchEvent(new CustomEvent('street:story-change',{detail:get()}));return get();}
 const add=(s,k,id)=>{if(!s[k].includes(id))s[k].push(id);};
 const api={key:KEY,get,get persistent(){return persistent;},visit(id){if(!scenes.includes(id))return;commit(s=>{add(s,'visitedScenes',id);s.sceneVisits[id]=(s.sceneVisits[id]||0)+1;});},period(p){if(['morning','night'].includes(p))commit(s=>{s.lastPeriod=p;});},
  order(value){if(['regular','less_chili','scallion'].includes(value))commit(s=>{if(s.breakfastOrder!==value)s.breakfastMade=false;s.breakfastOrder=value;});},made(){commit(s=>{s.breakfastMade=true;});},talk(id){if(['chen','li','wu'].includes(id))commit(s=>{s.people[id]++;});},
  pack(items){const picked=unique(items,produce);if(picked.length<2)return false;commit(s=>{s.selectedProduce=picked;});return true;},
  reserve(){if(!['not_started','declined'].includes(state.basketErrand)||state.selectedProduce.length<2)return false;commit(s=>{s.basketErrand='reserved';s.errandProduce=[...s.selectedProduce];});return true;},
  decline(){if(state.basketErrand!=='not_started')return false;commit(s=>{s.basketErrand='declined';});return true;},
  deliver(){if(state.basketErrand!=='reserved')return false;commit(s=>{s.basketErrand='delivered';});return true;},
  returnBasket(){if(state.basketErrand!=='delivered')return false;commit(s=>{s.basketErrand='returned';});return true;},
  discover(id){if(typeof id==='string'&&/^[a-z0-9-]{1,45}$/.test(id))commit(s=>add(s,'discoveredMemories',id));},
  paper(){commit(s=>{s.paperTaken=true;});},ticket(){commit(s=>{s.ticketValidated=true;});},cross(){commit(s=>{s.ferryCrossed=true;});},fan(){commit(s=>{s.fanBorrowed=true;});},film(){commit(s=>{s.filmSeen=true;});},
  programme(id){if(['street','letters','li'].includes(id))commit(s=>{add(s,'programsRead',id);});},
  reset(){state=fresh();return commit(()=>{});}
 };
 window.StreetStory=Object.freeze(api);
 window.addEventListener('storage',e=>{if(e.key!==KEY)return;try{state=sanitize(e.newValue?JSON.parse(e.newValue):null);}catch{state=fresh();}window.dispatchEvent(new CustomEvent('street:story-change',{detail:get()}));});
})();
