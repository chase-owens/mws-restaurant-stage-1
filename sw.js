let staticCacheName = 'restaurant-v1';

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        "./",
        "./img/1.jpg",
        "./img/2.jpg",
        "./img/3.jpg",
        "./img/4.jpg",
        "./img/5.jpg",
        "./img/6.jpg",
        "./img/7.jpg",
        "./img/8.jpg",
        "./img/9.jpg",
        "./img/10.jpg",
        "./index.html",
        "./restaurant.html",
        "./css/styles.css",
        "./data/restaurants.json",
        "./js/dbhelper.js",
        "./js/main.js",
        "./js/restaurant_info.js",
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
