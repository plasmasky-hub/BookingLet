import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://bookinglet-app-load-balancer-938249793.ap-southeast-2.elb.amazonaws.com/v1' }),
  endpoints: () => ({}),
});
