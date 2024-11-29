import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, Home, Mail, X, Store } from 'lucide-react';
import Swal from 'sweetalert2';
import { deleteCar } from '../Redux/Actions';

const Navbar = () => {
  const dispatch = useDispatch();
  const carMovie = useSelector((state) => state.carMovie);
  const numberItems = carMovie.length;
  const [showModal, setShowModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const modalRef = useRef(null);

  const precioTotal = carMovie.reduce((acumulador, item) => {
    return acumulador + item.price;
  }, 0);

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

  const handleButton = () => {
    if(carMovie.length === 0) {
      return Swal.fire({
        title: "Compra",
        text: 'Agregue elementos para comprar',
        icon: 'info'
      });
    }

    Swal.fire({
      title: "Compra",
      text: 'Compra realizada con éxito',
      icon: 'success',
    });
    dispatch(deleteCar());
    setShowModal(false);
  }

  return (
    <>
      {/* Navbar Principal */}
      <nav className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo y Nombre */}
            <div className="flex-shrink-0 flex items-center">
              <Store className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-white font-bold text-xl hidden sm:block">AnimeStore</span>
            </div>

            {/* Enlaces de Navegación - Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/home" className="text-gray-300 hover:text-white flex items-center space-x-2 transition-colors">
                <Home className="h-5 w-5" />
                <span>Inicio</span>
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-white flex items-center space-x-2 transition-colors">
                <Mail className="h-5 w-5" />
                <span>Contacto</span>
              </Link>
              <button 
                onClick={handleModal}
                className="text-gray-300 hover:text-white relative flex items-center space-x-2 transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Carrito</span>
                {numberItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {numberItems > 9 ? '9+' : numberItems}
                  </span>
                )}
              </button>
            </div>

            {/* Menú Mobile */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="text-gray-300 hover:text-white p-2"
              >
                {showMobileMenu ? (
                  <X className="h-6 w-6" />
                ) : (
                  <div className="space-y-1">
                    <div className="w-6 h-0.5 bg-gray-300"></div>
                    <div className="w-6 h-0.5 bg-gray-300"></div>
                    <div className="w-6 h-0.5 bg-gray-300"></div>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menú Mobile Expandido */}
        {showMobileMenu && (
          <div className="md:hidden bg-gray-800 pb-4">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/home"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setShowMobileMenu(false)}
              >
                <div className="flex items-center space-x-2">
                  <Home className="h-5 w-5" />
                  <span>Inicio</span>
                </div>
              </Link>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setShowMobileMenu(false)}
              >
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>Contacto</span>
                </div>
              </Link>
              <button
                onClick={(e) => {
                  handleModal(e);
                  setShowMobileMenu(false);
                }}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Carrito</span>
                  {numberItems > 0 && (
                    <span className="bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ml-2">
                      {numberItems > 9 ? '9+' : numberItems}
                    </span>
                  )}
                </div>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Modal del Carrito */}
      {showModal && (
        <div 
          className="fixed inset-y-0 right-0 w-full sm:w-96 bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out"
          ref={modalRef}
        >
          <div className="h-full flex flex-col">
            {/* Encabezado del Modal */}
            <div className="bg-purple-700 p-4 flex items-center justify-between">
              <h2 className="text-white font-bold text-lg">Películas Agregadas</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-white hover:text-gray-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Contenido del Carrito */}
            <div className="flex-1 overflow-y-auto p-4">
              {carMovie.length === 0 ? (
                <div className="text-center text-gray-400 mt-8">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4" />
                  <p>Tu carrito está vacío</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {carMovie.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex gap-4 p-4 bg-gray-800 rounded-lg border border-purple-700/30"
                    >
                      <img 
                        src={item.images} 
                        alt={item.name} 
                        className="w-24 h-32 object-cover rounded-md"
                      />
                      <div className="flex flex-col justify-between">
                        <h3 className="text-yellow-400 font-bold">{item.title}</h3>
                        <p className="text-yellow-400">${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer del Modal */}
            <div className="border-t border-gray-700 p-4 bg-gray-800/50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white font-bold">Total:</span>
                <span className="text-white font-bold">${precioTotal}</span>
              </div>
              <button
                onClick={handleButton}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Store className="h-5 w-5" />
                <span>Comprar Ahora</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;


