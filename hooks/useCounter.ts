import { useCallback, useEffect, useRef } from "react";
import { setInterval } from "timers";

export const useCounter = (onCount: (diffMs: number) => void) => {
  const timer = useRef<NodeJS.Timer | null>(null);
  const counterWorker = useRef<Worker | null>(null);
  const latestTickTime = useRef<Date | null>(null);

  useEffect(() => {
    if (window.Worker) {
      counterWorker.current = new Worker(
        new URL("../workers/counter.ts", import.meta.url)
      );
    }
  }, []);

  const stop = useCallback(() => {
    if (timer.current != null) {
      clearInterval(timer.current);
    }

    if (counterWorker.current) {
      counterWorker.current.postMessage("stop");
    }
  }, []);

  const start = useCallback(() => {
    stop();

    latestTickTime.current = new Date();

    const onTick = () => {
      const currentTickTime = new Date();
      let timeDiffMs = 0;
      if (latestTickTime.current) {
        timeDiffMs =
          currentTickTime.getTime() - latestTickTime.current.getTime();
      }

      onCount(timeDiffMs);
      latestTickTime.current = currentTickTime;
    };

    if (counterWorker.current) {
      counterWorker.current.onmessage = () => {
        onTick();
      };
      counterWorker.current.postMessage("start");
    } else {
      timer.current = setInterval(onTick);
    }
  }, [onCount, stop]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return { start, stop };
};
