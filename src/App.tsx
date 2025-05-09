import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import DashboardLayoutNavigationLinks from "./Navigation";
import { store } from "./redux/store";

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
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <DashboardLayoutNavigationLinks />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
