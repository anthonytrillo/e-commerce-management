import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold">MyApp</Link>
        </div>
        
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-gray-300 transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/orders" className="hover:text-gray-300 transition-colors">Orders</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-gray-300 transition-colors">Login</Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-gray-300 transition-colors">Register</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;