import { useRef, useEffect, useCallback } from "react";

export const useAudio = (src: string) => {
  const audio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audio.current = new Audio(src);
  }, [src]);

  const play = useCallback(() => {
    try {
      audio.current?.play();
    } catch (e) {
      console.error(`Error while playing audio ${src}`, e);
    }
  }, [src]);

  return { play };
};
