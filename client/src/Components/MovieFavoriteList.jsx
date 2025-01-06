import React from 'react';
import GenericCard from './GenericCard';

function MovieFavoriteList({ favoriteMovies, addFavorites, removeFavorites, activeIndex }) {
  const favoriteMovieConfig = {
    imageField: 'image_url',
    titleField: 'title',
    badgeText: 'Favorito',
    scoreField: 'score',
    episodesField: 'episodes',
    yearField: 'year',
    trailerField: 'trailer_url',
    id_movieField: 'id_movie',
  };

  const handleAddToFavorites = async (item) => {
    // await addFavorites(item);
  };

  const handleDeleteFavorites = async (item) => {
    // await removeFavorites(item.id_movie);
  };

  const renderCustomField = (movie) => (
    <p className="text-sm text-gray-300">
      <span className="font-semibold">Género:</span> {"pepitooooooooooooo"}
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
            />
          </div>
        );
      })}
    </>
  );
}

export default MovieFavoriteList;



