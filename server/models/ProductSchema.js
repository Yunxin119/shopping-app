import mongoose from "mongoose";

const productSchema = new mongoose.Schema ({
    // the user here is because we wanna know whether the user is admin or not
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 }
}, {
    timestamps: true
})

const reviewSchema = new mongoose.Schema ({
    // the user here is to know who posted the review
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    content: { type: String, required: true },
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema);
export default Product;