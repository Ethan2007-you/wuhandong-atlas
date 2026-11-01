from pathlib import Path
import hashlib,json,zipfile
root=Path(__file__).resolve().parents[1]
report=json.loads((root/'qa/guided-route/assets-checks.json').read_text(encoding='utf8'))
names=set(report['files'])|set(report['references'])|{'README.md','server.mjs','打开本地预览.cmd','.gitignore'}
names.update(p.relative_to(root).as_posix() for p in (root/'qa/guided-route').rglob('*') if p.is_file())
names.update(p.relative_to(root).as_posix() for p in (root/'assets/audio').glob('*source*.json'))
names.update(p.relative_to(root).as_posix() for p in (root/'tools').glob('imagegen-*.json'))
names.update({'tools/test-story-state.mjs','tools/test-route.mjs','tools/check-story-assets.mjs','tools/package-story.py'})
files=sorted(root/n for n in names)
manifest=[{'path':p.relative_to(root).as_posix(),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in files]
(root/'assets-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf8')
files.append(root/'assets-manifest.json')
dest=root.parent/'武汉东-十二站清晰路线-最新版.zip'
with zipfile.ZipFile(dest,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
 for p in files:z.write(p,root.name+'/'+p.relative_to(root).as_posix())
with zipfile.ZipFile(dest) as z:assert z.testzip() is None
print(json.dumps({'MiB':round(dest.stat().st_size/1024**2,2),'files':len(files),'integrity':'PASS'}))
