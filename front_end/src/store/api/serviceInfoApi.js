import { apiSlice } from './apiSlice';

const serviceInfoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllServiceInfos: builder.query({
      query: (id) => `/serviceInfo?storeId=${id}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllServiceInfosQuery } = serviceInfoApi;
