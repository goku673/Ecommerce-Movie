import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

  export const animeApi = createApi({
        reducerPath: 'animeApi',
        baseQuery: fetchBaseQuery({
            baseUrl : 'https://api.jikan.moe/v4/anime'
        }),
        endpoints: (builder) => ({
            getAnime : builder.query({
                query: (page) => `?page=${page}`,
            })
        })
  });

    export const {
        useGetAnimeQuery,
        } = animeApi;


        //https://api.jikan.moe/v4/top/anime