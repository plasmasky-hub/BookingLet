import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/v1' }),
  endpoints: (builder) => ({
    getStores: builder.query({
      query: () => '/store',
    }),
    getStore: builder.query({
      query: (id) => `/store/${id}`,
    }),
    addStore: builder.mutation({
      query: (store) => ({
        url: '/store',
        method: 'POST',
        body: store,
      }),
    }),
    updateStore: builder.mutation({
      query: (store) => ({
        url: `/todos/${store.id}`,
        method: 'PUT',
        body: store,
      }),
    }),
    deleteStore: builder.mutation({
      query: (id) => ({
        url: `/store/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetStoresQuery,
  useGetStoreQuery,
  useAddStoreMutation,
  useUpdateStoreMutation,
  useDeleteStoreMutation,
} = apiSlice;
