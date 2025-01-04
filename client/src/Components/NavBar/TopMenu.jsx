import React from 'react';
import { Link } from 'react-router-dom';

const TopMenu = ({ children }) => {
    return (
        <nav className="bg-gradient-to-r from-gray-900 to-gray-950 shadow-lg border-b border-purple-500/20">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div className="flex space-x-7">
                        <Link to="/Home" className="flex items-center py-4 px-2">
                            <span className="font-semibold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600">
                                Anime Movies
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-3">{children}</div>
                </div>
            </div>
        </nav>
    );
};

export default TopMenu;

