import { DefenseStorage } from '../utils/storage.js';
import { cyberAudio } from './audio.js';
import { i18n } from '../utils/i18n.js';

// High-Yield Revision Flashcards in Simple English & Hinglish
const CORE_TACTICAL_CARDS = [
  {
    id: 'rev-01',
    category: 'Core Cyber Basics',
    domain: 'core-cyber',
    question: 'What is the CIA Triad in simple words?',
    question_hi: 'CIA Triad ka aasan bhasha me kya matlab hai?',
    answer: 'The 3 pillars of cybersecurity:\n1. Confidentiality (only authorized people see the data)\n2. Integrity (data cannot be altered or faked)\n3. Availability (systems work when needed).',
    answer_hi: 'Cyber security ke 3 zaroori niyam:\n1. Confidentiality: Data sirf unhi ko dikhe jinko permission hai.\n2. Integrity: Data ke sath koi ched-chaad na ho sake.\n3. Availability: Website ya server har waqt chalte rahein.',
    tip: 'Integrity guarantees data is unaltered; Authenticity verifies who sent it.'
  },
  {
    id: 'rev-02',
    category: 'Networking',
    domain: 'networking',
    question: 'What is the TCP 3-Way Handshake and a SYN flood attack?',
    question_hi: 'TCP 3-Way Handshake aur SYN flood attack kya hota hai?',
    answer: 'Normal connection: Client sends SYN -> Server replies SYN-ACK -> Client replies ACK. In a SYN flood, attacker sends thousands of fake SYNs and never sends the ACK, filling the server memory queue until it crashes.',
    answer_hi: 'Normal connection me teen baatein hoti hain: Hello (SYN) -> Hello wapas (SYN-ACK) -> Okay confirm (ACK). SYN flood me attacker hazaro fake Hello bhejkar confirm nahi karta, jisse server hang ho jata hai.',
    tip: 'Defend using TCP SYN Cookies (`sysctl -w net.ipv4.tcp_syncookies=1`) and firewall rate limits.'
  },
  {
    id: 'rev-03',
    category: 'Web Security',
    domain: 'ethical-hacking',
    question: 'What is SQL Injection (SQLi) and how do you prevent it?',
    question_hi: 'SQL Injection kya hai aur ise kaise rokein?',
    answer: "SQLi happens when user input is concatenated directly into database queries. Attackers enter ' OR '1'='1 to bypass logins or dump entire databases. Prevent by using Parameterized Queries (Prepared Statements).",
    answer_hi: 'Jab website par input field me hacker database command daal deta hai aur bina password ke login kar leta hai. Ise rokne ke liye Prepared Statements (Parameterized Queries) use karein.',
    tip: 'Never concatenate SQL strings directly with user input: `SELECT * FROM users WHERE id = ?`.'
  },
  {
    id: 'rev-04',
    category: 'Web Security',
    domain: 'ethical-hacking',
    question: 'What is Cross-Site Scripting (XSS)?',
    question_hi: 'Cross-Site Scripting (XSS) attack kya hota hai?',
    answer: 'XSS happens when an attacker injects malicious JavaScript into a trusted website. When other users visit that page, the script runs in their browser and steals their cookies/session tokens.',
    answer_hi: 'Jab hacker kisi website par aisa JavaScript code daal deta hai jo dusre visitors ke browser me chal jata hai aur unka login session chura leta hai.',
    tip: 'Mitigate with Content Security Policy (CSP), HTML output encoding, and `HttpOnly` cookie flags.'
  },
  {
    id: 'rev-05',
    category: 'Incident Response',
    domain: 'core-cyber',
    question: 'What are the 6 official phases of Incident Response (NIST)?',
    question_hi: 'Cyber attack hone par Incident Response ke 6 steps kya hain?',
    answer: '1. Preparation (tools & team ready)\n2. Detection & Analysis (alert triage)\n3. Containment (isolate infected host)\n4. Eradication (clean malware)\n5. Recovery (restore from backup)\n6. Lessons Learned (update defenses).',
    answer_hi: '1. Preparation (taiari)\n2. Detection (attack pehchanna)\n3. Containment (infected PC ko alag karna)\n4. Eradication (virus hatana)\n5. Recovery (backup se restore karna)\n6. Lessons Learned (galtiyon se seekhna).',
    tip: 'Never turn off the computer during active investigation; volatile RAM contains critical forensic evidence.'
  },
  {
    id: 'rev-06',
    category: 'Defense & Hardening',
    domain: 'core-cyber',
    question: 'What is Multi-Factor Authentication (MFA) and why is it essential?',
    question_hi: 'Multi-Factor Authentication (MFA) kya hota hai aur kyu zaroori hai?',
    answer: 'MFA requires 2 or more distinct authentication factors: something you know (password), something you have (phone/authenticator app), or something you are (fingerprint). It stops 99.9% of automated credential stuffing.',
    answer_hi: 'Password ke alawa phone par aane wala OTP ya Authenticator App ka code. Agar hacker ko password pata bhi chal jaye, bina phone ke wo login nahi kar payega.',
    tip: 'FIDO2 / WebAuthn physical hardware keys (like YubiKey) are immune to SMS phishing and reverse proxies.'
  },
  {
    id: 'rev-07',
    category: 'Indian Cyber Law',
    domain: 'indian-cyber',
    question: 'What is the mandatory CERT-In reporting timeline for cyber incidents?',
    question_hi: 'CERT-In ke mutabiq cyber attack ki report kitne samay me karni hoti hai?',
    answer: 'Organizations must report specified cybersecurity incidents to CERT-In within 6 hours of noticing them, and retain server audit logs for at least 180 days within Indian jurisdiction.',
    answer_hi: 'Attack ka pata chalne ke 6 ghante ke andar CERT-In ko report karna hota hai, aur system ke logs 180 din tak surakshit rakhne padte hain.',
    tip: 'Synchronize system clocks with official Indian Standard Time (NPL/NIC NTP) for forensically valid logs.'
  },
  {
    id: 'rev-08',
    category: 'Digital Forensics',
    domain: 'core-cyber',
    question: 'What is the Order of Volatility in RFC 3227 digital evidence?',
    question_hi: 'Digital saboot ikkattha karte waqt pehle kya save karna chahiye?',
    answer: '1. CPU Registers & Cache (cleared in nanoseconds)\n2. RAM & Network Connections\n3. Temp Files & Swap\n4. Hard Disk Storage\n5. Offline Backups & Tapes.',
    answer_hi: 'Sabse pehle RAM aur live network connections ka snapshot lein, fir temporary files aur aakhiri me hard disk ka image banayein.',
    tip: 'Always use a hardware write-blocker when imaging target physical hard drives.'
  },
  {
    id: 'rev-09',
    category: 'Cryptography',
    domain: 'military-cyber',
    question: 'What is the difference between Symmetric and Asymmetric Encryption?',
    question_hi: 'Symmetric aur Asymmetric Encryption me kya farak hai?',
    answer: 'Symmetric (AES) uses the same single secret key to both encrypt and decrypt data (very fast). Asymmetric (RSA/ECC) uses a Public Key to encrypt and a separate Private Key to decrypt (used for key exchange and signatures).',
    answer_hi: 'Symmetric me ek hi chaabi se tala lagta aur khulta hai (jaise AES). Asymmetric me do alag chaabi hoti hain: Public key tala lagane ke liye aur Private key tala kholne ke liye (jaise RSA).',
    tip: 'HTTPS uses asymmetric encryption (RSA/ECDH) to exchange an AES symmetric key, then encrypts data with AES.'
  },
  {
    id: 'rev-10',
    category: 'Social Engineering',
    domain: 'ethical-hacking',
    question: 'What is Phishing, Spear Phishing, and Whaling?',
    question_hi: 'Phishing, Spear Phishing aur Whaling me kya antar hai?',
    answer: 'Phishing: mass emails sent to thousands hoping someone clicks. Spear Phishing: personalized email targeting a specific individual. Whaling: targeted attack aimed specifically at high-profile executives (CEOs, CFOs).',
    answer_hi: 'Phishing: hazaron logo ko fake email bhejna. Spear Phishing: kisi ek khaas employee ko research karke target karna. Whaling: company ke bade officer (CEO, Director) ko target karna.',
    tip: 'Deploy SPF, DKIM, and DMARC DNS records to prevent attackers from spoofing your company email domain.'
  },
  {
    id: 'rev-11',
    category: 'Offensive & Red Team',
    domain: 'ethical-hacking',
    question: 'What are LOLBins (Living Off The Land Binaries)?',
    question_hi: 'LOLBins kya hote hain?',
    answer: 'Legitimate built-in operating system tools (like certutil, powershell, wmic, bitsadmin) that attackers misuse to download files, execute payloads, or bypass antivirus without dropping unknown files to disk.',
    answer_hi: 'Windows ke apne built-in tools (jaise PowerShell, certutil) jinka hacker galat upyog karke bina kisi naye virus ke system hack karte hain.',
    tip: 'Monitor command line arguments via Sysmon Event ID 1 and block script engines with AppLocker.'
  },
  {
    id: 'rev-12',
    category: 'Malware & Defense',
    domain: 'core-cyber',
    question: 'How does Ransomware spread and what is the best defense?',
    question_hi: 'Ransomware kaise failta hai aur isse bachne ka best tareeqa kya hai?',
    answer: 'Spreads via phishing attachments, open RDP ports (3389), or stolen VPN credentials. The best defense is automated, immutable, offline 3-2-1 backups and disabling macros and unneeded remote services.',
    answer_hi: 'Phishing emails, khule RDP port ya kamzor password se failta hai. Sabse zaroori bachaav hai apne data ka offline alag backup rakhna.',
    tip: 'Never leave RDP port 3389 open directly to the public internet.'
  },
  {
    id: 'rev-13',
    category: 'Networking',
    domain: 'networking',
    question: 'What are the common Port Numbers you must remember?',
    question_hi: 'Kaunse zaroori Port Numbers hamesha yaad rakhne chahiye?',
    answer: 'Port 21: FTP | Port 22: SSH | Port 23: Telnet | Port 25: SMTP | Port 53: DNS | Port 80: HTTP | Port 443: HTTPS | Port 3389: RDP | Port 445: SMB.',
    answer_hi: 'Port 21: File Transfer | Port 22: Secure Shell (SSH) | Port 53: DNS | Port 80: Web HTTP | Port 443: Secure HTTPS | Port 3389: Windows Remote Desktop.',
    tip: 'Telnet (Port 23) and FTP (Port 21) transmit passwords in clear text; always replace with SSH and SFTP.'
  },
  {
    id: 'rev-14',
    category: 'Passwords & Identity',
    domain: 'core-cyber',
    question: 'What is Hashing and why are Salting and Bcrypt used for passwords?',
    question_hi: 'Hashing kya hai aur password ke liye Salt kyu lagaya jata hai?',
    answer: 'Hashing is a one-way mathematical function (you cannot decrypt a hash). Salting adds random characters to each password before hashing, which completely stops attackers from using precomputed Rainbow Tables.',
    answer_hi: 'Hashing ek taraf ka math function hai jisse password ko code me badla jata hai. Salt matlab password me random number jodna taaki hacker Rainbow Tables se password na dhoond sake.',
    tip: 'Never use MD5 or SHA1 for storing passwords. Use slow adaptive algorithms like Bcrypt, Argon2, or PBKDF2.'
  },
  {
    id: 'rev-15',
    category: 'Cloud Security',
    domain: 'core-cyber',
    question: 'What is the Cloud Shared Responsibility Model?',
    question_hi: 'Cloud me Shared Responsibility Model kya hota hai?',
    answer: 'The cloud provider (AWS/Azure) is responsible for the security OF the cloud (physical servers, data centers, hypervisors). You (the customer) are responsible for security IN the cloud (passwords, IAM roles, firewalls, and data encryption).',
    answer_hi: 'Amazon ya Microsoft physical hardware ki security dekhte hain, lekin password, firewall rules, aur user permissions ki zimmedari customer ki hoti hai.',
    tip: 'Over 95% of cloud breaches happen due to misconfigured S3 buckets and overly permissive IAM roles.'
  }
];

export function renderRevisionDeck(container) {
  let activeTab = 'all';
  let viewMode = 'flashcards'; // 'flashcards', 'list'
  let currentCardIndex = 0;
  let isCardFlipped = false;
  let searchQuery = '';

  function render() {
    const isHinglish = i18n.getLanguage() === 'hinglish';
    const bookmarkedCards = DefenseStorage.getRevisionCards();

    let combinedCards = [...CORE_TACTICAL_CARDS];
    bookmarkedCards.forEach(bc => {
      if (!combinedCards.find(c => c.id === bc.id)) {
        combinedCards.push(bc);
      }
    });

    const filteredCards = combinedCards.filter(c => {
      const matchTab = activeTab === 'all' || 
        (activeTab === 'bookmarks' && DefenseStorage.isQuestionInRevision(c.id)) ||
        c.category.toLowerCase().includes(activeTab.toLowerCase()) ||
        (c.domain && c.domain.toLowerCase().includes(activeTab.toLowerCase()));
      
      const q = searchQuery.toLowerCase();
      const matchSearch = !searchQuery || 
        c.question.toLowerCase().includes(q) ||
        (c.question_hi && c.question_hi.toLowerCase().includes(q)) ||
        c.answer.toLowerCase().includes(q) ||
        (c.answer_hi && c.answer_hi.toLowerCase().includes(q));

      return matchTab && matchSearch;
    });

    if (currentCardIndex >= filteredCards.length) {
      currentCardIndex = 0;
    }

    container.innerHTML = `
      <div class="revision-viewport">
        <!-- Header -->
        <div class="card-tactical" style="background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%); border-left: 4px solid var(--amber-glow); margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <div>
              <span class="tag-pill" style="margin-bottom: 8px;">
                ${isHinglish ? 'REVISION DECK // YAAD RAKHNE KE LIYE' : 'REVISION DECK // HIGH-YIELD MEMORY CARDS'}
              </span>
              <h2 style="font-size: 24px; color: var(--text-bright); margin-bottom: 6px;">
                ${isHinglish ? 'Cyber Security Revision Flashcards' : 'Cyber Security Revision Deck'}
              </h2>
              <p style="color: var(--text-muted); font-size: 14px; max-width: 650px;">
                ${isHinglish 
                  ? 'Aasan shabdo me flashcards taaki aap sabhi zaroori formulas, ports aur cyber defense concepts ko aasani se yaad rakh sakein.' 
                  : 'Quick-reference flashcards and key takeaways in simple plain language for rapid review, exam preparation, and interview readiness.'}
              </p>
            </div>

            <!-- View Mode Switcher -->
            <div style="display: flex; gap: 8px; align-items: center;">
              <button class="btn ${viewMode === 'flashcards' ? 'btn-cyan' : 'btn-outline'} btn-sm" id="btn-mode-flashcards">
                🎴 ${isHinglish ? 'Flashcard Flip Mode' : 'Flashcard Mode'}
              </button>
              <button class="btn ${viewMode === 'list' ? 'btn-cyan' : 'btn-outline'} btn-sm" id="btn-mode-list">
                📋 ${isHinglish ? 'List View' : 'List View'}
              </button>
            </div>
          </div>
        </div>

        <!-- Filter & Search Toolbar -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
          <div class="domain-filter-bar" style="margin-bottom: 0; display: flex; gap: 6px; flex-wrap: wrap;">
            <span class="filter-pill ${activeTab === 'all' ? 'active' : ''}" data-tab="all">
              ${isHinglish ? 'Sabhi Cards' : 'All Cards'} (${combinedCards.length})
            </span>
            <span class="filter-pill ${activeTab === 'bookmarks' ? 'active' : ''}" data-tab="bookmarks">
              ★ ${isHinglish ? 'Saved Q&As' : 'Saved Bookmarks'} (${bookmarkedCards.length})
            </span>
            <span class="filter-pill ${activeTab === 'core' ? 'active' : ''}" data-tab="core">
              Basics & CIA
            </span>
            <span class="filter-pill ${activeTab === 'networking' ? 'active' : ''}" data-tab="networking">
              Networking
            </span>
            <span class="filter-pill ${activeTab === 'web' ? 'active' : ''}" data-tab="web">
              Web & Hacking
            </span>
            <span class="filter-pill ${activeTab === 'defense' ? 'active' : ''}" data-tab="defense">
              Defense & Law
            </span>
          </div>

          <div>
            <input 
              type="text" 
              class="search-input" 
              id="revision-search-input" 
              placeholder="${isHinglish ? 'Flashcards search karein...' : 'Search flashcards...'}" 
              value="${escapeHtml(searchQuery)}" 
              style="width: 240px;" 
            />
          </div>
        </div>

        <!-- Mode Content -->
        ${viewMode === 'flashcards' 
          ? renderFlashcardMode(filteredCards, isHinglish) 
          : renderListMode(filteredCards, isHinglish)}
      </div>
    `;

    setupEvents(filteredCards);
  }

  function renderFlashcardMode(cards, isHinglish) {
    if (cards.length === 0) {
      return `
        <div class="card-tactical" style="text-align: center; padding: 40px;">
          <p style="color: var(--text-dim);">${isHinglish ? 'Koi flashcard nahi mila.' : 'No flashcards match the criteria.'}</p>
        </div>
      `;
    }

    const currentCard = cards[currentCardIndex];
    const isBookmarked = DefenseStorage.isQuestionInRevision(currentCard.id);
    const questionText = isHinglish ? (currentCard.question_hi || currentCard.question) : currentCard.question;
    const answerText = isHinglish ? (currentCard.answer_hi || currentCard.answer) : currentCard.answer;

    return `
      <div style="max-width: 680px; margin: 0 auto;">
        <!-- Card Container with 3D Flip effect -->
        <div 
          id="active-flashcard" 
          class="card-tactical" 
          style="min-height: 280px; padding: 32px; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; border: 2px solid ${isCardFlipped ? 'var(--cyan-glow)' : 'var(--border-subtle)'}; background: ${isCardFlipped ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)'}; transition: all 0.25s ease;"
        >
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <span class="tag-pill">${currentCard.category}</span>
              <div style="display: flex; gap: 8px; align-items: center;">
                <button class="btn-sound-toggle btn-flashcard-star" data-id="${currentCard.id}" title="Bookmark" style="color: ${isBookmarked ? 'var(--amber-glow)' : 'var(--text-dim)'};">
                  ${isBookmarked ? '★ Saved' : '☆ Save'}
                </button>
                <span style="font-size: 12px; color: var(--text-dim);">
                  Card ${currentCardIndex + 1} of ${cards.length}
                </span>
              </div>
            </div>

            <!-- Front or Back content -->
            ${!isCardFlipped ? `
              <div style="margin: 24px 0;">
                <div style="font-size: 12px; color: var(--cyan-glow); font-weight: 700; text-transform: uppercase; margin-bottom: 8px;">
                  ${isHinglish ? 'SAWAAL (QUESTION):' : 'QUESTION:'}
                </div>
                <h3 style="font-size: 20px; color: var(--text-bright); line-height: 1.4;">
                  ${questionText}
                </h3>
              </div>
            ` : `
              <div style="margin: 20px 0;">
                <div style="font-size: 12px; color: var(--emerald-glow); font-weight: 700; text-transform: uppercase; margin-bottom: 8px;">
                  ${isHinglish ? 'JAWAB (ANSWER):' : 'ANSWER:'}
                </div>
                <div style="font-size: 15.5px; color: var(--text-bright); line-height: 1.6; white-space: pre-line; margin-bottom: 14px;">
                  ${answerText}
                </div>
                ${currentCard.tip ? `
                  <div style="font-size: 13px; color: var(--gold-crest); background: rgba(245,158,11,0.1); border-left: 3px solid var(--gold-crest); padding: 8px 12px; border-radius: var(--radius-sm);">
                    <strong>⚡ Tip:</strong> ${currentCard.tip}
                  </div>
                ` : ''}
              </div>
            `}
          </div>

          <div style="border-top: 1px dashed var(--border-subtle); padding-top: 14px; display: flex; justify-content: space-between; align-items: center; font-size: 12.5px; color: var(--text-dim);">
            <span>👆 ${isCardFlipped ? (isHinglish ? 'Sawaal dekhne ke liye click karein' : 'Click to flip back to question') : (isHinglish ? 'Jawab dekhne ke liye click karein' : 'Click card to reveal answer')}</span>
            <span>SPACEBAR / CLICK</span>
          </div>
        </div>

        <!-- Navigation Controls -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
          <button class="btn btn-outline btn-sm" id="btn-prev-card" ${currentCardIndex === 0 ? 'disabled style="opacity: 0.5; pointer-events: none;"' : ''}>
            ← Previous Card
          </button>
          
          <button class="btn btn-cyan btn-sm" id="btn-flip-card">
            🔄 ${isCardFlipped ? (isHinglish ? 'Sawaal Dekhein' : 'Show Question') : (isHinglish ? 'Jawab Dekhein' : 'Show Answer')}
          </button>

          <button class="btn btn-outline btn-sm" id="btn-next-card" ${currentCardIndex === cards.length - 1 ? 'disabled style="opacity: 0.5; pointer-events: none;"' : ''}>
            Next Card →
          </button>
        </div>
      </div>
    `;
  }

  function renderListMode(cards, isHinglish) {
    return `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px;">
        ${cards.map((c, idx) => {
          const isBookmarked = DefenseStorage.isQuestionInRevision(c.id);
          const questionText = isHinglish ? (c.question_hi || c.question) : c.question;
          const answerText = isHinglish ? (c.answer_hi || c.answer) : c.answer;

          return `
            <div class="card-tactical" style="margin-bottom: 0; padding: 18px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                  <span class="tag-pill" style="font-size: 10px;">${c.category}</span>
                  <button class="btn-sound-toggle btn-flashcard-star" data-id="${c.id}" style="color: ${isBookmarked ? 'var(--amber-glow)' : 'var(--text-dim)'}; padding: 2px 6px;">
                    ${isBookmarked ? '★' : '☆'}
                  </button>
                </div>
                <h4 style="font-size: 15px; color: var(--text-bright); margin-bottom: 8px; line-height: 1.3;">
                  ${questionText}
                </h4>
                <p style="font-size: 13.5px; color: var(--text-muted); line-height: 1.5; white-space: pre-line; margin-bottom: 10px;">
                  ${answerText}
                </p>
              </div>
              ${c.tip ? `
                <div style="font-size: 12px; color: var(--gold-crest); border-top: 1px solid var(--border-subtle); padding-top: 8px; margin-top: 8px;">
                  <strong>⚡ Tip:</strong> ${c.tip}
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function setupEvents(cards) {
    // Mode toggles
    container.querySelector('#btn-mode-flashcards')?.addEventListener('click', () => {
      cyberAudio.playClick();
      viewMode = 'flashcards';
      render();
    });

    container.querySelector('#btn-mode-list')?.addEventListener('click', () => {
      cyberAudio.playClick();
      viewMode = 'list';
      render();
    });

    // Category pills
    container.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        cyberAudio.playClick();
        activeTab = pill.getAttribute('data-tab');
        currentCardIndex = 0;
        isCardFlipped = false;
        render();
      });
    });

    // Search input
    const searchInput = container.querySelector('#revision-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        currentCardIndex = 0;
        isCardFlipped = false;
        render();
        const reInput = container.querySelector('#revision-search-input');
        if (reInput) {
          reInput.focus();
          reInput.selectionStart = reInput.selectionEnd = reInput.value.length;
        }
      });
    }

    // Flashcard Flip & Next/Prev
    const activeCard = container.querySelector('#active-flashcard');
    if (activeCard) {
      activeCard.addEventListener('click', (e) => {
        if (e.target.closest('.btn-flashcard-star')) return;
        cyberAudio.playClick();
        isCardFlipped = !isCardFlipped;
        render();
      });
    }

    container.querySelector('#btn-flip-card')?.addEventListener('click', () => {
      cyberAudio.playClick();
      isCardFlipped = !isCardFlipped;
      render();
    });

    container.querySelector('#btn-prev-card')?.addEventListener('click', () => {
      if (currentCardIndex > 0) {
        cyberAudio.playClick();
        currentCardIndex--;
        isCardFlipped = false;
        render();
      }
    });

    container.querySelector('#btn-next-card')?.addEventListener('click', () => {
      if (currentCardIndex < cards.length - 1) {
        cyberAudio.playClick();
        currentCardIndex++;
        isCardFlipped = false;
        render();
      }
    });

    // Star/Bookmark toggle
    container.querySelectorAll('.btn-flashcard-star').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        cyberAudio.playClick();
        const id = btn.getAttribute('data-id');
        const targetCard = cards.find(c => c.id === id);
        if (targetCard) {
          DefenseStorage.toggleRevisionQuestion(targetCard);
          render();
        }
      });
    });
  }

  render();

  // Listen for language change
  window.addEventListener('cyber_language_changed', () => {
    render();
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
