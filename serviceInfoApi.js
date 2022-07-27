import { apiSlice } from './apiSlice';

const serviceInfoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllServiceInfos: builder.query({
      query: (id) => `/serviceInfo?storeId=${id}`,
      providesTags: ['Service'],
    }),

    getServiceInfo: builder.query({
      query: (id) => `/serviceInfo/${id}`,
      providesTags: ['Service'],
    }),

    addServiceInfo: builder.mutation({
      query: (service) => ({
        url: '/serviceInfo',
        method: 'POST',
        body: service,
      }),
      invalidatesTags: ['Service'],
    }),

    deleteServiceInfo: builder.mutation({
      query: (id) => ({ url: `/serviceInfo/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Service'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllServiceInfosQuery,
  useGetServiceInfoQuery,
  useDeleteServiceInfoMutation,
  useAddServiceInfoMutation,
} = serviceInfoApi;
