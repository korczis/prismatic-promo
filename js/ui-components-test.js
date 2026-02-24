/**
 * UI Components Integration Test
 * Validates that all interactive components are working correctly
 * Uses secure DOM manipulation methods
 */

class UIComponentsTest {
  constructor() {
    this.testResults = [];
    this.initialize();
  }

  initialize() {
    console.log('🧪 Starting UI Components Integration Tests...');
    this.runAllTests();
  }

  async runAllTests() {
    const tests = [
      { name: 'DOM Ready', test: this.testDOMReady },
      { name: 'Prismatic UI Loaded', test: this.testPrismaticUILoaded },
      { name: 'Security Rating Card', test: this.testSecurityRatingCard },
      { name: 'Intelligence Grid', test: this.testIntelligenceGrid },
      { name: 'Risk Heatmap', test: this.testRiskHeatmap },
      { name: 'Network Graph', test: this.testNetworkGraph },
      { name: 'Component Showcase', test: this.testComponentShowcase },
      { name: 'Interactive Features', test: this.testInteractiveFeatures },
      { name: 'Event System', test: this.testEventSystem },
      { name: 'Styling', test: this.testStyling }
    ];

    for (const { name, test } of tests) {
      try {
        const result = await test.call(this);
        this.logTestResult(name, true, result);
      } catch (error) {
        this.logTestResult(name, false, error.message);
      }
    }

    this.displayTestSummary();
  }

  // Test Implementations

  testDOMReady() {
    if (document.readyState === 'loading') {
      throw new Error('DOM not ready');
    }
    return 'DOM is ready';
  }

  testPrismaticUILoaded() {
    if (!window.prismaticUI) {
      throw new Error('PrismaticUI not loaded');
    }
    return 'PrismaticUI loaded successfully';
  }

  testSecurityRatingCard() {
    const container = document.getElementById('security-rating-demo');
    if (!container) {
      throw new Error('Security rating demo container not found');
    }

    const card = container.querySelector('.security-rating-card');
    if (!card) {
      throw new Error('Security rating card not rendered');
    }

    // Test interactive elements
    const buttons = card.querySelectorAll('button');
    if (buttons.length === 0) {
      throw new Error('No interactive buttons found');
    }

    // Test if grade is displayed
    const grade = card.querySelector('.security-rating-grade, [class*="grade-"]');
    if (!grade) {
      throw new Error('Security grade not displayed');
    }

    return `Security rating card rendered with ${buttons.length} buttons and grade display`;
  }

  testIntelligenceGrid() {
    const container = document.getElementById('intelligence-grid-demo');
    if (!container) {
      throw new Error('Intelligence grid demo container not found');
    }

    const grid = container.querySelector('.intelligence-grid, [class*="intelligence"]');
    if (!grid) {
      throw new Error('Intelligence grid not rendered');
    }

    // Test for data rows
    const rows = container.querySelectorAll('[class*="intelligence-row"], tr, .flex');
    if (rows.length === 0) {
      throw new Error('No data rows found in intelligence grid');
    }

    return `Intelligence grid rendered with ${rows.length} rows`;
  }

  testRiskHeatmap() {
    const container = document.getElementById('risk-heatmap-demo');
    if (!container) {
      throw new Error('Risk heatmap demo container not found');
    }

    const heatmap = container.querySelector('.risk-heatmap, [class*="heatmap"]');
    if (!heatmap) {
      throw new Error('Risk heatmap not rendered');
    }

    return 'Risk heatmap rendered successfully';
  }

  testNetworkGraph() {
    const container = document.getElementById('network-graph-demo');
    if (!container) {
      throw new Error('Network graph demo container not found');
    }

    const graph = container.querySelector('.network-graph, [class*="network"]');
    if (!graph) {
      throw new Error('Network graph not rendered');
    }

    return 'Network graph rendered successfully';
  }

  testComponentShowcase() {
    const showcase = document.getElementById('component-showcase');
    if (!showcase) {
      throw new Error('Component showcase container not found');
    }

    // Check if showcase has some content
    if (showcase.children.length === 0) {
      throw new Error('Component showcase is empty');
    }

    return 'Component showcase rendered successfully';
  }

  testInteractiveFeatures() {
    // Test notification system
    if (!window.prismaticUI || typeof window.prismaticUI.showNotification !== 'function') {
      throw new Error('Notification system not available');
    }

    // Test a notification
    window.prismaticUI.showNotification('Test notification', 'info');

    // Test component methods exist
    const methods = [
      'exportSecurityReport',
      'scheduleRescan',
      'filterIntelligenceGrid',
      'exportIntelligenceData',
      'generateRiskReport',
      'exportGraphData'
    ];

    for (const method of methods) {
      if (typeof window.prismaticUI[method] !== 'function') {
        throw new Error(`Method ${method} not available`);
      }
    }

    return `All ${methods.length} interactive methods available`;
  }

  testEventSystem() {
    // Test if we can create and handle custom events
    let eventReceived = false;

    const testHandler = () => {
      eventReceived = true;
    };

    document.addEventListener('test-ui-event', testHandler);

    // Dispatch test event
    const testEvent = new CustomEvent('test-ui-event', {
      detail: { test: true }
    });
    document.dispatchEvent(testEvent);

    // Clean up
    document.removeEventListener('test-ui-event', testHandler);

    if (!eventReceived) {
      throw new Error('Event system not working');
    }

    return 'Event system working correctly';
  }

  testStyling() {
    // Test if CSS classes are applied
    const body = document.body;
    const computedStyle = window.getComputedStyle(body);

    // Test if TailwindCSS is loaded (checking for some common Tailwind styles)
    const testElement = document.createElement('div');
    testElement.className = 'bg-blue-500 text-white p-4 rounded';
    document.body.appendChild(testElement);

    const testStyle = window.getComputedStyle(testElement);
    const hasBackgroundColor = testStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' && testStyle.backgroundColor !== 'transparent';

    document.body.removeChild(testElement);

    if (!hasBackgroundColor) {
      throw new Error('TailwindCSS styles not applying');
    }

    // Check if our custom CSS is loaded
    const prismaticCSS = document.querySelector('link[href*="prismatic-ui-components.css"]');
    if (!prismaticCSS) {
      console.warn('Custom Prismatic UI CSS not found, but Tailwind is working');
    }

    return 'CSS styling working correctly';
  }

  // Test Utilities

  logTestResult(testName, passed, details) {
    const result = {
      name: testName,
      passed,
      details,
      timestamp: new Date()
    };

    this.testResults.push(result);

    const icon = passed ? '✅' : '❌';
    const color = passed ? 'color: green' : 'color: red';

    console.log(`%c${icon} ${testName}: ${details}`, color);
  }

  displayTestSummary() {
    const totalTests = this.testResults.length;
    const passedTests = this.testResults.filter(r => r.passed).length;
    const failedTests = totalTests - passedTests;

    console.log('\n🧪 TEST SUMMARY');
    console.log('================');
    console.log(`Total Tests: ${totalTests}`);
    console.log(`✅ Passed: ${passedTests}`);
    console.log(`❌ Failed: ${failedTests}`);
    console.log(`Success Rate: ${Math.round((passedTests / totalTests) * 100)}%`);

    if (failedTests === 0) {
      console.log('%c🎉 All tests passed! UI components are working correctly.', 'color: green; font-weight: bold');
    } else {
      console.log('%c⚠️ Some tests failed. Check the details above.', 'color: orange; font-weight: bold');
    }

    // Create visual test results
    this.createVisualTestResults();
  }

  createVisualTestResults() {
    // Create a test results overlay using safe DOM methods
    const overlay = document.createElement('div');
    overlay.id = 'ui-test-results';
    overlay.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 20px;
      border-radius: 8px;
      font-family: monospace;
      font-size: 12px;
      max-width: 400px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    `;

    // Create header
    const header = document.createElement('h3');
    header.style.cssText = 'margin: 0 0 10px 0; color: #3b82f6;';
    header.textContent = '🧪 UI Components Test Results';
    overlay.appendChild(header);

    // Create summary
    const summary = document.createElement('div');
    summary.style.marginBottom = '10px';

    const totalTests = this.testResults.length;
    const passedTests = this.testResults.filter(r => r.passed).length;
    const successRate = Math.round((passedTests / totalTests) * 100);

    const summaryStrong = document.createElement('strong');
    summaryStrong.textContent = `Tests: ${passedTests}/${totalTests}`;

    const summaryRate = document.createElement('span');
    summaryRate.style.color = successRate === 100 ? '#22c55e' : '#f59e0b';
    summaryRate.textContent = ` (${successRate}%)`;

    summary.appendChild(summaryStrong);
    summary.appendChild(summaryRate);
    overlay.appendChild(summary);

    // Create test results list
    const resultsList = document.createElement('div');
    resultsList.style.cssText = 'max-height: 200px; overflow-y: auto; font-size: 11px;';

    this.testResults.forEach(result => {
      const resultDiv = document.createElement('div');
      resultDiv.style.cssText = `margin: 5px 0; color: ${result.passed ? '#22c55e' : '#ef4444'};`;
      resultDiv.textContent = `${result.passed ? '✅' : '❌'} ${result.name}`;
      resultsList.appendChild(resultDiv);
    });

    overlay.appendChild(resultsList);

    // Create close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.cssText = `
      margin-top: 10px;
      padding: 5px 10px;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;
    closeButton.addEventListener('click', () => {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
    });
    overlay.appendChild(closeButton);

    document.body.appendChild(overlay);

    // Auto-remove after 30 seconds
    setTimeout(() => {
      if (document.getElementById('ui-test-results')) {
        document.body.removeChild(overlay);
      }
    }, 30000);
  }
}

// Auto-run tests when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => new UIComponentsTest(), 2000); // Wait 2s for components to initialize
  });
} else {
  setTimeout(() => new UIComponentsTest(), 2000);
}