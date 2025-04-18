import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box
      display={"flex"}
      position={"fixed"}
      flex={1}
      bgcolor={"rgba(0,0,0,0.5)"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      height={"100%"}
      zIndex={10}
    >
      <CircularProgress size={100} />
    </Box>
  );
}
