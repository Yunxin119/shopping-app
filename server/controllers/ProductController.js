import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/ProductSchema.js";

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
   const page = Number(req.query.pageNumber) || 1;

   const keyword = req.query.keyword ? {name: {$regex: req.query.keyword, $options: 'i'}} : {};

   const count = await Product.countDocuments({...keyword});
   const products = await Product.find({...keyword})
     .limit(pageSize)
     .skip(pageSize * (page - 1));

   res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc Fetch single product by Id
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error('Resource Not Found');
});


 // @desc    Create a product
 // @route   POST /api/products
 // @access  Private/Admin
 const createProduct = asyncHandler(async (req, res) => {
  const newProduct = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdProduct = await newProduct.save();
  res.status(201).json(createdProduct);
 })

 // @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  } else {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  }
})

// @desc    create a new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { rating, comment } = req.body;
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  } else {
    const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString());
    if (alreadyReviewed) {
      res.status(400);
      throw new Error ('You have already reviewed this product')
    }
    
    const review = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
    await product.save();
    res.status(200).json({message: 'Review added'})
  }
})

// @desc Fetch carosel products
// @route GET /api/products/top
// @access Public
const getCarousel = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(5);
  res.status(200).json(products);
});

export { getProductById, getProducts, createProduct, updateProduct, deleteProduct, createProductReview, getCarousel };
