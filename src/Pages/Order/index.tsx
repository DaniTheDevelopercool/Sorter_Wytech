import CropFreeRoundedIcon from "@mui/icons-material/CropFreeRounded";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useParams } from "react-router";
import {
  useGetOrderByPEDSAPQuery,
  useSimulateBarcodeMutation,
} from "../../services/api";
import { OrderProduct } from "../../types/Orders";
import { useState } from "react";

export default function OrderDetail() {
  const { id } = useParams();
  const [orderPEDSAP, setOrderPEDSAP] = useState(id ?? "");
  const { data, error, refetch } = useGetOrderByPEDSAPQuery(orderPEDSAP ?? "");
  const [simulateBarcode] = useSimulateBarcodeMutation();
  console.log("orderPEDSAP", orderPEDSAP);
  console.log("error && !!!orderPEDSAP", error && !!!orderPEDSAP);

  if (error && !!orderPEDSAP) {
    console.log("error", error);
    return (
      <Typography variant="body1">
        Error cargando los detalles de la orden
      </Typography>
    );
  }

  const rows = data?.orderProducts || [];

  const columns: GridColDef<OrderProduct>[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "product.EAN",
      headerName: "EAN",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params.row.product?.EAN;
      },
    },
    {
      field: "quantity",
      headerName: "Cantidad Solicitada",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "pickedQuantity",
      headerName: "Cantidad empacada",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "simulateBarcodeReader",
      headerName: "Simular lectura de codigo de barras",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Button>
            <CropFreeRoundedIcon
              color="success"
              onClick={() => simulateBarcode(params.row.product.EAN)}
            />
          </Button>
        );
      },
    },
  ];

  return (
    <Stack spacing={2}>
      {!!!orderPEDSAP ? (
        <Stack p={6} gap={2} direction={"column"}>
          <Typography variant="h4" fontWeight={600}>
            Ingrese el id de la orden
          </Typography>
          <Stack direction={"row"} gap={2}>
            <TextField
              label="ID de la orden"
              variant="outlined"
              onChange={(e) => setOrderPEDSAP(e.target.value)}
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
        <Stack p={6} direction={"column"} spacing={2}>
          <Typography variant="h4" fontWeight={600}>
            Orden #{data?.PEDSAP}
          </Typography>

          <DataGrid rows={rows} columns={columns} autoHeight />
        </Stack>
      )}
    </Stack>
  );
}
