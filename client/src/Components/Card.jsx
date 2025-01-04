import React from 'react';

function MovieCard({ movie }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={movie.images.jpg.large_image_url || movie.images.jpg.image_url} 
          alt={movie.title} 
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 m-2 rounded-md text-sm font-semibold">
          Anime
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 leading-tight mb-2 truncate" title={movie.title}>
          {movie.title}
        </h2>
        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Director:</span> {movie.producers && movie.producers.length > 0 ? movie.producers[0].name : "Desconocido"}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Episodios:</span> {movie.episodes || "Desconocido"}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Año:</span> {movie.year || "Desconocido"}
          </p>
        </div>
        <p className="text-lg font-bold text-green-600 mb-4">Precio: $25.00</p>
      </div>
      <div className="p-4 bg-gray-50 flex justify-between">
        <a 
          href={movie.trailer.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium flex-grow mr-2 text-center"
        >
          Ver Trailer
        </a>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm font-medium flex-grow ml-2">
          Comprar
        </button>
      </div>
    </div>
  );
}

export default MovieCard;