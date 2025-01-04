import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3002' +'/user'
  }),

  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (signUp) => ({
        url: '/signUp',
        method: 'POST',
        body: signUp,
      }),
    }),
    // arreglar aqui  porque al ingresar las credentiales estoy haciendo un get
    logIn: builder.mutation({
      query: (credentials) => ({
        method: "GET",
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