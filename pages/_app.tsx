import type { AppProps } from "next/app";
import {
  Font,
  kumbhSansFont,
  robotoSlabFont,
  spaceMonoFont,
  setDefaultFont,
} from "../utils/font-family.utils";
import "../styles/index.scss";
import { setDefaultColorTheme } from "../utils/color-theme";

if (typeof window !== "undefined") {
  window.onload = () => {
    setDefaultFont();
    setDefaultColorTheme();
  };
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>
        {`
          html {
            --${Font.KUMBH_SANS}: ${kumbhSansFont.style.fontFamily};
            --${Font.ROBOTO_SLAB}: ${robotoSlabFont.style.fontFamily};
            --${Font.SPACE_MONO}: ${spaceMonoFont.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  );
}
