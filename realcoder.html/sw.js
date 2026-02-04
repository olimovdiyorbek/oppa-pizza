const CACHE_NAME = 'oppa-pizza-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/cart.js',
  '/assets/imgs/pizza1.jpg' 
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});