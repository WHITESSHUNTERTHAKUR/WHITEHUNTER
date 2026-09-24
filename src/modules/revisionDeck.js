import { DefenseStorage } from '../utils/storage.js';
import { cyberAudio } from './audio.js';

export function renderRevisionDeck(container) {
  function render() {
    const deck = DefenseStorage.getRevisionDeck();

    container.innerHTML = `
      <div class="revision-viewport" style="max-width: 900px; margin: 0 auto;">
        <!-- Header -->
        <div class="curriculum-header" style="margin-bottom: 20px;">
          <div class="curriculum-title">
            <span class="tag-pill" style="border-color: var(--amber-glow); color: var(--amber-glow); margin-bottom: 6px; display: inline-block;">
              TACTICAL MEMORY & STUDY DECK
            </span>
            <h2>Revision Deck & Bookmarked Questions</h2>
            <p>Saved high-yield interview questions and tactical scenarios marked for focused revision.</p>
          </div>
          <div>
            <span style="font-family: var(--font-mono); font-size: 13px; color: var(--cyan-glow);">
              ${deck.length} Saved Questions
            </span>
          </div>
        </div>

        ${deck.length === 0 ? `
          <div class="card-tactical" style="text-align: center; padding: 60px 20px;">
            <div style="font-size: 36px; margin-bottom: 12px;">★</div>
            <h3 style="color: var(--text-bright); margin-bottom: 8px;">Your Revision Deck is Empty</h3>
            <p style="color: var(--text-muted); max-width: 480px; margin: 0 auto 20px auto; font-size: 14px;">
              While reviewing Phase 2 (Important Q&A) for any topic, click the star (★) button on questions you want to save for rapid revision here.
            </p>
            <button class="btn btn-cyan btn-sm" id="btn-browse-curriculum">
              Browse Topics & Questions →
            </button>
          </div>
        ` : `
          <div class="qa-list">
            ${deck.map((qa, idx) => `
              <div class="qa-card" style="border-left: 3px solid var(--amber-glow);">
                <div class="qa-header" data-id="${qa.id}">
                  <div class="qa-title-wrap">
                    <span class="qa-badge" style="background: rgba(245, 158, 11, 0.15); color: var(--amber-glow);">
                      ITEM ${idx + 1}
                    </span>
                    <span class="qa-badge" style="background: rgba(255,255,255,0.05); color: var(--text-muted);">
                      ${qa.category || 'General'}
                    </span>
                    <div class="qa-question-text">${qa.question}</div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <button class="btn-sound-toggle btn-remove-deck" data-id="${qa.id}" title="Remove from Revision" style="color: var(--crimson-glow);">
                      ✕
                    </button>
                    <button class="btn-sound-toggle btn-speak-rev" data-id="${qa.id}" title="Read Aloud">
                      🔊
                    </button>
                  </div>
                </div>

                <div class="qa-body" style="display: block;">
                  <div class="qa-answer-box">
                    <strong style="color: var(--cyan-glow); display: block; margin-bottom: 4px;">ANSWER:</strong>
                    ${qa.answer}
                  </div>
                  <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 8px;">
                    <strong>Explanation:</strong> ${qa.explanation}
                  </div>
                  ${qa.tacticalTip ? `
                    <div class="qa-tip-box" style="font-size: 12px;">
                      <strong>Tip:</strong> ${qa.tacticalTip}
                    </div>
                  ` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;

    // Event listeners
    const browseBtn = container.querySelector('#btn-browse-curriculum');
    if (browseBtn) {
      browseBtn.addEventListener('click', () => {
        cyberAudio.playClick();
        window.location.hash = '#curriculum';
      });
    }

    container.querySelectorAll('.btn-remove-deck').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        cyberAudio.playClick();
        const id = btn.getAttribute('data-id');
        DefenseStorage.toggleRevisionQuestion({ id });
        render();
      });
    });

    container.querySelectorAll('.btn-speak-rev').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        cyberAudio.playClick();
        const id = btn.getAttribute('data-id');
        const item = deck.find(d => d.id === id);
        if (item) {
          cyberAudio.speakText(`Question: ${item.question}. Answer: ${item.answer}`);
        }
      });
    });
  }

  render();
}
