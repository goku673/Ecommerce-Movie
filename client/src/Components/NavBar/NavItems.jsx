import React from 'react';
import { Link } from 'react-router-dom';

const NavItems = ({ items, className }) => (
    <div className={`flex flex-col md:flex-row ${className}`}>
        {items.map((item) => (
            <Link
                to={item.href}
                key={item.href}
                className="py-2 px-3 font-medium text-gray-300 rounded-full hover:bg-purple-500/10 hover:text-white transition duration-300"
            >
                {item.label}
            </Link>
        ))}
    </div>
);

export default NavItems;

