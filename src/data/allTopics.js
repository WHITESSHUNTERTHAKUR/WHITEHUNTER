import { RAW_CURRICULUM, FULL_DOMAINS } from './fullCurriculum.js';
import { getQuestionsForTopic } from './questionsPool.js';

export const DOMAINS = FULL_DOMAINS;

// Build the fully hydrated 52 topics with 3 complete phases each
export const ALL_TOPICS = RAW_CURRICULUM.map((raw, idx) => {
  // Phase 1 hydration
  const phase1 = {
    overview: raw.overview,
    architecture: raw.architecture || `Tactical Architecture Matrix for ${raw.title}:\n[L7 Application Inspection] -> [L4 State-Tracking] -> [L3 Policy ACLs] -> [L2 Isolation]`,
    deepDive: raw.deepDive || `Detailed Protocol Deep Dive for ${raw.title}: Tactical operators must analyze packet headers, state transitions, and cryptographic verification mechanisms to guarantee mission assurance.`,
    commands: [
      { label: `Verify Baseline Status for ${raw.title}`, cmd: `netstat -ano | findstr ESTABLISHED` },
      { label: `Check Defense Access Control Policy`, cmd: `Get-NetFirewallRule -DisplayName "*Defense*" | Select-Object -First 5` },
      { label: `Audit Security Log Telemetry in PowerShell`, cmd: `Get-WinEvent -LogName Security -MaxEvents 5` }
    ],
    realWorldCaseStudy: {
      title: raw.caseStudyTitle || `Operational Case Study: ${raw.title}`,
      summary: raw.caseStudySummary || `Historical adversary exploitation demonstrated how failure to enforce controls in ${raw.title} led to critical mission failure.`,
      lesson: raw.caseStudyLesson || `Rigorous zero-trust controls and continuous monitoring are mandatory in contested environments.`
    },
    tacticalTakeaways: [
      `Enforce Least Privilege and continuous verification for ${raw.title}.`,
      `Monitor telemetry and session anomalies for indicators of adversary presence.`,
      `Maintain verified, out-of-band communication channels during active incident containment.`
    ]
  };

  // Phase 2: Important Questions & Answers
  const phase2 = [
    {
      id: `${raw.id}-qa01`,
      category: 'Foundational',
      question: `What is the fundamental operational objective of ${raw.title}?`,
      answer: raw.overview,
      explanation: `Understanding the theoretical and structural foundation of ${raw.title} ensures proper implementation of defensive controls.`,
      tacticalTip: `Always establish a clean configuration baseline before deploying to field operational environments.`
    },
    {
      id: `${raw.id}-qa02`,
      category: 'Operational / Scenario',
      question: `How does an adversary attempt to exploit or bypass defenses in ${raw.title}?`,
      answer: `Adversaries exploit misconfigurations, missing cryptographic validation, unpatched software, or architectural assumptions to bypass controls.`,
      explanation: `Threat actors seek the path of least resistance; proactive defense requires identifying and eliminating single points of failure.`,
      tacticalTip: `Conduct regular Red vs Blue adversary simulation exercises against ${raw.title}.`
    },
    {
      id: `${raw.id}-qa03`,
      category: 'Military & Defense Focus',
      question: `In a high-intensity contested cyber conflict, what is the primary risk associated with ${raw.title}?`,
      answer: `The primary risk is loss of Command and Control (C2) integrity, denial of service across tactical communications, or silent exfiltration of battle-space telemetry.`,
      explanation: `Cyber warfare operates at the speed of light; disruption of tactical telemetry degrades physical combat readiness.`,
      tacticalTip: `Deploy hardware-based optical data diodes and cryptographic key zeroization procedures.`
    },
    {
      id: `${raw.id}-qa04`,
      category: 'Foundational',
      question: `What primary security metrics should a SOC analyst monitor when defending ${raw.title}?`,
      answer: `Analysts should track anomalous connection volumes, authentication failure spikes, unauthorized configuration changes, and unexpected egress beacons.`,
      explanation: `Continuous security telemetry provides early warning before an adversary completes their kill-chain.`,
      tacticalTip: `Automate SIEM correlation rules aligned to the MITRE ATT&CK enterprise matrix.`
    },
    {
      id: `${raw.id}-qa05`,
      category: 'Operational / Scenario',
      question: `What legal and compliance frameworks govern the security of ${raw.title} in national defense?`,
      answer: `Operations are governed by CERT-In directives, NCIIPC critical infrastructure guidelines, the IT Act 2000, and Armed Forces Cyber Orders.`,
      explanation: `Mandatory reporting within 6 hours and 180-day log retention ensure statutory compliance and national threat correlation.`,
      tacticalTip: `Synchronize all system clocks with official NPL/NIC NTP servers to preserve forensic timestamp validity.`
    }
  ];

  // Phase 3: At least 25 questions dynamically generated
  const phase3 = getQuestionsForTopic(raw);

  return {
    id: raw.id,
    domainId: raw.domainId,
    title: raw.title,
    level: raw.level,
    readTime: raw.readTime,
    tags: raw.tags || ['Cyber Defense', 'Tactical Training'],
    phase1,
    phase2,
    phase3
  };
});

// Helper to get topic by ID
export function getTopicById(id) {
  return ALL_TOPICS.find(t => t.id === id) || ALL_TOPICS[0];
}

// Helper to get topics by Domain
export function getTopicsByDomain(domainId) {
  if (!domainId || domainId === 'all') return ALL_TOPICS;
  return ALL_TOPICS.filter(t => t.domainId === domainId);
}

// Global search across all 52 topics
export function searchTopics(query) {
  if (!query || query.trim() === '') return ALL_TOPICS;
  const q = query.toLowerCase().trim();
  return ALL_TOPICS.filter(topic => {
    return (
      topic.title.toLowerCase().includes(q) ||
      topic.tags.some(tag => tag.toLowerCase().includes(q)) ||
      topic.phase1.overview.toLowerCase().includes(q) ||
      topic.phase2.some(qa => qa.question.toLowerCase().includes(q) || qa.answer.toLowerCase().includes(q))
    );
  });
}
