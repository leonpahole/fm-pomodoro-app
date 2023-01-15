import clsx from "clsx";
import Image from "next/image";
import { ColorTheme } from "../../../../utils/color-theme";
import CheckedIcon from "../../../../public/icon-checked.svg";
import { AppRadioInput } from "../../../shared/AppRadioInput/AppRadioInput";
import styles from "./TimerSettingsModalColorTheme.module.scss";
import { AppErrorText } from "../../../shared/AppErrorText/AppErrorText";

interface IProps {
  selectedColorTheme: ColorTheme;
  onSelect(theme: ColorTheme): void;
  error?: string;
}

export const TimerSettingsModalColorTheme = ({
  selectedColorTheme,
  onSelect,
  error,
}: IProps) => {
  const colorThemesMap: Record<
    ColorTheme,
    { label: string; className: string }
  > = {
    red: {
      label: "Select Red Color Scheme",
      className: styles.themeRed,
    },
    blue: {
      label: "Select Blue Color Scheme",
      className: styles.themeBlue,
    },
    purple: {
      label: "Select Purple Color Scheme",
      className: styles.themePurple,
    },
  };

  const errorTextId = `color-input-error`;

  return (
    <div
      role="group"
      className={styles.colorFieldSet}
      aria-labelledby="color-legend"
    >
      <div id="color-legend" className={styles.legend}>
        Color
      </div>
      <div className={styles.inputAndErrorWrapper}>
        <div className={styles.inputWrapper}>
          {Object.entries(colorThemesMap).map(([color, settings]) => (
            <AppRadioInput
              key={color}
              label={settings.label}
              id={color}
              contentClassName={clsx(styles.option, settings.className)}
              selectedContentClassName={styles.selected}
              isSelected={selectedColorTheme === color}
              onSelect={() => {
                onSelect(color as ColorTheme);
              }}
            >
              {selectedColorTheme === color && (
                <Image
                  className={styles.themeSelected}
                  src={CheckedIcon}
                  alt="Selected"
                />
              )}
            </AppRadioInput>
          ))}
        </div>
        <AppErrorText id={errorTextId} text={error} />
      </div>
    </div>
  );
};
