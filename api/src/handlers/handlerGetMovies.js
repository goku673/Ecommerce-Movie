const { getMovieDB, getMovieDBID, getMovieByName } = require("../controllers/controllerMovie");


const getMovies = async (req,res) => {
      try {
        const response = await  getMovieDB();
        res.status(200).json(response);

      } catch (error) {
        res.status(400).json({error : error.message});
      }
}

const getMoviesById = async (req,res) => {
            
          
  try {
    const {id} = req.params;
    console.log(id,"hola a todos como estan espero que esten bien ");
    const response = await getMovieDBID(id);
    res.status(200).json(response);
    
  } catch (error) {
    res.status(400).json({error :error.message});
  }
}

const getMoviesByName = async (req,res) => {
   
     const {name} = req.query;
     console.log(name, "hola a todas las personas las quiero ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
     try {
          if(name){
            const response = await getMovieByName(name);
            return res.status(200).json(response);
          }else {
            const response = await getMovies();
            return res.status(200).json(response);
          }
     } catch (error) {
      
     }
}

module.exports = {
   getMovies,
   getMoviesById,
   getMoviesByName,
}