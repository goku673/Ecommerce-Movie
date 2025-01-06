import React from 'react';
import { useGetFavoritesQuery } from '../Redux/api/favoriteAnimeApi';
import MovieFavoriteList from './MovieFavoriteList';
import { useSelector } from 'react-redux';

const FavoritesMovies = () => {
  const userId = useSelector((state) => state.userState.user.id);
  const { data: favoriteAnimeData, error, isLoading } = useGetFavoritesQuery(userId);

  if (isLoading) {
    return <div className="text-white">Cargando favoritos...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error al cargar favoritos: {error.message}</div>;
  }
  
  return (
    <div className="relative p-8 shadow-gray-50  shadow-[0px_2px_0px_0px_rgba(255,105,180,0.8)] text-white bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900">
        <div className='flex items-center justify-center space-x-2'> 
         <span className="text-3xl font-bold mb-6">🎥</span>   
        <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600">Mis Películas Favoritas</h1>
        </div>
        
        <div className="overflow-x-auto">
          <div className="inline-flex space-x-4 pb-4">
            <MovieFavoriteList 
              favoriteMovies={favoriteAnimeData}
              addFavorites={() => {}}
              removeFavorites={() => {}}
            />
          
        </div>
      </div>
    </div>
  );
  
};

export default FavoritesMovies;
