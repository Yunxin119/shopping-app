import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors';
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/UserSchema.js";
import Product from "./models/ProductSchema.js";
import Order from "./models/OrderSchema.js";
import connect from "./config/db.js";

dotenv.config();

connect();

const importData = async() => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;
        const addProductUser = products.map((p) => {
            return { ...p, user: adminUser }
        })
        const createProducts = await Product.insertMany(addProductUser);
        console.log("Data imported!!".green.underline);
        process.exit();
    } catch (e) {
        console.log(e.message.red.underline);
        process.exit(1);
    }
}

const destroyData = async() => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
        console.log('Data Destroyed');
        process.exit();
    } catch (e) {
        console.log(e.message.red.underline);
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}