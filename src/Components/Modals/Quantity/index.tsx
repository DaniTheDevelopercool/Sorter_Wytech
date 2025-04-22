import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import { Transition } from "../Transition";

export default function QuantityModal({
  open,
  setOpen,
  setQuantity,
}: {
  open: boolean;
  quantity: number | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setQuantity: React.Dispatch<React.SetStateAction<number | null>>;
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
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const newQuantity = formJson.quantity;
            setQuantity(newQuantity);
            setOpen(false);
          },
        },
      }}
    >
      <DialogTitle>Selecciona la cantidad</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Seleccione la cantidad que empacaste
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="quantity"
          name="quantity"
          label="Cantidad enviada"
          type="number"
          fullWidth
          variant="standard"
        />
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
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
