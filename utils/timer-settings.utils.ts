import * as yup from "yup";
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

export const DefaultTimerSettings: TimerSettings = {
  color: ColorTheme.RED,
  font: Font.KUMBH_SANS,
  time: {
    pomodoro: 25,
    longBreak: 15,
    shortBreak: 5,
  },
};

const requiredTimeMessage = "Please enter a number";
const outOfRangeTimeMessage = "Must be between 1 and 59";

export const TimerSettingsValidationSchema = yup
  .object({
    font: yup.mixed<Font>().oneOf(Object.values(Font)),
    color: yup.mixed<ColorTheme>().oneOf(Object.values(ColorTheme)),
    time: yup.object({
      pomodoro: yup
        .number()
        .required(requiredTimeMessage)
        .min(1, outOfRangeTimeMessage)
        .max(59, outOfRangeTimeMessage),
      shortBreak: yup
        .number()
        .required(requiredTimeMessage)
        .min(1, outOfRangeTimeMessage)
        .max(59, outOfRangeTimeMessage),
      longBreak: yup
        .number()
        .required(requiredTimeMessage)
        .min(1, outOfRangeTimeMessage)
        .max(59, outOfRangeTimeMessage),
    }),
  })
  .required();

const validateTimerSettings = (settings?: TimerSettings): boolean => {
  return TimerSettingsValidationSchema.isValidSync(settings);
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
    const settings = JSON.parse(settingsStr);
    if (validateTimerSettings(settings)) {
      return settings;
    }

    return null;
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
