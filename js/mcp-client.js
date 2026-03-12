// Prismatic Platform MCP Browser Client
// JSON-RPC 2.0 over HTTP | Same-origin /api/v1/mcp | CSP-safe
(function() {
    'use strict';

    var _config = {
        endpoint: '/api/v1/mcp',
        enabled: false,
        pageUrl: window.location.href
    };

    var _msgId = 0;
    var _sseSource = null;
    var _sseHandlers = {};
    var _sseRefCount = 0;

    function _nextId() {
        _msgId += 1;
        return _msgId;
    }

    function _post(body, retries) {
        retries = retries === undefined ? 3 : retries;
        if (!_config.enabled) { return Promise.resolve(null); }
        return fetch(_config.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }).then(function(res) {
            if (!res.ok) { throw new Error('HTTP ' + res.status); }
            return res.json();
        }).catch(function() {
            if (retries > 0) {
                return new Promise(function(resolve) {
                    setTimeout(function() {
                        resolve(_post(body, retries - 1));
                    }, Math.pow(2, 3 - retries) * 500);
                });
            }
            return null;
        });
    }

    function request(method, params) {
        return _post({ jsonrpc: '2.0', id: _nextId(), method: method, params: params || {} });
    }

    function notify(method, params) {
        _post({ jsonrpc: '2.0', method: method, params: params || {} });
    }

    function stream(eventType, handler) {
        if (!_config.enabled) { return function() {}; }
        if (!_sseHandlers[eventType]) { _sseHandlers[eventType] = []; }
        _sseHandlers[eventType].push(handler);
        _sseRefCount += 1;
        if (!_sseSource) {
            _sseSource = new EventSource(_config.endpoint + '/events');
            _sseSource.onmessage = function(e) {
                try {
                    var data = JSON.parse(e.data);
                    var handlers = _sseHandlers[data.type] || [];
                    handlers.forEach(function(h) { h(data); });
                } catch (_) {}
            };
            _sseSource.onerror = function() {
                _sseSource.close();
                _sseSource = null;
            };
        }
        return function unsubscribe() {
            var list = _sseHandlers[eventType] || [];
            var idx = list.indexOf(handler);
            if (idx > -1) { list.splice(idx, 1); }
            _sseRefCount -= 1;
            if (_sseRefCount <= 0 && _sseSource) {
                _sseSource.close();
                _sseSource = null;
            }
        };
    }

    function getPageContext() {
        function meta(name) {
            var el = document.querySelector('meta[property="' + name + '"], meta[name="' + name + '"]');
            return el ? el.getAttribute('content') : '';
        }
        var path = window.location.pathname;
        var parts = path.split('/').filter(Boolean);
        return {
            url: meta('og:url') || window.location.href,
            title: meta('og:title') || document.title,
            description: meta('og:description') || meta('description'),
            type: meta('og:type'),
            image: meta('og:image'),
            section: parts[0] || 'home',
            subsection: parts[1] || ''
        };
    }

    function initialize(overrides) {
        var src = window.__MCP_CONFIG__ || {};
        Object.keys(src).forEach(function(k) { _config[k] = src[k]; });
        if (overrides) {
            Object.keys(overrides).forEach(function(k) { _config[k] = overrides[k]; });
        }
    }

    window.PrismaticMCP = {
        initialize: initialize,
        request: request,
        notify: notify,
        stream: stream,
        getPageContext: getPageContext
    };

    document.addEventListener('DOMContentLoaded', function() {
        initialize();
        if (_config.enabled) {
            notify('page.view', getPageContext());
        }
    });

})();