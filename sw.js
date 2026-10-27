// CFC Choir — Service Worker v72
// • Opens instantly from cache, then checks for a newer index.html in the background
//   and tells the page ("update available") instead of changing under the singer.
// • Works offline: app shell, songs/chords/history files, React, jsPDF, fonts and the
//   Firebase SDK and the AI-search library are cached. Live Firebase data/auth is never intercepted.
// • "Update offline copy" in the app sends {type:'REFRESH'}: every precached file is fetched again.
const VERSION = 'v72';
const SHELL = 'cfc-shell-' + VERSION;
const RUNTIME = 'cfc-runtime-v1';
const PRECACHE = [
  './index.html', './chords-data.json', './CFC_PWA_History_Import.json', './manifest-1.json',
  './icon-192.png', './icon-512.png',
  '/lib/react.production.min.js',
  '/lib/react-dom.production.min.js',
  '/lib/jspdf.umd.min.js',
  '/fb/firebase-app.js',
  '/fb/firebase-auth.js',
  '/fb/firebase-database.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(SHELL)
      .then(c => Promise.allSettled(PRECACHE.map(u => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== SHELL && k !== RUNTIME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') { self.skipWaiting(); return; }
  if (e.data && e.data.type === 'REFRESH') {
    const port = e.ports && e.ports[0];
    e.waitUntil((async () => {
      const cache = await caches.open(SHELL);
      await Promise.allSettled(PRECACHE.map(async u => {
        const r = await fetch(u, { cache: 'reload' });
        if (r && r.ok) await cache.put(u, r);
      }));
      if (port) port.postMessage({ done: true });
    })());
  }
});

const sig = r => r && (r.headers.get('etag') || r.headers.get('last-modified') || '');
async function notifyUpdate() {
  const all = await self.clients.matchAll({ type: 'window' });
  all.forEach(c => c.postMessage({ type: 'UPDATE_AVAILABLE' }));
}

// Return the cached copy straight away and refresh it in the background.
function staleWhileRevalidate(e, cacheName) {
  e.respondWith((async () => {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(e.request);
    const net = fetch(e.request).then(r => { if (r && (r.ok || r.type === 'opaque')) cache.put(e.request, r.clone()); return r; }).catch(() => null);
    if (cached) { e.waitUntil(net); return cached; }
    return (await net) || Response.error();
  })());
}
// Versioned / immutable files: cache first.
function cacheFirst(e, cacheName) {
  e.respondWith((async () => {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(e.request);
    if (cached) return cached;
    try {
      const r = await fetch(e.request);
      if (r && (r.ok || r.type === 'opaque')) cache.put(e.request, r.clone());
      return r;
    } catch (err) { return Response.error(); }
  })());
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const u = new URL(req.url);

  // Static, versioned third-party files
  if (u.hostname === 'cdnjs.cloudflare.com' || u.hostname === 'cdn.jsdelivr.net' || (u.hostname === 'www.gstatic.com' && u.pathname.startsWith('/firebasejs/'))) { cacheFirst(e, RUNTIME); return; }
  // Google Fonts (CSS changes rarely; font files are immutable)
  if (u.hostname === 'fonts.googleapis.com') { staleWhileRevalidate(e, RUNTIME); return; }
  if (u.hostname === 'fonts.gstatic.com') { cacheFirst(e, RUNTIME); return; }
  // Everything else cross-origin (Firebase Realtime DB / Auth, APIs…): never touch
  if (u.origin !== self.location.origin) return;

  // Video tour (and any range/partial request): let the browser stream it directly — it is not stored for offline use
  if (/\.(mp4|webm|m4v|mov)$/i.test(u.pathname) || req.headers.has('range')) return;

  // The app page: open from cache instantly, check for a new version quietly
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      const cache = await caches.open(SHELL);
      const cached = await cache.match('./index.html');
      const check = fetch(req, { cache: 'no-cache' }).then(async r => {
        if (!r || !r.ok) return r;
        if (!cached) { await cache.put('./index.html', r.clone()); return r; }
        const a = sig(cached), b = sig(r);
        const changed = (a && b) ? a !== b : (await cached.clone().text()) !== (await r.clone().text());
        if (changed) { await cache.put('./index.html', r.clone()); await notifyUpdate(); }
        return r;
      }).catch(() => null);
      e.waitUntil(check);
      if (cached) return cached;
      return (await check) || Response.error();
    })());
    return;
  }

  // Same-origin files (songs, chords, history, icons, manifest…)
  staleWhileRevalidate(e, SHELL);
});
