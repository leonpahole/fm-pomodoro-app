import { TimerCountdown } from "./TimerCountdown/TimerCountdown";
import { TimerPhaseBar } from "./TimerPhaseBar/TimerPhaseBar";
import { TimerSettings } from "./TimerSettings/TimerSettings";
import styles from "./Timer.module.scss";

export const Timer = () => {
  return (
    <main className={styles.wrapper}>
      <TimerPhaseBar />
      <TimerCountdown />
      <TimerSettings />
    </main>
  );
};
