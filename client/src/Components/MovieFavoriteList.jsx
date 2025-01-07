import React from 'react';
import GenericCard from './GenericCard';

const  MovieFavoriteList =({ favoriteMovies, addFavorites, removeFavorites, activeIndex, handlerBuy }) => {
  const favoriteMovieConfig = {
    imageField: 'image_url',
    titleField: 'title',
    badgeText: 'Favorito',
    scoreField: 'score',
    episodesField: 'episodes',
    yearField: 'year',
    trailerField: 'trailer_url',
    id_movieField: 'id_movie',
    idFav : 'id'
  };

  const handleAddToFavorites = async (item) => {
    // await addFavorites(item);
  };

  const handleDeleteFavorites = async (item) => {
     await removeFavorites(item.id);
  };

  const renderCustomField = (movie) =>(
        <p className="text-sm text-gray-300">
          <span className="font-semibold">Género:</span> {movie.genre || "Desconocido"}
        </p>
      );
  
  return (
    <>
      {favoriteMovies.map((movie, index) => {
        const distance = Math.abs(index - activeIndex);
        const scale = 1 - (distance * 0.05);
        return (
          <div 
            key={movie.id} 
            className={`w-72 flex-shrink-0 transition-all duration-300 ease-in-out transform`}
            style={{
              transform: `scale(${scale})`,
              opacity: 1 - (distance * 0.2),
            }}
          >
            <GenericCard
              item={movie}
              config={favoriteMovieConfig}
              onAddToFavorites={handleAddToFavorites}
              isFavorite={true} 
              renderCustomField={renderCustomField}
              removeFavorites={handleDeleteFavorites}
              handlerBuy={handlerBuy}
              isRenderFavorite={true}
            />
          </div>
        );
      })}
    </>
  );
}

export default MovieFavoriteList;



