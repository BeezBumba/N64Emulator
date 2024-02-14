// sw.js



const filesToCache = [
    'icons',
    'assets.zip',
    'github_logo.png',
    'index.html',
    'input_controller.js',
    'manifest.json',
    'n64wasm.js',
    'n64wasm.wasm',
    'romlist.js',
    'script.js',
    'settings.js',
    // Add more files here as necessary
];
const staticCacheName = 'N64EMU'; // Update the cache name if needed
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(staticCacheName)
            .then((cache) => {
                return cache.addAll(filesToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    // Resource found in cache, return cached response
                    return response;
                }
                // Not found in cache, fetch from network and cache
                return fetch(event.request);
            })
            .catch((error) => {
            })
    );
});
