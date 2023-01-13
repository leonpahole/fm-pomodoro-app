import { useCallback, useEffect, useRef, useState } from "react";
import {
  TimerPhase,
  TimerRunningStatus,
  TimerSettingsTime,
} from "../utils/timer-settings.utils";
import { useAudio } from "./useAudio";
import { useCounter } from "./useCounter";
import { useStateAndRef } from "./useStateAndRef";

const RoundsForLongBreak = 3;

export const usePomodoro = (timeSettings: TimerSettingsTime) => {
  const [timeRemainingMs, timeRemainingMsRef, setTimeRemainingMs] =
    useStateAndRef<number | null>(null);
  const [runningStatus, setRunningStatus] =
    useState<TimerRunningStatus>("paused");
  const [phase, phaseRef, setPhase] = useStateAndRef<TimerPhase | null>(null);
  const roundsCount = useRef<number>(0);

  const savedTimeSettings = useRef<TimerSettingsTime>(timeSettings);

  const alarmSound = useAudio("/alarm.wav");

  const changePhase = useCallback(
    (newPhase: TimerPhase) => {
      setTimeRemainingMs(savedTimeSettings.current[newPhase] * 60 * 1000);
      setPhase(newPhase);
    },
    [setPhase, setTimeRemainingMs]
  );

  const onRoundEnd = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    pause();

    alarmSound.play();

    if (roundsCount.current < RoundsForLongBreak) {
      if (phaseRef.current === "pomodoro") {
        roundsCount.current++;
      }

      changePhase(phaseRef.current === "pomodoro" ? "shortBreak" : "pomodoro");
    } else {
      changePhase("longBreak");
      roundsCount.current = 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changePhase, phaseRef]);

  const onTimerTick = useCallback(
    (timeDiffMs: number) => {
      const newTimeRemainingMs = timeRemainingMsRef.current! - timeDiffMs;
      if (newTimeRemainingMs <= 0) {
        setTimeRemainingMs(0);
        onRoundEnd();
      } else {
        setTimeRemainingMs(newTimeRemainingMs);
      }
    },
    [onRoundEnd, setTimeRemainingMs, timeRemainingMsRef]
  );

  const { start: startCounter, stop: stopCounter } = useCounter(onTimerTick);

  const pause = useCallback(() => {
    stopCounter();
    setRunningStatus("paused");
  }, [stopCounter]);

  // change timer state when settings change
  useEffect(() => {
    if (timeRemainingMsRef.current != null && phaseRef.current) {
      const oldSetting = savedTimeSettings.current[phaseRef.current];
      const newSetting = timeSettings[phaseRef.current];
      const settingsDiff = newSetting - oldSetting;

      setTimeRemainingMs(timeRemainingMsRef.current + settingsDiff * 60 * 1000);
    }

    savedTimeSettings.current = timeSettings;
  }, [phaseRef, setTimeRemainingMs, timeRemainingMsRef, timeSettings]);

  const startOrResume = useCallback(() => {
    stopCounter();
    startCounter();
    setRunningStatus("running");
  }, [startCounter, stopCounter]);

  useEffect(() => {
    changePhase("pomodoro");
  }, [changePhase]);

  const getTimeString = () => {
    if (timeRemainingMs == null) {
      return null;
    }

    const timeRemainingSeconds = Math.round(timeRemainingMs / 1000);

    const minutes = Math.floor(timeRemainingSeconds / 60);
    const seconds = timeRemainingSeconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const getProgressPercent = () => {
    if (phaseRef.current && timeRemainingMsRef.current != null) {
      const totalMs = savedTimeSettings.current[phaseRef.current] * 60 * 1000;
      const progressMs = totalMs - timeRemainingMsRef.current;
      return progressMs / totalMs;
    }

    return 0;
  };

  return {
    runningStatus,
    startOrResume,
    pause,
    changePhase,
    phase,
    timeString: getTimeString(),
    progressPercent: getProgressPercent(),
  };
};
