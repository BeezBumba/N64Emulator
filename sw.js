const KEY = 'N64EMU';

self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('message', (event) => {
    if (event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(KEY)
                .then( (cache) => {
                    // cache multiple URLs at once
                    return cache.addAll(event.data.payload);
                })
        );
    }
});

self.addEventListener("fetch", (event) => {
  // use event.request to access the request object
  event.respondWith(
    // use cache.match() to check if a request is already cached
    caches.open(KEY).then(cache => cache.match(event.request))
      .then(cachedResponse => {
        if (cachedResponse) {
          // return the cached response if found
          console.log(`[Service Worker] Serving resource from cache: ${event.request.url}`);
          return cachedResponse;
        }
        // otherwise, fetch the resource from the network
        console.log(`[Service Worker] Attempting live fetch: ${event.request.url}`);
        return fetch(event.request).then(networkResponse => {
          // cache the network response for future use
          console.log(`[Service Worker] Caching new resource: ${event.request.url}`);
          cache.put(event.request, networkResponse.clone());
          // return the network response
          return networkResponse;
        });
      })
  );
});
