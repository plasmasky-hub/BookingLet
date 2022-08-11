import { apiSlice } from './apiSlice';

const storeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStores: builder.query({
      query: (q) => `/store${q}`,
      providesTags: ['Favorite'],
    }),

    getStore: builder.query({
      query: (_id) => `/store/${_id}`,
      providesTags: ['Calendar', 'Favorite' , 'Store'],
    }),

    addStore: builder.mutation({
      query: (store) => ({
        url: '/store',
        method: 'POST',
        body: store,
      }),
    }),

    updateStore: builder.mutation({
      query: ({newForm,id}) => ({
        url: `/store/${id}`,
        method: 'PUT',
        body: {...newForm},
      }),
      invalidatesTags: ['Store'],
    }),

    deleteStore: builder.mutation({
      query: (id) => ({
        url: `/store/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetStoresQuery,
  useGetStoreQuery,
  useAddStoreMutation,
  useUpdateStoreMutation,
  useDeleteStoreMutation,
} = storeApi;
