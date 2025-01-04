import React from 'react';
import TopMenu from "./NavBar/TopMenu";
import NavItems from "./NavBar/NavItems";
import { useGetAnimeQuery } from "../Redux/api/apiAnime";
import { useSelector, useDispatch } from "react-redux";
import { nexPage, prevPage } from "../Redux/slice/animeSlice";
import { useEffect } from "react";
import MovieList from './Cards';

const Home = () => {
    const dispatch = useDispatch();
    const page = useSelector(state => state.pagination.page);
  
    const { data: animeData, error, isLoading, refetch } = useGetAnimeQuery(page);

    useEffect(() => {
        if (animeData) {
            //console.log(animeData.data[0]);
        }
    }, [animeData, dispatch, page]);
    //separate component to do
    if (isLoading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );
   //separate component to do
    if (error) return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline"> {error.message}</span>
            </div>
        </div>
    );

    const NavItemsData = [
        { label: "Carrito", href: "/carrito" },
        { label: "Favoritos", href: "/favoritos" },
        { label: "Ver Ahora", href: "/ver-ahora" },
    ];
   
    const handleNextPage = () => {
        dispatch(nexPage());
        refetch();
    };

    const handlePrevPage = () => {
        dispatch(prevPage());
        refetch(); 
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <TopMenu>
                <NavItems items={NavItemsData} />
            </TopMenu>
           
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Tienda de Películas de Anime</h1>
                <MovieList movies={animeData?.data} />
                
                <div className="flex justify-center mt-12">
                    <div className="inline-flex rounded-md shadow">
                        <button 
                            onClick={handlePrevPage} 
                            disabled={page === 1}
                            className={`px-6 py-3 rounded-l-md text-sm font-medium ${
                                page === 1 
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                            } transition-colors`}
                        >
                            Anterior
                        </button>
                        <button 
                            onClick={handleNextPage} 
                            disabled={page === 25}
                            className={`px-6 py-3 rounded-r-md text-sm font-medium ${
                                page === 25 
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                            } transition-colors`}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
                <p className="text-center mt-4 text-gray-600">Página {page} de 25</p>
            </main>
        </div>
    );
};

export default Home;