import React from 'react';
import { Link } from 'react-router-dom';

const TopMenu = ({ children }) => {
    return (
        <nav className="bg-gradient-to-r from-gray-900 to-gray-950 shadow-lg border-b border-purple-500/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/main" className="flex-shrink-0">
                            <span className="font-semibold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600">
                                Anime Movies
                            </span>
                        </Link>
                    </div>
                    <div className="flex-1 flex items-center justify-center">{children}</div>
                </div>
            </div>
        </nav>
    );
};

export default TopMenu;

