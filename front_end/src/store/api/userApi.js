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

    login: builder.mutation({
			query: (data) => ({
				url:"/user/login",
				method: "POST",
				body: {
					email: data.email,
					password: data.password,
				}
			}),
			// transformResponse: (response) => response,
		}),

    register: builder.mutation({
			query: (data) => ({
				url:"/user/register",
				method: "POST",
				body: {
          name: data.name,
          tel: data.tel,
					email: data.email,
					password: data.password,
          role: data.role,
				}
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
} = userApi;
