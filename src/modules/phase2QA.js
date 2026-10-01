import { cyberAudio } from './audio.js';
import { DefenseStorage } from '../utils/storage.js';
import { i18n } from '../utils/i18n.js';

export function renderPhase2(topic, container, onNavigate) {
  // Mark Phase 2 as completed
  DefenseStorage.markPhaseComplete(topic.id, 2);

  let activeCategory = 'all';
  let searchTerm = '';
  let allRevealed = false;

  function render() {
    const isHinglish = i18n.getLanguage() === 'hinglish';

    const filteredQAs = topic.phase2.filter(qa => {
      const matchCat = activeCategory === 'all' || 
        qa.category.toLowerCase().includes(activeCategory.toLowerCase());
      
      const q = searchTerm.toLowerCase();
      const matchSearch = searchTerm === '' || 
        qa.question.toLowerCase().includes(q) || 
        (qa.question_hi && qa.question_hi.toLowerCase().includes(q)) ||
        qa.answer.toLowerCase().includes(q) ||
        (qa.answer_hi && qa.answer_hi.toLowerCase().includes(q));

      return matchCat && matchSearch;
    });

    container.innerHTML = `
      <div class="qa-viewport">
        <!-- Controls Bar -->
        <div class="card-tactical" style="padding: 18px 24px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
          <div>
            <span class="tag-pill" style="border-color: var(--cyan-glow); margin-bottom: 6px; display: inline-block;">
              ${isHinglish ? 'PHASE 2: 15 ZAROORI SAWAAL AUR JAWAB' : 'PHASE 2: 15 ESSENTIAL QUESTIONS & ANSWERS'}
            </span>
            <h2 style="font-size: 22px; color: var(--text-bright); margin-bottom: 4px;">${topic.title}</h2>
            <div style="font-size: 13.5px; color: var(--text-muted);">
              ${isHinglish 
                ? `Kul Sawaal: ${topic.phase2.length} | Interview aur Certification ke liye zaroori Q&A`
                : `Total Questions: ${topic.phase2.length} | High-Yield Certification & Interview Q&A`}
            </div>
          </div>

          <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
            <button class="btn btn-outline btn-sm" id="btn-toggle-all-answers">
              ${allRevealed ? (isHinglish ? 'Sabhi Jawab Chupayein' : 'Hide All Answers') : (isHinglish ? 'Sabhi Jawab Dekhein' : 'Reveal All Answers')}
            </button>
            <button class="btn btn-cyan btn-sm" id="btn-jump-to-quiz">
              ${isHinglish ? 'Phase 3: Quiz Par Jayein →' : 'Proceed to Phase 3: Quiz →'}
            </button>
          </div>
        </div>

        <!-- Filter & Search Toolbar -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
          <div class="domain-filter-bar" style="margin-bottom: 0; display: flex; gap: 6px; flex-wrap: wrap;">
            <span class="filter-pill ${activeCategory === 'all' ? 'active' : ''}" data-cat="all">
              ${isHinglish ? 'Sabhi' : 'All'} (${topic.phase2.length})
            </span>
            <span class="filter-pill ${activeCategory === 'foundational' ? 'active' : ''}" data-cat="foundational">
              Foundational
            </span>
            <span class="filter-pill ${activeCategory === 'operational' ? 'active' : ''}" data-cat="operational">
              Operational / Scenario
            </span>
            <span class="filter-pill ${activeCategory === 'defense' ? 'active' : ''}" data-cat="defense">
              Defense & Hardening
            </span>
            <span class="filter-pill ${activeCategory === 'interview' ? 'active' : ''}" data-cat="interview">
              Interview Special
            </span>
          </div>

          <div>
            <input 
              type="text" 
              class="search-input" 
              id="qa-search-input" 
              placeholder="${isHinglish ? 'Sawaal dhoondein...' : 'Search questions...'}" 
              value="${escapeHtml(searchTerm)}" 
              style="width: 240px;" 
            />
          </div>
        </div>

        <!-- Questions List -->
        <div class="qa-list" style="display: flex; flex-direction: column; gap: 14px;">
          ${filteredQAs.length === 0 ? `
            <div class="card-tactical" style="text-align: center; padding: 40px;">
              <p style="color: var(--text-dim);">${isHinglish ? 'Koi sawaal match nahi hua.' : 'No questions match the current filter or search criteria.'}</p>
            </div>
          ` : filteredQAs.map((qa, idx) => {
            const inRevision = DefenseStorage.isQuestionInRevision(qa.id);
            const questionText = isHinglish ? (qa.question_hi || qa.question) : qa.question;
            const answerText = isHinglish ? (qa.answer_hi || qa.answer) : qa.answer;

            return `
              <div class="card-tactical qa-card" id="card-${qa.id}" style="margin-bottom: 0; padding: 18px 20px;">
                <div class="qa-header" data-id="${qa.id}" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 12px;">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="background: var(--cyan-dim); color: var(--cyan-glow); font-weight: 700; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; flex-shrink: 0;">
                      Q${idx + 1}
                    </span>
                    <span class="tag-pill" style="font-size: 10px; background: rgba(255,255,255,0.05); color: var(--text-muted);">
                      ${qa.category}
                    </span>
                    <div style="font-size: 15.5px; font-weight: 700; color: var(--text-bright);">
                      ${questionText}
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
                    <button class="btn-sound-toggle btn-bookmark-qa" data-id="${qa.id}" title="${inRevision ? 'Remove from Revision' : 'Save to Revision Deck'}" style="color: ${inRevision ? 'var(--amber-glow)' : 'var(--text-muted)'}; border-color: ${inRevision ? 'var(--amber-glow)' : 'var(--border-subtle)'};">
                      ${inRevision ? '★ Saved' : '☆ Save'}
                    </button>
                    <button class="btn-sound-toggle btn-speak-qa" data-id="${qa.id}" title="Read Aloud">
                      🔊
                    </button>
                    <span class="qa-chevron" style="color: var(--cyan-glow); font-size: 14px;">${allRevealed ? '▲' : '▼'}</span>
                  </div>
                </div>

                <div class="qa-body" style="display: ${allRevealed ? 'block' : 'none'}; margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--border-subtle);" id="body-${qa.id}">
                  <!-- Direct Operational Answer -->
                  <div style="background: var(--bg-surface-elevated); border-left: 3px solid var(--cyan-glow); padding: 12px 16px; border-radius: var(--radius-sm); margin-bottom: 12px;">
                    <strong style="color: var(--cyan-glow); font-size: 12px; display: block; margin-bottom: 4px; letter-spacing: 0.05em;">
                      ${isHinglish ? 'AASAN JAWAB (DIRECT ANSWER):' : 'OPERATIONAL ANSWER:'}
                    </strong>
                    <div style="font-size: 14.5px; color: var(--text-bright); line-height: 1.5;">
                      ${answerText}
                    </div>
                    ${isHinglish ? `
                      <div style="font-size: 12.5px; color: var(--text-dim); margin-top: 8px; border-top: 1px dashed var(--border-subtle); padding-top: 6px;">
                        <strong>English:</strong> ${qa.answer}
                      </div>
                    ` : ''}
                  </div>

                  <!-- Technical Explanation -->
                  <div style="font-size: 13.5px; color: var(--text-muted); margin-bottom: 10px; line-height: 1.5;">
                    <strong style="color: var(--text-bright);">${isHinglish ? 'Explanation (Wajah):' : 'Technical Rationale:'}</strong> ${qa.explanation}
                  </div>

                  <!-- Field Pro Tip -->
                  ${qa.tacticalTip ? `
                    <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: var(--radius-sm); padding: 8px 12px; font-size: 13px; color: var(--gold-crest);">
                      <strong>⚡ ${isHinglish ? 'Security Pro Tip:' : 'Tactical Pro Tip:'}</strong> ${qa.tacticalTip}
                    </div>
                  ` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Bottom Action -->
        <div class="card-tactical" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; margin-top: 24px;">
          <div>
            <div style="font-size: 12px; color: var(--emerald-glow); font-weight: 700;">
              ✓ ${isHinglish ? 'PHASE 2 MASTER HO GAYA' : 'PHASE 2 COMPLETED'}
            </div>
            <div style="font-weight: 700; color: var(--text-bright); font-size: 15px;">
              ${isHinglish ? 'Ab Knowledge Test ke liye Quiz shuru karein' : 'Ready to Test Your Knowledge in Phase 3 Quiz?'}
            </div>
          </div>
          <button class="btn btn-cyan btn-sm" id="btn-bottom-to-quiz">
            ${isHinglish ? 'Phase 3: Quiz Shuru Karein →' : 'Start Phase 3: Knowledge Quiz →'}
          </button>
        </div>
      </div>
    `;

    attachEvents();
  }

  function attachEvents() {
    // Category pill filter
    container.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        cyberAudio.playClick();
        activeCategory = pill.getAttribute('data-cat');
        render();
      });
    });

    // Search input
    const searchInput = container.querySelector('#qa-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase().trim();
        render();
        const reInput = container.querySelector('#qa-search-input');
        if (reInput) {
          reInput.focus();
          reInput.selectionStart = reInput.selectionEnd = reInput.value.length;
        }
      });
    }

    // Toggle All Answers
    const toggleAllBtn = container.querySelector('#btn-toggle-all-answers');
    if (toggleAllBtn) {
      toggleAllBtn.addEventListener('click', () => {
        cyberAudio.playClick();
        allRevealed = !allRevealed;
        render();
      });
    }

    // Individual card header click (accordion)
    container.querySelectorAll('.qa-header').forEach(header => {
      header.addEventListener('click', (e) => {
        if (e.target.closest('.btn-bookmark-qa') || e.target.closest('.btn-speak-qa')) return;
        const id = header.getAttribute('data-id');
        const body = container.querySelector(`#body-${id}`);
        const chevron = header.querySelector('.qa-chevron');
        if (body) {
          cyberAudio.playClick();
          const isVisible = body.style.display !== 'none';
          body.style.display = isVisible ? 'none' : 'block';
          if (chevron) chevron.innerText = isVisible ? '▼' : '▲';
        }
      });
    });

    // Bookmark / Revision Deck
    container.querySelectorAll('.btn-bookmark-qa').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        cyberAudio.playClick();
        const id = btn.getAttribute('data-id');
        const qaObj = topic.phase2.find(q => q.id === id);
        if (qaObj) {
          DefenseStorage.toggleRevisionQuestion(qaObj);
          render();
        }
      });
    });

    // Speak QA
    container.querySelectorAll('.btn-speak-qa').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        cyberAudio.playClick();
        const id = btn.getAttribute('data-id');
        const qaObj = topic.phase2.find(q => q.id === id);
        if (qaObj) {
          const isHinglish = i18n.getLanguage() === 'hinglish';
          const textToRead = `${isHinglish ? (qaObj.question_hi || qaObj.question) : qaObj.question}. Answer: ${isHinglish ? (qaObj.answer_hi || qaObj.answer) : qaObj.answer}`;
          cyberAudio.speakText(textToRead);
        }
      });
    });

    // Jump to Quiz buttons
    const toQuizBtn = container.querySelector('#btn-jump-to-quiz');
    const bottomQuizBtn = container.querySelector('#btn-bottom-to-quiz');
    if (toQuizBtn) {
      toQuizBtn.addEventListener('click', () => {
        cyberAudio.playClick();
        cyberAudio.stopSpeaking();
        onNavigate(topic.id, 3);
      });
    }
    if (bottomQuizBtn) {
      bottomQuizBtn.addEventListener('click', () => {
        cyberAudio.playClick();
        cyberAudio.stopSpeaking();
        onNavigate(topic.id, 3);
      });
    }
  }

  render();

  // Listen for language switch
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
