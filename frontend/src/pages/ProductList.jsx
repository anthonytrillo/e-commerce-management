import React, { useState, useEffect, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import { CartContext } from '../context/CartContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const { addToCart } = useContext(CartContext);
  
  const category = searchParams.get('category');
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = '/products';
        if (category) {
          url += `?category=${category}`;
        }
        console.log("Categoria", category)
        const res = await api.get(url);
        console.log("Data", res.data)

        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar productos');
        setLoading(false);
      }
    };

    setLoading(true);
    fetchProducts();
  }, [category]);
  
  const handleAddToCart = (product) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images && product.images.length > 0 ? product.images[0] : null
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {category ? `Productos: ${category}` : 'Todos los Productos'}
      </h1>
      
      {/* Filtros */}
      <div className="mb-8 flex flex-wrap gap-4">
        <Link 
          to="/products" 
          className={`px-4 py-2 rounded-full ${!category ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Todos
        </Link>
        <Link 
          to="/products?category=electronics" 
          className={`px-4 py-2 rounded-full ${category === 'electronics' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Electrónica
        </Link>
        <Link 
          to="/products?category=clothing" 
          className={`px-4 py-2 rounded-full ${category === 'clothing' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Ropa
        </Link>
        <Link 
          to="/products?category=home" 
          className={`px-4 py-2 rounded-full ${category === 'home' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Hogar
        </Link>
      </div>
      
      {loading ? (
        <div className="text-center py-8">
          <p>Cargando productos...</p>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">
          <p>{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                <Link to={`/product/${product._id}`}>
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
                </Link>
                
                <div className="p-4">
                  <Link to={`/product/${product._id}`}>
                    <h2 className="font-semibold text-lg mb-2">{product.name}</h2>
                  </Link>
                  <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    {product.stock > 0 
                      ? `${product.stock} disponibles` 
                      : <span className="text-red-500">Agotado</span>}
                  </p>
                  
                  <div className="flex justify-between">
                    <Link 
                      to={`/product/${product._id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Ver detalles
                    </Link>
                    
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:bg-gray-400"
                      disabled={product.stock <= 0}
                    >
                      Añadir
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p>No se encontraron productos{category ? ` en la categoría ${category}` : ''}.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;