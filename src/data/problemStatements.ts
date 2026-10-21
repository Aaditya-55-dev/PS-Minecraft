import { ProblemStatement } from '../types.ts';

export const PROBLEM_STATEMENTS: ProblemStatement[] = [
  {
    id: 'track-1-agentic-ai',
    trackNumber: 'TRACK 01',
    title: 'Nether-Scale AI & Autonomous Agent Swarms',
    category: 'Autonomous Agents & Distributed Systems',
    difficulty: 'Master',
    material: 'oak',
    themeColor: '#8b5a2b',
    accentColor: '#f59e0b',
    lore: 'Deep in the fiery nether of decentralized compute, lone machines struggle against chaos. Only coordinated swarms can navigate the perils.',
    excerpt: 'Architect self-orchestrating multi-agent systems using Gemini models that coordinate distributed workflows, negotiate tasks, and achieve self-healing recovery without central failure points.',
    overview: 'Build an autonomous agent network where specialized digital workers collaborate on complex engineering workflows. Each agent must maintain bounded context, execute real-world tool calls, verify peer outputs via cryptographic consensus, and adaptively recover from node failures.',
    keyObjectives: [
      'Implement multi-agent turn arbitration with dynamic role delegation using Gemini 2.5/Flash APIs.',
      'Construct a zero-bottleneck peer consensus mechanism for task handoffs and validation.',
      'Deploy human-in-the-loop authorization gates for high-stakes tool execution.',
      'Benchmark token consumption, latency budgets, and recovery rate under simulated failures.'
    ],
    techStack: [
      'Google GenAI SDK',
      'Gemini 2.5 Flash',
      'Cloud Run Functions',
      'Firebase Firestore',
      'TypeScript'
    ],
    deliverables: [
      'Working multi-agent simulation sandbox demo with interactive task visualization.',
      'Comprehensive architecture diagram and protocol specification document.',
      'Stress-test benchmark logs demonstrating self-healing capability upon worker failure.',
      'Production-ready GitHub repository with local reproducible environment.'
    ],
    rubric: [
      { criterion: 'Agent Autonomy & Coordination', weight: 30 },
      { criterion: 'Tool Calling & Error Resilience', weight: 25 },
      { criterion: 'Real-World Practical Utility', weight: 25 },
      { criterion: 'Architecture Cleanliness & Code Craft', weight: 20 }
    ],
    bountyReward: '128 Netherite Ingots + Cloud Credits + GDG Trophy'
  },
  {
    id: 'track-2-overworld-eco',
    trackNumber: 'TRACK 02',
    title: 'Overworld Eco-Grid & Smart Habitat Telemetry',
    category: 'Spatial Telemetry & Urban Sustainability',
    difficulty: 'Intermediate',
    material: 'stone',
    themeColor: '#5c6368',
    accentColor: '#10b981',
    lore: 'The overworld biome teeters on delicate balances. Biome conservation requires keen eyes in the sky and real-time roots in the earth.',
    excerpt: 'Develop intelligent spatial telemetry and predictive resource distribution platforms that balance urban micro-grids, forecast ecological risks, and empower localized conservation.',
    overview: 'Harness environmental sensor streams and Google Maps Platform geospatial data to solve urban climate vulnerabilities. Teams must build an actionable monitoring engine that translates raw air, heat, and energy telemetry into proactive mitigation routes.',
    keyObjectives: [
      'Integrate environmental APIs to map urban heat islands and localized air quality discrepancies.',
      'Model predictive renewable energy distribution across simulated residential micro-grids.',
      'Provide dispatchable route recommendations and proactive alert triggers for municipal response teams.',
      'Ensure high-density spatial rendering with smooth mobile responsiveness and offline caching.'
    ],
    techStack: [
      'Google Maps Platform',
      'Air Quality & Solar APIs',
      'Google Cloud Pub/Sub',
      'React & Tailwind CSS',
      'WebSockets'
    ],
    deliverables: [
      'Interactive geo-spatial dashboard showing live multi-layer environmental metrics.',
      'Machine learning model or algorithmic heuristic for predictive resource load balancing.',
      'Simulated incident response scenario with automatic mitigation routing.',
      'Full documentation covering data normalization and API integration steps.'
    ],
    rubric: [
      { criterion: 'Ecological Impact & Relevance', weight: 30 },
      { criterion: 'Spatial Data Visualization & UX', weight: 25 },
      { criterion: 'Algorithmic Accuracy & Heuristics', weight: 25 },
      { criterion: 'Technical Completeness', weight: 20 }
    ],
    bountyReward: '64 Emerald Blocks + Green Tech Mentorship + Fast-Track Review'
  },
  {
    id: 'track-3-redstone-security',
    trackNumber: 'TRACK 03',
    title: 'Redstone Defense & Decentralized Zero-Trust',
    category: 'Cybersecurity & Verifiable Identity',
    difficulty: 'Master',
    material: 'deepslate',
    themeColor: '#363442',
    accentColor: '#ef4444',
    lore: 'A single cracked repeater compromises the entire stronghold. Build gates so unyielding that no phantom exploit can breach the realm.',
    excerpt: 'Design cryptographic zero-trust verification engines and automated vulnerability detectors to shield sensitive data pipelines and digital identities from adversarial exploitation.',
    overview: 'Create a next-generation security perimeter for decentralized applications and distributed data pipelines. Solution must combine hardware-backed authentication (WebAuthn/Passkeys) with automated anomaly detection to prevent credential stuffing and token hijack.',
    keyObjectives: [
      'Architect a frictionless biometric zero-trust authentication flow using WebAuthn standards.',
      'Implement real-time behavioral anomaly scoring for streaming session packets.',
      'Generate immutable, tamper-evident audit trails verifiable across distributed parties.',
      'Construct an interactive sandbox demonstrating attack vectors and real-time mitigations.'
    ],
    techStack: [
      'WebAuthn / Passkeys',
      'Google Cloud Security Command',
      'OAuth 2.0 PKCE',
      'TypeScript',
      'Tailwind CSS'
    ],
    deliverables: [
      'Live zero-trust login portal demonstrating biometric registration and hardware assertion.',
      'Real-time attack simulation console showing live exploit prevention.',
      'Formal security boundary breakdown and threat mitigation matrix.',
      'Audited open-source codebase with comprehensive unit and penetration tests.'
    ],
    rubric: [
      { criterion: 'Cryptographic Soundness & Robustness', weight: 35 },
      { criterion: 'Threat Modeling & Anomaly Coverage', weight: 25 },
      { criterion: 'Frictionless Developer & User Experience', weight: 20 },
      { criterion: 'Documentation & Test Coverage', weight: 20 }
    ],
    bountyReward: '64 Redstone Blocks + Security Fellowship + GDG Flagship Badge'
  }
];
