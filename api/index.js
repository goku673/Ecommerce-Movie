const server = require('./src/app');
const axios = require('axios');
const {conn}  = require('./src/db');
const {Movie} = require('./src/db.js');
const PORT = 3002;

conn.sync({force:false}).then(() => {
     
    server.listen( PORT , async () => {
        console.log("escuchando en el puerto 3002");
        const res = await Movie.findAll();
        if(!res.length){
            for(let i = 1 ;i <=10 ;i++){
                let moviesRespose = (await axios.get(`https://api.jikan.moe/v4/anime?q=&sfw&page=${i}`)).data.data;
                let allMoviesData= [];
                
                if(Array.isArray(moviesRespose)){
                    allMoviesData= moviesRespose.map((mov) => ({
                        id : mov.mal_id,
                        title : mov.title  || ' ',
                        synopsis :mov.synopsis,
                        trailer : mov.trailer.url || ' ',
                        rating  : mov.rating || ' ', 
                        images : mov.images.jpg.large_image_url || ' ',
                        price : 10,
                    }));
                    
                    await Movie.bulkCreate(allMoviesData);
                }
            }
        }
    });
})