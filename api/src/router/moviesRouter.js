const {Router} = require('express');

const { getFavoritesHandler, postFavoritesHandler, deleteFavoritesHandler} = require('../handlers/handleFavoriteMovie');

const movieRouter = Router();
// CRUD


movieRouter.get('/favorites/:userId',getFavoritesHandler);
movieRouter.post('/new-favorites', postFavoritesHandler);
movieRouter.delete('/delete-favorites/user/:userId/:idFavorite', deleteFavoritesHandler);

module.exports = movieRouter;