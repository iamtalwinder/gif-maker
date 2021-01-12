import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import Icon from "@mdi/react";
import { mdiWeatherSunny, mdiWeatherNight } from "@mdi/js";

const ToggleCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const ToggleSlot = styled.div`
  position: relative;
  height: 40px;
  width: 100px;
  border: 5px solid #e4e7ec;
  border-radius: 50px;
  background-color: white;
  transition: background-color 250ms;

  ${({ theme }) =>
    theme.darkTheme &&
    `
    background-color: #485367;
    box-shadow: inset 0px 0px 0px 0.10em white;
  `}
`;

const ToggleButton = styled.div`
  transform: translate(11em, 1.75em);
  position: absolute;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: #ffeccf;
  box-shadow: inset 0px 0px 0px 0.75em #ffbb52;
  transition: background-color 250ms, border-color 250ms,
    transform 500ms cubic-bezier(0.26, 2, 0.46, 0.71);
  margin-top: -1.5em;
  margin-left: -7em;

  ${({ theme }) =>
    theme.darkTheme &&
    `
    background-color: #485367;
    box-shadow: inset 0px 0px 0px 0.75em white;
    transform: translate(7.5em, 1.75em);
  `}
`;

const SunIconWrapper = styled.div`
  position: absolute;
  height: 3em;
  width: 3em;
  opacity: 1;
  transform: translate(2em, 2em) rotate(15deg);
  transform-origin: 50% 50%;
  transition: opacity 150ms, transform 500ms cubic-bezier(0.26, 2, 0.46, 0.71);

  ${({ theme }) =>
    theme.darkTheme &&
    `
    opacity: 0;
    transform: translate(3em, 2em) rotate(0deg);
  `}
`;

const SunIcon = styled(Icon).attrs(() => ({
  path: mdiWeatherSunny,
  size: 1,
}))`
  position: absolute;
  height: 2em;
  width: 2em;
  color: #ffbb52;
  margin-top: -1.2em;
  margin-left: -2em;
`;

const MoonIconWrapper = styled.div`
  position: absolute;
  height: 3em;
  width: 3em;
  opacity: 1;
  transform: translate(11em, 2em) rotate(0deg);
  transform-origin: 50% 50%;
  transition: opacity 150ms, transform 500ms cubic-bezier(0.26, 2.5, 0.46, 0.71);

  ${({ theme }) =>
    theme.darkTheme &&
    `
    opacity: 1;
    transform: translate(12em, 2em) rotate(-15deg);
  `}
`;

const MoonIcon = styled(Icon).attrs(() => ({
  path: mdiWeatherNight,
  size: 1,
}))`
  position: absolute;
  height: 2em;
  width: 2em;
  color: white;
  margin-top: -4.2em;
  margin-left: -7.5em;
`;

export default function ThemeToggler({ toggleTheme }) {
  const theme = useContext(ThemeContext);

  return (
    <label onChange={toggleTheme}>
      <ToggleCheckbox type="checkbox" checked={theme.darkTheme} />
      <ToggleSlot>
        <SunIconWrapper>
          <SunIcon />
        </SunIconWrapper>
        <ToggleButton />
        <MoonIconWrapper>
          <MoonIcon />
        </MoonIconWrapper>
      </ToggleSlot>
    </label>
  );
}
