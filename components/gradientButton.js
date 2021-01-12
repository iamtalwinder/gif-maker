import styled from "styled-components";

const GradientButton = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  background-image: linear-gradient(
    to right,
    #29ad37 0%,
    #8cc220 51%,
    #29ad37 100%
  );
  color: #ffffff;
  transition: 0.5s;
  box-shadow: 0 0 20px ${({ theme }) => theme.headingColor};
  background-size: 200% auto;
  font-size: 16px;
  display: flex;
  align-items: center;
  padding: 8px 20px;
  border-radius: 50px;
  border: 1px solid ${({ theme }) => theme.headingColor};

  & span {
    margin-right: 5px;
  }

  :hover {
    background-position: right center;
  }
`;

export default GradientButton;
