/*
 * CyberOps Defense Trainer V2 Upgrade
 * Additive module - does not replace existing curriculum/phases.
 */

const V2_KEY = 'cyberops_v2_state';

const state = JSON.parse(localStorage.getItem(V2_KEY) || JSON.stringify({
  labs: [],
  missions: [],
  revision: [],
  notes: [],
  xp: 0
}));

function save() {
  localStorage.setItem(V2_KEY, JSON.stringify(state));
}

const labs = [
  ['SOC Triage Lab','Investigate a suspicious authentication event and identify the attack path.','Log Analysis','Intermediate'],
  ['Phishing Investigation','Analyze a simulated phishing incident and determine the defensive response.','Email Security','Beginner'],
  ['Ransomware Response','Build an incident-response sequence for a ransomware outbreak.','Incident Response','Advanced'],
  ['Network Intrusion Hunt','Identify indicators of compromise from simulated network telemetry.','Threat Hunting','Advanced'],
  ['Privilege Escalation','Trace a simulated privilege escalation chain and select containment actions.','Endpoint Security','Intermediate'],
  ['Cloud Misconfiguration','Find exposed cloud resources and apply defensive controls.','Cloud Security','Intermediate']
];

const missions = [
  ['Operation Night Shield','SOC analyst','Contain a credential-theft campaign before lateral movement.'],
  ['Operation Iron Wall','Blue team','Detect and isolate a ransomware execution chain.'],
  ['Operation Zero Trace','Threat hunter','Find persistence mechanisms hidden in endpoint telemetry.'],
  ['Operation Dark Gateway','Network defense','Investigate unusual outbound traffic and identify the affected host.'],
  ['Operation Cloud Sentinel','Cloud defender','Secure an exposed cloud workload and prevent data access.'],
  ['Operation Phoenix','Incident commander','Coordinate detection, containment, eradication and recovery.']
];

const threats = [
  ['Critical','Ransomware','Encrypts business systems and may disrupt recovery infrastructure.','Isolate affected hosts, preserve evidence, verify offline backups.'],
  ['High','Credential Theft','Attackers may capture credentials through phishing, infostealers or session theft.','Enforce MFA, reset exposed credentials, review authentication logs.'],
  ['High','Web Exploitation','Internet-facing applications can be abused through vulnerable components or unsafe input handling.','Patch exposed services, inspect WAF/application logs and reduce attack surface.'],
  ['High','Supply Chain','Compromised dependencies or vendors can introduce malicious activity into trusted environments.','Inventory dependencies, verify integrity and monitor unusual package behavior.'],
  ['Medium','Cloud Exposure','Misconfigured storage, identities or network rules can expose sensitive resources.','Apply least privilege, encryption, logging and configuration monitoring.'],
  ['Medium','Insider Activity','Legitimate accounts can be abused for unauthorized access or data movement.','Use behavioral monitoring, least privilege and strong access reviews.'],
  ['High','Lateral Movement','Compromised credentials can allow attackers to move between systems.','Segment networks, restrict admin protocols and monitor unusual authentication.'],
  ['Critical','Data Exfiltration','Sensitive information can be transferred outside the organization after compromise.','Monitor egress traffic, DLP signals and unusual archive/transfer activity.']
];

const revision = [
  ['CIA Triad','Confidentiality, Integrity and Availability are the three foundational security objectives.'],
  ['Defense in Depth','Use multiple independent security controls so one failure does not expose the entire environment.'],
  ['Least Privilege','Give identities only the access required to perform their tasks.'],
  ['Zero Trust','Continuously verify users, devices and access requests rather than trusting network location.'],
  ['IOC','An Indicator of Compromise is observable evidence associated with potentially malicious activity.'],
  ['TTP','Tactics, Techniques and Procedures describe how adversaries achieve objectives.'],
  ['EDR','Endpoint Detection and Response provides endpoint telemetry, detection and response capabilities.'],
  ['SIEM','A SIEM aggregates and correlates security events to support detection and investigation.'],
  ['MITRE ATT&CK','A knowledge base describing adversary tactics and techniques used for threat-informed defense.'],
  ['Incident Response','A typical lifecycle includes preparation, detection/analysis, containment, eradication, recovery and lessons learned.'],
  ['Network Segmentation','Separating networks limits blast radius and restricts unauthorized movement.'],
  ['MFA','Multi-factor authentication requires more than one authentication factor and reduces credential-only compromise risk.'],
  ['Patch Management','Known vulnerabilities should be prioritized, tested and remediated according to organizational risk.'],
  ['Backup Strategy','Recovery copies should be protected from the same compromise affecting production systems.'],
  ['Threat Hunting','Threat hunting proactively searches telemetry for suspicious behavior that automated detection may miss.'],
  ['Log Integrity','Security logs should be protected against unauthorized alteration and retained according to operational requirements.'],
  ['Attack Surface','The attack surface consists of exposed assets, services, identities and pathways an attacker could abuse.'],
  ['Containment','Containment limits damage and prevents continued attacker activity while investigation proceeds.'],
  ['Forensics','Evidence should be preserved carefully so investigation findings remain trustworthy.'],
  ['Risk','Risk commonly considers likelihood and impact when prioritizing security decisions.']
];

const books = [
  ['Book 01','Cybersecurity Foundations'],
  ['Book 02','Network Defense'],
  ['Book 03','Endpoint Security'],
  ['Book 04','Identity & Access'],
  ['Book 05','Threat Intelligence'],
  ['Book 06','Security Operations'],
  ['Book 07','Incident Response'],
  ['Book 08','Cloud Security'],
  ['Book 09','Application Security'],
  ['Book 10','Digital Forensics']
];

function esc(x) {
  return String(x).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

function addCSS() {
  if (document.getElementById('cyberops-v2-css')) return;
  const style = document.createElement('style');
  style.id = 'cyberops-v2-css';
  style.textContent = `
    #cyberops-v2-launcher{
      position:fixed;right:22px;bottom:22px;z-index:99990;
      padding:13px 18px;border:1px solid #19d3ff;border-radius:10px;
      background:#07131d;color:#19d3ff;font-weight:800;cursor:pointer;
      box-shadow:0 0 24px rgba(25,211,255,.25)
    }
    #cyberops-v2{
      position:fixed;inset:0;z-index:99999;background:#050b10;color:#dceeff;
      font-family:Inter,Segoe UI,Arial,sans-serif;overflow:auto;
      display:none
    }
    .v2-wrap{max-width:1250px;margin:auto;padding:30px}
    .v2-head{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:25px}
    .v2-title{font-size:28px;font-weight:900;color:#19d3ff}
    .v2-sub{color:#7e9bad;margin-top:5px}
    .v2-close{background:#111d26;color:#fff;border:1px solid #34505f;padding:10px 16px;border-radius:8px;cursor:pointer}
    .v2-tabs{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:22px}
    .v2-tab{padding:10px 15px;background:#0b1720;color:#9db5c5;border:1px solid #1b3443;border-radius:8px;cursor:pointer}
    .v2-tab.active{color:#19d3ff;border-color:#19d3ff}
    .v2-panel{display:none}.v2-panel.active{display:block}
    .v2-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:15px}
    .v2-card{background:#0a141d;border:1px solid #1b3443;border-radius:12px;padding:18px}
    .v2-card h3{margin:0 0 8px;color:#eef8ff}.v2-card p{color:#9bb0bd;line-height:1.55}
    .v2-tag{display:inline-block;padding:4px 8px;border-radius:5px;background:#102735;color:#19d3ff;font-size:11px;margin:3px}
    .v2-btn{background:#0d2938;color:#19d3ff;border:1px solid #19d3ff;border-radius:7px;padding:8px 12px;cursor:pointer;margin-top:8px}
    .v2-stat{font-size:30px;font-weight:900;color:#19d3ff}
    .v2-search{width:100%;box-sizing:border-box;background:#08121a;color:white;border:1px solid #244555;padding:12px;border-radius:8px;margin-bottom:15px}
    .v2-row{display:flex;justify-content:space-between;gap:15px;align-items:center}
    .v2-critical{border-color:#ff4f67}.v2-high{border-color:#ff9f43}
    .v2-list{display:grid;gap:10px}
    .v2-q{background:#09151e;border:1px solid #203a49;border-radius:9px;padding:14px}
    .v2-answer{color:#8ee8a7;margin-top:7px}
    @media(max-width:700px){.v2-wrap{padding:15px}.v2-head{align-items:flex-start}.v2-title{font-size:21px}}
  `;
  document.head.appendChild(style);
}

function render() {
  let root = document.getElementById('cyberops-v2');
  if (!root) {
    root = document.createElement('div');
    root.id = 'cyberops-v2';
    document.body.appendChild(root);
  }

  root.innerHTML = `
    <div class="v2-wrap">
      <div class="v2-head">
        <div>
          <div class="v2-title">CYBEROPS DEFENSE TRAINER // V2</div>
          <div class="v2-sub">Advanced Cyber Defense Command Center</div>
        </div>
        <button class="v2-close" id="v2-close">EXIT V2</button>
      </div>

      <div class="v2-tabs">
        <button class="v2-tab active" data-tab="dashboard">Command Center</button>
        <button class="v2-tab" data-tab="labs">Defense Labs</button>
        <button class="v2-tab" data-tab="missions">Mission System</button>
        <button class="v2-tab" data-tab="threats">Threat Intel</button>
        <button class="v2-tab" data-tab="revision">Revision Deck+</button>
        <button class="v2-tab" data-tab="books">Knowledge Books+</button>
        <button class="v2-tab" data-tab="data">Data Protection</button>
      </div>

      <section class="v2-panel active" id="v2-dashboard">
        <div class="v2-grid">
          <div class="v2-card"><div class="v2-stat">${state.xp}</div><div>V2 XP</div></div>
          <div class="v2-card"><div class="v2-stat">${state.labs.length}</div><div>Labs Completed</div></div>
          <div class="v2-card"><div class="v2-stat">${state.missions.length}</div><div>Missions Completed</div></div>
          <div class="v2-card"><div class="v2-stat">${state.revision.length}</div><div>Saved Revision Points</div></div>
        </div>
        <br>
        <div class="v2-card">
          <h3>V2 Upgrade Active</h3>
          <p>Your original 3-phase curriculum remains intact. V2 adds a command layer for practical labs, missions, threat intelligence, mixed revision, expanded knowledge-book navigation and protected local progress.</p>
        </div>
      </section>

      <section class="v2-panel" id="v2-labs">
        <h2>Cyber Defense Labs</h2>
        <p class="v2-sub">Practical blue-team scenarios with completion tracking.</p>
        <div class="v2-grid">${labs.map((x,i)=>`
          <div class="v2-card">
            <span class="v2-tag">${esc(x[3])}</span>
            <span class="v2-tag">${esc(x[2])}</span>
            <h3>${esc(x[0])}</h3>
            <p>${esc(x[1])}</p>
            <button class="v2-btn" data-lab="${i}">${state.labs.includes(i)?'✓ COMPLETED':'START LAB'}</button>
          </div>`).join('')}</div>
      </section>

      <section class="v2-panel" id="v2-missions">
        <h2>CyberOps Mission System</h2>
        <p class="v2-sub">Scenario-based operational objectives.</p>
        <div class="v2-grid">${missions.map((x,i)=>`
          <div class="v2-card">
            <span class="v2-tag">${esc(x[1])}</span>
            <h3>${esc(x[0])}</h3>
            <p>${esc(x[2])}</p>
            <button class="v2-btn" data-mission="${i}">${state.missions.includes(i)?'✓ COMPLETED':'EXECUTE MISSION'}</button>
          </div>`).join('')}</div>
      </section>

      <section class="v2-panel" id="v2-threats">
        <h2>Live Threat Intelligence Board</h2>
        <input class="v2-search" id="v2-threat-search" placeholder="Filter threats, techniques, impacts...">
        <div class="v2-list" id="v2-threat-list"></div>
      </section>

      <section class="v2-panel" id="v2-revision">
        <h2>Revision Deck+</h2>
        <input class="v2-search" id="v2-revision-search" placeholder="Search all revision points...">
        <div class="v2-list" id="v2-revision-list"></div>
      </section>

      <section class="v2-panel" id="v2-books">
        <h2>Knowledge Books+ — 10 Book Tracks</h2>
        <p class="v2-sub">Each track is organized as a 10-chapter learning path.</p>
        <div class="v2-grid">${books.map((b,i)=>`
          <div class="v2-card">
            <span class="v2-tag">10 CHAPTERS</span>
            <h3>${esc(b[0])}</h3>
            <p>${esc(b[1])}</p>
            <div class="v2-list">${Array.from({length:10},(_,c)=>`
              <div class="v2-q"><b>Chapter ${c+1}</b> — ${esc(b[1])} ${['Foundations','Architecture','Core Concepts','Detection','Attack Paths','Defense','Monitoring','Case Study','Practical Review','Final Assessment'][c]}</div>
            `).join('')}</div>
          </div>`).join('')}</div>
      </section>

      <section class="v2-panel" id="v2-data">
        <h2>Progress & Data Protection</h2>
        <div class="v2-card">
          <h3>Local V2 Backup</h3>
          <p>Export your V2 progress before major changes or moving machines.</p>
          <button class="v2-btn" id="v2-export">EXPORT BACKUP</button>
          <button class="v2-btn" id="v2-reset">RESET V2 DATA</button>
          <input type="file" id="v2-import" accept=".json" style="display:none">
          <button class="v2-btn" id="v2-import-btn">RESTORE BACKUP</button>
        </div>
      </section>
    </div>`;

  bind();
  renderThreats();
  renderRevision();
}

function renderThreats(filter='') {
  const box=document.getElementById('v2-threat-list');
  if(!box)return;
  const f=filter.toLowerCase();
  box.innerHTML=threats.filter(x=>x.join(' ').toLowerCase().includes(f)).map(x=>`
    <div class="v2-card v2-${x[0].toLowerCase()}">
      <div class="v2-row"><h3>${esc(x[1])}</h3><span class="v2-tag">${esc(x[0])}</span></div>
      <p><b>Summary:</b> ${esc(x[2])}</p>
      <p><b>Defensive action:</b> ${esc(x[3])}</p>
    </div>`).join('');
}

function renderRevision(filter='') {
  const box=document.getElementById('v2-revision-list');
  if(!box)return;
  const f=filter.toLowerCase();
  box.innerHTML=revision.filter(x=>x.join(' ').toLowerCase().includes(f)).map((x,i)=>`
    <div class="v2-q">
      <div class="v2-row"><b>Q: What is ${esc(x[0])}?</b>
      <button class="v2-btn" data-revision="${i}">${state.revision.includes(i)?'★ SAVED':'☆ SAVE'}</button></div>
      <div class="v2-answer">A: ${esc(x[1])}</div>
    </div>`).join('');
}

function bind() {
  document.getElementById('v2-close').onclick=()=>document.getElementById('cyberops-v2').style.display='none';

  document.querySelectorAll('.v2-tab').forEach(btn=>{
    btn.onclick=()=>{
      document.querySelectorAll('.v2-tab').forEach(x=>x.classList.remove('active'));
      document.querySelectorAll('.v2-panel').forEach(x=>x.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('v2-'+btn.dataset.tab).classList.add('active');
    };
  });

  document.querySelectorAll('[data-lab]').forEach(btn=>btn.onclick=()=>{
    const i=Number(btn.dataset.lab);
    if(!state.labs.includes(i)){state.labs.push(i);state.xp+=100;save();}
    render();
    document.getElementById('cyberops-v2').style.display='block';
    document.querySelector('[data-tab="labs"]').click();
  });

  document.querySelectorAll('[data-mission]').forEach(btn=>btn.onclick=()=>{
    const i=Number(btn.dataset.mission);
    if(!state.missions.includes(i)){state.missions.push(i);state.xp+=150;save();}
    render();
    document.getElementById('cyberops-v2').style.display='block';
    document.querySelector('[data-tab="missions"]').click();
  });

  document.querySelectorAll('[data-revision]').forEach(btn=>btn.onclick=()=>{
    const i=Number(btn.dataset.revision);
    if(state.revision.includes(i)) state.revision=state.revision.filter(x=>x!==i);
    else state.revision.push(i);
    save(); renderRevision(document.getElementById('v2-revision-search')?.value||'');
  });

  document.getElementById('v2-threat-search')?.addEventListener('input',e=>renderThreats(e.target.value));
  document.getElementById('v2-revision-search')?.addEventListener('input',e=>renderRevision(e.target.value));

  document.getElementById('v2-export').onclick=()=>{
    const blob=new Blob([JSON.stringify({version:'2.0',exportedAt:new Date().toISOString(),state},null,2)],{type:'application/json'});
    const a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download='cyberops-v2-backup.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  document.getElementById('v2-import-btn').onclick=()=>document.getElementById('v2-import').click();
  document.getElementById('v2-import').onchange=e=>{
    const file=e.target.files[0]; if(!file)return;
    const r=new FileReader();
    r.onload=()=>{
      try{
        const data=JSON.parse(r.result);
        if(data.state){
          localStorage.setItem(V2_KEY,JSON.stringify(data.state));
          location.reload();
        }
      }catch(err){alert('Invalid CyberOps V2 backup file.');}
    };
    r.readAsText(file);
  };

  document.getElementById('v2-reset').onclick=()=>{
    if(confirm('Reset only CyberOps V2 data? Existing original application data will not be touched.')){
      localStorage.removeItem(V2_KEY); location.reload();
    }
  };
}

function start() {
  addCSS();
  const launcher=document.createElement('button');
  launcher.id='cyberops-v2-launcher';
  launcher.textContent='⚡ CYBEROPS V2';
  launcher.onclick=()=>{
    render();
    document.getElementById('cyberops-v2').style.display='block';
  };
  document.body.appendChild(launcher);
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start);
else start();


setTimeout(()=>{ const v=document.getElementById('cyberops-v2'); if(v){v.style.display='block';}},500);
