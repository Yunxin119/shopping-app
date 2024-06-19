import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/OrderSchema.js"
import User from "../models/UserSchema.js";

// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice
    } = req.body;

    // Debugging logs
    // console.log('Request body:', req.body);
    // console.log('User ID:', req.user ? req.user._id : 'User not found');

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('Oops! No order items');
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems: orderItems.map((o) => ({
                ...o,
                product: o._id,
                _id: undefined,
            })),
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();
        // console.log('Created Order:', createdOrder);
        res.status(201).json(createdOrder);
    }
});

// @desc Get logged in user orders
// @route GET /api/myorders
// @access Private
const getMyOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
})

// @desc Update orer to paid
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        res.status(400);
        throw new Error(`Oops! Cannot find order ${req.params.id}`);
    } else {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        }

        const updateOrder = await order.save();
        res.status(200).json(updateOrder)
    }
})

// @desc Update orer to delivered
// @route PUT /api/orders/:id/deliver
// @access Private
const updateOrderToDelivered = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        res.status(400);
        throw new Error(`Oops! Cannot find order ${req.params.id}`);
    } else {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updateOrder = await order.save();
        res.status(200).json(updateOrder)
    }
})

// @desc    Get order by ID
 // @route   GET /api/orders/:id
 // @access  Private
 const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'username email');
    if (order) {
        res.json(order);
    } else {
        res.status(404)
        throw new Error('Order Not Found')
    }
  });


 // @desc    Get all orders
 // @route   GET /api/orders
 // @access  Private/Admin
 const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'username email');
    if (orders) {
        res.json(orders);
    } else {
        res.status(404)
        throw new Error('Orders Not Found')
    }
  });

  export {
    getAllOrders,
    getMyOrders,
    getOrderById,
    updateOrderToDelivered,
    updateOrderToPaid,
    addOrderItems
  }