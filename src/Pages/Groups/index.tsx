import { Box, Button, Typography } from "@mui/material";
import { COLOR_BY_STATUS } from "../../types/Orders";

export default function Groups() {
  return (
    <Box display="flex" justifyContent="center" flex={1} flexDirection="column">
      <Typography
        variant="h4"
        fontWeight={800}
        color="#000000"
        marginBottom={2}
      >
        Grupo de Pedidos Pendientes
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        width="100%"
        justifyContent="center"
        padding={2}
      >
        <GroupElement
          group={{
            name: "Grupo 1",
            description: "5 pedidos pendientes",
            status: 0,
            date: "10/01/2023",
          }}
        />
        <GroupElement
          group={{
            name: "Grupo 2",
            description: "3 pedidos pendientes",
            status: 1,
            date: "10/01/2023",
          }}
        />
        <GroupElement
          group={{
            name: "Grupo 3",
            description: "2 pedidos pendientes",
            status: 2,
            date: "10/01/2023",
          }}
        />
        <GroupElement
          group={{
            name: "Grupo 4",
            description: "2 pedidos pendientes",
            status: 3,
            date: "10/01/2023",
          }}
        />
      </Box>
    </Box>
  );
}

const GroupElement = ({
  group: { name, description, status, date },
}: {
  group: {
    name: string;
    description: string;
    date: string;
    status: 0 | 1 | 2 | 3;
  };
}) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      border={1}
      p={2}
      borderRadius={1}
      borderColor={COLOR_BY_STATUS[status].borderColor}
      bgcolor={COLOR_BY_STATUS[status].backgroundColor}
      width={500}
      sx={{
        "&:hover": {
          backgroundColor: COLOR_BY_STATUS[status].backgroundColor,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          scale: 1.02,
          transition: "all 0.2s ease-in-out",
          cursor: "pointer",
        },
      }}
    >
      <Box display="flex" flexDirection="column" gap={0.5}>
        <Typography
          variant="h6"
          fontWeight={800}
          color={COLOR_BY_STATUS[status].color}
        >
          {name}
        </Typography>
        <Typography
          variant="body1"
          color={COLOR_BY_STATUS[status].color}
          fontWeight={600}
        >
          {description}
        </Typography>
        <Typography
          variant="body2"
          color={COLOR_BY_STATUS[status].color}
          fontWeight={400}
        >
          Creado el {date}
        </Typography>
      </Box>
      <Button
        variant="contained"
        size="small"
        sx={{
          bgcolor: "rgba(0, 0, 0, 0.2)",
          color: "#FFFFFF",
          "&:hover": {
            bgcolor: "rgba(0, 0, 0, 0.3)",
          },
          fontSize: "1rem",
          boxShadow: "none",
          fontWeight: "bold",
          textTransform: "none",
          borderRadius: "8px",
          paddingX: 2,
          paddingY: 0.5,
        }}
      >
        Ver Detalles
      </Button>
    </Box>
  );
};
