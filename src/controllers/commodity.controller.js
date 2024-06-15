import {Commodity} from "../models/commodity.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

// create a new commodity
const createCommodity = asyncHandler(async(req,res) => {
  const {name, weight} = req.body

  if([name, weight].some((data)=> data === "")){
    throw new ApiError(400, "All fields are reuired")
  }

  const commodity = await Commodity.create({
    name,
    weight
  })

  const createdCommodity = await Commodity.findById(commodity._id)
  if (!createdCommodity) {
    throw new ApiError("something went wrong while creating the commodity")
  }

  return res.status(201).json(
    new ApiResponse(200, createdCommodity, "Commodity created successfully")
  )
})

// get all commodities
const getAllCommodities = asyncHandler(async(req,res) => {
  const commodities = await Commodity.find()

  return res.status(200).json(new ApiResponse(200, commodities, "Commodities fetched successfully"))
}) 

// Get a single commodity by ID
const getCommodity = asyncHandler(async(req, res) => {
  const {id} = req.params
   
  if (!id) {
   throw new ApiError(404, "id not found")
  }
 
   const foundCommodity = await Commodity.findOne({_id: id})
 
  if (!foundCommodity) {
   throw new ApiError(400, "Commodity not available")
  }
 
  return res.status(200).json(
   new ApiResponse(200, foundCommodity, "Commodity found successfully")
  )
 
 })

// Delete a commodity
const deleteCommodity = asyncHandler(async(req,res) => {
  const {id} = req.params
  const commodity = await Commodity.findById(id)
  if (!commodity) {
    throw new ApiError(404, "Commodity not found")
  }

  await commodity.deleteOne()

  return res.status(200).json(new ApiResponse(200, null, "Commodity deleted successfully"))
})


export {
  createCommodity,
  getAllCommodities,
  getCommodity,
  deleteCommodity
}