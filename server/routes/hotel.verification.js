 import express from 'express';
 import { authorized } from '../middleware/authMiddleware.js';
 import { VerificationCompany } from '../controllers/hotel.verfication.js';

 // route to used to register the company;
 const verification = new VerificationCompany();
 const router = express.Router();
 // route to register te company
 router.post('/hotel/register', authorized, (req, res) => verification.companyVerification(req, res));
 // route to  get all company to admin for verfiction
 router.get('/hotel', (req, res) =>
     verification.getVerifiedCompany(req, res)
 );
 // route to get only company that owner add
 router.get('/get/ownerHotel', authorized, verification.getOwnerCompany);
 // route to delete the owner the company;
 router.delete('/delete/ownerHotel', authorized, verification.deleteOwnerCompany);
 export default router;