import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//generate access & refresh token
const generateAccessAndRefreshTokens = async (userId) => {

  try {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    // saving refresh token to the database
    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }

  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating refresh and access token")
  }

}

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  const { username, email, fullName, phone, password, role } = req.body
  console.log("email: ", email);

  // check all fields are given or not
  if ([username, email, fullName, phone, password, role].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required")
  }

  // check if the user is already exist or not
  const existedUser = await User.findOne({
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
  const createdUser = await User.findById(user._id).select("-password -refreshToken")

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user")
  }

  //return res
  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  )
})

const loginUser = asyncHandler(async (req, res) => {
  // get email and password from the user
  const { email, password } = req.body

  // email exist or not
  if (!email) {
    throw new ApiError(400, "email is required")
  }

  // find the user
  const user = await User.findOne({ email })

  if (!user) {
    throw new ApiError(404, "User does not exist")
  }

  //password checking
  const isPasswordValid = await user.isPasswordCorrect(password)

  if (!isPasswordValid) {
    throw new ApiError(404, "Invalid usewr credentials")
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)


  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

  const options = {
    httpOnly: true,
    secure: true
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser, accessToken, refreshToken
        },
        "User logged in Successfully"
      )
    )
})

const logoutUser = asyncHandler(async (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    $unset: {
      refreshToken: 1
    }
  },
    {
      new: true
    }
  )

  const options = {
    httpOnly: true,
    secure: true
}

return res
.status(200)
.clearCookie("accessToken", options)
.clearCookie("refreshToken", options)
.json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

  if (!incomingRefreshToken) {
      throw new ApiError(401, "unauthorized request")
  }

  try {
      const decodedToken = jwt.verify(
          incomingRefreshToken,
          process.env.REFRESH_TOKEN_SECRET
      )
  
      const user = await User.findById(decodedToken?._id)
  
      if (!user) {
          throw new ApiError(401, "Invalid refresh token")
      }
  
      if (incomingRefreshToken !== user?.refreshToken) {
          throw new ApiError(401, "Refresh token is expired or used")
          
      }
  
      const options = {
          httpOnly: true,
          secure: true
      }
  
      const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
  
      return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
          new ApiResponse(
              200, 
              {accessToken, refreshToken: newRefreshToken},
              "Access token refreshed"
          )
      )
  } catch (error) {
      throw new ApiError(401, error?.message || "Invalid refresh token")
  }

})

//  get current user
 
const getCurrentUser = asyncHandler(async(req, res) => {
  return res
  .status(200)
  .json(new ApiResponse(
      200,
      req.user,
      "User fetched successfully"
  ))
})

// get a sigle user given by the id

const getUser = asyncHandler(async(req, res) => {
 const {id} = req.params
  
 if (!id) {
  throw new ApiError(404, "id not found")

 }

  const foundUser = await User.findOne({_id: id}).select("-password -refreshToken")

 if (!foundUser) {
  throw new ApiError(400, "User not available")
 }

 return res.status(200).json(
  new ApiResponse(200, foundUser, "User found successfully")
 )

})

// get all users

const getAllUsers = asyncHandler(async(req,res) => {
  const users = await User.find().select("-password -refreshToken")

  return res.status(200).json(new ApiResponse(200, users, "Users fetched successfully"))
})




export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  getUser,
  getAllUsers
}