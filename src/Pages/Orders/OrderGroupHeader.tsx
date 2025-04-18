import { Box, Typography } from "@mui/material";

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
export default OrderGroupHeader;
