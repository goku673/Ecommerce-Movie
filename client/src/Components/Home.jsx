import React from 'react';
import Navbar from './Navbar';
import Pagination from './Pagination';

const Home = () => {
  return (
    <div className=''>
      
      <div className='container mx-auto my-10 px-0'>
         {/* Renderizo el componente de paginación */}
         <div className="mt-0">
          <Pagination />
        </div>

      </div>
    </div>
  );
};

export default Home;