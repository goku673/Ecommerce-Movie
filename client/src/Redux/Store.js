import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { animeApi } from './api/apiAnime';
import  animeSlice from './slice/animeSlice';
import userSlice from './slice/userSliece';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [animeApi.reducerPath]: animeApi.reducer,
    pagination: animeSlice,
    userState: userSlice,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(authApi.middleware,animeApi.middleware),
});

export default store;