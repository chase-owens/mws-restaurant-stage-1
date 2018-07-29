if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.register('/sw.js').then(function() {
      console.log("Registered");
    }).catch(function() {
      console.log("Uh oh :(");
    })
  });
}

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(restaurant-v1).then(function(cache) {
      return cache.addAll([
        '/',
        '/.index.html',
        '/restaurant.html',
        '/css/styles.css',
        '/js/main.js',
        '/js/restaurant-info.js',
        'js/dbhelper.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
