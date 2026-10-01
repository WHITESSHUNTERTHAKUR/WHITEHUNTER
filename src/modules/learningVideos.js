// CYBER WARRIORS LEARNING ACADEMY - Video & Article Intelligence Hub
import { LEARNING_RESOURCES, VIDEO_CATEGORIES } from '../data/learningVideosData.js';
import { cyberAudio } from './audio.js';
import { i18n } from '../utils/i18n.js';
import { openExternalUrl } from '../utils/navigation.js';

export function renderLearningVideos(container) {
  let activeCategory = 'all';
  let activeType = 'all'; // 'all', 'video', 'article'
  let searchQuery = '';
  let activePlayingVideo = null;

  function render() {
    const isHinglish = i18n.getLanguage() === 'hinglish';

    const filteredResources = LEARNING_RESOURCES.filter(item => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchType = activeType === 'all' || item.type === activeType;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch = !query ||
        item.title.toLowerCase().includes(query) ||
        item.author.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        (item.summary_hi && item.summary_hi.toLowerCase().includes(query)) ||
        item.keyTopics.some(t => t.toLowerCase().includes(query));

      return matchCat && matchType && matchSearch;
    });

    container.innerHTML = `
      <div class="videos-viewport" style="max-width: 1400px; margin: 0 auto;">
        <!-- Header Banner -->
        <div class="card-tactical" style="background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%); border-left: 4px solid var(--crimson-glow); margin-bottom: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <div>
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                <span class="tag-pill" style="border-color: var(--crimson-glow); color: var(--crimson-glow); font-weight: 700;">
                  OFFICIAL VIDEO THEATER & ARTICLES
                </span>
                <span class="tag-pill" style="background: rgba(239, 68, 68, 0.15); color: #f87171; border-color: var(--crimson-glow);">
                  ${LEARNING_RESOURCES.length} CURATED COURSES & GUIDES
                </span>
              </div>
              <h2 style="font-size: 26px; color: var(--text-bright); margin-bottom: 6px;">
                ${isHinglish ? 'Practical Videos & Official Articles Directory' : 'Learning Videos & Official Technical Articles'}
              </h2>
              <p style="color: var(--text-muted); font-size: 14px; max-width: 750px; line-height: 1.5;">
                ${isHinglish 
                  ? 'Networking, Cyber Security, Ethical Hacking, Cyber Forensics aur IT ke authentic online lectures. Aap app ke andar hi video live play kar sakte hain ya fir "Open on YouTube" par click karke browser me dekh sakte hain.'
                  : 'Curated high-impact video lectures and authoritative technical articles. Watch videos directly inside the in-app theater player or click "Open on YouTube" to launch in your external browser.'}
              </p>
            </div>

            <!-- Search Bar -->
            <div style="min-width: 320px; flex: 1; max-width: 460px;">
              <div style="position: relative;">
                <input 
                  type="text" 
                  id="video-search-input" 
                  class="search-input" 
                  placeholder="${isHinglish ? 'Video, channel ya concept dhoondein... (e.g. CCNA, Wireshark)' : 'Search videos, articles, instructors... (e.g. CCNA, Wireshark)'}" 
                  value="${escapeHtml(searchQuery)}" 
                  style="width: 100%; padding-left: 36px;"
                />
                <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); opacity: 0.6;">🔍</span>
                ${searchQuery ? `<button id="btn-clear-search" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 14px;">✕</button>` : ''}
              </div>
            </div>
          </div>
        </div>

        <!-- Filters Row -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; margin-bottom: 24px;">
          <!-- Category Tabs -->
          <div class="domain-filter-bar" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 0;">
            ${VIDEO_CATEGORIES.map(cat => `
              <span class="filter-pill ${activeCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">
                ${cat.icon} ${cat.label} 
                <span style="opacity: 0.7; font-size: 11px; margin-left: 4px;">(${cat.id === 'all' ? LEARNING_RESOURCES.length : LEARNING_RESOURCES.filter(r => r.category === cat.id).length})</span>
              </span>
            `).join('')}
          </div>

          <!-- Type Switcher -->
          <div style="display: flex; gap: 6px; background: rgba(0,0,0,0.3); padding: 4px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            <button class="btn btn-sm ${activeType === 'all' ? 'btn-cyan' : 'btn-outline'}" data-type="all" style="padding: 4px 10px; font-size: 11px;">
              All Formats
            </button>
            <button class="btn btn-sm ${activeType === 'video' ? 'btn-cyan' : 'btn-outline'}" data-type="video" style="padding: 4px 10px; font-size: 11px;">
              ▶ Videos Only
            </button>
            <button class="btn btn-sm ${activeType === 'article' ? 'btn-cyan' : 'btn-outline'}" data-type="article" style="padding: 4px 10px; font-size: 11px;">
              📖 Articles Only
            </button>
          </div>
        </div>

        <!-- Video & Article Cards Grid -->
        <div class="videos-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 20px;">
          ${filteredResources.length === 0 ? `
            <div class="card-tactical" style="grid-column: 1 / -1; text-align: center; padding: 48px 20px;">
              <div style="font-size: 32px; margin-bottom: 12px;">🎬</div>
              <h3 style="color: var(--text-bright); margin-bottom: 8px;">No resources found for "${escapeHtml(searchQuery)}"</h3>
              <p style="color: var(--text-muted); font-size: 14px;">Try searching for a different keyword or reset the category filter.</p>
              <button class="btn btn-cyan btn-sm" id="btn-reset-filters" style="margin-top: 16px;">
                Reset Filter
              </button>
            </div>
          ` : filteredResources.map(item => {
            const isVideo = item.type === 'video';
            const platformIcon = isVideo ? '▶' : '📖';
            const platformColor = isVideo ? '#ef4444' : '#0ea5e9';

            return `
              <div class="card-tactical video-card" style="margin-bottom: 0; display: flex; flex-direction: column; justify-content: space-between; border-top: 3px solid ${item.thumbnailColor || 'var(--cyan-glow)'};">
                <div>
                  <!-- Card Header Badges -->
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <div style="display: flex; gap: 6px; align-items: center;">
                      <span class="tag-pill" style="font-size: 10px; font-weight: 700; background: ${isVideo ? 'rgba(239, 68, 68, 0.15)' : 'rgba(14, 165, 233, 0.15)'}; color: ${platformColor}; border-color: ${platformColor};">
                        ${platformIcon} ${item.platform.toUpperCase()}
                      </span>
                      <span class="tag-pill" style="font-size: 10px; border-color: var(--border-subtle);">
                        ${item.badge}
                      </span>
                    </div>
                    <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-dim);">
                      ⏱ ${item.duration}
                    </span>
                  </div>

                  <!-- Title -->
                  <h3 style="font-size: 17px; font-weight: 700; color: var(--text-bright); line-height: 1.4; margin-bottom: 8px;">
                    ${escapeHtml(item.title)}
                  </h3>

                  <!-- Author / Channel -->
                  <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--cyan-glow); font-family: var(--font-tactical); margin-bottom: 12px;">
                    <span>🎓 Instructor: <strong>${escapeHtml(item.author)}</strong></span>
                  </div>

                  <!-- Summary -->
                  <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-bottom: 14px;">
                    ${escapeHtml(item.summary)}
                  </p>

                  ${item.summary_hi ? `
                    <div style="background: rgba(255,255,255,0.02); border-left: 2px solid var(--cyan-glow); padding: 8px 12px; border-radius: var(--radius-sm); font-size: 12px; color: #cbd5e1; margin-bottom: 14px; line-height: 1.4;">
                      <strong>🇮🇳 Hinglish:</strong> ${escapeHtml(item.summary_hi)}
                    </div>
                  ` : ''}

                  <!-- Key Topics Tags -->
                  <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 18px;">
                    ${item.keyTopics.map(t => `
                      <span style="font-family: var(--font-mono); font-size: 11px; background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); padding: 2px 8px; border-radius: 4px; color: var(--text-dim);">
                        #${escapeHtml(t)}
                      </span>
                    `).join('')}
                  </div>
                </div>

                <!-- Action Buttons: Play in App & Open External -->
                <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 14px; display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap;">
                  ${isVideo ? `
                    <button class="btn btn-crimson btn-sm btn-play-in-app" data-id="${item.id}" style="flex: 1; font-weight: 700;">
                      ▶ Play in App
                    </button>
                    <button class="btn btn-outline btn-sm btn-open-external" data-url="${item.url}" title="Open directly in YouTube / default browser">
                      🌐 YouTube ↗
                    </button>
                  ` : `
                    <button class="btn btn-cyan btn-sm btn-open-external" data-url="${item.url}" style="flex: 1; font-weight: 700;">
                      📖 Read Official Article ↗
                    </button>
                    ${item.fallbackUrl ? `
                      <button class="btn btn-outline btn-sm btn-open-external" data-url="${item.fallbackUrl}" title="Open publisher portal">
                        🌐 Portal ↗
                      </button>
                    ` : ''}
                  `}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- In-App Video Theater Player Modal -->
        <div id="video-theater-backdrop" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.88); backdrop-filter: blur(8px); z-index: 99999; justify-content: center; align-items: center; padding: 20px;">
          <div id="video-theater-modal" class="card-tactical" style="max-width: 960px; width: 100%; max-height: 94vh; overflow-y: auto; background: #070c18; border: 1px solid var(--border-active); box-shadow: 0 16px 50px rgba(0,0,0,0.9); padding: 24px;">
            <!-- Player Content Injected Dynamically -->
          </div>
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

    // Type filter click
    container.querySelectorAll('[data-type]').forEach(btn => {
      btn.addEventListener('click', () => {
        cyberAudio.playClick();
        activeType = btn.getAttribute('data-type');
        render();
      });
    });

    // Search input
    const searchInput = container.querySelector('#video-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        render();
        const newSearchInput = container.querySelector('#video-search-input');
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
        activeType = 'all';
        render();
      });
    }

    // Card click to play
    container.querySelectorAll('.video-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-open-external') || e.target.closest('.btn-play-in-app')) return;
        const playBtn = card.querySelector('.btn-play-in-app');
        if (playBtn) {
          cyberAudio.playClick();
          const id = playBtn.getAttribute('data-id');
          openVideoTheater(id);
        } else {
          const extBtn = card.querySelector('.btn-open-external');
          if (extBtn) {
            cyberAudio.playClick();
            openExternalUrl(extBtn.getAttribute('data-url'));
          }
        }
      });
    });

    // Play in App button click
    container.querySelectorAll('.btn-play-in-app').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        cyberAudio.playClick();
        const id = btn.getAttribute('data-id');
        openVideoTheater(id);
      });
    });

    // Open External link button click
    container.querySelectorAll('.btn-open-external').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        cyberAudio.playClick();
        const url = btn.getAttribute('data-url');
        if (url) {
          openExternalUrl(url);
        }
      });
    });
  }

  function openVideoTheater(resourceId) {
    const item = LEARNING_RESOURCES.find(r => r.id === resourceId);
    if (!item) return;

    const backdrop = container.querySelector('#video-theater-backdrop');
    const modal = container.querySelector('#video-theater-modal');
    if (!backdrop || !modal) return;

    const embedUrl = item.embedUrl || (item.videoId ? `https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1&rel=0` : item.url);

    modal.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px;">
        <div>
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 6px;">
            <span class="tag-pill" style="font-size: 11px; font-weight: 700; background: rgba(239, 68, 68, 0.2); color: #f87171; border-color: #ef4444;">
              ▶ YOUTUBE VIDEO THEATER
            </span>
            <span class="tag-pill" style="font-size: 11px; border-color: var(--cyan-glow); color: var(--cyan-glow);">
              ${item.category.toUpperCase()}
            </span>
          </div>
          <h2 style="font-size: 20px; color: var(--text-bright); line-height: 1.3;">
            ${escapeHtml(item.title)}
          </h2>
        </div>
        <button id="btn-close-theater" style="background: none; border: none; color: var(--text-muted); font-size: 24px; cursor: pointer; padding: 4px 10px; line-height: 1;">✕</button>
      </div>

      <!-- Quick YouTube External Launch Notification -->
      <div style="background: rgba(239, 68, 68, 0.1); border-left: 3px solid #ef4444; padding: 10px 14px; border-radius: var(--radius-sm); margin-bottom: 14px; font-size: 12px; color: #fca5a5; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
        <span>🎬 <strong>Live YouTube Play:</strong> Video niche player me chal rhi hai. Agar full YouTube site / app par dekhna ho to right button dabayein:</span>
        <button class="btn btn-crimson btn-sm" id="btn-theater-open-youtube-top" style="font-size: 11px; padding: 4px 10px; font-weight: 700;">
          🌐 Open on YouTube.com ↗
        </button>
      </div>

      <!-- Responsive Embedded Video Player -->
      <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; margin-bottom: 16px; background: #000; border: 1px solid var(--border-subtle); box-shadow: 0 8px 30px rgba(0,0,0,0.8);">
        <iframe 
          src="${embedUrl}" 
          style="position: absolute; top:0; left: 0; width: 100%; height: 100%; border: none;" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen
        ></iframe>
      </div>

      <!-- Action Toolbar Under Video -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; background: rgba(0,0,0,0.3); padding: 12px 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
        <div style="font-size: 13px; color: var(--cyan-glow);">
          🎓 Instructor / Channel: <strong style="color: var(--text-bright);">${escapeHtml(item.author)}</strong> | ⏱ ${item.duration}
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="btn btn-crimson btn-sm" id="btn-theater-open-youtube" data-url="${item.url}" style="font-weight: 700;">
            🌐 Open on YouTube / External Browser ↗
          </button>
        </div>
      </div>

      <!-- Overview & Topics -->
      <div style="margin-bottom: 14px;">
        <h4 style="color: var(--text-bright); font-size: 14px; margin-bottom: 6px;">Course Overview:</h4>
        <p style="font-size: 13px; color: var(--text-muted); line-height: 1.6; margin-bottom: 10px;">
          ${escapeHtml(item.summary)}
        </p>
        ${item.summary_hi ? `
          <div style="background: rgba(14, 165, 233, 0.05); border-left: 3px solid var(--cyan-glow); padding: 8px 12px; border-radius: var(--radius-sm); font-size: 12px; color: #e2e8f0; line-height: 1.5; margin-bottom: 10px;">
            <strong>🇮🇳 Hinglish Explanation:</strong> ${escapeHtml(item.summary_hi)}
          </div>
        ` : ''}
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 6px;">
        ${item.keyTopics.map(t => `
          <span style="font-family: var(--font-mono); font-size: 11px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 3px 8px; border-radius: 4px; color: var(--text-dim);">
            ✓ ${escapeHtml(t)}
          </span>
        `).join('')}
      </div>
    `;

    backdrop.style.display = 'flex';

    // Close handler
    const closeBtn = modal.querySelector('#btn-close-theater');
    const closeTheater = () => {
      cyberAudio.playClick();
      // Remove iframe to stop video playback audio
      modal.innerHTML = '';
      backdrop.style.display = 'none';
    };

    if (closeBtn) closeBtn.onclick = closeTheater;
    backdrop.onclick = (e) => {
      if (e.target === backdrop) closeTheater();
    };

    // Open on YouTube buttons inside theater
    modal.querySelector('#btn-theater-open-youtube')?.addEventListener('click', () => {
      cyberAudio.playClick();
      openExternalUrl(item.url);
    });

    modal.querySelector('#btn-theater-open-youtube-top')?.addEventListener('click', () => {
      cyberAudio.playClick();
      openExternalUrl(item.url);
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
