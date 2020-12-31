import { useEffect, useState } from "react";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiDownload } from "@mdi/js";
import GradientButton from "./gradientButton";

const Container = styled.div`
  transition: 0.5s ease;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  opacity: 0;
  pointer-events: none;
  width: 0;
  height: 0;

  ${(props) =>
    props.visible &&
    `
    width: 100%;
    height: 400px;
    max-width: 700px;
    opacity: 1;
    pointer-events: auto;

    & > img {
      width: 100%;
      max-width: 500px;
      height: 85%;
    }
  `}
`;

export default function Preview({ gif }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (gif) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [gif]);

  return (
    <Container visible={visible}>
      <img src={gif} />
      <GradientButton as="a" href={gif} download>
        <span>
          <Icon path={mdiDownload} size={1} verticle="true" />
        </span>
        <span>Download</span>
      </GradientButton>
    </Container>
  );
}
