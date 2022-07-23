import { apiSlice } from './apiSlice';

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRootCategories: builder.query({
      query: () => '/rootCategory',
    }),
    getSubCategories: builder.query({
      query: (id) => `/subCategory?rootCategoryId=${id}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetRootCategoriesQuery, useGetSubCategoriesQuery } =
  categoryApi;
