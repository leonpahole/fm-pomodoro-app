import styles from "./AppErrorText.module.scss";

interface IProps {
  id: string;
  text?: string;
}

export const AppErrorText = ({ id, text }: IProps) => {
  if (!text) {
    return null;
  }

  return (
    <strong id={id} className={styles.errorText}>
      {text}
    </strong>
  );
};
