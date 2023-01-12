import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  TimerPhase,
  TimerRunningStatus,
  TimerSettingsTime,
} from "../utils/timer-settings.utils";
import { useStateAndRef } from "./useStateAndRef";

const RoundsForLongBreak = 3;

export const useCountdown = (timeSettings: TimerSettingsTime) => {
  const [timeSeconds, timeSecondsRef, setTimeSeconds] = useStateAndRef<
    number | null
  >(null);

  const [status, setStatus] = useState<TimerRunningStatus>("paused");

  const [phase, phaseRef, setPhase] = useStateAndRef<TimerPhase | null>(null);

  const interval = useRef<NodeJS.Timer | null>(null);

  const savedTimeSettings = useRef<TimerSettingsTime>(timeSettings);

  const roundsCount = useRef<number>(0);

  const getProgressPercent = useCallback(() => {
    if (phaseRef.current && timeSecondsRef.current != null) {
      const totalSeconds = savedTimeSettings.current[phaseRef.current] * 60;
      const remainingSeconds = totalSeconds - timeSecondsRef.current;
      return remainingSeconds / totalSeconds;
    }

    return 0;
  }, [phaseRef, timeSecondsRef]);

  useEffect(() => {
    if (timeSecondsRef.current != null && phaseRef.current) {
      const oldSetting = savedTimeSettings.current[phaseRef.current];
      const newSetting = timeSettings[phaseRef.current];
      const settingsDiff = newSetting - oldSetting;

      setTimeSeconds(timeSecondsRef.current + settingsDiff * 60);
    }

    savedTimeSettings.current = timeSettings;
  }, [
    getProgressPercent,
    phaseRef,
    setTimeSeconds,
    timeSecondsRef,
    timeSettings,
  ]);

  const dispose = useCallback(() => {
    if (interval.current != null) {
      clearInterval(interval.current);
    }
  }, []);

  const pause = useCallback(() => {
    dispose();
    setStatus("paused");
  }, [dispose]);

  const changePhase = useCallback(
    (state: TimerPhase) => {
      const seconds = savedTimeSettings.current[state] * 60;
      setTimeSeconds(seconds);
      setPhase(state);
    },
    [setPhase, setTimeSeconds]
  );

  const onRoundEnd = useCallback(() => {
    pause();
    if (roundsCount.current < RoundsForLongBreak) {
      changePhase(phaseRef.current === "pomodoro" ? "shortBreak" : "pomodoro");
      if (phaseRef.current === "shortBreak") {
        roundsCount.current++;
      }
    } else {
      changePhase("longBreak");
      roundsCount.current = 0;
    }
  }, [changePhase, pause, phaseRef]);

  const startOrResume = useCallback(() => {
    dispose();
    interval.current = setInterval(() => {
      const timeRemaining = timeSecondsRef.current! - 1;
      if (timeRemaining <= 0) {
        setTimeSeconds(0);
        onRoundEnd();
      } else {
        setTimeSeconds(timeRemaining);
      }
    }, 1000);

    setStatus("running");
  }, [dispose, onRoundEnd, setTimeSeconds, timeSecondsRef]);

  useEffect(() => {
    return () => {
      dispose();
    };
  }, [dispose]);

  useEffect(() => {
    changePhase("pomodoro");
  }, [changePhase]);

  const timeString = useMemo(() => {
    if (timeSeconds == null) {
      return null;
    }

    const minutes = Math.floor(timeSeconds / 60);
    const seconds = timeSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, [timeSeconds]);

  return {
    status,
    timeSeconds,
    startOrResume,
    pause,
    changePhase,
    phase,
    timeString,
    progressPercent: getProgressPercent(),
  };
};
