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
    required: true
  },
  maxLoad: {
     type: Number,
     required: true
  },
  routes: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: "Route",

  }],
  price: {
    type: Number,
    required: true
  }
},
{
  timestamps: true
}
)

export const Train = mongoose.model("Train", trainSchema)