// CYBEROPS DEFENSE COMMAND - Live Cyber Threat Intelligence & News Feed
// Real-time curated alerts focusing on India and Global Cyber Threats

export const THREAT_LEVELS = {
  CURRENT: 'DEFCON 3 - ELEVATED TACTICAL READINESS',
  CODE: 'YELLOW-ALPHA',
  ACTIVE_CAMPAIGNS: 28,
  CERT_IN_ALERTS: 14
};

export const INITIAL_NEWS_DATA = [
  // ==========================================
  // INDIA CYBER THREATS & CERT-IN ADVISORIES
  // ==========================================
  {
    id: 'news-in-01',
    region: 'India',
    category: 'Critical Infrastructure & Defense',
    severity: 'CRITICAL',
    title: 'CERT-In Issues High-Severity Alert on Critical Zero-Day Vulnerability in Enterprise VPN Gateways',
    source: 'CERT-In Advisory CIAD-2024-0089',
    timestamp: '2 hours ago',
    date: '2024-09-23',
    cve: 'CVE-2024-21887',
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
    region: 'India',
    category: 'Armed Forces & Military Defense',
    severity: 'HIGH',
    title: 'Defence Cyber Agency (DCA) Issues Advisory on Spear-Phishing Targeting Military Officers via WhatsApp & Telegram',
    source: 'Defence Cyber Agency / Tri-Services Intelligence Bulletin',
    timestamp: '6 hours ago',
    date: '2024-09-23',
    cve: 'TTP: Spear-Phishing / Malicious APK Delivery',
    summary: 'Hostile intelligence operatives are circulating weaponized Android applications (.APK) masquerading as official defense welfare or recruitment portals to exfiltrate contacts, GPS coordinates, and documents from service personnel.',
    affectedSystems: ['Android Mobile Devices', 'Official and Personal Communication Terminals'],
    threatActor: 'Transparent Tribe (APT36) / Operation C-Major',
    content: `Hostile state-sponsored threat group APT36 has launched a targeted campaign using social engineering vectors across messaging apps. The group circulates trojanized APKs disguised as "Hamraaz App Updates", "Defence Housing Schemes", or "Army Pay Slip Portals". Once installed, the spyware requests accessibility permissions and transmits call recordings, WhatsApp databases, and GPS coordinates to remote C2 servers in Europe.

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
    region: 'India',
    category: 'Power Grid & SCADA Telemetry',
    severity: 'CRITICAL',
    title: 'NCIIPC Issues Red Alert for Regional Power Grid Load Dispatch Centers against Pre-Positioned Malware',
    source: 'NCIIPC Security Bulletin',
    timestamp: '14 hours ago',
    date: '2024-09-22',
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
  },
  {
    id: 'news-in-04',
    region: 'India',
    category: 'Banking & Financial Sector',
    severity: 'MEDIUM',
    title: 'RBI & CERT-In Issue Joint Warning over Mule Account Networks and Sophisticated APK Stealer Malware',
    source: 'RBI Cyber Security Division / CERT-In',
    timestamp: '1 day ago',
    date: '2024-09-22',
    cve: 'Financial APK Infostealer (Hydra / Godfather variant)',
    summary: 'Syndicates are targeting Indian banking customers with fake e-challan and electricity bill notification SMS messages containing malicious Android installation packages that intercept OTPs.',
    affectedSystems: ['Mobile Banking Applications', 'SMS Telephony Gateway'],
    threatActor: 'Organized Cybercrime Cartels',
    content: `Financial fraud networks are weaponizing SMS headers to deliver APK download links. The malware utilizes Android Accessibility services to capture keystrokes, intercept two-factor SMS authentication codes, and execute fraudulent RTGS/IMPS transfers via compromised mule accounts.`,
    mitigationChecklist: [
      'Enable SIM-binding security in banking mobile applications',
      'Deploy behavioral anomaly detection on sudden high-value night-time transfers',
      'Block malicious SMS aggregator sender IDs'
    ]
  },
  {
    id: 'news-in-05',
    region: 'India',
    category: 'Defense Industrial Base',
    severity: 'HIGH',
    title: 'CERT-In Advisory on Targeted Phishing Targeting Indian Aerospace & Defense PSU Suppliers',
    source: 'CERT-In Advisory CIAD-2024-0102',
    timestamp: '1 day ago',
    date: '2024-09-22',
    cve: 'TTP: Vendor Impersonation / Weaponized ISO',
    summary: 'Threat groups targeting subcontractors of Indian defense public sector undertakings with spear-phishing emails containing weaponized ZIP/ISO containers delivering remote access trojans.',
    affectedSystems: ['Windows CAD/CAM Workstations', 'Engineering Design Servers'],
    threatActor: 'SideCopy / APT36 Sub-cluster',
    content: `Attackers masqueraded as procurement officers from defense agencies requesting quotations for avionics parts. Attached ISO files contained LNK shortcuts executing PowerShell stagers to deliver njRAT and AllaKore RAT.`,
    mitigationChecklist: [
      'Block mounting of ISO, VHD, and IMG files via Windows Group Policy',
      'Enforce email gateway attachment sandboxing for all vendor communications',
      'Implement strict application whitelisting on engineering design workstations'
    ]
  },
  {
    id: 'news-in-06',
    region: 'India',
    category: 'Telecommunications & 5G Infrastructure',
    severity: 'HIGH',
    title: 'NCSC Trusted Telecom Cell Flags Unauthorized Radio Access Network Equipment Deployments',
    source: 'National Cyber Security Coordinator (NCSC) Bulletin',
    timestamp: '2 days ago',
    date: '2024-09-21',
    cve: 'Unverified Firmware / Sourcing Non-Compliance',
    summary: 'Audit of private enterprise 5G pilot installations revealed unverified core network software modules from non-trusted origin countries in violation of national telecom security directives.',
    affectedSystems: ['5G Standalone Core Gateways', 'Open-RAN Base Station Radios'],
    threatActor: 'Supply Chain Risk / Non-Trusted Vendors',
    content: `The National Security Council Secretariat (NSCS) reiterated that all 5G equipment deployed across national boundaries must possess mandatory Trusted Product certification from the National Telecommunications Security Portal.`,
    mitigationChecklist: [
      'Decommission non-certified network hardware modules immediately',
      'Deploy passive DPI telemetry to monitor outbound control plane beaconing',
      'Verify digital signature hashes of all base station firmware updates'
    ]
  },

  // ==========================================
  // GLOBAL CYBER THREATS & WORLDWIDE APT ALERTS
  // ==========================================
  {
    id: 'news-gl-01',
    region: 'Global',
    category: 'Nation-State Cyber Warfare',
    severity: 'CRITICAL',
    title: 'CISA, FBI & International Allies Disclose Volt Typhoon Pre-Positioning in Critical Infrastructure',
    source: 'CISA Joint Cybersecurity Advisory (AA24-038A)',
    timestamp: '4 hours ago',
    date: '2024-09-23',
    cve: 'Living-off-the-Land (LotL) Command Abuse',
    summary: 'State-sponsored cyber actors have maintained access inside Western maritime ports, pipeline facilities, and water treatment utilities for up to five years, using native OS tools to evade detection.',
    affectedSystems: ['Cisco Routers', 'Fortinet Firewalls', 'Active Directory Domain Controllers'],
    threatActor: 'Volt Typhoon (People\'s Republic of China State-Sponsored)',
    content: `The US Cybersecurity and Infrastructure Security Agency (CISA) alongside UK NCSC, Australian ASD, and international partners confirmed that Volt Typhoon operators are pre-positioning disruptive cyber assets inside critical infrastructure to disrupt military mobilization and logistics during potential physical geopolitical conflict.

Techniques Observed:
- Actors do NOT drop custom malware. They exclusively utilize native command-line utilities: \`wmic\`, \`powershell\`, \`netsh\`, and \`vssadmin\`.
- Use compromised SOHO routers as proxy relay networks to blend traffic with local residential ISP traffic.`,
    mitigationChecklist: [
      'Implement strict logging of PowerShell script block executions (Event 4104)',
      'Baseline normal administrative command execution to flag unusual wmic invocations',
      'Enforce hardware token multi-factor authentication across all administrator tiers'
    ]
  },
  {
    id: 'news-gl-02',
    region: 'Global',
    category: 'Zero-Day Vulnerability',
    severity: 'CRITICAL',
    title: 'Critical Remote Code Execution Zero-Day Discovered in OpenSSH Server (regreSSHion)',
    source: 'Qualys Security Advisory / NVD',
    timestamp: '8 hours ago',
    date: '2024-09-23',
    cve: 'CVE-2024-6387 (regreSSHion)',
    summary: 'A signal handler race condition in OpenSSH\'s server (sshd) allows unauthenticated remote attackers to execute arbitrary code with root privileges on glibc-based Linux systems.',
    affectedSystems: ['OpenSSH versions 8.5p1 to 9.7p1 on Linux'],
    threatActor: 'Multiple Exploit Scanners & Threat Actors Globally',
    content: `Security researchers identified a severe race condition in sshd during SIGALRM handling. If a client does not authenticate within LoginGraceTime (default 120 seconds), sshd\'s SIGALRM handler is called asynchronously, invoking non-async-signal-safe functions (like syslog). An attacker can trigger this race condition over millions of automated attempts to gain full root remote shell access.

Remediation:
- Update OpenSSH immediately to version 9.8p1 or later.
- Mitigation if patching is delayed: Set \`LoginGraceTime 0\` in \`/etc/ssh/sshd_config\` (prevents race condition but exposes server to potential DoS).`,
    mitigationChecklist: [
      'Audit all external-facing SSH servers for OpenSSH version numbers',
      'Restrict SSH port 22 access strictly to trusted IP whitelist / bastion jump hosts',
      'Deploy fail2ban or firewall rate-limiting to throttle aggressive connection floods'
    ]
  },
  {
    id: 'news-gl-03',
    region: 'Global',
    category: 'Ransomware & Extortion',
    severity: 'HIGH',
    title: 'LockBit 3.0 & BlackCat Cartels Deploy EDR-Killer Drivers via Bring Your Own Vulnerable Driver (BYOVD)',
    source: 'Global Threat Intelligence Network',
    timestamp: '18 hours ago',
    date: '2024-09-22',
    cve: 'BYOVD Technique / Signed Driver Abuse',
    summary: 'Ransomware affiliates are bypassing leading Endpoint Detection and Response (EDR) software by installing legitimately signed, vulnerable kernel drivers to terminate security processes.',
    affectedSystems: ['Windows 10 / 11 / Server 2022 Kernel Space'],
    threatActor: 'LockBit 3.0 Affiliates / RansomHub',
    content: `Ransomware operators have automated Bring Your Own Vulnerable Driver (BYOVD) attacks. By dropping a genuine, digitally signed driver from a legitimate hardware manufacturer that possesses an unpatched kernel read/write vulnerability, the malware disables kernel callbacks used by CrowdStrike, SentinelOne, and Windows Defender, rendering the system blind before launching encryption.`,
    mitigationChecklist: [
      'Enable Microsoft Vulnerable Driver Blocklist in Windows Defender Application Control (WDAC)',
      'Turn on Memory Integrity (Hypervisor-Protected Code Integrity - HVCI) in BIOS/Windows',
      'Audit kernel driver load events (Event ID 7045 and Sysmon Event ID 6)'
    ]
  },
  {
    id: 'news-gl-04',
    region: 'Global',
    category: 'Electronic Warfare & Satellite Cyber',
    severity: 'HIGH',
    title: 'Adversary SATCOM Terminal Hijacking & GPS Spoofing Spikes Reported across Maritime Chokepoints',
    source: 'International Maritime Cyber Security Centre',
    timestamp: '1 day ago',
    date: '2024-09-22',
    cve: 'SATCOM Firmware Tampering / GPS Replay',
    summary: 'Commercial and military naval vessels navigating contested straits encounter false position telemetry and unauthorized firmware modification attempts on commercial satellite communication terminals.',
    affectedSystems: ['Shipboard Inmarsat / Iridium Terminals', 'Civilian Marine GPS Receivers'],
    threatActor: 'State-Sponsored Electronic Warfare Units',
    content: `Naval monitoring groups report extensive GPS "circle spoofing" and SATCOM terminal attacks. Attackers broadcast RF signals mimicking genuine GPS constellations, shifting vessel coordinates by miles to mislead automated navigation systems. Simultaneously, default administrative credentials on commercial satellite receivers are targeted for remote firmware modification.`,
    mitigationChecklist: [
      'Cross-verify GPS position against inertial navigation and celestial sights',
      'Change all default manufacturer passwords on SATCOM terminals immediately',
      'Deploy anti-spoofing antennas and multi-constellation GNSS receivers'
    ]
  },
  {
    id: 'news-gl-05',
    region: 'Global',
    category: 'Cloud Infrastructure & Hypervisors',
    severity: 'CRITICAL',
    title: 'VMware ESXi Hypervisor Zero-Day Exploited by Ransomware Groups for Direct Virtual Disk Encryption',
    source: 'VMware Security Response / CISA KEV',
    timestamp: '2 days ago',
    date: '2024-09-21',
    cve: 'CVE-2024-37085 (Active Directory Kerberos Authentication Bypass)',
    summary: 'Ransomware gangs exploit an Active Directory authentication bypass flaw in VMware ESXi to grant themselves full administrative privileges and encrypt virtual hard disks (.vmdk) in minutes.',
    affectedSystems: ['VMware ESXi 7.0 / 8.0 Hypervisors'],
    threatActor: 'Akira / Black Basta Ransomware',
    content: `Attackers with Active Directory access create an unauthorized domain group named 'ESXi Admins'. By default, ESXi hypervisors joined to Active Directory automatically grant full administrative access to any member of this group without verification, allowing immediate hypervisor-level shutdown and virtual disk encryption.`,
    mitigationChecklist: [
      'Apply VMware ESXi patch bundle or disable Active Directory integration',
      'Restrict ESXi management interfaces to dedicated, non-routable management VLANs',
      'Audit Active Directory for the existence of an "ESXi Admins" security group'
    ]
  }
];
