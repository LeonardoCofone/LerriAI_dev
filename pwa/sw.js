const CACHE_NAME = 'lerri-v1.1';
const baseUrl = '/LerriAI_dev/pwa/';
const urlsToCache = [
  baseUrl,
  `${baseUrl}index.html`,
  `${baseUrl}app.js`,
  `${baseUrl}app.css`,
  `${baseUrl}schedule-manager.js`,
  `${baseUrl}schedule-manager.css`,
  `${baseUrl}icons/icon-192.png`,
  `${baseUrl}icons/icon-512.png`
];

self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[SW] Skip waiting');
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Claiming clients');
        return self.clients.claim();
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('push', event => {
  console.log('[SW] Push notification received');
  
  let data = { 
    title: 'LerriAI', 
    body: 'New notification', 
    icon: `${baseUrl}icons/icon-192.png` 
  };
  
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }
  
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon || `${baseUrl}icons/icon-192.png`,
      badge: data.badge || `${baseUrl}icons/icon-192.png`,
      vibrate: [200, 100, 200],
      data: data.data || { url: `${baseUrl}index.html` }
    })
  );
});

self.addEventListener('notificationclick', event => {
  console.log('[SW] Notification clicked');
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || `${baseUrl}index.html`)
  );
});