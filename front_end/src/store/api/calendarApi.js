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
    deleteStoreBusinessTimeById: builder.mutation({
      query: (bodyObj) => ({
        url: `/calendar/store/${bodyObj.id}`,
        method: 'DELETE',
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
    deleteCalendarTimeById: builder.mutation({
      query: (bodyObj) => ({
        url: `/calendar/serviceInfo/${bodyObj.id}`,
        method: 'DELETE',
        body: bodyObj,
      }),
      invalidatesTags: ['ServiceCalendar'],
    }),

    syncStoreCalendarToService: builder.mutation({
      query: (bodyObj) => ({
        url: `/calendar/store/${bodyObj.storeId}/serviceInfo/${bodyObj.serviceInfoId}`,
        method: 'POST',
      }),
      invalidatesTags: ['ServiceCalendar'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetBusinessTimeQuery, useGetChartDateQuery, useAddStoreBusinessTimeByIdMutation,
  useDeleteStoreBusinessTimeByIdMutation, useAddCalendarTimeByIdMutation, useDeleteCalendarTimeByIdMutation,
  useSyncStoreCalendarToServiceMutation } = calendarApi;
