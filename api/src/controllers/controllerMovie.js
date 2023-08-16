const {Movie} = require('../db');
//const movies = require('../model/movies');

const getMovieDB =  async () => {
    const  movieDB =  Movie.findAll({
          attributes : ["id","title","synopsis","rating","images","price"],
    }
    );
    return movieDB;
}

const getMovieDBID = async (id) =>  {
      const movie = await Movie.findByPk(id);
      return movie;
}

const getMovieByName = async (name) => {

    const dataBaseMovies = await Movie.findAll();
     if(name){
        let peli = dataBaseMovies.filter((mov) => { 
            return mov.title.includes(name)})
            if(peli.length){
                return peli;
             }else {
                return dataBaseMovies;
             }
        }else {
           return dataBaseMovies;
        }

   
}


module.exports = { 
    getMovieDB,
    getMovieDBID,
    getMovieByName,
}