 import express from 'express';
 import { authorized } from '../middleware/authMiddleware.js'
 import { HeroBannerController } from '../controllers/herobanner.js';
 import { uploadSingleImage } from '../middleware/multerMiddleware.js'
 const router = express.Router();

 const HeroBanner = new HeroBannerController();

 // the route which is used to add the Hero Banner 
 router.post('/hero/add', authorized, uploadSingleImage, (req, res) => HeroBanner.addHeroBanner(req, res));
 // the route which is used to get all the HeroBanner
 router.get('/hero', (req, res) => HeroBanner.getHeroBanner(req, res));
 // the route which is used to delete a Hero Banner
 router.delete('/hero/:id', authorized, (req, res) => HeroBanner.deleteHeroBanner(req, res));
 export default router;