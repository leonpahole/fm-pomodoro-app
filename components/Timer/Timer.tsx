import { TimerCountdown } from "./TimerCountdown/TimerCountdown";
import { TimerPhaseBar } from "./TimerPhaseBar/TimerPhaseBar";
import { TimerSettings } from "./TimerSettings/TimerSettings";
import styles from "./Timer.module.scss";
import { useTimerSettings } from "../../utils/timer-settings.utils";
import { usePomodoro } from "../../hooks/usePomodoro";
import { TimerTitle } from "./TimerTitle/TimerTitle";

export const Timer = () => {
  const timerSettings = useTimerSettings((s) => s.settings);
  const {
    changePhase,
    phase,
    timeString,
    runningStatus,
    startOrResume,
    pause,
    progressPercent,
  } = usePomodoro(timerSettings.time);

  return (
    <>
      <TimerTitle timeString={timeString} phase={phase} />
      <main className={styles.wrapper}>
        <TimerPhaseBar selectedPhase={phase} onSelect={changePhase} />
        <TimerCountdown
          timeString={timeString}
          runningStatus={runningStatus}
          onPause={pause}
          onStartOrResume={startOrResume}
          progressPercent={progressPercent}
        />
        <TimerSettings />
      </main>
    </>
  );
};
