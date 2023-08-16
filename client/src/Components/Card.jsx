import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ title, imagen, rating, price, details }) => {
  return (
    <div className='bg-gray-900 rounded-lg shadow-lg h-[400px] w-[300px]'>

      <div className='flex items-center justify-center'>
        <img src={imagen} alt='image' className='w-[200px] h-[200px]' />
      </div>

      <div className='bg-gradient-to-tl from-purple-500 to-indigo-600 text-white p-4 flex flex-col mt-4 h-[46%] rounded'>
        <div className='flex flex-col items-center justify-center gap-2'>
          <h2 className='font-bold'>{title}</h2>
          <p className='text-sm'>{rating}</p>
          <span>USD $ {price}</span>
        </div>
      </div>
      <Link to={details} className='relative bottom-14 ml-24 shadow-white p-2 bg-violet-950 text-white w-[120px] rounded hover:bg-violet-900'>More Details</Link>
    </div>
  );
};


export default Card;