import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";
import WidgetsRoundedIcon from "@mui/icons-material/WidgetsRounded";
import MyLocationRoundedIcon from "@mui/icons-material/MyLocationRounded";
import RequestQuoteRoundedIcon from "@mui/icons-material/RequestQuoteRounded";
import { TransitionProps } from "@mui/material/transitions";

export const ORDER_LABELS = {
  orderID: "PEDIDO",
  location: "UBICACIÓN",
  ean: "EAN",
  quantity: "ENVIADO",
  requestedQuantity: "SOLICITADO",
};

const Chip = ({
  Icon,
  label,
  chipStyle = "outline",
}: {
  label: string | number;
  Icon?: any;
  chipStyle?: "outline" | "black" | "warning";
}) => {
  const chipStyles = {
    outline: {
      backgroundColor: "white",
      border: 2,
      borderColor: "black",
      color: "#000000",
    },
    black: { backgroundColor: "black", color: "#FFFFFF" },
    warning: { backgroundColor: "#FF9500", color: "#FFFFFF" },
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      gap={1}
      bgcolor={chipStyles[chipStyle].backgroundColor}
      sx={{ ...chipStyles[chipStyle] }}
      padding={1}
      borderRadius={5}
    >
      {!!Icon && <Icon color={chipStyles[chipStyle].color} />}
      <Typography
        fontWeight="bold"
        variant="body2"
        color={chipStyles[chipStyle].color}
      >
        {label}
      </Typography>
    </Box>
  );
};

const OrderDataItem = ({
  label,
  data,
  Icon,
  chipStyle,
}: {
  label: string;
  data: string | number;
  chipStyle?: "outline" | "black" | "warning";
  Icon?: any;
}) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      gap={2}
      alignItems="center"
      bgcolor={"white"}
      padding={2}
      justifyContent="space-between"
      borderRadius={2}
    >
      <Typography variant="body1" fontWeight="bold">
        {label}:{" "}
      </Typography>
      <Chip Icon={Icon} label={data} chipStyle={chipStyle} />
    </Box>
  );
};

export default function OrderCard({
  orderID,
  location,
  ean,
  requestedQuantity,
}: {
  orderID: string;
  location: string;
  ean: string;
  requestedQuantity: number;
}) {
  const [quantity, setQuantity] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        flex={1}
        display={"flex"}
        flexDirection={"column"}
        bgcolor="#F2F2F2"
        padding={2}
        gap={1}
        borderRadius={2}
      >
        {orderID && (
          <OrderDataItem
            label={ORDER_LABELS["orderID"]}
            data={orderID}
            chipStyle="warning"
            Icon={ArrowCircleUpRoundedIcon}
          />
        )}
        {location && (
          <OrderDataItem
            label={ORDER_LABELS["location"]}
            data={location}
            Icon={MyLocationRoundedIcon}
          />
        )}
        {ean && (
          <OrderDataItem
            label={ORDER_LABELS["ean"]}
            data={ean}
            Icon={WidgetsRoundedIcon}
          />
        )}
        {requestedQuantity && (
          <OrderDataItem
            label={ORDER_LABELS["requestedQuantity"]}
            data={requestedQuantity}
            Icon={RequestQuoteRoundedIcon}
          />
        )}
        {quantity && (
          <OrderDataItem
            label={ORDER_LABELS["quantity"]}
            data={quantity}
            Icon={NearMeOutlinedIcon}
          />
        )}

        <Box
          display="flex"
          flexDirection="row"
          flex={1}
          justifyContent="space-between"
        >
          <Button
            sx={{ maxHeight: 36 }}
            variant="contained"
            color="success"
            onClick={() => setQuantity(requestedQuantity)}
          >
            Completar
          </Button>
          {quantity ? (
            <Button
              sx={{ maxHeight: 36 }}
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
            >
              Editar
            </Button>
          ) : (
            <Button
              sx={{ maxHeight: 36 }}
              variant="contained"
              color="error"
              onClick={() => setOpen(true)}
            >
              Incompleto
            </Button>
          )}
        </Box>
      </Box>
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
    </>
  );
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
