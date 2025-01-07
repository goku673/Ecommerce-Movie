import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const url_Base = import.meta.env.VITE_URL_BASE;

export const reseniasApi = createApi({
  reducerPath: "reseniasApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${url_Base}/resenias`
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