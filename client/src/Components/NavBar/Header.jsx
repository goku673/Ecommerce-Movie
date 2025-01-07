// Navbar.js
import React, { useState } from "react";
import TopMenu from "./TopMenu";
import NavItems from "./NavItems";
import { useNavigate } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import Input from "../common/Input";

const Header = ({
  user,
  isModalOpen,
  setIsModalOpen,
  searchQuery,
  setSearchQuery,
  handleSearch,
  isSearching,
  isMenuOpen,
  handleMenuOpen,
}) => {
  
  const navigate = useNavigate();

  const NavItemsData = [
    { label: "Favoritos", href: "/main/favorites" },
    { label: "Reseñas", href: "/main/resenias"},
  ];
  
  return (
    <TopMenu>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center flex-grow">
          <form
            onSubmit={handleSearch}
            className="hidden md:block flex-grow max-w-md mx-4"
          >
            <div className="relative">
              <Input
                type={"search"}
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

          <div className="hidden md:flex space-x-4">
            <NavItems items={NavItemsData} />
          </div>
        </div>

        <div className="flex items-center ml-auto">
          <button
            onClick={() => handleMenuOpen()}
            className="md:hidden items-center p-2 text-gray-300 hover:bg-gray-700 rounded-md mr-2"
          >
            <Menu className="w-6 h-6" />
          </button>

          {user && (
            <div className="flex items-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center space-x-2 b lg:hover:bg-gray-700 text-white px-4 py-2  transition-colors duration-200   lg:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.8)]"
              >
                <img
                  className="h-8 w-8 rounded-full border-2 border-purple-500"
                  alt="user-image"
                  src={user?.image_profile || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ41A81cAVOwJ6e58SZMxg_Fh-VSwnYIWb3Bw&s"}
                />
                <span className="text-sm hidden lg:inline">{user.name}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </TopMenu>
  );
};

export default Header;