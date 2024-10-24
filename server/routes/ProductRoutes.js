import express from 'express';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js';
import { getProducts, getProductById, deleteProduct, createProduct, updateProduct,createProductReview, getCarousel } from '../controllers/ProductController.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/top').get(getCarousel);
router.route('/:id')
.get(getProductById)
.delete(protect, admin, deleteProduct)
.put(protect, admin, updateProduct);
router.route('/:id/reviews')
.post(protect, createProductReview)

export default router;
