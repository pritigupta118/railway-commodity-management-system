import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  shipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shipment",
    required: true
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled'],
    required: true
  }
},
  {
    timestamps: true
  }
);

export const Booking = mongoose.model('Booking', bookingSchema);