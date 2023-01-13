import Head from "next/head";
import { TimerPhase } from "../../../utils/timer-settings.utils";

interface IProps {
  timeString: string | null;
  phase: TimerPhase | null;
}

export const TimerTitle = ({ timeString, phase }: IProps) => {
  const phaseTitleMap: Record<TimerPhase, string> = {
    longBreak: "Take a long break",
    pomodoro: "Focus",
    shortBreak: "Take a short break",
  };

  let title = "Pomodoro timer";
  if (phase != null) {
    title = `${phaseTitleMap[phase]} | ${title}`;
  }

  if (timeString != null) {
    title = `${timeString} - ${title}`;
  }

  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};
