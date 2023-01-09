import Modal from "react-modal";
import Image from "next/image";
import clsx from "clsx";
import timerSettingsModalStyles from "./TimerSettingsModal.module.scss";
import CloseIcon from "../../../public/icon-close.svg";
import CheckedIcon from "../../../public/icon-checked.svg";
import { AppNumberInput } from "../../shared/AppNumberInput/AppNumberInput";
import { AppSeparator } from "../../shared/AppSeparator/AppSeparator";
import { AppRadioInput } from "../../shared/AppRadioInput/AppRadioInput";

interface IProps {
  isOpen: boolean;
  onClose(): void;
}

export const TimerSettingsModal = ({ isOpen, onClose }: IProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Timer settings"
      className={timerSettingsModalStyles.modal}
      overlayClassName={timerSettingsModalStyles.overlay}
    >
      <header className={timerSettingsModalStyles.header}>
        <h2 className={timerSettingsModalStyles.h2}>Settings</h2>
        <button type="button" aria-label="Close modal" onClick={onClose}>
          <Image src={CloseIcon} alt="" />
        </button>
      </header>

      <AppSeparator className={timerSettingsModalStyles.separator} />

      <form>
        <div
          role="group"
          className={timerSettingsModalStyles.timeFieldSet}
          aria-labelledby="time-legend"
        >
          <div id="time-legend" className={timerSettingsModalStyles.legend}>
            Time (minutes)
          </div>
          <div className={timerSettingsModalStyles.inputWrapper}>
            <AppNumberInput
              id="pomodoroTime"
              label="Pomodoro"
              className={timerSettingsModalStyles.input}
            />
            <AppNumberInput
              id="shortBreakTime"
              label="Short break"
              className={timerSettingsModalStyles.input}
            />
            <AppNumberInput
              id="longBreakTime"
              label="Long break"
              className={timerSettingsModalStyles.input}
            />
          </div>
        </div>

        <AppSeparator />

        <div
          role="group"
          className={timerSettingsModalStyles.fontFieldSet}
          aria-labelledby="font-legend"
        >
          <div id="font-legend" className={timerSettingsModalStyles.legend}>
            Font
          </div>
          <div className={timerSettingsModalStyles.inputWrapper}>
            <AppRadioInput
              label="Select Kumbh Sans Font"
              id="kumbhSansFont"
              contentClassName={clsx(
                timerSettingsModalStyles.option,
                timerSettingsModalStyles.kumbhSansFont
              )}
              activeContentClassName={timerSettingsModalStyles.active}
            >
              Aa
            </AppRadioInput>
            <AppRadioInput
              label="Select Roboto Slab Font"
              id="robotoSlabFont"
              contentClassName={clsx(
                timerSettingsModalStyles.option,
                timerSettingsModalStyles.robotoSlabFont
              )}
              activeContentClassName={timerSettingsModalStyles.active}
            >
              Aa
            </AppRadioInput>
            <AppRadioInput
              label="Select Space Mono Font"
              id="spaceMonoFont"
              contentClassName={clsx(
                timerSettingsModalStyles.option,
                timerSettingsModalStyles.spaceMonoFont
              )}
              activeContentClassName={timerSettingsModalStyles.active}
            >
              Aa
            </AppRadioInput>
          </div>
        </div>

        <AppSeparator />

        <div
          role="group"
          className={timerSettingsModalStyles.colorFieldSet}
          aria-labelledby="color-legend"
        >
          <div id="color-legend" className={timerSettingsModalStyles.legend}>
            Color
          </div>
          <div className={timerSettingsModalStyles.inputWrapper}>
            <AppRadioInput
              label="Select Red Color Scheme"
              id="redColor"
              contentClassName={clsx(
                timerSettingsModalStyles.option,
                timerSettingsModalStyles.themeRed
              )}
              activeContentClassName={timerSettingsModalStyles.active}
            >
              <Image
                className={timerSettingsModalStyles.themeSelected}
                src={CheckedIcon}
                alt="Selected"
              />
            </AppRadioInput>
            <AppRadioInput
              label="Select Blue Color Scheme"
              id="blueColor"
              contentClassName={clsx(
                timerSettingsModalStyles.option,
                timerSettingsModalStyles.themeBlue
              )}
              activeContentClassName={timerSettingsModalStyles.active}
            >
              <Image
                className={timerSettingsModalStyles.themeSelected}
                src={CheckedIcon}
                alt="Selected"
              />
            </AppRadioInput>
            <AppRadioInput
              label="Select Purple Color Scheme"
              id="purpleColor"
              contentClassName={clsx(
                timerSettingsModalStyles.option,
                timerSettingsModalStyles.themePurple
              )}
              activeContentClassName={timerSettingsModalStyles.active}
            >
              <Image
                className={timerSettingsModalStyles.themeSelected}
                src={CheckedIcon}
                alt="Selected"
              />
            </AppRadioInput>
          </div>
        </div>

        <button type="submit" className={timerSettingsModalStyles.submitButton}>
          Apply
        </button>
      </form>
    </Modal>
  );
};
