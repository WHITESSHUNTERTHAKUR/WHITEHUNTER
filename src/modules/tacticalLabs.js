import { TACTICAL_LABS_DATA } from '../data/tacticalLabsData.js';
import { DefenseStorage } from '../utils/storage.js';
import { cyberAudio } from './audio.js';
import { i18n } from '../utils/i18n.js';

export const LABS_DATA = TACTICAL_LABS_DATA;

export function renderTacticalLabs(container) {
  let selectedLabId = null;
  let activeTab = 'all';
  let searchQuery = '';

  function render() {
    if (selectedLabId) {
      renderLabWorkspace();
    } else {
      renderLabList();
    }
  }

  function getCompletedLabs() {
    try {
      const saved = localStorage.getItem('cyberops_completed_labs');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  function markLabCompleted(labId, xp) {
    try {
      const completed = getCompletedLabs();
      if (!completed.includes(labId)) {
        completed.push(labId);
        localStorage.setItem('cyberops_completed_labs', JSON.stringify(completed));
        DefenseStorage.addXp(xp || 150);
      }
    } catch (e) {
      console.warn(e);
    }
  }

  function renderLabList() {
    const isHinglish = i18n.getLanguage() === 'hinglish';
    const completedList = getCompletedLabs();

    const filteredLabs = LABS_DATA.filter(lab => {
      const matchCat = activeTab === 'all' || 
        lab.category.toLowerCase().includes(activeTab.toLowerCase()) ||
        lab.difficulty.toLowerCase() === activeTab.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q ||
        lab.title.toLowerCase().includes(q) ||
        lab.category.toLowerCase().includes(q) ||
        lab.briefing.toLowerCase().includes(q) ||
        lab.difficulty.toLowerCase().includes(q);

      return matchCat && matchSearch;
    });

    const categories = [
      { id: 'all', label: isHinglish ? 'Sabhi Labs' : 'All Labs', count: LABS_DATA.length },
      { id: 'Network', label: 'Network & Wireshark', count: LABS_DATA.filter(l => l.category.includes('Network')).length },
      { id: 'Endpoint', label: 'Windows & Sysmon', count: LABS_DATA.filter(l => l.category.includes('Endpoint')).length },
      { id: 'Linux', label: 'Linux Hardening', count: LABS_DATA.filter(l => l.category.includes('Linux')).length },
      { id: 'Web', label: 'Web & OWASP Top 10', count: LABS_DATA.filter(l => l.category.includes('Web')).length },
      { id: 'SOC', label: 'SOC & SIEM Triage', count: LABS_DATA.filter(l => l.category.includes('SOC')).length },
      { id: 'Incident', label: 'Incident Response & Malware', count: LABS_DATA.filter(l => l.category.includes('Incident')).length },
      { id: 'Cloud', label: 'Cloud Security & IAM', count: LABS_DATA.filter(l => l.category.includes('Cloud')).length },
      { id: 'Cryptography', label: 'Cryptography & Ciphers', count: LABS_DATA.filter(l => l.category.includes('Cryptography')).length }
    ];

    container.innerHTML = `
      <div class="tactical-labs-viewport" style="max-width: 1400px; margin: 0 auto;">
        <!-- Header -->
        <div class="card-tactical" style="background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%); border-left: 4px solid var(--emerald-glow); margin-bottom: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <div>
              <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px;">
                <span class="tag-pill" style="border-color: var(--emerald-glow); color: var(--emerald-glow); font-weight: 700;">
                  OPERATIONAL WAR ROOM // HANDS-ON CYBER RANGE
                </span>
                <span class="tag-pill" style="background: rgba(16, 185, 129, 0.15); color: #10b981; border-color: #10b981; font-weight: 700;">
                  ${LABS_DATA.length} WORKING PRACTICAL LABS
                </span>
                <span class="tag-pill" style="border-color: var(--cyan-glow); color: var(--cyan-glow);">
                  6 OBJECTIVES PER LAB
                </span>
              </div>
              <h2 style="font-size: 26px; color: var(--text-bright); margin-bottom: 6px;">
                ${isHinglish ? 'Cyber Defense Range: 100+ Practical Labs' : 'Cyber Defense Range: 100+ Practical Labs'}
              </h2>
              <p style="color: var(--text-muted); font-size: 14px; max-width: 750px; line-height: 1.5;">
                ${isHinglish 
                  ? 'Real-world incident response scenarios, live network PCAP telemetry, Windows Sysmon event logs, Linux privilege escalation, OWASP Web security, aur cloud misconfigurations. Har lab me 6 interactive sawaal hain hints aur full remediation guide ke sath.'
                  : 'Battle-tested operational scenarios where cadets inspect live network packet traces, Windows security audit logs, Linux privilege escalation vectors, OWASP Web exploits, and cloud misconfigurations. Every lab features 6 interactive tasks with hints and solutions.'}
              </p>
            </div>

            <!-- Stats & Search -->
            <div style="min-width: 320px; flex: 1; max-width: 450px;">
              <div style="display: flex; justify-content: flex-end; align-items: center; gap: 12px; margin-bottom: 10px;">
                <span style="font-size: 12px; font-family: var(--font-mono); color: var(--text-dim);">
                  COMPLETED: <strong style="color: var(--emerald-glow);">${completedList.length}</strong> / ${LABS_DATA.length}
                </span>
                <div style="width: 120px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                  <div style="width: ${(completedList.length / LABS_DATA.length) * 100}%; height: 100%; background: var(--emerald-glow);"></div>
                </div>
              </div>
              <div style="position: relative;">
                <input 
                  type="text" 
                  id="labs-search-input" 
                  class="search-input" 
                  placeholder="${isHinglish ? 'Lab, keyword ya protocol search karein... (e.g. Wireshark, SQL, SUID)' : 'Search labs by keyword, protocol, attack... (e.g. Wireshark, SQL, SUID)'}" 
                  value="${escapeHtml(searchQuery)}" 
                  style="width: 100%; padding-left: 36px;"
                />
                <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); opacity: 0.6;">🔍</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Filter Bar -->
        <div class="domain-filter-bar" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;">
          ${categories.map(cat => `
            <span class="filter-pill ${activeTab === cat.id ? 'active' : ''}" data-tab="${cat.id}">
              ${cat.label} 
              <span style="opacity: 0.7; font-size: 11px; margin-left: 4px;">(${cat.count})</span>
            </span>
          `).join('')}
        </div>

        <!-- Labs Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 20px;">
          ${filteredLabs.length === 0 ? `
            <div class="card-tactical" style="grid-column: 1 / -1; text-align: center; padding: 48px 20px;">
              <div style="font-size: 32px; margin-bottom: 12px;">🛡️</div>
              <h3 style="color: var(--text-bright); margin-bottom: 8px;">No practical labs match "${escapeHtml(searchQuery)}"</h3>
              <p style="color: var(--text-muted); font-size: 14px;">Try searching for a different keyword or reset filters.</p>
              <button class="btn btn-cyan btn-sm" id="btn-reset-lab-search" style="margin-top: 16px;">
                Reset Search
              </button>
            </div>
          ` : filteredLabs.map(lab => {
            const isCompleted = completedList.includes(lab.id);
            return `
              <div class="card-tactical lab-card" data-id="${lab.id}" style="cursor: pointer; display: flex; flex-direction: column; justify-content: space-between; border-top: 3px solid ${isCompleted ? 'var(--emerald-glow)' : (lab.difficulty === 'Advanced' ? 'var(--crimson-glow)' : 'var(--cyan-glow)')}; transition: all 0.2s ease;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <div style="display: flex; gap: 6px; align-items: center;">
                      <span class="tag-pill ${lab.difficulty === 'Advanced' ? 'news-badge-critical' : (lab.difficulty === 'Intermediate' ? 'news-badge-high' : 'news-badge-medium')}" style="font-size: 10px;">
                        ${lab.difficulty}
                      </span>
                      ${isCompleted ? `
                        <span class="tag-pill" style="font-size: 10px; background: rgba(16, 185, 129, 0.2); color: #10b981; border-color: #10b981; font-weight: 700;">
                          ✓ SOLVED
                        </span>
                      ` : ''}
                    </div>
                    <span style="font-size: 11px; font-family: var(--font-mono); color: var(--amber-glow); font-weight: 700;">
                      ⚡ +${lab.xpReward} XP
                    </span>
                  </div>

                  <div style="font-size: 11px; font-family: var(--font-tactical); color: var(--cyan-glow); text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.05em;">
                    ${lab.category}
                  </div>

                  <h3 style="font-size: 16px; font-weight: 700; color: var(--text-bright); margin-bottom: 10px; line-height: 1.4;">
                    ${escapeHtml(lab.title)}
                  </h3>

                  <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px;">
                    ${escapeHtml(lab.briefing.slice(0, 130))}...
                  </p>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 12px; margin-top: auto;">
                  <span style="font-size: 12px; color: var(--text-dim); font-family: var(--font-mono);">
                    ⏱️ ${lab.timeEst} | 6 Tasks
                  </span>
                  <button class="btn ${isCompleted ? 'btn-outline' : 'btn-cyan'} btn-sm btn-start-lab" data-id="${lab.id}">
                    ${isCompleted ? (isHinglish ? 'Dobara Practice' : 'Revisit Lab →') : (isHinglish ? 'Range Shuru Karein →' : 'Enter Range →')}
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // Filter listeners
    container.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        cyberAudio.playClick();
        activeTab = pill.getAttribute('data-tab');
        render();
      });
    });

    // Search input
    const searchInput = container.querySelector('#labs-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        render();
        const newSearch = container.querySelector('#labs-search-input');
        if (newSearch) {
          newSearch.focus();
          newSearch.setSelectionRange(searchQuery.length, searchQuery.length);
        }
      });
    }

    const resetBtn = container.querySelector('#btn-reset-lab-search');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        cyberAudio.playClick();
        searchQuery = '';
        activeTab = 'all';
        render();
      });
    }

    // Card click listeners
    container.querySelectorAll('.lab-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-start-lab')) return;
        cyberAudio.playClick();
        selectedLabId = card.getAttribute('data-id');
        render();
      });
    });

    container.querySelectorAll('.btn-start-lab').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        cyberAudio.playClick();
        selectedLabId = btn.getAttribute('data-id');
        render();
      });
    });
  }

  function renderLabWorkspace() {
    const isHinglish = i18n.getLanguage() === 'hinglish';
    const lab = LABS_DATA.find(l => l.id === selectedLabId) || LABS_DATA[0];
    const completedList = getCompletedLabs();
    const isInitiallyCompleted = completedList.includes(lab.id);

    // Track state of each task in current session
    const taskStates = lab.tasks.map(() => ({
      solved: false,
      userAnswer: '',
      showHint: false,
      showSolution: false
    }));

    container.innerHTML = `
      <div class="lab-workspace-viewport" style="max-width: 1040px; margin: 0 auto;">
        <!-- Top Action Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface); border: 1px solid var(--border-subtle); padding: 12px 20px; border-radius: var(--radius-md); margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <button class="btn btn-outline btn-sm" id="btn-back-to-labs">
              ${isHinglish ? '← Range Par Wapas' : '← Return to Range Roster'}
            </button>
            <span class="tag-pill ${lab.difficulty === 'Advanced' ? 'news-badge-critical' : 'news-badge-high'}" style="font-size: 10px;">
              ${lab.difficulty}
            </span>
            ${isInitiallyCompleted ? `
              <span class="tag-pill" style="font-size: 10px; background: rgba(16, 185, 129, 0.2); color: #10b981; border-color: #10b981; font-weight: 700;">
                ✓ COMPLETED
              </span>
            ` : ''}
          </div>

          <div style="display: flex; gap: 14px; align-items: center;">
            <div style="font-size: 13px; font-family: var(--font-mono); color: var(--amber-glow); font-weight: 700;">
              POTENTIAL REWARD: +${lab.xpReward} XP
            </div>
          </div>
        </div>

        <!-- Mission Title -->
        <div style="margin-bottom: 20px;">
          <div style="font-size: 12px; color: var(--emerald-glow); font-family: var(--font-tactical); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.05em;">
            DOMAIN: ${lab.category} | LIVE RANGE TARGET
          </div>
          <h2 style="font-size: 24px; color: var(--text-bright); line-height: 1.3;">
            ${escapeHtml(lab.title)}
          </h2>
        </div>

        <!-- Scenario Briefing Card -->
        <div class="card-tactical" style="margin-bottom: 20px; border-left: 4px solid var(--cyan-glow);">
          <h4 style="font-size: 13px; color: var(--cyan-glow); font-family: var(--font-tactical); margin-bottom: 8px; text-transform: uppercase;">
            🛡️ OPERATIONAL INCIDENT BRIEFING & CONTEXT
          </h4>
          <p style="font-size: 14px; color: var(--text-primary); line-height: 1.6; margin: 0;">
            ${escapeHtml(lab.briefing)}
          </p>
        </div>

        <!-- Raw Telemetry Stream / Console Box -->
        <div class="card-tactical" style="margin-bottom: 24px; background: #030814; border: 1px solid rgba(0, 242, 254, 0.25);">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 8px; margin-bottom: 12px;">
            <span style="font-family: var(--font-mono); font-size: 12px; color: var(--cyan-glow); display: flex; align-items: center; gap: 6px;">
              📡 SENSOR TELEMETRY & LIVE LOG STREAM [TACTICAL CAPTURE]
            </span>
            <span style="font-size: 10px; color: #10b981; font-family: var(--font-mono); display: flex; align-items: center; gap: 4px;">
              <span style="width: 6px; height: 6px; border-radius: 50%; background: #10b981; display: inline-block;"></span> 100% OPERATIONAL
            </span>
          </div>
          <pre style="margin: 0; font-family: var(--font-mono); font-size: 12.5px; color: #a5f3fc; line-height: 1.6; overflow-x: auto; white-space: pre-wrap; user-select: text;"><code>${escapeHtml(lab.telemetry)}</code></pre>
        </div>

        <!-- Interactive Tasks Form -->
        <div class="card-tactical" style="margin-bottom: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 10px;">
            <div>
              <h3 style="font-size: 18px; color: var(--text-bright); margin-bottom: 4px;">
                Tactical Investigation Objectives (${lab.tasks.length} Questions)
              </h3>
              <p style="font-size: 13px; color: var(--text-muted); margin: 0;">
                Analyze the telemetry above, solve each question, and submit containment steps.
              </p>
            </div>
            <div id="solved-counter-badge" style="font-size: 12px; font-family: var(--font-mono); padding: 4px 12px; background: rgba(0,242,254,0.1); border: 1px solid var(--cyan-glow); border-radius: var(--radius-sm); color: var(--cyan-glow);">
              SOLVED: 0 / ${lab.tasks.length}
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 20px;" id="tasks-container">
            ${lab.tasks.map((task, idx) => `
              <div class="task-box" id="task-card-${idx}" style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); padding: 16px; border-radius: var(--radius-sm); transition: all 0.2s ease;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; gap: 10px;">
                  <label style="font-size: 14px; font-weight: 600; color: #fff; line-height: 1.4;">
                    ${escapeHtml(task.prompt)}
                  </label>
                  <span class="task-badge-status" id="task-badge-${idx}" style="font-size: 10px; font-family: var(--font-mono); padding: 2px 8px; border-radius: 4px; background: rgba(255,255,255,0.05); color: var(--text-dim); white-space: nowrap;">
                    PENDING
                  </span>
                </div>

                <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 10px;">
                  <input 
                    type="text" 
                    class="tool-input task-input" 
                    id="input-task-${idx}" 
                    data-task-idx="${idx}" 
                    placeholder="Enter answer / parameter / command..." 
                    style="flex: 1; min-width: 240px;" 
                  />
                  <button class="btn btn-cyan btn-sm btn-verify-task" data-task-idx="${idx}" style="font-weight: 700;">
                    Validate Answer
                  </button>
                  <button class="btn btn-outline btn-sm btn-toggle-hint" data-task-idx="${idx}" title="Reveal hint">
                    💡 Hint
                  </button>
                  <button class="btn btn-outline btn-sm btn-toggle-solution" data-task-idx="${idx}" style="color: var(--amber-glow);" title="Reveal solution">
                    🔓 Solution
                  </button>
                </div>

                <!-- Feedback Message -->
                <div class="task-feedback" id="feedback-task-${idx}" style="font-size: 12.5px; margin-top: 6px; min-height: 18px; line-height: 1.4;"></div>

                <!-- Hint Container -->
                <div class="task-hint-box" id="hint-box-${idx}" style="display: none; background: rgba(14, 165, 233, 0.08); border-left: 3px solid var(--cyan-glow); padding: 8px 12px; border-radius: var(--radius-sm); font-size: 12px; color: #bae6fd; margin-top: 8px;">
                  <strong>💡 Hint:</strong> ${escapeHtml(task.hint)}
                </div>

                <!-- Solution Container -->
                <div class="task-solution-box" id="solution-box-${idx}" style="display: none; background: rgba(245, 158, 11, 0.08); border-left: 3px solid var(--amber-glow); padding: 10px 12px; border-radius: var(--radius-sm); font-size: 12px; color: #fef08a; margin-top: 8px;">
                  <div><strong>🔓 Accepted Solution:</strong> <code style="background: rgba(0,0,0,0.4); padding: 2px 6px; border-radius: 4px; color: #fff;">${escapeHtml(task.expected)}</code></div>
                  <div style="margin-top: 4px; color: #e2e8f0; font-size: 11.5px;">${escapeHtml(task.explanation || 'Verified through standard protocol behavior.')}</div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Bottom Submission Bar -->
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 20px; margin-top: 24px; flex-wrap: wrap; gap: 14px;">
            <button class="btn btn-cyan" id="btn-complete-lab" style="min-width: 220px; font-weight: 700;">
              🛡️ Complete Range & Claim +${lab.xpReward} XP
            </button>
            <div id="lab-completion-status" style="font-size: 13px; font-family: var(--font-mono); font-weight: 700;"></div>
          </div>
        </div>

        <!-- Remediation Guidance Accordion -->
        <details class="card-tactical" style="cursor: pointer; margin-bottom: 30px;" open>
          <summary style="font-size: 14px; color: var(--emerald-glow); font-family: var(--font-tactical); outline: none; font-weight: 700; display: flex; align-items: center; gap: 8px;">
            📘 DEFENSIVE REMEDIATION PROTOCOL & FIELD DOCTRINE
          </summary>
          <div style="font-size: 13.5px; color: #cbd5e1; line-height: 1.6; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border-subtle);">
            ${escapeHtml(lab.remediationGuide)}
          </div>
        </details>
      </div>
    `;

    // Back to labs handler
    container.querySelector('#btn-back-to-labs').addEventListener('click', () => {
      cyberAudio.playClick();
      selectedLabId = null;
      render();
    });

    // Update solved counter
    function updateCounter() {
      const solvedCount = taskStates.filter(t => t.solved).length;
      const counterEl = container.querySelector('#solved-counter-badge');
      if (counterEl) {
        counterEl.innerText = `SOLVED: ${solvedCount} / ${lab.tasks.length}`;
        if (solvedCount === lab.tasks.length) {
          counterEl.style.borderColor = 'var(--emerald-glow)';
          counterEl.style.color = 'var(--emerald-glow)';
          counterEl.style.background = 'rgba(16, 185, 129, 0.15)';
        }
      }
    }

    // Verify task function
    function verifyTask(idx) {
      const task = lab.tasks[idx];
      const inputEl = container.querySelector(`#input-task-${idx}`);
      const feedbackEl = container.querySelector(`#feedback-task-${idx}`);
      const badgeEl = container.querySelector(`#task-badge-${idx}`);
      const cardEl = container.querySelector(`#task-card-${idx}`);

      if (!inputEl || !feedbackEl) return;

      const userVal = inputEl.value.trim();
      if (!userVal) {
        feedbackEl.innerHTML = `<span style="color: var(--crimson-glow);">[!] Please enter your response before validating.</span>`;
        return;
      }

      // Check against expected and acceptedKeywords
      const isDirectMatch = userVal.toLowerCase() === task.expected.toLowerCase();
      const isKeywordMatch = Array.isArray(task.acceptedKeywords) && task.acceptedKeywords.some(kw => {
        return userVal.toLowerCase().includes(kw.toLowerCase()) || kw.toLowerCase().includes(userVal.toLowerCase());
      });

      if (isDirectMatch || isKeywordMatch) {
        cyberAudio.playSuccess();
        taskStates[idx].solved = true;
        taskStates[idx].userAnswer = userVal;
        
        feedbackEl.innerHTML = `<span style="color: var(--emerald-glow); font-weight: 600;">✓ Correct! Objective Verified.</span>`;
        if (badgeEl) {
          badgeEl.innerText = 'VERIFIED';
          badgeEl.style.background = 'rgba(16, 185, 129, 0.2)';
          badgeEl.style.color = '#10b981';
          badgeEl.style.border = '1px solid #10b981';
        }
        if (cardEl) {
          cardEl.style.borderColor = 'rgba(16, 185, 129, 0.4)';
        }
      } else {
        cyberAudio.playError();
        feedbackEl.innerHTML = `<span style="color: #f87171;">✗ Verification failed. Inspect telemetry or click 💡 Hint for guidance.</span>`;
        if (badgeEl) {
          badgeEl.innerText = 'FAILED';
          badgeEl.style.background = 'rgba(239, 68, 68, 0.2)';
          badgeEl.style.color = '#f87171';
        }
      }

      updateCounter();
    }

    // Attach listeners to verify buttons and Enter key
    container.querySelectorAll('.btn-verify-task').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-task-idx'), 10);
        verifyTask(idx);
      });
    });

    container.querySelectorAll('.task-input').forEach(input => {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const idx = parseInt(input.getAttribute('data-task-idx'), 10);
          verifyTask(idx);
        }
      });
    });

    // Toggle Hints
    container.querySelectorAll('.btn-toggle-hint').forEach(btn => {
      btn.addEventListener('click', () => {
        cyberAudio.playClick();
        const idx = parseInt(btn.getAttribute('data-task-idx'), 10);
        const hintBox = container.querySelector(`#hint-box-${idx}`);
        if (hintBox) {
          const isHidden = hintBox.style.display === 'none';
          hintBox.style.display = isHidden ? 'block' : 'none';
          btn.classList.toggle('btn-cyan', isHidden);
        }
      });
    });

    // Toggle Solution
    container.querySelectorAll('.btn-toggle-solution').forEach(btn => {
      btn.addEventListener('click', () => {
        cyberAudio.playClick();
        const idx = parseInt(btn.getAttribute('data-task-idx'), 10);
        const solBox = container.querySelector(`#solution-box-${idx}`);
        if (solBox) {
          const isHidden = solBox.style.display === 'none';
          solBox.style.display = isHidden ? 'block' : 'none';
          btn.classList.toggle('btn-crimson', isHidden);
          // Auto-fill into input for student convenience
          const inputEl = container.querySelector(`#input-task-${idx}`);
          if (inputEl && !inputEl.value) {
            inputEl.value = lab.tasks[idx].expected;
          }
        }
      });
    });

    // Complete Lab Button
    const completeBtn = container.querySelector('#btn-complete-lab');
    const statusEl = container.querySelector('#lab-completion-status');

    completeBtn.addEventListener('click', () => {
      const solvedCount = taskStates.filter(t => t.solved).length;
      if (solvedCount < lab.tasks.length) {
        // Auto-validate all inputs in case user forgot to click Validate
        lab.tasks.forEach((_, i) => {
          const inp = container.querySelector(`#input-task-${i}`);
          if (inp && inp.value.trim() && !taskStates[i].solved) {
            verifyTask(i);
          }
        });
      }

      const finalSolved = taskStates.filter(t => t.solved).length;
      if (finalSolved >= Math.ceil(lab.tasks.length / 2)) {
        cyberAudio.playSuccess();
        markLabCompleted(lab.id, lab.xpReward);
        statusEl.innerHTML = `<span style="color: var(--emerald-glow);">🎖️ RANGE DEFENDED! +${lab.xpReward} XP CREDITED.</span>`;
        completeBtn.disabled = true;
        completeBtn.innerText = '✓ Lab Completed';
        completeBtn.style.background = '#10b981';
      } else {
        cyberAudio.playError();
        statusEl.innerHTML = `<span style="color: #f87171;">[!] Please complete at least 3 objectives to claim credit.</span>`;
      }
    });
  }

  // Initial render of practical labs
  render();

  // Re-render when language changes
  window.addEventListener('cyber_language_changed', () => {
    render();
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
