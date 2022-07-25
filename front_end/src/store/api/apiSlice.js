import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://api.uat.bookinglet.com.au/v1' }),
  tagTypes: ['Service'],
  endpoints: () => ({}),
});
