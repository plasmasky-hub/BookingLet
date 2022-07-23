import { apiSlice } from './apiSlice';

const loginApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.query({
			query: (data) => ({
				url:'/login',
				method: 'GET',
				body: {
					email: data.email,
					password: data.password,
				}
			}),
		}),
	}),
	overrideExisting: false,
});

export const { useLoginQuery } = loginApi;