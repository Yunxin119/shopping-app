import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/UserSchema.js'

// @desc: authorize user
 // @route: POST /api/users/login
 // @access: Public
 const authUser = asyncHandler(async (req, res) => {
    res.send('auth user');
  });


// @desc: register a new user
// @route: POST /api/users
// @access: Public
const registerUser = asyncHandler(async (req, res) => {
    // const user = req.params;
    // User.insert(user);
    res.send('register user')
})


// @desc: get all users
// @route: GET /api/users
// @access: Private
const getAllUser = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
})

// @desc: delete user
// route DELETE /api/users/:id
// @access: Private
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params);
    if (user) {
        User.deleteOne(user);
    }
    res.status(404);
    res.send('User Not Find')
})

// @desc: get user by ID
// route: GET /api/users/:id
// @access: Private
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).lean(); // Use .lean() to convert to plain JS object
    if (user) {
      return res.json(user);
    }
    res.status(404);
    throw new Error('User Not Found');
  });

// @desc: update user
// @route: PATCH /api/users/:id
const updateUserById = asyncHandler(async (req, res) => {
    res.send('update user by id')
})


// @desc: get user profile
// route: GET /api/users/profile
// @access: Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.send('getUserProfile')
})

// @desc: update user profile
// @route: PATCH /api/users/:id
// @access: Private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('update user profile')
})

export { authUser, registerUser, getAllUser, getUserById, updateUserById, getUserProfile, updateUserProfile, deleteUser }