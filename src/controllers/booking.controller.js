import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Booking } from "../models/booking.model.js"
import { Train } from "../models/train.model.js"
import { User } from "../models/user.model.js"
import {Commodity} from "../models/commodity.model.js"


// create a booking
const createBooking = asyncHandler(async(req,res) => {
  const {user_id, train_id, commodity_id} = req.body
 
  // vallidation
  if (!user_id || !train_id || !commodity_id) {
    throw new ApiError(400, "All fields are required")
  }


  const user_available = await User.findOne({_id: user_id})
  if (!user_available) {
    throw new ApiError(404, "User not found")
  }
  const train_available = await Train.findOne({_id: train_id})
  if (!train_available) {
    throw new ApiError(404, "Train not found")
  }
  
const commodity_available = await Commodity.findOne({_id: commodity_id})
if (!commodity_available) {
  throw new ApiError(404, "Commodity not found")
}

if(commodity_available.weight > train_available.maxLoad){
  throw new ApiError(400, "Commodity weight exceeds train capacity")
}



// creating and saving a booking
const newBook = await Booking.create({
  user: user_available._id,
  train: train_available._id,
  commodity: commodity_available._id
})

return res.status(200).json(
  new ApiResponse(201, newBook, "Booking successfull")
)

})

// get all bookings

const getAllBookings = asyncHandler(async(req,res) => {
  const bookings = await Booking.find().populate("user","email fullName phone").populate("train","name trainNumber startPoint destination startDate reachDate price").populate("commodity", "name")
  return res.status(200).json(new ApiResponse(200, bookings, "Bookings fetched successfully"))
})

// get a bookings by id
const getBookingById = asyncHandler(async(req,res) => {
  const {id} = req.params
  if(!id){
    throw new ApiError(400, "Booking id is required")
  }

  const foundedBooking = await Booking.findOne({_id: id}).populate("user","email fullName phone").populate("train","name trainNumber startPoint destination startDate reachDate price").populate("commodity", "name")

  return res.status(200).json(
    new ApiResponse(200, foundedBooking, "Booking fetched successfully")
  )
})

// delete booking by id
const deleteBookingById = asyncHandler(async(req,res) => {
  const {id} = req.body
  if(!id){
    throw new ApiError(400, "Booking id is required")
    }
    const existBooking = await Booking.findOne({_id:id})

    if (!existBooking) {
      throw new ApiError(401, "Booking is not exist")
    }

    await existBooking.deleteOne()
    return res.status(200).json(new ApiResponse(200, null, "Booking deleted successfully"))
})


export{
  createBooking,
  getAllBookings,
  getBookingById,
  deleteBookingById
}