import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
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

export default function OrderCard({
  order,
  locationsData,
  availableLocations,
  onLocationChange,
}: {
  order: Order;
  locationsData?: Location[];
  availableLocations?: Location[];
  onLocationChange?: (locationIndex: number) => void;
}) {
  const { id, location, status, wave } = order;
  const [quantity, setQuantity] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

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
          </Stack>

          {!!location ? (
            <Typography variant="body2" color="text.secondary" mb={2}>
              Ubicación asignada:{" "}
              <strong>
                {locationsData?.find((lc) => lc.id === Number(location))?.name}
              </strong>
            </Typography>
          ) : (
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
          )}

          <Stack direction="row" spacing={1}>
            <Button variant="contained" color="success" onClick={() => {}}>
              Entregado
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsProductModalOpen(true)}
            >
              Ver productos
            </Button>
            {!!location && (
              <Button variant="contained" color="error" onClick={() => {}}>
                Liberar
              </Button>
            )}
          </Stack>
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
          setQuantity(newQuantity);
          setOpen(false);
        }}
        quantity={quantity}
      />
    </>
  );
}
