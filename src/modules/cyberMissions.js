import { DefenseStorage } from '../utils/storage.js';
import { cyberAudio } from './audio.js';

export const MISSIONS_DATA = [
  {
    id: 'op-night-shield',
    code: 'OP-NIGHT-SHIELD',
    title: 'Operation Night Shield: Credential Theft & Lateral Movement Containment',
    role: 'Tier-2 SOC Defense Analyst',
    adversary: 'APT29 / Nobelium Emulation',
    difficulty: 'Intermediate',
    xpReward: 250,
    summary: 'A spear-phishing attack successfully compromised a tactical logistics officer workstation. Telemetry indicates Mimikatz memory scraping, Kerberoasting requests, and initial SMB lateral movement probes toward the core database server.',
    phases: [
      {
        phaseTitle: 'Phase 1: Initial Infiltration & LSASS Alert',
        injectText: 'At 02:14:30 UTC, your EDR console triggers a SEVERITY 1 alert on host LOGISTICS-WS04: "Suspicious access to lsass.exe process memory from rundll32.exe". Simultaneously, multiple Event ID 4769 (Kerberos Service Ticket Requests with RC4 encryption) flood the domain controller log.',
        question: 'What is your immediate tactical containment action?',
        options: [
          {
            text: 'A. Issue an immediate network isolation command to host LOGISTICS-WS04 via EDR, preserve memory, and revoke active Kerberos TGTs.',
            correct: true,
            feedback: 'Flawless execution! Isolating the endpoint severs the adversary’s C2 channel without powering off the host, preserving volatile RAM for forensic extraction.'
          },
          {
            text: 'B. Reboot the workstation immediately to wipe memory and disconnect the power cord.',
            correct: false,
            feedback: 'CRITICAL ERROR: Powering off destroys volatile RAM containing plaintext passwords, active network sockets, and adversary encryption keys.'
          },
          {
            text: 'C. Wait 30 minutes to collect more network packets and observe which servers the attacker targets next.',
            correct: false,
            feedback: 'FAILED: In active credential compromise, delay allows the adversary to achieve domain dominance via Golden Ticket forgery.'
          }
        ]
      },
      {
        phaseTitle: 'Phase 2: Lateral Movement Interception',
        injectText: 'Network telemetry reveals host LOGISTICS-WS04 attempted to connect to \\\\DB-CORE-01\\C$ over TCP port 445 using cached administrator credentials.',
        question: 'Which defensive control effectively terminates this lateral movement pathway across the enterprise?',
        options: [
          {
            text: 'A. Restrict administrative inbound SMB (port 445) across internal workstation-to-workstation segments and enforce Tiered Administration.',
            correct: true,
            feedback: 'Superior defense engineering! Blocking lateral SMB and enforcing Tier 0/Tier 1/Tier 2 separation neutralizes Pass-the-Hash completely.'
          },
          {
            text: 'B. Disable Windows Firewall on DB-CORE-01 to debug why connections are failing.',
            correct: false,
            feedback: 'DISASTROUS ERROR: Disabling firewalls grants the adversary unrestricted access.'
          },
          {
            text: 'C. Change the computer name of DB-CORE-01 so the attacker cannot find it.',
            correct: false,
            feedback: 'INEFFECTIVE: Adversaries query Active Directory LDAP directly to discover all hosts and IP addresses regardless of hostname.'
          }
        ]
      },
      {
        phaseTitle: 'Phase 3: Domain Recovery & Persistence Removal',
        injectText: 'The compromised host is isolated. You must ensure the adversary cannot return using forged Kerberos tickets.',
        question: 'What standard recovery procedure is required to invalidate any potential Golden Tickets created during the breach?',
        options: [
          {
            text: 'A. Reset the Active Directory KRBTGT account password TWICE, with a 24-hour interval or after replication completes.',
            correct: true,
            feedback: 'Mastery verified! A single KRBTGT password reset preserves the previous password history; resetting twice immediately invalidates all forged tickets.'
          },
          {
            text: 'B. Run a standard antivirus quick scan on the Domain Controller.',
            correct: false,
            feedback: 'INADEQUATE: Antivirus scans cannot detect or revoke cryptographically signed Golden Tickets.'
          },
          {
            text: 'C. Reinstall Windows on the primary router.',
            correct: false,
            feedback: 'IRRELEVANT: The breach occurred at the Active Directory identity plane, not the edge router firmware.'
          }
        ]
      }
    ]
  },

  {
    id: 'op-iron-wall',
    code: 'OP-IRON-WALL',
    title: 'Operation Iron Wall: Rapid Ransomware Worm Outbreak Containment',
    role: 'Blue Team Lead / Incident Commander',
    adversary: 'LockBit 3.0 / BlackCat Emulation',
    difficulty: 'Advanced',
    xpReward: 300,
    summary: 'An automated ransomware payload utilizing EternalBlue (MS17-010) and PsExec has breached a third-party contractor gateway. 14 servers in Subnet 10.20.0.0/24 are encrypting at 500 files/sec.',
    phases: [
      {
        phaseTitle: 'Phase 1: Outbreak Triage & Gateway Quarantine',
        injectText: 'Automated alerts show simultaneous mass file renames with extension ".lock3" on 14 file servers. The worm is spreading via unpatched SMBv1.',
        question: 'What is your primary command decision in the first 90 seconds?',
        options: [
          {
            text: 'A. Sever core switch inter-VLAN routing for Subnet 10.20.0.0/24 and push group policy to disable SMBv1 globally.',
            correct: true,
            feedback: 'DECISIVE CONTAINMENT! Hard VLAN severance halts worm propagation to the rest of the operational network instantly.'
          },
          {
            text: 'B. Email all employees asking them to backup their files to USB thumb drives.',
            correct: false,
            feedback: 'DISASTER: Employees plugging in USB drives will spread the self-propagating worm to removable storage.'
          },
          {
            text: 'C. Pay the cryptocurrency extortion fee immediately before confirming backup status.',
            correct: false,
            feedback: 'VIOLATION OF DEFENSE DOCTRINE: Paying ransoms funds adversary operations and provides zero guarantee of decryption keys.'
          }
        ]
      },
      {
        phaseTitle: 'Phase 2: Protecting Immutable Recovery Infrastructure',
        injectText: 'Adversary scripts on the compromised contractor gateway are attempting to connect to the secondary backup repository.',
        question: 'Which architecture ensures backups cannot be encrypted or destroyed during an active cyber attack?',
        options: [
          {
            text: 'A. Air-gapped Write-Once-Read-Many (WORM) storage with immutable snapshot retention and out-of-band management credentials.',
            correct: true,
            feedback: 'EXCELLENT! Immutable WORM storage prevents unauthorized deletion or overwriting even if the adversary holds domain admin rights.'
          },
          {
            text: 'B. Storing backups on a shared Windows folder accessible by "Everyone" with write permissions.',
            correct: false,
            feedback: 'CATASTROPHIC: Ransomware actively hunts for network shares and encrypts them first.'
          },
          {
            text: 'C. Synchronizing files to an unversioned cloud drive in real-time.',
            correct: false,
            feedback: 'INEFFECTIVE: Real-time synchronization will immediately sync the encrypted corrupted files to the cloud.'
          }
        ]
      }
    ]
  },

  {
    id: 'op-zero-trace',
    code: 'OP-ZERO-TRACE',
    title: 'Operation Zero Trace: Nation-State Fileless Persistence Hunt',
    role: 'Lead Threat Hunter',
    adversary: 'Turla / Sandworm Emulation',
    difficulty: 'Advanced',
    xpReward: 280,
    summary: 'A sophisticated nation-state actor has maintained covert presence inside naval weapons testing networks for 90 days without writing a single executable binary to disk. You must locate their stealth persistence.',
    phases: [
      {
        phaseTitle: 'Phase 1: Auditing WMI & Scheduled Task Telemetry',
        injectText: 'Standard EDR scans show zero malicious files in C:\\Windows\\ or AppData. However, Sysmon logs indicate PowerShell executions spawned by WmiPrvSE.exe at 03:00 UTC daily.',
        question: 'Where should you hunt to detect this fileless persistence mechanism?',
        options: [
          {
            text: 'A. Query WMI Event Filters, Event Consumers, and FilterToConsumerBindings for encoded PowerShell payloads.',
            correct: true,
            feedback: 'OUTSTANDING HUNTING TRADE-CRAFT! Adversaries abuse WMI subscriptions to trigger malicious code on system events without touching disk.'
          },
          {
            text: 'B. Check the Recycle Bin on the desktop.',
            correct: false,
            feedback: 'HUNT FAILED: Advanced adversaries do not hide persistence mechanisms in the desktop recycle bin.'
          },
          {
            text: 'C. Delete the entire System32 directory.',
            correct: false,
            feedback: 'CRITICAL SYSTEM DAMAGE: Deleting System32 crashes the entire operating system permanently.'
          }
        ]
      },
      {
        phaseTitle: 'Phase 2: Registry RunKey & Hidden Service Inspection',
        injectText: 'Hunting reveals an obfuscated registry entry under HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run containing base64 gzip data decoded directly into memory via VirtualAlloc.',
        question: 'What is the safest tactical method to eradicate this persistence mechanism?',
        options: [
          {
            text: 'A. Export and cryptographically hash the registry key for evidence, terminate associated in-memory thread, and delete the registry value.',
            correct: true,
            feedback: 'PERFECT FORENSIC HYGIENE! Evidence is preserved, active memory execution is killed, and persistent autorun is expunged.'
          },
          {
            text: 'B. Ignore the registry entry because it does not have an .exe extension.',
            correct: false,
            feedback: 'FATAL ERROR: Fileless registry storage allows scripts to execute via LOLBins without an on-disk binary.'
          }
        ]
      }
    ]
  }
];

export function renderCyberMissions(container) {
  let selectedMissionId = null;
  let currentMissionPhase = 0;
  let missionScore = 0;
  let missionComplete = false;

  function render() {
    if (selectedMissionId) {
      renderMissionRoom();
    } else {
      renderMissionBriefings();
    }
  }

  function renderMissionBriefings() {
    container.innerHTML = `
      <div class="missions-viewport" style="max-width: 1040px; margin: 0 auto;">
        <!-- Header -->
        <div class="curriculum-header" style="margin-bottom: 24px;">
          <div class="curriculum-title">
            <span class="tag-pill" style="border-color: var(--crimson-glow); color: var(--crimson-glow); margin-bottom: 6px; display: inline-block;">
              TACTICAL FIELD CAMPAIGNS // CYBER WARFARE
            </span>
            <h2>Cyber Warfare Operations & Adversary Battle Simulator</h2>
            <p>High-stress command simulations modeling real nation-state cyber siege scenarios. Make critical decisions, eliminate threats, and earn military distinction awards.</p>
          </div>
        </div>

        <!-- Operations Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px;">
          ${MISSIONS_DATA.map(m => `
            <div class="card-tactical mission-card" data-id="${m.id}" style="cursor: pointer; display: flex; flex-direction: column; justify-content: space-between; border-top: 3px solid var(--crimson-glow);">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                  <span style="font-size: 11px; font-family: var(--font-mono); color: var(--crimson-glow); font-weight: 700; letter-spacing: 0.1em;">
                    ${m.code}
                  </span>
                  <span class="tag-pill news-badge-critical" style="font-size: 10px;">
                    ${m.difficulty}
                  </span>
                </div>

                <div style="font-size: 11px; font-family: var(--font-tactical); color: var(--cyan-glow); text-transform: uppercase; margin-bottom: 4px;">
                  ASSIGNMENT: ${m.role}
                </div>

                <h3 style="font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 10px; line-height: 1.3;">
                  ${m.title}
                </h3>

                <div style="font-size: 12px; color: var(--text-dim); font-family: var(--font-mono); margin-bottom: 12px;">
                  THREAT: ${m.adversary}
                </div>

                <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px;">
                  ${m.summary}
                </p>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 12px; margin-top: auto;">
                <span style="font-size: 12px; color: var(--emerald-glow); font-family: var(--font-mono);">
                  ⚡ +${m.xpReward} XP
                </span>
                <button class="btn btn-outline btn-sm btn-deploy-op" data-id="${m.id}">
                  Deploy Officer →
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    container.querySelectorAll('.mission-card').forEach(card => {
      card.addEventListener('click', () => {
        cyberAudio.playClick();
        selectedMissionId = card.getAttribute('data-id');
        currentMissionPhase = 0;
        missionScore = 0;
        missionComplete = false;
        render();
      });
    });
  }

  function renderMissionRoom() {
    const mission = MISSIONS_DATA.find(m => m.id === selectedMissionId) || MISSIONS_DATA[0];
    const phase = mission.phases[currentMissionPhase];

    container.innerHTML = `
      <div class="mission-room-viewport" style="max-width: 900px; margin: 0 auto;">
        <!-- Top Status Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface); border: 1px solid var(--border-subtle); padding: 12px 20px; border-radius: var(--radius-md); margin-bottom: 20px;">
          <button class="btn btn-outline btn-sm" id="btn-abort-mission">
            ← Abort Operation
          </button>

          <div style="display: flex; align-items: center; gap: 16px; font-family: var(--font-mono); font-size: 12px;">
            <span style="color: var(--crimson-glow);">${mission.code} ACTIVE</span>
            <span style="color: var(--cyan-glow);">PHASE ${currentMissionPhase + 1} OF ${mission.phases.length}</span>
            <span style="color: var(--emerald-glow);">SCORE: ${missionScore} PTS</span>
          </div>
        </div>

        <!-- Mission Header -->
        <div style="margin-bottom: 20px;">
          <div style="font-size: 12px; font-family: var(--font-tactical); color: var(--crimson-glow); letter-spacing: 0.1em; text-transform: uppercase;">
            ACTIVE INCIDENT // ${mission.adversary}
          </div>
          <h2 style="font-size: 24px; color: var(--text-bright); margin-top: 4px;">
            ${mission.title}
          </h2>
          <div style="font-size: 13px; color: var(--text-dim); margin-top: 4px; font-family: var(--font-mono);">
            Stationed as: <strong style="color: #fff;">${mission.role}</strong>
          </div>
        </div>

        ${!missionComplete ? `
          <!-- Phase Scenario Card -->
          <div class="card-tactical" style="margin-bottom: 20px; border-left: 3px solid var(--amber-glow);">
            <div style="font-family: var(--font-mono); font-size: 12px; color: var(--amber-glow); margin-bottom: 6px;">
              [ALERT INJECT // TACTICAL INCIDENT TIMELINE]
            </div>
            <h3 style="font-size: 18px; color: #fff; margin-bottom: 12px;">
              ${phase.phaseTitle}
            </h3>
            <p style="font-size: 14px; color: var(--text-primary); line-height: 1.6; margin-bottom: 16px;">
              ${phase.injectText}
            </p>
          </div>

          <!-- Command Decision Options -->
          <div class="card-tactical" style="margin-bottom: 24px;">
            <h4 style="font-size: 15px; color: var(--cyan-glow); margin-bottom: 16px;">
              ${phase.question}
            </h4>

            <div style="display: flex; flex-direction: column; gap: 12px;" id="mission-options-wrap">
              ${phase.options.map((opt, idx) => `
                <button class="btn-tactical-option" data-idx="${idx}" style="text-align: left; padding: 14px 18px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff; font-size: 13px; line-height: 1.5; cursor: pointer; transition: all 0.2s ease;">
                  ${opt.text}
                </button>
              `).join('')}
            </div>

            <!-- Decision Result Banner -->
            <div id="decision-feedback-box" style="margin-top: 16px; display: none;"></div>
          </div>
        ` : `
          <!-- Mission Debriefing Card -->
          <div class="card-tactical" style="text-align: center; padding: 36px 20px; border: 1px solid var(--emerald-glow);">
            <div style="font-size: 48px; margin-bottom: 12px;">🎖️</div>
            <h2 style="font-size: 26px; color: var(--emerald-glow); margin-bottom: 8px;">
              OPERATION DEBRIEFING COMPLETE
            </h2>
            <div style="font-size: 14px; color: var(--text-dim); font-family: var(--font-mono); margin-bottom: 20px;">
              MISSION OUTCOME: ADVERSARY EXPELLED & HOSTS SECURED
            </div>

            <div style="display: flex; justify-content: center; gap: 24px; margin-bottom: 24px;">
              <div style="background: rgba(0,0,0,0.4); padding: 12px 20px; border-radius: 8px; border: 1px solid var(--border-subtle);">
                <div style="font-size: 12px; color: var(--text-dim);">TACTICAL SCORE</div>
                <div style="font-size: 24px; font-weight: bold; color: var(--cyan-glow);">${missionScore} PTS</div>
              </div>
              <div style="background: rgba(0,0,0,0.4); padding: 12px 20px; border-radius: 8px; border: 1px solid var(--border-subtle);">
                <div style="font-size: 12px; color: var(--text-dim);">XP ACCREDITED</div>
                <div style="font-size: 24px; font-weight: bold; color: var(--emerald-glow);">+${mission.xpReward} XP</div>
              </div>
            </div>

            <button class="btn btn-cyan" id="btn-finish-op">
              Return to Operations Command
            </button>
          </div>
        `}
      </div>
    `;

    // Abort listener
    container.querySelector('#btn-abort-mission')?.addEventListener('click', () => {
      cyberAudio.playClick();
      selectedMissionId = null;
      render();
    });

    // Options listeners
    if (!missionComplete) {
      const optionButtons = container.querySelectorAll('.btn-tactical-option');
      const feedbackBox = container.querySelector('#decision-feedback-box');

      optionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-idx'), 10);
          const selectedOpt = phase.options[idx];

          optionButtons.forEach(b => b.disabled = true);

          if (selectedOpt.correct) {
            missionScore += 100;
            cyberAudio.playSuccess();
            btn.style.borderColor = 'var(--emerald-glow)';
            btn.style.background = 'rgba(16, 185, 129, 0.15)';
            feedbackBox.style.display = 'block';
            feedbackBox.innerHTML = `
              <div style="padding: 14px; background: rgba(16, 185, 129, 0.1); border: 1px solid var(--emerald-glow); border-radius: var(--radius-sm); color: #fff;">
                <strong style="color: var(--emerald-glow);">✓ COMMAND DECISION APPROVED (+100 PTS):</strong><br>
                ${selectedOpt.feedback}
                <div style="margin-top: 14px;">
                  <button class="btn btn-cyan btn-sm" id="btn-next-phase">
                    ${currentMissionPhase + 1 < mission.phases.length ? 'Proceed to Next Tactical Phase →' : 'Conclude Operation & File Report →'}
                  </button>
                </div>
              </div>
            `;
          } else {
            cyberAudio.playWarning();
            btn.style.borderColor = 'var(--crimson-glow)';
            btn.style.background = 'rgba(239, 68, 68, 0.15)';
            feedbackBox.style.display = 'block';
            feedbackBox.innerHTML = `
              <div style="padding: 14px; background: rgba(239, 68, 68, 0.1); border: 1px solid var(--crimson-glow); border-radius: var(--radius-sm); color: #fff;">
                <strong style="color: var(--crimson-glow);">✗ TACTICAL ERROR LOGGED:</strong><br>
                ${selectedOpt.feedback}
                <div style="margin-top: 14px;">
                  <button class="btn btn-outline btn-sm" id="btn-retry-phase">
                    Re-evaluate Situation
                  </button>
                </div>
              </div>
            `;

            container.querySelector('#btn-retry-phase')?.addEventListener('click', () => {
              cyberAudio.playClick();
              render();
            });
            return;
          }

          container.querySelector('#btn-next-phase')?.addEventListener('click', () => {
            cyberAudio.playClick();
            if (currentMissionPhase + 1 < mission.phases.length) {
              currentMissionPhase++;
            } else {
              missionComplete = true;
              DefenseStorage.addXp(mission.xpReward);
            }
            render();
          });
        });
      });
    }

    container.querySelector('#btn-finish-op')?.addEventListener('click', () => {
      cyberAudio.playClick();
      selectedMissionId = null;
      render();
    });
  }

  render();
}
