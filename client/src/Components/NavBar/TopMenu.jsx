import { Link } from 'react-router-dom';

const TopMenu = ({ children }) => {
    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-6xl mx-lg px-4">
                <div className="flex justify-between items-center">
                    <div className="flex space-x-7">
                        <Link to="/Home" className="flex items-center py-4 px-2">
                            <span className="font-semibold text-gray-500">
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