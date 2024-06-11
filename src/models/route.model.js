import mongoose, { Schema } from "mongoose";

const routeSchema = new Schema({
  stations: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Station",
    required: true 
    }],
  distance: {
     type: Number,
    required: true 
    }
},
{ 
  timestamps: true 
}
);

export const Route = mongoose.model('Route', routeSchema);