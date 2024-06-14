import mongoose, { Schema } from "mongoose";

const stationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String,
    required: true
  }
})

export const Station = mongoose.model('Station', stationSchema);