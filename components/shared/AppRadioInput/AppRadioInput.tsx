import clsx from "clsx";
import appRadioInputStyles from "./AppRadioInput.module.scss";

interface IProps {
  id: string;
  label: string;
  isSelected: boolean;
  onSelect(): void;
  contentClassName?: string;
  selectedContentClassName?: string;
  children?: React.ReactNode;
}

export const AppRadioInput = ({
  id,
  label,
  isSelected,
  onSelect,
  contentClassName,
  selectedContentClassName = "",
  children,
}: IProps) => {
  return (
    <label htmlFor={id} className={appRadioInputStyles.label}>
      <input
        type="radio"
        id={id}
        value="small"
        checked={isSelected}
        className={appRadioInputStyles.radio}
        onChange={onSelect}
      />
      <div
        aria-label={label}
        className={clsx(appRadioInputStyles.content, contentClassName, {
          [selectedContentClassName]: isSelected,
        })}
      >
        {children}
      </div>
    </label>
  );
};
