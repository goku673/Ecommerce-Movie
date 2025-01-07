import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const url_Base = import.meta.env.VITE_URL_BASE;
console.log(url_Base);
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${url_Base}/user`
  }),

  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (signUp) => ({
        url: '/signUp',
        method: 'POST',
        body: signUp,
      }),
    }),
    
    logIn: builder.mutation({
      query: (credentials) => ({
        method: "POST",
        url: "/signIn",
        body: credentials,
      }),
    }),
  })
});

export const {
  useSignUpMutation, 
  useLogInMutation,
  
} = authApi;