const fs = require('fs');
const path = require('path');

const CATEGORIES = [
  {
    name: 'Ethical Hacking & Pentesting',
    key: 'ethical-hacking',
    accent: '#0ea5e9',
    books: [
      { title: "Practical Ethical Hacking: Beginner's Field Guide", author: "Alex Mercer", focus: "Reconnaissance, scanning, vulnerability assessment, and safe exploitation basics." },
      { title: "The Hacker Playbook: Practical Penetration Testing", author: "Peter Kim", focus: "Real-world penetration testing methodologies, stealth scanning, and lateral movement." },
      { title: "Metasploit Fundamentals: Hands-On Exploitation", author: "David Kennedy", focus: "How to use Metasploit framework, payload generation, handlers, and post-exploitation." },
      { title: "Privilege Escalation for Linux & Windows", author: "Tiberius & Sektor", focus: "Kernel exploits, SUID binaries, misconfigured services, and token impersonation." },
      { title: "Wireless & Wi-Fi Network Hacking Exposed", author: "Joshua Wright", focus: "WPA2/WPA3 handshakes, deauthentication attacks, evil twins, and rogue AP detection." },
      { title: "Social Engineering: The Art of Human Hacking", author: "Christopher Hadnagy", focus: "Phishing techniques, pretexting, psychological triggers, and security awareness training." },
      { title: "Red Team Field Manual (RTFM v2)", author: "Ben Clark", focus: "Essential syntax, command reference, one-liners for PowerShell, bash, and command prompt." },
      { title: "Network Penetration Testing with Kali Linux", author: "OffSec Training Division", focus: "Network enumeration, banner grabbing, service exploitation, and pivot tunnels." },
      { title: "Active Directory Pentesting & Hardening", author: "Sean Metcalf", focus: "Kerberoasting, DCSync, BloodHound graph analysis, and domain controller protection." },
      { title: "Physical Penetration Testing & Lock Picking", author: "Deviant Ollam", focus: "Bypassing physical doors, RFID cloning, tailgating defense, and badge security." },
      { title: "Bug Bounty Hunting Essentials", author: "Vikram Sharma", focus: "Finding vulnerabilities in web apps, writing clear reports, and earning bounties." }
    ]
  },
  {
    name: 'Network Security & Packet Analysis',
    key: 'networking',
    accent: '#06b6d4',
    books: [
      { title: "Wireshark Network Analysis: Master Packet Inspection", author: "Laura Chappell", focus: "Capturing packets, filter syntax, analyzing TCP handshakes, and diagnosing network delays." },
      { title: "TCP/IP Illustrated: Network Protocols in Simple Words", author: "W. Richard Stevens", focus: "How the internet really works: IP headers, routing tables, DNS lookup, and ARP resolution." },
      { title: "Nmap Network Scanning: The Official Guide", author: "Gordon Lyon (Fyodor)", focus: "Port scanning techniques, OS fingerprinting, NSE scripts, and firewall evasion basics." },
      { title: "Firewall Architecture & Packet Filtering", author: "Marcus Ranum", focus: "Stateful inspection, iptables rules, pfSense setup, and DMZ network segmentation." },
      { title: "Practical Packet Analysis: Using Wireshark", author: "Chris Sanders", focus: "Troubleshooting real-world network anomalies, malware beacons, and protocol errors." },
      { title: "DNS Security & DNSSEC Implementation", author: "Cricket Liu", focus: "Preventing DNS poisoning, cache poisoning, zone transfers, and setting up DNSSEC." },
      { title: "VPN Technologies & Secure Remote Access", author: "Mark Rhodes-Ousley", focus: "IPsec tunnels, OpenVPN, WireGuard configuration, and end-to-end encryption." },
      { title: "Subnetting & Network Addressing Made Simple", author: "Todd Lammle", focus: "IPv4 CIDR notation, subnet masks, default gateways, and IPv6 migration." },
      { title: "Intrusion Detection with Snort & Suricata", author: "Martin Roesch", focus: "Writing IDS/IPS rules, signature matching, and analyzing suspicious network traffic." },
      { title: "BGP Routing & Internet Gateway Security", author: "Geoff Huston", focus: "Border Gateway Protocol, preventing BGP hijacking, and RPKI validation." },
      { title: "Network Troubleshooting Field Guide", author: "Network Ops Team", focus: "Ping, traceroute, netstat, nslookup, and diagnosing dropped packets." }
    ]
  },
  {
    name: 'Web Application Security & OWASP',
    key: 'web-security',
    accent: '#f59e0b',
    books: [
      { title: "The Web Application Hacker's Handbook", author: "Dafydd Stuttard & Marcus Pinto", focus: "Understanding web architectures, intercepting proxies, session hijacking, and SQL injection." },
      { title: "OWASP Top 10 Security Guide for Developers", author: "OWASP Foundation", focus: "Broken access control, cryptographic failures, injection, and security misconfigurations." },
      { title: "Mastering Burp Suite for Web Pentesting", author: "Pradeep Kumar", focus: "Burp Repeater, Intruder, match-and-replace rules, and automated vulnerability scanning." },
      { title: "Cross-Site Scripting (XSS) Attacks & Defense", author: "Seth Fogie", focus: "Reflected, stored, and DOM-based XSS, Content Security Policy (CSP), and input sanitization." },
      { title: "SQL Injection Attacks & Defensive Coding", author: "Justin Clarke", focus: "Union-based injection, blind SQLi, parameterized queries, and ORM security." },
      { title: "API Security in Action: REST & GraphQL", author: "Neil Madden", focus: "Securing endpoints, JWT token authentication, rate limiting, and broken object-level auth." },
      { title: "Server-Side Request Forgery (SSRF) Exploits", author: "Orange Tsai", focus: "Cloud metadata endpoints, internal network port scanning, and URL validation filters." },
      { title: "Secure Cookie & Session Management", author: "Michael Howard", focus: "HttpOnly flags, SameSite cookies, session rotation, and preventing session fixation." },
      { title: "Modern Web Authentication: OAuth2 & OIDC", author: "Aaron Parecki", focus: "Authorization flows, access tokens, refresh tokens, and preventing redirect URI hijacking." },
      { title: "Cross-Site Request Forgery (CSRF) Prevention", author: "Web App Security Project", focus: "Anti-CSRF tokens, SameSite attribute, and double submit cookie patterns." },
      { title: "Practical Web Security Testing Handbook", author: "Security Testing Group", focus: "Step-by-step checklist to test any website before launching it to production." }
    ]
  },
  {
    name: 'Blue Team & SOC Operations',
    key: 'blue-team',
    accent: '#10b981',
    books: [
      { title: "Blue Team Handbook: Incident Response Edition", author: "Don Murdoch", focus: "Step-by-step playbook for triage, containment, eradication, and lessons learned." },
      { title: "SOC Analyst Fundamentals: Level 1 Mastery", author: "Tyler Wall", focus: "Understanding alerts, SIEM dashboards, log correlation, and false positive tuning." },
      { title: "Applied Threat Intelligence & Hunting", author: "Robert M. Lee", focus: "Indicators of Compromise (IoCs), MITRE ATT&CK mapping, and hunting adversary groups." },
      { title: "SIEM Architecture: Splunk & Elastic Security", author: "Derek Lawson", focus: "Ingesting logs, writing search queries, alert correlation, and building analyst dashboards." },
      { title: "Windows Event Log Analysis for Defenders", author: "Randy Franklin Smith", focus: "Event IDs 4624, 4625, 4688, Sysmon event tracing, and detecting lateral movement." },
      { title: "Endpoint Detection & Response (EDR) Operations", author: "CrowdStrike & SentinelOne Teams", focus: "Process tree analysis, memory injection detection, and isolating compromised endpoints." },
      { title: "Zero Trust Architecture: NIST SP 800-207", author: "Scott Rose & Oliver Borchert", focus: "Never trust, always verify, continuous authentication, and microsegmentation." },
      { title: "Vulnerability Management & Patching Strategy", author: "Tenable Research", focus: "CVSS v3/v4 scoring, risk prioritization, emergency patching cycles, and asset discovery." },
      { title: "Email Security & Anti-Phishing Defenses", author: "Proofpoint Security Lab", focus: "SPF records, DKIM cryptographic signing, DMARC policies, and sandboxing email attachments." },
      { title: "DDoS Mitigation & Rate Limiting Blueprints", author: "Cloudflare Engineering", focus: "SYN flood protection, CDN caching, Anycast routing, and challenge pages." },
      { title: "Cyber Defense Rules of Engagement", author: "Defense SOC Team", focus: "Mandatory daily checklists, shift handovers, and emergency escalation paths." }
    ]
  },
  {
    name: 'Linux & Windows Hardening',
    key: 'system-hardening',
    accent: '#6366f1',
    books: [
      { title: "Linux Server Hardening: Complete Field Manual", author: "Sander van Vugt", focus: "Disabling unnecessary services, SSH keys, UFW firewall, fail2ban, and SELinux." },
      { title: "Windows Server 2025 Security Hardening", author: "Mark Russinovich", focus: "Group Policy Objects (GPO), BitLocker, Credential Guard, and AppLocker rules." },
      { title: "Mastering Linux Command Line for Security", author: "William Shotts", focus: "File permissions, grep, find, awk, sed, and inspecting running processes with ps/top." },
      { title: "Active Directory Security & GPO Defense", author: "John Savill", focus: "Tiered administration, protecting Domain Admins, and preventing pass-the-hash." },
      { title: "SELinux & AppArmor: Mandatory Access Control", author: "Dan Walsh", focus: "Enforcing security policies, labeling files, confining web servers, and troubleshooting denials." },
      { title: "SSH Hardening & Key-Based Authentication", author: "Daniel J. Barrett", focus: "Disabling password auth, ed25519 keys, bastion jump hosts, and port knocking." },
      { title: "Sysmon: System Monitoring for Windows Defenders", author: "Mark Cook", focus: "Configuring Sysmon XML schemas, logging command line arguments, and detecting LOLBins." },
      { title: "Linux Kernel Security & Memory Protection", author: "Brad Spengler", focus: "KASLR, stack canaries, no-execute bits, and sysctl security hardening parameters." },
      { title: "Privileged Access Management (PAM) Handbook", author: "CyberArk Security Division", focus: "Just-in-time elevation, credential vaulting, session recording, and MFA enforcement." },
      { title: "Secure Baseline Configuration: CIS Benchmarks", author: "Center for Internet Security", focus: "Implementing CIS Level 1 and Level 2 benchmarks across enterprise servers." }
    ]
  },
  {
    name: 'Cloud Security & DevSecOps',
    key: 'cloud-devsecops',
    accent: '#38bdf8',
    books: [
      { title: "AWS Security Cookbook: Practical Recipes", author: "Hart Hoover", focus: "IAM policies, S3 bucket permissions, VPC security groups, and CloudTrail auditing." },
      { title: "Azure Security Technologies: Exam & Real World", author: "Damon Rath", focus: "Entra ID (Azure AD), Key Vault, Defender for Cloud, and Network Security Groups." },
      { title: "Kubernetes Security: Defending Container Clusters", author: "Liz Rice", focus: "Pod Security Standards, RBAC, network policies, and container image vulnerability scanning." },
      { title: "Docker Security: Hardening Container Deployments", author: "Adrian Mouat", focus: "Rootless containers, read-only root filesystems, resource limits, and minimal base images." },
      { title: "Practical DevSecOps: CI/CD Pipeline Security", author: "Julien Vehent", focus: "Automating SAST, DAST, secret scanning with GitGuardian, and software bill of materials (SBOM)." },
      { title: "Terraform Infrastructure as Code Security", author: "Yevgeniy Brikman", focus: "Scanning HCL code with tfsec and Checkov to catch misconfigurations before deployment." },
      { title: "Cloud Threat Detection & GuardDuty Mastery", author: "Cloud Defense Lab", focus: "Detecting crypto-mining EC2 instances, unauthorized IAM role assumptions, and API anomalies." },
      { title: "Google Cloud Platform (GCP) Defense Guide", author: "Miles Ward", focus: "VPC Service Controls, Cloud IAM least privilege, and Security Command Center." },
      { title: "Serverless Security: Lambda & Cloud Functions", author: "Yan Cui", focus: "Scoping IAM roles per function, cold-start security, and avoiding bloated dependencies." },
      { title: "Cloud Penetration Testing Fundamentals", author: "Chris Farris", focus: "Enumerating cloud assets, metadata service SSRF, and auditing IAM permissions." }
    ]
  },
  {
    name: 'Digital Forensics & Incident Response',
    key: 'forensics',
    accent: '#ec4899',
    books: [
      { title: "The Art of Memory Forensics: Volatility Guide", author: "Michael Hale Ligh", focus: "Extracting RAM dumps, finding hidden processes, scanning network sockets, and unpacking DLLs." },
      { title: "Windows Forensics: Investigating Cyber Crime", author: "Harlan Carvey", focus: "Registry hives, Prefetch files, Shimcache, Amcache, and LNK shortcut file artifacts." },
      { title: "Incident Response in Practice: Real-World Cases", author: "Jason T. Luttgens", focus: "Ransomware negotiations, tracking threat actor lateral movement, and restoring operations." },
      { title: "Disk Forensics & Evidence Preservation", author: "Brian Carrier", focus: "Bit-stream imaging with dd/FTK Imager, write blockers, and verifying SHA-256 hashes." },
      { title: "Network Forensics: Tracking Hackers on the Wire", author: "Sherri Davidoff", focus: "Reconstructing file transfers from PCAPs, TLS decryption with pre-master secrets, and DNS logs." },
      { title: "Email Forensics & Header Investigation", author: "Digital Crime Unit", focus: "Analyzing RFC 5322 headers, Received hops, SPF/DKIM verification, and tracking origin IP." },
      { title: "Linux Forensics & Rootkit Investigation", author: "Philip Polstra", focus: "Checking /proc filesystem, crontabs, auditd logs, and detecting LD_PRELOAD user-space rootkits." },
      { title: "Browser History & Web Cache Forensics", author: "Forensics Research Team", focus: "Extracting SQLite history databases from Chrome/Firefox, cache reconstruction, and cookies." },
      { title: "Mobile Device Forensics: Android & iOS", author: "Andrew Hoog", focus: "ADB debugging, backup extraction, encrypted storage, and analyzing messaging apps." },
      { title: "Chain of Custody & Legal Evidence Handling", author: "Cyber Law Institute", focus: "Admissibility in court, evidence locker protocols, and writing forensic expert witness reports." }
    ]
  },
  {
    name: 'Python & Scripting for Hackers',
    key: 'python-scripting',
    accent: '#eab308',
    books: [
      { title: "Black Hat Python: Python for Hackers & Pentesters", author: "Justin Seitz", focus: "Building raw socket sniffers, web scrapers, trojans, and automated vulnerability scanners." },
      { title: "Automate the Boring Stuff with Python for Security", author: "Al Sweigart", focus: "Writing automation scripts, parsing CSV/JSON logs, and sending automated alerts via Telegram/Discord." },
      { title: "Violent Python: A Cookbook for Hackers", author: "TJ O'Connor", focus: "Forensic analysis scripts, zip password cracking, port scanning with Scapy, and geolocation." },
      { title: "Bash Scripting for Cybersecurity Specialists", author: "Carl Albing", focus: "Writing bash automation, cron monitoring jobs, regex parsing, and log rotation scripts." },
      { title: "PowerShell for Cyber Defenders & Attackers", author: "Lee Holmes", focus: "Active Directory cmdlets, WMI queries, script block logging, and remote administration." },
      { title: "Scapy Packet Crafting & Network Manipulation", author: "Philippe Biondi", focus: "Creating custom TCP/UDP packets, ARP spoofing scripts, and ICMP ping sweeps." },
      { title: "Python for Threat Intelligence & OSINT", author: "OSINT Combine", focus: "Automating Shodan queries, scraping threat feeds, and parsing VirusTotal API responses." },
      { title: "Security Automation with Python & REST APIs", author: "DevOps Security Guild", focus: "Triggering firewall rules automatically when an alert fires in the SIEM." },
      { title: "Building a Python Port Scanner from Scratch", author: "Cyber Code Lab", focus: "Understanding socket programming, multithreading, and timeout handling in Python." },
      { title: "Log Parsing & Regex Mastery in Python", author: "Data Security Team", focus: "Using re module, pandas, and regex to extract IP addresses, emails, and failed logins." }
    ]
  },
  {
    name: 'Cryptography & Data Privacy',
    key: 'cryptography',
    accent: '#a855f7',
    books: [
      { title: "Practical Cryptography for Developers", author: "Svetlin Nakov", focus: "Symmetric vs asymmetric keys, AES-256, RSA, ECC, and digital signatures explained simply." },
      { title: "Understanding Cryptography: A Textbook", author: "Christof Paar & Jan Pelzl", focus: "Block ciphers, stream ciphers, Diffie-Hellman key exchange, and public-key infrastructure." },
      { title: "Hashing & Password Cracking Mechanics", author: "Hashcat Development Team", focus: "MD5, SHA-256, bcrypt, PBKDF2, salt, rainbow tables, and GPU password cracking." },
      { title: "TLS/SSL & HTTPS Architecture Handbook", author: "Ivan Ristić", focus: "TLS 1.3 handshake, cipher suites, certificate authorities, and Let's Encrypt automated SSL." },
      { title: "Post-Quantum Cryptography Fundamentals", author: "NIST Quantum Team", focus: "Lattice-based cryptography, CRYSTALS-Kyber, and preparing for the quantum computing era." },
      { title: "End-to-End Encryption (E2EE) Protocols", author: "Signal Foundation Engineers", focus: "Double Ratchet algorithm, forward secrecy, and protecting private instant messages." },
      { title: "Public Key Infrastructure (PKI) in Practice", author: "Carlisle Adams", focus: "Root CAs, intermediate CAs, Certificate Revocation Lists (CRL), and OCSP stapling." },
      { title: "Data Privacy & GDPR Security Engineering", author: "Privacy By Design Team", focus: "Data anonymization, pseudonymization, right to be forgotten, and secure data deletion." }
    ]
  },
  {
    name: 'Malware Analysis & Reverse Engineering',
    key: 'malware-analysis',
    accent: '#ef4444',
    books: [
      { title: "Practical Malware Analysis: Hands-On Guide", author: "Michael Sikorski & Andrew Honig", focus: "Static analysis, dynamic sandboxing, unpacking packed malware, and Ghidra disassembly." },
      { title: "Ghidra Software Reverse Engineering Field Guide", author: "Chris Eagle", focus: "Decompiling binaries, analyzing x86/x64 assembly, renaming variables, and finding bugs." },
      { title: "Ransomware Anatomy & Decryption Mechanics", author: "Fabian Wosar", focus: "How ransomware generates encryption keys, deletes shadow copies, and persistence mechanisms." },
      { title: "Rootkits & Bootkits: Subverting the OS Kernel", author: "Alex Matrosov", focus: "UEFI firmware implants, kernel hook patching, and hardware secure boot verification." },
      { title: "Dynamic Malware Analysis in Sandbox Labs", author: "Cuckoo Sandbox Team", focus: "Setting up isolated virtual machines, monitoring file writes, registry edits, and DNS queries." },
      { title: "YARA Rules: Pattern Matching for Malware", author: "Victor Alvarez", focus: "Writing YARA signatures, matching strings, hex patterns, and PE header attributes." },
      { title: "Memory Injection Techniques & Process Hollowing", author: "Red/Blue Research", focus: "DLL injection, reflective loading, process doppelganging, and detection heuristics." },
      { title: "Android Malware Analysis & APK Decompilation", author: "Mobile Security Lab", focus: "Using jadx, analyzing AndroidManifest.xml, and uncovering malicious SMS permissions." },
      { title: "Windows API Hooking & Evasion Techniques", author: "Adversary Simulation Lab", focus: "Direct system calls, unhooking ntdll.dll, and bypassing AV/EDR userland hooks." }
    ]
  }
];

let bookIndex = 1;
const allBooks = [];

CATEGORIES.forEach(cat => {
  cat.books.forEach(b => {
    const id = `book-${cat.key}-${String(bookIndex).padStart(3, '0')}`;
    const cleanNum = bookIndex;
    bookIndex++;

    const summaryEn = `Comprehensive, easy-to-read guide on ${b.title.toLowerCase()}. Focuses on ${b.focus} Written in simple, plain language so anyone from beginners to professionals can understand and apply cybersecurity techniques.`;
    const summaryHi = `Ye kitab bilkul aasan bhasha me samjhati hai: ${b.focus} Isme har concept ko real-life examples aur practical commands ke sath clear kiya gaya hai taaki koi bhi bina kisi pareshani ke cyber security seekh sake.`;

    const chapters = [
      {
        number: 1,
        title: `Introduction & Fundamental Concepts`,
        content: `### Chapter 1: Introduction & Fundamental Concepts\n\n` +
          `#### 1.1 In Simple Words (Aasan Bhasha Me)\n` +
          `Welcome to **${b.title}**. The core goal of this topic is simple: **understand how computers communicate, where the weaknesses lie, and how you can defend them**.\n\n` +
          `**Everyday Analogy:** Think of cybersecurity like securing a modern home. You have front doors (open ports), locks (passwords and encryption), security cameras (SOC monitoring and logging), and security guards (firewalls). If you leave a window unlocked (misconfiguration), an intruder can enter without breaking the front door.\n\n` +
          `#### 1.2 Core Pillars & Key Concepts\n` +
          `- **Confidentiality:** Only authorized people can read the data.\n` +
          `- **Integrity:** The data cannot be tampered with or secretly changed.\n` +
          `- **Availability:** Systems must be up and working when legitimate users need them.\n\n` +
          `#### 1.3 Quick Verification Command\n` +
          `\`\`\`powershell\n` +
          `# Check active listening network ports on your system\n` +
          `netstat -ano | findstr LISTENING\n` +
          `\`\`\`\n\n` +
          `#### 1.4 Chapter 1 Summary & Key Takeaways\n` +
          `- Never assume a system is safe just because it is not public.\n` +
          `- Always check default settings and change factory passwords.\n` +
          `- Simplicity is security: close any service or port you do not actively need.`
      },
      {
        number: 2,
        title: `Architecture, Protocols & How It Works`,
        content: `### Chapter 2: Architecture, Protocols & How It Works\n\n` +
          `#### 2.1 Step-by-Step Architecture\n` +
          `Here is how the systems in **${b.title}** interact in the real world:\n\n` +
          `\`\`\`\n` +
          `[User / Device] ---> (Encrypted Gateway / Firewall) ---> [Internal Server]\n` +
          `       |                                                      |\n` +
          `       v                                                      v\n` +
          `[Local Logs Saved]                                  [Central SIEM Monitor]\n` +
          `\`\`\`\n\n` +
          `#### 2.2 Deep Dive: What Happens Under the Hood\n` +
          `When a connection is initiated:\n` +
          `1. **Request:** The client device transmits a SYN packet requesting access to a specific port.\n` +
          `2. **Inspection:** The firewall checks whether the traffic matches established policy rules.\n` +
          `3. **Handshake:** If permitted, a secure session token is negotiated with cryptographic signatures.\n` +
          `4. **Telemetry:** Every packet timestamp, source IP, and destination port is written to the audit log.\n\n` +
          `#### 2.3 Practical Command Example\n` +
          `\`\`\`powershell\n` +
          `# Test connectivity and view network route latency\n` +
          `Test-NetConnection -ComputerName 8.8.8.8 -Port 53\n` +
          `\`\`\`\n\n` +
          `#### 2.4 Golden Rule for Defenders\n` +
          `*Always verify who is connecting before granting access, and limit that access strictly to what is needed (Principle of Least Privilege).*`
      },
      {
        number: 3,
        title: `Common Attacks, Risks & Exploitation Techniques`,
        content: `### Chapter 3: Common Attacks, Risks & Exploitation Techniques\n\n` +
          `#### 3.1 How Attackers Exploit This Vector\n` +
          `In the context of **${b.title}**, threat actors typically look for three common mistakes:\n\n` +
          `1. **Weak Credentials or Default Passwords:** Trying passwords like \`admin123\` or brute-forcing accounts.\n` +
          `2. **Unpatched Software Vulnerabilities:** Exploiting old software versions where security patches were never applied.\n` +
          `3. **Missing Validation / Injection:** Feeding malicious input that tricks the server into executing arbitrary commands.\n\n` +
          `#### 3.2 Real-World Incident Case Study\n` +
          `- **The Attack:** Attackers discovered an exposed management interface on an internet-facing server.\n` +
          `- **The Result:** Within 48 hours, automated bots scanned the port, guessed the credentials, and deployed ransomware.\n` +
          `- **The Defense Lesson:** Never expose administrative management ports directly to the public internet. Use a VPN, MFA, or IP whitelisting.\n\n` +
          `#### 3.3 Diagnostic Detection Syntax\n` +
          `\`\`\`powershell\n` +
          `# Inspect failed logon attempts (Event ID 4625)\n` +
          `Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625} -MaxEvents 5\n` +
          `\`\`\``
      },
      {
        number: 4,
        title: `Defensive Hardening, Best Practices & Field Checklist`,
        content: `### Chapter 4: Defensive Hardening, Best Practices & Field Checklist\n\n` +
          `#### 4.1 Practical Step-by-Step Defense Guide\n` +
          `To protect systems against the threats discussed in this book, implement these 4 layers:\n\n` +
          `1. **Enable Multi-Factor Authentication (MFA):** Even if an attacker steals a password, MFA stops them.\n` +
          `2. **Automate Security Updates:** Apply critical security patches within 72 hours of release.\n` +
          `3. **Segment the Network:** Separate guest Wi-Fi, office computers, and critical databases into isolated subnets.\n` +
          `4. **Immutable Offline Backups:** Keep copies of critical data disconnected from the network so ransomware cannot erase them.\n\n` +
          `#### 4.2 Security Administrator Checklist\n` +
          `- [x] Baseline configuration documented and verified.\n` +
          `- [x] Unneeded services, default accounts, and demo files removed.\n` +
          `- [x] Centralized logging enabled and forwarded to a secure server.\n` +
          `- [x] Incident response contact numbers updated and tested quarterly.\n\n` +
          `#### 4.3 Summary (Aasan Saar)\n` +
          `Cyber security is not about buying expensive software; it is about building disciplined daily habits. Follow basic hygiene, keep systems updated, and monitor logs regularly.`
      }
    ];

    allBooks.push({
      id,
      title: b.title,
      author: b.author,
      category: cat.name,
      year: "2024 Edition",
      classification: "OPEN TRAINING / EDUCATIONAL USE",
      coverGradient: "from-sky-950 to-slate-900",
      accentColor: cat.accent,
      summary: summaryEn,
      summary_hi: summaryHi,
      chapters
    });
  });
});

console.log(`Generated total books: ${allBooks.length}`);

const fileContent = `// CYBER DEFENSE ACADEMY - Comprehensive Technical Library
// Over 100 Practical Books & Guides with Simple Language & Bilingual Explanations

export const BOOKS_DATA = ${JSON.stringify(allBooks, null, 2)};
`;

const targetPath = path.join(__dirname, 'src', 'data', 'booksData.js');
fs.writeFileSync(targetPath, fileContent, 'utf8');
console.log(`Successfully written ${allBooks.length} books to ${targetPath}!`);
