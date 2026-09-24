import { cyberAudio } from './audio.js';
import { DefenseStorage } from '../utils/storage.js';

export function renderPhase1(topic, container, onNavigate) {
  // Mark Phase 1 as completed in user progress
  DefenseStorage.markPhaseComplete(topic.id, 1);

  container.innerHTML = `
    <div class="theory-layout">
      <!-- Hero Banner -->
      <div class="theory-hero">
        <div class="theory-hero-tags">
          <span class="tag-pill" style="border-color: var(--cyan-glow)">PHASE 1: THEORETICAL & TACTICAL ANALYSIS</span>
          <span class="tag-pill">${topic.level}</span>
          <span class="tag-pill">${topic.readTime}</span>
          ${topic.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}
        </div>
        <h1>${topic.title}</h1>
        <p>${topic.phase1.overview}</p>
        <div style="margin-top: 16px; display: flex; gap: 12px; align-items: center;">
          <button class="btn btn-cyan btn-sm" id="btn-read-theory">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
            <span id="audio-read-label">Listen Briefing</span>
          </button>
          <span style="font-size: 12px; color: var(--emerald-glow); font-family: var(--font-tactical);">
            ✓ PHASE 1 REGISTERED IN TRAINING LOG
          </span>
        </div>
      </div>

      <!-- Architecture Section -->
      <div class="card-tactical">
        <h3 style="font-size: 18px; margin-bottom: 12px; color: var(--cyan-glow); display: flex; align-items: center; gap: 8px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
          Tactical Architecture & Defense Matrix
        </h3>
        <div class="architecture-box">${topic.phase1.architecture}</div>
      </div>

      <!-- Deep Dive Analysis -->
      <div class="card-tactical">
        <h3 style="font-size: 18px; margin-bottom: 16px; color: var(--text-bright);">
          Technical Deep Dive & Protocol Mechanics
        </h3>
        <div style="line-height: 1.7; color: var(--text-primary); font-size: 15px;">
          ${topic.phase1.deepDive.replace(/### (.*?)\n/g, '<h4 style="color: var(--cyan-glow); margin: 16px 0 8px 0; font-size: 16px;">$1</h4>').replace(/\*\*(.*?)\*\*/g, '<strong style="color: #fff;">$1</strong>')}
        </div>
      </div>

      <!-- Tactical Commands & Playbooks -->
      <div class="card-tactical">
        <h3 style="font-size: 18px; margin-bottom: 16px; color: var(--emerald-glow); display: flex; align-items: center; gap: 8px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
          Tactical Commands & SOC Verification Syntax
        </h3>
        <div class="commands-list">
          ${topic.phase1.commands.map(cmd => `
            <div class="code-command-row">
              <div>
                <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 4px; font-family: var(--font-tactical);">${cmd.label}</div>
                <div class="command-text">${escapeHtml(cmd.cmd)}</div>
              </div>
              <button class="btn btn-outline btn-sm btn-copy-cmd" data-cmd="${encodeURIComponent(cmd.cmd)}" title="Copy Command">
                Copy
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Real-World Case Study -->
      <div class="case-study-box">
        <h4>🚨 REAL-WORLD INCIDENT CASE STUDY: ${topic.phase1.realWorldCaseStudy.title}</h4>
        <p style="margin-bottom: 10px; font-size: 14px; color: var(--text-primary);">${topic.phase1.realWorldCaseStudy.summary}</p>
        <div style="font-size: 13px; color: #fca5a5; font-weight: 600;">
          <strong>Tactical Defense Lesson:</strong> ${topic.phase1.realWorldCaseStudy.lesson}
        </div>
      </div>

      <!-- Tactical Takeaways Checklist -->
      <div class="card-tactical">
        <h3 style="font-size: 18px; margin-bottom: 12px; color: var(--amber-glow);">
          Field Defense Rules of Engagement
        </h3>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px;">
          ${topic.phase1.tacticalTakeaways.map(t => `
            <li style="display: flex; align-items: flex-start; gap: 10px; font-size: 14px;">
              <span style="color: var(--amber-glow); font-weight: bold;">[SEC-RULE]</span>
              <span>${t}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Transition to Phase 2 & 3 Bar -->
      <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface); padding: 18px 24px; border-radius: var(--radius-md); border: 1px solid var(--border-accent); margin-top: 8px;">
        <div>
          <div style="font-family: var(--font-tactical); font-size: 13px; color: var(--text-muted);">PHASE 1 COMPLETE</div>
          <div style="font-weight: 700; color: var(--text-bright);">Ready for Q&A Mastery & Tactical Scenarios?</div>
        </div>
        <div style="display: flex; gap: 12px;">
          <button class="btn btn-outline" id="btn-next-phase-quiz">Jump to Quiz</button>
          <button class="btn btn-cyan" id="btn-next-phase-qa">Proceed to Phase 2: Q&A →</button>
        </div>
      </div>
    </div>
  `;

  // Attach event handlers
  setupPhase1Listeners(topic, container, onNavigate);
}

function setupPhase1Listeners(topic, container, onNavigate) {
  // Copy command buttons
  container.querySelectorAll('.btn-copy-cmd').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const rawCmd = decodeURIComponent(btn.getAttribute('data-cmd'));
      navigator.clipboard.writeText(rawCmd);
      cyberAudio.playClick();
      btn.innerText = 'Copied!';
      btn.style.color = 'var(--emerald-glow)';
      btn.style.borderColor = 'var(--emerald-glow)';
      setTimeout(() => {
        btn.innerText = 'Copy';
        btn.style.color = '';
        btn.style.borderColor = '';
      }, 2000);
    });
  });

  // Audio briefing button
  const audioBtn = container.querySelector('#btn-read-theory');
  const audioLabel = container.querySelector('#audio-read-label');
  let isBriefingPlaying = false;

  audioBtn.addEventListener('click', () => {
    if (isBriefingPlaying) {
      cyberAudio.stopSpeaking();
      audioLabel.innerText = 'Listen Briefing';
      isBriefingPlaying = false;
    } else {
      cyberAudio.playClick();
      audioLabel.innerText = 'Stop Audio';
      isBriefingPlaying = true;
      const speechText = `${topic.title}. ${topic.phase1.overview}. Tactical Takeaways: ${topic.phase1.tacticalTakeaways.join('. ')}`;
      cyberAudio.speakText(speechText, () => {
        audioLabel.innerText = 'Listen Briefing';
        isBriefingPlaying = false;
      });
    }
  });

  // Navigation transitions
  container.querySelector('#btn-next-phase-qa').addEventListener('click', () => {
    cyberAudio.playClick();
    cyberAudio.stopSpeaking();
    onNavigate(topic.id, 2);
  });

  container.querySelector('#btn-next-phase-quiz').addEventListener('click', () => {
    cyberAudio.playClick();
    cyberAudio.stopSpeaking();
    onNavigate(topic.id, 3);
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
