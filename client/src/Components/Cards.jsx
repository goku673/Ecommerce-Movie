import React from 'react';
import MovieCard from './Card';

function MovieList({ movies }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {movies.map(movie => (
        <MovieCard key={movie.mal_id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;