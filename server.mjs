import http from 'node:http';
import {spawn} from 'node:child_process';
import {readFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.dirname(fileURLToPath(import.meta.url)),port=Number(process.env.PORT)||4325;
const types={'.css':'text/css; charset=utf-8','.wav':'audio/wav','.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.apng':'image/apng','.mp4':'video/mp4','.woff2':'font/woff2','.ttf':'font/ttf','.mp3':'audio/mpeg','.md':'text/plain; charset=utf-8'};
const server=http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://127.0.0.1'),target=path.resolve(root,'.'+decodeURIComponent(url.pathname));if(target!==root&&!target.startsWith(root+path.sep)){res.writeHead(403);return res.end();}const filename=(await stat(target)).isDirectory()?path.join(target,'index.html'):target,data=await readFile(filename);const headers={'Content-Type':types[path.extname(filename)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff','Accept-Ranges':'bytes'};
 const range=req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);if(range){const start=+range[1],end=range[2]?Math.min(+range[2],data.length-1):data.length-1;if(start>end||start>=data.length){res.writeHead(416,{'Content-Range':`bytes */${data.length}`});return res.end();}res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${data.length}`,'Content-Length':end-start+1});return res.end(req.method==='HEAD'?undefined:data.subarray(start,end+1));}
 res.writeHead(200,{...headers,'Content-Length':data.length});res.end(req.method==='HEAD'?undefined:data);
 }catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('未找到此文件。请保留原项目目录结构。');}});
server.on('error',e=>{console.error(e.code==='EADDRINUSE'?`端口 ${port} 已被占用，可设置 PORT 后重试。`:e.message);process.exitCode=1;});
server.listen(port,'127.0.0.1',()=>{const url=`http://127.0.0.1:${port}/index.html`;console.log(`Local: ${url}\n保持此窗口打开。按 Ctrl+C 停止本地预览。`);if(process.argv.includes('--open')){if(process.platform==='win32')spawn('cmd.exe',['/d','/c','start','',url],{windowsHide:true,stdio:'ignore'}).on('error',()=>console.log('请手动打开上面的地址。'));else console.log('请在浏览器打开上面的地址。');}});
