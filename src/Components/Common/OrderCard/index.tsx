import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Location } from "../../../types/Locations";
import {
  COLOR_BY_STATUS,
  Order,
  ORDER_STATUS,
  ORDER_STATUS_LABELS,
} from "../../../types/Orders";
import QuantityModal from "../../Modals/Quantity";
import ProductsDetailModal from "../../Modals/ProductsDetail";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

export default function OrderCard({
  order,
  locationsData,
  availableLocations,
  onLocationChange,
  onEANSubmit,
  onCompleteProductPicking,
  onCompleteOrder,
}: {
  order: Order;
  locationsData?: Location[];
  availableLocations?: Location[];
  onLocationChange?: (locationIndex: number) => void;
  onEANSubmit: (EAN: string) => void;
  onCompleteProductPicking?: (ean: string, quantity: number) => void;
  onCompleteOrder?: (isLastBox: boolean) => void;
}) {
  const { id, location, status, wave } = order;
  const [quantity, setQuantity] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const currentProductData = order.orderProducts.find(
    (product) => product.product.EAN === order.currentProductEAN
  );

  const totalProducts = order.orderProducts.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  const totalPickedProducts = order.orderProducts.reduce(
    (acc, product) => acc + product.pickedQuantity,
    0
  );

  return (
    <>
      <Card
        sx={{
          width: "25%",
          borderLeft: `8px solid ${COLOR_BY_STATUS[status].backgroundColor}`,
          backgroundColor: "#f5faff",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Stack
              direction="row"
              spacing={1}
              justifyContent={"space-between"}
              flex={1}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: COLOR_BY_STATUS[status].backgroundColor,
                  }}
                >
                  Orden #{id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Oleada: <strong>{wave}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Productos:{" "}
                  <strong>
                    {totalPickedProducts} / {totalProducts}
                  </strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Estado:{" "}
                  <strong
                    style={{
                      color: COLOR_BY_STATUS[status].backgroundColor,
                    }}
                  >
                    {ORDER_STATUS_LABELS[status as unknown as ORDER_STATUS]}
                  </strong>
                </Typography>
              </Box>
              <IconButton
                onClick={() => setIsProductModalOpen(true)}
                sx={{ height: "100%" }}
              >
                <VisibilityRoundedIcon />
              </IconButton>
            </Stack>
          </Stack>

          {!!location && false ? (
            <Typography variant="body2" color="text.secondary" mb={2}>
              Ubicación asignada:{" "}
              <strong>
                {locationsData?.find((lc) => lc.id === Number(location))
                  ?.name ?? location}
              </strong>
            </Typography>
          ) : (
            order.status === 1 && (
              <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <FormControl size="small" sx={{ minWidth: 160 }}>
                  <InputLabel id="ubicacion-select-label">
                    Asignar ubicación
                  </InputLabel>
                  <Select
                    labelId="ubicacion-select-label"
                    value={location}
                    label="Asignar ubicación"
                    onChange={(event) => {
                      console.log("event", event.target.value);
                      onLocationChange?.(Number(event.target.value) ?? 0);
                    }}
                  >
                    {availableLocations?.map((location) => (
                      <MenuItem value={location.id}>{location.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            )
          )}
          {order.status === 1 && (
            <>
              <Divider sx={{ mb: 2 }} />
              {order.currentProductEAN ? (
                <Stack direction="column" spacing={1} mb={2}>
                  <Typography variant="body2" color="text.secondary">
                    Producto Actual:{" "}
                    <strong>{order.currentProductEAN ?? 0}</strong>
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Cantidad solicitada:{" "}
                    <strong>{order.currentProductQuantity ?? 0}</strong>
                  </Typography>

                  {currentProductData && (
                    <Typography variant="body2" color="text.secondary">
                      Cantidad enviada:{" "}
                      <strong>{currentProductData.pickedQuantity ?? 0}</strong>
                    </Typography>
                  )}

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    alignSelf={"stretch"}
                  >
                    <Button
                      color="primary"
                      variant="outlined"
                      size="small"
                      onClick={() => setOpen(true)}
                      sx={{ height: "100%" }}
                    >
                      Cambiar Cantidad
                    </Button>
                    <Button
                      color="success"
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        if (currentProductData) {
                          onCompleteProductPicking?.(
                            order.currentProductEAN ?? "",
                            currentProductData.quantity
                          );
                        }
                      }}
                      sx={{ height: "100%" }}
                    >
                      Completado
                    </Button>
                  </Stack>
                </Stack>
              ) : (
                <Stack direction="row" spacing={1} mb={2}>
                  <TextField
                    label="Escanear código de barras"
                    variant="outlined"
                    size="small"
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        const value = (event.target as HTMLInputElement).value;
                        console.log("Barcode scanned:", value);
                        onEANSubmit(value);
                      }
                    }}
                    sx={{ flexGrow: 1 }}
                  />
                  {/* <IconButton
                color="primary"
                onClick={() => {
                  
                }}
                sx={{ height: "100%" }}
              >
                <SearchRoundedIcon />
              </IconButton> */}
                </Stack>
              )}
              <Divider sx={{ mb: 2 }} />

              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onCompleteOrder?.(false)}
                >
                  Completar Caja
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => onCompleteOrder?.(true)}
                >
                  Completar Pedido
                </Button>

                {/* {!!location && (
              <Button variant="contained" color="error" onClick={() => {}}>
                Liberar
              </Button>
            )} */}
              </Stack>
            </>
          )}
        </CardContent>
      </Card>
      <ProductsDetailModal
        open={isProductModalOpen}
        setOpen={setIsProductModalOpen}
        order={order}
      />
      <QuantityModal
        open={open}
        setOpen={setOpen}
        setQuantity={(newQuantity) => {
          if (newQuantity !== null) {
            setQuantity(newQuantity);
            onCompleteProductPicking?.(
              order.currentProductEAN ?? "",
              Number(newQuantity)
            );
            setOpen(false);
          }
        }}
        quantity={quantity}
      />
    </>
  );
}
