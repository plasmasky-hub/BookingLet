import { apiSlice } from './apiSlice';

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.query({
      query: (order) => ({
        url: '/orders',
        method: 'POST',
        body: order,
      }),
    }),
    getOrders: builder.query({
      query: (id) => `/orders/?userId=${id}`,
    }),
    getOrdersByStoreId: builder.query({
      query: (id) => `/orders/?storeId=${id}`,
    }),
    getOrdersByServiceInfoId: builder.query({
      query: (id) => `/orders/?serviceInfoId=${id}`,
    }),
  }),
  overrideExisting: false,
});

export const { useCreateOrderQuery, useGetOrdersQuery, useGetOrdersByStoreIdQuery, useGetOrdersByServiceInfoIdQuery } = orderApi;
