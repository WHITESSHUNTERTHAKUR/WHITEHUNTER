import { INITIAL_NEWS_DATA, THREAT_LEVELS } from '../data/newsData.js';
import { cyberAudio } from './audio.js';

// Live threat state
let liveNewsArticles = [...INITIAL_NEWS_DATA];
let isLiveConnected = false;
let isFetchingLive = false;

// Real-time Internet RSS feeds
const LIVE_INTERNET_FEEDS = [
  {
    name: 'CISA Cybersecurity Advisories',
    url: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.cisa.gov%2Fcybersecurity-advisories%2Fall.xml',
    defaultRegion: 'Global',
    category: 'Government Cyber Defense & CISA Alerts'
  },
  {
    name: 'The Hacker News Threat Wire',
    url: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ffeeds.feedburner.com%2FTheHackersNews',
    defaultRegion: 'Global',
    category: 'Vulnerabilities, Zero-Days & APT Campaigns'
  },
  {
    name: 'BleepingComputer Cybersecurity News',
    url: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.bleepingcomputer.com%2Ffeed%2F',
    defaultRegion: 'Global',
    category: 'Ransomware & Exploit Disclosures'
  }
];

export function renderThreatNews(container) {
  let activeRegion = 'all'; // 'all', 'India', 'Global'
  let activeSeverity = 'all'; // 'all', 'CRITICAL', 'HIGH', 'MEDIUM'
  let searchTerm = '';
  let selectedArticleId = null;

  async function fetchLiveInternetFeeds() {
    isFetchingLive = true;
    render();

    try {
      let fetchedArticles = [];

      for (const feed of LIVE_INTERNET_FEEDS) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

          const res = await fetch(feed.url, { signal: controller.signal });
          clearTimeout(timeoutId);

          if (res.ok) {
            const data = await res.json();
            if (data.status === 'ok' && Array.isArray(data.items)) {
              isLiveConnected = true;
              data.items.slice(0, 4).forEach((item, idx) => {
                // Determine severity based on keywords
                const titleLower = item.title.toLowerCase();
                const descLower = (item.description || '').toLowerCase();
                let severity = 'HIGH';
                if (titleLower.includes('zero-day') || titleLower.includes('critical') || titleLower.includes('rce') || titleLower.includes('actively exploited')) {
                  severity = 'CRITICAL';
                } else if (titleLower.includes('warning') || titleLower.includes('phishing')) {
                  severity = 'MEDIUM';
                }

                // Check if relates to India or Global
                let region = feed.defaultRegion;
                if (titleLower.includes('india') || titleLower.includes('cert-in') || descLower.includes('indian')) {
                  region = 'India';
                }

                // Extract potential CVE
                const cveMatch = (item.title + ' ' + item.description).match(/CVE-\d{4}-\d{4,7}/i);
                const cveStr = cveMatch ? cveMatch[0].toUpperCase() : 'Advisory Alert';

                // Clean HTML tags from description
                const cleanDesc = item.description ? item.description.replace(/<[^>]*>?/gm, '').trim() : '';

                fetchedArticles.push({
                  id: `live-${feed.name.substring(0, 4)}-${Date.now()}-${idx}`,
                  region: region,
                  category: feed.category,
                  severity: severity,
                  title: item.title,
                  source: `LIVE INTERNET // ${feed.name}`,
                  timestamp: item.pubDate ? new Date(item.pubDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Live Feed',
                  date: item.pubDate ? new Date(item.pubDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                  cve: cveStr,
                  summary: cleanDesc.substring(0, 220) + '...',
                  affectedSystems: ['Enterprise & Defense Endpoints', 'Internet-Exposed Services'],
                  threatActor: 'Active Adversary Campaign',
                  content: `${cleanDesc}\n\n[LIVE INTEL DIRECTIVE]: Verify all perimeter firewalls and endpoint EDR signatures are updated to reflect this disclosure. Monitor outbound network traffic for anomalous connection attempts matching reported IOCs.`,
                  mitigationChecklist: [
                    'Apply immediate vendor security patches as referenced in advisory',
                    'Review egress network telemetry for anomalous external connection spikes',
                    'Enforce multi-factor authentication across all external remote access services'
                  ]
                });
              });
            }
          }
        } catch (feedErr) {
          // Individual feed fetch timed out or failed; continue to others
        }
      }

      if (fetchedArticles.length > 0) {
        // Merge without duplicates
        const existingTitles = new Set(liveNewsArticles.map(a => a.title.toLowerCase().trim()));
        const uniqueNew = fetchedArticles.filter(a => !existingTitles.has(a.title.toLowerCase().trim()));
        liveNewsArticles = [...uniqueNew, ...liveNewsArticles];
        cyberAudio.playSuccess();
      } else {
        isLiveConnected = false;
      }
    } catch (e) {
      isLiveConnected = false;
    } finally {
      isFetchingLive = false;
      render();
    }
  }

  function render() {
    if (selectedArticleId) {
      renderArticleDetail();
      return;
    }

    const filteredNews = liveNewsArticles.filter(item => {
      const matchRegion = activeRegion === 'all' || item.region === activeRegion;
      const matchSeverity = activeSeverity === 'all' || item.severity === activeSeverity;
      const matchSearch = searchTerm === '' || 
        item.title.toLowerCase().includes(searchTerm) || 
        item.summary.toLowerCase().includes(searchTerm) ||
        (item.threatActor && item.threatActor.toLowerCase().includes(searchTerm)) ||
        (item.cve && item.cve.toLowerCase().includes(searchTerm));
      return matchRegion && matchSeverity && matchSearch;
    });

    container.innerHTML = `
      <div class="news-viewport">
        <!-- Live Threat Header & DEFCON Status -->
        <div class="news-header-hud">
          <div>
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
              <div class="defcon-dot"></div>
              <span style="font-family: var(--font-mono); font-size: 13px; font-weight: 700; color: var(--amber-glow);">
                ${THREAT_LEVELS.CURRENT} // CODE: ${THREAT_LEVELS.CODE}
              </span>
              <span style="font-family: var(--font-mono); font-size: 11px; padding: 2px 8px; border-radius: var(--radius-sm); ${isLiveConnected ? 'background: rgba(16,185,129,0.15); color: var(--emerald-glow); border: 1px solid var(--emerald-glow);' : 'background: rgba(245,158,11,0.15); color: var(--amber-glow); border: 1px solid var(--amber-glow);'}">
                ${isLiveConnected ? '🟢 LIVE SATELLITE INTERNET FEED CONNECTED' : '🟡 LOCAL DEFENSE INTEL RADAR ACTIVE'}
              </span>
            </div>
            <h2 style="font-size: 24px; color: var(--text-bright);">Cyber Threat Intelligence & Early Warning Radar</h2>
            <p style="font-size: 13px; color: var(--text-muted);">
              Real-time stream monitoring active cyber warfare, zero-day vulnerabilities, and nation-state APT campaigns in India and Worldwide.
            </p>
          </div>

          <div style="display: flex; gap: 10px; align-items: center;">
            <button class="btn btn-cyan btn-sm" id="btn-fetch-live-internet" ${isFetchingLive ? 'disabled style="opacity: 0.5;"' : ''}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="${isFetchingLive ? 'animate-spin' : ''}"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
              ${isFetchingLive ? 'Interpreting Live Feeds...' : 'Fetch Live Feeds from Internet'}
            </button>
            <button class="btn btn-outline btn-sm" id="btn-refresh-feed">
              ↻ Reset Cache
            </button>
          </div>
        </div>

        <!-- Region & Severity Filter Tabs -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
          <!-- Region Switcher -->
          <div class="domain-filter-bar" style="margin-bottom: 0;">
            <span class="filter-pill ${activeRegion === 'all' ? 'active' : ''}" data-region="all">
              All Strategic Feeds (${liveNewsArticles.length})
            </span>
            <span class="filter-pill ${activeRegion === 'India' ? 'active' : ''}" data-region="India" style="${activeRegion === 'India' ? 'border-color: #8b5cf6; color: #8b5cf6; background: rgba(139,92,246,0.1);' : ''}">
              🇮🇳 India Cyber Alerts & CERT-In (${liveNewsArticles.filter(n => n.region === 'India').length})
            </span>
            <span class="filter-pill ${activeRegion === 'Global' ? 'active' : ''}" data-region="Global">
              🌐 Global & Worldwide Threats (${liveNewsArticles.filter(n => n.region === 'Global').length})
            </span>
          </div>

          <!-- Severity & Search -->
          <div style="display: flex; gap: 10px; align-items: center;">
            <select id="severity-select" class="tool-input" style="padding: 6px 10px; width: 130px; font-size: 12px;">
              <option value="all" ${activeSeverity === 'all' ? 'selected' : ''}>Severity: ALL</option>
              <option value="CRITICAL" ${activeSeverity === 'CRITICAL' ? 'selected' : ''}>CRITICAL</option>
              <option value="HIGH" ${activeSeverity === 'HIGH' ? 'selected' : ''}>HIGH</option>
              <option value="MEDIUM" ${activeSeverity === 'MEDIUM' ? 'selected' : ''}>MEDIUM</option>
            </select>
            <input type="text" class="search-input" id="news-search-input" placeholder="Search threats, CVE, APT..." value="${searchTerm}" style="width: 200px;" />
          </div>
        </div>

        <!-- News Cards Grid -->
        <div class="news-grid">
          ${filteredNews.map(item => {
            let badgeClass = 'news-badge-medium';
            if (item.severity === 'CRITICAL') badgeClass = 'news-badge-critical';
            else if (item.severity === 'HIGH') badgeClass = 'news-badge-high';

            return `
              <div class="news-card" data-id="${item.id}">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span class="tag-pill ${badgeClass}" style="font-weight: 700;">
                      ${item.severity} // ${item.region.toUpperCase()}
                    </span>
                    <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-dim);">
                      ${item.timestamp}
                    </span>
                  </div>

                  <h3 style="font-size: 16px; font-weight: 700; color: var(--text-bright); line-height: 1.4; margin-bottom: 8px;">
                    ${item.title}
                  </h3>

                  <div style="font-size: 12px; color: var(--cyan-glow); font-family: var(--font-mono); margin-bottom: 8px;">
                    Source: ${item.source}
                  </div>

                  <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-bottom: 14px;">
                    ${item.summary}
                  </p>
                </div>

                <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 10px; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-family: var(--font-mono); font-size: 11px; color: var(--amber-glow);">
                    ${item.cve || 'Advisory'}
                  </span>
                  <button class="btn btn-outline btn-sm btn-view-intel" data-id="${item.id}">
                    Full Tactical Briefing →
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // Attach listeners
    container.querySelectorAll('[data-region]').forEach(btn => {
      btn.addEventListener('click', () => {
        cyberAudio.playClick();
        activeRegion = btn.getAttribute('data-region');
        render();
      });
    });

    const severitySelect = container.querySelector('#severity-select');
    if (severitySelect) {
      severitySelect.addEventListener('change', (e) => {
        cyberAudio.playClick();
        activeSeverity = e.target.value;
        render();
      });
    }

    const searchInput = container.querySelector('#news-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase().trim();
        render();
      });
    }

    const fetchLiveBtn = container.querySelector('#btn-fetch-live-internet');
    if (fetchLiveBtn) {
      fetchLiveBtn.addEventListener('click', () => {
        cyberAudio.playClick();
        fetchLiveInternetFeeds();
      });
    }

    const resetCacheBtn = container.querySelector('#btn-refresh-feed');
    if (resetCacheBtn) {
      resetCacheBtn.addEventListener('click', () => {
        cyberAudio.playClick();
        liveNewsArticles = [...INITIAL_NEWS_DATA];
        render();
      });
    }

    container.querySelectorAll('.news-card, .btn-view-intel').forEach(el => {
      el.addEventListener('click', (e) => {
        const id = el.getAttribute('data-id');
        if (id) {
          cyberAudio.playClick();
          selectedArticleId = id;
          render();
        }
      });
    });
  }

  function renderArticleDetail() {
    const article = liveNewsArticles.find(n => n.id === selectedArticleId) || liveNewsArticles[0];

    container.innerHTML = `
      <div class="news-detail-viewport" style="max-width: 900px; margin: 0 auto;">
        <!-- Top Nav -->
        <div style="margin-bottom: 20px;">
          <button class="btn btn-outline btn-sm" id="btn-back-to-news">
            ← Return to Threat Radar Stream
          </button>
        </div>

        <!-- Article Card -->
        <div class="card-tactical" style="padding: 32px; border-color: var(--border-accent);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; gap: 8px;">
              <span class="tag-pill news-badge-critical" style="font-weight: bold;">
                ${article.severity}
              </span>
              <span class="tag-pill" style="border-color: var(--cyan-glow); color: var(--cyan-glow);">
                REGION: ${article.region.toUpperCase()}
              </span>
              <span class="tag-pill">
                ${article.category}
              </span>
            </div>
            <div style="font-family: var(--font-mono); font-size: 12px; color: var(--text-dim);">
              ${article.date} (${article.timestamp})
            </div>
          </div>

          <h1 style="font-size: 26px; font-weight: 700; color: var(--text-bright); line-height: 1.3; margin-bottom: 12px;">
            ${article.title}
          </h1>

          <div style="background: rgba(0, 242, 254, 0.05); border-left: 3px solid var(--cyan-glow); padding: 12px 16px; border-radius: var(--radius-sm); margin-bottom: 20px;">
            <div style="font-size: 13px; color: var(--cyan-glow); font-family: var(--font-mono);">
              AUTHENTICATED INTEL SOURCE: ${article.source} | IDENTIFIER: ${article.cve || 'N/A'}
            </div>
          </div>

          <!-- Telemetry Badges -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
            <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); padding: 14px; border-radius: var(--radius-sm);">
              <div style="font-size: 11px; color: var(--text-dim); font-family: var(--font-mono);">TARGETED AFFECTED SYSTEMS</div>
              <ul style="margin-top: 6px; padding-left: 18px; font-size: 13px; color: var(--text-primary);">
                ${article.affectedSystems.map(sys => `<li>${sys}</li>`).join('')}
              </ul>
            </div>

            <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); padding: 14px; border-radius: var(--radius-sm);">
              <div style="font-size: 11px; color: var(--text-dim); font-family: var(--font-mono);">ATTRIBUTED THREAT ACTOR / CAMPAIGN</div>
              <div style="font-size: 14px; font-weight: 700; color: var(--crimson-glow); margin-top: 6px;">
                ${article.threatActor || 'Undetermined / Opportunistic Cybercrime'}
              </div>
            </div>
          </div>

          <!-- Full Content -->
          <div style="font-size: 15px; line-height: 1.8; color: var(--text-primary); margin-bottom: 24px; white-space: pre-line;">
            ${article.content}
          </div>

          <!-- Mitigation Checklist -->
          <div class="case-study-box" style="border-left-color: var(--emerald-glow); border-color: rgba(16,185,129,0.3); background: rgba(16,185,129,0.05);">
            <h4 style="color: var(--emerald-glow); margin-bottom: 10px;">
              🛡️ MANDATORY DEFENSIVE MITIGATION CHECKLIST
            </h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
              ${article.mitigationChecklist.map(m => `
                <li style="display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: var(--text-bright);">
                  <span style="color: var(--emerald-glow); font-weight: bold;">[APPLY]</span>
                  <span>${m}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;

    container.querySelector('#btn-back-to-news').addEventListener('click', () => {
      cyberAudio.playClick();
      selectedArticleId = null;
      render();
    });
  }

  render();
}
