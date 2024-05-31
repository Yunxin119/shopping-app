import express from 'express';
import path from 'path'
import products from './data/products.js';
const app = express();

const port = 5000;

app.get('/', (req, res) => {
    res.send('API is running');
})

app.get('/api/products', (req, res) => {
    res.send(products)
})

app.get('/api/products/:id', (req, res) => {
    const {id} = req.params;
    const product = products.find((p)=> p._id === id);
    res.json(product)
})

app.listen(port, ()=> {
    console.log(`APP RUNNING ON PORT ${port}`)
})