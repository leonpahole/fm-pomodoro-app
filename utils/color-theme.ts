import { DefaultTimerSettings } from "./timer-settings.utils";

interface ColorThemeColors {
  primary: string;
  grey: string;
  blue: string;
  white: string;
  black: string;
  light: string;
  lightGrey: string;
  dark: string;
  error: string;

  themeRed: string;
  themeBlue: string;
  themePurple: string;
}

const SharedColors: Omit<ColorThemeColors, "primary"> = {
  grey: "#d7e0ff",
  blue: "#1e213f",
  white: "#ffffff",
  black: "#000000",
  light: "#eff1fa",
  lightGrey: "#e3e1e1",
  dark: "#161932",
  error: "#ff3333",

  themeRed: "#F87070",
  themeBlue: "#70F3F8",
  themePurple: "#D881F8",
};

export enum ColorTheme {
  RED = "red",
  BLUE = "blue",
  PURPLE = "purple",
}

const ColorsThemeColorsMap: Record<ColorTheme, ColorThemeColors> = {
  red: {
    primary: SharedColors.themeRed,
    ...SharedColors,
  },
  blue: {
    primary: SharedColors.themeBlue,
    ...SharedColors,
  },
  purple: {
    primary: SharedColors.themePurple,
    ...SharedColors,
  },
};

export const getColorTheme = (theme: ColorTheme): ColorThemeColors => {
  const colors = ColorsThemeColorsMap[theme];
  return colors;
};

export const setColorTheme = (theme: ColorTheme) => {
  const colors = getColorTheme(theme);
  Object.entries(colors).forEach(([colorName, colorValue]) => {
    document.documentElement.style.setProperty(
      `--color-${colorName}`,
      colorValue
    );
  });
};

export const getDefaultColorThemeStyleString = (): string => {
  const colors = getColorTheme(DefaultTimerSettings.color);
  return Object.entries(colors)
    .map(([colorName, colorValue]) => `--color-${colorName}: ${colorValue}`)
    .join("\n");
};
