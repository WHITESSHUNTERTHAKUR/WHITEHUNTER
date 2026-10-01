import { ALL_TOPICS, DOMAINS, getTopicsByDomain } from '../data/allTopics.js';
import { DefenseStorage } from '../utils/storage.js';
import { cyberAudio } from './audio.js';
import { i18n } from '../utils/i18n.js';

export function renderCurriculumGrid(container, onSelectTopic) {
  let activeDomain = 'all';
  let searchTerm = '';

  function render() {
    const isHinglish = i18n.getLanguage() === 'hinglish';
    const progress = DefenseStorage.getTopicProgress();
    const stats = DefenseStorage.getOverallStats();

    const filtered = ALL_TOPICS.filter(t => {
      const matchDomain = activeDomain === 'all' || t.domainId === activeDomain;
      const q = searchTerm.toLowerCase();
      const matchSearch = searchTerm === '' ||
        t.title.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q)) ||
        t.phase1.overview.toLowerCase().includes(q);
      return matchDomain && matchSearch;
    });

    container.innerHTML = `
      <div class="curriculum-viewport">
        <!-- Hero Header -->
        <div class="card-tactical" style="background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%); border-left: 4px solid var(--cyan-glow); margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <div>
              <span class="tag-pill" style="margin-bottom: 8px;">
                ${isHinglish ? 'CYBER CURRICULUM // 52 TOPICS' : 'CYBER CURRICULUM // 52 TOPICS'}
              </span>
              <h2 style="font-size: 24px; color: var(--text-bright); margin-bottom: 6px;">
                ${isHinglish ? 'Cyber Security, Networking & Ethical Hacking Course' : 'Cyber Security & Ethical Hacking Academy'}
              </h2>
              <p style="color: var(--text-muted); font-size: 14px; max-width: 650px;">
                ${isHinglish 
                  ? '3-Phase me padhein: Pehle Theory (Aasan Samjh) -> Phir 15 Zaroori Sawaal & Jawab -> Phir Knowledge Quiz Test.' 
                  : 'Structured 3-Phase learning: Phase 1 (Plain-Language Theory) -> Phase 2 (15 Essential Q&As) -> Phase 3 (Comprehensive Quiz).'}
              </p>
            </div>

            <div style="display: flex; gap: 12px; align-items: center;">
              <div style="font-size: 13.5px; color: var(--emerald-glow); background: rgba(16, 185, 129, 0.1); padding: 8px 16px; border-radius: var(--radius-sm); border: 1px solid rgba(16, 185, 129, 0.3); font-weight: 700;">
                ${stats.completedTopicsCount} / ${ALL_TOPICS.length} ${isHinglish ? 'Topics Pass Kiye' : 'Topics Mastered'}
              </div>
            </div>
          </div>
        </div>

        <!-- Domain Filters Bar -->
        <div class="domain-filter-bar" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px;">
          <span class="filter-pill ${activeDomain === 'all' ? 'active' : ''}" data-domain="all">
            ${isHinglish ? 'Sabhi Topics' : 'All Topics'} (${ALL_TOPICS.length})
          </span>
          ${DOMAINS.map(d => {
            const count = ALL_TOPICS.filter(t => t.domainId === d.id).length;
            const isActive = activeDomain === d.id;
            return `
              <span class="filter-pill ${isActive ? 'active' : ''}" data-domain="${d.id}" style="${isActive ? `border-color: ${d.color}; color: ${d.color}; background: rgba(14, 165, 233, 0.1);` : ''}">
                ${d.name} (${count})
              </span>
            `;
          }).join('')}
        </div>

        <!-- Topics Grid -->
        <div class="topics-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 18px;">
          ${filtered.length === 0 ? `
            <div class="card-tactical" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
              <p style="color: var(--text-dim);">${isHinglish ? 'Koi topic match nahi hua.' : 'No topics match your current search query.'}</p>
            </div>
          ` : filtered.map(topic => {
            const topicProgress = progress[topic.id] || { phase1: false, phase2: false, phase3: false, bestScore: 0 };
            const domainObj = DOMAINS.find(d => d.id === topic.domainId) || DOMAINS[0];

            return `
              <div class="card-tactical topic-card" data-topic-id="${topic.id}" style="margin-bottom: 0; cursor: pointer; display: flex; flex-direction: column; justify-content: space-between; border-top: 3px solid ${domainObj.color};">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span class="tag-pill" style="font-size: 10px; border-color: ${domainObj.color}; color: ${domainObj.color};">
                      ${domainObj.name}
                    </span>
                    <span style="font-size: 11.5px; color: var(--text-dim); font-weight: 600;">
                      ⏱️ ${topic.readTime}
                    </span>
                  </div>

                  <h3 style="font-size: 16px; font-weight: 700; color: var(--text-bright); margin-bottom: 8px; line-height: 1.3;">
                    ${topic.title}
                  </h3>
                  
                  <p style="font-size: 13.5px; color: var(--text-muted); line-height: 1.5; margin-bottom: 14px;">
                    ${topic.phase1.overview}
                  </p>
                </div>

                <div>
                  <!-- Tags -->
                  <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px;">
                    ${topic.tags.slice(0, 3).map(tag => `
                      <span class="tag-pill" style="font-size: 10px; background: var(--bg-surface-elevated); color: var(--text-dim);">
                        ${tag}
                      </span>
                    `).join('')}
                  </div>

                  <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 12px;">
                    <!-- 3 Phase Progress Indicators -->
                    <div style="display: flex; gap: 4px;">
                      <span style="font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 700; background: ${topicProgress.phase1 ? 'rgba(16, 185, 129, 0.2)' : 'var(--bg-surface-elevated)'}; color: ${topicProgress.phase1 ? '#10b981' : 'var(--text-dim)'}; border: 1px solid ${topicProgress.phase1 ? '#10b981' : 'var(--border-subtle)'};">
                        P1: Theory
                      </span>
                      <span style="font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 700; background: ${topicProgress.phase2 ? 'rgba(16, 185, 129, 0.2)' : 'var(--bg-surface-elevated)'}; color: ${topicProgress.phase2 ? '#10b981' : 'var(--text-dim)'}; border: 1px solid ${topicProgress.phase2 ? '#10b981' : 'var(--border-subtle)'};">
                        P2: 15 Q&A
                      </span>
                      <span style="font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 700; background: ${topicProgress.phase3 ? 'rgba(16, 185, 129, 0.2)' : 'var(--bg-surface-elevated)'}; color: ${topicProgress.phase3 ? '#10b981' : 'var(--text-dim)'}; border: 1px solid ${topicProgress.phase3 ? '#10b981' : 'var(--border-subtle)'};">
                        P3: Quiz
                      </span>
                    </div>

                    <button class="btn btn-cyan btn-sm btn-start-topic" data-topic-id="${topic.id}">
                      ${isHinglish ? 'Topic Shuru Karein →' : 'Start Topic →'}
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // Filter clicks
    container.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        cyberAudio.playClick();
        activeDomain = pill.getAttribute('data-domain');
        render();
      });
    });

    // Topic clicks
    container.querySelectorAll('.topic-card, .btn-start-topic').forEach(card => {
      card.addEventListener('click', (e) => {
        cyberAudio.playClick();
        const topicId = card.getAttribute('data-topic-id');
        if (topicId && typeof onSelectTopic === 'function') {
          onSelectTopic(topicId, 1);
        }
      });
    });
  }

  // Allow global search bar in topbar to filter grid
  window.setCurriculumSearch = (val) => {
    searchTerm = (val || '').toLowerCase().trim();
    render();
  };

  render();

  // Listen for language change
  window.addEventListener('cyber_language_changed', () => {
    render();
  });
}
