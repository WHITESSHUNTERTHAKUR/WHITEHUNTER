import { ALL_TOPICS, DOMAINS, getTopicsByDomain } from '../data/allTopics.js';
import { DefenseStorage } from '../utils/storage.js';
import { cyberAudio } from './audio.js';

export function renderCurriculumGrid(container, onSelectTopic) {
  let activeDomain = 'all';
  let searchTerm = '';

  function render() {
    const progress = DefenseStorage.getTopicProgress();
    const stats = DefenseStorage.getOverallStats();

    const filtered = ALL_TOPICS.filter(t => {
      const matchDomain = activeDomain === 'all' || t.domainId === activeDomain;
      const matchSearch = searchTerm === '' ||
        t.title.toLowerCase().includes(searchTerm) ||
        t.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        t.phase1.overview.toLowerCase().includes(searchTerm);
      return matchDomain && matchSearch;
    });

    container.innerHTML = `
      <div class="curriculum-viewport">
        <!-- Hero Header -->
        <div class="curriculum-header">
          <div class="curriculum-title">
            <span class="tag-pill" style="border-color: var(--cyan-glow); margin-bottom: 6px; display: inline-block;">
              TACTICAL CURRICULUM // ${ALL_TOPICS.length} MISSION TOPICS
            </span>
            <h2>Cyber Security, Networking & Ethical Hacking Academy</h2>
            <p>Comprehensive 3-Phase structured training: Theory with Tactical Scenarios -> Q&A Mastery -> Mission Quiz & Intelligence Evaluation.</p>
          </div>

          <div style="display: flex; gap: 12px; align-items: center;">
            <div style="font-family: var(--font-mono); font-size: 13px; color: var(--emerald-glow); background: rgba(16, 185, 129, 0.1); padding: 8px 14px; border-radius: var(--radius-sm); border: 1px solid rgba(16, 185, 129, 0.3);">
              ${stats.completedTopicsCount} / ${ALL_TOPICS.length} TOPICS CERTIFIED
            </div>
          </div>
        </div>

        <!-- Domain Filters Bar -->
        <div class="domain-filter-bar">
          <span class="filter-pill ${activeDomain === 'all' ? 'active' : ''}" data-domain="all">
            All Domains (${ALL_TOPICS.length})
          </span>
          ${DOMAINS.map(d => {
            const count = ALL_TOPICS.filter(t => t.domainId === d.id).length;
            const isActive = activeDomain === d.id;
            return `
              <span class="filter-pill ${isActive ? 'active' : ''}" data-domain="${d.id}" style="${isActive ? `border-color: ${d.color}; color: ${d.color}; background: rgba(0, 242, 254, 0.08);` : ''}">
                ${d.name} (${count})
              </span>
            `;
          }).join('')}
        </div>

        <!-- Topics Grid -->
        <div class="topics-grid">
          ${filtered.length === 0 ? `
            <div class="card-tactical" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
              <p style="color: var(--text-dim);">No training topics match your current search query.</p>
            </div>
          ` : filtered.map(topic => {
            const topicProgress = progress[topic.id] || { phase1: false, phase2: false, phase3: false, bestScore: 0 };
            const domainObj = DOMAINS.find(d => d.id === topic.domainId) || DOMAINS[0];

            return `
              <div class="topic-card" data-topic-id="${topic.id}">
                <div>
                  <div class="topic-header">
                    <span class="topic-domain-badge" style="background: rgba(0,0,0,0.4); border: 1px solid ${domainObj.color}; color: ${domainObj.color};">
                      ${domainObj.name}
                    </span>
                    <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-dim);">
                      ${topic.readTime}
                    </span>
                  </div>

                  <h3>${topic.title}</h3>
                  <p>${topic.phase1.overview}</p>
                </div>

                <div>
                  <!-- Tags -->
                  <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px;">
                    ${topic.tags.slice(0, 3).map(tag => `
                      <span style="font-size: 10px; font-family: var(--font-mono); padding: 2px 6px; border-radius: 2px; background: rgba(255,255,255,0.04); color: var(--text-muted);">
                        ${tag}
                      </span>
                    `).join('')}
                  </div>

                  <div class="topic-footer">
                    <!-- 3 Phase Progress Indicators -->
                    <div class="phase-progress-indicators" title="Training Progress: Phase 1 (Theory), Phase 2 (Q&A), Phase 3 (Quiz)">
                      <span class="phase-dot ${topicProgress.phase1 ? 'completed' : ''}">P1: Theory</span>
                      <span class="phase-dot ${topicProgress.phase2 ? 'completed' : ''}">P2: Q&A</span>
                      <span class="phase-dot ${topicProgress.phase3 ? 'completed' : ''}">P3: Quiz</span>
                    </div>

                    ${topicProgress.bestScore > 0 ? `
                      <span style="font-family: var(--font-mono); font-size: 11px; font-weight: 700; color: ${topicProgress.bestScore >= 70 ? 'var(--emerald-glow)' : 'var(--amber-glow)'};">
                        ★ ${topicProgress.bestScore}%
                      </span>
                    ` : `
                      <span style="font-size: 12px; color: var(--cyan-glow); font-family: var(--font-tactical);">
                        Start →
                      </span>
                    `}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // Event listeners
    container.querySelectorAll('[data-domain]').forEach(pill => {
      pill.addEventListener('click', () => {
        cyberAudio.playClick();
        activeDomain = pill.getAttribute('data-domain');
        render();
      });
    });

    container.querySelectorAll('.topic-card').forEach(card => {
      card.addEventListener('click', () => {
        cyberAudio.playClick();
        const topicId = card.getAttribute('data-topic-id');
        onSelectTopic(topicId, 1);
      });
    });
  }

  // Allow parent search bar to filter
  window.setCurriculumSearch = function(query) {
    searchTerm = query.toLowerCase().trim();
    render();
  };

  render();
}
