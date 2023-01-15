import { Kumbh_Sans, Roboto_Slab, Space_Mono } from "@next/font/google";

export const kumbhSansFont = Kumbh_Sans({ subsets: ["latin"] });
export const robotoSlabFont = Roboto_Slab({ subsets: ["latin"] });
export const spaceMonoFont = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export enum Font {
  KUMBH_SANS = "kumbh-sans-font",
  ROBOTO_SLAB = "roboto-slab-font",
  SPACE_MONO = "space-mono-font",
}

export const setFont = (font: Font) => {
  document.documentElement.style.setProperty(
    `--primary-font`,
    `var(--${font})`
  );
};

export const setDefaultFont = () => {
  setFont(Font.KUMBH_SANS);
};

export const getDefaultFontStyleString = (): string => {
  return `--primary-font: var(--${Font.KUMBH_SANS});`;
};
