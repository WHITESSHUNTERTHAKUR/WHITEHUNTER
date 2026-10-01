import {
  curriculumV2,
  booksV2,
  revisionV2,
  threatsV2,
  labsV2,
  missionsV2,
  v2Stats
} from "../../data/v2/v2Data.js";

import "../../styles/v2/simple.css";

const STATE_KEY = "cyberops_defense_trainer_v2_state";

const defaultState = {
  xp: 0,
  completedTopics: [],
  completedLabs: [],
  completedMissions: [],
  revisionDone: [],
  quizScores: {},
  notes: "",
  created: new Date().toISOString()
};

function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return {...defaultState};
    return {...defaultState, ...JSON.parse(raw)};
  } catch {
    return {...defaultState};
  }
}

let state = loadState();

function saveState() {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch {}
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;");
}

function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

function addXP(amount) {
  state.xp += amount;
  saveState();
}

function completeTopic(id) {
  if (!state.completedTopics.includes(id)) {
    state.completedTopics.push(id);
    addXP(25);
  }
  saveState();
}

function completeLab(id) {
  if (!state.completedLabs.includes(id)) {
    state.completedLabs.push(id);
    addXP(40);
  }
  saveState();
}

function completeMission(id) {
  if (!state.completedMissions.includes(id)) {
    state.completedMissions.push(id);
    const mission = missionsV2.find(x => x.id === id);
    addXP(mission?.reward || 50);
  }
  saveState();
}

function progressPercent() {
  return Math.round(
    (state.completedTopics.length / curriculumV2.length) * 100
  );
}

function layout(root) {
  root.innerHTML = `
    <div class="v2-header">
      <div class="v2-header-inner">
        <div class="v2-brand">
          CyberOps Defense Trainer
          <small>Cybersecurity learning and practice</small>
        </div>

        <div class="v2-nav">
          <button data-page="home">Home</button>
          <button data-page="learn">Learn</button>
          <button data-page="revision">Revision</button>
          <button data-page="books">Books</button>
          <button data-page="threats">Threats</button>
          <button data-page="labs">Labs</button>
          <button data-page="missions">Missions</button>
          <button data-page="progress">Progress</button>
        </div>
      </div>
    </div>

    <main class="v2-main">
      <div id="v2-page"></div>
    </main>
  `;

  root.querySelectorAll("[data-page]").forEach(btn => {
    btn.addEventListener("click", () => {
      showPage(btn.dataset.page);
    });
  });
}

function setActive(page) {
  document.querySelectorAll("#cyberops-v2-app [data-page]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.page === page);
  });
}

function showPage(page) {
  setActive(page);

  const container = document.querySelector("#v2-page");
  if (!container) return;

  if (page === "home") renderHome(container);
  if (page === "learn") renderLearn(container);
  if (page === "revision") renderRevision(container);
  if (page === "books") renderBooks(container);
  if (page === "threats") renderThreats(container);
  if (page === "labs") renderLabs(container);
  if (page === "missions") renderMissions(container);
  if (page === "progress") renderProgress(container);
}

function renderHome(container) {
  const pct = progressPercent();

  container.innerHTML = `
    <h1 class="v2-page-title">Welcome to CyberOps Defense Trainer</h1>
    <p class="v2-page-subtitle">
      Learn cybersecurity step by step, practice defensive skills and test your knowledge.
    </p>

    <div class="v2-grid">
      <div class="v2-card">
        <div class="v2-muted">Topics</div>
        <div class="v2-stat">${v2Stats.topics}</div>
        <p class="v2-muted">Three learning phases for every topic.</p>
      </div>

      <div class="v2-card">
        <div class="v2-muted">Book chapters</div>
        <div class="v2-stat">${v2Stats.chapters}</div>
        <p class="v2-muted">Ten chapters in each knowledge book.</p>
      </div>

      <div class="v2-card">
        <div class="v2-muted">Revision questions</div>
        <div class="v2-stat">${v2Stats.revisionQuestions}</div>
        <p class="v2-muted">Questions collected from the learning material.</p>
      </div>

      <div class="v2-card">
        <div class="v2-muted">XP</div>
        <div class="v2-stat">${state.xp}</div>
        <p class="v2-muted">Earned from completed learning activities.</p>
      </div>
    </div>

    <div class="v2-section">
      <div class="v2-card">
        <h3>Your learning progress</h3>
        <div class="v2-progress"><div style="width:${pct}%"></div></div>
        <p>${pct}% of topics completed</p>
        <button class="v2-button primary" id="start-learning">
          Continue learning
        </button>
      </div>
    </div>

    <div class="v2-section">
      <h2>Main areas</h2>

      <div class="v2-grid-wide">
        ${[
          ["Learn","Study all topics using the three-phase system.","learn"],
          ["Revision","Review important questions from all subjects.","revision"],
          ["Books","Read detailed cybersecurity chapters.","books"],
          ["Threats","Review defensive threat information.","threats"],
          ["Labs","Practice security investigation tasks.","labs"],
          ["Missions","Complete guided defensive activities.","missions"]
        ].map(x => `
          <div class="v2-card">
            <h3>${x[0]}</h3>
            <p class="v2-muted">${x[1]}</p>
            <button class="v2-button" data-home-page="${x[2]}">Open</button>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  container.querySelector("#start-learning")?.addEventListener("click", () => showPage("learn"));

  container.querySelectorAll("[data-home-page]").forEach(btn => {
    btn.addEventListener("click", () => showPage(btn.dataset.homePage));
  });
}

function renderLearn(container) {
  container.innerHTML = `
    <h1 class="v2-page-title">Learn</h1>
    <p class="v2-page-subtitle">
      Every topic has three phases: Theory, Q&A and Quiz.
    </p>

    <input
      id="topic-search"
      class="v2-search"
      placeholder="Search topics..."
    />

    <div class="v2-section">
      <div id="topic-list" class="v2-list"></div>
    </div>
  `;

  const list = container.querySelector("#topic-list");
  const search = container.querySelector("#topic-search");

  function draw() {
    const term = search.value.toLowerCase();

    const items = curriculumV2.filter(t =>
      t.name.toLowerCase().includes(term) ||
      t.description.toLowerCase().includes(term)
    );

    list.innerHTML = items.map(topic => {
      const done = state.completedTopics.includes(topic.id);

      return `
        <div class="v2-list-item">
          <div class="v2-row" style="justify-content:space-between">
            <div>
              <h3>${esc(topic.name)}</h3>
              <p class="v2-muted">${esc(topic.description)}</p>
            </div>
            <span class="v2-badge">${done ? "Completed" : "Not started"}</span>
          </div>

          <div class="v2-row" style="margin-top:10px">
            <button class="v2-button primary" data-topic="${topic.id}">
              Open topic
            </button>
          </div>
        </div>
      `;
    }).join("") || `<div class="v2-empty">No topics found.</div>`;

    list.querySelectorAll("[data-topic]").forEach(btn => {
      btn.addEventListener("click", () => {
        const topic = curriculumV2.find(x => x.id === Number(btn.dataset.topic));
        if (topic) openTopic(topic);
      });
    });
  }

  search.addEventListener("input", draw);
  draw();
}

function openTopic(topic) {
  const container = document.querySelector("#v2-page");

  let phase = 1;
  let quizIndex = 0;
  let score = 0;

  function draw() {
    container.innerHTML = `
      <div class="v2-row" style="justify-content:space-between">
        <div>
          <h1 class="v2-page-title">${esc(topic.name)}</h1>
          <p class="v2-page-subtitle">${esc(topic.description)}</p>
        </div>

        <button class="v2-button" id="back-learn">Back to topics</button>
      </div>

      <div class="v2-tabs">
        <button data-phase="1">Phase 1: Theory</button>
        <button data-phase="2">Phase 2: Q&A</button>
        <button data-phase="3">Phase 3: Quiz</button>
      </div>

      <div id="phase-content"></div>
    `;

    container.querySelector("#back-learn").onclick = () => showPage("learn");

    container.querySelectorAll("[data-phase]").forEach(btn => {
      btn.classList.toggle("active", Number(btn.dataset.phase) === phase);
      btn.onclick = () => {
        phase = Number(btn.dataset.phase);
        quizIndex = 0;
        score = 0;
        draw();
      };
    });

    const content = container.querySelector("#phase-content");

    if (phase === 1) renderPhase1(content);
    if (phase === 2) renderPhase2(content);
    if (phase === 3) renderPhase3(content);
  }

  function renderPhase1(content) {
    content.innerHTML = topic.phase1.map((lesson, i) => `
      <div class="v2-card" style="margin-bottom:12px">
        <h3>${i + 1}. ${esc(lesson.title)}</h3>
        <p>${esc(lesson.content)}</p>
        <p><strong>Example:</strong> ${esc(lesson.example)}</p>
        <p><strong>Defense:</strong> ${esc(lesson.defense)}</p>

        <p><strong>Key points</strong></p>
        <ul>
          ${lesson.takeaways.map(x => `<li>${esc(x)}</li>`).join("")}
        </ul>
      </div>
    `).join("") + `
      <button class="v2-button primary" id="finish-theory">
        Mark theory complete
      </button>
    `;

    content.querySelector("#finish-theory").onclick = () => {
      completeTopic(topic.id);
      alert("Theory completed. +25 XP");
      draw();
    };
  }

  function renderPhase2(content) {
    content.innerHTML = `
      <div class="v2-list">
        ${topic.phase2.map((item, i) => `
          <div class="v2-card">
            <h3>${i + 1}. ${esc(item.question)}</h3>
            <button class="v2-button" data-answer="${i}">
              Show answer
            </button>
            <div id="answer-${i}" class="v2-answer" style="display:none">
              ${esc(item.answer)}
            </div>
          </div>
        `).join("")}
      </div>
    `;

    content.querySelectorAll("[data-answer]").forEach(btn => {
      btn.onclick = () => {
        const box = content.querySelector(`#answer-${btn.dataset.answer}`);
        box.style.display = box.style.display === "none" ? "block" : "none";
      };
    });
  }

  function renderPhase3(content) {
    if (quizIndex >= topic.phase3.length) {
      const percent = Math.round((score / topic.phase3.length) * 100);

      content.innerHTML = `
        <div class="v2-card">
          <h2>Quiz complete</h2>
          <div class="v2-stat">${score}/${topic.phase3.length}</div>
          <p>You scored ${percent}%.</p>
          <button class="v2-button primary" id="finish-quiz">
            Finish topic
          </button>
        </div>
      `;

      content.querySelector("#finish-quiz").onclick = () => {
        completeTopic(topic.id);
        state.quizScores[topic.id] = percent;
        saveState();
        alert("Topic completed.");
        showPage("learn");
      };

      return;
    }

    const q = topic.phase3[quizIndex];

    content.innerHTML = `
      <div class="v2-card">
        <p class="v2-muted">
          Question ${quizIndex + 1} of ${topic.phase3.length}
        </p>

        <h2>${esc(q.question)}</h2>

        <div>
          ${q.options.map((option, i) => `
            <button class="v2-option" data-option="${i}">
              ${esc(option)}
            </button>
          `).join("")}
        </div>

        <div id="quiz-result"></div>
      </div>
    `;

    content.querySelectorAll("[data-option]").forEach(btn => {
      btn.onclick = () => {
        const selected = Number(btn.dataset.option);
        const result = content.querySelector("#quiz-result");

        content.querySelectorAll("[data-option]").forEach(x => x.disabled = true);

        if (selected === q.answer) {
          score++;
          result.innerHTML = `
            <div class="v2-answer">
              <strong>Correct.</strong>
              ${esc(q.explanation)}
            </div>
          `;
        } else {
          result.innerHTML = `
            <div class="v2-answer">
              <strong>Not correct.</strong>
              ${esc(q.explanation)}
            </div>
          `;
        }

        const next = el(`
          <button class="v2-button primary" style="margin-top:12px">
            ${quizIndex + 1 === topic.phase3.length ? "See result" : "Next question"}
          </button>
        `);

        next.onclick = () => {
          quizIndex++;
          draw();
        };

        result.appendChild(next);
      };
    });
  }

  draw();
}

function renderRevision(container) {
  let current = 0;

  function draw() {
    const item = revisionV2[current];

    container.innerHTML = `
      <h1 class="v2-page-title">Revision</h1>
      <p class="v2-page-subtitle">
        Review important questions from the curriculum and books.
      </p>

      <div class="v2-card">
        <p class="v2-muted">
          Question ${current + 1} of ${revisionV2.length}
        </p>

        <span class="v2-badge">${esc(item.source)}</span>

        <h2 style="margin-top:12px">${esc(item.question)}</h2>

        <button class="v2-button primary" id="show-revision-answer">
          Show answer
        </button>

        <div id="revision-answer" class="v2-answer" style="display:none">
          ${esc(item.answer)}
        </div>
      </div>

      <div class="v2-row" style="margin-top:15px">
        <button class="v2-button" id="previous">Previous</button>
        <button class="v2-button primary" id="next">Next</button>
      </div>
    `;

    container.querySelector("#show-revision-answer").onclick = () => {
      container.querySelector("#revision-answer").style.display = "block";

      if (!state.revisionDone.includes(current)) {
        state.revisionDone.push(current);
        addXP(2);
      }
    };

    container.querySelector("#previous").onclick = () => {
      current = (current - 1 + revisionV2.length) % revisionV2.length;
      draw();
    };

    container.querySelector("#next").onclick = () => {
      current = (current + 1) % revisionV2.length;
      draw();
    };
  }

  draw();
}

function renderBooks(container) {
  container.innerHTML = `
    <h1 class="v2-page-title">Knowledge Books</h1>
    <p class="v2-page-subtitle">
      Detailed books for structured cybersecurity study.
    </p>

    <div class="v2-grid-wide">
      ${booksV2.map(book => `
        <div class="v2-card">
          <h3>${esc(book.title)}</h3>
          <p class="v2-muted">${esc(book.description)}</p>
          <p><strong>${book.chapters.length} chapters</strong></p>
          <button class="v2-button primary" data-book="${book.id}">
            Open book
          </button>
        </div>
      `).join("")}
    </div>
  `;

  container.querySelectorAll("[data-book]").forEach(btn => {
    btn.onclick = () => {
      const book = booksV2.find(x => x.id === Number(btn.dataset.book));
      openBook(book);
    };
  });
}

function openBook(book) {
  const container = document.querySelector("#v2-page");

  container.innerHTML = `
    <div class="v2-row" style="justify-content:space-between">
      <div>
        <h1 class="v2-page-title">${esc(book.title)}</h1>
        <p class="v2-page-subtitle">${esc(book.description)}</p>
      </div>

      <button class="v2-button" id="back-books">Back to books</button>
    </div>

    <div class="v2-list">
      ${book.chapters.map(chapter => `
        <div class="v2-card">
          <h3>Chapter ${chapter.number}: ${esc(chapter.title)}</h3>

          <p>${esc(chapter.content)}</p>

          <p>
            <strong>Example:</strong>
            ${esc(chapter.example)}
          </p>

          <p>
            <strong>Defensive considerations:</strong>
            ${esc(chapter.defense)}
          </p>

          <p><strong>Key takeaways</strong></p>
          <ul>
            ${chapter.keyTakeaways.map(x => `<li>${esc(x)}</li>`).join("")}
          </ul>

          <p><strong>Review questions</strong></p>
          <ul>
            ${chapter.review.map(x => `<li>${esc(x)}</li>`).join("")}
          </ul>
        </div>
      `).join("")}
    </div>
  `;

  container.querySelector("#back-books").onclick = () => renderBooks(container);
}

function renderThreats(container) {
  container.innerHTML = `
    <h1 class="v2-page-title">Threat Information</h1>
    <p class="v2-page-subtitle">
      Review common security threats and the defensive actions that can reduce risk.
    </p>

    <input id="threat-search" class="v2-search" placeholder="Search threats..." />

    <div class="v2-section">
      <div id="threat-list" class="v2-list"></div>
    </div>
  `;

  const search = container.querySelector("#threat-search");
  const list = container.querySelector("#threat-list");

  function draw() {
    const term = search.value.toLowerCase();

    const results = threatsV2.filter(t =>
      `${t.title} ${t.summary} ${t.attackMethod} ${t.impact}`
        .toLowerCase()
        .includes(term)
    );

    list.innerHTML = results.map(t => `
      <div class="v2-card">
        <div class="v2-row" style="justify-content:space-between">
          <h3>${esc(t.title)}</h3>
          <span class="v2-badge ${t.severity.toLowerCase()}">
            ${esc(t.severity)}
          </span>
        </div>

        <p>${esc(t.summary)}</p>

        <p><strong>Affected:</strong> ${esc(t.affected.join(", "))}</p>
        <p><strong>Attack method:</strong> ${esc(t.attackMethod)}</p>
        <p><strong>Possible impact:</strong> ${esc(t.impact)}</p>
        <p><strong>Defensive action:</strong> ${esc(t.defense)}</p>
      </div>
    `).join("") || `<div class="v2-empty">No threats found.</div>`;
  }

  search.oninput = draw;
  draw();
}

function renderLabs(container) {
  container.innerHTML = `
    <h1 class="v2-page-title">Cyber Defense Labs</h1>
    <p class="v2-page-subtitle">
      Practice practical defensive tasks.
    </p>

    <div class="v2-grid-wide">
      ${labsV2.map(lab => {
        const done = state.completedLabs.includes(lab.id);

        return `
          <div class="v2-card">
            <span class="v2-badge">${esc(lab.level)}</span>
            <h3>${esc(lab.title)}</h3>
            <p>${esc(lab.objective)}</p>

            <p><strong>Status:</strong> ${done ? "Completed" : "Not completed"}</p>

            <button class="v2-button primary" data-lab="${lab.id}">
              Open lab
            </button>
          </div>
        `;
      }).join("")}
    </div>
  `;

  container.querySelectorAll("[data-lab]").forEach(btn => {
    btn.onclick = () => {
      const lab = labsV2.find(x => x.id === Number(btn.dataset.lab));
      openLab(lab);
    };
  });
}

function openLab(lab) {
  const container = document.querySelector("#v2-page");

  container.innerHTML = `
    <button class="v2-button" id="back-labs">Back to labs</button>

    <div class="v2-card" style="margin-top:15px">
      <span class="v2-badge">${esc(lab.level)}</span>

      <h1>${esc(lab.title)}</h1>

      <p><strong>Objective:</strong> ${esc(lab.objective)}</p>

      <h3>Scenario</h3>
      <p>${esc(lab.scenario)}</p>

      <h3>Steps</h3>
      <ol>
        ${lab.steps.map(x => `<li>${esc(x)}</li>`).join("")}
      </ol>

      <h3>Expected result</h3>
      <p>${esc(lab.expected)}</p>

      <button class="v2-button primary" id="complete-lab">
        Mark lab complete
      </button>
    </div>
  `;

  container.querySelector("#back-labs").onclick = () => renderLabs(container);

  container.querySelector("#complete-lab").onclick = () => {
    completeLab(lab.id);
    alert("Lab completed. +40 XP");
    renderLabs(container);
  };
}

function renderMissions(container) {
  container.innerHTML = `
    <h1 class="v2-page-title">Defensive Missions</h1>
    <p class="v2-page-subtitle">
      Complete guided cybersecurity tasks.
    </p>

    <div class="v2-grid-wide">
      ${missionsV2.map(mission => {
        const done = state.completedMissions.includes(mission.id);

        return `
          <div class="v2-card">
            <h3>${esc(mission.title)}</h3>
            <p>${esc(mission.description)}</p>
            <p><strong>Reward:</strong> ${mission.reward} XP</p>
            <p><strong>Status:</strong> ${done ? "Completed" : "Not completed"}</p>

            <button class="v2-button primary" data-mission="${mission.id}">
              Open mission
            </button>
          </div>
        `;
      }).join("")}
    </div>
  `;

  container.querySelectorAll("[data-mission]").forEach(btn => {
    btn.onclick = () => {
      const mission = missionsV2.find(x => x.id === Number(btn.dataset.mission));
      openMission(mission);
    };
  });
}

function openMission(mission) {
  const container = document.querySelector("#v2-page");

  container.innerHTML = `
    <button class="v2-button" id="back-missions">Back to missions</button>

    <div class="v2-card" style="margin-top:15px">
      <h1>${esc(mission.title)}</h1>

      <p>${esc(mission.description)}</p>

      <h3>Objectives</h3>
      <ol>
        ${mission.objectives.map(x => `<li>${esc(x)}</li>`).join("")}
      </ol>

      <p><strong>Reward:</strong> ${mission.reward} XP</p>

      <button class="v2-button primary" id="complete-mission">
        Complete mission
      </button>
    </div>
  `;

  container.querySelector("#back-missions").onclick = () => renderMissions(container);

  container.querySelector("#complete-mission").onclick = () => {
    completeMission(mission.id);
    alert(`Mission completed. +${mission.reward} XP`);
    renderMissions(container);
  };
}

function renderProgress(container) {
  const topicPct = progressPercent();

  container.innerHTML = `
    <h1 class="v2-page-title">Progress</h1>
    <p class="v2-page-subtitle">
      Your learning activity and saved data.
    </p>

    <div class="v2-grid">
      <div class="v2-card">
        <div class="v2-muted">XP</div>
        <div class="v2-stat">${state.xp}</div>
      </div>

      <div class="v2-card">
        <div class="v2-muted">Topics completed</div>
        <div class="v2-stat">${state.completedTopics.length}/${curriculumV2.length}</div>
      </div>

      <div class="v2-card">
        <div class="v2-muted">Labs completed</div>
        <div class="v2-stat">${state.completedLabs.length}/${labsV2.length}</div>
      </div>

      <div class="v2-card">
        <div class="v2-muted">Missions completed</div>
        <div class="v2-stat">${state.completedMissions.length}/${missionsV2.length}</div>
      </div>
    </div>

    <div class="v2-section">
      <div class="v2-card">
        <h3>Topic progress</h3>
        <div class="v2-progress">
          <div style="width:${topicPct}%"></div>
        </div>
        <p>${topicPct}% complete</p>
      </div>
    </div>

    <div class="v2-section">
      <div class="v2-card">
        <h3>Backup and restore</h3>

        <p class="v2-muted">
          Save your progress to a file or restore a previous backup.
        </p>

        <div class="v2-row">
          <button class="v2-button primary" id="export-data">
            Export progress
          </button>

          <button class="v2-button" id="import-data">
            Import progress
          </button>

          <button class="v2-button danger" id="reset-data">
            Reset progress
          </button>
        </div>

        <input id="import-file" type="file" accept=".json" style="display:none">
      </div>
    </div>
  `;

  container.querySelector("#export-data").onclick = () => {
    const blob = new Blob(
      [JSON.stringify(state, null, 2)],
      {type:"application/json"}
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "cyberops-progress-backup.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  const fileInput = container.querySelector("#import-file");

  container.querySelector("#import-data").onclick = () => {
    fileInput.click();
  };

  fileInput.onchange = async () => {
    const file = fileInput.files?.[0];
    if (!file) return;

    try {
      const imported = JSON.parse(await file.text());

      if (!imported || typeof imported !== "object") {
        throw new Error("Invalid backup");
      }

      state = {...defaultState, ...imported};
      saveState();

      alert("Progress restored.");
      renderProgress(container);
    } catch {
      alert("The selected backup file is not valid.");
    }
  };

  container.querySelector("#reset-data").onclick = () => {
    if (!confirm("Reset all V2 progress?")) return;

    state = {...defaultState};
    saveState();

    alert("Progress reset.");
    renderProgress(container);
  };
}

export function mountV2App() {
  if (document.getElementById("cyberops-v2-app")) return;

  const root = document.createElement("div");
  root.id = "cyberops-v2-app";

  document.body.appendChild(root);

  layout(root);
  showPage("home");
}
