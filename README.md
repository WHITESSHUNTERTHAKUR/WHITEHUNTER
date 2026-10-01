# ⚓ SAMUDRA KAVACH (समुद्र कवच) — DESKTOP APPLICATION GUIDE

Developed for: **AIW Course (2026)**  
Version: **v19.3 — Secure Documents + Security Health Check**  
Motto: **॥ शं नो वरुणः ॥** *(May the Lord of the Oceans be auspicious unto us)*

---

## 📁 Installation & Document Paths
All application files, documents, and build artifacts have been compiled and saved directly into:
`
D:\THAKUR AIW\MY PROJECTS\SAMUNDRA KAWACH\
`

### Key Files in this Directory:
1. **SAMUDRA_KAVACH.exe** (33 MB)
   - The standalone Windows Desktop Application.
   - Run this directly with a double-click. No Python or dependencies required on any Windows PC.
2. **SAMUDRA_KAVACH.lnk**
   - Windows desktop application shortcut with the custom Indian Navy application icon.
   - A copy has also been placed directly on your **Windows Desktop** (Desktop\SAMUDRA KAVACH.lnk).
3. **SAMUDRA_KAVACH.ico**
   - The official application icon embedded in the executable and shortcuts.
4. **SAMUDRA_KAVACH.py**
   - Clean, updated, and ready-to-run Python source code file.
5. **Saved_Documents\**
   - Dedicated folder where all your exported security reports, health check PDFs, backups, and passwords will be saved by default.
6. **Application File\SAMUNDRA_KAVACH_.py** & **__pycache__\SAMUNDRA_KAVACH_.py**
   - Synchronized and updated source files.

---

## 🚀 How to Run the Desktop App
1. **Direct Executable**: Double-click on D:\THAKUR AIW\MY PROJECTS\SAMUNDRA KAWACH\SAMUDRA_KAVACH.exe.
2. **Desktop Shortcut**: Double-click on SAMUDRA KAVACH on your Windows Desktop.
3. **From Python**: Run python SAMUNDRA_KAVACH.py in this folder.

---

## 🛡 Features & Included Modules
1. **Interactive Indian Navy Tri-Service Command Center (Dashboard)**
   - Live telemetry (CPU, RAM, Disk, Sockets, Session Uptime).
   - Surface Fleet, Naval Aviation, and Sub-Surface Arm displays.
   - Dynamic real-time security posture scoring (0-100).
   - Quick launch action buttons.
2. **Analyzer & Generator**
   - Real-time entropy, character variety, dictionary check, and pattern analysis.
   - Cryptographically secure 20-64 char password generator using Python's secrets engine.
   - HIBP k-anonymity breach detection (only first 5 chars of SHA-1 hash transmitted over HTTPS).
3. **Local Encrypted Vault**
   - Protected by PBKDF2-HMAC-SHA256 (390,000 iterations) and Fernet authenticated encryption.
   - Separate master password protection.
   - Encrypted backup (.csgv) and restore.
4. **Secure Documents**
   - Categorize by Subjects and nested Folders.
   - Import individual files or full directory trees with hierarchy preserved.
   - Each file encrypted with its own unique random 256-bit key.
   - Encrypted backup package (.csdb) and restore.
5. **Security Health Check (Offline / Local)**
   - Complete PC, Windows, RAM/Storage, Defender, Firewall, and UAC audit.
   - Export to PDF (ReportLab / built-in vector fallback) directly saved in this directory.
   - Direct Print functionality.
6. **Password Expiry & 90-Day Rotation Policy**
   - Audit trail for Individual login, Vault master password, and Secure Documents password.
7. **Role-Based Authentication & Admin Console**
   - Administrator vs. Individual accounts.
   - 3-Question Security Question recovery system.
   - 6-digit TOTP-based reset authority.

---

## 🔒 Default Document Save Locations
When you click **Save PDF**, **Export Report**, **Backup Vault**, or **Backup Secure Documents**, the file dialog now opens directly inside:
`
D:\THAKUR AIW\MY PROJECTS\SAMUNDRA KAWACH\
`
or into Saved_Documents\.

---
*Developed by AIW Course (2026)*
