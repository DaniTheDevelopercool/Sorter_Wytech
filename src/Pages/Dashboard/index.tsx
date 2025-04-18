import { Box } from "@mui/material";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const navigate = useNavigate();
  const OPTIONS = [
    {
      label: "ETIQUETAS",
      value: "/labels",
    },
    {
      label: "UBICACIONES",
      value: "/locations",
    },
    {
      label: "PEDIDOS",
      value: "/orders",
    },
  ];
  return (
    <Box display={"flex"} flexDirection="row" gap={2} p={2}>
      {OPTIONS.map((option) => (
        <Box
          display="flex"
          flexDirection="row"
          gap={2}
          alignItems="center"
          padding={2}
          borderRadius={5}
          boxShadow={2}
          onClick={() => navigate(option.value)}
        >
          {option.label}
        </Box>
      ))}
    </Box>
  );
}
