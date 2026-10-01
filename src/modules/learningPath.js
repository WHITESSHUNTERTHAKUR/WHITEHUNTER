import { ALL_TOPICS } from "../data/allTopics.js";
import { DefenseStorage } from "../utils/storage.js";

export function renderLearningPath(container, onNavigate) {
  const stats = DefenseStorage.getOverallStats();

  const topics = Array.isArray(ALL_TOPICS) ? ALL_TOPICS : [];

  const progress = topics.map((topic) => {
    const p = DefenseStorage.getTopicProgress
      ? DefenseStorage.getTopicProgress(topic.id)
      : { phase1: false, phase2: false, phase3: false };

    const completed =
      (p.phase1 ? 1 : 0) +
      (p.phase2 ? 1 : 0) +
      (p.phase3 ? 1 : 0);

    return {
      topic,
      progress: p,
      completed,
      percent: Math.round((completed / 3) * 100)
    };
  });

  const completedTopics = progress.filter(x => x.completed === 3).length;
  const startedTopics = progress.filter(x => x.completed > 0).length;
  const totalPhases = progress.length * 3;
  const completedPhases = progress.reduce((sum, x) => sum + x.completed, 0);
  const overallPercent = totalPhases
    ? Math.round((completedPhases / totalPhases) * 100)
    : 0;

  container.innerHTML = `
    <div class="profile-viewport" style="max-width: 1100px; margin: 0 auto;">
      <div class="curriculum-header" style="margin-bottom: 24px;">
        <div class="curriculum-title">
          <span class="tag-pill" style="border-color: var(--cyan-glow); color: var(--cyan-glow);">
            STUDENT LEARNING PATH
          </span>
          <h2>Cybersecurity Training Progress</h2>
          <p>Follow each topic through Theory, Q&A, and Quiz practice.</p>
        </div>
      </div>

      <div class="analytics-grid" style="margin-bottom: 24px;">
        <div class="stat-box">
          <div class="stat-title">Overall Progress</div>
          <div class="stat-val" style="color: var(--cyan-glow);">${overallPercent}%</div>
          <div style="font-size:11px;color:var(--text-dim);">
            ${completedPhases} of ${totalPhases} phases
          </div>
        </div>

        <div class="stat-box">
          <div class="stat-title">Topics Started</div>
          <div class="stat-val">${startedTopics}</div>
          <div style="font-size:11px;color:var(--text-dim);">
            Learning activity recorded
          </div>
        </div>

        <div class="stat-box">
          <div class="stat-title">Topics Completed</div>
          <div class="stat-val" style="color:var(--emerald-glow);">
            ${completedTopics}
          </div>
          <div style="font-size:11px;color:var(--text-dim);">
            All 3 phases completed
          </div>
        </div>

        <div class="stat-box">
          <div class="stat-title">Quiz Accuracy</div>
          <div class="stat-val" style="color:var(--amber-glow);">
            ${stats.accuracyPercentage}%
          </div>
          <div style="font-size:11px;color:var(--text-dim);">
            Overall practice accuracy
          </div>
        </div>
      </div>

      <div style="display:grid;gap:14px;">
        ${progress.map((item, index) => `
          <div class="card-tactical" style="padding:18px;">
            <div style="display:flex;justify-content:space-between;gap:15px;align-items:center;flex-wrap:wrap;">
              <div>
                <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-dim);">
                  TOPIC ${String(index + 1).padStart(2, "0")} / ${item.topic.level || "TRAINING"}
                </div>

                <h3 style="margin:4px 0;color:var(--text-bright);">
                  ${item.topic.title}
                </h3>

                <div style="font-size:12px;color:var(--text-dim);">
                  ${item.completed}/3 phases completed
                </div>
              </div>

              <button
                class="btn btn-cyan btn-sm learning-open-topic"
                data-topic-id="${item.topic.id}">
                ${item.completed === 0 ? "Start Topic" : item.completed === 3 ? "Review Topic" : "Continue Learning"}
              </button>
            </div>

            <div style="margin-top:14px;height:7px;background:rgba(255,255,255,.08);border-radius:10px;overflow:hidden;">
              <div style="height:100%;width:${item.percent}%;background:var(--cyan-glow);"></div>
            </div>

            <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;">
              <span class="phase-dot ${item.progress.phase1 ? "completed" : ""}">
                P1: Theory
              </span>

              <span class="phase-dot ${item.progress.phase2 ? "completed" : ""}">
                P2: Q&A
              </span>

              <span class="phase-dot ${item.progress.phase3 ? "completed" : ""}">
                P3: Quiz
              </span>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  container.querySelectorAll(".learning-open-topic").forEach((button) => {
    button.addEventListener("click", () => {
      const topicId = button.dataset.topicId;

      if (typeof onNavigate === "function") {
        onNavigate("topic", topicId);
      }
    });
  });
}
