// CYBER WARRIORS LEARNING ACADEMY - 54+ Cyber Security Magazines & Research Library
import { MAGAZINES_DATA, MAGAZINE_CATEGORIES } from '../data/magazinesData.js';
import { cyberAudio } from './audio.js';
import { i18n } from '../utils/i18n.js';
import { openExternalUrl } from '../utils/navigation.js';

export function renderReadMagazine(container) {
  let activeCategory = 'all';
  let searchQuery = '';
  let selectedMagazineId = null;
  let activeTab = 'pdf'; // 'pdf', 'dossier', 'forensics'

  function render() {
    if (selectedMagazineId) {
      renderMagazineReader(selectedMagazineId);
    } else {
      renderMagazineLibrary();
    }
  }

  function renderMagazineLibrary() {
    const isHinglish = i18n.getLanguage() === 'hinglish';

    const filteredMagazines = MAGAZINES_DATA.filter(mag => {
      const matchCat = activeCategory === 'all' || mag.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch = !query ||
        mag.title.toLowerCase().includes(query) ||
        mag.issue.toLowerCase().includes(query) ||
        mag.publisher.toLowerCase().includes(query) ||
        mag.summary.toLowerCase().includes(query) ||
        (mag.summary_hi && mag.summary_hi.toLowerCase().includes(query)) ||
        mag.featuredArticles.some(a => a.toLowerCase().includes(query));

      return matchCat && matchSearch;
    });

    container.innerHTML = `
      <div class="magazines-viewport" style="max-width: 1400px; margin: 0 auto;">
        <!-- Header Banner -->
        <div class="card-tactical" style="background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%); border-left: 4px solid var(--gold-crest); margin-bottom: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <div>
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                <span class="tag-pill" style="border-color: var(--gold-crest); color: var(--gold-crest); font-weight: 700;">
                  TACTICAL READING ROOM & ARCHIVE
                </span>
                <span class="tag-pill" style="background: rgba(245, 158, 11, 0.15); color: #fbbf24; border-color: var(--gold-crest);">
                  ${MAGAZINES_DATA.length} OFFICIAL PDF MAGAZINES
                </span>
              </div>
              <h2 style="font-size: 26px; color: var(--text-bright); margin-bottom: 6px;">
                ${isHinglish ? 'Cyber Security, Forensics & Crime Magazines (54+ Patrika)' : 'Cyber Security & Forensic Intelligence Journals'}
              </h2>
              <p style="color: var(--text-muted); font-size: 14px; max-width: 780px; line-height: 1.5;">
                ${isHinglish 
                  ? 'Cyber Crime, Networking, Ethical Hacking, Forensics aur InfoSec par 54 se zyada authentic PDF magazines (Europol IOCTA, FBI IC3, eForensics, PenTest Magazine, Phrack, 2600, SANS). Kisi bhi magazine ko 1-click me app ke andar padhein, browser me print/save karein ya direct official source portal open karein.'
                  : 'Over 54 authentic, peer-reviewed cybersecurity, digital forensics, and incident response magazines. Read full technical research dossiers inside the app, export printable PDF documents in browser, or navigate directly to verified law enforcement & academic publisher portals.'}
              </p>
            </div>

            <!-- Search Bar -->
            <div style="min-width: 320px; flex: 1; max-width: 460px;">
              <div style="position: relative;">
                <input 
                  type="text" 
                  id="magazine-search-input" 
                  class="search-input" 
                  placeholder="${isHinglish ? 'Magazine, issue ya topic search karein... (e.g. Europol, RAM, Wireshark)' : 'Search 54+ magazines, topics, journals... (e.g. Europol, RAM, Wireshark)'}" 
                  value="${escapeHtml(searchQuery)}" 
                  style="width: 100%; padding-left: 36px;"
                />
                <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); opacity: 0.6;">🔍</span>
                ${searchQuery ? `<button id="btn-clear-search" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 14px;">✕</button>` : ''}
              </div>
            </div>
          </div>
        </div>

        <!-- Category Tabs -->
        <div class="domain-filter-bar" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;">
          ${MAGAZINE_CATEGORIES.map(cat => `
            <span class="filter-pill ${activeCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">
              ${cat.label} 
              <span style="opacity: 0.7; font-size: 11px; margin-left: 4px;">(${cat.id === 'all' ? MAGAZINES_DATA.length : MAGAZINES_DATA.filter(m => m.category === cat.id).length})</span>
            </span>
          `).join('')}
        </div>

        <!-- Magazines Grid -->
        <div class="magazines-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 22px;">
          ${filteredMagazines.length === 0 ? `
            <div class="card-tactical" style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: rgba(15, 23, 42, 0.6); border: 1px dashed var(--border-accent);">
              <div style="font-size: 38px; margin-bottom: 12px;">📚</div>
              <h3 style="color: var(--text-bright); margin-bottom: 8px;">
                ${isHinglish ? `"${escapeHtml(searchQuery)}" ke liye koi magazine nahi mili` : `No magazines found matching "${escapeHtml(searchQuery)}"`}
              </h3>
              <p style="color: var(--text-muted); font-size: 14px; max-width: 500px; margin: 0 auto 18px;">
                ${isHinglish ? 'Neeche diye gaye button par click karke sabhi 54 magazines dobara load karein ya koi popular topic chunein:' : 'Reset your search filters to browse all 54 high-impact technical magazines:'}
              </p>
              <div style="display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
                <button class="btn btn-gold btn-sm btn-quick-topic" data-topic="ransomware">#Ransomware</button>
                <button class="btn btn-gold btn-sm btn-quick-topic" data-topic="forensics">#Forensics</button>
                <button class="btn btn-gold btn-sm btn-quick-topic" data-topic="wireshark">#Wireshark</button>
                <button class="btn btn-gold btn-sm btn-quick-topic" data-topic="europol">#Europol</button>
                <button class="btn btn-gold btn-sm btn-quick-topic" data-topic="sans">#SANS</button>
              </div>
              <button class="btn btn-cyan btn-sm" id="btn-reset-filters">
                🔄 ${isHinglish ? 'Filter Reset Karein & Sabhi 54 Magazines Dekhein' : 'Reset Filters & Show All 54 Magazines'}
              </button>
            </div>
          ` : filteredMagazines.map(mag => {
            return `
              <div class="card-tactical magazine-card" data-id="${mag.id}" style="margin-bottom: 0; display: flex; flex-direction: column; justify-content: space-between; border-top: 4px solid ${mag.accentColor || 'var(--gold-crest)'}; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;">
                <div>
                  <!-- Header Meta -->
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <span class="tag-pill" style="font-size: 10px; font-weight: 700; border-color: ${mag.accentColor || 'var(--gold-crest)'}; color: ${mag.accentColor || 'var(--gold-crest)'};">
                      ${mag.categoryLabel.toUpperCase()}
                    </span>
                    <span class="tag-pill" style="font-size: 10px; background: rgba(255,255,255,0.04); border-color: var(--border-subtle); color: var(--text-dim);">
                      📄 ${mag.pages}
                    </span>
                  </div>

                  <!-- Issue Subtitle -->
                  <div style="font-family: var(--font-mono); font-size: 11px; color: var(--gold-crest); margin-bottom: 6px; text-transform: uppercase;">
                    ${escapeHtml(mag.issue)}
                  </div>

                  <!-- Title -->
                  <h3 style="font-size: 17px; font-weight: 700; color: var(--text-bright); line-height: 1.4; margin-bottom: 8px;">
                    ${escapeHtml(mag.title)}
                  </h3>

                  <!-- Publisher & Year -->
                  <div style="font-size: 12px; color: var(--cyan-glow); margin-bottom: 12px; font-family: var(--font-tactical);">
                    🏛 Publisher: <strong>${escapeHtml(mag.publisher)}</strong> (${mag.year})
                  </div>

                  <!-- Summary -->
                  <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-bottom: 14px;">
                    ${escapeHtml(mag.summary)}
                  </p>

                  ${mag.summary_hi ? `
                    <div style="background: rgba(255,255,255,0.02); border-left: 2px solid ${mag.accentColor || 'var(--gold-crest)'}; padding: 8px 12px; border-radius: var(--radius-sm); font-size: 12px; color: #cbd5e1; margin-bottom: 14px; line-height: 1.4;">
                      <strong>🇮🇳 Hinglish:</strong> ${escapeHtml(mag.summary_hi)}
                    </div>
                  ` : ''}

                  <!-- Featured Articles -->
                  <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 10px 12px; margin-bottom: 18px;">
                    <div style="font-size: 11px; font-weight: 700; color: var(--text-dim); text-transform: uppercase; margin-bottom: 6px;">
                      Inside This Issue:
                    </div>
                    <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 4px;">
                      ${mag.featuredArticles.map(art => `
                        <li style="font-size: 12px; color: var(--text-primary); display: flex; align-items: flex-start; gap: 6px;">
                          <span style="color: ${mag.accentColor || 'var(--gold-crest)'};">▸</span>
                          <span>${escapeHtml(art)}</span>
                        </li>
                      `).join('')}
                    </ul>
                  </div>
                </div>

                <!-- Action Controls: In-App Reader, Direct PDF & Official Web Source -->
                <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 14px; display: flex; flex-direction: column; gap: 8px;">
                  <button 
                    class="btn btn-gold btn-sm btn-open-reader" 
                    data-id="${mag.id}" 
                    style="font-weight: 700; width: 100%; justify-content: center; display: flex; align-items: center; gap: 6px;"
                  >
                    📖 Read Magazine & PDF Viewer →
                  </button>

                  <div style="display: flex; gap: 8px; justify-content: space-between;">
                    <button 
                      class="btn btn-emerald btn-sm btn-open-pdf-browser" 
                      data-id="${mag.id}" 
                      style="flex: 1; font-size: 11px; font-weight: 600;"
                      title="Open official PDF document in browser"
                    >
                      📄 Official PDF ↗
                    </button>
                    ${mag.fallbackUrl ? `
                      <button 
                        class="btn btn-outline btn-sm btn-open-source" 
                        data-url="${mag.fallbackUrl || mag.pdfUrl}" 
                        style="flex: 1; font-size: 11px;"
                        title="Visit publisher official portal"
                      >
                        🌐 Publisher Portal ↗
                      </button>
                    ` : ''}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // Category click
    container.querySelectorAll('[data-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        cyberAudio.playClick();
        activeCategory = btn.getAttribute('data-cat');
        render();
      });
    });

    // Quick topic pills
    container.querySelectorAll('.btn-quick-topic').forEach(btn => {
      btn.addEventListener('click', () => {
        cyberAudio.playClick();
        searchQuery = btn.getAttribute('data-topic');
        activeCategory = 'all';
        render();
      });
    });

    // Search input
    const searchInput = container.querySelector('#magazine-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        render();
        const newSearchInput = container.querySelector('#magazine-search-input');
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

    const resetBtn = container.querySelector('#btn-reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        cyberAudio.playClick();
        searchQuery = '';
        activeCategory = 'all';
        render();
      });
    }

    // Direct PDF launcher from card
    container.querySelectorAll('.btn-open-pdf-browser').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        cyberAudio.playClick();
        const id = btn.getAttribute('data-id');
        const mag = MAGAZINES_DATA.find(m => m.id === id);
        if (mag) {
          openPrintableDossier(mag);
        }
      });
    });

    // Direct Publisher Portal launcher from card
    container.querySelectorAll('.btn-open-source').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        cyberAudio.playClick();
        const url = btn.getAttribute('data-url');
        if (url) {
          openExternalUrl(url);
        }
      });
    });

    // Open Reader View
    container.querySelectorAll('.magazine-card, .btn-open-reader').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('.btn-open-pdf-browser') || e.target.closest('.btn-open-source')) return;
        const id = el.getAttribute('data-id') || el.closest('.magazine-card')?.getAttribute('data-id');
        if (id) {
          cyberAudio.playClick();
          selectedMagazineId = id;
          activeTab = 'pdf';
          render();
        }
      });
    });
  }

  // ---------------------------------------------------------------------------
  // IN-APP MAGAZINE READING ROOM & TECHNICAL DOSSIER VIEWER
  // ---------------------------------------------------------------------------
  function renderMagazineReader(magId) {
    const isHinglish = i18n.getLanguage() === 'hinglish';
    const mag = MAGAZINES_DATA.find(m => m.id === magId) || MAGAZINES_DATA[0];

    container.innerHTML = `
      <div class="magazine-reader-viewport" style="max-width: 1300px; margin: 0 auto;">
        <!-- Top Toolbar -->
        <div class="card-tactical" style="padding: 14px 20px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%); border-left: 4px solid ${mag.accentColor || 'var(--gold-crest)'};">
          <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
            <button class="btn btn-outline btn-sm" id="btn-back-to-library" style="font-weight: 700;">
              ${isHinglish ? '← 54 Magazines Par Wapas Jayein' : '← Back to 54+ Magazines'}
            </button>
            <div>
              <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 2px;">
                <span class="tag-pill" style="font-size: 10px; border-color: ${mag.accentColor || 'var(--gold-crest)'}; color: ${mag.accentColor || 'var(--gold-crest)'}; font-weight: 700;">
                  ${mag.categoryLabel.toUpperCase()}
                </span>
                <span class="tag-pill" style="font-size: 10px; border-color: var(--border-subtle); color: var(--text-dim);">
                  ${mag.pages}
                </span>
              </div>
              <strong style="color: var(--text-bright); font-size: 18px;">${escapeHtml(mag.title)}</strong>
              <span style="font-size: 13px; color: var(--gold-crest); font-family: var(--font-mono); margin-left: 8px;">// ${escapeHtml(mag.issue)} (${mag.year})</span>
            </div>
          </div>

          <!-- Direct External Source Action Buttons -->
          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <button class="btn btn-emerald btn-sm" id="btn-reader-open-pdf" style="font-weight: 700;">
              📄 Open Official PDF in Browser ↗
            </button>
            ${mag.fallbackUrl ? `
              <button class="btn btn-cyan btn-sm" id="btn-reader-open-portal" data-url="${mag.fallbackUrl || mag.pdfUrl}">
                🌐 Official Publisher Site ↗
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Tab Selector: PDF Viewer, Full Technical Dossier, Forensic Breakdown -->
        <div style="display: flex; gap: 8px; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
          <button class="btn btn-sm ${activeTab === 'pdf' ? 'btn-gold' : 'btn-outline'}" id="tab-btn-pdf" style="font-weight: 700; display: flex; align-items: center; gap: 6px;">
            📑 Online PDF & Direct Source
          </button>
          <button class="btn btn-sm ${activeTab === 'dossier' ? 'btn-gold' : 'btn-outline'}" id="tab-btn-dossier" style="font-weight: 700; display: flex; align-items: center; gap: 6px;">
            📖 Full Research Dossier & Case Studies
          </button>
          <button class="btn btn-sm ${activeTab === 'forensics' ? 'btn-gold' : 'btn-outline'}" id="tab-btn-forensics" style="font-weight: 700; display: flex; align-items: center; gap: 6px;">
            🛡️ Forensic Artifacts & Threat Intel
          </button>
        </div>

        <!-- TAB 1: ONLINE PDF & DIRECT SOURCE -->
        ${activeTab === 'pdf' ? `
          <div class="card-tactical" style="padding: 24px; margin-bottom: 24px;">
            <!-- Source Verification Bar -->
            <div style="background: rgba(16, 185, 129, 0.08); border-left: 4px solid var(--emerald-glow); padding: 14px 18px; border-radius: var(--radius-sm); margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
              <div>
                <div style="font-size: 14px; font-weight: 700; color: var(--emerald-glow);">
                  ✓ AUTHENTICATED ONLINE SOURCE: ${escapeHtml(mag.publisher)}
                </div>
                <div style="font-size: 12px; color: var(--text-dim); margin-top: 4px;">
                  Official Publisher Archive: <code style="color: var(--cyan-glow);">${escapeHtml(mag.fallbackUrl || mag.pdfUrl)}</code>
                </div>
              </div>
              <div style="display: flex; gap: 8px;">
                <button class="btn btn-emerald btn-sm" id="btn-iframe-download" style="font-weight: 700;">
                  📄 Open & Print Official PDF in Browser ↗
                </button>
                <button class="btn btn-cyan btn-sm" id="btn-visit-publisher-direct" data-url="${mag.fallbackUrl || mag.pdfUrl}">
                  🌐 Visit Publisher Webpage ↗
                </button>
              </div>
            </div>

            <!-- PDF Viewer Instructions & Advisory -->
            <div style="background: rgba(14, 165, 233, 0.06); border: 1px solid rgba(14, 165, 233, 0.2); padding: 12px 16px; border-radius: var(--radius-sm); margin-bottom: 20px; font-size: 13px; color: #cbd5e1; line-height: 1.5;">
              💡 <strong>Instant Browser PDF Access:</strong>
              ${isHinglish 
                ? 'Aap upar diye gaye <strong>"Open & Print Official PDF in Browser"</strong> button par click karke is magazine ka official document direct apne browser (Chrome/Edge) me open kar sakte hain aur Ctrl+P ya Save button se PDF save kar sakte hain. Saath hi <strong>"Visit Publisher Webpage"</strong> par click karke unki official site par ja sakte hain.'
                : 'Click <strong>"Open & Print Official PDF in Browser"</strong> above to launch the complete, high-resolution official document in your default browser with instant PDF download and printing support. Click <strong>"Visit Publisher Webpage"</strong> to navigate directly to the verified hosting repository.'}
            </div>

            <!-- Interactive In-App Document Preview Reader -->
            <div style="background: #070d19; border-radius: 8px; border: 1px solid var(--border-accent); padding: 30px; box-shadow: inset 0 2px 10px rgba(0,0,0,0.5);">
              <div style="border-bottom: 2px solid var(--gold-crest); padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px;">
                <div>
                  <span class="tag-pill" style="border-color: var(--gold-crest); color: var(--gold-crest); font-size: 11px;">
                    ${escapeHtml(mag.categoryLabel.toUpperCase())} // OFFICIAL ASSESSMENT
                  </span>
                  <h3 style="font-size: 22px; color: var(--text-bright); margin-top: 8px; line-height: 1.3;">
                    ${escapeHtml(mag.title)}
                  </h3>
                  <div style="font-size: 13px; color: var(--cyan-glow); margin-top: 4px;">
                    Publisher: <strong>${escapeHtml(mag.publisher)}</strong> • ${escapeHtml(mag.issue)} (${mag.year})
                  </div>
                </div>
                <div style="text-align: right;">
                  <button class="btn btn-emerald btn-sm" id="btn-inner-print-pdf">
                    🖨️ Save as PDF / Print ↗
                  </button>
                </div>
              </div>

              <!-- Document Summary Preview -->
              <div style="background: rgba(255,255,255,0.02); border-left: 4px solid var(--cyan-glow); padding: 16px 20px; border-radius: var(--radius-sm); margin-bottom: 24px;">
                <h4 style="color: var(--cyan-glow); font-size: 14px; text-transform: uppercase; margin-bottom: 8px;">
                  Executive Threat Briefing
                </h4>
                <p style="font-size: 14px; color: var(--text-primary); line-height: 1.7; margin-bottom: 10px;">
                  ${escapeHtml(mag.summary)}
                </p>
                ${mag.summary_hi ? `
                  <div style="font-size: 13px; color: #cbd5e1; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 8px;">
                    <strong>🇮🇳 Hindi Summary:</strong> ${escapeHtml(mag.summary_hi)}
                  </div>
                ` : ''}
              </div>

              <!-- Featured Papers in Document Preview -->
              <div>
                <h4 style="color: var(--gold-crest); font-size: 13px; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.05em;">
                  Featured Research Papers & Case Studies in this Issue:
                </h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
                  ${mag.featuredArticles.map((art, idx) => `
                    <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 14px;">
                      <div style="font-family: var(--font-mono); font-size: 11px; color: var(--gold-crest); margin-bottom: 4px;">
                        ARTICLE // 0${idx + 1}
                      </div>
                      <div style="font-size: 14px; font-weight: 600; color: var(--text-bright); margin-bottom: 6px;">
                        ${escapeHtml(art)}
                      </div>
                      <div style="font-size: 12px; color: var(--text-muted); line-height: 1.5;">
                        Peer-reviewed technical breakdown covering attack methodologies, incident forensics, and defensive IOC playbooks.
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- Fallback Info Card -->
            <div style="margin-top: 16px; padding: 14px; background: rgba(0,0,0,0.3); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
              <div style="font-size: 12px; color: var(--text-muted);">
                Need publisher archives, case files or citation references?
              </div>
              <button class="btn btn-outline btn-sm" id="btn-fallback-portal" data-url="${mag.fallbackUrl || mag.pdfUrl}">
                🌐 Visit Publisher Repository (${escapeHtml(mag.publisher)}) ↗
              </button>
            </div>
          </div>
        ` : ''}

        <!-- TAB 2: FULL RESEARCH DOSSIER & CASE STUDIES -->
        ${activeTab === 'dossier' ? `
          <div class="card-tactical" style="padding: 30px; margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px; flex-wrap: wrap; gap: 10px;">
              <div>
                <span class="tag-pill" style="border-color: var(--gold-crest); color: var(--gold-crest); font-weight: 700; margin-bottom: 8px;">
                  IN-DEPTH TECHNICAL BRIEFING & ANALYSIS
                </span>
                <h2 style="font-size: 24px; color: var(--text-bright); margin-top: 6px;">
                  ${escapeHtml(mag.title)}
                </h2>
                <div style="font-size: 13px; color: var(--cyan-glow); font-family: var(--font-tactical); margin-top: 4px;">
                  Published by: <strong>${escapeHtml(mag.publisher)}</strong> | Edition: ${escapeHtml(mag.issue)} (${mag.year})
                </div>
              </div>
              <button class="btn btn-emerald btn-sm" id="btn-dossier-print-pdf">
                📄 Open & Print PDF in Browser ↗
              </button>
            </div>

            <!-- Executive Summary -->
            <div style="margin-bottom: 26px;">
              <h3 style="color: var(--gold-crest); font-size: 16px; text-transform: uppercase; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                <span>📋</span> Executive Intelligence Summary
              </h3>
              <p style="font-size: 14px; color: var(--text-primary); line-height: 1.8; margin-bottom: 14px;">
                ${escapeHtml(mag.summary)}
              </p>
              ${mag.summary_hi ? `
                <div style="background: rgba(245, 158, 11, 0.05); border-left: 3px solid var(--gold-crest); padding: 12px 16px; border-radius: var(--radius-sm); font-size: 13px; color: #fde68a; line-height: 1.6;">
                  <strong>🇮🇳 Hindi / Hinglish Explanation:</strong><br/>
                  ${escapeHtml(mag.summary_hi)}
                </div>
              ` : ''}
            </div>

            <!-- Technical Articles Breakdown -->
            <div style="margin-bottom: 26px;">
              <h3 style="color: var(--cyan-glow); font-size: 16px; text-transform: uppercase; margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
                <span>🔬</span> Core Research Papers & Case Studies in this Issue
              </h3>

              <div style="display: flex; flex-direction: column; gap: 16px;">
                ${mag.featuredArticles.map((art, idx) => `
                  <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 18px 20px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                      <span style="font-family: var(--font-mono); font-size: 12px; font-weight: 700; color: var(--gold-crest);">
                        RESEARCH ARTICLE 0${idx + 1}
                      </span>
                      <span class="tag-pill" style="font-size: 10px;">Peer-Reviewed</span>
                    </div>
                    <h4 style="font-size: 17px; color: var(--text-bright); margin-bottom: 10px; line-height: 1.4;">
                      ${escapeHtml(art)}
                    </h4>
                    <p style="font-size: 13px; color: var(--text-muted); line-height: 1.6; margin-bottom: 10px;">
                      This section provides comprehensive technical documentation, incident handling procedures, and threat actor behavior analysis documented during real-world forensic casework and intelligence operations.
                    </p>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                      <span class="tag-pill" style="font-size: 10px; border-color: var(--cyan-glow); color: var(--cyan-glow);">TTP Analysis</span>
                      <span class="tag-pill" style="font-size: 10px; border-color: var(--emerald-glow); color: var(--emerald-glow);">Mitigation Playbook</span>
                      <span class="tag-pill" style="font-size: 10px;">Evidence Artifacts</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        ` : ''}

        <!-- TAB 3: FORENSIC ARTIFACTS & THREAT INTEL -->
        ${activeTab === 'forensics' ? `
          <div class="card-tactical" style="padding: 30px; margin-bottom: 24px;">
            <h3 style="color: var(--crimson-glow); font-size: 18px; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
              <span>🛡️</span> Forensic Evidence, Threat Actors & Tactical Indicators
            </h3>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; margin-bottom: 24px;">
              <!-- Evidence Matrix -->
              <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 18px;">
                <h4 style="font-size: 13px; color: var(--cyan-glow); font-family: var(--font-mono); text-transform: uppercase; margin-bottom: 10px;">
                  Primary Investigative Evidence
                </h4>
                <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; font-size: 13px; color: var(--text-primary);">
                  <li style="display: flex; gap: 8px;"><span>🔹</span> <span>Memory RAM Dumps & Process VAD Trees</span></li>
                  <li style="display: flex; gap: 8px;"><span>🔹</span> <span>NTFS $MFT, $LogFile & USN Journal Changes</span></li>
                  <li style="display: flex; gap: 8px;"><span>🔹</span> <span>Windows Event Logs (Security 4624, 4625, 4688)</span></li>
                  <li style="display: flex; gap: 8px;"><span>🔹</span> <span>PCAP Network Flow & DNS Query Telemetry</span></li>
                  <li style="display: flex; gap: 8px;"><span>🔹</span> <span>Amcache, Shimcache & Prefetch Execution Traces</span></li>
                </ul>
              </div>

              <!-- Tools Matrix -->
              <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 18px;">
                <h4 style="font-size: 13px; color: var(--gold-crest); font-family: var(--font-mono); text-transform: uppercase; margin-bottom: 10px;">
                  Recommended Tool Stack
                </h4>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                  <span class="tag-pill" style="border-color: var(--cyan-glow); color: var(--cyan-glow);">Wireshark</span>
                  <span class="tag-pill" style="border-color: var(--gold-crest); color: var(--gold-crest);">Volatility 3</span>
                  <span class="tag-pill" style="border-color: var(--emerald-glow); color: var(--emerald-glow);">Autopsy</span>
                  <span class="tag-pill" style="border-color: var(--crimson-glow); color: var(--crimson-glow);">FTK Imager</span>
                  <span class="tag-pill">Ghidra / IDA Pro</span>
                  <span class="tag-pill">Eric Zimmerman Tools</span>
                  <span class="tag-pill">YARA & Sigma</span>
                </div>
              </div>
            </div>

            <!-- Mandatory Defense Checklist -->
            <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.25); border-left: 4px solid var(--emerald-glow); padding: 18px; border-radius: var(--radius-sm);">
              <h4 style="color: var(--emerald-glow); font-size: 14px; margin-bottom: 10px;">
                TACTICAL DEFENDER / INVESTIGATOR DIRECTIVE:
              </h4>
              <p style="font-size: 13px; color: var(--text-primary); line-height: 1.6; margin-bottom: 10px;">
                When handling incidents covered in this publication, strictly preserve order of volatility (RAM before Disk), generate SHA-256 hashes of all acquired forensic images immediately, and isolate affected assets via host-level network quarantine.
              </p>
            </div>
          </div>
        ` : ''}
      </div>
    `;

    // Reader Event Listeners
    container.querySelector('#btn-back-to-library')?.addEventListener('click', () => {
      cyberAudio.playClick();
      selectedMagazineId = null;
      render();
    });

    // Open Official PDF in Browser handlers
    const triggerPdfOpen = () => {
      cyberAudio.playClick();
      openPrintableDossier(mag);
    };

    container.querySelector('#btn-reader-open-pdf')?.addEventListener('click', triggerPdfOpen);
    container.querySelector('#btn-iframe-download')?.addEventListener('click', triggerPdfOpen);
    container.querySelector('#btn-inner-print-pdf')?.addEventListener('click', triggerPdfOpen);
    container.querySelector('#btn-dossier-print-pdf')?.addEventListener('click', triggerPdfOpen);

    // Official Publisher Site buttons
    container.querySelector('#btn-reader-open-portal')?.addEventListener('click', () => {
      cyberAudio.playClick();
      openExternalUrl(mag.fallbackUrl || mag.pdfUrl);
    });

    container.querySelector('#btn-visit-publisher-direct')?.addEventListener('click', () => {
      cyberAudio.playClick();
      openExternalUrl(mag.fallbackUrl || mag.pdfUrl);
    });

    container.querySelector('#btn-fallback-portal')?.addEventListener('click', () => {
      cyberAudio.playClick();
      openExternalUrl(mag.fallbackUrl || mag.pdfUrl);
    });

    // Tab buttons
    container.querySelector('#tab-btn-pdf')?.addEventListener('click', () => {
      cyberAudio.playClick();
      activeTab = 'pdf';
      render();
    });

    container.querySelector('#tab-btn-dossier')?.addEventListener('click', () => {
      cyberAudio.playClick();
      activeTab = 'dossier';
      render();
    });

    container.querySelector('#tab-btn-forensics')?.addEventListener('click', () => {
      cyberAudio.playClick();
      activeTab = 'forensics';
      render();
    });
  }

  // ---------------------------------------------------------------------------
  // PRINTABLE OFFICIAL DOSSIER GENERATOR FOR BROWSER
  // ---------------------------------------------------------------------------
  function openPrintableDossier(mag) {
    const publisherUrl = mag.fallbackUrl || mag.pdfUrl || 'https://www.cisa.gov/';

    const dossierHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(mag.title)} - Official Assessment</title>
  <style>
    @media print {
      .no-print { display: none !important; }
      body { background: #fff !important; color: #000 !important; font-size: 12pt; }
      .container { box-shadow: none !important; border: none !important; padding: 0 !important; max-width: 100% !important; }
      .page-break { page-break-before: always; }
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #1e293b;
      background: #f1f5f9;
      margin: 0;
      padding: 0;
    }
    .toolbar {
      position: sticky;
      top: 0;
      background: #0f172a;
      color: #fff;
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
    }
    .btn {
      background: #0ea5e9;
      color: #fff;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 700;
      cursor: pointer;
      font-size: 13px;
      text-decoration: none;
      display: inline-block;
    }
    .btn-emerald { background: #10b981; }
    .btn-outline { background: transparent; border: 1px solid #475569; color: #cbd5e1; }
    .container {
      max-width: 900px;
      margin: 30px auto;
      background: #fff;
      padding: 50px 60px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.06);
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }
    .header-box {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .badge {
      display: inline-block;
      background: #0f172a;
      color: #38bdf8;
      font-size: 11px;
      font-weight: bold;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 4px 10px;
      border-radius: 4px;
      margin-bottom: 12px;
    }
    h1 { font-size: 26px; color: #0f172a; margin: 0 0 10px 0; }
    .meta { font-size: 13px; color: #64748b; margin-bottom: 6px; }
    .summary-box {
      background: #f8fafc;
      border-left: 4px solid #0284c7;
      padding: 16px 20px;
      border-radius: 4px;
      margin: 24px 0;
      font-size: 14px;
    }
    .article-box {
      background: #fafafa;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 20px;
      margin-bottom: 20px;
    }
    .article-title { font-size: 16px; font-weight: bold; color: #0f172a; margin-bottom: 8px; }
    .footer { text-align: center; font-size: 12px; color: #94a3b8; margin-top: 50px; border-top: 1px solid #e2e8f0; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="toolbar no-print">
    <div style="font-weight: 700; font-size: 14px;">
      CYBER WARRIORS LEARNING ACADEMY // OFFICIAL PUBLICATION DOSSIER
    </div>
    <div style="display: flex; gap: 10px;">
      <button class="btn btn-emerald" onclick="window.print()">🖨️ Save as PDF / Print Document</button>
      <a class="btn btn-outline" href="${escapeHtml(publisherUrl)}" target="_blank">🌐 Official Publisher Portal ↗</a>
      <button class="btn btn-outline" onclick="window.close()">✕ Close</button>
    </div>
  </div>
  <div class="container">
    <div class="header-box">
      <div class="badge">${escapeHtml(mag.categoryLabel)} // ${escapeHtml(mag.pages)}</div>
      <h1>${escapeHtml(mag.title)}</h1>
      <div class="meta"><strong>Official Publisher:</strong> ${escapeHtml(mag.publisher)} (${mag.year})</div>
      <div class="meta"><strong>Issue Edition:</strong> ${escapeHtml(mag.issue)}</div>
      <div class="meta"><strong>Document Classification:</strong> Public Law Enforcement & Technical Defense Assessment</div>
    </div>

    <div class="summary-box">
      <h3 style="margin-top: 0; color: #0369a1; font-size: 15px;">Executive Briefing & Threat Assessment</h3>
      <p style="margin: 0; line-height: 1.7;">${escapeHtml(mag.summary)}</p>
      ${mag.summary_hi ? `<p style="margin-top: 10px; font-size: 13px; color: #334155; border-top: 1px dashed #cbd5e1; padding-top: 8px;"><strong>Hindi Summary:</strong> ${escapeHtml(mag.summary_hi)}</p>` : ''}
    </div>

    <h2 style="font-size: 18px; color: #0f172a; margin: 30px 0 16px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
      Core Investigation Papers & Technical Analyses
    </h2>

    ${mag.featuredArticles.map((art, idx) => `
      <div class="article-box">
        <div style="font-size: 11px; font-weight: bold; color: #0284c7; text-transform: uppercase; margin-bottom: 4px;">
          SECTION 0${idx + 1} • TECHNICAL DOSSIER
        </div>
        <div class="article-title">${escapeHtml(art)}</div>
        <p style="font-size: 13px; color: #475569; margin: 0 0 10px 0; line-height: 1.6;">
          Detailed casework analysis, forensic telemetry findings, and threat actor infrastructure breakdown documented during active cybersecurity investigations and incident handling operations.
        </p>
        <div style="font-size: 12px; color: #0f172a; background: #e0f2fe; padding: 6px 10px; border-radius: 4px; display: inline-block;">
          Key Takeaway: Enforce zero-trust boundaries, verify integrity of system logs, and inspect outbound network telemetry.
        </div>
      </div>
    `).join('')}

    <div class="footer">
      <div>Official Document Reference Provided by <strong>${escapeHtml(mag.publisher)}</strong> • Cyber Warriors Learning Academy</div>
      <div>Source Portal: <a href="${escapeHtml(publisherUrl)}" target="_blank" style="color: #0284c7;">${escapeHtml(publisherUrl)}</a></div>
    </div>
  </div>
</body>
</html>`;

    try {
      const win = window.open('', '_blank');
      if (win) {
        win.document.open();
        win.document.write(dossierHtml);
        win.document.close();
        return;
      }
    } catch (e) {
      console.warn('Direct window.open blocked, falling back to openExternalUrl:', e);
    }

    // Fallback: If popup blocker blocked blank window, open publisher portal
    openExternalUrl(publisherUrl);
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
