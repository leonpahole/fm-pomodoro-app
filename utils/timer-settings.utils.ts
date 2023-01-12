import create from "zustand";
import { ColorTheme, setColorTheme } from "./color-theme";
import { Font, setFont } from "./font-family.utils";

export interface TimerSettingsTime {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
}

export interface TimerSettings {
  time: TimerSettingsTime;
  font: Font;
  color: ColorTheme;
}

export type TimerRunningStatus = "running" | "paused";
export type TimerPhase = keyof TimerSettingsTime;

const DefaultTimerSettings: TimerSettings = {
  color: "red",
  font: Font.KUMBH_SANS,
  time: {
    pomodoro: 25,
    longBreak: 15,
    shortBreak: 5,
  },
};

const LocalStorageKey = "__timerSettings";

const saveTimerSettings = (settings: TimerSettings) => {
  localStorage.setItem(LocalStorageKey, JSON.stringify(settings));
};

const getSavedTimerSettings = (): TimerSettings | null => {
  const settingsStr = localStorage.getItem(LocalStorageKey);
  if (!settingsStr) {
    return null;
  }

  try {
    return JSON.parse(settingsStr);
  } catch (e) {
    return null;
  }
};

const applyTimerSettings = (settings: TimerSettings) => {
  setFont(settings.font);
  setColorTheme(settings.color);
  saveTimerSettings(settings);
};

const getSavedTimerSettingsOrDefault = (): TimerSettings => {
  return getSavedTimerSettings() || DefaultTimerSettings;
};

interface UseTimerSettings {
  settings: TimerSettings;
  setSettings: (s: TimerSettings) => void;
}

export const useTimerSettings = create<UseTimerSettings>((set) => ({
  settings: DefaultTimerSettings,
  setSettings: (settings: TimerSettings) => {
    applyTimerSettings(settings);
    set({ settings });
  },
}));

if (typeof window !== "undefined") {
  window.onload = () => {
    const settings = getSavedTimerSettingsOrDefault();
    applyTimerSettings(settings);
    useTimerSettings.setState({ settings });
  };
}
