
const { getReseniaController, postReseniaController } = require('../controllers/controllerResenias');
    
    const  getReseniasHandler = async (req, res, next) => {
           try {
            const resenias = await getReseniaController(req);
            res.status(200).json(resenias);
           } catch (error) {
            console.error(error);
             next({
                 error: error.message,
                 statusCode: error.statusCode || 500,
             });
           }
    }

    const postReseniasHandler = async (req, res, next) => {
         try {
            const newResenia = await postReseniaController(req.body);
            res.status(201).json(newResenia);
         } catch (error) {
             console.error(error);
             next({
                 error: error.message,
                 statusCode: error.statusCode || 500,
             });
         }
    }

    module.exports = {
        getReseniasHandler,
        postReseniasHandler,
    }