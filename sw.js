// CFC Choir — Service Worker v70
// • Opens instantly from cache, then checks for a newer index.html in the background
//   and tells the page ("update available") instead of changing under the singer.
// • Works offline: app shell, songs/chords/history files, React, jsPDF, fonts and the
//   Firebase SDK are cached. Live Firebase data/auth is never intercepted.
const VERSION = 'v70';
const SHELL = 'cfc-shell-' + VERSION;
const RUNTIME = 'cfc-runtime-v1';
const PRECACHE = [
  './index.html', './chords-data.json', './CFC_PWA_History_Import.json', './manifest-1.json',
  './icon-192.png', './icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js',
  'https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js'
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

self.addEventListener('message', e => { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });

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
  if (u.hostname === 'cdnjs.cloudflare.com' || (u.hostname === 'www.gstatic.com' && u.pathname.startsWith('/firebasejs/'))) { cacheFirst(e, RUNTIME); return; }
  // Google Fonts (CSS changes rarely; font files are immutable)
  if (u.hostname === 'fonts.googleapis.com') { staleWhileRevalidate(e, RUNTIME); return; }
  if (u.hostname === 'fonts.gstatic.com') { cacheFirst(e, RUNTIME); return; }
  // Everything else cross-origin (Firebase Realtime DB / Auth, APIs…): never touch
  if (u.origin !== self.location.origin) return;

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
