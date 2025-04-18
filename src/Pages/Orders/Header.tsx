import { Box, Button } from "@mui/material";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import ReportGmailerrorredRoundedIcon from "@mui/icons-material/ReportGmailerrorredRounded";

export default function Header() {
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
}
