self.addEventListener('install', function (event) {
  console.log('SW installed');
  event.waitUntil(
    caches.open('static').then(function (cache) {
      return cache
        .addAll([
          '/index.html',
          '/manifest.json',
          '/src/icons/favicon.ico',
          '/src/icons/favicon-32x32.png',
          '/src/icons/favicon-16x16.png',
          '/src/icons/favicon-96x96.png',
          '/src/css/styles.css',
          '/src/js/jquery-3.2.1.min.js',
          '/src/js/nepaliDate.js',
          '/src/index.js',
          'https://fonts.googleapis.com/css?family=Kelly+Slab&display=swap',
          'https://fonts.gstatic.com/s/kellyslab/v10/-W_7XJX0Rz3cxUnJC5t6fkQLfr8nfiI.woff2',
        ])
        .then(function () {
          console.log('static cache added');
        });
    })
  );
});
self.addEventListener('activate', function () {
  console.log('SW activated');
});
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      } else {
        return fetch(event.request);
      }
    })
  );
});
