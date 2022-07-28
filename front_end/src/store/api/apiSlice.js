import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.bookinglet.com.au/v1' }),
  tagTypes: ['Service', 'Calendar', 'ServiceCalendar'],
  endpoints: () => ({}),
});
