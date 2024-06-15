import mongoose, { Schema } from "mongoose";


const trainSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  trainNumber: {
    type: String,
    required: true,
    unique: true
  },
  maxLoad: {
     type: Number,
     required: true,
  },
  startPoint: {
    type : mongoose.Schema.Types.ObjectId,
    ref: "Station",
    required: true
  },
  destination: {
    type : mongoose.Schema.Types.ObjectId,
    ref: "Station",
    required: true
  },
  startDate: {
    type: Date,
    required: true
  }, 
  reachDate: {
  type: Date,
  required: true
  },
  price: {
    type: Number,
    required: true
  },
},
)

export const Train = mongoose.model("Train", trainSchema)