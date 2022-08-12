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
    getOrdersByParams: builder.query({
      query: (params) => { 
        let baseUrl = `/orders`
        let stringParams = []
        for (const key in params) {
          if (Object.hasOwnProperty.call(params, key) && params[key] !== "") {
            stringParams.push(`${key}=${params[key]}`)
          }
        }
        let resultUrl = baseUrl + "?" + stringParams.join("&")
        return resultUrl
      },
    }),
    getOrdersByServiceInfoId: builder.query({
      query: (id) => `/orders/?serviceInfoId=${id}`,
    }),
    updateOrder: builder.mutation({
      query: (id, params) => ({
        url: `/orders/${id}`,
        method: 'PUT',
        body: params,
      }),
    }),
    confirmOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}/store`,
        method: 'PUT',
        body: {},
      }),
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'DELETE',
        body: {},
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateOrderQuery, useGetOrdersQuery, useGetOrdersByStoreIdQuery, useGetOrdersByServiceInfoIdQuery, useGetOrdersByParamsQuery, useUpdateOrderMutation, useConfirmOrderMutation, useDeleteOrderMutation } = orderApi;
