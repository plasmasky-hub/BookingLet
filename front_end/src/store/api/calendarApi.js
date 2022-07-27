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
      query: (bodyObj) => ({
        url: `/calendar/store/${bodyObj.id}`,
        method: 'POST',
        body: bodyObj,
      }),
      invalidatesTags: ['Calendar'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetBusinessTimeQuery, useGetChartDateQuery, useAddStoreBusinessTimeByIdMutation } = calendarApi;
