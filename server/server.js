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
import UploadRoutes from './routes/UploadRoutes.js'


// connect to mongoDB
connect();

const app = express();

const port = process.env.PORT || 5000;
// const port = 5000;

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

// upload file route
app.use('/api/upload', UploadRoutes)

const __dir = path.resolve();
app.use(express.static(path.join(__dir, 'client/build')));

app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dir, 'client', 'build', 'index.html'))
);

// use paypal in the app
app.get('/api/config/paypal', (req, res) => res.send({ clientId: process.env.PAYPAL_CLIENT_ID }));

// set __dirname to current directory
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// error handler
app.use(notFound);
app.use(errorHandler);


app.listen(port, ()=> {
    console.log(`APP RUNNING ON PORT ${port}`)
})