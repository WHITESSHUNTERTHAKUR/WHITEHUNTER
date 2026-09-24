import { cyberAudio } from './audio.js';
import { DefenseStorage } from '../utils/storage.js';

export function renderPhase2(topic, container, onNavigate) {
  // Mark Phase 2 as completed
  DefenseStorage.markPhaseComplete(topic.id, 2);

  let activeCategory = 'all';
  let searchTerm = '';
  let allRevealed = false;

  function render() {
    const filteredQAs = topic.phase2.filter(qa => {
      const matchCat = activeCategory === 'all' || qa.category.toLowerCase().includes(activeCategory.toLowerCase());
      const matchSearch = searchTerm === '' || 
        qa.question.toLowerCase().includes(searchTerm) || 
        qa.answer.toLowerCase().includes(searchTerm);
      return matchCat && matchSearch;
    });

    container.innerHTML = `
      <div class="qa-viewport">
        <!-- Controls Bar -->
        <div class="qa-controls-bar">
          <div>
            <span class="tag-pill" style="border-color: var(--cyan-glow); margin-bottom: 6px; display: inline-block;">
              PHASE 2: IMPORTANT QUESTIONS & TACTICAL ANSWERS
            </span>
            <h2 style="font-size: 22px; color: var(--text-bright);">${topic.title}</h2>
            <div style="font-size: 13px; color: var(--text-muted);">
              Total Questions: ${topic.phase2.length} | High-Yield Certification & Tactical Interview Q&A
            </div>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <button class="btn btn-outline btn-sm" id="btn-toggle-all-answers">
              ${allRevealed ? 'Hide All Answers' : 'Reveal All Answers'}
            </button>
            <button class="btn btn-cyan btn-sm" id="btn-jump-to-quiz">
              Proceed to Phase 3: Quiz →
            </button>
          </div>
        </div>

        <!-- Filter & Search Toolbar -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
          <div class="domain-filter-bar" style="margin-bottom: 0;">
            <span class="filter-pill ${activeCategory === 'all' ? 'active' : ''}" data-cat="all">All (${topic.phase2.length})</span>
            <span class="filter-pill ${activeCategory === 'foundational' ? 'active' : ''}" data-cat="foundational">Foundational</span>
            <span class="filter-pill ${activeCategory === 'operational' ? 'active' : ''}" data-cat="operational">Operational & Scenarios</span>
            <span class="filter-pill ${activeCategory === 'defense' ? 'active' : ''}" data-cat="defense">Military & Defense</span>
          </div>
          <div>
            <input type="text" class="search-input" id="qa-search-input" placeholder="Search questions..." value="${searchTerm}" style="width: 220px;" />
          </div>
        </div>

        <!-- Questions List -->
        <div class="qa-list">
          ${filteredQAs.length === 0 ? `
            <div class="card-tactical" style="text-align: center; padding: 40px;">
              <p style="color: var(--text-dim);">No questions match the current filter or search criteria.</p>
            </div>
          ` : filteredQAs.map((qa, idx) => {
            const inRevision = DefenseStorage.isQuestionInRevision(qa.id);
            return `
              <div class="qa-card" id="card-${qa.id}">
                <div class="qa-header" data-id="${qa.id}">
                  <div class="qa-title-wrap">
                    <span class="qa-badge">Q${idx + 1}</span>
                    <span class="qa-badge" style="background: rgba(255,255,255,0.05); color: var(--text-muted);">${qa.category}</span>
                    <div class="qa-question-text">${qa.question}</div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <button class="btn-sound-toggle btn-bookmark-qa" data-id="${qa.id}" title="${inRevision ? 'Remove from Revision' : 'Save to Revision Deck'}" style="color: ${inRevision ? 'var(--amber-glow)' : 'var(--text-muted)'}; border-color: ${inRevision ? 'var(--amber-glow)' : 'var(--border-subtle)'};">
                      ★
                    </button>
                    <button class="btn-sound-toggle btn-speak-qa" data-id="${qa.id}" title="Read Aloud">
                      🔊
                    </button>
                    <span class="qa-chevron" style="color: var(--cyan-glow); font-size: 14px;">${allRevealed ? '▲' : '▼'}</span>
                  </div>
                </div>

                <div class="qa-body" style="display: ${allRevealed ? 'block' : 'none'};" id="body-${qa.id}">
                  <div class="qa-answer-box">
                    <strong style="color: var(--cyan-glow); display: block; margin-bottom: 4px;">OPERATIONAL ANSWER:</strong>
                    ${qa.answer}
                  </div>
                  <div style="font-size: 14px; color: var(--text-muted); margin-bottom: 10px; line-height: 1.5;">
                    <strong style="color: var(--text-bright);">Technical Rationale:</strong> ${qa.explanation}
                  </div>
                  ${qa.tacticalTip ? `
                    <div class="qa-tip-box">
                      <strong>⚡ Tactical Field Tip:</strong> ${qa.tacticalTip}
                    </div>
                  ` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Bottom Action -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface); padding: 18px 24px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-top: 24px;">
          <div>
            <div style="font-family: var(--font-tactical); font-size: 13px; color: var(--emerald-glow);">✓ PHASE 2 MASTERED</div>
            <div style="font-weight: 700; color: var(--text-bright);">Verify Your Skills in the Timed Mission Quiz</div>
          </div>
          <button class="btn btn-emerald" id="btn-bottom-to-quiz">Start Phase 3: Questions Quiz →</button>
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
          const textToRead = `Question: ${qaObj.question}. Operational Answer: ${qaObj.answer}`;
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
}
