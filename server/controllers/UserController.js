import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/UserSchema.js'
import generateToken from "../utils/generateToken.js";

// @desc: authorize user
 // @route: POST /api/users/auth
 // @access: Public
 const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide both email and password');
    }


  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      res.json(user.toObject()); // Use .toObject() to convert Mongoose document to plain JS object
    } else {
      res.status(401);
      throw new Error('Invalid Email or Password. Please Try Again.');
    }
  });
  
// @desc: logout user
// @route: POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async(req, res) => {
  res.cookie('jwt', 'loggedout', {
    httpOnly: true,
    expires: new Date(0)
  })

   res.status(200).json({Message: 'Logged Out Successfully'})
})

// @desc: register a new user
// @route: POST /api/users
// @access: Public
const registerUser = asyncHandler(async (req, res) => {
  const {username, email, password} = req.body;
  const userExist = await User.findOne({email})
  if (userExist) {
    res.status(400);
    throw new Error ('User already exist')
  }

  const user = await User.create({
    username, email, password
  })

  if (user) {
    generateToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  }
    // const user = req.params;
    // User.insert(user);
    res.send('register user')
})


// @desc: get all users
// @route: GET /api/users
// @access: Private
const getAllUser = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
})

// @desc: delete user
// route DELETE /api/users/:id
// @access: Private
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      await User.deleteOne({ _id: user._id });
      res.json({ message: 'User removed' });
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
// @route: PATCH /api/users/profile
const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save()

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error ('User Not Found')
  }
})


// @desc: get user profile
// route: GET /api/users/profile
// @access: Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error ('User not found')
    }
})

// @desc: update user
// @route: PUT /api/users/profile
// @access: Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save()

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error ('User Not Found')
  }
})

export { authUser, registerUser, logoutUser, getAllUser, getUserById, updateUserById, getUserProfile, updateUser, deleteUser }