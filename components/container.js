import styled from "styled-components";

const Container = styled.div`
  transition: 0.5s ease;
  max-width: 700px;
  margin: auto;
  border: 1px solid ${({ theme }) => theme.lightBorder};
  background: ${({ theme }) => theme.fg};
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
    `}
`;

export default Container;
