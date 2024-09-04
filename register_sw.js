if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', { scope: '/' })
        .then((registration) => {
            const data = {
                type: 'CACHE_URLS',
                payload: [
                    location.href,
                    // cache all files that were pulled in: https://stackoverflow.com/a/55543550/1569320
                    ...performance.getEntriesByType('resource').map((r) => r.name)
                ]
            };
            if (registration.installing) {
                registration.installing.postMessage(data);
            }
        })
        .catch((err) => console.error('Service Worker registration failed:', err));
}

// Add the event listener for the update button
document.getElementById('update-files').addEventListener('click', () => {
    if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
            type: 'UPDATE_CACHE',
            payload: [
                location.href,
                // cache all files that were pulled in: https://stackoverflow.com/a/55543550/1569320
                ...performance.getEntriesByType('resource').map((r) => r.name)
            ]
        });
    }
});
