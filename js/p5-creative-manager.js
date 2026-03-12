// Prismatic Platform p5.js Creative Coding Manager
// L2-Learning Layer: p5.js Integration with MCP + Flowbite LLM Best Practices
// Version: 1.0.0 | 3NL Architecture Compliant
(function() {
    'use strict';

    // p5.js Configuration for Flowbite Dark Theme
    const P5_DEFAULTS = {
        renderer: 'P2D', // or 'WEBGL' for 3D
        background: '#111827', // gray-900
        strokeColor: '#6366f1', // indigo-500
        fillColor: '#8b5cf6', // violet-500
        textColor: '#f9fafb', // gray-50
        frameRate: 60,
        responsive: true
    };

    // Creative Color Palettes (Flowbite Compatible)
    const CREATIVE_PALETTES = {
        prismatic: ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981'],
        neon: ['#ff0080', '#00ffff', '#ffff00', '#ff8000', '#8000ff'],
        ocean: ['#0066cc', '#0099ff', '#00ccff', '#66ddff', '#99eeff'],
        fire: ['#ff4444', '#ff6600', '#ff9900', '#ffcc00', '#ffff44'],
        nature: ['#228b22', '#32cd32', '#66bb6a', '#81c784', '#a5d6a7']
    };

    // MCP Data Source Integration for Creative Coding
    class MCPCreativeSource {
        constructor() {
            this.cache = new Map();
            this.refreshInterval = 5000; // 5 seconds for dynamic visuals
        }

        async fetchCreativeData(endpoint, params = {}) {
            const cacheKey = `${endpoint}_${JSON.stringify(params)}`;

            // Check cache first
            if (this.cache.has(cacheKey)) {
                const cached = this.cache.get(cacheKey);
                if (Date.now() - cached.timestamp < this.refreshInterval) {
                    return cached.data;
                }
            }

            try {
                // Use PrismaticMCP client for real-time data
                const response = await window.PrismaticMCP.request('creative.data', {
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
            // Procedural/algorithmic fallback data for creative coding
            const fallbacks = {
                'platform.heartbeat': this.generateHeartbeatData(),
                'network.topology': this.generateNetworkData(),
                'agent.activity': this.generateAgentActivityData(),
                'quality.waves': this.generateQualityWaveData(),
                'performance.particles': this.generatePerformanceParticles(),
                // Algorithm visualization specific data
                'actor.message_flow': this.generateActorMessageFlow(),
                'supervision.tree_structure': this.generateSupervisionTree(),
                'supervision.one_for_one': this.generateSupervisionStrategy('one_for_one'),
                'supervision.one_for_all': this.generateSupervisionStrategy('one_for_all'),
                'supervision.rest_for_one': this.generateSupervisionStrategy('rest_for_one'),
                'supervision.lifecycle': this.generateProcessLifecycle(),
                'epistemic.pipeline_flow': this.generateEpistemicPipeline(),
                'epistemic.signal_processing': this.generateEpistemicStage('signal'),
                'epistemic.correlation_patterns': this.generateEpistemicStage('correlation'),
                'epistemic.knowledge_integration': this.generateEpistemicStage('knowledge'),
                'epistemic.meta_consciousness': this.generateEpistemicStage('meta')
            };
            return fallbacks[endpoint] || fallbacks['platform.heartbeat'];
        }

        generateHeartbeatData() {
            const time = Date.now() / 1000;
            return {
                frequency: 1.2,
                amplitude: 50,
                phase: time * 0.001,
                noise: Array.from({length: 100}, (_, i) =>
                    Math.sin(time * 0.01 + i * 0.1) * 10 + Math.random() * 5
                )
            };
        }

        generateNetworkData() {
            return {
                nodes: Array.from({length: 50}, (_, i) => ({
                    id: i,
                    x: Math.random() * 800,
                    y: Math.random() * 600,
                    size: Math.random() * 20 + 5,
                    type: ['agent', 'app', 'command'][Math.floor(Math.random() * 3)],
                    connections: Math.floor(Math.random() * 5)
                })),
                edges: Array.from({length: 80}, (_, i) => ({
                    from: Math.floor(Math.random() * 50),
                    to: Math.floor(Math.random() * 50),
                    weight: Math.random()
                }))
            };
        }

        generateAgentActivityData() {
            return Array.from({length: 535}, (_, i) => ({
                id: `agent_${i}`,
                activity: Math.random(),
                x: Math.random() * 800,
                y: Math.random() * 600,
                velocity: {
                    x: (Math.random() - 0.5) * 2,
                    y: (Math.random() - 0.5) * 2
                },
                domain: ['osint', 'quality', 'security', 'development'][Math.floor(Math.random() * 4)]
            }));
        }

        generateQualityWaveData() {
            const time = Date.now() / 1000;
            return {
                waves: Array.from({length: 5}, (_, i) => ({
                    frequency: 0.02 + i * 0.01,
                    amplitude: 30 + i * 10,
                    phase: time * (0.001 + i * 0.0005),
                    color: CREATIVE_PALETTES.prismatic[i]
                }))
            };
        }

        generatePerformanceParticles() {
            return Array.from({length: 200}, (_, i) => ({
                x: Math.random() * 800,
                y: Math.random() * 600,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: Math.random() * 100,
                size: Math.random() * 8 + 2,
                performance: Math.random() * 100
            }));
        }

        generateActorMessageFlow() {
            const actors = Array.from({length: 8}, (_, i) => ({
                id: `actor_${i}`,
                x: 150 + (i % 4) * 150,
                y: 100 + Math.floor(i / 4) * 200,
                mailbox: Array.from({length: Math.floor(Math.random() * 5)}, (_, j) => ({
                    id: `msg_${i}_${j}`,
                    from: Math.floor(Math.random() * 8),
                    timestamp: Date.now() - j * 1000
                })),
                state: ['idle', 'processing', 'sending', 'creating'][Math.floor(Math.random() * 4)],
                type: ['GenServer', 'Agent', 'Supervisor'][Math.floor(Math.random() * 3)]
            }));

            const messages = Array.from({length: 12}, (_, i) => ({
                id: `flying_msg_${i}`,
                from: Math.floor(Math.random() * 8),
                to: Math.floor(Math.random() * 8),
                progress: Math.random(),
                type: ['cast', 'call', 'info'][Math.floor(Math.random() * 3)]
            }));

            return { actors, messages, time: Date.now() };
        }

        generateSupervisionTree() {
            return {
                root: {
                    id: 'app_supervisor',
                    x: 400, y: 50,
                    type: 'supervisor',
                    strategy: 'one_for_one',
                    children: ['worker_sup_1', 'worker_sup_2', 'dynamic_sup']
                },
                nodes: {
                    'worker_sup_1': { id: 'worker_sup_1', x: 200, y: 150, type: 'supervisor', strategy: 'one_for_all', children: ['worker_1', 'worker_2'] },
                    'worker_sup_2': { id: 'worker_sup_2', x: 400, y: 150, type: 'supervisor', strategy: 'rest_for_one', children: ['worker_3', 'worker_4', 'worker_5'] },
                    'dynamic_sup': { id: 'dynamic_sup', x: 600, y: 150, type: 'dynamic_supervisor', strategy: 'one_for_one', children: ['dynamic_1', 'dynamic_2'] },
                    'worker_1': { id: 'worker_1', x: 120, y: 250, type: 'worker', state: 'running' },
                    'worker_2': { id: 'worker_2', x: 280, y: 250, type: 'worker', state: 'crashed' },
                    'worker_3': { id: 'worker_3', x: 320, y: 250, type: 'worker', state: 'running' },
                    'worker_4': { id: 'worker_4', x: 400, y: 250, type: 'worker', state: 'restarting' },
                    'worker_5': { id: 'worker_5', x: 480, y: 250, type: 'worker', state: 'terminated' },
                    'dynamic_1': { id: 'dynamic_1', x: 550, y: 250, type: 'worker', state: 'running' },
                    'dynamic_2': { id: 'dynamic_2', x: 650, y: 250, type: 'worker', state: 'running' }
                }
            };
        }

        generateSupervisionStrategy(strategy) {
            const baseNodes = [
                { id: 'supervisor', x: 400, y: 100, type: 'supervisor', strategy: strategy },
                { id: 'child_1', x: 250, y: 200, type: 'worker', state: 'running' },
                { id: 'child_2', x: 400, y: 200, type: 'worker', state: 'crashed' },
                { id: 'child_3', x: 550, y: 200, type: 'worker', state: 'running' }
            ];

            const demonstration = {
                one_for_one: { affected: ['child_2'], restarted: ['child_2'] },
                one_for_all: { affected: ['child_2'], restarted: ['child_1', 'child_2', 'child_3'] },
                rest_for_one: { affected: ['child_2'], restarted: ['child_2', 'child_3'] }
            };

            return {
                nodes: baseNodes,
                strategy: strategy,
                demonstration: demonstration[strategy],
                animation_phase: Math.floor(Date.now() / 2000) % 4 // 4 phases: normal, crash, restart, recovered
            };
        }

        generateProcessLifecycle() {
            const phases = ['init', 'running', 'handling_message', 'crashed', 'restarting', 'terminated'];
            const currentPhase = phases[Math.floor(Date.now() / 3000) % phases.length];

            return {
                process_id: 'example_worker',
                current_phase: currentPhase,
                phases: phases.map((phase, i) => ({
                    name: phase,
                    active: phase === currentPhase,
                    x: 100 + i * 100,
                    y: 200,
                    duration: [1000, 5000, 200, 100, 800, 0][i]
                })),
                mailbox_size: Math.floor(Math.random() * 10),
                memory_usage: Math.random() * 100,
                message_count: Math.floor(Math.random() * 1000)
            };
        }

        generateEpistemicPipeline() {
            const levels = [
                'L0: Raw Signals', 'L1: Signal Extraction', 'L2: Validation', 'L3: Attribution',
                'L4: Correlation', 'L5: Patterns', 'L6: Contradictions', 'L7: Confidence',
                'L8: Hypotheses', 'L9: Evidence', 'L10: Integration', 'L11: Decisions',
                'L12: Actions', 'L13: Knowledge', 'Meta: Assessment', 'Consciousness'
            ];

            const signals = Array.from({length: 20}, (_, i) => ({
                id: `signal_${i}`,
                current_level: Math.floor(Math.random() * 16),
                confidence: Math.random(),
                x: 50 + Math.random() * 700,
                y: 50 + Math.random() * 500,
                type: ['osint', 'agent', 'sensor', 'human'][Math.floor(Math.random() * 4)],
                contradictions: Math.random() < 0.2,
                validated: Math.random() < 0.8
            }));

            return {
                levels: levels.map((name, i) => ({
                    name: name,
                    level: i,
                    x: 50 + (i % 4) * 180,
                    y: 60 + Math.floor(i / 4) * 80,
                    throughput: Math.random() * 100,
                    active_signals: signals.filter(s => s.current_level === i).length
                })),
                signals: signals,
                trinity_gates: [7, 10, 13].map(level => ({
                    level: level,
                    active: Math.random() < 0.3,
                    passed: Math.random() * 100,
                    failed: Math.random() * 20
                }))
            };
        }

        generateEpistemicStage(stage) {
            const stageData = {
                signal: {
                    title: 'Signal Processing (L0-L3)',
                    elements: Array.from({length: 30}, (_, i) => ({
                        id: i,
                        x: Math.random() * 800,
                        y: Math.random() * 300,
                        type: ['raw', 'extracted', 'validated', 'attributed'][Math.floor(Math.random() * 4)],
                        strength: Math.random()
                    }))
                },
                correlation: {
                    title: 'Correlation & Patterns (L4-L7)',
                    elements: Array.from({length: 15}, (_, i) => ({
                        id: i,
                        x: 100 + i * 40,
                        y: 150 + Math.sin(i * 0.5) * 100,
                        connections: Math.floor(Math.random() * 5),
                        pattern_strength: Math.random()
                    }))
                },
                knowledge: {
                    title: 'Knowledge Integration (L8-L11)',
                    elements: Array.from({length: 8}, (_, i) => ({
                        id: i,
                        x: 200 + (i % 3) * 200,
                        y: 100 + Math.floor(i / 3) * 150,
                        confidence: Math.random(),
                        integrated: Math.random() < 0.7,
                        belief_strength: Math.random()
                    }))
                },
                meta: {
                    title: 'Meta-Consciousness (L12-Meta)',
                    elements: [{
                        id: 'consciousness',
                        x: 400,
                        y: 200,
                        awareness_level: Math.random(),
                        traits: Array.from({length: 11}, (_, i) => Math.random()),
                        fitness: 0.998
                    }]
                }
            };

            return stageData[stage] || stageData.signal;
        }
    }

    // p5.js Creative Sketch Manager
    class PrismaticCreativeManager {
        constructor() {
            this.dataSource = new MCPCreativeSource();
            this.sketches = new Map();
            this.autoRefresh = true;
            this.refreshInterval = 5000;
            this.init();
        }

        init() {
            // Auto-discover p5 containers
            this.discoverSketches();

            // Setup auto-refresh for dynamic data
            if (this.autoRefresh) {
                setInterval(() => this.refreshAllSketches(), this.refreshInterval);
            }

            // Listen for MCP events
            if (window.PrismaticMCP) {
                window.PrismaticMCP.stream('creative.update', (event) => {
                    this.handleCreativeUpdate(event);
                });
            }
        }

        discoverSketches() {
            document.querySelectorAll('[data-p5-sketch]').forEach(element => {
                this.createSketch(element);
            });
        }

        async createSketch(element) {
            const sketchType = element.dataset.p5Sketch;
            const dataSource = element.dataset.p5Data || 'platform.heartbeat';
            const options = element.dataset.p5Options;
            const sketchId = element.dataset.p5Id || `sketch_${Date.now()}`;

            try {
                // Fetch initial data
                const data = await this.dataSource.fetchCreativeData(dataSource);
                const config = this.parseOptions(options);

                // Create p5 sketch
                const sketch = this.createP5Sketch(sketchType, data, config);

                // Mount to element
                const p5Instance = new p5(sketch, element);

                this.sketches.set(sketchId, {
                    p5: p5Instance,
                    element: element,
                    dataSource: dataSource,
                    sketchType: sketchType,
                    config: config,
                    lastUpdate: Date.now()
                });

                // Trigger success event
                element.dispatchEvent(new CustomEvent('p5:created', {
                    detail: { sketchId: sketchId, p5: p5Instance }
                }));

            } catch (error) {
                this.renderError(element, error);
            }
        }

        createP5Sketch(type, data, config) {
            const sketches = {
                heartbeat: this.createHeartbeatSketch(data, config),
                network: this.createNetworkSketch(data, config),
                particles: this.createParticlesSketch(data, config),
                waves: this.createWavesSketch(data, config),
                agents: this.createAgentsSketch(data, config),
                generative: this.createGenerativeSketch(data, config)
            };

            return sketches[type] || sketches.heartbeat;
        }

        createHeartbeatSketch(data, config) {
            let time = 0;

            return (p) => {
                p.setup = () => {
                    const width = config.width || p._userNode.offsetWidth;
                    const height = config.height || 200;
                    p.createCanvas(width, height);
                    p.background(P5_DEFAULTS.background);
                };

                p.draw = () => {
                    p.background(P5_DEFAULTS.background);
                    p.stroke(P5_DEFAULTS.strokeColor);
                    p.strokeWeight(2);
                    p.noFill();

                    // Draw heartbeat line
                    p.beginShape();
                    for (let i = 0; i < p.width; i++) {
                        const x = i;
                        const baseY = p.height / 2;
                        const heartbeat = Math.sin(time * 0.02 + i * 0.01) * 30;
                        const noise = (data.noise && data.noise[i % data.noise.length]) || 0;
                        const y = baseY + heartbeat + noise;
                        p.vertex(x, y);
                    }
                    p.endShape();

                    time += 1;
                };

                p.windowResized = () => {
                    const width = p._userNode.offsetWidth;
                    p.resizeCanvas(width, 200);
                };
            };
        }

        createNetworkSketch(data, config) {
            // Enhanced for supervision tree visualization
            let pulseAnimation = 0;

            return (p) => {
                p.setup = () => {
                    const width = config.width || p._userNode.offsetWidth;
                    const height = config.height || 400;
                    p.createCanvas(width, height);
                    p.textAlign(p.CENTER, p.CENTER);
                    p.textSize(9);
                };

                p.draw = () => {
                    p.background(P5_DEFAULTS.background);

                    if (data.root) {
                        // Supervision tree visualization
                        const scaleX = p.width / 800;
                        const scaleY = p.height / 350;

                        // Draw edges first (supervision relationships)
                        p.stroke('#4b5563'); // gray-600
                        p.strokeWeight(2);

                        const drawSupervisionLinks = (node) => {
                            if (node.children) {
                                node.children.forEach(childId => {
                                    const child = data.nodes[childId];
                                    if (child) {
                                        p.line(
                                            node.x * scaleX, node.y * scaleY,
                                            child.x * scaleX, child.y * scaleY
                                        );
                                        drawSupervisionLinks(child);
                                    }
                                });
                            }
                        };

                        drawSupervisionLinks(data.root);

                        // Draw nodes with process state
                        const drawNode = (node) => {
                            const x = node.x * scaleX;
                            const y = node.y * scaleY;

                            // Node styling based on type and state
                            if (node.type === 'supervisor' || node.type === 'dynamic_supervisor') {
                                // Supervisor nodes (hexagons)
                                p.fill('#6366f1'); // indigo for supervisors
                                p.stroke('#4f46e5');
                                p.strokeWeight(2);

                                // Draw hexagon
                                p.beginShape();
                                for (let i = 0; i < 6; i++) {
                                    const angle = i * p.TWO_PI / 6;
                                    const radius = 20;
                                    p.vertex(x + radius * p.cos(angle), y + radius * p.sin(angle));
                                }
                                p.endShape(p.CLOSE);

                                // Strategy label
                                p.fill('#ffffff');
                                p.textSize(8);
                                p.text(node.strategy, x, y + 5);
                            } else {
                                // Worker nodes (circles with state-based coloring)
                                const stateColors = {
                                    running: '#10b981',    // emerald
                                    crashed: '#ef4444',    // red
                                    restarting: '#f59e0b', // amber
                                    terminated: '#6b7280'  // gray
                                };

                                p.fill(stateColors[node.state] || stateColors.running);
                                p.stroke('#374151');
                                p.strokeWeight(2);

                                // Pulse effect for restarting processes
                                const radius = node.state === 'restarting' ?
                                    15 + Math.sin(pulseAnimation * 0.2) * 3 : 15;

                                p.circle(x, y, radius * 2);

                                // State indicator
                                p.fill('#ffffff');
                                p.textSize(7);
                                p.text(node.state, x, y + 25);
                            }

                            // Node ID label
                            p.fill('#d1d5db'); // gray-300
                            p.textSize(8);
                            p.text(node.id, x, y - 30);

                            if (node.children) {
                                node.children.forEach(childId => {
                                    const child = data.nodes[childId];
                                    if (child) drawNode(child);
                                });
                            }
                        };

                        drawNode(data.root);

                    } else if (data.nodes && Array.isArray(data.nodes)) {
                        // Strategy demonstration visualization
                        data.nodes.forEach(node => {
                            const x = node.x * (p.width / 800);
                            const y = node.y * (p.height / 400);

                            if (node.type === 'supervisor') {
                                p.fill('#6366f1');
                                p.stroke('#4f46e5');
                                p.strokeWeight(2);

                                p.beginShape();
                                for (let i = 0; i < 6; i++) {
                                    const angle = i * p.TWO_PI / 6;
                                    const radius = 25;
                                    p.vertex(x + radius * p.cos(angle), y + radius * p.sin(angle));
                                }
                                p.endShape(p.CLOSE);

                                p.fill('#ffffff');
                                p.textSize(8);
                                p.text(data.strategy, x, y + 5);
                            } else {
                                const stateColors = {
                                    running: '#10b981',
                                    crashed: '#ef4444',
                                    restarting: '#f59e0b'
                                };

                                // Highlight affected processes during demonstration
                                const isAffected = data.demonstration &&
                                    data.demonstration.restarted.includes(node.id);

                                p.fill(stateColors[node.state] || stateColors.running);
                                p.stroke(isAffected ? '#ffffff' : '#374151');
                                p.strokeWeight(isAffected ? 3 : 1);

                                const radius = isAffected && data.animation_phase === 2 ?
                                    20 + Math.sin(pulseAnimation * 0.3) * 5 : 20;

                                p.circle(x, y, radius);

                                p.fill('#ffffff');
                                p.textSize(7);
                                p.text(node.state, x, y + 30);
                            }

                            // Draw supervision links
                            if (node.type === 'supervisor') {
                                data.nodes.filter(n => n.type === 'worker').forEach(worker => {
                                    p.stroke('#4b5563');
                                    p.strokeWeight(1);
                                    p.line(x, y, worker.x * (p.width / 800), worker.y * (p.height / 400));
                                });
                            }
                        });

                    } else if (data.edges && data.nodes) {
                        // Generic network visualization (fallback)
                        p.stroke(P5_DEFAULTS.strokeColor);
                        p.strokeWeight(1);
                        data.edges.forEach(edge => {
                            const fromNode = data.nodes[edge.from];
                            const toNode = data.nodes[edge.to];
                            if (fromNode && toNode) {
                                p.line(fromNode.x, fromNode.y, toNode.x, toNode.y);
                            }
                        });

                        data.nodes.forEach(node => {
                            const colors = CREATIVE_PALETTES.prismatic;
                            const colorIndex = ['agent', 'app', 'command'].indexOf(node.type);
                            p.fill(colors[colorIndex] || colors[0]);
                            p.noStroke();
                            p.circle(node.x * (p.width / 800), node.y * (p.height / 600), node.size);
                        });
                    }

                    pulseAnimation += 1;
                };

                p.windowResized = () => {
                    const width = p._userNode.offsetWidth;
                    p.resizeCanvas(width, 400);
                };
            };
        }

        createParticlesSketch(data, config) {
            return (p) => {
                let particles = [];

                p.setup = () => {
                    const width = config.width || p._userNode.offsetWidth;
                    const height = config.height || 300;
                    p.createCanvas(width, height);

                    // Initialize particles from data
                    if (data.length) {
                        particles = data.map(d => ({
                            x: d.x * (p.width / 800),
                            y: d.y * (p.height / 600),
                            vx: d.vx,
                            vy: d.vy,
                            life: d.life,
                            size: d.size,
                            performance: d.performance
                        }));
                    }
                };

                p.draw = () => {
                    p.background(P5_DEFAULTS.background);

                    particles.forEach((particle, i) => {
                        // Update position
                        particle.x += particle.vx;
                        particle.y += particle.vy;

                        // Wrap around edges
                        if (particle.x > p.width) particle.x = 0;
                        if (particle.x < 0) particle.x = p.width;
                        if (particle.y > p.height) particle.y = 0;
                        if (particle.y < 0) particle.y = p.height;

                        // Performance-based coloring
                        const alpha = p.map(particle.performance, 0, 100, 50, 255);
                        const colorIndex = Math.floor(particle.performance / 20);
                        const color = CREATIVE_PALETTES.prismatic[colorIndex] || CREATIVE_PALETTES.prismatic[0];

                        p.fill(p.color(color + p.hex(alpha, 2)));
                        p.noStroke();
                        p.circle(particle.x, particle.y, particle.size);
                    });
                };

                p.windowResized = () => {
                    const width = p._userNode.offsetWidth;
                    p.resizeCanvas(width, 300);
                };
            };
        }

        createWavesSketch(data, config) {
            let time = 0;

            return (p) => {
                p.setup = () => {
                    const width = config.width || p._userNode.offsetWidth;
                    const height = config.height || 250;
                    p.createCanvas(width, height);
                };

                p.draw = () => {
                    p.background(P5_DEFAULTS.background);

                    if (data.waves) {
                        data.waves.forEach((wave, index) => {
                            p.stroke(wave.color || CREATIVE_PALETTES.prismatic[index]);
                            p.strokeWeight(2);
                            p.noFill();

                            p.beginShape();
                            for (let x = 0; x < p.width; x += 2) {
                                const y = p.height / 2 +
                                    Math.sin(time * wave.frequency + x * 0.01 + wave.phase) * wave.amplitude;
                                p.vertex(x, y);
                            }
                            p.endShape();
                        });
                    }

                    time += 1;
                };

                p.windowResized = () => {
                    const width = p._userNode.offsetWidth;
                    p.resizeCanvas(width, 250);
                };
            };
        }

        createAgentsSketch(data, config) {
            // Enhanced for actor message flow visualization
            let animationTime = 0;

            return (p) => {
                p.setup = () => {
                    const width = config.width || p._userNode.offsetWidth;
                    const height = config.height || 400;
                    p.createCanvas(width, height);
                    p.textAlign(p.CENTER, p.CENTER);
                    p.textSize(10);
                };

                p.draw = () => {
                    p.background(P5_DEFAULTS.background);

                    if (data.actors) {
                        // Draw actors (GenServer processes)
                        data.actors.forEach(actor => {
                            const scaledX = actor.x * (p.width / 800);
                            const scaledY = actor.y * (p.height / 600);

                            // Actor state coloring
                            const stateColors = {
                                idle: '#6366f1',       // indigo
                                processing: '#f59e0b', // amber
                                sending: '#10b981',    // emerald
                                creating: '#8b5cf6'    // violet
                            };

                            // Draw actor circle
                            p.fill(stateColors[actor.state] || stateColors.idle);
                            p.stroke('#374151');
                            p.strokeWeight(2);
                            p.circle(scaledX, scaledY, 40);

                            // Draw mailbox
                            if (actor.mailbox.length > 0) {
                                p.fill('#ef4444'); // red for pending messages
                                p.noStroke();
                                p.circle(scaledX + 15, scaledY - 15, 8 + actor.mailbox.length * 2);

                                p.fill('#ffffff');
                                p.textSize(8);
                                p.text(actor.mailbox.length, scaledX + 15, scaledY - 15);
                            }

                            // Actor label
                            p.fill('#ffffff');
                            p.textSize(9);
                            p.text(actor.type, scaledX, scaledY + 5);
                        });

                        // Draw flying messages
                        if (data.messages) {
                            data.messages.forEach(msg => {
                                const fromActor = data.actors[msg.from];
                                const toActor = data.actors[msg.to];

                                if (fromActor && toActor && msg.from !== msg.to) {
                                    const fromX = fromActor.x * (p.width / 800);
                                    const fromY = fromActor.y * (p.height / 600);
                                    const toX = toActor.x * (p.width / 800);
                                    const toY = toActor.y * (p.height / 600);

                                    // Animate message movement
                                    const progress = (msg.progress + animationTime * 0.01) % 1;
                                    const msgX = p.lerp(fromX, toX, progress);
                                    const msgY = p.lerp(fromY, toY, progress);

                                    // Message type coloring
                                    const typeColors = {
                                        cast: '#8b5cf6',    // violet (async)
                                        call: '#f59e0b',    // amber (sync)
                                        info: '#06b6d4'     // cyan (internal)
                                    };

                                    p.fill(typeColors[msg.type] || typeColors.cast);
                                    p.noStroke();
                                    p.circle(msgX, msgY, 6);

                                    // Draw message trail
                                    p.stroke(typeColors[msg.type] || typeColors.cast);
                                    p.strokeWeight(1);
                                    p.line(fromX, fromY, msgX, msgY);
                                }
                            });
                        }
                    } else if (data.length) {
                        // Fallback to generic agent visualization
                        data.forEach(agent => {
                            agent.x += agent.velocity.x;
                            agent.y += agent.velocity.y;

                            if (agent.x > p.width || agent.x < 0) agent.velocity.x *= -1;
                            if (agent.y > p.height || agent.y < 0) agent.velocity.y *= -1;

                            agent.x = p.constrain(agent.x, 0, p.width);
                            agent.y = p.constrain(agent.y, 0, p.height);

                            const domainColors = {
                                osint: CREATIVE_PALETTES.prismatic[0],
                                quality: CREATIVE_PALETTES.prismatic[1],
                                security: CREATIVE_PALETTES.prismatic[2],
                                development: CREATIVE_PALETTES.prismatic[3]
                            };

                            p.fill(domainColors[agent.domain] || CREATIVE_PALETTES.prismatic[4]);
                            p.noStroke();
                            p.circle(agent.x, agent.y, 4 + agent.activity * 6);
                        });
                    }

                    animationTime += 1;
                };

                p.windowResized = () => {
                    const width = p._userNode.offsetWidth;
                    p.resizeCanvas(width, 400);
                };
            };
        }

        createGenerativeSketch(data, config) {
            // Enhanced for epistemic pipeline visualization
            let flowTime = 0;
            let seed = 12345;

            return (p) => {
                p.setup = () => {
                    const width = config.width || p._userNode.offsetWidth;
                    const height = config.height || 350;
                    p.createCanvas(width, height);
                    p.randomSeed(seed);
                    p.textAlign(p.CENTER, p.CENTER);
                    p.textSize(8);
                };

                p.draw = () => {
                    p.background(P5_DEFAULTS.background);

                    if (data.levels) {
                        // Epistemic pipeline visualization
                        const scaleX = p.width / 800;
                        const scaleY = p.height / 400;

                        // Draw pipeline levels
                        data.levels.forEach((level, i) => {
                            const x = level.x * scaleX;
                            const y = level.y * scaleY;

                            // Level activity indicator
                            const activity = level.throughput / 100;
                            const size = 30 + activity * 10;

                            p.fill(CREATIVE_PALETTES.prismatic[i % CREATIVE_PALETTES.prismatic.length]);
                            p.stroke('#374151');
                            p.strokeWeight(1);
                            p.circle(x, y, size);

                            // Active signals count
                            if (level.active_signals > 0) {
                                p.fill('#ffffff');
                                p.textSize(8);
                                p.text(level.active_signals, x, y);
                            }

                            // Level name
                            p.fill('#d1d5db');
                            p.textSize(7);
                            p.text(`L${level.level}`, x, y + 25);

                            // Draw flow lines to next level
                            if (i < data.levels.length - 1) {
                                const nextLevel = data.levels[i + 1];
                                p.stroke('#6b7280');
                                p.strokeWeight(1);
                                p.line(x, y, nextLevel.x * scaleX, nextLevel.y * scaleY);
                            }
                        });

                        // Draw flowing signals
                        data.signals.forEach(signal => {
                            const currentLevel = data.levels[signal.current_level];
                            if (currentLevel) {
                                const x = currentLevel.x * scaleX + Math.sin(flowTime * 0.05 + signal.id) * 15;
                                const y = currentLevel.y * scaleY + Math.cos(flowTime * 0.05 + signal.id) * 15;

                                // Signal type coloring
                                const typeColors = {
                                    osint: '#06b6d4',      // cyan
                                    agent: '#8b5cf6',      // violet
                                    sensor: '#10b981',     // emerald
                                    human: '#f59e0b'       // amber
                                };

                                p.fill(typeColors[signal.type] || typeColors.osint);
                                p.noStroke();

                                // Size based on confidence
                                const size = 3 + signal.confidence * 5;
                                p.circle(x, y, size);

                                // Contradiction indicator
                                if (signal.contradictions) {
                                    p.stroke('#ef4444');
                                    p.strokeWeight(2);
                                    p.noFill();
                                    p.circle(x, y, size + 6);
                                }
                            }
                        });

                        // Draw Trinity Gates
                        data.trinity_gates.forEach(gate => {
                            const level = data.levels[gate.level];
                            if (level) {
                                const x = level.x * scaleX;
                                const y = (level.y - 15) * scaleY;

                                // Gate status
                                p.fill(gate.active ? '#10b981' : '#374151');
                                p.stroke('#ffffff');
                                p.strokeWeight(1);
                                p.rect(x - 10, y - 5, 20, 10);

                                p.fill('#ffffff');
                                p.textSize(6);
                                p.text('TG', x, y);
                            }
                        });

                    } else if (data.elements) {
                        // Stage-specific visualization
                        data.elements.forEach((element, i) => {
                            const x = element.x * (p.width / 800);
                            const y = element.y * (p.height / 400);

                            if (element.type) {
                                // Signal processing stage
                                const typeColors = {
                                    raw: '#6b7280',        // gray
                                    extracted: '#3b82f6',  // blue
                                    validated: '#10b981',  // emerald
                                    attributed: '#8b5cf6'  // violet
                                };

                                p.fill(typeColors[element.type] || typeColors.raw);
                                p.noStroke();
                                p.circle(x, y, 4 + element.strength * 8);

                            } else if (element.connections !== undefined) {
                                // Correlation stage
                                p.fill(CREATIVE_PALETTES.prismatic[0]);
                                p.stroke('#374151');
                                p.strokeWeight(element.connections);
                                p.circle(x, y, 8 + element.pattern_strength * 12);

                            } else if (element.confidence !== undefined) {
                                // Knowledge integration stage
                                const alpha = element.integrated ? 255 : 128;
                                p.fill(p.color(CREATIVE_PALETTES.prismatic[2] + p.hex(alpha, 2)));
                                p.noStroke();
                                p.circle(x, y, 10 + element.confidence * 15);

                            } else if (element.awareness_level !== undefined) {
                                // Consciousness stage
                                p.stroke(CREATIVE_PALETTES.prismatic[4]);
                                p.strokeWeight(2);
                                p.noFill();

                                // Draw consciousness patterns
                                for (let ring = 0; ring < 5; ring++) {
                                    const radius = 20 + ring * 15;
                                    const alpha = element.awareness_level * (1 - ring * 0.15);
                                    p.circle(x, y, radius * 2);
                                }

                                // Fitness score
                                p.fill('#ffffff');
                                p.textSize(10);
                                p.text(element.fitness.toFixed(3), x, y);
                            }
                        });
                    } else {
                        // Fallback generative art
                        for (let i = 0; i < 100; i++) {
                            const x = p.random(p.width);
                            const y = p.random(p.height);
                            const size = p.random(2, 12);
                            const colorIndex = Math.floor(p.random(CREATIVE_PALETTES.prismatic.length));

                            p.fill(CREATIVE_PALETTES.prismatic[colorIndex]);
                            p.noStroke();
                            p.circle(x, y, size);
                        }
                        p.noLoop();
                        return;
                    }

                    flowTime += 1;
                };

                p.windowResized = () => {
                    const width = p._userNode.offsetWidth;
                    p.resizeCanvas(width, 350);
                };
            };
        }

        parseOptions(options) {
            if (!options) return {};
            try {
                return typeof options === 'string' ? JSON.parse(options) : options;
            } catch (e) {
                return {};
            }
        }

        async refreshSketch(sketchId) {
            const sketchInfo = this.sketches.get(sketchId);
            if (!sketchInfo) return;

            try {
                const newData = await this.dataSource.fetchCreativeData(sketchInfo.dataSource);
                // Update sketch data and redraw
                if (sketchInfo.p5) {
                    sketchInfo.p5.redraw();
                }
                sketchInfo.lastUpdate = Date.now();

                // Trigger refresh event
                sketchInfo.element.dispatchEvent(new CustomEvent('p5:refreshed', {
                    detail: { sketchId: sketchId, data: newData }
                }));

            } catch (error) {
            }
        }

        async refreshAllSketches() {
            const promises = Array.from(this.sketches.keys()).map(id => this.refreshSketch(id));
            await Promise.all(promises);
        }

        handleCreativeUpdate(event) {
            if (event.sketchId && this.sketches.has(event.sketchId)) {
                this.refreshSketch(event.sketchId);
            } else if (event.type === 'refresh_all') {
                this.refreshAllSketches();
            }
        }

        renderError(element, error) {
            // Clear element safely
            element.textContent = '';

            const errorDiv = document.createElement('div');
            errorDiv.className = 'flex items-center justify-center h-48 bg-gray-800 border border-gray-700 rounded-lg';

            const contentDiv = document.createElement('div');
            contentDiv.className = 'text-center text-gray-400';

            const title = document.createElement('h3');
            title.className = 'text-lg font-medium text-gray-300 mb-2';
            title.textContent = 'p5.js Sketch Error';

            const desc = document.createElement('p');
            desc.className = 'text-sm';
            desc.textContent = 'Failed to load creative sketch';

            contentDiv.appendChild(title);
            contentDiv.appendChild(desc);
            errorDiv.appendChild(contentDiv);
            element.appendChild(errorDiv);
        }

        // Public API
        getSketch(sketchId) {
            return this.sketches.get(sketchId)?.p5;
        }

        destroySketch(sketchId) {
            const sketchInfo = this.sketches.get(sketchId);
            if (sketchInfo && sketchInfo.p5) {
                sketchInfo.p5.remove();
                this.sketches.delete(sketchId);
            }
        }

        pauseSketch(sketchId) {
            const sketchInfo = this.sketches.get(sketchId);
            if (sketchInfo && sketchInfo.p5) {
                sketchInfo.p5.noLoop();
            }
        }

        resumeSketch(sketchId) {
            const sketchInfo = this.sketches.get(sketchId);
            if (sketchInfo && sketchInfo.p5) {
                sketchInfo.p5.loop();
            }
        }
    }

    // Initialize when p5.js is available
    function initializeCreativeManager() {
        if (typeof p5 !== 'undefined') {
            window.PrismaticCreative = new PrismaticCreativeManager();

            // Trigger ready event
            document.dispatchEvent(new CustomEvent('creative:ready'));
        } else {
            setTimeout(initializeCreativeManager, 100);
        }
    }

    // Auto-initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeCreativeManager);
    } else {
        initializeCreativeManager();
    }

})();
