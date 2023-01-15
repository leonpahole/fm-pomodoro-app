import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Modal from "react-modal";
import CloseIcon from "../../../public/icon-close.svg";
import {
  TimerSettings,
  TimerSettingsValidationSchema,
  useTimerSettings,
} from "../../../utils/timer-settings.utils";
import { AppSeparator } from "../../shared/AppSeparator/AppSeparator";
import styles from "./TimerSettingsModal.module.scss";
import { TimerSettingsModalColorTheme } from "./TimerSettingsModalColorTheme/TimerSettingsModalColorTheme";
import { TimerSettingsModalFont } from "./TimerSettingsModalFont/TimerSettingsModalFont";
import { TimerSettingsModalTime } from "./TimerSettingsModalTime/TimerSettingsModalTime";

export interface TimerSettingsModalProps {
  isOpen: boolean;
  onClose(): void;
}

export const TimerSettingsModal = ({
  isOpen,
  onClose,
}: TimerSettingsModalProps) => {
  const { settings: globalSettings, setSettings: setGlobalSettings } =
    useTimerSettings();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TimerSettings>({
    resolver: yupResolver(TimerSettingsValidationSchema),
    defaultValues: globalSettings,
  });

  useEffect(() => {
    reset(globalSettings);
  }, [globalSettings, reset]);

  const onSubmit = (data: TimerSettings) => {
    setGlobalSettings(data);
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="time"
          control={control}
          render={({ field }) => (
            <TimerSettingsModalTime
              onChange={field.onChange}
              time={field.value}
              errors={{
                pomodoro: errors.time?.pomodoro?.message,
                shortBreak: errors.time?.shortBreak?.message,
                longBreak: errors.time?.longBreak?.message,
              }}
            />
          )}
        />

        <AppSeparator />

        <Controller
          name="font"
          control={control}
          render={({ field }) => (
            <TimerSettingsModalFont
              selectedFont={field.value}
              onSelect={field.onChange}
              error={errors.font?.message}
            />
          )}
        />

        <AppSeparator />

        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <TimerSettingsModalColorTheme
              selectedColorTheme={field.value}
              onSelect={field.onChange}
              error={errors.color?.message}
            />
          )}
        />

        <button type="submit" className={styles.submitButton}>
          Apply
        </button>
      </form>
    </Modal>
  );
};
