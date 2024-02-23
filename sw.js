const KEY = 'N64WASM';
const filesToCache = [
    "icons",
    "assets.zip",
    "github_logo.png",
    "index.html",
    "input_controller.js",
    "manifest.json",
    "n64wasm.js",
    "n64wasm.wasm"
    "romlist.js",
    "script.js",
    "settings.js"
]

self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener("install", event => {
	event.waitUntil(
		caches.open(KEY)
		.then(cache => {
			return cache.addAll(filesToCache);
		})
	);
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
