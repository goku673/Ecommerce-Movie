import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

  export const animeApi = createApi({
        reducerPath: 'animeApi',
        baseQuery: fetchBaseQuery({
            baseUrl : 'https://api.jikan.moe/v4/anime'
        }),
        endpoints: (builder) => ({
            getAnime : builder.query({
                query: (page) => `?page=${page}`,
            }),
            searchAnime : builder.query({
                query: (name) => `?q=${name}`,
            }),
        })
  });

    export const {
        useGetAnimeQuery,
        useSearchAnimeQuery,
        } = animeApi;


        //https://api.jikan.moe/v4/top/anime

        //GET https://api.jikan.moe/v4/anime?q={nombre} par buscar por nombre

        //https://v0.dev/chat/urtUVSgPoUc
