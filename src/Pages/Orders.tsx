import { Box, Button, Typography } from "@mui/material";
import OrderCard from "../Components/Common/OrderCard";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import ReportGmailerrorredRoundedIcon from "@mui/icons-material/ReportGmailerrorredRounded";
import { useParams } from "react-router";

const Header = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      p={2}
      bgcolor="#F2F2F2"
    >
      <Box display="flex" flexDirection="row" gap={2}>
        <Button
          variant="contained"
          color="success"
          endIcon={<KeyboardArrowRightRoundedIcon />}
        >
          Iniciar
        </Button>
        <Button
          variant="contained"
          color="primary"
          endIcon={<KeyboardDoubleArrowRightRoundedIcon />}
        >
          Continuar
        </Button>
      </Box>
      <Box display="flex" flexDirection="row" gap={2}>
        <Button
          variant="contained"
          color="warning"
          endIcon={<WarningAmberRoundedIcon />}
        >
          Pausar
        </Button>
        <Button
          variant="contained"
          color="error"
          endIcon={<ReportGmailerrorredRoundedIcon />}
        >
          Terminar
        </Button>
      </Box>
    </Box>
  );
};

const OrderGroupHeader = ({
  groupOrderID,
}: {
  groupOrderID: string | undefined;
}) => {
  return (
    <Box display="flex" flexDirection="row" gap={2} p={2}>
      <Typography variant="h5" fontWeight="bold">
        Grupo de pedidos
      </Typography>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap={1}
        bgcolor="#FF9500"
        padding={1}
        paddingRight={3}
        paddingLeft={3}
        borderRadius={5}
      >
        <Typography fontWeight="bold" variant="body2" color="white">
          {groupOrderID}
        </Typography>
      </Box>
    </Box>
  );
};

export default function Orders() {
  const { id } = useParams();
  return (
    <Box flex={1} flexDirection="column">
      <Header />
      <OrderGroupHeader groupOrderID={id} />
      <Box
        flex={1}
        display="flex"
        flexDirection="row"
        justifyItems="flex-start"
        gap={2}
        p={2}
      >
        <OrderCard
          orderID="123445678765"
          location="1000A"
          ean="123456789"
          requestedQuantity={10}
        />
        <OrderCard
          orderID="123445678765"
          location="1000A"
          ean="123456789"
          requestedQuantity={10}
        />
        <OrderCard
          orderID="123445678765"
          location="1000A"
          ean="123456789"
          requestedQuantity={10}
        />
        <OrderCard
          orderID="123445678765"
          location="1000A"
          ean="123456789"
          requestedQuantity={10}
        />
      </Box>
    </Box>
  );
}
