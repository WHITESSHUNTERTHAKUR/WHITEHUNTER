// CYBEROPS DEFENSE COMMAND - Extended Strategic Curriculum
// Additional Comprehensive Topics across all 5 Tactical Domains

export const EXTENDED_TOPICS = [
  // T04: Switch Security, VLAN Segmentation & STP Manipulation
  {
    id: 't04-vlans-switching',
    domainId: 'networking',
    title: 'Switch Security, VLAN Segmentation & STP Attack Vectors',
    level: 'Tactical Operator',
    readTime: '18 min',
    tags: ['VLAN 802.1Q', 'Port Security', 'STP Attacks', 'DHCP Snooping', 'DAI'],
    phase1: {
      overview: 'Layer 2 switches form the local physical backbone of military bases and tactical command posts. Misconfigurations allow malicious insiders or compromised endpoints to perform VLAN hopping, MAC flooding, STP root bridge takeover, and ARP spoofing, collapsing local segment isolation.',
      architecture: `Layer 2 Defense Matrix:
Attack Type           | Mechanism                          | Hardware Defense Control
MAC Address Flooding  | Overwhelms CAM table with junk MACs| Port Security (Max MAC limit, err-disable)
VLAN Hopping (DTP)    | Exploits Dynamic Trunking Protocol | Disable DTP, set trunk explicitly, non-default native VLAN
VLAN Double-Tagging   | Outer 802.1Q tag stripped by switch| Native VLAN mismatch prevention, drop double tags
DHCP Rogue Server     | Attacker offers fake gateway & DNS | DHCP Snooping (Trust only legitimate uplink ports)
ARP Poisoning / MITM  | Gratuitous ARPs poison cache       | Dynamic ARP Inspection (DAI) tied to DHCP Snooping table
STP Root Hijacking    | Attacker advertises priority 0 BPDU| Root Guard & BPDU Guard enabled on access ports`,
      deepDive: `### Dynamic ARP Inspection (DAI) Mechanics
When an endpoint sends an ARP packet, an unmanaged switch broadcasts it to all ports. With DAI enabled on the switch:
1. The switch intercepts every ARP request and response on untrusted ports.
2. It cross-references the IP-to-MAC mapping against the verified DHCP Snooping binding database.
3. If an attacker attempts to spoof an IP address (e.g. claiming the military gateway's IP with their own MAC), the switch drops the invalid ARP frame and logs a security violation.`,
      commands: [
        { label: 'Cisco IOS - Configure Port Security with Sticky MAC', cmd: 'switchport mode access\nswitchport port-security\nswitchport port-security maximum 2\nswitchport port-security violation restrict\nswitchport port-security mac-address sticky' },
        { label: 'Enable DHCP Snooping & Dynamic ARP Inspection', cmd: 'ip dhcp snooping\nip dhcp snooping vlan 10,20\nip arp inspection vlan 10,20' },
        { label: 'Enable BPDU Guard on Access Ports', cmd: 'spanning-tree portfast bpduguard default' }
      ],
      realWorldCaseStudy: {
        title: 'Tactical Command Post Layer-2 Collapse during Red Team Drill',
        summary: 'During an armed forces red team assessment, an operative plugged a rogue laptop into an open barracks RJ-45 jack, generated 100,000 randomized MAC addresses in 5 seconds via `macof`, filling the switch CAM table and forcing it into "fail-open hub mode", broadcasting all confidential military voice-over-IP traffic across all ports.',
        lesson: 'Port security with maximum MAC thresholds must be strictly enabled on all access switch ports.'
      },
      tacticalTakeaways: [
        'Always disable Dynamic Trunking Protocol (`switchport nonegotiate`) on access ports.',
        'Never use default VLAN 1 for user traffic or native trunking.',
        'Enable BPDU Guard on all edge ports to prevent unauthorized STP root bridge usurpation.'
      ]
    },
    phase2: [
      {
        id: 'q04-01',
        category: 'Foundational',
        question: 'What is CAM table exhaustion (MAC Flooding), and what happens to a switch when its CAM table is completely filled?',
        answer: 'CAM (Content Addressable Memory) table stores MAC-to-port bindings. When flooded with thousands of fake MAC addresses, memory runs out, and the switch fails open, broadcasting all incoming frames to every port like a hub, allowing attackers to sniff all traffic.',
        explanation: 'The switch can no longer route frames specifically to target ports, leading to universal unicast flooding.',
        tacticalTip: 'Prevent this with `switchport port-security maximum 1-2` and `violation shutdown`.'
      },
      {
        id: 'q04-02',
        category: 'Operational / Scenario',
        question: 'How does Dynamic ARP Inspection (DAI) rely on DHCP Snooping to prevent Man-in-the-Middle (MITM) attacks?',
        answer: 'DHCP Snooping watches legitimate IP allocations and builds a secure IP-to-MAC binding database. When DAI is enabled, the switch inspects every ARP packet against this database; any ARP claiming an IP not bound to that port/MAC is dropped.',
        explanation: 'DAI eliminates ARP spoofing without requiring manual static ARP entries on every host.',
        tacticalTip: 'Remember to configure switch uplink ports to the router as `trusted` for both DHCP snooping and DAI.'
      }
    ],
    phase3: [
      {
        id: 'qz04-01',
        question: 'Which switch security feature prevents an unauthorized rogue switch or attacker laptop from sending Bridge Protocol Data Units (BPDUs) to become the Spanning Tree Root Bridge?',
        scenario: 'A network engineer secures edge access ports in a field headquarters.',
        options: [
          'BPDU Guard and Root Guard',
          'Static Route Poisoning',
          'Dynamic Trunking Protocol (DTP)',
          'OSPF Passive Interface'
        ],
        correctIndex: 0,
        explanation: 'BPDU Guard disables any port that receives unexpected BPDUs, while Root Guard prevents a port from becoming the root port.',
        domainCategory: 'Networking & Tactical Infrastructure'
      }
    ]
  },

  // T05: Firewalls, WAF & IDS/IPS Architecture
  {
    id: 't05-firewalls-ids',
    domainId: 'networking',
    title: 'Firewalls (Stateful, WAF, NGFW), IDS/IPS & DMZ Architecture',
    level: 'Tactical Operator',
    readTime: '22 min',
    tags: ['Next-Gen Firewall', 'IDS/IPS', 'Snort', 'Suricata', 'DMZ', 'WAF'],
    phase1: {
      overview: 'Perimeter firewalls and Intrusion Detection/Prevention Systems (IDS/IPS) inspect, filter, and police all traffic entering or exiting security enclaves. Modern Next-Generation Firewalls (NGFW) combine stateful packet filtering with Layer 7 application inspection, TLS decryption, deep packet inspection, and threat intelligence feeds.',
      architecture: `Military Enclave Multi-Tier Perimeter Architecture:
[ UNTRUSTED INTERNET / TACTICAL WAN ]
                  |
        [ External Border Router with Anti-Spoofing ACLs ]
                  |
     [ Perimeter Next-Gen Firewall (NGFW) & DDoS Scrubber ]
                  |
           +------+------+
           |             |
     [ Screened DMZ ]    [ In-Line Hardware IPS (Suricata/Snort) ]
     (Public Web, DNS,   |
      Tactical Proxy)   [ Internal Core Firewall ]
                         |
           +-------------+-------------+
           |                           |
[ Base Command LAN ]        [ Critical SCADA / Classified Enclave ]`,
      deepDive: `### IDS vs IPS Operational Distinctions
- **Intrusion Detection System (IDS)**: Operates out-of-band via switch SPAN/mirror ports or network taps. Detects anomalies and fires alerts to the SIEM, but cannot physically block malicious packets in transit.
- **Intrusion Prevention System (IPS)**: Placed directly in-line with the network flow. Evaluates signatures and heuristics; drops malicious packets immediately before they reach the target host.

### Signature vs Anomaly-Based Detection
- **Signature-Based**: Matches precise patterns (e.g. known Exploit byte sequences). High accuracy, low false positives, but cannot detect zero-day attacks.
- **Behavioral / Anomaly-Based**: Establishes a baseline of normal military network traffic; alerts when statistical deviation occurs (e.g. 500% spike in outbound SSH at 0300 hrs). Detects zero-days but requires careful tuning to avoid false positives.`,
      commands: [
        { label: 'Snort Rule - Detect Outbound Cobalt Strike C2 Beaconing', cmd: 'alert tcp $HOME_NET any -> $EXTERNAL_NET any (msg:"Cobalt Strike Beacon Detected"; flow:to_server,established; content:"/pixel.gif"; http_uri; classtype:trojan-activity; sid:2024001; rev:1;)' },
        { label: 'Iptables Rule - Drop Inbound Traffic from Known Threat Actor Subnet', cmd: 'iptables -A INPUT -s 198.51.100.0/24 -j DROP' },
        { label: 'Check Suricata Alert Log in Real-Time', cmd: 'tail -f /var/log/suricata/fast.log' },
        { label: 'Windows Defender Advanced Firewall - Block Port 445 Inbound', cmd: 'New-NetFirewallRule -Name "BlockSMBInbound" -DisplayName "Block SMB 445" -Direction Inbound -Protocol TCP -LocalPort 445 -Action Block' }
      ],
      realWorldCaseStudy: {
        title: 'Equifax Breach (2017) - Uninspected Encrypted Traffic Failure',
        summary: 'Threat actors exploited an Apache Struts vulnerability (CVE-2017-5638). Although Equifax had an in-line network inspection device, an expired SSL/TLS certificate on the inspection device left encrypted traffic uninspected for 10 months, allowing attackers to exfiltrate personal data of 147 million people.',
        lesson: 'SSL/TLS decryption and active certificate lifecycle management are essential for perimeter inspection devices.'
      },
      tacticalTakeaways: [
        'Always implement Default Deny: drop all inbound and outbound traffic unless explicitly permitted by rule.',
        'Place public-facing servers strictly in a Demilitarized Zone (DMZ), never directly inside the internal command network.',
        'Enforce outbound (egress) filtering to prevent compromised hosts from calling back to external C2 servers.'
      ]
    },
    phase2: [
      {
        id: 'q05-01',
        category: 'Foundational',
        question: 'What is the operational difference between a Stateful Inspection Firewall and a Stateless Packet Filter?',
        answer: 'A stateless filter inspects each packet in isolation against static rules (IP and port). A stateful firewall tracks active connection states in a state table (SYN, SYN-ACK, ESTABLISHED) and automatically allows legitimate return traffic without needing separate permissive rules.',
        explanation: 'Stateful firewalls prevent forged packets from bypassing the firewall by verifying they belong to an already established session.',
        tacticalTip: 'Stateful tables can be exhausted during large DDoS attacks; ensure SYN flood defenses are enabled.'
      },
      {
        id: 'q05-02',
        category: 'Operational / Scenario',
        question: 'Why should an Intrusion Prevention System (IPS) be placed in-line rather than connected via a SPAN/mirror port?',
        answer: 'An IPS must be in-line so that network packets physically pass through it before reaching their destination, allowing the IPS to drop malicious packets in real time. A SPAN port only receives an asynchronous copy after the packet has already reached the target.',
        explanation: 'A SPAN port configuration can only operate as a passive IDS, not an active IPS.',
        tacticalTip: 'Deploy hardware bypass switches with in-line IPS units so network connectivity is preserved if the IPS device suffers hardware failure.'
      }
    ],
    phase3: [
      {
        id: 'qz05-01',
        question: 'Which network zone is specifically designed to host public-facing services (e.g. web portal, mail gateway) while isolating them from the core military intranet?',
        scenario: 'Configuring network zones for a defense procurement server.',
        options: [
          'Demilitarized Zone (DMZ)',
          'Air-Gapped Zero-Bus',
          'Default Loopback Zone',
          'Active Directory Domain Root'
        ],
        correctIndex: 0,
        explanation: 'A DMZ (Demilitarized Zone) is a perimeter subnet that buffers public-facing servers from the private internal network.',
        domainCategory: 'Networking & Tactical Infrastructure'
      }
    ]
  },

  // T06: VPNs, IPsec & WireGuard
  {
    id: 't06-vpns-ipsec',
    domainId: 'networking',
    title: 'VPNs, IPsec (IKEv1/IKEv2), WireGuard & Tactical Encrypted Tunnels',
    level: 'Advanced Tactical',
    readTime: '20 min',
    tags: ['IPsec', 'IKEv2', 'WireGuard', 'ESP', 'AH', 'Site-to-Site VPN'],
    phase1: {
      overview: 'Virtual Private Networks (VPNs) construct secure, cryptographically encrypted tunnels across untrusted commercial networks, satellite links, and hostile RF environments. IPsec and modern WireGuard protocols guarantee confidentiality, integrity, and replay protection for military communications.',
      architecture: `IPsec Protocol Suite Architecture:
Protocol / Mode | Purpose                                      | Cryptographic Mechanism
IKEv2 / Phase 1 | Authenticates peers & negotiates keys        | Diffie-Hellman Group 19/20, Pre-shared key or X.509 cert
IKEv2 / Phase 2 | Establishes IPsec Security Associations (SA) | Negotiates symmetric encryption (AES-256-GCM)
ESP (Protocol 50)| Encapsulating Security Payload               | Provides Confidentiality, Data Origin Auth, Replay Protect
AH (Protocol 51) | Authentication Header                        | Provides Integrity only (NO encryption, incompatible with NAT)
Tunnel Mode     | Encrypts ENTIRE original IP packet + new IP  | Site-to-Site Gateways, military base links
Transport Mode  | Encrypts only L4 payload (original IP kept)  | End-to-end host-to-host communications`,
      deepDive: `### WireGuard vs Legacy IPsec
- **WireGuard**: Operates inside Linux kernel space with ~4,000 lines of audited code (compared to ~400,000 lines in OpenSSL/StrongSwan). Utilizes modern state-of-the-art cryptography: ChaCha20 for symmetric encryption, Poly1305 for authentication, Curve25519 for ECDH key exchange, and BLAKE2s for hashing. Roams seamlessly across IP changes (critical for mobile tactical units).
- **IPsec IKEv2**: Highly mature military standard with widespread hardware cryptographic offloading (ASIC), granular policy options, and support for Suite B / CNSA post-quantum algorithms.`,
      commands: [
        { label: 'Check Active IPsec SAs in Linux (StrongSwan)', cmd: 'ipsec statusall' },
        { label: 'Verify WireGuard Interface Status & Handshakes', cmd: 'wg show' },
        { label: 'Generate WireGuard Tactical Keypair', cmd: 'wg genkey | tee privatekey | wg pubkey > publickey' },
        { label: 'Check Windows IPsec Active Main Mode Associations', cmd: 'netsh advfirewall monitor show mmsa' }
      ],
      realWorldCaseStudy: {
        title: 'Compromise of Pulse Secure VPN Appliances (2021)',
        summary: 'Nation-state threat actors targeted unpatched VPN concentrators (CVE-2021-22893) at defense industrial base entities, bypassing authentication to extract active VPN sessions and move laterally into classified enclaves.',
        lesson: 'VPN concentrators are prime high-value targets; mandate multi-factor authentication (MFA) and continuous firmware vulnerability patching.'
      },
      tacticalTakeaways: [
        'Always use ESP Tunnel Mode with AES-GCM (Authenticated Encryption) for site-to-site military links.',
        'Avoid IKEv1 Aggressive Mode; it transmits pre-shared key hashes in cleartext, making them vulnerable to offline brute-forcing.',
        'Deploy WireGuard for mobile tactical radio links requiring rapid cryptographic roaming.'
      ]
    },
    phase2: [
      {
        id: 'q06-01',
        category: 'Foundational',
        question: 'What is the primary difference between IPsec Tunnel Mode and IPsec Transport Mode?',
        answer: 'Transport Mode encrypts only the payload (data) while retaining the original IP header (used for host-to-host communication). Tunnel Mode encrypts the entire original IP packet and prepends a brand new IP header (used for gateway-to-gateway / site-to-site connections).',
        explanation: 'Tunnel mode hides the internal IP addressing scheme from observers on intermediate networks.',
        tacticalTip: 'Tunnel Mode is the standard for military base-to-base and headquarters encrypted links.'
      },
      {
        id: 'q06-02',
        category: 'Operational / Scenario',
        question: 'Why is IPsec Authentication Header (AH, protocol 51) generally incompatible with Network Address Translation (NAT)?',
        answer: 'AH calculates an integrity hash over the entire packet, including the IP header. When a NAT router translates the private IP to a public IP, the IP header is modified, causing the destination to detect hash mismatch and drop the packet.',
        explanation: 'To resolve this, NAT-Traversal (NAT-T) encapsulates IPsec ESP packets inside UDP port 4500.',
        tacticalTip: 'Ensure UDP port 500 (IKE) and UDP port 4500 (NAT-T) are allowed through intermediate firewalls.'
      }
    ],
    phase3: [
      {
        id: 'qz06-01',
        question: 'Which IPsec protocol provides both data confidentiality (encryption) and data integrity/authentication for tactical field transmissions?',
        scenario: 'Configuring secure encrypted gateway tunnel between two army forward operational bases.',
        options: [
          'Encapsulating Security Payload (ESP, IP Protocol 50)',
          'Authentication Header (AH, IP Protocol 51)',
          'Address Resolution Protocol (ARP)',
          'Internet Control Message Protocol (ICMP)'
        ],
        correctIndex: 0,
        explanation: 'ESP provides confidentiality, authentication, integrity, and anti-replay. AH provides only authentication and integrity with zero encryption.',
        domainCategory: 'Networking & Tactical Infrastructure'
      }
    ]
  },

  // T09: SOC Architecture & SIEM
  {
    id: 't09-soc-siem',
    domainId: 'core-cyber',
    title: 'Security Operations Center (SOC) Tier 1-3 & SIEM Operations',
    level: 'Tactical Operator',
    readTime: '22 min',
    tags: ['SOC Tier 1-3', 'SIEM', 'Splunk', 'Wazuh', 'Use Cases', 'Alert Triage'],
    phase1: {
      overview: 'The Security Operations Center (SOC) is the centralized command post tasked with continuous monitoring, threat detection, and rapid incident triage across enterprise and military IT/OT assets. A modern SOC operates a 24/7 tri-tier escalation model backed by Security Information and Event Management (SIEM) and Security Orchestration, Automation, and Response (SOAR).',
      architecture: `Military SOC Escalation Hierarchy:
Tier Level | Operational Role          | Primary Responsibilities
Tier 1     | Triage Analyst / Alert    | 24/7 queue monitoring, false positive filtering, initial severity scoring
Tier 2     | Incident Responder        | In-depth host/network forensics, root cause analysis, containment actions
Tier 3     | Advanced Threat Hunter    | Proactive adversary hunting, reverse engineering malware, developing custom SIEM rules
SOC Lead   | Operations Commander      | Incident command, strategic breach communication, liaison with DCA / CERT-In`,
      deepDive: `### SIEM Log Correlation & Detection Rules
SIEM systems (e.g. Splunk, Elastic SIEM, Wazuh) collect millions of event logs per second (Syslog, Windows Event ID, NetFlow, EDR telemetry). Correlation rules identify malicious activity that spans multiple disparate data sources:
- **Example Rule**: *Brute-Force to Lateral Movement*: 5+ Windows Event ID 4625 (Failed Logon) on Host A followed within 60 seconds by Event ID 4624 (Successful Logon) and immediate execution of \`psexec.exe\` or \`powershell -enc\` to Host B -> Triggers High-Severity Alert.`,
      commands: [
        { label: 'Splunk Search Processing Language (SPL) - Detect Mimikatz Privileges', cmd: 'index=windows EventCode=4673 "SeDebugPrivilege" | stats count by host, user' },
        { label: 'Wazuh Agent - Check Status on Linux Endpoint', cmd: '/var/ossec/bin/wazuh-control status' },
        { label: 'Query Windows Event Log for Account Lockouts (Event 4740)', cmd: 'Get-WinEvent -FilterHashtable @{LogName="Security"; Id=4740} -MaxEvents 5' }
      ],
      realWorldCaseStudy: {
        title: 'Target Corporation Breach (2013) - The Ignored Alert Failure',
        summary: 'Attackers breached Target via compromised HVAC vendor credentials. The security system (FireEye) successfully generated critical alerts about malware staging, but the SOC Tier 1 team in Bangalore dismissed or failed to escalate the alert to Minneapolis HQ in time, resulting in 40M credit cards stolen.',
        lesson: 'Alert fatigue and unclear escalation playbooks neutralize even the most expensive detection tools; rigorous alert verification is essential.'
      },
      tacticalTakeaways: [
        'Tune out noisy low-fidelity alerts to protect analysts from alert fatigue.',
        'Enforce strict Mean Time to Detect (MTTD) and Mean Time to Respond (MTTR) performance metrics in the SOC.',
        'Align all SIEM correlation rules and playbooks to the MITRE ATT&CK enterprise matrix.'
      ]
    },
    phase2: [
      {
        id: 'q09-01',
        category: 'Foundational',
        question: 'What are the distinct responsibilities of a Tier 1 SOC Analyst versus a Tier 2 Incident Responder?',
        answer: 'Tier 1 analysts handle initial 24/7 alert monitoring, perform basic triage, eliminate false positives, and escalate verified threats. Tier 2 responders conduct deep forensic analysis, isolate infected hosts, eradicate persistence mechanisms, and coordinate containment playbooks.',
        explanation: 'Tier 1 is high-volume triage; Tier 2 is technical investigation and remediation.',
        tacticalTip: 'Standard Operating Procedures (SOPs) and runbooks guide Tier 1 escalation criteria.'
      }
    ],
    phase3: [
      {
        id: 'qz09-01',
        question: 'Which Windows Security Event ID corresponds to a failed logon attempt, crucial for detecting brute-force or password-spraying attacks?',
        scenario: 'Writing a SIEM correlation rule to detect Active Directory authentication attacks.',
        options: [
          'Event ID 4625',
          'Event ID 4624',
          'Event ID 7045',
          'Event ID 1102'
        ],
        correctIndex: 0,
        explanation: 'Event ID 4625 indicates an account failed to log on, while 4624 indicates a successful logon.',
        domainCategory: 'Core Cyber Security & SOC Defense'
      }
    ]
  },

  // T10: Incident Response & Digital Forensics
  {
    id: 't10-incident-response',
    domainId: 'core-cyber',
    title: 'Incident Response Lifecycle & Digital Forensics (NIST / SANS)',
    level: 'Advanced Tactical',
    readTime: '24 min',
    tags: ['NIST SP 800-61', 'Order of Volatility', 'Memory Forensics', 'Chain of Custody'],
    phase1: {
      overview: 'Incident Response (IR) provides a structured, repeatable methodology for detecting, containing, eradicating, and recovering from cyber breaches while preserving legally admissible digital evidence. Adherence to NIST SP 800-61 and RFC 3227 (Order of Volatility) is mandatory for military commanders and digital forensics investigators.',
      architecture: `NIST SP 800-61 6-Phase Incident Response Lifecycle:
[ 1. Preparation ]   | Playbooks, jump kits, forensic workstations, offline comms
        |
[ 2. Detection & Analysis ] | Validate alert, scope affected endpoints, identify IOCs/TTPs
        |
[ 3. Containment ]   | Short-term isolation (pull network cable/vLAN isolate) vs Long-term
        |
[ 4. Eradication ]   | Remove malware, purge webshells, rotate all compromised credentials
        |
[ 5. Recovery ]      | Restore from clean verified backups, monitor for re-infection
        |
[ 6. Lessons Learned]| Post-incident debrief, update defenses, notify leadership / CERT-In`,
      deepDive: `### Order of Volatility (RFC 3227)
When seizing a compromised system, digital evidence degrades rapidly. Evidence must be acquired from most volatile to least volatile:
1. CPU Registers & Cache (Nanoseconds)
2. Routing tables, ARP cache, Process table, In-memory kernel data
3. System Memory (RAM - lost upon reboot!)
4. Temporary file systems & swap space
5. Hard drives & solid state media (Flash/NVMe)
6. Remote logging data & network flows
7. Physical configuration & network topology
8. Archival backups and magnetic tapes

### Critical Rule: NEVER Reboot a Compromised Machine!
Rebooting destroys RAM contents containing decrypted ransomware keys, active command-and-control IP connections, injection artifacts, and injected DLLs. Always capture RAM with tools like WinPmem or FTK Imager before touching disk!`,
      commands: [
        { label: 'Capture RAM on Windows using WinPmem', cmd: 'winpmem.exe -o physical_memory.raw' },
        { label: 'Analyze Memory Dump via Volatility 3 (List Running Processes)', cmd: 'python3 vol.py -f physical_memory.raw windows.pslist' },
        { label: 'Generate Forensically Sound Bit-Stream Image on Linux (dd)', cmd: 'dd if=/dev/sdb of=/evidence/drive_image.raw bs=64K conv=noerror,sync status=progress' },
        { label: 'Verify Cryptographic Hash of Forensic Image (SHA-256)', cmd: 'sha256sum /evidence/drive_image.raw' }
      ],
      realWorldCaseStudy: {
        title: 'SolarWinds Orion Supply Chain Incident (2020)',
        summary: 'UNC2452 (Russian SVR) compromised SolarWinds build pipeline, inserting the SUNBURST backdoor into signed updates delivered to 18,000 customers, including US DoD and Treasury. Rapid memory forensics and forensic triage isolated dormant beaconing mechanisms.',
        lesson: 'Forensic readiness, centralized logging, and memory analysis capabilities are critical for detecting deeply stealthy nation-state supply chain implants.'
      },
      tacticalTakeaways: [
        'Always maintain an unbroken Chain of Custody document for every seized hard drive or memory dump.',
        'Never conduct forensic analysis directly on original evidence; always create a write-blocked cryptographic bit-stream copy.',
        'Establish out-of-band communication channels (e.g. Signal or offline radios) during active incident response to prevent attackers from eavesdropping on containment plans.'
      ]
    },
    phase2: [
      {
        id: 'q10-01',
        category: 'Foundational',
        question: 'Why must an incident responder capture volatile system memory (RAM) before shutting down or rebooting a compromised computer?',
        answer: 'RAM is volatile memory; powering down or rebooting immediately erases all data in RAM. RAM contains vital transient artifacts: malware running in-memory without touching disk (fileless malware), active network sockets, injected DLLs, unencrypted chat logs, and cryptographic keys.',
        explanation: 'Once lost, volatile artifacts cannot be recovered from the physical hard drive.',
        tacticalTip: 'Use a hardware write-blocker and specialized RAM capture utility like WinPmem or LiME.'
      },
      {
        id: 'q10-02',
        category: 'Defense & Military Focus',
        question: 'What constitutes a valid Chain of Custody in military and legal digital forensics?',
        answer: 'Chain of Custody is a chronological, legally verifiable paper and digital log tracking who seized the evidence, the exact timestamp, where it was stored, who accessed it, why it was accessed, and cryptographic hashes (SHA-256) verifying the evidence was never altered.',
        explanation: 'Without a strict chain of custody, evidence is dismissed as tainted and inadmissible in court-martial or civil court.',
        tacticalTip: 'Compute SHA-256 hashes immediately upon acquisition and verify them before and after every forensic procedure.'
      }
    ],
    phase3: [
      {
        id: 'qz10-01',
        question: 'According to RFC 3227 Order of Volatility, which piece of digital evidence must be collected FIRST during a live incident response triage?',
        scenario: 'A tactical military server is suspected of active compromise by a foreign threat actor.',
        options: [
          'CPU registers, cache, and system RAM',
          'Archival backup tapes stored in safe',
          'Non-volatile magnetic hard drive partitions',
          'Printed server room access logs'
        ],
        correctIndex: 0,
        explanation: 'CPU registers, cache, and RAM are the most volatile data and disappear immediately upon power loss or reboot.',
        domainCategory: 'Core Cyber Security & SOC Defense'
      }
    ]
  },

  // T11: Malware Analysis & Ransomware Triage
  {
    id: 't11-malware-analysis',
    domainId: 'core-cyber',
    title: 'Malware Analysis, Reverse Engineering & Ransomware Triage',
    level: 'Advanced Tactical',
    readTime: '24 min',
    tags: ['Static Analysis', 'Dynamic Analysis', 'Ghidra', 'Ransomware', 'Sandboxing'],
    phase1: {
      overview: 'Malware (Malicious Software) is the weaponized payload used to conduct espionage, sabotage, exfiltration, and extortion. Malware analysts dissect malicious executables through static and dynamic analysis to uncover command-and-control infrastructure, extract cryptographic keys, and engineer defensive detection signatures.',
      architecture: `Malware Analysis Methodology:
[ 1. Basic Static Analysis ]    | File hashes, strings, PE header inspection, VirusTotal lookup
              |
[ 2. Basic Dynamic Analysis ]   | Detonate sample in isolated sandbox, observe network/process/registry changes
              |
[ 3. Advanced Static Analysis ] | Disassemble and decompile in Ghidra / IDA Pro, analyze assembly instructions
              |
[ 4. Advanced Dynamic Analysis ]| Attach debugger (x64dbg), set breakpoints, step through encrypted payload unpacking`,
      deepDive: `### Ransomware Kill Chain
1. **Initial Access**: Phishing email, exposed RDP port, or vulnerable VPN gateway.
2. **Execution & Evasion**: Unpacks payload into memory; terminates antivirus services via command line (\`net stop "WinDefend"\`).
3. **Shadow Copy Deletion**: Silently executes:
   \`vssadmin delete shadows /all /quiet\`
   \`bcdedit /set {default} recoveryenabled No\`
4. **Encryption**: Traverses local drives and network shares, encrypting documents using AES-256 / ChaCha20; encrypts the symmetric key using an embedded RSA-4096 public key belonging to the attacker.
5. **Ransom Note Dropped**: Changes desktop wallpaper and leaves instructions demanding cryptocurrency payment.`,
      commands: [
        { label: 'Extract Strings from Suspicious Executable (Linux/WSL)', cmd: 'strings -a suspicious.exe | grep -iE "http|cmd|powershell|key"' },
        { label: 'Inspect Portable Executable (PE) Headers with pestr', cmd: 'pescan suspicious.exe' },
        { label: 'Decompile Executable with NSA Ghidra (CLI Headless Mode)', cmd: 'analyzeHeadless /project_dir TacticalProject -import malware.exe' },
        { label: 'Check Windows Shadow Copies (Ransomware Triage in CMD)', cmd: 'vssadmin list shadows' }
      ],
      realWorldCaseStudy: {
        title: 'NotPetya Cyber Weapon Attack (2017)',
        summary: 'Disguised as ransomware, NotPetya was actually a destructive state-sponsored wiper targeting Ukrainian critical infrastructure via the MeDoc accounting software update. It spread automatically via EternalBlue and PsExec, permanently encrypting the Master File Table (MFT) with no decryption possible, causing $10B+ global damage.',
        lesson: 'Differentiates true ransomware from pseudo-ransomware wipers designed purely for national infrastructure sabotage.'
      },
      tacticalTakeaways: [
        'Always conduct dynamic analysis in an air-gapped, non-networked sandbox or isolated VLAN.',
        'Back up all mission-critical data following the 3-2-1 rule (3 copies, 2 different media, 1 air-gapped immutable copy).',
        'Monitor for anomalous volume shadow copy deletion commands (`vssadmin delete shadows`) as an immediate ransomware indicator.'
      ]
    },
    phase2: [
      {
        id: 'q11-01',
        category: 'Foundational',
        question: 'What is the primary difference between Static Malware Analysis and Dynamic Malware Analysis?',
        answer: 'Static analysis inspects the binary code without executing it (reading headers, decompiling assembly, inspecting strings). Dynamic analysis executes the malware in a controlled, isolated sandbox environment to observe its live behavior (network connections, process injection, registry modifications).',
        explanation: 'Static analysis is safe but hindered by obfuscation; dynamic analysis shows real behavior but risks sandbox evasion or infection if not properly isolated.',
        tacticalTip: 'Advanced malware checks for hypervisor artifacts (e.g. VMware tools) and refuses to run if it detects a sandbox.'
      }
    ],
    phase3: [
      {
        id: 'qz11-01',
        question: 'Which specific command is almost universally executed by modern Windows ransomware to prevent victim administrators from recovering encrypted files via System Restore?',
        scenario: 'Analyzing endpoint telemetry during a live ransomware encryption event.',
        options: [
          'vssadmin delete shadows /all /quiet',
          'format C: /fs:ntfs /q',
          'del /f /s C:\\Windows\\System32',
          'shutdown /r /t 0'
        ],
        correctIndex: 0,
        explanation: '`vssadmin delete shadows /all /quiet` silently destroys Volume Shadow Copies to prevent easy restoration without paying ransom.',
        domainCategory: 'Core Cyber Security & SOC Defense'
      }
    ]
  },

  // T21: Air-Gapped Networks & Cross-Domain Solutions
  {
    id: 't21-air-gapped-defense',
    domainId: 'military-cyber',
    title: 'Air-Gapped Networks, Optical Diodes & Cross-Domain Security',
    level: 'Specialized Defense',
    readTime: '22 min',
    tags: ['Air-Gap', 'Data Diodes', 'Cross-Domain Solutions', 'TEMPEST', 'USB Drops'],
    phase1: {
      overview: 'Air-gapping is the ultimate security isolation architecture, physically disconnecting mission-critical defense, missile telemetry, and nuclear systems from the Internet and commercial networks. However, modern adversaries weaponize acoustic signals, electromagnetic side channels, supply chain tampering, and physical USB delivery to bridge air gaps.',
      architecture: `Cross-Domain Solution (CDS) Architecture:
[ UNCLASSIFIED NETWORK ]
           |
[ Pre-Screening Anti-Malware Content Disarm & Reconstruction (CDR) Engine ]
           |
[ HARDWARE OPTICAL DATA DIODE ]  <-- Unidirectional Light Beam (Tx -> Rx)
           |
[ Post-Verification Quarantine & Integrity Validator ]
           |
[ TOP SECRET AIR-GAPPED DEFENSE ENCLAVE ]`,
      deepDive: `### Covert Air-Gap Bridging Attack Vectors
- **Acoustic / Ultrasonic Exfiltration (MOSQUITO / Fansmitter)**: Malware modulates internal computer chassis cooling fans or GPU coils to generate high-frequency audio tones picked up by a nearby compromised smartphone microphone.
- **Electromagnetic Radiation (AirHopper / GSMem)**: Malware uses the computer\'s RAM bus or display cable as a makeshift radio transmitter, broadcasting data on FM radio or cellular frequencies to a receiver located in the parking lot.
- **Physical USB Drives**: As shown in Stuxnet, infected USB drives carried by maintenance personnel bridge the gap effortlessly.`,
      commands: [
        { label: 'Disable USB Storage via Windows Registry in CMD', cmd: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\USBSTOR" /v Start /t REG_DWORD /d 4 /f' },
        { label: 'Audit Removable Media Events in PowerShell', cmd: 'Get-WinEvent -LogName "Microsoft-Windows-DriverFrameworks-UserMode/Operational" | Where-Object {$_.Id -eq 2003}' },
        { label: 'Content Disarm & Reconstruction (CDR) File Sanitization', cmd: 'cdr-engine --sanitize input_intel.pdf --output safe_intel.pdf' }
      ],
      realWorldCaseStudy: {
        title: 'Agent.btz Military Air-Gap Breach (2008)',
        summary: 'Malware on an infected USB thumb drive plugged into a US military laptop at a base in the Middle East infected the classified Secret Internet Protocol Router Network (SIPRNet), transmitting coordinates to foreign servers and prompting the creation of US Cyber Command.',
        lesson: 'Demonstrates why armed forces strictly prohibit unauthorized removable media and mandate automated USB write-blocking.'
      },
      tacticalTakeaways: [
        'Physically weld or epoxy unused external USB and FireWire ports on air-gapped tactical computers.',
        'Use Content Disarm and Reconstruction (CDR) to strip all active scripts, macros, and embedded binaries from documents entering via data diodes.',
        'Enforce Faraday cage shielding and TEMPEST emission standards around air-gapped cryptographic centers.'
      ]
    },
    phase2: [
      {
        id: 'q21-01',
        category: 'Defense & Military Focus',
        question: 'What is Content Disarm and Reconstruction (CDR), and why is it superior to traditional antivirus scanning for data passing into air-gapped military networks?',
        answer: 'Antivirus relies on known signatures or heuristic guesses. CDR assumes all incoming files are malicious: it breaks files down into fundamental discrete elements, strips away all executable code, macros, and unknown payloads, and reconstructs a mathematically clean file before ingestion.',
        explanation: 'CDR defeats zero-day exploits embedded in weaponized PDF, Office, and image files without needing signature updates.',
        tacticalTip: 'Deploy CDR appliances in series with unidirectional optical data diodes.'
      }
    ],
    phase3: [
      {
        id: 'qz21-01',
        question: 'What is the most secure hardware mechanism to transfer weather and public news data into a classified military air-gapped network without any possibility of reverse exfiltration?',
        scenario: 'Designing a secure data ingestion pipeline for an armed forces command center.',
        options: [
          'Hardware Unidirectional Optical Data Diode',
          'Encrypted Dual-Homed Commercial USB Flash Drive',
          'Standard Commercial Stateful Firewall',
          'IPsec Tunnel over Public Wi-Fi'
        ],
        correctIndex: 0,
        explanation: 'An optical data diode enforces hardware-level unidirectional transmission via a physical LED transmitter and photodiode receiver with no physical reverse path.',
        domainCategory: 'Defense & Critical Infrastructure Warfare'
      }
    ]
  },

  // T23: Threat Actors & Nation-State APTs
  {
    id: 't23-threat-actors-apts',
    domainId: 'military-cyber',
    title: 'Nation-State Advanced Persistent Threats (APTs) & Attribution',
    level: 'Specialized Defense',
    readTime: '26 min',
    tags: ['APT28', 'APT29', 'Lazarus Group', 'RedEcho', 'Threat Intelligence', 'MITRE ATT&CK'],
    phase1: {
      overview: 'Advanced Persistent Threats (APTs) are highly resourced, state-sponsored cyber espionage and offensive military cyber warfare units. Unlike opportunistic cyber criminals driven by fast cash, APTs maintain persistent, stealthy access over years to steal military intelligence, weapon schematics, and pre-position cyber weapons in foreign critical infrastructure.',
      architecture: `Prominent Nation-State APT Profile Matrix:
Actor Name    | State Sponsor | Focus / Specialization              | Notorious Operations
APT28 (Fancy Bear) | Russia (GRU)  | Military intelligence, NATO targets| DNC Hack, Ukrainian artillery app trojan
APT29 (Cozy Bear)  | Russia (SVR)  | Stealthy diplomatic cyber espionage| SolarWinds supply chain breach
Lazarus Group | North Korea   | Financial theft & defense sabotage  | Sony Pictures, WannaCry, KKNPP India
Volt Typhoon  | China (PLA)   | Pre-positioning in critical infra   | US telecommunications, maritime ports
RedEcho       | China         | Indian power grid targeted campaigns| Mumbai blackout telemetry probing (2020)`,
      deepDive: `### APT Tactics, Techniques & Procedures (TTPs)
APTs evade detection by utilizing "Living off the Land" (LotL) binaries (LOLBins)—using built-in operating system tools like PowerShell, WMI, Bitsadmin, and Certutil instead of dropping custom malware executables that trigger antivirus alarms.`,
      commands: [
        { label: 'Identify Living-off-the-Land (LOLBin) PowerShell Execution in Event Logs', cmd: 'Get-WinEvent -LogName "Microsoft-Windows-PowerShell/Operational" | Where-Object {$_.Id -eq 4104 -and $_.Message -match "-enc|-w hidden"}' },
        { label: 'Query Threat Intelligence via MISP API', cmd: 'curl -H "Authorization: YOUR_KEY" https://misp.defense.gov.in/attributes/restSearch/value:malicious_ip' }
      ],
      realWorldCaseStudy: {
        title: 'RedEcho Targeting of Indian Critical Infrastructure (2020)',
        summary: 'Recorded Future threat research revealed that Chinese state-sponsored group RedEcho targeted 10 distinct Indian power sector organizations (including 4 of India\'s 5 regional load dispatch centers) using the ShadowPad modular trojan during high border tensions in Ladakh.',
        lesson: 'Proves that modern cyber operations are actively coordinated with physical geopolitical tensions to create strategic deterrence.'
      },
      tacticalTakeaways: [
        'Map all internal detections to the MITRE ATT&CK Framework to identify coverage gaps.',
        'Actively monitor for Living-off-the-Land (LOLBin) activity such as obfuscated PowerShell, Rundll32, and MSBuild executions.',
        'Implement threat hunting hypotheses assuming active nation-state stealth implants already exist within the network.'
      ]
    },
    phase2: [
      {
        id: 'q23-01',
        category: 'Defense & Military Focus',
        question: 'What is "Living off the Land" (LotL) in advanced cyber warfare, and why do nation-state APT actors favor this technique?',
        answer: 'Living off the Land refers to using legitimate, pre-installed operating system tools and administration utilities (like PowerShell, WMI, BITSadmin, certutil, and bash) to carry out malicious actions rather than downloading custom malware files.',
        explanation: 'Because these binaries are digitally signed by Microsoft or the OS vendor, they rarely trigger traditional antivirus alerts and blend in with normal administrative activity.',
        tacticalTip: 'Enable PowerShell Script Block Logging (Event ID 4104) and Constrained Language Mode to detect LOLBin abuse.'
      }
    ],
    phase3: [
      {
        id: 'qz23-01',
        question: 'Which cyber espionage group, linked by security researchers to North Korea, was implicated in both the 2017 WannaCry outbreak and malware traces found at India\'s Kudankulam Nuclear Power Plant?',
        scenario: 'Briefing cyber defense leadership on nation-state threat actor capabilities.',
        options: [
          'Lazarus Group',
          'APT28 (Fancy Bear)',
          'Equation Group',
          'Sandworm Team'
        ],
        correctIndex: 0,
        explanation: 'Lazarus Group (North Korean state-sponsored threat group) was linked to WannaCry and the DTrack malware found on Kudankulam IT systems.',
        domainCategory: 'Defense & Critical Infrastructure Warfare'
      }
    ]
  },

  // T26: Defence Cyber Agency (DCA)
  {
    id: 't26-dca-india',
    domainId: 'indian-cyber',
    title: 'Defence Cyber Agency (DCA) & Tri-Services Cyber Command',
    level: 'National Defense Strategic',
    readTime: '20 min',
    tags: ['DCA', 'Tri-Services', 'Armed Forces', 'Indian Army', 'Navy', 'Air Force', 'Cyber Command'],
    phase1: {
      overview: 'The Defence Cyber Agency (DCA) is India\'s specialized tri-services agency operating under the Integrated Defence Staff (HQ IDS). Established following the recommendations of the Naresh Chandra Task Force and Chiefs of Staff Committee, the DCA unifies the cyber capabilities of the Indian Army, Indian Navy, and Indian Air Force to defend military communications networks, develop joint cyber doctrine, and execute strategic counter-cyber operations.',
      architecture: `Indian Military Cyber Command Structure:
[ National Security Council (NSC) & Prime Minister\'s Office ]
                        |
       [ Chief of Defence Staff (CDS) & HQ IDS ]
                        |
            [ DEFENCE CYBER AGENCY (DCA) ]
            (Headed by Major General rank officer)
                        |
       +----------------+----------------+
       |                                 |
[ Service Cyber Commands ]      [ Joint Operations & Intelligence ]
- Indian Army Cyber Group        - Joint Cyber Red Team (Offensive Testing)
- Indian Navy Cyber Security Ops - Joint Cyber Blue Team (24/7 Defense & SOC)
- Indian Air Force Cyber Warfare - Cryptographic Standards & Hardware Audit (DRDO SAG)`,
      deepDive: `### Core Strategic Mandates of DCA
1. **Defending Tactical Military Communications**: Hardening dedicated strategic networks including Army Static Switched Communication Network (ASCON), Air Force Network (AFNET), and Navy Next-Gen Digital Network (NGDN).
2. **Developing Joint Cyber Warfare Doctrine**: Formulating synchronized protocols across land, sea, air, and cyber warfare operations.
3. **Counter-APT Operations & Threat Intelligence**: Tracking hostile foreign military cyber commands and pre-empting threats against military weapon supply chains.
4. **Coordination with Sovereign Agencies**: Interfacing with NTRO (National Technical Research Organisation), CERT-In, DRDO, and intelligence bureaus.`,
      commands: [
        { label: 'Check Secure Terminal Emulation for Military C4I Access', cmd: 'ssh -o MACs=hmac-sha2-512-etm@openssh.com -o KexAlgorithms=curve25519-sha256 commander@defense.mil.in' },
        { label: 'Audit Security Baselines on Defense Windows Workstations', cmd: 'secedit /analyze /db defense_baseline.sdb /cfg c:\\secpol\\military_policy.inf' }
      ],
      realWorldCaseStudy: {
        title: 'Joint Military Exercises & Multi-Domain Cyber Simulation',
        summary: 'Indian Armed Forces tri-services exercises routinely incorporate high-intensity cyber warfare scenarios where the DCA conducts simulated cyber attacks against radar, satellite communications, and logistics networks to validate operational readiness under contested cyber environments.',
        lesson: 'Modern battlefield dominance requires seamless coordination between kinetic weapons and cyber-electronic warfare units.'
      },
      tacticalTakeaways: [
        'Military communications must use indigenous, DRDO-certified hardware cryptographic modules.',
        'Enforce strict compartmentalization of intelligence across operational commands.',
        'Regular joint exercises between service cyber wings ensure interoperability during high-readiness crises.'
      ]
    },
    phase2: [
      {
        id: 'q26-01',
        category: 'Defense & Military Focus',
        question: 'Under which organizational entity does the Defence Cyber Agency (DCA) operate, and what is its primary tri-services function?',
        answer: 'The DCA operates under the Integrated Defence Staff (HQ IDS) reporting to the Chief of Defence Staff (CDS). It coordinates and integrates cyber defense and offensive capabilities across the Indian Army, Indian Navy, and Indian Air Force.',
        explanation: 'Before DCA, each service operated separate cyber wings without unified strategic command.',
        tacticalTip: 'DCA works closely with the Defence Space Agency (DSA) and Armed Forces Special Operations Division (AFSOD).'
      }
    ],
    phase3: [
      {
        id: 'qz26-01',
        question: 'Which high-level agency was created to unify and coordinate the cyber warfare capabilities of the Indian Army, Indian Navy, and Indian Air Force?',
        scenario: 'National security seminar examining India\'s defense modernization.',
        options: [
          'Defence Cyber Agency (DCA)',
          'National Informatics Centre (NIC)',
          'Central Bureau of Investigation (CBI)',
          'Telecom Disputes Settlement Tribunal'
        ],
        correctIndex: 0,
        explanation: 'The Defence Cyber Agency (DCA) is the tri-services joint command created specifically to unify cyber defense and operations across the three branches of the armed forces.',
        domainCategory: 'Indian Cyber Defense & CERT-In Frameworks'
      }
    ]
  }
];
