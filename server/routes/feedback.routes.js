import express from 'express';
import { authorized } from '../middleware/authMiddleware.js'
import { FeedBackController } from '../controllers/feedback.js';

const router = express.Router();

const feedback = new FeedBackController();

// route to add the feedback 
router.post('/feedback/add', authorized, (req, res) => feedback.addFeedBack(req, res));
// route to get all the feedback to admin only plz
router.get('/feedback/get', authorized, (req, res) => feedback.getFeedBack(req, res));
export default router;