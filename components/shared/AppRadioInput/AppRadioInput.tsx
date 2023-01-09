import clsx from "clsx";
import appRadioInputStyles from "./AppRadioInput.module.scss";

interface IProps {
  id: string;
  label: string;
  contentClassName?: string;
  activeContentClassName?: string;
  children?: React.ReactNode;
}

export const AppRadioInput = ({
  id,
  label,
  contentClassName,
  activeContentClassName = "",
  children,
}: IProps) => {
  return (
    <label htmlFor={id} className={appRadioInputStyles.label}>
      <input
        type="radio"
        id={id}
        value="small"
        checked
        className={appRadioInputStyles.radio}
      />
      <div
        aria-label={label}
        className={clsx(appRadioInputStyles.content, contentClassName, {
          [activeContentClassName]: true,
        })}
      >
        {children}
      </div>
    </label>
  );
};
