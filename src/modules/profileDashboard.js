import { DefenseStorage } from '../utils/storage.js';
import { cyberAudio } from './audio.js';
import { renderPerformanceReport } from './performanceAnalytics.js';

const RANKS_ROADMAP = [
  { rank: 'Sub-Lieutenant', minXp: 0, insignia: '🔰', clearance: 'RESTRICTED // NAVAL DEFENSE' },
  { rank: 'Lieutenant', minXp: 100, insignia: '⚓', clearance: 'CONFIDENTIAL // FLEET OP' },
  { rank: 'Lieutenant Commander', minXp: 200, insignia: '⚔️', clearance: 'SECRET // MARITIME' },
  { rank: 'Commander', minXp: 350, insignia: '🛡️', clearance: 'SECRET // DNCW COMMAND' },
  { rank: 'Captain', minXp: 550, insignia: '🦅', clearance: 'TOP SECRET // WAR ROOM' },
  { rank: 'Commodore', minXp: 800, insignia: '⭐', clearance: 'TOP SECRET // STRATEGIC' },
  { rank: 'Rear Admiral', minXp: 1100, insignia: '🌟', clearance: 'TOP SECRET // FLEET CHIEF' },
  { rank: 'Vice Admiral', minXp: 1500, insignia: '🔱', clearance: 'TOP SECRET // THEATRE COMMAND' },
  { rank: 'Admiral (Chief of the Naval Staff)', minXp: 2000, insignia: '👑', clearance: 'PARAMA VISHISHT // CNS ADMIRALTY' }
];

export function renderProfileDashboard(container, onNavigate) {
  function render() {
    const stats = DefenseStorage.getOverallStats();
    const profile = stats.profile;
    const history = DefenseStorage.getQuizHistory();

    // Determine current rank object & next rank
    const currentRankIdx = RANKS_ROADMAP.findIndex(r => r.rank === profile.rank);
    const activeRankObj = currentRankIdx >= 0 ? RANKS_ROADMAP[currentRankIdx] : RANKS_ROADMAP[0];
    const nextRankObj = currentRankIdx >= 0 && currentRankIdx < RANKS_ROADMAP.length - 1 
      ? RANKS_ROADMAP[currentRankIdx + 1] 
      : null;

    const nextXpGoal = nextRankObj ? nextRankObj.minXp : activeRankObj.minXp + 500;
    const currentBaseXp = activeRankObj.minXp;
    const xpProgressInLevel = Math.max(0, profile.xp - currentBaseXp);
    const xpSpanInLevel = Math.max(1, nextXpGoal - currentBaseXp);
    const xpPercent = nextRankObj 
      ? Math.min(100, Math.round((xpProgressInLevel / xpSpanInLevel) * 100))
      : 100;

    container.innerHTML = `
      <div class="profile-viewport" style="max-width: 1000px; margin: 0 auto;">
        <!-- Header -->
        <div class="curriculum-header" style="margin-bottom: 24px;">
          <div class="curriculum-title">
            <span class="tag-pill" style="border-color: var(--gold-crest); color: var(--gold-crest); margin-bottom: 6px; display: inline-block;">
              ⚓ BHARATIYA NAUSENA // OFFICIAL NAVAL OFFICER DOSSIER
            </span>
            <h2>Naval Officer Dossier & Maritime Service Log</h2>
            <p>Classified personnel identity, naval cyber defense qualifications, warship readiness flight log, and naval commendations. शं नो वरुणः</p>
          </div>
        </div>

        <!-- Candidate ID Card Hero -->
        <div class="report-hero-card" style="margin-bottom: 24px; position: relative; overflow: hidden; border: 1px solid var(--gold-crest); background: linear-gradient(135deg, rgba(5, 19, 41, 0.95), rgba(2, 7, 18, 0.95));">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 20px;">
            <div style="display: flex; gap: 20px; align-items: center;">
              <!-- Insignia Badge -->
              <div style="width: 88px; height: 88px; border-radius: 50%; background: rgba(255, 200, 55, 0.1); border: 2px solid var(--gold-crest); display: flex; align-items: center; justify-content: center; font-size: 38px; box-shadow: 0 0 25px rgba(255,200,55,0.3);">
                ${activeRankObj.insignia}
              </div>

              <div>
                <div style="font-family: var(--font-mono); font-size: 11px; color: var(--cyan-glow); letter-spacing: 0.1em; display: flex; align-items: center; gap: 8px;">
                  <span>FLEET SERVICE DOSSIER // CALLSIGN: ${profile.callsign}</span>
                  <span class="tag-pill" style="font-size: 9px; padding: 1px 6px; border-color: var(--gold-crest); color: var(--gold-crest); background: rgba(255,200,55,0.1);">${activeRankObj.clearance}</span>
                </div>
                <h1 style="font-size: 26px; font-weight: 700; color: #fff; margin: 4px 0;">
                  ${profile.name} <span style="font-size: 16px; color: var(--gold-crest); font-family: var(--font-mono);">[${profile.callsign}]</span>
                </h1>
                <div style="font-size: 13px; color: var(--gold-crest); font-family: var(--font-tactical); font-weight: 700; text-transform: uppercase;">
                  Rank: ${profile.rank} | ${profile.serviceBranch}
                </div>
              </div>
            </div>

            <button class="btn btn-outline btn-sm" id="btn-edit-profile" style="border-color: var(--gold-crest); color: var(--gold-crest);">
              ✏️ Edit Dossier Details
            </button>
          </div>

          <!-- XP & Promotion Status Bar -->
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-subtle);">
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 6px; font-family: var(--font-mono);">
              <span style="color: var(--text-muted);">
                NAVAL OPERATIONAL XP: <strong style="color: var(--gold-crest);">${profile.xp} XP TOTAL</strong>
              </span>
              <span style="color: var(--cyan-glow);">
                ${nextRankObj ? `NEXT PROMOTION: ${nextRankObj.rank} (${profile.xp}/${nextRankObj.minXp} XP)` : 'SUPREME ADMIRALTY RANK ATTAINED'}
              </span>
            </div>
            <div class="quiz-progress-bar-wrap" style="height: 8px; margin-bottom: 4px;">
              <div class="quiz-progress-fill" style="width: ${xpPercent}%; background: linear-gradient(90deg, var(--ocean-blue), var(--gold-crest));"></div>
            </div>
          </div>
        </div>

        <!-- Clearance Rank Roadmap -->
        <div class="card-tactical" style="margin-bottom: 24px;">
          <h3 style="font-size: 16px; color: var(--gold-crest); font-family: var(--font-tactical); margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
            <span>⚓</span> <span>INDIAN NAVY COMMISSIONED RANK ROADMAP & CLEARANCE PROGRESSION</span>
          </h3>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px;">
            ${RANKS_ROADMAP.map((r, idx) => {
              const isAchieved = profile.xp >= r.minXp;
              const isCurrent = r.rank === profile.rank;
              return `
                <div style="padding: 12px 10px; border-radius: var(--radius-sm); text-align: center; background: ${isCurrent ? 'rgba(255,200,55,0.15)' : (isAchieved ? 'rgba(0,240,255,0.08)' : 'rgba(255,255,255,0.02)')}; border: 1px solid ${isCurrent ? 'var(--gold-crest)' : (isAchieved ? 'var(--cyan-glow)' : 'var(--border-subtle)')};">
                  <div style="font-size: 24px; margin-bottom: 4px;">${r.insignia}</div>
                  <div style="font-size: 11px; font-weight: bold; color: ${isCurrent ? 'var(--gold-crest)' : (isAchieved ? '#fff' : 'var(--text-dim)')}; line-height: 1.2; margin-bottom: 4px;">
                    ${r.rank}
                  </div>
                  <div style="font-size: 10px; font-family: var(--font-mono); color: var(--text-muted);">
                    ${r.minXp} XP
                  </div>
                  <div style="font-size: 9px; margin-top: 4px; color: ${isAchieved ? 'var(--gold-crest)' : 'var(--text-dim)'}; font-family: var(--font-mono);">
                    ${isCurrent ? '★ CURRENT' : (isAchieved ? '✓ VERIFIED' : 'LOCKED')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Lifetime Operations Stats Grid -->
        <div class="analytics-grid" style="margin-bottom: 24px;">
          <div class="stat-box">
            <div class="stat-title">Evaluations Logged</div>
            <div class="stat-val">${stats.totalAttempts}</div>
            <div style="font-size: 11px; color: var(--text-dim); margin-top: 2px;">Phase 3 Certified Missions</div>
          </div>

          <div class="stat-box">
            <div class="stat-title">Combat Interception Accuracy</div>
            <div class="stat-val" style="color: var(--emerald-glow);">${stats.accuracyPercentage}%</div>
            <div style="font-size: 11px; color: var(--text-dim); margin-top: 2px;">${stats.totalCorrectAnswers} of ${stats.totalQuestionsAnswered} Interceptions</div>
          </div>

          <div class="stat-box">
            <div class="stat-title">Domain Average Score</div>
            <div class="stat-val" style="color: var(--cyan-glow);">${stats.avgScore}%</div>
            <div style="font-size: 11px; color: var(--text-dim); margin-top: 2px;">Across 5 Strategic Domains</div>
          </div>

          <div class="stat-box">
            <div class="stat-title">Curriculum Mastered</div>
            <div class="stat-val" style="color: var(--amber-glow);">${stats.completedTopicsCount}</div>
            <div style="font-size: 11px; color: var(--text-dim); margin-top: 2px;">Of 52 Mission Modules</div>
          </div>
        </div>

        <!-- Qualification Badges -->
        <div class="card-tactical" style="margin-bottom: 24px;">
          <h3 style="font-size: 16px; color: var(--amber-glow); font-family: var(--font-tactical); margin-bottom: 16px;">
            🏅 COMBAT QUALIFICATION BADGES & MILITARY HONORS
          </h3>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px;">
            <div style="display: flex; gap: 12px; align-items: center; padding: 12px; background: rgba(0,0,0,0.3); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
              <span style="font-size: 26px;">🛡️</span>
              <div>
                <strong style="font-size: 13px; color: #fff;">First Interception</strong>
                <p style="font-size: 11px; color: var(--text-muted); margin: 0;">Completed first mission scenario</p>
              </div>
            </div>

            <div style="display: flex; gap: 12px; align-items: center; padding: 12px; background: rgba(0,0,0,0.3); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
              <span style="font-size: 26px;">⚡</span>
              <div>
                <strong style="font-size: 13px; color: #fff;">Packet Master</strong>
                <p style="font-size: 11px; color: var(--text-muted); margin: 0;">Explored Subnet & Port tools</p>
              </div>
            </div>

            <div style="display: flex; gap: 12px; align-items: center; padding: 12px; background: rgba(0,0,0,0.3); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
              <span style="font-size: 26px;">🏹</span>
              <div>
                <strong style="font-size: 13px; color: #fff;">Range Marksman</strong>
                <p style="font-size: 11px; color: var(--text-muted); margin: 0;">Completed Tactical Defense Lab</p>
              </div>
            </div>

            <div style="display: flex; gap: 12px; align-items: center; padding: 12px; background: rgba(0,0,0,0.3); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
              <span style="font-size: 26px;">⚔️</span>
              <div>
                <strong style="font-size: 13px; color: #fff;">War Room Veteran</strong>
                <p style="font-size: 11px; color: var(--text-muted); margin: 0;">Executed Cyber Warfare Mission</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Historical Mission Log -->
        <div class="card-tactical">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h3 style="font-size: 17px; color: var(--text-bright);">
              Flight Log & Certified Evaluations Archive
            </h3>
            <span style="font-size: 12px; color: var(--text-dim); font-family: var(--font-mono);">
              ${history.length} EVALUATIONS ARCHIVED
            </span>
          </div>

          ${history.length === 0 ? `
            <div style="text-align: center; padding: 40px; color: var(--text-dim);">
              <p>No evaluations logged yet. Complete any Phase 3 Quiz in the Curriculum to record your operational performance history.</p>
            </div>
          ` : `
            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                <thead>
                  <tr style="border-bottom: 1px solid var(--border-subtle); color: var(--text-dim); text-align: left; font-family: var(--font-tactical);">
                    <th style="padding: 10px;">TIMESTAMP</th>
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

        <!-- Edit Profile Modal -->
        <div id="profile-edit-modal" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(6px); z-index: 100; align-items: center; justify-content: center;">
          <div class="card-tactical" style="width: 520px; padding: 28px; border: 1.5px solid var(--gold-crest); background: var(--bg-surface-elevated); box-shadow: 0 0 35px rgba(255, 200, 55, 0.2);">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
              <div style="font-size: 24px;">⚓</div>
              <div>
                <h3 style="font-size: 18px; color: var(--gold-crest); margin: 0;">
                  Update Naval Officer Credentials
                </h3>
                <span style="font-size: 11px; color: var(--text-dim); font-family: var(--font-mono);">
                  BHARATIYA NAUSENA PERSONNEL CLASSIFICATION
                </span>
              </div>
            </div>

            <div class="tool-input-group" style="margin-bottom: 12px;">
              <label>Full Officer Name</label>
              <input type="text" id="input-prof-name" class="tool-input" value="${escapeHtml(profile.name)}" placeholder="e.g. Lt. Cdr. Rajesh Varma" />
            </div>

            <div class="tool-input-group" style="margin-bottom: 12px;">
              <label>Fleet Callsign / Shipboard Code</label>
              <input type="text" id="input-prof-callsign" class="tool-input" value="${escapeHtml(profile.callsign)}" placeholder="e.g. INS-VIKRANT // VARUNA-01" />
            </div>

            <div class="tool-input-group" style="margin-bottom: 12px;">
              <label>Fleet Command / Warship Cyber Posting</label>
              <input type="text" id="input-prof-branch" list="naval-commands-list" class="tool-input" value="${escapeHtml(profile.serviceBranch)}" placeholder="Select or type naval command..." />
              <datalist id="naval-commands-list">
                <option value="Directorate of Naval Cyber Warfare (DNCW) - IHQ MoD (Navy)">
                <option value="Western Naval Command (Mumbai) // INS Vikrant Strike Group">
                <option value="Eastern Naval Command (Vizag) // INS Vikramaditya Battle Group">
                <option value="Southern Naval Command (Kochi) // Cyber Warfare Academy">
                <option value="Andaman & Nicobar Command (Port Blair) // Joint Theatre">
                <option value="INS Shivaji // Warship SCADA & Marine Propulsion Cyber Unit">
              </datalist>
            </div>

            <div class="tool-input-group" style="margin-bottom: 20px;">
              <label>Naval Security Clearance Level</label>
              <select id="input-prof-clearance" class="tool-input">
                <option value="RESTRICTED // NAVAL DEFENSE" ${profile.clearanceLevel.includes('RESTRICTED') ? 'selected' : ''}>RESTRICTED // NAVAL DEFENSE</option>
                <option value="CONFIDENTIAL // FLEET OP" ${profile.clearanceLevel.includes('CONFIDENTIAL') ? 'selected' : ''}>CONFIDENTIAL // FLEET OP</option>
                <option value="SECRET // MARITIME THEATRE" ${profile.clearanceLevel.includes('SECRET') ? 'selected' : ''}>SECRET // MARITIME THEATRE</option>
                <option value="TOP SECRET // DNCW HEADQUARTERS" ${profile.clearanceLevel.includes('DNCW') || profile.clearanceLevel.includes('NOFORN') ? 'selected' : ''}>TOP SECRET // DNCW HEADQUARTERS</option>
                <option value="PARAMA VISHISHT // CNS ADMIRALTY" ${profile.clearanceLevel.includes('PARAMA') || profile.clearanceLevel.includes('SCI') ? 'selected' : ''}>PARAMA VISHISHT // CNS ADMIRALTY</option>
              </select>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 10px;">
              <button class="btn btn-outline btn-sm" id="btn-cancel-prof-edit">Cancel</button>
              <button class="btn btn-gold btn-sm" id="btn-save-prof-edit" style="background: var(--gold-crest); color: #020712; font-weight: 700;">Save Naval Dossier</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Handlers
    const editBtn = container.querySelector('#btn-edit-profile');
    const modal = container.querySelector('#profile-edit-modal');
    const cancelBtn = container.querySelector('#btn-cancel-prof-edit');
    const saveBtn = container.querySelector('#btn-save-prof-edit');

    editBtn?.addEventListener('click', () => {
      cyberAudio.playClick();
      modal.style.display = 'flex';
    });

    cancelBtn?.addEventListener('click', () => {
      cyberAudio.playClick();
      modal.style.display = 'none';
    });

    saveBtn?.addEventListener('click', () => {
      cyberAudio.playClick();
      const name = container.querySelector('#input-prof-name').value.trim() || 'Naval Cyber Officer';
      const callsign = container.querySelector('#input-prof-callsign').value.trim() || 'INS-VIKRANT // VARUNA-01';
      const serviceBranch = container.querySelector('#input-prof-branch').value.trim() || 'Directorate of Naval Cyber Warfare (DNCW)';
      const clearanceLevel = container.querySelector('#input-prof-clearance').value;

      DefenseStorage.updateUserProfile({
        name,
        callsign,
        serviceBranch,
        clearanceLevel
      });

      // Update sidebar badge immediately
      const sidebarName = document.getElementById('sidebar-user-name');
      const sidebarRank = document.getElementById('sidebar-user-rank');
      if (sidebarName) sidebarName.innerText = name;
      if (sidebarRank) sidebarRank.innerText = profile.rank;

      cyberAudio.playSuccess();
      modal.style.display = 'none';
      render();
    });

    container.querySelectorAll('.btn-reopen-report').forEach(btn => {
      btn.addEventListener('click', () => {
        cyberAudio.playClick();
        const id = btn.getAttribute('data-id');
        const record = history.find(h => h.id === id);
        if (record) {
          renderPerformanceReport(record, container, () => render(), onNavigate);
        }
      });
    });
  }

  render();
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
