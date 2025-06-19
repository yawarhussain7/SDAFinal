 import express from 'express';
 import { authorized } from '../middleware/authMiddleware.js';
 import { uploadSingleImage } from '../middleware/multerMiddleware.js';
 import { RoomController } from '../controllers/room.js';

 const rooms = new RoomController();
 const router = express.Router();
 router.post('/add/room/:hotelId', authorized, uploadSingleImage, rooms.addRoom);
 router.get('/get/rooms/:hotelId', authorized, RoomController.getRoom)
 export default router;