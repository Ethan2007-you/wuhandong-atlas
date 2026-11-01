/* User-selected music stays on this device. No external streaming or uploads. */
(() => {
 'use strict';
 const $=id=>document.getElementById(id),audio=$('ambience');let database=null,objectURL=null,revision=0,ducked=false,baseVolume=Number($('music-volume').value)/100;
 function applyVolume(){audio.volume=baseVolume*(ducked?.28:1);audio.dataset.ducked=String(ducked);audio.dataset.baseVolume=String(baseVolume);audio.dataset.effectiveVolume=String(audio.volume);}
 window.StreetMusic={setDucked(value){ducked=Boolean(value);applyVolume();},get baseVolume(){return baseVolume;}};
 applyVolume();
 const version='breakfast-bbq-v3',defaultSource='assets/audio/laojie-instrumental.mp3';
 function defaultTrack(){audio.pause();if(objectURL){URL.revokeObjectURL(objectURL);objectURL=null;}audio.src=defaultSource;$('music-status').textContent='全站配乐：《老街》伴奏';$('clear-music').hidden=true;$('music-button').textContent='配乐';}
 defaultTrack();
 const dbPromise=new Promise((resolve)=>{
  try{const req=indexedDB.open('wuhandong-music',1);req.onupgradeneeded=()=>req.result.createObjectStore('tracks');req.onsuccess=()=>{database=req.result;resolve(database);};req.onerror=()=>resolve(null);req.onblocked=()=>resolve(null);}catch{resolve(null);}
 });
 async function persist(value){const db=await dbPromise;if(!db)return false;return new Promise(resolve=>{try{const tx=db.transaction('tracks','readwrite');const store=tx.objectStore('tracks');value?store.put(value,'selected'):store.delete('selected');tx.oncomplete=()=>resolve(true);tx.onerror=tx.onabort=()=>resolve(false);}catch{resolve(false);}});}
 function setTrack(track){audio.pause();if(objectURL)URL.revokeObjectURL(objectURL);objectURL=URL.createObjectURL(track.blob);audio.src=objectURL;$('music-status').textContent='正在使用：'+track.name;$('clear-music').hidden=false;$('music-button').textContent='配乐已选';}
 const restoreRevision=revision;dbPromise.then(db=>{if(!db)return;try{const req=db.transaction('tracks').objectStore('tracks').get('selected');req.onsuccess=()=>{if(revision!==restoreRevision||!req.result?.blob||req.result.version!==version)return;setTrack(req.result);if($('sound-button').getAttribute('aria-pressed')==='true')audio.play().catch(()=>{});};}catch{}});
 $('music-button').addEventListener('click',()=>{if(!$('music-dialog').open)$('music-dialog').showModal();});
 $('music-close').addEventListener('click',()=>$('music-dialog').close());
 $('choose-music').addEventListener('click',()=>$('music-file').click());
 $('music-file').addEventListener('change',async event=>{const file=event.target.files?.[0];if(!file)return;if(file.size>80*1024*1024){$('music-status').textContent='请选择 80MB 以内的音频文件。';return;}revision++;const track={name:file.name,blob:file,version};setTrack(track);document.dispatchEvent(new CustomEvent('street:enable-sound'));const saved=await persist(track);if(!saved)$('music-status').textContent+='（仅本次播放；浏览器暂不允许保存）';event.target.value='';});
 $('clear-music').addEventListener('click',async()=>{revision++;defaultTrack();if($('sound-button').getAttribute('aria-pressed')==='true')audio.play().catch(()=>{});await persist(null);});
 $('music-volume').addEventListener('input',e=>{baseVolume=Number(e.target.value)/100;$('music-volume-label').value=e.target.value+'%';applyVolume();});
 audio.addEventListener('error',()=>{if(audio.getAttribute('src'))$('music-status').textContent='浏览器无法播放这个音频，请改用 MP3 或 WAV。';});
 window.addEventListener('pagehide',()=>{audio.pause();database?.close();if(objectURL)URL.revokeObjectURL(objectURL);});
})();
