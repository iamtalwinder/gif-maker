import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Loading from "../components/loading";
import Input from "../components/input";
import Controlls from "../components/controlls";
import Preview from "../components/preview";
import { createFFmpeg } from "@ffmpeg/ffmpeg";
import Icon from "@mdi/react";
import {
  mdiFileOutline,
  mdiTransfer,
  mdiDownload,
  mdiClockOutline,
} from "@mdi/js";
import Logo from "../components/logo";
import styled from "styled-components";

const NavLogo = styled(Logo)`
  margin-left: 30px;
`;

const ffmpeg = createFFmpeg({ log: true });

export default function Home() {
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState(null);
  const [gif, setGif] = useState();
  const videoRef = useRef(null);

  const ICON_SIZE = 1.4;

  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  };

  useEffect(() => {
    if (!ffmpeg.isLoaded()) {
      load();
    }
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/logo.png" />
        <title>GIF maker</title>
        <meta
          name="description"
          content="An awesome tool to convert video files to animated gifs in seconds"
        ></meta>
      </Head>

      {!ready && <Loading />}

      {ready && (
        <>
          <nav className={styles.nav}>
            <NavLogo text="GIF maker" />
          </nav>
          <div className={styles.container}>
            <Input video={video} setVideo={setVideo} ref={videoRef} />
            <div className={styles.controlls}>
              <Controlls
                video={video}
                videoRef={videoRef}
                setGif={setGif}
                ffmpeg={ffmpeg}
              />
            </div>
            <div className={styles.preview}>
              <Preview gif={gif} />
            </div>
            <div className={styles.instruction}>
              <div className={styles.heading}>
                How to Convert any video file to animated gif
              </div>
              <div className={styles.points}>
                <div>
                  <span>
                    <Icon
                      path={mdiFileOutline}
                      size={ICON_SIZE}
                      verticle="true"
                      color="#505050"
                    />
                  </span>
                  <span>Select any video file you wish to convert.</span>
                </div>
                <div>
                  <span>
                    <Icon
                      path={mdiClockOutline}
                      size={ICON_SIZE}
                      verticle="true"
                      color="#505050"
                    />
                  </span>
                  <span>
                    Select the part of the video to convert into a gif and press
                    convert button.
                  </span>
                </div>
                <div>
                  <span>
                    <Icon
                      path={mdiTransfer}
                      size={ICON_SIZE}
                      verticle="true"
                      color="#505050"
                    />
                  </span>
                  <span>
                    Our free GIF maker will convert your video file to an
                    animated gif in seconds.
                  </span>
                </div>
                <div>
                  <span>
                    <Icon
                      path={mdiDownload}
                      size={ICON_SIZE}
                      verticle="true"
                      color="#505050"
                    />
                  </span>
                  <span>
                    Your new file will be ready to download immediately.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
