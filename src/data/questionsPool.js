// CYBEROPS DEFENSE COMMAND - Comprehensive 25+ Questions Engine
// Guarantees at least 25 high-yield, scenario-based evaluation questions for every topic

// Domain Question Repositories to supplement and guarantee >= 25 questions per quiz
const DOMAIN_QUESTION_BANKS = {
  networking: [
    {
      q: 'Which packet flags are set in a TCP SYN-ACK response packet during the initial three-way handshake?',
      scenario: 'A firewall engineer is inspecting state table synchronization captures.',
      options: ['SYN and ACK flags set', 'Only SYN flag set', 'SYN and FIN flags set', 'RST and ACK flags set'],
      correct: 0,
      exp: 'The server responds to a client SYN with both the SYN (synchronize) and ACK (acknowledgment) flags set in the TCP header.'
    },
    {
      q: 'What is the default subnet mask for a Class B IPv4 network before subnetting?',
      scenario: 'Auditing legacy IP allocation schemes in an older defense base installation.',
      options: ['255.255.0.0 (/16)', '255.0.0.0 (/8)', '255.255.255.0 (/24)', '255.255.255.240 (/28)'],
      correct: 0,
      exp: 'Class B addresses (128.0.0.0 - 191.255.255.255) utilize a default 16-bit subnet mask of 255.255.0.0.'
    },
    {
      q: 'Which protocol is responsible for mapping an IPv4 address to a physical MAC address on an Ethernet local area network?',
      scenario: 'Investigating local network frame delivery failure between an officer terminal and tactical switch.',
      options: ['Address Resolution Protocol (ARP)', 'Domain Name System (DNS)', 'Border Gateway Protocol (BGP)', 'Dynamic Host Configuration Protocol (DHCP)'],
      correct: 0,
      exp: 'ARP resolves known Layer 3 IPv4 addresses to Layer 2 physical MAC addresses.'
    },
    {
      q: 'How does an in-line Intrusion Prevention System (IPS) differ operationally from an Intrusion Detection System (IDS)?',
      scenario: 'Designing perimeter defenses for a tactical communications gateway.',
      options: [
        'An IPS sits directly in-line to drop malicious packets before arrival; an IDS passively alerts via mirrored traffic',
        'An IDS can decrypt TLS 1.3 traffic whereas an IPS cannot',
        'An IPS only monitors wireless RF signals; an IDS inspects copper cables',
        'An IDS automatically isolates infected endpoints on the switchport'
      ],
      correct: 0,
      exp: 'An IPS is physically in-line with traffic flow to actively drop hostile packets. An IDS passively inspects a copy of traffic.'
    },
    {
      q: 'What is the maximum number of usable host addresses in a /29 IPv4 subnet?',
      scenario: 'Allocating IP addresses for a forward tactical sensor cluster.',
      options: ['6 usable host addresses', '8 usable host addresses', '14 usable host addresses', '2 usable host addresses'],
      correct: 0,
      exp: 'A /29 subnet has 3 host bits (2^3 = 8 total IPs). Subtracting 2 for Network and Broadcast gives 6 usable host addresses.'
    },
    {
      q: 'Which IPsec protocol provides data confidentiality (encryption) as well as origin authentication and integrity?',
      scenario: 'Securing satellite microwave backhaul between two regional army commands.',
      options: [
        'Encapsulating Security Payload (ESP, IP Protocol 50)',
        'Authentication Header (AH, IP Protocol 51)',
        'Internet Control Message Protocol (ICMP)',
        'Address Resolution Protocol (ARP)'
      ],
      correct: 0,
      exp: 'ESP provides confidentiality (encryption), authentication, and integrity. AH provides only authentication and integrity without encryption.'
    },
    {
      q: 'What network feature prevents an unauthorized switch or laptop from advertising priority 0 BPDUs to hijack the Spanning Tree root role?',
      scenario: 'Hardening edge access switches at a naval dockyard.',
      options: ['BPDU Guard and Root Guard', 'Dynamic Trunking Protocol', 'Subnet Mask Inversion', 'EIGRP Split Horizon'],
      correct: 0,
      exp: 'BPDU Guard disables access ports that receive unexpected BPDUs, while Root Guard prevents untrusted ports from becoming the root port.'
    },
    {
      q: 'Which Wireshark filter isolates all TCP packets with both the SYN and FIN flags set, often used in stealth port scanning?',
      scenario: 'Auditing firewall logs for anomalous scan fingerprints.',
      options: ['tcp.flags.syn == 1 && tcp.flags.fin == 1', 'tcp.port == 80 || tcp.port == 443', 'ip.len > 1500', 'icmp.type == 8'],
      correct: 0,
      exp: '`tcp.flags.syn == 1 && tcp.flags.fin == 1` flags anomalous SYN-FIN packets used in evasion scans.'
    },
    {
      q: 'What security risk is created when Dynamic Trunking Protocol (DTP) is left enabled on access switch ports?',
      scenario: 'A red teamer connects a rogue laptop to a wall jack in a command post.',
      options: [
        'VLAN Hopping via rogue trunk negotiation',
        'Direct denial of physical power over Ethernet (PoE)',
        'BGP route leak to foreign autonomous systems',
        'Automatic factory reset of the core router'
      ],
      correct: 0,
      exp: 'With DTP enabled, an attacker can negotiate an active 802.1Q trunk link and access traffic from all VLANs.'
    },
    {
      q: 'In an enterprise or defense environment, what is the role of 802.1X Network Access Control (NAC)?',
      scenario: 'Enforcing strict zero-trust hardware access on perimeter Ethernet wall jacks.',
      options: [
        'Enforcing port-based cryptographic authentication before granting network connectivity',
        'Encrypting disk drives using AES-256 BitLocker',
        'Routing BGP autonomous system prefixes across satellite uplinks',
        'Measuring wireless RF signal attenuation across concrete bunkers'
      ],
      correct: 0,
      exp: '802.1X mandates that devices authenticate cryptographically (e.g. via EAP-TLS and RADIUS) before the switch port opens.'
    },
    {
      q: 'What is the primary function of NAT Traversal (NAT-T) in IPsec VPN connections?',
      scenario: 'Connecting a mobile tactical field terminal behind a cellular carrier NAT router.',
      options: [
        'Encapsulating IPsec ESP packets inside UDP port 4500 to pass through NAT routers',
        'Translating IPv6 addresses into MAC addresses',
        'Bypassing firewall deep packet inspection engines',
        'Disabling packet sequence number verification'
      ],
      correct: 0,
      exp: 'NAT-T encapsulates ESP packets inside UDP port 4500 so they pass through NAT routers without breaking integrity checks.'
    },
    {
      q: 'Which routing protocol security enhancement cryptographically verifies that an Autonomous System is authorized to originate an IP prefix?',
      scenario: 'Protecting military internet gateway prefixes from rogue route advertisements.',
      options: [
        'RPKI (Resource Public Key Infrastructure) Route Origin Authorization',
        'Split Horizon with Poison Reverse',
        'OSPF Dead Interval Tuning',
        'Spanning Tree PortFast'
      ],
      correct: 0,
      exp: 'RPKI uses cryptographic certificates to validate that an AS has legitimate authority to originate specified IP prefixes.'
    },
    {
      q: 'What is the purpose of Reverse Path Forwarding (uRPF) enabled on border defense routers?',
      scenario: 'Mitigating volumetric DDoS attacks with spoofed source IP addresses.',
      options: [
        'Dropping incoming packets whose source IP does not match the reverse route in the routing table',
        'Accelerating BGP convergence during link failure',
        'Encrypting DNS text records over HTTPS',
        'Assigning dynamic IP addresses to wireless clients'
      ],
      correct: 0,
      exp: 'Unicast Reverse Path Forwarding (uRPF) drops packets if the router has no valid reverse route back to the source IP.'
    },
    {
      q: 'Which standard Ethernet MTU size is used across standard enterprise and tactical LAN switches?',
      scenario: 'Troubleshooting packet fragmentation in an encrypted VPN tunnel.',
      options: ['1500 bytes', '9000 bytes', '64 bytes', '576 bytes'],
      correct: 0,
      exp: 'Standard Ethernet specifies an MTU (Maximum Transmission Unit) of 1500 bytes.'
    },
    {
      q: 'How does DHCP Snooping defend a local network against rogue DHCP server attacks?',
      scenario: 'An attacker connects a rogue router offering fake DNS and default gateway settings.',
      options: [
        'By marking switch access ports as untrusted and dropping DHCP Offer messages from untrusted ports',
        'By encrypting all Ethernet frames using 802.1AE MACsec',
        'By disabling the local ARP cache on client workstations',
        'By shutting down the core gateway router during broadcast storms'
      ],
      correct: 0,
      exp: 'DHCP Snooping drops DHCP server response messages (DHCPOFFER/DHCPACK) arriving on untrusted ports.'
    }
  ],

  'core-cyber': [
    {
      q: 'Which tenet of the CIA Triad is directly violated when a rogue operator silently alters missile flight coordinates in a database?',
      scenario: 'An audit detects unauthorized modifications to ballistic trajectory parameters.',
      options: ['Integrity', 'Confidentiality', 'Availability', 'Non-Repudiation'],
      correct: 0,
      exp: 'Integrity guarantees that information has not been altered, tampered with, or fabricated by unauthorized parties.'
    },
    {
      q: 'What is the core philosophical doctrine of Zero Trust Architecture as defined in NIST SP 800-207?',
      scenario: 'Briefing defense leadership on modernizing legacy castle-and-moat security.',
      options: ['Never Trust, Always Verify', 'Trust but Verify', 'Perimeter Defense First', 'Implicit Trust for Internal Network'],
      correct: 0,
      exp: 'Zero Trust eliminates implicit trust based on network location, mandating continuous verification of all transactions.'
    },
    {
      q: 'Which asymmetric cryptographic algorithm is vulnerable to complete decryption by Shor\'s algorithm on a quantum computer?',
      scenario: 'Reviewing 20-year cryptographic retention policies for classified diplomatic cables.',
      options: ['RSA and Elliptic Curve Cryptography (ECC)', 'AES-256 Symmetric Encryption', 'SHA-256 Hashing', 'ChaCha20-Poly1305'],
      correct: 0,
      exp: 'Shor\'s algorithm solves prime factorization and discrete logarithms in polynomial time, breaking RSA and ECC.'
    },
    {
      q: 'What is the purpose of Perfect Forward Secrecy (PFS) in TLS 1.3 and military communications?',
      scenario: 'Protecting classified communications against adversary "Harvest Now, Decrypt Later" programs.',
      options: [
        'Generating ephemeral session keys so compromise of the master private key cannot decrypt past traffic',
        'Compressing payload data to reduce satellite bandwidth by 50%',
        'Permanently storing encryption keys on public blockchain ledgers',
        'Encrypting the physical copper Ethernet cable'
      ],
      correct: 0,
      exp: 'PFS generates unique ephemeral session keys for each connection. Compromise of long-term keys does not compromise past sessions.'
    },
    {
      q: 'Which Windows Security Event ID signifies a failed logon attempt, essential for detecting brute-force or password-spraying attacks?',
      scenario: 'Writing SIEM correlation rules to detect Active Directory credential attacks.',
      options: ['Event ID 4625', 'Event ID 4624', 'Event ID 7045', 'Event ID 1102'],
      correct: 0,
      exp: 'Event ID 4625 logs every failed logon attempt in the Windows Security Log.'
    },
    {
      q: 'According to RFC 3227 Order of Volatility, which piece of digital evidence must be captured FIRST during incident triage?',
      scenario: 'A high-value command server is suspected of active malware infection.',
      options: [
        'CPU registers, cache, and system RAM',
        'Archival magnetic backup tapes',
        'Internal solid-state hard drive partitions',
        'Printed network topology diagrams'
      ],
      correct: 0,
      exp: 'CPU registers, cache, and RAM are the most volatile data and disappear immediately upon power loss or reboot.'
    },
    {
      q: 'Why must incident responders NEVER reboot a compromised workstation during live triage?',
      scenario: 'A junior technician wants to reboot an infected terminal to clear anomalous processes.',
      options: [
        'Rebooting destroys RAM contents containing fileless malware, decrypted ransomware keys, and active network connections',
        'Rebooting automatically formats the primary hard drive',
        'Rebooting alerts the ISP to shut down external bandwidth',
        'Rebooting corrupts the BIOS clock irrevocably'
      ],
      correct: 0,
      exp: 'Powering down or rebooting destroys volatile RAM containing forensic artifacts like encryption keys and in-memory malware.'
    },
    {
      q: 'Which command is almost universally executed by Windows ransomware to prevent victim administrators from restoring shadow copies?',
      scenario: 'Analyzing endpoint telemetry during an active ransomware detonation.',
      options: [
        'vssadmin delete shadows /all /quiet',
        'format C: /fs:ntfs /q',
        'sfc /scannow',
        'shutdown /r /t 0'
      ],
      correct: 0,
      exp: 'Ransomware uses `vssadmin delete shadows /all /quiet` to silently destroy Windows volume shadow copies.'
    },
    {
      q: 'What is the primary difference between a Tier 1 SOC Analyst and a Tier 2 Incident Responder?',
      scenario: 'Reviewing operational staffing workflows in a 24/7 military cyber command center.',
      options: [
        'Tier 1 triages and filters high-volume alerts; Tier 2 performs deep forensics, containment, and root cause analysis',
        'Tier 1 conducts offensive attacks; Tier 2 repairs hardware servers',
        'Tier 1 writes custom kernel drivers; Tier 2 monitors building physical security',
        'Tier 1 has higher military clearance than Tier 2'
      ],
      correct: 0,
      exp: 'Tier 1 handles initial 24/7 queue monitoring and triage. Tier 2 handles technical investigation, forensic analysis, and containment.'
    },
    {
      q: 'What is Kerberoasting in an Active Directory environment?',
      scenario: 'A red teamer discovers multiple service accounts with registered Service Principal Names (SPNs).',
      options: [
        'Requesting TGS tickets for accounts with SPNs and cracking the service password hash offline',
        'Flooding the Domain Controller with fake NTP packets',
        'Overwriting the Kerberos Master Key in the domain root',
        'Injecting malicious DLLs into the Windows Explorer process'
      ],
      correct: 0,
      exp: 'Kerberoasting requests valid TGS tickets from Active Directory and extracts the ticket for offline password hash cracking.'
    },
    {
      q: 'What does Bring Your Own Vulnerable Driver (BYOVD) allow advanced malware to accomplish on Windows systems?',
      scenario: 'Investigating how a ransomware strain terminated an active EDR sensor.',
      options: [
        'Loading a legitimately signed, vulnerable kernel driver to disable security callbacks from kernel space',
        'Bypassing the Wi-Fi router password',
        'Formatting backup drives across network shares',
        'Cracking RSA-4096 keys in milliseconds'
      ],
      correct: 0,
      exp: 'BYOVD drops a legitimately signed driver with known flaws to grant malware ring-0 kernel read/write, disabling EDR sensors.'
    },
    {
      q: 'What is the difference between static malware analysis and dynamic malware analysis?',
      scenario: 'Setting up a malware triage laboratory at a defense research institute.',
      options: [
        'Static analysis inspects binary code without executing it; dynamic analysis detonates the sample in an isolated sandbox',
        'Static analysis runs in memory; dynamic analysis runs on magnetic tapes',
        'Static analysis requires an active Internet connection; dynamic analysis does not',
        'Static analysis is only for Linux; dynamic analysis is only for Windows'
      ],
      correct: 0,
      exp: 'Static analysis analyzes code, strings, and headers without execution. Dynamic analysis executes code in a sandbox to observe behavior.'
    },
    {
      q: 'Which component of NIST Zero Trust Architecture contains the Policy Engine and Policy Administrator to evaluate access requests?',
      scenario: 'Architecting a secure defense cloud access portal.',
      options: [
        'Policy Decision Point (PDP)',
        'Policy Enforcement Point (PEP)',
        'Border Gateway Router',
        'Demilitarized Zone (DMZ)'
      ],
      correct: 0,
      exp: 'The Policy Decision Point (PDP) evaluates continuous telemetry and policy rules to decide whether access is granted.'
    },
    {
      q: 'What is the purpose of an immutable write-once-read-many (WORM) storage architecture for security event logs?',
      scenario: 'Satisfying compliance mandates for national defense audit logging.',
      options: [
        'Preventing an attacker who gains root access from deleting or modifying historical forensic logs',
        'Compressing log size to reduce hard drive costs',
        'Converting text logs into MP3 audio files',
        'Automatically emailing daily logs to all employees'
      ],
      correct: 0,
      exp: 'WORM storage guarantees that once logs are written, they cannot be altered or deleted by attackers attempting to clear tracks.'
    },
    {
      q: 'Which post-quantum cryptographic algorithm was standardized by NIST under FIPS 203 for general encryption and key exchange?',
      scenario: 'Evaluating quantum-safe algorithms for national defense communications.',
      options: ['ML-KEM (derived from CRYSTALS-Kyber)', 'RSA-2048', 'Triple-DES', 'MD5 Hashing'],
      correct: 0,
      exp: 'NIST standardized ML-KEM (CRYSTALS-Kyber) as the primary post-quantum key encapsulation mechanism.'
    }
  ],

  'ethical-hacking': [
    {
      q: 'Which Nmap scanning flag performs a stealth TCP SYN scan without completing the full 3-way handshake?',
      scenario: 'Conducting an authorized penetration test against perimeter defense servers.',
      options: ['-sS', '-sT', '-sU', '-sA'],
      correct: 0,
      exp: 'The `-sS` flag instructs Nmap to conduct a SYN stealth scan, resetting connections with a RST before full handshake completion.'
    },
    {
      q: 'What is an Insecure Direct Object Reference (IDOR) vulnerability in a web application?',
      scenario: 'Reviewing access control logic in a military personnel welfare portal.',
      options: [
        'An application exposes a direct database ID in a URL or parameter without verifying user authorization',
        'An attacker injects malicious SQL statements into a search box',
        'A web server fails to enforce HTTPS encryption on port 443',
        'An adversary floods a web server with half-open SYN packets'
      ],
      correct: 0,
      exp: 'IDOR occurs when user-supplied input accesses database objects directly without verifying authorization.'
    },
    {
      q: 'What is the primary architectural defense that completely prevents SQL Injection vulnerabilities?',
      scenario: 'A defense software engineering team is rewriting a database query module.',
      options: [
        'Parameterized Queries (Prepared Statements)',
        'Client-side JavaScript character validation',
        'Blacklisting single quotes and semicolons',
        'Changing the database listening port'
      ],
      correct: 0,
      exp: 'Parameterized queries pre-compile the SQL statement, ensuring user input is treated strictly as data, never executable syntax.'
    },
    {
      q: 'How does Server-Side Request Forgery (SSRF) allow an attacker to breach an internal defense cloud enclave?',
      scenario: 'Testing a public-facing document preview service in an AWS defense cloud.',
      options: [
        'By coercing the vulnerable web server into sending crafted HTTP requests to internal IP addresses or metadata services',
        'By guessing the root password of the database server',
        'By jamming the physical satellite uplink receiver',
        'By altering DNS records on the client browser'
      ],
      correct: 0,
      exp: 'SSRF forces the vulnerable server to make HTTP requests to internal restricted services (like 169.254.169.254 metadata).'
    },
    {
      q: 'Which Windows user privilege is famously abused by tools like JuicyPotato and PrintSpoofer to escalate privileges to NT AUTHORITY\\SYSTEM?',
      scenario: 'Conducting local privilege escalation on a compromised Windows service account.',
      options: ['SeImpersonatePrivilege', 'SeShutdownPrivilege', 'SeTimeZonePrivilege', 'SeRemoteShutdownPrivilege'],
      correct: 0,
      exp: '`SeImpersonatePrivilege` allows a service account to impersonate tokens of other authenticated users, escalating to SYSTEM.'
    },
    {
      q: 'What tool is considered the industry standard for extracting plaintext passwords and Kerberos tickets directly from LSASS memory?',
      scenario: 'Simulating adversary credential harvesting during a red team operation.',
      options: ['Mimikatz', 'Wireshark', 'Burp Suite', 'Nmap'],
      correct: 0,
      exp: 'Mimikatz is the premier tool for dumping credentials, tickets, and hashes from the Windows LSASS process memory.'
    },
    {
      q: 'In Linux systems, what does the SUID (Set User ID) permission bit do when set on an executable file owned by root?',
      scenario: 'Auditing file permissions across a tactical Linux server.',
      options: [
        'It executes the binary with the permissions of the file owner (root) rather than the executing user',
        'It encrypts the binary using AES-256',
        'It prevents the file from being deleted by any user',
        'It forces the binary to run inside an isolated Docker container'
      ],
      correct: 0,
      exp: 'SUID (`chmod u+s`) runs the program with the privileges of the file owner (e.g. root), presenting a privilege escalation risk.'
    },
    {
      q: 'What is an Evil Twin attack in wireless security?',
      scenario: 'Testing physical security and rogue AP detection at a forward military base.',
      options: [
        'Broadcasting a rogue wireless access point with the identical SSID and BSSID as the legitimate base Wi-Fi network',
        'Cracking WPA3 passwords using quantum computers',
        'Jamming cellular 4G/5G frequencies using an RF noise generator',
        'Stealing physical laptop hard drives from an office'
      ],
      correct: 0,
      exp: 'An Evil Twin attack impersonates a legitimate Wi-Fi network to lure users into connecting and harvesting credentials.'
    },
    {
      q: 'What is the purpose of Antimalware Scan Interface (AMSI) in Windows 10/11 and Server 2022?',
      scenario: 'Evaluating endpoint security controls against obfuscated PowerShell scripts.',
      options: [
        'Providing an interface for antivirus engines to inspect script code in memory immediately before execution',
        'Blocking all inbound network traffic on port 445',
        'Managing smart-card cryptographic certificates',
        'Formatting damaged disk sectors'
      ],
      correct: 0,
      exp: 'AMSI allows antivirus solutions to scan scripts (PowerShell, VBScript, .NET) in memory after de-obfuscation.'
    },
    {
      q: 'What is Google Dorking in the context of Open Source Intelligence (OSINT)?',
      scenario: 'Conducting passive reconnaissance against an organization\'s external digital footprint.',
      options: [
        'Using advanced search engine operators to find exposed files, passwords, and misconfigured servers',
        'Conducting volumetric denial of service attacks against Google DNS',
        'Cracking Wi-Fi passwords using dictionary attacks',
        'Extracting GPS coordinates from drone radio links'
      ],
      correct: 0,
      exp: 'Google Dorking utilizes search filters (e.g. `filetype:pdf site:mil "confidential"`) to find sensitive exposed documents.'
    },
    {
      q: 'What makes Broken Object Level Authorization (BOLA) the number one threat in the OWASP API Security Top 10?',
      scenario: 'Reviewing API endpoints in a mobile defense logistics tracking application.',
      options: [
        'Attackers manipulate resource IDs in API requests to access data belonging to other users without authorization checks',
        'Attackers guess API encryption keys',
        'APIs fail to respond to ping requests',
        'API tokens expire too quickly'
      ],
      correct: 0,
      exp: 'BOLA occurs when an API endpoint handles object identifiers without verifying that the requesting user owns the object.'
    },
    {
      q: 'What is MFA Fatigue (also known as MFA Prompt Bombing)?',
      scenario: 'Analyzing how an adversary breached an administrative account protected by push-notification MFA.',
      options: [
        'Flooding a user with dozens of push notifications until they inadvertently or frustration-approve the login request',
        'Cracking RSA hardware tokens using brute force',
        'Intercepting satellite text messages from an airplane',
        'Guessing a user\'s master password on the first attempt'
      ],
      correct: 0,
      exp: 'MFA fatigue bombards victims with continuous authentication requests until they tap "Approve" to stop the spam.'
    },
    {
      q: 'What distinguishes staged payloads from non-staged payloads in the Metasploit framework?',
      scenario: 'Selecting a reverse shell payload to fit within a small buffer overflow exploit window.',
      options: [
        'Staged payloads send a tiny initial payload (stager) that downloads the full Meterpreter into memory in stages',
        'Staged payloads write all data to physical hard drives',
        'Non-staged payloads cannot communicate over TCP',
        'Staged payloads are only compatible with Linux'
      ],
      correct: 0,
      exp: 'Staged payloads use a small initial payload to establish a socket and pull down the remainder of the payload into memory.'
    },
    {
      q: 'What technique do advanced adversaries use to execute malicious code in memory without writing an executable to disk?',
      scenario: 'Investigating a fileless malware infection that left zero disk traces.',
      options: ['Process Hollowing / Reflective DLL Injection', 'Disk Defragmentation', 'Static PE Header Modification', 'Physical RAM Extraction'],
      correct: 0,
      exp: 'Process Hollowing unmaps legitimate code from a suspended process and injects malicious payload directly into memory.'
    },
    {
      q: 'Which Nmap Scripting Engine (NSE) script specifically detects the EternalBlue SMB vulnerability (MS17-010)?',
      scenario: 'Performing an emergency vulnerability sweep during an active ransomware outbreak.',
      options: ['smb-vuln-ms17-010', 'http-vuln-cve2021-44228', 'dns-brute', 'ssl-heartbleed'],
      correct: 0,
      exp: '`smb-vuln-ms17-010` is the dedicated Nmap script to verify if an SMB service is vulnerable to EternalBlue.'
    }
  ],

  'military-cyber': [
    {
      q: 'What historical cyber weapon first proved that digital malware could physically destroy industrial machinery in an air-gapped nuclear facility?',
      scenario: 'A defense academy seminar examining the advent of kinetic cyber warfare.',
      options: ['Stuxnet (Operation Olympic Games)', 'WannaCry Ransomware', 'Mirai Botnet', 'Heartbleed OpenSSL Flaw'],
      correct: 0,
      exp: 'Stuxnet physically destroyed over 1,000 uranium centrifuges at Natanz by manipulating PLC rotor speeds.'
    },
    {
      q: 'How does a Hardware Optical Data Diode physically enforce unidirectional data transmission into a classified air-gapped network?',
      scenario: 'Designing a weather data ingestion pipeline for an armed forces command bunker.',
      options: [
        'By utilizing a single physical fiber strand with a light transmitter on one end and receiver on the other, with no reverse path',
        'By using stateful firewall access control lists (ACLs)',
        'By routing traffic through a commercial dual-homed VPN gateway',
        'By applying WPA3 Enterprise digital certificates'
      ],
      correct: 0,
      exp: 'Optical data diodes use physical optical physics (LED/Laser to photodiode) with no return fiber to make exfiltration impossible.'
    },
    {
      q: 'In the Purdue Model for Industrial Control Systems (ICS/SCADA), which layer is designated for Programmable Logic Controllers (PLCs)?',
      scenario: 'Reviewing network segmentation in a naval propulsion automation facility.',
      options: ['Level 1 (Basic Process Control)', 'Level 0 (Physical Process)', 'Level 3 (Site Operations)', 'Level 4 (Enterprise IT)'],
      correct: 0,
      exp: 'Level 1 houses the real-time controllers (PLCs and RTUs) that execute direct control loops over physical Level 0 sensors.'
    },
    {
      q: 'Which default TCP port is utilized by the legacy Modbus TCP industrial SCADA protocol, which carries zero native authentication?',
      scenario: 'Writing an Industrial DMZ firewall rule to police substation telemetry.',
      options: ['Port 502', 'Port 8080', 'Port 445', 'Port 22'],
      correct: 0,
      exp: 'Modbus TCP communicates unencrypted on TCP port 502 without authentication.'
    },
    {
      q: 'In military C4ISR terminology, what does the acronym C4ISR represent?',
      scenario: 'Strategic defense architecture briefing for cyber command officers.',
      options: [
        'Command, Control, Communications, Computers, Intelligence, Surveillance, and Reconnaissance',
        'Cyber Defense, Cryptography, Cloud Computing, Cybercrime, Information Security, and Resilience',
        'Central Command, Counter-Terrorism, Combat Communications, and Satellite Radar',
        'Continuous Compliance, Cryptographic Keys, Critical Controls, and Incident Response'
      ],
      correct: 0,
      exp: 'C4ISR stands for Command, Control, Communications, Computers, Intelligence, Surveillance, and Reconnaissance.'
    },
    {
      q: 'What is the primary objective of Content Disarm and Reconstruction (CDR) technology at the perimeter of an air-gapped network?',
      scenario: 'Sanitizing incoming intelligence dossiers and PDF field reports before network ingestion.',
      options: [
        'Deconstructing files to discrete components, stripping all macros and executable code, and reconstructing clean files',
        'Encrypting incoming files with AES-128',
        'Scanning files using commercial cloud antivirus APIs',
        'Translating English documents into foreign languages'
      ],
      correct: 0,
      exp: 'CDR assumes all files are hostile, strips active scripts and macros, and reconstructs mathematically clean files.'
    },
    {
      q: 'Which Chinese state-sponsored threat group was identified by security researchers for targeting 10 Indian power sector dispatch centers using ShadowPad malware in 2020?',
      scenario: 'Reviewing national threat intelligence reports on critical infrastructure targeting.',
      options: ['RedEcho (TAG-38)', 'Lazarus Group', 'Sandworm Team', 'Equation Group'],
      correct: 0,
      exp: 'RedEcho targeted Indian regional power load dispatch centers using the modular ShadowPad trojan.'
    },
    {
      q: 'What vulnerability exists in civilian marine Automatic Identification System (AIS) transponders on commercial and naval vessels?',
      scenario: 'Investigating false vessel tracking reports in contested maritime straits.',
      options: [
        'AIS broadcasts over open unencrypted VHF radio frequencies without cryptographic authentication, allowing spoofed phantom ships',
        'AIS can only transmit at night',
        'AIS disables the warship\'s primary radar',
        'AIS is incompatible with GPS'
      ],
      correct: 0,
      exp: 'AIS broadcasts over unencrypted VHF frequencies without authentication, allowing adversaries to broadcast spoofed vessel tracks.'
    },
    {
      q: 'What is TEMPEST in military communication and physical security standards?',
      scenario: 'Designing a shielded cryptographic key generation room at an army command headquarters.',
      options: [
        'The investigation and shielding of unintentional compromising electromagnetic radiation emitted by computing equipment',
        'A high-power microwave radar jamming system',
        'A severe tropical cyclone warning system',
        'An automated software vulnerability scanner'
      ],
      correct: 0,
      exp: 'TEMPEST refers to NSA/military specifications that shield against electromagnetic emissions leaking classified information.'
    },
    {
      q: 'Which malware attack crippled tens of thousands of KA-SAT satellite ground modems across Europe at the onset of conflict in 2022?',
      scenario: 'Reviewing satellite communications vulnerability to ground terminal wiper malware.',
      options: ['AcidRain Wiper', 'WannaCry', 'Stuxnet', 'Mirai'],
      correct: 0,
      exp: 'AcidRain wiper malware targeted the flash memory of Viasat KA-SAT satellite modems, blinding satellite communications.'
    },
    {
      q: 'What is the function of M-code in military GPS satellites compared to civilian C/A signals?',
      scenario: 'Hardening tactical drone navigation against electronic warfare spoofing.',
      options: [
        'M-code is an encrypted, highly jam-resistant signal with cryptographic authentication designed exclusively for military receivers',
        'M-code is a commercial signal used for smartphone mapping',
        'M-code requires zero satellite visibility',
        'M-code broadcasts over FM radio frequencies'
      ],
      correct: 0,
      exp: 'Military M-code GPS provides cryptographic authentication and directional signal beams to defeat spoofing and jamming.'
    },
    {
      q: 'How did the Ukraine 2016 Industroyer (CrashOverride) malware differ fundamentally from traditional corporate malware?',
      scenario: 'Analyzing specialized operational technology cyber weapons.',
      options: [
        'It directly spoke native electrical substation communication protocols (IEC 60870-5-104, IEC 61850) to open circuit breakers',
        'It encrypted Office documents demanding Bitcoin',
        'It mined Monero cryptocurrency on SCADA HMIs',
        'It altered employee payroll databases'
      ],
      correct: 0,
      exp: 'Industroyer was the first malware automated to directly speak industrial electrical protocols to control physical substation relays.'
    },
    {
      q: 'What is a "Hardware Trojan" in semiconductor defense supply chains?',
      scenario: 'Conducting supply chain integrity verification on imported military radar ASIC chips.',
      options: [
        'A malicious modification to the integrated circuit logic inserted during design or fabrication that can be triggered remotely',
        'A virus that infects computer keyboards',
        'A software tool that tests hard drives',
        'A physical padlock on a server rack'
      ],
      correct: 0,
      exp: 'A Hardware Trojan is a malicious micro-circuit modification inserted during chip fabrication that evades standard factory testing.'
    },
    {
      q: 'What is the primary role of an Industrial Demilitarized Zone (IDMZ) in securing critical infrastructure facilities?',
      scenario: 'Separating enterprise corporate IT networks from plant control networks.',
      options: [
        'Preventing any direct sessions between Enterprise IT (Level 4) and Industrial Control (Level 3), terminating all data at jump servers',
        'Allowing all employees to access SCADA PLCs from mobile phones',
        'Disabling firewalls inside the power plant',
        'Replacing copper cables with wireless Wi-Fi'
      ],
      correct: 0,
      exp: 'The IDMZ creates an isolated buffer zone where all communications terminate at dual-homed bastion hosts and replica historians.'
    },
    {
      q: 'In military Electronic Warfare (EW), what is the convergence of EW and Cyber Operations?',
      scenario: 'Briefing joint theatre command staff on multi-domain warfare.',
      options: [
        'Injecting digital cyber attack payloads directly through adversary radar and radio antennas using RF energy',
        'Dropping physical leaflets from aircraft',
        'Replacing satellite communications with carrier pigeons',
        'Using social media to recruit soldiers'
      ],
      correct: 0,
      exp: 'Cyber-EW convergence utilizes RF transmission to inject digital malicious payloads into wireless receivers and radar front-ends.'
    }
  ],

  'indian-cyber': [
    {
      q: 'Under the CERT-In April 2022 cybersecurity directives, within how many hours must specified cybersecurity incidents be reported to CERT-In?',
      scenario: 'A defense contractor detects an active ransomware infection on an internal engineering server.',
      options: ['Within 6 hours', 'Within 24 hours', 'Within 72 hours', 'Within 7 days'],
      correct: 0,
      exp: 'The CERT-In cybersecurity directives strictly mandate reporting designated cybersecurity incidents within 6 hours.'
    },
    {
      q: 'What is the mandatory retention period for ICT system and firewall logs under CERT-In directives, and where must they be maintained?',
      scenario: 'Auditing log storage infrastructure for a national defense portal.',
      options: [
        'At least 180 days, maintained within Indian jurisdiction',
        'At least 30 days in any global cloud provider',
        '10 years on physical paper printouts',
        'No log retention is required'
      ],
      correct: 0,
      exp: 'CERT-In mandates that all ICT logs must be maintained for a rolling period of at least 180 days within Indian jurisdiction.'
    },
    {
      q: 'Which Indian national agency is specifically designated under Section 70A of the Information Technology Act 2000 to protect Critical Information Infrastructure (Power, Defense, Nuclear, Telecom)?',
      scenario: 'Reviewing national compliance oversight for an Indian satellite communications gateway.',
      options: [
        'NCIIPC (National Critical Information Infrastructure Protection Centre)',
        'CERT-In',
        'I4C (Indian Cybercrime Coordination Centre)',
        'TRAI'
      ],
      correct: 0,
      exp: 'NCIIPC is the dedicated national agency created under Section 70A for Critical Information Infrastructure protection.'
    },
    {
      q: 'Which specialized tri-services agency was created to unify and coordinate the cyber warfare capabilities of the Indian Army, Indian Navy, and Indian Air Force?',
      scenario: 'Briefing defense leadership on joint military commands.',
      options: [
        'Defence Cyber Agency (DCA)',
        'National Informatics Centre (NIC)',
        'Central Bureau of Investigation (CBI)',
        'National Technical Research Organisation (NTRO)'
      ],
      correct: 0,
      exp: 'The Defence Cyber Agency (DCA) is the tri-services joint command created to unify cyber defense across the Army, Navy, and Air Force.'
    },
    {
      q: 'Under Section 66F of the Information Technology Act 2000, what is the maximum punishment for Cyber Terrorism against national security or critical infrastructure?',
      scenario: 'Legal briefing on prosecuting state-sponsored hackers attacking public infrastructure.',
      options: ['Imprisonment for life', '3 years imprisonment', 'A financial fine of 1,000 rupees', 'Community service for 6 months'],
      correct: 0,
      exp: 'Section 66F of the IT Act 2000 prescribes imprisonment for life for the offense of Cyber Terrorism.'
    },
    {
      q: 'What is the national helpline number operated by the Indian Cybercrime Coordination Centre (I4C) for reporting immediate financial cyber fraud?',
      scenario: 'Citizen reports an unauthorized banking transfer to an officer.',
      options: ['1930', '100', '112', '1091'],
      correct: 0,
      exp: '1930 is the national citizen financial cyber fraud reporting helpline operated under the Ministry of Home Affairs (MHA).'
    },
    {
      q: 'With which national institutions must all ICT system clocks synchronize under CERT-In directives to ensure forensic timestamp integrity?',
      scenario: 'Configuring NTP server settings on domain controllers across an enterprise network.',
      options: [
        'National Physical Laboratory (NPL) or National Informatics Centre (NIC) NTP servers',
        'Unvetted commercial internet NTP pools',
        'Local computer BIOS battery clocks',
        'Foreign satellite telecom clocks'
      ],
      correct: 0,
      exp: 'CERT-In mandates synchronization with official Indian time servers at NPL (time.nplindia.org) or NIC (time.nic.in).'
    },
    {
      q: 'What does the Trusted Telecom Portal mandated by the National Security Council Secretariat (NSCS) require from Indian telecom operators?',
      scenario: 'Procuring 5G network equipment for national telecommunications infrastructure.',
      options: [
        'Procuring network equipment exclusively from vetted "Trusted Sources" to prevent foreign hardware backdoors',
        'Providing free smartphones to all citizens',
        'Disabling mobile encryption on all phone calls',
        'Sharing all customer text messages with private advertisers'
      ],
      correct: 0,
      exp: 'The Trusted Telecom directive mandates that telecom operators procure equipment only from government-approved Trusted Sources.'
    },
    {
      q: 'Which DRDO laboratory is primarily responsible for research and development in military cryptology, cipher systems, and information security?',
      scenario: 'Evaluating indigenous hardware security modules for military tactical radios.',
      options: [
        'Scientific Analysis Group (SAG)',
        'Defence Metallurgical Research Laboratory (DMRL)',
        'Gas Turbine Research Establishment (GTRE)',
        'High Energy Materials Research Laboratory (HEMRL)'
      ],
      correct: 0,
      exp: 'The Scientific Analysis Group (SAG) in New Delhi is DRDO\'s dedicated laboratory for military cryptology and cyber defense.'
    },
    {
      q: 'What is the primary role of the Indian Cybercrime Coordination Centre (I4C) established under the Ministry of Home Affairs?',
      scenario: 'Coordinating cross-state police action against interstate financial cyber syndicates.',
      options: [
        'Serving as the nodal agency to fight cybercrime across law enforcement agencies, coordinating multi-state investigations',
        'Manufacturing military submarines',
        'Auditing public school computer labs',
        'Launching commercial space rockets'
      ],
      correct: 0,
      exp: 'I4C serves as the apex coordination center for law enforcement agencies across India to combat cybercrime and online fraud.'
    },
    {
      q: 'What is the significance of the 2022 AIIMS New Delhi cyber incident in shaping Indian healthcare cybersecurity guidelines?',
      scenario: 'Reviewing incident response case studies in critical public sector institutions.',
      options: [
        'It highlighted vulnerabilities in unsegmented networks and prompted mandatory MFA and air-gapped backup directives across hospitals',
        'It led to the complete abandonment of computers in medical facilities',
        'It proved that antivirus software is 100% infallible',
        'It had zero impact on national cyber security policies'
      ],
      correct: 0,
      exp: 'The AIIMS ransomware incident triggered nationwide audits mandating network segmentation, daily offline backups, and strict MFA.'
    },
    {
      q: 'Under Section 70 of the IT Act 2000, what happens when a computer system is officially declared a "Protected System"?',
      scenario: 'Classifying a strategic defense satellite gateway terminal as a Protected System.',
      options: [
        'Any unauthorized access or attempt to access the system is punishable by up to 10 years imprisonment',
        'The system is exempted from all security audits',
        'The system must be disconnected from electricity',
        'The system\'s source code is published on the public Internet'
      ],
      correct: 0,
      exp: 'Section 70 allows designation of Protected Systems; unauthorized access is a non-bailable offense carrying up to 10 years prison.'
    },
    {
      q: 'What is the Reserve Bank of India (RBI) Cyber Security Framework mandate regarding SWIFT financial messaging infrastructure?',
      scenario: 'Auditing banking interfaces for foreign exchange transactions.',
      options: [
        'Strict network segmentation between SWIFT terminals and internal banking LANs, with continuous alert monitoring',
        'Allowing SWIFT operations from employee personal smartphones',
        'Disabling multi-factor authentication on wire transfers',
        'Eliminating all audit logging on financial transactions'
      ],
      correct: 0,
      exp: 'RBI mandates strict physical and logical network isolation for SWIFT infrastructure with multi-factor authentication.'
    },
    {
      q: 'What is the Defence Cyber Agency (DCA) primary posture regarding offensive and defensive cyber capabilities?',
      scenario: 'Formulating joint operational doctrine for the Indian Armed Forces.',
      options: [
        'Maintaining both robust defensive resilience for military networks and strategic offensive capabilities to deter adversaries',
        'Relying strictly on civilian private antivirus software',
        'Prohibiting soldiers from using any digital devices',
        'Outsourcing all military network defense to foreign defense contractors'
      ],
      correct: 0,
      exp: 'DCA maintains a dual mission: defending tactical military communications and executing strategic counter-cyber deterrence.'
    },
    {
      q: 'How does the Indian Computer Emergency Response Team (CERT-In) assist defense and commercial organizations during an active zero-day disclosure?',
      scenario: 'A critical vulnerability is discovered in an enterprise firewall brand used across the country.',
      options: [
        'By issuing urgent security advisories, triage workarounds, IOC signatures, and coordinating patch deployment with vendors',
        'By shutting down the entire national electrical grid',
        'By arresting the software developers immediately',
        'By deleting all customer databases'
      ],
      correct: 0,
      exp: 'CERT-In analyzes vulnerabilities, publishes actionable technical advisories with CVEs, and coordinates nationwide remediation.'
    }
  ]
};

// Generates a complete set of at least 25 questions for ANY topic
export function getQuestionsForTopic(topic) {
  const domainId = topic.domainId || 'networking';
  const domainBank = DOMAIN_QUESTION_BANKS[domainId] || DOMAIN_QUESTION_BANKS['networking'];

  // Topic specific questions (customized based on topic title & overview)
  const topicSpecific = [
    {
      id: `${topic.id}-q01`,
      question: `In operational defense, what is the primary technical objective of ${topic.title}?`,
      scenario: `A tactical communications officer is reviewing unit standard operating procedures regarding ${topic.title}.`,
      options: [
        `${topic.overview.substring(0, 110)}...`,
        'Bypassing all authentication protocols to speed up field transmission rates',
        'Disabling firewall logging to save internal hard drive memory during operations',
        'Transmitting all battlefield telemetry in unencrypted cleartext across commercial Wi-Fi'
      ],
      correctIndex: 0,
      explanation: `${topic.overview}`,
      domainCategory: topic.title
    },
    {
      id: `${topic.id}-q02`,
      question: `What critical vulnerability is directly mitigated by implementing the defense controls of ${topic.title}?`,
      scenario: `Analyzing potential attack vectors and adversary exploitation techniques in ${topic.title}.`,
      options: [
        `Unauthorized access, tampering, or service disruption exploiting architectural weaknesses in ${topic.tags ? topic.tags.slice(0, 2).join(' and ') : 'the system'}`,
        'Physical theft of optical fiber cables from deep underground conduits',
        'Solar flare geomagnetic radiation affecting satellite battery charging',
        'Accidental power unplugging by cleaning staff in the server room'
      ],
      correctIndex: 0,
      explanation: `Implementing controls for ${topic.title} closes attack surfaces associated with ${topic.tags ? topic.tags.join(', ') : 'critical protocols'}.`,
      domainCategory: topic.title
    },
    {
      id: `${topic.id}-q03`,
      question: `Which operational case study directly illustrates the catastrophic consequences of neglecting ${topic.title}?`,
      scenario: `A military seminar reviews historical lessons learned from past cyber warfare campaigns.`,
      options: [
        `${topic.caseStudyTitle || 'Historical Critical Infrastructure Cyber Incident'}`,
        'The 1969 Apollo 11 Lunar Landing telemetry verification',
        'The invention of the mechanical typewriter in the 19th century',
        'The deployment of standard analog telephone lines'
      ],
      correctIndex: 0,
      explanation: `${topic.caseStudySummary || 'Historical breaches prove the necessity of rigorous defense enforcement.'} Lesson: ${topic.caseStudyLesson || 'Defense in depth is mandatory.'}`,
      domainCategory: topic.title
    },
    {
      id: `${topic.id}-q04`,
      question: `When auditing an installation for compliance with ${topic.title}, what should an analyst verify FIRST?`,
      scenario: `Conducting a rigorous technical inspection of a forward operational command enclave.`,
      options: [
        `Verify baseline configuration, access control policies, and cryptographic verification for ${topic.tags ? topic.tags[0] : 'core services'}`,
        'Ensure that all server passwords are taped to the monitor for rapid emergency access',
        'Verify that default manufacturer administrative passwords (admin/admin) are unchanged',
        'Disable all automated alerts to prevent disturbing operating personnel'
      ],
      correctIndex: 0,
      explanation: `Auditing begins with validating security baselines, access control lists, and cryptographic integrity against standard profiles.`,
      domainCategory: topic.title
    },
    {
      id: `${topic.id}-q05`,
      question: `What tactical rule of engagement must always be maintained when operating under the principles of ${topic.title}?`,
      scenario: `A tactical commander establishes standard operating procedures for field personnel.`,
      options: [
        'Enforce Least Privilege and continuous verification across all communication channels',
        'Allow unvetted commercial flash drives into high-security control terminals',
        'Operate all classified networks without firewall inspection',
        'Share administrative master credentials across all operational units'
      ],
      correctIndex: 0,
      explanation: `Strict least privilege, continuous verification, and air-tight boundary controls are foundational to tactical resilience.`,
      domainCategory: topic.title
    }
  ];

  // Select 20 questions from the domain bank to reach 25 total
  const domainQuestions = domainBank.map((item, idx) => ({
    id: `${topic.id}-dq${idx + 1}`,
    question: item.q,
    scenario: item.scenario,
    options: item.options,
    correctIndex: item.correct,
    explanation: item.exp,
    domainCategory: topic.domainId
  }));

  // Combine to create at least 25 questions
  const combined = [...topicSpecific, ...domainQuestions];

  // If still less than 25, pull from other domains to guarantee exactly 25+
  if (combined.length < 25) {
    const fallbackBank = DOMAIN_QUESTION_BANKS['core-cyber'];
    fallbackBank.forEach((item, idx) => {
      if (combined.length < 25) {
        combined.push({
          id: `${topic.id}-fbq${idx + 1}`,
          question: item.q,
          scenario: item.scenario,
          options: item.options,
          correctIndex: item.correct,
          explanation: item.exp,
          domainCategory: 'General Tactical Cyber Security'
        });
      }
    });
  }

  // Return exactly 25 questions for every single quiz
  return combined.slice(0, 25);
}
