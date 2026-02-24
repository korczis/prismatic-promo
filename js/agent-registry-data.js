/**
 * Prismatic Platform - Agent Registry Data
 * 494 agents across 14 domains
 * Generated from AIAD Agent Registry v8.0.0
 */
function generateAgentData(baseUrl) {
    var agents = [];

    // Helper to generate worker instances
    function addWorkers(prefix, domain, desc, commands, detailUrl, count) {
        for (var i = 1; i <= count; i++) {
            agents.push({name:prefix+"-"+i,domain:domain,level:"L1",description:desc+" instance "+i,commands:commands,detailUrl:detailUrl});
        }
    }

    // ===== QUALITY ASSURANCE (45 agents) =====
    var qa = baseUrl+"/agents/quality/";
    agents.push(
        {name:"quality-floor-guardian",domain:"Quality Assurance",level:"L4",description:"Autonomous quality monitoring and floor enforcement with 100/100 score maintenance",commands:["/quality-gates","/evolve"],detailUrl:qa},
        {name:"cascade-eliminator",domain:"Quality Assurance",level:"L3",description:"Systematic CASCADE anti-pattern removal across entire codebase",commands:["/cascade","/quality-enforce"],detailUrl:qa},
        {name:"evolution-engine",domain:"Quality Assurance",level:"L3",description:"Autonomous codebase self-evolution and continuous improvement",commands:["/evolve","/autoevolve"],detailUrl:qa},
        {name:"test-architect",domain:"Quality Assurance",level:"L3",description:"Comprehensive test generation and architecture design specialist",commands:["/test","/regression-check"],detailUrl:qa},
        {name:"debt-hunter",domain:"Quality Assurance",level:"L2",description:"Quality debt identification and elimination specialist",commands:["/tech-debt","/quality-enforce"],detailUrl:qa},
        {name:"regression-guard",domain:"Quality Assurance",level:"L3",description:"Mandatory regression test enforcement on all bug fixes",commands:["/regression-check"],detailUrl:qa},
        {name:"credo-enforcer",domain:"Quality Assurance",level:"L2",description:"Credo strict mode compliance enforcement across codebase",commands:["/quality-gates"],detailUrl:qa},
        {name:"dialyzer-specialist",domain:"Quality Assurance",level:"L2",description:"Static type analysis and dialyzer compliance verification",commands:["/quality-gates"],detailUrl:qa},
        {name:"compilation-sentinel",domain:"Quality Assurance",level:"L2",description:"Zero-warning compilation enforcement with --warnings-as-errors",commands:["/quality-gates"],detailUrl:qa},
        {name:"memory-safety-auditor",domain:"Quality Assurance",level:"L2",description:"Bounded data structure and memory safety verification",commands:["/quality-gates"],detailUrl:qa},
        {name:"performance-pattern-analyst",domain:"Quality Assurance",level:"L2",description:"O(1) pattern compliance and performance anti-pattern detection",commands:["/benchmark"],detailUrl:qa},
        {name:"typespec-coverage-agent",domain:"Quality Assurance",level:"L2",description:"@spec documentation coverage enforcement and gap analysis",commands:["/quality-gates"],detailUrl:qa},
        {name:"timing-pattern-enforcer",domain:"Quality Assurance",level:"L2",description:"Process.sleep elimination and proper timer pattern enforcement",commands:["/quality-gates"],detailUrl:qa},
        {name:"quality-gate-enforcer",domain:"Quality Assurance",level:"L3",description:"Phase progression blocking on quality gate failures",commands:["/quality-gates"],detailUrl:qa},
        {name:"todo-management-agent",domain:"Quality Assurance",level:"L2",description:"TODO/FIXME tracking, prioritization, and elimination management",commands:["/quality-enforce"],detailUrl:qa},
        {name:"quality-dna-tracker",domain:"Quality Assurance",level:"L2",description:"Cross-session quality continuity and DNA state tracking",commands:["/quality-gates"],detailUrl:qa},
        {name:"quality-enforcement-commander",domain:"Quality Assurance",level:"L3",description:"Progressive quality debt elimination with adaptive scaling",commands:["/quality-enforce"],detailUrl:qa},
        {name:"predictive-precommit",domain:"Quality Assurance",level:"L2",description:"Predictive pre-commit regression prevention using pattern analysis",commands:["/quality-gates"],detailUrl:qa},
        {name:"impl-coverage-auditor",domain:"Quality Assurance",level:"L2",description:"@impl callback coverage auditing across 709+ callbacks",commands:["/quality-gates"],detailUrl:qa},
        {name:"guard-function-analyst",domain:"Quality Assurance",level:"L2",description:"Pattern matching and guard function hygiene enforcement",commands:["/quality-gates"],detailUrl:qa},
        {name:"datetime-precision-agent",domain:"Quality Assurance",level:"L2",description:"Microsecond timestamp precision enforcement for databases",commands:["/quality-gates"],detailUrl:qa},
        {name:"unsafe-map-access-detector",domain:"Quality Assurance",level:"L2",description:"Map.fetch/Map.get safety pattern enforcement and violation detection",commands:["/quality-gates"],detailUrl:qa},
        {name:"nuclear-cache-handler",domain:"Quality Assurance",level:"L3",description:"Build cache corruption detection and nuclear recovery procedures",commands:["/cascade"],detailUrl:qa},
        {name:"quality-score-calculator",domain:"Quality Assurance",level:"L2",description:"Quality score computation across all 13 quality domains",commands:["/quality-gates"],detailUrl:qa}
    );
    addWorkers("quality-qa-bot","Quality Assurance","Automated quality QA check bot",["/quality-gates"],qa,21);

    // ===== OSINT INTELLIGENCE (62 agents) =====
    var osint = baseUrl+"/agents/osint/";
    agents.push(
        {name:"sig-osint-commander",domain:"OSINT Intelligence",level:"L4",description:"Supreme OSINT operations commander and multi-source signal coordination",commands:["/investigate","/ghost-recon"],detailUrl:osint},
        {name:"ghost-recon-operator",domain:"OSINT Intelligence",level:"L3",description:"Ghost reconnaissance for passive intelligence gathering operations",commands:["/ghost-recon"],detailUrl:osint},
        {name:"delta-force-operator",domain:"OSINT Intelligence",level:"L3",description:"Precision strike intelligence operations with targeted collection",commands:["/delta-force"],detailUrl:osint},
        {name:"navy-seal-operator",domain:"OSINT Intelligence",level:"L3",description:"Deep-dive investigation and multi-source intelligence fusion",commands:["/navy-seal"],detailUrl:osint},
        {name:"green-beret-operator",domain:"OSINT Intelligence",level:"L3",description:"Unconventional intelligence and adaptive investigation techniques",commands:["/green-beret"],detailUrl:osint},
        {name:"falcon-strike-operator",domain:"OSINT Intelligence",level:"L3",description:"Rapid aerial-perspective intelligence sweep operations",commands:["/falcon-strike"],detailUrl:osint},
        {name:"siege-master-operator",domain:"OSINT Intelligence",level:"L3",description:"Comprehensive intelligence siege and full-spectrum coverage",commands:["/siege-master"],detailUrl:osint},
        {name:"email-osint-specialist",domain:"OSINT Intelligence",level:"L2",description:"Email-based OSINT intelligence gathering and breach correlation",commands:["/email-osint"],detailUrl:osint},
        {name:"google-hacking-specialist",domain:"OSINT Intelligence",level:"L2",description:"Google dorking and advanced search intelligence extraction",commands:["/google-hacking"],detailUrl:osint},
        {name:"web-crawler-agent",domain:"OSINT Intelligence",level:"L2",description:"Automated web crawling and structured data extraction",commands:["/web-crawler"],detailUrl:osint},
        {name:"osint-engine-coordinator",domain:"OSINT Intelligence",level:"L3",description:"Multi-engine OSINT source coordination and result fusion",commands:["/osint-engines"],detailUrl:osint},
        {name:"shodan-adapter",domain:"OSINT Intelligence",level:"L2",description:"Shodan API integration for IoT and device intelligence",commands:["/investigate"],detailUrl:osint},
        {name:"virustotal-adapter",domain:"OSINT Intelligence",level:"L2",description:"VirusTotal API integration for malware and hash intelligence",commands:["/investigate"],detailUrl:osint},
        {name:"censys-adapter",domain:"OSINT Intelligence",level:"L2",description:"Censys integration for certificate and host intelligence",commands:["/investigate"],detailUrl:osint},
        {name:"abuseipdb-adapter",domain:"OSINT Intelligence",level:"L2",description:"AbuseIPDB integration for IP reputation scoring",commands:["/investigate"],detailUrl:osint},
        {name:"greynoise-adapter",domain:"OSINT Intelligence",level:"L2",description:"GreyNoise integration for internet noise analysis",commands:["/investigate"],detailUrl:osint},
        {name:"haveibeenpwned-adapter",domain:"OSINT Intelligence",level:"L2",description:"HIBP integration for breach detection intelligence",commands:["/investigate"],detailUrl:osint},
        {name:"crtsh-adapter",domain:"OSINT Intelligence",level:"L2",description:"Certificate Transparency Log search and analysis",commands:["/investigate"],detailUrl:osint},
        {name:"urlscan-adapter",domain:"OSINT Intelligence",level:"L2",description:"URL scanning and website behavior intelligence",commands:["/investigate"],detailUrl:osint},
        {name:"spyse-adapter",domain:"OSINT Intelligence",level:"L2",description:"Spyse internet asset discovery and intelligence",commands:["/investigate"],detailUrl:osint},
        {name:"czech-registry-adapter",domain:"OSINT Intelligence",level:"L2",description:"Czech business registry (ARES/Justice/VR/RZP) intelligence",commands:["/investigate"],detailUrl:osint},
        {name:"eu-sanctions-adapter",domain:"OSINT Intelligence",level:"L2",description:"EU sanctions list and compliance screening intelligence",commands:["/investigate"],detailUrl:osint},
        {name:"ofac-adapter",domain:"OSINT Intelligence",level:"L2",description:"US OFAC sanctions list screening and compliance",commands:["/investigate"],detailUrl:osint},
        {name:"osint-fusion-analyst",domain:"OSINT Intelligence",level:"L3",description:"Multi-source intelligence fusion and cross-correlation analysis",commands:["/investigate"],detailUrl:osint},
        {name:"osint-report-generator",domain:"OSINT Intelligence",level:"L2",description:"Automated OSINT investigation report generation and formatting",commands:["/investigate"],detailUrl:osint},
        {name:"threat-intelligence-analyst",domain:"OSINT Intelligence",level:"L3",description:"Threat landscape analysis and indicator tracking",commands:["/investigate"],detailUrl:osint},
        {name:"osint-data-normalizer",domain:"OSINT Intelligence",level:"L1",description:"Multi-source data normalization and deduplication engine",commands:["/investigate"],detailUrl:osint}
    );
    addWorkers("osint-queue-worker","OSINT Intelligence","OSINT task queue processing worker",["/investigate"],osint,35);

    // ===== SECURITY (48 agents) =====
    var sec = baseUrl+"/agents/security/";
    agents.push(
        {name:"red-commander",domain:"Security",level:"L3",description:"Red team adversarial simulation strategic commander",commands:["/red-team"],detailUrl:sec},
        {name:"red-epistemic-attacker",domain:"Security",level:"L2",description:"Truth distortion and source poisoning simulation",commands:["/red-team"],detailUrl:sec},
        {name:"red-drift-inducer",domain:"Security",level:"L2",description:"Sub-threshold drift attacks and cascade propagation",commands:["/red-team"],detailUrl:sec},
        {name:"red-scenario-generator",domain:"Security",level:"L2",description:"Multi-technique adversarial scenario composition from 329-entry taxonomy",commands:["/red-team"],detailUrl:sec},
        {name:"blue-commander",domain:"Security",level:"L3",description:"Blue team epistemic defense strategic commander",commands:["/blue-team"],detailUrl:sec},
        {name:"blue-auth-sentinel",domain:"Security",level:"L2",description:"Authentication boundary monitoring and privilege escalation detection",commands:["/blue-team"],detailUrl:sec},
        {name:"blue-drift-detector",domain:"Security",level:"L2",description:"Behavioral, configuration, dependency and performance drift detection",commands:["/blue-team"],detailUrl:sec},
        {name:"blue-signal-aggregator",domain:"Security",level:"L2",description:"Cross-domain signal correlation with NABLA plurality enforcement",commands:["/blue-team"],detailUrl:sec},
        {name:"purple-coordinator",domain:"Security",level:"L3",description:"Purple team synthesis hub and closure authority",commands:["/purple-team"],detailUrl:sec},
        {name:"purple-mapper",domain:"Security",level:"L4",description:"Bidirectional Red-Blue finding mapping specialist",commands:["/purple-team"],detailUrl:sec},
        {name:"purple-closure-analyst",domain:"Security",level:"L4",description:"4-condition closure evaluation and false closure detection",commands:["/purple-team"],detailUrl:sec},
        {name:"purple-regression-guard",domain:"Security",level:"L4",description:"Regression trap management and deployment gate enforcement",commands:["/purple-team"],detailUrl:sec},
        {name:"gray-explorer-commander",domain:"Security",level:"L3",description:"Gray team boundary exploration and ambiguity detection",commands:["/color-team"],detailUrl:sec},
        {name:"gray-edge-finder",domain:"Security",level:"L4",description:"Boundary value analysis and specification gap identification",commands:["/color-team"],detailUrl:sec},
        {name:"gray-escalation-guard",domain:"Security",level:"L4",description:"Gray-to-Black escalation prevention with override authority",commands:["/color-team"],detailUrl:sec},
        {name:"white-verifier-commander",domain:"Security",level:"L3",description:"White team constructive verification strategic commander",commands:["/white-verify"],detailUrl:sec},
        {name:"white-contract-validator",domain:"Security",level:"L4",description:"Interface contract testing and behaviour/protocol validation",commands:["/white-verify"],detailUrl:sec},
        {name:"white-invariant-prover",domain:"Security",level:"L4",description:"Property-based testing and formal Lean4 proofs specialist",commands:["/white-verify"],detailUrl:sec},
        {name:"black-theorist-commander",domain:"Security",level:"L3",description:"Abstract threat modeling commander (MAXIMUM ISOLATION)",commands:["/color-team"],detailUrl:sec},
        {name:"black-abstraction-enforcer",domain:"Security",level:"L3",description:"L1-L4 output abstraction enforcement and executable content blocking",commands:["/color-team"],detailUrl:sec},
        {name:"security-audit-specialist",domain:"Security",level:"L3",description:"Comprehensive application security auditing and OWASP compliance",commands:["/security-audit"],detailUrl:sec},
        {name:"manipulation-detector",domain:"Security",level:"L3",description:"Manipulation detection and defense system with technique taxonomy",commands:["/manipulation"],detailUrl:sec},
        {name:"perimeter-scanner",domain:"Security",level:"L2",description:"External attack surface discovery and continuous scanning",commands:["/perimeter"],detailUrl:sec},
        {name:"vulnerability-assessor",domain:"Security",level:"L2",description:"Vulnerability assessment with evidence-based risk scoring",commands:["/security-audit"],detailUrl:sec},
        {name:"compliance-checker",domain:"Security",level:"L2",description:"NIS2 Directive and ZKB 264/2025 compliance verification",commands:["/perimeter"],detailUrl:sec},
        {name:"security-reporter",domain:"Security",level:"L2",description:"Security assessment report generation with A-F grading",commands:["/security-audit"],detailUrl:sec}
    );
    addWorkers("sec-worker","Security","Security scanning and assessment worker",["/security-audit"],sec,22);

    // ===== DEVELOPMENT (55 agents) =====
    var dev = baseUrl+"/agents/development/";
    agents.push(
        {name:"elixir-core-specialist",domain:"Development",level:"L3",description:"Core Elixir/OTP development and implementation specialist",commands:["/code","/fix"],detailUrl:dev},
        {name:"liveview-specialist",domain:"Development",level:"L3",description:"Phoenix LiveView UI development and real-time features",commands:["/code","/svihadlo"],detailUrl:dev},
        {name:"database-specialist",domain:"Development",level:"L3",description:"PostgreSQL, Ecto, and database architecture design",commands:["/code","/migrate"],detailUrl:dev},
        {name:"testing-specialist",domain:"Development",level:"L3",description:"Comprehensive test design, implementation and coverage",commands:["/test","/regression-check"],detailUrl:dev},
        {name:"refactoring-specialist",domain:"Development",level:"L3",description:"Safe refactoring with zero-regression guarantee",commands:["/refactor"],detailUrl:dev},
        {name:"performance-specialist",domain:"Development",level:"L3",description:"Performance profiling, analysis and optimization",commands:["/perf-profile","/optimize"],detailUrl:dev},
        {name:"documentation-specialist",domain:"Development",level:"L2",description:"Technical documentation and API reference generation",commands:["/doc"],detailUrl:dev},
        {name:"ui-enhance-specialist",domain:"Development",level:"L2",description:"UI/UX enhancement with TailwindCSS and Flowbite components",commands:["/ui-enhance","/svihadlo"],detailUrl:dev},
        {name:"brainstorm-facilitator",domain:"Development",level:"L2",description:"Technical brainstorming and solution design facilitation",commands:["/brainstorm"],detailUrl:dev},
        {name:"code-explainer",domain:"Development",level:"L2",description:"Code explanation and architecture walkthrough specialist",commands:["/explain"],detailUrl:dev},
        {name:"quickstart-generator",domain:"Development",level:"L2",description:"Project quickstart scaffolding and boilerplate generation",commands:["/quickstart"],detailUrl:dev},
        {name:"validation-specialist",domain:"Development",level:"L2",description:"Input validation and data integrity enforcement",commands:["/validate"],detailUrl:dev},
        {name:"route-test-specialist",domain:"Development",level:"L2",description:"Route testing and HTTP endpoint verification",commands:["/route-test"],detailUrl:dev},
        {name:"chatgpt-bridge",domain:"Development",level:"L2",description:"ChatGPT integration, context packing and synchronization",commands:["/chatgpt-pack","/chatgpt-consult"],detailUrl:dev}
    );
    addWorkers("dev-worker","Development","Development task execution worker",["/code"],dev,41);

    // ===== STRATEGIC (35 agents) =====
    var strat = baseUrl+"/agents/strategic/";
    agents.push(
        {name:"archer-supreme",domain:"Strategic",level:"SUPREME",description:"Supreme strategic commander with ultimate authority across all domains",commands:["/archer-supreme","/orchestrate"],detailUrl:strat},
        {name:"supreme-coordinator",domain:"Strategic",level:"SUPREME",description:"Supreme multi-agent coordination and mission orchestration",commands:["/orchestrate"],detailUrl:strat},
        {name:"unified-orchestrator",domain:"Strategic",level:"L4",description:"Revolutionary AI-powered task orchestration achieving 10x efficiency",commands:["/orchestrate","/auto"],detailUrl:strat},
        {name:"auto-intelligence-engine",domain:"Strategic",level:"L4",description:"Intelligent autonomous evolution engine with decision scoring",commands:["/auto","/auto-pro"],detailUrl:strat},
        {name:"auto-ultimate-orchestrator",domain:"Strategic",level:"COSMIC",description:"Maximum intelligence fusion with MENDEL, MYCELIALIZE, and AXON/EXLA",commands:["/auto-ultimate"],detailUrl:strat},
        {name:"architecture-analyst",domain:"Strategic",level:"L3",description:"System architecture analysis and design recommendations",commands:["/analyze","/architect"],detailUrl:strat},
        {name:"migration-specialist",domain:"Strategic",level:"L3",description:"Safe migration planning, execution and rollback strategies",commands:["/migrate"],detailUrl:strat},
        {name:"integration-specialist",domain:"Strategic",level:"L3",description:"Cross-system integration design and implementation",commands:["/integrate"],detailUrl:strat},
        {name:"focus-coordinator",domain:"Strategic",level:"L3",description:"Strategic focus management and priority coordination",commands:["/focus"],detailUrl:strat},
        {name:"review-specialist",domain:"Strategic",level:"L3",description:"Code review and architectural review execution",commands:["/review"],detailUrl:strat}
    );
    addWorkers("strategic-planner","Strategic","Strategic planning and analysis worker",["/orchestrate"],strat,25);

    // ===== M&A INTELLIGENCE (42 agents) =====
    var ma = baseUrl+"/agents/ma-intelligence/";
    agents.push(
        {name:"ma-deal-commander",domain:"M&A Intelligence",level:"L4",description:"M&A deal lifecycle management and strategic coordination",commands:["/ma-create","/ma-analyze"],detailUrl:ma},
        {name:"ma-financial-analyst",domain:"M&A Intelligence",level:"L3",description:"Financial analysis and valuation modeling for acquisitions",commands:["/ma-analyze","/ma-report"],detailUrl:ma},
        {name:"ma-due-diligence-specialist",domain:"M&A Intelligence",level:"L3",description:"Comprehensive due diligence investigation and risk assessment",commands:["/ma-analyze"],detailUrl:ma},
        {name:"ma-risk-assessor",domain:"M&A Intelligence",level:"L3",description:"M&A risk assessment with mitigation planning",commands:["/ma-analyze","/ma-report"],detailUrl:ma},
        {name:"ma-compliance-specialist",domain:"M&A Intelligence",level:"L2",description:"Regulatory compliance assessment for M&A transactions",commands:["/ma-analyze"],detailUrl:ma},
        {name:"ma-report-generator",domain:"M&A Intelligence",level:"L2",description:"M&A analysis report and dashboard generation",commands:["/ma-report","/ma-dashboard"],detailUrl:ma},
        {name:"ma-status-tracker",domain:"M&A Intelligence",level:"L2",description:"M&A deal pipeline status tracking and monitoring",commands:["/ma-status"],detailUrl:ma}
    );
    addWorkers("ma-worker","M&A Intelligence","M&A processing and analysis worker",["/ma-analyze"],ma,35);

    // ===== INTEGRATION (38 agents) =====
    var integ = baseUrl+"/agents/integration/";
    agents.push(
        {name:"cross-app-bridge",domain:"Integration",level:"L3",description:"Cross-umbrella-app integration and data flow coordination",commands:["/integrate"],detailUrl:integ},
        {name:"mcp-server-coordinator",domain:"Integration",level:"L3",description:"MCP server management across 14+ servers with 27 tools",commands:["/connect"],detailUrl:integ},
        {name:"session-lifecycle-manager",domain:"Integration",level:"L3",description:"Session lifecycle management with hook orchestration",commands:["/context-preserve"],detailUrl:integ},
        {name:"stack-conversation-manager",domain:"Integration",level:"L3",description:"Stack-based conversation mode and frame management",commands:["/stack","/frame"],detailUrl:integ},
        {name:"context-preservation-specialist",domain:"Integration",level:"L3",description:"Real-time session context preservation with forensic integrity",commands:["/context-preserve"],detailUrl:integ},
        {name:"ollama-coordinator",domain:"Integration",level:"L3",description:"Local AI Ollama model management and quality optimization",commands:["/ollama"],detailUrl:integ},
        {name:"garden-cultivator",domain:"Integration",level:"L3",description:"GARDEN legacy knowledge repository management across 116 repos",commands:["/gardener"],detailUrl:integ},
        {name:"git-trees-optimizer",domain:"Integration",level:"L2",description:"Git tree-based codebase exploration with 100x speedup",commands:[],detailUrl:integ},
        {name:"telemetry-coordinator",domain:"Integration",level:"L2",description:"Telemetry event coordination and metrics collection",commands:["/health"],detailUrl:integ},
        {name:"deploy-specialist",domain:"Integration",level:"L3",description:"GitLab CI/CD and Fly.io deployment management",commands:["/deploy","/deploy-production"],detailUrl:integ}
    );
    addWorkers("integration-worker","Integration","Integration task processing worker",["/integrate"],integ,28);

    // ===== EVOLUTION (28 agents) =====
    agents.push(
        {name:"evolution-orchestrator",domain:"Evolution",level:"L4",description:"Supreme evolution coordination with 5-phase lifecycle management",commands:["/evolve"],detailUrl:""},
        {name:"evolution-planner",domain:"Evolution",level:"L3",description:"Graph analysis and cross-domain evolution intelligence planning",commands:["/evolve"],detailUrl:""},
        {name:"gate-sentinel",domain:"Evolution",level:"L3",description:"Quality enforcement and zero-regression validation at all gates",commands:["/evolve"],detailUrl:""},
        {name:"registry-syncer",domain:"Evolution",level:"L3",description:"Ecosystem consistency maintenance and drift prevention",commands:["/evolve"],detailUrl:""},
        {name:"society-mycologist",domain:"Evolution",level:"L3",description:"Mycelial propagation and network intelligence coordination",commands:["/evolve","/mycelialize"],detailUrl:""},
        {name:"mendel-bridge",domain:"Evolution",level:"L3",description:"Genetic operations with mutation, crossover and fitness evaluation",commands:["/evolve"],detailUrl:""},
        {name:"evidence-scribe",domain:"Evolution",level:"L3",description:"Forensic-grade audit documentation and compliance verification",commands:["/evolve"],detailUrl:""}
    );
    addWorkers("evo-worker","Evolution","Evolution processing worker",["/evolve"],"",21);

    // ===== MYCELIAL (24 agents) =====
    agents.push(
        {name:"mycelial-network-coordinator",domain:"Mycelial",level:"L4",description:"Supreme mycelial coordination with 500K patterns/sec throughput",commands:["/mycelialize"],detailUrl:""},
        {name:"pattern-propagator-specialist",domain:"Mycelial",level:"L3",description:"High-throughput pattern distribution across all domains",commands:["/mycelialize"],detailUrl:""},
        {name:"emergence-detector-specialist",domain:"Mycelial",level:"L3",description:"Collective behavior and swarm intelligence detection",commands:["/mycelialize"],detailUrl:""},
        {name:"mycelial-healer-specialist",domain:"Mycelial",level:"L3",description:"Network repair and topology optimization under 100ms",commands:["/mycelialize"],detailUrl:""},
        {name:"cross-pollination-specialist",domain:"Mycelial",level:"L3",description:"Bidirectional cross-domain knowledge transfer",commands:["/mycelialize"],detailUrl:""},
        {name:"mycelial-evolution-specialist",domain:"Mycelial",level:"L3",description:"Genetic-inspired pattern improvement through generations",commands:["/mycelialize"],detailUrl:""},
        {name:"network-health-monitor",domain:"Mycelial",level:"L2",description:"Real-time network health with early warning detection",commands:["/mycelialize"],detailUrl:""},
        {name:"pattern-quality-analyst",domain:"Mycelial",level:"L2",description:"Pattern quality gate enforcement for propagation",commands:["/mycelialize"],detailUrl:""}
    );
    addWorkers("myc-worker","Mycelial","Mycelial network processing worker",["/mycelialize"],"",16);

    // ===== INFRASTRUCTURE (22 agents) =====
    agents.push(
        {name:"infra-supervisor",domain:"Infrastructure",level:"L4",description:"Infrastructure supervision tree and health monitoring",commands:["/health","/deploy"],detailUrl:""},
        {name:"ci-cd-pipeline-agent",domain:"Infrastructure",level:"L3",description:"GitLab CI/CD pipeline management and optimization",commands:["/deploy"],detailUrl:""},
        {name:"fly-io-deployment-agent",domain:"Infrastructure",level:"L3",description:"Fly.io deployment orchestration, scaling and health checks",commands:["/deploy-production"],detailUrl:""},
        {name:"meilisearch-deployment-agent",domain:"Infrastructure",level:"L3",description:"Meilisearch instance deployment and index management",commands:["/deploy-meilisearch"],detailUrl:""},
        {name:"database-migration-runner",domain:"Infrastructure",level:"L2",description:"Ecto migration execution and safe rollback management",commands:["/migrate"],detailUrl:""},
        {name:"health-check-agent",domain:"Infrastructure",level:"L2",description:"System health check and comprehensive status reporting",commands:["/health"],detailUrl:""},
        {name:"log-aggregator",domain:"Infrastructure",level:"L2",description:"Structured JSON log aggregation and analysis",commands:["/health"],detailUrl:""},
        {name:"monitoring-agent",domain:"Infrastructure",level:"L2",description:"Application metrics monitoring and alerting rules",commands:["/health"],detailUrl:""}
    );
    addWorkers("infra-worker","Infrastructure","Infrastructure operations worker",["/health"],"",14);

    // ===== PERFORMANCE (30 agents) =====
    agents.push(
        {name:"performance-benchmarking-specialist",domain:"Performance",level:"L3",description:"Comprehensive performance validation with P95/P99 analysis",commands:["/benchmark","/perf-profile"],detailUrl:""},
        {name:"load-test-coordinator",domain:"Performance",level:"L3",description:"Load testing orchestration and capacity analysis",commands:["/benchmark"],detailUrl:""},
        {name:"profiling-specialist",domain:"Performance",level:"L2",description:"Application profiling and hotspot identification",commands:["/perf-profile"],detailUrl:""},
        {name:"optimization-engine",domain:"Performance",level:"L3",description:"Automated performance optimization implementation",commands:["/optimize"],detailUrl:""},
        {name:"budget-compliance-agent",domain:"Performance",level:"L2",description:"Performance budget compliance and regression detection",commands:["/benchmark"],detailUrl:""}
    );
    addWorkers("perf-worker","Performance","Performance testing and analysis worker",["/benchmark"],"",25);

    // ===== DOCUMENTATION (15 agents) =====
    agents.push(
        {name:"chronic-scanner",domain:"Documentation",level:"L3",description:"Chronic documentation scan and hygiene maintenance",commands:["/chronic"],detailUrl:""},
        {name:"lowfruit-finder",domain:"Documentation",level:"L2",description:"Low-hanging fruit identification for quick improvements",commands:["/find-lowfruit"],detailUrl:""},
        {name:"mycelium-scanner",domain:"Documentation",level:"L2",description:"Mycelial pattern scanning across all documentation",commands:["/scan-mycelium"],detailUrl:""},
        {name:"pattern-propagator",domain:"Documentation",level:"L2",description:"Successful pattern propagation across documents and repos",commands:["/propagate-pattern"],detailUrl:""},
        {name:"nmnd-status-checker",domain:"Documentation",level:"L2",description:"NO MERCY NO DOUBTS compliance verification and reporting",commands:["/nmnd-status"],detailUrl:""}
    );
    addWorkers("doc-worker","Documentation","Documentation maintenance worker",["/doc"],"",10);

    // ===== CRISIS (10 agents) =====
    agents.push(
        {name:"emergency-responder",domain:"Crisis",level:"SUPREME",description:"Emergency response and crisis management supreme commander",commands:["/emergency"],detailUrl:""},
        {name:"dark-ops-analyst",domain:"Crisis",level:"L4",description:"NABLA structural crisis detection and dark operations analysis",commands:["/dark-ops"],detailUrl:""},
        {name:"crisis-coordinator",domain:"Crisis",level:"L3",description:"Crisis coordination and multi-team response orchestration",commands:["/emergency"],detailUrl:""},
        {name:"rollback-specialist",domain:"Crisis",level:"L3",description:"Emergency rollback and system recovery specialist",commands:["/emergency"],detailUrl:""},
        {name:"incident-reporter",domain:"Crisis",level:"L2",description:"Incident documentation and post-mortem generation",commands:["/emergency"],detailUrl:""}
    );
    addWorkers("crisis-worker","Crisis","Crisis response operations worker",["/emergency"],"",5);

    return agents;
}
