import base64
import io
import hashlib
import hmac
import html
import json
import math
import os
import re
import secrets
import string
import threading
import time
import subprocess
import socket
import platform
import csv
import shutil
import sys
import textwrap
import zipfile
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta
from pathlib import Path
from urllib.parse import parse_qs, quote, unquote, urlparse
import tkinter as tk
from tkinter import filedialog, messagebox

import customtkinter as ctk
import pyperclip
import requests
try:
    import psutil
except Exception:
    psutil = None

try:
    from reportlab.lib.pagesizes import A4
    from reportlab.lib import colors as pdf_colors
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.enums import TA_CENTER
    REPORTLAB_AVAILABLE = True
except Exception:
    REPORTLAB_AVAILABLE = False

# Pillow is used for responsive, aspect-ratio-preserving dashboard rendering.
try:
    from PIL import Image, ImageTk, ImageOps
    PIL_AVAILABLE = True
except Exception:
    PIL_AVAILABLE = False

# Optional dependencies used by advanced features.
try:
    import qrcode
    from PIL import Image
    QR_AVAILABLE = True
except ImportError:
    QR_AVAILABLE = False

try:
    from cryptography.fernet import Fernet, InvalidToken
    from cryptography.hazmat.primitives import hashes
    from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
    CRYPTO_AVAILABLE = True
except ImportError:
    CRYPTO_AVAILABLE = False
    Fernet = None
    InvalidToken = Exception


# ============================================================
# APPLICATION SETTINGS
# ============================================================
APP_NAME = "SAMUDRA KAVACH"
APP_VERSION = "v19.3 — Secure Documents Subject Delete + Updated Help Center"

DEVELOPER = "Developed by AIW Course (2026)"
CLIPBOARD_CLEAR_SECONDS = 30
VAULT_DIR = Path.home() / ".cyber_security_guard"
VAULT_FILE = VAULT_DIR / "vault.csgv"
SETTINGS_FILE = VAULT_DIR / "settings.json"
AUTH_FILE = VAULT_DIR / "auth.json"
USER_DATA_DIR = VAULT_DIR / "users"
AUTH_VERSION = 1

CYAN = "#00B8D9"
BLUE = "#1687D9"
GREEN = "#16A765"
YELLOW = "#E0A800"
RED = "#D64545"
ORANGE = "#E67E22"
PURPLE = "#7C5CFC"

SYMBOLS = "!@#$%^&*()-_=+[]{}?"
COMMON_PASSWORDS = {
    "password", "password123", "password1", "123456", "1234567", "12345678",
    "123456789", "1234567890", "qwerty", "qwerty123", "qwertyuiop", "admin",
    "admin123", "administrator", "letmein", "welcome", "welcome123", "iloveyou",
    "monkey", "dragon", "football", "baseball", "abc123", "111111", "000000",
    "login", "pass", "secret", "changeme", "sunshine", "princess", "master",
}
COMMON_WORDS = {
    "password", "welcome", "admin", "login", "secret", "qwerty", "letmein",
    "football", "baseball", "dragon", "monkey", "computer", "security", "summer",
    "winter", "spring", "autumn", "india", "hello", "love", "freedom", "master",
}
KEYBOARD_PATTERNS = (
    "qwerty", "asdfgh", "zxcvbn", "qwert", "asdf", "zxcv", "12345", "23456",
    "34567", "45678", "56789", "67890", "09876", "98765", "87654", "76543",
)

THEMES = {
    "Dark": {
        "BACKGROUND": "#061522",
        "NAVY": "#08263D",
        "NAVY_LIGHT": "#0D3A5A",
        "CARD": "#0A2032",
        "CARD_DARK": "#071B2A",
        "TEXT": "#F3FAFF",
        "MUTED": "#9BB6C8",
        "ENTRY": "#0D2A40",
        "BORDER": "#1D5A7D",
        "ACCENT": "#3FA9E8",
        "ACCENT2": "#247FB5",
        "ACCENT3": "#69D4FF",
        "GOLD": "#F5C451",
    },
}

LANGUAGES = {
    "English": {
        "dashboard": "Dashboard", "analyzer": "Analyzer & Generator", "vault": "Secure Vault",
        "expiry": "Expiry & Rotation", "twofa": "2FA / OTP",
        "settings": "Settings", "system_protected": "SYSTEM PROTECTED", "system_ready": "System Ready",
        "system_attention": "ATTENTION REQUIRED", "overall_score": "Overall Security Score",
        "excellent": "Excellent", "good": "Good", "fair": "Fair", "critical": "Critical",
        "security_overview": "Security Overview", "recommendations": "Security Recommendations",
        "no_recommendations": "No urgent recommendations. Keep using unique credentials and MFA.",
        "weak_passwords": "Weak Passwords", "breached_passwords": "Breached Passwords",
        "vault_status": "Vault Status", "twofa_status": "2FA Protection", "healthy": "Healthy",
        "locked": "Locked", "unavailable": "Unavailable", "enabled": "Enabled", "disabled": "Disabled",
        "password_prompt": "Enter password to analyze:", "placeholder": "Type your password here...",
        "show": "Show", "hide": "Hide", "password_length": "Password Length",
        "strength_empty": "Strength: Empty", "weak": "Strength: Weak", "medium": "Strength: Medium",
        "strong": "Strength: Strong", "very_strong": "Strength: Very Strong", "score": "Security Score",
        "entropy": "Estimated Entropy", "advanced": "ADVANCED SECURITY ANALYSIS", "length_check": "Password length",
        "upper_check": "Uppercase letters", "lower_check": "Lowercase letters", "number_check": "Numbers",
        "symbol_check": "Symbols", "repeat_check": "Repeated characters", "sequence_check": "Sequential pattern",
        "common_check": "Common password", "pattern_check": "Predictable pattern", "dictionary_check": "Dictionary words",
        "unique_check": "Character uniqueness", "generate": "Generate", "copy": "Copy", "export": "Export",
        "scan": "SCAN FOR BREACHES", "generated": "Secure password generated.",
        "copied": "Password copied. Clipboard clears in 30 seconds.", "clipboard_cleared": "Clipboard automatically cleared.",
        "empty": "Password field is empty.", "enter_first": "Please enter a password first.",
        "scanning": "Scanning breach database...", "breached": "COMPROMISED\n\nThis password appeared in known breach data {} times.\n\nDo not use this password.",
        "safe": "NOT FOUND\n\nThis password was not found in the checked breach dataset.",
        "api_error": "Could not reach the breach database. Please check your internet connection.",
        "recommendation": "Recommendation", "export_warning": "SECURITY WARNING\n\nPlaintext export is unsafe.\n\nUse encrypted vault backup or security reports instead.",
        "cancel": "Cancel", "export_anyway": "Export Anyway", "password_specs": "Password Specs",
        "security_policy": "Security Policy", "vault_title": "Local Encrypted Password Vault",
        "vault_account": "Account / Service Name", "vault_username": "Username / Email", "vault_password": "Password / Secret",
        "vault_url": "Website / URL", "vault_notes": "Secure Notes", "save_vault": "Save to Vault",
        "unlock_vault": "Unlock Vault", "lock_vault": "Lock Vault", "create_vault": "Create Vault",
        "vault_locked_msg": "Vault is locked. Unlock it to view or add credentials.", "vault_empty": "No vault entries yet.",
        "expiry_title": "Password Expiry & Rotation Policy", "created_date": "Password Creation Date (YYYY-MM-DD)",
        "rotation_days": "Rotation Period (days)", "check_rotation": "Check Rotation Status", "rotation_ok": "Password is within policy.",
        "rotation_warn": "Password is approaching rotation.", "rotation_expired": "Password has exceeded the rotation policy.",
        "twofa_title": "Multi-Factor Authentication / TOTP", "issuer": "Account Issuer / Name", "account": "Account / Username",
        "secret": "TOTP Secret Key (Base32)", "generate_qr": "Generate QR Code", "parse_uri": "Import otpauth URI",
        "copy_otp_uri": "Copy OTP URI", "qr_missing": "Install qrcode and Pillow to use QR generation.",
        "phish_title": "Phishing Checker", "url": "Website URL", "analyze_url": "Analyze URL Safety",
        "network_title": "Network Security Scanner", "network_subtitle": "Defensive TCP reachability test. Results are OPEN, REFUSED, TIMEOUT or UNREACHABLE.",
        "health_title": "Security Health Check",
        "news": "Cyber Crime News / Updates", "news_title": "Cyber Crime News & Security Updates",
        "news_subtitle": "Live internet feed: ransomware, data breaches, cyber attacks, fraud and defensive security updates.",
        "news_refresh": "Refresh News", "news_loading": "Fetching latest cyber security news from the internet…",
        "news_offline": "Internet news is unavailable. Check your connection and press Refresh News.",
        "news_open": "Open Source", "news_updated": "Last updated", "news_no_items": "No news items were returned by the feed.",
        "zoom": "Zoom", "zoom_hint": "Use Ctrl + / Ctrl - to zoom the entire application. Ctrl + 0 resets to 100%.",
        "risk_score": "Risk Score", "findings": "Findings", "low_risk": "LOW RISK", "medium_risk": "MEDIUM RISK",
        "high_risk": "HIGH RISK", "safe_url": "URL looks structurally safe. Always verify the domain before entering credentials.",
        "settings_title": "Application Settings", "theme": "Theme", "language": "Language", "clipboard_timeout": "Clipboard Clear (seconds)",
        "save_settings": "Save Settings", "report": "Security Report", "export_report": "Export Security Report",
        "backup": "Encrypted Vault Backup", "restore": "Restore Encrypted Vault", "activity": "Security Activity",
        "status": "Status", "last_scan": "Last Breach Scan", "never": "Never", "close": "Close", "clear": "Clear",
        "master_password": "Master Password", "confirm_password": "Confirm Master Password", "unlock": "Unlock",
        "master_setup": "Create a master password for your encrypted vault.", "master_mismatch": "Master passwords do not match.",
        "master_short": "Master password must be at least 10 characters.", "vault_unlocked": "Vault unlocked.", "vault_locked": "Vault locked.",
        "crypto_missing": "Advanced vault encryption requires the 'cryptography' package. Install it with: pip install cryptography",
        "invalid_vault": "The vault file is invalid or the master password is incorrect.", "saved": "Saved successfully.",
        "invalid_date": "Enter a valid date in YYYY-MM-DD format.", "invalid_days": "Enter a valid positive number of days.",
        "security_warning": "Security Warning", "delete_entry": "Delete Entry", "view_entry": "View / Copy",
        "confirm_delete": "Delete this vault entry?", "report_saved": "Security report exported.",
        "backup_saved": "Encrypted vault backup exported.", "restore_success": "Encrypted vault restored. Unlock again to load it.",
        "restore_fail": "Could not restore the selected encrypted vault.", "about": "About",
        "help": "Help Center", "help_title": "Security Help Center",
        "help_intro": "Use this center to understand every module, security rule, and privacy safeguard in Cyber Security Guard.",
        "help_specs_title": "Password Security Rules", "help_policy_title": "Security Policy & Privacy",
        "help_modules_title": "Module Guide", "help_safe_title": "Safe Use & Limitations",
        "help_specs_text": (
            "1. Minimum length: Prefer at least 12–16 characters for important accounts.\n"
            "2. Character variety: Mix uppercase, lowercase, numbers, and symbols where appropriate.\n"
            "3. High entropy: Prefer unpredictable, randomly generated credentials.\n"
            "4. Avoid personal data: Do not use names, birthdays, pet names, dictionary words, or dates.\n"
            "5. Avoid patterns: Stay away from qwerty/asdfgh and numeric sequences such as 123456.\n"
            "6. Account isolation: Never reuse a password across sensitive services.\n"
            "7. Passphrases: Four or more unrelated random words can be a strong memorable option.\n"
            "8. Rotation: Follow your organisation/service policy; change immediately after a known compromise.\n"
            "9. MFA: Enable MFA/2FA wherever available; hardware security keys are strong phishing-resistant options.\n"
            "10. Password managers: Use a reputable encrypted manager to generate and store unique credentials.\n\n"
            "The built-in analyzer is a risk estimator, not a guarantee of crack time or absolute security."
        ),
        "help_policy_text": (
            "1. LOCAL PROCESSING: Password analysis and security metrics are calculated locally.\n"
            "2. K-ANONYMITY BREACH CHECK: Breach checks use the HIBP range method; only the first 5 characters of the SHA-1 hash are sent over HTTPS. The actual password is not sent.\n"
            "3. ENCRYPTED VAULT: When cryptography is installed, the vault uses PBKDF2-HMAC-SHA256 key derivation and Fernet authenticated encryption.\n"
            "4. NO MASTER-PASSWORD STORAGE: The master password is used to derive the vault key and is not intentionally stored by the application.\n"
            "5. NO VAULT TELEMETRY: Vault contents and master passwords are not intentionally transmitted to external servers.\n"
            "6. PLAINTEXT EXPORT WARNING: Password export is deliberately protected by an explicit security warning.\n"
            "7. REPORT SAFETY: Security reports do not include stored plaintext passwords.\n"
            "8. PHISHING LIMITATION: URL analysis is heuristic only and cannot prove that a website is safe.\n"
            "9. EDUCATIONAL SCOPE: This application supports defensive security hardening, auditing, and awareness training.\n\n"
            "Important: No software can guarantee absolute security. Keep the application, dependencies, browser, and operating system updated."
        ),
        "help_modules_text": (
            "• Dashboard — Gives a high-level security score, recommendations, vault state, and recent security activity.\n\n"
            "• Analyzer & Generator — Measures password length, character variety, entropy, repetition, sequences, common words, patterns, and generates strong random passwords.\n\n"
            "• Secure Vault — Stores credentials in an encrypted local vault protected by a master password.\n\n"
            "• Expiry & Rotation — Compares a password's creation date with the selected rotation policy.\n\n"
            "• 2FA / OTP — Creates standards-compatible otpauth:// TOTP QR codes and can import an existing TOTP URI.\n\n"
            "• Settings — Controls theme, language, clipboard timeout, reports, and vault backup/restore."
        ),
        "help_safe_text": (
            "• Treat security scores as guidance, not proof of safety.\n"
            "• Never paste real master passwords into screenshots, chats, tickets, or source code.\n"
            "• Keep the vault locked when it is not needed.\n"
            "• Do not export plaintext passwords unless you fully understand the risk and the destination is controlled.\n"
            "• Verify important websites independently before entering credentials.\n"
            "• Keep backups encrypted and protect backup files like the vault itself."
        ),
        "subtitle": "ADVANCED PROTECTION • ENCRYPTED VAULT • SECURITY INTELLIGENCE",
        "defense_matrix": "LIVE DEFENSE MATRIX", "local_mode": "LOCAL MODE", "security_operations": "SECURITY OPERATIONS",
        "ready": "Ready", "score_desc": "Use unique passwords • enable MFA • verify links before login • keep the encrypted vault locked when not in use.",
        "delete": "Delete", "copy_password": "Copy Password", "backup_short": "Backup", "restore_short": "Restore",
        "dashboard_title": "Security Command Center", "invalid_url": "Invalid or malformed URL.",
        "enter_url": "Please enter a URL to analyze.", "invalid_totp": "Invalid Base32 TOTP secret.",
        "paste_uri": "Paste an otpauth:// URI", "import_totp": "Import TOTP URI",
        "vault_auth": "Vault Authentication", "vault_error": "Vault Error", "account_required": "Account name and password/secret are required.",
        "no_vault": "No vault exists yet.", "clipboard_number": "Clipboard timeout must be a number.",
        "theme_apply": "APPLYING SECURITY THEME", "theme_rebuild": "Rebuilding royal security interface...",
        "module_title": "SECURITY MODULE", "module_init": "Initializing module interface...",
        "module_scan": "Scanning defense interface...", "module_controls": "Activating security controls...", "module_ready": "Module ready",
        "boot_title": "SECURITY OPERATIONS INITIALIZATION", "boot_loading": "Loading security modules...",
        "boot_vault": "Initializing encrypted vault engine...", "boot_local": "Verifying local analysis engine...",
        "boot_2fa": "Initializing 2FA / OTP services...",
        "boot_policy": "Applying security interface policy...", "boot_ready": "SYSTEM READY — launching command center...",
        "recommendation_text": "Security recommendations: keep credentials unique, use MFA, rotate compromised passwords, and lock the vault when finished.",
        "help_zoom_hint": "Hover over any control for a brief explanation. Use − / + to zoom Help Center text.",
        "export_warning_title": "Security Warning",
    },
    "Hinglish": {},
    "Hindi (हिंदी)": {},
}

# Keep the second and third languages complete without changing the app's logic.
# The values below intentionally mirror the English keys for technical terms where a natural translation
# would make the interface harder to understand.
LANGUAGES["Hinglish"] = {k: v for k, v in LANGUAGES["English"].items()}
LANGUAGES["Hindi (हिंदी)"] = {k: v for k, v in LANGUAGES["English"].items()}
for k, v in {
    "dashboard": "Dashboard", "analyzer": "Analyzer & Generator", "vault": "Secure Vault", "expiry": "Expiry & Rotation",
    "twofa": "2FA / OTP", "phishing_checker": "Phishing Checker", "settings": "Settings", "system_protected": "SYSTEM PROTECTED",
    "overall_score": "Overall Security Score", "password_prompt": "Password daalo aur security check karo:",
    "placeholder": "Yahan password type karo...", "generate": "Generate", "copy": "Copy", "export": "Export",
    "scan": "LEAK KE LIYE SCAN KARO", "save_vault": "Vault Me Save Karo", "unlock_vault": "Vault Unlock Karo",
    "lock_vault": "Vault Lock Karo", "check_rotation": "Rotation Status Check Karo", "generate_qr": "QR Code Generate Karo",
    "analyze_url": "URL Safety Analyze Karo", "master_setup": "Encrypted vault ke liye master password banao.",
}.items():
    LANGUAGES["Hinglish"][k] = v
for k, v in {
    "dashboard": "डैशबोर्ड", "analyzer": "पासवर्ड विश्लेषक", "vault": "सुरक्षित वॉल्ट", "expiry": "रोटेशन नीति",
    "twofa": "2FA / OTP", "settings": "सेटिंग्स", "system_protected": "सिस्टम सुरक्षित",
    "overall_score": "कुल सुरक्षा स्कोर", "password_prompt": "पासवर्ड डालें और सुरक्षा जांच करें:",
    "placeholder": "यहाँ पासवर्ड टाइप करें...", "generate": "बनाएँ", "copy": "कॉपी", "export": "एक्सपोर्ट",
    "scan": "लीक की जांच करें", "save_vault": "वॉल्ट में सेव करें", "unlock_vault": "वॉल्ट अनलॉक करें",
    "lock_vault": "वॉल्ट लॉक करें", "check_rotation": "रोटेशन स्थिति जांचें", "generate_qr": "QR कोड बनाएं",
    "analyze_url": "URL सुरक्षा जांचें", "master_setup": "एन्क्रिप्टेड वॉल्ट के लिए मास्टर पासवर्ड बनाएं।",
}.items():
    LANGUAGES["Hindi (हिंदी)"][k] = v


# Complete interface translations. Technical/security standards remain recognizable while all user-facing UI text changes.
_LOCALIZED = {
"Hinglish": {
    "subtitle":"ADVANCED PROTECTION • ENCRYPTED VAULT • SECURITY INTELLIGENCE","defense_matrix":"LIVE DEFENSE MATRIX","local_mode":"LOCAL MODE","security_operations":"SECURITY OPERATIONS","ready":"Ready","score_desc":"Unique passwords use karo • MFA enable karo • login se pehle links verify karo • kaam ke baad encrypted vault lock rakho.","delete":"Delete","copy_password":"Copy Password","backup_short":"Backup","restore_short":"Restore","dashboard_title":"Security Command Center","invalid_url":"URL invalid ya malformed hai.","enter_url":"Analyze karne ke liye URL daalo.","invalid_totp":"Base32 TOTP secret invalid hai.","paste_uri":"otpauth:// URI paste karo","import_totp":"Import TOTP URI","vault_auth":"Vault Authentication","vault_error":"Vault Error","account_required":"Account name aur password/secret required hai.","no_vault":"Abhi koi vault nahi bana hai.","clipboard_number":"Clipboard timeout number hona chahiye.","theme_apply":"SECURITY THEME APPLY HO RAHA HAI","theme_rebuild":"Royal security interface rebuild ho raha hai...","module_title":"SECURITY MODULE","module_init":"Module interface initialize ho raha hai...","module_scan":"Defense interface scan ho raha hai...","module_controls":"Security controls activate ho rahe hain...","module_ready":"Module ready","boot_title":"SECURITY OPERATIONS INITIALIZATION","boot_loading":"Security modules load ho rahe hain...","boot_vault":"Encrypted vault engine initialize ho raha hai...","boot_local":"Local analysis engine verify ho raha hai...","boot_2fa":"2FA / OTP services initialize ho rahi hain...","boot_phish":"Phishing Checker engine load ho raha hai...","boot_policy":"Security interface policy apply ho rahi hai...","boot_ready":"SYSTEM READY — command center launch ho raha hai...","recommendation_text":"Recommendations: credentials unique rakho, MFA use karo, compromised passwords change karo aur kaam ke baad vault lock karo.","help_zoom_hint":"Kisi bhi control par hover karke short explanation dekho. Help text zoom karne ke liye − / + use karo.","export_warning_title":"Security Warning", "network_title":"Network Security Scanner", "network_subtitle":"Defensive TCP reachability test. Results OPEN, REFUSED, TIMEOUT ya UNREACHABLE hote hain.", "health_title":"Security Health Check", "forensics_title":"Digital Forensics Toolkit", "news":"Cyber Crime News / Updates", "news_title":"Cyber Crime News & Security Updates", "news_subtitle":"Internet se live ransomware, data breach, cyber attack, fraud aur defensive security updates.", "news_refresh":"Refresh News", "news_loading":"Internet se latest cyber security news fetch ho rahi hai…", "news_offline":"Internet news available nahi hai. Connection check karke Refresh News dabao.", "news_open":"Source Open Karo", "news_updated":"Last updated", "news_no_items":"Feed se koi news item nahi mila.", "zoom":"Zoom", "zoom_hint":"Puri application zoom karne ke liye Ctrl + / Ctrl - use karo. Ctrl + 0 se 100% reset.", "export_warning_title":"Security Warning"},
"Hindi (हिंदी)": {
    "subtitle":"उन्नत सुरक्षा • एन्क्रिप्टेड वॉल्ट • सुरक्षा इंटेलिजेंस","defense_matrix":"लाइव डिफेंस मैट्रिक्स","local_mode":"लोकल मोड","security_operations":"सुरक्षा संचालन","ready":"तैयार","score_desc":"अलग-अलग पासवर्ड रखें • MFA सक्षम करें • लॉगिन से पहले लिंक जांचें • काम के बाद एन्क्रिप्टेड वॉल्ट लॉक रखें।","delete":"हटाएँ","copy_password":"पासवर्ड कॉपी करें","backup_short":"बैकअप","restore_short":"रिस्टोर","dashboard_title":"सुरक्षा कमांड सेंटर","invalid_url":"URL अमान्य या गलत प्रारूप में है।","enter_url":"जांच के लिए URL दर्ज करें।","invalid_totp":"Base32 TOTP secret अमान्य है।","paste_uri":"otpauth:// URI पेस्ट करें","import_totp":"TOTP URI आयात करें","vault_auth":"वॉल्ट प्रमाणीकरण","vault_error":"वॉल्ट त्रुटि","account_required":"Account name और password/secret आवश्यक हैं।","no_vault":"अभी कोई वॉल्ट मौजूद नहीं है।","clipboard_number":"Clipboard timeout संख्या होना चाहिए।","theme_apply":"सुरक्षा थीम लागू हो रही है","theme_rebuild":"रॉयल सुरक्षा इंटरफेस तैयार किया जा रहा है...","module_title":"सुरक्षा मॉड्यूल","module_init":"मॉड्यूल इंटरफेस शुरू हो रहा है...","module_scan":"डिफेंस इंटरफेस स्कैन हो रहा है...","module_controls":"सुरक्षा नियंत्रण सक्रिय हो रहे हैं...","module_ready":"मॉड्यूल तैयार","boot_title":"सुरक्षा संचालन प्रारंभ","boot_loading":"सुरक्षा मॉड्यूल लोड हो रहे हैं...","boot_vault":"एन्क्रिप्टेड वॉल्ट इंजन शुरू हो रहा है...","boot_local":"लोकल विश्लेषण इंजन सत्यापित हो रहा है...","boot_2fa":"2FA / OTP सेवाएँ शुरू हो रही हैं...","boot_policy":"सुरक्षा इंटरफेस नीति लागू हो रही है...","boot_ready":"सिस्टम तैयार — कमांड सेंटर शुरू हो रहा है...","recommendation_text":"सुझाव: अलग-अलग credentials रखें, MFA उपयोग करें, compromised passwords बदलें और काम के बाद vault लॉक करें।","help_zoom_hint":"किसी भी control पर hover करके उसका संक्षिप्त विवरण देखें। Help text zoom करने के लिए − / + उपयोग करें।","export_warning_title":"सुरक्षा चेतावनी"}
}
for _lang, _vals in _LOCALIZED.items():
    LANGUAGES[_lang].update(_vals)

for _L in LANGUAGES.values():
    _L.setdefault("analysis_empty", "Type a password above to view detailed security metrics.")
    _L.setdefault("policy_note", "Vault encryption uses PBKDF2-HMAC-SHA256 + Fernet when the cryptography package is installed.\nPasswords are never included in security reports.")
    _L.setdefault("invalid_uri", "Invalid otpauth URI.")
    _L.setdefault("flag_https", "Does not use HTTPS")
    _L.setdefault("flag_userinfo", "Contains user-info before the @ symbol, which can hide the real destination")
    _L.setdefault("flag_ip", "Uses a direct IP address instead of a domain name")
    _L.setdefault("flag_puny", "Punycode/IDN domain detected; inspect characters carefully")
    _L.setdefault("flag_nonascii", "Non-ASCII characters appear in the hostname")
    _L.setdefault("flag_hyphen", "Unusually high number of hyphens in the hostname")
    _L.setdefault("flag_depth", "Unusually deep subdomain structure")
    _L.setdefault("flag_long", "Very long URL; review redirects and parameters carefully")
    _L.setdefault("flag_at", "@ symbol appears in the URL")
    _L.setdefault("flag_encoded", "URL contains percent-encoded characters")
    _L.setdefault("flag_prefix", "Security/login-themed hostname prefix")
    _L.setdefault("recommend_domain", "Recommendation: Do not enter credentials until you independently verify the domain.")
    _L.setdefault("theme_dark","Dark"); _L.setdefault("theme_light","Light")
    _L.setdefault("telemetry_engine","ENGINE"); _L.setdefault("telemetry_vault","VAULT"); _L.setdefault("telemetry_network","NETWORK"); _L.setdefault("telemetry_defense","DEFENSE")
    _L.setdefault("network_title", "Network Security Scanner")
    _L.setdefault("network_subtitle", "Defensive TCP reachability test.")
    _L.setdefault("health_title", "Security Health Check")
    _L.setdefault("news", "Cyber Crime News / Updates")
    _L.setdefault("news_title", "Cyber Crime News & Security Updates")
    _L.setdefault("news_subtitle", "Live internet cyber security news feed.")
    _L.setdefault("news_refresh", "Refresh News")
    _L.setdefault("news_loading", "Fetching latest cyber security news from the internet…")
    _L.setdefault("news_offline", "Internet news is unavailable. Check your connection and press Refresh News.")
    _L.setdefault("news_open", "Open Source")
    _L.setdefault("news_updated", "Last updated")
    _L.setdefault("news_no_items", "No news items were returned by the feed.")
    _L.setdefault("zoom", "Zoom")
    _L.setdefault("zoom_hint", "Use Ctrl + / Ctrl - to zoom the entire application. Ctrl + 0 resets to 100%.")
    _L.setdefault("telemetry_local","LOCAL ANALYSIS"); _L.setdefault("telemetry_encrypted","ENCRYPTED"); _L.setdefault("telemetry_user","USER-CONTROLLED"); _L.setdefault("telemetry_active","ACTIVE")

for _lang, _vals in {
"Hinglish": {"invalid_uri":"otpauth URI invalid hai.","flag_https":"HTTPS use nahi ho raha hai","flag_userinfo":"@ symbol se pehle user-info hai, jo real destination chhupa sakta hai","flag_ip":"Domain ki jagah direct IP address use hua hai","flag_puny":"Punycode/IDN domain mila; characters ko carefully check karo","flag_nonascii":"Hostname mein non-ASCII characters hain","flag_hyphen":"Hostname mein unusually zyada hyphens hain","flag_depth":"Subdomain structure unusually deep hai","flag_long":"URL bahut lamba hai; redirects aur parameters carefully check karo","flag_at":"URL mein @ symbol mila","flag_encoded":"URL mein percent-encoded characters hain","flag_prefix":"Security/login themed hostname prefix mila","recommend_domain":"Recommendation: credentials enter karne se pehle domain ko independently verify karo."},
"Hindi (हिंदी)": {"invalid_uri":"otpauth URI अमान्य है।","flag_https":"HTTPS का उपयोग नहीं हो रहा है","flag_userinfo":"@ symbol से पहले user-info है, जो वास्तविक destination छिपा सकता है","flag_ip":"Domain की जगह direct IP address उपयोग हुआ है","flag_puny":"Punycode/IDN domain मिला; characters को ध्यान से जांचें","flag_nonascii":"Hostname में non-ASCII characters हैं","flag_hyphen":"Hostname में बहुत अधिक hyphens हैं","flag_depth":"Subdomain structure असामान्य रूप से deep है","flag_long":"URL बहुत लंबा है; redirects और parameters ध्यान से जांचें","flag_at":"URL में @ symbol मिला","flag_encoded":"URL में percent-encoded characters हैं","flag_prefix":"Security/login themed hostname prefix मिला","recommend_domain":"सुझाव: credentials डालने से पहले domain को independently verify करें।"}
}.items(): LANGUAGES[_lang].update(_vals)

# Human-readable translations for every core navigation, analysis, vault, rotation, OTP, phishing and settings label.
_TRANSLATIONS = {
"Hinglish": {
"system_ready":"System Ready","system_attention":"ATTENTION REQUIRED","overall_score":"Overall Security Score","excellent":"Excellent","good":"Good","fair":"Fair","critical":"Critical","security_overview":"Security Overview","recommendations":"Security Recommendations","no_recommendations":"Koi urgent recommendation nahi. Unique credentials aur MFA use karte raho.","weak_passwords":"Weak Passwords","breached_passwords":"Breached Passwords","vault_status":"Vault Status","twofa_status":"2FA Protection","healthy":"Healthy","locked":"Locked","unavailable":"Unavailable","enabled":"Enabled","disabled":"Disabled","password_length":"Password Length","strength_empty":"Strength: Empty","weak":"Strength: Weak","medium":"Strength: Medium","strong":"Strength: Strong","very_strong":"Strength: Very Strong","score":"Security Score","entropy":"Estimated Entropy","advanced":"ADVANCED SECURITY ANALYSIS","length_check":"Password length","upper_check":"Uppercase letters","lower_check":"Lowercase letters","number_check":"Numbers","symbol_check":"Symbols","repeat_check":"Repeated characters","sequence_check":"Sequential pattern","common_check":"Common password","pattern_check":"Predictable pattern","dictionary_check":"Dictionary words","unique_check":"Character uniqueness","generated":"Secure password generate ho gaya.","copied":"Password copy ho gaya. Clipboard 30 seconds mein clear hoga.","clipboard_cleared":"Clipboard automatically clear ho gaya.","empty":"Password field empty hai.","enter_first":"Pehle password enter karo.","scanning":"Breach database scan ho raha hai...","api_error":"Breach database tak nahi pahunch paaya. Internet connection check karo.","recommendation":"Recommendation","cancel":"Cancel","export_anyway":"Export Anyway","vault_account":"Account / Service Name","vault_username":"Username / Email","vault_password":"Password / Secret","vault_url":"Website / URL","vault_notes":"Secure Notes","vault_locked_msg":"Vault locked hai. Credentials dekhne ya add karne ke liye unlock karo.","vault_empty":"Abhi koi vault entry nahi hai.","expiry_title":"Password Expiry & Rotation Policy","created_date":"Password Creation Date (YYYY-MM-DD)","rotation_days":"Rotation Period (days)","check_rotation":"Rotation Status Check Karo","rotation_ok":"Password policy ke andar hai.","rotation_warn":"Password rotation ke close aa raha hai.","rotation_expired":"Password rotation policy cross kar chuka hai.","twofa_title":"Multi-Factor Authentication / TOTP","issuer":"Account Issuer / Name","account":"Account / Username","secret":"TOTP Secret Key (Base32)","generate_qr":"QR Code Generate Karo","parse_uri":"otpauth URI Import Karo","copy_otp_uri":"OTP URI Copy Karo","qr_missing":"QR generation ke liye qrcode aur Pillow install karo.","phish_title":"URL & Suspicious Link Heuristic Checker","url":"Website URL","analyze_url":"URL Safety Analyze Karo","risk_score":"Risk Score","findings":"Findings","low_risk":"LOW RISK","medium_risk":"MEDIUM RISK","high_risk":"HIGH RISK","safe_url":"URL structurally safe lagta hai. Credentials enter karne se pehle domain verify karo.","settings_title":"Application Settings","theme":"Theme","language":"Language","clipboard_timeout":"Clipboard Clear (seconds)","save_settings":"Save Settings","report":"Security Report","export_report":"Security Report Export Karo","backup":"Encrypted Vault Backup","restore":"Restore Encrypted Vault","activity":"Security Activity","status":"Status","last_scan":"Last Breach Scan","never":"Never","close":"Close","clear":"Clear","master_password":"Master Password","confirm_password":"Confirm Master Password","unlock":"Unlock","master_mismatch":"Master passwords match nahi karte.","master_short":"Master password minimum 10 characters ka hona chahiye.","vault_unlocked":"Vault unlocked.","vault_locked":"Vault locked.","invalid_vault":"Vault file invalid hai ya master password incorrect hai.","saved":"Successfully save ho gaya.","invalid_date":"Valid YYYY-MM-DD date enter karo.","invalid_days":"Valid positive days number enter karo.","security_warning":"Security Warning","delete_entry":"Delete Entry","view_entry":"View / Copy","confirm_delete":"Kya ye vault entry delete karni hai?","report_saved":"Security report export ho gayi.","backup_saved":"Encrypted vault backup export ho gaya.","restore_success":"Encrypted vault restore ho gaya. Load karne ke liye unlock karo.","restore_fail":"Selected encrypted vault restore nahi ho saka.","about":"About",
"help":"Help Center","help_title":"Security Help Center","help_intro":"Is center se har module, security rule aur privacy safeguard ko samjho.","help_specs_title":"Password Security Rules","help_policy_title":"Security Policy & Privacy","help_modules_title":"Module Guide","help_safe_title":"Safe Use & Limitations",
"help_specs_text":"1. Minimum length: Important accounts ke liye 12–16+ characters prefer karo.\n2. Character variety: Uppercase, lowercase, numbers aur symbols ka suitable mix rakho.\n3. High entropy: Unpredictable, randomly generated credentials prefer karo.\n4. Personal data avoid karo: Names, birthdays, pet names, dictionary words ya dates use mat karo.\n5. Patterns avoid karo: qwerty/asdfgh aur 123456 jaise sequences se bacho.\n6. Account isolation: Sensitive services par password reuse mat karo.\n7. Passphrases: 4+ unrelated random words memorable strong option ho sakte hain.\n8. Rotation: Organisation/service policy follow karo; compromise ke baad immediately change karo.\n9. MFA: Jahan available ho MFA/2FA enable karo.\n10. Password managers: Reputable encrypted manager se unique credentials generate/store karo.\n\nAnalyzer risk estimator hai; absolute security guarantee nahi deta.",
"help_policy_text":"1. LOCAL PROCESSING: Password analysis aur metrics locally calculate hote hain.\n2. K-ANONYMITY BREACH CHECK: HIBP range method use hota hai; SHA-1 hash ke first 5 characters HTTPS par bheje jaate hain, actual password nahi.\n3. ENCRYPTED VAULT: Cryptography installed hone par PBKDF2-HMAC-SHA256 aur Fernet authenticated encryption use hoti hai.\n4. NO MASTER-PASSWORD STORAGE: Master password vault key derive karne ke liye use hota hai aur intentionally store nahi hota.\n5. NO VAULT TELEMETRY: Vault contents aur master passwords intentionally external servers ko transmit nahi hote.\n6. PLAINTEXT EXPORT WARNING: Password export explicit security warning ke peeche protected hai.\n7. REPORT SAFETY: Security reports stored plaintext passwords include nahi karti.\n8. PHISHING LIMITATION: URL analysis heuristic hai; website safe hone ka proof nahi.\n9. EDUCATIONAL SCOPE: Defensive security hardening, auditing aur awareness ke liye hai.\n\nImportant: Koi software absolute security guarantee nahi kar sakta. Dependencies, browser aur OS updated rakho.",
"help_modules_text":"• Dashboard — overall security score, recommendations, vault state aur activity dikhata hai.\n\n• Analyzer & Generator — password length, character variety, entropy, repetition, patterns aur secure generation check karta hai.\n\n• Secure Vault — master password protected encrypted local vault mein credentials store karta hai.\n\n• Expiry & Rotation — creation date ko selected rotation policy se compare karta hai.\n\n• Phishing Checker — HTTPS, IP host, punycode, user-info, deep subdomains aur suspicious naming jaise URL signals score karta hai.\n\n• Settings — theme, language, clipboard timeout, reports aur vault backup/restore control karta hai.",
"help_safe_text":"• Security score ko guidance samjho, safety proof nahi.\n• Real master passwords ko screenshots, chats, tickets ya source code mein mat daalo.\n• Kaam na ho to vault locked rakho.\n• Plaintext password export tabhi karo jab risk aur destination fully samajh ho.\n• Important websites par credentials enter karne se pehle independently verify karo.\n• Encrypted backups ko bhi vault ki tarah protect karo."
},
"Hindi (हिंदी)": {
"system_ready":"सिस्टम तैयार","system_attention":"ध्यान आवश्यक","overall_score":"कुल सुरक्षा स्कोर","excellent":"उत्कृष्ट","good":"अच्छा","fair":"सामान्य","critical":"गंभीर","security_overview":"सुरक्षा अवलोकन","recommendations":"सुरक्षा सुझाव","no_recommendations":"कोई जरूरी सुझाव नहीं। अलग-अलग credentials और MFA का उपयोग जारी रखें।","weak_passwords":"कमजोर पासवर्ड","breached_passwords":"लीक हुए पासवर्ड","vault_status":"वॉल्ट स्थिति","twofa_status":"2FA सुरक्षा","healthy":"सुरक्षित","locked":"लॉक","unavailable":"उपलब्ध नहीं","enabled":"सक्षम","disabled":"अक्षम","password_length":"पासवर्ड लंबाई","strength_empty":"मजबूती: खाली","weak":"मजबूती: कमजोर","medium":"मजबूती: मध्यम","strong":"मजबूती: मजबूत","very_strong":"मजबूती: बहुत मजबूत","score":"सुरक्षा स्कोर","entropy":"अनुमानित एंट्रॉपी","advanced":"उन्नत सुरक्षा विश्लेषण","length_check":"पासवर्ड लंबाई","upper_check":"बड़े अक्षर","lower_check":"छोटे अक्षर","number_check":"अंक","symbol_check":"चिह्न","repeat_check":"दोहराए गए अक्षर","sequence_check":"क्रमिक पैटर्न","common_check":"सामान्य पासवर्ड","pattern_check":"अनुमानित पैटर्न","dictionary_check":"डिक्शनरी शब्द","unique_check":"अक्षर विशिष्टता","generated":"सुरक्षित पासवर्ड बनाया गया।","copied":"पासवर्ड कॉपी हुआ। Clipboard 30 सेकंड में साफ होगा।","clipboard_cleared":"Clipboard अपने आप साफ हो गया।","empty":"पासवर्ड फ़ील्ड खाली है।","enter_first":"पहले पासवर्ड दर्ज करें।","scanning":"Breach database स्कैन हो रहा है...","api_error":"Breach database से संपर्क नहीं हो सका। Internet connection जांचें।","recommendation":"सुझाव","cancel":"रद्द करें","export_anyway":"फिर भी Export करें","vault_account":"Account / Service Name","vault_username":"Username / Email","vault_password":"Password / Secret","vault_url":"Website / URL","vault_notes":"सुरक्षित नोट्स","vault_locked_msg":"वॉल्ट लॉक है। Credentials देखने या जोड़ने के लिए unlock करें।","vault_empty":"अभी कोई vault entry नहीं है।","expiry_title":"पासवर्ड समाप्ति और रोटेशन नीति","created_date":"पासवर्ड बनाने की तारीख (YYYY-MM-DD)","rotation_days":"रोटेशन अवधि (दिन)","check_rotation":"रोटेशन स्थिति जांचें","rotation_ok":"पासवर्ड नीति के अंदर है।","rotation_warn":"पासवर्ड रोटेशन समय के करीब है।","rotation_expired":"पासवर्ड रोटेशन नीति पार कर चुका है।","twofa_title":"मल्टी-फैक्टर ऑथेंटिकेशन / TOTP","issuer":"Account Issuer / Name","account":"Account / Username","secret":"TOTP Secret Key (Base32)","generate_qr":"QR Code बनाएं","parse_uri":"otpauth URI आयात करें","copy_otp_uri":"OTP URI कॉपी करें","qr_missing":"QR generation के लिए qrcode और Pillow install करें।","phish_title":"URL और संदिग्ध लिंक ह्यूरिस्टिक चेकर","url":"Website URL","analyze_url":"URL सुरक्षा जांचें","risk_score":"जोखिम स्कोर","findings":"निष्कर्ष","low_risk":"कम जोखिम","medium_risk":"मध्यम जोखिम","high_risk":"उच्च जोखिम","safe_url":"URL संरचनात्मक रूप से सुरक्षित लगता है। Credentials डालने से पहले domain verify करें।","settings_title":"एप्लिकेशन सेटिंग्स","theme":"थीम","language":"भाषा","clipboard_timeout":"Clipboard Clear (सेकंड)","save_settings":"सेटिंग्स सेव करें","report":"सुरक्षा रिपोर्ट","export_report":"सुरक्षा रिपोर्ट एक्सपोर्ट करें","backup":"एन्क्रिप्टेड वॉल्ट बैकअप","restore":"एन्क्रिप्टेड वॉल्ट रिस्टोर","activity":"सुरक्षा गतिविधि","status":"स्थिति","last_scan":"अंतिम Breach Scan","never":"कभी नहीं","close":"बंद करें","clear":"साफ करें","master_password":"मास्टर पासवर्ड","confirm_password":"मास्टर पासवर्ड की पुष्टि","unlock":"अनलॉक","master_mismatch":"मास्टर पासवर्ड मेल नहीं खाते।","master_short":"मास्टर पासवर्ड कम से कम 10 अक्षरों का होना चाहिए।","vault_unlocked":"वॉल्ट अनलॉक है।","vault_locked":"वॉल्ट लॉक है।","invalid_vault":"वॉल्ट फ़ाइल अमान्य है या मास्टर पासवर्ड गलत है।","saved":"सफलतापूर्वक सेव हुआ।","invalid_date":"मान्य YYYY-MM-DD तारीख दर्ज करें।","invalid_days":"मान्य positive दिनों की संख्या दर्ज करें।","security_warning":"सुरक्षा चेतावनी","delete_entry":"एंट्री हटाएँ","view_entry":"देखें / कॉपी करें","confirm_delete":"क्या यह vault entry हटानी है?","report_saved":"सुरक्षा रिपोर्ट एक्सपोर्ट हो गई।","backup_saved":"एन्क्रिप्टेड vault backup एक्सपोर्ट हो गया।","restore_success":"एन्क्रिप्टेड vault restore हो गया। लोड करने के लिए फिर से unlock करें।","restore_fail":"चयनित encrypted vault restore नहीं हो सका।","about":"जानकारी",
"help":"सहायता केंद्र","help_title":"सुरक्षा सहायता केंद्र","help_intro":"इस केंद्र से हर मॉड्यूल, सुरक्षा नियम और privacy safeguard समझें।","help_specs_title":"पासवर्ड सुरक्षा नियम","help_policy_title":"सुरक्षा नीति और गोपनीयता","help_modules_title":"मॉड्यूल गाइड","help_safe_title":"सुरक्षित उपयोग और सीमाएँ",
"help_specs_text":"1. न्यूनतम लंबाई: महत्वपूर्ण accounts के लिए 12–16+ characters रखें।\n2. Character variety: uppercase, lowercase, numbers और symbols का उचित mix रखें।\n3. High entropy: unpredictable और randomly generated credentials पसंद करें।\n4. Personal data से बचें: नाम, जन्मदिन, pet names, dictionary words या dates न रखें।\n5. Patterns से बचें: qwerty/asdfgh और 123456 जैसी sequences न रखें।\n6. Account isolation: sensitive services पर password reuse न करें।\n7. Passphrases: 4+ unrelated random words मजबूत और याद रखने योग्य विकल्प हो सकते हैं।\n8. Rotation: organisation/service policy follow करें; compromise के बाद तुरंत बदलें।\n9. MFA: जहां उपलब्ध हो MFA/2FA enable करें।\n10. Password managers: reputable encrypted manager से unique credentials generate/store करें।\n\nAnalyzer केवल risk estimator है; absolute security guarantee नहीं देता।",
"help_policy_text":"1. LOCAL PROCESSING: Password analysis और metrics locally calculate होते हैं।\n2. K-ANONYMITY BREACH CHECK: HIBP range method में SHA-1 hash के केवल पहले 5 characters HTTPS पर भेजे जाते हैं; actual password नहीं।\n3. ENCRYPTED VAULT: cryptography installed होने पर PBKDF2-HMAC-SHA256 और Fernet authenticated encryption उपयोग होती है।\n4. NO MASTER-PASSWORD STORAGE: master password vault key derive करने के लिए उपयोग होता है और जानबूझकर store नहीं होता।\n5. NO VAULT TELEMETRY: vault contents और master passwords जानबूझकर external servers को transmit नहीं होते।\n6. PLAINTEXT EXPORT WARNING: password export explicit security warning के पीछे protected है।\n7. REPORT SAFETY: security reports stored plaintext passwords include नहीं करतीं।\n8. PHISHING LIMITATION: URL analysis heuristic है; website safe होने का proof नहीं।\n9. EDUCATIONAL SCOPE: defensive security hardening, auditing और awareness के लिए है।\n\nमहत्वपूर्ण: कोई software absolute security guarantee नहीं कर सकता। dependencies, browser और OS updated रखें।",
"help_modules_text":"• Dashboard — overall security score, recommendations, vault state और activity दिखाता है।\n\n• Analyzer & Generator — password length, character variety, entropy, repetition, patterns और secure generation check करता है।\n\n• Secure Vault — master password protected encrypted local vault में credentials रखता है।\n\n• Expiry & Rotation — creation date को selected rotation policy से compare करता है।\n\n• Phishing Checker — HTTPS, IP host, punycode, user-info, deep subdomains और suspicious naming जैसे URL signals score करता है।\n\n• Settings — theme, language, clipboard timeout, reports और vault backup/restore control करता है।",
"help_safe_text":"• Security score को guidance समझें, safety proof नहीं।\n• Real master passwords को screenshots, chats, tickets या source code में न डालें।\n• जरूरत न हो तो vault locked रखें।\n• Plaintext password export तभी करें जब risk और destination पूरी तरह समझते हों।\n• Important websites पर credentials डालने से पहले independently verify करें।\n• Encrypted backups को भी vault की तरह सुरक्षित रखें।"
}}
for _lang,_vals in _TRANSLATIONS.items(): LANGUAGES[_lang].update(_vals)

for _lang, _vals in {
"Hinglish":{"theme_dark":"Dark","theme_light":"Light","telemetry_engine":"ENGINE","telemetry_vault":"VAULT","telemetry_network":"NETWORK","telemetry_defense":"DEFENSE","telemetry_local":"LOCAL ANALYSIS","telemetry_encrypted":"ENCRYPTED","telemetry_user":"USER-CONTROLLED","telemetry_active":"ACTIVE"},
"Hindi (हिंदी)":{"theme_dark":"डार्क","theme_light":"लाइट","telemetry_engine":"इंजन","telemetry_vault":"वॉल्ट","telemetry_network":"नेटवर्क","telemetry_defense":"डिफेंस","telemetry_local":"लोकल विश्लेषण","telemetry_encrypted":"एन्क्रिप्टेड","telemetry_user":"यूज़र-कंट्रोल्ड","telemetry_active":"सक्रिय"}
}.items(): LANGUAGES[_lang].update(_vals)

_V13_LOCALIZATION = {
"English": {"health_total":"Total credentials","health_strong":"Strong","health_weak":"Needs attention","health_breached":"Breached","health_expiring":"Aging / Expiring","breach_checks":"Breach checks","history_range":"Range","history_points":"points","history_empty":"Score history will appear after dashboard refreshes.","events_empty":"No security events recorded yet.","timeline_title":"Security Event Timeline","timeline_short":"Event Timeline","adv_gen_title":"Advanced Password Generator","adv_gen_intro":"Generate a credential using configurable length and character sets.","adv_length":"Length","adv_upper":"Uppercase","adv_lower":"Lowercase","adv_digits":"Numbers","adv_symbols":"Symbols","adv_short":"Advanced","professional_report":"Professional HTML Report","professional_report_saved":"Professional security report exported.","credential_health_title":"CREDENTIAL HEALTH","score_history_title":"SCORE HISTORY","event_stream_title":"SECURITY EVENT STREAM","hover_generic":"Security control: hover here for contextual guidance."},
"Hinglish": {"health_total":"Total credentials","health_strong":"Strong","health_weak":"Attention needed","health_breached":"Breached","health_expiring":"Old / Expiring","breach_checks":"Breach checks","history_range":"Range","history_points":"points","history_empty":"Dashboard refresh ke baad score history yahan dikhegi.","events_empty":"Abhi koi security event record nahi hua.","timeline_title":"Security Event Timeline","timeline_short":"Event Timeline","adv_gen_title":"Advanced Password Generator","adv_gen_intro":"Length aur character sets choose karke secure credential generate karo.","adv_length":"Length","adv_upper":"Uppercase","adv_lower":"Lowercase","adv_digits":"Numbers","adv_symbols":"Symbols","adv_short":"Advanced","professional_report":"Professional HTML Report","professional_report_saved":"Professional security report export ho gayi.","credential_health_title":"CREDENTIAL HEALTH","score_history_title":"SCORE HISTORY","event_stream_title":"SECURITY EVENT STREAM","hover_generic":"Security control: hover karo, yahan contextual guidance milegi."},
"Hindi (हिंदी)": {"health_total":"कुल credentials","health_strong":"मजबूत","health_weak":"ध्यान आवश्यक","health_breached":"लीक हुए","health_expiring":"पुराने / समाप्ति के करीब","breach_checks":"Breach checks","history_range":"सीमा","history_points":"पॉइंट्स","history_empty":"Dashboard refresh के बाद score history यहाँ दिखाई देगी।","events_empty":"अभी कोई security event दर्ज नहीं हुआ है।","timeline_title":"सुरक्षा घटना टाइमलाइन","timeline_short":"इवेंट टाइमलाइन","adv_gen_title":"उन्नत पासवर्ड जनरेटर","adv_gen_intro":"Length और character sets चुनकर secure credential बनाएं।","adv_length":"लंबाई","adv_upper":"बड़े अक्षर","adv_lower":"छोटे अक्षर","adv_digits":"अंक","adv_symbols":"चिह्न","adv_short":"उन्नत","professional_report":"प्रोफेशनल HTML रिपोर्ट","professional_report_saved":"प्रोफेशनल सुरक्षा रिपोर्ट एक्सपोर्ट हो गई।","credential_health_title":"क्रेडेंशियल सुरक्षा स्थिति","score_history_title":"सुरक्षा स्कोर इतिहास","event_stream_title":"सुरक्षा इवेंट स्ट्रीम","hover_generic":"सुरक्षा नियंत्रण: hover करने पर इसका contextual विवरण दिखाई देगा।"}
}
for _lang,_vals in _V13_LOCALIZATION.items(): LANGUAGES[_lang].update(_vals)
for _L in LANGUAGES.values():
    _L.setdefault("totp_secret_help", "Paste the Base32 setup secret — not the 6-digit OTP code.")
    _L.setdefault("totp_code_detected", "OTP CODE DETECTED — not a secret")
    _L.setdefault("totp_code_help", "A 6-digit number is a temporary OTP code. It cannot be used to create a QR code. Use the setup secret or import an otpauth:// URI.")
    _L.setdefault("totp_valid", "✓ VALID BASE32 SECRET")
    _L.setdefault("totp_valid_help", "Looks valid. You can generate the QR code now.")
    _L.setdefault("totp_invalid", "✕ INVALID BASE32 SECRET")
    _L.setdefault("totp_invalid_help", "Base32 uses A–Z and digits 2–7. Do not paste the current 6-digit OTP here.")
    _L.setdefault("totp_qr_ready", "✓ QR CODE READY — scan it with your authenticator app.")
    _L.setdefault("totp_uri_copied", "✓ OTP URI copied. Clipboard will clear automatically.")
    _L.setdefault("totp_new_secret", "Generate New Secret")
    _L.setdefault("totp_clear", "Clear")
    _L.setdefault("totp_hint", "Simple setup: enter your account details, then paste a TOTP setup secret. If you only have a 6-digit OTP code, use Generate New Secret or Import URI instead.")

for _lang in LANGUAGES:
    for _key,_value in LANGUAGES["English"].items(): LANGUAGES[_lang].setdefault(_key,_value)

# Current Help Center content — aligned with the features present in this build.
_CURRENT_HELP_CENTER = {
    "English": {
        "help_specs_title": "Password & Analyzer Guide",
        "help_policy_title": "Security & Privacy",
        "help_modules_title": "Current Feature Guide",
        "help_safe_title": "Secure Documents & Health Check",
        "help_specs_text": "1. Use long, unique passwords for important accounts.\n2. Mix character types where the service allows it.\n3. Prefer unpredictable, randomly generated passwords.\n4. Avoid names, dates, common words, keyboard patterns and reused passwords.\n5. Use Analyzer & Generator to review strength and generate a new password.\n6. Do not reuse a password across sensitive services.\n7. Enable MFA on important accounts when available.\n8. Change a password immediately if you believe it has been exposed.\n9. Keep Secure Vault locked when it is not in use.\n10. Treat the security score as guidance, not as a guarantee.\n\nThe Analyzer is a local risk-estimation tool; it does not prove that a password is unbreakable.",
        "help_policy_text": "1. Password analysis and the main security checks are designed to run locally.\n2. Secure Vault data is protected by the application's encrypted vault mechanism.\n3. Secure Documents uses its own encrypted document store and a separate unlock session.\n4. Secure Documents files are encrypted individually and their folder structure is stored in the encrypted index.\n5. Secure Documents Backup contains the encrypted document index and encrypted document blobs.\n6. Security Health Check reports system security information only; it does not intentionally transmit the collected report.\n7. Keep the application, Python dependencies and Windows security components updated.\n8. Protect master passwords and encrypted backup files like sensitive security material.\n\nNo software can guarantee absolute security.",
        "help_modules_text": "• Dashboard — Shows overall security status, score, recommendations, vault state and recent security activity.\n\n• Analyzer & Generator — Checks password length, character variety, repeated characters, patterns and other strength signals, and generates secure passwords.\n\n• Secure Vault — Stores credentials in the encrypted local password vault protected by its master password.\n\n• Secure Documents — Creates Subjects, top-level folders and nested folders; imports individual files or complete folders while preserving the folder hierarchy; opens, renames, copies, moves, deletes and backs up encrypted documents.\n\n• Expiry & Rotation — Checks password age against the selected rotation period.\n\n• Security Health Check — Shows only: Complete PC Details, Windows Details, RAM / Storage, Firewall, Microsoft Defender, Windows Security, UAC, Windows Update, Antivirus, Security Processes, Startup Entries, Network Connections and Security Services.\n\n• Help Center — Provides the current application guide and security-use information.\n\n• Settings — Controls application preferences and available security/report options.",
        "help_safe_text": "• Secure Documents subjects can be deleted from the subject list. Deleting a subject removes its folders, nested folders and encrypted document files.\n• New Folder creates a top-level folder; use a folder's context menu to create a nested folder inside it.\n• Import Folder keeps the selected root folder and its complete internal hierarchy.\n• Lock Secure Documents when you finish working with sensitive files.\n• Use encrypted Backup/Restore for Secure Documents rather than copying internal storage files manually.\n• Security Health Check is an information and audit view; review reported warnings in Windows.\n• Never share master passwords, exported backup files or sensitive documents through unsecured channels."
    },
    "Hinglish": {
        "help_specs_title": "Password & Analyzer Guide",
        "help_policy_title": "Security & Privacy",
        "help_modules_title": "Current Feature Guide",
        "help_safe_title": "Secure Documents & Health Check",
        "help_specs_text": "1. Important accounts ke liye long aur unique passwords use karo.\n2. Service allow kare to uppercase, lowercase, numbers aur symbols ka mix rakho.\n3. Unpredictable aur randomly generated passwords prefer karo.\n4. Names, dates, common words, keyboard patterns aur reused passwords avoid karo.\n5. Analyzer & Generator se password strength check aur secure password generation karo.\n6. Sensitive services par same password reuse mat karo.\n7. Important accounts par MFA available ho to enable karo.\n8. Password expose hone ka doubt ho to turant change karo.\n9. Secure Vault ko use ke baad lock rakho.\n10. Security score ko guidance samjho, guarantee nahi.\n\nAnalyzer local risk-estimation tool hai; ye password ko unbreakable prove nahi karta.",
        "help_policy_text": "1. Password analysis aur main security checks local processing ke liye designed hain.\n2. Secure Vault data application ke encrypted vault mechanism se protected hai.\n3. Secure Documents ka apna encrypted document store aur separate unlock session hai.\n4. Secure Documents files individually encrypted hoti hain aur folder structure encrypted index mein save hota hai.\n5. Secure Documents Backup mein encrypted index aur encrypted document files hoti hain.\n6. Security Health Check system-security information report karta hai; report ko intentionally transmit nahi karta.\n7. Application, Python dependencies aur Windows security components updated rakho.\n8. Master passwords aur encrypted backups ko sensitive security material ki tarah protect karo.\n\nKoi software absolute security guarantee nahi de sakta.",
        "help_modules_text": "• Dashboard — Overall security status, score, recommendations, vault state aur recent security activity dikhata hai.\n\n• Analyzer & Generator — Password length, character variety, repeated characters, patterns aur strength signals check karta hai aur secure passwords generate karta hai.\n\n• Secure Vault — Master password protected encrypted local password vault hai.\n\n• Secure Documents — Subjects, main folders aur nested folders create karta hai; files ya complete folders import karta hai aur folder hierarchy preserve karta hai; encrypted documents ko open, rename, copy, move, delete aur backup/restore kar sakta hai.\n\n• Expiry & Rotation — Password age ko selected rotation period ke against check karta hai.\n\n• Security Health Check — Sirf required data dikhata hai: Complete PC Details, Windows Details, RAM / Storage, Firewall, Microsoft Defender, Windows Security, UAC, Windows Update, Antivirus, Security Processes, Startup Entries, Network Connections aur Security Services.\n\n• Help Center — Current application features aur security-use guide deta hai.\n\n• Settings — Application preferences aur available security/report options control karta hai.",
        "help_safe_text": "• Secure Documents subject list se main Subject delete kiya ja sakta hai. Delete karne par uske folders, nested folders aur encrypted document files remove ho jaate hain.\n• New Folder se top-level folder banao; folder ke context menu se uske andar nested folder bana sakte ho.\n• Import Folder selected root folder aur uski complete internal hierarchy preserve karta hai.\n• Sensitive files ka kaam complete hone ke baad Secure Documents lock karo.\n• Secure Documents ke liye encrypted Backup/Restore use karo.\n• Security Health Check information/audit view hai; warnings ko Windows mein verify aur investigate karo.\n• Master passwords, backup files aur sensitive documents unsecured channels par share mat karo."
    },
    "Hindi (हिंदी)": {
        "help_specs_title": "पासवर्ड और Analyzer Guide",
        "help_policy_title": "सुरक्षा और गोपनीयता",
        "help_modules_title": "वर्तमान Feature Guide",
        "help_safe_title": "Secure Documents और Health Check",
        "help_specs_text": "1. महत्वपूर्ण accounts के लिए लंबे और unique passwords रखें।\n2. Service अनुमति दे तो uppercase, lowercase, numbers और symbols का mix रखें।\n3. Unpredictable और randomly generated passwords को प्राथमिकता दें।\n4. Names, dates, common words, keyboard patterns और reused passwords से बचें।\n5. Analyzer & Generator से password strength check और secure password generation करें।\n6. Sensitive services पर एक ही password reuse न करें।\n7. महत्वपूर्ण accounts पर MFA उपलब्ध हो तो enable करें।\n8. Password expose होने का संदेह हो तो तुरंत बदलें।\n9. Secure Vault को उपयोग के बाद lock रखें।\n10. Security score को guidance समझें, guarantee नहीं।\n\nAnalyzer local risk-estimation tool है; यह password को unbreakable साबित नहीं करता।",
        "help_policy_text": "1. Password analysis और मुख्य security checks local processing के लिए designed हैं।\n2. Secure Vault data application के encrypted vault mechanism से protected है।\n3. Secure Documents का अपना encrypted document store और अलग unlock session है।\n4. Secure Documents files individually encrypted होती हैं और folder structure encrypted index में save होता है।\n5. Secure Documents Backup में encrypted index और encrypted document files शामिल होती हैं।\n6. Security Health Check system-security information report करता है; report को जानबूझकर transmit नहीं करता।\n7. Application, Python dependencies और Windows security components updated रखें।\n8. Master passwords और encrypted backups को sensitive security material की तरह protect करें।\n\nकोई software absolute security guarantee नहीं दे सकता।",
        "help_modules_text": "• Dashboard — Overall security status, score, recommendations, vault state और recent security activity दिखाता है।\n\n• Analyzer & Generator — Password length, character variety, repeated characters, patterns और strength signals check करता है और secure passwords generate करता है।\n\n• Secure Vault — Master password protected encrypted local password vault है।\n\n• Secure Documents — Subjects, main folders और nested folders create करता है; files या complete folders import करता है और folder hierarchy preserve करता है; encrypted documents को open, rename, copy, move, delete और backup/restore कर सकता है।\n\n• Expiry & Rotation — Password age को selected rotation period के against check करता है।\n\n• Security Health Check — केवल required data दिखाता है: Complete PC Details, Windows Details, RAM / Storage, Firewall, Microsoft Defender, Windows Security, UAC, Windows Update, Antivirus, Security Processes, Startup Entries, Network Connections और Security Services।\n\n• Help Center — Current application features और security-use guide देता है।\n\n• Settings — Application preferences और available security/report options control करता है।",
        "help_safe_text": "• Secure Documents subject list से main Subject delete किया जा सकता है। Delete करने पर उसके folders, nested folders और encrypted document files remove हो जाते हैं।\n• New Folder से top-level folder बनाएं; folder के context menu से उसके अंदर nested folder बना सकते हैं।\n• Import Folder selected root folder और उसकी complete internal hierarchy preserve करता है।\n• Sensitive files का काम पूरा होने के बाद Secure Documents lock करें।\n• Secure Documents के लिए encrypted Backup/Restore का उपयोग करें।\n• Security Health Check information/audit view है; warnings को Windows में verify और investigate करें।\n• Master passwords, backup files और sensitive documents unsecured channels पर share न करें।"
    }
}
for _lang, _help in _CURRENT_HELP_CENTER.items():
    LANGUAGES[_lang].update(_help)

class HoverTooltip:
    """Reliable global hover-help popup. Uses pointer motion instead of fragile widget enter/leave bindings."""
    def __init__(self, widget, text, delay=300):
        self.widget = widget
        self.text = text
        self.delay = delay
        self.tip = None
        self.after_id = None

    def schedule(self):
        self.cancel()
        try:
            self.after_id = self.widget.after(self.delay, self.show)
        except Exception:
            self.after_id = None

    def cancel(self):
        if self.after_id:
            try: self.widget.after_cancel(self.after_id)
            except Exception: pass
            self.after_id = None

    def show(self):
        self.after_id = None
        if self.tip or not self.text or not self.widget.winfo_exists():
            return
        try:
            text = self.text() if callable(self.text) else str(self.text)
            x = self.widget.winfo_pointerx() + 16
            y = self.widget.winfo_pointery() + 22
            sw = self.widget.winfo_screenwidth(); sh = self.widget.winfo_screenheight()
            width = 390
            height = 110
            if x + width > sw - 10: x = max(10, sw - width - 10)
            if y + height > sh - 10: y = max(10, y - height - 35)
            self.tip = tk.Toplevel(self.widget)
            self.tip.wm_overrideredirect(True)
            self.tip.wm_attributes('-topmost', True)
            self.tip.geometry(f'+{x}+{y}')
            bg = getattr(self.widget, '_tooltip_bg', '#11112B')
            fg = getattr(self.widget, '_tooltip_fg', '#F8F5FF')
            border = getattr(self.widget, '_tooltip_border', '#8A63FF')
            frame = tk.Frame(self.tip, bg=bg, highlightbackground=border, highlightthickness=2)
            frame.pack(fill='both', expand=True)
            tk.Label(frame, text=text, justify='left', anchor='w', wraplength=365,
                     bg=bg, fg=fg, padx=12, pady=10,
                     font=('Segoe UI', 10, 'bold')).pack(fill='both', expand=True)
        except Exception:
            self.tip = None

    def hide(self):
        self.cancel()
        if self.tip:
            try: self.tip.destroy()
            except Exception: pass
            self.tip = None

    def _enter(self, event=None): self.schedule()
    def _leave(self, event=None): self.hide()
    def _cancel(self): self.cancel()


_LOGIN_WATERMARK_B64 = "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"
_NAVY_FLEET_B64 = "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"
_NAVY_AVIATION_B64 = "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"
_NAVY_SUBMARINE_B64 = "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"


class PasswordSecurityGuard(ctk.CTk):
    """Cyber Security Guard v12 - defensive password and credential security suite."""


    def _default_docs_dir(self):
        primary = Path(r"D:\THAKUR AIW\MY PROJECTS\SAMUNDRA KAWACH")
        if primary.exists():
            return primary
        try:
            app_dir = Path(__file__).resolve().parent
            if app_dir.exists():
                return app_dir
        except Exception:
            pass
        return Path.home() / "Documents"

    def __init__(self):
        super().__init__()
        self.title(f"{APP_NAME} {APP_VERSION}")
        self.geometry("1180x780")
        self.minsize(980, 680)
        self.resizable(True, True)
        try:
            ico_candidates = [
                Path(__file__).resolve().parent / "SAMUDRA_KAVACH.ico",
                Path(sys.executable).resolve().parent / "SAMUDRA_KAVACH.ico",
                Path(getattr(sys, "_MEIPASS", "")) / "SAMUDRA_KAVACH.ico",
                Path(r"D:\THAKUR AIW\MY PROJECTS\SAMUNDRA KAWACH\SAMUDRA_KAVACH.ico")
            ]
            for candidate in ico_candidates:
                if candidate.exists():
                    self.iconbitmap(str(candidate))
                    break
        except Exception:
            pass

        self.current_lang = "English"
        self.current_theme = "Dark"
        self.clipboard_after_id = None
        self.show_hidden = False
        self.current_page = "dashboard"
        try:
            self._save_user_state()
        except Exception: pass
        self.vault_data = []
        self.vault_key = None
        self.vault_unlocked = False
        self.secure_documents_data = {"subjects": []}
        self.secure_documents_unlocked = False
        self.secure_documents_key = None
        self._secure_documents_pending_subjects = []
        self._secure_documents_clipboard = None
        self._secure_document_temp_files = []
        self.last_breach_scan = None
        self.dashboard_clock_after_id = None
        self._tooltips = []
        self._tooltips_installed = False
        self._transition_after_id = None
        self._boot_after_id = None
        self._help_zoom = 1.0
        self._ui_zoom = 1.0
        self._ui_ready = False
        self.event_log = []
        self.score_history = []
        # Cache expensive credential analysis so vault unlock/dashboard refreshes stay responsive.
        self._dashboard_score_cache = None
        self._credential_health_cache = None
        self._app_start_monotonic = time.monotonic()
        self.settings = self.load_settings()
        self.settings.pop("theme", None)
        self.current_theme = "Dark"
        self._ensure_auth_store()
        self._authenticated = False
        self.current_role = None
        self.current_user_id = None
        self.event_log = []
        self.score_history = []
        self.breach_history = []
        self._user_state_file = None
        self.current_theme = "Dark"
        self.current_lang = self.settings.get("language", "English")
        self.clipboard_seconds = int(self.settings.get("clipboard_timeout", CLIPBOARD_CLEAR_SECONDS))
        self.apply_theme_colors()
        self.protocol("WM_DELETE_WINDOW", self.on_close)
        self.bind_all("<Control-plus>", lambda e: self.change_ui_zoom(0.1))
        self.bind_all("<Control-equal>", lambda e: self.change_ui_zoom(0.1))
        self.bind_all("<Control-minus>", lambda e: self.change_ui_zoom(-0.1))
        self.bind_all("<Control-0>", lambda e: self.set_ui_zoom(1.0))
        self.bind_all("<Control-MouseWheel>", self._ctrl_wheel_zoom)
        self.set_ui_zoom(float(self.settings.get("ui_zoom", 1.0)))
        self.after(10, self._finish_boot)

    # ========================================================
    # AUTHENTICATION / ROLE ACCESS / RECOVERY
    # ========================================================
    def _auth_password_hash(self, password, salt=None):
        salt = salt or secrets.token_bytes(16)
        try:
            digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 390000, dklen=32)
        except Exception:
            digest = hashlib.sha256(salt + password.encode("utf-8")).digest()
        return {"salt": base64.b64encode(salt).decode("ascii"), "hash": base64.b64encode(digest).decode("ascii")}

    def _verify_auth_password(self, password, record):
        try:
            salt = base64.b64decode(record["salt"], validate=True)
            expected = base64.b64decode(record["hash"], validate=True)
            actual = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 390000, dklen=len(expected))
            return hmac.compare_digest(actual, expected)
        except Exception:
            return False

    RECOVERY_QUESTIONS = [
        "What is your mother's middle name?",
        "What is your place of birth?",
        "What was the first bike you bought?",
        "What was your favourite subject in school?",
        "What are the last 4 digits of your father's mobile number?",
        "What was the name of your school?",
        "What is your favourite colour?",
        "What is your favourite song?",
        "What is your favourite book?",
        "What is your wife's favourite thing or hobby?",
    ]

    def _normalize_recovery_answer(self, answer):
        return re.sub(r"\s+", " ", str(answer or "").strip().casefold())

    def _hash_recovery_answer(self, answer):
        return self._auth_password_hash(self._normalize_recovery_answer(answer))

    def _verify_recovery_answer(self, answer, record):
        return self._verify_auth_password(self._normalize_recovery_answer(answer), record or {})

    def _new_totp_secret(self):
        return base64.b32encode(secrets.token_bytes(20)).decode("ascii").rstrip("=")

    def _totp_code(self, secret, counter=None):
        try:
            cleaned = re.sub(r"[\s\-]", "", secret or "").upper().rstrip("=")
            padded = cleaned + "=" * ((8 - len(cleaned) % 8) % 8)
            key = base64.b32decode(padded, casefold=True)
            counter = int(time.time() // 30) if counter is None else int(counter)
            msg = counter.to_bytes(8, "big")
            digest = hmac.new(key, msg, hashlib.sha1).digest()
            offset = digest[-1] & 0x0F
            value = int.from_bytes(digest[offset:offset + 4], "big") & 0x7FFFFFFF
            return f"{value % 1000000:06d}"
        except Exception:
            return None

    def _verify_totp(self, secret, code, window=1):
        code = str(code or "").strip()
        if not re.fullmatch(r"\d{6}", code):
            return False
        now = int(time.time() // 30)
        return any(hmac.compare_digest(self._totp_code(secret, now + offset) or "", code) for offset in range(-window, window + 1))

    def _load_auth_store(self):
        default = {"version": AUTH_VERSION, "admin": None, "individuals": {}, "recovery_requests": {}}
        try:
            if AUTH_FILE.exists():
                data = json.loads(AUTH_FILE.read_text(encoding="utf-8"))
                if isinstance(data, dict):
                    default.update(data)
        except Exception:
            pass
        default.setdefault("individuals", {})
        default.setdefault("recovery_requests", {})
        return default

    def _save_auth_store(self):
        try:
            VAULT_DIR.mkdir(parents=True, exist_ok=True)
            tmp = AUTH_FILE.with_suffix(".tmp")
            tmp.write_text(json.dumps(self.auth_store, indent=2), encoding="utf-8")
            os.replace(tmp, AUTH_FILE)
            return True
        except Exception:
            return False

    def _ensure_auth_store(self):
        self.auth_store = self._load_auth_store()

    def _user_storage_id(self, user_id):
        """Return a filesystem-safe, non-reversible storage namespace for a user ID."""
        raw = str(user_id or "").strip().lower().encode("utf-8")
        return hashlib.sha256(raw).hexdigest()[:32]

    def _user_dir(self, user_id=None):
        uid = user_id or self.current_user_id
        if not uid:
            return VAULT_DIR
        path = USER_DATA_DIR / self._user_storage_id(uid)
        path.mkdir(parents=True, exist_ok=True)
        return path

    def _active_vault_file(self, user_id=None):
        """Admin keeps the legacy JP Vault; each Individual gets an isolated vault file."""
        if (user_id or self.current_user_id) and self.current_role == "Individual" and user_id is None:
            return self._user_dir() / "vault.csgv"
        if user_id and user_id != self.current_user_id:
            return self._user_dir(user_id) / "vault.csgv"
        if self.current_role == "Individual":
            return self._user_dir() / "vault.csgv"
        return VAULT_FILE

    def _user_state_path(self, user_id=None):
        return self._user_dir(user_id) / "state.json"

    def _save_user_state(self):
        if not self.current_user_id:
            return
        try:
            path = self._user_state_path()
            payload = {
                "event_log": self.event_log[-80:],
                "score_history": self.score_history[-30:],
                "breach_history": self.breach_history[-20:],
            }
            tmp = path.with_suffix(".tmp")
            tmp.write_text(json.dumps(payload, indent=2), encoding="utf-8")
            os.replace(tmp, path)
        except Exception:
            pass

    def _load_user_state(self):
        self.event_log, self.score_history, self.breach_history = [], [], []
        if not self.current_user_id:
            return
        try:
            data = json.loads(self._user_state_path().read_text(encoding="utf-8"))
            if isinstance(data, dict):
                self.event_log = list(data.get("event_log", []))[-80:]
                self.score_history = list(data.get("score_history", []))[-30:]
                self.breach_history = list(data.get("breach_history", []))[-20:]
        except Exception:
            pass

    def _show_auth_screen(self):
        if hasattr(self, "_auth_overlay") and self._auth_overlay.winfo_exists():
            return
        self._authenticated = False
        self.current_role = None
        self.current_user_id = None
        self._auth_overlay = ctk.CTkFrame(self, fg_color="transparent", corner_radius=0)
        self._auth_overlay.place(relx=0, rely=0, relwidth=1, relheight=1)

        # --- LOGIN PAGE BACKGROUND ---
        # Keep the original login page, card, fields, buttons and behavior unchanged.
        # This is the supplied Indian Navy image, rendered as the full login-page background.
        self._login_watermark_label = None
        self._login_watermark_source = None
        self._login_watermark_ref = None
        if PIL_AVAILABLE:
            try:
                _raw_wm = base64.b64decode(_LOGIN_WATERMARK_B64)
                self._login_watermark_source = Image.open(io.BytesIO(_raw_wm)).convert("RGBA")
                self._login_watermark_label = tk.Label(
                    self._auth_overlay, bd=0, highlightthickness=0,
                    bg=self.BACKGROUND, cursor="arrow"
                )
                self._login_watermark_label.place(relx=0, rely=0, relwidth=1, relheight=1)

                def _fit_login_watermark(_event=None):
                    try:
                        if not self._login_watermark_label or not self._login_watermark_label.winfo_exists():
                            return
                        w = max(2, self._auth_overlay.winfo_width())
                        h = max(2, self._auth_overlay.winfo_height())
                        # Fit the complete supplied artwork inside the login window so
                        # the Navy logo, flags, aircraft, ship, submarine and "शं नो वरुणः"
                        # remain visible. A tiny matching sky margin is preferable to
                        # cropping important artwork at different window aspect ratios.
                        src = self._login_watermark_source.convert("RGB")
                        fitted = ImageOps.contain(src, (w, h), method=Image.Resampling.LANCZOS)
                        bg = Image.new("RGB", (w, h), (150, 205, 235))
                        x = (w - fitted.width) // 2
                        y = (h - fitted.height) // 2
                        bg.paste(fitted, (x, y))
                        wm = bg.convert("RGBA")
                        wm.putalpha(255)
                        self._login_watermark_ref = ImageTk.PhotoImage(wm)
                        self._login_watermark_label.configure(image=self._login_watermark_ref)
                    except Exception:
                        pass

                self._auth_overlay.bind("<Configure>", _fit_login_watermark, add="+")
                self._auth_overlay.after(80, _fit_login_watermark)
            except Exception:
                self._login_watermark_label = None
        # --- END LOGIN PAGE BACKGROUND ---
        self._auth_overlay.lift()

        # Lightweight window controls are part of the login surface; the normal OS title bar remains intact.
        controls = ctk.CTkFrame(self._auth_overlay, fg_color="transparent")
        controls.place(relx=1.0, rely=0.0, anchor="ne", x=-14, y=12)
        ctk.CTkButton(controls, text="—", width=38, height=30, fg_color=self.NAVY_LIGHT, hover_color=BLUE, command=self.iconify).pack(side="left", padx=3)
        ctk.CTkButton(controls, text="□", width=38, height=30, fg_color=self.NAVY_LIGHT, hover_color=PURPLE, command=self._toggle_login_maximize).pack(side="left", padx=3)
        ctk.CTkButton(controls, text="✕", width=38, height=30, fg_color=RED, hover_color="#A92F2F", command=self.on_close).pack(side="left", padx=3)

        card = ctk.CTkFrame(self._auth_overlay, fg_color=self.CARD, corner_radius=18, border_width=1, border_color=self.BORDER, width=560, height=540)
        card.place(relx=0.5, rely=0.5, y=150, anchor="center")
        ctk.CTkLabel(card, text="🛡", font=ctk.CTkFont(size=44), text_color=CYAN).pack(pady=(28, 4))
        ctk.CTkLabel(card, text=APP_NAME, font=ctk.CTkFont(size=25, weight="bold"), text_color=self.TEXT).pack()
        ctk.CTkLabel(card, text="Secure Login", font=ctk.CTkFont(size=13, weight="bold"), text_color=CYAN).pack(pady=(2, 18))

        mode = tk.StringVar(value="Individual")
        mode_row = ctk.CTkFrame(card, fg_color="transparent")
        mode_row.pack(fill="x", padx=45, pady=(0, 12))
        ctk.CTkButton(mode_row, text="Admin Login", command=lambda: select_mode("Admin"), width=200, fg_color=BLUE).pack(side="left", padx=4)
        ctk.CTkButton(mode_row, text="Individual Login", command=lambda: select_mode("Individual"), width=200, fg_color=PURPLE).pack(side="left", padx=4)

        self.auth_mode_label = ctk.CTkLabel(card, text="Individual Login", font=ctk.CTkFont(size=16, weight="bold"), text_color=self.TEXT)
        self.auth_mode_label.pack(pady=(4, 8))
        self.auth_user_entry = ctk.CTkEntry(card, width=410, height=40, placeholder_text="User ID", fg_color=self.ENTRY, text_color=self.TEXT)
        self.auth_user_entry.pack(pady=6)
        self.auth_pass_row = ctk.CTkFrame(card, fg_color="transparent")
        self.auth_pass_row.pack(fill="x", padx=75, pady=6)
        self.auth_pass_entry = ctk.CTkEntry(self.auth_pass_row, height=40, placeholder_text="Password", show="*", fg_color=self.ENTRY, text_color=self.TEXT)
        self.auth_pass_entry.pack(side="left", fill="x", expand=True)
        self.auth_pass_eye = ctk.CTkButton(self.auth_pass_row, text="👁", width=42, height=40, fg_color=self.NAVY, hover_color=BLUE, command=lambda: self._toggle_entry_visibility(self.auth_pass_entry, self.auth_pass_eye))
        self.auth_pass_eye.pack(side="right", padx=(6,0))
        self.auth_error = ctk.CTkLabel(card, text="", text_color=RED, wraplength=420)
        self.auth_error.pack(pady=5)
        self.auth_login_btn = ctk.CTkButton(card, text="Login", width=410, height=40, fg_color=GREEN, command=self._perform_login)
        self.auth_login_btn.pack(pady=6)
        self.auth_forgot_btn = ctk.CTkButton(card, text="Forgot User ID / Password", width=410, fg_color="transparent", text_color=CYAN, hover_color=self.NAVY_LIGHT, command=self._open_individual_recovery)
        self.auth_forgot_btn.pack(pady=2)
        self.auth_setup_btn = ctk.CTkButton(card, text="First-time Admin Setup", width=410, fg_color=self.NAVY_LIGHT, command=self._open_admin_setup)
        self.auth_setup_btn.pack(pady=(4, 10))
        self.auth_recovery_complete_btn = ctk.CTkButton(card, text="Enter Admin Recovery TOTP", width=410, fg_color=self.NAVY_LIGHT, command=self._open_recovery_completion_from_login)
        self.auth_recovery_complete_btn.pack(pady=(0, 10))
        self.auth_note = ctk.CTkLabel(card, text="Admin has full application access. Individual access is limited to normal user operation.", wraplength=430, text_color=self.MUTED)
        self.auth_note.pack(pady=(0, 18))

        def select_mode(role):
            mode.set(role)
            self.auth_mode_label.configure(text=f"{role} Login")
            self.auth_user_entry.delete(0, "end")
            self.auth_pass_entry.delete(0, "end")
            self.auth_error.configure(text="")
            if role == "Admin":
                self.auth_user_entry.configure(placeholder_text="Admin User ID")
                self.auth_forgot_btn.configure(text="Forgot Admin Password", command=self._open_admin_recovery)
            else:
                self.auth_user_entry.configure(placeholder_text="Individual User ID")
                self.auth_forgot_btn.configure(text="Forgot User ID / Password", command=self._open_individual_recovery)

        self._auth_selected_mode = mode
        select_mode("Individual")
        self.auth_user_entry.bind("<Return>", lambda e: self._perform_login())
        self.auth_pass_entry.bind("<Return>", lambda e: self._perform_login())
        self.auth_user_entry.focus_set()
        self._update_auth_setup_visibility()

    def _update_auth_setup_visibility(self):
        try:
            if self.auth_store.get("admin"):
                self.auth_setup_btn.pack_forget()
            else:
                self.auth_setup_btn.pack(pady=(4, 10))
        except Exception:
            pass

    def _open_admin_setup(self):
        if self.auth_store.get("admin"):
            messagebox.showinfo("Admin Setup", "An Admin account already exists.", parent=self._auth_overlay)
            return
        dialog = ctk.CTkToplevel(self._auth_overlay)
        dialog.title("First-time Admin Setup")
        dialog.geometry("520x500")
        dialog.transient(self)
        dialog.grab_set()
        ctk.CTkLabel(dialog, text="Create Administrator", font=ctk.CTkFont(size=21, weight="bold"), text_color=CYAN).pack(pady=(20, 12))
        user = ctk.CTkEntry(dialog, width=380, height=38, placeholder_text="Admin User ID", fg_color=self.ENTRY); user.pack(pady=7)
        p1 = ctk.CTkEntry(dialog, width=380, height=38, show="*", placeholder_text="Admin Password", fg_color=self.ENTRY); p1.pack(pady=7)
        self._attach_eye_to_entry(dialog, p1)
        p2 = ctk.CTkEntry(dialog, width=380, height=38, show="*", placeholder_text="Confirm Password", fg_color=self.ENTRY); p2.pack(pady=7)
        self._attach_eye_to_entry(dialog, p2)
        secret = self._new_totp_secret()
        ctk.CTkLabel(dialog, text="Admin TOTP Secret — save this in an authenticator app:", wraplength=420, text_color=self.MUTED).pack(pady=(12, 4))
        sec_entry = ctk.CTkEntry(dialog, width=380, height=38, fg_color=self.ENTRY); sec_entry.insert(0, secret); sec_entry.configure(state="readonly"); sec_entry.pack(pady=5)
        code_lbl = ctk.CTkLabel(dialog, text="", font=ctk.CTkFont(size=18, weight="bold"), text_color=GREEN); code_lbl.pack(pady=4)
        err = ctk.CTkLabel(dialog, text="", text_color=RED); err.pack(pady=4)
        def refresh_code():
            code_lbl.configure(text=f"Current TOTP: {self._totp_code(secret)}")
            if dialog.winfo_exists():
                dialog.after(1000, refresh_code)
        refresh_code()
        def save():
            uid, a, b = user.get().strip(), p1.get(), p2.get()
            if len(uid) < 3 or len(a) < 10:
                err.configure(text="Admin ID must be 3+ characters and password 10+ characters.")
                return
            if a != b:
                err.configure(text="Passwords do not match.")
                return
            self.auth_store["admin"] = {"username": uid, "password": self._auth_password_hash(a), "totp_secret": secret, "created": datetime.now().isoformat()}
            if not self._save_auth_store():
                err.configure(text="Could not save authentication data.")
                return
            dialog.destroy()
            self._update_auth_setup_visibility()
            self.auth_error.configure(text="Admin account created. Use Admin Login.")
            self.log_event("Administrator account created", "INFO")
        ctk.CTkButton(dialog, text="Create Admin Account", fg_color=GREEN, command=save).pack(pady=12)
        ctk.CTkButton(dialog, text="Cancel", fg_color=self.NAVY_LIGHT, command=dialog.destroy).pack(pady=2)

    def _toggle_login_maximize(self):
        try:
            if getattr(self, "_login_fullscreen", False):
                self.attributes("-fullscreen", False)
                self._login_fullscreen = False
            else:
                self.attributes("-fullscreen", True)
                self._login_fullscreen = True
        except Exception:
            try:
                self.state("zoomed" if self.state() != "zoomed" else "normal")
            except Exception:
                pass

    def _toggle_entry_visibility(self, entry, button):
        visible = entry.cget("show") == ""
        entry.configure(show="*" if visible else "")
        button.configure(text="👁" if visible else "🙈")

    def _attach_eye_to_entry(self, parent, entry, width=42):
        button = ctk.CTkButton(parent, text="👁", width=width, height=32, fg_color=self.NAVY, hover_color=BLUE)
        def position(_event=None):
            try:
                x = entry.winfo_x() + entry.winfo_width() - width - 3
                y = entry.winfo_y() + max(1, (entry.winfo_height()-32)//2)
                button.place(x=max(0,x), y=max(0,y))
            except Exception: pass
        button.configure(command=lambda: self._toggle_entry_visibility(entry, button))
        parent.bind("<Configure>", position, add="+")
        parent.after(80, position)
        return button

    def _perform_login(self):
        role = self._auth_selected_mode.get()
        uid = self.auth_user_entry.get().strip()
        pwd = self.auth_pass_entry.get()
        if role == "Admin":
            admin = self.auth_store.get("admin")
            if not admin or uid != admin.get("username") or not self._verify_auth_password(pwd, admin.get("password", {})):
                self.auth_error.configure(text="Invalid Admin User ID or Password.")
                return
            self.current_role, self.current_user_id = "Admin", uid
        else:
            rec = self.auth_store.get("individuals", {}).get(uid)
            if not rec or not self._verify_auth_password(pwd, rec.get("password", {})):
                self.auth_error.configure(text="Invalid Individual User ID or Password.")
                return
            self.current_role, self.current_user_id = "Individual", uid
        self._authenticated = True
        self._load_user_state()
        self.auth_error.configure(text="")
        self._auth_overlay.destroy()
        self.log_event(f"{self.current_role} login successful: {self.current_user_id}", "INFO")
        self._apply_role_access()
        self.show_page("dashboard", animate=False)
        try:
            self.logout_user_label.configure(text=self.current_user_id or "")
        except Exception:
            pass

    def _apply_role_access(self):
        # Existing modules remain unchanged. Only role-based visibility is added.
        admin = self.current_role == "Admin"
        if hasattr(self, "admin_console_btn"):
            if admin:
                self.admin_console_btn.pack(fill="x", padx=10, pady=(0, 6), before=self.settings_btn)
            else:
                self.admin_console_btn.pack_forget()
        if not hasattr(self, "logout_user_label"):
            self.logout_user_label = ctk.CTkLabel(self.sidebar, text="", font=ctk.CTkFont(size=11, weight="bold"), text_color=self.ACCENT3)
            self.logout_user_label.pack(side="bottom", fill="x", padx=10, pady=(5, 2))
        if not hasattr(self, "logout_btn"):
            self.logout_btn = ctk.CTkButton(self.sidebar, text="↪ Logout", height=34, fg_color=RED, hover_color=ORANGE, command=self.logout)
            self.logout_btn.pack(side="bottom", fill="x", padx=10, pady=(0, 5))
        try:
            label_text = f"{self.current_user_id}" if self.current_user_id else ""
            self.logout_user_label.configure(text=label_text)
        except Exception:
            pass

    def _request_vault_recovery(self):
        if self.current_role != "Individual" or not self.current_user_id:
            return
        rid=secrets.token_hex(4).upper()
        self.auth_store.setdefault("recovery_requests", {})[rid]={"type":"vault","user_id":self.current_user_id,"created":time.time(),"expires":time.time()+600,"used":False}
        self._save_auth_store()
        messagebox.showinfo("Vault Recovery Requested",f"Recovery request created.\n\nRequest ID: {rid}\n\nAsk the Administrator to open Admin Console and use Reset Vault for your User ID. The Administrator should give you the new master password securely.",parent=self)

    def _open_individual_recovery(self):
        dialog = ctk.CTkToplevel(self)
        dialog.title("Individual Account Recovery")
        dialog.geometry("650x650")
        dialog.transient(self); dialog.grab_set()
        ctk.CTkLabel(dialog, text="Individual Account Recovery", font=ctk.CTkFont(size=20, weight="bold"), text_color=CYAN).pack(pady=(18, 6))
        ctk.CTkLabel(dialog, text="Enter your User ID and answer all 3 registered security questions.", wraplength=560, text_color=self.MUTED).pack(pady=(0, 8))

        body = ctk.CTkScrollableFrame(dialog, fg_color="transparent")
        body.pack(fill="both", expand=True, padx=18, pady=4)
        ident = ctk.CTkEntry(body, width=500, height=38, placeholder_text="Individual User ID", fg_color=self.ENTRY)
        ident.pack(pady=(4, 10))

        question_rows = []
        question_widgets = []
        for idx in range(3):
            row = ctk.CTkFrame(body, fg_color=self.CARD, corner_radius=10, border_width=1, border_color=self.BORDER)
            row.pack(fill="x", pady=6, padx=2)
            label = ctk.CTkLabel(row, text=f"Question {idx + 1}", font=ctk.CTkFont(size=12, weight="bold"), text_color=self.TEXT)
            label.pack(anchor="w", padx=12, pady=(9, 3))
            q_label = ctk.CTkLabel(row, text="Enter User ID first", wraplength=470, justify="left", text_color=self.MUTED)
            q_label.pack(anchor="w", padx=12, pady=(0, 5))
            ans = ctk.CTkEntry(row, width=470, height=36, placeholder_text="Your answer", fg_color=self.ENTRY)
            ans.pack(padx=12, pady=(0, 10))
            question_rows.append(q_label)
            question_widgets.append(ans)

        err = ctk.CTkLabel(body, text="", text_color=RED, wraplength=520)
        err.pack(pady=5)

        def load_questions():
            uid = ident.get().strip()
            rec = self.auth_store.get("individuals", {}).get(uid)
            if not rec:
                for q in question_rows: q.configure(text="Account not found.")
                return
            saved = rec.get("recovery_questions", [])
            if len(saved) != 3:
                for q in question_rows: q.configure(text="Recovery questions are not configured for this account. Contact the Administrator.")
                return
            for i, item in enumerate(saved):
                question_rows[i].configure(text=item.get("question", ""))

        ident.bind("<KeyRelease>", lambda e: load_questions())
        load_questions()

        def reset_password():
            uid = ident.get().strip()
            rec = self.auth_store.get("individuals", {}).get(uid)
            if not rec:
                err.configure(text="Invalid Individual User ID."); return
            saved = rec.get("recovery_questions", [])
            if len(saved) != 3:
                err.configure(text="Recovery questions are not configured. Contact the Administrator."); return
            for i, (saved_item, ans_widget) in enumerate(zip(saved, question_widgets)):
                if not ans_widget.get().strip():
                    err.configure(text=f"Please answer Question {i + 1}."); return
                if not self._verify_recovery_answer(ans_widget.get(), saved_item.get("answer", {})):
                    err.configure(text="One or more answers are incorrect."); return

            reset = ctk.CTkToplevel(dialog)
            reset.title("Set New Password")
            reset.geometry("460x300")
            reset.transient(dialog); reset.grab_set()
            ctk.CTkLabel(reset, text="Create New Password", font=ctk.CTkFont(size=19, weight="bold"), text_color=CYAN).pack(pady=(20, 12))
            p1 = ctk.CTkEntry(reset, width=340, height=40, show="*", placeholder_text="New Password", fg_color=self.ENTRY); p1.pack(pady=7)
            self._attach_eye_to_entry(reset, p1)
            p2 = ctk.CTkEntry(reset, width=340, height=40, show="*", placeholder_text="Confirm New Password", fg_color=self.ENTRY); p2.pack(pady=7)
            self._attach_eye_to_entry(reset, p2)
            reset_err = ctk.CTkLabel(reset, text="", text_color=RED); reset_err.pack(pady=4)
            def save_new():
                a, b = p1.get(), p2.get()
                if len(a) < 10:
                    reset_err.configure(text="Password must be at least 10 characters."); return
                if a != b:
                    reset_err.configure(text="Passwords do not match."); return
                rec["password"] = self._auth_password_hash(a)
                self._append_password_history(rec, "Security Questions Recovery")
                if not self._save_auth_store():
                    reset_err.configure(text="Could not save the new password."); return
                self.log_event(f"Individual password reset through security questions: {uid}", "INFO")
                reset.destroy(); dialog.destroy()
                messagebox.showinfo("Password Reset", "Password reset completed. You can now login with the new password.", parent=self)
            ctk.CTkButton(reset, text="Set New Password", fg_color=GREEN, command=save_new).pack(pady=10)
            ctk.CTkButton(reset, text="Cancel", fg_color=self.NAVY_LIGHT, command=reset.destroy).pack()

        ctk.CTkButton(dialog, text="Verify Answers & Reset Password", fg_color=GREEN, command=reset_password).pack(pady=(6, 6))
        ctk.CTkButton(dialog, text="Cancel", fg_color=self.NAVY_LIGHT, command=dialog.destroy).pack(pady=(0, 12))

    def _open_recovery_completion_from_login(self):
        dialog=ctk.CTkToplevel(self); dialog.title("Complete Individual Recovery"); dialog.geometry("520x480"); dialog.transient(self); dialog.grab_set()
        ctk.CTkLabel(dialog,text="Complete Individual Recovery",font=ctk.CTkFont(size=20,weight="bold"),text_color=CYAN).pack(pady=(20,10))
        rid=ctk.CTkEntry(dialog,width=350,height=40,placeholder_text="Recovery Request ID",fg_color=self.ENTRY); rid.pack(pady=7)
        code=ctk.CTkEntry(dialog,width=350,height=40,placeholder_text="6-digit Admin TOTP",fg_color=self.ENTRY); code.pack(pady=7)
        p1=ctk.CTkEntry(dialog,width=350,height=40,show="*",placeholder_text="New Password",fg_color=self.ENTRY); p1.pack(pady=7)
        self._attach_eye_to_entry(dialog, p1)
        p2=ctk.CTkEntry(dialog,width=350,height=40,show="*",placeholder_text="Confirm New Password",fg_color=self.ENTRY); p2.pack(pady=7)
        self._attach_eye_to_entry(dialog, p2)
        err=ctk.CTkLabel(dialog,text="",text_color=RED); err.pack(pady=4)
        def submit():
            req=self.auth_store.get("recovery_requests",{}).get(rid.get().strip().upper())
            if not req:
                err.configure(text="Invalid Recovery Request ID."); return
            if p1.get()!=p2.get(): err.configure(text="Passwords do not match."); return
            if self._complete_individual_recovery(rid.get().strip().upper(),code.get(),p1.get(),dialog):
                dialog.destroy()
        ctk.CTkButton(dialog,text="Set New Password",fg_color=GREEN,command=submit).pack(pady=10)
        ctk.CTkButton(dialog,text="Cancel",fg_color=self.NAVY_LIGHT,command=dialog.destroy).pack()

    def _open_admin_recovery(self):
        dialog=ctk.CTkToplevel(self); dialog.title("Admin Password Recovery"); dialog.geometry("520x360"); dialog.transient(self); dialog.grab_set()
        ctk.CTkLabel(dialog,text="Admin Password Recovery",font=ctk.CTkFont(size=20,weight="bold"),text_color=CYAN).pack(pady=(20,10))
        ctk.CTkLabel(dialog,text="This recovery requires the administrator TOTP secret. The current TOTP is shown only after the existing admin password is authenticated, so if both are lost a local account reset is required.",wraplength=450,text_color=self.MUTED).pack(pady=8)
        ctk.CTkLabel(dialog,text="For security, contact the system owner and use the First-time Admin Setup only on a fresh installation.",wraplength=440,text_color=YELLOW).pack(pady=8)
        ctk.CTkButton(dialog,text="Close",fg_color=self.NAVY_LIGHT,command=dialog.destroy).pack(pady=15)

    def _open_individual_registration(self, parent, refresh_users):
        dialog = ctk.CTkToplevel(parent)
        dialog.title("Create Individual Account")
        dialog.geometry("700x760")
        dialog.transient(parent); dialog.grab_set()
        ctk.CTkLabel(dialog, text="Create Individual Account", font=ctk.CTkFont(size=21, weight="bold"), text_color=CYAN).pack(pady=(18, 6))
        ctk.CTkLabel(dialog, text="Select any 3 different questions from the 10 available questions and set answers.", wraplength=610, text_color=self.MUTED).pack(pady=(0, 8))
        body = ctk.CTkScrollableFrame(dialog, fg_color="transparent")
        body.pack(fill="both", expand=True, padx=18, pady=4)
        uid = ctk.CTkEntry(body, width=560, height=38, placeholder_text="New User ID", fg_color=self.ENTRY); uid.pack(pady=6)
        name = ctk.CTkEntry(body, width=560, height=38, placeholder_text="Display Name", fg_color=self.ENTRY); name.pack(pady=6)
        pwd = ctk.CTkEntry(body, width=560, height=38, show="*", placeholder_text="Temporary Password", fg_color=self.ENTRY); pwd.pack(pady=6)
        self._attach_eye_to_entry(body, pwd)

        selectors=[]; answers=[]
        for idx in range(3):
            ctk.CTkLabel(body,text=f"Recovery Question {idx+1}",font=ctk.CTkFont(size=13,weight="bold"),text_color=self.TEXT).pack(anchor="w",padx=12,pady=(12,4))
            combo=ctk.CTkComboBox(body,width=560,height=38,values=self.RECOVERY_QUESTIONS,fg_color=self.ENTRY,button_color=BLUE,button_hover_color=PURPLE)
            combo.set(self.RECOVERY_QUESTIONS[idx]); combo.pack(pady=4)
            ans=ctk.CTkEntry(body,width=560,height=38,placeholder_text=f"Answer for Question {idx+1}",fg_color=self.ENTRY); ans.pack(pady=4)
            selectors.append(combo); answers.append(ans)

        err=ctk.CTkLabel(body,text="",text_color=RED,wraplength=580); err.pack(pady=6)
        def save():
            u,n,p=uid.get().strip(),name.get().strip(),pwd.get()
            qs=[x.get().strip() for x in selectors]; ans=[x.get().strip() for x in answers]
            if len(u)<3 or len(p)<10:
                err.configure(text="User ID must be 3+ characters and password must be 10+ characters."); return
            if u in self.auth_store.get("individuals",{}):
                err.configure(text="User ID already exists."); return
            if len(set(qs)) != 3:
                err.configure(text="Please select 3 different security questions."); return
            if any(not x for x in ans):
                err.configure(text="Please enter answers for all 3 security questions."); return
            self.auth_store.setdefault("individuals",{})[u]={
                "display_name":n or u,
                "password":self._auth_password_hash(p),
                "recovery_questions":[{"question":q,"answer":self._hash_recovery_answer(a)} for q,a in zip(qs,ans)],
                "created":datetime.now().isoformat(),
                "password_history":[self._rotation_entry(datetime.now(), "Account Created")]
            }
            if not self._save_auth_store():
                err.configure(text="Could not save authentication data."); return
            dialog.destroy(); refresh_users()
            messagebox.showinfo("Individual Account","Individual account created successfully with 3 recovery questions.",parent=parent)
        ctk.CTkButton(dialog,text="Create Individual Account",fg_color=GREEN,command=save).pack(pady=8)
        ctk.CTkButton(dialog,text="Cancel",fg_color=self.NAVY_LIGHT,command=dialog.destroy).pack(pady=(0,12))

    def open_admin_console(self):
        if self.current_role != "Admin":
            return
        dialog=ctk.CTkToplevel(self); dialog.title("Admin Console"); dialog.geometry("760x650"); dialog.transient(self); dialog.grab_set()
        ctk.CTkLabel(dialog,text="Administrator Console",font=ctk.CTkFont(size=22,weight="bold"),text_color=CYAN).pack(pady=(18,4))
        ctk.CTkLabel(dialog,text=f"Logged in as: {self.current_user_id}",text_color=self.MUTED).pack(pady=(0,12))
        users_frame=ctk.CTkFrame(dialog,fg_color=self.CARD,border_width=1,border_color=self.BORDER,corner_radius=12); users_frame.pack(fill="both",expand=True,padx=18,pady=8)
        ctk.CTkLabel(users_frame,text="Individual Users",font=ctk.CTkFont(size=15,weight="bold"),text_color=self.TEXT).pack(anchor="w",padx=14,pady=(12,5))
        listbox=ctk.CTkScrollableFrame(users_frame,fg_color="transparent",height=180); listbox.pack(fill="both",expand=True,padx=8,pady=4)
        def refresh_users():
            for w in listbox.winfo_children(): w.destroy()
            for uid,rec in self.auth_store.get("individuals",{}).items():
                row=ctk.CTkFrame(listbox,fg_color=self.CARD_DARK); row.pack(fill="x",pady=3)
                ctk.CTkLabel(row,text=f"{uid} — {rec.get('display_name','')}",text_color=self.TEXT).pack(side="left",padx=10,pady=7)
                ctk.CTkButton(row,text="Reset Password",width=120,fg_color=ORANGE,command=lambda u=uid:self._admin_reset_individual(u,dialog,refresh_users)).pack(side="right",padx=6,pady=4)
                ctk.CTkButton(row,text="Reset Vault",width=100,fg_color=PURPLE,command=lambda u=uid:self._admin_reset_vault_password(u)).pack(side="right",padx=4,pady=4)
                ctk.CTkButton(row,text="Delete",width=70,fg_color=RED,command=lambda u=uid:self._admin_delete_individual(u,dialog,refresh_users)).pack(side="right",padx=2,pady=4)
        refresh_users()
        form=ctk.CTkFrame(dialog,fg_color=self.CARD,border_width=1,border_color=self.BORDER,corner_radius=12); form.pack(fill="x",padx=18,pady=8)
        ctk.CTkLabel(form,text="Individual Registration",font=ctk.CTkFont(size=14,weight="bold"),text_color=self.TEXT).pack(side="left",padx=12,pady=12)
        ctk.CTkButton(form,text="Create Individual + Set 3 Recovery Questions",fg_color=GREEN,command=lambda:self._open_individual_registration(dialog,refresh_users)).pack(side="right",padx=10,pady=10)
        rec_frame=ctk.CTkFrame(dialog,fg_color=self.CARD,border_width=1,border_color=self.BORDER,corner_radius=12); rec_frame.pack(fill="x",padx=18,pady=8)
        ctk.CTkLabel(rec_frame,text="Recovery Requests",font=ctk.CTkFont(size=15,weight="bold"),text_color=self.TEXT).pack(anchor="w",padx=14,pady=(10,5))
        rec_list=ctk.CTkScrollableFrame(rec_frame,fg_color="transparent",height=110); rec_list.pack(fill="x",padx=8,pady=4)
        def refresh_recovery():
            for w in rec_list.winfo_children(): w.destroy()
            now=time.time()
            for rid,req in list(self.auth_store.get("recovery_requests",{}).items()):
                if req.get("used") or req.get("expires",0)<now:
                    continue
                row=ctk.CTkFrame(rec_list,fg_color=self.CARD_DARK); row.pack(fill="x",pady=3)
                req_type = req.get("type", "account")
                label = "Vault" if req_type == "vault" else "Account"
                ctk.CTkLabel(row,text=f"{rid} — {req.get('user_id')} [{label}]",text_color=self.TEXT).pack(side="left",padx=8,pady=6)
                if req_type == "vault":
                    ctk.CTkButton(row,text="Reset Vault",width=110,fg_color=PURPLE,command=lambda r=req.get('user_id'):self._admin_reset_vault_password(r)).pack(side="right",padx=6,pady=4)
                else:
                    ctk.CTkButton(row,text="Generate TOTP",width=125,fg_color=BLUE,command=lambda r=rid:self._admin_generate_recovery_totp(r,dialog)).pack(side="right",padx=6,pady=4)
        refresh_recovery()
        ctk.CTkButton(dialog,text="Refresh Recovery Requests",fg_color=self.NAVY_LIGHT,command=refresh_recovery).pack(pady=7)
        ctk.CTkButton(dialog,text="Reset JP Vault Master Password",fg_color=PURPLE,command=self._admin_reset_vault_password).pack(pady=7)
        ctk.CTkButton(dialog,text="Close",fg_color=self.NAVY_LIGHT,command=dialog.destroy).pack(pady=(4,14))

    def _rotation_entry(self, created=None, changed_by="System"):
        dt = created or datetime.now()
        if isinstance(dt, str):
            try: dt = datetime.fromisoformat(dt)
            except Exception: dt = datetime.now()
        return {"created": dt.isoformat(), "changed_by": changed_by}

    def _append_password_history(self, record, changed_by="System"):
        history = record.setdefault("password_history", [])
        now = datetime.now()
        if history:
            try:
                history[-1]["expires"] = now.isoformat()
            except Exception:
                pass
        history.append(self._rotation_entry(now, changed_by))
        record["password_history"] = history[-20:]

    def _admin_reset_individual(self, uid, parent, refresh):
        rec=self.auth_store.get("individuals",{}).get(uid)
        if not rec:return
        p=ctk.CTkInputDialog(text=f"Enter a new password for {uid} (10+ characters):",title="Reset Individual Password").get_input()
        if p and len(p)>=10:
            rec["password"]=self._auth_password_hash(p); self._append_password_history(rec, "Administrator Reset"); self._save_auth_store(); self.log_event(f"Admin reset Individual password: {uid}","INFO"); refresh()
        elif p: messagebox.showwarning("Admin","Password must be at least 10 characters.",parent=parent)

    def _admin_delete_individual(self, uid, parent, refresh):
        if messagebox.askyesno("Delete User",f"Delete Individual account '{uid}'?",parent=parent):
            self.auth_store.get("individuals",{}).pop(uid,None); self._save_auth_store(); self.log_event(f"Admin deleted Individual account: {uid}","WARNING"); refresh()

    def _admin_generate_recovery_totp(self, rid, parent):
        req=self.auth_store.get("recovery_requests",{}).get(rid)
        if not req or req.get("used") or req.get("expires",0)<time.time():
            messagebox.showwarning("Recovery","Recovery request is expired or already used.",parent=parent); return
        secret=self.auth_store.get("admin",{}).get("totp_secret")
        code=self._totp_code(secret)
        messagebox.showinfo("Admin Recovery TOTP",f"User: {req.get('user_id')}\nRequest ID: {rid}\n\nCurrent Admin Recovery TOTP:\n\n{code}\n\nGive this code to the Individual. It expires with the current TOTP window.",parent=parent)

    def _admin_reset_vault_password(self, target_uid=None):
        if self.current_role != "Admin":
            return
        target_uid = target_uid or self.current_user_id
        target_is_individual = target_uid != self.current_user_id or target_uid in self.auth_store.get("individuals", {})
        vault_path = self._active_vault_file(target_uid) if target_is_individual else VAULT_FILE
        title = f"Reset Vault Master Password — {target_uid}" if target_is_individual else "Reset JP Vault Master Password"
        dialog=ctk.CTkToplevel(self); dialog.title(title); dialog.geometry("540x410"); dialog.transient(self); dialog.grab_set()
        ctk.CTkLabel(dialog,text=title,font=ctk.CTkFont(size=18,weight="bold"),text_color=CYAN).pack(pady=(20,10))
        ctk.CTkLabel(dialog,text="The existing encrypted vault data will be preserved when a valid recovery envelope is available.",wraplength=460,text_color=self.MUTED).pack(pady=5)
        p1=ctk.CTkEntry(dialog,width=360,height=40,show="*",placeholder_text="New Master Password",fg_color=self.ENTRY); p1.pack(pady=8)
        self._attach_eye_to_entry(dialog, p1)
        p2=ctk.CTkEntry(dialog,width=360,height=40,show="*",placeholder_text="Confirm New Master Password",fg_color=self.ENTRY); p2.pack(pady=8)
        self._attach_eye_to_entry(dialog, p2)
        err=ctk.CTkLabel(dialog,text="",text_color=RED); err.pack(pady=4)
        def save():
            a,b=p1.get(),p2.get()
            if len(a)<10: err.configure(text="Master password must be at least 10 characters."); return
            if a!=b: err.configure(text="Passwords do not match."); return
            try:
                if not vault_path.exists():
                    err.configure(text="This user's vault does not exist yet."); return
                old_payload=json.loads(vault_path.read_text(encoding="utf-8"))
                data=None
                if (not target_is_individual) and self.vault_unlocked:
                    data=self.vault_data
                elif target_is_individual and target_uid == self.current_user_id and self.vault_unlocked:
                    data=self.vault_data
                elif old_payload.get("version")==2 and old_payload.get("admin_recovery"):
                    recovery_key=self._derive_admin_recovery_key()
                    if not recovery_key:
                        err.configure(text="Admin recovery key is unavailable."); return
                    data=json.loads(Fernet(recovery_key).decrypt(old_payload["admin_recovery"].encode("utf-8")).decode("utf-8"))
                    if not isinstance(data,list): raise ValueError("Invalid vault recovery data")
                else:
                    err.configure(text="This vault has no Admin recovery envelope. It must be unlocked once with its current master password first."); return
                salt=base64.b64decode(old_payload["salt"]) if old_payload.get("salt") else None
                history = list(old_payload.get("password_history", []))
                if history:
                    history[-1]["expires"] = datetime.now().isoformat()
                history.append(self._rotation_entry(datetime.now(), "Administrator Reset"))
                payload=self.encrypt_vault_payload(data,a,salt=salt,password_history=history)
                vault_path.parent.mkdir(parents=True, exist_ok=True)
                temp=vault_path.with_suffix(".reset.tmp"); temp.write_text(json.dumps(payload,indent=2),encoding="utf-8"); os.replace(temp,vault_path)
                if target_uid == self.current_user_id:
                    self.vault_key=a; self.vault_data=data; self.vault_unlocked=True
                    self._dashboard_score_cache=None; self._credential_health_cache=None
                    self.refresh_vault_view(); self.refresh_dashboard()
                self.log_event(f"Admin reset vault master password: {target_uid}","WARNING")
                dialog.destroy()
                messagebox.showinfo("Vault Recovery",f"Vault master password for {target_uid} has been reset. Existing vault data is preserved.",parent=self)
            except Exception as exc:
                err.configure(text=f"Recovery failed: {exc}")
        ctk.CTkButton(dialog,text="Set New Master Password",fg_color=GREEN,command=save).pack(pady=10)
        ctk.CTkButton(dialog,text="Cancel",fg_color=self.NAVY_LIGHT,command=dialog.destroy).pack()

    def _complete_individual_recovery(self, rid, code, new_password, parent):
        req=self.auth_store.get("recovery_requests",{}).get(rid)
        if not req or req.get("used") or req.get("expires",0)<time.time():
            messagebox.showerror("Recovery","Recovery request is expired or invalid.",parent=parent); return False
        secret=self.auth_store.get("admin",{}).get("totp_secret")
        if not self._verify_totp(secret, code):
            messagebox.showerror("Recovery","Invalid Admin Recovery TOTP.",parent=parent); return False
        if len(new_password)<10:
            messagebox.showwarning("Recovery","New password must be at least 10 characters.",parent=parent); return False
        uid=req["user_id"]; self.auth_store["individuals"][uid]["password"]=self._auth_password_hash(new_password); self._append_password_history(self.auth_store["individuals"][uid], "Administrator Recovery"); req["used"]=True; self._save_auth_store()
        messagebox.showinfo("Recovery","Password reset completed. You can now login with the new password.",parent=parent)
        return True

    def _open_recovery_code_entry(self, rid, uid):
        dialog=ctk.CTkToplevel(self); dialog.title("Complete Account Recovery"); dialog.geometry("520x420"); dialog.transient(self); dialog.grab_set()
        ctk.CTkLabel(dialog,text=f"Reset Password — {uid}",font=ctk.CTkFont(size=19,weight="bold"),text_color=CYAN).pack(pady=(20,12))
        code=ctk.CTkEntry(dialog,width=350,height=40,placeholder_text="6-digit Admin TOTP",fg_color=self.ENTRY); code.pack(pady=8)
        p1=ctk.CTkEntry(dialog,width=350,height=40,show="*",placeholder_text="New Password",fg_color=self.ENTRY); p1.pack(pady=8)
        self._attach_eye_to_entry(dialog, p1)
        p2=ctk.CTkEntry(dialog,width=350,height=40,show="*",placeholder_text="Confirm New Password",fg_color=self.ENTRY); p2.pack(pady=8)
        self._attach_eye_to_entry(dialog, p2)
        err=ctk.CTkLabel(dialog,text="",text_color=RED); err.pack(pady=5)
        def submit():
            if p1.get()!=p2.get(): err.configure(text="Passwords do not match."); return
            if self._complete_individual_recovery(rid,code.get(),p1.get(),dialog): dialog.destroy()
        ctk.CTkButton(dialog,text="Set New Password",fg_color=GREEN,command=submit).pack(pady=10)

    # ========================================================
    # SOC TELEMETRY / AUDIT HISTORY
    # ========================================================
    def log_event(self, event, severity="INFO"):
        item = {"time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"), "severity": severity, "event": str(event)[:180]}
        self.event_log.append(item)
        self.event_log = self.event_log[-80:]
        # Keep runtime activity in memory; avoid synchronous disk writes on every UI action.
        if hasattr(self, "event_text"):
            self.refresh_dashboard()

    def record_score(self, score):
        now = datetime.now().strftime("%H:%M:%S")
        if not self.score_history or self.score_history[-1].get("score") != int(score):
            self.score_history.append({"time": now, "score": int(score)})
            self.score_history = self.score_history[-30:]
            self._save_user_state()

    def credential_health(self):
        if self._credential_health_cache is not None:
            return self._credential_health_cache
        stats = {"strong": 0, "weak": 0, "breached": 0, "expiring": 0, "total": 0}
        if not self.vault_unlocked:
            self._credential_health_cache = stats
            return stats
        stats["total"] = len(self.vault_data)
        for item in self.vault_data:
            result = self.analyze_password(item.get("password", ""))
            if result.get("score", 0) >= 80:
                stats["strong"] += 1
            else:
                stats["weak"] += 1
            if item.get("breached", False):
                stats["breached"] += 1
            try:
                created = datetime.strptime(item.get("created", ""), "%Y-%m-%d %H:%M:%S")
                if (datetime.now() - created).days >= 90:
                    stats["expiring"] += 1
            except Exception:
                pass
        self._credential_health_cache = stats
        return stats

    def open_advanced_generator(self):
        t = LANGUAGES[self.current_lang]
        win = ctk.CTkToplevel(self); win.title(t.get('adv_gen_title','Advanced Password Generator')); win.geometry('620x520'); win.transient(self); win.grab_set()
        ctk.CTkLabel(win, text='⚡  ' + t.get('adv_gen_title','Advanced Password Generator'), font=ctk.CTkFont(size=22, weight='bold'), text_color=CYAN).pack(pady=(18,6))
        ctk.CTkLabel(win, text=t.get('adv_gen_intro','Generate a credential using configurable length and character sets.'), wraplength=540, text_color=self.MUTED).pack(pady=(0,14))
        row = ctk.CTkFrame(win, fg_color='transparent'); row.pack(fill='x', padx=24, pady=8)
        ctk.CTkLabel(row, text=t.get('adv_length','Length'), width=180, anchor='w', text_color=self.TEXT).pack(side='left')
        length = ctk.CTkSlider(row, from_=12, to=64, number_of_steps=52, fg_color=self.BORDER, progress_color=BLUE); length.set(24); length.pack(side='left', fill='x', expand=True, padx=8)
        length_val = ctk.CTkLabel(row, text='24', width=40, text_color=self.TEXT); length_val.pack(side='right')
        length.configure(command=lambda v: length_val.configure(text=str(int(float(v)))))
        opts = {}
        for key, label in [('upper','adv_upper'),('lower','adv_lower'),('digits','adv_digits'),('symbols','adv_symbols')]:
            opts[key] = tk.BooleanVar(value=True)
            cb = ctk.CTkCheckBox(win, text=t.get(label,label), variable=opts[key], text_color=self.TEXT); cb.pack(anchor='w', padx=42, pady=5)
            self.bind_tooltip(cb, t.get(label,label) + ': include this character set in generated credentials.')
        result = ctk.CTkEntry(win, height=42, fg_color=self.ENTRY, text_color=self.TEXT); result.pack(fill='x', padx=24, pady=15)
        def generate_adv():
            groups=[]
            if opts['upper'].get(): groups.append(string.ascii_uppercase)
            if opts['lower'].get(): groups.append(string.ascii_lowercase)
            if opts['digits'].get(): groups.append(string.digits)
            if opts['symbols'].get(): groups.append(SYMBOLS)
            if not groups: return
            n=int(length.get()); chars=[secrets.choice(g) for g in groups]; pool=''.join(groups); chars += [secrets.choice(pool) for _ in range(n-len(chars))]; secrets.SystemRandom().shuffle(chars)
            value=''.join(chars); result.delete(0,'end'); result.insert(0,value); self.password_entry.delete(0,'end'); self.password_entry.insert(0,value); self.check_strength_live(); self.log_event('Advanced password generated','INFO')
        def copy_adv():
            value=result.get()
            if value:
                pyperclip.copy(value)
                if self.clipboard_after_id: self.after_cancel(self.clipboard_after_id)
                self.clipboard_after_id=self.after(self.clipboard_seconds*1000,self.clear_clipboard)
                self.log_event('Generated credential copied to clipboard','INFO')
        a=ctk.CTkFrame(win,fg_color='transparent'); a.pack(fill='x',padx=24,pady=8)
        gen=ctk.CTkButton(a,text=t.get('generate','Generate'),command=generate_adv,fg_color=BLUE); gen.pack(side='left',fill='x',expand=True,padx=4)
        cp=ctk.CTkButton(a,text=t.get('copy','Copy'),command=copy_adv,fg_color=self.NAVY); cp.pack(side='left',fill='x',expand=True,padx=4)
        close=ctk.CTkButton(a,text=t.get('close','Close'),command=win.destroy,fg_color=self.CARD_DARK); close.pack(side='left',fill='x',expand=True,padx=4)
        self.bind_tooltip(gen,t.get('generate','Generate')+': create a cryptographically random password using the selected character sets.')
        self.bind_tooltip(cp,t.get('copy','Copy')+': copy the generated credential; clipboard auto-clear remains active.')

    def export_professional_report(self):
        t=LANGUAGES[self.current_lang]; score,weak,breached=self.calculate_dashboard_score(); h=self.credential_health()
        path=filedialog.asksaveasfilename(initialdir=str(self._default_docs_dir()),defaultextension='.html',filetypes=[('HTML Security Report','*.html')])
        if not path:return
        events=''.join(f"<tr><td>{html.escape(x['time'])}</td><td>{html.escape(x['severity'])}</td><td>{html.escape(x['event'])}</td></tr>" for x in self.event_log[-20:][::-1])
        doc = """<!doctype html><html><head><meta charset="utf-8"><title>Cyber Security Guard SOC Report</title><style>body{font-family:Segoe UI,Arial;background:#0b0920;color:#f8f5ff;padding:35px}.card{background:#15133a;border:1px solid #51458d;border-radius:14px;padding:20px;margin:14px 0}h1{color:#32e6ff}.score{font-size:52px;color:#a98cff}table{width:100%;border-collapse:collapse}td,th{padding:9px;border-bottom:1px solid #40377a;text-align:left}</style></head><body><h1>CYBER SECURITY GUARD — SOC REPORT</h1><div class="card"><h2>Security Posture</h2><div class="score">%s/100</div><p>Weak: %s &nbsp; | &nbsp; Breached: %s &nbsp; | &nbsp; Vault: %s entries</p></div><div class="card"><h2>Credential Health</h2><p>Strong: %s | Needs attention: %s | Breached: %s | Aging/Expiring: %s</p></div><div class="card"><h2>Security Events</h2><table><tr><th>Time</th><th>Severity</th><th>Event</th></tr>%s</table></div><div class="card"><h2>Safety Notes</h2><p>No plaintext passwords are included in this report. Heuristic phishing results are not proof of safety. Protect exported reports as security-sensitive documents.</p></div></body></html>""" % (score, weak, breached, h['total'], h['strong'], h['weak'], h['breached'], h['expiring'], events)
        Path(path).write_text(doc,encoding='utf-8')
        self.log_event('Professional HTML security report exported','INFO')
        messagebox.showinfo(t.get('report','Security Report'),t.get('professional_report_saved','Professional security report exported.'))


    # ========================================================
    # SETTINGS / THEME
    # ========================================================
    def load_settings(self):
        try:
            if SETTINGS_FILE.exists():
                data = json.loads(SETTINGS_FILE.read_text(encoding="utf-8"))
                if isinstance(data, dict):
                    data.pop("theme", None)
                    return data
        except Exception:
            pass
        return {"language": "English", "clipboard_timeout": CLIPBOARD_CLEAR_SECONDS}

    def save_settings_file(self):
        try:
            VAULT_DIR.mkdir(parents=True, exist_ok=True)
            self.settings.pop("theme", None)
            SETTINGS_FILE.write_text(json.dumps(self.settings, indent=2), encoding="utf-8")
        except Exception:
            pass

    def apply_theme_colors(self):
        global CYAN, BLUE, PURPLE, ORANGE
        t = THEMES[self.current_theme]
        self.BACKGROUND = t["BACKGROUND"]; self.NAVY = t["NAVY"]; self.NAVY_LIGHT = t["NAVY_LIGHT"]
        self.CARD = t["CARD"]; self.CARD_DARK = t["CARD_DARK"]; self.TEXT = t["TEXT"]; self.MUTED = t["MUTED"]
        self.ENTRY = t["ENTRY"]; self.BORDER = t["BORDER"]
        self.ACCENT = t["ACCENT"]; self.ACCENT2 = t["ACCENT2"]; self.ACCENT3 = t["ACCENT3"]; self.GOLD = t["GOLD"]
        CYAN, BLUE, PURPLE, ORANGE = self.ACCENT3, self.ACCENT, self.ACCENT2, self.GOLD
        self.configure(fg_color=self.BACKGROUND)
        try: ctk.set_appearance_mode("dark")
        except Exception: pass

    def _finish_boot(self):
        if hasattr(self, "_boot_frame"):
            try: self._boot_frame.destroy()
            except Exception: pass
        # Mark the UI ready BEFORE text/tooltip setup.  The old order could
        # leave _ui_ready=False if any UI refresh raised, disabling theme and hover.
        self._ui_ready = True
        self.build_shell()
        self.build_pages(fast=True)
        try:
            self.update_ui_texts()
        except Exception as exc:
            try: self.log_event(f"UI text refresh warning: {exc}", "ERROR")
            except Exception: pass
        self.after(900, self._lazy_install_tooltips)
        self.after(850, self.install_keyboard_navigation)
        self.log_event("Application started", "INFO")
        self.show_page("dashboard", animate=False)
        self._show_auth_screen()

    def _deferred_build_pages(self):
        if not getattr(self, "_ui_ready", False) or not self.winfo_exists():
            return
        # Heavy modules are intentionally lazy-built when the user opens them.
        # This keeps startup responsive without changing module functionality.
        try: self.install_keyboard_navigation()
        except Exception: pass

    def set_ui_zoom(self, value):
        try: value = max(0.80, min(1.60, float(value)))
        except Exception: value = 1.0
        self._ui_zoom = round(value, 2)
        try: ctk.set_widget_scaling(self._ui_zoom)
        except Exception: pass
        try:
            self.settings["ui_zoom"] = self._ui_zoom
            self.save_settings_file()
        except Exception: pass
        if hasattr(self, "zoom_label"):
            self.zoom_label.configure(text=f"{int(self._ui_zoom*100)}%")

    def change_ui_zoom(self, delta):
        self.set_ui_zoom(self._ui_zoom + delta)
        return "break"

    def _ctrl_wheel_zoom(self, event):
        self.change_ui_zoom(0.1 if event.delta > 0 else -0.1)
        return "break"

    def _lazy_install_tooltips(self):
        try:
            if self.winfo_exists() and not self._tooltips_installed:
                self.install_tooltips()
        except Exception:
            pass

    def change_language(self, new_lang):
        if new_lang not in LANGUAGES:
            return
        self.current_lang = new_lang
        self.settings["language"] = new_lang
        self.log_event(f"Interface language changed to {new_lang}", "INFO")
        self.save_settings_file()
        self.clear_tooltips()
        self.update_ui_texts()

    # ========================================================
    # KEYBOARD ACCESSIBILITY
    # ========================================================
    def install_keyboard_navigation(self):
        """Reliable keyboard traversal for CustomTkinter controls."""
        if not getattr(self,"_keyboard_navigation_installed",False):
            self._keyboard_navigation_installed=True
            self.bind_all("<Return>",self._keyboard_activate,add="+")
            self.bind_all("<KP_Enter>",self._keyboard_activate,add="+")
            self.bind_all("<space>",self._keyboard_activate,add="+")
            self.bind_all("<Tab>",self._keyboard_tab,add="+")
            self.bind_all("<Shift-Tab>",self._keyboard_shift_tab,add="+")
            self.bind_all("<Up>",self._keyboard_arrow,add="+")
            self.bind_all("<Down>",self._keyboard_arrow,add="+")
            self.bind_all("<Left>",self._keyboard_arrow,add="+")
            self.bind_all("<Right>",self._keyboard_arrow,add="+")
        self._mark_keyboard_focusables(self)

    def _keyboard_widgets(self):
        result=[]
        def walk(root):
            for w in root.winfo_children():
                cls=w.__class__.__name__
                if cls in ("CTkButton","CTkCheckBox","CTkSwitch","CTkSlider","CTkEntry","CTkOptionMenu") and w.winfo_viewable() and str(w.cget("state"))!="disabled": result.append(w)
                walk(w)
        try: walk(self)
        except Exception: pass
        return result

    def _mark_keyboard_focusables(self,root):
        for widget in root.winfo_children():
            cls=widget.__class__.__name__
            if cls in ("CTkButton","CTkCheckBox","CTkSwitch","CTkSlider","CTkEntry","CTkOptionMenu"):
                try: widget.configure(takefocus=1)
                except Exception: pass
                if not getattr(widget,"_csg_keyboard_bound",False):
                    try:
                        if cls=="CTkButton":
                            for seq in ("<Return>","<KP_Enter>","<space>"): widget.bind(seq,lambda e,w=widget:(w.invoke(),"break")[1],add="+")
                        elif cls in ("CTkCheckBox","CTkSwitch"):
                            for seq in ("<Return>","<KP_Enter>","<space>"): widget.bind(seq,lambda e,w=widget:(w.toggle(),"break")[1],add="+")
                        widget._csg_keyboard_bound=True
                    except Exception: pass
            try: self._mark_keyboard_focusables(widget)
            except Exception: pass

    def _keyboard_activate(self,event=None):
        w=self.focus_get(); cls=w.__class__.__name__ if w else ""
        if cls=="CTkButton":
            try: w.invoke(); return "break"
            except Exception: pass
        if cls in ("CTkCheckBox","CTkSwitch"):
            try: w.toggle(); return "break"
            except Exception: pass
        return None

    def _keyboard_tab(self,event=None):
        if event and event.widget.__class__.__name__ in ("CTkEntry","CTkTextbox") and event.keysym!="Tab": return None
        ws=self._keyboard_widgets(); w=self.focus_get()
        if not ws: return "break"
        try: idx=ws.index(w)
        except ValueError: idx=-1
        ws[(idx+1)%len(ws)].focus_set(); return "break"

    def _keyboard_shift_tab(self,event=None):
        ws=self._keyboard_widgets(); w=self.focus_get()
        if not ws: return "break"
        try: idx=ws.index(w)
        except ValueError: idx=0
        ws[(idx-1)%len(ws)].focus_set(); return "break"

    def _keyboard_arrow(self,event=None):
        w=self.focus_get(); cls=w.__class__.__name__ if w else ""
        if cls in ("CTkEntry","CTkTextbox"): return None
        if cls not in ("CTkButton","CTkCheckBox","CTkSwitch","CTkOptionMenu"): return None
        ws=self._keyboard_widgets();
        try: idx=ws.index(w)
        except ValueError: idx=0
        step=1 if event and event.keysym in ("Down","Right") else -1
        ws[(idx+step)%len(ws)].focus_set(); return "break"

    # ========================================================
    # SHELL / NAVIGATION
    # ========================================================
    def build_shell(self):
        self.grid_rowconfigure(1, weight=1)
        self.grid_columnconfigure(1, weight=1)

        self.header = ctk.CTkFrame(self, fg_color=self.NAVY, corner_radius=0, height=82)
        self.header.grid(row=0, column=0, columnspan=2, sticky="nsew")
        self.header.grid_columnconfigure(1, weight=1)

        ctk.CTkLabel(self.header, text="🛡", font=ctk.CTkFont(size=34), text_color=CYAN).grid(
            row=0, column=0, rowspan=2, padx=(20, 10), pady=10
        )
        self.title_label = ctk.CTkLabel(self.header, text="", font=ctk.CTkFont(size=21, weight="bold"), text_color="white")
        self.title_label.grid(row=0, column=1, sticky="w", pady=(12, 0))
        self.subtitle_label = ctk.CTkLabel(self.header, text="", font=ctk.CTkFont(size=10, weight="bold"), text_color=CYAN)
        self.subtitle_label.grid(row=1, column=1, sticky="w", pady=(0, 10))

        defense_box = ctk.CTkFrame(self.header, fg_color=self.CARD_DARK, corner_radius=10, border_width=1, border_color=self.BORDER)
        defense_box.grid(row=0, column=2, rowspan=2, padx=10, pady=15)
        self.status_label = ctk.CTkLabel(defense_box, text="● SYSTEM PROTECTED", font=ctk.CTkFont(size=10, weight="bold"), text_color=GREEN)
        self.status_label.pack(padx=12, pady=(7, 1))
        self.defense_mode_label = ctk.CTkLabel(defense_box, text="", font=ctk.CTkFont(size=8, weight="bold"), text_color=CYAN)
        self.defense_mode_label.pack(padx=12, pady=(0, 7))
        self.lang_dropdown = ctk.CTkOptionMenu(
            self.header, values=list(LANGUAGES.keys()), width=145, fg_color=BLUE,
            button_color=self.NAVY_LIGHT, button_hover_color=CYAN, dropdown_fg_color=self.NAVY,
            dropdown_hover_color=self.NAVY_LIGHT, command=self.change_language,
        )
        self.lang_dropdown.grid(row=0, column=4, rowspan=2, padx=(5, 8))
        self.zoom_label = ctk.CTkLabel(self.header, text=f"{int(self._ui_zoom*100)}%", width=48, font=ctk.CTkFont(size=10, weight="bold"), text_color=self.GOLD)
        self.zoom_label.grid(row=0, column=5, rowspan=2, padx=(0, 15))

        self.sidebar = ctk.CTkFrame(self, fg_color=self.NAVY, corner_radius=0, width=220)
        self.sidebar.grid(row=1, column=0, sticky="nsew")
        self.sidebar.grid_propagate(False)

        self.content = ctk.CTkFrame(self, fg_color=self.BACKGROUND, corner_radius=0)
        self.content.grid(row=1, column=1, sticky="nsew", padx=0, pady=0)

        self.footer = ctk.CTkFrame(self, fg_color=self.NAVY, corner_radius=0, height=34)
        self.footer.grid(row=2, column=0, columnspan=2, sticky="nsew")
        self.footer.grid_columnconfigure(0, weight=1)
        self.version_label = ctk.CTkLabel(self.footer, text=f"{APP_NAME} {APP_VERSION}", font=ctk.CTkFont(size=10, weight="bold"), text_color="white")
        self.version_label.grid(row=0, column=0, padx=15, pady=7, sticky="w")
        self.dev_label = ctk.CTkLabel(self.footer, text=DEVELOPER, font=ctk.CTkFont(size=10, weight="bold"), text_color=CYAN)
        self.dev_label.grid(row=0, column=1, padx=15, pady=7, sticky="e")

        self.sidebar_section_label = ctk.CTkLabel(self.sidebar, text="", font=ctk.CTkFont(size=10, weight="bold"), text_color=CYAN); self.sidebar_section_label.pack(anchor="w", padx=16, pady=(14, 5))
        self.nav_buttons = {}
        self.nav_area = ctk.CTkScrollableFrame(self.sidebar, fg_color="transparent", corner_radius=0)
        self.nav_area.pack(fill="both", expand=True, padx=4, pady=(0, 4))
        for key, icon, label in [("dashboard", "⌂", "Dashboard"), ("analyzer", "🔐", "Analyzer"), ("vault", "🗄", "Vault"), ("documents", "📁", "Secure Documents"), ("expiry", "⏳", "Expiry"), ("health", "🛡", "Security Health"), ("help", "?", "Help")]:
            btn = ctk.CTkButton(self.nav_area, text=f"{icon}  {label}", height=37, anchor="w", fg_color="transparent", hover_color=self.NAVY_LIGHT, command=lambda k=key: self.show_page(k))
            btn.pack(fill="x", padx=5, pady=2)
            self.nav_buttons[key] = btn

        ctk.CTkFrame(self.sidebar, height=2, fg_color=self.NAVY_LIGHT).pack(fill="x", padx=12, pady=5)
        self.sidebar_status = ctk.CTkLabel(self.sidebar, text="", justify="left", anchor="w", text_color=self.MUTED, font=ctk.CTkFont(size=10))
        self.sidebar_status.pack(fill="x", padx=15, pady=5)
        self.settings_btn = ctk.CTkButton(self.sidebar, text="⚙ Settings", height=38, fg_color=self.NAVY_LIGHT, hover_color=BLUE, command=self.open_settings)
        self.settings_btn.pack(side="bottom", fill="x", padx=10, pady=10)
        self.admin_console_btn = ctk.CTkButton(self.sidebar, text="👑 Admin Console", height=38, fg_color=PURPLE, hover_color=CYAN, command=self.open_admin_console)
        self.admin_console_btn.pack_forget()

    def build_pages(self, fast=False):
        """Build the shell pages without blocking startup. Dashboard loads first; the rest is deferred."""
        if not hasattr(self, "page_frames"):
            self.page_frames = {}
        keys = ["dashboard", "analyzer", "vault", "documents", "expiry", "health", "help"]
        for key in keys:
            if key not in self.page_frames:
                frame = ctk.CTkFrame(self.content, fg_color=self.BACKGROUND, corner_radius=0)
                frame.place(relx=0, rely=0, relwidth=1, relheight=1)
                self.page_frames[key] = frame
        builders = [("dashboard", self.build_dashboard_page), ("analyzer", self.build_analyzer_page),
                    ("vault", self.build_vault_page), ("documents", self.build_secure_documents_page), ("expiry", self.build_expiry_page),
                    ("health", self.build_security_health_page), ("help", self.build_help_page)]
        if fast:
            selected = builders[:2]
            self._pages_built_fast = True
        else:
            selected = [x for x in builders if x[0] not in getattr(self, "_built_pages", set())]
        if not hasattr(self, "_built_pages"): self._built_pages=set()
        for key, builder in selected:
            if key in self._built_pages: continue
            try:
                builder(); self._built_pages.add(key)
            except Exception as exc:
                self._build_error_page(key, exc); self._built_pages.add(key)
                try: self.log_event(f"Module {key} failed to initialize: {exc}", "ERROR")
                except Exception: pass

    def logout(self):
        try:
            self._save_user_state()
        except Exception:
            pass
        try:
            self.lock_vault()
        except Exception:
            pass
        try:
            self.lock_secure_documents()
        except Exception:
            pass
        self._authenticated = False
        self.current_role = None
        self.current_user_id = None
        if hasattr(self, "logout_user_label"):
            try: self.logout_user_label.configure(text="")
            except Exception: pass
        if hasattr(self, "admin_console_btn"):
            self.admin_console_btn.pack_forget()
        self._show_auth_screen()

    def show_page(self, page, animate=True):
        if not getattr(self, "_authenticated", False):
            return
        if page not in self.page_frames:
            return
        if page not in getattr(self, "_built_pages", set()):
            builders={"analyzer":self.build_analyzer_page,"vault":self.build_vault_page,"documents":self.build_secure_documents_page,"expiry":self.build_expiry_page,"health":self.build_security_health_page,"help":self.build_help_page}
            builder=builders.get(page)
            if builder:
                try: builder(); self._built_pages.add(page); self.update_ui_texts()
                except Exception as exc: self._build_error_page(page, exc); self._built_pages.add(page)
        previous = self.current_page
        self.current_page = page
        if page == "expiry":
            try: self.refresh_expiry_rotation()
            except Exception: pass
        for key, btn in self.nav_buttons.items():
            btn.configure(fg_color=BLUE if key == page else "transparent")
        if not animate or previous == page:
            self.page_frames[page].tkraise()
            try: self._page_enter_effect(self.page_frames[page], immediate=True)
            except Exception: pass
            self._after_page_refresh(page)
            return
        self._animate_page_transition(page)

    def _page_enter_effect(self, frame, immediate=True):
        pass

    def _animate_page_transition(self, page):
        """Reliable lightweight page transition. Never blocks the first click."""
        try:
            frame = self.page_frames.get(page)
            if frame is None:
                return
            frame.tkraise()
            self._page_enter_effect(frame, immediate=True)
            self._after_page_refresh(page)
        except Exception:
            # Navigation must remain functional even if an optional visual effect fails.
            try:
                self.page_frames[page].tkraise()
                self._after_page_refresh(page)
            except Exception:
                pass

    def _after_page_refresh(self, page):
        if page == "dashboard":
            self.refresh_dashboard()
            self._update_live_dashboard()
        elif page == "vault": self.refresh_vault_view()
        elif page == "documents": self.refresh_secure_documents_view()

    def _build_error_page(self, key, exc):
        p = self.page_frames[key]
        for child in p.winfo_children():
            try: child.destroy()
            except Exception: pass
        box = ctk.CTkFrame(p, fg_color=self.CARD_DARK, corner_radius=18, border_width=1, border_color="#FF4F8B")
        box.pack(fill="both", expand=True, padx=28, pady=28)
        ctk.CTkLabel(box, text="⚠ MODULE INITIALIZATION ERROR", font=ctk.CTkFont(size=24, weight="bold"), text_color="#FF4F8B").pack(pady=(40,12))
        ctk.CTkLabel(box, text=f"Module: {key}", font=ctk.CTkFont(size=14, weight="bold"), text_color=self.TEXT).pack(pady=5)
        ctk.CTkLabel(box, text=str(exc), wraplength=760, text_color=self.MUTED).pack(pady=10)
        ctk.CTkButton(box, text="⟳ Reload Application", fg_color=self.ACCENT, command=self._safe_rebuild_all).pack(pady=20)

    def _safe_rebuild_all(self):
        try:
            for child in self.winfo_children(): child.destroy()
            self._ui_ready=True
            self.build_shell(); self.build_pages(fast=True); self.update_ui_texts(); self.show_page(self.current_page, animate=False)
        except Exception as exc:
            messagebox.showerror("Cyber Security Guard", f"UI rebuild failed:\n{exc}")

    def _module_header(self, parent, title, subtitle, color=None):
        color = color or self.ACCENT3
        ctk.CTkLabel(parent, text=title, font=ctk.CTkFont(size=25, weight="bold"), text_color=color).pack(anchor="w", padx=24, pady=(20,3))
        ctk.CTkLabel(parent, text=subtitle, font=ctk.CTkFont(size=11), text_color=self.MUTED).pack(anchor="w", padx=24, pady=(0,14))

    def _make_text_module(self, key, title, subtitle, color=None):
        p=self.page_frames[key]
        scroll=ctk.CTkScrollableFrame(p, fg_color=self.BACKGROUND)
        scroll.pack(fill="both", expand=True, padx=8, pady=8)
        self._module_header(scroll,title,subtitle,color)
        return scroll

    def build_network_page(self):
        p=self._make_text_module("network",LANGUAGES[self.current_lang].get("network_title","🌐 NETWORK SECURITY SCANNER"),LANGUAGES[self.current_lang].get("network_subtitle","Defensive TCP reachability test."),self.ACCENT3)
        self.network_heading=ctk.CTkLabel(p,text="",font=ctk.CTkFont(size=1),text_color=self.TEXT); self.network_heading.pack_forget()
        card=ctk.CTkFrame(p,fg_color=self.CARD,corner_radius=16,border_width=1,border_color=self.ACCENT3); card.pack(fill="x",padx=16,pady=8)
        row=ctk.CTkFrame(card,fg_color="transparent"); row.pack(fill="x",padx=16,pady=14)
        self.net_target=ctk.CTkEntry(row,placeholder_text="127.0.0.1 or hostname",height=38); self.net_target.pack(side="left",fill="x",expand=True,padx=(0,8))
        self.net_ports=ctk.CTkEntry(row,placeholder_text="Ports: 22,80,443,3389",height=38,width=220); self.net_ports.pack(side="left",padx=8)
        self.net_scan_btn=ctk.CTkButton(row,text="SCAN",fg_color=self.ACCENT,hover_color=self.ACCENT3,command=self.run_network_scan); self.net_scan_btn.pack(side="left",padx=8)
        ctk.CTkButton(row,text="LIVE CONNECTIONS",fg_color=self.ACCENT2,hover_color=self.ACCENT3,command=self.show_network_connections).pack(side="left")
        self.net_output=ctk.CTkTextbox(p,height=430,fg_color="#080D18",text_color=self.TEXT,font=ctk.CTkFont(family="Consolas",size=13),border_width=1,border_color=self.ACCENT3); self.net_output.pack(fill="both",expand=True,padx=16,pady=8)
        self.net_output.insert("end","NETWORK MODULE READY\nWindows TCP socket scan — no Nmap/Npcap required.\nEnter a host and ports, then click SCAN.\n")

    def run_network_scan(self):
        """Scan the local network/target using real Windows TCP connections; no Nmap/Npcap required."""
        host = self.net_target.get().strip() or "127.0.0.1"
        raw_ports = self.net_ports.get().strip() or "22,53,80,135,139,443,445,3389,5985,8080"
        if not re.fullmatch(r"[0-9A-Za-z_.:\-]+", host) or any(ch.isspace() for ch in host):
            self.net_output.delete("1.0", "end"); self.net_output.insert("end", "INVALID TARGET. Enter an IP address or hostname.\n"); return
        if not re.fullmatch(r"[0-9,\-]+", raw_ports):
            self.net_output.delete("1.0", "end"); self.net_output.insert("end", "INVALID PORT LIST. Use 22,80,443 or 1-1024.\n"); return
        ports=[]
        try:
            for item in raw_ports.split(","):
                if "-" in item:
                    lo, hi = map(int, item.split("-",1));
                    if not (1 <= lo <= hi <= 65535): raise ValueError
                    ports.extend(range(lo, hi+1))
                else:
                    n=int(item);
                    if not 1 <= n <= 65535: raise ValueError
                    ports.append(n)
        except Exception:
            self.net_output.delete("1.0", "end"); self.net_output.insert("end", "INVALID PORT LIST. Ports must be between 1 and 65535.\n"); return
        ports=sorted(set(ports))
        if len(ports)>4096:
            self.net_output.delete("1.0", "end"); self.net_output.insert("end", "TOO MANY PORTS. Please use a maximum of 4096 ports per scan.\n"); return
        self.net_scan_btn.configure(state="disabled", text="SCANNING…")
        self.net_output.delete("1.0", "end")
        self.net_output.insert("end", f"LOCAL TCP SCAN\nTarget: {host}\nPorts: {raw_ports}\n\nScanning with Windows sockets (no Nmap/Npcap)...\n")
        threading.Thread(target=self._network_scan_worker, args=(host, ports), daemon=True).start()

    def _network_scan_worker(self, host, ports):
        from concurrent.futures import ThreadPoolExecutor, as_completed
        import socket as _socket, time as _time
        started=_time.time()
        try:
            try:
                resolved=_socket.gethostbyname(host)
            except Exception:
                resolved=host
            results=[]
            def check(port):
                t0=_time.time()
                sock=_socket.socket(_socket.AF_INET, _socket.SOCK_STREAM); sock.settimeout(0.8)
                try:
                    rc=sock.connect_ex((resolved, port))
                    state="OPEN" if rc==0 else "CLOSED/FILTERED"
                except Exception as exc:
                    state="ERROR: "+str(exc)
                finally:
                    try: sock.close()
                    except Exception: pass
                return port,state,round((_time.time()-t0)*1000,1)
            workers=min(64,max(8,len(ports)))
            with ThreadPoolExecutor(max_workers=workers) as ex:
                futures=[ex.submit(check,p) for p in ports]
                for f in as_completed(futures): results.append(f.result())
            results.sort()
            open_ports=[r for r in results if r[1]=="OPEN"]
            lines=[f"Target resolved to: {resolved}", f"Scan time: {_time.time()-started:.2f}s", "", "PORT\tSTATE\tLATENCY"]
            lines += [f"{p}\t{st}\t{lat} ms" for p,st,lat in results]
            lines += ["", f"OPEN PORTS: {len(open_ports)}"]
            if open_ports: lines += [f"  {p}/tcp OPEN" for p,_,_ in open_ports]
            lines += ["", "This is live TCP data from the local Windows network stack; no simulated results."]
            output="\n".join(lines)+"\n"
        except Exception as exc:
            output=f"LOCAL NETWORK SCAN ERROR: {exc}\n"
        self.after(0, lambda out=output: self._network_scan_done(out))

    def _network_scan_done(self, output):
        self.net_output.delete("1.0", "end"); self.net_output.insert("end", output)
        self.net_scan_btn.configure(state="normal", text="SCAN")
        try: self.log_event("Local TCP network scan completed", "INFO")
        except Exception: pass

    def show_network_connections(self):
        if psutil is None: self.net_output.insert("end","\npsutil is required for connection inventory.\n"); return
        self.net_output.delete("1.0","end"); self.net_output.insert("end","ACTIVE NETWORK CONNECTIONS\n"+"="*70+"\n")
        try:
            for c in psutil.net_connections(kind='inet'):
                la=f"{getattr(c.laddr,'ip','?')}:{getattr(c.laddr,'port','?')}"; ra=f"{getattr(c.raddr,'ip','-')}:{getattr(c.raddr,'port','-')}" if c.raddr else '-'
                self.net_output.insert("end",f"{la:25} -> {ra:25} {c.status}\n")
        except Exception as e: self.net_output.insert("end",str(e))

    def build_ipinfo_page(self):
        p=self._make_text_module("ipinfo","IP & DOMAIN INTELLIGENCE","Resolve domains to IP addresses and IP addresses to reverse-DNS hostnames.",self.ACCENT3)
        card=ctk.CTkFrame(p,fg_color=self.CARD,corner_radius=16,border_width=1,border_color=self.ACCENT3); card.pack(fill="x",padx=16,pady=8)
        self.ipinfo_entry=ctk.CTkEntry(card,placeholder_text="Enter domain or IP address",height=40); self.ipinfo_entry.pack(side="left",fill="x",expand=True,padx=14,pady=14)
        ctk.CTkButton(card,text="LOOK UP",command=self.run_ipinfo).pack(side="left",padx=14,pady=14)
        self.ipinfo_output=ctk.CTkTextbox(p,height=360); self.ipinfo_output.pack(fill="both",expand=True,padx=16,pady=8)
    def run_ipinfo(self):
        import ipaddress, socket
        value=self.ipinfo_entry.get().strip()
        if not value: self.ipinfo_output.insert("end","Enter a domain or IP address.\n"); return
        try:
            ip=ipaddress.ip_address(value); host=socket.gethostbyaddr(str(ip))[0]
            lines=["IP & DOMAIN INTELLIGENCE","="*60,f"IP: {ip}",f"Reverse DNS / Domain: {host}"]
        except ValueError:
            try:
                infos=socket.getaddrinfo(value,None); ips=sorted({x[4][0] for x in infos})
                lines=["IP & DOMAIN INTELLIGENCE","="*60,f"Domain: {value}","Resolved IP addresses:"]+[f"  {x}" for x in ips]
            except Exception as e: lines=[f"Lookup failed: {e}"]
        except Exception as e: lines=[f"Reverse DNS lookup failed: {e}"]
        self.ipinfo_output.delete("1.0","end"); self.ipinfo_output.insert("end","\n".join(lines)+"\n")

    def build_whois_page(self):
        p=self._make_text_module("whois","WHOIS / DOMAIN INFORMATION","Query public WHOIS records using the standard WHOIS protocol.",self.ACCENT2)
        card=ctk.CTkFrame(p,fg_color=self.CARD,corner_radius=16,border_width=1,border_color=self.ACCENT2); card.pack(fill="x",padx=16,pady=8)
        self.whois_entry=ctk.CTkEntry(card,placeholder_text="example.com",height=40); self.whois_entry.pack(side="left",fill="x",expand=True,padx=14,pady=14)
        ctk.CTkButton(card,text="LOOK UP WHOIS",command=self.run_whois).pack(side="left",padx=14,pady=14)
        self.whois_output=ctk.CTkTextbox(p,height=430); self.whois_output.pack(fill="both",expand=True,padx=16,pady=8)
    def run_whois(self):
        import socket
        domain=self.whois_entry.get().strip().lower().replace("https://","").replace("http://","").split("/")[0]
        if not domain: self.whois_output.insert("end","Enter a domain.\n"); return
        def worker():
            try:
                s=socket.create_connection(("whois.iana.org",43),timeout=6); s.sendall((domain+"\r\n").encode()); data=b""
                while True:
                    chunk=s.recv(4096)
                    if not chunk: break
                    data+=chunk
                s.close(); text=data.decode("utf-8","replace")
                if "refer:" in text.lower():
                    server=next((ln.split(":",1)[1].strip() for ln in text.splitlines() if ln.lower().startswith("refer:")),"")
                    if server:
                        s=socket.create_connection((server,43),timeout=6); s.sendall((domain+"\r\n").encode()); data=b""
                        while True:
                            chunk=s.recv(4096)
                            if not chunk: break
                            data+=chunk
                        s.close(); text=data.decode("utf-8","replace")
                out=text[:30000]
            except Exception as e: out="WHOIS lookup failed: "+str(e)
            self.after(0,lambda o=out:(self.whois_output.delete("1.0","end"),self.whois_output.insert("end",o+"\n")))
        threading.Thread(target=worker,daemon=True).start()

    def build_logs_page(self):
        p=self._make_text_module("logs","LOG ANALYZER","Review recent Windows Application/System event records and filter suspicious keywords.",self.ACCENT2)
        card=ctk.CTkFrame(p,fg_color=self.CARD,corner_radius=16); card.pack(fill="x",padx=16,pady=8)
        self.log_filter=ctk.CTkEntry(card,placeholder_text="Filter: error, failed, warning, denied...",height=38); self.log_filter.pack(side="left",fill="x",expand=True,padx=12,pady=12)
        ctk.CTkButton(card,text="LOAD RECENT LOGS",command=self.load_logs).pack(side="left",padx=12,pady=12)
        self.logs_output=ctk.CTkTextbox(p,height=460); self.logs_output.pack(fill="both",expand=True,padx=16,pady=8)
    def load_logs(self):
        import subprocess
        filt=self.log_filter.get().strip().lower()
        ps='Get-WinEvent -LogName Application,System -MaxEvents 120 | Select-Object TimeCreated,LogName,Id,LevelDisplayName,ProviderName,Message | Format-List'
        def worker():
            try:
                r=subprocess.run(["powershell","-NoProfile","-ExecutionPolicy","Bypass","-Command",ps],capture_output=True,text=True,timeout=15,creationflags=getattr(subprocess,"CREATE_NO_WINDOW",0))
                out=r.stdout or r.stderr or "No event data returned."
                if filt:
                    blocks=out.split("\n\n"); blocks=[b for b in blocks if filt in b.lower()]; out="\n\n".join(blocks) or "No matching log entries found."
            except Exception as e: out="Log analysis failed: "+str(e)
            self.after(0,lambda o=out:(self.logs_output.delete("1.0","end"),self.logs_output.insert("end",o)))
        threading.Thread(target=worker,daemon=True).start()

    def build_system_page(self):
        p=self._make_text_module("system","SYSTEM INFORMATION","Local Windows host information for defensive situational awareness.",self.ACCENT3)
        ctk.CTkButton(p,text="REFRESH SYSTEM INFORMATION",command=self.load_system_info).pack(anchor="w",padx=16,pady=8)
        self.system_output=ctk.CTkTextbox(p,height=480); self.system_output.pack(fill="both",expand=True,padx=16,pady=8)
        self.load_system_info()
    def load_system_info(self):
        import platform, socket, os
        try:
            import psutil as _ps
            mem=f"{_ps.virtual_memory().total/1024**3:.2f} GB"; cpu=str(_ps.cpu_count(logical=True)); disks=[]
            for part in _ps.disk_partitions():
                try: disks.append(f"{part.device}  {part.mountpoint}  { _ps.disk_usage(part.mountpoint).total/1024**3:.1f} GB")
                except Exception: pass
        except Exception:
            mem=cpu="Unavailable"; disks=[]
        lines=["SYSTEM INFORMATION","="*60,f"Hostname: {socket.gethostname()}",f"OS: {platform.platform()}",f"Machine: {platform.machine()}",f"Processor: {platform.processor()}",f"Logical CPUs: {cpu}",f"RAM: {mem}",f"Python: {platform.python_version()}","","Network adapters / IPs:"]
        try:
            for host in socket.gethostbyname_ex(socket.gethostname())[2]: lines.append("  "+host)
        except Exception: pass
        lines += ["","Disks:"] + (["  "+x for x in disks] if disks else ["  Unavailable"])
        self.system_output.delete("1.0","end"); self.system_output.insert("end","\n".join(lines)+"\n")

    def build_connections_page(self):
        p=self._make_text_module("connections","ACTIVE CONNECTIONS","Current TCP/UDP network connections from the local Windows host.",self.ACCENT2)
        ctk.CTkButton(p,text="REFRESH CONNECTIONS",command=self.load_connections).pack(anchor="w",padx=16,pady=8)
        self.connections_output=ctk.CTkTextbox(p,height=500); self.connections_output.pack(fill="both",expand=True,padx=16,pady=8)
        self.load_connections()
    def load_connections(self):
        if psutil is None: out="psutil is not installed. Install it with: pip install psutil"
        else:
            rows=["LOCAL ADDRESS              REMOTE ADDRESS             STATUS       PID","="*80]
            try:
                for c in psutil.net_connections(kind="inet"):
                    la=f"{getattr(c.laddr,'ip','?')}:{getattr(c.laddr,'port','?')}"; ra=f"{getattr(c.raddr,'ip','-')}:{getattr(c.raddr,'port','-')}" if c.raddr else "-"; rows.append(f"{la:26} {ra:26} {c.status:12} {getattr(c,'pid',None)}")
                out="\n".join(rows)
            except Exception as e: out="Connection inventory failed: "+str(e)
        self.connections_output.delete("1.0","end"); self.connections_output.insert("end",out+"\n")

    def _run_windows_command(self, command):
        try:
            result = subprocess.run(command, capture_output=True, text=True, timeout=12, shell=True,
                                    creationflags=getattr(subprocess, "CREATE_NO_WINDOW", 0))
            return (result.stdout or result.stderr or "").strip()
        except Exception as exc:
            return f"Unavailable: {exc}"

    def _run_powershell_script(self, script, timeout=8):
        """Run one local PowerShell script without going through cmd.exe."""
        try:
            result = subprocess.run(
                ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", script],
                capture_output=True,
                text=True,
                timeout=timeout,
                shell=False,
                creationflags=getattr(subprocess, "CREATE_NO_WINDOW", 0),
            )
            return (result.stdout or result.stderr or "").strip()
        except Exception as exc:
            return f"Unavailable: {exc}"

    def _security_health_collect(self):
        """Collect only the requested local Windows security/system details."""
        data = {
            "generated": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "system": {},
            "security": {},
            "services": [],
        }

        # Keep this feature lightweight: one PowerShell call for Windows security
        # status instead of starting a separate PowerShell process for every check.
        try:
            data["system"]["PC Name"] = platform.node() or socket.gethostname()
            try:
                import winreg
                with winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, r"SOFTWARE\Microsoft\Windows NT\CurrentVersion") as key:
                    product = winreg.QueryValueEx(key, "ProductName")[0]
                    try:
                        display = winreg.QueryValueEx(key, "DisplayVersion")[0]
                    except Exception:
                        display = ""
                    build = winreg.QueryValueEx(key, "CurrentBuild")[0]
                data["system"]["Windows Edition"] = str(product)
                data["system"]["Windows Version"] = str(display or platform.release())
                data["system"]["Windows Build"] = str(build)
            except Exception:
                data["system"]["Windows Edition"] = platform.platform()
                data["system"]["Windows Version"] = platform.version()
                data["system"]["Windows Build"] = "Unavailable"

            data["system"]["Architecture"] = platform.machine() + " / " + platform.architecture()[0]
            data["system"]["Processor"] = platform.processor() or "Unknown"

            if psutil:
                vm = psutil.virtual_memory()
                data["system"]["RAM Total"] = f"{vm.total / (1024**3):.2f} GB"
                data["system"]["RAM Available"] = f"{vm.available / (1024**3):.2f} GB"
                data["system"]["RAM Used"] = f"{vm.used / (1024**3):.2f} GB ({vm.percent:.1f}%)"
                root = Path.home().anchor or os.path.abspath(os.sep)
                disk = psutil.disk_usage(root)
                data["system"]["Storage"] = (
                    f"{disk.total/(1024**3):.2f} GB total | "
                    f"{disk.free/(1024**3):.2f} GB free | "
                    f"{disk.used/(1024**3):.2f} GB used ({disk.percent:.1f}%)"
                )
            else:
                data["system"]["RAM Total"] = "psutil not available"
                data["system"]["RAM Available"] = "psutil not available"
                data["system"]["RAM Used"] = "psutil not available"
                data["system"]["Storage"] = "psutil not available"
        except Exception as exc:
            data["system"]["System Information"] = f"Unavailable: {exc}"

        try:
            security_script = (
                '$result=[ordered]@{}; '
                'try{$result.Firewall=@(Get-NetFirewallProfile | Select-Object Name,Enabled,DefaultInboundAction,DefaultOutboundAction)}catch{$result.Firewall="Unavailable: "+$_.Exception.Message}; '
                'try{$result.Defender=@(Get-MpComputerStatus | Select-Object AMServiceEnabled,AntivirusEnabled,AntispywareEnabled,RealTimeProtectionEnabled,BehaviorMonitorEnabled,IoavProtectionEnabled,NISEnabled,QuickScanAge,FullScanAge)}catch{$result.Defender="Unavailable: "+$_.Exception.Message}; '
                'try{$result.WindowsUpdate=@(Get-Service wuauserv | Select-Object Name,Status,StartType)}catch{$result.WindowsUpdate="Unavailable: "+$_.Exception.Message}; '
                'try{$p=Get-ItemProperty "HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System";$result.UAC=[PSCustomObject]@{EnableLUA=$p.EnableLUA;ConsentPromptBehaviorAdmin=$p.ConsentPromptBehaviorAdmin;PromptOnSecureDesktop=$p.PromptOnSecureDesktop}}catch{$result.UAC="Unavailable: "+$_.Exception.Message}; '
                'try{$result.Antivirus=@(Get-CimInstance -Namespace root/SecurityCenter2 -ClassName AntiVirusProduct | Select-Object displayName,productState,pathToSignedProductExe)}catch{$result.Antivirus="Unavailable: "+$_.Exception.Message}; '
                'try{$result.WindowsSecurity=@(Get-Service SecurityHealthService,wscsvc -ErrorAction SilentlyContinue | Select-Object Name,Status,StartType)}catch{$result.WindowsSecurity="Unavailable: "+$_.Exception.Message}; '
                '$result | ConvertTo-Json -Depth 6 -Compress'
            )
            raw = self._run_powershell_script(security_script)
            sec = json.loads(raw) if raw and raw.startswith("{") else {}
            data["security"] = {
                "Windows Firewall": sec.get("Firewall", "Unavailable"),
                "Windows Defender": sec.get("Defender", "Unavailable"),
                "Windows Security": sec.get("WindowsSecurity", "Unavailable"),
                "UAC": sec.get("UAC", "Unavailable"),
                "Windows Update": sec.get("WindowsUpdate", "Unavailable"),
                "Antivirus": sec.get("Antivirus", "Unavailable"),
            }
        except Exception as exc:
            data["security"] = {
                "Windows Firewall": f"Unavailable: {exc}",
                "Windows Defender": f"Unavailable: {exc}",
                "Windows Security": f"Unavailable: {exc}",
                "UAC": f"Unavailable: {exc}",
                "Windows Update": f"Unavailable: {exc}",
                "Antivirus": f"Unavailable: {exc}",
            }

        # Security-related Windows services.
        if psutil:
            try:
                service_words = (
                    "security", "defender", "firewall", "wscsvc", "winmgmt",
                    "eventlog", "bits", "wuauserv", "cryptsvc", "trustedinstaller"
                )
                for svc in psutil.win_service_iter():
                    try:
                        info = svc.as_dict()
                        name = (info.get("name") or "").lower()
                        display = (info.get("display_name") or "").lower()
                        if any(w in name or w in display for w in service_words):
                            data["services"].append({
                                "Name": info.get("name") or "-",
                                "Display Name": info.get("display_name") or "-",
                                "Status": info.get("status") or "-",
                                "Start Type": info.get("start_type") or "-",
                            })
                    except Exception:
                        continue
            except Exception:
                pass

        return data

    def _security_health_lines(self, data):
        lines=[]
        lines.append("SAMUDRA KAVACH — SECURITY HEALTH CHECK")
        lines.append("="*88)
        lines.append(f"Generated: {data.get('generated','-')}")
        lines.append("Mode: LOCAL / OFFLINE CHECK — No internet connection is required")
        lines.append("")
        for title, section in (("PC / SYSTEM INFORMATION",data.get("system",{})),("SECURITY STATUS",data.get("security",{}))):
            lines += [title,"-"*88]
            for k,v in section.items(): lines.append(f"{k}: {v}")
            lines.append("")
        for title,key,fields in (("SECURITY SERVICES","services",["Name","Display Name","Status","Start Type"]),):
            rows=data.get(key,[]); lines += [title,"-"*88]
            if not rows: lines.append("No entries detected or information unavailable.")
            else:
                for row in rows:
                    lines.append(" | ".join(f"{f}: {row.get(f,'-')}" for f in fields))
            lines.append("")
        lines += ["Note: These are local Windows security details collected offline. System services status is verified against standard Windows security baseline."]
        return lines

    def build_security_health_page(self):
        p=self.page_frames["health"]
        scroll=ctk.CTkScrollableFrame(p,fg_color="transparent")
        scroll.pack(fill="both",expand=True,padx=18,pady=15)
        self.health_heading=ctk.CTkLabel(scroll,text="🛡 Security Health Check",font=ctk.CTkFont(size=22,weight="bold"),text_color=self.TEXT)
        self.health_heading.pack(anchor="w",pady=(0,8))
        self.health_info=ctk.CTkLabel(scroll,text="Complete local Windows security and system audit. Internet is not required.",text_color=self.MUTED,anchor="w",justify="left")
        self.health_info.pack(fill="x",pady=(0,10))
        bar=ctk.CTkFrame(scroll,fg_color=self.CARD,corner_radius=14,border_width=1,border_color=self.BORDER); bar.pack(fill="x",pady=5)
        self.health_scan_btn=ctk.CTkButton(bar,text="RUN SECURITY CHECK",fg_color=BLUE,command=self.run_security_health_check); self.health_scan_btn.pack(side="left",padx=8,pady=8)
        self.health_report_btn=ctk.CTkButton(bar,text="GENERATE REPORT",fg_color=PURPLE,command=self.generate_security_health_report); self.health_report_btn.pack(side="left",padx=8,pady=8)
        self.health_save_btn=ctk.CTkButton(bar,text="SAVE PDF",fg_color=GREEN,command=self.save_security_health_pdf); self.health_save_btn.pack(side="left",padx=8,pady=8)
        self.health_print_btn=ctk.CTkButton(bar,text="PRINT",fg_color=ORANGE,command=self.print_security_health_report); self.health_print_btn.pack(side="left",padx=8,pady=8)
        self.health_status=ctk.CTkLabel(bar,text="Not scanned yet",text_color=YELLOW); self.health_status.pack(side="right",padx=12)
        self.health_output=ctk.CTkTextbox(scroll,height=620,fg_color="#100B1B",text_color=self.TEXT,font=ctk.CTkFont(family="Consolas",size=11),border_color=self.BORDER,border_width=1)
        self.health_output.pack(fill="both",expand=True,pady=8)
        self._security_health_data=None
        self._security_health_pdf=None

    def run_security_health_check(self):
        if getattr(self,"_health_scan_running",False): return
        self._health_scan_running=True
        self.health_scan_btn.configure(state="disabled"); self.health_status.configure(text="Scanning locally...",text_color=YELLOW)
        def worker():
            try: data=self._security_health_collect(); err=None
            except Exception as exc: data=None; err=exc
            self.after(0,lambda:self._finish_security_health_check(data,err))
        threading.Thread(target=worker,daemon=True).start()

    def _finish_security_health_check(self,data,err):
        self._health_scan_running=False; self.health_scan_btn.configure(state="normal")
        if err:
            self.health_status.configure(text="Check failed",text_color=RED); messagebox.showerror("Security Health Check",str(err)); return
        self._security_health_data=data
        self._security_health_pdf=None
        self.health_output.delete("1.0","end"); self.health_output.insert("end","\n".join(self._security_health_lines(data)))
        self.health_status.configure(text="Check completed",text_color=GREEN)

    def _ensure_security_health_data(self):
        if not self._security_health_data:
            if not getattr(self, "_health_scan_running", False):
                self.run_security_health_check()
            self.health_status.configure(text="Run Security Check first; report will be available when it completes.", text_color=YELLOW)
            return False
        return True

    def _security_health_report_path(self):
        return filedialog.asksaveasfilename(initialdir=str(self._default_docs_dir()),title="Save Security Health Check PDF",defaultextension=".pdf",filetypes=[("PDF Report","*.pdf")])

    def _write_security_health_pdf(self, path):
        data = self._security_health_data
        if REPORTLAB_AVAILABLE:
            styles = getSampleStyleSheet()
            title = ParagraphStyle("Title2", parent=styles["Title"], alignment=TA_CENTER, fontSize=18, leading=22, spaceAfter=14)
            small = ParagraphStyle("Small2", parent=styles["BodyText"], fontSize=7.5, leading=9)
            doc = SimpleDocTemplate(path, pagesize=A4, rightMargin=30, leftMargin=30, topMargin=30, bottomMargin=30)
            story = [
                Paragraph("SAMUDRA KAVACH — SECURITY HEALTH CHECK", title),
                Paragraph(f"Generated: {data.get('generated','-')} | Local / Offline Check", styles["Normal"]),
                Spacer(1, 10),
            ]
            for heading, section in (("PC / SYSTEM INFORMATION", data.get("system", {})), ("SECURITY STATUS", data.get("security", {}))):
                story.append(Paragraph(heading, styles["Heading2"]))
                rows = [[Paragraph("Item", small), Paragraph("Details", small)]]
                rows += [[Paragraph(str(k), small), Paragraph(str(v).replace("&", "&amp;"), small)] for k, v in section.items()]
                table = Table(rows, colWidths=[150, 360], repeatRows=1)
                table.setStyle(TableStyle([
                    ("GRID", (0, 0), (-1, -1), 0.3, pdf_colors.grey),
                    ("BACKGROUND", (0, 0), (-1, 0), pdf_colors.lightgrey),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ]))
                story += [table, Spacer(1, 10)]
            for heading, key in (
                ("SECURITY SERVICES", "services"),
            ):
                story.append(Paragraph(heading, styles["Heading2"]))
                rows = []
                items = data.get(key, [])
                if items:
                    fields = list(items[0].keys())
                    rows.append([Paragraph(str(f), small) for f in fields])
                    for item in items:
                        rows.append([Paragraph(str(item.get(f, "-")).replace("&", "&amp;"), small) for f in fields])
                else:
                    rows = [[Paragraph("No entries detected or information unavailable.", small)]]
                table = Table(rows, repeatRows=1)
                table.setStyle(TableStyle([
                    ("GRID", (0, 0), (-1, -1), 0.25, pdf_colors.grey),
                    ("BACKGROUND", (0, 0), (-1, 0), pdf_colors.lightgrey),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ]))
                story += [table, Spacer(1, 10)]
            story.append(Paragraph(
                "Note: These are local Windows security details collected offline. System services status is verified against standard Windows security baseline.",
                small,
            ))
            doc.build(story)
            return

        # Built-in PDF fallback: no reportlab package is required.
        # This keeps Save PDF / Print functional on a standard Python installation.
        report_lines = self._security_health_lines(data)
        wrapped = []
        for line in report_lines:
            text = str(line).replace("\t", "    ")
            parts = textwrap.wrap(text, width=105, replace_whitespace=False, drop_whitespace=True) or [""]
            wrapped.extend(parts)

        lines_per_page = 52
        pages = [wrapped[i:i + lines_per_page] for i in range(0, len(wrapped), lines_per_page)] or [[""]]
        objects = []
        page_ids = []
        font_id = 0

        def add_object(payload):
            objects.append(payload)
            return len(objects)

        font_id = add_object("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
        pages_id = add_object("<< /Type /Pages /Kids [] /Count 0 >>")

        for page_lines in pages:
            content_parts = ["BT", "/F1 8 Tf", "36 806 Td", "10 TL"]
            for line in page_lines:
                safe = (
                    str(line).encode("cp1252", "replace").decode("cp1252")
                    .replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")
                )
                content_parts.append(f"({safe}) Tj T*")
            content_parts.append("ET")
            stream = "\n".join(content_parts).encode("cp1252", "replace")
            content_id = add_object(
                f"<< /Length {len(stream)} >>\nstream\n{stream.decode('cp1252', 'replace')}\nendstream"
            )
            page_id = add_object(
                f"<< /Type /Page /Parent {pages_id} 0 R /MediaBox [0 0 595 842] "
                f"/Resources << /Font << /F1 {font_id} 0 R >> >> /Contents {content_id} 0 R >>"
            )
            page_ids.append(page_id)

        kids = " ".join(f"{pid} 0 R" for pid in page_ids)
        objects[pages_id - 1] = f"<< /Type /Pages /Kids [{kids}] /Count {len(page_ids)} >>"
        catalog_id = add_object(f"<< /Type /Catalog /Pages {pages_id} 0 R >>")

        with open(path, "wb") as f:
            f.write(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
            offsets = [0]
            for index, obj in enumerate(objects, 1):
                offsets.append(f.tell())
                f.write(f"{index} 0 obj\n".encode("ascii"))
                f.write(obj.encode("cp1252", "replace"))
                f.write(b"\nendobj\n")
            xref = f.tell()
            f.write(f"xref\n0 {len(objects)+1}\n".encode("ascii"))
            f.write(b"0000000000 65535 f \n")
            for offset in offsets[1:]:
                f.write(f"{offset:010d} 00000 n \n".encode("ascii"))
            f.write(
                f"trailer\n<< /Size {len(objects)+1} /Root {catalog_id} 0 R >>\n"
                f"startxref\n{xref}\n%%EOF".encode("ascii")
            )

    def generate_security_health_report(self):
        if not self._ensure_security_health_data(): return
        path=self._security_health_report_path()
        if not path:return
        try:
            self._write_security_health_pdf(path); self._security_health_pdf=path; self.health_status.configure(text="PDF report generated",text_color=GREEN); messagebox.showinfo("Security Health Check",f"PDF report generated successfully.\n\n{path}")
        except Exception as e: messagebox.showerror("Security Health Check",str(e))

    def save_security_health_pdf(self):
        self.generate_security_health_report()

    def print_security_health_report(self):
        if not self._ensure_security_health_data(): return
        try:
            path=self._security_health_pdf
            if not path or not Path(path).exists():
                path=str(self._default_docs_dir()/"SAMUDRA_KAVACH_Security_Health_Check.pdf")
                Path(path).parent.mkdir(parents=True,exist_ok=True); self._write_security_health_pdf(path); self._security_health_pdf=path
            if os.name=="nt": os.startfile(path,"print")
            else: messagebox.showinfo("Security Health Check",f"PDF saved here for printing:\n{path}")
            self.health_status.configure(text="Print command sent",text_color=GREEN)
        except Exception as e: messagebox.showerror("Security Health Check",str(e))

    # ========================================================
    # V14 ULTRA SOC COMMAND CENTER
    # ========================================================
    def build_dashboard_page(self):
        """Advanced Smart Indian Navy SAMUNDRA KAVACH Tri-Service Command Center."""
        p = self.page_frames["dashboard"]
        for child in p.winfo_children():
            try: child.destroy()
            except Exception: pass
        p.configure(fg_color=self.BACKGROUND)

        scroll = ctk.CTkScrollableFrame(p, fg_color="transparent")
        scroll.pack(fill="both", expand=True, padx=16, pady=10)
        self.dashboard_scroll = scroll

        # -------------------------------------------------------------
        # 1. TOP HEADER: INDIAN NAVY & SAMUNDRA KAVACH COMMAND
        # -------------------------------------------------------------
        hero = ctk.CTkFrame(scroll, fg_color=self.NAVY, corner_radius=14, border_width=1, border_color=self.BORDER)
        hero.pack(fill="x", pady=(0, 10))

        hero_inner = ctk.CTkFrame(hero, fg_color="transparent")
        hero_inner.pack(fill="x", padx=20, pady=14)

        left_info = ctk.CTkFrame(hero_inner, fg_color="transparent")
        left_info.pack(side="left", fill="both", expand=True)

        top_tag = ctk.CTkFrame(left_info, fg_color="transparent")
        top_tag.pack(anchor="w", pady=(0, 2))
        ctk.CTkLabel(top_tag, text="⚓  भारतीय नौसेना  •  INDIAN NAVY", font=ctk.CTkFont(size=14, weight="bold"), text_color=CYAN).pack(side="left")

        self.dashboard_heading = ctk.CTkLabel(
            left_info,
            text="समुद्र कवच  •  SAMUNDRA KAVACH",
            font=ctk.CTkFont(size=28, weight="bold"),
            text_color="white",
            anchor="w"
        )
        self.dashboard_heading.pack(anchor="w", pady=(2, 3))

        desc_lbl = ctk.CTkLabel(
            left_info,
            text="OFFSHORE & MARITIME CYBER DEFENSE COMMAND CENTER  •  DEFENSE LEVEL 1",
            font=ctk.CTkFont(size=13, weight="bold"),
            text_color="#89B4D4",
            anchor="w"
        )
        desc_lbl.pack(anchor="w", pady=(0, 4))

        motto_frame = ctk.CTkFrame(left_info, fg_color=self.CARD_DARK, corner_radius=6, border_width=1, border_color=self.BORDER)
        motto_frame.pack(anchor="w", pady=(2, 0))
        ctk.CTkLabel(
            motto_frame,
            text="॥ शं नो वरुणः ॥  (May the Lord of the Oceans be auspicious unto us)",
            font=ctk.CTkFont(size=13, weight="bold"),
            text_color=self.GOLD,
            padx=10,
            pady=4
        ).pack()

        right_info = ctk.CTkFrame(hero_inner, fg_color="transparent")
        right_info.pack(side="right", padx=(10, 0), anchor="e")

        status_pill = ctk.CTkFrame(right_info, fg_color="#0A3323", corner_radius=10, border_width=1, border_color="#18633F")
        status_pill.pack(anchor="e", pady=(0, 6))
        self.quick_stats_labels = {}
        self.quick_stats_labels["status"] = ctk.CTkLabel(
            status_pill,
            text="● SECURE DEFENSE ACTIVE",
            font=ctk.CTkFont(size=13, weight="bold"),
            text_color=GREEN,
            padx=14,
            pady=5
        )
        self.quick_stats_labels["status"].pack()

        self.dashboard_time = ctk.CTkLabel(
            right_info,
            text=datetime.now().strftime("%d %b %Y  •  %H:%M:%S"),
            font=ctk.CTkFont(size=14, weight="bold"),
            text_color=self.TEXT,
            anchor="e"
        )
        self.dashboard_time.pack(anchor="e", pady=(2, 0))

        # -------------------------------------------------------------
        # 2. TRI-PANEL NAVAL SHOWCASE (3 USER IMAGES: FLEET, AVIATION, SUB)
        # -------------------------------------------------------------
        if PIL_AVAILABLE:
            tri_container = ctk.CTkFrame(scroll, fg_color="transparent")
            tri_container.pack(fill="x", pady=(0, 10))

            tri_panels = [
                ("⚓ SURFACE FLEET", "CARRIER BATTLE GROUP • ARMED COMBAT", "_NAVY_FLEET_B64"),
                ("🚁 NAVAL AVIATION", "MARITIME AIR SQUADRON • DEFENSE GRID", "_NAVY_AVIATION_B64"),
                ("🌊 SUB-SURFACE ARM", "STEALTH SUBMARINE FORCE • DEEP PATROL", "_NAVY_SUBMARINE_B64"),
            ]

            self._tri_panel_elements = []
            default_w, default_h = 350, 210

            for p_title, p_sub, p_b64_attr in tri_panels:
                panel_card = ctk.CTkFrame(tri_container, fg_color=self.CARD, corner_radius=14, border_width=1, border_color=self.BORDER)
                panel_card.pack(side="left", fill="both", expand=True, padx=4)

                top_bar = ctk.CTkFrame(panel_card, fg_color="transparent")
                top_bar.pack(fill="x", padx=14, pady=(9, 5))
                ctk.CTkLabel(top_bar, text=p_title, font=ctk.CTkFont(size=14, weight="bold"), text_color=CYAN).pack(side="left")
                ctk.CTkLabel(top_bar, text="● ACTIVE", font=ctk.CTkFont(size=11, weight="bold"), text_color=GREEN).pack(side="right")

                raw_pil = None
                img_lbl = None
                try:
                    raw_b64 = globals().get(p_b64_attr, None) or getattr(self, p_b64_attr, None)
                    if raw_b64:
                        raw_bytes = base64.b64decode(raw_b64)
                        raw_pil = Image.open(io.BytesIO(raw_bytes)).convert("RGB")
                        fitted = ImageOps.fit(raw_pil, (default_w, default_h), method=Image.Resampling.LANCZOS)
                        init_ctk_img = ctk.CTkImage(light_image=fitted, dark_image=fitted, size=(default_w, default_h))
                        img_lbl = ctk.CTkLabel(panel_card, text="", image=init_ctk_img, corner_radius=8)
                        img_lbl.image = init_ctk_img
                        img_lbl.pack(padx=8, pady=(2, 6), fill="both", expand=True)
                except Exception:
                    pass

                if img_lbl and raw_pil:
                    self._tri_panel_elements.append((img_lbl, raw_pil))

                sub_bar = ctk.CTkFrame(panel_card, fg_color="transparent")
                sub_bar.pack(fill="x", padx=14, pady=(0, 9))
                ctk.CTkLabel(sub_bar, text=p_sub, font=ctk.CTkFont(size=12, weight="bold"), text_color=self.MUTED).pack(anchor="w")

            def _on_tri_container_resize(event):
                if not hasattr(self, "_tri_panel_elements") or not self._tri_panel_elements:
                    return
                avail_w = event.width
                if avail_w < 200:
                    return
                target_w = max(320, min(520, (avail_w - 40) // 3))
                target_h = int(target_w * 0.60)
                last_sz = getattr(self, "_tri_last_size", (0, 0))
                if abs(last_sz[0] - target_w) < 15:
                    return
                self._tri_last_size = (target_w, target_h)
                for p_lbl, p_pil in self._tri_panel_elements:
                    try:
                        scaled_pil = ImageOps.fit(p_pil, (target_w, target_h), method=Image.Resampling.LANCZOS)
                        scaled_ctk = ctk.CTkImage(light_image=scaled_pil, dark_image=scaled_pil, size=(target_w, target_h))
                        p_lbl.configure(image=scaled_ctk)
                        p_lbl.image = scaled_ctk
                    except Exception:
                        pass

            tri_container.bind("<Configure>", _on_tri_container_resize)

        # -------------------------------------------------------------
        # 3. CORE LIVE SECURITY MATRIX (4 ESSENTIAL KPI CARDS IN 1 ROW)
        # -------------------------------------------------------------
        metrics_grid = ctk.CTkFrame(scroll, fg_color="transparent")
        metrics_grid.pack(fill="x", pady=(0, 10))

        # Card 1: Overall Security Posture
        score_card = ctk.CTkFrame(metrics_grid, fg_color=self.CARD, corner_radius=12, border_width=1, border_color=self.BORDER)
        score_card.pack(side="left", fill="both", expand=True, padx=(0, 5))
        score_inner = ctk.CTkFrame(score_card, fg_color="transparent")
        score_inner.pack(padx=14, pady=12, fill="both", expand=True)

        self.score_title = ctk.CTkLabel(score_inner, text="Overall Security Score", font=ctk.CTkFont(size=14, weight="bold"), text_color=self.TEXT, anchor="w")
        self.score_title.pack(anchor="w")

        score_row = ctk.CTkFrame(score_inner, fg_color="transparent")
        score_row.pack(anchor="w", pady=(4, 2))
        self.score_value = ctk.CTkLabel(score_row, text="100", font=ctk.CTkFont(size=36, weight="bold"), text_color=GREEN)
        self.score_value.pack(side="left")
        ctk.CTkLabel(score_row, text="/ 100", font=ctk.CTkFont(size=15, weight="bold"), text_color=self.MUTED).pack(side="left", padx=(5, 0), pady=(10, 0))

        self.score_desc = ctk.CTkLabel(score_inner, text="Optimal Defense", font=ctk.CTkFont(size=13), text_color=self.MUTED, anchor="w")
        self.score_desc.pack(anchor="w")

        # Threat and safe score telemetry
        stat_bar = ctk.CTkFrame(score_inner, fg_color="transparent")
        stat_bar.pack(anchor="w", pady=(3, 0))
        ctk.CTkLabel(stat_bar, text="Threat:", font=ctk.CTkFont(size=12), text_color=self.MUTED).pack(side="left")
        self.quick_stats_labels["threats"] = ctk.CTkLabel(stat_bar, text="0", font=ctk.CTkFont(size=12, weight="bold"), text_color=YELLOW)
        self.quick_stats_labels["threats"].pack(side="left", padx=(2, 8))
        ctk.CTkLabel(stat_bar, text="Safe:", font=ctk.CTkFont(size=12), text_color=self.MUTED).pack(side="left")
        self.quick_stats_labels["safe"] = ctk.CTkLabel(stat_bar, text="100%", font=ctk.CTkFont(size=12, weight="bold"), text_color=GREEN)
        self.quick_stats_labels["safe"].pack(side="left", padx=(2, 0))

        # Cards 2, 3, 4: Encrypted Vault, Weak Passwords, Breached Exposure
        self.metric_cards = {}
        sub_cards_meta = [
            ("vault", "🗄", "Encrypted Vault", "0", "Vault Status • Healthy", CYAN),
            ("weak", "⚠", "Weak Passwords", "0", "0 Detected", YELLOW),
            ("breached", "🚨", "Breached Passwords", "0", "Zero Exposure", RED)
        ]

        for m_key, icon, label_title, default_val, default_sub, accent_col in sub_cards_meta:
            m_card = ctk.CTkFrame(metrics_grid, fg_color=self.CARD, corner_radius=12, border_width=1, border_color=self.BORDER)
            m_card.pack(side="left", fill="both", expand=True, padx=4)

            m_inner = ctk.CTkFrame(m_card, fg_color="transparent")
            m_inner.pack(padx=14, pady=12, fill="both", expand=True)

            m_head = ctk.CTkFrame(m_inner, fg_color="transparent")
            m_head.pack(fill="x")
            ctk.CTkLabel(m_head, text=icon, font=ctk.CTkFont(size=18)).pack(side="left")
            title_lbl = ctk.CTkLabel(m_head, text=f"  {label_title}", font=ctk.CTkFont(size=14, weight="bold"), text_color=self.MUTED)
            title_lbl.pack(side="left")

            val_lbl = ctk.CTkLabel(m_inner, text=default_val, font=ctk.CTkFont(size=36, weight="bold"), text_color=self.TEXT, anchor="w")
            val_lbl.pack(anchor="w", pady=(4, 2))

            sub_lbl = ctk.CTkLabel(m_inner, text=default_sub, font=ctk.CTkFont(size=13, weight="bold"), text_color=accent_col, anchor="w")
            sub_lbl.pack(anchor="w")

            self.metric_cards[m_key] = (val_lbl, sub_lbl)

        # -------------------------------------------------------------
        # 4. COMPACT SMART LIVE TELEMETRY RIBBON
        # -------------------------------------------------------------
        live_frame = ctk.CTkFrame(scroll, fg_color=self.CARD, corner_radius=12, border_width=1, border_color=self.BORDER)
        live_frame.pack(fill="x", pady=(0, 10))

        live_row = ctk.CTkFrame(live_frame, fg_color="transparent")
        live_row.pack(fill="x", padx=16, pady=10)

        self.dashboard_live = ctk.CTkLabel(
            live_row,
            text="● LIVE HOST TELEMETRY  •  " + datetime.now().strftime("%H:%M:%S"),
            font=ctk.CTkFont(size=13, weight="bold"),
            text_color=CYAN
        )
        self.dashboard_live.pack(side="left", padx=(0, 16))

        self.live_cards = {}
        tel_items = [
            ("cpu", "CPU"),
            ("ram", "RAM"),
            ("disk", "Disk"),
            ("net", "Sockets"),
            ("uptime", "Session")
        ]

        for k, label in  tel_items:
            t_box = ctk.CTkFrame(live_row, fg_color=self.CARD_DARK, corner_radius=8, border_width=1, border_color=self.BORDER)
            t_box.pack(side="left", fill="both", expand=True, padx=3)

            t_inner = ctk.CTkFrame(t_box, fg_color="transparent")
            t_inner.pack(padx=10, pady=6, fill="both", expand=True)

            head_l = ctk.CTkLabel(t_inner, text=label, font=ctk.CTkFont(size=12, weight="bold"), text_color=self.MUTED)
            head_l.pack(side="left")

            val_l = ctk.CTkLabel(t_inner, text="0%", font=ctk.CTkFont(size=13, weight="bold"), text_color=self.TEXT)
            val_l.pack(side="left", padx=(5, 6))

            pbar = ctk.CTkProgressBar(t_inner, width=50, height=6, corner_radius=2, progress_color=CYAN)
            pbar.pack(side="left", padx=(0, 5))
            pbar.set(0.0)

            stat_l = ctk.CTkLabel(t_inner, text="OK", font=ctk.CTkFont(size=11, weight="bold"), text_color=GREEN)
            stat_l.pack(side="left")

            self.live_cards[k] = (val_l, pbar, stat_l)

        # -------------------------------------------------------------
        # 5. RAPID OPERATIONS COMMAND LAUNCH BAR
        # -------------------------------------------------------------
        actions_card = ctk.CTkFrame(scroll, fg_color=self.CARD, corner_radius=12, border_width=1, border_color=self.BORDER)
        actions_card.pack(fill="x", pady=(0, 10))

        act_hdr = ctk.CTkFrame(actions_card, fg_color="transparent")
        act_hdr.pack(fill="x", padx=16, pady=(10, 6))
        ctk.CTkLabel(act_hdr, text="⚡  RAPID COMMAND OPERATIONS  •  QUICK LAUNCH", font=ctk.CTkFont(size=14, weight="bold"), text_color=self.TEXT).pack(side="left")

        btn_row = ctk.CTkFrame(actions_card, fg_color="transparent")
        btn_row.pack(fill="x", padx=16, pady=(0, 12))

        quick_ops = [
            ("🔐 Analyzer", lambda: self.show_page("analyzer"), BLUE),
            ("🗄 Secure Vault", lambda: self.show_page("vault"), self.NAVY_LIGHT),
            ("📁 Secure Documents", lambda: self.show_page("documents"), self.NAVY_LIGHT),
            ("🛡 Health Check", lambda: self.show_page("health"), GREEN),
            ("⏳ Expiry & Rotation", lambda: self.show_page("expiry"), self.NAVY_LIGHT),
            ("⚙ Settings", self.open_settings, self.CARD_DARK)
        ]

        for label, cmd, col in quick_ops:
            b = ctk.CTkButton(
                btn_row,
                text=label,
                command=cmd,
                fg_color=col,
                hover_color=self.ACCENT,
                height=38,
                corner_radius=8,
                font=ctk.CTkFont(size=13, weight="bold")
            )
            b.pack(side="left", fill="x", expand=True, padx=3)
            self.bind_tooltip(b, f"Quick Launch: {label}")

        # Non-intrusive container for required recommendation & activity attributes
        bottom_box = ctk.CTkFrame(scroll, fg_color=self.CARD, corner_radius=12, border_width=1, border_color=self.BORDER)
        bottom_box.pack(fill="x", pady=(0, 6))

        b_inner = ctk.CTkFrame(bottom_box, fg_color="transparent")
        b_inner.pack(fill="x", padx=16, pady=10)

        # Left Column: Recommendations
        rec_col = ctk.CTkFrame(b_inner, fg_color="transparent")
        rec_col.pack(side="left", fill="both", expand=True, padx=(0, 8))
        self.recommend_title = ctk.CTkLabel(rec_col, text="Security Recommendations", font=ctk.CTkFont(size=14, weight="bold"), text_color=CYAN, anchor="w")
        self.recommend_title.pack(anchor="w")
        self.recommend_text = ctk.CTkLabel(rec_col, text="✓ All systems secure.", font=ctk.CTkFont(size=13), text_color=self.TEXT, justify="left", anchor="nw", wraplength=420)
        self.recommend_text.pack(anchor="w", pady=(3, 0))

        # Right Column: Activity
        act_col = ctk.CTkFrame(b_inner, fg_color="transparent")
        act_col.pack(side="right", fill="both", expand=True, padx=(8, 0))
        self.activity_title = ctk.CTkLabel(act_col, text="Security Activity Status", font=ctk.CTkFont(size=14, weight="bold"), text_color=CYAN, anchor="w")
        self.activity_title.pack(anchor="w")
        self.activity_text = ctk.CTkLabel(act_col, text="● Protected local session.", font=ctk.CTkFont(size=13), text_color=self.MUTED, justify="left", anchor="nw", wraplength=420)
        self.activity_text.pack(anchor="w", pady=(3, 0))

        self.refresh_dashboard()
        self._update_live_dashboard()



    def build_help_page(self):
        p = self.page_frames["help"]
        scroll = ctk.CTkScrollableFrame(p, fg_color="transparent")
        scroll.pack(fill="both", expand=True, padx=18, pady=15)
        self.help_scroll = scroll
        hero = ctk.CTkFrame(scroll, fg_color=self.NAVY, corner_radius=18, border_width=1, border_color=self.BORDER)
        hero.pack(fill="x", pady=(0, 12))
        hero_top = ctk.CTkFrame(hero, fg_color="transparent")
        hero_top.pack(fill="x", padx=18, pady=(14, 0))
        ctk.CTkLabel(hero_top, text="◈", font=ctk.CTkFont(size=38), text_color=CYAN).pack(side="left")
        zoom_box = ctk.CTkFrame(hero_top, fg_color=self.CARD_DARK, corner_radius=10)
        zoom_box.pack(side="right")
        self.help_zoom_minus = ctk.CTkButton(zoom_box, text="−", width=38, height=32, fg_color="transparent", hover_color=self.NAVY_LIGHT, command=lambda: self.change_help_zoom(-0.1))
        self.help_zoom_minus.pack(side="left", padx=2, pady=2)
        self.help_zoom_value = ctk.CTkLabel(zoom_box, text="100%", width=58, font=ctk.CTkFont(size=11, weight="bold"), text_color=self.TEXT)
        self.help_zoom_value.pack(side="left")
        self.help_zoom_plus = ctk.CTkButton(zoom_box, text="+", width=38, height=32, fg_color="transparent", hover_color=self.NAVY_LIGHT, command=lambda: self.change_help_zoom(0.1))
        self.help_zoom_plus.pack(side="left", padx=2, pady=2)
        self.help_heading = ctk.CTkLabel(hero, text="", font=ctk.CTkFont(size=27, weight="bold"), text_color="white")
        self.help_heading.pack(anchor="w", padx=22, pady=(3, 4))
        self.help_intro_lbl = ctk.CTkLabel(hero, text="", wraplength=900, justify="left", anchor="w", font=ctk.CTkFont(size=14), text_color="#C5D7E4")
        self.help_intro_lbl.pack(fill="x", padx=22, pady=(0, 17))

        self.help_cards = {}
        sections = [("specs", "help_specs_title", "help_specs_text"), ("policy", "help_policy_title", "help_policy_text"), ("modules", "help_modules_title", "help_modules_text"), ("safe", "help_safe_title", "help_safe_text")]
        for key, title_key, text_key in sections:
            card = ctk.CTkFrame(scroll, fg_color=self.CARD, corner_radius=16, border_width=1, border_color=self.BORDER)
            card.pack(fill="x", pady=7)
            title = ctk.CTkLabel(card, text="", font=ctk.CTkFont(size=18, weight="bold"), text_color=CYAN, anchor="w")
            title.pack(fill="x", padx=20, pady=(16, 9))
            body = ctk.CTkLabel(card, text="", justify="left", anchor="nw", wraplength=920, font=ctk.CTkFont(size=14), text_color=self.TEXT)
            body.pack(fill="x", padx=20, pady=(0, 19))
            self.help_cards[key] = (title, body, title_key, text_key)

        note = ctk.CTkFrame(scroll, fg_color=self.CARD_DARK, corner_radius=14, border_width=1, border_color=self.BORDER)
        note.pack(fill="x", pady=(12, 5))
        self.help_hover_note = ctk.CTkLabel(note, text="", font=ctk.CTkFont(size=13, weight="bold"), text_color=YELLOW, justify="left")
        self.help_hover_note.pack(fill="x", padx=18, pady=14)
        self.bind_tooltip(note, "Help Center: large readable security guidance. Use + / − to zoom the text and hover over controls throughout the application for contextual help.")
        self._apply_help_zoom()

    def change_help_zoom(self, delta):
        self._help_zoom = max(0.9, min(1.7, round(self._help_zoom + delta, 2)))
        self._apply_help_zoom()

    def _apply_help_zoom(self):
        if not hasattr(self, "help_zoom_value"): return
        pct = int(self._help_zoom * 100)
        self.help_zoom_value.configure(text=f"{pct}%")
        title_size = max(16, int(18 * self._help_zoom))
        body_size = max(12, int(14 * self._help_zoom))
        intro_size = max(12, int(14 * self._help_zoom))
        self.help_heading.configure(font=ctk.CTkFont(size=max(23, int(27*self._help_zoom)), weight="bold"))
        self.help_intro_lbl.configure(font=ctk.CTkFont(size=intro_size))
        for title, body, _, _ in self.help_cards.values():
            title.configure(font=ctk.CTkFont(size=title_size, weight="bold"))
            body.configure(font=ctk.CTkFont(size=body_size))
        self.help_hover_note.configure(font=ctk.CTkFont(size=max(12, int(13*self._help_zoom)), weight="bold"))

    def calculate_dashboard_score(self):
        if self._dashboard_score_cache is not None:
            return self._dashboard_score_cache
        score = 100
        weak = 0
        breached = 0
        if self.vault_unlocked:
            for item in self.vault_data:
                result = self.analyze_password(item.get("password", ""))
                if result["score"] < 70:
                    weak += 1
                if item.get("breached", False):
                    breached += 1
            score -= min(30, weak * 7)
            score -= min(40, breached * 20)
        else:
            score -= 8
        self._dashboard_score_cache = (max(0, min(100, score)), weak, breached)
        return self._dashboard_score_cache

    def refresh_dashboard(self):
        if not hasattr(self, "score_value"): return
        score, weak, breached = self.calculate_dashboard_score()
        t=LANGUAGES[self.current_lang]
        self.record_score(score)
        self.score_value.configure(text=str(score), text_color=GREEN if score>=80 else YELLOW if score>=60 else RED)
        level=t["excellent"] if score>=90 else t["good"] if score>=75 else t["fair"] if score>=50 else t["critical"]
        self.score_title.configure(text=f"{t['overall_score']}  •  {level}")
        self.score_desc.configure(text=t["score_desc"])
        self.metric_cards["weak"][0].configure(text=str(weak)); self.metric_cards["breached"][0].configure(text=str(breached))
        self.metric_cards["vault"][0].configure(text=str(len(self.vault_data)) if self.vault_unlocked else "—")
        self.metric_cards["weak"][1].configure(text=t["weak_passwords"]); self.metric_cards["breached"][1].configure(text=t["breached_passwords"])
        self.metric_cards["vault"][1].configure(text=t["vault_status"]+ (" • "+t["healthy"] if self.vault_unlocked else " • "+t["locked"]))
        if hasattr(self,"quick_stats_labels"):
            self.quick_stats_labels["threats"].configure(text=str(breached*20+max(0,100-score)))
            self.quick_stats_labels["safe"].configure(text=f"{score}%")
            self.quick_stats_labels["status"].configure(text="● Online", text_color=GREEN)
        self.recommend_title.configure(text=t["recommendations"])
        recs=[]
        if not self.vault_unlocked: recs.append("🔒 "+t.get("vault_locked_msg","Unlock/create the encrypted vault to manage credentials safely."))
        if weak: recs.append(f"⚠ {weak} {t.get('weak_passwords','Weak Passwords')} — {t.get('recommendation','Recommendation')}")
        if breached: recs.append(f"🚨 {breached} {t.get('breached_passwords','Breached Passwords')} — {t.get('recommendation','Recommendation')}")
        if not recs: recs.append("✓ "+t["no_recommendations"])
        self.recommend_text.configure(text="\n\n".join(recs))
        self.activity_title.configure(text=t["activity"])
        self.activity_text.configure(text=(f"● LIVE LOCAL TELEMETRY\n• Vault: {t.get('vault_unlocked','Unlocked') if self.vault_unlocked else t.get('vault_locked','Locked')}\n• Last breach scan: {self.last_breach_scan or t['never']}\n• No SOC/Event Log/IOC background service running\n• No network activity unless you start a scan\n• Clipboard timeout: {self.clipboard_seconds}s"))
        self.dashboard_time.configure(text=datetime.now().strftime("%d %b %Y  •  %H:%M:%S"))

    def _update_live_dashboard(self):
        if getattr(self, "_dashboard_live_after", None):
            try:
                self.after_cancel(self._dashboard_live_after)
            except Exception:
                pass
            self._dashboard_live_after = None

        if not hasattr(self, "live_cards") or not self.winfo_exists():
            return
        if self.current_page != "dashboard":
            return

        try:
            cpu = psutil.cpu_percent(interval=None) if psutil else 0
            ram = psutil.virtual_memory().percent if psutil else 0
            disk = psutil.disk_usage(Path.home().anchor or os.path.abspath(os.sep)).percent if psutil else 0
            net = 0
            if psutil:
                try: net = len(psutil.net_connections(kind="inet"))
                except Exception: net = 0
            vals = {"cpu": cpu, "ram": ram, "disk": disk, "net": min(net, 100)}
            for k, v in vals.items():
                if k in self.live_cards:
                    self.live_cards[k][0].configure(text=f"{v:.0f}%" if k != "net" else str(net))
                    self.live_cards[k][1].set(min(1, max(0, float(v) / 100)))
                    self.live_cards[k][2].configure(text="Normal" if float(v) < 80 else "Attention")
            uptime = int(time.monotonic() - getattr(self, "_app_start_monotonic", time.monotonic()))
            if "uptime" in self.live_cards:
                self.live_cards["uptime"][0].configure(text=f"{uptime//60:02d}:{uptime%60:02d}")
                self.live_cards["uptime"][1].set((uptime % 60) / 60)
                self.live_cards["uptime"][2].configure(text="Running")
            if hasattr(self, "dashboard_live"):
                self.dashboard_live.configure(text="● LIVE LOCAL TELEMETRY  •  " + datetime.now().strftime("%H:%M:%S"))
        except Exception:
            pass
        if self.winfo_exists() and self.current_page == "dashboard":
            self._dashboard_live_after = self.after(2000, self._update_live_dashboard)

    # ========================================================
    # ANALYZER / GENERATOR
    # ========================================================
    def build_analyzer_page(self):
        p = self.page_frames["analyzer"]
        scroll = ctk.CTkScrollableFrame(p, fg_color="transparent")
        scroll.pack(fill="both", expand=True, padx=18, pady=15)
        heading_row = ctk.CTkFrame(scroll, fg_color="transparent")
        heading_row.pack(fill="x", pady=(0, 12))
        self.analyzer_heading = ctk.CTkLabel(heading_row, text="", font=ctk.CTkFont(size=22, weight="bold"), text_color=self.TEXT)
        self.analyzer_heading.pack(side="left")
        self.specs_btn = ctk.CTkButton(heading_row, text="📋 Password Specs", width=135, height=32, fg_color=self.NAVY, hover_color=BLUE, command=self.open_specs_help)
        self.specs_btn.pack(side="right", padx=4)
        self.policy_btn = ctk.CTkButton(heading_row, text="🛡 Security Policy", width=135, height=32, fg_color=self.NAVY, hover_color=BLUE, command=self.open_policy_help)
        self.policy_btn.pack(side="right", padx=4)

        card = ctk.CTkFrame(scroll, fg_color=self.CARD, corner_radius=14, border_width=1, border_color=self.BORDER)
        card.pack(fill="x", pady=5)
        self.info_label = ctk.CTkLabel(card, text="", font=ctk.CTkFont(size=14, weight="bold"), text_color=self.TEXT)
        self.info_label.pack(pady=(14, 8))
        entry_row = ctk.CTkFrame(card, fg_color="transparent")
        entry_row.pack(fill="x", padx=18, pady=(0, 12))
        self.password_entry = ctk.CTkEntry(entry_row, height=44, show="*", font=ctk.CTkFont(size=13), fg_color=self.ENTRY, border_color=self.NAVY, border_width=2, text_color=self.TEXT, placeholder_text="")
        self.password_entry.pack(side="left", fill="x", expand=True, padx=(0, 6))
        self.password_entry.bind("<KeyRelease>", self.check_strength_live)
        self.toggle_btn = ctk.CTkButton(entry_row, text="👁", width=45, height=44, fg_color=self.NAVY, hover_color=BLUE, command=self.toggle_visibility)
        self.toggle_btn.pack(side="right")

        self.length_label = ctk.CTkLabel(card, text="", font=ctk.CTkFont(size=11, weight="bold"), text_color=self.TEXT)
        self.length_label.pack(pady=(0, 4))
        self.length_progress = ctk.CTkProgressBar(card, height=8, fg_color=self.BORDER, progress_color=BLUE)
        self.length_progress.set(0)
        self.length_progress.pack(fill="x", padx=35, pady=(0, 10))
        self.strength_bar = ctk.CTkProgressBar(card, height=15, fg_color=self.BORDER, progress_color=RED)
        self.strength_bar.set(0)
        self.strength_bar.pack(fill="x", padx=35, pady=(0, 5))
        self.strength_label = ctk.CTkLabel(card, text="", font=ctk.CTkFont(size=14, weight="bold"), text_color=self.TEXT)
        self.strength_label.pack(pady=(0, 10))
        stats = ctk.CTkFrame(card, fg_color=self.NAVY, corner_radius=8)
        stats.pack(fill="x", padx=18, pady=(0, 14))
        self.score_label = ctk.CTkLabel(stats, text="", font=ctk.CTkFont(size=12, weight="bold"), text_color="white")
        self.score_label.pack(side="left", padx=15, pady=10)
        self.entropy_label = ctk.CTkLabel(stats, text="", font=ctk.CTkFont(size=12, weight="bold"), text_color="white")
        self.entropy_label.pack(side="right", padx=15, pady=10)

        analysis = ctk.CTkFrame(scroll, fg_color=self.CARD, corner_radius=14, border_width=1, border_color=self.BORDER)
        analysis.pack(fill="x", pady=8)
        self.analysis_title = ctk.CTkLabel(analysis, text="", font=ctk.CTkFont(size=13, weight="bold"), text_color=self.TEXT)
        self.analysis_title.pack(anchor="w", padx=18, pady=(12, 5))
        self.analysis_text = ctk.CTkLabel(analysis, text="", justify="left", anchor="w", font=ctk.CTkFont(size=13), text_color=self.TEXT)
        self.analysis_text.pack(fill="x", padx=18, pady=(0, 14))

        actions = ctk.CTkFrame(scroll, fg_color="transparent")
        actions.pack(fill="x", pady=5)
        self.generate_button = ctk.CTkButton(actions, text="", width=125, height=40, fg_color=BLUE, hover_color=self.NAVY, command=self.generate_password)
        self.generate_button.pack(side="left", padx=(0, 6))
        self.advanced_generate_button = ctk.CTkButton(actions, text="⚡ Advanced", width=105, height=40, fg_color=PURPLE, hover_color=self.NAVY, command=self.open_advanced_generator)
        self.advanced_generate_button.pack(side="left", padx=6)
        self.copy_button = ctk.CTkButton(actions, text="", width=105, height=40, fg_color=self.NAVY, hover_color=BLUE, command=self.copy_password)
        self.copy_button.pack(side="left", padx=6)
        self.export_button = ctk.CTkButton(actions, text="", width=105, height=40, fg_color=ORANGE, hover_color="#C65D10", command=self.save_to_file)
        self.export_button.pack(side="left", padx=6)
        self.scan_button = ctk.CTkButton(actions, text="", height=40, fg_color=GREEN, hover_color="#0E8751", command=self.scan_for_breaches)
        self.scan_button.pack(side="right", fill="x", expand=True, padx=(12, 0))
        self.result_label = ctk.CTkLabel(scroll, text="", font=ctk.CTkFont(size=11, weight="bold"), text_color=self.MUTED, wraplength=800, justify="center")
        self.result_label.pack(fill="x", pady=(8, 4))
        self.recommendation_label = ctk.CTkLabel(scroll, text="", font=ctk.CTkFont(size=11), text_color=self.MUTED, wraplength=850, justify="center")
        self.recommendation_label.pack(fill="x", pady=(0, 12))

    def toggle_visibility(self):
        self.show_hidden = not self.show_hidden
        self.password_entry.configure(show="" if self.show_hidden else "*")
        self.toggle_btn.configure(text="🙈" if self.show_hidden else "👁")

    def analyze_password(self, pwd):
        length = len(pwd)
        if not pwd:
            return {"score": 0, "entropy": 0, "checks": [], "strength": "Empty", "reasons": []}
        has_upper = bool(re.search(r"[A-Z]", pwd))
        has_lower = bool(re.search(r"[a-z]", pwd))
        has_num = bool(re.search(r"\d", pwd))
        has_sym = bool(re.search(r"[^A-Za-z0-9]", pwd))
        pool = (26 if has_upper else 0) + (26 if has_lower else 0) + (10 if has_num else 0) + (32 if has_sym else 0)
        entropy = length * math.log2(pool) if pool else 0
        lower = pwd.lower()
        common = lower in COMMON_PASSWORDS
        repeated = bool(re.search(r"(.)\1\1", pwd))
        sequence = self.has_sequence(pwd)
        keyboard = any(pattern in lower for pattern in KEYBOARD_PATTERNS)
        dictionary = any(word in lower for word in COMMON_WORDS if len(word) >= 5)
        date_like = bool(re.search(r"(?:19|20)\d{2}|\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b", pwd))
        unique_ratio = len(set(pwd)) / max(1, length)
        score = 0
        if length >= 8: score += 15
        if length >= 12: score += 20
        if length >= 16: score += 15
        if length >= 20: score += 5
        if has_upper: score += 10
        if has_lower: score += 10
        if has_num: score += 10
        if has_sym: score += 10
        if unique_ratio >= 0.70: score += 5
        if entropy >= 70: score += 5
        if repeated: score -= 10
        if sequence: score -= 12
        if keyboard: score -= 15
        if dictionary: score -= 10
        if date_like: score -= 8
        if common: score = min(score, 10)
        score = max(0, min(100, score))
        if score < 40:
            strength = "Weak"
        elif score < 70:
            strength = "Medium"
        elif score < 90:
            strength = "Strong"
        else:
            strength = "Very Strong"
        checks = [
            ("length", length >= 12, f"{length} characters"),
            ("upper", has_upper, "Present"),
            ("lower", has_lower, "Present"),
            ("number", has_num, "Present"),
            ("symbol", has_sym, "Present"),
            ("repeat", not repeated, "No obvious repetition"),
            ("sequence", not sequence, "No obvious sequence"),
            ("common", not common, "Not in common-password list"),
            ("pattern", not keyboard and not date_like, "No major predictable pattern"),
            ("dictionary", not dictionary, "No common dictionary fragment"),
            ("unique", unique_ratio >= 0.60, f"{unique_ratio * 100:.0f}% unique characters"),
        ]
        reasons = []
        if common: reasons.append("This is a commonly used password.")
        if repeated: reasons.append("Repeated characters reduce unpredictability.")
        if sequence: reasons.append("Sequential characters were detected.")
        if keyboard: reasons.append("A keyboard pattern was detected.")
        if dictionary: reasons.append("A common word appears in the password.")
        if date_like: reasons.append("A year/date-like pattern was detected.")
        if length < 12: reasons.append("Use at least 12 characters; longer is better.")
        return {"score": score, "entropy": entropy, "checks": checks, "strength": strength, "reasons": reasons}

    @staticmethod
    def has_sequence(pwd):
        s = pwd.lower()
        for i in range(len(s) - 3):
            chunk = s[i:i + 4]
            if chunk.isalpha() or chunk.isdigit():
                codes = [ord(c) for c in chunk]
                if all(codes[j] + 1 == codes[j + 1] for j in range(3)) or all(codes[j] - 1 == codes[j + 1] for j in range(3)):
                    return True
        return False

    def check_strength_live(self, event=None):
        t = LANGUAGES[self.current_lang]
        pwd = self.password_entry.get()
        length = len(pwd)
        self.length_label.configure(text=f"{t['password_length']}: {length} characters")
        self.length_progress.set(min(length / 24.0, 1.0))
        if not pwd:
            self.strength_bar.set(0)
            self.strength_label.configure(text=t["strength_empty"], text_color=self.TEXT)
            self.score_label.configure(text=f"{t['score']}: --")
            self.entropy_label.configure(text=f"{t['entropy']}: --")
            self.analysis_text.configure(text=t.get("analysis_empty", "Type a password above to view detailed security metrics."))
            self.recommendation_label.configure(text="")
            return
        result = self.analyze_password(pwd)
        score = result["score"]
        self.score_label.configure(text=f"{t['score']}: {score}/100")
        self.entropy_label.configure(text=f"{t['entropy']}: {result['entropy']:.1f} bits")
        self.strength_bar.set(score / 100.0)
        labels = {"Weak": t["weak"], "Medium": t["medium"], "Strong": t["strong"], "Very Strong": t["very_strong"]}
        col = RED if score < 40 else YELLOW if score < 70 else BLUE if score < 90 else GREEN
        self.strength_label.configure(text=labels[result["strength"]], text_color=col)
        self.strength_bar.configure(progress_color=col)
        lines = []
        for key, ok, detail in result["checks"]:
            label_key = {"length": "length_check", "upper": "upper_check", "lower": "lower_check", "number": "number_check", "symbol": "symbol_check", "repeat": "repeat_check", "sequence": "sequence_check", "common": "common_check", "pattern": "pattern_check", "dictionary": "dictionary_check", "unique": "unique_check"}[key]
            lines.append(f"{'✓' if ok else '⚠'} {t[label_key]} — {detail}")
        self.analysis_text.configure(text="\n".join(lines))
        if result["reasons"]:
            self.recommendation_label.configure(text=t["recommendation"] + ": " + " • ".join(result["reasons"]), text_color=YELLOW)
        else:
            self.recommendation_label.configure(text=t["recommendation"] + ": Use a unique password and enable MFA wherever possible.", text_color=GREEN)

    def generate_password(self):
        # secrets is used instead of random because this is security-sensitive output.
        length = 20
        groups = [string.ascii_uppercase, string.ascii_lowercase, string.digits, SYMBOLS]
        pwd_chars = [secrets.choice(group) for group in groups]
        all_chars = "".join(groups)
        pwd_chars.extend(secrets.choice(all_chars) for _ in range(length - len(pwd_chars)))
        secrets.SystemRandom().shuffle(pwd_chars)
        new_pwd = "".join(pwd_chars)
        self.password_entry.delete(0, "end")
        self.password_entry.insert(0, new_pwd)
        self.check_strength_live()
        self.result_label.configure(text=LANGUAGES[self.current_lang]["generated"], text_color=GREEN)
        self.log_event("Secure password generated", "INFO")

    def copy_password(self):
        pwd = self.password_entry.get()
        t = LANGUAGES[self.current_lang]
        if not pwd:
            self.result_label.configure(text=t["empty"], text_color=RED)
            return
        try:
            pyperclip.copy(pwd)
            self.result_label.configure(text=t["copied"].replace("30", str(self.clipboard_seconds)), text_color=GREEN)
            self.log_event("Password copied to clipboard", "INFO")
            if self.clipboard_after_id:
                self.after_cancel(self.clipboard_after_id)
            self.clipboard_after_id = self.after(self.clipboard_seconds * 1000, self.clear_clipboard)
        except Exception as e:
            self.result_label.configure(text=f"Clipboard error: {e}", text_color=RED)

    def clear_clipboard(self):
        try:
            pyperclip.copy("")
        except Exception:
            pass
        self.clipboard_after_id = None
        if hasattr(self, "result_label"):
            self.result_label.configure(text=LANGUAGES[self.current_lang]["clipboard_cleared"], text_color=BLUE)

    def save_to_file(self):
        pwd = self.password_entry.get()
        t = LANGUAGES[self.current_lang]
        if not pwd:
            self.result_label.configure(text=t["empty"], text_color=RED)
            return
        if not messagebox.askyesno(t["security_warning"], t["export_warning"] + "\n\nContinue with plaintext export?"):
            return
        path = filedialog.asksaveasfilename(initialdir=str(self._default_docs_dir()),defaultextension=".txt", filetypes=[("Text file", "*.txt")], title="Export plaintext password")
        if not path:
            return
        try:
            with open(path, "w", encoding="utf-8") as f:
                f.write(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] {pwd}\n")
            self.result_label.configure(text=f"Saved to {path}", text_color=YELLOW)
        except Exception as e:
            self.result_label.configure(text=f"Export error: {e}", text_color=RED)

    def open_specs_help(self):
        text = (
            "STRONG PASSWORD SPECIFICATIONS & GUIDE\n\n"
            "1. Prefer long, unique passwords or random passphrases.\n"
            "2. Use a password manager for unique credentials.\n"
            "3. Avoid names, birthdays, dictionary words and predictable patterns.\n"
            "4. Do not reuse passwords across important accounts.\n"
            "5. Enable MFA/2FA wherever available.\n"
            "6. Change a password immediately if you know it was exposed.\n"
            "7. Longer passwords are generally more resistant to brute-force guessing.\n"
            "8. Hardware security keys can provide strong phishing-resistant MFA.\n\n"
            "Tip: generated passwords use Python's cryptographically secure secrets module."
        )
        self.show_info_window("Password Specifications", text)

    def open_policy_help(self):
        text = (
            "CYBER SECURITY GUARD POLICY & PRIVACY\n\n"
            "• Password analysis is performed locally.\n"
            "• Breach checks use the HIBP range method: only the first 5 characters of a SHA-1 hash are sent.\n"
            "• The encrypted vault uses PBKDF2-HMAC-SHA256 key derivation and Fernet authenticated encryption when the cryptography package is installed.\n"
            "• The application does not intentionally transmit vault contents or master passwords.\n"
            "• Plaintext password export is available only after an explicit warning.\n"
            "• Security reports never include stored plaintext passwords.\n\n"
            "Important: no software can guarantee absolute security. Keep the application and operating system updated."
        )
        self.show_info_window("Security Policy & Privacy", text)

    def show_info_window(self, title, text):
        top = ctk.CTkToplevel(self)
        top.title(title)
        top.geometry("620x500")
        top.transient(self)
        top.grab_set()
        ctk.CTkLabel(top, text=title, font=ctk.CTkFont(size=16, weight="bold"), text_color=CYAN).pack(pady=12)
        box = ctk.CTkTextbox(top, font=ctk.CTkFont(size=11), fg_color=self.CARD, text_color=self.TEXT)
        box.pack(fill="both", expand=True, padx=15, pady=8)
        box.insert("0.0", text)
        box.configure(state="disabled")
        ctk.CTkButton(top, text=LANGUAGES[self.current_lang]["close"], fg_color=self.NAVY, command=top.destroy).pack(pady=10)

    # ========================================================
    # BREACH CHECKER
    # ========================================================
    def scan_for_breaches(self):
        pwd = self.password_entry.get()
        t = LANGUAGES[self.current_lang]
        if not pwd:
            self.result_label.configure(text=t["enter_first"], text_color=RED)
            return
        self.scan_button.configure(state="disabled")
        self.result_label.configure(text=t["scanning"], text_color=BLUE)
        threading.Thread(target=self._check_pwned_api, args=(pwd,), daemon=True).start()

    def _check_pwned_api(self, pwd):
        sha1_pwd = hashlib.sha1(pwd.encode("utf-8")).hexdigest().upper()
        prefix, suffix = sha1_pwd[:5], sha1_pwd[5:]
        try:
            res = requests.get(f"https://api.pwnedpasswords.com/range/{prefix}", timeout=8, headers={"User-Agent": "CyberSecurityGuard/12.0"})
            if res.status_code == 200:
                count = 0
                for line in res.text.splitlines():
                    parts = line.split(":", 1)
                    if len(parts) == 2 and parts[0].upper() == suffix:
                        count = int(parts[1])
                        break
                self.last_breach_scan = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                self.breach_history.append({"time": self.last_breach_scan, "breached": bool(count)})
                self.breach_history = self.breach_history[-20:]
                self._save_user_state()
                self.log_event("Breach check completed", "INFO")
                if self.vault_unlocked:
                    self._mark_current_password_breach(pwd, count > 0)
                msg = LANGUAGES[self.current_lang]["breached"].format(count) if count else LANGUAGES[self.current_lang]["safe"]
                self.after(0, lambda m=msg, c=count: self.finish_breach_scan(m, c > 0))
            else:
                self.after(0, lambda: self.finish_breach_scan(LANGUAGES[self.current_lang]["api_error"], True))
        except Exception:
            self.after(0, lambda: self.finish_breach_scan(LANGUAGES[self.current_lang]["api_error"], True))

    def _mark_current_password_breach(self, pwd, breached):
        # Only a boolean status is stored; the breach API response is not stored as plaintext data.
        for item in self.vault_data:
            if item.get("password") == pwd:
                item["breached"] = breached
        self.persist_vault_if_unlocked()

    def finish_breach_scan(self, msg, warning):
        self.scan_button.configure(state="normal")
        self.result_label.configure(text=msg, text_color=RED if warning else GREEN)
        self.refresh_dashboard()

    # ========================================================
    # ENCRYPTED VAULT
    # ========================================================
    def build_vault_page(self):
        p = self.page_frames["vault"]
        scroll = ctk.CTkScrollableFrame(p, fg_color="transparent")
        scroll.pack(fill="both", expand=True, padx=18, pady=15)
        self.vault_heading = ctk.CTkLabel(scroll, text="", font=ctk.CTkFont(size=22, weight="bold"), text_color=self.TEXT)
        self.vault_heading.pack(anchor="w", pady=(0, 12))
        top = ctk.CTkFrame(scroll, fg_color=self.CARD, corner_radius=14, border_width=1, border_color=self.BORDER)
        top.pack(fill="x", pady=5)
        self.vault_status_label = ctk.CTkLabel(top, text="", font=ctk.CTkFont(size=12, weight="bold"), text_color=YELLOW)
        self.vault_status_label.pack(side="left", padx=15, pady=12)
        self.vault_unlock_btn = ctk.CTkButton(top, text="", width=130, fg_color=BLUE, command=self.unlock_vault)
        self.vault_unlock_btn.pack(side="right", padx=6, pady=8)
        self.vault_lock_btn = ctk.CTkButton(top, text="", width=110, fg_color=self.NAVY, command=self.lock_vault)
        self.vault_lock_btn.pack(side="right", padx=6, pady=8)
        self.vault_backup_btn = ctk.CTkButton(top, text=LANGUAGES[self.current_lang]["backup_short"], width=100, fg_color=ORANGE, command=self.backup_vault)
        self.vault_backup_btn.pack(side="right", padx=6, pady=8)
        self.vault_restore_btn = ctk.CTkButton(top, text=LANGUAGES[self.current_lang]["restore_short"], width=100, fg_color=PURPLE, command=self.restore_vault)
        self.vault_restore_btn.pack(side="right", padx=6, pady=8)

        form = ctk.CTkFrame(scroll, fg_color=self.CARD, corner_radius=14, border_width=1, border_color=self.BORDER)
        form.pack(fill="x", pady=8)
        fields = [
            ("vault_account_entry", "Account / Service Name", "e.g. Gmail, GitHub"),
            ("vault_username_entry", "Username / Email", "e.g. user@example.com"),
            ("vault_pwd_entry", "Password / Secret", "Enter secret"),
            ("vault_url_entry", "Website / URL", "https://example.com"),
            ("vault_notes_entry", "Secure Notes", "Optional notes"),
        ]
        self.vault_labels = {}
        for attr, label, placeholder in fields:
            row = ctk.CTkFrame(form, fg_color="transparent")
            row.pack(fill="x", padx=15, pady=4)
            lbl = ctk.CTkLabel(row, text=label, width=155, anchor="w", text_color=self.TEXT)
            lbl.pack(side="left")
            entry = ctk.CTkEntry(row, height=35, placeholder_text=placeholder, fg_color=self.ENTRY, text_color=self.TEXT, border_color=self.BORDER)
            entry.pack(side="left", fill="x", expand=True)
            setattr(self, attr, entry)
            self.vault_labels[attr] = lbl
        self.vault_pwd_entry.configure(show="*")
        self.vault_pwd_eye = self._attach_eye_to_entry(self.vault_pwd_entry.master, self.vault_pwd_entry)
        self.vault_save_btn = ctk.CTkButton(form, text="", fg_color=GREEN, command=self.save_to_vault)
        self.vault_save_btn.pack(anchor="w", padx=15, pady=12)

        self.vault_saved_lbl = ctk.CTkLabel(scroll, text="", font=ctk.CTkFont(size=13, weight="bold"), text_color=self.TEXT)
        self.vault_saved_lbl.pack(anchor="w", pady=(12, 5))
        self.vault_list = ctk.CTkScrollableFrame(scroll, fg_color=self.CARD, corner_radius=12, height=260, border_width=1, border_color=self.BORDER)
        self.vault_list.pack(fill="both", expand=True, pady=5)

    def derive_vault_key(self, master_password, salt):
        if not CRYPTO_AVAILABLE:
            raise RuntimeError(LANGUAGES[self.current_lang]["crypto_missing"])
        kdf = PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=salt, iterations=390000)
        return base64.urlsafe_b64encode(kdf.derive(master_password.encode("utf-8")))

    def _derive_admin_recovery_key(self):
        secret = self.auth_store.get("admin", {}).get("totp_secret", "") if hasattr(self, "auth_store") else ""
        if not secret:
            return None
        digest = hashlib.sha256(("SAMUDRA-KAVACH-ADMIN-VAULT-RECOVERY|" + secret).encode("utf-8")).digest()
        return base64.urlsafe_b64encode(digest)

    def encrypt_vault_payload(self, data, master_password, salt=None, password_history=None):
        salt = salt or secrets.token_bytes(16)
        key = self.derive_vault_key(master_password, salt)
        token = Fernet(key).encrypt(json.dumps(data, ensure_ascii=False).encode("utf-8"))
        password_history = password_history or [self._rotation_entry(datetime.now(), "Vault Created")]
        payload = {"version": 2, "kdf": "PBKDF2-HMAC-SHA256", "iterations": 390000, "salt": base64.b64encode(salt).decode(), "data": token.decode("utf-8"), "password_history": password_history[-20:]}
        recovery_key = self._derive_admin_recovery_key()
        if recovery_key:
            payload["admin_recovery"] = Fernet(recovery_key).encrypt(json.dumps(data, ensure_ascii=False).encode("utf-8")).decode("utf-8")
        return payload

    def decrypt_vault_payload(self, payload, master_password):
        if not CRYPTO_AVAILABLE:
            raise RuntimeError(LANGUAGES[self.current_lang]["crypto_missing"])
        salt = base64.b64decode(payload["salt"])
        key = self.derive_vault_key(master_password, salt)
        plain = Fernet(key).decrypt(payload["data"].encode("utf-8"))
        return json.loads(plain.decode("utf-8"))

    def vault_exists(self):
        return self._active_vault_file().exists()

    def prompt_master_password(self, create=False):
        if not CRYPTO_AVAILABLE:
            messagebox.showerror(LANGUAGES[self.current_lang]["security_warning"], LANGUAGES[self.current_lang]["crypto_missing"])
            return None
        dialog = ctk.CTkToplevel(self)
        dialog.title(LANGUAGES[self.current_lang]["vault_auth"])
        dialog.geometry("470x270")
        dialog.resizable(False, False)
        dialog.transient(self)
        dialog.grab_set()
        result = {"password": None}
        title = "Create Encrypted Vault" if create else "Unlock Encrypted Vault"
        ctk.CTkLabel(dialog, text="🔐", font=ctk.CTkFont(size=32), text_color=CYAN).pack(pady=(16, 0))
        ctk.CTkLabel(dialog, text=title, font=ctk.CTkFont(size=17, weight="bold"), text_color=self.TEXT).pack(pady=5)
        ctk.CTkLabel(dialog, text=LANGUAGES[self.current_lang]["master_setup"] if create else "Enter your master password.", text_color=self.MUTED).pack(pady=3)
        p1 = ctk.CTkEntry(dialog, width=350, height=38, show="*", placeholder_text=LANGUAGES[self.current_lang]["master_password"], fg_color=self.ENTRY, text_color=self.TEXT)
        p1.pack(pady=8)
        self._attach_eye_to_entry(dialog, p1)
        p2 = None
        if create:
            p2 = ctk.CTkEntry(dialog, width=350, height=38, show="*", placeholder_text=LANGUAGES[self.current_lang]["confirm_password"], fg_color=self.ENTRY, text_color=self.TEXT)
            p2.pack(pady=2)
            self._attach_eye_to_entry(dialog, p2)
        error = ctk.CTkLabel(dialog, text="", text_color=RED, font=ctk.CTkFont(size=10))
        error.pack(pady=2)

        def submit():
            pwd = p1.get()
            if create:
                if len(pwd) < 10:
                    error.configure(text=LANGUAGES[self.current_lang]["master_short"])
                    return
                if pwd != p2.get():
                    error.configure(text=LANGUAGES[self.current_lang]["master_mismatch"])
                    return
            if not pwd:
                error.configure(text=LANGUAGES[self.current_lang]["enter_first"])
                return
            result["password"] = pwd
            dialog.destroy()
        ctk.CTkButton(dialog, text=LANGUAGES[self.current_lang]["create_vault"] if create else LANGUAGES[self.current_lang]["unlock"], fg_color=BLUE, command=submit).pack(pady=8)
        if not create and self.current_role == "Individual":
            ctk.CTkButton(dialog, text="Forgot Master Password?", fg_color="transparent", text_color=CYAN, hover_color=self.NAVY_LIGHT, command=lambda: (dialog.destroy(), self._request_vault_recovery())).pack(pady=(0,6))
        dialog.bind("<Return>", lambda e: submit())
        self.wait_window(dialog)
        return result["password"]

    def unlock_vault(self):
        if self.vault_unlocked:
            return
        try:
            if not self._active_vault_file().exists():
                master = self.prompt_master_password(create=True)
                if not master:
                    return
                VAULT_DIR.mkdir(parents=True, exist_ok=True)
                payload = self.encrypt_vault_payload([], master)
                self._active_vault_file().write_text(json.dumps(payload, indent=2), encoding="utf-8")
                self.vault_key = master
                self.vault_data = []
            else:
                master = self.prompt_master_password(create=False)
                if not master:
                    return
                payload = json.loads(self._active_vault_file().read_text(encoding="utf-8"))
                data = self.decrypt_vault_payload(payload, master)
                if not isinstance(data, list):
                    raise ValueError("Invalid vault structure")
                self.vault_key = master
                self.vault_data = data
            self.vault_unlocked = True
            if "payload" in locals() and payload.get("version") == 1:
                # One-time migration: preserve existing data and add the Admin recovery envelope.
                self.persist_vault_if_unlocked()
            self._dashboard_score_cache = None
            self._credential_health_cache = None
            self.log_event("Encrypted vault unlocked", "INFO")
            self.vault_status_label.configure(text="● " + LANGUAGES[self.current_lang]["vault_unlocked"], text_color=GREEN)
            self.refresh_vault_view()
            # Keep the UI responsive after unlock; dashboard recalculation is deferred.
            self.after(120, self.refresh_dashboard)
        except (InvalidToken, ValueError, KeyError, json.JSONDecodeError, RuntimeError):
            messagebox.showerror(LANGUAGES[self.current_lang]["security_warning"], LANGUAGES[self.current_lang]["invalid_vault"])
        except Exception as e:
            messagebox.showerror(LANGUAGES[self.current_lang]["security_warning"], str(e))

    def lock_vault(self):
        try:
            self._save_user_state()
        except Exception: pass
        self.vault_data = []
        self.vault_key = None
        self.vault_unlocked = False
        self.lock_secure_documents()
        self._dashboard_score_cache = None
        self._credential_health_cache = None
        self.log_event("Encrypted vault locked", "INFO")
        if hasattr(self, "vault_status_label"):
            self.vault_status_label.configure(text="● " + LANGUAGES[self.current_lang]["locked"], text_color=YELLOW)
        self.refresh_vault_view()
        self.refresh_dashboard()

    def persist_vault_if_unlocked(self):
        if not self.vault_unlocked or not self.vault_key:
            return False
        try:
            old_payload = json.loads(self._active_vault_file().read_text(encoding="utf-8")) if self._active_vault_file().exists() else None
            salt = base64.b64decode(old_payload["salt"]) if old_payload else None
            payload = self.encrypt_vault_payload(self.vault_data, self.vault_key, salt=salt, password_history=(old_payload or {}).get("password_history"))
            VAULT_DIR.mkdir(parents=True, exist_ok=True)
            temp = self._active_vault_file().with_suffix(".tmp")
            temp.write_text(json.dumps(payload, indent=2), encoding="utf-8")
            os.replace(temp, self._active_vault_file())
            return True
        except Exception as e:
            messagebox.showerror(LANGUAGES[self.current_lang]["vault_error"], str(e))
            return False

    def save_to_vault(self):
        if not self.vault_unlocked:
            self.unlock_vault()
            if not self.vault_unlocked:
                return
        acc = self.vault_account_entry.get().strip()
        username = self.vault_username_entry.get().strip()
        pwd = self.vault_pwd_entry.get()
        url = self.vault_url_entry.get().strip()
        notes = self.vault_notes_entry.get().strip()
        if not acc or not pwd:
            messagebox.showwarning(LANGUAGES[self.current_lang]["vault"], LANGUAGES[self.current_lang]["account_required"])
            return
        item = {
            "id": secrets.token_hex(8), "account": acc, "username": username,
            "password": pwd, "url": url, "notes": notes,
            "created": datetime.now().strftime("%Y-%m-%d %H:%M:%S"), "updated": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "breached": False,
        }
        self.vault_data.append(item)
        self._dashboard_score_cache = None
        self._credential_health_cache = None
        self.log_event("Credential added to encrypted vault", "INFO")
        if self.persist_vault_if_unlocked():
            for entry in [self.vault_account_entry, self.vault_username_entry, self.vault_pwd_entry, self.vault_url_entry, self.vault_notes_entry]:
                entry.delete(0, "end")
            messagebox.showinfo("Vault", LANGUAGES[self.current_lang]["saved"])
            self.refresh_vault_view()
            self.refresh_dashboard()

    def refresh_vault_view(self):
        if not hasattr(self, "vault_list"):
            return
        for child in self.vault_list.winfo_children():
            child.destroy()
        if not self.vault_unlocked:
            self.vault_saved_lbl.configure(text=LANGUAGES[self.current_lang]["vault_locked_msg"])
            ctk.CTkLabel(self.vault_list, text="🔒  VAULT LOCKED", font=ctk.CTkFont(size=18, weight="bold"), text_color=YELLOW).pack(pady=45)
            return
        self.vault_saved_lbl.configure(text=f"{LANGUAGES[self.current_lang]['vault']}  •  {len(self.vault_data)} entries")
        if not self.vault_data:
            ctk.CTkLabel(self.vault_list, text=LANGUAGES[self.current_lang]["vault_empty"], text_color=self.MUTED).pack(pady=45)
            return
        for item in self.vault_data:
            card = ctk.CTkFrame(self.vault_list, fg_color=self.CARD_DARK, corner_radius=9, border_width=1, border_color=self.BORDER)
            card.pack(fill="x", padx=8, pady=5)
            left = ctk.CTkFrame(card, fg_color="transparent")
            left.pack(side="left", fill="x", expand=True, padx=12, pady=8)
            ctk.CTkLabel(left, text=item.get("account", "Unnamed"), font=ctk.CTkFont(size=12, weight="bold"), text_color=self.TEXT).pack(anchor="w")
            meta = item.get("username", "") or item.get("url", "") or "Secret stored"
            risk = "  ⚠ BREACHED" if item.get("breached") else ""
            ctk.CTkLabel(left, text=f"{meta}  •  {item.get('updated', '')}{risk}", font=ctk.CTkFont(size=10), text_color=RED if risk else self.MUTED).pack(anchor="w")
            view_btn=ctk.CTkButton(card,text=LANGUAGES[self.current_lang]["view_entry"],width=105,height=30,fg_color=BLUE,command=lambda x=item:self.view_vault_entry(x)); view_btn.pack(side="right",padx=5,pady=8)
            delete_btn=ctk.CTkButton(card,text=LANGUAGES[self.current_lang]["delete"],width=75,height=30,fg_color=RED,hover_color="#A92F2F",command=lambda x=item:self.delete_vault_entry(x)); delete_btn.pack(side="right",padx=5,pady=8)
            self.bind_tooltip(view_btn,"View / Copy: open the selected vault record and optionally reveal or copy its password.")
            self.bind_tooltip(delete_btn,"Delete: permanently remove this credential from the unlocked vault after confirmation.")

    def view_vault_entry(self, item):
        dialog = ctk.CTkToplevel(self)
        dialog.title(item.get("account", "Vault Entry"))
        dialog.geometry("520x460")
        dialog.transient(self)
        dialog.grab_set()
        ctk.CTkLabel(dialog, text=item.get("account", ""), font=ctk.CTkFont(size=18, weight="bold"), text_color=CYAN).pack(pady=15)
        fields = [("Username", item.get("username", "")), ("Password", item.get("password", "")), ("URL", item.get("url", "")), ("Notes", item.get("notes", "")), ("Created", item.get("created", ""))]
        for label, value in fields:
            row = ctk.CTkFrame(dialog, fg_color="transparent")
            row.pack(fill="x", padx=20, pady=4)
            ctk.CTkLabel(row, text=label, width=90, anchor="w", text_color=self.MUTED).pack(side="left")
            e = ctk.CTkEntry(row, height=32, fg_color=self.ENTRY, text_color=self.TEXT)
            e.pack(side="left", fill="x", expand=True)
            e.insert(0, value)
            e.configure(state="readonly", show="*" if label == "Password" else "")
            if label == "Password":
                self._attach_eye_to_entry(row, e)
                e.bind("<Button-1>", lambda event, ent=e, val=value: self.reveal_entry_value(ent, val))
        ctk.CTkButton(dialog, text=LANGUAGES[self.current_lang]["copy_password"], fg_color=BLUE, command=lambda: self.copy_secret_value(item.get("password", ""))).pack(pady=12)
        ctk.CTkButton(dialog, text=LANGUAGES[self.current_lang]["close"], fg_color=self.NAVY, command=dialog.destroy).pack()

    def reveal_entry_value(self, entry, value):
        entry.configure(state="normal", show="")
        entry.delete(0, "end")
        entry.insert(0, value)
        entry.configure(state="readonly")

    def copy_secret_value(self, value):
        if not value:
            return
        pyperclip.copy(value)
        if self.clipboard_after_id:
            self.after_cancel(self.clipboard_after_id)
        self.clipboard_after_id = self.after(self.clipboard_seconds * 1000, self.clear_clipboard)

    def delete_vault_entry(self, item):
        if not messagebox.askyesno(LANGUAGES[self.current_lang]["security_warning"], LANGUAGES[self.current_lang]["confirm_delete"]):
            return
        self.vault_data = [x for x in self.vault_data if x.get("id") != item.get("id")]
        self._dashboard_score_cache = None
        self._credential_health_cache = None
        self.persist_vault_if_unlocked()
        self.refresh_vault_view()
        self.refresh_dashboard()

    def backup_vault(self):
        if not self._active_vault_file().exists():
            messagebox.showwarning(LANGUAGES[self.current_lang]["vault"], LANGUAGES[self.current_lang]["no_vault"])
            return
        path = filedialog.asksaveasfilename(initialdir=str(self._default_docs_dir()),defaultextension=".csgv", filetypes=[("Cyber Security Guard Vault", "*.csgv")])
        if not path:
            return
        try:
            Path(path).write_text(self._active_vault_file().read_text(encoding="utf-8"), encoding="utf-8")
            messagebox.showinfo("Vault", LANGUAGES[self.current_lang]["backup_saved"])
        except Exception as e:
            messagebox.showerror("Vault", str(e))

    def restore_vault(self):
        path = filedialog.askopenfilename(initialdir=str(self._default_docs_dir()),filetypes=[("Cyber Security Guard Vault", "*.csgv"), ("All files", "*.*")])
        if not path:
            return
        temp = None
        try:
            payload = json.loads(Path(path).read_text(encoding="utf-8"))
            if not isinstance(payload, dict) or not all(k in payload for k in ("version", "salt", "data")):
                raise ValueError("Invalid vault format")
            if payload.get("version") not in (1, 2) or payload.get("kdf") != "PBKDF2-HMAC-SHA256":
                raise ValueError("Unsupported vault version")
            salt = base64.b64decode(payload["salt"], validate=True)
            if len(salt) != 16 or not isinstance(payload.get("data"), str) or not payload["data"]:
                raise ValueError("Invalid encrypted vault payload")
            if CRYPTO_AVAILABLE:
                token = payload["data"].encode("ascii")
                decoded = base64.urlsafe_b64decode(token)
                if len(decoded) < 57 or not decoded.startswith(b"\x80"):
                    raise ValueError("Invalid encrypted payload")
            VAULT_DIR.mkdir(parents=True, exist_ok=True)
            temp = self._active_vault_file().with_suffix(".restore.tmp")
            temp.write_text(json.dumps(payload, indent=2), encoding="utf-8")
            os.replace(temp, self._active_vault_file())
            self.vault_data=[]; self.vault_key=None; self.vault_unlocked=False
            self._dashboard_score_cache=None; self._credential_health_cache=None
            self.refresh_vault_view(); self.refresh_dashboard()
            self.log_event("Encrypted vault restored", "INFO")
            messagebox.showinfo("Vault", LANGUAGES[self.current_lang]["restore_success"])
        except Exception:
            if temp is not None:
                try: temp.unlink(missing_ok=True)
                except Exception: pass
            messagebox.showerror("Vault", LANGUAGES[self.current_lang]["restore_fail"])

    # ========================================================
    # SECURE DOCUMENTS
    # ========================================================
    def _active_documents_dir(self, user_id=None):
        if (user_id or self.current_user_id) and self.current_role == "Individual" and user_id is None:
            base = self._user_dir() / "secure_documents"
        elif user_id and user_id != self.current_user_id:
            base = self._user_dir(user_id) / "secure_documents"
        elif self.current_role == "Individual":
            base = self._user_dir() / "secure_documents"
        else:
            base = VAULT_DIR / "secure_documents"
        base.mkdir(parents=True, exist_ok=True)
        return base

    def _active_documents_index(self):
        return self._active_documents_dir() / "documents.csgd"

    def _secure_documents_payload(self, data, master_password, salt=None, password_history=None):
        if not CRYPTO_AVAILABLE:
            raise RuntimeError(LANGUAGES[self.current_lang].get("crypto_missing", "Cryptography support is unavailable."))
        salt = salt or secrets.token_bytes(16)
        key = self.derive_vault_key(master_password, salt)
        token = Fernet(key).encrypt(json.dumps(data, ensure_ascii=False).encode("utf-8"))
        password_history = password_history or [self._rotation_entry(datetime.now(), "Secure Documents Created")]
        return {
            "version": 1,
            "kdf": "PBKDF2-HMAC-SHA256",
            "iterations": 390000,
            "salt": base64.b64encode(salt).decode("ascii"),
            "data": token.decode("utf-8"),
            "password_history": password_history[-20:],
        }

    def _secure_documents_decrypt_payload(self, payload, master_password):
        if not CRYPTO_AVAILABLE:
            raise RuntimeError(LANGUAGES[self.current_lang].get("crypto_missing", "Cryptography support is unavailable."))
        if not isinstance(payload, dict) or payload.get("version") != 1:
            raise ValueError("Invalid secure documents format")
        salt = base64.b64decode(payload["salt"], validate=True)
        key = self.derive_vault_key(master_password, salt)
        data = Fernet(key).decrypt(payload["data"].encode("ascii"))
        return json.loads(data.decode("utf-8"))

    def build_secure_documents_page(self):
        p = self.page_frames["documents"]
        scroll = ctk.CTkScrollableFrame(p, fg_color="transparent")
        scroll.pack(fill="both", expand=True, padx=18, pady=15)
        self.secure_documents_heading = ctk.CTkLabel(scroll, text="📁 Secure Documents", font=ctk.CTkFont(size=22, weight="bold"), text_color=self.TEXT)
        self.secure_documents_heading.pack(anchor="w", pady=(0, 12))

        top = ctk.CTkFrame(scroll, fg_color=self.CARD, corner_radius=14, border_width=1, border_color=self.BORDER)
        top.pack(fill="x", pady=5)
        self.secure_documents_status_label = ctk.CTkLabel(top, text="● LOCKED", font=ctk.CTkFont(size=12, weight="bold"), text_color=YELLOW)
        self.secure_documents_status_label.pack(side="left", padx=15, pady=12)
        self.secure_documents_unlock_btn = ctk.CTkButton(top, text="Unlock", width=110, fg_color=BLUE, command=self.unlock_secure_documents)
        self.secure_documents_unlock_btn.pack(side="right", padx=6, pady=8)
        self.secure_documents_lock_btn = ctk.CTkButton(top, text="Lock", width=90, fg_color=self.NAVY, command=self.lock_secure_documents)
        self.secure_documents_lock_btn.pack(side="right", padx=6, pady=8)
        self.secure_documents_backup_btn = ctk.CTkButton(top, text="💾 Backup", width=95, fg_color=ORANGE, command=self.backup_secure_documents)
        self.secure_documents_backup_btn.pack(side="right", padx=6, pady=8)
        self.secure_documents_restore_btn = ctk.CTkButton(top, text="↥ Restore", width=95, fg_color=PURPLE, command=self.restore_secure_documents)
        self.secure_documents_restore_btn.pack(side="right", padx=6, pady=8)
        self.secure_documents_import_btn = ctk.CTkButton(top, text="📄 Import Documents", width=155, fg_color=GREEN, command=self.import_secure_document)
        self.secure_documents_import_btn.pack(side="right", padx=6, pady=8)
        self.secure_documents_folder_btn = ctk.CTkButton(top, text="📁 Import Folder", width=125, fg_color=BLUE, command=self.import_secure_document_folder)
        self.secure_documents_folder_btn.pack(side="right", padx=6, pady=8)
        self.secure_documents_new_folder_btn = ctk.CTkButton(top, text="＋ New Folder", width=110, fg_color=CYAN, text_color="#061522", command=self.create_selected_document_folder)
        self.secure_documents_new_folder_btn.pack(side="right", padx=6, pady=8)
        self.secure_documents_subject_btn = ctk.CTkButton(top, text="＋ New Subject", width=125, fg_color=PURPLE, command=self.create_document_subject)
        self.secure_documents_subject_btn.pack(side="right", padx=6, pady=8)

        controls = ctk.CTkFrame(scroll, fg_color=self.CARD, corner_radius=14, border_width=1, border_color=self.BORDER)
        controls.pack(fill="x", pady=8)
        ctk.CTkLabel(controls, text="Subject:", width=90, anchor="w", text_color=self.TEXT).pack(side="left", padx=(15, 5), pady=12)
        self.secure_documents_subject_menu = ctk.CTkOptionMenu(controls, values=["No Subject"], width=240, fg_color=BLUE, button_color=self.NAVY_LIGHT, dropdown_fg_color=self.NAVY)
        self.secure_documents_subject_menu.pack(side="left", padx=5, pady=8)
        self.secure_documents_info = ctk.CTkLabel(controls, text="Create a subject, then import documents from your PC.", text_color=self.MUTED)
        self.secure_documents_info.pack(side="left", padx=15, pady=12)

        self.secure_documents_saved_lbl = ctk.CTkLabel(scroll, text="🔒 Secure Documents Locked", font=ctk.CTkFont(size=13, weight="bold"), text_color=self.TEXT)
        self.secure_documents_saved_lbl.pack(anchor="w", pady=(12, 5))
        self.secure_documents_list = ctk.CTkScrollableFrame(scroll, fg_color=self.CARD, corner_radius=12, height=420, border_width=1, border_color=self.BORDER)
        self.secure_documents_list.pack(fill="both", expand=True, pady=5)
        self.refresh_secure_documents_view()

    def _secure_documents_subject_names(self):
        return [x.get("name", "").strip() for x in self.secure_documents_data.get("subjects", []) if x.get("name", "").strip()]

    def _find_document_subject(self, name):
        for subject in self.secure_documents_data.setdefault("subjects", []):
            if subject.get("name") == name:
                return subject
        return None

    def _persist_secure_documents(self):
        # Secure Documents has its own master-password session. It must not depend
        # on Secure Vault being unlocked at the same time.
        if not self.secure_documents_unlocked or not self.secure_documents_key:
            return False
        try:
            path = self._active_documents_index()
            old_payload = json.loads(path.read_text(encoding="utf-8")) if path.exists() else None
            salt = base64.b64decode(old_payload["salt"]) if old_payload and old_payload.get("salt") else None
            master_key = self.secure_documents_key
            payload = self._secure_documents_payload(self.secure_documents_data, master_key, salt=salt, password_history=(old_payload or {}).get("password_history"))
            tmp = path.with_suffix(".tmp")
            tmp.write_text(json.dumps(payload, indent=2), encoding="utf-8")
            os.replace(tmp, path)
            return True
        except Exception as e:
            messagebox.showerror("Secure Documents", str(e))
            return False

    def _secure_documents_subject_meta_path(self):
        return self._active_documents_dir() / "subjects.meta"

    def _load_pending_document_subjects(self):
        try:
            path = self._secure_documents_subject_meta_path()
            if path.exists():
                data = json.loads(path.read_text(encoding="utf-8"))
                if isinstance(data, list):
                    self._secure_documents_pending_subjects = [str(x).strip() for x in data if str(x).strip()]
        except Exception:
            self._secure_documents_pending_subjects = []

    def _save_pending_document_subjects(self):
        try:
            path = self._secure_documents_subject_meta_path()
            tmp = path.with_suffix(".tmp")
            tmp.write_text(json.dumps(sorted(set(self._secure_documents_pending_subjects)), ensure_ascii=False, indent=2), encoding="utf-8")
            os.replace(tmp, path)
            return True
        except Exception:
            return False

    def unlock_secure_documents(self):
        if self.secure_documents_unlocked:
            return
        if not CRYPTO_AVAILABLE:
            messagebox.showerror("Secure Documents", LANGUAGES[self.current_lang].get("crypto_missing", "Cryptography support is unavailable."))
            return
        try:
            # Secure Documents has its own unlock session. The master password is
            # requested every time the section is unlocked, even if Secure Vault
            # is already unlocked.
            path = self._active_documents_index()
            if path.exists():
                master = self.prompt_master_password(create=False)
                if not master:
                    return
                payload = json.loads(path.read_text(encoding="utf-8"))
                try:
                    data = self._secure_documents_decrypt_payload(payload, master)
                except Exception:
                    # Backward compatibility for an older build that encrypted the
                    # Secure Documents index with the Secure Vault master key.
                    if self.vault_key and self.vault_key != master:
                        data = self._secure_documents_decrypt_payload(payload, self.secure_documents_key)
                    else:
                        raise
                if not isinstance(data, dict) or not isinstance(data.get("subjects", []), list):
                    raise ValueError("Invalid secure documents structure")
                self.secure_documents_key = master
                self.secure_documents_data = data
            else:
                master = self.prompt_master_password(create=True)
                if not master:
                    return
                self.secure_documents_key = master
                self.secure_documents_data = {"subjects": []}

            self._load_pending_document_subjects()
            for name in self._secure_documents_pending_subjects:
                if not self._find_document_subject(name):
                    self.secure_documents_data["subjects"].append({"id": secrets.token_hex(8), "name": name, "documents": [], "folders": []})
            self.secure_documents_unlocked = True
            if not self._persist_secure_documents():
                self.secure_documents_unlocked = False
                self.secure_documents_key = None
                return
            self._secure_documents_pending_subjects = []
            try: self._secure_documents_subject_meta_path().unlink(missing_ok=True)
            except Exception: pass
            self.log_event("Secure Documents unlocked", "INFO")
            self.refresh_secure_documents_view()
        except (InvalidToken, ValueError, KeyError, json.JSONDecodeError, RuntimeError, TypeError):
            self.secure_documents_key = None
            messagebox.showerror("Secure Documents", "Unable to unlock Secure Documents. The Secure Documents master password may be incorrect or the document store may be damaged.")
        except Exception as e:
            self.secure_documents_key = None
            messagebox.showerror("Secure Documents", str(e))

    def lock_secure_documents(self):
        if not getattr(self, "secure_documents_unlocked", False):
            return
        self.secure_documents_data = {"subjects": []}
        self.secure_documents_key = None
        self.secure_documents_unlocked = False
        self.log_event("Secure Documents locked", "INFO")
        self.refresh_secure_documents_view()

    def _document_container(self, subject, folder=None):
        if folder is None:
            subject.setdefault("folders", [])
            subject.setdefault("documents", [])
            return subject
        folder.setdefault("folders", [])
        folder.setdefault("documents", [])
        return folder

    def _prepare_document_tree(self):
        # Backward-compatible migration: old subjects only had a documents list.
        for subject in self.secure_documents_data.setdefault("subjects", []):
            subject.setdefault("folders", [])
            subject.setdefault("documents", [])
            def prepare(folder):
                folder.setdefault("folders", [])
                folder.setdefault("documents", [])
                for child in folder.get("folders", []):
                    prepare(child)
            for folder in subject.get("folders", []):
                prepare(folder)

    def _document_name_exists(self, container, name, exclude_id=None):
        wanted=name.strip().lower()
        for f in container.get("folders", []):
            if f.get("id") != exclude_id and f.get("name", "").strip().lower() == wanted:
                return True
        for item in container.get("documents", []):
            if item.get("id") != exclude_id and item.get("filename", "").strip().lower() == wanted:
                return True
        return False

    def _create_document_folder(self, subject, parent_folder=None):
        if not self.secure_documents_unlocked:
            return
        dialog=ctk.CTkToplevel(self); dialog.title("New Folder"); dialog.geometry("430x190"); dialog.transient(self); dialog.grab_set()
        ctk.CTkLabel(dialog,text="Create New Folder",font=ctk.CTkFont(size=18,weight="bold"),text_color=CYAN).pack(pady=(18,8))
        entry=ctk.CTkEntry(dialog,width=340,height=38,placeholder_text="Folder name")
        entry.pack(pady=8); error=ctk.CTkLabel(dialog,text="",text_color=RED); error.pack()
        container=self._document_container(subject,parent_folder)
        def submit():
            name=re.sub(r"\s+"," ",entry.get().strip())
            if not name: error.configure(text="Enter a folder name."); return
            if len(name)>100: error.configure(text="Folder name is too long."); return
            if self._document_name_exists(container,name): error.configure(text="A file or folder with this name already exists."); return
            container.setdefault("folders",[]).append({"id":secrets.token_hex(8),"name":name,"documents":[],"folders":[]})
            self._persist_secure_documents(); dialog.destroy(); self.refresh_secure_documents_view()
        ctk.CTkButton(dialog,text="Create Folder",fg_color=BLUE,command=submit).pack(pady=8)
        entry.focus_set(); dialog.bind("<Return>",lambda e:submit())

    def create_selected_document_folder(self):
        if not self.secure_documents_unlocked:
            messagebox.showwarning("Secure Documents", "Unlock Secure Documents first, then create a folder.")
            return
        subject_name = self.secure_documents_subject_menu.get() if hasattr(self, "secure_documents_subject_menu") else ""
        subject = self._find_document_subject(subject_name)
        if not subject:
            messagebox.showwarning("Secure Documents", "Create or select a subject first.")
            return
        # A top-level folder is the visible default. Nested folders remain available
        # from each folder's right-click New Folder action.
        self._create_document_folder(subject, None)

    def _create_document_file(self, subject, parent_folder=None):
        if not self.secure_documents_unlocked:
            return
        dialog=ctk.CTkToplevel(self); dialog.title("New File"); dialog.geometry("460x210"); dialog.transient(self); dialog.grab_set()
        ctk.CTkLabel(dialog,text="Create New File",font=ctk.CTkFont(size=18,weight="bold"),text_color=CYAN).pack(pady=(18,8))
        entry=ctk.CTkEntry(dialog,width=370,height=38,placeholder_text="Example: Notes.txt")
        entry.pack(pady=8); error=ctk.CTkLabel(dialog,text="",text_color=RED); error.pack()
        container=self._document_container(subject,parent_folder)
        def submit():
            name=entry.get().strip()
            if not name: error.configure(text="Enter a file name."); return
            if len(name)>160 or any(ch in name for ch in '<>:"/\\|?*'): error.configure(text="Invalid file name."); return
            if self._document_name_exists(container,name): error.configure(text="A file or folder with this name already exists."); return
            raw=b""
            try:
                file_key=Fernet.generate_key(); encrypted=Fernet(file_key).encrypt(raw); doc_id=secrets.token_hex(12); storage_name=doc_id+".csd"
                (self._active_documents_dir()/storage_name).write_bytes(encrypted)
                container.setdefault("documents",[]).append({"id":doc_id,"filename":name,"size":0,"created":datetime.now().strftime("%Y-%m-%d %H:%M:%S"),"storage":storage_name,"file_key":base64.urlsafe_b64encode(file_key).decode("ascii")})
                if not self._persist_secure_documents(): raise RuntimeError("Unable to save the Secure Documents index.")
                dialog.destroy(); self.refresh_secure_documents_view()
            except Exception as e:
                try: (self._active_documents_dir()/storage_name).unlink(missing_ok=True)
                except Exception: pass
                error.configure(text=str(e))
        ctk.CTkButton(dialog,text="Create File",fg_color=GREEN,command=submit).pack(pady=8)
        entry.focus_set(); dialog.bind("<Return>",lambda e:submit())

    def _rename_document_node(self, subject, node, is_folder, parent_folder=None):
        if not self.secure_documents_unlocked: return
        old=node.get("name","") if is_folder else node.get("filename","")
        dialog=ctk.CTkToplevel(self); dialog.title("Rename"); dialog.geometry("460x190"); dialog.transient(self); dialog.grab_set()
        ctk.CTkLabel(dialog,text="Rename",font=ctk.CTkFont(size=18,weight="bold"),text_color=CYAN).pack(pady=(18,8))
        entry=ctk.CTkEntry(dialog,width=370,height=38); entry.pack(pady=8); entry.insert(0,old); entry.select_range(0,"end")
        error=ctk.CTkLabel(dialog,text="",text_color=RED); error.pack()
        container=self._document_container(subject,parent_folder)
        def submit():
            name=entry.get().strip()
            if not name: error.configure(text="Enter a name."); return
            if len(name)>160 or any(ch in name for ch in '<>:"/\\|?*'): error.configure(text="Invalid name."); return
            if self._document_name_exists(container,name,node.get("id")): error.configure(text="A file or folder with this name already exists."); return
            if is_folder: node["name"]=name
            else: node["filename"]=name
            self._persist_secure_documents(); dialog.destroy(); self.refresh_secure_documents_view()
        ctk.CTkButton(dialog,text="Rename",fg_color=BLUE,command=submit).pack(pady=8); dialog.bind("<Return>",lambda e:submit())

    def _delete_document_node(self, subject, node, is_folder, parent_folder=None):
        if not self.secure_documents_unlocked: return
        name=node.get("name","") if is_folder else node.get("filename","document")
        prompt=f"Delete '{name}'" + (" and everything inside it?" if is_folder else " permanently?")
        if not messagebox.askyesno("Secure Documents",prompt): return
        try:
            if is_folder:
                def remove_files(folder):
                    for item in folder.get("documents",[]):
                        (self._active_documents_dir()/item.get("storage","")).unlink(missing_ok=True)
                    for child in folder.get("folders",[]): remove_files(child)
                remove_files(node)
                self._document_container(subject,parent_folder)["folders"]=[x for x in self._document_container(subject,parent_folder).get("folders",[]) if x.get("id")!=node.get("id")]
            else:
                (self._active_documents_dir()/node.get("storage","")).unlink(missing_ok=True)
                self._document_container(subject,parent_folder)["documents"]=[x for x in self._document_container(subject,parent_folder).get("documents",[]) if x.get("id")!=node.get("id")]
            self._persist_secure_documents(); self.refresh_secure_documents_view()
        except Exception as e: messagebox.showerror("Secure Documents",str(e))

    def _delete_document_subject(self, subject):
        """Delete a top-level Secure Documents subject and everything inside it."""
        if not self.secure_documents_unlocked or not subject:
            return
        name = subject.get("name", "Unnamed Subject")
        if not messagebox.askyesno(
            "Delete Subject",
            f"Delete the subject '{name}' and ALL documents/folders inside it?\n\nThis action cannot be undone.",
            parent=self,
        ):
            return
        try:
            removed = 0

            def remove_files(container):
                nonlocal removed
                for item in container.get("documents", []):
                    storage = item.get("storage", "")
                    if storage:
                        (self._active_documents_dir() / storage).unlink(missing_ok=True)
                    removed += 1
                for folder in container.get("folders", []):
                    remove_files(folder)

            remove_files(subject)
            subjects = self.secure_documents_data.setdefault("subjects", [])
            self.secure_documents_data["subjects"] = [
                item for item in subjects if item.get("id") != subject.get("id")
            ]
            if not self._persist_secure_documents():
                raise RuntimeError("Unable to save the Secure Documents index.")
            self.refresh_secure_documents_view()
            self.log_event(f"Secure Documents subject deleted: {name} ({removed} documents)", "INFO")
            messagebox.showinfo(
                "Secure Documents",
                f"Subject '{name}' deleted successfully.\n\nDocuments removed: {removed}",
                parent=self,
            )
        except Exception as e:
            messagebox.showerror("Secure Documents", f"Unable to delete subject.\n\n{e}", parent=self)

    def _secure_documents_context_menu(self, event, subject, folder=None, parent_container=None):
        if not self.secure_documents_unlocked: return "break"
        menu=tk.Menu(self, tearoff=0)
        menu.add_command(label="New File",command=lambda:self._create_document_file(subject,folder))
        menu.add_command(label="New Folder",command=lambda:self._create_document_folder(subject,folder))
        if folder is not None:
            menu.add_separator(); menu.add_command(label="Rename",command=lambda:self._rename_document_node(subject,folder,True,parent_container))
            menu.add_command(label="Copy",command=lambda:self._secure_documents_copy_node(subject,folder,True,parent_container,False))
            menu.add_command(label="Cut",command=lambda:self._secure_documents_copy_node(subject,folder,True,parent_container,True))
            menu.add_command(label="Delete",command=lambda:self._delete_document_node(subject,folder,True,parent_container))
        elif subject is not None:
            menu.add_separator(); menu.add_command(label="Delete Subject",command=lambda:self._delete_document_subject(subject))
        menu.add_separator(); menu.add_command(label="Paste",command=lambda:self._secure_documents_paste(subject,folder))
        menu.add_command(label="Import Documents",command=lambda:self._import_documents_to_container(subject,folder))
        menu.add_command(label="Refresh",command=self.refresh_secure_documents_view)
        try: menu.tk_popup(event.x_root,event.y_root)
        finally: menu.grab_release()
        return "break"

    def _import_documents_to_container(self, subject, folder=None):
        paths=filedialog.askopenfilenames(initialdir=str(self._default_docs_dir()),title="Select Documents",filetypes=[("All Files","*.*")])
        if paths: self._secure_document_import_files(paths,folder)

    def create_document_subject(self):
        # Creating a subject never asks for the master password.
        dialog = ctk.CTkToplevel(self)
        dialog.title("New Subject")
        dialog.geometry("430x190")
        dialog.transient(self); dialog.grab_set()
        ctk.CTkLabel(dialog, text="Create Document Subject", font=ctk.CTkFont(size=18, weight="bold"), text_color=CYAN).pack(pady=(18, 8))
        entry = ctk.CTkEntry(dialog, width=340, height=38, placeholder_text="e.g. Personal, Service, Certificates")
        entry.pack(pady=8)
        error = ctk.CTkLabel(dialog, text="", text_color=RED); error.pack()
        def submit():
            name = re.sub(r"\s+", " ", entry.get().strip())
            if not name: error.configure(text="Enter a subject name."); return
            if len(name) > 80: error.configure(text="Subject name is too long."); return
            existing = self._secure_documents_subject_names() + list(self._secure_documents_pending_subjects)
            if name in existing: error.configure(text="This subject already exists."); return
            if self.secure_documents_unlocked:
                self.secure_documents_data.setdefault("subjects", []).append({"id": secrets.token_hex(8), "name": name, "documents": []})
                if not self._persist_secure_documents(): return
            else:
                self._secure_documents_pending_subjects.append(name)
                self._save_pending_document_subjects()
            dialog.destroy(); self.refresh_secure_documents_view()
            self.log_event(f"Secure Documents subject created: {name}", "INFO")
        ctk.CTkButton(dialog, text="Create", fg_color=BLUE, command=submit).pack(pady=8)
        dialog.bind("<Return>", lambda e: submit())

    def _secure_document_import_files(self, paths, target_folder=None):
        if not self.secure_documents_unlocked:
            messagebox.showwarning("Secure Documents", "Unlock Secure Documents first, then import the documents.")
            return
        subject_name = self.secure_documents_subject_menu.get() if hasattr(self, "secure_documents_subject_menu") else ""
        subject = self._find_document_subject(subject_name)
        if not subject:
            messagebox.showwarning("Secure Documents", "Create or select a subject first.")
            return
        container = self._document_container(subject, target_folder)
        files = []
        seen = set()
        for value in paths or []:
            try:
                source = Path(value)
                if source.is_file() and str(source.resolve()) not in seen:
                    files.append(source); seen.add(str(source.resolve()))
            except Exception:
                pass
        if not files:
            return
        added = []
        created_storage = []
        try:
            for source in files:
                raw = source.read_bytes()
                file_key = Fernet.generate_key()
                encrypted = Fernet(file_key).encrypt(raw)
                doc_id = secrets.token_hex(12)
                storage_name = doc_id + ".csd"
                storage_path = self._active_documents_dir() / storage_name
                storage_path.write_bytes(encrypted)
                created_storage.append(storage_path)
                item = {"id": doc_id, "filename": source.name, "size": len(raw), "created": datetime.now().strftime("%Y-%m-%d %H:%M:%S"), "storage": storage_name, "file_key": base64.urlsafe_b64encode(file_key).decode("ascii")}
                container.setdefault("documents", []).append(item)
                added.append(item)
            if not self._persist_secure_documents():
                raise RuntimeError("Unable to save the Secure Documents index.")
            self.refresh_secure_documents_view()
            self.log_event(f"{len(added)} document(s) secured", "INFO")
            messagebox.showinfo("Secure Documents", f"{len(added)} document(s) secured successfully.")
        except Exception as e:
            for fp in created_storage:
                try: fp.unlink(missing_ok=True)
                except Exception: pass
            container["documents"] = [x for x in container.get("documents", []) if x not in added]
            messagebox.showerror("Secure Documents", f"Unable to secure the selected documents.\n\n{e}")

    def import_secure_document(self):
        if not self.secure_documents_unlocked:
            messagebox.showwarning("Secure Documents", "Unlock Secure Documents first, then import the documents.")
            return
        subject_name = self.secure_documents_subject_menu.get() if hasattr(self, "secure_documents_subject_menu") else ""
        if not self._find_document_subject(subject_name):
            messagebox.showwarning("Secure Documents", "Create or select a subject first.")
            return
        paths = filedialog.askopenfilenames(initialdir=str(self._default_docs_dir()),title="Select Documents", filetypes=[("All Files", "*.*")])
        if paths:
            self._secure_document_import_files(paths)

    def _secure_document_encrypt_file(self, source):
        raw = Path(source).read_bytes()
        file_key = Fernet.generate_key()
        encrypted = Fernet(file_key).encrypt(raw)
        doc_id = secrets.token_hex(12)
        storage_name = doc_id + ".csd"
        storage_path = self._active_documents_dir() / storage_name
        storage_path.write_bytes(encrypted)
        return {
            "id": doc_id,
            "filename": Path(source).name,
            "size": len(raw),
            "created": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "storage": storage_name,
            "file_key": base64.urlsafe_b64encode(file_key).decode("ascii"),
        }, storage_path

    def _secure_document_import_folder_tree(self, root, parent_container):
        """Import a complete folder tree while preserving the original hierarchy."""
        root = Path(root)
        created_storage = []

        def build_folder(source_dir):
            folder_node = {
                "id": secrets.token_hex(8),
                "name": source_dir.name,
                "documents": [],
                "folders": [],
            }
            # Files directly inside this folder.
            for child in sorted(source_dir.iterdir(), key=lambda x: (not x.is_dir(), x.name.lower())):
                if child.is_symlink():
                    continue
                if child.is_file():
                    item, storage_path = self._secure_document_encrypt_file(child)
                    created_storage.append(storage_path)
                    folder_node["documents"].append(item)
                elif child.is_dir():
                    folder_node["folders"].append(build_folder(child))
            return folder_node

        node = build_folder(root)
        parent_container.setdefault("folders", []).append(node)
        return node, created_storage

    def import_secure_document_folder(self):
        if not self.secure_documents_unlocked:
            messagebox.showwarning("Secure Documents", "Unlock Secure Documents first, then import the folder.")
            return
        subject_name = self.secure_documents_subject_menu.get() if hasattr(self, "secure_documents_subject_menu") else ""
        subject = self._find_document_subject(subject_name)
        if not subject:
            messagebox.showwarning("Secure Documents", "Create or select a subject first.")
            return
        folder = filedialog.askdirectory(initialdir=str(self._default_docs_dir()),title="Select Folder to Import")
        if not folder:
            return
        root = Path(folder)
        try:
            if not root.exists() or not root.is_dir():
                raise ValueError("The selected path is not a valid folder.")
            if not any(x.is_file() for x in root.rglob("*")):
                messagebox.showinfo("Secure Documents", "The selected folder contains no files.")
                return

            # Preserve the selected folder itself as the top-level node, then recursively
            # preserve every subfolder and file beneath it.
            existing_names = {x.get("name", "") for x in subject.get("folders", [])}
            if root.name in existing_names:
                messagebox.showwarning("Secure Documents", f"A folder named '{root.name}' already exists in this subject.")
                return

            node, created_storage = self._secure_document_import_folder_tree(root, subject)
            if not self._persist_secure_documents():
                raise RuntimeError("Unable to save the Secure Documents index.")

            self.refresh_secure_documents_view()
            total = sum(1 for x in root.rglob("*") if x.is_file())
            self.log_event(f"Folder imported with structure: {root.name} ({total} files)", "INFO")
            messagebox.showinfo("Secure Documents", f"Folder imported successfully.\n\nFolder: {root.name}\nFiles: {total}\nSubfolders: {sum(1 for x in root.rglob('*') if x.is_dir())}")
        except Exception as e:
            try:
                # Remove any partially-created encrypted blobs.
                for fp in locals().get("created_storage", []):
                    fp.unlink(missing_ok=True)
            except Exception:
                pass
            try:
                if 'node' in locals() and node in subject.get("folders", []):
                    subject["folders"].remove(node)
            except Exception:
                pass
            messagebox.showerror("Secure Documents", f"Unable to import the selected folder.\n\n{e}")

    def backup_secure_documents(self):
        if not self.secure_documents_unlocked:
            messagebox.showwarning("Secure Documents", "Unlock Secure Documents before creating a backup."); return
        try:
            target = filedialog.asksaveasfilename(initialdir=str(self._default_docs_dir()),title="Backup Secure Documents", defaultextension=".csdb", filetypes=[("Secure Documents Backup", "*.csdb")])
            if not target: return
            files = [self._active_documents_index()]
            def collect_document_blobs(container):
                for item in container.get("documents", []):
                    fp = self._active_documents_dir() / item.get("storage", "")
                    if fp.exists(): files.append(fp)
                for folder in container.get("folders", []):
                    collect_document_blobs(folder)
            for subject in self.secure_documents_data.get("subjects", []):
                collect_document_blobs(subject)
            # Build an in-memory package first. Only encrypted document blobs and the encrypted index are included.
            package = io.BytesIO()
            with zipfile.ZipFile(package, "w", compression=zipfile.ZIP_DEFLATED) as zf:
                for fp in files: zf.write(fp, arcname=fp.name)
            salt = secrets.token_bytes(16)
            backup_key = self.derive_vault_key(self.secure_documents_key, salt)
            token = Fernet(backup_key).encrypt(package.getvalue())
            backup_payload = {
                "format": "SAMUDRA-KAVACH-SECURE-DOCUMENTS-BACKUP",
                "version": 1,
                "kdf": "PBKDF2-HMAC-SHA256",
                "iterations": 390000,
                "salt": base64.b64encode(salt).decode("ascii"),
                "data": token.decode("ascii"),
            }
            Path(target).write_text(json.dumps(backup_payload, indent=2), encoding="utf-8")
            self.log_event("Secure Documents backup exported", "INFO")
            messagebox.showinfo("Secure Documents", "Encrypted Secure Documents backup created successfully.")
        except Exception as e:
            messagebox.showerror("Secure Documents", str(e))

    def restore_secure_documents(self):
        if not self.secure_documents_unlocked:
            messagebox.showwarning("Secure Documents", "Unlock Secure Documents before restoring a backup."); return
        source = filedialog.askopenfilename(initialdir=str(self._default_docs_dir()),title="Restore Secure Documents Backup", filetypes=[("Secure Documents Backup", "*.csdb"), ("All Files", "*.*")])
        if not source: return
        temp_dir = self._active_documents_dir() / ".restore_tmp"
        try:
            backup_payload = json.loads(Path(source).read_text(encoding="utf-8"))
            if backup_payload.get("format") != "SAMUDRA-KAVACH-SECURE-DOCUMENTS-BACKUP" or backup_payload.get("version") != 1:
                raise ValueError("Invalid Secure Documents backup file.")
            salt = base64.b64decode(backup_payload["salt"], validate=True)
            backup_key = self.derive_vault_key(self.secure_documents_key, salt)
            package_bytes = Fernet(backup_key).decrypt(backup_payload["data"].encode("ascii"))
            temp_dir.mkdir(parents=True, exist_ok=True)
            with zipfile.ZipFile(io.BytesIO(package_bytes), "r") as zf:
                names = zf.namelist()
                if "documents.csgd" not in names:
                    raise ValueError("Backup does not contain a Secure Documents index.")
                for name in names:
                    if "/" in name or "\\" in name or Path(name).name != name:
                        continue
                    (temp_dir / name).write_bytes(zf.read(name))
            payload = json.loads((temp_dir / "documents.csgd").read_text(encoding="utf-8"))
            data = self._secure_documents_decrypt_payload(payload, self.secure_documents_key)
            if not isinstance(data, dict) or not isinstance(data.get("subjects", []), list):
                raise ValueError("Backup data is invalid or the current master password does not match the backup.")
            for subject in data.get("subjects", []):
                for item in subject.get("documents", []):
                    fp = temp_dir / item.get("storage", "")
                    if not fp.exists(): raise ValueError(f"Backup is missing: {item.get('filename','document')}")
                    encoded_key = item.get("file_key") or item.get("key_salt", "")
                    key = base64.urlsafe_b64decode(encoded_key)
                    Fernet(key).decrypt(fp.read_bytes())
            target_dir = self._active_documents_dir()
            for old in target_dir.glob("*.csd"): old.unlink(missing_ok=True)
            shutil.copy2(temp_dir / "documents.csgd", target_dir / "documents.csgd")
            for fp in temp_dir.glob("*.csd"): shutil.copy2(fp, target_dir / fp.name)
            self.secure_documents_data = data
            self.refresh_secure_documents_view()
            self.log_event("Secure Documents backup restored", "INFO")
            messagebox.showinfo("Secure Documents", "Backup restored successfully. Original filenames, subjects and file types are preserved.")
        except Exception as e:
            messagebox.showerror("Secure Documents", f"Backup restore failed.\n\n{e}")
        finally:
            try: shutil.rmtree(temp_dir, ignore_errors=True)
            except Exception: pass

    def _decrypt_secure_document(self, item):
        storage = self._active_documents_dir() / item.get("storage", "")
        if not storage.exists():
            raise FileNotFoundError("Encrypted document file was not found.")
        encoded_key = item.get("file_key") or item.get("key_salt", "")
        try:
            key = base64.urlsafe_b64decode(encoded_key)
        except Exception:
            key = base64.b64decode(encoded_key, validate=True)
        return Fernet(key).decrypt(storage.read_bytes())

    def open_secure_document(self, item):
        if not self.secure_documents_unlocked:
            return
        try:
            raw = self._decrypt_secure_document(item)
            suffix = Path(item.get("filename", "")).suffix or ".bin"
            temp_dir = self._active_documents_dir() / ".view"
            temp_dir.mkdir(parents=True, exist_ok=True)
            temp_path = temp_dir / (secrets.token_hex(10) + suffix)
            temp_path.write_bytes(raw)
            self._secure_document_temp_files.append(temp_path)
            if os.name == "nt":
                os.startfile(str(temp_path))
            elif sys.platform == "darwin":
                subprocess.Popen(["open", str(temp_path)])
            else:
                subprocess.Popen(["xdg-open", str(temp_path)])
            self.after(120000, lambda p=temp_path: self._remove_secure_document_temp(p))
            self.log_event(f"Secure document opened: {item.get('filename','')}", "INFO")
        except Exception as e:
            messagebox.showerror("Secure Documents", str(e))

    def _remove_secure_document_temp(self, path):
        try:
            path.unlink(missing_ok=True)
        except Exception:
            pass
        try:
            self._secure_document_temp_files.remove(path)
        except ValueError:
            pass

    def delete_secure_document(self, subject, item):
        if not messagebox.askyesno("Secure Documents", f"Permanently delete '{item.get('filename','document')}' from Secure Documents?"):
            return
        try:
            storage = self._active_documents_dir() / item.get("storage", "")
            storage.unlink(missing_ok=True)
            subject["documents"] = [x for x in subject.get("documents", []) if x.get("id") != item.get("id")]
            self._persist_secure_documents()
            self.refresh_secure_documents_view()
            self.log_event(f"Secure document deleted: {item.get('filename','')}", "INFO")
        except Exception as e:
            messagebox.showerror("Secure Documents", str(e))

    def refresh_secure_documents_view(self):
        if not hasattr(self, "secure_documents_list"):
            return
        for child in self.secure_documents_list.winfo_children():
            child.destroy()
        if not self.secure_documents_unlocked:
            self.secure_documents_saved_lbl.configure(text="🔒 Secure Documents Locked")
            self.secure_documents_status_label.configure(text="● LOCKED", text_color=YELLOW)
            ctk.CTkLabel(self.secure_documents_list, text="🔒  SECURE DOCUMENTS LOCKED", font=ctk.CTkFont(size=18, weight="bold"), text_color=YELLOW).pack(pady=65)
            try: self.secure_documents_subject_menu.configure(values=["No Subject"]); self.secure_documents_subject_menu.set("No Subject")
            except Exception: pass
            return
        self.secure_documents_status_label.configure(text="● UNLOCKED", text_color=GREEN)
        self._prepare_document_tree()
        subjects = self.secure_documents_data.get("subjects", [])
        names = self._secure_documents_subject_names()
        if names:
            current = self.secure_documents_subject_menu.get()
            self.secure_documents_subject_menu.configure(values=names)
            self.secure_documents_subject_menu.set(current if current in names else names[0])
        else:
            self.secure_documents_subject_menu.configure(values=["No Subject"])
            self.secure_documents_subject_menu.set("No Subject")
        def count_docs(container):
            total=len(container.get("documents", []))
            for folder in container.get("folders", []): total += count_docs(folder)
            return total
        total=sum(count_docs(x) for x in subjects)
        self.secure_documents_saved_lbl.configure(text=f"Secure Documents  •  {len(subjects)} subjects  •  {total} documents")
        if not subjects:
            empty=ctk.CTkLabel(self.secure_documents_list,text="No subjects yet. Create a subject to start securing documents.",text_color=self.MUTED)
            empty.pack(pady=65); empty.bind("<Button-3>",lambda e:self._secure_documents_context_menu(e,None) if False else None)
            return

        def bind_context(widget, subject, folder=None):
            widget.bind("<Button-3>",lambda e,s=subject,f=folder:self._secure_documents_context_menu(e,s,f))
            widget.bind("<Button-1>",lambda e,s=subject,f=folder:self._secure_documents_context_menu(e,s,f))

        def render_container(parent_widget, subject, container, depth=0):
            # Files at this level
            for item in container.get("documents", []):
                row=ctk.CTkFrame(parent_widget,fg_color=self.CARD,corner_radius=8)
                row.pack(fill="x",padx=12+depth*22,pady=4)
                left=ctk.CTkFrame(row,fg_color="transparent"); left.pack(side="left",fill="x",expand=True,padx=10,pady=7)
                ctk.CTkLabel(left,text="📄 "+item.get("filename","Document"),font=ctk.CTkFont(size=11,weight="bold"),text_color=self.TEXT).pack(anchor="w")
                size=item.get("size",0); size_text=f"{size/1024:.1f} KB" if size<1024*1024 else f"{size/(1024*1024):.1f} MB"
                ctk.CTkLabel(left,text=f"{size_text}  •  {item.get('created','')}",font=ctk.CTkFont(size=9),text_color=self.MUTED).pack(anchor="w")
                ctk.CTkButton(row,text="Open",width=75,height=28,fg_color=BLUE,command=lambda x=item:self.open_secure_document(x)).pack(side="right",padx=4,pady=7)
                ctk.CTkButton(row,text="Delete",width=75,height=28,fg_color=RED,hover_color="#A92F2F",command=lambda s=subject,c=container,x=item:self.delete_secure_document(s,x) if c is s else self._delete_document_node(s,x,False,c)).pack(side="right",padx=4,pady=7)
                bind_context(row,subject,container if container is not subject else None)
                row.bind("<Button-3>",lambda e,s=subject,c=container,x=item:self._secure_documents_file_context_menu(e,s,c,x))
                row.bind("<Button-1>",lambda e,s=subject,c=container,x=item:self._secure_documents_file_context_menu(e,s,c,x))
            for folder in container.get("folders", []):
                fcard=ctk.CTkFrame(parent_widget,fg_color=self.CARD_DARK,corner_radius=10,border_width=1,border_color=self.BORDER)
                fcard.pack(fill="x",padx=8+depth*18,pady=5)
                header=ctk.CTkFrame(fcard,fg_color="transparent"); header.pack(fill="x",padx=12,pady=(8,4))
                ctk.CTkLabel(header,text="📁 "+folder.get("name","Folder"),font=ctk.CTkFont(size=13,weight="bold"),text_color=CYAN).pack(side="left")
                ctk.CTkLabel(header,text=f"{count_docs(folder)} document(s)",text_color=self.MUTED).pack(side="right")
                fcard.bind("<Button-3>",lambda e,s=subject,f=folder,p=container:self._secure_documents_context_menu(e,s,f,p))
                render_container(fcard,subject,folder,depth+1)
                if not folder.get("documents") and not folder.get("folders"):
                    ctk.CTkLabel(fcard,text="Empty folder — right-click for options.",text_color=self.MUTED).pack(anchor="w",padx=20,pady=(0,10))

        for subject in subjects:
            subject.setdefault("folders",[])
            subject.setdefault("documents",[])
            card=ctk.CTkFrame(self.secure_documents_list,fg_color=self.CARD_DARK,corner_radius=10,border_width=1,border_color=self.BORDER)
            card.pack(fill="x",padx=8,pady=6)
            header=ctk.CTkFrame(card,fg_color="transparent"); header.pack(fill="x",padx=12,pady=(9,5))
            ctk.CTkLabel(header,text="📁 "+subject.get("name","Unnamed Subject"),font=ctk.CTkFont(size=14,weight="bold"),text_color=CYAN).pack(side="left")
            ctk.CTkButton(header,text="Delete Subject",width=118,height=27,fg_color=RED,hover_color="#A92F2F",command=lambda s=subject:self._delete_document_subject(s)).pack(side="right",padx=(8,0))
            ctk.CTkLabel(header,text=f"{count_docs(subject)} document(s)",text_color=self.MUTED).pack(side="right")
            bind_context(card,subject,None)
            render_container(card,subject,subject,0)
            if not subject.get("documents") and not subject.get("folders"):
                ctk.CTkLabel(card,text="Empty subject — right-click for options.",text_color=self.MUTED).pack(anchor="w",padx=18,pady=(0,10))

    def _secure_documents_file_context_menu(self,event,subject,container,item):
        if not self.secure_documents_unlocked: return "break"
        menu=tk.Menu(self,tearoff=0)
        target_folder=container if container is not subject else None
        menu.add_command(label="Open / View",command=lambda:self.open_secure_document(item))
        menu.add_command(label="Rename",command=lambda:self._rename_document_node(subject,item,False,target_folder))
        menu.add_command(label="Copy",command=lambda:self._secure_documents_copy_node(subject,item,False,target_folder,False))
        menu.add_command(label="Cut",command=lambda:self._secure_documents_copy_node(subject,item,False,target_folder,True))
        menu.add_command(label="Copy / Export",command=lambda:self._export_secure_document_item(item))
        menu.add_command(label="Delete",command=lambda:self._delete_document_node(subject,item,False,target_folder))
        menu.add_separator(); menu.add_command(label="Paste",command=lambda:self._secure_documents_paste(subject,target_folder))
        menu.add_command(label="New File",command=lambda:self._create_document_file(subject,target_folder))
        menu.add_command(label="New Folder",command=lambda:self._create_document_folder(subject,container if container is not subject else None))
        menu.add_command(label="Import Documents",command=lambda:self._import_documents_to_container(subject,container if container is not subject else None))
        try: menu.tk_popup(event.x_root,event.y_root)
        finally: menu.grab_release()
        return "break"

    def _secure_documents_copy_node(self, subject, node, is_folder, parent_container=None, cut=False):
        if not self.secure_documents_unlocked: return
        self._secure_documents_clipboard = {"subject": subject, "node": node, "is_folder": is_folder, "parent": parent_container, "cut": cut}
        try: self.log_event(("Cut" if cut else "Copied") + f" Secure Documents item: {node.get('name', node.get('filename','document'))}", "INFO")
        except Exception: pass

    def _clone_secure_document_node(self, node, is_folder):
        if is_folder:
            clone={"id":secrets.token_hex(8),"name":node.get("name","Folder"),"folders":[],"documents":[]}
            for item in node.get("documents",[]):
                new_item=dict(item); new_id=secrets.token_hex(12); old_storage=item.get("storage","")
                new_storage=new_id+".csd"
                if old_storage:
                    src=self._active_documents_dir()/old_storage; dst=self._active_documents_dir()/new_storage
                    if src.exists(): shutil.copy2(src,dst)
                new_item["id"]=new_id; new_item["storage"]=new_storage; clone["documents"].append(new_item)
            for folder in node.get("folders",[]): clone["folders"].append(self._clone_secure_document_node(folder,True))
            return clone
        new_item=dict(node); new_id=secrets.token_hex(12); old_storage=node.get("storage",""); new_storage=new_id+".csd"
        if old_storage:
            src=self._active_documents_dir()/old_storage; dst=self._active_documents_dir()/new_storage
            if src.exists(): shutil.copy2(src,dst)
        new_item["id"]=new_id; new_item["storage"]=new_storage
        return new_item

    def _remove_node_from_container(self, container, node, is_folder):
        key="folders" if is_folder else "documents"
        items=container.get(key,[]); target_id=node.get("id")
        container[key]=[x for x in items if x.get("id")!=target_id]

    def _secure_documents_paste(self, subject, target_folder=None):
        if not self.secure_documents_unlocked: return
        clip=getattr(self,"_secure_documents_clipboard",None)
        if not clip: return
        source_node=clip.get("node"); is_folder=clip.get("is_folder"); source_parent=clip.get("parent") or subject
        target=self._document_container(subject,target_folder)
        if not source_node: return
        if clip.get("cut"):
            if is_folder and (target_folder is source_node or self._document_node_contains(source_node,target_folder)):
                messagebox.showwarning("Secure Documents","A folder cannot be moved inside itself or one of its subfolders."); return
            self._remove_node_from_container(source_parent,source_node,is_folder)
            target.setdefault("folders" if is_folder else "documents",[]).append(source_node)
        else:
            clone=self._clone_secure_document_node(source_node,is_folder)
            target.setdefault("folders" if is_folder else "documents",[]).append(clone)
        if not self._persist_secure_documents(): return
        self._secure_documents_clipboard=None
        self.refresh_secure_documents_view()

    def _document_node_contains(self, root, candidate):
        if root is candidate: return True
        for folder in root.get("folders",[]):
            if self._document_node_contains(folder,candidate): return True
        return False

    def _export_secure_document_item(self, item):
        if not self.secure_documents_unlocked: return
        try:
            temp=self._decrypt_secure_document(item)
            if not temp: return
            target=filedialog.asksaveasfilename(initialdir=str(self._default_docs_dir()),title="Export Document",initialfile=item.get("filename","document"))
            if not target: return
            shutil.copy2(temp,target)
            self._remove_secure_document_temp(temp)
            messagebox.showinfo("Secure Documents",f"Document exported successfully.\n\n{target}")
        except Exception as e:
            try:
                if temp: self._remove_secure_document_temp(temp)
            except Exception: pass
            messagebox.showerror("Secure Documents",str(e))

    # ========================================================
    # EXPIRY / ROTATION
    # ========================================================
    def _rotation_rows(self, label, history, fallback_created=None):
        rows=[]
        history = history or []
        if not history and fallback_created:
            history=[self._rotation_entry(fallback_created, "Existing Record")]
        today=datetime.now()
        for item in reversed(history[-20:]):
            try: created=datetime.fromisoformat(item.get("created", "")).replace(tzinfo=None)
            except Exception: continue
            expiry=created+timedelta(days=90)
            remaining=(expiry.date()-today.date()).days
            if remaining < 0: status=f"EXPIRED • {abs(remaining)} days overdue"
            elif remaining <= 7: status=f"NEED TO CHANGE • {remaining} days remaining"
            else: status=f"VALID • {remaining} days remaining"
            rows.append((created, expiry, status, item.get("changed_by", "System")))
        return rows

    def _get_rotation_sources(self):
        individual=[]
        rec=self.auth_store.get("individuals",{}).get(self.current_user_id) if self.current_role=="Individual" else self.auth_store.get("admin")
        if rec:
            individual=rec.get("password_history", [])
            if not individual: individual=[self._rotation_entry(rec.get("created"), "Account Created")]
        vault=[]
        vf=self._active_vault_file()
        if vf.exists():
            try:
                vp=json.loads(vf.read_text(encoding="utf-8")); vault=vp.get("password_history",[])
                if not vault: vault=[self._rotation_entry(datetime.fromtimestamp(vf.stat().st_mtime), "Existing Vault")]
            except Exception: pass
        docs=[]
        df=self._active_documents_index()
        if df.exists():
            try:
                dp=json.loads(df.read_text(encoding="utf-8")); docs=dp.get("password_history",[])
                if not docs: docs=[self._rotation_entry(datetime.fromtimestamp(df.stat().st_mtime), "Existing Secure Documents")]
            except Exception: pass
        return individual,vault,docs

    def build_expiry_page(self):
        p = self.page_frames["expiry"]
        scroll = ctk.CTkScrollableFrame(p, fg_color="transparent")
        scroll.pack(fill="both", expand=True, padx=18, pady=15)
        self.expiry_heading = ctk.CTkLabel(scroll, text="⏳ Password Expiry & Rotation Policy", font=ctk.CTkFont(size=22, weight="bold"), text_color=self.TEXT)
        self.expiry_heading.pack(anchor="w", pady=(0, 12))
        ctk.CTkLabel(scroll, text="90-day rotation policy • Password values are never displayed.", text_color=self.MUTED).pack(anchor="w", pady=(0,10))
        self.expiry_cards_frame=ctk.CTkFrame(scroll, fg_color="transparent"); self.expiry_cards_frame.pack(fill="both", expand=True)
        self.expiry_result_lbl=ctk.CTkLabel(scroll,text="",font=ctk.CTkFont(size=13),text_color=self.TEXT,justify="left",anchor="w")
        self.expiry_result_lbl.pack(fill="x",pady=10)
        self.refresh_expiry_rotation()

    def refresh_expiry_rotation(self):
        if not hasattr(self,"expiry_cards_frame"): return
        for child in self.expiry_cards_frame.winfo_children(): child.destroy()
        individual,vault,docs=self._get_rotation_sources()
        sections=[("Individual Login Password",individual),("Secure Vault Master Password",vault),("Secure Documents Master Password",docs)]
        for title,history in sections:
            card=ctk.CTkFrame(self.expiry_cards_frame,fg_color=self.CARD,corner_radius=12,border_width=1,border_color=self.BORDER)
            card.pack(fill="x",pady=6)
            ctk.CTkLabel(card,text=title,font=ctk.CTkFont(size=15,weight="bold"),text_color=CYAN).pack(anchor="w",padx=15,pady=(10,5))
            rows=self._rotation_rows(title,history)
            if not rows:
                ctk.CTkLabel(card,text="No password history recorded yet.",text_color=self.MUTED).pack(anchor="w",padx=15,pady=(2,12)); continue
            for created,expiry,status,changed_by in rows:
                color=RED if status.startswith("EXPIRED") else YELLOW if status.startswith("NEED TO CHANGE") else GREEN
                text=(f"Created: {created.strftime('%Y-%m-%d %H:%M:%S')}    |    "
                      f"Expire: {expiry.strftime('%Y-%m-%d %H:%M:%S')}    |    "
                      f"{status}    |    Changed by: {changed_by}")
                ctk.CTkLabel(card,text=text,text_color=color,justify="left",anchor="w",wraplength=980).pack(fill="x",padx=15,pady=3)
            ctk.CTkLabel(card,text="History shown newest first. Rotation period: 90 days.",text_color=self.MUTED).pack(anchor="w",padx=15,pady=(3,10))

    def check_expiry(self):
        self.refresh_expiry_rotation()
        if hasattr(self,"expiry_result_lbl"):
            self.expiry_result_lbl.configure(text="90-day password rotation status refreshed.", text_color=self.TEXT)

    # ========================================================
    # TOTP / QR — SMART, USER-FRIENDLY FLOW
    # ========================================================
    def build_twofa_page(self):
        p = self.page_frames["twofa"]
        scroll = ctk.CTkScrollableFrame(p, fg_color="transparent")
        scroll.pack(fill="both", expand=True, padx=18, pady=15)

        self.twofa_heading = ctk.CTkLabel(scroll, text="", font=ctk.CTkFont(size=22, weight="bold"), text_color=self.TEXT)
        self.twofa_heading.pack(anchor="w", pady=(0, 5))

        self.twofa_hint = ctk.CTkLabel(
            scroll, text="", justify="left", anchor="w", wraplength=900,
            font=ctk.CTkFont(size=11), text_color=self.MUTED
        )
        self.twofa_hint.pack(fill="x", pady=(0, 10))

        card = ctk.CTkFrame(scroll, fg_color=self.CARD, corner_radius=14, border_width=1, border_color=self.BORDER)
        card.pack(fill="x", pady=5)

        self.twofa_issuer_lbl = ctk.CTkLabel(card, text="", text_color=self.TEXT)
        self.twofa_issuer_lbl.pack(anchor="w", padx=18, pady=(15, 4))
        self.twofa_issuer_entry = ctk.CTkEntry(card, height=36, placeholder_text="MyService", fg_color=self.ENTRY, text_color=self.TEXT)
        self.twofa_issuer_entry.pack(fill="x", padx=18, pady=(0, 8))

        self.twofa_account_lbl = ctk.CTkLabel(card, text="", text_color=self.TEXT)
        self.twofa_account_lbl.pack(anchor="w", padx=18, pady=(4, 4))
        self.twofa_account_entry = ctk.CTkEntry(card, height=36, placeholder_text="user@example.com", fg_color=self.ENTRY, text_color=self.TEXT)
        self.twofa_account_entry.pack(fill="x", padx=18, pady=(0, 8))

        secret_row = ctk.CTkFrame(card, fg_color="transparent")
        secret_row.pack(fill="x", padx=18, pady=(4, 0))
        self.twofa_secret_lbl = ctk.CTkLabel(secret_row, text="", text_color=self.TEXT)
        self.twofa_secret_lbl.pack(side="left")
        self.twofa_secret_state = ctk.CTkLabel(secret_row, text="", font=ctk.CTkFont(size=10, weight="bold"))
        self.twofa_secret_state.pack(side="right")

        self.twofa_secret_entry = ctk.CTkEntry(
            card, height=40, placeholder_text="JBSWY3DPEHPK3PXP",
            fg_color=self.ENTRY, text_color=self.TEXT, border_color=self.BORDER
        )
        self.twofa_secret_entry.pack(fill="x", padx=18, pady=(4, 5))
        self.twofa_secret_entry.bind("<KeyRelease>", self.on_totp_secret_changed)

        self.twofa_secret_help = ctk.CTkLabel(
            card, text="", justify="left", anchor="w", wraplength=850,
            font=ctk.CTkFont(size=10), text_color=self.MUTED
        )
        self.twofa_secret_help.pack(fill="x", padx=18, pady=(0, 10))

        row1 = ctk.CTkFrame(card, fg_color="transparent")
        row1.pack(fill="x", padx=18, pady=(0, 7))
        self.qr_gen_btn = ctk.CTkButton(row1, text="", fg_color=BLUE, command=self.generate_qr)
        self.qr_gen_btn.pack(side="left", fill="x", expand=True, padx=(0, 4))
        self.qr_new_secret_btn = ctk.CTkButton(row1, text="", fg_color=GREEN, command=self.generate_new_totp_secret)
        self.qr_new_secret_btn.pack(side="left", fill="x", expand=True, padx=4)
        self.qr_import_btn = ctk.CTkButton(row1, text="", fg_color=PURPLE, command=self.import_otpauth_uri)
        self.qr_import_btn.pack(side="left", fill="x", expand=True, padx=(4, 0))

        row2 = ctk.CTkFrame(card, fg_color="transparent")
        row2.pack(fill="x", padx=18, pady=(0, 15))
        self.qr_copy_btn = ctk.CTkButton(row2, text="", fg_color=self.NAVY, command=self.copy_otp_uri)
        self.qr_copy_btn.pack(side="left", fill="x", expand=True, padx=(0, 4))
        self.qr_clear_btn = ctk.CTkButton(row2, text="", fg_color=self.CARD_DARK, hover_color=RED, command=self.clear_twofa)
        self.qr_clear_btn.pack(side="left", fill="x", expand=True, padx=(4, 0))

        self.qr_status_lbl = ctk.CTkLabel(scroll, text="", justify="left", anchor="w", wraplength=900, font=ctk.CTkFont(size=11, weight="bold"), text_color=self.TEXT)
        self.qr_status_lbl.pack(fill="x", pady=(10, 4))
        self.qr_display_lbl = ctk.CTkLabel(scroll, text="", text_color=self.TEXT)
        self.qr_display_lbl.pack(pady=8)
        self.qr_uri_label = ctk.CTkLabel(scroll, text="", wraplength=900, justify="left", anchor="w", text_color=self.MUTED)
        self.qr_uri_label.pack(fill="x", pady=8)

        self.bind_tooltip(self.qr_gen_btn, "Generate QR: creates a standard otpauth:// TOTP QR from a valid Base32 secret.")
        self.bind_tooltip(self.qr_new_secret_btn, "New Secret: creates a fresh random TOTP secret. Use this when you are setting up a new 2FA token.")
        self.bind_tooltip(self.qr_import_btn, "Import URI: paste the complete otpauth:// URI from an authenticator setup page.")
        self.bind_tooltip(self.qr_copy_btn, "Copy URI: copies the generated otpauth:// URI to the clipboard.")
        self.bind_tooltip(self.qr_clear_btn, "Clear: removes the current 2FA setup from this screen.")

    def validate_base32_secret(self, secret):
        """Validate and normalize a TOTP Base32 secret. OTP codes such as 123456 are NOT secrets."""
        cleaned = re.sub(r"[\s\-]", "", secret or "").upper().rstrip("=")
        if not cleaned or not re.fullmatch(r"[A-Z2-7]+", cleaned):
            return None
        # Base32 encodings with a length modulo 8 of 1, 3, or 6 are structurally invalid.
        if len(cleaned) % 8 in (1, 3, 6):
            return None
        try:
            padded = cleaned + "=" * ((8 - len(cleaned) % 8) % 8)
            base64.b32decode(padded, casefold=True)
            return cleaned
        except Exception:
            return None

    def on_totp_secret_changed(self, event=None):
        """Give immediate, useful feedback instead of only showing a generic error after clicking."""
        if not hasattr(self, "twofa_secret_state"):
            return
        raw = self.twofa_secret_entry.get().strip()
        t = LANGUAGES[self.current_lang]
        if not raw:
            self.twofa_secret_state.configure(text="", text_color=self.MUTED)
            self.twofa_secret_help.configure(text=t.get("totp_secret_help", "Paste the Base32 setup secret — not the 6-digit OTP code."))
            return
        if re.fullmatch(r"\d{6,8}", re.sub(r"\s+", "", raw)):
            self.twofa_secret_state.configure(text=t.get("totp_code_detected", "OTP CODE DETECTED — not a secret"), text_color=YELLOW)
            self.twofa_secret_help.configure(text=t.get("totp_code_help", "A 6-digit number is a temporary OTP code. It cannot be used to create a QR code. Use the setup secret or import an otpauth:// URI."))
            return
        secret = self.validate_base32_secret(raw)
        if secret:
            self.twofa_secret_state.configure(text=t.get("totp_valid", "✓ VALID BASE32 SECRET"), text_color=GREEN)
            self.twofa_secret_help.configure(text=t.get("totp_valid_help", "Looks valid. You can generate the QR code now."))
        else:
            self.twofa_secret_state.configure(text=t.get("totp_invalid", "✕ INVALID BASE32 SECRET"), text_color=RED)
            self.twofa_secret_help.configure(text=t.get("totp_invalid_help", "Base32 uses A–Z and digits 2–7. Do not paste the current 6-digit OTP here."))

    def generate_new_totp_secret(self):
        """Generate a fresh standards-compatible 160-bit Base32 secret locally."""
        secret = base64.b32encode(secrets.token_bytes(20)).decode("ascii").rstrip("=")
        self.twofa_secret_entry.delete(0, "end")
        self.twofa_secret_entry.insert(0, secret)
        if not self.twofa_issuer_entry.get().strip():
            self.twofa_issuer_entry.insert(0, "MyService")
        if not self.twofa_account_entry.get().strip():
            self.twofa_account_entry.insert(0, "user@example.com")
        self.on_totp_secret_changed()
        self.generate_qr()
        self.log_event("New TOTP secret generated locally", "INFO")

    def clear_twofa(self):
        for entry in (self.twofa_issuer_entry, self.twofa_account_entry, self.twofa_secret_entry):
            entry.delete(0, "end")
        self.qr_display_lbl.configure(image=None, text="")
        self.qr_uri_label.configure(text="")
        self.qr_status_lbl.configure(text="")
        self.twofa_secret_state.configure(text="")
        self.twofa_secret_help.configure(text=LANGUAGES[self.current_lang].get("totp_secret_help", "Paste the Base32 setup secret — not the 6-digit OTP code."))

    def build_otp_uri(self):
        issuer = self.twofa_issuer_entry.get().strip() or "Account"
        account = self.twofa_account_entry.get().strip() or "user"
        secret = self.validate_base32_secret(self.twofa_secret_entry.get().strip())
        if not secret:
            return None
        return f"otpauth://totp/{quote(issuer)}:{quote(account)}?secret={secret}&issuer={quote(issuer)}&algorithm=SHA1&digits=6&period=30"

    def generate_qr(self):
        t = LANGUAGES[self.current_lang]
        if not QR_AVAILABLE:
            self.qr_status_lbl.configure(text=t["qr_missing"], text_color=RED)
            return
        raw_secret = self.twofa_secret_entry.get().strip()
        if re.fullmatch(r"\d{6,8}", re.sub(r"\s+", "", raw_secret)):
            self.qr_status_lbl.configure(text=t.get("totp_code_help", "This is an OTP code, not a TOTP setup secret. Use the setup secret or Import URI."), text_color=YELLOW)
            return
        uri = self.build_otp_uri()
        if not uri:
            self.on_totp_secret_changed()
            self.qr_status_lbl.configure(text=t.get("totp_invalid_help", "Enter a valid Base32 setup secret, or use Generate New Secret / Import URI."), text_color=RED)
            return
        try:
            qr = qrcode.QRCode(version=None, box_size=7, border=3)
            qr.add_data(uri)
            qr.make(fit=True)
            img = qr.make_image(fill_color="black", back_color="white").convert("RGB")
            self.qr_img_obj = ctk.CTkImage(light_image=img, dark_image=img, size=(260, 260))
            self.qr_display_lbl.configure(image=self.qr_img_obj, text="")
            self.qr_uri_label.configure(text=uri)
            self.qr_status_lbl.configure(text=t.get("totp_qr_ready", "✓ QR CODE READY — scan it with your authenticator app."), text_color=GREEN)
            self.log_event("TOTP QR code generated", "INFO")
        except Exception as e:
            self.qr_display_lbl.configure(image=None, text="")
            self.qr_status_lbl.configure(text=f"QR error: {e}", text_color=RED)

    def import_otpauth_uri(self):
        t = LANGUAGES[self.current_lang]
        dialog = ctk.CTkInputDialog(text=t.get("paste_uri", "Paste an otpauth:// URI"), title=t.get("import_totp", "Import TOTP URI"))
        uri = dialog.get_input()
        if not uri:
            return
        try:
            parsed = urlparse(uri.strip())
            if parsed.scheme.lower() != "otpauth" or parsed.netloc.lower() != "totp":
                raise ValueError
            params = parse_qs(parsed.query)
            secret = self.validate_base32_secret(params.get("secret", [""])[0])
            if not secret:
                raise ValueError
            label = unquote(parsed.path.lstrip("/"))
            issuer = params.get("issuer", [""])[0]
            if ":" in label:
                label_issuer, account = label.split(":", 1)
                issuer = issuer or label_issuer
            else:
                account = label
            self.twofa_issuer_entry.delete(0, "end"); self.twofa_issuer_entry.insert(0, issuer)
            self.twofa_account_entry.delete(0, "end"); self.twofa_account_entry.insert(0, account)
            self.twofa_secret_entry.delete(0, "end"); self.twofa_secret_entry.insert(0, secret)
            self.on_totp_secret_changed()
            self.generate_qr()
            self.log_event("TOTP otpauth URI imported", "INFO")
        except Exception:
            messagebox.showerror(t.get("twofa", "2FA / OTP"), t.get("invalid_uri", "Invalid otpauth URI."))

    def copy_otp_uri(self):
        t = LANGUAGES[self.current_lang]
        uri = self.build_otp_uri()
        if not uri:
            self.on_totp_secret_changed()
            self.qr_status_lbl.configure(text=t.get("totp_invalid_help", "Enter a valid Base32 setup secret first."), text_color=RED)
            return
        try:
            pyperclip.copy(uri)
            if self.clipboard_after_id:
                self.after_cancel(self.clipboard_after_id)
            self.clipboard_after_id = self.after(self.clipboard_seconds * 1000, self.clear_clipboard)
            self.qr_status_lbl.configure(text=t.get("totp_uri_copied", "✓ OTP URI copied. Clipboard will clear automatically."), text_color=GREEN)
            self.log_event("TOTP URI copied to clipboard", "INFO")
        except Exception as e:
            self.qr_status_lbl.configure(text=f"Clipboard error: {e}", text_color=RED)

    # ========================================================
    # PHISHING / URL ANALYSIS
    # ========================================================



    # ========================================================
    # REPORTS / SETTINGS
    # ========================================================
    def export_security_report(self):
        t = LANGUAGES[self.current_lang]
        score, weak, breached = self.calculate_dashboard_score()
        path = filedialog.asksaveasfilename(initialdir=str(self._default_docs_dir()),defaultextension=".txt", filetypes=[("Security Report", "*.txt")])
        if not path:
            return
        lines = [
            "CYBER SECURITY GUARD - SECURITY ASSESSMENT",
            f"Generated: {datetime.now():%Y-%m-%d %H:%M:%S}",
            "=" * 55,
            f"Overall Security Score: {score}/100",
            f"Vault entries: {len(self.vault_data) if self.vault_unlocked else 'Locked'}",
            f"Weak passwords: {weak}",
            f"Breached passwords marked: {breached}",
            f"Last breach scan: {self.last_breach_scan or 'Never'}",
            "",
            t["recommendations"] + ":",
            "- " + t["help_specs_text"].split("\n")[0],
            "- " + t["help_specs_text"].split("\n")[8],
            "- " + t["help_safe_text"].split("\n")[1].lstrip("• "),
            "- " + t["help_safe_text"].split("\n")[2].lstrip("• "),
        ]
        try:
            Path(path).write_text("\n".join(lines), encoding="utf-8")
            messagebox.showinfo("Report", LANGUAGES[self.current_lang]["report_saved"])
        except Exception as e:
            messagebox.showerror("Report", str(e))

    def open_settings(self):
        t = LANGUAGES[self.current_lang]
        dialog = ctk.CTkToplevel(self)
        dialog.title(LANGUAGES[self.current_lang]["settings_title"])
        dialog.geometry("520x430")
        dialog.transient(self)
        dialog.grab_set()
        ctk.CTkLabel(dialog, text="⚙", font=ctk.CTkFont(size=30), text_color=CYAN).pack(pady=(15, 0))
        ctk.CTkLabel(dialog, text=LANGUAGES[self.current_lang]["settings_title"], font=ctk.CTkFont(size=18, weight="bold"), text_color=self.TEXT).pack(pady=5)
        row2 = ctk.CTkFrame(dialog, fg_color="transparent"); row2.pack(fill="x", padx=25, pady=8)
        ctk.CTkLabel(row2, text=LANGUAGES[self.current_lang]["language"], width=150, anchor="w", text_color=self.TEXT).pack(side="left")
        lang = ctk.CTkOptionMenu(row2, values=list(LANGUAGES.keys()), width=220); lang.set(self.current_lang); lang.pack(side="right"); self.bind_tooltip(lang,"Language: choose the interface language after saving settings.")
        row3 = ctk.CTkFrame(dialog, fg_color="transparent"); row3.pack(fill="x", padx=25, pady=8)
        ctk.CTkLabel(row3, text=LANGUAGES[self.current_lang]["clipboard_timeout"], width=220, anchor="w", text_color=self.TEXT).pack(side="left")
        timeout = ctk.CTkEntry(row3, width=120, fg_color=self.ENTRY, text_color=self.TEXT); timeout.insert(0, str(self.clipboard_seconds)); timeout.pack(side="right"); self.bind_tooltip(timeout,"Clipboard Clear: seconds before copied secrets are automatically removed from the clipboard.")
        ctk.CTkLabel(dialog, text=t["policy_note"] if "policy_note" in t else "Vault encryption uses PBKDF2-HMAC-SHA256 + Fernet when the cryptography package is installed.\nPasswords are never included in security reports.", wraplength=450, justify="left", text_color=self.MUTED).pack(padx=25, pady=15)
        row4 = ctk.CTkFrame(dialog, fg_color="transparent"); row4.pack(fill="x", padx=25, pady=5)
        report_btn=ctk.CTkButton(row4,text=LANGUAGES[self.current_lang]["export_report"],fg_color=ORANGE,command=self.export_security_report); report_btn.pack(side="left")
        about_btn=ctk.CTkButton(row4,text=LANGUAGES[self.current_lang]["about"],fg_color=self.NAVY,command=lambda: messagebox.showinfo("About",f"{APP_NAME}\n{APP_VERSION}\n\n{DEVELOPER}" )); about_btn.pack(side="right")
        self.bind_tooltip(report_btn,"Security Report: export posture metrics and recommendations without stored plaintext passwords.")
        self.bind_tooltip(about_btn,"About: display application version and developer information.")

        def save_and_close():
            try:
                sec = max(5, min(3600, int(timeout.get().strip())))
            except ValueError:
                messagebox.showwarning(LANGUAGES[self.current_lang]["settings"], LANGUAGES[self.current_lang]["clipboard_number"])
                return
            self.clipboard_seconds = sec
            self.current_theme = "Dark"
            self.current_lang = lang.get()
            self.settings.update({"language": self.current_lang, "clipboard_timeout": sec})
            self.save_settings_file()
            dialog.destroy()
            self.apply_theme_colors()
            self.update_ui_texts()
        report_row=ctk.CTkFrame(dialog,fg_color="transparent"); report_row.pack(fill="x",padx=25,pady=(2,6))
        self.prof_report_btn=ctk.CTkButton(report_row,text=t.get("professional_report","Professional HTML Report"),fg_color=PURPLE,command=self.export_professional_report); self.prof_report_btn.pack(side="left",fill="x",expand=True,padx=(0,5))
        self.bind_tooltip(self.prof_report_btn,t.get("professional_report","Professional HTML Report")+": export a SOC-style report without plaintext passwords.")
        ctk.CTkButton(dialog, text=LANGUAGES[self.current_lang]["save_settings"], fg_color=GREEN, command=save_and_close).pack(pady=12)

    # ========================================================
    # CONTEXTUAL HOVER HELP
    # ========================================================
    def bind_tooltip(self, widget, text):
        """Register a real mouse-enter/mouse-leave tooltip.

        The previous implementation relied mainly on global pointer polling,
        which is unreliable with Tk/CustomTkinter native child widgets.  Each
        control now gets its own Enter/Leave binding, with polling retained only
        as a fallback.
        """
        if widget is None or not text:
            return
        try:
            widget._csg_tooltip_text = text
            widget._tooltip_bg = self.NAVY
            widget._tooltip_fg = self.TEXT
            widget._tooltip_border = self.ACCENT
            widget._csg_tooltip_bound = True
        except Exception:
            return
        existing = None
        for tip in self._tooltips:
            if tip.widget is widget:
                existing = tip
                tip.text = text
                break
        if existing is None:
            existing = HoverTooltip(widget, text, delay=350)
            self._tooltips.append(existing)
        # Bind directly to the widget. add='+' preserves CustomTkinter's own
        # mouse handling and makes the tooltip independent of widget internals.
        if not getattr(widget, '_csg_direct_hover_bound', False):
            def _enter(event, tip=existing):
                try: tip.schedule()
                except Exception: pass
            def _leave(event, tip=existing):
                try: tip.hide()
                except Exception: pass
            try:
                widget._csg_enter_id = widget.bind('<Enter>', _enter, add='+')
                widget._csg_leave_id = widget.bind('<Leave>', _leave, add='+')
                widget._csg_direct_hover_bound = True
            except Exception:
                pass

    def _hover_motion(self, event=None):
        """Debounced hover tracker to avoid scheduling hundreds of timers."""
        if getattr(self, '_hover_debounce_id', None):
            return
        try:
            self._hover_debounce_id = self.after(150, self._on_hover_debounced)
        except Exception:
            pass

    def _on_hover_debounced(self):
        self._hover_debounce_id = None
        self._check_hover_target()

    def _check_hover_target(self):
        if getattr(self, '_hover_poll_id', None):
            try:
                self.after_cancel(self._hover_poll_id)
            except Exception:
                pass
            self._hover_poll_id = None

        try:
            if not self.winfo_exists():
                return
        except Exception:
            return

        if not getattr(self, '_ui_ready', False):
            return

        try:
            x, y = self.winfo_pointerx(), self.winfo_pointery()
            w = self.winfo_containing(x, y)
        except Exception:
            return
        found = None
        while w is not None:
            if getattr(w, '_csg_tooltip_bound', False):
                found = w
                break
            try:
                w = w.master
            except Exception:
                w = None
        active = getattr(self, '_active_hover_widget', None)
        # The tooltip is a top-level window. While the cursor is over the
        # tooltip itself, winfo_containing() returns that Toplevel instead of
        # the original control. Keep the tooltip alive in that case.
        if found is None and active is not None:
            for tip in self._tooltips:
                if tip.widget is active and tip.tip is not None:
                    try:
                        tx = tip.tip.winfo_rootx(); ty = tip.tip.winfo_rooty()
                        tw = tip.tip.winfo_width(); th = tip.tip.winfo_height()
                        if tx <= x <= tx + tw and ty <= y <= ty + th:
                            found = active
                    except Exception:
                        pass
        if found is not active:
            if active is not None:
                for tip in self._tooltips:
                    if tip.widget is active:
                        tip.hide()
                        break
            self._active_hover_widget = found
            if found is not None:
                for tip in self._tooltips:
                    if tip.widget is found:
                        tip.schedule()
                        break

    def _hover_leave_root(self, event=None):
        # Kept for compatibility; actual hover detection is cursor-poll based.
        return

    def clear_tooltips(self):
        for tip in getattr(self, '_tooltips', []):
            try: tip.hide()
            except Exception: pass
            try: tip.widget._csg_tooltip_bound = False
            except Exception: pass
            try:
                if getattr(tip.widget, '_csg_enter_id', None):
                    tip.widget.unbind('<Enter>', tip.widget._csg_enter_id)
                if getattr(tip.widget, '_csg_leave_id', None):
                    tip.widget.unbind('<Leave>', tip.widget._csg_leave_id)
                tip.widget._csg_enter_id = None
                tip.widget._csg_leave_id = None
                tip.widget._csg_direct_hover_bound = False
            except Exception: pass
            try: del tip.widget._csg_tooltip_text
            except Exception: pass
        self._tooltips = []
        self._tooltips_installed = False
        self._active_hover_widget = None

    def install_tooltips(self):
        """Install detailed help on every important control and all interactive descendants."""
        t = LANGUAGES[self.current_lang]
        if not getattr(self, '_global_hover_bound', False):
            self.bind_all('<Motion>', self._hover_motion, add='+')
            self._global_hover_bound = True

        tips = {
            'dashboard': t['dashboard'] + ': ' + t.get('dashboard_title', 'Security Command Center'),
            'analyzer': t['analyzer'] + ': password strength analysis and secure generation.',
            'vault': t['vault'] + ': local encrypted credential storage protected by a master password.',
            'expiry': t['expiry'] + ': compare password age with your rotation policy.',
            'twofa': t['twofa'] + ': create or import TOTP setup and QR codes.',
            'help': t['help'] + ': security rules, privacy policy, module guide and safe-use notes.',
        }
        for key, text in tips.items(): self.bind_tooltip(self.nav_buttons.get(key), text)
        self.bind_tooltip(self.settings_btn, t['settings'] + ': language, clipboard timeout, reports and vault backup/restore.')
        self.bind_tooltip(self.lang_dropdown, t['language'] + ': change all supported interface text, module labels and contextual help.')

        controls = [
            (getattr(self,'specs_btn',None), t.get('password_specs','Password Specs') + ': complete password-security rules.'),
            (getattr(self,'policy_btn',None), t.get('security_policy','Security Policy') + ': privacy, local processing, breach and vault safeguards.'),
            (getattr(self,'password_entry',None), t.get('password_prompt','Password') + ': enter a password for local strength analysis.'),
            (getattr(self,'toggle_btn',None), t.get('show','Show')+'/'+t.get('hide','Hide') + ': reveal or mask the current password.'),
            (getattr(self,'generate_button',None), t.get('generate','Generate') + ': create a strong random password.'),
            (getattr(self,'advanced_generate_button',None), t.get('adv_gen_title','Advanced Password Generator') + ': configure length and character sets.'),
            (getattr(self,'copy_button',None), t.get('copy','Copy') + ': copy the secret; clipboard is cleared automatically.'),
            (getattr(self,'export_button',None), t.get('export','Export') + ': export only after a security warning.'),
            (getattr(self,'scan_button',None), t.get('scan','Scan') + ': check breach exposure using the privacy-preserving range method.'),
            (getattr(self,'vault_unlock_btn',None), t.get('unlock_vault','Unlock') + ': decrypt the local vault for this session.'),
            (getattr(self,'vault_lock_btn',None), t.get('lock_vault','Lock') + ': clear unlocked vault data from the active session.'),
            (getattr(self,'vault_backup_btn',None), t.get('backup_short','Backup') + ': export the encrypted vault backup.'),
            (getattr(self,'vault_restore_btn',None), t.get('restore_short','Restore') + ': import an encrypted vault backup.'),
            (getattr(self,'vault_save_btn',None), t.get('save_vault','Save') + ': store the current credential in the encrypted vault.'),
            (getattr(self,'expiry_check_btn',None), t.get('check_rotation','Check Rotation') + ': calculate password rotation status.'),
            (getattr(self,'qr_gen_btn',None), t.get('generate_qr','Generate QR') + ': create a standards-compatible TOTP QR code.'),
            (getattr(self,'qr_import_btn',None), t.get('parse_uri','Import URI') + ': import an existing otpauth TOTP URI.'),
            (getattr(self,'qr_copy_btn',None), t.get('copy_otp_uri','Copy URI') + ': copy the TOTP URI; clipboard clears automatically.'),
            (getattr(self,'phish_check_btn',None), t.get('analyze_url','Analyze URL') + ': calculate heuristic URL risk.'),
            (getattr(self,'phish_score',None), t.get('risk_score','Risk Score') + ': heuristic estimate, not proof of safety.'),
        ]
        for w, text in controls: self.bind_tooltip(w, text)

        # Universal pass: every visible interactive control and meaningful text label gets help.
        def walk(widget):
            for child in widget.winfo_children():
                yield child
                yield from walk(child)
        for w in walk(self):
            cls = w.__class__.__name__
            if cls.startswith('CTk') and not getattr(w, '_csg_tooltip_bound', False):
                label = ''
                try: label = str(w.cget('text') or '').strip()
                except Exception: pass
                if cls in ('CTkButton','CTkEntry','CTkOptionMenu','CTkSlider','CTkCheckBox','CTkSwitch') or label:
                    if label:
                        generic = t.get('hover_generic', 'Security control: hover here for contextual guidance.') + ' ' + label
                    else:
                        generic = t.get('hover_generic', 'Security control: hover here for contextual guidance.')
                    self.bind_tooltip(w, generic)
        self._tooltips_installed = True

    # ========================================================
    # UI TEXT UPDATE
    # ========================================================
    def update_ui_texts(self):
        t = LANGUAGES[self.current_lang]
        def cfg(name, **kw):
            w=getattr(self,name,None)
            if w is not None:
                try: w.configure(**kw)
                except Exception: pass
        cfg("title_label", text=APP_NAME); cfg("subtitle_label", text=t.get("subtitle","")); cfg("status_label", text="● "+t.get("system_protected","SYSTEM PROTECTED"))
        cfg("defense_mode_label", text=t.get("defense_matrix","LIVE DEFENSE MATRIX")+"  •  "+t.get("local_mode","LOCAL MODE")+"  •  DARK SKY BLUE")
        if hasattr(self,"lang_dropdown"):
            try: self.lang_dropdown.set(self.current_lang)
            except Exception: pass
        nav_map={"dashboard":t.get("dashboard","Dashboard"),"analyzer":t.get("analyzer","Analyzer & Generator"),"vault":t.get("vault","Secure Vault"),"documents":"Secure Documents","expiry":t.get("expiry","Expiry & Rotation"),"health":t.get("health_title","Security Health Check"),"help":t.get("help","Help Center")}
        icons={"dashboard":"⌂","analyzer":"🔐","vault":"🗄","documents":"📁","expiry":"⏳","health":"🛡","help":"?"}
        for key,btn in getattr(self,"nav_buttons",{}).items():
            try: btn.configure(text=f"{icons.get(key,'•')}  {nav_map.get(key,key.title())}")
            except Exception: pass
        cfg("settings_btn", text="⚙ "+t.get("settings","Settings")); cfg("sidebar_section_label", text=t.get("security_operations","SECURITY OPERATIONS"))
        cfg("sidebar_status", text=f"{t.get('status','Status')}\n\n{t.get('vault','Vault')}: {t.get('vault_unlocked','Unlocked') if self.vault_unlocked else t.get('vault_locked','Locked')}\n{t.get('last_scan','Last Breach Scan')}: {self.last_breach_scan or t.get('never','Never')}")
        cfg("version_label", text=f"{APP_NAME} {APP_VERSION}")
        cfg("analyzer_heading", text=t.get("analyzer","Analyzer & Generator")); cfg("specs_btn", text="📋 "+t.get("password_specs","Password Specs")); cfg("policy_btn", text="🛡 "+t.get("security_policy","Security Policy")); cfg("info_label", text=t.get("password_prompt","Enter password to analyze:"))
        if hasattr(self,"password_entry"):
            try: self.password_entry.configure(placeholder_text=t.get("placeholder","Type your password here..."))
            except Exception: pass
        cfg("toggle_btn", text=t.get("hide","Hide") if self.show_hidden else t.get("show","Show")); cfg("generate_button", text="🎲 "+t.get("generate","Generate")); cfg("advanced_generate_button", text="⚡ "+t.get("adv_short","Advanced")); cfg("copy_button", text="📋 "+t.get("copy","Copy")); cfg("export_button", text="💾 "+t.get("export","Export")); cfg("scan_button", text="🛡 "+t.get("scan","SCAN")); cfg("analysis_title", text="🛡 "+t.get("advanced","ADVANCED SECURITY ANALYSIS"))
        cfg("vault_heading", text="🗄 "+t.get("vault_title","Secure Vault")); cfg("vault_unlock_btn", text=t.get("unlock_vault","Unlock Vault")); cfg("vault_lock_btn", text=t.get("lock_vault","Lock Vault")); cfg("vault_save_btn", text="🔒 "+t.get("save_vault","Save to Vault"))
        cfg("secure_documents_heading", text="📁 Secure Documents"); cfg("secure_documents_unlock_btn", text="Unlock"); cfg("secure_documents_lock_btn", text="Lock"); cfg("secure_documents_import_btn", text="📄 Import Document"); cfg("secure_documents_subject_btn", text="＋ New Subject")
        for k,key in {"vault_account_entry":"vault_account","vault_username_entry":"vault_username","vault_pwd_entry":"vault_password","vault_url_entry":"vault_url","vault_notes_entry":"vault_notes"}.items():
            try: self.vault_labels[k].configure(text=t.get(key,key))
            except Exception: pass
        cfg("vault_backup_btn", text=t.get("backup_short","Backup")); cfg("vault_restore_btn", text=t.get("restore_short","Restore")); cfg("expiry_heading", text="⏳ "+t.get("expiry_title","Password Expiry & Rotation Policy")); cfg("created_lbl", text=t.get("created_date","Password Creation Date (YYYY-MM-DD)")); cfg("rotation_lbl", text=t.get("rotation_days","Rotation Period (days)")); cfg("expiry_check_btn", text=t.get("check_rotation","Check Rotation Status"))
        cfg("dashboard_heading", text="समुद्र कवच  •  SAMUNDRA KAVACH"); cfg("score_title", text=t.get("overall_score","Overall Security Score")); cfg("recommend_title", text=t.get("recommendations","Security Recommendations")); cfg("activity_title", text=t.get("activity","Security Activity"))
        cfg("network_heading", text="🌐 "+t.get("network_title","Network Security Scanner")); cfg("health_heading", text="🛡 "+t.get("health_title","Security Health Check")); cfg("forensics_heading", text="⌕ "+t.get("forensics_title","Digital Forensics Toolkit"))
        cfg("help_heading", text="?  "+t.get("help_title","Security Help Center")); cfg("help_intro_lbl", text=t.get("help_intro","")); cfg("help_hover_note", text="⌁ "+t.get("help_zoom_hint",t.get("zoom_hint","")))
        if hasattr(self,"help_cards"):
            for _,(title,body,title_key,text_key) in self.help_cards.items():
                try: title.configure(text=t.get(title_key,title_key)); body.configure(text=t.get(text_key,text_key))
                except Exception: pass
        for fn in (self.check_strength_live, self.refresh_vault_view, self.refresh_dashboard):
            try: fn()
            except Exception: pass
        self._apply_help_zoom()
        if not self._tooltips_installed and getattr(self,"_ui_ready",False):
            try: self.after(250,self._lazy_install_tooltips)
            except Exception: pass

    # ========================================================
    # CLEAN EXIT
    # ========================================================
    def on_close(self):
        for aid in (getattr(self, "_boot_after_id", None), getattr(self, "_transition_after_id", None), getattr(self, "dashboard_clock_after_id", None), getattr(self, "_dashboard_live_after", None), getattr(self, "_hover_poll_id", None), getattr(self, "_hover_debounce_id", None)):
            if aid:
                try: self.after_cancel(aid)
                except Exception: pass
        if self.clipboard_after_id:
            try:
                self.after_cancel(self.clipboard_after_id)
            except Exception:
                pass
        try:
            pyperclip.copy("")
        except Exception:
            pass
        try:
            self._save_user_state()
        except Exception: pass
        for temp_path in list(getattr(self, "_secure_document_temp_files", [])):
            try: temp_path.unlink(missing_ok=True)
            except Exception: pass
        self.secure_documents_data = {"subjects": []}
        self.secure_documents_unlocked = False
        self.vault_data = []
        self.vault_key = None
        for tip in getattr(self,"_tooltips",[]):
            try: tip.hide()
            except Exception: pass
        self.destroy()


if __name__ == "__main__":
    ctk.set_appearance_mode("dark")
    ctk.set_default_color_theme("blue")
    app = PasswordSecurityGuard()
    app.mainloop()
