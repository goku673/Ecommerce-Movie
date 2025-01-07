// Store.js
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { animeApi } from './api/apiAnime';
import { favoriteAnimeApi } from './api/favoriteAnimeApi';
import { reseniasApi } from './api/ReseniasApi';
import animeSlice from './slice/animeSlice';
import userSlice from './slice/userSliece';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [animeApi.reducerPath]: animeApi.reducer,
    [favoriteAnimeApi.reducerPath]: favoriteAnimeApi.reducer,
    [reseniasApi.reducerPath]: reseniasApi.reducer,
    pagination: animeSlice,
    userState: userSlice,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(authApi.middleware, animeApi.middleware, favoriteAnimeApi.middleware, reseniasApi.middleware),
});

export default store;