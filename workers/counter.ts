/* eslint-disable no-restricted-globals */

let timerId: NodeJS.Timer | null = null;

const clear = () => {
  if (timerId == null) {
    return;
  }

  clearInterval(timerId);
};

self.onmessage = (e: MessageEvent<"start" | "stop">) => {
  clear();

  if (e.data === "start") {
    timerId = setInterval(() => {
      self.postMessage("");
    }, 1000);
  }
};

export {};
