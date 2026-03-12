// Prismatic Platform Social Share Utility
// IIFE | CSP-safe (window.open for popups, no external fetch) | Web Share API + clipboard fallback
(function() {
    'use strict';

    var _SocialShare = {
        share: function(platform, url, title) {
            if (platform === 'native' && navigator.share) {
                navigator.share({ title: title, url: url })
                    .catch(function() { return _SocialShare.copy(url); });
                return;
            }
            var shareUrl;
            if (platform === 'twitter') {
                shareUrl = 'https://twitter.com/intent/tweet?url=' +
                    encodeURIComponent(url) + '&text=' + encodeURIComponent(title);
            } else if (platform === 'linkedin') {
                shareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' +
                    encodeURIComponent(url);
            } else {
                return;
            }
            var left = Math.round(screen.width / 2 - 300);
            var top = Math.round(screen.height / 2 - 200);
            window.open(shareUrl, '_blank',
                'noopener,noreferrer,width=600,height=400,left=' + left + ',top=' + top);
        },

        copy: function(url) {
            if (navigator.clipboard) {
                return navigator.clipboard.writeText(url);
            }
            return Promise.reject(new Error('Clipboard API not available'));
        },

        init: function() {
            document.addEventListener('click', function(e) {
                var btn = e.target.closest('[data-social-share]');
                if (!btn) { return; }
                var platform = btn.getAttribute('data-platform') || '';
                var url = btn.getAttribute('data-url') || window.location.href;
                var title = btn.getAttribute('data-title') || document.title;
                _SocialShare.share(platform, url, title);
            });
        }
    };

    window.__SocialShare = _SocialShare;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { _SocialShare.init(); });
    } else {
        _SocialShare.init();
    }

})();