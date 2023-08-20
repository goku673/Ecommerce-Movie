import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { deleteCar } from '../Redux/Actions';
import { useDispatch } from 'react-redux';
const Navbar = () => {
  const dispatch = useDispatch();
  const carMovie = useSelector((state) => state.carMovie);
  const numberItems = carMovie.length;
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const precioTotal =  carMovie.reduce((acumulador,item) => {
     return acumulador + item.price;
  },0);

  const handleClickOutsideModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutsideModal);
    return () => {
      document.removeEventListener('click', handleClickOutsideModal);
    }
  }, []);

  const handleModal = (event) => {
    event.stopPropagation();
    setShowModal(!showModal);
  };

  const handleButton = (event) => {
      if(carMovie.length  === 0){
       return   Swal.fire({
          title : "Compra", 
          text : 'agrege elementos  para comprar',
          icon :'info'
       })
       
      }

       Swal.fire({
          title : "Compra", 
          text : 'Compra realizado con exito',
          icon : 'success',
       })
       dispatch(deleteCar());
       // aumentar un useEffect
  }
  return (
    <>
      <nav className="bg-gray-800 py-4">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <img src="logito" alt="logo" className="h-10" />
          </div>
          <ul className="flex space-x-4 text-gray-300 text-sm font-medium">
            <li>
              <Link to="/home" className="hover:text-white">
                Home
              </Link>
            </li>
            <div>
              <Link to ='/contact'>contact</Link>
            </div>

            <div onClick={handleModal} className="relative">
              <span className="material-symbols-outlined hover:text-white cursor-pointer">
                shopping_cart
              </span>

              {numberItems > 0 && (
                <div className="absolute top-4 left-1 md:left-2 lg:left-6 xl:left-6 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center z-10">
                  {numberItems > 9 ? '+' : numberItems}
                </div>
              )}
            </div>
          </ul>
        </div>
      </nav>
      {showModal && (
        <div className="fixed top-0 right-0 h-screen w-1/4 sm:w-1/2 md:w-2/4 lg:w-1/4 bg-gray-900 rounded z-50 overflow-auto" ref={modalRef}>
          <div className="max-w-xlp-5 border border-red-950">
            <h2 className='flex justify-center bg-purple-700 text-white'>ADDED MOVIES</h2>
            <div className="flex flex-wrap gap-4 ">
              {carMovie.map((item) => (
                <div key={item.id} className="flex items-center w-full gap-6 border-b py-5  border-purple-700 ">
                  <img src={item.images} alt={item.name} className="w-24 h-auto object-cover rounded" />

    
                  <div>
                    <h3 className="text-yellow-400 text-lg font-bold">{item.title}</h3>
                    <span className="text-yellow-400">Price : ${item.price}</span>
                  </div>
                  
                </div>
              ))}
            </div>
            
            <h2 className='flex justify-center text-white'>Total :  {precioTotal}</h2>
            <button className='bg-green-400 flex items-center ml-40 px-10 hover:bg-green-500 ' onClick={handleButton}>BUY</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;





