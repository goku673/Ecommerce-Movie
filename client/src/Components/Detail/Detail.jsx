import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { detailsMovie } from '../../Redux/Actions';
import { useDispatch, useSelector} from 'react-redux';
import  {useSnackbar}  from 'notistack';
import { addCarrito } from '../../Redux/Actions';
//import verifyCardAdd from './validacionAdd';

const Detail = () => {


const {id} = useParams();
const dispatch = useDispatch();
const detailMovie = useSelector((state) => state.movieDetail);
const carMovie = useSelector((state) => state.carMovie);

const {enqueueSnackbar} = useSnackbar();



const handleClick = () => {
  const result =carMovie.some((d => d.id === detailMovie.id));

  if (result){

     enqueueSnackbar('already added',{variant : 'warning'});
  }else{
    enqueueSnackbar('add sussces',{variant : 'success'});  
    dispatch(addCarrito(detailMovie));
  }
  
}
   
    
 const alreadyAdded = (data,detail) => { 
       const result  = data.some((d) => d.id === detail.id);
      
 }

 

useEffect(() => {
    dispatch(detailsMovie(id));
},[id]);



  return (
    <div className='container mx-auto'>
      <div className='xl:flex xl:justify-center xl:items-center'>
      <img src={detailMovie?.images} alt='imagen' className='rounded-lg w-full md:w-1/2 lg:w-1/3 mb-6 md:mr-12 max-w'/>
      <div className='bg-white rounded-lg shadow-xl p-8 max-w-md flex-grow text-gray-800'>
        <h1 className='text-xl font-bold'>{detailMovie?.title}</h1>
        <span>Age rating:</span>
        <h2>{detailMovie?.rating}</h2>
        <p>{detailMovie?.synopsis}</p>
        <a href={detailMovie?.trailer} target='_blank' rel='noreferrer' class='bg-gradient-to-tl from-purple-500 to-indigo-600 text-white h-full flex flex-col justify-between px-4 py-2 mt-4 rounded hover:bg-red hover:text-black'>Watch Trailer</a>
        <div className='flex justify-between items-center'>
            	<h3>Price:</h3>
              <div className='bg-gray-200 text-lg rounded px-4 py-2'> $ {detailMovie?.price} </div>
            </div>
            <button className='bg-green-500 hover:bg-green-600 text-white text-lg px-4 py-2 mt-4 rounded-md  block mx-auto' onClick={handleClick}>add Car</button>
      </div>

      </div>
    </div>
  )
}


export default Detail;
