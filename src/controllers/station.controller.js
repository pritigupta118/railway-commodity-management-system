import {Station} from "../models/station.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

// create a new station
const createStation = asyncHandler(async(req,res) => {
  const {name, location} = req.body

  if([name, location].some((data)=> data?.trim() === "")){
    throw new ApiError(400, "All fields are reuired")
  }

  const existedStation = await Station.findOne({name})
  if (existedStation) {
    throw new ApiError(400, "Station is already created")
  }

  const station = await Station.create({
    name,
    location
  })

  const createdStation = await Station.findById(station._id)
  if (!createdStation) {
    throw new ApiError("something went wrong while creating the station")
  }

  return res.status(201).json(
    new ApiResponse(200, createdStation, "Station created successfully")
  )
})

// get all stations
const getAllStations = asyncHandler(async(req,res) => {
  const stations = await Station.find()

  return res.status(200).json(new ApiResponse(200, stations, "Stations fetched successfully"))
}) 

// Get a single station by ID
const getStation = asyncHandler(async(req, res) => {
  const {id} = req.params
   
  if (!id) {
   throw new ApiError(404, "id not found")
 
  }
 
   const foundStation = await Station.findOne({_id: id})
 
  if (!foundStation) {
   throw new ApiError(400, "Stations not available")
  }
 
  return res.status(200).json(
   new ApiResponse(200, foundStation, "Station found successfully")
  )
 
 })

// Delete a Station
const deleteStation = asyncHandler(async(req,res) => {
  const {id} = req.body
  const station = await Station.findById(id)
  if (!station) {
    throw new ApiError(404, "Station not found")
  }

  await station.deleteOne()

  return res.status(200).json(new ApiResponse(200, null, "Station deleted successfully"))
})


export {
  createStation,
  getAllStations,
  getStation,
  deleteStation
}