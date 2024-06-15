import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  train: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Train',
    required: true,
    unique: true
  },

  commodity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Commodity',
    required: true,
    unique: true
  }
},

);

export const Booking = mongoose.model('Booking', bookingSchema);