import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { Transition } from "../Transition";
import { Order, ORDER_STATUS_LABELS } from "../../../types/Orders";

export default function ProductsDetailModal({
  order,
  open,
  setOpen,
}: {
  order: Order;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog
      sx={{
        borderRadius: 40,
      }}
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setOpen(false);
          },
        },
      }}
    >
      <DialogTitle>Detalle de pedido #{order.id}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <strong>Ubicación:</strong>{" "}
          {!!order.location ? order.location : "Sin asignar"}
        </DialogContentText>
        <DialogContentText>
          <strong>Estado:</strong> {ORDER_STATUS_LABELS[order.status]}
        </DialogContentText>
        <DialogContentText>
          <strong>Cantidad total de productos:</strong>{" "}
          {order.orderProducts.length}
        </DialogContentText>
        <TableContainer component={Paper}>
          <Table aria-label="Products table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>Código EAN</TableCell>
                <TableCell align="right">Nombre</TableCell>
                <TableCell align="right">Cantidad Solicitada</TableCell>
                <TableCell align="right">Cantidad enviada</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.orderProducts.map(
                ({ product, quantity, pickedQuantity }) => (
                  <TableRow
                    key={product.EAN}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{product.EAN}</TableCell>
                    <TableCell align="right">{product.name}</TableCell>
                    <TableCell align="right">{quantity}</TableCell>
                    <TableCell align="right">{pickedQuantity}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="error"
          onClick={() => setOpen(false)}
        >
          Cancelar
        </Button>
        <Button type="submit" variant="contained" color="success">
          Marcar como completado
        </Button>
      </DialogActions>
    </Dialog>
  );
}
