import { GET_ANIME
  ,GET_MOVIE_DETAIL
  ,ADD_CAR} from "./Actions-type";
import axios from 'axios';

export const getAnime = ()=> async (dispatch)=>{
       const response  = await axios.get(`http://localhost:3004/movies/`);
       console.log(response);
       return dispatch({
           type : GET_ANIME,
           payload :response.data,
        });
}

export const detailsMovie = (id) => async (dispatch) => { 
     //https://api.jikan.moe/v4/anime/22
      const response = (await axios.get(`http://localhost:3004/movies/${id}`)).data;
      console.log(response, "holaa a todass las personas");
       return dispatch({
         type : GET_MOVIE_DETAIL,
         payload : response,
       })
}

export const addCarrito = (movie) => { 
   return ({type :ADD_CAR, payload : movie});
}