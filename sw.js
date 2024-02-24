const filesToCache = [
	"icons/favicon.png",
	"icons/icon.png",
	"icons/icon192.png",
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

const staticCacheName = "N64EMU";

self.addEventListener("install", event => {
	event.waitUntil(
		caches.open(staticCacheName)
		.then(cache => {
			// loop through the files and add them individually
			for (let file of filesToCache) {
				cache.add(file).catch(error => {
					// log the file that failed
					console.error(`Failed to cache ${file}: ${error}`);
				});
			}
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
