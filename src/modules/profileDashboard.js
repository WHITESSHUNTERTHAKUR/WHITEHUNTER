import { DefenseStorage } from '../utils/storage.js';
import { cyberAudio } from './audio.js';
import { renderPerformanceReport } from './performanceAnalytics.js';
import { getTopicById } from '../data/allTopics.js';

export function renderProfileDashboard(container, onNavigate) {
  function render() {
    const stats = DefenseStorage.getOverallStats();
    const profile = stats.profile;
    const history = DefenseStorage.getQuizHistory();

    const xpToNextRank = Math.max(100, Math.ceil(profile.xp / 300) * 300);
    const xpPercent = Math.min(100, Math.round((profile.xp / xpToNextRank) * 100));

    container.innerHTML = `
      <div class="profile-viewport" style="max-width: 960px; margin: 0 auto;">
        <!-- Header -->
        <div class="curriculum-header" style="margin-bottom: 20px;">
          <div class="curriculum-title">
            <span class="tag-pill" style="border-color: var(--emerald-glow); color: var(--emerald-glow); margin-bottom: 6px; display: inline-block;">
              OPERATIONAL DOSSIER & FLIGHT LOG
            </span>
            <h2>Candidate Profile & Performance Analytics Dossier</h2>
            <p>Comprehensive training metrics, past mission evaluations, and military clearance rank tracking.</p>
          </div>
        </div>

        <!-- Candidate Badge Hero -->
        <div class="report-hero-card" style="margin-bottom: 24px;">
          <div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
            <div style="width: 80px; height: 80px; border-radius: 50%; background: rgba(0, 242, 254, 0.15); border: 2px solid var(--cyan-glow); display: flex; align-items: center; justify-content: center; font-size: 32px; color: var(--cyan-glow); box-shadow: 0 0 20px rgba(0,242,254,0.3);">
              🛡️
            </div>
            <div>
              <div style="font-family: var(--font-mono); font-size: 11px; color: var(--cyan-glow); letter-spacing: 0.1em;">
                OFFICIAL RECORD // ${profile.clearanceLevel}
              </div>
              <h1 style="font-size: 26px; font-weight: 700; color: var(--text-bright); margin: 2px 0;">
                ${profile.name} <span style="font-size: 16px; color: var(--text-dim);">[${profile.callsign}]</span>
              </h1>
              <div style="font-size: 13px; color: var(--emerald-glow); font-family: var(--font-tactical); font-weight: 700; text-transform: uppercase;">
                Rank: ${profile.rank} | ${profile.serviceBranch}
              </div>
            </div>
          </div>

          <!-- XP Progress -->
          <div style="min-width: 240px;">
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 6px; font-family: var(--font-mono);">
              <span style="color: var(--text-muted);">TRAINING XP</span>
              <span style="color: var(--cyan-glow);">${profile.xp} / ${xpToNextRank} XP</span>
            </div>
            <div class="quiz-progress-bar-wrap" style="margin-bottom: 8px; height: 8px;">
              <div class="quiz-progress-fill" style="width: ${xpPercent}%;"></div>
            </div>
            <button class="btn btn-outline btn-sm" id="btn-edit-profile" style="width: 100%;">
              Edit Candidate Details
            </button>
          </div>
        </div>

        <!-- Lifetime Stats Grid -->
        <div class="analytics-grid">
          <div class="stat-box">
            <div class="stat-title">Missions Completed</div>
            <div class="stat-val">${stats.totalAttempts}</div>
            <div style="font-size: 11px; color: var(--text-dim); margin-top: 2px;">Total Mission Quizzes Evaluated</div>
          </div>

          <div class="stat-box">
            <div class="stat-title">Overall Accuracy</div>
            <div class="stat-val" style="color: var(--emerald-glow);">${stats.accuracyPercentage}%</div>
            <div style="font-size: 11px; color: var(--text-dim); margin-top: 2px;">${stats.totalCorrectAnswers} of ${stats.totalQuestionsAnswered} Interceptions</div>
          </div>

          <div class="stat-box">
            <div class="stat-title">Average Score</div>
            <div class="stat-val" style="color: var(--cyan-glow);">${stats.avgScore}%</div>
            <div style="font-size: 11px; color: var(--text-dim); margin-top: 2px;">Across All Technical Domains</div>
          </div>

          <div class="stat-box">
            <div class="stat-title">Topics Mastered</div>
            <div class="stat-val" style="color: var(--amber-glow);">${stats.completedTopicsCount}</div>
            <div style="font-size: 11px; color: var(--text-dim); margin-top: 2px;">Phase 3 Certified Topics</div>
          </div>
        </div>

        <!-- Historical Missions Log -->
        <div class="card-tactical">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h3 style="font-size: 18px; color: var(--text-bright);">
              Mission History & Performance Archive
            </h3>
            <span style="font-size: 12px; color: var(--text-dim); font-family: var(--font-mono);">
              ${history.length} EVALUATIONS LOGGED
            </span>
          </div>

          ${history.length === 0 ? `
            <div style="text-align: center; padding: 40px; color: var(--text-dim);">
              No mission evaluations recorded yet. Complete any Phase 3 Quiz in the curriculum to view full historical analytics here.
            </div>
          ` : `
            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                <thead>
                  <tr style="border-bottom: 1px solid var(--border-subtle); color: var(--text-dim); text-align: left; font-family: var(--font-tactical);">
                    <th style="padding: 10px;">DATE</th>
                    <th style="padding: 10px;">MISSION TOPIC</th>
                    <th style="padding: 10px;">SCORE</th>
                    <th style="padding: 10px;">CLEARANCE RANK</th>
                    <th style="padding: 10px; text-align: right;">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  ${history.map((h) => `
                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.04); font-family: var(--font-mono);">
                      <td style="padding: 10px; color: var(--text-muted); font-size: 12px;">
                        ${new Date(h.timestamp).toLocaleDateString()}
                      </td>
                      <td style="padding: 10px; color: #fff; font-weight: bold; font-family: var(--font-display);">
                        ${h.topicTitle}
                      </td>
                      <td style="padding: 10px;">
                        <span style="color: ${h.percentage >= 70 ? 'var(--emerald-glow)' : 'var(--crimson-glow)'}; font-weight: bold;">
                          ${h.percentage}% (${h.score}/${h.total})
                        </span>
                      </td>
                      <td style="padding: 10px; color: var(--cyan-glow); font-size: 12px;">
                        ${h.rankAwarded}
                      </td>
                      <td style="padding: 10px; text-align: right;">
                        <button class="btn btn-outline btn-sm btn-reopen-report" data-id="${h.id}">
                          View Report →
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>

        <!-- Edit Profile Modal (Hidden by default) -->
        <div id="profile-edit-modal" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); z-index: 100; align-items: center; justify-content: center;">
          <div class="card-tactical" style="width: 440px; padding: 28px; border-color: var(--cyan-glow);">
            <h3 style="font-size: 18px; color: var(--cyan-glow); margin-bottom: 16px;">
              Update Candidate Dossier
            </h3>

            <div class="tool-input-group">
              <label>Full Name / Rank</label>
              <input type="text" id="input-prof-name" class="tool-input" value="${profile.name}" />
            </div>

            <div class="tool-input-group">
              <label>Tactical Callsign</label>
              <input type="text" id="input-prof-callsign" class="tool-input" value="${profile.callsign}" />
            </div>

            <div class="tool-input-group">
              <label>Service Branch / Unit</label>
              <input type="text" id="input-prof-branch" class="tool-input" value="${profile.serviceBranch}" />
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
              <button class="btn btn-outline btn-sm" id="btn-cancel-prof-edit">Cancel</button>
              <button class="btn btn-cyan btn-sm" id="btn-save-prof-edit">Save Dossier</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Event handlers
    const editBtn = container.querySelector('#btn-edit-profile');
    const modal = container.querySelector('#profile-edit-modal');
    const cancelBtn = container.querySelector('#btn-cancel-prof-edit');
    const saveBtn = container.querySelector('#btn-save-prof-edit');

    if (editBtn && modal) {
      editBtn.addEventListener('click', () => {
        cyberAudio.playClick();
        modal.style.display = 'flex';
      });
      cancelBtn.addEventListener('click', () => {
        cyberAudio.playClick();
        modal.style.display = 'none';
      });
      saveBtn.addEventListener('click', () => {
        cyberAudio.playClick();
        const newName = container.querySelector('#input-prof-name').value.trim();
        const newCallsign = container.querySelector('#input-prof-callsign').value.trim();
        const newBranch = container.querySelector('#input-prof-branch').value.trim();
        DefenseStorage.updateUserProfile({
          name: newName || 'Cadet Officer',
          callsign: newCallsign || 'CYBER-DEFENDER',
          serviceBranch: newBranch || 'Tri-Services Cyber Command'
        });
        modal.style.display = 'none';
        render();
      });
    }

    container.querySelectorAll('.btn-reopen-report').forEach(btn => {
      btn.addEventListener('click', () => {
        cyberAudio.playClick();
        const id = btn.getAttribute('data-id');
        const report = history.find(h => h.id === id);
        if (report) {
          const topic = getTopicById(report.topicId);
          renderPerformanceReport(report, topic, container, onNavigate);
        }
      });
    });
  }

  render();
}
