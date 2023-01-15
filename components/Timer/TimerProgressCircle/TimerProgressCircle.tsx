import styles from "./TimerProgressCircle.module.scss";

interface IProps {
  progressPercent: number;
}

export const TimerProgressCircle = ({ progressPercent }: IProps) => {
  if (progressPercent === 0) {
    return null;
  }

  const viewBoxUnit = 100;
  const strokeWidthPercent = 3;

  const radiusPercent = 50 - strokeWidthPercent * 0.5;

  const circumference = Math.PI * 2 * (radiusPercent / 100) * viewBoxUnit;

  return (
    <svg
      viewBox={`0 0 ${viewBoxUnit} ${viewBoxUnit}`}
      className={styles.circularChart}
    >
      <circle
        className={styles.circle}
        cx="50%"
        cy="50%"
        fill="transparent"
        r={`${radiusPercent}%`}
        strokeWidth={`${strokeWidthPercent}%`}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={circumference - circumference * progressPercent}
      />
    </svg>
  );
};
