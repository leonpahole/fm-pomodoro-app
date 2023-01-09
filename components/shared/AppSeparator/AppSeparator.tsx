import clsx from "clsx";
import appSeparatorStyles from "./AppSeparator.module.scss";

interface IProps {
  className?: string;
}

export const AppSeparator = ({ className }: IProps) => {
  return <hr className={clsx(appSeparatorStyles.separator, className)} />;
};
