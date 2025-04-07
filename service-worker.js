//install event: cache all ritical events

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('pwa-cache-v1').then(cache => {
            return cache.addAll([
                './',
                './index.html',
                './styles.css',
                './manifest.json',
                './icons/',
                './icons/'
            ]);
        })
    );
});

//Activate Event: clean up old cache
self.addEventListener('activate', event => {
    const cacheWhitelist = ['pwa-cache-v1'];
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(
                cacheNames.map(cacheName => {
                    if(!cacheWhitelist.includes(cacheName)){
                        return caches.delete(cacheName);
                    }
                })
            )
        )
    );
});

//fetch event: serve cached assets if available.
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            //return the cached response if found, else fetch from the network
            return response || fetch(event.request);
        })
    );
});