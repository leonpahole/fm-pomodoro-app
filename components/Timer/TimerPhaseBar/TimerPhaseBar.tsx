import clsx from "clsx";
import timerPhaseBarStyles from "./TimerPhaseBar.module.scss";

export const TimerPhaseBar = () => {
  return (
    <section className={timerPhaseBarStyles.wrapper}>
      <div className={timerPhaseBarStyles.pillWrapper}>
        <div
          className={clsx(timerPhaseBarStyles.pill, {
            [timerPhaseBarStyles.active]: true,
          })}
        >
          Pomodoro
        </div>
        <div className={clsx(timerPhaseBarStyles.pill)}>Short break</div>
        <div className={clsx(timerPhaseBarStyles.pill)}>Long break</div>
      </div>
    </section>
  );
};
