import clsx from "clsx";
import { TimerPhase } from "../../../utils/timer-settings.utils";
import timerPhaseBarStyles from "./TimerPhaseBar.module.scss";

interface IProps {
  selectedPhase: TimerPhase | null;
  onSelect: (phase: TimerPhase) => void;
}

export const TimerPhaseBar = ({ selectedPhase, onSelect }: IProps) => {
  const phases: Record<TimerPhase, { name: string }> = {
    pomodoro: {
      name: "Pomodoro",
    },
    shortBreak: {
      name: "Short break",
    },
    longBreak: {
      name: "Long break",
    },
  };

  return (
    <section className={timerPhaseBarStyles.wrapper}>
      <div className={timerPhaseBarStyles.pillWrapper}>
        {Object.entries(phases).map(([phase, { name }]) => (
          <button
            key={phase}
            className={clsx(timerPhaseBarStyles.pill, {
              [timerPhaseBarStyles.active]: selectedPhase === phase,
            })}
            type="button"
            onClick={() => {
              onSelect(phase as TimerPhase);
            }}
          >
            {name}
          </button>
        ))}
      </div>
    </section>
  );
};
