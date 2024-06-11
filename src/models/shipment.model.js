import mongoose, { Schema } from "mongoose";

const shipmentSchema = new Schema({
  origin: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Station",
    required: true 
    },
  destination: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Station",
    required: true 
    },
  commodity: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Commodity",
    required: true 
    },
  status: { 
    type: String, 
    enum: ['pending', 'in-transit','delivered'],
    required: true 
    },
  departureTime: { 
    type: Date,
    required: true 
    },
  arrivalTime: { 
    type: Date,
     required: true 
    }
}, 
{ 
  timestamps: true 
}
);

export const Shipment = mongoose.model('Shipment', shipmentSchema);