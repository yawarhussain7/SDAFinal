import express from 'express'
import { PlaceController } from "../controllers/places.js";
import { authorized } from '../middleware/authMiddleware.js';
import { uploadMultipleImages } from '../middleware/multerMiddleware.js';
const router = express.Router();


const places = new PlaceController();
// the route to add the places
router.post('/places/add', authorized, uploadMultipleImages, (req, res) => places.addPlaces(req, res));
// the route to get the places
router.get('/places/get', (req, res) => places.getPlaces(req, res));
// the route to delete the places
router.delete('/places/delete/:id', authorized, (req, res) => places.deletePlaces(req, res));
export default router;