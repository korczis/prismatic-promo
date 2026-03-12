/**
 * Prismatic Platform - Command Registry Data
 * 212 slash commands across 12 categories
 * Generated from COMMAND_REGISTRY.md v8.0.0
 */
function generateCommandData(baseUrl) {
    return [
        // ===== UNIFIED ORCHESTRATION =====
        {name:"/orchestrate",category:"Orchestration",description:"Revolutionary AI-powered task orchestration with 10x development efficiency",authority:"Supreme Platform Intelligence",agent:"unified-orchestrator",status:"Production",usage:"high"},
        {name:"/auto",category:"Orchestration",description:"Intelligent autonomous evolution engine for zero-human-intervention improvements",authority:"COSMIC - ARCHER SUPREME",agent:"auto-intelligence-engine",status:"Production",usage:"high"},
        {name:"/auto-pro",category:"Orchestration",description:"Steroids edition with genetic optimization, swarm intelligence and quantum decisions",authority:"COSMIC+",agent:"archer-supreme",status:"Experimental",usage:"medium"},
        {name:"/auto-ultimate",category:"Orchestration",description:"Maximum intelligence fusion combining MENDEL, MYCELIALIZE and AXON/EXLA neural computing",authority:"COSMIC++",agent:"auto-ultimate-orchestrator",status:"Experimental",usage:"low"},

        // ===== DEVELOPMENT (DX) =====
        {name:"/code",category:"Development",description:"Core coding implementation and feature development",authority:"L2+",agent:"elixir-core-specialist",status:"Production",usage:"high"},
        {name:"/fix",category:"Development",description:"Bug fix implementation with mandatory regression tests",authority:"L2+",agent:"elixir-core-specialist",status:"Production",usage:"high"},
        {name:"/test",category:"Development",description:"Comprehensive test generation and verification",authority:"L2+",agent:"testing-specialist",status:"Production",usage:"high"},
        {name:"/refactor",category:"Development",description:"Safe refactoring with zero-regression guarantee",authority:"L3",agent:"refactoring-specialist",status:"Production",usage:"high"},
        {name:"/optimize",category:"Development",description:"Performance optimization with measurement validation",authority:"L3",agent:"performance-specialist",status:"Production",usage:"medium"},
        {name:"/doc",category:"Development",description:"Technical documentation and API reference generation",authority:"L2+",agent:"documentation-specialist",status:"Production",usage:"medium"},
        {name:"/brainstorm",category:"Development",description:"Technical brainstorming and solution design facilitation",authority:"L2+",agent:"brainstorm-facilitator",status:"Production",usage:"medium"},
        {name:"/explain",category:"Development",description:"Code explanation and architecture walkthrough",authority:"L2+",agent:"code-explainer",status:"Production",usage:"medium"},
        {name:"/quickstart",category:"Development",description:"Project quickstart scaffolding and boilerplate generation",authority:"L2+",agent:"quickstart-generator",status:"Production",usage:"low"},
        {name:"/validate",category:"Development",description:"Input validation and data integrity enforcement",authority:"L2+",agent:"validation-specialist",status:"Production",usage:"medium"},
        {name:"/route-test",category:"Development",description:"Route testing and HTTP endpoint verification",authority:"L2+",agent:"route-test-specialist",status:"Production",usage:"medium"},
        {name:"/ui-enhance",category:"Development",description:"UI/UX enhancement with TailwindCSS and Flowbite",authority:"L2+",agent:"ui-enhance-specialist",status:"Production",usage:"medium"},
        {name:"/perf-profile",category:"Development",description:"Application profiling and performance hotspot identification",authority:"L3",agent:"performance-specialist",status:"Production",usage:"medium"},
        {name:"/security-audit",category:"Development",description:"Comprehensive application security audit and vulnerability scan",authority:"L3",agent:"security-audit-specialist",status:"Production",usage:"medium"},
        {name:"/tech-debt",category:"Development",description:"Technical debt analysis and elimination planning",authority:"L2+",agent:"debt-hunter",status:"Production",usage:"medium"},
        {name:"/reconnaissance",category:"Development",description:"Codebase reconnaissance and structure analysis",authority:"L2+",agent:"elixir-core-specialist",status:"Production",usage:"low"},
        {name:"/jtac",category:"Development",description:"Joint terminal attack controller for precision operations",authority:"L3",agent:"elixir-core-specialist",status:"Production",usage:"low"},
        {name:"/svihadlo",category:"Development",description:"Ultra-fast visible feature implementation in 5-15 minutes",authority:"L3",agent:"liveview-specialist",status:"Production",usage:"medium"},

        // ===== CHATGPT INTEGRATION =====
        {name:"/chatgpt-pack",category:"Development",description:"Context packing for ChatGPT collaboration and knowledge transfer",authority:"L2+",agent:"chatgpt-bridge",status:"Production",usage:"low"},
        {name:"/chatgpt-consult",category:"Development",description:"Consult ChatGPT for alternative perspectives and solutions",authority:"L2+",agent:"chatgpt-bridge",status:"Production",usage:"low"},
        {name:"/chatgpt-sync",category:"Development",description:"Synchronize context and progress between Claude and ChatGPT",authority:"L2+",agent:"chatgpt-bridge",status:"Production",usage:"low"},
        {name:"/chatgpt-workflow",category:"Development",description:"Multi-step workflow coordination across AI assistants",authority:"L2+",agent:"chatgpt-bridge",status:"Production",usage:"low"},

        // ===== QUALITY =====
        {name:"/quality-gates",category:"Quality",description:"Enforce quality gate checkpoints with zero-warning compilation validation",authority:"BLOCKING",agent:"quality-gate-enforcer",status:"Production",usage:"high"},
        {name:"/quality-enforce",category:"Quality",description:"Mandatory progressive quality debt elimination with AIAD enforcement",authority:"P0 ABSOLUTE",agent:"quality-enforcement-commander",status:"Production",usage:"high"},
        {name:"/regression-check",category:"Quality",description:"Execute 25 custom Credo regression checks preventing 700+ violations",authority:"REGRESSION PREVENTION",agent:"regression-guard",status:"Production",usage:"high"},
        {name:"/benchmark",category:"Quality",description:"Comprehensive performance benchmarking with P95/P99 analysis",authority:"PERFORMANCE",agent:"performance-benchmarking-specialist",status:"Production",usage:"medium"},
        {name:"/cascade",category:"Quality",description:"Execute CASCADE pattern fix for systematic anti-pattern removal",authority:"L3",agent:"cascade-eliminator",status:"Production",usage:"medium"},

        // ===== EVOLUTION =====
        {name:"/evolve",category:"Evolution",description:"Living AIAD ecosystem evolution with 5-phase cycle and GitLab observability",authority:"SUPREME + SELF-RECURSIVE",agent:"evolution-orchestrator",status:"Production",usage:"high"},
        {name:"/mycelialize",category:"Evolution",description:"Biological-inspired pattern propagation at 500K patterns/sec with emergence detection",authority:"Strategic Operational",agent:"mycelial-network-coordinator",status:"Production",usage:"medium"},
        {name:"/mycelialize-formal",category:"Evolution",description:"Lean4 + Prolog formal verification for mathematically proven pattern propagation",authority:"COSMIC",agent:"mycelial-network-coordinator",status:"Experimental",usage:"low"},
        {name:"/mycelialize-living",category:"Evolution",description:"Living self-evolving intelligence with introspection, AST manipulation and agent swarms",authority:"COSMIC",agent:"mycelial-network-coordinator",status:"Experimental",usage:"low"},

        // ===== INTELLIGENCE (OSINT) =====
        {name:"/investigate",category:"Intelligence",description:"Launch comprehensive OSINT investigation across 121+ sources",authority:"L3+",agent:"sig-osint-commander",status:"Production",usage:"high"},
        {name:"/email-osint",category:"Intelligence",description:"Email-based OSINT gathering with breach correlation and social profiling",authority:"L2+",agent:"email-osint-specialist",status:"Production",usage:"medium"},
        {name:"/google-hacking",category:"Intelligence",description:"Google dorking and advanced search intelligence extraction",authority:"L2+",agent:"google-hacking-specialist",status:"Production",usage:"medium"},
        {name:"/osint-engines",category:"Intelligence",description:"Multi-engine OSINT source coordination and parallel querying",authority:"L3",agent:"osint-engine-coordinator",status:"Production",usage:"medium"},
        {name:"/ghost-recon",category:"Intelligence",description:"Ghost reconnaissance for passive, zero-footprint intelligence gathering",authority:"L3",agent:"ghost-recon-operator",status:"Production",usage:"medium"},
        {name:"/delta-force",category:"Intelligence",description:"Precision strike intelligence with targeted collection and analysis",authority:"L3",agent:"delta-force-operator",status:"Production",usage:"medium"},
        {name:"/navy-seal",category:"Intelligence",description:"Deep-dive investigation with multi-source intelligence fusion",authority:"L3",agent:"navy-seal-operator",status:"Production",usage:"medium"},
        {name:"/green-beret",category:"Intelligence",description:"Unconventional intelligence with adaptive investigation techniques",authority:"L3",agent:"green-beret-operator",status:"Production",usage:"low"},
        {name:"/falcon-strike",category:"Intelligence",description:"Rapid aerial-perspective intelligence sweep operations",authority:"L3",agent:"falcon-strike-operator",status:"Production",usage:"low"},
        {name:"/siege-master",category:"Intelligence",description:"Comprehensive intelligence siege with full-spectrum coverage",authority:"L3",agent:"siege-master-operator",status:"Production",usage:"low"},
        {name:"/web-crawler",category:"Intelligence",description:"Automated web crawling and structured data extraction",authority:"L2+",agent:"web-crawler-agent",status:"Production",usage:"medium"},

        // ===== M&A OPERATIONS =====
        {name:"/ma-create",category:"M&A Operations",description:"Create new M&A deal with target profiling and initial assessment",authority:"L4",agent:"ma-deal-commander",status:"Production",usage:"low"},
        {name:"/ma-analyze",category:"M&A Operations",description:"Comprehensive M&A analysis including financial, legal and operational review",authority:"L3+",agent:"ma-financial-analyst",status:"Production",usage:"medium"},
        {name:"/ma-report",category:"M&A Operations",description:"Generate detailed M&A analysis report with visualizations",authority:"L2+",agent:"ma-report-generator",status:"Production",usage:"low"},
        {name:"/ma-dashboard",category:"M&A Operations",description:"M&A deal pipeline dashboard with real-time status tracking",authority:"L2+",agent:"ma-report-generator",status:"Production",usage:"low"},
        {name:"/ma-status",category:"M&A Operations",description:"M&A deal pipeline status overview and progress tracking",authority:"L2+",agent:"ma-status-tracker",status:"Production",usage:"low"},

        // ===== ARCHITECTURE =====
        {name:"/analyze",category:"Architecture",description:"System architecture analysis with dependency mapping",authority:"L3",agent:"architecture-analyst",status:"Production",usage:"medium"},
        {name:"/architect",category:"Architecture",description:"Architecture design and recommendation generation",authority:"L3",agent:"architecture-analyst",status:"Production",usage:"medium"},
        {name:"/migrate",category:"Architecture",description:"Safe migration planning with rollback strategies",authority:"L3",agent:"migration-specialist",status:"Production",usage:"medium"},
        {name:"/integrate",category:"Architecture",description:"Cross-system integration design and implementation",authority:"L3",agent:"integration-specialist",status:"Production",usage:"medium"},
        {name:"/focus",category:"Architecture",description:"Strategic focus management and priority coordination",authority:"L3",agent:"focus-coordinator",status:"Production",usage:"low"},
        {name:"/review",category:"Architecture",description:"Code review and architectural review execution",authority:"L3",agent:"review-specialist",status:"Production",usage:"medium"},

        // ===== OPERATIONS =====
        {name:"/agents",category:"Operations",description:"List and manage agent ecosystem with status monitoring",authority:"L2+",agent:"supreme-coordinator",status:"Production",usage:"medium"},
        {name:"/commit",category:"Operations",description:"Smart commit with quality gates and conventional format",authority:"L2+",agent:"elixir-core-specialist",status:"Production",usage:"high"},
        {name:"/connect",category:"Operations",description:"MCP server connection management across 14+ servers",authority:"L2+",agent:"mcp-server-coordinator",status:"Production",usage:"medium"},
        {name:"/livebook",category:"Operations",description:"Livebook integration for interactive Elixir notebooks",authority:"L2+",agent:"elixir-core-specialist",status:"Production",usage:"low"},
        {name:"/operation-order",category:"Operations",description:"Military-grade operation order generation for complex tasks",authority:"L3",agent:"supreme-coordinator",status:"Production",usage:"low"},
        {name:"/health",category:"Operations",description:"System health check with component-level status reporting",authority:"L2+",agent:"health-check-agent",status:"Production",usage:"medium"},
        {name:"/deploy",category:"Operations",description:"Deployment to staging environment via GitLab CI/CD",authority:"L3",agent:"deploy-specialist",status:"Production",usage:"medium"},
        {name:"/deploy-production",category:"Operations",description:"Production deployment to Fly.io with safety checks",authority:"L4",agent:"fly-io-deployment-agent",status:"Production",usage:"low"},
        {name:"/deploy-meilisearch",category:"Operations",description:"Meilisearch instance deployment and configuration",authority:"L3",agent:"meilisearch-deployment-agent",status:"Production",usage:"low"},

        // ===== STACK MODE =====
        {name:"/stack",category:"Stack Mode",description:"Display complete conversation stack with all frames",authority:"Universal",agent:"stack-conversation-manager",status:"Production",usage:"medium"},
        {name:"/frame",category:"Stack Mode",description:"Inspect specific conversation frame by ID",authority:"Universal",agent:"stack-conversation-manager",status:"Production",usage:"medium"},
        {name:"/pop",category:"Stack Mode",description:"Remove last N frames from conversation stack (DESTRUCTIVE)",authority:"DESTRUCTIVE",agent:"stack-conversation-manager",status:"Production",usage:"low"},
        {name:"/fork",category:"Stack Mode",description:"Branch conversation from specific frame (DESTRUCTIVE)",authority:"DESTRUCTIVE",agent:"stack-conversation-manager",status:"Production",usage:"low"},
        {name:"/checkpoint",category:"Stack Mode",description:"Create named restore point in conversation",authority:"Persistent",agent:"stack-conversation-manager",status:"Production",usage:"medium"},
        {name:"/goto",category:"Stack Mode",description:"Restore conversation to named checkpoint",authority:"State Control",agent:"stack-conversation-manager",status:"Production",usage:"low"},

        // ===== CRISIS =====
        {name:"/emergency",category:"Crisis",description:"Emergency response and crisis management activation",authority:"SUPREME",agent:"emergency-responder",status:"Production",usage:"low"},
        {name:"/archer-supreme",category:"Crisis",description:"Supreme authority activation for platform-wide operations",authority:"SUPREME",agent:"archer-supreme",status:"Production",usage:"medium"},
        {name:"/dark-ops",category:"Crisis",description:"NABLA structural crisis detection and dark operations analysis",authority:"SUPREME",agent:"dark-ops-analyst",status:"Production",usage:"low"},

        // ===== DEFENSIVE SECURITY =====
        {name:"/manipulation detect",category:"Defensive Security",description:"Detect manipulation attempts using epistemic analysis",authority:"L3",agent:"manipulation-detector",status:"Production",usage:"low"},
        {name:"/manipulation protect",category:"Defensive Security",description:"Activate manipulation protection defenses",authority:"L3",agent:"manipulation-detector",status:"Production",usage:"low"},
        {name:"/manipulation techniques",category:"Defensive Security",description:"View manipulation technique taxonomy and counter-measures",authority:"L2+",agent:"manipulation-detector",status:"Production",usage:"low"},
        {name:"/manipulation dashboard",category:"Defensive Security",description:"Manipulation detection dashboard with threat indicators",authority:"L2+",agent:"manipulation-detector",status:"Production",usage:"low"},

        // ===== COLOR TEAMS =====
        {name:"/color-team",category:"Color Teams",description:"Color team status overview across all 6 teams",authority:"L3+",agent:"supreme-coordinator",status:"Production",usage:"medium"},
        {name:"/red-team",category:"Color Teams",description:"Red team adversarial simulation scenario execution",authority:"L3",agent:"red-commander",status:"Production",usage:"medium"},
        {name:"/blue-team",category:"Color Teams",description:"Blue team epistemic defense posture assessment",authority:"L3",agent:"blue-commander",status:"Production",usage:"medium"},
        {name:"/purple-team",category:"Color Teams",description:"Purple team Red-Blue synthesis and closure analysis",authority:"L3",agent:"purple-coordinator",status:"Production",usage:"medium"},
        {name:"/white-verify",category:"Color Teams",description:"White team constructive verification and formal proofs",authority:"L3",agent:"white-verifier-commander",status:"Production",usage:"low"},

        // ===== DOCUMENTATION & HYGIENE =====
        {name:"/chronic",category:"Documentation",description:"Chronic documentation scan and technical hygiene maintenance",authority:"L2+",agent:"chronic-scanner",status:"Production",usage:"medium"},
        {name:"/find-lowfruit",category:"Documentation",description:"Identify low-hanging fruit improvements across codebase",authority:"L2+",agent:"lowfruit-finder",status:"Production",usage:"medium"},
        {name:"/scan-mycelium",category:"Documentation",description:"Mycelial pattern scanning across documentation and code",authority:"L2+",agent:"mycelium-scanner",status:"Production",usage:"low"},
        {name:"/propagate-pattern",category:"Documentation",description:"Propagate successful patterns across the ecosystem",authority:"L2+",agent:"pattern-propagator",status:"Production",usage:"low"},
        {name:"/context-preserve",category:"Documentation",description:"Real-time session context preservation with forensic integrity",authority:"MANDATORY",agent:"context-preservation-specialist",status:"Production",usage:"high"},
        {name:"/nmnd-status",category:"Documentation",description:"NO MERCY NO DOUBTS doctrine compliance verification",authority:"L2+",agent:"nmnd-status-checker",status:"Production",usage:"low"},

        // ===== INFRASTRUCTURE =====
        {name:"/ollama",category:"Infrastructure",description:"Local AI Ollama model management, installation and optimization",authority:"L2+",agent:"ollama-coordinator",status:"Production",usage:"medium"},
        {name:"/gardener",category:"Infrastructure",description:"GARDEN legacy knowledge repository management across 116 repos",authority:"L2+",agent:"garden-cultivator",status:"Production",usage:"low"},
        {name:"/garden-explore",category:"Infrastructure",description:"Explore GARDEN repositories for patterns and knowledge",authority:"L2+",agent:"garden-cultivator",status:"Production",usage:"low"},
        {name:"/garden-extract",category:"Infrastructure",description:"Extract and integrate patterns from GARDEN repositories",authority:"L2+",agent:"garden-cultivator",status:"Production",usage:"low"},

        // ===== PERIMETER =====
        {name:"/perimeter",category:"Perimeter",description:"External attack surface management dashboard and overview",authority:"L2+",agent:"perimeter-scanner",status:"Production",usage:"medium"},
        {name:"/perimeter/assets",category:"Perimeter",description:"Asset inventory with domain, IP, certificate discovery",authority:"L2+",agent:"perimeter-scanner",status:"Production",usage:"medium"},
        {name:"/perimeter/compliance",category:"Perimeter",description:"NIS2 and ZKB compliance assessment with gap analysis",authority:"L2+",agent:"compliance-checker",status:"Production",usage:"medium"},
        {name:"/perimeter/easm",category:"Perimeter",description:"Advanced EASM dashboard with security ratings (A-F)",authority:"L3",agent:"perimeter-scanner",status:"Production",usage:"medium"},

        // ===== API =====
        {name:"/prismatic-api status",category:"API",description:"Prismatic API auto-introspecting REST gateway status",authority:"L2+",agent:"elixir-core-specialist",status:"Production",usage:"medium"},
        {name:"/prismatic-api endpoints",category:"API",description:"List all auto-discovered API endpoints from facade modules",authority:"L2+",agent:"elixir-core-specialist",status:"Production",usage:"medium"},
        {name:"/prismatic-api rescan",category:"API",description:"Trigger endpoint re-scan of all Prismatic facade modules",authority:"L3",agent:"elixir-core-specialist",status:"Production",usage:"low"},
        {name:"/prismatic-api spec",category:"API",description:"Generate and view OpenAPI 3.0 specification",authority:"L2+",agent:"elixir-core-specialist",status:"Production",usage:"low"}
    ];
}
