const { postUserDB, getUserDB, getAllUsersDB } = require('../controllers/controllerUser');

const postUser = async (req, res, next) => {
   try {
     const response = await postUserDB(req.body);
     res.status(201).json(response); 
    
   } catch (error) {
    next({
        message: error.message,
        statusCode: error.statusCode || 400,
        requestBody: req.body,
    })
   }
}

const getUser = async (req, res, next) => {
    try {
        const response = await getUserDB(req.body);
        
        res.status(200).json(response);
    } catch (error) {
        next({
            message: error.message,
            statusCode: error.statusCode || 404,
            requestBody: req.body,
        })
    }
}

  const getAllUsers = async (req, res, next) => {
     try {
        const response = await getAllUsersDB();
        res.status(200).json(response);
     } catch (error) {
        next({
            message: error.message,
            statusCode: error.statusCode || 404,
            requestBody: req.body,
        })
     }
  }


module.exports = {
    postUser,
    getUser,
    getAllUsers,
}