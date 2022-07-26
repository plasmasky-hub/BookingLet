import { apiSlice } from './apiSlice';

const calendarApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBusinessTime: builder.query({
      query: (q) => `/calendar/businessTime?${q}`,
    }),
    getChartDate: builder.query({
      query: (q) => `/calendar/chart?${q}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetBusinessTimeQuery, useGetChartDateQuery } = calendarApi;
