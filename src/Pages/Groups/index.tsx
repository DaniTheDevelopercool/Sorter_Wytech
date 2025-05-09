import { Box, Button, Typography } from "@mui/material";
import { useGetWavesQuery } from "../../services/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Order } from "../../types/Orders";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import { useNavigate } from "react-router";

export default function Groups() {
  const navigate = useNavigate();
  const { data } = useGetWavesQuery();
  const rows = Object.values(data || {});

  const columns: GridColDef<{
    wave: string;
    totalProducts: number;
    totalPicked: number;
    orders: Order[];
  }>[] = [
    {
      field: "wave",
      headerName: "Grupo de Pedido",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "orders",
      headerName: "Pedidos",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => params.row.orders.length,
    },
    {
      field: "totalProducts",
      headerName: "Total Productos",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "totalPicked",
      headerName: "Total Empacados",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "complishedPercentage",
      headerName: "Nivel de Servicio",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const totalProducts = params.row.totalProducts;
        const totalPicked = params.row.totalPicked;
        const percentage = totalProducts
          ? ((totalPicked ?? 0) / (totalProducts ?? 0)) * 100
          : 0;
        return `${percentage.toFixed(2)}%`;
      },
    },
    {
      field: "initialLocation",
      headerName: "Ubicación Inicial",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params.row.orders[0]?.location;
      },
    },
    {
      field: "outs",
      headerName: "Salidas",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params.row.orders.length;
      },
    },
    {
      field: "details",
      headerName: "Detalles",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",

      renderCell: (params) => {
        return (
          <Button onClick={() => navigate(`/orders/${params.row.wave}`)}>
            <RemoveRedEyeRoundedIcon />
          </Button>
        );
      },
    },
  ];

  return (
    <Box
      display="flex"
      justifyContent="center"
      flex={1}
      flexDirection="column"
      p={6}
    >
      <Typography
        variant="h4"
        fontWeight={800}
        color="#000000"
        marginBottom={2}
      >
        Grupo de Pedidos Pendientes
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        getRowId={(row) => row.wave}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f0f0f0",
          },
          "& .MuiDataGrid-row": {
            backgroundColor: "#ffffff",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #e0e0e0",
          },
        }}
      />
    </Box>
  );
}
