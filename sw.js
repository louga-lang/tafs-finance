// ⚡ Service Worker TAFS Finance — version auto-update
const CACHE = 'tafs-v3-' + Date.now();
const ASSETS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting(); // Force activation immédiate
});

self.addEventListener('activate', e => {
  // Supprimer TOUS les anciens caches
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => {
        console.log('Suppression ancien cache:', k);
        return caches.delete(k);
      }))
    )
  );
  self.clients.claim(); // Prendre contrôle immédiat
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (e.request.url.includes('firebase') || e.request.url.includes('googleapis') || e.request.url.includes('gstatic')) return;

  e.respondWith(
    // Network first : toujours essayer le réseau d'abord
    fetch(e.request).then(res => {
      const clone = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone));
      return res;
    }).catch(() =>
      // Si pas de réseau, utiliser le cache
      caches.match(e.request).then(cached => cached || caches.match('./index.html'))
    )
  );
});
