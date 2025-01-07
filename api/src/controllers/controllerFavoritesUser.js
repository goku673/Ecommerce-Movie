
const { User, Favorite } = require('../db');

    const getFavoritesController = async (userId) => {
        return await Favorite.findAll({
            where: {
                user_id: userId,
            },
        });
    }

    const postFavoritesController = async (body) => {
        const { id_movie, user_id } = body;

        try {
            const existingFavorite = await Favorite.findOne({
                where: {
                    id_movie: id_movie,
                    user_id: user_id,
                },
            });

            if (existingFavorite) {
                throw new Error('La película ya está en tus favoritos');
            }
            const newFavorite = await Favorite.create(body);
            return newFavorite;

        } catch (error) {
            throw new Error(`Error al agregar a favoritos: ${error.message}`);
        }
    };

    const deleteFavoritesController = async (userId, idFavorites) => {
        try {
            
            const deletedCount = await Favorite.destroy({
                where: {
                    id: idFavorites,
                    user_id: userId, 
                },
            });
            if (deletedCount === 0) {
                throw new Error('No se encontró el favorito para eliminar.');
            }
    
            return { message: 'Favorito eliminado con éxito.' };
        } catch (error) {
            throw new Error('Error al eliminar el favorito: ' + error.message);
        }
    };
    
    module.exports = {
        getFavoritesController,
        postFavoritesController,
        deleteFavoritesController,
    };