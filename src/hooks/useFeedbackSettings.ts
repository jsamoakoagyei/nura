import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "nura-feedback-settings";

interface FeedbackSettings {
  soundEnabled: boolean;
  hapticEnabled: boolean;
}

const defaultSettings: FeedbackSettings = {
  soundEnabled: true,
  hapticEnabled: true,
};

// Global state for settings (allows feedback.ts to check without hooks)
let globalSettings: FeedbackSettings = defaultSettings;

export function getGlobalFeedbackSettings(): FeedbackSettings {
  return globalSettings;
}

function loadSettings(): FeedbackSettings {
  if (typeof window === "undefined") return defaultSettings;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      globalSettings = { ...defaultSettings, ...parsed };
      return globalSettings;
    }
  } catch {
    // Ignore parse errors
  }
  return defaultSettings;
}

function saveSettings(settings: FeedbackSettings): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    globalSettings = settings;
  } catch {
    // Ignore storage errors
  }
}

export function useFeedbackSettings() {
  const [settings, setSettings] = useState<FeedbackSettings>(loadSettings);

  // Load on mount
  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  const setSoundEnabled = useCallback((enabled: boolean) => {
    setSettings((prev) => {
      const next = { ...prev, soundEnabled: enabled };
      saveSettings(next);
      return next;
    });
  }, []);

  const setHapticEnabled = useCallback((enabled: boolean) => {
    setSettings((prev) => {
      const next = { ...prev, hapticEnabled: enabled };
      saveSettings(next);
      return next;
    });
  }, []);

  const toggleSound = useCallback(() => {
    setSettings((prev) => {
      const next = { ...prev, soundEnabled: !prev.soundEnabled };
      saveSettings(next);
      return next;
    });
  }, []);

  const toggleHaptic = useCallback(() => {
    setSettings((prev) => {
      const next = { ...prev, hapticEnabled: !prev.hapticEnabled };
      saveSettings(next);
      return next;
    });
  }, []);

  return {
    soundEnabled: settings.soundEnabled,
    hapticEnabled: settings.hapticEnabled,
    setSoundEnabled,
    setHapticEnabled,
    toggleSound,
    toggleHaptic,
  };
}
