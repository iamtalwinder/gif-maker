import { useEffect, useState } from "react";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiDownload } from "@mdi/js";
import GradientButton from "./gradientButton";
import Container from "./container";

const PreviewContainer = styled(Container)`
  transition: 0.5s ease;
  border: 1px solid #ccc;
  margin-top: 20px;

  ${(props) =>
    props.visible &&
    `
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
    <PreviewContainer visible={visible}>
      <img src={gif} />
      <GradientButton as="a" href={gif} download>
        <span>
          <Icon path={mdiDownload} size={1} verticle="true" />
        </span>
        <span>Download</span>
      </GradientButton>
    </PreviewContainer>
  );
}
