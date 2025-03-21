import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Checkout = () => {
  const { cart, total, clearCart } = useContext(CartContext);
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    paymentMethod: 'tarjeta'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const orderData = {
        items: cart.map(item => ({
          product: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        paymentInfo: {
          method: formData.paymentMethod,
          transactionId: 'pending' // En un sistema real, se procesaría el pago primero
        },
        total
      };

      const token = localStorage.getItem('token');
      const response = await axios.post('/api/orders', orderData, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      });

      // Limpiar carrito
      clearCart();

      // Redirigir a página de confirmación
      navigate(`/order-confirmation/${response.data._id}`);

    } catch (err) {
      setError(err.response?.data?.message || 'Error al procesar el pedido');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p>Tu carrito está vacío. Por favor añade productos antes de continuar.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Resumen del pedido</h2>
          <div className="bg-gray-100 p-4 rounded">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2 font-bold flex justify-between">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Datos de envío</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block mb-1">Dirección</label>
              <input
                type="text"
                name="street"
                className="w-full border p-2 rounded"
                value={formData.street}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block mb-1">Ciudad</label>
                <input
                  type="text"
                  name="city"
                  className="w-full border p-2 rounded"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Estado/Provincia</label>
                <input
                  type="text"
                  name="state"
                  className="w-full border p-2 rounded"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block mb-1">Código Postal</label>
                <input
                  type="text"
                  name="zipCode"
                  className="w-full border p-2 rounded"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-1">País</label>
                <input
                  type="text"
                  name="country"
                  className="w-full border p-2 rounded"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-2 mt-4">Método de pago</h2>
            <div className="mb-4">
              <select
                name="paymentMethod"
                className="w-full border p-2 rounded"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                required
              >
                <option value="tarjeta">Tarjeta de crédito</option>
                <option value="paypal">PayPal</option>
                <option value="transferencia">Transferencia bancaria</option>
              </select>
            </div>

            {error && (
              <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Procesando...' : 'Confirmar pedido'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;