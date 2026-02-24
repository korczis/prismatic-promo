/**
 * Prismatic Code Components - Unified JavaScript Module
 *
 * This module provides unified Prism.js integration that works seamlessly
 * across both static sites (Zola) and dynamic Phoenix LiveView applications.
 *
 * Features:
 * - Automatic language detection and highlighting
 * - Copy-to-clipboard with visual feedback
 * - Line highlighting and selection
 * - Theme switching capabilities
 * - Lazy loading for optimal performance
 * - Progressive enhancement
 */

class PrismaticCodeHighlighter {
  constructor(options = {}) {
    this.options = {
      theme: 'github-dark',
      lazyLoad: true,
      features: ['copy', 'lineNumbers', 'badge'],
      copyTimeout: 2000,
      ...options
    };

    this.initialized = false;
    this.prismLoaded = false;
    this.languageAliases = this.setupLanguageAliases();

    // Bind methods to preserve context
    this.handleCopyClick = this.handleCopyClick.bind(this);
    this.highlightCodeBlocks = this.highlightCodeBlocks.bind(this);

    this.init();
  }

  /**
   * Initialize the highlighter
   */
  init() {
    if (this.initialized) return;

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  /**
   * Setup the highlighter once DOM is ready
   */
  setup() {
    this.initialized = true;
    this.prismLoaded = window.Prism !== undefined;

    // Initialize existing code blocks
    this.highlightCodeBlocks();

    // Setup copy button handlers
    this.setupCopyButtons();

    // Setup mutation observer for dynamic content
    this.setupMutationObserver();

    // Setup theme switching if enabled
    if (this.options.features.includes('themeSelector')) {
      this.setupThemeSelector();
    }

    console.log('PrismaticCodeHighlighter initialized', {
      prismLoaded: this.prismLoaded,
      theme: this.options.theme,
      features: this.options.features
    });
  }

  /**
   * Language aliases mapping (Zola format -> Prism format)
   */
  setupLanguageAliases() {
    return {
      // Shell variants
      'sh': 'bash',
      'shell': 'bash',
      'zsh': 'bash',
      'console': 'bash',

      // Data formats
      'yml': 'yaml',

      // Elixir variants
      'ex': 'elixir',
      'exs': 'elixir',
      'eex': 'elixir',
      'heex': 'elixir',

      // JavaScript variants
      'ts': 'typescript',
      'js': 'javascript',

      // Other aliases
      'rb': 'ruby',
      'py': 'python',
      'rs': 'rust',
      'md': 'markdown',
      'dockerfile': 'docker',

      // Markup variants
      'html': 'markup',
      'xml': 'markup',
      'svg': 'markup',

      // Plain text variants
      'txt': 'plaintext',
      'text': 'plaintext',
      'plain': 'plaintext'
    };
  }

  /**
   * Highlight all code blocks on the page
   */
  highlightCodeBlocks() {
    // Find code blocks with data-lang attribute (Zola format)
    const zolaBlocks = document.querySelectorAll('pre > code[data-lang]');
    zolaBlocks.forEach(codeEl => this.processZolaCodeBlock(codeEl));

    // Find code blocks with language-* class (Prism format)
    const prismBlocks = document.querySelectorAll('pre code[class*="language-"]');
    prismBlocks.forEach(codeEl => this.processPrismCodeBlock(codeEl));

    // Find Prismatic code blocks (Phoenix LiveView format)
    const prismaticBlocks = document.querySelectorAll('.prismatic-code-block');
    prismaticBlocks.forEach(container => this.processPrismaticCodeBlock(container));

    // Trigger Prism highlighting if available
    if (this.prismLoaded) {
      window.Prism.highlightAll();
    }
  }

  /**
   * Process Zola-style code blocks
   */
  processZolaCodeBlock(codeEl) {
    const lang = codeEl.getAttribute('data-lang');
    if (!lang) return;

    // Normalize language name
    const prismLang = this.languageAliases[lang.toLowerCase()] || lang.toLowerCase();

    // Add Prism's expected class
    codeEl.classList.add(`language-${prismLang}`);

    // Also set on the parent pre element
    const preEl = codeEl.parentElement;
    if (preEl && preEl.tagName === 'PRE') {
      preEl.classList.add(`language-${prismLang}`);
      // Store original lang for the language badge
      preEl.setAttribute('data-lang', lang);
      preEl.setAttribute('data-normalized-lang', prismLang);
    }
  }

  /**
   * Process Prism-style code blocks
   */
  processPrismCodeBlock(codeEl) {
    // Extract language from class
    const langClass = Array.from(codeEl.classList).find(cls => cls.startsWith('language-'));
    if (!langClass) return;

    const lang = langClass.replace('language-', '');
    const preEl = codeEl.parentElement;

    if (preEl && preEl.tagName === 'PRE') {
      preEl.setAttribute('data-normalized-lang', lang);
    }
  }

  /**
   * Process Prismatic code blocks (Phoenix LiveView)
   */
  processPrismaticCodeBlock(container) {
    const codeEl = container.querySelector('code');
    if (!codeEl) return;

    const lang = container.getAttribute('data-language');
    const features = this.parseFeatures(container.getAttribute('data-features'));
    const highlightLines = this.parseHighlightLines(container.getAttribute('data-highlight-lines'));

    // Apply line highlighting if specified
    if (highlightLines.length > 0 && features.includes('highlight_lines')) {
      this.highlightLines(codeEl, highlightLines);
    }

    // Add theme classes
    const theme = container.getAttribute('data-theme') || this.options.theme;
    container.classList.add(`prismatic-theme-${theme}`);
  }

  /**
   * Setup copy button functionality
   */
  setupCopyButtons() {
    // Remove existing listeners to avoid duplicates
    document.removeEventListener('click', this.handleCopyClick);

    // Add event delegation for copy buttons
    document.addEventListener('click', this.handleCopyClick);
  }

  /**
   * Handle copy button clicks
   */
  async handleCopyClick(event) {
    const button = event.target.closest('.prismatic-copy-button');
    if (!button) return;

    event.preventDefault();
    event.stopPropagation();

    const targetSelector = button.getAttribute('data-copy-target');
    const codeElement = targetSelector ? document.querySelector(targetSelector) :
                       button.closest('.prismatic-code-block')?.querySelector('code');

    if (!codeElement) {
      console.warn('Copy button: No code element found');
      return;
    }

    try {
      // Get clean text content (no line numbers or decorations)
      const text = this.getCleanCodeText(codeElement);

      // Copy to clipboard
      await this.copyToClipboard(text);

      // Show success feedback
      this.showCopyFeedback(button, true);

      console.log('Code copied to clipboard', { length: text.length });
    } catch (error) {
      console.error('Failed to copy code:', error);
      this.showCopyFeedback(button, false);
    }
  }

  /**
   * Get clean code text without line numbers or decorations
   */
  getCleanCodeText(codeElement) {
    // Clone the element to avoid modifying the original
    const clone = codeElement.cloneNode(true);

    // Remove line number elements if present
    const lineNumbers = clone.querySelectorAll('.line-numbers-rows');
    lineNumbers.forEach(el => el.remove());

    // Remove any other decorative elements
    const decorations = clone.querySelectorAll('.prismatic-line-highlight, .prismatic-decoration');
    decorations.forEach(el => el.remove());

    return clone.textContent || clone.innerText || '';
  }

  /**
   * Copy text to clipboard with fallback
   */
  async copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      // Use modern Clipboard API
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand('copy');
      } finally {
        textArea.remove();
      }
    }
  }

  /**
   * Show copy feedback animation
   */
  showCopyFeedback(button, success) {
    const copyIcon = button.querySelector('.prismatic-copy-icon');
    const checkIcon = button.querySelector('.prismatic-check-icon');

    if (copyIcon && checkIcon) {
      copyIcon.classList.add('hidden');
      checkIcon.classList.remove('hidden');

      if (success) {
        button.classList.add('text-green-400');
      } else {
        button.classList.add('text-red-400');
      }

      setTimeout(() => {
        copyIcon.classList.remove('hidden');
        checkIcon.classList.add('hidden');
        button.classList.remove('text-green-400', 'text-red-400');
      }, this.options.copyTimeout);
    }
  }

  /**
   * Highlight specific lines in a code block (SAFE DOM MANIPULATION)
   */
  highlightLines(codeElement, lineNumbers) {
    const textContent = codeElement.textContent || '';
    const lines = textContent.split('\n');

    // Clear existing content safely
    codeElement.textContent = '';

    // Create highlighted lines using safe DOM methods
    lines.forEach((line, index) => {
      const lineNumber = index + 1;

      if (lineNumbers.includes(lineNumber)) {
        // Create highlighted line element
        const highlightSpan = document.createElement('span');
        highlightSpan.className = 'prismatic-line-highlight';
        highlightSpan.textContent = line;
        codeElement.appendChild(highlightSpan);
      } else {
        // Add plain text node
        codeElement.appendChild(document.createTextNode(line));
      }

      // Add newline except for last line
      if (index < lines.length - 1) {
        codeElement.appendChild(document.createTextNode('\n'));
      }
    });
  }

  /**
   * Setup mutation observer for dynamic content
   */
  setupMutationObserver() {
    if (typeof MutationObserver === 'undefined') return;

    const observer = new MutationObserver((mutations) => {
      let shouldProcess = false;

      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Check if new code blocks were added
              if (node.matches && (
                node.matches('pre code[data-lang]') ||
                node.matches('.prismatic-code-block') ||
                node.querySelector('pre code[data-lang]') ||
                node.querySelector('.prismatic-code-block')
              )) {
                shouldProcess = true;
              }
            }
          });
        }
      });

      if (shouldProcess) {
        // Debounce processing
        clearTimeout(this.processTimeout);
        this.processTimeout = setTimeout(() => {
          this.highlightCodeBlocks();
        }, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Setup theme selector functionality
   */
  setupThemeSelector() {
    // This would be implemented for theme switching
    // For now, we'll just log that it's available
    console.log('Theme selector feature enabled');
  }

  /**
   * Parse features from JSON string
   */
  parseFeatures(featuresStr) {
    if (!featuresStr) return [];

    try {
      return JSON.parse(featuresStr);
    } catch (error) {
      console.warn('Failed to parse features:', featuresStr, error);
      return [];
    }
  }

  /**
   * Parse highlight lines from JSON string
   */
  parseHighlightLines(linesStr) {
    if (!linesStr) return [];

    try {
      const parsed = JSON.parse(linesStr);
      return Array.isArray(parsed) ? parsed.filter(n => Number.isInteger(n)) : [];
    } catch (error) {
      console.warn('Failed to parse highlight lines:', linesStr, error);
      return [];
    }
  }

  /**
   * Manually trigger highlighting (useful for dynamic content)
   */
  refresh() {
    this.highlightCodeBlocks();
  }

  /**
   * Change theme dynamically
   */
  setTheme(theme) {
    this.options.theme = theme;

    // Update all prismatic code blocks
    const blocks = document.querySelectorAll('.prismatic-code-block');
    blocks.forEach(block => {
      // Remove old theme classes
      block.className = block.className.replace(/prismatic-theme-\w+/g, '');
      // Add new theme class
      block.classList.add(`prismatic-theme-${theme}`);
      block.setAttribute('data-theme', theme);
    });

    console.log(`Theme changed to: ${theme}`);
  }
}

// Global initialization
let prismaticHighlighter;

function initPrismaticCodeHighlighter(options = {}) {
  if (!prismaticHighlighter) {
    prismaticHighlighter = new PrismaticCodeHighlighter(options);
  }
  return prismaticHighlighter;
}

// Auto-initialize with default options
document.addEventListener('DOMContentLoaded', () => {
  initPrismaticCodeHighlighter();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PrismaticCodeHighlighter, initPrismaticCodeHighlighter };
}

// Global window access
if (typeof window !== 'undefined') {
  window.PrismaticCodeHighlighter = PrismaticCodeHighlighter;
  window.initPrismaticCodeHighlighter = initPrismaticCodeHighlighter;
}