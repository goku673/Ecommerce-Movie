import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { getAnime } from '../Redux/Actions';
import Cards from './Cards';
import { useState, useEffect } from 'react';

const Pagination = () => {
  const dispatch = useDispatch();
  const allMovies = useSelector((state) => state.allMovies);
  const copyAllMovies = useSelector((state) => state.copyAllMovies); //mis 1000 películas

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (allMovies.length === 0) {
      dispatch(getAnime());
    }

    setCurrentPage(0); 

  }, [dispatch]);


  const itemsPerPage = 6;
  const lastIndex = (currentPage + 1) * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  let moviesToShow = [];

  if (copyAllMovies.length > firstIndex) {
    moviesToShow = copyAllMovies.slice(firstIndex, lastIndex);
  }
  
  //Función para manejar el cambio de página
  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };
  //from-purple-500 to-indigo-600 flex rounded-lg
  return (
    <div className="pagination-container">
      <Cards movies={moviesToShow} />

      {/* Componente react-paginate */}
      <div className='pagination-wrapper flex justify-center my-10'>
        <ReactPaginate
          previousLabel={'<-'}
          nextLabel={'->'}
          breakLabel={'...'}
          pageCount={Math.ceil(copyAllMovies.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName="inline-flex"
          previousClassName="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded-l-lg"
          nextClassName="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded-r-lg"
          pageClassName="bg-indigo-100 text-indigo-500 px-3 py-2"
          activeClassName="bg-indigo-200 text-indigo-700"
          disabledClassName="text-gray-300 px-3 py-2"

          renderOnZeroPageCount={null}

        />
      </div>

    </div>
  );
};

export default Pagination;