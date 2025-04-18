import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Order } from "../types/Orders";
import { Label } from "../types/Labels";
import { Location } from "../types/Locations";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => "orders",
    }),
    getLabels: builder.query<Label[], void>({
      query: () => "esl/labels",
    }),
    getLocations: builder.query<Location[], void>({
      query: () => "esl/locations",
    }),
    getAvailableLocations: builder.query<Location[], void>({
      query: () => "esl/locations-available",
    }),
    assignLocation: builder.mutation<
      void,
      { orderId: string; locationId: number }
    >({
      query: ({ orderId, locationId }) => ({
        url: `orders/${orderId}/assign-location`,
        method: "POST",
        body: { orderState: "Picking", location: locationId },
      }),
    }),
    assignEan: builder.mutation<void, { orderId: string; ean: string }>({
      query: ({ orderId, ean }) => ({
        url: `orders/${orderId}/assign-product-picking`,
        method: "POST",
        body: { productEAN: ean },
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetLabelsQuery,
  useGetLocationsQuery,
  useGetAvailableLocationsQuery,
  useAssignLocationMutation,
  useAssignEanMutation,
} = api;
