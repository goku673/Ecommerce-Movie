import React from 'react';
import { Star, Clock, Calendar, Play, ShoppingCart, Heart,HeartOff } from 'lucide-react';

const GenericCard = ({ 
  item, 
  onAddToFavorites, 
  isFavorite,
  config,
  renderCustomField,
  removeFavorites,
  handlerBuy,
  isRenderFavorite
}) => {
  const {
    imageField,
    titleField,
    badgeText,
    scoreField,
    episodesField,
    yearField,
    priceField,
    trailerField,
    favoriteIdField,
    id_movieField,
    idFav,
    genresField,
  } = config;

  const getNestedValue = (obj, path) => {
    if (typeof path !== 'string') {
        console.warn('El path debe ser una cadena. Recibido:', path);
        return undefined;
    }
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

  const handleFavoriteClick = () => {
  
    if (isFavorite) { 
        if (idFav != undefined) {
            removeFavorites({
                id: getNestedValue(item,idFav),
                id_movie: getNestedValue(item, id_movieField),
                
              });
        }else {
            removeFavorites({
                id_movie: getNestedValue(item, id_movieField),
              });
        }
      
    } else {
      onAddToFavorites({
        image_url: getNestedValue(item, imageField),
        title: getNestedValue(item, titleField),
        score: getNestedValue(item, scoreField),
        episodes: getNestedValue(item, episodesField),
        year: getNestedValue(item, yearField),
        trailer_url: getNestedValue(item, trailerField),
        id_movie: getNestedValue(item, id_movieField),
        genre: item.genres.map(g => g.name).join(', '),
      });
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 border border-purple-500/20">
      <div className="relative">
        <img 
          src={getNestedValue(item, imageField) || ""} 
          alt={getNestedValue(item, titleField)} 
          className="w-full h-64 object-cover"
        />
        {badgeText && (
          <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-2 py-1 m-2 rounded-md text-sm font-semibold">
            {badgeText}
          </div>
        )}
       {onAddToFavorites && (
            <button
                onClick={handleFavoriteClick}
                className="absolute top-2 left-2 p-2 bg-gray-900 bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all duration-200"
                aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
            >
                <Heart
                className={`w-6 h-6 ${isFavorite ? 'text-pink-500 fill-pink-500' : 'text-white'}`}
                />
            </button>
     )}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600 leading-tight mb-2 truncate" title={getNestedValue(item, titleField)}>
          {getNestedValue(item, titleField)}
        </h2>
        <div className="space-y-2 mb-4">
          {scoreField && (
            <p className="text-sm text-gray-300 flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span className="font-semibold mr-1">Puntuación:</span> {getNestedValue(item, scoreField) || "N/A"}
            </p>
          )}
          {episodesField && (
            <p className="text-sm text-gray-300 flex items-center">
              <Clock className="w-4 h-4 text-purple-500 mr-1" />
              <span className="font-semibold mr-1">Episodios:</span> {getNestedValue(item, episodesField) || "Desconocido"}
            </p>
          )}
          {yearField && (
            <p className="text-sm text-gray-300 flex items-center">
              <Calendar className="w-4 h-4 text-purple-500 mr-1" />
              <span className="font-semibold mr-1">Año:</span> {getNestedValue(item, yearField) || "Desconocido"}
            </p>
          )}
          {renderCustomField && renderCustomField(item)}
        </div>
        {priceField && (
          <p className="text-lg font-bold text-pink-500 mb-4">Precio: ${getNestedValue(item, priceField)  || 25}</p>
        )}
      </div>
      <div className="p-4 bg-gray-800 flex justify-between">
        {trailerField && (
          <a 
            href={getNestedValue(item, trailerField)} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded hover:from-purple-600 hover:to-indigo-700 transition-colors text-sm font-medium flex-grow mr-2 text-center flex items-center justify-center"
          >
            <Play className="w-4 h-4 mr-1" />
            Ver Trailer
          </a>
        )}
        <button className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition-colors text-sm font-medium flex-grow ml-2 flex items-center justify-center" onClick={() => {
            if (isRenderFavorite) {
                removeFavorites({
                    id: getNestedValue(item,idFav),
                    image_url: getNestedValue(item, imageField),
                    title: getNestedValue(item, titleField),
                    score: getNestedValue(item, scoreField),
                    episodes: getNestedValue(item, episodesField),
                    year: getNestedValue(item, yearField),
                    trailer_url: getNestedValue(item, trailerField),
                    id_movie: getNestedValue(item, id_movieField),
                  });
            }else {
                handlerBuy(item);
            }
        }}>
          {isRenderFavorite ? 
          <span className="lex-grow ml-2 flex items-center justify-center">
            <HeartOff className="w-4 h-4 mr-1"/>
            quitar
          </span>  
          : <span className="lex-grow ml-2 flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 mr-1" />
                Comprar
            </span>}
          
        </button>
      </div>
    </div>
  );
}

export default GenericCard;

