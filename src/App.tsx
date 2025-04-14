import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import Login from "../src/Pages/Login";

function App() {
  const lightTheme = createTheme({
    cssVariables: {
      colorSchemeSelector: "data-toolpad-color-scheme",
    },
    colorSchemes: { light: true, dark: false },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 600,
        lg: 1200,
        xl: 1536,
      },
    },
    palette: { mode: "light" },
  });

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Login />
    </ThemeProvider>
  );
}

export default App;
