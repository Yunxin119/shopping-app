import express from 'express';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js';
import { getProducts, getProductById, deleteProduct, createProduct, updateProduct } from '../controllers/ProductController.js';

router.route('/').get(getProducts);
router.route('/:id')
.get(getProductById)
.post(protect, admin, createProduct)
.delete(protect, admin, deleteProduct)
.put(protect, admin, updateProduct);

export default router;
