import { getColorTheme } from "../../../utils/color-theme";
import {
  TimerRunningStatus,
  useTimerSettings,
} from "../../../utils/timer-settings.utils";
import styles from "./TimerCountdown.module.scss";

interface IProps {
  timeString: string | null;
  status: TimerRunningStatus;
  onPause(): void;
  onStartOrResume(): void;
  progressPercent: number;
}

export const TimerCountdown = ({
  timeString,
  status,
  onPause,
  onStartOrResume,
  progressPercent,
}: IProps) => {
  const colorTheme = useTimerSettings((s) => s.settings.color);
  const colorPrimary = getColorTheme(colorTheme).primary;

  const buttonMap: Record<
    TimerRunningStatus,
    { text: string; onClick: () => void }
  > = {
    paused: {
      text: "Start",
      onClick: onStartOrResume,
    },
    running: {
      text: "Pause",
      onClick: onPause,
    },
  };

  const progressInDegrees = Math.round(progressPercent * 360);
  const progressGradient = `conic-gradient(${colorPrimary} ${progressInDegrees}deg, transparent 0deg)`;

  return (
    <section className={styles.wrapper}>
      <div className={styles.outerCircle}>
        <div className={styles.innerCircle}>
          <div
            className={styles.progressCircle}
            style={{
              background: progressGradient,
            }}
          >
            <div className={styles.statusCircle}>
              <p className={styles.time}>{timeString ?? ""}</p>
              <button
                className={styles.button}
                type="button"
                onClick={buttonMap[status].onClick}
              >
                {buttonMap[status].text}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
