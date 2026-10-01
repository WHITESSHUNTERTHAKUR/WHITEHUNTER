import { getTopicById } from '../data/allTopics.js';
import { renderPhase1 } from './phase1Theory.js';
import { renderPhase2 } from './phase2QA.js';
import { renderPhase3Quiz } from './phase3Quiz.js';
import { cyberAudio } from './audio.js';
import { i18n } from '../utils/i18n.js';

export function renderTopicView(topicId, initialPhase, container, onNavigate) {
  const topic = getTopicById(topicId);
  let currentPhase = initialPhase || 1;

  function render() {
    const isHinglish = i18n.getLanguage() === 'hinglish';

    container.innerHTML = `
      <div class="topic-detail-viewport" style="max-width: 1040px; margin: 0 auto;">
        <!-- Breadcrumb & Back -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <button class="btn btn-outline btn-sm" id="btn-back-to-grid">
            ${isHinglish ? '← Curriculum Par Wapas Jayein' : '← Return to Curriculum Grid'}
          </button>
          <div style="font-size: 12px; color: var(--text-dim); font-weight: 600;">
            TOPIC: ${topic.id.toUpperCase()} // ${topic.readTime}
          </div>
        </div>

        <!-- 3-Phase Navigation Tabs -->
        <div class="phase-nav-container" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px;">
          <div class="card-tactical phase-tab ${currentPhase === 1 ? 'active' : ''}" data-phase="1" style="margin-bottom: 0; padding: 14px; cursor: pointer; display: flex; align-items: center; gap: 12px; border-left: 3px solid ${currentPhase === 1 ? 'var(--cyan-glow)' : 'var(--border-subtle)'}; background: ${currentPhase === 1 ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)'};">
            <div style="width: 28px; height: 28px; border-radius: 50%; background: ${currentPhase === 1 ? 'var(--cyan-glow)' : 'var(--border-subtle)'}; color: ${currentPhase === 1 ? '#020712' : 'var(--text-bright)'}; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px;">1</div>
            <div>
              <strong style="color: var(--text-bright); display: block; font-size: 13.5px;">Phase 1: Theory</strong>
              <span style="font-size: 11.5px; color: var(--text-muted);">${isHinglish ? 'Aasan Samjh' : 'Plain Language'}</span>
            </div>
          </div>

          <div class="card-tactical phase-tab ${currentPhase === 2 ? 'active' : ''}" data-phase="2" style="margin-bottom: 0; padding: 14px; cursor: pointer; display: flex; align-items: center; gap: 12px; border-left: 3px solid ${currentPhase === 2 ? 'var(--cyan-glow)' : 'var(--border-subtle)'}; background: ${currentPhase === 2 ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)'};">
            <div style="width: 28px; height: 28px; border-radius: 50%; background: ${currentPhase === 2 ? 'var(--cyan-glow)' : 'var(--border-subtle)'}; color: ${currentPhase === 2 ? '#020712' : 'var(--text-bright)'}; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px;">2</div>
            <div>
              <strong style="color: var(--text-bright); display: block; font-size: 13.5px;">Phase 2: 15 Q&A</strong>
              <span style="font-size: 11.5px; color: var(--text-muted);">${isHinglish ? 'Zaroori Sawaal' : 'Questions & Answers'}</span>
            </div>
          </div>

          <div class="card-tactical phase-tab ${currentPhase === 3 ? 'active' : ''}" data-phase="3" style="margin-bottom: 0; padding: 14px; cursor: pointer; display: flex; align-items: center; gap: 12px; border-left: 3px solid ${currentPhase === 3 ? 'var(--cyan-glow)' : 'var(--border-subtle)'}; background: ${currentPhase === 3 ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)'};">
            <div style="width: 28px; height: 28px; border-radius: 50%; background: ${currentPhase === 3 ? 'var(--cyan-glow)' : 'var(--border-subtle)'}; color: ${currentPhase === 3 ? '#020712' : 'var(--text-bright)'}; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px;">3</div>
            <div>
              <strong style="color: var(--text-bright); display: block; font-size: 13.5px;">Phase 3: Quiz</strong>
              <span style="font-size: 11.5px; color: var(--text-muted);">${isHinglish ? 'Knowledge Test' : 'Knowledge Test'}</span>
            </div>
          </div>
        </div>

        <!-- Active Phase Sub-container -->
        <div id="active-phase-subcontainer"></div>
      </div>
    `;

    // Phase tab listeners
    container.querySelectorAll('.phase-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        cyberAudio.playClick();
        cyberAudio.stopSpeaking();
        currentPhase = parseInt(tab.getAttribute('data-phase'), 10);
        render();
      });
    });

    container.querySelector('#btn-back-to-grid').addEventListener('click', () => {
      cyberAudio.playClick();
      cyberAudio.stopSpeaking();
      window.location.hash = '#curriculum';
    });

    const subContainer = container.querySelector('#active-phase-subcontainer');
    if (currentPhase === 1) {
      renderPhase1(topic, subContainer, (tId, pNum) => {
        currentPhase = pNum;
        render();
      });
    } else if (currentPhase === 2) {
      renderPhase2(topic, subContainer, (tId, pNum) => {
        currentPhase = pNum;
        render();
      });
    } else if (currentPhase === 3) {
      renderPhase3Quiz(topic, subContainer, (tId, pNum) => {
        currentPhase = pNum;
        render();
      });
    }
  }

  render();

  window.addEventListener('cyber_language_changed', () => {
    render();
  });
}
