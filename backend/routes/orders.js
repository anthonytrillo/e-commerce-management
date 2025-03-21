const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const Product = require('../models/Product');

// Crear nuevo pedido
router.post('/', auth, async (req, res) => {
  try {
    // Verificar stock disponible
    for (const item of req.body.items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Producto ${item.product} no encontrado` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Stock insuficiente para ${product.name}. Disponible: ${product.stock}` 
        });
      }
    }

    const order = new Order({
      user: req.user.id,
      items: req.body.items,
      shippingAddress: req.body.shippingAddress,
      paymentInfo: req.body.paymentInfo,
      total: req.body.total
    });

    const newOrder = await order.save();

    // Actualizar stock
    for (const item of req.body.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      });
    }

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener pedidos del usuario
router.get('/my', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.product', 'name price images');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar estado del pedido
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });

    order.status = req.body.status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;