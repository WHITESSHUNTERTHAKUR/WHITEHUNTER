import { BOOKS_DATA } from '../data/booksData.js';
import { cyberAudio } from './audio.js';
import { i18n } from '../utils/i18n.js';

export function renderBookshelf(container) {
  let selectedBookId = null;
  let selectedChapterNum = 1;
  let activeFilter = 'all';
  let searchQuery = '';
  let speechSynth = null;
  let isSpeaking = false;

  function render() {
    if (selectedBookId) {
      renderReader();
    } else {
      renderLibrary();
    }
  }

  function renderLibrary() {
    const isHinglish = i18n.getLanguage() === 'hinglish';

    const filteredBooks = BOOKS_DATA.filter(b => {
      const matchesFilter = activeFilter === 'all' || 
        b.category.toLowerCase().includes(activeFilter.toLowerCase());
      
      const query = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        b.title.toLowerCase().includes(query) ||
        (b.summary && b.summary.toLowerCase().includes(query)) ||
        (b.summary_hi && b.summary_hi.toLowerCase().includes(query)) ||
        b.author.toLowerCase().includes(query) ||
        b.category.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });

    container.innerHTML = `
      <div class="bookshelf-viewport">
        <!-- Header -->
        <div class="card-tactical" style="background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%); border-left: 4px solid var(--gold-crest); margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <div>
              <span class="tag-pill" style="margin-bottom: 8px;">
                ${isHinglish ? `TECHNICAL REPOSITORY // ${BOOKS_DATA.length}+ CYBER KITABEIN` : `TECHNICAL REPOSITORY // ${BOOKS_DATA.length}+ CYBER BOOKS`}
              </span>
              <h2 style="font-size: 24px; color: var(--text-bright); margin-bottom: 6px;">
                ${isHinglish ? 'Cyber Security & Ethical Hacking Library' : 'Technical Cyber Security Library'}
              </h2>
              <p style="color: var(--text-muted); font-size: 14px; max-width: 650px;">
                ${isHinglish 
                  ? `${BOOKS_DATA.length} se zyada zaroori kitabein: Ethical Hacking, Network Security, Python, Forensics aur SOC Defense par, bilkul aasan bhasha me samjhayi gayi hain.`
                  : `${BOOKS_DATA.length} comprehensive cybersecurity books, field guides, and cheat sheets written in simple, accessible language for students and professionals.`}
              </p>
            </div>

            <div style="min-width: 280px;">
              <input 
                type="text" 
                id="book-search-input" 
                class="search-input" 
                placeholder="${isHinglish ? 'Kitab ka naam ya topic search karein...' : 'Search books, authors, topics...'}" 
                value="${escapeHtml(searchQuery)}" 
                style="width: 100%;" 
              />
            </div>
          </div>
        </div>

        <!-- Filter Bar -->
        <div class="domain-filter-bar" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px;">
          <span class="filter-pill ${activeFilter === 'all' ? 'active' : ''}" data-filter="all">
            ${isHinglish ? 'Sabhi Kitabein' : 'All Books'} (${BOOKS_DATA.length})
          </span>
          <span class="filter-pill ${activeFilter === 'ethical' ? 'active' : ''}" data-filter="ethical">Ethical Hacking</span>
          <span class="filter-pill ${activeFilter === 'network' ? 'active' : ''}" data-filter="network">Networking</span>
          <span class="filter-pill ${activeFilter === 'web' ? 'active' : ''}" data-filter="web">Web Security</span>
          <span class="filter-pill ${activeFilter === 'blue' || activeFilter === 'soc' ? 'active' : ''}" data-filter="blue">Blue Team & SOC</span>
          <span class="filter-pill ${activeFilter === 'hardening' || activeFilter === 'linux' ? 'active' : ''}" data-filter="hardening">Linux & Windows</span>
          <span class="filter-pill ${activeFilter === 'cloud' ? 'active' : ''}" data-filter="cloud">Cloud & DevSecOps</span>
          <span class="filter-pill ${activeFilter === 'forensics' ? 'active' : ''}" data-filter="forensics">Digital Forensics</span>
          <span class="filter-pill ${activeFilter === 'python' ? 'active' : ''}" data-filter="python">Python & Scripting</span>
          <span class="filter-pill ${activeFilter === 'cryptography' ? 'active' : ''}" data-filter="cryptography">Cryptography</span>
          <span class="filter-pill ${activeFilter === 'malware' ? 'active' : ''}" data-filter="malware">Malware Analysis</span>
        </div>

        <!-- Books Grid -->
        <div class="books-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 18px;">
          ${filteredBooks.map(book => `
            <div class="card-tactical book-card" data-id="${book.id}" style="margin-bottom: 0; cursor: pointer; display: flex; flex-direction: column; justify-content: space-between; border-top: 3px solid ${book.accentColor};">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span class="tag-pill" style="font-size: 10px; border-color: ${book.accentColor}; color: ${book.accentColor};">
                    ${book.category}
                  </span>
                  <span style="font-size: 11px; color: var(--text-dim);">${book.year}</span>
                </div>

                <h3 style="font-size: 16px; font-weight: 700; color: var(--text-bright); margin-bottom: 6px; line-height: 1.3;">
                  ${book.title}
                </h3>
                
                <div style="font-size: 12px; color: var(--cyan-glow); margin-bottom: 8px;">
                  By: ${book.author}
                </div>

                <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-bottom: 12px;">
                  ${isHinglish ? (book.summary_hi || book.summary) : book.summary}
                </p>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 12px; margin-top: 8px;">
                <span style="font-size: 11.5px; color: var(--text-dim); font-weight: 600;">
                  📖 ${book.chapters.length} ${isHinglish ? 'Chapters' : 'Chapters'}
                </span>
                <button class="btn btn-cyan btn-sm btn-open-book" data-id="${book.id}">
                  ${isHinglish ? 'Kitab Padhein →' : 'Read Book →'}
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Event listeners
    const searchInput = container.querySelector('#book-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        render();
        const reSearchInput = container.querySelector('#book-search-input');
        if (reSearchInput) {
          reSearchInput.focus();
          reSearchInput.selectionStart = reSearchInput.selectionEnd = reSearchInput.value.length;
        }
      });
    }

    container.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        cyberAudio.playClick();
        activeFilter = pill.getAttribute('data-filter');
        render();
      });
    });

    container.querySelectorAll('.book-card, .btn-open-book').forEach(card => {
      card.addEventListener('click', (e) => {
        cyberAudio.playClick();
        selectedBookId = card.getAttribute('data-id');
        selectedChapterNum = 1;
        render();
      });
    });
  }

  function renderReader() {
    const isHinglish = i18n.getLanguage() === 'hinglish';
    const book = BOOKS_DATA.find(b => b.id === selectedBookId) || BOOKS_DATA[0];
    const chapter = book.chapters.find(c => c.number === selectedChapterNum) || book.chapters[0];

    container.innerHTML = `
      <div class="reader-viewport">
        <!-- Top Toolbar -->
        <div class="card-tactical" style="padding: 12px 20px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <button class="btn btn-outline btn-sm" id="btn-back-to-library">
              ${isHinglish ? '← Library Par Wapas Jayein' : '← Back to Library'}
            </button>
            <div>
              <span class="tag-pill" style="font-size: 10px; margin-right: 6px;">${book.category}</span>
              <strong style="color: var(--text-bright); font-size: 16px;">${book.title}</strong>
            </div>
          </div>

          <div style="display: flex; gap: 10px; align-items: center;">
            <button class="btn btn-cyan btn-sm" id="btn-read-chapter-audio">
              ${isSpeaking ? '⏹ Stop Audio' : '🔊 Listen Chapter'}
            </button>
          </div>
        </div>

        <!-- Split Reader Body -->
        <div style="display: grid; grid-template-columns: 280px 1fr; gap: 20px;">
          <!-- Table of Contents Sidebar -->
          <div class="card-tactical" style="padding: 16px;">
            <h4 style="font-size: 12px; color: var(--text-dim); text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.08em; font-weight: 700;">
              ${isHinglish ? 'KITAB KE CHAPTERS' : 'TABLE OF CONTENTS'}
            </h4>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              ${book.chapters.map(c => `
                <div class="nav-item ${c.number === selectedChapterNum ? 'active' : ''} chapter-select-item" data-num="${c.number}" style="padding: 10px 12px; border-radius: var(--radius-sm); cursor: pointer;">
                  <span style="font-weight: 700; font-size: 11px; margin-right: 6px; color: var(--cyan-glow);">CH.${c.number}</span>
                  <span style="font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${c.title}</span>
                </div>
              `).join('')}
            </div>

            <div style="margin-top: 24px; padding: 12px; background: var(--bg-surface-elevated); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
              <div style="font-size: 11px; color: var(--cyan-glow); font-weight: 700;">AUTHOR & YEAR:</div>
              <div style="font-size: 12px; color: var(--text-primary); margin-top: 4px;">
                ${book.author} (${book.year})
              </div>
            </div>
          </div>

          <!-- Chapter Content Display -->
          <div class="card-tactical" style="padding: 28px; line-height: 1.7; font-size: 15px;">
            <div style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 14px; margin-bottom: 20px;">
              <span class="tag-pill" style="margin-bottom: 8px;">CHAPTER ${chapter.number}</span>
              <h2 style="font-size: 22px; color: var(--text-bright); margin-top: 4px;">${chapter.title}</h2>
            </div>

            <div class="chapter-content-markdown" style="color: var(--text-primary);">
              ${renderMarkdownContent(chapter.content)}
            </div>

            <!-- Chapter Navigation Footer -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 20px; margin-top: 30px;">
              <button class="btn btn-outline btn-sm" id="btn-prev-chapter" ${selectedChapterNum === 1 ? 'disabled style="opacity: 0.5; pointer-events: none;"' : ''}>
                ← Previous Chapter
              </button>
              <span style="font-size: 12.5px; color: var(--text-dim);">
                Chapter ${selectedChapterNum} of ${book.chapters.length}
              </span>
              <button class="btn btn-cyan btn-sm" id="btn-next-chapter" ${selectedChapterNum === book.chapters.length ? 'disabled style="opacity: 0.5; pointer-events: none;"' : ''}>
                Next Chapter →
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Reader Event listeners
    container.querySelector('#btn-back-to-library')?.addEventListener('click', () => {
      cyberAudio.playClick();
      stopSpeech();
      selectedBookId = null;
      render();
    });

    container.querySelectorAll('.chapter-select-item').forEach(item => {
      item.addEventListener('click', () => {
        cyberAudio.playClick();
        stopSpeech();
        selectedChapterNum = parseInt(item.getAttribute('data-num'), 10);
        render();
      });
    });

    container.querySelector('#btn-prev-chapter')?.addEventListener('click', () => {
      if (selectedChapterNum > 1) {
        cyberAudio.playClick();
        stopSpeech();
        selectedChapterNum--;
        render();
      }
    });

    container.querySelector('#btn-next-chapter')?.addEventListener('click', () => {
      if (selectedChapterNum < book.chapters.length) {
        cyberAudio.playClick();
        stopSpeech();
        selectedChapterNum++;
        render();
      }
    });

    // Copy code button listeners
    container.querySelectorAll('.btn-copy-code').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = decodeURIComponent(btn.getAttribute('data-code'));
        navigator.clipboard.writeText(code).then(() => {
          cyberAudio.playClick();
          btn.innerText = 'Copied!';
          setTimeout(() => { btn.innerText = 'Copy'; }, 2000);
        });
      });
    });

    // Speech Audio Listener
    container.querySelector('#btn-read-chapter-audio')?.addEventListener('click', () => {
      toggleSpeech(chapter.content);
    });
  }

  function renderMarkdownContent(content) {
    if (!content) return '';
    
    // Replace headings
    let html = content
      .replace(/^### (.*$)/gim, '<h3 style="color: var(--cyan-glow); font-size: 19px; margin: 24px 0 12px 0;">$1</h3>')
      .replace(/^#### (.*$)/gim, '<h4 style="color: var(--text-bright); font-size: 16px; margin: 18px 0 8px 0;">$1</h4>')
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--text-bright);">$1</strong>')
      .replace(/^- (.*$)/gim, '<li style="margin-left: 20px; margin-bottom: 6px;">$1</li>');

    // Code blocks
    html = html.replace(/```(powershell|bash|sh|cmd|python)?\n([\s\S]*?)```/g, (match, lang, code) => {
      const cleanCode = code.trim();
      return `
        <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); margin: 16px 0; overflow: hidden;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 12px; background: rgba(0,0,0,0.25); border-bottom: 1px solid var(--border-subtle); font-size: 11px; color: var(--text-dim);">
            <span>${(lang || 'CODE').toUpperCase()}</span>
            <button class="btn btn-outline btn-sm btn-copy-code" data-code="${encodeURIComponent(cleanCode)}" style="padding: 2px 8px; font-size: 11px;">Copy</button>
          </div>
          <pre style="padding: 14px; font-family: var(--font-mono); font-size: 13.5px; overflow-x: auto; color: #38bdf8; margin: 0;"><code>${escapeHtml(cleanCode)}</code></pre>
        </div>
      `;
    });

    return html.replace(/\n/g, '<br>');
  }

  function toggleSpeech(text) {
    if (isSpeaking) {
      stopSpeech();
      return;
    }

    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this environment.');
      return;
    }

    const cleanText = text.replace(/[#*`_-]/g, ' ').replace(/\s+/g, ' ');
    speechSynth = new SpeechSynthesisUtterance(cleanText);
    speechSynth.rate = 1.0;
    speechSynth.pitch = 1.0;

    speechSynth.onend = () => {
      isSpeaking = false;
      updateAudioBtn(false);
    };

    speechSynth.onerror = () => {
      isSpeaking = false;
      updateAudioBtn(false);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speechSynth);
    isSpeaking = true;
    updateAudioBtn(true);
  }

  function stopSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    isSpeaking = false;
    updateAudioBtn(false);
  }

  function updateAudioBtn(speaking) {
    const btn = container.querySelector('#btn-read-chapter-audio');
    if (btn) {
      btn.innerText = speaking ? '⏹ Stop Audio' : '🔊 Listen Chapter';
      if (speaking) {
        btn.classList.add('btn-gold');
        btn.classList.remove('btn-cyan');
      } else {
        btn.classList.add('btn-cyan');
        btn.classList.remove('btn-gold');
      }
    }
  }

  // Initial render
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
