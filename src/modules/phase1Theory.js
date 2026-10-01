import { cyberAudio } from './audio.js';
import { DefenseStorage } from '../utils/storage.js';
import { i18n } from '../utils/i18n.js';

export function renderPhase1(topic, container, onNavigate) {
  // Mark Phase 1 as completed in user progress
  DefenseStorage.markPhaseComplete(topic.id, 1);

  const isHinglish = i18n.getLanguage() === 'hinglish';

  container.innerHTML = `
    <div class="theory-layout">
      <!-- Hero Banner -->
      <div class="card-tactical" style="background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%); border-left: 4px solid var(--cyan-glow); margin-bottom: 20px;">
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
          <span class="tag-pill" style="border-color: var(--cyan-glow)">
            ${isHinglish ? 'PHASE 1: THEORY & AASAN SAMJH' : 'PHASE 1: THEORY & FUNDAMENTAL CONCEPTS'}
          </span>
          <span class="tag-pill">${topic.level}</span>
          <span class="tag-pill">${topic.readTime}</span>
          ${topic.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}
        </div>

        <h1 style="font-size: 24px; color: var(--text-bright); margin-bottom: 10px; line-height: 1.3;">
          ${topic.title}
        </h1>

        <p style="font-size: 15px; color: var(--text-primary); line-height: 1.6; margin-bottom: 16px;">
          ${topic.phase1.overview}
        </p>

        <!-- Simple Language Explanation & Everyday Analogy Box -->
        <div class="card-tactical" style="background: var(--bg-surface); border: 1px solid var(--border-accent); padding: 16px; margin-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span style="font-size: 18px;">💡</span>
            <strong style="color: var(--gold-crest); font-size: 15px;">
              ${isHinglish ? 'Aasan Bhasha Me Samjho (Simple Words):' : 'In Simple Everyday Words:'}
            </strong>
          </div>
          <p style="font-size: 14.5px; color: var(--text-bright); line-height: 1.5; margin-bottom: 10px;">
            ${isHinglish ? (topic.phase1.simpleExplanation.hi || topic.phase1.simpleExplanation.en) : topic.phase1.simpleExplanation.en}
          </p>
          <div style="font-size: 13.5px; color: var(--cyan-glow); line-height: 1.5; border-top: 1px dashed var(--border-subtle); padding-top: 8px;">
            <strong>${isHinglish ? '🔍 Real-Life Example:' : '🔍 Everyday Analogy:'}</strong> 
            ${isHinglish ? (topic.phase1.realWorldAnalogy.hi || topic.phase1.realWorldAnalogy.en) : topic.phase1.realWorldAnalogy.en}
          </div>
        </div>

        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
          <button class="btn btn-cyan btn-sm" id="btn-read-theory">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
            <span id="audio-read-label">${isHinglish ? 'Audio Sunein' : 'Listen Briefing'}</span>
          </button>
          <span style="font-size: 12.5px; color: var(--emerald-glow); font-weight: 600;">
            ✓ ${isHinglish ? 'PHASE 1 COMPLETE HO GAYA' : 'PHASE 1 REGISTERED IN TRAINING LOG'}
          </span>
        </div>
      </div>

      <!-- Architecture Section -->
      <div class="card-tactical">
        <h3 style="font-size: 17px; margin-bottom: 12px; color: var(--cyan-glow); display: flex; align-items: center; gap: 8px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
          ${isHinglish ? 'Architecture & Visual Flow' : 'Technical Architecture & Flow'}
        </h3>
        <pre style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); padding: 14px; border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 13px; color: #38bdf8; overflow-x: auto; line-height: 1.5;">${escapeHtml(topic.phase1.architecture)}</pre>
      </div>

      <!-- Deep Dive Analysis -->
      <div class="card-tactical">
        <h3 style="font-size: 17px; margin-bottom: 14px; color: var(--text-bright);">
          ${isHinglish ? 'Technical Deep Dive (Kaise Kaam Karta Hai)' : 'Technical Deep Dive & Protocol Mechanics'}
        </h3>
        <div style="line-height: 1.7; color: var(--text-primary); font-size: 14.5px;">
          ${topic.phase1.deepDive.replace(/### (.*?)\n/g, '<h4 style="color: var(--cyan-glow); margin: 16px 0 8px 0; font-size: 16px;">$1</h4>').replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--text-bright);">$1</strong>')}
        </div>
      </div>

      <!-- Practical Commands -->
      <div class="card-tactical">
        <h3 style="font-size: 17px; margin-bottom: 16px; color: var(--emerald-glow); display: flex; align-items: center; gap: 8px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
          ${isHinglish ? 'Terminal Commands (Practice Ke Liye)' : 'Practical Commands & Verification Syntax'}
        </h3>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${topic.phase1.commands.map(cmd => `
            <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap;">
              <div>
                <div style="font-size: 12px; color: var(--text-dim); margin-bottom: 4px; font-weight: 600;">${cmd.label}</div>
                <code style="font-family: var(--font-mono); font-size: 13px; color: var(--cyan-glow);">${escapeHtml(cmd.cmd)}</code>
              </div>
              <button class="btn btn-outline btn-sm btn-copy-cmd" data-cmd="${encodeURIComponent(cmd.cmd)}" title="Copy Command">
                Copy
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Real-World Incident Case Study -->
      <div class="card-tactical" style="border-left: 4px solid var(--crimson-glow);">
        <h4 style="color: var(--crimson-glow); font-size: 16px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
          🚨 ${isHinglish ? 'REAL-WORLD INCIDENT CASE STUDY' : 'REAL-WORLD INCIDENT CASE STUDY'}: ${topic.phase1.realWorldCaseStudy.title}
        </h4>
        <p style="margin-bottom: 10px; font-size: 14px; color: var(--text-primary); line-height: 1.5;">
          ${topic.phase1.realWorldCaseStudy.summary}
        </p>
        <div style="font-size: 13px; color: #fca5a5; font-weight: 600; padding: 8px 12px; background: rgba(239, 68, 68, 0.1); border-radius: var(--radius-sm);">
          <strong>${isHinglish ? 'Zaroori Sabak (Lesson):' : 'Defense Lesson:'}</strong> ${topic.phase1.realWorldCaseStudy.lesson}
        </div>
      </div>

      <!-- Tactical Takeaways Checklist -->
      <div class="card-tactical">
        <h3 style="font-size: 17px; margin-bottom: 12px; color: var(--amber-glow);">
          ${isHinglish ? '5 Zaroori Security Rules (Yaad Rakhein)' : 'Essential Cyber Defense Rules'}
        </h3>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px;">
          ${topic.phase1.tacticalTakeaways.map(t => `
            <li style="display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: var(--text-primary);">
              <span style="color: var(--amber-glow); font-weight: bold;">[SEC-RULE]</span>
              <span>${t}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Transition to Phase 2 Bar -->
      <div class="card-tactical" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; margin-top: 10px;">
        <div>
          <div style="font-size: 12px; color: var(--emerald-glow); font-weight: 700;">
            ${isHinglish ? 'PHASE 1 PURA HO GAYA' : 'PHASE 1 COMPLETE'}
          </div>
          <div style="font-weight: 700; color: var(--text-bright); font-size: 15px;">
            ${isHinglish ? 'Ab 15 Zaroori Sawaal & Jawab (Q&A) Dekhein' : 'Ready for 15 Essential Q&A Questions?'}
          </div>
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="btn btn-outline btn-sm" id="btn-next-phase-quiz">
            ${isHinglish ? 'Seedhe Quiz Par Jayein' : 'Jump to Quiz'}
          </button>
          <button class="btn btn-cyan btn-sm" id="btn-next-phase-qa">
            ${isHinglish ? 'Phase 2: Q&A Par Jayein →' : 'Proceed to Phase 2: Q&A →'}
          </button>
        </div>
      </div>
    </div>
  `;

  setupPhase1Listeners(topic, container, onNavigate);
}

function setupPhase1Listeners(topic, container, onNavigate) {
  // Copy command buttons
  container.querySelectorAll('.btn-copy-cmd').forEach(btn => {
    btn.addEventListener('click', () => {
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

  audioBtn?.addEventListener('click', () => {
    if (isBriefingPlaying) {
      cyberAudio.stopSpeaking();
      audioLabel.innerText = i18n.getLanguage() === 'hinglish' ? 'Audio Sunein' : 'Listen Briefing';
      isBriefingPlaying = false;
    } else {
      cyberAudio.playClick();
      audioLabel.innerText = i18n.getLanguage() === 'hinglish' ? 'Audio Rokein' : 'Stop Audio';
      isBriefingPlaying = true;
      const speechText = `${topic.title}. ${topic.phase1.overview}. Key takeaways: ${topic.phase1.tacticalTakeaways.join('. ')}`;
      cyberAudio.speakText(speechText, () => {
        audioLabel.innerText = i18n.getLanguage() === 'hinglish' ? 'Audio Sunein' : 'Listen Briefing';
        isBriefingPlaying = false;
      });
    }
  });

  // Navigation transitions
  container.querySelector('#btn-next-phase-qa')?.addEventListener('click', () => {
    cyberAudio.playClick();
    cyberAudio.stopSpeaking();
    onNavigate(topic.id, 2);
  });

  container.querySelector('#btn-next-phase-quiz')?.addEventListener('click', () => {
    cyberAudio.playClick();
    cyberAudio.stopSpeaking();
    onNavigate(topic.id, 3);
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
