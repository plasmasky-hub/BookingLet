import { apiSlice } from './apiSlice';

const loginApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query({
      query: () => '/login',
    }),
  }),
  overrideExisting: false,
});

export const { useLoginQuery } = loginApi;