import { useEffect, useRef, forwardRef } from "react";
import styles from "./input.module.css";
import Icon from "@mdi/react";
import { mdiFilePlusOutline } from "@mdi/js";

export default forwardRef(({ video, setVideo }, ref) => {
  const input = useRef(null);
  const dropArea = useRef(null);

  const clickInput = () => {
    input.current.click();
  };

  useEffect(() => {
    if (!dropArea.current) {
      return;
    }

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

      <div className={styles.container}>
        <div className={styles.logo}>
          <img src="/logo.png" /> <span>Online GIF Maker</span>
        </div>
        {video && (
          <button className={styles.changeFile} onClick={clickInput}>
            Change file
          </button>
        )}
        {video ? (
          <video
            className={styles.video}
            controls
            src={URL.createObjectURL(video)}
            ref={ref}
          ></video>
        ) : (
          <div className={styles.dropArea} onClick={clickInput} ref={dropArea}>
            <p>Easily convert videos to gifs</p>
            <button className={styles.chooseFile}>
              <span>
                <Icon path={mdiFilePlusOutline} size={1} verticle="true" />
              </span>
              <span>CHOOSE FILE</span>
            </button>
            <p>or drop file here</p>
          </div>
        )}
      </div>
    </>
  );
});
