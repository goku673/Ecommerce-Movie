import React from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';

const Cards = ({ movies }) => {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3 justify-center'>
      {movies?.map((movie) => (
        <div key={movie.id} className='flex justify-center' >
          <Card
            title={movie.title}
            imagen={movie.images}
            rating={movie.rating}
            price={movie.price}
            details={`/peliculaDetail/${movie.id}`}
          />
        </div>
      ))}
    </div>
  );
};

export default Cards;