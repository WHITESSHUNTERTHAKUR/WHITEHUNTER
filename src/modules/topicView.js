import { getTopicById } from '../data/allTopics.js';
import { renderPhase1 } from './phase1Theory.js';
import { renderPhase2 } from './phase2QA.js';
import { renderPhase3Quiz } from './phase3Quiz.js';
import { cyberAudio } from './audio.js';

export function renderTopicView(topicId, initialPhase, container, onNavigate) {
  const topic = getTopicById(topicId);
  let currentPhase = initialPhase || 1;

  function render() {
    container.innerHTML = `
      <div class="topic-detail-viewport" style="max-width: 1040px; margin: 0 auto;">
        <!-- Breadcrumb & Back -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <button class="btn btn-outline btn-sm" id="btn-back-to-grid">
            ← Return to Curriculum Grid
          </button>
          <div style="font-family: var(--font-mono); font-size: 12px; color: var(--text-dim);">
            MODULE: ${topic.id.toUpperCase()} // ${topic.readTime}
          </div>
        </div>

        <!-- 3-Phase Navigation Tabs -->
        <div class="phase-nav-container">
          <div class="phase-tab ${currentPhase === 1 ? 'active' : ''}" data-phase="1">
            <div class="phase-number">1</div>
            <div>Phase 1: Theory & Scenarios</div>
          </div>
          <div class="phase-tab ${currentPhase === 2 ? 'active' : ''}" data-phase="2">
            <div class="phase-number">2</div>
            <div>Phase 2: Important Q&A</div>
          </div>
          <div class="phase-tab ${currentPhase === 3 ? 'active' : ''}" data-phase="3">
            <div class="phase-number">3</div>
            <div>Phase 3: Questions Quiz</div>
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
}
