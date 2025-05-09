import ArchiveRoundedIcon from "@mui/icons-material/ArchiveRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import GroupWorkRoundedIcon from "@mui/icons-material/GroupWorkRounded";
import LabelIcon from "@mui/icons-material/Label";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { createTheme } from "@mui/material/styles";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { Outlet } from "react-router";
import Logo from "../assets/lilipink logo.png";

export const NAVIGATION = [
  { kind: "header", title: "Sorter" },
  {
    segment: "dashboard",
    title: "Home",
    icon: <DashboardRoundedIcon />,
  },
  { kind: "header", title: "Pedidos" },
  {
    segment: "groups",
    title: "Grupos de Pedidos",
    icon: <GroupWorkRoundedIcon />,
  },
  {
    segment: "orders",
    title: "Pedidos",
    icon: <ShoppingCartIcon />,
  },
  {
    segment: "order",
    title: "Pedido",
    icon: <ArchiveRoundedIcon />,
  },
  { kind: "header", title: "Sorter" },
  {
    segment: "labels",
    title: "Flejes",
    icon: <LabelIcon />,
  },
  {
    segment: "locations",
    title: "Ubicaciones",
    icon: <LocationOnIcon />,
  },
];

const demoTheme = createTheme({
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
});

export default function DashboardLayoutNavigationLinks() {
  return (
    <ReactRouterAppProvider
      // @ts-ignore
      navigation={NAVIGATION}
      theme={demoTheme}
      branding={{
        logo: <img src={Logo} alt="Gestor de Sorter" />,
        title: "",
      }}
    >
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </ReactRouterAppProvider>
  );
}
