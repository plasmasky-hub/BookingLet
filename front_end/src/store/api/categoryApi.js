import { apiSlice } from './apiSlice';

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRootCategories: builder.query({
      query: () => '/rootCategory',
    }),
  }),
  overrideExisting: false,
});

export const { useGetRootCategoriesQuery } = categoryApi;
