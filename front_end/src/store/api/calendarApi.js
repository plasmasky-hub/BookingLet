import { apiSlice } from './apiSlice';

const calendarApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBusinessTime: builder.query({
      query: (q) => `/calendar/businessTime?${q}`,
    }),
    getChartDate: builder.query({
      query: (q) => `/calendar/chart?${q}`,
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
