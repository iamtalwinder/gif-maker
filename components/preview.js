import { useEffect, useRef } from "react";
import Icon from "@mdi/react";
import { mdiDownload } from "@mdi/js";
import styles from "./preview.module.css";

export default function Preview({ gif }) {
  const container = useRef(null);

  useEffect(() => {
    if (gif) {
      container.current.classList.add(styles.visible);
    } else {
      container.current.classList.remove(styles.visible);
    }
  }, [gif]);

  return (
    <div className={styles.container} ref={container}>
      <img src={gif} />
      <a href={gif} download>
        <button>
          <span>
            <Icon path={mdiDownload} size={1} verticle="true" />
          </span>
          <span>Download</span>
        </button>
      </a>
    </div>
  );
}
