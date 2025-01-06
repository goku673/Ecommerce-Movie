

import GenericCard from "./GenericCard";

function MovieList({ movies, addFavorites, favoriteAnimeData, removeFavorites}) {
  const movieConfig = {
    imageField: 'images.jpg.large_image_url',
    titleField: 'title',
    badgeText: 'Anime',
    scoreField: 'score',
    episodesField: 'episodes',
    yearField: 'year',
    priceField: 'price',
    trailerField: 'trailer.url',
    favoriteIdField: 'mal_id',
    id_movieField: 'scored_by',
  };

  const handleAddToFavorites = async(item) => {
    await addFavorites(item);
  };
  const handleDeleteFavorites = async(item) => {
     console.log("item eliminado",item.id_movie);
     //await deleteFavorites(item.id_movie);
     const movieToDelete = favoriteAnimeData?.find(f => f.id_movie === item.id_movie);
     console.log("el verdadero item a eliminar",movieToDelete.id);
     await removeFavorites(movieToDelete.id);
  }

  const renderCustomField = (movie) => (
    <p className="text-sm text-gray-300">
      <span className="font-semibold">Género:</span> {movie.genres.map(g => g.name).join(', ')}
    </p>
  );
  // tambien podemos aniadir una validacion de && por el nombre tambien
  const isFavorite = (movie) => {
    // console.log("mi lista de favorito",favoriteAnimeData);
    // console.log("mi movie", movie.scored_by);
    if (favoriteAnimeData?.length <= 0) return false;
    return favoriteAnimeData?.some(item => item.id_movie=== movie.scored_by);
    
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {movies.map(movie => (
        <GenericCard
          key={movie.mal_id}
          item={movie}
          config={movieConfig}
          onAddToFavorites={handleAddToFavorites}
          isFavorite={isFavorite(movie)} 
          renderCustomField={renderCustomField}
          removeFavorites={handleDeleteFavorites}
        />
      ))}
    </div>
  );
}

export default MovieList;