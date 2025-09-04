const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Productos
router.post('/products', productController.createProduct);
router.get('/products', productController.getProducts);

// Extras solicitados
router.get('/products/count', productController.countProducts);
router.get('/products/sum', productController.sumProductCosts);

// Categorías (1:N)
router.post('/categories', productController.createCategory);
router.get('/categories', productController.getCategories);
router.get('/categories/:id/products', productController.getProductsByCategory);

module.exports = router;

