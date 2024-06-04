import express from 'express';
const router = express.Router();
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/ProductSchema.js'

// GET: Products Index

router.get('/', asyncHandler(async (req, res) => {
      const products = await Product.find({});
      res.json(products);
    }));

// GET: Product Detail

router.get(
    '/:id',
    asyncHandler(async (req, res) => {
      const product = await Product.findById(req.params.id);
      if (product) {
        return res.json(product);
      }
      res.status(404);
      throw new Error('Resource Not Found');
    })
  );
export default router;