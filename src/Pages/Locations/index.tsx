import { Box, Typography } from "@mui/material";
import { useGetLocationsQuery } from "../../services/api";

export default function Locations() {
  const { data, isLoading } = useGetLocationsQuery();
  return (
    <Box flex={1} flexDirection="column">
      {isLoading && <div>Loading...</div>}
      {data && (
        <Box display="flex" flexDirection="row" gap={2} p={2}>
          {data.map((location) => (
            <Box
              key={location.id}
              display="flex"
              flexDirection="column"
              gap={1}
              p={2}
              boxShadow={2}
              borderRadius={5}
            >
              <Box
                display="flex"
                flexDirection="row"
                gap={2}
                alignItems="center"
              >
                <Typography variant="body1" fontWeight="bold">
                  Ubicación:
                </Typography>
                <Typography variant="body1">
                  {!!location.name ? location.name : "Sin asignar"}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
