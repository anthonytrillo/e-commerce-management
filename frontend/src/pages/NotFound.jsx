import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="text-3xl font-semibold mt-4 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
      
      <div className="mt-16">
        <h3 className="text-xl font-medium mb-4 text-center">You might be looking for:</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="text-blue-600 hover:underline">Home</Link>
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
          <Link to="/order-history" className="text-blue-600 hover:underline">Order History</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;