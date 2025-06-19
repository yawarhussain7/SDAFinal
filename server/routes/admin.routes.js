import express from 'express';
import { AdminController } from '../controllers/admin.js';
//import { authorized } from '../middleware/authMiddleware.js'

const router = express.Router();

router.get('/get/company', AdminController.getCompany);

router.post('/approve/company', AdminController.approvedCompany);
router.post('/reject/company', AdminController.notApprovedCompany);
router.post('/delete/company', AdminController.deleteCompany);


export default router;