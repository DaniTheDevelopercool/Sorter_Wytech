import { Box, Typography } from "@mui/material";
import { useParams } from "react-router";
import OrderCard from "../../Components/Common/OrderCard";
import Header from "./Header";
import OrderGroupHeader from "./OrderGroupHeader";
import {
  useAssignEanMutation,
  useAssignLocationMutation,
  useGetLocationsQuery,
  useGetOrdersQuery,
} from "../../services/api";
import { useMemo, useState } from "react";
import Loading from "../../Components/Common/Loading";
import { Order } from "../../types/Orders";
import { Location } from "../../types/Locations";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

export default function Orders() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { data, error, refetch } = useGetOrdersQuery();
  const { data: locationsData, refetch: refetchLocations } =
    useGetLocationsQuery();
  const [setLocation] = useAssignLocationMutation();
  const [setEan] = useAssignEanMutation();

  const onLocationChange = async (orderId: string, locationIndex: number) => {
    setLoading(true);
    const response = await setLocation({
      orderId,
      locationId: locationsData?.[locationIndex]?.id ?? 0,
    });
    if (response.data) {
      refetch();
      refetchLocations();
    }
    setLoading(false);
    console.log("Assign response", response);
  };

  const onEanChange = async (orderId: string, ean: string) => {
    setLoading(true);
    setEan({ orderId, ean });
    const response = await setEan({ orderId, ean });
    if (response.data) {
      refetch();
      refetchLocations();
    }
    setLoading(false);
  };

  const availableLocations = useMemo(
    () => locationsData?.filter((location) => !!!location.orderID),
    [locationsData]
  );

  const unasignedOrders = useMemo(
    () => data?.filter((order) => !order.location) ?? [],
    [data]
  );

  const assignedOrders = useMemo(
    () => data?.filter((order) => !!order.location) ?? [],
    [data]
  );

  if (error) {
    console.log("error", error);
  }
  return (
    <Box flex={1} flexDirection="column">
      {loading && <Loading />}
      {(data?.length ?? 0 > 0) && (
        <Box display="flex" flexDirection="column" gap={2} p={2}>
          <Header />
          <OrderGroupHeader groupOrderID={id} />
          <OrdersByCategory
            ordersTitle="Sin asignar"
            orders={unasignedOrders}
            availableLocations={availableLocations ?? []}
            onLocationChange={onLocationChange}
            onEanChange={onEanChange}
          />
          <OrdersByCategory
            ordersTitle="Asignados"
            orders={assignedOrders}
            availableLocations={availableLocations ?? []}
            onLocationChange={onLocationChange}
            onEanChange={onEanChange}
          />
        </Box>
      )}
    </Box>
  );
}

const OrdersByCategory = ({
  ordersTitle,
  orders,
  availableLocations,
  onLocationChange,
  onEanChange,
}: {
  ordersTitle: string;
  orders: Order[];
  availableLocations: Location[];
  onLocationChange: (orderId: string, locationId: number) => void;
  onEanChange: (orderId: string, ean: string) => void;
}) => {
  const [show, setShow] = useState(false);
  return (
    <Box display="flex" flexDirection="column" gap={2} flexWrap="wrap">
      <Box
        display={"flex"}
        flexDirection="row"
        gap={1}
        alignItems={"center"}
        onClick={() => setShow(!show)}
      >
        <Typography variant="h5" fontWeight="bold" padding={2}>
          {ordersTitle}
        </Typography>
        {show ? <KeyboardArrowDownRoundedIcon /> : <ChevronRightRoundedIcon />}
      </Box>
      {show && (
        <Box display="flex" flexDirection="row" gap={2} flexWrap="wrap">
          {orders?.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              availableLocations={availableLocations}
              onLocationChange={(locationId) =>
                onLocationChange(order.id, locationId)
              }
              onSubmitBarcode={(ean) => onEanChange(order.id, ean)}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
