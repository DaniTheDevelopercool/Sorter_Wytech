import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Order } from "../types/Orders";
import { Label } from "../types/Labels";
import { Location } from "../types/Locations";

const COLORS = {
  BLUE: "bd3887da",
  GREEN: "8d7b62da",
  PURPLE: "5d7289da",
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  endpoints: (builder) => ({
    getWaves: builder.query<
      {
        string: {
          wave: string;
          totalProducts: number;
          totalPicked: number;
          orders: Order[];
        };
      },
      void
    >({
      query: () => ({
        url: "orders/grouped-by-wave",
        method: "POST",
      }),
    }),
    getOrders: builder.query<Order[], void>({
      query: () => "orders",
    }),
    getOrdersByWave: builder.query<Order[], string>({
      query: (waveId) => ({
        url: `orders/orders-by-wave/${waveId}`,
        method: "POST",
      }),
    }),
    getLabels: builder.query<Label[], void>({
      query: () => "esl/labels",
    }),
    linkLabelWithLocation: builder.mutation<
      void,
      { labelMAC: string; locationID: string | number }
    >({
      query: ({ labelMAC, locationID }) => ({
        url: "esl/link-label",
        method: "POST",
        body: {
          labelId: labelMAC,
          locationId: locationID,
        },
      }),
    }),
    createLocation: builder.mutation<void, Location>({
      query: (location) => ({
        url: "esl/locations",
        method: "POST",
        body: location,
      }),
    }),
    deleteLocation: builder.mutation<void, number>({
      query: (locationID) => ({
        url: `esl/locations/${locationID}`,
        method: "DELETE",
      }),
    }),
    getLocations: builder.query<Location[], void>({
      query: () => "esl/locations",
    }),
    simulateNFCCard: builder.mutation<
      void,
      { locationID: string; color: "GREEN" | "BLUE" | "PURPLE" }
    >({
      query: ({ locationID, color }) => ({
        url: `orders/NFC/${locationID}/${COLORS[color]}`,
        method: "POST",
      }),
    }),
    simulateBarcode: builder.mutation<void, string>({
      query: (ean) => ({
        url: `/orders/scan/${ean}`,
        method: "POST",
      }),
    }),
    getOrderByPEDSAP: builder.query<Order, string>({
      query: (orderId) => ({
        url: `/orders/order-by-pedsap/${orderId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetLabelsQuery,
  useGetLocationsQuery,
  useLinkLabelWithLocationMutation,
  useCreateLocationMutation,
  useDeleteLocationMutation,
  useSimulateNFCCardMutation,
  useGetWavesQuery,
  useGetOrdersByWaveQuery,
  useGetOrderByPEDSAPQuery,
  useSimulateBarcodeMutation,
} = api;
