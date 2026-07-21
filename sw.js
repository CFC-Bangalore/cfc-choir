// CFC Choir Song Picker — Service Worker v32
const CACHE = 'cfc-choir-v32';
const SHELL = ['./index.html','https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js','https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.allSettled(SHELL.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(['firebaseio.com','firebase.google.com','firebaseapp.com','googleapis.com','gstatic.com'].some(h=>u.hostname.includes(h)))return;
  if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{if(r&&r.status===200){const c=r.clone();caches.open(CACHE).then(ca=>ca.put('./index.html',c));}return r;}).catch(()=>caches.match('./index.html')));return;}
  if(u.hostname.includes('cloudflare')||u.hostname.includes('fonts.g')){e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{if(r&&r.status===200){const cl=r.clone();caches.open(CACHE).then(ca=>ca.put(e.request,cl));}return r;})));return;}
  e.respondWith(fetch(e.request).then(r=>{if(r&&r.status===200){const c=r.clone();caches.open(CACHE).then(ca=>ca.put(e.request,c));}return r;}).catch(()=>caches.match(e.request)));
});
