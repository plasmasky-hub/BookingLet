import { apiSlice } from './apiSlice';

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: '/orders',
        method: 'POST',
        body: order,
      }),
    }),
    getOrders: builder.query({
      query: () => '/orders?userId=62d6bb04a4675b9cb600f21b',
    }),
    UpdateOrder: builder.mutation({
      query: (id, order) => ({
        url: `/orders/${id}`,
        method: 'PUT',
        body: order,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateOrderQuery, useGetOrdersQuery, useUpdateOrderQuery } = orderApi;
