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
        body: { location: locationId },
      }),
    }),
    assignEan: builder.mutation<void, { orderId: string; ean: string }>({
      query: ({ orderId, ean }) => ({
        url: `orders/${orderId}/assign-product-picking`,
        method: "POST",
        body: { productEAN: ean },
      }),
    }),
    completeProductPicking: builder.mutation<
      void,
      { orderId: string; ean: string; quantity: number }
    >({
      query: ({ orderId, ean, quantity }) => ({
        url: `orders/${orderId}/submit-product-complete`,
        method: "POST",
        body: { productEAN: ean, quantity },
      }),
    }),
    completeProductPickingWithNFC: builder.mutation<
      void,
      { locationID: string }
    >({
      query: ({ locationID }) => ({
        url: `orders/NFC-submit-product-quantity/${locationID}`,
        method: "POST",
      }),
    }),
    completeOrder: builder.mutation<
      void,
      { orderId: string; isLastBox: boolean }
    >({
      query: ({ orderId, isLastBox }) => ({
        url: `orders/${orderId}/submit-order-complete`,
        method: "POST",
        body: { isLastBox },
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
  useLinkLabelWithLocationMutation,
  useCreateLocationMutation,
  useDeleteLocationMutation,
  useCompleteProductPickingMutation,
  useCompleteOrderMutation,
  useCompleteProductPickingWithNFCMutation,
} = api;
