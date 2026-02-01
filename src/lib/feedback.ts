import { getGlobalFeedbackSettings } from "@/hooks/useFeedbackSettings";

// Haptic feedback patterns
const HAPTIC_PATTERNS = {
  light: [10],
  medium: [20],
  heavy: [30],
  success: [10, 50, 20],
  double: [15, 30, 15],
} as const;

type HapticPattern = keyof typeof HAPTIC_PATTERNS;

/**
 * Trigger haptic feedback on supported devices
 */
export function triggerHaptic(pattern: HapticPattern = "medium") {
  const { hapticEnabled } = getGlobalFeedbackSettings();
  if (!hapticEnabled) return;

  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(HAPTIC_PATTERNS[pattern]);
    } catch {
      // Silently fail if vibration is not supported
    }
  }
}

// Audio context singleton
let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch {
      return null;
    }
  }
  
  // Resume if suspended (required by browser autoplay policies)
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  
  return audioContext;
}

interface ToneOptions {
  frequency: number;
  duration: number;
  type?: OscillatorType;
  volume?: number;
  fadeOut?: number;
}

/**
 * Play a simple synthesized tone
 */
function playTone(options: ToneOptions) {
  const { soundEnabled } = getGlobalFeedbackSettings();
  if (!soundEnabled) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  const {
    frequency,
    duration,
    type = "sine",
    volume = 0.15,
    fadeOut = 0.1,
  } = options;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

  // Set volume and fade out
  gainNode.gain.setValueAtTime(volume, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    ctx.currentTime + duration - fadeOut
  );

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration);
}

/**
 * Sound effect presets for UI interactions
 */
export const sounds = {
  /** Upward chime for saving/adding */
  save: () => {
    playTone({ frequency: 523.25, duration: 0.08, type: "sine", volume: 0.12 }); // C5
    setTimeout(() => {
      playTone({ frequency: 659.25, duration: 0.1, type: "sine", volume: 0.1 }); // E5
    }, 60);
    setTimeout(() => {
      playTone({ frequency: 783.99, duration: 0.15, type: "sine", volume: 0.08 }); // G5
    }, 120);
  },

  /** Downward tone for removing/unsaving */
  unsave: () => {
    playTone({ frequency: 440, duration: 0.12, type: "sine", volume: 0.1 }); // A4
    setTimeout(() => {
      playTone({ frequency: 349.23, duration: 0.15, type: "sine", volume: 0.08 }); // F4
    }, 80);
  },

  /** Soft pop for general interactions */
  pop: () => {
    playTone({ frequency: 600, duration: 0.06, type: "sine", volume: 0.1 });
  },

  /** Success sound for confirmations */
  success: () => {
    playTone({ frequency: 523.25, duration: 0.1, type: "sine", volume: 0.1 }); // C5
    setTimeout(() => {
      playTone({ frequency: 659.25, duration: 0.12, type: "sine", volume: 0.1 }); // E5
    }, 100);
    setTimeout(() => {
      playTone({ frequency: 783.99, duration: 0.2, type: "sine", volume: 0.12 }); // G5
    }, 200);
  },

  /** Subtle click for UI feedback */
  click: () => {
    playTone({ frequency: 800, duration: 0.03, type: "square", volume: 0.05 });
  },
};

/**
 * Combined feedback for save action
 */
export function feedbackSave() {
  triggerHaptic("success");
  sounds.save();
}

/**
 * Combined feedback for unsave action
 */
export function feedbackUnsave() {
  triggerHaptic("light");
  sounds.unsave();
}

/**
 * Combined feedback for general tap
 */
export function feedbackTap() {
  triggerHaptic("light");
  sounds.click();
}
