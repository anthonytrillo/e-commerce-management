import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  // Sample data - in a real app, this would come from an API
  const [orders, setOrders] = useState([
    {
      id: 'ORD-1234',
      date: '2025-03-15',
      total: 125.99,
      status: 'Delivered',
      items: [
        { id: 1, name: 'Product 1', quantity: 2, price: 49.99 },
        { id: 2, name: 'Product 2', quantity: 1, price: 26.01 }
      ]
    },
    {
      id: 'ORD-1235',
      date: '2025-03-10',
      total: 89.99,
      status: 'Processing',
      items: [
        { id: 3, name: 'Product 3', quantity: 1, price: 89.99 }
      ]
    },
    {
      id: 'ORD-1236',
      date: '2025-03-05',
      total: 214.97,
      status: 'Delivered',
      items: [
        { id: 4, name: 'Product 4', quantity: 1, price: 149.99 },
        { id: 5, name: 'Product 5', quantity: 2, price: 32.49 }
      ]
    }
  ]);

  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleOrderDetails = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      
      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div 
                className="p-4 cursor-pointer flex justify-between items-center border-b"
                onClick={() => toggleOrderDetails(order.id)}
              >
                <div>
                  <h3 className="font-medium">{order.id}</h3>
                  <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${order.total.toFixed(2)}</p>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                    order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              {expandedOrder === order.id && (
                <div className="p-4 bg-gray-50">
                  <h4 className="font-medium mb-2">Order Items</h4>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Item</th>
                        <th className="text-center py-2">Quantity</th>
                        <th className="text-right py-2">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="py-2">{item.name}</td>
                          <td className="text-center py-2">{item.quantity}</td>
                          <td className="text-right py-2">${item.price.toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr className="font-medium">
                        <td colSpan="2" className="text-right py-2">Total</td>
                        <td className="text-right py-2">${order.total.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <div className="mt-4 flex justify-between">
                    <button className="text-blue-600 hover:text-blue-800">
                      Track Package
                    </button>
                    <button className="text-blue-600 hover:text-blue-800">
                      View Invoice
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;