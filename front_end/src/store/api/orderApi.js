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
      query: (Id) => `/orders?${Id}`,
    }),
  }),
  overrideExisting: false,
});

export const { useCreateOrderQuery } = orderApi;


// userId=62d6bb04a4675b9cb600f21b