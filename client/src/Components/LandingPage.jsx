import React from 'react';
import { Link } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import seya from '../image/seya.jpg';
import demon from '../image/demon.jpg';
import boku from '../image/boku.jpg';
import naruto from '../image/naruto.jpg';
import { logGoogle } from '../Redux/Actions';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import  {useSnackbar}  from 'notistack';
const LandingPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state)=> state.user);
  const {enqueueSnackbar} = useSnackbar();
  const images = [
    {
      original: seya,
      thumbnail: seya,
    },
    {
      original: demon,
      thumbnail: demon,
    },
    {
      original: boku,
      thumbnail: boku,
    },
    {
      original: naruto,
      thumbnail: naruto,
    },
  ];

  const enterPage = async () => { 
    // await dispatch(logGoogle());
    // navigate('/home');
  }
  
    
  
  //link /home
  return (
    <div className="bg-gray-900 h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="md:w-3/5">
          <ImageGallery items={images} showFullscreenButton={false} showThumbnails={false} autoPlay />
        </div>
        <div className="md:w-2/5 md:ml-12 mt-8 md:mt-0">
          <div className="text-white text-4xl font-bold mb-8">
            Las mejores películas de anime al mejor precio
          </div>
          <button  className=' bg-gradient-to-tl from-purple-500 to-indigo-600 text-white text-xl px-8 py-4 rounded-md' onClick={enterPage}>
              Entrar
              </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
