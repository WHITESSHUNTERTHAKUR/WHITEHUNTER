// CYBEROPS DEFENSE COMMAND - Procedural Web Audio & Speech Engine
// Ultra-lightweight, zero external sound asset dependencies, 100% offline

class CyberAudioEngine {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('cyberops_sound_muted') === 'true';
    this.speechSynthesis = window.speechSynthesis || null;
    this.currentUtterance = null;
    this.isSpeaking = false;
  }

  initContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  isMuted() {
    return this.muted;
  }

  setMuted(muted) {
    this.muted = muted;
    localStorage.setItem('cyberops_sound_muted', muted ? 'true' : 'false');
    if (muted && this.isSpeaking) {
      this.stopSpeaking();
    }
  }

  toggleMute() {
    this.setMuted(!this.muted);
    return this.muted;
  }

  // Tactical click / HUD tap sound
  playClick() {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {
      // Audio autoplay policies or unsupported
    }
  }

  // Mission Correct / Success Fanfare
  playSuccess() {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        
        gain.gain.setValueAtTime(0.12, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.2);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.2);
      });
    } catch (e) {}
  }

  // Threat Alert / Incorrect Warning
  playWarning() {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(160, now + 0.25);
      
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {}
  }

  // Quiz Finished / Clearance Promotion
  playPromotion() {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
      
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        
        gain.gain.setValueAtTime(0.15, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.35);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.35);
      });
    } catch (e) {}
  }

  // Read-Aloud Voice Synthesis for Training Q&A and Practical Videos
  speakText(text, onEnd, lang = 'en') {
    if (this.muted || !this.speechSynthesis) return;
    this.stopSpeaking();
    
    // Strip markdown and technical formatting
    const cleanText = text.replace(/[*#`_~[\]()]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!cleanText) return;

    this.currentUtterance = new SpeechSynthesisUtterance(cleanText);
    const isHindi = lang && (lang.startsWith('hi') || lang === 'hindi');
    
    const voices = this.speechSynthesis.getVoices() || [];

    if (isHindi) {
      this.currentUtterance.lang = 'hi-IN';
      this.currentUtterance.rate = 0.95;
      this.currentUtterance.pitch = 1.0;
      const hindiVoice = voices.find(v => 
        (v.lang && v.lang.toLowerCase().startsWith('hi')) || 
        (v.name && (v.name.toLowerCase().includes('hindi') || v.name.toLowerCase().includes('kalpana') || v.name.toLowerCase().includes('hemant')))
      );
      if (hindiVoice) {
        this.currentUtterance.voice = hindiVoice;
      }
    } else {
      this.currentUtterance.lang = 'en-US';
      this.currentUtterance.rate = 1.05;
      this.currentUtterance.pitch = 0.95;
      const englishVoice = voices.find(v => 
        v.lang && v.lang.startsWith('en') && 
        (v.name.includes('Natural') || v.name.includes('Enhanced') || v.name.includes('David') || v.name.includes('George') || v.name.includes('Google US English'))
      ) || voices.find(v => v.lang && v.lang.startsWith('en'));
      if (englishVoice) {
        this.currentUtterance.voice = englishVoice;
      }
    }
    
    this.currentUtterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };
    this.currentUtterance.onerror = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };
    
    this.isSpeaking = true;
    try {
      this.speechSynthesis.speak(this.currentUtterance);
    } catch (e) {
      this.isSpeaking = false;
    }
  }

  stopSpeaking() {
    if (this.speechSynthesis && this.isSpeaking) {
      this.speechSynthesis.cancel();
      this.isSpeaking = false;
    }
  }
}

export const cyberAudio = new CyberAudioEngine();
