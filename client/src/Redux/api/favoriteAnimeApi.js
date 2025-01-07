
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const url_Base = import.meta.env.VITE_URL_BASE;
export const favoriteAnimeApi = createApi({
    reducerPath: 'favoritesAnimeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${url_Base}/movies`
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

export const {
    useGetFavoritesQuery,
    usePostFavoritesMutation,
    useDeleteFavoritesMutation,
} = favoriteAnimeApi;
