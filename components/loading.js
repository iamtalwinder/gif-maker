import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.container}>
      <img src="/logo.png" alt="logo" />
    </div>
  );
}
