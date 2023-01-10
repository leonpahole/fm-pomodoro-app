import type { AppProps } from "next/app";
import Modal from "react-modal";
import {
  Font,
  kumbhSansFont,
  robotoSlabFont,
  spaceMonoFont,
} from "../utils/font-family.utils";
import "../styles/index.scss";
import "../utils/timer-settings.utils";

Modal.setAppElement("#modals");

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
