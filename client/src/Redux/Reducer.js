import { GET_ANIME
  ,GET_MOVIE_DETAIL
  ,ADD_CAR
  ,LOG_GOOGLE} from "./Actions-type";

const initialState = {
  allMovies: [],
  copyAllMovies: [],
  movieDetail : {},
  carMovie : [],
  user : {}
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ANIME:
      return {
        ...state,
        allMovies: action.payload,
        copyAllMovies :action.payload,
      };
    case   GET_MOVIE_DETAIL: 
    return {
      ...state,
      movieDetail : action.payload,
    }
    case  ADD_CAR : 
      return {
          ...state,
         carMovie : [...state.carMovie,action.payload],
      }
    case LOG_GOOGLE :
      return { 
         ...state, 
         user : action.payload,
      }
    default:
      return state;
  }
};



export default rootReducer;
