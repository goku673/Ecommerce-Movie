import { GET_ANIME
  ,GET_MOVIE_DETAIL
  ,ADD_CAR} from "./Actions-type";

const initialState = {
  allMovies: [],
  copyAllMovies: [],
  movieDetail : {},
  carMovie : [],
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
    default:
      return state;
  }
};



export default rootReducer;
