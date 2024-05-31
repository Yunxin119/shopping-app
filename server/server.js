import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connect from './config/db.js';
import path from 'path'
import products from './data/products.js';

// connect to mongoDB
connect();

const app = express();

// const port = process.env.PORT || 5000;
const port = 5000;

//Home
app.get('/', (req, res) => {
    res.send('API is running');
})

// GET: Products Index
app.get('/api/products', (req, res) => {
    res.send(products)
})

// GET: Product Detail
app.get('/api/products/:id', (req, res) => {
    const {id} = req.params;
    const product = products.find((p)=> p._id === id);
    res.json(product)
})

app.listen(port, ()=> {
    console.log(`APP RUNNING ON PORT ${port}`)
})