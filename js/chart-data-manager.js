// Prismatic Platform Chart Data Manager
// L2-Learning Layer: Chart.js Integration with MCP + Flowbite LLM Best Practices
// Version: 1.0.0 | 3NL Architecture Compliant
(function() {
    'use strict';

    // Chart.js Configuration with Flowbite Dark Theme
    const CHART_DEFAULTS = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#e5e7eb', // gray-200
                    font: {
                        family: 'Inter, ui-sans-serif, system-ui'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(31, 41, 55, 0.9)', // gray-800 with opacity
                titleColor: '#f9fafb', // gray-50
                bodyColor: '#f3f4f6', // gray-100
                borderColor: '#6366f1', // indigo-500
                borderWidth: 1
            }
        },
        scales: {
            x: {
                ticks: { color: '#9ca3af' }, // gray-400
                grid: { color: 'rgba(75, 85, 99, 0.3)' } // gray-600 with opacity
            },
            y: {
                ticks: { color: '#9ca3af' },
                grid: { color: 'rgba(75, 85, 99, 0.3)' }
            }
        }
    };

    // Color Palettes (Flowbite Compatible)
    const COLOR_PALETTES = {
        primary: [
            '#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b',
            '#ef4444', '#ec4899', '#84cc16', '#f97316', '#3b82f6'
        ],
        gradient: [
            'rgba(99, 102, 241, 0.8)', 'rgba(139, 92, 246, 0.8)',
            'rgba(6, 182, 212, 0.8)', 'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)'
        ],
        semantic: {
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444',
            info: '#06b6d4',
            neutral: '#6b7280'
        }
    };

    // MCP Data Source Integration
    class MCPDataSource {
        constructor() {
            this.cache = new Map();
            this.refreshInterval = 30000; // 30 seconds
        }

        async fetchChartData(endpoint, params = {}) {
            const cacheKey = `${endpoint}_${JSON.stringify(params)}`;

            // Check cache first
            if (this.cache.has(cacheKey)) {
                const cached = this.cache.get(cacheKey);
                if (Date.now() - cached.timestamp < this.refreshInterval) {
                    return cached.data;
                }
            }

            try {
                // Use PrismaticMCP client for data fetching
                const response = await window.PrismaticMCP.request('chart.data', {
                    endpoint: endpoint,
                    params: params,
                    context: window.PrismaticMCP.getPageContext()
                });

                const data = {
                    data: response.result,
                    timestamp: Date.now()
                };

                this.cache.set(cacheKey, data);
                return data.data;
            } catch (error) {
                return this.getFallbackData(endpoint);
            }
        }

        getFallbackData(endpoint) {
            // Fallback data for demo purposes
            const fallbacks = {
                'platform.stats': {
                    labels: ['Agents', 'Apps', 'Commands', 'Tests'],
                    datasets: [{
                        label: 'Platform Metrics',
                        data: [535, 106, 219, 15420],
                        backgroundColor: COLOR_PALETTES.primary.slice(0, 4)
                    }]
                },
                'quality.trend': {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [{
                        label: 'Quality Score',
                        data: [85, 92, 97, 100],
                        borderColor: COLOR_PALETTES.semantic.success,
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        fill: true
                    }]
                },
                'performance.metrics': {
                    labels: ['Response Time', 'Throughput', 'Memory Usage', 'CPU Usage'],
                    datasets: [{
                        label: 'Performance (%)',
                        data: [95, 87, 65, 42],
                        backgroundColor: COLOR_PALETTES.gradient
                    }]
                }
            };
            return fallbacks[endpoint] || fallbacks['platform.stats'];
        }
    }

    // Chart Manager with Advanced Features
    class PrismaticChartManager {
        constructor() {
            this.dataSource = new MCPDataSource();
            this.charts = new Map();
            this.autoRefresh = true;
            this.refreshInterval = 30000;
            this.init();
        }

        init() {
            // Auto-discover chart containers
            this.discoverCharts();

            // Setup auto-refresh if enabled
            if (this.autoRefresh) {
                setInterval(() => this.refreshAllCharts(), this.refreshInterval);
            }

            // Listen for MCP events
            if (window.PrismaticMCP) {
                window.PrismaticMCP.stream('chart.update', (event) => {
                    this.handleChartUpdate(event);
                });
            }
        }

        discoverCharts() {
            document.querySelectorAll('[data-chart-type]').forEach(element => {
                this.createChart(element);
            });
        }

        async createChart(element) {
            const chartType = element.dataset.chartType;
            const chartData = element.dataset.chartData;
            const chartOptions = element.dataset.chartOptions;
            const canvasId = element.dataset.chartCanvas || `chart_${Date.now()}`;

            // Create canvas if not exists
            let canvas = element.querySelector('canvas');
            if (!canvas) {
                canvas = document.createElement('canvas');
                canvas.id = canvasId;
                canvas.className = 'w-full h-full';
                element.appendChild(canvas);
            }

            try {
                const data = await this.dataSource.fetchChartData(chartData);
                const options = this.mergeOptions(chartOptions);

                const chart = new Chart(canvas.getContext('2d'), {
                    type: chartType,
                    data: data,
                    options: options
                });

                this.charts.set(canvasId, {
                    chart: chart,
                    element: element,
                    dataSource: chartData,
                    lastUpdate: Date.now()
                });

                // Trigger success event
                element.dispatchEvent(new CustomEvent('chart:created', {
                    detail: { chartId: canvasId, chart: chart }
                }));

            } catch (error) {
                this.renderError(element, error);
            }
        }

        mergeOptions(customOptions) {
            const options = { ...CHART_DEFAULTS };

            if (customOptions) {
                try {
                    const parsed = typeof customOptions === 'string'
                        ? JSON.parse(customOptions)
                        : customOptions;
                    Object.assign(options, parsed);
                } catch (e) {
                }
            }

            return options;
        }

        async refreshChart(chartId) {
            const chartInfo = this.charts.get(chartId);
            if (!chartInfo) return;

            try {
                const newData = await this.dataSource.fetchChartData(chartInfo.dataSource);
                chartInfo.chart.data = newData;
                chartInfo.chart.update('active');
                chartInfo.lastUpdate = Date.now();

                // Trigger refresh event
                chartInfo.element.dispatchEvent(new CustomEvent('chart:refreshed', {
                    detail: { chartId: chartId, data: newData }
                }));

            } catch (error) {
            }
        }

        async refreshAllCharts() {
            const promises = Array.from(this.charts.keys()).map(id => this.refreshChart(id));
            await Promise.all(promises);
        }

        handleChartUpdate(event) {
            if (event.chartId && this.charts.has(event.chartId)) {
                this.refreshChart(event.chartId);
            } else if (event.type === 'refresh_all') {
                this.refreshAllCharts();
            }
        }

        renderError(element, error) {
            // Clear element safely
            element.textContent = '';

            // Create error container
            const errorDiv = document.createElement('div');
            errorDiv.className = 'flex items-center justify-center h-64 bg-gray-800 border border-gray-700 rounded-lg';

            const contentDiv = document.createElement('div');
            contentDiv.className = 'text-center text-gray-400';

            // SVG icon
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('class', 'w-12 h-12 mx-auto mb-4');
            svg.setAttribute('fill', 'none');
            svg.setAttribute('stroke', 'currentColor');
            svg.setAttribute('viewBox', '0 0 24 24');

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('stroke-linecap', 'round');
            path.setAttribute('stroke-linejoin', 'round');
            path.setAttribute('stroke-width', '2');
            path.setAttribute('d', 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z');

            svg.appendChild(path);

            // Title
            const title = document.createElement('h3');
            title.className = 'text-lg font-medium text-gray-300 mb-2';
            title.textContent = 'Chart Error';

            // Description
            const desc = document.createElement('p');
            desc.className = 'text-sm';
            desc.textContent = 'Failed to load chart data';

            // Retry button
            const button = document.createElement('button');
            button.className = 'mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700';
            button.textContent = 'Retry';
            button.onclick = () => location.reload();

            contentDiv.appendChild(svg);
            contentDiv.appendChild(title);
            contentDiv.appendChild(desc);
            contentDiv.appendChild(button);
            errorDiv.appendChild(contentDiv);
            element.appendChild(errorDiv);
        }

        // Public API
        getChart(chartId) {
            return this.charts.get(chartId)?.chart;
        }

        destroyChart(chartId) {
            const chartInfo = this.charts.get(chartId);
            if (chartInfo) {
                chartInfo.chart.destroy();
                this.charts.delete(chartId);
            }
        }

        updateChartData(chartId, newData) {
            const chartInfo = this.charts.get(chartId);
            if (chartInfo) {
                chartInfo.chart.data = newData;
                chartInfo.chart.update();
            }
        }
    }

    // Global Chart Utils
    const ChartUtils = {
        formatNumber: (num) => {
            if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
            if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
            return num.toString();
        },

        generateRandomData: (count, min = 0, max = 100) => {
            return Array.from({ length: count }, () =>
                Math.floor(Math.random() * (max - min + 1)) + min
            );
        },

        getColorPalette: (name = 'primary') => COLOR_PALETTES[name] || COLOR_PALETTES.primary,

        createGradient: (ctx, color1, color2) => {
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, color1);
            gradient.addColorStop(1, color2);
            return gradient;
        }
    };

    // Initialize when Chart.js is available
    function initializeChartManager() {
        if (typeof Chart !== 'undefined') {
            window.PrismaticCharts = new PrismaticChartManager();
            window.ChartUtils = ChartUtils;

            // Trigger ready event
            document.dispatchEvent(new CustomEvent('charts:ready'));
        } else {
            setTimeout(initializeChartManager, 100);
        }
    }

    // Auto-initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeChartManager);
    } else {
        initializeChartManager();
    }

})();
