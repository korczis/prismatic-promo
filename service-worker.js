const CACHE_NAME = 'prismatic-glossary-v1';
const STATIC_CACHE_URLS = [
    '/css/tailwind.css',
    '/css/glossary-optimized.css',
    '/css/flowbite.min.css',
    '/css/prose.css',
    '/js/vendor/alpine.min.js',
    '/js/performance-monitor.js',
    '/images/sections/glossary.png'
];

// Cache strategy for different resource types
const CACHE_STRATEGIES = {
    // Cache first for static assets
    static: ['/css/', '/js/', '/images/'],
    // Network first for content
    content: ['/glossary/', '/apps/', '/agents/'],
    // Cache only for API responses
    api: ['/api/']
};

// Install event - cache static resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(STATIC_CACHE_URLS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(cacheName => cacheName !== CACHE_NAME)
                        .map(cacheName => caches.delete(cacheName))
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Only handle same-origin requests
    if (url.origin !== self.location.origin) {
        return;
    }

    // Determine cache strategy
    const strategy = getCacheStrategy(url.pathname);

    switch (strategy) {
        case 'static':
            event.respondWith(cacheFirst(request));
            break;
        case 'content':
            event.respondWith(networkFirst(request));
            break;
        case 'api':
            event.respondWith(cacheOnly(request));
            break;
        default:
            event.respondWith(networkFirst(request));
    }
});

// Cache first strategy - for static assets
async function cacheFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
        return cachedResponse;
    }

    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        return new Response('Offline', { status: 503 });
    }
}

// Network first strategy - for content
async function networkFirst(request) {
    const cache = await caches.open(CACHE_NAME);

    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        return new Response('Offline', { status: 503 });
    }
}

// Cache only strategy - for API responses
async function cacheOnly(request) {
    const cache = await caches.open(CACHE_NAME);
    return await cache.match(request) || new Response('Not cached', { status: 404 });
}

// Determine cache strategy based on URL
function getCacheStrategy(pathname) {
    for (const [strategy, patterns] of Object.entries(CACHE_STRATEGIES)) {
        if (patterns.some(pattern => pathname.startsWith(pattern))) {
            return strategy;
        }
    }
    return 'content'; // Default strategy
}

// Background sync for offline actions
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    // Implement background sync logic if needed
}

// Push notifications (if needed for glossary updates)
self.addEventListener('push', event => {
    if (!event.data) return;

    const options = {
        body: event.data.text(),
        icon: '/images/icon-192.png',
        badge: '/images/badge-72.png',
        data: {
            url: '/glossary/'
        }
    };

    event.waitUntil(
        self.registration.showNotification('Glossary Update', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
    event.notification.close();

    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
