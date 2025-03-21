import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await api.get('/products?featured=true&limit=4');
        setFeaturedProducts(res.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar productos destacados');
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white rounded-lg p-8 mb-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Bienvenido a Mi E-Commerce</h1>
          <p className="text-xl mb-6">
            Descubre los mejores productos con precios incomparables.
          </p>
          <Link
            to="/products"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Ver Productos
          </Link>
        </div>
      </div>

      {/* Featured Products */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Productos Destacados</h2>
        
        {loading ? (
          <div className="text-center py-8">
            <p>Cargando productos...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <div key={product._id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                  <div className="h-48 bg-gray-200">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                        Sin imagen
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
                    <Link
                      to={`/product/${product._id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Ver detalles
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center py-8">No hay productos destacados disponibles.</p>
            )}
          </div>
        )}
      </div>

      {/* Categories Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Categorías</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link to="/products?category=electronics" className="bg-gray-200 p-6 rounded-lg text-center hover:bg-gray-300 transition">
            <h3 className="text-xl font-semibold">Electrónica</h3>
          </Link>
          <Link to="/products?category=clothing" className="bg-gray-200 p-6 rounded-lg text-center hover:bg-gray-300 transition">
            <h3 className="text-xl font-semibold">Ropa</h3>
          </Link>
          <Link to="/products?category=home" className="bg-gray-200 p-6 rounded-lg text-center hover:bg-gray-300 transition">
            <h3 className="text-xl font-semibold">Hogar</h3>
          </Link>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gray-100 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Sobre Nosotros</h2>
        <p className="mb-4">
          Somos una tienda online dedicada a ofrecer productos de alta calidad a precios competitivos.
          Nuestro compromiso es brindar la mejor experiencia de compra y un servicio excepcional.
        </p>
        <Link to="/about" className="text-blue-600 hover:text-blue-800">
          Conoce más sobre nosotros
        </Link>
      </div>
    </div>
  );
};

export default Home;