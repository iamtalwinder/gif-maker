import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const ffmpeg = createFFmpeg({ log: true });

export default function Home() {
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState();

  const convertToGif = async () => {
    ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video));

    await ffmpeg.run(
      "-i",
      "test.mp4",
      "-t",
      "5",
      "-ss",
      "20",
      "-f",
      "gif",
      "out.gif"
    );

    const data = ffmpeg.FS("readFile", "out.gif");

    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: "image/gif" })
    );

    setGif(url);
  };

  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>GIF maker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {ready ? (
        <div>
          {video && (
            <video
              controls
              width="250"
              src={URL.createObjectURL(video)}
            ></video>
          )}

          <input
            type="file"
            onChange={(e) => setVideo(e.target.files?.item(0))}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <h3>Result</h3>

      <button onClick={convertToGif}>Convert</button>

      {gif && (
        <>
          <img src={gif} width="250" />
          <a href={gif} download>
            download
          </a>
        </>
      )}
    </div>
  );
}
