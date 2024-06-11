import mongoose, { Schema } from "mongoose";

const stationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
}, {timestamps: true})

export const Station = mongoose.model('Station', stationSchema);