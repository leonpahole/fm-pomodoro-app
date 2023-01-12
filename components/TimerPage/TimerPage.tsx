import Head from "next/head";
import { Timer } from "../Timer/Timer";
import { TimerPageHeader } from "../TimerPageHeader/TimerPageHeader";

export const TimerPage = () => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="An amazing Pomodoro technique timer"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <TimerPageHeader />
      <Timer />
    </>
  );
};
