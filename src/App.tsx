import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "../src/Pages/Login";
import Orders from "./Pages/Orders";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Dashboard from "./Pages/Dashboard";
import Labels from "./Pages/Labels";
import Locations from "./Pages/Locations";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/orders/:id",
    element: <Orders />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/labels",
    element: <Labels />,
  },
  {
    path: "/locations",
    element: <Locations />,
  },
]);

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
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
