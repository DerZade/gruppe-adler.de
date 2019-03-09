workbox.setConfig({
    debug: false,
});

workbox.precaching.precacheAndRoute([]);

workbox.routing.registerNavigationRoute('/');

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            }),
        ],
    }),
);

workbox.routing.registerRoute(
    /https:\/\/(?:cms|api)\.dev\.gruppe-adler\.de/i,
    workbox.strategies.networkFirst({
        cacheName: 'api/cms',
    }),
);

workbox.routing.registerRoute(
    /\.(?:html|js|css)$/i,
    workbox.strategies.networkFirst({
        cacheName: 'main',
    }),
);

workbox.routing.registerRoute(
    new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)', 'i'),
    workbox.strategies.cacheFirst({
        cacheName: 'googleapis',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 30,
            }),
        ],
    }),
);