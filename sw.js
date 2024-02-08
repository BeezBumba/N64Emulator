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
	"settings.js"
];

const staticCacheName = "Nintendo64";

self.addEventListener("install", event => {
	event.waitUntil(
		caches.open(staticCacheName)
		.then(cache => {
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener("fetch", event => {
	event.respondWith(
		caches.match(event.request)
		.then(response => {
			if (response) {
				return response;
			}
			return fetch(event.request)
		}).catch(error => {
		})
	);
});
