import { TimerSettingsTime } from "../../../../utils/timer-settings.utils";
import { AppNumberInput } from "../../../shared/AppNumberInput/AppNumberInput";
import styles from "./TimerSettingsModalTime.module.scss";

interface IProps {
  time: TimerSettingsTime;
  onChange(time: TimerSettingsTime): void;
}

export const TimerSettingsModalTime = ({ time, onChange }: IProps) => {
  const onPartialValueChange = (val: Partial<TimerSettingsTime>) => {
    onChange({
      ...time,
      ...val,
    });
  };

  return (
    <div
      role="group"
      className={styles.timeFieldSet}
      aria-labelledby="time-legend"
    >
      <div id="time-legend" className={styles.legend}>
        Time (minutes)
      </div>

      <div className={styles.inputWrapper}>
        <AppNumberInput
          id="pomodoroTime"
          label="Pomodoro"
          className={styles.input}
          value={time.pomodoro}
          onChange={(pomodoro) => {
            onPartialValueChange({ pomodoro });
          }}
        />
        <AppNumberInput
          id="shortBreakTime"
          label="Short break"
          className={styles.input}
          value={time.shortBreak}
          onChange={(shortBreak) => {
            onPartialValueChange({ shortBreak });
          }}
        />
        <AppNumberInput
          id="longBreakTime"
          label="Long break"
          className={styles.input}
          value={time.longBreak}
          onChange={(longBreak) => {
            onPartialValueChange({ longBreak });
          }}
        />
      </div>
    </div>
  );
};
