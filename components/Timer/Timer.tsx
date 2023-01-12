import Head from "next/head";
import { TimerCountdown } from "./TimerCountdown/TimerCountdown";
import { TimerPhaseBar } from "./TimerPhaseBar/TimerPhaseBar";
import { TimerSettings } from "./TimerSettings/TimerSettings";
import styles from "./Timer.module.scss";
import { useCountdown } from "../../hooks/useCountdown";
import { useTimerSettings } from "../../utils/timer-settings.utils";

export const Timer = () => {
  const timerSettings = useTimerSettings((s) => s.settings);
  const {
    changePhase,
    phase,
    timeString,
    status,
    startOrResume,
    pause,
    progressPercent,
  } = useCountdown(timerSettings.time);

  let title = "Pomodoro timer";
  if (timeString != null) {
    title = `${timeString} | ${title}`;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className={styles.wrapper}>
        <TimerPhaseBar selectedPhase={phase} onSelect={changePhase} />
        <TimerCountdown
          timeString={timeString}
          status={status}
          onPause={pause}
          onStartOrResume={startOrResume}
          progressPercent={progressPercent}
        />
        <TimerSettings />
      </main>
    </>
  );
};
