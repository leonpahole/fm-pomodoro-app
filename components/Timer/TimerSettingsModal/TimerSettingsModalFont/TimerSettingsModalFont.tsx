import clsx from "clsx";
import styles from "./TimerSettingsModalFont.module.scss";
import { AppRadioInput } from "../../../shared/AppRadioInput/AppRadioInput";
import { Font } from "../../../../utils/font-family.utils";
import { AppErrorText } from "../../../shared/AppErrorText/AppErrorText";

interface IProps {
  selectedFont: Font;
  onSelect(font: Font): void;
  error?: string;
}

export const TimerSettingsModalFont = ({
  selectedFont,
  onSelect,
  error,
}: IProps) => {
  const fontsMap: Record<Font, { label: string; className: string }> = {
    "kumbh-sans-font": {
      label: "Select Kumbh Sans Font",
      className: styles.kumbhSansFont,
    },
    "roboto-slab-font": {
      label: "Select Roboto Slab Font",
      className: styles.robotoSlabFont,
    },
    "space-mono-font": {
      label: "Select Space Mono Font",
      className: styles.spaceMonoFont,
    },
  };

  const errorTextId = `font-input-error`;

  return (
    <div
      role="group"
      className={styles.fontFieldSet}
      aria-labelledby="font-legend"
    >
      <div id="font-legend" className={styles.legend}>
        Font
      </div>
      <div className={styles.inputAndErrorWrapper}>
        <div
          className={styles.inputWrapper}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? errorTextId : undefined}
        >
          {Object.entries(fontsMap).map(([font, settings]) => (
            <AppRadioInput
              key={font}
              label={settings.label}
              id={font}
              contentClassName={clsx(styles.option, settings.className)}
              selectedContentClassName={styles.selected}
              isSelected={selectedFont === font}
              onSelect={() => {
                onSelect(font as Font);
              }}
            >
              Aa
            </AppRadioInput>
          ))}
        </div>
        <AppErrorText id={errorTextId} text={error} />
      </div>
    </div>
  );
};
