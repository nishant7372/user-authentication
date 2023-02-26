import styles from "./message.module.css";

export default function Successful({ successful }) {
  return <div className={styles["successful"]}>✔ {successful}</div>;
}
