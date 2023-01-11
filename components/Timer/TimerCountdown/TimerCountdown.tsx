import styles from "./TimerCountdown.module.scss";

export const TimerCountdown = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.outerCircle}>
        <div className={styles.innerCircle}>
          <div className={styles.progressCircle}>
            <div className={styles.statusCircle}>
              <p className={styles.time}>17:59</p>
              <button className={styles.button} type="button">
                Pause
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
