
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const favoriteAnimeApi = createApi({
    reducerPath: 'favoritesAnimeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3002/movies",
    }),
    endpoints: (builder) => ({
        getFavorites: builder.query({
            query: (userId) => `/favorites/${userId}`,
        }),
        postFavorites: builder.mutation({
            query: (animeData) => ({
                url: `/new-favorites`,
                method: 'POST',
                body: animeData,
            }),
            invalidatesTags: ['FavoritesAnime'],
        }),
        deleteFavorites: builder.mutation({
            query: ({ userId, idFavorite }) => ({
                url: `/delete-favorites/user/${userId}/${idFavorite}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['FavoritesAnime'],
        }),
    }),
});
//http://localhost:3002/movies/delete-favorites/user/1/83b4b180-c8e3-4940-9ed6-327d87958f5a
export const {
    useGetFavoritesQuery,
    usePostFavoritesMutation,
    useDeleteFavoritesMutation,
} = favoriteAnimeApi;
