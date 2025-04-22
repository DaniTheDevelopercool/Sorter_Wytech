import { Stack, Typography } from "@mui/material";
import LabelIcon from "@mui/icons-material/Label";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import { useNavigate } from "react-router";

const DashboardMenu = () => {
  const navigate = useNavigate();
  const OPTIONS = [
    {
      label: "ETIQUETAS",
      description: "Gestiona las etiquetas digitales de la bodega",
      value: "/labels",
      icon: <LabelIcon />,
      color: "#4caf50",
    },
    {
      label: "UBICACIONES",
      description: "Gestiona las ubicaciones de la bodega",
      value: "/locations",
      icon: <LocationOnIcon />,
      color: "#2196f3",
    },
    {
      label: "PEDIDOS",
      description: "Gestiona los pedidos",
      value: "/orders",
      icon: <ShoppingCartIcon />,
      color: "#ff9800",
    },
    {
      label: "GRUPOS",
      description: "Gestiona los grupos de pedidos",
      value: "/groups",
      icon: <GroupWorkIcon />,
      color: "#9c27b0",
    },
  ];

  return (
    <Stack
      width={"50%"}
      p={2}
      direction={"column"}
      spacing={2}
      justifyContent="center"
      flexWrap="wrap"
    >
      {OPTIONS.map((option) => (
        <Stack
          p={2}
          key={option.label}
          direction={"row"}
          spacing={2}
          alignItems="center"
          onClick={() => navigate(option.value)}
          sx={{
            borderLeft: `8px solid ${option.color}`,
            backgroundColor: "#f5faff",
            "&:hover": {
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
              scale: 1.02,
              transition: "all 0.2s ease-in-out",
              cursor: "pointer",
            },
          }}
          borderRadius={1}
          bgcolor={"background.paper"}
          boxShadow={1}
        >
          {option.icon}
          <Stack direction={"column"} spacing={1}>
            <Typography variant="h6" fontWeight={600}>
              {option.label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {option.description}
            </Typography>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

export default DashboardMenu;
