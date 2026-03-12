/**
 * Prismatic Chart Manager with Real-Time MCP Integration
 *
 * Advanced visualization engine for the Prismatic Platform that integrates
 * Chart.js visualizations with live platform APIs and MCP JSON-RPC 2.0
 * protocol for real-time data streaming.
 *
 * Features:
 * - Live data integration with platform APIs
 * - WebSocket connections for real-time updates
 * - Server-Sent Events (SSE) streaming
 * - MCP JSON-RPC 2.0 protocol support
 * - Error handling and fallback mechanisms
 * - Performance optimization and caching
 * - Dark theme optimization for promo site
 *
 * @version 2.0.0
 * @author Prismatic Platform Team
 * @since 2026-03-09 (Phase 2 SUPREME ENHANCEMENT)
 */

class PrismaticChartManager {
    constructor(options = {}) {
        this.apiBaseUrl = options.apiBaseUrl || window.location.protocol + '//' + window.location.host + '/api/v1';
        this.websocketUrl = options.websocketUrl || 'ws://' + window.location.host + '/live';
        this.mcpEnabled = options.mcpEnabled !== false;
        this.cacheTimeout = options.cacheTimeout || 30000; // 30 seconds
        this.retryAttempts = options.retryAttempts || 3;
        this.retryDelay = options.retryDelay || 1000;

        // State management
        this.cache = new Map();
        this.websockets = new Map();
        this.eventSources = new Map();
        this.charts = new Map();
        this.updateCallbacks = new Map();
        this.reconnectAttempts = new Map();

        // Initialize MCP client if enabled
        if (this.mcpEnabled) {
            this.initializeMcpClient();
        }

        // Performance monitoring
        this.performanceMetrics = {
            apiCalls: 0,
            cacheHits: 0,
            failedRequests: 0,
            avgResponseTime: 0
        };

            apiBaseUrl: this.apiBaseUrl,
            mcpEnabled: this.mcpEnabled,
            features: ['Real-time updates', 'MCP integration', 'Performance optimization']
        });
    }

    /**
     * Initialize MCP JSON-RPC 2.0 Client
     * Establishes WebSocket connection for real-time MCP protocol communication
     */
    initializeMcpClient() {
        try {
            this.mcpClient = {
                requestId: 1,
                callbacks: new Map(),

                send: (method, params = {}) => {
                    const id = this.mcpClient.requestId++;
                    const request = {
                        jsonrpc: '2.0',
                        id: id,
                        method: method,
                        params: params
                    };

                    return new Promise((resolve, reject) => {
                        this.mcpClient.callbacks.set(id, { resolve, reject });

                        // Send via WebSocket if available, otherwise fallback to HTTP
                        if (this.websockets.has('mcp') && this.websockets.get('mcp').readyState === WebSocket.OPEN) {
                            this.websockets.get('mcp').send(JSON.stringify(request));
                        } else {
                            this.httpFallback(request).then(resolve).catch(reject);
                        }

                        // Timeout after 10 seconds
                        setTimeout(() => {
                            if (this.mcpClient.callbacks.has(id)) {
                                this.mcpClient.callbacks.delete(id);
                                reject(new Error('MCP request timeout'));
                            }
                        }, 10000);
                    });
                },

                handleResponse: (response) => {
                    if (response.id && this.mcpClient.callbacks.has(response.id)) {
                        const { resolve, reject } = this.mcpClient.callbacks.get(response.id);
                        this.mcpClient.callbacks.delete(response.id);

                        if (response.error) {
                            reject(new Error(response.error.message || 'MCP Error'));
                        } else {
                            resolve(response.result);
                        }
                    }
                }
            };

        } catch (error) {
        }
    }

    /**
     * HTTP fallback for MCP requests when WebSocket is unavailable
     */
    async httpFallback(request) {
        const response = await fetch(`${this.apiBaseUrl}/mcp/exec`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(request)
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        return result.result;
    }

    /**
     * Establish WebSocket connection for real-time updates
     */
    connectWebSocket(endpoint, onMessage, onError = null) {
        const wsUrl = `${this.websocketUrl}/${endpoint}`;

        try {
            const ws = new WebSocket(wsUrl);

            ws.onopen = () => {
                this.reconnectAttempts.set(endpoint, 0);
            };

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);

                    // Handle MCP responses
                    if (data.jsonrpc === '2.0' && this.mcpClient) {
                        this.mcpClient.handleResponse(data);
                        return;
                    }

                    // Handle regular data updates
                    onMessage(data);
                } catch (error) {
                }
            };

            ws.onerror = (error) => {
                if (onError) onError(error);
            };

            ws.onclose = () => {
                this.websockets.delete(endpoint);
                this.attemptReconnect(endpoint, onMessage, onError);
            };

            this.websockets.set(endpoint, ws);
            return ws;
        } catch (error) {
            if (onError) onError(error);
        }
    }

    /**
     * Attempt WebSocket reconnection with exponential backoff
     */
    attemptReconnect(endpoint, onMessage, onError) {
        const attempts = this.reconnectAttempts.get(endpoint) || 0;

        if (attempts >= 5) {
            return;
        }

        const delay = Math.pow(2, attempts) * 1000; // Exponential backoff
        this.reconnectAttempts.set(endpoint, attempts + 1);

        setTimeout(() => {
            this.connectWebSocket(endpoint, onMessage, onError);
        }, delay);
    }

    /**
     * Create Server-Sent Events connection for streaming data
     */
    connectServerSentEvents(endpoint, onMessage, onError = null) {
        try {
            const eventSource = new EventSource(`${this.apiBaseUrl}/${endpoint}`);

            eventSource.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    onMessage(data);
                } catch (error) {
                }
            };

            eventSource.onerror = (error) => {
                if (onError) onError(error);
            };

            this.eventSources.set(endpoint, eventSource);
            return eventSource;
        } catch (error) {
            if (onError) onError(error);
        }
    }

    /**
     * Enhanced API call with caching, retry logic, and performance monitoring
     */
    async apiCall(endpoint, options = {}) {
        const startTime = performance.now();
        const cacheKey = `${endpoint}_${JSON.stringify(options)}`;

        // Check cache first
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.cacheTimeout) {
                this.performanceMetrics.cacheHits++;
                return cached.data;
            }
            this.cache.delete(cacheKey);
        }

        // Perform API call with retry logic
        for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
            try {
                this.performanceMetrics.apiCalls++;

                const response = await fetch(`${this.apiBaseUrl}/${endpoint}`, {
                    method: options.method || 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        ...options.headers
                    },
                    body: options.body ? JSON.stringify(options.body) : undefined
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();

                // Cache successful response
                this.cache.set(cacheKey, {
                    data: data,
                    timestamp: Date.now()
                });

                // Update performance metrics
                const responseTime = performance.now() - startTime;
                this.performanceMetrics.avgResponseTime =
                    (this.performanceMetrics.avgResponseTime + responseTime) / 2;

                return data;
            } catch (error) {

                if (attempt === this.retryAttempts) {
                    this.performanceMetrics.failedRequests++;
                    throw error;
                }

                // Wait before retry
                await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt));
            }
        }
    }

    /**
     * Create mutation score chart with real data integration
     */
    async createMutationScoreChart(canvasId, options = {}) {
        try {
            const ctx = document.getElementById(canvasId);
            if (!ctx) {
                throw new Error(`Canvas element '${canvasId}' not found`);
            }


            // Fetch real mutation score data
            const mutationData = await this.apiCall('quality/mutations_real');

            const chartConfig = {
                type: options.chartType || 'bar',
                data: {
                    labels: mutationData.modules.map(m => m.name),
                    datasets: [{
                        label: 'Mutation Score %',
                        data: mutationData.modules.map(m => m.score),
                        backgroundColor: mutationData.modules.map(m => {
                            if (m.criticality === 'critical') return 'rgba(239, 68, 68, 0.6)';
                            if (m.criticality === 'core') return 'rgba(245, 158, 11, 0.6)';
                            return 'rgba(16, 185, 129, 0.6)';
                        }),
                        borderColor: mutationData.modules.map(m => {
                            if (m.criticality === 'critical') return 'rgba(239, 68, 68, 1)';
                            if (m.criticality === 'core') return 'rgba(245, 158, 11, 1)';
                            return 'rgba(16, 185, 129, 1)';
                        }),
                        borderWidth: 1,
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: this.getTooltipConfig(),
                        title: {
                            display: true,
                            text: `Live Mutation Scores - Platform Average: ${mutationData.platform_average}%`,
                            color: 'rgba(255, 255, 255, 0.9)',
                            font: { size: 14, weight: 'bold' }
                        }
                    },
                    scales: this.getScaleConfig()
                }
            };

            const chart = new Chart(ctx, chartConfig);
            this.charts.set(canvasId, chart);

            // Set up real-time updates if enabled
            if (options.realTime !== false) {
                this.setupRealTimeUpdates(canvasId, 'quality/mutations_stream', (data) => {
                    this.updateMutationChart(chart, data);
                });
            }

            return chart;
        } catch (error) {
            this.createFallbackChart(canvasId, 'Mutation Score Data Unavailable');
            throw error;
        }
    }

    /**
     * Create entity graph visualization with KuzuDB integration
     */
    async createEntityGraphChart(canvasId, options = {}) {
        try {
            const ctx = document.getElementById(canvasId);
            if (!ctx) {
                throw new Error(`Canvas element '${canvasId}' not found`);
            }


            // Fetch real entity graph data
            const graphData = await this.apiCall('dd/entities_graph_live');

            const chartConfig = {
                type: 'scatter',
                data: {
                    datasets: [
                        // Create edge datasets (relationship lines)
                        ...this.createEdgeDatasets(graphData.edges, graphData.nodes),

                        // Node datasets by type
                        {
                            label: 'People',
                            data: this.filterNodesByType(graphData.nodes, 'person'),
                            backgroundColor: 'rgba(239, 68, 68, 0.8)',
                            borderColor: 'rgba(239, 68, 68, 1)',
                            borderWidth: 2,
                            pointRadius: (context) => context.parsed.confidence * 15 + 5
                        },
                        {
                            label: 'Organizations',
                            data: this.filterNodesByType(graphData.nodes, 'organization'),
                            backgroundColor: 'rgba(59, 130, 246, 0.8)',
                            borderColor: 'rgba(59, 130, 246, 1)',
                            borderWidth: 2,
                            pointRadius: (context) => context.parsed.confidence * 15 + 5
                        },
                        {
                            label: 'Assets',
                            data: this.filterNodesByType(graphData.nodes, ['domain', 'ip', 'certificate']),
                            backgroundColor: 'rgba(16, 185, 129, 0.8)',
                            borderColor: 'rgba(16, 185, 129, 1)',
                            borderWidth: 2,
                            pointRadius: (context) => context.parsed.confidence * 10 + 3
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                color: 'rgba(255, 255, 255, 0.8)',
                                font: { size: 11 },
                                filter: (item) => !item.text.includes('Edge')
                            }
                        },
                        tooltip: {
                            ...this.getTooltipConfig(),
                            callbacks: {
                                title: (items) => items[0]?.raw?.label || 'Entity',
                                label: (context) => {
                                    if (context.raw.label) {
                                        return [
                                            `Type: ${context.dataset.label.slice(0, -1)}`,
                                            `Confidence: ${(context.raw.confidence * 100).toFixed(1)}%`,
                                            `Sources: ${context.raw.sources?.length || 0}`
                                        ];
                                    }
                                    return '';
                                }
                            }
                        },
                        title: {
                            display: true,
                            text: `Live Entity Graph - ${graphData.stats.total_entities} entities, ${graphData.stats.total_relationships} relationships`,
                            color: 'rgba(255, 255, 255, 0.9)',
                            font: { size: 14, weight: 'bold' }
                        }
                    },
                    interaction: {
                        intersect: false
                    }
                }
            };

            const chart = new Chart(ctx, chartConfig);
            this.charts.set(canvasId, chart);

            // Set up real-time updates
            if (options.realTime !== false) {
                this.setupRealTimeUpdates(canvasId, 'dd/graph_stream', (data) => {
                    this.updateEntityGraph(chart, data);
                });
            }

            return chart;
        } catch (error) {
            this.createFallbackChart(canvasId, 'Entity Graph Data Unavailable');
            throw error;
        }
    }

    /**
     * Create performance metrics chart with telemetry integration
     */
    async createPerformanceChart(canvasId, options = {}) {
        try {
            const ctx = document.getElementById(canvasId);
            if (!ctx) {
                throw new Error(`Canvas element '${canvasId}' not found`);
            }


            // Fetch real performance data
            const perfData = await this.apiCall('telemetry/performance_live');

            const chartConfig = {
                type: options.chartType || 'line',
                data: {
                    labels: perfData.timeline.map(t => new Date(t.timestamp).toLocaleTimeString()),
                    datasets: [
                        {
                            label: 'Page Load Time (ms)',
                            data: perfData.timeline.map(t => t.page_load_time),
                            borderColor: 'rgba(59, 130, 246, 1)',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            borderWidth: 2,
                            fill: true,
                            tension: 0.3
                        },
                        {
                            label: 'Server Response (ms)',
                            data: perfData.timeline.map(t => t.server_response_time),
                            borderColor: 'rgba(16, 185, 129, 1)',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            borderWidth: 2,
                            fill: true,
                            tension: 0.3
                        },
                        {
                            label: 'LiveView Mount (ms)',
                            data: perfData.timeline.map(t => t.liveview_mount_time),
                            borderColor: 'rgba(245, 158, 11, 1)',
                            backgroundColor: 'rgba(245, 158, 11, 0.1)',
                            borderWidth: 2,
                            fill: true,
                            tension: 0.3
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                color: 'rgba(255, 255, 255, 0.8)',
                                font: { size: 11 }
                            }
                        },
                        tooltip: this.getTooltipConfig(),
                        title: {
                            display: true,
                            text: `Live Performance Metrics - P95: ${perfData.p95.toFixed(1)}ms`,
                            color: 'rgba(255, 255, 255, 0.9)',
                            font: { size: 14, weight: 'bold' }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: 'rgba(255, 255, 255, 0.05)' },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.7)',
                                font: { size: 10 },
                                callback: (value) => value + 'ms'
                            }
                        },
                        x: {
                            grid: { display: false },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.7)',
                                font: { size: 10 },
                                maxRotation: 45
                            }
                        }
                    }
                }
            };

            const chart = new Chart(ctx, chartConfig);
            this.charts.set(canvasId, chart);

            // Set up real-time updates with SSE
            if (options.realTime !== false) {
                this.connectServerSentEvents('telemetry/metrics_stream', (data) => {
                    this.updatePerformanceChart(chart, data);
                });
            }

            return chart;
        } catch (error) {
            this.createFallbackChart(canvasId, 'Performance Data Unavailable');
            throw error;
        }
    }

    /**
     * Create fitness score dashboard with evolution integration
     */
    async createFitnessChart(canvasId, options = {}) {
        try {
            const ctx = document.getElementById(canvasId);
            if (!ctx) {
                throw new Error(`Canvas element '${canvasId}' not found`);
            }


            // Fetch real fitness data
            const fitnessData = await this.apiCall('evolution/fitness_current');

            const chartType = options.chartType || 'gauge';
            let chartConfig;

            if (chartType === 'gauge') {
                chartConfig = this.createGaugeConfig(fitnessData);
            } else if (chartType === 'trends') {
                chartConfig = await this.createTrendsConfig(fitnessData);
            } else {
                chartConfig = this.createComponentsConfig(fitnessData);
            }

            const chart = new Chart(ctx, chartConfig);
            this.charts.set(canvasId, chart);

            // Set up real-time updates
            if (options.realTime !== false) {
                this.setupRealTimeUpdates(canvasId, 'evolution/fitness_stream', (data) => {
                    this.updateFitnessChart(chart, data, chartType);
                });
            }

            return chart;
        } catch (error) {
            this.createFallbackChart(canvasId, 'Fitness Data Unavailable');
            throw error;
        }
    }

    /**
     * Create gauge configuration for fitness score
     */
    createGaugeConfig(fitnessData) {
        const score = fitnessData.current_fitness * 100;

        return {
            type: 'doughnut',
            data: {
                labels: ['Current Score', 'Remaining to Perfect'],
                datasets: [{
                    data: [score, 100 - score],
                    backgroundColor: [
                        score >= 99 ? 'rgba(16, 185, 129, 0.8)' :
                        score >= 95 ? 'rgba(59, 130, 246, 0.8)' :
                        score >= 90 ? 'rgba(245, 158, 11, 0.8)' :
                        'rgba(239, 68, 68, 0.8)',
                        'rgba(75, 85, 99, 0.3)'
                    ],
                    borderColor: [
                        score >= 99 ? 'rgba(16, 185, 129, 1)' :
                        score >= 95 ? 'rgba(59, 130, 246, 1)' :
                        score >= 90 ? 'rgba(245, 158, 11, 1)' :
                        'rgba(239, 68, 68, 1)',
                        'rgba(75, 85, 99, 0.5)'
                    ],
                    borderWidth: 2,
                    cutout: '75%',
                    circumference: 270,
                    rotation: 135
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        ...this.getTooltipConfig(),
                        callbacks: {
                            label: (context) => {
                                if (context.dataIndex === 0) {
                                    return `Fitness: ${(context.parsed / 100).toFixed(4)}`;
                                }
                                return '';
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: `Live Fitness Score: ${fitnessData.current_fitness.toFixed(4)} (${fitnessData.classification.toUpperCase()})`,
                        color: 'rgba(255, 255, 255, 0.9)',
                        font: { size: 14, weight: 'bold' }
                    }
                },
                elements: {
                    arc: {
                        borderRadius: 8
                    }
                }
            }
        };
    }

    /**
     * Set up real-time updates for charts
     */
    setupRealTimeUpdates(chartId, endpoint, updateCallback) {
        // Try WebSocket first, fallback to SSE
        const onMessage = (data) => {
            try {
                updateCallback(data);
            } catch (error) {
            }
        };

        const onError = () => {
            // Fallback to SSE if WebSocket fails
            this.connectServerSentEvents(endpoint, onMessage);
        };

        this.connectWebSocket(endpoint, onMessage, onError);

        // Store update callback for manual refresh
        this.updateCallbacks.set(chartId, updateCallback);
    }

    /**
     * Update mutation score chart with new data
     */
    updateMutationChart(chart, newData) {
        chart.data.labels = newData.modules.map(m => m.name);
        chart.data.datasets[0].data = newData.modules.map(m => m.score);
        chart.options.plugins.title.text = `Live Mutation Scores - Platform Average: ${newData.platform_average}%`;
        chart.update('none'); // No animation for real-time updates
    }

    /**
     * Update entity graph with new nodes/edges
     */
    updateEntityGraph(chart, newData) {
        // Update only if significant changes to avoid flickering
        if (this.shouldUpdateGraph(chart.data, newData)) {
            chart.data = this.buildGraphDatasets(newData);
            chart.update('none');
        }
    }

    /**
     * Update performance chart with streaming data
     */
    updatePerformanceChart(chart, newData) {
        // Add new data point and remove old ones (sliding window)
        const maxPoints = 50;

        chart.data.labels.push(new Date(newData.timestamp).toLocaleTimeString());
        if (chart.data.labels.length > maxPoints) {
            chart.data.labels.shift();
        }

        chart.data.datasets.forEach((dataset, index) => {
            const metricKey = ['page_load_time', 'server_response_time', 'liveview_mount_time'][index];
            dataset.data.push(newData[metricKey]);
            if (dataset.data.length > maxPoints) {
                dataset.data.shift();
            }
        });

        chart.update('none');
    }

    /**
     * Update fitness chart based on type
     */
    updateFitnessChart(chart, newData, chartType) {
        if (chartType === 'gauge') {
            const score = newData.current_fitness * 100;
            chart.data.datasets[0].data = [score, 100 - score];
            chart.options.plugins.title.text = `Live Fitness Score: ${newData.current_fitness.toFixed(4)} (${newData.classification.toUpperCase()})`;
        } else if (chartType === 'components') {
            chart.data.datasets[0].data = Object.values(newData.component_breakdown).map(c => c.score * 100);
        }
        chart.update('none');
    }

    /**
     * Create fallback chart for when data is unavailable
     */
    createFallbackChart(canvasId, message) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['No Data'],
                datasets: [{
                    label: message,
                    data: [0],
                    backgroundColor: 'rgba(239, 68, 68, 0.3)',
                    borderColor: 'rgba(239, 68, 68, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: message,
                        color: 'rgba(239, 68, 68, 1)',
                        font: { size: 14 }
                    }
                },
                scales: this.getScaleConfig()
            }
        });

        this.charts.set(canvasId, chart);
    }

    /**
     * Get standardized tooltip configuration for dark theme
     */
    getTooltipConfig() {
        return {
            backgroundColor: 'rgba(17, 24, 39, 0.95)',
            titleColor: 'rgba(255, 255, 255, 1)',
            bodyColor: 'rgba(255, 255, 255, 0.8)',
            borderColor: 'rgba(75, 85, 99, 1)',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            mode: 'index',
            intersect: false
        };
    }

    /**
     * Get standardized scale configuration for dark theme
     */
    getScaleConfig() {
        return {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                    drawBorder: false
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    font: { size: 11 }
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    font: { size: 11 },
                    maxRotation: 45
                }
            }
        };
    }

    /**
     * Create edge datasets for graph visualization
     */
    createEdgeDatasets(edges, nodes) {
        return edges.map((edge, i) => {
            const fromNode = nodes.find(n => n.id === edge.from_id);
            const toNode = nodes.find(n => n.id === edge.to_id);

            if (!fromNode || !toNode) return null;

            return {
                label: `Edge ${i}`,
                type: 'line',
                data: [
                    { x: fromNode.x, y: fromNode.y },
                    { x: toNode.x, y: toNode.y }
                ],
                borderColor: `rgba(156, 163, 175, ${edge.confidence || 0.7})`,
                backgroundColor: 'transparent',
                borderWidth: Math.max(1, (edge.confidence || 0.5) * 3),
                pointRadius: 0,
                showLine: true,
                tension: 0
            };
        }).filter(Boolean);
    }

    /**
     * Filter nodes by type for graph visualization
     */
    filterNodesByType(nodes, types) {
        const typeArray = Array.isArray(types) ? types : [types];
        return nodes
            .filter(n => typeArray.includes(n.type))
            .map(n => ({
                x: n.x,
                y: n.y,
                label: n.name || n.label,
                confidence: n.confidence || 0.8,
                sources: n.sources || [],
                id: n.id
            }));
    }

    /**
     * Check if graph should be updated (avoid unnecessary redraws)
     */
    shouldUpdateGraph(currentData, newData) {
        const currentNodeCount = currentData.datasets.reduce((sum, ds) => sum + ds.data.length, 0);
        const newNodeCount = newData.nodes.length;
        return Math.abs(currentNodeCount - newNodeCount) > 2; // Update if significant change
    }

    /**
     * Refresh all charts manually
     */
    async refreshAllCharts() {

        for (const [chartId, updateCallback] of this.updateCallbacks) {
            try {
                // Clear cache for this chart's data
                const keys = Array.from(this.cache.keys()).filter(k => k.includes(chartId));
                keys.forEach(k => this.cache.delete(k));

                // Fetch fresh data and update
                await updateCallback();
            } catch (error) {
            }
        }
    }

    /**
     * Get performance metrics
     */
    getMetrics() {
        return {
            ...this.performanceMetrics,
            activeWebSockets: this.websockets.size,
            activeSSE: this.eventSources.size,
            activeCharts: this.charts.size,
            cacheSize: this.cache.size,
            cacheHitRatio: this.performanceMetrics.cacheHits / Math.max(this.performanceMetrics.apiCalls, 1)
        };
    }

    /**
     * Cleanup resources
     */
    destroy() {

        // Close WebSockets
        this.websockets.forEach(ws => ws.close());
        this.websockets.clear();

        // Close SSE connections
        this.eventSources.forEach(es => es.close());
        this.eventSources.clear();

        // Destroy charts
        this.charts.forEach(chart => chart.destroy());
        this.charts.clear();

        // Clear caches
        this.cache.clear();
        this.updateCallbacks.clear();
        this.reconnectAttempts.clear();

    }
}

// Export for use in glossary pages
window.PrismaticChartManager = PrismaticChartManager;

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.prismaticCharts = new PrismaticChartManager();
    });
} else {
    window.prismaticCharts = new PrismaticChartManager();
}

