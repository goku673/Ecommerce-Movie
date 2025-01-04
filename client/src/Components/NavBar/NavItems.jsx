// NavItems.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavItems = ({ items }) => (
    <>
        {items.map((item) => (
            <Link
                to={item.href}
                key={item.href}
                className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-gray-100 hover:text-gray-900 transition duration-300"
            >
                {item.label}
            </Link>
        ))}
    </>
);

export default NavItems;