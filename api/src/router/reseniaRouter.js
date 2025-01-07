const { Router } = require('express');
const { getReseniasHandler, postReseniasHandler } = require('../handlers/handlerResenia');


const routerResenias = Router();
routerResenias.get("/",getReseniasHandler);
routerResenias.post("/new-resenia", postReseniasHandler);

module.exports = routerResenias;