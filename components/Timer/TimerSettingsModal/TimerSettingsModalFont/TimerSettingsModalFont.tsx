import clsx from "clsx";
import styles from "./TimerSettingsModalFont.module.scss";
import { AppRadioInput } from "../../../shared/AppRadioInput/AppRadioInput";
import { Font } from "../../../../utils/font-family.utils";

interface IProps {
  selectedFont: Font;
  onSelect(font: Font): void;
}

export const TimerSettingsModalFont = ({ selectedFont, onSelect }: IProps) => {
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

  return (
    <div
      role="group"
      className={styles.fontFieldSet}
      aria-labelledby="font-legend"
    >
      <div id="font-legend" className={styles.legend}>
        Font
      </div>
      <div className={styles.inputWrapper}>
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
    </div>
  );
};
