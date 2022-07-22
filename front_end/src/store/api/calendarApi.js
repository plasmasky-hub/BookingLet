import { apiSlice } from './apiSlice';

const calendarApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBusinessTime: builder.query({
      query: (q) => `/calendar/businessTime?${q}`,
    }),
    getChartDate: builder.query({
      query: (q) =>
        `/calendar/chart?date=2022-07-30&serviceInfoId=62d5579230f835c4513d6c52`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetBusinessTimeQuery, useGetChartDateQuery } = calendarApi;
