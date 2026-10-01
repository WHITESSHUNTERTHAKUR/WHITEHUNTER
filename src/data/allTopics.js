import { RAW_CURRICULUM, FULL_DOMAINS } from './fullCurriculum.js';
import { getQuestionsForTopic } from './questionsPool.js';

export const DOMAINS = FULL_DOMAINS;

// Helper to generate 15 rich, simple-language Q&A pairs for every topic
function generatePhase2Questions(raw) {
  const t = raw.title;

  return [
    {
      id: `${raw.id}-qa01`,
      category: 'Foundational',
      question: `What is the core purpose of ${t} in simple words?`,
      question_hi: `${t} ka aasan shabdo me mukhya kaam kya hota hai?`,
      answer: `In simple terms, ${t} defines how systems communicate, establish trust, or protect sensitive data. Without proper controls here, unauthorized users can intercept or manipulate data.`,
      answer_hi: `Aasan shabdo me, ${t} computer ya network ke beech surakshit connection aur communication banaye rakhne ka kaam karta hai taaki koi anjaan vyakti data na chura sake.`,
      explanation: `Understanding the fundamental purpose helps you see why security controls at this layer are indispensable for any organization.`,
      tacticalTip: `Always configure security settings before placing any device onto a live network.`
    },
    {
      id: `${raw.id}-qa02`,
      category: 'Foundational',
      question: `Can you explain ${t} using an everyday real-world analogy?`,
      question_hi: `Kya aap ${t} ko rozmarra ki zindagi ke kisi aasan example se samjha sakte hain?`,
      answer: `Think of it like a secure apartment building. Doors are ports, access cards are tokens/passwords, and the security guard checking IDs is the firewall. If any lock is left open, intruders can enter without breaking the front gate.`,
      answer_hi: `Ise ek secure colony ya building ki tarah samjhein jahan security guard (firewall) har aane-jaane wale ki checking karta hai aur locks (passwords) darwazo ko surakshit rakhte hain.`,
      explanation: `Real-world analogies help simplify complex technical layers into intuitive security concepts.`,
      tacticalTip: `Map every technical concept to physical security: locks, guards, alarms, and visitor logs.`
    },
    {
      id: `${raw.id}-qa03`,
      category: 'Operational / Scenario',
      question: `How do cyber attackers try to exploit or bypass ${t}?`,
      answer: `Attackers typically look for three weaknesses: default passwords left unchanged, unpatched software bugs, and missing input or cryptographic validation.`,
      answer_hi: `Attackers teen galtiyon ka fayda uthate hain: default password na badalna, puraane bina-update wale software, aur missing security checks.`,
      explanation: `Adversaries always seek the easiest entry point; automated bots scan millions of IPs daily looking for known flaws.`,
      tacticalTip: `Never expose administration panels or default ports directly to the public internet.`
    },
    {
      id: `${raw.id}-qa04`,
      category: 'Defense & Hardening',
      question: `What are the top defensive measures to protect ${t}?`,
      answer: `1. Enforce Multi-Factor Authentication (MFA).\n2. Apply the Principle of Least Privilege.\n3. Keep all systems updated with latest security patches.\n4. Segment networks so a breach in one area cannot spread.`,
      answer_hi: `1. MFA (Two-Step Verification) chalu karein.\n2. Sabhi ko sirf utna hi access dein jitna kaam ke liye zaroori hai.\n3. Software updates hamesha install rakhein.\n4. Alag-alag networks me partition (segmentation) karein.`,
      explanation: `Layered defense (Defense-in-Depth) ensures that even if one control fails, another stops the threat.`,
      tacticalTip: `Isolate administrative access on an out-of-band management network with strict IP whitelisting.`
    },
    {
      id: `${raw.id}-qa05`,
      category: 'SOC & Monitoring',
      question: `What alerts should a SOC analyst watch for regarding ${t}?`,
      answer: `Analysts should watch for repeated failed login attempts, unusual traffic spikes at odd hours, unauthorized configuration changes, and outbound connections to suspicious foreign IP addresses.`,
      answer_hi: `SOC analyst ko baar-baar galat password enter hona, raat me achanak traffic badhna, aur kisi anjaan videshi IP par data bhejne jaise alerts par turant dhyan dena chahiye.`,
      explanation: `Early detection in SIEM dashboards stops an attacker before they can steal data or plant ransomware.`,
      tacticalTip: `Automate alerts so critical threshold violations immediately notify on-duty analysts via phone or SMS.`
    },
    {
      id: `${raw.id}-qa06`,
      category: 'Operational / Scenario',
      question: `If an alert is triggered in ${t}, what is the first containment step?`,
      answer: `Immediately isolate the affected device from the local network (disconnect Wi-Fi/Ethernet cable or apply network quarantine) to prevent lateral movement to other machines, but do NOT turn off the power to preserve volatile RAM evidence.`,
      answer_hi: `Turant us computer ko network se alag karein (cable ya Wi-Fi disconnect karein) taaki virus doosre computer me na faile, par computer ko shut down na karein taaki RAM ka saboot bacha rahe.`,
      explanation: `Volatile RAM contains encryption keys, running malware processes, and network connection states needed for digital forensics.`,
      tacticalTip: `Create an automated one-click host isolation rule in your EDR (Endpoint Detection and Response) console.`
    },
    {
      id: `${raw.id}-qa07`,
      category: 'Defense & Hardening',
      question: `Why is the Principle of Least Privilege critical for ${t}?`,
      answer: `Because users and programs should only have the bare minimum permissions necessary to do their job. If a regular user account is compromised, the attacker cannot make system-wide changes without administrative privilege escalation.`,
      answer_hi: `Kyunki har user aur program ko sirf utni hi permission honi chahiye jitni zaroori hai. Agar kisi aam user ka account hack bhi ho jaye, to hacker poore system ko nuksan nahi pahuncha payega.`,
      explanation: `Restricting administrative rights neutralizes 85% of commodity malware strains immediately.`,
      tacticalTip: `Never perform daily web browsing or email reading from a domain administrator account.`
    },
    {
      id: `${raw.id}-qa08`,
      category: 'Foundational',
      question: `What standard ports or protocols are associated with ${t}?`,
      answer: `Common network services operate on standard IANA ports: HTTP on 80, HTTPS on 443, SSH on 22, DNS on 53, and RDP on 3389. Defense teams must close all ports not explicitly in use.`,
      answer_hi: `Internet par alag-alag services alag-alag darwazo (ports) par chalti hain jaise web browsing ke liye 80 aur 443, remote login ke liye 22 aur 3389. Faltu sabhi ports hamesha band rakhne chahiye.`,
      explanation: `Attackers run automated port scanners like Nmap to find forgotten open ports that can be breached.`,
      tacticalTip: `Run monthly external port scans against your public IP range to find accidental exposures.`
    },
    {
      id: `${raw.id}-qa09`,
      category: 'Tools & Practical',
      question: `Which diagnostic and security tools are commonly used for ${t}?`,
      answer: `Key tools include Wireshark for packet capture, Nmap for network scanning, Netstat and TCPView for inspecting active connections, and PowerShell or Bash for security log auditing.`,
      answer_hi: `Packets check karne ke liye Wireshark, scanning ke liye Nmap, open connections dekhne ke liye Netstat, aur logs check karne ke liye PowerShell sabse aam tools hain.`,
      explanation: `Mastering command-line and analysis tools allows analysts to inspect raw traffic without relying solely on automated alerts.`,
      tacticalTip: `Learn Wireshark display filters like \`tcp.flags.syn == 1 && tcp.flags.ack == 0\` for spotting connection requests.`
    },
    {
      id: `${raw.id}-qa10`,
      category: 'Defense & Hardening',
      question: `What is Defense-in-Depth and how does it apply here?`,
      answer: `Defense-in-Depth means using multiple defensive layers (perimeter firewall, endpoint antivirus, host firewall, encryption, and employee training). If an attacker gets past one layer, the next layer stops them.`,
      answer_hi: `Defense-in-Depth ka matlab hai security ki kayi layers lagana. Agar attacker ek darwaza tod bhi le, to aage dusra lock aur camera use rok lein.`,
      explanation: `No single security software is 100% effective; multiple overlapping controls provide true resilience.`,
      tacticalTip: `Never rely solely on perimeter firewalls; assume perimeter breach and harden internal endpoints.`
    },
    {
      id: `${raw.id}-qa11`,
      category: 'Interview Special',
      question: `Interview Question: How would you explain the difference between a vulnerability, an exploit, and a threat?`,
      answer: `A vulnerability is a weakness or flaw in the system (e.g. an open window). A threat is a potential actor or event that might cause harm (e.g. a burglar). An exploit is the specific method or tool used to take advantage of the vulnerability (e.g. a ladder to climb into the open window).`,
      answer_hi: `Vulnerability matlab system me kamzori (jaise khula darwaza). Threat matlab nuksan pahunchane wala vyakti (jaise chor). Exploit matlab us kamzori ka fayda uthane ka tareeqa (jaise khule darwaze se andar ghusna).`,
      explanation: `This is one of the most common fundamental questions asked in cybersecurity and SOC interview rounds.`,
      tacticalTip: `Always remember: Risk = Threat × Vulnerability × Impact.`
    },
    {
      id: `${raw.id}-qa12`,
      category: 'Operational / Scenario',
      question: `How do you verify whether a service in ${t} is genuinely down or being blocked by a firewall?`,
      answer: `Use tools like \`Test-NetConnection -ComputerName <target> -Port <port>\` in PowerShell or \`nc -zv <target> <port>\` in Linux. If ping succeeds but the port times out with SYN-sent, a firewall is likely dropping the packets.`,
      answer_hi: `PowerShell me \`Test-NetConnection\` ya Linux me \`nc\` chala kar port check karein. Agar ping chal raha hai par port timeout ho raha hai, to firewall use block kar raha hai.`,
      explanation: `Differentiating between transport-layer network drops and application service crashes is a daily operational skill.`,
      tacticalTip: `Always check local host firewalls (Windows Defender Firewall or UFW/iptables) before troubleshooting physical routers.`
    },
    {
      id: `${raw.id}-qa13`,
      category: 'Compliance & Guidelines',
      question: `What are the reporting timelines and compliance rules during an incident?`,
      answer: `Under Indian statutory guidelines (CERT-In 2022 directives), critical cyber security incidents must be formally reported within 6 hours of discovery, and organization audit logs must be preserved securely for at least 180 days.`,
      answer_hi: `Sarkari niyam (CERT-In 2022) ke mutabiq, kisi bhi bade cyber attack ki jaankari 6 ghante ke andar deni hoti hai, aur sabhi computer logs kam se kam 180 dino tak surakshit rakhne hote hain.`,
      explanation: `Rapid incident reporting allows national cybersecurity coordination centers to alert other infrastructure before the threat spreads.`,
      tacticalTip: `Ensure all enterprise domain controllers and servers synchronize time with official NTP servers to maintain admissible court timestamps.`
    },
    {
      id: `${raw.id}-qa14`,
      category: 'Modern Tech & Cloud',
      question: `How does ${t} change when moving from on-premise servers to Cloud (AWS/Azure)?`,
      answer: `In the cloud, physical cabling and hardware are managed by the cloud provider (Shared Responsibility Model). You become responsible for identity permissions (IAM), security groups (virtual firewalls), API keys, and data encryption.`,
      answer_hi: `Cloud me physical wire aur computer ki zimmedari Amazon ya Microsoft ki hoti hai, par password, permissions aur virtual firewall ki setting hamari apni zimmedari hoti hai.`,
      explanation: `Over 90% of cloud security incidents are caused by customer misconfigurations rather than cloud provider vulnerabilities.`,
      tacticalTip: `Enable cloud configuration auditing tools like AWS CloudTrail and Azure Monitor from day one.`
    },
    {
      id: `${raw.id}-qa15`,
      category: 'Field Pro Tip',
      question: `What is the single most important golden rule for any cybersecurity practitioner?`,
      answer: `Never assume. Always verify. Keep tested offline backups of your most critical data, because no matter how strong your defenses are, human error or zero-day exploits can still happen.`,
      answer_hi: `Khabhi bhi andha vishwas na karein, hamesha verify karein. Aur apne zaroori data ka offline backup zaroor rakhein, taaki koi bhi attack aane par aapka data bacha rahe.`,
      explanation: `The 3-2-1 backup rule (3 copies, 2 different media types, 1 copy stored offline off-site) is the ultimate safeguard against total ransomware destruction.`,
      tacticalTip: `Regularly test restoring data from backups; an untested backup is not a real backup.`
    }
  ];
}

// Build the fully hydrated 52 topics with 3 complete phases each
export const ALL_TOPICS = RAW_CURRICULUM.map((raw, idx) => {
  // Phase 1 hydration with simple English and Hinglish content
  const phase1 = {
    overview: raw.overview,
    simpleExplanation: {
      en: `In simple terms: ${raw.overview}`,
      hi: `Aasan bhasha me: ${raw.overview}`
    },
    realWorldAnalogy: {
      en: `Think of ${raw.title} like home security: locks, keys, alarms, and guards working together so unauthorized people cannot enter.`,
      hi: `Ise ghar ki suraksha ki tarah samjhein: darwaza, taala, chaabi aur security guard milkar kaam karte hain taaki koi anjaan vyakti andar na aa sake.`
    },
    architecture: raw.architecture || `Tactical Architecture Matrix for ${raw.title}:\n[L7 Application Inspection] -> [L4 State-Tracking] -> [L3 Policy ACLs] -> [L2 Isolation]`,
    deepDive: raw.deepDive || `Detailed Protocol Deep Dive for ${raw.title}: Security specialists must analyze packet headers, state transitions, and cryptographic verification mechanisms to guarantee mission assurance.`,
    commands: [
      { label: `Verify Active Network Connections`, cmd: `netstat -ano | findstr ESTABLISHED` },
      { label: `Check Firewall Rules & Security Policies`, cmd: `Get-NetFirewallRule -DisplayName "*Defense*" | Select-Object -First 5` },
      { label: `Audit Security Log Telemetry in PowerShell`, cmd: `Get-WinEvent -LogName Security -MaxEvents 5` },
      { label: `Test Port Connectivity & Latency`, cmd: `Test-NetConnection -ComputerName 127.0.0.1 -Port 80` }
    ],
    realWorldCaseStudy: {
      title: raw.caseStudyTitle || `Operational Case Study: ${raw.title}`,
      summary: raw.caseStudySummary || `Historical adversary exploitation demonstrated how failure to enforce controls in ${raw.title} led to critical mission failure.`,
      lesson: raw.caseStudyLesson || `Rigorous zero-trust controls and continuous monitoring are mandatory in contested environments.`
    },
    tacticalTakeaways: [
      `Enforce Least Privilege and continuous verification for ${raw.title}.`,
      `Monitor telemetry and session anomalies for indicators of adversary presence.`,
      `Maintain verified, out-of-band communication channels during active incident containment.`,
      `Keep software updated with latest patches within 72 hours of release.`,
      `Perform regular offline backups to defend against destructive ransomware.`
    ]
  };

  // Phase 2: 15 comprehensive questions in English & Hinglish
  const phase2 = generatePhase2Questions(raw);

  // Phase 3: At least 25 questions dynamically generated
  const phase3 = getQuestionsForTopic(raw);

  return {
    id: raw.id,
    domainId: raw.domainId,
    title: raw.title,
    level: raw.level,
    readTime: raw.readTime,
    tags: raw.tags || ['Cyber Defense', 'Security Training'],
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
