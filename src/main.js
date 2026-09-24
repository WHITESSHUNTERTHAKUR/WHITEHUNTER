import './styles/main.css';
import './styles/components.css';
import './styles/printable.css';

import { renderCurriculumGrid } from './modules/curriculumGrid.js';
import { renderTopicView } from './modules/topicView.js';
import { renderBookshelf } from './modules/bookshelf.js';
import { renderThreatNews } from './modules/threatNews.js';
import { renderRevisionDeck } from './modules/revisionDeck.js';
import { renderTools } from './modules/tools.js';
import { renderProfileDashboard } from './modules/profileDashboard.js';
import { DefenseStorage } from './utils/storage.js';
import { cyberAudio } from './modules/audio.js';

// Application state
let currentRoute = 'curriculum';
let currentTopicId = null;
let currentPhase = 1;

function initApp() {
  setupSidebarNavigation();
  setupGlobalSearch();
  setupAudioControl();
  updateSidebarProfile();

  // Listen to hash changes
  window.addEventListener('hashchange', handleRoute);
  
  // Initial route handling
  if (!window.location.hash) {
    window.location.hash = '#curriculum';
  } else {
    handleRoute();
  }
}

function handleRoute() {
  const hash = window.location.hash || '#curriculum';
  const viewport = document.getElementById('main-viewport');
  const breadcrumb = document.getElementById('topbar-active-breadcrumb');

  // Parse route: #topic/t01-osi-tcpip/2
  if (hash.startsWith('#topic/')) {
    const parts = hash.replace('#topic/', '').split('/');
    currentRoute = 'topic';
    currentTopicId = parts[0];
    currentPhase = parseInt(parts[1], 10) || 1;

    updateActiveNavItem('nav-curriculum');
    if (breadcrumb) breadcrumb.innerText = 'MISSION TOPIC // ' + currentTopicId.toUpperCase();
    
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
      if (breadcrumb) breadcrumb.innerText = 'TACTICAL CURRICULUM // 52 MISSION TOPICS';
      renderCurriculumGrid(viewport, (topicId, phaseNum) => {
        window.location.hash = `#topic/${topicId}/${phaseNum}`;
      });
      break;

    case 'bookshelf':
      if (breadcrumb) breadcrumb.innerText = 'KNOWLEDGE BOOKS // CYBER & DEFENSE LIBRARY';
      renderBookshelf(viewport);
      break;

    case 'news':
      if (breadcrumb) breadcrumb.innerText = 'CYBER THREAT RADAR // INDIA & GLOBAL INTELLIGENCE';
      renderThreatNews(viewport);
      break;

    case 'revision':
      if (breadcrumb) breadcrumb.innerText = 'TACTICAL REVISION DECK & SAVED QUESTIONS';
      renderRevisionDeck(viewport);
      break;

    case 'tools':
      if (breadcrumb) breadcrumb.innerText = 'FIELD ENGINEERING TOOLKIT & CALCULATORS';
      renderTools(viewport);
      break;

    case 'profile':
      if (breadcrumb) breadcrumb.innerText = 'CANDIDATE DOSSIER & FLIGHT LOG';
      renderProfileDashboard(viewport, (topicId, phaseNum) => {
        window.location.hash = `#topic/${topicId}/${phaseNum}`;
      });
      break;

    default:
      window.location.hash = '#curriculum';
      break;
  }
}

function updateActiveNavItem(navId) {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const activeEl = document.getElementById(navId);
  if (activeEl) activeEl.classList.add('active');
}

function setupSidebarNavigation() {
  document.getElementById('nav-curriculum')?.addEventListener('click', () => {
    cyberAudio.playClick();
    window.location.hash = '#curriculum';
  });

  document.getElementById('nav-bookshelf')?.addEventListener('click', () => {
    cyberAudio.playClick();
    window.location.hash = '#bookshelf';
  });

  document.getElementById('nav-news')?.addEventListener('click', () => {
    cyberAudio.playClick();
    window.location.hash = '#news';
  });

  document.getElementById('nav-revision')?.addEventListener('click', () => {
    cyberAudio.playClick();
    window.location.hash = '#revision';
  });

  document.getElementById('nav-tools')?.addEventListener('click', () => {
    cyberAudio.playClick();
    window.location.hash = '#tools';
  });

  document.getElementById('nav-profile')?.addEventListener('click', () => {
    cyberAudio.playClick();
    window.location.hash = '#profile';
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
    soundBtn.title = muted ? 'Sound Muted (Click to Enable)' : 'Sound Enabled (Click to Mute)';
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
  if (nameEl) nameEl.innerText = profile.name;
  if (rankEl) rankEl.innerText = profile.rank;
}

// Boot application
window.addEventListener('DOMContentLoaded', initApp);
