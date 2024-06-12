import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  const { username, email, fullName, phone, password, role } = req.body
  console.log("email: ", email);

  // check all fields are given or not
  if ([username, email, fullName, phone, password, role].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required")
  }

  // check if the user is already exist or not
  const existedUser = User.findOne({
    $or: [{ username }, { email }]
  })

  if (existedUser) {
    throw new ApiError(409, "User is already existed")
  }

  // create user object
  const user = await User.create({
    username,
    email,
    fullName,
    phone,
    password,
    role
  })
  // remove password and refrsh token from response
  // check for user creation
  const createdUser = User.findById(user._id).select("-password -refreshToken")

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user")
  }

  //return res
  return res.status(201).json(
    ApiResponse(200, createdUser, "User registered successfully")
  )
})

export {
  registerUser
}