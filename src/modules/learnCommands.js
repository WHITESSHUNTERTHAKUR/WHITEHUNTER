// CYBER WARRIORS LEARNING ACADEMY - Learn Commands Module
import { COMMANDS_DATA, COMMAND_CATEGORIES } from '../data/commandsData.js';
import { cyberAudio } from './audio.js';
import { i18n } from '../utils/i18n.js';

export function renderLearnCommands(container) {
  let activeCategory = 'all';
  let searchQuery = '';
  let selectedCommandId = null;

  function render() {
    const isHinglish = i18n.getLanguage() === 'hinglish';

    const filteredCommands = COMMANDS_DATA.filter(cmd => {
      const matchCat = activeCategory === 'all' || cmd.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch = !query ||
        cmd.cmd.toLowerCase().includes(query) ||
        cmd.syntax.toLowerCase().includes(query) ||
        cmd.subCategory.toLowerCase().includes(query) ||
        cmd.summary.toLowerCase().includes(query) ||
        (cmd.summary_hi && cmd.summary_hi.toLowerCase().includes(query)) ||
        cmd.options.some(opt => opt.flag.toLowerCase().includes(query) || opt.desc.toLowerCase().includes(query));

      return matchCat && matchSearch;
    });

    container.innerHTML = `
      <div class="commands-viewport" style="max-width: 1400px; margin: 0 auto;">
        <!-- Header HUD -->
        <div class="card-tactical" style="background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%); border-left: 4px solid var(--cyan-glow); margin-bottom: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <div>
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                <span class="tag-pill" style="border-color: var(--cyan-glow); color: var(--cyan-glow); font-weight: 700;">
                  TERMINAL & CLI MASTERY HUB
                </span>
                <span class="tag-pill" style="background: rgba(14, 165, 233, 0.15); color: var(--cyan-glow); border-color: var(--cyan-glow);">
                  ${COMMANDS_DATA.length} ESSENTIAL COMMANDS
                </span>
              </div>
              <h2 style="font-size: 26px; color: var(--text-bright); margin-bottom: 6px;">
                ${isHinglish ? 'Command Reference & Learning Terminal' : 'Master Cyber Security & IT Commands'}
              </h2>
              <p style="color: var(--text-muted); font-size: 14px; max-width: 720px; line-height: 1.5;">
                ${isHinglish 
                  ? 'Networking, Kali Linux, Penetration Testing, Windows/Linux SysAdmin aur Cyber Forensics se related sabhi zaroori commands - Syntax, options, aasan explanation aur 1-click copy examples ke saath.'
                  : 'Exhaustive command-line cheat sheet and field reference for Networking, Kali Linux, Ethical Hacking, System Administration, and Digital Forensics. Complete with syntax, flags, and real-world examples.'}
              </p>
            </div>

            <!-- Search Bar -->
            <div style="min-width: 320px; flex: 1; max-width: 480px;">
              <div style="position: relative;">
                <input 
                  type="text" 
                  id="command-search-input" 
                  class="search-input" 
                  placeholder="${isHinglish ? 'Command, flag ya topic search karein... (e.g. nmap, ping, dd)' : 'Search commands, flags, syntax... (e.g. nmap, ping, dd)'}" 
                  value="${escapeHtml(searchQuery)}" 
                  style="width: 100%; padding-left: 36px;"
                />
                <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); opacity: 0.6;">🔍</span>
                ${searchQuery ? `<button id="btn-clear-search" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 14px;">✕</button>` : ''}
              </div>
            </div>
          </div>
        </div>

        <!-- Category Filter Tabs -->
        <div class="domain-filter-bar" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;">
          ${COMMAND_CATEGORIES.map(cat => `
            <span class="filter-pill ${activeCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">
              ${cat.label} 
              <span style="opacity: 0.7; font-size: 11px; margin-left: 4px;">(${cat.id === 'all' ? COMMANDS_DATA.length : COMMANDS_DATA.filter(c => c.category === cat.id).length})</span>
            </span>
          `).join('')}
        </div>

        <!-- Commands Grid -->
        <div style="display: flex; flex-direction: column; gap: 20px;">
          ${filteredCommands.length === 0 ? `
            <div class="card-tactical" style="text-align: center; padding: 48px 20px;">
              <div style="font-size: 32px; margin-bottom: 12px;">🔎</div>
              <h3 style="color: var(--text-bright); margin-bottom: 8px;">No commands match "${escapeHtml(searchQuery)}"</h3>
              <p style="color: var(--text-muted); font-size: 14px;">Try searching for another keyword or reset the category filter.</p>
              <button class="btn btn-cyan btn-sm" id="btn-reset-filters" style="margin-top: 16px;">
                Reset Search Filters
              </button>
            </div>
          ` : filteredCommands.map(cmd => {
            let dangerBadgeColor = 'var(--emerald-glow)';
            let dangerBg = 'rgba(16, 185, 129, 0.1)';
            if (cmd.dangerLevel.includes('Critical') || cmd.dangerLevel.includes('Aggressive')) {
              dangerBadgeColor = 'var(--crimson-glow)';
              dangerBg = 'rgba(239, 68, 68, 0.1)';
            } else if (cmd.dangerLevel.includes('Probe') || cmd.dangerLevel.includes('Admin')) {
              dangerBadgeColor = 'var(--cyan-glow)';
              dangerBg = 'rgba(14, 165, 233, 0.1)';
            }

            return `
              <div class="card-tactical command-card" id="card-${cmd.id}" style="border-left: 4px solid ${dangerBadgeColor}; transition: all 0.2s ease;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 14px;">
                  <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                    <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--border-accent); border-radius: var(--radius-sm); padding: 6px 14px; font-family: var(--font-mono); font-size: 17px; font-weight: 700; color: var(--cyan-glow);">
                      $ ${cmd.cmd}
                    </div>
                    <span class="tag-pill" style="border-color: var(--border-accent); color: var(--text-primary); font-size: 11px;">
                      ${cmd.subCategory}
                    </span>
                    <span class="tag-pill" style="background: ${dangerBg}; color: ${dangerBadgeColor}; border-color: ${dangerBadgeColor}; font-size: 11px; font-weight: 700;">
                      ${cmd.dangerLevel.toUpperCase()}
                    </span>
                  </div>

                  <button class="btn btn-cyan btn-sm btn-copy-cmd" data-clipboard="${escapeHtml(cmd.example)}" title="Copy practical command to clipboard">
                    <span class="copy-icon">📋</span>
                    <span class="copy-label">Copy Command</span>
                  </button>
                </div>

                <!-- Explanation / Brief -->
                <div style="margin-bottom: 16px;">
                  <p style="color: var(--text-bright); font-size: 14px; line-height: 1.6; margin-bottom: 6px;">
                    <strong>Purpose:</strong> ${cmd.summary}
                  </p>
                  ${cmd.summary_hi ? `
                    <p style="color: var(--cyan-glow); font-size: 13px; line-height: 1.5; background: rgba(14, 165, 233, 0.05); padding: 8px 12px; border-radius: var(--radius-sm); border-left: 2px solid var(--cyan-glow);">
                      <strong>🇮🇳 Hinglish Explanation:</strong> ${cmd.summary_hi}
                    </p>
                  ` : ''}
                </div>

                <!-- Syntax Bar -->
                <div style="background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 10px 14px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                  <div style="font-family: var(--font-mono); font-size: 13px; color: var(--gold-crest); word-break: break-all;">
                    <span style="color: var(--text-dim); user-select: none;">SYNTAX: </span>${escapeHtml(cmd.syntax)}
                  </div>
                  <button class="btn btn-outline btn-sm btn-copy-cmd" data-clipboard="${escapeHtml(cmd.syntax)}" style="padding: 3px 8px; font-size: 11px;">
                    Copy Syntax
                  </button>
                </div>

                <!-- Key Flags / Options -->
                ${cmd.options && cmd.options.length > 0 ? `
                  <div style="margin-bottom: 16px;">
                    <div style="font-size: 12px; font-weight: 700; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">
                      COMMON FLAGS & PARAMETERS
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 8px;">
                      ${cmd.options.map(opt => `
                        <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 8px 12px; font-size: 13px;">
                          <code style="color: var(--cyan-glow); font-weight: 700; font-family: var(--font-mono);">${escapeHtml(opt.flag)}</code>
                          <span style="color: var(--text-muted); margin-left: 8px;">${escapeHtml(opt.desc)}</span>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                ` : ''}

                <!-- Practical Example & Output Terminal -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 14px;">
                  <!-- Practical Execution -->
                  <div style="background: #050811; border: 1px solid rgba(56, 189, 248, 0.2); border-radius: var(--radius-sm); padding: 12px 14px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                      <span style="font-size: 11px; font-weight: 700; color: var(--text-dim); letter-spacing: 0.05em;">
                        PRACTICAL USAGE EXAMPLE
                      </span>
                      <button class="btn btn-outline btn-sm btn-copy-cmd" data-clipboard="${escapeHtml(cmd.example)}" style="padding: 2px 8px; font-size: 10px;">
                        Copy
                      </button>
                    </div>
                    <pre style="margin: 0; font-family: var(--font-mono); font-size: 13px; color: var(--emerald-glow); white-space: pre-wrap; word-break: break-all;"><code>$ ${escapeHtml(cmd.example)}</code></pre>
                  </div>

                  <!-- Terminal Sample Output -->
                  ${cmd.outputSample ? `
                    <div style="background: #03050a; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: var(--radius-sm); padding: 12px 14px;">
                      <div style="font-size: 11px; font-weight: 700; color: var(--text-dim); letter-spacing: 0.05em; margin-bottom: 8px;">
                        TERMINAL OUTPUT PREVIEW
                      </div>
                      <pre style="margin: 0; font-family: var(--font-mono); font-size: 12px; color: #a1a1aa; line-height: 1.4; max-height: 110px; overflow-y: auto; white-space: pre-wrap;"><code>${escapeHtml(cmd.outputSample)}</code></pre>
                    </div>
                  ` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // Event listeners
    container.querySelectorAll('[data-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        cyberAudio.playClick();
        activeCategory = btn.getAttribute('data-cat');
        render();
      });
    });

    const searchInput = container.querySelector('#command-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        render();
        // Maintain focus
        const newSearchInput = container.querySelector('#command-search-input');
        if (newSearchInput) {
          newSearchInput.focus();
          newSearchInput.setSelectionRange(searchQuery.length, searchQuery.length);
        }
      });
    }

    const clearBtn = container.querySelector('#btn-clear-search');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        cyberAudio.playClick();
        searchQuery = '';
        render();
      });
    }

    const resetFiltersBtn = container.querySelector('#btn-reset-filters');
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', () => {
        cyberAudio.playClick();
        searchQuery = '';
        activeCategory = 'all';
        render();
      });
    }

    // Copy to clipboard
    container.querySelectorAll('.btn-copy-cmd').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const textToCopy = btn.getAttribute('data-clipboard');
        if (textToCopy) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            cyberAudio.playClick();
            const label = btn.querySelector('.copy-label') || btn;
            const originalText = label.innerText;
            label.innerText = 'Copied! ✓';
            btn.style.borderColor = 'var(--emerald-glow)';
            btn.style.color = 'var(--emerald-glow)';
            setTimeout(() => {
              label.innerText = originalText;
              btn.style.borderColor = '';
              btn.style.color = '';
            }, 1800);
          });
        }
      });
    });
  }

  function escapeHtml(text) {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  render();
}
