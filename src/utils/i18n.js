// Bilingual Support: Simple English & Hinglish
// Cyber Warriors Learning Academy Internationalization Engine

const STORAGE_KEY = 'cyberops_app_language';

const TRANSLATIONS = {
  en: {
    // Navigation
    navCurriculum: 'Cyber Curriculum',
    navLabs: 'Cyber Defense Labs',
    navCommands: 'Learn Commands',
    navVideos: 'Learning Videos',
    navBookshelf: 'Technical Library',
    navMagazines: 'Read Magazines',
    navNews: 'Threat Intel Radar',
    navTools: 'Security Toolkit',
    navHelp: 'Help Center',
    
    // Topbar
    appTitle: 'CYBER WARRIORS LEARNING ACADEMY',
    appSubtitle: 'CYBER SECURITY & ETHICAL HACKING TRAINER',
    defconStatus: 'SHIELD ACTIVE // SECURE',
    searchPlaceholder: 'Search topics, books, CVEs, commands... (Ctrl+K)',
    themeLight: '☀️ Light',
    themeDark: '🌙 Dark',
    langToggle: '🇮🇳 Hinglish',
    
    // Sections
    curriculumTitle: 'Cyber Security Curriculum',
    curriculumSubtitle: '52 Complete Topics with Simple Explanations, Q&A, and Quizzes',
    curriculumSearch: 'Search topics by name, concept or category...',
    allDomains: 'All Topics',
    
    // Phases
    phase1Title: 'PHASE 1: Theory & Concepts (Simple Language)',
    phase2Title: 'PHASE 2: Important Questions & Answers',
    phase3Title: 'PHASE 3: Knowledge Quiz Test',
    listenBriefing: 'Listen Audio',
    stopAudio: 'Stop Audio',
    phase1Done: 'Phase 1 Completed',
    readyForPhase2: 'Ready for Questions & Answers?',
    proceedPhase2: 'Proceed to Phase 2: Q&A →',
    proceedPhase3: 'Proceed to Phase 3: Quiz →',
    proceedPhase1: '← Back to Phase 1: Theory',
    
    // Practical Videos & Exam Notes
    videosTitle: 'Live Practical Video Training Labs',
    videosSubtitle: '110+ Offline practical video demonstrations across Hardware/Software, Networking, Forensics, Cyber Defence, and Ethical Hacking.',
    notesTitle: 'Cyber Security Exam Short Notes',
    notesSubtitle: 'High-yield exam revision notes in crisp bullet points across all curriculum topics.',
    
    // Technical Library
    libraryTitle: 'Technical Library: 100+ Cyber Books',
    librarySubtitle: 'Comprehensive collection of 100+ cybersecurity books, field guides, and manuals written in simple language.',
    searchBooks: 'Search books by title, author, or keyword...',
    readBook: 'Read Book',
    allBooks: 'All Books',
    chaptersCount: 'Chapters',
    
    // Help Center
    helpTitle: 'Help Center & Knowledge Guide',
    helpSubtitle: 'Learn how to use this app, master cyber security concepts, and explore FAQs.',
    faqTitle: 'Frequently Asked Questions (FAQ)',
    glossaryTitle: 'Cyber Security Dictionary (A to Z)',
    shortcutsTitle: 'Keyboard Shortcuts',
  },
  
  hinglish: {
    // Navigation
    navCurriculum: 'Cyber Curriculum (Course)',
    navLabs: 'Cyber Defense Labs (Practical)',
    navCommands: 'Learn Commands (Commands Seekho)',
    navVideos: 'Learning Videos (Videos & Docs)',
    navBookshelf: 'Technical Library (Kitabein)',
    navMagazines: 'Read Magazines (50+ Patrika)',
    navNews: 'Threat Intel Radar (Cyber Khabarein)',
    navTools: 'Security Toolkit (Tools)',
    navHelp: 'Help Center (Madad Kendra)',
    
    // Topbar
    appTitle: 'CYBER WARRIORS LEARNING ACADEMY',
    appSubtitle: 'AASAN CYBER SECURITY & ETHICAL HACKING TRAINER',
    defconStatus: 'DEFENSE STATUS // SURAKSHIT',
    searchPlaceholder: 'Topics, kitabein, commands search karein... (Ctrl+K)',
    themeLight: '☀️ Light Mode',
    themeDark: '🌙 Dark Mode',
    langToggle: '🇬🇧 English',
    
    // Sections
    curriculumTitle: 'Cyber Security Curriculum (Course)',
    curriculumSubtitle: '52 Topics bilkul aasan bhasha me - Theory, Zaroori Sawaal aur Quiz ke saath',
    curriculumSearch: 'Kisi bhi topic ya concept ko dhoondein...',
    allDomains: 'Sabhi Topics',
    
    // Phases
    phase1Title: 'PHASE 1: Theory & Concepts (Aasan Bhasha Me)',
    phase2Title: 'PHASE 2: Zaroori Sawaal & Jawab (Q&A)',
    phase3Title: 'PHASE 3: Knowledge Quiz Test',
    listenBriefing: 'Audio Sunein',
    stopAudio: 'Audio Rokein',
    phase1Done: 'Phase 1 Pura Ho Gaya',
    readyForPhase2: 'Kya aap Sawaal & Jawab ke liye taiyar hain?',
    proceedPhase2: 'Phase 2 par jayein: Q&A →',
    proceedPhase3: 'Phase 3 par jayein: Quiz →',
    proceedPhase1: '← Wapas Phase 1: Theory par jayein',
    
    // Practical Videos & Exam Notes
    videosTitle: 'Live Practical Video Training Labs',
    videosSubtitle: '110+ Offline practical video demonstrations across Hardware/Software, Networking, Forensics, Cyber Defence, aur Ethical Hacking.',
    notesTitle: 'Cyber Security Exam Short Notes (Bullet Points)',
    notesSubtitle: 'Sabhi topics ke high-yield short notes bullet points me exams ki taiyari ke liye.',
    
    // Technical Library
    libraryTitle: 'Technical Library: 100+ Cyber Kitabein',
    librarySubtitle: '100 se zyada curated cybersecurity kitabein aur guides jo bilkul aasan bhasha me samjhayi gayi hain.',
    searchBooks: 'Kitab ka naam, author ya topic search karein...',
    readBook: 'Kitab Padhein',
    allBooks: 'Sabhi Kitabein',
    chaptersCount: 'Chapters',
    
    // Help Center
    helpTitle: 'Help Center & Guide (Madad Kendra)',
    helpSubtitle: 'Is application ko kaise use karein, cyber security terms ka aasan matlab aur zaroori sawaal-jawab.',
    faqTitle: 'Aksar Pooche Jaane Wale Sawaal (FAQ)',
    glossaryTitle: 'Cyber Security Shabdkosh (Dictionary)',
    shortcutsTitle: 'Keyboard Shortcuts',
  }
};

let currentLang = localStorage.getItem(STORAGE_KEY) || 'en';

export const i18n = {
  getLanguage() {
    return currentLang;
  },

  setLanguage(lang) {
    if (lang !== 'en' && lang !== 'hinglish') return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    window.dispatchEvent(new CustomEvent('cyber_language_changed', { detail: { lang } }));
  },

  toggleLanguage() {
    const nextLang = currentLang === 'en' ? 'hinglish' : 'en';
    this.setLanguage(nextLang);
    return nextLang;
  },

  t(key) {
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  },

  getText(field) {
    if (!field) return '';
    if (typeof field === 'string') return field;
    if (typeof field === 'object') {
      if (currentLang === 'hinglish' && field.hi) return field.hi;
      return field.en || field.hi || '';
    }
    return String(field);
  }
};
