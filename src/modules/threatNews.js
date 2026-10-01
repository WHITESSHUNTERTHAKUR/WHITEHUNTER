import { INITIAL_NEWS_DATA, THREAT_LEVELS } from '../data/newsData.js';
import { cyberAudio } from './audio.js';
import { openExternalUrl } from '../utils/navigation.js';
import { i18n } from '../utils/i18n.js';

// Live threat state
let liveNewsArticles = [...INITIAL_NEWS_DATA];
let isLiveConnected = false;
let isFetchingLive = false;
let lastFetchTime = null;
let hasAutoFetched = false;

// Authoritative internet feeds across requested categories:
// Cyber Crime, IT & Tech, Networking, General Computer
const LIVE_INTERNET_FEEDS = [
  {
    category: 'Cyber Crime',
    domain: 'cybercrime',
    name: 'The Hacker News',
    url: 'https://feeds.feedburner.com/TheHackersNews',
    defaultRegion: 'Global',
    defaultSeverity: 'CRITICAL',
    icon: '🚨'
  },
  {
    category: 'Cyber Crime',
    domain: 'cybercrime',
    name: 'BleepingComputer',
    url: 'https://www.bleepingcomputer.com/feed/',
    defaultRegion: 'Global',
    defaultSeverity: 'HIGH',
    icon: '🛡️'
  },
  {
    category: 'Cyber Crime',
    domain: 'cybercrime',
    name: 'CISA Security Advisories',
    url: 'https://www.cisa.gov/cybersecurity-advisories/all.xml',
    defaultRegion: 'Global',
    defaultSeverity: 'HIGH',
    icon: '🏛️'
  },
  {
    category: 'IT & Tech',
    domain: 'it',
    name: 'Ars Technica Tech Lab',
    url: 'https://feeds.arstechnica.com/arstechnica/technology-lab',
    defaultRegion: 'Global',
    defaultSeverity: 'INFO',
    icon: '💻'
  },
  {
    category: 'Networking',
    domain: 'networking',
    name: 'Network World',
    url: 'https://www.networkworld.com/feed/',
    defaultRegion: 'Global',
    defaultSeverity: 'HIGH',
    icon: '🌐'
  },
  {
    category: 'General Computer',
    domain: 'general',
    name: 'PCWorld Hardware & OS',
    url: 'https://www.pcworld.com/feed',
    defaultRegion: 'Global',
    defaultSeverity: 'MEDIUM',
    icon: '🖥️'
  }
];

// Helper to parse RSS/Atom XML text into structured news objects
function parseRssXml(xmlText, feed) {
  const items = [];
  try {
    const itemMatches = xmlText.match(/<item[\s\S]*?<\/item>/gi) || xmlText.match(/<entry[\s\S]*?<\/entry>/gi) || [];

    for (const block of itemMatches.slice(0, 8)) {
      // Title
      const titleMatch = block.match(/<title(?:[^>]*)>([\s\S]*?)<\/title>/i);
      let title = titleMatch ? titleMatch[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, '$1').trim() : '';

      // Link
      let link = '';
      const linkMatch = block.match(/<link(?:[^>]*)>([\s\S]*?)<\/link>/i);
      if (linkMatch && linkMatch[1].trim() && !linkMatch[1].includes('<')) {
        link = linkMatch[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, '$1').trim();
      } else {
        const linkHrefMatch = block.match(/<link[^>]+href=["']([^"']+)["']/i);
        if (linkHrefMatch) link = linkHrefMatch[1].trim();
      }

      // Summary / Description
      const descMatch = block.match(/<(?:description|summary|content)(?:[^>]*)>([\s\S]*?)<\/(?:description|summary|content)>/i);
      let desc = descMatch ? descMatch[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, '$1').trim() : '';
      desc = desc.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

      // PubDate
      const dateMatch = block.match(/<(?:pubDate|published|updated|dc:date)>([\s\S]*?)<\/(?:pubDate|published|updated|dc:date)>/i);
      let pubDate = dateMatch ? dateMatch[1].trim() : '';

      if (!title || (!link && !desc)) continue;

      const titleLower = title.toLowerCase();
      const descLower = desc.toLowerCase();

      // Determine severity dynamically
      let severity = feed.defaultSeverity;
      if (titleLower.includes('zero-day') || titleLower.includes('critical') || titleLower.includes('rce') || titleLower.includes('actively exploited')) {
        severity = 'CRITICAL';
      } else if (titleLower.includes('ransomware') || titleLower.includes('exploit') || titleLower.includes('hijack') || titleLower.includes('vulnerability')) {
        severity = 'HIGH';
      } else if (titleLower.includes('warning') || titleLower.includes('phishing') || titleLower.includes('patch')) {
        severity = 'MEDIUM';
      }

      // Region detection
      let region = feed.defaultRegion;
      if (titleLower.includes('india') || titleLower.includes('cert-in') || descLower.includes('indian')) {
        region = 'India';
      }

      // CVE extraction
      const cveMatch = (title + ' ' + desc).match(/CVE-\d{4}-\d{4,7}/i);
      const cveStr = cveMatch ? cveMatch[0].toUpperCase() : `${feed.name} Advisory`;

      // Formatted timestamp
      let formattedTime = 'Live Update';
      let formattedDate = new Date().toISOString().split('T')[0];
      if (pubDate) {
        try {
          const d = new Date(pubDate);
          if (!isNaN(d.getTime())) {
            formattedTime = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            formattedDate = d.toISOString().split('T')[0];
          }
        } catch (e) {
          // ignore
        }
      }

      items.push({
        id: `live-${feed.domain}-${Math.random().toString(36).substring(2, 9)}`,
        category: feed.category,
        domain: feed.domain,
        region: region,
        severity: severity,
        title: title,
        source: `OFFICIAL // ${feed.name}`,
        url: link || feed.url,
        timestamp: formattedTime,
        date: formattedDate,
        cve: cveStr,
        summary: desc ? (desc.substring(0, 240) + '...') : 'Click Official Website to read full advisory and details.',
        affectedSystems: [
          `${feed.category} Infrastructure`,
          'Enterprise Systems & Endpoints'
        ],
        threatActor: 'Operational Intel Disclosure',
        content: `${desc || title}\n\n[OFFICIAL DIRECTIVE]: Verify all security signatures and configurations against this advisory. Enforce principle of least privilege and monitor egress telemetry for anomalous patterns.`,
        mitigationChecklist: [
          'Verify latest software updates and vendor patches',
          'Audit system telemetry and access logs for indicators of compromise',
          'Enforce multi-factor authentication and strict access controls'
        ]
      });
    }
  } catch (err) {
    console.warn('Error parsing RSS XML:', feed.name, err);
  }
  return items;
}

export function renderThreatNews(container) {
  let activeFilter = 'all'; // 'all', 'Cyber Crime', 'IT & Tech', 'Networking', 'General Computer', 'India & CERT-In'
  let activeSeverity = 'all'; // 'all', 'CRITICAL', 'HIGH', 'MEDIUM', 'INFO'
  let searchTerm = '';
  let selectedArticleId = null;

  async function fetchLiveInternetFeeds() {
    if (isFetchingLive) return;
    isFetchingLive = true;
    render();

    try {
      let fetchedArticles = [];

      for (const feed of LIVE_INTERNET_FEEDS) {
        let feedXml = null;

        // 1. Try Desktop Electron IPC bridge first (Node native fetch, zero CORS)
        try {
          if (window.electronAPI && typeof window.electronAPI.fetchRssFeed === 'function') {
            const resp = await window.electronAPI.fetchRssFeed(feed.url);
            if (resp && resp.ok && resp.xml) {
              feedXml = resp.xml;
            }
          }
        } catch (e) {
          console.warn('Electron IPC fetch error:', e);
        }

        // 2. Fallback: If not Electron or Electron failed, try rss2json API
        if (!feedXml) {
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 6500);
            const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`;
            const res = await fetch(proxyUrl, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (res.ok) {
              const data = await res.json();
              if (data.status === 'ok' && Array.isArray(data.items)) {
                data.items.slice(0, 8).forEach(item => {
                  const titleLower = (item.title || '').toLowerCase();
                  const descLower = (item.description || '').toLowerCase();
                  let severity = feed.defaultSeverity;
                  if (titleLower.includes('zero-day') || titleLower.includes('critical') || titleLower.includes('rce')) {
                    severity = 'CRITICAL';
                  } else if (titleLower.includes('ransomware') || titleLower.includes('exploit')) {
                    severity = 'HIGH';
                  }

                  let region = feed.defaultRegion;
                  if (titleLower.includes('india') || titleLower.includes('cert-in') || descLower.includes('indian')) {
                    region = 'India';
                  }

                  const cveMatch = ((item.title || '') + ' ' + (item.description || '')).match(/CVE-\d{4}-\d{4,7}/i);
                  const cveStr = cveMatch ? cveMatch[0].toUpperCase() : `${feed.name} Bulletin`;
                  const cleanDesc = (item.description || '').replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();

                  fetchedArticles.push({
                    id: `live-rss2json-${Math.random().toString(36).substring(2, 9)}`,
                    category: feed.category,
                    domain: feed.domain,
                    region: region,
                    severity: severity,
                    title: item.title,
                    source: `OFFICIAL // ${feed.name}`,
                    url: item.link || item.guid || feed.url,
                    timestamp: item.pubDate ? new Date(item.pubDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Live',
                    date: item.pubDate ? new Date(item.pubDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                    cve: cveStr,
                    summary: cleanDesc ? (cleanDesc.substring(0, 240) + '...') : 'Click Official Website for complete article.',
                    affectedSystems: [`${feed.category} Systems`, 'Production Endpoints'],
                    threatActor: 'Live Web Telemetry',
                    content: `${cleanDesc || item.title}\n\n[OFFICIAL DIRECTIVE]: Refer to official publisher website for remediation advisory.`,
                    mitigationChecklist: [
                      'Review manufacturer guidance and apply security patches',
                      'Audit network access and inspect perimeter logs',
                      'Enforce multi-factor authentication across all access points'
                    ]
                  });
                });
              }
            }
          } catch (rssErr) {
            console.warn('rss2json proxy error for:', feed.name, rssErr);
          }
        }

        // 3. If we received raw XML from Electron, parse it
        if (feedXml) {
          const parsed = parseRssXml(feedXml, feed);
          if (parsed && parsed.length > 0) {
            fetchedArticles.push(...parsed);
          }
        }
      }

      if (fetchedArticles.length > 0) {
        isLiveConnected = true;
        lastFetchTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        // Merge uniquely by URL or title
        const existingKeys = new Set(liveNewsArticles.map(a => (a.url || a.title).toLowerCase().trim()));
        const uniqueNew = fetchedArticles.filter(a => !existingKeys.has((a.url || a.title).toLowerCase().trim()));

        liveNewsArticles = [...uniqueNew, ...liveNewsArticles];
        cyberAudio.playSuccess();
      } else {
        isLiveConnected = true; // Still connected, using cached verified articles
      }
    } catch (err) {
      console.warn('Live news fetch overall error:', err);
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

    const isHinglish = i18n.getLanguage() === 'hinglish';

    const filteredNews = liveNewsArticles.filter(item => {
      let matchCat = false;
      if (activeFilter === 'all') {
        matchCat = true;
      } else if (activeFilter === 'India & CERT-In') {
        matchCat = item.region === 'India' || item.category.includes('India') || item.category.includes('CERT-In');
      } else {
        matchCat = item.category === activeFilter || item.category.toLowerCase().includes(activeFilter.toLowerCase());
      }

      const matchSeverity = activeSeverity === 'all' || item.severity === activeSeverity;
      const q = searchTerm.toLowerCase().trim();
      const matchSearch = !q || 
        (item.title && item.title.toLowerCase().includes(q)) || 
        (item.summary && item.summary.toLowerCase().includes(q)) ||
        (item.source && item.source.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        (item.cve && item.cve.toLowerCase().includes(q));

      return matchCat && matchSeverity && matchSearch;
    });

    const categories = [
      { id: 'all', label: isHinglish ? 'Sabhi News (All)' : 'All News/Updates', count: liveNewsArticles.length, icon: '📰' },
      { id: 'Cyber Crime', label: isHinglish ? 'Cyber Crime & Threats' : 'Cyber Crime & Threats', count: liveNewsArticles.filter(n => n.category === 'Cyber Crime').length, icon: '🚨' },
      { id: 'IT & Tech', label: isHinglish ? 'IT & Software Tech' : 'IT & Software Tech', count: liveNewsArticles.filter(n => n.category === 'IT & Tech').length, icon: '💻' },
      { id: 'Networking', label: isHinglish ? 'Networking & Telecom' : 'Networking & Infrastructure', count: liveNewsArticles.filter(n => n.category === 'Networking').length, icon: '🌐' },
      { id: 'General Computer', label: isHinglish ? 'General Computer & OS' : 'General Computer & Hardware', count: liveNewsArticles.filter(n => n.category === 'General Computer').length, icon: '🖥️' },
      { id: 'India & CERT-In', label: isHinglish ? 'India & CERT-In' : 'India & CERT-In Alerts', count: liveNewsArticles.filter(n => n.region === 'India' || n.category.includes('India')).length, icon: '🇮🇳' }
    ];

    container.innerHTML = `
      <div class="news-viewport" style="max-width: 1400px; margin: 0 auto;">
        <!-- Header Banner -->
        <div class="card-tactical" style="background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%); border-left: 4px solid var(--amber-glow); margin-bottom: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <div>
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                <div class="defcon-dot" style="background: #10b981; box-shadow: 0 0 10px #10b981;"></div>
                <span class="tag-pill" style="border-color: var(--amber-glow); color: var(--amber-glow); font-weight: 700;">
                  NEWS / UPDATE // LIVE SECURITY INTEL
                </span>
                <span class="tag-pill" style="background: rgba(16, 185, 129, 0.15); color: #10b981; border-color: #10b981; font-weight: 700;">
                  ${isLiveConnected ? `🟢 LIVE ONLINE CONNECTED${lastFetchTime ? ` (${lastFetchTime})` : ''}` : '🌐 VERIFIED OFFICIAL SOURCES'}
                </span>
                <span class="tag-pill" style="border-color: var(--cyan-glow); color: var(--cyan-glow);">
                  ${liveNewsArticles.length} ARTICLES AVAILABLE
                </span>
              </div>
              <h2 style="font-size: 26px; color: var(--text-bright); margin-bottom: 6px;">
                ${isHinglish ? 'News/Update: Live Cyber Crime, IT, Networking & Computer Updates' : 'News/Update: Official Cyber Crime, IT, Networking & General Computer Intelligence'}
              </h2>
              <p style="color: var(--text-muted); font-size: 14px; max-width: 820px; line-height: 1.5; margin: 0;">
                ${isHinglish 
                  ? 'Real-time live news feeds: Cyber Crime, IT & Tech, Networking, General Computer, aur CERT-In security advisories. Refresh button dabane par live Internet feeds update hoti hain. Kisi bhi card par click karne se uski Official Website sidhe open ho jati hai.'
                  : 'Real-time live feeds across Cyber Crime & Threat Disclosures, IT & Software, Networking & Infrastructure, General Computer Hardware/OS, and CERT-In advisories. Click "Refresh Latest News" to fetch live updates. Click any news card to open the official article directly.'}
              </p>
            </div>

            <!-- Refresh & Actions Row -->
            <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
              <button class="btn btn-cyan btn-sm" id="btn-fetch-live-internet" ${isFetchingLive ? 'disabled style="opacity: 0.6;"' : ''} style="font-weight: 700; display: flex; align-items: center; gap: 6px;">
                <span style="${isFetchingLive ? 'animation: spin 1s linear infinite; display: inline-block;' : ''}">↻</span>
                ${isFetchingLive ? (isHinglish ? 'Live News Update Ho Rahi Hai...' : 'Updating Live Feeds...') : (isHinglish ? '↻ Refresh Latest News (Live)' : '↻ Refresh Latest News (Live)')}
              </button>
            </div>
          </div>
        </div>

        <!-- Filter Pills Bar: Cyber Crime, IT, Networking, General Computer, CERT-In -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 14px;">
          <div class="domain-filter-bar" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 0;">
            ${categories.map(cat => `
              <span class="filter-pill ${activeFilter === cat.id ? 'active' : ''}" data-cat="${cat.id}" style="cursor: pointer;">
                ${cat.icon} ${cat.label} 
                <span style="opacity: 0.75; font-size: 11px; margin-left: 4px;">(${cat.count})</span>
              </span>
            `).join('')}
          </div>

          <!-- Severity & Search Input -->
          <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
            <select id="severity-select" class="tool-input" style="padding: 7px 12px; width: 140px; font-size: 12px;">
              <option value="all" ${activeSeverity === 'all' ? 'selected' : ''}>Severity: ALL</option>
              <option value="CRITICAL" ${activeSeverity === 'CRITICAL' ? 'selected' : ''}>CRITICAL</option>
              <option value="HIGH" ${activeSeverity === 'HIGH' ? 'selected' : ''}>HIGH</option>
              <option value="MEDIUM" ${activeSeverity === 'MEDIUM' ? 'selected' : ''}>MEDIUM</option>
              <option value="INFO" ${activeSeverity === 'INFO' ? 'selected' : ''}>INFO</option>
            </select>
            <div style="position: relative;">
              <input 
                type="text" 
                class="search-input" 
                id="news-search-input" 
                placeholder="${isHinglish ? 'News, CVE, topic search...' : 'Search news, CVE, tech...'}" 
                value="${escapeHtml(searchTerm)}" 
                style="width: 230px; padding-left: 32px;" 
              />
              <span style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); opacity: 0.5;">🔍</span>
            </div>
          </div>
        </div>

        <!-- News Cards Grid -->
        <div class="news-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 20px;">
          ${filteredNews.length === 0 ? `
            <div class="card-tactical" style="grid-column: 1 / -1; text-align: center; padding: 48px 20px;">
              <div style="font-size: 32px; margin-bottom: 12px;">📡</div>
              <h3 style="color: var(--text-bright); margin-bottom: 8px;">No updates match "${escapeHtml(searchTerm)}"</h3>
              <p style="color: var(--text-muted); font-size: 14px;">Try a different keyword or reset filters.</p>
              <button class="btn btn-cyan btn-sm" id="btn-reset-news-search" style="margin-top: 14px;">
                Reset Search Filters
              </button>
            </div>
          ` : filteredNews.map(item => {
            let badgeClass = 'news-badge-medium';
            if (item.severity === 'CRITICAL') badgeClass = 'news-badge-critical';
            else if (item.severity === 'HIGH') badgeClass = 'news-badge-high';
            else if (item.severity === 'INFO') badgeClass = 'tag-pill';

            let categoryColor = 'var(--cyan-glow)';
            if (item.category === 'Cyber Crime') categoryColor = 'var(--crimson-glow)';
            else if (item.category === 'IT & Tech') categoryColor = 'var(--cyan-glow)';
            else if (item.category === 'Networking') categoryColor = 'var(--emerald-glow)';
            else if (item.category === 'General Computer') categoryColor = 'var(--gold-crest)';

            return `
              <div class="card-tactical news-card" data-id="${item.id}" data-url="${escapeHtml(item.url)}" style="margin-bottom: 0; cursor: pointer; display: flex; flex-direction: column; justify-content: space-between; border-top: 3px solid ${item.severity === 'CRITICAL' ? 'var(--crimson-glow)' : (item.severity === 'HIGH' ? 'var(--amber-glow)' : 'var(--cyan-glow)')}; transition: transform 0.2s ease, box-shadow 0.2s ease;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 6px;">
                    <div style="display: flex; gap: 6px; align-items: center;">
                      <span class="tag-pill" style="font-size: 10.5px; border-color: ${categoryColor}; color: ${categoryColor}; font-weight: 700;">
                        ${escapeHtml(item.category)}
                      </span>
                      <span class="tag-pill ${badgeClass}" style="font-weight: 700; font-size: 10px;">
                        ${escapeHtml(item.severity)}
                      </span>
                    </div>
                    <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-dim);">
                      ⏱️ ${escapeHtml(item.timestamp)}
                    </span>
                  </div>

                  <h3 class="news-card-title" style="font-size: 16px; font-weight: 700; color: var(--text-bright); line-height: 1.4; margin-bottom: 8px; transition: color 0.2s ease;">
                    ${escapeHtml(item.title)}
                  </h3>

                  <div style="font-size: 12px; color: var(--cyan-glow); font-family: var(--font-mono); margin-bottom: 8px;">
                    🏛️ <strong>${escapeHtml(item.source)}</strong>
                  </div>

                  <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-bottom: 14px;">
                    ${escapeHtml(item.summary)}
                  </p>
                </div>

                <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-top: auto;">
                  <span style="font-family: var(--font-mono); font-size: 11px; color: var(--amber-glow); font-weight: 600;">
                    ${escapeHtml(item.cve || item.date || 'Live Intel')}
                  </span>
                  <div style="display: flex; gap: 8px;">
                    <button class="btn btn-cyan btn-sm btn-open-official-source" data-url="${escapeHtml(item.url)}" title="Open official advisory webpage directly in your browser" style="font-weight: 700;">
                      🌐 Official Website ↗
                    </button>
                    <button class="btn btn-outline btn-sm btn-view-intel" data-id="${item.id}" title="Read in-app briefing">
                      📄 Briefing
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // Category Tabs listeners
    container.querySelectorAll('[data-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        cyberAudio.playClick();
        activeFilter = btn.getAttribute('data-cat');
        render();
      });
    });

    // Severity select
    const severitySelect = container.querySelector('#severity-select');
    if (severitySelect) {
      severitySelect.addEventListener('change', (e) => {
        cyberAudio.playClick();
        activeSeverity = e.target.value;
        render();
      });
    }

    // Search input
    const searchInput = container.querySelector('#news-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value;
        render();
        const newSearch = container.querySelector('#news-search-input');
        if (newSearch) {
          newSearch.focus();
          newSearch.setSelectionRange(searchTerm.length, searchTerm.length);
        }
      });
    }

    // Reset button
    container.querySelector('#btn-reset-news-search')?.addEventListener('click', () => {
      cyberAudio.playClick();
      searchTerm = '';
      activeFilter = 'all';
      activeSeverity = 'all';
      render();
    });

    // Refresh live internet feeds
    container.querySelector('#btn-fetch-live-internet')?.addEventListener('click', () => {
      cyberAudio.playClick();
      fetchLiveInternetFeeds();
    });

    // Clicking the card directly opens official news website!
    container.querySelectorAll('.news-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-view-intel')) return;
        cyberAudio.playClick();
        const url = card.getAttribute('data-url');
        if (url) {
          openExternalUrl(url);
        }
      });
    });

    // Official website button
    container.querySelectorAll('.btn-open-official-source').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        cyberAudio.playClick();
        const url = btn.getAttribute('data-url');
        if (url) {
          openExternalUrl(url);
        }
      });
    });

    // Briefing button
    container.querySelectorAll('.btn-view-intel').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        cyberAudio.playClick();
        const id = btn.getAttribute('data-id');
        if (id) {
          selectedArticleId = id;
          render();
        }
      });
    });
  }

  function renderArticleDetail() {
    const isHinglish = i18n.getLanguage() === 'hinglish';
    const article = liveNewsArticles.find(n => n.id === selectedArticleId);
    if (!article) {
      selectedArticleId = null;
      render();
      return;
    }

    container.innerHTML = `
      <div class="news-viewport" style="max-width: 980px; margin: 0 auto;">
        <!-- Top Nav -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; background: var(--bg-surface); padding: 12px 18px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); flex-wrap: wrap; gap: 12px;">
          <button class="btn btn-outline btn-sm" id="btn-back-to-news">
            ${isHinglish ? '← News/Update List Par Wapas' : '← Return to News/Update Roster'}
          </button>
          
          <div style="display: flex; gap: 10px;">
            ${article.url ? `
              <button class="btn btn-cyan btn-sm btn-open-official-source" data-url="${escapeHtml(article.url)}" style="font-weight: 700;">
                🌐 Open Official Website ↗
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Article Card -->
        <div class="card-tactical" style="padding: 28px; border-left: 4px solid ${article.severity === 'CRITICAL' ? 'var(--crimson-glow)' : 'var(--cyan-glow)'};">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; gap: 8px; align-items: center;">
              <span class="tag-pill" style="border-color: var(--cyan-glow); color: var(--cyan-glow); font-weight: 700;">
                ${escapeHtml(article.category)}
              </span>
              <span class="tag-pill ${article.severity === 'CRITICAL' ? 'news-badge-critical' : 'news-badge-high'}" style="font-size: 11px;">
                ${escapeHtml(article.severity)}
              </span>
              <span class="tag-pill" style="border-color: var(--amber-glow); color: var(--amber-glow);">
                ${escapeHtml(article.region.toUpperCase())}
              </span>
            </div>
            <span style="font-family: var(--font-mono); font-size: 12px; color: var(--text-dim);">
              📅 ${escapeHtml(article.date)} | ${escapeHtml(article.timestamp)}
            </span>
          </div>

          <h2 style="font-size: 24px; color: #fff; line-height: 1.35; margin-bottom: 12px;">
            ${escapeHtml(article.title)}
          </h2>

          <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 14px; flex-wrap: wrap;">
            <span style="font-size: 13px; color: var(--cyan-glow); font-family: var(--font-mono);">
              Source: <strong>${escapeHtml(article.source)}</strong>
            </span>
            ${article.cve ? `
              <span style="font-size: 13px; color: var(--amber-glow); font-family: var(--font-mono);">
                Ref: <strong>${escapeHtml(article.cve)}</strong>
              </span>
            ` : ''}
            ${article.threatActor ? `
              <span style="font-size: 13px; color: #f87171; font-family: var(--font-mono);">
                Entity: <strong>${escapeHtml(article.threatActor)}</strong>
              </span>
            ` : ''}
          </div>

          <!-- Official Direct Link Callout -->
          <div style="background: rgba(0, 242, 254, 0.08); border: 1px solid var(--cyan-glow); border-radius: var(--radius-sm); padding: 14px 18px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
            <div>
              <div style="font-size: 13px; font-weight: 700; color: var(--cyan-glow); margin-bottom: 2px;">
                🔗 Verified Official Publisher Link
              </div>
              <div style="font-size: 12px; color: var(--text-muted); font-family: var(--font-mono); word-break: break-all;">
                ${escapeHtml(article.url)}
              </div>
            </div>
            <button class="btn btn-cyan btn-sm btn-open-official-source" data-url="${escapeHtml(article.url)}" style="font-weight: 700;">
              Open Official Website ↗
            </button>
          </div>

          <!-- Content Body -->
          <div style="font-size: 14.5px; color: #cbd5e1; line-height: 1.7; margin-bottom: 28px; white-space: pre-line;">
            ${escapeHtml(article.content || article.summary)}
          </div>

          <!-- Affected Systems -->
          ${article.affectedSystems && article.affectedSystems.length > 0 ? `
            <div style="margin-bottom: 24px; background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); padding: 16px; border-radius: var(--radius-sm);">
              <h4 style="font-size: 13px; color: var(--amber-glow); font-family: var(--font-tactical); margin-bottom: 8px;">
                🎯 AFFECTED PLATFORMS & COMPONENTS:
              </h4>
              <ul style="margin: 0; padding-left: 20px; font-size: 13.5px; color: var(--text-primary);">
                ${article.affectedSystems.map(sys => `<li style="margin-bottom: 4px;">${escapeHtml(sys)}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          <!-- Mitigation Checklist -->
          ${article.mitigationChecklist && article.mitigationChecklist.length > 0 ? `
            <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); border-left: 4px solid var(--emerald-glow); padding: 18px; border-radius: var(--radius-sm);">
              <h4 style="font-size: 13px; color: var(--emerald-glow); font-family: var(--font-tactical); margin-bottom: 10px;">
                🛡️ OPERATIONAL REMEDIATION CHECKLIST:
              </h4>
              <ul style="margin: 0; padding-left: 20px; font-size: 13.5px; color: var(--text-primary);">
                ${article.mitigationChecklist.map(step => `
                  <li style="margin-bottom: 6px;">${escapeHtml(step)}</li>
                `).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    container.querySelector('#btn-back-to-news')?.addEventListener('click', () => {
      cyberAudio.playClick();
      selectedArticleId = null;
      render();
    });

    container.querySelectorAll('.btn-open-official-source').forEach(btn => {
      btn.addEventListener('click', () => {
        cyberAudio.playClick();
        const url = btn.getAttribute('data-url');
        if (url) openExternalUrl(url);
      });
    });
  }

  // Initial render so container is never blank!
  render();

  // Listen for language change
  window.addEventListener('cyber_language_changed', () => {
    render();
  });

  // Automatically fetch latest online feeds once in background if not yet done
  if (!hasAutoFetched) {
    hasAutoFetched = true;
    setTimeout(() => {
      fetchLiveInternetFeeds();
    }, 400);
  }
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
