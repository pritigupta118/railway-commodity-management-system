import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Train } from "../models/train.model.js"

// adding a new train
const newTrain = asyncHandler(async(req,res) => {
  const {name, trainNumber, maxLoad, startPoint, destination, startDate, reachDate, price} = req.body

  //validation
  if(!name || !trainNumber || !maxLoad || !startPoint || !destination || !startDate || !reachDate || !price){
    throw new ApiError(400, "Please fill all the fields")
  }

  // checking the train is already existed or not
   const existedTrain = await Train.findOne({
    $or: [{name}, {trainNumber}]
  })
  if (existedTrain) {
    throw new ApiError(400, "Train is already existed")
  }

  // create train object
  const train = await Train.create({
    name, 
    trainNumber, 
    maxLoad, 
    startPoint, 
    destination, 
    startDate, 
    reachDate, 
    price
  })

    //return res
    return res.status(201).json(
      new ApiResponse(200, train, "A new train is added successfully")
    )

})

// get a train by it's id
const getTrain = asyncHandler(async(req,res) => {
   const {id} = req.params

   if(!id){
    throw new ApiError(400, "Please provide the train id")
   }

  const foundTrain = await Train.findOne({_id: id}).populate("startPoint destination", "name")
  if (!foundTrain) {
    throw new ApiError(404, "Train is not available")
  }

  return res.status(200).json(
    new ApiResponse(201, foundTrain, "Train found Successfully")
  )
})

// get all trains
const getAllTrains = asyncHandler(async(req,res) => {
  const trains = await Train.find().populate("startPoint destination", "name")
  return res.status(200).json(new ApiResponse(200, trains, "Trains fetched successfully"))
})

// delete a train given by id
const deleteTrain = asyncHandler(async(req,res) => {
  const {id} = req.body

  const train = await Train.findById(id)
  if (!train) {
    throw new ApiError(404, "Train is not available")
  }
  
  await train.deleteOne()
  return res.status(200).json(new ApiResponse(200, null, "Train deleted successfully"))
})

export {
  newTrain,
  getTrain,
  getAllTrains,
  deleteTrain
}