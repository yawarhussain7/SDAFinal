 import express from 'express';
 import { uploadMultipleImages } from '../middleware/multerMiddleware.js';
 import { HotelController } from '../controllers/hotel.js';
 import { authorized } from '../middleware/authMiddleware.js';

 const router = express.Router();

 // Use static methods directly on HotelController
 router.post('/hotel/add', authorized, uploadMultipleImages, HotelController.addHotel);
 router.get('/get/allhotel', HotelController.getAllHotel);
 router.get('/get/hoteldetail/:hotelId', HotelController.getHotelDetail);




 // for hoteladmin
 router.get('/get/hotel', authorized, HotelController.getHotel)
 router.get('/get/rooms/:hotelId', HotelController.getRoom)

 export default router;