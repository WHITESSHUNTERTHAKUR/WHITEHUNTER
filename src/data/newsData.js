// CYBER WARRIORS DEFENSE COMMAND - Live Cyber Threat Intelligence & News Feed
// Multi-Domain Real-Time Bulletins: Cyber Crime, IT & Tech, Networking, General Computer, and India CERT-In

export const THREAT_LEVELS = {
  CURRENT: 'DEFCON 3 - ELEVATED TACTICAL READINESS',
  CODE: 'YELLOW-ALPHA',
  ACTIVE_CAMPAIGNS: 34,
  CERT_IN_ALERTS: 18
};

export const INITIAL_NEWS_DATA = [
  // ==========================================
  // 1. CYBER CRIME & THREAT INTEL
  // ==========================================
  {
    id: 'news-crime-01',
    category: 'Cyber Crime',
    domain: 'cybercrime',
    region: 'Global',
    severity: 'CRITICAL',
    title: 'Adversaries Exploit Zero-Day Flaws in Enterprise Gateways to Deploy Web Shells',
    source: 'The Hacker News Threat Wire',
    url: 'https://thehackernews.com/',
    timestamp: 'Just Now',
    date: '2026-09-30',
    cve: 'CVE-2026-38411 (Remote Code Execution)',
    summary: 'Active cybercrime syndicates and state-sponsored APT groups are exploiting authentication bypass and remote code execution vulnerabilities across enterprise boundary gateways to drop persistent web shells.',
    affectedSystems: ['Enterprise Edge Gateways', 'SSL-VPN Concentrators', 'DMZ Web Servers'],
    threatActor: 'Volt Typhoon / Storm-0558 Affiliate Clusters',
    content: `Security researchers and cybercrime tracking units report that attackers are weaponizing zero-day deserialization vulnerabilities in perimeter appliances. Once exploited, the threat actors execute commands with root privileges, deploy stealth web shells, dump LSASS credentials, and initiate lateral movement.

Operational Containment Directives:
1. Immediately review edge firewall ingress logs for anomalous POST requests to administrative endpoints.
2. Terminate all active administrative sessions and force certificate-based MFA.
3. Check web roots for newly created unauthorized .php, .jsp, or .ashx files.`,
    mitigationChecklist: [
      'Isolate affected perimeter gateway management interfaces',
      'Revoke and re-issue all SSL certificates and admin tokens',
      'Audit outbound egress connections for unrecognized command-and-control IP addresses'
    ]
  },
  {
    id: 'news-crime-02',
    category: 'Cyber Crime',
    domain: 'cybercrime',
    region: 'Global',
    severity: 'CRITICAL',
    title: 'LockBit & RansomHub Syndicates Deploy EDR-Bypass Drivers via BYOVD Technique',
    source: 'BleepingComputer Cybersecurity News',
    url: 'https://www.bleepingcomputer.com/news/security/',
    timestamp: '1 hour ago',
    date: '2026-09-30',
    cve: 'BYOVD (Bring Your Own Vulnerable Driver)',
    summary: 'Ransomware cartels are executing automated BYOVD campaigns, utilizing legitimately signed older hardware drivers to disable Windows Defender, CrowdStrike, and SentinelOne endpoint protection prior to encrypting file servers.',
    affectedSystems: ['Windows 10 / 11 / Server 2022 Kernel', 'Enterprise File Servers'],
    threatActor: 'RansomHub / LockBit 3.0 Syndicate',
    content: `Forensic investigations into recent ransomware incidents reveal attackers delivering legitimately signed Microsoft-whitelisted drivers that harbor known memory read/write primitives. The malware executes kernel-mode commands to unhook EDR notification callbacks, leaving endpoints unprotected before deploying mass encryption routines.

Technical Mitigation:
1. Enable Hypervisor-Protected Code Integrity (HVCI) and Memory Integrity in Windows Security.
2. Enforce the Microsoft Recommended Driver Blocklist via Windows Defender Application Control (WDAC).
3. Monitor Windows Event ID 7045 and Sysmon Event ID 6 for newly registered services loading unexpected drivers.`,
    mitigationChecklist: [
      'Turn on Memory Integrity / HVCI in BIOS and Windows',
      'Deploy WDAC kernel driver blocklist policy',
      'Inspect kernel-mode driver loads for unapproved hashes'
    ]
  },
  {
    id: 'news-crime-03',
    category: 'Cyber Crime',
    domain: 'cybercrime',
    region: 'Global',
    severity: 'HIGH',
    title: 'CISA Adds New Actively Exploited Vulnerabilities to Known Exploited Catalog',
    source: 'CISA Security Advisories',
    url: 'https://www.cisa.gov/known-exploited-vulnerabilities-catalog',
    timestamp: '3 hours ago',
    date: '2026-09-30',
    cve: 'CISA KEV Catalog Directive',
    summary: 'The Cybersecurity and Infrastructure Security Agency has updated its Known Exploited Vulnerabilities catalog with flaws actively targeted by ransomware operators and cyber extortionists.',
    affectedSystems: ['Virtualization Platforms', 'Remote Desktop Gateways', 'Network Appliances'],
    threatActor: 'Financially Motivated Cybercrime Networks',
    content: `CISA has mandated all federal executive branch agencies and commercial enterprise operators patch newly listed catalog vulnerabilities within 21 days. The vulnerabilities involve privilege escalation in hypervisors and unauthenticated file upload capabilities in corporate content management platforms.`,
    mitigationChecklist: [
      'Cross-check enterprise software inventory against CISA KEV catalog',
      'Apply vendor security hotfixes without delay',
      'Restrict external access to management interfaces'
    ]
  },

  // ==========================================
  // 2. IT & TECH INDUSTRY
  // ==========================================
  {
    id: 'news-it-01',
    category: 'IT & Tech',
    domain: 'it',
    region: 'Global',
    severity: 'HIGH',
    title: 'Critical Remote Code Execution and Authentication Flaws Patched in Enterprise Mail Suites',
    source: 'Ars Technica Technology Lab',
    url: 'https://arstechnica.com/technology-lab/',
    timestamp: '2 hours ago',
    date: '2026-09-30',
    cve: 'CVE-2026-40122 (Authentication Bypass)',
    summary: 'Enterprise collaboration software and email platforms receive urgent emergency updates after researchers discover unauthenticated actors could harvest user authentication tokens and exfiltrate internal communications.',
    affectedSystems: ['Enterprise Collaboration Platforms', 'IMAP/SMTP Mail Servers', 'Cloud Mail Gateways'],
    threatActor: 'Corporate Espionage & Reconnaissance Actors',
    content: `An urgent patch release addresses a vulnerability in message parsing engines where malformed MIME attachments cause parser confusion, allowing remote execution of arbitrary server scripts. IT administrators must apply cumulative patches immediately and inspect server access logs for anomalous token extraction requests.`,
    mitigationChecklist: [
      'Deploy vendor collaboration server hotfix immediately',
      'Invalidate and regenerate all active session tokens',
      'Enable strict email attachment type filtering at edge MTA'
    ]
  },
  {
    id: 'news-it-02',
    category: 'IT & Tech',
    domain: 'it',
    region: 'Global',
    severity: 'INFO',
    title: 'Cloud IAM Privilege Escalation Vector Discovered in Automated CI/CD Deployment Pipelines',
    source: 'Ars Technica Tech & Open Source',
    url: 'https://arstechnica.com/',
    timestamp: '5 hours ago',
    date: '2026-09-29',
    cve: 'Cloud IAM Policy Misconfiguration',
    summary: 'Security engineers expose how overly permissive IAM roles assigned to automated CI/CD runners allow pull request contributors to extract cloud root credentials and deploy rogue compute instances.',
    affectedSystems: ['GitHub Actions Runners', 'GitLab CI Workers', 'AWS / Azure / GCP Cloud IAM'],
    threatActor: 'Opportunistic Crypto-Miners & Data Harvesters',
    content: `CI/CD pipelines that execute untrusted fork pull requests with write-access secrets tokens represent a critical attack surface. Attackers submit PRs containing base64-encoded curl scripts that extract environment variables and AWS/Azure access keys to remote servers.

Security Best Practices:
1. Never pass production secrets to workflow runs triggered by external pull requests.
2. Utilize OIDC (OpenID Connect) short-lived authentication rather than permanent long-lived IAM keys.
3. Enforce strict least-privilege scoping on build worker service accounts.`,
    mitigationChecklist: [
      'Migrate from static cloud credentials to dynamic OIDC federated tokens',
      'Require manual approval for external workflow executions',
      'Audit cloud audit logs for unexpected AssumeRole actions'
    ]
  },
  {
    id: 'news-it-03',
    category: 'IT & Tech',
    domain: 'it',
    region: 'Global',
    severity: 'HIGH',
    title: 'Linux Kernel Socket Buffer Overflow Mitigation Integrated into Stable Long-Term Releases',
    source: 'Kernel.org & Security Bulletins',
    url: 'https://kernel.org/',
    timestamp: '8 hours ago',
    date: '2026-09-29',
    cve: 'Linux Kernel sk_buff Heap Corruption',
    summary: 'A critical heap-based buffer overflow in the Linux networking subsystem sk_buff handling has been resolved across stable 6.x LTS kernels, neutralizing potential local privilege escalation to root.',
    affectedSystems: ['Linux Servers running kernel < 6.8.4', 'Container Host Nodes'],
    threatActor: 'Local Privilege Escalation Exploitation',
    content: `The vulnerability allowed unprivileged local users or malicious containerized processes with CAP_NET_ADMIN to craft malformed socket options triggering heap overflow in kernel memory space. Major enterprise distributions have pushed updated kernel packages.`,
    mitigationChecklist: [
      'Update Linux distribution packages: sudo apt-get update && sudo apt-get dist-upgrade',
      'Reboot affected bare-metal and VM nodes to apply new kernel',
      'Disable unprivileged user namespaces if not strictly required'
    ]
  },

  // ==========================================
  // 3. NETWORKING & INFRASTRUCTURE
  // ==========================================
  {
    id: 'news-net-01',
    category: 'Networking',
    domain: 'networking',
    region: 'Global',
    severity: 'CRITICAL',
    title: 'BGP Route Hijacking & Autonomous System Route Leak Impacts Tier-1 Transit Providers',
    source: 'Network World Telemetry Wire',
    url: 'https://www.networkworld.com/',
    timestamp: '4 hours ago',
    date: '2026-09-30',
    cve: 'BGP Route Leaking / AS Spoofing',
    summary: 'A major autonomous system misconfiguration triggered a widespread BGP route leak, temporarily misdirecting cryptocurrency traffic and cloud DNS resolver traffic through unauthorized international transit paths.',
    affectedSystems: ['Border Gateway Protocol (BGP) Routers', 'Tier-1 Telecom Carriers', 'Internet Exchange Points'],
    threatActor: 'Anomalous Transit Leak / Man-in-the-Middle Risk',
    content: `Telemetry from global routing monitors detected thousands of IP prefixes inadvertently announced by an intermediary ISP with improper route filtering. The incident underscores the urgency of deploying RPKI (Resource Public Key Infrastructure) Route Origin Validation across all Tier-1 and enterprise edge peering sessions.

Directives:
1. Enforce RPKI Route Origin Authorization (ROA) validation on all edge eBGP sessions.
2. Drop BGP prefixes with 'Invalid' cryptographic state.
3. Implement strict max-prefix limits to prevent route table overflow on edge hardware.`,
    mitigationChecklist: [
      'Deploy RPKI Route Origin Validation on border routers',
      'Verify peer AS prefix limits and strict IRR filtering',
      'Monitor global BGP looking glasses for prefix anomalies'
    ]
  },
  {
    id: 'news-net-02',
    category: 'Networking',
    domain: 'networking',
    region: 'Global',
    severity: 'HIGH',
    title: 'Terabit-Scale Reflection DDoS Attacks Target Financial & Telecom DNS Anycast Infrastructures',
    source: 'Network World & Cloudflare Radar',
    url: 'https://www.networkworld.com/category/infrastructure/',
    timestamp: '7 hours ago',
    date: '2026-09-29',
    cve: 'DNS Amplification / UDP Reflection Vector',
    summary: 'Coordinated botnets leverage vulnerable, misconfigured Memcached and open recursive DNS resolvers to generate reflection flood volumes exceeding 2.4 Tbps against major DNS Anycast infrastructures.',
    affectedSystems: ['Anycast DNS Clusters', 'Carrier Edge Routers', 'Enterprise Firewalls'],
    threatActor: 'DDoS-for-Hire Botnets / Mirai & Aisuru Variants',
    content: `Attackers spoofed victim IP addresses and sent high-frequency queries to misconfigured UDP services globally. The resulting amplified responses saturated carrier uplinks. Telecom engineers deployed automated BGP Flowspec rules and Anycast rate-limiting to mitigate impact.`,
    mitigationChecklist: [
      'Ensure authoritative DNS servers do not perform open recursion',
      'Enable BGP Flowspec or Scrubbing Center diversion for volumetric attacks',
      'Implement Response Rate Limiting (RRL) on DNS name daemons'
    ]
  },
  {
    id: 'news-net-03',
    category: 'Networking',
    domain: 'networking',
    region: 'Global',
    severity: 'INFO',
    title: 'Next-Generation Liquid-Cooling & 800GbE Switching Architectures Deployed for AI Data Centers',
    source: 'Network World Enterprise Technology',
    url: 'https://www.networkworld.com/article/4229068/liquidstack-unveils-liquid-cooling-platform-targeting-ai-data-centers.html',
    timestamp: '12 hours ago',
    date: '2026-09-29',
    cve: 'Infrastructure Architecture Innovation',
    summary: 'Hyperscale data centers and enterprise network operators transition to 800Gbps Ethernet fabrics and direct-to-chip immersion cooling to handle dense GPU cluster networking demands.',
    affectedSystems: ['800GbE Spine-Leaf Switches', 'Immersion Cooling Racks', 'RDMA over Converged Ethernet (RoCE)'],
    threatActor: 'Infrastructure Evolution',
    content: `High-performance artificial intelligence model training requires non-blocking RoCEv2 network fabrics with sub-microsecond latency. New telemetry solutions integrate real-time congestion notification (ECN) and Priority Flow Control (PFC) monitoring to prevent packet drops across dense spine-leaf topologies.`,
    mitigationChecklist: [
      'Calibrate ECN thresholds to prevent buffer exhaustion',
      'Monitor optical transceiver temperature and link error rates',
      'Isolate AI cluster fabrics from general management networks'
    ]
  },

  // ==========================================
  // 4. GENERAL COMPUTER & HARDWARE / OS
  // ==========================================
  {
    id: 'news-gen-01',
    category: 'General Computer',
    domain: 'general',
    region: 'Global',
    severity: 'HIGH',
    title: 'UEFI & BIOS Firmware Boot-Kit Vulnerabilities Threaten Modern Windows & Linux PCs',
    source: 'PCWorld Hardware & Security',
    url: 'https://www.pcworld.com/',
    timestamp: '6 hours ago',
    date: '2026-09-30',
    cve: 'BlackLotus / LogoFAIL Firmware Hijack',
    summary: 'Hardware researchers discover firmware parser flaws that permit malware to compromise the UEFI bootloader before the Windows operating system kernel initializes, surviving total hard drive reformats.',
    affectedSystems: ['Modern Motherboard UEFI/BIOS', 'Windows 11 Secure Boot', 'Enterprise Laptops & Desktops'],
    threatActor: 'Bootkit Malware Operators',
    content: `By exploiting buffer overflows in image decoders within motherboard BIOS chips, adversaries replace standard boot images with malicious payloads. Because this occurs before the OS loads, traditional antivirus and EDR software cannot detect the presence of the rootkit.

Remediation:
1. Update motherboard BIOS/UEFI firmware to the latest manufacturer release immediately.
2. Enable Secure Boot and verify TPM 2.0 PCR registers are locked.
3. Protect BIOS settings with a strong hardware supervisor password.`,
    mitigationChecklist: [
      'Flash motherboard BIOS with latest security patches',
      'Confirm Secure Boot is actively enforced in BIOS',
      'Enable BitLocker or LUKS whole-disk encryption tied to TPM 2.0'
    ]
  },
  {
    id: 'news-gen-02',
    category: 'General Computer',
    domain: 'general',
    region: 'Global',
    severity: 'MEDIUM',
    title: 'Windows 11 Kernel Isolation & Memory Integrity Default Enforcement Guidelines',
    source: 'PCWorld & Microsoft Hardware Security',
    url: 'https://www.pcworld.com/article/3241795/',
    timestamp: '10 hours ago',
    date: '2026-09-29',
    cve: 'HVCI & Core Isolation Best Practices',
    summary: 'New security updates enforce Hypervisor-Protected Code Integrity (HVCI) across all compatible desktop rigs and laptops to eliminate memory corruption exploits in kernel space.',
    affectedSystems: ['Windows 11 Workstations', 'Intel 11th+ Gen & AMD Ryzen 5000+ CPUs'],
    threatActor: 'General Endpoint Malware Defenses',
    content: `Memory Integrity creates an isolated virtual environment using hardware virtualization features of modern Intel and AMD CPUs. Even if an attacker achieves administrative rights, they cannot inject malicious code into the Windows kernel space without triggering immediate hardware hypervisor termination.`,
    mitigationChecklist: [
      'Open Windows Security -> Device Security -> Core Isolation -> Turn On Memory Integrity',
      'Ensure all installed hardware drivers are digitally WHQL signed',
      'Verify hardware virtualization (VT-x / AMD-V) is enabled in BIOS'
    ]
  },
  {
    id: 'news-gen-03',
    category: 'General Computer',
    domain: 'general',
    region: 'Global',
    severity: 'INFO',
    title: 'DRAM Rowhammer & Hardware Memory Degradation Mitigations Implemented in DDR5 Controllers',
    source: 'PCWorld & Hardware Architecture News',
    url: 'https://www.pcworld.com/',
    timestamp: '14 hours ago',
    date: '2026-09-29',
    cve: 'Hardware Bit-Flip Exploitation (Rowhammer)',
    summary: 'Memory controller manufacturers integrate Target Row Refresh (TRR) and On-Die ECC to prevent bit-flipping attacks where rapid memory access alters adjacent memory cells to escalate privileges.',
    affectedSystems: ['DDR4 / DDR5 RAM Modules', 'High-Density Compute Rigs'],
    threatActor: 'Hardware Exploitation Researchers',
    content: `Rowhammer demonstrated that repeated read cycles on specific physical rows of RAM can induce electrical interference in neighboring rows, flipping bits from 0 to 1. DDR5 standards combat this vulnerability through on-die error correction and adaptive refresh management in modern CPU memory controllers.`,
    mitigationChecklist: [
      'Enable ECC memory support on workstations and servers',
      'Update CPU microcode via motherboard firmware updates',
      'Operate memory modules within manufacturer voltage specifications'
    ]
  },

  // ==========================================
  // 5. INDIA & CERT-IN ADVISORIES
  // ==========================================
  {
    id: 'news-in-01',
    category: 'India & CERT-In',
    domain: 'india',
    region: 'India',
    severity: 'CRITICAL',
    title: 'CERT-In Issues High-Severity Alert on Critical Zero-Day Vulnerability in Enterprise VPN Gateways',
    source: 'CERT-In Advisory CIAD-2026-0089',
    url: 'https://www.cert-in.org.in/',
    timestamp: '2 hours ago',
    date: '2026-09-30',
    cve: 'CVE-2026-21887',
    summary: 'The Indian Computer Emergency Response Team (CERT-In) has issued an urgent advisory warning Indian defense establishments, PSUs, and banking institutions regarding active exploitation of command injection flaws in VPN concentrators by nation-state actors.',
    affectedSystems: ['Enterprise SSL-VPN Gateways', 'Remote Access Concentrators running firmware < v9.1R18'],
    threatActor: 'Suspected State-Sponsored APT Cluster (Volt Typhoon / RedEcho affiliate)',
    content: `CERT-In has observed widespread scanning and exploitation attempts targeting Indian critical information infrastructure. Threat actors are utilizing crafted HTTP requests to bypass authentication and execute arbitrary commands with root privileges. Once inside, attackers deploy web shells, dump active user sessions, and pivot into internal networks.

Remediation Directives from CERT-In:
1. Immediately apply vendor security patches or workarounds.
2. Review VPN access logs for anomalous POST requests to \`/api/v1/cav/client/costs\` or unauthorized administrator account creations.
3. Enforce phishing-resistant multi-factor authentication (FIDO2 / PKI tokens) on all external access portals.
4. Report any suspected compromise to incident@cert-in.org.in within the mandatory 6-hour window.`,
    mitigationChecklist: [
      'Isolate affected appliance management interfaces from the public Internet',
      'Revoke and regenerate all internal cryptographic certificates and VPN credentials',
      'Audit Active Directory for newly created unauthorized accounts within the last 72 hours'
    ]
  },
  {
    id: 'news-in-02',
    category: 'India & CERT-In',
    domain: 'india',
    region: 'India',
    severity: 'HIGH',
    title: 'Defence Cyber Agency (DCA) Issues Advisory on Spear-Phishing Targeting Military Officers via WhatsApp & Telegram',
    source: 'Defence Cyber Agency / Tri-Services Intelligence Bulletin',
    url: 'https://mod.gov.in/',
    timestamp: '5 hours ago',
    date: '2026-09-30',
    cve: 'TTP: Spear-Phishing / Malicious APK Delivery',
    summary: 'Hostile intelligence operatives are circulating weaponized Android applications (.APK) masquerading as official defense welfare or recruitment portals to exfiltrate contacts, GPS coordinates, and documents from service personnel.',
    affectedSystems: ['Android Mobile Devices', 'Official and Personal Communication Terminals'],
    threatActor: 'Transparent Tribe (APT36) / Operation C-Major',
    content: `Hostile state-sponsored threat group APT36 has launched a targeted campaign using social engineering vectors across messaging apps. The group circulates trojanized APKs disguised as "Hamraaz App Updates", "Defence Housing Schemes", or "Army Pay Slip Portals". Once installed, the spyware requests accessibility permissions and transmits call recordings, WhatsApp databases, and GPS coordinates to remote C2 servers.

DCA Operational Directives:
1. Strict prohibition on sideloading any application from unofficial third-party sources or messaging links.
2. Mandatory installation of DRDO/DCA-approved endpoint security profiles on all official mobile devices.
3. Total ban on discussing operational movements, unit locations, or equipment status on commercial messaging platforms.`,
    mitigationChecklist: [
      'Verify device hash against official Armed Forces whitelist',
      'Enable strict Mobile Device Management (MDM) geofencing',
      'Conduct immediate counter-intelligence briefing for all unit officers'
    ]
  },
  {
    id: 'news-in-03',
    category: 'India & CERT-In',
    domain: 'india',
    region: 'India',
    severity: 'CRITICAL',
    title: 'NCIIPC Issues Red Alert for Regional Power Grid Load Dispatch Centers against Pre-Positioned Malware',
    source: 'NCIIPC Security Bulletin',
    url: 'https://nciipc.gov.in/',
    timestamp: '9 hours ago',
    date: '2026-09-29',
    cve: 'OT Protocol Manipulation (IEC 60870-5-104)',
    summary: 'Telemetry anomalies detected in Northern and Western regional load dispatch telemetry. Suspected adversary infrastructure probing electrical substation controllers and telemetry relays.',
    affectedSystems: ['State Load Despatch Centres (SLDC)', 'Substation RTUs', 'SCADA Historian Servers'],
    threatActor: 'RedEcho / TAG-38',
    content: `The National Critical Information Infrastructure Protection Centre (NCIIPC) has identified coordinated reconnaissance and network probing directed at electrical transmission utilities. Adversaries are attempting to exploit unpatched edge firewalls to establish persistent foothold channels into Industrial DMZ jump hosts.

SOP Enforced:
- Immediate verification of hardware optical data diodes on all SCADA historian uplinks.
- Total severance of any remote desktop (RDP/AnyDesk/TeamViewer) connectivity on engineering consoles.
- Physical inspection of substation perimeter fences and fiber optic junction boxes.`,
    mitigationChecklist: [
      'Enforce physical air-gap or unidirectional optical diode on RTU telemetry',
      'Audit all IEC-104 and Modbus packet streams for illegal function codes',
      'Initiate 24/7 dedicated SOC alert war-room at Central Electricity Authority'
    ]
  }
];
