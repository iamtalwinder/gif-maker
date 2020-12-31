import { useEffect, useRef, forwardRef } from "react";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiFilePlusOutline } from "@mdi/js";
import GradientButton from "./gradientButton";
import Container from "./container";
import Logo from "./logo";

const InputContainer = styled(Container)`
  display: block;
  padding: 20px;
  background-color: #ffffff;
`;

const ChangeFileButton = styled(GradientButton)`
  border-radius: 20px;
  float: right;
  margin-bottom: 5px;
  padding: 6px;
  font-size: 12px;
`;

const InputLogo = styled(Logo)`
  margin-bottom: 15px;
`;

const Input = styled.input`
  display: none;
`;

const Video = styled.video`
  width: 100%;
  height: 75%;
`;

const DropArea = styled.div`
  width: 100%;
  height: 75%;
  background: inherit;
  border: 2px dashed #313131;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  color: #505050;
`;

export default forwardRef(({ video, setVideo }, ref) => {
  const input = useRef(null);
  const dropArea = useRef(null);
  const container = useRef(null);

  const clickInput = () => {
    input.current.click();
  };

  useEffect(() => {
    if (!dropArea.current) {
      return;
    }

    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      container.current.addEventListener(eventName, preventDefaults);
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
      <Input
        type="file"
        onChange={(e) => setVideo(e.target.files?.item(0))}
        ref={input}
      />

      <InputContainer ref={container} visible={true}>
        <InputLogo text="Online GIF Maker" />
        {video && (
          <ChangeFileButton onClick={clickInput}>Change file</ChangeFileButton>
        )}
        {video ? (
          <Video
            className={styles.video}
            controls
            src={URL.createObjectURL(video)}
            ref={ref}
          />
        ) : (
          <DropArea onClick={clickInput} ref={dropArea}>
            <p>Easily convert videos to gifs</p>
            <GradientButton>
              <span>
                <Icon path={mdiFilePlusOutline} size={1} verticle="true" />
              </span>
              <span>CHOOSE FILE</span>
            </GradientButton>
            <p>or drop file here</p>
          </DropArea>
        )}
      </InputContainer>
    </>
  );
});
