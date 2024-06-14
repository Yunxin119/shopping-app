import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
dotenv.config();
import connect from './config/db.js';
import path from 'path'
import ProductRoutes from './routes/ProductRoutes.js';
import UserRoutes from './routes/UserRoutes.js'
import OrderRoutes from './routes/OrderRoutes.js'
import { notFound, errorHandler } from './middleware/errorHandler.js';

// connect to mongoDB
connect();

const app = express();

// const port = process.env.PORT || 5000;
const port = 5000;

//Home
app.get('/', (req, res) => {
    res.send('API is running');
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser midlleware
app.use(cookieParser())

// Using router in product routes file
app.use('/api/products', ProductRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/orders', OrderRoutes);
app.use(notFound);
app.use(errorHandler);


app.listen(port, ()=> {
    console.log(`APP RUNNING ON PORT ${port}`)
})