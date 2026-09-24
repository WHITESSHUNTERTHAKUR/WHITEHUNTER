import { cyberAudio } from './audio.js';
import { DefenseStorage } from '../utils/storage.js';
import { renderPerformanceReport } from './performanceAnalytics.js';

export function renderPhase3Quiz(topic, container, onNavigate) {
  const questions = topic.phase3;
  let currentIndex = 0;
  let userAnswers = {}; // { questionId: selectedOptionIndex }
  let flaggedQuestions = new Set();
  let timeSpentSec = 0;
  let timerInterval = null;

  // Start mission timer
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeSpentSec++;
    const timerElem = container.querySelector('#quiz-mission-timer');
    if (timerElem) {
      const mins = Math.floor(timeSpentSec / 60).toString().padStart(2, '0');
      const secs = (timeSpentSec % 60).toString().padStart(2, '0');
      timerElem.innerText = `${mins}:${secs}`;
    }
  }, 1000);

  function render() {
    const currentQ = questions[currentIndex];
    const isAnswered = userAnswers[currentQ.id] !== undefined;
    const isFlagged = flaggedQuestions.has(currentQ.id);
    const answeredCount = Object.keys(userAnswers).length;
    const progressPercent = Math.round((answeredCount / questions.length) * 100);

    const mins = Math.floor(timeSpentSec / 60).toString().padStart(2, '0');
    const secs = (timeSpentSec % 60).toString().padStart(2, '0');

    container.innerHTML = `
      <div class="quiz-viewport">
        <!-- HUD Header -->
        <div class="quiz-hud-bar">
          <div>
            <span class="tag-pill" style="border-color: var(--cyan-glow); margin-bottom: 4px; display: inline-block;">
              PHASE 3: TACTICAL EVALUATION MISSION
            </span>
            <div style="font-weight: 700; color: var(--text-bright); font-size: 16px;">
              ${topic.title}
            </div>
          </div>
          <div style="display: flex; gap: 12px; align-items: center;">
            <div class="timer-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span id="quiz-mission-timer">${mins}:${secs}</span>
            </div>
            <button class="btn btn-crimson btn-sm" id="btn-submit-quiz-direct">
              Submit Mission
            </button>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="quiz-progress-bar-wrap">
          <div class="quiz-progress-fill" style="width: ${progressPercent}%"></div>
        </div>

        <!-- Question Matrix Grid -->
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; align-items: center;">
          <span style="font-size: 12px; color: var(--text-dim); font-family: var(--font-tactical);">QUESTIONS:</span>
          ${questions.map((q, idx) => {
            const answered = userAnswers[q.id] !== undefined;
            const flagged = flaggedQuestions.has(q.id);
            const isCurrent = idx === currentIndex;
            
            let bg = 'rgba(255, 255, 255, 0.05)';
            let border = 'var(--border-subtle)';
            let color = 'var(--text-muted)';
            
            if (isCurrent) {
              border = 'var(--cyan-glow)';
              color = 'var(--cyan-glow)';
              bg = 'rgba(0, 242, 254, 0.15)';
            } else if (flagged) {
              border = 'var(--amber-glow)';
              color = 'var(--amber-glow)';
              bg = 'rgba(245, 158, 11, 0.15)';
            } else if (answered) {
              border = 'var(--emerald-glow)';
              color = 'var(--emerald-glow)';
              bg = 'rgba(16, 185, 129, 0.15)';
            }

            return `
              <button class="btn-matrix-q" data-idx="${idx}" style="width: 32px; height: 32px; border-radius: var(--radius-sm); border: 1px solid ${border}; background: ${bg}; color: ${color}; font-family: var(--font-mono); font-size: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s;">
                ${idx + 1}
              </button>
            `;
          }).join('')}
          <span style="margin-left: auto; font-size: 12px; color: var(--text-dim); font-family: var(--font-mono);">
            ${answeredCount}/${questions.length} Answered
          </span>
        </div>

        <!-- Question Card -->
        <div class="question-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span class="qa-badge">QUESTION ${currentIndex + 1} OF ${questions.length}</span>
            <button class="btn btn-outline btn-sm" id="btn-flag-question" style="color: ${isFlagged ? 'var(--amber-glow)' : 'var(--text-muted)'}; border-color: ${isFlagged ? 'var(--amber-glow)' : 'var(--border-subtle)'};">
              ${isFlagged ? '★ Flagged for Review' : '☆ Flag for Review'}
            </button>
          </div>

          ${currentQ.scenario ? `
            <div class="question-scenario">
              <strong>OPERATIONAL SCENARIO:</strong> ${currentQ.scenario}
            </div>
          ` : ''}

          <div class="question-prompt">${currentQ.question}</div>

          <!-- Options -->
          <div class="options-container">
            ${currentQ.options.map((optionText, optIdx) => {
              const letters = ['A', 'B', 'C', 'D'];
              const isSelected = userAnswers[currentQ.id] === optIdx;
              return `
                <div class="option-btn ${isSelected ? 'selected' : ''}" data-opt="${optIdx}">
                  <div class="option-letter">${letters[optIdx]}</div>
                  <div>${optionText}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <button class="btn btn-outline" id="btn-prev-q" ${currentIndex === 0 ? 'disabled style="opacity: 0.4; cursor: not-allowed;"' : ''}>
            ← Previous Question
          </button>
          
          <div style="display: flex; gap: 12px;">
            ${currentIndex < questions.length - 1 ? `
              <button class="btn btn-cyan" id="btn-next-q">Next Question →</button>
            ` : `
              <button class="btn btn-emerald" id="btn-submit-final">
                Complete Mission & View Evaluation Report →
              </button>
            `}
          </div>
        </div>
      </div>
    `;

    attachEvents();
  }

  function attachEvents() {
    // Option Selection
    container.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        cyberAudio.playClick();
        const optIdx = parseInt(btn.getAttribute('data-opt'), 10);
        const currentQ = questions[currentIndex];
        userAnswers[currentQ.id] = optIdx;
        render();
      });
    });

    // Matrix numbers click
    container.querySelectorAll('.btn-matrix-q').forEach(btn => {
      btn.addEventListener('click', () => {
        cyberAudio.playClick();
        currentIndex = parseInt(btn.getAttribute('data-idx'), 10);
        render();
      });
    });

    // Flag question
    const flagBtn = container.querySelector('#btn-flag-question');
    if (flagBtn) {
      flagBtn.addEventListener('click', () => {
        cyberAudio.playClick();
        const currentQ = questions[currentIndex];
        if (flaggedQuestions.has(currentQ.id)) {
          flaggedQuestions.delete(currentQ.id);
        } else {
          flaggedQuestions.add(currentQ.id);
        }
        render();
      });
    }

    // Previous / Next
    const prevBtn = container.querySelector('#btn-prev-q');
    if (prevBtn && currentIndex > 0) {
      prevBtn.addEventListener('click', () => {
        cyberAudio.playClick();
        currentIndex--;
        render();
      });
    }

    const nextBtn = container.querySelector('#btn-next-q');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        cyberAudio.playClick();
        if (currentIndex < questions.length - 1) {
          currentIndex++;
          render();
        }
      });
    }

    // Submission handlers
    const submitDirect = container.querySelector('#btn-submit-quiz-direct');
    const submitFinal = container.querySelector('#btn-submit-final');

    if (submitDirect) {
      submitDirect.addEventListener('click', confirmAndSubmit);
    }
    if (submitFinal) {
      submitFinal.addEventListener('click', confirmAndSubmit);
    }
  }

  function confirmAndSubmit() {
    const answeredCount = Object.keys(userAnswers).length;
    const unanswered = questions.length - answeredCount;

    if (unanswered > 0) {
      const confirmProceed = window.confirm(
        `WARNING: You have ${unanswered} unanswered question(s).\n\nDo you want to finalize and evaluate your performance now?`
      );
      if (!confirmProceed) return;
    }

    // Clear timer
    clearInterval(timerInterval);

    // Calculate score & domain performance
    let score = 0;
    const questionReviewData = [];

    questions.forEach((q, idx) => {
      const selectedIndex = userAnswers[q.id];
      const isCorrect = selectedIndex === q.correctIndex;
      if (isCorrect) score++;

      questionReviewData.push({
        id: q.id,
        number: idx + 1,
        question: q.question,
        scenario: q.scenario,
        options: q.options,
        userAnswerIndex: selectedIndex,
        correctIndex: q.correctIndex,
        isCorrect: isCorrect,
        explanation: q.explanation,
        domainCategory: q.domainCategory || topic.title
      });
    });

    const percentage = Math.round((score / questions.length) * 100);

    // Rank assignment
    let rankAwarded = 'Tactical Cyber Specialist';
    if (percentage >= 90) rankAwarded = 'Chief Cyber Warfare Commander';
    else if (percentage >= 75) rankAwarded = 'Cyber Defense Officer';
    else if (percentage >= 60) rankAwarded = 'Tactical Cyber Specialist';
    else if (percentage >= 40) rankAwarded = 'Junior Cyber Analyst';
    else rankAwarded = 'Cadet (Needs Remediation)';

    // Play appropriate sound
    if (percentage >= 75) {
      cyberAudio.playPromotion();
    } else if (percentage >= 50) {
      cyberAudio.playSuccess();
    } else {
      cyberAudio.playWarning();
    }

    // Save record to persistent storage
    const quizResult = {
      id: 'quiz-' + Date.now(),
      timestamp: new Date().toISOString(),
      topicId: topic.id,
      topicTitle: topic.title,
      domainId: topic.domainId,
      score: score,
      total: questions.length,
      percentage: percentage,
      timeSpentSec: timeSpentSec,
      rankAwarded: rankAwarded,
      reviewData: questionReviewData
    };

    DefenseStorage.saveQuizResult(quizResult);

    // Render Deep Performance Analytics!
    renderPerformanceReport(quizResult, topic, container, onNavigate);
  }

  render();
}
