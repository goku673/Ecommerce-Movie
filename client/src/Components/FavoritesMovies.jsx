import React from 'react';
import { useGetFavoritesQuery } from '../Redux/api/favoriteAnimeApi';
import MovieFavoriteList from './MovieFavoriteList';
import { useSelector } from 'react-redux';
import { useDeleteFavoritesMutation } from '../Redux/api/favoriteAnimeApi';
import Button from './common/Button';
import { useNavigate } from 'react-router-dom';
import { X, Heart} from 'lucide-react';
import Modal from './Modal';

const FavoritesMovies = () => {
  const navigate = useNavigate();  
  const userId = useSelector((state) => state.userState.user.id);
  const { data: favoriteAnimeData, error, isLoading, refetch: refreshData} = useGetFavoritesQuery(userId);
  const [deleteFavorite] = useDeleteFavoritesMutation();
  const [showModal, setShowModal] = React.useState(false);

  if (isLoading) {
    return <div className="text-white">Cargando favoritos...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error al cargar favoritos: {error.message}</div>;
  }
 
  const removeFavorites = async (idFavorite) => {
       try {
         await deleteFavorite({userId, idFavorite });
         refreshData();
       } catch (error) {
         console.error(error);
       }
  }

 const handleOnclick = () => {
      navigate('/main');
 }
  
const handlerBuy = () => {
    
} 
  return (
    <div className="relative p-8 shadow-gray-50  shadow-[0px_2px_0px_0px_rgba(255,105,180,0.8)] text-white bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900">
      <div className='flex items-start justify-start'>
               <Button 
                 onClick={handleOnclick}
                  >
                <X className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full text-white hover:w-7 hover:h-7 hover:from-purple-300"/>
               </Button>
      </div>
        <div className='flex items-center justify-center space-x-2'> 
         <span className="text-3xl font-bold mb-6">🎥</span>   
        <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600">Mis Películas Favoritas</h1>
   
        </div>
            { favoriteAnimeData.length <= 0 ? 
                <div className="flex flex-col items-center justify-center mt-10 p-4 border border-dashed border-gray-500 rounded-lg bg-gray-800">
                    <Heart className="w-12 h-12 text-gray-500 mb-2" />
                    <span className="text-lg font-semibold text-gray-300">No tienes películas favoritas.</span>
                    <span className="text-sm text-gray-400">Agrega algunas para verlas aquí.</span>
                </div>
            :(
                <div className="overflow-x-auto">
                <div className="inline-flex space-x-4 pb-4">
                  <MovieFavoriteList 
                    favoriteMovies={favoriteAnimeData}
                    addFavorites={() => {}}
                    removeFavorites={removeFavorites}
                    handlerBuy={handlerBuy}
                  />
                
              </div>
            </div>
        )}
    </div>
  );
  
};

export default FavoritesMovies;
