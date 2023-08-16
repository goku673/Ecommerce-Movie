import {  useSelector } from "react-redux";

 // todo lo que yo he añadido a mi carrito ; 


function verifyCardAdd  (movie){
     const productAdd = useSelector((state) => state.carMovie);
     const estaAniadido = productAdd.some((mov) => mov.id === movie.id);
     return estaAniadido;
}

export default verifyCardAdd;