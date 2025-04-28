import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { Badge, Box, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useParams } from "react-router";
import Loading from "../../Components/Common/Loading";
import OrderCard from "../../Components/Common/OrderCard";
import {
  useAssignEanMutation,
  useAssignLocationMutation,
  useCompleteOrderMutation,
  useCompleteProductPickingMutation,
  useGetLocationsQuery,
  useGetOrdersQuery,
} from "../../services/api";
import { Location } from "../../types/Locations";
import { Order } from "../../types/Orders";
import Header from "./Header";
import OrderGroupHeader from "./OrderGroupHeader";
import RoomServiceRoundedIcon from "@mui/icons-material/RoomServiceRounded";

export default function Orders() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { data, error, refetch } = useGetOrdersQuery();
  const { data: locationsData, refetch: refetchLocations } =
    useGetLocationsQuery();
  const [setLocation] = useAssignLocationMutation();
  const [setEanInDB] = useAssignEanMutation();
  const [setCompleteProductPicking] = useCompleteProductPickingMutation();
  const [setCompleteOrder] = useCompleteOrderMutation();

  const onLocationChange = async (orderId: string, location: number) => {
    setLoading(true);
    const response = await setLocation({
      orderId,
      locationId: location,
    });
    if (response.data) {
      refetch();
      refetchLocations();
    }
    setLoading(false);
    console.log("Assign response", response);
  };

  const onEANSubmit = async (orderID: string | number, ean: string) => {
    setLoading(true);
    const response = await setEanInDB({
      orderId: orderID.toString(),
      ean: ean,
    });
    if (response.data) {
      refetch();
      refetchLocations();
    }
    setLoading(false);
    console.log("onEANSubmit response", response);
  };

  const onCompleteProductPicking = async (
    orderID: string | number,
    ean: string,
    quantity: number
  ) => {
    setLoading(true);
    const response = await setCompleteProductPicking({
      orderId: orderID.toString(),
      ean,
      quantity,
    });
    if (response.data) {
      refetch();
      refetchLocations();
    }
    setLoading(false);
    console.log("onCompleteProductPicking response", response);
  };

  const onCompleteOrder = async (
    orderID: string | number,
    isLastBox: boolean
  ) => {
    setLoading(true);
    const response = await setCompleteOrder({
      orderId: orderID.toString(),
      isLastBox,
    });
    if (response.data) {
      refetch();
      refetchLocations();
    }
    setLoading(false);
    console.log("onCompleteOrder response", response);
  };

  const availableLocations = useMemo(
    () => locationsData?.filter((location) => !!!location.orderID),
    [locationsData]
  );

  const unasignedOrders = useMemo(
    () => data?.filter((order) => !order.location && order.status !== 3) ?? [],
    [data]
  );

  const completedOrders = useMemo(
    () => data?.filter((order) => order.location && order.status === 3) ?? [],
    [data]
  );

  const assignedOrders = useMemo(
    () => data?.filter((order) => !!order.location && order.status === 1) ?? [],
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
            locationsData={locationsData ?? []}
            onLocationChange={onLocationChange}
            onEANSubmit={onEANSubmit}
            onCompleteProductPicking={onCompleteProductPicking}
            onCompleteOrder={onCompleteOrder}
          />
          <OrdersByCategory
            ordersTitle="Asignados"
            orders={assignedOrders}
            availableLocations={availableLocations ?? []}
            locationsData={locationsData ?? []}
            onLocationChange={onLocationChange}
            onEANSubmit={onEANSubmit}
            onCompleteProductPicking={onCompleteProductPicking}
            onCompleteOrder={onCompleteOrder}
          />
          <OrdersByCategory
            ordersTitle="Completados"
            orders={completedOrders}
            availableLocations={availableLocations ?? []}
            locationsData={locationsData ?? []}
            onLocationChange={onLocationChange}
            onEANSubmit={onEANSubmit}
            onCompleteProductPicking={onCompleteProductPicking}
            onCompleteOrder={onCompleteOrder}
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
  locationsData,
  onLocationChange,
  onEANSubmit,
  onCompleteProductPicking,
  onCompleteOrder,
}: {
  ordersTitle: string;
  orders: Order[];
  availableLocations: Location[];
  locationsData: Location[];
  onLocationChange: (orderId: string, locationId: number) => void;
  onEANSubmit: (orderId: string, EAN: string) => void;
  onCompleteProductPicking: (
    orderId: string,
    ean: string,
    quantity: number
  ) => void;
  onCompleteOrder: (orderId: string, isLastBox: boolean) => void;
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
        <Badge color="error" badgeContent={orders.length}>
          <RoomServiceRoundedIcon />
        </Badge>
        {show ? <KeyboardArrowDownRoundedIcon /> : <ChevronRightRoundedIcon />}
      </Box>
      {show && (
        <Box display="flex" flexDirection="row" gap={2} flexWrap="wrap">
          {orders?.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              availableLocations={availableLocations}
              locationsData={locationsData}
              onLocationChange={(locationId) =>
                onLocationChange(order.id, locationId)
              }
              onEANSubmit={(ean) => onEANSubmit(order.id, ean)}
              onCompleteProductPicking={(ean, quantity) =>
                onCompleteProductPicking(order.id, ean, quantity)
              }
              onCompleteOrder={(isLastBox) =>
                onCompleteOrder(order.id, isLastBox)
              }
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
