import Image from "next/image";
import { useState } from "react";
import SettingsIcon from "../../../public/icon-settings.svg";
import { TimerSettingsModal } from "../TimerSettingsModal/TimerSettingsModal";
import timerSettingsStyles from "./TimerSettings.module.scss";

export const TimerSettings = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <section className={timerSettingsStyles.wrapper}>
      <button
        className={timerSettingsStyles.button}
        aria-label="Open settings"
        type="button"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Image src={SettingsIcon} alt="" />
      </button>
      <TimerSettingsModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </section>
  );
};
