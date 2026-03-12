// Prismatic Platform Cross-Link Navigator
// L2-Learning Layer: Intelligent Cross-Link Navigation with MCP + Flowbite LLM Best Practices
// Version: 1.0.0 | 3NL Architecture Compliant
(function() {
    'use strict';

    // Navigation Configuration
    const NAV_CONFIG = {
        enablePreloading: true,
        enablePrefetch: true,
        hoverDelay: 150, // ms
        prefetchTimeout: 30000, // 30s
        maxPrefetchQueue: 10,
        intelligentRouting: true,
        analyticsEnabled: true
    };

    // Link Intelligence Categories
    const LINK_CATEGORIES = {
        internal: {
            priority: 'high',
            prefetch: true,
            preload: false,
            analytics: true
        },
        external: {
            priority: 'low',
            prefetch: false,
            preload: false,
            analytics: true
        },
        document: {
            priority: 'medium',
            prefetch: false,
            preload: true,
            analytics: true
        },
        anchor: {
            priority: 'high',
            prefetch: false,
            preload: false,
            analytics: false
        },
        glossary: {
            priority: 'high',
            prefetch: true,
            preload: true,
            analytics: true
        }
    };

    // MCP Context-Aware Navigation
    class MCPNavigationSource {
        constructor() {
            this.cache = new Map();
            this.refreshInterval = 60000; // 1 minute
            this.navigationContext = null;
        }

        async fetchNavigationContext() {
            try {
                const response = await window.PrismaticMCP.request('navigation.context', {
                    page: window.location.pathname,
                    section: this.extractSection(),
                    user_journey: this.analyzeUserJourney(),
                    context: window.PrismaticMCP.getPageContext()
                });

                this.navigationContext = response.result;
                return this.navigationContext;
            } catch (error) {
                return this.getFallbackContext();
            }
        }

        extractSection() {
            const path = window.location.pathname;
            const parts = path.split('/').filter(Boolean);
            return parts[0] || 'home';
        }

        analyzeUserJourney() {
            // Analyze user journey from sessionStorage
            const journey = JSON.parse(sessionStorage.getItem('user_journey') || '[]');
            return {
                pages_visited: journey.length,
                current_session_duration: Date.now() - (journey[0]?.timestamp || Date.now()),
                last_pages: journey.slice(-3),
                interests: this.extractInterests(journey)
            };
        }

        extractInterests(journey) {
            const interests = {};
            journey.forEach(page => {
                const section = page.path.split('/')[1];
                interests[section] = (interests[section] || 0) + 1;
            });
            return interests;
        }

        getFallbackContext() {
            return {
                related_pages: [],
                suggested_actions: ['explore_academy', 'browse_glossary', 'view_agents'],
                user_level: 'intermediate',
                learning_path: []
            };
        }

        async fetchRelatedLinks(url) {
            const cacheKey = `related_${url}`;

            if (this.cache.has(cacheKey)) {
                const cached = this.cache.get(cacheKey);
                if (Date.now() - cached.timestamp < this.refreshInterval) {
                    return cached.data;
                }
            }

            try {
                const response = await window.PrismaticMCP.request('navigation.related', {
                    url: url,
                    context: this.navigationContext,
                    limit: 5
                });

                const data = {
                    data: response.result,
                    timestamp: Date.now()
                };

                this.cache.set(cacheKey, data);
                return data.data;
            } catch (error) {
                return [];
            }
        }
    }

    // Intelligent Link Classifier
    class LinkClassifier {
        constructor() {
            this.baseUrl = window.location.origin;
            this.patterns = {
                glossary: /\/glossary\/[\w-]+/,
                academy: /\/academy\//,
                agents: /\/agents\//,
                api: /\/api\//,
                developers: /\/developers\//,
                document: /\.(pdf|doc|docx|txt)$/i,
                anchor: /^#[\w-]+$/,
                external: /^https?:\/\/(?!prismatic-reality\.com)/
            };
        }

        classify(url) {
            if (!url) return 'unknown';

            // Check for anchor links
            if (this.patterns.anchor.test(url)) return 'anchor';

            // Check for documents
            if (this.patterns.document.test(url)) return 'document';

            // Check for external links
            if (this.patterns.external.test(url)) return 'external';

            // Check for specific internal patterns
            for (const [category, pattern] of Object.entries(this.patterns)) {
                if (category !== 'external' && category !== 'document' && category !== 'anchor') {
                    if (pattern.test(url)) return category;
                }
            }

            // Default to internal if it's same origin
            if (url.startsWith(this.baseUrl) || url.startsWith('/')) {
                return 'internal';
            }

            return 'external';
        }

        getConfiguration(category) {
            return LINK_CATEGORIES[category] || LINK_CATEGORIES.internal;
        }
    }

    // Smart Prefetch Manager
    class PrefetchManager {
        constructor() {
            this.prefetchQueue = new Set();
            this.prefetchedUrls = new Set();
            this.maxQueueSize = NAV_CONFIG.maxPrefetchQueue;
            this.timeout = NAV_CONFIG.prefetchTimeout;
        }

        async prefetchUrl(url, priority = 'low') {
            if (this.prefetchedUrls.has(url) || this.prefetchQueue.size >= this.maxQueueSize) {
                return false;
            }

            this.prefetchQueue.add(url);

            try {
                // Create prefetch link element
                const link = document.createElement('link');
                link.rel = priority === 'high' ? 'preload' : 'prefetch';
                link.as = 'document';
                link.href = url;

                // Set crossorigin for external links
                if (!url.startsWith(window.location.origin)) {
                    link.crossOrigin = 'anonymous';
                }

                document.head.appendChild(link);
                this.prefetchedUrls.add(url);

                // Remove after timeout
                setTimeout(() => {
                    document.head.removeChild(link);
                    this.prefetchQueue.delete(url);
                }, this.timeout);

                return true;
            } catch (error) {
                this.prefetchQueue.delete(url);
                return false;
            }
        }

        preloadResource(url, type = 'document') {
            if (this.prefetchedUrls.has(url)) return false;

            try {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = type;
                link.href = url;
                document.head.appendChild(link);
                this.prefetchedUrls.add(url);
                return true;
            } catch (error) {
                return false;
            }
        }
    }

    // Navigation Analytics
    class NavigationAnalytics {
        constructor() {
            this.journey = JSON.parse(sessionStorage.getItem('user_journey') || '[]');
            this.currentPageStart = Date.now();
        }

        trackPageVisit(url = window.location.href) {
            const visit = {
                url: url,
                path: window.location.pathname,
                timestamp: Date.now(),
                referrer: document.referrer,
                title: document.title
            };

            this.journey.push(visit);

            // Keep only last 50 visits
            if (this.journey.length > 50) {
                this.journey = this.journey.slice(-50);
            }

            sessionStorage.setItem('user_journey', JSON.stringify(this.journey));

            // Send to MCP if available
            if (window.PrismaticMCP) {
                window.PrismaticMCP.notify('navigation.visit', {
                    visit: visit,
                    journey_length: this.journey.length
                });
            }
        }

        trackLinkClick(url, linkType, context = {}) {
            const clickEvent = {
                url: url,
                type: linkType,
                timestamp: Date.now(),
                page_time: Date.now() - this.currentPageStart,
                context: context
            };

            // Send to MCP analytics
            if (window.PrismaticMCP) {
                window.PrismaticMCP.notify('navigation.link_click', clickEvent);
            }

        }

        trackHover(url, duration) {
            if (window.PrismaticMCP) {
                window.PrismaticMCP.notify('navigation.hover', {
                    url: url,
                    duration: duration,
                    timestamp: Date.now()
                });
            }
        }
    }

    // Cross-Link Navigator Main Class
    class PrismaticCrossLinkNavigator {
        constructor() {
            this.mcpSource = new MCPNavigationSource();
            this.classifier = new LinkClassifier();
            this.prefetchManager = new PrefetchManager();
            this.analytics = new NavigationAnalytics();
            this.hoverTimers = new Map();
            this.init();
        }

        async init() {
            // Fetch navigation context
            await this.mcpSource.fetchNavigationContext();

            // Enhance all links on page
            this.enhanceLinks();

            // Set up observers for dynamic content
            this.setupObservers();

            // Track initial page visit
            this.analytics.trackPageVisit();

            // Listen for navigation events
            this.setupNavigationListeners();

        }

        enhanceLinks() {
            document.querySelectorAll('a[href]').forEach(link => {
                this.enhanceLink(link);
            });
        }

        enhanceLink(link) {
            const url = link.getAttribute('href');
            if (!url || link.dataset.enhanced) return;

            const category = this.classifier.classify(url);
            const config = this.classifier.getConfiguration(category);

            // Mark as enhanced
            link.dataset.enhanced = 'true';
            link.dataset.category = category;

            // Add visual indicators
            this.addVisualIndicators(link, category);

            // Set up hover behavior
            this.setupHoverBehavior(link, url, config);

            // Set up click tracking
            this.setupClickTracking(link, url, category);

            // Prefetch high-priority links
            if (config.prefetch && config.priority === 'high') {
                this.prefetchManager.prefetchUrl(url, config.priority);
            }
        }

        addVisualIndicators(link, category) {
            // Add category-specific classes
            link.classList.add(`link-${category}`);

            // Add icons for external links
            if (category === 'external' && !link.querySelector('.external-icon')) {
                const icon = document.createElement('span');
                icon.className = 'external-icon inline-block ml-1';
                icon.textContent = '↗';
                icon.style.fontSize = '0.8em';
                icon.style.opacity = '0.7';
                link.appendChild(icon);
            }

            // Add special styling for glossary links
            if (category === 'glossary') {
                link.classList.add('glossary-link', 'border-b', 'border-dashed', 'border-indigo-400/30', 'hover:border-indigo-400');
            }
        }

        setupHoverBehavior(link, url, config) {
            let hoverStartTime = 0;

            link.addEventListener('mouseenter', () => {
                hoverStartTime = Date.now();

                // Set hover timer for prefetch
                const timer = setTimeout(() => {
                    if (config.prefetch) {
                        this.prefetchManager.prefetchUrl(url, config.priority);
                    }
                }, NAV_CONFIG.hoverDelay);

                this.hoverTimers.set(link, timer);

                // Load related links for intelligent suggestions
                this.loadRelatedLinks(link, url);
            });

            link.addEventListener('mouseleave', () => {
                // Clear hover timer
                const timer = this.hoverTimers.get(link);
                if (timer) {
                    clearTimeout(timer);
                    this.hoverTimers.delete(link);
                }

                // Track hover duration
                if (hoverStartTime > 0) {
                    this.analytics.trackHover(url, Date.now() - hoverStartTime);
                }
            });
        }

        setupClickTracking(link, url, category) {
            link.addEventListener('click', (e) => {
                this.analytics.trackLinkClick(url, category, {
                    text: link.textContent.trim(),
                    position: this.getLinkPosition(link),
                    modifier_keys: {
                        ctrl: e.ctrlKey,
                        shift: e.shiftKey,
                        alt: e.altKey,
                        meta: e.metaKey
                    }
                });
            });
        }

        async loadRelatedLinks(link, url) {
            try {
                const relatedLinks = await this.mcpSource.fetchRelatedLinks(url);

                if (relatedLinks && relatedLinks.length > 0) {
                    this.showRelatedLinksTooltip(link, relatedLinks);
                }
            } catch (error) {
            }
        }

        showRelatedLinksTooltip(link, relatedLinks) {
            // Create tooltip element
            const tooltip = document.createElement('div');
            tooltip.className = 'related-links-tooltip absolute z-50 bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-lg max-w-xs';

            // Create header
            const header = document.createElement('div');
            header.className = 'text-xs font-medium text-gray-400 mb-2';
            header.textContent = 'Related Content';
            tooltip.appendChild(header);

            // Create related links
            relatedLinks.forEach(related => {
                const linkElement = document.createElement('a');
                linkElement.href = related.url;
                linkElement.className = 'block text-sm text-gray-300 hover:text-white py-1 no-underline';
                linkElement.textContent = related.title;
                tooltip.appendChild(linkElement);
            });

            // Position tooltip
            const rect = link.getBoundingClientRect();
            tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
            tooltip.style.left = `${rect.left + window.scrollX}px`;

            document.body.appendChild(tooltip);

            // Remove tooltip after delay or on link leave
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, 3000);
        }

        setupObservers() {
            // Observe for dynamically added links
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            const links = node.querySelectorAll ? node.querySelectorAll('a[href]') : [];
                            links.forEach(link => this.enhanceLink(link));

                            // Check if the node itself is a link
                            if (node.tagName === 'A' && node.hasAttribute('href')) {
                                this.enhanceLink(node);
                            }
                        }
                    });
                });
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }

        setupNavigationListeners() {
            // Listen for popstate (back/forward navigation)
            window.addEventListener('popstate', () => {
                this.analytics.trackPageVisit();
                this.analytics.currentPageStart = Date.now();
            });

            // Listen for hash changes
            window.addEventListener('hashchange', () => {
                this.analytics.trackPageVisit();
            });
        }

        getLinkPosition(link) {
            const rect = link.getBoundingClientRect();
            return {
                x: rect.left,
                y: rect.top,
                viewport_width: window.innerWidth,
                viewport_height: window.innerHeight
            };
        }

        // Public API
        refreshContext() {
            return this.mcpSource.fetchNavigationContext();
        }

        getJourney() {
            return this.analytics.journey;
        }

        prefetchUrl(url, priority = 'low') {
            return this.prefetchManager.prefetchUrl(url, priority);
        }

        classifyLink(url) {
            return this.classifier.classify(url);
        }
    }

    // Initialize when DOM is ready
    function initializeCrossLinkNavigator() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                window.PrismaticNav = new PrismaticCrossLinkNavigator();
            });
        } else {
            window.PrismaticNav = new PrismaticCrossLinkNavigator();
        }

        // Trigger ready event
        document.dispatchEvent(new CustomEvent('navigation:ready'));
    }

    // Auto-initialize
    initializeCrossLinkNavigator();

})();
