import styles from "./Alert.module.css";
import { type AlertType } from "../../types";

type AlertProps = {
  alert: AlertType;
};

export default function Alert({ alert }: AlertProps) {
  return alert.type !== "none" ? (
    <p className={`${styles[`alert--${alert.type}`]}`}>{alert.message}</p>
  ) : (
    <></>
  );
}
