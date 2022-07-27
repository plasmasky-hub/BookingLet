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
      query: (bodyObj) => ({
        url: `/calendar/store/${bodyObj.id}`,
        method: 'POST',
        body: bodyObj,
      }),
      invalidatesTags: ['Calendar'],
    }),
    addCalendarTimeById: builder.mutation({
      query: (bodyObj) => ({
        url: `/calendar/serviceInfo/${bodyObj.id}`,
        method: 'POST',
        body: bodyObj,
      }),
      invalidatesTags: ['ServiceCalendar'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetBusinessTimeQuery, useGetChartDateQuery, useAddStoreBusinessTimeByIdMutation, useAddCalendarTimeByIdMutation } = calendarApi;
