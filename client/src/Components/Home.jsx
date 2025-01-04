import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import TopMenu from "./NavBar/TopMenu";
import NavItems from "./NavBar/NavItems";
import { useGetAnimeQuery } from "../Redux/api/apiAnime";
import { nexPage, prevPage } from "../Redux/slice/animeSlice";
import { setUser } from '../Redux/slice/userSliece';
import MovieList from './Cards';
import Modal from './Modal';
import UserProfileModal from './UserProfileModal ';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const page = useSelector(state => state.pagination.page);
    const user = useSelector(state => state.userState.user);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: animeData, error, isLoading, refetch } = useGetAnimeQuery(page);
    
    const userVerified = useMemo(() => JSON.parse(localStorage.getItem('user')), []);

    useEffect(() => {
        if (userVerified) {
            dispatch(setUser(userVerified));
        }
    }, [dispatch, userVerified]);

    const handleOnClose = () => {
        setIsModalOpen(false);
    };

    const handleOnLogout = () => {
        // Implement logout logic here
        console.log("Logging out...");
        localStorage.removeItem('user');
        navigate('/');
        setIsModalOpen(false);
    };

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

    if (isLoading) return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-900 to-gray-950">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-900 to-gray-950">
            <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline"> {error.message}</span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100">
            <TopMenu>
                <NavItems items={NavItemsData}/>
                {user && (
                    <div className="flex items-center">
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full transition-colors duration-200"
                        >
                            <img 
                                className="h-8 w-8 rounded-full border-2 border-purple-500" 
                                alt="user-image" 
                                src={user.image_profile || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ41A81cAVOwJ6e58SZMxg_Fh-VSwnYIWb3Bw&s"} 
                            />
                            <span className="text-sm">{user.name}</span>
                        </button>   
                    </div>
                )}
            </TopMenu>
           
            <main className="container mx-auto px-4 py-8">
                <Modal />
                <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600 mb-8">Tienda de Películas de Anime</h1>
                <MovieList movies={animeData?.data} />
                
                <div className="flex justify-center mt-12">
                    <div className="inline-flex rounded-md shadow">
                        <button 
                            onClick={handlePrevPage} 
                            disabled={page === 1}
                            className={`px-6 py-3 rounded-l-md text-sm font-medium ${
                                page === 1 
                                ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                                : 'bg-purple-600 text-white hover:bg-purple-700'
                            } transition-colors`}
                        >
                            Anterior
                        </button>
                        <button 
                            onClick={handleNextPage} 
                            disabled={page === 25}
                            className={`px-6 py-3 rounded-r-md text-sm font-medium ${
                                page === 25 
                                ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                            } transition-colors`}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
                <p className="text-center mt-4 text-gray-400">Página {page} de 25</p>
            </main>
            <UserProfileModal
                isOpen={isModalOpen}
                user={user}
                handleOnClose={handleOnClose}
                handleOnLogout={handleOnLogout}
            />
        </div>
    );
};

export default Home;

