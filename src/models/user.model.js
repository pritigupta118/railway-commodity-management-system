import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  phone: {
    type: String,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  refreshToken : {
    type: String
  },
  role: { 
    type: String, 
    enum: ["admin", "user"], 
    required: true 
  }
});

// encrypting password
userSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10)
  next()
})


// creating a custom methos to check the password
userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}

//generating access token
userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
    {
      _id : this._id,
      email : this.email,
      fullName : this. fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

//generating refresh token
userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
    {
      _id : this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn : process.env.REFRESH_TOKEN_SECRET
    }
  )
}

export const User = mongoose.model("User", userSchema)