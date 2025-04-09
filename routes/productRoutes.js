const express = require('express');
const Product = require('../models/Product');
const { verifyToken, allowRoles } = require('../middlewares/auth');

const router = express.Router();

// Create Product - Admin only
router.post('/', verifyToken, allowRoles('admin'), async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});

// Read Products - Admin & Manager
router.get('/', verifyToken, allowRoles('admin', 'manager'), async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Update Product - Admin & Manager
router.put('/:id', verifyToken, allowRoles('admin', 'manager'), async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
});

// Delete Product - Admin only
router.delete('/:id', verifyToken, allowRoles('admin'), async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
