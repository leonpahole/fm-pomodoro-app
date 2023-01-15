import Image from "next/image";
import clsx from "clsx";
import styles from "./AppNumberInput.module.scss";
import UpButton from "../../../public/icon-arrow-up.svg";
import DownButton from "../../../public/icon-arrow-down.svg";
import { AppErrorText } from "../AppErrorText/AppErrorText";

interface IProps {
  id: string;
  label: string;
  className?: string;
  value: number;
  onChange(value: number): void;
  error?: string;
}

export const AppNumberInput = ({
  id,
  label,
  className,
  value,
  onChange,
  error,
}: IProps) => {
  const onArrowClick = (direction: -1 | 1) => {
    onChange(value + direction);
  };

  const onStrValueChange = (val: string) => {
    const match = val.match(/[0-9]+/);
    let num = 0;
    if (match) {
      num = parseInt(match?.[0], 10) || 0;
    }

    onChange(num);
  };

  const errorTextId = `${id}-error`;

  return (
    <label htmlFor={id} className={clsx(styles.label, className)}>
      <span className={styles.labelText}>{label}</span>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          id={id}
          className={styles.input}
          value={value}
          onChange={(e) => onStrValueChange(e.target.value)}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? errorTextId : undefined}
        />
        <div className={styles.arrowsWrapper}>
          <button
            type="button"
            aria-label="Increment the value"
            className={styles.arrowButton}
            onClick={() => {
              onArrowClick(1);
            }}
          >
            <Image src={UpButton} alt="" />
          </button>
          <button
            type="button"
            aria-label="Decrement the value"
            className={styles.arrowButton}
            onClick={() => {
              onArrowClick(-1);
            }}
          >
            <Image src={DownButton} alt="" />
          </button>
        </div>
      </div>
      <AppErrorText id={errorTextId} text={error} />
    </label>
  );
};
