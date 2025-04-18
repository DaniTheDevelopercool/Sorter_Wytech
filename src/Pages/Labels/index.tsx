import { Box, Typography } from "@mui/material";
import { useGetLabelsQuery } from "../../services/api";

export default function Labels() {
  const { data, isLoading } = useGetLabelsQuery();
  return (
    <Box flex={1} flexDirection="column">
      {isLoading && <div>Loading...</div>}

      {data && (
        <Box display="flex" flexDirection="row" gap={2} p={2}>
          {data.map((label) => (
            <Box
              key={label.MAC}
              display="flex"
              flexDirection="column"
              gap={1}
              p={2}
              boxShadow={2}
              borderRadius={5}
            >
              <Typography variant="body1" fontWeight="bold">
                Dispositivo: {label.MAC}
              </Typography>
              <Box
                display="flex"
                flexDirection="row"
                gap={2}
                alignItems="center"
              >
                <Typography variant="body1">Ubicación:</Typography>
                <Typography variant="body1">
                  {!!label.DESCRIPTION ? label.DESCRIPTION : "Sin asignar"}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
