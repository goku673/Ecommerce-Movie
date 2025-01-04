import React from 'react';
import { Star, Clock, Calendar, Play, ShoppingCart, Heart } from 'lucide-react';

function MovieCard({ movie, onAddToFavorites, isFavorite }) {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 border border-purple-500/20">
      <div className="relative">
        <img 
          src={movie.images.jpg.large_image_url || movie.images.jpg.image_url} 
          alt={movie.title} 
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-2 py-1 m-2 rounded-md text-sm font-semibold">
          Anime
        </div>
        <button 
          onClick={() => onAddToFavorites(movie.id)}
          className="absolute top-2 left-2 p-2 bg-gray-900 bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all duration-200"
          aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          <Heart 
            className={`w-6 h-6 ${isFavorite ? 'text-pink-500 fill-pink-500' : 'text-white'}`} 
          />
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600 leading-tight mb-2 truncate" title={movie.title}>
          {movie.title}
        </h2>
        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-300 flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="font-semibold mr-1">Puntuación:</span> {movie.score || "N/A"}
          </p>
          <p className="text-sm text-gray-300 flex items-center">
            <Clock className="w-4 h-4 text-purple-500 mr-1" />
            <span className="font-semibold mr-1">Episodios:</span> {movie.episodes || "Desconocido"}
          </p>
          <p className="text-sm text-gray-300 flex items-center">
            <Calendar className="w-4 h-4 text-purple-500 mr-1" />
            <span className="font-semibold mr-1">Año:</span> {movie.year || "Desconocido"}
          </p>
        </div>
        <p className="text-lg font-bold text-pink-500 mb-4">Precio: $25.00</p>
      </div>
      <div className="p-4 bg-gray-800 flex justify-between">
        <a 
          href={movie.trailer.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded hover:from-purple-600 hover:to-indigo-700 transition-colors text-sm font-medium flex-grow mr-2 text-center flex items-center justify-center"
        >
          <Play className="w-4 h-4 mr-1" />
          Ver Trailer
        </a>
        <button className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition-colors text-sm font-medium flex-grow ml-2 flex items-center justify-center">
          <ShoppingCart className="w-4 h-4 mr-1" />
          Comprar
        </button>
      </div>
    </div>
  );
}

export default MovieCard;


