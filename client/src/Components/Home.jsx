import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import TopMenu from "./NavBar/TopMenu";
import NavItems from "./NavBar/NavItems";
import { useGetAnimeQuery } from "../Redux/api/apiAnime";
import { nexPage, prevPage } from "../Redux/slice/animeSlice";
import { setUser } from "../Redux/slice/userSliece";
import MovieList from "./MovieList";
import Modal from "./Modal";
import UserProfileModal from "./UserProfileModal ";
import { useNavigate } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import Input from "./common/Input";
import { useGetFavoritesQuery, usePostFavoritesMutation } from "../Redux/api/favoriteAnimeApi";
import { useDeleteFavoritesMutation } from "../Redux/api/favoriteAnimeApi";
import Header from "./NavBar/Header";
import { Outlet } from "react-router-dom";
import { useSearchAnimeQuery } from "../Redux/api/apiAnime";
import { Star, Calendar, Film, Tag, Pointer,CheckCircle, Info} from 'lucide-react';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const page = useSelector((state) => state.pagination.page);
  const user = useSelector((state) => state.userState.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenBuy, setIsModalOpenBuy] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: animeData, error, isLoading, refetch } = useGetAnimeQuery(page);
  const [postFavorites, {  isError, isSuccess }] = usePostFavoritesMutation();
  const [itemForModal , setItemForModal] =  useState({
      title: "",
      image: "",
      price: 25,
      synopsis: "",
      score : 0,
      year: 0,
      genres: "",
      episodes: 0,

  }); 
  const [isBuy, setIsBuy] = useState(false);

  const userVerified = useMemo(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }, []);
  const { data: favoriteAnimeData, error: errorFavorite, isLoading: isLoadingFavorite, refetch: refetchFavorites } = useGetFavoritesQuery(JSON.parse(localStorage.getItem("user")).id);
  const { data: searchResults, isFetching: isSearching } = useSearchAnimeQuery(searchQuery, {
    skip: !searchQuery,
  });

  const  [deleteFavorites] = useDeleteFavoritesMutation();
  let animeList = (searchQuery && !isSearching && searchResults?.data) ? searchResults.data : animeData?.data || [];
  
  useEffect(() => {
    if (userVerified) {
      dispatch(setUser (userVerified));
    }
  }, [dispatch, userVerified]);

  const handleOnClose = () => {
    setIsModalOpen(false);
  };
   
  const handleAcepted = () => {
        setIsBuy(true); 
  }

  const handleCloseModal = () => {
       setIsModalOpenBuy(false);
       setIsBuy(false);
  }

  const handleOnLogout = () => {
    localStorage.removeItem("user");
    dispatch(setUser (null));
    setIsModalOpen(false);
  };

  const NavItemsData = [
    { label: "Favoritos", href: "/main/favorites" },
    { label: "Reseñas", href: "/main/resenias"},
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
    refetch();
  };

  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const addFavorites = async(animeData) => {
    animeData.user_id = user.id;
    const response = await postFavorites(animeData);
    refetchFavorites();
   }

   const removeFavorites = async (idFavorite) => {
    let userId = user.id;
    try {
        await deleteFavorites({ userId, idFavorite });
        refetchFavorites();
    } catch (error) {
        console.error('Error al eliminar favorito:', error);
    }
  };

  const handlerBuy = (item) => {
     setIsModalOpenBuy(true);
     setItemForModal(prevItemForModal => ({
        ...prevItemForModal,
        title: item.title,
        image: item.images.jpg.image_url,
        synopsis: item.synopsis,
        score: item.score,
        year: item.year,
        genres: item.genres.map(genre => genre.name).join(", "),
        episodes: item.episodes,
    }));
  }

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
        isSearching={isSearching}
        isMenuOpen={isMenuOpen}
        handleMenuOpen={handleMenuOpen}
      />
      <Outlet/>
      <div className="bg-gray-800 p-4 md:hidden">
        <form onSubmit={handleSearch} className="w-full">
          <div className="relative">
             <Input
                type="text"
                placeholder="Buscar anime..."
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-slate-900 border-indigo-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
             />
                <button
                    type="submit"
                    className="absolute inset-y-0 right-4 flex items-center px-3 text-gray-400 hover:text-white"
                >
                    <Search className={isSearching ?"w-5 h-5 animate-spin" : "w-5 h-5 "} />
                </button>
          </div>
        </form>
        {isMenuOpen && (
        <div className="md:hidden bg-gray-800 shadow-lg">
          <div className="p-4">
            <NavItems items={NavItemsData}/>
          </div>
        </div>
      )}
      </div>
   
      <main className="container mx-auto px-4 py-8">
        <div> 
        <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600 mb-8">
          {searchQuery ? "Resultados de la búsqueda" : "Películas de Anime"}
        </h1>
            </div>
        
        <Modal
          isModalOpen={isModalOpenBuy}
          handleAcepted={handleAcepted}
          handleDeclined={handleCloseModal}
          buttonNameAcepted={"Comprar"}
          ButtonNameDeclined={"Cancelar"}
          titleModal={"COMPRAR PELICULA"}
          handleCloseModal={handleCloseModal}
        >
            
        <h3 className="text-2xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          {itemForModal.title}
        </h3>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <img 
              src={itemForModal.image} 
              alt={itemForModal.title} 
              className="w-full h-auto rounded-lg shadow-lg border-2 border-purple-500/30"
            />
          </div>
          <div className="w-full md:w-2/3 space-y-4">
            <p className="text-gray-300 italic">{itemForModal.synopsis}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="font-semibold">Puntuación:</span> {itemForModal.score}
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-blue-400 mr-2" />
                <span className="font-semibold">Año:</span> {itemForModal.year}
              </div>
              <div className="flex items-center">
                <Film className="w-5 h-5 text-pink-400 mr-2" />
                <span className="font-semibold">Episodios:</span> {itemForModal.episodes}
              </div>
              <div className="flex items-center">
                <Tag className="w-5 h-5 text-green-400 mr-2" />
                <span className="font-semibold">Géneros:</span> {itemForModal.genres}
              </div>
              <div className="flex items-center">
                <Pointer className="w-5 h-5 text-pink-400 mr-2" />
                <span className="font-semibold">Precio:</span> $25 
              </div>
            </div>
          </div>
        </div>
      
        </Modal>
        <Modal
           isModalOpen={isBuy}
           handleAcepted={handleCloseModal}
           handleDeclined={handleCloseModal}
           buttonNameAcepted={"Continuar"}
           ButtonNameDeclined={"Cancelar"}
           titleModal={"COMPRA EXISTOSA"}
           handleCloseModal={() => setIsBuy(false)}
        >
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-xl shadow-2xl">
        <div className="flex items-center justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          ¡Compra Exitosa!
        </h3>
        <div className="space-y-4 text-center">
          <p className="text-lg text-gray-300">
            ¡Felicidades! Tu compra se ha procesado correctamente.
          </p>
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <p className="text-sm text-gray-400 flex items-start">
              <Info className="w-5 h-5 mr-2 flex-shrink-0 text-blue-400" />
              Esta app está hecha con fines de aprendizaje. La película no se compró realmente, ya que no está implementado un sistema de pagos y no tengo las peliculas para vender, si llegaste hasta aqui no olvides dejarme un comentario positivo.
            </p>
          </div>
        </div>
      </div>
        </Modal>
        <MovieList 
            movies={animeList} 
            addFavorites={addFavorites}
            favoriteAnimeData={favoriteAnimeData}
            removeFavorites = {removeFavorites}
            handlerBuy={handlerBuy}
        />
               {!searchQuery && (
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
        )}
        {!searchQuery && (
          <p className="text-center mt-4 text-gray-400">
            Página {animeData.pagination.current_page} de{" "}
            {animeData.pagination.last_visible_page}
          </p>
        )}
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
