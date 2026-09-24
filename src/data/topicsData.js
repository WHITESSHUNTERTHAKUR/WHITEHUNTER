// CYBEROPS DEFENSE COMMAND - Tactical Curriculum & Learning Data
// Comprehensive 28 Topics across 5 Strategic Domains

export const DOMAINS = [
  { id: 'networking', name: 'Networking & Tactical Infrastructure', icon: 'Network', color: '#00f2fe' },
  { id: 'core-cyber', name: 'Core Cyber Security & SOC Defense', icon: 'Shield', color: '#10b981' },
  { id: 'ethical-hacking', name: 'Ethical Hacking & Red Teaming', icon: 'Terminal', color: '#f59e0b' },
  { id: 'military-cyber', name: 'Defense & Critical Infrastructure Warfare', icon: 'Crosshair', color: '#ef4444' },
  { id: 'indian-cyber', name: 'Indian Cyber Defense & CERT-In Frameworks', icon: 'Flag', color: '#8b5cf6' }
];

export const TOPICS_DATA = [
  // ==========================================
  // DOMAIN 1: NETWORKING & TACTICAL INFRASTRUCTURE
  // ==========================================
  {
    id: 't01-osi-tcpip',
    domainId: 'networking',
    title: 'OSI & TCP/IP Model: Deep Packet Inspection & Layer Defense',
    level: 'Foundational to Tactical',
    readTime: '18 min',
    tags: ['OSI 7 Layers', 'TCP/IP', 'Packet Encapsulation', 'DPI', 'Wireshark'],
    phase1: {
      overview: 'The Open Systems Interconnection (OSI) 7-layer reference model and TCP/IP 4-layer architecture form the operational backbone of all digital communications. In military and high-security tactical networks, defense-in-depth requires enforcing security controls across each layer: physical tampering at L1, MAC spoofing at L2, IP spoofing at L3, SYN flood denial at L4, and application exploits at L7.',
      architecture: `Layer Comparison & Defense Controls:
[7] Application  | HTTP/S, DNS, SSH, Tactical C2 | WAF, Signature Inspection, TLS Termination
[6] Presentation | SSL/TLS, Encryption, Format   | Certificate Validation, Payload Decryption
[5] Session      | RPC, NetBIOS, Sockets         | Session Timeout, Token Authentication
[4] Transport    | TCP (3-Way), UDP              | State-tracking, SYN Cookies, Rate Limiting
[3] Network      | IPv4, IPv6, ICMP, IPsec       | ACLs, Anti-Spoofing (uRPF), Route Verification
[2] Data Link    | Ethernet, MAC, 802.1Q VLAN    | Port Security, DHCP Snooping, Dynamic ARP Insp.
[1] Physical     | Fiber, RF Wireless, Copper    | Tempest shielding, Physical locks, Port disablement`,
      deepDive: `### TCP 3-Way Handshake & Teardown Mechanics
1. **SYN (Synchronize)**: Client sends packet with random Initial Sequence Number (ISN_c), SYN flag set.
2. **SYN-ACK**: Server replies with its own ISN_s and ACK = ISN_c + 1.
3. **ACK**: Client acknowledges with ACK = ISN_s + 1. Connection established.

### Deep Packet Inspection (DPI) in Defense Operations
Unlike standard firewalls inspecting only L3/L4 headers (IP and Port), DPI reassembles TCP streams and inspects the payload buffer against known protocol anomalies, regular expressions, and tactical attack signatures. DPI enables detection of command-and-control (C2) beaconing hidden inside benign HTTPS or DNS tunneling traffic.`,
      commands: [
        { label: 'Wireshark Filter - TCP SYN without ACK (Port Scanning)', cmd: 'tcp.flags.syn == 1 && tcp.flags.ack == 0' },
        { label: 'Wireshark Filter - Suspicious DNS Tunneling Queries (>50 chars)', cmd: 'dns.qry.name.len > 50' },
        { label: 'Linux IP State Check via ss', cmd: 'ss -t -a -n --state established' },
        { label: 'Enable TCP SYN Cookies against Floods (Linux Sysctl)', cmd: 'sysctl -w net.ipv4.tcp_syncookies=1' }
      ],
      realWorldCaseStudy: {
        title: 'Operation Aurora (2009) & Tactical Packet Tampering',
        summary: 'Targeted cyber attacks orchestrated by sophisticated threat actors against defense contractors and tech giants. The attackers exploited L7 browser vulnerabilities coupled with stealthy L4 reverse connections that bypassed egress packet filtering.',
        lesson: 'L3/L4 egress firewalls alone are inadequate; military-grade operations require L7 application layer inspection and strict egress whitelisting.'
      },
      tacticalTakeaways: [
        'Always enforce reverse path forwarding (uRPF) to neutralize IP spoofing at L3 perimeter routers.',
        'Never trust L2 boundaries without 802.1X network access control and DHCP snooping.',
        'Enforce TCP SYN cookies to mitigate SYN flood resource exhaustion on mission-critical servers.'
      ]
    },
    phase2: [
      {
        id: 'q01-01',
        category: 'Foundational',
        question: 'What is the exact sequence of packet flags exchanged during a normal TCP connection establishment and termination?',
        answer: 'Establishment: SYN -> SYN-ACK -> ACK. Termination: FIN -> ACK -> FIN -> ACK (or RST for abrupt reset).',
        explanation: 'The client sends SYN with its ISN. Server responds with SYN-ACK, incrementing client ISN by 1. Client completes handshake with ACK. For graceful termination, FIN is sent from each side and acknowledged.',
        tacticalTip: 'Look for asymmetric FIN-ACK sequences in packet captures; attackers often send RST packets to bypass stateful connection trackers.'
      },
      {
        id: 'q01-02',
        category: 'Operational / Scenario',
        question: 'How does an attacker exploit the TCP 3-way handshake during a SYN Flood attack, and how is it mitigated without dropping legitimate clients?',
        answer: 'The attacker floods the target with SYN packets with spoofed source IPs without sending the final ACK, exhausting the server\'s Half-Open Connection backlog table (TCB). Mitigation is achieved via TCP SYN Cookies.',
        explanation: 'When SYN Cookies are enabled, the server does not allocate memory for the TCB. Instead, it encodes the connection parameters cryptographically into the initial sequence number of the SYN-ACK. Memory is allocated only when the legitimate client returns the valid ACK.',
        tacticalTip: 'Verify SYN cookie activation on Linux firewalls using `sysctl net.ipv4.tcp_syncookies`.'
      },
      {
        id: 'q01-03',
        category: 'Defense & Military Focus',
        question: 'In an air-gapped or high-security defense enclave, at which OSI layer does an Optical Data Diode operate, and what is its core property?',
        answer: 'An Optical Data Diode operates strictly at Layer 1 (Physical Layer), enforcing unidirectional hardware-level data flow (e.g. LED transmitter to photodiode receiver with no return fiber).',
        explanation: 'Because the physical medium lacks a return path, it is physically impossible for malware in the high-security network to transmit data back to the lower-security network.',
        tacticalTip: 'Since TCP requires bidirectional ACKs, data diodes utilize modified UDP or specialized L4/L7 unidirectional protocols.'
      },
      {
        id: 'q01-04',
        category: 'Foundational',
        question: 'What is the maximum transmission unit (MTU) of standard Ethernet, and what security threat is associated with packet fragmentation?',
        answer: 'Standard Ethernet MTU is 1500 bytes. Attackers use IP fragmentation overlap (e.g. Tiny Fragment attack) to evade IDS/IPS inspection.',
        explanation: 'By fragmenting malicious payloads so that the L4 header (ports) is split across packets, poorly configured firewalls may pass subsequent fragments without inspecting the payload.',
        tacticalTip: 'Configure perimeter firewalls to reassemble and validate fragments before forwarding.'
      }
    ],
    phase3: [
      {
        id: 'qz01-01',
        question: 'During a security audit, you notice thousands of TCP packets with the SYN flag set, but no corresponding ACKs are returned. What type of attack is occurring?',
        scenario: 'A SOC analyst at an Air Force base observes an internal server reaching 100% memory utilization due to thousands of half-open TCP states.',
        options: [
          'TCP SYN Flood Denial-of-Service Attack',
          'ARP Cache Poisoning Man-in-the-Middle',
          'Smurf ICMP Amplification Attack',
          'BGP Autonomous System Hijacking'
        ],
        correctIndex: 0,
        explanation: 'A flood of SYN packets without final ACKs leaves connections in SYN_RECV state, exhausting kernel memory structures (TCB). This is a classic TCP SYN Flood.',
        domainCategory: 'Networking & Tactical Infrastructure'
      },
      {
        id: 'qz01-02',
        question: 'Which OSI layer is responsible for authenticating and encrypting payload data via TLS 1.3 in the OSI conceptual model?',
        scenario: 'A defense comms specialist is reviewing where cipher suites and symmetric session keys are negotiated.',
        options: [
          'Layer 2 - Data Link Layer',
          'Layer 3 - Network Layer',
          'Layer 4 - Transport Layer',
          'Layer 6 - Presentation Layer'
        ],
        correctIndex: 3,
        explanation: 'In the OSI 7-layer model, Layer 6 (Presentation Layer) handles data formatting, compression, and encryption/decryption (such as SSL/TLS). In TCP/IP it is mapped inside the Application layer.',
        domainCategory: 'Networking & Tactical Infrastructure'
      },
      {
        id: 'qz01-03',
        question: 'How does an Optical Data Diode physically guarantee unidirectional data transmission in military critical networks?',
        scenario: 'A nuclear command network requires telemetry data ingestion from an external meteorological station without risk of reverse exfiltration.',
        options: [
          'By using stateful firewall access control lists (ACLs)',
          'By utilizing a single physical fiber strand with a transmitter on one end and receiver on the other',
          'By routing traffic through a dual-homed VPN gateway',
          'By applying WPA3 enterprise cryptographic certs'
        ],
        correctIndex: 1,
        explanation: 'Optical data diodes enforce physics-based one-way transmission using a single directional light transmitter (LED/Laser) and optical receiver. There is no physical return path for data.',
        domainCategory: 'Defense & Critical Infrastructure Warfare'
      },
      {
        id: 'qz01-04',
        question: 'Which Wireshark display filter isolates all DNS queries whose domain name length exceeds 50 characters, typically used for detecting DNS exfiltration?',
        scenario: 'A tactical analyst investigates covert C2 beaconing using DNS text records.',
        options: [
          'dns.flags.response == 0 and dns.qry.name.len > 50',
          'tcp.port == 53 and ip.len > 50',
          'udp.length > 50 and dns.type == "A"',
          'dns.exfiltration.detect == true'
        ],
        correctIndex: 0,
        explanation: '`dns.flags.response == 0` specifies DNS query packets (requests), and `dns.qry.name.len > 50` checks for domain name query lengths greater than 50 characters.',
        domainCategory: 'Ethical Hacking & Red Teaming'
      }
    ]
  },

  {
    id: 't02-ip-subnetting',
    domainId: 'networking',
    title: 'IP Addressing, Subnetting, CIDR & Tactical Supernetting',
    level: 'Foundational to Tactical',
    readTime: '20 min',
    tags: ['IPv4', 'IPv6', 'CIDR', 'VLSM', 'Subnet Mask', 'Supernetting'],
    phase1: {
      overview: 'IP addressing defines how endpoints are identified and routed across military intranets, tactical radio networks, and the global Internet. Variable Length Subnet Masking (VLSM) and Classless Inter-Domain Routing (CIDR) allow network architects to partition large network spaces into isolated operational security zones (e.g. Command Staff, Radar Telemetry, Guest Wi-Fi, Weapons Guidance).',
      architecture: `Subnet Mask Bit Representation:
Prefix | Subnet Mask       | Total Hosts | Usable Hosts | Operations Use Case
/24    | 255.255.255.0     | 256         | 254          | Base Command Department LAN
/26    | 255.255.255.192   | 64          | 62           | Secure SOC Workstation Cluster
/28    | 255.255.255.240   | 16          | 14           | Critical Server Farm Enclave
/30    | 255.255.255.252   | 4           | 2            | Point-to-Point Tactical Router Link
/32    | 255.255.255.255   | 1           | 1 (Host)     | Specific VIP / C4I Terminal Target`,
      deepDive: `### Subnet Math Core Formulas
- **Number of Subnets created**: 2^s (where s = borrowed subnet bits).
- **Total Hosts per Subnet**: 2^h (where h = remaining host bits).
- **Usable Hosts**: 2^h - 2 (subtracting 1 for the Subnet Network ID and 1 for the Directed Broadcast Address).

### Tactical Military Subnetting Example:
Given base network **10.140.0.0/16** for a Regional Defense Command:
- Subnet 1: 10.140.0.0/24 -> HQ Command Operations (254 usable IPs)
- Subnet 2: 10.140.1.0/26 -> Air Defense Radar Telemetry (62 usable IPs)
- Subnet 3: 10.140.1.64/28 -> Secure Cryptographic Key Server Farm (14 usable IPs)
- Subnet 4: 10.140.255.252/30 -> Uplink to Satellite Ground Station (2 usable IPs: .253 and .254)`,
      commands: [
        { label: 'Calculate Subnet via ipcalc (Linux)', cmd: 'ipcalc 192.168.10.0/26' },
        { label: 'View Interface IP & Netmask in PowerShell', cmd: 'Get-NetIPAddress -AddressFamily IPv4 | Format-Table' },
        { label: 'Add Static Route with CIDR in Windows Command Prompt', cmd: 'route ADD 10.140.1.0 MASK 255.255.255.192 10.140.0.1 -p' },
        { label: 'Linux CIDR Route Addition', cmd: 'ip route add 10.140.1.0/26 via 10.140.0.1 dev eth0' }
      ],
      realWorldCaseStudy: {
        title: 'Tactical Radio Network Misconfiguration in Joint Exercises',
        summary: 'During a multinational defense exercise, conflicting overlapping subnets (both units assigned 192.168.1.0/24) caused routing blackholes and failure of battle-tracking blue-force situational displays.',
        lesson: 'Rigorous hierarchical RFC 1918 / CGNAT IP allocation plans and VLSM documentation are mission-critical before tactical field deployment.'
      },
      tacticalTakeaways: [
        'Always use /30 or /31 subnets for point-to-point infrastructure links to conserve address space and prevent broadcast loops.',
        'Reserve the first 10 and last 5 addresses in any tactical subnet for static defense gateways and redundant VIPs.',
        'Ensure private IP ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) are dropped at the border gateway router.'
      ]
    },
    phase2: [
      {
        id: 'q02-01',
        category: 'Foundational',
        question: 'For a network block assigned 172.16.50.0/27, what is the subnet mask, total number of IP addresses, and number of usable host addresses?',
        answer: 'Subnet mask: 255.255.255.224. Total IP addresses: 32. Usable host addresses: 30.',
        explanation: '/27 has 27 network bits and 5 host bits (32 - 27 = 5). 2^5 = 32 total addresses. Usable hosts = 32 - 2 = 30. The mask is 11111111.11111111.11111111.11100000 = 255.255.255.224.',
        tacticalTip: 'The block size is 256 - 224 = 32. Next subnet starts at 172.16.50.32.'
      },
      {
        id: 'q02-02',
        category: 'Operational / Scenario',
        question: 'What is the purpose of RFC 1918 private IP addresses, and why can they not be directly routed across the public Internet?',
        answer: 'RFC 1918 reserves 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16 for internal enterprise and defense use. Public Internet routers drop these packets because they are non-globally unique and require NAT to access public networks.',
        explanation: 'Without NAT (Network Address Translation), return traffic cannot reach private IPs because Internet routing tables do not advertise private prefixes.',
        tacticalTip: 'Perimeter firewalls must feature egress ACL rules dropping any outbound packets with RFC 1918 source addresses.'
      },
      {
        id: 'q02-03',
        category: 'Defense & Military Focus',
        question: 'Why is a /30 subnet preferred over a /24 subnet for point-to-point microwave and tactical radio links between military outposts?',
        answer: 'A /30 provides exactly 2 usable host addresses, minimizing attack surface, preventing unauthorized devices from obtaining an IP, eliminating wasted IP space, and constraining broadcast traffic.',
        explanation: 'In tactical radio networks with constrained bandwidth (e.g. HF/VHF), unnecessary broadcast traffic degrades communications.',
        tacticalTip: 'Modern RFC 3021 also supports /31 subnets for point-to-point links (2 usable IPs without broadcast).'
      }
    ],
    phase3: [
      {
        id: 'qz02-01',
        question: 'What is the broadcast address for the subnet 192.168.1.128/26?',
        scenario: 'A network administrator needs to verify the broadcast boundaries of a high-security defense enclave.',
        options: [
          '192.168.1.191',
          '192.168.1.255',
          '192.168.1.192',
          '192.168.1.129'
        ],
        correctIndex: 0,
        explanation: 'A /26 mask has a block size of 64 (2^(32-26) = 64). Starting at 128, the range is 128 to 191. Network ID is .128, usable hosts are .129-.190, and broadcast is .191.',
        domainCategory: 'Networking & Tactical Infrastructure'
      },
      {
        id: 'qz02-02',
        question: 'You need to allocate a subnet for a military drone sensor telemetry cluster that requires exactly 12 active sensor nodes. What is the most efficient CIDR prefix?',
        scenario: 'Bandwidth and address conservation are critical in an expeditionary field network.',
        options: [
          '/28 (Provides 14 usable host IPs)',
          '/27 (Provides 30 usable host IPs)',
          '/29 (Provides 6 usable host IPs)',
          '/30 (Provides 2 usable host IPs)'
        ],
        correctIndex: 0,
        explanation: 'A /28 provides 2^(32-28) - 2 = 14 usable IP addresses, which satisfies the 12 nodes requirement with minimal waste. A /29 only supports 6 nodes (too small).',
        domainCategory: 'Networking & Tactical Infrastructure'
      }
    ]
  },

  // ==========================================
  // DOMAIN 2: CORE CYBER SECURITY & SOC DEFENSE
  // ==========================================
  {
    id: 't07-cia-zerotrust',
    domainId: 'core-cyber',
    title: 'Information Security Foundations: CIA Triad, AAA & Zero Trust Architecture',
    level: 'Foundational to Strategic',
    readTime: '22 min',
    tags: ['CIA Triad', 'Zero Trust', 'NIST SP 800-207', 'AAA', 'Least Privilege'],
    phase1: {
      overview: 'The bedrock of modern cyber security rests on the CIA Triad (Confidentiality, Integrity, and Availability) complemented by AAA (Authentication, Authorization, Accounting). Traditional perimeter-based security ("castle-and-moat") is obsolete in modern hybrid and military tactical environments. Zero Trust Architecture (ZTA) operates on the core doctrine: "Never Trust, Always Verify".',
      architecture: `Zero Trust Pillars (NIST SP 800-207):
1. Identities       | MFA, Continuous behavioral biometric telemetry
2. Endpoints        | Device health validation, EDR attestation, TPM 2.0
3. Networks         | Micro-segmentation, software-defined perimeters (SDP)
4. Applications     | Continuous L7 authorization, dynamic API tokens
5. Data             | End-to-end encryption at rest & in transit, DLP
6. Infrastructure   | Immutable IAC, automated patch verification, telemetry
Policy Decision Point (PDP) evaluates continuous risk before Policy Enforcement Point (PEP) grants access.`,
      deepDive: `### CIA Triad in Military Operations
- **Confidentiality**: Ensuring classified signals and tactical battle maps are shielded from unauthorized eyes (AES-256-GCM, Quantum-resistant algorithms).
- **Integrity**: Guaranteeing that missile coordinates or drone video telemetry have not been tampered with in flight (HMAC-SHA256, digital signatures).
- **Availability**: Guaranteeing uninterrupted access to C4I command centers during heavy jamming or DDoS onslaughts (redundant satellite links, anti-DDoS scrubbing).

### The AAA Framework
- **Authentication**: Proving identity (Who are you? Smart card CAC/PKI token + PIN).
- **Authorization**: Granting specific permissions (What are you cleared to access? Top Secret clearance, Need-to-Know basis).
- **Accounting**: Auditing actions (What did you execute and when? Immutable SIEM audit trail).`,
      commands: [
        { label: 'Check Zero Trust Identity Audit Log in PowerShell', cmd: 'Get-WinEvent -LogName Security | Where-Object {$_.Id -eq 4624} | Select-Object -First 10' },
        { label: 'Verify File Integrity Hash (SHA-256) in Windows', cmd: 'Get-FileHash -Algorithm SHA256 C:\\defense\\tactical_order.bin' },
        { label: 'Verify Linux File Integrity Hash', cmd: 'sha256sum /opt/soc/tactical_order.bin' },
        { label: 'Audit User Privileges in Windows Command Prompt', cmd: 'whoami /priv' }
      ],
      realWorldCaseStudy: {
        title: 'OPM Data Breach (2015) & Castle-and-Moat Failure',
        summary: 'Threat actors breached the US Office of Personnel Management, stealing 21.5 million background investigation files. The attackers compromised contractor credentials and roamed flat internal networks unrestricted for months.',
        lesson: 'Proves that perimeter defenses without internal micro-segmentation, continuous authentication, and Zero Trust allow devastating lateral movement.'
      },
      tacticalTakeaways: [
        'Enforce Least Privilege: No user, service account, or operator receives administrative access by default.',
        'Assume Breach: Design every defense enclave assuming the adjacent machine is already compromised.',
        'Continuous Verification: Re-authenticate session tokens dynamically when user location, IP, or behavior changes.'
      ]
    },
    phase2: [
      {
        id: 'q07-01',
        category: 'Foundational',
        question: 'Explain the difference between Authentication, Authorization, and Accounting (AAA) with a military operational example.',
        answer: 'Authentication verifies an officer\'s identity (e.g. biometric fingerprint + CAC card). Authorization checks if that officer has Top Secret clearance to view specific battle plans. Accounting logs the exact time and actions taken by that officer in an immutable audit ledger.',
        explanation: 'Authentication is identity verification; Authorization is access control permission; Accounting is non-repudiation and tracking.',
        tacticalTip: 'In incident response investigations, Accounting logs are the primary evidence used to reconstruct attacker timelines.'
      },
      {
        id: 'q07-02',
        category: 'Operational / Scenario',
        question: 'What is the primary difference between traditional castle-and-moat perimeter security and modern Zero Trust Architecture?',
        answer: 'Castle-and-moat assumes everything inside the perimeter is trusted once authenticated. Zero Trust assumes the internal network is hostile, requiring continuous verification, strict identity checks, and micro-segmentation for every individual transaction.',
        explanation: 'In modern threat landscapes involving insider threats and supply chain attacks, perimeter-only defenses fail.',
        tacticalTip: 'Zero Trust requires Policy Decision Points (PDP) and Policy Enforcement Points (PEP) at every access boundary.'
      },
      {
        id: 'q07-03',
        category: 'Defense & Military Focus',
        question: 'Which component of the CIA triad is most critically threatened during a GPS spoofing attack against an unmanned aerial vehicle (UAV)?',
        answer: 'Integrity is primarily threatened (the coordinate data sent to the UAV is altered/spoofed), leading to secondary loss of Availability if the drone crashes or is diverted.',
        explanation: 'Spoofing attacks manipulate the correctness and authenticity of navigational signals, which is an attack on data integrity.',
        tacticalTip: 'Military GPS receivers utilize M-code (Military Code) with cryptographic authentication to reject spoofed civilian signals.'
      }
    ],
    phase3: [
      {
        id: 'qz07-01',
        question: 'A malicious insider secretly modifies satellite trajectory telemetry parameters on a command database without detection. Which tenet of the CIA Triad has been directly breached?',
        scenario: 'An Air Force flight controller discovers discrepancy in ballistic tracking equations caused by database manipulation.',
        options: [
          'Integrity',
          'Confidentiality',
          'Availability',
          'Non-Repudiation'
        ],
        correctIndex: 0,
        explanation: 'Integrity guarantees that data has not been altered, tampered with, or fabricated by unauthorized parties. Modifying parameters violates integrity.',
        domainCategory: 'Core Cyber Security & SOC Defense'
      },
      {
        id: 'qz07-02',
        question: 'According to NIST SP 800-207 Zero Trust Architecture, which component is responsible for evaluating access policies and making the decision to grant or deny access to a resource?',
        scenario: 'Designing a secure defense cloud environment for tri-services access.',
        options: [
          'Policy Decision Point (PDP)',
          'Policy Enforcement Point (PEP)',
          'Demilitarized Zone (DMZ) Gateway',
          'Static Egress Packet Filter'
        ],
        correctIndex: 0,
        explanation: 'The Policy Decision Point (PDP) contains the Policy Engine and Policy Administrator, which evaluate continuous telemetry to decide whether access is granted. The PEP merely enforces that decision.',
        domainCategory: 'Core Cyber Security & SOC Defense'
      }
    ]
  },

  {
    id: 't08-crypto-pki',
    domainId: 'core-cyber',
    title: 'Military Cryptography, PKI, Hashing & Post-Quantum Threats',
    level: 'Advanced Tactical',
    readTime: '24 min',
    tags: ['AES-256', 'RSA', 'ECC', 'SHA-3', 'PKI', 'Post-Quantum'],
    phase1: {
      overview: 'Cryptography transforms readable plaintext into unreadable ciphertext to safeguard tactical transmissions, storage, and identity verification. In military command and control, cryptographic systems must withstand cryptanalysis from nation-state supercomputers and prepare for the imminent era of quantum decryption (Shor\'s and Grover\'s algorithms).',
      architecture: `Cryptographic Primitives Matrix:
Type          | Common Algorithms           | Key Sizes          | Military/Defense Application
Symmetric     | AES-GCM, ChaCha20-Poly1305  | 256-bit            | Tactical field radio links, bulk disk encryption
Asymmetric    | RSA, ECC (ECDSA, Ed25519)   | RSA 4096, ECC 384  | Digital certificates, key exchange, TLS 1.3
Hashing       | SHA-256, SHA-3, BLAKE3      | 256/512-bit        | Tamper verification, digital signatures, password hashes
Post-Quantum  | CRYSTALS-Kyber, Dilithium   | ML-KEM, ML-DSA     | Next-Gen Military PKI against Quantum Decryption`,
      deepDive: `### Symmetric vs Asymmetric Cryptography
- **Symmetric Encryption**: Both sender and receiver share the identical secret key. Extremely fast (hardware-accelerated AES-NI). Used for encrypting high-bandwidth tactical feeds and video streams.
- **Asymmetric Encryption**: Uses a mathematically linked keypair (Public Key for encryption/verification, Private Key for decryption/signing). Used for secure key exchange (Diffie-Hellman) across insecure public channels.

### Digital Signatures & Non-Repudiation
1. Sender generates SHA-256 hash of military order document.
2. Sender encrypts the hash using their **Private Key** -> creating the Digital Signature.
3. Receiver decrypts the signature using Sender's **Public Key** to obtain Hash A.
4. Receiver computes Hash B of received document.
5. If Hash A == Hash B, authenticity, integrity, and non-repudiation are 100% mathematically proven.`,
      commands: [
        { label: 'Generate 256-bit AES Key & Encrypt File with OpenSSL', cmd: 'openssl enc -aes-256-cbc -salt -in tactical_plan.pdf -out tactical_plan.enc' },
        { label: 'Generate Military-Grade RSA 4096 Keypair', cmd: 'openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:4096 -out defense_private.pem' },
        { label: 'Create SHA-256 Digital Signature of an Order', cmd: 'openssl dgst -sha256 -sign defense_private.pem -out order.sig order.txt' },
        { label: 'Verify Signature using Public Key', cmd: 'openssl dgst -sha256 -verify defense_public.pem -signature order.sig order.txt' }
      ],
      realWorldCaseStudy: {
        title: 'Operation Rubicon (Crypto AG Manipulation)',
        summary: 'For decades, Swiss company Crypto AG sold rigged encryption equipment to over 120 nations, including military and intelligence services. Western intelligence agencies secretly owned the company and possessed backdoor keys to decode high-grade diplomatic and military cables.',
        lesson: 'Sovereign nations must develop indigenous, fully audited cryptographic algorithms and hardware security modules (HSMs) free from foreign backdoors.'
      },
      tacticalTakeaways: [
        'Never roll custom cryptographic algorithms; use vetted, standard algorithms (AES-256, Ed25519).',
        'Employ Perfect Forward Secrecy (PFS) in key exchanges so compromise of long-term keys does not decrypt historical traffic.',
        'Begin transitioning high-assurance military assets to NIST Post-Quantum Cryptography (PQC) standards (FIPS 203/204).'
      ]
    },
    phase2: [
      {
        id: 'q08-01',
        category: 'Foundational',
        question: 'What is the fundamental mathematical difference between a Hash function, Symmetric encryption, and Asymmetric encryption?',
        answer: 'A Hash function is a one-way deterministic mathematical function with no key (irreversible). Symmetric encryption uses one shared secret key for both encryption and decryption. Asymmetric encryption uses a mathematically related keypair (public key encrypts, private key decrypts).',
        explanation: 'Hashes provide integrity; symmetric encryption provides high-speed bulk confidentiality; asymmetric encryption enables key exchange and non-repudiation.',
        tacticalTip: 'Hashes cannot be "decrypted"; matching hashes proves integrity.'
      },
      {
        id: 'q08-02',
        category: 'Operational / Scenario',
        question: 'How does Perfect Forward Secrecy (PFS) protect encrypted military diplomatic communications from "Harvest Now, Decrypt Later" adversaries?',
        answer: 'PFS generates unique, ephemeral session keys for every communication session using Ephemeral Diffie-Hellman (ECDHE). Even if an adversary records encrypted traffic for years and later steals the server\'s master private key, they cannot retroactively decrypt past sessions.',
        explanation: 'Without PFS, compromising the private key allows decrypting all past captured traffic.',
        tacticalTip: 'Verify TLS 1.3 configuration on defense web portals to mandate ECDHE cipher suites.'
      },
      {
        id: 'q08-03',
        category: 'Defense & Military Focus',
        question: 'How does Shor\'s Algorithm executed on a future quantum computer threaten modern military PKI, and what algorithms are vulnerable?',
        answer: 'Shor\'s Algorithm solves prime factorization and discrete logarithms in polynomial time. This completely breaks RSA, Diffie-Hellman, and Elliptic Curve Cryptography (ECC). In response, NIST standardized Post-Quantum Cryptography (e.g. ML-KEM / Kyber).',
        explanation: 'Symmetric encryption (AES-256) is largely resilient against quantum attacks because Grover\'s algorithm only halves key search time (AES-256 becomes equivalent to AES-128, still unbreakable).',
        tacticalTip: 'Upgrade asymmetric key exchange to post-quantum hybrid modes immediately.'
      }
    ],
    phase3: [
      {
        id: 'qz08-01',
        question: 'A tactical commander signs an electronic operational order with their private key. What does this mathematically guarantee to the recipient unit?',
        scenario: 'Field units receive an authenticated directive to advance artillery positions.',
        options: [
          'Authentication, Integrity, and Non-Repudiation',
          'Data Confidentiality and Storage Compression',
          'Automatic IP Address Anonymization',
          'Prevention of RF Electronic Jamming'
        ],
        correctIndex: 0,
        explanation: 'A digital signature encrypted with the sender\'s private key proves the sender\'s identity (Authentication), guarantees the document was not modified (Integrity), and prevents the sender from claiming they did not issue the order (Non-Repudiation).',
        domainCategory: 'Core Cyber Security & SOC Defense'
      },
      {
        id: 'qz08-02',
        question: 'Which of the following cryptographic algorithms is resistant to quantum computer attacks using Shor\'s algorithm?',
        scenario: 'A defense research agency evaluates cipher suites for a 30-year classified data archive.',
        options: [
          'CRYSTALS-Kyber (ML-KEM)',
          'RSA-4096',
          'ECDSA (Elliptic Curve Digital Signature)',
          'Diffie-Hellman 2048'
        ],
        correctIndex: 0,
        explanation: 'CRYSTALS-Kyber (standardized as ML-KEM) is based on lattice-based cryptography, which cannot be solved by Shor\'s algorithm, unlike RSA and ECC.',
        domainCategory: 'Core Cyber Security & SOC Defense'
      }
    ]
  },

  // ==========================================
  // DOMAIN 3: ETHICAL HACKING & RED TEAMING
  // ==========================================
  {
    id: 't14-nmap-scanning',
    domainId: 'ethical-hacking',
    title: 'Network Scanning, Nmap Scripting Engine & Port Enumeration',
    level: 'Tactical Operator',
    readTime: '20 min',
    tags: ['Nmap', 'Port Scanning', 'NSE Scripts', 'SYN Stealth', 'Firewall Evasion'],
    phase1: {
      overview: 'Network scanning is the reconnaissance phase where an ethical hacker or red team operator maps alive hosts, open listening ports, running software services, and operating system fingerprints. Mastering Nmap (Network Mapper) and Nmap Scripting Engine (NSE) is foundational for both offensive penetration testing and defensive SOC network auditing.',
      architecture: `Nmap Scan Types & Mechanics:
Scan Flag | Name             | Packet Sent      | Open Port Response | Closed Response | Stealth Level
-sS       | SYN Stealth Scan | TCP SYN          | SYN-ACK (Sends RST)| TCP RST         | High (Half-open, no full log)
-sT       | TCP Connect Scan | Full 3-Way Handsh| Completes + Closes | TCP RST         | Low (Fully logged in app logs)
-sU       | UDP Scan         | UDP Probe Packet | No response (open) | ICMP Unreachable| Slow (Rate-limited)
-sA       | ACK Scan         | TCP ACK          | TCP RST            | TCP RST         | Maps stateful firewall rules
-sN/-sF   | Null / FIN Scan  | No flags / FIN   | No response        | TCP RST         | Evades basic stateless filters`,
      deepDive: `### The Nmap Scripting Engine (NSE)
NSE allows automated vulnerability detection, advanced service discovery, and exploit payloads using Lua scripts. Scripts are categorized into:
- **safe / discovery**: Passive enumeration (banner, dns-brute).
- **vuln**: Checks for known CVE vulnerabilities (smb-vuln-ms17-010, http-vuln-cve2021-44228).
- **exploit**: Active proof-of-concept exploitation.

### Tactical Firewall & IDS Evasion Techniques
1. **Packet Fragmentation (-f, --mtu 16)**: Splits TCP headers across small packets to blind signature-matching firewalls.
2. **Decoy Scanning (-D RND:10)**: Spoofs source IP addresses of 10 random legitimate servers alongside your real IP, overwhelming SOC correlation.
3. **Source Port Manipulation (--source-port 53)**: Bypasses legacy perimeter firewalls that trust inbound traffic from DNS or NTP ports.`,
      commands: [
        { label: 'Tactical Fast SYN Scan with OS & Service Versioning', cmd: 'nmap -sS -sV -O -T4 -p- 192.168.1.50' },
        { label: 'Vulnerability Assessment Script Scan against Subnet', cmd: 'nmap --script vuln -p 80,443,445 10.10.0.0/24' },
        { label: 'Firewall Evasion with Decoys and Packet Fragmentation', cmd: 'nmap -sS -f -D 10.0.0.1,10.0.0.2,ME -p 22,80,443 192.168.1.1' },
        { label: 'Targeted SMB EternalBlue Vulnerability Check', cmd: 'nmap -p 445 --script smb-vuln-ms17-010 192.168.1.100' }
      ],
      realWorldCaseStudy: {
        title: 'WannaCry Ransomware (2017) Reconnaissance Phase',
        summary: 'WannaCry propagated globally across 150+ countries in hours by actively scanning the entire Internet on TCP Port 445 (SMB) for vulnerable unpatched Windows systems vulnerable to EternalBlue (MS17-010).',
        lesson: 'Proves the critical importance of continuous internal vulnerability scanning and immediate blocking of vulnerable ports (SMB 445, RDP 3389) at perimeter firewalls.'
      },
      tacticalTakeaways: [
        'Always run `-sV --version-intensity 5` to detect services running on non-standard ports (e.g. SSH on port 443).',
        'Defensive measure: Deploy Honeypots with fake open ports to detect and alert on unauthorized Nmap sweeps.',
        'Use rate-limiting (`--max-rate 50`) when scanning sensitive SCADA/ICS equipment to prevent PLC crashes.'
      ]
    },
    phase2: [
      {
        id: 'q14-01',
        category: 'Foundational',
        question: 'Why is an Nmap SYN Stealth scan (-sS) considered "half-open", and why was it historically stealthier than a TCP Connect scan (-sT)?',
        answer: 'An Nmap SYN scan sends a SYN packet, receives a SYN-ACK from an open port, and immediately replies with a RST (Reset) packet instead of an ACK. Because the full 3-way handshake is never completed, application servers historically did not generate connection logs.',
        explanation: 'While modern firewalls log SYN packets, legacy application servers only logged completed connections.',
        tacticalTip: 'Modern EDR and Next-Gen Firewalls detect SYN port sweeps within milliseconds; use slower timing templates (`-T2`) for stealth.'
      },
      {
        id: 'q14-02',
        category: 'Operational / Scenario',
        question: 'An operator runs an Nmap UDP scan (-sU) and receives no response from port 161 (SNMP). Is the port open or closed, and why?',
        answer: 'The port state is classified by Nmap as "open|filtered". UDP is connectionless; an open UDP service may choose not to reply unless provided a valid application payload, and a packet drop by a firewall produces identical silence.',
        explanation: 'Only if an ICMP Port Unreachable packet is returned can Nmap definitively determine that the port is closed.',
        tacticalTip: 'Use version detection (`-sUV`) to force Nmap to send application-specific probes (e.g. SNMP GetRequests) to confirm open status.'
      },
      {
        id: 'q14-03',
        category: 'Defense & Military Focus',
        question: 'How does an attacker utilize Decoy scanning (-D) in Nmap, and what challenge does it present to a military SOC incident responder?',
        answer: 'The attacker sends probe packets with spoofed source IP addresses of legitimate systems intermixed with their actual IP address. To the target\'s intrusion detection system, multiple IP addresses appear to be attacking simultaneously.',
        explanation: 'The SOC responder must manually correlate server responses and examine asymmetric routing to isolate the genuine attacker among the decoys.',
        tacticalTip: 'Check network flow telemetry at the upstream ISP/router level where anti-spoofing filters isolate invalid egress packets.'
      }
    ],
    phase3: [
      {
        id: 'qz14-01',
        question: 'Which Nmap command option should you execute to scan for the critical EternalBlue SMB vulnerability on Windows hosts without exploiting them?',
        scenario: 'A SOC analyst is conducting an urgent internal audit following a ransomware outbreak report.',
        options: [
          'nmap -p 445 --script smb-vuln-ms17-010 <target>',
          'nmap -p 80 --exploit-smb <target>',
          'nmap -sU -p 445 --force-patch <target>',
          'nmap -A -p 135 --kill-service <target>'
        ],
        correctIndex: 0,
        explanation: '`nmap -p 445 --script smb-vuln-ms17-010` targets the SMB port 445 and uses the dedicated NSE vulnerability detection script for MS17-010.',
        domainCategory: 'Ethical Hacking & Red Teaming'
      },
      {
        id: 'qz14-02',
        question: 'During a stealth red team engagement, you need to split TCP headers across multiple small fragments to evade basic IDS packet reassembly. Which Nmap flag enables this?',
        scenario: 'Testing detection sensitivity of an egress perimeter IDS.',
        options: [
          '-f (or --mtu)',
          '-sV',
          '--traceroute',
          '-Pn'
        ],
        correctIndex: 0,
        explanation: 'The `-f` flag instructs Nmap to use tiny 8-byte fragmented IP packets, splitting TCP headers across fragments to bypass legacy stateless IDS signatures.',
        domainCategory: 'Ethical Hacking & Red Teaming'
      }
    ]
  },

  {
    id: 't16-owasp-top10',
    domainId: 'ethical-hacking',
    title: 'Web Application Security: OWASP Top 10 Deep Dive & Defense',
    level: 'Tactical Operator',
    readTime: '24 min',
    tags: ['OWASP Top 10', 'SQLi', 'XSS', 'SSRF', 'IDOR', 'WAF'],
    phase1: {
      overview: 'Web applications serve as the primary external interface for military procurement, command portals, intelligence databases, and financial systems. The OWASP Top 10 documents the most critical web application security risks. Attackers target application logic flaws to bypass firewalls and directly manipulate back-end databases and servers.',
      architecture: `OWASP Top 10 Strategic Vulnerabilities:
1. Broken Access Control   | IDOR, unauthorized privilege escalation, path traversal
2. Cryptographic Failures  | Weak hashing (MD5), plain-text credentials, missing TLS
3. Injection (SQLi/CmdInj) | Malicious SQL/bash payloads executing in server interpreter
4. Insecure Design         | Flawed business logic, lack of rate-limiting, missing threat model
5. Security Misconfig      | Default admin passwords, verbose stack traces, open S3 buckets
6. Vulnerable Components   | Outdated libraries, unpatched dependencies (Log4j)
7. Identification & Auth   | Credential stuffing, brute-force, broken session management
8. Software/Data Integrity | Insecure deserialization, unsigned CI/CD pipeline code
9. Logging & Monitoring    | Failure to log failed logins, delayed breach detection
10. Server-Side Request    | SSRF forcing backend server to access internal metadata services`,
      deepDive: `### SQL Injection (SQLi) Mechanics
Occurs when untrusted user input is directly concatenated into a dynamic SQL query string without parameterization:

-- Vulnerable Dynamic Query:
SELECT * FROM users WHERE username = 'USER_INPUT' AND password = 'PASS_INPUT';

-- Attacker Payload:
admin' --

-- Resulting Executed Query (bypasses password validation):
SELECT * FROM users WHERE username = 'admin' --' AND password = '...';

**Defense**: Always use Prepared Statements (Parameterized Queries) and Object-Relational Mapping (ORM) with strict input validation.

### Server-Side Request Forgery (SSRF)
SSRF allows an attacker to coerce the web application into sending crafted HTTP requests to unintended destinations, such as internal cloud metadata endpoints (e.g. http://169.254.169.254/latest/meta-data/ in AWS) or internal defense enclaves.`,
      commands: [
        { label: 'Test SQL Injection via SQLmap', cmd: 'sqlmap -u "https://portal.mil/view?id=1" --batch --dbs' },
        { label: 'Burp Suite Repeater SSRF Payload', cmd: 'GET /fetch?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/ HTTP/1.1' },
        { label: 'Scan Web App for Vulnerabilities via Nikto', cmd: 'nikto -h https://target-defense-portal.gov.in' },
        { label: 'Secure Parameterized Query Example in Python', cmd: 'cursor.execute("SELECT * FROM personnel WHERE id = %s", (cadet_id,))' }
      ],
      realWorldCaseStudy: {
        title: 'Capital One Data Breach (2019) via SSRF',
        summary: 'A threat actor exploited an SSRF vulnerability in an open-source Web Application Firewall (WAF) to query the AWS internal metadata service, extracting temporary IAM admin role credentials and downloading 100+ million credit card applications.',
        lesson: 'Enforce IMDSv2 (requiring session tokens for metadata queries) and strict egress URL whitelisting for all web applications.'
      },
      tacticalTakeaways: [
        'Never concatenate user input into database queries; parameterized queries render SQL injection mathematically impossible.',
        'Enforce Insecure Direct Object Reference (IDOR) checks on every database access: verify the requesting user actually owns the requested record ID.',
        'Deploy a Next-Gen Web Application Firewall (WAF) with OWASP Core Rule Set (CRS) as secondary defense-in-depth.'
      ]
    },
    phase2: [
      {
        id: 'q16-01',
        category: 'Foundational',
        question: 'Why do parameterized queries (prepared statements) prevent SQL Injection, whereas input sanitization and regex filtering often fail?',
        answer: 'Prepared statements pre-compile the SQL query structure in the database engine first. User inputs are treated strictly as literal data variables, never as executable SQL commands, making syntax alteration impossible regardless of what characters are submitted.',
        explanation: 'Sanitization filters can be bypassed using alternate character encodings, comments, or nested payloads.',
        tacticalTip: 'Verify all backend code uses parameterized queries or ORMs like Hibernate, Prisma, or SQLAlchemy.'
      },
      {
        id: 'q16-02',
        category: 'Operational / Scenario',
        question: 'What is an Insecure Direct Object Reference (IDOR), and how does an attacker exploit it in a defense personnel portal?',
        answer: 'IDOR occurs when an application exposes a direct reference to an internal database object (like a user ID in a URL: `/cadet/profile?id=1052`) without validating whether the logged-in user has permission to view that record. Changing the ID to `1053` reveals another person\'s file.',
        explanation: 'This is a failure of Broken Access Control (OWASP #1).',
        tacticalTip: 'Remediate by enforcing server-side session authorization checks and using non-predictable UUIDs.'
      },
      {
        id: 'q16-03',
        category: 'Defense & Military Focus',
        question: 'How can a Server-Side Request Forgery (SSRF) flaw in a public-facing defense portal compromise an internal air-gapped or private cloud enclave?',
        answer: 'Because the public web server resides in the DMZ and holds routing connectivity to internal services, an attacker submits payloads pointing to internal private IPs (e.g. `10.0.0.5:8080/admin`). The server fetches the data on the attacker\'s behalf.',
        explanation: 'SSRF leverages the trusted status of the server to bypass boundary firewalls.',
        tacticalTip: 'Enforce strict egress firewall rules blocking web servers from communicating with private internal IP ranges.'
      }
    ],
    phase3: [
      {
        id: 'qz16-01',
        question: 'An attacker manipulates a web parameter from `document_id=500` to `document_id=501` and is immediately able to download another officer\'s classified medical record. What vulnerability is this?',
        scenario: 'A military hospital web application security review identifies an access control flaw.',
        options: [
          'Insecure Direct Object Reference (IDOR)',
          'Cross-Site Request Forgery (CSRF)',
          'SQL Injection (SQLi)',
          'Cross-Site Scripting (XSS)'
        ],
        correctIndex: 0,
        explanation: 'IDOR occurs when user-supplied input is used to access objects directly without proper authorization checks.',
        domainCategory: 'Ethical Hacking & Red Teaming'
      },
      {
        id: 'qz16-02',
        question: 'What is the most effective and universally recommended architectural defense against SQL Injection vulnerabilities?',
        scenario: 'A defense development team is rewriting a legacy database interface.',
        options: [
          'Parameterized Queries / Prepared Statements',
          'Client-side JavaScript input validation',
          'Blacklisting single quotes and double dashes',
          'Switching the database port from 3306 to 9000'
        ],
        correctIndex: 0,
        explanation: 'Parameterized queries guarantee the database treats user input strictly as data values, preventing query syntax manipulation.',
        domainCategory: 'Ethical Hacking & Red Teaming'
      }
    ]
  },

  // ==========================================
  // DOMAIN 4: MILITARY & CRITICAL INFRASTRUCTURE CYBER WARFARE
  // ==========================================
  {
    id: 't20-fifth-domain',
    domainId: 'military-cyber',
    title: 'Fifth Domain Cyber Warfare Doctrine & C4ISR Integration',
    level: 'Specialized Defense',
    readTime: '26 min',
    tags: ['Cyber Warfare', 'Fifth Domain', 'C4ISR', 'Hybrid Warfare', 'DCA'],
    phase1: {
      overview: 'Modern warfare recognizes five operational domains: Land, Sea, Air, Space, and Cyber. Unlike traditional domains bound by physical geography, the cyber domain operates at the speed of light, offers plausible deniability, and allows asymmetric adversaries to paralyze national critical infrastructure without firing a single missile. Military C4ISR (Command, Control, Communications, Computers, Intelligence, Surveillance, and Reconnaissance) networks represent the ultimate strategic target.',
      architecture: `Tri-Services Joint Cyber Operations Framework:
[ Strategic Level ]   | National Security Council, Chief of Defence Staff, Defence Cyber Agency
                       | Strategic deterrence, offensive authorization, counter-APT doctrine
[ Operational Level ] | Unified Theatre Commands, Joint Operations Centers (JOC)
                       | Battle damage assessment, cross-domain electronic/cyber synchronization
[ Tactical Level ]    | Field Formations, Navy Warships, Air Wings, Drone Squadrons
                       | Frequency agility, tactical link hardening, air-gap preservation, radar resilience`,
      deepDive: `### Cyber Warfare Doctrine: Key Phases
1. **Preparation / Infiltration (Peace-time)**: Pre-positioning dormant backdoors, mapping SCADA power grids, and harvesting strategic credentials via spear-phishing and supply-chain compromises.
2. **Coordinated Asymmetric Attack (Zero-Hour)**: Simultaneous cyber sabotage synchronized with physical kinetic strikes: taking down air-defense radars, disrupting military satellite comms, and causing blackout across command hubs.
3. **Information Warfare & Disinformation**: Hijacking civilian broadcast networks and social media to spread false orders, demoralize military personnel, and incite civil chaos.

### Air-Gapped Networks & Military Vulnerabilities
Air-gapped networks (physically disconnected from the public Internet) are the gold standard for weapons control and strategic telemetry. However, nation-state actors breach air gaps through:
- **Malicious USB / Removable Media Drops** (as proven by Stuxnet and Agent.btz).
- **Acoustic & Ultrasonic Exfiltration** (using internal computer speakers and microphones).
- **Electromagnetic / TEMPEST Radiation** (intercepting RF emissions from unshielded monitors and cables).`,
      commands: [
        { label: 'Air-Gap USB Device Whitelist Policy in Windows Group Policy', cmd: 'gpedit.msc -> Computer Config -> Admin Templates -> System -> Removable Storage Access' },
        { label: 'Audit USB Insertion History in Windows Registry', cmd: 'reg query HKLM\\SYSTEM\\CurrentControlSet\\Enum\\USBSTOR' },
        { label: 'Network Isolation Killswitch Script (Emergency Containment)', cmd: 'Disable-NetAdapter -Name "Tactical_Uplink" -Confirm:$false' },
        { label: 'Check TEMPEST Hardening / Radio Leakage Protocols', cmd: 'rf-analyzer --frequency 2.4GHz --gain 40 --threshold -60dBm' }
      ],
      realWorldCaseStudy: {
        title: 'Operation Olympic Games (Stuxnet, 2010)',
        summary: 'A joint US-Israeli cyber weapon breached the air-gapped Natanz nuclear enrichment facility in Iran via an infected USB drive. Stuxnet manipulated Siemens Step 7 PLCs to spin uranium centrifuges at destructive speeds while displaying normal operation telemetry to plant operators, destroying over 1,000 centrifuges.',
        lesson: 'Demonstrated that malware can produce kinetic, physical destruction in critical military infrastructure and that air gaps alone are vulnerable to human and supply chain vectors.'
      },
      tacticalTakeaways: [
        'Disable all USB mass storage ports via hardware port blockers and active Active Directory Group Policy.',
        'Deploy dedicated Optical Data Diodes for any external data ingestion into classified military networks.',
        'Implement regular "Red vs Blue" live-fire cyber warfare exercises simulating nation-state APT saturation.'
      ]
    },
    phase2: [
      {
        id: 'q20-01',
        category: 'Defense & Military Focus',
        question: 'What is the "Fifth Domain" of military warfare, and what unique characteristics distinguish it from the traditional four physical domains?',
        answer: 'Cyber is the Fifth Domain (alongside Land, Sea, Air, and Space). Unlike physical domains, the cyber domain is entirely human-made, operates instantaneously at the speed of light, lacks geographic boundaries, offers plausible deniability, and exhibits very low barrier to asymmetric entry.',
        explanation: 'A small group of skilled hackers can achieve strategic impact comparable to conventional kinetic weapons.',
        tacticalTip: 'Cyber capabilities can be deployed in "Grey Zone" warfare beneath the threshold of open kinetic conflict.'
      },
      {
        id: 'q20-02',
        category: 'Operational / Scenario',
        question: 'How did the Stuxnet worm overcome the physical air-gap protecting the Natanz uranium enrichment facility?',
        answer: 'Stuxnet weaponized multiple zero-day vulnerabilities (including the LNK file execution flaw) distributed via infected USB flash drives carried by contractors and engineers into the facility.',
        explanation: 'Once plugged into an internal air-gapped Windows machine, it propagated across the LAN using peer-to-peer RPC and compromised Siemens Step 7 PLC software.',
        tacticalTip: 'Never allow unvetted removable media into critical SCADA or weapons networks.'
      },
      {
        id: 'q20-03',
        category: 'Defense & Military Focus',
        question: 'What is the primary role of the Defence Cyber Agency (DCA) in India\'s national security framework?',
        answer: 'The Defence Cyber Agency (DCA) is a tri-services command (Army, Navy, and Air Force) responsible for handling cyber security threats, protecting military networks, formulating joint cyber warfare doctrine, and executing strategic offensive and defensive cyber operations.',
        explanation: 'Headquartered in New Delhi, the DCA coordinates with civilian agencies like CERT-In and NTRO while maintaining military cyber readiness.',
        tacticalTip: 'DCA works closely with the Defence Research and Development Organisation (DRDO) on indigenous cyber defense systems.'
      }
    ],
    phase3: [
      {
        id: 'qz20-01',
        question: 'What historical cyber weapon proved that digital code could physically destroy physical industrial machinery inside an air-gapped military nuclear facility?',
        scenario: 'A defense academy seminar on kinetic cyber warfare doctrines.',
        options: [
          'Stuxnet (Operation Olympic Games)',
          'WannaCry Ransomware',
          'Mirai Botnet',
          'Heartbleed OpenSSL Flaw'
        ],
        correctIndex: 0,
        explanation: 'Stuxnet physically destroyed over 1,000 uranium enrichment centrifuges at Natanz by tampering with frequency converters driving the rotors.',
        domainCategory: 'Defense & Critical Infrastructure Warfare'
      },
      {
        id: 'qz20-02',
        question: 'In military C4ISR terminology, what does the acronym C4ISR represent?',
        scenario: 'Strategic defense architecture briefing for cyber command officers.',
        options: [
          'Command, Control, Communications, Computers, Intelligence, Surveillance, and Reconnaissance',
          'Cyber Defense, Cryptography, Cloud Computing, Cybercrime, Information Security, and Resilience',
          'Central Command, Counter-Terrorism, Combat Communications, and Satellite Radar',
          'Continuous Compliance, Cryptographic Keys, Critical Controls, and Incident Response'
        ],
        correctIndex: 0,
        explanation: 'C4ISR stands for Command, Control, Communications, Computers, Intelligence, Surveillance, and Reconnaissance.',
        domainCategory: 'Defense & Critical Infrastructure Warfare'
      }
    ]
  },

  {
    id: 't22-scada-ics',
    domainId: 'military-cyber',
    title: 'SCADA, Industrial Control Systems (ICS) & Critical Infrastructure Defense',
    level: 'Specialized Defense',
    readTime: '22 min',
    tags: ['SCADA', 'ICS', 'Modbus', 'PLC', 'Power Grid', 'OT Security'],
    phase1: {
      overview: 'Operational Technology (OT) and Industrial Control Systems (ICS) manage physical processes in power grids, oil refineries, nuclear reactors, water filtration facilities, and naval propulsion systems. Unlike traditional IT systems where Confidentiality is paramount, in OT environments, Availability and Physical Safety are the highest priorities. Legacy SCADA protocols often lack authentication, making them vulnerable to tampering.',
      architecture: `Purdue Model for Industrial Control Systems (ICS/SCADA):
Level 5 | Enterprise Network        | ERP, Corporate email, Web access
Level 4 | Business Planning / IT    | Production scheduling, central databases
-- [ INDUSTRIAL DEMILITARIZED ZONE (IDMZ) & DATA DIODE ] --
Level 3 | Site Operations / OT      | Engineering workstations, Historian servers, HMIs
Level 2 | Area Supervisory Control  | SCADA Human-Machine Interfaces (HMIs), supervisory PLCs
Level 1 | Basic Process Control     | Programmable Logic Controllers (PLCs), RTUs
Level 0 | Physical Process          | Actuators, motors, pumps, valves, sensors`,
      deepDive: `### Inherent Vulnerabilities in Legacy OT Protocols
- **Modbus TCP**: Uses port 502 with zero native authentication, encryption, or integrity verification. Anyone with IP connectivity can send a \`Write Single Coil\` command to open an electrical circuit breaker.
- **DNP3**: Common in electrical substations; vulnerable to spoofed broadcast commands and replay attacks unless Secure Authentication (SAv5) is deployed.
- **EtherNet/IP / CIP**: Widely used in automated manufacturing; vulnerable to unauthorized firmware uploads.

### Ukraine Power Grid Cyber Attacks (BlackEnergy & Industroyer/CrashOverride)
1. **2015 Attack**: Spear-phishing with BlackEnergy 3 malware compromised corporate IT. Attackers moved laterally to the SCADA network, hijacked HMIs, and manually disconnected circuit breakers across 30 substations, plunging 230,000 civilians into darkness in winter.
2. **2016 Industroyer Attack**: First malware specifically automated to speak native electrical substation protocols (IEC 60870-5-104, IEC 61850) to trigger blackout commands automatically.`,
      commands: [
        { label: 'Snort Rule to Detect Unauthorized Modbus Write Coil (Function 05)', cmd: 'alert tcp any any -> $HOME_NET 502 (msg:"SCADA Modbus Write Coil Attempt"; content:"|00 00 00 00 00 06|"; offset:0; depth:6; content:"|05|"; offset:7; depth:1; sid:1000502;)' },
        { label: 'Identify Modbus Device via Nmap NSE Script', cmd: 'nmap -sS -Pn -p 502 --script modbus-discover 192.168.10.20' },
        { label: 'Check PLC Firmware Digital Signature Hash in PowerShell', cmd: 'Get-AuthenticodeSignature C:\\firmware\\plc_v4.bin' }
      ],
      realWorldCaseStudy: {
        title: 'Kudankulam Nuclear Power Plant (KKNPP) Cyber Incident (India, 2019)',
        summary: 'Malware (identified as DTrack, linked to North Korea\'s Lazarus Group) was detected on the administrative IT network of India\'s Kudankulam Nuclear Power Plant. NPCIL officially confirmed that the critical reactor control systems were 100% air-gapped and unaffected.',
        lesson: 'Proves the vital necessity of strictly separating administrative IT networks from critical SCADA plant control systems with hardware data diodes.'
      },
      tacticalTakeaways: [
        'Never connect PLCs, RTUs, or HMIs directly to corporate networks or the public Internet.',
        'Implement an Industrial DMZ (IDMZ) where no direct traffic crosses between IT and OT; all exchanges terminate at jump servers.',
        'Deploy passive network monitoring (e.g. Claroty, Nozomi, Dragos) in OT to detect anomalous commands without risking PLC disruption.'
      ]
    },
    phase2: [
      {
        id: 'q22-01',
        category: 'Foundational',
        question: 'What is the fundamental difference in priorities between traditional IT security and OT/SCADA security?',
        answer: 'IT security prioritizes Confidentiality > Integrity > Availability (CIA). OT/SCADA security prioritizes Safety & Human Life > Availability > Integrity > Confidentiality (AIC). A 1-second latency or sudden reboot in an IT server is an annoyance; in a power plant or missile silo, it can trigger catastrophic explosions.',
        explanation: 'In industrial environments, physical processes cannot be arbitrarily paused for software updates.',
        tacticalTip: 'Never perform active vulnerability scans (like aggressive Nmap sweeps) on active PLCs, as fragile network stacks can crash.'
      },
      {
        id: 'q22-02',
        category: 'Operational / Scenario',
        question: 'Why are legacy industrial protocols like Modbus TCP inherently vulnerable to cyber attacks without perimeter defenses?',
        answer: 'Modbus TCP was engineered decades ago for closed serial links and has zero authentication, encryption, or integrity verification. Any device that can route a packet to TCP port 502 can read sensor values and issue write commands to actuate physical equipment.',
        explanation: 'Security was assumed to be provided by physical perimeter fences.',
        tacticalTip: 'Isolate Modbus traffic behind deep-packet-inspecting OT firewalls configured to block unauthorized function codes.'
      },
      {
        id: 'q22-03',
        category: 'Defense & Military Focus',
        question: 'How does an Industrial Demilitarized Zone (IDMZ) protect Level 3 SCADA operations from corporate IT Level 4 breaches?',
        answer: 'The IDMZ creates an isolated buffer layer between Enterprise IT and Industrial OT. No direct sessions are allowed between IT and OT; data transfer must pass through dual-homed bastion hosts, terminal servers, and replica data historians inside the IDMZ.',
        explanation: 'If corporate IT is infected with ransomware, the boundary stops lateral movement into the plant.',
        tacticalTip: 'Use separate Active Directory forests for IT and OT to prevent compromised domain credentials from jumping into the IDMZ.'
      }
    ],
    phase3: [
      {
        id: 'qz22-01',
        question: 'Which TCP port is conventionally used by the Modbus TCP industrial SCADA protocol, which lacks built-in authentication?',
        scenario: 'A SOC engineer writes a perimeter rule to block unintended SCADA traffic leaks.',
        options: [
          'Port 502',
          'Port 8080',
          'Port 445',
          'Port 22'
        ],
        correctIndex: 0,
        explanation: 'Modbus TCP communicates over TCP port 502. It carries no encryption or authentication by default.',
        domainCategory: 'Defense & Critical Infrastructure Warfare'
      },
      {
        id: 'qz22-02',
        question: 'In the Purdue Model for Industrial Control Systems, what resides at Level 0?',
        scenario: 'Reviewing physical equipment architecture in a naval vessel propulsion room.',
        options: [
          'Physical Process (Sensors, actuators, pumps, motors)',
          'Programmable Logic Controllers (PLCs)',
          'Human Machine Interfaces (HMIs)',
          'Corporate Enterprise Resource Planning (ERP)'
        ],
        correctIndex: 0,
        explanation: 'Level 0 is the physical field process itself: the physical actuators, sensors, valves, and motors.',
        domainCategory: 'Defense & Critical Infrastructure Warfare'
      }
    ]
  },

  // ==========================================
  // DOMAIN 5: INDIAN CYBER DEFENSE ECOSYSTEM
  // ==========================================
  {
    id: 't25-cert-in',
    domainId: 'indian-cyber',
    title: 'CERT-In Directives, 6-Hour Reporting Mandate & National Frameworks',
    level: 'National Defense Strategic',
    readTime: '20 min',
    tags: ['CERT-In', 'IT Act 2000', '6-Hour Mandate', 'NCIIPC', 'Cyber Governance'],
    phase1: {
      overview: 'The Indian Computer Emergency Response Team (CERT-In) is the national nodal agency under the Ministry of Electronics and Information Technology (MeitY) responsible for cyber security response, emergency triage, advisory dissemination, and national cyber defense coordination. Under Section 70B of the Information Technology Act 2000, CERT-In has issued binding cybersecurity directives that mandate rigorous logging, NTP synchronization, and mandatory incident reporting.',
      architecture: `Indian National Cyber Defense Architecture:
[ Apex Leadership ]   | National Security Council (NSCS) / National Cyber Security Coordinator (NCSC)
[ Critical Infra ]    | NCIIPC (Designated under Section 70A IT Act 2000 - Power, Telecom, Defense, Banking)
[ National Nodal ]    | CERT-In (Section 70B IT Act 2000 - Alerts, Advisories, Forensics, Reporting)
[ Military Domain ]   | Defence Cyber Agency (DCA - Tri-Services Command under HQ IDS)
[ Law Enforcement ]   | I4C (Indian Cybercrime Coordination Centre under MHA - 1930 Helpline)
[ Sovereign Crypto ]  | NTRO & SAG (Scientific Analysis Group under DRDO)`,
      deepDive: `### CERT-In April 2022 Directives - Key Mandatory Compliance Requirements
1. **6-Hour Mandatory Incident Reporting**: All government organizations, defense contractors, service providers, intermediaries, and corporate entities must report any of the 20 designated cybersecurity incidents to CERT-In within 6 hours of noticing them.
2. **180-Day System Log Retention**: All ICT systems, routers, firewalls, and server logs must be securely maintained within Indian jurisdiction for a rolling period of at least 180 days.
3. **Mandatory NTP Time Synchronization**: All ICT system clocks must synchronize exclusively with the Network Time Protocol (NTP) servers of the National Physical Laboratory (NPL) or National Informatics Centre (NIC) to guarantee forensic timestamp accuracy.
4. **Subscriber Identification Records**: VPN providers, cloud service providers, and data centers must retain customer registration data, IP addresses, and validated identities for 5 years.`,
      commands: [
        { label: 'Check NTP Server Configuration in Windows PowerShell', cmd: 'w32tm /query /status' },
        { label: 'Set Windows Time to Sync with National NIC NTP Server', cmd: 'w32tm /config /manualpeerlist:"time.nic.in" /syncfromflags:manual /update' },
        { label: 'Check Linux NTP Synchronization via timedatectl', cmd: 'timedatectl status' },
        { label: 'Submit Incident Report to CERT-In via Email', cmd: 'incident@cert-in.org.in (Form IR-1)' }
      ],
      realWorldCaseStudy: {
        title: 'AIIMS New Delhi Ransomware Attack (November 2022)',
        summary: 'A sophisticated cyber attack crippled the internal servers of the All India Institute of Medical Sciences (AIIMS) in New Delhi, taking down outpatient registration, lab reports, and billing for over two weeks. CERT-In, NIA, and intelligence agencies investigated the incident, finding compromised servers with missing patches and lack of network segmentation.',
        lesson: 'Highlighted the critical necessity of strict multi-factor authentication, network segmentation, daily air-gapped backups, and adherence to CERT-In cyber hygiene guidelines in healthcare and government institutions.'
      },
      tacticalTakeaways: [
        'Establish an internal automated alerting pipeline that escalates any major cyber incident to CERT-In within the mandatory 6-hour window.',
        'Synchronize all domain controllers and network perimeter equipment to official Indian standard time (time.nic.in / time.nplindia.org).',
        'Ensure log storage servers are isolated and write-once-read-many (WORM) to satisfy the 180-day forensic log retention requirement.'
      ]
    },
    phase2: [
      {
        id: 'q25-01',
        category: 'Foundational',
        question: 'Under the CERT-In April 2022 cybersecurity directives, what is the mandatory time window within which specified cybersecurity incidents must be reported?',
        answer: 'Specified cybersecurity incidents must be reported to CERT-In within exactly 6 hours of noticing them or being brought to notice.',
        explanation: 'The directive applies to government organizations, service providers, intermediaries, and corporate entities to enable rapid national threat containment.',
        tacticalTip: 'Incident reporting forms can be dispatched via email to incident@cert-in.org.in or through the CERT-In incident portal.'
      },
      {
        id: 'q25-02',
        category: 'Operational / Scenario',
        question: 'What is the required duration for maintaining ICT system logs under CERT-In directives, and where must these logs be maintained?',
        answer: 'ICT logs must be maintained for a rolling period of at least 180 days, and they must be maintained within the Indian jurisdiction.',
        explanation: 'This ensures digital forensic investigators have sufficient historical telemetry to trace advanced persistent threats and reconstruct attack paths.',
        tacticalTip: 'Centralize logs in a SIEM (like Splunk or Wazuh) with immutable encrypted storage.'
      },
      {
        id: 'q25-03',
        category: 'Defense & Military Focus',
        question: 'What is the distinct operational mandate of NCIIPC compared to CERT-In under the Information Technology Act 2000?',
        answer: 'NCIIPC (National Critical Information Infrastructure Protection Centre) is designated under Section 70A specifically to protect designated Critical Information Infrastructure (CII) whose destruction would have a debilitating impact on national security, economy, or public health (e.g. Power, Telecom, Defense, Banking). CERT-In (Section 70B) is the general national nodal agency handling cyber incident response and cyber alerts across all civilian and enterprise sectors.',
        explanation: 'NCIIPC provides specialized SOPs, threat intelligence, and security audits for designated critical sectors.',
        tacticalTip: 'Defense organizations interface with both NCIIPC for critical infrastructure and DCA for military cyber operations.'
      }
    ],
    phase3: [
      {
        id: 'qz25-01',
        question: 'Under CERT-In directives issued pursuant to Section 70B of the IT Act 2000, within how many hours must a detected ransomware or critical cyber incident be reported to CERT-In?',
        scenario: 'A defense PSU detects unauthorized encryption activity on its engineering file servers.',
        options: [
          'Within 6 hours',
          'Within 24 hours',
          'Within 72 hours',
          'Within 7 days'
        ],
        correctIndex: 0,
        explanation: 'The CERT-In directive strictly mandates reporting within 6 hours of noticing the incident.',
        domainCategory: 'Indian Cyber Defense & CERT-In Frameworks'
      },
      {
        id: 'qz25-02',
        question: 'Which Indian national agency is specifically designated under Section 70A of the Information Technology Act to protect Critical Information Infrastructure (Power, Defense, Nuclear, Telecom)?',
        scenario: 'Reviewing national compliance oversight for an Indian defense communications satellite gateway.',
        options: [
          'NCIIPC (National Critical Information Infrastructure Protection Centre)',
          'CERT-In',
          'I4C (Indian Cybercrime Coordination Centre)',
          'Telecom Regulatory Authority of India (TRAI)'
        ],
        correctIndex: 0,
        explanation: 'NCIIPC is the specialized national agency created under Section 70A specifically for Critical Information Infrastructure protection.',
        domainCategory: 'Indian Cyber Defense & CERT-In Frameworks'
      }
    ]
  }
];
