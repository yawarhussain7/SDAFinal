 // models/Hotel.js
 import mongoose from 'mongoose'
 const hotelSchema = new mongoose.Schema({
     userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
     },
     name: {
         type: String,
         required: true,
     },
     location: String,
     rating: {
         type: Number,
         min: 1,
         max: 5,
     },
     facilities: [String],
     images: [String],

 }, { timestamps: true });

 const hotel = mongoose.model('hotel', hotelSchema);
 export default hotel;