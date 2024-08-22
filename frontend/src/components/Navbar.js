// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Customer List</Link>
                </li>
                <li>
                    <Link to="/add-customer">Add Customer</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
