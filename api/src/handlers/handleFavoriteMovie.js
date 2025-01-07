
const { postFavoritesController, getFavoritesController, deleteFavoritesController } = require('../controllers/controllerFavoritesUser');

const getFavoritesHandler = async (req, res, next) => {
  try {
      const userId = parseInt(req.params.userId, 10);
      const favorites = await getFavoritesController(userId);
      res.status(200).json(favorites);
  } catch (error) {
      next({
          error: error.message,
          statusCode: error.statusCode || 500, 
      });
  }
};

const postFavoritesHandler = async (req, res, next) => {
  try {
      const newFavorite = await postFavoritesController(req.body);
      res.status(201).json(newFavorite);
  } catch (error) {
      next(error);
  }
};
const deleteFavoritesHandler = async (req, res, next) => {
   try {
    const { userId, idFavorite } = req.params;
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    console.log(userId, idFavorite);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    await deleteFavoritesController(parseInt(userId, 10), idFavorite);
    res.status(204).json({ message: 'Favorito eliminado con éxito.' });
   } catch (error) {
     next({ 
      error: error.message, 
      statusCode: error.statusCode || 500
    })
   }
}

module.exports = {
    getFavoritesHandler,
    postFavoritesHandler,
    deleteFavoritesHandler,
}