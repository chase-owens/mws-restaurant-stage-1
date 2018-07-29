let staticCacheName = 'restaurant-v1';

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/restaurant.html',
        '/css/styles.css',
        '/js/main.js',
        '/js/restaurant-info.js',
        '/js/dbhelper.js',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css'
      ]);
    }).catch(function(err) {
      console.log(err)
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log("[ServiceWorker] activated");
  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurant-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return cache.delete(cacheName);
        })
      );
    }).catch(function(err) {
      console.log(err);
    })
  );
});

self.addEventListener('fetch', function(e) {

  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    }).catch(function(err) {
      console.log(err);
    })
  );
});
