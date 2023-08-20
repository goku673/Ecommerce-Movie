import { GET_ANIME
  ,GET_MOVIE_DETAIL
  ,ADD_CAR
  ,DELETE_CAR} from "./Actions-type";
import axios from 'axios';

export const getAnime = ()=> async (dispatch)=>{
       const response  = await axios.get(`http://localhost:3002/movies/`);
       console.log(response);
       return dispatch({
           type : GET_ANIME,
           payload :response.data,
        });
}

export const detailsMovie = (id) => async (dispatch) => { 
      const response = (await axios.get(`http://localhost:3002/movies/${id}`)).data;
       return dispatch({
         type : GET_MOVIE_DETAIL,
         payload : response,
       })
}

export const addCarrito = (movie) => { 
   return ({type :ADD_CAR, payload : movie});
}

export const deleteCar  = (payload) => { 
     return ({type : DELETE_CAR, payload:payload });
}
