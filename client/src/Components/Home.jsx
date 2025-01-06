import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import TopMenu from "./NavBar/TopMenu";
import NavItems from "./NavBar/NavItems";
import { useGetAnimeQuery } from "../Redux/api/apiAnime";
import { nexPage, prevPage } from "../Redux/slice/animeSlice";
import { setUser } from "../Redux/slice/userSliece";
import MovieList from "./Cards";
import Modal from "./Modal";
import UserProfileModal from "./UserProfileModal ";
import { useNavigate } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import { Input } from "./InpuntGeneric";
import { useGetFavoritesQuery, usePostFavoritesMutation } from "../Redux/api/favoriteAnimeApi";
import { useDeleteFavoritesMutation } from "../Redux/api/favoriteAnimeApi";
import Header from "./NavBar/Header";
import { Outlet } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const page = useSelector((state) => state.pagination.page);
  const user = useSelector((state) => state.userState.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: animeData, error, isLoading, refetch } = useGetAnimeQuery(page);
  const [postFavorites, {  isError, isSuccess }] = usePostFavoritesMutation();
  const userVerified = useMemo(() => JSON.parse(localStorage.getItem("user")),[]);
  const { data: favoriteAnimeData, error: errorFavorite, isLoading: isLoadingFavorite, refetch: refetchFavorites } = useGetFavoritesQuery(JSON.parse(localStorage.getItem("user")).id);
  const  [deleteFavorites] = useDeleteFavoritesMutation();
console.log(favoriteAnimeData)
  useEffect(() => {
    if (userVerified) {
      dispatch(setUser(userVerified));
    }
  }, [dispatch, userVerified]);

  const handleOnClose = () => {
    setIsModalOpen(false);
  };

  const handleOnLogout = () => {

    localStorage.removeItem("user");
    navigate("/");
    setIsModalOpen(false);
  };

  const NavItemsData = [
    { label: "Carrito", href: "/home" },
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

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Implement your search logic here
  };

 

  const addFavorites = async(animeData) => {
    animeData.user_id = user.id;
    const response = await postFavorites(animeData);
    refetchFavorites();
     console.log(response);
   }

   const removeFavorites = async (idFavorite) => {
    console.log(idFavorite, user.id);
    let userId = user.id;
    try {
        console.log(idFavorite)
        await deleteFavorites({ userId, idFavorite }); // Pasa el idFavorite como parte de un objeto
        refetchFavorites();
    } catch (error) {
        console.error('Error al eliminar favorito:', error);
    }
};

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-900 to-gray-950">
        <div
          className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: connection no stablecida</strong>
          <span className="block sm:inline"> {error.message}</span>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100">
      <Header
        user={user}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <Outlet/>
      <div className="bg-gray-800 p-4 md:hidden">
        <form onSubmit={handleSearch} className="w-full">
          <div className="relative">
            <Input
              type="search"
              placeholder="Buscar anime..."
              className="w-full bg-gray-700 text-white border-gray-600 focus:border-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-white"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 shadow-lg">
          <div className="p-4">
            <NavItems items={NavItemsData}/>
          </div>
        </div>
      )}
      <main className="container mx-auto px-4 py-8">
        <Modal />
        <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600 mb-8">
          Tienda de Películas de Anime
        </h1>
        <MovieList 
            movies={animeData?.data} 
            addFavorites={addFavorites}
            favoriteAnimeData={favoriteAnimeData}
            removeFavorites = {removeFavorites}
        />
        <div className="flex justify-center mt-12">
          <div className="inline-flex rounded-md shadow">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className={`px-6 py-3 rounded-l-md text-sm font-medium ${
                page === 1
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              } transition-colors`}
            >
              Anterior
            </button>
            <button
              onClick={handleNextPage}
              disabled={!animeData.pagination.has_next_page}
              className={`px-6 py-3 rounded-r-md text-sm font-medium ${
                !animeData.pagination.has_next_page
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              } transition-colors`}
            >
              Siguiente
            </button>
          </div>
        </div>
        <p className="text-center mt-4 text-gray-400">
          Página {animeData.pagination.current_page} de{" "}
          {animeData.pagination.last_visible_page}
        </p>
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
