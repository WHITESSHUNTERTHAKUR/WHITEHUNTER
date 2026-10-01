import './styles/main.css';
import './styles/components.css';
import './styles/printable.css';

import { renderCurriculumGrid } from './modules/curriculumGrid.js';
import { renderTopicView } from './modules/topicView.js';
import { renderBookshelf } from './modules/bookshelf.js';
import { renderThreatNews } from './modules/threatNews.js';
import { renderTools } from './modules/tools.js';
import { renderTacticalLabs } from './modules/tacticalLabs.js';
import { renderHelpCenter } from './modules/helpCenter.js';
import { renderLearnCommands } from './modules/learnCommands.js';
import { renderLearningVideos } from './modules/learningVideos.js';
import { renderReadMagazine } from './modules/readMagazine.js';
import { DefenseStorage } from './utils/storage.js';
import { cyberAudio } from './modules/audio.js';
import { i18n } from './utils/i18n.js';

// Application state
let currentRoute = 'curriculum';
let currentTopicId = null;
let currentPhase = 1;

function initApp() {
  setupTheme();
  setupLanguage();
  setupSidebarNavigation();
  setupGlobalSearch();
  setupAudioControl();
  updateSidebarProfile();

  // Listen to hash changes
  window.addEventListener('hashchange', handleRoute);
  
  // Listen for language switch
  window.addEventListener('cyber_language_changed', () => {
    updateLanguageUI();
    handleRoute();
  });

  // Initial route handling
  if (!window.location.hash) {
    window.location.hash = '#curriculum';
  } else {
    handleRoute();
  }
}

// ----------------------------------------------------
// THEME SWITCHER (Dark & Light Mode)
// ----------------------------------------------------
function setupTheme() {
  const savedTheme = localStorage.getItem('cyberops_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeButtonUI(savedTheme);

  const themeBtn = document.getElementById('btn-theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      cyberAudio.playClick();
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('cyberops_theme', nextTheme);
      updateThemeButtonUI(nextTheme);
    });
  }
}

function updateThemeButtonUI(theme) {
  const iconEl = document.getElementById('theme-btn-icon');
  const textEl = document.getElementById('theme-btn-text');
  if (iconEl && textEl) {
    if (theme === 'light') {
      iconEl.innerText = '☀️';
      textEl.innerText = 'Light';
    } else {
      iconEl.innerText = '🌙';
      textEl.innerText = 'Dark';
    }
  }
}

// ----------------------------------------------------
// BILINGUAL LANGUAGE CONTROLLER (Simple English & Hinglish)
// ----------------------------------------------------
function setupLanguage() {
  const langBtn = document.getElementById('btn-lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      cyberAudio.playClick();
      i18n.toggleLanguage();
    });
  }
  updateLanguageUI();
}

function updateLanguageUI() {
  const lang = i18n.getLanguage();
  const langBtnText = document.getElementById('lang-btn-text');
  if (langBtnText) {
    langBtnText.innerText = lang === 'hinglish' ? '🇬🇧 English' : '🇮🇳 Hinglish';
  }

  // Update sidebar branding & labels
  const isHinglish = lang === 'hinglish';
  const brandTitle = document.getElementById('brand-title');
  const brandSub = document.getElementById('brand-subtitle');
  const brandMotto = document.getElementById('brand-motto');
  const labelLearning = document.getElementById('label-learning-path');
  const labelResources = document.getElementById('label-resources');
  const labelTools = document.getElementById('label-tools');
  const defconText = document.getElementById('defcon-status-text');

  if (brandTitle) brandTitle.innerText = 'CYBER WARRIORS';
  if (brandSub) brandSub.innerText = isHinglish ? 'LEARNING ACADEMY' : 'LEARNING ACADEMY';
  if (brandMotto) brandMotto.innerText = isHinglish ? 'SEEKHO • DEFEND KARO • MASTER BANO' : 'LEARN • DEFEND • MASTER';
  if (labelLearning) labelLearning.innerText = isHinglish ? 'PADHAI MODULES' : 'LEARNING MODULES';
  if (labelResources) labelResources.innerText = isHinglish ? 'RESOURCES & KITABEIN' : 'RESOURCES & INTEL';
  if (labelTools) labelTools.innerText = isHinglish ? 'TOOLS AUR MADAD' : 'UTILITIES & SUPPORT';
  if (defconText) defconText.innerText = isHinglish ? 'SURAKSHIT // SHIELD ACTIVE' : 'SHIELD ACTIVE';

  // Navigation Items Text
  const navCurriculum = document.getElementById('nav-text-curriculum');
  const navLabs = document.getElementById('nav-text-labs');
  const navCommands = document.getElementById('nav-text-commands');
  const navVideos = document.getElementById('nav-text-videos');
  const navBookshelf = document.getElementById('nav-text-bookshelf');
  const navMagazines = document.getElementById('nav-text-magazines');
  const navNews = document.getElementById('nav-text-news');
  const navTools = document.getElementById('nav-text-tools');
  const navHelp = document.getElementById('nav-text-help');

  if (navCurriculum) navCurriculum.innerText = isHinglish ? 'Cyber Curriculum (Course)' : 'Cyber Curriculum';
  if (navLabs) navLabs.innerText = isHinglish ? 'Cyber Defense Labs' : 'Cyber Defense Labs';
  if (navCommands) navCommands.innerText = isHinglish ? 'Learn Commands (Commands Seekho)' : 'Learn Commands';
  if (navVideos) navVideos.innerText = isHinglish ? 'Learning Videos & Docs' : 'Learning Videos';
  if (navBookshelf) navBookshelf.innerText = isHinglish ? 'Technical Library (200+ Kitabein)' : 'Technical Library (200+ Books)';
  if (navMagazines) navMagazines.innerText = isHinglish ? 'Read Magazines (50+ Patrika)' : 'Read Magazines';
  if (navNews) navNews.innerText = isHinglish ? 'News/Update (Khabarein)' : 'News/Update';
  if (navTools) navTools.innerText = isHinglish ? 'Security Toolkit' : 'Security Toolkit';
  if (navHelp) navHelp.innerText = isHinglish ? 'Help Center (Madad)' : 'Help Center & Guide';
}

// ----------------------------------------------------
// ROUTER & NAVIGATION
// ----------------------------------------------------
function handleRoute() {
  const hash = window.location.hash || '#curriculum';
  const viewport = document.getElementById('main-viewport');
  const breadcrumb = document.getElementById('topbar-active-breadcrumb');
  const isHinglish = i18n.getLanguage() === 'hinglish';

  // Parse route: #topic/t01-osi-tcpip/2
  if (hash.startsWith('#topic/')) {
    const parts = hash.replace('#topic/', '').split('/');
    currentRoute = 'topic';
    currentTopicId = parts[0];
    currentPhase = parseInt(parts[1], 10) || 1;

    updateActiveNavItem('nav-curriculum');
    if (breadcrumb) breadcrumb.innerText = 'TOPIC // ' + currentTopicId.toUpperCase();
    
    renderTopicView(currentTopicId, currentPhase, viewport, (tId, pNum) => {
      window.location.hash = `#topic/${tId}/${pNum}`;
    });
    return;
  }

  // Standard routes
  const route = hash.replace('#', '') || 'curriculum';
  currentRoute = route;

  // Update sidebar active states
  updateActiveNavItem(`nav-${route}`);

  switch (route) {
    case 'curriculum':
      if (breadcrumb) breadcrumb.innerText = isHinglish ? 'CYBER SECURITY COURSE // 52 TOPICS' : 'CYBER SECURITY CURRICULUM // 52 TOPICS';
      renderCurriculumGrid(viewport, (topicId, phaseNum) => {
        window.location.hash = `#topic/${topicId}/${phaseNum}`;
      });
      break;

    case 'labs':
      if (breadcrumb) breadcrumb.innerText = isHinglish ? 'CYBER DEFENSE RANGE // 100+ PRACTICAL LABS' : 'CYBER DEFENSE RANGE // 100+ PRACTICAL LABS';
      renderTacticalLabs(viewport);
      break;

    case 'commands':
      if (breadcrumb) breadcrumb.innerText = isHinglish ? 'LEARN COMMANDS // 150+ TERMINAL CHEAT SHEET' : 'LEARN COMMANDS // 150+ TERMINAL CHEAT SHEET';
      renderLearnCommands(viewport);
      break;

    case 'videos':
      if (breadcrumb) breadcrumb.innerText = isHinglish ? 'LEARNING VIDEOS & ARTICLES // YOUTUBE & DOCS' : 'LEARNING VIDEOS & ARTICLES // YOUTUBE & DOCS';
      renderLearningVideos(viewport);
      break;

    case 'bookshelf':
      if (breadcrumb) breadcrumb.innerText = isHinglish ? 'TECHNICAL LIBRARY // 200+ CYBER KITABEIN' : 'TECHNICAL LIBRARY // 200+ CYBER BOOKS';
      renderBookshelf(viewport);
      break;

    case 'magazines':
      if (breadcrumb) breadcrumb.innerText = isHinglish ? 'READ MAGAZINES // 50+ PDF CYBER PATRIKA' : 'READ MAGAZINES // 50+ CYBER MAGAZINES & PDFS';
      renderReadMagazine(viewport);
      break;

    case 'news':
      if (breadcrumb) breadcrumb.innerText = isHinglish ? 'NEWS/UPDATE // LIVE CYBER KHABAREIN' : 'NEWS/UPDATE // OFFICIAL LIVE SECURITY ADVISORIES';
      renderThreatNews(viewport);
      break;

    case 'tools':
      if (breadcrumb) breadcrumb.innerText = isHinglish ? 'SECURITY TOOLKIT // CIPHER & PROTOCOL TOOLS' : 'SECURITY TOOLKIT // CIPHER & PROTOCOL TOOLS';
      renderTools(viewport);
      break;

    case 'help':
      if (breadcrumb) breadcrumb.innerText = isHinglish ? 'HELP CENTER // GUIDE, FAQS & DICTIONARY' : 'HELP CENTER // GUIDE, FAQS & DICTIONARY';
      renderHelpCenter(viewport);
      break;

    default:
      window.location.hash = '#curriculum';
      break;
  }
}

function updateActiveNavItem(navId) {
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(el => el.classList.remove('active'));
  const activeEl = document.getElementById(navId);
  if (activeEl) activeEl.classList.add('active');
}

function setupSidebarNavigation() {
  document.getElementById('nav-curriculum')?.addEventListener('click', () => {
    cyberAudio.playClick();
    window.location.hash = '#curriculum';
  });

  document.getElementById('nav-labs')?.addEventListener('click', () => {
    cyberAudio.playClick();
    window.location.hash = '#labs';
  });

  document.getElementById('nav-commands')?.addEventListener('click', () => {
    cyberAudio.playClick();
    window.location.hash = '#commands';
  });

  document.getElementById('nav-videos')?.addEventListener('click', () => {
    cyberAudio.playClick();
    window.location.hash = '#videos';
  });

  document.getElementById('nav-bookshelf')?.addEventListener('click', () => {
    cyberAudio.playClick();
    window.location.hash = '#bookshelf';
  });

  document.getElementById('nav-magazines')?.addEventListener('click', () => {
    cyberAudio.playClick();
    window.location.hash = '#magazines';
  });

  document.getElementById('nav-news')?.addEventListener('click', () => {
    cyberAudio.playClick();
    window.location.hash = '#news';
  });

  document.getElementById('nav-tools')?.addEventListener('click', () => {
    cyberAudio.playClick();
    window.location.hash = '#tools';
  });

  document.getElementById('nav-help')?.addEventListener('click', () => {
    cyberAudio.playClick();
    window.location.hash = '#help';
  });
}




function setupGlobalSearch() {
  const searchInput = document.getElementById('global-search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const val = e.target.value;
    if (currentRoute !== 'curriculum') {
      window.location.hash = '#curriculum';
    }
    if (typeof window.setCurriculumSearch === 'function') {
      window.setCurriculumSearch(val);
    }
  });

  // Ctrl+K shortcut
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
  });
}

function setupAudioControl() {
  const soundBtn = document.getElementById('btn-global-sound');
  if (!soundBtn) return;

  function updateSoundIcon() {
    const muted = cyberAudio.isMuted();
    soundBtn.innerHTML = muted ? '🔇' : '🔊';
    soundBtn.title = muted ? 'Sound Muted' : 'Sound Enabled';
  }

  soundBtn.addEventListener('click', () => {
    cyberAudio.toggleMute();
    updateSoundIcon();
  });

  updateSoundIcon();
}

function updateSidebarProfile() {
  const profile = DefenseStorage.getUserProfile();
  const nameEl = document.getElementById('sidebar-user-name');
  const rankEl = document.getElementById('sidebar-user-rank');
  if (nameEl) nameEl.innerText = profile.name || 'Cyber Specialist';
  if (rankEl) rankEl.innerText = profile.rank || 'Security Analyst';
}

// Boot application
window.addEventListener('DOMContentLoaded', initApp);
