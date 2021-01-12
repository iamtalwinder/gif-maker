import { useState } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const light = {
  darkTheme: false,
  bg: "#faf6f6",
  fg: "#fff",
  lightBorder: "#ccc",
  headingColor: "#313131",
  textColor: "#505050",
  shadow: "#000",
};

const dark = {
  darkTheme: true,
  bg: "#12181b",
  fg: "#2a2e35",
  lightBorder: "#b2becd",
  headingColor: "#fff",
  textColor: "#fff",
  shadow: "#eee",
};

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    background: ${({ theme }) => theme.bg};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  html.transition,
  html.transition *,
  html.transition *:before,
  html.transition *:after {
    transition: all 750ms !important;
    transition-delay: 0 !important;
  }
`;

function MyApp({ Component, pageProps }) {
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => {
    setDarkTheme((prevState) => !prevState);
    document.documentElement.classList.add("transition");
    window.setTimeout(() => {
      document.documentElement.classList.remove("transition");
    }, 1000);
  };

  return (
    <ThemeProvider theme={darkTheme ? dark : light}>
      <>
        <GlobalStyle />
        <Component {...pageProps} toggleTheme={toggleTheme} />
      </>
    </ThemeProvider>
  );
}

export default MyApp;
