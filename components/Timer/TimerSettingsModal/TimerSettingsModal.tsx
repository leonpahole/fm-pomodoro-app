import Modal from "react-modal";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import styles from "./TimerSettingsModal.module.scss";
import CloseIcon from "../../../public/icon-close.svg";
import { AppSeparator } from "../../shared/AppSeparator/AppSeparator";
import { TimerSettingsModalColorTheme } from "./TimerSettingsModalColorTheme/TimerSettingsModalColorTheme";
import { TimerSettingsModalFont } from "./TimerSettingsModalFont/TimerSettingsModalFont";
import { TimerSettingsModalTime } from "./TimerSettingsModalTime/TimerSettingsModalTime";
import {
  TimerSettings,
  useTimerSettings,
} from "../../../utils/timer-settings.utils";

interface IProps {
  isOpen: boolean;
  onClose(): void;
}

export const TimerSettingsModal = ({ isOpen, onClose }: IProps) => {
  const { settings: globalSettings, setSettings: setGlobalSettings } =
    useTimerSettings();

  const [settings, setSettings] = useState<TimerSettings>(globalSettings);

  useEffect(() => {
    setSettings(globalSettings);
  }, [globalSettings]);

  const onSettingsPartChange = (val: Partial<TimerSettings>) => {
    setSettings((s) => ({
      ...s,
      ...val,
    }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGlobalSettings(settings);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Timer settings"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <header className={styles.header}>
        <h2 className={styles.h2}>Settings</h2>
        <button type="button" aria-label="Close modal" onClick={onClose}>
          <Image src={CloseIcon} alt="" />
        </button>
      </header>

      <AppSeparator className={styles.separator} />

      <form onSubmit={onSubmit}>
        <TimerSettingsModalTime
          time={settings.time}
          onChange={(time) => onSettingsPartChange({ time })}
        />

        <AppSeparator />

        <TimerSettingsModalFont
          selectedFont={settings.font}
          onSelect={(font) => onSettingsPartChange({ font })}
        />

        <AppSeparator />

        <TimerSettingsModalColorTheme
          selectedColorTheme={settings.color}
          onSelect={(color) => onSettingsPartChange({ color })}
        />

        <button type="submit" className={styles.submitButton}>
          Apply
        </button>
      </form>
    </Modal>
  );
};
