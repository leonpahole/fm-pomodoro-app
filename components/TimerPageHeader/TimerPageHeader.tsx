import timerPageHeaderStyles from "./TimerPageHeader.module.scss";

export const TimerPageHeader = () => {
  return (
    <header className={timerPageHeaderStyles.heading}>
      <h1 className={timerPageHeaderStyles.logo}>Pomodoro</h1>
    </header>
  );
};
