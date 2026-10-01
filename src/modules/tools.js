import { cyberAudio } from './audio.js';
import { i18n } from '../utils/i18n.js';

export function renderTools(container) {
  let activeTool = 'subnet'; // 'subnet', 'ports', 'crypto', 'defanger', 'firewall', 'entropy', 'cvss'

  function render() {
    const isHinglish = i18n.getLanguage() === 'hinglish';

    container.innerHTML = `
      <div class="tools-viewport" style="max-width: 1100px; margin: 0 auto;">
        <!-- Header -->
        <div class="card-tactical" style="background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%); border-left: 4px solid var(--cyan-glow); margin-bottom: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <div>
              <span class="tag-pill" style="border-color: var(--cyan-glow); margin-bottom: 8px; display: inline-block; font-weight: 700;">
                TACTICAL FIELD UTILITIES & ANALYSIS SUITE
              </span>
              <h2 style="font-size: 26px; color: var(--text-bright); margin-bottom: 6px;">
                ${isHinglish ? 'Security Toolkit: Practical Defense Utilities' : 'Security Toolkit: Tactical Engineering & Analysis Suite'}
              </h2>
              <p style="color: var(--text-muted); font-size: 14px; max-width: 750px; line-height: 1.5; margin: 0;">
                ${isHinglish 
                  ? 'Cyber security aur network engineering ke 7 practical tools: Subnet calculator, High-risk ports, Cryptographic hashing, Threat IOC defanger, Firewall rule generator, Password entropy aur CVSS v3.1 scorer.'
                  : '7 professional-grade utilities for subnet engineering, threat vector mapping, cryptographic operations, threat intelligence IOC defanging, multi-platform firewall generation, password entropy audits, and CVSS v3.1 vulnerability scoring.'}
              </p>
            </div>
          </div>
        </div>

        <!-- Tool Switcher Tabs -->
        <div class="domain-filter-bar" style="margin-bottom: 24px; display: flex; flex-wrap: wrap; gap: 8px;">
          <span class="filter-pill ${activeTool === 'subnet' ? 'active' : ''}" data-tool="subnet">
            🌐 Subnet & CIDR Calculator
          </span>
          <span class="filter-pill ${activeTool === 'ports' ? 'active' : ''}" data-tool="ports">
            🔍 High-Risk Port Directory
          </span>
          <span class="filter-pill ${activeTool === 'crypto' ? 'active' : ''}" data-tool="crypto">
            🔐 Crypto & Hash Studio
          </span>
          <span class="filter-pill ${activeTool === 'defanger' ? 'active' : ''}" data-tool="defanger">
            🛡️ IOC Defanger & Refanger
          </span>
          <span class="filter-pill ${activeTool === 'firewall' ? 'active' : ''}" data-tool="firewall">
            🧱 Multi-Platform Firewall Rules
          </span>
          <span class="filter-pill ${activeTool === 'entropy' ? 'active' : ''}" data-tool="entropy">
            🔑 Password Entropy & Cracking
          </span>
          <span class="filter-pill ${activeTool === 'cvss' ? 'active' : ''}" data-tool="cvss">
            ⚡ CVSS v3.1 Severity Scorer
          </span>
        </div>

        <!-- Active Tool Workspace -->
        <div id="active-tool-workspace">
          ${activeTool === 'subnet' ? renderSubnetTool() : ''}
          ${activeTool === 'ports' ? renderPortsTool() : ''}
          ${activeTool === 'crypto' ? renderCryptoTool() : ''}
          ${activeTool === 'defanger' ? renderDefangerTool() : ''}
          ${activeTool === 'firewall' ? renderFirewallTool() : ''}
          ${activeTool === 'entropy' ? renderEntropyTool() : ''}
          ${activeTool === 'cvss' ? renderCvssTool() : ''}
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
    if (activeTool === 'defanger') setupDefangerListeners();
    if (activeTool === 'firewall') setupFirewallListeners();
    if (activeTool === 'entropy') setupEntropyListeners();
    if (activeTool === 'cvss') setupCvssListeners();
  }

  // ==========================================
  // TOOL 1: SUBNET CALCULATOR
  // ==========================================
  function renderSubnetTool() {
    return `
      <div class="card-tactical" style="padding: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
          <div>
            <h3 style="font-size: 18px; color: var(--cyan-glow); margin-bottom: 4px;">
              IPv4 Subnet, VLSM & Network Addressing Calculator
            </h3>
            <p style="font-size: 13px; color: var(--text-muted); margin: 0;">
              Calculates network IDs, broadcast boundaries, usable host ranges, and wildcard masks instantly.
            </p>
          </div>
          <button class="btn btn-outline btn-sm" id="btn-copy-subnet-report">
            📋 Copy Report
          </button>
        </div>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 16px; margin-bottom: 20px;">
          <div class="tool-input-group">
            <label style="font-size: 12px; font-weight: 600; color: #fff; margin-bottom: 6px; display: block;">IP Address</label>
            <input type="text" id="subnet-ip-input" class="tool-input" value="192.168.1.100" placeholder="e.g. 10.0.0.1" />
          </div>
          <div class="tool-input-group">
            <label style="font-size: 12px; font-weight: 600; color: #fff; margin-bottom: 6px; display: block;">CIDR Prefix (/)</label>
            <select id="subnet-cidr-input" class="tool-input">
              ${Array.from({ length: 31 }, (_, i) => i + 1).map(cidr => `
                <option value="${cidr}" ${cidr === 24 ? 'selected' : ''}>/${cidr} (${Math.pow(2, 32 - cidr).toLocaleString()} addresses)</option>
              `).join('')}
            </select>
          </div>
        </div>

        <div id="subnet-output-box" class="tool-result-box" style="line-height: 1.8; background: #030814; border: 1px solid rgba(0,242,254,0.2);">
          <!-- Dynamically populated -->
        </div>
      </div>
    `;
  }

  function setupSubnetListeners() {
    const ipInput = container.querySelector('#subnet-ip-input');
    const cidrInput = container.querySelector('#subnet-cidr-input');
    const outputBox = container.querySelector('#subnet-output-box');
    const copyBtn = container.querySelector('#btn-copy-subnet-report');

    let currentReport = '';

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
      const wildcardNum = (~maskNum) >>> 0;

      const numTotalHosts = Math.pow(2, 32 - cidr);
      const numUsableHosts = cidr >= 31 ? (cidr === 31 ? 2 : 1) : Math.max(0, numTotalHosts - 2);

      const netStr = numToIp(netNum);
      const bcastStr = numToIp(bcastNum);
      const maskStr = numToIp(maskNum);
      const wildcardStr = numToIp(wildcardNum);
      const firstUsable = cidr >= 31 ? netStr : numToIp(netNum + 1);
      const lastUsable = cidr >= 31 ? bcastStr : numToIp(bcastNum - 1);

      // Binary representation of mask
      const maskBin = (maskNum >>> 0).toString(2).padStart(32, '0').match(/.{8}/g).join('.');

      currentReport = `SUBNET CALCULATION REPORT
IP Address: ${ipStr}
Prefix: /${cidr}
Network Address: ${netStr}
Subnet Mask: ${maskStr}
Wildcard Mask: ${wildcardStr}
Directed Broadcast: ${bcastStr}
Usable Host Range: ${firstUsable} - ${lastUsable}
Total Addresses: ${numTotalHosts.toLocaleString()}
Usable Host Count: ${numUsableHosts.toLocaleString()}
Binary Mask: ${maskBin}`;

      outputBox.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin-bottom: 12px;">
          <div><strong style="color: var(--text-dim);">Network Address:</strong> <span style="color: #fff; font-family: var(--font-mono); font-weight: 700;">${netStr} / ${cidr}</span></div>
          <div><strong style="color: var(--text-dim);">Subnet Mask:</strong> <span style="color: #fff; font-family: var(--font-mono);">${maskStr}</span></div>
          <div><strong style="color: var(--text-dim);">Wildcard Mask:</strong> <span style="color: var(--amber-glow); font-family: var(--font-mono);">${wildcardStr}</span></div>
          <div><strong style="color: var(--text-dim);">Directed Broadcast:</strong> <span style="color: #fff; font-family: var(--font-mono);">${bcastStr}</span></div>
          <div><strong style="color: var(--text-dim);">Usable Host Range:</strong> <span style="color: var(--emerald-glow); font-family: var(--font-mono); font-weight: 700;">${firstUsable} - ${lastUsable}</span></div>
          <div><strong style="color: var(--text-dim);">Usable Hosts:</strong> <span style="color: var(--cyan-glow); font-family: var(--font-mono); font-weight: 700;">${numUsableHosts.toLocaleString()} hosts</span></div>
        </div>
        <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px; font-size: 12px; color: var(--text-dim); font-family: var(--font-mono);">
          <span>Binary Mask: <code style="color: var(--cyan-glow);">${maskBin}</code></span>
        </div>
      `;
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        cyberAudio.playSuccess();
        navigator.clipboard.writeText(currentReport);
        copyBtn.innerText = '✓ Copied!';
        setTimeout(() => copyBtn.innerText = '📋 Copy Report', 2000);
      });
    }

    ipInput.addEventListener('input', calculate);
    cidrInput.addEventListener('change', calculate);
    calculate();
  }

  // ==========================================
  // TOOL 2: HIGH-RISK PORTS
  // ==========================================
  const HIGH_RISK_PORTS = [
    { port: 20, proto: 'TCP', name: 'FTP-Data', risk: 'HIGH', desc: 'FTP data channel, vulnerable to cleartext sniffing.' },
    { port: 21, proto: 'TCP', name: 'FTP', risk: 'HIGH', desc: 'Cleartext file transfer, prone to anonymous login and brute-force.' },
    { port: 22, proto: 'TCP', name: 'SSH', risk: 'MEDIUM', desc: 'Encrypted administrative shell; targeted for automated credential stuffing.' },
    { port: 23, proto: 'TCP', name: 'Telnet', risk: 'CRITICAL', desc: 'Unencrypted remote management; transmits passwords in cleartext.' },
    { port: 25, proto: 'TCP', name: 'SMTP', risk: 'MEDIUM', desc: 'Mail delivery; abused for open relay mail spoofing and spam.' },
    { port: 53, proto: 'UDP/TCP', name: 'DNS', risk: 'MEDIUM', desc: 'Domain name service; abused for DNS amplification and covert tunneling.' },
    { port: 69, proto: 'UDP', name: 'TFTP', risk: 'HIGH', desc: 'Trivial FTP; lacks authentication, used in network firmware leaks.' },
    { port: 80, proto: 'TCP', name: 'HTTP', risk: 'MEDIUM', desc: 'Unencrypted web traffic; prone to packet sniffing and injection.' },
    { port: 88, proto: 'TCP/UDP', name: 'Kerberos', risk: 'HIGH', desc: 'Windows domain authentication; target for AS-REP and Kerberoasting.' },
    { port: 111, proto: 'TCP/UDP', name: 'RPCbind', risk: 'HIGH', desc: 'Unix RPC map; vulnerable to amplification DDoS and port enumeration.' },
    { port: 135, proto: 'TCP', name: 'MS-RPC', risk: 'HIGH', desc: 'Endpoint mapper; abused for remote WMI, DCOM and lateral movement.' },
    { port: 139, proto: 'TCP', name: 'NetBIOS', risk: 'HIGH', desc: 'Legacy SMB session; leaks internal computer names and workgroups.' },
    { port: 161, proto: 'UDP', name: 'SNMP', risk: 'HIGH', desc: 'Network telemetry; default community strings ("public") leak topology.' },
    { port: 389, proto: 'TCP/UDP', name: 'LDAP', risk: 'HIGH', desc: 'Directory service; vulnerable to unauthenticated user enumeration.' },
    { port: 445, proto: 'TCP', name: 'SMB', risk: 'CRITICAL', desc: 'Server Message Block; vector for EternalBlue, WannaCry, lateral movement.' },
    { port: 502, proto: 'TCP', name: 'Modbus', risk: 'CRITICAL', desc: 'Industrial SCADA control protocol; lacks authentication or encryption.' },
    { port: 1433, proto: 'TCP', name: 'MSSQL', risk: 'HIGH', desc: 'Microsoft SQL database; prime target for SQL injection and xp_cmdshell.' },
    { port: 1521, proto: 'TCP', name: 'Oracle DB', risk: 'HIGH', desc: 'Oracle database listener; target for TNS poison attacks.' },
    { port: 2049, proto: 'TCP/UDP', name: 'NFS', risk: 'HIGH', desc: 'Network File System; unauthenticated exports allow root directory mount.' },
    { port: 3306, proto: 'TCP', name: 'MySQL', risk: 'HIGH', desc: 'MySQL DB; target for automated password brute-force.' },
    { port: 3389, proto: 'TCP', name: 'RDP', risk: 'CRITICAL', desc: 'Remote Desktop Protocol; top entry vector for enterprise ransomware.' },
    { port: 4444, proto: 'TCP', name: 'Metasploit', risk: 'CRITICAL', desc: 'Default listener port for Metasploit Meterpreter reverse shells.' },
    { port: 5900, proto: 'TCP', name: 'VNC', risk: 'HIGH', desc: 'Virtual Network Computing; weak authentication and screen capture.' },
    { port: 5985, proto: 'TCP', name: 'WinRM-HTTP', risk: 'HIGH', desc: 'Windows Remote Management; vector for PowerShell Remoting attacks.' },
    { port: 8080, proto: 'TCP', name: 'HTTP-Alt', risk: 'MEDIUM', desc: 'Common web proxy / Tomcat admin port; leaks default management credentials.' }
  ];

  function renderPortsTool() {
    return `
      <div class="card-tactical" style="padding: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
          <div>
            <h3 style="font-size: 18px; color: var(--emerald-glow); margin-bottom: 4px;">
              High-Risk Tactical Ports & Threat Vector Database (${HIGH_RISK_PORTS.length} Ports)
            </h3>
            <p style="font-size: 13px; color: var(--text-muted); margin: 0;">
              Search known attack surface ports and identify targeted vulnerabilities.
            </p>
          </div>
          <div style="display: flex; gap: 8px;">
            <input type="text" id="port-filter-input" class="search-input" placeholder="Search port (e.g. 445, SMB)..." style="width: 220px;" />
          </div>
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

  // ==========================================
  // TOOL 3: CRYPTOGRAPHIC HASH STUDIO
  // ==========================================
  function renderCryptoTool() {
    return `
      <div class="card-tactical" style="padding: 24px;">
        <h3 style="font-size: 18px; color: var(--amber-glow); margin-bottom: 6px;">
          Cryptographic Hash & Encoding Studio
        </h3>
        <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">
          Compute cryptographic hashes (SHA-256, SHA-512, SHA-1), Base64 encoding/decoding, Hex, and URL encoding.
        </p>

        <div class="tool-input-group" style="margin-bottom: 14px;">
          <label style="font-size: 12px; font-weight: 600; color: #fff; margin-bottom: 6px; display: block;">Plaintext / Input String</label>
          <textarea id="crypto-plain-input" class="tool-input" rows="3" placeholder="Enter plaintext, token, or command to encode/hash..."></textarea>
        </div>

        <div style="display: flex; gap: 8px; margin-bottom: 18px; flex-wrap: wrap;">
          <button class="btn btn-cyan btn-sm" id="btn-hash-sha256">SHA-256</button>
          <button class="btn btn-cyan btn-sm" id="btn-hash-sha512">SHA-512</button>
          <button class="btn btn-outline btn-sm" id="btn-hash-sha1">SHA-1</button>
          <button class="btn btn-outline btn-sm" id="btn-encode-b64">Encode Base64</button>
          <button class="btn btn-outline btn-sm" id="btn-decode-b64">Decode Base64</button>
          <button class="btn btn-outline btn-sm" id="btn-hex-encode">Text to Hex</button>
          <button class="btn btn-outline btn-sm" id="btn-url-encode">URL Encode</button>
          <button class="btn btn-outline btn-sm" id="btn-url-decode">URL Decode</button>
        </div>

        <div class="tool-input-group">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <label style="font-size: 12px; font-weight: 600; color: #fff;">Resulting Output</label>
            <button class="btn btn-outline btn-sm" id="btn-copy-crypto-result" style="padding: 2px 10px; font-size: 11px;">
              📋 Copy Result
            </button>
          </div>
          <div id="crypto-output-result" class="tool-result-box" style="min-height: 80px; word-break: break-all; font-family: var(--font-mono); background: #030814; border: 1px solid rgba(245,158,11,0.25);">
            Enter text above and select an operation.
          </div>
        </div>
      </div>
    `;
  }

  function setupCryptoListeners() {
    const input = container.querySelector('#crypto-plain-input');
    const output = container.querySelector('#crypto-output-result');
    const copyBtn = container.querySelector('#btn-copy-crypto-result');
    let rawOutputText = '';

    copyBtn.addEventListener('click', () => {
      if (!rawOutputText) return;
      cyberAudio.playSuccess();
      navigator.clipboard.writeText(rawOutputText);
      copyBtn.innerText = '✓ Copied!';
      setTimeout(() => copyBtn.innerText = '📋 Copy Result', 2000);
    });

    container.querySelector('#btn-hash-sha256').addEventListener('click', async () => {
      cyberAudio.playClick();
      const text = input.value;
      if (!text) return output.innerText = '[!] Please enter text to hash.';
      try {
        const msgUint8 = new TextEncoder().encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        const hashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
        rawOutputText = hashHex;
        output.innerHTML = `<strong>SHA-256 Hash (256-bit):</strong><br><span style="color: var(--emerald-glow);">${hashHex}</span>`;
      } catch (e) {
        output.innerText = 'Hashing error: ' + e.message;
      }
    });

    container.querySelector('#btn-hash-sha512').addEventListener('click', async () => {
      cyberAudio.playClick();
      const text = input.value;
      if (!text) return output.innerText = '[!] Please enter text to hash.';
      try {
        const msgUint8 = new TextEncoder().encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-512', msgUint8);
        const hashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
        rawOutputText = hashHex;
        output.innerHTML = `<strong>SHA-512 Hash (512-bit):</strong><br><span style="color: var(--cyan-glow);">${hashHex}</span>`;
      } catch (e) {
        output.innerText = 'Hashing error: ' + e.message;
      }
    });

    container.querySelector('#btn-hash-sha1').addEventListener('click', async () => {
      cyberAudio.playClick();
      const text = input.value;
      if (!text) return output.innerText = '[!] Please enter text to hash.';
      try {
        const msgUint8 = new TextEncoder().encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8);
        const hashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
        rawOutputText = hashHex;
        output.innerHTML = `<strong>SHA-1 Hash (160-bit Legacy):</strong><br><span style="color: var(--amber-glow);">${hashHex}</span>`;
      } catch (e) {
        output.innerText = 'Hashing error: ' + e.message;
      }
    });

    container.querySelector('#btn-encode-b64').addEventListener('click', () => {
      cyberAudio.playClick();
      try {
        const encoded = btoa(unescape(encodeURIComponent(input.value)));
        rawOutputText = encoded;
        output.innerHTML = `<strong>Base64 Encoded:</strong><br><span style="color: var(--cyan-glow);">${encoded}</span>`;
      } catch (e) {
        output.innerText = 'Encoding error: ' + e.message;
      }
    });

    container.querySelector('#btn-decode-b64').addEventListener('click', () => {
      cyberAudio.playClick();
      try {
        const decoded = decodeURIComponent(escape(atob(input.value.trim())));
        rawOutputText = decoded;
        output.innerHTML = `<strong>Base64 Decoded:</strong><br><span style="color: #fff;">${escapeHtml(decoded)}</span>`;
      } catch (e) {
        output.innerText = 'Invalid Base64 payload.';
      }
    });

    container.querySelector('#btn-hex-encode').addEventListener('click', () => {
      cyberAudio.playClick();
      const text = input.value;
      if (!text) return output.innerText = '[!] Please enter text.';
      const hex = Array.from(new TextEncoder().encode(text)).map(b => b.toString(16).padStart(2, '0')).join(' ');
      rawOutputText = hex;
      output.innerHTML = `<strong>Hex Representation:</strong><br><span style="color: var(--cyan-glow);">${hex}</span>`;
    });

    container.querySelector('#btn-url-encode').addEventListener('click', () => {
      cyberAudio.playClick();
      const text = input.value;
      const encoded = encodeURIComponent(text);
      rawOutputText = encoded;
      output.innerHTML = `<strong>URL Encoded:</strong><br><span style="color: var(--emerald-glow);">${encoded}</span>`;
    });

    container.querySelector('#btn-url-decode').addEventListener('click', () => {
      cyberAudio.playClick();
      try {
        const decoded = decodeURIComponent(input.value);
        rawOutputText = decoded;
        output.innerHTML = `<strong>URL Decoded:</strong><br><span style="color: #fff;">${escapeHtml(decoded)}</span>`;
      } catch (e) {
        output.innerText = 'URL Decode error.';
      }
    });
  }

  // ==========================================
  // TOOL 4: THREAT INTEL IOC DEFANGER & REFANGER
  // ==========================================
  function renderDefangerTool() {
    return `
      <div class="card-tactical" style="padding: 24px;">
        <h3 style="font-size: 18px; color: var(--emerald-glow); margin-bottom: 6px;">
          Threat Intelligence IOC Defanger & Refanger
        </h3>
        <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">
          Safely neutralize malicious URLs, IP addresses, domains, and email addresses so they cannot be accidentally clicked in incident reports or emails.
        </p>

        <div class="tool-input-group" style="margin-bottom: 14px;">
          <label style="font-size: 12px; font-weight: 600; color: #fff; margin-bottom: 6px; display: block;">Raw Indicators of Compromise (URLs, Domains, IPs)</label>
          <textarea id="defang-input" class="tool-input" rows="4" placeholder="Enter IOCs to defang (e.g. http://bad-actor.net/payload.exe or 192.168.1.50)..."></textarea>
        </div>

        <div style="display: flex; gap: 10px; margin-bottom: 18px;">
          <button class="btn btn-cyan btn-sm" id="btn-defang-action" style="font-weight: 700;">
            🛡️ Defang IOCs (Safe Format)
          </button>
          <button class="btn btn-outline btn-sm" id="btn-refang-action">
            🔓 Refang IOCs (Restore Original)
          </button>
          <button class="btn btn-outline btn-sm" id="btn-copy-defang-result" style="margin-left: auto;">
            📋 Copy Output
          </button>
        </div>

        <div class="tool-input-group">
          <label style="font-size: 12px; font-weight: 600; color: #fff; margin-bottom: 6px; display: block;">Processed Output</label>
          <div id="defang-output-result" class="tool-result-box" style="min-height: 90px; word-break: break-all; font-family: var(--font-mono); background: #030814; border: 1px solid rgba(16,185,129,0.25);">
            Output will appear here.
          </div>
        </div>
      </div>
    `;
  }

  function setupDefangerListeners() {
    const input = container.querySelector('#defang-input');
    const output = container.querySelector('#defang-output-result');
    const copyBtn = container.querySelector('#btn-copy-defang-result');
    let lastProcessed = '';

    copyBtn.addEventListener('click', () => {
      if (!lastProcessed) return;
      cyberAudio.playSuccess();
      navigator.clipboard.writeText(lastProcessed);
      copyBtn.innerText = '✓ Copied!';
      setTimeout(() => copyBtn.innerText = '📋 Copy Output', 2000);
    });

    container.querySelector('#btn-defang-action').addEventListener('click', () => {
      cyberAudio.playClick();
      const text = input.value;
      if (!text) return output.innerText = '[!] Please enter text or IOCs to defang.';

      // Defang rules:
      // http:// -> hxxp://
      // https:// -> hxxps://
      // . -> [.]
      // @ -> [@]
      let defanged = text
        .replace(/https:\/\//gi, 'hxxps://')
        .replace(/http:\/\//gi, 'hxxp://')
        .replace(/\./g, '[.]')
        .replace(/@/g, '[@]');

      lastProcessed = defanged;
      output.innerHTML = `<span style="color: var(--emerald-glow);">${escapeHtml(defanged)}</span>`;
    });

    container.querySelector('#btn-refang-action').addEventListener('click', () => {
      cyberAudio.playClick();
      const text = input.value;
      if (!text) return output.innerText = '[!] Please enter text to refang.';

      let refanged = text
        .replace(/hxxps:\/\//gi, 'https://')
        .replace(/hxxp:\/\//gi, 'http://')
        .replace(/\[\.\]/g, '.')
        .replace(/\[@\]/g, '@');

      lastProcessed = refanged;
      output.innerHTML = `<span style="color: #fff;">${escapeHtml(refanged)}</span>`;
    });
  }

  // ==========================================
  // TOOL 5: MULTI-PLATFORM FIREWALL GENERATOR
  // ==========================================
  function renderFirewallTool() {
    return `
      <div class="card-tactical" style="padding: 24px;">
        <h3 style="font-size: 18px; color: var(--cyan-glow); margin-bottom: 6px;">
          Multi-Platform Firewall & ACL Rule Generator
        </h3>
        <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 20px;">
          Generate production-ready rules for Linux iptables, Ubuntu UFW, Windows Defender Firewall, Cisco IOS ACLs, and Snort 3 IDS simultaneously.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 20px;">
          <div class="tool-input-group">
            <label style="font-size: 12px; font-weight: 600; color: #fff; margin-bottom: 6px; display: block;">Rule Name</label>
            <input type="text" id="fw-rule-name" class="tool-input" value="BLOCK_MALICIOUS_C2" />
          </div>
          <div class="tool-input-group">
            <label style="font-size: 12px; font-weight: 600; color: #fff; margin-bottom: 6px; display: block;">Action</label>
            <select id="fw-action" class="tool-input">
              <option value="DROP" selected>DROP / BLOCK</option>
              <option value="ACCEPT">ACCEPT / ALLOW</option>
              <option value="REJECT">REJECT</option>
            </select>
          </div>
          <div class="tool-input-group">
            <label style="font-size: 12px; font-weight: 600; color: #fff; margin-bottom: 6px; display: block;">Protocol</label>
            <select id="fw-proto" class="tool-input">
              <option value="tcp" selected>TCP</option>
              <option value="udp">UDP</option>
              <option value="any">ANY / ALL</option>
            </select>
          </div>
          <div class="tool-input-group">
            <label style="font-size: 12px; font-weight: 600; color: #fff; margin-bottom: 6px; display: block;">Source IP / Subnet</label>
            <input type="text" id="fw-src-ip" class="tool-input" value="198.51.100.44" placeholder="e.g. 198.51.100.44 or 10.0.0.0/24" />
          </div>
          <div class="tool-input-group">
            <label style="font-size: 12px; font-weight: 600; color: #fff; margin-bottom: 6px; display: block;">Destination Port</label>
            <input type="text" id="fw-dest-port" class="tool-input" value="443" placeholder="e.g. 443 or any" />
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          <!-- Linux iptables -->
          <div class="tool-result-box" style="background: #030814; border: 1px solid var(--border-subtle);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <strong style="color: var(--cyan-glow); font-size: 12px;">LINUX IPTABLES COMMAND</strong>
              <button class="btn btn-outline btn-sm btn-copy-rule" data-target="iptables" style="padding: 2px 8px; font-size: 11px;">Copy</button>
            </div>
            <code id="out-rule-iptables" style="font-family: var(--font-mono); color: #fff; font-size: 12px; display: block;"></code>
          </div>

          <!-- Ubuntu UFW -->
          <div class="tool-result-box" style="background: #030814; border: 1px solid var(--border-subtle);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <strong style="color: var(--amber-glow); font-size: 12px;">UBUNTU UFW FIREWALL COMMAND</strong>
              <button class="btn btn-outline btn-sm btn-copy-rule" data-target="ufw" style="padding: 2px 8px; font-size: 11px;">Copy</button>
            </div>
            <code id="out-rule-ufw" style="font-family: var(--font-mono); color: #fff; font-size: 12px; display: block;"></code>
          </div>

          <!-- Windows Defender Firewall -->
          <div class="tool-result-box" style="background: #030814; border: 1px solid var(--border-subtle);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <strong style="color: var(--emerald-glow); font-size: 12px;">WINDOWS DEFENDER FIREWALL (POWERSHELL)</strong>
              <button class="btn btn-outline btn-sm btn-copy-rule" data-target="windows" style="padding: 2px 8px; font-size: 11px;">Copy</button>
            </div>
            <code id="out-rule-windows" style="font-family: var(--font-mono); color: #fff; font-size: 12px; display: block;"></code>
          </div>

          <!-- Cisco IOS ACL -->
          <div class="tool-result-box" style="background: #030814; border: 1px solid var(--border-subtle);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <strong style="color: #38bdf8; font-size: 12px;">CISCO IOS EXTENDED ACCESS LIST (ACL)</strong>
              <button class="btn btn-outline btn-sm btn-copy-rule" data-target="cisco" style="padding: 2px 8px; font-size: 11px;">Copy</button>
            </div>
            <code id="out-rule-cisco" style="font-family: var(--font-mono); color: #fff; font-size: 12px; display: block;"></code>
          </div>

          <!-- Snort / Suricata -->
          <div class="tool-result-box" style="background: #030814; border: 1px solid var(--border-subtle);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <strong style="color: var(--crimson-glow); font-size: 12px;">SNORT 3 / SURICATA IDS SIGNATURE</strong>
              <button class="btn btn-outline btn-sm btn-copy-rule" data-target="snort" style="padding: 2px 8px; font-size: 11px;">Copy</button>
            </div>
            <code id="out-rule-snort" style="font-family: var(--font-mono); color: #fff; font-size: 12px; display: block;"></code>
          </div>
        </div>
      </div>
    `;
  }

  function setupFirewallListeners() {
    const nameEl = container.querySelector('#fw-rule-name');
    const actionEl = container.querySelector('#fw-action');
    const protoEl = container.querySelector('#fw-proto');
    const srcEl = container.querySelector('#fw-src-ip');
    const portEl = container.querySelector('#fw-dest-port');

    const outIptables = container.querySelector('#out-rule-iptables');
    const outUfw = container.querySelector('#out-rule-ufw');
    const outWindows = container.querySelector('#out-rule-windows');
    const outCisco = container.querySelector('#out-rule-cisco');
    const outSnort = container.querySelector('#out-rule-snort');

    function updateRules() {
      const name = nameEl.value.trim() || 'RULE_1';
      const action = actionEl.value; // DROP, ACCEPT, REJECT
      const proto = protoEl.value; // tcp, udp, any
      const src = srcEl.value.trim() || 'any';
      const port = portEl.value.trim() || 'any';

      // 1. iptables
      let ipRule = `iptables -A INPUT`;
      if (src !== 'any') ipRule += ` -s ${src}`;
      if (proto !== 'any') ipRule += ` -p ${proto}`;
      if (port !== 'any' && proto !== 'any') ipRule += ` --dport ${port}`;
      ipRule += ` -j ${action} -m comment --comment "${name}"`;
      outIptables.innerText = ipRule;

      // 2. ufw
      let ufwAction = action === 'ACCEPT' ? 'allow' : (action === 'REJECT' ? 'reject' : 'deny');
      let ufwRule = `ufw ${ufwAction} from ${src}`;
      if (port !== 'any' && proto !== 'any') ufwRule += ` to any port ${port} proto ${proto}`;
      outUfw.innerText = ufwRule;

      // 3. Windows Defender Firewall
      let winAction = action === 'ACCEPT' ? 'Allow' : 'Block';
      let winRule = `New-NetFirewallRule -DisplayName "${name}" -Direction Inbound -Action ${winAction}`;
      if (src !== 'any') winRule += ` -RemoteAddress "${src}"`;
      if (proto !== 'any') winRule += ` -Protocol ${proto.toUpperCase()}`;
      if (port !== 'any' && proto !== 'any') winRule += ` -LocalPort ${port}`;
      outWindows.innerText = winRule;

      // 4. Cisco IOS ACL
      let ciscoAction = action === 'ACCEPT' ? 'permit' : 'deny';
      let ciscoProto = proto === 'any' ? 'ip' : proto;
      let ciscoSrc = src.includes('/') ? src.replace('/', ' ') : (src === 'any' ? 'any' : `host ${src}`);
      let ciscoPort = port === 'any' ? '' : ` eq ${port}`;
      outCisco.innerText = `access-list 101 ${ciscoAction} ${ciscoProto} ${ciscoSrc} any${ciscoPort}`;

      // 5. Snort
      let snortAction = action === 'ACCEPT' ? 'pass' : 'drop';
      let snortProto = proto === 'any' ? 'ip' : proto;
      let snortPort = port === 'any' ? 'any' : port;
      outSnort.innerText = `${snortAction} ${snortProto} ${src} any -> any ${snortPort} (msg:"${name}"; sid:1000001; rev:1;)`;
    }

    [nameEl, actionEl, protoEl, srcEl, portEl].forEach(el => el.addEventListener('input', updateRules));
    [actionEl, protoEl].forEach(el => el.addEventListener('change', updateRules));
    updateRules();

    container.querySelectorAll('.btn-copy-rule').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        const codeEl = container.querySelector(`#out-rule-${target}`);
        if (codeEl) {
          cyberAudio.playSuccess();
          navigator.clipboard.writeText(codeEl.innerText);
          btn.innerText = '✓';
          setTimeout(() => btn.innerText = 'Copy', 2000);
        }
      });
    });
  }

  // ==========================================
  // TOOL 6: PASSWORD ENTROPY & CRACK TIME
  // ==========================================
  function renderEntropyTool() {
    return `
      <div class="card-tactical" style="padding: 24px;">
        <h3 style="font-size: 18px; color: var(--emerald-glow); margin-bottom: 6px;">
          Password Entropy & Tactical Brute-Force Crack Estimator
        </h3>
        <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 20px;">
          Calculates theoretical Shannon bits of entropy ($E = L \\times \\log_2(R)$) and adversary crack duration across modern GPU clusters.
        </p>

        <div class="tool-input-group" style="margin-bottom: 20px;">
          <label style="font-size: 12px; font-weight: 600; color: #fff; margin-bottom: 6px; display: block;">Candidate Password / Credential String</label>
          <input type="text" id="entropy-pwd-input" class="tool-input" value="Tactical!P@ss2026#Sec" placeholder="Type password..." />
        </div>

        <div id="entropy-results-box" class="tool-result-box" style="background: #030814; border: 1px solid rgba(16,185,129,0.25);">
          <!-- Populated -->
        </div>
      </div>
    `;
  }

  function setupEntropyListeners() {
    const pwdInput = container.querySelector('#entropy-pwd-input');
    const resultsBox = container.querySelector('#entropy-results-box');

    function calculateEntropy() {
      const pwd = pwdInput.value;
      if (!pwd) {
        resultsBox.innerHTML = '<span style="color: var(--text-dim);">Enter a password to evaluate.</span>';
        return;
      }

      let poolSize = 0;
      if (/[a-z]/.test(pwd)) poolSize += 26;
      if (/[A-Z]/.test(pwd)) poolSize += 26;
      if (/[0-9]/.test(pwd)) poolSize += 10;
      if (/[^a-zA-Z0-9]/.test(pwd)) poolSize += 33;

      const length = pwd.length;
      const entropy = poolSize > 0 ? (length * Math.log2(poolSize)).toFixed(1) : 0;
      const totalCombinations = Math.pow(poolSize, length);

      const onlineRate = 1e3; // 1,000/sec
      const singleGpu = 10e9; // 10 Billion/sec (Hashcat NTLM)
      const gpuRig8 = 80e9; // 80 Billion/sec (8x 4090)
      const supercomputer = 1e12; // 1 Trillion/sec

      function formatTime(seconds) {
        if (!isFinite(seconds) || seconds > 1e18) return 'Trillions of Centuries (Cryptographically Solid)';
        if (seconds < 1) return 'Instant (< 1 second)';
        if (seconds < 60) return `${Math.round(seconds)} seconds`;
        if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
        if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
        if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
        if (seconds < 3153600000) return `${Math.round(seconds / 31536000)} years`;
        return `${Math.round(seconds / 31536000).toLocaleString()} years`;
      }

      let strengthColor = 'var(--crimson-glow)';
      let strengthLabel = 'CRITICALLY WEAK';
      if (entropy >= 80) {
        strengthColor = 'var(--emerald-glow)';
        strengthLabel = 'MILITARY GRADE (EXCELLENT)';
      } else if (entropy >= 60) {
        strengthColor = 'var(--cyan-glow)';
        strengthLabel = 'STRONG';
      } else if (entropy >= 45) {
        strengthColor = 'var(--amber-glow)';
        strengthLabel = 'MODERATE';
      }

      resultsBox.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-bottom: 18px;">
          <div><strong style="color: var(--text-dim);">Shannon Entropy:</strong> <span style="font-size: 20px; font-weight: bold; color: ${strengthColor};">${entropy} bits</span></div>
          <div><strong style="color: var(--text-dim);">Strength Grade:</strong> <span style="color: ${strengthColor}; font-weight: bold;">${strengthLabel}</span></div>
          <div><strong style="color: var(--text-dim);">Character Pool ($R$):</strong> <span style="color: #fff;">${poolSize} chars</span></div>
          <div><strong style="color: var(--text-dim);">Total Length ($L$):</strong> <span style="color: #fff;">${length} chars</span></div>
        </div>

        <h4 style="font-size: 13px; color: var(--cyan-glow); font-family: var(--font-tactical); margin-bottom: 10px;">
          ESTIMATED ADVERSARY BRUTE-FORCE CRACK DURATIONS (HASHCAT NTLM SPEED)
        </h4>

        <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px;">
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 6px;">
            <span style="color: var(--text-muted);">Standard Online Web Guessing (1k/sec):</span>
            <strong style="color: #fff;">${formatTime(totalCombinations / onlineRate)}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 6px;">
            <span style="color: var(--text-muted);">Single High-End GPU (10 Billion/sec):</span>
            <strong style="color: ${strengthColor};">${formatTime(totalCombinations / singleGpu)}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 6px;">
            <span style="color: var(--text-muted);">Tactical 8x RTX 4090 Hashcat Rig (80 Billion/sec):</span>
            <strong style="color: ${strengthColor};">${formatTime(totalCombinations / gpuRig8)}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; padding-top: 4px;">
            <span style="color: var(--text-muted);">Nation-State Supercomputer Cluster (1 Trillion/sec):</span>
            <strong style="color: #fff;">${formatTime(totalCombinations / supercomputer)}</strong>
          </div>
        </div>
      `;
    }

    pwdInput.addEventListener('input', calculateEntropy);
    calculateEntropy();
  }

  // ==========================================
  // TOOL 7: CVSS v3.1 CALCULATOR
  // ==========================================
  function renderCvssTool() {
    return `
      <div class="card-tactical" style="padding: 24px;">
        <h3 style="font-size: 18px; color: var(--crimson-glow); margin-bottom: 6px;">
          Common Vulnerability Scoring System (CVSS v3.1) Calculator
        </h3>
        <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 20px;">
          Compute standardized base severity scores and vector strings for CVE vulnerability disclosure and triage.
        </p>

        <!-- Metric Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 24px;">
          <div class="tool-input-group">
            <label style="font-size: 12px; font-weight: 600; color: #fff; margin-bottom: 6px; display: block;">Attack Vector (AV)</label>
            <select id="cvss-av" class="tool-input">
              <option value="0.85" data-code="N" selected>Network (N) - 0.85</option>
              <option value="0.62" data-code="A">Adjacent (A) - 0.62</option>
              <option value="0.55" data-code="L">Local (L) - 0.55</option>
              <option value="0.2" data-code="P">Physical (P) - 0.20</option>
            </select>
          </div>

          <div class="tool-input-group">
            <label style="font-size: 12px; font-weight: 600; color: #fff; margin-bottom: 6px; display: block;">Attack Complexity (AC)</label>
            <select id="cvss-ac" class="tool-input">
              <option value="0.77" data-code="L" selected>Low (L) - 0.77</option>
              <option value="0.44" data-code="H">High (H) - 0.44</option>
            </select>
          </div>

          <div class="tool-input-group">
            <label style="font-size: 12px; font-weight: 600; color: #fff; margin-bottom: 6px; display: block;">Privileges Required (PR)</label>
            <select id="cvss-pr" class="tool-input">
              <option value="0.85" data-code="N" selected>None (N) - 0.85</option>
              <option value="0.62" data-code="L">Low (L) - 0.62</option>
              <option value="0.27" data-code="H">High (H) - 0.27</option>
            </select>
          </div>

          <div class="tool-input-group">
            <label style="font-size: 12px; font-weight: 600; color: #fff; margin-bottom: 6px; display: block;">User Interaction (UI)</label>
            <select id="cvss-ui" class="tool-input">
              <option value="0.85" data-code="N" selected>None (N) - 0.85</option>
              <option value="0.62" data-code="R">Required (R) - 0.62</option>
            </select>
          </div>

          <div class="tool-input-group">
            <label style="font-size: 12px; font-weight: 600; color: #fff; margin-bottom: 6px; display: block;">Confidentiality (C)</label>
            <select id="cvss-c" class="tool-input">
              <option value="0.56" data-code="H" selected>High (H) - 0.56</option>
              <option value="0.22" data-code="L">Low (L) - 0.22</option>
              <option value="0.0" data-code="N">None (N) - 0.00</option>
            </select>
          </div>

          <div class="tool-input-group">
            <label style="font-size: 12px; font-weight: 600; color: #fff; margin-bottom: 6px; display: block;">Integrity (I)</label>
            <select id="cvss-i" class="tool-input">
              <option value="0.56" data-code="H" selected>High (H) - 0.56</option>
              <option value="0.22" data-code="L">Low (L) - 0.22</option>
              <option value="0.0" data-code="N">None (N) - 0.00</option>
            </select>
          </div>

          <div class="tool-input-group">
            <label style="font-size: 12px; font-weight: 600; color: #fff; margin-bottom: 6px; display: block;">Availability (A)</label>
            <select id="cvss-a" class="tool-input">
              <option value="0.56" data-code="H" selected>High (H) - 0.56</option>
              <option value="0.22" data-code="L">Low (L) - 0.22</option>
              <option value="0.0" data-code="N">None (N) - 0.00</option>
            </select>
          </div>
        </div>

        <!-- Result Box -->
        <div id="cvss-result-display" class="tool-result-box" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; background: #030814; border: 1px solid rgba(239,68,68,0.25);">
          <!-- Dynamically populated -->
        </div>
      </div>
    `;
  }

  function setupCvssListeners() {
    const av = container.querySelector('#cvss-av');
    const ac = container.querySelector('#cvss-ac');
    const pr = container.querySelector('#cvss-pr');
    const ui = container.querySelector('#cvss-ui');
    const c = container.querySelector('#cvss-c');
    const i = container.querySelector('#cvss-i');
    const a = container.querySelector('#cvss-a');
    const resBox = container.querySelector('#cvss-result-display');

    function calculateCvss() {
      const avVal = parseFloat(av.value);
      const acVal = parseFloat(ac.value);
      const prVal = parseFloat(pr.value);
      const uiVal = parseFloat(ui.value);
      const cVal = parseFloat(c.value);
      const iVal = parseFloat(i.value);
      const aVal = parseFloat(a.value);

      const iss = 1 - ((1 - cVal) * (1 - iVal) * (1 - aVal));
      const impact = 6.42 * iss;
      const exploitability = 8.22 * avVal * acVal * prVal * uiVal;

      let baseScore = 0;
      if (impact <= 0) {
        baseScore = 0.0;
      } else {
        baseScore = Math.min(10.0, Math.ceil((Math.min(impact + exploitability, 10.0)) * 10) / 10);
      }

      let severity = 'NONE';
      let sevClass = 'news-badge-medium';
      if (baseScore >= 9.0) {
        severity = 'CRITICAL';
        sevClass = 'news-badge-critical';
      } else if (baseScore >= 7.0) {
        severity = 'HIGH';
        sevClass = 'news-badge-critical';
      } else if (baseScore >= 4.0) {
        severity = 'MEDIUM';
        sevClass = 'news-badge-high';
      } else if (baseScore > 0) {
        severity = 'LOW';
        sevClass = 'news-badge-medium';
      }

      const vector = `CVSS:3.1/AV:${av.selectedOptions[0].dataset.code}/AC:${ac.selectedOptions[0].dataset.code}/PR:${pr.selectedOptions[0].dataset.code}/UI:${ui.selectedOptions[0].dataset.code}/S:U/C:${c.selectedOptions[0].dataset.code}/I:${i.selectedOptions[0].dataset.code}/A:${a.selectedOptions[0].dataset.code}`;

      resBox.innerHTML = `
        <div>
          <div style="font-size: 12px; color: var(--text-dim); font-family: var(--font-tactical);">COMPUTED BASE SCORE</div>
          <div style="font-size: 32px; font-weight: bold; color: ${baseScore >= 7.0 ? 'var(--crimson-glow)' : 'var(--amber-glow)'};">
            ${baseScore.toFixed(1)} <span class="tag-pill ${sevClass}" style="font-size: 12px; vertical-align: middle;">${severity}</span>
          </div>
        </div>

        <div>
          <div style="font-size: 11px; color: var(--text-dim); font-family: var(--font-mono);">CVSS v3.1 VECTOR STRING</div>
          <code style="font-size: 12px; color: var(--cyan-glow); background: rgba(0,242,254,0.1); padding: 4px 8px; border-radius: 4px; display: inline-block; margin-top: 4px;">
            ${vector}
          </code>
        </div>
      `;
    }

    [av, ac, pr, ui, c, i, a].forEach(el => el.addEventListener('change', calculateCvss));
    calculateCvss();
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
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
