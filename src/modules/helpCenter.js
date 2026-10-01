// CYBER DEFENSE ACADEMY - HELP CENTER & USER GUIDE
// Comprehensive operational guide, FAQs, A-Z Cyber Dictionary, and Keyboard Shortcuts in English & Hinglish

import { i18n } from '../utils/i18n.js';
import { cyberAudio } from './audio.js';

export function renderHelpCenter(container) {
  let activeTab = 'faq'; // 'faq', 'guide', 'dictionary', 'shortcuts'
  let searchQuery = '';

  const FAQS = [
    {
      q_en: "How does the Cyber Defense Range (100+ Practical Labs) work?",
      q_hi: "Cyber Defense Range (100+ Practical Labs) kaise kaam karta hai?",
      a_en: "Navigate to 'Cyber Defense Labs' in the sidebar. You will find over 100 working practical labs across Network Forensics, Windows Sysmon, Linux Hardening, OWASP Web Security, SOC Triage, Incident Response, Cloud IAM, and Cryptography. Each lab features live simulated telemetry and 6 guided forensic questions. Type your answer and click 'Validate Answer'. If you need assistance, click '💡 Hint' or '🔓 Solution' to reveal the solution and explanation!",
      a_hi: "Sidebar me 'Cyber Defense Labs' par click karein. Wahan aapko 100 se zyada working practical labs milengi: Network, Windows Sysmon, Linux, Web Security, SOC Triage aur Cloud Security par. Har lab me live telemetry logs aur 6 guided sawaal hain. Apna answer type karke 'Validate Answer' dabayein. Madad ke liye '💡 Hint' ya '🔓 Solution' button dabakar solution dekh sakte hain!",
      cat: "labs"
    },
    {
      q_en: "Where can I read the 200+ cybersecurity books in the Technical Library?",
      q_hi: "Technical Library me 200 se zyada cyber security kitabein kahan milengi?",
      a_en: "Click 'Technical Library' in the sidebar navigation. You can filter through 200+ complete books across Ethical Hacking, Network Defense, SOC Operations, Python Automation, and Cloud Security. Every book contains 6 comprehensive chapters. You can also click '🔊 Listen Chapter' to have the application read the chapter aloud to you!",
      a_hi: "Sidebar me 'Technical Library' par click karein. Wahan 200 se zyada complete kitabein hain: Ethical Hacking, Networking, SOC Defense, Python aur Cloud Security par. Har kitab ke andar 6 complete chapters hain. Aap '🔊 Listen Chapter' button daba kar audio bhi sun sakte hain!",
      cat: "library"
    },
    {
      q_en: "How do I watch videos in the Learning Videos feature without errors?",
      q_hi: "Learning Videos feature me bina kisi problem ke videos kaise dekhein?",
      a_en: "Open 'Learning Videos' from the sidebar. All videos are 100% verified authentic lectures from top cybersecurity educators (freeCodeCamp, NetworkChuck, Computerphile, Simplilearn). You can click '▶ Play in App' to watch in theater mode, or click '🌐 YouTube ↗' to open directly in your web browser for unrestricted high-definition viewing!",
      a_hi: "Sidebar se 'Learning Videos' kholein. Sabhi videos 100% verified hain (freeCodeCamp, NetworkChuck, Computerphile, Simplilearn). Aap '▶ Play in App' par click karke app ke andar theater mode me dekh sakte hain, ya fir '🌐 YouTube ↗' par click karke direct browser me bina kisi rukawat ke dekh sakte hain!",
      cat: "videos"
    },
    {
      q_en: "What is the News/Update feature and how do I open the official websites?",
      q_hi: "News/Update feature kya hai aur official website kaise kholein?",
      a_en: "The 'News/Update' feature streams live and verified advisories from CERT-In, CISA, The Hacker News, BleepingComputer, and global cyber defense agencies. Clicking on any news title, card, or the '🌐 Official Website ↗' button immediately opens the official advisory webpage directly in your web browser!",
      a_hi: "'News/Update' feature me CERT-In, CISA, The Hacker News aur official cyber defense agencies ke live updates aate hain. Kisi bhi news card, title ya '🌐 Official Website ↗' button par click karne se wo news turant official website par khul jati hai!",
      cat: "news"
    },
    {
      q_en: "What tools are included in the updated Security Toolkit?",
      q_hi: "Updated Security Toolkit me kaun-kaun se tools hain?",
      a_en: "The Security Toolkit includes 7 field utilities: 1) IPv4 Subnet & VLSM Calculator, 2) High-Risk Ports Directory, 3) Cryptographic Hash & Encoding Studio (SHA-256, SHA-512, Base64, Hex, URL), 4) Threat Intel IOC Defanger & Refanger, 5) Multi-Platform Firewall Rule Generator (iptables, UFW, Windows Defender, Cisco IOS, Snort), 6) Password Entropy & Brute-Force Crack Estimator, and 7) CVSS v3.1 Severity Scorer.",
      a_hi: "Security Toolkit me 7 practical tools hain: 1) Subnet & CIDR Calculator, 2) High-Risk Ports Directory, 3) Cryptographic Hash Studio (SHA-256, SHA-512, Base64, Hex, URL), 4) Threat IOC Defanger & Refanger, 5) Multi-Platform Firewall Rule Generator (iptables, UFW, Windows, Cisco, Snort), 6) Password Entropy Estimator, aur 7) CVSS v3.1 Severity Scorer.",
      cat: "tools"
    },
    {
      q_en: "How do I switch between Simple English and Hinglish?",
      q_hi: "Simple English aur Hinglish bhasha me kaise switch karein?",
      a_en: "Click the '🌐 Language' button in the topbar header at any time. The entire application immediately translates its interface, explanations, and guides to your preferred language.",
      a_hi: "Header ke topbar me '🌐 Language' button par click karein. Poori application turant aapki pasandida bhasha (English ya Hinglish) me badal jayegi.",
      cat: "app-features"
    },
    {
      q_en: "How do I toggle Dark Mode and Light Mode?",
      q_hi: "Dark Mode aur Light Mode kaise badlein?",
      a_en: "Click the '🌙 Dark / ☀️ Light' button in the topbar header. Your choice is automatically remembered on your computer.",
      a_hi: "Header ke topbar me '🌙 Dark / ☀️ Light' button par click karein. Aapka mode apne aap save ho jayega.",
      cat: "app-features"
    }
  ];

  const GUIDES = [
    {
      title: "Step 1: Navigating the Cyber Curriculum (52 Topics)",
      title_hi: "Step 1: Cyber Curriculum (52 Topics) kaise padhein",
      desc: "Each curriculum topic is divided into Phase 1 (Theory with real-world analogies), Phase 2 (High-priority Q&A for exams and interviews), and Phase 3 (Interactive knowledge quiz with scoring).",
      desc_hi: "Har course topic me Phase 1 (Theory), Phase 2 (Zaroori Q&A) aur Phase 3 (Interactive Quiz) hai jisse aap step-by-step master bante hain."
    },
    {
      title: "Step 2: Hands-on Defense Range (100+ Practical Labs)",
      title_hi: "Step 2: Practical Labs me hands-on practice karein",
      desc: "Enter the Cyber Defense Labs range. Read the incident scenario, analyze live telemetry/PCAP dumps, and answer the 6 tactical investigation tasks. Use Hints or Solution reveals when needed and claim XP.",
      desc_hi: "Cyber Defense Labs me jayein. Telemetry logs dekhein, 6 sawaalo ke jawab dein aur 'Validate Answer' karein. Zaroorat padne par Hint ya Solution dekh sakte hain."
    },
    {
      title: "Step 3: Exploring the 200+ Books Technical Library",
      title_hi: "Step 3: 200+ Kitabo ki Technical Library ka istemal",
      desc: "Browse through 200+ curated cybersecurity books spanning Ethical Hacking, Network Defense, SOC Operations, Python Automation, and Cloud Security. Read full chapters or listen with Text-to-Speech audio.",
      desc_hi: "200 se zyada kitabein padhein ya audio sun kar seekhein. Har book me 6 full chapters practical commands ke saath diye gaye hain."
    },
    {
      title: "Step 4: Monitoring News/Update Official Feeds",
      title_hi: "Step 4: News/Update par official updates dekhein",
      desc: "Stay informed on active cyber threats from CERT-In and CISA. Click any news link or 'Official Website ↗' button to open the live advisory directly on the agency's official webpage.",
      desc_hi: "CERT-In aur CISA ke live threat advisories dekhein aur ek click me unki official website par jakar detail padhein."
    },
    {
      title: "Step 5: Utilizing the 7 Tactical Field Utilities",
      title_hi: "Step 5: Security Toolkit ke 7 tools ka istemal karein",
      desc: "Calculate subnets, check high-risk ports, generate SHA-256/SHA-512 hashes, defang malicious URLs/IPs, generate firewall rules for 5 platforms, estimate password crack times, and calculate CVSS scores.",
      desc_hi: "Subnet calculate karein, ports check karein, hash banayein, malicious URLs ko defang karein, firewall rules generate karein aur CVSS score calculate karein."
    }
  ];

  const DICTIONARY = [
    { term: "IP Address", def_en: "A unique numerical identifier assigned to every device connected to a computer network.", def_hi: "Network par har device ka ek unique pata jisse data sahi jagah pahunche." },
    { term: "Subnet Mask", def_en: "A 32-bit number used in IPv4 to distinguish the network portion of an IP address from the host portion.", def_hi: "Ek number jo IP address me network aur host ko alag karta hai." },
    { term: "Firewall", def_en: "A network security system that monitors and filters incoming and outgoing traffic based on security rules.", def_hi: "Ek security guard software jo dangerous internet traffic ko rokta hai." },
    { term: "Phishing", def_en: "Social engineering attack where attackers impersonate trustworthy entities to steal passwords and sensitive data.", def_hi: "Farzi email ya link bhej kar password churana." },
    { term: "Ransomware", def_en: "Malicious software that encrypts user files and demands payment to restore access.", def_hi: "Aisa virus jo files lock kar deta hai aur paise maangta hai." },
    { term: "Zero-Day Exploit", def_en: "An attack that targets a software vulnerability unknown to the vendor with no patch available.", def_hi: "Aisi kamzori jiska abhi tak company ko pata nahi aur koi patch nahi hai." },
    { term: "SIEM", def_en: "Security Information and Event Management system that aggregates and analyzes log data across enterprise systems.", def_hi: "Central system jo sabhi computers ke logs collect aur monitor karta hai." },
    { term: "IOC (Indicator of Compromise)", def_en: "Forensic evidence of potential intrusion such as malicious IP addresses, domain names, or file hashes.", def_hi: "Adversary ke nishan jaise malicious IP, domain ya hash." },
    { term: "Defanging", def_en: "Modifying malicious URLs or IPs (e.g. hxxp://bad[.]com) so they cannot be accidentally clicked.", def_hi: "Malicious links ko safe banana taaki koi galti se click na kar sake." },
    { term: "CVSS", def_en: "Common Vulnerability Scoring System: an open framework for communicating the severity of software vulnerabilities from 0.0 to 10.0.", def_hi: "Software ki kamzori kitni khatarnak hai uska score (0.0 se 10.0)." }
  ];

  function render() {
    const isHinglish = i18n.getLanguage() === 'hinglish';

    container.innerHTML = `
      <div class="help-center-viewport" style="max-width: 1080px; margin: 0 auto;">
        <!-- Header -->
        <div class="card-tactical" style="background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%); border-left: 4px solid var(--cyan-glow); margin-bottom: 24px;">
          <span class="tag-pill" style="border-color: var(--cyan-glow); margin-bottom: 8px; display: inline-block; font-weight: 700;">
            CADET SUPPORT // HELP CENTER & SYSTEM USER GUIDE
          </span>
          <h2 style="font-size: 26px; color: var(--text-bright); margin-bottom: 6px;">
            ${isHinglish ? 'Help Center: Cadets User Guide & FAQs' : 'Help Center: Operating Guide, FAQs & Cyber Dictionary'}
          </h2>
          <p style="color: var(--text-muted); font-size: 14px; max-width: 750px; line-height: 1.5; margin: 0;">
            ${isHinglish 
              ? 'Nayi features ka istemal kaise karein: 100+ Practical Labs, 200+ Books Technical Library, Learning Videos, News/Update aur Security Toolkit ka complete guide.'
              : 'Complete operational instructions for all updated application features: 100+ Practical Labs, 200+ Technical Books, Verified Learning Videos, News/Update official streams, and Security Toolkit.'}
          </p>
        </div>

        <!-- Navigation Tabs -->
        <div class="domain-filter-bar" style="margin-bottom: 24px; display: flex; gap: 8px; flex-wrap: wrap;">
          <span class="filter-pill ${activeTab === 'faq' ? 'active' : ''}" data-tab="faq">
            ❓ Frequently Asked Questions (${FAQS.length})
          </span>
          <span class="filter-pill ${activeTab === 'guide' ? 'active' : ''}" data-tab="guide">
            📖 Step-by-Step Feature Walkthrough
          </span>
          <span class="filter-pill ${activeTab === 'dictionary' ? 'active' : ''}" data-tab="dictionary">
            📚 A-Z Cyber Security Dictionary
          </span>
        </div>

        <!-- Tab Content -->
        <div id="help-content-area">
          ${activeTab === 'faq' ? renderFaqs(isHinglish) : ''}
          ${activeTab === 'guide' ? renderGuide(isHinglish) : ''}
          ${activeTab === 'dictionary' ? renderDictionary(isHinglish) : ''}
        </div>
      </div>
    `;

    container.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        cyberAudio.playClick();
        activeTab = pill.getAttribute('data-tab');
        render();
      });
    });
  }

  function renderFaqs(isHinglish) {
    return `
      <div style="display: flex; flex-direction: column; gap: 14px;">
        ${FAQS.map(faq => `
          <div class="card-tactical" style="padding: 18px 22px; margin-bottom: 0; border-left: 3px solid var(--cyan-glow);">
            <h3 style="font-size: 16px; font-weight: 700; color: var(--text-bright); margin-bottom: 8px; line-height: 1.4;">
              ${isHinglish ? faq.q_hi : faq.q_en}
            </h3>
            <p style="font-size: 13.5px; color: var(--text-muted); line-height: 1.6; margin: 0;">
              ${isHinglish ? faq.a_hi : faq.a_en}
            </p>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderGuide(isHinglish) {
    return `
      <div style="display: flex; flex-direction: column; gap: 18px;">
        ${GUIDES.map((g, i) => `
          <div class="card-tactical" style="padding: 22px; margin-bottom: 0; border-top: 3px solid var(--cyan-glow);">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
              <span class="tag-pill" style="border-color: var(--cyan-glow); color: var(--cyan-glow); font-weight: 700;">
                PHASE ${i + 1}
              </span>
              <h3 style="font-size: 17px; font-weight: 700; color: #fff; margin: 0;">
                ${isHinglish ? g.title_hi : g.title}
              </h3>
            </div>
            <p style="font-size: 14px; color: var(--text-muted); line-height: 1.6; margin: 0;">
              ${isHinglish ? g.desc_hi : g.desc}
            </p>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderDictionary(isHinglish) {
    return `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px;">
        ${DICTIONARY.map(d => `
          <div class="card-tactical" style="padding: 16px; margin-bottom: 0; border-left: 3px solid var(--emerald-glow);">
            <h4 style="font-size: 15px; color: var(--emerald-glow); font-weight: 700; margin-bottom: 6px;">
              ${escapeHtml(d.term)}
            </h4>
            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin: 0;">
              ${isHinglish ? escapeHtml(d.def_hi) : escapeHtml(d.def_en)}
            </p>
          </div>
        `).join('')}
      </div>
    `;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  render();
}
