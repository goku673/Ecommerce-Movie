const {Router} = require('express');
const { getMovies, getMoviesById, getMoviesByName } = require('../handlers/handlerGetMovies');


const movieRouter = Router();
// CRUD

movieRouter.get('/',getMovies);
movieRouter.get('/:id',getMoviesById);
movieRouter.get('/name',getMoviesByName);

module.exports = movieRouter;