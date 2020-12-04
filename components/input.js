import { useEffect, useRef } from "react";
import styles from "./input.module.css";
import Icon from "@mdi/react";
import { mdiFilePlusOutline, mdiChevronDown } from "@mdi/js";

export default function Input({ setVideo }) {
  const input = useRef(null);
  const dropArea = useRef(null);

  const clickInput = () => {
    input.current.click();
  };

  useEffect(() => {
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      dropArea.current.addEventListener(eventName, preventDefaults);
    });

    dropArea.current.addEventListener("drop", (e) => {
      setVideo(e.dataTransfer.files[0]);
    });
  }, []);

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <>
      <input
        className={styles.input}
        type="file"
        onChange={(e) => setVideo(e.target.files?.item(0))}
        ref={input}
      />

      <div className={styles.dropZone} onClick={clickInput} ref={dropArea}>
        <div className={styles.inner}>
          <div className={styles.buttons}>
            <button>
              <span>
                <Icon path={mdiFilePlusOutline} size={1} verticle="true" />
              </span>
              <span>CHOOSE FILE</span>
            </button>
            <button>
              <span>
                <Icon path={mdiChevronDown} size={1} verticle="true" />
              </span>
            </button>
          </div>
          <p>or drop file here</p>
        </div>
      </div>
    </>
  );
}
