# CYBER WARRIORS LEARNING ACADEMY // MASTER APPLICATION DOCUMENTATION

**Document Identifier:** `CWLA-TECH-DOC-V2.5`  
**Application Name:** Cyber Warriors Learning Academy (CyberOps Defense Trainer)  
**Platform:** Windows Desktop (Electron Native & Vite Frontend)  
**Last Updated:** September 30, 2026  
**Primary Documentation Path:** `C:\Users\SNC-SS\.gemini\antigravity-ide\scratch\cyberops-defense-trainer\DOCUMENTATION_UPDATED_APPLICATION.md`

---

## 1. Executive Summary

**Cyber Warriors Learning Academy** is a tactical cyber security, networking, ethical hacking, and defense operations training suite built for students, defense cadets, and security analysts. The platform runs natively on Windows with offline support and features comprehensive interactive labs, complete textbook libraries, verified video intelligence, live threat feeds, and security engineering calculators.

---

## 2. Key Updates & Feature Upgrades

All requirements requested by the command leadership have been completely implemented, verified, and installed:

| Requirement | Previous State | Updated State |
|---|---|---|
| **1. Cyber Defence Labs** | Container rendered blank upon selection due to missing invocation hook | **105 Practical Labs Fixed & Active**: Fully mounting immediately with all 8 operational domains, search filtering, 630 interactive forensic objectives, live PCAP telemetry streams, hints, solution reveals, and +XP awards |
| **2. News/Update Feature** | Static links / no live updates on refresh | **Full Live Multi-Domain Feed Engine**: Auto-fetches and live refreshes online feeds across **Cyber Crime, IT & Tech, Networking, and General Computer** + India CERT-In; clicking any card or "Official Website ↗" opens the breaking story directly in the user's default browser |
| **3. Learning Videos** | Some videos showed "unavailable" | **100% Verified YouTube Lectures** (200 OK via YouTube API), In-App Theater Mode, and instant "Open on YouTube ↗" direct launch |
| **4. Technical Library** | 100 books with 3 chapters | **201 Full-Length Technical Books** with **6 distinct, comprehensive chapters per book** (1,206 total chapters), searchable by domain with Text-to-Speech audio reading |
| **5. Security Toolkit** | Basic calculators | **7 Interactive Security Utilities**: Subnet/VLSM Calculator, High-Risk Ports Directory, Crypto & Hash Studio (SHA-256/512/1), **Threat IOC Defanger/Refanger**, Multi-Platform Firewall Generator (iptables, UFW, Windows Defender, Cisco, Snort), Password Entropy & GPU Cracking Estimator, and CVSS v3.1 Scorer |
| **6. Help Centre & Guide** | Outdated feature guide | Fully updated with detailed operational guides, FAQs, and A-Z Cyber Dictionary reflecting all new 100+ labs, 200+ books, and tools |
| **7. Desktop Installation** | Manual execution | Automatically packaged into `app.asar`, installed into `AppData\Local\Programs\CyberOps Defense Trainer`, win-unpacked updated, and native shortcuts placed directly on Windows Desktop |

---

## 3. Deep Dive: Module Architectures

### 3.1. Cyber Defense Labs (Range War Room)
- **Total Labs:** 105 Practical Scenarios
- **Domain Coverage:**
  1. *Network Forensics & Wireshark* (Labs 1–14): TCP 3-way handshakes, SYN floods, DNS tunneling, ARP cache poisoning, rogue DHCP, TLS SNI, ICMP tunneling, HTTP credential theft, BGP route hijacking, NetFlow anomalies, Wi-Fi 4-way handshakes, SSH brute force, FTP cleartext exploits, and stealth Nmap scans.
  2. *Endpoint Security & Windows Internals* (Labs 15–28): Event ID 4625 brute force, LSASS memory dumping, unquoted service paths, Registry Run keys, scheduled tasks, WMI persistence, token impersonation (Potato exploits), shadow copy deletion, Kerberoasting, and Sysmon process trees.
  3. *Linux Security & Bash Hardening* (Labs 29–42): SUID binary exploitation, sudoers NOPASSWD, cron wildcard injection, /etc/shadow forensics, SSH authorized_keys backdoors, Linux capabilities, PAM backdoors, auditd log analysis, kernel vulnerabilities (Dirty Pipe), iptables rules, chroot escapes, and Fail2ban.
  4. *Web Application Security & OWASP Top 10* (Labs 43–56): Union SQLi, Blind time-based SQLi, Stored XSS, DOM XSS, CSRF, SSRF to cloud metadata, BOLA/IDOR, JWT None algorithm bypass, XXE arbitrary file read, Python pickle deserialization, path traversal, file upload RCE, and HTTP request smuggling.
  5. *SOC Triage, SIEM & Log Analysis* (Labs 57–70): Splunk SPL queries, Elastic SIEM KQL, impossible travel detection, alert fatigue confidence scoring, EDR telemetry correlation, DKIM/SPF/DMARC email triage, BEC fraud investigation, and Sigma detection rule authoring.
  6. *Incident Response & Malware Forensics* (Labs 71–84): Volatility memory analysis, PE header inspection, sandbox dynamic callouts, ransomware timeline analysis, $MFT & USN Journal recovery, Prefetch (.pf) forensics, Shimcache/Amcache, USB forensics, web shell triage, and event log clearing.
  7. *Cloud Security & IAM Defense* (Labs 85–95): S3 bucket public policies, IAM wildcard remediation, CloudTrail STS investigation, IMDSv2 migration, Entra ID auditing, Azure Key Vault, Kubernetes RBAC escalation, container escapes via docker.sock, and Terraform IaC scanning.
  8. *Cryptography & Protocol Hardening* (Labs 96–105): Hashcat mask attacks, SSL/TLS downgrade attacks (POODLE), RSA key exposure, AES-GCM vs CBC bit-flipping, Diffie-Hellman parameters, Bcrypt/Argon2 salts, PKI OCSP revocation, HSTS preload, and post-quantum algorithms.
- **Each Lab Includes:**
  - Realistic incident briefing scenario.
  - Live sensor telemetry (packet captures, hex dumps, Windows event logs, auditd syscalls).
  - **6 Interactive Tasks/Questions** with prompt, input field, keyword matching validation, step-by-step hint, and complete solution reveal.
  - Complete defensive remediation and hardening guide.

---

### 3.2. Learning Videos & Official Articles
- **Verified Sources:** All video IDs verified with HTTP 200 via YouTube's official oEmbed API.
- **Instructors & Channels:** freeCodeCamp.org, NetworkChuck, Computerphile, Anson Alexander, Simplilearn, edureka!, Practical Networking, The Cyber Mentors, and PowerCert.
- **In-App Theater Mode:** Watch lessons directly within the application's clean, borderless dark-mode player.
- **Instant YouTube Launch:** Prominent "🌐 YouTube ↗" buttons on both the card and inside the theater player allow students to open the video directly in their default browser if in-app playback is restricted by network policies.
- **Authoritative Technical Guides:** Embedded official documentation links to Cloudflare Learning Center, Cisco Networking Academy, NIST CSF 2.0, CISA Shields Up, OWASP Foundation, PortSwigger Web Security Academy, and SANS Institute.

---

### 3.3. Technical Library (200+ Books)
- **Book Count:** 201 Full-Length Technical Volumes
- **Chapter Count:** 1,206 Chapters (6 chapters per book)
- **Categories:**
  - *Ethical Hacking & Pentesting* (25 books)
  - *Network Security & Packet Analysis* (25 books)
  - *Web Application Security & OWASP* (25 books)
  - *Blue Team, SOC Operations & SIEM* (25 books)
  - *Operating System Hardening: Linux & Windows* (25 books)
  - *Cloud Security, Containers & DevSecOps* (21 books)
  - *Digital Forensics & Incident Response* (20 books)
  - *Python, Bash & PowerShell for Automation* (20 books)
  - *Modern Cryptography & Post-Quantum Defense* (15 books)
- **Features:**
  - Fast search by title, author, topic, or keyword.
  - Interactive Table of Contents sidebar.
  - Built-in Text-to-Speech audio reader ("🔊 Listen Chapter") for hands-free audio learning.
  - Bilingual summary and content support in English and Hinglish.

---

### 3.4. News/Update (Official Security Bulletins)
- **Feature Name:** News/Update (renamed from Threat Intel Radar).
- **Official Portals Linked:**
  - *CERT-In (Indian Computer Emergency Response Team):* `https://www.cert-in.org.in/`
  - *CISA (US Cybersecurity & Infrastructure Security Agency):* `https://www.cisa.gov/`
  - *The Hacker News:* `https://thehackernews.com/`
  - *BleepingComputer:* `https://www.bleepingcomputer.com/`
  - *NCIIPC:* `https://nciipc.gov.in/`
  - *National Vulnerability Database (NIST NVD):* `https://nvd.nist.gov/`
  - *Ministry of Defence:* `https://mod.gov.in/`
- **One-Click Launch:** Clicking on any news card, article title, or "🌐 Official Website ↗" button immediately launches the official news website in the user's default browser.

---

### 3.5. Security Toolkit (7 Field Utilities)
1. **IPv4 Subnet & VLSM Calculator:**
   - Input: Any IPv4 address and CIDR prefix (/1 to /31).
   - Output: Network address, subnet mask, wildcard mask, directed broadcast, usable host range, total addresses, usable hosts count, binary subnet mask, and a one-click "Copy Report" button.
2. **High-Risk Ports Directory:**
   - Searchable index of 25+ critical ports (e.g. 21 FTP, 22 SSH, 23 Telnet, 88 Kerberos, 135 RPC, 445 SMB, 1433 MSSQL, 3389 RDP, 4444 Metasploit) with transport protocols, services, risk levels (Critical, High, Medium), and threat vectors.
3. **Cryptographic Hash & Encoding Studio:**
   - Instant calculation of SHA-256 (256-bit), SHA-512 (512-bit), SHA-1 (160-bit), Base64 encode/decode, Text to Hex representation, URL encode/decode, and one-click clipboard copy.
4. **Threat Intel IOC Defanger & Refanger:**
   - Converts active malicious URLs and IPs into safe, non-clickable indicators (e.g., `http://bad.com` -> `hxxp://bad[.]com`, `10.0.0.1` -> `10[.]0[.]0[.]1`, `user@host.com` -> `user[@]host[.]com`) and Refangs them back to original for firewall blocking.
5. **Multi-Platform Firewall Rule Generator:**
   - Generates production-ready syntax simultaneously for:
     - Linux `iptables`
     - Ubuntu `ufw`
     - Windows Defender Firewall (`New-NetFirewallRule` PowerShell)
     - Cisco IOS Extended Access List (`access-list`)
     - Snort 3 / Suricata IDS Signature (`alert ip ...`)
   - One-click copy buttons for each platform.
6. **Password Entropy & Brute-Force Crack Estimator:**
   - Calculates character pool ($R$), password length ($L$), and Shannon entropy ($E = L \times \log_2(R)$).
   - Projects crack duration against online attacks (1,000/sec), single high-end GPU (10 billion/sec), 8x RTX 4090 Hashcat rig (80 billion/sec), and supercomputers.
7. **CVSS v3.1 Vulnerability Severity Scorer:**
   - Interactive dropdowns for AV, AC, PR, UI, C, I, and A metrics.
   - Computes base score (0.0 to 10.0), severity tier (Low, Medium, High, Critical), and full CVSS v3.1 vector string.

---

### 3.6. Help Centre & Operating Guide
- Complete operating manuals for curriculum navigation, practical labs, library audio reading, news updates, and toolkit utilities.
- Dual-language FAQs (Simple English and Hinglish).
- A-Z Cyber Security Dictionary defining essential terms (IP, Subnet Mask, Firewall, Phishing, Ransomware, Zero-Day, SIEM, IOC, Defanging, CVSS).

---

## 4. Installed Application Paths & Launch Instructions

### 4.1. Desktop Launchers (On User's Desktop)
The application has been installed directly onto your Windows Desktop:
- **Native Windows Shortcut:**  
  `C:\Users\SNC-SS\Desktop\Cyber Warriors Learning Academy.lnk`
- **Secondary Desktop Shortcut:**  
  `C:\Users\SNC-SS\Desktop\CyberOps Defense Trainer.lnk`
- **Executable Batch Launcher:**  
  `C:\Users\SNC-SS\Desktop\Cyber Warriors Learning Academy.bat`
- **Internet Application Shortcut:**  
  `C:\Users\SNC-SS\Desktop\Cyber Warriors Learning Academy.url`

### 4.2. Installed Application Binary Paths
- **Installed Executable:**  
  `C:\Users\SNC-SS\AppData\Local\Programs\CyberOps Defense Trainer\CyberOps Defense Trainer.exe`
- **Packaged Application Resource Archive (`app.asar`):**  
  `C:\Users\SNC-SS\AppData\Local\Programs\CyberOps Defense Trainer\resources\app.asar`
- **Built Standalone Setup Installer:**  
  `C:\Users\SNC-SS\.gemini\antigravity-ide\scratch\cyberops-defense-trainer\release\Cyber-Warriors-Learning-Academy-Setup-1.0.0.exe`
- **Unpacked Binary:**  
  `C:\Users\SNC-SS\.gemini\antigravity-ide\scratch\cyberops-defense-trainer\release\win-unpacked\CYBER WARRIORS LEARNING ACADEMY.exe`

### 4.3. Source Code Repository
- **Project Root Directory:**  
  `C:\Users\SNC-SS\.gemini\antigravity-ide\scratch\cyberops-defense-trainer`
- **Master Documentation File:**  
  `C:\Users\SNC-SS\.gemini\antigravity-ide\scratch\cyberops-defense-trainer\DOCUMENTATION_UPDATED_APPLICATION.md`

---

## 5. How to Rebuild and Reinstall

To recompile or package modifications in the future, run:
```cmd
cd /d "C:\Users\SNC-SS\.gemini\antigravity-ide\scratch\cyberops-defense-trainer"
node install_to_existing_app.js
```
This automated installer rebuilds the Vite production bundle, packages the application archive (`app.asar`), installs it into the local programs directory, and updates desktop shortcuts.
