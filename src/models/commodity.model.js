import mongoose, { Schema } from "mongoose";

const commoditySchema = new Schema({
  name: { 
    type: String,
    required: true 
    },
    weight: { 
    type: Number,
     required: true 
    },
}, 
);

export const Commodity = mongoose.model('Commodity', commoditySchema);