import { apiSlice } from "./apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/user",
    }),

    getUser: builder.query({
      query: (_id) => `/user/${_id}`,
    }),

    addUser: builder.mutation({
      query: (user) => ({
        url: "/user",
        method: "POST",
        body: user,
      }),
    }),
    getFavouriteStoreById: builder.query({
      query: (_id) => `/user/${_id}/FavouriteStoreList`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useGetFavouriteStoreByIdQuery,
} = userApi;
