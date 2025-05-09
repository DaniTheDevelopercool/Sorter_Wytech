import ContactlessIcon from "@mui/icons-material/Contactless";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router";
import Loading from "../../Components/Common/Loading";
import {
  useGetOrdersByWaveQuery,
  useSimulateNFCCardMutation,
} from "../../services/api";
import { Order, ORDER_STATUS_LABELS } from "../../types/Orders";
import { useState } from "react";

export default function Orders() {
  const { waveId } = useParams();
  const [wave, setWave] = useState(waveId ?? "");
  const navigate = useNavigate();
  const { data, error, isLoading, refetch } = useGetOrdersByWaveQuery(
    wave ?? waveId ?? ""
  );
  const [simulateNFCCard, { isLoading: nfcLoading }] =
    useSimulateNFCCardMutation();

  const loading = nfcLoading || isLoading;

  if (error && !!wave) {
    return (
      <Stack p={6}>
        <Typography variant="h4" fontWeight={600}>
          Error al cargar los pedidos
        </Typography>
        <Typography variant="body1">
          Ocurrió un error al cargar los pedidos. Por favor, inténtalo de nuevo.
        </Typography>
      </Stack>
    );
  }

  const columns: GridColDef<Order>[] = [
    { field: "PEDSAP", headerName: "Pedido", width: 120 },
    {
      field: "wave",
      headerName: "Grupo",
      width: 150,
    },
    {
      field: "status",
      headerName: "Estado del lote",
      width: 120,
      renderCell: (params) => {
        const status = params.value;
        return ORDER_STATUS_LABELS[status as keyof typeof ORDER_STATUS_LABELS];
      },
    },
    {
      field: "location",
      headerName: "Ubicación",
      width: 150,
    },
    {
      field: "cantidadPedida",
      headerName: "Cantidad pedida",
      width: 150,
      renderCell: (params) => {
        console.log("params", params);

        const order = data?.find((order) => order.PEDSAP === params.row.PEDSAP);
        const totalProducts = order?.orderProducts.reduce(
          (acc, product) => acc + product.quantity,
          0
        );
        return totalProducts ?? 0;
      },
    },
    {
      field: "cantidadConfirmada",
      headerName: "Cantidad empacada",
      width: 150,
      renderCell: (params) => {
        const order = data?.find((order) => order.PEDSAP === params.row.PEDSAP);
        const pickedProducts = order?.orderProducts.reduce(
          (acc, product) => acc + product.pickedQuantity,
          0
        );
        return pickedProducts ?? 0;
      },
    },
    {
      field: "cantidadPendiente",
      headerName: "Cantidad pendiente",
      width: 150,
      renderCell: (params) => {
        const order = data?.find((order) => order.PEDSAP === params.row.PEDSAP);
        const pendingProducts = order?.orderProducts.reduce(
          (acc, product) => acc + product.quantity - product.pickedQuantity,
          0
        );
        return pendingProducts ?? 0;
      },
    },
    {
      field: "porcentajeCumplimiento",
      headerName: "Nivel de servicio",
      width: 150,
      renderCell: (params) => {
        const order = data?.find((order) => order.PEDSAP === params.row.PEDSAP);
        const totalProducts = order?.orderProducts.reduce(
          (acc, product) => acc + product.quantity,
          0
        );
        const pickedProducts = order?.orderProducts.reduce(
          (acc, product) => acc + product.pickedQuantity,
          0
        );
        const percentage = totalProducts
          ? ((pickedProducts ?? 0) / totalProducts) * 100
          : 0;
        return `${percentage.toFixed(2)}%`;
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
          <Button onClick={() => navigate(`/order/${params.row.PEDSAP}`)}>
            <RemoveRedEyeRoundedIcon />
          </Button>
        );
      },
    },
    {
      field: "simulateNFCGreenCard",
      headerName: "Tarjeta Verde",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Button
            onClick={() =>
              simulateNFCCard({
                locationID: params.row.location,
                color: "GREEN",
              })
            }
          >
            <ContactlessIcon color="success" />
          </Button>
        );
      },
    },
    {
      field: "simulateNFCBlueCard",
      headerName: "Tarjeta Azul",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Button
            onClick={() =>
              simulateNFCCard({
                locationID: params.row.location,
                color: "BLUE",
              })
            }
          >
            <ContactlessIcon color="primary" />
          </Button>
        );
      },
    },
    {
      field: "simulateNFCPurpleCard",
      headerName: "Tarjeta Morada",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Button
            onClick={() =>
              simulateNFCCard({
                locationID: params.row.location,
                color: "PURPLE",
              })
            }
          >
            <ContactlessIcon color="action" />
          </Button>
        );
      },
    },
  ];

  return (
    <Box flex={1} flexDirection="column">
      {loading && <Loading />}
      {!!!wave ? (
        <Stack p={6} gap={2} direction={"column"}>
          <Typography variant="h4" fontWeight={600}>
            Ingrese el grupo de pedidos
          </Typography>
          <Stack direction={"row"} gap={2}>
            <TextField
              label="ID del grupo"
              variant="outlined"
              onChange={(e) => setWave(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={() => {
                refetch();
              }}
            >
              Buscar
            </Button>
          </Stack>
        </Stack>
      ) : (
        (data?.length ?? 0) > 0 && (
          <Stack p={6} direction={"column"} spacing={2}>
            <Typography variant="h4" fontWeight={600}>
              Grupo de pedidos #{wave}
            </Typography>
            <DataGrid rows={data} columns={columns} autoHeight />
          </Stack>
        )
      )}
    </Box>
  );
}
