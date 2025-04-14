import { Box, Button, TextField, Typography } from "@mui/material";
import HeaderText from "../assets/header.png";
import LilipinkLogo from "../assets/lilipink logo.png";
import SapLogo from "../assets/sap logo.png";
import PatternDesign from "../assets/Pattern.png";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import WidgetsRoundedIcon from "@mui/icons-material/WidgetsRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useNavigate } from "react-router";
import { useState } from "react";

const LoginHeader = () => {
  return (
    <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={2}>
      <img style={{ width: "100%" }} src={LilipinkLogo} alt="LilipinkLogo" />
      <Box display={"flex"} width={"100%"}>
        <img style={{ width: "80%" }} src={HeaderText} alt="HeaderText" />
        <img style={{ width: "20%" }} src={SapLogo} alt="SapLogo" />
      </Box>
    </Box>
  );
};

const CustomInput = ({
  label,
  Icon,
  placeholder,
  onChange,
  type,
}: {
  label: string;
  Icon?: any;
  placeholder: string;
  type: "text" | "number";
  onChange: (text: string) => void;
}) => {
  return (
    <Box flex={1} display={"flex"} flexDirection={"column"} gap={1}>
      <Box display={"flex"} flexDirection={"row"} gap={2}>
        {Icon && <Icon />}
        <label style={{ textAlign: "start" }}>{label}</label>
      </Box>
      <TextField
        type={type}
        variant="outlined"
        style={{ flex: 1 }}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </Box>
  );
};

const Divider = () => {
  return (
    <div
      style={{
        height: "1px",
        flex: 1,
        backgroundColor: "#E0E0E0",
      }}
    />
  );
};

const LoginForm = () => {
  let navigate = useNavigate();
  const [orderID, setOrderID] = useState<number | null>(null);
  return (
    <Box flex={1} flexDirection={"column"} display={"flex"}>
      <Box
        flex={1}
        height={"100%"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent="center"
        gap={4}
        sx={{
          paddingX: {
            xs: 4,
            sm: 8,
            md: 16,
          },
        }}
      >
        <LoginHeader />
        <Box
          display={"flex"}
          flexDirection={"row"}
          gap={2}
          alignItems={"center"}
          justifyContent={"space-around"}
        >
          <Divider />
          <Typography
            variant="body1"
            color="#616161"
            flex={1}
            textAlign={"center"}
          >
            Login System
          </Typography>
          <Divider />
        </Box>
        <Box display="flex" flexDirection="column" gap={3}>
          <CustomInput
            label="ID EMPLEADO"
            Icon={AccountBoxRoundedIcon}
            placeholder="dgarcia"
            type="text"
            onChange={() => {}}
          />

          <CustomInput
            label="N° de Grupo"
            Icon={WidgetsRoundedIcon}
            placeholder="5896968606950"
            type="number"
            onChange={(text) => {
              setOrderID(Number(text));
            }}
          />
        </Box>
        <Button
          onClick={() => {
            navigate(`/orders/${orderID}`);
          }}
          variant="contained"
          sx={{
            maxWidth: "150px",
            minHeight: "60px",
            alignSelf: "center",
            background: "linear-gradient(45deg, #3ec4ee 30%, #ff27f8 90%)",
            color: "white",
            paddingX: 3,
            paddingY: 1,
            borderRadius: 2,
            "&:hover": {
              background: "linear-gradient(45deg, #ff27f8 30%, #3ec4ee 90%)",
            },
          }}
        >
          <ArrowForwardRoundedIcon />
        </Button>
      </Box>
    </Box>
  );
};

const LoginPattern = () => {
  return (
    <Box
      flex={1}
      sx={{
        backgroundImage: `url(${PatternDesign})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        flex: 1,
        display: {
          xs: "none",
          sm: "none",
          md: "block",
        },
      }}
    ></Box>
  );
};

export default function Login() {
  return (
    <Box display={"flex"} flexDirection={"row"} flex={"1"} height={"100vh"}>
      <LoginForm />
      <LoginPattern />
    </Box>
  );
}
