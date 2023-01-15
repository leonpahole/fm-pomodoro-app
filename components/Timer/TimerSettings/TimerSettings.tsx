import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import SettingsIcon from "../../../public/icon-settings.svg";
import timerSettingsStyles from "./TimerSettings.module.scss";
import { TimerSettingsModalProps } from "../TimerSettingsModal/TimerSettingsModal";

const DynamicModal = dynamic<TimerSettingsModalProps>(() =>
  import("../TimerSettingsModal/TimerSettingsModal").then(
    (mod) => mod.TimerSettingsModal
  )
);

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
      <DynamicModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </section>
  );
};
