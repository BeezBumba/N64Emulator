const KEY = 'N64EMU';

// Define a list of files to cache
const filesToCache = [
	"icons",
	"assets.zip",
	"github_logo.png",
    "index.html",
    "input_controller.js",
    "manifest.json",
	"n64wasm.js",
	"n64wasm.wasm",
	"romlist.js",
    "script.js",
	"settings"
];

// Add an event listener for the install event
self.addEventListener('install', (event) => {
    // Perform the caching operation
    event.waitUntil(
        caches.open(KEY)
            .then( (cache) => {
                // Add the files to the cache
                return cache.addAll(filesToCache);
            })
    );
});

self.addEventListener('message', (event) => {
    if (event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(KEY)
                .then( (cache) => {
                    return cache.addAll(event.data.payload);
                })
        );
    }
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      try {
       console.log(`[Service Worker] Attempting live fetch: ${e.request.url}`);
       const response = await fetch(e.request);
       const cache = await caches.open(KEY);
       console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
       cache.put(e.request, response.clone());
       return response;
      } catch (err) {
        console.log(`[Service Worker] Attempting to serve resource from cache: ${e.request.url}`);
        const r = await caches.match(e.request);
        if (r) {
          return r;
        }
      }
    })()
  );
});

