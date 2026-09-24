import { BOOKS_DATA } from '../data/booksData.js';
import { cyberAudio } from './audio.js';

export function renderBookshelf(container) {
  let selectedBookId = null;
  let selectedChapterNum = 1;
  let activeFilter = 'all';

  function render() {
    if (selectedBookId) {
      renderReader();
    } else {
      renderLibrary();
    }
  }

  function renderLibrary() {
    const filteredBooks = BOOKS_DATA.filter(b => {
      if (activeFilter === 'all') return true;
      return b.category.toLowerCase().includes(activeFilter.toLowerCase());
    });

    container.innerHTML = `
      <div class="bookshelf-viewport">
        <!-- Header -->
        <div class="curriculum-header">
          <div class="curriculum-title">
            <span class="tag-pill" style="border-color: var(--cyan-glow); margin-bottom: 6px; display: inline-block;">
              TACTICAL FIELD REPOSITORIES & KNOWLEDGE BASE
            </span>
            <h2>Knowledge Books: Cyber Security & Warfare Library</h2>
            <p>15 curated tactical field manuals, red/blue team playbooks, reverse engineering, OSINT, and strategic defense doctrines.</p>
          </div>
        </div>

        <!-- Filter Bar -->
        <div class="domain-filter-bar">
          <span class="filter-pill ${activeFilter === 'all' ? 'active' : ''}" data-filter="all">All Books (${BOOKS_DATA.length})</span>
          <span class="filter-pill ${activeFilter === 'military' ? 'active' : ''}" data-filter="military">Military Doctrine</span>
          <span class="filter-pill ${activeFilter === 'offensive' ? 'active' : ''}" data-filter="offensive">Red Team / RTFM</span>
          <span class="filter-pill ${activeFilter === 'defensive' ? 'active' : ''}" data-filter="defensive">Blue Team / SOC</span>
          <span class="filter-pill ${activeFilter === 'scada' ? 'active' : ''}" data-filter="scada">SCADA & Critical Infra</span>
          <span class="filter-pill ${activeFilter === 'crypto' ? 'active' : ''}" data-filter="crypto">Cryptography</span>
          <span class="filter-pill ${activeFilter === 'threat' ? 'active' : ''}" data-filter="threat">Threat Hunting & Intel</span>
          <span class="filter-pill ${activeFilter === 'cloud' ? 'active' : ''}" data-filter="cloud">Cloud & Identity</span>
        </div>

        <!-- Books Grid -->
        <div class="books-grid">
          ${filteredBooks.map(book => `
            <div class="book-card" data-id="${book.id}">
              <div class="book-cover">
                <div class="book-classification">${book.classification}</div>
                <div style="font-size: 11px; font-family: var(--font-tactical); color: ${book.accentColor}; text-transform: uppercase;">
                  ${book.category}
                </div>
                <h3 style="font-size: 16px; font-weight: 700; color: #ffffff; margin-top: 4px; line-height: 1.3;">
                  ${book.title}
                </h3>
              </div>

              <div class="book-body">
                <div>
                  <div style="font-size: 12px; color: var(--text-dim); margin-bottom: 6px; font-family: var(--font-mono);">
                    By: ${book.author} (${book.year})
                  </div>
                  <p style="font-size: 13px; color: var(--text-muted); line-height: 1.4; margin-bottom: 14px;">
                    ${book.summary}
                  </p>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 10px;">
                  <span style="font-size: 11px; font-family: var(--font-mono); color: var(--cyan-glow);">
                    ${book.chapters.length} CHAPTERS INCLUDED
                  </span>
                  <button class="btn btn-cyan btn-sm btn-open-book" data-id="${book.id}">
                    Read Book →
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Event listeners
    container.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        cyberAudio.playClick();
        activeFilter = pill.getAttribute('data-filter');
        render();
      });
    });

    container.querySelectorAll('.book-card').forEach(card => {
      card.addEventListener('click', () => {
        cyberAudio.playClick();
        selectedBookId = card.getAttribute('data-id');
        selectedChapterNum = 1;
        render();
      });
    });
  }

  function renderReader() {
    const book = BOOKS_DATA.find(b => b.id === selectedBookId) || BOOKS_DATA[0];
    const chapter = book.chapters.find(c => c.number === selectedChapterNum) || book.chapters[0];

    container.innerHTML = `
      <div class="reader-viewport">
        <!-- Top Toolbar -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface); border: 1px solid var(--border-subtle); padding: 12px 20px; border-radius: var(--radius-md); margin-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <button class="btn btn-outline btn-sm" id="btn-back-to-library">
              ← Return to Bookshelf
            </button>
            <div>
              <span class="book-classification" style="position: static; font-size: 9px;">${book.classification}</span>
              <span style="font-weight: 700; color: var(--text-bright); font-size: 15px; margin-left: 8px;">${book.title}</span>
            </div>
          </div>

          <div style="display: flex; gap: 10px; align-items: center;">
            <button class="btn btn-cyan btn-sm" id="btn-read-chapter-audio">
              🔊 Listen Chapter
            </button>
          </div>
        </div>

        <!-- Split Reader Body -->
        <div class="reader-split">
          <!-- Table of Contents Sidebar -->
          <div class="reader-sidebar">
            <h4 style="font-size: 13px; color: var(--text-dim); font-family: var(--font-tactical); text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.1em;">
              TABLE OF CONTENTS
            </h4>
            <div style="display: flex; flex-direction: column; gap: 4px;">
              ${book.chapters.map(c => `
                <div class="nav-item ${c.number === selectedChapterNum ? 'active' : ''} chapter-select-item" data-num="${c.number}" style="font-size: 13px; padding: 8px 10px;">
                  <span style="font-family: var(--font-mono); font-size: 11px;">CH.${c.number}</span>
                  <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${c.title}</span>
                </div>
              `).join('')}
            </div>

            <div style="margin-top: 24px; padding: 12px; background: rgba(0,0,0,0.3); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
              <div style="font-size: 11px; color: var(--cyan-glow); font-family: var(--font-mono);">TACTICAL CITATION:</div>
              <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
                ${book.author} (${book.year})
              </div>
            </div>
          </div>

          <!-- Main Chapter Content Reader -->
          <div class="reader-main">
            <div style="max-width: 800px; margin: 0 auto; line-height: 1.8; color: var(--text-primary);">
              <div style="font-family: var(--font-mono); font-size: 12px; color: var(--cyan-glow); margin-bottom: 6px;">
                CHAPTER ${chapter.number}
              </div>
              <h2 style="font-size: 24px; color: var(--text-bright); margin-bottom: 24px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
                ${chapter.title}
              </h2>

              <div class="chapter-content-body">
                ${formatChapterMarkdown(chapter.content)}
              </div>

              <!-- Chapter Navigation Bottom -->
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 20px; margin-top: 40px;">
                <button class="btn btn-outline btn-sm" id="btn-prev-chap" ${selectedChapterNum <= 1 ? 'disabled style="opacity: 0.4;"' : ''}>
                  ← Previous Chapter
                </button>
                <span style="font-size: 12px; font-family: var(--font-mono); color: var(--text-dim);">
                  Chapter ${selectedChapterNum} of ${book.chapters.length}
                </span>
                <button class="btn btn-cyan btn-sm" id="btn-next-chap" ${selectedChapterNum >= book.chapters.length ? 'disabled style="opacity: 0.4;"' : ''}>
                  Next Chapter →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Event listeners for reader
    container.querySelector('#btn-back-to-library').addEventListener('click', () => {
      cyberAudio.playClick();
      cyberAudio.stopSpeaking();
      selectedBookId = null;
      render();
    });

    container.querySelectorAll('.chapter-select-item').forEach(item => {
      item.addEventListener('click', () => {
        cyberAudio.playClick();
        cyberAudio.stopSpeaking();
        selectedChapterNum = parseInt(item.getAttribute('data-num'), 10);
        render();
      });
    });

    const prevChapBtn = container.querySelector('#btn-prev-chap');
    if (prevChapBtn && selectedChapterNum > 1) {
      prevChapBtn.addEventListener('click', () => {
        cyberAudio.playClick();
        cyberAudio.stopSpeaking();
        selectedChapterNum--;
        render();
      });
    }

    const nextChapBtn = container.querySelector('#btn-next-chap');
    if (nextChapBtn && selectedChapterNum < book.chapters.length) {
      nextChapBtn.addEventListener('click', () => {
        cyberAudio.playClick();
        cyberAudio.stopSpeaking();
        selectedChapterNum++;
        render();
      });
    }

    // Audio read chapter
    const audioChapBtn = container.querySelector('#btn-read-chapter-audio');
    if (audioChapBtn) {
      audioChapBtn.addEventListener('click', () => {
        cyberAudio.playClick();
        cyberAudio.speakText(chapter.content);
      });
    }
  }

  render();
}

function formatChapterMarkdown(md) {
  return md
    .replace(/### (.*?)\n/g, '<h3 style="font-size: 19px; color: var(--text-bright); margin: 20px 0 10px 0;">$1</h3>')
    .replace(/#### (.*?)\n/g, '<h4 style="font-size: 16px; color: var(--cyan-glow); margin: 16px 0 8px 0;">$1</h4>')
    .replace(/```(powershell|bash|)\n([\s\S]*?)```/g, '<pre class="architecture-box" style="margin: 14px 0; color: #10b981;"><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code style="background: rgba(0,242,254,0.1); color: var(--cyan-glow); padding: 2px 6px; border-radius: 3px; font-family: var(--font-mono); font-size: 13px;">$1</code>')
    .replace(/\n\n/g, '<br><br>');
}
