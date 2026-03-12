// Performance monitoring for glossary optimization
(function() {
    'use strict';

    // Check if Performance API is available
    if (!window.performance || !window.performance.timing) {
        return;
    }

    // Web Vitals tracking
    function trackWebVitals() {
        // Core Web Vitals
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.entryType === 'navigation') {
                    // DOM Content Loaded
                    const domContentLoaded = entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart;
                    if (domContentLoaded > 0) {
                    }

                    // Full page load
                    const pageLoad = entry.loadEventEnd - entry.loadEventStart;
                    if (pageLoad > 0) {
                    }
                }

                // First Contentful Paint
                if (entry.name === 'first-contentful-paint') {
                }

                // Largest Contentful Paint
                if (entry.entryType === 'largest-contentful-paint') {
                }

                // First Input Delay
                if (entry.entryType === 'first-input') {
                }

                // Cumulative Layout Shift
                if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
                }
            });
        });

        // Observe various performance metrics
        try {
            observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });
        } catch (e) {
            // Fallback for older browsers
        }
    }

    // Glossary-specific performance tracking
    function trackGlossaryPerformance() {
        // Track search performance
        let searchStartTime;
        document.addEventListener('input', function(e) {
            if (e.target.matches('input[placeholder*="glossary"]')) {
                searchStartTime = performance.now();
            }
        });

        // Track filter rendering time
        window.trackFilterTime = function(operation, startTime) {
            const endTime = performance.now();
            const duration = endTime - startTime;

            if (duration > 50) { // Log slow operations
            }
        };

        // Track pagination performance
        document.addEventListener('click', function(e) {
            if (e.target.matches('.pagination-button') || e.target.closest('.pagination-button')) {
                const startTime = performance.now();
                requestAnimationFrame(() => {
                    window.trackFilterTime('pagination', startTime);
                });
            }
        });

        // Memory usage tracking (Chrome only)
        if (performance.memory) {
            setInterval(() => {
                const used = Math.round(performance.memory.usedJSHeapSize / 1048576); // MB
                if (used > 50) { // Warning for high memory usage
                }
            }, 30000); // Check every 30 seconds
        }
    }

    // Resource loading optimization
    function optimizeResources() {
        // Preload critical resources
        const criticalResources = [
            '/css/glossary-optimized.css',
            '/js/glossary-data.js'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = resource;
            document.head.appendChild(link);
        });

        // Lazy load non-critical images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy-load');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            trackWebVitals();
            trackGlossaryPerformance();
            optimizeResources();
        });
    } else {
        trackWebVitals();
        trackGlossaryPerformance();
        optimizeResources();
    }

    // Service Worker registration for caching
    if ('serviceWorker' in navigator && location.protocol === 'https:') {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                })
                .catch(error => {
                });
        });
    }

    // Export performance data for debugging
    window.getPerformanceReport = function() {
        const timing = performance.timing;
        return {
            dns: timing.domainLookupEnd - timing.domainLookupStart,
            connect: timing.connectEnd - timing.connectStart,
            ttfb: timing.responseStart - timing.navigationStart,
            download: timing.responseEnd - timing.responseStart,
            dom: timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart,
            load: timing.loadEventEnd - timing.navigationStart,
            total: timing.loadEventEnd - timing.navigationStart
        };
    };

})();
