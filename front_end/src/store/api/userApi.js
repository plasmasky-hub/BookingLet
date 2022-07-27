import { apiSlice } from './apiSlice';

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/user',
    }),

    getUser: builder.query({
      query: (_id) => `/user/${_id}`,
    }),

    addUser: builder.mutation({
      query: (user) => ({
        url: '/user',
        method: 'POST',
        body: user,
      }),
    }),

    getFavouriteStoreById: builder.query({
      query: (_id) => `/user/${_id}/FavouriteStoreList`,
    }),

    getUserStores: builder.query({
      query: (_id) => `/user/${_id}/stores`,
    }),

    // getStore: builder.query({
    //   query: (_id) => `/store/${_id}`,
    // }),

    login: builder.mutation({
      query: (data) => ({
        url: '/user/login',
        method: 'POST',
        body: {
          email: data.email,
          password: data.password,
        },
      }),
      // transformResponse: (response) => response,
    }),

    register: builder.mutation({
      query: (data) => ({
        url: '/user/register',
        method: 'POST',
        body: {
          name: data.name,
          tel: data.tel,
          email: data.email,
          password: data.password,
        },
      }),
      // transformResponse: (response) => response,
    }),

    addOrCancelFavoriteStore: builder.mutation({
      query: ({ userId, storeId }) => ({
        url: '/user/addOrCancelFavoriteStore',
        method: 'POST',
        body: {
          userId: userId,
          storeId: storeId,
        },
      }),
      // transformResponse: (response) => response,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useGetFavouriteStoreByIdQuery,
  useLoginMutation,
  useRegisterMutation,
  useGetUserStoresQuery,
  useAddOrCancelFavoriteStoreMutation,
} = userApi;
