import express from 'express';
const router = express.Router();
import products from '../data/products.js';

// GET: Products Index
router.get('/', (req, res) => {
    res.json(products)
})

// GET: Product Detail
router.get('/:id', (req, res) => {
    const {id} = req.params;
    const product = products.find((p)=> p._id === id);
    res.json(product)
})

export default router;