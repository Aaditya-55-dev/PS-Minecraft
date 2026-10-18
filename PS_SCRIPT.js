const problemStatementsData = [
  {
    id: 'web3',
    trackBadge: '[ TRACK: WEB3 ]',
    trackName: 'WEB3',
    title: 'DECENTRALIZED REALM GOVERNANCE',
    overview: [
      'Decentralized Autonomous Organizations and on-chain guilds struggle with voter apathy, plutocratic token-weighted governance, and vulnerable treasury management protocols. In open virtual metaverses, decisions require both democratic consensus and automated cryptographic enforcement to protect community assets from rogue manipulation.',
      'Hackfusion participants are tasked with architecting a verifiable, tamper-resistant realm governance protocol. The system must coordinate quadratic voting mechanisms, time-locked multi-sig escrow vaults, and verifiable on-chain proposal execution for multi-tiered autonomous organizations.'
    ],
    deliverables: [
      'Smart contracts implementing sybil-resistant quadratic voting ballots',
      'Time-locked treasury execution vault requiring multi-signature threshold authorization',
      'On-chain delegation framework with liquid voting power mechanics',
      'Interactive frontend portal showing active ballots, quorum progress, and treasury balances',
      'Verifiable audit trail logging proposal status and cryptographic execution proofs'
    ],
    techStack: [
      'Solidity',
      'Ethereum / Polygon',
      'Ethers.js / Viem',
      'IPFS / Arweave',
      'The Graph',
      'OpenZeppelin'
    ],
    criteria: [
      { label: 'Innovation & Mechanism Design', percentage: '30%' },
      { label: 'Technical Execution & Smart Contract Security', percentage: '30%' },
      { label: 'Feasibility & Architecture Scalability', percentage: '20%' },
      { label: 'UI/UX & Presentation Quality', percentage: '20%' }
    ]
  },
  {
    id: 'ai-agents',
    trackBadge: '[ TRACK: AI & AGENTS ]',
    trackName: 'AI & AGENTS',
    title: 'AUTONOMOUS NPC ECOSYSTEM',
    overview: [
      'Virtual sandbox environments often suffer from scripted, predictable non-player characters that fail to realistically adapt to player behaviors, market shocks, and evolving world conditions. Traditional state-machine AI lacks persistent episodic memory and contextual goal planning.',
      'Your objective is to construct an autonomous swarm ecosystem of cognitive AI agents operating within an open simulated economy. Agents must perceive spatial stimuli, negotiate resource exchanges, maintain dynamic social relationships, and collaborate or compete to fulfill self-generated long-term goals.'
    ],
    deliverables: [
      'Multi-agent cognitive decision pipeline with long-term vector memory retrieval',
      'Autonomous barter and market pricing negotiation engine driven by resource supply/demand',
      'Real-time LLM inference coordinator optimizing token efficiency and agent latency',
      'Interactive agent monitoring dashboard visualising spatial paths, thoughts, and dialogues',
      'Emergent behavior stress test evaluating agent survival and coordination under scarcity'
    ],
    techStack: [
      'Python',
      'FastAPI',
      'LangChain / LlamaIndex',
      'ChromaDB / Pinecone',
      'WebSockets',
      'OpenAI / Anthropic APIs'
    ],
    criteria: [
      { label: 'Autonomy & Cognitive Depth', percentage: '30%' },
      { label: 'Technical Execution & Latency Management', percentage: '30%' },
      { label: 'Economic Model & Swarm Feasibility', percentage: '20%' },
      { label: 'Visual Dashboard & Live Demo', percentage: '20%' }
    ]
  },
  {
    id: 'cybersecurity',
    trackBadge: '[ TRACK: CYBERSECURITY ]',
    trackName: 'CYBERSECURITY',
    title: 'REDSTONE CIPHER VAULT',
    overview: [
      'Distributed peer-to-peer infrastructure is increasingly vulnerable to sophisticated man-in-the-middle exploits, state tampering, and adversarial packet injection. Centralized intrusion prevention systems introduce single points of failure and privacy leaks when inspecting sensitive network telemetry.',
      'Build a decentralized Zero-Knowledge intrusion detection and automated mitigation vault. The solution must cryptographically verify incoming node transactions, generate succinct zero-knowledge proofs for security compliance, and isolate anomalous peer nodes without revealing confidential payload data.'
    ],
    deliverables: [
      'Zero-knowledge proof generator for private payload anomaly verification',
      'Real-time peer-to-peer packet sniffing and heuristic intrusion classification engine',
      'Automated quarantine and consensus-driven blacklist synchronization network',
      'Cryptographic verification bench validating zero-knowledge proof validity under 200ms',
      'Security incident response dashboard featuring active threat telemetry and mitigation logs'
    ],
    techStack: [
      'Rust',
      'Circom / SnarkJS',
      'libp2p',
      'WebAssembly',
      'TypeScript',
      'Docker'
    ],
    criteria: [
      { label: 'Cryptographic Rigor & Zero-Knowledge Validity', percentage: '30%' },
      { label: 'Technical Execution & Performance Overhead', percentage: '30%' },
      { label: 'Resilience & Adversarial Robustness', percentage: '20%' },
      { label: 'Documentation & Threat Model Analysis', percentage: '20%' }
    ]
  }
];

const selectButtons = document.querySelectorAll('.card-action .pixel-btn');
const toastNotification = document.getElementById('toastNotification');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalTrackBadge = document.getElementById('modalTrackBadge');
const modalTitle = document.getElementById('modalTitle');
const modalOverview = document.getElementById('modalOverview');
const modalDeliverables = document.getElementById('modalDeliverables');
const modalTechStack = document.getElementById('modalTechStack');
const modalCriteria = document.getElementById('modalCriteria');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalCancelBtn = document.getElementById('modalCancelBtn');
const modalConfirmBtn = document.getElementById('modalConfirmBtn');

let toastTimeoutId = null;
let currentSelectedTrack = '';

function displayTrackToast(trackName) {
  toastNotification.textContent = 'Track Selected: ' + trackName;
  toastNotification.classList.add('toast-visible');

  if (toastTimeoutId) {
    clearTimeout(toastTimeoutId);
  }

  toastTimeoutId = setTimeout(() => {
    toastNotification.classList.remove('toast-visible');
  }, 3000);
}

function populateModal(data) {
  modalTrackBadge.textContent = data.trackBadge;
  modalTitle.textContent = data.title;
  currentSelectedTrack = data.trackName;

  modalOverview.innerHTML = '';
  data.overview.forEach(paragraphText => {
    const paragraph = document.createElement('p');
    paragraph.textContent = paragraphText;
    modalOverview.appendChild(paragraph);
  });

  modalDeliverables.innerHTML = '';
  data.deliverables.forEach(itemText => {
    const listItem = document.createElement('li');
    listItem.textContent = itemText;
    modalDeliverables.appendChild(listItem);
  });

  modalTechStack.innerHTML = '';
  data.techStack.forEach(techName => {
    const pill = document.createElement('span');
    pill.className = 'tech-pill';
    pill.textContent = techName;
    modalTechStack.appendChild(pill);
  });

  modalCriteria.innerHTML = '';
  data.criteria.forEach(item => {
    const row = document.createElement('tr');
    const labelCell = document.createElement('td');
    labelCell.textContent = item.label;
    const weightCell = document.createElement('td');
    weightCell.className = 'weight-col';
    weightCell.textContent = item.percentage;
    row.appendChild(labelCell);
    row.appendChild(weightCell);
    modalCriteria.appendChild(row);
  });
}

function openModal(data) {
  populateModal(data);
  modalBackdrop.classList.add('modal-active');
  modalBackdrop.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  const modalBody = modalBackdrop.querySelector('.modal-body');
  if (modalBody) {
    modalBody.scrollTop = 0;
  }
}

function closeModal() {
  modalBackdrop.classList.remove('modal-active');
  modalBackdrop.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

function handleSelectClick(event) {
  const button = event.currentTarget;
  const card = button.closest('.parchment-card') || button.closest('.card-container');
  const cardId = card.dataset.id;
  const trackName = card.dataset.track;

  const problemData = problemStatementsData.find(item => item.id === cardId) ||
    problemStatementsData.find(item => item.trackName === trackName) ||
    problemStatementsData[0];

  openModal(problemData);
}

function handleConfirmSelection() {
  displayTrackToast(currentSelectedTrack);
  setTimeout(closeModal, 1000);
}

selectButtons.forEach(button => {
  button.addEventListener('click', handleSelectClick);
});

modalCloseBtn.addEventListener('click', closeModal);
modalCancelBtn.addEventListener('click', closeModal);
modalConfirmBtn.addEventListener('click', handleConfirmSelection);

modalBackdrop.addEventListener('click', event => {
  if (event.target === modalBackdrop) {
    closeModal();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modalBackdrop.classList.contains('modal-active')) {
    closeModal();
  }
});
