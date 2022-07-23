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
  }),
  overrideExisting: false,
});

export const { useCreateOrderQuery } = orderApi;
