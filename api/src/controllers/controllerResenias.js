const { Resenias, User, Favorite } = require('../db');
// const resenias = require('../model/resenias');

    const getReseniaController =  async() => {
        return await Resenias.findAll({
            include: {
                model: User,
                attributes: ["id", "name", "email", "image_profile"],
            }
        });
    }


    const postReseniaController = async (body) => {
          const { comentario, user_id } = body;
          const nuevaResenia = Resenias.create({
            comentario,
            user_id,
          })
          return nuevaResenia;
    }


    module.exports = {
        getReseniaController,
        postReseniaController,
    }