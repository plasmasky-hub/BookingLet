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
    addStoreBusinessTimeById: builder.mutation({
      query: (id, bodyObj) => ({
        url: `/calendar/store/${id}`, //此处并没有传入id
        method: 'POST',
        body: bodyObj,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetBusinessTimeQuery, useGetChartDateQuery, useAddStoreBusinessTimeByIdMutation } = calendarApi;
