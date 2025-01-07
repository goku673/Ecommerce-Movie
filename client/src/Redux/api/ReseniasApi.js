import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const reseniasApi = createApi({
  reducerPath: "reseniasApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3002/resenias"
  }),

  endpoints: (builder) => ({
    postResenias: builder.mutation({
      query: (body) => ({
        url: '/new-resenia',
        method: 'POST',
        body: body,
      }),
    }),
    
    getResenias: builder.query({
      query: () => ({
        method: "GET",
        url: "/",
        
      }),
    }),
  })
});

export const {
  usePostReseniasMutation,
  useGetReseniasQuery
} = reseniasApi;