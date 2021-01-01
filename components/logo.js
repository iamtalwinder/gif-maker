import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${({ theme }) => theme.headingColor};
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

export default function Logo({ text, className }) {
  return (
    <Container className={className}>
      <Img src="/logo.png" />
      <span>{text}</span>
    </Container>
  );
}
