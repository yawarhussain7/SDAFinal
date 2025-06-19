import express from 'express';
import { authorized } from '../middleware/authMiddleware.js';
import { uploadMultipleImages } from '../middleware/multerMiddleware.js';
import { GalleryController } from '../controllers/gallery.js';

const router = express.Router();

const gallery = new GalleryController();
// the route which is used to add the photos in gallery section
router.post('/gallery/add', authorized, uploadMultipleImages, (req, res) => gallery.addGallery(req, res));
// the route which is used to get the photos in gallery section
router.get('/gallery', (req, res) => gallery.getGallery(req, res));
// the route which is used to delete the photos in gallery section
router.delete('/gallery/:id', authorized, (req, res) => gallery.deleteGallery(req, res));

export default router;