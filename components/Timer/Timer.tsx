import { TimerCountdown } from "./TimerCountdown/TimerCountdown";
import { TimerPhaseBar } from "./TimerPhaseBar/TimerPhaseBar";
import { TimerSettings } from "./TimerSettings/TimerSettings";

export const Timer = () => {
  return (
    <main>
      <TimerPhaseBar />
      <TimerCountdown />
      <TimerSettings />
    </main>
  );
};
