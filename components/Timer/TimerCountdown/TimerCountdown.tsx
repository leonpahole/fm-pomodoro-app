import { TimerRunningStatus } from "../../../utils/timer-settings.utils";
import { TimerProgressCircle } from "../TimerProgressCircle/TimerProgressCircle";
import styles from "./TimerCountdown.module.scss";

interface IProps {
  timeString: string | null;
  runningStatus: TimerRunningStatus;
  onPause(): void;
  onStartOrResume(): void;
  progressPercent: number;
}

export const TimerCountdown = ({
  timeString,
  runningStatus,
  onPause,
  onStartOrResume,
  progressPercent,
}: IProps) => {
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

  return (
    <section className={styles.wrapper}>
      <div className={styles.outerCircle}>
        <div className={styles.innerCircle}>
          <div className={styles.progressCircle}>
            <TimerProgressCircle progressPercent={progressPercent} />
            <div className={styles.statusCircle}>
              <p className={styles.time}>{timeString ?? ""}</p>
              <button
                className={styles.button}
                type="button"
                onClick={buttonMap[runningStatus].onClick}
              >
                {buttonMap[runningStatus].text}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
