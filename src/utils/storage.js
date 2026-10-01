// CYBEROPS DEFENSE COMMAND - Local Persistence & User Profile Engine

const STORAGE_KEYS = {
  USER_PROFILE: 'cyberops_user_profile',
  PROGRESS: 'cyberops_topic_progress',
  QUIZ_HISTORY: 'cyberops_quiz_history',
  BOOKMARKS: 'cyberops_bookmarks',
  REVISION_DECK: 'cyberops_revision_deck',
  SCRATCHPAD: 'cyberops_scratchpad_notes'
};

export class DefenseStorage {
  // --- USER PROFILE & RANK ---
  static getUserProfile() {
    const defaultProfile = {
      callsign: 'CYBER-SEC-01',
      name: 'Cyber Warrior Specialist',
      serviceBranch: 'Cyber Warriors Learning Academy // Blue Team Operations',
      clearanceLevel: 'TOP SECRET // CYBER WARRIORS',
      rank: 'Cyber Warrior Trainee',
      xp: 0
    };
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return data ? { ...defaultProfile, ...JSON.parse(data) } : defaultProfile;
    } catch (e) {
      return defaultProfile;
    }
  }

  static updateUserProfile(updates) {
    const current = this.getUserProfile();
    const updated = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updated));
    return updated;
  }

  static calculateRankFromXP(xp) {
    if (xp >= 2000) return 'Chief Information Security Officer (CISO)';
    if (xp >= 1500) return 'Cyber Warrior Lead';
    if (xp >= 1100) return 'Security Architect';
    if (xp >= 800)  return 'Senior Penetration Tester';
    if (xp >= 550)  return 'Threat Hunter';
    if (xp >= 350)  return 'Incident Responder';
    if (xp >= 200)  return 'SOC Analyst (Tier 2)';
    if (xp >= 100)  return 'Security Specialist';
    return 'Cyber Warrior Trainee';
  }

  // --- TOPIC PROGRESS ---
  static getTopicProgress() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  static markPhaseComplete(topicId, phaseNumber) {
    const progress = this.getTopicProgress();
    if (!progress[topicId]) {
      progress[topicId] = { phase1: false, phase2: false, phase3: false, bestScore: 0, lastQuizDate: null };
    }
    progress[topicId][`phase${phaseNumber}`] = true;
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));

    // Award XP
    const profile = this.getUserProfile();
    const xpBonus = phaseNumber === 3 ? 50 : 25;
    profile.xp += xpBonus;
    profile.rank = this.calculateRankFromXP(profile.xp);
    this.updateUserProfile(profile);

    return progress;
  }

  // --- QUIZ HISTORY & PERFORMANCE INTELLIGENCE ---
  static getQuizHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  static saveQuizResult(result) {
    // result: { id, timestamp, topicId, topicTitle, domainId, score, total, percentage, timeSpentSec, userAnswers, rankAwarded }
    const history = this.getQuizHistory();
    history.unshift(result);
    localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(history));

    // Update topic high score
    const progress = this.getTopicProgress();
    if (!progress[result.topicId]) {
      progress[result.topicId] = { phase1: false, phase2: false, phase3: true, bestScore: 0 };
    }
    if (result.percentage > (progress[result.topicId].bestScore || 0)) {
      progress[result.topicId].bestScore = result.percentage;
    }
    progress[result.topicId].phase3 = true;
    progress[result.topicId].lastQuizDate = result.timestamp;
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));

    // Add XP based on score
    const profile = this.getUserProfile();
    profile.xp += Math.round(result.score * 15);
    profile.rank = this.calculateRankFromXP(profile.xp);
    this.updateUserProfile(profile);

    return history;
  }

  // --- BOOKMARKS & REVISION DECK ---
  static getRevisionDeck() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REVISION_DECK);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  static toggleRevisionQuestion(questionObj) {
    const deck = this.getRevisionDeck();
    const index = deck.findIndex(item => item.id === questionObj.id);
    if (index >= 0) {
      deck.splice(index, 1);
    } else {
      deck.push({ ...questionObj, addedAt: new Date().toISOString() });
    }
    localStorage.setItem(STORAGE_KEYS.REVISION_DECK, JSON.stringify(deck));
    return deck;
  }

  static isQuestionInRevision(questionId) {
    const deck = this.getRevisionDeck();
    return deck.some(item => item.id === questionId);
  }

  // --- OVERALL PERFORMANCE METRICS ---
  static getOverallStats() {
    const history = this.getQuizHistory();
    const progress = this.getTopicProgress();
    const totalAttempts = history.length;
    
    let totalScoreSum = 0;
    let totalQuestionsAnswered = 0;
    let totalCorrectAnswers = 0;
    let totalTimeSpent = 0;

    history.forEach(h => {
      totalScoreSum += h.percentage;
      totalQuestionsAnswered += h.total;
      totalCorrectAnswers += h.score;
      totalTimeSpent += (h.timeSpentSec || 0);
    });

    const avgScore = totalAttempts > 0 ? Math.round(totalScoreSum / totalAttempts) : 0;
    const completedTopicsCount = Object.keys(progress).filter(k => progress[k].phase3).length;

    return {
      totalAttempts,
      avgScore,
      totalQuestionsAnswered,
      totalCorrectAnswers,
      accuracyPercentage: totalQuestionsAnswered > 0 ? Math.round((totalCorrectAnswers / totalQuestionsAnswered) * 100) : 0,
      totalTimeSpentSec: totalTimeSpent,
      completedTopicsCount,
      profile: this.getUserProfile()
    };
  }
}
