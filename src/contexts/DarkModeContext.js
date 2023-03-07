import { createContext, useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { red, indigo, deepOrange } from "@mui/material/colors";

const APPTHEME = "theme";
let temita = "light";

//context
const DarkModeContext = createContext();

//component context
const DarkModeProvider = ({ children }) => {
  const [mode, setMode] = useState(temita);

  useEffect(() => {
    if (String(window.localStorage.getItem(APPTHEME)) === "light") {
      setMode("light");
      temita = "light";
    } else if (String(window.localStorage.getItem(APPTHEME)) === "dark") {
      setMode("dark");
      temita = "dark";
    } else {
      setMode("light");
      temita = "light";
    }
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        if (temita === "light") {
          temita = "dark";
          window.localStorage.setItem(APPTHEME, temita);
        } else {
          temita = "light";
          window.localStorage.setItem(APPTHEME, temita);
        }
      },
    }),
    []
  );

  const theme = createTheme({
    palette: {
      primary: {
        main: indigo[500],
      },
      secondary: {
        main: deepOrange[600],
      },
      mode,
    },
  });

  const data = { mode, setMode, colorMode, theme };

  return (
    <>
      <ThemeProvider theme={theme}>
        <DarkModeContext.Provider value={data}>
          {children}
        </DarkModeContext.Provider>
      </ThemeProvider>
    </>
  );
};

export { DarkModeProvider };
export default DarkModeContext;
