import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://bookinglet-app-load-balancer-792262709.ap-southeast-2.elb.amazonaws.com/v1/' }),
  endpoints: () => ({}),
});
