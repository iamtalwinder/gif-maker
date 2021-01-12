import styled, { keyframes } from "styled-components";

const Beat = keyframes`
  0% {
    transform: scale(0.5);
  }

  50% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.5);
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  transform: scale(0.5);
  animation-duration: 2s;
  animation-name: ${Beat};
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`;

export default function Loading() {
  return (
    <Container>
      <Img src="/logo.png" alt="logo" />
    </Container>
  );
}
