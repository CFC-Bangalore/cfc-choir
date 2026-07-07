// CFC Choir Song Picker — Service Worker v15
const CACHE = 'cfc-choir-v15';

const SHELL = [
  './index.html',
  'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
];

// Install: cache app shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache =>
      Promise.allSettled(SHELL.map(url => cache.add(url).catch(e => console.warn('Cache miss:', url))))
    ).then(() => self.skipWaiting())
  );
});

// Activate: clear old caches immediately
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Fetch strategy:
// - Firebase: never cached, always network (real-time sync)
// - Navigation (index.html): network-first, cache fallback for offline
// - CDN & fonts: cache-first
// - Everything else: network-first with cache fallback
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Never intercept Firebase
  if (url.hostname.includes('firebaseio.com') ||
      url.hostname.includes('firebase.google.com') ||
      url.hostname.includes('firebaseapp.com') ||
      url.hostname.includes('googleapis.com') ||
      url.hostname.includes('gstatic.com')) {
    return;
  }

  // Navigation: network-first
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put('./index.html', clone));
          }
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // CDN & fonts: cache-first
  if (url.hostname.includes('cloudflare') || url.hostname.includes('fonts.g')) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(res => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(event.request, clone));
          }
          return res;
        });
      })
    );
    return;
  }

  // Everything else: network-first
  event.respondWith(
    fetch(event.request).then(res => {
      if (res && res.status === 200) {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(event.request, clone));
      }
      return res;
    }).catch(() => caches.match(event.request))
  );
});
