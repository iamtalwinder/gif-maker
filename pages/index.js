import { useState, useEffect, useRef, useContext } from "react";
import Head from "next/head";
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
import ThemeToggler from "../components/themeToggler";
import styled, { ThemeContext } from "styled-components";

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.fg};
  border-bottom: 1px solid ${({ theme }) => theme.lightBorder};
  color: ${({ theme }) => theme.headingColor};
  top: 0;
  left: 0;
  width: 100%;
  position: fixed;
  height: 60px;
  display: flex;
  align-items: center;
  z-index: 10;
  justify-content: space-between;
  padding: 0 30px;
`;

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  margin: 60px auto;
  padding: 5px;

  @media (min-width: 600px) {
    width: 80vw;
  }
`;

const Instructions = styled.div`
  padding: 30px 0px;
  transition: 0.5s ease;
`;

const Heading = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.headingColor};
  text-align: center;

  @media (min-width: 1100px) {
    margin: 40px;
  }
`;

const Points = styled.div`
  margin-top: 30px;
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};

  & > div {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }

  & > div > span {
    margin-left: 5px;
  }

  @media (min-width: 1100px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const ffmpeg = createFFmpeg({ log: true });

export default function Home({ toggleTheme }) {
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState(null);
  const [gif, setGif] = useState();
  const videoRef = useRef(null);

  const theme = useContext(ThemeContext);

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
          <Nav>
            <Logo text="GIF maker" />
            <ThemeToggler toggleTheme={toggleTheme} />
          </Nav>
          <Container>
            <Input video={video} setVideo={setVideo} ref={videoRef} />
            <Controlls
              video={video}
              videoRef={videoRef}
              setGif={setGif}
              ffmpeg={ffmpeg}
            />
            <Preview gif={gif} />
            <Instructions>
              <Heading>How to Convert any video file to animated gif</Heading>
              <Points>
                <div>
                  <span>
                    <Icon
                      path={mdiFileOutline}
                      size={ICON_SIZE}
                      verticle="true"
                      color={theme.textColor}
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
                      color={theme.textColor}
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
                      color={theme.textColor}
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
                      color={theme.textColor}
                    />
                  </span>
                  <span>
                    Your new file will be ready to download immediately.
                  </span>
                </div>
              </Points>
            </Instructions>
          </Container>
        </>
      )}
    </>
  );
}
