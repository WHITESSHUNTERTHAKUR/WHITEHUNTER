# CYBER WARRIORS LEARNING ACADEMY (CyberOps Defense Trainer)

[![Platform: Windows](https://img.shields.io/badge/Platform-Windows%2010%20%7C%2011-blue.svg)](https://microsoft.com/windows)
[![Tech: Electron & Vite](https://img.shields.io/badge/Tech-Electron%20%2B%20Vite%20%2B%20JS-brightgreen.svg)](https://electronjs.org/)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)]()
[![Status: Production Ready](https://img.shields.io/badge/Status-v2.5%20Stable-emerald.svg)]()

> **Tactical Cyber Security, Ethical Hacking, Networking & Defense Operations Training Suite for Windows.**

---

## 🛡️ Overview

**Cyber Warriors Learning Academy** is an all-in-one cyber security defense simulator, training suite, and operational war room. Designed for students, security analysts, and defense personnel, it combines hands-on forensic ranges, textbooks, verified video intelligence, live threat monitoring, and security calculators into a single desktop application.

---

## ⚡ Core Features & Capabilities

### 1. 🎯 Cyber Defense Range (105 Practical Labs)
- **105 Full Practical Labs** covering 8 key operational domains:
  - *Network Forensics & Wireshark* (SYN floods, DNS tunneling, BGP leaks, ARP poisoning)
  - *Windows Security & Sysmon* (LSASS dumping, unquoted service paths, Kerberoasting)
  - *Linux Hardening & Forensics* (SUID escalation, auditd, Dirty Pipe, PAM security)
  - *Web & OWASP Top 10* (SQLi, XSS, SSRF, JWT bypass, XXE, Deserialization)
  - *SOC & SIEM Triage* (Splunk SPL, Elastic KQL, BEC fraud, Sigma rules)
  - *Incident Response & Malware Forensics* (Volatility memory triage, Prefetch, MFT)
  - *Cloud Security & IAM Defense* (S3 policies, CloudTrail, AWS/Azure/GCP misconfigs)
  - *Cryptography & Protocols* (Hashcat masks, AES-GCM, Diffie-Hellman, post-quantum)
- **6 Tasks/Questions per Lab** (630 total tactical objectives).
- Includes live telemetry streams, instant keyword validation, step-by-step hints, solution auto-fills, and XP tracking.

### 2. 📡 Live News / Update Feed
- Multi-domain breaking security bulletins:
  - 🚨 **Cyber Crime & Threats** (Zero-days, ransomware disclosures, CISA KEV alerts)
  - 💻 **IT & Software Tech** (Enterprise cloud, software architecture, open source)
  - 🌐 **Networking & Infrastructure** (BGP leaks, Anycast DNS, DDoS trends, routing)
  - 🖥️ **General Computer & Hardware** (UEFI/BIOS bootkits, Windows 11 HVCI, DDR5 Rowhammer)
  - 🇮🇳 **India & CERT-In** (Official national alerts and defense directives)
- **Live Internet Refresh:** Click **"↻ Refresh Latest News"** to poll real-time online RSS feeds.
- **Direct Official Links:** Click any news card or "Official Website ↗" to launch the original advisory in your default browser.

### 3. 📚 Technical Library (201 Full-Length Books)
- **201 Structured Security Textbooks** across 10 specialized categories.
- **6 In-Depth Chapters per Book** (1,206 comprehensive chapters).
- Integrated Text-to-Speech audio reader, search filters, and domain tagging.

### 4. 🎥 Learning Videos & Official Documentation
- **100% Verified YouTube Lectures** (200 OK verified via official API).
- Borderless In-App Theater Mode with zero playback distractions.
- "Open on YouTube ↗" direct launch for unrestricted playback.

### 5. 🧰 Security Toolkit (7 Utilities)
1. **Subnet / VLSM Calculator:** CIDR masks, network/broadcast IPs, usable host counts.
2. **High-Risk Ports Directory:** TCP/UDP port numbers, risk levels, associated exploits.
3. **Crypto & Hash Studio:** Live MD5, SHA-1, SHA-256, SHA-512 calculation and text hashing.
4. **Threat IOC Defanger / Refanger:** Converts malicious URLs, domains, and IPs to safe format (`hxxp[:]//`).
5. **Firewall Rule Generator:** Multi-platform syntax generator (iptables, UFW, Windows Defender, Cisco ACL, Snort).
6. **Password Entropy & GPU Cracking Estimator:** Real-time bit strength and brute-force time calculations.
7. **CVSS v3.1 Base Score Calculator:** Dynamic vector string generation and score assessment.

### 6. 📖 Help Center & Cyber Dictionary
- Complete navigation and operational guide.
- Categorized FAQs with Hinglish & Simple English answers.
- A-Z Cyber Security terminology dictionary.

### 7. 🌐 Dual Language & Dark/Light Mode
- **Bilingual Interface:** One-click toggle between Simple English and 🇮🇳 Hinglish.
- **Theme Switcher:** High-contrast tactical Dark Mode and crisp Light Mode.

---

## 🚀 Installation & Running

### Prerequisites
- Windows 10 or 11 (64-bit)
- Node.js (v18 or higher recommended)
- Git

### Quick Start (Development Mode)
```bash
# Clone the repository
git clone https://github.com/WHITESSHUNTERTHAKUR/WHITEHUNTER.git
cd WHITEHUNTER

# Install dependencies
npm install

# Run Vite dev server
npm run dev
```

### Run Native Desktop Application
```bash
# Launch via Electron
npm start
```

### Production Build & Installer
```bash
# Build Vite production bundle
npm run build

# Package Windows NSIS installer
npm run dist

# Install to existing local desktop installation
node install_to_existing_app.js
```

---

## 📁 Repository Structure

```
├── DOCUMENTATION_UPDATED_APPLICATION.md  # Complete Master Technical Documentation
├── Desktop-Launcher.bat                  # Instant Desktop Application Launcher
├── Launch-CyberOps.bat                   # Development Environment Launcher
├── electron.cjs                          # Electron main process & IPC handlers
├── preload.cjs                           # Secure desktop context bridge
├── install_to_existing_app.js            # Automated asar packager & desktop installer
├── package.json                          # Project configuration & build scripts
├── vite.config.js                        # Vite build configuration
├── index.html                            # Master single-page application entry point
├── src/
│   ├── main.js                           # Master application router & event bus
│   ├── modules/                          # Feature modules
│   │   ├── tacticalLabs.js               # 105 Practical Cyber Defense Labs
│   │   ├── threatNews.js                 # Live Multi-Domain News / Update Engine
│   │   ├── bookshelf.js                  # 201 Technical Books Library
│   │   ├── learningVideos.js             # Verified Video Lessons & Theater Player
│   │   ├── tools.js                      # 7 Security Utilities & Calculators
│   │   ├── learnCommands.js              # 150+ Interactive Command Reference
│   │   ├── readMagazine.js               # 50+ Printable Cyber Magazines & Dossiers
│   │   ├── curriculumGrid.js             # 52 Core Curriculum Topics
│   │   └── helpCenter.js                 # User Guide, FAQs & Cyber Dictionary
│   ├── data/                             # Curated Datasets
│   │   ├── tacticalLabsData.js           # 105 Forensic Labs with 6 Tasks Each
│   │   ├── newsData.js                   # Multi-Domain Security Advisories
│   │   ├── booksData.js                  # 201 Complete Textbooks (1,206 Chapters)
│   │   ├── learningVideosData.js         # Verified Video Lesson Catalog
│   │   ├── commandsData.js               # Terminal Commands Dataset
│   │   └── magazinesData.js              # PDF & Dossier Publications
│   ├── styles/                           # Core Design System & Theme Styles
│   └── utils/                            # Navigation, Storage & i18n
```

---

## 📄 Complete Master Documentation

For the full detailed breakdown of all lab scenarios, textbook chapters, video sources, and security utilities, see:
👉 [DOCUMENTATION_UPDATED_APPLICATION.md](DOCUMENTATION_UPDATED_APPLICATION.md)

---

## 🔒 Security & Privacy

All telemetry and laboratory challenges run in simulated sandboxed environments. External link launches are routed securely through the operating system's default browser via `shell.openExternal`. No student data or telemetry is transmitted to third-party tracking services.

---

**Developed for Cyber Warriors Academy & Defense Operations.**
