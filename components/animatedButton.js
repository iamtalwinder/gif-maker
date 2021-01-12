import styled, { keyframes } from "styled-components";

const ScaleIn = keyframes`
    from {
      transform: scale(0.5, 0.5);
      opacity: 0.5;
    }

    to {
      transform: scale(2.5, 2.5);
      opacity: 0;
    }
`;

const Button = styled.button`
  max-width: 600px;
  max-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
  padding: 40px;
  outline: none;
  border: none;
  cursor: pointer;
  background: ${({ theme }) => theme.bg};
`;

const Circle = styled.div`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  position: absolute;
  opacity: 0;
  animation: ${ScaleIn} 4s infinite cubic-bezier(0.36, 0.11, 0.89, 0.32);
  animation-delay: ${(props) =>
    props.animationDelay ? props.animationDelay : "0s"};
  background-image: linear-gradient(
    to right,
    #29ad37 0%,
    #8cc220 51%,
    #29ad37 100%
  );
`;

const Text = styled.p`
  z-index: 10;
  color: #ffffff;
  font-weight: bold;
  position: absolute;
`;

const Item = styled.div`
  z-index: 9;
  padding: 5px;

  border-radius: 50%;
  padding: 30px;
  transition: 0.5s;
  box-shadow: 0 0 20px #eee;
  background-size: 200% auto;

  background-image: linear-gradient(
    to right,
    #29ad37 0%,
    #8cc220 51%,
    #29ad37 100%
  );
`;

export default function AnimatedButton({ loading, text, loadingText }) {
  return (
    <Button disabled={loading}>
      <Item />
      <Text>{loading ? loadingText : text}</Text>
      <Circle animationDelay="-3s" />
      <Circle animationDelay="-2s" />
      <Circle animationDelay="-1s" />
      <Circle animationDelay="0s" />
    </Button>
  );
}
