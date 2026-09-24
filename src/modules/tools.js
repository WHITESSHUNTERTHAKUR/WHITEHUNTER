import { cyberAudio } from './audio.js';

export function renderTools(container) {
  let activeTool = 'subnet'; // 'subnet', 'ports', 'crypto'

  function render() {
    container.innerHTML = `
      <div class="tools-viewport" style="max-width: 960px; margin: 0 auto;">
        <!-- Header -->
        <div class="curriculum-header" style="margin-bottom: 20px;">
          <div class="curriculum-title">
            <span class="tag-pill" style="border-color: var(--cyan-glow); margin-bottom: 6px; display: inline-block;">
              TACTICAL FIELD UTILITIES & CALCULATORS
            </span>
            <h2>Cyber Defense & Network Engineering Toolkit</h2>
            <p>Interactive utilities for calculating subnets, mapping port vulnerabilities, and encoding cryptographic hashes.</p>
          </div>
        </div>

        <!-- Tool Switcher Tabs -->
        <div class="domain-filter-bar" style="margin-bottom: 24px;">
          <span class="filter-pill ${activeTool === 'subnet' ? 'active' : ''}" data-tool="subnet">
            🌐 Tactical Subnet & CIDR Calculator
          </span>
          <span class="filter-pill ${activeTool === 'ports' ? 'active' : ''}" data-tool="ports">
            🔍 High-Risk Port & Service Directory
          </span>
          <span class="filter-pill ${activeTool === 'crypto' ? 'active' : ''}" data-tool="crypto">
            🔐 Cryptographic Hash & Base64 Converter
          </span>
        </div>

        <!-- Tool Container -->
        <div id="active-tool-workspace">
          ${activeTool === 'subnet' ? renderSubnetTool() : ''}
          ${activeTool === 'ports' ? renderPortsTool() : ''}
          ${activeTool === 'crypto' ? renderCryptoTool() : ''}
        </div>
      </div>
    `;

    // Tool switcher handlers
    container.querySelectorAll('[data-tool]').forEach(btn => {
      btn.addEventListener('click', () => {
        cyberAudio.playClick();
        activeTool = btn.getAttribute('data-tool');
        render();
      });
    });

    if (activeTool === 'subnet') setupSubnetListeners();
    if (activeTool === 'ports') setupPortsListeners();
    if (activeTool === 'crypto') setupCryptoListeners();
  }

  function renderSubnetTool() {
    return `
      <div class="card-tactical" style="padding: 24px;">
        <h3 style="font-size: 18px; color: var(--cyan-glow); margin-bottom: 16px;">
          IPv4 Subnet & VLSM Calculator
        </h3>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 16px; margin-bottom: 20px;">
          <div class="tool-input-group">
            <label>IP Address</label>
            <input type="text" id="subnet-ip-input" class="tool-input" value="192.168.1.100" placeholder="e.g. 10.0.0.1" />
          </div>
          <div class="tool-input-group">
            <label>CIDR Prefix (/)</label>
            <select id="subnet-cidr-input" class="tool-input">
              ${Array.from({ length: 31 }, (_, i) => i + 1).map(cidr => `
                <option value="${cidr}" ${cidr === 26 ? 'selected' : ''}>/${cidr}</option>
              `).join('')}
            </select>
          </div>
        </div>

        <div id="subnet-output-box" class="tool-result-box" style="line-height: 1.8;">
          <!-- Dynamically populated -->
        </div>
      </div>
    `;
  }

  function setupSubnetListeners() {
    const ipInput = container.querySelector('#subnet-ip-input');
    const cidrInput = container.querySelector('#subnet-cidr-input');
    const outputBox = container.querySelector('#subnet-output-box');

    function calculate() {
      const ipStr = ipInput.value.trim();
      const cidr = parseInt(cidrInput.value, 10);

      const parts = ipStr.split('.').map(Number);
      if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
        outputBox.innerHTML = '<span style="color: var(--crimson-glow);">[!] Invalid IPv4 format. Enter 4 octets separated by dots (e.g. 192.168.1.1)</span>';
        return;
      }

      const ipNum = (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
      const maskNum = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
      const netNum = (ipNum & maskNum) >>> 0;
      const bcastNum = (netNum | (~maskNum >>> 0)) >>> 0;

      const numTotalHosts = Math.pow(2, 32 - cidr);
      const numUsableHosts = cidr >= 31 ? (cidr === 31 ? 2 : 1) : Math.max(0, numTotalHosts - 2);

      const netStr = numToIp(netNum);
      const bcastStr = numToIp(bcastNum);
      const maskStr = numToIp(maskNum);
      const firstUsable = cidr >= 31 ? netStr : numToIp(netNum + 1);
      const lastUsable = cidr >= 31 ? bcastStr : numToIp(bcastNum - 1);

      outputBox.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div><strong style="color: var(--text-dim);">Network Address:</strong> <span style="color: #fff;">${netStr} / ${cidr}</span></div>
          <div><strong style="color: var(--text-dim);">Subnet Mask:</strong> <span style="color: #fff;">${maskStr}</span></div>
          <div><strong style="color: var(--text-dim);">Directed Broadcast:</strong> <span style="color: #fff;">${bcastStr}</span></div>
          <div><strong style="color: var(--text-dim);">Usable Host Range:</strong> <span style="color: var(--emerald-glow);">${firstUsable} - ${lastUsable}</span></div>
          <div><strong style="color: var(--text-dim);">Total Addresses:</strong> <span style="color: #fff;">${numTotalHosts.toLocaleString()}</span></div>
          <div><strong style="color: var(--text-dim);">Usable Host Count:</strong> <span style="color: var(--cyan-glow);">${numUsableHosts.toLocaleString()} hosts</span></div>
        </div>
      `;
    }

    ipInput.addEventListener('input', calculate);
    cidrInput.addEventListener('change', calculate);
    calculate();
  }

  function renderPortsTool() {
    const HIGH_RISK_PORTS = [
      { port: 21, proto: 'TCP', name: 'FTP', risk: 'HIGH', desc: 'Cleartext file transfer, prone to anonymous login and brute-force.' },
      { port: 22, proto: 'TCP', name: 'SSH', risk: 'MEDIUM', desc: 'Encrypted shell; targeted for automated credential stuffing.' },
      { port: 23, proto: 'TCP', name: 'Telnet', risk: 'CRITICAL', desc: 'Unencrypted remote management; sends passwords in plaintext.' },
      { port: 53, proto: 'UDP/TCP', name: 'DNS', risk: 'MEDIUM', desc: 'Domain name service; abused for DNS amplification and data tunneling.' },
      { port: 80, proto: 'TCP', name: 'HTTP', risk: 'MEDIUM', desc: 'Unencrypted web traffic; prone to packet sniffing and injection.' },
      { port: 161, proto: 'UDP', name: 'SNMP', risk: 'HIGH', desc: 'Network telemetry; default community strings ("public") leak topology.' },
      { port: 445, proto: 'TCP', name: 'SMB', risk: 'CRITICAL', desc: 'Server Message Block; vector for EternalBlue, WannaCry, lateral movement.' },
      { port: 502, proto: 'TCP', name: 'Modbus', risk: 'CRITICAL', desc: 'Industrial SCADA control protocol; lacks authentication or encryption.' },
      { port: 1433, proto: 'TCP', name: 'MSSQL', risk: 'HIGH', desc: 'Microsoft SQL database; prime target for SQL injection and xp_cmdshell.' },
      { port: 3389, proto: 'TCP', name: 'RDP', risk: 'CRITICAL', desc: 'Remote Desktop Protocol; top entry vector for enterprise ransomware.' },
      { port: 4444, proto: 'TCP', name: 'Metasploit', risk: 'CRITICAL', desc: 'Default listener port for Metasploit Meterpreter reverse shells.' }
    ];

    return `
      <div class="card-tactical" style="padding: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 style="font-size: 18px; color: var(--emerald-glow);">
            High-Risk Tactical Ports & Threat Vector Database
          </h3>
          <input type="text" id="port-filter-input" class="search-input" placeholder="Search port (e.g. 445, RDP)..." style="width: 220px;" />
        </div>

        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;" id="ports-table">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-subtle); color: var(--text-dim); text-align: left; font-family: var(--font-tactical);">
                <th style="padding: 10px;">PORT</th>
                <th style="padding: 10px;">PROTOCOL</th>
                <th style="padding: 10px;">SERVICE</th>
                <th style="padding: 10px;">RISK LEVEL</th>
                <th style="padding: 10px;">TACTICAL THREAT VECTOR</th>
              </tr>
            </thead>
            <tbody>
              ${HIGH_RISK_PORTS.map(p => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.04); font-family: var(--font-mono);">
                  <td style="padding: 10px; color: var(--cyan-glow); font-weight: bold;">${p.port}</td>
                  <td style="padding: 10px; color: var(--text-muted);">${p.proto}</td>
                  <td style="padding: 10px; color: #fff; font-weight: bold;">${p.name}</td>
                  <td style="padding: 10px;">
                    <span class="tag-pill ${p.risk === 'CRITICAL' ? 'news-badge-critical' : (p.risk === 'HIGH' ? 'news-badge-high' : 'news-badge-medium')}" style="font-size: 10px;">
                      ${p.risk}
                    </span>
                  </td>
                  <td style="padding: 10px; color: var(--text-primary); font-family: var(--font-display);">${p.desc}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function setupPortsListeners() {
    const filterInput = container.querySelector('#port-filter-input');
    const tableRows = container.querySelectorAll('#ports-table tbody tr');

    filterInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      tableRows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  function renderCryptoTool() {
    return `
      <div class="card-tactical" style="padding: 24px;">
        <h3 style="font-size: 18px; color: var(--amber-glow); margin-bottom: 16px;">
          Cryptographic Hash Generator & Base64 Encoder
        </h3>

        <div class="tool-input-group">
          <label>Plaintext Input String</label>
          <textarea id="crypto-plain-input" class="tool-input" rows="3" placeholder="Enter plaintext, token, or command to encode/hash..."></textarea>
        </div>

        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
          <button class="btn btn-cyan btn-sm" id="btn-hash-sha256">Generate SHA-256</button>
          <button class="btn btn-outline btn-sm" id="btn-encode-b64">Encode Base64</button>
          <button class="btn btn-outline btn-sm" id="btn-decode-b64">Decode Base64</button>
        </div>

        <div class="tool-input-group">
          <label>Resulting Output</label>
          <div id="crypto-output-result" class="tool-result-box" style="min-height: 80px; word-break: break-all;">
            Enter text above and select an operation.
          </div>
        </div>
      </div>
    `;
  }

  function setupCryptoListeners() {
    const input = container.querySelector('#crypto-plain-input');
    const output = container.querySelector('#crypto-output-result');

    container.querySelector('#btn-hash-sha256').addEventListener('click', async () => {
      cyberAudio.playClick();
      const text = input.value;
      if (!text) {
        output.innerText = '[!] Please enter text to hash.';
        return;
      }
      try {
        const msgUint8 = new TextEncoder().encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        output.innerHTML = `<strong>SHA-256 Hash:</strong><br><span style="color: var(--emerald-glow);">${hashHex}</span>`;
      } catch (e) {
        output.innerText = 'Hashing error: ' + e.message;
      }
    });

    container.querySelector('#btn-encode-b64').addEventListener('click', () => {
      cyberAudio.playClick();
      try {
        const encoded = btoa(unescape(encodeURIComponent(input.value)));
        output.innerHTML = `<strong>Base64 Encoded:</strong><br><span style="color: var(--cyan-glow);">${encoded}</span>`;
      } catch (e) {
        output.innerText = 'Encoding error: ' + e.message;
      }
    });

    container.querySelector('#btn-decode-b64').addEventListener('click', () => {
      cyberAudio.playClick();
      try {
        const decoded = decodeURIComponent(escape(atob(input.value.trim())));
        output.innerHTML = `<strong>Base64 Decoded:</strong><br><span style="color: #fff;">${escapeHtml(decoded)}</span>`;
      } catch (e) {
        output.innerText = 'Invalid Base64 payload.';
      }
    });
  }

  render();
}

function numToIp(num) {
  return [
    (num >>> 24) & 255,
    (num >>> 16) & 255,
    (num >>> 8) & 255,
    num & 255
  ].join('.');
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
