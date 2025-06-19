 import mongoose from "mongoose";

 const roomSchema = new mongoose.Schema({
     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
     hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
     roomType: {
         type: String,
         required: true,
     },
     pricePerNight: {
         type: Number,
         required: true,
     },
     numberOfGuest: {
         type: Number,
         required: true,
     },
     numberOfBeds: {
         type: Number,
         required: true,
     },
     image: {
         type: String,
         required: true
     }
 }, { timestamps: true });

 const Room = mongoose.model("Room", roomSchema);
 export default Room;