import Image from "next/image";
import clsx from "clsx";
import appNumberInputStyles from "./AppNumberInput.module.scss";
import UpButton from "../../../public/icon-arrow-up.svg";
import DownButton from "../../../public/icon-arrow-down.svg";

interface IProps {
  id: string;
  label: string;
  className?: string;
}

export const AppNumberInput = ({ id, label, className }: IProps) => {
  return (
    <label htmlFor={id} className={clsx(appNumberInputStyles.label, className)}>
      <span className={appNumberInputStyles.labelText}>{label}</span>
      <div className={appNumberInputStyles.inputWrapper}>
        <input type="number" id={id} className={appNumberInputStyles.input} />
        <div className={appNumberInputStyles.arrowsWrapper}>
          <button
            type="button"
            aria-label="Increment the value"
            className={appNumberInputStyles.arrowButton}
          >
            <Image src={UpButton} alt="" />
          </button>
          <button
            type="button"
            aria-label="Decrement the value"
            className={appNumberInputStyles.arrowButton}
          >
            <Image src={DownButton} alt="" />
          </button>
        </div>
      </div>
    </label>
  );
};
