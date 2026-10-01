import { cyberAudio } from './audio.js';
import { DefenseStorage } from '../utils/storage.js';

export function renderPerformanceReport(result, topic, container, onNavigate) {
  const mins = Math.floor(result.timeSpentSec / 60);
  const secs = result.timeSpentSec % 60;
  const timeFormatted = `${mins}m ${secs}s`;
  const avgTimePerQ = Math.round(result.timeSpentSec / result.total);

  // SVG Circular Gauge calculation
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (result.percentage / 100) * circumference;

  let gradeBadgeColor = 'var(--cyan-glow)';
  let gradeBadgeBg = 'rgba(0, 242, 254, 0.15)';
  let verdictText = 'MISSION ACCOMPLISHED: OPERATIONAL READINESS CONFIRMED';

  if (result.percentage >= 85) {
    gradeBadgeColor = 'var(--emerald-glow)';
    gradeBadgeBg = 'rgba(16, 185, 129, 0.15)';
    verdictText = 'EXEMPLARY TACTICAL EXCELLENCE - HIGH DISTINCTION';
  } else if (result.percentage >= 60) {
    gradeBadgeColor = 'var(--cyan-glow)';
    gradeBadgeBg = 'rgba(0, 242, 254, 0.15)';
    verdictText = 'OPERATIONAL STANDARD ACHIEVED - MISSION CLEARED';
  } else {
    gradeBadgeColor = 'var(--crimson-glow)';
    gradeBadgeBg = 'rgba(239, 68, 68, 0.15)';
    verdictText = 'SECURITY VULNERABILITY DETECTED - REMEDIATION REQUIRED';
  }

  // Identify strengths & vulnerabilities
  const correctCount = result.score;
  const incorrectCount = result.total - result.score;
  const profile = DefenseStorage.getUserProfile();

  container.innerHTML = `
    <div class="report-viewport" style="max-width: 960px; margin: 0 auto;">
      <!-- Top Action Bar -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
        <div>
          <span class="tag-pill" style="border-color: ${gradeBadgeColor}; color: ${gradeBadgeColor};">
            INTELLIGENCE EVALUATION REPORT
          </span>
          <h2 style="font-size: 24px; color: var(--text-bright); margin-top: 4px;">${topic.title}</h2>
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="btn btn-outline" id="btn-retake-quiz">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>
            Retake Mission
          </button>
          <button class="btn btn-emerald" id="btn-print-cert">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            Export / Print Defense Certificate
          </button>
        </div>
      </div>

      <!-- Hero Score Card -->
      <div class="report-hero-card">
        <div style="display: flex; align-items: center; gap: 24px; flex-wrap: wrap;">
          <div class="score-circle-wrap">
            <svg class="score-circle-svg" viewBox="0 0 140 140">
              <circle class="score-circle-bg" cx="70" cy="70" r="${radius}"></circle>
              <circle class="score-circle-bar" cx="70" cy="70" r="${radius}" 
                style="stroke: ${gradeBadgeColor}; stroke-dasharray: ${circumference}; stroke-dashoffset: ${strokeOffset};">
              </circle>
            </svg>
            <div class="score-text-centered">
              <div class="score-number" style="color: ${gradeBadgeColor};">${result.percentage}%</div>
              <div class="score-label">ACCURACY</div>
            </div>
          </div>

          <div>
            <div style="display: inline-block; padding: 4px 10px; border-radius: var(--radius-sm); font-size: 11px; font-family: var(--font-mono); font-weight: 700; background: ${gradeBadgeBg}; color: ${gradeBadgeColor}; border: 1px solid ${gradeBadgeColor}; margin-bottom: 8px;">
              ${result.rankAwarded}
            </div>
            <h3 style="font-size: 20px; font-weight: 700; color: var(--text-bright); margin-bottom: 4px;">
              ${verdictText}
            </h3>
            <p style="font-size: 14px; color: var(--text-muted);">
              Candidate: <strong style="color: #fff;">${profile.name}</strong> (${profile.callsign}) | Score: <strong>${result.score}</strong> of <strong>${result.total}</strong> Correct
            </p>
          </div>
        </div>

        <div style="text-align: right;">
          <div style="font-size: 12px; color: var(--text-dim); font-family: var(--font-mono);">MISSION LOG ID</div>
          <div style="font-family: var(--font-mono); font-size: 13px; color: var(--cyan-glow);">${result.id}</div>
          <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">
            ${new Date(result.timestamp).toLocaleString()}
          </div>
        </div>
      </div>

      <!-- Tactical Analytics Metrics Grid -->
      <div class="analytics-grid">
        <div class="stat-box">
          <div class="stat-title">Mission Duration</div>
          <div class="stat-val">${timeFormatted}</div>
          <div style="font-size: 11px; color: var(--text-dim); margin-top: 2px;">Total Tactical Time Elapsed</div>
        </div>

        <div class="stat-box">
          <div class="stat-title">Decision Velocity</div>
          <div class="stat-val">${avgTimePerQ}s</div>
          <div style="font-size: 11px; color: var(--text-dim); margin-top: 2px;">Average Time Per Question</div>
        </div>

        <div class="stat-box">
          <div class="stat-title">Correct Interceptions</div>
          <div class="stat-val" style="color: var(--emerald-glow);">${correctCount} / ${result.total}</div>
          <div style="font-size: 11px; color: var(--text-dim); margin-top: 2px;">Threats Successfully Mitigated</div>
        </div>

        <div class="stat-box">
          <div class="stat-title">Security Gaps</div>
          <div class="stat-val" style="color: ${incorrectCount > 0 ? 'var(--crimson-glow)' : 'var(--emerald-glow)'};">
            ${incorrectCount}
          </div>
          <div style="font-size: 11px; color: var(--text-dim); margin-top: 2px;">Incorrect / Unresolved Vectors</div>
        </div>
      </div>

      <!-- Strengths & Remediation Radar -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
        <div class="card-tactical" style="border-left: 4px solid var(--emerald-glow);">
          <h4 style="font-size: 15px; color: var(--emerald-glow); margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
            <span>🛡️</span> Verified Operational Strengths
          </h4>
          <p style="font-size: 13px; color: var(--text-primary); line-height: 1.5;">
            ${result.score > 0 ? 
              `Demonstrated solid proficiency in core theoretical mechanics and countermeasures for ${topic.title}. Answered ${result.score} scenario challenges with verified accuracy.` : 
              `Needs foundational reinforcement in ${topic.title}. Review Phase 1 theory documentation.`}
          </p>
        </div>

        <div class="card-tactical" style="border-left: 4px solid var(--amber-glow);">
          <h4 style="font-size: 15px; color: var(--amber-glow); margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
            <span>⚠️</span> Tactical Remediation Action Plan
          </h4>
          <p style="font-size: 13px; color: var(--text-primary); line-height: 1.5;">
            ${incorrectCount > 0 ? 
              `Review the ${incorrectCount} missed question(s) below. Re-read the technical deep dive section in Phase 1 before retaking this tactical mission.` : 
              `Zero vulnerabilities detected! 100% mission benchmark cleared. Proceed to advance to the next curriculum module.`}
          </p>
        </div>
      </div>

      <!-- Detailed Question-by-Question Review -->
      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 18px; color: var(--text-bright); margin-bottom: 14px; display: flex; align-items: center; justify-content: space-between;">
          <span>Comprehensive Question Audit & Tactical Rationale</span>
          <span style="font-size: 12px; color: var(--text-dim); font-family: var(--font-mono);">
            ${result.total} QUESTIONS AUDITED
          </span>
        </h3>

        <div class="review-questions-list">
          ${result.reviewData.map((item) => {
            const letters = ['A', 'B', 'C', 'D'];
            const userLetter = item.userAnswerIndex !== undefined ? letters[item.userAnswerIndex] : 'NONE';
            const correctLetter = letters[item.correctIndex];
            const isCorrect = item.isCorrect;

            return `
              <div class="review-question-card ${isCorrect ? 'correct' : 'wrong'}">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                  <span class="qa-badge" style="background: ${isCorrect ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)'}; color: ${isCorrect ? 'var(--emerald-glow)' : 'var(--crimson-glow)'};">
                    QUESTION ${item.number} : ${isCorrect ? '✓ CORRECT' : '✗ INCORRECT / MISSED'}
                  </span>
                  <span style="font-size: 11px; font-family: var(--font-mono); color: var(--text-dim);">
                    ${item.domainCategory}
                  </span>
                </div>

                ${item.scenario ? `
                  <div style="font-size: 13px; color: var(--text-muted); font-style: italic; margin-bottom: 8px;">
                    <strong>Scenario:</strong> ${item.scenario}
                  </div>
                ` : ''}

                <div style="font-size: 15px; font-weight: 700; color: var(--text-bright); margin-bottom: 12px;">
                  ${item.question}
                </div>

                <!-- Options Breakdown -->
                <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px;">
                  ${item.options.map((optText, oIdx) => {
                    const isUserChoice = item.userAnswerIndex === oIdx;
                    const isCorrectChoice = item.correctIndex === oIdx;
                    
                    let rowBorder = 'rgba(255, 255, 255, 0.05)';
                    let rowBg = 'rgba(0, 0, 0, 0.2)';
                    let tagText = '';

                    if (isCorrectChoice) {
                      rowBorder = 'var(--emerald-glow)';
                      rowBg = 'rgba(16, 185, 129, 0.1)';
                      tagText = '<span style="color: var(--emerald-glow); font-size: 11px; font-weight: bold; margin-left: auto;">✓ CORRECT ANSWER</span>';
                    } else if (isUserChoice && !isCorrectChoice) {
                      rowBorder = 'var(--crimson-glow)';
                      rowBg = 'rgba(239, 68, 68, 0.1)';
                      tagText = '<span style="color: var(--crimson-glow); font-size: 11px; font-weight: bold; margin-left: auto;">✗ YOUR ANSWER</span>';
                    }

                    return `
                      <div style="display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid ${rowBorder}; background: ${rowBg}; font-size: 13px;">
                        <span style="font-family: var(--font-mono); font-weight: bold; color: ${isCorrectChoice ? 'var(--emerald-glow)' : (isUserChoice ? 'var(--crimson-glow)' : 'var(--text-dim)')}">
                          ${letters[oIdx]}.
                        </span>
                        <span>${optText}</span>
                        ${tagText}
                      </div>
                    `;
                  }).join('')}
                </div>

                <!-- Explanation -->
                <div style="background: rgba(0, 242, 254, 0.04); border-left: 3px solid var(--cyan-glow); padding: 10px 14px; border-radius: var(--radius-sm); font-size: 13px; color: var(--text-primary); line-height: 1.5;">
                  <strong style="color: var(--cyan-glow);">Field Explanation:</strong> ${item.explanation}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Bottom Navigation Footer -->
      <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface); padding: 18px 24px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-top: 24px;">
        <button class="btn btn-outline" id="btn-back-to-topics">
          ← Return to Curriculum Grid
        </button>
        <button class="btn btn-cyan" id="btn-review-theory">
          Re-read Phase 1 Theory
        </button>
      </div>

      <!-- Printable Certificate Zone (Hidden on Screen, Visible on Print) -->
      <div id="certificate-print-zone" style="display: none;">
        <div class="cert-header">
          <div class="cert-title">CYBER WARRIORS LEARNING ACADEMY TRAINING CERTIFICATE</div>
          <div class="cert-subtitle">HEADQUARTERS TRI-SERVICES CYBER OPERATIONS // OFFICIAL EVALUATION RECORD</div>
        </div>

        <div class="cert-body">
          <p style="font-size: 13pt; text-transform: uppercase; letter-spacing: 2px;">This is to certify that</p>
          <div class="cert-recipient">${profile.name.toUpperCase()}</div>
          <div style="font-size: 12pt; color: #475569; margin-bottom: 20px;">CALLSIGN: [${profile.callsign}] | SERVICE BRANCH: ${profile.serviceBranch}</div>

          <p class="cert-statement">
            has successfully completed the comprehensive 3-Phase Tactical Evaluation Mission on
            <br>
            <strong style="font-size: 16pt; color: #0f172a;">${topic.title}</strong>
            <br>
            demonstrating verified operational competence in theoretical doctrine, defensive countermeasures, and rapid threat triage.
          </p>

          <div style="margin: 30px 0;">
            <span class="cert-score-highlight">FINAL MISSION SCORE: ${result.percentage}% (${result.score}/${result.total})</span>
            <div style="font-size: 14pt; font-weight: bold; margin-top: 6px; color: #0f172a;">
              CLEARANCE RANK GRANTED: ${result.rankAwarded.toUpperCase()}
            </div>
          </div>
        </div>

        <div class="cert-footer">
          <div class="cert-sig-block">
            <div style="font-family: 'Courier New', monospace; font-size: 10pt;">RECORD HASH: ${result.id}</div>
            <div class="cert-sig-line">CYBER EVALUATION OFFICER</div>
          </div>

          <div class="cert-seal">
            OFFICIAL<br>DEFENSE<br>SEAL
          </div>

          <div class="cert-sig-block">
            <div style="font-family: 'Courier New', monospace; font-size: 10pt;">ISSUED: ${new Date(result.timestamp).toLocaleDateString()}</div>
            <div class="cert-sig-line">DIRECTOR OF TRAINING</div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach event handlers
  setupAnalyticsListeners(result, topic, container, onNavigate);
}

function setupAnalyticsListeners(result, topic, container, onNavigate) {
  // Retake quiz
  container.querySelector('#btn-retake-quiz').addEventListener('click', () => {
    cyberAudio.playClick();
    onNavigate(topic.id, 3);
  });

  // Re-read theory
  container.querySelector('#btn-review-theory').addEventListener('click', () => {
    cyberAudio.playClick();
    onNavigate(topic.id, 1);
  });

  // Back to topics
  container.querySelector('#btn-back-to-topics').addEventListener('click', () => {
    cyberAudio.playClick();
    window.location.hash = '#curriculum';
  });

  // Print Certificate
  container.querySelector('#btn-print-cert').addEventListener('click', () => {
    cyberAudio.playClick();
    window.print();
  });
}
