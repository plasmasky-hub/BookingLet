import { apiSlice } from './apiSlice';

const loginApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url:'/login',
				method: 'GET',
				body: {
					email: data.email,
					password: data.password,
				}
			}),
			transformResponse: (response) => response.data,

		}),
	}),
	overrideExisting: false,
});

export const { useLoginMutation } = loginApi;