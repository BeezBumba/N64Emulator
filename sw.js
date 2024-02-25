const filesToCache = [
	"index.html",
	"icons/favicon.png",
	"icons/icon.png",
	"icons/icon192.png",
	"assets.zip",
	"github_logo.png",
	"input_controller.js",
	"manifest.json",
	"n64wasm.js",
	"n64wasm.wasm",
	"register_sw.js",
	"romlist.js",
	"script.js",
	"settings.js"
];

const staticCacheName = "N64EMU";

self.addEventListener("install", event => {
	event.waitUntil(caches.open(staticCacheName).then(cache => {
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener("fetch", event => {
	event.respondWith(caches.match(event.request).then(response => {
			if (response) {
				return response;
			}
			return fetch(event.request)
		}).catch(error => {
		})
	);
});
